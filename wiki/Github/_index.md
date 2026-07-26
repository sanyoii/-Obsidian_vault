---
title: Github Repo 分析總索引
created: 2026-06-28
tags: [github, index, repos]
---

# Github Repo 分析總索引

> 174 篇 GitHub repo 分析文章，按 12 大主題分類（含 1 篇行銷類深度分析）
> 🔬 深度分析（repo-intel / repomix 五引擎）｜📎 簡單留存（Web Clipper / README）
> ✅ 已安裝 ｜⏳ 觀望 ｜❌ 不適合 ｜📌 參考
> 最後更新：2026-07-26

---

## 🤖 AI Agent 框架（14 篇）

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
| [[Github/repos/DeepTutor — 港大開源的 Agent 原生個人化學習工作站\|DeepTutor]] | 🔬 | ⏳ | 29.8K⭐ HKUDS（LightRAG 同團隊）+arXiv 論文；六模式共用單一 agent loop，多引擎 RAG（LlamaIndex/PageIndex/GraphRAG/LightRAG/**Obsidian vault**）+三層記憶+Memory Graph；可在對話中呼叫本機 Claude Code/Codex；品質極高但屬**替換**非補位——會取代現行三層檢索，且 Obsidian KB 為**就地讀寫**對 public vault 有風險；部署需 Docker+PocketBase+Next.js |

---

## 🛠️ Claude Code / Skills（36 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
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
| [[Github/repos/html-anything — 把任何檔案轉成單檔互動 HTML 的 Agent Skill\|html-anything]] | 🔬 | ⏳ | 104⭐ 60 source prompts×17 style systems，把 WhatsApp/微信/Kindle/Spotify/Apple Health/**Obsidian vault** 等雜亂匯出轉單檔互動 HTML；填「source-aware parsing」空白（既有設計 skill 全是產出端、無人管讀懂格式）；**MIT-0 可單抄 prompt 檔不必裝整包**；⚠️停滯10週+單人+v0.1.x，when_to_use 比 hallmark 更廣會搶觸發 → 建議只抄 obsidian-vault.md 餵 archify |

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

## 💰 投資 / 金融（7 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/FinanceDatabase — 30萬金融商品分類資料庫\|FinanceDatabase]] | 🔬 | ✅ | 8.2K⭐ 30萬+金融商品分類目錄（股/ETF/基金/指數/幣）+輕量pandas查詢；社群CSV維護；`.to_toolkit()`接FinanceToolkit；與jane-finance互補（宇宙vs觀點）；**已裝C:\Python314**（+FinanceToolkit）；台股本地1347檔權值9/10（缺2330.TW台積電） |
| [[Github/repos/ai-berkshire — AI 時代的價值投資研究框架\|ai-berkshire]] | 🔬 | ✅ | 四大師 18 Commands |
| [[Github/repos/xbtlin-ai-berkshire\|xbtlin-ai-berkshire（原始分析）]] | 🔬 | ✅ | 同上初版 |
| [[Github/repos/開源版金融終端機 Fincept Terminal\|Fincept Terminal]] | 📎 | ⏳ | 開源金融終端 |
| [[Github/repos/best-of-algorithmic-trading Collections\|best-of-algo-trading]] | 📎 | 📌 | 演算法交易資源 |
| [[Github/repos/machine-learning-for-trading — ML4T 第三版機器學習交易全流程\|ml4t 3rd ed]] | 🔬 | ⏳ | 19.7K⭐ 量化 ML 教科書配套；9 case study 同一 pipeline；61 護欄化 agent skills 值得偷 |
| [[Github/repos/chokepoint-atlas — AI 供應鏈卡點美股研究方法論 Skill\|chokepoint-atlas]] | 🔬 | ⏳ | 42⭐ 卡脖子美股战法 Skill；證據四級標籤＋卡點 stack＋五維打分；與 jane-finance 鏡頭互補；⚠️無授權檔+領域窄+停更，抽「證據標籤」機制即可 |

---

## 💼 求職（3 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/career-ops — AI 驅動求職自動化指揮系統\|career-ops]] | 🔬 | ✅ | v1.13.0 A-F 評估 + Go TUI |
| [[Github/repos/jobsmith — 台灣求職 AI 多代理 Co-Pilot\|jobsmith]] | 📎 | ✅ | 14 Agent LangGraph |
| [[Github/repos/ai-job-search — Claude Code 原生的本機求職應徵框架\|ai-job-search]] | 🔬 | ⏳ | 20.4K⭐ 4個月新；Claude Code 原生 Skills/Commands 求職模板，LaTeX PDF 校對+ATS驗證是差異化亮點；丹麥市場限定+需LaTeX工具鏈，先觀望 |

---

## 🎬 影片 / 媒體 / 音樂（15 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/capcut-mate — 開源剪映草稿自動化REST API\|capcut-mate]] | 🔬 | ⏳ | 1.4K⭐ 剪映草稿自動化 REST API（FastAPI，~35端點+雲渲染），建於 pyJianYingDraft；讓 LLM/Coze/n8n 程式化剪片；與 vak 互補（API vs 本機草稿）；綁剪映生態故觀望 |
| [[Github/repos/seedance-2.0 — 導演式操作Seedance影片模型的Skill OS\|seedance-2.0]] | 🔬 | ⏳ | 5K⭐ 導演式操作 ByteDance Seedance 2.0 影片模型的 28-skill 包（MIT）；directing-engine+126 evals+6語詞彙；與 video-shotcraft 同構但強綁生成模型；版號治理不一致(gh v5.3 vs skill v6.6) |
| [[Github/repos/video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架\|video-autopilot-kit]] | 🔬 | ⏳ | 1.5K⭐ 填自己資料的 YT/短影音自動化框架（MIT）；雙路徑 ffmpeg 純程式 + CapCut 草稿 JSON/Computer Use；M1-M106 避坑庫+機械化 QA 閘；與 video-shotcraft 互補（實拍 vs 程式化） |
| [[Github/repos/video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill\|video-shotcraft]] | 🔬 | ⏳ | 337⭐ Claude Code/Codex agent skill；106 鏡頭配方卡+161 動態樣片+Ink Press 模板；Remotion+真實截圖+2.5D 運鏡+節奏卡點；方法論與 institution R13/R17 同構；與 HyperFrames 重疊需釐清 |
| [[Github/repos/voicebox — 本機優先的開源 AI 語音工作室\|voicebox]] | 🔬 | ⏳ | 37K⭐ 本機 TTS+語音克隆+口述輸入，MCP server 讓 Claude Code 開口說話 |
| [[Github/repos/calesthio-OpenMontage\|OpenMontage]] | 📎 | ⏳ | Agentic 影片製作 |
| [[Github/repos/AIDC-AIPixelle-Video 🚀 AI 全自动短视频引擎  AI Fully Automated Short Video Engine\|Pixelle-Video]] | 📎 | ⏳ | 全自動短影片 |
| [[Github/repos/(參考)Winston774ai-music-channel-starter 半自動 AI 音樂 YouTube 頻道 Pipeline\|ai-music-channel]] | 📎 | 📌 | AI 音樂 YouTube Pipeline |
| [[Github/repos/RedditVideoMakerBot — Reddit 串文自動轉短影片機器人\|RedditVideoMaker]] | 📎 | 📌 | Reddit 轉短影片 |
| [[Github/repos/Remotion — 用 React 寫程式碼產生影片\|Remotion]] | 📎 | 📌 | React 產生影片 |
| [[Github/repos/ReClip — 自架開源影片音訊下載工具\|ReClip]] | 🔬 | 📌 | 影片音訊下載 |
| [[Github/repos/music-assistant-server — 開源家用音樂串流管理器\|music-assistant]] | 📎 | ⏳ | 106 providers 音源整合 |
| [[Github/repos/LongCat-Video, a foundational video generation model with 13.6B parameters, delivering strong performance across Text-to-Video, Image-to-Video, and Video-Continuation generation tasks\|LongCat-Video]] | 📎 | ⏳ | 13.6B 影片生成模型 |
| [[Github/repos/zarazhangruifollow-builders AI builders digest — monitors top AI builders on X and YouTube podcasts, remixes their content into digestible summaries. Follow builders, not influencers\|follow-builders]] | 📎 | 📌 | AI Builders 摘要推送 |
| [[Github/repos/roboflowsupervision We write your reusable computer vision tools. 💜\|supervision]] | 📎 | 📌 | 電腦視覺工具庫 |

---

## 🧰 開發工具 / CLI（15 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
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

---

## 📊 AI/ML 模型（6 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/TimesFM — Google 時間序列基礎模型\|TimesFM]] | 📎 | ⏳ | Google 時間序列 |
| [[Github/repos/RLM — 遞迴語言模型推理框架\|RLM]] | 🔬 | ⏳ | 遞迴推理 |
| [[Github/repos/Breeze-ASR-25 — 台灣中文中英混用語音辨識模型\|Breeze-ASR-25]] | 📎 | ⏳ | 台灣中文語音辨識 |
| [[Github/repos/HKUDSLightRAG — 知識圖譜增強 RAG 框架\|LightRAG]] | 🔬 | ⏳ | 知識圖譜 RAG |
| [[Github/repos/exo-exploreexo Run frontier AI locally\|exo]] | 📎 | 📌 | 多裝置組 AI cluster |
| [[Github/repos/Chandra OCR 2\|Chandra OCR 2]] | 📎 | 📌 | PDF/掃描→Markdown |

---

## 🎨 設計 / UI / 前端（9 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/awesome-design-skills — 67種美學風格的SKILL.md註冊庫\|awesome-design-skills]] | 🔬 | ⏳ | 1.9K⭐ 67 美學風格 SKILL.md/DESIGN.md 註冊庫（brutalism/glassmorphism/neon/retro…）；`npx typeui.sh pull`；與 awesome-design-md 互補（風格 vs 品牌）；靜態SKILL.md無法看codebase，按需pull即可 |
| [[Github/repos/Open Design — 開源版Claude Design讓CLI agent變設計引擎\|Open Design]] | 🔬 | ⏳ | 80K⭐ 開源版 Claude Design 桌面 app（Electron）；接你已裝 CLI(BYOK)當設計引擎產原型/簡報/影片；71 DESIGN.md+19 skills；nexu-io 是 hyperframes/html-anything vendor；曾移除2GB+CLI-first重疊故觀望 |
| [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫\|awesome-design-md]] | 📎 | ✅ | 93.5K⭐ Google Stitch |
| [[Github/repos/google-labs-code — Google Stitch + Jules 開源組織全覽\|google-labs-code]] | 📎 | ⏳ | Stitch + Jules 組織 |
| [[Github/repos/Stop-slop 寫作去除AI腔\|Stop-slop]] | 📎 | ✅ | 去 AI 腔寫作 |
| [[Github/repos/akseolabs-seocinematic-ui A reasoning-first cinematic web design skill. Makes AI think like a film director — research a real film, extract its visual language, translate it into page narrative and composition. Not a style picker. A director's w\|cinematic-ui]] | 📎 | 📌 | 電影導演思維 Web 設計 |
| [[Github/repos/不會設計也能做出專業級 App Store 截圖：一個 AI 驅動的截圖產生器\|App Store 截圖生成器]] | 📎 | 📌 | AI 截圖生成 |
| [[Github/repos/latentbox — AI 創意藝術精選資源導航站\|latentbox]] | 🔬 | ❌ | 2.2K⭐ AI/創意/藝術精選資源站；CC BY-NC-ND 禁衍生，僅供瀏覽參考 |
| [[Github/repos/galaxy — Uiverse.io 開源 UI 元件庫鏡像（3800+ CSS-Tailwind 元件）\|galaxy]] | 🔬 | ⏳ | 11.7K⭐ Uiverse.io 唯讀元件鏡像；3,804 個單檔 HTML+CSS/Tailwind 元件、MIT 可商用；鏡像停更 22 個月落後官網 2,000 元件；用時上官網複製即可，除非有離線批量餵 agent 需求才 clone |

---

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
| [[Github/repos/easychenopc-methodology 《一人企业方法论》第二版，也适合做其他副业（比如自媒体、电商、数字商品）的非技术人群\|一人企業方法論]] | 📎 | 📌 | 副業經營方法論 |
| [[Github/repos/developer-roadmap — 互動式開發者職涯路線圖\|developer-roadmap]] | 🔬 | 📌 | 359K⭐ 18+ 職涯路線圖（含 QA） |
| [[Github/repos/經典學習資源 Mega-Repo 合輯\|Mega-Repo 合輯]] | 🔬 | 📌 | build-your-own-x/awesome/freeCodeCamp 等 6 個 |

---

## 📖 知識管理 / Wiki（7 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/graphify — 一指令把資料夾建成可查詢知識圖譜的多平台 Skill\|graphify]] | 🔬 | ⏳ | 89K⭐ Karpathy wiki 構想 48hr 實作；tree-sitter 零token建圖+圖遍歷查詢+信心標籤；--obsidian 出全 wikilink vault；升級條件＝jobsmith 試建圖驗分工 |
| [[Github/repos/Vault-for-Founders — 創辦人 AI 知識庫建置框架\|Vault-for-Founders]] | 🔬 | 📌 | 225⭐ Obsidian+Git 創辦人 Vault 方法論；v2 索引分層/attention budget 兩條規則可借鏡，不建置 |
| [[Github/repos/obsidian-wiki — 讓 AI Agent 維護 Obsidian 數位大腦的跨平台 Skill 框架\|obsidian-wiki]] | 🔬 | ⏳ | 2.6K⭐ Karpathy LLM Wiki 模式，跨 15+ Agent；與現有 gbrain/claude-mem 重疊需先釐清分工 |
| [[Github/repos/Beever Atlas — 聊天頻道自動生成 Wiki 知識庫\|Beever Atlas]] | 📎 | ⏳ | 聊天→Wiki 自動生成 |
| [[Github/repos/OpenKnowledge — AI 原生 Markdown 編輯器暨 LLM Wiki 平台\|OpenKnowledge]] | 📎 | ⏳ | AI Markdown Wiki |
| [[Github/repos/OpenHuman\|OpenHuman]] | 📎 | 📌 | 桌面 AI 助手 |
| [[Github/repos/AppFlowy-IOAppFlowy Bring projects, wikis, and teams together with AI. AppFlowy is the AI collaborative workspace where you achieve more without losing control of your data. The leading open source Notion alternative\|AppFlowy]] | 📎 | 📌 | 開源 Notion 替代 |

---

## 🔒 安全 / 自動化 / 其他（12 篇）

| Repo | 深度 | 狀態 | 說明 |
|------|------|------|------|
| [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層\|Agent Reach]] | 📎 | ✅ | 17 平台互聯網感知 |
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

---

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
