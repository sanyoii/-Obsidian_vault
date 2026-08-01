---
source: "https://github.com/yuliang615/claude-cache-guard"
author: "yuliang615 (HUNG YU LIANG)"
stars: "33"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "claude-code"
  - "statusline"
  - "session-handoff"
  - "rate-limit"
---

# claude-cache-guard — 5 小時額度到頂前自動寫交接檔的 statusLine 守門員

> 來源：https://github.com/yuliang615/claude-cache-guard
> 授權：MIT｜⭐ 33｜建於 2026-06-20，發布 2026-07-05（3 commits，單人）
> 規模：42 檔 / 129,854 tokens / 151 KB（2026-08-01 repomix 實測）
> npm：`claude-cache-guard`（CLI 名 `ccg`），0.1.0 / 0.1.1，**零依賴**

## 這是什麼？

掛在 Claude Code statusLine 上的本機額度守門員。持續從官方 statusLine payload 抽 5 小時 / 7 天用量寫進本機檔；用量越過門檻（預設 90%）時，透過 `Stop` / `PostToolBatch` hook 要求 Claude 先寫出結構化交接檔 `next_session.md` 才准停下。

**它防的不是「用太多」，是一個具體的成本陷阱**：額度視窗耗盡後你等重置的期間 prompt cache 會冷掉；此時回到原本那個大 session，整段對話會以**未快取的 input tokens** 重新計費讀入，還沒開始做事就先吃掉新視窗一大塊。解法是「換小 session + 讀交接檔」，而不是 `/clear`（會遺失細節）。

## 核心設計

- **包裝而非取代 statusLine**：讀完 stdin JSON、白名單過濾、原子寫入 `~/.claude/usage-state.json` 後，把你**原本的 statusLine 指令 spawn 起來原樣輸出**。安裝只改 `settings.json` 的 `statusLine` 一個欄位並先備份。
- **交接檔格式規定死**：12 個固定區塊，含 `## Original User Prompts`（要求**逐字、依序**保存每則使用者指令，理由寫在模板裡：「compaction 會改變語意，所以這裡是未壓縮的真相來源」）、`## Do Not Repeat`、`## Commands And Verification`、`## Resume Prompt`。落在 `~/.claude/next-session/<專案名>--<路徑 sha256 前 8 碼>/`。
- **每視窗只吵一次**：hook state 以 `resets_at` 導出的 window id 為鍵（不是牆鐘時間）。`resets_at` 缺失時**刻意不觸發**——空 window id 會被後續所有視窗共用，一觸發等於永久靜音。
- **兩種模式**：`auto`（預設，直接塞 prompt 給 Claude，等檔案真的寫出來才放行）／`ask`（問一次，永不主動擋停）。
- **8 個 `/ccg*` slash command**，唯讀類在展開當下先跑完 CLI 再交輕量模型排版，幾乎不吃 token。裝進 `~/.claude/commands/` 時每檔 frontmatter 插一句 YAML 註解當指紋，uninstall 只刪自己蓋的、同名使用者檔案留著。
- **四層設定合併**：內建預設 < 全域 config < 專案 `.claude-cache-guard.json` < CLI flag。

## 值得抄的防禦寫法（讀原始碼看到的，非 README）

- **雙層遞迴防護**（`statusline.js`）：正則辨識前一個 statusLine 是不是自己，但註解明說正則只是 best-effort；真正的保證是 spawn 時打 `CCG_BRIDGE_CHILD=1`，即使正則漏判子行程也會拒絕再遞迴，鏈長硬鎖一層。
- **殺 process group 不只殺 child**：`detached: true` 讓 shell 成 group leader，超時用 `process.kill(-pid)`，Windows 無 group signal 時退回直接 kill；額外 `destroy()` 自己這端 pipe，防被 reparent 的孫行程握著 stdout 把 bridge 吊死。1.5s 超時 + 4KB 輸出上限。
- **symlink 攻擊防護**（`handoff.js`）：`--force` 覆寫前先 `lstat`，是 symlink 就先 `rm` 連結本身再 temp-then-rename——因為 `"w"` 開檔會跟隨 symlink 去 truncate 受害者檔案。檔名另擋 path traversal。
- **sanitize 順序講究**：控制字元（含 C1 / ANSI escape）先剝除、**再**比對敏感標記，理由寫在註解：交錯的控制位元組能把關鍵字切斷讓正則漏判。
- **全線 fail open**：寫檔失敗只記 log 照樣 render，hook 任何例外都吞掉（「never block Stop」）。手動改壞 config 不會讓每次刷新都爆。
- **拒絕抄走可能含密鑰的指令**：安裝時若偵測到你原本的 statusLine 指令字串含 token/secret/Bearer 字樣，**寧可放棄包裝也不存**（`skippedSensitivePreviousStatusLine`）。

## 供應鏈稽核：五項全綠

| # | 檢查項 | 結果 |
|---|--------|------|
| 1 | npm 套件真實性／發布者 | ✅ 存在，maintainer 與 package.json author、GitHub owner 三者一致，含 provenance 簽章 |
| 2 | 安裝期腳本 | ✅ **零** postinstall／preinstall／prepare |
| 3 | 相依套件 | ✅ **零依賴**（dep 與 devDep 皆空） |
| 4 | 發布產物 vs 原始碼 | ✅ 0.1.1 tarball 解開：21 檔與 `files[]` 白名單完全吻合無夾帶；`bin/`＋`scripts/`＋`src/`（11 檔）＋`package.json` 共 **14 檔逐檔比對零差異** |
| 5 | 對外網路 | ✅ `fetch(`／`node:http(s)`／`node:net`／`node:dns` 全 repo **零命中**；`child_process` 僅三處（spawn 使用者原 statusLine、doctor 探 `jq --version`、CLI 自我遞迴）；無 `eval`／`new Function` |

殘留風險是常態的社會工程層面：單人維護、帳號僅 1 個公開 repo。**採用應釘版本，不用 `@latest`**。

## 品質與採用度的矛盾訊號

程式碼品質遠高於 33 星單人專案常態——**測試碼體積是產品碼的 1.5 倍**（19 test 檔 238 KB vs 11 src 檔 158 KB），檔名本身就是開發史：`audit-fixes` / `qa-fixes` / `config-hardening` / `prototype-residue` / `legacy-hook-cleanup` / `home-directory-project`；三語文件（en/zh-TW/zh-CN）等長非機翻；CI 跑 Node 18/20/22 三版 + `npm pack --dry-run`。

但外部使用證據為零：0 issue、0 fork、0 PR、1 watcher。合理解讀是「作者自用打磨得紮實，但幾乎沒有第二個人真的裝過」。**採用者很可能是最早踩坑的那批。**

## 本機環境的兩處硬衝突

### 一、不認 `CLAUDE_CONFIG_DIR`（決定性）

`src/paths.js` 全檔只用 `os.homedir()`，全 repo grep `CLAUDE_CONFIG_DIR` **零命中**。本機是 `CLAUDE_CONFIG_DIR=D:\claude`（取代語意），實測後果兩項：

1. `ccg install` 把 statusLine 寫進 `C:\Users\sanyo\.claude\settings.json`，但 Claude 實際讀 `D:\claude\settings.json` → **statusLine 永不生效、usage-state.json 永遠空、整條 hook 鏈失效**；且該檔是 config-drift-check 金絲雀第 [1] 項（「C: settings.json is empty {}」），一裝就 WARN。
2. `/ccg*` 裝進 `C:\Users\sanyo\.claude\commands\`（實測存在但**非 junction**），而 `D:\claude\commands` **不存在** → 8 個指令一個都不會出現。與 2026-07-07 skills Issue #1 完全同型。

繞法（手動搬 statusLine 行 + 建 commands junction）存在但把外部座標寫死在自己環境，屬「安裝後腐化」型陷阱。

### 二、statusLine 位置已被 caveman plugin 佔用

ccg 會 spawn 包裝原本的 `caveman-statusline.ps1`，技術可行但每次刷新多起一個 PowerShell 行程（Windows 冷啟動慢）；且 caveman vs cc-statusline 的衝突本身尚未結案。

## 但功能空缺是真的

`/last-word`、`/session-close` 觸發條件是 **context 用到 ~40%**（R15）；ccg 是 **5 小時額度視窗 90%**——**兩個正交的軸**。已知痛點「月支出上限到頂時 subagent 派工先死、主對話仍能跑」正落在 ccg 那條軸上，`/last-word` 管不到。

## 安裝判定：⏳ 觀望

程式碼與供應鏈都過稽核、問題也真實且與 `/last-word` 正交，但**環境不相容（statusLine 與 slash commands 兩條路都靜默失效）＋ 零外部使用證據**，現在裝等於同時吃兩份風險。

**零成本可抽取項**：把交接模板的 `## Original User Prompts`（逐字依序保存所有原始指令）與 `## Do Not Repeat` 兩欄補進 `/last-word` 產出格式。本次分析最高 ROI，不需裝任何東西。

**升級條件（→ ✅）**：①上游支援 `CLAUDE_CONFIG_DIR` 或提供 `--home` 旗標（該 repo 0 issue，開 issue 詢問成本低）②出現第三方使用證據（≥3 外部 issue／fork 有實質 commit／真人使用回報）③本機 statusLine 歸屬結案、空出乾淨槽位。

**放棄條件（→ ❌）**：①2026-11-01 前仍 0 commit / 0 issue / 0 fork ②Claude Code 官方把用量門檻提醒或自動交接做進內建（payload 已含 `rate_limits`，官方一步之遙）③`/last-word` 自行補上「用量軸」觸發——**這條自己就能做**，做了本專案增量歸零。

## 相關連結

- [[Github/_index|GitHub Repo 分析索引]]
- [[Tools/repo-intel|repo-intel Skill]]（本頁產出工具）
- 既有 `verify_gate.py`（user-level Stop hook）與本專案同屬 Stop 攔截器家族，機制相容但會疊加：前者擋「改了程式碼沒跑測試」，後者擋「額度到頂沒寫交接」
