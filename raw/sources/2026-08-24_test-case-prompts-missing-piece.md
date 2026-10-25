<!-- processed: 2026-08-25 -->
<!-- 來源：敏捷三叔公，轉念學 - 敏捷三叔公的學習之旅 -->
<!-- URL：https://agile3uncles.com/2026/08/24/the-missing-piece-in-test-case-prompts/ -->
<!-- 取得方式：網站公開 WordPress API；解讀為 wiki/QA/AI 測試案例 Prompt 的缺口 — Test Design Method 與 QA Decision Desk 補強.md -->

# 來源記錄：業界流行的「測試案例產生 prompt」長什麼樣？骨架很通用，測試專業卻缺席

## 出處

| 欄位 | 值 |
|---|---|
| 作者 | 敏捷三叔公（WordPress slug：`kojenchieh`） |
| 站點 | 轉念學 - 敏捷三叔公的學習之旅 |
| URL | <https://agile3uncles.com/2026/08/24/the-missing-piece-in-test-case-prompts/> |
| 發布 | 2026-08-24 07:55:54 |
| 更新 | 2026-08-24 07:55:54 |
| 取得 | 2026-08-25，網站公開 WordPress API |
| 付費牆／登入 | 無 |
| 取得完整度 | 正文完整；頁面樣式、導覽與留言不納入 |

> **未逐字存檔的理由：** 本 vault 是 public repository。逐字保存公開網站的完整文章會形成再次公開轉載，因此只保存來源資訊、文章結構、必要事實與完整的原創分析。原文以永久網址為準。

## 文章問題意識

文章整理 2023–2026 年常見的 AI test case generation prompts，指出它們大多能拆成七個通用槽位：Role、Context、Input、Task、Coverage、Output Format、Constraints。作者認為這些槽位是通用 prompt engineering，而不是測試專業本身。

文章進一步主張，常見 prompt 的 Coverage 通常只列 happy path、negative、boundary、edge case 等名詞，沒有把等價分割、邊界值、決策表、狀態轉換或 Pairwise 寫成可執行程序；更關鍵的是，expected result 常缺少可追溯的 oracle，導致模型把合理猜測寫成規格事實。

## 文章段落骨架

1. 定義 Test Case、User Story／AC、Happy／Negative／Boundary／Edge Case 與 Prompt。
2. 將常見 test case prompts 拆成七個通用槽位。
3. 比較單一 prompt 與 prompt chain：先找模糊點、識別情境、分類產生、審查 coverage、匯出格式。
4. 指出 coverage 多半只有技法名稱，缺少技法的操作程序。
5. 指出 oracle、結構化 requirement clarification、其他設計技法與 execution feedback loop 的缺席。
6. 提出第八格 Test Design Method：先依規格特徵選技法，再由人審核後套用。
7. 提出兩段式示例：Prompt A 選技法、Prompt B 依核准技法產生案例，並標示 expected result 的規格來源或 assumption。

## 來源與主張信心

| 層級 | 判斷 |
|---|---|
| 文章取得完整度 | 高；由同站公開 API 取得完整正文與 metadata |
| 七槽位整理 | 中高；是作者對多份來源的歸納，不是正式標準 |
| Test Design Method 與 oracle 問題 | 中高；符合既有測試設計與 evidence traceability 原則 |
| Prompt A／B 對本系統的有效性 | 未驗證；是作者提出的整合框架 |
| 全部外部引用 | 未逐筆獨立驗證 |

文章引用的原始論文 *System Test Case Design from Requirements Specifications: Insights and Challenges of Using ChatGPT* 確實列出不同 prompting strategy 下平均 `3.6` 與 `10.58` 的 test designs 數值，但該結果不等於驗證作者新增第八格或 Prompt A／B 的正確性：<https://arxiv.org/html/2412.03693>。

## 對本系統的解讀落點

完整分析見：[[QA/AI 測試案例 Prompt 的缺口 — Test Design Method 與 QA Decision Desk 補強]]。

