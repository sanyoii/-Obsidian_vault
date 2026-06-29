# 知識庫主索引

> 最後更新：2026-06-28
> 文章數量：335 篇
> 原始文件：持續累積中

---

## 快速導航

- [[_summaries|所有文章摘要]]
- [[_graph|概念連結圖]]
- [[log|操作日誌（Karpathy 模式）]]
- [[課程總覽|課程總覽（入口）]]

---

## 主題分類

### Claude

#### 系統
- [[Claude/知識庫操作手冊|LLM 知識庫 — Claude Code 操作手冊]] — /compile、/query、/lint、/morning、/slide、/search 指令集與知識迴圈 `#系統`
- [[Claude/Claude環境操作手冊|D:\Claude 環境操作手冊]] — Skills 76 個、Ruflo、子專案、日常維護指令 `#系統`
- [[Claude/Command Center Plugin — Obsidian 指揮中心|Command Center Plugin — Obsidian 指揮中心]] — 4 個 Ribbon 按鈕：Morning Briefing、Compile、Lint、Quick Capture；串接 social-monitor + job-crawler `#系統 #obsidian #automation`

#### Agent 設計
- [[Claude/Karpathy 最高遵守原則 — AI 行為準則|Karpathy 最高遵守原則 — AI 行為準則]] — 5 大原則，套用至 CLAUDE.md，/karpathy-audit 命令 `#agent-design #karpathy`
- [[Claude/Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則|Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則]] — CAN/CANNOT 邊界、單一指標、品味量化 if-then、baseline 先行、Checkpoint、三段式結構 `#agent-design #skills #karpathy`
- [[Claude/stitch-skills SKILL.md 結構分析 — Agent Skill 設計模式|stitch-skills SKILL.md 結構分析]] — 四種工作流模式、Gold Standard/Baton/驗證腳本三設計模式、Skill 目錄標準結構 `#agent-design #skills #google-stitch #design-patterns`

---

### 軟體設計模式精通之旅（水球軟體學院）

#### 行為型模式
- [[策略模式|策略模式]] — 原始型行為變動，依賴反轉三步驟 `#行為型`
- [[樣板方法|樣板方法]] — 留同存異，控制反轉 (IoC) 基礎 `#行為型`
- [[責任鏈模式|責任鏈模式]] — 輸入比對型行為變動 `#行為型`
- [[觀察者模式|觀察者模式]] — 響應式行為，事件通知 `#行為型`
- [[指令模式|指令模式]] — 操作封裝，Undo/Redo `#行為型`
- [[狀態模式|狀態模式]] — 狀態驅動行為，FSM 基礎 `#行為型`

#### 結構型模式
- [[門面模式|門面模式]] — 簡化複雜介面，模組邊界 `#結構型`
- [[裝飾者模式|裝飾者模式]] — 動態疊加行為，解決組合爆炸 `#結構型`
- [[轉接器模式|轉接器模式]] — 介面轉換，隔離外部依賴 `#結構型`

#### 創建型模式
- [[工廠方法|工廠方法]] — 物件創建與生命週期管理 `#創建型`

#### SOLID 原則
- [[開閉原則|開閉原則 (OCP)]] — 對擴充開放，對修改封閉 `#SOLID`
- [[依賴反轉原則|依賴反轉原則 (DIP)]] — 八成設計模式的底層邏輯 `#SOLID`

#### 方法論
- [[水球流OADP|水球流 OADP]] — 疊代式物件導向開發框架 `#方法論`
- [[物件導向分析|物件導向分析 (OOA)]] — 單句分析，領域模型萃取 `#方法論`
- [[物件導向設計|物件導向設計 (OOD)]] — 循序圖，封裝解耦，模式套用 `#方法論`
- [[整潔架構|整潔架構 (Clean Architecture)]] — 封裝變化，單向穩定依賴 `#方法論`

#### 課程索引
- [[課程總覽|課程總覽]] — Ch 1–10 章節地圖與全模式索引

---

### AI Prompts 收藏庫

- [[AI-Prompts/_index|AI Prompts 收藏庫 — 統一索引]] — 旅遊插畫 + ChatGPT Image 2 爆款圖，依效果/標籤快速查詢，持續新增中 `#ai #prompts #image-gen`

---

### Tools（工具使用手冊）

- [[Tools/liteparse|LiteParse]] — 本地 PDF 解析工具（Rust/PDFium），`pip install liteparse`，CLI + Python API，支援批次轉換與截圖 `#tools #pdf`
- [[Tools/video-to-brain|影片轉文字 → gbrain]] — 課程影片批次轉錄 Markdown，Gemini API + gbrain import `#tools #video`
- [[Tools/gbrain-inbox|gbrain Inbox 快速匯入]] — Obsidian Inbox 一鍵 import + 移至 wiki/Ideas `#tools #gbrain`
- [[Tools/md-to-pdf|Markdown 轉 PDF]] — `#tools`
- [[Tools/cleanup-transcripts|清理逐字稿]] — `#tools`
- [[Tools/CodeWhale|CodeWhale]] — 開源 Terminal Coding Agent（Rust），模型中立的 Claude Code 替代品，支援 25 providers `#tools #coding-agent #rust #open-source`
- [[Tools/free-claude-code|Free Claude Code]] — 本地 API 代理伺服器，讓 Claude Code/Codex 介面接第三方模型 `#tools #proxy #claude-code`

---

### 求職

- [[求職/Ashby Support Engineer (APAC) — 求職進度|Ashby Support Engineer (APAC) — 求職進度]] — 已投遞(2026-06-10)等recruiter回覆；技術準備重點、SEG對照表、STAR案例庫 `#求職 #ashby #career`

---

### Github/Repos（已分析 Repos）

- [[Github/_index|Github Repo 分析總索引]] — 109 篇 × 12 主題分類（🔬 16 深度分析 / 📎 93 簡單留存）`#github #index`
- [[Github/已安裝工具 — Github 分析索引|已安裝工具 × Wiki 交叉對照]] — 30 項已安裝工具的 Wiki 紀錄 `#github #installed`

### 旺來幫｜Jane 金融知識庫

> 來源：Vocus 沙龍 236 篇付費文章萃取（2026-06-24）
> Skill：`jane-finance`（四模式：顧問/學習/分析/查詢 + 可信度分級 🟢🟡🔴）

- [[旺來幫Jane/_index|旺來幫 Jane 總索引]] — 12 個分類導航 + 建議閱讀順序
- [[旺來幫Jane/擺脫金融文盲|擺脫金融文盲]] — 資產vs負債、複利、ETF、EPS/PER/PBR、景氣循環（26 篇）`#finance #basics`
- [[旺來幫Jane/最快最簡單成為有錢人的方法|致富方法]] — 買賣時機、選股法、投資組合 50/30/20（24 篇）`#finance #strategy`
- [[旺來幫Jane/未來成長產業|未來成長產業]] — 量子運算、航太、能源六部曲、AI 版權（22 篇）`#finance #industry`
- [[旺來幫Jane/Jane的秘密手冊|Jane 秘密手冊]] — 5 情境操作手冊 + 12 危機預測訊號（28 篇）`#finance #playbook`
- [[旺來幫Jane/CBDC與數位貨幣|CBDC 與數位貨幣]] — 穩定幣機制、美中台策略（10 篇）`#finance #crypto`
- [[旺來幫Jane/龍頭股發掘方法|龍頭股 20 步驟]] — 系統化選股方法論 + 量化指標速查（12 篇）`#finance #stock-picking`
- [[旺來幫Jane/30年致富機會|30 年致富機會]] — 7 大結構變局（16 篇）`#finance #macro`
- [[旺來幫Jane/金融用語教學|金融用語教學]] — 250+ 術語辭典（9 篇）`#finance #glossary`
- [[旺來幫Jane/Jane的思考脈絡|Jane 思考脈絡]] — 美國霸權/比特幣/房地產/AI/投資哲學（51 篇）`#finance #analysis`
- [[旺來幫Jane/JANETFLIX宏觀經濟小說|JANETFLIX 宏觀經濟小說]] — 川普馬斯克兄弟情、美中霸權戰（25 篇）`#finance #geopolitics`
- [[旺來幫Jane/讓孩子成為幸福的有錢人|子女金融教育]] — 48 條法則 + 分齡清單（7 篇）`#finance #education`
- [[旺來幫Jane/金錢的起點與終點|金錢的起點與終點]] — 金融系統三層結構（5 篇）`#finance #philosophy`

---

## 如何新增知識

依來源類型有三條進庫路徑：

### 路徑 A — 文章 / 剪報 / PDF（走 /compile）
1. 用 Obsidian Web Clipper 剪報 → 存到 `Clippings/` 或 `Inbox/`
2. 手動將檔案移至 `raw/sources/`（或 NotebookLM 匯出放 `raw/notebooklm/`）
3. 在 Claude Code 輸入 `/compile`
4. 索引、`log.md`、gbrain 語意層自動更新

### 路徑 B — GitHub repo 分析（走 /repo-intel）
1. 在 Claude Code 輸入 `/repo-intel <repo URL 或 owner/repo>`
2. 直接寫入 `wiki/Github/repos/{標題}.md` 並更新 `wiki/Github/_index.md` 分類與計數
3. **不經 raw/、不跑 /compile** — 所以新文章尚未進 gbrain 語意層

### 路徑 C — 靈感速記（走 gbrain-inbox）
1. 速記丟到 `Inbox/`
2. 跑 `tools/gbrain-inbox.ps1` → import 進 gbrain 並移至 `wiki/Ideas/`

> **gbrain 同步提醒**：只有路徑 A（/compile）和路徑 C 會即時進 gbrain。路徑 B（repo-intel）或任何手動新增的文章，要能被語意搜尋命中，需補跑一次 `/compile`，或手動 `gbrain import "d:\Claude\obsidian\wiki" --no-embed && gbrain embed --stale`。
> 結構化導航（找特定文章/目錄）走 `_index.md` 即可，不受此限。詳見 `CLAUDE.md` 的「檢索分工」。
