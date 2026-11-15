---
source: "https://github.com/vercel-labs/skills"
author: "Vercel Labs (vercel-labs)"
stars: "39K+"
clipped: 2026-07-06
updated: 2026-11-15
tags:
  - "github/repo"
  - "claude-code-skills"
  - "cli-tool"
  - "package-manager"
---

## skills — Agent Skills 生態系的 npm 風格套件管理器

> **vercel-labs/skills** | ⭐ 39,384 | 🍴 3,465 | 📝 MIT | v1.8.1（2026-11-10）
> "The open agent skills tool - npx skills"

> 📊 **2026-11-15 回訪：舊篇有兩個結論要改。** ①「本機 find-skills 與上游逐字相同」已不成立，本機停在上游 07-06 那次修改之前。② 07-17 補的 ⏳ 升級／放棄條件（拿 `npx skills` 取代手動同步 SOP）可以結案改判 ❌：兩者管的是不同的東西，見〈安裝建議〉。星數 25K→39.4K，npm 週下載 513 萬。

**本次可用引擎（Phase 0）**：gh ✅｜npx ✅（repomix 成功）｜defuddle ✅（skills.sh）｜yt-dlp ✅｜mcporter ⚠️ `exa` 回 Unknown MCP server，改走 WebSearch｜opencli／twitter-cli 未跑（社群口碑以 WebSearch 與 YouTube 補）。另外，想用 `npx skills list -g` 實測本機辨識，被自動模式安全分類擋下，**這項未實測**。

### 一句話說明

`npx skills` 是 Vercel 做的跨 agent skill 安裝器：一行 `npx skills add owner/repo` 把 skill 裝進 Claude Code、Codex、Cursor 等 79 種 coding agent 的目錄，附 `find`、`update`、`remove` 與 lock 檔；配套網站 skills.sh 是全站安裝排行榜。repo 內附的 `find-skills` 是榜上第一名（440 萬次安裝），教 agent 在使用者想要某種能力時先去找現成 skill。

### 專案概覽

| 項目 | 數值 | 對比 07-06 |
|------|------|-----------|
| Stars | 39,384 | 25,232 |
| Forks | 3,465 | 2,102 |
| 主要語言 | TypeScript | — |
| 授權 | MIT（現在有 LICENSE 檔） | 只在 package.json 宣告 |
| 建立時間 | 2026-01-14 | — |
| 最後推送 | 2026-11-12 | — |
| Open Issues | 547 | 555 |
| Open PRs | 210 | 288 |
| 最新 Release | v1.8.1（2026-11-10；10 月起約每週一版） | v1.5.14 |
| Topics | 未設定 | — |
| 首頁 | https://skills.sh | — |
| 是否 Archived | 否 | — |
| npm `skills` 週下載 | 5,131,611（repository 欄位已核對指回本 repo） | 未取 |

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 216（07-06 為 91） |
| 總 Tokens | 446,089 |
| 壓縮模式 | 未使用（2.2MB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| src/add.ts | 30,160 | 6.8% |
| tests/update.test.ts | 12,462 | 2.8% |
| tests/sync.test.ts | 12,409 | 2.8% |
| src/update.ts | 12,127 | 2.7% |
| src/add.test.ts | 11,304 | 2.5% |

Repomix 安全掃描：無可疑檔案。

### 核心功能

- **`add <source>`**：從 GitHub／GitLab／任意 git URL／本機路徑安裝；預設專案範圍，`-g` 裝到全域。安裝模式有 symlink（預設：先放 `.agents/skills/<name>`，各 agent 目錄連過去）、copy、link。**symlink 建不起來時會自動改用複製**（`src/installer.ts`），所以 Windows 沒開發者模式也能裝。
- **`find [query] [--owner]`**：搜 skills.sh 索引，可限定 GitHub owner。
- **`list`／`check`／`update`／`remove`／`init`**：完整生命週期；`list` 是唯讀。
- **`use <source>@<skill>`**：不安裝，直接產生 prompt 或帶著 skill 開啟指定 agent。
- **`skills-lock.json` v2**：每個 skill 記 `computedHash`（README 公開演算法與測試向量）加來源 `commit`，`install --frozen-lockfile` 會照 commit 取回並驗雜湊。
- **實驗功能**：`experimental_sync` 把 npm 相依套件附帶的 skill 連進專案；`experimental_install` 照 lock 還原。
- **程式化 API**：`import { installSkills } from 'skills'`。
- **安全稽核**：安裝時向 skills.sh 查第三方掃描結果（Snyk、Socket、Gen Agent Trust Hub），標示 risk 等級。

### 技術架構

```
bin/cli.mjs → src/cli.ts（指令路由）
   ├─ add.ts / install.ts / installer.ts   安裝：canonical 目錄 + 各 agent symlink（失敗改 copy）
   ├─ agents.ts                            79 個 agent 的專案／全域目錄對照
   │     claude-code 全域目錄 = $CLAUDE_CONFIG_DIR/skills（沒設才用 ~/.claude/skills）
   ├─ source-parser.ts / download-source.ts / git.ts / github-host.ts / blob.ts   來源解析與下載
   ├─ skill-lock.ts / local-lock.ts / skill-hash.ts   lock 檔與內容雜湊
   ├─ update.ts / update-source.ts / sync.ts         更新與 npm 相依同步
   ├─ find.ts / skills-sh-config.ts                  skills.sh 搜尋
   ├─ telemetry.ts                                   匿名統計 + 安全稽核查詢（skills.sh/tele/*）
   └─ api/*                                          程式化 API
```

| 層次 | 技術 |
|------|------|
| CLI | Node.js ≥ 22.20、TypeScript、obuild 打包 |
| 測試 | Vitest 單元測試 + `e2e/`（GitHub、npm、Notion、blob、well-known 來源） |
| CI | GitHub Actions：ci、e2e、publish、agents（同步 agent 清單） |
| 維運自動化 | `.automations/`、`.vc/` 內有 triage 與 PR 標籤用的 skill 化工作流 |

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | quuu 294、github-actions[bot] 50、antfubot 39、huozhi 22、jonathanhefner 11、antfu 9、elliotllliu 8、pi0 8、yearth 7、mlekhi 7 | 主力一人，但有 Vercel 內部與 unjs 系維護者 |
| 近 4 週 commit | 8／26／29／29 | 活躍 |
| Release 頻率 | v1.7.4（10/19）→ v1.8.1（11/10），約每週一版 | 頻繁 |
| Issue | 547 open，多為新增 agent 支援與路徑問題 | 量大、分流靠自動化 triage |

### 社群口碑

**熱門討論：**
- **YouTube**：8 支相關影片，最高 8.9 萬觀看（Hugging Face 頻道的「Claude Code Skills & skills.sh」速成課），另有 Better Stack 3 萬觀看；有專講 find-skills 的影片。教學生態成熟。
- **安全掃描**：skills.sh 上有大量第三方自動稽核頁（Snyk、Socket、Agent Trust Hub），常見標記是「從任意 GitHub 來源執行期拉內容」，風險評等依 skill 而異。這些是對個別 skill 的掃描，不是對 CLI 本身的稽核。
- Reddit／Hacker News 沒搜到有機討論。

**正面回饋：** 一行安裝跨 agent、排行榜好找、有安全稽核標示。
**負面回饋 / 已知問題：** `remove -g` 不清非 universal 的 agent 目錄（#1444）；WSL 下會誤叫 `cmd.exe`（#1054）；部分 agent 全域目錄偵測錯誤（#2450）；預設開啟遙測，要設 `DISABLE_TELEMETRY=1`。

### find-skills 本機與上游比對

本機 `~/.claude/skills/find-skills/SKILL.md`（5,446 bytes）對上游 `b716f9dc`（5,472 bytes），frontmatter 一致，正文差三處：

| 位置 | 本機 | 上游 |
|------|------|------|
| 指令清單 | `npx skills find [query]` | `npx skills find [query] [--owner <owner>]`，可限定 GitHub owner |
| 指令清單 | 有 `npx skills check` | 刪掉（上游 commit 773fb2c7「remove redundant check command」；CLI 仍保留 `check`，只是文件精簡） |
| 搜尋範例 | `npx skills find [query]` | 加上 `[--owner <owner>]` |

結論：本機停在 07-06 之前的版本，差異只影響「能不能限定 owner 搜尋」，不影響現有用法。

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低。skills.sh 排行榜可當選 skill 的參考來源 |
| **Claude Code** | **find-skills 在用中**（本機版落後上游一版）。CLI 會讀 `CLAUDE_CONFIG_DIR`，在這台會指到 `D:\claude\skills` |
| **Automation** | `skills-lock.json` 的 commit + `computedHash` 正好是本環境手動安裝第三方 skill 時缺的「記來源 commit、可驗內容」；目前靠 commit 訊息與 LOCAL MOD 註解記錄 |

### 安裝建議

**✅ find-skills 留用並更新到上游版本；CLI 不取代現有 SOP（07-17 的 ⏳ 改判 ❌）**

- **為什麼 CLI 不取代 SOP**：`npx skills` 是第三方 skill 的安裝器，裝到 `.agents/skills` 再連到各 agent。本環境的三位置 SOP（active → `infra/skills-backup` → marketplace，`sync_skills.py` 單向同步、git 追蹤）管的是自製 skill 的備份、瘦身與同步。兩者解決的問題不同，換過去反而會失去 git 備份與 LOCAL MOD 紀錄。
- **可以借用的部分**：第三方 skill 想要可重現安裝時，可以參考 lock 檔的「來源 commit + 內容雜湊」記法（README 公開演算法與測試向量）。
- **如果要用 CLI**：先設 `DISABLE_TELEMETRY=1`；只用 `find`、`list` 這類唯讀指令。`add -g` 會直接寫進 `D:\claude\skills`，要走 SOP 就別用。
- **未實測**：`npx skills list -g` 本次被安全分類擋下，CLI 能不能正確列出自製 skill 沒有驗證；上面的判斷不依賴這項。

### 延伸操作

- 想看 lock 檔演算法細節：README〈Lock File Content Hash〉，或 `docs/commands.md`。
- 想比較排行榜上的其他 skill 集：mattpocock/skills、heygen-com/hyperframes 可再跑 `/repo-intel`。

## 相關連結

- [[Github/repos/antigravity-awesome-skills — Agent Skills 收藏庫]]（find-skills 可能來源之一）
- [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill|vercel-labs/agent-skills]]
- [[projects/project_skills_quality_upgrade]]（本機 Skill 品質治理歷程）
- [[feedback/feedback_available_skills_list_stale]]（清單不可全信的既有教訓，與 find-skills 品質驗證邏輯呼應）

> 回訪紀錄：07-06 初篇（25K⭐、⏳）→ 07-17 補復查條件 → 11-15 回訪（39K⭐、find-skills 本機落後一版、CLI 取代 SOP 改判 ❌）。
