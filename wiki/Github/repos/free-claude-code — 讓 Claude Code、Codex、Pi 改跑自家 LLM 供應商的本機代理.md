---
source: "https://github.com/Alishahryar1/free-claude-code"
author: "Alishahryar1 (Ali Shahryar)"
stars: "42.7K"
clipped: 2026-07-29
tags:
  - "github/repo"
  - "claude-code"
  - "llm-proxy"
  - "self-hosted"
---

## free-claude-code — 讓 Claude Code / Codex / Pi 改跑你自己的 LLM 供應商的本機代理

> **Alishahryar1/free-claude-code** | ⭐ 42,735 | 🍴 6,986 | 📝 MIT
> "Use claude code, codex or pi for free from the terminal, IDE, or your phone like OpenClaw (voice supported)"

---

### 一句話說明

FCC（Free Claude Code）是一個跑在 `127.0.0.1:8082` 的本機反向代理：它對外假裝成 Anthropic Messages API 與 OpenAI Responses API，讓 Claude Code、Codex、Pi 這三個官方 CLI 以為自己在跟原廠講話，實際上把請求翻譯後轉發到你自己設定的 29 家供應商（NVIDIA NIM、OpenRouter、Gemini、DeepSeek、Groq、Ollama、LM Studio…）。目標使用者是「想留著 Claude Code 的 agent harness、但不想付 Anthropic 訂閱／想跑本地模型」的人。

**名稱有誤導性**：拿到的不是免費的 Claude 模型，而是免費／自費地用 Claude Code 這個**殼**去驅動別家模型。原廠 Claude 模型完全不在供應商清單裡。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 42,735 |
| Forks | 6,986（fork/star 比 16%，屬「拿來裝來用」型而非「拿來讀」型） |
| 主要語言 | Python（3.25 MB，佔 96%）；另有 PowerShell / Shell 安裝器 |
| 授權 | MIT |
| 建立時間 | 2026-01-28 |
| Open Issues | 237（已關 343） |
| Open PRs | 106 |
| 最新 Release | **無 GitHub Release、無 tag**；版本只寫在 `pyproject.toml`（分析時 v4.13.1） |
| Topics | 無 |
| 首頁 | 無 |
| 總 commit 數 | 860（前 6 個月） |
| Python 需求 | **>= 3.14.0** |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 478 |
| 總 Tokens | 995,038 |
| 壓縮模式 | 未壓縮（diskUsage 6.7 MB） |
| Repomix 安全掃描 | ✔ 無可疑檔案 |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| assets/how-it-works.svg | 202,539 | 20.4% |
| ARCHITECTURE.md | 19,097 | 1.9% |
| tests/messaging/test_handler.py | 16,197 | 1.6% |
| tests/scripts/test_installers.py | 14,032 | 1.4% |
| tests/providers/test_streaming_errors.py | 12,377 | 1.2% |

**訊號**：Top 5 有 3 個是測試檔，最大的非測試檔是架構文件（19K tokens 的 ARCHITECTURE.md，含完整套件依賴矩陣與擴充檢查清單）。這在 4 萬星等級的「工具型」repo 裡不常見——多數同類專案 Top 5 全是實作檔。

---

### 核心功能

- **雙協議代理**：同時實作 Anthropic Messages（`/v1/messages`）給 Claude Code / Pi，與 OpenAI Responses（`/v1/responses`）給 Codex。不是簡單轉發——`core/anthropic/` 與 `core/openai_responses/` 各有完整的 SSE 串流組裝器、event ledger 與 stream recovery，因為要把 OpenAI-chat 格式的上游回應**重建**成呼叫端期待的線路格式。
- **29 家供應商**：雲端（NVIDIA NIM、OpenRouter、Gemini、Vertex、DeepSeek、Mistral、Bedrock、HuggingFace、Cohere、GitHub Models、Kimi、MiniMax、Cerebras、Groq、SambaNova、Fireworks、Cloudflare、Z.ai、Kilo、Wafer、Vercel Gateway、OpenCode…）＋本地（Ollama、LM Studio、llama.cpp）。多數共用 `providers/openai_chat/` 泛用轉接器，只有行為特殊的才有專屬 client。
- **分層模型路由**：`MODEL_FABLE` / `MODEL_OPUS` / `MODEL_SONNET` / `MODEL_HAIKU` 可各自指向不同上游，`MODEL` 為 fallback。把 Claude Code 內建的模型分級語意映射到任意模型組合。
- **本機 Admin UI**（`127.0.0.1:8082/admin`）：純 vanilla JS + CSS，無前端框架。填 key、搜尋上游模型清單、**Validate 後再 Apply**（先打一次真實請求驗證才寫入設定）。
- **CLI 啟動器**：`fcc-claude` / `fcc-codex` / `fcc-pi` 三個 wrapper，注入 `ANTHROPIC_BASE_URL` 等環境變數後 spawn 原本的 CLI，不改動使用者既有設定。桌面版（Windows/macOS）走 pystray 系統匣常駐。
- **伺服端 web tools**：`api/web_tools/` 自己實作 WebSearch / WebFetch——因為非 Anthropic 上游不提供 Anthropic server tools。附**帶 DNS-rebinding 防護的 SSRF 守門**。
- **Discord / Telegram 橋接**：把聊天訊息變成受管的 Claude Code session，含語音轉文字（NVIDIA Riva 或本地 Whisper）。`messaging/trees/` 是完整訊息樹狀態機，支援 reply-`/stop` 只取消該分支。
- **選用 token 認證**：`proxy_auth.py`，預設 bearer `freecc`。

---

### 技術架構

八個頂層套件，**依賴方向由靜態 AST 契約測試強制**（`tests/contracts/test_import_boundaries.py`）——全 repo 最值得注意的工程決策：

```
                 ┌──────────────────────────────────────┐
   Claude Code ──┤ /v1/messages   (Anthropic 協議)      │
   Pi          ──┤                                      │
   Codex       ──┤ /v1/responses  (OpenAI Responses)   │──► api/  (FastAPI adapter)
   Admin UI    ──┤ /admin, /v1/models, /health, /stop   │      │
   Discord/TG  ──┤ → messaging/ → 受管 CLI session ─────┘      │
                 └──────────────────────────────────────┘      ▼
                                                        application/  (ModelRouter
                                                        │   + ProviderExecutor + Lease)
                                                        ▼
                                                        providers/
                                                        │  ├ openai_chat/ (泛用 profile)
                                                        │  ├ nvidia_nim/ gemini/ vertex/
                                                        │  │  deepseek/ mistral/ kilo/ …
                                                        │  └ runtime/ (discovery/factory/cache)
                                                        ▼
                                                        core/  (協議中立層)
                                                          ├ anthropic/       ← SSE emitter/ledger/recovery
                                                          └ openai_responses/← assembler/blocks/events

   runtime/ = 唯一組合根（process composition root），只有它能 import 全部套件
```

依賴白名單（README 未提，來自 ARCHITECTURE.md，且有測試把關）：

| 套件 | 允許直接依賴 |
|------|------|
| `config` | 無 |
| `core` | 無 |
| `application` | `config`, `core` |
| `messaging` | `core` |
| `providers` | `application`, `config`, `core` |
| `api` | `application`, `config`, `core` |
| `cli` | `config`, `core` |
| `runtime` | 全部（組合根） |

| 層次 | 技術 |
|------|------|
| HTTP | FastAPI + uvicorn，httpx[socks] 出向 |
| 驗證／設定 | pydantic v2 + pydantic-settings + python-dotenv（設定落 `~/.fcc/`） |
| 上游 SDK | `openai>=2.46` 為主；Vertex 走 google-auth ADC |
| 前端 | vanilla JS / CSS，無框架 |
| 訊息 | discord.py + python-telegram-bot |
| 語音（選用） | nvidia-riva-client 或 torch+transformers+librosa（懶載入，強制函式內 import） |
| 工具鏈 | uv（強制 >=0.11.16）／ruff／ty 型別檢查／pytest + xdist ／loguru |
| 測試 | `tests/`（確定性單元＋契約）＋ `smoke/`（prereq / product 兩層，會起子行程打真實服務） |

---

### 社群健康度

- **Bus factor = 1**：Alishahryar1 一人 728 commits（全 repo 860）。第 2、5 名貢獻者是 AI agent 帳號（`cursoragent` 53、`claude` 6）——此 repo 相當程度是 AI 寫的。
- **零 Release、零 tag**：版本只在 `pyproject.toml`，更新靠重跑 `curl | sh` 拉 main 最新版，**沒有可釘住的版本**。
- Issue 積壓 41% 未解、PR 積壓 106。

### 已知痛點（來自 issue 訊號，非社群評測）

留言最多的 7 個 open issue 裡 **6 個是同一件事**——上游供應商請求失敗（`Provider API request failed`、HTTP 200 但空回應、NVIDIA NIM / DeepSeek / Kimi 失敗）。這不是 FCC 的架構問題，而是這類專案的結構性風險：免費層供應商會限流、改 schema、對 tool-calling 支援不一致，代理層永遠在追。

第二類痛點是「模型能力落差」——Claude Code 的 system prompt + tool 定義很長，小模型 context 不夠或 tool-calling 不穩就會整個 agent loop 崩掉（README 自己也警告要用 tool-capable 模型）。

**外部驗證薄弱**：Exa 搜不到第三方評測，Reddit 無針對性討論。YouTube 教學生態倒是成熟（多支「免費用 Claude Code」教學，最高 34.7 萬觀看，其中兩支直接教 NVIDIA NIM + local proxy 這條 FCC 預設路徑）——但那是**需求訊號**，不是品質評測。42.7K 星同理。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無關聯。 |
| **Claude Code** | **衝突面最大**。FCC 要求把 `ANTHROPIC_BASE_URL` 指向本機、設 `ANTHROPIC_AUTH_TOKEN=freecc`、`DISABLE_AUTOUPDATER=1`。本環境的 `ANTHROPIC_MODEL` 釘法、`CLAUDE_CONFIG_DIR` 語意、settings 兩宇宙統一都建立在「直連 Anthropic」的前提上。另外 README 教人塞 `hasCompletedOnboarding: true` 進 `.claude.json`——本環境該檔已歸位且有 config-drift 金絲雀在看，外部工具寫入會觸發告警。 |
| **Automation** | 中性偏負。現有 hook／排程全部假設 Claude Code 行為與原廠一致；換模型後 hook 照跑，但 agent 品質下降會讓驗收成本上升。 |

---

### 安裝建議

**❌ 不適合安裝（於本環境）** — 屬「用不到」而非「品質不行」。

1. **需求不存在**。本環境是付費 Claude Code + `opus[1m]`，FCC 唯一賣點對這裡零價值，裝了只多一層可能壞掉的代理。
2. **與既有設定正面衝突**。要動 `ANTHROPIC_BASE_URL` / `.claude.json` / `DISABLE_AUTOUPDATER`，而這幾處剛統一完並掛了漂移金絲雀。R13 判準：加大量複雜度換一個用不到的能力 → 不做。
3. **安裝方式風險**：`curl | sh` / `irm | iex` 執行遠端腳本，無 tag、無 Release、無 checksum，更新即重跑同一條命令拉 main 最新版。
4. **Bus factor 1**、6 個月專案、PR/issue 積壓偏高。

**這個判斷不否定它的工程品質**——契約測試釘架構、SSRF 守門、雙層 smoke test、19K token 架構文件，在同星等的工具型 repo 裡屬前段。若需求變了（要在無網路／自費上限情境下跑本地模型），它是這條路上最完整的實作，屆時可重評。

**📌 可單獨抽取（不需安裝 FCC）**：
- `api/web_tools/egress.py`：DNS-rebinding-safe SSRF 守門（先 `getaddrinfo` 解析 → 驗證非私網 → 把 TCP 連線 pin 在那組 addrinfo 上，防解析後改綁）。約 60 行、零外部依賴，寫任何吃使用者 URL 的工具都能抄。
- `tests/contracts/test_import_boundaries.py` + ARCHITECTURE.md 依賴白名單表：用測試把架構契約釘死的可運行範例。
- `smoke/` 的 prereq/product 兩層分法：prereq 驗環境（有沒有 key、服務起沒起），product 驗行為，失敗訊息不會混在一起。

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/claude-howto — Claude Code 視覺化互動教學指南|claude-howto]] — 同屬 Claude Code 生態，內容型而非工具型
- [[Github/repos/Headroom — AI Agent Context 壓縮層|Headroom]] — 另一種掛在 Claude Code 前的中間層（context 壓縮 proxy），已安裝
