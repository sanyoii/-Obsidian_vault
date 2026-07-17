---
tags: [investment, claude-code, codex, multi-agent, skills, china-stocks, value-investing]
date: 2026-06-28
status: evaluated
verdict: 高品質投資研究 Skill 合集，與 Claude Code skills 系統深度整合，有參考與借用價值
---

# hugohe3/ppt-master — AI Berkshire 投資研究框架

> 來源：https://github.com/hugohe3/ppt-master
> 授權：MIT (2026 xbtlin)
> 規模：2202 個文件 / ~32MB repomix 輸出

## 這是什麼？

儘管 repo 名稱是 `ppt-master`，實際內容是一套名為 **AI Berkshire** 的完整投資研究 Skill 合集。兼容 Claude Code 與 Codex，將巴菲特、芒格、段永平、李錄四位價值投資大師的方法論系統化，透過多 Agent 並行實現專業級投資研究。

**一句話定義**：「一個人 + Claude Code / Codex = 一個投研團隊」的多 Agent 投資研究自動化框架。

## 核心功能

- **18 個 Skill**，覆蓋深度研究、財報分析、行業篩選、持仓管理等完整投研流程
- **四大師視角對抗**：同一公司由 4 個 Agent 並行分析（段永平/巴菲特/芒格/李錄），強制產出真實矛盾與張力
- **鏡子測試機制**：強制輸出通過/不通過/灰色地帶 + 具體價格區間，不打太極
- **反偏見多層機制**：信息豐富度評級（A/B/C）、芒格式逆向檢驗、8條紅線快速否決、反共識檢查
- **精確金融計算**：Python `decimal.Decimal` 精確十進制，關鍵數據至少 2 個來源交叉驗證
- **真實投研報告**：包含小米、五糧液、平安集團、永新股份、生數科技等數十家公司深度研究

## 技術棧

| 層次 | 技術 |
|------|------|
| **Skill 層** | 18 個 Claude Code + Codex Skills（`codex-skills/*/SKILL.md`） |
| **Agent 層** | 4 Agent 並行（AGENTS.md 定義） |
| **工具層** | Python（decimal arithmetic）、Mermaid 架構圖 |
| **資料層** | JSON（watchlist/fundamentals）、CSV（財務數據）、Markdown 報告 |
| **配置** | CLAUDE.md、AGENTS.md、`ai_CLAUDE.md` |

**Codex Skills（20個）**：bottleneck-hunter、deep-company-series、dyp-ask、earnings-review、earnings-team、financial-data、industry-funnel、industry-research、investment-checklist、investment-memo-craft、investment-research、investment-team、management-deep-dive、news-pulse、portfolio-review、private-company-research、quality-screen、thesis-tracker、wechat-article

## 實盤業績（Repo 聲稱）

| 年份 | 本框架 | 標普500 | 恒生指數 |
|------|--------|---------|---------|
| 2024 全年 | **+69.29%** | +23.31% | +17.67% |
| 2025 至今 | **+66.38%** | +16.39% | +27.77% |

## 與現有系統的相關性

1. **Skills 架構高度對齊**：本 repo 的 `codex-skills/*/SKILL.md` 格式與我的 `C:\Users\sanyo\.claude\skills\` 結構幾乎一致，可直接借用或移植個別 Skill
2. **AGENTS.md 設計參考**：4 Agent 並行投研的 AGENTS.md 設計，可作為自己設計 multi-agent workflow 的參考範本
3. **Codex + Claude Code 雙棧**：同時支援兩個平台，對理解如何跨平台設計 Skill 有實際參考價值
4. **投資研究用途**：如果需要對中國 A 股/港股進行系統性研究，這套 prompts 和 skills 可直接使用
5. **repo 本身就是知識庫**：包含大量真實投研報告（A 股召回池、科創板篩選、個股深度研究）

## 安裝建議

✅ **適合借用 Skills 定義**：直接 clone，把 `codex-skills/` 下的 SKILL.md 複製到自己的 skills 目錄使用，特別是 `/investment-research`、`/investment-team`、`/earnings-review`。

⏳ **整體安裝觀望**：內含大量中文報告和資料，本地化需求強。若無主動投資研究需求，整包裝入意義有限；按需取用單一 Skill 更實際。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：出現主動投資研究需求（如中國 A 股/港股系統性研究）
- **放棄條件**（→ ❌ 不裝）：持續無主動投資研究需求 → 不整包安裝，維持按需取用單一 Skill 的現狀

## 反向連結

- [[Claude Code Skills 系統]]
- [[多 Agent 工廠工作流]]
