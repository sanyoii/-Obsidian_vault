# fetch-section.ps1 — refresh one panel's data in dashboard.json
param([string]$Section)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$env:PYTHONIOENCODING = 'utf-8'

$vaultRoot  = "d:\Claude\obsidian"
$outputFile = "$vaultRoot\data\dashboard.json"

# Load existing JSON
$existing = @{}
if (Test-Path $outputFile) {
    try { $existing = (Get-Content $outputFile -Raw -Encoding UTF8 | ConvertFrom-Json -AsHashtable) }
    catch { $existing = @{} }
}

function RunPy($code) {
    $tmp = [System.IO.Path]::GetTempFileName() + ".py"
    $code | Out-File -FilePath $tmp -Encoding UTF8
    $r = python $tmp 2>$null
    Remove-Item $tmp -ErrorAction SilentlyContinue
    if ($r) { return ($r | ConvertFrom-Json) } else { return $null }
}

switch ($Section) {
    "github" {
        $py = @'
import sys, json, re as _re
try:
    import requests
    from bs4 import BeautifulSoup
    r = requests.get("https://github.com/trending?since=daily",
                     headers={"User-Agent":"Mozilla/5.0"}, timeout=12)
    soup = BeautifulSoup(r.text, "html.parser")
    result = []
    for i, article in enumerate(soup.select("article.Box-row")[:10], 1):
        repo = article.select_one("h2 a")
        desc = article.select_one("p")
        stars_el = article.select_one("span.d-inline-block.float-sm-right")
        lang_el  = article.select_one("span[itemprop='programmingLanguage']")
        d = desc.text.strip() if desc else ""
        stars_txt = stars_el.text.strip() if stars_el else ""
        stars_num = _re.sub(r"[^\d,]", "", stars_txt).replace(",","")
        result.append({"rank":i,"repo":repo["href"].lstrip("/") if repo else "",
                       "desc":(d[:68]+"...") if len(d)>68 else d,
                       "stars":stars_num or "0","lang":lang_el.text.strip() if lang_el else ""})
    print(json.dumps(result, ensure_ascii=False))
except: print("[]")
'@
        $data = RunPy $py
        if ($data) { $existing["github"] = $data; Write-Host "github: $($data.Count) items" }
    }
    "hn" {
        $py = @'
import sys, json
try:
    import requests
    ids = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json", timeout=10).json()[:10]
    result = []
    for i, id in enumerate(ids, 1):
        item = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{id}.json", timeout=6).json()
        result.append({"rank":i,"title":item.get("title",""),"score":item.get("score",0),
                       "url":item.get("url",""),"id":id})
    print(json.dumps(result, ensure_ascii=False))
except: print("[]")
'@
        $data = RunPy $py
        if ($data) { $existing["hn"] = $data; Write-Host "hn: $($data.Count) items" }
    }
    "ithome" {
        $py = @'
import sys, json
try:
    import requests
    from xml.etree import ElementTree as ET
    r = requests.get("https://www.ithome.com.tw/rss", headers={"User-Agent":"Mozilla/5.0"}, timeout=12)
    root = ET.fromstring(r.content)
    ns = {"dc":"http://purl.org/dc/elements/1.1/"}
    items = root.findall(".//item")[:15]
    result = [{"rank":i,"title":item.findtext("title",""),"url":item.findtext("link",""),
               "date":item.findtext("pubDate","").split()[0],"author":item.findtext("dc:creator","--",ns)}
              for i,item in enumerate(items,1)]
    print(json.dumps(result, ensure_ascii=False))
except: print("[]")
'@
        $data = RunPy $py
        if ($data) { $existing["ithome"] = $data; Write-Host "ithome: $($data.Count) items" }
    }
    "techorange" {
        $py = @'
import sys, json, email.utils
try:
    import requests
    from xml.etree import ElementTree as ET
    r = requests.get("https://techorange.com/feed/", headers={"User-Agent":"Mozilla/5.0"}, timeout=12)
    root = ET.fromstring(r.content)
    ns = {"dc":"http://purl.org/dc/elements/1.1/"}
    items = root.findall(".//item")[:10]
    result = []
    for i, item in enumerate(items, 1):
        pd = item.findtext("pubDate","")
        try:    date = email.utils.parsedate_to_datetime(pd).strftime("%Y-%m-%d")
        except: date = pd[:10]
        result.append({"rank":i,"title":item.findtext("title",""),"url":item.findtext("link",""),
                       "date":date,"author":item.findtext("dc:creator","--",ns)})
    print(json.dumps(result, ensure_ascii=False))
except: print("[]")
'@
        $data = RunPy $py
        if ($data) { $existing["techorange"] = $data; Write-Host "techorange: $($data.Count) items" }
    }
    "techcrunch" {
        $py = @'
import sys, json, email.utils
try:
    import requests
    from xml.etree import ElementTree as ET
    r = requests.get("https://techcrunch.com/feed/", headers={"User-Agent":"Mozilla/5.0"}, timeout=12)
    root = ET.fromstring(r.content)
    ns = {"dc":"http://purl.org/dc/elements/1.1/"}
    items = root.findall(".//item")[:10]
    result = []
    for i, item in enumerate(items, 1):
        pd = item.findtext("pubDate","")
        try:    date = email.utils.parsedate_to_datetime(pd).strftime("%Y-%m-%d")
        except: date = pd[:10]
        result.append({"rank":i,"title":item.findtext("title",""),"url":item.findtext("link",""),
                       "date":date,"author":item.findtext("dc:creator","--",ns)})
    print(json.dumps(result, ensure_ascii=False))
except: print("[]")
'@
        $data = RunPy $py
        if ($data) { $existing["techcrunch"] = $data; Write-Host "techcrunch: $($data.Count) items" }
    }
    default { Write-Host "Unknown section: $Section"; exit 1 }
}

$existing["updatedAt"] = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
$existing | ConvertTo-Json -Depth 5 | Out-File -FilePath $outputFile -Encoding UTF8 -Force
Write-Host "dashboard.json updated (section: $Section)"
