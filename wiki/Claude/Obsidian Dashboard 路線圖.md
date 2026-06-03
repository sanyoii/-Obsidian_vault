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
| 3 | Google Calendar + 進階互動 | 🔄 未來 | — |

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
| 今日行程 | Google Calendar | 🔄 Phase 3 |
| Daily Tasks | 動態讀取 | 🔄 Phase 3 |

---

## 🔄 Phase 3：未來擴充方向

- **Google Calendar 整合**：MCP + 橋接腳本 → 今日行程顯示在 Morning Brief
- **職缺快速操作**：Dashboard 內直接標記 applied / not_interested
- **社群趨勢摘要**：讀最新報告第一個熱門話題顯示在 Widget
- **Careerbot 狀態**：顯示求職進度（applied / interview 數量）
- **Token Burn 精確版**：解析 session JSONL 取得實際用量

---

## 相關文章

- [[Command Center Plugin — Obsidian 指揮中心]] — Plugin 完整技術說明
- [[知識庫操作手冊]] — /compile /lint /query /morning 指令集
- [[Claude環境操作手冊]] — 整體 d:\Claude 環境說明

## 反向連結

- [[Command Center Plugin — Obsidian 指揮中心]]
- [[知識庫操作手冊]]
