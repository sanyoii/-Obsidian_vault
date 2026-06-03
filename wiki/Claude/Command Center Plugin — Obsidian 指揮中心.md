# Command Center Plugin — Obsidian 指揮中心

> **分類：** Claude / 系統
> **標籤：** `#Claude` `#系統` `#obsidian` `#automation` `#plugin`
> **建立：** 2026-06-03
> **來源：** Chase AI YouTube 教學 + 本地整合

---

## 系統目的

把 Obsidian 升級成 **Claude Code 驅動的指揮中心**。在 Ribbon（左側圖示列）提供一鍵按鈕，直接觸發 Vault 自動化工作流，不需要手動開終端或記憶指令。

靈感來源：Chase AI 的 "The Claude Code + Obsidian Setup That Now Runs My Life"。
本地整合額外串接了既有的 social-monitor、job-crawler 兩套自動化系統。

---

## 四個 Ribbon 按鈕

| 圖示 | 標籤 | 腳本 | 說明 |
|------|------|------|------|
| ☀️ | Morning Briefing | `scripts/morning-briefing.ps1` | 彙整社群海巡報告 + 新職缺，產出 `wiki/Daily/Morning_YYYY-MM-DD.md` |
| 📚 | Compile Vault | `scripts/compile.ps1` | headless `claude -p "/compile"`，把 raw/ 新資料編譯進 wiki/ |
| 🔍 | Lint Vault | `scripts/lint.ps1` | headless `claude -p "/lint"`，掃描 wiki/ 找不一致，輸出至 output/ |
| ✏️ | Quick Capture | —（Plugin 內建）| 在 `Inbox/` 建立新筆記並自動開啟，快速記錄想法 |

> 每個按鈕同時也在 Command Palette（Ctrl+P）可用。

---

## Morning Briefing 詳細說明

**觸發方式：** Ribbon ☀️ 按鈕 或 Command Palette → "Morning Briefing"

**資料來源：**
- `d:\Claude\social-monitor\reports\report-*.md`（最新一份）
- `d:\Claude\job-crawler\jobs.db`（`job_groups` 表，`user_status='unread'`，最近 3 天）

**輸出位置：** `wiki/Daily/Morning_YYYY-MM-DD.md`

**輸出格式：**
```markdown
---
date: YYYY-MM-DD
tags: [morning-briefing, daily]
---
# Morning Briefing YYYY-MM-DD
## Social Monitor（最新報告）
## New Jobs（最近 3 天未讀職缺，含公司/職稱/薪資/URL）
## Today's Tasks（空白待辦）
```

---

## Plugin 技術架構

**檔案位置：** `.obsidian/plugins/command-center/`

| 檔案 | 說明 |
|------|------|
| `manifest.json` | Plugin 元資料（id: command-center, isDesktopOnly: true）|
| `main.js` | 繼承 `obsidian.Plugin`，4 個 addRibbonIcon + addCommand |

**腳本執行方式：** Node.js `child_process.exec`，呼叫 `pwsh.exe -ExecutionPolicy Bypass -File <腳本路徑>`

> 使用 `pwsh.exe`（PowerShell 7+），不用 `powershell.exe`（5.1），原因：UTF-8 支援，避免中文亂碼。

---

## 新增按鈕的方式

1. 在 `scripts/` 新增腳本（例如 `scripts/weekly-review.ps1`）
2. 在 `main.js` 的 `onload()` 新增一行：
   ```js
   this.addRibbonIcon('calendar', 'Weekly Review', () => {
       this.runScript('weekly-review.ps1', 'Weekly Review');
   });
   ```
3. 若已安裝 Hot Reload plugin → 自動套用；否則在 Settings 停用再啟用 Command Center

---

## 安裝與啟用

1. Plugin 檔案已在 `.obsidian/plugins/command-center/`（git tracked）
2. Obsidian → Settings → Community plugins → **Turn off restricted mode**
3. Installed plugins 列表找到 **Command Center** → 打開開關
4. 建議同時安裝 **Hot Reload** plugin（開發用，方便即時重載）

---

## 相關檔案

- 腳本目錄：`scripts/` → [[../../../scripts/morning-briefing.ps1|morning-briefing.ps1]]
- 知識庫操作手冊：[[知識庫操作手冊]]（含 /compile /lint /query /morning 指令）
- 社群海巡報告：`wiki/Social/`
- 每日早報：`wiki/Daily/`

## 反向連結

- [[知識庫操作手冊]] — /morning 指令在此定義
- [[Claude環境操作手冊]] — 整體 d:\Claude 環境說明
