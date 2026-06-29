# refresh-index.ps1 — 確定性索引生成（純檔案操作，無 LLM）
# 用法：pwsh refresh-index.ps1 [-Threshold 15] [-ExcludeSocial] [-NoExcludeSocial]
# 預設 ExcludeSocial = $true（不為 Social 目錄生成索引）

param(
    [int]$Threshold = 15,
    [switch]$NoExcludeSocial
)

$ExcludeSocial = -not $NoExcludeSocial

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue'

$VaultRoot = 'd:\Claude\obsidian'
$WikiRoot  = Join-Path $VaultRoot 'wiki'

if (-not (Test-Path $WikiRoot)) {
    Write-Error "wiki 目錄不存在：$WikiRoot"
    exit 1
}

$today = Get-Date -Format 'yyyy-MM-dd'

# ── 統計變數 ─────────────────────────────────────────────
$statsProcessedDirs  = 0
$statsGeneratedIndex = 0
$statsRootCountOld   = $null
$statsRootCountNew   = $null

# ══════════════════════════════════════════════════════════
# Helper：解析 frontmatter（--- ... --- 之間）
# 回傳 hashtable：tags=@(...), description=$null|string
# ══════════════════════════════════════════════════════════
function Parse-Frontmatter {
    param([string]$Raw)

    $result = @{ tags = @(); description = $null }

    # 判斷是否以 --- 開頭（允許 BOM）
    $trimmed = $Raw.TrimStart([char]0xFEFF)
    if ($trimmed -notmatch '^---\s*\r?\n') { return $result }

    # 取 frontmatter 區塊
    $fmMatch = [regex]::Match($trimmed, '(?s)^---\s*\r?\n(.*?)\r?\n---')
    if (-not $fmMatch.Success) { return $result }
    $fm = $fmMatch.Groups[1].Value

    # ── tags ──
    # 格式 1：tags: [a, b, c]
    if ($fm -match 'tags:\s*\[([^\]]*)\]') {
        $result.tags = ($Matches[1] -split ',') | ForEach-Object { $_.Trim().Trim('"').Trim("'") } | Where-Object { $_ -ne '' }
    }
    # 格式 2：YAML list
    #   tags:
    #     - a
    #     - b
    elseif ($fm -match '(?m)^tags:\s*$') {
        $lines = $fm -split '\r?\n'
        $inTags = $false
        foreach ($line in $lines) {
            if ($line -match '^\s*tags:\s*$') { $inTags = $true; continue }
            if ($inTags) {
                if ($line -match '^\s+-\s+(.+)') {
                    $result.tags += $Matches[1].Trim().Trim('"').Trim("'")
                } else {
                    $inTags = $false
                }
            }
        }
    }

    # ── description ──
    # 只取簡單的 description: "..." 或 description: 文字（單行）
    if ($fm -match '(?m)^description:\s*"([^"]*)"') {
        $result.description = $Matches[1]
    } elseif ($fm -match '(?m)^description:\s*(.+)$') {
        $val = $Matches[1].Trim().Trim('"').Trim("'")
        # 過濾掉明顯不是描述的值（例如含 # 的模板行）
        if ($val.Length -gt 0 -and $val.Length -lt 300 -and $val -notmatch '^\s*#') {
            $result.description = $val
        }
    }

    return $result
}

# ══════════════════════════════════════════════════════════
# Helper：取檔案第一個 H1（# xxx）
# ══════════════════════════════════════════════════════════
function Get-FirstH1 {
    param([string]$Raw)
    $trimmed = $Raw.TrimStart([char]0xFEFF)
    # 跳過 frontmatter 後找第一個 H1
    $body = $trimmed
    if ($trimmed -match '^---\s*\r?\n') {
        $fmEnd = [regex]::Match($trimmed, '(?s)^---\s*\r?\n.*?\r?\n---\s*\r?\n?')
        if ($fmEnd.Success) {
            $body = $trimmed.Substring($fmEnd.Length)
        }
    }
    # 取 body 前 10 行，找第一個 H1 或 H2 作為標題
    $headLines = ($body -split '\r?\n') | Select-Object -First 10
    $topBlock = $headLines -join "`n"
    # 優先 H1
    if ($topBlock -match '(?m)^#\s+(.+)') {
        return $Matches[1].Trim()
    }
    # fallback H2（部分文章用 ## 當標題）
    if ($topBlock -match '(?m)^##\s+(.+)') {
        return $Matches[1].Trim()
    }
    return $null
}

# ══════════════════════════════════════════════════════════
# Helper：從既有（本腳本生成的）_index.md 解析已填描述
# 回傳 hashtable：relPath -> description（跳過 TODO 佔位）
# 用途：重生成時保留 AI 已填的描述，避免每次 /compile 洗回 TODO
# ══════════════════════════════════════════════════════════
function Get-ExistingDescriptions {
    param([string]$Raw)
    $map = @{}
    if (-not $Raw) { return $map }
    foreach ($line in ($Raw -split '\r?\n')) {
        # 條目格式：- [[relPath|display]] — desc #tags
        $m = [regex]::Match($line, '^- \[\[(?<rel>[^\]|]+)\|[^\]]*\]\]\s+—\s+(?<rest>.*)$')
        if ($m.Success) {
            $rel  = $m.Groups['rel'].Value.Trim()
            $rest = $m.Groups['rest'].Value
            # 去掉結尾的 #tag 串，留下純描述
            $desc = [regex]::Replace($rest, '(\s+#\S+)+\s*$', '').Trim()
            if ($desc -and $desc -ne '<!-- desc: TODO -->') {
                $map[$rel] = $desc
            }
        }
    }
    return $map
}

# ══════════════════════════════════════════════════════════
# Step 1 & 2：掃描子目錄，生成 _index.md
# ══════════════════════════════════════════════════════════
$dirs = Get-ChildItem $WikiRoot -Directory -ErrorAction SilentlyContinue

foreach ($dir in $dirs) {
    $statsProcessedDirs++
    $dirName = $dir.Name

    # 取第一層 .md 檔（排除 _ 開頭）
    try {
        $mdFiles = Get-ChildItem $dir.FullName -Filter '*.md' -File -ErrorAction Stop |
                   Where-Object { $_.Name -notlike '_*' }
    } catch {
        Write-Warning "無法讀取目錄 $($dir.FullName)：$_"
        continue
    }

    $fileCount = @($mdFiles).Count

    # 低於門檻，跳過
    if ($fileCount -lt $Threshold) { continue }

    # ── Social 特殊處理 ──
    if ($dirName -eq 'Social' -and $ExcludeSocial) {
        Write-Host "[skip] Social ($fileCount 篇) — ExcludeSocial 已啟用"
        continue
    }

    $isSocial = ($dirName -eq 'Social')

    # ── 讀既有索引：非破壞性保護 + 描述保留 ──
    # (a) 不存在 → 生成；(b) 含生成標記 → 重生成但保留已填描述；
    # (c) 手寫版（無標記）→ 跳過不動
    $indexPath = Join-Path $dir.FullName '_index.md'
    $existingContent = $null
    $preservedDesc = @{}
    if (Test-Path $indexPath) {
        $existingContent = Get-Content $indexPath -Raw -Encoding utf8
        $isGenerated = ($existingContent -match '(?m)^\s*type:\s*folder-index\s*$') -or
                       ($existingContent -match '此檔由 refresh-index\.ps1 自動生成')
        if (-not $isGenerated) {
            Write-Host "[skip] $dirName/_index.md 為手寫版，跳過"
            continue
        }
        $preservedDesc = Get-ExistingDescriptions -Raw $existingContent
    }

    # ── 建構條目 ──
    $entries = @()
    foreach ($f in $mdFiles) {
        try {
            $raw = Get-Content $f.FullName -Raw -Encoding utf8
        } catch {
            Write-Warning "  無法讀取 $($f.FullName)：$_"
            continue
        }

        $baseName = $f.BaseName  # 檔名去 .md
        $relPath  = "$dirName/$baseName"

        # 顯示名
        $h1 = Get-FirstH1 -Raw $raw
        $displayName = if ($h1) { $h1 } else { $baseName }

        # frontmatter
        $fm = Parse-Frontmatter -Raw $raw

        # description：frontmatter > 既有已填描述（保留）> TODO 佔位
        $descPart = if ($fm.description) {
            $fm.description
        } elseif ($preservedDesc.ContainsKey($relPath)) {
            $preservedDesc[$relPath]
        } else {
            '<!-- desc: TODO -->'
        }

        # tags
        $tagPart = ''
        if ($fm.tags.Count -gt 0) {
            $tagPart = ' ' + (($fm.tags | ForEach-Object { "#$_" }) -join ' ')
        }

        # 排序鍵（Social 用檔名日期倒序）
        $sortKey = $displayName
        if ($isSocial) {
            # 檔名格式：社群海巡 2026-05-16-1624.md → 取日期部分倒序
            if ($f.Name -match '(\d{4}-\d{2}-\d{2}(-\d{4})?)') {
                $sortKey = $Matches[1]
            }
        }

        $entries += [PSCustomObject]@{
            Line        = "- [[$relPath|$displayName]] — $descPart$tagPart"
            SortKey     = $sortKey
            DisplayName = $displayName
        }
    }

    # 排序
    if ($isSocial) {
        $entries = $entries | Sort-Object -Property SortKey -Descending
    } else {
        $entries = $entries | Sort-Object -Property DisplayName
    }

    # ── 組裝 _index.md 內容 ──
    $sb = [System.Text.StringBuilder]::new()
    [void]$sb.AppendLine('---')
    [void]$sb.AppendLine("title: $dirName 索引")
    [void]$sb.AppendLine('type: folder-index')
    [void]$sb.AppendLine("generated: $today")
    [void]$sb.AppendLine('---')
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine("# $dirName 索引")
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('> 此檔由 refresh-index.ps1 自動生成；描述由 AI 補（保留既有描述，不會被洗回）')
    [void]$sb.AppendLine("> 檔案數：$fileCount 篇")
    if ($isSocial) {
        [void]$sb.AppendLine('> 時效報告，低重用；按檔名日期倒序排列')
    }
    [void]$sb.AppendLine('')

    foreach ($e in $entries) {
        [void]$sb.AppendLine($e.Line)
    }

    $indexContent = $sb.ToString()

    # ── 寫入（idempotent：比對內容再寫；非破壞性保護已在迴圈開頭處理） ──
    if ($existingContent -ne $indexContent) {
        [System.IO.File]::WriteAllText($indexPath, $indexContent, [System.Text.UTF8Encoding]::new($false))
        $statsGeneratedIndex++
        Write-Host "[gen] $dirName/_index.md ($fileCount 篇)"
    } else {
        Write-Host "[ok]  $dirName/_index.md 無變化"
    }
}

# ══════════════════════════════════════════════════════════
# Step 4：修正根 wiki\_index.md 計數
# ══════════════════════════════════════════════════════════
$rootIndexPath = Join-Path $WikiRoot '_index.md'
if (Test-Path $rootIndexPath) {
    # 計算實際總數：整個 wiki 遞迴 .md，排除 _ 開頭檔
    $actualTotal = (Get-ChildItem $WikiRoot -Recurse -Filter '*.md' -File |
                    Where-Object { $_.Name -notlike '_*' }).Count

    $rawContent = [System.IO.File]::ReadAllText($rootIndexPath, [System.Text.UTF8Encoding]::new($false))

    $pattern = '文章數量：\d+ 篇'
    $replacement = "文章數量：$actualTotal 篇"

    if ($rawContent -match $pattern) {
        $oldMatch = [regex]::Match($rawContent, $pattern).Value
        $statsRootCountOld = [regex]::Match($oldMatch, '\d+').Value

        $newContent = [regex]::Replace($rawContent, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::None)
        $statsRootCountNew = $actualTotal

        if ($newContent -ne $rawContent) {
            # 保留原始 BOM 狀態
            $rawBytes = [System.IO.File]::ReadAllBytes($rootIndexPath)
            $hasBOM = ($rawBytes.Length -ge 3 -and $rawBytes[0] -eq 0xEF -and $rawBytes[1] -eq 0xBB -and $rawBytes[2] -eq 0xBF)
            $enc = [System.Text.UTF8Encoding]::new($hasBOM)
            [System.IO.File]::WriteAllText($rootIndexPath, $newContent, $enc)
            Write-Host "[fix] 根 _index.md 計數：$statsRootCountOld → $actualTotal"
        } else {
            Write-Host "[ok]  根 _index.md 計數已正確：$actualTotal 篇"
        }
    } else {
        Write-Warning "根 _index.md 找不到「文章數量：N 篇」pattern，跳過計數修正"
        $statsRootCountNew = $actualTotal
    }
} else {
    Write-Warning "根 _index.md 不存在：$rootIndexPath"
}

# ══════════════════════════════════════════════════════════
# Step 5：Drift 報告
# ══════════════════════════════════════════════════════════
Write-Host ''
Write-Host '══════════════════════════════════════════'
Write-Host '  Drift 報告（宣稱 vs 實際）'
Write-Host '══════════════════════════════════════════'

if ($null -ne $statsRootCountOld -and $null -ne $statsRootCountNew) {
    if ([int]$statsRootCountOld -ne [int]$statsRootCountNew) {
        Write-Host "  根 _index.md 宣稱：$statsRootCountOld 篇 → 實際：$statsRootCountNew 篇（差 $([int]$statsRootCountNew - [int]$statsRootCountOld)）"
    } else {
        Write-Host "  根 _index.md 計數一致：$statsRootCountNew 篇"
    }
} elseif ($null -ne $statsRootCountNew) {
    Write-Host "  根 _index.md 無法讀取宣稱值，實際：$statsRootCountNew 篇"
}

# 各目錄檔案數摘要
Write-Host ''
Write-Host '  目錄檔案數：'
foreach ($dir in ($dirs | Sort-Object Name)) {
    try {
        $count = @(Get-ChildItem $dir.FullName -Filter '*.md' -File -ErrorAction Stop |
                   Where-Object { $_.Name -notlike '_*' }).Count
    } catch { $count = '?' }
    $marker = if ($count -ge $Threshold) { '●' } else { '○' }
    Write-Host "    $marker $($dir.Name.PadRight(40)) $count"
}

# ══════════════════════════════════════════════════════════
# Step 6：摘要
# ══════════════════════════════════════════════════════════
Write-Host ''
Write-Host '══════════════════════════════════════════'
Write-Host '  摘要'
Write-Host '══════════════════════════════════════════'
Write-Host "  處理目錄數：$statsProcessedDirs"
Write-Host "  生成/更新 _index.md：$statsGeneratedIndex"
if ($null -ne $statsRootCountOld -and $null -ne $statsRootCountNew) {
    Write-Host "  根計數改動：$statsRootCountOld → $statsRootCountNew"
} elseif ($null -ne $statsRootCountNew) {
    Write-Host "  根計數（實際）：$statsRootCountNew"
}
Write-Host '══════════════════════════════════════════'
