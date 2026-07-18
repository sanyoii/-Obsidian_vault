---
source: "https://github.com/Nutlope/hallmark"
author: "Nutlope (Hassan El Mghari)"
stars: "12.5K+"
clipped: 2026-07-18
tags:
  - "github/repo"
  - "claude-code-skill"
  - "frontend-design"
  - "anti-ai-slop"
---

# hallmark — 拒絕「AI 味」的前端設計 Skill（結構多樣性＋防呆閘門）

> **Nutlope/hallmark** | ⭐ 12,588 | 🍴 624 | 📝 MIT | CSS/HTML 規則庫（零 runtime）| SKILL.md v1.1.0
> 官網：https://www.usehallmark.com/ ｜ 安裝：`npx skills add nutlope/hallmark`（Powered by Together AI）

## 一句話說明

Hassan El Mghari（Nutlope）做的**反 AI-slop 設計 skill**，給 Claude Code / Cursor / Codex 用。核心不是「換配色」而是**強制結構多樣性**——每個頁面先選版面骨架（macrostructure）再上主題，且拒絕重複前 3 個骨架，讓不同 brief 的頁面「像不同網站，不是同模板換色」。出貨前跑 ~57 條 slop 檢查閘門 + 六軸自我評分，並在 CSS 頂端蓋產出戳章。

## 核心功能：一個預設 + 三動詞

- **Build（預設）**：給 brief → 不像生成的頁面。macrostructure → theme → enrichment，拒絕重複前 3 骨架
- **`hallmark audit <target>`**：對照反模式清單打分，回傳排序化毛病清單，**不改 code**
- **`hallmark redesign <target> [--mood]`**：既有實作邊界內換視覺結構，保留路由/元件歸屬/文案意圖/IA
- **`hallmark study <screenshot|URL>`**：抽設計 DNA（骨架/原型/字體配對/色彩錨點）→ 診斷 → 可選重建或輸出**可攜 `design.md`**；URL 模式讀 HTML/CSS 能報確切字體色值；永不 pixel-clone、拒絕付費模板 URL、只報字體「角色」不猜字體名

**跨動詞六大紀律**：① Pre-emit 六軸自評（Philosophy/Hierarchy/Execution/Specificity/Restraint/Variety，<3 重來）② 誠實文案不捏造數據 ③ 鎖 token 不即興改色字 ④ 禁手繪假瀏覽器/手機/IDE chrome ⑤ 320/375/414/768px 響應式硬底線 ⑥ 標題不用斜體（最可靠 AI tell）。

## 技術架構

純規則庫 skill，無執行程式，靠 Markdown 百科 + CSS token 驅動 LLM：

```
skills/hallmark/
├── SKILL.md              ← 入口：動詞路由 + 六大紀律 + 安全護欄
└── references/           ← 規則百科（fetch-on-demand）
    ├── structure.md          結構多樣性（骨架輪替）
    ├── macrostructures.md    ~21 種版面骨架命名
    ├── slop-test.md          ~57 閘門 + pre-emit 自評
    ├── anti-patterns.md      反模式目錄
    ├── typography.md         字體角色 + 免費/付費配對
    ├── color.md              OKLCH 色彩錨點
    ├── responsive.md         四寬度非談判底線
    ├── custom-theme.md       creative-intent 觸發的一次性配色
    ├── study.md              DNA 抽取協議 + 拒絕啟發式
    ├── component-cookbook.md 元件原型（H4/H7/Ft1…）
    └── components/           個別元件參考

site/       ← 行銷站 + 20+ 範例 + _tests/ 迴歸夾具（brief→輸出）
docs/       ← recipes / study-examples / talk-slides
```

| 層次 | 內容 |
|------|------|
| Skill 核心 | SKILL.md 動詞路由 + 六紀律 |
| 規則層 | references/ Markdown 百科（fetch-on-demand）|
| 設計系統 | 20 named themes + OKLCH token + 免費字體配對 |
| 品管層 | slop-test ~57 gates + 六軸 pre-emit 自評 + 產出戳章 |

> ⚠️ 版本數字不一：packed 原始碼 v1.1.0 / 20 themes / gate 到 55；官網寫「57-gate」；部分報導稱「22 themes / 65-gate / 21 macrostructures」——迭代快、文件滯後，以安裝當下 SKILL.md 為準。

## 專案特性與風險

- 純規則庫，效果高度依賴宿主模型遵守度（弱模型可能仍破功）
- 作者 Hassan El Mghari 高信譽（多個爆紅 OSS AI app）、發布即獲大量科技媒體報導、登 Claude Code Skills marketplace 榜
- **近 4 週 0 commit**（2026-06-26 後靜置），衝高後維護持續性待觀察
- 無 Release，MIT 授權

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian Vault | 低（產出型 skill）；但 `study → design.md` 可存喜歡網站的 DNA 當設計參考 |
| Claude Code | **高度直接相關**——與既有 [[reference_taste_skill\|taste-skill 群]]（design-taste-frontend / high-end-visual-design / redesign-existing-projects / minimalist-ui）及 web-design-guidelines / frontend-design / apple-design / emil-design-eng 職能重疊 |
| Automation | 無關 |

**真差異（既有 skills 都沒有的）**：①跨頁**結構多樣性**（macrostructure 輪替、拒絕重複前 3 骨架）②**study 動詞** = 截圖/URL 抽 DNA 成可攜 `design.md` ③**~57 gate slop-test + 六軸 pre-emit 自評 + 戳章**這種可稽核品管閘門。比「風格提示型」skill 更系統化。

## 安裝建議

**✅ 已安裝（2026-07-18，commit 632b1ff3）**——目前 anti-slop 設計 skill 裡最系統化的一個，`study`（DNA→design.md）與 slop-test 閘門是既有 9 個設計 skill 都沒有的真增量。

- **安裝形態**：**指名調用限定**（LOCAL MOD：description 收窄，上游原版會搶 landing page 場景與 taste 群打架；原文保留在 SKILL.md 註解）。走 SOP 三位置落地，未用 `npx skills add`。
- **驗收**：三位置 diff IDENTICAL、熱載確認、audit 動詞對蓄意 slop 夾具實測 9/9 全中。
- **PPT 場景用法**：build 不適用（骨架全是捲動網頁）；deck 產完手動 `hallmark audit`，只採 typography/color/anti-pattern 類 findings、忽略 responsive 類。
- **⚠️ 復查觸發（~2026-10）**：上游（2026-06-26 後零 commit）仍零維護且實測未勝 `design-taste-frontend`，則移除（R13）；若效果好則考慮把 anti-patterns＋六軸自評蒸餾進 deck skill。

## 相關連結

- [[reference_taste_skill|taste-skill Anti-Slop 前端設計群]]
- [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill|web-design-guidelines]]
- [[Github/repos/emilkowalski-skills — Design Engineer 動效與 Apple 設計 Skill 合集|emilkowalski/skills]]
