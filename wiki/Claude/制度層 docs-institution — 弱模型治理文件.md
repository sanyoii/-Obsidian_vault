# 制度層 docs/institution — 弱模型治理文件

> 建立：2026-07-02，Fable 5（Anthropic Mythos 級模型）在此環境唯一一次 session 的產出。
> 目的：把強模型的判斷力外化成 Sonnet/Opus/Haiku 可執行的制度，讓之後每個 session 都因此變強。
> 位置：`d:\Claude\docs\institution\`（主 repo git-tracked）。

## 六份檔案

| 檔案 | 一句話 | 什麼時候讀 |
|------|--------|-----------|
| `00-diagnosis.md` | harness 病因清單：漏 token／失焦／出錯 各前三名，附證據與修法 | 改制度前確認要治的病還在 |
| `01-model-dispatch.md` | 模型調度：指揮官不下場觸發清單、派工三件套、回報合約、升降級路徑、驗證不自驗 | 要派 subagent／選模型／驗收時 |
| `02-judgment-rubrics.md` | 6 個判斷 rubric（何時升級／何時算完成／何時問人／何時換路／品質底線／值不值得做），每條附正反例 | 拿不定主意時 |
| `03-delegation-templates.md` | 5 個填空派工模板（搜尋／實作／重構／研究／審查） | 寫派工 prompt 時直接抄 |
| `04-maintenance-protocol.md` | 制度檔維護：權限分級、備份三步、教訓寫回分流表、防蔓生雙門檻 | 想改任何制度檔或 CLAUDE.md 前**必讀** |
| `05-letter-to-future-sessions.md` | 交接信：一次性手術待辦清單、四種制度死法與預防 | 新 session 接手環境時 |

## 核心設計

- **CLAUDE.md = 路由層**（187→91 行）：只放規則一句摘要 + 「什麼情境讀哪份」表。行數雙門檻：150 = 檢視觸發線（越線新增前跑移除測試、整理提案給使用者批准）、200 = 硬上限（遵從率 76%→52% 斷崖的數據線）。主判準是**移除測試**（移除這行模型會犯錯嗎），行數只是絆線。
- **調度三鐵則**：指揮官不下場（>100 行輸出／>3 檔閱讀／網頁／掃 repo／批次改檔 → 派 subagent）；派工三件套（目標動機＋可執行驗收＋回報格式）；驗證不自驗（fresh-context agent、驗收模型 ≥ 執行模型、驗證者不順手修）。
- **升降級路徑**：haiku 錯 1 次→sonnet；sonnet 同一子任務連錯 2 次→opus 帶完整失敗軌跡；opus 解出→模式化降回便宜模型批次套用；重試滿 2 輪→停下問人。
- **學習迴圈接軌**：`/revise-claude-md`、`/last-word`、`/karpathy-audit` 三個 skill 都已改道走 institution/04 §3 分流表（規則→制度檔、事件→memory、本機陷阱→CLAUDE.local.md）。
- **與 7-Agent 工廠分工**：ROUTER 決定流程形狀，institution/01 決定派工模型，兩層正交。詳見 [[7-Agent 工廠工作流 SOP]] v6 節。

## 品質保證過程

Fable 5 產出 → fresh-context Opus 對抗審查（全部路徑/工具名/指令實測，PASS 零修正）→ fresh-context Sonnet read-back 三題測試（全對，證明弱模型讀得懂）→ 4 個模糊點中 3 個補一句話封死。

## 相關

- 主 repo commits：`b5d99db`（制度層建立）、`704906a`(新舊接軌)
- Memory：`projects/project_institution_files.md`
- 誠實極限：制度補得了執行品質，補不了品味與模糊題——遇到時三選一：升級模型／給使用者多個候選／明說做不到。
