# fetch-dashboard-data.ps1 - 資料橋接腳本，輸出 data/dashboard.json
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$vaultRoot  = "d:\Claude\obsidian"
$dataDir    = "$vaultRoot\data"
$outputFile = "$dataDir\dashboard.json"

New-Item -ItemType Directory -Force -Path $dataDir | Out-Null

# ── 1. Job count ───────────────────────────────────────────────────────────
$jobsDb   = "d:\Claude\job-crawler\jobs.db"
$jobCount = 0
if (Test-Path $jobsDb) {
    $py = @'
import sqlite3, sys
conn = sqlite3.connect(sys.argv[1])
cur = conn.cursor()
cur.execute("SELECT COUNT(*) FROM job_groups WHERE user_status='unread'")
print(cur.fetchone()[0])
conn.close()
'@
    $tmp = [System.IO.Path]::GetTempFileName() + ".py"
    $py | Out-File -FilePath $tmp -Encoding UTF8
    $result = python $tmp $jobsDb 2>$null
    Remove-Item $tmp -ErrorAction SilentlyContinue
    $jobCount = [int]($result.Trim())
}

# ── 2. Social monitor label ────────────────────────────────────────────────
$socialLabel = "N/A"
$latestRep = Get-ChildItem "d:\Claude\social-monitor\reports\report-*.md" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($latestRep) { $socialLabel = $latestRep.Name -replace 'report-','' -replace '\.md','' }

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

# ── Assemble JSON ──────────────────────────────────────────────────────────
$data = [ordered]@{
    updatedAt     = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
    jobCount      = $jobCount
    socialLabel   = $socialLabel
    briefingTitle = $briefingTitle
    tokenEstimate = $tokenEstimate
    github        = ($githubData   | ConvertFrom-Json)
    hn            = ($hnData       | ConvertFrom-Json)
    ph            = ($phData       | ConvertFrom-Json)
    lobsters      = ($lobstersData | ConvertFrom-Json)
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
$em = ($data.emailBrief).Count
Write-Host "dashboard.json updated: jobs=$jobCount github=$g hn=$h ph=$p lobsters=$lb email=$em token=$tokenEstimate"
