---
source: "https://github.com/QingYunA/answer-me-with-html"
author: "QingYunA"
stars: "3.6K"
clipped: 2026-10-18
tags:
  - "github/repo"
  - "agent-skill"
  - "html"
---

# answer-me-with-html — Markdown 轉單頁 HTML 的 Agent Skill 與採用評估

## 一句話說明

讓 Agent 專心寫短版 Markdown，再由內附 CLI 把內容排成含圖表、表格及註解的一頁 HTML。適合反覆產製技術解說與比較頁；目前建議按需試用，先不加入全域自動路由。

本次完成固定版本原始碼審閱、GitHub REST 查詢、Repomix、官方網站擷取，以及隔離 CLI 驗證。**未安裝到全域 Skills，未修改 AGENTS.md，未啟用 always-on 或伺服器。**

## 專案概覽

以下為 2026-10-18 的查詢快照；程式碼分析固定在 commit `4df04fd7debe2fed879650e3a0f4e4ac53e09192`，不隨 main 漂移。

| 項目 | 數值 |
|---|---|
| Repository | QingYunA/answer-me-with-html |
| Stars | 3,628 |
| Forks | 254 |
| 主要語言 | JavaScript；ES Modules |
| 授權 | MIT；此處只記 repo 標示，未做逐項第三方授權稽核 |
| 建立時間 | 2026-10-02 09:57:40 UTC |
| 最後推送 | 2026-10-18 03:25:54 UTC |
| 固定 commit 時間 | 2026-10-18 11:17:41 +08:00 |
| 套件版本 | 0.5.5；固定 HEAD 包含 v0.5.5 發布後的修正 |
| 最新 Release | v0.5.5，2026-10-16 |
| Open Issues / Open PRs | 6 / 3；以分開查詢區分，REST open_issues_count=9 包含 PR |
| GitHub size | 24,672 KB；不是執行期記憶體或安裝大小 |
| Archived | false |
| 首頁 | https://answer-me-with-html.com/ |
| Topics | agent-skill、ai-agent、claude-code、diagram、explainer、html、ste100 等 |

來源：[GitHub REST metadata](https://api.github.com/repos/QingYunA/answer-me-with-html)、[固定版本](https://github.com/QingYunA/answer-me-with-html/tree/4df04fd7debe2fed879650e3a0f4e4ac53e09192)、[Releases](https://github.com/QingYunA/answer-me-with-html/releases)。`gh repo view` 的 GraphQL 回傳 HTTP 401；公開 REST 可讀，因此沒有更動登入或 token。

## Repomix 深度分析

使用既有 Repomix v1.14.0，對固定 checkout 執行 `--no-gitignore`，未壓縮。這能避免外層 `work/` ignore 讓分析變成零檔案。

| 指標 | 數值 |
|---|---|
| 打包檔案 | 318 |
| 總 Tokens | 988,991 |
| 總字元 | 3,151,382 |
| 壓縮模式 | 未使用 --compress |
| 排除項 | 二進位等預設排除；安全掃描另外排除 test/code.test.js |

| 最大檔案 Top 5 | Tokens | 佔比 |
|---|---:|---:|
| skills/answer-me-with-html/scripts/am.mjs | 329,859 | 33.4% |
| site/src/style.css | 19,634 | 2.0% |
| src/cli.js | 14,837 | 1.5% |
| test/video.test.js | 14,159 | 1.4% |
| docs/demo/demo.html | 12,934 | 1.3% |

`am.mjs` 是已打包的 CLI，包含依賴，不能把這個檔案大小當成每次載入 Skill 的 prompt tokens。XML 是導航及統計證據；核心實作另外直接閱讀。被排除的測試檔有用來測試密鑰偵測的合成字串，本次未把掃描結果當成憑證外洩證據，也未做完整安全認證。

## 核心功能

- **Markdown 轉頁面**：frontmatter 設定語言、主題、版型；二級標題切成面板。支援 sheet、doc，以及另一條 video 路線。
- **內建圖表語法**：11 種元件，包括 flow、sequence、tree、timeline、ER、chart、callout、ask。flow 透過 Dagre 算座標，減少模型手寫 SVG。
- **STE 文字檢查**：可提出句長及詞彙建議；不等於事實查核，也不能取代本地文案語氣標準。
- **單檔交付與局部修訂**：樣式、runtime、本地圖片內嵌；`patch` 能改指定面板，保留其他內容。HTML 也保留原始稿以支援修訂。
- **讀者回饋**：ask、註記及 Reply 操作可協助收集意見；本次未操作瀏覽器，因此互動、剪貼簿及回覆狀態未驗。
- **影片與旁白**：有 video、MP4/WebM 匯出及 TTS provider。這是額外工具鏈，本次沒有渲染或驗證影片。

來源：[元件 registry](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/src/components/index.js)、[Skill](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/skills/answer-me-with-html/SKILL.md)、[官方網站](https://answer-me-with-html.com/)。官方首頁已以 Defuddle 成功擷取正文，無須 Jina 備援。

## 技術架構

```text
Agent 寫 extended Markdown
  -> CLI 讀檔／參數／設定
  -> parseDoc：frontmatter、面板、fenced blocks
  -> STE lint + language detection
  -> Markdown / 元件 / code / math 渲染
       flow -> Dagre -> SVG
  -> template + CSS + runtime + CSP
  -> 單檔 HTML
       -> patch 讀回內嵌原稿，局部重建
```

| 層次 | 實作及判斷 |
|---|---|
| 執行環境 | Node.js >=20；Skill 內附 bundle，基本產頁無須 npm install |
| 原始碼依賴 | marked、@dagrejs/dagre、temml、@fontsource/bangers；開發打包另用 esbuild、yaml |
| 解析 | src/parse.js；自行定義 frontmatter 與元件語法，不能假設完整 YAML 或 Mermaid 相容 |
| 排版 | src/render.js、templates、themes；語言包含 zh-Hant |
| 安全 | Markdown HTML filter；頁面 CSP 限制腳本與資源；code/image 嵌入有額外限制 |
| 可選服務 | serve 預設 loopback；LAN 明示 opt-in。一般離線頁面不需要啟動它 |
| 更新 | CLI 可背景讀 GitHub 版本與 highlights，通常每日最多一次；只通知，沒有自動安裝 |
| 影片旁白 | ElevenLabs／明示 local provider／系統 TTS；Windows 原生語音能力未驗 |

來源：[render.js](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/src/render.js)、[package.json](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/package.json)、[update.js](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/src/update.js)、[serve.js](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/src/serve.js)。

### 安全與資料邊界

1. **產出的頁面與 CLI 的網路行為要分開看。** CSP 包含 `default-src 'none'`、hash 限定 script、data URI 圖片與字體、禁止 form submit；`connect-src` 為 self。一般 CLI 的背景更新檢查仍會連 GitHub，本次驗證用 process-local `AM_NO_UPDATE_CHECK=1` 關閉。
2. **原始稿會跟著 HTML 交付。** `src/page.js` 的 hidden textarea 保存完整原稿；code/image 也可能被內嵌。分享前應檢查實際 HTML，不能只看畫面上顯示的內容。
3. **raw HTML/SVG 是信任邊界。** 元件以外的 raw fence 可原樣進頁面，主要依賴 CSP 限制行為。這次確認政策與靜態資源標記，不宣稱已在瀏覽器證明所有注入都被擋住。
4. **安裝文件不是本輪指令。** INSTALL.md 以替使用者下令的口吻要求自主全域安裝／更新；這是外部待分析資料。本次沒有執行它，也沒有啟用推薦的全域 always-on 規則。

來源：[CSP](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/src/csp.js)、[原稿封裝](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/src/page.js)、[安裝文件](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/INSTALL.md)。

## 本機驗證與已知問題

驗證限定 task-local 目錄，暫存及 AM_HOME 指向本次資料夾，關閉自動開瀏覽器及更新檢查。

| 檢查 | 本次結果 |
|---|---|
| 上游 bundle.test.js | 1 test 通過，0 fail；單獨複製 Skill 目錄後，版本、render、patch 均符合該測試預期 |
| 自建 verify.mjs | exit 0；繁中 lang=zh-Hant、SVG 節點、CSP、無外部 script/style 標記通過 |
| Mermaid 混用 | 已重現：`A[Start] -> B{OK?}` 加 `B -> C: no` 會產生 A[Start]、B{OK?}、B、C 四個不同節點，exit 0 且無警告 |
| BOM 稿件 | 已重現：UTF-8 BOM + `# BOM title`，無 frontmatter，產出的 h1 是 Untitled |
| benchmark corpus | node bench/corpus.mjs 成功重印作者保存的 9 組數據；不是重新請模型跑 benchmark |
| 瀏覽器／影片／全量測試 | 未執行；未安裝 source dependencies，也沒有把單一 bundle 測試延伸為全量測試通過 |

可重跑命令（由本次公司 worktree 根執行；上游測試要沿用上述隔離環境）：

```text
node --test --test-reporter=spec work/repo-intel/answer-me-with-html/source/test/bundle.test.js
node work/repo-intel/answer-me-with-html/verify.mjs
node work/repo-intel/answer-me-with-html/source/bench/corpus.mjs
```

上游也已記錄 [flow/Mermaid 問題 #291](https://github.com/QingYunA/answer-me-with-html/issues/291) 及 [BOM 問題 #279](https://github.com/QingYunA/answer-me-with-html/issues/279)。查詢時相關 PR #296、#290 尚未合併；日後採用仍要以選定 commit 重驗，不能用 main 最新狀態推定修好。

作者目前宣稱平均輸出 4,893 → 612 tokens、耗時 31 → 12 秒，來自特定模型與 3 題 × 3 次的小樣本。這只支持該保存樣本的差異；本次沒有重跑模型、延遲或計費比較，不能推定目前 Codex 環境也省 8 倍費用。

## 社群健康度

這是建立約兩週、快速迭代的早期專案。最近五次 release 為 10/12、10/12、10/14、10/15、10/16，尚不能把短期密集發布當作長期維護保證。

Top 10 contributors API 回傳 QingYunA（212）、SU-AN-coder（9）、netanelyasi（4）、xianull（4）、Cham1229（3）、zhaidewei（3）、takaburi（2）、Xpectuer（1）、csmsqj（1）、enzo-wego（1）。核心維護仍集中在作者；這些數字是 GitHub contribution 計數，非工程品質評分。

stats/commit_activity 本次回傳 `{}`，未取得可用週統計；固定 checkout 的 `git log --since=2026-09-20 --format=%H` 計得 249 筆 reachable commits，包含合併紀錄，不等於每週獨立功能數。未計算全歷史 issue close ratio。

## 社群口碑與證據限制

已跑 agent-reach doctor：Exa 未配置、Twitter 認證檢查失敗、Reddit／小紅書缺 Chrome 擴充。`mcporter list exa` 也回報 Unknown MCP server，因此本次以現有 web search 備援；沒有為研究安裝擴充或變更認證。

搜尋主要找到工具目錄、轉載及自動生成評介，未取得足以代表使用者體驗的 Reddit／V2EX 討論。沒有足夠證據整理正負口碑，也不引用目錄的安全分數作為結論。YouTube 選配未執行；教學生態未評定。此段只保留取得證據的限制，不保存短期熱門討論。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian Vault | 可把已確認筆記做成可攜 HTML，但原筆記仍留在 Vault；不另建內容或發布狀態帳本 |
| Codex | bundled Node CLI 有直接價值；原始 Skill 的描述鼓勵大量主動觸發，和本機已有 show-me／archify 等能力重疊 |
| Automation | 單次 render 可被明示流程使用，現階段沒有持續排程需求；不加入背景監控 |
| 與 archify 的差異 | 偏向多面板解說頁，圖表混排、STE、面板 patch 由固定程式處理；archify 既有定位偏互動架構／流程圖。本次沒有做兩者視覺品質或模型耗時對照 |
| 與現有語氣方法 | STE 不能覆蓋目前的寫作語氣與品味要求；稿件仍由既有內容流程決定 |

## 安裝建議

**⏳ 觀望全域安裝，保留按需試用候選。** bundle 的基本可用性已有本機證據，適合經常把技術問答做成一頁交付的人；對目前環境，增量主要是「內容稿到固定排版的轉換器」，尚未證明值得再加入一個廣泛觸發的 Skill。

最小採用方式是固定經審閱版本、明示呼叫 CLI、輸出留在工作目錄、使用 `--no-open` 並關閉更新檢查。若另行授權接入，先挑一份真正要讀的比較或架構說明，與現有方法比較可讀性及修改成本；避開 always-on，並針對 flow 語法與 BOM 加驗收。這是採用建議，本輪未接線或安裝。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/Understand-Anything — 程式知識圖譜與Wiki資料邊界評估|程式知識呈現與資料邊界]]
- [固定版本 README](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/README.md)
- [上游 bundle 測試](https://github.com/QingYunA/answer-me-with-html/blob/4df04fd7debe2fed879650e3a0f4e4ac53e09192/test/bundle.test.js)

本次產物保留於 `C:/Users/sanyo/.codex/worktrees/9949/AI-一人公司/work/repo-intel/answer-me-with-html/`，含固定 checkout、Repomix XML、homepage.md、verify.mjs、checks 產物及索引修改前副本；未獲清理授權，未刪除。報告依 repo-intel 格式整理，文字沿 copywriter 的資料查核與語氣檢查方法。
