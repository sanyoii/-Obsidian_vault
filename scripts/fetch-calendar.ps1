# fetch-calendar.ps1 - 呼叫 headless Claude 取得今日 Google Calendar 行程
# 輸出至 data/calendar.json，供 dashboard.json 的 schedule 欄位使用
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$vaultRoot = "d:\Claude\obsidian"
$calFile   = "$vaultRoot\data\calendar.json"
$today     = (Get-Date).ToString('yyyy-MM-dd')
$tz        = "+08:00"

Set-Location $vaultRoot

$prompt = @"
Use the Google Calendar MCP tool to fetch my events for today.

Call mcp__claude_ai_Google_Calendar__list_events with these parameters:
- calendar_id: "primary"
- time_min: "${today}T00:00:00${tz}"
- time_max: "${today}T23:59:59${tz}"

After getting the results, write ONLY a JSON array to the file data/calendar.json.
Format each event as: {"time": "HH:MM", "title": "event title", "location": "location or empty string"}
Sort by time ascending. If no events, write [].
Do not write any markdown, explanation, or other text — ONLY the raw JSON array.
"@

Write-Host "Fetching today's Google Calendar events ($today)..."
claude --dangerously-skip-permissions -p $prompt
Write-Host "Calendar fetch complete. Check data/calendar.json"
