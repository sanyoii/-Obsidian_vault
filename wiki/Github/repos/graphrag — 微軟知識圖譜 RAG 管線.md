---
source: "https://github.com/microsoft/graphrag"
author: "microsoft (Microsoft Research)"
stars: "34.7K"
clipped: 2026-07-21
tags:
  - "github/repo"
  - "ai-ml/rag"
  - "knowledge-graph"
---

# graphrag — 微軟知識圖譜 RAG 管線

> **microsoft/graphrag** | ⭐ 34.7K | 🍴 3.7K | 📝 MIT
> "A modular graph-based Retrieval-Augmented Generation (RAG) system"

## 一句話說明

用 LLM 把非結構化文字抽成知識圖譜（entity/relationship/claim），再用 Leiden 階層分群產出社群摘要，讓 RAG 能回答「跨文件多跳推理」與「整個語料庫的宏觀問題」——傳統 top-k 向量 RAG 做不到的兩類問題。Microsoft Research 方法論展示品，非官方支援產品。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 34.7K / 3.7K |
| 主要語言 | Python（3.10–3.12） |
| 授權 | MIT |
| 建立 | 2024-03-27 |
| Release 節奏 | ~1-2 月一版（v3.1.x，semversioner） |
| 首頁 | microsoft.github.io/graphrag |

## 核心功能

- **TextUnits**：語料切片（預設 1200 token），輸出引用的細粒度依據
- **Entities / Relationships / Claims**：LLM 從 TextUnits 抽的圖譜三要素
- **Communities**：Hierarchical Leiden 分群的階層社群
- **Community Reports**：逐社群 LLM 摘要，支撐全局問題
- **Prompt auto-tuning**：官方明說開箱 prompts 效果可能不佳，強烈建議用自家資料跑 tuning

## 技術架構

Monorepo（uv workspace）8 個 PyPI 套件：`graphrag` 主套件 + common/input/chunking/llm/storage/cache/vectors 抽象層，全 factory pattern。Index 與 Query 完全分離（parquet tables + vector store 交接）。

```
input docs → chunk → TextUnits → extract_graph(LLM) → Entities+Relationships
                                        ↓
                          Hierarchical Leiden → Communities
                                        ↓
                          community reports (LLM per community)
                                        ↓
              parquet tables + vector store (lancedb/azure/cosmos)
                                        ↓
        query: basic | local | drift | global (map-reduce)
```

（ASCII 示意，非 Mermaid）

- **4 種查詢**：`basic` 純向量 baseline／`local` entity 中心鄰域混合／`global` community reports map-reduce（最貴，可動態選社群）／`drift` community primer 展開追問迭代
- **FastGraphRAG**：NLP 名詞共現取代 LLM 抽圖，省 ~75% 索引成本（圖較噪）
- **LLM 層走 LiteLLM**（100+ 模型）+ middleware（cache/retry/rate-limit）；`GRAPHRAG_API_KEY` + settings.yaml
- CLI：`init` / `index` / `update`（增量）/ `prompt-tune` / `query`

## 已知取捨（社群共識）

- **索引成本是頭號痛點**：官方 Discussion #440 收集帳單災情；文件開頭自帶成本警告「start small」。極端案例：5GB 法律語料 $33K
- global 查詢成本 = 社群數 × token；增量更新弱（LightRAG 對比文常點名）
- 生態回應：微軟自推 LazyGraphRAG（宣稱索引成本降至 0.1%）；替代品 LightRAG / nano-graphrag
- 適用：企業私有文件問答、法律語料、需全局摘要的大語料、多跳推理；**簡單 top-k 場景公認不值得上**

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **gbrain** | 直接競品。gbrain（Gemini embedding）≈ basic search 等級；graphrag 增量在全局問題與多跳推理，但個人 wiki 語料規模用不到 |
| **三層檢索分工** | Obsidian 導航 / gbrain 語意 / NotebookLM 深答已覆蓋「全局摘要」情境 |
| **Automation** | 索引成本模型不利小語料反覆重建 |

## 安裝建議

**⏳ 觀望** — 方法論值得懂（社群分群+分層摘要），個人知識庫規模用不到。

- **升級條件**：①gbrain 出現「全局主題問題答不好」實際痛點（例：跨 47 支課程影片問綜合架構失敗）②LazyGraphRAG 正式併入且索引成本實測可忽略 → ✅
- **放棄條件**：LightRAG/LazyGraphRAG 確立為事實標準、graphrag 轉維護模式 → ❌ 直接看後繼者

## 相關連結

- [[gbrain 個人知識腦]] — 現行語意檢索層（basic search 等級已夠用）
- [[Github/repos/graphiti — 為 AI Agent 打造的即時時序知識圖譜框架|graphiti]] — 同為知識圖譜但定位 agent 記憶（時序），非語料 RAG
