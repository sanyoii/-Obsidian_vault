---
tags:
  - tools
  - AI
  - development-workflow
  - spec-driven-development
建立日期: 2026-06-05
來源連結: https://github.com/github/spec-kit
採用決定: 選項B（偷概念，不安裝）
---

# spec-kit — GitHub 官方 Spec-Driven Development 工具包

> **決策**：不安裝。僅採用其「每個 feature 一個目錄 + 三份文件」的模式，整合進現有 7-Agent 工廠的 spec-writer agent。
> **分析日期**：2026-06-05，用 repomix 解包全 repo（357 檔案、933K tokens）分析。

---

## 是什麼

**Spec-Driven Development（SDD）** 工具包，核心是一個 Python CLI（`specify-cli`），由 GitHub 官方維護。

- 非常活躍（v0.9.5，2026-06-01 ～ 06-05 連發 5 個版本）
- 支援 20+ AI Coding Agents（Claude Code、Copilot、Cursor、Gemini CLI、Codex CLI 等）
- 安裝方式：`uv tool install specify-cli --from git+...` 或 `pipx`

### 對 Claude Code 的整合方式

以 **Skills** 形式安裝到各專案的 `.claude/skills/`，提供一組 `/speckit.*` Slash Commands：

```
/speckit.constitution  → 建立專案原則（constitution.md，一次性）
/speckit.specify       → 描述 feature → 產生 spec.md
/speckit.clarify       → 釐清需求模糊之處
/speckit.checklist     → 驗證需求品質
/speckit.plan          → 技術實作計劃 → plan.md
/speckit.tasks         → 拆成 checkbox 任務清單 → tasks.md
/speckit.analyze       → 一致性檢查（spec/plan/tasks 互相對齊）
/speckit.implement     → 逐一執行 tasks.md 任務
```

---

## 核心模式（採用）

每個 feature 以 **Git branch 名稱**為目錄名，存三份文件：

```
specs/
└── <branch-name>/
    ├── spec.md    ← 技術規格（what & why，資料模型、API、邊界）
    ├── plan.md    ← 技術實作計劃（how，tech stack、架構決策）
    └── tasks.md   ← Checkbox 任務清單（誰做、做哪個檔案）
```

**優點：**
- 文件 Git-tracked，可版控、可 diff、可 PR review
- 切 branch = 切 feature context，不混淆
- builder agents 有明確的讀取來源（不依賴 chat history）

---

## 為何不安裝

| 考量 | 說明 |
|------|------|
| 重疊度高 | 已有 7-Agent 工廠（researcher→story-writer→spec-writer→builders→verifier）涵蓋相同流程 |
| 安裝成本 | 需要 uv，每個專案都要 `specify init`，project-scoped 不是全域 |
| 依賴增加 | Python CLI + uv 新增依賴，更新時需另外管理 |
| 偷概念即可 | 核心價值在「文件持久化模式」，不需整個工具 |

---

## 採用方式

已升級 **spec-writer agent**（`d:\Claude\.claude\agents\workflow\spec-writer.md`）：

1. 偵測當前 Git branch → 決定 feature 目錄名
2. 將技術規格全文寫入 `specs/<branch>/spec.md`
3. Scaffold `specs/<branch>/plan.md`（空白模板，供 backend-builder 填入）
4. Scaffold `specs/<branch>/tasks.md`（空白模板，供 builder 填入 checkbox）

> [!note] 未來可延伸
> backend-builder 和 frontend-builder 也可更新，讓它們在執行前讀取 `specs/<branch>/plan.md`，完成後更新 `tasks.md` 的 checkbox。

---

## 相關工具與概念

- [[7-Agent 工廠工作流]]（如有筆記）
- 官方文件：https://github.github.io/spec-kit/
- 社群 extensions catalog：`extensions/catalog.community.json`（含 bug workflow、git workflow 等）
