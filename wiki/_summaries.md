# 文章摘要總覽

> 最後更新：2026-07-10

---

## [[Claude/clone-fable5-into-opus48|Clone Fable 5 into Opus 4.8 — 強模型行為蒸餾備份法]]
**標籤：** `#claude` `#model-distillation` `#prompt-engineering` `#weak-model-governance`
**摘要：** Newsletter 教學文（有訂閱導流成分，教學內容本身可用）。背景：2026-07-12 起 Fable 5 離開付費訂閱改按量計費（$10/$50 per M tokens，恰為 Opus 4.8 兩倍；與 vault 內 fable5-mastery 記載的 07-07 日期矛盾，以官方帳單頁為準）。核心方法「brain backup」四步：①用精心設計的 prompt 叫 Fable 5 把思考習慣寫成「給接替者的第二人稱命令式常備指令」，涵蓋 10 領域（意圖解讀/問題拆解/力氣配置/驗證/已知vs猜測標記/自我攻擊/完整性/拒絕瞎猜/交付順序/假能力10樣態），格式強制 trigger-action「見X做Y」、零判斷可執行、附抓錯範例、結尾發送前檢查閘門 ②存檔 ③貼進 Claude Projects instructions 配 Opus 4.8 ④陷阱題驗證（連環折扣 30%+20%≠50%，實為44%——素模型順著念、裝備版該重算抓錯）。附 7 條 prompt 工具箱（Brain Backup/Trap Test/Fix-It/Shrink-It/Make-It-Mine/Repeat-Task Interview/Health-Check 月度指令複述）。與本環境對照：本質＝docs/institution/ 弱模型治理的消費者版（零新增量但驗證方向）；真正值得偷的是「陷阱題行為驗收測試」（institution 缺）與「Health-Check 指令漂移檢測」。
**來源：** Hamza（@humzaakhalid）newsletter，使用者貼原文（無 URL）
**建立：** 2026-07-10

---

## [[Claude/loop-engineering-karpathy-method|Loop Engineering — Karpathy Method 與 Bilevel Autoresearch]]
**標籤：** `#claude-code` `#agent-design` `#loop-engineering` `#karpathy`
**摘要：** 解讀文，講「loop」（目標導向、AI 自我反覆直到達標）與一問一答式 prompt 的本質差異。Loop 三要素：verifier（沒有真檢查就只是 agent 自己說自己對）、state（記錄已試過什麼，否則每輪重犯同樣錯誤）、stop condition（達標或碰到嘗試上限就停）。附「你是否真的需要 loop」四項自測：任務至少每週重複、驗證可自動化、token 預算撐得住浪費、agent 有真工具——四者缺一就不划算。核心案例是 Karpathy 2026年3月發布的 AutoResearch repo（train.py/prepare.py/program.md 三檔案、630行），一個月破 6.6萬星，人類只寫 program.md、agent 跑700次實驗找到20項連 Karpathy 自己都漏掉的優化（如 attention 裡漏乘的 scalar）；Shopify CEO 用它一晚讓內部模型品質提升19%、體積砍半。一個可運作的 loop 由五部件組成：Automation（心跳）、Skill（知識累積）、Sub-agents（寫的人與檢查的人分開）、Connectors（能實際動作）、Verifier（真正的關卡）。之後兩位研究者發表 Bilevel Autoresearch，在 inner loop 外疊加 outer loop（觀察 inner loop 卡在哪、生成新程式碼改變其搜尋方式），同一顆 LLM 就讓 GPT 預訓練 benchmark 進步 5 倍（非 5%）。文末誠實承認 loop 不解決的兩個問題：comprehension debt（理解負債，跑得越順欠得越多）與 cognitive surrender（認知投降，懶得再形成判斷）——同一個 loop 動作，用在深度理解的工作上加速、或用來逃避理解工作本身，結果完全相反，loop 本身分不出差別。
**來源：** 使用者貼原文（無 URL/平台）
**建立：** 2026-07-10

---

## [[Claude/fable5-mastery-leader-mode-workflows|Fable 5（Claude Sonnet 5）駕馭全攻略 — Leader 模式與五大變現工作流]]
**標籤：** `#Fable5` `#ClaudeCode` `#Agent編排` `#Skill設計` `#Leader模式`
**摘要：** 教學文，核心是把 Fable 5（Claude Sonnet 5）從「執行工人」升級為「團隊領導者」。五大超能力：長任務不失焦（18,000 行遷移單次 3 小時完成）、電腦視覺理解強、交付成品而非答案、讀寫筆記檔案持續變聰明、天生適合帶團隊。Leader 模式：用 Matt Pocock's skills collection 規劃、Opus/Codex worker 分工執行（`.claude/agents/` 各司一個 lane）、Fable 審核每個成果、verifier 二次確認不自評。三大秘訣：(1) 不過度引導——只給目標+限制+原因，禁止要求展示推理過程（觸發安全過濾降級）或顯示剩餘 token（誘發提早收工），(2) CLAUDE.md 保持輕量（專案簡介/常用指令/常犯錯誤三段即可），(3) 善用 `/goal` 與排程 loop，終點線要求可視證據+煞車（"stop after N turns"，否則有案例單一 prompt 燒到 $960）+誠實條款。附一鏡到底 landing page 範例五步驟，以及五個能賺錢的工作流（巨型 codebase 遷移/深度研究/常設 orchestrator/參考驅動前端/知識庫建置）。時效提醒：Fable 已於 2026-07-07 離開 Claude 訂閱制、改按用量付費。
**來源：** 使用者貼原文，教學文（無 URL）
**建立：** 2026-07-08

---

## [[Career/2026-ai-engineer-no-cs-degree-path|2026年無CS學位成為AI工程師的完整路徑]]
**標籤：** `#AI工程師` `#職涯` `#技能路線圖` `#RAG` `#Agent` `#求職策略` `#自學` `#證明`
**摘要：** 完整的AI工程師自學路徑，針對無CS學位人士。核心論點：學位不再是入場券，**證明**才是。內容包括：(1) 為何舊路徑失效（AI工具縮小概念與實踐距離），(2) 2026年AI工程師定義（系統建造者，非ML研究員），(3) 九步驟技能堆疊（Python→SQL→Git→API→Embeddings→RAG→Agent→部署→開發工具），(4) 三個能被雇用的專案（RAG應用、工具型Agent、部署產品），(5) 結構化Tutor提示與逐行講解方法，(6) 求職策略（公開建造、開源貢獻、直接outreach、自由接案），(7) 三個專業方向賽道（RAG系統/Agentic系統/AI產品工程），(8) 入職前六個月實態，(9) 五項常見失敗模式，(10) 90天計畫（基礎期→兩個專案→部署曝光）。包含兩個完整英文Claude Tutor提示與outreach email模板。
**來源：** 使用者貼原文，作者未提供
**建立：** 2026-07-07

---

## [[Claude/2026-claude-code-repo-structure-final-boss|Claude Code 的終極挑戰：Repository 結構設計（Final Boss Setup）]]
**標籤：** `#Claude-Code` `#Repo結構` `#CLAUDE.md` `#Hooks` `#Skills` `#Agent設計` `#Context-Hierarchy`
**摘要：** 通過分析頂層 Claude Code 使用者的共同發現，闡述「瓶頸不是模型而是 repository 結構」核心論點。七大設計原則：(1) Context Ladder 四層載入時機（全局 CLAUDE.md/路徑觸發 rules/按需 skills/獨立 agents），(2) ASKED vs FORCED 區分請求型指令（90%執行率）與強制型 hooks（100%保證），(3) Routing Rule 將重複任務分為 Research/Procedure/Guarantee 三類，(4) Path Gating 自動載入該領域規則，(5) Agent Memory Git 版本管理 AI 學習成果，(6) 危險目錄位置特定 CLAUDE.md 及時警告，(7) 四大實戰 Golden Rules（200 行上限/實際指令/環境變數/Git 管理）。結論：結構改善所有對話，是「擁有」而非「借用」AI 智能的方式。
**來源：** 使用者貼原文
**建立：** 2026-07-07

---

## [[Self-Media/2026-ai-agent-team-zero-code-guide|零代碼 AI Agent 團隊建置完全指南]]
**標籤：** `#AI-Agent` `#Claude` `#Cowork` `#零代碼` `#自媒體工具` `#工作流自動化`
**摘要：** 完整教學如何用 Claude Desktop + Cowork 零代碼建立 AI Agent 團隊。內容涵蓋四大組件（Role 角色/Instructions 指令/Tools 工具/Memory 記憶）、五步驟建置內容研究 Agent、4-Agent 內容製作流水線（Research→Outline→Writer→Editor，30分鐘內完成文章）、進階技巧四項（排程自動化/context.md 一致性/回饋迴圈/多步驟工作流）、三套預設團隊範本（商業智能/客戶研究/社群媒體）。強調 Agent 的核心價值在於委託而非親力親為。
**來源：** @eng_khairallah1（X）
**建立：** 2026-07-07

---

## [[Quant-Trading/2026-polymarket-quant-math-roadmap|2026年量化交易完整數學學習地圖]]
**標籤：** `#量化交易` `#Polymarket` `#概率論` `#Black-Scholes` `#演算法交易` `#衍生品定價` `#金融數學`
**摘要：** 完整的宽客（量化交易員）學習路線圖，涵蓋七個核心領域。第1-5章逐步建立數學基礎（概率論→統計學→線性代數→微積分→隨機微積分），包含凱利公式、貝葉斯定理、Black-Scholes模型、希臘字母等。第6章講解Polymarket的LMSR（自動做市商）與CLOB（中央限價訂單簿）機制。第7章介紹四大核心角色、頂級機構薪資（$300K-$500K+入門級）與完整工具箱（Python/C++/Rust）。包含15門推薦教科書、課後習題與編程練習。
**原作者：** @gemchange_ltd  
**編譯者：** Mr.RC (@insidersdotbot)
**建立：** 2026-07-07

---

## [[Quant-Trading/ai-24h-risk-monitoring|AI 24 小時盯盤——普通人可用的機構級風控四層架構]]
**標籤：** `#quant` `#風控` `#AI應用` `#交易系統`
**摘要：** 機構級風控的護城河不是「AI 比人聰明」，而是「永遠在線＋不可臨時更改的硬規則」。四層架構：實時監控（填補注意力空檔）、異常檢測（假警報減四到六成、命中率保 99%）、硬編碼熔斷線（冷靜時定死、AI 不得臨場改）、壓力測試（「集體跌 20% 會怎樣」）。三個零代碼落地動作＋三大局限（極端行情 AI 最不可靠、警報疲勞、風控是護欄非自動駕駛）。背景數據：2026 年美股 60–70% 交易由 AI/演算法完成。
**來源：** 使用者提供（作者/平台不明，簡體財經科普文）
**建立：** 2026-07-10

---

## [[Claude/Command Center Plugin — Obsidian 指揮中心|Command Center Plugin — Obsidian 指揮中心]]
**標籤：** `#Claude` `#系統` `#obsidian` `#automation` `#plugin` `#dashboard`
**摘要：** 自製 Obsidian Plugin（v3）。5 個 Ribbon 按鈕 + 主內容區 Dashboard Tab。Dashboard 為 2×2 grid：GitHub Trending（點擊 repomix 分析→wiki）/ Hacker News（點擊開原文）/ Product Hunt Daily（GraphQL API）/ Lobsters Hottest（免認證 JSON）。資料橋接腳本 fetch-dashboard-data.ps1 彙整四大來源 + 職缺/社群/token 估算到 dashboard.json，Plugin 每 30 秒自動刷新。字型使用 Obsidian CSS 變數。
**最後更新：** 2026-06-03（v3）

## [[Claude/Obsidian Dashboard 路線圖|Obsidian Dashboard 路線圖]]
**標籤：** `#Claude` `#系統` `#obsidian` `#dashboard` `#roadmap`
**摘要：** Phase 0–4a 全部完成（2026-06-03）：Ribbon ✅、Bases ✅、Plugin Panel 2×2 grid ✅、Google Calendar ✅、Email Brief ✅（Emergency/High/Med/Low 四級，todo 萃取，略過 newsletter）。Phase 4b 待做：職缺操作/Careerbot/社群趨勢/Token 精確版。
**最後更新：** 2026-06-03（Phase 4a Email Brief 完成）

---

## [[Github/repos/Madison-de-Chao-rainbow-sanctuary-report-site — 命理解讀報告銷售落地頁|Rainbow Sanctuary — 命理解讀報告銷售落地頁]]
**標籤：** `#nextjs` `#landing-page` `#ziwei` `#astrology` `#human-design` `#reference`
**摘要：** Next.js 15 單頁網站，銷售《全方位命理解讀報告》（紫微×八字×占星×人類圖，以「人生羅盤」為中樞）。三階定價 1680/2880/3980，內容全部 `data/*.json` 驅動。非排盤引擎，純行銷落地頁，與「命運羅盤」專案主題高度重疊，頁面架構可參考。
**來源：** https://github.com/Madison-de-Chao/-
**建立：** 2026-06-12

---

## [[Github/repos/itsfatduckoptimizerDuck — Windows 系統最佳化工具|optimizerDuck — 免費開源 Windows 系統最佳化工具]]
**標籤：** `#tool` `#windows` `#optimization` `#wpf` `#dotnet`
**摘要：** 免費開源 Windows 優化工具，30+ 個調整項（效能/隱私/GPU/電源/Bloatware/UX），每項附風險評級，全部可一鍵復原。WPF/.NET 10，不需安裝直接跑 exe。內附完整 Claude Code/Codex/Gemini 開發 skills（10 個），.resx 本地化含繁中。
**來源：** https://github.com/itsfatduck/optimizerDuck
**建立：** 2026-05-26

---

## [[Github/repos/Renhuai123ziwei-doushu — 倪海夏天紀體系紫微斗數引擎|Renhuai123/ziwei-doushu — 倪海夏《天紀》體系排盤引擎]]
**標籤：** `#ziwei` `#astrology` `#nextjs` `#dataset` `#enhancement-target`
**摘要：** 倪海夏《天紀》體系 Next.js 紫微斗數 App，最大價值：1100+ 行格局知識庫 patterns.ts、三部古籍原文（骨髓賦/全集/全書）、名人命盤資料庫、51.8 萬條命盤樣本數據（5.5GB，可 RAG/fine-tune）。與 ruijayfeng/ziwei 互補，enhancement 路線圖已列出。
**來源：** https://github.com/Renhuai123/ziwei-doushu
**建立：** 2026-05-26

---

## [[Github/repos/ruijayfengziwei — 現代化紫微斗數命盤分析工具|紫微知道 — 紫微斗數命盤分析工具]]
**標籤：** `#tool` `#ziwei` `#astrology` `#react` `#installed`
**摘要：** React 19 + TypeScript + Vite 的紫微斗數 Web App，本機已安裝於 `d:\Claude\ziwei`，`npm run dev` 跑在 localhost:5173。功能含精準排盤（iztro）、AI 命盤解讀（支援 Claude/DeepSeek/Gemini）、年度運勢、雙人合盤、人生 K 線、分享卡片。
**來源：** https://github.com/ruijayfeng/ziwei
**建立：** 2026-05-26

---

## [[Claude/Karpathy 最高遵守原則 — AI 行為準則|Karpathy 最高遵守原則 — AI 行為準則]]
**標籤：** `#claude-code` `#principles` `#karpathy` `#guidelines`
**摘要：** 來自 Karpathy 對 LLM 編程行為觀察的四原則：思考在前、簡潔優先、精準修改、目標驅動執行。已套用至 CLAUDE.md（最高優先級）、建立 /karpathy-audit 定期審查命令。2026-05-26 首次合規審查結果：✅ 合格。
**來源：** https://github.com/multica-ai/andrej-karpathy-skills
**建立：** 2026-05-26

---

## [[Claude/18個改變一切的 Claude Code Settings|18 個改變一切的 Claude Code Settings]]
**標籤：** `#claude-code` `#settings` `#configuration` `#permissions` `#hooks`
**摘要：** 依 @Mnilax 文章逐一檢查並套用的 18 個設定：新增 permissions.deny（.env/secret/rm -rf/sudo 保護）、cleanupPeriodDays 180、branch-aware SessionStart hook、model 顯式指定、mcpServer enabled flag；附 cache_control 正確寫法與 API/Console 設定說明。
**來源：** @Mnilax on X — "18 Claude settings that change everything"
**建立：** 2026-05-26

---

## [[Claude/知識庫操作手冊|LLM 知識庫 — Claude Code 操作手冊]]
**標籤：** `#Claude` `#系統` `#操作手冊`
**摘要：** Vault 的 LLM 編譯器角色說明、raw/ 目錄結構、五個指令（/compile /query /lint /slide /search）與知識迴圈架構。
**來源：** CLAUDE.md
**建立：** 2026-05-08

---

## [[Claude/Claude環境操作手冊|D:\Claude 環境操作手冊]]
**標籤：** `#Claude` `#系統` `#環境` `#Skills` `#Ruflo`
**摘要：** D:\Claude 個人 Claude Code 環境完整文件：76 Skills 架構、Ruflo 多 Agent 指令、子專案（Open Design/AI Cloner/AutoHedge）、日常維護與重要路徑。
**來源：** D:\Claude\CLAUDE.md
**建立：** 2026-05-08

---

## [[課程總覽|課程總覽]]
**標籤：** `#課程` `#索引`
**摘要：** 水球軟體學院「軟體設計模式精通之旅」完整章節地圖，白段（Ch1-5）與黑段（Ch6-10）道館全覽。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[水球流OADP|水球流 OADP]]
**標籤：** `#方法論`
**摘要：** 疊代式開發框架，OOA → OOD → OOP → Pattern 循環，把無形領域知識轉化為高維護性程式碼。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[物件導向分析|物件導向分析 (OOA)]]
**標籤：** `#方法論` `#OOA`
**摘要：** 不考慮實作，透過單句分析萃取領域知識：點的萃取（物件/類別/屬性）、線的萃取（關係/基數）。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[物件導向設計|物件導向設計 (OOD)]]
**標籤：** `#方法論` `#OOD`
**摘要：** 用循序圖「先求跑」、再用最小知識原則「再求好」（封裝、解耦、萃取），按需套用設計模式。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[開閉原則|開閉原則 (OCP)]]
**標籤：** `#SOLID` `#OCP`
**摘要：** 對擴充開放對修改封閉，但應視為「力量」而非教條，只在主概念重要且有大量擴充需求時套用。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[依賴反轉原則|依賴反轉原則 (DIP)]]
**標籤：** `#SOLID` `#DIP`
**摘要：** 套用八成設計模式的底層邏輯，重構三步驟：封裝變動 → 萃取介面 → 委派注入。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[整潔架構|整潔架構 (Clean Architecture)]]
**標籤：** `#方法論` `#架構`
**摘要：** 兩大方針：封裝變化（同變的放一起）+ 單向穩定依賴（易變依賴穩定）。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[策略模式|策略模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 處理「原始型」行為變動，外部動態注入演算法，OCP + DIP 的最直接實踐，入門模式。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[樣板方法|樣板方法]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 父類別定義流程骨架，子類別實作變動步驟，控制反轉 (IoC) 的最基礎體現。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[責任鏈模式|責任鏈模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 處理「輸入比對型」行為變動，多個 Handler 串鏈，請求沿鏈傳遞至對應處理者。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[觀察者模式|觀察者模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 處理「響應式行為」，主體狀態改變時廣播通知所有已註冊的觀察者，事件系統的原型。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[指令模式|指令模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 將指令封裝為物件，解耦「操作」與「能力」，天然支援 Undo/Redo。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[狀態模式|狀態模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 將物件各狀態的行為封裝為獨立類別，消滅龐大的 if/switch，是有限狀態機的 OO 實作。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[門面模式|門面模式]]
**標籤：** `#結構型` `#設計模式`
**摘要：** 提供簡單門面隱藏內部複雜度，是模組邊界劃分的核心工具。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[裝飾者模式|裝飾者模式]]
**標籤：** `#結構型` `#設計模式`
**摘要：** 物件組合動態疊加行為，解決繼承造成的「組合爆炸」，M 種功能不需要 2^M 個子類別。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[轉接器模式|轉接器模式]]
**標籤：** `#結構型` `#設計模式`
**摘要：** 解耦核心與外部依賴，讓介面不相容的類別合作，是 DIP 在外部依賴場景的具體工具。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[工廠方法|工廠方法]]
**標籤：** `#創建型` `#設計模式`
**摘要：** 將物件創建職責交給子類別，處理物件的生命週期約束，避免核心直接 `new` 具體類別。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[代理人模式|代理人模式 (Proxy Pattern)]]
**標籤：** `#結構型` `#設計模式` `#存取控制` `#延遲載入`
**摘要：** 在不修改既有程式碼前提下，透過實作相同介面的代理人物件控制 Client 對 RealSubject 的存取，常見三型：Virtual（延遲載入）、Protection（權限控管）、Remote（遠端存取）。
**來源：** 水球軟體設計模式課程 Lesson 43 逐字稿 + 挑戰題 6B
**建立：** 2026-06-29

---

## [[複合模式|複合模式 (Composite Pattern)]]
**標籤：** `#結構型` `#設計模式` `#樹狀結構` `#透明度`
**摘要：** 讓樹狀結構中的 Leaf 與 Composite 共同實作 Component 抽象介面，使 Client 能以統一方式操作單一物件或整棵子樹（Structure-Agnostic）；需在透明度與操作安全性之間做 Tradeoff。
**來源：** 水球軟體設計模式課程 Lesson 44 逐字稿 + 挑戰題 6C
**建立：** 2026-06-29

---

## [[單體模式|單體模式 (Singleton Pattern)]]
**標籤：** `#創建型` `#設計模式` `#全域變數` `#資源約束`
**摘要：** 將建構子設為私有，搭配靜態 `getInstance()`，保證類別在系統中只存在唯一實體。課程特別警告其全域變數本質容易被濫用為過度設計，須先確認創建成本或資源同步衝突等 Forces 真實存在才套用。
**來源：** 水球軟體設計模式課程 Lesson 45 逐字稿 + 挑戰題 9A
**建立：** 2026-06-29

---

## [[抽象工廠|抽象工廠 (Abstract Factory Pattern)]]
**標籤：** `#創建型` `#設計模式` `#產品一致性` `#工廠組合`
**摘要：** 將多次套用工廠方法後產生的多個工廠介面聚合成一個抽象工廠介面，強制同一組產品的實作保持一致，Client 只需切換注入的 ConcreteFactory 即可整組替換產品風格。
**來源：** 水球軟體設計模式課程 Lesson 47 逐字稿 + 挑戰題 9B
**建立：** 2026-06-29

---

## [[Christopher Alexander：設計模式 道館挑戰 - RPG|RPG 道館挑戰 — 多重設計模式實戰]]
**標籤：** `#實戰` `#道館挑戰` `#策略模式`
**摘要：** Ch 2 道館挑戰案例，要求以 Forces→Problem→Pattern 思路分析 RPG 戰鬥系統（進攻選項的行為變動性 vs 角色/選項擴充性），套用策略模式解決，是課程首次完整實戰演練。
**來源：** waterballsa.tw 道館挑戰原文
**建立：** 2026-05-13（編譯：2026-06-30）

---

## [[Tools/CodeWhale|CodeWhale — 開源 Terminal Coding Agent]]
**標籤：** `#AI` `#tools` `#coding-agent` `#terminal` `#rust` `#open-source` `#deepseek`
**摘要：** 開源終端 AI 編程代理（Rust），模型中立的 Claude Code 替代品。支援 25 個 provider（DeepSeek/Claude/GPT/GLM/Kimi/Ollama 等），功能含 Plan/Agent/YOLO 三模式、MCP 整合、多模態圖片輸入、Git-aware context。前身為 deepseek-tui，v0.8.62，MIT 授權。
**來源：** https://github.com/Hmbown/CodeWhale
**建立：** 2026-06-19

---

## [[Tools/free-claude-code|Free Claude Code — 本地 API 代理伺服器]]
**標籤：** `#AI` `#tools` `#proxy` `#claude-code` `#codex` `#free` `#llm` `#python`
**摘要：** 本地代理伺服器（Python），讓官方 Claude Code CLI / Codex CLI / VS Code 擴展的原生介面保持不動，透過中間人代理把 Anthropic API 請求轉發到第三方免費或便宜的模型供應商（NVIDIA NIM/OpenRouter/Gemini/DeepSeek/Ollama 等）。不是替代品或 fork，是 API 流量路由層。MIT 授權。
**來源：** https://github.com/Alishahryar1/free-claude-code
**建立：** 2026-06-19

---

## [[Github/repos/calesthio-OpenMontage|OpenMontage — 開源 Agentic 影片製作系統]]
**標籤：** `#AI` `#tools` `#video` `#production` `#agentic` `#remotion` `#open-source`
**摘要：** 第一個開源 Agent 驅動影片製作系統。自然語言描述影片需求後，AI coding agent 自動完成研究→腳本→素材生成→剪輯→配音→字幕→合成。支援多 provider（圖片：FLUX/DALL-E/Imagen；影片：Veo/Kling/MiniMax/Runway；配音：Piper/ElevenLabs/OpenAI TTS；音樂：Suno）。1,356 檔案，AGPLv3 授權。
**來源：** https://github.com/calesthio/OpenMontage
**建立：** 2026-06-20

---

## [[Github/repos/tw93-Pake|Pake — 網頁轉桌面 App 打包工具]]
**標籤：** `#tools` `#desktop` `#tauri` `#rust` `#webapp-wrapper` `#cross-platform`
**摘要：** Rust + Tauri 一行指令把任何網頁打包成跨平台桌面 App（macOS/Windows/Linux），產出約 5MB（Electron 的 1/20），記憶體佔用更低。含預製熱門 App（WeRead/ChatGPT/DeepSeek/YouTube Music 等）可直接下載，支援自訂 icon/CSS 注入/GitHub Actions 線上建置。35K+ stars，MIT 授權。
**來源：** https://github.com/tw93/Pake
**建立：** 2026-06-20

---

## [[Self-Media/2026-ai-video-production-guide|2026 AI 自媒體完全手冊 — Codex + HyperFrames + Remotion 一鍵出片]]
**標籤：** `#self-media` `#video-production` `#ai-tools` `#codex` `#remotion` `#hyperframes` `#automation`
**摘要：** 三個工具（Codex/Claude Code 當 AI 程式員、Remotion 代碼轉視頻、HyperFrames HTML 轉視頻）對應三條變現路線：講書號（門檻最低但剪映更適合）、帶貨混剪（FFmpeg+Python 複刻爆款，日產 30 條）、數據科普（Remotion 真正差異化，剪映做不到）。含完整提示詞模板、實測踩坑（Node v22/index.html/目錄路徑）、成本結構（$20/月+配音 4-8 毛/條）、中國 AI 標識法規（未標注最高罰 200 萬）。
**來源：** X @iluciddreaming（使用者貼原文）
**建立：** 2026-07-07

---

## [[Claude/multi-ai-task-card|多 AI 協作不斷片 — 用任務卡把 Claude/Codex/Cursor 接起來]]
**標籤：** `#多AI協作` `#任務卡` `#agent設計` `#狀態管理` `#工作流`
**摘要：** 多 AI 接力斷片的根因：聊天是時間線不是狀態機，「當前狀態」藏在聊天裡下一個模型只能猜。解法是把每個可交接任務壓成一張 AI Task Card——六節點流程（human request→working conversation→task card→execution place→artifact→writeback）、10 欄位最小卡（goal/boundary/context/current_state/artifact/acceptance/hard_gate/next_action/owner/updated_at，每欄防一種常見錯誤）。hard gate 清單（發布/資金/帳號/憑證/deploy/破壞性清理必停人類確認）；boundary 四分類（repo/artifact/system/decision_bound）防任務錯位。核心四句：對話推進、任務卡持狀態、產物證明、寫回接續。與本 vault 的 R17 契約表/7-Agent 工廠同構。
**來源：** Leo（X @runes_leo，使用者貼原文）
**建立：** 2026-07-10

---

## [[Quant-Trading/lehman-brothers-trading-manuals|雷曼兄弟內部交易培訓手冊 — 投行實務的一手教材]]
**標籤：** `#quant` `#外匯` `#選擇權` `#repo` `#信用風險` `#投行實務` `#一手文件`
**摘要：** 2008 雷曼倒閉後紐約破產法院任命 Examiner（Anton R. Valukas / Jenner & Block）調查，2010 年將九冊報告與 8,000+ 註腳引用的 supporting documents 上網，使三份「內部新人訓練＋desk operating manual」級文件進入公開領域（Stanford 保存副本）。① FX Training Manual 130 頁：FX Spot（left bid–right offer 規則、cross rate 兩種算法）→ Forwards（forward points、odd dates、positive carry）→ Swaps（swap points、T/N 做平部位）→ Options（Greeks、gamma hedging P&L 練習、exotic/barrier）；核心觀念是「交易的不是靜態 payoff 圖而是持續變化的風險因子」，且 forward 非未來匯率預測而是利率差 + 資金成本決定。② Repo Sales Reference Guide 71 頁：11 節含 Infinity 前台輸入系統與 MTS 主機指令；Repo 六大用途、完整生命週期 Quote→suitability→MRA/GMRA→credit limit→booking→collateral→settlement→MTM→margin call→close-out；抵押品不能取代信用風險管理。③ Credit Risk Reporting Procedures Manual 32 頁（v1.0, 2007-11）：parent/child 與 agent/principal mapping 是風險計算地基、CCE vs MPE 之分、風險管理大半是資料管理、Daily Excess Report 必須轉成行動。最有價值的讀法是手冊（應有流程）× Examiner 證物（實際行為）對讀找制度落差。三份 PDF 共 11.5MB 已下載至 raw/sources/lehman-manuals/ 並以 pypdf 驗證頁數與 TOC；Examiner 九冊約 37MB 尚未抓。附來源站可信度評估：事實抽查全對但幾乎零引用、作者匿名，可當詞彙表不可當引用來源。
**來源：** 倫敦黑貓 London Black Cat https://londonblackcat.substack.com/p/e7b ＋一手文件 https://web.stanford.edu/~jbulow/Lehmandocs/menu.html
**建立：** 2026-07-30

---

## [[Quant-Trading/投行金流與反洗錢-自學教材|投行金流與反洗錢 — 自學教材]]
**標籤：** `#教材` `#quant` `#AML` `#合規` `#外匯` `#選擇權` `#repo` `#web3`
**摘要：** 13 個模組的自學課程，核心命題是「不懂正常長什麼樣就看不出異常」，因此前台實務與洗錢結構必須一起學。Part 1（M1–M6，前台）：交易室語言（base/terms、left bid–right offer、cross rate 兩種算法、外匯無單邊部位）→ Forward 非預測而是利率差與資金成本（premium/discount、pay/earn points、carry、odd dates）→ Swap 作為全行幣別調度中樞（T/N 每日做平餘額，結構同型於 Repo）→ 選擇權交易的是變化中的風險因子而非靜態 payoff（Delta/Gamma/Theta/Vega、方向對仍虧錢的四條路、gamma hedging 成本、barrier 附近 Greeks 失控）→ Repo 真正的產品是現金抵押品資產負債表額度結算的整體管理（六用途、十步生命週期、haircut、wrong-way risk）→ 信用風險報表其實是資料工程（parent/child 與 agent/principal mapping 是地基、CCE vs MPE、報表必須轉成四選一的行動）。Part 2（M7–M11，後門）五種攻擊面：Wachovia 通匯銀行與 casa de cambio 混池（4,200 億美元未有效監控）、Danske 非居民組合與獎勵視而不見的結構（2,000 億歐元／2022 年 20 億美元和解）、德銀鏡像交易與 remote booking 責任真空（約 100 億美元／FCA 1.63 億英鎊＋NYDFS 4.25 億美元）、Troika 自建平行金融系統（75 家空殼、layering、假合約與合約取消費）、太子集團實體版（跑分→USDT→integration）與 Lazarus 鏈上版（盲簽、chain-hopping、追得到不等於追得回）。Part 3（M12）收斂出同一失效模式：異常都被看見了，但沒有任何一層擁有整個問題；給四個可遷移判準（沒有經濟目的的交易＝最強紅旗、行為畫像優於金額門檻、責任真空比惡意更常見、資料品質即風控上限）與手冊×證物對讀法。Part 4（M13）把每個傳統概念映射到 CEX/託管面試語言（entity mapping→地址簇、代理銀行信任鏈→Travel Rule、CCE/MPE→保險基金、Daily Excess→提幣風控、盲簽→託管簽核介面完整性），並指出 QA 背景的兩個切入角（介面與實際行為一致性、提幣狀態機）。附錄含四類中英詞彙表、一手文件查詢導航（哪個問題翻哪份手冊第幾頁）、資料可信度分級（一手手冊可直接引用；二手案例數字寫進正式文件前須回 DOJ/FCA/NYDFS/FinCEN/OCCRP 原始出處；起訴不等於定罪）。
**來源：** 一手——雷曼三手冊 233 頁 + Examiner Report 九冊 4,105 頁（`raw/sources/lehman-manuals/`）；二手——倫敦黑貓 Substack 五篇案例
**建立：** 2026-07-30

---

## [[Quant-Trading/雷曼FX手冊-中文精修-01-即期外匯|雷曼 FX 手冊 中文精修 ① 即期外匯]]
**標籤：** `#教材` `#中文精修` `#外匯` `#FX-Spot` `#一手文件`
**摘要：** 雷曼 Foreign Exchange Training Manual（Bates LBEX-LL 3356480-3356609）p.1–37 的中文精修版，依原手冊章節順序全節覆蓋。內容：outright 定義與 swap 的一腿/兩腿結構區分；四種交割慣例（cash 同日／tom +1／spot +2／forward，CAD spot 例外為 +1）；credit risk（等於重置成本，且因銀行認列 MTM 為收入而直接打到損益表）與 settlement risk（兩次交割不同步的 Herstatt 風險，對應 CEX 充提幣時序）；American vs European terms 與原件的算術寫法陷阱（原件寫 USD/EUR 指每歐元值多少美元，與現代市場相反）；匯率變動判斷規則（分子上升＝base 走強）與三題損益全解；pips/points 與跨市場不可直接比較；速算公式；bid-offer 與 spread 的內建虧損效果；left bid–right offer 三步判斷法與四題實戰；cross rate 同 terms 相除／不同 terms 相乘；cross 的 bid-offer 交叉規則（相除要交叉、相乘不交叉）與「最寬 spread」反推驗算法；反射速記口訣。加值：10 個為零基礎讀者寫的實例區塊（台灣公司付歐洲貨款、日圓 150→155 是升是貶、spread 是進場即虧、為何需要 cross rate 與美元作為 vehicle currency）、8 題自測、標出原件兩處錯誤（p.11 把 European terms 誤稱 American terms；算術寫法與市場慣例相反）。
**來源：** 一手 PDF `raw/sources/lehman-manuals/LBEX-LL-3356480-3356609_FX-and-Options-Training-Manual.pdf`
**建立：** 2026-07-30

---

## [[倫敦黑貓/_index|倫敦黑貓 London Black Cat 知識庫]]
**標籤：** `#index` `#AML` `#洗錢` `#合規` `#投行實務` `#倫敦金融城`
**摘要：** londonblackcat.substack.com 全部 23 篇文章（2026-07-01~07-29，皆免費）萃取成五個主題頁，體例比照旺來幫Jane（可信度分級 🟢🟡🔴 + 專屬 skill）。① 暗流-洗錢與地下金融（7 篇）：七案速查表、五種攻擊面交叉比較、以可觀測欄位為軸的紅旗速查（傳統銀行 14 條 + 鏈上託管 11 條）、AML 制度四個失效點（Alert Fatigue／Normalcy Bias／時間不對稱／追責在機構層停止）、cum-cum 與 cum-ex 稅差套利、灰產集團的理性資本配置邏輯、地下銀行從唐朝飛錢到兩地對敲到 USDT 的不變邏輯。② 交易實務與市場事件（4 篇）：選擇權市場下跌應對決策清單、Wheel Strategy 拆解與 7 條失效條件（機制為編輯補充，原文未拆解，已標明）、韓股融斷的指數集中×槓桿 ETF 再平衡因果鏈。③ 市場結構與金融產品（4 篇）：Private Credit 的槓桿暗處、足球豪門把未來收入證券化、唐提式養老金 Tontine 的歷史與現代復活、華爾街造詞史。④ 金融圈人物與職場文化（3 篇）：Alpha Male/Finance bro 類型學、挖角與 team lift-out 六條機制、八卦作為資訊流動機制、對求職者的實用啟示。⑤ 倫敦生活與隨筆（5 篇）：Monzo/Revolut/Wise 換匯四維對照與四個隱藏機制（safeguarding vs FSCS £120,000、AML 演算法凍結申訴差異、無 Section 75、商業模式決定推播動機）、倫敦生活成本、站台定位。核心紀律：學機制可靠本庫，引用數字必回一手（DOJ/FCA/NYDFS/FinCEN/OCCRP）；作者匿名故自述資歷一律 🔴；起訴不等於定罪。已抓出原文三處問題（035 未實際拆解 wheel strategy、FINRA 融資餘額前言與內文矛盾、三星 2026Q2 數字隱含 52% 營業利益率疑誤植）。
**來源：** https://londonblackcat.substack.com/ （23 篇）
**建立：** 2026-07-30
