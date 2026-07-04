---
source: "https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines"
author: "vercel-labs (Vercel)"
stars: "28.6K"
clipped: 2026-07-04
tags:
  - "github/repo"
  - "claude-code/skills"
  - "web-design"
  - "accessibility"
---

# web-design-guidelines — Vercel 官方前端審查 Skill

> **vercel-labs/agent-skills** | ⭐ 28.6K | 🍴 2,573 | 📝 MIT（README 聲明，無 LICENSE 檔）
> "A collection of skills for AI coding agents."

---

## 一句話說明

Vercel 官方 8-skill 合集裡的一個審查型 skill：不內建規則，執行時即時抓取 Vercel 官方 [web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) repo 的 100+ 條前端規則（無障礙/焦點/表單/動畫/排版/圖片/效能/導航/深色模式/觸控/i18n），逐條比對使用者程式碼，輸出 `file:line` 格式的違規清單。

---

## 技術架構

這個 Skill 的架構（Fetch-on-Demand）

`skills/web-design-guidelines/SKILL.md` 本身只有 40 行、無 scripts/references 子目錄——是整個 repo 裡最輕量的 skill：

```
skills/web-design-guidelines/
└── SKILL.md   ← 唯一檔案，40 行
```

執行流程：
1. 觸發詞比對：「review my UI」「check accessibility」「audit design」「review UX」
2. 用 `WebFetch` 即時抓 `raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
3. 讀取使用者指定的檔案
4. 用抓到的規則逐條比對，輸出 `file:line` 終端機風格清單

**設計取捨**：規則永遠是遠端最新版，不會因為 skill 本身沒更新而過時；代價是每次執行都依賴外部 repo 可用性與 WebFetch 成功率。`writing-guidelines`（同 repo 內另一個 skill）採用同一套 Fetch-on-Demand 模式，指向 `vercel-labs/writing-guidelines`。

---

## 核心功能

規則內容摘要（來自 command.md，100+ 條）

| 分類 | 代表規則 |
|------|---------|
| Accessibility | icon-only 按鈕要 `aria-label`；`<button>` 用於動作、`<a>` 用於導航 |
| Focus States | 禁止 `outline-none` 沒有替代焦點樣式；用 `:focus-visible` |
| Forms | inputs 要 `autocomplete`；提交按鈕在請求開始前保持可點 |
| Animation | 尊重 `prefers-reduced-motion`；只動 `transform`/`opacity` |
| Typography | 彎引號、`…` 不用 `...`、數字要 `tabular-nums` |
| Images | `<img>` 要明確 `width`/`height`（防 CLS）|
| Performance | 大列表（>50 項）要虛擬化；render 中禁止 layout read |
| Navigation & State | URL 要反映狀態（filter/tab/pagination）|
| Dark Mode | `color-scheme: dark` on `<html>` |
| Touch & Interaction | `touch-action: manipulation` |
| Locale & i18n | 用 `Intl.DateTimeFormat`/`Intl.NumberFormat`，禁止硬編碼格式 |
| Anti-patterns | `user-scalable=no`、`transition: all`、`<div onClick>` 直接列為違規 |

規則來源 repo（`vercel-labs/web-interface-guidelines`）本身 692⭐，2026-04 有更新，非 fork、獨立維護。

---

## 專案概覽（母 repo：vercel-labs/agent-skills）

| 項目 | 數值 |
|------|------|
| Stars | 28,656 |
| Forks | 2,573 |
| 主要語言 | JavaScript（含 TypeScript/Shell）|
| 授權 | MIT（README 聲明）|
| 建立時間 | 2025-12-08 |
| 最後推送 | 2026-06-10 |
| Open Issues | 58 |
| Open PRs | 100 |
| Topics | 無 |
| 首頁 | skills.sh/vercel-labs/agent-skills |

母 repo 內共 8 個 skill：`vercel-optimize`、`react-best-practices`、`web-design-guidelines`、`writing-guidelines`、`react-native-guidelines`、`react-view-transitions`、`composition-patterns`、`vercel-deploy-claimable`。依 skills.sh 安裝量排行，`web-design-guidelines` 是 Design 分類唯一項目，437.0K 次安裝，全庫中僅次於 `react-best-practices`（524.5K）。

---

## 社群訊號

Vercel 官方 2026-01-12 發過 changelog 公告（[連結](https://vercel.com/changelog/web-interface-guidelines-now-available-as-an-agent-command)），定位為「把 Web Interface Guidelines 做成 agent skill/command」。DeepWiki 已收錄本 skill 的架構說明，稱其為 "Fetch-on-Demand" 模式。未見負評或已知問題討論。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Claude Code** | 直接可裝：`npx skills add vercel-labs/agent-skills`，或單獨只拿 `web-design-guidelines` 資料夾。與已裝的 `ui-ux-pro-max`、`design-taste-frontend`、`high-end-visual-design` 不重疊——那些是「設計生成」，這個是「審查既有程式碼」 |
| **Automation** | 適合接進 CI/PR review 流程：輸出格式是 `file:line`，機器可解析 |
| **穩定性風險** | 依賴外部 WebFetch + 兩個獨立 repo（agent-skills + web-interface-guidelines）的可用性，離線或內網環境會失效 |

---

## 安裝建議

✅ **適合安裝**——輕量（單檔 40 行）、規則來源是 Vercel 官方持續維護的獨立 repo、與現有設計類 skills 功能互補（審查 vs 生成）。若要更穩定可考慮把 `command.md` 抓下來做本地備援版本。

---

## 相關連結

- [[Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件|addyosmani/agent-skills]] — 同類 skill 合集比較對象
- [[Github/_index|Github Repo 分析總索引]]
