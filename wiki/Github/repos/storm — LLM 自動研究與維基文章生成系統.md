---
source: "https://github.com/stanford-oval/storm"
author: "stanford-oval (Stanford Open Virtual Assistant Lab)"
stars: "30K+"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "llm"
  - "deep-research"
  - "knowledge-curation"
  - "agentic-rag"
---

## storm — LLM 自動研究與維基文章生成系統

> **stanford-oval/storm** | ⭐ 30,445 | 🍴 2,846 | 📝 MIT
> "An LLM-powered knowledge curation system that researches a topic and generates a full-length report with citations."

---

### 一句話說明

STORM 是史丹福 OVAL 實驗室的 LLM 知識整理系統：給一個主題，它先上網做研究（多視角提問＋模擬「維基編輯 vs 領域專家」對話）、產出大綱，再依大綱寫出帶引用的完整維基式長文。Co-STORM 進一步加入人機協作圓桌討論（LLM 專家＋主持人＋真人使用者輪流發言）與動態心智圖。目標使用者是需要「深度研究→結構化長文」的研究者與寫作者；官方定位明確：**產出不是成品，是 pre-writing 階段的草稿**（維基資深編輯評價為「預寫階段有幫助」）。兩篇論文分別發表於 NAACL 2024 與 EMNLP 2024，線上 demo 超過 7 萬人試用。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 30,445 |
| Forks | 2,846 |
| 主要語言 | Python |
| 授權 | MIT License |
| 建立時間 | 2024-03-24 |
| 最後推送 | 2025-09-30 |
| Open Issues | 58 |
| Open PRs | 49 |
| 最新 Release | v1.1.0（2025-01-23；PyPI 上為 1.1.1） |
| Topics | large-language-models, nlp, knowledge-curation, retrieval-augmented-generation, agentic-rag, deep-research, naacl, emnlp2024 |
| 首頁 | http://storm.genie.stanford.edu（research preview demo） |
| 是否 Archived | 否（但近 12 週 commit 為 0，維護趨於停滯） |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 68 |
| 總 Tokens | 999,539（其中 86.2% 是 assets/overview.svg 示意圖；實際程式碼約 13.8 萬 tokens） |
| 壓縮模式 | 否（repo 僅 ~8MB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| assets/overview.svg | 861,191 | 86.2% |
| assets/logo.svg | 10,003 | 1% |
| knowledge_storm/rm.py | 9,750 | 1% |
| knowledge_storm/lm.py | 9,516 | 1% |
| knowledge_storm/utils.py | 6,834 | 0.7% |

程式碼本體極精簡：核心引擎 `knowledge_storm/` 不到 30 個 Python 檔，是「小程式碼、大方法論」型專案。

---

### 核心功能

- **STORM 四段管線**：Knowledge Curation（多視角網路研究）→ Outline Generation（層級大綱）→ Article Generation（依大綱填寫帶引用內文）→ Article Polishing（摘要與去重潤稿），每段可獨立開關（`do_research` / `do_generate_outline` / `do_generate_article` / `do_polish_article`），支援斷點續跑。
- **兩個關鍵研究策略**：①視角引導提問（先調查同類主題文章找出不同視角，用視角控制提問方向）②模擬對話（「維基作者 × 錨定網路來源的專家」多輪問答，讓 LLM 邊查邊更新理解、追問下去）——論文實測比 outline-driven RAG baseline 組織性 +25%、廣度 +10%（絕對值）。
- **Co-STORM 協作討論**：LLM 專家群 + 主持人（專問「檢索到但還沒用到的資訊」啟發性問題）+ 真人使用者三方輪流發言，由 `DiscourseManager` 管理輪次政策；並維護動態**心智圖**（`KnowledgeBase` 層級概念樹）降低長對話的認知負擔，最後 `generate_report()` 產出報告。
- **模型層全面 litellm 化**（v1.1.0）：任何 litellm 支援的 LLM／embedding 都能接；另保留 OpenAI/Azure/Claude/Gemini/Groq/DeepSeek/Ollama/VLLM/Together 等舊版直連 class。
- **檢索層 10 種可換**：YouRM、BingSearch、VectorRM（**接自有文件語料**，Qdrant 向量庫）、SerperRM、BraveRM、SearXNG、DuckDuckGo、Tavily、GoogleSearch、AzureAISearch。
- **配套資料集**：FreshWiki（100 篇高品質新維基文章，防資料污染）與 WildSeek（真實使用者深度搜尋意圖），皆在 HuggingFace 公開。
- **Streamlit 輕量前端** `frontend/demo_light`：本地跑 demo 用的最小 UI。

---

### 技術架構

（基於原始碼 class 結構歸納，非僅抄 README）

```
knowledge_storm/
├─ interface.py        ← 抽象層：Engine / KnowledgeCurationModule / OutlineGenerationModule
│                         / ArticleGenerationModule / ArticlePolishingModule / Retriever / Agent (ABC)
├─ lm.py               ← LM 統一封裝：LitellmModel（主力）+ 各家直連 class（dspy LM 子類）
├─ rm.py               ← 10 種檢索模組（皆為 dspy.Retrieve 子類）
├─ dataclass.py        ← ConversationTurn / KnowledgeNode / KnowledgeBase（Co-STORM 心智圖）
├─ encoder.py          ← Embedding 封裝
├─ storm_wiki/         ← STORM 實作：STORMWikiRunner(Engine) + 4 模組
│   └─ modules/        ← knowledge_curation / outline_generation / article_generation
│                        / article_polish / persona_generator / retriever / storm_dataclass
└─ collaborative_storm/ ← Co-STORM：CoStormRunner + DiscourseManager + TurnPolicySpec
    └─ modules/        ← co_storm_agents / expert_generation / grounded_QA / mind-map 維護等 12 模組
```

| 層次 | 技術 |
|------|------|
| Prompt 編排 | **dspy**（釘死 `dspy_ai==2.4.9`，全系統的 prompt/簽名/模組化基礎） |
| LLM 接入 | litellm（v1.1.0 起統一入口）＋歷史遺留各家直連 class |
| 檢索 | 搜尋 API ×9 ＋ VectorRM（qdrant-client + langchain-qdrant + sentence-transformers） |
| 網頁清洗 | trafilatura（WebPageHelper，部分程式碼源自同實驗室 WikiChat） |
| 快取/持久化 | diskcache ＋ 本地 pickle dump/load（僅讀自家產物） |
| 前端 | Streamlit（demo_light，選用） |

架構評語：`interface.py` 的 ABC 分層乾淨，四段管線與檢索/模型層完全解耦，README 明示歡迎自訂模組（如改產 bullet-point 格式）——**方法論的可移植性比程式碼本身更有價值**。

---

### 供應鏈稽核

| 檢查項 | 結果 |
|--------|------|
| ① 作者/組織真實性 | ✅ `stanford-oval` = Stanford Open Virtual Assistant Lab 官方 org（2015 年建立、116 個公開 repo、官網 oval.cs.stanford.edu）；PyPI `knowledge-storm` 作者為兩位論文一作（shaoyj@stanford.edu / yuchengj@stanford.edu），home_page 指回本 repo，版本 1.1.1 與 repo 一致，無冒名跡象 |
| ② 安裝腳本 | ✅ `setup.py` 為純標準 setuptools（讀 README＋requirements 而已），**無 cmdclass/post-install hook**；無 curl-pipe-bash 類安裝路徑 |
| ③ 相依套件存在性 | ✅ requirements.txt 全部 12 個套件逐一查 PyPI 均 200（dspy_ai／wikipedia／sentence-transformers／toml／langchain-text-splitters／trafilatura／langchain-huggingface／qdrant-client／langchain-qdrant／numpy／litellm／diskcache）；無幽靈套件、無 typosquat 形跡。注意 `dspy_ai==2.4.9` 釘死舊版（dspy 現行已 2.6+ 且改名 `dspy`），未來相依衝突風險在此 |
| ④ 安裝改動面 | ✅ 純 pip 套件，不寫設定檔、不改 PATH、不裝服務；重量級相依（sentence-transformers 拉 torch）屬功能所需非異常 |
| ⑤ 對外網路呼叫面 | ✅ 掃描全部程式碼（排除 SVG 巨行），對外端點全部是文件化的 LLM/搜尋 API（api.anthropic.com、api.bing.microsoft.com、api.serper.dev、api.ydc-index.io、api.search.brave.com、api.together.xyz、api.groq.com、api.deepseek.com 等）——RAG 系統的正常呼叫面，**無遙測、無不明回傳**。危險 pattern 掃描：無 subprocess/os.system/eval/exec；`pickle.load` 僅用於讀自家 dump 的中間產物（載入不可信 pickle 檔才有風險）；base64 僅前端 demo 讀圖片顯示用 |

**一句話結論：五項全過，官方學術 org＋標準打包＋相依全實＋呼叫面透明，供應鏈風險低；唯一注意點是 `dspy_ai==2.4.9` 釘死舊版帶來的長期維護風險（非安全問題）。**

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | shaoyijia, Yucheng-Jiang, AMMAS1, evidencebp, hdelossantos 等 | 核心＝兩位論文作者 |
| 近 12 週 commit | 0（最後一筆 2025-09-30，僅放寬 requirements 版限） | 低迷（研究性專案論文發完後常態） |
| Release 頻率 | v0.2.x→v1.0.0（2024-09）→v1.1.0（2025-01），之後無 | 已停更逾一年 |
| Issue 動態 | 58 open / 最近一筆 closed 於 2026-07-27 | 仍有人分診但不積極 |
| YouTube 教學訊號 | 5+ 支教學（最高 Nate Herk 5.9 萬觀看、WorldofAI 1.3 萬） | 教學生態存在、屬中等熱度 |

---

### 社群口碑

（來源：Exa 語意搜尋 ×2；Reddit/X CLI 路未跑，見文末稽核註記）

**熱門討論：**
- r/notebooklm「Has anyone tried Storm and Co-Storm?」：定位被理解為「一半 DeepResearch、一半 NotebookLM」——研究報告像前者、Co-STORM 圓桌像後者。
- r/perplexity_ai「Stanford's STORM outperforms Perplexity & Google Deep Research」：免費開源＋維基式完整報告被拿來對打商用 Deep Research。
- 部落格〈STORM Without Retrieval Is Just Five Hallucinations in a Trench Coat〉（2026-06）：批評瘋傳的「4 段 prompt 在 Claude 裡跑 STORM」抽掉了檢索——沒有 grounding 的多視角人設只是「五個幻覺穿同一件風衣」，點出 **STORM 的價值核心在檢索錨定而非人設扮演**。

**正面回饋：** 輸出品質令人驚豔（有人第一次就拿到 11 頁帶引用研究報告）；免費開源；論文數據紮實（組織性 +25%／廣度 +10%）。

**負面回饋 / 已知問題：** demo UI 笨重緩慢、主題輸入限 20 字；Co-STORM 圓桌對話「不自然」，距 NotebookLM 體驗有差距；論文自承的失敗模式——**來源偏見轉移**（source bias transfer）與**紅鯡魚**（把不相關事實過度關聯、卻寫得斬釘截鐵）；產出仍需大量人工編修才能發表。

---

### 與現有系統的相關性評估

這篇的核心問題：STORM 是「AI 寫 wiki」的系統，而使用者的日常正是 AI 寫 wiki——重疊多少、增量在哪？

| 面向 | 評估 |
|------|------|
| **Obsidian 三層檢索工作流（wiki＋gbrain＋NotebookLM）** | 高度同域但**流程覆蓋率已高**：repo-intel／article-decode 產出線＝「多引擎研究→結構化繁中長文→入庫」，正是 STORM 的 pre-writing 管線精神。STORM 的增量不在取代，而在**方法論三招**：①視角引導提問（寫 wiki 前先問「這主題有哪幾種讀者視角」）②模擬對話式追問（不是一輪搜完就寫，是邊查邊追問）③大綱先行、引用錨定——這三招可直接回灌 research/research-deep skill 的 prompt 設計，零安裝成本 |
| **Claude Code Skills/MCP** | 以 Python 套件形式接入意義不大：research-deep 已用 Claude 原生 agentic search 做同樣的事，且不需維護 OpenAI＋搜尋 API 雙份 key。真正獨有的是 **VectorRM 接自有語料**（Qdrant）——「錨定在自己 62 萬字金融教材上生成新文章」這件事目前系統沒有對應物（gbrain 是檢索、不是生成管線）；若有此需求 STORM 是現成方案 |
| **Automation** | 雷曼教材這類「大量生成長文」產線若要再跑一次，STORM 的四段可斷點管線（research／outline／article 分離、可重跑單段）是值得抄的工程結構；Co-STORM 的人機協作輪次管理對單人工作流過重 |

另一層警示與本 vault 相關：社群那篇「風衣文」的教訓——**抽掉檢索的 STORM 式 prompt 是幻覺製造機**。使用者的 wiki 產線一向堅持「一手來源、證據分級」，這正是 STORM 論文結論的同款立場，可引為體例佐證。

---

### 安裝建議

**⏳ 觀望** — 方法論價值高、套件本身增量低。理由：①「深度研究→長文」需求已被 research-deep＋repo-intel／article-decode 產線覆蓋，且走 Claude 原生不需另備 OpenAI＋搜尋 API key；②專案停更逾一年、dspy 釘死 2.4.9 舊版，現在裝進環境是接一個不再演進的相依樹；③它最值錢的三招（視角引導提問／模擬對話追問／大綱先行）讀論文與原始碼就能吸收，本篇已萃取完畢。

- **升級條件（→ ✅ 裝）**：出現「錨定自有語料批量生成長文」的實際需求（例：以雷曼教材＋london-blackcat 語料為底自動產新模組草稿）→ `pip install knowledge-storm` 進隔離 venv，只用 VectorRM＋litellm 路徑試跑一題驗證品質。
- **放棄條件（→ ❌ 除名）**：repo 滿 18 個月零 commit（即 2027-03 前無新推送）且 dspy 相依開始與 Python 新版衝突、社群 fork 也無活躍接手 → 從觀望清單移除，只保留方法論筆記。

---

### 相關連結

- [[Github/_index|GitHub 索引]]
- 同域產線：repo-intel skill（本篇產出工具）、article-decode（文章入庫線）
- 三層檢索：[[Tools/gbrain|gbrain]]（若存在）、NotebookLM 書庫
- 論文：[STORM (NAACL 2024)](https://arxiv.org/abs/2402.14207)、[Co-STORM (EMNLP 2024)](https://www.arxiv.org/abs/2408.15232)
- 資料集：[FreshWiki](https://huggingface.co/datasets/EchoShao8899/FreshWiki)、[WildSeek](https://huggingface.co/datasets/YuchengJiang/WildSeek)

---

### 延伸操作

- 想要完整架構圖譜？→ 執行 `/understand`
- 想搜尋特定 symbol？→ 用 `/smart-explore`
- 想比較類似專案？→ 再跑一次 `/repo-intel` 分析另一個 repo（如 gpt-researcher）
