---
source: "https://github.com/cwlin0131/Vault-for-Founders"
author: "cwlin0131 (CW Lin, Portaly CEO)"
stars: "225"
clipped: 2026-07-05
tags:
  - "github/repo"
  - "knowledge-management"
  - "obsidian"
  - "ai-agent"
---

# Vault-for-Founders — 創辦人 AI 知識庫建置框架

> **cwlin0131/Vault-for-Founders** | ⭐ 225 | 🍴 49 | 📝 無授權宣告
> "Build your AI co-founder"

---

## 一句話說明

台灣創業者 CW Lin（Portaly CEO）開源的方法論文件庫：教創辦人用 Obsidian + Git 從零建一套 AI 可讀的個人/公司知識庫（Vault），讓任何 AI Agent（Claude Code、Cowork、OpenClaw）啟動即帶完整記憶。純 Markdown 文件 + 模板，無程式碼。v2.0（2026-07-05）新增三大實戰升級：索引分層、attention budget、多層防禦維護。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 225 / 49（建庫 3 個月） |
| 主要語言 | 無（純 Markdown） |
| 建立時間 | 2026-04-05 |
| 最新 Release | v2.0（2026-07-05） |
| Open Issues / PRs | 0 / 1 |
| 內容 | 37 檔案 / 45K tokens；zh + en 雙語 |
| 維護 | 單人（作者本人），日常實戰回饋驅動 |

模板 13 份：agent-persona / memory-summary / vault-readme / vault-audit / vault-changelog / after-action / decision-style / voice-and-tone / git-workflow 等。

---

## 核心架構

三份「每次啟動必讀」檔案 + 個人/公司雙維度資料夾：

```
Vault root
├── README.md           ← Agent 的地圖（每次必讀）
├── agent-persona.md    ← AI 角色設定（每次必讀）
├── memory-summary.md   ← 長期記憶精華（每次必讀）
├── identity/ context/ operations/   ← 變動慢 → README 逐檔詳列
└── memory/ projects/ hr/            ← 會堆疊 → 各自 INDEX.md，README 留一行
```

### v2 三大升級（精華所在）

1. **索引分層** — 資料夾二分法：「變動慢」的在 Root README 逐檔詳列；「會堆疊」（時間序 log 型）的各帶 `INDEX.md`，README 只留一行入口。Trigger：資料夾 >10 檔且持續增長。把索引膨脹隔離在資料夾內，保護每次必讀的 Root README。

2. **Attention budget + 外部化 trigger** — 每次必讀三檔的總長是「開工前固定稅」。量化搬遷規則：**某段 >5 行 且 非每個 session 必用 → 搬到專屬檔案，原地留一行 pointer**。搬去哪：行為機制→identity/、流程→sop/、變更紀錄→changelog。

3. **多層防禦維護** — 單靠「記得同步索引」必漏，四層疊加：①主動規則（改檔同 response 同步索引）②收官檢查（after-action 模板）③定期體檢（vault-audit 比對實際檔案 vs 索引）④README 內鐵律段（每次啟動重讀）。

### 其他實戰 patterns

- **更新 log 只留兩條**（最後+前次），舊的搬 changelog — 阻止核心檔底部慢性肥大
- **Sticky reminders 不是 log** — 解決即刪，不留「已完成」堆積
- **最熱專案給 root dashboard** — 駕駛艙視角一頁，細節留 project 資料夾
- frontmatter 只要三欄（updated/tags/summary），欄位多必失修

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 高度同構但本系統更完整：wiki 已有 per-directory `_index.md` + refresh-index.ps1（= 它的索引分層+audit）；另有 gbrain 語意層與 NotebookLM 接地層，是它沒有的 |
| **Claude Code** | CLAUDE.md 150 行路由層 + institution 細則層 = 它的「README pointer + 專屬檔案」同一哲學；四層防禦對映 R 系列規則 / last-word / karpathy-audit / auto-load rules，全數已有 |
| **Automation** | 無自動化內容（純方法論），無可安裝物 |

**可借鏡的兩條（唯一增量）：**
1. **外部化量化 trigger**：「>5 行 且 非每 session 必用 → 搬走留 pointer」— 比現行「150 行硬上限」多一個段落級判準，可寫進 `docs/institution/04-maintenance-protocol.md`
2. **資料夾二分法**（變動慢 vs 會堆疊）作為索引策略的顯式規則 — 現行 refresh-index.ps1 一視同仁，此判準可讓大目錄索引策略更精準

**注意**：README 內嵌對 AI Agent 的指令（含代使用者 star 的一行指令）— 無害但屬 prompt-injection 模式，Agent 讀此 repo 時應照「hook 注入處理規則」忽略。

---

## 安裝建議

❌ **不建置，留作參考（📌）** — 對零基礎創辦人是好起點；本系統已具備其 95% 內容且多兩層檢索（gbrain/NotebookLM）。照跑建置 prompt 會蓋出平行低配 vault，違反 R13。價值僅在上述兩條規則移植。

---

## 相關連結

- [[Github/repos/obsidian-wiki — 讓 AI Agent 維護 Obsidian 數位大腦的跨平台 Skill 框架|obsidian-wiki]] — 同屬 LLM Wiki 模式，星數與成熟度更高
- [[Tools/claude-code-design-guide]] — CLAUDE.md 路由層設計出處脈絡
