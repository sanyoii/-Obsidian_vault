# update-job-status.ps1 — approve/update package status in Jobsmith SQLite
# format: "packageId|approved" (approved: 1=核可, 0=待審)
param([string]$Arg)
$parts     = $Arg -split '\|'
$PackageId = $parts[0].Trim()
$Approved  = $parts[1].Trim()
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$py = @"
import sqlite3, sys
db = r'd:\Claude\active\jobsmith\data\app.sqlite'
conn = sqlite3.connect(db)
conn.execute('UPDATE packages SET approved=? WHERE id=?', (int(sys.argv[1]), int(sys.argv[2])))
conn.commit()
conn.close()
print('ok')
"@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$py | Out-File -FilePath $tmp -Encoding UTF8
python $tmp $Approved $PackageId 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
