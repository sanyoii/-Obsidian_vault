---
source: "https://github.com/eugeniughelbur/obsidian-second-brain"
author: "eugeniughelbur"
stars: "1.9K+"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "obsidian"
  - "research"
  - "claude-code"
---

# eugeniughelbur/obsidian-second-brain — Vault-first 研究與架構筆記系統

> **eugeniughelbur/obsidian-second-brain** | ⭐ 1.9K+ | 📝 MIT  
> "AI-powered research and knowledge management for Obsidian vaults"

---

## 一句話說明

把 Claude Code 的研究能力和 Obsidian Vault 深度整合的 Python 工具套件：/research 做即時網路研究、/research-deep 做 vault-first 深度研究並傳播更新到相關筆記、/obsidian-architect 把程式碼 codebase 轉為維護式架構筆記。

---

## 安裝狀態

| 項目 | 狀態 |
|------|------|
| 安裝路徑 | `d:\Claude\obsidian-second-brain\` |
| Python 環境 | `uv sync` 完成（2026-06-30）|
| Config | `~/.config/obsidian-second-brain/.env` |
| OBSIDIAN_VAULT_PATH | `d:\Claude\obsidian` |
| 測試結果 | `uv run -m scripts.research.research "test"` → 40 results ✅ |

---

## 三個核心 Commands

### `/research [topic]`
網路研究並生成 dossier（Summary / Key Facts / Timeline / Key Players / Sources）：
- **Free 模式**（預設）：HN / arXiv / Wikipedia / Reddit / OpenAlex / CrossRef
- **Paid 模式**（設 `PERPLEXITY_API_KEY`）：Perplexity Sonar，自動儲存到 `Research/Web/`
- 輸出：結構化 dossier + 儲存為 AI-first note

### `/research-deep [topic]`
Vault-first 深度研究，4 階段流程：
1. Vault 掃描（baseline）
2. Gap 分析（Perplexity 識別缺失/過時）
3. Gap 填補（Perplexity + Grok X discourse）
4. 合成 delta → 傳播更新到相關筆記（People/Projects/Ideas 等）

**Free 模式**：Claude 自己做合成 + vault baseline 比對

### `/obsidian-architect [path]`
掃描 codebase → 寫入維護式架構筆記進 vault：
- 目的地：`wiki/projects/<name>/Architecture/`
- Sentinel 標記保護手動編輯的段落
- Re-run 可安全刷新

---

## 技術架構

```
obsidian-second-brain/
├── scripts/
│   ├── research/
│   │   ├── research.py       ← /research 主體
│   │   ├── research_deep.py  ← /research-deep 主體
│   │   └── x_pulse.py        ← X/Twitter 研究
│   └── eval/                 ← 評估工具
├── references/
│   └── ai-first-rules.md    ← 所有 note 格式規範
├── hooks/                    ← Claude Code hooks
├── adapters/                 ← 多平台適配
└── pyproject.toml            ← uv 管理
```

**Config 路徑：** `~/.config/obsidian-second-brain/.env`

---

## AI-First Rule

所有生成的 note 必須遵守 `references/ai-first-rules.md`：
- `## For future Claude` preamble
- frontmatter：`type`, `date`, `tags`, `ai-first: true`
- 每個外部聲明標記 recency marker + source domain
- 強制 `[[wikilinks]]` 連結每個人名/專案/概念
- sources verbatim 保留

---

## 相關連結

- [[wiki/Tools/obsidian-second-brain|Wiki/Tools 使用指南]]
- [[Github/repos/ECC — Claude Code harness-native 操作系統|ECC]] — 類似的 session 學習系統
