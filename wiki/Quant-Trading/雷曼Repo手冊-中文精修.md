# 雷曼 Repo 手冊 中文精修（Repo Sales Reference Guide）

> **原件：** Lehman Brothers *REPO MANUAL — Repo Sales Reference Guide*，Bates `LBEX-LL 1175483–1175553`（71 頁）
> **原件更新日：** 2005-11-08（封面標註，OCR 作 `Updated 11108105`）
> **本地檔：** `raw/sources/lehman-manuals/LBEX-LL-1175483-1175553_Repo-Sales-Reference-Guide.pdf`
> **本冊涵蓋：** 原手冊全十一節（I–XI），全節覆蓋
> **編譯：** 2026-07-30
> 標籤：`#教材` `#中文精修` `#Repo` `#附買回` `#擔保品融資` `#Repo105` `#一手文件`

> [!note] 這份精修版怎麼讀
> - `> [!example] 實例` = **給零基礎讀者的具體場景**，原件沒有，是本版加的
> - ⚠️ = **原件本身有錯、前後不一致、或方法有隱含限制**，已標明（本冊共標出 16 處）
> - 🔧 = OCR 辨識錯誤，已還原成正確英文（原件是掃描件，文字層有系統性誤讀）
> - 數字與算例取自原件，解法逐步展開；原件算錯的地方會同時列出「原件寫的」與「算出來的」
>
> **本冊刻意不轉錄的內容：** 原手冊 I、IX、X 三節有大量員工直撥電話、客戶帳號、ABA 匯款代碼、DTC／Euroclear 參與者編號。這些對理解 Repo 沒有教學價值，而本 vault 是公開 repo，**一律只講結構、不轉錄號碼**。要查號碼請直接看 PDF。
>
> **這份手冊為什麼重要：** 它是理解 **Repo 105**（雷曼倒閉的核心會計爭議）的前置知識。Repo 105 不是什麼奇異衍生品，它就是**這份手冊教的東西，換一個 haircut 數字、換一個法律轄區**。讀完本冊最後一節你會明白為什麼。

---

## 導讀：一筆交易，兩個身分

**Repo（Repurchase Agreement，附買回協議）最難的不是計算，是它同時是兩種東西。**

### 經濟實質 vs 法律形式

| | 它「實際上」是什麼 | 它「文件上」是什麼 |
|---|---|---|
| **名稱** | 以證券作抵押的短期借貸 | 賣出證券 + 同時約定在未來以較高價買回 |
| **現金方拿到什麼** | 一筆有擔保的放款、收利息 | 一批證券的**所有權** |
| **證券方拿到什麼** | 一筆低成本的短期資金 | 賣出證券的價金 |
| **利息在哪裡** | 明寫的 repo rate | **藏在買回價與賣出價的價差裡** |

原件 p.9 把這件事講得極清楚（🔧 已修 OCR）：

> The term repo is derived from the fact that this short term money market instrument is **legally the sale of a security at one price and the simultaneous agreement by the seller to repurchase that security at a greater price on a future date**. The difference between the two prices is the interest earned on the original investment.
>
> **In practice a repo is essentially a loan of cash** for a specified period of time against which interest is paid and collateral is pledged.

**注意這兩段的措辭差異：** 講法律時用 `legally`，講實務時用 `in practice`。**原件自己就承認法律形式與經濟實質是兩件事。** 這句話在 2005 年寫下來的時候是為了解釋名詞；三年後，它變成了 Repo 105 的整個基礎。

> [!example] 實例：同一筆一億台幣，兩張臉
> 情境：某貨幣市場基金手上有 **$10,000,000** 閒置現金要放一個月，雷曼手上有 **$10,200,000 市值的美國公債**但缺現金。
>
> **他們做的事（經濟實質）：**
> ```
> 基金借給雷曼 $10,000,000，收 1.05% 年息，
> 雷曼把公債押給基金當擔保品，一個月後還錢贖券。
> ```
>
> **他們簽的字（法律形式）：**
> ```
> 第一腿：雷曼「賣」給基金 $10,200,000 的公債，收到 $10,000,000
> 第二腿：一個月後雷曼以 $10,008,750「買回」同一批公債
>          ↑ 價差 $8,750 = 利息
> ```
>
> **兩張臉的差別在哪裡？** 在雷曼破產那天。
> - 如果它是「有擔保的借貸」→ 基金是**有擔保債權人**，要等破產程序，公債被凍結
> - 如果它是「賣斷 + 買回承諾」→ 那批公債**法律上就是基金的**，基金直接賣掉自救，不用排隊
>
> **整個 Repo 市場的規模建立在第二種解讀上。** 這叫 **safe harbor（破產法安全港）**——repo 被排除在自動凍結（automatic stay）之外。沒有這條，$1.6–3.8 兆的日規模不會存在。

### Repo 還是 Reverse Repo？看你站哪一邊

原件 p.10 的註記（🔧 已修 OCR）：

> **One counterparty's Repo is another counterparty's Reverse; both are the same transaction viewed from different perspectives.** However, it is common practice to refer to the transaction **from the dealer's perspective**.

| | 誰拿到現金 | 誰拿到證券 | 交易叫什麼 |
|---|---|---|---|
| **Repo**（附買回） | Dealer（雷曼） | 投資人 | 從 dealer 角度：我 repo 出去 |
| **Reverse Repo**（附賣回） | 投資人 | Dealer（雷曼） | 從 dealer 角度：我 reverse 進來 |

**一句話記住：`Repo = 借現金`，`Reverse = 借證券／出現金`。而且永遠以 dealer 的角度命名。**

> [!example] 實例：同一通電話，兩個名字（對比型）
> 客戶打給雷曼業務，說「我要做 repo」。**業務第一件事是搞清楚客戶想要什麼，因為兩邊講的是同一個字、意思相反：**
>
> | 客戶說 | 客戶真正想要的 | 雷曼這一側叫什麼 | 誰付利息 |
> |---|---|---|---|
> | 「我有閒置現金想放短天期」 | 出現金、收擔保品 | **雷曼的 Repo** | 雷曼付給客戶 |
> | 「我持有一堆債券，想借點現金週轉」 | 出券、拿現金 | **雷曼的 Reverse** | 客戶付給雷曼 |
>
> **兩種需求在系統裡是完全不同的兩張票、不同的 ledger、不同的 haircut 表、甚至不同的授信額度。** 業務把方向記反，後面整條鏈全錯。
>
> ⚠️ **原件自己就把方向寫反過一次。** 詳見下面第 II 節「Repo 利息與 Haircut」的 ⚠️ 標記。

### Repo 的六大用途——為什麼一張 Repo 桌會牽動六個部門

原件把用途散在 p.11–p.13 的三處（投資人、Dealer、供需因素），合起來是六種：

| # | 用途 | 誰在做 | 原件出處 |
|---|---|---|---|
| 1 | **融資自家庫存**（Financing inventory） | Dealer | p.11 "Repos are the principal means by which dealers finance their inventory" |
| 2 | **Matched book 賺利差** | Dealer 交易員 | p.11、p.16 定義 |
| 3 | **借特定券交割空頭**（Cover short positions） | Dealer | p.11 |
| 4 | **處理交割失敗**（Operational fails） | Dealer 後台 | p.11、p.13 |
| 5 | **客戶短期流動性**（現金管理工具） | 企業、基金、央行 | p.11 |
| 6 | **閒置券變現金**（把 portfolio 出借賺 fee） | 投資人 | p.11 "maximize returns on securities in their portfolio" |

**所以 Repo Desk 同時牽動六個部門：**

```
Trading      ← 用途 1、2、3：庫存要不要留、利差怎麼賭
Treasury     ← 用途 1、5：全行資金缺口
Balance Sheet← 用途 1：庫存要不要進資產負債表（← Repo 105 的入口）
Collateral   ← 全部：哪一張券押給誰、可不可以替換
Credit       ← 全部：這個對手方能給多少額度、haircut 多少
Settlement   ← 用途 3、4：券進不進得來、錢出不出得去
```

> [!example] 實例：用途 3「借券交割空頭」長什麼樣
> 雷曼的公債交易員今天賣出 $50mm 面額的 **10 年期公債**給某保險公司，交割日是明天。**問題：雷曼手上根本沒有這張券**——他是判斷利率會漲、故意賣空。
>
> 明天早上如果交不出券，就是一筆 **fail**：買方不付錢，雷曼拿不到 $50mm，而且在市場上留下紀錄。
>
> **解法：做一筆 reverse repo 把券借進來。**
> ```
> 雷曼 → 某退休基金：我出 $49.8mm 現金，跟你借那張 10 年期公債一週
> 退休基金 → 雷曼：券給你，一週後還我，我付你 repo 利息
> ```
> **注意這裡的利息方向：** 這張券市場上很搶手（叫 **special issue，特券**），所以退休基金付給雷曼的利率會**低於**一般水準（general collateral, GC），甚至可能接近零或負數。
>
> **這就是「specials trading」——原件 p.8 把它列為雷曼的三大競爭優勢之一（"Aggressive specials trading"）。** 講白了：**當市場上人人都想借某張券的時候，手上有那張券的人可以用超低利率借到現金。** 券的稀缺性變成了資金成本的折扣。
>
> **CEX 對應：** 這正是幣圈「借幣做空」的機制。你要做空某個幣，得先跟平台借到現貨才能賣。借貸費率暴衝（幣安 BNB、GMT 那種一天 100%+ 年化的時刻），就是這份手冊講的 special 狀態。

---

## I. Repo Contacts（聯絡人清單）

**白話：** 71 頁的手冊，**前 3 頁是電話簿**。這不是編排失誤，是刻意的。

**機制：** 原件把聯絡人依「一筆交易會卡在哪裡」分成九大類：

| 類別 | 這一組管什麼 | 什麼時候會打給他 |
|---|---|---|
| **Documentation（MRA & GMRA）** | 法律文件（美國 MRA／全球 GMRA） | 新客戶要開始做 repo，文件還沒簽 |
| **Corporate Credit Approval** | 授信核准，**依客戶類型分工**（避險基金／保險／主權／SPV & CDO／拉美…） | 客戶要加額度、要做超過核准天期的交易 |
| **New Accounts** | 開戶（紐約機構／零售／倫敦分開） | 客戶連帳號都還沒有 |
| **CFU Support / Trade Support** | 交易輸入與維護（LBI 走 MTS、LBIE 走 ITS） | 票打錯了、要改要刪 |
| **Data Entry / Infinity Systems Support** | 前台系統本身壞掉 | Infinity 畫面停止 broadcasting |
| **Clearance**（依商品再細分） | 券進出（Fed Wire／DTC／Euroclear／實體券） | 券沒到、錢沒到 |
| **Tri-Party（Allocations／Cash Balances）** | 三方託管的抵押品分配與現金餘額 | 三方 repo 的券沒分配到 |
| **Cash Management / Fail Control / Pairoffs** | 資金調度、交割失敗、對沖軋帳 | fail 了要善後 |
| **Margin Department** | 每日 mark-to-market 與追繳 | 客戶曝險超過 trigger |

**為什麼重要：** 這份電話簿本身就是一張**系統架構圖**。它告訴你：一筆 repo 從報價到結案，會經過至少 **9 個獨立團隊、3 個地理據點（紐約 212／新澤西 201／倫敦 44-20）、2 套主機系統（MTS 與 ITS）**。

⚠️ **這裡有一個結構性風險，原件沒有明說但清單本身洩露了：** Clearance 一組就依「商品類型」拆成 6 個小組（MBS／公債機構債／公司債 ABS CMO 貨幣市場／EMG／Euroclear／實體券），**每一組看到的只是同一筆交易的一段**。沒有任何一個名字是「從頭看到尾的人」。這在承平時期是專業分工，在壓力時期是**沒有人握有全貌**。

> [!example] 實例：一個 margin call 的傳球路線
> 早上 8:00，某避險基金客戶抵押的 CCC 級公司債隔夜跌了 4%，曝險超過 trigger。**接下來的傳球順序（原件第 XI 節規定）：**
>
> ```
> 1. Margin Department 系統跑出曝險 → 通知 Sales
> 2. Sales 到 CAMEO 跑 Trade Exposure Report → 檢查這個 call 是不是「好 call」
>    （要驗兩件事：haircut 對不對、mark-to-market 價格對不對）
> 3. 若 call 是對的 → Sales 必須在 10:00AM 前聯絡客戶
> 4. 客戶決定怎麼補（補券／reprice／補現金）→ Sales 回報 Margin
> 5. MTS 系統的交易：當天 3PM 前必須補到位
> 6. 沒補到 → 上報 Credit + Trading Desk + Management
> 7. 「could result in closing the trade or liquidation」
> ```
>
> **七棒，跨四個部門，全部在七小時內完成。** 而且第 2 步「檢查這個 call 是不是好 call」是**業務自己做的**——原件明寫 `Sales should make sure the haircuts and mark to market prices are accurate. These are two variables which could cause a bad call.`
>
> ⚠️ **這是一個經典的控制缺陷：拿獎金的人負責審查對自己不利的追繳通知。** 業務的誘因是「找出這個 call 是錯的」，不是「確認客戶真的欠錢」。原件把這寫成便民（避免騷擾客戶），但它同時也是一條可以合法拖延的路徑。
>
> **CEX 對應：** 這就是為什麼交易所的清算引擎必須是**全自動、無人工介入**的。一旦「業務可以先看一眼這個爆倉對不對」，清算線就不再是線。

---

## II. Introduction to the Financing Market（融資市場導論）

**這是全書唯一一節在講「Repo 是什麼」，共 15 頁；其餘 56 頁全部在講成交之後怎麼維護。這個比例本身就是本冊最重要的一課。**

### 1. 市場規模與參與者

原件 p.8 開宗明義（🔧 已修 OCR）：

> Repurchase Agreements, or repos, are **the primary instruments used by U.S. broker-dealers to finance their inventory positions**. Estimated size of the repo market is **$1.6 to $3.8 trillion per day** in the U.S. alone.

⚠️ **三處問題：**
1. **數據時點過期。** 註腳寫明資料是 **2003-06-30** 的紐約 Fed 統計，但這份手冊的更新日是 **2005-11-08**。內部教材帶著兩年半前的市場數字在用。
2. **口徑不明。** 「$1.6 到 $3.8 兆 **per day**」是**未償餘額**（outstanding）還是**當日成交量**（turnover）？兩者差一個數量級。紐約 Fed 那份統計是 primary dealer 的**平均每日未償融資餘額**，不是週轉量。原件的 `per day` 讓人讀成後者。
3. **1.6 到 3.8 是 2.4 倍的區間。** 一個「估計值」跨越 2.4 倍，實際上等於說「我們不知道」。**這正是 2008 年的核心問題之一：沒有人知道 repo 市場到底多大、誰欠誰多少。**

參與者分三類（原件 §III）：

| 類別 | 為什麼進場 |
|---|---|
| **Investors**（企業、基金、保險、退休金、投顧） | 要一個**有擔保**的短期停車位，利率優於銀行存款 |
| **Dealers**（券商） | 融資庫存、跑 matched book、借券補空頭、補 fail |
| **Central Banks & Official Institutions** | 投資外匯存底、公開市場操作（Fed 用 repo 放水、reverse 收水） |

### 2. Repo 利率與計算

```
Repo Interest = 現金本金 × Repo Rate × (天數 ÷ 360)
```

⚠️ **注意分母是 360 不是 365。** 這是美式貨幣市場慣例（Actual/360）。同樣掛牌 1.05%，用 360 天算出來的實際年化是 `1.05% × 365/360 = 1.0646%`——**每一億美元一年多付約 $14,600**（＝(1.0646% − 1.05%) × 1 億）。跨市場搬公式前先確認日計基礎。

原件強調一句非常重要的話（p.12）：

> **the interest bears no relation to the interest rate on the securities used as collateral.**
> （repo 利率與抵押品本身的票面利率完全無關。）

**Repo 利率由什麼決定？** 原件列了四項：抵押品的供需、現金的供需、repo 天期、以及**券怎麼交割**（交割方式不同，利率不同）。

### 3. Haircut：算例逐步展開

原件 p.12–13 給了唯一一個完整算例：

```
Term:            30 Days
Par Amount:      $10,000,000
Repo Rate:       1.05%
Haircut:         5%
Collateral:      UST 5.25% 11/15/2028
Dirty Price:     102
Principal Loan:  $9,714,285.72

Principal = Par × Dirty Price × (1/HC) × (1/100)
          = 10,000,000 × 102 × (1/1.05) × (1/100)
          = $9,714,285.71

Repo Interest = Principal × Rate × (Days/360)
              = 9,714,285.71 × 1.05% × (30/360)
              = $8,500
```

**逐格拆解：**

| 項目 | 數字 | 怎麼來的 |
|---|---|---|
| 抵押品**市值** | $10,200,000 | 面額 10mm × dirty price 102 ÷ 100 |
| 實際借到的**現金** | $9,714,285.71 | 市值 ÷ 1.05 |
| **緩衝墊**（over-collateralisation） | $485,714.29 | 市值 − 現金 |
| 30 天利息 | $8,500 | 現金 × 1.05% × 30/360 |
| 到期還款 | $9,722,785.71 | 現金 + 利息 |

⚠️ **原件在這個例子裡有三處問題：**

**① 交易方向寫反了。** 原文標題是：

> Investor C **reversing** $10 million in U.S. Treasury securities as collateral and **receiving cash** for a term of 30 days.

**投資人交出券、收到現金 → 投資人做的是 repo，不是 reverse。** 只有在「以 dealer 角度命名」的慣例下（雷曼 reverse 進來），這個標題的 `Reverse Repo Rate` 欄位才成立——但主詞卻寫成 `Investor C reversing`。**主詞用投資人、動詞用 dealer 角度**，兩個慣例混在同一句裡。原件自己在 p.10 才剛強調過「以 dealer 角度命名」，隔兩頁就打破。

**② 尾數算錯一分錢。** `10,200,000 ÷ 1.05 = 9,714,285.714285…`，四捨五入到分是 **$9,714,285.71**，原件寫 **.72**。金額微不足道，但它揭露了這個例子是**從 $8,500 這個漂亮整數反推回去的**，不是正算下來的。

**③ 「5% haircut」與 `1/1.05` 是兩種不同口徑，原件沒說明。** 見下。

### 4. ⚠️⚠️ 全書最大的陷阱：Haircut 有兩種口徑，原件混用且從未定義

原件在**三個地方**用了三種寫法：

| 出處 | 寫法 | 意思 |
|---|---|---|
| Section II, p.16 表格 | **Margin：100%、102–105%、100–120%** | 抵押品市值要達到現金的百分之多少 |
| Section II, p.12 算例 | **Haircut: 5%**，公式用 `1/1.05` | 同上（105% margin） |
| Section VIII, p.44 grid | **Haircut：10%、20%、25%、50%** | 從市值**扣掉**百分之多少才是可借金額 |
| Section XI, p.69 報表 | `Margin/Hrct Amt = principal × h/c`，`× .03` | 從市值扣 3% |

**兩種口徑的換算：**

```
口徑 A（扣減式，Section VIII/XI 用）：  現金 = 市值 × (1 − h)
口徑 B（倍數式，Section II 用）：       現金 = 市值 ÷ (1 + m)

h = 20%  →  現金 = 市值 × 0.80  →  市值 = 現金 × 1.250
m = 20%  →  現金 = 市值 ÷ 1.20  →  市值 = 現金 × 1.200
```

> [!example] 實例：同樣講「20%」，差 5% 的擔保品（對比型）
> 客戶要借 **$1,000,000** 現金。信用分析師說 haircut 20%。**業務該收多少市值的券？**
>
> | 口徑 | 算法 | 要收的市值 | 差額 |
> |---|---|---|---|
> | **A：扣減式**（Section VIII grid） | 1,000,000 ÷ 0.80 | **$1,250,000** | — |
> | **B：倍數式**（Section II 表格） | 1,000,000 × 1.20 | **$1,200,000** | **少收 $50,000** |
>
> **同一個「20%」，差 $50,000 的緩衝墊——正好是 5% 的曝險。**
>
> 在小額 haircut 上差距很小（2%：$1,020,408 vs $1,020,000，只差 $408），**但 haircut 越大差距越誇張**：
> ```
> haircut 50%（違約與未評等債券）：
>   口徑 A：1,000,000 ÷ 0.50 = $2,000,000
>   口徑 B：1,000,000 × 1.50 = $1,500,000
>   差 $500,000 —— 整整少收三分之一的緩衝墊
> ```
>
> ⚠️ **這份 71 頁的手冊從頭到尾沒有定義過任何一種口徑，也沒有說明兩者的換算。** 新進業務讀完全書仍然無法確定「haircut 20%」到底要收多少券。這是本冊最實質的一個缺陷。
>
> **CEX 對應（直接可換算）：** 幣圈用的是第三種口徑——**LTV（Loan-to-Value，貸放成數）**。
> ```
> LTV 70%  ⇔  haircut 30%（口徑 A）  ⇔  margin 143%（口徑 B）
> LTV 50%  ⇔  haircut 50%           ⇔  margin 200%
> ```
> 質押借幣頁面上寫「初始 LTV 70%、清算 LTV 85%」，翻譯成這份手冊的語言就是：**初始 haircut 30%，緩衝墊被吃掉到只剩 15% 就強平。** 三種口徑講的是同一件事，但**做風控時混用會直接算錯部位**。這是 QA 在跨系統對帳時第一個要驗的東西。

### 5. 抵押品種類與 Margin 表

原件 p.16 的表（OCR 嚴重錯位，`10j%` = `105%`）：

| 抵押品類型 | Margin（原件標示，⚠️ 對應關係無法從 OCR 還原） |
|---|---|
| U.S. Treasury and Money Market Instruments | 落在 100–105% 區間 |
| Investment Grade Corporate Securities | 落在 102–105% 區間 |
| Mortgage-Related Securities | 落在 **100–120%** 區間 |

⚠️ **這個表在 OCR 中是 3 個列名對 5 個數值**，逐列對應**無法可靠還原**。上表只保留能確定的區間範圍，**不要拿去當實際數字用**，要精確值請看 PDF 影像。

⚠️ **表下方的說明自相矛盾：**
> Please note that this chart is included in this information package **for illustrative purposes only** and are determined by **Lehman's Credit Risk Management team**.

「僅供說明」和「由 CRM 決定」是兩件相反的事——前者說「這是示意」，後者說「這是真的」。**而且這張表出現在給客戶看的 information package 裡**，但第 VIII 節的 haircut grid 明寫：

> These are **INTERNAL ONLY and not to be sent to any client under any circumstances.**

⚠️ **同一類資訊，兩節給了相反的揭露規則，且沒有說明界線在哪。** 對業務而言這是實質的合規風險：他不知道自己手上這張表能不能給客戶看。

### 6. 三種交割方式（這一段決定了誰真的持有券）

| 方式 | 券放在哪 | 誰承擔管理成本 | 風險特徵 |
|---|---|---|---|
| **Delivery Repo** | 交割到**投資人自己的銀行** | 投資人（付保管費、交割費） | 最安全；投資人真的握有券 |
| **Tri-Party Repo** | 交割到**雙方共用的第三方託管銀行** | Dealer（券到位後全由 dealer 吸收） | 託管行每日 mark、檢查合格性、監督替換；**消除交割失敗風險** |
| **Safekeep / Hold-in-Custody** | **留在 dealer 自己的金庫**，只做帳上隔離 | 無外部成本 → **利率較高** | ⚠️ 投資人從未實際持有券 |

> [!example] 實例：同一筆交易，三種交割，三種破產結局（對比型）
> 你是某公司財務，把 $50mm 放在雷曼 repo，收 UST 當擔保品。2008 年 9 月 15 日雷曼聲請破產。**你的下場完全取決於當初選了哪一種交割：**
>
> | 交割方式 | 9/15 早上你手上有什麼 | 你能做什麼 |
> |---|---|---|
> | **Delivery** | 公債躺在**你自己的託管帳戶** | 當天賣掉，拿回錢，結束 |
> | **Tri-Party** | 公債在共用託管行、以你的名義隔離 | 依三方協議取回並處分（實務上仍有幾天摩擦） |
> | **Safekeep** | **雷曼金庫裡一個標著你名字的子帳戶** | 你變成破產債權人，開始打官司 |
>
> **原件是怎麼賣 Safekeep 的？**
> > since the cost of transferring the securities to an outside custodian are not incurred, **Safekeep Repos generally yield a higher return** than Delivery Repos.
>
> ⚠️ **原件只講「利率比較高」，完全沒有講「代價是你不真的持有券」。** 這是本冊第二嚴重的隱含限制：**多出來的那幾個 bp，買的正是這個風險，但手冊把它寫成純粹的成本節省。**
>
> **CEX／託管對應：這就是「交易所自託管 vs 第三方託管」的完全對應題。**
> ```
> Delivery Repo      ≈ 自己的冷錢包 / 私鑰自持
> Tri-Party Repo     ≈ Copper / Fireblocks / Ceffu 這類獨立託管 + 鏡像交易
> Safekeep Repo      ≈ 把幣放在交易所帳戶裡，看著一個數字
> ```
> FTX 事件的教訓與 Safekeep repo 一字不差：**帳上隔離不是實際隔離。** 三方託管在幣圈之所以在 2023 年後暴增，就是機構終於把這一課學會了。

### 7. Right of Substitution（替換權）

**白話：** dealer 押出去的券，中途想換一張別的回來。

> Typically, dealers **prefer to have the right to change ("substitute") the collateral** pledged to the investor while the repo is outstanding. This gives the dealer the flexibility to use the collateral for alternative uses.

**為什麼重要：** 這一句話決定了整個第 VI 節（Infinity 系統）有一大半功能在做 substitution。**替換權是 dealer 的核心需求**——他押出去的券可能明天要交割給別人。

> [!example] 實例：substitution 在防止什麼
> 雷曼把一張 **UST 5.25% 2028** 押給某基金做一個月 repo。第 10 天，公債交易員把同一張券賣給了保險公司，明天要交割。
>
> **沒有替換權：** 券卡在基金那裡一個月拿不回來 → 明天交割 fail → 又要去借券補（用途 3）→ 成本疊加。
> **有替換權：** 雷曼今天送一張**同等值、同合格條件**的別張券給基金，把 2028 那張換回來 → 明天正常交割。
>
> **代價在哪裡？** 基金收到的券換了一張。如果合格條件寫得鬆，**dealer 可以持續把最好的券換走、留下最差的券**。這在英文有專門的說法：**collateral downgrade（抵押品品質劣化）**。
>
> ⚠️ **原件完整描述了 dealer 的好處，一個字都沒提投資人這一側的劣化風險。** 它只在 Tri-Party 段落順帶提到託管行會「supervise all substitutions」——但沒說明監督的標準是什麼。

### 8. Term、Open Repo 與 Matched Book

| 天期形態 | 說明 |
|---|---|
| **Open**（開放式） | 每天自動 roll over，任一方喊停才結束 |
| **Term**（定期） | 固定天期，一週、一個月、三個月 |
| 原件說明 | 最多可談到**一年**；實際上**絕大多數集中在三個月內** |

**Matched Book 的定義——注意原件的坦白（p.16）：**

> a major profit center at primary dealers is where a trader reverses in and repos out collateral to the same or different dates. When the maturities of the reverse repos and repos are the same, he or she is said to be running a matched book. **But, in reality, most "matched" books are actually "mismatched"** in that a trader will reverse in collateral to dates which are different than those maturities on the corresponding repos. A trader does this to **profit from future shifts in interest rates**.

⚠️ **這段話是本手冊裡最誠實、也最危險的一段。**

「Matched book」這個名字暗示「兩邊對沖、沒有風險」。原件自己承認：**實際上大多數是刻意錯配的，因為錯配才有利潤。**

> [!example] 實例：matched book 的錯配長什麼樣，以及它怎麼殺人
> 交易員的部位：
> ```
> Reverse in：  借進 $1bn 的 CMO，付 3 個月固定利率，出 $1bn 現金
> Repo out：    把同一批 CMO 押出去，借進 $1bn 現金，天期 隔夜
> ```
> **表面上「matched」**（同一批券、同樣金額，一進一出）。**實際上完全不 matched**：
> - 資產端鎖定 3 個月
> - 負債端每天要 roll
>
> **賺什麼？** 隔夜利率低於 3 個月利率時，賺這段利差 ×每天滾。
>
> **怎麼死的？** 只要有**一天**沒人願意 roll 那筆隔夜 repo，$1bn 的資金缺口立刻出現，而資產還鎖著三個月。你必須當天賤賣 CMO 補洞。
>
> **2008 年 9 月，雷曼死於這個機制。** 不是死於部位方向做錯，是死於**每天要重借的錢，某一天借不到了**。
>
> ⚠️ **本手冊 71 頁裡，「風險」一節（Section V）只寫了兩種：Collateral Risk 與 Counterparty Risk——兩者都是站在「投資人會不會被雷曼倒帳」的角度寫的。「雷曼自己借不到錢會怎樣」這個問題，全書一個字都沒有。** 這是這份手冊最大的盲點，也是它最誠實的歷史證物：2005 年的一線教材裡，dealer 自身的資金流動性風險不存在。

---

## 中場：完整生命週期十步——教科書到成交就結束，實務有一半工作在成交之後

**教科書講 repo：報價 → 成交 → 到期還錢。三步。**
**這份手冊講 repo：十步，而且第 5 步以後佔了全書 79% 的篇幅。**

| # | 步驟 | 中文 | 誰負責 | 本手冊哪一節 | 頁數佔比 |
|---|---|---|---|---|---|
| 1 | **Quote** | 報價（rate、天期、抵押品） | Sales + Trading | II | ← 教科書 |
| 2 | **Client suitability** | 客戶適用性審查 | Sales + Product Marketing | **III** | ← 教科書通常跳過 |
| 3 | **Legal agreement** | 簽 MRA（美）／GMRA（全球） | Documentation | I、II 附錄 | ← 教科書通常跳過 |
| 4 | **Credit limit** | 授信額度與 haircut 核定 | Credit Risk Management | **VIII** | 9 頁 |
| 5 | **Trade booking** | 前台輸入交易 | Sales → Infinity → MTS/ITS | **VI、VII** | 11 頁 |
| 6 | **Collateral allocation** | 抵押品分配到這筆交易 | Collateral Manager / Tri-Party | **VI** | — |
| 7 | **Settlement** | 券與錢的實際交割 | Clearance | **IX、X** | 6 頁 |
| 8 | **每日 Mark-to-Market** | 每日重估抵押品價值 | Margin Dept | **XI** | 18 頁 |
| 9 | **Margin Call** | 追繳／退還 | Margin + Sales | **XI** | — |
| 10 | **Substitution / Rollover / Close-out** | 替換／續作／結清 | Sales + Trading（Infinity） | **VI** | — |

**量化這個對比：**

```
全書 71 頁
├─ 講「Repo 是什麼」（Section II）        15 頁  = 21%
├─ 講「怎麼在系統裡做」（VI、VII）        11 頁  = 15%
├─ 講「信用與 haircut」（VIII）            9 頁  = 13%
├─ 講「交割」（IX、X）                     6 頁  =  8%
└─ 講「每日盯市與追繳」（XI）             18 頁  = 25%
                                        ─────────
   成交之後的工作                        44 頁  = 62%
```

> [!example] 實例：同一筆交易，教科書版與實務版（對比型）
> 客戶：某避險基金要用 $20mm 面額的 BBB 級公司債借現金，30 天。
>
> **教科書版（三行寫完）：**
> ```
> 1. 議定 repo rate 2.5%、haircut 20%
> 2. 交割：客戶交券，雷曼付 $16mm 現金
> 3. 30 天後：客戶還 $16,033,333，取回券
> ```
>
> **實務版（這份手冊的版本）：**
> ```
>  1. 業務報價 —— 但 rate 要問 trading desk、haircut 要查 CRM 網站的 grid
>  2. 適用性 —— 客戶淨值夠 10mm 嗎？懂槓桿嗎？懂補不出錢會被平倉嗎？（Section III）
>  3. 文件 —— MRA 簽了沒？找 Documentation 組確認（Section I）
>  4. 授信 —— 這家避險基金的 tier 是什麼？額度剩多少？天期核准到幾天？（Section VIII）
>     ↑ 前四步全部沒過，這筆交易根本不能報價
>  5. 打票 —— Infinity 開 contract shell、輸入 collateral、Approve/Release（Section VI）
>  6. 分配 —— 選 DVP 還是 Tri-Party？三方要 allocate（Section VI）
>  7. 交割 —— 公司債走 DTC，交割指示雙方必須提前 24 小時對上（Section IX/X）
>  8. Day 1 收盤 —— CAMEO 跑出 SOD Exposure（Section XI）
>  9. Day 7 —— 債券跌 3%，曝險破 trigger → 10:00AM 前聯絡客戶、3PM 前補到位
> 10. Day 12 —— 客戶要求換一張券出來（substitution）→ Infinity 右鍵九步
> 11. Day 20 —— 客戶要求 rollover 再展 30 天 → 重跑第 4 步（額度還夠嗎？）
> 12. Day 30 —— close out。Trader 先在 Position Browse 決定要不要收回券，
>                Sales 才能 release closeout；系統 8:45AM 開始跳提醒視窗
> ```
>
> **第 1–3 步是教科書的全部；第 4–12 步是這份手冊的全部。**
>
> **對 QA 的意義：** 教科書測的是「利息算對沒有」。**實務要測的是狀態機**——一筆 repo 在系統裡有多少種狀態、每種狀態允許哪些操作、哪些轉換是不可逆的（例如原件明寫 `Release closeouts may not be undone`）。這正是 Web3 轉職作品「提幣狀態機測試套件」該長的樣子。

---

## III. Account Suitability（帳戶適用性）

**白話：** 在報價之前，先確認這個客戶適不適合玩槓桿產品。

**機制：** 原件 p.22 列出三條業務必須跟客戶講清楚的事（🔧 已修 OCR）：

> - Do you and your client understand the risks associated with leverage? **A person can lose not only the initial money (haircut amount) required to purchase an asset but is responsible up to the total amount of the asset being financed.**
> - The client must understand that **leverage multiplies the amount of risk** and therefore increases possible loss.
> - Account must understand that Lehman must protect itself and therefore **if margin calls are not met timely Lehman will have to liquidate all the financed positions**. If a deficit exists in the client's account after liquidation, **the client will be expected to supply the additional funds immediately**.

**第一句是全書對 haircut 最好的定義：`haircut = 客戶自己出的錢 = 客戶的股本`。** 剩下的都是借來的，而且**虧損不以自有資金為上限**。

### Repo vs Preferred Margin Lending：兩種融資產品

| | **Repo** | **Margin Account（Preferred Margin Lending）** |
|---|---|---|
| 法律文件 | MRA — 長文件 | Client Agreement — 簡單 |
| 適合誰 | 淨值 **$10mm 以上**的成熟客戶 | 一般客戶 |
| 最低門檻 | 單筆 **1–5mm**（依券種）／表格另寫 **5mm** ⚠️ | **$500,000** 借方餘額 |
| 利率怎麼定 | **依個別券種**的 repo 市場 | **整戶一個利率**（1 個月 LIBOR 平均 + spread） |
| Haircut | 依券種、依客戶 tier | 整戶一個利率，但**不同券仍有不同 haircut** |
| 作業 | **極度人工**：每一筆錢或券的移動都要打一張票 | 不人工：系統估值，線上按鈕要錢 |
| 對帳單 | **沒有正式對帳單**，只有起訖確認書 | **有正式月結單**，列出所有活動 |
| 系統 | MTS 或 ITS（依券種） | TMS |

⚠️ **原件內部不一致：** 本文寫 `The minimum size pieces are 1-5mm depending on the security`，右欄比較表卻寫 `Minimum transactions usually 5mm in notional`。**同一頁上，最低單筆是 1mm 還是 5mm，兩個答案。**

⚠️ **原件 Section III 的標題承諾了三件事，只交付了一件。** 目錄與章節頁都寫 `Suitability, Trade Maintenance, Exposure`，但正文只有 suitability 這一頁半。**Trade Maintenance 與 Exposure 兩個主題在本節完全沒有內容**——它們散落在第 VI 節（Infinity 的 Exposure Summary）與第 XI 節（CAMEO）。而且正文括號裡寫 `margin will be covered in the trade flow section in more detail`（🔧 `±low` = `flow`），**但這份手冊裡根本沒有叫「trade flow」的章節**。這是一個懸空的交叉引用。

> [!example] 實例：兩個客戶，兩個產品（對比型）
> **客戶 A：某大學校產基金**
> - 淨值 $800mm，有專職固定收益團隊與後台
> - 想借 $30mm，抵押品是一批特定的 UST 與 Agency MBS
> - 對利率極度敏感（差 5bp 就要換交易對手）
>
> → **Repo。** 因為他要的是**逐券議價**：UST 那部分可以拿到很低的利率，Agency MBS 那部分利率高一點。整戶單一利率的 margin account 會讓他在 UST 那部分吃虧。人工作業對他不是問題，他有後台。
>
> **客戶 B：某醫師的個人投資帳戶**
> - 淨值 $6mm，沒有後台，人在看診
> - 想用手上的公司債借 $1.2mm 加碼
>
> → **Margin Account。** 理由三個：① 淨值不到 $10mm，Repo 的適用性門檻不過；② 他需要月結單（Repo 沒有）；③ 他不可能為了每筆券的移動去打票。
>
> ⚠️ **但注意原件留下的坑：Margin Account 的 `Minimum amount of $500,000 debit balance required` 是「維持門檻」還是「開戶門檻」？原件沒說。** 如果客戶餘額掉到 $499,000 會怎樣——失去 Preferred Rate？還是被平倉？手冊沒有答案。
>
> **CEX 對應：** 這就是「合約帳戶 vs 統一帳戶（Portfolio Margin）」的分野。統一帳戶用整戶淨值算保證金（像 margin account），逐倉／逐幣種計算則像 repo 的逐券議價。**兩者的爆倉邏輯完全不同，而多數平台的說明文件講得跟這份手冊一樣不清楚。**

---

## IV. Trade Ledgers（交易分類帳）

⚠️ **本節在 OCR 中幾乎完全損毀。** 原件 p.24 是一張橫排的組織／流向圖，掃描後只剩下垂直排列的亂碼。**可以辨識出的欄位只有：**

```
ISSUE
RR (BUY) | RE (SELL) | BORR. VS. CASH
DOLLAR ROLL
TRADER
FIRM FUNDING
```

**能確定的內容（結合全書其他章節的交叉引用）：**

| 代碼 | 意思 | 全書其他出處佐證 |
|---|---|---|
| **RR** | Reverse Repo（雷曼買進抵押品／出現金） | Sales Credit 表以 `RR / RE` 分欄；CAMEO 報表樣本出現 `RE` 欄位 |
| **RE** | Repo（雷曼賣出抵押品／收現金） | 同上 |
| **BORR. VS. CASH** | 以現金為擔保的借券（Securities Borrow vs Cash） | Section II 定義段的 Securities Lending/Borrowing |
| **DOLLAR ROLL** | 房貸抵押證券特有的展期交易 | Infinity 有 Mortgage 專屬畫面 |
| **FIRM FUNDING** | 全行自有資金調度帳 | CAMEO 樣本中出現 `CENTRAL FUNDING DESK` 為交易員名稱 |

**白話：** Ledger（分類帳）是**交易的歸屬桶**。同一張券的同一筆交易，會依「是誰的部位、為了什麼目的做的」被記到不同的 ledger。

**為什麼重要：** ledger 決定三件事——**誰的 P&L、誰的曝險、誰的獎金**。Section VI 明寫 Infinity 的 Trade Browse 預設只顯示「使用者自己的 ledger／sales team」的交易，要看別人的必須手動加。

> [!example] 實例：一張券，四個帳
> 雷曼手上有一張 $10mm 的 GNMA 房貸債。同一天：
> ```
> 交易員 A 為了融資庫存，把它 repo 出去          → 記到 A 的 RE ledger
> 交易員 B 跑 matched book，reverse 進同一種券   → 記到 B 的 RR ledger
> 後台為了補一筆 fail，臨時借了同一種券          → 記到 BORR. VS. CASH
> Treasury 為了全行日終軋平，做了一筆隔夜        → 記到 FIRM FUNDING
> ```
> **四個 ledger、四個負責人、四份曝險數字。從全行角度看，這四筆有一部分互相抵銷；但沒有任何一個交易員看得到抵銷後的淨額。**
>
> ⚠️ **這就是 Section I 那張電話簿洩露的問題在資料層的樣子：分工產生了四個局部真相，全貌只存在於日終彙總報表裡。** 而彙總報表是隔天早上才出來的（Section XI 的 SOD Exposure = Start of Day）。
>
> **對 QA 的意義：** 這是**對帳測試（reconciliation testing）**的原型題。任何一個有多帳本的系統——CEX 的現貨帳／合約帳／理財帳／資金費率帳——都要驗一件事：**「各帳本加總 = 全行淨部位」在每一個時點都成立嗎？** 中途有沒有一個狀態是「A 帳已扣、B 帳未加」？那個窗口就是漏洞。

---

## V. Sales Credit Schedule（業務績效表）

⚠️ **本節（原件 p.26–27）同樣是橫式大表，OCR 後行列完全錯位，逐格數字無法還原。** 但**表頭與量級是可辨識的**，而且量級本身就是重點。

**表的兩個維度：**

```
縱軸（抵押品類型，風險由低到高）：
  ALL GOVERNMENTS → GOVERNMENT SPECIALS → AGENCY SPECIALS → AGENCY GC
  → CORPS & ABS（A or better / A- to BBB- / < Inv Grade）
  → MORTGAGES（Agency Pass Throughs / Agency CMO / Private Label CMO：AAA-AA / A-BBB / <BBB-）
  → ESOTERICS（A3/P3 and Unrated）
  → PROGRAMS

橫軸（天期，由短到長）：
  Overnight/Open | <2 weeks | 2 weeks–30 days | 31–60 days | >60 days
  每一格再分 RR / RE 兩欄
```

**單位是 `$X/MM/YR`——每一百萬美元名目、每年，給業務多少業績分。**

**可辨識的量級端點：**

| 抵押品 | 業績分（每 $1mm 每年） |
|---|---|
| All Governments（隔夜／短天期） | **$100/MM/YR** |
| 投資等級公司債與 ABS | $200 – $750/MM/YR |
| Private Label CMO（低評等） | $700 – $1,500/MM/YR |
| **Esoterics（A3/P3 與未評等）** | **$1,500 – $3,000/MM/YR** |
| 最長天期的最差抵押品 | **TBA**（待議，即無上限） |

> [!example] 實例：業務的誘因結構長什麼樣（本節最重要的一段）
> 兩筆交易，業務該推哪一筆？
>
> | | 交易 A | 交易 B |
> |---|---|---|
> | 抵押品 | 美國公債 | 未評等的私募 CMO（esoteric） |
> | 金額 | $100mm | $100mm |
> | 天期 | 隔夜 | 90 天 |
> | 對雷曼的風險 | 幾乎為零 | 極高（流動性、評價、對手） |
> | **業務業績分** | **$100 × 100 = $10,000/年** | **$3,000 × 100 = $300,000/年** |
> | **倍數** | 1× | **30×** |
>
> **同樣一億美元，賣爛抵押品的長天期交易，業務業績分是賣公債的 30 倍。**
>
> 這在設計上完全合理——難賣的東西該給高獎金，風險溢酬本來就該反映在定價上。**但把它跟原件 p.8 的自我定位放在一起看，就變成另一件事：**
>
> > Lehman Brothers is Market Leader in Repurchase Agreements:
> > - One of the largest **matched-books** in industry.
> > - **Ability to finance esoteric collateral type.**
> > - **Aggressive specials trading.**
>
> ⚠️ **雷曼在 2005 年把三件事寫成競爭優勢：業界最大的（自承其實錯配的）matched book、有能力融資最冷門的抵押品、激進的特券交易。三年後，這三件事一字不改，就是死因清單。**
>
> **而業績表把這個定位翻譯成了一線業務每天早上醒來的誘因：去找最冷門的抵押品、談最長的天期。** 這不是有人做錯什麼，這是**制度設計把公司的策略正確地下放到了個人層級**——策略錯了，下放得越有效率，死得越快。
>
> **CEX 對應：** 同型結構在幣圈到處都是。上架費／做市返佣把「上架冷門幣」的收益做得遠高於「上架 BTC/ETH」；理財產品的推廣獎金與 APY 正相關，而高 APY 來自高風險策略。**要看一個平台真正在鼓勵什麼，不要讀它的風控政策，讀它的獎金表。**

⚠️ **本節還有一個空白：整張表沒有任何一欄是「這筆交易佔用多少資產負債表／多少資本」。** 業績分只跟名目金額、抵押品類型、天期掛鉤。**業務沒有任何誘因去在意這筆交易佔用了公司多少槓桿空間。** 這個空白，正是 Repo 105 出現的土壤——**當「佔用資產負債表」對前台是免費的，減少它的責任就會被推到後台去用會計手段解決。**

---

## VI. Infinity Quick Reference Guide（前台交易輸入系統）

> **這一節與下一節是「投行實務」與「教科書」差最遠的地方。教科書不會告訴你，一個 repo 業務有 60% 的時間是在一個綠底藍字的 Windows 應用程式裡右鍵點選。**

### 這一節我保留了什麼、捨棄了什麼

- ✅ **保留：** 系統的功能架構、狀態與權限模型、**業務實際在做的操作序列**、系統設計洩露的風險
- ❌ **捨棄：** 快捷鍵細節（Page Up/Down 換頁籤、上下鍵調日期）、支援專線、純 UI 排序技巧
- **理由：** 快捷鍵是 2005 年一個已不存在的系統的肌肉記憶，零遷移價值；**但「一個 substitution 要點九下、且中間任一步跳掉就是不同結果」這件事，是所有交易系統的通性**，有遷移價值。

### 1. Infinity 的六大模組

| 模組 | 功能 | 誰能用 |
|---|---|---|
| **Trade Entry** | 開新交易（contract + collateral 兩層） | Sales / Support |
| **Trade Browse** | 瀏覽當日／往日交易，並在上面做 Modify / **Rollover** / Release / Confirmation / Print / Fax / **Substitution** / **Closeout** / Breakup | Sales |
| **Position Browse** | 部位層級的 Substitution、Undo Substitution、Adjust to Offset | **Traders Only** |
| **Collateral Manager (CM)** | Closeout（Release / Undo / Approve / Instruction Override）、**Exposure Summary**、All Trades Screen | Sales（部分 Traders Only） |
| **Profiles (PF)** | 客戶／經紀商／Ledger／Sales Team 維護、Auto Fax 旗標、分配參數 | Support |
| **Product Maintenance / Rate Board** | 商品價格、Bulk Mark、證券標籤；浮動利率交易的每日利率更新 | Support / Sales |

### 2. 交易的兩層結構：Contract 與 Collateral

**這是理解整個系統的鑰匙。** 一筆 repo 在 Infinity 裡不是一筆記錄，是**兩層**：

```
Contract（合約層）：金額、天期、利率、客戶、ledger、sales team
   └─ Collateral（抵押品層）：一張或多張券，各有 CUSIP、價格、margin
```

原件揭露了一個**非對稱**（🔧 已修 OCR）：

> **Contract margin applies to Repo only**, implying that margin on the contract can apply to all collateral. **Reverse margin however, is applicable on the collateral level only** and defaults from the tier set up for the customer shown in the profile (PF) on Infinity.

| 交易方向 | Margin 設在哪一層 | 意思 |
|---|---|---|
| **Repo**（雷曼借現金） | **Contract 層** | 整張合約一個 margin，套用到所有抵押品 |
| **Reverse**（雷曼出現金） | **Collateral 層**，且**預設值來自客戶 tier** | 每一張券各有自己的 margin |

⚠️ **這個非對稱有實質意義，而原件只說明了「是這樣」，沒說明「為什麼」。** 合理的推測是：雷曼借錢時是自己給 margin，整包給就好；雷曼**出**錢時要保護自己，必須逐券依信用政策設 haircut——而那個 haircut 來自第 VIII 節的 grid。**這條路徑是 Infinity 與 Credit Risk Management 系統的唯一自動連結點**，全書就寫在這一句話裡。

### 3. Approve 與 Release：兩段式提交

原件反覆出現 `Approve or Release` 這組動詞。從各處線索拼出來的狀態機：

```
[空白] ──Trade Entry──> [Shell 已建立，未分配抵押品]
                              │
                       輸入 collateral
                              ↓
                        [已分配，未核可]
                              │
                     Enter → Approve
                              ↓
                        [Approved 已核可] ←── Undo 可行
                              │
                     Enter → Release
                              ↓
                    [Released 已放行 → 送 MTS] ←── ⚠️ 不可 Undo
```

原件的關鍵句：

> 'Enter' at any field on either the contract or collateral maintenance screen will bring the cursor to **Approve** if the shell has not been allocated or Released. If it has been allocated, 'Enter' again will either **Approve or Release** the trade.

以及 close-out 那一段的明確警告：

> **NOTE: Released closeouts may not be undone.**

⚠️ **這是全書唯一一句明確標示「不可逆」的話，而它藏在第 VI 節的一段 NOTE 裡，沒有出現在任何摘要或檢查清單中。** 對一個新進業務而言，**唯一會造成不可回復損失的操作，在手冊裡的權重與「怎麼排序欄位」相同。**

> [!example] 實例：一個 substitution 要點九下（原件逐字操作序列）
> 客戶要求把一張抵押品換掉。**業務在 Infinity 裡要做的完整序列：**
> ```
> 1. 進 Trade Browse Filter
> 2. 輸入 Settlement Id 或 Contract Id（格式 yyyy/dd/mm-contractId）
> 3. 勾選畫面底部的 Prior Day
> 4. 按 Apply
> 5. 在要換掉的那張 collateral 上「右鍵」
> 6. 選 Sub/Modify Sub
> 7. 左鍵點 Position Browse，或直接輸入新券的 CUSIP
> 8. 選 Approve 或 Release
> 9.（若要反悔）右鍵 Fully Subbed 那一列 → Sub/Modify Sub →
>    右鍵最上面那一列 → Undo Sub → Approve 或 Release
> ```
>
> ⚠️ **注意第 2 步的日期格式：原件寫 `yyyy/dd/mm`——年／日／月。** 這與美國慣用的 `mm/dd/yyyy` 和 ISO 的 `yyyy/mm/dd` **都不同**。要嘛是原件的 typo，要嘛這個欄位真的用了一個全世界沒有人用的順序。**兩種情況都很糟：** 前者代表手冊會教錯人，後者代表 5 月 3 日與 3 月 5 日在這個欄位裡是可以互換的，**而且錯了不會報錯，只會查到別筆交易。**
>
> **這是 QA 的經典題型：日期格式歧義。** 任何 `03/05` 在系統邊界上都是一顆定時炸彈。要驗它只有一招——**用一個日與月不可能混淆的日期（例如 25 號）跑一次，看系統把它放到哪裡。**

> [!example] 實例：Exposure Summary 的三個數字，以及它們為什麼不會兜起來
> Infinity 的 Exposure Summary 每天給每個客戶三個數字：
>
> | 欄位 | 定義（原件） | 特性 |
> |---|---|---|
> | **SOD Exposure** | 日初完成時所有有效交易的總曝險，**包含當天會自動 close out 的交易** | 原件明寫 **"This number should never change"** |
> | **Current Exposure** | 隨當日活動更新：substitution、cancellation、modification | ⚠️ **新交易不算進去**、**reprice 不算進去** |
> | **End of Day Exposure** | Current Exposure ± Reprice Payable/Receivable | 日終才對得起來 |
>
> **實務場景：** 早上 9 點，某客戶的 Current Exposure 顯示 $2.1mm。**這個數字是不是這個客戶現在欠雷曼的錢？**
>
> **不是。** 因為：
> - 早上 9:15 這個客戶新做了一筆 $50mm 的交易 → **Current Exposure 不動**（原件明寫新交易不計算曝險）
> - 早上 10:00 做了一次 reprice → **Current Exposure 不動**（原件明寫 reprice 不反映在此欄）
>
> **所以 Current Exposure 是「以日初部位為基準、經過修改調整後的曝險」，不是「當下曝險」。** 名字叫 Current，內容不是 current。
>
> ⚠️ **而原件在同一份文件裡，把這個欄位叫了兩個名字。**
> - Section VI 的 Collateral Manager 段落：叫它 **`Current Exposure (originally Exposure after Returns)`**
> - 隔一頁的 Exposure Summary 段落：叫它 **`Pre-Reprice Exposure (originally Exposure after Returns)`**
> - 而第二段的內文說明**仍然全部用 `Current Exposure` 這個字**
>
> **同一個欄位、同一份手冊、相隔一頁、三個名字（Exposure after Returns → Current Exposure → Pre-Reprice Exposure），而且改名沒有改內文。** 這是典型的「欄位改名了、文件只改了標題」。
>
> **`Pre-Reprice Exposure` 其實是比較誠實的名字**——它明確告訴你「這個數字不含 reprice」。改名的人知道問題在哪，但沒有改完。
>
> **對 QA 的意義：** 這是**命名與語意漂移**的教科書案例。當一個欄位的名字承諾了語意（Current = 當下），而實作不符，**所有下游使用者都會誤用它，而且不會有任何錯誤訊息**。驗收這種欄位只有一招：**造一筆會讓兩種解讀給出不同答案的資料**（例如日初後新增一筆大額交易），看系統顯示哪一個。

### 4. Closeout：自動與手動，以及誰說了算

原件描述的自動 closeout 邏輯：

> Infinity performs **automatic closeouts each day** by reviewing certain firm ledgers for collateral that **if closed out, would make the firm flat**. **Traders have the ability to undo closeouts** per position if they do not want the collateral to be returned. This action will broadcast to the salespersons closeout screen...
>
> **Upon the Traders say so**, the Salespeople may release all approved closeouts.

**權限模型：**

```
系統  ── 自動判斷「這筆結掉公司就軋平了」→ 自動排入 closeout
交易員 ── 有權 Undo（我不想把券還回去）→ 廣播到業務畫面（反白灰色）
業務  ── 只能在交易員點頭後 Release（Released 之後不可 Undo）
```

**8:45AM 開始，系統會依 sales team 跳提醒視窗，直到所有 closeout 都被 undo 或 release 為止。**

⚠️ **這裡有一個責任錯配：業務按下的那個 Release 是不可逆的，但決定要不要 release 的是交易員，而且是口頭的（"Upon the Traders say so"）。** 系統裡留下的紀錄是業務的操作 ID，決策紀錄不存在。**這在事後追查時，責任會停在按鍵的那個人身上。**

### 5. Forward-starting 交易的假券機制

原件揭露了一個真正的實務細節：

> **MBSFIN** for Mortgages is the dummy security that may be used on **forward starting contracts only**. When a forward Mortgage trade is entered MBSFIN is automatically dropped into the collateral maintenance screen upon selecting Approve or Release.
>
> This is not the case for Governments; rather one of the many **dummy government securities** (speak with Trade Support for the specific CUSIPs) must be **manually typed** into the Description on the Collateral Maintenance screen.
>
> **NOTE:** On Settlement Date a cancellation of any MBS or the government dummy securities is sent to MTS and the shell is reinstated on Infinity to be collateralized that day. **If the MBSFIN or Govt dummy trades have already been cancelled on MTS, Infinity will get naked for the cancellations sent to MTS.**

🔧 **OCR 註記：** 原文中這個假券代碼出現了 **三種拼法**——`MBSFTN`、`MBSFIN`、`MBFIN`。三處指的顯然是同一個東西，上文統一為 `MBSFIN`（出現兩次，為多數）。⚠️ **但無法排除原件本身就打錯了其中一處**，要用請以 PDF 影像為準。

**白話：** 遠期起算的交易，成交當下還不知道要押哪張券（因為那張券可能還沒買到），**所以系統先塞一張假券佔位**。到了交割日，系統把假券取消、把 shell 放回來，讓當天真正去分配抵押品。

⚠️ **兩個問題：**
1. **房貸走自動、公債走手動。** 同一個機制，MBS 自動填入，公債要業務**手動打字**輸入一組要另外去問 Trade Support 才知道的 CUSIP。**手動 = 會打錯 = 會打到別張假券。**
2. **`Infinity will get naked` 是什麼意思，原件沒有定義。** 從語境推測是「Infinity 端會失去對應紀錄／曝險裸露」。**這是一個 race condition**：如果 MTS 那邊已經先把假券交易取消掉，Infinity 再送一次取消指令就會落空。原件只描述了症狀，沒有給處理程序。**這是全書最像 bug report 的一段，而它被寫成了一條 NOTE。**

---

## VII. MTS Verbs & Commands（主機系統指令）

**白話：** Infinity 是前台的圖形介面；**MTS 是背後那台 IBM 主機**。真正的交易紀錄住在 MTS。當 Infinity 顯示的東西跟現實不符，業務要自己登入 MTS 打指令查。

**這一節原件只有一頁，是一張 14 個四字母指令的對照表。** 這一頁的存在本身就說明了一件事：**2005 年的一線業務，被預期要會用綠螢幕主機指令查資料。**

### 這一節我保留了什麼、捨棄了什麼

- ✅ **保留：** 完整的 14 個指令代碼、16 條功能描述、以及**兩者對不起來**這個事實
- ❌ **捨棄：** 逐條 1 對 1 配對——**因為配不了，見下方 ⚠️**
- **理由：** 硬配一個看起來完整的表格，等於製造一份看起來可信的錯誤資料。**寧可交付一份誠實的殘缺，也不交付一份完整的假貨。**

### ⚠️ 這一頁的 OCR 有一個結構性缺陷

原件是**兩欄式排版**：左欄指令、右欄功能。掃描後兩欄被壓平成上下兩段。

```
指令欄（14 個）：
LVT  LVTR  LVTI  LVPO  LBFN  LVTD  LVCT
LVCM LBCM  LVCC  LBCI  LVFN  LVSM  LVTO

功能欄（16 條）
```

**14 ≠ 16。指令欄少了兩個。** 因此**逐條對應無法還原**——任何 1 對 1 的配對表都會有至少兩處錯位，而且錯位會往後傳染。

### 可以確定的兩個錨點

原件的功能描述裡，有兩條**自己提到了指令代碼**，這兩個是可靠的：

| 指令 | 功能 | 依據 |
|---|---|---|
| **LVT** | 查一筆 repo 交易的明細（需要 trade id 或 contract id） | 另一條描述寫 `need trade id first (via LVT)` |
| **LVCC** | 進到某筆交易後，把 on-side 與 off-side 的明細**依證券彙總成一行**（需先用 LVT 進去，再打 `LVCC 1`） | 描述中自帶 `then 'LVCC 1'`（🔧 OCR 作 `L vee I`） |

### 16 條功能在做什麼（依用途分組，不對應指令）

| 用途分組 | 功能 |
|---|---|
| **查交易本身** | ① 查 repo 交易明細（trade id / contract id）② 查交易明細，用 `1` 可看**前一份合約** ③ 查交易明細（需 tran 編號）④ 查一筆交易的**歷史**（需 tran 編號） |
| **查交割與清算** | ⑤ 查一筆交易的**交割指示** ⑥ 查一筆交易的**清算狀態** ⑦ 若實體券部門（cage）以**不同的淨額**清算，差額顯示在這裡 |
| **查錢** | ⑧ 查被 clearance 或 cash management **軋掉（paired off）**的交易淨應收／應付（給任一邊的 trade id 即可）⑨ 瀏覽某金額區間，看現金匯款有沒有進來、或有沒有產生應收應付 ⑩ 查某筆 pairoff 的應收應付**要送去哪／從哪來**（需 pairoff 編號，以 `p` 開頭） |
| **查帳戶** | ⑪ 查帳戶設定全貌（需客戶編號）⑫ 用帳戶**全名**反查帳號 ⑬ 查某帳戶的**預設交割與匯款指示**（需客戶編號） |
| **查參考資料** | ⑭ 查某檔證券在 MTS 上**建檔了沒**（需 CUSIP）⑮ 用 5 位數 operator id 反查**MTS 使用者姓名** ⑯ 彙總 on/off-side 明細成一行 |

⚠️ **另外兩處 OCR 疑義：**
- 功能②的原文是 `Also to view details of repo trade (use 'I' to view previous contract` — **括號沒有關**，而且那個 `'I'` 幾乎確定是 `'1'`（數字一）的誤讀，因為同一頁的 `LVCC 1` 被讀成了 `L vee I`。
- `tranni` / `tra11lli` 這個字在四條描述裡出現，**應是 `tran nbr` 或 `tran id`（交易流水號）的 OCR 誤讀**，無法確定正確拼法。

> [!example] 實例：一筆 fail 了，業務要打哪幾個指令
> 早上 9 點，客戶打來：「昨天那筆 $30mm 的 repo，我的券沒收到。」
>
> **業務的查證順序（用上表的功能分組，不是指令代碼）：**
> ```
> 步驟 1【查交易本身】用 trade id 調出交易明細
>        → 確認：交易確實存在嗎？金額、天期、客戶對嗎？
>        → 如果這一步就查不到 → 票根本沒打進 MTS（Infinity 端 Released 了但沒傳過去）
>
> 步驟 2【查交割與清算】查這筆交易的交割指示
>        → 確認：券要送去哪？是不是送到客戶給的舊帳戶了？
>        → 第 IX 節明寫「雙方必須提前至少 24 小時對上（instruct and match）」
>
> 步驟 3【查交割與清算】查清算狀態
>        → 券卡在哪一關？Fed Wire？DTC？還是根本沒發出去？
>
> 步驟 4【查錢】查有沒有被 pair off
>        → 如果同一天同一檔券有反向交易，clearance 可能把兩筆軋掉了，
>          客戶的券「消失」是因為被抵銷，不是因為沒送
>
> 步驟 5【查交易本身】查這筆交易的歷史
>        → 誰在什麼時候改過這筆交易？
> ```
> **五個步驟，五個不同指令，一個綠螢幕。** 這就是 2005 年的 repo 業務工作。
>
> **為什麼今天還要學這個？** 因為**這五個步驟的邏輯結構完全沒有變**。今天你在 CEX 查一筆提幣沒到帳，順序一模一樣：
> ```
> ① 訂單存在嗎（訂單系統）→ ② 出金指令發出了嗎（風控系統）
> → ③ 鏈上廣播了嗎（節點）→ ④ 有沒有被內部轉帳抵銷（清結算）
> → ⑤ 這筆單被誰改過（審計日誌）
> ```
> **變的是介面，沒變的是「一筆交易會在幾個系統之間掉下去」這件事。** 手動測試之所以不會被自動化取代，就是因為要問對這五個問題，得先知道有這五個系統。

---

## VIII. Credit Risk Management（信用風險管理）

**白話：** 這一節回答一個問題——**這個客戶能借多少、要押多少券、能借多久，誰說了算？**

**答案：不是業務、不是交易員，是 Credit Risk Management，而且是透過一個內部網站。**

### 1. 三樣東西住在同一個網站上

原件 p.40（🔧 已修 OCR）：

> Lehman Brothers has a website which provides **haircut grids, credit analyst coverage, and credit limit information** for financing trades. This site is accessible to any Lehman employee with an active Lehman Live UserID.
>
> The information contained on these reports is of a **highly sensitive nature** and should be treated confidentially.

| 查什麼 | 路徑（原件描述） |
|---|---|
| **客戶額度、可用餘額、天期上限** | Client Limit Utilization → F.I. Financing → 搜尋客戶 |
| **Haircut grid** | Haircut Grids → 點選客戶類別 → **開出一張 Excel** |
| **該找哪個信用分析師** | Documents → Credit Analyst Coverage |
| **新興市場（EMG）債券的 haircut** | Client Limit Utilization → F.I. Financing → 下拉 Spreadsheets → Haircut worksheets → 選對手方／雷曼法人／資產類型／EMG 資產／國家 |

⚠️ **`This site is accessible to any Lehman employee`——全公司任何一個有帳號的員工都能查到所有客戶的授信額度與 haircut。** 原件用「請保密」處理這件事，沒有任何存取控制。**這是 2005 年的常態，但用今天的標準看，它是一個沒有最小權限原則（least privilege）的內部資料庫。**

### 2. Haircut 到底怎麼定：兩個維度相乘

原件 p.42 的說明是全節最重要的一句：

> Haircuts are based on a combination of **the creditworthiness of the client** and **the characteristics of the bond**. **The tier of the client is determined by the Credit Analyst at the time client is approved to do repo.**

```
Haircut = f(客戶 tier, 抵押品特性)
              ↑              ↑
     信用分析師在開戶時定    債券評等 × 剩餘年期 × 類型
     （之後不隨市況變）      （grid 上查）
```

**Grid 的實際結構（p.44，OCR 可辨識的部分）：**

```
縱軸（抵押品）：
  Corporate Bonds：A Rated 10Y/30Y、BBB+ 5Y/10Y/30Y、BBB 5Y/10Y/30Y、BBB- 5Y/10Y/30Y
  BB Rated 5Y/10Y/30Y、B Rated、CCC Rated、CC Rated、Defaulted & Non-Rated
  GCF Securities、Government/Agencies/Other

橫軸（客戶 tier × 天期）：
  Global Financial Intermediary / Tier 1 …
    × Open | 1 Month | Term
```

**可辨識的 haircut 量級：**

| 抵押品 | Reverse Repo Haircut |
|---|---|
| **Government / Agencies / Other**（依剩餘年期分級） | **0.15% – 2.00%** |
| 投資等級公司債（A 至 BBB-） | **20% – 25%** |
| BB / B 級 | **25% – 30%** |
| CCC / CC 級 | **40% – 50%** |
| **Defaulted & Non-Rated** | **50%** |
| **GCF Securities** | ⚠️ **OCR 顯示整列為 0.00%** |

⚠️ **四處必須標記的問題：**

1. **GCF 那一列全是 0.00%。** GCF（General Collateral Finance）是透過 FICC 集中結算的三方 repo，理論上有中央對手方，所以 haircut 為零**在制度上說得通**。但**字面讀就是「零緩衝墊」**，而這份 grid 沒有任何一行說明為什麼。要用請務必回 PDF 影像確認。
2. **「Risk factor」那一欄的數字是 `640%`、`12.76%`、`127%`、`84%`、`0.99%`——量級完全不一致，顯然混雜了 OCR 噪音。** 這一欄無法還原，不要引用。
3. **逐格對應無法還原。** 上表只給**區間**。實際上同一張 BBB 債對 Tier 1 客戶與對一般客戶的 haircut 是不同的，那個差異正是這張 grid 的全部價值——**而它在 OCR 中丟失了**。
4. **客戶 tier 在開戶時決定，之後不變。** 原件明寫 `at the time client is approved`。**沒有任何機制描述 tier 的重新評估。** 一個 2003 年評為 Tier 1 的避險基金，在 2008 年仍然是 Tier 1，除非有人主動去改。

> [!example] 實例：同一張債券，兩個客戶，兩個 haircut（對比型）
> 抵押品：同一檔 **BBB 級、10 年期公司債**，市值 $10,000,000。
>
> | | 客戶 X（Tier 1 大型銀行） | 客戶 Y（未評等的小型避險基金） |
> |---|---|---|
> | 客戶 tier | Tier 1 | 較低 tier |
> | Grid 查到的 haircut | 假設 **20%** | 假設 **25%** |
> | 借得到的現金 | $8,000,000 | $7,500,000 |
> | 緩衝墊 | $2,000,000 | $2,500,000 |
>
> **同一張券，因為對手方不同，差 $500,000 的融資額度。**
>
> **這在教什麼？haircut 不是資產的屬性，是「資產 × 對手方」這一對的屬性。** 新手最常見的錯誤就是問「這張券的 haircut 是多少」——這個問題沒有答案。
>
> **CEX 對應：** 這正是幣圈**分級保證金（tiered margin）**的邏輯，但幣圈通常只做了一半：
> ```
> 幣圈做了：      資產維度（BTC 的 LTV 高於某小幣）
> 幣圈常常沒做：  對手方維度（散戶與做市商用同一張表）
> ```
> **而做了對手方分級的（Prime Broker、機構借貸台），就是這份手冊 2005 年的 grid。**

> [!example] 實例：Haircut 訂太低會發生什麼——逐日推演
> 借款人：某避險基金。抵押品：$10mm 市值的 BBB 公司債。**兩種 haircut 設定，看它們在同一場市場動盪裡的表現。**
>
> **情境 A：haircut 訂 3%（太低，只有政府債等級的緩衝）**
> ```
> Day 0：市值 $10.00mm，借出 $9.70mm，緩衝墊 $0.30mm
> Day 1：信評下調傳言，債券跌 4% → 市值 $9.60mm
>        → 曝險 = 9.70 − 9.60 = +$0.10mm（無擔保）
>        → 發出 margin call，要求補 $0.40mm
> Day 2：客戶說「我在調度，下午給你」→ 債券又跌 6% → 市值 $9.02mm
>        → 曝險 = $0.68mm
> Day 3：客戶不接電話 → 開始清算
>        → 但這是 BBB 公司債，不是公債，市場一有壓力就沒買盤
>        → 實際成交價比報價再低 5% → 拿回 $8.57mm
>        → 損失 $1.13mm（借出 9.70 − 收回 8.57）
> ```
>
> **情境 B：haircut 訂 25%（grid 上的正確值）**
> ```
> Day 0：市值 $10.00mm，借出 $7.50mm，緩衝墊 $2.50mm
> Day 1：跌 4% → 市值 $9.60mm，仍高於 $7.50mm 甚多 → 不需 call
> Day 2：跌 6% → 市值 $9.02mm → 仍有 $1.52mm 緩衝
> Day 3：清算，即使再折 5% 成交 → 拿回 $8.57mm
>        → 全額回收，還多收 $1.07mm 還給客戶
> ```
>
> **差別在哪？兩種情境的市場走勢一模一樣。差的只有 Day 0 那一個數字。**
>
> **Haircut 買的到底是什麼？三樣東西：**
> ```
> ① 價格波動的緩衝           ← 情境 A 在 Day 1 就用完了
> ② 「發現問題到完成清算」的時間  ← 情境 A 只有 1 天，情境 B 有很多天
> ③ 清算時的流動性折價        ← BBB 公司債在壓力下的折價，公債幾乎沒有
> ```
> **③ 是新手最常漏的：haircut 不只要蓋住價格會跌多少，還要蓋住「你賣的時候拿不到報價」那一段。** 這就是為什麼流動性差的資產 haircut 特別高——不是因為它波動大，是因為**你的賣出行為本身會壓低價格**。
>
> **CEX 對應（連環清算）：** 幣圈把這件事演到了極致。
> ```
> 清算線太接近初始保證金
>   → 小跌就觸發清算
>   → 清算單本身是市價賣單，把價格砸得更低
>   → 觸發下一批人的清算線
>   → 連環清算（cascading liquidation）
>   → 穿倉（清算所得不夠還債）→ 保險基金或自動減倉（ADL）
> ```
> **2021 年 5 月 19 日、2022 年 LUNA、2024 年多次插針，全部是同一個機制。** 這份 2005 年的 grid 用「BBB 20-25%、CCC 40-50%、違約 50%」表達的，就是「越沒有流動性，緩衝要越厚」——而幣圈很多平台對小幣種的初始保證金只有 5–10%。**這份手冊會給那些小幣打 50%。**

### 3. 有抵押品 ≠ 沒有信用風險

**這是本冊最重要的觀念，而原件只講了其中一半。**

原件 Section V 的風險清單只有兩項：

| 原件講的 | 內容 |
|---|---|
| **Collateral Risk** | 抵押品市值相對現金波動 → 產生無擔保曝險。處理方式：margin + 每日 mark-to-market |
| **Counterparty Risk** | 對手方倒帳。處理方式：只跟最高品質對手方往來、簽書面協議、每日盯市 |

**完整的清單應該有七項，原件只涵蓋了前兩項半：**

| # | 風險 | 原件有講嗎 |
|---|---|---|
| 1 | **抵押品價格波動** | ✅ 有（Collateral Risk） |
| 2 | **流動性與清算成本**（賣的時候賣不掉、或賣出價遠低於報價） | ⚠️ **完全沒有**。原件只講價值下跌，沒講「變不變得成現金」 |
| 3 | **對手方違約** | ✅ 有（Counterparty Risk） |
| 4 | **Wrong-way risk（錯向風險）** | ⚠️ **完全沒有。這是最致命的缺口** |
| 5 | **Settlement fail**（券或錢沒到位的空窗） | ⚠️ 只當作作業問題（Section I、VII、IX），沒有列為風險 |
| 6 | **文件與 close-out 可執行性**（違約時真的收得走券嗎、跨法域嗎） | ⚠️ 只講「要簽標準文件」，沒講執行風險 |
| 7 | **Haircut 本身夠不夠** | ⚠️ 沒有任何回測、壓力測試或校準機制的描述 |

> [!example] 實例：Wrong-way risk（錯向風險）——原件缺的那一塊
> **定義：當你的對手方違約機率上升時，你手上抵押品的價值同時下跌——兩件事不是獨立的，是正相關的。**
>
> **教科書的假設（也是原件的假設）：**
> ```
> 對手方會不會倒        —— 一個機率
> 抵押品會不會跌        —— 另一個機率
> 兩者獨立 → 同時發生的機率 = 兩者相乘 = 很小
> → 所以「有抵押品」幾乎等於「沒有風險」
> ```
>
> **現實（2007–2008）：**
> ```
> 雷曼 reverse in 一批某避險基金的 subprime CDO
>   ↓
> 房市轉壞
>   ↓ 同一個原因，同時發生：
>   ├─ CDO 市值崩跌（抵押品失效）
>   └─ 那家基金主要持有 subprime，同時瀕臨爆倉（對手方違約）
>   ↓
> 你在最需要抵押品值錢的那一天，發現它一文不值
>   ↓
> 而且所有持有同類資產的人在同一天全部在賣（流動性風險 #2 同時引爆）
> ```
> **三種風險不是三件事，是同一件事的三個面向。** 這就是 wrong-way risk。
>
> ⚠️ **原件用「只跟最高品質對手方往來」處理 counterparty risk，用「每日 mark-to-market」處理 collateral risk，然後就結束了。它從未問過：「這兩者會不會同時壞掉？」**
>
> **更諷刺的是：雷曼自己就是那個 wrong-way 的對手方。** 它用短期 repo 融資自己的房貸與 CDO 庫存。當房市轉壞：
> ```
> 雷曼的抵押品（CDO、CMO）價值下跌
>   → 交易對手要求更高的 haircut
>   → 同樣的券只能借到更少的錢
>   → 雷曼要補現金
>   → 而雷曼的現金來源正是這些 repo
>   → 更多人拒絕 roll
>   → 死亡螺旋
> ```
> **這份手冊教的每一個工具，在 2008 年 9 月都反過來咬了寫它的人。**
>
> **CEX／託管對應（完全同型）：**
> ```
> FTX：抵押品是 FTT（自家發行的平台幣）
>      → FTX 出事的消息 = FTT 崩盤的原因
>      → 抵押品價值與對手方信用是同一個變數
>      → 這是 wrong-way risk 的純粹形態
>
> Celsius / 三箭：抵押品是 stETH、GBTC
>      → 恐慌時 stETH 折價，而持有 stETH 的槓桿玩家同時爆倉
>
> 借貸平台通則：接受「自家平台幣」當抵押品 = 主動建立 wrong-way risk
> ```
> **這是託管／CEX 風控最該問的一題：我的抵押品組合，跟我的對手方組合，是不是被同一個因子驅動？** 而這個問題，2005 年的雷曼手冊沒有問。

---

## IX. LBIE / LBI Tickets & Settlement Instruction for ITS（雙法人的票據與交割指示）

**白話：** 雷曼不是一家公司，是一群公司。同一筆交易走哪一家法人，決定了適用哪一國的法律。

### 兩個法人實體

| 縮寫 | 全名 | 所在地 | 適用法律 | 用哪套系統 |
|---|---|---|---|---|
| **LBI** | Lehman Brothers Inc. | 紐約 | 美國法（MRA） | MTS（部分商品走 ITS） |
| **LBIE** | Lehman Brothers International (Europe) | 倫敦 | 英國法（GMRA） | ITS |

**原件本節的核心指示只有一條，但它比看起來重要得多：**

> Please make note if the ticket is for an **LBI** or an **LBIE** account by **highlighting all trades for LBI accounts** as below…
> As opposed to the below for an **LBIE** trade…

**用顏色標記 LBI 與 LBIE 的票。就這樣。這是原件對「跨法人交易」的全部風險控制。**

⚠️ **這是一份 Excel 範本 + 一個 highlight 顏色，用來區分兩個適用不同國家法律、不同破產程序、不同 close-out 淨額規則的法人實體。** 這個控制強度與它承載的法律風險完全不成比例。

**⚠️ 而這件事在三年後有了名字，叫 Repo 105 —— 見本冊最後一節。**

### 票據範本裡的欄位（原件 p.50）

| Trade Ticket | Reprice Ticket |
|---|---|
| SALES CREDIT | TOTAL PRINCIPAL AND INTEREST ON EXISTING TRADE |
| UP（例：`.05` = 5bp） | NEW LOAN AMOUNT |
| UP CALCULATION | CASH PAIR OFF PROCEEDS |
| SALES CREDIT UPON TERMINATION | PAIR OFF $ AMOUNT |
| TODAY'S DATE | **LEHMAN OWES CLIENT IF POSITIVE / CLIENT OWES LEHMAN IF NEGATIVE** |

**注意 Reprice Ticket 的最後一行——正負號決定誰欠誰。** 這是一張 Excel，人工填，正負號搞反就是把應收做成應付。

⚠️ 原件註記 `CREDITS APPLY TO TERM TRADES`——**業績分只算定期交易，不算 open repo。** 這又是一條誘因：**業務有理由把 open 談成 term。** 而 term 交易對雷曼是更長的資金鎖定，也就是更少的彈性。

### 交割時點

原件 p.51 給了一組 EMG（新興市場）交割慣例：

| 慣例 | 意思 |
|---|---|
| **T+3** | 成交後第三個營業日 |
| **T+2** | 也叫 **spot** |
| **T+1** | 也叫 **tom**，⚠️ 原件註明**須經交易台同意** |
| **T** | 同日（same day / daylight），⚠️ **須經交易台同意** |

⚠️ **這張表的行列對應同樣無法還原：4 個交易類別（EMG Cash trades / EMG Repo trades / EMG reprices for margin / EMG rerates）對上 6 個時點值。** 上表只保留「四種慣例各是什麼意思」這個可靠的部分，**不做類別對應**。

**本節唯一一句可以完全信賴、而且極重要的話：**

> **Both sides must instruct and match at least 24 hours in advance.**
> （雙方必須至少提前 24 小時發出交割指示並比對相符。）

> [!example] 實例：24 小時規則在防什麼
> 週四下午 4 點，業務跟客戶談成一筆 T+1 的 EMG repo，週五交割。
>
> **雷曼這一側：** 4:30 送出交割指示。
> **客戶那一側：** 客戶的後台已經下班，週五早上才處理。
>
> **週五：** 兩邊的指示對不上（instruct but not matched）→ **交割失敗**。
>
> **後果連鎖：**
> ```
> ① 客戶沒收到券（或錢）
> ② 雷曼的部位變成 fail → 進 Fail Control 的清單
> ③ 若這批券本來要用來交割給第三方 → 第二筆 fail
> ④ 業務要打 MTS 指令查（第 VII 節那五個步驟）
> ⑤ 若涉及跨時區（倫敦 ITS ↔ 紐約 MTS）→ 隔天才能處理
> ```
>
> **所以 24 小時規則的真正意思不是「早點做事」，是「留一個完整的營業日給兩邊的後台對帳」。**
>
> ⚠️ **但原件對 `T`（同日交割）只寫了「須經交易台同意」——同日交割在物理上不可能滿足「提前 24 小時」的要求。** 兩條規則直接衝突，原件沒有說明例外怎麼處理。
>
> **CEX 對應：** 這是**存提幣的確認數與內轉**的同型題。鏈上交割是 T+N 個區塊，內部帳戶互轉是 T+0。**兩者混在同一條資金流裡的時候，就會出現「A 帳已扣、B 帳未加」的窗口**——而那個窗口是所有交易所盜幣案的第一個落腳點。

---

## X. Domestic Settlement Instruction Guide（美國本土交割指示）

**白話：** 一張對照表，告訴你**每一種商品的券要往哪送、錢要往哪匯、出事找誰**。

**⚠️ 本節內容全數為雷曼的實際帳號、ABA 匯款代碼、DTC 參與者編號與員工直撥電話。本冊不轉錄任何號碼。** 以下只講結構。

### 表的四欄結構

```
商品類型  │  Wirable（電子交割去哪）  │  Physical（實體券送到哪）  │  Payment（錢匯到哪）  │  出事找誰
```

**商品分類（縱軸）：**

| 商品 | 交割系統 |
|---|---|
| Treasuries & Federal Agencies | **Fed Wire**（電子），無實體 |
| Money Markets：CP、CD、BA、Deposit Notes | 託管銀行 + 實體券窗口 |
| Medium Term Notes、Auction Rate Securities | **DTC** |
| Corporate Bonds / Municipal Bonds / Preferred Stock | **DTC** + 實體券窗口 |
| Mortgages：GNMA、FHLMC/FNMA CMO | **Fed Wire** |
| Private Label CMOs & ABS | **DTC** |

**⚠️ 這張表的三處資料品質問題：**

1. **同一個人有三個電話號碼。** 表中某位交割聯絡人在不同列出現了三個不同的分機，其中一個與另一位同事的分機完全相同。**這是列對齊在 OCR 中錯位，或原件本身的維護錯誤——兩種可能都無法從文字層排除。**
2. **ABA 代碼出現 10 位數版本。** 美國 ABA routing number 固定 9 位。原件某一列出現了 10 位數字，第一位是 `4`——**幾乎確定是 `#` 符號被誤讀成 `4`**（同一頁的 `Dept #538` 也被讀成 `Dept 4538`，是同一種誤讀）。
3. **三個不同的 Euroclear 編號散在兩節裡。** 第 IX 節給了 LBI 與 LBIE 各一組，本節的公司債列又出現第三組。**它們可能分屬不同用途，但原件沒有任何說明，讀者無從判斷該用哪一個。**

**為什麼這一節值得看：** 它證明了一件事——**「交割」不是一個動作，是六套互不相通的基礎設施。** Fed Wire、DTC、Euroclear、託管銀行、實體券窗口、以及匯款用的商業銀行帳戶。一筆交易可能同時牽動其中三套。

> [!example] 實例：一筆混合抵押品的 repo，交割要跨幾個系統
> 客戶押一籃子抵押品借 $50mm：
> ```
> $20mm 美國公債          → Fed Wire
> $15mm GNMA 房貸債       → Fed Wire（但不同的收券帳戶）
> $10mm 投資等級公司債     → DTC
> $5mm  某新興市場主權債   → Euroclear（第 IX 節，非本節）
> 現金 $50mm             → 商業銀行電匯
> ```
> **一筆交易，四個券交割管道 + 一個現金管道，四個不同的聯絡窗口。**
>
> **只要其中一段沒到，整筆交易的擔保就不完整**——而各段是各自獨立成功或失敗的。**沒有任何一個系統會告訴你「這筆交易的抵押品有 90% 到位」，你必須自己去五個地方查。**
>
> **這就是第 IV 節（Trade Ledgers）與第 VII 節（MTS）存在的原因。**

---

## XI. CAMEO and Margin Exposure Reports（每日盯市與追繳）

**這是全書最長的一節（18 頁，佔 25%）。它回答一個問題：交易做完之後，每一天怎麼確認你還是安全的。**

### 1. CAMEO 是什麼

> **CAMEO stands for Collateral And Margin Exposure Optimization**, and is the **official margin system** of Lehman Brothers. It is used **globally** by Margin, Corporate Credit, Trading, Sales, and other Operations departments.

**權限模型很清楚：**

| 角色 | 能做什麼 |
|---|---|
| **Margin 部門** | 定價、margin engine、聯絡人、發出 margin call、產對帳單 |
| **其他所有部門（含 Sales）** | **View only**——只能看畫面、跑報表，**不能改任何資料或觸發任何事件** |

⚠️ **注意這與第 VI 節 Infinity 的對比：** Infinity 裡業務可以做**不可逆**的 Release；CAMEO 裡業務**什麼都不能改**。**同一個人，在兩個系統裡的權限模型完全相反**，而手冊沒有任何一處把這件事講出來。

### 2. Margin Call 的一天

原件把整個流程寫成一串 bullet（🔧 已修 OCR）：

| 時點 | 動作 | 誰 |
|---|---|---|
| 每日 | Repo 交易 **mark to market** | 系統 |
| 每日 | Margin call 必須當日滿足 | — |
| 曝險超過 trigger | Margin 部門聯絡 Sales | Margin |
| 收到通知後 | Sales 到 CAMEO 跑 **Trade Exposure Report**，判斷「這個 call 是不是好 call」 | **Sales** |
| — | 檢查兩個變數：**haircut** 與 **mark-to-market 價格** | Sales |
| — | 有些客戶由 Margin 直接聯絡，有些由 Sales 聯絡（**Margin 決定哪些**） | Margin |
| — | 若由 Sales 處理，必須回報 Margin **打算怎麼解決**（free collateral／reprice／現金擔保） | Sales |
| **10:00 AM 前** | Sales 必須聯絡到客戶 | Sales |
| **3:00 PM 前**（MTS） | 追繳必須到位 | 客戶 |
| **同日或次日**（ITS） | 或者依 GMRA 的規定 | 客戶 |
| 未達成 | 上報 Credit + Trading Desk + Management | Sales |
| 之後 | **"could result in closing the trade or liquidation"** | — |

⚠️ **這段流程有三個實質缺陷：**

**① 同一件事有三個互相衝突的期限，而且沒有說哪個優先。**
```
MTS 的交易  → 當日 3PM
ITS 的交易  → 當日或次日
GMRA 寫的   → 依合約
```
**如果一筆交易在 ITS 上、而 GMRA 寫的是當日，到底哪個算？** 原件用 `or` 把三者並列，沒有優先順序。**在 2008 年 9 月，這種模糊正是無數訴訟的起點：一筆 call 到底違約了沒有，取決於你用哪一條規則算。**

**② 處置是裁量的，不是自動的。** `could result in closing the trade or liquidation`——是 `could`，不是 `will`。**沒有任何自動觸發條件。** 在系統性壓力下，這意味著沒有人願意當第一個對大客戶動手的人。

**③ 判斷 call 好壞的是拿獎金的人。** 已在第 I 節說明。

### 3. Exposure Report 逐格拆解（原件 p.69）

**這是全書唯一一段完整的曝險計算，而且它有一個算術錯誤。**

原件給的四條公式與代入值：

```
① Gross Mkt Exp = Market value + cpn interest + (financing int + principal)
   17,389 = (-395,425 + -74) + (11,077 + 401,911)

② Margin/Hrct Amt = principal × h/c
   -11,863 = -395,425 × .03

③ Margin Val = Gross Mkt Exp + Margin/Hrct Amt
   5,526 = 17,389 + (-11,863)

④ PME = 所有 Margin Val 加總，與 trigger 比較
   21,248 = 5,526 + 966 + 14,756
```

**先看原件自己的說明（極重要）：**

> **all the numbers are opposite on this report** so the Gross Mkt Exp is neg 17,389

**這份報表的正負號是反的。** 借出去的錢顯示為正、抵押品市值顯示為負。**這是會計上的「從雷曼的帳看」視角**，但報表沒有任何一處標示這件事，只有這句手寫式的註解。

**逐條驗算：**

| 公式 | 原件寫的 | 實際算出來 | 判定 |
|---|---|---|---|
| ① | `17,389` | `(-395,425 - 74) + (11,077 + 401,911)` = `-395,499 + 412,988` = **`17,489`** | ⚠️ **差 100** |
| ② | `-11,863` | `-395,425 × 0.03` = `-11,862.75` → `-11,863` | ✅ 正確 |
| ③ | `5,526` | `17,389 - 11,863` = `5,526` | ✅ 與①的結果一致（用 17,389） |
| ④ | `21,248` | `5,526 + 966 + 14,756` = `21,248` | ✅ 正確 |

⚠️ **錯誤 A：公式 ① 的算術差 100。** 四個輸入值加起來是 `17,489`，原件寫 `17,389`。**而且後面的 ③ 用的是 `17,389`**，所以錯誤要嘛在四個輸入值之一（某個數字被 OCR 讀錯 100），要嘛就是原件的算術錯了並一路傳下去。**無法從文字層判定是哪一種**——但無論哪一種，**這是一份用來訓練業務判斷「margin call 對不對」的教材，而它的示範算式對不起來。**

⚠️ **錯誤 B（比 A 嚴重）：公式 ② 說用 principal，實際代入的是 market value。**

回頭看公式 ① 的變數對應：
```
Market value    = -395,425
Coupon interest = -74
Financing int   =  11,077
Principal       =  401,911   ← 注意
```
**公式 ② 寫 `Margin/Hrct Amt = principal × h/c`，但代入的是 `-395,425`，那是 market value，不是 principal。**

**這不是小事。兩者差 6,486，用 3% haircut 算出來的差異是：**
```
用 market value：-395,425 × 0.03 = -11,863
用 principal：    401,911 × 0.03 =  12,057
差 194
```
**在這一筆上是 194 塊；但這是公式錯誤，會等比例放大。** 而更根本的問題是**概念上哪一個才對**：haircut 應該打在**抵押品市值**上（你收到的東西值多少）還是**本金**上（你借出去多少）？

**正確答案是市值**——haircut 的定義就是從市值扣減。**所以代入的數字是對的，寫的公式是錯的。** 文件錯了，實作對了。⚠️ **但一個照著手冊學的新人會把公式背錯。**

⚠️ **錯誤 C：正負號的敘述自相矛盾。** 最後一句寫：

> Although the **Total Mrgn Val is a negative 21,248** there is no call since it is below the minimum (trigger) amount

**但公式 ④ 是三個正數相加得到正的 21,248。** 說明文字說它是負的。這與「all the numbers are opposite」的註解勉強能兜起來，**但整段沒有一處明確定義「正的曝險」是誰欠誰**。

> [!example] 實例：把上面那張報表翻成人話
> 這一列在講的是：
> ```
> 雷曼借給某客戶（或某客戶借給雷曼）約 $401,911 的現金
> 對應收到的抵押品市值約 $395,425
> 這批券還有應收票息 $74，融資利息累積了 $11,077
> ```
> **裸曝險（還沒算 haircut）：**
> ```
> 我給出去的（本金 + 累積利息）：401,911 + 11,077 = 412,988
> 我拿回來的（市值 + 應收息）：    395,425 +     74 = 395,499
> 差額：                                          17,489
> ```
> **→ 我多給了 $17,489。這筆是「欠擔保」狀態。**
>
> **加上 haircut 要求：**
> ```
> 這個客戶這檔券的 haircut 是 3%
> 我還要求額外 395,425 × 3% = 11,863 的緩衝墊
> ```
> **等一下——方向是什麼？** 這裡就是報表最反直覺的地方：
> ```
> Margin Val = 17,389 + (-11,863) = 5,526
> ```
> **haircut 金額是「減項」。** 因為在這份報表的符號慣例下，haircut 代表的是「已經被要求並持有的緩衝」，所以從曝險裡扣掉。**最後的 5,526 才是「扣掉緩衝之後還裸露多少」。**
>
> **最後三筆交易加總：**
> ```
> 5,526 + 966 + 14,756 = 21,248 ← 這個客戶的 PME（Post Margin Exposure）
> ```
> **然後跟 trigger 比。** 原件說「雖然是 21,248，但低於 trigger，所以不發 call」。
>
> ⚠️ **這裡藏著一個實務上極重要的東西：trigger（起徵點）。**
>
> **Trigger 的存在意義：** 沒有 trigger 的話，任何一分錢的曝險都要打電話追繳——作業成本會壓垮所有人。所以設一個門檻，低於門檻就不管。
>
> **Trigger 的代價：** **門檻以下的曝險是實實在在的無擔保信用曝險，只是你決定不管它。**
> ```
> 單一客戶 trigger $250,000
> × 500 個客戶
> = $125,000,000 的無擔保曝險，全部合法、全部不會產生任何一通電話
> ```
> **而且 trigger 是逐客戶設的，沒有全行加總的上限。**
>
> ⚠️ **原件從頭到尾沒有提過 trigger 的設定原則、審核頻率、或全行加總。** 它只在最後一句話裡出現一次，當作一個既定事實。
>
> **CEX 對應：** 這就是**維持保證金率的緩衝區**與**小額不清算門檻**。很多平台對極小部位不執行清算（清算成本高於部位），這在正常時期是理性的，**在極端行情下這些「不值得清算」的部位會同時穿倉**，變成保險基金的缺口。**單筆不重要、加總很重要——這是同一個結構。**

### 4. CAMEO 的其他功能

| 功能 | 用途 |
|---|---|
| **Client Search** | 依帳號／帳戶名／法人對手方名稱查客戶。可篩選來源系統：**MTS = FI-Financing/Options/Forwards，ITS = FI-Financing，DEM = 衍生品** |
| **Client Drill Down** | 分頁籤看：Summary（帳戶層曝險）／Transactions & Positions（交易層明細與曝險）／Balances（未結餘額）／**Free Collateral**（可用來抵銷曝險的自由擔保品）／Margin Call（已發出的追繳） |
| **Counterparty Watchlist** | 建立個人的「熱區清單」，後續 Exposure Query、Transaction Browser、Trade Exposure Report 都能依 watchlist 跑 |
| **Transaction Browser** | 多條件查交易（法人、來源系統、trade ID、watchlist、證券 ID、帳戶、trading ledger） |
| **Reports & Shredders** | **Report = 給人看的排版；Shredder = 給 Excel 吃的原始資料** |
| **Paydown Report** | 房貸抵押品每月本金攤還如何影響曝險（factor、face amount、exposure 的變化） |

**Report vs Shredder 這個區分很值得記：**
> A **report** is displayed on a user friendly printable format; a **shredder** is **raw data that can be exported to excel** for further manipulation.

**這是 2005 年版的「UI vs API」。** 而業務用的永遠是 shredder——因為真正的分析都在 Excel 裡做。

⚠️ **原件本節的編號壞了：** 章節依序是 `I. Client Search` → `II. Client Drill Down` → **`IV. Counterparty Watchlists`** → **`IV. Transaction Browser`** → `V. Reports & Shredders`。**III 不見了，IV 出現兩次。** 這是 Word 自動編號未更新的典型症狀，也代表**這一節被編輯過但沒有重新校對**。

⚠️ **另一處編號問題在第 II 節：** 目錄寫 `IV. CHARACTERISTICS OF FINANCING` 底下是 `A.` 到 `G.` 七項，但正文的同樣七項編號是 `D.` 到 `J.`；`V. RISKS` 目錄寫 `A./B.`、正文寫 `K./L.`；`VI. APPENDIX` 目錄寫 `A./B./C.`、正文寫 `M./N./O.`。**目錄與正文的編號系統從頭到尾對不上。**

⚠️ **還有一組循環引用：** 第 II 節 p.11 講 margin 時寫「詳見 Section IV」，而 Section IV 的 Margin 條目寫「詳見 Risks in the Financing Market 一節（即 Section V）」。**A 指向 B，B 指向 A，兩邊都沒有實質內容。** 真正的 margin 說明在 Section V 的 Collateral Risk 底下，兩條指引都沒把讀者送到那裡。

---

## 本冊總結

1. **Repo 是同一筆交易的兩張臉**：經濟上是以證券擔保的借貸，法律上是「賣出 + 承諾買回」，價差即利息。**破產那天你手上有什麼，取決於用哪一張臉解讀。**
2. **同一筆交易，借現金方叫 Repo、出現金方叫 Reverse，永遠以 dealer 的角度命名。** 原件自己在 p.12 的算例裡把方向寫反過一次。
3. **六大用途**（融資庫存／matched book 賺利差／借券補空頭／處理 fail／客戶流動性／閒置券變現）**牽動六個部門**（Trading／Treasury／Balance Sheet／Collateral／Credit／Settlement）。
4. **生命週期十步，教科書只講前三步。** 71 頁的手冊裡，「Repo 是什麼」佔 21%，「成交之後怎麼辦」佔 62%。
5. **Haircut = 借款人自己出的錢 = 借款人的股本。** 它買的是三樣東西：價格緩衝、清算所需的時間、以及**清算時的流動性折價**。第三樣最常被漏掉。
6. **⚠️ Haircut 有兩種口徑（扣減式 vs 倍數式），原件混用且從未定義。** 同一個「20%」，兩種算法差 5% 的擔保品；「50%」差三分之一。這是全書最實質的缺陷。
7. **有抵押品 ≠ 沒有信用風險。** 完整清單有七項：價格波動／流動性與清算成本／對手方違約／**wrong-way risk**／settlement fail／文件與 close-out 可執行性／haircut 是否足夠。**原件只涵蓋了兩項半，缺的第 4 項是雷曼的死因。**
8. **Matched book 大多不 matched。** 原件自己承認交易員刻意錯配天期來賺利差——**資產鎖三個月、負債每天 roll，只要有一天沒人接就是死局。**
9. **全書沒有「雷曼自己借不到錢會怎樣」這個問題。** 風險一節完全從投資人的角度寫。這是 2005 年一線教材的集體盲點。
10. **前台系統（Infinity）是狀態機**：Shell → Allocated → Approved → Released，而 **Released 不可逆，這件事只出現在一段 NOTE 裡**。
11. **`Current Exposure` 不是當下曝險**（不含新交易、不含 reprice）。同一份手冊給了它三個名字，改名沒有改內文。
12. **業績表是誘因的真相**：賣未評等抵押品的長天期交易，業績分是賣公債的 **30 倍**；而「有能力融資冷門抵押品」被寫在 p.8 的競爭優勢裡。
13. **Margin call 有三個互相衝突的期限**（MTS 3PM／ITS 當日或次日／GMRA 另定），沒有優先順序；處置是 `could`，不是 `will`。
14. **判斷 margin call 好不好的人，是拿業績分的業務。**
15. **LBI（紐約／美國法／MRA）與 LBIE（倫敦／英國法／GMRA）的區分，在這份手冊裡的控制手段是「Excel 上標一個顏色」。** 三年後這條線變成了 Repo 105。

---

## 自測

1. 用一句話說明 Repo 的「經濟實質」與「法律形式」差在哪裡。這個差別在什麼時候會變得攸關生死？
2. 客戶說「我要做 repo」，你要先問他什麼才知道這是雷曼的 Repo 還是 Reverse？
3. 一張券市場上很搶手（special），借出這張券的人拿到的利率會比 GC 高還是低？為什麼？
4. Par $10mm、dirty price 102、haircut 5%、rate 1.05%、30 天。算出：抵押品市值、實際借出的現金、緩衝墊、30 天利息。
5. 信用分析師說 haircut 20%，客戶要借 $1mm。你該收多少市值的券？**列出兩種答案，並說明為什麼會有兩種。**
6. Delivery、Tri-Party、Safekeep 三種交割，在對手方破產那天各是什麼下場？原件是怎麼推銷 Safekeep 的？它沒說什麼？
7. 什麼是 wrong-way risk？舉一個 CEX 的例子。這份手冊為什麼沒有提到它？
8. 「Matched book」這個名字暗示什麼？原件承認的實情是什麼？這個錯配怎麼殺死一家公司？
9. Infinity 裡 Approve 與 Release 差在哪？哪一個是不可逆的？這件事在手冊裡的權重合理嗎？
10. `Current Exposure` 為什麼不是「當下曝險」？要用什麼樣的測試資料才能驗出這個問題？
11. 業績表上，同樣 $100mm 的交易，公債隔夜與未評等券 90 天，業務業績分差幾倍？這說明了什麼？
12. Margin call 的 trigger 是什麼？它在防什麼、又製造了什麼？
13. 這份手冊的第 IX 節（LBI vs LBIE 用顏色標記）與 Repo 105 有什麼關係？

**答案全在本文對應章節。**

---

## 這份手冊與 Repo 105 的關係

> **Repo 105 不是一個新產品。它就是這份手冊教的東西，把一個數字調高、把法律轄區換到倫敦。**

### 一、正常的 repo 在會計上是什麼

回到本冊開頭那個「兩張臉」的問題。在會計準則（美國 SFAS 140）底下，一筆 repo 要記成什麼，取決於一個判準：**賣方有沒有保留對這批證券的「有效控制」（effective control）？**

```
有保留控制  →  這是「有擔保融資」（secured financing）
             →  證券留在資產負債表上
             →  收到的現金記成「負債」
             →  資產與負債同時膨脹 → 槓桿比率上升

沒有保留控制 →  這是「賣斷」（sale）
             →  證券從資產負債表上「離開」
             →  收到的現金是賣價，不是借款
             →  資產負債表縮小 → 槓桿比率下降
```

**一般的 repo 都是前者**——因為賣方承諾買回、而且以「幾乎足夠的現金」擔保了買回義務，所以視為仍握有控制。準則給的量化門檻是：**擔保品價值在賣價的約 98%–102% 之間**，就視為保留控制、記成融資。

### 二、Repo 105 做了什麼

**把 haircut 拉高到 105%（固定收益）或 108%（股票），就掉出了那個 98%–102% 的區間。**

```
一般 repo：  押 $102 的券，借 $100  →  102% →  在區間內 → 記成融資（資產留著）
Repo 105：   押 $105 的券，借 $100  →  105% →  超出區間 → 記成賣斷（資產離開）
```

**經濟實質的差別：** 幾乎沒有。你多押了 3 塊錢的券，付一樣的利息，幾天後買回來。
**會計結果的差別：** 資產離開資產負債表，收到的現金拿去**償還其他負債**，資產與負債同時縮小，**報出來的槓桿倍數下降**。

⚠️ **這裡有一個極度反直覺的地方，而且它直接連到本冊第 VIII 節：**

**在整份手冊裡，haircut 越高 = 對出現金那一方保護越厚 = 越保守。** 第 VIII 節的 grid 就是這個邏輯：政府債 0.15%、違約債 50%。
**但在 Repo 105 裡，把 haircut 從 102% 拉到 105%，效果是讓交易變得不透明。**

**同一個變數，在風控語言裡代表「更安全」，在會計語言裡代表「不用揭露」。** 雷曼利用的正是這兩套語言的落差——**它做的每一筆 Repo 105，從風控報表上看都比一般 repo 更保守。**

### 三、為什麼要繞到倫敦——這就是第 IX 節

**要把 repo 記成賣斷，需要一份律師的「真實出售意見書」（true sale opinion）：確認在賣方破產時，買方真的能拿走那批證券。**

**雷曼找不到任何一家美國律師事務所願意就美國法出具這份意見書。**

**於是它把交易搬到了 LBIE（Lehman Brothers International (Europe)）**，用英國法、依 **GMRA** 架構，取得了英國律師事務所的意見書。美國的資產，透過集團內部轉到倫敦子公司，在那裡做成 Repo 105。

**回頭看本冊第 IX 節：**

> Please make note if the ticket is for an **LBI** or an **LBIE** account by **highlighting** all trades for LBI accounts…

**2005 年，這是一條 Excel 排版規則。**
**2008 年，這條 LBI／LBIE 的分界線，是幾百億美元資產在會計上「存在」與「不存在」的分界線。**

**而第 I 節那份電話簿裡，`DOCUMENTATION - MRA & GMRA` 那一組，負責的正是這兩套法律文件。** 這份手冊把 Repo 105 需要的所有零件都列出來了——**只是在 2005 年，它們還只是分工。**

### 四、季末的搬運

**Repo 105 的用法是時點性的：**

```
季末前幾天：
  把數百億美元的資產做成 Repo 105 交易 → 記成「賣出」
  → 資產離開資產負債表
  → 拿到的現金去償還短期負債
  → 資產與負債同時縮小

季末當天：發布財報，槓桿倍數看起來下降

季末後幾天：
  把資產「買回來」→ 一切恢復原狀
  → 但這個時點不需要對外揭露
```

**規模（Examiner 報告的認定，約數）：**

| 時點 | 季末暫時移出資產負債表的金額 |
|---|---|
| 2007 Q4 | 約 **$386 億** |
| 2008 Q1 | 約 **$491 億** |
| 2008 Q2 | 約 **$504 億** |

**而雷曼從未在財報中揭露 Repo 105 的存在、規模、或它對報出的槓桿比率的影響。**

> [!example] 實例：季末那三天發生了什麼
> 假設 2008 年 5 月 31 日（Q2 結束）：
>
> **5 月 28 日（季末前三天）**
> ```
> ⚠️ **以下為示意結構，非雷曼實際申報數字**（實際數字見本段末的 Examiner 認定表）。
> 淨槓桿的分子是**淨資產**（總資產扣除有擔保融資類項目），不是總資產——所以不能用總資產÷權益去除。
> ```
> 交易台把約 $500 億的優質固定收益資產（多為政府債與機構債），
> 透過 LBIE 依 GMRA 做成 haircut 105% 的 repo：
> ```
> 押出去：$525 億市值的券
> 借進來：$500 億現金
> 會計處理：記為「賣出 $500 億資產」，而非「借入 $500 億」
> ```
> 拿到的 $500 億現金**立刻拿去償還其他短期負債**。
>
> **5 月 31 日（季末當天，財報基準日）**
> ```
> 移出後，淨資產下降 → 申報的淨槓桿倍數下降。
> ```
> **申報的槓桿倍數下降，分析師與評等機構看到的是下降後的數字。**
>
> **Examiner 認定的實際效果（依 Duff & Phelps 分析）：**
>
> | 季末 | Repo 105 用量 | 申報淨槓桿 | 若無 Repo 105 | 差額 |
> |---|---|---|---|---|
> | 2007 Q4（11/30） | $386.3 億 | 16.1× | 17.8× | **1.7** |
> | 2008 Q1（2/29） | $491.0 億 | 15.4× | 17.3× | **1.9** |
> | 2008 Q2（5/31） | $503.8 億 | 12.1× | 13.9× | **1.8** |
>
> ⚠️ **注意：15.4 與 12.1 是兩個不同季度各自的申報值，不是同一季做 Repo 105 前後的對照。** 單季的實際效果約 **1.7–1.9 個轉數**。
>
> **6 月 3 日（季末後兩天）**
> ```
> 把 $525 億市值的券買回來，資產負債表回到原狀
> 這個動作發生在兩個財報日之間，不需要對外揭露
> ```
>
> **這中間雷曼付出了什麼？** 幾天的 repo 利息，加上多押 3% 的券所佔用的資源。**買到了什麼？** 一個低了約 1.8 個轉數的申報槓桿。
>
> **這個幅度為什麼重要：** 簽證會計師底稿對「重大性」的定義是「移動淨槓桿 0.1 或以上」。Examiner 的原話是 Repo 105 移動的不是十分位，而是整數位。
>
> ⚠️ **注意這件事的每一個零件，本冊都教過：**
> - **haircut 的訂定** → 第 VIII 節
> - **LBI vs LBIE 的法人分野** → 第 IX 節
> - **MRA vs GMRA 的文件差異** → 第 I、II 節
> - **rollover 與 close-out 的系統操作** → 第 VI 節
> - **「repo 法律上是賣出」的定義** → 第 II 節 p.9，以及定義段裡那個從未在正文用過的詞：**Sale/Buy-Back**
>
> **沒有任何一個零件是新發明的。Repo 105 是把一份 2005 年的操作手冊，換一個意圖執行一次。**

### 五、⚠️ 這件事到底是不是「違法」

**這是必須講清楚的一點，不要簡化成「雷曼作假帳」。**

- Examiner 的報告**沒有**認定 Repo 105 的會計處理本身違反 SFAS 140 的字面規定。⚠️ **但「沒有認定違反」不等於「認定符合」**——Examiner 在報告中明確表示**本報告不觸及（does not reach）此一問題**。詳見 [[Quant-Trading/Examiner報告-Vol3-Repo105對讀|Examiner Vol 3 對讀]] 的結論節。
- Examiner 認定的是：**雷曼有「可主張的訴因（colorable claims）」**，因為它**未揭露**這項操作、其規模、以及它對報出槓桿比率的影響——這使得財報**具實質誤導性（materially misleading）**。
- **爭點不在「這筆交易能不能記成賣出」，在「你把 500 億美元搬進搬出，卻一個字都不告訴投資人」。**

**這就是為什麼這個案子對做 QA 的人特別有意義：** **它是一個「每一步都通過檢查、整體卻是錯的」的完美案例。** 每一筆 Repo 105 交易，單獨看都合規：文件齊全、法律意見書有、haircut 充足（甚至超額）、系統紀錄完整、風控報表上看起來比一般 repo 更保守。

**問題不在任何一筆交易，在於「季末做、季初解、從不揭露」這個模式。而模式是看不見的，除非你去問「為什麼這個數字每到季末就變好」。**

### 六、接下來讀什麼

**Valukas Examiner Report（雷曼破產審查人報告），Volume 3——Repo 105 專章，約 336 頁。**

**帶著本冊的知識去讀，你會在報告裡認出這些東西：**

| 你在 Examiner 報告裡會看到 | 你在本冊哪一節學過 |
|---|---|
| 為什麼 105% 這個數字有意義 | 第 VIII 節：haircut 的訂定邏輯 |
| 為什麼非得透過 LBIE 做 | 第 IX 節：LBI vs LBIE、MRA vs GMRA |
| 「true sale opinion」在爭什麼 | 導讀：經濟實質 vs 法律形式 |
| 交易在系統裡怎麼開、怎麼結 | 第 VI 節：Infinity 的 Approve/Release/Rollover/Closeout |
| 為什麼資產負債表對前台是「免費的」 | 第 V 節：業績表沒有任何一欄跟資產負債表佔用有關 |
| 為什麼沒有人看到全貌 | 第 I、IV 節：九個團隊、四個 ledger，沒有人從頭看到尾 |

**先讀本冊、再讀 Examiner Vol 3，你讀的是同一套機器的使用說明書與事故調查報告。**

---

## 反向連結

- [[Quant-Trading/投行金流與反洗錢-自學教材|投行金流與反洗錢 — 自學教材]] — 本冊是該教材 **M5（Repo：真正的產品不是利率）** 的完整原文精修版
- [[Quant-Trading/lehman-brothers-trading-manuals|雷曼兄弟內部交易培訓手冊]] — 材料清冊與來源查核（Bates 編號、PDF 取得路徑）
- [[Quant-Trading/雷曼FX手冊-中文精修-03-換匯交易|雷曼 FX 手冊 ③ 換匯交易]] — FX Swap 與 Repo 是同一個概念在兩個市場的表現：**都是「用時間換資金」，都靠兩腿價差表達利息**。讀完本冊回頭看 swap points，會發現它就是 repo rate 的匯率版
- [[Quant-Trading/雷曼FX手冊-中文精修-02-遠期外匯|雷曼 FX 手冊 ② 遠期外匯]] — 「pay or earn the points」的判準；本冊的「價差即利息」與該冊的 forward points 是同一個數學
- [[倫敦黑貓/市場結構與金融產品|倫敦黑貓：市場結構與金融產品]] — 同類主題的二手觀察與市場結構背景
