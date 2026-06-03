# Command Center Plugin — Obsidian 指揮中心

> **分類：** Claude / 系統
> **標籤：** `#Claude` `#系統` `#obsidian` `#automation` `#plugin`
> **建立：** 2026-06-03
> **最後更新：** 2026-06-03（v3 — Dashboard 四欄 + 互動）
> **來源：** Chase AI YouTube 教學 + 本地整合

---

## 系統目的

把 Obsidian 升級成 **Claude Code 驅動的指揮中心**。提供：
1. **Ribbon 快速按鈕**：一鍵觸發 Vault 自動化
2. **Dashboard Tab**：開在主內容區的即時資訊面板（GitHub / HN / Product Hunt / Lobsters + 指標）

靈感來源：Chase AI 的 "The Claude Code + Obsidian Setup That Now Runs My Life"。

---

## Ribbon 按鈕（5 個）

| 圖示 | 標籤 | 說明 |
|------|------|------|
| ⚙️ | Open Dashboard | 開啟主內容區 Dashboard Tab |
| ☀️ | Morning Briefing | 彙整社群報告 + 職缺 → `wiki/Daily/Morning_YYYY-MM-DD.md` |
| 📚 | Compile Vault | headless `claude -p "/compile"` |
| 🔍 | Lint Vault | headless `claude -p "/lint"` |
| ✏️ | Quick Capture | 在 `Inbox/` 建立新筆記並開啟 |

---

## Dashboard 版面（v3）

點 ⚙️ Ribbon 按鈕或 Command Palette → "Open Dashboard" 開啟，顯示為主內容區新 Tab。

```
┌──────────────────┬──────────────────┐
│  GITHUB TRENDING │  HACKER NEWS     │
│  點擊 → repomix  │  點擊 → 開原文   │
├──────────────────┼──────────────────┤
│  PRODUCT HUNT    │  LOBSTERS        │
│  點擊 → 開產品頁 │  點擊 → 開原文   │
├──────────────────┴──────────────────┤
│  MORNING BRIEF                      │
│  [☀️早報] [📚Compile] [🔍Lint]      │
│  [✏️捕捉] [🔄更新資料]              │
│  新職缺 13 · 社群 2026-05-17        │
└─────────────────────────────────────┘
```

**資料更新**：按「🔄 更新資料」→ 執行 `fetch-dashboard-data.ps1` → 30 秒後自動刷新

---

## 四個資訊來源

| 來源 | API | 更新頻率 | 特殊功能 |
|------|-----|---------|---------|
| **GitHub Trending** | github.com/trending 爬蟲 | 手動更新 | 點擊 → repomix 分析 + wiki 文章 |
| **Hacker News** | Firebase API（免費）| 手動更新 | 點擊 → 開原文或 HN 討論 |
| **Product Hunt** | GraphQL API（需免費 token）| 手動更新 | 點擊 → 開產品頁 |
| **Lobsters** | lobste.rs JSON API（免費）| 手動更新 | 點擊 → 開原文 |

> Product Hunt token 存放：`data/ph_token.txt`（.gitignore 保護，不 commit）

---

## GitHub 熱門 → repomix 分析流程

點擊 GitHub 列表任一 repo：

1. Obsidian 顯示 Notice「⏳ 分析 owner/repo...」
2. 背景執行 `scripts/analyze-repo.ps1 "owner/repo"`
3. headless Claude 呼叫 repomix-explorer skill 分析 repo
4. 自動建立 `wiki/Github/repos/<名稱>.md`，包含：
   - 功能說明、技術棧
   - 與現有系統的相關性評估
   - 安裝建議（✅ 適合 / ⏳ 觀望 / ❌ 不適合）
5. 更新 `wiki/_index.md` + `wiki/log.md`
6. Notice「✅ 分析完成 → wiki/Github/repos/」

---

## Morning Briefing 詳細說明

**觸發：** Ribbon ☀️ 或 Dashboard 按鈕

**資料來源：**
- `d:\Claude\social-monitor\reports\report-*.md`（最新一份）
- `d:\Claude\job-crawler\jobs.db`（`job_groups.user_status='unread'`，最近 3 天）

**輸出：** `wiki/Daily/Morning_YYYY-MM-DD.md`  
**同步：** 同步更新 `data/dashboard.json`（Dashboard Panel 即時反映）

---

## 資料橋接腳本

| 腳本 | 說明 |
|------|------|
| `scripts/fetch-dashboard-data.ps1` | 抓取 GitHub/HN/PH/Lobsters + 職缺/社群/token 估算，輸出 `data/dashboard.json` |
| `scripts/morning-briefing.ps1` | 早報生成，同步更新 `data/dashboard.json` |
| `scripts/compile.ps1` | headless Claude /compile |
| `scripts/lint.ps1` | headless Claude /lint |
| `scripts/analyze-repo.ps1` | 接受 repo 參數，headless Claude repomix 分析 |

---

## Plugin 技術架構

**檔案位置：** `.obsidian/plugins/command-center/`

| 檔案 | 說明 |
|------|------|
| `manifest.json` | Plugin 元資料（isDesktopOnly: true）|
| `main.js` | Plugin 主程式：DashboardView（ItemView）+ CommandCenter（Plugin）|
| `styles.css` | 深色橘線主題，Obsidian CSS 變數字型 |

**技術重點：**
- `DashboardView` 繼承 `obsidian.ItemView`，每 30 秒重新渲染
- 讀取 `data/dashboard.json`（Node.js fs.readFileSync）
- 外部連結用 `electron.shell.openExternal()`
- 腳本執行用 `child_process.exec` + `pwsh.exe`（PowerShell 7+，UTF-8 支援）

---

## 安裝與啟用

1. Plugin 檔案已在 `.obsidian/plugins/command-center/`（git tracked）
2. Obsidian → Settings → Community plugins → **Turn off restricted mode**
3. Installed plugins → 找到 **Command Center** → 打開開關
4. 建議安裝 **Hot Reload** plugin（開發用）
5. 首次使用前：先按 🔄 更新資料，讓 `data/dashboard.json` 有內容

---

## 相關文章

- [[Obsidian Dashboard 路線圖]] — 三階段路線圖與未來規劃
- [[知識庫操作手冊]] — /compile /lint /query /morning 指令集
- [[Claude環境操作手冊]] — 整體 d:\Claude 環境說明

## 反向連結

- [[Obsidian Dashboard 路線圖]]
- [[知識庫操作手冊]]
