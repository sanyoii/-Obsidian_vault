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

### 2026-07-30 | COMPILE
- `2026-07-30 19:40 | COMPILE+LINT | Examiner Vol3 對讀 + Fable 5 全套審查 + 11 項必修修正` | **Vol 3 對讀**（91,635 字元／14 節／18 實例／22 組對讀）：Examiner 認定的季末淨槓桿三季數字、守住「不觸及 SFAS 140」的分寸、CEX 對應 12 條檢查清單；**Fable 5 審查**以讀者畫像為唯一標準找出 11 項必修，編排者逐項親驗後全數確認為真並修正：①**教材 M5/M6 對照表仍寫「尚未製作」且零連結指向兩本已完成的精修版**（我的錯，對照表寫在手冊產出前未回頭更新）→ 改為節次對照＋13 個連結；②FX② 無套利證明實為 1.5057 而非 1.5061（原件用 Act/360）→ 補日計基礎說明；③FX② even swap 折現率誤用兩腿價差 1.7%（應為完整利率約 7%）；④FX② pay/earn 第 3 列理由與自身規則矛盾、例 B 缺結論；⑤⑥**四冊 header 的 PDF 區間全錯**（實測原件印刷頁 +4 = PDF 頁）→ 全部改正並標明換算；⑦FX① 總結對應頁 p.38→p.33；⑧Repo 手冊 Act/360 差額 $6,460→$14,600；⑨**Repo 手冊「技術上它符合準則」超出 Examiner 認定範圍**（報告明言 does not reach）→ 改為「沒有認定違反 ≠ 認定符合」；⑩Repo 手冊槓桿例把兩季申報值錯配成單季前後對照→ 換成 Examiner 三季認定表；⑪FX② 小數點勘誤；_index 399→401
- `2026-07-30 17:20 | COMPILE | raw/sources/lehman-manuals/LBEX-DOCID-688141（全 32 頁）→ wiki/Quant-Trading/雷曼信用風險報表手冊-中文精修.md` | 教材 M6 的原文層；**派工 agent 兩度被 API 錯誤中斷（500 後 529）且都未寫到檔，改由編排者親自下場**（R12：不藏失敗）；42,534 字元／13 節／21 實例／35 處 ⚠️／連結 6-6 存活；⚠️ 標出原件 9 處結構性問題，其中三條最實質：CVA 兩團隊算出不同答案而解法是調整 P&L（沒說以誰為準、無差異閾值、未要求查因）、Daily Excess Report 原文把「提高額度」列在「中止交易」之前（＝Danske 案「合規不能停業務」的機制層原始碼）、「自己被降評要補多少擔保品」只是每月送 Treasury 的報表而不在 CRO 日報（CRO 每日看的是「別人被降評」）；**⭐ 最重要發現：`Repo 105` 出現在這份 2007-11 手冊 §6.2 作為例行揭露差異項，證明該做法當時已在制度內運行**（但明確標註「被文件化≠合規」，判斷留給 Vol 3）；末章給 9 個可拿去 Examiner Report 查核的問句；_index 398→399
- `2026-07-30 16:10 | COMPILE | raw/sources/lehman-manuals/LBEX-LL-1175483-1175553（全 71 頁）→ wiki/Quant-Trading/雷曼Repo手冊-中文精修.md` | 派 opus subagent 產出（該 agent 寫檔後被 API 500 中斷在驗收階段，**編排者親驗檔案完整非截斷**：104,110 字元／17 節／23 實例／73 處 ⚠️／正常收尾／反向連結 5/5 存活／HEAD 未動無越權 commit）；教材 M5 的原文層，全十一節覆蓋；agent 在原件中標出 16 處實質缺陷，最有價值的三條：haircut 兩種口徑混用且從未定義、殘餘風險七項只涵蓋兩項半而缺的 wrong-way risk 正是雷曼死因、**LBI/LBIE 法域區分僅靠 Excel 標色而三年後成為 Repo 105 的伏筆**；另量化原件篇幅配置（「Repo 是什麼」21%／「成交之後怎麼辦」62%）佐證「教科書只講前三步」；_index 397→398
- `2026-07-30 15:30 | COMPILE | wiki/Quant-Trading/投行金流與反洗錢-自學教材.md（增補）` | 使用者要求「每章除原件位置外也要標明精修版何處可找到」；六個模組的「一手文件」區塊全部改為**「一手文件 × 精修版對照」三欄表（主題｜原件頁｜精修版章節）**，M1-M4 逐列指到精修 ①②③④ 的具體節次（含各節的加值內容與已標出的原件錯誤），**M5 Repo 與 M6 信用風險報表尚無精修版者以 callout 明確標「待製作」並給替代路徑，不留白**；開頭新增「三層結構」表（教材＝為什麼重要／精修版＝完整中文內容／原件 PDF＝一手引用）與「不確定查哪層時先去精修版」的導航原則；附錄 B 由兩欄升級為三欄並附精修版進度表（4 冊完成／4 項待做）；全檔 9 個 wikilink 實測存活；字元數 65,383
- `2026-07-30 14:50 | COMPILE | raw/sources/lehman-manuals/LBEX-LL-3356480-3356609(p.94-130) → wiki/Quant-Trading/雷曼FX手冊-中文精修-04-外匯選擇權.md` | **精修系列第四冊，FX 手冊 130 頁全部完成**；17 個實例區塊、33,568 字元（系列最長）；加值：把「波動率是合約唯一未指定參數」提為理解選擇權的樞紐、**完整重建 gamma 避險 P&L 表（買選擇權$200→四次再避險→到期作廢卻淨賺$925），證明實現波動>隱含波動時不論方向都獲利**、點出 theta 收最多處即 gamma 風險最大處為數學恆等式、vega 一節突出「避險動作自身會移動市場」的市場衝擊兩難、reverse knock-out 用「賺最多處即離死最近處」概括並解釋 delta −300% 的實務意義、barrier 觸發連鎖單與 CEX 連環清算同構（可直接用於 M13 面試映射）、收掉 ② 留下的 risk reversal 伏筆；**抓到原件兩處新錯誤：p.106 稱 long gamma 需「買高賣低」（其自身例子與 p.108 均證應為賣高買低）、p.110 rho 公式分母誤植為波動率**；反向連結 6/6 實測存活；_index 396→397
- `2026-07-30 14:05 | COMPILE | raw/sources/lehman-manuals/LBEX-LL-3356480-3356609(p.69-93) → wiki/Quant-Trading/雷曼FX手冊-中文精修-03-換匯交易.md` | 精修系列第三冊（FX Swaps 全段）；12 個實例區塊；加值：把 swap 定位成「賣時間不賣方向、把匯率風險換成利率差風險」、指出 T/N 是唯一近端早於 spot 的 swap 故為明天資金缺口的唯一解（回扣 ② 的 funding 節）、把 bid-offer 推導濃縮成兩條公式並點明與 ① cross rate「最寬 spread」同源（同一原理第三次出現）、加減給三種判斷法並說明三者不一致即為算錯（內建驗算機制）、日圓題點出跨市場搬公式不換單位的陷阱；**抓到原件一處數字顛倒誤植（7.2432 寫成 7.2342，其自身算式可證）**；反向連結 5/5 實測存活；_index 395→396
- `2026-07-30 13:20 | COMPILE | raw/sources/lehman-manuals/LBEX-LL-3356480-3356609(p.38-68) → wiki/Quant-Trading/雷曼FX手冊-中文精修-02-遠期外匯.md` | 精修系列第二冊（FX Forwards 全段）；**依新體例每節帶實例，20 個 [!example] 區塊、密度為第一冊兩倍**；加值：利率平價無套利證明逐步展開＋套利四步驟實例、**實測原件線性近似公式與精確法差 4.4 點並解釋原因**、pay/earn points 的一句話自檢法（取代死背）、end-to-end rule 用 2/28→6/30 反例說明、futures vs forward 點出保證金追繳才是企業避險失敗主因、even swap 產生 65 萬 spot equivalent 曝險的成因與對沖、Eurodollar 曲線「方向不是理由、定價錯誤才是」並延伸到永續合約資金費率；反向連結 5/5 實測存活；_index 394→395
- `2026-07-30 12:45 | COMPILE | londonblackcat.substack.com 23 篇 → wiki/倫敦黑貓/（6 檔）+ skill london-blackcat` | 使用者要求「比照旺來幫Jane方式處理全部文章」；派 3 個 opus subagent 並行萃取（暗流 7 篇／交易實務+市場結構 8 篇／職場文化+生活隨筆 8 篇），編排者親跑驗收：5 檔規模 14.9k–35.6k 字元、章節數 6–12、可信度標記 290 處、**17/17 反向連結實測存活 0 dead**、HEAD 未動無越權 commit；skill 依 SOP 雙位置同步（infra/skills-backup + ~/.claude/skills，比照 jane-finance 不進 marketplace）並實測熱載生效；agent 抓出原文三處問題（035 未實際拆解 wheel strategy 故機制標為編輯補充、FINRA 融資餘額前言內文矛盾、三星 2026Q2 數字疑誤植）
- `2026-07-30 12:20 | COMPILE | raw/sources/lehman-manuals/LBEX-LL-3356480-3356609(p.1-37) → wiki/Quant-Trading/雷曼FX手冊-中文精修-01-即期外匯.md` | 使用者要求「雙母語且精通金融的角色把 PDF 材料翻成中文」；材料實況 4,338 頁/990 萬字元，逐頁直譯不可行且三份手冊為掃描 OCR（WHAT→WJ-IAT、OTM→OTlvf 等實錯），改採全節覆蓋的中文精修版；本冊涵蓋 FX Spot 全段；**使用者回饋「金融小白需要實際例子」後補 10 個零基礎實例區塊（22,877→29,286 字元），此體例定為後續各冊標準**；標出原件兩處錯誤；使用者拍板 Examiner 九冊只做 Vol 1(Risk)+Vol 3(Repo 105)、手冊一次一冊確認後再推進
- `2026-07-30 12:05 | COMPILE | wiki/Quant-Trading/lehman-brothers-trading-manuals.md + 5 篇洗錢案原文 → wiki/Quant-Trading/投行金流與反洗錢-自學教材.md` | 使用者要求「整理分析後建立教材」；13 模組自學課程（Part1 前台 M1-M6／Part2 洗錢五案 M7-M11／Part3 貫穿失效模式 M12／Part4 CEX 面試映射 M13），每模組白話先行→機制→為什麼重要→一手 PDF 頁碼→自測題；**Examiner Report 九冊已補抓**（42MB／4,105 頁，pypdf 逐冊驗頁數與首頁法院抬頭），原 manuals 筆記 §④ 由「尚未下載」更新為完整頁數對照表；附四類中英詞彙表、一手文件查詢導航、可信度分級（一手可引用／二手數字須回 DOJ-FCA-NYDFS-FinCEN-OCCRP）；_index 386→387
- `2026-07-30 11:20 | COMPILE | raw/sources/2026-07-30_lehman-trading-manuals-leak.md → wiki/Quant-Trading/lehman-brothers-trading-manuals.md` | 倫敦黑貓 Substack 文章入庫；defuddle 對 Substack SPA 失效（`documentElement is null`）→ 改 curl + regex 抽 body markup；**三份雷曼一手手冊 PDF 已下載至 `raw/sources/lehman-manuals/`（共 11.5MB）並以 pypdf 驗證頁數與 TOC**（FX 130 頁 / Repo 71 頁 / Credit Risk Reporting 32 頁），wiki 內容以真實 PDF 目錄為骨架而非文章轉述；Examiner Report 九冊（約 37MB，menu.html 內第二層連結）尚未下載；raw/sources 未逐字存原文——vault 為 public repo，逐字轉存他人 Substack 全文等同公開轉載，改存來源記錄；附來源站可信度評估（23 篇全免費、事實抽查全對但幾乎零引用、作者匿名、量產管線跡象）；_index 385→386；反向連結 3 檔實測皆存在（2026-polymarket-quant-math-roadmap / ai-24h-risk-monitoring / 旺來幫Jane/_index）

### 2026-07-17 | COMPILE
- `2026-07-17 07:15 | COMPILE | github.com/openai/codex-plugin-cc → wiki/Github/repos/openai-codex-plugin-cc.md` | repomix 分析（62 檔 / 96K tokens）；OpenAI 官方 Codex-in-Claude-Code plugin，Apache-2.0，純 Node ESM 零依賴；`/codex:review`+`adversarial-review`+`rescue`+`transfer`+`status/result/cancel`；透過 Codex app-server protocol；結論 ✅ 適合安裝（環境已裝其 codex-rescue subagent/skill，正是上游來源）

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
