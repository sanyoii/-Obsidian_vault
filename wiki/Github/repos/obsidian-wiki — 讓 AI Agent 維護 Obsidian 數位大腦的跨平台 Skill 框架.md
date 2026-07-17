---
source: "https://github.com/Ar9av/obsidian-wiki"
author: "Ar9av"
stars: "2.6K"
clipped: 2026-07-04
tags:
  - "github/repo"
  - "obsidian"
  - "knowledge-management"
---

# obsidian-wiki — 讓 AI Agent 用 Karpathy「LLM Wiki」模式維護你的 Obsidian 數位大腦

> **Ar9av/obsidian-wiki** | ⭐ 2,649 | 🍴 266 | 📝 MIT
> "Framework for AI agents to build and maintain a digital brain through Obsidian wiki using Karpathy's LLM Wiki pattern"

## 一句話說明

把 Andrej Karpathy 的「LLM Wiki」構想（一次性把知識編譯成互聯 markdown 檔並持續維護，取代每次重問 LLM 或跑 RAG）包裝成一套跨 15+ 種 AI Coding Agent（Claude Code / Cursor / Windsurf / Codex / Gemini CLI / Kiro 等）都能讀取執行的 markdown Skill 集合，讓 Agent 直接讀寫、串連、查詢你的 Obsidian vault。

## 核心功能

- **一次安裝、多 Agent 通用**：`obsidian-wiki setup --vault <path>` 把 30+ 個 markdown Skill symlink 進各家 Agent 的 skills 目錄
- **完整 Ingest → Extract → Resolve 工作流**：wiki-ingest / wiki-dedup / wiki-lint / wiki-synthesize / wiki-rebuild / wiki-digest / wiki-export 等 20+ 個分工明確的 skill
- **多來源歷史記錄挖礦**：claude-history-ingest / codex-history-ingest / copilot-history-ingest 等，把各 Agent 對話紀錄反向萃取進 vault
- **本地 CLI 工具鏈**：doctor（健檢）、query（終端查詢）、lint（找壞連結）、graph-query/graph-analyse（圖譜分析）
- **多 Vault 路由**：`@name` token 切換不同 vault

## 技術架構

```
各 AI Agent → .skills/（30+ markdown skill，跨 Agent 協議）
           → obsidian_wiki/（Python 核心：cli/ast_extractor/graph_analysis/graphrag）
           → Obsidian Vault（本地 markdown）
```

## 社群健康度

貢獻者多人協作（非單人專案）；近 4 週 commit 11/8/2/17，仍密集開發；release 約每週一次；2 open issues / 4 open PRs，積壓極少。

## 安裝建議

⏳ **觀望** — 功能與現有 gbrain + Obsidian Wiki 索引自動化 + claude-mem 記憶系統高度重疊，尤其 claude-history-ingest 會與既有 memory 機制搶著寫 vault。若要引入需先設計清楚分工邊界（例如只取用 wiki-lint/wiki-dedup 這類補強型 skill），且 macOS 導向的排程腳本（launchd）在 Windows 上需改寫。專案品質本身高（活躍維護、測試覆蓋、多 Agent 相容），列入候選但不建議現在整套安裝。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：明確設計出與 gbrain/claude-mem 不衝突的分工邊界（如只取用 wiki-lint/wiki-dedup 補強型 skill），且完成 macOS launchd 腳本改寫為 Windows 相容版本
- **放棄條件**（→ ❌ 不裝）：gbrain + Obsidian 索引自動化 + claude-mem 持續覆蓋現有需求、無設計分工邊界的動機 → 不裝

## 相關連結

- 與現有 gbrain（Wiki 索引自動化）、claude-mem（跨 session 記憶）功能定位有重疊，需先釐清分工
