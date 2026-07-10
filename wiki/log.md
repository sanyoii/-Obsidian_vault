# 知識庫操作日誌

> **規則：只增不改。** 每次 `/compile`、`/query`、`/lint` 後追加一筆記錄，不得修改舊記錄。
> 格式：`YYYY-MM-DD HH:MM | 操作 | 來源 → 產出 | 備註`

---

## 2026-06

### 2026-06-06 | COMPILE
- `2026-06-06 11:30 | COMPILE | github.com/Panniantong/Agent-Reach → wiki/Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層.md` | repomix 分析（80 檔，98K tokens）；AI Agent 互聯網感知腳手架，v1.4.0，Python 3.10+；17 平台（YouTube/Twitter/Reddit/小紅書/B站/微博/V2EX/雪球/播客…）；SKILL.md 路由系統 + agent-reach doctor 診斷；結論 ✅ 適合安裝（零配置 8 頻道即用，SKILL.md 原生相容現有 skills 環境）
- `2026-06-06 10:30 | COMPILE | github.com/mvanhorn/last30days-skill → wiki/Github/repos/mvanhorn-last30days-skill — AI 多平台社群研究引擎.md` | repomix 分析（102 檔，292K tokens）；AI Agent-led 多平台社群研究工具，v3.3.2，Agent Skills 格式，Python 3.12+ + Node.js；搜尋 Reddit/X/YouTube/TikTok/HN/Polymarket 等 10+ 平台；結論 ✅ 適合安裝（零設定啟動，與現有 skills 環境完全相容）；新增 _index.md Github/Repos 區塊

### 2026-06-03 | COMPILE
- `2026-06-03 08:48 | COMPILE | Chase AI YouTube教學 + NotebookLM → wiki/Claude/Command Center Plugin — Obsidian 指揮中心.md` | 建立自製 Obsidian Plugin（4 個 Ribbon 按鈕：Morning Briefing/Compile/Lint/Quick Capture）；串接 social-monitor + job-crawler；新增 wiki/Daily/ 分類；更新 CLAUDE.md 加入 /morning 指令；_index 計數 150→151
- `2026-06-03 14:30 | COMPILE | Dashboard v2/v3 → wiki/Claude/Obsidian Dashboard 路線圖.md` | Dashboard 升級三版：v1 Bases+Home.md、v2 Plugin Panel+GitHub/HN雙欄、v3 四欄2×2 grid（+Product Hunt+Lobsters）+互動（HN開原文/GitHub repomix分析）+字型優化；新增 fetch-dashboard-data.ps1 + analyze-repo.ps1；_summaries.md 更新
- `2026-06-03 16:00 | COMPILE | Google Calendar MCP 整合 → Phase 3 完成` | 新增 fetch-calendar.ps1（headless Claude + --dangerously-skip-permissions + Google Calendar MCP）；Dashboard Morning Brief 新增📅日曆按鈕；行程區塊顯示全天/時間事件；已驗證義大利商旅全天事件正確顯示
- `2026-06-03 17:30 | COMPILE | Gmail MCP Email Brief → Phase 4a 完成` | 新增 fetch-email-brief.ps1（Gmail MCP search_threads+get_thread；Claude 評估 Emergency/High/Med/Low；萃取 Todo 事項；略過 newsletter）；Dashboard 新增 EMAIL BRIEF 全寬區塊（Morning Brief 下方）；📧 Email 按鈕；Emergency 紅色閃爍；已驗證：佛羅倫斯餐廳訂位 High+3 個待辦，13 封 newsletter 略過

### 2026-06-11 | COMPILE
- `2026-06-11 00:00 | COMPILE | github.com/addyosmani/agent-skills → wiki/Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件.md` | repomix 分析（90 檔，126K tokens）；Addy Osmani（Google Chrome）生產級工程 skills 套件；24 skills 涵蓋 SDLC 六階段 + 7 斜線指令 + 4 專用 Agent + Hooks；SKILL.md 原生格式；結論 ✅ 適合安裝（/plugin marketplace add addyosmani/agent-skills，與現有 skills 環境 100% 相容，呼應 CLAUDE.md R8/R10/R14）
- `2026-06-11 23:00 | COMPILE | claude plugin install（本地 marketplace 繞過）→ wiki/Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件.md` | 安裝完成：32 skills + 8 commands + SessionStart hook（jq 已用 winget 補裝）；GitHub SSH 失敗改用本地 clone + marketplace source="./" 繞過；4 個 agent personas 因 plugin.json 格式未載入，改手動裝至 .claude/agents/specialized/agent-skills/，security-auditor 改名 sdlc-security-auditor 避免與 v3 衝突；同步更新 claude-tools-dashboard.html（新增 AGENTS 分類 + Plugin 說明卡）
- `2026-06-11 23:30 | COMPILE | jq PATH 修正 + Hooks 範圍釐清 → wiki/Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件.md` | jq.exe 複製到 ~/.local/bin 修正 PATH，SessionStart hook 驗證完整輸出 using-agent-skills meta-skill；新增 Hooks 表格區分「plugin 自動安裝」(SessionStart ✅) vs「per-project 選配未啟用」(sdd-cache/simplify-ignore ❌)；更新相關性評估表 Hooks 整合列
- `2026-06-11 23:03 | QUERY | jq 依賴修正是否完成 → wiki/Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件.md` | 重新驗證確認：`which jq` → `~/.local/bin/jq`（jq-1.8.1），直接執行 `bash hooks/session-start.sh` 完整輸出 using-agent-skills meta-skill（priority IMPORTANT）；jq 依賴修正項目確認完成，文件內容無需變更
- `2026-06-11 23:50 | LINT | wiki/Github/repos/ → wiki/Github/repos/` | 將 16 篇已整理完成的 repo 分析文章從 repos/ 移至 留看repos/已整理/（git mv 保留歷史），原始剪報留在 repos/；同步修正 _index.md（6 條連結）與 _summaries.md（3 條連結）、x1xhlol 文章內 ECC 反向連結路徑

### 2026-06-12 | COMPILE
- `2026-06-12 00:20 | COMPILE | github.com/Madison-de-Chao/- → wiki/Github/repos/Madison-de-Chao-rainbow-sanctuary-report-site — 命理解讀報告銷售落地頁.md` | repomix 分析（38 檔，16K tokens）；Next.js 15 命理報告銷售落地頁，紫微×八字×占星×人類圖「人生羅盤」三階定價（1680/2880/3980）；非排盤引擎，與命運羅盤專案主題重疊，頁面架構可參考；新增 _index.md 與 _summaries.md 條目
- `2026-06-15 00:00 | COMPILE | github.com/chatwoot/chatwoot → wiki/Github/repos/chatwoot — 開源全通道客服平台.md` | repomix 分析（gh API + WebFetch）；Ruby on Rails + Vue.js 全通道客服平台，31.6k stars；整合 10+ 頻道（WhatsApp/Email/FB/IG/Telegram/Line/TikTok/SMS/語音）；含 Agent Bot Webhook 框架、Captain AI Agent、REST API；結論 ❌ 不適合（SaaS 等級基礎設施，個人工作流無外部客服需求）

### 2026-06-12 | LINT
- `2026-06-12 00:10 | LINT | wiki/Github/repos/ → wiki/Github/repos/` | 第二輪：再移 6 篇「原始 README + 附加分析（值得安裝嗎/分析結論）」混合格式文章（Chandra OCR 2、knowledge-work-plugins repo、prompt-master、anthropicsknowledge-work-plugins、eigent、OpenHuman），同步修正 _index.md 與 x1xhlol 文章內 prompt-master 反向連結路徑；anthropicsknowledge-work-plugins 與 knowledge-work-plugins repo 為同一 repo 兩份不同日期剪報，皆已移入但未去重

### 2026-06-13 | COMPILE
- `2026-06-13 23:30 | COMPILE | github.com/music-assistant/server → wiki/Github/repos/music-assistant-server — 開源家用音樂串流管理器.md` | repomix 分析 106 個 providers；發現實驗性 FastMCP MCP Server plugin；⏳ 觀望（需 Docker + FFmpeg + PyTorch，HA 環境者可裝）

### 2026-06-10 | COMPILE
- `2026-06-10 22:00 | COMPILE | github.com/x1xhlol/system-prompts-and-models-of-ai-tools → wiki/Github/repos/x1xhlol-system-prompts-and-models-of-ai-tools.md` | repomix 分析 104 檔 / 461K tokens；收錄 30+ AI 工具真實 system prompt（Claude Code 2.0 / Cursor 多版本 / Manus / Windsurf / Kiro 等）；✅ 適合 clone 備查

### 2026-06-28 | COMPILE
- `2026-06-28 00:56 | COMPILE | github.com/xbtlin/ai-berkshire → wiki/Github/repos/xbtlin-ai-berkshire.md` | repomix 分析（2202 檔，32.8MB）；18 個 Claude Code / Codex 投研 Skill，巴菲特/芒格/段永平/李錄四大師框架；Python 工具含精確計算 + 雪球爬蟲；MIT 授權；✅ 適合安裝（./scripts/install-claude-commands.sh）
- `2026-06-28 00:57 | COMPILE | github.com/hugohe3/ppt-master → wiki/Github/repos/hugohe3-ppt-master.md` | repomix 分析（2202 檔）；實為 AI Berkshire 投資研究框架（repo 名稱誤導）；18 Skill 含 /investment-team 四 Agent 並行；codex-skills/ 20 個 SKILL.md 可直接借用；MIT；✅ 適合借用單一 Skill

### 2026-06-20 | COMPILE
- `2026-06-20 00:10 | COMPILE | github.com/Hmbown/CodeWhale → wiki/Tools/CodeWhale.md` | 開源 Terminal Coding Agent（Rust），模型中立 Claude Code 替代品，25 providers，Plan/Agent/YOLO 三模式，v0.8.62，MIT
- `2026-06-20 00:10 | COMPILE | github.com/Alishahryar1/free-claude-code → wiki/Tools/free-claude-code.md` | 本地 API 代理伺服器（Python），讓 Claude Code/Codex 原生介面接第三方模型，API 流量路由層，MIT
- `2026-06-20 00:10 | COMPILE | github.com/calesthio/OpenMontage → wiki/Github/repos/calesthio-OpenMontage.md` | 開源 Agent 驅動影片製作系統，自然語言→全自動影片（研究→腳本→素材→剪輯→合成），多 provider，1356 檔案，AGPLv3
- `2026-06-20 00:10 | COMPILE | github.com/tw93/Pake → wiki/Github/repos/tw93-Pake.md` | Rust+Tauri 一行指令網頁→桌面 App（~5MB），Electron 極輕量替代品，35K+ stars，MIT
- `2026-06-20 01:00 | COMPILE | claude-tools-dashboard.html → 新增 CLI 工具頁籤` | 10 個全域 CLI 工具（claude-code/codex/gemini-cli/openclaw/claude-code-router/repomix/defuddle/pake-cli/openspec/pnpm），粉紅色邊框卡片；同步 revert Obsidian Command Center 誤改

### 2026-06-30 | COMPILE
- `2026-06-30 00:00 | COMPILE | wiki/水球流軟體設計模式精通之旅/ → wiki/_index.md + wiki/_summaries.md + wiki/_graph.md` | 補登 2026-06-29 新增 4 篇文章（代理人模式/複合模式/單體模式/抽象工廠）至主索引、摘要與連結圖；Christopher Alexander RPG 道館挑戰原始剪報編譯為正式 wiki 文章（Forces/Problem/Pattern 結構）

## 2026-07

### 2026-07-10 | COMPILE
- `2026-07-10 22:23 | COMPILE | raw/sources/2026-07-10_multi-ai-task-card.md → wiki/Claude/multi-ai-task-card.md` | 使用者貼原文入庫（Leo @runes_leo 訂閱區導流文）；多 AI 任務卡工作流：聊天=時間線非狀態機、六節點（請求→對話→任務卡→執行位置→產物→寫回）、10 欄位最小卡、hard gate 清單、boundary 四分類；核心四句「對話推進/任務卡持狀態/產物證明/寫回接續」；與 R17 契約表同構；_index 382→383、Claude/_index 20→21；反向連結驗證 3 檔皆存在（7-Agent 工廠工作流 SOP / Claude 工具全覽（2026）/ Claude 環境說明）
- `2026-07-10 16:31 | COMPILE | raw/sources/2026-07-10_ai-24h-risk-monitoring.md → wiki/Quant-Trading/ai-24h-risk-monitoring.md` | 簡體中文財經科普文；機構級風控四層架構（實時監控/異常檢測/硬編碼熔斷線/壓力測試）轉繁體 wiki 筆記；護城河：「永遠在線＋硬規則」而非「AI 比人聰明」；關鍵數據：60–70% 美股交易由 AI 完成、銀行反欺詐假警報減 45–65% 同保 99% 命中；三落地動作（寫熔斷線/每日體檢/月度壓力測試）；三局限（極端行情失效/警報疲勞/非自動駕駛）；三啟示（永遠在線>聰明/提前定規則/差距縮小）；反向連結驗證與已存在檔案對齊（2026-polymarket-quant-math-roadmap / _index）
- `2026-07-10 09:10 | COMPILE | raw/sources/2026-07-10_clone-fable5-into-opus48.md → wiki/Claude/clone-fable5-into-opus48.md` | 使用者貼原文入庫（Hamza newsletter）；brain backup 四步法（10領域常備指令+7 prompt+陷阱題驗證）；批判脈絡：institution 弱模型治理消費者版、7-12 vs 07-07 日期矛盾註記、訂閱導流漏斗標明；值得偷：陷阱題行為驗收+Health-Check 漂移檢測；Claude/_index 19→20
- `2026-07-10 00:33 | COMPILE | raw/sources/2026-07-10_loop-engineering-karpathy-method.md → wiki/Claude/loop-engineering-karpathy-method.md` | 使用者貼原文入庫（無 URL）；解讀 Loop Engineering 方法論：loop 三要素（verifier/state/stop condition）、需不需要 loop 四項自測、Karpathy AutoResearch 案例（三檔案架構、700實驗20項改進、Shopify案例19%提升）、五組成部件、Bilevel Autoresearch（outer/inner loop 5倍改善）、簡化版可執行 prompt、誠實兩問題（comprehension debt/cognitive surrender）；Claude/_index.md 計數 18→19；反向連結確認對齊 Karpathy 最高遵守原則 / Karpathy program.md Skill 設計哲學

### 2026-07-08 | COMPILE
- `2026-07-08 16:32 | COMPILE | raw/sources/2026-07-08_fable5-mastery-course.md → wiki/Claude/fable5-mastery-leader-mode-workflows.md` | 使用者貼原文入庫（教學文，無 URL）；Fable 5（Claude Sonnet 5）駕馭全攻略：Leader/Worker/Verifier 分工架構（Pocock skills 規劃+Opus/Codex worker+verifier 審核）、三秘訣（不過度引導/CLAUDE.md 輕量化/goal+loop 終點線+煞車+誠實條款）、一鏡到底流程範例、五個變現工作流；_index.md 計數 380→381、Claude/_index.md 17→18；反向連結修正對齊實際檔名（7-Agent 工廠工作流 SOP / Karpathy 最高遵守原則 / 18個改變一切的 Claude Code Settings）

### 2026-07-07 | COMPILE
- `2026-07-07 19:45 | COMPILE | raw/sources/2026-07-07_ai-video-production-guide.md → wiki/Self-Media/2026-ai-video-production-guide.md` | 新開 Self-Media 分類；X 文章（@iluciddreaming）使用者貼原文入庫；三工具（Codex/HyperFrames/Remotion）×三變現路線解讀
- `2026-07-07 21:25 | COMPILE | raw/sources/2026-07-07_polymarket-quant-math-roadmap.md → wiki/Quant-Trading/2026-polymarket-quant-math-roadmap.md` | 新開 Quant-Trading 分類；原作 @gemchange_ltd、編譯 Mr.RC；七章系統化量化交易數學知識地圖（概率論→統計學→線性代數→微積分→隨機微積分→Polymarket LMSR/CLOB→職業版圖）；含貝葉斯、凱利公式、Black-Scholes、希臘字母、LMSR成本函數等核心公式；宽客薪資$300K-$500K入門級；推薦教科書清單與編程習題
- `2026-07-07 21:29 | COMPILE | raw/sources/2026-07-07_ai-agent-team-zero-code-guide.md → wiki/Self-Media/2026-ai-agent-team-zero-code-guide.md` | X 文章（@eng_khairallah1）；零代碼 AI Agent 團隊建置完全指南，四組件（Role/Instructions/Tools/Memory）、五步驟建置、4-Agent 內容製作管線（30分鐘內完成文章）、排程/context一致性/回饋迴圈/多步驟工作流四進階技巧、商業智能/客戶研究/社群媒體三團隊範本
- `2026-07-07 22:18 | COMPILE | raw/sources/2026-07-07_ai-engineer-no-cs-degree-path.md → wiki/Career/2026-ai-engineer-no-cs-degree-path.md` | 新開 Career 分類；使用者貼原文入庫；2026年無CS學位成為AI工程師的完整路徑：技能堆疊九步驟/三個能被雇用的專案/Claude Tutor結構化提示與逐行講解方法/求職策略與outreach email模板/三個專業方向賽道/90天計畫/五項常見失敗模式；_index.md新增Career分類；_summaries.md新增摘要；反向連結確認求職進度/Claude Code Skills手冊/Agent工廠
- `2026-07-07 23:14 | COMPILE | raw/sources/2026-07-07_claude-code-repo-structure-final-boss.md → wiki/Claude/2026-claude-code-repo-structure-final-boss.md` | 英日混合原文解讀為繁中 wiki 文章；核心論點：瓶頸不是模型而是 repo 結構；七大設計原則（Context Ladder 四層/ASKED vs FORCED/Routing 三分類/Path Gating/Agent Memory/危險目錄 CLAUDE.md/七大 Golden Rules）；_index.md 計數 378→379、_summaries.md 新增摘要、新增 Agent 設計類別條目

### 2026-07-01 | COMPILE
- `2026-07-01 01:55 | COMPILE | active/life-chart-engine 安裝實測 → wiki/Github/repos/zhenheco-life-chart-engine — 三合一原生排盤引擎（西洋星盤×人類圖×紫微斗數）.md` | 補「安裝後更新」章節：發現並本地修正人類圖 OFFSET 計算 bug（與 GitHub issue #4 獨立交叉驗證一致）、衍生 tri-system-life-reading Claude Code skill

---

## 2026-05

### 2026-05-30 | COMPILE
- `2026-05-30 | COMPILE | repomix HKUDS/LightRAG → wiki/Github/repos/HKUDSLightRAG.md` | 知識圖譜增強 RAG，5 種查詢模式，Gemini 支援，結論：補充 gbrain 專題問答（不取代）
- `2026-05-30 | COMPILE | repomix rohitg00/ai-engineering-from-scratch → wiki/Github/repos/rohitg00ai-engineering-from-scratch.md` | 20 phase AI 工程課程，2722 檔，Phase 13–16（MCP/Agent/Claude Code Permission Modes/Swarm）最值得選讀
- `2026-05-30 | COMPILE | repomix karpathy/autoresearch → wiki/Github/repos/karpathyautoresearch.md` | 8 檔案極小 repo，AI agent 自主做 LLM 訓練研究，結論：需 NVIDIA GPU，非日常工具；program.md skill 設計哲學值得借鑒
- `2026-05-30 | COMPILE | repomix activeloopai/hivemind → wiki/Github/repos/activeloopaiHivemind.md` | 分析跨 Agent 共享記憶系統（405 檔，356K tokens），結論：不推薦獨立開發者（全量上雲 + 功能重疊 + 無團隊）；加入 Repo 整理索引表
- `2026-05-30 | COMPILE | pip install liteparse → wiki/Tools/liteparse.md` | repomix 分析 run-llama/liteparse，建立工具文件（CLI/Python API/支援格式/使用場景）；同步新增 _index.md Tools 區塊，計數 149→150
- `2026-05-30 | COMPILE | karpathy/autoresearch program.md → wiki/Claude/Karpathy program.md Skill 設計哲學.md` | 六個 agent 可靠工作原則，含品味量化 if-then、CAN/CANNOT、checkpoint 設計

### 2026-05-26 | 系統建置
- `2026-05-26 | SETUP | — → wiki/log.md` | 依 Karpathy LLM Wiki 模式建立 append-only 日誌；同步更新 CLAUDE.md workflow、_index.md 計數（19→149）

### 2026-05-26 | COMPILE
- `2026-05-26 | COMPILE | @Mnilax X 文章 → wiki/Claude/18個改變一切的 Claude Code Settings.md` | 依文章逐一套用 18 個設定，實際修改 user-level 與 project-level settings.json，記錄完整變更清單與細節說明
- `2026-05-26 | COMPILE | github.com/ruijayfeng/ziwei → wiki/Github/repos/ruijayfengziwei — 現代化紫微斗數命盤分析工具.md` | 安裝紫微斗數 Web App（d:\Claude\ziwei），記錄安裝步驟、技術棧、AI 設定方式
- `2026-05-26 | COMPILE | github.com/Renhuai123/ziwei-doushu → wiki/Github/repos/Renhuai123ziwei-doushu — 倪海夏天紀體系紫微斗數引擎.md` | repomix 分析，識別 4 個高價值資產（patterns.ts/古籍/名人命盤/51.8萬樣本），制定 enhancement 路線圖
- `2026-05-26 | COMPILE | github.com/itsfatduck/optimizerDuck → wiki/Github/repos/itsfatduckoptimizerDuck — Windows 系統最佳化工具.md` | repomix 分析，WPF/.NET 10 Windows 優化工具，30+ 調整項+內建工具+完整復原機制，附 10 個 AI coding skills
- `2026-05-26 | COMPILE | github.com/multica-ai/andrej-karpathy-skills → wiki/Claude/Karpathy 最高遵守原則 — AI 行為準則.md` | 設為最高遵守原則，套用至 CLAUDE.md，建立 /karpathy-audit 命令，附首次合規審查記錄（✅ 合格）

### 2026-05-08 | /compile（回溯補記）
- `2026-05-08 | COMPILE | raw/notebooklm/ → wiki/水球流軟體設計模式精通之旅/` | 水球軟體學院課程 42 支影片全數轉錄並 compile；建立 17 篇概念文章（策略/樣板/責任鏈/觀察者/指令/狀態/門面/裝飾者/轉接器/工廠方法/OCP/DIP/OADP/OOA/OOD/整潔架構/課程總覽）

---

## 使用說明

每次操作後，在對應月份下追加一行：

```
- `YYYY-MM-DD HH:MM | COMPILE | raw/sources/檔名.md → wiki/分類/文章名.md` | 簡短備註
- `YYYY-MM-DD HH:MM | QUERY | 問題關鍵字 → output/queries/日期_標題.md` | 補充來源
- `YYYY-MM-DD HH:MM | LINT | wiki/ → output/lint_日期.md` | 發現的問題摘要
```
