---
source: "https://github.com/kevin333353/jobsmith"
author: "kevin333353"
stars: "8"
clipped: 2026-06-26
tags:
  - "github/repo"
  - "job-search"
  - "taiwan"
  - "multi-agent"
  - "claude-code"
  - "langgraph"
---

## jobsmith — 台灣求職市場 AI 多代理 Co-Pilot

> **kevin333353/jobsmith** | ⭐ 8 | 🍴 0 | 📝 Apache 2.0
> "針對台灣求職市場的開源多代理 AI 求職 co-pilot"

---

### 一句話說明

專為台灣求職市場打造的開源 AI 求職助手，整合 104/Yourator/LinkedIn/Cake 四大平台，用 LangGraph 多代理架構自動搜尋職缺、評分排序、產生客製投遞包（履歷+求職信+面試準備+公司研究），還有模擬面試。預設用本機 Claude Code / Codex CLI 訂閱當引擎，免 API key。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 8（2026-06-24 剛建立） |
| Forks | 0 |
| 主要語言 | Python（410K）+ TypeScript（234K） |
| 授權 | Apache 2.0 |
| 建立時間 | 2026-06-24 |
| 最新 Release | v0.1.0（2026-06-26） |
| Topics | ai-agents, claude-code, codex-cli, fastapi, job-search, langgraph, multi-agent, react, taiwan |

---

### 核心功能

- **自動找職缺**：上傳履歷 → AI 推導關鍵字 → 並行搜尋 104/Yourator/LinkedIn/Cake → 分批串流、依適配度排序
- **投遞包工作台**：多代理流程（解析 JD → 匹配評分 → 公司情報 → 客製履歷 → 求職信 → 面試準備 → 品管反思）背景執行，多職缺可平行
- **履歷健檢**：依台灣 ATS 慣例評分，給修改建議 + 改寫前後範例
- **模擬面試**：依 JD + 履歷出題，逐題即時回饋評分
- **投遞包管理**：狀態追蹤（進行中 → 待審 → 已核可），匯出 Word .docx
- **三種 LLM 後端**：Claude Code CLI / Codex CLI（免 API key）/ BYOK（任何 OpenAI 相容端點）
- **桌面 App**：PyInstaller 打包成單檔 Windows .exe
- **Supervisor 反思迴圈**：Critic 品管 + 重寫，通過率 60% → 100%
- **自動模型分層**：haiku 解析、sonnet 匹配/生成、opus 深思

---

### 技術架構

```
React SPA (Vite)  ──HTTP·SSE·輪詢──►  FastAPI
                                       │
                 ┌─────────────────────┼─────────────────────┐
                 ▼                     ▼                     ▼
       LangGraph StateGraph      職缺來源             App SQLite
       (每個背景產生一個、       104 / Yourator /     (投遞包+狀態、
        各自 checkpointer)       LinkedIn / Cake       記憶、搜尋)
                 │
                 ▼
         可切換 LLM 後端
         claude_cli · codex_cli · openai (BYOK)
```

| 層次 | 技術 |
|------|------|
| Backend | Python, FastAPI, LangGraph, LangChain, Pydantic v2, SQLite, BeautifulSoup |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, lucide-react |
| LLM | Claude Code CLI / Codex CLI / BYOK |
| Desktop | pywebview + PyInstaller |
| 測試 | pytest（30+ 測試檔案） |

---

### career-ops vs jobsmith 比較

| 面向 | career-ops | jobsmith |
|------|-----------|----------|
| 目標市場 | 歐美（Ashby/Greenhouse/Lever） | 台灣（104/Yourator/Cake/LinkedIn） |
| Stars | 55K | 8 |
| 架構 | Skill modes（Markdown 驅動） | LangGraph 多代理（Python） |
| UI | CLI / Go TUI | React Web + 桌面 App |
| 面試準備 | STAR+R Story Bank | 互動模擬面試 |
| 成熟度 | v1.13 | v0.1.0 |

兩者完美互補：career-ops 管歐美職缺，jobsmith 管台灣市場。

---

### 相關連結

- [[career-ops — AI 驅動求職自動化指揮系統]]
- [[job-crawler 職缺海巡系統]]（已由 jobsmith 取代台灣市場部分）
