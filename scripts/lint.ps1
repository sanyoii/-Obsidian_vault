# Lint Vault — 呼叫 headless Claude 執行 /lint
# Claude 會自動讀取 vault 根目錄的 CLAUDE.md

$env:PYTHONIOENCODING = 'utf-8'
Set-Location "d:\Claude\obsidian"

Write-Host "[Lint] 啟動 headless Claude，執行 /lint..."
Write-Host "[Lint] 結果將輸出至 output/lint_<日期>.md"

claude -p "/lint"
