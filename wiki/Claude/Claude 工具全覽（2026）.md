---
tags:
  - claude
  - tools
  - reference
date: 2026-05-24
---

# Claude 工具全覽（2026）

> 最後更新：2026-05-24
> 完整舊版說明：[[Claude 環境說明]]（換電腦恢復步驟、Scrapling 詳細用法等）
> Skills 完整手冊：[[Claude Code Skills 使用手冊]]

---

## 目錄

- [程式與工具](#程式與工具)
- [MCP Servers](#mcp-servers)
- [本機專案 Repos](#本機專案-repos)
- [Agency-Agents（144個）](#agency-agents144個)
- [Skills 快速索引](#skills-快速索引)
- [Commands](#commands)

---

## 程式與工具

| 工具 | 啟動方式 | 使用時機 |
|------|---------|---------|
| **Claude Code** | `claude`（終端）或 VSCode 擴充 | 日常 AI 輔助開發、寫程式、分析 |
| **gbrain** | `gbrain search "關鍵字"` | 查詢個人知識腦、語意搜尋筆記/課程 |
| **Repomix** | `repomix`（全域 npm） | 把整個 codebase 打包給 AI 分析 |
| **OpenSpec** | `openspec init` → `/opsx:propose` | 複雜功能開發前先對齊規格 |
| **AutoHedge** | `cd autohedge-env && autohedge` | AI 自主 Solana 鏈上交易（⚠️ 真實資金） |
| **Scrapling** | `import scrapling` 或 `scrapling` CLI | 網頁爬蟲（含繞 Cloudflare、瀏覽器自動化） |
| **Recursive Mode** | 專案內執行 bootstrap.ps1 → `Implement the run` | 大型複雜任務的七階段結構化工作流程 |

## 外部工具與 API 服務

| 網站 | URL | 說明 |
|------|-----|------|
| **Browse.sh** | https://browse.sh | AI Agent 瀏覽器自動化技能目錄，內含 500+ 預製技能（搜尋商品、查航班、追包裹等），支援本地或 Browserbase 雲端執行 |
| **Superior APIs** | https://superiorapis.cteam.com.tw/ | 台灣 cteam 團隊的 API + MCP Server 整合平台，提供現成 API 服務與 MCP 工具供 Claude 直接呼叫 |

### gbrain 詳細用法

```powershell
# 必須先設環境變數
$env:GOOGLE_GENERATIVE_AI_API_KEY = [System.Environment]::GetEnvironmentVariable("GOOGLE_GENERATIVE_AI_API_KEY","User")

gbrain search "設計模式"          # 混合搜尋（語意 + 關鍵字）
gbrain import D:\Claude\brain-docs # 匯入新文件
gbrain embed --stale               # 補跑 embedding
gbrain list                        # 列出所有已索引文件
```

**使用時機：**
- 查詢水球課程內容 → `gbrain search "裝飾者模式"`
- 查詢 Obsidian 筆記 → 已匯入，直接搜尋
- 儲存位置：`C:\Users\sanyo\.gbrain\brain.pglite`

---

## MCP Servers

MCP Servers 讓 Claude 可以直接呼叫外部工具。設定於 `~/.claude/settings.json`。

| MCP Server | 設定位置 | 用途 | 何時自動啟用 |
|-----------|---------|------|------------|
| **codegraph** | `~/.claude.json` | 程式碼知識圖譜：符號搜尋、呼叫鏈、影響分析 | 查詢「誰呼叫了 X」、重構前影響分析 |
| **context7** | `~/.claude.json` | 查詢任意函式庫最新文件 | 問「Next.js 最新 API 怎麼用」、「Tailwind v4 怎麼設定」|
| **chrome-devtools** | `settings.json`（目前停用）| 控制 Chrome：截圖、console、network | 需要瀏覽器自動化、截圖時 |

> **注意：** gbrain 是 CLI 工具（`gbrain search`），不是 MCP Server。Ruflo/ruv-swarm 是 session-level 工具，透過 Claude Code 框架掛載，非本機設定的 MCP。

### CodeGraph 重要指令

```
codegraph_search     → 找符號（函式、類別、變數）
codegraph_context    → 全面了解某個功能區域（最常用）
codegraph_callers    → 找誰呼叫了這個函式
codegraph_callees    → 找這個函式呼叫了誰
codegraph_impact     → 改這個會影響哪些地方（重構必用）
codegraph_node       → 看特定符號的定義/原始碼
codegraph_explore    → 廣度探索一個區域
codegraph_files      → 列出目錄下的符號
```

**使用時機：** 進入陌生程式碼前、重構前確認影響範圍、找 bug 呼叫鏈

---

## 本機專案 Repos

| 專案 | 路徑 | 狀態 | 用途 |
|------|------|------|------|
| **social-monitor** | `d:\Claude\social-monitor\` | ✅ 運作中 | X/Threads/IG 定時海巡，Task Scheduler 10:30+22:00 |
| **job-crawler** | `d:\Claude\job-crawler\` | ✅ Phase 1 完成 | 104/web3/cryptojobs 職缺爬蟲 + Flask UI + Gmail 通知 |
| **careerbot** | `d:\Claude\careerbot\` | ✅ 進行中 | 求職助手，20家 in-review，/find-roles 待執行，Web UI: localhost:3000 |
| **obsidian** | `d:\Claude\obsidian\` | ✅ 活躍 | Obsidian vault，git 備份至 sanyoii/-Obsidian_vault |
| **open-slide** | `d:\Claude\open-slide\` | 🔍 未用 | 投影片工具（待評估） |
| **autohedge-env** | `d:\Claude\autohedge-env\` | ⚠️ 待設定 | 需填 API Keys + Solana 錢包私鑰 |
| **brain-docs** | `d:\Claude\brain-docs\` | ✅ 已匯入 | gbrain 文件暫存區，課程字幕已全數匯入 |
| **hd-decode** | `d:\Claude\hd-decode\` | ✅ 運作中 | 人類圖解讀器，純 HTML 離線工具，雙擊 index.html 即用 |

### social-monitor 日常操作

```powershell
# 手動觸發海巡
d:\Claude\social-monitor\run.bat

# 查看最新報告
ls d:\Claude\obsidian\wiki\Social\
```

自動排程：Task Scheduler，每天 10:30 + 22:00 執行。

### job-crawler 日常操作

```powershell
# 啟動 Flask UI
cd d:\Claude\job-crawler
python app.py
# 開啟 http://localhost:5000
```

---

## Agency-Agents（162個）

安裝位置：`C:\Users\sanyo\.claude\agents\`
來源：[msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents)

> **使用方式：** 在對話中說「用 [agent名稱] 角色來...」，或 Claude 自動在適合情境派用。

### 使用時機速查

| 情境 | 推薦 Agent |
|------|-----------|
| 寫後端 API | `engineering-backend-architect` |
| 前端開發 | `engineering-frontend-developer` |
| AI 功能整合 | `engineering-ai-engineer` |
| DevOps 自動化 | `engineering-devops-automator` |
| 行動 App | `engineering-mobile-app-builder` |
| 安全稽核 | `engineering-security-engineer` |
| 快速原型 | `engineering-rapid-prototyper` |
| 效能優化 | `engineering-database-optimizer` |
| 資料工程 | `engineering-data-engineer` |
| 求職/銷售策略 | `sales-discovery-coach` + `sales-proposal-strategist` |
| 功能優先排序 | `product-sprint-prioritizer` |
| 產品趨勢研究 | `product-trend-researcher` |
| 財務分析 | `finance-financial-analyst` |
| 投資研究 | `finance-investment-researcher` |
| 小紅書內容 | `marketing-xiaohongshu-specialist` |
| Instagram | `marketing-instagram-curator` |
| LinkedIn | `marketing-linkedin-content-creator` |
| SEO | `marketing-seo-specialist` |
| 複雜專案統籌 | `specialized-chief-of-staff` |
| API 測試 | `testing-api-tester` |
| 效能測試 | `testing-performance-benchmarker` |
| 無障礙審查 | `testing-accessibility-auditor` |
| QA 驗收 | `testing-reality-checker` |
| 學術研究 | `academic-psychologist` / `academic-historian` |

### 與現有 Skills 重疊（已跳過安裝）

| 跳過的 Agent | 替代的 Skill |
|-------------|------------|
| `engineering-code-reviewer` | `receiving/requesting-code-review` + `recursive-review-bundle` |
| `engineering-technical-writer` | `writing-skills` + `doc-coauthoring` |
| `engineering-codebase-onboarding-engineer` | `smart-explore` + `repomix-explorer` |
| `engineering-git-workflow-master` | `contextual-commit` + `using-git-worktrees` + `finishing-a-development-branch` |
| `design-brand-guardian` | `brand-guidelines` |
| `design-image-prompt-engineer` | `gpt-image-2` + `nuwa-skill` + `huashu-design` |
| `design-ui-designer` | `web-design-engineer` + `frontend-design` |

---

## Skills 快速索引

完整說明：[[Claude Code Skills 使用手冊]]
詳細環境說明：[[Claude 環境說明]]

### 最常用的 Skills（觸發詞）

| 分類              | Skill                            | 觸發詞                                |
| --------------- | -------------------------------- | ---------------------------------- |
| **文件**          | `pdf`                            | 讀/合併/拆分 PDF                        |
|                 | `pptx` / `docx` / `xlsx`         | 做 PowerPoint / Word / Excel        |
| **設計**          | `huashu-design`                  | 做個好看的原型 / HTML Demo                |
|                 | `gpt-image-2`                    | 生成一張圖 / 做封面圖                       |
|                 | `guizang-ppt`                    | 雜誌風簡報 / 橫滑 deck                    |
| **開發**          | `repomix-explorer`               | 分析這個 repo / 整個專案結構                 |
|                 | `context7-mcp`                   | 查最新 Next.js / Prisma / Tailwind 文件 |
|                 | `claude-api`                     | 用 Claude API 做 / Anthropic SDK     |
|                 | `mcp-builder`                    | 把這個 API 包成 MCP Server              |
| **除錯**          | `systematic-debugging`           | 幫我 debug / 這裡有問題                   |
|                 | `diagnose`                       | 找 root cause                       |
|                 | `recursive-debugging`            | 插入 Phase 1.5 修 bug                 |
| **測試**          | `test-driven-development`        | 用 TDD 模式實作                         |
|                 | `webapp-testing`                 | 寫 Playwright E2E 測試                |
| **Git**         | `contextual-commit`              | 每次 git commit 自動使用                 |
|                 | `using-git-worktrees`            | 並行開發分支管理                           |
|                 | `finishing-a-development-branch` | 處理 merge/PR                        |
| **Code Review** | `requesting-code-review`         | 送 review 前 pre-check               |
|                 | `receiving-code-review`          | 處理 review 回饋                       |
| **規劃**          | `writing-plans`                  | 把任務拆成可執行清單                         |
|                 | `brainstorming`                  | 幫我想想 / 設計討論                        |
|                 | `to-prd`                         | 自動生成 PRD                           |
|                 | `to-issues`                      | 把計畫拆成 Issues                       |
| **知識管理**        | `notebooklm-skill`               | 查 NotebookLM / 從我的筆記本找             |
|                 | `obsidian-cli`                   | 搜尋 vault / 讀寫 Obsidian 筆記          |
|                 | `defuddle`                       | 讀取這篇文章（網址）                         |
|                 | `kb-retriever`                   | 本地知識庫查詢                            |
| **命理**          | `bazi` / `bazi-skill`            | 排八字 / 看命盤                          |
|                 | `ziwei-doushu`                   | 排紫微                                |
|                 | `qimen-dunjia`                   | 奇門排盤                               |
| **Obsidian**    | `obsidian-markdown`              | Obsidian wikilink/callout 語法       |
|                 | `obsidian-bases`                 | 建立 Bases 資料庫視圖                     |
|                 | `json-canvas`                    | 編輯 .canvas 畫布                      |
| **Prompt**      | `prompt-master`                  | 幫我寫一個 prompt / 為 Midjourney 寫提示詞   |
| **Meta**        | `nuwa-skill`                     | 幫我做一個人物/角色的 Skill                  |
|                 | `skill-creator`                  | 建立新 Skill                          |
|                 | `ssc`                            | 建立 Agent / Hook                    |

---

## Commands

位置：`C:\Users\sanyo\.claude\commands\`

| Command           | 輸入方式  | 用途                          |
| ----------------- | ----- | --------------------------- |
| `/threads-to-fb`  | 對話中輸入 | Threads 貼文 → 繁中 Facebook 貼文 |
| `/generate-cover` | 對話中輸入 | 生成 1200×1200 社群封面圖          |

---

## 快速決策樹

```
要做什麼？
│
├─ 寫程式/開發 → Claude Code + 對應 Skill（debugging/TDD/review）
│                + 需要了解架構？→ CodeGraph MCP
│                + 需要看文件？→ context7-mcp
│
├─ 設計/視覺 → huashu-design（原型）/ gpt-image-2（圖片）/ guizang-ppt（簡報）
│
├─ 查資料 → gbrain（個人知識）/ notebooklm-skill（NotebookLM）/ defuddle（網頁）
│
├─ 文件輸出 → pdf / docx / pptx / xlsx
│
├─ 爬蟲 → Scrapling（Python 直接 import）
│
├─ 複雜多步任務 → Recursive Mode（Implement the run）
│
├─ 業務角色需求 → Agency-Agents（marketing/sales/finance/product）
│
└─ 命理 → bazi / ziwei-doushu / qimen-dunjia
```

---

*相關：[[Claude 環境說明]] · [[Claude Code Skills 使用手冊]] · [[知識庫操作手冊]]*
