// Rebuild the standalone learning package from canonical Markdown and SVG.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath,pathToFileURL } from 'node:url';
import { fixtures } from './signature-demo.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url));
if(!process.argv[2]) throw new Error('Pass an installed marked module path');
const { marked }=await import(pathToFileURL(path.resolve(process.argv[2])).href);
const files=['01-教材.md','02-作業.md','03-解答.md','圖解.html','signature-demo.mjs','build.mjs'];
const raw=files.map(f=>fs.readFileSync(path.join(dir,f),'utf8'));
const diagram=raw[3], fixture=fixtures();
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const demo=`<div class="table-scroll" tabindex="0" role="region" aria-label="正常與改收款人的簽章結果"><table><thead><tr><th>作者實跑案例</th><th>驗證結果</th><th>這次能判定什麼？</th></tr></thead><tbody><tr><td>C1：原訊息、Alice 公鑰、原簽章</td><td>${fixture.rows[0].result?'True':'False'}</td><td>這組資料的簽章驗過；付款合法性仍需其他檢查</td></tr><tr><td>C3：只把 Bob 改成 Eve，公鑰與簽章不改</td><td>${fixture.rows[2].result?'True':'False'}</td><td>原簽章驗不過改後訊息，符合這次應拒絕的預期</td></tr></tbody></table></div><details class="sample"><summary>完整簽章樣本與執行版本｜需要核對時展開</summary><p>本例的算法是 Ed25519。作者以 Node.js 的 crypto.sign／crypto.verify 簽署及驗證，學員不需安裝 Node.js。SPKI DER 是這裡公鑰的封裝格式名稱，hex 指十六進位顯示；下列長字串供完整核對，不要求背誦或手算。<a href="https://nodejs.org/api/crypto.html">算法與 API 說明</a></p><p>原訊息（UTF-8）：</p><pre>${escape(fixture.message)}</pre><p>C3 改後訊息（UTF-8）：</p><pre>${escape(fixture.rows[2].input)}</pre><p>Alice 測試公鑰（SPKI DER hex）：</p><pre>${fixture.alicePublic}</pre><p>原簽章（hex）：</p><pre>${fixture.signature}</pre><p>公開測試金鑰不能用來保管資產。作者執行環境：Node ${fixture.node}／OpenSSL ${fixture.openssl}。</p></details>`;
const answers='| 案例 | 作者重算結果 |\n|---|---|\n'+fixture.rows.map(r=>`| ${r.id} | ${r.result?'True':'False'}${r.authorized===false?'；授權拒絕':''} |`).join('\n')+`\n\nC8 驗證公鑰（Eve／SPKI DER hex）：\n\n<pre>${fixture.evePublic}</pre>\n\nC8 簽章（hex）：\n\n<pre>${fixture.rows[7].signature}</pre>\n`+'\n\n只簽 `amount=7` 的樣本也實跑為 True，收款人不在被簽資料內，不能用它核准 Bob 的完整付款要求。';
const hashInputs=['Alice pays Bob 7','Alice pays Bob 70','Alice pays Bob 7 ','Alice pays Carol 7','Alice pays Bob 7\n'];
const hashAnswers='<pre>'+hashInputs.map(s=>`${JSON.stringify(s)}\n${hash(s)}`).join('\n\n')+'</pre>';
function render(s){
  s=s.replace(/^# .+\n/m,'').replace('<!-- signature:demo -->',demo).replace('<!-- signature:answers -->',answers).replace('<!-- hashes:answers -->',hashAnswers).replace(/<!-- diagram:([a-z]+) -->/g,(_,id)=>{
    const figure=diagram.match(new RegExp(`<figure class="course-diagram" id="diagram-${id}">[\\s\\S]*?<\\/figure>`))?.[0];
    if(!figure) throw new Error('Missing diagram '+id);
    return figure;
  });
  return marked.parse(s,{gfm:true}).replace(/<table>/g,'<div class="table-scroll" tabindex="0" role="region" aria-label="可橫向捲動表格"><table>').replace(/<\/table>/g,'</table></div>');
}
const split=raw[2].indexOf('## 評分與補強');
if(split<0) throw new Error('Missing rubric');
const manifest=files.map((f,i)=>`${f}: ${hash(raw[i])}`).join('\n');
const style=diagram.match(/<style id="course-diagram-style">([\s\S]*?)<\/style>/)?.[1];
const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>第二章學習包｜Hash、簽章與錢包</title><style>
:root{--ink:#18302e;--accent:#146354;--line:#d8e2dc}*{box-sizing:border-box}body{margin:0;background:#f2f4ee;color:var(--ink);font:17px/1.85 system-ui,"Microsoft JhengHei",sans-serif}.wrap{max-width:1050px;margin:auto;padding:40px 28px}h1{font-size:clamp(28px,4vw,42px);line-height:1.4}h2{font-size:25px}h3{font-size:20px}a{color:var(--accent);text-underline-offset:4px}nav{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0}section,details.panel{padding:28px;background:#fffefa;border:1px solid var(--line);border-radius:10px;margin:24px 0;min-width:0}pre{background:#172e2a;color:#ecf5ef;padding:18px;border-radius:6px;overflow:auto;font:14px/1.7 Consolas,monospace}code{font-family:Consolas,monospace}.table-scroll{overflow:auto}table{border-collapse:collapse;min-width:500px;width:100%;font-size:15px}td,th{padding:12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{background:#eaf0e8}summary{cursor:pointer;font-size:21px;font-weight:700}button{font:inherit;padding:8px 14px;border:0;background:var(--accent);color:white;border-radius:5px;cursor:pointer}a:focus-visible,summary:focus-visible,button:focus-visible,[tabindex]:focus-visible{outline:3px solid #b76d10;outline-offset:4px}.small,footer{font-size:14px;color:#546865}footer{overflow-wrap:anywhere}.source pre{white-space:pre-wrap;overflow-wrap:anywhere}.source summary{font-size:14px}.skip{position:absolute;top:-100px}.skip:focus{top:0;background:white;padding:10px}@media(max-width:720px){.wrap{padding:24px 16px}section,details.panel{padding:20px 16px}body{font-size:16px}pre{font-size:13px}}@media print{nav,button,.source,.skip{display:none}.wrap{padding:0}body{background:white;font-size:11pt}section,details.panel{padding:0;border:0}details:not([open]){display:none}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#eee;color:black}table{min-width:0}.table-scroll{overflow:visible}}
${style}</style></head><body><a class="skip" href="#workbook">跳到作業與診斷</a><div class="wrap"><header><p class="small">WEB3 × QA / CHAPTER 02</p><h1>內容沒改，就一定是本人同意嗎？</h1><p>從 Alice 付 7 點給 Bob 開始，看清資料、金鑰、簽章與付款意圖怎麼連起來。</p><p>約六小時，可分週；必修可離線閱讀。Python 在本機執行，簽章用作者實跑的固定樣本判讀。</p><p class="small">先保留診斷原答，再讀教材。答案預設收合；頁面不保存作答，也不自動評分。列印只包含展開的內容。</p><button id="print" type="button">列印／另存 PDF</button></header><nav aria-label="學習包目錄"><a href="#workbook">診斷與作業</a><a href="#lesson">教材與圖解</a><a href="#rubric">評分與補強</a><a href="#answers">參考解答</a></nav><main><section id="lesson"><h2>Web3 與 QA 教材</h2>${render(raw[0])}</section><section id="workbook"><h2>診斷、練習與新情境</h2>${render(raw[1])}</section><section id="rubric">${render(raw[2].slice(split))}</section><details class="panel" id="answers"><summary>參考解答｜作答後再開啟</summary>${render(raw[2].slice(0,split))}</details></main><footer>第二章 · 2026-10-05 · 作者自查與技術驗證，不代表學員掌握或獨立安全審查。來源連結為選讀；完成必修不需外部文章。<details class="source"><summary>內容來源版本</summary><pre>${escape(manifest)}</pre></details></footer></div><script>document.getElementById('print').addEventListener('click',()=>window.print());</script></body></html>`;
fs.writeFileSync(path.join(dir,'第二章學習包.html'),html,'utf8');
console.log(JSON.stringify({output:'第二章學習包.html',bytes:Buffer.byteLength(html),signatureResults:fixture.rows.map(r=>[r.id,r.result]),sources:files}));
