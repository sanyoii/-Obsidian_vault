---
source: "https://github.com/MengTo/Skills"
author: "MengTo (Meng To, Design+Code 創辦人)"
stars: "1.3K"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "claude-code-skills"
  - "web-design"
  - "codex"
---

# MengTo/Skills — 設計師視角的 Codex × Claude × Cursor Agent Skill 合集

> **MengTo/Skills** | ⭐ 1.3K | 🍴 174 | 📝 MIT
> "Agent skills for designers and builders using Codex, Claude, Cursor, and other AI coding agents"

---

## 一句話說明

Design+Code 創辦人 Meng To 開源的個人 Agent Skills 庫，75 個 skill 聚焦「設計師如何用 AI coding agent 產出網頁/落地頁/動效」，其中 62 個是高度具體的「視覺風格模板」（如 dark-glass-clean-layout、mesh-gradient-dark-blue-clean），另外 13 個是 Codex 專屬的操作型工作流（螢幕錄影→超級 prompt、全頁截圖、SEO 稽核、macOS 效能剖析等）。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,304 |
| Forks | 174 |
| 主要語言 | Python（JS/Shell/Swift/PowerShell 皆有，因含 Codex 輔助腳本） |
| 授權 | MIT |
| 建立時間 | 2026-02-03 |
| 最後推送 | 2026-07-08 |
| Open Issues | 1 |
| Open PRs | 0 |
| 最新 Release | 無（不用 Release 機制） |
| Topics | 無 |
| 首頁 | 無（純 GitHub repo） |
| 是否 Archived | 否 |
| 貢獻者 | 僅 MengTo 本人（個人專案，非社群共筆） |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 145 |
| 總 Tokens | 172,425 |
| 壓縮模式 | 未使用（diskUsage 僅 7.4MB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| agent-skills/ui/image-to-code/SKILL.md | 7,704 | 4.5% |
| agent-skills/codex/playwright-interactive/SKILL.md | 6,832 | 4% |
| agent-skills/ui/design-taste-frontend/SKILL.md | 5,096 | 3% |
| agent-skills/web-design/cinematic-gsap-lenis-motion-system/SKILL.md | 4,688 | 2.7% |
| agent-skills/codex/screenshot/scripts/take_screenshot.py | 4,583 | 2.7% |

---

## 核心功能（四大分類，75 skills）

**Codex workflows（10 個）**：Codex 專屬操作型 skill，多數搭配 `agents/openai.yaml` 顯示名稱。代表作：
- `video-to-superprompt`：把螢幕錄影（動效/落地頁參考）轉成 Fable 5 可一次到位使用的超級 prompt
- `html-to-interaction-prompts`：把既有 HTML 頁面拆成單一 section/動畫/按鈕/hover 的可重用 prompt
- `stitched-full-page-capture`：處理 lazy-load/動畫/WebGL 頁面的完整全頁截圖
- `daily-ui-inspiration-capture`：瀏覽→截圖→參考研究→prompt 生成的每日靈感迴圈
- `performance-profiling`：Apple 平台 Instruments/MetricKit 效能剖析
- `customer-email-draft-threads` / `customer-support-verification`：Gmail 客服草稿+安全驗證閘門
- `swiftui-debugging`、`x-bookmark-quote-posts`、`copywriting`、`optimize-web-animations`、`netlify-deploy`、`pdf`

**Media（2 個）**：`aura-asset-images`（Aura Assets 素材庫）、`unsplash-asset-images`（依用途/裁切比選圖）

**UI（1 個組，另有 10 個散落在 agent-skills/ui/ 但 README 只承認 1 個新分類）**：
- `design-first-ui-prompting`：prompt 模板（目標→格式→版面→字體→色彩→限制）+「variants > rerolls」工作法+2-pass 排版（先產版面，Figma 精修字體）
- 另有 `gpt-taste`（GSAP 動效+Python 隨機化強制版面變異，反 AI 六行折行標題）、`stitch-design-taste`（產出給 Google Stitch 用的 DESIGN.md）、`industrial-brutalist-ui`（瑞士排版×軍規終端機美學）、`image-to-code`（Codex 專用：先自己生圖再照圖實作）、`swiftui-pro`（署名 Paul Hudson，SwiftUI code review）、`seo-audit`、`redesign-existing-projects`、`full-output-enforcement`、`minimalist-ui`、`frontend-design`、`design-taste-frontend`、`high-end-visual-design`

**Web design（62 個，最大宗）**：極度具體的視覺風格/技術模板，非原則性 skill，依主題分組：
- 轉換與實作：landing-page、pricing-page、tailwindcss、animation-systems、webgl-landing-steering
- 動效與捲動：animation-on-scroll、cinematic-gsap-lenis-motion-system、cinematic-scroll-storytelling、gsap、gsap-scrolltrigger-storytelling、marquee-loop、masked-reveal、staggered-word-reveal
- WebGL/Canvas/3D：background-grid-webgl、cobejs、globe-gl、globe-particles、matterjs、threejs、unicorn-studio、vantajs、webgl-3d-object、webgl-laser
- CSS 細節處理：beautiful-shadows、company-logos、container-lines、corner-diagonals、corner-lasers、css-alpha-masking、css-border-gradient、gooey-blob-system、number-details、progressive-blur、solar-duotone-bold
- 版面系統：agency-grid-layout-minimal、book-serif-index、editorial-tech、framed-grid-layout、image-first-grid-layout、nested-container-frames、split-layout-technical、technical-wireframe-info-layout
- 視覺風格/頁面情緒（約 20 個）：如 blue-cloudy-clean-modern、dark-glass-clean-layout、mesh-gradient-dark-blue-clean、tech-green-dark-mode-modern 等——每個都是「配色+氛圍+排版」寫死的具體風格卡，不是可調參數的通用系統

---

## 技術架構

```
Skills/
├── CLAUDE.md              # Claude Code repo 導引：如何新增/改良 skill
├── README.md              # 75 skills 總覽 + 折學（Prompts are assets 等）
├── LICENSE (MIT)
└── agent-skills/
    ├── codex/              # 10 skills，多數含 agents/openai.yaml（Codex 顯示名稱）
    │   └── <skill>/{SKILL.md, agents/openai.yaml, scripts/*.py|.sh|.swift, references/*.md}
    ├── media/               # 2 skills，圖片素材源
    ├── ui/                  # 13 skills，設計原則/taste 層
    │   └── <skill>/{SKILL.md, ARTICLE.md?, REFERENCES.md?}
    └── web-design/          # 62 skills，視覺風格模板（最大宗）
        └── <skill>/{SKILL.md, REFERENCES.md?}
```

| 層次 | 內容 |
|------|------|
| 骨架格式 | 純 Markdown 資料夾式（`SKILL.md` 必要 + `REFERENCES.md`/`ARTICLE.md`/`assets/`/`scripts/` 選配），與 Anthropic 官方 Skill 格式一致 |
| 平台適配 | Codex（`agents/openai.yaml` 顯示名稱+prompt）、Claude Code（直接讀 SKILL.md）、Cursor（貼入 rules/context） |
| Codex 輔助腳本 | Python（截圖/TTS）、Shell（Playwright CLI）、Swift（macOS 權限/顯示器資訊）、PowerShell（Windows 截圖） |
| 內容深度 | UI/codex 分類是「原則+流程」型 skill；web-design 62 個絕大多數是「寫死的視覺風格卡」，適合快速套一個特定美學方向，不是可組合的設計系統 |

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 僅 MengTo 本人 | 個人專案，非社群共筆（1 個 open issue，0 PR） |
| Release 機制 | 無 tag/release | 靠持續 push 迭代，非版本化發布 |
| 最後推送 | 2026-07-08 | 活躍（2 天前） |

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 本篇文章即完成收錄，內容做為「設計風格模板參考庫」可在需要特定視覺方向時查閱（如 mesh-gradient-dark-blue-clean、industrial-brutalist-ui），不需額外 vault 結構調整 |
| **Claude Code** | 高度重疊：`design-taste-frontend`、`frontend-design`、`high-end-visual-design`、`minimalist-ui`、`redesign-existing-projects`、`full-output-enforcement` 名稱與內容都與本環境已裝版本同源（同一系譜的 anti-slop taste skill）。**與 emilkowalski/skills 相比**：emilkowalski 是「決策層」（4 個 skill，教你判斷該用哪種動效、為什麼、Apple 設計哲學），MengTo/Skills 的 62 個 web-design skill 是「執行層/風格庫」（給定風格直接套用具體配色排版參數），兩者互補而非取代——emilkowalski 教判斷，MengTo 給選項。獨有增量：codex 專屬工作流（video-to-superprompt、daily-ui-inspiration-capture 等錄影/截圖→prompt 迴圈）、swiftui-pro（Paul Hudson 署名 code review）、seo-audit、customer-email-draft-threads |
| **Automation** | codex 分類的截圖/效能剖析腳本（Playwright CLI、macOS Instruments/MetricKit）可能對本機自動化截圖（pixelshot 卡關的替代方案）或 QA 相關流程有參考價值，但均為 macOS 優先（Swift 腳本），Windows 環境需另找 PowerShell 版本（screenshot skill 內建 take_screenshot.ps1，可留意） |

---

## 安裝建議

⏳ **建議觀望，尚未安裝** — 理由：
1. UI 分類（13 個）與本環境已裝的 design-taste-frontend/frontend-design/high-end-visual-design/minimalist-ui/redesign-existing-projects/full-output-enforcement 高度重複，直接整包裝入會製造同名衝突與維護負擔。
2. web-design 62 個視覺風格卡屬於「一次性套用」型模板，非通用技術層 skill（不像 gsap/animejs/css-animations 走 HyperFrames 決策），單獨挑幾個有需要時再手動複製會比整包裝更乾淨。
3. 真正有增量的是 codex 專屬工作流與 swiftui-pro/seo-audit，若未來要接入 Codex agent 或做 SwiftUI review，可單獨挑選這幾個安裝，不需要裝整個 75-skill 庫。

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/emilkowalski-skills — Design Engineer 動效與 Apple 設計 Skill 合集|emilkowalski/skills]]
