---
source: "https://github.com/filiksyos/gitreverse"
author: "filiksyos"
stars: "1.1K"
clipped: 2026-06-25
tags:
  - "github/repo"
  - "prompt-engineering"
  - "reverse-engineering"
  - "vibe-coding"
  - "next-js"
---

## gitreverse — 把 GitHub Repo 逆向工程成一句 Prompt

> **filiksyos/gitreverse** | ⭐ 1.1K | 🍴 209 | 📝 無授權
> "Reverse engineer any repo into it's original prompt"

---

### 一句話說明

GitReverse 是一個 Web 應用，貼上任何公開 GitHub repo 的 URL，就會用 LLM 把整個專案逆向成一句自然語言 prompt——那種你丟給 Cursor/Claude Code/Codex 去 vibe code 出整個專案的 prompt。抓取 repo metadata、根目錄檔案樹和 README，然後用 AI 生成 120-200 字的描述。

線上版：https://gitreverse.com

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,117 |
| Forks | 209 |
| 主要語言 | TypeScript（294K） |
| 授權 | ⚠️ 無授權 |
| 建立時間 | 2026-03-31 |
| 最後推送 | 2026-06-22 |
| Topics | prompt-engineering, reverse-engineering, vibe-coding |
| 首頁 | https://gitreverse.com |

---

### 核心功能

- **Quick Reverse**：貼上 GitHub URL → 自動抓 metadata + README + file tree → LLM 生成一句 vibe coding prompt
- **Deep Reverse**：更深度的分析（需 custom reverse service backend）
- **Focus Reverse**：針對特定面向生成 prompt
- **Library**：瀏覽已快取的 prompt（需 Supabase）
- **History**：個人 prompt 歷史記錄
- **Shareable Links**：`/owner/repo` 格式的可分享連結
- **多 LLM 支援**：Grok / OpenRouter / Azure OpenAI / Google AI Studio

---

### 技術架構

| 層次 | 技術 |
|------|------|
| Frontend | Next.js 16 + React 19 + Tailwind CSS 4 |
| LLM | Grok / Azure OpenAI / OpenRouter / Google AI Studio |
| Auth | Supabase Auth |
| DB | Supabase (PostgreSQL) |
| Payments | Stripe |
| Deployment | Vercel |

---

### System Prompt 設計（值得參考）

核心 prompt 定義在 `lib/system-prompt.ts`：
- 角色：expert at inferring how people actually prompt modern coding agents
- 輸入：repo metadata + root file tree (depth 1) + README
- 輸出：120-200 字、plain language、outcome focused、conversational tone
- 禁止：framework jargon、agent system instructions、inventing unsupported features

---

### 安裝建議

⏳ **觀望** — 線上版 https://gitreverse.com 可直接使用，無需自建。自建需 LLM API key + Supabase + Stripe。概念有趣但使用場景有限。

---

### 相關連結

- [[repo-intel Skill]] — 我們自己的 repo 分析工具，做更全面的結構分析
- [[AI Prompts 收藏庫（Wiki）]] — prompt engineering 相關收藏
