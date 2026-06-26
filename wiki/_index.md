# 知識庫主索引

> 最後更新：2026-06-26
> 文章數量：172 篇
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

- [[Github/留看repos/已整理/Panniantong-Agent-Reach — AI Agent 互聯網感知層|Agent Reach — AI Agent 互聯網感知層]] — 17 平台 skills 腳手架（網頁/YouTube/Twitter/Reddit/小紅書/B站/微博/V2EX/雪球…），一句話安裝，零配置 8 頻道；✅ 適合安裝 `#skills #social-media #claude-code #mcp #internet`
- [[Github/留看repos/已整理/mvanhorn-last30days-skill — AI 多平台社群研究引擎|last30days-skill — AI 多平台社群研究引擎]] — `/last30days <主題>` 跨 Reddit/X/YouTube/TikTok/HN/Polymarket 等 10+ 平台平行搜尋，社群互動量排序；✅ 適合安裝 `#skills #research #social-media #claude-code`
- [[Github/留看repos/已整理/ECC — Claude Code harness-native 操作系統|ECC — Claude Code harness-native 操作系統]] — harness-native AI Agent 操作系統（Skills + Agents + Hooks + Rules），100+ skills，182K stars `#tool #claude-code #skills #hooks #agents`
- [[Github/留看repos/已整理/Headroom — AI Agent Context 壓縮層|Headroom — AI Agent Context 壓縮層]] — 自動壓縮 context window，減少 token 消耗 `#tool #claude-code #context`
- [[Github/留看repos/已整理/anthropicsknowledge-work-plugins|knowledge-work-plugins]] — Anthropic 官方知識工作 plugins 套件 `#anthropic #plugins`
- [[Github/repos/Stop-slop 寫作去除AI腔|Stop-slop 寫作去除AI腔]] — 去除 AI 生成文章的機器味 `#writing #ai`
- [[Github/repos/issue_tmp — GitHub Issue  PR 模板套件|issue_tmp — GitHub Issue / PR 模板套件]] — 繁體中文 9 種 Issue 表單 + PR 模板 `#github #templates`
- [[Github/留看repos/已整理/x1xhlol-system-prompts-and-models-of-ai-tools|x1xhlol/system-prompts-and-models-of-ai-tools — AI 工具 System Prompt 資料庫]] — 30+ 工具真實 system prompt（Cursor/Claude Code 2.0/Manus/Windsurf/Kiro 等），104 檔案 2.1MB；✅ 適合收藏 `#ai-prompts #reverse-engineering #claude-code #research`
- [[Github/留看repos/已整理/addyosmani-agent-skills — 生產級工程 Skills 套件|addyosmani/agent-skills — 生產級工程 Skills 套件]] — 24 個 SDLC 工程 skills（spec/plan/build/verify/review/ship）+ 7 條斜線指令 + 4 個專用 Agent；✅ 適合安裝 `#skills #claude-code #engineering #tdd #spec`
- [[Github/留看repos/已整理/Madison-de-Chao-rainbow-sanctuary-report-site — 命理解讀報告銷售落地頁|Rainbow Sanctuary — 命理解讀報告銷售落地頁]] — Next.js 15 命理報告銷售模板，紫微×八字×占星×人類圖「人生羅盤」三階定價落地頁；參考用，非排盤引擎 `#nextjs #landing-page #ziwei #astrology #reference`
- [[Github/repos/music-assistant-server — 開源家用音樂串流管理器|music-assistant/server — 開源家用音樂串流管理器]] — 106 個 providers 整合 Spotify/Tidal/YouTube 等音源 + Sonos/AirPlay 等嗇叭；含實驗性 FastMCP plugin 可接 Claude Code；⏳ 觀望 `#media #music #home-assistant #mcp #self-hosted`
- [[Github/repos/chatwoot — 開源全通道客服平台|chatwoot — 開源全通道客服平台]] — 整合 10+ 頻道（WhatsApp/Email/FB/IG/Telegram）於統一收件匣，Rails+Vue.js，31.6k stars；Intercom/Zendesk 開源替代；❌ 不適合 `#customer-support #omnichannel #live-chat #rails #vuejs #webhook #self-hosted`
- [[Github/repos/PixelRAG — 像素原生 RAG，截圖讓 AI 用視覺讀網頁|PixelRAG — 像素原生 RAG，截圖讓 AI 用視覺讀網頁]] — `pixelshot` CLI 把網頁/PDF 截圖成分塊圖片讓 LLM 視覺讀取，含 Claude Code plugin `pixelbrowse`；✅ 已安裝，Windows 需 CHROME_PATH wrapper `#skills #claude-code-plugin #screenshot #rag`
- [[Github/repos/calesthio-OpenMontage|OpenMontage — 開源 Agentic 影片製作系統]] — AI Agent 驅動全自動影片製作（研究→腳本→素材→剪輯→合成），支援 Veo/Kling/FLUX 多 provider `#video #agentic #production #open-source`
- [[Github/repos/tw93-Pake|Pake — 網頁轉桌面 App 打包工具]] — Rust + Tauri 一行指令把網頁打包成跨平台桌面 App（~5MB），Electron 極輕量替代品 `#tools #desktop #tauri #rust`
- [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫|awesome-design-md — 73 套品牌 DESIGN.md 設計系統]] — 93.5K⭐，Google Stitch 規範，73 品牌即插即用 AI UI 生成，9 大類分類覽 `#design-system #google-stitch #vibe-coding #ui-generation`
- [[Github/repos/deer-flow — 字節跳動開源超級 Agent 運行框架|DeerFlow — 字節跳動超級 Agent Harness]] — 74.9K⭐，LangGraph/LangChain，25+ middleware、Skills、沙箱、IM 閘道、Sub-Agents；⏳ 觀望 `#agent-framework #langgraph #multi-agent #bytedance`
- [[Github/repos/google-labs-code — Google Stitch + Jules 開源組織全覽|google-labs-code — Google Stitch + Jules 組織]] — 32K+⭐，8 repo：DESIGN.md 規範(20.7K⭐)+14 Agent Skills+Jules 雲端 Agent；🟢 CLI 可裝 `#google-stitch #design-system #agent-skills #jules #mcp`

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

1. 用 Obsidian Web Clipper 剪報 → 存到 `Clippings/` 或 `Inbox/`
2. 手動將檔案移至 `raw/sources/`（或 NotebookLM 匯出放 `raw/notebooklm/`）
3. 在 Claude Code 輸入 `/compile`
4. 索引與 `log.md` 自動更新
