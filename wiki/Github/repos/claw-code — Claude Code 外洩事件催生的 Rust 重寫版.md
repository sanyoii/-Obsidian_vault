---
source: "https://github.com/ultraworkers/claw-code"
author: "ultraworkers (Ultraworkers - ULW)"
stars: "195K+"
clipped: 2026-07-31
tags:
  - "github/repo"
  - "cli-agent"
  - "rust"
  - "claude-code"
  - "legal-grey-area"
---

# claw-code — Claude Code 外洩事件催生的 Rust 重寫版，作者親口封為「博物館展品」

> 來源：https://github.com/ultraworkers/claw-code
> 授權：MIT｜⭐ 195K+｜🍴 109K（fork/star **56%**）
> 規模：339 檔 / 1.21M tokens（2026-07-31 repomix 實測，未壓縮）

> [!warning] 這是外洩事件的產物，且作者已宣告它不再是產品
> 2026-03 Anthropic 因 source map 誤放公開目錄，外洩逾 50 萬行 Claude Code 原始碼；Anthropic 提出 **8,100+ 件 DMCA 下架請求**（後收斂為近百件精準鎖定）。韓國開發者 Sigrid Jin 用 OpenAI Codex 依其架構做 Python 重寫、後轉 Rust，**一天內破 10 萬星**。四個月後 README 第一段已改為「Claw Code is not the serious production project here」，要幹活請改用 LazyCodex / Gajae-Code。
> 作者宣稱不含任何 Anthropic 專有檔案，但「重寫版是否構成衍生著作」未經法院裁判，且該外洩報導指出 Claude Code 本身約 90% 由 Claude 自己寫成、著作權歸屬本身存疑。**未被 archive、未被下架，MIT 照掛。**

---

## 這是什麼？

`claw` CLI agent harness 的公開 Rust 實作。crate 真名是 **`rusty-claude-cli`**——原始身分沒有被改名完全掩蓋。

它現在的價值不是拿來用，而是一份可解剖的化石：**一個宣稱全程無人工介入、由多個 agent 自主開發維護的 Rust 專案長什麼樣**。`PHILOSOPHY.md` 說得直白——「如果你只盯著這個 repo 裡生成的檔案，你看錯層了。Python 重寫是副產品，Rust 重寫也是副產品。真正值得研究的是**產出它們的那套系統**。」

---

## 結構與規模

| 區域 | 檔案數 |
|------|--------|
| `rust/` | 170（11 crate） |
| `src/`（舊 Python 重寫，留作參考與稽核） | 100 |
| `docs/` / `.github/` / `scripts/` / `tests/` | 26 / 9 / 8 / 5 |

11 個 crate：`runtime` 52、`api` 16、`rusty-claude-cli` 14、`claw-rag-service` 11、`plugins` 10、`tools` 7、`claw-analog` 6、`mock-anthropic-service` 3、`commands` 2、`compat-harness` 2、`telemetry` 2。
副檔名：`.rs` 101、`.py` 80、`.json` 70、`.md` 46、`.toml` 13、`.sh` 11。

### Token 前 5 大檔（兩個發現藏在這裡）

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `rust/crates/rusty-claude-cli/src/main.rs` | 161,107 | 13.3% |
| `rust/.claude/sessions/session-1775011562247.json` | 123,607 | 10.2% |
| `rust/crates/tools/src/lib.rs` | 87,517 | 7.2% |
| `rust/crates/commands/src/lib.rs` | 55,928 | 4.6% |
| `rust/crates/rusty-claude-cli/tests/output_format_contract.rs` | 53,643 | 4.4% |

1. **第二大檔是一份 agent 對話紀錄 JSON**，被直接 commit 進版本庫——與「由 agent 開發」的宣稱一致，他們把工作階段當產物保存。全 repo 掃過 `sk-ant-`/`sk-proj-`/`ghp_`/`AKIA` 樣式，**真實金鑰命中 0 筆**。
2. `main.rs` 755,916 字元、`tools/src/lib.rs` 10,892 行——**單檔巨大化是 agent 生成程式碼的典型指紋**。

---

## 核心功能

- **`claw` 主 CLI**：REPL、OAuth、串流、完整工具集（bash / MCP / plugin），支援 Anthropic、OpenAI 相容 API、xAI 三種 provider
- **`claw-analog`**：同一 API 層上的精簡殼，工具只限工作區檔案操作、權限模式外顯、NDJSON 輸出，設計給 CI / 腳本 / 外部 agent
- **`claw-rag-service`**：獨立行程，repo 切塊 + embedding 存 SQLite，提供語意搜尋 HTTP API；agent 設 `RAG_BASE_URL` 即可用 `retrieve_context`
- **`mock-anthropic-service` + `compat-harness`**：確定性 mock 與 parity 對拍，驗證 Rust 移植的行為一致性（`PARITY.md`）
- **權限強制層**：`runtime::permission_enforcer::PermissionEnforcer` 是實際存在的模組，非文件宣稱
- **本機模型**：Ollama / llama.cpp / vLLM，另有 mlx-lm backend 文件

---

## 技術架構

```
        ┌──────────────────────────────────────────────┐
        │  Providers: Anthropic / OpenAI-compat / xAI  │
        └───────────────────────┬──────────────────────┘
                                │  crates/api
     ┌──────────────────────────┼──────────────────────────┐
     ▼                          ▼                          ▼
┌──────────────┐        ┌──────────────┐        ┌────────────────────┐
│rusty-claude- │        │ claw-analog  │        │ claw-rag-service   │
│cli （claw）   │        │ 精簡迴圈      │        │ HTTP + SQLite      │
│REPL/OAuth/   │        │ 唯讀/audit   │        │ ingest / query     │
│串流/plugin   │        │ NDJSON→CI    │        │ + 最小 web UI      │
└──────┬───────┘        └──────┬───────┘        └─────────┬──────────┘
       │                       │                          │
       │      crates/runtime（52 檔，最大宗）              │ retrieve_context
       │  file_ops｜permission_enforcer｜mcp_tool_bridge   │ (POST /v1/query)
       │  lsp_client｜execute_bash｜glob/grep_in_workspace │
       └───────────────────────┴──────────────────────────┘
                               │
                     workspace 檔案系統（-w）
                               │
      crates/mock-anthropic-service ＋ compat-harness → PARITY 對拍
```

| 層次 | 技術 |
|------|------|
| 語言 | Rust（canonical）＋ Python（`src/`，參考與稽核） |
| CLI | 單一 workspace，11 crate，`cargo build --workspace` |
| 檔案存取 | **雙軌 API**：`read_file()`（無邊界檢查）與 `read_file_in_workspace()`（帶 workspace root） |
| 檢索 | 獨立 RAG 行程，SQLite 存 chunk + embedding |
| 容器 | Containerfile + docker-compose，文件主推 container-first |
| 安裝 | `install.sh` **從原始碼建置**（偵測 OS、驗 Rust toolchain、build、驗證），非下載二進位 |

---

## 已知問題與安全治理

| 項目 | 狀態（2026-07-31 實查） |
|------|------|
| 🔒 `read_file` 缺工作區邊界驗證（Medium，2026-06-28 開） | **main 上仍未修**（`file_ops.rs:185` 只做 `normalize_path()`）。**但 issue 高估了影響**：agent 暴露的 read 工具走 `tools/src/lib.rs:2450` 的 `run_read_file()`，呼叫的是帶邊界的 `read_file_in_workspace()`。危險的是 library API，不是 CLI 使用者的攻擊面 |
| 🔒 HIGH 級協同揭露請求（2026-07-13 開） | 回報者稱有 sandbox 隔離回報與權限模式持久化的 HIGH 漏洞，但該 repo 的 **private vulnerability reporting 為關閉**（實查 `enabled: false`），無法提交 GHSA；**至今無回應**。已發布 advisory 數：**0** |
| 治理矛盾 | `SECURITY.md` 寫「請用 GitHub private vulnerability reporting」——但那功能沒開。**文件與實況不符** |
| 🪟 Windows `grep_search` 誤判越界（2026-07-23 開） | 尚無 `.claw/` 的目錄第一次 `grep_search` 失敗，錯誤訊息兩邊同路徑、只差 `\\?\` extended-length 前綴——邊界檢查未正規化前綴。建立 `.claw/` 後即正常，屬初始化順序問題 |
| 效能 | 有回報本機 Ollama/Qwen2.5:7b 場景比直接呼叫慢約 120 秒 |
| Repomix secret scan | 標記 `ROADMAP.md` 3 處疑似密鑰——**實查為假陽性**，全是 `sk-secret-ABC123`、`sk-ant-fake` 這類刻意寫的測試值，用途正是驗證他們自己的密鑰遮蔽功能。反而是加分項 |

---

## ⚠️ 安裝管道陷阱（README 自己就有警告）

```
cargo install claw-code   ← 錯的
```

crates.io 的 `claw-code` 是**廢棄 stub**（0.1.0，2026-04-01 後未更新，296 次下載），只會放一個 `claw-code-deprecated.exe`，執行後印「claw-code has been renamed to agent-code」。

它指向的 `agent-code`（4,873 次下載、v0.30.0、2026-07-29 仍更新）**repository 欄位指向 `avala-ai/agent-code`——完全不同的 org**（21 星，2026-03-31 同日建立，至今活躍）。crates.io 這條線根本不通往 `ultraworkers/claw-code`。

本 repo **無任何 GitHub release**，唯一取得方式是 `git clone` + `cargo build --workspace`（release build 需 5–10 分鐘）。

---

## 專案體質

- **雙人主導**：1,684 commits 中 Yeachan-Heo 609 + code-yeongyu 563 = **70%**；realsigridjin（外洩重寫的原作者）僅 7 筆
- **已凍結**：最後推送 2026-06-26，近四週 commit **0/0/0/0**；0 release；14 open issues、20 open PRs 無人處理
- **fork 性質**：抽樣最近 100 個 fork——**全部 0 星、全部停在上游 HEAD 未做任何修改**，是純鏡像式「先留一份」而非「fork 來改」。凍結一個月後**每天仍有 2–5 個新 fork**
- **外部驗證的弔詭**：HN 命中 20 篇但**最高僅 13 分**（`Claw code reaches 100k stars on GitHub in 1 day`）；YouTube 教學生態反而成熟（最高 56K 觀看），且明確以「跑外洩版 Claude Code」為賣點。**極端星數 + 極低技術社群討論度**並存——熱度來自新聞事件而非技術辯論

---

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Claude Code | **直接競品且嚴格更差**。`claw` 明文要求 **API key 計費**，README 註明「Claude 訂閱登入不是支援的驗證路徑」。已有訂閱者換過去＝吃到飽改按 token 計價，換來一個停更的重寫版 |
| Windows | 比多數同類好——有 PowerShell-first 安裝文件、`claw.exe`、Windows release 專章。但**有現行未修的 Windows 專屬 bug**，且需先裝 Rust toolchain |
| institution 制度層 | **真正值得看的部分**。`PHILOSOPHY.md` 的三件套與本環境高度同構：`oh-my-codex`（一句指令→可重複工作協定）≈ 派工三件套；**`clawhip`（把監控與通知路由推出 agent 的 context window 之外）** ≈ R16 長迴圈透明化，解法更徹底；`oh-my-openagent`（跨 agent 規劃/交接/歧見解決/驗證迴圈）≈ 7-Agent 工廠。其「人類介面是 Discord，下完指令就走開」是本環境未走的方向 |
| 雙 AI 工作流 | `oh-my-claudecode`（38.2K⭐）與 `oh-my-codex`（32.3K⭐）皆持續更新，正對應 Claude Code + Codex 雙 AI 配置。⚠️ 但 `oh-my-codex` **無 LICENSE 檔**（無授權＝保留所有權利），採用前要問清楚 |
| Obsidian | 無直接關聯 |

---

## 安裝建議

❌ **不適合安裝** — 三個獨立理由，任一條都足夠：

1. **作者已親自把它下架成展品**。README 第一段即「Claw Code is not the serious production project here」，要你改用 LazyCodex / Gajae-Code。停更、0 release、雙人貢獻者佔 70% 且都已轉戰後繼專案
2. **經濟性為負**。要 API key 按 token 計費、不吃訂閱，功能是既有工具的重寫版
3. **安全治理實質失效**。HIGH 級揭露卡在關閉的 PVR 通道無人回應、Medium 越界讀取未修、0 則 advisory——而這是一個會執行 bash、掛 MCP、存取整個工作區的 agent harness

法律疑雲（外洩衍生、8,100 件 DMCA、著作權歸屬未經裁判）為既存事實，非本文結論。

### 📌 真正該追的三個活體目標（2026-07-31 皆仍在推送）

| Repo | ⭐ | 授權 | 為何值得 |
|------|-----|------|---------|
| `code-yeongyu/oh-my-openagent` | 66.8K | Other | 多 agent 協調：規劃、交接、歧見解決、驗證迴圈 |
| `Yeachan-Heo/oh-my-claudecode` | 38.2K | MIT | 直接對應 Claude Code 主力 |
| `Yeachan-Heo/clawhip` | 922 | MIT | Rust；通知/監控路由推出 context window——與 R16 同題 |

`Yeachan-Heo/oh-my-codex`（32.3K⭐）對應 Codex 側，但**無 LICENSE**，先別碰。

---

## 相關連結

- [[Github/repos/ECC — Claude Code harness-native 操作系統\|ECC]]
- [[Github/repos/fable-harness — Fable 行為協議移植套件（hooks 強制執行層）\|fable-harness]]
- [[Github/repos/CowAgent — chatgpt-on-wechat 改名後的開源個人 Agent Harness\|CowAgent]]
- [[Github/repos/farion1231cc-switch A cross-platform desktop All-in-One assistant tool for Claude Code, Codex, OpenCode, openclaw & Gemini CLI\|cc-switch]]
- [[Github/repos/ClawWork — 港大讓 AI Agent 自負盈虧的經濟生存基準\|ClawWork]]
