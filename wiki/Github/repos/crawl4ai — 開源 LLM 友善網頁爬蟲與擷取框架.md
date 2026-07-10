---
source: "https://github.com/unclecode/crawl4ai"
author: "unclecode (Unclecode)"
stars: "72.1K"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "web-crawler"
  - "llm-tools"
  - "開發工具"
---

# crawl4ai — 開源 LLM 友善網頁爬蟲與擷取框架

> **unclecode/crawl4ai** | ⭐ 72.1K | 🍴 7.4K | 📝 Apache-2.0
> "🚀🤖 Crawl4AI: Open-source LLM Friendly Web Crawler & Scraper. Don't be shy, join here: https://discord.gg/jP8KfhDhyN"

---

## 一句話說明

Crawl4AI 是一套完全開源、免 API Key、自架式的非同步網頁爬蟲框架，把任意網頁轉成乾淨、結構化的 Markdown（供 RAG/Agent/資料管道使用），並內建 LLM 驅動與非 LLM（CSS/XPath）兩套結構化擷取策略、深度爬取（BFS/DFS/BFF）與自適應資訊覓食（Adaptive Crawling）能力，是目前 GitHub 上星數最高的爬蟲專案。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 72,165 |
| Forks | 7,396 |
| 主要語言 | Python（另含 Dockerfile / JavaScript / Shell） |
| 授權 | Apache License 2.0 |
| 建立時間 | 2024-05-09 |
| 最後推送 | 2026-07-09 |
| Open Issues | 21 |
| Open PRs | 85 |
| 最新 Release | v0.9.1（2026-07-08） |
| 首頁 | https://crawl4ai.com |
| 是否 Archived | 否 |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 842 |
| 總 Tokens | 3,102,541 |
| 壓縮模式 | 是（`--compress`，diskUsage ≈147MB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| docs/apps/linkdin/Crawl4ai_Linkedin_Data_Discovery_Part_1.ipynb | 607,664 | 19.6% |
| sbom/sbom.cdx.json | 436,039 | 14.1% |
| tests/async/sample_wikipedia.html | 258,108 | 8.3% |
| deploy/docker/c4ai-code-context.md | 91,579 | 3% |
| deploy/docker/c4ai-doc-context.md | 72,163 | 2.3% |

（Top5 幾乎全是範例 notebook / SBOM 清單 / 測試 fixture，真正核心程式碼集中在 `crawl4ai/` 套件本體，佔比不高但功能密度高。）

---

## 核心功能

- **Markdown 生成**：Fit Markdown（BM25 啟發式過濾雜訊）、引用/連結轉數字引用清單、可自訂生成策略。
- **結構化擷取**：LLM 驅動擷取（支援所有主流 LLM）+ 非 LLM 的 CSS/XPath schema 擷取，另有分塊策略（topic/regex/sentence）與 cosine 相似度篩選。
- **瀏覽器整合**：Managed Browser（用使用者自己的瀏覽器規避偵測）、CDP 遠端連線、Browser Profiler（持久化登入態）、Session 管理、Stealth 模式、Chromium/Firefox/WebKit 多引擎。
- **深度爬取**：BFS/DFS/BFF 三種策略 + 自訂 scorer/filter；`prefetch=True` 模式加速 URL 發現 5-10 倍；崩潰恢復（`resume_state`）。
- **自適應智慧**（Adaptive Crawling）：以資訊覓食演算法判斷「何時已蒐集足夠資訊可回答查詢」，避免過度爬取（`crawl4ai/adaptive_crawler.py`）。
- **C4A Script**：專屬 DSL（`crawl4ai/script/`），可寫可重複執行的互動腳本（登入、捲動等），有 `lark` 文法解析器。
- **站點特化爬蟲**：內建 Amazon 商品、Google 搜尋等現成 crawler（`crawl4ai/crawlers/`）。
- **部署**：Docker 化 FastAPI Server，內建 JWT 認證、egress proxy/broker（防 SSRF）、監控儀表板，且**內建 MCP Bridge**——可把整個 API 以 WebSocket/SSE 暴露成 MCP 工具（`deploy/docker/mcp_bridge.py`），供 Claude Code 等 MCP client 直接呼叫。
- **官方 AI Assistant Skill**：專案首頁直接提供 Crawl4AI 官方 Claude/Cursor/Windsurf Skill 套件（23K+ 字 SDK 參考 + 範例腳本），可直接匯入 AI 助手技能系統。

---

## 技術架構

```
crawl4ai/
├── async_webcrawler.py       # 核心入口：AsyncWebCrawler.arun() / arun_many()
├── async_crawler_strategy.py # Playwright/Patchright 瀏覽器爬取策略
├── async_dispatcher.py       # 併發排程 / 爬取池
├── content_scraping_strategy.py / content_filter_strategy.py  # HTML→結構化擷取、雜訊過濾
├── markdown_generation_strategy.py  # Markdown 產生（Fit/BM25）
├── extraction_strategy.py    # LLM / CSS-XPath 擷取策略
├── deep_crawling/            # BFS / DFS / BFF 深度爬取策略 + scorer/filter
├── adaptive_crawler.py        # 自適應資訊覓食（何時停止爬取）
├── script/                    # C4A Script DSL（lark 文法 + 編譯器）
├── crawlers/                  # 站點特化爬蟲（Amazon、Google Search）
├── processors/pdf/            # PDF 處理
├── browser_manager.py / browser_profiler.py / browser_adapter.py
├── cli.py                      # `crwl` 命令列介面
└── install.py / migrations.py  # crawl4ai-setup / crawl4ai-doctor / crawl4ai-migrate

deploy/docker/
├── server.py / api.py         # FastAPI Server（生產部署）
├── auth.py / auth_gate.py     # JWT 認證、Auth Gate Middleware（secure-by-default）
├── egress_proxy.py / egress_broker.py  # 出口代理（防 SSRF）
├── mcp_bridge.py               # 把 REST API 橋接成 MCP（WS+SSE）工具
├── crawler_pool.py / governor.py / work_queue.py  # 併發池、資源治理、任務隊列
└── monitor.py / monitor_routes.py  # 即時監控儀表板
```

| 層次 | 技術 |
|------|------|
| 爬取引擎 | Playwright / Patchright（多瀏覽器）+ playwright-stealth |
| 內容處理 | BeautifulSoup4 + lxml + rank-bm25（Markdown/過濾） |
| LLM 擷取 | `unclecode-litellm`（統一多模型介面） |
| DSL | lark（C4A Script 文法解析） |
| 部署 | FastAPI + Docker + Redis（配置） |
| MCP | 自製 `mcp_bridge.py`（FastAPI 路由 → MCP tool 自動橋接） |

**主要依賴**：playwright、patchright、httpx（HTTP/2）、pydantic 2.10+、numpy、alphashape/shapely（自適應爬取的覆蓋範圍計算）、lark（DSL）。Python ≥3.10。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top10 | unclecode, ntohidi, aravindkarnam, SohamKukreti, hafezparast, claude(bot), murphycw, YuriNachos, prokopis3, bizrockman | 核心維護者集中 unclecode 本人 |
| 近 4 週 commit | 2/3/8/6 | 穩定持續開發 |
| Release 頻率 | v0.8.7→v0.8.8→v0.8.9→v0.9.0→v0.9.1，約每 1-2 週一版 | 頻繁，含多次安全修補版 |
| Issue / PR | 21 open issues / 85 open PRs | PR 量偏高，review 壓力存在 |

---

## 社群口碑

**熱門討論**：
- Reddit（r/AgentsOfAI）「Firecrawl vs Crawl4ai」實測比較：Crawl4AI 免費、自架、Docker 約需 1 小時建置起來；缺點是需自行維運（曾遇到服務莫名停止需除錯基礎設施）、對 JS 重度網站的擷取效果不如託管型服務穩定。
- Reddit（r/LLMDevs）另有一份 Firecrawl vs Crawl4AI 對照表（第三方 webfuse.com 製作），定位為「免費自架 vs 付費託管」的取捨參考。
- X/Twitter 中文開發者社群近期仍在持續推薦，強調零 API Key、非同步瀏覽器池、Docker 一鍵部署。
- YouTube 教學生態成熟：官方教學（Unclecode 頻道）、多支第三方教學影片，其中 Cole Medin 的「Turn ANY Website into LLM Knowledge in SECONDS」單支即有 45 萬+ 觀看。

**正面回饋**：完全免費、無需 API Key、輸出乾淨可直接餵給 LLM、對「零預算個人專案」極具吸引力。

**已知取捨（非 bug，是自架框架的固有特性）**：需自行管理 Docker/瀏覽器環境（至少 4GB RAM）、對高防護（Cloudflare 等）與重度 JS 站點的成功率不如 Firecrawl 這類付費託管服務穩定；出問題需自己排查基礎設施。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接整合點；可作為未來「網頁批次擷取入庫」的候選引擎之一，但目前 defuddle + agent-reach 已覆蓋日常需求。 |
| **Claude Code** | 官方已提供 Claude/Cursor/Windsurf 專用 AI Assistant Skill 套件（23K+ 字 SDK 參考），且 Docker 部署內建 MCP Bridge，可讓 crawl4ai 的爬取/擷取能力直接以 MCP 工具形式掛給 Claude Code 使用——這是與現有 firecrawl（純 SaaS，需 API Key）最大的差異化：crawl4ai 可完全本機/自架運行、免金鑰、免按量計費。 |
| **Automation** | 深度爬取（BFS/DFS + 自適應覓食）與站點特化爬蟲（Amazon/Google Search）可用於需要大量爬取且不想付費的自動化情境；但需自行維運 Docker + Playwright 環境，比 firecrawl 的「打 API 就好」多一層維運成本。 |

**與既有工具的重疊評估**：目前環境已有 firecrawl（5 skills + MCP，SaaS，需 API Key，尚未申請）、defuddle（單頁清洗，免費 CLI）、agent-reach（多平台社群感知）、last30days（社群輿情）。crawl4ai 與這些工具的定位差異在於：它是**自架開源、零金鑰、可深度爬取整站**的重量級方案，適合「大量、免費、可控」的爬取需求；而 firecrawl 是「免維運、高成功率、但要錢」的託管方案。兩者互補而非取代——若 FIRECRAWL_API_KEY 遲遲未申請，crawl4ai 是現成的免費替代路徑。

---

## 安裝建議

⏳ 建議安裝、尚未裝 — 理由：72K+ 星、維護活躍（近期仍每 1-2 週發版含安全修補）、官方直接提供 Claude Code Skill 套件與 MCP Bridge，與本環境「網頁爬取免 API Key」的潛在需求高度吻合；但需 Docker + Playwright 環境（≥4GB RAM），且目前 defuddle/agent-reach 已覆蓋大多數單頁擷取需求，安裝優先度中等——待有「整站深度爬取」或「firecrawl API Key 遲遲未到位」的實際需求時再裝。

## 整合評估：不併入 repo-intel

**結論：不建議把 crawl4ai 整合進 `repo-intel` skill（R13 判「不做」）。**

- repo-intel 六引擎裡唯一與爬取相關的是 Phase 3（defuddle 爬官方文件站，失敗備援 Jina Reader），只抓 **homepageUrl 單頁**。為了「defuddle + Jina 都失敗的少數 JS 重度頁面」扛一整個 Docker 服務常駐——加複雜度換小改善，不划算。本次 crawl4ai 分析本身 defuddle 失敗後 Jina 就接住了，Phase 3 沒開天窗。
- crawl4ai 真正強在 **deep crawl（整站多頁）**，這不是 repo-intel 的工作（repo-intel 是 repo 快照分析，不抓文件站鏡像）。
- **真正對口的整合點**：①`article-decode`（現用 defuddle 抓單篇，要抓整個系列/多頁文件時 crawl4ai deep crawl 才對）②未來的「文件站入庫 gbrain」工作流（目前無此 skill）。要裝 crawl4ai 就接這兩處，別為 repo-intel 的單頁 Phase 3 硬塞。

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/firecrawlfirecrawl — 網頁爬取轉 Markdown SaaS 平台|firecrawl]]
- [[Github/repos/firecrawlskills — Firecrawl Claude Code Skills 分析|firecrawl-skills 分析]]
