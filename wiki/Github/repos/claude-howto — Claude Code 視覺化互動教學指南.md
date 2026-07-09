---
source: "https://github.com/luongnv89/claude-howto"
author: "luongnv89"
stars: "39.5K"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "claude-code"
  - "learning-resource"
---

# claude-howto — Claude Code 視覺化互動教學指南

> **luongnv89/claude-howto** | ⭐ 39,517 | 🍴 4,771 | 📝 MIT
> "A visual, example-driven guide to Claude Code — from basic concepts to advanced agents, with copy-paste templates that bring immediate value."

## 一句話說明

一套視覺化、範例驅動的 Claude Code 學習網站+repo，用 10 個漸進模組（slash commands → memory → skills → hooks → MCP → subagents → advanced features → plugins）教開發者從入門到進階，附帶大量可直接複製貼上的模板與 Mermaid 架構圖，還內建 `/self-assessment`、`/lesson-quiz` 兩個 Skill 做程度診斷。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 39,517 |
| Forks | 4,771 |
| 主要語言 | Python（含 Shell/HTML/Jinja/JS/CSS，文件站生成用） |
| 授權 | MIT |
| 建立時間 | 2025-11-07 |
| 最後推送 | 2026-07-01 |
| Open Issues | 10 |
| Open PRs | 15 |
| 最新 Release | v2.1.160（2026-06-02，版號跟隨 Claude Code 本體） |
| Topics | claude-code, guide, tutorial |
| 首頁 | http://luongnv.com/claude-howto/ |
| 是否 Archived | 否 |

Forks/Stars 比異常高（4,771/39,517 ≈ 12%）——多數是開發者 fork 回去客製化自己的模板，而非純粹加星圍觀，反映內容有實際「拿來就用」價值。

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 647 |
| 總 Tokens | 1,338,530（未壓縮，含 5 種語言鏡像：en/vi/zh/uk/ja） |
| 壓縮模式 | 否（13.9MB 對 repomix 而言不需要） |

Token 量大主因是內容用 5 種語言各自完整複製一份（`vi/` `zh/` `uk/` `ja/` 目錄鏡像根目錄結構），實際核心知識量約為總量的 1/5。

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| ja/claude_concepts_guide.md | 24,738 | 1.8% |
| uk/claude_concepts_guide.md | 24,194 | 1.8% |
| ja/09-advanced-features/README.md | 22,588 | 1.7% |
| claude_concepts_guide.md | 21,363 | 1.6% |
| 09-advanced-features/README.md | 20,645 | 1.5% |

## 核心功能

- **10 個教學模組**：01-slash-commands、02-memory、03-skills、04-subagents、05-mcp、06-hooks、07-plugins、08-checkpoints、09-advanced-features、10-cli，每模組含 README + 可直接複製的模板檔
- **`.claude/skills/self-assessment`**：程度自評 Skill，產出個人化學習路徑
- **`.claude/skills/lesson-quiz`**：模組後測驗 Skill，內建 `references/question-bank.md` 題庫
- **可複製模板庫**：subagent 定義（code-reviewer/debugger/test-engineer 等 8 個）、hooks 腳本（security-scan.sh、context-tracker.py、pre-commit.sh 等）、MCP config 範例（filesystem/github/database/kubernetes）、完整 plugin bundle（07-plugins/devops-automation，含 agents+commands+hooks+mcp 全套）
- **五語言網站**：en/vi/zh/uk/ja 全站鏡像，非機翻拼裝而是各自完整的靜態站
- **CATALOG.html / LEARNING-ROADMAP.html**：功能目錄與 11-13 小時學習路線圖

## 技術架構

```
claude-howto/
├── 01-slash-commands/ … 10-cli/    ← 10 教學模組（英文，根目錄）
├── vi|zh|uk|ja/                    ← 同結構語言鏡像
├── .claude/skills/
│   ├── self-assessment/            ← 程度診斷 Skill
│   └── lesson-quiz/                ← 測驗 Skill + 題庫
├── 07-plugins/devops-automation/   ← 完整 plugin 範例（agents+commands+hooks+mcp）
└── (Python+Jinja) 靜態網站產生器 → luongnv.com/claude-howto/
```

| 層次 | 技術 |
|------|------|
| 內容/模板 | Markdown（slash commands、CLAUDE.md 範本、subagent 定義） |
| Skill 邏輯 | Claude Code Skill（SKILL.md + Python 分析腳本，如 analyze-complexity.py） |
| 網站生成 | Python + Jinja2 → 靜態 HTML |
| Hooks 範例 | Shell + Python（security-scan.sh、context-tracker-tiktoken.py） |
| CI | GitHub Actions（docs-check、pages、release、test） |

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | luongnv89, edocltd, toanalien, lzw-git-all, wjhrdy, xiaolai, JiayuuWang, iiitutu, jeffreyyjp, Foxsunshine | 作者主導，外部貢獻零星 |
| 近 4 週 commit | 3 / 1 / 2 / 0 | 從高頻迭代轉入穩定維護期 |
| Release 頻率 | 跟隨 Claude Code 版號同步發版（v2.1.x 系列） | 穩定，綁定上游節奏 |
| Issue open/close | 10 open / 15 PR open | 健康，非堆積如山 |

## 社群口碑

**熱門討論：**
- Reddit r/ClaudeCode「Advice on global CLAUDE.md」串：使用者將此站的 `personal-CLAUDE.md` 範本與 DataCamp、Medium 教學並列引用，作為寫 CLAUDE.md 的參考來源之一
- X（微博式科技帳號 GitTrend0x）：單日 GitHub trending 拆解，稱其為「Claude 教你玩 Claude」，單日暴增 1,165 星
- X（LufzzLiz，AI 架構師帳號）：與 claude-code-best-practice 並列推薦為「值得收藏的兩個 Claude 教程項目」，該推文 371 讚 / 4.9萬瀏覽

**正面回饋：** 結構化學習路徑 + 可複製模板被反覆稱讚為「拿來即用」；自評/測驗 Skill 是差異化亮點，鮮少教學型 repo 附帶互動診斷工具。

**負面回饋 / 已知問題：** 未見到批評聲量；主要疑慮來自其快速漲星速度（單日破千星），部分觀察帳號隱含「注意這是否為刷星」的謹慎語氣，但無具體證據。

**YouTube 教學生態：** 搜尋未命中專門講解本 repo 的教學影片——結果全是泛用「Claude Code tutorial」影片（Tech With Tim 135萬觀看等），代表教學生態尚未圍繞這個特定 repo 形成，內容本身即是「教學」而非需要被教學。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 內容價值高於程式碼價值——`personal-CLAUDE.md`/`project-CLAUDE.md` 模板可與現有 `institution/` 制度文件互相印證取捨，但非新知識（本環境制度文件已比它更細） |
| **Claude Code** | `self-assessment`/`lesson-quiz` 兩個 Skill 設計思路可借鏡（互動診斷型 Skill 罕見），07-plugins/devops-automation 是完整 plugin 打包範例可參考結構 |
| **Automation** | 06-hooks/ 的 hook 腳本（security-scan.sh、context-tracker.py）與本環境已有的 hooks 生態（verify_gate、config-drift-check）功能重疊，非新增量 |

## 安裝建議

⏳ 觀望 — 內容品質高但屬於「教學閱讀材料」而非「安裝即生效」的工具。建議：不整包安裝，需要時單獨參考 `self-assessment`/`lesson-quiz` 兩個 Skill 的設計（互動測驗型 Skill 在本環境尚無同類），或在寫 CLAUDE.md/subagent 模板時當作交叉比對的外部參考點。

## 相關連結

- [[Github/repos/pilotfish — Claude Code 多模型委派配置包|pilotfish]] — 同為 Claude Code 配置/教學型 repo，可比較設計取向
- [[Github/_index|Github Repo 分析總索引]]
