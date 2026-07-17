---
source: "https://github.com/pmlaowangba-lab/laowangba-pmprototype-skill"
author: "pmlaowangba-lab (Laowangba AI Lab)"
stars: "38"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "claude-code-skill"
  - "figma"
  - "frontend-design"
  - "product-management"
---

# laowangba-pmprototype-skill — B/C 端產品原型生成 Codex Skill（Figma 工作流）

> **pmlaowangba-lab/laowangba-pmprototype-skill** | ⭐ 38 | 🍴 7 forks | 📝 MIT
> "Codex skill for product prototype generation with IA, design gates, page UI YAML, and Figma workflow."

---

## 一句話說明

一個給 Codex / Claude Code 用的產品原型生成 Skill，把「畫 Figma 原型」拆成 IA 推導 → Design Plan → Anti-Slop 自檢 → 結構化 `page.ui.yaml` → Figma 執行 → 截圖再審 → 增量修改的七階段流水線，核心目的是防止 AI 生成的 B 端/C 端原型落入「AI 默認審美」（紫藍漸變、Inter 字體、三套皮 dashboard）。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 38 |
| Forks | 7 |
| 主要語言 | 無（純 Markdown/YAML/JSON，無 primaryLanguage） |
| 授權 | MIT |
| 建立時間 | 2026-07-09 |
| 最後推送 | 2026-07-09 |
| Open Issues | 0 |
| Open PRs | 0 |
| 最新 Release | 無 |
| Topics | 無 |
| 首頁 | 無 |
| 是否 Archived | 否 |
| 作者 | Laowangba AI Lab（單人帳號，18 個公開 repo，建於 2026-01） |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 36 |
| 總 Tokens | 32,353 |
| 壓縮模式 | 否（diskUsage 僅 340KB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| examples/ai-price-comparison-frontend/index.html | 9,307 | 28.8% |
| SKILL.md | 1,995 | 6.2% |
| examples/member-system-frontend/design-plan.md | 1,434 | 4.4% |
| schema/page.ui.schema.json | 1,401 | 4.3% |
| references/page-templates.yaml | 1,121 | 3.5% |

---

## 核心功能

- **IA 推導（Phase 0）**：從 brief 逆推實體、角色、任務鏈、頁面映射，明文禁止套用「標準後台 N 頁」案例庫，強制寫「推導依據」。
- **Design Plan（Phase 1）**：Subject / Tone / Token / Layout（ASCII 線框）/ Signature（全案唯一記憶點）/ Differentiation 六項必填。
- **Anti-Slop 自檢（Phase 2）**：A/B/C 三組checklist（通用 + B 端追加 + C 端追加），任一項命中且未修訂即 FAIL，FAIL 禁止進入下一步。
- **`page.ui.yaml` 結構規格（Phase 3）**：每頁一檔，有 JSON Schema 校驗，region/component 粒度描述版面。
- **Figma 執行（Phase 4）**：透過 Figma MCP 按 region 分批寫入 Frame，共享殼（側欄/頂欄/TabBar）先畫一次供複用。
- **視覺再審（Phase 5）**：`get_screenshot` 對照 ASCII 線框，「香奈儿法則」——每屏刪一個多餘裝飾。
- **增量修改（Phase 7）**：改動先回寫 plan/yaml 再 patch 對應 Figma node，禁止無文件依據整頁重生成。
- **DESIGN.md 視覺憲法**：B 端（utilitarian-enterprise，1440×900，側欄 200-208px，`#1677FF` 主色，flat table）與 C 端（refined-consumer，390×844 mobile，胶囊按鈕，單屏單 CTA）兩套獨立 token 軌道，並列出「參考氣質」（允許 Ant Design Pro/飛書；禁止 Vercel landing、Dribbble 炫彩 dashboard）。

---

## 技術架構

```
laowangba-pmprototype-skill/
├── SKILL.md                     # 七階段流水線主文件（Frontmatter: name/inherits/version）
├── DESIGN.md                    # B/C 雙軌視覺憲法（路由規則 + token 摘要）
├── references/
│   ├── ia-derivation.md         # Phase 0 方法論
│   ├── design-plan-template.md  # Phase 1 模板
│   ├── anti-slop-checklist.md   # Phase 2 A/B/C 三組 checklist
│   ├── frontend-design-gates.md # G0-G6 七道強制閘門表
│   ├── design-shared.md / design-b-end.md / design-c-end.md  # 完整 token
│   ├── page-templates.yaml      # 頁型約束（b_list_page/c_home 等）
│   ├── spec-to-figma-map.md     # yaml → Figma 呼叫映射
│   └── incremental-edit.md      # Phase 7 增量修改規則
├── schema/page.ui.schema.json   # page.ui.yaml 結構校驗
├── templates/
│   ├── ia-draft.template.md
│   └── page.ui.template.yaml
└── examples/                    # 3 個完整案例（會員系統/庫存後台/AI比價）
```

| 層次 | 技術/形式 |
|------|-----------|
| 流程控制 | Markdown 流水線文件 + 強制閘門表（G0-G6），純 Prompt Engineering，無程式碼 |
| 資料規格 | YAML（`page.ui.yaml`）+ JSON Schema 校驗 |
| 執行層 | 依賴外部 Figma MCP（`figma-use`、`figma-generate-design`、`create_new_file`），本 repo 不含任何 Figma 整合程式碼 |
| 繼承關係 | 顯式 `inherits: frontend-design`（假設宿主環境已有該 Skill） |

本質上是一份**流程設計文件集**，沒有可執行程式碼，完全依賴宿主 Agent（Codex/Claude Code）讀取 Markdown 並遵循流程；「架構」即是 SKILL.md 定義的狀態機（Phase 0→7）與強制閘門（G0-G6）。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯；若未來承接 PM/原型類專案可歸入 QA 或設計分類參考，目前無此需求 |
| **Claude Code** | 高度重疊：明確 `inherits: frontend-design`（本機已裝），Anti-Slop checklist 與已裝的 `high-end-visual-design`/`design-taste-frontend`/`stop-slop` 理念幾乎同構（都是「防 AI 默認審美」）；差異在於本 skill 額外綁定 **Figma MCP 執行層**與**B/C 端雙軌 token 系統**，是現有 skills 沒有的產出物（可編輯 Figma Frame，而非靜態 HTML）。但本機並未安裝 Figma MCP/插件，此 skill 若裝上目前無法執行到 Phase 4 之後。 |
| **Automation** | 對 QA 工作流無直接助益——這是產品經理畫原型溝通用的工具，不解決測試/求職/履歷任何現有 pipeline 的問題。 |

---

## 安裝建議

⏳ **觀望，暫不安裝** — 理由：
1. 本機無 Figma MCP/插件，流水線只能跑到 Phase 3（`page.ui.yaml` 產出），核心價值（可編輯 Figma Frame）用不到。
2. 使用者是 QA 背景，非 PM，B/C 端原型生成非當前工作範疇；`hd-decode`/`ziwei`/`fate` 等專案已用 HTML 報告模板解決視覺輸出需求，不需要 Figma 中間格式。
3. Anti-Slop 方法論本身與已裝的 `frontend-design`/`high-end-visual-design`/`stop-slop` 高度重疊，價值增量僅在「B/C 端 token 路由表」這一份文件，若未來真有 PM 側需求，直接讀 `DESIGN.md`/`anti-slop-checklist.md` 兩份參考即可，不需要整包安裝。
4. Repo 僅 1 天新、單人帳號、零 issue/PR/release，尚無社群驗證信號。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：本機安裝 Figma MCP/插件，且承接 PM/原型設計相關專案
- **放棄條件**（→ ❌ 不裝）：持續無 Figma MCP 且非 PM 工作範疇 → 不裝，僅參考 DESIGN.md/anti-slop-checklist.md 兩份文件

---

## 延伸操作

- 想要完整架構圖譜？→ 執行 `/understand`
- 想搜尋特定 symbol？→ 用 `/smart-explore`
- 想比較類似專案？→ 再跑一次 `/repo-intel` 分析另一個 repo

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
