---
tags:
  - "tool"
  - "skill"
  - "claude-code"
  - "repo-analysis"
created: 2026-06-22
---
# repo-intel — 全方位 Repo 情報分析 Skill

> Claude Code Skill，整合五個分析引擎，對任何 GitHub repo 產出完整繁體中文情報報告。

---

## 觸發方式

- `/repo-intel`
- 貼 GitHub URL（如 `https://github.com/owner/repo`）
- 說「分析這個 repo」「幫我看這個專案」「repo 情報」
- `owner/repo` 格式 + 分析語境

---

## 五個分析引擎

| # | 引擎 | 資料來源 | 觸發條件 |
|---|------|---------|---------|
| 1 | **gh API** | GitHub REST API | 預設啟動 |
| 2 | **Repomix** | 原始碼打包 → XML | 預設啟動 |
| 3 | **defuddle** | 官方文件站 → Markdown | `homepageUrl` 存在 |
| 4 | **last30days** | Reddit/HN/GitHub | stars > 1,000 |
| 5 | **smart-explore** | Tree-sitter AST | 僅本地路徑 |

引擎 3-5 是智慧啟停 — 條件不滿足自動跳過。

---

## 報告結構

1. 一句話說明
2. 專案概覽（stars/forks/language/license/issues/PRs/release）
3. Repomix 深度分析（檔案數/tokens/top 5 大檔）
4. 核心功能
5. 技術架構（ASCII 圖 + 技術棧表）
6. 社群健康度（貢獻者/commit/release 頻率）
7. 社群口碑（last30days 近 30 天討論）
8. 與現有系統相關性（Obsidian/Claude Code/Automation）
9. 安裝建議（✅/⏳/❌）
10. 延伸操作提示

---

## Wiki 輸出

說「記錄到 wiki」→ 自動存至 `wiki/Github/repos/{repo} — {描述}.md`

Frontmatter 格式：
```yaml
source: "https://github.com/owner/repo"
author: "owner (display name)"
stars: "51K+"
clipped: 2026-06-22
tags:
  - "github/repo"
  - "domain-tags..."
```

---

## 安裝位置

- Active: `C:\Users\sanyo\.claude\skills\repo-intel\SKILL.md`
- Backup: `d:\Claude\.claude\skills\repo-intel\SKILL.md`

---

## 相關

- 取代/整合自：[[repomix-explorer]]（程式碼分析）+ `/github:repo-analyze`（專案健康度）
- 使用的子工具：[[defuddle]]、[[last30days]]、[[smart-explore]]
