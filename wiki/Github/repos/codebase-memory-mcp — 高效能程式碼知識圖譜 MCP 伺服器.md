---
source: "https://github.com/DeusData/codebase-memory-mcp"
author: "DeusData"
stars: "19.5K"
clipped: 2026-06-29
tags:
  - "github/repo"
  - "mcp-server"
  - "code-intelligence"
  - "knowledge-graph"
  - "tree-sitter"
  - "claude-code"
---

## codebase-memory-mcp — 高效能程式碼知識圖譜 MCP 伺服器

> **DeusData/codebase-memory-mcp** | ⭐ 19.5K | 🍴 1,414 | 📝 MIT
> "High-performance code intelligence MCP server. Indexes codebases into a persistent knowledge graph — average repo in milliseconds. 158 languages, sub-ms queries, 99% fewer tokens. Single static binary, zero dependencies."

---

### 一句話說明

純 C 編寫的高效能程式碼智慧分析引擎，透過 tree-sitter AST 解析 158 種語言，將整個 codebase 建構成持久性 SQLite 知識圖譜，再透過 14 個 MCP 工具提供亞毫秒級結構查詢，相比逐檔搜尋可減少 99% token 消耗。目標使用者是所有 AI coding agent（Claude Code、Codex CLI、Gemini CLI 等 11 種 agent）的開發者。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 19,477 |
| Forks | 1,414 |
| 主要語言 | C（32MB），附 C++/TypeScript/Shell/Python |
| 授權 | MIT |
| 建立時間 | 2026-02-24 |
| 最後推送 | 2026-06-28 |
| Open Issues | 115 |
| Open PRs | 52 |
| 最新 Release | v0.8.1（2026-06-12） |
| Topics | claude-code, mcp, knowledge-graph, tree-sitter, sqlite, cypher, ast, codex, cursor, windsurf, gemini-cli 等 20 個 |
| 首頁 | https://deusdata.github.io/codebase-memory-mcp/ |
| arXiv 論文 | arXiv:2603.27277 |
| 是否 Archived | 否 |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 1,764 |
| 壓縮模式 | ✅（--compress，原始碼 170MB） |
| XML 輸出 | ~16.6MB |

**註：** 大量檔案來自 `internal/cbm/vendored/grammars/`（158 種語言的 tree-sitter C grammar 原始碼），核心邏輯在 `src/` 約 60 個 C 原始碼檔。

---

### 核心功能

- **極速索引**：Linux Kernel（28M LOC、75K 檔）3 分鐘完成。RAM-first pipeline：LZ4 壓縮 + in-memory SQLite + 融合 Aho-Corasick 模式匹配
- **158 語言 tree-sitter 解析**：全部 vendored 編譯進二進位檔，無需安裝任何依賴
- **Hybrid LSP 語意型別解析**：Python / TypeScript / JS / JSX / TSX / PHP / C# / Go / C / C++ / Java / Kotlin / Rust — 輕量 C 實作，結構相容 pyright / tsserver / gopls / Roslyn / rust-analyzer
- **14 個 MCP 工具**：index_repository / search_graph / trace_path / detect_changes / query_graph / get_architecture / search_code / get_code_snippet / manage_adr / semantic_query / get_graph_schema / list_projects / delete_project / index_status / ingest_traces
- **Cypher 查詢**：完整的 openCypher 讀取子集（MATCH/WHERE/WITH/RETURN/ORDER BY/SKIP/LIMIT/UNION/CASE），C 實作的 lexer → parser → planner → executor
- **語意搜尋**：bundled Nomic nomic-embed-code 向量（40K tokens, 768d int8），11 信號融合評分，無需 API key / Ollama / Docker
- **跨服務連結**：HTTP route ↔ call-site 匹配、gRPC / GraphQL / tRPC / Socket.IO / EventEmitter 偵測
- **跨 repo 智慧**：CROSS_* 邊將多個 repo 連結成統一知識圖譜
- **3D 圖形視覺化**：內建 React Three.js UI（localhost:9749），力導向圖 + 社群偵測
- **團隊共享 Graph Artifact**：`.codebase-memory/graph.db.zst` 壓縮快照，commit 到 repo 讓隊友跳過重建
- **ADR 管理**：Architecture Decision Records CRUD，跨 session 持久化
- **Dead code 偵測**：零 caller 函式掃描（排除 entry point）
- **基礎設施索引**：Dockerfile / K8s manifest / Kustomize overlay 作為 graph node

---

### 技術架構

```
┌──────────────────────────────────────────────┐
│                  main.c                       │
│         MCP stdio / CLI / install             │
├──────────┬──────────┬────────────┬────────────┤
│  mcp/    │  cli/    │  cypher/   │   ui/      │
│ 14 tools │ install  │ Cypher→SQL │ HTTP+3D    │
│ JSON-RPC │ 11 agents│ lex/parse  │ React/R3F  │
├──────────┴──────────┴────────────┴────────────┤
│              pipeline/                         │
│ multi-pass: structure→defs→calls→HTTP→config   │
│ parallel workers + incremental indexing        │
├───────────────────────────────────────────────┤
│  store/        │  discover/     │  watcher/   │
│  SQLite graph  │  .gitignore    │  auto-sync  │
│  Louvain       │  .cbmignore    │  git poll   │
├───────────────────────────────────────────────┤
│              foundation/                       │
│  arena · hash_table · threads · compat_fs     │
│  logging · memory · platform · slab_alloc     │
├───────────────────────────────────────────────┤
│         internal/cbm/ (vendored)               │
│  158 tree-sitter grammars (C)                  │
│  AST extraction engine (defs/calls/imports)    │
│  Hybrid LSP (9 languages)                      │
├───────────────────────────────────────────────┤
│         vendored/                              │
│  mimalloc · sqlite3 · lz4 · zstd · yyjson     │
│  tre(regex) · xxhash · nomic(embeddings)       │
└───────────────────────────────────────────────┘
```

| 層次 | 技術 |
|------|------|
| 核心語言 | Pure C（零外部依賴） |
| 解析引擎 | tree-sitter AST + Hybrid LSP |
| 儲存層 | SQLite（WAL mode）+ LZ4/zstd 壓縮 |
| 通訊層 | JSON-RPC 2.0（MCP stdio） |
| 記憶體管理 | mimalloc + arena allocator + slab allocator |
| 前端 UI | React + Three.js + R3F（graph-ui/） |
| 分發 | npm / PyPI / Homebrew / Scoop / Winget / Chocolatey / AUR / go install |

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | DeusData（核心）、shanemccarron-maker、dependabot、86208620、mvanhorn 等 | 核心開發者 1 人主導 |
| 近 4 週 commit | 264（92+13+103+56） | 🔥 非常活躍 |
| Release 歷程 | v0.6.0→0.6.1→0.7.0→0.8.0→0.8.1 | 穩定迭代，每版加語言 |
| Issue open | 115 | 活躍社群回報 |
| Open PRs | 52 | 積極接受貢獻 |
| 5,604 tests | passing | 測試覆蓋完整 |

---

### 社群口碑

此專案星數 19.5K（>1K），但 last30days 工具不可用，無法取得近期社群討論。

根據 GitHub 數據推斷：
- **正面**：4 個月內從 0 到 19.5K stars 的爆發式增長；支援 11 種 AI coding agent；有 arXiv 論文背書（學術可信度）；安全措施完善（SLSA 3 + VirusTotal + Sigstore）
- **潛在顧慮**：核心開發者僅 1 人（bus factor = 1）；115 open issues 待處理；170MB 磁碟佔用（vendored grammars）

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低直接關聯。但索引結果可作為程式碼筆記的結構化來源，搭配 `/query` 提供程式碼架構知識 |
| **Claude Code** | ⭐ **高度相關**。直接作為 MCP server 整合，提供 14 個工具替代 Grep/Glob 搜尋，大幅減少 token 消耗。與現有的 codegraph MCP 功能有重疊但定位不同：codegraph 是檔案級索引，codebase-memory-mcp 是函式/類別級知識圖譜 + Cypher 查詢 + 語意搜尋 |
| **Automation** | 中度相關。CLI 模式可整合進腳本（`codebase-memory-mcp cli search_graph ...`）；Team-shared artifact 適合 CI/CD 加速 |

---

### 安裝建議

⏳ **觀望** — 理由：

1. **與 codegraph 功能重疊**：已安裝的 codegraph MCP 已提供 symbol 搜尋、caller/callee 追蹤、impact 分析等核心功能，且整合更深（已寫入 CLAUDE.md system instructions）
2. **價值增量明確但非急需**：Cypher 查詢、語意向量搜尋、Hybrid LSP、3D 視覺化是 codegraph 沒有的差異化功能
3. **資源考量**：170MB 二進位 + SQLite 資料庫，會增加磁碟佔用
4. **建議時機**：當需要跨 repo 程式碼分析、或需要 Cypher 複雜查詢時再安裝；或等 codegraph 遇到瓶頸時作為升級方案

---

### 延伸操作

- 想要完整架構圖譜？→ 執行 `/understand`
- 想搜尋特定 symbol？→ 用 `/smart-explore`
- 想比較類似專案？→ 再跑一次 `/repo-intel` 分析另一個 repo（如 `sourcegraph/scip`、`agentic-labs/lsproxy`）

---

### 相關連結

- [[Github/repos/Headroom — AI Agent Context 壓縮層|Headroom]] — 同為 AI Agent 效率工具
- [[Github/repos/ruvnetruflo 🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms, coordinate autonomous workflows, and build conversational AI systems. Features    enterprise-grade architecture, self-learning swarm intel|Ruflo]] — 多 Agent MCP 平台
- [[Github/repos/yamadashyrepomix 📦 Repomix is a powerful tool that packs your entire repository into a single, AI-friendly file. Perfect for when you need to feed your codebase to Large Language Models (LLMs) or other AI tools like Claude, ChatGPT, DeepSeek, P|Repomix]] — codebase 打包分析（互補工具）
