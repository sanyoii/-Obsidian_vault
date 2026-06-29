# 索引導航 tool-call 量測報告

> 日期：2026-06-29
> 目的：驗證「OKF/LLM Wiki 目錄索引」對 AI 導航效率的影響（複現 dawsonwang.com/day/180 的實驗）

## 方法

挑 3 個真實查詢，比較「有目錄索引」vs「無索引（舊方式）」的 AI 導航操作數。

## 結果

### 查詢 1：「codegraph 怎麼用」

| 方式 | 路徑 | 操作數 |
|------|------|--------|
| 有索引 | Read `Tools/_index.md` → grep 命中條目（含描述）→ Read 目標檔 | **2 次，0 撲空** |
| 無索引 | Glob `Tools/*.md`（38 檔）→ 對候選 grep/逐讀定位 | 1 glob + 數次 grep/read（隨檔數成長） |

命中條目：`[[Tools/codegraph|Codegraph — 程式碼知識圖譜 MCP]] — SQLite 知識圖譜 MCP，亞毫秒查詢 symbol 關係`
→ 描述讓 AI 不必打開檔案就能確認這是目標。

### 查詢 2：「Claude 環境」→ `Claude/_index.md` 命中 2 筆（環境說明 / 操作手冊），描述足以辨識。
### 查詢 3：「SOLID 原則」→ `水球流/_index.md` 命中（DIP/OCP 等），描述含原則定義。

## 結論

- 有索引：導航成本固定為 ~2 次操作（讀索引 → 讀目標），與目錄檔數無關。
- 無索引：成本隨目錄檔數線性成長（Tools 38 檔 → 多次撲空 + 噪音）。
- 與文章「10→3 次」的觀察方向一致：**收益主要來自大目錄**（Tools/Claude/水球流），小目錄（≤5 檔）無差別，故只對大目錄建索引（Pareto）。

## 關鍵：描述持久性（本次修掉的 P1 bug）

`refresh-index.ps1` 初版每次重生成會把 AI 填的描述洗回 TODO，已修正為「保留既有描述」三級 fallback（frontmatter > 既有 > TODO）。回歸測試：填好描述後重跑腳本，TODO 維持 0、描述完整保留、首次正規化後 hash 穩定。
