# fetch-dashboard-data.ps1 - 資料橋接腳本，輸出 data/dashboard.json
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$vaultRoot  = "d:\Claude\obsidian"
$dataDir    = "$vaultRoot\data"
$outputFile = "$dataDir\dashboard.json"

New-Item -ItemType Directory -Force -Path $dataDir | Out-Null

# 1. Job count (all unread)
$jobsDb   = "d:\Claude\job-crawler\jobs.db"
$jobCount = 0
if (Test-Path $jobsDb) {
    $pyCode = @'
import sqlite3, sys
conn = sqlite3.connect(sys.argv[1])
cur = conn.cursor()
cur.execute("SELECT COUNT(*) FROM job_groups WHERE user_status='unread'")
print(cur.fetchone()[0])
conn.close()
'@
    $tmpPy = [System.IO.Path]::GetTempFileName() + ".py"
    $pyCode | Out-File -FilePath $tmpPy -Encoding UTF8
    $result = python $tmpPy $jobsDb 2>$null
    Remove-Item $tmpPy -ErrorAction SilentlyContinue
    $jobCount = [int]($result.Trim())
}

# 2. Latest social monitor label
$reportsDir  = "d:\Claude\social-monitor\reports"
$socialLabel = "N/A"
$latestRep   = Get-ChildItem "$reportsDir\report-*.md" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($latestRep) {
    $socialLabel = ($latestRep.Name -replace 'report-','' -replace '\.md','')
}

# 3. Latest Morning Briefing title
$briefingTitle = "尚未產生"
$latestBriefing = Get-ChildItem "$vaultRoot\wiki\Daily\Morning_*.md" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($latestBriefing) {
    $briefingTitle = $latestBriefing.BaseName
}

# 4. Schedule (empty for now; future: read from calendar)
$schedule = @()

# Build and write JSON
$data = [ordered]@{
    updatedAt     = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
    jobCount      = $jobCount
    socialLabel   = $socialLabel
    briefingTitle = $briefingTitle
    schedule      = $schedule
}

$data | ConvertTo-Json -Depth 3 | Out-File -FilePath $outputFile -Encoding UTF8 -Force
Write-Host "dashboard.json updated: jobs=$jobCount social=$socialLabel"
