---
source: "https://github.com/anthropics/claude-plugins-official"
author: "anthropics (Anthropic)"
stars: "31K+"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "claude-code/plugins"
  - "anthropic-official"
  - "claude-md"
---

# anthropics/claude-plugins-official — Anthropic 官方 Claude Code Plugin 目錄

> **anthropics/claude-plugins-official** | ⭐ 31K+ | 🍴 3.4K | 📝 Apache 2.0
> "Official, Anthropic-managed directory of high quality Claude Code Plugins."

---

## 一句話說明

Anthropic 官方維護的 Claude Code Plugin 精選目錄，每個 plugin 都經過質量審核。本報告聚焦在 `claude-md-management` plugin，它提供 CLAUDE.md 品質稽核與 session 學習捕捉兩大工具，幫助保持 project memory 的準確性與精簡性。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 31,336 |
| Forks | 3,426 |
| 主要語言 | Python |
| 授權 | Apache 2.0 |
| 建立時間 | 2025-11-20 |
| 最後推送 | 2026-06-30（今天更新）|
| Open Issues | 763 |
| Open PRs | 33 |
| Topics | claude-code, mcp, skills |
| 首頁 | https://code.claude.com/docs/en/plugins |
| 是否 Archived | No |

---

## claude-md-management Plugin 詳細分析

### Plugin 結構

```
plugins/claude-md-management/
├── .claude-plugin/plugin.json     ← plugin 定義
├── commands/
│   └── revise-claude-md.md        ← /revise-claude-md 指令
├── skills/
│   └── claude-md-improver/
│       ├── SKILL.md               ← 主 skill
│       └── references/
│           ├── quality-criteria.md  ← 品質評分標準
│           ├── templates.md         ← CLAUDE.md 模板
│           └── update-guidelines.md ← 更新準則
└── README.md
```

### 兩個互補工具

| | `claude-md-improver`（Skill）| `/revise-claude-md`（Command）|
|---|---|---|
| **目的** | CLAUDE.md 與 codebase 對齊 | 捕捉本次 session 學習 |
| **觸發時機** | 定期維護 | Session 結束前 |
| **使用場景** | 全面審計、更新過時內容 | 補充 session 中發現的新 context |

---

### Skill：claude-md-improver

四階段工作流：

**Phase 1：Discovery**
掃描所有 CLAUDE.md 變體（`./CLAUDE.md`、`.claude.local.md`、`~/.claude/CLAUDE.md`、monorepo 子目錄）

**Phase 2：Quality Assessment**
六維度評分（滿分 100）：

| 維度 | 權重 | 評分指標 |
|------|------|---------|
| Commands/Workflows | 20 pts | build/test/lint/deploy 指令是否齊全 |
| Architecture Clarity | 20 pts | 目錄結構/模組關係/entry point 是否清晰 |
| Non-Obvious Patterns | 15 pts | Gotchas/workarounds/「為什麼這樣做」 |
| Conciseness | 15 pts | 無填充/不重複 code comments |
| Currency | 15 pts | 指令/路徑/技術棧是否反映現狀 |
| Actionability | 15 pts | 指令可 copy-paste 執行，步驟具體 |

等級：A(90-100) / B(70-89) / C(50-69) / D(30-49) / F(0-29)

**Phase 3：Quality Report**（必須先輸出報告，再做任何修改）

**Phase 4：Targeted Updates**（用戶確認後才執行編輯）

---

### Command：/revise-claude-md

Session 結束後執行，捕捉本次 session 學到的 context：

1. **反思**：哪些指令/模式/gotcha 是這次才發現的？
2. **定位** CLAUDE.md 檔案，決定改動共享（git tracked）或個人（.claude.local.md）版本
3. **草稿**：每個新增一行，格式：`\`<command或pattern>\` - <簡短說明>`
4. **展示 diff** 取得用戶確認
5. **Apply**（只修改獲批准的檔案）

**避免寫入**：冗長解釋、顯而易見的資訊、單次 bug fix

---

### 參考資源

- **templates.md**：提供 Commands / Architecture / Key Files / Code Style / Environment 等段落的標準格式
- **quality-criteria.md**：完整評分細則（每維度 0-20/15 分詳細說明）
- **update-guidelines.md**：什麼值得寫、什麼不寫、格式規範

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **CLAUDE.md 系統** | 直接適用於 `d:\Claude\CLAUDE.md` 和各子專案的 CLAUDE.md 稽核 |
| **Claude Code Skills** | 與 `continuous-learning-v2` / `caveman-compress` 互補：前者記錄偏好，此 plugin 更新 project memory |
| **Obsidian Vault** | `/revise-claude-md` 的邏輯與 `/last-word` skill 相似，可互相驗證 session 學習 |
| **知識管理** | 補全 R15（流程反省）— 現有機制是主動反省，此 plugin 提供 CLAUDE.md 品質分數這個量化指標 |

---

## 安裝建議

✅ **建議安裝** — Anthropic 官方維護，直接解決 CLAUDE.md 品質劣化問題。`claude-md-improver` 的 6 維度評分框架本身就很有參考價值，可以用來評估 `d:\Claude\CLAUDE.md` 的品質。`/revise-claude-md` 與 `/last-word` 形成互補（one captures CLAUDE.md additions, the other captures process reflections + handoff）。

安裝方式：
```bash
claude plugin install claude-md-management@claude-plugins-official
```
（已在 `claude-plugins-official` marketplace，直接 install）

---

## 相關連結

- [[Github/repos/anthropicsknowledge-work-plugins|knowledge-work-plugins]] — 同為 Anthropic 官方 plugins 目錄（舊版本/已知）
- [[Projects/project_claude_config|CLAUDE.md 架構]] — 現有 CLAUDE.md 規則體系（R13-R17）
