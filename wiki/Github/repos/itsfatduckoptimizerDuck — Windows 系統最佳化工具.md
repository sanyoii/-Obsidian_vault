---
source: "https://github.com/itsfatduck/optimizerDuck"
author: itsfatduck
clipped: 2026-05-26
tags:
  - "github/repo"
  - "windows"
  - "tools"
  - "optimization"
  - "wpf"
  - "dotnet"
  - "not-installed"
---

# optimizerDuck — 免費開源 Windows 系統最佳化工具

> **出處：** https://github.com/itsfatduck/optimizerDuck
> **官網：** https://optimizerduck.vercel.app/
> **授權：** GPL v3
> **狀態：** 未安裝（僅 repomix 分析）| 252 個檔案

---

## 一句話說明

免費開源的 Windows 優化工具，30+ 個系統調整項目（效能/隱私/GPU/電源/Bloatware/使用體驗），每項附說明與風險評級，所有變更可一鍵復原。不需安裝，直接跑 `.exe`。

---

## 快速開始

1. 從 [GitHub Releases](https://github.com/itsfatduck/optimizerDuck/releases/latest) 下載
2. 直接執行 `.exe`，不需安裝
3. 選擇想要的最佳化項目，套用，重啟即可

> **注意：** 套用前建議先建立系統還原點

---

## 功能

### 系統最佳化（30+ 項，分 6 類）

| 類別 | 涵蓋內容 |
|------|---------|
| **效能** | Service host 調整（依 RAM）、Process priority、鍵盤延遲、多媒體排程器 |
| **隱私** | 停用 Windows 遙測、錯誤回報、廣告 ID、位置追蹤、Cortana、Copilot |
| **GPU** | AMD/NVIDIA/Intel 各廠商 registry 調整：電源狀態、時脈閘控、顯示延遲 |
| **電源** | 停用休眠/快速啟動、USB 選擇性暫停、安裝高效能電源計劃、停用電源節流 |
| **Bloatware & 服務** | 封鎖 OEM App 重裝行為、200+ Windows 服務啟動類型微調 |
| **使用體驗** | 移除選單延遲、停用工作列動畫和透明效果 |

### Feature Toggles（4 類）

- **桌面**：顯示/隱藏圖示（本機/資源回收桶/網路/使用者/控制台）、捷徑箭頭
- **工作列**：置中/靠左、小工具、工作檢視、End Task、時鐘秒數、Start Bing 搜尋
- **檔案總管**：副檔名、隱藏檔案、剪貼簿記錄、緊湊檢視、貼齊輔助、傳統右鍵選單
- **遊戲**：Game Mode、Game Bar、背景錄影、滑鼠加速、全螢幕最佳化、HAGS

### 內建工具

| 工具 | 功能 |
|------|------|
| System Dashboard | CPU/RAM/GPU/磁碟/OS 一覽 |
| Startup Manager | 管理開機啟動項（含排程任務），可開啟檔案位置 |
| Scheduled Tasks | 瀏覽/執行/停止/啟用/停用/刪除 Windows 排程工作 |
| Disk Cleanup | 掃除 temp/系統快取/Windows Update 殘檔/prefetch/縮圖/資源回收桶/crash dumps |
| Bloatware Remover | 列出所有可移除 AppX 套件，附風險標籤（Safe/Caution/Unknown）|

---

## 安全機制

- **自動備份**：每項變更寫入本機 revert 檔案，可個別或全部復原
- **一鍵還原**：從 UI 點一下即可取消任何已套用的最佳化
- **風險評級**：每項調整標示 Safe / Moderate / Risky
- **不預設執行**：不會自動啟用任何項目，完全由使用者選擇
- **還原點提示**：首次最佳化前提醒建立 Windows 還原點

---

## 技術棧

- **WPF + .NET 10**（Windows-only，需 Admin 權限）
- Target: `net10.0-windows10.0.17763.0`
- 語言：**Reflection-based discovery**（新增 optimization/feature 只需建 nested class + attribute，不需手動 DI 註冊）
- 測試：xUnit v3

---

## AI 開發支援（`.agents/skills/`）

這個 repo 本身有完整的 Claude Code / Codex / Gemini 開發工具鏈：

| Skill | 說明 |
|-------|------|
| `brainstorming` | 設計優先 skill，有 HARD-GATE（不設計禁止寫碼）|
| `windows-app-developer` | WPF/WinUI 3/MVVM 專家 |
| `csharp-async` | C# async 最佳實踐 |
| `csharp-xunit` | xUnit v3 測試指引 |
| `dotnet-best-practices` | .NET 開發規範 |
| `resx-translation` | .resx 本地化，附 Python helper scripts |
| `powershell-windows` | PowerShell/Windows 操作 |
| `microsoft-docs` | 查詢 Microsoft 文件 |
| `using-superpowers` | Codex/Gemini 工具使用指南 |

還有 `AGENTS.md`（AI 開發規格）、`opencode.jsonc`（OpenCode + codegraph MCP）、`.windsurfrules`（Windsurf 規則）。

---

## 語言支援

英文 / 越南文 / **繁體中文** / 簡體中文 / 俄文（`.resx` 本地化）

---

## Tags

#tool #windows #optimization #privacy #performance #wpf #dotnet #bloatware #not-installed
