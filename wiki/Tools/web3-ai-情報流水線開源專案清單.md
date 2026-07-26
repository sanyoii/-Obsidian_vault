---
title: Web3 × AI 情報流水線開源專案清單（5 個）
created: 2026-07-27
tags:
  - tools
  - web3
  - ai
  - 資訊源
  - 情報收集
  - open-source
---

# Web3 × AI 情報流水線開源專案清單（5 個）

> 來源：X 上 @maomao_acrypto 的推薦貼文，主題是「用 5 個開源專案搭一條 Web3 + AI 全自動情報流水線」。
> 解決的問題：加密／AI 圈的消息散在幾百個來源，人工追不完；這組專案的思路是把「抓取 → 篩選 → 摘要 → 推播」串成一條不用每天顧的流水線。
> **這份清單的主要用途是交叉查核**——其中已經有專案在本 vault 分析過並下了結論，別重複評估。

原貼文是行銷向的推薦文，本頁已剝除話術、補上即時倉庫數據與本 vault 的既有結論。

---

## 主表格

| 專案 | 連結 | 做什麼 | 星數／最後推送／授權 | 本 vault 是否已分析 |
|---|---|---|---|---|
| RSSAggregatorforWeb3 | https://github.com/chainfeeds/RSSAggregatorforWeb3 | Web3 資訊源 RSS 合集，原文宣稱 600+ 條精選 feed，涵蓋 300+ 專案動態、GitHub Release、研報與 VC 情報，可整包匯入 RSS 閱讀器 | 2,136⭐／**2022-11-22**／MIT | ❌ 無 |
| free-crypto-news | https://github.com/nirholas/free-crypto-news | 免費加密新聞 API，原文宣稱 200+ 來源、66 萬+ 篇新聞、18 種語言，附 AI 摘要與情緒分析；倉庫說明提到有 REST/RSS、MCP server 與多語言 SDK | 275⭐／2026-07-22／Other（非標準授權） | ❌ 無 |
| TrendRadar | https://github.com/sansan0/TrendRadar | 全網熱搜監控雷達，35+ 中文平台熱榜聚合 + RSS 訂閱，關鍵詞過濾後推播到微信／飛書／Telegram 等 9 個渠道 | 60,905⭐／2026-07-17／GPL-3.0 | ✅ **已深度分析**（結論 ⏳ 觀望）→ [[Github/repos/TrendRadar — 一鍵部署的 AI 舆情熱點聚合監控助手\|TrendRadar]] |
| BestBlogs | https://github.com/ginobefun/BestBlogs | AI 內容聚合站 bestblogs.dev 的開源版，原文宣稱 400+ 資訊源，用大語言模型自動打分、提煉觀點、生成一句話摘要與外文翻譯 | 3,940⭐／2026-07-08／**無授權檔** | ❌ 無 |
| CloudFlare-AI-Insight-Daily | https://github.com/justlovemaki/CloudFlare-AI-Insight-Daily | 跑在 Cloudflare Workers 上的 AI 每日簡報產生器，抓模型動態／GitHub 熱門／論文／社群言論，經 Gemini 處理後自動發布到 GitHub Pages | 1,747⭐／2026-07-24／GPL-3.0 | ❌ 無 |

倉庫數據以 `gh repo view` 於 2026-07-27 查得，五個皆未 archived。

---

## 停更與授權警訊

- **RSSAggregatorforWeb3 已停更超過三年半**（最後推送 2022-11-22）。它是純資料倉庫（一包 OPML／清單），不像程式專案會直接壞掉，但 Web3 專案三年的汰換率極高，裡面相當比例的 feed 幾乎可以確定已經死掉或改網址。要用的話當成「起點種子」而非現成清單，匯入後自己刷一輪死連結。
- **BestBlogs 沒有授權檔**（`licenseInfo` 為 null）。無授權在法律上等同「保留所有權利」，拿去改、拿去商用都沒有明確許可。自用讀原始碼沒問題，要接進自己的產品線之前先想清楚。
- **free-crypto-news 星數僅 275**，相對其他四個是很小的專案，「永久免費」的服務承諾沒有任何保證機制；它是單一維護者的免費 API，把流水線的關鍵環節押在上面有中斷風險。
- TrendRadar 與 CloudFlare-AI-Insight-Daily 都是 GPL-3.0，衍生作品要開源，內部自用無妨。

---

## 實際可用性評註（台灣使用者視角）

原貼文的預設讀者是中國／微信生態的使用者，這點會直接影響這五個東西對你的價值：

**TrendRadar** — 監控的 35 個平台以知乎、B 站、微博、抖音、今日頭條為主。如果你想追的是英文 AI 圈或台灣本地輿情，這些平台的熱榜訊號跟你關心的事幾乎不重疊。推播渠道也偏微信／飛書／釘釘，Telegram 和 email 可用但不是它的重點。此外它的資料來源綁在 newsnow 的單點 API 上（見既有分析）。

**CloudFlare-AI-Insight-Daily** — 三端推送裡的「公眾號」對非中國使用者無意義，但網頁與 RSS 兩端可用，Cloudflare Workers 部署對台灣使用者沒有障礙（免費額度足夠跑日報）。需要自備 Gemini API key。這是五個裡對台灣使用者**最沒有生態摩擦**的一個。

**BestBlogs** — 收錄的中文技術文章比例高，但英文源也有，內容取向偏程式／AI／產品。網站 bestblogs.dev 直接可讀，不一定要自架。

**free-crypto-news** — 純 API，無地域綁定，18 種語言。要串進自己的 pipeline 是五個裡最直接的（有現成 SDK 與 MCP server）。但前述的規模與可靠性疑慮要先接受。

**RSSAggregatorforWeb3** — RSS 是最沒有地域摩擦的格式，匯入任何閱讀器都行。問題只在資料是三年前的。

---

## 與現有工具的重疊

以目前手上已裝的情報工具（[[Tools/last30days|last30days]]、agent-reach、social-monitor 社群海巡排程、已分析的 [[Github/repos/newsnow — 優雅的即時熱榜新聞聚合器\|newsnow]]）比對：

**重複，不建議再裝：**
- **TrendRadar** — 既有分析已判定與 last30days／agent-reach 的能力重疊約八成，且它的熱榜資料源正是 newsnow。newsnow 本身已標 ✅ 且 `/api/s` 可直接當熱榜 API 接進海巡，繞過 TrendRadar 這層即可。它的差異點只剩 MCP 對話式分析。
- **CloudFlare-AI-Insight-Daily** — 功能上是「自架版的 AI 日報」，跟 [[Tools/ai-一手資訊源清單|AI 一手資訊源清單]] 裡的 AI News（news.smol.ai）目的相同，但後者不用自己維護。除非你想完全控制選源與摘要風格，否則自架的邊際效益不高。
- **BestBlogs** — 對應的位置是「別人幫你挑好的深度文章」，跟一手資訊源清單裡的部落格組重疊。直接讀 bestblogs.dev 網站即可，不必自架。

**真正的空白：**
- **加密／Web3 領域的專門資訊源** —— 現有工具鏈（last30days、agent-reach、一手資訊源清單）全部是 AI／泛科技取向，**沒有任何一個專門覆蓋加密貨幣領域**。這五個裡真正填空白的是 **free-crypto-news**（結構化 crypto 新聞 API，可直接接進 pipeline）與 **RSSAggregatorforWeb3**（Web3 專案／VC／研報的 RSS 種子清單）。
- 但這個空白值不值得填，取決於你有沒有真的在追加密市場。若沒有，這五個對現況的增量接近零。

**一句話結論**：五個裡三個是已有工具的重複品，兩個填的是「加密領域」這個目前確實空白但未必需要的位置；而那兩個一個停更三年、一個規模很小。整體屬於「看過、知道有這些東西就好」的等級。

---

## 誠實標注

- 本頁是**社群推薦貼文的整理**，五個專案**未逐一實測安裝**，可用性評註基於倉庫說明、既有 vault 分析與現有工具鏈的對照推論。
- 原貼文帶明顯行銷語氣，本頁已剝除。原文的數字宣稱（600+ RSS feed、66 萬+ 篇新聞、200+ 來源、400+ 資訊源）**皆為專案自述，未經驗證**，本頁一律標為「原文宣稱」。
- 星數／推送日期／授權為 2026-07-27 經 GitHub API 實查，這三欄是本頁唯一經過驗證的事實。

---

## 相關筆記

- [[Tools/ai-一手資訊源清單|AI 一手資訊源清單（12 個）]] — 姊妹篇。該篇是 AI 領域的一手來源，本篇是 Web3 × AI 的自動化流水線工具，兩篇互補
- [[Github/repos/TrendRadar — 一鍵部署的 AI 舆情熱點聚合監控助手|TrendRadar 深度分析]] — 本清單第 3 項的完整評估（結論 ⏳）
- [[Github/repos/newsnow — 優雅的即時熱榜新聞聚合器|newsnow 深度分析]] — TrendRadar 的上游資料源，結論 ✅
- [[Tools/last30days|last30days]] — 主動搜尋型社群研究引擎，與本清單多數項目功能重疊
- [[Tools/repo-intel|repo-intel]] — 若日後決定認真評估其中某個專案，用它產出完整情報報告
- [[Github/_index|Github Repo 分析總索引]] — 已分析過的專案都在這裡
