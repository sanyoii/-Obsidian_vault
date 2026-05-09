# raw/ — 原始文件暫存區

這裡是所有原始資料的進入點。分兩個子目錄放置，然後執行 `/compile`。

## 子目錄

### `sources/` — 第一手原始文件
PDF、網頁剪報、論文、GitHub README 等原始資料。

| 格式 | 建議來源工具 |
|------|------------|
| `.md` | Obsidian Web Clipper、手寫 |
| `.txt` | 任何來源 |
| `.pdf` | arXiv、各類期刊 |
| `.html` | 瀏覽器另存 |

命名：`YYYY-MM-DD_來源_標題.md`
範例：`2026-05-08_arxiv_attention-is-all-you-need.md`

---

### `notebooklm/` — NotebookLM 匯出
從 NotebookLM 匯出的 **FAQ、Study Guide、Briefing Doc** 等預先消化的筆記。

| NotebookLM 輸出 | 適合放入？ | 說明 |
|----------------|-----------|------|
| Study Guide | ✅ 最佳 | 已有層級結構，直接作為文章骨架 |
| FAQ | ✅ 最佳 | 問答對直接轉化為概念文章 |
| Briefing Doc | ✅ 很好 | 濃縮摘要，建立索引快 |
| Audio Overview 逐字稿 | 勉強 | 冗餘較多 |

命名：`YYYY-MM-DD_notebooklm_<Notebook名稱>_<輸出類型>.md`
範例：`2026-05-08_notebooklm_transformer-papers_study-guide.md`

`/query` 從 NotebookLM 取得的補充資訊也會自動存回這裡，命名為：
`YYYY-MM-DD_query-supplement_<標題>.md`

---

## 處理狀態

已處理的文件第一行會有：
```
<!-- processed: YYYY-MM-DD -->
```

尚未處理的文件不含此標記。

## 注意

- 原始文件**永遠不會被刪除**，只會被標記為已處理
- 同一主題若同時有 `sources/` 和 `notebooklm/`，編譯時以 notebooklm 的結構為骨架，sources 補充細節
