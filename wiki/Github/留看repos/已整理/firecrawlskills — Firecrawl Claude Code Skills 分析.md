# firecrawl/skills — Firecrawl Claude Code Skills 分析

來源：https://github.com/firecrawl/skills  
類型：**Claude Code Skills**（同時支援 Cursor / Codex）  
授權：ISC（最寬鬆，可商業使用）  
分析日期：2026-06-05

---

## 結論：✅ 值得安裝

5 個 skills 輕量、清晰、有完整 reference docs，直接服務「把 Firecrawl 整合進 code」這個需求。不臃腫，觸發條件設計合理。另有 MCP server config，可讓 Claude 在 session 中直接呼叫 Firecrawl API。

---

## 5 個 Skills 清單

| Skill | 觸發情境 | 功能 |
|-------|---------|------|
| `firecrawl-build` | 任何「app 需要網路資料」的情境 | 主 umbrella skill，引導整合流程 |
| `firecrawl-build-onboarding` | 需要 API key / SDK 設定 | 取得 `FIRECRAWL_API_KEY`，含瀏覽器 OAuth 流程 |
| `firecrawl-build-scrape` | 已有 URL，需要單頁內容 | 整合 `/scrape`（→ Markdown/JSON/HTML）|
| `firecrawl-build-search` | 從查詢開始，不知道 URL | 整合 `/search`（查詢 → 找頁面）|
| `firecrawl-build-interact` | 頁面需要點擊/表單/登入才能拿到資料 | 整合 `/interact`（瀏覽器動作）|

**Endpoint 選擇邏輯：**
```
已知 URL          → /scrape
從查詢開始         → /search（再決定是否 /scrape）
需要點擊/登入      → /interact（先 /scrape，再升級）
```

---

## 安裝方式

### 方式 A：只安裝 build skills（推薦）

```bash
npx skills add firecrawl/skills
```

手動複製到 user-level skills：
```powershell
# 從 GitHub 下載後複製到 active skills 目錄
Copy-Item "firecrawl-skills\skills\*" "C:\Users\sanyo\.claude\skills\" -Recurse -Force
Copy-Item "firecrawl-skills\skills\*" "d:\Claude\.claude\skills\" -Recurse -Force
```

### 方式 B：完整安裝（包含 CLI + skills）

```bash
npx -y firecrawl-cli@latest init --all --browser
```

安裝內容：
- Firecrawl CLI（終端機直接爬網頁的工具）
- CLI skills（`firecrawl/cli` repo）
- Build skills（這個 repo）
- 觸發瀏覽器授權流程取得 API key

### 前置需求

申請免費 API key：https://www.firecrawl.dev/app

```env
FIRECRAWL_API_KEY=fc-...
# 自架版本才需要
# FIRECRAWL_API_URL=https://your-instance.example.com
```

---

## MCP Server（加碼：讓 Claude 直接呼叫 Firecrawl）

repo 內含 `.mcp.json` 設定：

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"
      }
    }
  }
}
```

加到 `~/.claude/mcp.json` 後，Claude 在 session 中可以直接用 MCP tools 呼叫 Firecrawl，不需要寫 code。

---

## 重要邊界（Skills 的使用場景）

這套 skills 是「**寫 code 整合**」用的，不是「**session 中即時爬網頁**」：

| 情境 | 用哪個 |
|------|--------|
| 我要在 job-crawler 程式裡加 Firecrawl 功能 | `firecrawl-build` skill |
| 我現在想讓 Claude 幫我查某個網頁的資料 | CLI skills（`firecrawl/cli`）或 MCP server |
| 我想抓一個網頁轉 Markdown 存進 gbrain | 直接用 Python SDK，或讓 Claude 透過 MCP 工具做 |

---

## 與現有專案的整合建議

| 我的專案 | 具體用途 |
|---------|---------|
| `job-crawler` | 用 `firecrawl-build-scrape` 引導 Claude 把現有 Playwright 爬蟲換成 `pip install firecrawl-py` + `/scrape` |
| `gbrain` | 用 `/scrape` 把網頁文章轉 Markdown 後放進 brain-docs |
| `obsidian-dashboard` | 新聞來源爬取可改用 Firecrawl（比自寫 RSS parser 穩定）|

---

## Skills 品質評估

**優點：**
- ISC 授權，無限制
- 每個 skill 有明確「Use This When」觸發條件
- 包含完整 reference docs（auth-flow / endpoint-selection / integration-patterns / verification）
- `firecrawl-build` description 特別寬泛（連「我需要網路資料」都會觸發），覆蓋隱性需求

**注意：**
- 這些 skills 只引導決策，不含實際 API 範例 code（code 要去 docs.firecrawl.dev 查）
- Session 中的即時爬網頁任務要另裝 `firecrawl/cli` 或設定 MCP server

---

## ⚠️ 待辦

- [ ] 申請 `FIRECRAWL_API_KEY`：https://www.firecrawl.dev/app（免費 500 次/月）
- [ ] 加進 Windows 使用者環境變數：
  ```powershell
  [System.Environment]::SetEnvironmentVariable("FIRECRAWL_API_KEY", "fc-...", "User")
  ```
- [ ] 重新啟動 Claude Code → MCP server `firecrawl` 才能使用
- [ ] 驗證：詢問 Claude「用 firecrawl 抓取 https://example.com」，確認 MCP 工具出現

---

*記錄日期：2026-06-05 | 分析：repomix 完整讀取 firecrawl/skills（28 個檔案）*
