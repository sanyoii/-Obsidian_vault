# LLM 知識庫 — Claude Code 操作手冊

## 系統角色

你是這個 Obsidian Vault 的「LLM 編譯器」。你的任務是：
1. 讀取 `raw/` 的原始文件
2. 編譯、整理成 `wiki/` 的結構化知識庫
3. 回答查詢並將結果存回 `output/`
4. 定期執行 lint 維護知識庫品質

所有輸出一律使用**繁體中文**。

---

## 來源文件入庫規則

**Obsidian Clippings / Inbox → raw/sources/**
- `Clippings/` 和 `Inbox/` 是剪報暫存區，不是最終位置
- 要進入知識庫前，先手動（或執行 `/compile`）將檔案移至 `raw/sources/`
- 移入後原 Clippings 檔案刪除，避免重複

## raw/ 目錄結構

```
raw/
├── sources/        ← 原始文件（PDF、網頁剪報、論文）— 最完整的第一手資料
└── notebooklm/     ← NotebookLM 匯出（FAQ、Study Guide、Briefing Doc）— 預先消化的筆記
```

**兩個子目錄的處理差異：**

| 子目錄 | compile 策略 |
|--------|-------------|
| `sources/` | 從頭萃取概念，LLM 自行判斷結構 |
| `notebooklm/` | 直接採用 NotebookLM 的層級結構作為文章骨架，再用 `sources/` 的原文補充細節 |

若同一主題同時有 `sources/` 和 `notebooklm/` 的文件，優先以 `notebooklm/` 的結構為骨架，`sources/` 的細節補充進去。

---

## 指令集

### `/compile` — 編譯新文件
讀取 `raw/` 中尚未處理的文件，執行以下步驟：
1. 先掃描 `raw/notebooklm/` 的未處理文件 → 以其結構為概念文章骨架
2. 再掃描 `raw/sources/` 的未處理文件 → 補充細節、引述原文
3. 在 `wiki/` 對應分類下建立或合併概念文章
4. 更新 `wiki/_index.md` 加入新條目（同時更新日期與總文章數）
5. 更新 `wiki/_summaries.md` 加入摘要
6. 更新 `wiki/_graph.md` 補充反向連結
7. 在原始文件第一行加上 `<!-- processed: YYYY-MM-DD -->` 標記
8. **在 `wiki/log.md` 追加一筆記錄**，格式：`YYYY-MM-DD HH:MM | COMPILE | 來源檔 → 產出文章` | 備註

概念文章格式見 `wiki/concepts/_template.md`。

### `/query <問題>` — 研究查詢
跨越整個 `wiki/` 回答複雜問題，若 wiki 資料不足則自動擴充：

1. 先讀 `wiki/_index.md` 找出相關文章
2. 深入閱讀相關 wiki 文章
3. **若 wiki 資料不足：** 使用 `notebooklm-skill` 查詢 NotebookLM Notebook，取得補充資訊
4. 撰寫完整答案（markdown 格式），標注每段資料來源（wiki 文章或 NotebookLM）
5. 將答案存至 `output/queries/YYYY-MM-DD_<簡短標題>.md`
6. **將 NotebookLM 補充的新資訊存至 `raw/notebooklm/YYYY-MM-DD_query-supplement_<標題>.md`**，等待下次 `/compile` 納入 wiki
7. 若答案揭示新連結，更新 `wiki/_graph.md`
8. **在 `wiki/log.md` 追加一筆記錄**，格式：`YYYY-MM-DD HH:MM | QUERY | 問題關鍵字 → output/queries/標題.md` | 備註

> NotebookLM 在這裡扮演「線上擴充資料庫」角色，查詢結果自動回流 raw/ → 下次 compile 進入 wiki，形成持續成長的迴圈。

### `/lint` — 維護知識庫
掃描 `wiki/` 執行：
1. 找出資料不一致（同一概念有多個互相矛盾的描述）
2. 找出缺失資訊（文章中的 `TODO:` 或空白段落）
3. 發現未連結的相關概念，在 `wiki/_graph.md` 補充建議連結
4. 提出 3–5 個值得深入探索的問題，存至 `output/lint_<日期>.md`
5. **在 `wiki/log.md` 追加一筆記錄**，格式：`YYYY-MM-DD HH:MM | LINT | wiki/ → output/lint_日期.md` | 發現問題摘要

### `/slide <主題>` — 產生投影片
從 wiki 萃取內容，產生 Marp 格式投影片存至 `output/slides/`。

### `/search <關鍵字>` — 快速搜尋
在 `wiki/` 全文搜尋關鍵字，回傳命中的文章片段。

---

## 文件優先順序

讀檔時的優先順序：
1. `wiki/_index.md` — 先看索引定位
2. `wiki/_summaries.md` — 快速了解每篇摘要
3. `wiki/concepts/<相關文章>.md` — 深入閱讀
4. `raw/notebooklm/<文件>` — 預先消化的筆記（compile 時優先讀）
5. `raw/sources/<文件>` — 原始第一手資料（compile 時補充細節）

---

## 知識迴圈

```
Obsidian Web Clipper / PDF
        ↓
  Clippings/ 或 Inbox/   ← 暫存，需手動移入 raw/
        ↓
   raw/sources/
        ↓
NotebookLM 匯出 (FAQ/Study Guide)
        ↓
  raw/notebooklm/
        ↓ /compile ──→  wiki/log.md (追加記錄)
    wiki/
        ↓ /query  ──→  output/queries/  ──→  raw/notebooklm/ (新補充)
        ↓              wiki/log.md (追加記錄)
       /lint ──→  output/lint_日期.md
                  wiki/log.md (追加記錄)
        ↓
  wiki 持續成長，log.md 記錄全程
```

---

## 注意事項

- 永遠不要刪除 `raw/` 的原始文件
- 每次 compile 後必須更新三個索引文件（_index、_summaries、_graph）
- 概念文章應包含 `## 反向連結` 區塊
- 查詢答案要標注資料來源（哪篇 wiki 文章 或 NotebookLM）
- `/query` 從 NotebookLM 取得的補充資訊必須存回 `raw/notebooklm/` 才算完成
