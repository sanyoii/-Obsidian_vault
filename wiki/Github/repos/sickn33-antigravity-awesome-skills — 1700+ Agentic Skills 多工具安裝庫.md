---
source: "https://github.com/sickn33/antigravity-awesome-skills"
author: "sickn33"
stars: "42K+"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "claude-code-skills"
  - "skill-library"
  - "multi-tool"
  - "agentic"
---

## sickn33/antigravity-awesome-skills — 1,700+ Agentic Skills 多工具安裝庫

> ⭐ 42K+ | 🍴 6,720 | 📝 MIT
> *"Installable GitHub library of 1,700+ agentic skills for Claude Code, Cursor, Codex CLI, Gemini CLI, Antigravity, and more."*

---

### 一句話說明

全球最大 AI Coding Assistant Skill 庫，用 `npx antigravity-awesome-skills --claude` 一鍵把 1,700+ 個 `SKILL.md` playbook 裝到本地，支援 Claude Code / Cursor / Codex CLI / Gemini CLI / Kiro / OpenCode / GitHub Copilot；另有 14 個領域型 Specialized Plugin 包（各 ~10 個精選 skills）。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 42,048 |
| Forks | 6,720 |
| 主要語言 | Python（工具鏈）+ JavaScript + Shell |
| 授權 | MIT |
| 建立時間 | 2026-01-14 |
| 最新 Release | v13.5.0（2026-06-29） |
| 首頁 | https://sickn33.github.io/antigravity-awesome-skills/ |

---

### 核心功能

- **NPX 一鍵安裝**：`npx antigravity-awesome-skills --claude` 裝到 `~/.claude/skills/`
- **1,700+ SKILL.md Playbooks**：開發/測試/安全/DevOps/AI Agent/資料分析/產品設計/文件/SaaS Launch
- **14 個 Specialized Plugin**（精選 10 skills/包）：

| Plugin | 適用 |
|--------|------|
| AAS QA & Test Automation | 測試套件/瀏覽器自動化/QA 穩定化 |
| AAS Security Engineer | 授權安全測試/稽核/強化 |
| AAS Agent & MCP Builder | Agentic apps/MCP/RAG/eval loop |
| AAS Web App Builder | 前端/全端 |
| AAS Data Analytics | SQL/Dashboard/實驗 |
| AAS DevOps & Cloud | 基礎設施/部署 |
| AAS OSS Maintainer | PR/release/貢獻者交接 |
| AAS Documents & Presentations | Office 文件/轉換/投影片 |
| AAS SaaS Launch & Revenue | MVP/定價/支付/SEO |
| AAS AI Product & Evaluation Ops | AI 指標/eval/tracing |

- **Bundle 系統**：按角色推薦組合（挑選指引，非獨立安裝）
- **Workflow 系統**：有序執行 playbook（planning→coding→testing→audit→release）
- **多工具安裝 flag**：`--claude`, `--cursor`, `--gemini`, `--codex`, `--kiro`, `--antigravity`, `--path <custom>`
- **中文文件**：`docs_zh-CN/` 目錄

---

### 技術架構

```
antigravity-awesome-skills/
├── skills/          ← 1,700+ SKILL.md（A-Z）
├── plugins/         ← 14 specialized + bundles
├── apps/web-app/    ← GitHub Pages 目錄站（Vite + React）
├── tools/
│   ├── bin/install.js      ← npx 入口
│   └── scripts/*.py        ← validate/audit/sync/release
├── skills_index.json       ← 1MB metadata 索引
└── CATALOG.md              ← 494KB 完整目錄
```

---

### 安裝建議

⏳ **觀望全量，強烈建議裝 AAS QA plugin**

全量 1,700 skills 可能稀釋既有精準 skills 的觸發準確率。建議只裝 QA 相關 Specialized Plugin：

```bash
# Claude plugin marketplace 方式
claude plugin marketplace add sickn33/antigravity-awesome-skills
claude plugin install antigravity-bundle-aas-qa-test-automation@antigravity-awesome-skills
```

---

### 相關連結

- [[Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件|addyosmani/agent-skills]] — 已安裝的另一個 skills 庫
- [[Github/repos/anthropics-claude-plugins-official — Anthropic 官方 Claude Code Plugin 目錄|claude-plugins-official]] — 官方 skills 來源
- [[Github/repos/ECC — Claude Code harness-native 操作系統|ECC]] — 另一個大型 Skills 平台（182K⭐）
