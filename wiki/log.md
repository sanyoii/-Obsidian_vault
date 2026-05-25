# 知識庫操作日誌

> **規則：只增不改。** 每次 `/compile`、`/query`、`/lint` 後追加一筆記錄，不得修改舊記錄。
> 格式：`YYYY-MM-DD HH:MM | 操作 | 來源 → 產出 | 備註`

---

## 2026-05

### 2026-05-26 | 系統建置
- `2026-05-26 | SETUP | — → wiki/log.md` | 依 Karpathy LLM Wiki 模式建立 append-only 日誌；同步更新 CLAUDE.md workflow、_index.md 計數（19→149）

### 2026-05-08 | /compile（回溯補記）
- `2026-05-08 | COMPILE | raw/notebooklm/ → wiki/水球流軟體設計模式精通之旅/` | 水球軟體學院課程 42 支影片全數轉錄並 compile；建立 17 篇概念文章（策略/樣板/責任鏈/觀察者/指令/狀態/門面/裝飾者/轉接器/工廠方法/OCP/DIP/OADP/OOA/OOD/整潔架構/課程總覽）

---

## 使用說明

每次操作後，在對應月份下追加一行：

```
- `YYYY-MM-DD HH:MM | COMPILE | raw/sources/檔名.md → wiki/分類/文章名.md` | 簡短備註
- `YYYY-MM-DD HH:MM | QUERY | 問題關鍵字 → output/queries/日期_標題.md` | 補充來源
- `YYYY-MM-DD HH:MM | LINT | wiki/ → output/lint_日期.md` | 發現的問題摘要
```
