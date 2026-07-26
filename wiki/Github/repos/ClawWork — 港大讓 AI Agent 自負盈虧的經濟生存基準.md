---
source: "https://github.com/HKUDS/ClawWork"
author: "HKUDS (香港大學 Data Intelligence Lab)"
stars: "8.3K"
clipped: 2026-07-27
tags:
  - "github/repo"
  - "ai-agent"
  - "benchmark"
  - "llm-as-judge"
  - "hkuds"
---

## ClawWork — 港大讓 AI Agent 自負盈虧的經濟生存基準

> **HKUDS/ClawWork** | ⭐ 8,266 | 🍴 1,063 | 📝 MIT
> "ClawWork: OpenClaw as Your AI Coworker - 💰 $15K earned in 11 Hours"

---

### 一句話說明

ClawWork 是香港大學 HKUDS 實驗室（LightRAG、DeepTutor、nanobot 同團隊）的**經濟生存基準測試框架**：給 AI Agent $10 起始餘額，每次 LLM 呼叫扣真實 token 成本，只有完成 OpenAI GDPVal 資料集裡的 220 個專業任務、被 LLM 評審打分後才能「賺錢」。它不是可以拿來用的工具，而是一個**評測平台 + 排行榜**，目標使用者是想比較「哪個模型做真實白領工作最划算」的研究者。

⚠️ **關鍵理解**：排行榜上的「$19,915 收入」不是真金白銀，是**模擬記帳**——payment = LLM 品質分數(0~1) × (GPT 估算工時 × BLS 平均時薪)。支出（token 成本）是真的，收入是推算的。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 8,266 |
| Forks | 1,063 |
| 主要語言 | Python 632KB / Jupyter 246KB / JavaScript 174KB |
| 授權 | MIT |
| 建立時間 | 2026-02-15 |
| 最後推送 | 2026-03-03 |
| Open Issues / PRs | 15 issues（已關 6）/ 22 PRs（已關 9） |
| 最新 Release | **無任何 release / tag** |
| Topics | 無 |
| 首頁 | 無 homepage 欄位（實際 demo：`hkuds.github.io/ClawWork/`，GitHub Pages） |
| 是否 Archived | 否 |

---

### 原始碼結構分析

> ⚠️ Repomix 對此 repo **失敗**（`git clone --depth 1` 於 749MB repo 中斷）。以下數據改由 GitHub Tree API 全量統計 + 逐檔抓取核心原始碼取得，非 repomix token 指標。

| 區塊 | 檔案數 | 體積 | 佔比 |
|------|-------|------|------|
| `livebench/data/`（跑分產出物） | 7,687 | 718.4 MB | **95.9%** |
| `assets/`（banner / gif） | 6 | 28.0 MB | 3.7% |
| **實際原始碼 + 設定** | **167** | **3.04 MB** | **0.4%** |
| 其中 `.py` | 56 | 612 KB | — |

**這是重點**：repo 749MB 中 96% 是八個模型跑分後留下的沙盒產物——包含 84MB 的音軌 zip、多個 32MB 的 `.wav` 混音檔（Agent 接到「Audio and Video Technicians」任務時真的產出了音樂檔）。程式碼本身只有約 3MB，非常精簡。

#### 最大程式檔 Top 8

| 檔案 | 大小 |
|------|------|
| `livebench/agent/live_agent.py` | 53.2 KB |
| `frontend/src/pages/Leaderboard.jsx` | 38.2 KB |
| `livebench/agent/economic_tracker.py` | 33.8 KB |
| `frontend/src/pages/WorkView.jsx` | 31.9 KB |
| `livebench/work/llm_evaluator.py` | 31.0 KB |
| `livebench/api/server.py` | 29.2 KB |
| `frontend/src/pages/Artifacts.jsx` | 27.2 KB |
| `livebench/tools/productivity/code_execution_sandbox.py` | 25.7 KB |

---

### 核心功能

- **經濟壓力模擬**：`EconomicTracker` 逐次攔截 LLM 回應的 usage，扣款寫入 `balance.jsonl`；OpenRouter 有回報 cost 時直接採用其數值，否則用 config 裡的 `input_per_1m` / `output_per_1m` 自算。餘額分四級：thriving(>$500) / stable / struggling / bankrupt(≤0)。
- **220 個 GDPVal 專業任務**：來自 OpenAI GDPVal 資料集，橫跨 44 種職業。⚠️ **資料集本身不在 repo 裡**（tree 中 `gdpval` 零命中，config 指向不存在的 `./gdpval`），需自行取得。
- **8 個 Agent 工具**：`decide_activity`（work / learn 二選一）、`submit_work`、`learn`、`get_status`、`search_web`（Tavily / Jina）、`create_file`（xlsx/docx/pdf）、`execute_code_sandbox`（E2B 雲端沙盒，可選 BoxLite 本地）、`create_video`。
- **44 份職業別評分 rubric**：`eval/meta_prompts/` 下每個職業一份 16-18KB JSON 評分準則，由 `eval/generate_meta_prompts.py` 用 GPT 生成。**這是本 repo 最可複用的資產**。
- **React + FastAPI 即時儀表板**：WebSocket 推送餘額曲線、任務完成、學習紀錄；GitHub Actions 另有一條 `generate_static_data.py` → Vite build → Pages 的靜態部署線。
- **ClawMode（nanobot 整合）**：把 HKUDS 自家的 nanobot gateway 包成「會賺錢的同事」，`/clawwork <指令>` 可即時把任意自然語言指令分類成 40 種職業之一、算出 `工時 × 時薪` 的報酬上限，做完再評分付款。每則回覆附成本頁腳。

---

### 技術架構

```
                 ┌──────────────────────────────────────┐
   模式 A         │  livebench/main.py (asyncio)         │
   標準模擬        │    └── LiveAgent (LangChain/LangGraph)│
                 │         ├── EconomicTracker（扣款）    │
                 │         ├── TaskManager（GDPVal 載入） │
                 │         └── WorkEvaluator             │
                 │              └── LLMEvaluator (GPT-4o)│
                 └──────────────┬───────────────────────┘
                                │ jsonl 落地
                                ▼
      livebench/data/agent_data/<signature>/{balance,token_costs,
                                  evaluations,tasks,task_completions}.jsonl
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
      FastAPI + WebSocket (8000)      generate_static_data.py
      livebench/api/server.py                  │
                 │                             ▼
                 └──────► React/Vite (3000)  GitHub Pages 靜態排行榜

   模式 B  ClawMode：nanobot gateway
   （需另裝 nanobot）  ├── TrackedProvider（包 LiteLLMProvider，攔 usage）
                      ├── ClawWorkAgentLoop（攔 /clawwork 指令）
                      └── TaskClassifier（LLM 分類 40 職業 + 估工時）

   另有 MCP 層：livebench/tools/tool_livebench.py（FastMCP，預設 :8010/mcp）
              暴露 get_economic_status / decide_activity / submit_work_artifact
              / create_file / get_memory / save_to_memory / learn_from_web
```

| 層次 | 技術 |
|------|------|
| Agent 執行 | Python 3.10+、asyncio、LangChain / LangGraph / langchain-mcp-adapters |
| 工具協定 | FastMCP（自架 HTTP MCP server，port 8010） |
| 沙盒 | E2B（預設，需雲端 API Key）／ BoxLite（實驗性本地） |
| 評審 | GPT-4o（`EVALUATION_MODEL` 可換），44 職業別 rubric |
| 文件產出 | python-docx / python-pptx / reportlab / openpyxl / xlsxwriter / pdf2image |
| 後端 | FastAPI + uvicorn + websockets |
| 前端 | React + Vite + TailwindCSS |
| 部署 | GitHub Actions → GitHub Pages（靜態排行榜） |
| 搜尋 | Tavily（預設）／ Jina |

---

### 方法論的三個結構性弱點（讀原始碼才看得到）

1. **收入是三重推估的名目值，不是收入。**
   `scripts/calculate_task_values.py`：任務工時由 GPT 估 → 職業由 **GPT-5.2** 對應到 BLS 職稱 → 乘 BLS 平均時薪 = 任務價值。再乘 LLM 評審給的品質分數就是「收入」。三層估計疊乘，誤差不可控。README 自稱的「$1,500+/hr 超越白領生產力」是把「BLS 認為人類要做 N 小時的活」除以「Agent 的 wall-clock 分鐘數」——這個比值高本來就是構造上的必然，不構成新資訊。

2. **評分解析失敗會預設給 5.0 分（= 付一半錢）。**
   `livebench/work/llm_evaluator.py:779`：`_extract_score()` 若無法從評審回覆中抓到分數，印一行警告後 `return 5.0`。而 `payment = (score/10) × max_payment`——也就是說評審輸出格式跑掉時，Agent 仍自動拿到該任務 50% 的報酬。另外 `eval/` 的 rubric 是 GPT 生成、GPT 評分，**repo 中沒有任何人類標註或校準資料**佐證評分可靠。

3. **README 的 0.6 品質門檻在 benchmark 主線裡不存在。**
   `clawmode_integration/skill/SKILL.md` 寫「Evaluations below 0.6 score receive $0 payment」，但 `WorkEvaluator` / `LLMEvaluator` 是**線性給付**，只在檔案不存在或大小為 0 時給 0。這也解釋了為何排行榜上平均品質僅 36-43% 的模型仍能累積上萬美元「收入」。

**另補**：標題數字一路在變——HN 貼文（2026-02-16）「$10K / 7 Hours」、repo description「$15K / 11 Hours」、README H3「$19K / 8 Hours」。基準未固定，跨版本數字不可互相比較。

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | yuh-yang (25)、chaohuang-ai (6)、DorianZheng (3)，其餘 3 人各 1 commit | **高度集中於單一作者**，巴士因子 1 |
| 最後推送 | 2026-03-03（距今約 5 個月） | 發布後熱度期一過即停更 |
| Release | 0 個 | 無版本管理，無法釘版本 |
| PR | Open 22 / Closed 9 | **積壓比 2.4:1**，外部 PR 明顯處理不及 |
| Issue | Open 15 / Closed 6 | 同上 |
| CI | 只有 Pages 部署 workflow，**無測試 CI** | `scripts/` 內有 `test_*.py` 但不進 CI |
| Star / Fork 比 | 8,266 / 1,063（7.8:1） | fork 偏多，多半是「跑跑看排行榜」而非長期開發 |

> 註：`stats/commit_activity` API 回空物件（GitHub 對此 repo 未產生統計快取），近 4 週 commit 數**無法取得**，此欄以最後推送日期替代判斷。

---

### 社群口碑

> 來源：Hacker News Algolia API + WebSearch（Exa/mcporter 已知失效，小紅書擋登入牆，兩者皆跳過）。

**Hacker News — 幾乎零討論：**
- 「ClawWork: OpenClaw as Your AI Coworker」(2026-02-16)：**3 分、1 則留言**，該留言還是在吐槽「AI agent」這個詞被濫用。
- 「$10K earned in 7 Hours」(2026-02-19)：**2 分、0 留言**。
- 「LiveBench – AI Survival Game」(指向 demo 站)：同樣無聲。
- 對照組：同實驗室的 **nanobot 拿到 257 分 / 128 則留言**。也就是說 HKUDS 在 HN 有聲量，但 ClawWork 這個題目本身沒被英語技術社群接住。

**中文圈 — 熱度明顯高於英文圈，但全是轉述型內容：**
搜狐、知乎（多篇）、工業智能算網等媒體以「7 小時賺 1 萬刀」「給 AI 發 10 塊錢工資看它能不能養活自己」為題大量報導；LinkedIn / X 上的擴散主要由作者本人（Chao Huang）與 AlphaSignal 等 AI 快訊帳號推動。

**正面回饋：** 題目設定新穎——把評測從「答對率」換成「經濟存活率」，敘事性強、demo 站好看，是它爆紅的主因。

**負面回饋 / 已知問題：** 搜遍中英文**找不到任何第三方獨立複現或方法論批評**。8.3K stars 幾乎全部來自標題驅動的媒體擴散，而非社群實測。上面「三個結構性弱點」是本次讀原始碼得出的，非引用他人。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無關。ClawWork 的 `learn` 工具寫的是自己的 `memory.jsonl`，沒有 Obsidian / Markdown 介面。與 DeepTutor 不同，**不會碰你的 vault**，也就沒有 public repo 就地讀寫的風險。 |
| **Claude Code** | **無可用接口**。它有 MCP server（`tool_livebench.py`，FastMCP :8010），但暴露的是 `decide_activity` / `submit_work_artifact` 這種**只在模擬內有意義**的工具——掛進 Claude Code 後你會得到一組「向不存在的評審提交作品領模擬薪水」的指令。ClawMode 綁死 nanobot（`from nanobot.providers...`），與 Claude Code 無關。Claude 在這裡的角色只是**被評測對象**（Claude Sonnet 4.6 有跑分，排名未進前七）。 |
| **Automation** | 無關。它的排程是自己的模擬日曆（`init_date` → `end_date`），與 Windows 排程 / hook 體系無交集。 |
| **DeepTutor 同型風險？** | **不同型，風險反而更低**。DeepTutor 判 ⏳ 是因為它會**取代**現有三層檢索；ClawWork 不取代任何東西，因為它根本不是生產工具——它是一台跑分機。真正的成本不是「取代」，是**跑一次要燒真錢**（Agent 模型 + GPT-4o 評審 + Tavily + E2B 全部要 API Key）換一組模擬帳本。 |
| **Windows 可用性** | **中等偏差**。純 Python 部分可跑；但 `start_dashboard.sh` / `run_test_agent.sh` / `view_logs.sh` 都是 bash（需 Git Bash 或 WSL），troubleshooting 段落直接教你用 `lsof` 殺 port。E2B 是雲端沙盒故 Windows 不阻塞，但要付費 Key；BoxLite 本地後備自稱「experimental」。另外 GDPVal 資料集不隨 repo 附帶，得自己張羅。 |

---

### 安裝建議

**❌ 不適合安裝（本體）** — 三個理由，依重要性排序：

1. **它對本環境零功能增量。** 這是評測基礎設施，不是工具。裝了之後你不會多出任何一個能用的 skill / command / MCP tool——唯一的產出是一張「某模型在模擬經濟裡賺了多少假錢」的排行榜，而這張榜 HKUDS 已經免費掛在 GitHub Pages 上，自己跑一次只是花真錢複製它。
2. **跑一次的邊際成本高、可信度低。** 需要 Agent 模型 Key + GPT-4o 評審 Key + Tavily Key + E2B Key，外加自行取得 GDPVal 資料集；而產出的數字受上述三個結構性弱點污染（三重估計疊乘、解析失敗預設付半薪、無人類校準）。R13 判準：加大量複雜度換無法量化的改善 → 不做。
3. **專案處於發布後停更狀態。** 5 個月無推送、零 release、22 個 PR 積壓、無測試 CI、巴士因子 1。即使將來想用，也不該現在裝。

**📌 但有一份值得單獨抽取的資產：** `eval/generate_meta_prompts.py` + `eval/meta_prompts/*.json`（44 份職業別評分 rubric，每份 16-18KB）。這是「**如何讓 LLM 針對某個專業領域自動生成一份可重複使用的評分準則**」的完整可運行範例，和先前的 **institution 規則 eval 試點** 是同一個問題空間。要用的話直接讀那兩個檔即可，不需要 clone 749MB。同時它也是一個現成的反面教材：`_extract_score()` 的 fallback 設計示範了 LLM-as-judge 最典型的靜默失效模式（解析失敗 → 給中間分 → 下游照常結帳）。

**什麼情況值得回頭看：** ①HKUDS 把評分 rubric 生成器拆成獨立套件或 skill；②出現第三方獨立複現或人類標註校準資料，證明評分與真實專業評價相關；③ClawWork 開始提供「拿你自己的 agent 進去跑」的託管服務（不必自備四把 Key）。三者皆未發生前，不必再評估。

---

## 相關連結

- [[Github/repos/DeepTutor — 港大開源的 Agent 原生個人化學習工作站|DeepTutor]]（HKUDS 同實驗室，判 ⏳）
- [[Github/repos/HKUDSLightRAG — 知識圖譜增強 RAG 框架|LightRAG]]（HKUDS 同實驗室）
- 上游依賴：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)（ClawMode 模式必需；HN 257 分）
- 資料集：[OpenAI GDPVal](https://openai.com/index/gdpval/)（220 任務 / 44 職業，需另行取得）
