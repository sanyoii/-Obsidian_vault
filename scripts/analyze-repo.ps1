# analyze-repo.ps1 - 用 headless Claude + repomix-explorer 分析 GitHub repo，寫入 wiki
param([string]$Repo)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

if (-not $Repo) { Write-Error "Usage: analyze-repo.ps1 <owner/repo>"; exit 1 }

Set-Location "d:\Claude\obsidian"
Write-Host "Analyzing: $Repo"

$prompt = @"
請分析這個 GitHub repo：https://github.com/$Repo

操作步驟：
1. 使用 repomix-explorer skill 分析 https://github.com/$Repo
   - 執行：npx repomix@latest --remote $Repo --style plain --output /tmp/repomix-analysis.txt
   - 閱讀輸出內容，了解 repo 結構與功能

2. 在 wiki/Github/repos/ 建立文章（參考現有文章格式），必須包含：
   - 一段話說明這個 repo 做什麼
   - 主要功能列表（條列）
   - 技術棧（語言、框架）
   - 與現有系統的相關性評估（Obsidian Vault + Claude Code + automation + skills 環境）
   - 安裝建議：適合安裝 ✅ / 觀望 ⏳ / 不適合 ❌ + 理由一句話

3. 更新 wiki/_index.md：在 Github/repos 區塊加入新條目

4. 在 wiki/log.md 加入一筆記錄：
   YYYY-MM-DD HH:MM | COMPILE | github.com/$Repo → wiki/Github/repos/<名稱>.md | repomix 分析
"@

claude -p $prompt
