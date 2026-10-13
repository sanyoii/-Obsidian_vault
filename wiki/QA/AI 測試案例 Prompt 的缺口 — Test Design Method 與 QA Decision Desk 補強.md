---
title: AI 測試案例 Prompt 的缺口 — Test Design Method 與 QA Decision Desk 補強
aliases:
  - Test Design Method Prompt 分析
  - AI Test Case Generation 補強
type: qa-research
status: analyzed
created: 2026-08-25
updated: 2026-08-25
tags:
  - QA
  - testing
  - test-design
  - prompt-engineering
  - evidence
  - oracle
related:
  - "[[Risk-Based QA Evidence Pack 模版規劃]]"
  - "[[QA Decision Desk Playbook 改造加強計畫]]"
  - "[[Low-Tech Testing Dashboard 實做計畫]]"
source: https://agile3uncles.com/2026/08/24/the-missing-piece-in-test-case-prompts/
---

# AI 測試案例 Prompt 的缺口 — Test Design Method 與 QA Decision Desk 補強

> [!summary] 直接結論
> 原文對目前系統有幫助，但只直接補強 **Test Design 上游**，不是 Dashboard UI 或 status projection。最值得採用的是「先選技法、再產生案例」與「expected result 必須有 oracle」；最不該做的是直接照抄長 prompt、立即新增第十個模板，或把 AI draft 當成 test evidence。

## 來源與判讀邊界

- 原文：敏捷三叔公，〈[業界流行的「測試案例產生 prompt」長什麼樣？骨架很通用，測試專業卻缺席](https://agile3uncles.com/2026/08/24/the-missing-piece-in-test-case-prompts/)〉，2026-08-24。
- 取得：同站公開 WordPress API，正文完整。
- 原始來源記錄：`raw/sources/2026-08-24_test-case-prompts-missing-piece.md`。
- 本頁是對目前 QA Evidence Pack／Playbooks／Dashboard 的分析，不把作者提出的框架當成已驗證標準。

## 原文真正提出什麼

作者把常見 test case prompts 拆成七個通用槽位：Role、Context、Input、Task、Coverage、Output Format、Constraints。問題是這些槽位同樣能套用到法律、行銷或任何知識工作，不能單靠它們證明測試專業。

文章認為缺少的是第八格 **Test Design Method**：

1. 先辨識規格特徵，例如數值範圍、互相影響的條件、狀態生命週期與大量獨立選項。
2. 根據特徵提出 Boundary Value、Equivalence Partitioning、Decision Table、State Transition、Pairwise、Error Guessing 或 risk-based prioritization。
3. 由人審核技法選擇。
4. 再把核准技法寫成操作程序並產生案例。
5. 每個 expected result 指回規格來源；找不到時標為 assumption，不寫成事實。

這個方向比只要求「涵蓋 negative／boundary／edge cases」更成熟，因為它要求模型說明如何找到案例，而不只列測試術語。

## 目前系統已經具備什麼

### 1. Requirement clarification 已存在

Requirement Readiness 已要求找出矛盾、Unknown、缺少的 boundary／state transition、權限與錯誤行為，且每個 finding 必須指回原句或明確 absence。這已涵蓋文章「先不要產生案例，先找模糊點」的大部分目的。

### 2. Risk-first 已存在

[[Risk-Based QA Evidence Pack 模版規劃]] 的核心不是產生最多 Test Cases，而是先辨識 Product Area、failure mode、impact、likelihood／uncertainty、detectability、recoverability 與 target coverage，再決定 test response。

### 3. 部分技法已有程序

API Coverage Design 已要求 schema、auth、negative、boundary、idempotency、retry 與 concurrency，而且每個 case 必須指回 contract element、requirement 或 gap。Test Data Design 也已把 boundary 定義為最小／最大及剛好內外一格，並要求來源與安全環境。

### 4. Human review 與 authority boundary 已存在

[[QA Decision Desk Playbook 改造加強計畫]] 把 Playbook 定位成 advisory transformation layer。模型只能產生 draft／recommendation；Pass、Fail、Ready 與 release decision 必須來自 canonical evidence 與具名 human decision owner。

## 真正仍有的缺口

### 缺口 A：沒有通用的 Test Design Decision

目前 Test Spec 的 Coverage Design 有 Risk、Target coverage、Test type 與 Approach，但沒有明確保存：

- 目標 failure mode。
- 規格特徵／applicability signal。
- 選用技法與技法參數。
- 為何不用其他技法。
- 技法能支持的 coverage claim。
- 仍未覆蓋的 residual risk。

### 缺口 B：通用 Test Case 沒有 oracle contract

通用 Test Case 有 Observable expected result，但沒有說明 expected result 的來源階層。較完整的 oracle 應區分：

1. Approved requirement／acceptance criteria。
2. Reviewed API、design 或 domain contract。
3. 適用的標準、法規或正式 business rule。
4. 現有產品行為；只能作為 characterization evidence，不必然代表正確。
5. 無來源的推測；標 `Assumption`。
6. 來源衝突；標 `Unknown／needs-clarification`。

Oracle 不必機械式加在每個操作步驟。整個 Case 共用同一來源時可放在 Case metadata；只有不同 assertion 來自不同來源時，才逐項標 Oracle reference。

### 缺口 C：規格特徵不足以單獨決定技法

文章的「有範圍就做 Boundary、有條件就做 Decision Table」是必要起點，但不符合完整 Risk-Based QA。正確選擇應同時考慮：

```text
Risk／failure mode ＋ 規格特徵 ＋ 可觀察性／環境限制
→ Test Design Method
```

同一組條件若風險低，可能只需 representative sampling；若牽涉付款、權限或資料完整性，就可能需要完整 Decision Table、negative transitions 與獨立 review。

### 缺口 D：Testability 與 observability

技法選對仍不代表能取得 evidence。設計前還要知道：

- 結果如何被觀察：UI、API response、event、log、database state 或 external side effect？
- 測試資料能否安全建立、隔離與清除？
- 環境、dependency、feature flag 與 clock 是否可控？
- 不可觀察的結果要列成 coverage gap，還是需要先補 instrumentation？

### 缺口 E：缺少 stopping rule 與 feedback loop

產生更多案例不是成功。需要知道高風險 failure modes 是否覆蓋、哪些 assumptions 尚未解決、哪些案例重複，以及 Run／Defect／Escape 是否應改變原本的技法與 coverage claim。

## 對原文證據強度的修正

原文引用的 *System Test Case Design from Requirements Specifications* 確實報告不同 prompting strategy 下平均 `3.6` 與 `10.58` 的 test designs：<https://arxiv.org/html/2412.03693>。

但這組數字只能支持「拆分輸入可能產生更多設計」，不能證明：

- 更多案例比較正確。
- 作者提出的第八格優於其他流程。
- Prompt A／B 適合目前系統。
- 模型產生的 oracle 可信。

因此應分開標示：文章取得完整度高、概念合理性中高、對目前系統的行為有效性尚未驗證。

## 推薦整合方式

不要新增 Dashboard 頁面，也先不要新增 Playbook或第十個核心 artifact。先用 release-specific evidence 做一個 Test Design Decision pilot：

```text
Requirement Readiness
→ Quality Risk Assessment／failure mode
→ Test Design Decision
→ Human review
→ Scenario／Test Case
→ Test Run Record
→ Coverage Analysis／Defect feedback
```

### Pilot decision table

| Target risk／failure mode | Spec characteristic | Selected technique | Technique parameters | Oracle／source | Coverage claim | Exclusions／residual risk | Reviewer |
|---|---|---|---|---|---|---|---|

### Pilot acceptance questions

1. 每個 selected technique 是否能指回 risk、failure mode 或規格特徵？
2. 每個 expected result 是否有來源，或誠實標為 Assumption／Unknown？
3. 是否發現原流程漏掉的高風險情境？
4. 是否減少重複、低價值或無法執行的案例？
5. Reviewer 是否能解釋 coverage claim 與 exclusions？
6. 實際 Run、Defect 或 production finding 是否改變原 design decision？

Pilot 只能證明它實際測到的範圍。Retrospective pilot 不能宣稱這個流程原本一定能防止已發生的 bug；沒有獨立 reviewer 時維持 `needs-review`。

## 2026-08-25 落地狀態

使用者核准系統補強後，`D:\Codex\RiskQADemoSite` 已建立 local implementation candidate：

- `Templates/QA/02-test-spec.md`：template contract 升至 v0.2.0，加入 Test Design Decision table、oracle hierarchy、observability／testability gap、stopping rule 與 Run／Defect／Escape feedback。
- `Templates/QA/04-test-case.md`：template contract 升至 v0.2.0，加入 Design decision、Selected technique、Technique parameters、Oracle／source、Coverage claim 與 Residual risk traceability。
- `test-records/test-design-decision-bilingual-retrospective.md`：以中英切換、GitHub Pages 導覽與 Fail Demo overlap 做 retrospective pilot，維持 `needs-review`，不宣稱能回溯防止已發生 defect。
- `tests/template-contract.test.mjs`：以 automated contract 防止上述欄位日後被移除；已完成 RED → GREEN 的 targeted TDD cycle。

這次沒有新增第十個核心模板、Dashboard page、Playbook 或 status schema。上述檔案目前仍是未 commit／未 push 的 local candidate；是否升級 pilot review state，仍須 human reviewer 判斷。

## 不採用的作法

- 不逐字複製原文 Prompt A／B 成為專案規則。
- 不把 happy／negative／boundary 名詞清單誤當 technique selection。
- 不讓模型自行決定 oracle 或補完未定義的 business behavior。
- 不用 LLM 自由產生 Pairwise 最小集合；需要時使用 deterministic generator 並保存參數。
- 不把 `min-1／max+1` 機械套用到日期、decimal、Unicode 或連續 domain；先定義合法鄰近值。
- 不因為案例變多就宣稱 coverage 改善。

## 對 Portfolio 的呈現

Portfolio 應展示：

```text
Risk → Failure mode → Method → Oracle → Execution evidence → Decision
```

不應把賣點寫成「我有一份很長的 AI prompt」。真正能證明 QA 專業的是技法選擇理由、預期結果來源、實際執行與 residual risk 判斷。

## 關聯

- [[Risk-Based QA Evidence Pack 模版規劃]]：canonical evidence、risk tier 與 release decision contract。
- [[QA Decision Desk Playbook 改造加強計畫]]：advisory layer、human review 與 authority boundary。
- [[Low-Tech Testing Dashboard 實做計畫]]：唯讀 projection；不承擔 Test Design 或 oracle 推導。
