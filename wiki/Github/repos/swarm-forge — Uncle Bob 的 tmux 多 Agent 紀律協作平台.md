---
source: "https://github.com/unclebob/swarm-forge"
author: "unclebob (Robert C. Martin)"
stars: "1.3K"
clipped: 2026-07-25
tags:
  - "github/repo"
  - "ai-agent"
  - "orchestration"
  - "tmux"
  - "clojure"
---

# swarm-forge — Uncle Bob 的 tmux 多 Agent 紀律協作平台

> **[unclebob/swarm-forge](https://github.com/unclebob/swarm-forge)** | ⭐ 1,251 | 🍴 138 | 📝 **無授權條款**
> "A simple tool for coordinating several AI agents."

## 一句話說明

Robert C. Martin（Clean Code 作者）從兒子 Justin 的專案 fork 後大改的 AI Agent 協作系統。用 tmux session + git worktree 把多個 coding agent（claude / codex / copilot / grok）隔離在各自工作區，透過檔案式 handoff daemon 傳遞任務，並用「憲法（constitution）+ 角色 prompt」強制 TDD、Gherkin 驗收、突變測試、CRAP/DRY 審查等工程紀律。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,251 |
| Forks | 138（fork:star 比 11%，偏高） |
| 主要語言 | Clojure（Babashka）116KB + Shell 13KB |
| 授權 | **無 LICENSE**（法律預設保留所有權利） |
| 建立時間 | 2026-04-17 |
| 最後推送 | 2026-07-10 |
| Release | 無（分支即發行） |
| 首頁 | 無 |
| 規模 | 39 檔 / 46.6K tokens / 3.3MB |

## 分支即工作流

`main` 是文件分支 + 共用腳本，**跑不動**。可執行的是三個分支：

| 分支 | 角色鏈 | 適用 |
|------|--------|------|
| `two-pack` | coder → cleaner → coder | 小任務快速迴圈，無 Gherkin |
| `four-pack` | specifier → coder → refactorer → architect | 中型專案，要規格但不拆滿品質關卡 |
| `six-pack` | specifier → coder → cleaner → architect → hardender → QA | 大型專案，每個品質關卡各自有主 |

取用方式（不建 git remote）：

```sh
BRANCH=four-pack
curl -L "https://github.com/unclebob/swarm-forge/archive/refs/heads/${BRANCH}.tar.gz" | tar -xz --strip-components=1
./swarm
```

## 核心功能

- **Config 決定拓撲**：`swarmforge/swarmforge.conf` 一行一窗
  `window <role> <agent> <worktree> [task|batch] [extra-cli-args...]`
  角色數與後端自由組合；第一個窗 = cleanup 窗，關掉它即收攤（關其他窗會被 watchdog 重開並接回原 session）。
- **分層憲法**：`constitution.prompt` → `constitution/articles/*.prompt`。`main` 提供共用 engineering / handoffs / workflow 三篇；分支用 `local-*.prompt` **疊加**、用**同名檔覆寫**。啟動時只補缺檔，不蓋既有檔。
- **worktree 隔離**：每角色一個 `.worktrees/<role>`；`master`/`none` 例外。狀態全留 `.swarmforge/`。
- **Daemon 式 handoff**：agent 不直接發 tmux 指令。`handoffd.bb` 獨佔 tmux socket，1 秒輪詢 outbox → 驗證 → 投遞 inbox → 只送一句通用喚醒。
- **後端可切**：claude / codex / copilot / grok，逐角色指定，額外 CLI 參數直接透傳。
- **終端適配層**：Terminal.app / Ghostty / Windows Terminal(WSL) / none，加新後端只需實作 6 個 shell 函式契約。
- **防睡眠**：macOS `caffeinate`、Linux `systemd-inhibit`；`SWARMFORGE_PREVENT_SLEEP=0` 關閉。

## Handoff 協議（本專案最值得抄的部分）

訊息只有兩型，且**刻意窄化**：

```text
type: git_handoff
to: <role>[,<role>...]
priority: NN
task: <short-stable-task-name>
commit: <10-character-commit-abbrev>
```

```text
type: note
to: <role>[,<role>...]
priority: NN
message: <one line, max 80 chars>
```

`swarm_handoff.sh` 會驗證 commit abbrev 恰為 10 位十六進位、解析後唯一，並正規化後才入列。
**agent 不准自己寫長交接內文、分支名、佇列檔名或 tmux 指令**——payload 由 helper 生成。

收信三腳本（PATH 注入各 worktree）：

- `swarm_handoff.sh <draft>` — 驗證並排入 outbox
- `ready_for_next.sh` — 依角色 receive mode 收件；輸出 `NO_TASK` / `TASK: <path>` / `BATCH: <path>`
- `done_with_current.sh` — 完成當前任務/批次，並自動檢查下一件

runtime 狀態在各 worktree 的 `.swarmforge/handoffs/{outbox,sent,failed,inbox}`，**不可手改/stage/commit**。durable file queue 設計取代舊版 logbook + resend queue，agent 崩潰重啟仍能續接。

## 技術架構

```
./swarm (分支 wrapper) ── 缺 scripts/ 時從 main 拉 tar.gz 補齊
      ↓
swarmforge.bb (Babashka 主控)
  ├─ parse-config          讀 swarmforge.conf
  ├─ check-dependency!     zsh / git / tmux / bb / backend CLI
  ├─ prepare-worktrees!    每角色一個 .worktrees/<role>
  ├─ create-role-session!  一角色一 tmux session（專屬 socket）
  ├─ open-terminal-surfaces! → terminal-adapters/*.sh
  └─ launch-role!          在 worktree 內起 agent CLI
      ↓
handoffd.bb（常駐 daemon，獨佔 tmux socket）
  outbox → 驗證 / canonical-commit → inbox → wake-up
      ↓
agent helper：swarm_handoff / ready_for_next(_task|_batch) / done_with_current(_task|_batch)
      ↓
swarm-window-watchdog.bb（關窗自動重開）｜close-swarm / swarm-cleanup.sh（收攤）
```

| 層次 | 技術 |
|------|------|
| 主控/邏輯 | Clojure on Babashka（`.bb`，非 JVM） |
| 進入點/膠水 | zsh（每支 `.bb` 配同名 `.sh`） |
| 隔離 | git worktree |
| 通訊 | 檔案系統佇列 + tmux 喚醒 |
| 視覺層 | tmux session ×N + 終端 adapter |
| 測試 | clojure.test via `bb test`（程式碼:測試 ≈ 1:1） |

## 前置需求

`zsh`、`git`、`tmux`、Babashka（`bb`），以及至少一個 agent CLI（codex / claude / copilot / grok）。
**Windows native 跑不動**，只能走 WSL（Windows Terminal adapter 即為此而寫）。

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian Vault | 無直接關聯；handoff 契約設計值得對照 institution R17 |
| Claude Code | 與 7-Agent 工廠概念高度重疊、機制互斥：six-pack ≈ 工廠角色鏈，但它跑 N 個獨立 CLI process + N 個 worktree，而非單 session Agent tool |
| Automation | 平台不合：硬依賴 zsh + tmux + Babashka，與 Windows native + PowerShell hook 生態衝突 |

## 安裝建議

**⏳ 觀望**

1. **授權真空** — 無 LICENSE = 保留所有權利，不可合法複製其腳本進自有 repo 再散布。借鑑想法可以，抄檔案有風險。
2. **平台稅** — zsh + tmux + bb，Windows 需養 WSL 分身；成本 > 現有 7-Agent 工廠的邊際改善。
3. **賽道飽和** — 已有 ruflo / claude-flow / Hivemind + 自建 institution 制度層。它填的是**方法論空白**，而方法論可白嫖不必安裝。

**零成本可帶走的三點：**

- **handoff 強制窄化**：只允許 10 碼 commit + 單行 ≤80 字 note，把 commit hash 當唯一真相 → 直接治「subagent 敘述回報不可信」
- **憲法分層覆寫規則**：同名覆寫 / `local-*` 疊加，比「需要時主動讀」更適合派給 subagent
- **durable file queue**：agent 崩潰重啟可續接，對照多 session 協調機制

**升級條件（→ ✅）**：補上 MIT/Apache 授權 **且**（遷入 WSL 工作流 或 出現 native Windows 支援）；或決定改跑真·多 process agent 架構。
**放棄條件（→ ❌）**：連續 3 個月無 commit（現已 15 天無推送、近兩週 commit 歸零）／方法論消化進 institution 後剩餘價值歸零／授權持續真空且 fork 分裂。

## 相關連結

- [[Github/repos/ruvnetruflo 🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms, coordinate autonomous workflows, and build conversational AI systems. Features    enterprise-grade architecture, self-learning swarm intel|Ruflo]] — 同賽道，已安裝
- [[Github/repos/activeloopaiHivemind — 跨 AI Coding Agent 共享記憶與 Skill 系統|Hivemind]] — 跨 agent 共享層
- [[Github/repos/ChronicleCore-Architecture — 38人格多Agent治理架構白皮書|ChronicleCore]] — 同為「治理/憲法」取向、同樣授權受限
- 外部評測：[PyShine — Swarm Forge: Uncle Bob's AI Agent Coordinator](https://pyshine.com/Swarm-Forge-Uncle-Bobs-AI-Agent-Coordinator/)
