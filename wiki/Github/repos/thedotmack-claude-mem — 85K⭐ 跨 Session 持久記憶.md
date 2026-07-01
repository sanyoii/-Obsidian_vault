---
source: "https://github.com/thedotmack/claude-mem"
author: "thedotmack (Alex Newman)"
stars: "85K+"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "claude-code"
  - "memory"
  - "plugin"
---

# thedotmack/claude-mem — 跨 Session 持久記憶

> **thedotmack/claude-mem** | ⭐ 85K+ | 📝 Apache-2.0  
> "Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions."

---

## 一句話說明

Claude Code Plugin，自動擷取每次 session 的 tool usage 和操作行為，以 AI 壓縮後存入 SQLite + ChromaDB，下次 session 開始時自動注入相關 context。不需手動告訴它要記什麼，完全被動。

---

## 安裝狀態

| 項目 | 狀態 |
|------|------|
| Plugin | `claude-mem@thedotmack` ✅ |
| Marketplace | `https://github.com/thedotmack/claude-mem.git` |
| Worker | PID 在運作，自 **2026-05-03** 開始收集 |
| Database | `~/.claude-mem/claude-mem.db` + `~/.claude-mem/chroma/` |
| Logs | `~/.claude-mem/logs/claude-mem-YYYY-MM-DD.log` |

**2026-06-30 修復**：marketplace 先前未在 `extraKnownMarketplaces` 登記，`enabled: true` 但 plugin 未實際下載。重新 `claude plugin marketplace add` 後正常。

---

## 技術架構

```
claude-mem/
├── plugin/
│   └── scripts/
│       ├── worker-service.cjs   ← background worker
│       ├── bun-runner.js        ← Bun 執行器
│       └── smart-install.js     ← Setup hook
├── src/                          ← TypeScript 主體
└── docker/                       ← ChromaDB 容器
```

**Hooks（自動注入到 `~/.claude/settings.json`）：**
- `Setup` → `smart-install.js`（啟動/更新 worker）
- `SessionStart` → `worker-service.cjs start` + `hook context`
- `UserPromptSubmit` → `session-init`
- `PreToolUse` (Read) → `file-context`
- `PostToolUse` (*) → `observation`（記錄每次工具使用）
- `Stop` → `summarize`（session 結束壓縮）

**依賴：** Bun（自動裝）+ Node.js + ChromaDB（SQLite embedded）

---

## 與現有記憶系統的關係

| 系統 | 類型 | 用途 |
|------|------|------|
| `claude-mem` | 自動隱性 | 每次 tool 呼叫的行為 context |
| `memory/` 文件系統 | 手動顯性 | 規則/偏好/跨專案決策 |
| `continuous-learning-v2` | 自動 instincts | 行為模式 → 可升級成 skill |

三者互補，不衝突。

---

## 相關連結

- [[Github/repos/eugeniughelbur-obsidian-second-brain — Vault-first 研究與 Obsidian 架構筆記系統|obsidian-second-brain]] — 另一個 session 知識積累系統
