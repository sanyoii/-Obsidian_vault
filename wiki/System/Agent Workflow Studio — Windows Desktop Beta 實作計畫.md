
## 摘要

目前問題的影響程度是「高」，但不是 Node/npm 整套損壞：

- PowerShell 執行 `npm` 會錯誤載入 `C:\Users\sanyo\AppData\Roaming\npm\node_modules\npm\bin\npm-cli.js`。
- `node v25.6.0`、`npm.cmd 11.8.0`、Node 安裝目錄內的 npm CLI、`pnpm 11.9.0`、Git 與 Codex CLI 仍可執行。
- 問題集中在 PowerShell `npm.ps1` 選中了失效或無法讀取的 user-level npm。
- 若直接開發，scaffold、安裝 dependency、build script、Electron 打包及 CI 重現都可能不穩定。

因此將 npm/Node 環境修復設為強制 M0 Gate；未通過前不初始化專案、不安裝 dependency、不撰寫系統程式碼。

## M0：Node/npm 環境修復強制閘門

### 1. 保存修復前證據

記錄 stdout、stderr、exit code 與解析路徑：

- `Get-Command node,npm,npx,pnpm`
- `where.exe node`、`where.exe npm`、`where.exe pnpm`
- `node --version`
- `npm --version` 與 `npm.cmd --version`
- `npm config get prefix`
- 目前 PATH、npm shim 內容及相關檔案 ACL
- `C:\nvm4w\nodejs\node_modules\npm` 與 user-level npm 的版本、檔案狀態

### 2. 最小範圍修復

- 將失效的 `C:\Users\sanyo\AppData\Roaming\npm\node_modules\npm` 移至帶時間戳的 quarantine；不直接刪除，保留復原能力。
- 若 ACL 阻止搬移，只修復上述精確目錄的必要擁有權與讀寫權限，不擴大至整個 AppData。
- 讓 `C:\nvm4w\nodejs\npm.ps1` 回到使用有效的 Node-local npm CLI。
- 同時驗證 `npm`、`npm.cmd`、`npx`、`npx.cmd` 均來自同一套安裝；若 shim 仍失效，從有效 npm package 重新產生整組 shim。
- 將開發環境標準化至 Node 24 LTS，寫入 `.node-version`，不採用目前 Node 25 作為正式開發基準。
- 透過修復後的 npm 安裝並固定 `pnpm 11.9.0`，避免正式專案依賴 Codex runtime 的 fallback pnpm。

所有全域環境變更在執行時使用精確路徑並保留 rollback；不得以永久改用 `npm.cmd` 迴避 PowerShell 問題。

### 3. M0 驗收

必須在全新 PowerShell session 全部通過：

- `npm --version`、`npm.cmd --version`：exit code 0、版本一致。
- `npx --version`、`pnpm --version`：exit code 0。
- 不再出現 `Cannot find module ...npm-cli.js`。
- `Get-Command` 不再指向失效或 Codex fallback 的 package manager。
- `npm config get prefix` 指向存在且目前使用者可寫入的目錄。
- `npm cache verify` 成功。
- 在 disposable temp directory 完成 `npm init -y`、`npm pkg set private=true` 與 pnpm workspace smoke test。
- 保存 before/after 路徑、版本、exit code、quarantine 位置及 rollback 指令。

只有通過以上條件，才初始化 Git 並開始 M1。

## 系統實作

### M1：桌面程式與儲存基礎

- 建立 Electron、React、TypeScript strict、pnpm workspace 專案。
- 分離 Renderer、Electron Main Process、Execution Worker：
    - Renderer 只負責 UI。
    - Main Process 管理 IPC、視窗、SecretVault、檔案選擇與 OS integration。
    - Worker 執行 workflow，避免長任務凍結介面。
- 使用 SQLite 管理 workspace、workflow version、run、attempt、artifact metadata、connection 與 trigger。
- SQLite 採 single-writer、WAL、migration、啟動完整性檢查及自動備份。
- 產物使用 managed artifact store；匯出到其他位置必須經過明確 permission。
- API key、token 及登入資訊使用 Windows 保護儲存，不寫入 workflow JSON 或 log。

### M2：可靠 Workflow Engine

支援 immutable Draft/Published workflow、DAG 驗證與以下 node：

- Codex Agent
- PowerShell／Shell
- HTTP Request
- File Read／Write
- Browser Automation
- Human Approval
- Condition
- Bounded Map
- Subworkflow

執行模型：

- 狀態：Queued、Running、WaitingApproval、Succeeded、Failed、Cancelled、Interrupted。
- 每個 node 建立獨立 attempt、結構化 event、stdout/stderr 與 artifact。
- 支援 timeout、retry、backoff、idempotency key、concurrency limit、token/cost quota。
- 偵測 cycle、missing dependency、schema mismatch、artifact permission 與 capability violation。
- 非正常關閉後將執行中的 attempt 標為 Interrupted；只重跑 idempotent node，其餘要求人工確認。
- 支援 sleep、強制終止、Worker crash、磁碟不足與資料庫損壞恢復。

### M3：Agent、Prompt 與 Operations Cockpit

UI 採三欄 Operations Cockpit：

- 左欄：Workspace／工廠清單。
- 中欄：Workflow step 與執行狀態。
- 右欄：Node editor、Prompt、input/output schema、artifact、log 與 run timeline。
- 主導視覺參考：[Operations Cockpit 概念圖](C:/Users/sanyo/.codex/generated_images/019fd101-c09c-7dd2-986a-6fa7ff9b333c/exec-8dd27fbf-5b3a-40ee-88e1-13dd5c650872.png)。

Node editor 必須提供：

- Schema 欄位 `＋` 新增與 `×` 刪除。
- 刪除欄位前顯示受影響的連線、Prompt variable 與下游 node。
- Artifact permission 下拉選單：Read、Create、Overwrite、Export。
- Prompt Master：
    - 必須先指定任務目標。
    - 最多提出三個真正阻塞的問題。
    - 產生可檢視 diff，不直接覆寫。
    - 不得擴張 workflow 權限、輸出路徑或任務範圍。
    - 接受後建立新的 Draft version。

Codex integration：

- 正式 adapter 使用 `codex exec --json` 與 output schema。
- 將 JSONL 正規化為共用 `RunEvent`。
- `app-server` 僅作 experimental adapter，不作 Beta 必要依賴。
- 同時保留「複製完整任務 Prompt」模式，供未連線 executor 使用。

### M4：Browser、Trigger 與 Plugin SDK

- Browser node 使用隔離 profile，保存 screenshot、DOM snapshot、URL 與操作事件。
- 高風險操作如發文、付款、刪除、送出表單預設要求 Human Approval。
- Trigger 支援 Manual、Schedule、File Watch、Webhook。
- Webhook 僅綁定 localhost；外部公開服務不納入 Beta。
- Plugin 在獨立 process 執行，透過 versioned manifest 宣告 node type、schema、capability、secret 與 artifact。
- Plugin crash 不得拖垮主程式；逾時或違反 capability 時終止該 plugin attempt。

### M5：內建模板與 Beta Hardening

內建三套可直接複製的 Published Template：

1. URL Research → Content Factory  
    擷取來源與媒體、保存證據、研究報告、摘要、Threads、newsletter，最後經 Approval 匯出；Beta 不直接自動發布社群。
    
2. QA Evidence Workflow  
    產生測試計畫、執行 Shell／Browser、收集 stdout、stderr、exit code、screenshot 與 artifact，再生成 evidence-backed QA report；不自動修改被測系統。
    
3. Repo Intelligence → Obsidian Wiki  
    分析 repository 結構、模組、入口、依賴與風險，產生 repo map、module pages 與 evidence index；支援多 vault、分類信心值、managed section、exact-batch 更新。Obsidian 開啟時優先使用 CLI，關閉時使用 atomic file write。
    

## 核心公開介面

- `WorkflowDefinition@v1`：metadata、version、nodes、edges、inputs、outputs、policy。
- `NodeDefinition`：type、config、inputSchema、outputSchema、artifactPorts、capabilities。
- `ExecutionProfile`：executor、environment、timeout、retry、quota、approvalPolicy。
- `Executor.run()`：回傳 `AsyncIterable<RunEvent>`。
- `Run`、`NodeRun`、`Attempt`：保存狀態、時間、錯誤、usage 與 recovery metadata。
- `ArtifactSpec`：mediaType、hash、size、producer、permission、retention、export target。
- `PluginManifest@v1`：plugin identity、node definitions、capabilities、secrets、compatibility。
- `PromptOptimizationRequest/Proposal`：目標、原始 Prompt、限制、問題、diff、驗收條件。
- `ObsidianConnection/WikiWritePlan`：vault、managed roots、衝突政策與 exact-batch manifest。

所有 persisted JSON 必須帶 schema version；不認識的新版 schema 必須拒絕執行，不可自行猜測。

## 測試與正式驗收

- Environment：M0 全新 PowerShell bootstrap、版本及 PATH 一致性測試。
- Unit：schema、DAG、cycle、policy、quota、retry、artifact permission、Prompt diff。
- Integration：Codex JSONL、Shell exit code、HTTP timeout、SQLite migration、artifact hash、SecretVault。
- Resilience：Worker kill、App kill、sleep/resume、BSOD 模擬後的 run recovery。
- Security：path traversal、command injection、secret redaction、plugin capability、localhost webhook。
- E2E：三套內建模板各完成一次真實執行並核對輸出、證據與 approval。
- UI：鍵盤操作、焦點狀態、對比、錯誤提示、長 log 與大量 artifact。
- Beta Gate：
    - M0 npm Gate 全數通過。
    - 三個官方 workflow 可從建立、執行、失敗恢復到匯出完成。
    - 無 secret 出現在 workflow JSON、log、export 或 crash report。
    - 強制中止後不產生重複副作用。
    - 備份資料庫可在乾淨環境恢復。
    - Windows 安裝包可在沒有開發工具的測試帳號啟動。

## 固定假設

- Windows x64、單一使用者、local-first，不建立雲端帳號系統。
- Codex 是第一個正式 Agent executor，但核心介面不得綁死 Codex。
- Beta 不包含團隊協作、雲端同步、Marketplace、遠端 webhook 或社群自動發布。
- 圖片、音訊與影片以 artifact/plugin 處理，不在核心引擎內建完整影音編輯器。
- M0 通過後的順序固定為：Git 初始化與規格文件 → M1 → M2 → M3 → M4 → M5；不得平行跳過核心可靠性階段。