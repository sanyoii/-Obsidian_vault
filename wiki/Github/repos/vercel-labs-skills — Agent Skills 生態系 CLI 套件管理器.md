---
source: "https://github.com/vercel-labs/skills"
author: "Vercel Labs (vercel-labs)"
stars: "25K+"
clipped: 2026-07-06
tags:
  - "github/repo"
  - "claude-code-skills"
  - "cli-tool"
  - "package-manager"
---

# skills — Agent Skills 生態系的 npm 風格套件管理器

> **vercel-labs/skills** | ⭐ 25,232 | 🍴 2,102 | 📝 MIT
> "The open agent skills tool - npx skills"

## 一句話說明

`npx skills` 是 Vercel 打造的 Agent Skills 套件管理器 CLI——把 Claude Code / Cursor / Codex 等 78+ 種編碼 agent 的 Skill 安裝，統一成 `npx skills add owner/repo` 一行指令，並提供 skills.sh 網站作為 Skill 探索排行榜（目前索引 89 萬+ 次安裝）。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 25,232 |
| Forks | 2,102 |
| 主要語言 | TypeScript (95.3%) |
| 授權 | MIT（package.json 內宣告，GitHub 未偵測到 LICENSE 檔） |
| 建立時間 | 2026-01-14 |
| 最後推送 | 2026-07-06 |
| Open Issues | 555（累計） |
| Open PRs | 288（累計） |
| 最新 Release | v1.5.14（2026-06-29） |
| 首頁 | https://skills.sh |
| 貢獻者 | 110 人（quuu / github-actions[bot] / huozhi / elliotllliu / pi0 等） |

## Repomix 分析

91 個檔案，18 萬 tokens。核心邏輯集中在 `src/`：`add.ts`（安裝主邏輯，17K tokens 最大檔）、`installer.ts`、`providers/wellknown.ts`（78+ agent 的路徑對照表）、`agents.ts`。測試覆蓋完整（`tests/` 20+ 檔，涵蓋 symlink、跨平台路徑、subpath-traversal 安全測試）。

## 核心功能

- **`npx skills add <owner/repo>`**：從 GitHub/GitLab/任意 git URL/本機路徑安裝 Skill，支援 symlink（預設，單一副本多 agent 共用）或 `--copy` 模式
- **`npx skills use <source>`**：不安裝、直接生成 prompt 或啟動指定 agent 互動式執行單一 Skill
- **`npx skills find [query] [--owner]`**：互動式或關鍵字搜尋 Skill，可限定某 GitHub owner
- **`npx skills list` / `update` / `remove` / `init`**：完整套件生命週期管理
- **`skills/find-skills`**：本專案內建、也是 **skills.sh 全站安裝榜第一名**（240 萬次安裝）的 Skill——教導 agent 自己判斷「使用者想要的功能是否該去找一個 Skill」，並在推薦前檢查安裝數/來源信譽/GitHub star 數以避免推薦劣質 Skill。

## 技術架構

```
bin/cli.mjs → src/cli.ts（指令入口）
                ├─ src/add.ts / installer.ts（安裝：symlink or copy）
                ├─ src/providers/wellknown.ts（78+ agent 路徑對照表）
                ├─ src/find.ts / source-parser.ts（來源解析：GitHub/GitLab/本機）
                ├─ src/sync.ts / update.ts（版本追蹤、更新）
                └─ src/skill-lock.ts（lockfile 機制，類似 package-lock.json）
```

| 層次 | 技術 |
|------|------|
| CLI 框架 | Node.js + TypeScript，obuild 打包 |
| 測試 | Vitest |
| CI | GitHub Actions（agents.yml 自動同步 agent 清單、ci.yml、publish.yml） |
| 安全 | subpath-traversal 測試、sanitize.ts 輸入清洗 |

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 110 人 | 活躍，含 Vercel 內部與外部貢獻 |
| Release 頻率 | v1.5.x 密集迭代（近期每週級） | 頻繁 |
| 半年內成長 | 2026-01 建立 → 25K+ ⭐ | 成長極快，Vercel 官方背書 |

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Claude Code** | **已直接使用**——本機 `find-skills` Skill（`d:\Claude\.claude\skills\find-skills\`、`C:\Users\sanyo\.claude\skills\find-skills\`）內容與此 repo 的 `skills/find-skills/SKILL.md` 逐字相同，代表過去已透過某管道（可能是 antigravity-awesome-skills 或直接複製）安裝了此官方 Skill。 |
| **Skill 生態治理** | find-skills 的「驗證品質再推薦」流程（裝機量>1K、來源信譽、star 數）與本機既有 `feedback_available_skills_list_stale` 記憶的精神一致——都是「別無條件信任清單」。 |
| **CLI 工具** | 若要用官方管道管理 Skill（而非手動雙位置同步），`npx skills` 可取代目前 `d:\Claude\.claude\skills\` → `C:\Users\sanyo\.claude\skills\` 手動複製流程，但需先評估 symlink 模式在 Windows 上的相容性。 |

## 安裝建議

⏳ 觀望 — CLI 工具本身不需要「安裝」（npx 隨用隨跑即可），其 `find-skills` Skill 已在本機生效中。若想用它管理現有 skills 目錄的同步，建議先在測試目錄試跑 `npx skills list` 確認能否正確辨識 `d:\Claude\.claude\skills\` 下現有的自製 Skill，再決定是否取代現有手動同步 SOP。

## 相關連結

- [[Github/repos/antigravity-awesome-skills — Agent Skills 收藏庫]]（find-skills 可能來源之一）
- [[projects/project_skills_quality_upgrade]]（本機 Skill 品質治理歷程）
- [[feedback/feedback_available_skills_list_stale]]（清單不可全信的既有教訓，與 find-skills 品質驗證邏輯呼應）
