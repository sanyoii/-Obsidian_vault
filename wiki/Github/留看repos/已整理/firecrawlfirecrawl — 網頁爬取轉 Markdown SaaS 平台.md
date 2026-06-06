# firecrawl/firecrawl — 網頁爬取轉 Markdown SaaS 平台

來源：https://github.com/mendableai/firecrawl  
類型：完整 SaaS 後端平台（**不是 Claude Code skill**）  
授權：AGPL-3.0  
分析日期：2026-06-05

---

## 這是什麼

Firecrawl 是一個網頁爬取服務，核心能力是把任何網址轉換成乾淨的 **Markdown / JSON / HTML**，供 AI 使用。功能遠超 BeautifulSoup 等傳統爬蟲，能處理 JavaScript 渲染頁面、SPA、動態內容。

---

## 核心 API

| Endpoint | 功能 |
|----------|------|
| `/v1/scrape` | 單頁爬取 → Markdown/JSON/HTML/screenshot |
| `/v1/crawl` | 整個網站遞迴爬取（可設深度/頁數上限） |
| `/v1/map` | 列出網站所有 URL |
| `/v1/search` | 搜尋 + 爬取結果 |
| `/v1/extract` | AI 結構化資料抽取（需 OpenAI key） |
| Deep Research | 多步驟 AI 研究（類 Perplexity） |

---

## 三種使用方式

### 方式 1：雲端 API（推薦個人使用）

免費方案：500 次/月

```python
pip install firecrawl-py
```

```python
from firecrawl import FirecrawlApp
app = FirecrawlApp(api_key="fc-...")

# 單頁
result = app.scrape_url("https://example.com", formats=["markdown"])

# 整站爬取
crawl_result = app.crawl_url("https://docs.example.com", limit=50)
```

```javascript
npm install @mendable/firecrawl-js
```

---

### 方式 2：Claude Code Skill（輕量整合）

Firecrawl 官方有獨立的 Claude Code skills repo：
→ https://github.com/firecrawl/skills

分析見：[[firecrawlskills — Claude Code Skills 分析]]（另一份筆記）

---

### 方式 3：Self-host（Docker，需特定需求才值得）

**安裝 Steps：**

1. 安裝 Docker

2. 建立 `.env`（最小設定）：
   ```env
   PORT=3002
   HOST=0.0.0.0
   USE_DB_AUTHENTICATION=false
   BULL_AUTH_KEY=CHANGEME  # 請改成強密碼
   
   # 選填：AI 功能
   # OPENAI_API_KEY=
   
   # 選填：自訂搜尋引擎
   # SEARXNG_ENDPOINT=http://your.searxng.server
   ```

3. 啟動：
   ```bash
   docker compose build
   docker compose up
   # API: http://localhost:3002
   # Queue UI: http://localhost:3002/admin/CHANGEME/queues
   ```

4. 測試：
   ```bash
   curl -X POST http://localhost:3002/v1/crawl \
     -H 'Content-Type: application/json' \
     -d '{"url": "https://firecrawl.dev"}'
   ```

**Self-host 重要限制：**
- ❌ **不包含 Fire-engine**（Firecrawl 繞過 IP 封鎖/bot 偵測的核心技術）
- 遇到有防爬保護的網站（Cloudflare 等）會失效
- 需要維護 Docker + Redis + PostgreSQL

**適合 self-host 的情況：**
- 高頻量使用（超過免費層）
- 嚴格資料隱私需求
- 需要客製化爬取邏輯

---

## 與現有專案的整合評估

| 專案 | Firecrawl 相關性 | 建議 |
|------|-----------------|------|
| `job-crawler` | ✅ 高 | 替換 Playwright 手動爬蟲，直接取得 Markdown |
| `gbrain` | ✅ 中 | 抓取文章網頁 → Markdown → 匯入 brain-docs |
| `social-monitor` | ❌ 低 | 社群平台有登入牆，Firecrawl 無法繞過 |
| Obsidian 文章收藏 | ✅ 中 | 自動轉換網頁為乾淨 Markdown 存入 Obsidian |

---

## 技術棧（供參考，self-host 時需了解）

```
apps/
  api/          # Node.js + TypeScript 主 API（含 Rust native 模組）
  js-sdk/       # JavaScript SDK
  python-sdk/   # Python SDK
  go-sdk/       # Go SDK
  playwright-service-ts/  # 無頭瀏覽器微服務
```

依賴：Redis（隊列）+ PostgreSQL（可選，啟用 auth）+ Bull（任務隊列）+ Playwright

---

## 注意事項

- AGPL-3.0 授權：若你修改後作為網路服務對外開放，必須公開你的修改
- 自架版本缺少 Fire-engine，JavaScript 密集型網站表現不如雲端版
- API key 在自架版本是 optional（`USE_DB_AUTHENTICATION=false` 時不需要）

---

*記錄日期：2026-06-05 | 分析：repomix + 直接閱讀 SELF_HOST.md*
