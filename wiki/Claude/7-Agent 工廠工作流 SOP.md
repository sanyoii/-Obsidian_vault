# 7-Agent 工廠工作流 SOP

> 最後更新：2026-06-04（v3：完整 Bug 處理生命週期 — Issue Tracking + RCA + Loop-back + 防止再發）
> 適用：需要開發新功能、新工具、新系統時的標準 Agent 分工流程

---

## 為什麼要用這個流程？

**舊問題：** 一個 AI session 被迫同時扮演研究員、架構師、工程師、測試員 → context 混亂 → 錯誤一路擴散。

**解法：** 每個 Agent 只做一段任務，完成後交棒，錯誤不跨層。

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
| `researcher` | 背景調研、技術可行性、競品 | 研究摘要 + 關鍵決策點 | 不寫程式 |
| `story-writer` | 整理 User Story + 驗收條件 | User Stories 清單 | 不做技術規格 |
| `spec-writer` | API 合約、資料模型、分工邊界 | 技術規格文件 | 不實作 |
| `backend-builder` | 後端 API、DB、商業邏輯 | 後端程式碼 + unit tests | 不碰前端 |
| `frontend-builder` | UI 元件、路由、串 API | 前端程式碼 + UI 正常 | 不碰後端 |
| `test-verifier` | 整合測試、E2E、驗收條件逐一確認 | 測試報告 + Bug 清單 | 不寫新功能 |
| `validator` | Code review、安全檢查、PR 準備 | 品質報告 + PR 描述 | 不加新功能 |

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

## Agent Contract（水球流門面 + DIP）

每個 agent 都定義正式的 Input/Output 合約，下游 agent 接手前必須驗收：

| Agent | 核心 Output 要求 | Acceptance Criteria 重點 |
|-------|----------------|------------------------|
| `researcher` | 5 個欄位（需求/調研/競品/可行性/決策點） | 關鍵決策點是問句、無程式碼 |
| `story-writer` | 每個 Story 含 2+ AC + 優先級 | P0 至少 1 個、無技術細節 |
| `spec-writer` | 資料模型 + API 合約 + 分工邊界 | 每個 endpoint 有完整範例 |
| `backend-builder` | 符合 API 合約的程式碼 + unit tests 全過 | 無前端檔案異動 |
| `frontend-builder` | 符合頁面結構的元件 + P0 UI 可操作 | 無後端檔案異動 |
| `test-verifier` | 每個 AC 的 PASS/FAIL + Bug 路由決策 | 無 P0 Bug 待修 |
| `validator` | 審查清單全勾 + PR 描述草稿 | 無加入新功能 |

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

## 相關文件

- [[--重要--新 Idea 新專案 SOP]] — 完整的 Idea → 實作 → 收尾流程
- [[Claude 環境說明]] — 路徑與工具總覽
- [[Claude Code Skills 使用手冊]] — Skills 使用方式
