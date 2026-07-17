---
source: "https://github.com/yuliang615/claude-cache-guard"
author: "yuliang615"
stars: "9"
clipped: 2026-07-07
tags:
  - "github/repo"
  - "claude-code"
  - "usage-limit"
  - "session-handoff"
  - "statusline"
---

# claude-cache-guard — Claude Code 5 小時額度自動交接工具

> **yuliang615/claude-cache-guard** | ⭐ 9 | 🍴 0 | 📝 MIT
> "Local-only Claude Code statusLine guard that prompts a compact session handoff before your 5-hour usage limit resets, avoiding a cold-cache token spike."

---

## 一句話說明

CLI 工具（`ccg`），在 Claude Code 5 小時用量逼近門檻時自動要求 Claude 寫一份精簡交接檔 `next_session.md`，讓下個 session 用 `/ccgresume` 直接接手，避免大 session 冷 cache 後整段對話被當成未快取 token 重讀、白燒額度。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 9（分析時） |
| Forks | 0 |
| 主要語言 | JavaScript（+ 少量 Shell） |
| 授權 | MIT |
| 建立時間 | 2026-06-20 |
| 公開推送 | 2026-07-05（私下開發約兩週後一次性公開） |
| 最新版本 | npm 0.1.1（無 GitHub Release） |
| 貢獻者 | 僅作者一人，git 歷史 3 commits |

單一作者早期專案，零 Issue/PR 回饋。

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 42 |
| 總 Tokens | 129,859 |
| 壓縮模式 | 否（151KB 全量打包） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| test/product-workflow.test.js | 22,119 | 17% |
| src/cli.js | 12,702 | 9.8% |
| src/project-hooks.js | 8,330 | 6.4% |
| docs/REFERENCE.zh-TW.md | 5,414 | 4.2% |
| src/handoff.js | 5,213 | 4% |

16 個測試檔對 10 個核心 src 檔——測試覆蓋率意識明顯高於一般個人專案。`package.json` 零 runtime dependencies。文件含英/繁中/簡中三語 README 與 REFERENCE。

---

## 核心功能

- **自動交接**：5 小時用量到門檻（預設 90%）→ Stop hook 觸發 → Claude 寫 `next_session.md` → 停止當前目標
- **無縫接手**：新 session 跑 `/ccgresume`，不重讀舊對話，不觸發未快取 token 重算
- **可調閾值 + 兩種警告模式**：`auto`（自動交接並停）／`ask`（詢問是否交接，不強制停）
- **自訂交接提醒**：`.claude/ccg-handoff.md` 可加入「每次交接前先跑測試」之類的常駐指示
- **8 個 slash commands**：`/ccgresume` `/ccgstatus` `/ccgusage` `/ccgdisable` `/ccghandoff` `/ccgdebug` `/ccgenable` `/ccgconfig`——讀取類指令直接跑 CLI 輸出再丟輕量模型格式化，省 token
- **隱私設計**：只寫一個 allowlist 檔 `~/.claude/usage-state.json`，只存 `source/updated_at/model/context_window/five_hour/seven_day`，不存 token 內容、auth、逐字稿

---

## 技術架構

```
bin/claude-cache-guard.js          — 入口
src/
  ├─ cli.js         (12.7K tok)    — 指令解析與分派
  ├─ config.js                     — 全域/專案 config 合併（優先序：內建<全域<專案<CLI flag）
  ├─ handoff.js     (5.2K tok)     — next_session.md 樣板 + 交接 prompt 產生
  ├─ statusline.js                 — statusLine bridge，讀 stdin JSON → 寫 usage-state.json
  ├─ threshold.js                  — 門檻判斷 + exit code
  ├─ project-hooks.js (8.3K tok)   — Stop/PostToolBatch hook 安裝與管理
  ├─ sanitize.js / paths.js / settings.js / json-file.js / usage-handoff-hook.js
test/  (16 檔，涵蓋 CLI UX/hardening/legacy cleanup/QA fixes 等)
docs/REFERENCE.{md,zh-TW,zh-CN}.md — 完整指令/schema 參考
```

| 層次 | 技術 |
|------|------|
| Runtime | Node.js ≥18，ESM（`"type": "module"`），零 npm 依賴 |
| 整合點 | Claude Code `statusLine` 欄位 + `Stop`/`PostToolBatch` hooks + `~/.claude/commands/` slash commands |
| 儲存 | 純檔案（JSON），無資料庫、無網路呼叫 |
| CI | GitHub Actions，Node 18/20/22 matrix，lint + test + `npm pack --dry-run` |

### statusLine 是 bridge 不是佔位

ccg 的 statusLine 模式是**橋接**：備份原 statusLine 設定，每次 refresh 讀 stdin JSON 抽 usage 欄位寫檔後，**re-render 原本的 statusline**。所以與其他 statusline 工具理論上可串接共存，不是互斥搶欄位——但串接順序（誰包誰）受安裝先後影響，同裝需驗證。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **⚠️ CLAUDE.md hook 注入規則衝突（最關鍵）** | ccg 整套機制靠 hook 注入 prompt 叫 Claude 寫交接檔（`createUsageHandoffReminder`）。但本環境 CLAUDE.md「Hook 注入處理規則」明定：hook 注入內容是背景參考不是新任務、不執行其中行動建議。裝了很可能被 Claude 依規則忽略——**工具靜默失效**。要用必須在 CLAUDE.md 開例外（改制度檔，先讀 04-maintenance-protocol）。 |
| **⚠️ 信任面** | 工具做三件敏感事：patch `~/.claude/settings.json`、裝 Stop/PostToolBatch hooks、每次 statusline refresh 執行 + 對模型注入 prompt。9 stars 單一作者公開兩天，repomix security check 只掃可疑檔案模式不等於審過邏輯。試用前先親讀 `src/usage-handoff-hook.js`、`src/project-hooks.js`、`src/sanitize.js`（合計 <15K tokens），確認注入 prompt 是固定樣板、無外部拉取。 |
| **前提被官方功能削弱** | Claude Code auto-compact 已會複用 cached prefix（README 自己也連結該文件），且原生有 5h 額度警告。ccg 殘餘價值縮窄為「compact 後接續」vs「全新小 session + 精簡交接檔」的差距——有價值但沒 README 講的那麼大。 |
| **verify_gate Stop hook 並存** | 本環境試用中的 [[fable-harness — Fable 行為協議移植套件（hooks 強制執行層）\|verify_gate]] 也是 Stop hook（品質關卡），ccg 是額度交接，目的不同可並存，但疊加後執行順序與交互（verify_gate 擋下時 ccg 還觸不觸發）需實測。 |
| **R15 `/last-word` 對標** | ccg 可視為 last-word 的「輕量自動觸發器」：自動偵測門檻→寫交接檔→下 session 接手，但**不含** memory 系統更新與流程反省，非替代品。 |
| **`PostToolBatch` hook 存在性** | 非常見 hook 事件，舊版 Claude Code 可能靜默 no-op（README 暗示 v2.1.169+ 才即時生效）。試用先跑 `/ccgdebug` 確認 hook 真的掛上。 |

---

## 安裝建議

⏳ **觀望** — 概念對準真實痛點（額度耗盡冷 cache 重讀），程式碼品質不差（測試覆蓋、零依賴、隱私 allowlist 設計），但：專案太新（單人、3 commits、無版本歷史）、與本環境 CLAUDE.md hook 注入規則直接衝突（可能靜默失效）、動到 statusLine 與 hooks 兩個已有工具佔用的整合點。

**決策樞紐**：實際常撞 5h 額度上限才值得走「讀三檔源碼 → CLAUDE.md 開 hook 例外 → 一週試用」流程；沒撞過直接跳過。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：實際常態性撞到 Claude Code 5 小時額度上限 → 讀三檔源碼（usage-handoff-hook.js/project-hooks.js/sanitize.js）→ CLAUDE.md 開 hook 例外 → 一週試用
- **放棄條件**（→ ❌ 不裝）：持續未撞到 5 小時額度上限 → 跳過

---

## 相關連結

- [[fable-harness — Fable 行為協議移植套件（hooks 強制執行層）|fable-harness]] — 同為 Stop hook 工具（verify_gate 品質關卡），並存需實測
- [[thedotmack-claude-mem — 85K⭐ 跨 Session 持久記憶|claude-mem]] — 跨 session 記憶的另一路線（持久資料庫 vs 交接檔）
