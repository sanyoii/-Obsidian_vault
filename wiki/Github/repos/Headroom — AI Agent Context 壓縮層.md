---
source: "https://github.com/headroomlabs-ai/headroom"
author: "chopratejas (Tejas Chopra)"
stars: "51K+"
clipped: 2026-06-22
tags:
  - "github/repo"
  - "llm"
  - "token-compression"
  - "ai-agent"
  - "claude-code"
  - "context-management"
  - "proxy"
  - "installed"
---
# Headroom — AI Agent Context 壓縮層

> **出處：** [https://github.com/headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)
> "The context compression layer for AI agents — 60–95% fewer tokens, same answers."

---

## 一句話說明

幫 Claude Code / Cursor / Codex / LangChain 等 AI Agent 在送出 prompt 前壓縮所有內容（tool 輸出、log、RAG 結果、對話歷史），省錢不掉精度。本地執行，資料不外送。

---

## Repomix 深度分析（2026-06-22）

| 指標 | 數值 |
|------|------|
| 總檔案數 | 1,624 |
| 總 Tokens | 4,528,711 |
| 語言 | Python（主）+ Rust（`crates/headroom-core`）+ TypeScript（docs site + SDK） |
| Python 版本 | 3.10+ |
| 授權 | Apache 2.0 |
| PyPI | `headroom-ai` |
| npm | `headroom-ai` |
| Docker | `ghcr.io/chopratejas/headroom:latest` |
| HuggingFace 模型 | `chopratejas/kompress-v2-base` |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `crates/headroom-proxy/data/model_prices_and_context_window.json` | 394,816 | 8.7% |
| `headroom/proxy/handlers/openai.py` | 53,244 | 1.2% |
| `headroom/cli/wrap.py` | 44,685 | 1.0% |
| `headroom/proxy/server.py` | 39,610 | 0.9% |
| `headroom/dashboard/templates/dashboard.html` | 33,986 | 0.8% |

---

## 真實節省數字

| 工作負載 | 壓縮前 | 壓縮後 | 節省 |
|---------|--------|--------|------|
| Code search（100 筆）| 17,765 | 1,408 | **92%** |
| SRE 事件偵錯 | 65,694 | 5,118 | **92%** |
| GitHub issue 分類 | 54,174 | 14,761 | **73%** |
| Codebase 探索 | 78,502 | 41,254 | **47%** |

### Benchmark 準確率

| Benchmark | 類別 | Baseline | Headroom | 差異 |
|-----------|------|----------|----------|------|
| GSM8K | 數學 | 0.870 | 0.870 | ±0.000 |
| TruthfulQA | 事實 | 0.530 | 0.560 | +0.030 |
| SQuAD v2 | QA | — | 97% | 19% 壓縮 |
| BFCL | 工具呼叫 | — | 97% | 32% 壓縮 |

---

## 4 種使用方式

| 模式 | 指令 / API | 適合場景 |
|------|-----------|---------|
| **Agent wrap** | `headroom wrap claude\|codex\|cursor\|aider\|copilot` | 一行指令包住 coding agent |
| **Proxy** | `headroom proxy --port 8787` | 零程式碼改動，任何語言 |
| **Library** | `compress(messages)` — Python / TypeScript | inline 在自己的程式碼裡 |
| **MCP server** | `headroom mcp install` | 任何 MCP client |

---

## 核心架構

```
Agent（Claude Code / Cursor / Codex / LangChain / Agno / Strands…）
    │  prompt + tool 輸出 + log + RAG
    ▼
┌──────────────────────────────────────┐
│  Headroom（本地執行，資料不外送）      │
│  CacheAligner → ContentRouter → CCR   │
│    ├─ SmartCrusher   (JSON)           │
│    ├─ CodeCompressor (AST)            │
│    └─ Kompress-base  (prose, HF 模型) │
│  Cross-agent memory · learn · MCP     │
└──────────────────────────────────────┘
    │  壓縮後 prompt + 還原工具
    ▼
LLM provider（Anthropic / OpenAI / Bedrock / Vertex…）
```

### 壓縮流程

`Setup` → `Pre-Start` → `Post-Start` → `Input Received` → `Input Cached` → `Input Routed` → `Input Compressed` → `Input Remembered` → `Pre-Send` → `Post-Send` → `Response Received`

---

## 6 種壓縮演算法

| 演算法 | 針對內容 | 說明 |
|--------|---------|------|
| SmartCrusher | JSON 陣列 / 巢狀物件 | 統計分析 + 欄位偵測 + 離群值保護 |
| CodeCompressor | 程式碼（AST） | Python/JS/Go/Rust/Java/C++ |
| Kompress-base | 自然語言 | HuggingFace 自訓練模型 |
| CacheAligner | prefix 穩定 | 最大化 Anthropic/OpenAI KV cache 命中率 |
| IntelligentContext | 重要性評分 | context fitting with learned importance |
| Image 壓縮 | 圖片 | 40–90%（ML router） |

---

## CCR（Compressed Context Retrieval — 可逆壓縮）

壓縮後原始內容存在本地（SQLite / Redis / in-memory），LLM 可透過 `headroom_retrieve` MCP 工具隨時取回。Rust core 有 `ccr/backends/` 三種 backend：in_memory、sqlite、redis。

---

## Output Token 減少（回覆端壓縮）

不只壓縮輸入，還削減模型回覆的廢話：

- **Verbosity Steering** — 在 system prompt 末尾加「簡潔回覆」指示（不破壞 prompt cache）
- **Effort Routing** — tool result 後的 routine 回覆降低 thinking effort；新問題/錯誤維持全力
- `headroom learn --verbosity` — 從歷史 session 自動學習你的簡潔偏好
- `headroom output-savings` — 報告估計的 output token 節省量（含信賴區間）

```bash
export HEADROOM_OUTPUT_SHAPER=1
headroom proxy --port 8787
```

---

## 跨 Agent 共享記憶

- `SharedContext().put / .get` — 跨 Claude / Codex / Gemini 共用 memory store
- 自動去重、agent provenance 追蹤
- `headroom learn` — 挖掘失敗 session，自動寫修正到 `CLAUDE.md` / `AGENTS.md` / `GEMINI.md`

---

## Agent 相容矩陣

| Agent | 支援 | 備註 |
|-------|------|------|
| Claude Code | ✅ | `--memory` · `--code-graph` |
| Codex | ✅ | 共享 memory with Claude |
| Cursor | ✅ | 列印設定，貼一次 |
| Aider | ✅ | 啟動 proxy + 啟動 |
| Copilot CLI | ✅ | 啟動 proxy + 啟動 |
| OpenClaw | ✅ | ContextEngine plugin |
| Cortex Code | ✅ | 60–65% savings |

---

## 整合方式

| 你的環境 | 接入方式 |
|---------|---------|
| Python app | `compress(messages, model=…)` |
| TypeScript app | `await compress(messages, { model })` |
| Anthropic/OpenAI SDK | `withHeadroom(new Anthropic())` |
| Vercel AI SDK | `wrapLanguageModel({ model, middleware: headroomMiddleware() })` |
| LiteLLM | `litellm.callbacks = [HeadroomCallback()]` |
| LangChain | `HeadroomChatModel(your_llm)` |
| Agno | `HeadroomAgnoModel(your_model)` |
| Strands | [Strands guide](https://headroom-docs.vercel.app/docs/strands) |
| ASGI apps | `app.add_middleware(CompressionMiddleware)` |
| Multi-agent | `SharedContext().put / .get` |
| MCP clients | `headroom mcp install` |

---

## Rust 核心架構（`crates/`）

| Crate | 用途 |
|-------|------|
| `headroom-core` | 壓縮引擎：transforms pipeline、SmartCrusher、signals、tokenizer、relevance scoring、CCR backends |
| `headroom-proxy` | Rust HTTP proxy：SSE 串流解析、Bedrock/Vertex 原生支援、cache stabilization、observability（Prometheus） |
| `headroom-py` | PyO3 binding — Rust ↔ Python FFI |
| `headroom-parity` | Python vs Rust 壓縮結果比對工具 |

### Transform Pipeline（Rust）

```
ContentRouter
  ├─ SmartCrusher → JSON 統計壓縮
  ├─ DiffCompressor → diff/patch 壓縮
  ├─ LogCompressor → log 模式壓縮
  ├─ SearchCompressor → 搜尋結果壓縮
  └─ Pipeline Offloads → JSON/diff/log/search 各自的 offload 策略
```

---

## REALIGNMENT 架構重整（進行中）

repo 有一份嚴肅的 `REALIGNMENT/` 文件，記錄已發現的架構問題：

- **5 個 cache-killer bugs**：IntelligentContextManager 會破壞 Anthropic prompt cache
- **~10K LOC 過度設計**：ICM + scoring + relevance + rolling-window + progressive-summarizer
- **SSE parser 缺項**：缺 `thinking_delta`、`signature_delta`、`citations_delta`
- **Bedrock/Vertex parity 是假的**：LiteLLM 轉換會丟掉 `thinking`、`redacted_thinking` 等 block

重整分 9 階段（A–I），預估 8–13 週。

---

## 競品比較

| 工具 | 範圍 | 部署 | 本地 | 可逆 |
|------|------|------|:----:|:----:|
| **Headroom** | 全 context | Proxy / Library / MCP | ✅ | ✅ |
| RTK | CLI 輸出 | CLI wrapper | ✅ | ❌ |
| lean-ctx | CLI / MCP / rules | CLI wrapper / MCP | ✅ | ❌ |
| Compresr / Token Co. | 文字 | Hosted API | ❌ | ❌ |
| OpenAI Compaction | 對話歷史 | Provider-native | ❌ | ❌ |

---

## 安裝記錄（2026-06-22）

```bash
pip install "headroom-ai[all]"
```

### 使用情境

- **Library 模式**：`compress(messages)` — 用在 social-monitor / job-crawler 等 API 付費專案
- **Proxy 模式**：`headroom proxy --port 8787` — 零改動壓縮任何 OpenAI-compatible client
- **MCP 模式**：`headroom mcp install` — Claude Code 直接用 `headroom_compress` / `headroom_retrieve`

### 注意事項

- `headroom learn` 會自動寫入 `CLAUDE.md`，需注意與現有精細設定的衝突
- proxy 模式多一層 middleware，debug 時留意
- 訂閱制 Claude Code 不按 token 計費，wrap 模式效益主要在 context window 管理而非省錢

---

## 相關連結

- [[PixelRAG — 像素原生 RAG，截圖讓 AI 用視覺讀網頁]] — 另一個 AI agent context 工具
- 文件站：https://headroom-docs.vercel.app/docs
- Discord：https://discord.gg/yRmaUNpsPJ
- HF 模型：https://huggingface.co/chopratejas/kompress-v2-base
