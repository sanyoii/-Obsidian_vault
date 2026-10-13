---
title: qaskills — 測試公司能力素材與安裝評估
source: "https://github.com/PramodDutta/qaskills"
author: "PramodDutta"
stars: "219"
clipped: 2026-09-09
reviewed_commit: "ee81c5b16b8c22933b79e8d9a23e130bce29a847"
status: reference-candidate
tags: [github/repo, QA, ai-company, skills]
---

# qaskills — 測試公司能力素材與安裝評估

## 一句話說明

**有用，但用途是補充測試員工的能力與知識，不是取代公司架構。**優先評估測試資料、失敗診斷、發版證據和測試計畫四個模組；不整包安裝，不把 Skill 數量或平台分數當作 QA 能力已驗證。

本次對照 [[QA/一人軟體測試公司 — 架構與工作流程]] 的 15 位角色、Architect／PM 分工、五站流程與證據邊界。這是研究與 Wiki 存檔，尚未採用、安裝、修改 Skills 或執行上游程式。

## 專案概覽

| 項目 | 本次讀取結果 |
|---|---|
| Repository | PramodDutta/qaskills |
| Stars | 219 |
| Forks | 25 |
| 主要語言 | TypeScript |
| 授權 | 根目錄 LICENSE 標示 MIT；個別第三方來源仍須核對 |
| 建立 | 2026-02-11 |
| 最後推送 | 2026-08-30T13:56:00Z |
| 固定分析版本 | ee81c5b16b8c22933b79e8d9a23e130bce29a847 |
| Archived | false |
| Open Issues／PRs | 2／2；REST open_issues_count=4 包含 PR |
| GitHub Releases | API 回傳空清單；不等於 npm 沒發布 |
| CLI 原始碼版本 | packages/cli/package.json：0.4.1；未核對 npm 已發布包是否相同 |
| 首頁 | https://qaskills.sh |
| Git tree | 完整、未截斷；2,547 個 blob，其中 440 份 seed-skills/*/SKILL.md |
| 內建 pack | qa-essentials 含 10 份 Skill |
| 維護概況 | contributors API 2 人，貢獻數 247／1；不把提交次數視為品質證據 |

來源：[GitHub API](https://api.github.com/repos/PramodDutta/qaskills)、[固定版本目錄](https://github.com/PramodDutta/qaskills/tree/ee81c5b16b8c22933b79e8d9a23e130bce29a847)、[CLI manifest](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/cli/package.json)、[LICENSE](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/LICENSE)。數字為本次快照；GitHub 網頁的快取數字與 API 略有差異，以本次 API 為準。

README 稱 20+ Skills，網站顯示 450+；本輪直接計數的 440 是 repository seed 檔案，不等於網站 registry 的條目數，三者不能混成同一個數字。

## 核心功能

- QA Skill 目錄、分類與搜尋。
- CLI 安裝、列出、更新、移除；支援選 Agent 與目錄覆寫。
- MCP 提供搜尋、內容讀取、安裝等介面。
- Skill frontmatter、格式驗證與品質分數。
- 測試方法、程式範例與參考檔；內含網站內容，不是每個檔案都是 Skill。

依據：[CLI add](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/cli/src/commands/add.ts)、[MCP](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/mcp/src/index.ts)、[validator](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/skill-validator/src/index.ts)。

## 技術架構

```text
seed-skills/ ＋ packs/          ← QA 指令／範例／references
         ↓
網站與 registry API             ← Next.js、Clerk、Drizzle 等
         ├─ CLI → 下載／抽取 → Agent 目錄
         ├─ MCP → 讀取 content → 寫 SKILL.md
         └─ shared／validator → metadata 與格式分數

你的一人測試公司
    原有角色／能力
         ↓
    挑選適用片段 → 改寫授權與證據規則 → 限定案例驗證
         ↓
    既有方法／知識／Run 契約
```

它的網站、帳號系統、registry、排行榜與 telemetry 對目前測試公司不是必要依賴。可用部分主要是方法素材，以及安裝器對 SKILL.md＋references/scripts/assets 的完整包概念；不需要為採用方法而架起整套目錄網站。

來源：[root package](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/package.json)、[web package](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/web/package.json)、[installer](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/cli/src/lib/installer.ts)。

## 最值得用的地方與能力映射

| 優先 | 素材 | 接到既有能力 | 可取得的增量 | 採用前必改 |
|---|---|---|---|---|
| 1 | secure-test-data-engineer | test-platform.fixtures；api-data-tester.consistency | 從 schema 生成 deterministic factories、固定時間、關聯資料、邊界與反例，驗證清理殘留 | schema 衝突交案件權威裁定；schema 本身也可能敏感，不預設能送外部模型；清理須在既有授權範圍 |
| 2 | flaky-test-doctor | automation-engineer.diagnose／stabilize；test-platform.diagnose | 以 trace、同版本重跑及環境訊號分類 product/test/environment/data/unknown；保留不確定性 | 不照抄 repeat-each=10 的成本；同 SHA 還要核對環境／資料；原因分類不代替 Run 結果 |
| 3 | ai-release-guardian | qa-strategist.release-advice；evidence-reviewer.audit／gate | diff→使用者風險→測試選擇→變更行覆蓋→有來源的報告 | 不預設建立或提交 release-gates.yaml；缺證據保留 Unknown/未重驗，不能變成產品 Fail；不得直接接管發版權 |
| 4 | test-plan-generation | chief-of-staff.plan／capacity；test-analyst.design；qa-strategist.strategy | 範圍、需求追溯、三點估算、排程與角色責任的具體文件例子 | 移除硬套覆蓋率與退出門檻；加入人工覆核、返工、等待及客戶核准 |
| 5 | playwright-api／playwright-e2e | api-data-tester.contract／workflow；automation-engineer.implement | fixture、client、斷言、POM、trace 等參考 | 只取本案必要模式，不預設建完整框架；驗證案例、資料隔離及重試規則 |
| 6 | bug-report-writing／negative-test-generator | exploratory-tester.reproduce；test-analyst.design | 缺陷影響描述、預期／實際、負向輸入分類 | 去掉通用修復期限／發布裁決；負向 payload 須有有效對照與授權，不能憑範例硬定 HTTP status |

上述皆為**待改寫、待試作的候選**，不是已可直接部署的員工能力。

主要來源：
[安全測試資料](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/secure-test-data-engineer/SKILL.md)、
[資料映射附檔](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/secure-test-data-engineer/references/schema-to-data-mapping.md)、
[Flaky Test Doctor](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/flaky-test-doctor/SKILL.md)、
[AI Release Guardian](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/ai-release-guardian/SKILL.md)、
[發版報告附檔](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/ai-release-guardian/references/gate-config-and-report-schema.md)、
[測試計畫](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/test-plan-generation/SKILL.md)、
[Playwright API](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/playwright-api/SKILL.md)、
[Playwright E2E](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/playwright-e2e/SKILL.md)、
[缺陷報告](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/bug-report-writing/SKILL.md)、
[負向案例](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/negative-test-generator/SKILL.md)。

## Architect 與 PM：能補多少？

**Architect：不能靠同名 Skill 補齊。**本輪查看的 test-architecture-patterns 只有 89 行，多為通用設定／CI／最佳實踐描述；Common Patterns 只有註解佔位，沒有實際說明如何在 pyramid、trophy、honeycomb 之間取捨。risk-based-testing 也是同形狀的 89 行模板，沒有其宣稱的具體風險優先模型。這兩份不建議直接採用，不外推全部 440 份都如此。

**PM：可補測試計畫和估算素材，不能替代專案管理方法。**test-plan-generation 有實際表格與三點估算，但客戶承諾、範圍變更、產能、驗收爭議與商務成本仍須保留自家公司規則。

來源：[架構 Skill](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/test-architecture-patterns/SKILL.md#L15-L89)、[風險 Skill](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/risk-based-testing/SKILL.md#L15-L89)、[估算段](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/test-plan-generation/SKILL.md#L185-L225)。

## 不能直接照搬的地方

### 1. 高分不是行為驗證

quality-score.ts 對欄位、文字長度、標題、程式碼圍欄、tags 與 agents 數量加分，freshness 直接給 15。這個函式沒有執行 Skill 或證明它能找出缺陷；不把網站 90 分等同實測能力，也不假定網站所有分數都只由此函式產生。

validator 的安全正則只加 warning，valid 主要取決於 schema error。其通過不是安全或測試方法正確性證明。[評分實作](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/shared/src/utils/quality-score.ts#L11-L58)、[驗證器](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/skill-validator/src/index.ts#L96-L127)。

### 2. Release Guardian 必須改寫治理規則

它有「只建議、不 merge/deploy/approve」及 exact HEAD 證據等優點；但也要求把 generated files、lockfiles、vendored code 排除風險分析。這對依賴更新或供應鏈變更不適合，應改成分類審查。主流程要求團隊門檻，FAQ 又容許在無門檻時使用 defaults；本公司只能把 defaults 當待核准草案。

其 NO-GO 可作「證據不足，不建議發版」的建議，不能改寫成 Run Fail 或取代客戶決策。不要安裝它提及的其他 Skills、提交設定或建立第二份 status 真相。[來源](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/ai-release-guardian/SKILL.md#L19-L38)、[gate 與 FAQ](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/seed-skills/ai-release-guardian/SKILL.md#L114-L189)。

### 3. 安裝路徑與封裝不適合直接信任

- agents.ts 的 Codex 定義仍指向 ~/.codex/instructions；同檔另有 Universal ~/.agents/skills。前者與本機目前提供的 Skills 位置不同，不能只看到 Codex 支援列就宣稱可用。
- MCP installSkill 只讀 /content 並寫 SKILL.md，沒有把 references 一起寫入。上面至少兩個優先候選有附檔，不能當作完整包安裝。
- CLI 會嘗試保留 references/scripts/assets，但多 Skill repo 採最淺 SKILL.md，沒有以目標 Skill ID 選擇同深度內容；不應把整個 qaskills repo 當單一 Skill 安裝。
- CLI add -y 會投放到所有偵測 Agent；installer 複製到現有目錄，所讀取的 add/installer 路徑沒有同名備份／逐檔差異覆核。
- CLI／MCP 有預設安裝 telemetry；提供 DO_NOT_TRACK／QASKILLS_TELEMETRY 開關，但本輪沒有修改設定或送出安裝事件。

以上為來源碼判讀，沒有執行安裝驗證。
[Codex 路徑](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/shared/src/constants/agents.ts#L49-L57)、
[Universal](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/shared/src/constants/agents.ts#L329-L344)、
[MCP install](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/mcp/src/index.ts#L153-L166)、
[CLI 抽取／複製](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/cli/src/lib/installer.ts#L109-L181)、
[add](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/cli/src/commands/add.ts#L12-L106)、
[telemetry](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/cli/src/lib/telemetry.ts#L14-L36)。

## 安裝建議

**2026-09-09 實作更新：**使用者已授權建置。已按固定 SHA 的適用方法自行實作合成資料工具、測試計畫與證據／重測規則，未安裝上游 CLI/MCP 或整包 Skills。合成工具 5 tests，整體本機驗證 22 tests 通過；不是上游測試結果。原評估的「尚未執行」敘述保留為研究階段記錄，現況見 [本機驗收](D:/Codex/AI-一人公司/一人軟體測試公司/驗收紀錄.md) 與 [[QA/一人軟體測試公司 — 架構與工作流程#十八、本機實作與採用對照 · 2026-09-09]]。保留來源指標及 MIT notice，未宣稱全庫採用。

⏳ **整包 CLI／MCP／qa-essentials 暫不安裝；先採單份方法素材的局部改寫。**

第一份建議是 secure-test-data-engineer：它對目前五站流程的「環境資料就緒→執行」有直接增量，且能用小型 schema 做客觀驗證。其餘按遇到的案件需求取用，不為角色目錄填滿而批次匯入。

若之後獲准試作，先固定本次 commit，保留必要 companion files 與授權資訊；檢查衝突再掛入既有能力。候選驗收應包含：相同 seed 的可重現輸出、邊界／反例、關聯約束、清理殘留，以及不接觸真實客戶資料。這是後續驗證設計，尚未執行。

## 分析深度與驗證限制

| 引擎／檢查 | 狀態 |
|---|---|
| GitHub metadata | Pass：公開 REST API；gh 因 config.yml Access denied 未能啟動 |
| 原始碼與 tree | 完整 tree 已取；固定 SHA 定向取得 25 個成功檔案，包含 10 份 Skill、2 份 companion 及安裝／評分／設定等來源；長檔按相關段落抽樣，不是全庫稽核 |
| Repomix | Skipped：採唯讀原始碼／API 研究，不建立 cache、不執行套件；沒有 token metrics |
| 文件站 | 官網已讀；Defuddle CLI 未在 PATH，未安裝，以既有 web 讀取替代 |
| AST | Skipped：遠端 repo 無本地已驗證索引；原始碼閱讀不冒充 AST |
| 社群與 YouTube | Skipped：219 stars，未達 Skill 的 1K 觸發條件；無使用者口碑結論 |
| 上游測試 | 未執行。讀到 installer.test.ts 的 5 個測試及 Ubuntu CI 設定，不宣稱它們本次通過，也不推論 Windows 安裝成功 |
| 實際工具與 Skill 成效 | 未安裝 CLI/MCP、未跑範例、未做真人或模型行為驗證 |
| 抓取缺口 | 曾嘗試 packages/web/src/lib/db/seed.ts，404；不以該路徑推論 registry 資料來源或評分生成流程 |
| 暫存與清理 | 未建立 repo checkout、npm cache 或原始碼暫存檔；不需要刪除 |

[上游測試](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/packages/cli/src/lib/installer.test.ts)、[CLI CI](https://github.com/PramodDutta/qaskills/blob/ee81c5b16b8c22933b79e8d9a23e130bce29a847/.github/workflows/cli-ci.yml)。本報告驗證器只能驗文件結構，不能證明上游功能。

## 相關連結

- [[QA/一人軟體測試公司 — 架構與工作流程]]
- [[QA/一人軟體測試公司 — 顧問團架構審議與角色分工]]
- [[QA/QA Decision Desk Playbook 改造加強計畫]]
- [[AI-一人公司/_index]]
- [[Github/_index]]
