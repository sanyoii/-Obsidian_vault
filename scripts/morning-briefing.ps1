# Morning Briefing - social-monitor + job-crawler -> wiki/Morning_YYYY-MM-DD.md
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$vaultRoot  = "d:\Claude\obsidian"
$today      = (Get-Date).ToString('yyyy-MM-dd')
$now        = (Get-Date).ToString('yyyy-MM-dd HH:mm')
$outputFile = "$vaultRoot\wiki\Daily\Morning_$today.md"

# 1. Social Monitor: latest report
$reportsDir   = "d:\Claude\social-monitor\reports"
$latestReport = Get-ChildItem "$reportsDir\report-*.md" -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($latestReport) {
    $socialContent = Get-Content $latestReport.FullName -Raw -Encoding UTF8
    $socialLabel   = $latestReport.Name -replace 'report-','' -replace '\.md',''
} else {
    $socialContent = "(no report found)"
    $socialLabel   = "N/A"
}

# 2. Jobsmith: pending packages in last 3 days
$jobsDb  = "d:\Claude\active\jobsmith\data\app.sqlite"
$jobText = "(Jobsmith DB not found — run jobsmith at least once)"

if (Test-Path $jobsDb) {
    $pyCode = @'
import sqlite3, sys
from datetime import datetime, timedelta
conn = sqlite3.connect(sys.argv[1])
cur  = conn.cursor()
cutoff = (datetime.now() - timedelta(days=3)).isoformat()
cur.execute("""
    SELECT company, job_title, match_score, created_at
    FROM packages
    WHERE status='done' AND (approved IS NULL OR approved=0)
      AND created_at >= ?
    ORDER BY created_at DESC
    LIMIT 30
""", (cutoff,))
rows = cur.fetchall()
for company, title, score, created in rows:
    d = created[:10] if created else ''
    s = f" | 適配 {score}分" if score else ''
    print(f"- **{company}** - {title}{s} | {d}")
print(f"TOTAL:{len(rows)}")
conn.close()
'@

    $tmpPy = [System.IO.Path]::GetTempFileName() + ".py"
    $pyCode | Out-File -FilePath $tmpPy -Encoding UTF8
    $pyOut = python $tmpPy $jobsDb 2>$null
    Remove-Item $tmpPy -ErrorAction SilentlyContinue

    $totalLine = $pyOut | Where-Object { $_ -match '^TOTAL:' }
    $jobLines  = $pyOut | Where-Object { $_ -notmatch '^TOTAL:' }
    $total     = if ($totalLine) { ($totalLine -replace 'TOTAL:','').Trim() } else { '0' }

    if ($jobLines.Count -gt 0) {
        $jobText = ($jobLines -join "`n") + "`n`n(Total: $total)"
    } else {
        $jobText = "(no unread jobs in last 3 days)"
    }
}

# 3. Build output
$lines = @(
    "---",
    "date: $today",
    "tags:",
    "  - morning-briefing",
    "  - daily",
    "---",
    "",
    "# Morning Briefing $today",
    "",
    "> Generated: $now",
    "",
    "---",
    "",
    "## Social Monitor ($socialLabel)",
    "",
    $socialContent,
    "",
    "---",
    "",
    "## New Jobs (last 3 days, unread)",
    "",
    $jobText,
    "",
    "---",
    "",
    "## Today's Tasks",
    "",
    "- [ ] "
)

$output = $lines -join "`n"
[System.IO.File]::WriteAllText($outputFile, $output, [System.Text.Encoding]::UTF8)

Write-Host "Morning Briefing created: $outputFile"

# Sync dashboard.json so Panel shows today's briefing immediately
$dashboardFile = "$vaultRoot\data\dashboard.json"
New-Item -ItemType Directory -Force -Path "$vaultRoot\data" | Out-Null
$dashData = [ordered]@{
    updatedAt     = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
    jobCount      = if ($jobLines.Count -gt 0) { $jobLines.Count } else { 0 }
    socialLabel   = $socialDate
    briefingTitle = "Morning_$today"
    schedule      = @()
}
$dashData | ConvertTo-Json -Depth 3 | Out-File -FilePath $dashboardFile -Encoding UTF8 -Force
Write-Host "dashboard.json synced"

# 4. Open in Obsidian via CLI (if available)
$relPath = "wiki\Daily\Morning_$today"
if (Get-Command obsidian -ErrorAction SilentlyContinue) {
    obsidian open file="$relPath"
} else {
    Write-Host "obsidian CLI not found. Open manually: $relPath"
}
