---
source: "https://github.com/router-for-me/CLIProxyAPI"
author: "router-for-me"
stars: "40.7K"
clipped: 2026-07-13
tags:
  - "github/repo"
  - "claude-code"
  - "api-proxy"
  - "golang"
  - "infrastructure"
---

# CLIProxyAPI — 把 Claude Code／Codex／Gemini 訂閱包成 OpenAI 相容 API 的多帳號閘道

> **router-for-me/CLIProxyAPI** | ⭐ 40.7K | 🍴 6.6K | 📝 MIT
> "Wrap Antigravity, ChatGPT Codex, Claude Code, Grok Build as an OpenAI/Gemini/Claude/Codex compatible API service..."

## 一句話說明

Go 寫的本機代理伺服器：用 OAuth 登入既有的 Claude Code／ChatGPT Codex／Gemini／Grok／Antigravity **訂閱帳號**，統一包成 OpenAI／Gemini／Claude 相容 API endpoint。等於「訂閱制帳號→API 化」，讓任何吃 OpenAI API 的工具（Cursor、Cline、SDK、自寫 agent）都能透過月費訂閱跑，支援多帳號 round-robin 負載平衡。目標使用者＝重度 AI coding 用戶、想用訂閱額度餵自動化的開發者、要統一入口管多個 coding assistant 的團隊。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 40.7K |
| Forks | 6.6K（極高，生態龐大） |
| 主要語言 | Go（99%，7.9MB） |
| 授權 | MIT |
| 建立 | 2025-07-01 |
| 最新 Release | v7.2.71（天級發版） |
| Topics | claude-code, gemini, openai, codex, antigravity |
| 文件站 | help.router-for.me |
| 維護 | luispater 主力 + 10+ 貢獻者，高度活躍 |

## 核心功能

- **訂閱帳號 OAuth → API**：Claude Code / Codex / Gemini / Grok / Antigravity 皆 OAuth 登入，非 reverse-engineer key。
- **多協定相容 endpoint**：同時吐 OpenAI（含 Responses API）／Gemini／Claude 相容介面，client 端零改動。
- **多帳號負載平衡**：每個 provider 多帳號 round-robin，分攤額度、自動 failover。
- **串流／工具呼叫／多模態**：streaming、non-streaming、WebSocket、function calling、text+image 全支援。
- **協定翻譯層**：`internal/translator/` 做 OpenAI↔Gemini↔Claude 請求/回應格式互轉。
- **外掛系統（多語言 ABI）**：`pluginhost`/`pluginstore` + C/Go/Rust 三語言外掛範例（auth、executor、frontend-auth、claude-web-search-router 等）。
- **可嵌入 SDK**：`sdk/cliproxy` 讓整個 proxy 當 library 塞進自己的 Go 程式。
- **叢集模式**：`docker-compose.cluster.yml` + `internal/redisqueue` 支援多節點部署。
- **管理 API + 熱重載**：Management API 動態管帳號，`internal/watcher` config 熱更新不重啟。

## 技術架構

```
CLI/SDK client (OpenAI/Gemini/Claude 格式)
        │
        ▼
  cmd/server ── HTTP/WS 入口
        │
  internal/api ──→ translator（協定互轉）──→ auth（各 provider OAuth）
        │                                        │
  registry（模型/provider）              round-robin 多帳號池
        │                                        │
  pluginhost/pluginstore ← C/Go/Rust 外掛   watcher（config 熱重載）
        │
  store/cache ─ 持久化   redisqueue ─ 叢集佇列   wsrelay ─ WS 轉發
        ▼
  上游：Claude Code / Codex / Gemini / Grok / Antigravity 訂閱帳號
```

| 層次 | 技術 |
|------|------|
| 語言/執行期 | Go（單一 binary，跨平台） |
| 入口 | `cmd/server`（HTTP + WebSocket） |
| 核心 | translator（協定翻譯）、auth（OAuth）、registry、round-robin |
| 擴充 | plugin ABI（C/Go/Rust）、embeddable Go SDK |
| 部署 | Docker、docker-compose、cluster（Redis） |
| 運維 | Management API、config watcher 熱重載、TUI |

架構成熟度高：清楚的 internal/sdk 分層、多語言外掛 ABI、叢集支援、熱重載——生產級基礎設施，非玩具。`internal/` 30+ 子模組，`sdk/` 供嵌入。

## 衍生生態

README 列 10+ 下游專案（共同賣點「no API keys needed」）：vibeproxy（macOS menu bar）、CCS（Claude 帳號切換）、Quotio（額度追蹤 + auto-failover）、ProxyPilot（Windows fork）、claude-proxy-vscode（VSCode 擴充）、霖君（跨平台管理 App）等。

## 已知風險

- ⚠️ **ToS 風險**：用訂閱帳號 OAuth 當 API 服務，多半違反 provider 服務條款，帳號可能被封。
- README 是**贊助商廣告牆**（十幾家 relay/帳號代購 aff 連結），商業味濃、需自行判斷。
- 安全建議：隔離環境跑、專用帳號、鎖住 Management API、過 log 再放真實資料。
- Repomix 安全掃描標了 2 個 test 檔（假憑證，非真實外洩）。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Claude Code** | 🔥 高度相關：本環境 Claude Code 重度用戶，踩過「月支出上限到頂→subagent 先死」。此 proxy 理論上能把多個訂閱帳號 round-robin 分攤額度、auto-failover，正對痛點。 |
| **Automation** | social-monitor / jobsmith / career-ops 若改吃 OpenAI 相容 endpoint，可透過訂閱額度跑而非付 API 費。 |
| **Obsidian / gbrain** | 無直接關聯（基礎設施層）。 |

## 安裝建議

**⏳ 觀望（技術強、ToS 風險需自己拍板）**

- 技術面：40.7K⭐、天級更新、生產級架構、龐大衍生生態——同類最成熟。
- 踩雷面：核心玩法（訂閱 OAuth 當 API）很可能違反 Anthropic/OpenAI ToS，帳號有被封風險；主要解「多帳號分攤額度」，若只有單一訂閱、額度到頂等重置，幫助有限。
- if-then：願開多帳號分攤 + 接受 ToS 灰色地帶 → 值得試（隔離環境、鎖 Management API）；只想單帳號省事用 Claude Code → 跳過。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：實際常態性撞到 Claude Code 額度上限，且願意接受多帳號分攤的 ToS 灰色地帶風險
- **放棄條件**（→ ❌ 不裝）：僅有單一訂閱帳號、額度到頂等重置即可應付 → 多帳號分攤的核心價值用不到

## 相關連結

- [[Github/repos/farion1231cc-switch A cross-platform desktop All-in-One assistant tool for Claude Code, Codex, OpenCode, openclaw & Gemini CLI\|cc-switch（桌面版）]] — 模型/帳號切換工具
- [[Github/repos/Use claude-code for free in the terminal, VSCode extension or discord like OpenClaw (voice supported)\|OpenClaw]] — 免費 Claude Code
- [[Github/_index|Github Repo 分析總索引]]
