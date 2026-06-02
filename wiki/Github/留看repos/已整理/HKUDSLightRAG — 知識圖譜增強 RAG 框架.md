---
title: "HKUDS/LightRAG: 以知識圖譜為核心的 RAG 框架"
source: "https://github.com/HKUDS/LightRAG"
author: "HKUDS"
created: 2026-05-30
description: "在向量搜尋之上疊加實體-關係圖的 RAG 框架，支援五種查詢模式（naive/local/global/hybrid/mix），適合複雜關係與跨文件推理，可接 Gemini embedding。"
tags:
  - clippings
  - rag
  - knowledge-graph
  - llm
  - python
verdict: "有條件值得（補充 gbrain 的專題知識深度問答，不取代）"
---

## 一句話說明

以知識圖譜為核心的 RAG 框架——匯入文件時自動用 LLM 抽取實體與關係，建立知識圖譜，查詢時同時走向量搜尋和圖譜溯源兩條路。

## 五種查詢模式

| 模式 | 說明 |
|------|------|
| naive | 純向量搜尋（傳統 RAG） |
| local | 聚焦特定實體的上下文 |
| global | 社群摘要式廣泛知識 |
| hybrid | local + global 合併 |
| mix | KG + 向量整合（官方推薦） |

## 技術架構

### 流程

```
文件 → 分段（chunker）→ LLM 抽取實體/關係 → 知識圖譜
                     → embedding             → 向量索引
查詢時雙路並行，LLM 合併生成答案
```

### 儲存後端（各層獨立可替換）

| 儲存類型 | 可選後端 |
|---|---|
| Graph | NetworkX（本機）、Neo4j、PostgreSQL、MongoDB、Memgraph、OpenSearch |
| Vector | NanoVectorDB（本機）、Faiss、Milvus、Qdrant、Redis、PostgreSQL（pgvector） |
| KV | JSON 檔案（本機）、PostgreSQL、Redis、MongoDB |

### 支援的 LLM / Embedding

OpenAI、Gemini、Ollama、Anthropic Claude、Azure OpenAI、Bedrock、HuggingFace、LiteLLM、vLLM…

## 安裝

```bash
pip install lightrag-hku          # 純 SDK
pip install lightrag-hku[api]     # 含 FastAPI + Web UI
```

## 最簡使用

```python
import asyncio
from lightrag import LightRAG, QueryParam
from lightrag.llm.gemini import gemini_complete, gemini_embed  # 支援 Gemini

async def main():
    rag = LightRAG(
        working_dir="./rag_storage",
        llm_model_func=gemini_complete,
        embedding_func=gemini_embed
    )
    await rag.initialize_storages()
    await rag.ainsert("文件內容...")
    result = await rag.aquery("你的問題", param=QueryParam(mode="mix", top_k=60))
    print(result)
    await rag.finalize_storages()

asyncio.run(main())
```

## 與傳統 RAG 的差異

| 面向 | 傳統 RAG | LightRAG |
|------|---------|---------|
| 知識表示 | 純向量 | 向量 + 知識圖譜 |
| 跨文件推理 | 弱（靠相似度） | 強（圖結構顯式捕捉關聯） |
| 匯入成本 | 低 | 高（需額外 LLM 抽取實體） |
| 適合問題 | 事實查詢 | 複雜關係、因果、「A 和 B 的關係？」 |

## 結論：有條件值得，補充 gbrain 的專題問答

**不建議全面替換 gbrain：**
- gbrain 的 Obsidian inbox 整合、43 個 skills、即時捕捉流程，LightRAG 完全沒有
- 118 頁筆記全量匯入需大量 LLM API 費用（每篇都要抽取實體）

**建議做法：**
1. 先挑 2–3 份高關聯性主題文件（紫微斗數、歐洲旅遊）做實驗
2. 用本機 JSON 儲存（NanoVectorDB + NetworkX），零基礎設施成本
3. 接 Gemini embedding（現有工具鏈），測試 mix 模式查詢品質
4. 若效果好：LightRAG 負責「高關聯性專題知識」，gbrain 繼續負責「日常筆記捕捉」

*相關：[[gbrain 個人知識腦]] · [[Chandra OCR 2]]*
