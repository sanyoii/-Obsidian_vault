---
source: "https://github.com/google-labs-code"
author: "Google Labs"
stars: "32K+"
clipped: 2026-06-26
tags:
  - "github/org"
  - "google-stitch"
  - "design-system"
  - "agent-skills"
  - "jules"
  - "mcp"
  - "ui-generation"
---

## google-labs-code — Google Stitch + Jules 開源組織全覽

> **google-labs-code** | 8 個公開 Repo | 總計 ⭐ 32K+
> Google Labs 的 GitHub 組織，圍繞 **Google Stitch**（AI UI 設計平台）和 **Jules**（雲端 Coding Agent）兩大產品

---

### 一句話說明

google-labs-code 是 Google Labs 在 GitHub 上的開源組織，核心產品是 **Google Stitch**（從文字 prompt 生成 UI 畫面的設計平台）和 **Google Jules**（非同步雲端 Coding Agent）。8 個 repo 涵蓋規範、SDK、Agent Skills、GitHub Actions 整合等。

---

### 8 個 Repo 一覽表

| # | Repo | ⭐ Stars | 🍴 Forks | 語言 | 授權 | 最後更新 | 說明 |
|---|------|---------|---------|------|------|---------|------|
| 1 | **design.md** | 20,753 | 1,695 | TypeScript | Apache-2.0 | 2026-06-15 | DESIGN.md 格式規範 + CLI 工具 |
| 2 | **stitch-skills** | 6,187 | 743 | TypeScript | Apache-2.0 | 2026-06-17 | Stitch MCP Agent Skills 套件（14 Skills） |
| 3 | **jules-awesome-list** | 3,097 | 541 | Markdown | 無 | 2026-06-24 | Jules Agent 精選 prompt 收藏 |
| 4 | **stitch-sdk** | 1,733 | 111 | TypeScript | Apache-2.0 | 2026-06-15 | Stitch API SDK（生成 UI → HTML/截圖） |
| 5 | **jules-action** | 206 | 40 | — | MIT | 2025-12-15 | GitHub Actions 整合 Jules |
| 6 | **jules-sdk** | 109 | 24 | TypeScript | Apache-2.0 | 2026-06-01 | Jules 程式化 SDK |
| 7 | **jules-skills** | 76 | 11 | TypeScript | Apache-2.0 | 2026-06-04 | Jules 專用 Skills |
| 8 | **action-setup** | 21 | — | — | — | — | pnpm 安裝 action（輔助用） |

---

### 🔑 Repo 1：design.md — DESIGN.md 格式規範

> ⭐ 20.7K | 569K chars | TypeScript monorepo

Google Stitch 的核心規範。定義純文字設計系統格式（YAML front matter + Markdown prose），讓 AI Coding Agent 在產出 UI 時有統一的設計語言。

**核心組件：**

| 組件 | 說明 |
|------|------|
| DESIGN.md Spec | 9 個標準章節（Overview/Colors/Typography/Layout/Elevation/Shapes/Components/Do's and Don'ts） |
| CLI 工具 | `npx @google/design.md lint/diff/export/spec` — 驗證、比較、匯出 |
| Token Schema | YAML 定義 colors/typography/rounded/spacing/components，支援 `{token.ref}` 互參 |
| Export 格式 | Tailwind v3 JSON / Tailwind v4 CSS / W3C DTCG tokens.json |
| Linter | 9 條規則：broken-ref / missing-primary / contrast-ratio / orphaned-tokens 等 |

**Token Schema 結構：**

```yaml
name: <string>
colors:
  <token-name>: <Color>        # 任何 CSS 色值
typography:
  <token-name>: <Typography>   # fontFamily/fontSize/fontWeight/lineHeight/letterSpacing
rounded:
  <scale-level>: <Dimension>   # 4px, 8px...
spacing:
  <scale-level>: <Dimension>
components:
  <component-name>:
    backgroundColor: "{colors.tertiary}"  # Token 互參
    textColor: "{colors.on-tertiary}"
```

**Windows 注意：** `.md` 副檔名會被 Windows 關聯到 Markdown 編輯器，需用 `npx -p @google/design.md designmd lint DESIGN.md` 取代。

---

### 🔧 Repo 2：stitch-skills — Agent Skills 開放標準套件

> ⭐ 6.2K | 454K chars | 3 Plugins × 14 Skills

基於 [Agent Skills 開放標準](https://agentskills.io) 的 Skill 套件。明確支援 **Codex, Antigravity, Gemini CLI, Claude Code, Cursor**。

**3 個 Plugin × 14 個 Skills：**

| Plugin | Skills | 說明 |
|--------|--------|------|
| **stitch-design** (6) | code-to-design / generate-design / manage-design-system / extract-design-md / extract-static-html / upload-to-stitch | 設計工作流 |
| **stitch-build** (4) | react-components / react-native / remotion / shadcn-ui | 程式碼生成 |
| **stitch-utilities** (4) | design-md / enhance-prompt / stitch-loop / taste-design | 輔助工具 |

**SKILL.md 結構解析：**（見 [[stitch-skills SKILL.md 結構分析]]）

每個 Skill 的標準目錄：

```
skills/<name>/
├── SKILL.md           ← Agent 任務指令（YAML frontmatter + Markdown 工作流）
├── scripts/           ← 驗證/下載腳本（bash/node）
├── resources/         ← Checklist/Style Guide/Template
└── examples/          ← Gold Standard 範例程式碼
```

**Claude Code 安裝：**

```bash
npx plugins add google-labs-code/stitch-skills --scope project --target claude-code
```

**重要前提：** 所有 skills 依賴 Stitch MCP Server（Google API），非獨立工具。

---

### 📝 Repo 3：jules-awesome-list — Jules 精選 Prompt

> ⭐ 3.1K | 9K chars | 純 Markdown

10 類 Jules Agent prompt 範本（Everyday Dev / Debugging / Documentation / Testing / Package Management / AI-Native / Context / Fun / Start from Scratch）。通用程度高，大部分也適用於 Claude Code。

---

### 💻 Repo 4：stitch-sdk — UI 生成 SDK

> ⭐ 1.7K | 1.17M chars | TypeScript

Stitch 平台的程式化 SDK。核心 API：`generate()` / `edit()` / `variants()` / `getHtml()` / `getImage()`。整合 Vercel AI SDK，可建立 MCP Server。需要 `STITCH_API_KEY`。

---

### 📦 Repo 5-8：Jules 系列

| Repo | Stars | 用途 |
|------|-------|------|
| jules-action | 206 | GitHub Actions 觸發 Jules |
| jules-sdk | 109 | Jules 程式化 SDK |
| jules-skills | 76 | Jules 專用 Skills |
| action-setup | 21 | pnpm 安裝 action |

---

### 與現有系統的關聯性

| 面向 | 評估 |
|------|------|
| **awesome-design-md** | `design.md` repo 是源頭規範。CLI 可驗證 `/design-fetch` 取回的 DESIGN.md |
| **taste-skill** | stitch-skills 的 `taste-design` 做類似 Anti-generic UI，設計理念相近 |
| **Claude Code Skills** | SKILL.md 結構是標準範本，值得參考。實際使用需 Stitch MCP Server |
| **自動化** | 整體依賴 Google 雲端服務（Stitch/Jules），無法本地自動化 |

### 安裝建議

| 優先級 | 行動 | 理由 |
|--------|------|------|
| 🟢 現在可做 | `npm install @google/design.md` | 本地驗證 DESIGN.md，與 `/design-fetch` 搭配 |
| 🟡 有空時 | 讀 stitch-skills 的 SKILL.md | 學習 Agent Skills 開放標準 |
| 🔴 不需要 | stitch-sdk / jules-* | 需 Google 雲端 API access |

---

### 相關連結

- [[awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫]] — 基於此規範的 73 品牌設計系統
- [[deer-flow — 字節跳動開源超級 Agent 運行框架]] — 另一個 Agent harness 的 Skills 設計
- [[addyosmani agent-skills — 生產級工程 Skills 套件]] — 同樣的 SKILL.md 設計模式
