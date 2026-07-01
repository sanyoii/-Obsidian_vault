---
source: "https://github.com/f/prompts.chat"
author: "f (Fatih Kadir Akın)"
stars: "164K+"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "claude-code"
  - "prompts"
  - "skills"
  - "mcp"
---

# f/prompts.chat — 全球最大開源 AI Prompt 庫 + Claude Code 插件

> **f/prompts.chat** | ⭐ 164K+ | 🍴 21K+ | 📝 Other  
> "f.k.a. Awesome ChatGPT Prompts. Share, discover, and collect prompts from the community. Free and open source."

---

## 一句話說明

全球最大開源 Prompt 庫（前身「Awesome ChatGPT Prompts」，2022 年 12 月創立），提供可在 ChatGPT、Claude、Gemini、Llama 等 AI 使用的社群 Prompt 合集；同時提供 Claude Code 官方 Plugin，讓你在 IDE 內直接搜尋 Prompt 與 Skill，無需離開開發環境。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 164,557 |
| Forks | 21,295 |
| 主要語言 | HTML（Next.js 前端） |
| 授權 | MIT |
| 建立時間 | 2022-12-05 |
| 最後推送 | 2026-06-30（今天！極活躍） |
| Open Issues | 17 |
| Open PRs | 42 |
| Topics | chatgpt, claude, gemini, llm, prompt-engineering, nextjs |
| 首頁 | https://prompts.chat |

---

## Claude Code Plugin 功能

這個 claudepluginhub 插件是 `f/prompts.chat` 官方出品的 Claude Code 插件（`plugins/claude/prompts.chat/`），連接 prompts.chat MCP server 提供即時 Prompt/Skill 查詢。

### 安裝指令

```
/plugin marketplace add f/prompts.chat
/plugin install prompts.chat@prompts.chat
```

### 提供的功能

| 類型 | 名稱 | 說明 |
|------|------|------|
| **指令** | `/prompts.chat:prompts <query>` | 搜尋 Prompt，支援 `--type`/`--category`/`--tag` |
| **指令** | `/prompts.chat:skills <query>` | 搜尋 Agent Skills |
| **Agent** | `prompt-manager` | 搜尋、取用、儲存、改善 Prompt |
| **Agent** | `skill-manager` | 搜尋、安裝、建立 Skills |
| **Skill（自動觸發）** | `prompt-lookup` | 詢問 Prompt 模板時自動啟用 |
| **Skill（自動觸發）** | `skill-lookup` | 詢問 Skills 時自動啟用 |

### MCP 工具

| 工具 | 說明 | 需要 API Key？ |
|------|------|--------------|
| `search_prompts` | 搜尋 Prompt | ❌ 免費 |
| `get_prompt` | 取得 Prompt（含變數替換） | ❌ 免費 |
| `improve_prompt` | AI 改善 Prompt | ❌ 免費 |
| `search_skills` | 搜尋 Agent Skills | ❌ 免費 |
| `get_skill` | 取得完整 Skill 檔案 | ❌ 免費 |
| `save_prompt` | 儲存 Prompt 到帳號 | ✅ `PROMPTS_API_KEY` |
| `save_skill` | 建立多檔案 Skill | ✅ `PROMPTS_API_KEY` |

API Key 取得：https://prompts.chat/settings

---

## 技術架構

```
f/prompts.chat (主 repo)
├── prompts.csv / PROMPTS.md     ← 社群 Prompt 資料庫
├── src/                          ← Next.js 前端
│   └── app/                     ← prompts.chat 網站
├── plugins/claude/prompts.chat/  ← Claude Code Plugin
│   ├── .mcp.json                 ← MCP Server 連線設定
│   ├── commands/                 ← prompts.md, skills.md
│   ├── agents/                   ← prompt-manager, skill-manager
│   └── skills/                   ← prompt-lookup, skill-lookup
└── .claude-plugin/marketplace.json
```

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | ⚠️ 有重疊：AI-Prompts wiki 已有 15 個收藏檔；但 prompts.chat 有 164K⭐ 的社群量 |
| **Claude Code Skills** | ✅ `skill-lookup` 可輔助發現新 Skills；但你的 Skill 體系已相當完整 |
| **MCP 依賴** | ⚠️ 需要 MCP server 常駐，增加設定複雜度；搜尋免費但儲存需 API Key |
| **Automation** | ❌ 與現有 social-monitor/gbrain 無直接整合點 |

---

## 安裝建議

**⏳ 觀望**

理由：
- 搜尋功能免費且即刻可用，但需要 MCP server 設定
- 你的 `wiki/AI-Prompts/` 已有 15 個精選收藏；`skill-lookup` 功能在現有 `find-skills` + `skill-creator` 下可替代
- 主要價值在「社群 Prompt 探索」，但 gbrain 的 Obsidian 知識庫已覆蓋部份需求
- 值得在需要大量 Prompt 探索時（如開新專案、寫教學材料）再安裝試用

若要試裝：基本查詢不需 API Key，先裝再評估再決定是否留著。

---

## 相關連結

- [[Github/repos/x1xhlol-system-prompts-and-models-of-ai-tools|x1xhlol/system-prompts]] — AI 工具真實 system prompt 參考
- [[Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件|addyosmani/agent-skills]] — 現有 Skills 主力庫
- [[AI-Prompts/_index|AI-Prompts 收藏庫]] — Obsidian 內部 Prompt 收藏
