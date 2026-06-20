# analyze-repo.ps1 - 用 headless Claude + repomix-explorer 分析 GitHub repo，寫入 wiki
param([string]$Repo)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

if (-not $Repo) { Write-Error "Usage: analyze-repo.ps1 <owner/repo>"; exit 1 }

Set-Location "d:\Claude\obsidian"

$safeName = $Repo -replace '/', '-'
$outputFile = "wiki/Github/repos/$safeName.md"

if (Test-Path $outputFile) {
    Write-Host "Already exists: $outputFile"
    exit 0
}

Write-Host "Analyzing: $Repo"

$prompt = @"
請分析 GitHub repo https://github.com/$Repo 並寫入 wiki。

## Step 1: Pack repo（用 repomix）

執行：
npx repomix@latest --remote $Repo --output /tmp/repo-analysis.xml

記下 command output 的 Total Files / Total Tokens 數字。
如果 repo 很大（>500 檔案），加 --compress 重跑。

## Step 2: 分析（效率優先：grep first, read later）

1. 先讀 file tree（輸出檔前 200 行），掌握目錄結構
2. 找到 README.md 的位置：grep -n '<file path="README.md">' /tmp/repo-analysis.xml
3. 讀 README（通常 200 行就夠），了解專案定位與功能
4. 若需深入，用 grep 搜尋關鍵模式（不要整檔讀）：
   - grep -iE "export.*function|export.*class" /tmp/repo-analysis.xml | head -20
   - grep -iE "auth|config|route|model" /tmp/repo-analysis.xml | head -20
5. 只在 grep 結果不夠時才用 offset/limit 讀特定段落

## Step 3: 寫入 wiki

在 wiki/Github/repos/$safeName.md 建立文章，格式：

---
tags: [相關標籤]
date: $(Get-Date -Format 'yyyy-MM-dd')
status: evaluated
verdict: 一句話裁決
---

# Repo 名稱 — 簡短描述

> 來源：https://github.com/$Repo
> 授權：XXX
> 規模：X 檔案 / X tokens

## 這是什麼？
一段話說明 + 一句話定義

## 核心功能
條列主要功能

## 技術棧
語言、框架、依賴

## 與現有系統的相關性
與 Obsidian Vault / Claude Code / automation / skills 環境的關聯

## 安裝建議
✅ 適合安裝 / ⏳ 觀望 / ❌ 不適合 + 理由一句話

## Step 4: 更新 log

在 wiki/log.md 最後追加一行：
$(Get-Date -Format 'yyyy-MM-dd HH:mm') | COMPILE | github.com/$Repo → wiki/Github/repos/$safeName.md | repomix 分析
"@

claude -p $prompt --allowedTools "Edit,Write,Read,Bash,Glob,Grep" --max-turns 30
