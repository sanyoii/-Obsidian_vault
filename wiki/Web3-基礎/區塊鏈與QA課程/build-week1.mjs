// Rebuild from canonical Markdown; pass an installed marked module path.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import crypto from 'node:crypto';
const dir = path.dirname(fileURLToPath(import.meta.url));
if (!process.argv[2]) throw new Error('Pass the path to an installed marked module.');
const { marked } = await import(pathToFileURL(path.resolve(process.argv[2])).href);
const files = ['00-課程入口.md','01-第1週教材.md','02-第1週作業.md','03-第1週解答.md','06-Web3與QA課程設計.md'];
const raw = files.map(f => fs.readFileSync(path.join(dir,f),'utf8'));
const diagramFile = '圖解/第一章圖解.html';
const diagramSource = fs.readFileSync(path.join(dir,diagramFile),'utf8');
const diagramStyle = diagramSource.match(/<style id="course-diagram-style">([\s\S]*?)<\/style>/)?.[1];
if (!diagramStyle) throw new Error('Missing course diagram styles');
const strip = s => s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').replace(/\n## 反向連結[\s\S]*$/,'').replace(/^# .+\n/m,'');
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const anchors = {'00-課程入口':'overview','01-第1週教材':'lesson','02-第1週作業':'workbook','03-第1週解答':'answers','06-Web3與QA課程設計':'design'};
function render(s) {
  s=s.replace(/<!-- diagram:([a-z-]+) -->/g,(_,id)=>{
    const figure=diagramSource.match(new RegExp(`<figure class="course-diagram" id="diagram-${id}">[\\s\\S]*?<\\/figure>`))?.[0];
    if(!figure) throw new Error(`Missing diagram: ${id}`);
    return figure+'\n';
  });
  s=s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(_,target,label)=>{
    const name=target.split('/').at(-1), id=anchors[name];
    if(id) return `[${label||name}](#${label==='課前診斷'?'diagnostic':id})`;
    const relative=path.posix.relative('wiki/Web3-基礎/區塊鏈與QA課程',target+'.md');
    return `[${label||name}（需原 Wiki 檔）](${relative.split('/').map(encodeURIComponent).join('/')})`;
  });
  return marked.parse(s,{gfm:true}).replace(/<table>/g,'<div class="table-scroll" tabindex="0" role="region" aria-label="可橫向捲動的表格"><table>').replace(/<\/table>/g,'</table></div>');
}
const [overview,lesson,workbook,key,design]=raw.map(strip);
const rubricAt=key.indexOf('## 評分與補強');
if(rubricAt<0) throw new Error('Missing rubric');
const rubric=key.slice(rubricAt), answers=key.slice(0,rubricAt);
const diagnosticAt=workbook.indexOf('## 練習 A');
if(diagnosticAt<0) throw new Error('Missing exercises');
const diagnostic=workbook.slice(0,diagnosticAt), exercises=workbook.slice(diagnosticAt);
const manifest=files.map((f,i)=>`${f}: ${crypto.createHash('sha256').update(raw[i]).digest('hex')}`).concat(`${diagramFile}: ${crypto.createHash('sha256').update(diagramSource).digest('hex')}`).join('\n');
const html=`<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>第一章學習包｜Web3 與 QA</title>
<style>
:root{color-scheme:light;--ink:#18302e;--muted:#546865;--line:#d8e2dc;--paper:#fffefa;--accent:#146354}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:30px}body{margin:0;background:#f2f4ee;color:var(--ink);font:17px/1.85 system-ui,"Microsoft JhengHei",sans-serif}a{color:var(--accent);text-underline-offset:4px}a:hover{color:#0c4136}a:focus-visible,summary:focus-visible,button:focus-visible,[tabindex]:focus-visible{outline:3px solid #b76d10;outline-offset:5px}.skip{position:absolute;top:-100px}.skip:focus{top:10px;left:10px;background:white;padding:8px;z-index:9}.wrap{max-width:1180px;margin:auto;padding:48px 32px}.eyebrow{font-size:13px;letter-spacing:.14em;font-weight:700;color:var(--accent)}header{border-bottom:1px solid var(--line);padding-bottom:30px;margin-bottom:32px}h1{font-size:clamp(30px,4vw,48px);line-height:1.3;letter-spacing:-.03em;margin:12px 0}header p{color:var(--muted);max-width:760px}.badge{display:inline-block;padding:4px 12px;border:1px solid var(--line);border-radius:4px;font-size:14px;margin:4px 6px 4px 0}.layout{display:grid;grid-template-columns:190px minmax(0,1fr);gap:38px}nav{position:sticky;top:24px;align-self:start}nav a{display:block;text-decoration:none;padding:9px 12px;border-left:2px solid var(--line);font-size:15px}nav a:hover{background:#e6eee7;border-color:var(--accent)}main{min-width:0}section,details.panel{padding:30px 34px;background:var(--paper);border:1px solid var(--line);border-radius:10px;margin-bottom:24px}h2{font-size:25px;line-height:1.5;margin:1.7em 0 .7em}section>h2:first-child{margin-top:0}h3{font-size:20px;margin-top:1.6em}p{margin:.8em 0}li{margin:.3em 0}pre{background:#172e2a;color:#ecf5ef;padding:22px;border-radius:6px;overflow-x:auto;font-size:14px;line-height:1.65;tab-size:4}code{font-family:Consolas,monospace}p code,li code{background:#eaf0e8;padding:2px 5px;border-radius:3px}table{border-collapse:collapse;width:100%;font-size:15px;min-width:480px}th,td{padding:11px 13px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}th{background:#eaf0e8}tr:last-child td{border-bottom:0}.table-scroll{overflow:auto;margin:20px 0}summary{cursor:pointer;font-weight:700;font-size:21px}summary::marker{color:var(--accent)}.note{border-left:3px solid var(--accent);padding:8px 16px;background:#edf3ed}.small,footer{font-size:14px;color:var(--muted)}button{font:inherit;padding:8px 14px;background:var(--accent);color:white;border:0;border-radius:5px;cursor:pointer}.actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}footer{padding:24px 0;overflow-wrap:anywhere}details.source{font-size:13px}details.source summary{font-size:14px}details.source pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#eaf0e8;color:var(--ink)}
@media(max-width:720px){.wrap{padding:26px 16px}.layout{display:block}nav{position:static;display:flex;flex-wrap:wrap;gap:4px;margin-bottom:20px}nav a{padding:7px 10px;border:1px solid var(--line);border-radius:4px}section,details.panel{padding:22px 18px}body{font-size:16px}h2{font-size:22px}pre{font-size:13px;padding:16px}}
@media print{body{background:white;font-size:11pt}.wrap{max-width:none;padding:0}.layout{display:block}nav,.actions,.skip,.source{display:none}section,details.panel{border:0;padding:0;margin:0 0 24px;break-inside:auto}pre{white-space:pre-wrap;overflow-wrap:anywhere;color:black;background:#f3f3f3}table{min-width:0;font-size:10pt}h2,h3{break-after:avoid}.table-scroll{overflow:visible}a{color:inherit}details:not([open]){display:none}footer{font-size:9pt}}
${diagramStyle}
</style></head><body><a class="skip" href="#diagnostic">跳到課前診斷</a><div class="wrap">
<header><div class="eyebrow">WEB3 × QA / CHAPTER 01</div><h1>同一筆錢，能花兩次嗎？</h1><p>Alice 只有 10 點，卻想付 7 點給 Bob、6 點給 Carol。一起算算看：哪筆能付？換個順序會怎樣？程式說付款失敗，錢有沒有真的留在原處？</p><span class="badge">約 6 小時，依實際用時調整</span><span class="badge">Python 基礎</span><span class="badge">包內解說、練習與補課</span><div class="actions"><a href="#diagnostic">第一次學：先做課前診斷</a><a href="#lesson">已做診斷：閱讀第一堂</a><button id="print" type="button">列印／另存 PDF</button></div><p class="small">作答寫在自己的筆記裡，再貼回對話討論；這個頁面不會儲存答案或自動評分。Python 程式請在自己的電腦執行。解答要點開才看得到，列印也只會印出已展開的內容。</p></header>
<div class="layout"><nav aria-label="學習包目錄"><a href="#diagnostic">01 課前診斷</a><a href="#lesson">02 Web3 與 QA 教材</a><a href="#workbook">03 練習與驗收</a><a href="#rubric">04 評分規則</a><a href="#answers">05 參考解答</a><a href="#overview">課程路線</a><a href="#design">全課程設計與取材</a></nav><main>
<section id="diagnostic"><h2>課前診斷</h2>${render(diagnostic)}</section>
<section id="lesson"><h2>第一章 Web3 與 QA 教材</h2>${render(lesson)}</section>
<section id="workbook"><h2>練習與課後驗收</h2>${render(exercises)}</section>
<section id="rubric">${render(rubric)}</section>
<details class="panel" id="answers"><summary>參考解答｜做完再點開核對</summary><p class="note">原本的答案照留，把修正寫在旁邊。看過這份解答再做的題目，註明「看過解答後重做」，之後才知道哪些還需要自己練一次。</p>${render(answers)}</details>
<details class="panel" id="overview"><summary>課程入口與章節路線</summary>${render(overview)}</details>
<details class="panel" id="design"><summary>全課程設計、QA 練習與舊資料去向</summary>${render(design)}</details>
</main></div><footer>第一章學習包 · 2026-10-05 · 沿用第一週檔名。以同資料夾 Markdown 為內容來源；必修解說、練習與補課可離線閱讀。來源及延伸連結為選讀，開啟時需要網路或原 Wiki 檔。<details class="source"><summary>來源檔案版本</summary><pre>${escape(manifest)}</pre></details></footer></div>
<script>document.getElementById('print').addEventListener('click',()=>window.print());</script></body></html>`;
fs.writeFileSync(path.join(dir,'第一週學習包.html'),html,'utf8');
console.log(JSON.stringify({output:'第一週學習包.html',bytes:Buffer.byteLength(html),sources:[...files,diagramFile]},null,2));
