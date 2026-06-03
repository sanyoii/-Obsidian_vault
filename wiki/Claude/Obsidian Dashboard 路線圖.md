# Obsidian Dashboard 路線圖

> **分類：** Claude / 系統
> **標籤：** `#Claude` `#系統` `#obsidian` `#dashboard` `#roadmap`
> **建立：** 2026-06-03
> **靈感來源：** Chase AI — "The Claude Code + Obsidian Setup That Now Runs My Life"（Bilibili）

---

## 目標

把 Obsidian 打造成一個 **Claude Code 驅動的指揮中心**，可以：
- 一眼看到今日狀態（早報、職缺、社群）
- 一鍵觸發 Vault 自動化流程
- 在側邊欄看到深色風格的即時 Dashboard

Chase AI 截圖目標樣式：黑底橘線、指標 Widget、動作按鈕一排、今日行程。

---

## 三階段路線圖

### ✅ Phase 0：Ribbon 按鈕（已完成 2026-06-03）

**做了什麼：**
- 建立 Command Center 自製 Obsidian Plugin
- 4 個 Ribbon 按鈕：☀️ Morning Briefing / 📚 Compile / 🔍 Lint / ✏️ Quick Capture
- 3 個 PowerShell 腳本：morning-briefing.ps1 / compile.ps1 / lint.ps1
- Morning Briefing 串接 social-monitor 報告 + job-crawler 職缺 → `wiki/Daily/`

**相關檔案：**
- Plugin：`.obsidian/plugins/command-center/`
- 腳本：`scripts/morning-briefing.ps1`、`scripts/compile.ps1`、`scripts/lint.ps1`

---

### ✅ Phase 1：輕量版 Dashboard（已完成 2026-06-03）

**做了什麼：**
- 利用 Obsidian 內建 Bases 核心 Plugin（不寫程式）
- `wiki/Daily/Daily.base`：Morning Briefing 表格（有日期欄、幾天前公式）
- `wiki/Social/Social.base`：社群動態表格（幾小時前公式，limit 20）
- `Home.md`（vault 根目錄）：首頁，嵌入兩個 Base + 快速導航

**限制：**
- 靜態表格，無即時更新
- 無法顯示 SQLite 資料
- 無深色視覺設計

---

### 🔄 Phase 2：完整 Plugin Panel（進行中 2026-06-03）

**目標：** 在 Obsidian 右側邊欄顯示一個深色 Dashboard Panel，仿 Chase AI 截圖風格。

**架構：資料橋接方案**

```
scripts/fetch-dashboard-data.ps1
    ├── 查詢 d:\Claude\job-crawler\jobs.db（unread 職缺數）
    ├── 讀最新 social-monitor 報告檔名
    └── 讀最新 wiki/Daily/ Morning Briefing 標題
            ↓
data/dashboard.json  ← Plugin 每 30 秒讀一次，更新 UI
```

**Panel 內容（仿截圖）：**

| 區塊 | 內容 |
|------|------|
| Header | 今日日期、Vault 名稱 |
| 指標 Widgets | 社群海巡最新日期、新職缺數（橘色大字）、今日早報標題 |
| 動作按鈕 | ☀️ 早報 / 📚 Compile / 🔍 Lint / ✏️ 捕捉 / 🔄 更新資料 |
| 今日行程 | 從 dashboard.json 的 schedule 欄位讀取 |

**新增檔案：**
- `.obsidian/plugins/command-center/styles.css`（深色橘線主題）
- `scripts/fetch-dashboard-data.ps1`（資料橋接腳本）
- `data/dashboard.json`（橋接腳本輸出）

**修改檔案：**
- `.obsidian/plugins/command-center/main.js`（加 DashboardView、registerView）
- `scripts/morning-briefing.ps1`（產生早報時同步更新 dashboard.json）

---

## 使用者資料源對照表

| Chase AI 的指標 | 本系統對應 | 狀態 |
|----------------|-----------|------|
| Token Burn 計量 | 略過（先用佔位） | ⏭️ |
| YouTube Subs | 不適用 | ⏭️ |
| 社群海巡 | social-monitor 最新報告日期 | ✅ |
| 新職缺數 | job-crawler `job_groups.user_status='unread'` | ✅ |
| 今日早報標題 | `wiki/Daily/` 最新 Morning_*.md 檔名 | ✅ |
| 動作按鈕 | 4 個 Ribbon 按鈕 | ✅ |
| 今日行程 | dashboard.json schedule 欄（手動或未來接 Calendar） | 🔄 |
| Daily Tasks | Morning Briefing 的 Today's Tasks 區塊 | 🔄 |

---

## 未來擴充方向（Phase 3+）

- **Google Calendar 整合**：透過 Google Calendar MCP + 橋接腳本把今日行程存入 dashboard.json
- **Token Burn 追蹤**：解析 Claude session 日誌取得 token 用量
- **職缺快速操作**：Dashboard 內直接標記 unread → applied / not_interested
- **社群趨勢摘要**：讀最新報告的第一個熱門話題顯示在 Widget
- **Careerbot 狀態**：顯示求職申請進度（applied / interview 數量）

---

## 相關文章

- [[Command Center Plugin — Obsidian 指揮中心]] — Plugin 技術架構與安裝說明
- [[知識庫操作手冊]] — /compile /lint /query /morning 指令集
- [[Claude環境操作手冊]] — 整體 d:\Claude 環境說明

## 反向連結

- [[Command Center Plugin — Obsidian 指揮中心]]
- [[知識庫操作手冊]]
