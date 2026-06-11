# update-job-status.ps1 — update job_groups.user_status in SQLite
param([string]$Arg)   # format: "groupId|status"
$parts   = $Arg -split '\|'
$GroupId = $parts[0].Trim()
$Status  = $parts[1].Trim()
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$py = @"
import sqlite3, sys
db = r'd:\Claude\job-crawler\jobs.db'
conn = sqlite3.connect(db)
conn.execute('UPDATE job_groups SET user_status=? WHERE id=?', (sys.argv[1], int(sys.argv[2])))
conn.commit()
conn.close()
print('ok')
"@
$tmp = [System.IO.Path]::GetTempFileName() + ".py"
$py | Out-File -FilePath $tmp -Encoding UTF8
python $tmp $Status $GroupId 2>$null
Remove-Item $tmp -ErrorAction SilentlyContinue
