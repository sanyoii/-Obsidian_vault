# awesome-agentic-ai-zh

> 繁體中文版 AI Agent 學習地圖——從「LLM 是什麼」走到「打造多 agent 系統」的結構化路線圖 + 145+ 資源 curation + 實作練習。

**Repo：** https://github.com/WenyuChiou/awesome-agentic-ai-zh  
**線上文件：** https://wenyuchiou.github.io/awesome-agentic-ai-zh/  
**作者：** WenyuChiou（台灣人，繁中 canonical）  
**語言：** 繁中 / 簡中 / English 三版完整維護  
**授權：** MIT

---

## 定位

**學習路線圖 + 資源 curation + 基礎實作練習** 三合一。
幫想學 AI Agent 的人從「不知道從哪開始」走到「能設計多 agent 系統」。

| 核心 | 內容 | 規模 |
|------|------|------|
| 學習路線圖 | 8 stages × 2 tracks，循序漸進 | 8 stages、2 tracks |
| 資源 curation | 精選 project，附星等、適合誰、怎麼跑 | **145+ projects、62 MCP/Skill** |
| 實作練習 | 每 stage 1-5 個練習，70-150 行 starter code | **23 個練習 folder** |

---

## 兩條學習路徑

### Track A — CLI Power User（8-10 週）
想「用」現成 CLI Agent（Claude Code、Codex、Gemini CLI 等）提升效率：

| Stage | 主題 |
|-------|------|
| A1 | CLI Agent 選擇與安裝（7 主流 CLI 比較）|
| A2 | 可重複使用工作流程（CLAUDE.md / slash command）|
| A3 | 接入真實工作流程（MCP 接 CLI / CI 自動化）|
| +5 | Claude Code 生態（共用 hub，必看 5.1-5.4）|
| +8 | Agent Interfaces（Computer Use / Browser Use）|

### Track B — Agent Builder（現實 5-7 個月）
想「從零打造」自己的 agent：

| Stage | 主題 | 預估時程 |
|-------|------|---------|
| 3 ⭐ | 工具使用 + 第一個 Agent（ReAct / function calling）| 2-3 週 |
| 4 | Agent 框架（LangGraph / AutoGen / CrewAI / Smolagents）| 2-3 週 |
| 5 ⭐⭐ | **Claude Code 生態系**（MCP / Skills / Plugins / Subagents）| 3-4 週 |
| 6 | Context Engineering（RAG / Memory / vector DB）| 2 週 |
| 7 | Multi-Agent + Production（eval / observability）| 2-4 週 |
| 7.5 | 進階概念 reading map（12 個進階概念）| 1 週 |
| 8 ⭐⭐ | Agent Interfaces（Computer Use / Browser Use / Sandbox）| 2-3 週 |

---

## 共用基礎（Stage 0-2，兩條 track 都需要）

| Stage | 主題 | 預估時程 |
|-------|------|---------|
| 0 | 基礎準備（Python / CLI / git / API / JSON）| 1-2 週 |
| 1 | LLM 基礎（token / API / 各家比較 / 本地 LLM）| 1 週 |
| 2 | Prompt 設計（system prompt / few-shot / CoT）| 1-2 週 |

---

## 特別亮點

- **Stage 5（Claude Code 生態系）**：MCP / Skills / Plugins / Subagents 完整中文解說，Track A/B 皆必看，適合當 Claude Code 中文參考文件
- **7 步打造第一個 AI Agent** walkthrough：同一個 Paper Summary Bot 從 Stage 1 寫到 Stage 7，~350 行完整程式碼
- 詞彙表 `resources/glossary.md`：重要術語中英對照
- 實作練習支援 **Anthropic SDK / Ollama 雙路徑對照**（有 API key 或只用本地都可以）
- 5 條延伸路線：研究員 / 開發者 / 老師 / 知識工作者 / 日常使用者

---

## 對我的使用價值

- 直接看：**Stage 5 Claude Code 生態系** → MCP / Skills 完整中文說明
- 推薦給：想從零開始學 AI Agent 的初學者
- 7-step walkthrough：完整實作範例參考

---

## Tags

#learning #ai-agent #claude-code #mcp #tutorial #繁中 #resource-curation #roadmap
