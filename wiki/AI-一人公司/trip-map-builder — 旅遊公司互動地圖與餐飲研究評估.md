---
source: "https://github.com/hiyeshu/trip-map-builder"
author: "hiyeshu"
stars: "216"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, repo-intel]
---

# trip-map-builder — 旅遊公司互動地圖與餐飲研究評估

## 一句話說明

把既有行程整理成手機地圖與時間軸的輕量 Skill。對本公司的價值集中在「當天在哪一區、下一站怎麼開導航、附近有哪些餐飲備選」，不具備完整交通查詢、訂單管理或行程可行性驗證。

## 專案概覽

2026-09-10 公開 GitHub REST API 快照，原碼固定於下列 commit；數字不混用搜尋頁快取。

| 項目 | 結果 |
|---|---|
| Repo | [hiyeshu/trip-map-builder](https://github.com/hiyeshu/trip-map-builder) |
| Stars / Forks | 216 / 22 |
| 主要語言 | HTML |
| 授權 | README 宣告 MIT；固定 source tree 無 LICENSE，GitHub license=null，不能寫成完全未提授權 |
| 建立／最後推送 UTC | 2026-04-11T09:06:55Z／2026-07-08T14:07:47Z |
| 固定 commit | [195fff619cb6bc68cf02b64f53456dd922babf46](https://github.com/hiyeshu/trip-map-builder/tree/195fff619cb6bc68cf02b64f53456dd922babf46) |
| Open Issues／PRs | 1／0；已將PR從open_issues_count分離 |
| 最新 Release | 無GitHub Release；不代表沒有tag |
| Archived／Fork | 否／否 |
| Topics | 無 |
| homepage | 未設定 |

## Repomix 深度分析

以既有 Repomix 1.18.0 對固定 commit 下載的 source 打包，未壓縮，exit 0。共 8 檔、18,758 tokens、51,837 字元。打包完成不等於逐行審計；本報告深讀主要流程與風險分支。

| Top 5 檔案 | Tokens | 比例 |
|---|---:|---:|
| assets/template.html | 8,242 | 43.9% |
| references/trip-planning.md | 2,232 | 11.9% |
| SKILL.md | 1,698 | 9.1% |
| references/xhs-research.md | 1,578 | 8.4% |
| README.md | 1,445 | 7.7% |

Repomix未提示可疑檔案；這不是依賴漏洞、商用授權、資料隱私或供應商安全證明。原始檔與紀錄保存於本機 `D:/Codex/一人旅遊公司/work/repo-intel/travel-seven-20260910/hiyeshu--trip-map-builder/`。

## 核心功能

- 先整理日期、航班、飯店及想去清單，按區域分日；餐廳以當日路線與明確指定的用餐目標安排。
- 大眾點評與小紅書補充口味、排隊與氛圍，方法文件把官方營業與票務資訊放在較高來源順位。
- 單一 HTML 的 Leaflet 地圖、日切換、時間軸、支付標籤，以及 Apple Maps／Google Maps／高德導航連結。
- HOME 下另有長期偏好記憶流程，並描述可選部署；這些是上游方法，不是本次操作授權。

## 技術架構

```text
旅客資料 → 規劃文件 → 餐飲研究
                     ↓
              HOTEL / DAYS
                     ↓
          Leaflet 地圖 + 日程卡片
                     ↓
                外部地圖 App
```
核心為 Markdown 方法加 `assets/template.html`，沒有獨立後端。模板直接將結構化資料組成 HTML，Leaflet 與底圖由外部 CDN 提供。

## 主要發現與採用限制

1. **地點連線不等於交通路線。** `L.polyline` 直接連接當日座標；沒有 directions 回應、分段班次或實際通勤時間。因此地圖適合呈現地點順序，不能顯示為已核實步行／大眾運輸路線。公司 v5 的逐段證據仍需保留。 [assets/template.html:365](https://github.com/hiyeshu/trip-map-builder/blob/195fff619cb6bc68cf02b64f53456dd922babf46/assets/template.html#L365)

2. **單檔不等於可完整離線。** Leaflet JS/CSS 由 unpkg 載入，底圖在第296行使用 CARTO。未快取狀態需要網路；本次沒有做斷網、手機與定位權限測試。 [assets/template.html:10](https://github.com/hiyeshu/trip-map-builder/blob/195fff619cb6bc68cf02b64f53456dd922babf46/assets/template.html#L10)

3. **偏好與部署流程不能直接承接。** 上游會讀寫 `~/.trip-map-builder/MEMORY.md`，另有選配部署；公司正式旅程已另有紀錄。整包接入會新增記憶落點，應先改成由現有旅程投影展示，部署依公司授權。 [SKILL.md:24](https://github.com/hiyeshu/trip-map-builder/blob/195fff619cb6bc68cf02b64f53456dd922babf46/SKILL.md#L24)

4. **授權證據需精確描述。** README 的「許可」章節寫 MIT，但固定樹沒有 LICENSE 文件，API 也未辨識。這是授權文件不完整的訊號，不等於已確定禁止使用。研究與互動概念參考可先做；直接複製前補齊授權確認。 [README.md:122](https://github.com/hiyeshu/trip-map-builder/blob/195fff619cb6bc68cf02b64f53456dd922babf46/README.md#L122)

## 社群健康度

貢獻者端點：hiyeshu（API contributions 6）。近四週 commit_activity回空物件，列Unknown，不記0。所有7個repo均少於1,000 Stars，依skill條件未啟動社群口碑／YouTube搜尋，不能推論沒有外部使用者。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 研究結論與餐飲來源適合存 Wiki，旅客偏好不另建第二本記憶 |
| Codex | 只參考展示與餐飲研究方法；不沿用上游 CDP／發布操作預設 |
| Automation | 可考慮由既有展示白名單產生地圖資料；正式 trip.json 不由頁面直接改寫 |
| 公司新增價值 | 對既有 B 每日路線預覽有參考價值；不能取代 geo_contract 或來源到期判定 |

對照基準為本次實際讀取的一人旅遊公司 README、HUB、travel-dispatch v5與 docs/geo-integration.md；公司已有正式trip.json、逐段地理契約與三個展示預覽。本輪不採用舊測試數字當現況驗收。

## 安裝建議

⏳ **暫緩整包安裝；優先參考每日地圖與導航的互動方式，若要複製模板，先釐清 README MIT 宣告與缺少完整 LICENSE 的狀態。**

## 驗證與限制

Repomix 打包與原始碼走讀完成。未執行上游 Skill、OpenCLI、小紅書、大眾點評、地圖渲染、App deep link 或部署。未發現專用測試檔或 CI workflow；這是固定樹觀察，非完整品質審計。

共同工具限制：gh CLI因既有設定檔Access denied未取得資料，改用公開REST API；CodeGraph沒有本session可用project，採原碼與Python AST解析，未宣稱CodeGraph結果。未安裝上游、未改正式旅程、未提交或推送、未發布。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|七案比較與採用順序]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|公司架構]]
- [[AI-一人公司/_index|AI-一人公司索引]]
- [[Github/_index|Github分析總索引]]
