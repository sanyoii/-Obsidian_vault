---
source: "https://github.com/addyosmani/agent-skills"
author: "Addy Osmani（Google Chrome 團隊）"
stars: "84K+"
clipped: 2026-06-11
updated: 2026-08-08
tags:
  - "github/repo"
  - "skills"
  - "claude-code"
  - "engineering"
  - "tdd"
  - "spec"
  - "automation"
  - "eval"
---

# addyosmani/agent-skills — 生產級工程 Skills 套件

> 24 個涵蓋完整 SDLC 的工程 skills，**8 條斜線指令**，4 個專用 Agent，外加 0.6.2 之後新增的三層 skill eval 框架——讓 AI 編碼 Agent 像資深工程師一樣執行 Define → Plan → Build → Verify → Review → Ship 六階段流程。

**Repo：** https://github.com/addyosmani/agent-skills  
**作者：** Addy Osmani（Google Chrome 團隊）  
**授權：** MIT  
**規模：** 181 個檔案，182.5K tokens（Repomix 實測於 `main` = `d2478bf0`，即 tag `0.6.6`）

---

## 上游版本追蹤

| 項目 | 值 |
|------|-----|
| 本機安裝版（釘住） | `0.6.2` = `d187883b7d76`（2026-06-10 tag） |
| 上游最新 Release | `0.6.6`（2026-08-04）→ https://github.com/addyosmani/agent-skills/releases/tag/0.6.6 |
| 上游 `main` HEAD | `d2478bf0`（2026-08-06） |
| 0.6.2 → main 差距 | 182 commits、139 檔異動、新增 91 blob（其中 70 個屬 `evals/`） |
| Skill / 指令 / persona 名單 | **零增減**（24 / 8 / 4 不變，變的是內容與周邊建設） |
| 本頁最後查核 | 2026-08-08 |

> **升級 ≠ `claude plugin update`。** 本機為 directory 型 marketplace，實際載入 `d:\Claude\infra\reference-repos\agent-skills` 這份 clone，升級等同對該 clone 做 `git pull`（且該 clone 是 `--depth 1` shallow、有一處本機修改會衝突）。詳見「安裝建議」。

---

## ✅ 安裝狀態（2026-06-11 安裝，2026-08-08 複查）

- **方法**：GitHub SSH 不可用，改用本地 clone（`d:\Claude\infra\reference-repos\agent-skills\`）+ 本地路徑 marketplace（`.claude-plugin/marketplace.json` 的 `source` 改為 `"./"`），再 `claude plugin install agent-skills@addy-agent-skills` 成功。
- **已啟用**：**24 個 Skills + 8 個 Slash Commands**（合計 32 個可觸發項目）+ SessionStart hook。
  > ⚠️ 舊版本頁曾寫「32 個 Skills」，那是 24 skills + 8 commands 的**加總**，不是 skill 數。上游 README、官方站與 `docs/codex-setup.md` 一致為 24 支 skill；本機 clone 實地清點 `skills/` = 24 個目錄、`.claude/commands/` = 8 個 `.md`。
- **4 個 Agent personas**：**0.6.6 起上游已整個移除 `plugin.json` 的 `agents` 陣列**（實查 0.6.6 的 `.claude-plugin/plugin.json` 只剩 `commands` 與 `skills` 兩個欄位），personas 改由 Claude Code **自動探索 `agents/` 目錄**。
  - ⚠️ **06-11 做的「手動複製 persona」變通已不再需要**，且現在造成重複載入：`agent-skills:code-reviewer` 等 4 個 plugin 前綴版本，與手動副本 `code-reviewer` / `sdlc-security-auditor` / `test-engineer` / `web-performance-auditor` 並存，**4 個 persona 佔掉 8 個清單條目**。
  - 📋 **待辦**：評估刪除 `d:\Claude\.claude\agents\specialized\agent-skills\` 下 4 檔以消重。刪除前先確認 `security-auditor` → **`sdlc-security-auditor`** 的改名（當初為避開既有 v3 `security-auditor` 撞名）是否仍需保留——plugin 版帶 `agent-skills:` 前綴，理論上不再撞名。
- **Hooks 整合**：詳見下方「Hooks」章節 — SessionStart 已自動生效並修好 jq 依賴；`sdd-cache`/`simplify-ignore` 為 **per-project 選配**，目前未在任何專案啟用。
- **詳細記錄**：`memory/reference_addyosmani_agent_skills.md`（自動記憶）

---

## 一句話說明

`agent-skills` 是一套「生產級 AI 編碼工程流程」skills 套件：把資深工程師在 spec、計畫、實作、測試、審查、上線各階段的最佳實踐和品質關卡全部封裝成 24 份 SKILL.md，安裝後 Claude Code 自動依當前任務觸發對應 skill，無需手動選型。2026-06 之後的演進重點**不是增加 skill 數量，而是替這套目錄補上「怎麼證明它真的有效」的三層 eval 框架，並把發行通路從 Claude Code 一家擴張到 Codex／Command Code／`npx skills`**。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 83,990（2026-08-08 實查） |
| Forks | 8,974 |
| Watchers | 453 |
| 主要語言 | JavaScript（Shell / JS / Python / HTML / TS 混合） |
| 授權 | MIT |
| 建立時間 | 2026-02-15 |
| 最後推送 | 2026-08-06 |
| 最新 Release | `0.6.6`（2026-08-04） |
| Open Issues | 57（不含 PR） |
| 規模 | 181 檔 / 182,526 tokens / 899 KB |
| 首頁 | https://skills.addy.ie |
| 是否 Archived | 否 |

> `pushed_at`（2026-08-06T22:45:51Z）與 `main` HEAD commit 時間（22:44:15Z）僅差 96 秒，代表最後推送打在預設分支上、不是旁支或 tag 灌水——**專案確實活著**。近 9 週 commit 為 27 / 17 / 14 / 2 / 21 / 13 / 5 / 3 / 16，Release 節奏 9–22 天一版。

---

## 核心功能

### 8 條斜線指令（對應 SDLC）

| 指令 | 階段 | 核心原則 |
|------|------|---------|
| `/spec` | Define | Spec before code |
| `/plan` | Plan | Small, atomic tasks |
| `/build` | Build | One slice at a time（`/build auto` 是它的**全自動模式**：一次審批、自主跑完全部任務，**非獨立指令**） |
| `/test` | Verify | Tests are proof |
| `/webperf` | Verify | Core Web Vitals + Lighthouse |
| `/review` | Review | Improve code health |
| `/code-simplify` | Review | Clarity over cleverness |
| `/ship` | Ship | Faster is safer |

> **為什麼是 8 不是 7**：`/webperf` 已從「附註的專家稽核」升格進 README 主表，官方文件站 `skills.addy.ie` 亦明寫 "Eight slash commands"。本機 clone 實地清點 `.claude/commands/` 恰為 8 個 `.md`（build / code-simplify / plan / review / ship / spec / test / webperf）。
>
> 指令以**三種格式並存**：`.claude/commands/*.md`（Claude Code）、`.gemini/commands/*.toml`（Gemini CLI）、`commands/*.toml`（Antigravity CLI），由新增的 `scripts/validate-commands.js` 強制三方 description 一致（唯一容許的檔名差異是 Claude 的 `plan` 對應 TOML 的 `planning`）。
>
> ⚠️ `/review` 與 Claude Code 內建的 `/review` **命名衝突**，上游 [issue #95](https://github.com/addyosmani/agent-skills/issues/95) open 逾 3.5 個月未解。

### 24 個 Skills（分六階段）— 名單自 0.6.2 起完全未變

| 階段 | Skills |
|------|--------|
| **Meta** | `using-agent-skills`（路由分配器） |
| **Define** | `interview-me`、`idea-refine`、`spec-driven-development` |
| **Plan** | `planning-and-task-breakdown` |
| **Build** | `incremental-implementation`、`test-driven-development`、`context-engineering`、`source-driven-development`、`doubt-driven-development`、`frontend-ui-engineering`、`api-and-interface-design` |
| **Verify** | `browser-testing-with-devtools`、`debugging-and-error-recovery` |
| **Review** | `code-review-and-quality`、`performance-optimization`、`security-and-hardening`、`observability-and-instrumentation`、`deprecation-and-migration`、`documentation-and-adrs`、`git-workflow-and-versioning`、`ci-cd-and-automation`、`code-simplification` |
| **Ship** | `shipping-and-launch` |

> **名單沒變，但內容變厚**（0.6.2 → 0.6.6 主要幾支）：`git-workflow-and-versioning`（+56 行）補進整節 Release & Versioning——semver 語意契約、tag 為單一真相、changelog 寫給消費者而非 `git log`；`code-review-and-quality`（+51）新增 Structural Remedies（指出問題要同時給出重構動作）與相依升級紀律，嚴重度標籤由 Critical/Important/Suggestion 改為 **Critical/Required/Optional/Nit**；`performance-optimization`（+48）新增 **Step 4: Verify（Keep or Revert）**，要求同條件重測、一次只改一件事。**升級拿到的是同樣 24 支 skill 的加厚版，不是要重新學一批新東西。**

### 4 個專用 Agent

- `code-reviewer` — 五軸程式碼審查（正確性/可讀性/架構/安全/效能）
- `security-auditor`（本環境手動副本改名為 `sdlc-security-auditor`） — 安全漏洞審計
- `test-engineer` — TDD 驅動的測試撰寫
- `web-performance-auditor` — Core Web Vitals + Chrome DevTools 分析

> 0.6.6 起由 Claude Code **自動探索 `agents/` 目錄**載入（`plugin.json` 的 `agents` 陣列已移除）。編排規則明訂**只允許 `/ship` 的 parallel fan-out + merge**，禁止建立互相呼叫的「router persona」。本機重複載入問題見上方「安裝狀態」。

### 三層 Skill Eval 框架 `evals/`（0.6.2 之後最大的新增）

70 個新檔案，且 token 消耗第一名已不是任何一支 skill，而是新的 eval runner `scripts/run-evals.js`（6,331 tokens，佔全 repo 3.5%）——這正好說明這兩個月的演進方向。

| Tier | 檢查什麼 | 何時跑 | 成本 |
|------|---------|-------|------|
| **1. Structural** | frontmatter、命名、必要章節、三方指令 parity | CI（`validate-skills.js`、`validate-commands.js`） | 免費 |
| **2. Trigger & routing** | 正向 prompt 要讓對應 skill 進 top-k；負向 prompt 不得排第一；任兩支 skill 的 description 不得近似碰撞 | CI（`run-evals.js`） | 免費 |
| **3. Behavioral** | 讓 agent 實際照 skill 做一遍，再由 grader 對 `expectations[]` 評分 | 手動（`--behavioral`） | 花 token |

**Tier 2 是這個 repo 自認的原創貢獻**，實作是零相依的純 Node TF-IDF：把每支 skill 的 `name`（權重 ×2）+ `description` 建成語料，用 cosine similarity 同時做「prompt → skill 排序」與「skill ↔ skill 描述碰撞偵測」（≥0.75 報 error、≥0.50 報 warn）。CI 以 `--min-rank1 80` 卡住路由品質下限，目前基線 86%。

Tier 3 另含**抗壓測試 fixture**（`authority-pressure.md`、`time-pressure.md`、sunk cost），專門驗證「當 prompt 主動慫恿你跳過流程時，skill 是否仍然守住」。

> ⭐ **對本環境的意義**：Tier 2 解的正是本環境 40+ skills 的「description 漂移／清單預算」同一個問題，且零第三方相依、改個 `SKILLS_DIR` 就能對 `C:\Users\sanyo\.claude\skills` 跑。**這可能是整個 repo 對本環境最高 ROI 的部分，比升級本身更值得抽。**
>
> ⚠️ Tier 3 需要知情：`node scripts/run-evals.js --behavioral <skill>` 會以 `--permission-mode acceptEdits` + 開放 Bash 的參數 spawn headless claude。但它完全 opt-in、明文標示 "never in CI"、工作目錄是拋棄式暫存區且 `finally` 清除，屬**透明揭露的高權限工具**而非隱藏行為。

### 發行通路（2026-08 現況）

- **`npx skills add addyosmani/agent-skills`** — 現為 README 首推路徑，透過 [vercel-labs/skills](https://github.com/vercel-labs/skills) CLI（宣稱支援 70+ agents）。⚠️ 注意這個 CLI 是 **Vercel 維護的第三方**，不是 Addy 的，等於主要分發通道有一項外部相依。
- **原生 Codex plugin** — 新增 `.codex-plugin/plugin.json` + `.agents/plugins/marketplace.json`，需 Codex CLI v0.122+
- **Command Code** — `cmd skills add addyosmani/agent-skills`
- 既有：Claude Code、Cursor、Gemini CLI、Windsurf、Copilot、Antigravity、OpenCode、Kiro

> 🚨 **npm 供應鏈警告**：npm 上的 `agent-skills` 套件（maintainer `qwpm`，無 repository/homepage，2025-10 建立後 28 分鐘即停更）**與本專案完全無關**。`npm i agent-skills` / `npx agent-skills` 會拉到陌生人的包——與 `npx cct` squatter 案同型。正確指令是 `npx skills add addyosmani/agent-skills`（套件名是 `skills`，不是 `agent-skills`）。

### Hooks

| Hook | 功能 | 安裝範圍 | 本環境狀態 |
|------|------|---------|-----------|
| `session-start.sh` | session 啟動時注入 `using-agent-skills` meta-skill（skill discovery flowchart + 核心行為準則） | plugin 自動安裝（`hooks/hooks.json` 全域 SessionStart） | ✅ 已生效（依賴 `jq`，已修正 PATH，見下方備註） |
| `sdd-cache-pre.sh` + `sdd-cache-post.sh` | `/source-driven-development` 用，快取 WebFetch 文件查詢結果（ETag 驗證新鮮度，非 TTL） | **⚠️ per-project 選配**，需手動加到該專案 `.claude/settings.json` 的 PreToolUse/PostToolUse(WebFetch) | ❌ 未在任何專案啟用 |
| `simplify-ignore.sh` | `/code-simplify` 用，保護標註過的程式碼區塊（`/* simplify-ignore-start */`）不被簡化 | **⚠️ per-project 選配**，需手動加到該專案 `.claude/settings.json` 的 PreToolUse(Read)/PostToolUse(Edit\|Write)/Stop | ❌ 未在任何專案啟用 |

> **jq 依賴修正**：`session-start.sh` 需要 `jq`。`winget install jqlang.jq` 裝了 1.8.1 但未建立 PATH symlink，hook 仍降級為純 INFO 訊息。修正方式：將 `jq.exe` 從 WinGet 套件目錄複製到 `C:\Users\sanyo\.local\bin\jq.exe`（已在 PATH），驗證後 hook 完整輸出 meta-skill 內容（priority `IMPORTANT`）。
>
> **per-project 選配 hook 怎麼加**：在該專案 `.claude/settings.json`（或 `.local.json`）依照 `hooks/SDD-CACHE.md` / `hooks/SIMPLIFY-IGNORE.md` 的範例加入對應 hook 條目，並把指令路徑指向 `d:\Claude\infra\reference-repos\agent-skills\hooks\<script>.sh` 的絕對路徑（因為 hook script 不在該專案目錄內）。只有實際會用到 `/source-driven-development` 或 `/code-simplify` 的專案才需要加，目前**全環境皆未設定**。
>
> **0.6.6 對 `hooks/hooks.json` 的三項改善**（升級後會拿到）：**(a)** 路徑全部加引號（0.6.2 是裸的 `bash ${CLAUDE_PLUGIN_ROOT}/...`，路徑含空白即失敗）；**(b)** 新增 plugin root → 專案 `.claude/hooks/` 的 fallback；**(c)** 以 `|| true` 收尾，找不到腳本不再讓 hook 失敗。(a) 修掉的 [issue #214](https://github.com/addyosmani/agent-skills/issues/214) 與本環境 `CLAUDE.local.md` 記的「hook 指令的執行檔路徑也必須加引號」是**完全同型的 bug**，且上游也是死得無聲——外部專案獨立踩到同一個坑的佐證。
>
> ⚠️ **Codex 端仍有格式問題**：[issue #465](https://github.com/addyosmani/agent-skills/issues/465)（33 留言，open）指 `session-start.sh` 回舊格式 JSON、不合 Codex 現行 `hookSpecificOutput` 規格。本環境有 Claude+Codex 雙 AI 工作流，若要在 Codex 端接上須先確認此問題。

### References（靜態 Checklist）— 5 份增為 7 份

- `accessibility-checklist.md` — WCAG 2.1 AA 合規清單
- `orchestration-patterns.md` — Agent 協作模式參考
- `performance-checklist.md` — Core Web Vitals 優化清單
- `security-checklist.md` — OWASP Top 10 快速查表
- `testing-patterns.md` — 測試金字塔（80/15/5）參考
- **`definition-of-done.md`** ★新增 — **專案級**完成定義，明確區別於 per-task 驗收條件（正好補上 R17 交付契約表缺的那一層標準面）
- **`observability-checklist.md`** ★新增 — 可觀測性檢查清單

> ⚠️ **這 7 份 checklist 目前連結是壞的**：11 支 SKILL.md 用相對路徑 `references/xxx.md` 指向 repo 根層的共用檔，而該路徑相對於 skill 自己的目錄解析不到。[issue #468](https://github.com/addyosmani/agent-skills/issues/468)（open，2026-08-07）實測**連完整 Claude Code marketplace 安裝也一樣失效**。較早的 [issue #361](https://github.com/addyosmani/agent-skills/issues/361)（已於 2026-08-03 關閉）涵蓋的是另一種情形：單支 `npx skills add --skill` 安裝根本不會把 `references/` 帶走。維護者已承認是真 bug，修法（改絕對 URL vs. 產生式複製進各 skill）尚未定案。**影響僅止於連結失效，skill 本身仍可運作**——這些引用都在 `## See Also` 段落，屬補充深讀而非功能相依。

---

## 技術架構

```
agent-skills/  (181 files, 182.5K tokens, MIT)
│
├── skills/                    24 × SKILL.md ── 純 Markdown，無程式相依
│   └── idea-refine/           唯一有 scripts/ 與多檔結構的 skill
│
├── 指令三格式並存 ─────────────────────────────────┐
│   ├── .claude/commands/*.md      (Claude Code)    │ validate-commands.js
│   ├── .gemini/commands/*.toml    (Gemini CLI)     │ 強制三方 description 一致
│   └── commands/*.toml            (Antigravity)    │
│                                                    ┘
├── agents/                    4 × persona（Claude Code 自動探索）
├── hooks/                     session-start / sdd-cache / simplify-ignore (bash)
├── references/                7 份共用 checklist
│
├── evals/          ★新增      cases/ (24 JSON) + fixtures/ (46 檔)
├── scripts/        ★大幅擴充  run-evals.js + 4 validators + lib/skill-lint.js + 4 test 檔
│
└── 多平台 manifest
    ├── .claude-plugin/plugin.json + marketplace.json
    ├── .codex-plugin/plugin.json          ★新增
    ├── .agents/plugins/marketplace.json   ★新增
    └── plugin.json
```

| 層 | 技術 |
|----|------|
| Skill 內容 | Markdown（SKILL.md，YAML frontmatter `name` + `description`，無程式碼依賴） |
| Hooks | Bash shell scripts（`jq` 為 session-start 的軟相依） |
| 驗證 / Eval | Node.js **零第三方相依**：`run-evals.js`、`validate-skills.js`、`validate-commands.js`、`validate-artifact-paths.js`、`validate-versions.js`、`lib/skill-lint.js`（`validate-skills.js` 本身被重構掉 166 行進 `lib/skill-lint.js`） |
| Eval 執行器 | headless `claude -p --output-format stream-json`（Tier 3，opt-in） |
| CI/CD | GitHub Actions（含 `test-plugin-install.yml`） |
| 版本一致性 | `validate-versions.js` 用 `git describe --tags` 對 5 份 manifest 做單一真相校驗 |
| 支援平台 | Claude Code、Codex（原生 plugin，CLI v0.122+）、Command Code、Gemini CLI、Cursor、Windsurf、GitHub Copilot、Antigravity CLI、OpenCode、Kiro IDE；另可經 `npx skills`（vercel-labs）鋪到宣稱 70+ 種 agent |

---

## 與現有環境的相關性評估

| 面向 | 評估 |
|------|------|
| **SKILL.md 格式相容性** | ✅ 原生 Agent Skills 格式，直接對應 C:\Users\sanyo\.claude\skills\ 結構 |
| **Claude Code 整合** | ✅ 第一公民支援，`/plugin marketplace add` 一行安裝 |
| **CLAUDE.md 原則呼應** | ✅ `doubt-driven-development` = R14 Bug 調查先行；`context-engineering` = R8 讀後再寫；`spec-driven-development` + `planning-and-task-breakdown` = R10 Checkpoint |
| **7-Agent 工廠工作流** | ✅ `/build auto` 邏輯與 researcher→spec-writer→builder→verifier 工廠流程高度對齊 |
| **Skill 清單預算** | ⭐ **高度相關**。本環境有 40+ skills 的 description 預算與漂移問題（`audit_skill_drift.py --listing-budget`），上游 Tier-2 eval 正是在解同一個問題，且實作零相依 |
| **R 系列制度呼應（補充）** | `code-review-and-quality` 的 Structural Remedies ↔ R13 品味量化；新增的 `references/definition-of-done.md` ↔ R17 交付契約；`validate-versions.js` 的「用 `git describe` 對多份 manifest 做單一真相校驗」與本環境 SessionStart 金絲雀的漂移看守同型 |
| **現有 skills 衝突風險** | 🟡 **中，且比 06-11 評估時高**。純 Markdown + Bash 本身無害，但有三個具體衝突面：**(a)** `/review` 與 Claude Code 內建 `/review` 撞名（[#95](https://github.com/addyosmani/agent-skills/issues/95) open 逾 3.5 個月）；**(b)** 上游 `docs/comparison.md` 明確警告**不可同時跑兩套 meta-skill router**，本環境已有多套 skill 生態，`using-agent-skills` 與其他 router 疊加須留意；**(c)** [#423](https://github.com/addyosmani/agent-skills/issues/423) 顯示與宿主內建 skill router 疊加會嚴重拖慢 |
| **Hooks 整合** | ✅ SessionStart hook 已自動生效（jq 依賴已修正）；`sdd-cache`/`simplify-ignore` 為 per-project 選配，未啟用，不衝突現有 hooks |
| **Codex 雙 AI 工作流** | ⚠️ 上游雖已支援原生 Codex plugin，但 [#465](https://github.com/addyosmani/agent-skills/issues/465)（33 留言，open）的 SessionStart hook 格式問題未解，接 Codex 端前須先確認 |
| **作者可信度** | ✅ Addy Osmani 為 Google Chrome 團隊工程師，在 web 效能與工程最佳實踐領域有長期貢獻 |
| **賽道位置** | ⚠️ 在直接可比的 skill 框架中排第三：obra/superpowers 269K⭐、mattpocock/skills 209K⭐、本專案 84K⭐（官方 anthropics/skills 167K⭐ 算入則第四）。且 84K stars 對應的最高觀看**專屬**教學影片只有 7,706 次——star 來源偏社群媒體曝光而非深度使用者社群 |

---

## 安裝建議

**✅ 維持安裝，並建議升級到 `0.6.6`** — SKILL.md 原生格式；skill 名單零變動代表升級無學習成本，拿到的是同樣 24 支 skill 的加厚版，外加一套可直接借用的 skill eval 方法論，以及兩個直接影響本機的 bug 修正（hook 路徑引號、manifest 版本一致性）。安全稽核四項全過（無靜默自我更新、無未經同意的網路請求、無資訊外送、無強制評分回傳），且上游主動在 `AGENTS.md` / `CLAUDE.md` 加上「不要把我們的設定檔複製進你的全域 agent 設定」的邊界宣告，供應鏈態度良好。

```bash
# Claude Code Plugin Marketplace 安裝（官方建議寫法）
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

> ⚠️ **本環境 06-11 安裝時遇到 GitHub SSH 認證失敗**（無 SSH key），改用本地 clone + 本地路徑 marketplace 繞過：
> ```bash
> git clone --depth 1 https://github.com/addyosmani/agent-skills.git d:/Claude/infra/reference-repos/agent-skills
> claude plugin marketplace add "d:\Claude\infra\reference-repos\agent-skills"
> # 編輯 .claude-plugin/marketplace.json：plugin 的 source 改為 "./"
> claude plugin marketplace update addy-agent-skills
> claude plugin install agent-skills@addy-agent-skills
> ```
> **上游現已提供官方解法**，不必再走本地 marketplace：`git config --global url."https://github.com/".insteadOf git@github.com:`（本環境慣例是用環境變數層級的 rewrite 取代改 global config）。此段保留為歷史紀錄。

安裝後 skills 自動放至 C:\Users\sanyo\.claude\skills\，斜線指令 `/spec`、`/plan`、`/build auto`、`/review`、`/ship` 即刻可用。

若只想選裝特定 skill，可手動 clone 後複製個別 `skills/<name>/SKILL.md` 到 `C:\Users\sanyo\.claude\skills\<name>\`。
> ⚠️ **已知缺口**：單支安裝不會帶走 repo 根層的 `references/` 目錄，該 skill 的 `## See Also` 指向共用 checklist 的連結會失效（skill 本身仍可運作）。追蹤於 [issue #361](https://github.com/addyosmani/agent-skills/issues/361)（per-skill 安裝情境，已於 2026-08-03 關閉）與 [issue #468](https://github.com/addyosmani/agent-skills/issues/468)（open，指出**完整安裝也一樣壞**）。

### 本機升級步驟（不是 `claude plugin update`）

本機實際載入來源是 **`d:\Claude\infra\reference-repos\agent-skills`**（directory 型 marketplace 註冊），plugin 從那份 clone 即時載入、不走 cache。因此升級 = 對該 clone 做 `git pull`。兩個障礙：clone 是 `--depth 1` shallow；且本機改過 `.claude-plugin/marketplace.json`（`source` → `"./"`），而上游 0.6.6 也動了同一個檔（加 `"version": "0.6.6"`），**直接 pull 必然衝突**。

```bash
R="d:/Claude/infra/reference-repos/agent-skills"
git -C "$R" diff -- .claude-plugin/marketplace.json > marketplace-local.patch  # 1. 先備份本機修改
git -C "$R" fetch --unshallow origin main    # 2. shallow 需先取回歷史（已 unshallow 過改用 fetch origin main）
git -C "$R" stash push -- .claude-plugin/marketplace.json
git -C "$R" merge --ff-only origin/main      # 3. 或 git -C "$R" reset --hard 0.6.6
git -C "$R" stash pop                        # 4. 衝突時手動保留 source:"./" 與 version:"0.6.6" 兩者

# 5. 驗收
git -C "$R" describe --tags                  # 應為 0.6.6
ls "$R/evals/cases" | wc -l                  # 應為 24
```

**升級後必做**：重啟 session 確認 personas 是否仍重複載入；若 `agent-skills:*` 與裸名 4 個 persona 並存，刪除 `d:\Claude\.claude\agents\specialized\agent-skills\` 下的 4 個副本。

**另兩項待辦**：
- 修正 `D:\Claude\plugins\installed_plugins.json` 中 `agent-skills@addy-agent-skills` 的死 installPath（宣告 `D:\claude\plugins\cache\...`，實際內容在 `D:\Claude\infra\plugins\cache\...`），或確認其確實不影響 directory 型 marketplace 載入後記錄為已知無害。
- 觀察 `commands` 陣列化（`["./.claude/commands", "./commands"]`）升級後是否造成 8 個同名指令重複註冊——**本次未能實測**（本機仍跑 0.6.2）。

### 但要調整期待值

1. **範式本身有未解的根本質疑**：HN 376 分主討論串批判聲量大於讚聲，核心論點是「決定要不要遵守流程的，正是那個想跳過流程的模型」，且有 microsoft/vscode [#315895](https://github.com/microsoft/vscode/issues/315895) 的對照實驗支持（結論：skill 只在使用者明打 `/skill-name` 時可靠觸發）。上游新增 `evals/` 正是在回應這點，但 Tier 2 只是 lexical 近似、Tier 3 要花 token，**尚未構成 with/without 的效果證明**。
2. **社群主流用法是「當參考書」而非「整包裝」**——與本環境 R13（加複雜度換小改善→不做）同調。
3. **最高 ROI 的動作其實不是升級，而是抽取 `evals/` 的 Tier-2 方法論**去解本環境 40+ skills 的描述漂移問題。**不建議再擴大採用**（接 Codex 端、或啟用 per-project 的 sdd-cache/simplify-ignore hook），理由是 [#465](https://github.com/addyosmani/agent-skills/issues/465) 未解、meta-skill router 疊加風險真實存在。

---

## 反向連結

- [[Claude/Karpathy 最高遵守原則 — AI 行為準則]] — `doubt-driven-development` 與 R14 Bug 協議高度對齊
- [[Claude/Claude環境操作手冊]] — Skills 安裝與管理路徑
- [[anthropicsknowledge-work-plugins]] — 同為 Claude Code 官方/知名 skill 套件，互補而非重疊
- [[ECC — Claude Code harness-native 操作系統]] — 另一個 skills 生態系（100+ skills，風格更 harness-native）

---

## Tags

#skills #claude-code #engineering #tdd #spec #planning #security #performance #observability #git #ci-cd #api-design #debugging #frontend #agent-skills #addy-osmani