# OpenHuman（tinyhumansai）

> 桌面個人 AI 超級助手。Tauri + Rust 後端，React/TypeScript 前端，跨平台 macOS/Windows/Linux。
> 
> - Repo: https://github.com/tinyhumansai/openhuman
> - Org: https://github.com/tinyhumansai/
> - 官網: https://tinyhumans.ai/openhuman
> - 授權: GPL v3
> - Stars: 30,000+（2026-06）

---

## 核心功能

| 功能 | 說明 |
|------|------|
| 桌面 Mascot | 有臉的 AI 伴侶，會說話、可加入 Google Meet |
| 118+ 整合 | Gmail, Notion, GitHub, Slack, Stripe, Calendar, Drive, Telegram, WhatsApp 一鍵 OAuth |
| Auto-fetch | 每 20 分鐘自動從帳號拉資料進本地記憶庫 |
| Memory Tree + Obsidian Wiki | 壓縮成 ≤3k token Markdown chunks，存 SQLite + Obsidian vault |
| TokenJuice | 自研 token 壓縮層，號稱降低成本 80% |
| 內建 Agents | archivist, code_executor, morning_briefing, orchestrator, planner, researcher, critic |
| Multi-agent | Agent 多重人格 + 作用域記憶 + 委派、Orchestration Control Plane |
| Model Council | 多模型辯論 + 主席合成 |
| 主動任務 | 從 GitHub / Notion / Linear / ClickUp 抓 task 自動執行 |
| Model Routing | 自動選 reasoning / fast / vision 模型 |
| MCP + Composio | 支援外部工具整合 |
| 本地 AI | Ollama 整合 |
| 語音 | STT + ElevenLabs TTS |

---

## 版本狀態（2026-06-02）

- 目前版本：**v0.57.9**（今日發布）
- 開發節奏：超活躍（每日多次 commit）
- 狀態：Early Beta

### 近期重要更新（v0.55 → v0.57）

- 記憶引擎重設計：ingest_summary、graph 改進、audit log
- Agent Workflows：phase-keyed task lifecycle playbooks
- Live streaming subagent view
- Configurable agent registry
- Windows build 修復（CEF preflight gate，2026-06-02）

---

## 安裝（Windows）

```powershell
irm https://raw.githubusercontent.com/tinyhumansai/openhuman/main/scripts/install.ps1 | iex
```

> ⚠ Build from source 門檻高（Rust 1.93 + CMake + Ninja + Node 24），建議用官方 binary 安裝。
> 
> Windows build 於 2026-06-02 剛修好，建議等 binary installer 穩定後再裝。

---

## 與現有工具重疊評估

| 需求 | 現有工具 | OpenHuman 優勢 |
|------|----------|----------------|
| 知識管理 | gbrain | 重疊高 |
| AI 對話 | Claude Code | 重疊高 |
| 筆記 | Obsidian | 可互補（Memory Tree 寫回 vault） |
| 帳號數據同步 | 無 | **獨特**（auto-fetch Gmail/Notion/GitHub） |
| 桌面 Mascot | 無 | **獨特** |
| 主動 task 管理 | 無 | **獨特**（Proactive task board） |

**結論**：功能大量重疊，但 auto-fetch 帳號整合 + Proactive task board 是目前工具鏈沒有的。

---

## 相關 Repos

| Repo | 說明 | 狀態 |
|------|------|------|
| [openhuman](https://github.com/tinyhumansai/openhuman) | 主程式 | 超活躍 |
| [openhuman-skills](https://github.com/tinyhumansai/openhuman-skills) | Skills 插件庫 | 活躍 |
| [neocortex](https://github.com/tinyhumansai/neocortex) | AI Memory API | Closed alpha，2+ 個月未更新 |
| [constitution](https://github.com/tinyhumansai/constitution) | Agent 行為準則文件 | 輔助 |

### neocortex 另行說明

「The Fastest AI Memory Model」—— 智慧遺忘 + 互動衰減記憶系統。  
目前 **Closed alpha**，需向 founders@tinyhumans.ai 申請 API key 才能使用。  
SDK 支援 Python / TypeScript / Go / Rust / Dart / C++ / C# / Java。

---

## Tags

#tools #ai #desktop #memory #agents
