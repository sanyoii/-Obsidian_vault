# 文章摘要總覽

## [[wiki/Claude/Codex子代理角色與來源|Codex 子代理角色與來源]]

**摘要：** 區分 Codex 內建、Agency-Agents、addyosmani 工程角色及五個本機自訂角色；17 個 Agency 類本機兩端本文相符，五個自訂角色安裝 hash 相符。原始匯入日期／操作者未確認，未啟動代理。
**建立：** 2026-09-29。

## [[wiki/Web3-基礎/區塊鏈與QA課程/00-課程入口|區塊鏈與 Web3 QA：20 週課程]]

**摘要：** 依 Python 基礎、不會 JavaScript、每週至少 6 小時規劃全面理解與 QA 主線。第 1 週涵蓋帳本、雙重支付、節點、驗證與共識，附 Python 順序實驗、課前診斷、作業、解答與補強門檻。後續 19 週尚為規劃。
**建立：** 2026-09-29。教材程式已執行與檢查，學習者尚未作答。

## [[AI-一人公司/一人旅遊公司 — 實作計畫|一人旅遊公司 — 實作計畫 v1]]

**摘要：** 核准計畫已在 D:/Codex/一人旅遊公司 完成本機初版，依追加授權建立本機 Git repo，未提交、推送或設定遠端。主模型負責整合與最終驗收，Luna 完成小包試作。63＋19 Python tests、3 Node tests、隔離套件與更新還原通過。12 個 AI 判讀情境首輪 11 Pass／1 Fail，補強後重測該題通過；最新結果混合兩版規則，不當成同版完整重測。新上下文可產示範與建置；真人、畫面、手機、PDF、真旅程、人工比較與第二趟基準尚未驗證。

## [[AI-一人公司/一人旅遊公司 — 架構與工作流程|一人旅遊公司 — 架構與工作流程 v2]]

**摘要：** 自用旅遊管家本機初版已完成：16 角色作方法庫，由主模型按總管、研究、設計、覆核、交付責任派工。已實作行程／預訂／支付分離、來源重查、時間依賴驗證、重排候選、私人與分享離線頁面、Wiki 搜尋入口、AI 接入說明與更新還原。外部服務仍未設定；Wiki 真資料連接另需本機設定。合成工具與 AI 判讀已有證據，尚未證明真人手機可用或真實旅行成果；人工比較與第二趟重用保留為未驗收項。

## [[AI-一人公司/一人旅遊公司 — 顧問團審查報告|一人旅遊公司 — 顧問團審查報告]]

**摘要：** 保存五位獨立顧問、五份匿名互評、A–E 映射及主席結論，附原 HTML 副本。共識為先補可行性、訂單真相、途中可用性與投入效益；保留能力藍圖，以小案與真人理解驗證後擴大。歷史審查內容不被後續規劃改寫，採用情形見 v2。

**建立：** 2026-09-09

> 最後更新：2026-09-12

---

## [[Web3-基礎/Ch01-完整筆記|Web3 基礎 Ch01 完整筆記]]
**標籤：** `#Web3` `#learning` `#ethereum`
**摘要：** 第1章完整整理：互動地圖、dApp/RPC/mempool/出塊/驗證者/gas、Alice→Bob精修流程、成功/Pending/Revert、確認加深定義與常見誤解校正。主題是交易生命週期而非匯款專章。
**建立：** 2026-09-12

---

## [[QA/Web3-Crypto-QA-互動教材|Web3／Crypto QA 互動教材]]
**標籤：** `#QA` `#Web3` `#Crypto` `#learning` `#interactive`
**摘要：** 由入門學習包改編的關卡制教材：開場心智模型＋7 關（不可變性、gas/finality、錢包簽章與 approve、風險地圖、ERC、橋/oracle/L2、測試分層與 QA vs Audit）＋Boss 五題。每關含精讀卡、選擇／填空／情境題、折疊參考答與迷思／最小補課；含進度表與停止條件。主張對齊 ethereum.org、EIP-20、MetaMask 簽章說明等一手來源。
**來源：** [[Web3-Crypto-QA-入門學習包]] 及其中來源清單
**建立：** 2026-09-12

---

## [[水球流軟體設計模式精通之旅/課程總覽與學習包|課程總覽與學習包]]
**標籤：** `#設計模式` `#水球軟體學院` `#learning` `#OADP` `#Forces`
**摘要：** Learning Assistant 合成層（不取代單篇模式筆記）。一句心智模型：OADP 疊代後在 OOD「再求好」依衝突 Forces 才套 Pattern。含白／黑段與支線地圖、行為／結構／創建型 Force→Intent→vs→挑戰快卡、路徑 A/B、8 題驗收。標明 5 支空逐字稿（1.9／1.12／2.16／6.1／9.1）與 Ch8／Ch10 無影片；DIP 完整手法指向 4.3。來源為 brain-docs 逐字稿合輯、Force 合輯與既有 wiki。
**來源：** `D:/Claude/infra/brain-docs/course/`、`D:/軟體設計模式精通之旅`、wiki 水球流資料夾
**建立：** 2026-09-12

---

## [[QA/Web3-Crypto-QA-入門學習包|Web3／Crypto QA 入門學習包]]
**標籤：** `#QA` `#Web3` `#Crypto` `#learning` `#smart-contracts`
**摘要：** Learning Assistant 整理的入門包：以不可逆、公開、真實資產與 gas、permissionless 對手為心智模型；含 Web2 vs Web3 QA 對照、七個核心觀念（不可變性、gas／finality、錢包簽章與 approve、風險地圖、ERC 標準、橋／oracle／L2、QA vs audit）、1–2 週學習路徑與五題驗收。來源以 ethereum.org、Solidity、OWASP SCS、EIP-20／721、Foundry invariant、MetaMask 簽章釣魚說明為主。僅防禦／QA 高層觀念，不含 exploit PoC；OWASP Top 10 頁曾抓取失敗，細節以官網為準。
**來源：** ethereum.org Testing／Security、Solidity Security Considerations、OWASP Smart Contract Top 10／SCS Checklist、EIP-20／721 等（見文內來源清單）
**建立：** 2026-09-12

---

## [[AI-一人公司/AI Hero — 兩家公司補強再審視|AI Hero — 兩家公司補強再審視]]

**摘要：** 保存公开目錄盤點與重點深讀的再審視結果。優先驗證一句話交辦的真實行為；分開需求與品質，補上 Wiki 檢索品質、長文研究、安裝引導、Dashboard 證據與失敗分類。不是全站付費內容審核，未執行上游 Skills。

## [[AI-一人公司/兩家一人公司 — AI Hero 補強計畫|兩家一人公司 — AI Hero 補強計畫 v1]]

**摘要：** 六階段計畫已核准並完成本機補強，測試公司整合至獨立正式目錄。工具、檢查器、建置及隔離更新還原通過；Wiki 合成查詢 Top 3 由 8/11 提升至 11/11。48 次真模型比較因 CLI 憑證錯誤 Not Run，畫面驗收受瀏覽器政策阻擋，不能宣稱整體行為或真人可用性已通過。未提交、推送或發布。

## [[QA/AI 測試案例 Prompt 的缺口 — Test Design Method 與 QA Decision Desk 補強|AI 測試案例 Prompt 的缺口 — Test Design Method 與 QA Decision Desk 補強]]
**標籤：** `#QA` `#testing` `#test-design` `#prompt-engineering` `#oracle` `#evidence`
**摘要：** 解讀敏捷三叔公 2026-08-24 對 test case generation prompts 的整理，核心不是增加第八個 prompt 欄位本身，而是把 Requirement Readiness、Risk／failure mode、技法選擇、oracle、human review、Test Case、Run evidence 與 coverage feedback 串成可審核決策鏈。現有 QA Decision Desk 已具備 requirement clarification、risk-first、部分 boundary／API 程序、Unknown 與 human authority boundary；真正缺口是通用 Test Design Decision、oracle hierarchy、testability／observability 與 stopping／feedback rule。2026-08-25 已核准 local implementation candidate：把欄位併入 02 Test Spec 與 04 Test Case v0.2.0，新增 template contract test 與真實需求 retrospective pilot；不新增 Dashboard 頁面、Playbook 或第十個核心模板，pilot 仍維持 needs-review。Portfolio 應展示 Risk→Method→Oracle→Evidence→Decision，而不是長 prompt。
**來源：** 敏捷三叔公 — https://agile3uncles.com/2026/08/24/the-missing-piece-in-test-case-prompts/（發布 2026-08-24）
**建立：** 2026-08-25

---

## [[Claude/codex-multi-agent-orchestration|Codex 進階指南 — 作為 Multi-Agent 編排控制平面]]
**標籤：** `#codex` `#multi-agent` `#agent編排` `#控制平面` `#orchestration`
**摘要：** riba2534（服務端工程師）的 Codex 編排深度解讀，核心論點：Codex 不是聊天工具而是「跨項目、跨 Git 工作樹、跨 SSH 主機的 Agent 運維控制台」。四層模型：持久 Task（側邊欄長存、跨主機）／Task 內 Subagent（短生命週期、獨立上下文窗口）／執行環境（Local/Worktree/Remote SSH/Cloud）／App Server 可編程控制面。關鍵硬語義：①跨主機可見性雙向且不分主客（操作線程的工具由 App 提供，主機退化為線程屬性）；②codex_app 13 工具 defer-loading（需先工具搜尋拿 schema）；③**無 wait-all 原語**——wait_threads 天生 wait-any、最多 8 目標，等全部要自己寫迴圈；④clientThreadId 陷阱（非阻塞建線程時返回的 ID 不能傳給要 threadId 的工具，最易寫出 bug）；⑤中斷不對稱（掐得掉子 Agent、掐不掉持久 Task 的當前 Turn）；⑥fork_turns 三檔（all/none/N）控制上下文繼承，fork_thread 總是複製全部歷史。選型判據：context pollution/rot——讀大量代碼得簡短結論→派子 Agent，一兩個明確編輯→自己做。治理：SubagentStop 返回 decision:"block" 實現「驗證不過就重做」；PreToolUse 可改寫工具輸入。八種拓撲（Supervisor/Fan-out/Pipeline/Graph Workflow/Generator-Critic/兩種 Handoff/Fork+Worktree 競賽/Race 與 Quorum）＋五段式派工模板（目標/工作目錄/範圍/約束/返回格式，要求 file:line 證據）＋outputSchema 把「做完了」變成可校驗對象。⚠️ 抽取缺陷：原文所有表格與程式碼區塊（至少 8 處）未取得，已逐處標注並附 15 條官方文件主題清單；feature flag 狀態為 2026-07-30 快照，本機 codex-cli 0.145.0 實測 multi_agent_v2 已 stable——使用前跑 `codex features list` 核對。
**來源：** riba2534 X Article — https://x.com/riba2534/status/2082916383248252976（發布 2026-07-30，408 讚/61 轉）
**建立：** 2026-08-01

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
**摘要：** 13 個模組的自學課程，核心命題是「不懂正常長什麼樣就看不出異常」，因此前台實務與洗錢結構必須一起學。Part 1（M1–M6，前台）：交易室語言（base/terms、left bid–right offer、cross rate 兩種算法、外匯無單邊部位）→ Forward 非預測而是利率差與資金成本（premium/discount、pay/earn points、carry、odd dates）→ Swap 作為全行幣別調度中樞（T/N 每日做平餘額，結構同型於 Repo）→ 選擇權交易的是變化中的風險因子而非靜態 payoff（Delta/Gamma/Theta/Vega、方向對仍虧錢的四條路、gamma hedging 成本、barrier 附近 Greeks 失控）→ Repo 真正的產品是現金抵押品資產負債表額度結算的整體管理（六用途、十步生命週期、haircut、wrong-way risk）→ 信用風險報表其實是資料工程（parent/child 與 agent/principal mapping 是地基、CCE vs MPE、報表必須轉成四選一的行動）。Part 2（M7–M11，後門）五種攻擊面：Wachovia 通匯銀行與 casa de cambio 混池（4,200 億美元未有效監控）、Danske 非居民組合與獎勵視而不見的結構（2,000 億歐元／2022 年 20 億美元和解）、德銀鏡像交易與 remote booking 責任真空（約 100 億美元／FCA 1.63 億英鎊＋NYDFS 4.25 億美元）、Troika 自建平行金融系統（75 家空殼、layering、假合約與合約取消費）、太子集團實體版（跑分→USDT→integration）與 Lazarus 鏈上版（盲簽、chain-hopping、追得到不等於追得回）。Part 3（M12）收斂出同一失效模式：異常都被看見了，但沒有任何一層擁有整個問題；給四個可遷移判準（沒有經濟目的的交易＝最強紅旗、行為畫像優於金額門檻、責任真空比惡意更常見、資料品質即風控上限）與手冊×證物對讀法。Part 4（M13）把每個傳統概念映射到 CEX/託管面試語言（entity mapping→地址簇、代理銀行信任鏈→Travel Rule、CCE/MPE→保險基金、Daily Excess→提幣風控、盲簽→託管簽核介面完整性），並指出 QA 背景的兩個切入角（介面與實際行為一致性、提幣狀態機）。**2026-07-30 增補三層導航：每個模組的「一手文件 × 精修版對照」表同時給精修版章節與原件頁碼兩個座標，M5/M6 尚無精修版者明確標示待製作；附錄 B 升級為三層對照（教材＝為什麼重要／精修版＝完整中文內容／原件 PDF＝一手引用）＋精修版進度表。** 附錄另含四類中英詞彙表、資料可信度分級（一手手冊可直接引用；二手案例數字寫進正式文件前須回 DOJ/FCA/NYDFS/FinCEN/OCCRP 原始出處；起訴不等於定罪）。
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

---

## [[Quant-Trading/雷曼FX手冊-中文精修-02-遠期外匯|雷曼 FX 手冊 中文精修 ② 遠期外匯]]
**標籤：** `#教材` `#中文精修` `#外匯` `#FX-Forwards` `#利率平價` `#一手文件`
**摘要：** 雷曼 FX 手冊 p.38–68（Forwards 全段）中文精修，20 個零基礎實例區塊。核心命題：forward rate 是「中和掉兩幣利率差」的匯率，不是市場對未來匯率的預測——用「$1,000,000 走兩條路」逐步推出均衡值 1.5061，再以套利四步驟演示若市場報 1.53 可無風險賺 $16,451，證明市場不允許偏離。內容涵蓋：forward 定義與市場規模（超過 spot 日的交易約佔 60%）、forward points 為何取代 forward rate 報價（spot 高頻跳動、點數由利率差決定而低頻，這解釋了 forward desk 與 spot desk 分開的原因）、premium/discount 為無套利條件的必然結果、pay or earn the points、forward 日期從 spot 起算與 end-to-end rule、odd dates 內插、currency futures、forward desk 作為全行資金調度中樞、trade ideas 為何偏中期與利差（利率的趨勢性強於匯率）、Eurodollar futures。加值：實測原件線性近似公式與精確利率平價法差 4.4 個點並解釋成因（忽略複利與分母效應，天期越長誤差越大）；pay/earn 給出一句話自檢法「這段期間我的錢放在利率高的幣還是低的幣」取代死背；end-to-end rule 用 2/28→6/30 反例破除「同一號」推法；指出 futures vs forward 真正的差異在保證金追繳，那才是企業避險失敗的常見主因；even swap 兩腿名目相同仍產生 65 萬美元 spot equivalent 曝險（名目相等 ≠ 風險中性）；Eurodollar 曲線的「方向不是交易理由、定價錯誤才是」並延伸到永續合約資金費率。
**來源：** 一手 PDF `raw/sources/lehman-manuals/LBEX-LL-3356480-3356609_FX-and-Options-Training-Manual.pdf`
**建立：** 2026-07-30

---

## [[Quant-Trading/雷曼FX手冊-中文精修-03-換匯交易|雷曼 FX 手冊 中文精修 ③ 換匯交易]]
**標籤：** `#教材` `#中文精修` `#外匯` `#FX-Swaps` `#資金調度` `#一手文件`
**摘要：** 雷曼 FX 手冊 p.69–93（Swaps 全段）中文精修，12 個實例區塊。核心定位：swap 賣的是時間不是方向——它把匯率風險換成利率差風險，用台灣科技廠「本週付 $5mm、三個月後收 $5mm」的資金缺口實例演示兩腿如何互相抵銷。內容涵蓋：swap 結構與只有 buy/sell 與 sell/buy 兩種型態、與 outright 的隱藏差異（swap 可固定 terms 或 base 任一邊）、依交割日的八種分類（T/N、S/N、spot-a-week、spot-two-weeks、spot/forward、odd-dates、forward/forward、long-dates）、bid-offer 指遠端那一腿、從歐洲貨幣市場存放款利率推導兩側報價、swap points 計算、加減的速記規則、pay or earn the points、forward desk 的每日資金調度。加值：指出 T/N 是唯一近端早於 spot 的 swap，因此是「明天資金缺口」的唯一解（spot 與 S/N 都來不及），回扣 ② 的 funding 段；把 bid-offer 推導濃縮成兩條公式（bid＝base offer − terms bid、offer＝base bid − terms offer）並點明與 ① cross rate 的「最寬 spread」同源——同一原理在本手冊第三次出現，可省下大量死背；加減給出三種判斷法（看報價左右大小／看 base 利率高低／推理持有哪個幣）並說明三者必然一致、不一致即為算錯，本身就是內建驗算機制；日圓題點出跨市場搬公式不換單位的陷阱。抓到原件一處數字顛倒誤植（7.2432 寫成 7.2342，其自身算式可證）。
**來源：** 同上一手 PDF
**建立：** 2026-07-30

---

## [[Quant-Trading/雷曼FX手冊-中文精修-04-外匯選擇權|雷曼 FX 手冊 中文精修 ④ 外匯選擇權]]
**標籤：** `#教材` `#中文精修` `#外匯` `#選擇權` `#Greeks` `#gamma-hedging` `#一手文件`
**摘要：** 雷曼 FX 手冊 p.94–130（Options 全段）中文精修，系列完結篇，17 個實例區塊、33,568 字元（系列最長）。樞紐觀念：波動率是選擇權合約中唯一未被雙方明訂的參數，因此是唯一隨市場力量變動的、也是交易員真正在交易的東西。內容涵蓋：payoff 與損益兩平（ITM ≠ 賺錢，差一個權利金）、內含價值＋時間價值、Greeks 全套（delta 約等於價內機率但 exotic 可超過 ±100%、gamma 為 delta 的變化速度且恆為正、theta 時間耗損前慢後快、vega、rho）與二階 nova（vol gamma）、delta 動態避險三點走查（20%→60%→100%）、exotic options 與 reverse knock-out、交易室慣例（TV 與相對 TV 的價差、v-vol、barrier 的市場衝擊）、選擇權策略組合（四種垂直價差、straddle、strangle、butterfly、risk reversal）、原件練習題精選。最有價值的一段是完整重建的 gamma 避險 P&L：買選擇權 $200 → 股價 100→110→85→100 期間四次再避險 → 到期作廢卻淨賺 $925，用以證明「實現波動率高於隱含波動率時，有做 gamma 避險的買方不論標的往哪個方向走都獲利」。其他加值：指出 theta 收最多的地方（短天期 ATM）正是 gamma 風險最大的地方，兩者互為代價是數學恆等式；vega 一節突出「你的避險動作本身會移動市場」的兩難；reverse knock-out 概括為「你賺最多的地方就是你離死最近的地方」並解釋 delta −300% 的實務意義；barrier 觸發連鎖條件單與 CEX 連環清算同構；收掉 ② 的伏筆——想知道市場方向性預期要看 risk reversal 不是 forward 曲線。抓到原件兩處錯誤：p.106 稱 long gamma 需「買高賣低」（其自身例子與 p.108 均證應為賣高買低，且這正是買賣雙方損益結構相反的根源）、p.110 rho 公式分母誤植為波動率。
**來源：** 同上一手 PDF
**建立：** 2026-07-30

---

## [[Quant-Trading/雷曼Repo手冊-中文精修|雷曼 Repo 手冊 中文精修]]
**標籤：** `#教材` `#中文精修` `#Repo` `#附買回` `#擔保品融資` `#Repo105` `#一手文件`
**摘要：** 雷曼 *REPO MANUAL — Repo Sales Reference Guide*（Bates LBEX-LL 1175483–1175553，71 頁，封面標註 2005-11-08）全十一節中文精修，教材 M5 的原文層，104,110 字元／23 個實例區塊。核心觀念：Repo 是同一筆交易的兩張臉——經濟上是以證券擔保的借貸，法律上是「賣出＋承諾買回」，價差即利息；**破產那天你手上有什麼，取決於用哪一張臉解讀**。內容涵蓋六大用途（融資庫存／matched book 賺利差／借券補空頭／處理 settlement fail／客戶流動性／閒置券變現）如何牽動 Trading-Treasury-BalanceSheet-Collateral-Credit-Settlement 六個部門、完整生命週期十步、haircut 的三重作用（價格緩衝＋清算所需時間＋清算時的流動性折價，第三樣最常被漏）、Infinity 前台系統作為狀態機（Shell→Allocated→Approved→Released，且 Released 不可逆）、MTS 主機指令、CAMEO 盯市與 margin call、LBI/LBIE 雙法人的票據與交割差異。**最大的加值是 ⚠️ 標出原件 16 處缺陷**：haircut 有扣減式與倍數式兩種口徑但原件混用且從未定義（同一個「20%」兩種算法差 5% 擔保品）、殘餘風險完整清單七項而原件只涵蓋兩項半且缺的第四項 wrong-way risk 正是雷曼的死因、matched book 實際上交易員刻意錯配天期賺利差（資產鎖三個月、負債每天 roll）、業績表誘因偏向未評等抵押品長天期交易達公債的 30 倍、`Current Exposure` 不含新交易與 reprice 卻在同一手冊有三個名字、margin call 有三個互相衝突的期限且處置動詞是 could 不是 will、判斷 margin call 好壞的人是拿業績分的業務、全書從未問「雷曼自己借不到錢會怎樣」（2005 年一線教材的集體盲點）。**最犀利的一條：LBI（紐約／美國法／MRA）與 LBIE（倫敦／英國法／GMRA）的區分，在這份手冊裡的控制手段只是「Excel 上標一個顏色」——三年後這條線變成了 Repo 105。** 末章「這份手冊與 Repo 105 的關係」銜接 Examiner Vol 3。
**來源：** 一手 PDF `raw/sources/lehman-manuals/LBEX-LL-1175483-1175553_Repo-Sales-Reference-Guide.pdf`
**建立：** 2026-07-30

---

## [[求職/Web3-轉職計畫/00-總覽與定位|Web3 轉職計畫 — 總覽與定位]]
**標籤：** `#求職` `#Web3` `#QA` `#Technical-Support` `#Remote`
**摘要：** Web3求職系統的公開入口。核准Primary為Senior QA／Product Quality、Secondary為Senior Technical Support、Stretch為hands-on QA Lead／Test Lead；Fully Remote only、台灣時間09:00–24:00、travel不超過25%。分離QA/customer-engineering的12+年資與短期Web3 domain experience，保存work/portfolio、Degree、Career Break與confidential claims邊界。Current snapshot：Day1–14完成；LinkedIn與portfolio已更新；2份application為2026-08-14 user-confirmed dated state；CEX lab current public deterministic 39×Python3.12/3.14 passed，governance candidate本機40 deterministic＋5 live passed，manual／exploratory未執行。
**來源：** `D:/Codex/Web3/PROJECT_MEMORY.md`、application／portfolio／CEX lab receipts
**建立：** 2026-07-27；source-backed更新2026-08-15

---

## [[求職/Web3-轉職計畫/01-賽道地圖與資產缺口|Web3 轉職計畫 — 賽道地圖與資產缺口]]
**標籤：** `#求職` `#Web3` `#role-taxonomy` `#evidence` `#gap-analysis`
**摘要：** 以outcome ownership區分QA／Product Quality、Technical Support、hands-on Lead、Customer Success、Program Management與Compliance adjacency。逐柱記錄Trend Micro、ASML、BTSE與CEX lab能支撐什麼、不能延伸成什麼，並把market refresh、profile matrix、publication checklist、case studies、CEX journey、wallet design、trading edge cases、manual execution、mock interviews與application sample列為具gate的缺口。CEX lab evidence明確分成current public deterministic、historical public live、local governance candidate與designed-not-executed manual／exploratory。
**來源：** `D:/Codex/Web3/WEB3_ROLE_TAXONOMY.md`、`JD_REQUIREMENT_EVIDENCE_GAP_ANALYSIS.md`、CEX lab evidence
**建立：** 2026-07-27；source-backed更新2026-08-15

---

## [[求職/Web3-轉職計畫/02-35天執行計畫|Web3 轉職計畫 — 35天執行計畫]]
**標籤：** `#求職` `#Web3` `#35天計畫` `#進度追蹤` `#QA`
**摘要：** Day1–35的完整交付、current label與下一個gate。Day1–14 verified complete；Day15–20部分完成；Day22與scope-limited Day25已有artifact evidence；Day33為2/5 user-confirmed submitted；Day35因sample/time blocked。另記public head `8fd5081` deterministic run 31823105148、historical live `9ce65e0`、local 40＋5 governance candidate、manual MTC／exploratory未執行，以及application-first cadence與依序完成投遞、outreach、public evidence、publishing checklist、case studies、Day21/23/24與mocks的行動順序。
**來源：** `D:/Codex/Web3/PROJECT_MEMORY.md`、`APPLICATION_FIRST_14_DAY_PLAN.md`、CEX lab receipts
**建立：** 2026-07-27；source-backed更新2026-08-15

---

## [[求職/Web3-轉職計畫/03-投遞通路與冷啟動|Web3 轉職計畫 — 投遞通路與冷啟動]]
**標籤：** `#求職` `#Web3` `#投遞` `#outreach` `#funnel`
**摘要：** Application-first執行頁：每份submission以official active JD、Taiwan／APAC eligibility、Fully Remote、role-specific resume、unsupported-claim scan、schedule/travel unknowns與人工packet review為gate。14-day overlay顯示packets與兩筆submission完成，artifact部分完成，outreach／new-role sample／mocks pending，funnel diagnosis因2份樣本與等待時間不足blocked。2026-08-14 dated funnel為2 submitted／0 screen／0 HM／0 closed；current external stage unknown。以十份qualified applications或7–10 business days為第一輪review門檻。
**來源：** `D:/Codex/Web3/APPLICATION_FIRST_14_DAY_PLAN.md`、application packet receipts
**建立：** 2026-07-27；source-backed更新2026-08-15

## Grok Bot（2026-09-12）

### [[Grok Bot/01-官方資料與分析|官方資料與分析]]

**摘要：** 八份官方來源、查核日期、閱讀分析與產品能力限制。 本機整理完成；Grok 帳號、部署與真實行為未驗證。

### [[Grok Bot/02-團隊設計與工作流程|團隊設計與工作流程]]

**摘要：** 八角色責任、固定交接、任務格式、工作量上限與待執行驗收。 本機整理完成；Grok 帳號、部署與真實行為未驗證。

### [[Grok Bot/03-Bot完整設定|Bot完整設定]]

**摘要：** 最後補強版的八個完整 description，另附短名稱與主要工作任務。 本機整理完成；Grok 帳號、部署與真實行為未驗證。

### [[Grok Bot/04-討論沿革與資料準備|討論沿革與資料準備]]

**摘要：** 六到八角色的演進、設定 review、About Me 修改與資料存取界線。 本機整理完成；Grok 帳號、部署與真實行為未驗證。

### [[一人軟體測試公司/_index|一人軟體測試公司入口]]

**摘要：** 集中公司架構、方法、委託與交付文件；新文件統一存入獨立分類，現有QA文件保留並連結。

### [[一人軟體測試公司/PartyPiuPiu — 委託測試企劃]]

**摘要：** 三端圖文測試企劃，32個未測情境、32–45人時預留及由我們負責的帳號與正式站復原方案。來源已保存；尚未建立帳號或執行正式測試；v0.2確認無額外環境，復原未演練，高影響專項暫緩。

### [[一人軟體測試公司/PartyPiuPiu — 00-測試文件入口]]

**摘要：** 企劃v0.2已核准；六類文件將32情境展開為78筆案例，全部未測。包括10項待確認判準、帳號與資料、五條復原程序、六次限時探索及Run/缺陷格式。

- [[一人軟體測試公司/PartyPiuPiu — 01-需求與判準確認表]]

- [[一人軟體測試公司/PartyPiuPiu — 02-測試案例與追溯表]]

- [[一人軟體測試公司/PartyPiuPiu — 03-測試環境與資料準備表]]

- [[一人軟體測試公司/PartyPiuPiu — 04-復原程序與進場檢查表]]

- [[一人軟體測試公司/PartyPiuPiu — 05-探索式測試任務單]]

- [[一人軟體測試公司/PartyPiuPiu — 06-執行與缺陷紀錄格式]]

### [[一人軟體測試公司/PartyPiuPiu — 委託方測試說明]]

委託方閱讀版：以六個短段落說明需要確認、協助及檢視的事項，包含登入後功能、正式站小量測試與復原責任。內部完整企劃保留；本稿未寄送，沒有新增測試結果。

## 2026-09-22 課程影片重點整理匯入

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/00-設計流程圖與模式總整理|00-設計流程圖與模式總整理]]

OOA、OOD 與行為型模式的流程圖說明。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/01-行雲流水的設計底層思路|01-行雲流水的設計底層思路]]

需求分析、UML、OADP 與物件導向設計基礎。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/01-行雲流水的設計底層思路-補充|01-行雲流水的設計底層思路-補充]]

需求分析、UML、OADP 與物件導向設計基礎。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/02-Christopher Alexander 與策略模式|02-Christopher Alexander 與策略模式]]

Context、Forces、Problem、Solution 與策略模式案例；文字由 PDF 擷取。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/03-樣板方法與控制反轉|03-樣板方法與控制反轉]]

學員分組案例中的共同行為、變動步驟與控制反轉。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/04-Big 2 複雜行為實戰|04-Big 2 複雜行為實戰]]

策略與責任鏈的 Forces 差異，以及 Big 2 行為設計。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/04A-責任鏈與碰撞偵測|04A-責任鏈與碰撞偵測]]

碰撞偵測與處理案例中的處理者串接。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/05-RPG 多重設計難題實戰|05-RPG 多重設計難題實戰]]

多種行為約束與指令、觀察者、狀態模式的課程筆記。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/05A-觀察者與響應式行為|05A-觀察者與響應式行為]]

響應式行為約束、訂閱與通知。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/05B-指令與行為綁定|05B-指令與行為綁定]]

遙控器案例中的操作封裝與行為綁定。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/05C-狀態機與狀態模式|05C-狀態機與狀態模式]]

購票機案例中的狀態、事件與行為切換。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/06-基礎架構與模組邊界|06-基礎架構與模組邊界]]

變化封裝、模組邊界與依賴方向。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/06A-依賴反轉與轉接器|06A-依賴反轉與轉接器]]

單字查詢案例中的介面相容、資料與例外轉換。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/06B-代理模式與存取控制|06B-代理模式與存取控制]]

記帳系統案例中的延遲載入與功能存取控制。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/06C-複合模式與樹狀結構|06C-複合模式與樹狀結構]]

檔案系統中的一致操作介面，以及透明度與安全性的取捨。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/07-裝飾者與行為組合|07-裝飾者與行為組合]]

Messenger 案例中的行為組合與裝飾者串接。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/09-工廠方法與生命週期|09-工廠方法與生命週期]]

聊天伺服器案例中的物件建立、生命週期與過度設計。

## [[wiki/水球流軟體設計模式精通之旅/課程影片重點整理/09A-單體模式與計算模型|09A-單體模式與計算模型]]

唯一實例、共享資源及依賴注入的取捨。

