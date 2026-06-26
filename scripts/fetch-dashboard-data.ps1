# fetch-dashboard-data.ps1 - 資料橋接腳本，輸出 data/dashboard.json
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$vaultRoot  = "d:\Claude\obsidian"
$dataDir    = "$vaultRoot\data"
$outputFile = "$dataDir\dashboard.json"

New-Item -ItemType Directory -Force -Path $dataDir | Out-Null

# ── 1. Job count + list (Jobsmith app.sqlite) ─────────────────────────────
$jobsDb   = "d:\Claude\active\jobsmith\data\app.sqlite"
$jobCount = 0
$jobList  = @()
if (Test-Path $jobsDb) {
    $py = @'
import sqlite3, sys, json
conn = sqlite3.connect(sys.argv[1])
cur = conn.cursor()
cur.execute("SELECT COUNT(*) FROM packages WHERE status='done' AND (approved IS NULL OR approved=0)")
count = cur.fetchone()[0]
cur.execute("""
    SELECT id, company, job_title as title, match_score, created_at as first_seen
    FROM packages
    WHERE status='done' AND (approved IS NULL OR approved=0)
    ORDER BY created_at DESC
""")
cols = [d[0] for d in cur.description]
jobs = [dict(zip(cols, row)) for row in cur.fetchall()]
conn.close()
print(json.dumps({"count": count, "jobs": jobs}, ensure_ascii=False))
'@
    $tmp = [System.IO.Path]::GetTempFileName() + ".py"
    $py | Out-File -FilePath $tmp -Encoding UTF8
    $rawResult = python $tmp $jobsDb 2>$null
    Remove-Item $tmp -ErrorAction SilentlyContinue
    if ($rawResult) {
        $parsed  = $rawResult | ConvertFrom-Json
        $jobCount = [int]$parsed.count
        $jobList  = $parsed.jobs
    }
}

# ── 2. Social monitor label + topic headlines ─────────────────────────────
$socialLabel  = "N/A"
$socialTopics = @()
$latestRep = Get-ChildItem "d:\Claude\active\social-monitor\reports\report-*.md" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($latestRep) {
    $SYSTEM_SECTIONS = @('Warnings','DEGRADED RUN WARNING','Stats','Source Coverage',
                         'Ranked Evidence Clusters','Pre-Research Status',
                         '今日重點摘要（AI）','今日重點','AI Summary',
                         'Code Review Summary','Freshness','背景資訊',
                         'Summary','Background','Evidence','Raw Evidence')
    $lines        = Get-Content $latestRep.FullName -Encoding UTF8
    $curTopic     = $null
    $inClusters   = $false
    $topicHasData = $false
    $curHeadlines = @()

    function FlushTopic {
        param($topic, $hasData, $headlines, [ref]$list)
        if (-not $topic) { return }
        if ($hasData) {
            $list.Value += [PSCustomObject]@{
                topic     = $topic
                headline  = if ($headlines[0]) { $headlines[0].text } else { '' }
                headlines = $headlines
            }
        } else {
            $list.Value += [PSCustomObject]@{
                topic     = $topic
                headline  = '（無資料）'
                headlines = @()
            }
        }
    }

    foreach ($ln in $lines) {
        if ($ln -match '^## (.+)$') {
            $h = $Matches[1].Trim()
            if ($SYSTEM_SECTIONS -notcontains $h) {
                FlushTopic $curTopic $topicHasData $curHeadlines ([ref]$socialTopics)
                $curTopic     = $h
                $inClusters   = $false
                $topicHasData = $false
                $curHeadlines = @()
            } elseif ($h -eq 'Ranked Evidence Clusters') {
                $inClusters = $true
            } else {
                $inClusters = $false
            }
        } elseif ($inClusters -and $curTopic -and $ln -match '^### (\d+)\. (.+?) \(score') {
            $rank = [int]$Matches[1]
            if ($rank -le 10) {
                $title = $Matches[2].Trim()
                $src   = ''
                if ($ln -match 'sources?: (.+?)\)') { $src = $Matches[1].Trim() }
                $curHeadlines += [PSCustomObject]@{ text = $title; source = $src }
                $topicHasData  = $true
            }
        }
    }
    # flush last topic
    FlushTopic $curTopic $topicHasData $curHeadlines ([ref]$socialTopics)

    $hhmm = ($latestRep.Name -replace 'report-\d{4}-\d{2}-\d{2}-','') -replace '\.md',''
    if ($socialTopics.Count -gt 0) {
        $hasData = ($socialTopics | Where-Object { $_.headline -ne '（無資料）' }).Count
        $socialLabel = "$($socialTopics.Count) 主題 · $hasData 有資料 · $hhmm"
    } else {
        $socialLabel = $hhmm
    }
}

# ── 3. Latest Morning Briefing ────────────────────────────────────────────
$briefingTitle = "尚未產生"
$latestBriefing = Get-ChildItem "$vaultRoot\wiki\Daily\Morning_*.md" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($latestBriefing) { $briefingTitle = $latestBriefing.BaseName }

# ── 4. Token estimate ─────────────────────────────────────────────────────
$tokenEstimate = "—"
$latestJsonl = Get-ChildItem "D:\claude\projects\d--Claude\*.jsonl" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($latestJsonl) {
    $lines = (Get-Content $latestJsonl.FullName | Measure-Object -Line).Lines
    $est   = [int]($lines * 0.8)
    $tokenEstimate = "~${est}K"
}

# ── 5. GitHub Trending ────────────────────────────────────────────────────
$githubData = "[]"
$pyGithub = @'
import sys, json, re as _re
try:
    import requests
    from bs4 import BeautifulSoup
    r = requests.get("https://github.com/trending?since=daily",
                     headers={"User-Agent":"Mozilla/5.0"}, timeout=12)
    soup = BeautifulSoup(r.text, "html.parser")
    result = []
    for i, article in enumerate(soup.select("article.Box-row")[:10], 1):
        repo     = article.select_one("h2 a")
        desc     = article.select_one("p")
        stars_el = article.select_one("span.d-inline-block.float-sm-right")
        lang_el  = article.select_one("span[itemprop='programmingLanguage']")
        d = desc.text.strip() if desc else ""
        stars_txt = stars_el.text.strip() if stars_el else ""
        stars_num = _re.sub(r"[^\d,]", "", stars_txt).replace(",","")
        result.append({
            "rank": i,
            "repo": repo["href"].lstrip("/") if repo else "",
            "desc": (d[:68]+"...") if len(d)>68 else d,
            "stars": stars_num or "0",
            "lang": lang_el.text.strip() if lang_el else ""
        })
    print(json.dumps(result, ensure_ascii=False))
except Exception as e:
    print("[]")
'@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$pyGithub | Out-File -FilePath $tmp -Encoding UTF8
$githubData = python $tmp 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
if (-not $githubData -or $githubData.Trim() -eq '') { $githubData = "[]" }

# ── 6. Hacker News (with id for fallback URL) ─────────────────────────────
$hnData = "[]"
$pyHN = @'
import sys, json
try:
    import requests
    ids = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json",
                       timeout=10).json()[:10]
    result = []
    for i, id in enumerate(ids, 1):
        item = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{id}.json",
                            timeout=6).json()
        result.append({
            "rank":  i,
            "title": item.get("title",""),
            "score": item.get("score", 0),
            "url":   item.get("url", ""),
            "id":    id
        })
    print(json.dumps(result, ensure_ascii=False))
except:
    print("[]")
'@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$pyHN | Out-File -FilePath $tmp -Encoding UTF8
$hnData = python $tmp 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
if (-not $hnData -or $hnData.Trim() -eq '') { $hnData = "[]" }

# ── 7. Product Hunt Daily ─────────────────────────────────────────────────
$phData  = "[]"
$phToken = ""
$phTokenFile = "$dataDir\ph_token.txt"
if (Test-Path $phTokenFile) {
    # Read only first line (file may contain "User Context:" and "Expires:" lines)
    $raw = (Get-Content $phTokenFile | Select-Object -First 1).Trim()
    $phToken = $raw -replace '^Token:\s*', ''
}

if ($phToken) {
    $pyPH = @'
import sys, json
try:
    import requests
    token = sys.argv[1]
    query = """{ posts(order: VOTES, first: 10) {
        edges { node { name tagline votesCount url } }
    } }"""
    r = requests.post(
        "https://api.producthunt.com/v2/api/graphql",
        json={"query": query},
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        timeout=12
    )
    edges = r.json()["data"]["posts"]["edges"]
    result = [{"rank": i+1,
               "name": e["node"]["name"],
               "tagline": e["node"]["tagline"][:70],
               "votes": e["node"]["votesCount"],
               "url": e["node"]["url"]}
              for i, e in enumerate(edges)]
    print(json.dumps(result, ensure_ascii=False))
except Exception as e:
    print("[]")
'@
    $tmp = [System.IO.Path]::GetTempFileName() + ".py"
    $pyPH | Out-File -FilePath $tmp -Encoding UTF8
    $phData = python $tmp $phToken 2>$null
    Remove-Item $tmp -ErrorAction SilentlyContinue
    if (-not $phData -or $phData.Trim() -eq '') { $phData = "[]" }
}

# ── 8. Lobsters (hottest stories) ────────────────────────────────────────
$lobstersData = "[]"
$pyLobsters = @'
import sys, json
try:
    import requests
    r = requests.get("https://lobste.rs/hottest.json",
                     headers={"User-Agent": "dashboard-bot/1.0"}, timeout=12)
    posts = r.json()[:10]
    result = [{"rank": i+1,
               "title": p["title"],
               "score": p["score"],
               "url":   p["url"] or p["short_id_url"]}
              for i, p in enumerate(posts)]
    print(json.dumps(result, ensure_ascii=False))
except:
    print("[]")
'@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$pyLobsters | Out-File -FilePath $tmp -Encoding UTF8
$lobstersData = python $tmp 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
if (-not $lobstersData -or $lobstersData.Trim() -eq '') { $lobstersData = "[]" }

# ── 9. iThome RSS ─────────────────────────────────────────────────────────
$ithomeData = "[]"
$pyIthome = @'
import sys, json
try:
    import requests
    from xml.etree import ElementTree as ET
    r = requests.get("https://www.ithome.com.tw/rss",
                     headers={"User-Agent": "Mozilla/5.0"}, timeout=12)
    root = ET.fromstring(r.content)
    ns = {'dc': 'http://purl.org/dc/elements/1.1/'}
    items = root.findall('.//item')[:15]
    result = []
    for i, item in enumerate(items, 1):
        title  = item.findtext('title', '')
        link   = item.findtext('link', '')
        date   = item.findtext('pubDate', '').split()[0]
        author = item.findtext('dc:creator', '—', ns)
        result.append({"rank": i, "title": title, "url": link, "date": date, "author": author})
    print(json.dumps(result, ensure_ascii=False))
except Exception as e:
    print("[]")
'@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$pyIthome | Out-File -FilePath $tmp -Encoding UTF8
$ithomeData = python $tmp 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
if (-not $ithomeData -or $ithomeData.Trim() -eq '') { $ithomeData = "[]" }

# ── 10. TechOrange RSS ────────────────────────────────────────────────────
$techorangeData = "[]"
$pyTechOrange = @'
import sys, json, email.utils
try:
    import requests
    from xml.etree import ElementTree as ET
    r = requests.get("https://techorange.com/feed/",
                     headers={"User-Agent": "Mozilla/5.0"}, timeout=12)
    root = ET.fromstring(r.content)
    ns = {'dc': 'http://purl.org/dc/elements/1.1/'}
    items = root.findall('.//item')[:10]
    result = []
    for i, item in enumerate(items, 1):
        title  = item.findtext('title', '')
        link   = item.findtext('link', '')
        pd     = item.findtext('pubDate', '')
        try:    date = email.utils.parsedate_to_datetime(pd).strftime('%Y-%m-%d')
        except: date = pd[:10]
        author = item.findtext('dc:creator', '—', ns)
        result.append({"rank": i, "title": title, "url": link, "date": date, "author": author})
    print(json.dumps(result, ensure_ascii=False))
except Exception as e:
    print("[]")
'@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$pyTechOrange | Out-File -FilePath $tmp -Encoding UTF8
$techorangeData = python $tmp 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
if (-not $techorangeData -or $techorangeData.Trim() -eq '') { $techorangeData = "[]" }

# ── 11. TechCrunch RSS ────────────────────────────────────────────────────
$techcrunchData = "[]"
$pyTechCrunch = @'
import sys, json, email.utils
try:
    import requests
    from xml.etree import ElementTree as ET
    r = requests.get("https://techcrunch.com/feed/",
                     headers={"User-Agent": "Mozilla/5.0"}, timeout=12)
    root = ET.fromstring(r.content)
    ns = {'dc': 'http://purl.org/dc/elements/1.1/'}
    items = root.findall('.//item')[:10]
    result = []
    for i, item in enumerate(items, 1):
        title  = item.findtext('title', '')
        link   = item.findtext('link', '')
        pd     = item.findtext('pubDate', '')
        try:    date = email.utils.parsedate_to_datetime(pd).strftime('%Y-%m-%d')
        except: date = pd[:10]
        author = item.findtext('dc:creator', '—', ns)
        result.append({"rank": i, "title": title, "url": link, "date": date, "author": author})
    print(json.dumps(result, ensure_ascii=False))
except Exception as e:
    print("[]")
'@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$pyTechCrunch | Out-File -FilePath $tmp -Encoding UTF8
$techcrunchData = python $tmp 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
if (-not $techcrunchData -or $techcrunchData.Trim() -eq '') { $techcrunchData = "[]" }

# ── Assemble JSON ──────────────────────────────────────────────────────────
$data = [ordered]@{
    updatedAt     = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
    jobCount      = $jobCount
    jobList       = $jobList
    socialLabel   = $socialLabel
    socialTopics  = $socialTopics
    briefingTitle = $briefingTitle
    tokenEstimate = $tokenEstimate
    github        = ($githubData   | ConvertFrom-Json)
    hn            = ($hnData       | ConvertFrom-Json)
    ph            = ($phData       | ConvertFrom-Json)
    lobsters      = ($lobstersData | ConvertFrom-Json)
    ithome        = ($ithomeData       | ConvertFrom-Json)
    techorange    = ($techorangeData  | ConvertFrom-Json)
    techcrunch    = ($techcrunchData  | ConvertFrom-Json)
    schedule      = $(
        $calFile = "$vaultRoot\data\calendar.json"
        if (Test-Path $calFile) { Get-Content $calFile -Raw -Encoding UTF8 | ConvertFrom-Json }
        else { @() }
    )
    emailBrief    = $(
        $emailFile = "$vaultRoot\data\email-brief.json"
        if (Test-Path $emailFile) { Get-Content $emailFile -Raw -Encoding UTF8 | ConvertFrom-Json }
        else { @() }
    )
}

$data | ConvertTo-Json -Depth 5 | Out-File -FilePath $outputFile -Encoding UTF8 -Force

$g  = ($data.github).Count;    $h  = ($data.hn).Count
$p  = ($data.ph).Count;        $lb = ($data.lobsters).Count
$it = ($data.ithome).Count;    $to = ($data.techorange).Count
$tc = ($data.techcrunch).Count; $em = ($data.emailBrief).Count
Write-Host "dashboard.json updated: jobs=$jobCount github=$g hn=$h ph=$p lobsters=$lb ithome=$it techorange=$to techcrunch=$tc email=$em token=$tokenEstimate"
