---
source: "https://github.com/addyosmani/agent-skills"
author: "Addy Osmani（Google Chrome 團隊）"
clipped: 2026-06-11
tags:
  - "github/repo"
  - "skills"
  - "claude-code"
  - "engineering"
  - "tdd"
  - "spec"
  - "automation"
---

# addyosmani/agent-skills — 生產級工程 Skills 套件

> 24 個涵蓋完整 SDLC 的工程 skills，7 條斜線指令，4 個專用 Agent——讓 AI 編碼 Agent 像資深工程師一樣執行 Define → Plan → Build → Verify → Review → Ship 六階段流程。

**Repo：** https://github.com/addyosmani/agent-skills  
**作者：** Addy Osmani（Google Chrome 團隊）  
**授權：** MIT  
**規模：** 90 個檔案，126K tokens

---

## ✅ 安裝狀態（2026-06-11 已完成）

- **方法**：GitHub SSH 不可用，改用本地 clone（`d:\Claude\infra\reference-repos\agent-skills\`）+ 本地路徑 marketplace（`.claude-plugin/marketplace.json` 的 `source` 改為 `"./"`），再 `claude plugin install agent-skills@addy-agent-skills` 成功。
- **已啟用**：32 個 Skills + 8 個 Slash Commands + SessionStart hook。
- **4 個 Agent personas**：plugin.json 的 `agents` 陣列宣告未被此版本 Claude Code 載入，改為手動複製到 `d:\Claude\.claude\agents\specialized\agent-skills\` 並啟用：
  - `code-reviewer`、`test-engineer`、`web-performance-auditor` — 原樣安裝
  - `security-auditor` → 改名為 **`sdlc-security-auditor`**（與既有 v3 `security-auditor` agent 名稱衝突，frontmatter/標題已同步改名）
- **Hooks 整合**：詳見下方「Hooks」章節 — SessionStart 已自動生效並修好 jq 依賴；`sdd-cache`/`simplify-ignore` 為 **per-project 選配**，目前未在任何專案啟用。
- **詳細記錄**：`memory/reference_addyosmani_agent_skills.md`（自動記憶）

---

## 一句話說明

`agent-skills` 是一套「生產級 AI 編碼工程流程」skills 套件：把資深工程師在 spec、計畫、實作、測試、審查、上線各階段的最佳實踐和品質關卡全部封裝成 SKILL.md，安裝後 Claude Code 自動依當前任務觸發對應 skill，無需手動選型。

---

## 主要功能

### 7 條斜線指令（對應 SDLC）

| 指令 | 階段 | 核心原則 |
|------|------|---------|
| `/spec` | Define | Spec before code |
| `/plan` | Plan | Small, atomic tasks |
| `/build` | Build | One slice at a time |
| `/build auto` | Build（全自動） | 一次審批，自主執行全部任務 |
| `/test` | Verify | Tests are proof |
| `/review` | Review | Improve code health |
| `/code-simplify` | Review | Clarity over cleverness |
| `/ship` | Ship | Faster is safer |
| `/webperf` | Verify | Core Web Vitals + Lighthouse |

### 24 個 Skills（分六階段）

| 階段 | Skills |
|------|--------|
| **Meta** | `using-agent-skills`（路由分配器） |
| **Define** | `interview-me`、`idea-refine`、`spec-driven-development` |
| **Plan** | `planning-and-task-breakdown` |
| **Build** | `incremental-implementation`、`test-driven-development`、`context-engineering`、`source-driven-development`、`doubt-driven-development`、`frontend-ui-engineering`、`api-and-interface-design` |
| **Verify** | `browser-testing-with-devtools`、`debugging-and-error-recovery` |
| **Review** | `code-review-and-quality`、`performance-optimization`、`security-and-hardening`、`observability-and-instrumentation`、`deprecation-and-migration`、`documentation-and-adrs`、`git-workflow-and-versioning`、`ci-cd-and-automation`、`code-simplification` |
| **Ship** | `shipping-and-launch` |

### 4 個專用 Agent

- `code-reviewer` — 五軸程式碼審查（正確性/可讀性/架構/安全/效能）
- `security-auditor`（本環境已改名為 `sdlc-security-auditor`） — 安全漏洞審計
- `test-engineer` — TDD 驅動的測試撰寫
- `web-performance-auditor` — Core Web Vitals + Chrome DevTools 分析

### Hooks

| Hook | 功能 | 安裝範圍 | 本環境狀態 |
|------|------|---------|-----------|
| `session-start.sh` | session 啟動時注入 `using-agent-skills` meta-skill（skill discovery flowchart + 核心行為準則） | plugin 自動安裝（`hooks/hooks.json` 全域 SessionStart） | ✅ 已生效（依賴 `jq`，已修正 PATH，見下方備註） |
| `sdd-cache-pre.sh` + `sdd-cache-post.sh` | `/source-driven-development` 用，快取 WebFetch 文件查詢結果（ETag 驗證新鮮度，非 TTL） | **⚠️ per-project 選配**，需手動加到該專案 `.claude/settings.json` 的 PreToolUse/PostToolUse(WebFetch) | ❌ 未在任何專案啟用 |
| `simplify-ignore.sh` | `/code-simplify` 用，保護標註過的程式碼區塊（`/* simplify-ignore-start */`）不被簡化 | **⚠️ per-project 選配**，需手動加到該專案 `.claude/settings.json` 的 PreToolUse(Read)/PostToolUse(Edit\|Write)/Stop | ❌ 未在任何專案啟用 |

> **jq 依賴修正**：`session-start.sh` 需要 `jq`。`winget install jqlang.jq` 裝了 1.8.1 但未建立 PATH symlink，hook 仍降級為純 INFO 訊息。修正方式：將 `jq.exe` 從 WinGet 套件目錄複製到 `C:\Users\sanyo\.local\bin\jq.exe`（已在 PATH），驗證後 hook 完整輸出 meta-skill 內容（priority `IMPORTANT`）。
>
> **per-project 選配 hook 怎麼加**：在該專案 `.claude/settings.json`（或 `.local.json`）依照 `hooks/SDD-CACHE.md` / `hooks/SIMPLIFY-IGNORE.md` 的範例加入對應 hook 條目，並把指令路徑指向 `d:\Claude\infra\reference-repos\agent-skills\hooks\<script>.sh` 的絕對路徑（因為 hook script 不在該專案目錄內）。只有實際會用到 `/source-driven-development` 或 `/code-simplify` 的專案才需要加，目前**全環境皆未設定**。

### References（靜態 Checklist）

- `accessibility-checklist.md` — WCAG 2.1 AA 合規清單
- `orchestration-patterns.md` — Agent 協作模式參考
- `performance-checklist.md` — Core Web Vitals 優化清單
- `security-checklist.md` — OWASP Top 10 快速查表
- `testing-patterns.md` — 測試金字塔（80/15/5）參考

---

## 技術棧

| 層 | 技術 |
|----|------|
| 格式 | Markdown（SKILL.md 純文字，無程式碼依賴） |
| Hooks | Bash shell scripts |
| 驗證工具 | Node.js（scripts/validate-skills.js） |
| CI/CD | GitHub Actions |
| 支援平台 | Claude Code、Gemini CLI、Cursor、Windsurf、GitHub Copilot、Antigravity CLI、OpenCode、Kiro IDE |

---

## 與現有環境的相關性評估

| 面向 | 評估 |
|------|------|
| **SKILL.md 格式相容性** | ✅ 原生 Agent Skills 格式，直接對應 C:\Users\sanyo\.claude\skills\ 結構 |
| **Claude Code 整合** | ✅ 第一公民支援，`/plugin marketplace add` 一行安裝 |
| **CLAUDE.md 原則呼應** | ✅ `doubt-driven-development` = R14 Bug 調查先行；`context-engineering` = R8 讀後再寫；`spec-driven-development` + `planning-and-task-breakdown` = R10 Checkpoint |
| **7-Agent 工廠工作流** | ✅ `/build auto` 邏輯與 researcher→spec-writer→builder→verifier 工廠流程高度對齊 |
| **現有 skills 衝突風險** | 🟢 低。純 Markdown + Bash，不碰 settings.json/agents/MCP 設定 |
| **Hooks 整合** | ✅ SessionStart hook 已自動生效（jq 依賴已修正）；`sdd-cache`/`simplify-ignore` 為 per-project 選配，未啟用，不衝突現有 hooks |
| **作者可信度** | ✅ Addy Osmani 為 Google Chrome 團隊工程師，在 web 效能與工程最佳實踐領域有長期貢獻 |

---

## 安裝建議

**✅ 適合安裝 — SKILL.md 原生格式，一行指令即可將 24 個生產級工程 skills 注入現有 Claude Code 環境。**

```bash
# Claude Code Plugin Marketplace 安裝（官方建議寫法）
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

> ⚠️ **本環境實際安裝時遇到 GitHub SSH 認證失敗**（無 SSH key），改用本地 clone + 本地路徑 marketplace 繞過：
> ```bash
> git clone --depth 1 https://github.com/addyosmani/agent-skills.git d:/Claude/infra/reference-repos/agent-skills
> claude plugin marketplace add "d:\Claude\infra\reference-repos\agent-skills"
> # 編輯 .claude-plugin/marketplace.json：plugin 的 source 改為 "./"
> claude plugin marketplace update addy-agent-skills
> claude plugin install agent-skills@addy-agent-skills
> ```

安裝後 skills 自動放至 C:\Users\sanyo\.claude\skills\，斜線指令 `/spec`、`/plan`、`/build auto`、`/review`、`/ship` 即刻可用。

若只想選裝特定 skill，可手動 clone 後複製個別 `skills/<name>/SKILL.md` 到 `C:\Users\sanyo\.claude\skills\<name>\`。

---

## 反向連結

- [[Claude/Karpathy 最高遵守原則 — AI 行為準則]] — `doubt-driven-development` 與 R14 Bug 協議高度對齊
- [[Claude/Claude環境操作手冊]] — Skills 安裝與管理路徑
- [[anthropicsknowledge-work-plugins]] — 同為 Claude Code 官方/知名 skill 套件，互補而非重疊
- [[ECC — Claude Code harness-native 操作系統]] — 另一個 skills 生態系（100+ skills，風格更 harness-native）

---

## Tags

#skills #claude-code #engineering #tdd #spec #planning #security #performance #observability #git #ci-cd #api-design #debugging #frontend #agent-skills #addy-osmani