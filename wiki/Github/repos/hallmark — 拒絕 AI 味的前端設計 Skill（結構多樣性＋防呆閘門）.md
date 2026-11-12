---
source: "https://github.com/Nutlope/hallmark"
author: "Nutlope (Hassan El Mghari)"
stars: "53K+"
clipped: 2026-07-18
updated: 2026-11-12
tags:
  - "github/repo"
  - "claude-code-skill"
  - "frontend-design"
  - "anti-ai-slop"
---

## hallmark — 拒絕「AI 味」的前端設計 Skill（v2：主題目錄＋可執行 linter）

> **Nutlope/hallmark** | ⭐ 53,583 | 🍴 2,854 | 📝 MIT | SKILL v2.0.0（2026-10-21）
> "Anti-AI-slop design skill for Claude Code, Cursor, and Codex."
> 官網：https://www.usehallmark.com/ ｜ 安裝：`npx skills add nutlope/hallmark -g`（Powered by Together AI）

> 📊 **2026-11-12 第三次回訪：07-26 的「上游停滯」判讀作廢。** 星數 17.7K→53.6K（3 倍）、fork 891→2,854；主力開發者 Luffixos（Youssef）累計 312 commits，10/21 發 **v2.0.0**，近 4 週 56 commits、PR 持續合併。本機已在同日從 v1.1.0 升到 v2.0.0。

**本次可用引擎（Phase 0）**：gh ✅｜npx ✅ 但未用（repo 228MB >100MB，依規走 Trees API，token 數未取得）｜defuddle ✅｜yt-dlp ✅｜mcporter ⚠️ 在、但 `exa` server 回 Unknown（Exa 路改走 WebSearch）｜opencli ⚠️ Reddit 搜尋回 HTML 解析錯誤（跳過）｜twitter-cli ⚠️ Chrome cookie 解密失敗（跳過）。

### 一句話說明

給 Claude Code／Codex／Cursor／OpenCode 用的反 AI-slop 設計 skill。v1 是「規則百科＋模型自律」；v2 變成「**一條不可豁免的底線（Floor）＋零相依 Node linter 實際量測**」：做新頁時先問素材、從 50 個主題發三個候選、從訪客要做的事排版，最後跑 `sloplint --render` 在真瀏覽器量折線、對比度、focus ring，FAIL 清零才交件。改既有設計只在點名時做（`redesign`／`audit`）。

### 專案概覽

| 項目 | 數值 | 對比 07-26 |
|------|------|-----------|
| Stars | 53,583 | 17,701 → **3.0 倍** |
| Forks | 2,854 | 891 → 3.2 倍 |
| 主要語言 | CSS（另 HTML／JS；skill 本體為 Markdown＋Node 腳本） | — |
| 授權 | MIT | — |
| 建立時間 | 2026-04-27 | — |
| 最後推送 | 2026-11-11 | 06-26 → 恢復活躍 |
| Open Issues | 28 | 13 |
| Open PRs | 17 | 20 |
| 最新 Release | 無 GitHub Release；版本號寫在 `SKILL.md`／`package.json`／`plugin.json`＝2.0.0 | v1.1.0 |
| Topics | 未設定 | — |
| 首頁 | https://www.usehallmark.com/ | — |
| 是否 Archived | 否 | — |

> 判讀陷阱：npm 上的 `hallmark` 套件（5.0.2）是 vweevers 的無關專案，**不能拿下載數當採用度**；本 repo 不發 npm，走 `npx skills add` 或 Claude Code plugin marketplace。

### Repomix 深度分析（改走 Trees API）

| 指標 | 數值 |
|------|------|
| 總檔案數 | 860（07-18 為 238） |
| 總 Tokens | 未取得（diskUsage 228MB > 100MB，依 SKILL 規則不跑 repomix） |
| 壓縮模式 | 不適用 |

#### 體積分布（取代 token Top 5）

| 目錄 | 檔數 | 體積 | 說明 |
|------|------|------|------|
| `site/` | 627 | 57.7MB | 官網＋50 主題示範頁；Top 10 大檔全是主題照片（最大 1.48MB jpg） |
| `skills/hallmark/` | 187 | 7.1MB | **真正會裝到使用者機器的部分** |
| `docs/` | 12 | 1.1MB | recipes／talk |
| `eval/` | 14 | 0.1MB | 跨 harness 評測工具（不隨 skill 發佈） |

skill 本體內最大檔：`scripts/photos.json` 453KB（Wikimedia 照片索引）、`sloplint.mjs` 232KB、`sloplint-render.mjs` 100KB、`theme.mjs` 59KB、`SKILL.md` 18KB（v1 是 67KB，主檔瘦身、規則下放到 references）。

### 核心功能

- **Build（預設）**：Pre-flight 先讀專案（`design.md` 鎖定系統優先、真實品牌走 `brand-truth.md` 不憑記憶配色）→ 問一次素材／受眾／用途／語氣 → 依訪客要做的事排版 → 從 50 主題發 3 個候選（或說 custom 從零設計）→ 先做 hero 再做全頁 → sweep。
- **The Floor（16 條不可豁免底線）**：顏色字型全走 `:root` token、禁 `transition: all`、標題內不夾單一斜體字、`overflow-x: clip`、每個互動元素有 `:focus-visible`、reduced-motion 後備、**禁捏造數據／推薦語／logo 牆**、禁 eyebrow 與全大寫追蹤標籤、禁紫藍漸層／卡中卡／emoji 圖示／手繪瀏覽器框、hero 三件事在 1280×800 首屏可見、單屏約 80 字、CSS 首行戳章、有 Node 就必跑 sloplint。
- **gates.md 分級**：Floor 39 條（硬擋）＋Reflex 50 條（模型慣性預設，可附理由豁免）＋Finish（工藝檢查，不擋）。
- **`sloplint.mjs`（零相依）**：讀 HTML、CSS、框架元件、Tailwind class；`--render` 再用 puppeteer-core＋Chrome 量三寬度首屏、文字對背景像素對比度、Tab 找 focus ring、段落節奏、照片佔比、文字被遮蓋。沒裝 Chrome 仍跑靜態檢查。
- **`redesign <target>`**：先記錄頁面說什麼做什麼，分 polish／restyle／full 三深度，連結、表單欄位、handler、test hook 少一個就自己 sweep 失敗。
- **`audit <target>`**：只出報告不改碼。
- **選配腳本**：`capture.mjs` 截自家產品當素材、`imagegen.mjs` 有 `TOGETHER_API_KEY` 時呼叫 Together FLUX.1.1-pro 生圖（附 provenance）、`install-hook.mjs` 把 Floor 檢查掛成 Claude Code `Write|Edit` PostToolUse hook（opt-in，可選全域）。
- **v1 的 `study` 動詞在 v2 被移除**：argument-hint 只剩 prompt／redesign／audit，整個 repo 樹已無 `study.md`。07-18 當初看中的「截圖抽 DNA→可攜 design.md」增量沒了，升級前若還要這招，得從本機 v1.1.0 的 `references/study.md` 另存一份。

### 技術架構

```
使用者 prompt
   │
   ▼
SKILL.md（Floor 16 條 + Flow 0–7 + 動詞路由）
   │ 按步驟 fetch-on-demand
   ▼
references/ ── flow.md / gates.md / redesign.md / brand-truth.md / imagery.md / craft.md
   ├─ themes/      50 主題 .md + index.json（theme.mjs 產生與驗證）
   ├─ macrostructures/ 21 種版面骨架
   └─ genres/      4 類型
   │
   ▼  Build：hero → 全頁 → stamp + tokens.css + log
   │
   ▼
scripts/sloplint.mjs ──(--render)──▶ sloplint-render.mjs ─▶ puppeteer-core + Chrome
   │  FAIL 清零、REFLEX 修或附理由豁免
   ▼
兩次 fresh-context 審查（首屏 + 全頁）→ 交件
```

| 層次 | 技術 |
|------|------|
| Skill 核心 | `SKILL.md`（18KB）＋ OpenCode slash metadata；Codex／OpenCode 先讀 `flow.md` § Harnesses |
| 規則層 | `references/` Markdown，`refcheck.mjs` 確保 `gates.md` 與 `sloplint.mjs` 的 `TIERS` 一致 |
| 設計系統 | 50 主題（紙材＋字型＋色盤＋攝影處理）、OKLCH token、Wikimedia Commons 照片庫 |
| 品管層 | sloplint 靜態＋render 雙層、`node --test` 測試、CI `verify.yml` |
| 散佈 | `npx skills add`、Claude Code plugin（`/plugin install hallmark@hallmark`）、`install.mjs` 自帶多 harness 安裝器 |
| 評測 | `eval/`：Tier A 驅動真 `claude -p "/hallmark …"` 驗一致性，Tier B 純 API 對照（已封存） |

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | Luffixos 312、Nutlope 12、rudycelekli 10、xunguangzlj-cloud 5、Bortlesboat 3，其餘各 1 | 實質主力仍是一人（巴士係數 1），但外部 PR 開始被合併 |
| 近 4 週 commit | 26／20／7／3 | 10/21 發版前後爆量，近週回落 |
| Release 頻率 | 無 GitHub Release，版本跟著檔案走 | 不定期，追版要看 commit |
| Issue open/close | 28 open；近期 #106、#111 等修完即關 | 回應快 |

治理面 11/11 補齊：CONTRIBUTING、AGENTS.md（給改 hallmark 的 agent：先在 main 重現、加會在 main 失敗的測試、一 PR 一件事、禁新增相依、禁破折號）、行為準則、安全政策、issue／PR 模板。

### 社群口碑

**熱門討論：**
- **第三方消融實驗**（GitHub issue #74，ktlesr）：四個 landing page 題目、100 次嘗試、純規則比對不用 LLM 評審，結論是 skill 確實改變產出（純黑白使用率 100%→50%），但**只描述工作、不點名時 skill 不會自動觸發**，實驗得在 prompt 寫「Use the hallmark skill.」。
- **YouTube**：8 支相關影片，最高 5.1 萬觀看（設計師向「Ban AI Slop」）、另有 7.6K 觀看的「測 8 個設計 skill，第一名是 hallmark」與 6.8K 的 AICodeKing 評測。教學生態比 07-26（最高 4.5K）明顯成形。
- **文章**：多為聚合站與自動生成摘要（instagit、mcpservers、skills.sh），獨立評測有 andrew.ooo、mer.vin；Reddit／Hacker News 搜不到有機討論。

**正面回饋：** 安裝一行就通、效果可量測、50 主題讓連續產出不撞臉。
**負面回饋 / 已知問題：** #76 `npx skills add` 後 SKILL.md 相對連結會壞；#131 plugin 安裝不會自動接 edit-time hook；#114／#113 sloplint 個別 gate 誤報漏報；需要 Chrome＋puppeteer-core 才有完整 render 檢查。

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低。產出型 skill；`design.md` 鎖定系統的做法可對應 vault 的 `風格/<id>/準則.md` |
| **Claude Code** | **高度直接相關**。與 [[reference_taste_skill\|taste-skill 群]]、frontend-design、web-design-guidelines、apple-design 職能重疊；**真增量從 v1 的「規則寫得更系統」變成「有可執行的 linter」**，`sloplint --render` 是本環境其他設計 skill 都沒有的機械驗收 |
| **Automation** | 中。`sloplint.mjs` 零相依、有 `--json`，可單獨接進頁面產出後的驗收步驟（AI-一人公司 的 salespage／designer 產線） |

### 安裝建議

**✅ 已升級到 v2.0.0（2026-11-12，claude-setup commit a058bfeb，上游釘 `04977e15`）**

- **安裝形態**：仍是指名調用限定（LOCAL MOD 只改 description，原文留在 SKILL.md 註解）；走三位置 SOP，沒用 `npx skills add`／`install.mjs`，也沒跑 `install-hook.mjs`。
- **驗收**：`refcheck.mjs` 101 個 reference 全過、50 主題 `theme.mjs validate` 全 ok、`sloplint.mjs` 對刻意寫爛的夾具抓到 11 FAIL、active／備份／marketplace 三位置 diff 一致。
- **v1 `study` 取回**：`git -C D:/Claude show 632b1ff3:infra/skills-backup/hallmark/references/study.md`。

以下是升級前的評估，留作紀錄：

- **為什麼仍 ✅**：07-26 留下的兩個疑慮都有答案了。「上游會不會死」→ 10/21 發 v2、持續合 PR；「到底有沒有比沒裝好」→ 第三方 ablation 量到可測差異。v2 又多了能跑的 linter，增量比 v1 更實。
- **升級注意**：
  1. **LOCAL MOD 要重評**：v2 官方 description 已改成「既有設計不主動用、須點名」，跟我們當初收窄的方向一致，但「做新頁」仍會觸發，會跟 `design-taste-frontend` 搶 landing page；要維持指名調用限定就得再改 description。
  2. v2 有 Node 腳本：`imagegen.mjs` 只在設了 `TOGETHER_API_KEY` 才外呼；`install-hook.mjs` 會寫 `.claude/settings.json`，**不要跑**（本環境 hook 由自己管）；安裝走既有三位置 SOP，不用 `install.mjs`。
  3. v2 拿掉 `study`；本機 v1 的 `references/study.md` 升級前先另存。
  4. 完整 render 檢查要 `npm i -g puppeteer-core`＋Chrome。
  5. 抽取或升級時釘版：`gh api "repos/nutlope/hallmark/contents/skills/hallmark/SKILL.md?ref=<commit>"`，記下來源 commit（本次讀取時 main 最新為 2026-11-11 `ci: run every test file in one step`）。
- **07-26 復查判準的結算**：當時訂「2026-09-30 前沒觸發設計任務就移除」，期限過了 skill 仍在、也沒做那次 A/B。現在前提（上游停滯）已不成立，這條判準作廢，不追溯移除。
- **新的移除條件**：升級後第一次做頁面，`sloplint --render` 沒抓到任何 `design-taste-frontend` 漏掉的問題 → 改成只留 `sloplint.mjs` 當獨立驗收工具，skill 本體移除。

### 延伸操作

- 只想要 linter？`node skills/hallmark/scripts/sloplint.mjs <page.html> --json`，可單獨抽出接產線驗收。
- 想比較同類：README 自列 Impeccable、frontend-design、Open Design、Kami、taste-skill、huashu-design、UI UX Pro Max，可再跑 `/repo-intel`。

## 相關連結

- [[reference_taste_skill|taste-skill Anti-Slop 前端設計群]]
- [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill|web-design-guidelines]]
- [[Github/repos/emilkowalski-skills — Design Engineer 動效與 Apple 設計 Skill 合集|emilkowalski/skills]]
- [[Github/repos/html-anything — 把任何檔案轉成單檔互動 HTML 的 Agent Skill|html-anything]]

> 回訪紀錄：07-18 初裝（12.5K⭐、v1.1.0）→ 07-26 判上游停滯（17.7K⭐）→ 11-12 v2.0.0、53.6K⭐，停滯判讀作廢。
