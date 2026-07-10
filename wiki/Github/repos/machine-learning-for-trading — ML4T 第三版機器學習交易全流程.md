---
source: "https://github.com/stefan-jansen/machine-learning-for-trading"
author: "stefan-jansen (Stefan Jansen)"
stars: "19.7K"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "quant-trading"
  - "machine-learning"
  - "backtesting"
  - "agent-skills"
---

# machine-learning-for-trading — ML4T 第三版機器學習交易全流程

> **stefan-jansen/machine-learning-for-trading** | ⭐ 19.7K | 🍴 5.4K | 📝 MIT
> "Code for Machine Learning for Trading, 3rd edition — from data sourcing to live execution."

---

## 一句話說明

《Machine Learning for Trading》第三版的官方程式碼庫——量化交易 ML 領域最知名的教科書配套 repo，第三版（2026）從零重建：以單一端到端工作流（資料 → 特徵 → 模型 → 回測 → 成本/風險 → 上線部署）貫穿 27 章與 9 個橫跨資產類別的 case study，並首次納入 GenAI/多 Agent 系統、因果 ML 與合成資料。目標讀者：想把 ML 交易策略從研究做到實盤的工程師與量化研究者。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 19,694 |
| Forks | 5,383 |
| 主要語言 | Jupyter Notebook（repo 內以配對 .py 腳本同步管理） |
| 授權 | MIT |
| 建立時間 | 2018-05 |
| 最後推送 | 2026-07-08（第三版重建進行中，逐 Part 發布） |
| 最新 Release | v3.0.0-alpha.3（正式版 tag 仍為 2.0 / 2021） |
| Topics | machine-learning, algorithmic-trading, backtesting, reinforcement-learning, LLM, polars, synthetic-data 等 18 個 |
| 首頁 | https://ml4trading.io |
| Repo 大小 | ~758 MB |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 353（僅 .md/.py/config，排除 notebook JSON） |
| 總 Tokens | 905,660（--compress） |
| 壓縮模式 | `--compress --include "**/*.md,**/*.py,**/*.yml,**/*.yaml,**/*.toml"` |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| tests/overrides.yaml | 19,366 | 2.1% |
| 05_synthetic_data/03_sigcwgan_signatures.py | 13,003 | 1.4% |
| 05_synthetic_data/05_diffusion_ts.py | 12,443 | 1.4% |
| case_studies/utils/backtest_runner.py | 11,154 | 1.2% |
| 05_synthetic_data/04_gtgan_irregular.py | 9,335 | 1.0% |

---

## 核心功能

- **27 章端到端工作流**：六大 Part（資料基礎設施 → 研究設計/特徵 → 模型開發 → 策略實作 → 進階 AI → 生產部署），核心方法論是「evidence boundary」——用一條明確界線分隔探索（tuning）與確認（evaluation），全書貫徹 walk-forward CV、Deflated Sharpe Ratio、多重檢定控制（BH-FDR、White's Reality Check）、conformal prediction。
- **9 個 case study 跑同一條 pipeline**：ETF 動量、加密永續資金費率套利、NASDAQ-100 盤中微結構、S&P 500 股票+選擇權 IV 特徵、美股因子面板、FX carry、CME 期貨期限結構、純選擇權策略、美股大截面——同一流程套九個市場，展示哪裡有效哪裡失效。
- **6 個生產級 Python 套件**（PyPI beta）：`ml4t-data`（19+ 資料商統一介面）、`ml4t-engineer`（防洩漏特徵/標籤）、`ml4t-models`、`ml4t-diagnostic`（Deflated Sharpe）、`ml4t-backtest`（事件驅動）、`ml4t-live`（IB/Alpaca 券商串接）。
- **第三版新料**：GenAI（SEC filings RAG、知識圖譜/Graph RAG、多 Agent 研究系統）、因果 ML（Double ML、因果發現）、RL（最優執行、做市、deep hedging）、合成金融資料（TimeGAN/Tail-GAN/Sig-CWGAN/Diffusion-TS/LLM 表格生成）、資料層全面改用 **Polars**。
- **61 個 Agent Skills（官網）**：給 coding agent 用的護欄化任務，內建防 lookahead bias、data leakage、多重檢定錯誤的 guardrails——從資料抓取、triple-barrier 標籤到 kill switch、production readiness。
- **工程紀律罕見地高**（教科書 repo 少見）：40+ 測試檔含 notebook 執行測試、防洩漏測試（`test_latent_factors_no_leak`）、5 條 CI workflow（含每週外部資料漂移檢測 `weekly-external`、Docker container smoke test）、notebook↔script 雙向同步腳本、每章 Docker 可重現環境。

---

## 技術架構

```
data/                 各資產類別 loader + download（equities/futures/fx/crypto/macro/prediction_markets）
01..10_<chapter>/     章節腳本（notebook 配對 .py；目前發布至 Part II 第 10 章）
case_studies/
  ├── <9 個市場>/     config/setup.yaml 驅動
  └── utils/          backtest_runner、registry（實驗註冊）、latent_factors、conformal、causal
utils/                cv_splits、data_quality、reproducibility、predictions_cache
envs/                 py312 / py314 雙環境 pyproject
tests/ + .github/     notebook 測試、防洩漏測試、weekly 外部漂移 CI
```

| 層次 | 技術 |
|------|------|
| 資料層 | Polars + PyArrow + Parquet/DuckDB（第三版棄 pandas 為主的舊架構） |
| ML | scikit-learn、XGBoost/LightGBM/CatBoost、Optuna、TabPFN、SHAP |
| 深度學習 | PyTorch + Lightning、transformers、PatchTST/iTransformer/TSMixer/Mamba |
| RL | gymnasium + stable-baselines3 |
| 回測/實盤 | ml4t-backtest（事件驅動）、ml4t-live（IB/Alpaca/QuantConnect） |
| 環境 | Python ≥3.14（主環境）+ py312 相容環境、Docker Compose |

---

## 社群口碑

- 量化 ML 教科書的事實標準：第二版長年是 r/algotrading 入門必推書單常客，YouTube 有 Packt/Quantopian 官方訪談與第三方書評（最高 8K+ 觀看），教學生態成熟。
- 作者信譽資產：Stefan Jansen 同時維護 `zipline-reloaded`（Quantopian 倒閉後社群最主要的 Zipline 延續版），第三版改為自建 `ml4t-backtest`。
- 已知舊版痛點：第二版最大抱怨是環境安裝地獄（conda/zipline 相依衝突）——第三版以 Docker + uv/pyproject 雙環境正面回應。
- 注意商業漏斗：README 與官網深度綁定 Maven 付費 cohort 課程、Substack 電子報、官網會員（primers/agent skills 需免費註冊）；repo 本身 MIT 完整可用。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | Quant-Trading 分類直接相關（[[Quant-Trading/ai-24h-risk-monitoring]] 的「硬規則熔斷」與本書 kill-switch/circuit-breaker 章節同題；polymarket 數學路線圖可對接第 4 章預測市場資料源） |
| **Claude Code** | 官網 61 個 Agent Skills 的「護欄化 skill」設計（防 lookahead/leakage/多重檢定內建於 skill）與本環境 institution 驗收條款、R17 契約表同構——skill 設計模式值得偷 |
| **Automation** | autohedge 專案若復活，ml4t-data（19+ 資料商統一介面）與 ml4t-diagnostic（Deflated Sharpe）是現成零件 |

---

## 安裝建議

⏳ 觀望（按需選用）— 758MB、Python 3.14 + 重型深度學習依賴，整包 clone 不划算；且第三版逐 Part 發布中（目前僅到第 10 章，Part III–VI 未出）。建議：① 先逛 ml4trading.io 免費 primers（112 題）與 agent skills 頁面偷設計；② 對特定主題（如合成資料、微結構）再 sparse clone 對應章節目錄；③ 等全章節發布 + ml4t-* 套件出 beta 再評估整合 autohedge。

---

## 相關連結

- [[Github/repos/best-of-algorithmic-trading Collections|best-of-algo-trading]] — 演算法交易資源總表（本 repo 為其常駐條目）
- [[Github/repos/ai-berkshire — AI 時代的價值投資研究框架|ai-berkshire]] — 已裝的投資多 Agent 框架，偏基本面；本書偏系統化交易，互補
- [[Quant-Trading/ai-24h-risk-monitoring]] — 風控四層架構筆記，與本書生產風控章節同題
- [[Claude/multi-ai-task-card]] — 任務卡防斷片；本書 61 agent skills 的 guardrail 思路是同一族
