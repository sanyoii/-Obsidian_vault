---
title: Claude Code 工具生態系儀表板
created: 2026-06-06
tags: [claude-code, skills, agents, dashboard, tools]
status: in-progress
---

# Claude Code 工具生態系儀表板

## 動機

工具散落在多處，沒有統一入口：
- **Skills**：143 個，backup 在 `d:\Claude\.claude\skills\`，active 在 `C:\Users\sanyo\.claude\skills\`
- **Agents**：107 個，分 8 類，雙份同步
- **Apps**：ppt-master、ziwei、job-crawler、careerbot 等散落各目錄
- **Scripts**：Python/PowerShell 分散在 `tools\`、各 skill 目錄、各專案

## 解法

### 1. 視覺儀表板（看得到）

**檔案**：`d:\Claude\dashboard\claude-tools-dashboard.html`

- 單一 HTML 自含，瀏覽器直接開啟
- 7 個 Tab：**Skills / Agents / 本地應用 / GBrain / 工具腳本 / 管理 / CLI 工具**
- 全域搜尋 + 分類 Pill 過濾
- 每個 Skill 卡片：名稱、描述、觸發指令（可複製）、標籤
- 深色主題（`#0f0f11` 背景，`#7c6af7` accent）

**Skills 分類**（20 類，共 143 個）：
| 分類 | 代表 Skills |
|------|-------------|
| 📝 文件生成 | pdf, docx, pptx, xlsx |
| 🎞 投影片 | html-ppt, guizang-ppt, deck-ai-classroom, GordenPPTSkill |
| 🎨 設計視覺 | huashu-design, web-design-engineer, algorithmic-art |
| 🔧 開發工具 | claude-api, gemini-api, context7-mcp, mcp-builder |
| 🐛 除錯品質 | systematic-debugging, diagnose, recursive-debugging |
| ✅ TDD | tdd, test-driven-development, recursive-tdd |
| 📋 規劃管理 | make-plan, writing-plans, triage |
| 👥 Code Review | code-review, requesting-code-review |
| 🤖 Subagent | sparc, subagent-driven-development, recursive-mode |
| 🔀 Git | using-git-worktrees, contextual-commit, version-bump |
| 🧠 記憶知識 | agent-memory, continuous-learning-v2 |
| 📓 Obsidian | obsidian-bases, obsidian-cli |
| 🔮 術數命理 | bazi, qimen-dunjia, ziwei-doushu |
| ☁️ Google Cloud | cloud-run-basics, bigquery-basics, gke-basics |
| ⚡ 效率輸出 | do, understand 系列, find-skills |
| 📚 知識查詢 | context7-mcp, grill-me, notebooklm-skill |
| 💬 溝通品牌 | brand-guidelines, resume-architect |
| ✍️ 寫作品質 | writing-skills, stop-slop, karpathy-guidelines |
| 🛠 Meta Skills | skill-creator, book-to-skill, nuwa-skill |
| 🖼 AI 圖生成 | gpt-image-2, excalidraw-diagram, mermaid-visualizer |

**CLI 工具頁籤**（粉紅色邊框卡片，共 10 個全域 CLI 工具）：

| 工具 | 說明 |
|------|------|
| claude-code | Anthropic 官方 CLI Agent |
| codex | OpenAI CLI Agent |
| gemini-cli | Google Gemini CLI Agent |
| openclaw | 開源 Claude Code 替代品 |
| claude-code-router | 多模型路由代理 |
| repomix | 將 repo 打包成 LLM 可讀格式 |
| defuddle | 網頁內容萃取（去雜訊） |
| pake-cli | Rust+Tauri 網頁轉桌面 App |
| openspec | OpenAPI spec 生成工具 |
| pnpm | 快速 Node.js 套件管理器 |

### 2. 集中管理腳本（管得到）

**檔案**：`d:\Claude\tools\manage-skills.ps1`

```powershell
# 使用方式
.\manage-skills.ps1 status   # 比較 backup vs active，列出差異
.\manage-skills.ps1 sync     # backup → active 單向同步
.\manage-skills.ps1 list     # 列出所有已安裝 skills
```

- Source of truth：`d:\Claude\.claude\skills\`（Git 備份）
- Active：`C:\Users\sanyo\.claude\skills\`（Claude 實際讀取）
- `sync` 用 PowerShell `robocopy` 差異複製，不覆蓋無變動項目

## 目錄結構

```
d:\Claude\
├── claude-tools-dashboard.html   ← 工具儀表板入口
└── tools\
    ├── manage-skills.ps1         ← Skills 集中管理
    ├── video-to-brain.py
    ├── gbrain-inbox.ps1
    └── md_to_pdf.py
```

## 外部工具（非 Skill，獨立安裝）

### Agent Reach — AI Agent 互聯網感知層

**安裝日期：** 2026-06-06  
**版本：** 1.4.0  
**原始碼：** `d:\Claude\tools\agent-reach\`  
**Skill 路徑：** `C:\Users\sanyo\.claude\skills\agent-reach\`

| 狀態 | 頻道 | 呼叫方式 |
|------|------|---------|
| ✅ | GitHub | `gh repo view`, `gh search` |
| ✅ | 任意網頁 | `curl https://r.jina.ai/{URL}` |
| ✅ | V2EX | `agent-reach` 路由 |
| ✅ | RSS/Atom | feedparser |
| ⚠️ | YouTube | yt-dlp 已裝，PATH 需設定 |
| ⚠️ | Reddit | rdt-cli 已裝，需 `rdt login` |
| ❌ | 語意搜尋 | 需 mcporter（npm install 失敗）|

**診斷指令：** `%USERPROFILE%\AppData\Roaming\Python\Python314\Scripts\agent-reach.exe doctor`  
**解鎖更多頻道：** 告訴 Agent「帮我配 Twitter/微博/小红书」

### last30days — 多平台社群研究引擎

**安裝日期：** 2026-06-06  
**版本：** 3.3.2  
**安裝路徑：** `C:\Users\sanyo\.agents\skills\last30days\`  
**觸發：** `/last30days <主題>` 或 CLI `uv run python scripts/last30days.py`

| 狀態 | 平台 |
|------|------|
| ✅ | Reddit / HN / Polymarket / GitHub（免費）|
| 🔑 | X, YouTube, TikTok, IG（需 API key）|

---

## 相關參考

- [[SKILLS_GUIDE]] → `d:\Claude\SKILLS_GUIDE.md`（完整觸發說明）
- [[CLAUDE.md]] → 新增 Skill 標準流程
- 參考設計：`d:\Claude\prompt_master_studio_v2.html`（同款深色主題）
- [[Panniantong-Agent-Reach — AI Agent 互聯網感知層]] → 詳細安裝記錄
- [[mvanhorn-last30days-skill — AI 多平台社群研究引擎]] → 詳細說明
