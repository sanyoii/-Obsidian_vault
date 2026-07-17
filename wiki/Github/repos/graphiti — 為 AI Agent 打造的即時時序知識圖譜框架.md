---
source: "https://github.com/getzep/graphiti"
author: "getzep"
stars: "28.4K"
clipped: 2026-07-04
tags:
  - "github/repo"
  - "ai-agent"
  - "knowledge-graph"
---

# graphiti — 為 AI Agent 打造的即時時序知識圖譜框架

> **getzep/graphiti** | ⭐ 28,366 | 🍴 2,845 | 📝 Apache 2.0
> "Build Real-Time Knowledge Graphs for AI Agents"

## 一句話說明

Zep 團隊開源的 Python 框架，建構「時序情境圖譜」——不同於傳統靜態知識圖譜或向量 RAG，每個事實都帶生效時間窗，資料可增量更新（不需整批重算），適合需要持續演化記憶的 AI Agent。

## 核心功能

- **時序事實管理**：Entity-Relationship-Entity 三元組帶 valid-at/invalid-at 時間窗；資訊變動時舊事實標記失效而非刪除
- **Episode 溯源**：所有衍生實體/關係可追溯回原始輸入資料
- **可規範 + 可學習的本體**：可用 Pydantic 預定義 entity/edge types，也可讓結構自動浮現
- **增量圖譜建構**：新資料即時整合，無需批次重算
- **混合檢索**：語意 embedding + BM25 關鍵字 + 圖遍歷三路合一
- **多圖資料庫後端**：Neo4j（主推）、FalkorDB、Amazon Neptune、Kuzu（已棄用）

## 技術架構

```
graphiti.py
 ├─ llm_client/（OpenAI/Anthropic/Gemini/Groq/Azure/GLiNER2）
 ├─ embedder/（OpenAI/Gemini/Voyage/Azure）
 ├─ search/（混合檢索核心邏輯）
 ├─ driver/（Neo4j/FalkorDB/Neptune/Kuzu，可插拔）
 ├─ mcp_server/（獨立 MCP Server，供 Claude/Cursor 整合）
 └─ server/（FastAPI REST 服務）
```

與傳統 GraphRAG 的差異：GraphRAG 走批次處理、靜態實體聚類；Graphiti 走連續增量更新、顯式雙時序追蹤、自動事實失效標記，查詢延遲通常亞秒級。

## 社群健康度

近 4 週 commit [24,4,2,1]，近兩週趨緩；253 open issues / 159 open PRs（相對 2.8 萬星，待處理量不低）；v0.29.x 系列快速連發 patch。YouTube 教學生態成熟（Zep 官方 + Cole Medin 等第三方，最高單支 11 萬觀看，含與 GraphRAG/LightRAG 的比較內容）。

官方揭露限制：不支援 Structured Output 的小模型容易 schema 錯誤；Kuzu driver 已棄用；需外部圖資料庫，非開箱即用。

## 安裝建議

⏳ **觀望** — 核心運作硬性要求 Neo4j/FalkorDB/Neptune 三選一，非輕量 pip install 可用；且與現有 gbrain（靜態語意搜尋）功能定位重疊但機制不同（時序失效 vs 靜態索引），貿然疊加增加架構複雜度而非互補。`mcp_server/` 是唯一零開發可掛進 Claude Code 的低成本切入點，若未來有「記憶隨時間變化」的明確需求（如追蹤復健狀況/職缺市場動態），值得優先評估。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：出現「記憶隨時間變化」的明確需求（如追蹤復健狀況演變、職缺市場動態）
- **放棄條件**（→ ❌ 不裝）：gbrain 靜態語意搜尋持續足夠、無時序記憶需求 → 不裝

## 相關連結

- [[Github/repos/HKUDSLightRAG — 知識圖譜增強 RAG 框架]] — 同屬知識圖譜 RAG 類，可對照比較
