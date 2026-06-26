---
source: "https://github.com/google-labs-code/stitch-skills"
author: "Google Labs"
stars: "6.2K"
clipped: 2026-06-26
tags:
  - "agent-design"
  - "skills"
  - "google-stitch"
  - "design-patterns"
  - "claude-code"
---

## stitch-skills SKILL.md 結構分析 — Agent Skill 設計模式

> 來源：google-labs-code/stitch-skills（⭐ 6.2K）的 14 個 SKILL.md 深度拆解
> 適用：所有遵循 [Agent Skills 開放標準](https://agentskills.io) 的 Skill 設計

---

### 一句話說明

Google stitch-skills 的 14 個 SKILL.md 展示了四種 Agent 工作流模式、三個高價值設計模式（Gold Standard 範例、接力棒交接、程式化驗證），是目前公開最完整的 Agent Skill 設計參考。

---

### SKILL.md 三層結構

每個 Skill 的 SKILL.md 遵循統一的三層結構：

```
┌─────────────────────────────────────────┐
│  Layer 1: YAML Frontmatter              │
│  name / description / allowed-tools     │
├─────────────────────────────────────────┤
│  Layer 2: 角色定義 + 前置條件            │
│  你是誰 / 什麼時候觸發 / 需要什麼       │
├─────────────────────────────────────────┤
│  Layer 3: 工作流 / 執行步驟              │
│  Step 1 → Step 2 → ... → 品質檢查       │
└─────────────────────────────────────────┘
```

#### Layer 1: YAML Frontmatter

```yaml
---
name: react-components          # kebab-case，唯一識別
description: >                  # 觸發條件寫在這裡（Agent 靠這句決定要不要啟動）
  Build React components from Stitch designs.
  Trigger when user mentions "build", "component", "React".
allowed-tools:                  # 可用工具白名單（可用 glob）
  - "stitch*:*"
  - "Read"
  - "Write"
---
```

**關鍵洞察：**
- `description` 兼做觸發詞——Agent 掃描 description 決定是否啟動此 Skill
- `allowed-tools` 用 glob 語法（`stitch*:*`）批量授權，比逐一列出更靈活
- 目前 155 個 Skill 中只有 4 個使用 `allowed-tools`，但 Google 的 14 個全部使用

#### Layer 2: 角色定義

```markdown
# Role
You are a senior React engineer specializing in design-system-driven
component development.

## Prerequisites
- DESIGN.md must exist in the project root
- Node.js >= 18
- Tailwind CSS configured
```

定義 Agent 的專業身份和環境要求，讓 Agent 知道自己「是誰」以及「能在什麼環境下工作」。

#### Layer 3: 工作流

步驟化指令，每步有明確的輸入/輸出。見下方「四種工作流模式」。

---

### 四種工作流模式

從 14 個 SKILL.md 中歸納出四種模式：

#### 1. Linear Pipeline（線性管線）

```
Input → Step 1 → Step 2 → Step 3 → Output
```

**代表 Skill：** `react-components`、`shadcn-ui`

最簡單的模式。每步有明確前置條件和產出物，失敗時有 troubleshooting 段落。適合「輸入確定、輸出確定」的任務。

#### 2. Multi-Phase Extraction（多階段萃取）

```
Input → Phase 1 (掃描) → Phase 2 (分析) → Phase 3 (產出) → 品質檢查
```

**代表 Skill：** `extract-design-md`、`code-to-design`

分階段處理，每階段有「如果...就...」的分支邏輯。Phase 2 根據 Phase 1 結果選擇不同路徑（例如：偵測到 Tailwind 就用 Tailwind 萃取路徑，否則用通用路徑）。

#### 3. Assessment Pipeline（評估管線）

```
Input → 條件判斷 → 路徑 A / 路徑 B → Output
```

**代表 Skill：** `enhance-prompt`、`manage-design-system`

開頭有 if/else 分支：「DESIGN.md 存在嗎？」→ 存在走增強路徑，不存在走建立路徑。適合「同一個 Skill 處理兩種初始狀態」的場景。

**enhance-prompt 的範例：**
```
if DESIGN.md exists:
  → 讀取 token → 用 token 增強 prompt → 附上 before/after 對比
else:
  → 分析專案 → 建議建立 DESIGN.md → 用通用增強
```

#### 4. Autonomous Loop / Baton Pattern（自主迴圈 / 接力棒）

```
Read baton → Execute → Write baton → (下一輪讀 baton 繼續)
```

**代表 Skill：** `stitch-loop`

最複雜的模式。Agent 讀取 `next-prompt.md`（接力棒），執行任務後更新接力棒，供下一輪或下一個 Agent 讀取。搭配 `SITE.md`（專案憲法：願景 + Sitemap + Backlog）作為全域上下文。

**接力棒格式（baton-schema.md）：**
```markdown
---
current-agent: frontend-builder
next-agent: test-verifier
status: completed | failed | needs-human
attempt: 1
---

## 已完成工作
...
## 關鍵決策
...
## 下一步注意事項
...
```

---

### 三個高價值設計模式

#### 1. Gold Standard 範例

每個 Skill 目錄放一個 **完美輸出範例**。Agent 看範例比讀 500 行規則更有效。

```
skills/react-native/
├── SKILL.md
├── examples/
│   └── gold-standard-card.tsx    ← 完美的 ActivityCard 元件
├── resources/
│   └── component-template.tsx    ← 空殼模板
└── scripts/
    └── validate.js               ← AST 驗證腳本
```

**Gold Standard vs Template 的差別：**
- Template（模板）：空殼骨架，告訴 Agent「結構長什麼樣」
- Gold Standard（金標準）：完整範例，告訴 Agent「最終產出應該長什麼樣」
- Agent 模仿範例的準確度遠高於解讀規則文字

**適用條件：** 輸出結構化 + 高頻使用 + 品質波動大的 Skill

#### 2. 接力棒模式（Baton Pattern）

結構化交接檔用於多 Agent 工作流（如 7-Agent 工廠）。解決的核心問題：**context 在 Agent 間傳遞時丟失**。

**與自由文字交接的差別：**

| 維度 | 自由文字 | Baton Pattern |
|------|---------|---------------|
| 格式 | 隨 Agent 發揮 | YAML frontmatter + 固定段落 |
| 可解析 | 否 | 是（機器可讀 status/attempt） |
| 錯誤傳播 | 靠 prompt 描述 | `status: failed` + 結構化 bug 詳情 |
| Loop-back | 複製貼上上次錯誤 | 讀 baton 直接取得完整上下文 |
| 事後 debug | 翻對話記錄 | 回查 baton 歷史 |

#### 3. 程式化驗證腳本

把品質檢查從文字規則升級到 **可執行腳本**。

**stitch-skills 的 `validate.js` 範例（AST 驗證）：**
```javascript
// 用 @swc/core 解析 TSX → AST
// 檢查：
// 1. Props interface 是否存在且正確命名
// 2. 是否有硬編碼顏色值（應用 design token）
// 3. 是否使用了原生 HTML 元素（應用設計系統元件）
```

**與 linter 的差別：**
- Linter（如 ESLint）：通用程式碼品質
- 驗證腳本：**Skill 特定的輸出品質**（例如：報告是否包含必要段落、UI 是否避開反模式）

---

### Skill 目錄標準結構

```
skills/<name>/
├── SKILL.md           ← Agent 任務指令（三層結構）
├── examples/          ← Gold Standard 範例
│   └── gold-standard-*.{tsx,html,md}
├── resources/         ← 參考資料（checklist、template、keyword 表）
│   ├── architecture-checklist.md
│   └── component-template.tsx
├── scripts/           ← 驗證 / 下載 / 輔助腳本
│   ├── validate.js
│   └── fetch-stitch.sh
└── references/        ← 外部文件參考（主題色、API 規格等）
```

並非每個 Skill 都需要所有子目錄。原則：
- `SKILL.md` 是唯一必須的檔案
- `examples/` 只加在輸出結構化且品質波動大的 Skill
- `scripts/` 只加在有可程式化驗證邏輯的 Skill
- `resources/` 放 Agent 執行時需要讀取的參考資料

---

### 套用到現有系統的實踐

基於此分析，已對 d:\Claude 的 155 個 Skills 系統執行以下改動：

| 改動 | 範圍 | 狀態 |
|------|------|------|
| Gold Standard 範例 | 5 個 Tier 1 Skill（repo-intel / design-taste-frontend / deck-ai-classroom / last-word / guizang-ppt） | ✅ 已建立 |
| Baton Pattern | 7-Agent 工廠（ORCHESTRATION.md + 7 個 agent .md） | ✅ 已加入 |
| 驗證腳本 | repo-intel / design-taste-frontend / workflow validator | ✅ 已建立 |

**掃描結論：** 155 個 Skill 中只有 5 個（3.2%）適合加 Gold Standard，7 個（4.5%）屬 Tier 2。其餘 143 個不適合（reference 類 / 行為修飾類 / 工具封裝類 / 流程引導類）。Gold Standard 不是萬靈丹——只有「輸出結構化 + 高頻 + 品質波動大」的 Skill 才有明確收益。

---

### 相關連結

- [[google-labs-code — Google Stitch + Jules 開源組織全覽]] — 母組織 8 repo 全覽
- [[awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫]] — 基於 DESIGN.md 規範的品牌設計系統
- [[addyosmani agent-skills — 生產級工程 Skills 套件]] — 同樣遵循 Agent Skills 開放標準的工程 Skill 套件
- [[Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則]] — Skill 設計的底層原則
