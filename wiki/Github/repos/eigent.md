---
source: "https://github.com/eigent-ai/eigent"
author:
stars: "14,139"
clipped: 2026-05-28
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/eigent-ai/eigent](https://github.com/eigent-ai/eigent) | ⭐ 14,139

---

## README

**Eigent** — The Open Source Cowork Desktop to Unlock Your Exceptional Productivity

開源桌面 App，多 Agent AI 協作平台。支援本地部署，內建 Developer / Browser / Document / Multi-Modal 四種 Agent 並行執行。

**安裝（快速）：**
```bash
git clone https://github.com/eigent-ai/eigent.git
cd eigent
npm install
npm run dev
```

**完整本地部署（FastAPI 後端）：**
```bash
cd backend
uv sync
uv run uvicorn main:api --port 5001
```

**需求：** Python 3.11–3.12、Node.js、npm

**支援模型：** OpenAI、Anthropic、Gemini、本地模型（Ollama / LM Studio / vLLM）

**MCP 整合：** Notion、Slack、Google Suite、程式碼執行

---

## 分析報告

### 這是什麼？

**Eigent** 是一個開源的**桌面端多 Agent AI 工作平台**，定位是「無需工程背景也能使用多 Agent 自動化的桌面工具」。

**技術棧：**

| 層面 | 技術 |
|------|------|
| 桌面框架 | Electron + React 18 + TypeScript + Vite |
| 後端 | FastAPI（Python 3.11-3.12）+ CAMEL-AI 多 Agent 框架 |
| 向量 DB | Qdrant（RAG 支援） |
| 套件管理 | uv（Python）+ npm（JS） |
| 可觀測性 | OpenTelemetry |

**Repo 規模：** 1,978 個檔案，3.4M tokens

---

### 核心功能

| 功能 | 說明 |
|------|------|
| **多 Agent 並行** | Developer / Browser / Document / Multi-Modal Agent 同時執行 |
| **MCP 整合** | Notion、Slack、Google Suite、程式碼執行等 |
| **Human-in-the-Loop** | 任務卡住時主動請求人工確認 |
| **本地部署** | 全程資料不離機器，完全私有 |
| **廣泛模型支援** | OpenAI、Anthropic、Gemini、Ollama、LM Studio、vLLM |

**典型用途範例：** 旅遊行程規劃、財務報表分析、SEO 審計、市場研究報告、PDF 文件處理

---

### 活躍度

| 指標 | 數值 |
|------|------|
| GitHub Stars | 14,139 |
| Forks | 1,672 |
| Open Issues | 190 |
| 版本 | v0.0.91 |
| 授權 | MIT |
| 最後更新 | 2026-05-28（今天，持續活躍） |
| 建立時間 | 2025-07-29 |

---

### 值得安裝嗎？

**有條件推薦。**

**值得試試，如果：**
- 想要視覺化的多 Agent 工作流介面（補充 Claude Code CLI 的 GUI 缺口）
- 需要讓不熟 CLI 的人（例如志煒）也能跑多 Agent 自動化任務
- 想嘗試 CAMEL-AI 框架的能力

**需要注意：**
- Python 3.11-3.12 嚴格版本要求，與 `C:\Python314`（3.14）**可能衝突**，需用 pyenv 或 uv 管理獨立環境
- Electron 桌面 App + FastAPI 後端，**資源佔用不輕**
- v0.0.91 仍早期，功能尚不穩定
- 你已有 Claude Code + 7-Agent 工廠工作流，**功能大量重疊**，主要價值在 GUI 層

**建議：** 用 `uv` 建立獨立 Python 3.12 環境，不影響現有環境，先試跑看看。
