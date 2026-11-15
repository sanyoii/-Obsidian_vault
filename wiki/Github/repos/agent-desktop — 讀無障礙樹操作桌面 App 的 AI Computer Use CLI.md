---
source: "https://github.com/vercel-labs/agent-desktop"
author: "Vercel Labs (vercel-labs)"
stars: "24K+"
clipped: 2026-11-16
tags:
  - "github/repo"
  - "computer-use"
  - "desktop-automation"
  - "cli-tool"
---

## agent-desktop — 讀無障礙樹操作桌面 App 的 AI Computer Use CLI

> **vercel-labs/agent-desktop** | ⭐ 24,110 | 🍴 1,793 | 📝 Apache-2.0 | v1.3.1（2026-11-13）
> "Computer use CLI for AI agents"

**本次可用引擎（Phase 0）**：gh ✅｜npx ✅（repomix `--compress` 成功，72.8MB 落在 50–100MB 區間）｜defuddle ✅（agent-browser.dev/desktop）｜yt-dlp ✅｜mcporter ⚠️ `exa` 回 Unknown MCP server，改走 WebSearch｜opencli／twitter-cli 未跑（社群口碑以 WebSearch 與 YouTube 補）。沒有在本機安裝或執行 agent-desktop。

### 一句話說明

Vercel Labs 做的桌面版 computer use 工具：不截圖、不比對像素，直接讀作業系統的無障礙樹（macOS 的 AX API、Windows 的 UI Automation、Linux 的 AT-SPI），把 App 畫面變成 JSON，每個能操作的元件給一個 ref。agent 對 ref 點擊或輸入，再讀一次樹確認結果，迴圈由呼叫它的 agent 自己跑，工具裡沒有模型。提供 CLI、MCP server 和 C 函式庫，是同團隊 agent-browser 的桌面版。

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 24,110 |
| Forks | 1,793 |
| 主要語言 | Rust（另有 PowerShell、C#、Swift、Python 等平台輔助） |
| 授權 | Apache-2.0 |
| 建立時間 | 2026-02-19（v1.0 約 10 月底公開） |
| 最後推送 | 2026-11-15 |
| Open Issues | 87 |
| Open PRs | 156 |
| 最新 Release | v1.3.1（2026-11-13） |
| Topics | accessibility, computer-use, desktop-automation, mcp, rust, cli, ai-agents… |
| 首頁 | https://agent-browser.dev/desktop |
| 是否 Archived | 否 |
| npm `agent-desktop` 週下載 | 50,927（repository 欄位已核對指回本 repo） |
| v1.3.1 執行檔下載 | Windows x86_64 最多（1,826），macOS ARM 458、Linux x86_64 321 |

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 3,786 |
| 總 Tokens | 2,628,896 |
| 壓縮模式 | `--compress` |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| probes/linux/FINDINGS.md | 188,648 | 7.2% |
| probes/windows/FINDINGS.md | 74,951 | 2.9% |
| probes/windows/captures/08-uia3-com/census.json | 20,059 | 0.8% |
| crates/ffi/include/agent_desktop.h | 15,378 | 0.6% |
| probes/windows/common.ps1 | 14,839 | 0.6% |

最大的幾個檔是各平台的實測紀錄（probes），程式本體分散在上千個小 Rust 檔。Repomix 安全掃描：無可疑檔案。

### 核心功能

- **快照與 ref**：`snapshot --app X -i` 回傳可互動元件樹，ref 綁定該次快照（`@s8f3k2p9:e8`）；畫面變了舊 ref 會回 `STALE_REF`，不會誤點。密集 App 先 `--skeleton` 看骨架，再 `--root` 展開一區。
- **預設不搶游標**：ref 操作走無障礙 API，不移動滑鼠、不搶焦點；要實體輸入才加 `--headed`。Windows 上 `type`、`right-click`、雙擊必須 `--headed`，`set-value` 可以背景完成。
- **61 個指令**：觀察（snapshot／find／get／screenshot）、對 ref 操作、鍵鼠、App 與視窗、通知中心、剪貼簿、wait、session／trace、sandbox。
- **可判斷的錯誤**：每個指令輸出一個 JSON envelope，錯誤附 `error.disposition.retry`，只有 `safe` 才重試。
- **安全預設**：Windows 上 `alt+f4`、`win+l`、`win+r` 等系統快捷鍵沒加 `--force` 一律拒絕；`type`／`set-value` 支援 `--stdin` 讓密碼不出現在程序參數。
- **MCP server**：`agent-desktop mcp` 把每個指令變成 MCP 工具（`desktop_snapshot`、`desktop_click`…）。
- **跟版本走的 skill**：`agent-desktop skills get desktop`／`platform` 直接從執行檔輸出對應版本的使用指南；repo 另附 6 個 skill（主 skill、各平台、FFI、jev-desktop）。
- **Sandbox**：只有 macOS 提供（Apple Silicon 上的 macOS VM）；Windows、Linux 要自己用容器。

### 技術架構

```
呼叫端 agent（Claude Code / 腳本）
   │  CLI：agent-desktop <cmd> → 一個 JSON envelope
   │  MCP：agent-desktop mcp（stdio）
   │  C 函式庫：libagent_desktop_ffi（ctypes 等直接呼叫）
   ▼
src/（cli_args、dispatch、batch、mcp、visual_debug）
   ▼
crates/core   指令、ref 解析、wait、錯誤分類、policy（PlatformAdapter trait）
   ▼ 編譯時選一個
crates/macos   AX API
crates/windows UI Automation（+ PowerShell／C# 輔助：overlay、shell surface）
crates/linux   AT-SPI（X11／Wayland）
```

| 層次 | 技術 |
|------|------|
| 核心 | Rust workspace（core、ffi、三個平台 crate） |
| 散佈 | npm 套件內含各平台原生執行檔；Homebrew（macOS／Linux）；GitHub Releases |
| 介面 | CLI、MCP（stdio）、C ABI（`agent_desktop.h`） |
| 測試 | 各平台 e2e（`tests/e2e-windows`、`e2e-linux`）、真實 App 測試、conformance |
| 文件站 | `apps/docs`（MDX） |

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | lahfir 242、github-actions[bot] 43、detail-app[bot] 26、ctate 16、dependabot[bot] 14，其餘個位數 | 實質主力一人（巴士係數 1），有 Vercel 背書 |
| 近 4 週 commit | 45／18／13／0（統計可能延遲，11/15 仍有推送） | 活躍 |
| Release 頻率 | v1.0.1（10/28）→ v1.3.1（11/13），約每週一版 | 頻繁 |
| Issue | 87 open、156 PR open | PR 積壓偏多 |

### 社群口碑

**熱門討論：**
- **YouTube**：8 支相關影片，最高 3.2 萬觀看（主打「免費開源 computer use、快 40 倍」），ByteGrad 的「Claude 能用你整台電腦」6.8K 觀看，另有中文實測影片 1.6 萬觀看。發布不到三週，教學生態已經起來。
- **技術媒體**：MarkTechPost、byteiota 等報導；多為二手介紹，沒找到 Reddit／Hacker News 的有機討論。

**正面回饋：** 結構化資料比截圖省 token、穩定；不搶游標。
**負面回饋 / 已知問題：** App 沒提供無障礙樹就看不到（部分 Electron／自繪 UI）；按住鍵鼠類指令（`key-down` 等）還不能用，拖放與組合鍵流程受限；macOS 要先給輔助使用權限。

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯 |
| **Claude Code** | 這台已經接了 **Windows-MCP**（也是讀 UI Automation 的 Snapshot／Click）。agent-desktop 的差別在：ref 綁定快照並偵測過期、多數操作不移動游標、錯誤會說能不能重試、危險快捷鍵預設擋下。適合「我在用電腦時，讓 agent 在背景操作另一個 App」的情境 |
| **Automation** | 有 MCP 也有 CLI，可接進排程；但 Windows 上不能在 Session 0（服務、SYSTEM 排程）執行，必須在使用者登入的桌面 |

### 安裝建議

**⏳ 觀望** — 能力確實比 Windows-MCP 細，但這台目前沒有一件桌面 App 自動化的實際工作在等它，裝了只是多一個重疊的工具。v1.0 也才公開三週、每週一版，介面還在動。

- **升級條件（→ ✅ 裝）**：出現一個要操作 Windows 桌面 App 的實際任務，而 Windows-MCP 做起來會搶游標、點錯或認不到元件；或者需要讓 agent 在我同時用電腦時於背景操作。屆時 `npm install -g agent-desktop`，先只接 CLI（不接 MCP），並設 `--stdin` 處理任何敏感輸入。
- **放棄條件（→ ❌ 不裝）**：2027-01-31 前沒有出現上述任務；或 Windows-MCP 在實際任務中已經夠用。

### 延伸操作

- 想看 Windows 上哪些指令能背景做：repo 內 `skills/agent-desktop-windows/SKILL.md` 的 Capability Table（以安裝當下的 tag 為準）。
- 想比較：同團隊 agent-browser（網頁版）可再跑 `/repo-intel`。

## 相關連結

- [[Github/repos/vercel-labs-skills — Agent Skills 生態系 CLI 套件管理器|vercel-labs/skills]]（安裝 agent-desktop skill 的管道）
- [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill|vercel-labs/agent-skills]]
