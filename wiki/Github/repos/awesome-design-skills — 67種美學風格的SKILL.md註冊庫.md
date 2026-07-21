---
source: "https://github.com/bergside/awesome-design-skills"
author: "bergside (zoltanszogyenyi / typeui.sh)"
stars: "1.9K"
clipped: 2026-07-22
tags:
  - "github/repo"
  - "design-md"
  - "design-skills"
  - "aesthetic-styles"
  - "claude-skill"
---

# awesome-design-skills — 67 種美學風格的 SKILL.md/DESIGN.md 註冊庫

> **bergside/awesome-design-skills** | ⭐ 1,902 | 🍴 174 | 📝 MIT
> "List of 67 awesome DESIGN.md and SKILL.md design skill files for agentic tools like Claude Design, Google Stitch, Codex, Cursor, and other AI tools"

## 一句話說明

67 種**美學風格**的設計技能註冊庫，給 AI coding agent（Claude Code/Cursor/Codex/Stitch）用。每種風格（brutalism/glassmorphism/neon/retro/bento/neumorphism/shadcn…）是一資料夾，含 `SKILL.md`（AI 讀：色彩 token/字級/元件規則/WCAG/品質閘）+ `DESIGN.md`（人讀：設計意圖）。`npx typeui.sh pull <風格名>` 一鍵拉進專案，讓 agent 產出鎖定該視覺風格。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,902 |
| Forks | 174 |
| 主要語言 | 無（純 Markdown 註冊庫） |
| 授權 | MIT |
| 建立時間 | 2026-03-09 |
| 最後推送 | 2026-06-28 |
| Open Issues / PRs | 1 / 6 |
| 首頁 | typeui.sh/design-skills（Vercel checkpoint 擋爬） |
| 貢獻者 | zoltanszogyenyi（typeui.sh 作者，單一） |

## Repomix 分析

- 總檔案數 137，總 tokens 99K；security 乾淨
- Top 檔：README、skills/index.json（slug→路徑映射）、各風格 SKILL.md（~800-900 tokens 一致）
- 核心 = index.json + 67 風格資料夾

## 核心功能

- **67 種具名美學風格**：agentic/ant/artistic/bento/bold/brutalism/cafe/claymorphism/clean/colorful/corporate/cosmic/dithered/doodle/dramatic/editorial/enterprise/fantasy/flat/futuristic/geometric/glassmorphism/gradient/immersive/material/matrix/minimal/modern/mono/neobrutalism/neon/neumorphism/paper/premium/retro/riso/sega/shadcn/sketch/skeumorphism/stitch/storytelling/vintage…
- **雙檔結構**：`SKILL.md`（AI 指令：mission/brand/style foundations/color tokens/typography/spacing/元件家族/WCAG 2.2 AA/Do-Don't）+ `DESIGN.md`（人讀設計意圖）
- **一鍵拉取**：`npx typeui.sh pull <slug>` 讀 index.json → 抓 SKILL.md（TypeUI CLI，parent bergside/typeui）
- **TypeUI 生態**：MCP server + 線上預覽（每風格附 marketing 圖）
- **TYPEUI_SH_MANAGED 區塊**：SKILL.md 內容由 typeui.sh 管理可更新

## 技術架構

```
skills/index.json（slug → 路徑映射）
   ├── skills/<style>/SKILL.md   （AI 讀：tokens/規則/WCAG/元件）
   └── skills/<style>/DESIGN.md  （人讀：設計意圖）
        │  npx typeui.sh pull <slug>  ← TypeUI CLI
        │  讀 index.json → resolve → fetch SKILL.md
        ▼  拉進專案 → agent 產出鎖定該美學風格
```

| 層次 | 內容 |
|------|------|
| 註冊庫 | 67 風格 × (SKILL.md + DESIGN.md) + index.json |
| 取用 CLI | TypeUI（`npx typeui.sh pull`）+ MCP server |
| 內容 | 純 Markdown（無程式碼、無執行） |

**設計亮點**：pull-on-demand 的靜態設計品味注入，不需安裝，要某風格時一行 pull。與 [[reference_awesome_design_md]] 走同一 DESIGN.md 生態但軸線不同：**這裡是「美學風格」（brutalism/neon/retro），那裡是「品牌」（Google/Stripe/Apple）**。SKILL.md 含具體 token（色/字/間距）+ WCAG 閘，不只形容詞。

## 社群健康度

- 單一作者（zoltanszogyenyi），是 typeui.sh 商業 UI 生成產品的開源引流註冊庫
- 無 release tag（滾動更新）；pushedAt 2026-06-28 活躍；Issue/PR 1/6 低積壓
- 1,902⭐/174 fork 中型 awesome-list
- Superdesign 中肯批評：「design skill 是**靜態 SKILL.md，只偏置 agent 品味，看不到 codebase 或剛產出的 UI，無法比對現有 app/比較選項/迭代**」——對「從零套風格」有用，對「改進既有 UI」無能

## 與現有系統的相關性

- **Obsidian**：中-高。與 [[reference_awesome_design_md]]（已裝，73 **品牌** DESIGN.md + design-fetch）**互補非重複**：這是 67 **美學風格**。兩者合起來 = 品牌 + 風格雙軸設計庫。
- **Claude Code**：中。非常駐 skill，是 pull-on-demand 註冊庫。與 [[reference_taste_skill]]（anti-slop 品質守門）角度不同：taste-skills 守品質，這選具名風格。slide/PPT/前端需特定美學時 pull。
- **Automation**：低。純 Markdown，`npx typeui.sh pull` 可腳本化但無執行邏輯。

## 安裝建議

**⏳ 觀望（知道即可，按需 pull）** — 非「安裝」型專案，是 pull-on-demand 資源。價值真實（67 具名美學風格、含 token/WCAG、與品牌庫 awesome-design-md 互補），但：①無需常駐安裝，記住 `npx typeui.sh pull <style>` 要時再拉；②與 taste-skills（品質守門）+ awesome-design-md（品牌）部分重疊；③靜態 SKILL.md 先天限制（無法看 codebase/迭代）；④單一作者 + 商業引流。

- **升級條件（→ ✅ 常用）**：開始做需具名美學風格（brutalism/glassmorphism/retro…）的前端/slide 專案，且 awesome-design-md 品牌庫不涵蓋 → 建立「要風格就 pull」習慣
- **放棄條件（→ ❌ 不用）**：taste-skills + awesome-design-md + guizang-ppt/deck skills 已覆蓋美學需求；或不想依賴 typeui.sh 商業 CLI

## 相關連結

- [[reference_awesome_design_md]] — 73 品牌 DESIGN.md（互補：品牌 vs 美學風格）
- [[reference_taste_skill]] — anti-slop 品質守門 skills（角度不同）
- [[Github/repos/Open Design — 開源版Claude Design讓CLI agent變設計引擎|Open Design]] — 同 DESIGN.md 生態的桌面 app
