# fetch-email-brief.ps1 - 用 headless Claude + Gmail MCP 整理重要郵件摘要
# 輸出 data/email-brief.json，供 Dashboard EMAIL BRIEF 區塊顯示
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$vaultRoot = "d:\Claude\obsidian"
Set-Location $vaultRoot

$prompt = @"
Use Gmail MCP to fetch and summarize recent important emails. Follow these steps exactly:

Step 1: Call mcp__claude_ai_Gmail__search_threads with:
  query: "is:unread OR is:important newer_than:2d"
  max_results: 15

Step 2: For each thread returned, call mcp__claude_ai_Gmail__get_thread to read the content.

Step 3: For each email, assess:
  - importance level (pick ONE):
      "Emergency" = must reply or act within a few hours, time-sensitive
      "High"      = needs action today
      "Medium"    = worth reading soon, no immediate action needed
      "Low"       = FYI only, newsletters, notifications
  - todos: array of specific action items you can extract from the email body (empty [] if none)
  - from: sender's name (prefer display name over email address)
  - subject: email subject, max 60 characters
  - time: time received as HH:MM if today, or "yesterday" / "Jun 1" for older

Step 4: Write ONLY a valid JSON array to the file data/email-brief.json.
No markdown, no explanation, no code fences — just the raw JSON array.

Format:
[
  {
    "from": "Sender Name",
    "subject": "Email subject here",
    "importance": "Emergency",
    "todos": ["Specific action item 1", "Action item 2"],
    "time": "10:30"
  }
]

Rules:
- Sort by importance: Emergency first, then High, Medium, Low
- Within same importance: newest first
- Include maximum 10 emails total
- Skip automated emails (GitHub notifications, newsletters) unless Emergency/High
- If truly nothing important, write []
"@

Write-Host "Fetching email brief from Gmail..."
claude --dangerously-skip-permissions -p $prompt
Write-Host "Email brief fetch complete. Check data/email-brief.json"
