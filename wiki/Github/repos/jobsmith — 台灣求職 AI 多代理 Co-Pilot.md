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
React SPA (Vite)  ──HTTP·SSE·輪詢──►  FastAPI (uvicorn)
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

### LangGraph 投遞包生成流程（反思迴圈）

14 個 Agent 節點的多代理協作流程，背景執行、射後不理：

```
START
  ↓
① parse — 解析 JD → ParsedJob
  ↓
② match — 履歷 vs JD 匹配評分 → MatchReport (0-100)
  ↓
③ supervisor_match — LLM 動態決策
  ├─ stop → END（不適配）
  └─ proceed ↓
④ company_research — 公司情報搜尋 → CompanyBrief
  ↓
⑤ 三份文件『並行生成』
  ├─ resume_tailor  → TailoredResume（客製履歷+ATS）
  ├─ cover_letter   → CoverLetter（繁中求職信）
  └─ interview_prep → InterviewKit（技術/行為/台灣特有題）
  ↓
⑥ join（等三份完成）
  ↓
⑦ critic — 品管評審 → CritiqueReport（三份各 0-100）
  ↓
⑧ supervisor_critic — LLM 決策
  ├─ revise → 回到 ④（只重寫未達標文件，最多 3 輪）
  └─ approve ↓
⑨ human_gate → 存為「待審」/ 等使用者核可
  ↓
END
```

**關鍵設計：**
- 每個節點都有 `_safe()` 包裹：agent 失敗時降級為 fallback，不炸整條流程
- Supervisor 用 LLM 動態判斷路由，失敗退回確定性門檻邏輯（score ≥ 60）
- 重寫迴圈精準：只重跑 `per_doc` 指定的文件，已達標的保留不動
- 最多 4 條 pipeline 並行（`ThreadPoolExecutor(max_workers=4)`）
- 每個背景產生用獨立 graph + MemorySaver，不共用 SQLite 連線

### 自動找職缺流程

```
上傳履歷 → structure_profile() 解析
  ↓
derive_queries() 推導關鍵字（取 3 組）
  ↓
search_all() 四站並行搜尋 → 去重 + 地區過濾
  ↓
rank_jobs() 分批並行排序（12 筆/批，4 workers）
  → SSE 逐批串流（邊排邊顯示）
  ↓
（選填）find_company_jobs() 指定公司開缺獨立排序
```

### LLM 分層策略

| 層級 | 用途 | 對應模型 |
|------|------|---------|
| `deep` | 複雜判斷：supervisor、critic、match | opus |
| `standard` | 主要生成：resume、cover、interview | sonnet |
| `cheap` | 輕量任務：parse、structure、連線測試 | haiku |

### 資料儲存

| 資料庫 | 路徑 | 用途 |
|--------|------|------|
| `app.sqlite` | `data/app.sqlite` | 投遞包歷史、使用者記憶、搜尋紀錄、健檢紀錄 |
| `checkpoints.sqlite` | `data/checkpoints.sqlite` | LangGraph checkpoint（跨重啟 resume）|

### Windows 注意事項

- `.gitattributes` 設定 `* text=auto eol=lf`，會導致 `.bat` 檔被轉為 LF 換行
- Windows cmd.exe 需要 CRLF 才能解析 `.bat`，需加 `*.bat text eol=crlf` 例外
- 已在本機修正 `.gitattributes` 並轉換 `run.bat` / `desktop.bat` 為 CRLF

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
