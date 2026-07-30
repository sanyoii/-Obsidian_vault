# 雷曼兄弟內部交易培訓手冊 — 投行實務的一手教材

> **來源文章：** 倫敦黑貓 London Black Cat《雷曼外匯與選擇權交易實戰手冊流出》
> https://londonblackcat.substack.com/p/e7b （2026-07-29，免費）
> **一手文件：** Lehman Examiner Report 文件庫（Jenner & Block 原建，Stanford 保存副本）
> https://web.stanford.edu/~jbulow/Lehmandocs/menu.html
> **本地副本：** `raw/sources/lehman-manuals/`（三份手冊已下載並開檔驗證）
> **建立：** 2026-07-30
> 標籤：`#quant` `#外匯` `#選擇權` `#repo` `#信用風險` `#投行實務` `#一手文件`

---

## 一句話

2010 年雷曼破產調查把三份投行**內部新人訓練＋desk operating manual** 級文件推進公開領域，這是外界極少能合法取得的「交易現場」教材；本篇是三份手冊的真實目錄結構與讀法。

---

## 為什麼這批文件能公開

一般投行的內訓教材永不外流。這批之所以能讀，是走了破產程序這條特殊路徑：

| 步驟 | 內容 |
|------|------|
| 2008 | 雷曼兄弟倒閉（倒閉前為全美第四大投資銀行、衍生品市場主要參與者） |
| — | 紐約破產法院任命獨立 Examiner：**Anton R. Valukas**（Jenner & Block 董事長） |
| 調查 | 向雷曼、Barclays、往來銀行、會計師事務所、監管機關調取文件 |
| 2010 | 文件公開爭議處理完畢後，Jenner & Block 將**九冊報告 + 8,000 多條註腳所引用的 supporting documents** 上網 |
| 現在 | Stanford（Jeremy Bulow 教授頁面）保存該文件庫副本並公開展示 |

**關鍵限定（別誤讀）：** 公開的**不是**全部證物，只是報告本身與註腳引用到的那部分 supporting documents（內部郵件、簡報、政策文件、培訓手冊）。原始可調查資料量遠大於此——來源文章引述約 3 petabytes 電子資料、最終收集 500 萬份／約 4,000 萬頁文件。

Barclays 與 Nomura 各自收購了雷曼北美與部分亞洲業務，但文件公開**與收購方無關**，來自法院的調查與披露程序。

---

## 三份手冊

以下目錄結構直接取自 PDF 本體（非轉述），頁數為實際檔案頁數。

### ① Foreign Exchange Training Manual（130 頁）

- Bates：`LBEX-LL 3356480-3356609`｜來源標記：Confidential Treatment Requested By Barclays / SOURCE: LEHMAN LIVE
- 本地：`raw/sources/lehman-manuals/LBEX-LL-3356480-3356609_FX-and-Options-Training-Manual.pdf`
- **中文精修版：** [[Quant-Trading/雷曼FX手冊-中文精修-01-即期外匯|① 即期外匯]]
- **中文精修版：** [[Quant-Trading/雷曼FX手冊-中文精修-02-遠期外匯|② 遠期外匯]]
- **中文精修版：** [[Quant-Trading/雷曼FX手冊-中文精修-03-換匯交易|③ 換匯交易]]
- **中文精修版：** [[Quant-Trading/雷曼FX手冊-中文精修-04-外匯選擇權|④ 外匯選擇權]]

四大段，由市場語言一路推到選擇權風險：

| 段 | 起始頁 | 內容主軸 |
|----|--------|---------|
| **FX Spot** | p.1 | outright 定義、value dates、credit & settlement risk、報價術語、reciprocal quotation、匯率變動方向、bid/offer、**left bid–right offer 規則**、cross rates（同 terms／不同 terms 兩種 bid-offer 算法）、market maker 交易慣例、review problems |
| **FX Forwards** | p.38 | forward 是什麼、forward rate 計算、forward points 怎麼算、pay/earn points、premium vs discount、forward rate conventions、**odd dates**、forward points 如何變動、which side of the market、currency futures、funding、trade ideas 如何形成、Eurodollar futures、殖利率曲線與 spread、**positive carry trade 範例** |
| **FX Swaps** | p.69 | swap 定義、value dates、bid-offer spreads、swap points 計算、rules of thumb、pay or earn the points、圖表背後的邏輯 |
| **FX Options** | p.94 | vanilla options、long/short call 與 put 的 payoff、**The Greeks**、Delta 區間（deep OTM 0% → deep ITM 100%）、**trading gamma 實例 + gamma hedging P&L 計算**、second order Greeks、影響選擇權價值的因子、**exotic options**、trading conventions、trading strategies、glossary（p.123） |

它不是純理論書：有報價練習、避險練習、損益計算題。例如要新人依 option delta 算出該買賣多少現貨，再示範市場變動後 Delta 如何重新避險。

**三個核心觀念**

1. **先學交易室的語言。** 誰是 base currency、匯率上升是哪個幣升值、該打 bid 還是 offer、cross rate 怎麼算、這個部位到底 long USD 還是 short USD。看似基本，卻是 Sales／Trader／Trade Support／Operations 之間溝通的地基。
2. **Forward 不是市場對未來匯率的預測。** 它由兩幣利率差、資金成本、期限決定。手冊直接說明 forward desk 每天彙總全行貨幣餘額，用 Tomorrow/Next swaps 把部位做平——這解釋了為何 FX forward desk 同時是銀行的幣別資金調度中心。
3. **選擇權不是只賭方向。** 方向對了照樣虧：買太貴（隱含波動率下滑）、Theta 吃掉 premium、Gamma 讓 Delta 快速改變、barrier 附近 Greeks 劇烈跳動使避險成本失控（reverse knock-out 尤甚，Delta 與 Vega 極不穩定）。手冊要傳達的是：交易的對象不是一張靜態 payoff 圖，而是**一組持續變化的風險因子**。

---

### ② REPO MANUAL — Sales Reference Guide（71 頁）

- Bates：`LBEX-LL 1175483-1175553`｜文件自述用途：給從事 repurchase agreements 的 sales people 的 reference guide
- 本地：`raw/sources/lehman-manuals/LBEX-LL-1175483-1175553_Repo-Sales-Reference-Guide.pdf`
- **中文精修版：** [[Quant-Trading/雷曼Repo手冊-中文精修|雷曼 Repo 手冊 中文精修]]

十一節（原文羅馬數字編號）：

| 節 | 標題 | 涵蓋 |
|----|------|------|
| I | Repo Contacts | Repo Sales／Trading／Support／Clearance 電話簿 |
| II | Introduction to the Financing Market | 基礎、術語、風險、法律 |
| III | Account Suitability | 適用性、trade maintenance、exposure |
| IV | Trade Ledgers | — |
| V | Sales Credit Schedule | — |
| VI | **Infinity Quick Reference Guide** | 前台 repo 交易輸入系統 |
| VII | MTS Verbs / Commands | 主機系統指令 |
| VIII | Credit Risk Management | financing haircuts、credit analyst 資訊、credit limits |
| IX | LBIE／LBI Tickets & Settlement Instruction | trade ticket 與 reprice ticket |
| X | Domestic Settlement Instruction Guide | — |
| XI | CAMEO and Margin Exposure Reports | — |

**四個核心觀念**

1. **Repo 不只是「有抵押借款」。** 經濟實質像以證券抵押的借貸；法律形式是「賣出證券取得現金 + 承諾未來以較高價買回」，價差即融資利息。同一筆交易，借現金方看是 Repo，供現金方看是 Reverse Repo。
2. **投行離不開 Repo 的六個用途：** 融資 Treasury／MBS／corporate bonds 庫存；建立 matched book 賺融資利差；借入特定證券以交付 short sale；處理上游未到券造成的 settlement fail；為客戶提供短期流動性；把閒置證券變現金。因此 Repo Desk 同時牽動 Trading／Treasury／Balance Sheet／Collateral／Credit／Settlement。
3. **成交不等於工作結束。** 完整生命週期：Quote → Client suitability → Legal agreement（MRA／GMRA）→ Credit limit → Trade booking → Collateral allocation → Settlement → 每日 mark-to-market → Margin call → Substitution／Rollover／Close-out。Infinity 那節甚至教 sales 如何輸入、修改、取消、rollover、close out，以及處理 collateral substitution。
4. **抵押品不能取代信用風險管理。** 仍須考慮抵押品價格波動、流動性與清算成本、counterparty default、wrong-way risk、settlement fail、文件與 close-out 可執行性、haircut 是否足夠。

> **一句話：** Repo 交易的真正產品不是利率，而是現金、抵押品、資產負債表、信用額度、結算流程的整體管理。

---

### ③ Credit Risk Reporting (CRR) Procedures Manual v1.0（32 頁）

- Bates：`LBEX-DOCID 688141`｜版本 1.0，CRMC review 日期 2007-11-13｜標記 FOIA
- 本地：`raw/sources/lehman-manuals/LBEX-DOCID-688141_Credit-Risk-Reporting-Manual.pdf`
- **中文精修版：** [[Quant-Trading/雷曼信用風險報表手冊-中文精修|雷曼信用風險報表手冊 中文精修]]

**它不是**教你分析財報、決定 credit rating 或建 default model。它記錄 Credit Risk Reporting 團隊如何**收集、驗證、彙總、上報**全行 counterparty exposure。

| 章 | 內容 |
|----|------|
| 1 Executive Summary | 目的與範圍 |
| 2 Process Analysis | New Client Set Up、New Account Set Up、**Parent/Child Relationship**、**Agent/Principal Role**、Reconciliation |
| 3 Exposure Reports | Global CCE Snapshot、Variance Report、月末與季度 Credit Risk Profile、**CCE/MPE Report**、**Chief Risk Officer Report**、Global Risk Report、Firm Wide Risk Snapshot、**Credit Valuation Adjustment**、Risk Appetite/Risk Equity、法規報告（SEC／Consolidated Supervisory Entity／Regulatory Capital）、LBIE Capital Report、**Stress Capital Reporting**、European Risk Snapshot、LBIE Risk Report |
| 4 Country Risk Report | Country/Sovereign Risk、Indian Risk Report、Daily Dashboard |
| 5 Excess & Limit Management | **Daily Excess Report**、MPE Excesses、Global Overdue、DSL、MBSF Limit、IA、New Client、Unmatched Client |
| 6 Reconciliation & Disclosure | 月度 OTC 衍生品 reconciliation、**Maturity Buckets**、Analyst Call、Liquidity Funding、LOTC Daily Capital、TIC D |
| 7–8 | Glossary、Appendix |

**四個核心觀念**

1. **Counterparty mapping 錯了，風險報告直接失真。** 同一企業集團旗下可能有多個基金、SPV、法律實體、trading account、prime brokerage account。parent/child 或 agent/principal 設錯，系統就無法正確彙總集團風險。**新客戶建檔與 legal entity mapping 不是行政小事，是信用風險計算的地基。**
2. **CCE 與 MPE 要分清。**
   - **CCE**（Current Credit Exposure）：當前已產生的正向市值曝險，扣除合格 collateral、考慮可執行的 netting agreement。
   - **MPE**（Maximum Potential Exposure）：考慮未來市場變動後，剩餘期限內可能達到的潛在曝險，由模擬引擎或 VaR 流程產生。
   一家銀行不能只看今天的 MTM，還要問「市場劇烈變動時這個客戶未來可能欠我多少」。
3. **風險管理很大一塊其實是資料管理。** 每天要從 derivatives／financing & forwards／FX／collateral & margin／client master data 各系統取數，然後處理 missing trades、錯誤 account mapping、collateral 差異、異常日間變動、manual override，並與 general ledger 及 P&L 對帳。**再先進的模型，輸入資料／法律實體／抵押品資料錯了，輸出的風險數字就沒有意義。**
4. **Risk report 必須轉成行動。** Daily Excess Report 列出超過 notional 或 credit limit 的帳戶，Credit Analyst 必須決定：提高 limit／要求補 collateral／降低或 close out 部位／暫停客戶交易。CRO 報告則彙總最大 counterparty exposure、MPE、margin call、rating downgrade、sovereign risk、settlement limit breach。

---

## ④ Examiner Report 九冊（一手母體）

`raw/sources/lehman-manuals/Lehman-Examiner-Docs-Index.html`（索引頁本地副本）

**已全數下載** → `raw/sources/lehman-manuals/examiner-report/`，共 **42MB / 4,105 頁**。每冊首頁均驗為 `UNITED STATES BANKRUPTCY COURT, SOUTHERN DISTRICT OF NEW YORK — In re LEHMAN BROTHERS...`。

| 冊 | 頁數 | 章節 | 本地檔名 |
|----|------|------|---------|
| 1 | 239 | Sections I & II 導論／執行摘要／程序背景；III.A.1 **Risk** | `Vol1_Intro-ExecSummary-Procedural-and-Risk.pdf` |
| 2 | 541 | III.A.2 **Valuation**；III.A.3 **Survival** | `Vol2_Valuation-and-Survival.pdf` |
| 3 | 336 | III.A.4 **Repo 105** | `Vol3_Repo-105.pdf` |
| 4 | 493 | III.A.5 Secured Lenders；III.A.6 Government | `Vol4_Secured-Lenders-and-Government.pdf` |
| 5 | 683 | III.B Avoidance Actions；III.C **Barclays Transaction** | `Vol5_Avoidance-Actions-and-Barclays-Transaction.pdf` |
| 6 | 225 | Appendix 1 | `Vol6_Appendix-1.pdf` |
| 7 | 511 | Appendices 2–7 | `Vol7_Appendices-2-7.pdf` |
| 8 | 487 | Appendices 8–22 | `Vol8_Appendices-8-22.pdf` |
| 9 | 590 | Appendices 23–34 | `Vol9_Appendices-23-34.pdf` |

九冊含 8,000+ 條註腳，且註腳連到被引用的原始文件（內部郵件、簡報、政策、手冊、管理層往來）。

### 最有價值的讀法：手冊 × 證物對讀

手冊寫「應有流程」，郵件與調查證物寫「實際怎麼做」。兩邊對讀才看得到制度設計與真實組織行為之間的落差從哪裡開始：

| 手冊告訴你 | 郵件／證物告訴你 |
|---|---|
| 流程理論上如何運作 | 員工實際上如何處理 |
| Limit 與 control 如何設計 | Limit 是否被繞過或延後處理 |
| 問題應該如何升級 | 壞消息是否真的傳到管理層 |
| Repo 如何管理抵押品 | 資產負債表壓力如何影響決策 |
| Risk report 如何製作 | 管理層如何解讀或忽略報告 |

**讀法：** 先讀手冊建立「應有流程」基準線 → 再沿 Examiner Report 註腳追雷曼實際如何偏離。不要逐封郵件亂看。

---

## 可信度與查核

來源文章的硬事實已抽查，**全數與一手文件相符**：

| 文章聲稱 | 查核方式 | 結果 |
|---|---|---|
| Examiner 報告九冊、8,000+ 註腳、Jenner & Block | 下載 menu.html 核對 | ✅ 相符，Examiner 為 Anton R. Valukas |
| 三份手冊內容主題 | 下載 PDF 用 pypdf 抽 TOC 逐項核對 | ✅ 相符 |
| 由 Stanford 保存公開 | URL 實測 HTTP 200 | ✅ |

**文章的兩處不足（本篇已補）：**
1. 未給頁數。實際為 FX 130 頁／Repo 71 頁／CRR 32 頁。
2. 標題稱「外匯與選擇權」手冊，文件本體標題是 **Foreign Exchange Training Manual**，選擇權是其中第四段（p.94 起），不是並列主題。

> [!warning] 來源站整體評估
> 倫敦黑貓 23 篇（2026-07-01 起）全免費，事實抽查（Danske €2000 億、Bybit 15 億美元竊案、太子集團 127,271 BTC）均正確，但**除本篇外幾乎零外部引用**，作者匿名、「投行內部人」身分無可驗證資訊。本篇的價值集中在那三個 Stanford 連結，正文為手冊目錄式轉述。**當詞彙表用可以，當引用來源不行。**

---

## 反向連結

- [[Quant-Trading/投行金流與反洗錢-自學教材|投行金流與反洗錢 — 自學教材]] — **本篇是材料清冊，教材是學習路徑**；13 個模組把這三份手冊 + Examiner 九冊 + 五個洗錢案編成可自學課程
- [[Quant-Trading/2026-polymarket-quant-math-roadmap|2026年量化交易完整數學學習地圖]] — 該地圖的 Black-Scholes／希臘字母章節，本篇 FX Options 段是其投行實務對照版
- [[Quant-Trading/ai-24h-risk-monitoring|AI 24 小時盯盤——普通人可用的機構級風控四層架構]] — 「硬編碼熔斷線」對應本篇 CRR 手冊的 Daily Excess Report ／ limit escalation 機制
- [[旺來幫Jane/_index|旺來幫 Jane 總索引]] — 金融知識體系索引，槓桿／抵押品概念可交叉參照
