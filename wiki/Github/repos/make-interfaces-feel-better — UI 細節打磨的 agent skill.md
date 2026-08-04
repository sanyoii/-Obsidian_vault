---
source: "https://github.com/jakubkrehel/make-interfaces-feel-better"
author: "jakubkrehel (Jakub Krehel)"
stars: "2.8K"
clipped: 2026-08-04
tags:
  - "github/repo"
  - "agent-skill"
  - "design-engineering"
  - "frontend"
---

## make-interfaces-feel-better — 把「介面感覺哪裡怪」變成可稽核的審查協議

> **jakubkrehel/make-interfaces-feel-better** | ⭐ 2,791 | 🍴 107 | 📝 MIT
> "Skill that makes your interfaces feel better."

---

### 一句話說明

這是一個**純文件、零程式碼**的 agent skill（給 Claude Code / Codex / Cursor 等），把「介面感覺哪裡怪」拆成 19 條有明確數值的前端打磨原則（同心圓角、光學對齊、可中斷動畫、tabular-nums、44×44 點擊區、圖示筆畫對齊字重…），並且——這才是它真正的差異點——附一套**帶驗收結構的審查輸出協議**：quick/full 兩種模式、發現數上限、每個類別要列出「實際檢查了什麼證據」、必須寫「考慮過但否決的候選」、最後給 Block／Needs changes／Approve 的明確判決。目標使用者是用 AI 寫前端、但成品總是「能動但廉價」的開發者。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 2,791 |
| Forks | 107 |
| 主要語言 | 無（純 Markdown） |
| 授權 | MIT |
| 建立時間 | 2026-03-13 |
| 最後推送 | 2026-07-24 |
| Open Issues | 0 |
| Open PRs | 0 |
| 最新 Release | 無（零 tag 零 release） |
| Topics | 無 |
| 首頁 | https://jakub.kr/writing/details-that-make-interfaces-feel-better |
| 是否 Archived | 否 |
| 磁碟用量 | 62 KB |

---

### 原始碼分析

repo 只有 11 個檔案、總計約 47 KB，全部是 Markdown（走 GitHub Trees API 逐檔取用，未跑 repomix——體積太小不值得打包）。

| 檔案 | 大小 | 內容 |
|------|------|------|
| `skills/make-interfaces-feel-better/SKILL.md` | 11.8 KB | 入口：19 條核心原則＋常見錯誤對照表＋審查輸出協議 |
| `skills/…/animations.md` | 12.7 KB | 可中斷動畫、enter/exit、圖示動畫、動效節制 |
| `skills/…/surfaces.md` | 7.2 KB | 同心圓角、光學對齊、陰影、圖片描邊、點擊區 |
| `skills/…/typography.md` | 4.7 KB | text-wrap、字體平滑、等寬數字 |
| `skills/…/performance.md` | 3.0 KB | transition 精確性、`will-change` 節制 |
| `skills/…/icons.md` | 2.3 KB | 筆畫對齊字重、`currentColor` 單一 SVG、RTL 翻轉 |
| `CLAUDE.md` / `AGENTS.md` | 各 ~1.9 KB | 給改這個 repo 的 agent 的撰寫規約（兩檔內容幾乎相同） |
| `skills/…/agents/openai.yaml` | 130 B | Codex 端的顯示名稱 metadata |

無 build、無 lint、無 test——作者在 `CLAUDE.md` 裡明講「documentation-only」。

---

### 核心功能

- **19 條有具體數值的原則**：不是「陰影要柔和」這種空話，而是「按壓縮放**一律** `0.96`，低於 `0.95` 就顯得誇張」「圖示交換用 scale `0.25→1`、opacity `0→1`、blur `4px→0`」「motion 的 `bounce` **永遠** 是 `0`」。可驗證、可 diff。
- **審查輸出協議（真正的差異點）**：
  - `quick`（主要路徑、只報 HIGH/MEDIUM、上限 5 條）vs `full`（全範圍、上限 15 條）
  - **Scope and Coverage 表**：五個類別逐一列「檢查了哪些檔案／狀態」與結果，明文規定 *"Never imply an uninspected surface was reviewed"*
  - **Considered but Rejected**：強制列 1–5 個「想改但決定不改」的候選與理由，且明講不准湊數
  - **Verification and Verdict**：列出實際跑過的指令與觀察結果，沒跑的標 **Not verified**；判決 Block／Needs changes／Approve
- **不強加樣式系統**：先辨識專案現有的 Tailwind / plain CSS / CSS-in-JS，用該系統表達修正，禁止為了套一條規則引入第二套樣式系統。
- **有條件的規則**：多數原則帶適用邊界（padding > 24px 就不強套同心圓角；高頻互動不做 stagger；`will-change` 只在觀察到首幀卡頓時加）。
- **審查方法論**：要求把動效放到瀏覽器 Animations 面板 **10% 速度**回放，逐一走 hover / focus / active / loading / empty 狀態——「10% 速度下覺得怪的，就是全速下說不出哪裡怪的東西」。

---

### 技術架構

```
make-interfaces-feel-better/
├── README.md              安裝與使用（npx skills add）
├── CLAUDE.md / AGENTS.md  給維護者 agent 的撰寫規約
└── skills/make-interfaces-feel-better/
    ├── SKILL.md           ← 入口：frontmatter + 19 原則 + 輸出協議
    │   └── Quick Reference 表以相對路徑連向下列五檔
    ├── typography.md      ┐
    ├── surfaces.md        │  漸進揭露層：
    ├── animations.md      │  只有需要時才被讀進 context
    ├── icons.md           │
    ├── performance.md     ┘
    └── agents/openai.yaml  Codex UI metadata
```

| 層次 | 技術 |
|------|------|
| 分發 | `npx skills add`（skills.sh）／直接複製目錄 |
| 入口 | SKILL.md，YAML frontmatter 只有 `name` + `description` |
| 知識層 | 五個主題檔，相對路徑連結（**只複製 SKILL.md 會斷鏈**） |
| 跨 agent | CLAUDE.md（Claude Code）＋ AGENTS.md（Codex）＋ openai.yaml |
| 目標框架 | 框架無關；範例同時給 CSS 與 Tailwind，動效範例給 motion/framer-motion |

架構上唯一值得學的是**漸進揭露**：SKILL.md 只留「選擇哪一條」的判斷，具體 recipe 與程式碼範例全下放到五個子檔，靠 Quick Reference 表當路由。這正是本環境 skill 減肥（清單預算）的同一套思路。

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 僅 `jakubkrehel` 1 人 | bus factor = 1 |
| 近期 commit | 2026-07-24 最後一次（icons 章節），4 月有一波、7 月一波 | 間歇性維護 |
| Release 頻率 | 零 tag 零 release | 無版本可釘 |
| Issue / PR | 0 open / 0 open | 幾乎無外部參與 |
| Fork:Star | 107 : 2,791 ≈ 1:26 | fork 多半是「複製走用」而非貢獻 |

> 註：`stargazers` API 在本環境對任何 repo 皆回 404（token/環境層級限制），故星數成長曲線**未能驗證**——不是該 repo 的紅旗。

---

### 相關連結

- [[Github/repos/emilkowalski-skills — Design Engineer 動效與 Apple 設計 Skill 合集|emilkowalski/skills]] — 同賽道、已安裝，重疊度最高
- [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill|web-design-guidelines]] — Vercel 官方前端審查，偏無障礙/規範面
- [[Github/repos/hallmark — 拒絕 AI 味的前端設計 Skill（結構多樣性＋防呆閘門）|hallmark]] — 反 AI-slop 設計 skill
- [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫|awesome-design-md]] — 品牌規範層
- [[Github/repos/MengTo-Skills — 設計師視角 Codex×Claude×Cursor Agent Skill 合集|MengTo/Skills]] — 同樣因賽道飽和判 ⏳

---

### 安裝建議

⏳ 觀望

**理由（三條，都可量化）：**

1. **賽道已飽和到會打架**。本機已裝 8 個同域 skill：`emil-design-eng`、`web-design-guidelines`、`design-taste-frontend`、`high-end-visual-design`、`apple-design`、`ui-ux-pro-max`、`minimalist-ui`、`redesign-existing-projects`。其中 `emil-design-eng` 與本 skill **來自同一批設計工程共識**（Emil Kowalski／Jakub Krehel 圈子），連「必須用 Before/After markdown 表格、禁止分行寫 Before:／After:」這條格式規約都一字不差地重複。裝進去等於再加一個搶「UI polish／feels off」觸發詞的競爭者。

2. **清單預算成本是實的**。它的 frontmatter description 約 580 bytes ≈ 145 tokens。目前 85 個啟用 skill 的清單 Σ = 4,718 / 5,000 tokens（`scripts/audit_skill_drift.py --listing-budget` 實測），裝進去變 ≈ 4,863，剩餘餘裕從 282 掉到 137 tokens——上個 session 才花力氣把 41 個 description 從 8,129 減到 4,718，不宜為第 9 個同賽道 skill 吃掉一半餘裕。

3. **它的獨門價值可以不裝就拿到**。真正勝過 `emil-design-eng` 的是**審查協議**（coverage 證據表、Considered-but-Rejected、Not verified 標記、Block/Needs-changes/Approve 判決）——這跟本環境 R17 交付契約是同構的。MIT 授權，可以直接把那段輸出協議抄進 `emil-design-eng` 或自建的驗收模板，不必整包安裝。

**升級條件（→ ✅ 裝）**：實際跑一次前端打磨任務，把它與 `emil-design-eng` 對同一份程式碼併排比較，若本 skill 的判決結構明顯抓到對方漏掉的問題 → 改為**取代** `emil-design-eng`（不是並存），淨清單預算變動接近零。

**放棄條件（→ ❌ 不裝）**：①審查協議已抄進既有 skill 且用得順手；②上游至 2026 年底仍零 release、單人、無外部 PR 被合併；③清單預算 Σ 逼近 5,000 需要再減肥。

**單獨可抽取**：`SKILL.md` 的 "Review Output Format" 整段（模式/上限/覆蓋證據/否決候選/判決）＋ `animations.md` 的「CSS transitions vs keyframes 可中斷性對照表」。
