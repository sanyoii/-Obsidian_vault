---
source: "https://github.com/JerBouma/FinanceDatabase"
author: "JerBouma (Jeroen Bouma)"
stars: "8.2K"
clipped: 2026-07-21
tags:
  - "github/repo"
  - "finance"
  - "database"
  - "python"
  - "investing"
---

# FinanceDatabase — 30萬+ 金融商品分類資料庫（Python）

> **JerBouma/FinanceDatabase** | ⭐ 8,200 | 🍴 846 | 📝 MIT
> "This is a database of 300.000+ symbols containing Equities, ETFs, Funds, Indices, Currencies, Cryptocurrencies and Money Markets."

## 一句話說明

免費、社群維護的**金融商品「分類目錄」資料庫** + 輕量 Python 查詢套件。收錄 30 萬+ symbol（股票/ETF/基金/指數/貨幣/加密幣/貨幣市場），依國家、產業、板塊、類別分類。刻意**不提供即時報價或財報**（那交給姊妹專案 FinanceToolkit）——定位是「先幫你找到某國/某產業裡有哪些標的存在」的探索層。作者 Jeroen Bouma 曾任職 OpenBB。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 8,200 |
| Forks | 846 |
| 主要語言 | Python（+ Jupyter 範例） |
| 授權 | MIT |
| 建立時間 | 2021-01-28（成熟 5 年） |
| 最後推送 | 2026-07-19（資料持續更新） |
| Open Issues / PRs | 3 / 2 |
| 最新 Release | 2.4.0（2026-06-02） |
| diskUsage | 4.9GB（含全量壓縮資料 + CSV） |
| Topics | finance, database, equities, etfs, funds, openbb, fundamental-analysis |
| PyPI | `pip install financedatabase` |

## Repomix 分析（策略性跳過）

repomix --remote 會拉 4.9GB 資料 blob（`compression/*.bz2` + `database/**` 逐交易所 CSV），不切實際 → 改用 gh API 精準取套件結構 + README。程式碼本體僅 ~158KB Python，其餘全是資料層。典型「dataset-as-a-repo」。

## 核心功能

- **7 個資產類查詢模組**：`Equities`/`ETFs`/`Funds`/`Indices`/`Currencies`/`Cryptos`/`Moneymarkets`，各為 base `FinanceDatabase` class 子類
- **`.select()` / `.search(**kwargs)`**：按 sector/industry/country/exchange/currency 過濾，回傳 pandas DataFrame
- **`show_options("equities")`**：列每欄可選值，不需載入大資料檔（輕量探索）
- **`.to_toolkit()`**：查詢結果直接交棒給 FinanceToolkit（同作者，算財報/比率）——兩專案設計為配對使用
- **社群可編輯資料**：核心資料是純 CSV，無程式基礎也能貢獻（改 CSV → PR）；GitHub Actions 自動重打包
- **本地/遠端雙模式**：預設從遠端 DATA_REPO 讀 bz2 CSV，也可指本地路徑離線用
- **OpenBB 生態整合**（topic `openbb`）

## 技術架構

```
使用者 Python  →  import financedatabase as fd
   ▼
financedatabase/  （純程式碼 ~158KB）
   ├── __init__.py     匯出 7 資產類 + show_options
   ├── helpers.py
   │     ├── class FinanceDatabase   base controller
   │     │     read_csv(compression="bz2", base_url=DATA_REPO)
   │     │     .search(**kwargs) / .show_options()
   │     ├── class FinanceFrame(pd.DataFrame)
   │     │     .to_toolkit() ─────► FinanceToolkit（姊妹專案）
   │     └── show_options()（免初始化查選項）
   └── Equities/ETFs/Funds/Indices/Currencies/Cryptos/Moneymarkets.py
   ▼ 讀取
compression/*.bz2  ◄── GitHub Actions 從 database/**.csv 自動打包
database/**.csv    ◄── 社群手動編輯（PR）
```

| 層次 | 技術 |
|------|------|
| 查詢 API | Python 套件（pandas 為唯一實質依賴） |
| 資料格式 | bz2 壓縮 CSV（執行期）+ 明文 CSV（貢獻用） |
| 資料更新 | GitHub Actions（database_update / linting / testing） |
| 生態銜接 | `to_toolkit()` → FinanceToolkit；OpenBB Terminal |
| 發佈 | PyPI |

**設計亮點**：「資料即社群」+ 程式碼極薄。真正價值是 30 萬筆人工校對分類資料（CSV，人人可改），套件只是薄查詢層。`to_toolkit()` 交棒設計把「找標的」與「算財報」乾淨切分成兩專案。

## 社群健康度

- 貢獻者：JerBouma + dokson/colin99d/JonArnfred 等 10+（有真實外部貢獻）
- 8,200⭐/846 fork 高 fork 率符合「fork 後改 CSV 貢獻」模式
- `actions-user`+`dependabot` 在貢獻者列，自動化維護成熟
- Release 2.1→2.4 穩定；Issue/PR 3/2 低積壓

## 與現有系統的相關性

- **Obsidian**：高。與 [[jane-finance]]（旺來幫投資知識庫）、[[ai-berkshire — AI 時代的價值投資研究框架|ai-berkshire]] 互補——FinanceDatabase 提供「標的宇宙」，jane-finance 提供「判斷框架」。
- **Claude Code**：中。非 skill/MCP，是 Python 套件，但可包成 agent 工具讓 Claude 掃標的宇宙再餵分析 skill。
- **Automation**：中-高。純程式 + pandas 易腳本化，可接批次板塊掃描 → FinanceToolkit 算財報。台灣標的覆蓋需實測（資料以歐美為主）。

## 安裝建議

**✅ 已安裝（2026-07-21）** — 免費、MIT、成熟（5 年 8.2K⭐）、活躍、依賴極輕（pandas）。已 `pip install financedatabase financetoolkit` 裝進 C:\Python314（user site-packages，FD 2.4.0）。`to_toolkit()` 一行接 FinanceToolkit 算財報。搭配 jane-finance 判斷框架 = 「宇宙 + 觀點」閉環。

**台股覆蓋實測（2026-07-21）**：`country="Taiwan"` 1,593 檔，本地 TAI+TWO **1,347 檔**，標準 `<代碼>.TW` 格式，11 板塊全。權值 10 檔本地命中 **9/10**——唯一缺 **2330.TW 台積電本地掛牌**（只有 ADR `TSM` + 海外掛牌；社群可補的 CSV 缺口）。結論：批次板塊掃描完全可用；精確查單一 symbol 前先驗證存在。

- **升級條件（→ 深度整合成 Claude 工具/管線）**：實際啟動投資標的掃描專案且驗證台/美股覆蓋夠用
- **放棄條件（→ 裝了不用）**：實測台股覆蓋過稀/分類過時，或投資研究不需「標的探索」層

## 相關連結

- [[jane-finance]] — 投資判斷框架（互補：宇宙 vs 觀點）
- [[ai-berkshire — AI 時代的價值投資研究框架|ai-berkshire]] — AI 投資研究框架
- FinanceToolkit（同作者姊妹專案，算財報/比率，`to_toolkit()` 銜接）
