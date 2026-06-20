---
tags: [AI, tools, proxy, claude-code, codex, free, llm, python]
date: 2026-06-19
status: evaluated
verdict: 免費用 Claude Code/Codex 介面接第三方模型的代理伺服器
---

# Free Claude Code 評估報告

> 評估日期：2026-06-19  
> 來源：https://github.com/Alishahryar1/free-claude-code  
> 語言：Python 3.14（uv 管理）  
> 授權：MIT

## 這是什麼？

**Free Claude Code（FCC）是一個本地代理伺服器**，讓你用官方 Claude Code CLI / Codex CLI / VS Code 擴展的原生介面，但把 API 請求轉發到第三方免費或便宜的模型供應商。

一句話定義：「不改 Claude Code/Codex 程式碼，透過中間人代理把 Anthropic API 請求轉給任何 LLM provider」

**跟 [[CodeWhale]] / [[OpenClaude]] 的根本區別**：FCC 不是替代品或 fork — 它保持官方 Claude Code 和 Codex 不動，只在中間攔截 API 流量做模型路由。

## 運作原理

```
Claude Code CLI ──→ FCC Proxy (localhost:8082) ──→ NVIDIA NIM / OpenRouter / Gemini / DeepSeek / Ollama...
Codex CLI ─────────→ FCC Proxy (/v1/responses) ──→ 同上
VS Code 擴展 ──────→ FCC Proxy ──────────────────→ 同上
```

- 攔截 Anthropic Messages API（`/v1/messages`、`/v1/models`）
- 攔截 OpenAI Responses API（`/v1/responses`）用於 Codex
- 在代理層做協議轉換（Anthropic → OpenAI Chat Completions 或 Anthropic-compat）
- 保持 streaming、tool use、thinking blocks 功能正常

## 支援的 17 個 Provider

| # | Provider | 類型 | 備註 |
|---|----------|------|------|
| 1 | NVIDIA NIM | 雲端 | 預設推薦，nemotron-3-super-120b 免費 |
| 2 | OpenRouter | 雲端 | 有免費模型可用 |
| 3 | Google AI Studio (Gemini) | 雲端 | 免費 tier 有額度限制 |
| 4 | DeepSeek | 雲端 | Anthropic-compatible endpoint |
| 5 | Mistral La Plateforme | 雲端 | Experiment plan 免費 |
| 6 | Mistral Codestral | 雲端 | 獨立 API key |
| 7 | OpenCode Zen | 雲端 | 整合多家模型的 gateway |
| 8 | OpenCode Go | 雲端 | 訂閱制 gateway |
| 9 | Wafer | 雲端 | Anthropic-compatible |
| 10 | Kimi (Moonshot) | 雲端 | Anthropic-compatible |
| 11 | Cerebras Inference | 雲端 | 超快推理 |
| 12 | Groq | 雲端 | 快速推理 |
| 13 | Fireworks AI | 雲端 | Anthropic-compatible |
| 14 | Z.ai (GLM) | 雲端 | Anthropic-compatible |
| 15 | LM Studio | 本地 | 需 tool-use 支援 |
| 16 | llama.cpp | 本地 | Anthropic-compat `/v1/messages` |
| 17 | Ollama | 本地 | 無需 API key |

## 核心特色

| 功能 | 說明 |
|------|------|
| **Per-tier 路由** | Opus/Sonnet/Haiku/fallback 各走不同 provider |
| **Admin UI** | 本地 web 介面管理設定（`/admin`，loopback-only） |
| **fcc-claude 啟動器** | 自動注入 env vars，每次讀取最新 port/token |
| **fcc-codex 啟動器** | 注入 ephemeral provider config，生成本地 model catalog |
| **Model Picker** | Claude Code 的 `/model` 和 Codex 的 `/model` 原生選擇器都可用 |
| **Auto-compaction** | 預設設 `CLAUDE_CODE_AUTO_COMPACT_WINDOW=190000` |
| **Bot 整合** | 可選 Discord / Telegram bot wrapper |
| **語音轉寫** | 可選 local Whisper 或 NVIDIA NIM |

## 安裝方式

```powershell
# Windows
irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1" | iex
```

```bash
# macOS/Linux
curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh
```

安裝器會同時安裝 Claude Code 和 Codex（如果缺少的話）。

## 使用流程

```bash
fcc-server     # 1. 啟動代理伺服器
               # 2. 開 Admin UI (http://127.0.0.1:8082/admin) 設定 provider + API key
fcc-claude     # 3. 用 Claude Code（透過代理）
fcc-codex      # 3. 或用 Codex（透過代理）
```

## 技術架構

- **規模**：358 個檔案、735K tokens
- **語言**：Python 3.14 + uv
- **框架**：FastAPI (Uvicorn)
- **主要模組**：
  - `api/` — 路由、請求管線、模型路由、Admin UI
  - `cli/` — fcc-claude/fcc-codex 啟動器
  - `core/` — Anthropic SSE 處理、協議轉換、streaming
  - `providers/` — 17 個 provider 的 client 實作 + transport 層
  - `config/` — 設定管理、provider catalog
  - `smoke/` + `tests/` — 測試套件

## 與其他工具的比較

| 面向 | Free Claude Code | [[CodeWhale]] | [[OpenClaude]] |
|------|-----------------|---------------|----------------|
| 本質 | API 代理（不動原始 CLI） | 獨立重寫（Rust） | Claude Code fork（TS） |
| 需要原版 Claude Code | 是 | 否 | 否 |
| 需要 Anthropic 帳號 | 否（代理繞過登入） | 否 | 否 |
| 法律風險 | 低（只做 API 代理） | 無（獨立 MIT） | 中（fork 灰色地帶） |
| 支援 Codex | 是 | 否 | 否 |
| 模型數量 | 17 providers | 25 providers | 任意 OpenAI-compat |

## 裁決

**有趣但目前不需安裝**

- 已有 Claude Max 訂閱，不需省 API 費用
- 適合場景：想用 Claude Code 的 UI/工具系統但用免費或便宜模型、需要用 NVIDIA NIM 免費額度、需要在 Claude Code 和 Codex 之間統一模型路由
- 注意：代理層會增加延遲，且非官方用法可能隨 Claude Code 更新而失效
- 優點：保持官方 Claude Code 不動，只做流量轉發，升級不受影響

## 相關連結

- [[CodeWhale]] — 獨立重寫的開源 Terminal Coding Agent（Rust）
- [[OpenClaude]] — Claude Code 的 TypeScript fork
