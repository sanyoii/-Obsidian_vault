---
tags: [AI, tools, coding-agent, terminal, rust, open-source, deepseek]
date: 2026-06-19
status: evaluated
verdict: 開源 Claude Code 替代品，模型中立，DeepSeek 優先
---

# CodeWhale 評估報告

> 評估日期：2026-06-19  
> 來源：https://github.com/Hmbown/CodeWhale  
> 版本：v0.8.62（2026-06-17）  
> 授權：MIT

## 這是什麼？

**CodeWhale 是一個開源的終端 AI 編程代理**（Terminal Coding Agent），用 Rust 寫的。功能定位跟 Claude Code 幾乎一樣 — 讀程式碼、做修改、執行命令、檢查結果、多步任務規劃、失敗自我修正 — 但它不綁定單一 LLM，支援 25 個 provider。

一句話定義：「模型中立的 Claude Code 開源替代品，DeepSeek 優先但支援幾乎所有主流 LLM」

前身是 `deepseek-tui`，後改名為 CodeWhale。

## 核心功能比較

| 能力 | Claude Code | CodeWhale |
|------|-------------|-----------|
| 模型支援 | Anthropic Claude only | 25 providers（DeepSeek/Claude/GPT/GLM/Kimi/Ollama…） |
| 語言 | TypeScript | Rust（edition 2024，需 Rust 1.88+） |
| 授權 | 商業 | MIT 開源 |
| 操作模式 | Plan/Agent/YOLO | Plan/Agent/YOLO（相同三種） |
| 子代理 | 有 | 有，最多 20 個並行 |
| MCP | 有 | 有，雙向（消費+提供） |
| Skills | 有（`~/.claude/skills/`） | 有（`~/.codewhale/skills/`） |
| 沙箱安全 | OS sandbox + hooks | bwrap/Landlock/Seatbelt/seccomp + hooks |
| 回滾 | 有 | side-git snapshots + `/restore` |
| VS Code 擴展 | 有 | 有 |
| Headless/CI | `claude exec` | `codewhale exec` |
| 嵌套憲法 | 無（平坦 system prompt） | 有（4 層：全域法→專案法→請求→證據） |
| 即時通訊整合 | 無 | Telegram/飛書/微信 bridge |
| 中國鏡像 | 無 | CNB mirror for GitHub-blocked users |

## 嵌套憲法（特色機制）

CodeWhale 用 4 層優先級解決指令衝突，不靠模型猜測：

1. **Global Constitution** — 基本法，編譯進 binary
2. **Project Law** — `.codewhale/constitution.json`（protected_invariants/branch_policy/verification_policy）
3. **Current Request** — 使用者當前指令
4. **Live Evidence** — 工具實際回傳結果

上層永遠勝出，換模型不影響結構。

## 支援的 25 個 Provider

**開源模型（託管）**：DeepSeek（主推）、OpenRouter、HuggingFace、Moonshot/Kimi、Z.AI/GLM、MiniMax、Volcengine/Ark、NVIDIA NIM、Together、Fireworks、Novita、SiliconFlow、Arcee、小米 MiMo、DeepInfra、StepFun、AtlasCloud、萬接 Ark、通用 OpenAI-compatible

**開源模型（自架）**：vLLM、SGLang、Ollama（無需 API key）

**商業 Provider**：Anthropic（原生 Messages adapter）、OpenAI Codex

## 技術架構

- **規模**：738 個檔案、15 個 crate（Cargo workspace）
- **主要 Crates**：
  - `cli` — 命令列入口
  - `tui` — 主要 UI 引擎（最大 crate，含 config/tools/sandbox/fleet/commands）
  - `agent` — 代理核心
  - `config` — 設定管理
  - `core` — 核心邏輯
  - `mcp` — MCP 協議
  - `protocol` — 通訊協議（含 fleet/workroom）
  - `tools` — 工具系統
  - `whaleflow` — 工作流引擎
  - `execpolicy` — 執行策略/安全檢查
  - `hooks` — 鉤子系統
  - `secrets` — 秘密管理
  - `state` — 狀態持久化
  - `release` — 發佈工具

## 安裝方式

```bash
# npm（最簡單）
npm install -g codewhale

# Cargo（從原始碼）
cargo install codewhale-cli --locked
cargo install codewhale-tui --locked

# Docker
docker pull ghcr.io/hmbown/codewhale:latest

# Windows
scoop install codewhale

# Nix
nix run github:Hmbown/CodeWhale
```

## 首次使用

```bash
codewhale auth set --provider deepseek   # 或 anthropic/openrouter/ollama…
codewhale auth status
codewhale doctor
codewhale
```

常用 in-session 指令：`/provider`、`/model`、`/restore`、`/skills`、`/config`、`/goal`、`/task`

## 與 [[OpenClaude]] 的差異

| 面向 | OpenClaude | CodeWhale |
|------|------------|-----------|
| 本質 | Claude Code 的 fork（TypeScript） | 從零寫的獨立專案（Rust） |
| 法律風險 | Anthropic ToS 灰色地帶 | MIT 獨立授權，無爭議 |
| 架構 | 沿用 Claude Code 架構 | 自有嵌套憲法 + fleet 子代理 |
| 社群 | 小規模 | 多國貢獻者，DataWhale 生態 |

## 裁決

**值得關注但目前不需安裝**

- 日常主力維持官方 Claude Code — 生態、穩定性、更新速度都更好
- CodeWhale 適合：需要用 DeepSeek/GLM 等中國模型的場景、需要完全開源可控的環境、想要嵌套憲法機制的團隊
- 與 OpenClaude 不同，CodeWhale 沒有法律風險（獨立 Rust 實作，非 fork）
- 規模已達 738 檔案 / 3.5M tokens，是認真的大型專案

## 相關連結

- [[OpenClaude]] — Claude Code 的 TypeScript fork（另一個替代品）
- [[claude-code-design-guide]] — Claude Code 源碼架構分析
