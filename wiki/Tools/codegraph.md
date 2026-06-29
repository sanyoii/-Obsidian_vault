---
title: Codegraph — 程式碼知識圖譜 MCP 使用指南
created: 2026-06-29
tags:
  - tools
  - mcp
  - codegraph
  - code-intelligence
---

# Codegraph — 程式碼知識圖譜 MCP 使用指南

## 是什麼

Codegraph 是一個 MCP server，對工作區的所有 symbol（函式、類別、變數、import 等）和它們之間的關係（呼叫、引用、繼承）建立 **SQLite 知識圖譜**。索引在背景透過 file watcher 持續更新（約 1 秒延遲），讀取查詢在亞毫秒完成。

## 目前環境狀態

> 以下數據來自 2026-06-29 查詢，僅供參考，實際數據會隨 codebase 變化。

| 指標 | 數值 |
|------|------|
| 已索引檔案 | 815 |
| 節點總數 | 13,103 |
| 邊總數 | 28,847 |
| 資料庫大小 | 35.36 MB |
| 後端 | node:sqlite（WAL + FTS5） |
| 語言分布 | Python 550、TSX 84、JS 74、TS 68、YAML 39 |

節點類型：function 4,659 / import 3,326 / variable 1,828 / method 1,751 / file 776 / constant 445 / class 249 / interface 61 / type_alias 8

---

## 核心原則

**寫 code 之前查 codegraph，不是寫的時候查。**

Codegraph 是預建索引——先查它理解脈絡，再動手改 code。寫 code 途中不要打斷流程去查。

**直接回答，不要委派。**

遇到「X 怎麼運作？」「誰呼叫了 Y？」這類問題，用 2-3 個 codegraph call 直接回答。不要 spawn 子 agent 去讀檔——codegraph 本身就是預建的搜尋索引，委派只會重做它已經做好的事。

---

## 7 個工具速查

| 工具 | 用途 | 典型問法 |
|------|------|---------|
| `codegraph_context` | **主力工具**。一次組合 search + node + callers + callees | 「這個功能怎麼運作？」「跟我說說 X 模組」 |
| `codegraph_search` | 按名稱搜尋 symbol | 「有沒有叫 XXHandler 的東西？」 |
| `codegraph_callers` | 誰呼叫了這個 | 「誰呼叫了 processOrder？」 |
| `codegraph_callees` | 這個呼叫了誰 | 「main 裡面呼叫了哪些函式？」 |
| `codegraph_impact` | 改了這個會影響哪裡（爆炸半徑） | 「改 UserService 會影響哪些地方？」 |
| `codegraph_node` | 看某個 symbol 的原始碼/簽名/docstring | 「讓我看 fetchData 的定義」 |
| `codegraph_explore` | 一次看多個相關 symbol 的原始碼（有上限） | 「我想瀏覽 src/pipeline/ 下的主要函式」 |
| `codegraph_files` | 某個目錄下有什麼檔案 | 「src/utils/ 裡面有哪些檔案？」 |
| `codegraph_status` | 索引狀態、大小、節點/邊數量 | 「codegraph 準備好了嗎？」 |

---

## 四大使用場景

### 場景一：Onboarding — 理解不熟的程式碼區域

**流程：**
```
codegraph_context（主題/模組名）
    ↓ 不夠清楚？
codegraph_explore（看更廣的 symbol 群）
    ↓ 需要某個 symbol 細節？
codegraph_node（看原始碼）
```

**範例：**
- 「`pipeline` 模組怎麼運作？」→ `codegraph_context`，一個 call 回答 80% 問題
- 想看更多相關函式 → `codegraph_explore`
- 想看某個函式的完整實作 → `codegraph_node` 或直接 `Read` 檔案

### 場景二：重構規劃 — 評估影響範圍

**流程：**
```
codegraph_search（找到目標 symbol）
    ↓
codegraph_callers（看誰依賴它）
    ↓
codegraph_impact（取得完整爆炸半徑）
```

**重點：** `codegraph_impact` 回傳的就是影響範圍，不需要自己手動走 caller chain。

### 場景三：Debug 追蹤 — 追呼叫鏈

**流程：**
```
codegraph_context（先理解出問題的區域）
    ↓
codegraph_callers / codegraph_callees（往上或往下追）
```

**範例：**
- 某個函式行為異常 → `codegraph_callers` 看誰傳了錯的參數
- 想知道某個入口函式最終觸發了什麼 → `codegraph_callees` 往下追

### 場景四：Code Review — 快速理解 PR 改了什麼

**流程：**
```
git diff 看改了哪些檔案/函式
    ↓
codegraph_context（理解被改動的區域）
    ↓
codegraph_impact（評估改動風險）
```

---

## 什麼時候「不」用 codegraph

| 場景 | 改用 |
|------|------|
| 確認某行程式碼的具體內容 | `Read` 直接讀檔 |
| 搜尋任意字串（不是 symbol 名稱） | `Grep` |
| 找特定檔名或路徑 | `Glob` |
| 大範圍跨檔 code review | spawn `Explore` agent 或直接讀檔 |
| codegraph 沒索引到的語言/檔案 | `Grep` + `Read` |

---

## 與其他工具的搭配

| 組合 | 用途 |
|------|------|
| codegraph → Read | codegraph 定位 symbol → Read 看完整上下文 |
| codegraph → Grep | codegraph 找到函式名 → Grep 搜字串層級的使用 |
| codegraph → Agent(Explore) | codegraph 給出大方向 → Explore agent 深入細節 |

---

## 與 codebase-memory-mcp 的定位差異

> 詳見 [[Github/repos/codebase-memory-mcp — 高效能程式碼知識圖譜 MCP 伺服器]]

| 面向 | codegraph（已安裝） | codebase-memory-mcp（觀望中） |
|------|---------------------|-------------------------------|
| 索引粒度 | symbol + edge + file | 同上 + Hybrid LSP 型別解析 |
| 查詢方式 | 7 個專用 API 工具 | Cypher 查詢語言子集 |
| 語意搜尋 | ❌ | ✅（Nomic 向量，11 信號融合） |
| 視覺化 | ❌ | ✅（3D graph UI） |
| 跨 repo | ❌ | ✅（CROSS_* edges） |
| 整合深度 | 深（已寫入 system instructions） | 需重新設定 |
| 安裝複雜度 | 已就緒 | 需下載 170MB 二進位 |

**結論：** 日常開發 codegraph 夠用。需要 Cypher 複雜查詢或跨 repo 分析時再考慮 codebase-memory-mcp。

---

## 常見陷阱

1. **不要用 codegraph 搜非 symbol 的字串** — 它是 symbol 索引，搜 `"error message text"` 這種東西找不到，用 Grep
2. **不要在寫 code 途中反覆查** — 先查完理解脈絡，再開始寫
3. **`codegraph_context` 能一次搞定的不要拆成多個 call** — 它內部已經組合了 search + node + callers + callees
4. **`codegraph_impact` 就是爆炸半徑** — 不需要自己手動從 callers 往上爬
