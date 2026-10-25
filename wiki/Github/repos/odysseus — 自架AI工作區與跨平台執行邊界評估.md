---
source: "https://github.com/odysseus-dev/odysseus"
author: "odysseus-dev"
stars: "93.5K"
clipped: 2026-10-15
tags:
  - "github/repo"
  - "self-hosted-ai"
  - "agent-workspace"
---

# odysseus — 自架 AI 工作區與跨平台執行邊界評估

## 一句話說明

Odysseus 把聊天、代理、研究、文件、郵件、筆記、行事曆與模型管理放在同一個自架工作區。功能有實作與測試，但不是可直接加進 Codex 的小型 Skill。對目前 Windows／Codex／Obsidian 環境建議 **⏳ 收藏觀望，先不安裝或取代現有流程**；特別要分清 dev／main、原生 Windows 與 Linux 容器的執行邊界。

## 專案概覽

| 項目 | 2026-10-15 公開 API 快照 |
|---|---|
| Repository | odysseus-dev/odysseus |
| Stars / Forks | 93,526 / 1,606 |
| 主要語言 | Python |
| 授權 | GitHub API：AGPL-3.0；README 標 AGPL-3.0-or-later，附 LICENSE 與第三方 provenance |
| 建立時間 | 2026-05-31 14:05:51 UTC |
| 最後推送 | 2026-10-15 10:08:58 UTC |
| 預設分支與固定 SHA | dev，`c74f4756796a48780f02b2ca913528c013d9c60a` |
| main 快照 | `934d23c0be29c9721385f34565c0ae2cbd60da04`，2026-09-05 17:21:12 UTC |
| 原始碼版本 | dev 的 APP_VERSION 1.0.3；HARNESS_VERSION 0.20.19，兩者用途不同 |
| 最新 Release | releases API 回傳空陣列；不是沒有 Docker image 或 Git tag 的證據 |
| Open Issues / PRs | repo API 的 issues_count 為 1,454，包含 PR；HTML open PR 約 336，不用不同時點數值相減推導精確 issue 數 |
| Topics / Archived | topics 空陣列；false |
| 首頁 | https://odysseus-dev.github.io/odysseus/ |

README 指 dev 為最新開發分支、main 為較經整理的分支；本報告深查的是上述固定 dev，不能把結果套到較舊的 main 或未核對的容器標籤。[固定原碼](https://github.com/odysseus-dev/odysseus/tree/c74f4756796a48780f02b2ca913528c013d9c60a)、[main 快照](https://github.com/odysseus-dev/odysseus/tree/934d23c0be29c9721385f34565c0ae2cbd60da04)、[README](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/README.md)。

## Repomix 深度分析

| 指標 | 本次結果 |
|---|---|
| 工具 | 已安裝 Repomix 1.14.0，未升級 |
| 下載來源 | 固定 SHA codeload，19,323,615 bytes，2,628 個檔案 |
| 打包檔案 | 2,574 |
| Tokens / 字元 | 10,396,462 / 39,753,659 |
| 壓縮模式 | 未 compress；使用 --no-gitignore，避免外層 work/ 被忽略造成零檔案 |
| 掃描器排除 | 8 份測試檔被判可疑而未收進 XML；這是 scanner 警示，不等於發現 8 個漏洞或真實密鑰 |

### 最大 token 檔案 Top 5

| 檔案 | Tokens | 佔比 |
|---|---:|---:|
| static/lib/mermaid.min.js | 1,276,030 | 12.3% |
| static/lib/xlsx.full.min.js | 389,932 | 3.8% |
| src/agent_loop.py | 386,794 | 3.7% |
| static/js/document.js | 203,163 | 2.0% |
| static/lib/docx.umd.min.js | 194,563 | 1.9% |

包內含 vendored JS、測試、規格及文件，token 總量不能當自有程式規模。本次只按入口與關鍵原始檔閱讀，沒有把整份超過一千萬 token 的 XML 交給模型，也沒有執行掃描器排除的測試。原始下載來源仍保留。

## 核心功能

- **聊天與代理工具**：支援本機或 API 模型、檔案／命令工具、MCP、Skills、memory 與背景工作；實際能力受帳號、授權與執行平台限制。
- **研究與搜尋**：ResearchService 呼叫 ResearchHandler，帶模型 endpoint、model、時間及進度回呼；不是單純搜尋結果頁。
- **文件與日常工作**：編輯器、郵件 IMAP／SMTP、筆記／任務、CalDAV 與排程。程式存在不等於各連接器在本機已登入或驗通。
- **模型工作台 Cookbook**：模型選擇、下載與 serving，包含本機和遠端 SSH 路線；會管理額外快取、程序與工具鏈。
- **Memory／向量資料**：MemoryService 接 NativeMemoryProvider 與條件式 MemoryVectorStore；embedding 路由支援本機 fastembed 模型與自訂 endpoint。
- **前端與其他工具**：Compare、圖片／照片編輯、上傳、主題、2FA；官方首頁含展示，不算本機產品驗收。

官方首頁已經由 Defuddle 擷取。首頁的 local-first、無遙測等敘述仍是作者主張；選雲端 LLM、embedding、郵件或遠端模型服務，就不能宣稱資料全程留在這台電腦。[官方網站](https://odysseus-dev.github.io/odysseus/)、[研究服務](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/services/research/service.py)、[向量設定路由](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/routes/embedding_routes.py)。

## 技術架構

```text
瀏覽器／前端模組
    -> FastAPI app.py + routes + auth middleware
    -> agents / tool authority / approvals / containment
    -> 研究、文件、郵件、模型與 memory services
    -> SQLite 或外部資料庫、檔案、Chroma、SearXNG
    -> 本機或雲端 LLM／embedding、MCP、遠端 SSH
```

| 部分 | 原碼與技術 |
|---|---|
| HTTP / Auth | FastAPI、uvicorn、Pydantic、bcrypt、TOTP；core/auth.py、core/middleware.py |
| 前端 | static/ 與 frontend/src/ 模組、原生 JS、CSS；有 frontend build／架構檢查 |
| 代理與工具 | src/agent_loop.py、src/tool_execution.py、src/tool_capabilities.py、src/tool_approvals.py |
| 程序邊界 | src/containment.py、containment_worker.py、agent_tools/subprocess_tools.py |
| 資料與語意 | SQLAlchemy／SQLite 預設、ChromaDB、fastembed 或外部 embedding endpoint |
| 部署 | Docker Compose、Dockerfile、Windows／macOS launcher、Linux service 方法 |

CodeGraph status 回報該下載來源未初始化，沒有自行建立索引。使用原碼與 Python AST 核對 16 個關鍵檔案；這不等於全 repo 呼叫圖或完整語意驗證。

### 版本、部署與資料範圍

預設 Compose 啟動 Odysseus、ChromaDB、SearXNG，主程式 host port 為 7011，綁 127.0.0.1；Chroma host port 8100、搜尋 8080 也限本機。掛載 app data／logs、SSH、HuggingFace 與本機 serving 工具快取；app 設 restart: unless-stopped。它會新增自己的帳號、記憶與背景工作，不只是替現有 Wiki 加一個畫面。

Compose 的 app image 預設 latest，而 README 說 latest／裸版本可移動；SearXNG 已 pin digest，Chroma 仍用 latest。若日後另行試用，應先選定 branch、固定 image／原碼與不含私人資料的 volume。沒有在本機執行 Compose、launcher、setup.py 或安裝依賴。[Compose](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/docker-compose.yml)、[Windows launcher](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/launch-windows.ps1)。

文件有版本落差：setup guide 還列 Docker URL 為 localhost:7000，Compose 與 README 是 host 7011。判斷連線埠應以實際 Compose 展開結果為準；本次未啟動驗證。

### 授權與 containment：不能只照舊文件判斷

THREAT_MODEL.md 仍寫沒有 shell／filesystem sandbox；固定 dev 已有 containment.acquire／run／release 接線，所以不能直接引用舊段落斷言目前完全沒有隔離。

實作的預設為 MODE_ENFORCING，DEFAULT_REQUIRED 包含 filesystem、process_tree、wall_clock。選不到滿足必要條件的機制時，acquire 拋 ContainmentUnavailable，不會只改寫 /workspace 路徑後照跑。原生 agent subprocess 的入口會回報該拒絕。

| 平台／條件 | 固定原碼可確認的行為 | 本機驗證邊界 |
|---|---|---|
| Linux + 可用 bubblewrap | probe 成功才提供 filesystem／process_tree／wall_clock；network 依 spec，預設 inherit | 未啟動 Docker 或實測 namespace |
| Windows native | _bwrap_available=false；windows_tree 只宣告 wall_clock，無 filesystem／process_tree | 推論預設 required 的原生代理執行會被拒絕；沒有實跑 Windows launcher |
| POSIX 無可用 bubblewrap | process_group 不宣告完整 process_tree／filesystem，不能滿足相同 required | 未在 macOS／Linux 主機實測 |

這是對此 dev SHA 的特定原生工具路徑判斷，不能泛化為所有聊天功能不能用，也不能泛化為舊 main 已有同一邊界。管理員 shell 路由另有 require_admin／internal-tool 拒絕與直接本機例外，應與代理工具分開評估。[containment 實作](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/src/containment.py#L307)、[代理 subprocess 接線](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/src/agent_tools/subprocess_tools.py#L503)、[管理員 shell 路由](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/routes/shell_routes.py#L59)。

外部內容後的 tool approval gate、exact approvals、角色與檔案敏感路徑檢查已有實作；仍有 unattended／已授權 continuation 等分支。這些機制不是本次已完成的注入防禦或郵件權限驗收。網站／README 宣稱、文件、程式接線、實際 containment 能力須分開看。

## 社群健康度

| 指標 | 快照與限制 |
|---|---|
| Top 10 貢獻者 | pewdiepie-archdaemon 746、alteixeira20 283、afonsopc 143、RaresKeY 105、redpersongpt 89、o3LL 81、vdmkenny 56、VykosMolt 38、lekt9 30、bitboody 29 |
| Commit 活躍度 | 近四週查詢第一頁已滿 100 筆，最舊為 10/2；只能說至少 100，不當成完整四週總量 |
| Release | releases API 空陣列；dev 與 main 的提交日期差約一個多月，不能只看 APP_VERSION 選版本 |
| CI | 固定 dev SHA 的 CI／CodeQL 快照為 success；不是本機或完整 Windows 安裝驗收 |
| 測試配置 | Python syntax、前端架構與 Node 檢查、四個 pytest shard、Playwright 等；部分 report-only／docs-only 跳過路徑須另看 job |

[固定版 CI](https://github.com/odysseus-dev/odysseus/actions/runs/38718186460)、[CI 定義](https://github.com/odysseus-dev/odysseus/blob/c74f4756796a48780f02b2ca913528c013d9c60a/.github/workflows/ci.yml)。高星數與遠端綠燈不能代替選定平台、模型和權限的實際驗收。

## 社群口碑

Agent Reach doctor：Exa 未配置，X／Reddit 等可選頻道未就緒，因此使用公開搜尋與 GitHub 第一手討論作補充，沒有變更登入或全域配置。YouTube 教學訊號為選配，本次未執行。

作者發起的使用者討論中，有人看重同一入口內的研究、郵件與模型操作，也有人反映模型安裝、UI／手機、成本顯示與使用門檻。這些回饋來自不同時點與環境，本次沒有重現。Windows MCP 討論也有工具呼叫回傳登入頁的案例，不能據此斷定目前所有 MCP 均失效。[使用者回饋](https://github.com/odysseus-dev/odysseus/discussions/3932)、[Windows MCP 討論](https://github.com/odysseus-dev/odysseus/discussions/4511)。

## 本機驗證

| 檢查 | 結果 |
|---|---|
| 固定來源下載／Repomix | 成功；8 份 scanner 排除檔保留於原始下載來源，未全量人工覆核 |
| Python AST | app、auth、middleware、containment、工具授權／執行、研究／memory 等 16 檔解析成功；沒有 import 或執行 app |
| 上游 Node 測試 | `node --test tests/skillsApproval.test.mjs`：3 通過、0 失敗，exit 0；只涵蓋 Skills UI 門檻／review／filter 邏輯 |
| 文件擷取 | Defuddle homepage 成功；設定與平台細節回到固定原碼確認 |
| 未驗 | 完整 pytest／E2E、登入／2FA、模型、embedding、MCP、郵件／排程、Docker、Windows 安裝、效能及真人使用效果 |

研究與 generated logs 保留在工作區 `work/repo-intel/odysseus-20261015/`：固定 source、metadata／main／releases／contributors／commits／CI JSON、repomix.xml／log、homepage.md、node-tests.log、ast-checks.json。未安裝專案、建立資料庫、下載模型、啟動服務、掃 Wiki 或修改既有公司流程；這些研究產物不是 Wiki 附件。

## 與現有系統的相關性評估

| 面向 | 建議 |
|---|---|
| Obsidian Vault | 目前沒有驗證可直接沿用 Wiki 的索引、資料契約與權限；不掛載整個 vault，不另建平行正式帳本 |
| Codex | 是獨立 AI app，並非升級 Codex 功能的直接套件；MCP／Skills 存在不等於本機已接通 |
| AI 一人公司 | 可參考工具授權與程序回報的做法；不因研究恢復暫停中的工作台或整包搬入公司 |
| Automation | 郵件、排程與背景程序需要另外定義授權／停止／資料邊界；本次沒有接入 |
| Windows | native 聊天入口與 agent containment 能力分開；沒有本機 runtime 證據前不承諾全功能可用 |

## 安裝建議

**⏳ 收藏觀望，先不安裝。** 它提供自架工作區，但目前沒有證據顯示新增第二套帳號、資料、模型與排程能改善既有流程。對這台 Windows 電腦，dev 的 containment 與文件落差是實際採用前須解決的條件。

若日後明確要試，先選 Linux 隔離環境、固定 SHA／image、只接非敏感樣本與一個模型；先測登入、無法建立 containment 時的拒絕與可用工具，再談郵件、MCP、Wiki 或自動排程。這是候選驗收範圍，不是已授權安裝。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/Understand-Anything — 程式知識圖譜與Wiki資料邊界評估|Understand-Anything：小型隔離試用與證據界線]]
