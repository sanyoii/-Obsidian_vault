# 知識庫主索引

> 最後更新：2026-07-30
> 文章數量：397 篇
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
- [[Claude/2026-claude-code-repo-structure-final-boss|Claude Code 的終極挑戰：Repository 結構設計（Final Boss Setup）]] — 四層 Context Ladder、ASKED vs FORCED、Routing 三分類、Path Gating、Agent Memory、危險目錄 CLAUDE.md、七大 Golden Rules `#Claude-Code #Repo結構 #CLAUDE.md #Hooks #Skills`
- [[Claude/fable5-mastery-leader-mode-workflows|Fable 5（Claude Sonnet 5）駕馭全攻略 — Leader 模式與五大變現工作流]] — 讓 Fable 當團隊領導者而非工人：Pocock skills 規劃 + Opus/Codex worker 分工 + verifier 審核；三秘訣（不過度引導/CLAUDE.md 輕量化/善用 goal+loop）；五個變現工作流 `#Fable5 #ClaudeCode #Agent編排 #Skill設計 #Leader模式`
- [[Claude/multi-ai-task-card|多 AI 協作不斷片 — 用任務卡把 Claude/Codex/Cursor 接起來]] — 聊天是時間線不是狀態機；六節點流程（請求→對話→任務卡→執行位置→產物→寫回）、10 欄位最小任務卡、hard gate 清單、boundary 四分類 `#多AI協作 #任務卡 #agent設計 #狀態管理 #工作流`

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
- [[代理人模式|代理人模式]] — 存取控制（延遲載入/權限/遠端代理） `#結構型`
- [[複合模式|複合模式]] — 樹狀結構透明度，單體與容器一致介面 `#結構型`

#### 創建型模式
- [[工廠方法|工廠方法]] — 物件創建與生命週期管理 `#創建型`
- [[單體模式|單體模式]] — 全域唯一實例，資源約束與濫用警示 `#創建型`
- [[抽象工廠|抽象工廠]] — 聚合多工廠介面，強制產品組合一致 `#創建型`

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

### Self-Media（自媒體變現）

- [[Self-Media/2026-ai-agent-team-zero-code-guide|零代碼 AI Agent 團隊建置完全指南]] — 零代碼用 Claude Desktop + Cowork 建立 AI Agent 團隊的完整教學，四大組件（Role/Instructions/Tools/Memory）、五步驟建置、4-Agent 內容製作流程、進階技巧、三套預設團隊範本 `#AI-Agent #Claude #Cowork #零代碼 #自媒體工具 #工作流自動化`
- [[Self-Media/2026-ai-video-production-guide|2026 AI 自媒體完全手冊 — Codex + HyperFrames + Remotion 一鍵出片]] — 三個工具、三條變現路線（講書號/帶貨/數據科普）、工作流程、成本與法規限制 `#self-media #video-production #ai-tools #codex #remotion #hyperframes #automation`

---

### Career（職涯與技能路線圖）

- [[Career/2026-ai-engineer-no-cs-degree-path|2026年無CS學位成為AI工程師的完整路徑]] — 技能堆疊九步驟、三個能被雇用的專案、Claude Tutor提示、90天計畫、常見失敗模式 `#AI工程師 #職涯 #技能路線圖 #RAG #Agent #求職策略`

---

### Tools（工具使用手冊）

- [[Tools/ai-一手資訊源清單|AI 一手資訊源清單（12 個）]] — 12 個不看二手轉述的 AI 一手來源，五類分組 + 每日／每週／決策時的追蹤節奏建議 `#tools #ai #資訊源`
- [[Tools/web3-ai-情報流水線開源專案清單|Web3 × AI 情報流水線開源專案清單（5 個）]] — 社群推薦的 5 個情報自動化開源專案，補上即時星數／停更／授權查核，並標明哪些本 vault 已分析過（TrendRadar ⏳）避免重複評估 `#tools #web3 #ai #資訊源`
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

---

### Quant-Trading（量化交易）

- [[Quant-Trading/2026-polymarket-quant-math-roadmap|2026年量化交易完整數學學習地圖]] — 從概率論到Black-Scholes，七章系統化路線圖；Polymarket LMSR與CLOB機制；頂級宽客薪資與工具箱 `#量化交易 #Polymarket #概率論 #Black-Scholes #演算法交易`
- [[Quant-Trading/ai-24h-risk-monitoring|AI 24 小時盯盤——普通人可用的機構級風控四層架構]] — 護城河＝永遠在線＋硬編碼熔斷線而非「AI 比人聰明」；四層架構（實時監控/異常檢測/熔斷線/壓力測試）；三個零代碼落地動作與三大局限 `#quant #風控 #AI應用 #交易系統`
- [[Quant-Trading/lehman-brothers-trading-manuals|雷曼兄弟內部交易培訓手冊 — 投行實務的一手教材]] — 2010 破產調查公開的三份 desk operating manual 真實目錄：FX Training Manual 130 頁（spot/forwards/swaps/options 四段，含 gamma hedging 練習）、Repo Sales Reference Guide 71 頁（11 節含 Infinity 前台系統）、Credit Risk Reporting Procedures Manual 32 頁（CCE/MPE、parent-child mapping、Daily Excess Report）；PDF 已存 raw/sources/lehman-manuals/ 並開檔驗證；含手冊×證物對讀法與來源站可信度評估 `#quant #外匯 #選擇權 #repo #信用風險 #投行實務 #一手文件`
- [[Quant-Trading/投行金流與反洗錢-自學教材|投行金流與反洗錢 — 自學教材]] — 13 模組自學課程，前台實務（FX 語言/forward 利率差/swap 資金調度/Greeks 與 gamma hedging/Repo 生命週期/CCE-MPE 信用風險報表）× 洗錢五案（Wachovia 通匯／Danske 非居民／德銀鏡像交易／Troika 平行金融／太子集團與 Lazarus 鏈上）；每模組白話先行＋一手 PDF 頁碼導航＋自測題；含四判準、手冊×證物對讀法、中英詞彙表、Web3/CEX 面試映射 `#教材 #AML #合規 #外匯 #選擇權 #repo #web3`
- [[Quant-Trading/雷曼FX手冊-中文精修-01-即期外匯|雷曼 FX 手冊 中文精修 ① 即期外匯]] — 一手手冊 p.1–37 全節中文化：outright／四種交割慣例（CAD 例外）／credit risk 與 settlement risk（Herstatt）／American vs European terms＋算術寫法陷阱／匯率變動與損益三題全解／pips／速算公式／bid-offer／**left bid–right offer 三步判斷法**／cross rate 同異 terms／**cross bid-offer 交叉規則＋最寬 spread 反推驗算**；10 個零基礎實例區塊＋8 題自測；標出原件兩處錯誤 `#教材 #中文精修 #外匯 #FX-Spot #一手文件`
- [[Quant-Trading/雷曼FX手冊-中文精修-02-遠期外匯|雷曼 FX 手冊 中文精修 ② 遠期外匯]] — 一手手冊 p.38–68 全節中文化：forward 定義與市場規模／**利率平價的無套利證明（含套利四步驟實例）**／forward points 與計算公式（標出線性近似與精確法差 4.4 點）／premium-discount／**pay or earn the points 一句話自檢法**／forward 日期與 end-to-end rule／odd dates 內插／**futures vs forward 的保證金陷阱**／forward desk 作為全行資金調度中樞／利率趨勢性強於匯率／**even swap 仍產生 spot equivalent 曝險**／Eurodollar futures 100−價格；20 個實例區塊＋10 題自測 `#教材 #中文精修 #外匯 #FX-Forwards #利率平價 #一手文件`
- [[Quant-Trading/雷曼FX手冊-中文精修-03-換匯交易|雷曼 FX 手冊 中文精修 ③ 換匯交易]] — 一手手冊 p.69–93 全節中文化：swap 結構與只有兩種型態／**swap 賣的是時間不是方向（把匯率風險換成利率差風險）**／依交割日八種分類／**T/N 是唯一近端早於 spot 者、故為明天資金缺口的唯一解**／bid-offer 指遠端那一腿／**兩邊價格從歐洲貨幣市場存放款利率推導（bid＝base offer−terms bid）**／「做市商賺最多」原理第三次出現／**加減三種判斷法互為驗算**／pay-earn 沿用 ② 判準；12 個實例區塊＋10 題自測；標出原件一處數字顛倒誤植 `#教材 #中文精修 #外匯 #FX-Swaps #資金調度 #一手文件`
- [[Quant-Trading/雷曼FX手冊-中文精修-04-外匯選擇權|雷曼 FX 手冊 中文精修 ④ 外匯選擇權]] — **系列完結**，一手手冊 p.94–130 全節中文化：payoff 與兩平／內含+時間價值／**波動率是合約唯一未指定的參數故為交易員真正交易的東西**／delta 動態避險三點走查／**gamma 避險完整 P&L（到期作廢卻獲利 $925，證明實現波動>隱含波動時不論方向都賺）**／theta 與 gamma 互為代價／vega 與市場衝擊兩難／rho 避險／二階 Greeks nova／**reverse knock-out：賺最多處即離死最近處，delta 可達 −300%**／barrier 觸發連鎖單與 CEX 連環清算同構／策略組合與 **risk reversal 才是方向性預期的溫度計**；17 個實例區塊＋14 題自測；標出原件兩處錯誤 `#教材 #中文精修 #外匯 #選擇權 #Greeks #gamma-hedging #一手文件`

---

### 倫敦黑貓 London Black Cat

> 來源：londonblackcat.substack.com 23 篇全數萃取（2026-07-30）｜作者匿名，自述資歷一律 🔴
> Skill：`london-blackcat`（四模式：紅旗/機制/面試/生態 + 可信度分級 🟢🟡🔴）

- [[倫敦黑貓/_index|倫敦黑貓總索引]] — 五主題頁導航 + 兩條閱讀路線 + 編輯紀律 `#index`
- [[倫敦黑貓/暗流-洗錢與地下金融|暗流：洗錢與地下金融]] — 七案速查、五種攻擊面交叉比較、**紅旗速查（銀行 14 條＋鏈上 11 條，以可觀測欄位為軸）**、AML 制度四失效點、cum-cum/cum-ex 稅差套利、灰產資本邏輯、地下銀行從飛錢到 USDT 的不變邏輯（7 篇）`#AML #洗錢 #合規 #紅旗`
- [[倫敦黑貓/交易實務與市場事件|交易實務與市場事件]] — 選擇權下跌應對決策清單、Wheel Strategy 拆解＋7 條失效條件、韓股融斷的指數集中×槓桿 ETF 因果鏈（4 篇）`#選擇權 #ETF #交易策略`
- [[倫敦黑貓/市場結構與金融產品|市場結構與金融產品]] — Private Credit 槓桿暗處、足球豪門結構化融資、唐提式養老金 Tontine、華爾街造詞史 FANG→MANGOS（4 篇）`#市場結構 #結構化融資 #private-credit`
- [[倫敦黑貓/金融圈人物與職場文化|金融圈人物與職場文化]] — Alpha Male/Finance bro 類型學、挖角與 team lift-out 六機制、八卦作為資訊流動機制、**對求職者的實用啟示**（3 篇）`#職場 #倫敦金融城 #求職`
- [[倫敦黑貓/倫敦生活與隨筆|倫敦生活與隨筆]] — **Monzo/Revolut/Wise 換匯四維對照＋四個隱藏機制（safeguarding vs FSCS、AML 凍結申訴、無 Section 75）**、倫敦生活成本、站台定位（5 篇）`#英國 #換匯 #生活`

---

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
