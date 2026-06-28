---
tags: [投資研究, claude-code, skills, 價值投資, AI-agent, python, codex]
date: 2026-06-28
status: evaluated
verdict: 高度相關——18 個 Claude Code / Codex 投研 Skill，可直接安裝到本機 ~/.claude/commands/
---

# AI Berkshire — AI 時代的價值投資研究框架

> 來源：https://github.com/xbtlin/ai-berkshire
> 授權：MIT
> 規模：2202 檔案 / 約 32.8 MB（含大量實際投研報告）

## 這是什麼？

一套同時兼容 Claude Code 與 OpenAI Codex 的投資研究 Skill 合集，將巴菲特、芒格、段永平、李錄四位價值投資大師的方法論系統化，通過 AI Agent 實現專業級投研輸出。核心主張：**一個人 + Claude Code = 一個投研團隊**。

作者聲稱真實實盤業績：2024 全年 +69.29%、2025 至今 +66.38%，兩年均大幅跑贏恒生、標普、沪深300。

## 核心功能

**18 個 Skill，按場景分四類：**

### 深度研究類（5 個）
- `/investment-research` — 四大師框架逐模組深度分析（含信息豐富度評級 A/B/C、芒格式逆向檢驗）
- `/investment-team` — 4 個 Agent 並行研究，各自獨立搜索 → Team Lead 綜合
- `/management-deep-dive` — 管理層縱深研究（「買股票就是買人」）
- `/private-company-research` — 未上市公司研究（資訊稀缺場景）
- `/deep-company-series` — 8 篇系列文拆解一家公司（公眾號級深度）

### 財報分析類（2 個）
- `/earnings-review` — 只讀一手財報，不依賴二手研報
- `/earnings-team` — 四大師並行解讀 → 編輯潤色 → 可直接發布的公眾號文章

### 行業篩選類（5 個）
- `/industry-research` — 產業鏈全景掃描（按環節切片）
- `/industry-funnel` — 漏斗篩選：全市場 → ≤10 家 → 終選 3 家
- `/quality-screen` — 去劣篩選（7 條硬指標）
- `/bottleneck-hunter` — 供應鏈瓶頸獵手
- `/investment-checklist` — 巴菲特六關 Checklist，10 分鐘決定值不值得深研

### 持倉管理 & 思維工具（6 個）
- `/portfolio-review`、`/thesis-tracker`、`/news-pulse`
- `/dyp-ask`（段永平問答）、`/financial-data`（精確計算規範）、`/wechat-article`（三 Agent 協作）

## 技術棧

| 類型 | 內容 |
|------|------|
| Skill 格式 | Claude Code commands（`.md`）、Codex skills（`codex-skills/*/SKILL.md`）、Codex slash prompts |
| Python 工具 | `financial_rigor.py`（`decimal.Decimal` 精確十進位計算）、`stock_screener.py`、`xueqiu_scraper.py`（Playwright 爬蟲）、`ashare_data.py`、`momentum_backtest.py`、`morningstar_fair_value.py`、`report_audit.py` |
| 同步腳本 | `scripts/sync-codex-skills.py`（從 skills/*.md 生成 Codex skill 包）、`scripts/sync-codex-prompts.py` |
| 安裝腳本 | `scripts/install-claude-commands.sh`、`scripts/install-codex-skills.sh` |
| 資料 | `data/fundamentals.json`、`data/watchlist.json`、晨星公允價值 CSV、相關性 CSV |
| 報告格式 | 全中文，按公司建資料夾，命名規範完整（`{公司名}-research-{YYYYMMDD}.md`）|
| 語言 | 中文（簡體）為主，README 同時有英文版 |

## 與現有系統的相關性

**高度相關**：

1. **Claude Code Skills 生態**：本 repo 的 `skills/*.md` 格式與現有 `~/.claude/skills/` 系統完全相同，可直接安裝到 `~/.claude/commands/` 使用。安裝腳本已提供（`./scripts/install-claude-commands.sh`）。

2. **投資研究輔助**：若需要用 Claude Code 進行股票研究，這套框架提供了結構化的四大師分析流程，比直接問 AI 輸出更有決策依據的報告。

3. **多 Agent 設計參考**：`/investment-team` 的 4-Agent 並行設計（各自獨立搜索 → 匯聚）可作為本地 7-Agent 工廠工作流的設計參考。

4. **Python 工具可借用**：`financial_rigor.py` 的精確計算模式（`decimal.Decimal` + 多源交叉驗證）在任何需要財務計算的場景都可直接引用。

5. **與現有投資類知識庫的對接**：vault 中若有投資相關筆記，這套 skill 可以直接作為研究工具使用。

## 安裝建議

✅ **適合安裝**——若有投資研究需求，直接執行：

```bash
git clone https://github.com/xbtlin/ai-berkshire.git
cd ai-berkshire
./scripts/install-claude-commands.sh
# 安裝後在 Claude Code 中使用 /investment-research 等指令
```

**注意**：xueqiu_scraper.py 使用 Playwright，需要本機已安裝 playwright-stealth（本機已有 `C:\Python314`）。Python 工具依賴需獨立安裝，與現有 `d:\Claude\autohedge-env` 環境可能有衝突，建議隔離虛擬環境。

## 反向連結

- [[claude-code-skills-system]] — 相同的 Skill 格式
- [[7-agent-factory-workflow]] — 多 Agent 並行設計參考
