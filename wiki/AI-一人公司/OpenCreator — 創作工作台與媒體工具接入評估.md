---
source: "https://github.com/krillinai/OpenCreator"
author: "krillinai"
stars: "11600"
clipped: 2026-09-19
tags: [github/repo, ai-company, media, codex]
---

# OpenCreator — 創作工作台與媒體工具接入評估

## 一句話說明

OpenCreator（前身 KrillinAI）是在 Codex 執行引擎周圍建立的完整創作工作台，結合字幕、配音、圖像、影片與文章工具，以及自己的專案、對話、記憶、排程和核准管理。對目前一人公司最有價值的是媒體工序、產物來源版本和失敗恢復設計；暫不建議替換 Codex 桌面或公司主流程。

本頁保存 2026-09-19 已完成的 repo-intel 分析。使用者已明確授權寫入 Wiki；不代表授權安裝、執行上游程式、存取登入資料、呼叫模型、接入公司或公開發布。

## 專案概覽

數據為分析當時快照，存檔不代表重新查詢即時狀態。原始碼固定為 `bb7586c0a88ce0bf30a703a62063234892cb9518`。

| 項目 | 數值 |
|---|---|
| Stars | 11,600 |
| Forks | 1,137 |
| 主要語言 | TypeScript；另有 Go、CSS、JavaScript、HTML |
| 授權 | GitHub API license=null；檔案樹未見根 LICENSE；runtime/krillinai/LICENSE 為 GPL v3，部分模板與字型另有授權。整體應用範圍未確認 |
| 建立時間 | 2024-12-17T01:59:22Z |
| 最後推送 | 2026-09-19T14:19:25Z，查詢時 |
| 未結事項 | API open_issues_count=30，包含 PR，不能當作純 Issue 數 |
| 最新 Release | v3.2.0，2026-09-11T16:00:04Z |
| master 與 Release 差異 | 固定 commit 的 Desktop package version 為 3.2.1，不當作已發布版本 |
| Archived | false |
| 獨立 homepage | API 為空；文件位於 repo |
| 檔案樹 | 1,891 個 blob；API tree 未截斷，並非 Repomix 分析檔案數 |

來源：[GitHub API](https://api.github.com/repos/krillinai/OpenCreator)、[固定版本](https://github.com/krillinai/OpenCreator/tree/bb7586c0a88ce0bf30a703a62063234892cb9518)、[Release](https://github.com/krillinai/OpenCreator/releases/tag/v3.2.0)、[Runtime LICENSE](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/runtime/krillinai/LICENSE)。

## Repomix 深度分析與證據範圍

本次採遠端唯讀原始碼抽查，未 clone、未執行 Repomix、未建立 npm cache 或安裝套件。沒有 token 指標、Top 5 token 檔案數據或 AST 證據。透過 GitHub API 取得完整樹，再讀取固定 commit 的 package、啟動、認證、版本、媒體驗證、供應商請求、CI 和 CLI 方法文件；不是全庫逐行安全稽核。

gh 初次因 sandbox 無法讀取設定而失敗；取得唯讀工具權限後，metadata／releases／contributors 查詢成功。後續原始碼由公開 raw URL 讀取。

## 核心功能

| 功能 | 已讀證據與限制 |
|---|---|
| 字幕與翻譯 | 方法提供平台字幕優先、Whisper 備援、雙語 SRT、短直式字幕；需相應素材與服務設定 |
| 配音與橫直式輸出 | tts、render-horizontal、render-vertical 各自執行，使用共同 workdir 與 manifest |
| 生圖、封面、生影片、文章和短片腳本 | README 列有功能，daemon 有相應 executor 接線；未做供應商實測 |
| 火柴人動畫 | daemon 有音訊、圖像、時間軸、Remotion、媒體驗證及交付 executor；未實際產片 |
| 產物版本比較 | stage-runner 建立結果快照；文件描述來源、stale 及文字／媒體並排比較 |
| 自動剪輯／數位分身 | 查詢時 README 標 In development；部分程式碼存在不代表完整交付 |

[字幕方法](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/skills/krillinai-subtitle/SKILL.md)、[服務接線](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/api/server.ts)、[版本設計](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/docs/creator-artifact-versions.md)。

## 技術架構

```text
React 18 + Vite Web UI / Electron Desktop
                 ↓ Runtime API / SSE
Fastify daemon + SQLite + 本機檔案
        ├─ Codex app-server：對話、工具、核准
        ├─ Creator stage-runner：工序、來源、結果快照
        └─ 媒體 executor：KrillinAI Go CLI / FFmpeg / yt-dlp / 模型服務
```

依 package 與 server.ts import／初始化接線判讀，未啟動驗證。依賴含 better-sqlite3、React、Fastify、Electron、Remotion renderer。原始碼開發路線需要 Node.js 22、pnpm 9.15.0，建置另涉及 Go 與媒體 runtime；桌面安裝的條件不能直接套用原始碼開發條件。

[根 package](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/package.json)、[Daemon package](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/package.json)、[Desktop package](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/desktop/package.json)、[Web package](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/web/package.json)。

## 最值得借鏡的設計

### 分段執行、保留成功工序

字幕、配音與渲染各自執行，失敗時保留成功輸出，依 manifest 判斷要重跑哪一步。適合字幕完成但渲染失敗的情境，避免重做全部付費工作。

### 產物來源與有效性分開

stage-runner 保存結果快照及來源資訊；版本文件區分目前選中的版本與仍有效的版本。來源缺失或 stale 明示，不因目前選中就判定有效。

### 供應商是否收單不明的處理

provider-requests.ts 將 unknown_remote_acceptance 獨立保存，reconcile 嘗試查 remoteTaskId／request key；confirmResubmit 另建 generation 並保存 resubmissionOf。值得參考，但未追完所有 provider adapter，不保證全部供應商都可避免重複扣款。

[工序實作](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/creator/stage-runner.ts)、[請求狀態](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/creator/provider-requests.ts#L124)。

## 接入限制與待確認項目

1. **CLI pipeline 只有 dry-run。** krillinai-pipeline 方法明示非 dry-run 回 unsupported_command；計畫成功不代表產片完成，實際需逐步核對 terminal JSON、manifest 與檔案。這是 CLI pipeline 限制，不代表所有 Web 流程都不能執行。[方法原文](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/skills/krillinai-pipeline/SKILL.md)
2. **獨立目錄仍可能接觸既有憑證。** main.ts 正常啟動建立獨立 codexHome；未指定自訂 home 且目錄空白時，helper 會複製來源 auth.json 與白名單設定。server.ts 再將所選 home 的 cli_auth_credentials_store 設為 file。不能宣稱一定改全域 Codex，也不能稱完全不碰登入資料。需核對實際 home、Windows 檔案權限與保留行為。[啟動](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/main.ts#L80)、[複製 helper](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/codex/probe-home.ts)、[憑證設定](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/codex/credential-storage.ts)
3. **本機保存不代表全程離線。** 原碼有 127.0.0.1 監聽、Bearer token 與 Web origin 控制；不是完整安全保證。ASR／TTS／生成服務依設定外送資料與計費，需按供應商核對。[API auth](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/api/auth.ts)、[server](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/apps/daemon/src/api/server.ts#L298)
4. **版本比較不等於公司的回饋契約。** 文件描述文字按行號高亮且不做智慧對齊；本輪未證實匿名 A/B/C、feedbackId、逐條處理與使用者驗收交換契約。不能直接替換 draft-review。[比較範圍](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/docs/creator-artifact-versions.md#L4)
5. **Windows 發行檔未簽章。** v3.2.0 提供桌面 exe、CLI zip、SHA256SUMS，但明示未 Authenticode 簽章。雜湊核對不是病毒掃描；本輪未下載二進位。[Release](https://github.com/krillinai/OpenCreator/releases/tag/v3.2.0)
6. **文件版本有落差。** README 稱 Desktop 包含 Codex CLI，舊 Windows 文件仍要求預裝；應以選定 release 實物確認，不能混用。[Windows 文件](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/docs/operations/opencreator-desktop-windows-release.md)
7. **整體再散布授權未釐清。** 不能把 runtime GPL v3 擴推到所有 App、模板、字型和媒體素材；目前不支持直接複製進公司可攜包。本頁沒有提供再散布法律結論。

## 社群健康度

歷史包含 KrillinAI，星數與貢獻統計不能直接代表新版工作台成熟。API 前十 contributor 為 maranello-o、wulien、puji4810、krillinai、PairZhu、Mijaelx、DLe-kb、github-actions[bot]、OutisLi、yeager，不以此推論現職或責任。

有 CI／單元／E2E 檔案。檔案樹掃描找到 399 個以 test/spec 命名的程式檔（含 Go `_test.go`），不是 399 個通過案例。查詢時固定 commit 的 CI 為 in_progress，前兩次查詢結果為 failure；未調查原因，不據此判定本版已壞或已通過。近四週 commit_activity 未取得。

[CI workflow](https://github.com/krillinai/OpenCreator/blob/bb7586c0a88ce0bf30a703a62063234892cb9518/.github/workflows/ci.yml)、[固定 commit CI](https://github.com/krillinai/OpenCreator/actions/runs/35448366809)。

## 社群口碑與驗證限制

agent-reach／mcporter 未在本輪 PATH 查得，改用公開網頁搜尋。主要結果為 README／設計文件整理，未取得足以判定新版長期穩定性的獨立使用證據；Wiki 不保留短期討論摘要。未做 YouTube 教學調查；homepage 空白，未啟動獨立文件站 Defuddle。

未執行上游 tests、App、CLI、模型、真媒體生成、病毒掃描或登入複製；沒有端到端、效能、Windows 相容性、繁體輸出或完整安全背書。報告格式檢查不代替上述功能驗證。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| 一人公司與 Codex | 專案、角色、記憶、排程高度重疊；不建議替換公司真相來源 |
| Obsidian Wiki | 保存研究、來源與核准交付指標；不讓兩套 Memory 自動互寫 |
| 字幕／配音 | 相對值得獨立試用 CLI，核對服務、費用、品質與分段重跑 |
| draft-review | 保留匿名與逐條回饋契約，可參考來源與 stale 呈現，不假設資料相容 |
| 視覺確認 | 沿用先產圖片選方向、確認後實作，不因更換工具取消 |
| Automation | 借鏡失敗恢復，不新增第二份發布／排程帳本或自動授權 |

## 安裝建議

⏳ **暫緩整套安裝與納入公司可攜包，先保留為候選媒體工具。** 若主要需求只是字幕／配音，優先考慮固定版 CLI 小型試作；若經常跨圖像、音訊與影片反覆調整，完整工作台才可能值得承擔重疊和維護成本。

候選試作尚未授權執行：用 30–60 秒自有影片，只產字幕，先固定來源、目標語言與費用上限；比較準確度、繁體中文用詞、時間軸、人工修正時間和成本。通過後再考慮配音和渲染，並測中斷恢復、保留舊產物與失敗不誤報成功。不能從 zh_cn 範例推論繁體輸出已驗證。

## 相關連結

- [[AI-一人公司/_index|AI 一人公司評估索引]]
- [[Github/_index|GitHub 分析總索引]]
- [[AI-一人公司/video-autopilot-kit — 影片 QA 與整合評估|影片 QA 工具評估]]
- [[AI-一人公司/prompts.chat MCP — 公司參考來源與先驗證後接入評估|參考價值與安裝價值分開驗證]]
