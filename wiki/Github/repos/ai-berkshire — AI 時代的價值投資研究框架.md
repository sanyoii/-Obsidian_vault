---
source: "https://github.com/xbtlin/ai-berkshire"
author: "xbtlin"
stars: "4K+"
clipped: 2026-06-28
tags:
  - "github/repo"
  - "value-investing"
  - "claude-code"
  - "multi-agent"
  - "financial-analysis"
  - "china-stock"
---

## ai-berkshire — AI 時代的價值投資研究框架

> **xbtlin/ai-berkshire** | ⭐ 4,060 | 🍴 574 | 📝 MIT
> "AI 时代的伯克希尔：基于 Claude Code 的价值投资研究框架。巴菲特·芒格·段永平·李录四大师方法论 + 多Agent并行研究。"

---

### 一句話說明

一套同時兼容 Claude Code 與 Codex 的投資研究 Skill 合集，將巴菲特、芒格、段永平、李錄四位價值投資大師的方法論系統化，透過多 Agent 並行對抗式分析，讓個人投資者能產出機構級投研報告。一個人 + Claude Code = 一個投研團隊。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 4,060 |
| Forks | 574 |
| 主要語言 | Python (125KB) + Shell (2KB) + Mermaid (1KB) |
| 授權 | MIT License |
| 建立時間 | 2026-04-07 |
| 最後推送 | 2026-06-27 |
| Open Issues | 13 |
| Open PRs | 4 |
| 最新 Release | v1.0.0 (2026-04-07) |
| Topics | ai, ai-agent, claude-code, value-investing, warren-buffett, charlie-munger 等 20 個 |
| 是否 Archived | 否 |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 2,202 |
| 原始碼大小 | ~33MB (XML packed) |
| 壓縮模式 | 否（diskUsage 19MB） |

#### 檔案組成

| 類別 | 數量 | 佔比 |
|------|------|------|
| 研究報告 (reports/) | ~2,099 | 95.3% |
| Skills + Codex prompts | 57 | 2.6% |
| Python 工具 (tools/) | 10 | 0.5% |
| 其他（config/scripts/assets） | ~36 | 1.6% |

> 這是一個**內容驅動型**專案——程式碼佔比極低（Python ~125KB），絕大部分是結構化的中文投資研究 Markdown 報告。

---

### 核心功能

- **18 個投資研究 Skill**：涵蓋深度研究、財報分析、行業篩選、持倉管理、思維工具五大類
- **四大師視角對抗分析**：段永平（商業模式）、巴菲特（財務估值）、芒格（逆向思考）、李錄（長期確定性）四個 Agent 並行研究同一家公司，製造真實的觀點矛盾
- **結構化反偏見機制**：A/B/C 資訊豐富度評級、芒格式逆向檢驗、快速否決清單（8 條紅線）、反共識檢查、留白原則
- **金融數據精確計算**：`tools/financial_rigor.py` 使用 Python `decimal.Decimal` 精確運算，支援市值驗算、估值指標、多源交叉驗證、Benford 定律檢測、三情景估值
- **強制給結論**：不打太極，輸出「通過/不通過/灰色地帶」+ 具體價格區間 + 分層建議
- **可復現研究流程**：同樣輸入 → 結構一致的輸出，支援多公司橫向對比
- **實盤驗證**：作者公開 2024 全年 +69.29%、2025 至今 +66.38% 的實盤收益（富途證券截圖）
- **雙平台相容**：同時支援 Claude Code（skills/）和 Codex（codex-skills/），由 sync 腳本自動同步

---

### 技術架構

```
┌─────────────────────────────────────────────────┐
│              使用者（Team Lead）                  │
│           輸入指令 → 接收綜合報告                 │
├─────────┬──────────┬──────────┬─────────────────┤
│ Agent 1       │ Agent 2       │ Agent 3           │ Agent 4            │
│ 商業模式分析  │ 財務估值分析  │ 行業競爭分析      │ 風險管理層評估     │
│ 段永平視角    │ 巴菲特視角    │ 芒格視角          │ 李錄視角           │
└─────────┴──────────┴──────────┴─────────────────┘
        ↓ 並行研究，各自搜索 + 獨立判斷 ↓
┌─────────────────────────────────────────────────┐
│             tools/ 工具層                        │
│  financial_rigor.py  精確計算 + 交叉驗證          │
│  stock_screener.py   股票篩選                    │
│  ashare_data.py      A 股數據                    │
│  report_audit.py     報告品質抽檢                │
│  morningstar_fair_value.py  晨星公允價值          │
│  momentum_backtest.py      動量回測              │
└─────────────────────────────────────────────────┘
```

| 層次 | 技術 |
|------|------|
| Skill 層 | 18 個 Claude Code / Codex Skill（Markdown 定義） |
| Agent 層 | 4 個 Claude Agent 並行（段永平/巴菲特/芒格/李錄） |
| 工具層 | Python stdlib（decimal/json/argparse），零外部依賴 |
| 報告層 | 結構化 Markdown，按公司名建資料夾 |
| 同步層 | `sync-codex-skills.py` / `sync-codex-prompts.py` |

---

### 18 個 Skill 速覽

#### 深度研究（5 個）
| Skill | 用途 |
|-------|------|
| `/investment-research` | 四大師綜合深度分析（七模組順序執行） |
| `/investment-team` | 多 Agent 並行投研團隊（最快最全面） |
| `/management-deep-dive` | 管理層縱深研究 |
| `/private-company-research` | 未上市公司（如 SpaceX）深度研究 |
| `/deep-company-series` | 8 篇長文系列拆一家公司（12 萬字） |

#### 財報分析（2 個）
| Skill | 用途 |
|-------|------|
| `/earnings-review` | 財報精讀（只讀原始財報，不依賴研報） |
| `/earnings-team` | 四大師並行解讀 → 可發佈公眾號文章 |

#### 行業篩選（5 個）
| Skill | 用途 |
|-------|------|
| `/industry-research` | 產業鏈全景掃描 |
| `/industry-funnel` | 全市場 → 粗篩 ≤10 → 終選 3 家 |
| `/quality-screen` | 去劣篩選（7 條硬指標） |
| `/bottleneck-hunter` | 供應鏈瓶頸獵手 |
| `/investment-checklist` | 巴菲特買入前六關 Checklist |

#### 持倉管理（3 個）
| Skill | 用途 |
|-------|------|
| `/portfolio-review` | 組合管理、倉位、再平衡 |
| `/thesis-tracker` | 投資論文追蹤（買後紀律系統） |
| `/news-pulse` | 股價異動 10 分鐘快速歸因 |

#### 思維工具（3 個）
| Skill | 用途 |
|-------|------|
| `/dyp-ask` | 以段永平的方式思考任何問題 |
| `/financial-data` | 財務數據獲取與交叉驗證規範 |
| `/wechat-article` | 微信公眾號文章（三 Agent 協作） |

---

### 研究報告涵蓋範圍

報告目錄包含大量已完成的投資研究，涵蓋：

- **中國互聯網**：騰訊、拼多多、美團、快手、泡泡瑪特
- **白酒**：五糧液、瀘州老窖、白酒週期研究
- **金融**：平安集團、眾安在線、PayPal vs 螞蟻集團
- **汽車**：中國汽車市場 5 年展望
- **科技**：小米、高通、SK 海力士、Tesla、SpaceX（IPO 拆解）
- **量化**：九坤投資、幻方量化
- **AI 產業**：AI 五層蛋糕全景研究、上海 AI 公司深度分析
- **製造業**：永新股份、長光辰芯、璞泰來
- **消費**：Temu vs Amazon、中國廣核、長江電力
- **大師持倉追蹤**：巴菲特/李錄/段永平 13F 持倉

每個深度研究包含「看懂 XX」系列（4 篇：開篇 → 商業模式 → 競爭格局 → 風險與估值）和最終報告。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 高度相關：報告結構化程度高，可直接作為 Wiki 知識來源；研究框架可作為 jane-finance Skill 的投資決策補充 |
| **Claude Code** | 直接適用：18 個 Skill 可直接安裝使用（`install-claude-commands.sh`），與現有 Skill 體系相容；工具層設計理念與 karpathy 原則一致（精確、零依賴、可驗證） |
| **Automation** | 中度相關：報告品質抽檢工具（`report_audit.py`）可整合到工作流；但核心是互動式研究，非自動化 pipeline |

---

### 安裝建議

✅ **適合安裝** — 理由：

1. Skill 設計品質極高（結構化 prompt + 強制結論 + 反偏見機制），是目前最完整的 Claude Code 投資研究框架
2. 零外部依賴（Python stdlib only），安裝即用
3. 與 jane-finance Skill 互補：jane-finance 偏向內容萃取與信念體系，ai-berkshire 偏向結構化研究與多 Agent 對抗
4. 2,000+ 份研究報告本身就是寶貴的投資研究語料庫
5. 作者持續活躍（近 4 週 691 commits），GitHub Trending #2

---

### 相關連結

- [[jane-finance Skill]] — Vocus Jane 投資理財內容萃取
- [[Obsidian QA Bug 工作流]] — Bug 追蹤模板系統
- [[career-ops 求職系統]] — 類似的 Claude Code Skill 合集架構
