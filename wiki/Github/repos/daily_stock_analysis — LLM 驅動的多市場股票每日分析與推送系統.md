---
source: "https://github.com/ZhuLinsen/daily_stock_analysis"
author: "ZhuLinsen"
stars: "59K"
clipped: 2026-07-27
tags:
  - "github/repo"
  - "stock-analysis"
  - "llm-agent"
  - "self-hosted"
  - "taiwan-stock"
  - "github-actions"
---

# daily_stock_analysis — LLM 驅動的多市場股票每日分析與推送系統

> **ZhuLinsen/daily_stock_analysis** | ⭐ 58,957 | 🍴 **50,574** | 📝 MIT
> "LLM 驱动的多市场股票智能分析系统：多源行情、实时新闻、决策看板与自动推送，支持零成本定时运行"
> 官網／Demo：https://dsa.zhulinsen.tech ｜ 最新版 v3.28.0（2026-07-26）

## 一句話說明

把自選股清單、行情資料、即時新聞餵給 LLM，每個交易日自動產出一份「決策儀表盤」（結論／評分／趨勢／買賣點位／風險警報／催化因素／操作檢查清單）並推送到企業微信／飛書／Telegram／Discord／Slack／Email。主打 **fork 完設好 Secrets 就跑在 GitHub Actions 上，零伺服器成本**。

**fork 數 50,574 / star 58,957 ＝ 比值 0.86**——這個異常比值本身就說明使用模式：絕大多數人不是來讀程式碼，是來 **fork-to-run**。

## 核心能力

| 能力 | 內容 |
|---|---|
| AI 決策報告 | 核心結論、評分、趨勢、買賣點位、風險警報、催化因素、操作檢查清單 |
| 多市場 | A股、港股、美股、日股、韓股、**台股**、ETF |
| Web / 桌面工作台 | `apps/dsa-web` + `apps/dsa-desktop`（Electron/NSIS），含手動分析、任務進度、歷史報告、回測、持倉、深淺主題 |
| Agent 問股 | 多輪追問，**15 種內建策略**（均線金叉／纏論／波浪／龍頭／熱點／事件驅動／情緒週期／成長品質／預期重定價…），YAML 定義在 `strategies/` |
| 智慧匯入 | 圖片、CSV/Excel、剪貼簿匯入；代碼／名稱／拼音／別名補全 |
| 自動化 | GitHub Actions／Docker／本機定時／FastAPI server／Bot（多平台） |

## 技術架構

```
main.py / server.py / webui.py
├── src/agent/                 多 Agent pipeline
│    ├── orchestrator.py       Technical → Intel → Risk → Specialist → Decision
│    │     模式：quick(~2 LLM calls) / standard / full / specialist
│    ├── agents/               technical / intel / risk / portfolio / decision
│    ├── disagreement.py       ★ 各 Agent 意見分歧的結構化摘要 + risk override
│    ├── memory.py             DecisionSignal 後驗複盤回饋
│    ├── codex_agent_backend.py  可接 Codex 當後端
│    └── litellm_route_resolution.py  多模型路由
├── data_provider/             17 個 fetcher：akshare / tushare / baostock / pytdx /
│                              yfinance / longbridge / tickflow / finnhub /
│                              alphavantage / efinance / tencent / tw_institutional
├── strategies/*.yaml          15 策略（宣告式，非硬編碼）
├── api/ + apps/               FastAPI + Web/Desktop 前端（TypeScript 3MB）
├── bot/                       多平台推送 bot
└── .claude/skills/            analyze-issue / analyze-pr / fix-issue（開發用）
    SKILL.md                   stock_analyzer（給 agent 呼叫分析函式用）
```

| 層次 | 技術 |
|---|---|
| 後端 | Python 3.10+（10.5 MB）、FastAPI |
| 前端 | TypeScript（3 MB）、Web + Electron 桌面版（NSIS 打包） |
| LLM | Anspire／AIHubMix／Gemini／OpenAI 相容／DeepSeek／通義／Claude／Ollama，LiteLLM 路由 |
| 行情 | AkShare／Baostock／YFinance（免費預設）＋ TickFlow／Tushare／Longbridge（token） |
| 新聞 | Anspire／SerpAPI／Tavily／Bocha／Brave／MiniMax／SearXNG |
| 部署 | GitHub Actions／Docker／本機排程 |

架構亮點是 **`disagreement.py`**：多個 Agent 各自出訊號後，不是簡單平均，而是把分歧結構化（分歧類型分類、risk agent 有 override 權、無效意見從 Diagnostics 取而非重新過濾），再交給 DecisionAgent 決定怎麼呈現給 LLM。這是多 Agent 決策系統少見的誠實設計——大多數專案會把分歧藏起來。

## 台股支援（對台灣使用者的重點）

`docs/market-support.md` 對台股邊界寫得異常誠實，值得整段記下：

**已支援**
- 格式：上市 `2330.TW`／上櫃 `6488.TWO`（base 4–6 位，ETF 如 `00878.TW`、`006208.TW`）
- 市場識別、資料路由、交易日曆（`XTAI / Asia/Taipei`，09:00–13:30 無午休，收盤集合競價 13:25–13:30 已建模）
- 指數：加權 `^TWII`、櫃買 `^TWOII`
- **三大法人買賣超**：`TwInstitutionalFetcher` 走 TWSE T86（legacy `rwd`）＋ TPEx OpenAPI，外資／投信／自營商日資料（單位股數），民國年轉西元有單測；資料源為政府開放資料（OGDL v1）
- Prompt 已注入台股語義（新台幣、三大法人、TWSE/TPEx ±10% 漲跌停），避免套用 A 股的北向資金／龍虎榜概念

**明確不承諾**
- **嚴格 suffix-only**：裸寫 `2330` 不會被認成台股，必須帶 `.TW`／`.TWO`
- 台股日線與行情**只走 YFinance**，不承諾即時、可能延遲或欄位缺失
- 無台股股票池種子／Web 自動補全
- 無台股大盤複盤（`MARKET_REVIEW_REGION` 不收 `tw`）、無 Market Light 紅綠燈、無市場寬度／板塊排行
- Portfolio 對台股是 partial valuation（無 TWD 匯率／成本／市值完整口徑）
- 三大法人介面失敗／限流一律 **fail-open 回無資料**——不中斷分析，但也代表報告可能靜默少一塊

## 專案健康度

| 指標 | 數值 |
|---|---|
| 建立時間 | 2026-01-10（約半年） |
| 近 4 週 commit | 13 / 9 / 23 / 8 |
| Release | v3.28.0（2026-07-26），版號推進極快 |
| Issue | 35 open / **754 closed**（處理率極高） |
| PR | 8 open |
| 貢獻者 | ZhuLinsen 為主，另有 massif-01、freesme、Activer007 等 10+ |
| 規模 | 962 檔／254 萬 tokens（`--compress` 且排除圖檔／dist／node_modules） |
| 榮譽 | Trendshift #1 Python Repository Of The Day、HelloGitHub 推薦 |

## 已知風險與取捨

1. **README 的「推薦」全帶推廣碼**：Anspire（`share_code=`）、AIHubMix（`aff=`）、TickFlow（`ref=`）、SerpAPI（`utm_source=`）皆為聯盟連結，且 Anspire／SerpAPI 是掛名贊助商。標為「**推薦**」的供應商同時是金主——選資料源時請自行比價，別把 README 的推薦當技術結論
2. **免費資料源不保證穩定**：作者自陳受上游限流／介面變動／網路波動影響；要長期定時或批量分析實質上得付 token 型資料源
3. **安全 issue 未關**：[#1970](https://github.com/ZhuLinsen/daily_stock_analysis/issues/1970) — 「Auth disable can be performed with only a valid session cookie」。自架 Web 端對外開放前先確認此問題狀態
4. **repomix 掃出 8 個測試檔含疑似敏感資訊**被自動排除（多為測試用假 key，但值得留意）
5. **LLM 產「買賣點位」的本質風險**：這是生成式輸出不是回測結論；`memory.py` 的 DecisionSignal 後驗複盤是好設計，但仍不等於策略驗證
6. **fork 50K 的另一面**：多數 fork 是私人執行實例，不是社群貢獻——不要把 fork 數讀成程式碼品質背書

## 社群評價

搜尋層面查得到的多是專案自述與 release note，**未見獨立第三方評測或使用者踩坑記錄**（Reddit/HN 無討論串）。小紅書路因登入牆（AUTH_REQUIRED）未取到。目前可靠的社群訊號只有：Trendshift 當日 #1 Python repo、HelloGitHub 收錄、GitHub Issue 區 754 已關閉（維護者回應積極）。

## 相關連結

- [[Github/_index|GitHub Repo 索引]]
- [[Github/repos/TrendRadar — 一鍵部署的 AI 舆情熱點聚合監控助手|TrendRadar]]（同屬 fork-to-run + GitHub Actions 模式）
- 市場邊界文件：`docs/market-support.md` ｜ 完整指南：`docs/full-guide.md`
