---
title: Github Repo 分析總索引
created: 2026-06-28
tags: [github, index, repos]
---

# Github Repo 分析總索引

> 207 篇 GitHub repo 分析文章，按 12 大主題分類（含 1 篇行銷類深度分析）
> 🔬 深度分析（repo-intel / repomix 五引擎）｜📎 簡單留存（Web Clipper / README）
> ✅ 已安裝 ｜⏳ 觀望 ｜❌ 不適合 ｜📌 參考
> 最後更新：2026-08-06

---

## 🤖 AI Agent 框架（23 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/ChronicleCore-Architecture — 38人格多Agent治理架構白皮書\|ChronicleCore]] | 🔬 | 📌 | 49⭐ 純概念白皮書零程式碼；5 Pillars 治理與本環境 institution/ 殊途同歸；授權禁衍生 |
| [[Github/repos/graphiti — 為 AI Agent 打造的即時時序知識圖譜框架\|graphiti]] | 🔬 | ⏳ | 28.4K⭐ 時序知識圖譜，硬依賴 Neo4j/FalkorDB；MCP Server 可掛 Claude Code |
| [[Github/repos/honcho — 為 AI Agent 打造的使用者建模記憶基礎設施\|honcho]] | 🔬 | ⏳ | 5.8K⭐ peer 建模+背景推理記憶層；與 claude-mem 定位重疊，需 Postgres |
| [[Github/repos/deer-flow — 字節跳動開源超級 Agent 運行框架\|deer-flow]] | 📎 | ⏳ | 74.9K⭐ LangGraph 25+ middleware |
| [[Github/repos/ruvnetruflo 🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms, coordinate autonomous workflows, and build conversational AI systems. Features    enterprise-grade architecture, self-learning swarm intel\|Ruflo]] | 📎 | ✅ | Claude 多 Agent 協調 MCP |
| [[Github/repos/activeloopaiHivemind — 跨 AI Coding Agent 共享記憶與 Skill 系統\|Hivemind]] | 📎 | ⏳ | 跨 Agent 共享記憶 |
| [[Github/repos/crewAIInccrewAI Framework for orchestrating role-playing, autonomous AI agents. By fostering collaborative intelligence, CrewAI empowers agents to work together seamlessly, tackling complex tasks\|CrewAI]] | 📎 | ⏳ | 角色扮演 Agents 框架 |
| [[Github/repos/langchain-ailanggraph Build resilient language agents as graphs. Available in TypeScript!\|LangGraph]] | 📎 | ⏳ | Graph-based Agent 框架 |
| [[Github/repos/datawhalechinahello-agents 📚 《从零开始构建智能体》——从零开始的智能体原理与实践教程\|hello-agents]] | 📎 | 📌 | 中文智能體教程 |
| [[Github/repos/Threads 推薦工具型 Repo 六選\|工具型 Repo 六選]] | 🔬 | 📌 | OpenHands/Continue/LangChain/n8n/awesome-selfhosted/awesome-claude-code |
| [[Github/repos/From idea to AI MCP tools —APIs that power your workflow.快速串接、即時上手，為你的程式或 AI Agent 裝載超能力。支援各 AI Agent 與自動化主流平台，無需部署。\|Superior APIs]] | 📎 | 📌 | MCP 工具 API 平台 |
| [[Github/repos/Hermes-maces — Hermes Agent 的潛意識記憶層插件\|Hermes-maces]] | 🔬 | ❌ | 1⭐ 一天大；Hermes（Nous Research）專用潛意識記憶插件；本環境無宿主不裝，但權重衰減公式+advisory/審批雙通道+輸出邊界驗證三模式值得讀 |
| [[Github/repos/swarm-forge — Uncle Bob 的 tmux 多 Agent 紀律協作平台\|swarm-forge]] | 🔬 | ⏳ | 1.3K⭐ Clean Code 作者作品；tmux+git worktree+Babashka daemon 多 agent 協作，憲法分層強制 TDD/Gherkin/mutation；無 LICENSE + 需 zsh/tmux（Windows 只能 WSL）不裝，但 handoff 窄化（10碼commit+80字note）值得抄進 R17 |
| [[Github/repos/cua — 跨 OS 電腦操作 Agent 基礎設施（driver／sandbox／bench）\|cua]] | 🔬 | ⏳ | 20.6K⭐ YC X25 全 MIT；四產品線：背景不搶焦點的 Cua Driver（Rust+C ABI，講 MCP over stdio，`claude mcp add` 一行接 Claude Code）／跨 OS Sandbox SDK（Linux/macOS/Windows/Android 同一 API，本機 QEMU 免費）／Cua-Bench（OSWorld/Windows Arena）／Lume（Apple Silicon macOS VM）；**自帶 `gui-automation` skill，觸發語意直指 E2E QA**，補的是 playwright 覆蓋不到的**原生桌面 App**；⚠️ 安裝走 `irm \| iex`、host 模式＝交出滑鼠鍵盤、雲端要付費、PR 積壓 334 |
| [[Github/repos/DeepTutor — 港大開源的 Agent 原生個人化學習工作站\|DeepTutor]] | 🔬 | ⏳ | 29.8K⭐ HKUDS（LightRAG 同團隊）+arXiv 論文；六模式共用單一 agent loop，多引擎 RAG（LlamaIndex/PageIndex/GraphRAG/LightRAG/**Obsidian vault**）+三層記憶+Memory Graph；可在對話中呼叫本機 Claude Code/Codex；品質極高但屬**替換**非補位——會取代現行三層檢索，且 Obsidian KB 為**就地讀寫**對 public vault 有風險；部署需 Docker+PocketBase+Next.js |
| [[Github/repos/ClawWork — 港大讓 AI Agent 自負盈虧的經濟生存基準\|ClawWork]] | 🔬 | ❌ | 8.3K⭐ HKUDS（DeepTutor 同團隊）；給 Agent $10 起始餘額跑 GDPVal 220 任務、扣真 token 成本賺**模擬**薪水。**不是工具是跑分機**，對本環境零功能增量；MCP 有但工具只在模擬內有意義，ClawMode 綁死 nanobot 與 Claude Code 無關。三個結構性弱點：收入＝GPT估工時×GPT配BLS時薪×GPT評分（三重估計疊乘）、評分解析失敗預設 5.0/10＝照付半薪、README 宣稱的 0.6 門檻在主線程式碼不存在。749MB 中 96% 是跑分產物；5個月停更/0 release/22 PR 積壓/無測試 CI；HN 僅 3 分 1 留言（同團隊 nanobot 有 257 分），中文圈熱度全是轉述。**📌 可單獨抽取**：`eval/generate_meta_prompts.py` + 44 份職業別評分 rubric，是 LLM-as-judge rubric 自動生成的可運行範例（亦為 fallback 靜默失效的反面教材） |
| [[Github/repos/CowAgent — chatgpt-on-wechat 改名後的開源個人 Agent Harness\|CowAgent]] | 🔬 | ⏳ | 46.1K⭐ MIT；**確認即 chatgpt-on-wechat 原地演進**（repo 建於 2022-08、2026-04-12 改名 commit 可查、Docker tag 刻意保留），真正斷代點是 v2.0.0 聊天機器人→Agent Harness。無外部 DB（SQLite+FTS5 記憶／Markdown 知識庫），週均 28 commits、2 週一版、2147 issue 已關；**Windows 支援意外地好**（run.ps1／Win7 打包 CI／bundle ripgrep／cp936 編碼修正）。⚠️ 中國生態綁定在 `web_search`（Bocha/智譜/千帆/LinkAI 四後端全中國、無 Google/Tavily）與 CDN 安裝腳本，但 Web console／Telegram／Slack／Discord 四通道完全可用，台灣可用面約 8 成。判 ⏳ 因知識庫與本 vault 正面衝突＝開第二個腦，且唯一增量「常駐 IM 助理」目前無需求；**外部驗證近乎零**（HN 零覆蓋、無第三方實測、46K 星是四年累積非 CowAgent 採用度）。**📌 可單獨抽取**：`channel/` 三方法通道抽象、`skills/loader.py` 遞迴停止規則、`memory/storage.py` CJK trigram 分詞、`evolution/` write-guard+備份+undo 安全圍欄；且 SKILL.md 格式與 Claude skills 相容 |
| [[Github/repos/OpenMinis — iOS／Android 上的開源 On-Device AI Agent App\|OpenMinis]] | 🔬 | ⏳ | 1.4K⭐ GPL-3.0；**手機端 agent App 原始碼，非桌面工具**——無 CLI／無 MCP server／無可取用 skill，對 Windows 工作流直接增量為零。技術核心是**在 App 進程內跑 Linux**（iOS: iSH ARM64 fork + Asbestos JIT + SQLite fakefs；Android: PRoot），外加 60+ 原生 offload（HealthKit／HomeKit／NFC／Vision OCR／FFmpeg）與 12 個 App Intents。⚠️ **repo 是私有樹的鏡像、明文拒收 PR**，原始碼 2026-07-25 才以單一 commit 倒出（前三個月只是 README 空殼，1.4K 星是 App 人氣非程式碼），貢獻者 1 人。唯一交集是 **skill 格式與 Claude 同構**（SKILL.md + 按需載入，prompt 內上限 20 個），既有 124 skill 理論上可直接在手機跑，但屬「內容互通」非「系統整合」。外部驗證薄：HN 僅 7 分 0 留言、YouTube 教學為零，正評集中在 MacStories／知乎／Appinn 三篇媒體。已知資料完整性 bug 兩張（iSH 容器失步 #99、iCloud 同步孤兒化 #98）。**📌 可單獨抽取**：`src/shared/bashism/` 偵測 LLM 產出的 bash-ism 在 ash 上跑不動的規則表＋測試向量；7/25 開源 commit message 是「私有專案開源該交代什麼」的範本 |
| [[Github/repos/bytedanceUI-TARS-desktop The Open-Source Multimodal AI Agent Stack Connecting Cutting-Edge AI Models and Agent Infra\|UI-TARS-desktop]] | 📎 | ⏳ | 字節多模態 Agent Stack：Agent TARS（CLI＋Web UI，MCP 工具整合）＋ UI-TARS Desktop（本機/遠端電腦與瀏覽器 operator）；README 剪貼留存 |
| [[Github/repos/Meta_Kim — 跨四 CLI 的 AI 編碼治理執行層\|Meta_Kim]] | 🔬 | ⏳ | 257⭐ Apache-2.0；老金（AI-Coding-Guide-Zh 5.5K⭐作者）單人作品；八階段治理脊柱＋9 meta-agents＋能力索引路由，單源投影 Claude/Codex/Cursor/OpenClaw；供應鏈稽核乾淨（postinstall 良性、3 顆知名相依、網路面窄）但腳印大（Windows 啟動資料夾 VBS 自啟動＋四 runtime 全域寫入）；與 R14/R17/verify_gate/institution 概念重疊 8 成且哲學相反（全量前置 vs 極簡路由），86KB SKILL＋4 Stop hooks 違反 R13 不裝系統；📌 可抄想法：discover:global 能力索引、stage-DAG 斷點續跑、smoke/live 證據分級 |
| [[Github/repos/storm — LLM 自動研究與維基文章生成系統\|storm]] | 🔬 | ⏳ | 30.4K⭐ MIT；史丹福 OVAL 官方（NAACL/EMNLP 2024 雙論文）：主題→多視角提問＋模擬「維基編輯×專家」對話→大綱→帶引用長文的四段可斷點管線；Co-STORM 加人機圓桌＋心智圖。供應鏈五項全綠（標準 setuptools、12 相依全實、呼叫面全為文件化 API）。與 repo-intel/article-decode 產線高度同域，判 ⏳：需求已被 research-deep 覆蓋＋停更逾一年（dspy 釘死 2.4.9）＋方法論三招（視角提問/對話式追問/大綱先行）讀完即吸收；真正獨有是 VectorRM 錨定自有語料生成——升級觸發＝出現「以自有教材語料批量產長文」需求。社群提醒：抽掉檢索的 STORM prompt 是幻覺製造機 |
| [[Github/repos/TencentDB-Agent-Memory — 騰訊四層記憶架構的 AI Agent 記憶中樞\|TencentDB-Agent-Memory]] | 🔬 | ❌ | 10.1K⭐ 實質 MIT（`licenseInfo=other` 是 Tencent 制式前言干擾偵測器）；四層長期記憶 L0 原始對話→L1 原子事實（sqlite-vec+FTS5）→L2 場景塊 `.md`→L3 用戶畫像，可反向追溯證據鏈；短期記憶把工具日誌卸載外部檔、上下文只留帶狀態/依賴/節點 ID 的 Mermaid 任務圖。**四項技術宣稱全 Confirmed**（`src/core/store/sqlite.ts:20711,20798`），SQLite local-first 屬實（僅 Hermes Docker 快啟預設 LLM 端點指向騰訊雲 DeepSeek，可覆蓋），供應鏈五項全綠＋`SKILL.md` 逐字讀無自動行為指令。**判 ❌ 的是結構與安全不是技術**：①**三分支＝三產品且互無共同祖先**（`gh api compare` 回 `No common ancestor`）——`main` v0.3.6 是 OpenClaw/Hermes 外掛、`feat/server` 才是 `releases/latest` 認定的 v1.0.1、而 **GitHub 預設分支 `feat/server_team` 是 `prerelease:true` 的 v2.0.0-beta.1**，`git clone` 裸指令拿到的正是 beta ②**唯一能接 Claude Code 的 MemoryProxy 正是 issue #672 漏洞所在**（外部研究者 2026-08-01 提報，OPEN）：`admin-auth.ts:8` 逐字 `if (!expected) return "ok"` ＝token 未設即全開的 fail-open、`rate-limits.ts` 全檔查無 `checkAdminAuth`，2026-08-02 對 HEAD 新鮮複驗**兩個 CRITICAL 均未修** ③功能與既有 claude-mem 重疊，官方 benchmark（PersonaMem 召回 29.63%→79.07%）零第三方複現、錯誤記憶/跨專案污染/記憶刪除四個失敗面零案例。社群：345 open PR 但全歷史合併率僅 8.85%，同一批 bug 被 5-10 個一次性作者重做（疑校園獎勵型湧入）；⚠️ `/contributors` 與 `/commits` 因預設分支是孤兒分支而嚴重失真不可引用。復查觸發＝#672 關閉且 fail-open 分支移除＋v2.0.0 脫離 prerelease |
| [[Github/repos/dashi-taskboard — 嵌入 Codex 的本地優先任務看板\|dashi-taskboard]] | 🔬 | ⏳ | 169⭐ **無 LICENSE**；「大师的AI小灶」出品的 Codex 任務看板（自稱 Codex Taskboard）：Node22 零依賴後端（node:sqlite）＋React19，CDP 注入嵌進 Codex 桌面版（macOS 為主）＋manage-taskboard Skill 讓 agent 用 taskctl 管 issue 全生命週期（樂觀鎖併發領單＋CODEX_THREAD_ID 歸因）；AI Chat 走本機 codex app-server 不碰 API key。供應鏈五項乾淨（無遙測/無 install hook/Repomix 綠）但無 lockfile/無 release/無 CI，上線 10 天單人衝刺；LAN 模式預設 0.0.0.0 零認證。升級＝補 license 出 release，或雙 AI 工作流出現多 issue 併發派工需求；放棄＝六個月無 commit |

---

## 🛠️ Claude Code / Skills（58 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/AgentKey — Chainbase 的付費 MCP 資料閘道\|AgentKey]] | 🔬 | ⏳ | 582⭐ Apache-2.0；Chainbase（Web3 資料公司）的**訂閱制資料閘道**——一個訂閱涵蓋 web search/scraping/社群/鏈上/財經/電商，雲端自動 failover。⚠️ **repo 不是產品本體**：主語言僅 Shell+PowerShell，Top 5 大檔全是安裝腳本，零應用邏輯；服務閉源託管於 `api.agentkey.app/v1/mcp`，寫設定的 `@agentkey/cli` 宣告 repo 實測 **404 私有**。✅ **供應鏈檢查通過**：線上 install.sh/.ps1 與 repo 內 **SHA-256 完全相同**，對外端點無非預期主機。⚠️ **最該注意**：SKILL.md 明文「**Use INSTEAD OF built-in WebSearch/WebFetch**」「don't fall back to Claude's built-in Web Search」＝**用計費服務取代你免費的內建工具**，且工具名包裝成通用的 `find_tools`/`execute_tool` 不揭露付費性質；已有使用者開 issue「吃相太难看了」指 server 端會把誘導文字注回每個 session（改本機 SKILL.md 擋不住），**0 回覆**。做得好的三點：prompt-injection 防禦寫進 SKILL.md、成本閘門（≥3 呼叫或 ≥10 credits 前強制查餘額估價確認、失敗呼叫不計費）、7 條 CI＋週更 15+ release。判 ⏳ 三理由：**定價頁 JS SPA 兩種爬法都抓不到**、覆蓋內建工具行為未解、**582⭐ 只有 2 watcher** 缺第三方實測。🪟 **本環境專屬坑**：安裝器認 `%USERPROFILE%\.claude.json`、**完全不認 `CLAUDE_CONFIG_DIR`**，會觸發 config-drift 金絲雀第 [4] 項 → ✅ **改走 `.claude-plugin/marketplace.json` 的 plugin 路徑可完全繞過**。**📌 可單獨抽取**：`cost-aware.md` 花錢前確認規則、`protocol/skill-meta-v1` 版本廣播協定、`install.ps1` 40+ agent Windows 路徑對照表 |
| [[Github/repos/i-have-adhd — ADHD 友善輸出 skill\|i-have-adhd]] | 🔬 | ❌ | 5.3K⭐ 10 條 ADHD 友善輸出規則；與 caveman hook 高度重疊＋全域觸發衝突；可吸收個別規則零安裝 |
| [[Github/repos/fable-method — Fable 5 工作法蒸餾成任何模型可跑的 Skill＋Eval\|fable-method]] | 🔬 | ⏳ | 1.6K⭐ Fable 5 工作法四 skill（think/act/prove/grow）＋15 輪對抗 eval；與 institution 同哲學不整裝，但 trap-fixture 迴歸測試是 institution 缺的真增量，升級條件＝下次改規則先寫 trap 測 |
| [[Github/repos/hallmark — 拒絕 AI 味的前端設計 Skill（結構多樣性＋防呆閘門）\|hallmark]] | 🔬 | ✅ | 17.7K⭐ Nutlope 反 AI-slop 設計 skill；一預設+三動詞（build/audit/redesign/study）；強制跨頁結構多樣性、study 抽 DNA→可攜 design.md、57 gate slop-test+六軸自評；**07-18 已裝**（指名調用限定避開 taste 群打架）；**07-26 回訪**：星數+40% 但上游 7 週零 commit、ROADMAP 全未動、本地已是最新版；復查判準改為「下次設計任務實測 vs design-taste-frontend，沒贏就移除」 |
| [[Github/repos/emilkowalski-skills — Design Engineer 動效與 Apple 設計 Skill 合集\|emilkowalski/skills]] | 🔬 | ✅ | 6.8K⭐ Sonner/Vaul 作者的 4 個動效 Skill；決策層互補現有 css-animations/gsap 等技術層 skill；2026-07-10 已裝（雙位置+marketplace） |
| [[Github/repos/guizang-material-illustration — 歸藏材質插畫 Claude Skill\|guizang-material-illustration]] | 🔬 | ⏳ | 463⭐ 3天新；純Prompt型配圖Skill，帶中文標籤材質插畫+圖表美化；op7418歸藏系列，與已裝guizang-ppt互補 |
| [[Github/repos/claude-howto — Claude Code 視覺化互動教學指南\|claude-howto]] | 🔬 | ⏳ | 39.5K⭐ 視覺化教學網站+repo，10模組+可複製模板+互動自評/測驗Skill；內容價值高於程式碼、非安裝型工具 |
| [[Github/repos/fable-harness — Fable 行為協議移植套件（hooks 強制執行層）\|fable-harness]] | 🔬 | ✅ | 83⭐ Fable 紀律蒸餾成 hooks+skill+agents；verify_gate 組件 07-17 試用轉正全域化，其餘 95% 同構不裝 |
| [[Github/repos/pilotfish — Claude Code 多模型委派配置包\|pilotfish]] | 🔬 | ⏳ | 119⭐ 一天新；三層委派設定包（settings/agents/CLAUDE.md）與 institution 三鐵則高度同構；安裝會全域覆寫+命名衝突風險 |
| [[Github/repos/system_prompts_leaks — 全網 AI System Prompt 逆向存檔庫\|system_prompts_leaks]] | 🔬 | ⏳ | 48.7K⭐ 全網 AI system prompt 存檔（登華郵）；獨有 Claude Code bundled-skills 原始碼；選檔匯入不整包 |
| [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill\|web-design-guidelines]] | 🔬 | ✅ | Vercel官方 28.6K⭐，Fetch-on-Demand 即時抓 100+ 前端規則審查UI，437K次安裝 |
| [[Github/repos/claude-real-video — 讓 Claude 真正看影片的本機關鍵幀擷取工具\|claude-real-video]] | 🔬 | ✅ | 619⭐ 場景感知+去重關鍵幀擷取，內建 Claude Code Skill，4 天登 HN 首頁 |
| [[Github/repos/claude-video — 讓 Claude 真正看影片的 watch 技能\|claude-video]] | 🔬 | ❌ | 7.7K⭐ /watch 上游原始版（claude-real-video 即其平行實作）；yt-dlp+ffmpeg 四段細節撥盤+MAD 去重，跨 50+ host；與已裝 claude-real-video 重複故不裝 |
| [[Github/repos/social-cards-engine — 品牌無關的社群圖卡引擎\|social-cards-engine]] | 🔬 | ⏳ | 23⭐ 品牌無關社群圖卡引擎，brand pack+雙審核員（carousel-joker/meme-joker），2 天新 |
| [[Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件\|addyosmani/agent-skills]] | 📎 | ✅ | 32 Skills + 8 Commands + 4 Agents |
| [[Github/repos/ECC — Claude Code harness-native 操作系統\|ECC]] | 📎 | ⏳ | 100+ skills，182K⭐ |
| [[Github/repos/zeuikliclaude-pilot-suite Claude Code execution playbook with 3 pilot modes cost-first (Haiku), quality-first (Sonnet), ceiling-elevation (Opus). Quantitative escalation gates\|claude-pilot-suite]] | 📎 | ⏳ | 三模式成本優化 |
| [[Github/repos/mattpocockskills Skills for Real Engineers. Straight from my .claude directory\|mattpocock/skills]] | 📎 | ✅ | Real Engineers Skills |
| [[Github/repos/KKKKhazixkhazix-skills 数字生命卡兹克开源的 AI Skills 合集\|khazix-skills]] | 📎 | 📌 | 卡茲克個人 Skills |
| [[Github/repos/LichAmnesialich-skills\|lich-skills]] | 📎 | 📌 | Claude/Gemini/Codex 三平台 |
| [[Github/repos/14 Claude Code skills for common research tasks — literature triage, research design, project context, manuscript writing, and multi-AI delegation. 5-plugin marketplace, install in one command\|research-skills]] | 📎 | 📌 | 14 個學術研究 Skills |
| [[Github/repos/LichAmnesiagemini-evolve Self-evolve Gemini CLI instructions, commands, and skills via the gemini CLI itself — GA + GEPADSPy, with hard gates before apply\|gemini-evolve]] | 📎 | 📌 | Gemini CLI 自我進化 |
| [[Github/repos/GPT-Prompt-HubCLAUDE.md at main\|GPT-Prompt-Hub]] | 📎 | 📌 | 222 個結構化 Prompts |
| [[Github/repos/x1xhlol-system-prompts-and-models-of-ai-tools\|x1xhlol/system-prompts]] | 📎 | ✅ | 30+ 工具真實 system prompt |
| [[Github/repos/anthropicsknowledge-work-plugins\|knowledge-work-plugins]] | 📎 | ⏳ | Anthropic 官方 plugins |
| [[Github/repos/anthropics-claude-plugins-official — Anthropic 官方 Claude Code Plugin 目錄\|claude-plugins-official]] | 🔬 | ✅ | 31K⭐ claude-md-management：6維評分稽核 + /revise-claude-md |
| [[Github/repos/firecrawlfirecrawl — 網頁爬取轉 Markdown SaaS 平台\|firecrawl]] | 📎 | ✅ | 網頁爬取 Skills（5 個）|
| [[Github/repos/firecrawlskills — Firecrawl Claude Code Skills 分析\|firecrawl-skills 分析]] | 📎 | ✅ | Firecrawl Skills 技術分析 |
| [[Github/repos/Claude-BugHunter — Claude Code Bug Bounty Skill Bundle\|Claude-BugHunter]] | 📎 | 📌 | Bug Bounty Skills |
| [[Github/repos/kevintsai1202teaching-site-skills 11 agent skills (Anthropic Skills format) — one `npx skills add` installs the full pipeline for building interactive teaching sites end-to-end on Claude Code  Codex  Antigravity  55+ AI coding agents. ｜ 11 個 age\|teaching-site-skills]] | 📎 | 📌 | 11 個教學網站 Skills |
| [[Github/repos/sickn33-antigravity-awesome-skills — 1700+ Agentic Skills 多工具安裝庫\|antigravity-awesome-skills]] | 🔬 | ⏳ | 42K⭐ 1,700+ skills；14 Specialized Plugin；npx 一鍵裝 |
| [[Github/repos/f-prompts.chat — 全球最大開源 AI Prompt 庫 + Claude Code 插件\|f/prompts.chat]] | 🔬 | ⏳ | 164K⭐ 全球最大 Prompt 庫；MCP + 2 指令 + 2 Agents；免費搜尋 |
| [[Github/repos/wshobson-agents python-development — Python 3.12+ 全棧開發 Plugin（3 Agent + 16 Skill + 1 指令）\|wshobson/python-dev]] | 🔬 | ✅ | 37K⭐ python-pro(Opus)+django+fastapi；16 Skills；/python-scaffold |
| [[Github/repos/looper — Claude Code Agent Loop 設計教練\|looper]] | 🔬 | ⏳ | 623⭐ 迴圈 pre-flight 設計教練：七階段訪談+跨模型 judge+終止護欄→loop.yaml 可攜規格；與 institution 八成同構，等常設迴圈需求再裝 |
| [[Github/repos/marketingskills — AI Agent 行銷技能包\|marketingskills]] | 🔬 | ⏳ | 35K⭐ 45 行銷 Skills + 51 CLI；虛擬歌手場景選裝 10 個可用 |
| [[Github/repos/huangwb8-skills — Claude Code Skill 開發流水線\|huangwb8/skills]] | 🔬 | ⏳ | 12 Skill 開發流水線 + auto-test + parallel-vibe |
| [[Github/repos/JuliusBrussee-caveman — 用穴居人語法削減 65% output token\|caveman]] | 🔬 | ✅ | 78K⭐ 7 Skills + cavecrew 3-subagent；削 65% output token |
| [[Github/repos/eugeniughelbur-obsidian-second-brain — Vault-first 研究與 Obsidian 架構筆記系統\|obsidian-second-brain]] | 🔬 | ✅ | 1.9K⭐ /research+/research-deep+/obsidian-architect；free+Perplexity paid |
| [[Github/repos/thedotmack-claude-mem — 85K⭐ 跨 Session 持久記憶\|claude-mem]] | 🔬 | ✅ | 85K⭐ SQLite+ChromaDB；worker 自 2026-05 運行；claude-mem@thedotmack plugin |
| [[Github/repos/vercel-labs-skills — Agent Skills 生態系 CLI 套件管理器\|vercel-labs/skills]] | 🔬 | ⏳ | 25K⭐ Vercel官方 npx skills 套件管理器；內建 find-skills 已在本機生效中 |
| [[Github/repos/claude-cache-guard — Claude Code 5小時額度自動交接工具\|claude-cache-guard]] | 🔬 | ⏳ | 9⭐ 5h額度門檻自動寫交接檔+/ccgresume；⚠️與本環境 hook 注入規則衝突恐靜默失效，常撞額度才考慮 |
| [[Github/repos/archify — 用大白話生成架構圖的 Claude Skill\|archify]] | 🔬 | ✅ | 6.5K⭐（07-21 復盤翻倍）用大白話生成五種技術圖，JSON IR+Schema驗證+4×匯出+WebM；已裝**舊版**，v2.11 為升級候選（+語意互動/Story導覽/11-recipe guide） |
| [[Github/repos/MengTo-Skills — 設計師視角 Codex×Claude×Cursor Agent Skill 合集\|MengTo/Skills]] | 🔬 | ⏳ | 1.3K⭐ Design+Code 創辦人個人庫，75 skills（62 個視覺風格卡+13 個原則/Codex工作流）；與已裝 design-taste-frontend 等高度重複，與 emilkowalski/skills 互補（決策層 vs 風格庫） |
| [[Github/repos/laowangba-pmprototype-skill — B端C端產品原型生成 Codex Skill\|laowangba-pmprototype-skill]] | 🔬 | ⏳ | 38⭐ 1天新；PM 用 B/C 端 Figma 原型生成流水線+Anti-Slop 閘門，inherits frontend-design；本機無 Figma MCP 跑不到執行層，QA 用途低 |
| [[Github/repos/ten-wins-ten-losses — 三國官渡 SDD 角色扮演開發工作流\|ten-wins-ten-losses]] | 🔬 | ❌ | 2⭐ 三國四謀士人設 SDD skill；與 institution+7-Agent 工廠同構但精簡（單 session 人格切換）；抽機制不裝皮——diff 增量鎖定＋questions.md 安全閥待分診 |
| [[Github/repos/bento — 塞進單一 HTML 檔的辦公套件（PowerPoint 替代品）\|bento]] | 🔬 | ✅ | 2K⭐ 單檔 `.bento.html` 同時是文件＋編輯器＋播放器＋協作端（~560 KB）；文件是檔內明文 JSON → agent 就地改檔；自帶 Claude Code plugin marketplace（`bento-slides` skill 會自己下載 app 當空白容器）；morph／自研圖表／E2EE CRDT 協作／PDF 匯出；補位既有 guizang-ppt 等**靜態 HTML** deck skill（Bento 產出可再編輯＋可正式簡報）；⚠️ repo 僅 9 天、2 人、作者帳號新建（HN 上被質疑），先用 skill 不啟自我更新 |
| [[Github/repos/html-anything — 把任何檔案轉成單檔互動 HTML 的 Agent Skill\|html-anything]] | 🔬 | ⏳ | 104⭐ 60 source prompts×17 style systems，把 WhatsApp/微信/Kindle/Spotify/Apple Health/**Obsidian vault** 等雜亂匯出轉單檔互動 HTML；填「source-aware parsing」空白（既有設計 skill 全是產出端、無人管讀懂格式）；**MIT-0 可單抄 prompt 檔不必裝整包**；⚠️停滯10週+單人+v0.1.x，when_to_use 比 hallmark 更廣會搶觸發 → 建議只抄 obsidian-vault.md 餵 archify |
| [[Github/repos/naiyue-skills — 跨宿主的四支元技能工具箱（審 skill／調研／建 skill／思考框架）\|naiyue-skills]] | 🔬 | ✅ | 4⭐ MIT／純 Python 標準庫零相依／雙宿主（Codex＋Claude Code）。四支**元技能**：**skill-auditor**（把第三方 skill 宣稱拆成 claim → 沙箱多輪實跑 → 逐條證實/證偽/無法驗證，`claims.json` 單一事實源、AI 只做局部判斷、轉停由腳本決定、終態永不改判、實跑 Agent 不得知道 claim 內容防取證偏向）→ **建議裝**，填補既有 `audit-skill` 只做靜態檢查的空白（本環境屢吃 hallmark/pixelshot「宣稱≠實測」的虧），但**須改名 + 指名調用限定**避開觸發打架；**prior-art-scout**（開工前多源選型，15 條鐵律含「盡力證明有人做過」「停更≠路線不可行」「不得從有限樣本推導行業無解」）→ ⏳ 與 research-deep+repo-intel 七成重疊、X 源需付費 TikHub；**naiyue-thinking** ❌ 與 institution/02 八成同構（獨立收斂訊號，抄「三次才固化」表即可）；**naiyue-skill-builder** ❌ 與本環境三處同步 SOP 衝突（只抄 `quick_validate.py` 的 L1/L2/L3 檢查）。⚠️ 本機實測：symlink 還原失敗（需管理員/開發者模式，但手動安裝不受影響）、測試硬編碼 `python3` 致 9 fail+2 error（環境非邏輯）、`skill-auditor` 5 支承重腳本零測試（違反自家 AGENTS.md）。與 [[Github/repos/naiyue-cover-generator — Codex 用的文章封面與段內說明圖 Skill 組\|naiyue-cover-generator]] 互補不重複（早 20 天、零檔案重疊、MIT vs 無授權），**本 repo 是該追蹤的正本** |
| [[Github/repos/free-claude-code — 讓 Claude Code、Codex、Pi 改跑自家 LLM 供應商的本機代理\|free-claude-code]] | 🔬 | ❌ | 42.7K⭐ MIT／6 個月衝上來的本機反向代理：假裝成 Anthropic Messages（給 Claude Code/Pi）與 OpenAI Responses（給 Codex），把請求翻譯後轉去 **29 家供應商**（NVIDIA NIM/OpenRouter/Gemini/DeepSeek/Groq/Ollama/LM Studio…），支援 Opus/Sonnet/Haiku 分層各指不同上游、本機 Admin UI（Validate 後才 Apply）、Discord/Telegram 橋接＋語音轉文字。**名稱誤導**——拿到的不是免費 Claude 模型，是用 Claude Code 這個殼去驅動別家模型，原廠模型不在清單裡。**❌ 因需求不存在**（本環境付費 opus[1m]）＋要動 `ANTHROPIC_BASE_URL`/`.claude.json`/`DISABLE_AUTOUPDATER` 與 settings 統一＋config-drift 金絲雀正面衝突；且 `curl \| sh` 安裝、**零 tag 零 Release 無版本可釘**、bus factor 1（728/860 commits 一人，第 2、5 名貢獻者是 `cursoragent`/`claude` AI 帳號）。工程品質**反而是同星等前段**：靜態 AST 契約測試釘死八套件依賴白名單、19K token ARCHITECTURE.md、tests/ + smoke/ 雙層測試。熱門 issue 前 7 有 6 個同一件事＝上游供應商請求失敗（結構性風險，免費層限流／改 schema／tool-calling 支援不一）。**📌 可單獨抽取**：`api/web_tools/egress.py` 的 DNS-rebinding-safe SSRF 守門（~60 行零相依）、`tests/contracts/test_import_boundaries.py` 架構契約測試法、`smoke/` prereq/product 兩層分法 |
| [[Github/repos/AK-Threads-booster — Threads 演算法寫文決策 skill\|AK-Threads-booster]] | 📎 | ⏳ | AK體 2.0：用自己的歷史貼文＋演算法做 Threads 選題/起草/發文前診斷/表現預估/復盤的 skill 系統；原檔名 296 bytes 造成 git-bash 隱形，2026-07-31 改名修復 |
| [[Github/repos/openai-codex-plugin-cc\|codex-plugin-cc]] | 🔬 | ✅ | OpenAI 官方 Claude Code plugin：/codex:review、adversarial-review、rescue、transfer、背景 job 管理；本環境 codex 雙 AI 工作流的上游來源，Apache-2.0 零依賴 |
| [[Github/repos/awesome-codex-skills A curated list of practical Codex skills for automating workflows across the Codex CLI and API\|awesome-codex-skills]] | 📎 | 📌 | 自己維護的 Codex skills 精選清單（sanyoii/awesome-codex-skills） |
| [[Github/repos/personal-ip-brand-intro — 個人品牌開場動畫 Codex Skill\|personal-ip-brand-intro]] | 🔬 | ⏳ | 14⭐ MIT；台灣創作者 FuFu（fufuailab.com）**發布首日**的 Codex Skill：7 秒個人品牌開場動畫，HyperFrames 預設／Remotion 明示，三視覺模式（純文字插圖/用戶圖片/混合）。**方法論是賣點**：七項設計指紋防模板化、**無音樂時自選 BPM 產靜音節拍表**（成品無聲仍按節奏動）、分鏡確認閘門才渲染、ffprobe＋抽幀驗成品。安全稽核乾淨：execFileSync 陣列參數呼叫 ffprobe 無注入面、零網路呼叫、SKILL.md 明文不偷換音樂不擅自渲染。判 ⏳：品質高於星數且 HyperFrames 引擎層已就緒，但**目前無排上的品牌開場需求**（R13）；升級觸發＝個人網站/Threads 要做開場素材時。**📌 可單獨抽取**：七項設計指紋 anti-template 檢核表、「無音樂也要有節拍表」思路、60 行的 verify-render 抽幀驗證 |
| [[Github/repos/claude-cache-guard — 5 小時額度到頂前自動寫交接檔的 statusLine 守門員\|claude-cache-guard]] | 🔬 | ⏳ | 33⭐ MIT 零依賴；掛 statusLine 抽 5h/7d 用量寫本機檔，越過門檻（預設 90%）用 `Stop`/`PostToolBatch` hook 逼 Claude 先寫 `next_session.md` 才准停。**防的是具體成本陷阱**：額度耗盡等重置期間 prompt cache 冷掉，回到大 session 整段對話以**未快取 input tokens** 重新計費讀入。✅ **供應鏈五項全綠**：零 postinstall／零依賴／npm tarball 21 檔與 `files[]` 吻合無夾帶、`bin`+`scripts`+`src`+`package.json` **14 檔逐檔比對零差異**／`fetch`·`node:http(s)`·`net`·`dns` 全 repo 零命中、無 `eval`。**品質 vs 採用度矛盾**：測試碼體積是產品碼 1.5 倍（19 test 檔／檔名即開發史 `audit-fixes`·`qa-fixes`·`config-hardening`·`prototype-residue`）、三語文件、CI 跑 Node 18/20/22，但 **0 issue / 0 fork / 0 PR / 1 watcher**＝沒人裝過。🪟 **本環境兩處硬衝突**：①`src/paths.js` 只用 `os.homedir()`，全 repo grep `CLAUDE_CONFIG_DIR` **零命中** → statusLine 寫進 C: 而 Claude 讀 D:（永不生效＋觸發金絲雀第 [1] 項）、`/ccg*` 裝進沒 junction 的 `C:\...\.claude\commands\` 一個都不會出現（skills Issue #1 同型）②statusLine 已被 caveman plugin 佔用。**功能空缺是真的**：`/last-word` 觸發軸是 context 40%，ccg 是額度視窗 90%，兩軸正交。**📌 零成本可抽取**：交接模板的 `## Original User Prompts`（逐字依序保存原始指令，理由＝compaction 會改變語意）與 `## Do Not Repeat` 兩欄補進 `/last-word`；另有雙層遞迴防護（正則+`CCG_BRIDGE_CHILD` env marker）、殺 process group、symlink truncate 防護、控制字元先剝除再比對敏感標記 |
| [[Github/repos/claude-code-templates — 1700+ 元件的 Claude Code 設定分發器\|claude-code-templates]] | 🔬 | ❌ | 30K⭐ MIT；把 872 skills／408 agents／commands／MCP 收成目錄，`npx claude-code-templates` 一鍵寫進 `~/.claude/`。**體質其實不差**：下載來源單一透明（全在自家 GitHub raw、無自架 CDN）、**無 postinstall**、遙測克制且 opt-out 一致（`CCT_NO_TRACKING`）、GHSA-79wm-x847-7cvg（`--studio` 未鑑權 OS 命令注入 RCE，CVSS 8.8）**同日修補**。判 ❌ 是與**本環境**的具體衝突：①🔴 **單一元件安裝靜默覆蓋**——逐行讀原始碼確認 agents／commands／skills 的 .md 走裸 `fs.writeFile` 無存在性檢查，而 `.mcp.json`／`settings.json`／hooks 走 `pathExists`→合併（設計選擇非疏漏，全檔 12 處 `pathExists` 無一在元件寫檔路徑上）；**本機 86 個 skill 中 18 個（21%）與其目錄精確同名**（brainstorming／docx／pdf／pptx／xlsx／skill-creator／ui-ux-pro-max／using-superpowers／writing-plans／frontend-design 等），帶 local patch 的元件會無提示無備份被蓋掉 ②重疊項幾乎全是 anthropics/skills＋obra/superpowers 的鏡射同步，已從源頭取得，經它再裝＝多一層無收益轉發 ③`--yes` 繞過四步 SOP（逐字讀→備份區→user-level→marketplace），稽核點全失效。⚠️ 供應鏈結構性弱點：**無 npm provenance**（無法驗證產物由該 repo 建出）、**單一維護者** danisan_avila、修 RCE 的 v1.29.4 **連 tag 都沒有**（tags 只到 v1.29.2）。📌 **兩個發佈管道脫鉤**：npm 已 1.29.4 而 GitHub Releases 停在 v1.28.3（2025-11-15）——只看 GitHub 會誤判停更八個月，副作用是安全修補不進 release 通知。📌 星數≠採用度：30K⭐ 對**週下載 2,834**（08-07 複查）；215MB 是 repo 不是安裝物（npm 僅 2.4MB／96 檔）。🔴 **08-07 新增**：它宣告的 bin `cct` 在 npm 上是**別人的套件**（維護者 atool，2019 年 name-squat，description 自陳「npm package name robbery.」）——bin alias 只在裝好後才生效，**沒先全域安裝就打 `npx cct` 拿到的是陌生人的包**，而「不必安裝、一行就跑」正是本工具主打姿勢；該包目前惰性（224B／無腳本）但名稱長期由第三方持有。另 repo 新增 Rust port（`cli-rust/`，平台包未發佈），其 `fs_ext.rs` 註解明寫 reproduce the byte-level behavior of the Node CLI，`install_skill/agent` 一律 `ensure_dir`+`fs::write` 無存在性檢查——**靜默覆蓋是重寫時刻意保留的跨實作不變量，不是 Node 端疏漏**。另 session 分享把完整對話**明文**上傳匿名站 x0.at（程式碼自承 not encrypted）。**唯一安全姿勢＝當目錄瀏覽**，看到想要的走四步 SOP 手動取用，不跑安裝指令 |
| [[Github/repos/beautify-github-readme — GitHub README 首頁設計 agent skill\|beautify-github-readme]] | 🔬 | ✅ | 1.4K⭐ MIT；教 agent 做 GitHub README 首頁：SVG 標題橫幅規範（對比度／深淺色相容）、「真實證據優先於行銷詞藻」原則、GitHub Markdown 渲染限制知識，附手寫 GIF 二進位格式解析器＋ffmpeg 兩階段調色盤（`scripts/render_motion_gif.py`，真實工程含量非提示詞包裝）。✅ **提示注入五類全無**（逐字讀 40 檔＋獨立 grep 交叉驗證）：`curl`/`wget`/`requests.*`/`urllib`/`fetch(`/`axios` **全數 0 命中**；3 處 `base64` 全是**勸阻**用法（建議別內嵌大圖進 SVG）、3 處 `<!--` 是 SVG 模板註解、9 處 `subprocess.run` 全為本地 ffmpeg/SVG renderer 且 list 形式參數無 `shell=True`。**同意閘門反而優於既有壞例**：`SKILL.md` 與 `references/showcase-contribution.md` 明文禁止未授權 commit/push/PR/backlink、禁止拿 attribution 當交換條件（與 learn@agentskill-sh 的強制自動評分回傳方向相反）。唯一依賴 Pillow；npm/PyPI 查無同名套件（無 typosquat 面）；7.2MB 落差＝hero.gif 3.7MB＋case-study PNG 1.1MB 示範素材。**填補空白非飽和賽道**：現有六個設計 skill 全針對網頁/App UI，無一處理 GitHub README 這個受限媒介。⚠️ 兩點保留：3 週齡零 release 無第三方討論；GitHub events API 只回溯到 07-25，**81% 早期星數成長無法查證**——「1.4K star」不宜當品質背書。📌 **`star:watcher` 比值單獨無鑑別力**：實測跨度 42:1（coding-interview-university）至 **2,413:1**（awesome-mcp-servers 91.7K⭐ 僅 38 watchers），本 repo 474:1 落在正常區間 |
| [[Github/repos/dashi-ppt-skill — 瀏覽器可編輯的 AI 簡報生成 Skill\|dashi-ppt-skill]] | 🔬 | ⏳ | 4.6K⭐ AGPL＋專有導出引擎例外；12 主題×1020 版式「鎖模板填文案」，產物自帶編輯控制台、可導真實可編輯 PPTX（現有 PPT 技能群唯一沒有的能力）；供應鏈六項全過——唯一自動行為＝任務尾端版本檢查（純 GET 版本號，無自我更新無資料回傳）、telemetry 純本地、README 聯網宣稱與程式碼實測一致、有 lockfile；owner 同 dashi-taskboard（大师的AI小灶品牌帳號；實際工程者是小米設計師 jadon7，391/394 commits ＋ npm maintainer）；⚠️ 預覽服務預設 bind 0.0.0.0（LAN 可見，`DASHI_PPT_PREVIEW_HOST` 可收斂）、npm 0.4.5 落後 GitHub 0.4.11 六個 patch、10 頁≈10 萬 token 重成本、觸發詞與 html-ppt/guizang-ppt 正面相撞；升級條件＝出現「交付可編輯 PPTX 給他人自改」場景 |
| [[Github/repos/human-writing — 讓 AI 寫的中文有活人感的通用創作改稿 Skill\|human-writing]] | 🔬 | ✅ | 961⭐ MIT；中文寫作 skill，作者即 19.2K⭐ khazix-skills 的「數字生命卡茲克」，本 repo 是其 khazix-writer 去人格化後的通用版（SKILL.md 明寫不建作者畫像）。**真正增量是帶可執行驗收器**：`check_prose.py` 639 行純標準庫、零網路零相依，三層設計（硬禁令 FAIL／疑似項警告／句長變異係數＋連詞密度統計），實測壞樣本 exit=1 逐條列行號、自然中文對照組 exit=0 僅一條可接受警告——與本環境「驗收腳本要先跑出 FAIL 才算成立」同構，這是它勝過已裝 stop-slop 的地方。規則層兩個亮點：①**材料門檻**——非虛構長文破 1200 字前須內部列出五件具體材料並註明來路，列不出只能研究／一次問完三題／縮成 600 字短答，直接擋掉「三個抽象觀點各解釋五遍」②**1.1.0 把禁令從字串上移到修辭動作**——不再禁「不是……而是……」的字面，改禁「先替讀者立一個他沒有的誤解再推翻它抬價」這個動作，九種外衣只當舉例不當邊界。另附 2000 字蒸餾版可貼進 ChatGPT／千問。供應鏈六項全過（無相依／無網路／無 eval-exec-subprocess／不寫檔／MIT／SKILL.md 零自動行為）。🪟 **Windows 必加 `PYTHONIOENCODING=utf-8`**，否則腳本印中文即 cp950 崩潰。⚠️ 保留兩點：建立僅一天、7 commits、單一作者，介面可能再變；本次量的是 linter 準確度，**未量「掛與不掛 SKILL.md 的產出差多少」**，規則層增量待實寫長文驗證。星數一日破 961 屬 KOL 分發（作者 2,856 followers）非異常，但 stargazers API 本環境恆 404，星標時序未能驗證 |

---

## 🔮 命理（八字 / 紫微 / 人類圖 / 占星 / 六爻）（11 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/OpenFate Bazi MCP — 八字四柱確定性排盤 MCP 伺服器\|OpenFate Bazi MCP]] | 📎 | ✅ | 八字排盤 MCP |
| [[Github/repos/Retsomm SelfMap 人類圖計算器 - Next.js + Swiss Ephemeris WASM\|SelfMap 人類圖]] | 🔬 | 📌 | Next.js + Swiss Ephemeris |
| [[Github/repos/從人類圖找到你人生地圖\|人生地圖]] | 🔬 | 📌 | 人類圖導向 |
| [[Github/repos/一個基於 Python Flask 和 pyswisseph 的專業人類圖計算工具，提供精確的天文計算和完整的 Web 界面。\|Flask 人類圖計算]] | 📎 | 📌 | Python 計算工具 |
| [[Github/repos/命運手記 Fate Notes — 紫微斗數 × 八字 × 人類圖 × 星座 AI 多系統交叉命理分析\|Fate Notes]] | 📎 | ⏳ | 多系統交叉分析 |
| [[Github/repos/以「人生羅盤」為中樞、整合四系統的個人解讀報告——內容不預言你的未來，只幫你看清原廠設定與行動選項。四系統交叉驗證：紫微、八字、占星、人類圖同時入列，避免單一視角誤差。\|人生羅盤]] | 📎 | ⏳ | 四系統交叉報告 |
| [[Github/repos/Renhuai123ziwei-doushu — 倪海夏天紀體系紫微斗數引擎\|ziwei-doushu（倪海夏）]] | 🔬 | 📌 | 天紀體系排盤 |
| [[Github/repos/ruijayfengziwei — 現代化紫微斗數命盤分析工具\|紫微知道]] | 📎 | 📌 | 現代化紫微 |
| [[Github/repos/Madison-de-Chao-rainbow-sanctuary-report-site — 命理解讀報告銷售落地頁\|Rainbow Sanctuary]] | 📎 | 📌 | 命理報告落地頁模板 |
| [[Github/repos/zhenheco-life-chart-engine — 三合一原生排盤引擎（西洋星盤×人類圖×紫微斗數）\|life-chart-engine]] | 🔬 | ✅ | 三系統 deterministic 引擎；astronomy-engine+iztro；CLI+JSON 供 agent；對口 hd-decode/ziwei/fate |
| [[Github/repos/I-ching — 納甲六爻占卜起卦引擎\|I-ching（六爻）]] | 🔬 | ⏳ | 0⭐ 個人專案；納甲六爻**占卜起卦**引擎（補命盤棧缺的占卜分支），sxtwl 節氣精確+deterministic 查表，Vercel/Eel/exe 三形態；⚠️無 LICENSE 不可直接複用 |

---

## 💰 投資 / 金融（9 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/FinanceDatabase — 30萬金融商品分類資料庫\|FinanceDatabase]] | 🔬 | ✅ | 8.2K⭐ 30萬+金融商品分類目錄（股/ETF/基金/指數/幣）+輕量pandas查詢；社群CSV維護；`.to_toolkit()`接FinanceToolkit；與jane-finance互補（宇宙vs觀點）；**已裝C:\Python314**（+FinanceToolkit）；台股本地1347檔權值9/10（缺2330.TW台積電） |
| [[Github/repos/ai-berkshire — AI 時代的價值投資研究框架\|ai-berkshire]] | 🔬 | ✅ | 四大師 18 Commands |
| [[Github/repos/xbtlin-ai-berkshire\|xbtlin-ai-berkshire（原始分析）]] | 🔬 | ✅ | 同上初版 |
| [[Github/repos/開源版金融終端機 Fincept Terminal\|Fincept Terminal]] | 📎 | ⏳ | 開源金融終端 |
| [[Github/repos/best-of-algorithmic-trading Collections\|best-of-algo-trading]] | 📎 | 📌 | 演算法交易資源 |
| [[Github/repos/machine-learning-for-trading — ML4T 第三版機器學習交易全流程\|ml4t 3rd ed]] | 🔬 | ⏳ | 19.7K⭐ 量化 ML 教科書配套；9 case study 同一 pipeline；61 護欄化 agent skills 值得偷 |
| [[Github/repos/daily_stock_analysis — LLM 驅動的多市場股票每日分析與推送系統\|daily_stock_analysis]] | 🔬 | ⏳ | 59K⭐/**50.5K fork**（比值 0.86＝典型 fork-to-run）；fork 完設 Secrets 就跑在 GitHub Actions 上，每交易日推「決策儀表盤」到飛書/TG/Discord/Slack/Email；多 Agent pipeline（Technical→Intel→Risk→Decision）＋`disagreement.py` 把 Agent 分歧結構化、risk 有 override 權；15 種 YAML 策略＋17 個資料源；**台股一等支援**（`.TW`/`.TWO` suffix-only、XTAI 日曆、三大法人 TWSE T86+TPEx OpenAPI）但明確不承諾即時行情/大盤複盤/自動補全；⚠️ README「推薦」供應商全帶推廣碼且為贊助商、免費源不保證穩定、安全 issue #1970 未關 |
| [[Github/repos/chokepoint-atlas — AI 供應鏈卡點美股研究方法論 Skill\|chokepoint-atlas]] | 🔬 | ⏳ | 42⭐ 卡脖子美股战法 Skill；證據四級標籤＋卡點 stack＋五維打分；與 jane-finance 鏡頭互補；⚠️無授權檔+領域窄+停更，抽「證據標籤」機制即可 |
| [[Github/repos/hugohe3-ppt-master\|ppt-master（AI Berkshire）]] | 🔬 | ⏳ | 名為 ppt-master 實為 AI Berkshire 投資研究 skill 合集鏡像（與 xbtlin/ai-berkshire 同源，MIT）；18 skills 四大師視角並行、鏡子測試強制表態；按需取用單一 skill 不整包裝 |

---

## 💼 求職（3 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/career-ops — AI 驅動求職自動化指揮系統\|career-ops]] | 🔬 | ✅ | v1.13.0 A-F 評估 + Go TUI |
| [[Github/repos/jobsmith — 台灣求職 AI 多代理 Co-Pilot\|jobsmith]] | 📎 | ✅ | 14 Agent LangGraph |
| [[Github/repos/ai-job-search — Claude Code 原生的本機求職應徵框架\|ai-job-search]] | 🔬 | ⏳ | 20.4K⭐ 4個月新；Claude Code 原生 Skills/Commands 求職模板，LaTeX PDF 校對+ATS驗證是差異化亮點；丹麥市場限定+需LaTeX工具鏈，先觀望 |

---

## 🎬 影片 / 媒體 / 音樂（17 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/capcut-mate — 開源剪映草稿自動化REST API\|capcut-mate]] | 🔬 | ⏳ | 1.4K⭐ 剪映草稿自動化 REST API（FastAPI，~35端點+雲渲染），建於 pyJianYingDraft；讓 LLM/Coze/n8n 程式化剪片；與 vak 互補（API vs 本機草稿）；綁剪映生態故觀望 |
| [[Github/repos/seedance-2.0 — 導演式操作Seedance影片模型的Skill OS\|seedance-2.0]] | 🔬 | ⏳ | 5K⭐ 導演式操作 ByteDance Seedance 2.0 影片模型的 28-skill 包（MIT）；directing-engine+126 evals+6語詞彙；與 video-shotcraft 同構但強綁生成模型；版號治理不一致(gh v5.3 vs skill v6.6) |
| [[Github/repos/video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架\|video-autopilot-kit]] | 🔬 | ⏳ | 1.6K⭐ MIT；**08-03 二次分析更新至 v0.11.0**。三條同構生產線（教學長片／直式 Shorts／線上訪談）：知識層→機械閘門→一鍵驅動；gate_core.py 統一 report/assert/selftest 外殼但判定規則不集中。115 檔 419K tokens，**53 支 .py 對 57 份 .md**（方法論是第一級交付物）。**供應鏈五項全清**：零網路呼叫（所有 http 字串皆為文獻出處）、無 eval/exec/pickle、subprocess 全指向 ffmpeg/ffprobe、**無 requirements/pyproject/CI 腳本**（無可被投毒的相依清單）。v0.11 主軸是「把借來的數字清出去」：詞表出貨即空、門檻標明為範例校準值、合規法源逐條標 [official]/[reported]/[speculative]。⚠ 風險：**單人維護 + 兩個月新專案 + 歷史僅 2 筆 issue**（1,580⭐ 與互動量落差大，多數人是收藏非使用）；WebSearch 查無任何第三方評測。star:watcher 527:1 依實測基準無鑑別力，不當紅旗。**📌 可單獨抽取**：gate_core.py 純 Python 可單檔複製；teardown.py 的節奏量測半邊；OCR 能力邊界寫死在原始碼防誤用的寫法 |
| [[Github/repos/video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill\|video-shotcraft]] | 🔬 | ⏳ | 337⭐ Claude Code/Codex agent skill；106 鏡頭配方卡+161 動態樣片+Ink Press 模板；Remotion+真實截圖+2.5D 運鏡+節奏卡點；方法論與 institution R13/R17 同構；與 HyperFrames 重疊需釐清 |
| [[Github/repos/video-use — 用 Coding Agent 剪影片的 Claude Skill\|video-use]] | 🔬 | ⏳ | 18.7K⭐ MIT；browser-use 團隊出的 **Claude Skill**（32 檔／67K tokens，6 支 helper + SKILL.md）。核心主張「LLM 不看影片，它讀影片」：ElevenLabs Scribe 詞級逐字稿打包成 ~12KB takes_packed.md 當主要閱讀面，timeline_view PNG 只在決策點呼叫（宣稱把 45M tokens 的幀噪音壓成 12KB）。**12 條硬規則**每條都附「否則會發生什麼靜默失敗」（字幕最後上／-c copy 串接／30ms fade／setpts 位移／不切字中間），外加 render 後對每個切點自我評估、上限重修 3 次。與 video-autopilot-kit 是同題反向解法（那邊機械閘門 assert，這邊規則交給 agent）。供應鏈清：唯一對外呼叫是 ElevenLabs STT、無 eval/exec、setup.sh 只做環境檢查。⚠ 三個具體阻礙：①**Windows 實質未支援**——`FONT_CANDIDATES` 只有 mac/Linux 路徑，全 miss 後退到點陣字，CJK 全豆腐（已逐行驗證）②原始音訊（含 NG）全上傳 ElevenLabs、需付費 key ③**維護停滯**：零 release、45 open PR 對歷史僅 9 次合併、最後推送一個月前。**📌 可單獨抽取**：「規則＋違反後的靜默失敗現象」這個寫法可借進 institution；render.py 的濾鏡順序（抽段→copy 串接→overlay→字幕最後） |
| [[Github/repos/voicebox — 本機優先的開源 AI 語音工作室\|voicebox]] | 🔬 | ⏳ | 37K⭐ 本機 TTS+語音克隆+口述輸入，MCP server 讓 Claude Code 開口說話 |
| [[Github/repos/calesthio-OpenMontage\|OpenMontage]] | 🔬 | ⏳ | 44K⭐ AGPL-3.0；**agent 即 orchestrator**（無程式碼 orchestrator），7 道工序寫成 YAML manifest + Markdown 導演技能檔。1,887 檔/3.08M tokens：`.agents/skills/` 860＋`.claude/` 431＋`skills/` 156＋`tools/` 144＋77 pytest＋24 schema；README 數字對帳**全數屬實**（723 skill 檔／12 pipeline）。真差異點是 `documentary-montage` 用 CLIP 檢索 Archive.org/NASA/Wikimedia **真實動態素材**剪時間軸，非靜圖假動畫；零 key 可跑（Piper＋免費素材＋Remotion/HyperFrames），$0.02–$1.33 皆有附紀錄範例。⚠️ **正版 repo 從未發過 release**，冒名組織 `Open-Montage/OpenMontage` 散布 `OpenMontage-x64.7z`（358 次下載、Defender 判 Trojan），同名 repo 20+，只認 `calesthio` owner。判 ⏳ 三阻礙：Windows+WSL2 有「6 小時 15 個問題產不出成品」實測回報、0 release/148 open PR/單人 70% commit、48 個 `.claude/skills/` 與既有 user-level hyperframes/remotion 系列重名。外部驗證薄（HN 5 篇最高 7 分）。**📌 可單獨抽取**：`lib/scoring.py` 7 維 provider 選型＋`explain()`、`lib/delivery_promise.py`＋`slideshow_risk.py`（宣稱 vs 實產落差偵測＝R12 可執行版）、`base_tool.py` 的 cp1252 降級表 |
| [[Github/repos/AIDC-AIPixelle-Video 🚀 AI 全自动短视频引擎  AI Fully Automated Short Video Engine\|Pixelle-Video]] | 📎 | ⏳ | 全自動短影片 |
| [[Github/repos/(參考)Winston774ai-music-channel-starter 半自動 AI 音樂 YouTube 頻道 Pipeline\|ai-music-channel]] | 📎 | 📌 | AI 音樂 YouTube Pipeline |
| [[Github/repos/RedditVideoMakerBot — Reddit 串文自動轉短影片機器人\|RedditVideoMaker]] | 📎 | 📌 | Reddit 轉短影片 |
| [[Github/repos/Remotion — 用 React 寫程式碼產生影片\|Remotion]] | 📎 | 📌 | React 產生影片 |
| [[Github/repos/ReClip — 自架開源影片音訊下載工具\|ReClip]] | 🔬 | 📌 | 影片音訊下載 |
| [[Github/repos/music-assistant-server — 開源家用音樂串流管理器\|music-assistant]] | 📎 | ⏳ | 106 providers 音源整合 |
| [[Github/repos/LongCat-Video — 美團 13.6B 開源長影片生成模型\|LongCat-Video]] | 🔬 | ⏳ | 5.7K⭐ **MIT 權重可商用**；美團 13.6B dense DiT，T2V/I2V/影片續寫統一在單一模型。真差異點不是畫質是**長度**——原生以續寫任務預訓練，分鐘級無色偏無衰減。自寫 Triton Block Sparse Attention（含 TMA autotune）＋Ulysses context parallel＋INT8 weight-only 量化；VAE 承自阿里 Wan（`autoencoder_kl_wan.py` 檔名直接洩漏血統）。40 檔推論倉庫，**無訓練/微調程式碼**。⚠️ **供應鏈**：`requirements_avatar.txt` 釘的 `libsndfile1==0.0.1` 在 PyPI 根本不存在（apt 套件誤植）、`tritonserverclient==0.0.6` 發行檔 0 個且 metadata 標 **`quarantined`**（正確名為 `tritonclient`）→ `pip install` 直接失敗，issue 開 7 個月未修；照抄該行＝dependency-confusion 形狀，解法是刪兩行改 conda 裝 libsndfile。**評測誠實**：README 自列 I2V Overall 3.17 四者墊底、T2V 輸 Veo3（但為內部自評 MOS 非盲測）。判 ⏳：需 24GB+ NVIDIA 卡（**官方完全沒寫 VRAM 需求**，流傳數字皆第三方未驗證）、Windows 無支援、0 release／2 個月停更／62 issue 混雜垃圾貼。**真正採用路徑是 ComfyUI 生態**（教學 8.2 萬觀看，遠超 repo 本身；HN 僅 3 分）。**📌 可單獨抽取**：`quantization.py` 教學級 INT8、`block_sparse_attention/` Triton kernel、arXiv 2510.22200 ＋ 2605.26486 |
| [[Github/repos/zarazhangruifollow-builders AI builders digest — monitors top AI builders on X and YouTube podcasts, remixes their content into digestible summaries. Follow builders, not influencers\|follow-builders]] | 📎 | 📌 | AI Builders 摘要推送 |
| [[Github/repos/roboflowsupervision We write your reusable computer vision tools. 💜\|supervision]] | 📎 | 📌 | 電腦視覺工具庫 |

---
| [[Github/repos/chatgpt-video-editing-skills — 繁中八步短影音剪輯安全 skill|chatgpt-video-editing-skills]] | 🔬 | ⏳ | 188⭐ MIT繁中；把「使用者自拍影片→ 9:16 直式短片」拆成兩 skill：setup（只檢查/裝/驗證環境，不上傳不剪）＋editor（八步：素材檢查→逐字轉寫→內容整理→剪輯策略（先給白話策略等核准）→粗剪→字幕→720p 預覽→QA 正式）。**賣點不是功能是安全工程**：逐檔讀 runbook/security 全清——來源全釘官方 HTTPS（字體 `curl -fL --proto '=https'`、LFS-skip、frozen-lockfile、隔離 npm cache）、憑證 check-ignore→拒 symlink→chmod 600→stat 複驗、非 git worktree 新檔一律 hard stop、每個 mutation/上傳/付費都要顯式核准、原檔零破壞、**未驗證不得稱完成**（R17 教科書級）——與 reverse-skill 強制自注入正好相反。判 ⏳：①需求不存在（已裝 HyperFrames 群＋claude-real-video＋hyperframes-media，但**剪真實素材成 Reels** 無在跡任務，R13）②硬依賴重：browser-use/video-use 完整 repo＋uv＋ElevenLabs Scribe v2 **付費**憑證，選用動畫還要 Node22＋Bun ③太新太小（2.7 週/單人/無 release/社群零訊號）。升級條件＝真出現剪自拍素材成繁中直式短片的重複任務（個人品牌/求職自介短片）且願設 video-use＋ElevenLabs；放棄＝上游持續静默（已 2 週無 commit）或 video-use 上游改動使 runbook 失效。**📌 可單抽**：security-and-verification 的憑證處理範式、output-contract 的「未驗證不得稱完成」契約，當安全 skill 範本 |

## 🧰 開發工具 / CLI（20 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/claw-code — Claude Code 外洩事件催生的 Rust 重寫版\|claw-code]] | 🔬 | ❌ | 195K⭐ MIT；**Claude Code source map 外洩（逾 50 萬行）的衍生產物**——Sigrid Jin 用 Codex 依架構重寫、一天破 10 萬星，Anthropic 提 8,100+ 件 DMCA（後收斂近百件精準鎖定）；作者宣稱無專有檔案，但「重寫是否構成衍生著作」未經裁判。crate 真名仍是 `rusty-claude-cli`。**作者已親自封為「博物館展品」**：README 首段就要你改用 LazyCodex/Gajae-Code，06-26 起停更、近四週 commit 0、0 release、雙人貢獻者佔 70%。339 檔/1.21M tokens，11 crate（含 `claw-analog` 唯讀 CI 殼、`claw-rag-service` SQLite 語意檢索、`compat-harness` parity 對拍）；`main.rs` 75.6 萬字元＋第二大檔是 commit 進庫的 agent 對話 JSON（10.2%）＝**agent 生成程式碼的指紋**。判 ❌ 三獨立理由：作者自我下架／要 API key 計費不吃訂閱（對訂閱者嚴格更差）／**安全治理實質失效**（HIGH 揭露卡在關閉的 PVR 兩週無回應、Medium 越界讀取 main 上未修、0 advisory，而它會跑 bash＋掛 MCP＋存取整個工作區）。fork/star 56% 異常已解釋＝「趁還在趕快留一份」，抽樣 100 個 fork 全 0 星未修改且至今每天仍增 2–5 個。⚠️ `cargo install claw-code` 是廢棄 stub，指向的 `agent-code` 屬**另一個 org**（avala-ai）。**📌 真正該追的是活體後繼**：oh-my-openagent 66.8K⭐、oh-my-claudecode 38.2K⭐、clawhip 922⭐（通知路由推出 context window，與 R16 同題）；oh-my-codex 32.3K⭐ **無 LICENSE 先別碰** |
| [[Github/repos/mimic — 攔截App流量AI生成Python client\|mimic]] | 🔬 | ⏳ | 1.4K⭐ Deno作者8天衝榜；抓App流量→claude生成可重放Python client；QA領域相關（手動→回歸腳本）；DPoP無解；限自己帳號/ToS |
| [[Github/repos/crawl4ai — 開源 LLM 友善網頁爬蟲與擷取框架\|crawl4ai]] | 🔬 | ⏳ | 72.1K⭐ 自架開源網頁爬蟲，免 API Key，官方附 Claude Skill + MCP Bridge；與 firecrawl（SaaS）互補 |
| [[Github/repos/tw93-Pake\|Pake]] | 📎 | ✅ | 網頁轉桌面 App（Tauri） |
| [[Github/repos/Headroom — AI Agent Context 壓縮層\|Headroom]] | 🔬 | ✅ | AI context 壓縮 60-95% |
| [[Github/repos/PixelRAG — 像素原生 RAG，截圖讓 AI 用視覺讀網頁\|PixelRAG]] | 🔬 | ✅ | 截圖讓 AI 視覺讀取 |
| [[Github/repos/yamadashyrepomix 📦 Repomix is a powerful tool that packs your entire repository into a single, AI-friendly file. Perfect for when you need to feed your codebase to Large Language Models (LLMs) or other AI tools like Claude, ChatGPT, DeepSeek, P\|Repomix]] | 📎 | ✅ | Repo 打包 AI 分析 |
| [[Github/repos/gitreverse — GitHub Repo 逆向工程成 Prompt\|gitreverse]] | 📎 | ⏳ | Repo 逆向成 Prompt |
| [[Github/repos/issue_tmp — GitHub Issue  PR 模板套件\|issue_tmp]] | 📎 | ⏳ | 繁中 Issue/PR 模板 |
| [[Github/repos/Use claude-code for free in the terminal, VSCode extension or discord like OpenClaw (voice supported)\|OpenClaw]] | 📎 | ✅ | 免費 Claude Code |
| [[Github/repos/farion1231cc-switch A cross-platform desktop All-in-One assistant tool for Claude Code, Codex, OpenCode, openclaw & Gemini CLI\|cc-switch（桌面版）]] | 📎 | ⏳ | 跨平台模型切換 |
| [[Github/repos/codebase-memory-mcp — 高效能程式碼知識圖譜 MCP 伺服器\|codebase-memory-mcp]] | 🔬 | ⏳ | 19.5K⭐ 158 語言知識圖譜 MCP |
| [[Github/repos/free-for-dev — 開發者免費 SaaS 資源清單\|free-for-dev]] | 🔬 | 📌 | 126K⭐ 61 分類 1226 個免費 SaaS 服務清單 |
| [[Github/repos/CLIProxyAPI — 訂閱帳號包成 OpenAI 相容 API 的多帳號閘道\|CLIProxyAPI]] | 🔬 | ⏳ | 40.7K⭐ Go 代理把 Claude Code/Codex/Gemini/Grok 訂閱 OAuth 包成 OpenAI 相容 API+多帳號 round-robin；生產級架構+龐大衍生生態，⚠️訂閱當 API 違 ToS 帳號恐被封 |
| [[Github/repos/fitnesse — 把驗收測試寫成 Wiki 表格的 ATDD 老牌框架\|fitnesse]] | 🔬 | ⏳ | 2.1K⭐ Uncle Bob 2003 年 ATDD 老牌；wiki 表格即可執行測試（DecisionTable/ScriptTable）+ SLIM 跨語言 fixture 協議；維護模式、採用僅 Robot Framework 1/10，但單 jar 30 分鐘可試玩，決策表窮舉法直接可用於手動測試設計 |
| [[Github/repos/resume-skills — 跨 AI Agent 的離線 session context 遷移工具（8×8）\|resume-skills]] | 🔬 | ⏳ | 24⭐ 6天新；把 Claude/Codex/Cursor 等 8 家本機 session 紀錄抽成惰性交接摘要餵給另一家新 session（非 live restore）；Python stdlib-only 全離線、274 測試、STATUS.md 逐項標 not-done 誠實度罕見；填「跨 host context 遷移」空白（現靠手寫 .ai/tasks）；**⚠️ CI 無 Windows** 且作者自承 Windows 安裝缺鎖→暫不裝，handoff-policy 六條可先抄進派工模板 |
| [[Github/repos/cli-printing-press — API spec 自動生成 Go CLI 工具\|cli-printing-press]] | 📎 | ❌ | 給 API spec（或自動嗅探）生成 Go CLI，30+ 內建 catalog、附 7 個 Claude Code skills；判 ❌：輸出 Go 程式碼與本環境 Python 棧不合，臨時 API 呼叫讓 Claude 寫 Python script 更快 |
| [[Github/repos/googleworkspace-cli — 一支 CLI 打通全 Google Workspace（含 95 個 Agent Skills）\|googleworkspace-cli]] | 🔬 | ⏳ | 30.1K⭐ Apache-2.0 Rust；掛官方 org 但 README 明文「not officially supported」（DevRel 專案，npm 由 google-wombot 官方 bot 發布）。**動態指令面**：runtime 讀 Discovery Service 生成全部指令，Google 加端點自動長出；**95 個 SKILL.md** 隨附（Gmail/Drive/Calendar/Sheets＋workflow 型＋ModelArmor prompt 消毒），`npx skills add` 直裝 Claude Code。✅ 供應鏈乾淨：postinstall 逐字審過（GitHub Releases 下載＋**SHA256 強制驗證**）、npm 包零依賴、CI 有 cargo-audit/deny；⚠️ `gws-shared` skill 內建「鼓勵 agent 催 star」條款（AgentKey 同型、烈度低）。**關鍵警訊：human commit 停在 2026-03-31**（3 月爆紅連發 8 版→熄火 4 個月，只剩 bot 再生 skills），116 open issues 含 auth 級 bug（憑證解密失敗被靜默刪除 #886、gmail +read 丟本文 #889）無人修。Reddit 有真用戶見證（Claude Code＋gws 做 Gmail triage/自動回信/發票）。判 ⏳：升級＝求職大量投遞期需要 Gmail triage 時裝＋實測 auth；放棄＝2026-10 前仍零人力 commit |

| [[Github/repos/qrs — 用連續 QR Code 串流傳檔的離線傳輸工具\|qrs]] | 🔬 | ⏳ | 1.6K⭐ MIT（antfu 等 Vue/Vite 核心實名參與）；LT 噴泉碼把檔案切塊、20fps 連播 QR 由相機接收還原，無網路無配對。✅ 供應鏈五項全綠且「資料不離開瀏覽器」是**驗證過**的——`fetch`/XHR/WS/sendBeacon/analytics 全零命中，`ssr:false`＋靜態託管**部署形態上就沒有能收檔的後端**。⚠️ 效能比想像慢一個數量級：專案自身測試斷言傳輸開銷 1.8–2.5 倍，淨吞吐僅 8–11 KB/s、實務上限 1MB（根因是用 Ideal Soliton 而非 Robust Soliton）；`pushedAt` 2026-03 是假訊號（只改 LICENSE 年份），**功能性開發停在 2025-02**，npm 週下載 6 次。**價值在讀不在裝**：動態 QR 串流正是硬體錢包氣隙簽章（Keystone/Passport 的 BC-UR `ur:crypto-psbt`）標準做法，對 Web3/CEX 託管 QA 有直接知識價值。同賽道對照 [[Github/repos/decimen-optical-transfer — 噴泉碼動畫 QR 螢幕對相機傳檔 PoC\|decimen]] |
| [[Github/repos/decimen-optical-transfer — 噴泉碼動畫 QR 螢幕對相機傳檔 PoC\|decimen-optical-transfer]] | 🔬 | ⏳ | 2.1K⭐ MIT；螢幕播動畫 QR、相機接收，LT 噴泉碼實作紮實正確（robust soliton CDF＋splitmix32＋partial Fisher–Yates）。最見功力：因 `Math.log` 在 JS 規範是「實作近似」，V8（發送）與 JavaScriptCore（iPhone 接收）差一個 ulp 就會讓 soliton 分布靜默 desync，作者自寫只含精確 IEEE-754 運算的確定性 log。✅ 供應鏈五項全綠（零 postinstall、6 顆 devDeps 實查存在、**全 repo 僅一處 `fetch()` 且參數是寫死的本地示範圖**）。⚠️ **最大落差：沒有檔案選擇器**——grep `type=file`/`FileReader` 全零命中，只能傳內建的兩張示範 PNG、接收端亦無下載連結，是傳輸層 demo 非可用工具。「2 天帳號 2,051 星」已查證為自然流量（r/vibecoding 5,622 讚貼文，作者自述 Claude Code 一晚 vibe-code），非灌量。可帶走的是 fountain.ts 參考實作＋README 的瀏覽器硬傷清單。對照 [[Github/repos/qrs — 用連續 QR Code 串流傳檔的離線傳輸工具\|qrs]] |
---

## 📊 AI/ML 模型（7 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/TimesFM — Google 時間序列基礎模型\|TimesFM]] | 📎 | ⏳ | Google 時間序列 |
| [[Github/repos/RLM — 遞迴語言模型推理框架\|RLM]] | 🔬 | ⏳ | 遞迴推理 |
| [[Github/repos/Breeze-ASR-25 — 台灣中文中英混用語音辨識模型\|Breeze-ASR-25]] | 📎 | ⏳ | 台灣中文語音辨識 |
| [[Github/repos/HKUDSLightRAG — 知識圖譜增強 RAG 框架\|LightRAG]] | 🔬 | ⏳ | 知識圖譜 RAG |
| [[Github/repos/exo-exploreexo Run frontier AI locally\|exo]] | 📎 | 📌 | 多裝置組 AI cluster |
| [[Github/repos/Chandra OCR 2\|Chandra OCR 2]] | 📎 | 📌 | PDF/掃描→Markdown |
| [[Github/repos/VibeVoice — 微軟長音檔語音 AI 家族（TTS 已下架、ASR 仍在推進）\|VibeVoice]] | 🔬 | ⏳ | 50.8K⭐ MIT／微軟研究院；核心是 **7.5 Hz 超低幀率連續語音 tokenizer**（聲學+語意雙路）＋next-token diffusion（Qwen2.5 主幹 + diffusion head），換來長序列能力：TTS 側 90 分鐘 4 人 podcast（ICLR 2026 Oral）、ASR 側**單次吞 60 分鐘音檔**直出「誰／何時／說什麼」結構化逐字稿＋自訂 hotwords，50+ 語言。**⚠️ repo 只剩半套**：2025-09-05 微軟以「被用於偏離原意用途」移除 TTS 安裝與使用文件（`docs/vibevoice-tts.md` 現只剩一行 *Disabled due to widespread misuse*），Large 權重 HF **實測 401**；但 1.5B 權重仍公開（57K 下載、`gated=False`）、模型類別也還在 repo 裡＝**官方封路、能力未封**。生態隨即繞道：VibeVoice-ComfyUI ⭐1.5K、audio.cpp C++/ggml 移植 ⭐983（RTX 5090 上 22.95 分產 93.6 分音檔，比 Python 快 2.86×）、Large 權重存 ModelScope 鏡像；Issue #95「MIT 授權下 out-of-scope 是什麼意思」仍 open 未回應。程式碼**已停滯**（最後 code commit 2026-05-06 修 CWE-502，之後只更 README news），核心模型零測試。**⏳ 因**需求未出現（現行單人講課影片 Whisper 已足夠，增量只在 diarization）＋7B 要 GPU（1 分鐘音檔就有人 OOM）＋免 GPU 的 BitNet 在另一 repo `VibeASR.cpp`（⭐50、要自 build C++）＋無 Claude Code 接口且轉錄位已被 hyperframes-media／claude-real-video 佔住＋治理風險已實證。**升級條件**＝出現需分人逐字稿的實際任務（訪談／多人會議／podcast），或 VibeASR.cpp 出 Windows 預編譯 binary；**放棄條件**＝至 2027-01 仍無 Windows 支援／停更，或 WhisperX diarization 接進現有流程即滿足，或微軟再次下架。**TTS 部分明確 ❌**（只剩非官方繞道，授權立場不明；要 TTS 用既有 Kokoro）。**📌 可單獨參考**：`modular_vibevoice_tokenizer.py`+`diffusion_head.py`+`dpm_solver.py` 是「超低幀率換長序列」可讀範例；`vllm_plugin/` 是自訂模型註冊成 vLLM general plugin 的完整範本 |

---

## 🎨 設計 / UI / 前端（13 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/awesome-design-skills — 67種美學風格的SKILL.md註冊庫\|awesome-design-skills]] | 🔬 | ⏳ | 1.9K⭐ 67 美學風格 SKILL.md/DESIGN.md 註冊庫（brutalism/glassmorphism/neon/retro…）；`npx typeui.sh pull`；與 awesome-design-md 互補（風格 vs 品牌）；靜態SKILL.md無法看codebase，按需pull即可 |
| [[Github/repos/Open Design — 開源版Claude Design讓CLI agent變設計引擎\|Open Design]] | 🔬 | ⏳ | 80K⭐ 開源版 Claude Design 桌面 app（Electron）；接你已裝 CLI(BYOK)當設計引擎產原型/簡報/影片；71 DESIGN.md+19 skills；nexu-io 是 hyperframes/html-anything vendor；曾移除2GB+CLI-first重疊故觀望 |
| [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫\|awesome-design-md]] | 🔬 | ✅ | **105K⭐**（07-29 回訪，初訪 93.5K／+12.5%）74 套品牌 DESIGN.md（檔名「73 套」為歷史遺留、內容本就 74）；每份 500–800 行十段結構，`Known Gaps`（自陳未覆蓋範圍）＋`Iteration Guide`（教 agent 往下推導）兩段是同類 token dump 沒有的。**回訪兩大發現**：①**已轉付費引流層**——README 品牌連結全改指 getdesign.md，官網 `/request` 私有 DESIGN.md **$59→$39**、LaunchKit **$299→$249**，宣稱「300+ 可請求」但那 300+ 不在免費 repo；**內容 commit 停在 06-08（7 週）而 300 張 open issue 幾乎全是無人處理的品牌請求**＝請求流被改道，別期待新品牌免費加入。②**`/design-fetch` 6 項對照失效（P1，**07-29 已修＋驗收 74/74→200**）**：`linear`/`opencode-ai`/`runway`/`the-verge`/`together-ai`/`xai` 全 404，正確為 `linear.app`/`opencode.ai`/`runwayml`/`theverge`/`together.ai`/`x.ai`（12 次實呼叫驗證），**linear 還是本頁第一推薦**——根因是上游用含點號真實網域名、skill 建立時寫慣用短名，屬淺探型盲區同族。**✅ 維持已裝但降預期**：免費 74 套 raw URL 實測仍 200、MIT 不變、與 awesome-design-skills（風格向）不重疊；放棄條件＝轉 archived／免費檔進付費牆（raw 開始 404）／授權改限制性。📌 十段結構可當「把視覺規範寫成 AI 可消費格式」的自用範本 |
| [[Github/repos/google-labs-code — Google Stitch + Jules 開源組織全覽\|google-labs-code]] | 📎 | ⏳ | Stitch + Jules 組織 |
| [[Github/repos/Stop-slop 寫作去除AI腔\|Stop-slop]] | 📎 | ✅ | 去 AI 腔寫作 |
| [[Github/repos/akseolabs-seocinematic-ui A reasoning-first cinematic web design skill. Makes AI think like a film director — research a real film, extract its visual language, translate it into page narrative and composition. Not a style picker. A director's w\|cinematic-ui]] | 📎 | 📌 | 電影導演思維 Web 設計 |
| [[Github/repos/不會設計也能做出專業級 App Store 截圖：一個 AI 驅動的截圖產生器\|App Store 截圖生成器]] | 📎 | 📌 | AI 截圖生成 |
| [[Github/repos/latentbox — AI 創意藝術精選資源導航站\|latentbox]] | 🔬 | ❌ | 2.2K⭐ AI/創意/藝術精選資源站；CC BY-NC-ND 禁衍生，僅供瀏覽參考 |
| [[Github/repos/galaxy — Uiverse.io 開源 UI 元件庫鏡像（3800+ CSS-Tailwind 元件）\|galaxy]] | 🔬 | ⏳ | 11.7K⭐ Uiverse.io 唯讀元件鏡像；3,804 個單檔 HTML+CSS/Tailwind 元件、MIT 可商用；鏡像停更 22 個月落後官網 2,000 元件；用時上官網複製即可，除非有離線批量餵 agent 需求才 clone |
| [[Github/repos/naiyue-cover-generator — Codex 用的文章封面與段內說明圖 Skill 組\|naiyue-cover-generator]] | 🔬 | 📌 | 3⭐ 2天新／1人／**無 LICENSE**；兩支 **Codex** skill：文章橫向封面＋段落說明圖（flow/timeline/decision-map/comparison/concept-diagram 五圖型）。主張「AI 只做視覺規劃＋整圖生成，Node 腳本負責可機械證明的部分」＋3-4 道人工門禁。**真正價值在反幻覺機制可移植**：review 綁內容 hash、`guard-*-attempt.mjs` 用檔案狀態擋無限重試、不可覆寫 attempt 快照（禁本地圖冒充 raw）、標題逐字比對（批准內容卡≠授權改標題）、拒絕從平台名推斷像素事實。⚠️ IP 素材權利不明需自換、綁 Codex 內建 image_gen（Claude Code 無等價）、硬綁專案根目錄名 |
| [[Github/repos/open-slide — Agent 原生 React 簡報框架\|open-slide]] | 📎 | ⏳ | 3.4K⭐ MIT；agent 寫 React 產 1920×1080 簡報：/create-slide 起稿、瀏覽器點選留言→/apply-comments 套改、presenter mode、匯出靜態 HTML/PDF；與 html-ppt/guizang-ppt skill 群同域 |
| [[Github/repos/shadcn-admin — Shadcn UI + Vite 管理後台介面集合\|shadcn-admin]] | 🔬 | ⏳ | 13.3K⭐ MIT；Shadcn UI + Vite + TanStack Router 的管理後台**成品 UI**（10+ 頁：儀表板/任務表/使用者/五種錯誤頁/五個設定頁/兩套 Auth），作者明言「非 starter template」——無後端、無 API、faker 假資料。**真正可搬的三塊**：`components/data-table/` 泛型表格六件套、`hooks/use-table-url-state.ts`（分頁/搜尋/多欄篩選雙向序列化進 router search params，重整不掉狀態，少見的原創邏輯）、`main.tsx` 把 401→清 token→存網址→導登入的流程集中在 QueryCache 層。272 檔/2.0MB 但**三張 PNG 吃掉 57% 體積**，實際程式碼僅 597KB；repomix 打包 264 檔 **166,716 tokens**，分佈極平坦（最大檔 `routeTree.gen.ts` 僅 3.8%、前五合計 12.2%）；21 個測試跑 Vitest **browser mode**（真 Chromium）非 jsdom。⚠️ **活躍度陷阱**：首頁 `pushedAt` 顯示 2026-07-21 是 dependabot 分支，**main 停在 2026-06-11、最後人工 commit 2026-04-21、距上次 release 9 個月**，只看首頁時間戳會高估。⚠️ **安全**：`auth-store.ts` 用 `document.cookie` 存 token、名稱寫死 `'thisisjustarandomstring'`、`cookies.ts` 無 Secure/SameSite/HttpOnly——示範無害，沿用到真 JWT 就是 XSS 取 token 入口。bus factor=1（作者 87% commit）。⏳ 理由：價值一次性（用到再抄不必常駐）＋維護停滯＋不能當產品骨架。升級條件＝有 Vite+TanStack Router 的後台實案（ziwei/fate/jobsmith 加管理介面）；放棄條件＝archived／Shadcn 官方 blocks 補上資料表／2027-02 前仍零人工 commit。⚙️ 初次分析時本機 npx 遺失（nvm4w junction 指向殘缺的 node v24.19.0），走 Trees+Contents API；npx 修復後已補跑 repomix 回填 token 數 |
---
| [[Github/repos/make-interfaces-feel-better — UI 細節打磨的 agent skill|make-interfaces-feel-better]] | 🔬 | ⏳ | 2.8K⭐ MIT；純文件 skill（47KB / 11 檔全 Markdown），19 條帶具體數值的前端打磨原則（同心圓角、按壓 scale 一律 0.96、圖示 blur 4px→0、bounce 永遠 0、點擊區 44×44）。**真正差異點不是原則而是審查協議**：quick/full 雙模式、發現數上限 5/15、五類別「實際檢查了什麼證據」覆蓋表（明文禁止暗示未檢查的面向已審）、強制列「Considered but Rejected」、沒跑的檢查標 Not verified、最後給 Block/Needs-changes/Approve 判決——與本環境 R17 交付契約同構。架構上是漸進揭露範本（SKILL.md 只留判斷，recipe 下放五個子檔）。判 ⏳ 三條：①本機已裝 8 個同域 skill，其中 `emil-design-eng` 連「必須用 Before/After 表格、禁止分行寫」這條格式規約都一字不差重複（同一批設計工程共識）；②description 約 580 bytes≈145 tokens，清單預算 Σ=4,718/5,000 實測，裝入後餘裕從 282→137 tokens；③MIT 可直接拄審查協議進既有 skill 不必整包裝。升級條件＝跟 `emil-design-eng` 對同一份程式碼並排實測，贏了就**取代**不並存；放棄條件＝協議已拄完用得順／至 2026 年底仍零 release 單人零外部 PR。⚠️ bus factor 1、零 tag 無版本可釘、0 issue/0 PR、stargazers API 本環境普遍 404 故星數成長未能驗證 |

## 📚 學習 / 教程 / RAG（11 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/graphrag — 微軟知識圖譜 RAG 管線\|graphrag]] | 🔬 | ⏳ | 34.7K⭐ 知識圖譜RAG（Leiden社群+分層摘要）；索引成本是頭號痛點；gbrain規模用不到，升級條件=全局問題痛點/LazyGraphRAG併入 |
| [[Github/repos/ai-engineering-from-scratch\|ai-engineering（repos版）]] | 📎 | 📌 | 20 phase AI 工程課 |
| [[Github/repos/(選讀)rohitg00ai-engineering-from-scratch — 從零開始 AI 工程師完整課程（20 phases）\|ai-engineering（選讀版）]] | 📎 | 📌 | 同上詳細版 |
| [[Github/repos/data-engineer-handbook — 資料工程完全學習手冊\|data-engineer-handbook]] | 📎 | 📌 | 資料工程學習 |
| [[Github/repos/Shubhamsabooawesome-llm-apps 100+ AI Agent & RAG apps you can actually run — clone, customize, ship\|awesome-llm-apps]] | 📎 | 📌 | 100+ AI Agent 應用 |
| [[Github/repos/LichAmnesiallm-engineering-handbook 构建生产级 AI 副本教程\|llm-engineering-handbook]] | 📎 | 📌 | 生產級 AI 副本 |
| [[Github/repos/karpathyautoresearch — AI Agent 自主 LLM 訓練研究框架\|autoresearch]] | 📎 | ⏳ | Karpathy 自主研究 |
| [[Github/repos/awesome-agentic-ai-zh — 繁中 AI Agent 學習地圖\|awesome-agentic-ai-zh]] | 📎 | 📌 | 繁中 AI Agent 地圖 |
| [[Github/repos/easychenopc-methodology 《一人企业方法论》第二版，也适合做其他副业（比如自媒体、电商、数字商品）的非技术人群。\|一人企業方法論]] | 📎 | 📌 | 副業經營方法論 |
| [[Github/repos/developer-roadmap — 互動式開發者職涯路線圖\|developer-roadmap]] | 🔬 | 📌 | 359K⭐ 18+ 職涯路線圖（含 QA） |
| [[Github/repos/經典學習資源 Mega-Repo 合輯\|Mega-Repo 合輯]] | 🔬 | 📌 | build-your-own-x/awesome/freeCodeCamp 等 6 個 |

---

## 📖 知識管理 / Wiki（8 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/graphify — 一指令把資料夾建成可查詢知識圖譜的多平台 Skill\|graphify]] | 🔬 | ⏳ | 89K⭐ Karpathy wiki 構想 48hr 實作；tree-sitter 零token建圖+圖遍歷查詢+信心標籤；--obsidian 出全 wikilink vault；升級條件＝jobsmith 試建圖驗分工 |
| [[Github/repos/Vault-for-Founders — 創辦人 AI 知識庫建置框架\|Vault-for-Founders]] | 🔬 | 📌 | 225⭐ Obsidian+Git 創辦人 Vault 方法論；v2 索引分層/attention budget 兩條規則可借鏡，不建置 |
| [[Github/repos/obsidian-wiki — 讓 AI Agent 維護 Obsidian 數位大腦的跨平台 Skill 框架\|obsidian-wiki]] | 🔬 | ⏳ | 2.6K⭐ Karpathy LLM Wiki 模式，跨 15+ Agent；與現有 gbrain/claude-mem 重疊需先釐清分工 |
| [[Github/repos/Beever Atlas — 聊天頻道自動生成 Wiki 知識庫\|Beever Atlas]] | 📎 | ⏳ | 聊天→Wiki 自動生成 |
| [[Github/repos/OpenKnowledge — AI 原生 Markdown 編輯器暨 LLM Wiki 平台\|OpenKnowledge]] | 📎 | ⏳ | AI Markdown Wiki |
| [[Github/repos/OpenHuman\|OpenHuman]] | 📎 | 📌 | 桌面 AI 助手 |
| [[Github/repos/AppFlowy-IOAppFlowy Bring projects, wikis, and teams together with AI. AppFlowy is the AI collaborative workspace where you achieve more without losing control of your data. The leading open source Notion alternative\|AppFlowy]] | 📎 | 📌 | 開源 Notion 替代 |
| [[Github/repos/lecture-to-notes — 講課錄影轉可回溯筆記與同步檢視器\|lecture-to-notes]] | 🔬 | ⏳ | 81⭐ MIT（4 天新，台灣復健科醫師）；講課錄影/錄音/投影片照片/PDF 講義**原樣入資料夾**→本機 GPU 管線（faster-whisper 轉錄、抽幀去重、RapidOCR→Surya 兩級 OCR、ollama minicpm-v 語意判讀、多來源音訊互相關對時）→LLM 只在最後合成→**同步 HTML 檢視器**（影片播到哪筆記高亮到哪、點時間戳跳影片）＋Obsidian vault markdown＋PDF 三形態。設計目標是**可回溯**：每句筆記指得回逐字稿時間點與當時投影片。治理成熟度遠超新齡：SKILL.md 十條硬規則（逐字稿永不自動改字——兩版自動改字「實作→量測→退役」；檔案時間是假說、xcorr 是證據、衝突>5s 停下問人；VLM 補 OCR 盲區——純 OCR 曾把 11 張流程圖全判空白；缺件大聲說不悄悄降級；PHI 紅線）。與水球課程入庫/gbrain 同問題空間的深度版。⏳ 理由：**本機無 NVIDIA（Iris Xe 實測）**，Whisper 只能 Groq offload、VLM 純 CPU 不可用，且無課程積壓。升級條件＝新課程要入庫**且**（有 ≥8GB N 卡或實測 Groq+CPU 端到端可接受）；放棄條件＝archived／停更 6 個月／出現 CPU 友善替代品。**不裝也值得抄三樣**：sync_from_skill.py 白名單投影（私 skill→公開 repo 防外洩）、對時協議、「悄悄降級是最貴的 bug」依賴治理 |

---

## 🔒 安全 / 自動化 / 其他（19 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/n8n — 視覺化工作流自動化平台（fair-code 非開源）\|n8n]] | 🔬 | ⏳ | 198.7K⭐ **非 OSI 開源**——Sustainable Use License「只能自用或非商業，對外提供須免費」＋`.ee` 檔需 Enterprise License（**實測 1,110 檔／全 repo 4.3%**）＋**master 以外分支不受任何授權涵蓋**。43 個 `feat:*` 付費旗標經 `LicenseState.isLicensed()` 執行期強制，自架免費版**沒有資料夾分類、沒有 Git 版控、沒有環境變數、沒有 workflow diff/版本、三個 AI 輔助全鎖**——核心執行不限次數，被關的是協作治理與 AI。26,031 檔／6,546 目錄（Trees API 全量，**repomix 引擎本輪失敗**：archive 停在 8.3MB→git clone→Windows EPERM rmdir，未取得 token 數）；`.ts` 佔 72%，54 個 `@n8n/*` 子套件含 vendor 的 TypeORM 分支 2,572 檔。**2026 已轉型 AI agent 平台**：MCP client+server 雙向（402 個 .ts）、`mcp-browser`（Playwright/BiDi）、`mcp-browser-extension`（CDP 控 Chrome）、⚠️ `computer-use`（AI 助手的**本機 filesystem/shell/截圖**閘道）。體質頂級：週 400 commit、一天多版、$180M 募資、Fireship 118.9 萬觀看教學。判 ⏳ 非因品質——**個人自架完全合規**，是成本效益：現有 schtasks+PowerShell 排程能動，加常駐 Docker ＝ R13「加複雜度換小改善」；且 `sourceControl` 被鎖會讓工作流變成唯一沒進 git 的資產。**📌 可單獨抽取**：43 旗標清單（免費/付費切線的產品決策教材）、`task-runner`+`task-runner-python` 隔離執行參考、`n8n.io/llms.txt` |
| [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層\|Agent Reach]] | 🔬 | ✅ | 60.8K⭐ 15 渠道互聯網能力層（選型/安裝/體檢/路由，讀取由 Agent 直呼上游）；已裝 v1.5.0，實測 13/15 可用；⚠️ 小紅書/Twitter 有實證封號案例（issue #498），排程長跑須用拋棄帳號 |
| [[Github/repos/mvanhorn-last30days-skill — AI 多平台社群研究引擎\|last30days]] | 📎 | ✅ | 社群研究引擎 |
| [[Github/repos/Usagi-orgai-goofish-monitor 基于 Playwright 和AI实现的闲鱼多任务实时定时监控与智能分析系统，配备了功能完善的后台管理UI。帮助用户从闲鱼海量商品中，找到心仪产品。\|閒魚監控]] | 🔬 | 📌 | AI 閒魚監控 |
| [[Github/repos/projectdiscoverynuclei Nuclei is a fast, customizable vulnerability scanner powered by the global security community and built on a simple YAML-based DSL, enabling collaboration to tackle trending vulnerabilities on the internet. It helps you fi\|nuclei]] | 📎 | 📌 | YAML 漏洞掃描 |
| [[Github/repos/Z4nzuhackingtool ALL IN ONE Hacking Tool For Hackers\|hackingtool]] | 📎 | 📌 | All-in-One 滲透工具 |
| [[Github/repos/CloakBrowser：一個從 C++ 原始碼層級修改指紋的隱匿瀏覽器，讓你的自動化腳本不再被封鎖\|CloakBrowser]] | 📎 | 📌 | 隱匿瀏覽器 |
| [[Github/repos/itsfatduckoptimizerDuck — Windows 系統最佳化工具\|optimizerDuck]] | 🔬 | 📌 | Windows 最佳化 |
| [[Github/repos/Midscene.js - AI 視覺驅動 UI 自動化\|Midscene.js]] | 📎 | 📌 | 視覺驅動 UI 自動化 |
| [[Github/repos/chatwoot — 開源全通道客服平台\|chatwoot]] | 📎 | ❌ | 開源客服平台 |
| [[Github/repos/ai-media-generator — 跨平台 AI 媒體生成 Prompt Skill\|ai-media-generator]] | 📎 | 📌 | AI 媒體 Prompt |
| [[Github/repos/TrendRadar — 一鍵部署的 AI 舆情熱點聚合監控助手\|TrendRadar]] | 🔬 | ⏳ | 60.6K⭐ 35+中文平台熱榜聚合+RSS+AI篩選/翻譯/分析，9推播渠道+17工具MCP；GitHub Actions 30秒fork即跑；與 last30days/agent-reach 重疊80%，資料綁定 newsnow 單點API，僅 MCP 對話分析是差異點 |
| [[Github/repos/newsnow — 優雅的即時熱榜新聞聚合器\|newsnow]] | 🔬 | ✅ | 21K⭐ 優雅熱榜聚合器（40+源：百度/微博/知乎/財聯社/雪球/HN/GitHub）；React19+Nitro+sqlite，每源一爬蟲易擴充；Docker/CF/Vercel一鍵自架，`/api/s`可當熱榜API接海巡；TrendRadar 的上游資料源 |
| [[Github/repos/gpt-5.6-instruct — Codex CLI 越獄提示詞包（威脅情報，不裝）\|gpt-5.6-instruct]] | 🔬 | ❌ | 3.5K⭐ MIT／18天衝星／**越獄工具·威脅情報留存**（不轉載 payload）；把 OpenAI Codex CLI 的 gpt-5.6-sol「破甲」——寫入 `model_instructions_file` 把安全研究/滲透/逆向/破解/NSFW 全框定成「本地沙箱任務」、顯式壓制拒絕與「改用授權靶場」回退話術。真正少見的是**把越獄成功率工程化成 CI**：「模型拒絕＝測試失敗」判準（360+52 條 prompt bank）＋模型自迭代重寫提示詞＋low/medium/high 分層迴歸門禁。Repomix Top5 只1個是程式碼、其餘全是星數/通過率趨勢SVG＝行銷成長曲線。Watchers 僅5對3.5K星＝話題衝星非持續使用群。**Issue 暴露真實用途**：破解App改包、規避OpenAI雲端風控（多帳號輪詢）、試探生物安全邊界。**❌ 用途與本環境價值取向相反＋違反OpenAI ToS（封號/帳務風險）＋改的是Codex `config.toml`（撞本機「Codex寫壞config.toml致MCP啟動即死」既有陷阱）＋18天單人ZIP注入系統指令＝高信任成本。無升級條件（用途排除非觀望）**。📌 中性可留：`codex-instruct.py` 的設定檔安全改寫模式（快照+SHA256比對+精準reset+原子寫入，config-drift金絲雀正面範例）、「CI把成功率做成可迴歸門禁」的框架形狀可移植正當eval |

| [[Github/repos/airgapped-qr-code-transfer — 用 QR Code 螢幕對鏡頭離線傳檔的純前端工具\|airgapped-qr-code-transfer]] | 🔬 | ❌ | 364⭐ MIT 純前端 QR 光學傳檔（gzip 切 250B/塊逐張畫 QR）。資料面確實零外呼（fetch/XHR/WS 全 0 匹配、線上版與 repo 逐 byte 相同無追蹤碼），**但 air-gapped 只成立一半**：兩頁各依賴 4 個 CDN、零 SRI、`@undecaf/zbar-wasm@latest` 未鎖版，且該 WASM 在**執行期用 fetch+instantiateStreaming 再抓 .wasm**——斷網根本開不起來，使用者 issue #2 已實測證實。另有單次播放無重傳的「掉一塊即死鎖」缺陷（作者未修）、git 歷史殘留 localhost 自簽私鑰（實測仍可下載，但僅 CN=localhost 自簽，嚴重性低）。判 ❌：核心宣稱不成立＋無真需求 |
| [[Github/repos/skill-recorder — 錄一次螢幕操作變成 Agent Skill 的桌面工具\|skill-recorder]] | 🔬 | ⏳ | 1.3K⭐ MIT；**微軟官方**，2026-07-29 建立（分析時僅 5 天大）。Electron App 錄下你做一次工作（視窗切換／瀏覽器網址／1fps 去重快照／剪貼簿預覽／可選旁白），交 **GitHub Copilot CLI** 重建成「intent + 有序步驟」，人工審閱後產出 SKILL.md 或排程 Automation；產出**優先映射 agent 原生工具**（gh CLI／web_fetch）而非重播點擊。Windows 支援是真的做過：Koffi 直呼 user32/kernel32/dwmapi、UIA 讀網址列（常駐 powershell.exe 5.1 host——README 說僅 macOS 是**過時的**）、為 ARM64 整條移除 ffmpeg-static 改用 Chromium。旁白 Whisper 本機轉錄不上傳。⚠ 三阻礙：①生態綁 Copilot 訂閱、產物進 ~/.copilot/，無 Claude target ②維護者**自填三個 High**——尤以 **#8「skill 安裝可擴大 allowed-tools 超出人類核准範圍」**（builder.ts:181 註解宣稱的不變量無程式碼強制，skillbuilder 零單元測試）直接打在核心用途上 ③按 Analyze 會把螢幕影像／視窗標題／URL／剪貼簿送上 GitHub 雲端，程式層無遮罩。零遙測但原始碼預告會加。**📌 可單獨抽取**：issue #8 是「agent 產生 agent 設定」的通用威脅模型（本地 skill SOP 同樣缺機械檢查）；evals 的 irrelevant-detour 情境（測模型會不會把雜訊寫進步驟）；install.ps1 的 curl|bash 加固範本（釘 commit＋官方 SHASUMS＋二次比對 reviewed hash） |
| [[Github/repos/Infinite_Storage_Glitch — KKarmugil 的 YouTube 當雲端硬碟 Python 重寫版\|Infinite_Storage_Glitch (KKarmugil)]] | 🔬 | ❌ | 163⭐ MIT；把檔案位元畫成黑白方塊影片上傳 YouTube 當免費儲存。**歸屬已查證：有明確附連結 credit 的獨立 Python 重寫，非抄襲**——README 首段寫明 inspired from DvorakDwarf、程式碼與 Rust 原版結構性不同（無 RGB 模式、硬編碼 4×4、單檔 200 行 vs 原版 8 模組）、作者帳號早於 repo 20 個月。但如實記錄兩項負面事實：README「How to use」步驟 2/4/5/6/7 與原版一字不差且照抄了本專案不存在的功能名（executable/dislodge）；21 個 commit 有 18 個只改 README。原版 repo 現已 404（作者自行刪除、帳號仍活躍 725 followers），使本 repo 成為該關鍵字星數最高結果。6 顆 PyPI 相依全存在未 yanked，惟 `numpy==1.22.4` 在 Py3.11+ 無 wheel、`pytube` 停更 3 年已對現行 YouTube 失效——**實質跑不起來**。判 ❌ |
| [[Github/repos/sherlock — 跨 400+ 社群網站的使用者名稱 OSINT 搜尋工具\|sherlock]] | 🔬 | ⏳ | 87.5K⭐ MIT；給一個 username 並行查 481 站有無同名帳號。**核心邏輯 <1000 行，價值全在那份眾包維護的站點清單**——站點數自數為 **481**（非 README 宣稱「400+」），判定分三型 `status_code` 327／`message` 127／`response_url` 27，另有 4 組硬編碼 WAF 指紋防呆；執行緒池（非 asyncio）`max_workers=min(N,20)` 共用 session 連線池。🔴 **安裝前必讀的 PyPI 命名碰撞**：`pip install sherlock` 裝到**完全無關**的「distributed inter-process locks」（作者 Vaidik Kapoor v0.4.1），正解是 `pip install sherlock-project`——非惡意 typosquat（該套件早於本專案）但誤裝機率高；且 PyPI 停在 0.16.0 而 repo 已 0.16.1 未發布。供應鏈其餘全綠：9 個相依全存在未 yank、無安裝腳本、無硬編碼金鑰；預設每次執行打 `data.sherlockproject.xyz`（實測 301→`raw.githubusercontent.com`）抓即時站點清單，**無使用者查詢對象上報**。已修 **CVE-2026-44590 / GHSA-v6wr-ccr4-x8g9（CVSS 9.3 Critical）**：CI 的 `pull_request_target`＋`${{ }}` 插值 command injection 可竊 `GITHUB_TOKEN`，3 天內修復，**影響 CI 基礎設施非使用者套件**。維護判定：近三筆 commit（2026-08-01）**全是贊助商 banner**（UserSearch、OSINT Industries），實質修復停在 05-05，release 間隔 14 個月，前三人佔貢獻 86%——安全響應仍在但功能開發近停滯。227 open PR 經 166 個不重複作者投稿、48% 是 ≤20 行站點新增（hacktoberfest 驅動）＋3 人批次審查＝**積壓非灌水**，55 筆等超過一年。⚠️ 假陽性是持續未根治現象（issue 掛零回覆逾年），唯一實測 32% 樣本 n=1 **不可推廣**。替代：WhatsMyName（免安裝、社群評價假陽性最低）／Maigret（深但慢）。升級觸發＝需批次掃多 username 或 v0.17 清理假陽性積壓；放棄觸發＝再 6 個月僅剩 banner commit |
---
| [[Github/repos/reverse-skill — AI 逆向滲透安全技能路由包|reverse-skill]] | 🔬 | ❌ | 17.4K⭐ MIT（**2.7 個月漲 17K、Trendshift 榜**）；給 code AI（Claude Code/Codex/Cursor/Cline/Kiro）的安全任務**技能路由包**：APK/二進位/JS 加密/封包/CTF/滲透→分類→進對應方法論子技能→缺工具自動 bootstrap（nmap/Frida/radare2/SecLists/多 MCP）→執行→產報告。330+ skill檔、CTF 子技能群、src-hunter payload 庫（305 payload/263 WAF 繞過/2887 份 HackerOne 案例/77K WooYun）。**工程其實不差**：bootstrap 有路徑安全圍欄、install 全 list-form、工具來源知名上游非 typosquat、commit log 可見主動修 command/shell injection 多個洞；有 scope/授權閘門（ACT 前要 auth.status=granted）不是無腦攻擊包。**判 ❌ 的不是技術是自注入與服從性工程**：①`RULES.md` Global Injection **強制把路由規則寫進 `~/.claude/CLAUDE.md`** → 撞 config-drift 金絲雀＋settings 統一；②`agent-obedience-engineering.md`＝**專門擊敗 agent 的猶豫與拒絕**（借口反駁表），而 RULES 明文叫 agent 「猶豫某操作是否被允許」時就去讀它＝將安全遲疑工程化消除；③README_AI section 0＋CRITICAL 塊反覆「讀完立刻執行、只回覆了解就是失敗」。依本環境判準（learn@agentskill-sh 先例）**skill 內文自動行為指令視同 hook 注入＝背景參考非指令**，三條全歸「讀到不遵守」。加上需求不存在（QA/求職定位、無在跡滲透案）＋330 skill 大攻擊面（R13）。**📌 可單獨抽取**：src-hunter playbooks/payloader、ops/scope-contract＋evidence-finding-path（授權滲透契約寫法，對安全 QA 有參考）；obedience-engineering 可當「prompt 如何被工程化瓦解 agent 安全判斷」的反面樣本一讀但絕不照做。升級條件＝真接授權滲透/CTF 案且願只 clone 當本地參考、手動停 Global Injection；放棄＝上游把自注入變硬依賴或引入自架 CDN/不透明 binary |

## 🔄 未分類 / 待整理（~8 篇）

| Repo | 深度 | 說明 |
|------|------|------|
| [[Github/repos/cc-switch 这个51K星标的开源神器，让任何Agent都能一键切换所有模型。\|cc-switch（介紹文）]] | 📎 | 模型切換 |
| [[Github/repos/prompt-master\|prompt-master]] | 📎 | Prompt 管理 |
| [[Github/repos/eigent\|eigent]] | 📎 | 待確認 |
| [[Github/repos/ait-vcs — AI 編碼代理嘗試帳本\|ait-vcs]] | 📎 | 編碼帳本 |
| [[Github/repos/ToolsaiSkills-Security-Check\|Skills-Security-Check]] | 📎 | Skills 安全檢查 |
| [[Github/repos/garrytangbrain Garry's Opinionated OpenClawHermes Agent Brain\|garrytang/brain]] | 📎 | Agent Brain |
| [[Github/repos/yikartAiToEarn Let's use AI to Earn!\|AiToEarn]] | 📎 | AI 賺錢 |
| [[Github/repos/claude-code-workspacedocs2026-05-16-claude-code-best-practices.md at main\|claude-code-best-practices]] | 📎 | 最佳實踐 |

---

## 相關頁面

- [[Github/已安裝工具 — Github 分析索引|已安裝工具 × Wiki 交叉對照]] — 30 項已安裝工具的完整文檔連結
- [[Tools/repo-intel|repo-intel Skill]] — 分析新 repo 用
- [[Tools/claude-tools-dashboard|Dashboard]] — 工具生態系儀表板
