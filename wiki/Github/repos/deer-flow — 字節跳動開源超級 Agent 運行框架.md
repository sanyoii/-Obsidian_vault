---
source: "https://github.com/bytedance/deer-flow"
author: "bytedance"
stars: "74.9K"
clipped: 2026-06-26
tags:
  - "github/repo"
  - "agent-framework"
  - "langgraph"
  - "langchain"
  - "multi-agent"
  - "superagent"
  - "harness"
  - "sandbox"
  - "bytedance"
---

## DeerFlow — 字節跳動開源超級 Agent 運行框架

> **bytedance/deer-flow** | ⭐ 74.9K | 🍴 10,090 | 📝 MIT
> "An open-source long-horizon SuperAgent harness that researches, codes, and creates."

---

### 一句話說明

DeerFlow（**D**eep **E**xploration and **E**fficient **R**esearch **Flow**）是字節跳動開源的超級 Agent 運行框架，基於 LangGraph/LangChain，內建沙箱執行環境、長期記憶、技能系統、子代理協調和 IM 頻道閘道器，能處理從幾分鐘到數小時的複雜任務。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 74,860 |
| Forks | 10,090 |
| 主要語言 | Python（6.8MB）+ TypeScript（1.4MB） |
| 授權 | MIT |
| 建立時間 | 2025-05-07 |
| 最新 Release | v2.0.0（2026-06-25） |
| Open Issues | 581 |
| Topics | agent, agentic-framework, deep-research, langchain, langgraph, multi-agent, superagent, harness |
| 首頁 | https://deerflow.tech |

---

### 核心功能

- **Super Agent Harness**：不是框架，是「batteries-included」運行環境。Lead Agent 自動分解任務、spawn 子代理、平行執行、合成結果
- **Skills 技能系統**：Markdown 格式的 SKILL.md，漸進式載入（只在需要時才進 context window）。內建：research、report-generation、slide-creation、web-page、image-generation。支援 `/skill-name` 斜線啟動
- **沙箱執行環境**：每個任務有獨立 filesystem（uploads/workspace/outputs）。三種模式：Local / Docker Container / Kubernetes Pod
- **長期記憶**：跨 session 持久化使用者 profile、偏好、知識。本地儲存，去重防膨脹
- **IM 頻道閘道器**：Telegram / Slack / 飛書 / 企業微信 / 微信 / 釘釘，不需公網 IP
- **Sub-Agents 子代理**：Lead Agent 即時 spawn 多個子代理，各有獨立 context、工具、終止條件
- **Context Engineering**：隔離子代理 context、自動摘要壓縮、tool-call 恢復
- **MCP Server 支援**：可配置 MCP server 擴展能力，支援 OAuth token flow
- **Claude Code 整合**：`claude-to-deerflow` Skill，可在 Claude Code 終端直接操控 DeerFlow
- **TUI 終端工作台**：Textual-based 終端 UI
- **Embedded Python Client**：`DeerFlowClient` 可不啟動 HTTP 直接以 Python library 使用
- **多 LLM 支援**：OpenAI / Anthropic Claude / DeepSeek / Doubao / Kimi / Qwen(vLLM) / OpenRouter / Codex CLI

---

### 技術架構

```
                    ┌──────────────────────────────────────┐
                    │           nginx (port 2026)          │
                    └──────────────┬───────────────────────┘
                                   │
                    ┌──────────────┴───────────────────────┐
                    │        Gateway (FastAPI)              │
                    │  Auth (OIDC/JWT/local)                │
                    │  Routers: agents/threads/runs/        │
                    │           memory/skills/mcp/channels  │
                    └──────────────┬───────────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
   ┌──────────┴──────┐  ┌─────────┴──────┐  ┌─────────┴──────┐
   │   Harness Core  │  │  IM Channels   │  │   Frontend     │
   │  Lead Agent     │  │  Telegram      │  │  Next.js       │
   │  Sub-Agents     │  │  Slack         │  │  shadcn/ui     │
   │  25+ Middleware  │  │  飛書/Lark     │  │  Workspace     │
   │  Skills         │  │  企業微信       │  │  Agent Gallery │
   │  Sandbox        │  │  微信/釘釘      │  │  Artifacts     │
   │  Memory         │  └────────────────┘  └────────────────┘
   │  MCP Client     │
   └─────────────────┘
```

| 層次 | 技術 |
|------|------|
| Frontend | Next.js + TypeScript + shadcn/ui + Tailwind |
| Gateway | Python FastAPI + SQLite/PostgreSQL（Alembic） |
| Agent Runtime | LangGraph + LangChain，25+ middleware 管線 |
| Sandbox | Local / Docker / K8s Pod |
| Search Tools | Tavily / Brave / DuckDuckGo / Serper / SearxNG / Exa / Firecrawl / InfoQuest / Jina AI |
| LLM Providers | OpenAI / Anthropic / DeepSeek / Doubao / Kimi / Qwen / MiniMax / OpenRouter |
| Observability | LangSmith + Langfuse（可同時啟用） |

---

### 中間件管線（25+）

DeerFlow Agent 執行管線由 25+ 個 middleware 組成，這是它作為 harness 最核心的設計：

| 類別 | 中間件 |
|------|--------|
| 安全 | input_sanitization, safety_finish_reason, safety_termination_detectors, sandbox_audit |
| 記憶 | memory, thread_data, summarization |
| 工具 | tool_call_metadata, tool_error_handling, tool_output_budget, deferred_tool_filter |
| 子代理 | subagent_limit, skill_activation |
| Context | dynamic_context, system_message_coalescing, token_budget, token_usage |
| 修復 | dangling_tool_call, llm_error_handling, loop_detection |
| UI | title, todo, uploads, view_image, clarification |

---

### 與 Claude Code 的對標比較

DeerFlow 和 Claude Code 是同一問題的不同實作——兩者都是「讓 AI Agent 可靠完成複雜任務」的 harness。

| 面向 | DeerFlow 2.0 | Claude Code |
|------|-------------|-------------|
| **定位** | 自架多人 Agent 服務 | 個人開發者 CLI/IDE 工具 |
| **核心引擎** | LangGraph + LangChain | Anthropic 原生 API |
| **Skills 格式** | SKILL.md（幾乎相同） | SKILL.md（幾乎相同） |
| **漸進載入** | ✅ 按需載入到 context | ✅ deferred tools |
| **子代理** | Sub-Agents（獨立 context） | Agent tool（worktree 隔離） |
| **Middleware** | 25+ 顯式管線 | Hooks（shell-based） |
| **沙箱** | Docker/K8s/Local 三模式 | 本地 sandbox（權限控制） |
| **記憶** | SQLite 持久化，跨 session | 檔案系統 memory（markdown） |
| **IM 整合** | 6 個頻道原生支援 | 無（純 CLI/IDE） |
| **Web UI** | Next.js 完整 UI | VS Code 擴展 / Web App |
| **部署** | Docker Compose，需 8GB+ RAM | 無需部署，直接用 |
| **LLM** | 多模型切換（10+ provider） | Claude 限定 |

---

### 與 Claude Code 整合的 Pros and Cons

#### ✅ Pros（整合的好處）

| # | 好處 | 說明 |
|---|------|------|
| 1 | **官方 Skill 已存在** | `claude-to-deerflow` Skill 已由 DeerFlow 團隊維護，`npx skills add` 一行安裝 |
| 2 | **重度研究任務卸載** | Claude Code context window 有限，深度研究可丟給 DeerFlow 的子代理平行執行，結果拉回 Claude Code |
| 3 | **Docker 沙箱隔離** | 需要執行不信任程式碼時，DeerFlow 的 Docker/K8s 沙箱比 Claude Code 的本地 sandbox 更安全 |
| 4 | **IM 頻道自動化** | 把 Telegram/Slack 接入 DeerFlow → 在手機上觸發任務 → 結果自動歸檔，Claude Code 無此能力 |
| 5 | **多 LLM 混用** | DeerFlow 支援 10+ LLM provider 混用（DeepSeek 做研究、Claude 做摘要），比 Claude Code 單一 Claude 更彈性 |
| 6 | **學習架構設計** | 25+ middleware 管線是企業級 Agent harness 的完整範例，對理解 Claude Code 內部設計有啟發 |
| 7 | **團隊共用** | 多人可共用同一個 DeerFlow 實例（有 Auth/OIDC），Claude Code 是個人工具 |

#### ❌ Cons（整合的代價）

| # | 代價 | 說明 |
|---|------|------|
| 1 | **功能高度重疊** | Skills、Sub-Agents、Memory、Sandbox——你的 Claude Code 環境已經有完整的對應方案 |
| 2 | **資源需求大** | 最低 4 vCPU + 8 GB RAM + Docker，推薦 8 vCPU + 16 GB RAM。你的本機跑 Claude Code + Obsidian + 瀏覽器已經吃掉不少資源 |
| 3 | **維護成本** | 又一個需要 `make dev` + 更新 config.yaml + 管理 .env 的服務，增加環境複雜度 |
| 4 | **Context 切換成本** | 在 Claude Code 和 DeerFlow Web UI 之間切換會打斷工作流，即使有 `claude-to-deerflow` Skill 也多一層抽象 |
| 5 | **LangChain 依賴** | DeerFlow 深度綁定 LangChain/LangGraph 生態系，版本更新容易出 breaking changes |
| 6 | **Windows 非一級支援** | README 明確說 Windows 需要從 Git Bash 執行，`cmd.exe` 和 PowerShell 不支援。WSL 也不保證 |
| 7 | **單一 Gateway Worker** | 生產環境只能跑 1 個 Worker（RunManager 狀態在 process 內），水平擴展受限 |
| 8 | **安全面積增加** | 多了一個暴露的 HTTP 服務 + Docker daemon + IM bot tokens，攻擊面擴大 |

#### 判斷結論

| 情境 | 建議 |
|------|------|
| 個人日常開發 | ❌ 不需要。Claude Code 已覆蓋所有使用場景 |
| 需要從手機觸發 AI 任務 | ⏳ 考慮。DeerFlow 的 IM 頻道是獨特優勢 |
| 需要多人共用 AI Agent | ✅ 適合。DeerFlow 的 Auth + Web UI + 共用記憶適合團隊 |
| 想學習 Agent harness 設計 | ✅ 強烈推薦讀原始碼。25+ middleware 管線是教科書級設計 |
| 需要執行不信任程式碼 | ⏳ 考慮。Docker/K8s 沙箱比本地 sandbox 更安全 |

---

### 相關連結

- [[Claude Code 設計指南 Skill]] — Claude Code 源碼架構書，可與 DeerFlow 架構交叉比較
- [[Ruflo 多 Agent 平台研究]] — 另一個多 Agent 協調平台，hooks/CLAUDE.md 驅動
- [[addyosmani agent-skills — 生產級工程 Skills 套件]] — 類似的 Skills 設計模式
