# 知識庫操作日誌

> **規則：只增不改。** 每次 `/compile`、`/query`、`/lint` 後追加一筆記錄，不得修改舊記錄。
> 格式：`YYYY-MM-DD HH:MM | 操作 | 來源 → 產出 | 備註`

---

## 2026-06

### 2026-06-03 | COMPILE
- `2026-06-03 08:48 | COMPILE | Chase AI YouTube教學 + NotebookLM → wiki/Claude/Command Center Plugin — Obsidian 指揮中心.md` | 建立自製 Obsidian Plugin（4 個 Ribbon 按鈕：Morning Briefing/Compile/Lint/Quick Capture）；串接 social-monitor + job-crawler；新增 wiki/Daily/ 分類；更新 CLAUDE.md 加入 /morning 指令；_index 計數 150→151
- `2026-06-03 14:30 | COMPILE | Dashboard v2/v3 → wiki/Claude/Obsidian Dashboard 路線圖.md` | Dashboard 升級三版：v1 Bases+Home.md、v2 Plugin Panel+GitHub/HN雙欄、v3 四欄2×2 grid（+Product Hunt+Lobsters）+互動（HN開原文/GitHub repomix分析）+字型優化；新增 fetch-dashboard-data.ps1 + analyze-repo.ps1；_summaries.md 更新
- `2026-06-03 16:00 | COMPILE | Google Calendar MCP 整合 → Phase 3 完成` | 新增 fetch-calendar.ps1（headless Claude + --dangerously-skip-permissions + Google Calendar MCP）；Dashboard Morning Brief 新增📅日曆按鈕；行程區塊顯示全天/時間事件；已驗證義大利商旅全天事件正確顯示
- `2026-06-03 17:30 | COMPILE | Gmail MCP Email Brief → Phase 4a 完成` | 新增 fetch-email-brief.ps1（Gmail MCP search_threads+get_thread；Claude 評估 Emergency/High/Med/Low；萃取 Todo 事項；略過 newsletter）；Dashboard 新增 EMAIL BRIEF 全寬區塊（Morning Brief 下方）；📧 Email 按鈕；Emergency 紅色閃爍；已驗證：佛羅倫斯餐廳訂位 High+3 個待辦，13 封 newsletter 略過

---

## 2026-05

### 2026-05-30 | COMPILE
- `2026-05-30 | COMPILE | repomix HKUDS/LightRAG → wiki/Github/留看repos/已整理/HKUDSLightRAG.md` | 知識圖譜增強 RAG，5 種查詢模式，Gemini 支援，結論：補充 gbrain 專題問答（不取代）
- `2026-05-30 | COMPILE | repomix rohitg00/ai-engineering-from-scratch → wiki/Github/留看repos/已整理/rohitg00ai-engineering-from-scratch.md` | 20 phase AI 工程課程，2722 檔，Phase 13–16（MCP/Agent/Claude Code Permission Modes/Swarm）最值得選讀
- `2026-05-30 | COMPILE | repomix karpathy/autoresearch → wiki/Github/留看repos/已整理/karpathyautoresearch.md` | 8 檔案極小 repo，AI agent 自主做 LLM 訓練研究，結論：需 NVIDIA GPU，非日常工具；program.md skill 設計哲學值得借鑒
- `2026-05-30 | COMPILE | repomix activeloopai/hivemind → wiki/Github/留看repos/已整理/activeloopaiHivemind.md` | 分析跨 Agent 共享記憶系統（405 檔，356K tokens），結論：不推薦獨立開發者（全量上雲 + 功能重疊 + 無團隊）；加入 Repo 整理索引表
- `2026-05-30 | COMPILE | pip install liteparse → wiki/Tools/liteparse.md` | repomix 分析 run-llama/liteparse，建立工具文件（CLI/Python API/支援格式/使用場景）；同步新增 _index.md Tools 區塊，計數 149→150
- `2026-05-30 | COMPILE | karpathy/autoresearch program.md → wiki/Claude/Karpathy program.md Skill 設計哲學.md` | 六個 agent 可靠工作原則，含品味量化 if-then、CAN/CANNOT、checkpoint 設計

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
