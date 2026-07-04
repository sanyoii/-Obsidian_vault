---
source: "https://github.com/plastic-labs/honcho"
author: "plastic-labs"
stars: "5.8K"
clipped: 2026-07-04
tags:
  - "github/repo"
  - "ai-agent"
  - "agent-memory"
---

# honcho — 為 AI Agent 打造的「使用者建模」記憶基礎設施

> **plastic-labs/honcho** | ⭐ 5,753 | 🍴 690 | 📝 AGPL-3.0
> "Memory library for building stateful agents"

## 一句話說明

不是單純的向量記憶庫，而是以「peer（人／agent／群組／專案）」為核心單位、在背景持續**推理**出對話結論與人物側寫的記憶基礎設施，可用官方 Managed SaaS 或自架 FastAPI + Postgres/pgvector。

## 核心功能

- **Peer 模型**：workspace → peer（人或 agent，皆一等公民）→ session → message 多對多結構，支援多 agent/多 human 混合對話
- **背景推理（Deriver/Dreamer）**：非同步從對話萃取「conclusions」（歸納/演繹結論），非單純語義檢索
- **Dialectic Chat 介面**：`peer.chat()` 問 Honcho「它對某人了解什麼」的自然語言查詢，而非回傳原始 chunk
- **混合搜尋**：BM25 + 向量（LanceDB/turbopuffer）
- **多 LLM 後端可插拔**：Anthropic/Gemini/OpenAI，deriver 預設用 Gemini、dialectic 高階推理預設用 Anthropic
- **官方 Claude Code / MCP 整合**：`/plugin marketplace add plastic-labs/claude-honcho`

## 技術架構

```
Client SDK → FastAPI (routers) → CRUD 層
 ├─ dialectic/  對話式查詢推理
 ├─ deriver/    背景推理 worker（非同步）
 ├─ dreamer/    深度整理/圖譜建構
 ├─ llm/        多 LLM Provider 抽象
 └─ vector_store/（LanceDB/turbopuffer）
Postgres + pgvector（主資料庫）
```

與一般向量記憶庫的差異：一般方案是「存 embedding → 相似度檢索」被動儲存層；Honcho 多了背景 worker 持續把對話「消化」成結構化結論的主動推理層。

## 社群健康度

近 4 週 commit 7/4/17/7；71 open issues / 70 open PRs（中等維護壓力，非棄坑）；版本走 PyPI/NPM 而非 GitHub Releases。第三方評測（andrew.ooo/DEV.to）稱其在 LongMemEval/LoCoMo benchmark 表現業界前段，但架構「移動零件較多」，對比 Mem0「上手最快」，Honcho 走「推理深度換部署複雜度」路線。

## 安裝建議

⏳ **觀望** — 功能與已安裝的 claude-mem 高度重疊，且自架需要 Postgres+pgvector、背景 worker、至少一組 LLM API Key（非免費），Managed SaaS 則是付費 hosted service。在「單機個人知識庫 + 已有 claude-mem」現況下，導入會增加架構複雜度而非減少。若未來有「多 AI agent 互相協作需交叉建模對方」的具體需求（多 bot 群組、多人共用一個 agent），值得重新評估。

## 相關連結

- 與已安裝的 claude-mem（跨 session 記憶）定位高度重疊，需先釐清分工才有整合意義
