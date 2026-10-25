---
source: "https://github.com/markfulton/ai-employees"
author: "markfulton (Mark Fulton)"
stars: "748"
clipped: 2026-10-23
tags:
  - github/repo
  - ai-company
  - scheduled-tasks
  - evidence
---

## ai-employees — 八角色排程工作包與公司採用評估

> **⏳ 暫不整套安裝；值得參考成果判定、續跑與升級保護的方法。**
> 查核：2026-10-23，Asia/Taipei。固定 SHA：`7b0d076e0db103216455b2b42e6764d6f863bdcd`，package 1.9.0。
> 兩個 Subagents 分別做核心流程與安裝／權限的唯讀審核；主模型另跑六組離線檢查及隔離案例。未安裝員工、註冊排程、登入帳號或操作外部網站，未驗證真模型工作品質與商業成效。

## 一句話說明

這是一套給現有 AI harness 執行的八種商務角色工作包，每個角色帶有指令、例行工作、排程表、狀態腳本與驗收文件。它比單純角色提示詞完整，但需要目前使用的代理工具承擔排程、瀏覽器操作與權限控制；不能只下載資料夾就視為公司已上線。

## 專案概覽

| 項目 | 本次取得值 |
|---|---|
| Repository | markfulton/ai-employees |
| Stars / Forks | 748 / 211，公開 REST API 快照；網頁快取為745 / 210，採API值 |
| Watchers | 9 |
| 主要語言 | JavaScript |
| 授權 | MIT；名稱與商標另依 TRADEMARKS.md，不能從程式授權推定可沿用品牌 |
| 建立時間 | 2026-09-02T18:47:36Z |
| 最後推送 | 2026-10-23T04:12:21Z；與固定commit日期分開看 |
| 固定commit日期 | 2026-10-14T16:23:35Z |
| Open Issues / PRs | 2 / 7，open_issues_count=9包含PR |
| 最新 Release | 公開releases API為空；package／plugin宣告1.9.0，SEO kit另為1.10.0 |
| 主分支 / Archived | main / false |
| Repository size | 11,064 KiB，GitHub metadata |
| Homepage | 空值；沒有觸發獨立文件站擷取 |
| Runtime | Node >=18；package沒有宣告外部dependencies |
| Topics | ai-agents、ai-employees、automation、claude-code、codex、scheduled-tasks、small-business等 |

來源：[REST API](https://api.github.com/repos/markfulton/ai-employees)、[固定原始碼](https://github.com/markfulton/ai-employees/tree/7b0d076e0db103216455b2b42e6764d6f863bdcd)、[package.json](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/package.json)、[TRADEMARKS.md](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/TRADEMARKS.md)。

## Repomix 深度分析

Repomix 1.18.1 對固定SHA的本機副本打包，使用 `--no-gitignore`、未壓縮，exit 0。共393個打包檔、2,260,774 tokens、9,399,547字元。多個角色各自帶完整contract與共用腳本副本，打包量包含重複文件，不代表每次執行都要讀完整repo。

| Top 5 | Tokens | 佔比 |
|---|---:|---:|
| employees/sales-employee/CONTRACT.md | 29,323 | 1.3% |
| employees/customer-satisfaction-employee/CONTRACT.md | 28,275 | 1.3% |
| employees/chief-of-staff/CONTRACT.md | 27,327 | 1.2% |
| employees/web-dev-employee/CONTRACT.md | 26,667 | 1.2% |
| employees/ad-manager-employee/CONTRACT.md | 26,600 | 1.2% |

安全掃描排除 `employees/web-dev-employee/scripts/copy-check.mjs`。另用相同Secretlint preset定位到第741行的database-connection-string，位於 `selftest()` 的 `leakyLogLine` 測試字串。該檔已另外讀取並跑自測；這次命中屬測試資料，沒有把連線字串複製到報告。這不等於對整個repo做出「無敏感資訊」保證。二進位素材與被排除的檔案不在XML中，分析另以原始碼補足。

## 核心功能

| 角色 | routines | 用途 |
|---|---:|---|
| GTM Engineer | 8 | 定位、上市工作板、外聯草稿與scoreboard |
| SEO/AEO | 8 | 選詞、文章、索引、排名與AI可見度觀察 |
| Web Dev | 8 | 網站健康、問題分流、分支上的小改動與依賴檢查 |
| Social Media | 7 | 平台草稿、審稿與發布前等待窗口 |
| Ad Manager | 7 | 廣告讀取、素材、build sheet及變更清單 |
| Sales | 7 | 潛客發現、首次聯繫草稿與追蹤 |
| Customer Satisfaction | 8 | 收件匣分流、回覆草稿與流失風險 |
| Chief of Staff | 7 | 彙讀角色執行紀錄、找交付停滯與整理優先事項 |

兩個Subagents與主模型的檢查共同確認8角色／60 routines的manifest、profile與SKILL檔對得上。角色檔不是獨立模型；實際由目前的harness依指令執行。來源：[employees](https://github.com/markfulton/ai-employees/tree/7b0d076e0db103216455b2b42e6764d6f863bdcd/employees)、[work-cycle-check](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/.github/scripts/work-cycle-check.mjs#L15)。

## 技術架構

```text
hire CLI -> 複製單一kit -> receipt與baseline -> 本機selftests
                       |
                 INSTALL-PROMPT
                       |
             harness設定排程與可用連線
                       |
              guard：窗口、period、claim
                       |
           routine SKILL + ROLE + CONTRACT
                       |
        草稿／待審工作 + runlog + progress receipt
                       |
          Chief of Staff彙讀 -> brief／缺口
```

| 層次 | 原始碼與責任 |
|---|---|
| Installer | installer/cli.mjs；hire、doctor、upgrade、reconcile等命令 |
| 員工包 | employee.json、ROLE.md、CONTRACT.md、SCHEDULE.md、RELEASES.md、routines/ |
| 例行入口 | guard.mjs檢查日期、窗口、當期狀態、PAUSED及claim |
| 執行所有權 | shared/work-cycle/run-state.mjs，以wx claim、token與lease記錄續跑額度 |
| 成果與交接 | work-cycle.mjs提供progress、experiment、handoff等驗證與記錄 |
| 發布權限 | harness permission layer及使用者授權；repo沒有自己的外發攔截器 |
| 升級 | upgrade.mjs維護來源baseline與本地修改；reconcile.mjs做保守三方合併 |

結構判讀來自實際原始碼；本次沒有對下載副本建立CodeGraph索引，未將文字搜尋稱為AST。主模型以 `node --check` 檢查55份.mjs語法，23份JSON解析通過。

## 值得參考的方法

**1. 分開記執行、交付與商業結果。** 成功跑完routine不等於產物合格，也不等於成交或成長。程式要求交付有artifact、blocker有owner與下一次檢查點，商業結論另附result evidence；這適合拿來檢查既有品質流程的缺口。來源：[WORK-CYCLE.md:37](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/shared/work-cycle/WORK-CYCLE.md#L37)、[validateProgress:100](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/shared/work-cycle/work-cycle.mjs#L100)。

**2. 阻塞只擋依賴它的工作。** `chooseWork()` 先排除未授權、不是自己的工作、過期或輸入未備齊的候選，再選能防止損失、完成承諾或解除其他阻塞的工作。發布未核准時，仍可完成本地草稿與驗證；這是既有產線可比對的方法，不需要新增另一套工作板。來源：[chooseWork:29](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/shared/work-cycle/work-cycle.mjs#L29)。

**3. 原子領取與保留剩餘額度。** `claimRun()` 用排他鎖與token避免兩個同時開始的程序都取得工作；partial按已耗時間扣額度。過期但未完成的當期工作採保守處置，避免一直重試而重置budget。這比只寫「今天已跑」完整；但它不提供外部副作用的exactly-once保證。來源：[run-state.mjs:22](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/shared/work-cycle/run-state.mjs#L22)。

**4. 升級保護使用者資料。** kit／member／merge三分類配合來源hash、真實baseline與`.new`候選，已改檔案不直接覆蓋；三方合併保留非重疊變更與Corrections。排程與使用者資料不因升級一併套用。主模型已跑過重複升級、衝突與缺baseline的離線檢查。來源：[upgrade.mjs](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/installer/upgrade.mjs)、[reconcile.mjs](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/installer/reconcile.mjs)。

## 重要風險與實際限制

### 成果驗證仍需要內容驗收

主模型在隔離fixture寫一份只有TODO與日期的非空文字，`validateProgress()` 接受 delivery=completed；隔天只改日期，`deliveryHealth()` 回報on-track、未進展期數0。這證明工具確認的是檔案存在、非空與hash變更，沒有判斷內容是否完成任務。文件要求實質成果，但需模型或獨立驗收補足，不能把verified_artifacts誤讀為使用者驗收通過。來源：[validateProgress及deliveryHealth](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/shared/work-cycle/work-cycle.mjs#L100)。

### deadline沒有強制結束工作

隔離案例中，1分鐘lease在deadline之後呼叫 `finishRun(..., completed)` 仍被接受。deadline是claim與續跑帳務的一部分，沒有殺掉超時worker或阻止其繼續操作外部服務。舊worker遇到新token後不能合法finish，不等於其所有副作用都被阻擋；需要harness的時間與權限限制。來源：[finishRun:49](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/shared/work-cycle/run-state.mjs#L49)。

### 安裝自測失敗仍可能exit 0

`selftests()` 只回傳布林值；hire將失敗附在輸出提醒，main的hire分支仍 `process.exit(0)`。依exit code接後續自動化會誤判成功。這項由子代理定位、主模型讀回確認，未執行完整hire重現，避免接觸真實auth或安裝。來源：[cli.mjs:128](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/installer/cli.mjs#L128)、[hire結尾與dispatch](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/installer/cli.mjs#L176)。

### 安裝、權限與自我修正不是純文件動作

- 有bundled kit時hire先複製；缺少時下載tag，失敗可改抓main，未做commit pin或checksum，接著執行下載包內每支script的selftest。因此安裝會跑程式，不能當成只收藏Markdown。[cli.mjs:98](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/installer/cli.mjs#L98)
- SECURITY明確說repo沒有額外permission gate，guard只管排程與重複執行。外發限制依賴harness權限與模型服從，不能因RELEASES預設空白就宣稱已強制禁止所有外發。[SECURITY.md:3](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/SECURITY.md#L3)
- 部分routine容許修正自身指令甚至調整cadence並重新註冊job，另一些角色有不同限制。移植時必須沿本機既有的指令與排程授權，不能照上游自動擴權。[Ads例行修正段落](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/employees/ad-manager-employee/routines/ads-account-read/SKILL.md#L769)
- handoffInbox會核對明示root、身份、欄位白名單與當次重複ID，但跨次接收與source revision的閉環仍有指令層責任，不能把它當成完整訊息佇列。[handoffInbox:74](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/shared/work-cycle/work-cycle.mjs#L74)

Subagent另提出upgrade路徑與錯角色目標缺少一致檢查的靜態風險；本輪未重現junction越界、錯角色升級或中斷的多檔交易，不列為已證實事故。

## 社群健康度

公開API取得56筆commit，一位列名contributor `markfulton`（56 contributions），沒有GitHub Release。最近四個commit_activity週總數依序為4、1、1、0，最後一週可能尚未完整；不由此推定專案停止維護。main有CI workflow，六組檢查與本輪離線執行項目一致；未另把遠端CI狀態當本機驗收。

Issue #3針對舊1.7.0提出連續升級覆蓋、並行啟動與中斷恢復問題。現版1.9.0已有真實baseline、原子claim及對應回歸檢查，本輪通過；不能把舊issue每項當成目前仍可重現。Issue仍open也不等於尚未修正。來源：[Issue #3](https://github.com/markfulton/ai-employees/issues/3)、[CHANGELOG](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/CHANGELOG.md)、[CI](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/.github/workflows/no-dashes.yml)。

## 社群口碑與成本

748 stars未達repo-intel的1000門檻，未啟動agent-reach與YouTube；homepage空白，未啟動defuddle。此處不推論沒有使用者或口碑不好。

COST.md列有作者單一員工、特定日期與harness的歷史用量，並承認不是各種環境的保證。這輪未核實該模型、訂閱、單價或原始帳單，不拿文件中的金額當現價，也不把某一員工的占比推到八員工或本機Codex。文件也說自動把CLI token與費用附入run紀錄的接線尚未完成，因此本機實際費用、配額、耗時均為Unknown。來源：[COST.md](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/docs/COST.md)。

## 與現有系統的相關性評估

| 面向 | 本次判斷 |
|---|---|
| Obsidian | 可收藏方法與比較證據；不應在vault再複製八套state／progress／handoffs／strategy，避免多本帳。 |
| Codex | 上游HARNESSES的Confirmed是作者相容性主張。本輪只驗Node與本機腳本，未驗Codex排程、瀏覽器、連線或權限；不自動新增排程。 |
| 現有公司 | 已有角色、HUB、quality-gate、nightshift與排程來源。nightshift現行方法也要求完整來源與成果核對，不能將相近概念重複列為全新能力。可從本次反例檢查既有驗收是否仍只看產檔或成功狀態。 |
| 更新與維護 | baseline與member保護有借鏡價值，但需先比對既有更新器；沒有證據顯示需另換更新機制。 |
| 工作台 | 原有暫停決定維持；本報告不恢復開發、不建立第二套公司。 |

本機適用性取自本輪讀到的既有規範、nightshift與quality-gate文件；這是文件比對，未跑現有公司全量行為驗收。上游harness宣稱見[HARNESSES.md](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/docs/HARNESSES.md)。

## 安裝建議

**⏳ 暫不整套安裝，也不新增hire Skill或60個排程。**

先保留三個可研究方向：把「已跑／已交付／有成效」拆開、阻塞時完成仍有授權的獨立工作，以及升級保留使用者修改。這些都先對照既有方法是否已有，不因外部repo提供了完整名詞就另建帳本或角色。若日後要採用，應選一條實際失敗路徑，先做條文前後對照與隔離驗收，再決定最小接入；本輪只研究與存檔，沒有實作接線。

## 驗證結果與邊界

| 本輪檢查 | 結果 |
|---|---|
| Repomix固定版打包 | exit 0；393檔／2,260,774 tokens；1個測試字串命中檔另讀 |
| selftests.mjs | exit 0；43個helper自測呼叫成功，非43個真模型情境 |
| no-dashes.mjs | exit 0 |
| aeo-check.mjs | exit 0 |
| work-cycle-check.mjs | exit 0；8角色60例行、claim競爭、交接與停滯fixtures等 |
| upgrade-check.mjs | exit 0；連續升級、baseline、合併、衝突、member保護等 |
| release-check.mjs | exit 0；package／plugin／manifest與版本關聯 |
| node --check | 55份.mjs語法通過 |
| JSON解析 | 23份通過 |
| 追加限制案例 | TODO被接受為完成、只改日期後on-track、deadline後finish被接受，三項均觀察到 |
| 原始碼保護 | 六組離線測試前後全檔hash一致 |

以上由主模型在task-local副本執行，TMP／TEMP限本次目錄，沒有npm install、hire、doctor登入檢查或外部操作。兩個Subagents只讀、不再委派、不改檔。測試是標準函式庫與本機fixtures的驗證；[BEHAVIOR-EVALUATION.md](https://github.com/markfulton/ai-employees/blob/7b0d076e0db103216455b2b42e6764d6f863bdcd/docs/BEHAVIOR-EVALUATION.md)也要求真模型另做隔離驗收。本輪未跑該模型驗收，不能宣稱員工能自動產出好內容或帶來成效。

原始碼、API快照、XML、各組檢查log、追加案例與索引修改前備份保留於本工作目錄 `work/repo-intel/ai-employees/`。未獲清理授權，未刪除；報告與索引不含真實帳號資料。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[AI-一人公司/_index|AI一人公司研究入口]]
- [[AI-一人公司/AI Hero — 兩家公司補強再審視|兩家公司既有能力與驗收研究]]
- [[AI-一人公司/useful-ai-prompts — 提示詞素材與公司知識接入評估|先取方法的接入比較]]
- [固定來源](https://github.com/markfulton/ai-employees/tree/7b0d076e0db103216455b2b42e6764d6f863bdcd)
