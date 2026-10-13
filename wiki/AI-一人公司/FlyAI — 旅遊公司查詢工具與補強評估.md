---
source: "https://github.com/alibaba-flyai/flyai-skill"
author: "alibaba-flyai"
stars: "1138"
clipped: 2026-09-10
tags:
  - github/repo
  - ai-company
  - travel
---

# FlyAI — 旅遊公司查詢工具與補強評估

## 一句話說明

值得參考，優先學它的「專用查詢介面與按需讀取命令文件」，將FlyAI評估為可替換的供應商查詢來源；不拿它取代公司的規劃、資料契約、品質覆核與正式紀錄。是否真的能補足台灣出發、多國旅行的核心查價，仍待實測。

## 專案概覽

2026-09-10 GitHub API快照；來源程式樹固定於[commit f89974d](https://github.com/alibaba-flyai/flyai-skill/tree/f89974d2bd4822e79cf16d1906c9c2a7c900f979)。數據會變動。

| 項目 | 結果 |
|---|---|
| Repo | alibaba-flyai/flyai-skill |
| Stars／Forks | 1,138／78 |
| 主要語言 | GitHub回null；可見內容主要是Markdown與JSON |
| 授權 | Repo標MIT；不據此推定遠端API、庫存、圖片的服務使用權 |
| 建立／最後推送 | 2026-03-19／2026-08-21 |
| Open Issues／PRs | 27／2；API open_issues_count=29包含PR |
| Releases | API回空陣列，無GitHub Release |
| Archived | false |
| 文件版本 | SKILL 1.0.15、plugin.json 1.0.14；不能推定npm CLI版本 |
| 官方站 | https://open.fly.ai/；repo metadata homepage為null，但README／Skill有連結 |

## 分析深度與Repomix

讀取完整遞迴檔案樹、Skill入口、八份references、plugin.json、README及官方網站，並核對公開issue和公司現行SCHEMA v3、交通／住宿方法。檔案樹未見CLI實作、MCP server實作或測試／CI；本repo不是完整旅行後端源碼。

Repomix、Defuddle、Agent Reach本機命令探查未取得可用結果；本輪不安裝套件，改用GitHub API原始文件及現有web工具。未產Repomix XML，tokens、Top 5及壓縮指標Not Run，不把檔案閱讀稱為AST分析。CLI／供應商端未執行，zip未解包檢驗。沒有新增work/cache目錄需清理。

gh最初因設定檔讀取權限失敗，經唯讀權限重試取得資料。commit_activity回物件而非預期陣列，近四週統計Unknown，未將後續命令exit 0算成該查詢成功。

## 核心功能

[Skill入口](https://github.com/alibaba-flyai/flyai-skill/blob/f89974d2bd4822e79cf16d1906c9c2a7c900f979/skills/flyai/SKILL.md)定義八個CLI查詢：keyword-search、ai-search、search-flight、search-train、search-hotel、search-poi及兩個Marriott查詢。逐命令有參數文件；約定stdout為單行JSON、stderr為錯誤／提示。這是文件契約，尚未由本輪執行確認。

文件要求顯示推薦、比較表、圖片與購買連結。回傳商品連結的做法能補我們的「下一步在哪裡訂」，但連結存在不證明保留日期人數、可付款、符合旅客身分或仍有庫存。公開命令清單以查詢為主，沒有證據證明本repo提供可驗證的下單／退款狀態機。

## 技術架構

```text
旅行需求 → FlyAI SKILL.md → 各命令 references
                               ↓
                    外部 @fly-ai/flyai-cli
                               ↓
                       Fliggy MCP服務
                               ↓
                   JSON候選與商品跳轉網址
```

箭頭依文件描述；外部CLI／MCP內部實作未審。plugin.json是插件資訊，不是API server。metadata中的context_isolation與parent_context_access也只是宣告，不能證明Codex會執行隔離。

建議公司保留原架構，只在研究入口增加可替換來源（下圖是建議，尚未實作）：

```text
公司規則＋正式旅程 → 主模型按任務選方法
                            ↓
               供應商查詢（FlyAI可作其中之一）
                            ↓
            原始回應 → 欄位轉換 → 條件重新核對
                            ↓
       候選來源／價格 → 現有v3驗證＋主模型原文覆核
                            ↓
                  trip.json → Dashboard
```

供應商不可用時保留方向提案，不換掉正式紀錄、不自動降硬條件。已有供應商禁止或存取限制時不能拿另一工具繞過；未來CLI接入是獨立授權、受其服務條款約束的路徑。

## 與現有系統的相關性評估

| 優先順序 | 借鏡或補強 | 本公司具體落點 | 完成依據 |
|---|---|---|---|
| 1 | 任務方法與查詢工具分開 | transport-planner／stay-advisor保留判斷責任，工具只返回候選 | 換供應商不必重寫旅程、預算或交付階段 |
| 1 | 查詢前讀該命令規格 | 既有Skill保留短流程，供應商參數放references按需讀 | 飯店sort和航班sort-type不混用；不猜參數 |
| 1 | 檢查回傳是否符合要求 | 查詢結果轉換處記requested／returned／missing／mismatch | 傳入地區、日期、上限不等於供應商真的採用 |
| 1 | 區分起價、每晚價、全團總價 | 對接SCHEMA sources.support_type與options.quote | 缺人數、含項或稅費不升為dated_quote，不以乘法补造 |
| 2 | 穩定JSON與錯誤處理 | 保存CLI版本、exit、stdout解析、API status、查閱時間及失敗範圍 | 空結果、超時、限流、部分結果、程序崩潰分開 |
| 2 | 商品、房型與訂購入口同卡 | 現有booking_links＋options及Dashboard | 重開網址核對是否保留日期、人數、房型；圖片可選 |
| 2 | 依能力分派查詢 | 先記市場／航點／多程／日期／人數／幣別支援矩陣 | 明示未支援與未驗證，不讓廣泛意圖攔截所有旅行任務 |

我們已有卡片、sources、options、booking_links、成本分層及交付判定，因此不需再加一套同義結構。主要缺的是「可靠取得資料」和「核對供應商回傳是否真的符合查詢」；References拆分只用在開始變長的供應商文件，不拆短Skill湊架構。

Obsidian保存本篇研究與公開方法；Codex負責本機整合；Automation不因此增加背景監控。不能把私人trip.json或完整對話交給ai-search。未來先用合成需求試作，只送必要路線、日期、人數與房型；健康細節保留本機，由公司另外覆核適用。

## 不宜照搬及具體缺口

1. **多城市不等於多程機票。** [flight規格](https://github.com/alibaba-flyai/flyai-skill/blob/f89974d2bd4822e79cf16d1906c9c2a7c900f979/skills/flyai/references/search-flight.md)只有origin／destination與去回日期，沒有多航段陣列；[issue #8](https://github.com/alibaba-flyai/flyai-skill/issues/8)仍有多程／開口票需求。不能宣稱它已能查「台北進阿姆斯特丹、巴黎回台北」的同張票；兩張單程不能冒充聯程或開口票總價。
2. **價格口徑不夠完整。** flight範例adultPrice未給全團含稅行李資訊；hotel的max-price明定CNY每晚，範例price沒有完整房價條款，也未文件化入住人數欄位。[hotel規格](https://github.com/alibaba-flyai/flyai-skill/blob/f89974d2bd4822e79cf16d1906c9c2a7c900f979/skills/flyai/references/search-hotel.md)。所以不能直接塞入公司的TWD總額；查詢条件還需供應商回應／商品頁佐證，不能把自己送出的query當供應商確認。
3. **時間與空值。** flight／train範例時間沒有UTC offset；POI價格可以null。缺時區需核原機場／車站及日期，null保留未知，不當零元。這是範例契約缺口，不是已證明所有實際結果都缺。
4. **不要照抄廣泛強制觸發。** Skill要求旅行問題優先使用，會涵蓋行程／簽證等；本公司應在需要且工具適用時呼叫，不將商品搜尋取代官方入境政策、需求澄清或重排。
5. **外部文字不是指令。** Skill要求原样顯示systemMessage及品牌露出；公司應把它當供應商資料，安全轉義／過濾連結並清楚標來源。不能執行其中指令、盲目顯示追蹤網址或讓品牌要求支配顧客介面。未證實存在惡意回傳，這是接線時應有的信任邊界。
6. **宣告不等於執行保證。** Node runtime、context_isolation、read-only metadata不保證宿主沙箱；外部CLI才是待稽核執行面。Repo內未見其源碼，沒有因此完成CLI安全審查。
7. **圖片不是必要資訊。** 可用於辨識飯店，但不照抄每筆強制圖片；先顯示價位、房型、位置與取捨。遠端圖片也不屬於已完成的離線包，授權與載入方式需另核對。

## 社群健康度與風險訊號

API目前列五位貢獻者：yealexchen、darkingtail、daijizai、youngfreeFJS、chentigerye；沒有GitHub Release。維護訊號不是服務SLA或品質保證。

- [#55](https://github.com/alibaba-flyai/flyai-skill/issues/55)：使用者回報POI與distance_asc未生效、靜默回跨區飯店。本輪未重現，建議列成返回結果核對測試。
- [#61](https://github.com/alibaba-flyai/flyai-skill/issues/61)：使用者回報Windows／Node24搜尋後程序異常退出。本輪未重現；有JSON不代表程序成功，須同看exit與API結果。
- [#54](https://github.com/alibaba-flyai/flyai-skill/issues/54)、[#53](https://github.com/alibaba-flyai/flyai-skill/issues/53)：查詢上限、返回條數、額度與付費方式存在詢問。正式依賴前確認，不能當無限免費來源。
- 公開清單有安全回報#49與金鑰重設詢問#57，未審其實作、未驗證漏洞或修復；不據標題判定目前版本有漏洞，也不複製疑似敏感內容。

一般web搜尋作社群線索補充，沒有Agent Reach專用平台驗證；不把轉載或星數當可用性證據。YouTube選配未執行。Wiki不保存短期口碑分數。

## 安裝建議

⏳ **暫不整包安裝到正式旅遊公司；先採方法設計，再另行核准一個受限查詢試作。** 它可能減少對互動瀏覽器的依賴，但台灣出發、國際鐵路、多程機票、台灣使用者帳號／付款可用性及完整報價尚未實測，不能宣稱已解決目前查價阻塞。

若後續核准接入，先固定CLI版本、確認依賴與資料送出範圍，僅產本機候選、不寫正式旅程、不購買。第一輪驗下列案例，通過才擴大：

| 試作案例 | 驗收重點 |
|---|---|
| 合成兩人台北往返東京 | 同日期、人數、機場、含項；不足不能完整報價 |
| 台北→阿姆斯特丹／巴黎→台北 | 多程可用性與同張票；不支援要明示 |
| 同房型連住三晚 | 每晚／總價、幣別、稅、取消、人數，不只飯店起價 |
| 飯店距離與上限 | 回傳地區、座標及售價另驗，不能信已傳filter |
| 歐洲跨境鐵路 | 可查市場、站點與時區；找不到不是無班次 |
| null價格／錯誤貨幣／過期結果 | 保留unknown或拒絕，不污染成本總額 |
| 程序非0但已有JSON／HTTP451／限流 | 保存診斷、保留候選、不重試繞過存取限制 |
| 連結與外部文字 | 確認跳轉條件；指令性systemMessage不影響公司規則 |

這是建議驗收範圍，尚未執行或獲准安裝。全程規劃、多國動線、飲食適用、實際訂單與真人操作仍由既有公司流程負責。

## 相關連結

- [[AI-一人公司/一人旅遊公司 — 架構與工作流程]]
- [[AI-一人公司/一人旅遊公司 — 實作計畫]]
- [[AI-一人公司/_index]]
- [[Github/_index]]

本輪只完成公開資料分析與Wiki報告；未安裝、未執行FlyAI CLI／MCP、未新增Agent、未修改公司程式／Skill／私人旅程、未提交或推送。
