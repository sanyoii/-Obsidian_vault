# 知識庫操作日誌

> **規則：只增不改。** 每次 `/compile`、`/query`、`/lint` 後追加一筆記錄，不得修改舊記錄。
> 格式：`YYYY-MM-DD HH:MM | 操作 | 來源 → 產出 | 備註`

---

## 2026-05

### 2026-05-26 | 系統建置
- `2026-05-26 | SETUP | — → wiki/log.md` | 依 Karpathy LLM Wiki 模式建立 append-only 日誌；同步更新 CLAUDE.md workflow、_index.md 計數（19→149）

### 2026-05-26 | COMPILE
- `2026-05-26 | COMPILE | @Mnilax X 文章 → wiki/Claude/18個改變一切的 Claude Code Settings.md` | 依文章逐一套用 18 個設定，實際修改 user-level 與 project-level settings.json，記錄完整變更清單與細節說明
- `2026-05-26 | COMPILE | github.com/ruijayfeng/ziwei → wiki/Github/repos/ruijayfengziwei — 現代化紫微斗數命盤分析工具.md` | 安裝紫微斗數 Web App（d:\Claude\ziwei），記錄安裝步驟、技術棧、AI 設定方式
- `2026-05-26 | COMPILE | github.com/Renhuai123/ziwei-doushu → wiki/Github/repos/Renhuai123ziwei-doushu — 倪海夏天紀體系紫微斗數引擎.md` | repomix 分析，識別 4 個高價值資產（patterns.ts/古籍/名人命盤/51.8萬樣本），制定 enhancement 路線圖
- `2026-05-26 | COMPILE | github.com/itsfatduck/optimizerDuck → wiki/Github/repos/itsfatduckoptimizerDuck — Windows 系統最佳化工具.md` | repomix 分析，WPF/.NET 10 Windows 優化工具，30+ 調整項+內建工具+完整復原機制，附 10 個 AI coding skills
- `2026-05-26 | COMPILE | github.com/multica-ai/andrej-karpathy-skills → wiki/Claude/Karpathy 最高遵守原則 — AI 行為準則.md` | 設為最高遵守原則，套用至 CLAUDE.md，建立 /karpathy-audit 命令，附首次合規審查記錄（✅ 合格）

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
