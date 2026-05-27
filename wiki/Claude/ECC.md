---
tags: [工具, Claude, AI, 外部資源]
---

# ECC — Everything Claude Code

> GitHub：https://github.com/affaan-m/ECC  
> 版本：v2.0.0-rc.1（RC 非穩定版）  
> 授權：MIT  
> 評估日期：2026-05-27

Anthropic Hackathon 得獎作品。跨多個 AI Coding 工具的「Operator 系統」，提供 skills、hooks、rules、agents、MCP configs。

**支援工具：** Claude Code、Cursor、Codex、OpenCode、Gemini、Zed、GitHub Copilot

**規模：** 61 agents + 246 skills + 76 command shims + 多語言 rules（12 個語言生態系）

---

## Instance 機制（核心概念）

ECC 推廣的多 Claude 同時作業模式，分三層：

### 層次 1：Two-Instance Kickoff
兩個 terminal 各跑一個 `claude`：
- **Instance 1（左）**：Scaffolding Agent — 建骨架、CLAUDE.md、rules
- **Instance 2（右）**：Deep Research Agent — 查 codebase、寫 PRD、做架構圖

**Cascade Method**：開新任務用新 tab 往右排，一次專注 3-4 個。

### 層次 2：Git Worktrees 隔離
多 Claude 同時改同一 repo 時，每個 instance 在獨立的 git worktree 作業：
```bash
git worktree add ../project-feature-a feature-a
cd ../project-feature-a && claude
```

### 層次 3：DevFleet（需額外安裝 MCP server）
獨立的 MCP server（`localhost:18801`），可自動：
- `plan_project()` → 生成任務 DAG
- `dispatch_mission()` → 派 Agent 進 worktree 執行
- 自動 merge、自動觸發下一個 mission

### 層次 4：NanoClaw REPL
包在 `claude -p` 外的 Node.js REPL，加了 session 持久化、分支、跨 session 搜尋。

---

## 已安裝的 Skills

| Skill | 用途 |
|-------|------|
| `context-budget` | 審計目前 context 使用量，找出 bloat 來源，給省 token 建議 |
| `continuous-learning-v2` | 從 session 自動抽取「instinct」，建立行為記憶（需 hooks 才能自動觀測） |

---

## 使用 context-budget

對話中直接說：「幫我做 context budget 分析」即可啟動。

輸出範例：
```
Context Budget Report
Total overhead: ~25,000 tokens
Top saving: 移除 3 個 CLI-wrapping MCP server → -27,500 tokens
```

---

## 使用 continuous-learning-v2

目前只裝了 SKILL.md，**自動觀測需要額外設定**：

1. 需要 `hooks/observe.sh` 腳本（從 ECC repo 取）
2. 在 `~/.claude/settings.json` 加 PreToolUse + PostToolUse hooks

可手動使用的指令：
- `/instinct-status` — 查看已學習的 instinct
- `/evolve` — 把 instinct 群集成 skill/command/agent
- `/instinct-export` — 匯出 instinct

---

## 評估結論

**不建議整包安裝**，理由：
- 246 個 skills 中 80% 與現有工作流無關（Swift、Kotlin、Blender、DeFi...）
- Hook 系統可能與現有 hooks 衝突
- Windows bash 相容性問題
- 與 Karpathy 最小化原則相違背

**採用策略**：手動 cherry-pick 個別 skill，不跑安裝器。

---

## 相關

- [[Claude Code Skills 使用手冊]]
- [[Claude 環境說明]]
