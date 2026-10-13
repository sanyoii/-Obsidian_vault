---
source: "https://github.com/zexuanw958-svg/travel-plan-viz"
author: "zexuanw958-svg"
stars: "369"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, visualization]
---

# travel-plan-viz — Migo行程視覺化與展示層採用評估

## 一句話說明

**Migo 是目前這批專案中，最值得優先作為公司 HTML 展示層候選的輕量參考；建議有限改寫，暫不整包安裝。** 它把地圖、提醒、校驗拆成小型模組，另有內嵌行程資料的回讀契約、完整 MIT 文件和單元測試，比單純地圖模板更容易隔離使用。但已重現地理範圍、日期與校驗覆蓋缺口，四份上游範例也未通過當版校驗器。

本輪是固定版本研究與本機診斷，沒有安裝 Skill、整合公司頁面或修改正式旅程。此為前一輪七案的第八個研究候選，前七案仍保留各自分析時點。

## 專案概覽

2026-09-10 公開 GitHub REST API 快照。

| 項目 | 結果 |
|---|---|
| Repo | [zexuanw958-svg/travel-plan-viz](https://github.com/zexuanw958-svg/travel-plan-viz) |
| Stars / Forks | 369 / 13 |
| 主要語言 | JavaScript |
| 授權 | MIT；固定原碼有完整 LICENSE |
| 建立 | 2026-06-13T10:40:30Z |
| Repository最後推送 | 2026-09-10T07:22:03Z |
| 分析主線最新commit時間 | 2026-07-15T05:16:15Z |
| 固定commit | [07d0155080f72607a6f0a74e063bd05c850dcf01](https://github.com/zexuanw958-svg/travel-plan-viz/tree/07d0155080f72607a6f0a74e063bd05c850dcf01) |
| 預設分支／Archived／Fork | main／否／否 |
| Open Issues／PRs | 1／0 |
| GitHub Release | 無；未另外查全部tag |
| Contributors | zexuanw958-svg，API contributions 58；不當成完整合著人統計 |
| Topics | agent-skill、claude-code、claude-skill、codex、html、itinerary、migo、mobile-first、offline-first、travel、trip-planner |
| 獨立homepage | 未設定 |

**最後推送9/10不等於主線程式9/10更新。** 本次HEAD的committer日期為7/15。repo有每日重繪Star圖的workflow，但未逐一追查9/10那次push，因此不斷言該push一定由排程造成。近四週commit_activity回空物件，列Unknown。唯一open issue [#2](https://github.com/zexuanw958-svg/travel-plan-viz/issues/2)只是使用者分享另一個Mac App repo，沒有可直接用來判斷品質的回報內容。

來源：[metadata API](https://api.github.com/repos/zexuanw958-svg/travel-plan-viz)、[固定commit](https://github.com/zexuanw958-svg/travel-plan-viz/commit/07d0155080f72607a6f0a74e063bd05c850dcf01)、[授權](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/LICENSE#L1)。

## Repomix 深度分析

既有Repomix 1.18.0，未壓縮打包，exit 0。共24個文字檔、142,411 tokens、374,725字元。四份範例HTML合計79,650 tokens，約55.9%；因此整包token規模不能代表核心引擎複雜度。map.js、reminders.js、validate.js合計332行。

| Top 5 | Tokens | 比例 |
|---|---:|---:|
| samples/shenzhen-3d2n-real.html | 21,332 | 15.0% |
| samples/hongkong-4d3n-real.html | 19,937 | 14.0% |
| samples/chengdu-4d3n-real.html | 19,348 | 13.6% |
| samples/tokyo-5d4n-real.html | 19,033 | 13.4% |
| README.md | 5,746 | 4.0% |

Repomix未提示可疑檔案，不等於依賴、網站、素材權利或資料安全驗證。深讀範圍包含全部三個引擎、三份測試、Skill、page-contract及research-guide；範例做CLI校驗與必要原碼定位，沒有逐份視覺審查。

## 核心功能

- **兩種入口**：從目的地與天數規劃，或把已有計畫轉成HTML；已有計畫模式只提少數可選建議，不預設重排。
- **資料回讀**：契約要求完整trip JSON內嵌於application/json區塊，後續修改從資料解析，避免由DOM反推時遺失欄位。
- **三個小模組**：Leaflet編號點位／導航、UTC提前提醒日期／清單、資料與HTML標記校驗。
- **完整展示內容**：每日時段、餐飲、待選航班、住宿區域與價格帶、行前須知及貼士。
- **明示離線範圍**：文字行程可離線讀；Leaflet、瓦片與照片仍依賴網路，要求失敗時降級。
- **選配來源**：可接宿主已安裝的旅行工具；本repo沒有內建即時機票、訂房或交易後端。

來源：[SKILL.md](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/SKILL.md#L12)、[page-contract.md](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/page-contract.md#L1)。

## 技術架構

```text
既有行程／公開研究
        ↓
    trip 資料契約
        ↓
AI設計步驟產生HTML（無固定完整renderer）
        ├─ 內嵌 trip-data JSON
        ├─ map.js → Leaflet／瓦片／導航URL
        └─ reminders.js → 日期／清單
        ↓
 validate.js：結構與文字標記檢查
        ↓
       單檔HTML
```

沒有package.json、npm依賴安裝或獨立伺服器的必要；Node執行純函式測試與校驗，瀏覽器呈現仍要Leaflet CDN。HTML視覺由AI設計步驟產生，不能因引擎穩定就假定每次排版一致。map.js的折線仍只是點位順序，不含真正directions路徑。

## 主要發現與採用限制

### 1. 地理範圍判定會誤移除Google Maps選項

map.js:40用isInChinaBBox決定只給高德或同時給Google；其範圍是經度72.004–137.8347、緯度0.8293–55.8271的矩形，涵蓋許多原本應落入另一分支的城市。

直接呼叫未修改的上游模組，得到：

| 座標案例 | buildMapAppLinks的App選項（另有通用導航連結） | gcj02ToWgs84呼叫結果 |
|---|---|---|
| Taipei 25.033,121.5654 | 只有高德 | 座標被改動 |
| Osaka 34.6937,135.5023 | 只有高德 | 座標被改動 |
| Bangkok 13.7563,100.5018 | 只有高德 | 座標被改動 |
| Tokyo 35.6595,139.7005 | Google＋高德 | 原值保留 |

這是程式分支與回傳值重現，沒有操作任何地圖App。尤其公司關西行程會直接遇到大阪案例。應把「要提供哪些導航App」與「來源座標系是否要轉換」分開；保留來源CRS，只對明確需要轉換的座標處理一次，不能拿矩形範圍代替適用區域。不是所有資料都會自動進轉換函式，但當上游研究指南要求轉換時，這個假設會影響資料。

來源：[map.js:29–51](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/map.js#L29)、[轉換函式](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/map.js#L69)、[上游轉換指示](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/references/research-guide.md#L20)。

### 2. 日期格式通過，不代表日期存在或提醒合理

validateTrip只核對YYYY-MM-DD文字格式，leadDays只確認是number。直接重現：

- startDate與day.date為2026-02-31：errors與warnings皆空；提醒引擎按JavaScript日期正規化後，提前1天算出2026-03-02。
- startDate為2026-07-15、leadDays=-7：同樣零錯誤／警告，提醒期限落在2026-07-22，比出發晚7天。

採用前至少驗真實日曆日期、有限且非負整數的leadDays、每日順序及與起日的一致性。上游是「出發前」提醒，統一從startDate倒推；不能將其誤稱為每項票務依個別活動日期計算的放票期限。

來源：[validate.js:15](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/validate.js#L15)、[leadDays檢查](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/validate.js#L26)、[reminders.js:6](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/reminders.js#L6)。

### 3. 機械校驗只能當初步檢查

validateHTML用indexOf找函式名稱、Leaflet與media等字串，沒有檢查實際執行、DOM或必需內容是否可見。我構造只有trip JSON與註解的HTML，把必要字串放在註解，沒有地圖容器、可見內容、CSS或可執行JS。validateAll回errors=[]、warnings=[]，CLI回「契約校驗通過」。

這不表示校驗器一無是處：它能抓缺欄位、座標越界和基本標記；但不能作為公司「頁面已能用」的驗收門檻。需另驗真正DOM、可讀內容、CSS載入與互動，亦不可用免責聲明替代來源查核。

來源：[validate.js:88](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/validate.js#L88)。反例保存在本機synthetic-empty-page.html；未用瀏覽器截圖驗證。

### 4. 四份範例全部落後於當版契約

以當前validate.js分別檢查成都、香港、深圳、東京範例，**四次均exit 1**，共同缺少trip-data JSON區塊與gcj02ToWgs84內聯標記。東京範例仍在普通script裡以const trip宣告資料。

這證明範例與新版契約不同步，不證明它們一定無法在瀏覽器開啟。也不能把README範例當「當版可回讀與反覆修改」的成功證據。應先更新範例，將所有sample校驗接入測試；目前唯一workflow是Star圖，沒有自動執行本次這些測試的CI。

來源：[samples目錄](https://github.com/zexuanw958-svg/travel-plan-viz/tree/07d0155080f72607a6f0a74e063bd05c850dcf01/samples)、[東京範例:1200](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/samples/tokyo-5d4n-real.html#L1200)、[唯一workflow](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/.github/workflows/star-history.yml#L1)。

### 5. 來源責任與公司規則不相容

research-guide要求官方Skill回傳的即時性由對方負責，本層不再覆核；page-contract的dataSources也只有name／scope／realtime等展示資訊，沒有公司的查詢時間、有效期限、適用旅客與訂單證據鏈。來源工具自稱官方或即時，不能解除公司對班次、價格口徑、日期與適用範圍的核對責任。

把完整trip JSON嵌進HTML有利回讀，但若直接嵌公司的正式旅程，會造成私人欄位外流風險。應先由既有展示白名單投影，頁面只攜帶可分享欄位及版本識別；回傳HTML的修改需走候選與重驗，不能直接覆蓋trip.json。

來源：[research-guide.md:24](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/references/research-guide.md#L24)、[資料契約](https://github.com/zexuanw958-svg/travel-plan-viz/blob/07d0155080f72607a6f0a74e063bd05c850dcf01/travel-plan-viz/assets/page-contract.md#L1)。本次沒有傳入或匯出真旅客資料。

## 社群健康度

369 Stars／13 Forks為API快照。貢獻集中於單一帳號；沒有GitHub Release。21個單元測試確實可在本機執行，但四個範例失敗與沒有測試CI，說明仍有同步維護缺口。依repo-intel規則，<1000 Stars不啟動社群／YouTube引擎；沒有外部實際採用度或口碑結論。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 保存方法、比較與失敗證據；HTML內嵌資料不能取代Wiki或公司正式紀錄 |
| Codex | 模式B比較符合公司：把已規劃的資料變成頁面，主模型仍擁有規劃與驗收 |
| Automation | 三個小模組可隔離改寫；不要全盤接受上游的來源免覆核及靜態期限預設 |
| 公司 | 保留trip.json、revision/hash與展示白名單，新增候選展示層；不改交易狀態 |
| 已有展示預覽 | 本輪只比較能力與接線；既有選版與整合狀態不由研究重新決定 |

與前七案的差異：

| 項目 | travel-plan-viz | trip-map-builder | travel-guidebook |
|---|---|---|---|
| 主用途 | 手機行程HTML、提醒、可回讀資料 | 每日地圖、導航與餐飲研究 | 閱讀章節、A4與PDF |
| 可隔離邏輯 | 三個小JS模組，21單測已重跑 | 主要為整頁HTML模板 | 簡短PDF腳本＋方法 |
| 授權證據 | 完整MIT文件 | README MIT、缺完整LICENSE | 完整MIT文件 |
| 本輪判斷 | **HTML展示候選優先**，先修上述缺口 | 互動與選餐方法參考 | **PDF／列印主要參考** |

前兩個既有repo結論來自本session前一輪固定版本分析，這輪沒有重新取得它們的最新HEAD；上述比較不表示已刷新七案。

## 安裝建議

⏳ **優先有限試作，不整包安裝。** 對HTML展示的補強價值高於trip-map-builder：模組小、授權清楚、有資料回讀契約與實際可跑測試；PDF則仍以travel-guidebook為主要參考。

若後續核定實作，最小範圍是：既有trip.json → 展示白名單 → 一日合成HTML；先修地理分支、CRS、真日期與leadDays限制，再驗頁面內容、離線退路與資料回讀。需加入台北／大阪／曼谷／東京、非法日期、空白HTML與四份sample的回歸案例。**本輪沒有執行這些修正或整合。**

## 驗證與限制

| 檢查 | 命令／方法 | 結果 |
|---|---|---|
| Metadata／固定原碼 | 公開REST API＋commit archive | 完成 |
| Repomix | 既有1.18.0，原碼未壓縮打包 | exit 0，24檔 |
| 上游單元測試 | node --test --test-isolation=none test/map.test.js test/reminders.test.js test/validate.test.js | exit 0；21 Pass／0 Fail |
| 成都範例 | node travel-plan-viz/assets/validate.js samples/chengdu-4d3n-real.html | exit 1 |
| 香港範例 | 同命令，hongkong-4d3n-real.html | exit 1 |
| 深圳範例 | 同命令，shenzhen-3d2n-real.html | exit 1 |
| 東京範例 | 同命令，tokyo-5d4n-real.html | exit 1 |
| 直接原模組診斷 | 本機probe.cjs：地理、非法日期、負leadDays、空內容HTML | 4組問題重現，JSON已保存 |
| 真瀏覽器／手機／導航App／斷網 | 未執行 | Not Run |
| 真模型／旅遊工具／即時班次價格／素材授權 | 未執行 | Not Run |
| 公司整合／安裝／Git／發布 | 未執行 | Not Run |

gh設定權限與CodeGraph session project限制已在本session前一輪確認；這輪沿用成功的公開API與直接原碼路線，沒有重試或宣稱它們恢復。未設定獨立homepage，Defuddle不觸發；未安裝任何新套件。

本機證據根：[travel-plan-viz研究目錄](D:/Codex/一人旅遊公司/work/repo-intel/travel-plan-viz-20260910/)。包含固定source、evidence.json、Repomix XML與log、每個上游檢查的獨立exit code、probe反例和寫入前備份。資料保留，未清理。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|前七案比較]]
- [[AI-一人公司/trip-map-builder — 旅遊公司互動地圖與餐飲研究評估|trip-map-builder分析]]
- [[AI-一人公司/travel-guidebook — 旅遊公司閱讀與列印交付評估|travel-guidebook分析]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|公司架構]]
- [[AI-一人公司/_index|AI-一人公司索引]]
- [[Github/_index|Github分析索引]]
