---
title: Wiki 索引自動化 + 檢索分工計劃
type: project-plan
created: 2026-06-29
status: in-progress
tags:
  - system
  - wiki-architecture
  - automation
  - gbrain
  - notebooklm
---

# Wiki 索引自動化 + 檢索分工

> 計劃來源：讀 [dawsonwang.com/day/180](https://www.dawsonwang.com/day/180)（用 OKF/LLM Wiki 重整 Obsidian，index.md 漸進式揭示讓 AI 導航 tool call 10→3）後，對照本 vault 現況產出。
> 原始計劃檔：`D:\claude\plans\silly-popping-teacup.md`

## Context

盤點現有 vault 發現：

- **索引已嚴重 drift**：根 `_index.md` 寫「173 篇」實際 338；Github 寫「109」實際 113；「16 深度/93 留存」也過時。**錯誤的索引比沒索引更糟**——AI 會自信地導航到錯地方。
- **「每個資料夾都建索引」不符 Pareto**：21 個子目錄只有 4 個 >15 篇（Tools 38、Social 28、水球流 20、Claude 16），其餘 14 個 ≤5 篇，建索引無意義（直接 glob 更快）。
- **現有 `/compile`、`/lint` 是 headless `claude -p` 包裝**，邏輯在 `obsidian/CLAUDE.md` 指令集。計數是機械工作（該用確定性腳本，不該靠 LLM），描述需要判斷（才該靠 AI）。

目標：讓索引從檔案系統自動生成且永不 drift，並明確「結構化導航走 wiki / 語意模糊查詢走 gbrain / 線上擴充走 NotebookLM」的分工。

## 方法

### 1. 新增確定性索引腳本 `obsidian/scripts/refresh-index.ps1`

純機械、無 LLM、idempotent：

- 掃描各 wiki 子目錄，對檔案數 ≥ 門檻（預設 15）的目錄生成/刷新 `_index.md`：條目從 H1 標題 + frontmatter `tags` 機械擷取；有 `description:` 才帶入，否則留 `<!-- desc: TODO -->` 給 AI 補
- 目標目錄：Tools、水球流、Claude；Social 為時效報告，預設只按日期列出
- 重算並寫回根 `_index.md` 的總篇數、各 section「N 篇」、Github 行數字
- 輸出 drift 報告（宣稱 vs 實際）

機械部分（清單/計數/drift 偵測）→ 腳本；prose（描述/Connecting thread）→ AI。

### 2. 擴充 `obsidian/CLAUDE.md` 的 `/compile` 與 `/lint`

- `/compile` 結尾：呼叫 `refresh-index.ps1`，AI 補 `<!-- desc: TODO -->` 佔位
- `/lint` 新增：跑 drift 報告寫進 `output/lint_<日期>.md`；為大目錄 `_index.md` 補/潤「Connecting thread」

### 3. 三層檢索模型 + gbrain 自動同步

**心智模型：Obsidian 寫、gbrain 搜、NotebookLM 深答**，三者是同一條知識流水線的三個工位，用 `/compile` 當同步節拍器。

**3a. gbrain 自動掛進 `/compile`（最大缺口）**

gbrain 目前是一次性匯入、會越來越過時。`gbrain embed --stale` 支援增量 re-embed。`/compile` 結尾新增：

```powershell
gbrain import "d:\Claude\obsidian\wiki" --no-embed
gbrain embed --stale
```

gbrain 未啟動時跳過不中止。參考 `tools/gbrain-inbox.ps1`。

**3b. 「檢索分工」路由規則**

| 查詢類型 | 走哪裡 | 不要用 |
|---|---|---|
| 結構化導航（「X 在哪篇」「這目錄有什麼」） | Obsidian `_index` + glob | 別丟 gbrain |
| 語意/模糊跨文章（「我記過關於 Y 的東西嗎」） | gbrain 語意搜尋（含 wiki 外語料） | — |
| 接地深答（要引用、不能唬爛） | NotebookLM（引文接地最強） | — |
| wiki 沒有的新知識 | NotebookLM 線上擴充 → 回流 raw/notebooklm/ | — |

何時新開 NotebookLM notebook：主題有界 + 反覆精確問答 + 錯了有代價。多數零散主題留 gbrain；現有 5 個 notebook 是精選不是上限。

閉環：NotebookLM 答案 → `raw/notebooklm/` → 下次 `/compile` 進 wiki → gbrain re-index。

### 4. 一次性修復現況

跑一次 `refresh-index.ps1` 修正當前 drift 並生成大目錄索引；AI 補描述佔位。

## 關鍵檔案

- 新增：`obsidian/scripts/refresh-index.ps1`
- 修改：`obsidian/CLAUDE.md`（/compile + /lint + 檢索分工）
- 自動修改：`wiki/_index.md`（計數）、`wiki/{Tools,Claude,水球流軟體設計模式精通之旅}/_index.md`（新建）
- 既有可重用：`scripts/lint.ps1`、`compile.ps1`、`tools/gbrain-inbox.ps1`

## Tasks

| Task | 內容 | 依賴 |
|------|------|------|
| Task 0 | 把計劃寫入本檔 | — |
| Wave 1 A | 建 `refresh-index.ps1` | — |
| Wave 1 B | 編輯 `obsidian/CLAUDE.md` | — |
| Wave 2 C | 跑腳本修復現況 + 填描述 | A |
| Wave 3 D | 驗證 + tool-call 量測 | A,B,C |

## 驗證

1. 跑腳本 exit 0
2. 計數正確：`_index.md` 數字 == `find wiki -name "*.md" | wc -l`
3. idempotent：連跑兩次第二次 `git diff` 為空
4. QA 量測：3 個真實查詢的 tool call 次數前後對比，記錄到 `output/`
5. drift 偵測：手動改錯數字，`/lint` 抓得到
6. gbrain 同步：`import --no-embed && embed --stale` exit 0，新文章可被語意搜尋命中
