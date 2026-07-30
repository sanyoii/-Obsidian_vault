---
source: "https://github.com/n8n-io/n8n"
author: "n8n-io (n8n GmbH)"
stars: "199K+"
clipped: 2026-07-31
tags:
  - "github/repo"
  - "workflow-automation"
  - "fair-code"
  - "mcp"
  - "self-hosted"
---

# n8n — 19.9 萬星的視覺化工作流自動化平台，但它不是開源

> 來源：https://github.com/n8n-io/n8n ｜ 官網：https://n8n.io
> 授權：**Other — Sustainable Use License + n8n Enterprise License 雙軌（非 OSI 開源）**
> ⭐ 198,712｜🍴 59,780｜Watchers 1,140｜diskUsage **540 MB**
> 規模：**26,031 檔 / 6,546 目錄**（2026-07-31 Git Trees API 全量取樹，未截斷）

> [!warning] 最重要的一件事：n8n 不是開源軟體
> 它自稱 **fair-code**，實際是「原始碼可見 + 商業使用受限」。`LICENSE.md` 逐字：
> > You may use or modify the software **only for your own internal business purposes or for non-commercial or personal use**. You may distribute the software or provide it to others **only if you do so free of charge for non-commercial purposes**.
>
> 兩條容易漏看的細則：①**「master 以外分支的內容不受任何授權涵蓋」**——fork 別人的 feature branch 來用，法律上是無授權狀態；②檔名含 `.ee.` 或位於 `.ee` 目錄下的原始碼**需持有 Enterprise License**。

---

## 這是什麼？

拖拉節點畫流程、需要時嵌入 JavaScript/Python，把 1500+ 個服務串起來自動跑。2019 年以「Zapier 的自架替代品」起家，2025–2026 轉型 AI agent 平台——現在 repo 裡有 `@n8n/agents`（agent SDK）、`@n8n/mcp-browser`（Playwright 瀏覽器控制）、`@n8n/computer-use`（**本機檔案系統、shell、截圖**）。

> [!note] GitHub description 已過期
> 描述欄仍寫 "400+ integrations"，README 已改為 **1500+**、範本 9,000+（官網稱 10k+）。

---

## 授權實測：自架免費版少了什麼

授權在執行期由 `@n8n/backend-common/src/license-state.ts` 的 `LicenseState.isLicensed(feature)` 強制，旗標定義在 `@n8n/constants/src/index.ts` 的 `LICENSE_FEATURES`，**共 43 個**。

### 可以 / 不可以

| 你想做的事 | 可以嗎 |
|---|---|
| 自己架來自己用（含公司內部） | ✅ 免費，執行次數不限 |
| 改它、加自己的節點 | ✅ |
| 免費分享改好的版本（非商業） | ✅ |
| **架一台開放給客戶用並收費** | ❌ |
| **白牌包裝後賣給客戶** | ❌ 需 Enterprise 授權 |

### Enterprise 授權檔案範圍（完整檔案樹精算）

| 類別 | 檔案數 |
|------|--------|
| 檔名含 `.ee.` | 194 |
| 位於 `.ee` 目錄下 | 1,008 |
| **去重合計** | **1,110（全 repo 26,031 檔的 4.3%）** |

### 對個人自架者最有感的付費牆

| 旗標 | 你會失去 |
|------|---------|
| `feat:folders` | **工作流無法用資料夾分類**（流程一多就是平面清單） |
| `feat:sourceControl` | **沒有 Git 整合，工作流無法版控** |
| `feat:variables` | 沒有環境變數 |
| `feat:workflowDiffs` / `namedVersions` / `workflowReviews` | 無差異比對、具名版本、審查流程 |
| `feat:sharing` | 無法分享工作流／憑證給其他使用者 |
| `feat:advancedExecutionFilters` / `debugInEditor` | 執行紀錄無進階篩選、編輯器內無法除錯 |
| `feat:aiAssistant` / `askAi` / `aiBuilder` | 三個 AI 輔助全部付費 |
| `feat:insights:*`（3 個） | 無用量／效能儀表板 |
| `externalSecrets`／`binaryDataS3,Az`／`multipleMainInstances`／`workerView` | 外部密鑰、物件儲存、多主節點、worker 檢視 |
| LDAP / SAML / OIDC / MFA 強制 / 進階權限 / 自訂角色 | 企業身分驗證整套 |

**核心工作流執行本身完全免費、不限次數**——被關的是協作、治理、AI 輔助與規模化。單人自架最痛的是**資料夾**與 **Git 版控**這兩個看似基本的功能。

---

## 規模與結構

> ⚠️ **repomix 引擎本輪失敗**：archive 下載在 8.3 MB 停滯後退回 `git clone`，接著在 Windows 上以 `EPERM: operation not permitted, rmdir …@n8n/node-cli/src/template/templates/declarative` 中止（清理暫存目錄撞唯讀檔，與「Windows 刪含 .git 目錄被唯讀 pack 檔擋下」同型）。**未取得 token 指標**。改用 Git Trees API 全量取樹（`truncated: false`）。

| 副檔名 | 檔案數 | | 套件 | 檔案數 |
|--------|--------|---|------|--------|
| `.ts` | **18,742**（72%） | | `packages/@n8n`（**54 子套件**） | 8,588 |
| `.json` | 3,491 | | `packages/nodes-base` | 7,145 |
| `.vue` | 1,220 | | `packages/frontend` | 4,445 |
| `.svg` | 603 | | `packages/cli` | 3,224 |
| `.md` | 578 | | `packages/testing` | 1,447 |
| `.yml` | 304 | | `packages/core` | 264 |
| `.mjs` / `.snap` | 241 / 207 | | `packages/workflow` | 230 |

`@n8n/*` 前 5 大：`typeorm` 2,572（**vendor 了一份 TypeORM 分支**）、`nodes-langchain` 888、`instance-ai` 722、`agents` 581、`ai-workflow-builder.ee` 455。

---

## 技術架構

```
                    ┌──────────────────────────────────────┐
                    │  packages/frontend（4,445 檔）        │
                    │  Vue 3 + SCSS，視覺化畫布編輯器       │
                    └──────────────────┬───────────────────┘
                                       │ REST / websocket
                    ┌──────────────────┴───────────────────┐
                    │  packages/cli（3,224 檔）             │
                    │  Express、REST 控制器、CLI 指令        │
                    │  license.ts ─ 執行期功能旗標閘門       │
                    └──────────────────┬───────────────────┘
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
┌────────────────┐          ┌──────────────────┐          ┌────────────────────┐
│ packages/core  │          │ packages/workflow│          │ packages/nodes-base│
│ 264 檔 執行引擎 │          │ 230 檔 資料模型   │          │ 7,145 檔 1500+ 節點 │
└────────────────┘          └──────────────────┘          └────────────────────┘
        │
        │   packages/@n8n/*（54 子套件，8,588 檔）
        ├── typeorm 2,572 ← vendor 的 TypeORM 分支
        ├── nodes-langchain 888 ── LangChain 節點
        ├── instance-ai 722 ／ agents 581 ── AI agent 執行層
        ├── ai-workflow-builder.ee 455 ← 🔒 Enterprise 授權
        ├── mcp-apps ／ mcp-browser ／ mcp-browser-extension ── MCP 三件套
        ├── computer-use ── 本機 filesystem / shell / 截圖 閘道
        ├── task-runner ／ task-runner-python ── 隔離的程式碼執行沙箱
        └── db ／ crdt ／ scheduler ／ telemetry ／ di ／ decorators ／ local-gateway …
```

| 層次 | 技術 |
|------|------|
| 前端 | Vue 3（1,220 個 `.vue`）+ SCSS，自建畫布 |
| 後端 | TypeScript / Node.js，DI 容器（`@n8n/di`）+ 裝飾器路由（`@n8n/decorators`） |
| 資料層 | **vendor 的 TypeORM 分支**（2,572 檔）；SQLite / Postgres |
| 程式碼執行 | `task-runner` 與 `task-runner-python` 獨立行程隔離使用者程式碼 |
| AI | `nodes-langchain`（LangChain）、`agents`（自家 SDK）、`instance-ai` |
| MCP | **client 與 server 雙向**，402 個 `.ts` 檔涉及 |
| 授權閘門 | `LicenseState.isLicensed()` 執行期旗標，43 個 `feat:*` |

**MCP 三件套細節**（取自各 package.json）：
- `@n8n/mcp-apps` v0.10.0 — MCP Apps UI resources and server helpers
- `@n8n/mcp-browser` v0.15.0 — **建在 Playwright 與 WebDriver BiDi 上的瀏覽器自動化 MCP 工具**
- `@n8n/mcp-browser-extension` v0.0.4 — **讓 n8n AI 透過 CDP 控制 Chrome 分頁的擴充功能**
- `@n8n/computer-use` v0.17.0 — "Local AI gateway for n8n AI Assistant — **filesystem, shell, screenshots**"

---

## 專案體質

- **真正的公司團隊**：前 10 名貢獻者有 6 人破 450 commit（janober 4,631、ivov 1,710、netroy 1,317、RicardoE105 1,101…），非一人專案
- **極度活躍**：近四週 commit **443 / 427 / 391 / 345（每週）**，合計 1,606
- **一天多版**：n8n@2.33.2 / 2.33.1 / 2.33.0 / 2.32.6 全在 2026-07-28～30 之間，另有 `stable` 與 `beta` 標籤
- **PR 積壓大但非停滯**：326 open issues、**1,063 open PRs**，對照每週 400 commit 的吞吐，屬「社群貢獻遠多於審查量能」
- **資金充足**：2025-10 募資 $180M
- **教學生態極成熟**：Fireship 118.9 萬觀看、freeCodeCamp `Zero to Hero Course` 79.9 萬、Charlie Chang 69.0 萬、Futurepedia 65.9 萬
- **授權爭議是最大負評**：多數團隊誤以為「自架 + GitHub 有原始碼 = 完全開源商業無限制」；已有 Apache-2.0 替代品（Sim）以「授權乾淨」為賣點取得 HN 240 分

---

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| 現有自動化棧 | **重疊但不對等**。目前是 Windows 工作排程器 + PowerShell + Python（social-monitor、career-ops、jobsmith、Reconcile-Sweep）。n8n 補的是**視覺化畫布 + 執行歷史 + 失敗重試**——正好對應踩過的痛（排程沒插電當天靜默不跑、結果碼 0x800710E0 無 log）。代價是多一個常駐服務 |
| Windows 可行性 | 可跑但**實務上走 Docker**。540 MB 原始碼不需 clone。**是同期分析對象裡唯一在 Windows 上真能跑起來的** |
| Claude Code | **最有意思的接點**：n8n 同時是 MCP **client 與 server**，可把既有工作流包成 MCP 工具給 Claude Code 呼叫。`@n8n/mcp-browser`（Playwright）與現有 playwright 截圖腳本功能重疊 |
| ⚠️ `@n8n/computer-use` | 提供 AI 助手 **filesystem / shell / screenshots** 的本機閘道。與 Claude Code 本身能力高度重疊，但多一個入口＝多一份風險面 |
| [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層\|Agent-Reach]] 對照 | n8n 走**官方 API + 自備憑證**，agent-reach 走爬取／登入態。對小紅書、LinkedIn 這類反爬強的平台，**n8n 不一定更好** |
| [[Github/repos/career-ops — AI 驅動求職自動化指揮系統\|career-ops]] | 該專案文件已提及 n8n 為候選編排層 |
| 授權對個人用途 | **完全合規**。只有架起來對外收費才有問題——以個人自動化／求職用途，**授權不構成障礙** |
| Obsidian | 有社群節點可寫檔／同步，但 vault 流程已由 Claude Code + 腳本處理，增量有限 |

---

## 安裝建議

⏳ **觀望** — 品質與活躍度極高（每週 400 commit、一天多版、19.9 萬星、$180M 募資、Windows 可跑），授權對個人用途也完全合規。判觀望純粹是成本效益：

1. **現有排程需求是「能動的」**。加一個常駐 Docker 服務取代已在跑的 schtasks + PowerShell，是**用明確的複雜度增量換不明確的改善**——正是 R13 說的「加複雜度換小改善→不做」
2. **免費版少了資料夾與 Git 版控**。對重度版控使用者而言，`feat:sourceControl` 被關掉意味著 n8n 工作流會變成唯一沒進 git 的資產
3. **多開一條 AI 碰本機 shell 的通道**（`computer-use`），與「單一 Claude Code 入口 + verify_gate 收口」的架構相衝

**升級條件（→ ✅ 裝）**：出現**具體且重複**的多步驟外部服務串接需求（如投遞流程要串 Gmail + Sheets + 爬蟲 + 通知且要看得見每步結果）；**或**決定把 n8n 當 MCP server 把既有工作流暴露給 Claude Code——那是它獨有的能力。屆時**走 Docker，不要 `npx n8n` 汙染全域 Node**。

**放棄條件（→ ❌ 不裝）**：授權進一步收緊（例如把自架執行次數也納入限制）；**或**自動化需求維持在「單機定時跑腳本」量級——那 n8n 永遠是殺雞用牛刀。

> [!tip] 📌 不必安裝就能取用
> - **`LICENSE_FEATURES` 那 43 個旗標清單**（`packages/@n8n/constants/src/index.ts`）——現成的「開源專案怎麼切免費／付費線」產品決策教材，比任何商業模式文章都具體
> - **`packages/@n8n/task-runner` 與 `task-runner-python`**——「怎麼安全地跑使用者提交的程式碼」的隔離執行參考實作
> - **`n8n.io/llms.txt`**——官網提供機器可讀內容索引，LLM 友善站台範例

---

## 相關連結

- [[Github/repos/career-ops — AI 驅動求職自動化指揮系統\|career-ops]]
- [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層\|Agent-Reach]]
- [[Github/repos/AgentKey — Chainbase 的付費 MCP 資料閘道\|AgentKey]]
- [[Github/repos/Threads 推薦工具型 Repo 六選\|工具型 Repo 六選]]
