---
title: "activeloopai/hivemind: One brain for all your agents"
source: "https://github.com/activeloopai/hivemind"
author: "Activeloop（Deeplake）"
created: 2026-05-30
description: "跨 AI Coding Agent 的共享記憶系統。自動捕捉 session，上傳至 Deeplake 雲端，並將重複模式自動 codify 成 SKILL.md 分發給整個團隊。"
tags:
  - clippings
  - ai-agent
  - memory
  - skills
  - claude-code
  - deeplake
verdict: "不推薦安裝（獨立開發者）"
---

# Hivemind — 跨 AI Coding Agent 共享記憶系統

> **注意**：這是 Activeloop/Deeplake 的 Hivemind，不是 PyTorch 分散訓練的同名 library（`learning-at-home/hivemind`）。

口號：*One brain for all your agents* —— 一個工程師的 agent 學會的東西，整個團隊的 agent 都能用。

---

## 核心功能

| 功能 | 說明 |
|------|------|
| **全量捕捉** | 每條 prompt、tool call、response 全部上傳到 Deeplake 雲端 |
| **自動 Skillify** | 每 20 個 turn，背景 worker 掃描 session，自動產生 SKILL.md |
| **共享給團隊** | Workspace 成員共享同一份記憶與 skills |
| **Codebase Graph** | 從 agent 實際操作行為建立程式碼圖譜 |
| **Team Rules** | 跨 agent 共享團隊原則，每次 SessionStart 注入 |
| **Session 摘要** | Session 結束後 AI 自動產生 wiki 摘要 |

## 支援平台

| 平台 | 整合方式 |
|------|---------|
| Claude Code | Marketplace plugin |
| Codex | Hooks (`hooks.json`) |
| Cursor | Hooks (`hooks.json` 1.7+) |
| OpenClaw | Native extension |
| Hermes | Shell hooks + MCP server |
| pi | Extension API + AGENTS.md |

## 安裝

```bash
npm install -g @deeplake/hivemind && hivemind install
# 只裝 Claude Code
hivemind install --only claude
```

## Benchmark（LoCoMo 記憶力測試）

| 指標 | Baseline | Hivemind | 改善 |
|------|---------|---------|------|
| 費用 / 100 QA | $8.94 | $6.65 | **25% 省** |
| Token / 問 | 1,700 | 1,008 | **1.7× 少** |
| Turn / 問 | 8.9 | 6.2 | **31% 少** |

---

## ⚠️ 資料收集警告

官方 README 明確說明以下資料全部上傳至 Deeplake 雲端：

- 你發的每條訊息（user prompts）
- 每個 tool call 的完整 input
- 每個 tool call 的完整 output
- Agent 的 response
- Subagent 的 tool calls 和 responses
- 自動 codify 的 skills

> *All users in your Deeplake workspace can read this data. That's the design.*

可設 `HIVEMIND_CAPTURE=false` 停用捕捉（但需手動設定）。

---

## 結論：不推薦（獨立開發者）

**三個原因：**

1. **核心價值是團隊知識共享**，單人開發者用不到跨人傳遞的功能
2. **全量資料上雲**，session 包含私人路徑、API key 附近的 context、個人文件內容
3. **功能重疊嚴重**，與現有的 skills 系統、memory 系統、gbrain 知識庫大量重疊

**適合安裝的情境**：5+ 人開發團隊、有共用 Deeplake workspace、可接受 session 全量上雲。

---

*相關：[[activeloopai]] · [[Deeplake]]*
