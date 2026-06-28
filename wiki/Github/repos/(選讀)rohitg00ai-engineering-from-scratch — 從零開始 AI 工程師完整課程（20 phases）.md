---
title: "rohitg00/ai-engineering-from-scratch: AI Engineering From Scratch — 完整 20 phase 課程"
source: "https://github.com/rohitg00/ai-engineering-from-scratch"
author: "rohitg00"
created: 2026-05-30
description: "從零開始的 AI 工程師完整課程，20 個 phase、2722 個檔案，含 MCP/A2A 協定、Agent Loop、LangGraph、Claude Code 等主題，每課附 Claude Skill 輸出。"
tags:
  - clippings
  - ai-engineering
  - course
  - agent
  - llm
verdict: "選讀 Phase 13–16（MCP/Agent/Swarm），前段略讀即可"
---

# rohitg00/ai-engineering-from-scratch — 從零開始 AI 工程師完整課程（20 phases）

## 一句話說明

從零開始的 AI 工程師完整課程，20 個 phase、2,722 個檔案，用結構化 phase 組織，每個主題含程式碼、文件、測驗與 Claude Skill 輸出。

---

## 主要章節（20 phases）

| Phase | 主題 |
|-------|------|
| 00 | 開發環境、Docker、GPU 設置 |
| 01 | 數學基礎（線性代數、微積分、最佳化） |
| 02–03 | ML 基礎 + 深度學習核心 |
| 04–06 | 電腦視覺、NLP、語音音訊 |
| 07–08 | Transformer 深度解析、生成式 AI |
| 09–10 | 強化學習、LLM from scratch |
| 11–12 | LLM 工程、多模態 AI |
| 13 | 工具與協定（MCP 模型上下文協定、A2A 跨 Agent 通訊協定等） |
| 14 | Agent 工程（ReAct「推理-行動循環」、ReWOO「無觀察推理」、Tree of Thoughts「思維樹搜尋」、LangGraph「Agent 狀態機框架」） |
| 15 | 自主系統（AlphaEvolve「自我演化程式碼」、Darwin-Gödel Machine「自我改良機器」、Claude Code 權限模式） |
| 16 | 多 Agent 與 Swarm 協作（A2A 跨 Agent 通訊協定） |
| 17 | 基礎設施與生產部署 |
| 18 | 倫理、安全、對齊 |
| 19 | 綜合專案（40+ 個） |

---

## 技術棧

Python（主力）+ TypeScript + Julia + Rust；深度學習框架 PyTorch、Transformers，Agent 框架 LangChain、LangGraph，以及 Anthropic SDK、OpenAI SDK；容器化用 Docker、訓練用 GPU/CUDA；每課包含 quiz.json 測驗 + Claude Skill 輸出檔。

---

## 結論：選讀 Phase 13–16

**對已熟悉 Claude Code 工具鏈的開發者：選讀即可，不必通讀。**

亮點在 Phase 13–16：
- Phase 13：MCP（模型上下文協定）/ A2A（跨 Agent 通訊協定）
- Phase 14：Agent 迴圈設計、LangGraph 狀態圖（stateful graph）
- Phase 15：**Claude Code 權限模式專課**（`phases/15-autonomous-systems/10-claude-code-permission-modes/`）
- Phase 16：A2A 多 Agent 群體協作（swarm）

前半（Phase 00–12）對已有基礎的開發者參考價值有限，較教科書式。整體品質中等，更像教學索引而非生產級程式庫。每課附有的 Claude Skill 輸出（`.md` 格式）可直接參考或移植。

**建議**：重點看 Phase 13–16 的 `code/main.py` 和 `outputs/` 目錄，其他略讀 README 即可。

---

*相關：[[karpathy/autoresearch]]*
