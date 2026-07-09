---
source: "https://github.com/Nanako0129/pilotfish"
author: "Nanako0129"
stars: "119"
clipped: 2026-07-09
tags:
  - "github/repo"
  - "claude-code"
  - "agent-governance"
  - "model-routing"
---

# pilotfish — Claude Code 多模型委派配置包

> **Nanako0129/pilotfish** | ⭐ 119 | 🍴 5 | 📝 MIT
> "Multi-model orchestration layer for Claude Code — the frontier model plans, cheaper models execute, verification guards quality. One-prompt install."

---

## 一句話說明

pilotfish 不是程式庫，是一份純設定包：把「主 session 用 Fable 5/Opus 規劃、subagent 用 Sonnet/Haiku 執行、fresh-context verifier 把關品質」這套委派策略，打包成三個檔案（`settings.json` 片段 + 6 個 agent 模板 + 一段 `CLAUDE.md` policy block），透過貼一段安裝 prompt 讓 Claude Code 自己讀 runbook、展示變更計畫、經使用者核准後寫入 `~/.claude/` 全域設定。建立於 2026-07-08，1 天內取得 119 星、發布 2 個版本。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 119 / 5 |
| 主要語言 | 無（純 Markdown/JSON，無 runtime code）|
| 授權 | MIT |
| 建立時間 | 2026-07-08 |
| 內容 | 18 檔案 / 25.9K tokens；README 有中英雙版 |
| 維護 | 單人（Nanako0129），1 天內 v1.0.0→v1.1.0 |

---

## 核心功能

- **三層架構分離**：Machine（`settings.json` 決定誰當 orchestrator + fallback 鏈）／Roles（`agents/*.md` 每個角色一行 frontmatter 綁定 model tier）／Policy（`CLAUDE.md` 只用角色名寫委派規則，從不提模型名）——模型棄用/降級時只需改一行 frontmatter，policy 文字完全不用動。
- **六個固定角色**：`scout`/`Explore`（haiku, low，唯讀偵察，正向 allowlist `Read,Glob,Grep`）、`mech-executor`（sonnet, low，機械式全規格工作）、`executor`（opus, medium，需判斷力的實作）、`security-executor`（opus, high，安全敏感工作，避開 Fable 5 因其安全分類器可能誤判拒絕正當防禦性安全工作）、`verifier`（opus, medium，fresh-context 對抗式驗證，只回 CONFIRMED/REFUTED，不動手修）。
- **Explore agent 覆寫**：Claude Code v2.1.198 起內建 Explore 會繼承主 session 模型；pilotfish 用同名 user-level agent 覆寫回 Haiku，避免背景搜尋燒高階模型 token。
- **供應鏈風險意識**：Trust & security 段落明確教使用者 pin release tag/SHA（而非 `main`）、要求展示完整變更計畫並等待核准才寫入，並提醒「核准關卡本身不夠，還要讀過實際安裝的模板內容」。
- **可逆安裝**：所有變更標明 reversible，附一鍵 uninstall prompt；重跑安裝 prompt = 升級（idempotent）。

---

## 技術架構

```
~/.claude/settings.json   →  model: "best" + fallbackModel: ["opus","sonnet"]
~/.claude/agents/*.md     →  6 個角色檔（scout/Explore/mech-executor/executor/security-executor/verifier）
~/.claude/CLAUDE.md       →  <!-- pilotfish:begin/end --> 包住的 Orchestration policy 區塊
```

無 runtime code，沒有 hook、沒有 MCP server，純粹是 prompt engineering + 設定檔。

---

## 與現有系統的相關性

高度重疊：三層分離（settings 決定誰指揮／agents frontmatter 決定 model tier／CLAUDE.md 只講角色不講模型名）幾乎就是本環境 `docs/institution/01-model-dispatch.md`「模型調度三鐵則」+ `.claude/agents/` 分類 + caveman crew（cavecrew-builder/investigator/reviewer 角色分工）已落地的架構。verifier「fresh-context 對抗式驗證、只回 CONFIRMED/REFUTED 不動手修」對應 R17 交付契約精神。

值得單獨借鏡的兩點（不必整包安裝）：① 明確的 effort tier 對照表（低/中/高分別對應偵察/機械/判斷/安全）；② `model: "best"` + `fallbackModel: ["opus","sonnet"]` 的優雅降級設計。

直接安裝會覆寫全域 `settings.json`/`CLAUDE.md`/`agents/`，與既有 institution 體系及 caveman crew 存在角色命名衝突風險（尤其 `Explore` 覆寫）。

## 安裝建議

⏳ 觀望，不安裝 — 概念與現有 institution 體系高度同構，非新增能力；安裝有全域設定覆寫與命名衝突風險。

---

## 相關連結

- [[Github/repos/looper — Claude Code Agent Loop 設計教練|looper]] — 同類「別人重新發明我已有系統」的 agent loop 設計參考
- [[Github/repos/fable-harness — Fable 行為協議移植套件（hooks 強制執行層）|fable-harness]] — 同類 hooks 強制執行層，作者自評「與 institution 體系 95% 同構」
