---
source: "https://github.com/herdrdev/herdr"
author: "herdrdev (Herdr organization)"
stars: "29K+"
clipped: 2026-08-15
tags:
  - "github/repo"
  - "devtools/cli"
  - "ai-agent"
---

## Herdr — AI Coding Agent 終端執行環境

> **herdrdev/herdr** | ⭐ 29,041 | 🍴 2,059 | 📝 Apache-2.0
> "the runtime your coding agents live on"

---

### 一句話說明

Herdr 是以 Rust 寫成的 agent-aware terminal multiplexer：背景 server 持有真正的 shell、PTY 與 Agent process，TUI/CLI 只是 client；它把多個 coding agent 的 terminal 組成 workspace、tab 與 pane，辨識 `working`、`idle`、`blocked`、`done` 狀態，並透過 JSON CLI 與 socket API 讓另一個 Agent 或 script 操作。最適合需要同時維持多個長時間 CLI Agent session、希望在斷線後續接、並把「哪個 Agent 需要注意」集中顯示的使用者。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 29,041 |
| Forks | 2,059 |
| Watchers | 91 |
| 主要語言 | Rust 91.1%；Python 2.1%；TypeScript 1.8% |
| 授權 | Apache-2.0 |
| 建立時間 | 2026-03-27 |
| 最後推送 | 2026-08-14 |
| Open Issues | 141 |
| Open PRs | 26 |
| 最新 Stable Release | v0.8.0（2026-08-03） |
| Windows Preview | 0.8.0-preview.2026-08-04-d78e3d3b5126；x86_64 zip |
| Topics | agent-orchestration, coding-agents, codex, rust, terminal, tmux, tui |
| 首頁 | https://herdr.dev |
| 是否 Archived | 否 |

資料快照日期為 2026-08-15。官方首頁當時另自述 432,812 次安裝、614 個 community plugins、支援偵測 20 種 Agent；這三項是 Herdr 自行發布的統計，未獨立驗證。[GitHub repository](https://github.com/herdrdev/herdr) · [官方首頁](https://herdr.dev/)

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| Snapshot commit | `d76657f2c7fc18dcce3b9af43842c8afaba1646b` |
| 總文字檔案數 | 1,125 |
| 總 Tokens | 3,920,751 |
| 總字元 | 15,065,032 |
| 壓縮模式 | 否（GitHub `diskUsage` 36,508 KB，低於 50 MB） |
| Repomix security check | 未發現可疑檔案；這不等同安全稽核 |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `src/ghostty/bindings.rs` | 88,452 | 2.3% |
| `src/server/headless.rs` | 87,864 | 2.2% |
| `src/pane/terminal.rs` | 59,779 | 1.5% |
| `src/app/mod.rs` | 55,470 | 1.4% |
| `docs/next/api/herdr-api.schema.json` | 48,495 | 1.2% |

這不是薄 wrapper。大量程式碼落在 terminal emulation、headless server、pane runtime 與 API schema；`main.rs` 組合 40 多個 module，repository 另含 282 個 Rust 檔與 643 個 docs 檔。

---

### 核心功能

- **Persistent server + 多 client**：背景 server 持有 pane process；TUI、CLI 與 socket client 可重新 attach。終端關閉或 SSH 中斷不必殺死 Agent，但完整 OS reboot 仍會終止 process，能保留的是 workspace 與可恢復的 Agent session reference，不是運算中的 process。
- **Agent-aware status**：先辨識 foreground process，再由 lifecycle integration 或 screen manifest 判定 `working`、`idle`、`blocked`、`done`；已正式列出 Codex、Claude Code、Cursor Agent、OpenCode、Pi、Grok 等 20 種 Agent。[Agents 文件](https://herdr.dev/docs/agents/)
- **Agent-native automation**：`herdr agent prompt/wait/read/send-keys`、`pane run/read/wait-output` 與 workspace/tab/pane CRUD 都能回傳 JSON；socket API 可訂閱事件，適合由 Agent 控制其他 Agent。
- **Workspace / worktree 管理**：workspace、tab、pane、layout、worktree 與 session restore 是同一狀態模型；可跨 SSH 啟動或 attach remote Herdr runtime。
- **Plugin system**：manifest 可宣告 build、startup、action、event、pane 與 link handler；plugin 可呼叫完整 Herdr CLI。
- **Official integrations**：為 Codex、Claude Code 等寫入 hook 以取得可恢復的 session identity；Herdr 仍以 screen manifest 判定 Codex lifecycle state。[Integrations 文件](https://herdr.dev/docs/integrations/)
- **單一 Rust binary**：主要 runtime 為單一 executable；Unix stable release 有四種 CPU/OS asset，Windows beta 則以 `herdr.exe` 加 app-local ConPTY bundle 發布。

---

### 技術架構

```text
TUI client / JSON CLI / external socket client
                    │
          Unix socket / Windows named pipe
                    │
        ┌───────────▼────────────┐
        │ persistent headless     │
        │ server + protocol       │
        └──────┬──────────┬──────┘
               │          │
   workspace/tab/pane     persistence + restore
               │
      PTY runtime + Ghostty VT
               │
 shell / test / server / coding-agent process
               │
 detection manifests + optional Agent integrations

 plugins ── build/startup/action/event commands（unsandboxed）
 remote  ── SSH bootstrap / attach / matching release asset
```

| 層次 | 技術與責任 |
|------|------------|
| CLI / TUI | Rust, Clap, Ratatui, Crossterm；處理互動、導航與 JSON command surface |
| Server | Tokio、多 client protocol、headless runtime、live handoff |
| Terminal | `portable-pty` vendored patch、Ghostty VT、scrollback、graphics、input encoding |
| Domain state | Workspace / Tab / Pane / Agent 的可序列化 state，與 runtime handles 分離 |
| Detection | foreground process + TOML screen manifests；可自 herdr.dev 背景更新 |
| Integration | 修改各 Agent 的 hook/plugin config，向 local socket 回報 session 或 lifecycle |
| Extension | `herdr-plugin.toml` + 任意 argv command；無 sandbox |
| Cross-platform | Linux / macOS stable；Windows x86_64 preview beta；Windows ARM64 透過 x86_64 emulation |

核心採 server-owned runtime、client render 的邊界，讓 pane process 不依附某個 TUI client。Unix socket 會設為 owner-only `0600`；Windows 使用 named pipe。原始碼掃描未發現一般 analytics SDK 或產品 telemetry，但會連線 herdr.dev 檢查 binary update 與 Agent detection manifests，也可能為 plugin install 使用 GitHub；這是 source inspection，不是 runtime network capture。

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | ogulcancelik 1,133；kangal-bot 69；akbash-bot 49；github-actions 45；Pimpmuckl 13；dhh 5；dmmulroy 4；LaneBirmingham 4；othavi0 3；reobin 3 | 高度由主要作者主導，已有外部貢獻 |
| 近 4 週 commit | 254（65 / 72 / 68 / 49） | 非常活躍 |
| Stable release 頻率 | v0.7.5 → v0.8.0 為 13 天；期間另有 preview | 頻繁 |
| Issue open/close | 141 / 1,217；約 89.6% 已關閉 | 處理量高，但仍有 141 個 open issue |
| PR open/closed | 26 / 515；199 merged | 活躍 |
| v0.8.0 assets 下載 | 91,541 次合計 | 採用訊號強，但不等於 active users |
| Current HEAD CI | Windows、Ubuntu、macOS、ConPTY package 共 6 checks 全通過 | 良好；詳見[當次 Actions run](https://github.com/herdrdev/herdr/actions/runs/31763329192) |

專案只有約四個半月歷史，29K stars 與高 commit 速度代表強勁動能，也表示介面與操作模型仍可能快速變動。Repository 沒有 `SECURITY.md`；不能把沒有公開 advisory 解讀成沒有漏洞。

---

### 供應鏈與操作風險

| 面向 | 查核結果 |
|------|----------|
| Installer 一致性 | 2026-08-15 下載的 `install.sh` / `install.ps1` 與 snapshot 內容逐行一致；checkout 的 CRLF 造成原始 hash 不同，正規化 LF 後 SHA-256 完全相同 |
| Asset 驗證 | Unix 與 Windows installer 都要求 manifest 內 64-hex SHA-256，下載後驗證，不符即停止；Windows bundle還逐檔驗證 ConPTY manifest |
| 安裝變更 | Windows 會寫入 `%USERPROFILE%\.herdr`、建立 versioned release/current junction、把 `%LOCALAPPDATA%\Programs\Herdr\bin` 放到 user PATH 前方並保留舊 release |
| Codex integration | `herdr integration install codex` 會新增 `~/.codex/herdr-agent-state.sh`、修改 `hooks.json`、確保 `config.toml` 的 `[features] hooks = true`；uninstall 不會還原該 config flag |
| Update network | 預設檢查 binary update；Agent detection manifest 會從 herdr.dev 背景更新並套用，可用 `[update] manifest_check = false` 關閉 |
| Plugins | plugin 的 build/runtime command 以目前使用者身分執行、繼承 environment、可呼叫完整 Herdr CLI；只有 preview 與 manifest validation，沒有 sandbox |
| 安裝命令 | 官網主推 `curl ... | sh` / `irm ... | iex`；即使目前 script 有 checksum，pipe-to-shell 仍把執行當下的網站內容納入信任邊界 |

最安全的試用方式是隔離測試、先下載 installer 或 GitHub release asset 再檢視，並用官網 manifest 的 SHA-256 驗證；不要一開始就安裝 Codex integration 或第三方 plugin。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 適合留作 terminal/Agent orchestration 決策紀錄；Herdr runtime 本身不提供 Obsidian ingestion 或知識圖譜能力。 |
| **Codex** | 原生偵測 Codex，官方 Skill 可讓 Herdr 內的 Agent split pane、啟動 sibling Agent、prompt/wait/read；但 Skill 明定只有 `HERDR_ENV=1` 才能使用。Codex integration 只補 session identity/restore，且會改寫本機 Codex hooks/config。 |
| **Automation** | JSON CLI + socket API 很適合 scripting、等待 `blocked/done`、集中讀 pane output；這是相對一般 tmux 的主要增量。 |
| **現有 wmux 工作流** | 與目前的 terminal multiplexer、可視 browser panel、Codex native collaboration 高度重疊。Herdr 的優勢是 persistent server、Agent 狀態與通用 CLI/socket；它不取代 wmux browser panel，也不直接提升單一 Agent 的推理品質。 |
| **Windows 適配** | 是最主要採用阻力：官方仍標示 preview-only beta；社群也同時回報 Windows/WSL rendering、scroll、hotkey、shell plugin 問題與正面使用經驗。只管理 2–3 個 session 時，新增一層 TUI 的收益通常有限。 |

---

### 安裝建議

⏳ 觀望 — Herdr 本身是值得追蹤的高品質專案：架構扎實、Apache-2.0、更新快、installer 有強制 checksum、current HEAD 跨三平台 CI 全綠，且對「多個長時間 CLI Agent + 斷線續接 + 狀態集中」確有實質價值。但此環境是 Windows，官方仍只提供 preview beta；同時已有 wmux 與 Codex native collaboration，需求重疊高，安裝 Codex integration 還會修改 `~/.codex` 設定。

**升級為 ✅ 的條件：** 實際工作經常同時維持 4 個以上、跨 repository/worktree 的長任務；wmux pipe/terminal persistence 問題反覆影響工作；Herdr Windows stable 發布，或隔離試跑證明 preview 在目前 shell、IME、hotkey 與 Agent TUI 上穩定。

**試用邊界：** 先只裝 standalone preview，不裝 integration、不裝 plugin；用獨立 session 測 Codex rendering、scroll、hotkey、full reboot 後 session restore，以及 server stop 對 pane process 的影響。接受後再明確 review `~/.codex` diff。

**放棄條件：** 平時只有 2–3 個 Agent session、現有 wmux 已能保留與導航工作，或 Herdr 的 parent TUI 導致 Agent TUI、fish/PowerShell input、IME 或快捷鍵不穩。

---

### 驗證紀錄與限制

- `cargo fmt --check`：通過。
- `cargo metadata --locked --no-deps --format-version 1`：通過，確認單一 `herdr` workspace、v0.8.0 與 vendored `portable-pty` patch resolution 宣告。
- 官方 maintenance unittest 直接在本機 Python 3.14 / Windows checkout 執行：98 tests 中 85 pass、11 fail、2 error。三個 Unix installer tests 明確因缺 `awk`；另有 CP950 decode、Windows path separator/CRLF 與 test fixture expectation 問題。這不是專案規定的 Windows gate，因此不能用來判定產品 build 失敗，但證明 maintenance tests 並非 native Windows portable。
- 未執行完整 `just check` / Rust build / runtime smoke：本機沒有 `just`、`cargo-nextest` 與專案 CI 指定的 Zig 0.15.2；未自行安裝新工具。Current HEAD 的 GitHub Windows/Ubuntu/macOS checks 已驗證通過，但屬 upstream CI 證據，不是本機 runtime 驗證。
- 未執行 dependency vulnerability scanner、二進位 signature 驗證或 runtime network capture；Repomix 的「no suspicious files」不可替代 security audit。
- CodeGraph 在 clone 中未初始化，架構分析改由完整 Repomix snapshot、原始碼與官方文件完成。

---

### 相關連結

- [Herdr GitHub](https://github.com/herdrdev/herdr)
- [官方文件](https://herdr.dev/docs/)
- [v0.8.0 release](https://github.com/herdrdev/herdr/releases/tag/v0.8.0)
- [Windows beta 安裝文件](https://herdr.dev/docs/install/)
- [Plugin trust and security](https://herdr.dev/docs/plugins/#trust-and-security)
- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/spec-kit — GitHub 官方的規格驅動開發工具組|spec-kit]]

---

### 延伸操作

- 想要完整架構圖譜？→ 執行 `/understand`
- 想搜尋特定 symbol？→ 用 `/smart-explore`
- 想比較類似專案？→ 再跑一次 `/repo-intel` 分析另一個 repo
