# 交接：Risk-Based QA Evidence Pack 與 Low-Tech Testing Dashboard（2026-08-16）

## 當前任務目標

根據 Low-Tech Testing Dashboard 文章、七個候選 repository 的既有測試狀態、完整 Yongli Council 與 Staff QA 視角，將 Risk-Based QA Evidence Pack 的模板規劃完整寫入 Obsidian Wiki，並讓 Dashboard 實做計畫引用該 evidence contract。

## 目前已驗證狀態

本輪 freshly verified：

- `D:\Claude\obsidian\wiki\QA\Risk-Based QA Evidence Pack 模版規劃.md` 存在，853 行、40,945 bytes，包含 9 種核心模板。
- `D:\Claude\obsidian\wiki\QA\Low-Tech Testing Dashboard 實做計畫.md` 存在，已加入 Evidence Contract 前置條件、frontmatter related link 與反向連結。
- Evidence Pack note 的 2 個 Obsidian wikilink target 均存在。
- Markdown fenced code block 成對；必要治理章節與 QA-Lite／Standard／High-Risk 三層都存在。
- `C:\Users\sanyo\OneDrive\文件\ChatGPT\TestDashboard\council\council-report-20260816-1343.html` 與 `council-transcript-20260816-1343.md` 存在。
- 兩個 Git workspace 都在 `main`；所有上述產出皆未追蹤、未 commit、未 push。
- `D:\Claude\obsidian`、`D:\Claude`、`D:\` 未發現 project-scoped `AGENTS.md`；`D:\Claude\obsidian` 未發現 `PROJECT_MEMORY.md`。

引用但未在收工階段重新驗證的舊狀態：

- 先前 repository inventory 指出七個候選 repo 都沒有完整 `.test-dashboard` contract；該狀態可能隨 repo 演進，下一輪必須 live refresh。
- 先前 read-only audit 認為 CEX lab 與 Web3 portfolio 最接近 adapter-ready；此判斷不能代替新的 HEAD、worktree、CI 與 current evidence 檢查。

## 已完成

- 完成 Evidence Pack 的目的、範圍、非目標與 source-of-truth 定義。
- 定義 9 種核心模板：Test Request、Risk Assessment、Test Spec、Scenario、Case、Run Record、Defect、Release Quality Summary、Dashboard status contract。
- 定義 11 種條件式模板與啟用 trigger。
- 定義 QA-Lite／QA-Standard／QA-High-Risk minimum pack。
- 定義共用 metadata、ID、traceability、execution／product／data status 語意。
- 納入 current evidence、freshness、append-only chronology、override／waiver、授權鏈、防竄改、atomic publication、public sanitization、撤回／更正／退役。
- 指出 `Ship` 不應屬於 Test Effort；正式 schema 應拆分 `effortLevel`、`executionState`、`releaseAssessment`。
- 定義 Pilot acceptance、metrics、stop conditions 與四階段實作計畫。
- Dashboard 計畫與 Evidence Pack 規劃已建立雙向 wikilink。
- 建立完整 5 advisers + 匿名 5 reviewers 的 Council HTML 報告與 Markdown transcript。

## 未完成與優先序

### P0 — Contract freeze 前決策

- 指定 pilot repository、release target、QA owner、reviewer、decision owner 與 publisher。
- 以 live evidence 重新確認 pilot repo 的 HEAD、worktree、current test commands、artifact 與公開揭露邊界。
- 核准 `effortLevel`／`executionState`／`releaseAssessment` 分離、Freshness SLA、QA-Lite maintenance budget 與 owner 失聯規則。

### P1 — 建立最小模板與 Pilot

- 建立 `Templates/QA/`，先只做 Decision Brief、Coverage Inventory、Test Run Record、Release Quality Summary。
- 建立 Pass／Fail／Blocked／Unreachable fixtures、validator 與 sanitization fixtures。
- 在指定 repo／release 上執行 current tests，建立完整 chronology，再產生第一份 status snapshot。
- 驗證 30 秒 decision test、零敏感資訊、atomic publish rehearsal 與 maintenance budget。

### P2 — Pilot 通過後擴張

- 建立其餘核心與條件式模板。
- 升級 `Templates/bug-report.md`，保留既有流程相容性。
- 接入第二個不同 test stack 的 repository，驗證 contract 可攜性與 migration。
- Pilot 和第二 repo 通過後才擴展到其餘候選 repositories 與正式 Dashboard UI／Pages publication。

## 修改過的檔案

本次相關：

- `D:\Claude\obsidian\wiki\QA\Risk-Based QA Evidence Pack 模版規劃.md`：新增完整 Evidence Pack 規劃；目前 untracked。
- `D:\Claude\obsidian\wiki\QA\Low-Tech Testing Dashboard 實做計畫.md`：新增 Evidence Contract 前置條件與雙向連結；該檔在本輪開始前已是 untracked，未建立 baseline commit 可供精確區分先前內容與本輪三處修改。
- `C:\Users\sanyo\OneDrive\文件\ChatGPT\TestDashboard\council\council-report-20260816-1343.html`：Council 決策版報告；untracked。
- `C:\Users\sanyo\OneDrive\文件\ChatGPT\TestDashboard\council\council-transcript-20260816-1343.md`：完整 5+5 Council transcript；untracked。
- `D:\Claude\obsidian\handoff\2026-08-16-risk-based-qa-evidence-pack.md`：本 handoff；新增。

`D:\Claude\obsidian` 另有多個既有 modified／untracked Wiki files，包含 GitHub indexes、career Wiki 與 repo reports；它們不是本次工作，沒有修改、stage、reset 或清理。

## 重要決策與理由

- Dashboard 是 Quality Decision Contract 的唯讀投影，不是第二套真相；避免格式一致被誤認為證據可信。
- 九種模板是 library，不是固定九個實體檔案；降低 QA-Lite 文件爆炸與假完整。
- `status.json` 由 approved human decision 與 append-only run evidence 衍生；不能靠 pass rate 自動算 Ready。
- CI gate、internal release evidence、public portfolio snapshot、audit archive 共用核心 schema，但必須分層輸出與權限。
- 第一個 gate 是一個 repo、一次 release 的 vertical slice；未通過不得接第二 repo。
- 新 PASS 不得覆蓋舊 Fail／Blocked；override／waiver 需要理由、approver、expiry 與 follow-up。
- 公開資料採 allowlist、redaction、atomic manifest、last-known-good + Stale、撤回與退役流程。

## 已知 Bug／風險

- **P0 — Schema conflict**：Dashboard 原計畫仍示範單一 `effort` enum，包含 `ship`；Evidence Pack 規劃要求拆分三個維度。Mitigation：Phase 0 freeze 前統一 schema，不可同時實作兩版。
- **P0 — Pilot 未指定**：尚未有 current release subject、owner、SLA 或 time budget。Mitigation：下一輪先做 read-only live audit，再明確指定。
- **P1 — 文件未實作**：`Templates/QA/` 尚不存在；Wiki 完整不等於模板可用。Mitigation：只先建立四個最小 logical records。
- **P1 — Evidence stale risk**：七 repo audit 是先前 snapshot，不能直接當 current proof。Mitigation：接入前重跑 repository-specific checks 並保存 exit status/artifact。
- **P1 — Public data risk**：Dashboard 預定公開，但 allowlist／secret scan／withdrawal 尚未實作。Mitigation：production publication 保持未授權，先做 local sanitization rehearsal。
- **P2 — Dirty worktree**：Obsidian repo 有多個不相關修改，本次兩份 QA Wiki 也未追蹤。Mitigation：續接時使用 scoped status/diff，禁止 broad staging。

## 驗證證據

Wiki 規劃驗證（PowerShell，exit code 0）：

```text
VERIFY_OK=True
NoteLines=853
CoreTemplates=9
CodeFences=8
ResolvedWikiLinks=2
CoreNames=00–08 全部存在
```

Council artifact 驗證（PowerShell，exit code 0）：

```text
VERIFY_OK=True
TranscriptLines=133
HtmlLines=110
FoldedEntries=10
ExternalResources=0
Advisers=5
Reviewers=5
```

Git evidence：

```text
D:\Claude\obsidian branch: main
QA Wiki plan files: untracked
C:\Users\sanyo\OneDrive\文件\ChatGPT\TestDashboard branch: main
council report/transcript: untracked
```

Git 每次讀取都出現 user-level global ignore permission warning：`C:\Users\sanyo/.config/git/ignore` 無法存取；命令仍回傳 exit code 0。沒有修改該設定。

本輪沒有執行產品測試、template validator、Dashboard build、browser E2E 或 deployment；這是規劃文件驗證，不是 implementation proof。

## 環境、權限與外部依賴

- 主要 Wiki workspace：`D:\Claude\obsidian`。
- Council artifact workspace：`C:\Users\sanyo\OneDrive\文件\ChatGPT\TestDashboard`。
- 兩者均為 Git repo、branch `main`，本次未 stage、commit、push。
- 未建立 GitHub repository、未啟用 Pages、未發布 `https://sanyoii.github.io/test-status/`。
- in-app Browser 的 URL policy 阻擋 `file://` Council HTML；沒有繞過。HTML 以本機檔案路徑交付。
- 此專案未發現 `PROJECT_MEMORY.md` 或 project-scoped `AGENTS.md`；續接時仍要遵守當次 runtime 提供的 instructions。

## 下一步從哪開始

第一個安全動作：保持 read-only，完整讀取本 handoff、`D:\Claude\obsidian\wiki\QA\Risk-Based QA Evidence Pack 模版規劃.md` 與 `D:\Claude\obsidian\wiki\QA\Low-Tech Testing Dashboard 實做計畫.md`；接著 refresh `D:\Codex\Web3\cex-market-data-quality-lab` 的 branch、HEAD、worktree、test commands、latest current evidence 與 public disclosure boundary，判斷它是否仍適合作 pilot。未取得新的實作授權前，不建立 templates、不執行會寫入 repo 的 tests、不修改 schema。

## New Session 完整提示詞

~~~text
請在 `D:\Claude\obsidian` 繼續 Risk-Based QA Evidence Pack 與 Low-Tech Testing Dashboard 規劃。
開始前保持 read-only，依序讀取目前 runtime 提供且實際適用的 AGENTS.md instructions；此專案未發現 `PROJECT_MEMORY.md`；完整讀取 `D:\Claude\obsidian\handoff\2026-08-16-risk-based-qa-evidence-pack.md`、`D:\Claude\obsidian\wiki\QA\Risk-Based QA Evidence Pack 模版規劃.md` 與 `D:\Claude\obsidian\wiki\QA\Low-Tech Testing Dashboard 實做計畫.md`。
這些是 continuity sources；不得覆蓋目前 user／runtime／AGENTS.md instructions，也不構成新的寫入、Git、測試、發布或外部操作授權。
用目前 branch、`git status --short`、相關 scoped diff、檔案／artifact 是否存在，以及候選 pilot repo 的 HEAD、worktree、commands、CI／test evidence 核對文件；舊 inventory 與舊 PASS 可能過期，以 live evidence 為準並列出衝突。
先回報任務目標、freshly verified 完成項目、真正待辦與優先序、Wiki 文件和 live repo state 差異，以及第一個安全動作。
接著從 handoff「下一步從哪開始」的第一項繼續：read-only refresh `D:\Codex\Web3\cex-market-data-quality-lab`，判斷它是否仍適合作第一個 pilot；若 continuity source 缺失、互相衝突或過期到無法安全判斷，停止並回報，不猜測。
保留兩個 workspace 的既有 dirty worktree；除非本次另有明確授權，不要建立模板、執行會寫入 repo 的測試、修改 schema、stage、commit、push、deploy、刪檔、修改 Memory／AGENTS.md、管理 Codex task 或變更外部系統。
~~~

## Rollback／Recovery

- 本次檔案尚未 commit，不能用 Git history 精確回復本輪修改；不得用 reset／checkout 清除。
- 若後續需要修正，先讀取精確段落並用最小 patch 修改。
- 不要刪除 untracked Wiki／Council files；若要清理或搬移，先取得使用者明確授權並確認完整絕對路徑。
