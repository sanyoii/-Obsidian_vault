---
source: "https://github.com/Beever-AI/beever-atlas"
author: "Beever-AI (alan5543, jhkchan, thomas-chong)"
stars: "385"
clipped: 2026-06-22
tags:
  - "github/repo"
  - "knowledge-base"
  - "wiki"
  - "rag"
  - "mcp"
  - "slack-bot"
  - "discord-bot"
  - "google-adk"
  - "python"
---
# Beever Atlas — 聊天頻道自動生成 Wiki 知識庫

> **出處：** [https://github.com/Beever-AI/beever-atlas](https://github.com/Beever-AI/beever-atlas) | ⭐ 385
> "Turn your team's Slack, Discord, Teams & Mattermost chats into a self-maintaining wiki — automatically."

---

## 一句話說明

把團隊在 Slack / Discord / Microsoft Teams / Mattermost 上的聊天記錄，自動萃取成自維護的 Wiki 知識庫 — 提取原子事實、去重、聚類成主題頁面、建立實體關係圖譜、附帶引用回原始訊息。可透過 Dashboard 或 MCP 向 Claude Code / Cursor 提問。

---

## 核心概念：Wiki-First RAG

靈感來自 Andrej Karpathy 的觀察：LLM 擅長處理 Wiki 式結構化知識，而非原始聊天記錄。

傳統 RAG：查詢 → 檢索原始訊息片段 → 餵給 LLM
Beever Atlas：聊天 → **持續蒸餾成結構化 Wiki** → 查詢時檢索乾淨知識

好處：更少幻覺、可追溯引用、可獨立瀏覽的 Wiki、查詢時推理成本更低。

---

## 核心功能

- **多平台接入**：Slack / Discord / Teams / Mattermost，一個 bot 連接所有工作區
- **6 階段 ADK 記憶管線**：訊息 → 原子事實 → 實體 → 關係 → 去重 → 聚類
- **雙記憶系統**：
  - 3 層語意存儲（channel → topic → atomic fact）+ Weaviate 向量搜尋
  - 知識圖譜（Neo4j）— 人物/決策/專案的關係
- **自動生成 Wiki**：每個頻道一個 Wiki — 概覽、主題、人物、決策、FAQ、詞彙表、時間線
- **QA Agent**：自然語言提問，SSE 串流，智慧路由（語意 or 圖譜搜尋）
- **MCP Server**：28 個工具，Claude Code / Cursor 直接查詢知識庫
- **Wiki 漂移偵測**：檢測 Wiki 與新訊息的不一致
- **媒體處理**：音訊轉錄、文件摘要

---

## 技術架構

```
聊天平台（Slack/Discord/Teams/Mattermost）
    │  Bot bridge (TypeScript)
    ▼
┌──────────────────────────────────────┐
│  Backend (Python / FastAPI / Google ADK) │
│  ├─ Ingestion Pipeline (6-stage)     │
│  ├─ Wiki Compiler + Maintainer       │
│  ├─ QA Agent (smart router)          │
│  └─ MCP Server (28 tools)            │
├──────────────────────────────────────┤
│  Weaviate (向量) · Neo4j (圖譜)       │
│  MongoDB (儲存) · Redis (快取)        │
├──────────────────────────────────────┤
│  Web Dashboard (React + TypeScript)   │
└──────────────────────────────────────┘
```

| 層次 | 技術 |
|------|------|
| Bot | TypeScript（多平台 bridge） |
| Backend | Python / FastAPI / Google ADK（16 個 agent） |
| LLM | Gemini（預設）/ OpenAI / Anthropic / Mistral / DeepSeek / Ollama |
| Embeddings | Jina v4（預設）/ OpenAI / Cohere / Voyage / Ollama |
| 搜尋 | Weaviate + Neo4j |
| 儲存 | MongoDB + Redis |
| 前端 | React + TypeScript |
| 部署 | Docker Compose |

---

## Repomix 分析（1,310 檔 / 2.87M tokens）

| 檔案 | Tokens | 說明 |
|------|--------|------|
| `wiki/compiler.py` | 59,050 | Wiki 編譯引擎核心 |
| `bot/src/bridge.ts` | 34,790 | 多平台 Bot 橋接 |
| `api/ask.py` | 25,327 | QA Agent API |
| `services/wiki_maintainer.py` | 24,803 | Wiki 自動維護 |
| `stores/mongodb_store.py` | 24,406 | MongoDB 資料層 |

---

## 部署

```bash
git clone https://github.com/beever-ai/beever-atlas.git
cd beever-atlas
./atlas  # 一鍵安裝（Docker Compose）
```

需要：Docker + `GOOGLE_API_KEY`（Gemini）+ `JINA_API_KEY`（embeddings）。

---

## 安裝建議

⏳ **觀望但值得關注** — 聊天自動生成 Wiki 的概念非常好，與 Obsidian 知識庫工作流高度契合。但需要 Docker + 4 個 data store，部署成本高；目前沒有團隊 Slack/Discord 需處理。

**最值得借鑑的設計：** Wiki 編譯器（compiler.py）和漂移偵測（wiki_drift_comparator.py）的架構，可參考用於 Obsidian 知識庫自動化。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：團隊實際出現需要處理的 Slack/Discord/Teams/Mattermost 聊天記錄，且能承擔 Docker + 4 個 data store 的部署成本
- **放棄條件**（→ ❌ 不裝）：等待 6 個月以上仍無團隊聊天頻道需要處理，僅保留 compiler.py／wiki_drift_comparator.py 的設計參考價值

---

## 相關連結

- 文件站：[docs.beever.ai/atlas](https://docs.beever.ai/atlas)
- Discord：[discord.gg/VshBCUUX](https://discord.gg/VshBCUUX)
- MCP on Glama：[glama.ai/mcp/servers/Beever-AI/beever-atlas](https://glama.ai/mcp/servers/Beever-AI/beever-atlas)
- 授權：Apache 2.0
