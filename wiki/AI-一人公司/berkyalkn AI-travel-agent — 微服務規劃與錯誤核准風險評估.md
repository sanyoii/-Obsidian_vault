---
source: "https://github.com/berkyalkn/AI-travel-agent"
author: "berkyalkn"
stars: "2"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, repo-intel]
---

# berkyalkn AI-travel-agent — 微服務規劃與錯誤核准風險評估

## 一句話說明

React＋FastAPI＋LangGraph 的獨立旅行規劃應用，後接航班、住宿、活動、事件與地理服務。雖然展示的系統分工完整，現有錯誤處理不足以接管公司的預算與就緒判定。

## 專案概覽

2026-09-10 公開 GitHub REST API 快照，原碼固定於下列 commit；數字不混用搜尋頁快取。

| 項目 | 結果 |
|---|---|
| Repo | [berkyalkn/AI-travel-agent](https://github.com/berkyalkn/AI-travel-agent) |
| Stars / Forks | 2 / 1 |
| 主要語言 | Python |
| 授權 | API未辨識，固定source tree及README未查得明確授權；不作授權法律結論 |
| 建立／最後推送 UTC | 2025-07-26T16:19:11Z／2026-02-10T11:46:41Z |
| 固定 commit | [03c7b46cad41ccf165498f07274bdf4de38a279e](https://github.com/berkyalkn/AI-travel-agent/tree/03c7b46cad41ccf165498f07274bdf4de38a279e) |
| Open Issues／PRs | 0／0；已將PR從open_issues_count分離 |
| 最新 Release | 無GitHub Release；不代表沒有tag |
| Archived／Fork | 否／否 |
| Topics | 無 |
| homepage | 未設定 |

## Repomix 深度分析

以既有 Repomix 1.18.0 對固定 commit 下載的 source 打包，未壓縮，exit 0。共 62 檔、38,667 tokens、150,887 字元。打包完成不等於逐行審計；本報告深讀主要流程與風險分支。

| Top 5 檔案 | Tokens | 比例 |
|---|---:|---:|
| server/nodes.py | 8,225 | 21.3% |
| README.md | 3,376 | 8.7% |
| client/src/App.css | 1,933 | 5% |
| server/services/flight-service/main.py | 1,561 | 4% |
| server/schemas.py | 1,303 | 3.4% |

Repomix未提示可疑檔案；這不是依賴漏洞、商用授權、資料隱私或供應商安全證明。原始檔與紀錄保存於本機 `D:/Codex/一人旅遊公司/work/repo-intel/travel-seven-20260910/berkyalkn--AI-travel-agent/`。

## 核心功能

- 將自然語言轉為 TripRequest，並行查航班、飯店與活動事件。
- Groq／Gemini 分擔規劃、資料選取、排程與預算取捨，再輸出 Folium 地圖與報告。
- 外部查詢主要使用 RapidAPI 的 Booking.com 相關服務、Ticketmaster、Tavily 與地理服務；不能把第三方包裝稱作已簽約官方供應商介面。
- 有 Docker Compose、OpenShift與 Prometheus／Grafana 配置，屬獨立部署產品。

## 技術架構

```text
React → FastAPI / SSE → LangGraph
                         ├─ flights / hotels / events
                         └─ activities → geocoding
                                      ↓
                              scheduler → evaluator
                                      ↓      ↖ 有界重排
                                Folium + report
```
`server/agent.py` 定義 graph，`server/nodes.py` 集中主要業務，五個子服務透過 HTTP 查詢。CI 的主要內容是建置並推送容器，沒有因此取得業務正確性證據。

## 主要發現與採用限制

1. **評估出錯直接 APPROVE。** 沒有 tool_calls 或 evaluator exception 都回傳 APPROVE。隔離案例將預算設100、已選成本設1,000，兩種情境仍核准。採用前必須改成 error／needs_review，禁止形成 ready。 [server/nodes.py:562](https://github.com/berkyalkn/AI-travel-agent/blob/03c7b46cad41ccf165498f07274bdf4de38a279e/server/nodes.py#L562)

2. **查無航班／飯店可能先崩潰。** 前段查詢失敗允許 selected_flight／selected_hotel 為 None，但評估器在 try 前直接取 price。合成 None 航班已重現 AttributeError。應把來源失敗、空結果與選擇未完成當成明確状态。 [server/nodes.py:496](https://github.com/berkyalkn/AI-travel-agent/blob/03c7b46cad41ccf165498f07274bdf4de38a279e/server/nodes.py#L496)

3. **重排次數到頂直接結束。** 達 MAX_REFINEMENTS 後回 end，不能因此認定預算問題已解決；APPROVE 提示也容許部分超支。公司應保留限制未滿足狀態，由使用者決定是否改預算。 [server/nodes.py:589](https://github.com/berkyalkn/AI-travel-agent/blob/03c7b46cad41ccf165498f07274bdf4de38a279e/server/nodes.py#L589)

4. **建置部署不是旅程驗收。** workflow 建置與推送多個 Docker image，未包含上述錯誤分支的業務測試。另有未釘版本的 server requirements，整包導入增加依賴與維運負擔。 [.github/workflows/ci-pipeline.yml:1](https://github.com/berkyalkn/AI-travel-agent/blob/03c7b46cad41ccf165498f07274bdf4de38a279e/.github/workflows/ci-pipeline.yml#L1)

## 社群健康度

貢獻者端點：berkyalkn（API contributions 143）。近四週 commit_activity回空物件，列Unknown，不記0。所有7個repo均少於1,000 Stars，依skill條件未啟動社群口碑／YouTube搜尋，不能推論沒有外部使用者。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 保存微服務分層與反面案例即可 |
| Codex | 現有檔案公司不需要再架一套聊天前後端 |
| Automation | 錯誤核准模式與現有就緒／來源狀態相衝突 |
| 公司新增價值 | 多服務的部署成本高，尚無足夠可靠性新增價值 |

對照基準為本次實際讀取的一人旅遊公司 README、HUB、travel-dispatch v5與 docs/geo-integration.md；公司已有正式trip.json、逐段地理契約與三個展示預覽。本輪不採用舊測試數字當現況驗收。

## 安裝建議

❌ **不建議導入公司。維運層次重、沒有查得明確授權文件，且核心評估有錯誤即核准與空值崩潰。僅作 Agent 狀態設計與失敗案例參考。**

## 驗證與限制

15份 Python 檔案 AST語法解析完成；三個 evaluator 合成分支重現。沒有執行完整 graph、外部服務、Docker、CI、前端或真模型。這三個案例是抽取原函式配 stub 的控制流程檢查，不是整套系統 E2E。

共同工具限制：gh CLI因既有設定檔Access denied未取得資料，改用公開REST API；CodeGraph沒有本session可用project，採原碼與Python AST解析，未宣稱CodeGraph結果。未安裝上游、未改正式旅程、未提交或推送、未發布。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|七案比較與採用順序]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|公司架構]]
- [[AI-一人公司/_index|AI-一人公司索引]]
- [[Github/_index|Github分析總索引]]

