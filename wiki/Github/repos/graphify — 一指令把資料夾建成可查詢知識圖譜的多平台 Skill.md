---
source: "https://github.com/Graphify-Labs/graphify"
author: "Graphify-Labs (Safi Shamsi)"
stars: "89K+"
clipped: 2026-07-17
tags:
  - "github/repo"
  - "knowledge-graph"
  - "claude-code/skills"
  - "rag"
---

# graphify — 一指令把資料夾建成可查詢知識圖譜的多平台 Skill

> **Graphify-Labs/graphify** | ⭐ 89.1K | 🍴 8.7K | 📝 MIT | YC S26
> "AI coding assistant skill. Turn any folder of code, SQL schemas, R scripts, shell scripts, docs, papers, images, or videos into a queryable knowledge graph."

---

## 一句話說明

Karpathy「LLM-readable codebase wiki」貼文 48 小時後上線的開源實作（作者 Safi Shamsi，Birmingham MSc，論文即 KG-RAG）：`/graphify .` 一指令把整個資料夾（程式碼＋SQL＋文件＋PDF＋圖片＋影音）建成本地知識圖譜，AI 助理之後用 `query / path / explain` 走圖回答而非 grep 原始檔——每個答案都是一條可審計的邊路徑，不是 vibe。無 embedding、無向量庫，純圖遍歷。支援 Claude Code / Codex / Copilot / OpenCode 等 13+ 助理平台。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 89,125 / 8,707 |
| 主要語言 | Python（tree-sitter 為核心） |
| 授權 | MIT |
| 建立時間 | 2026-04-03（Karpathy 貼文後 48hr） |
| 最後推送 | 2026-07-16（極度活躍，release 幾乎日更） |
| 最新 Release | v0.9.17（2026-07-16） |
| Open Issues / PRs | 232 / 296 |
| Topics | claude-code, graphrag, knowledge-graph, leiden, tree-sitter, rag |
| 首頁 | graphify.com（YC S26；PyPI 套件名 `graphifyy`） |
| Repomix | 733 檔、3.22M tokens（32 語系 README 佔大宗） |

---

## 核心功能

- **三 pass 管線，成本分層**：Pass 1 程式碼＝tree-sitter AST 純本地零 LLM（25 語言，SQL 特別處理 table/FK/JOIN）；Pass 2 影音＝faster-whisper 本地轉錄（以 god nodes 種入 prompt 聚焦領域詞）；Pass 3 文件/PDF/圖片＝Claude subagents 平行語意抽取（唯一花 token 的 pass；純程式碼 corpus 直接跳過）。
- **信心標籤制**：每條邊標 `EXTRACTED`（源碼明示，confidence 1.0）／`INFERRED`（離散評分表 0.55–0.95）／`AMBIGUOUS`（進報告人工複核）——把「AI 推的」和「讀到的」分開。
- **Leiden 社群偵測**：無 embedding 的模組聚類，語意相似邊直接參與圖結構。
- **三檔輸出**：`graph.html`（可點擊力導向圖）＋`GRAPH_REPORT.md`（重點概念/意外連結）＋`graph.json`。
- **查詢紀律**：query CLI 是 case-fold substring＋IDF 匹配（無 stemming/同義詞），skill 強制先做「限定詞彙擴展」——從圖的實際節點標籤擴 query，禁止發明 token。
- **豐富出口**：`--wiki`／`--obsidian`（全 wikilink Obsidian vault，一概念一筆記）／`--neo4j`／`--falkordb`／`--svg`／`--graphml`／`--mcp`。
- **13+ 平台 skill 打包**：claude/codex/copilot/opencode/droid/kiro/trae… 各有同構 references（query/update/hooks/add-watch/transcribe），一套 `graphify install` 註冊。
- **社群實測**：52 檔混合 corpus 每次查詢省 **71.5x** token（官方基準表誠實列出 6 檔小 corpus 只有 ~1x——省幅隨 corpus 規模放大）。

---

## 技術架構

```
graphify CLI（PyPI: graphifyy；uv/pipx 安裝）
 ├─ extractors/   25+ 語言 tree-sitter 抽取器（go/rust/sql/terraform/verilog…）
 │   └─ engine.py + resolution.py（跨檔 reference 解析 → INFERRED 邊）
 ├─ exporters/    graphdb（Neo4j/FalkorDB Cypher）、html（力導向圖）
 ├─ skills/       13+ 助理平台 × 8 份 reference（漸進式揭露）
 ├─ always_on/    claude-md/agents-md/gemini-md… 常駐注入模板
 └─ 輸出 graphify-out/：graph.json + graph.html + GRAPH_REPORT.md
```

| 層次 | 技術 |
|------|------|
| 結構抽取 | tree-sitter AST（確定性、本地、零 token） |
| 語意抽取 | 助理自身模型 subagents（僅文件類） |
| 轉錄 | faster-whisper（本地） |
| 聚類 | Leiden algorithm（無 embedding） |
| 查詢 | NetworkX BFS/DFS 遍歷＋IDF 節點匹配 |

---

## 社群健康度（2026-07-17 快照）

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | safishamsi 主導＋9 活躍 | 單核心＋健康外圍 |
| Release 頻率 | 7 月已 5 個（13/13/14/16 日） | 極頻繁 |
| 成長軌跡 | 4 月建 repo → 7 月 89K⭐ | 病毒級（Karpathy 效應） |
| 商業化 | YC S26 | 有公司背書，也有商業化轉向風險 |

## 社群口碑（來源：WebSearch，Exa 不可用）

**正面**：Karpathy 構想的「48 小時實作」敘事病毒式傳播；71.5x token 節省是討論核心；`--obsidian` 輸出全 wikilink vault 受知識管理圈歡迎；Rootly 把事故資料（incident/alert/team/service）建圖為公開案例。
**負面 / 已知問題**：①Windows PATH 陷阱（#413：pip 裝完 CLI 不在 PATH；官方建議 uv/pipx 隔離環境）②PowerShell 把 `/graphify` 開頭斜線當路徑——Windows 上要打 `graphify .` ③重構刪檔後舊節點殘留，要 `--force` 重建 ④`_fetch_tweet` 繞過自家 SSRF 防護的安全疑慮（issue 提報）⑤232 open issues 對三個月專案偏高。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | `--obsidian` 直接輸出全 wikilink vault——與現有 wiki 是潛在整合點也是重疊點；[[Github/repos/obsidian-wiki — 讓 AI Agent 維護 Obsidian 數位大腦的跨平台 Skill 框架\|obsidian-wiki]]（2.6K⭐ ⏳）是同一 Karpathy 構想的文件側實作，graphify 是程式碼側＋規模大 34 倍 |
| **Claude Code** | 與 claude-mem 的 smart_outline/smart_explore 部分重疊（程式碼結構理解），但「圖遍歷＋路徑引用＋信心標籤」是 claude-mem 沒有的；repo-intel Phase 2 本地路徑分析可受益 |
| **Automation** | 對 active/ 子專案（jobsmith 等）的架構理解、跨 session 重建 context 有直接價值；tree-sitter pass 零 token 成本 |
| **方法論共鳴** | 其 EXTRACTED/INFERRED/AMBIGUOUS＋離散信心評分（0.55–0.95）與本系統今日折入的四級證據標籤（Confirmed/Inferred/Weak/Needs verification）同構——獨立收斂＝此設計模式的高信度訊號 |

---

## 安裝建議

⏳ **觀望偏正向——值得單專案試跑後再定** — 理由：①與 claude-mem/gbrain 的分工要先實測釐清（obsidian-wiki 當初就卡在這，別重複開第三個記憶層）②Windows 陷阱一串（PATH、PS 斜線、環境錯配），本機正是 Windows ③YC 商業化轉向風險。但 MIT＋本地優先＋tree-sitter pass 零 token＋活躍度極高，試錯成本低。

復查觸發：
- **升級條件**（→ ✅ 裝）：對一個中型子專案（如 jobsmith）用 uv tool install 試建圖，實測 query 引用路徑可審、token 省幅明顯，且與 claude-mem 現有工具分工清楚 → 裝入工作流＋repo-intel 本地分析
- **放棄條件**（→ ❌ 不裝）：試跑撞 Windows 相容牆修不動；或試跑後發現 claude-mem smart_explore 已覆蓋實際需求；或專案轉閉源/重要功能鎖付費牆

---

## 相關連結

- [[Github/repos/obsidian-wiki — 讓 AI Agent 維護 Obsidian 數位大腦的跨平台 Skill 框架|obsidian-wiki]] — 同一 Karpathy 構想的文件側實作
- [[Github/repos/graphiti — 為 AI Agent 打造的即時時序知識圖譜框架|graphiti]] — 知識圖譜家族：graphiti 管「隨時間變化的記憶」，graphify 管「當下程式碼結構」
- [[Github/repos/codebase-memory-mcp — 高效能程式碼知識圖譜 MCP 伺服器|codebase-memory-mcp]] — 同為程式碼知識圖譜，MCP 形態
- [[Github/repos/thedotmack-claude-mem — 85K⭐ 跨 Session 持久記憶|claude-mem]] — 分工待釐清的既有記憶層
