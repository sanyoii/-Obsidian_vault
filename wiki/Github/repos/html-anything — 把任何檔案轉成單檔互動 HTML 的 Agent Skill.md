---
source: "https://github.com/clockless-org/html-anything"
author: "clockless-org (renkelvin)"
stars: "104"
clipped: 2026-07-26
tags:
  - "github/repo"
  - "claude-code-skill"
  - "html-converter"
  - "data-visualization"
---

# html-anything — 把任何檔案轉成單檔互動 HTML 的 Agent Skill

> **clockless-org/html-anything** | ⭐ 104 | 🍴 4 | 📝 MIT-0（No Attribution）| SKILL.md v0.1.0 / release v0.1.1
> 60 source prompts × 17 style systems ｜ 支援 Claude Code + Codex ｜ demo：`clockless-org.github.io/html-anything/examples/`

## 一句話說明

給 Claude Code / Codex 用的 Agent Skill：丟一個檔案、資料夾、URL 或服務匯出檔（Amazon 訂單、Kindle 畫線、Spotify 記錄、微信/WhatsApp 對話、Apple Health、Google Photos Takeout…），Skill 自動辨識來源類型、挑選版面設計系統、產出**單檔互動 HTML**，並在瀏覽器驗證後交付。

核心主張：**HTML 是比 Markdown 更好的回答格式**。靈感直接來自 Claude Code 團隊成員 Thariq Shihipar 的〈The Unreasonable Effectiveness of HTML〉。「該是一頁的答案就做成一頁，短對話維持短對話。」

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 104 |
| Forks | 4 |
| Watchers | **1** |
| 語言 | JavaScript 1.29MB / TypeScript 875KB / Python 30KB / HTML 38KB |
| 授權 | **MIT-0**（No Attribution，最寬鬆）|
| 建立時間 | 2026-05-09 |
| 最後推送 | **2026-05-13**（分析當下已停滯約 10 週）|
| Open Issues / PRs | 3 / 0 |
| 最新 Release | v0.1.1（2026-05-13）|
| Topics | agent-skill, claude-code, codex, single-file-html, offline-html, kindle, spotify, amazon 等 14 個 |
| 貢獻者 | **renkelvin 一人** |
| 組織 | clockless-org（2026-03 建立，僅 2 個公開 repo）|
| 是否 Archived | 否 |
| Repomix 指標 | 777 檔 / 4,810,921 tokens（`--compress`）|

> 📌 777 檔中 **600 檔是 examples/**（合成示範資料 + 產出頁），佔 token 逾 70%。真正的 skill 只有 177 檔，核心是純 Markdown，安裝不需要 examples。

## 核心功能

- **60 個 source prompts**（`prompts/sources/`）：每種資料來源一份解析指引 —— WhatsApp、WeChat、iMessage、Slack、Discord、Telegram、ChatGPT/Claude 匯出、Amazon 訂單、Kindle 畫線、Spotify/YouTube/Twitch 歷史、Apple Health、Google Photos Takeout、GPX/KML、bank/QuickBooks/invoices、ICS 行事曆、Notion/**Obsidian vault**、PDF/DOCX、CI log/stack trace/git diff/PR patch…
- **17 個 style systems**（`prompts/styles/`）：teaching、dashboard、map-atlas、timeline-story、editorial-carousel、terminal-cli、digital-eguide、kami-reading、living-essay、network-map、global-travel、kinetic-scoreboard、love-romance-3d、soft-saas、architectural-spread、developer、document
- **四大 use case 路由**：Teaching Studios / Files & Work Data / Conversation Analysis / Personal Data & Places。**style 是內部概念，使用者不用指定**——自然語句「幫我看懂這個 CSV」就夠
- **附帶 CLI**（`src/`）：TypeScript 解析器 + `--style` 覆寫，但 README 明說「primary product surface is the agent skill」，CLI 屬開發者附屬品

## 技術架構

```
SKILL.md                    ← 460 行 / 25.7KB，路由 + 兩條不可協商約束
prompts/
├── sources/  (60 + 11 個 _家族共用檔)   ← 各來源解析與呈現指引
│   └── _chat.md _finance.md _geo.md _document.md …
└── styles/   (17 + catalog.json + _system.md + _design.md)
    └── references/teaching/object-lab.html          ← 參考設計原件
src/
├── parse/ (33 個 .ts)      ← 各來源解析器（chat-shared / finance-shared 共用層）
├── cli.ts  htmlize.ts  llm.ts  types.ts
scripts/ (33 個 .mjs/.py)   ← fixture 產生器 + render fallback（無 LLM 時的降級路徑）
examples/ (600 檔)          ← 合成資料 + 產出頁，作為「品質標竿」
```

| 層次 | 技術 |
|------|------|
| Skill 核心 | SKILL.md + prompts/（純 Markdown，fetch-on-demand）|
| 解析層 | TypeScript，依賴僅 `mammoth`（DOCX）+ `pdfjs-dist`（PDF），Node ≥20 |
| 降級路徑 | 33 支 `render_*_fallback.mjs`——無 LLM 時仍能產出頁面 |
| 品質控制 | `_system.md` 的 **Style Fidelity Contract** |

`prompts/styles/_system.md` 的立場與 [[Github/repos/hallmark — 拒絕 AI 味的前端設計 Skill（結構多樣性＋防呆閘門）\|hallmark]] 同源：**「styles 是設計系統＋版面系統，不是 CSS 主題」**，明文禁止「做一份通用報告再換色」的偽多樣性。

## 專案特性與風險

- MIT-0 授權（No Attribution）——**可自由複製單一 prompt 檔使用，不必安裝整包、不必署名**。這讓「取用」與「安裝」脫鉤，是本專案最實用的性質
- 有完整降級路徑（33 支 fallback renderer），無 LLM 也能出頁
- ⚠️ **維護停滯**：2026-05-13 後零 commit（約 10 週），停在 v0.1.1；1 個 watcher、0 個 PR、巴士係數 1；組織 clockless-org 僅 2 個公開 repo
- ⚠️ **觸發面極廣**：`when_to_use` 涵蓋「make it beautiful / readable / shareable」「visualize/analyze this」，比 hallmark 原版更廣
- 14 個 topics 塞滿 amazon/kindle/spotify/atlas 等關鍵字，帶 SEO 味

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian Vault | **直接相關**——`prompts/sources/obsidian-vault.md` 專門處理 wikilink vault：把它當「圖」而非目錄，概念圖為主視覺、`topHubs` 當二腦落地頁、daily-note 連續天數面板、wikilink 渲染成可點 pill chip |
| Claude Code | ⚠️ **賽道極度飽和且觸發會打架**（見下） |
| Automation | 低 |

**重疊清點**：本環境已有 archify（架構圖 HTML）、html-ppt、guizang-ppt、deck-ai-classroom、hyperframes 系列、frontend-design、[[reference_taste_skill|taste-skill 群]]、hallmark ——HTML/設計產出是最擁擠的賽道。

**但它填的空白是真的**：上述全部是「**設計**產出」skill，沒有一個處理「**讀懂雜亂資料格式**」。60 份 source prompt 是本 repo 的實質資產，與版面設計正交。

## 安裝建議

**⏳ 觀望 —— 不是「等它變好」，是「不整包裝，改抄需要的部分」。**

**不整包裝的理由：**
1. **觸發衝突風險高於 hallmark**。`when_to_use` 比 hallmark 原版更廣；07-18 才因 hallmark 搶 landing page 場景把 description 收窄，再裝一個觸發面更大的會讓設計類路由更亂
2. **停滯 + 單人 + v0.1.x**：10 週零 commit、1 watcher、0 PR。不是「成熟到不用改」，是早期專案停更

**MIT-0 是關鍵轉折**：No Attribution 允許直接複製單一 prompt 檔，不必安裝整包、不必署名、無授權義務 → 「取用」與「安裝」可脫鉤。

**零風險先行動作**（不安裝）：把 `prompts/sources/obsidian-vault.md`（約 60 行）讀一次，看它的 vault 視覺化構想能不能餵給 archify 或既有 HTML skill，產出自己 vault 的全景頁。零成本、零觸發衝突、不新增 skill。

**升級條件（→ ✅ 裝）**，兩者都要成立：
1. 上述先行動作實測有效——「source-aware parsing 指引」確實讓既有 skill 產出變好，證明 60 份 prompt 有真價值
2. 上游恢復維護（v0.2.x 或近 4 週有 commit），或決定 fork 自用（MIT-0 允許，但自負維護）

**放棄條件（→ ❌ 結案）**：
1. 先行動作實測後既有 skill 沒變好 → 60 份 prompt 對本環境無價值，整包不必再看
2. 2026-09-30 前上游仍零 commit 且未實際用過任何一份 source prompt → 依「用不到 = 不裝」結案

## 相關連結

- [[Github/repos/hallmark — 拒絕 AI 味的前端設計 Skill（結構多樣性＋防呆閘門）|hallmark]]（同樣主張「結構多樣性 ≠ 換色」）
- [[reference_taste_skill|taste-skill Anti-Slop 前端設計群]]
- [[project_obsidian_dashboard|Obsidian Dashboard 開發進度]]
