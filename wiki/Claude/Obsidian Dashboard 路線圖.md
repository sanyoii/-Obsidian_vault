# Obsidian Dashboard 路線圖

> **分類：** Claude / 系統
> **標籤：** `#Claude` `#系統` `#obsidian` `#dashboard` `#roadmap`
> **建立：** 2026-06-03
> **最後更新：** 2026-06-03（Phase 2 完成 v3）
> **靈感來源：** Chase AI — "The Claude Code + Obsidian Setup That Now Runs My Life"（Bilibili）

---

## 目標

把 Obsidian 打造成一個 **Claude Code 驅動的指揮中心**：
- 一眼看到今日狀態（職缺、社群、GitHub 熱門、HN、Product Hunt、Lobsters）
- 一鍵觸發 Vault 自動化流程
- 即時深色風格 Dashboard，開在主內容區 Tab

---

## 路線圖總覽

| Phase | 名稱 | 狀態 | 完成日 |
|-------|------|------|--------|
| 0 | Ribbon 按鈕 | ✅ 完成 | 2026-06-03 |
| 1 | 輕量版 Bases Dashboard | ✅ 完成 | 2026-06-03 |
| 2 | 完整 Plugin Panel（v3 四欄）| ✅ 完成 | 2026-06-03 |
| 3 | Google Calendar | ✅ 完成 | 2026-06-03 |
| 4a | Email Brief（Gmail 重要郵件摘要）| ✅ 完成 | 2026-06-03 |
| 4b | 進階互動（職缺操作/Careerbot）| 🔄 未來 | — |

---

## ✅ Phase 0：Ribbon 按鈕（完成 2026-06-03）

- 建立 Command Center 自製 Obsidian Plugin
- 5 個 Ribbon 按鈕：⚙️ Dashboard / ☀️ Morning Briefing / 📚 Compile / 🔍 Lint / ✏️ Quick Capture
- PowerShell 腳本串接 social-monitor + job-crawler
- Morning Briefing → `wiki/Daily/Morning_YYYY-MM-DD.md`

---

## ✅ Phase 1：輕量版 Bases Dashboard（完成 2026-06-03）

- `wiki/Daily/Daily.base`：Morning Briefing 表格視圖
- `wiki/Social/Social.base`：社群動態表格
- `Home.md`（vault 根目錄）：嵌入兩個 Base + 快速導航

限制：靜態表格，無即時更新，無深色設計，無外部資料。

---

## ✅ Phase 2：完整 Plugin Panel（完成 2026-06-03，v3）

### 最終版面（2×2 grid + Morning Brief）

```
┌──────────────────┬──────────────────┐
│  GITHUB TRENDING │  HACKER NEWS     │
│  點擊 → repomix  │  點擊 → 開原文   │
├──────────────────┼──────────────────┤
│  PRODUCT HUNT    │  LOBSTERS        │
│  點擊 → 開頁面   │  點擊 → 開原文   │
├──────────────────┴──────────────────┤
│  MORNING BRIEF                      │
│  [☀️] [📚] [🔍] [✏️] [🔄]          │
│  新職缺 · 社群 · Token 估算          │
└─────────────────────────────────────┘
```

### 資料橋接架構

```
scripts/fetch-dashboard-data.ps1
    ├── GitHub Trending（beautifulsoup4 爬蟲）
    ├── Hacker News（Firebase API，id 欄備用 HN 討論頁）
    ├── Product Hunt（GraphQL API，token 在 data/ph_token.txt）
    ├── Lobsters（lobste.rs JSON API，取代 Reddit）
    ├── job-crawler SQLite → 未讀職缺數
    ├── social-monitor 最新報告標題
    └── Claude session JSONL 行數 → token 估算
            ↓
    data/dashboard.json（Plugin 每 30 秒讀取，自動刷新）
```

### 互動功能

| 面板 | 點擊行為 |
|------|---------|
| GitHub Trending | 執行 `analyze-repo.ps1`，headless Claude repomix 分析 → wiki 文章 |
| Hacker News | `electron.shell.openExternal(url)` 開原文，無 url 則開 HN 討論頁 |
| Product Hunt | 開產品頁 |
| Lobsters | 開原文 |

### 新增腳本

| 腳本 | 說明 |
|------|------|
| `scripts/fetch-dashboard-data.ps1` | 四大資料源抓取 + 指標計算 |
| `scripts/analyze-repo.ps1` | 接受 `$Repo`，headless Claude repomix 分析 |

### 樣式設計

- 字型：`var(--font-interface)` 跟隨 Obsidian 設定（sans-serif）
- 數字/rank/badge：`var(--font-monospace)`（JetBrains Mono 等）
- 深色主題：#0d0d0d 底，#ff6b00 橘色強調

---

## 資料源對照表（最終狀態）

| 資料 | 來源 | 狀態 |
|------|------|------|
| GitHub Trending | github.com/trending 爬蟲 | ✅ |
| Hacker News | Firebase API | ✅ |
| Product Hunt | GraphQL API（免費 token）| ✅ |
| Lobsters | lobste.rs JSON | ✅ |
| 新職缺數 | job-crawler SQLite | ✅ |
| 社群動態 | social-monitor 報告 | ✅ |
| Token 估算 | JSONL 行數估算 | ✅（粗估）|
| 今日行程 | Google Calendar MCP → calendar.json | ✅ |
| 重要郵件 + Todo | Gmail MCP → email-brief.json | ✅ |
| Daily Tasks | Morning Briefing Today's Tasks | 🔄 Phase 4b |

---

## ✅ Phase 3：Google Calendar 整合（完成 2026-06-03）

**做了什麼：**
- 新建 `scripts/fetch-calendar.ps1`
  - 呼叫 headless Claude（`--dangerously-skip-permissions`）
  - 使用 `mcp__claude_ai_Google_Calendar__list_events` 取今日事件
  - 輸出至 `data/calendar.json`
- 更新 `fetch-dashboard-data.ps1`：讀取 calendar.json → 填入 schedule 欄位
- 更新 `main.js`：新增 `renderSchedule()`、Morning Brief 加「📅 日曆」按鈕
- 更新 `styles.css`：行程區塊樣式（全天 / 時間 / 地點）

**效果：** Morning Brief 下方顯示今日行程，全天事件標示「全天」，有時間的顯示 HH:MM（橘色）

---

## ✅ Phase 4a：Email Brief（完成 2026-06-03）

**做了什麼：**
- 新建 `scripts/fetch-email-brief.ps1`：headless Claude + `--dangerously-skip-permissions` 呼叫 Gmail MCP
  - `search_threads`：`is:unread OR is:important newer_than:2d`（max 15）
  - `get_thread`：讀各 thread 內容
  - Claude 評估重要程度 + 萃取待辦事項 → `data/email-brief.json`
- 更新 `fetch-dashboard-data.ps1`：讀取 email-brief.json → emailBrief 欄位
- 更新 `main.js`：新增 `renderEmailBrief()`、EMAIL BRIEF 全寬區塊（Morning Brief 下方）、「📧 Email」按鈕
- 更新 `styles.css`：四個重要程度樣式（Emergency 紅色閃爍 / High 橘 / Medium 黃 / Low 灰）

**四個重要程度：**

| 程度 | 標籤 | 定義 |
|------|------|------|
| Emergency | 🚨EMG（閃爍）| 數小時內必須處理 |
| High | ⚡HIGH | 今日需處理 |
| Medium | 📌MED | 近期閱讀，無立即行動 |
| Low | · LOW | 僅供參考，略過 newsletter |

**已驗證：** 正確識別 Neromo 餐廳訂位（High，3 個待辦），略過 13 封 newsletter/自動通知

---

## 🔄 Phase 4b：未來擴充方向

- **職缺快速操作**：Dashboard 內直接標記 applied / not_interested（需要 Flask API 橋接）
- **社群趨勢摘要**：讀最新 social-monitor 報告第一則熱門話題顯示在指標列
- **Careerbot 狀態**：顯示求職進度（需先完成 CareerBot /onboard）
- **Token 精確版**：解析 session JSONL 的 usage 欄位取得實際 token 數

---

## 相關文章

- [[Command Center Plugin — Obsidian 指揮中心]] — Plugin 完整技術說明
- [[知識庫操作手冊]] — /compile /lint /query /morning 指令集
- [[Claude環境操作手冊]] — 整體 d:\Claude 環境說明

## 反向連結

- [[Command Center Plugin — Obsidian 指揮中心]]
- [[知識庫操作手冊]]
