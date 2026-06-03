# Compile Vault — 呼叫 headless Claude 執行 /compile
# Claude 會自動讀取 vault 根目錄的 CLAUDE.md

$env:PYTHONIOENCODING = 'utf-8'
Set-Location "d:\Claude\obsidian"

Write-Host "[Compile] 啟動 headless Claude，執行 /compile..."
Write-Host "[Compile] 這可能需要幾分鐘，請查看 wiki/log.md 確認結果"

claude -p "/compile"
