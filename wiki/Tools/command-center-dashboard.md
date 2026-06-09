# Command Center Dashboard

> Obsidian Plugin — 個人 AI 作戰室，集中顯示 GitHub Trending / HN / Email / 社群趨勢 / 職缺等即時資訊。
>
> - 路徑：`.obsidian/plugins/command-center/`
> - 版本：v4.0（2026-06-10）
> - 資料快取：`data/dashboard.json`

---

## 架構總覽

```
Obsidian Plugin（ItemView）
    │
    ├── main.js          → DashboardView, PanelConfigModal, WatchlistModal
    ├── styles.css       → CSS 設計系統（--cc-* 變數）
    │
    └── 資料層
         ├── scripts/fetch-dashboard-data.ps1   → 抓取所有資料 → dashboard.json
         ├── scripts/fetch-calendar.ps1          → Google Calendar MCP
         ├── scripts/fetch-email-brief.ps1       → Gmail MCP
         └── social-monitor/social_monitor_v2.py → last30days 社群海巡
```

---

## Panel 列表

| Panel | 資料來源 | 刷新方式 |
|-------|----------|----------|
| Morning Brief | 本機計算 | 每次 render |
| GitHub Trending | github.com/trending | 🔄 更新資料 |
| Hacker News | HN API | 🔄 更新資料 |
| Product Hunt | GraphQL API（`ph_token.txt`）| 🔄 更新資料 |
| Lobsters | lobste.rs JSON | 🔄 更新資料 |
| Email Brief | Gmail MCP（headless Claude）| 📧 Email 按鈕 |
| Social Trends | social-monitor + last30days | 🔄 更新資料 / 立即海巡 |
| iThome News | RSS | 🔄 更新資料 |
| TechOrange | RSS | 🔄 更新資料 |
| TechCrunch | RSS | 🔄 更新資料 |

---

## 設計系統（styles.css）

CSS 變數定義在 `.cc-dashboard`（深色主題）：

```css
--cc-bg:        #09090b   /* 最深背景 */
--cc-surface:   #111116   /* Panel 背景 */
--cc-surface-2: #18181f   /* 巢狀元素背景 */
--cc-border:    rgba(255,255,255,0.06)
--cc-accent:    #818cf8   /* Indigo 主色 */
--cc-text:      #f4f4f5
--cc-text-2:    #a1a1aa
--cc-text-3:    #52525b
```

Modal（PanelConfigModal）使用 Obsidian 原生變數（`var(--text-normal)` 等），支援 light/dark。

---

## Social Trends 使用說明

### 設定監控主題

1. 點 Dashboard 右上角 **📋 Watchlist** 按鈕（或 `#cc-watchlist-btn`）
2. 在文字框內輸入主題（一行一個，例如：`AI Agent`、`Claude AI`）
3. 調整「每主題顯示 Headlines 數」（1–10，預設 3）
4. 點「立即海巡並儲存」→ 執行 `social-monitor/run.bat` → 自動更新面板

### 面板顯示邏輯

- 主題可完全自訂，只要是英文或中文關鍵字即可
- 資料來源：Reddit / Hacker News / Polymarket（last30days 免費層）
- 折疊（預設）：顯示主題名 + 第一條 headline 預覽
- 展開：顯示排序清單，每條 headline 旁有來源標籤（`Reddit`、`HN`、`GH`、`PM`）
- 若某主題無資料，顯示「（無資料）」

### Headlines 來源標籤

| 原始名稱 | 標籤 |
|---------|------|
| Reddit | Reddit |
| Hacker News | HN |
| GitHub | GH |
| Polymarket | PM |
| YouTube | YT |
| X / Twitter | X |
| V2EX | V2EX |

---

## Panel Config Modal

點 header 右側 **⊞** 按鈕（`#cc-panels-config`）開啟：
- 每個 Panel 有 iOS-style toggle（開/關顯示）
- ↑↓ 箭頭調整 Panel 順序
- 設定存至 `plugin.panelSettings.order` + `plugin.panelSettings.hidden`

---

## 資料流程

```
watchlist.txt
    ↓
social_monitor_v2.py
（呼叫 last30days per topic，產生 reports/report-*.md）
    ↓
fetch-dashboard-data.ps1
（解析 report → socialTopics[]，headlines = {text, source}[]）
    ↓
data/dashboard.json
    ↓
DashboardView.render()（每 30 秒自動刷新）
```

---

## 常見問題

**Q: 社群面板顯示「無資料」**
→ 確認 `social-monitor/watchlist.txt` 不為空；確認 `uv` 已安裝；手動執行 `run.bat` 查看 log。

**Q: Dashboard 全白/空白**
→ 打開 Obsidian Console（Ctrl+Shift+I），查看 `⚠ Render Error` 訊息。

**Q: Panel Config Modal 文字看不見**
→ Modal CSS 使用 Obsidian 原生變數，若自訂主題覆蓋了 `--text-normal`，需調整主題。

**Q: 更新資料後面板沒刷新**
→ v3.2 修正：`runScript()` 改為 exec 完成後才呼叫 `render()`，不再使用 setTimeout。

---

## 相關連結

- [[social-monitor]] — 社群海巡引擎
- [[last30days]] — 多平台社群研究引擎（Reddit/HN/Polymarket）
- [[obsidian-second-brain]] — Obsidian Vault 其他 AI 工具

---

*最後更新：2026-06-10*
