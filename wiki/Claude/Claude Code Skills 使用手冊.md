
> 共 103 個 Skills + 70+ 個 Ruflo/Claude Flow 命令(20260513)，按使用情境分類。

> 觸發方式：直接在對話中說出觸發詞，或輸入 `/skill-name`。

  

---

  

## 目錄

  

- [📝 文件生成](#-文件生成)

- [🎨 設計與視覺](#-設計與視覺)

- [🔧 開發工具](#-開發工具)

- [🐛 除錯與品質](#-除錯與品質)

- [✅ 測試驅動開發](#-測試驅動開發)

- [📋 規劃與專案管理](#-規劃與專案管理)

- [👥 Code Review](#-code-review)

- [🤖 Subagent 與結構化流程](#-subagent-與結構化流程)

- [🔀 Git 工作流](#-git-工作流)

- [🧠 記憶與知識管理](#-記憶與知識管理)

- [📓 Obsidian 整合](#-obsidian-整合)

- [🔮 術數命理](#-術數命理)

- [☁️ Google Cloud](#️-google-cloud)

- [⚡ 效率與輸出](#-效率與輸出)

- [🔍 代碼分析](#-代碼分析)

- [📚 知識查詢](#-知識查詢)

- [💬 溝通與品牌](#-溝通與品牌)

- [🛠 Meta Skills](#-meta-skills)

- [🦊 Ruflo 多 Agent 協調](#-ruflo-多-agent-協調)

  

---

  

## 📝 文件生成

  

### `pdf`

**用途：** 讀取、建立、合併、拆分 PDF，提取表格與文字。

**觸發：** 說「讀取這個 PDF」、「把這些合成一份 PDF」、「提取 PDF 裡的表格」

```

「幫我把這幾份報告合併成一個 PDF」

「讀取 report.pdf 並整理成摘要」

```

  

### `docx`

**用途：** 建立和編輯 Word 文件，保留格式與追蹤修訂。

**觸發：** 說「整理成 Word 文件」、「幫我做一份合約」、「轉成 DOCX」

```

「把這份需求整理成 Word 文件，格式要專業」

```

  

### `pptx`

**用途：** 建立和編輯 PowerPoint，支援版型、圖表、自動生成投影片。

**觸發：** 說「做 PowerPoint」、「做投影片」、「轉成 PPTX」

```

「把這份報告做成 10 頁 PowerPoint」

```

  

### `xlsx`

**用途：** 建立和編輯 Excel，支援公式、格式化、資料分析。

**觸發：** 說「做 Excel 表格」、「整理成試算表」、「幫我算這些數字」

```

「把這份銷售資料整理成 Excel，加上總計和平均」

```

  

### `doc-coauthoring`

**用途：** 協作文件撰寫輔助，多人共同編輯指引。

**觸發：** 說「幫我協作這份文件」、「一起寫這份報告」

  

---

  

## 🎨 設計與視覺

  

### `huashu-design`

**用途：** 用 HTML 做高保真原型、互動 Demo、動畫，以設計師角色工作，可匯出 MP4/GIF。

**觸發：** 說「做個好看的原型」、「設計這個頁面」、「iOS 風格設計」

```

「幫我做一個登入頁面的高保真原型，風格要現代簡潔」

「做個互動 Demo，可以匯出成影片」

```

  

### `web-design-engineer`

**用途：** 把 AI 生成的基礎 web artifact 升級為精緻前端，加版型、動畫、互動。

**觸發：** 說「優化這個 HTML」、「讓這個頁面更精緻」、「加動畫效果」

```

「這個頁面做得太陽春，幫我升級成有動畫的精緻版本」

```

  

### `web-video-presentation`

**用途：** 把文章或腳本轉為 16:9 可點擊網頁簡報，最佳化螢幕錄製輸出為影片。

**觸發：** 說「把這篇文章做成簡報影片」、「做一份網頁簡報」

```

「把這篇部落格文章做成 5 分鐘的簡報影片」

```

  

### `guizang-ppt`

**用途：** 生成「電子雜誌 × 電子墨水」風格橫向翻頁 HTML 簡報，含 WebGL 背景、10 種版型。

**觸發：** 說「做雜誌風簡報」、「幫我做一份有質感的 deck」、「發布會風格投影片」

```

「把這份產品說明做成雜誌風格的簡報，深色主題」

```

  

### `frontend-design`

**用途：** 前端設計指引（React + Tailwind），避免 AI 俗套設計模式。

**觸發：** 在 React/Tailwind 專案中設計 UI 時自動觸發

```

「設計一個用戶 Profile 卡片元件，要有設計感」

```

  

### `algorithmic-art`

**用途：** p5.js 生成藝術，含種子隨機、粒子系統、程序化圖形。

**觸發：** 說「用 p5.js 做生成藝術」、「做一個粒子動畫」

```

「幫我做一個會隨機生成的幾何藝術背景」

```

  

### `canvas-design`

**用途：** HTML Canvas 視覺藝術創作，輸出 PNG/PDF。

**觸發：** 說「用 canvas 畫」、「用程式碼畫圖」

  

### `theme-factory`

**用途：** 主題色彩系統生成，包括 CSS 變數、設計 tokens。

**觸發：** 說「幫我設計一套色彩系統」、「生成主題色」

```

「幫我做一個深藍主題的設計系統，要有 primary/secondary/accent」

```

  

### `web-artifacts-builder`

**用途：** 用 React + shadcn/ui 建立複雜互動 HTML artifacts。

**觸發：** 說「做一個互動元件」、「用 shadcn 做」

  

### `slack-gif-creator`

**用途：** 生成適合 Slack 的動態 GIF（尺寸、幀率最佳化）。

**觸發：** 說「幫我做一個 Slack GIF」、「做個動態貼圖」

  

### `gimp-inkscape`

**用途：** 本地圖片處理工具組（ImageMagick、Inkscape、GIMP、FFmpeg、ExifTool）。

**觸發：** 說「縮圖」、「轉 WebP」、「加浮水印」、「SVG 轉 PNG」、「壓縮圖片」、「去除 EXIF」

```

「把這個資料夾裡的圖片全部轉成 WebP，寬度限制 800px」

「這個 SVG logo 幫我匯出成 PNG，解析度 2x」

```

> 需先安裝：ImageMagick、Inkscape、GIMP、FFmpeg

  

### `gpt-image-2`

**用途：** AI 圖片生成，支援海報、Mockup、資訊圖，使用 OpenAI 相容 API。

**觸發：** 說「生成一張圖」、「用 DALL-E 做圖」、「幫我做個封面圖」

```

「幫我生成一張科技感的產品發布海報，藍紫色調」

```

> 需設定 OpenAI API Key

  

### `prompt-master`

**用途：** 為任何 AI 工具（Claude/GPT/Midjourney 等）生成精準的 production-ready prompt。

**觸發：** 說「幫我寫一個 prompt」、「優化這個 prompt」、「為 Midjourney 寫提示詞」

```

「幫我為 Midjourney 寫一個生成賽博龐克城市夜景的 prompt」

「優化這個 Claude prompt，讓它更準確」

```

  

### `nuwa-skill`

**用途：** 輸入人名，自動生成可運行的人物 Skill（深度調研 → 提煉思維框架 → 輸出 SKILL.md）。

**觸發：** 說「幫我做一個 XXX 的 Skill」、「蒸餾某某人的思維方式」

```

「幫我做一個理查·費曼的 Skill，用他的方式解釋事情」

「我想要一個擅長產品思維的 AI 角色，幫我推薦人選並生成」

```

  

---

  

## 🔧 開發工具

  

### `claude-api`

**用途：** Claude API / Anthropic SDK 整合，含 prompt caching、tool use、批次處理最佳實踐。

**觸發：** 代碼 import `anthropic`、說「用 Claude API 做」、「Anthropic SDK 怎麼用」

```

「幫我用 Claude API 建一個有 prompt caching 的對話機器人」

「把這個 GPT 整合改成用 Claude API」

```

  

### `gemini-api`

**用途：** Google Gemini API 整合指引。

**觸發：** 說「用 Gemini API」、代碼 import google-generativeai

  

### `context7-mcp`

**用途：** 查詢任意函式庫/框架的最新官方文件，避免 AI 用過時訓練資料。

**觸發：** 說「查 Next.js 最新用法」、「React 19 的新 API 是什麼」、「Tailwind v4 怎麼設定」

```

「查一下 Prisma 最新版的 migration 指令」

「Next.js App Router 的 metadata 怎麼設定，查最新文件」

```

  

### `mcp-builder`

**用途：** 建立高品質 MCP Server，整合外部 API 給 Claude 使用。

**觸發：** 說「幫我做一個 MCP Server」、「把這個 API 包成 MCP 工具」

```

「幫我把公司的 REST API 包成 MCP Server，讓 Claude 可以直接呼叫」

```

  

### `byethrow`

**用途：** 在 JS/TS 專案中用 `@praha/byethrow` 的 Result 型別取代 throw/catch。

**觸發：** 在含有 `@praha/byethrow` 的專案中自動啟用

  

### `use-gunshi-cli`

**用途：** 建立 CLI 工具時改用 Gunshi 取代 yargs/commander/cac。

**觸發：** 在 TypeScript CLI 開發中，說「建立一個 CLI」時觸發

  

### `webapp-testing`

**用途：** 用 Playwright 測試網頁應用，含 E2E 測試、截圖、互動。

**觸發：** 說「幫我寫 E2E 測試」、「用 Playwright 測試這個功能」

```

「幫我寫一個 Playwright 測試，測登入流程和購物車」

```

  

### `repomix-explorer`

**用途：** 用 Repomix 分析本地或 GitHub 倉庫的結構與內容。

**觸發：** 說「分析這個 repo」、「整個專案結構是什麼」、「找所有 API endpoint」

```

「分析 facebook/react 這個 repo，找出核心架構」

「把這個專案打包給 AI 分析」

```

> 需先安裝：`npm install -g repomix`

  

### `defuddle`

**用途：** 擷取網頁乾淨的 Markdown 內容（移除廣告、導覽列），比 WebFetch 省 token。

**觸發：** 給任何網址要求「讀取內容」時自動優先使用（`.md` 直連除外）

```

「讀取這篇文章：https://example.com/article」

```

> 需先安裝：`npm install -g defuddle`

  

---

  

## 🐛 除錯與品質

  

### `systematic-debugging`

**用途：** 4 階段系統性除錯：觀察現象 → 建立假設 → 驗證假設 → 修復並防止復發。

**觸發：** 報告 bug、說「這裡有問題」、「幫我 debug」

```

「這個函式有時候回傳 undefined，幫我系統性地找出原因」

```

  

### `diagnose`

**用途：** 嚴格診斷流程：重現 → 最小化 → 假設 → 驗測 → 修復 → 回歸測試。

**觸發：** 說「診斷這個問題」、「找出 root cause」

```

「生產環境偶發性崩潰，幫我做完整的診斷流程」

```

  

### `recursive-debugging`

**用途：** Recursive Mode 的 Phase 1.5，先找 root cause 再修 bug，避免改錯地方。

**觸發：** 在 recursive-mode 工作流中說「插入 Phase 1.5」

  

### `verification-before-completion`

**用途：** 修復完成前強制驗證：確認修復真的有效，不只是「看起來有效」。

**觸發：** 每次說「修好了」或「完成了」時自動執行檢查

```

「驗證這個 bug fix 是否真的解決了問題」

```

  

---

  

## ✅ 測試驅動開發

  

### `tdd`（Matt Pocock 版）

**用途：** TDD 紅綠重構循環，強調透過公開介面驗證行為，不測實作細節。

**觸發：** 說「用 TDD 做」、「先寫測試」

```

「用 TDD 實作這個 userService.createUser 功能」

```

  

### `test-driven-development`（Superpowers 版）

**用途：** 完整 RED-GREEN-REFACTOR 循環，含測試反模式參考。

**觸發：** 說「TDD 流程」、「先寫失敗測試」

  

### `recursive-tdd`

**用途：** Recursive Mode 的 TDD 模式，結構化 TDD 七個階段。

**觸發：** 說「用 recursive TDD 模式實作」

  

---

  

## 📋 規劃與專案管理

  

### `writing-plans`

**用途：** 把任務拆解成 2-5 分鐘可執行的清單，含明確的完成標準。

**觸發：** 說「幫我規劃這個任務」、「拆解這個需求」

```

「幫我把『建立用戶認證系統』拆解成可執行的步驟清單」

```

  

### `executing-plans`

**用途：** 批次執行 writing-plans 產出的計畫，含人工確認節點。

**觸發：** 說「開始執行計畫」、「按照清單做」

  

### `make-plan`（claude-mem 版）

**用途：** 建立分階段實作計畫，含代碼庫探索，跨 session 持久化。

**觸發：** 說「make-plan」、「幫我做一個有記憶的計畫」

  

### `do`（claude-mem 版）

**用途：** 執行 make-plan 產出的計畫，協調 subagent 執行各步驟。

**觸發：** 說「do」、「執行這個計畫」

  

### `brainstorming`

**用途：** Socratic 式設計討論，透過反覆提問精煉需求。

**觸發：** 說「幫我想想」、「這個方案好嗎」、「有更好的做法嗎」

```

「我想做一個推薦系統，幫我腦力激盪一下設計方向」

```

  

### `grill-me`

**用途：** 對你的計畫進行無情提問，逐步走完決策樹，找出盲點。

**觸發：** 說「grille me」、「質疑我的方案」、「找出這個計畫的問題」

```

「我打算用微服務架構，grill me」

```

  

### `grill-with-docs`

**用途：** 結合 CONTEXT.md 和 ADR 的設計 Grilling，決策後更新文件。

**觸發：** 說「用文件脈絡來 grill 我的設計」

  

### `to-issues`

**用途：** 把計畫或規格拆解成獨立可執行的 GitHub Issue（縱向切片）。

**觸發：** 說「把這個計畫轉成 Issues」、「幫我拆 ticket」

```

「把這份 PRD 轉成 GitHub Issues，每個功能一個 Issue」

```

  

### `to-prd`

**用途：** 從當前對話脈絡自動生成 PRD（Product Requirements Document）。

**觸發：** 說「把這個整理成 PRD」、「幫我寫需求文件」

```

「我們討論的這個功能，幫我整理成標準 PRD 格式」

```

  

### `triage`

**用途：** 透過狀態機流程管理 Issue 分類（優先級、標籤、指派）。

**觸發：** 說「幫我整理 Issues」、「分類這些 bug」

  

### `improve-codebase-architecture`

**用途：** 找架構優化機會，提高模組化程度、可測試性、AI 可導航性。

**觸發：** 說「幫我看架構有什麼問題」、「這個專案的架構可以怎麼改進」

```

「這個 Next.js 專案越來越亂，幫我找架構優化的切入點」

```

  

### `zoom-out`

**用途：** 要求 AI 往上一層看：列出相關模組、呼叫者、依賴圖，避免只看局部。

**觸發：** 說「zoom out」、「往上一層看」、「這個改動會影響哪些地方」

```

「zoom out，讓我看看這個函式的上下文和依賴」

```

  

---

  

## 👥 Code Review

  

### `requesting-code-review`

**用途：** 送 review 前的 pre-check 清單，確保 PR 品質。

**觸發：** 說「幫我準備送 review」、「check 這個 PR 送前的清單」

  

### `receiving-code-review`

**用途：** 正確處理 review 回饋的流程，確保每條意見都有回應。

**觸發：** 說「我收到 review 意見了，幫我處理」

  

### `recursive-review-bundle`

**用途：** 打包程式碼 Review，產出結構化的 review 報告。

**觸發：** 說「打包 review」、在 recursive-mode Phase 6 時觸發

  

---

  

## 🤖 Subagent 與結構化流程

  

### `recursive-mode`

**用途：** 強制走完七個開發階段（需求→AS-IS→規劃→Subagent Review→實作→測試→QA→歸檔），跨對話保持上下文。適合大型多輪任務。

**觸發：** 說「Implement the run」

```

「Implement the run」← 啟動完整七階段開發流程

```

> 需先在專案執行初始化腳本建立 `/.recursive/` 控制平面

  

**七個階段：**

| Phase | 內容 |

|-------|------|

| 1 | 需求分析 |

| 1.5 | 除錯診斷（修 bug 時插入）|

| 2 | AS-IS 現有代碼分析 |

| 3 | 規劃 |

| 3.5 | Subagent 審查計畫 |

| 4 | 實作（TDD）|

| 5 | 測試 |

| 6 | QA |

| 7 | Closeout 歸檔 |

  

### `dispatching-parallel-agents`

**用途：** 啟動並行 subagent 工作流，加速複雜多部分任務。

**觸發：** 說「用 subagent 並行做」、「同時處理這幾件事」

```

「這三個 API endpoint 可以同時開發，幫我用並行 subagent 處理」

```

  

### `subagent-driven-development`

**用途：** 兩階段 review 的快速迭代開發，subagent 寫、主 agent 審。

**觸發：** 說「用 subagent 開發」、「讓 subagent 先做初版」

  

### `recursive-spec`

**用途：** 管理規格文件，確保規格鎖定後不被覆蓋。

**觸發：** 在 recursive-mode 中管理規格時觸發

  

### `recursive-subagent`

**用途：** Phase 3.5，委派 subagent 審查計畫，返回 review 意見。

**觸發：** 在 recursive-mode Phase 3 結束後觸發

  

### `recursive-router`

**用途：** 智能判斷應走哪個 phase 或 skill。

**觸發：** 在 recursive-mode 工作流中自動決策

  

### `recursive-worktree`

**用途：** Git worktree 隔離執行，實驗性修改不污染主分支。

**觸發：** 說「用 worktree 隔離這個修改」

  

### `recursive-benchmark`

**用途：** 效能基準測試，量化優化前後差異。

**觸發：** 說「benchmark 這個函式」、「量一下效能」

  

---

  

## 🔀 Git 工作流

  

### `contextual-commit`

**用途：** Git commit 時自動在 body 記錄「為什麼這樣改」，不只是「改了什麼」。包含 intent/decision/rejected/learned 欄位。

**觸發：** 每次要 git commit 時自動使用

```

提交後的 commit message 格式：

  

feat(auth): 新增 Google OAuth 登入

  

intent(auth): 使用者希望支援社群登入

decision(oauth): 選用 passport.js 而非 auth0-sdk

rejected(auth0-sdk): 與現有 Redis session 架構不相容

learned(passport): 需明確加上 offline_access scope

```

  

### `using-git-worktrees`

**用途：** 管理並行開發分支，用 Git worktree 同時在多個分支工作。

**觸發：** 說「用 worktree 開發」、「我要同時做多個功能」

```

「幫我設定 worktree，讓我可以同時在 feature/auth 和 fix/database 工作」

```

  

### `finishing-a-development-branch`

**用途：** 處理 merge/PR 決策，確認分支準備好後的收尾流程。

**觸發：** 說「這個分支準備 merge 了」、「收尾這個功能」

  

### `version-bump`

**用途：** 版本號管理（semver），更新 package.json/CHANGELOG。

**觸發：** 說「版本更新到 X.Y.Z」、「做一個 minor release」

  

---

  

## 🧠 記憶與知識管理

  

### `agent-memory`

**用途：** 跨對話儲存重要資訊，下次開新對話仍能記住（各專案獨立）。

**觸發：** 自動觸發，或說「記住這個」、「你還記得嗎」、「整理你的筆記」

```

「記住：這個專案的資料庫用的是 PostgreSQL 15，schema 在 /db/migrations」

「你還記得我們上次討論的認證方案嗎？」

```

  

### `mem-search`

**用途：** 搜尋 claude-mem 記錄的過去工作記憶，找歷史操作和決策。

**觸發：** 說「查一下之前怎麼做的」、「之前有沒有處理過類似問題」

```

「之前那個 Cloudflare 設定問題，我們最後怎麼解決的？」

```

  

### `knowledge-agent`

**用途：** 知識圖譜管理，儲存和查詢結構化知識（實體、關係、屬性）。

**觸發：** 說「把這個知識存下來」、「建立知識圖譜」

  

### `smart-explore`

**用途：** 智慧探索代碼庫，找相關檔案、函式和上下文脈絡。

**觸發：** 說「智慧探索這個問題相關的代碼」、「找這個功能涉及的所有檔案」

  

### `pathfinder`

**用途：** 路徑尋找，追蹤依賴關係和呼叫鏈，找出兩個模組之間的路徑。

**觸發：** 說「這個模組怎麼被呼叫到的」、「找 A 到 B 的呼叫路徑」

  

### `timeline-report`

**用途：** 產生工作時間線報告，顯示本 session 或歷史操作的時序。

**觸發：** 說「產生工作報告」、「這次做了什麼的時間線」

  

---

  

## 📓 Obsidian 整合

  

### `obsidian-markdown`

**用途：** 使用 Obsidian 特有 Markdown 語法：wikilink、callout、frontmatter、embed。

**觸發：** 處理 `.md` 檔案並提到 Obsidian、wikilink、callout 時自動啟用

```

「幫我建立一個 Obsidian 筆記，記錄今天的會議，加 callout 重點提示」

「把這份資料整理成 Obsidian 格式，包含 wikilink 連結」

```

**語法快速參考：**

```markdown

[[Note Name]]              內部連結

![[Note Name]]             嵌入筆記

> [!warning] 標題          Callout

==重要文字==               螢光筆

%%隱藏注解%%               不顯示的注解

```

  

### `obsidian-cli`

**用途：** 透過 CLI 直接操作 Obsidian vault（讀寫筆記、搜尋、管理 Daily Note）。

**觸發：** 說「查詢我的 vault」、「在 Obsidian 建立筆記」、「讀取 Daily Note」

```

「搜尋我 vault 裡所有帶 #project 標籤的筆記」

「在我的 Daily Note 加一個 TODO: 確認設計稿」

「讀取 'Meeting Notes 2026-05-13' 這個筆記」

```

> 需要：Obsidian 必須開著，已安裝 obsidian-cli

  

### `obsidian-bases`

**用途：** 建立和查詢 Obsidian Bases（資料庫視圖），管理屬性和過濾條件。

**觸發：** 說「建立 Obsidian Bases」、「做一個任務追蹤視圖」

```

「幫我建立一個 Bases 視圖，列出所有 status=active 的專案筆記」

```

  

### `json-canvas`

**用途：** 建立和操作 `.canvas` 無限畫布檔案（Obsidian Canvas）。

**觸發：** 說「建立 Canvas」、「編輯 .canvas 檔案」、「做一個視覺思維導圖」

```

「幫我做一個架構圖的 Canvas 檔案，把這些服務的關係畫出來」

```

  

### `defuddle`（見[開發工具](#-開發工具)）

讀取網頁內容時自動優先使用，擷取乾淨 Markdown。

  

---

  

## 🔮 術數命理

  

### `bazi`（FANzR 版）

**用途：** 八字排盤與解盤，分析天干地支、十神、大運流年、喜用神。

**觸發：** 說「幫我排八字」、「分析命局」

```

「1990年5月15日 上午10點出生，幫我排八字並分析格局」

```

  

### `bazi-skill`（jinchenma94 版）

**用途：** 互動式收集生辰後分析八字，參照穷通宝典等經典典籍。

**觸發：** 說「我要算八字」、「八字命盤」（會逐步詢問生辰資訊）

  

### `qimen-dunjia`

**用途：** 奇門遁甲排盤、擇時、方位判斷。

**觸發：** 說「奇門排盤」、「奇門擇吉」、「分析這個方位」

```

「現在（2026年5月13日 14:00）用奇門分析，適合做哪件事」

```

  

### `ziwei-doushu`

**用途：** 紫微斗數排盤與解盤，分析命宮、主星、四化、大限流年。

**觸發：** 說「幫我排紫微」、「紫微命盤分析」

```

「1990年5月15日 10:00 出生，幫我排紫微命盤，重點看事業宮」

```

  

---

  

## ☁️ Google Cloud

  

以下 Skills 在使用對應服務時**自動觸發**，無需手動叫用：

  

| Skill | 觸發時機 |

|-------|---------|

| `bigquery-basics` | 提到 BigQuery、SQL 資料倉儲時 |

| `cloud-run-basics` | 部署 Cloud Run、容器化應用時 |

| `firebase-basics` | Firebase 相關開發時 |

| `alloydb-basics` | 使用 AlloyDB 資料庫時 |

| `cloud-sql-basics` | 使用 Cloud SQL 時 |

| `gke-basics` | Kubernetes / GKE 相關時 |

| `gemini-api` | 使用 Gemini API 時 |

| `google-cloud-recipe-auth` | GCP 身份驗證設定時 |

| `google-cloud-recipe-onboarding` | 初始化 GCP 專案時 |

| `google-cloud-waf-cost-optimization` | 詢問 GCP 成本優化時 |

| `google-cloud-waf-reliability` | 詢問 GCP 可靠性架構時 |

| `google-cloud-waf-security` | 詢問 GCP 安全最佳實踐時 |

| `google-cloud-networking-observability` | GCP 網路監控時 |

  

---

  

## ⚡ 效率與輸出

  

### `caveman`

**用途：** 極簡輸出模式，省略所有填充詞、客套話，只保留技術實質。

**觸發：** 說「/caveman」、「少廢話」（啟動後持續作用直到說「stop caveman」）

```

「/caveman」← 從現在起回答都簡短直接

「stop caveman」← 恢復正常

```

  

### `find-skills`

**用途：** 搜尋並推薦可安裝的 Skills，幫你找到需要的工具。

**觸發：** 說「有沒有什麼 Skill 可以幫我做 X」、「找個 PDF 相關的 Skill」

```

「有沒有可以幫我管理 GitHub Issues 的 Skill？」

```

  

### `ssc`

**用途：** 協助建立或升級 Claude Code 的 Skill、Agent、Hook，走標準化三世代流程。

**觸發：** 說「建一個 Skill」、「做個 Agent」、「加 Hook」、「升級這個 Skill」

```

「幫我建一個新 Skill，讓 Claude 知道如何使用我們公司的內部 API」

```

  

### `skill-creator`（Anthropic 官方版）

**用途：** 官方互動式 Skill 建立工具，問答引導完成 SKILL.md。

**觸發：** 說「用官方工具建立 Skill」

  

### `resume-pdf-optimize`

**用途：** 優化 HTML 履歷的 PDF 列印輸出，修正分頁、排版、符號對齊。

**觸發：** 說「優化這份履歷的 PDF 輸出」

```

「/resume-pdf-optimize resume.html」

```

  

---

  

## 🔍 代碼分析

  

### `termdock-ast`

**用途：** 查詢 AST Index，找符號定義位置、依賴關係、呼叫者，重構前影響分析。

**觸發：** 說「哪裡定義了 X」、「誰呼叫了這個函式」、「這個改動影響哪些地方」

```

「找出所有呼叫 userService.createUser 的地方」

「重構 PaymentProcessor 之前，幫我分析影響範圍」

```

  

### `termdock-terminal-api`

**用途：** 透過 Termdock Terminal API 控制 raw 終端機或 agent session。

**觸發：** 沒有直接終端機工具時，說「控制終端機執行」

  

---

  

## 📚 知識查詢

  

### `kb-retriever`

**用途：** 查詢本地知識庫（Markdown/TXT/PDF/Excel），提取相關證據片段，不塞爆 context。

**觸發：** 說「從我的知識庫找」、「查詢本地文件」

```

「從 /docs 資料夾裡找關於 OAuth 認證的說明」

「我的 Excel 報表裡有關於 Q1 銷售的資料，幫我找出重點」

```

  

### `notebooklm-skill`

**用途：** 從 Claude Code 直接查詢 Google NotebookLM 筆記本，獲得有引用來源的回答。

**觸發：** 說「查 NotebookLM」、「從我的筆記本找答案」

```

「查 NotebookLM，找關於我們產品路線圖的內容」

```

> 需要：Google 帳號瀏覽器登入狀態

  

---

  

## 💬 溝通與品牌

  

### `internal-comms`

**用途：** 內部溝通文件撰寫指引（公告、備忘錄、會議摘要、升級說明）。

**觸發：** 說「幫我寫公司公告」、「寫一份備忘錄」

```

「幫我寫一份系統維護公告，週日凌晨 2:00-4:00 停機」

```

  

### `brand-guidelines`

**用途：** Anthropic 品牌規範應用，確保設計和文字符合品牌標準。

**觸發：** 製作 Anthropic 相關材料時觸發

  

---

  

## 🛠 Meta Skills

  

### `write-a-skill`（Matt Pocock 版）

**用途：** 建立新 Skill，含結構設計、漸進式揭露、打包資源的完整流程。

**觸發：** 說「幫我設計一個 Skill」、「把這個流程做成 Skill」

  

### `writing-skills`（Superpowers 版）

**用途：** 建立新 Skill 的框架與測試方法。

  

### `using-superpowers`

**用途：** Superpowers Skills 系統入門說明，了解整套 Skills 如何協作。

**觸發：** 說「介紹一下 Superpowers」

  

### `setup-matt-pocock-skills`

**用途：** 在專案中初始化 Matt Pocock Skills 環境（建立 AGENTS.md 區塊和 docs/agents/）。

**觸發：** 在新專案中首次使用 Matt Pocock Skills 前執行

```

「/setup-matt-pocock-skills」

```

  

### `doc-coauthoring`

**用途：** 協作文件撰寫輔助，用於多人共同撰寫的文件工作流。

  

---

  

---

  

## 🦊 Ruflo 多 Agent 協調

  

Ruflo 是全域安裝的多 Agent 協調平台，透過 Claude Code 的 `/` 命令呼叫，無需額外安裝 Skill。所有命令格式為 `/category:command`。

  

> **CLI 快速入口：** `npx ruflo@latest <command>` 可在終端機直接操作。

  

---

  

### 🚀 Ruflo 核心入口

  

| 命令 | 用途 |

|------|------|

| `/claude-flow-help` | 查看所有 Ruflo 命令的說明與範例 |

| `/claude-flow-memory` | 管理跨 session 的向量記憶庫（儲存/查詢/匯出） |

| `/claude-flow-swarm` | 快速啟動多 Agent Swarm 執行複雜任務 |

| `/init` | 初始化專案的 Ruflo 設定（建立 CLAUDE.md、agent 架構） |

| `/review` | 對目前 branch 做全面 code review |

| `/security-review` | 安全審查：找漏洞、依賴風險、敏感資料洩漏 |

  

```

「/claude-flow-swarm」← 啟動 swarm 介面

「/review」← 審查目前 branch 所有改動

「/init」← 初始化新專案的多 Agent 架構

```

  

---

  

### 🧠 SPARC 開發方法論（`/sparc:*`）

  

五階段開發流程：Specification → Pseudocode → Architecture → Refinement → Completion

  

**協調器**

  

| 命令 | 用途 |

|------|------|

| `/sparc:sparc` | 執行完整 SPARC 五階段開發循環 |

| `/sparc:orchestrator` | 主協調器，分派各階段給專屬 agent |

| `/sparc:swarm-coordinator` | Swarm 模式下的跨 agent 協調 |

| `/sparc:batch-executor` | 批次執行多個 SPARC 任務 |

| `/sparc:sparc-modes` | 查看並切換不同 SPARC 操作模式 |

  

**規格與設計**

  

| 命令 | 用途 |

|------|------|

| `/sparc:spec-pseudocode` | 撰寫規格與虛擬碼，鎖定 Phase 1-2 |

| `/sparc:architect` | 系統架構設計，輸出 ADR 和架構圖 |

| `/sparc:designer` | UI/UX 設計決策與元件規劃 |

| `/sparc:innovator` | 腦力激盪替代方案，突破框架思考 |

  

**實作**

  

| 命令 | 用途 |

|------|------|

| `/sparc:coder` | 主力程式碼實作（Phase 4） |

| `/sparc:code` | 快速單檔代碼生成 |

| `/sparc:tdd` | 測試驅動實作（Red-Green-Refactor） |

| `/sparc:integration` | 整合多模組，處理介面相容性 |

| `/sparc:devops` | CI/CD、容器化、基礎設施即代碼 |

| `/sparc:supabase-admin` | Supabase 專用：schema、RLS、Edge Function |

  

**審查與優化**

  

| 命令 | 用途 |

|------|------|

| `/sparc:reviewer` | 多維度 code review（可讀性/安全性/效能） |

| `/sparc:security-review` | 深度安全審查 |

| `/sparc:optimizer` | 效能優化，找瓶頸並重構 |

| `/sparc:refinement-optimization-mode` | 迭代精煉，聚焦 Phase 4 品質提升 |

  

**測試與監控**

  

| 命令 | 用途 |

|------|------|

| `/sparc:tester` | 全面測試規劃（unit/integration/e2e） |

| `/sparc:post-deployment-monitoring-mode` | 上線後監控，設定 alert 和儀表板 |

  

**文件與研究**

  

| 命令 | 用途 |

|------|------|

| `/sparc:docs-writer` | 技術文件撰寫（README/API/架構說明） |

| `/sparc:documenter` | 代碼注釋與 JSDoc/TSDoc 自動生成 |

| `/sparc:researcher` | 技術選型研究，比較框架和方案 |

| `/sparc:tutorial` | 建立互動式學習教學文件 |

  

**其他**

  

| 命令 | 用途 |

|------|------|

| `/sparc:ask` | 在 SPARC 工作流中提問，獲得脈絡相關回答 |

| `/sparc:debug` | 結構化 debug（SPARC 工作流整合版） |

| `/sparc:debugger` | 獨立 debug agent |

| `/sparc:analyzer` | 靜態分析，找 code smell 和反模式 |

| `/sparc:mcp` | MCP 工具整合與管理 |

| `/sparc:memory-manager` | 管理 SPARC 跨 session 記憶 |

| `/sparc:workflow-manager` | 自定義工作流設計與執行 |

  

```

「/sparc:sparc 幫我實作一個 JWT 認證系統」

「/sparc:architect 設計一個支援 10 萬 DAU 的通知服務」

「/sparc:tdd 用 TDD 方式實作 UserService」

```

  

---

  

### 🐙 GitHub 工作流 Swarm（`/github:*`）

  

| 命令 | 用途 |

|------|------|

| `/github:pr-manager` | PR 完整生命週期管理：建立、review、merge、close |

| `/github:pr-enhance` | 自動強化 PR 描述、加 checklist、補充說明 |

| `/github:swarm-pr` | 多 agent 協同 PR review，平行分析不同面向 |

| `/github:code-review` | 深度 code review，輸出結構化報告 |

| `/github:code-review-swarm` | 5 個 agent 同時 review 不同層面（安全/效能/可讀性…） |

| `/github:issue-tracker` | Issue 管理：建立、追蹤、關閉、自動更新進度 |

| `/github:issue-triage` | 批量 Issue 分類與優先級排序 |

| `/github:swarm-issue` | 把 Issue 轉換為多 agent 任務並自動執行 |

| `/github:release-manager` | 自動化 Release：changelog、tag、PR、部署 |

| `/github:release-swarm` | 多平台 Release 協調（含 npm publish、Docker 等） |

| `/github:workflow-automation` | 生成和優化 GitHub Actions workflow |

| `/github:github-modes` | 切換不同 GitHub 工作模式 |

| `/github:github-swarm` | 整合 Swarm 的 GitHub 協作框架 |

| `/github:multi-repo-swarm` | 跨多個 repo 的協調操作 |

| `/github:repo-analyze` | 深度分析 repo 健康度、貢獻者、依賴 |

| `/github:repo-architect` | 優化 repo 結構和多 repo 管理 |

| `/github:project-board-sync` | 同步 GitHub Projects 看板與 Issue 狀態 |

| `/github:sync-coordinator` | 跨 repo 版本同步和依賴對齊 |

  

```

「/github:pr-manager」← 建立並管理 PR

「/github:code-review-swarm」← 5 個 agent 平行 review

「/github:release-manager」← 自動化整個 release 流程

```

  

---

  

### 📊 監控（`/monitoring:*`）

  

| 命令 | 用途 |

|------|------|

| `/monitoring:status` | 查看整體系統狀態（agents、swarm、memory） |

| `/monitoring:agents` | 列出所有活躍 agent 和其狀態 |

| `/monitoring:agent-metrics` | 查看各 agent 的效能指標 |

| `/monitoring:swarm-monitor` | 即時監控 Swarm 拓撲和任務進度 |

| `/monitoring:real-time-view` | 開啟即時視圖，串流顯示 agent 活動 |

  

---

  

### ⚡ 效能分析（`/analysis:*`）

  

| 命令 | 用途 |

|------|------|

| `/analysis:performance-report` | 生成效能報告，顯示各 agent 的執行效率 |

| `/analysis:performance-bottlenecks` | 找出效能瓶頸，提供優化建議 |

| `/analysis:bottleneck-detect` | 自動偵測並標示工作流瓶頸 |

| `/analysis:token-usage` | 分析 token 使用量，找節省空間 |

| `/analysis:token-efficiency` | Token 效率分析，提供精簡 prompt 建議 |

| `/analysis:COMMAND_COMPLIANCE_REPORT` | 命令合規性報告 |

  

---

  

### 🤖 自動化（`/automation:*`）

  

| 命令 | 用途 |

|------|------|

| `/automation:auto-agent` | 自動選擇最適合任務的 agent 類型 |

| `/automation:smart-agents` | 智能 agent 管理，動態調配資源 |

| `/automation:smart-spawn` | 按需自動生成 agent，完成後自動回收 |

| `/automation:workflow-select` | 根據任務自動選擇最佳工作流模板 |

| `/automation:session-memory` | 自動管理 session 記憶，保留關鍵上下文 |

| `/automation:self-healing` | 偵測失敗任務並自動重試或重新路由 |

  

---

  

### 🔧 拓撲優化（`/optimization:*`）

  

| 命令 | 用途 |

|------|------|

| `/optimization:topology-optimize` | 優化 Swarm 拓撲結構，提升通訊效率 |

| `/optimization:auto-topology` | 自動選擇最佳 Swarm 拓撲（star/mesh/hierarchical） |

| `/optimization:parallel-execute` | 最大化並行執行，自動識別可平行的任務 |

| `/optimization:parallel-execution` | 平行執行框架設定與管理 |

| `/optimization:cache-manage` | 管理 prompt cache，降低 API 費用 |

  

---

  

### 🪝 Hooks（`/hooks:*`）

  

| 命令 | 用途 |

|------|------|

| `/hooks:setup` | 初始化 hooks 設定（PostToolUse、PreToolUse 等） |

| `/hooks:overview` | 查看目前所有 hook 的設定和狀態 |

| `/hooks:pre-edit` | 編輯前觸發的 hook（如：自動備份、lint check） |

| `/hooks:post-edit` | 編輯後觸發的 hook（如：auto-format、test run） |

| `/hooks:pre-task` | 任務開始前的 hook（如：載入相關記憶） |

| `/hooks:post-task` | 任務完成後的 hook（如：儲存摘要到記憶庫） |

| `/hooks:session-end` | Session 結束時的 hook（如：儲存工作日誌） |

  

---

  

### Ruflo CLI 快速參考

  

```powershell

# 狀態查詢

npx ruflo@latest status                    # 整體狀態

npx ruflo@latest agent list                # 活躍 agents

npx ruflo@latest swarm status              # Swarm 狀態

  

# 啟動 Swarm 任務

npx ruflo@latest swarm spawn --task "描述任務" --agents 5

  

# 跨 session 記憶

npx ruflo@latest memory store --key "topic" --value "content"

npx ruflo@latest memory retrieve --query "topic"

npx ruflo@latest memory search --query "keyword" --limit 10

  

# SPARC 開發流程

npx ruflo@latest sparc run --task "build feature X"

  

# 自動駕駛模式

npx ruflo@latest autopilot start --goal "describe goal"

```

  

---

  

## 快速查詢索引

  

| 我想要... | 用這個 Skill |

|-----------|-------------|

| 寫 Word/Excel/PPT/PDF | `docx` / `xlsx` / `pptx` / `pdf` |

| 做精美 HTML 頁面/原型 | `huashu-design` |

| 做簡報影片 | `web-video-presentation` |

| 生成圖片 | `gpt-image-2` |

| 處理/壓縮圖片 | `gimp-inkscape` |

| 讀取網頁內容 | `defuddle` |

| 找最新 library 文件 | `context7-mcp` |

| 系統性除錯 | `systematic-debugging` / `diagnose` |

| TDD 開發 | `tdd` / `test-driven-development` |

| 規劃大型任務 | `writing-plans` + `executing-plans` |

| 拆 GitHub Issues | `to-issues` |

| 大型多輪任務 | `recursive-mode` |

| 並行 subagent | `dispatching-parallel-agents` |

| 記住跨對話資訊 | `agent-memory` |

| 查 Obsidian 筆記 | `obsidian-cli` |

| 八字/紫微/奇門 | `bazi` / `ziwei-doushu` / `qimen-dunjia` |

| 生成 AI prompt | `prompt-master` |

| 讓 AI 輸出簡短 | `caveman` |

| 建立新 Skill | `ssc` / `write-a-skill` |

| 分析代碼庫 | `repomix-explorer` / `termdock-ast` |

| 優化架構 | `improve-codebase-architecture` |

| 完整開發週期（5 階段）| `/sparc:sparc` |

| 自動 PR review | `/github:code-review-swarm` |

| 監控多 agent 狀態 | `/monitoring:status` |

| 啟動 Swarm 任務 | `/claude-flow-swarm` |

| 初始化專案架構 | `/init` |

| 安全審查 | `/security-review` |

  

---

  

*更新日期：2026-05-13 | Skills 總數：103 | Ruflo 命令：70+*