# 7-Agent 工廠工作流 SOP

> 最後更新：2026-07-02（v6：接軌制度層——各 agent 模型指定、loop-back 模型升級、與 docs/institution/ 分工）
> 適用：需要開發新功能、新工具、新系統時的標準 Agent 分工流程

---

## 為什麼要用這個流程？

**舊問題：** 一個 AI session 被迫同時扮演研究員、架構師、工程師、測試員 → context 混亂 → 錯誤一路擴散。

**解法：** 每個 Agent 只做一段任務，完成後交棒，錯誤不跨層。

---

## Step 0：要不要進工廠？（ROUTER.md）

新任務開始前，先判斷三選一，模稜兩可預設 `direct`：

| 分類 | 適用 | 範例 |
|------|------|------|
| `direct` | 單一檔案/函式可解決、bug fix、問答 | 「改這個函式的命名」「為什麼這段會報錯？」 |
| `factory` | 完整功能交付，可能跨前後端 | 「加一個職缺收藏功能」 |
| `sparc` | 設計/架構/演算法本身就是產出 | 「設計一個排程演算法並寫 pseudocode」 |

選定 `factory` 後，再依下方「策略選擇」挑 `minimal` / `standard` / `research-heavy`。

> 來源：`d:\Claude\.claude\agents\workflow\ROUTER.md`，仿
> [[x1xhlol-system-prompts-and-models-of-ai-tools]] 收錄的 Kiro Mode Classifier
> 分類定義 + 範例 + 預設規則格式設計。

---

## 流程圖

```
[你的需求]
    ↓
① researcher（研究員）
    ↓ [人工確認方向]
② story-writer（需求整理員）
    ↓ [人工確認 Stories]
③ spec-writer（規格撰寫員）
    ↓
④a backend-builder  ④b frontend-builder   ← 平行執行
    ↓          ↓
⑤ test-verifier（測試驗證員）
    ↓
⑥ validator（品質驗證員）
    ↓ [人工 Review & PR]
```

**3 個人工檢查點：**

| 位置 | 確認什麼 |
|------|---------|
| ① → ② | 研究方向對不對？技術選型確認？ |
| ② → ③ | User Stories 完整？優先序正確？ |
| ⑥ 結束後 | Code review 沒問題？可以 merge？ |

---

## 每個 Agent 的職責

| Agent | 職責 | 輸出 | 不做什麼 |
|-------|------|------|---------|
| `researcher` | 背景調研、技術可行性、競品、**codebase 掃描**（相關檔案/既有模式/類似功能） | 研究摘要 + 關鍵決策點 | 不寫程式 |
| `story-writer` | 整理 User Story + 驗收條件 + **不在範圍內/未解問題**（不猜，列給人工回答） | User Stories 清單 | 不做技術規格 |
| `spec-writer` | API 合約、資料模型、分工邊界、PR 切分規劃、**預計改動檔案清單** | 技術規格文件 + `pr-split.md` | 不實作 |
| `backend-builder` | 後端 API、DB、商業邏輯 | 後端程式碼 + unit tests + **CLAUDE.md 規則建議** | 不碰前端 |
| `frontend-builder` | UI 元件、路由、串 API | 前端程式碼 + UI 正常 + **CLAUDE.md 規則建議** | 不碰後端；**API 與 spec 不符 → 回報，不自行打補丁** |
| `test-verifier` | 整合測試、E2E、驗收條件逐一確認 | 測試報告 + Bug 清單 | 不寫新功能 |
| `validator` | Code review、安全檢查、**範圍檢查**（git status 對照預計改動清單）、PR 準備 | 品質報告 + PR 描述 | 不加新功能 |

### 工具白名單（v5，硬邊界）

「只讀」約束從指令文字升級為 frontmatter `tools:` 硬限制：

| Agent | 白名單 |
|-------|--------|
| `researcher` | Read, Grep, Glob, Write, WebSearch, WebFetch |
| `story-writer` | Read, Grep, Glob, Write |
| `spec-writer` | Read, Grep, Glob, Write, Bash |
| `test-verifier` | Read, Grep, Glob, Write, Edit, Bash |
| `validator` | Read, Grep, Glob, Bash（**無 Write** → baton 由 orchestrator 代寫） |
| `backend/frontend-builder` | 不限制（需完整編輯能力） |

Write 保留給 baton.md 與 specs/ 輸出；路徑級限制（如只能寫測試檔）需 PreToolUse hook，複雜度不成比例，未採用。

---

## 策略選擇（水球流策略模式）

不同任務選不同的 agent 組合，不是所有任務都要跑完整 7 步：

| 策略 | 適用場景 | Agent 組合 |
|------|---------|-----------|
| `minimal` | 單一腳本、後端小改動 | spec → backend → test |
| `standard` | 一般全棧功能（預設） | 完整 7 agents |
| `research-heavy` | 新領域、未知技術、架構選型 | researcher（多輪）→ story → spec → backend → test |

**怎麼選：** 有前後端都要改 → standard；只改一層 → minimal；完全不熟的技術 → research-heavy。

---

## 執行機制（ORCHESTRATION.md）

進工廠後，主對話的 Claude 本身就是 orchestrator，用 `Agent` tool
依序/平行呼叫各 agent（`subagent_type` = agent 檔名）。

- **Context 傳遞**：researcher → story-writer 傳研究摘要全文；
  spec-writer 之後改用檔案傳遞——直接告知 `specs/<branch>/spec.md` 路徑，
  不必複製規格全文（spawn 出來的 agent 不記得對話）
- **平行執行**：backend-builder + frontend-builder 在**同一則訊息**內
  發出兩個 `Agent` tool call
- **人工檢查點**：到達檢查點時輸出該 agent 的完整輸出格式內容後停下，
  等使用者下一則訊息才繼續呼叫下一棒
- **Bug loop-back**：test-verifier/validator 路由回某 agent 時，
  主對話重新呼叫該 agent 並附上 Bug 描述 + 重現步驟 + spec 段落，
  修復後跳回 test-verifier 重跑對應 AC（沿用下方 Loop-back 協議的次數限制）

> 來源：`d:\Claude\.claude\agents\workflow\ORCHESTRATION.md`，仿
> [[x1xhlol-system-prompts-and-models-of-ai-tools]] 收錄的 Manus Agent loop
> （分析狀態→選工具→等待執行→迭代→提交結果）框架設計。

---

## Agent Contract（水球流門面 + DIP）

每個 agent 都定義正式的 Input/Output 合約，下游 agent 接手前必須驗收：

| Agent | 核心 Output 要求 | Acceptance Criteria 重點 |
|-------|----------------|------------------------|
| `researcher` | 7 個欄位（需求/調研/競品/可行性/決策點/**相關檔案與角色**/**既有模式與類似功能**；綠地可填 N/A） | 關鍵決策點是問句、無程式碼 |
| `story-writer` | 每個 Story 含 2+ AC + 優先級 + **不在範圍內** + **未解問題** | P0 至少 1 個、無技術細節、未解問題不猜 |
| `spec-writer` | 資料模型 + API 合約 + 分工邊界 + **預計改動檔案清單** + `pr-split.md` | 每個 endpoint 有完整範例；PR 切分小而標明依賴 |
| `backend-builder` | 符合 API 合約的程式碼 + unit tests 全過 + CLAUDE.md 規則建議 | 無前端檔案異動 |
| `frontend-builder` | 符合頁面結構的元件 + P0 UI 可操作 + CLAUDE.md 規則建議 | 無後端檔案異動；API 不符只回報不補丁 |
| `test-verifier` | 每個 AC 的 PASS/FAIL + Bug 路由決策 | 無 P0 Bug 待修 |
| `validator` | 審查清單全勾（含範圍外改動檢查）+ PR 描述草稿 | 無加入新功能 |

---

## Bug 處理生命週期（v3 強化版）

完整流程（適用 7-Agent 工廠 + Ad-hoc 工作流）：

```
Bug 發現/回報
    ↓
① Issue Tracking 建立（title/描述/重現步驟/預期/實際）
   P0/P1 → GitHub Issue（label: bug/P0 or bug/P1）
    ↓
② 調查 → RCA Report（直接原因 / 根本原因 / 觸發條件）
    ↓
③ 修正 + 測試（重跑 AC / Regression Test）
    ↓
④ 防止再發計劃（技術預防 + 流程預防 + Regression Test）
    ↓
⑤ 關閉 Issue + 更新 Bug 模式記憶庫
```

### P0/P1/P2 Severity 矩陣

| 等級 | 定義 | SLA |
|------|------|-----|
| **P0** | 核心功能無法使用 / 資料損毀 / 安全漏洞 | 同工作日修復並驗證 |
| **P1** | 重要功能降級但有 workaround | 下次工作階段 |
| **P2** | 小問題 / UI 瑕疵 / 非關鍵路徑 | backlog 排期 |

### 路由決策樹（test-verifier 責任鏈）

```
Bug → [規格有誤？]     → spec-writer
    → [後端實作有誤？] → backend-builder
    → [前端串接有誤？] → frontend-builder
    → [邊界問題？]     → spec-writer 重定邊界
    → 以上皆否         → recursive-debugging → 升級人工
```

**Loop-back 協議：**
- Builder 修復後，test-verifier 重跑對應 AC
- 最多重試 2 次；第 3 次仍 FAIL → 人工判斷
- P0 修復後 GitHub Issue 標記 Fixed → test-verifier 確認 Verified 才關閉

### Validator Loop-back

Code Review 發現問題時不直接 block PR：
- 邏輯錯誤 → 依路由決策樹回流
- 安全漏洞 → 建 P0 GitHub Issue，阻止 PR
- 技術債（範圍外）→ 建 P2 Issue，不阻止 PR

### Bug 模式記憶庫

每次修完 Bug，將 RCA 根本原因類別存入 `memory/project_bug_patterns.md`（已知模式：ASYNC-001、DATA-001）。

**效果：** 問題有據可查地回流到正確責任人；相同類型 Bug 不再重複調查。

---

## 實際使用方式

### 開新功能

直接描述需求，Claude 會自動從 researcher 開始：

```
我想做一個 Line Bot，每天早上推播今天的 104 職缺給我。
```

Claude 會用 `researcher` 調研，整理成研究摘要，等你確認後繼續。

### 指定特定 Agent

需要時可以明確指定：

```
用 validator agent 審查一下這段程式碼。
用 test-verifier 確認 Story #3 的驗收條件有沒有全過。
```

---

## Agent 檔案位置

| 層級 | 路徑 | 說明 |
|------|------|------|
| 全域（active） | `C:\Users\sanyo\.claude\agents\workflow\` | Claude 讀取的位置 |
| 備份（git） | `d:\Claude\.claude\agents\workflow\` | git-tracked |
| careerbot 專用 | `d:\Claude\careerbot\.claude\agents\` | researcher + spec-writer |
| social-monitor 專用 | `d:\Claude\social-monitor\.claude\agents\` | researcher + backend-builder |

---

## 子專案 project-level agents

在子專案目錄下，Claude 可以看到**全域 agents + 該專案的專屬 agents**。

例如在 `d:\Claude\careerbot\` 開啟 Claude Code：
- `careerbot-researcher`（會做 JD 分析、Gap 分析，比全域 researcher 更懂求職情境）
- `careerbot-spec-writer`（會輸出 cover letter 架構）

---

## 新增 Agent 流程

1. 在 `d:\Claude\.claude\agents\<category>\<name>.md` 建立
2. 複製到 `C:\Users\sanyo\.claude\agents\<category>\`（啟用）
3. `git add . && git commit && git push`

---

## 全域 Agents 8 個類別

改造前 23 個子類別，整合後剩 8 個：

```
agents/
├── workflow/     7-Agent 工廠流程（本文件）
├── engineering/  後端/前端/DevOps/測試相關
├── analysis/     程式碼分析、code review
├── architecture/ 系統設計
├── github/       Git workflow
├── sparc/        SPARC 方法論
├── swarm/        Ruflo 多 agent 協調
└── specialized/  其他雜項
```

---

## Pre-commit Secret Hook（v5 基礎設施）

工廠外圍防線，擋密鑰進版控（緣由：2026-07-01 fate/README.md API key 差點入庫，靠人工 diff 攔截）：

- 腳本：`d:\Claude\scripts\pre-commit-secrets.sh`（git-tracked）；`.git/hooks/pre-commit` 為一行 shim
- 攔檔名：`.env`（排除 `.env.example`）、`*.key`、`*.pem`、`secrets.json`
- 攔內容：`sk-ant-` / `sk-proj-` / `AIzaSy` / `ghp_` / `AKIA` 等 prefix + 長度尾綴（`{20,}`，文件裡的短範例不誤殺）
- 掃 staged 內容（`git show :file`），非工作區——partial staging 不誤判
- ⚠️ hooks 不進版控：新 clone 後照 `docs/ENV_REFERENCE.md` 一行指令重建 shim
- 已知限制：`.env.local` 等變體不攔（目前只攔字面 `.env`）

---

## v6 接軌制度層（2026-07-02，同日第二批）

制度層 `d:\Claude\docs\institution\`（六檔：診斷/模型調度/判斷rubrics/派工模板/維護協議/交接信）建立後，工廠與其接軌：

- **模型指定表**（ORCHESTRATION.md）：researcher～test-verifier 六個 agent → `sonnet`；validator → `opus`（驗收模型 ≥ 執行模型）
- **Loop-back 模型升級**：baton `attempt: 2` 重派同一 agent 時升 `opus` + 附完整失敗軌跡；比 institution/01 §5（連錯兩次）更早升是刻意的——loop-back 失敗經過 test-verifier 驗證，是確證失敗
- **分工邊界**：ROUTER 決定進不進工廠（direct 模式仍受 institution/01 不下場清單約束，中途發現跨棧要改道重路由）；institution/01 決定每次派工的模型；baton 是工廠內的回報合約實作，工廠外用 institution/03 模板
- CLAUDE.md 同日重寫為 91 行路由層，工廠相關規則入口不變（`workflow/ROUTER.md` / `ORCHESTRATION.md`）

## v5 升級紀錄（2026-07-02）

對照工廠原型文章（blocktempo 轉譯 @sairahul1 的 7-agent 設計）做差距分析，採納 7 點、明確不採納 3 點（後端→前端改依序、路徑級工具限制、CLAUDE.md 壓 100-300 行）。計劃全文：`d:\Claude\workspace\plans\7-agent-factory-article-gap-plan.md`。

執行方式本身就是一次分工示範：Sonnet 5 subagent 依 R17 契約表（13 項）執行 → Fable 5 subagent 獨立兩層驗收（機械 12 項 + 品質 6 項 + 真實 commit 端到端加測）PASS → 主對話抽查後 commit（`45f8922`）。

---

## 相關文件

- [[--重要--新 Idea 新專案 SOP]] — 完整的 Idea → 實作 → 收尾流程
- [[Claude 環境說明]] — 路徑與工具總覽
- [[Claude Code Skills 使用手冊]] — Skills 使用方式
