---
source: "https://github.com/wpfbcr/AtlasAgent"
author: "wpfbcr"
stars: "2"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, repo-intel]
---

# AtlasAgent — 全球旅行方法包與日期工具評估

## 一句話說明

由9個 Markdown Skills與4支 Python 工具組成的全球旅行規劃包，涵蓋預算、入境、飲食、交通、天氣、匯率與 PDF。對公司最有價值的是方案比較欄位與資料能力分層，現有工具不足以當真旅程查核引擎。

## 專案概覽

2026-09-10 公開 GitHub REST API 快照，原碼固定於下列 commit；數字不混用搜尋頁快取。

| 項目 | 結果 |
|---|---|
| Repo | [wpfbcr/AtlasAgent](https://github.com/wpfbcr/AtlasAgent) |
| Stars / Forks | 2 / 0 |
| 主要語言 | Python |
| 授權 | MIT |
| 建立／最後推送 UTC | 2026-06-25T09:26:59Z／2026-06-25T12:29:04Z |
| 固定 commit | [64fb3eb09d86877a2706a66a5f90ba85c2b9919d](https://github.com/wpfbcr/AtlasAgent/tree/64fb3eb09d86877a2706a66a5f90ba85c2b9919d) |
| Open Issues／PRs | 0／0；已將PR從open_issues_count分離 |
| 最新 Release | v1.0.0，2026-06-25T12:28:37Z |
| Archived／Fork | 否／否 |
| Topics | agent-skills、ai-agent、cursor、hermes、itinerary、llm、mcp、open-source、travel、travel-planning |
| homepage | [專案首頁](https://github.com/wpfbcr/AtlasAgent#快速上手) |

## Repomix 深度分析

以既有 Repomix 1.18.0 對固定 commit 下載的 source 打包，未壓縮，exit 0。共 44 檔、30,949 tokens、90,442 字元。打包完成不等於逐行審計；本報告深讀主要流程與風險分支。

| Top 5 檔案 | Tokens | 比例 |
|---|---:|---:|
| README.md | 2,323 | 7.5% |
| scripts/md2pdf.py | 2,037 | 6.6% |
| docs/install.md | 1,678 | 5.4% |
| skills/atlas-agent/SKILL.md | 1,558 | 5% |
| scripts/weather_client.py | 1,462 | 4.7% |

Repomix未提示可疑檔案；這不是依賴漏洞、商用授權、資料隱私或供應商安全證明。原始檔與紀錄保存於本機 `D:/Codex/一人旅遊公司/work/repo-intel/travel-seven-20260910/wpfbcr--AtlasAgent/`。

## 核心功能

- 以 atlas-agent 主 Skill 路由至8個領域方法，航班／飯店與進階整合仍是選配。
- Open-Meteo提供天氣與城市定位，Frankfurter提供匯率；沒有API key不代表所有功能、來源與使用條件均已驗證。
- holiday_check.py 計算日期、星期與靜態提示，md2pdf.py 使用 fpdf2輸出文件。
- 比較方案的預算、移動時間、體力、親子等維度，並分 L0參考／L1搜尋與MCP／L2進階來源。

## 技術架構

```text
atlas-agent 主方法 → 領域Skills
                      ├─ weather / currency：公開API
                      ├─ holiday_check：本機規則
                      ├─ 方案比較：文字rubric
                      └─ md2pdf：fpdf2
```
不是常駐多Agent服務；多數能力仍由宿主讀方法並執行。安裝腳本會複製到多個宿主 skills目錄，並可能修改 shell rc 的 ATLAS_ROOT。

## 主要發現與採用限制

1. **天氣查詢沒有旅行起日。** forecast 只有座標、天數與時區，forecast_days最多16，沒有接受旅行出發日期。不能把現在開始的預報拿去回答幾個月後行程；應先核對需求日期是否在來源涵蓋範圍。 [scripts/weather_client.py:42](https://github.com/wpfbcr/AtlasAgent/blob/64fb3eb09d86877a2706a66a5f90ba85c2b9919d/scripts/weather_client.py#L42)

2. **節日提示未依目的地國家過濾。** GLOBAL_PEAKS只按月日查表，城市只影響閉館文字。合成輸入Tokyo／2026-07-14，結果仍附法國國慶提示。程式能計算星期，不等於完成全球國定假日查核。 [scripts/holiday_check.py:28](https://github.com/wpfbcr/AtlasAgent/blob/64fb3eb09d86877a2706a66a5f90ba85c2b9919d/scripts/holiday_check.py#L28)

3. **飲食安全標籤缺少證據狀態。** 綠色標籤意義為符合限制，但方法本身不足以證明餐廳配方或交叉接觸已確認。公司需按旅客與供應商證據保留未確認，不能把模型分類當安全保證。 [skills/dietary-global/SKILL.md:16](https://github.com/wpfbcr/AtlasAgent/blob/64fb3eb09d86877a2706a66a5f90ba85c2b9919d/skills/dietary-global/SKILL.md#L16)

4. **整包安裝會擴張全域落點。** all模式複製到多個AI宿主，之後會改 shell rc；這超出本次研究。固定樹的Release為v1.0.0，Skill metadata另標1.1.0，正式採用需以commit對齊內容。 [scripts/install.sh:40](https://github.com/wpfbcr/AtlasAgent/blob/64fb3eb09d86877a2706a66a5f90ba85c2b9919d/scripts/install.sh#L40)

## 社群健康度

貢獻者端點：API空清單；作者／實際貢獻者數不據此判0。近四週 commit_activity回空物件，列Unknown，不記0。所有7個repo均少於1,000 Stars，依skill條件未啟動社群口碑／YouTube搜尋，不能推論沒有外部使用者。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 比較rubric與官方查核方法可以定向保存 |
| Codex | 主方法與公司travel-dispatch重疊，宜改寫少數段落 |
| Automation | 日期工具可當輔助，但應新增國別與來源日期限制再採用 |
| 公司新增價值 | 以預算／時間／體力／必要體驗解釋取捨，比新增整套Skills更有用 |

對照基準為本次實際讀取的一人旅遊公司 README、HUB、travel-dispatch v5與 docs/geo-integration.md；公司已有正式trip.json、逐段地理契約與三個展示預覽。本輪不採用舊測試數字當現況驗收。

## 安裝建議

⏳ **只挑方法素材，暫緩整包安裝。先改寫方案比較與資料層級，再處理天氣日期、節日範圍、飲食證據與本機相容性；不因零API key宣稱而認定完整免費可用。**

## 驗證與限制

4份Python AST語法解析完成；holiday_check原碼在本機合成案例執行，重現跨國節日提示。天氣／匯率API、入境規則、餐廳、PDF與安裝腳本均未執行或驗定。contributors端點回空清單，不解釋成沒有作者。

共同工具限制：gh CLI因既有設定檔Access denied未取得資料，改用公開REST API；CodeGraph沒有本session可用project，採原碼與Python AST解析，未宣稱CodeGraph結果。未安裝上游、未改正式旅程、未提交或推送、未發布。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|七案比較與採用順序]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|公司架構]]
- [[AI-一人公司/_index|AI-一人公司索引]]
- [[Github/_index|Github分析總索引]]

