---
source: "https://github.com/chuspeeism/dashi-taskboard"
author: "chuspeeism"
stars: "169"
clipped: 2026-08-03
tags:
  - "github/repo"
  - "ai-agent"
  - "task-management"
---

# dashi-taskboard — 嵌入 Codex 的本地優先任務看板

## 一句話說明

「大师的AI小灶」（Dashi AI Lab）出品的本地優先（local-first）issue 看板：Node 22 原生 SQLite 後端 + React 19 前端，透過 CDP 注入嵌進 OpenAI Codex 桌面版，並附一個 `manage-taskboard` Codex Skill 讓 agent 用 `taskctl` CLI 自主管理 issue 生命週期——實質上是「給 Codex agent 用的 Linear」。

## 專案概覽

| 項目 | 值 |
|---|---|
| Stars | 169 |
| Forks | 26 |
| 主要語言 | JavaScript（877KB）＋ TypeScript（555KB）＋ CSS（192KB） |
| 授權 | **無 LICENSE 檔**（all rights reserved，法律上不可再散布/商用） |
| 建立時間 | 2026-07-24（**上線僅 10 天**） |
| 最後推送 | 2026-07-30 |
| Open Issues | 0（issue 功能近乎未用） |
| 最新 Release | 無（無任何 release、無 tag） |
| Topics | 無 |
| 首頁 | 無（cloud 版部署在作者自有域名 taskboard.dsxzai.com） |
| 是否 Archived | 否 |

倉庫內專案自稱 **Codex Taskboard**（package name：`codex-taskboard`）；「dashi」是作者品牌名。唯一 contributor 是 `jadon7`（76 commits），owner `chuspeeism` 帳號名為「Dashi AI Lab」，旗下另有 4,561⭐ 的 [[Github/repos/dashi-ppt-skill|dashi-ppt-skill]] 同品牌專案——屬「品牌帳號持有 repo、個人帳號 commit」的正常結構，**非** OpenMontage 型冒名散布。

## 核心功能

1. **本地任務看板**：`npm start` 起在 `127.0.0.1:47823`，SQLite 存於 `.data/`；React UI 支援看板欄、issue 詳情（Markdown＋內嵌圖片附件）、標籤、優先級、父子 issue、依賴關係、留言活動流，變更透過 SSE 即時廣播給所有客戶端。
2. **`taskctl` CLI**：與 UI 共用同一 HTTP API，agent/人皆可用指令建專案、開 issue、搬狀態、加留言；支援 `--if-version` 樂觀鎖防多 agent 併發衝突。
3. **`manage-taskboard` Codex Skill**：教 Codex「先搜重複 issue → 讀齊留言 → claim 成 in_progress → 完工搬 in_review → 使用者明確驗收才 done」的完整紀律，並用 `CODEX_THREAD_ID` 把每次變更歸因到具體對話，issue 可回鏈到 Codex 原生對話。
4. **嵌入 Codex 桌面版**（macOS 為主）：CDP 注入器在 ChatGPT.app 側邊欄加 Taskboard 入口、以 iframe 鋪滿工作區；因 Codex 新版 CSP 擋 HTTP iframe，注入器啟用 **CDP CSP bypass**。README 自承不改 app.asar、不 patch React、不換 `fetch`。
5. **AI Chat**：後端 `spawn("codex", ["app-server", "--stdio"])` 驅動——複用本機已登入的 Codex，**不直連任何 AI API、不碰 API key**。
6. **雲端協作（選配）**：Cloudflare Workers ＋ D1 ＋ R2 部署路徑（wrangler.jsonc 寫死作者自己的 domain 與 database_id，自部署需改）；另有工作流（workflow board）功能，最新 commit 已隱藏入口。

## 技術架構

```
┌────────────────────────────────────────────────────┐
│  Codex 桌面版 (ChatGPT.app, macOS)                  │
│  ┌──────────────────────────────────────────────┐  │
│  │ inject/codex-taskboard.user.js（CDP 注入）    │  │
│  │  → 側邊欄入口 + iframe 嵌入 Taskboard UI      │  │
│  └──────────────┬───────────────────────────────┘  │
└─────────────────┼──────────────────────────────────┘
                  │ HTTP (127.0.0.1:47823)
┌─────────────────▼──────────────────────────────────┐
│  server/  Node 22 原生 HTTP + node:sqlite          │
│   ├ app.mjs（REST API + SSE 廣播）                 │
│   ├ database.mjs（DatabaseSync，零 ORM）           │
│   └ ai-chat-*.mjs（spawn codex app-server --stdio）│
├────────────────────────────────────────────────────┤
│  web/   React 19 + Vite 8 SPA（@xyflow 工作流圖）  │
│  cli/   taskctl.mjs（同一 API 的 CLI 客戶端）      │
│  skills/manage-taskboard/（Codex Skill + cli.md）  │
│  shared/ domain.mjs + workflow-*（前後端共用邏輯） │
│  cloud/ Cloudflare Workers + D1 + R2（選配）       │
└────────────────────────────────────────────────────┘
```

| 面向 | 觀察（基於原始碼，非 README 轉述） |
|---|---|
| 執行期依賴 | 僅 6 個：react、react-dom、react-markdown、remark-gfm、@xyflow/react、@lobehub/icons-static-svg——後端**零依賴**（原生 `node:sqlite`、原生 http），供應鏈面極小 |
| 測試 | 39 個測試檔（`node --test`，涵蓋 API/DB/UI/注入器/雲端 harness），無外部測試框架 |
| 程式碼量 | 117 檔、約 425K tokens；最大檔 styles.css（163KB）與 App.tsx（90KB），前端偏單體大檔風格 |
| AGENTS.md | 明文的反過度工程開發憲法：先證明操作路徑→最小實作→只驗主路徑→使用者確認前禁止自加防禦與測試（與本環境 Karpathy 原則同路數，值得一讀） |
| 平台假設 | 嵌入流程以 macOS 為主（`open -n -a /Applications/ChatGPT.app`）；Web/CLI/Skill 本身跨平台（Node ≥22.5） |

## 供應鏈與安全檢查

| # | 檢查項 | 結果 |
|---|---|---|
| ① | 網路呼叫 | ✅ 乾淨。程式碼內外部 URL 幾乎全為測試 fixture（`*.example.test`）與 Cloudflare 文件連結；唯一真實外部資源是 workflow 目錄裡的飛書 logo 圖檔常數（`feishucdn.com`，僅 UI 圖示）。**無遙測、無打回任何伺服器** |
| ② | 危險執行 | ⚠️ 有 `child_process.spawn`，但用途全部正當且可讀：起自家 server、起 `codex app-server`、npm dev。無 eval/new Function/pickle 類。真正要注意的是**設計本身**：CDP 注入含 CSP bypass，且 README 自承「CDP 對本機其他 process 無認證」——注入器運行期間本機任何程式都能接管該 Codex 視窗 |
| ③ | 相依宣告 | ⚠️ package.json 6 個 runtime 依賴皆為主流套件，但**無 lockfile**（package-lock.json 不存在）——安裝時解析到什麼版本無法重現，供應鏈釘不住 |
| ④ | 安裝腳本/CI | ✅ 無 preinstall/postinstall/prepare hook；無 .github/workflows（也代表**零 CI**，測試只在作者本機跑） |
| ⑤ | Repomix 安全掃描 | ✅ No suspicious files detected |

另兩條部署面風險（README 有誠實揭露）：預設綁 `0.0.0.0`（LAN 全開、**無任何帳號認證**，同網段任何人可讀寫看板）；雲端版 wrangler.jsonc 寫死作者的 D1 database_id 與自訂網域，照抄部署會失敗。

## 社群健康度

- 建 repo 10 天拿 169⭐、26 forks——動能來自作者「大师的AI小灶」既有中文 AI 社群（同帳號 dashi-ppt-skill 4.5K⭐），非自然搜尋流量。
- 單一開發者（jadon7）、6 天內 76 commits 的衝刺型開發；commit 訊息紀律良好（feat/fix/chore 規範）。
- 0 open issues、1 PR：協作生態尚未形成，實質是「作者自用品公開化」階段。
- 無 release、無 tag、無 LICENSE、無 CI：工程習慣好（39 測試檔）但**發行治理為零**。

## 社群口碑

星數較低（169 < 1,000），依 repo-intel 門檻跳過社群口碑搜尋。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian Vault | 低。看板資料存 SQLite 非 Markdown，與 wiki/QA Bug 工作流無整合點 |
| Claude Code | 中。本環境已有 Claude+Codex 雙 AI 工作流與 Codex CLI 0.145：`manage-taskboard` Skill＋`taskctl`＋樂觀鎖的「多 agent 併發領 issue」設計，對雙 AI 派工的任務協調是真實缺口；但 CDP 嵌入鏈假設 macOS ChatGPT.app，Windows 上只剩 Web UI＋CLI＋Skill 三件可用 |
| Automation | 低-中。Windows 排程生態（Task Scheduler/PowerShell）與其無交集；若採用僅作為長駐本地服務（`npm start`）跑 |

## 安裝建議

⏳ **觀望**。工程品質實在（零依賴後端、39 測試檔、樂觀鎖併發設計、README 對安全邊界誠實），供應鏈檢查乾淨，但**無 LICENSE 讓任何超出「本機看看」的使用都站不住**，加上無 lockfile/無 release/上線僅 10 天，現在採用等於把任務資料押在單人衝刺專案上。本環境的雙 AI 工作流目前用 wiki＋派工單協調已夠用，尚未痛到需要常駐看板服務（R13：加一個長駐 Node 服務＋SQLite 換「任務可視化」，改善無法量化）。

- **升級條件**（滿足任一即復查）：①作者補上 OSS license 且出正式 release；②雙 AI 工作流成長到多 issue 併發派工、wiki 派工單開始互相踩線，屆時其樂觀鎖＋thread 歸因設計直接對症。
- **放棄條件**：repo 六個月無 commit（衝刺型單人專案的典型死法），或持續無 license 超過 2026 年底。

## 相關連結

- [[Github/_index|GitHub 索引]]
- [[Github/repos/dashi-ppt-skill|dashi-ppt-skill]]（同作者 4.5K⭐ 專案，若未收錄則為外部參照）
- 原始 repo：https://github.com/chuspeeism/dashi-taskboard
- 雲端協作文件：`docs/cloud-collaboration.md`（repo 內）
