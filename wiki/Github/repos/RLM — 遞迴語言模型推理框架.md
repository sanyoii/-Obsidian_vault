---
source: "https://github.com/alexzhang13/rlm"
author: "alexzhang13 (Alex L. Zhang, MIT OASYS Lab)"
stars: "5K+"
clipped: 2026-06-22
tags:
  - "github/repo"
  - "machine-learning"
  - "ai-agent"
  - "recursive-reasoning"
  - "llm-inference"
  - "python"
---
# RLM — 遞迴語言模型推理框架

> **出處：** [https://github.com/alexzhang13/rlm](https://github.com/alexzhang13/rlm) | ⭐ 5K+
> "General plug-and-play inference library for Recursive Language Models (RLMs), supporting various sandboxes."

---

## 一句話說明

MIT OASYS Lab 開發的遞迴語言模型（RLM）推理引擎——讓 LLM 在 REPL 環境中程式化地分解問題、遞迴呼叫自己處理近乎無限長的 context，用 `rlm.completion()` 取代 `llm.completion()`。含推理引擎 + RL 訓練環境。

**論文：** [Recursive Language Models (ICML)](https://arxiv.org/abs/2512.24601)

---

## 核心概念

傳統 LLM 呼叫是一次性的 `llm.completion(prompt)` — context 有上限。RLM 的做法：
1. 把 context/prompt 當作 REPL 裡的**變數**
2. LLM 在 REPL 中執行程式碼，可以**遞迴呼叫自己**（sub-RLM calls）
3. 每個子呼叫處理一部分 context，結果回傳給父呼叫
4. 理論上可處理**無限長** context

```python
from rlm import RLM

rlm = RLM(backend="openai", backend_kwargs={"model_name": "gpt-5-nano"})
result = rlm.completion("Print me the first 100 powers of two.")
```

---

## Repomix 分析（166 檔 / 226K tokens）

| 指標 | 數值 |
|------|------|
| 總檔案數 | 166 |
| 總 Tokens | 226,486 |
| 主要語言 | Python（602K chars）|
| PyPI | `pip install rlms` |
| Python | 3.11+ |
| 授權 | MIT |

### Top 5 大檔

| 檔案 | Tokens | 說明 |
|------|--------|------|
| `rlm/environments/ipython_repl.py` | 14,041 | IPython REPL 環境 |
| `tests/test_ipython_repl.py` | 8,682 | IPython 測試 |
| `rlm/core/rlm.py` | 8,018 | 核心遞迴引擎 |
| `rlm/environments/local_repl.py` | 4,860 | 本地 exec REPL |
| `rlm/environments/daytona_repl.py` | 4,849 | Daytona 雲端沙箱 |

---

## 技術架構

```
rlm.completion(prompt)
    │
    ▼
┌────────────────────────────────────┐
│  RLM Core (rlm/core/)              │
│  rlm.py · lm_handler · comms_utils │
├────────────────────────────────────┤
│  Clients (rlm/clients/)            │
│  OpenAI · Anthropic · Gemini ·     │
│  Azure · Portkey · vLLM            │
├────────────────────────────────────┤
│  REPL Environments (rlm/environments/) │
│  local · ipython · docker · modal ·   │
│  prime · daytona · e2b                 │
├────────────────────────────────────┤
│  Training (training/)              │
│  verifiers + prime-rl（RL 訓練）    │
├────────────────────────────────────┤
│  Visualizer (visualizer/)          │
│  Next.js + shadcn/ui 軌跡檢視      │
└────────────────────────────────────┘
```

---

## 7 種 REPL 環境

| 環境 | 類型 | 說明 |
|------|------|------|
| `local` | 非隔離（預設） | 同 process exec，共享 venv |
| `ipython` | 非隔離 | IPython session，可 subprocess 隔離 |
| `docker` | 隔離 | Docker 容器，`python:3.11-slim` |
| `modal` | 雲端隔離 | Modal Sandboxes |
| `prime` | 雲端隔離 | Prime Intellect Sandboxes（beta） |
| `daytona` | 雲端隔離 | Daytona Sandboxes |
| `e2b` | 雲端隔離 | E2B Sandboxes |

---

## 進階功能

- **RL 訓練**：基於 `verifiers` + `prime-rl`，可訓練自己的 RLM 模型
- **Compaction**：對話歷史壓縮，減少遞迴呼叫的 token 消耗
- **自訂工具**：在 REPL 中註冊 Python 函式作為可用工具
- **批次查詢**：`rlm_query_batched` 同時處理多個問題
- **軌跡 Logger**：`RLMLogger(log_dir="./logs")` 記錄完整遞迴 trace

---

## RLMs in the Wild（生態採用）

- **DSPy** — `DSPy.RLM` 整合
- **Prime Intellect** — 稱 RLM 為「2026 的範式」
- **Symbolica** — 用 REPL Agent 達到 SotA ARC-AGI-2 成績
- **Google Cloud ADK** — 在 ADK 中整合 RLM
- **Daytona** — 提供 RLM 建構指南
- **context-labs/HALO** — RLM-based 自動 Agent 優化迴圈

---

## 安裝建議

⏳ **觀望** — 概念前沿（遞迴自我呼叫解決超長 context），生態快速擴張，但：
- v0.1.2 早期版本，46 個 open PR 表示 API 仍在變動
- 需要 API key 按 token 付費，遞迴呼叫會放大成本
- 適合持續關注，等穩定後考慮整合

---

## 相關連結

- 論文：[arxiv.org/abs/2512.24601](https://arxiv.org/abs/2512.24601)
- Blog：[alexzhang13.github.io/blog/2025/rlm/](https://alexzhang13.github.io/blog/2025/rlm/)
- 文件站：[alexzhang13.github.io/rlm/](https://alexzhang13.github.io/rlm/)
- 精簡版：[alexzhang13/rlm-minimal](https://github.com/alexzhang13/rlm-minimal)
