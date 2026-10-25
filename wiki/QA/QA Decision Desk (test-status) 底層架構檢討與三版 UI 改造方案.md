---
title: QA Decision Desk (test-status) 底層架構檢討與三版 UI 改造方案
aliases:
  - test-status 改造方案
  - QA Decision Desk UI 三版提案
type: design-proposal
status: proposed
created: 2026-10-17
updated: 2026-10-17
tags:
  - QA
  - testing
  - dashboard
  - ui-ux
  - portfolio
  - Web3
related:
  - "[[QA/Low-Tech Testing Dashboard 實做計畫]]"
  - "[[QA/QA Decision Desk Playbook 改造加強計畫]]"
  - "[[QA/Risk-Based QA Evidence Pack 模版規劃]]"
  - "[[求職/Web3-轉職計畫/00-總覽與定位]]"
---

# QA Decision Desk (`test-status/`) 底層架構檢討與三版 UI 改造方案

> [!important] 文件定位與狀態
> - **目標網址**：`https://sanyoii.github.io/test-status/`
> - **本機原始碼庫**：`D:\Codex\RiskQADemoSite`
> - **靜態部署路徑**：`D:\Codex\Web3\test-status`（同步至 `sanyoii.github.io`）
> - **狀態**：**Proposed（提案待選）**——本文件完整記錄底層架構的 4 大待修項目與 3 套視覺化 UI 改版方案（Option A / B / C），供拍板後實作。

---

## 一、底層設計有哪些需要修改？（原因、修改方向與實作方式）

### 1. 「靜態作品集」套用「瀏覽器即時時鐘 TTL 過期降級（Time-Bomb）」，導致所有專案永遠顯示 `? Unknown`

- **問題原因（Root Cause）**：
  - 在 `D:\Codex\RiskQADemoSite\data\decision-index.json` 中，`cex-market-data-quality-lab` 的 `expiresAt` 寫死為 `2026-09-08T23:59:00+08:00`、`sanyoii.github.io` 寫死為 `2026-09-13T20:40:00+08:00`。
  - 在 `lib/decision-policy.mjs` 與 `app/_dashboard.tsx` 中，前端每 30 秒讀取訪客當下的瀏覽器時間 `Date.now()` 執行 `decisionView()`：
    1. **SSR 靜態輸出階段**：因 `clock === null`（`clockConfirmed: false`），強制塞入 `CLOCK_UNCONFIRMED`，讓靜態 HTML 直出兩個大問號 `? Unknown`。
    2. **Client Hydration 階段**：只要訪客打開網頁的時間超過 `expiresAt`（即 2026-09-14 之後的任何一天），就會同時觸發 `EVIDENCE_STALE` 與 `RELEASE_REVIEW_INVALID`，把原本驗收通過的 `historicalStatus: "ready"` 強制覆蓋為 `status: "unknown"`（畫面顯示 `? Unknown` ＋ `Evidence not updated` ＋ `Approval pending`）。
  - **對招募方（HR / Hiring Manager）的副作用**：作品集是靜態展示站（Static Portfolio），不是 24/7 自動重跑的 Live CD Pipeline。面試官點進來第一眼看到 **`Ready: 0 | At Risk: 0 | No-Go: 0 | Unknown: 2`**，直覺會誤以為「這個專案沒跑完、測試壞掉或半途而廢」，完全掩蓋了 CEX 45 項測試全過（40 deterministic + 5 live）與 Portfolio 54 項測試全過的工程成果。
- **修改方向**：
  - **分離「受測版本結論（Snapshot Verdict）」與「證據時效標籤（Freshness / TTL Badge）」**：主要判定（Primary Verdict）應綁定**該受測 Commit SHA（`sourceSha`）當時的驗收結論**（如 `✓ Ready · Scoped Go`），而將「距離上次執行時間／新 Commit 是否需重驗」降階為獨立的 **Freshness 屬性標籤**（如 `Snapshot Verified · SHA Locked`），不再因為自然時間流逝就把已驗收通過的特定 SHA 洗成 `? Unknown`。
- **實作方式**：
  - 修改 `lib/decision-policy.mjs` 的 `decisionView()`：
    - 將回傳結構拆分為 `verdictStatus`（依 `snapshot.releaseAssessment.status`、測試套件結果與 Gate G1/G3/G6 完整性決定：`ready` / `at-risk` / `blocked` / `unknown`）與 `freshnessState`（`current` / `archived-snapshot` / `stale`）。
    - 移除 SSR 初次渲染因 `clock === null` 而強制降級為 `unknown` 的跳動邏輯，讓靜態 HTML 直出已驗證的 Snapshot 狀態。

---

### 2. 首頁與子頁（`/run-records`）資料管線雙軌脫節，Commit SHA 與錨點不一致

- **問題原因（Root Cause）**：
  - 首頁 `app/_dashboard.tsx` 讀取 `data/decision-index.json`（其中 CEX Commit 為 `fc1e060`，證據連結指向 `/run-records/#RUN-20260907-cex-deterministic-1`；Portfolio 仍停在舊的 22 checks）。
  - 但部署在 `D:\Codex\Web3\test-status\run-records\index.html` 的靜態頁面仍停留在 8 月 17 日舊版（Commit `8fd5081`，39 checks），頁面內沒有 `#RUN-20260907-...` 錨點；而原始碼 `app/run-records/page.tsx` 又把 9 月 6 日的 `release-records.json` 與 8 月 17 日硬編碼的 `cases.ts` 混在同一頁。
  - 此外，主作品集 `sanyoii.github.io` 在 `D:\Codex\Web3\tests` 已擴充到 **54 項測試全過**（涵蓋 `test_static.py`、`test_runtime.py`、`test_portfolio_pages.py`、`test_dlp_case.py`、`test_day21`–`day28`），但 `test-status` 內的快照仍停在舊版 22 項。
- **修改方向**：
  - **單一事實來源（Single Source of Truth）**：廢除 TSX 內硬編碼的舊版 `runGroups`，所有頁面（Dashboard、Run Records、Case Matrix）統一從同一份結構化資料索引生成，並將 `sanyoii.github.io` 的受測快照更新至最新 54 項測試規模。
- **實作方式**：
  - 擴充 `scripts/prepare-decision-data.mjs`，在建置前自動從 `data/repos/` 與 `test-records/releases/` 聚合最新的 `decision-index.json` 與 `release-records.json`，並加入自動化測試驗證所有 `evidenceLinks` 的 `#anchor` 在 `/run-records/index.html` 中 100% 存在。

---

### 3. 首頁缺乏「異常攔截與風險權衡（No-Go / Hold）」的同屏對照，看不出決策引擎價值

- **問題原因（Root Cause）**：
  - `QA Decision Desk` 的核心賣點是展示 **Risk-Based Release Decision（風險導向發布決策）**。但首頁頂部列了 4 種狀態篩選器（`Ready` / `At Risk` / `No-Go` / `Unknown`），底下卻只有 2 個真實 Repo，且兩個狀態永遠一模一樣（使得另外 3 個狀態計數永遠為 `0`）。
  - 訪客除非點進第三層 `/run-records/fail-demo`，否則在首頁完全看不出這套系統遇到 **P0 失敗（No-Go）** 或 **重跑通過但尚未人工簽核（Hold）** 時會如何攔截。
- **修改方向**：
  - 在首頁直接納入 **「異常攔截對照組（Synthetic Blocker / Decision Replay）」**（清楚標示 `Synthetic Demo` 標籤，不與真實受測紀錄混淆），讓訪客在首頁同屏就能看懂「正常放行 (`Scoped Go`)」、「P0 破口攔截 (`No-Go`)」與「測試重跑通過但待 Owner 簽核 (`Hold`)」的判定差異。
- **實作方式**：
  - 將 `lib/replay-policy.mjs` 的四階段狀態轉換（`1. Failure → No-Go`、`2. Fix Proposed → No-Go`、`3. Rerun Passed → Hold`、`4. Owner G6 Sign-off → Ready`）直接整合為首頁對照元件。

---

### 4. 跨站導覽孤島（Navigation Isolation）與雙語切換 DOM 競態

- **問題原因（Root Cause）**：
  - 訪客從主站 `https://sanyoii.github.io/` 點進 `/test-status/` 後，整個 `/test-status/` 頂部**沒有任何返回主作品集（`← Back to William Lu Portfolio`）或對應 Case Study（`btse-case.html`）的連結**。
  - 雙語切換 `app/_language-toggle.tsx` 採用 `MutationObserver` 全域掃描並直接改寫 DOM `textContent`，與 React 狀態重新渲染偶爾會發生競態。
- **修改方向與實作方式**：
  - 在頂部 Header 補齊返回主作品集與 Case Study 的雙向導覽列。
  - 將語言狀態收斂至 React Context / Hook 驅動（同時保留 `data-en` / `data-zh` 屬性以相容靜態檢查），並提供一鍵建置同步至 `D:\Codex\Web3\test-status` 的腳本。

---

## 二、UI 改造重點與三版視覺設計方案

### 為什麼現有 UI 不容易讓人一眼看懂？

1. **第一眼看到兩個大問號 `? Unknown`**：沒有將「測試執行結果（45/45 Pass、54/54 Pass）」與「審批有效期限（Expiry）」分開呈現。
2. **關鍵證據全藏在預設收合的 `<details>` 裡**：首頁卡片只顯示 Repo 名稱、SHA、一個大問號與兩行日期；最重要的 **「測了哪幾類 Suite？通過率多少？覆蓋哪些風險？過了哪幾道 Gate（G1/G3/G6）？誠實排除哪些未測範圍？」** 全部需要手動點開才看得到。
3. **缺乏視覺結構**：全文字條列，看不出 `Requirement → Risk → Test Suite → Artifact SHA-256 → Release Verdict` 的工程邏輯。

### 三版 UI 方案總覽對照表

| 維度 | 方案 A：`Executive Verdict & Gate Pipeline` | 方案 B：`QA Control Tower & Signal Matrix` | 方案 C：`Traceability & Decision Workflow Board` |
|---|---|---|---|
| **視覺風格** | **暖白紙質決策台**（延續並升級現有品牌色 `#F4F1EA`） | **深色科技監控台**（Web3 / CEX 高對比深藍黑 `#0B1120`） | **清爽瑞士工程網格**（現代白底藍灰 `#F8FAFC`） |
| **首屏核心結構** | 頂部 4 態摘要 ＋ 雙欄大卡片（內嵌 3 大指標與 G1–G6 過關條）＋ 底部 No-Go 攔截橫幅 | 左側「4 維度獨立信號矩陣（真實 Repo + 模擬攔截同表）」＋ 右側固定 Inspector 與 Terminal Receipt | 頂部「QA 四步決策公式列」＋ 下方三欄並排（2 個真實專案風險追蹤鏈 ＋ 1 欄異常處置四階段推演器） |
| **最大亮點** | 與現有主作品集調性最一致，一頁攤開所有關鍵數據與排除邊界 | 把單一燈號拆成「測試 / 覆蓋 / 證據 / 判定」4 顆獨立信號燈，3 秒看懂卡在哪一層 | 邏輯教育性最強，HR 與 QA 主管一眼看懂「需求→風險→測試→放行」脈絡 |
| **最適合對象** | 喜歡現有暖白紙質風格、希望直覺呈現完整決策卡的人 | 主攻 Web3 / CEX / 自動化 QA 職缺，想展現強烈工程監控感的人 | 重視 QA 方法論、風險可追溯性與治理邊界呈現的人 |

---

### 方案 A：`Executive Verdict & Gate Pipeline`（高管決策卡＋過關流水線版）

![[QA/attachments/test-status-option-a-executive-pipeline.png]]

- **設計重點**：
  1. **雙層狀態徽章（Dual-Layer Verdict）**：右上角直接顯示綠色 `✓ Ready · Scoped Go`，下方附帶獨立的 `Snapshot Verified · SHA Locked` 標籤，徹底解決 `? Unknown` 誤導問題。
  2. **卡片內直接攤開 3 大測試指標與 G1→G6 過關流水線**：不用點開摺疊，第一眼就能看到 `Deterministic: 40/40 Pass`、`Live API: 5/5 Pass`、`Coverage: Level 2/2`，以及 `G1 Scope → G3 Suites → Artifact SHA-256 → G6 Review` 四關全過的綠勾。
  3. **誠實邊界並排（In-Scope vs. Explicit Exclusions）**：每張卡片下方直接並排「已驗證範圍」與「誠實揭露未測邊界（不含私密金鑰/下單、不含壓測、揭露單人自審）」。
  4. **底部內嵌「P0 失敗攔截預覽橫幅」**：直接展示 `TC-MDQ-017`（WebSocket Stale Sequence）失敗時如何從 `× No-Go` 走到 `! Hold`。

---

### 方案 B：`QA Control Tower & Signal Matrix`（深色科技監控台＋四維度獨立燈號版）

![[QA/attachments/test-status-option-b-control-tower.png]]

- **設計重點**：
  1. **把單一狀態拆解為「4 欄獨立信號燈」**：每個專案橫向拆出 **`1. Test Execution`｜`2. Risk Coverage`｜`3. Evidence & Gate`｜`4. Release Verdict`**。看的人 3 秒鐘就能分清楚「測試有沒有過（`45/45 Pass`）」跟「簽核有沒有完成（`G6 Review`）」。
  2. **真實專案 × 模擬攔截同屏對比**：表格上半部放 2 個真實受測專案（綠燈 `Scoped Go`），下半部直接並列 2 個異常情境（紅燈 `× No-Go` 與黃燈 `! Hold / At Risk`），四種燈號同屏呈現。
  3. **右側固定 Inspector 面板**：左側點選任一列，右側直接顯示該專案的測試分類通過數（Order Book / REST / WS / Live）與 Terminal CLI 驗證 Receipt（含 JUnit SHA-256），不用跳頁或展開長捲軸。

---

### 方案 C：`Traceability & Decision Workflow Board`（瑞士工程網格＋風險追蹤鏈看板）

![[QA/attachments/test-status-option-c-traceability-board.png]]

- **設計重點**：
  1. **頂部「HOW WE DECIDE 四步公式列」**：先用 `Step 1 Risk & Oracle → Step 2 Suite Execution → Step 3 Artifact Digest → Step 4 Owner Sign-off` 幫非技術 HR 與主管建立閱讀心智模型。
  2. **三欄並排（2 個真實專案追蹤鏈 ＋ 1 欄互動式異常推演器）**：
     - 左、中兩欄直接列出每個專案的 **「風險模組 → 測試範圍 → 通過數」**（如 Order Book `9/9 Pass`、REST `9/9 Pass`、WS `12/12 Pass`、Live `5/5 Pass`；Portfolio 54/54 Pass）與誠實排除邊界。
     - 右欄直接擺放 **Decision Boundary Replay 四階段卡片**（`Stage 1: P0 Failed (No-Go)` → `Stage 2: Fix Proposed (No-Go)` → `Stage 3: Rerun Passed (Hold)` → `Stage 4: Owner Approval (Ready)`），一眼展現「測試通過不等於自動放行」的 QA 治理精神。

---

### 方案 B+C 混搭黃金版：`Dark Control Tower × Traceability Board`（深色監控台＋四步追溯看板合體版）

![[QA/attachments/test-status-option-bc-hybrid-dark.png]]

- **設計重點（結合 B 與 C 的最大優勢）**：
  1. **頂部「互動式情境切換器（Scenario Switcher）」＋「4 大即時指標（KPI Cards）」**：同時保留 C 的情境切換（`① Portfolio Release GO` / `② Candidate Blocker HOLD` / `③ Stale Evidence Drill`）與 B 的高密度監控數據（`3 GO / 1 HOLD`、`18/18 PASS`、`00–08 Linked`、`100% SHA Match`），右上角並預留 `🌙 Dark Tower / ☀️ Light` 主題切換。
  2. **上半部採用 C 的「四欄追溯決策看板（Stage 01–04）」**：
     - `Stage 01 Charter & Risk (00–02)`：直接攤開 P0/P1 風險與 `Explicit Out-of-Scope` 誠實邊界。
     - `Stage 02 Verification (03–04)`：並列 `Deterministic Gate (18/18 PASS)` 與 `Exploratory Session Charter #01 (15m Timeboxed)`。
     - `Stage 03 Triage & Gate (05–06)`：同欄並排當前 `0 Blockers` 與紅框高亮的 **Counterfactual Hold (`SHA 5b953f5`)** 攔截實例，不用切換 Tab 也能一眼看到「攔截壞版本」的證據。
     - `Stage 04 Release Verdict (07–08)`：翠綠發光邊框的 `✓ GO — RELEASE APPROVED` 判決卡與 4 項放行準則核對表。
  3. **下半部嵌入 B 的「7×4 跨專案訊號矩陣（Cross-Repo Signal & Coverage Matrix）」**：
     - 橫向攤開 3 個真實專案（`sanyoii.github.io`、`RiskQADemoSite`、`test-status`）＋ 1 列 `Hold Simulation` 對照列，涵蓋 `Unit/Schema`、`Smoke/E2E`、`Link/Anchor`、`Exploratory`、`Mobile RWD`、`Perf/Load (Out-of-Scope)` 與 `Evidence Deep-Link`，既有縱向方法論推導、又有橫向全站監控廣度。

---

## 反向連結

- [[_index|知識庫主索引]]
- [[一人軟體測試公司/_index|一人軟體測試公司 — 獨立入口]]
- [[QA/Low-Tech Testing Dashboard 實做計畫]]
- [[QA/QA Decision Desk Playbook 改造加強計畫]]
- [[QA/Risk-Based QA Evidence Pack 模版規劃]]
- [[求職/Web3-轉職計畫/00-總覽與定位]]
