---
source: "https://github.com/inkeep/open-knowledge"
author: "inkeep (Inkeep Engineering)"
stars: "1.3K"
clipped: 2026-06-28
tags:
  - "github/repo"
  - "markdown-editor"
  - "knowledge-management"
  - "mcp"
  - "agent-skills"
  - "llm-wiki"
  - "pkm"
---

## open-knowledge — AI 原生 Markdown 編輯器暨 LLM Wiki 平台

> **inkeep/open-knowledge** | ⭐ 1.3K | 🍴 52 | 📝 GPL-3.0
> "Beautiful, AI-native markdown editor and LLM Wiki"

---

### 一句話說明

OpenKnowledge 是由 Inkeep 團隊開發的開源 Markdown 編輯器，定位為「Notion + VSCode」的混合體——提供 WYSIWYG 編輯、wiki 連結圖譜、MCP 伺服器、Agent Skills、GitHub 同步、團隊共享，並原生整合 Claude Code、Codex、Cursor 等 AI Agent。適合用來建構 LLM Wiki、知識庫、工程規格文件，以及 Agent 的「第二大腦」。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,321 |
| Forks | 52 |
| 主要語言 | TypeScript (19.3 MB) |
| 其他語言 | CSS, JavaScript, Shell, HTML |
| 授權 | GPL-3.0 |
| 建立時間 | 2026-06-03 |
| Open Issues | 5 |
| 最新 Release | v0.19.2 (stable) + v0.20.0-beta.5 |
| Topics | `2nd-brain`, `agent-skills`, `claude`, `codex`, `llm-wiki`, `markdown-editor`, `pkm`, `skills` |
| 首頁 | https://openknowledge.ai |
| npm 套件 | `@inkeep/open-knowledge` |

---

### 核心功能

- **WYSIWYG Markdown 編輯器**：基於 TipTap/ProseMirror，支援 MDX、表格、程式碼區塊（CodeMirror + Lowlight）、數學公式、Mermaid 圖表、嵌入式 HTML/JSX 組件、腳註、標籤、Wiki 連結
- **Graph View（知識圖譜）**：可視化 wiki 連結關係，支援全域圖 + 文件級圖
- **MCP 伺服器**：內建 MCP server，讓 Claude Code/Cursor/Codex 透過 MCP 讀取和搜尋知識庫
- **Agent Skills 系統**：內建 Skill 管理器（安裝/更新/移動/刪除），支援 `SKILL.md` 格式
- **GitHub Sync + 團隊共享**：基於 git 的自動同步、分支管理、衝突解決；支援 share/publish/clone 流程
- **桌面 App (macOS)**：Electron 桌面應用，含內建終端機（TUI）、Agent handoff（直接將文件傳給 Claude/Codex/Cursor）
- **CLI（`ok`）**：`ok init` / `ok start` / `ok mcp` / `ok skills` / `ok share` / `ok diagnose` 等完整指令集
- **Agentic Search**：整合 Orama 搜尋引擎 + 嵌入向量語意搜尋
- **Timeline / Recovery**：文件歷史時間線與復原功能

---

### 技術架構

```
open-knowledge (Bun + Turbo monorepo)
├── packages/
│   ├── app/          ← Web 編輯器 UI（Vite + React + TipTap + Radix UI）
│   ├── cli/          ← CLI + npm 套件（Commander）
│   ├── core/         ← 共享核心邏輯（Markdown 處理、搜尋、Schema）
│   ├── desktop/      ← Electron 桌面 App（macOS DMG）
│   ├── plugin/       ← Agent 整合套件
│   └── server/       ← 本機協作伺服器 + MCP mount + Skills
├── docs/             ← 文件站（Next.js + Fumadocs）
├── biome-plugins/    ← 自訂 Biome lint 規則（GritQL）
└── scripts/          ← CI/build 腳本
```

| 層次 | 技術 |
|------|------|
| 編輯器引擎 | TipTap 3.x + ProseMirror + y-prosemirror (CRDT 協作) |
| 搜尋 | Orama (全文) + embeddings (語意) |
| Web UI | React + Vite + Radix UI + Tailwind + shadcn/ui |
| 桌面 App | Electron (macOS only) |
| CLI | Commander + tsdown + pino |
| MCP | @modelcontextprotocol/sdk ^1.28.0 |
| 同步 | simple-git + GitHub API (Octokit) |
| 文件站 | Next.js + Fumadocs |
| Lint | Biome + oxlint + 自訂 GritQL plugins |
| 套件管理 | Bun 1.3.13 + Turbo |
| 版本管理 | Changesets (pre-1.0 semver shift-down) |
| 最低執行環境 | Node 24+, Bun 1.3.13+ |

---

### 安裝方式

macOS 桌面 App：下載 DMG → 拖到 Applications。

Linux / Windows / Intel Mac（Web UI + CLI）：

```bash
npm install -g @inkeep/open-knowledge
cd your-project
ok init          # 自動偵測 Claude Code/Cursor/Codex 並配置
ok start --open  # 啟動 Web 編輯器
```

---

### 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 🔴 高度重疊 — 直接定位為 Obsidian 替代品，支援開啟 Obsidian vault 和 wiki 連結語法，但切換成本極高 |
| **Claude Code** | 🟢 高度相關 — 原生 MCP + Skills + Claude Code 整合；`ok init` 自動配置 `.claude/skills/`；Skill 格式與現有 `SKILL.md` 完全一致 |
| **Automation** | 🟡 中度 — CLI 可腳本化，但主要是互動式編輯器 |

**OpenKnowledge vs Obsidian + Claude Code 堆疊對比**

| | OpenKnowledge | Obsidian + Claude Code |
|---|---|---|
| 編輯器 | WYSIWYG（Notion-like） | 原生 Markdown |
| AI 整合 | 原生 MCP + Skills + Agent handoff | 手動配置 Skills + MCP |
| 圖譜 | 內建 Graph View | Obsidian Graph View |
| 同步 | Git-based auto-sync | 自行管理 git |
| 桌面 App | Electron (macOS only) | 全平台 |
| Windows 支援 | 僅 Web UI + CLI（Node 24+） | 完整桌面 App |

---

### 安裝建議

⏳ **觀望**

- 與 Obsidian 高度重疊，已有深度 Obsidian 工作流（Bases/Dashboard/QA Bug/Templates），切換成本遠超收益
- Windows 無桌面 App，僅 Web UI + CLI
- 需要 Node 24+
- GPL-3.0 授權，商業整合需注意
- 專案極度年輕（pre-1.0），API 仍在劇烈變動
- 值得參考：Agent Skills 管理 UI 和 MCP 整合模式

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：推出 Windows 桌面 App，且 API 進入 1.0 穩定（不再劇烈變動）→ 重新評估是否取代 Obsidian workflow
- **放棄條件**（→ ❌ 不裝）：持續維持 Web UI + CLI-only（無 Windows 桌面版）→ 不值得切換，維持 Obsidian

---

### 相關連結

- [[Obsidian Dashboard 開發進度]] — 現有 Obsidian 儀表板工作流
- [[Obsidian Inbox + gbrain Phase 0]] — Obsidian Inbox 捕捉流程
- [[Obsidian QA Bug 工作流]] — 已建立的 QA Bug 追蹤流程

---

### OpenKnowledge 官方連結

- 首頁：https://openknowledge.ai
- 文件：https://openknowledge.ai/docs
- Discord：https://discord.com/invite/YujKpFN49
- 𝕏：https://x.com/OpenKnowledgeAI
