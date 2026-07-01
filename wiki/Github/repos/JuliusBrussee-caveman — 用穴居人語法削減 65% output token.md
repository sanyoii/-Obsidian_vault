---
source: "https://github.com/JuliusBrussee/caveman"
author: "JuliusBrussee (Julius Brussee)"
stars: "78K+"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "claude-code/skills"
  - "token-optimization"
  - "prompt-engineering"
---

# JuliusBrussee/caveman — 用穴居人語法削減 65% output token

> **JuliusBrussee/caveman** | ⭐ 78K+ | 🍴 4.4K | 📝 MIT
> "🪨 why use many token when few token do trick — Claude Code skill that cuts 65% of tokens by talking like caveman"

---

## 一句話說明

Caveman 讓 AI 助手用極度壓縮的「穴居人語法」回應，刪掉所有廢話（客套話/冠詞/修飾語），保留完整技術內容，實測可削減 65–75% output token。目標使用者是任何想降低 Claude 成本、加快回應速度的開發者。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 78,063 |
| Forks | 4,415 |
| 主要語言 | JavaScript |
| 授權 | MIT |
| 建立時間 | 2026-04-04 |
| 最後推送 | 2026-06-12 |
| Open Issues | 145 |
| Open PRs | 181 |
| 最新 Release | v1.9.0（2026-06-12）|
| Topics | ai, claude, claude-code, llm, meme, prompt-engineering, skill, tokens |
| 首頁 | https://caveman.so/ |
| 是否 Archived | No |

---

## 核心功能（7 Skills + 3 Agents + 4 Commands）

### 1. `caveman`（主 Skill）
觸發後每條回應都以穴居人語法壓縮。六個強度等級：

| 等級 | 說明 |
|------|------|
| `lite` | 去除廢話/套語，保留完整句子 |
| `full`（預設）| 去冠詞、片段句 OK、短同義詞 |
| `ultra` | 最大縮寫（prose 詞），箭頭因果鏈 |
| `wenyan-lite` | 半文言，輕壓縮 |
| `wenyan-full` | 完整文言文，80-90% 字符壓縮 |
| `wenyan-ultra` | 極限文言壓縮 |

### 2. `caveman-compress`
壓縮記憶體檔案（CLAUDE.md、todo、preferences）成穴居人格式，減少 input token。Python 腳本執行，保留原始備份（`.original.md`）。

### 3. `caveman-stats`
讀取實際 session log 顯示真實 token 節省數字（非 AI 估算），由 hook 注入，不消耗額外 token。

### 4. `caveman-review`
Compressed code review 格式：`L<line>: <問題>. <修法>.`，搭配嚴重度前綴（🔴bug/🟡risk/🔵nit/❓q）。

### 5. `caveman-commit`
Conventional Commits 格式的 commit message 生成器，主旨 ≤50 chars，只在「why 不明顯時」才加 body。

### 6. `cavecrew`
三個子代理人系統，輸出都是 caveman 格式（主 context ~60% 縮小）：
- `cavecrew-investigator`：找 code 位置/找引用
- `cavecrew-builder`：最多 2 個檔案的精準 edit
- `cavecrew-reviewer`：diff/branch 審查

### 7. `caveman-help`
說明 skill 如何使用。

### Commands
`caveman.toml` / `caveman-commit.toml` / `caveman-init.toml` / `caveman-review.toml`

---

## 技術架構

```
caveman/
├── skills/               ← 7 個 Skills（SKILL.md + scripts）
│   ├── caveman/          ← 主 skill
│   ├── caveman-compress/ ← Python 壓縮腳本
│   ├── caveman-stats/    ← 由 hooks 注入
│   ├── caveman-review/
│   ├── caveman-commit/
│   ├── cavecrew/         ← 3-subagent 決策 skill
│   └── caveman-help/
├── agents/               ← 3 個 agent 定義
├── commands/             ← 4 個 .toml commands
├── src/hooks/            ← JS hooks（stats/mode-tracker）
├── src/mcp-servers/      ← caveman-shrink MCP server
├── evals/                ← 評估腳本 + 結果 snapshot
└── benchmarks/           ← 效能基準測試
```

| 層次 | 技術 |
|------|------|
| Skill 定義 | Markdown（SKILL.md）|
| 壓縮腳本 | Python（compress.py/detect.py/validate.py）|
| Hooks | JavaScript（Node.js）|
| MCP Server | JavaScript（caveman-shrink）|
| 跨平台支援 | Claude Code / Codex / Gemini CLI / Cursor / Windsurf 等 40+ |

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **本地 caveman skill** | 已安裝 `caveman` 基礎版，但缺少 6 個附加 Skills 和 hooks；主 skill 有 3 條新規則未同步 |
| **Claude Code** | 直接整合，7 Skills + 4 Commands 可一次性裝入 |
| **Token 優化** | 與 `context-budget` skill 互補：caveman 削減 output，context-budget 管理 input |
| **Obsidian Vault** | `caveman-compress` 可壓縮 CLAUDE.md 和 memory 檔案，對 d:\Claude 知識系統有實際用途 |

---

## 與現有 caveman skill 的差異（對比表）

| 項目 | 本地版 | Plugin v1.9.0 |
|------|--------|---------------|
| 核心 caveman 語法 | ✅ | ✅（同等） |
| 六強度等級 | ✅ | ✅ |
| 多語言保留規則 | ❌ | ✅（user 寫中文→用中文 caveman）|
| No self-reference 規則 | ❌ | ✅（不說「caveman mode on」）|
| 不做 tool-call narration | ❌ | ✅ |
| `caveman-compress` | ❌ | ✅（壓縮 CLAUDE.md 等）|
| `caveman-stats` | ❌ | ✅（真實 token 數）|
| `caveman-review` | ❌ | ✅ |
| `caveman-commit` | ❌ | ✅ |
| `cavecrew` 子代理 | ❌ | ✅（3 agents + 決策 skill）|
| Hooks（JS）| ❌ | ✅（需額外安裝）|
| MCP Server | ❌ | ✅（需額外安裝）|

---

## 安裝建議

✅ **建議安裝完整 Plugin** — 你現有版本只是主 skill 的舊版，缺少 6 個附加 Skills；`caveman-compress` 對壓縮記憶體/CLAUDE.md 有直接用途，`cavecrew` 對長 session context 管理有幫助。

```bash
gh repo clone JuliusBrussee/caveman "$env:TEMP\caveman-plugin" -- --depth 1
# 複製 skills/
Copy-Item "$env:TEMP\caveman-plugin\skills\*" "C:\Users\sanyo\.claude\skills\" -Recurse -Force
# 複製 agents/
Copy-Item "$env:TEMP\caveman-plugin\agents\*" "C:\Users\sanyo\.claude\agents\" -Recurse -Force
# 複製 commands/
Copy-Item "$env:TEMP\caveman-plugin\commands\*" "C:\Users\sanyo\.claude\commands\" -Recurse -Force
```

**注意：** Hooks（`src/hooks/`）和 MCP Server（`src/mcp-servers/`）需要 Node.js 環境，並在 `settings.json` 中手動配置，不是只複製就能用的。

---

## 相關連結

- [[Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件|addyosmani/agent-skills]] — 同為 Skills 套件，互補
- [[Github/repos/ECC — Claude Code harness-native 操作系統|ECC]] — 包含 `context-budget` 等 token 管理 skills
