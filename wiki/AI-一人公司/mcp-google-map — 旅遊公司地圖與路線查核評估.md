---
source: "https://github.com/cablate/mcp-google-map"
author: "cablate"
stars: "448"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, mcp]
---

# mcp-google-map — 旅遊公司地圖與路線查核評估

## 一句話說明

值得作為旅遊公司的地理查詢供應器，優先補「地點是否找對、兩點怎麼走、餐廳是否順路」；不適合直接接管行程決策、醫療適用、完整報價或離線交付。建議先改寫方法、再做有限工具試作，不整包照搬。

## 專案概覽

2026-09-10 公開 REST API 快照；網頁快取顯示445 Stars，以下採實際API回傳448，不混用。

| 項目 | 結果 |
|---|---|
| Repo | cablate/mcp-google-map |
| Stars / Forks | 448 / 83 |
| 主要語言／授權 | TypeScript／MIT |
| 建立／最後推送 | 2025-02-22／2026-08-16 |
| 版本 | package 0.0.55；Release v0.0.55，2026-08-16 |
| 固定分析版本 | be966cc49d3649f2c4c371631856eda60fa205a7 |
| Open Issues／PRs | 1／1；API open_issues_count=2包含PR |
| 歸檔／文件首頁 | 未歸檔／無獨立homepage |
| 維護 | 主作者72筆貢獻；另含bot與少數貢獻者，維護集中 |
| 近四週提交 | stats端點回空物件，未知，不記成0 |

來源：[固定版本](https://github.com/cablate/mcp-google-map/tree/be966cc49d3649f2c4c371631856eda60fa205a7)、[Releases](https://github.com/cablate/mcp-google-map/releases)。有持續發布與測試檔，不代表已通過本公司的真案驗收。

## Repomix 深度分析

Repomix 1.18.0未壓縮打包成功：64檔、93,930 tokens、363,883字元；另透過公開API保存固定commit的43份程式／Skills／測試等文字檔。沒有執行上游程式。

| Top 5 | Tokens | 比例 |
|---|---:|---:|
| tests/smoke.test.ts | 10,505 | 11.2% |
| docs/research-ai-place-selection.md | 7,629 | 8.1% |
| skills/google-maps/references/tools-api.md | 6,927 | 7.4% |
| src/services/PlacesSearcher.ts | 6,032 | 6.4% |
| README.zh-TW.md | 4,532 | 4.8% |

打包的安全掃描無可疑檔案不等於安全稽核通過。binary SKILL.skill未納入XML，已讀文字SKILL.md。gh因設定檔Access denied失敗，PowerShell公開HTTPS讀取亦失敗；Node fetch取得公開API成功，沒有讀取或更改帳號設定。無獨立文件站，跳過defuddle；星數未達1000，未啟動社群／YouTube引擎；未用AST索引，採固定來源文字分析。

本機研究落點：`D:/Codex/一人旅遊公司/work/repo-intel/mcp-google-map/`。包含XML、metadata與固定來源；npm cache/temp限定此目錄，已還原程序環境；檔案保留未刪除。

## 核心功能

18個工具：地點搜尋、詳細資料、地址轉座標、距離矩陣、逐段導航、時區、海拔、天氣、空品、靜態地圖，以及沿路搜尋、區域探索、路線規劃、地點比較與local SEO。支援stdio、HTTP及單次exec；工具可用白名單減少暴露範圍。[工具登記](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/src/config.ts)

| 公司缺口 | 可用能力 | 不應宣稱 |
|---|---|---|
| 同名飯店、餐廳找錯 | 搜尋→place_id→地址座標核對 | 第一個搜尋結果一定是正確分店 |
| 只有地址，不知怎麼走 | directions與matrix | 地圖估時就是列車班次、票價或保證抵達時間 |
| 名店不順路 | search_along_route→候選餐廳 | 已證實繞路分鐘、指定用餐時間有營業 |
| 飯店比較只看價格 | compare_places＋到車站／景點的逐段時間 | 知道房型、含稅房價、空房或退訂條件 |
| 行程第一眼看不懂 | 地點序號、路線圖、逐段交通摘要 | static_map是互動導航或已建立Google My Maps |

## 技術架構

```text
AI宿主／改寫後的地理查詢方法
       ↓ stdio 或 exec
工具 schema與ACTION → PlacesSearcher
                       ├─ NewPlacesService → Places API (New)
                       ├─ RoutesService → Routes API
                       └─ toolclass → Geocoding／Timezone／Static Maps等
       ↓ 結構化JSON或地圖影像
公司核對來源與適用條件 → 候選trip → 驗收 → 正式trip → Dashboard
```

Node>=18、TypeScript、Zod、MCP SDK、Google Places SDK與原生fetch；沒有需要公司搬去使用的新旅程資料庫。它也不是獨立大模型規劃引擎：排程判斷主要由宿主AI與Skill方法承擔。[package.json](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/package.json)

## 實作中需要先補的缺陷

以下為原始碼與官方文件交叉查核，未呼叫真API，不當已重現執行結果。

1. **多站transit接口不相容。** `PlacesSearcher.ts:530–541`關閉transit排序仍傳intermediates，`RoutesService.ts:162–165`原樣送出。Google明確不接受transit中途站；`optimize:false`不足以解決。應拆A→B、B→C逐段查詢，後段時間加上參觀、餐食與緩衝，不能所有段都用同一出發時間。[實作](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/src/services/PlacesSearcher.ts#L530)、[Google限制](https://developers.google.com/maps/documentation/routes/transit-route)
2. **少轉乘／少步行尚未接入。** directions只有mode、時間與開車避收費／高速選項；Google已有LESS_WALKING／FEWER_TRANSFERS，但此wrapper沒暴露。應補明確偏好與回傳轉乘、各步行段；即使有偏好也不是無障礙保證。[directions schema](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/src/tools/maps/directions.ts)
3. **多點工具會遺失導航資料。** planRoute組裝結果只留文字路段距離時間，不回傳座標、polyline及詳細步驟；缺leg時寫unknown，但仍回success:true，總時長只加已知段。公司不得把部分合計當完整日負荷；需標partial、expected/resolved legs、保留單位數值與線段。[PlacesSearcher.ts:548–603](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/src/services/PlacesSearcher.ts#L548)
4. **matrix部分錯誤可能變0。** 只特別處理ROUTE_NOT_FOUND，沒有檢查每element.status；其他錯誤元素若無distance/duration，使用`||0`。應依status、condition與欄位完整性保持unknown，不能推論零分鐘到達。[RoutesService.ts:276–301](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/src/services/RoutesService.ts#L276)
5. **沿路搜尋不是已驗證繞路成本。** 實作以route polyline查Places，但沒回routingSummaries或每間候選的增量距離／時間；open_now只是查詢當下。需要按預計用餐時間查營業，再比較A→餐廳→B增量，不直接展示「只繞5分鐘」。[toolclass.ts:164–234](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/src/services/toolclass.ts#L164)
6. **三站預設排序有待修問題。** stops.length>2就開啟排序，包含僅一個中途站；目前有未合併PR #86專門修此條件。試作先關閉排序，兩站／三站／四站分別驗。[PR #86](https://github.com/cablate/mcp-google-map/pull/86)
7. **網路服務不適合原樣對外開放。** CLI的HTTP預設0.0.0.0；server程式將DNS rebinding protection留在註解，沒有看到本層使用者驗證。單人本機優先stdio；不把README可遠端使用當安全部署設定。[HTTP server](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/src/core/BaseMcpServer.ts#L88)

另外，地圖影像是base64回傳，不把API key直接回傳到地圖結果，這點可取；但仍須核查錯誤日誌的憑證遮罩。STATIC MAP以座標串線不保證沿道路；必須用實際route polyline，沒有則明標地點連線示意。海拔點資料不能證明整段無樓梯或坡度適合特定旅客。

## 值得改寫的Agent Skill與員工能力

有價值的方法是「先選重點→按地理區域分天→安排適合時段→沿路找餐廳→補休息→查路線並畫圖」。其使用方法和開發文件分離，也適合公司按需載入。[travel-planning.md](https://github.com/cablate/mcp-google-map/blob/be966cc49d3649f2c4c371631856eda60fa205a7/skills/google-maps/references/travel-planning.md)

| 原方法 | 公司版應怎麼改 |
|---|---|
| 一天一方向、永不折返 | 減少無意義繞路；回飯店午休、回車站與預約優先，允許有理由的折返 |
| 固定每日<10km、5–7站 | 以旅客能力、步行段、站立、樓梯、行李與連續活動時間決定，不用通用上限冒充適用 |
| 用AI知識分配參觀時間 | 營業／休館／日落／入場截止查當期來源；AI只提建議，不認證 |
| transit沒有就改driving/walking | 保留原需求unknown，查當地運輸業者；換模式須明示對成本與時間的影響 |
| 查完都產靜態地圖 | 候選迭代先不重複產圖；日期與地點定版後產一次，另查保留與展示條款 |
| 每個工具回JSON可直接算 | 先識別MCP error、內層success、partial及缺欄位；靜態地圖是image block例外 |

改写應放入現有`transport-planner`（逐段交通）、`experience-curator`（順路餐飲）、`itinerary-designer`（固定預約與休息）、`evidence-reviewer`（未知及來源有效性）與Dashboard展示方法。暫不新增一個取代主模型的全能旅遊Agent；local SEO與此任務無關，不開啟。原Skill自述17工具但表格／config為18，也說明文件不能代替能力檢查。

## 費用、資料保存與現有系統相關性

**查詢唯讀仍會計費。** 路線請求按次、矩陣按起點×終點元素；複合工具會展開多個Google API請求，不能以「一次MCP」計成本。需固定版本、Google Cloud啟用所需API、限制key用途、配置配額與單次任務預算。原始碼固定的詳細Places欄位很多，應按情境縮減field mask，依實際SKU核價，不假設免費。[Google計費](https://developers.google.com/maps/documentation/routes/usage-and-billing)

**現行離線保存設計需先核對相容性。** Google Places對內容儲存、快取與標示有要求，place_id有明確保存例外；repo的MIT並不授權任意保存Google地圖、評論、照片與所有回應。不能把整份結果永久塞进trip.json／Wiki／PDF或任意底圖。先建立按資料類型的保留／重取／attribution政策；若無法保存完整原文，不能偽造符合公司hash證據契約。此處需要針對適用服務及使用方式設計，不是一句「只存本機」即可解決。[Google Places政策](https://developers.google.com/maps/documentation/places/web-service/policies)

| 環境 | 定位 |
|---|---|
| Codex／公司 | 外部地理查詢供應器；結果通過公司核對後才產候選，不直接改正式檔 |
| Obsidian | 存方法、來源連結與允許的識別資訊；不擴大到旅客健康資料或Google內容倉庫 |
| Dashboard | 一日圖＋序號＋逐段交通／步行／休息；顯示未知，不以JSON或假精確總量當主畫面 |
| Automation | 本次不開監控；有需要才依日期重查受影響段，設次數與成本上限 |

查地圖只傳必要地址、座標、日期與交通偏好；不傳旅客姓名、病史、過敏細節。餐廳評價、可訂位旗標、priceLevel與無障礙欄位都是線索，不能代替過敏確認、庫存、票價或個人醫療評估。11月交通可以先查但仍須出發前重查；官方transit預測有查詢時間範圍，也不保證遠期一致。

## 安裝建議

⏳ **暫不整包安裝；建議核准後做有限試作。** 最適合先做的六項是geocode、search_places、place_details、directions、distance_matrix、search_along_route；靜態圖等保存政策與真線段接通後再加。

先以公開假設行程做兩天試作，一個同城步行日、一個含火車跨城日，不使用私人旅客資料。驗收至少包括：同名分店消歧義、三站transit分段、跨時區日期、固定訂票時段、不營業餐館、部分矩陣錯誤、缺route leg、步行加休息、Key遮罩、呼叫成本與圖文同版。預期結果是讓人看懂怎麼走並保留未證實項；不是工具能啟動就算採用。

本輪已完成公開原碼研究與報告；未安裝MCP、未配置API key、未實跑上游tests或Google付費查詢，未更改公司程式、Skills或正式行程。Windows執行與手機地圖展示仍未驗。

## 相關連結

- [[AI-一人公司/_index|AI-一人公司索引]]
- [[AI-一人公司/FlyAI — 旅遊公司查詢工具與補強評估|FlyAI查詢工具評估]]
- [[AI-一人公司/claude-trip-skills — 旅遊服務方法與流程補強評估|旅遊方法與流程評估]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|旅遊公司架構]]
