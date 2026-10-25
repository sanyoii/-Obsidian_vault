---
title: Low-Tech Testing Dashboard 概念與參考文獻整理及 QA Decision Desk 減法改造方案
tags:
  - qa
  - dashboard
  - low-tech-testing-dashboard
  - james-bach
  - rst
  - portfolio
created: 2026-10-18
updated: 2026-10-18
source: "James Bach (1997), iT 邦幫忙 10402357, The Liberators Medium, QA Sphere Blog, msr5464/QA-Dashboard"
related:
  - "[[QA/Low-Tech Testing Dashboard 實做計畫]]"
  - "[[QA/QA Decision Desk (test-status) 底層架構檢討與三版 UI 改造方案]]"
  - "[[QA/軟體測試中的覆蓋率與風險導向決策]]"
---

# Low-Tech Testing Dashboard 概念與參考文獻整理及 QA Decision Desk 減法改造方案

> **核心精神（James Bach, 1997）**：「**不計算虛榮數字，而是基於證據做出主觀評估**（Don't count vanity numbers; make subjective, evidence-based assessments）。」用最簡單、一眼可讀的方式（如白板、便利貼或五欄表），在 **10～30 秒內**讓團隊與管理者看懂：**我們測了哪裡、投入多少力氣、覆蓋多深、現在品質好不好、為什麼這樣判斷**。

---

## 一、James Bach (1997) Low-Tech Testing Dashboard 核心哲學與經典五欄結構

由 Rapid Software Testing (RST) 創始人 **James Bach** 於 1997 年提出。當時許多團隊迷信「測試案例總數、執行率 98%、自動化覆蓋率 85%」這類看似精確卻無法反映真實風險的數字（Vanity Metrics / 虛榮指標）。Bach 主張測試儀表板不是為了「算數學」，而是為了**建立可快速對焦的視覺化溝通介面**：

### 1. 三大核心原則
1. **主觀專業評估優於機械計數（Assessment over Measurement）**：
   - 「跑過 40 個測試全綠」不等於「這個模組沒問題」。如果這 40 個測試只測了 Happy Path，覆蓋深度其實只有 `Level 1`；真正重要的是測試人員綜合測試結果、風險與邊界後的**主觀專業判斷（Quality Assessment）**，並附上可查驗的證據。
2. **一屏看懂、拒絕資訊過載（Single-Glance Clarity / "DO NOT ERASE" Whiteboard）**：
   - 就像貼在團隊牆上的大白板，主管或 PM 路過時 **10～30 秒內**就能抓到三個答案：
     1. 哪些核心區域已經能放心發布？
     2. 哪些區域其實還沒測深（或刻意排除）？
     3. 哪裡有高風險或阻擋問題（Blocker）？
3. **色彩與尺度的嚴格紀律（Strict Color & Scale Discipline）**：
   - 綠色、黃色、紅色只留給「品質結論與風險狀態」，不拿去裝飾無關的標籤；同時正在看「通過（GO）」視角時，不應在畫面中央常駐大塊紅色假警報混淆視聽。

### 2. 經典五欄結構（Classic 5-Column Board）

| 欄位 | 定義 | 標示尺度範例 |
| :--- | :--- | :--- |
| **1. Product Area（產品功能區域）** | 按「使用者功能 / 業務風險區域」切分（如 `Order Book 序號狀態`、`REST 行情契約`），而非單純按技術目錄或腳本檔名切分。 | 6～12 個可一眼掃完的關鍵區域 |
| **2. Test Effort（測試投入）** | 團隊在該區域預計/已投入多少測試心力與進度。 | `None` / `Low` / `Medium` / `High` ＋ `Start` / `In Progress` / `Complete` |
| **3. Coverage Level（覆蓋深度階梯）** | 我們對該區域理解與測試到多深？（**不用誤導性的百分比**） | **`0`** 未測（我們完全不了解）<br>**`1`** Sanity / Happy Path（基本能動）<br>**`1+`** 超越基礎巡檢但未達完整風險覆蓋<br>**`2`** Common & Critical Risks（核心正反路徑與常見邊界已測）<br>**`2+` / `3`** 深度壓力、極端邊界與混沌測試 |
| **4. Quality Assessment（品質主觀評價）** | 基於目前已掌握的證據，我們認為這個區域的品質如何？ | 🟢 **Good**（穩定可接受）<br>🟡 **Warning / Questionable**（有已知限制、環境依賴或小問題）<br>🔴 **Bad**（存在嚴重風險或 P0/P1 阻擋缺陷） |
| **5. Comments（人話判斷與證據連結）** | **整張表的靈魂**：用一句人話解釋「為什麼給這個燈號、有什麼潛在風險或排除範圍」，並附上可點開的證據連結。 | 例：「遞增、亂序拒絕與斷線重連快照皆通過 `[12 cases ↗]`」 |

---

## 二、四份參考文獻與開源範例重點整理

### 1. iT 邦幫忙鐵人賽：〈Day 11 Low-Tech Testing Dashboard：不用 Jira，也能讓主管看懂品質風險〉
- **連結**：<https://ithelp.ithome.com.tw/m/articles/10402357>
- **核心重點**：
  - 指出多數團隊把 Jira 票數、Pass/Fail 圓餅圖當成測試報告，結果主管看了滿滿的數字，卻還是得問一句：「**所以現在到底能不能上線？風險在哪？**」
  - 強調 Low-Tech Testing Dashboard 的精髓是把「測試案例數字」退到幕後，把「**功能分區（Area）× 測試投入（Effort）× 覆蓋深度（Coverage 0~3）× 品質感受（Quality）× 備註（Comments）**」推到最前面。
  - 提醒 **「低維護成本（Low Friction）」**：如果更新一次看板要改十幾個欄位、對齊各種複雜編號，最後一定沒人想看也沒人想維護。

### 2. The Liberators (Medium)：〈Experiment: Create A Low-Tech Metrics Dashboard To Track Outcomes〉
- **連結**：<https://medium.com/the-liberators/experiment-create-a-low-tech-metrics-dashboard-to-track-outcomes-82e4b850f0c7>
- **核心重點**：
  - **追蹤成果（Outcomes），而非產出數量（Outputs）**：跑了幾百個測試是 Output；「核心交易邏輯是否無阻擋風險、能否安全交付」才是 Outcome。
  - **刻意限制版面空間（Physical / Visual Constraint）**：數位工具太容易無限制往下加表格、加卡片，結果變成沒人看的「資訊墳場」。用實體便利貼或固定三欄版面，會強迫團隊**只留下真正影響決策的 3～5 個指標**。
  - **促進對話而非取代對話（Spark Conversation）**：好的低科技看板在 10 秒內指出異常區塊（例如某區 Effort=High 但 Quality=Warning），讓團隊立刻聚焦討論該區塊。

### 3. QA Sphere Blog：〈QA KPIs: How to Build a QA Dashboard That Drives Results〉
- **連結**：<https://qasphere.com/blog/qa-kpis-dashboard/>
- **核心重點**：
  - **拒絕虛榮指標（No Vanity Metrics）**：單純列出「累積測試數 67 個」或「100% Pass」沒有決策價值，必須結合**嚴重度（Severity P0/P1）**與**風險覆蓋度（Risk Coverage）**。
  - **受眾分層（Audience Layering — 金字塔原則）**：
    - **頂層（Executive / PM 視角）**：只需 3 顆核心結果信號（發布結論、關鍵風險覆蓋率、未解 P0/P1 阻擋數）。
    - **中層（Team Lead / 產品視角）**：按產品功能區域（Product Area）展開覆蓋與品質狀態。
    - **底層（Engineer / QA 視角）**：具體失敗案例 Log、JUnit 雜湊、重跑耗時與環境設定，應放在**點擊展開或獨立子頁**，不應跟頂層結論擠在同一個首頁畫面上。
  - **一張圖表只回答一個問題（One Question per Visual）**：不要把「測試流程教學」、「跨專案比較」、「單一錯誤回放」、「頁面導覽」全部塞進同一張大表。

### 4. GitHub 開源範例：`msr5464/QA-Dashboard` (QUALITY DASHBOARD)
- **連結**：<https://github.com/msr5464/QA-Dashboard>
- **核心設計亮點**：
  - **左側清晰分流（Vertical Navigation）**：把不同維度的報表分開（總覽、功能測試、自動化、效能），首頁不堆砌所有明細。
  - **上半部 3 顆半圓儀表轉盤（Gauge Overview）＋下半部橫向覆蓋長條（Horizontal Stacked Bars）**：視覺優先於文字海，讀者在 3 秒內先看懂整體健康度，再用橫條比較各功能模組的穩定度與未覆蓋比例。

---

## 三、目前 `QA Decision Desk` (`test-status/`) 現況與 Low-Tech 原則的 6 大差距

你在個人主作品集 [`sanyoii.github.io/index.html`](file:///d:/Codex/sanyoii.github.io/index.html#L821-L830) 的 About / Project 卡片與 [`RiskQADemoSite/app/layout.tsx`](file:///d:/Codex/RiskQADemoSite/app/layout.tsx#L19) 中，都明確將本專案定位為 **「Low-tech, evidence-first testing dashboard（低維護、以證據為主的測試 Dashboard）」**，且早期的 [`Low-Tech Testing Dashboard 實做計畫.md`](file:///D:/Claude/obsidian/wiki/QA/Low-Tech%20Testing%20Dashboard%20%E5%AF%A6%E5%81%9A%E8%A8%88%E7%95%AB.md) 與 [`data/decision-index.json`](file:///d:/Codex/RiskQADemoSite/data/decision-index.json) 其實都有規劃 `productAreas`（含 `effortLevel`、`coverage: "2"`、`quality: "good"`、`comment`）。

但在後續幾輪擴充「四步追溯鏈」與「跨專案治理矩陣」的過程中，目前線上的 **B+C Hybrid 首頁（[`app/_dashboard.tsx`](file:///d:/Codex/RiskQADemoSite/app/_dashboard.tsx)）** 出現了以下 **6 個偏離 Low-Tech 本意的問題**：

| # | 現況問題（為什麼讓人抓不到重點） | 違背的 Low-Tech 原則 | 具體改進作法 |
| :- | :--- | :--- | :--- |
| **1** | **首頁同一組資訊重複出現 3 次（Triple Duplication）**<br>目前首頁同時塞了：① 頂部 3 張視角卡 + 4 張 KPI 卡、② `PART 1` 四階段追溯看板、③ `PART 2` 九欄三列跨專案大矩陣、④ `PART 3` 三張巨型子頁入口卡。結果 `45/45`、`22/22`、`67 Checks` 與 `/run-records` 連結在同一個畫面重複出現三次。 | **Single-Glance Clarity（一屏一重點）** | **二選一或三合一減法**：將頂部 7 張小卡 + Part 1 + Part 2 收斂為**單一核心看板**（每個數字與連結全頁只出現一次），Part 3 巨型入口卡縮減為單行導覽列或膠囊按鈕。 |
| **2** | **真正的 Low-Tech 五欄表被藏進隱藏 DOM，畫面反而主打 `40/40 PASS` 原始計數**<br>[`decision-index.json`](file:///d:/Codex/RiskQADemoSite/data/decision-index.json) 裡原本有 James Bach 的 `productAreas`（`Effort / Coverage Level 2 / Quality / Comment`），但在 [`_dashboard.tsx`](file:///d:/Codex/RiskQADemoSite/app/_dashboard.tsx#L533-L561) 中被塞進 `aria-hidden="true"` 的 `.ct-legacy-ssr-contract`，視覺主畫面反而大字顯示 `40/40 PASS`、`12/12 PASS`。 | **Assessments over Measurements（主觀評估優於算數字）** | 把 **James Bach 五欄評估表（Product Area / Effort / Coverage 0→3 / Quality / Human Comment）** 拉回首頁正中央；將 `12 cases ↗` 當作第 5 欄尾端的輕量證據連結，不再拿原始通過數當主角。 |
| **3** | **內部治理代號（`00–02`、`G1/G3/G6`、`SHA-256`）喧賓奪主**<br>第一次進來的面試官或主管還沒看到「Order Book 與行情契約健不健康」，就先被 `00–02`、`03–04`、`G1`、`G3`、`G6`、`DEF-MDQ-004` 等內部縮寫轟炸。 | **Human-Readable First（人話優先、不靠黑話溝通）** | 首頁第一層全部改用**直白人話**（例：「核心正反路徑已覆蓋 Level 2」、「重跑通過仍須負責人人工覆核」）；`G1–G6` 與 `00–08` 模板編號退居次要徽章或「工程證據模式」下鑽查看。 |
| **4** | **在 `GO` 綠燈畫面上常駐大塊紅色的「反事實攔截（Counterfactual Hold）」**<br>目前在預設看通過狀態時，Part 1 第 3 欄與 Part 2 第 3 列都亮著刺眼的紅框 `🛑 Counterfactual Hold`，讓人誤以為現在系統有 P0 故障。 | **Strict Color Discipline（色彩紀律：紅色只代表當前真實阻擋）** | 預設畫面只呈現**當前真實狀態**；把「當 P0 失敗時看板如何轉紅攔截（Hold Replay）」做成頂部獨立切換開關或單一預覽按鈕，點了才把整塊白板切換成紅燈攔截視角。 |
| **5** | **缺少受眾分層（Executive 30 秒總覽 vs. Engineer 證據深潛混在一起）**<br>主管想看「能不能發、哪裡沒測」，工程師想看「JUnit SHA-256、Pytest 失敗 Log、四步追溯鏈」，現在全部攤在同一層。 | **Progressive Disclosure（漸進式揭露 / 受眾分層）** | 採用 **雙模式切換（Dual-Mode Toggle）** 或 **三層金字塔**：第一層固定給 30 秒決策白板；點擊任一列或切換至「工程證據模式」才展開 JUnit 收據與四步追溯細節。 |
| **6** | **功能區域（Product Area）切得太粗且偏技術命名**<br>`decision-index.json` 把 CEX 只切成 `deterministic (40)` 與 `live (5)` 兩大包，看不出業務功能風險；也沒有把「刻意不測的範圍（Excluded Scope）」獨立列為一列 `Coverage = 0`。 | **Functional Area & Honest Uncovered Scope（功能分區與誠實揭露未測區）** | 將受測區域拆成 **5～6 個直觀功能區**（① Order Book 序號與狀態、② REST & WS 行情契約、③ Binance 即時行情串流、④ 作品集雙語與 Chromium RWD、⑤ 文件與證據防篡改、⑥ **明確排除範圍：私密下單與高併發壓測 `Coverage 0`**），一眼展現風險邊界思維。 |

---

## 四、5 個視覺改進方案圖示（供選擇）

為了徹底解決「資訊過多、抓不到重點」的問題，以下根據你提供的文獻與範例，設計了 **5 種不同切入點的減法改進方案**（皆使用你現有的真實專案數據）：

### 方案 1：經典 James Bach 五欄白板版（Classic 1997 Low-Tech 5-Column Board）
- **靈感來源**：James Bach (1997) 原始白板 ＋ iT 邦幫忙 Day 11 文章
- **核心改動**：
  - 採用清爽淺色「實體白板（`DO NOT ERASE`）」視覺，**砍掉 65% 重複卡片**。
  - 上方只留 2 張受測專案總評卡（一句話結論 + `READY (Scoped)` 印章）。
  - 正中央直接放 **經典五欄表（`Product Area | Test Effort | Coverage 0→3 階梯 | Quality 燈號 | QA 人話判斷與證據連結`）**，並把「私密金鑰下單 & 高併發壓測」誠實列為最後一列 `Coverage = 0（未測）`。

![[QA/attachments/low-tech-opt1-classic-bach-board.png]]

---

### 方案 2：The Liberators 極簡三問便利貼牆（Minimalist 3-Question Sticky-Note Wall）
- **靈感來源**：The Liberators Medium 文章（用實體便利貼空間限制強迫聚焦 Outcome）
- **核心改動**：
  - 捨棄複雜的九欄大表，全畫面只用三欄便利貼回答主管最關心的 **3 個問題**：
    1. **現在能不能發布？（Outcome Verdict）**
    2. **各功能區的測試力道與品質如何？（Effort & Coverage Map）**
    3. **遇到嚴重 Bug 時如何攔截？（Risk & Gate Proof）**
  - 每張便利貼只放「人話結論 + 覆蓋等級（L0～L2）+ 單一證據連結」，視覺負擔極低、非常適合作品集快速瀏覽。

![[QA/attachments/low-tech-opt2-liberators-sticky-wall.png]]

---

### 方案 3：QA Sphere 三層金字塔減法版（3-Layer Pyramid: Headline → Area Table → Slim Drill-Down）
- **靈感來源**：QA Sphere Blog（頂層 3 信號 → 中層功能表 → 底層按需下鑽）
- **核心改動**：
  - 保留你現有的深色科技質感，但把原本塞滿畫面的 4 個大區塊**垂直收斂為乾淨的三層金字塔**：
    - **Layer 01（3 秒高階結論）**：只留 3 張大字卡（`SCOPED GO`、`Level 2 / 2 Met`、`0 Open Blockers`），取代原本擁擠的 7 張頂部小卡。
    - **Layer 02（James Bach 五欄評估表）**：用直觀的 4 格進度條呈現 `Coverage Level 0~3`，一表取代原本重複的 Part 1 + Part 2。
    - **Layer 03（單行輕量下鑽列）**：把原本佔掉三分之一畫面的 Part 3 三張巨型卡片，壓縮成底部單行 3 顆按鈕。

![[QA/attachments/low-tech-opt3-qasphere-layered-pyramid.png]]

---

### 方案 4：`msr5464/QA-Dashboard` 儀表轉盤 ＋ 視覺化覆蓋長條版（Gauge Overview + Visual Coverage Bars）
- **靈感來源**：你提供的 GitHub 範例 `msr5464/QA-Dashboard`
- **核心改動**：
  - **左側獨立導覽列**：把「總覽與覆蓋評估」、「測試案例明細 (34)」、「P0 失敗攔截回放」、「規則與設計演進」清楚分流。
  - **上半部 3 顆半圓儀表轉盤（Gauges）**：一眼看懂 `2/2 GO`、`Level 2 達成率` 與 `6 Runs 證據完整性`。
  - **下半部橫向視覺化覆蓋長條（Coverage Bars）**：每個功能區直接用 `L1 Sanity ✓` → `L2 Core Risks ✓` → `L3 Stress (未測)` 的分段色條呈現，不用讀長文就能看出「哪裡測到 L2、哪裡停在 L1+、哪裡未測」。

![[QA/attachments/low-tech-opt4-msr5464-gauge-bars.png]]

---

### ⭐ 方案 5（推薦）：雙視角切換版 — 30 秒 Low-Tech 主管白板 ⇄ 一鍵工程證據鏈（Executive Board + Evidence Toggle）
- **靈感來源**：結合 **James Bach 五欄白板** ＋ **QA Sphere 受眾分層** ＋ 你原本最具特色的 **四步證據鏈與反事實攔截**
- **為什麼推薦這個方案**：
  - **預設畫面（`👁️ 1. Low-Tech 白板模式`）**：非常乾淨！左欄是兩個專案的人話卡片與「一鍵預覽 HOLD 攔截狀態」開關；右欄是標準的 **James Bach 五欄評估表**。主管或 HR 點進來 **15 秒內就能抓到重點**，完全不會被 `G1–G6` 或 `SHA-256` 干擾。
  - **一鍵切換（`🔬 2. 工程證據與四步追溯模式`）**：當資深 QA 主管或工程師想驗證「你的證據是不是真的？有沒有四步追溯？」時，點一下頂部切換鈕（或底部收納膠囊），才會展開你原本精心設計的 **四步追溯鏈（00–08 模板、G1–G6 規則、JUnit SHA-256 收據）**。
  - **既完全符合 About 寫的 Low-Tech Testing Dashboard 初衷，又不會丟掉你辛苦建立的防偽證據鏈深度！**

![[QA/attachments/low-tech-opt5-dual-mode-executive-board.png]]

---

## 五、五個方案快速對照表與 Pros & Cons 深度比較

| 方案 | 視覺風格 | 主畫面核心結構 | 資訊減量幅度 | 最強優勢 |
| :--- | :--- | :--- | :---: | :--- |
| **方案 1：經典 James Bach 五欄白板** | 淺色實體白板風 | 2 張專案總評 ＋ 經典五欄表 (`Area/Effort/Coverage/Quality/Comment`) | **-65%** | 最忠於 1997 James Bach 原著與 iT 邦幫忙文章精神，閱讀最輕鬆 |
| **方案 2：The Liberators 三問便利貼牆** | 淺色便利貼看板 | 三欄看板（① 能不能發 ② 各區投入與覆蓋 ③ 如何攔截失敗） | **-70%** | 空間限制強迫精簡，最像敏捷團隊牆上的實體決策牆 |
| **方案 3：QA Sphere 三層金字塔減法版** | 深色專業儀表風 | 頂層 3 大指標 → 中層五欄表 → 底層單行下鑽列 | **-55%** | 改動成本最低、保留現有深色主題，直接消除 Part 1/2/3 重複 |
| **方案 4：`msr5464` 轉盤＋橫條版** | 深色側欄＋圖表風 | 左側導覽 ＋ 上方 3 半圓轉盤 ＋ 下方 L1→L3 分段覆蓋長條 | **-60%** | 視覺化程度最高，不用讀字就能比較 L1/L2/L3 覆蓋邊界 |
| **⭐ 方案 5：雙視角切換版（白板 ⇄ 證據鏈）** | 深色雙模式（支援淺色切換） | 左側專案卡＋Hold 預覽開關 ∥ 右側五欄表 ＋ 頂部「白板 ⇄ 工程證據」切換 | **首屏 -60%**<br>（證據完整保留於第 2 視角） | **兼顧 15 秒抓重點與底層證據深度**，最契合作品集雙受眾（HR/主管 vs. 資深 QA） |

---

### 各方案優缺點（Pros & Cons）詳細拆解

#### 1. 方案 1：經典 James Bach 五欄白板版（Classic 1997 Low-Tech 5-Column Board）
- **優點（Pros）**：
  1. **最正統、最名實相符**：你在個人主站 About 寫了「Low-Tech Testing Dashboard」，懂 RST（Rapid Software Testing）或讀過 iT 邦幫忙文章的面試官一點進來，看到 `Product Area | Effort | Coverage (0→3) | Quality | Comments` 五欄表與 `DO NOT ERASE` 白板標頭，會立刻知道你真的懂 James Bach 的核心理論，而不是只借用名詞。
  2. **10 秒掃讀性最佳**：沒有多餘圖表或縮寫干擾，`0 | 1 | 1+ | 2 | 2+ | 3` 的階梯格與最後一列「明確排除範圍（`Coverage = 0`）」一眼展現誠實的風險邊界。
  3. **閱讀壓力最小**：暖白底色與清晰格線最接近真實會議室白板，對非工程背景的 HR 或 PM 最友善。
- **缺點（Cons）**：
  1. **與主作品集深色風格有反差**：你的主站 `sanyoii.github.io` 預設為深色科技風，若 `test-status/` 預設只給淺色白板，跳轉時會有明顯的明暗切換感（需搭配深淺色主題切換來化解）。
  2. **工程治理深度較隱晦**：你原本花很多心力設計的 `G1–G6` 裁決規則與 `00–08` 四步追溯鏈被完全退到子頁，若面試官只看首頁沒點子頁，可能沒注意到你底層有做 SHA-256 防偽與 Fail-Closed 機制。

#### 2. 方案 2：The Liberators 極簡三問便利貼牆（Minimalist 3-Question Sticky-Note Wall）
- **優點（Pros）**：
  1. **故事線最直覺**：直接把畫面切成面試官心裡的 3 個問題（「1. 現在能不能發布？」、「2. 各區測試力道與品質如何？」、「3. 遇到嚴重 Bug 時如何攔截？」），完全不用思考怎麼看表。
  2. **字數最少、行動裝置（RWD）最友善**：三欄卡片在手機或平板上自然垂直堆疊，完全不會有寬表格在手機上需要左右橫滑的問題。
  3. **把「失敗攔截證明（Hold Demo）」自然融入第 3 欄**：既有獨立區域說明 `DEF-MDQ-004` 如何攔截，又不會像舊版那樣污染第 1 欄的正常通過狀態。
- **缺點（Cons）**：
  1. **橫向比較能力較弱**：當功能區（Product Areas）放在第 2 欄的雙排小卡片時，不如傳統橫列五欄表那樣能由上往下快速對齊比較各區的 `Effort` 與 `Coverage`。
  2. **當功能區增加到 8～10 個時會變擠**：便利貼牆適合 4～6 個區域，未來若新增第 3 個受測專案，卡片高度容易拉長。

#### 3. 方案 3：QA Sphere 三層金字塔減法版（3-Layer Pyramid）
- **優點（Pros）**：
  1. **工程改動最小、最穩健**：完全沿用你現有的深色主題與上下垂直排版，只需把原本重複的 Part 1 + Part 2 合併為中間的五欄表、把 Part 3 三張大卡壓縮為底部單行按鈕列即可上線。
  2. **視覺階層最工整（Top → Middle → Bottom）**：嚴格遵循 QA Sphere 的金字塔原則——上方 3 秒看高階結論（3 張大字卡）、中間 15 秒看功能區五欄表、下方按需點開底層證據。
- **缺點（Cons）**：
  1. **較像「精簡後的現代 SaaS 儀表板」，少了一點「Low-Tech 白板」的獨特個性**：雖然解決了資訊過載，但視覺上仍比較接近一般深色監控後台。
  2. **頂部 3 張大字卡與中層表格仍有約 15% 的概念重疊**：例如頂部寫 `SCOPED GO` 與 `Level 2 / 2 Met`，中層表格又看得到各列 `Level 2`。

#### 4. 方案 4：`msr5464/QA-Dashboard` 儀表轉盤 ＋ 視覺化覆蓋長條版（Gauge + Visual Bars）
- **優點（Pros）**：
  1. **視覺化衝擊力最強（Visual First）**：上半部 3 顆半圓轉盤（Gauges）＋下半部 `L1 Sanity ✓ → L2 Core Risks ✓ → L3 Stress (未測)` 分段色條，讓讀者在**完全不讀內文**的情況下，3 秒內用顏色長短看出「我們測到第幾層、哪裡是刻意不測的邊界」。
  2. **左側導覽列分流極清楚**：仿照 `msr5464/QA-Dashboard` 的左側欄設計，將「總覽」、「34 案例明細」、「P0 失敗攔截回放」、「設計演進」做成獨立頁籤，擴充性最好。
- **缺點（Cons）**：
  1. **「人話判斷（Comments）」的空間被壓縮**：為了放進橫向分段長條（`L1 / L2 / L3`），每一列右側能寫 QA 主觀判斷理由的字數變少（約只能放 10～15 個字），稍減弱了 James Bach 強調「Comments 欄位是靈魂」的文字解釋力。
  2. **半圓轉盤（Gauge）若沒標註清楚，容易被誤認為傳統百分比儀表**：雖然我們在轉盤內改放 `Level 2` 與 `2/2 GO`，但硬核 RST 信徒第一眼看到圓弧表盤可能會聯想到傳統 KPI 數字看板。

#### 5. ⭐ 方案 5（推薦）：雙視角切換版 — 30 秒 Low-Tech 主管白板 ⇄ 一鍵工程證據鏈
- **優點（Pros）**：
  1. **同時滿足「主管/HR 15 秒抓重點」與「資深 QA 工程師查驗底層證據」兩種受眾**：
     - **預設停在 `👁️ 1. Low-Tech 白板模式`**：左欄看 2 個受測專案人話總評、右欄看標準 James Bach 五欄表，乾淨俐落、零黑話干擾。
     - **點一下切到 `🔬 2. 工程證據與四步追溯模式`**：立刻展開你原本引以為傲的 `00–08` 四步追溯鏈、`G1–G6` 裁決規則與 `JUnit SHA-256` 收據。
  2. **零資產浪費**：你前面花功夫寫好的四步追溯與治理矩陣**完全不用丟掉**，而是收納到第 2 個切換視角，反而更能體現「我知道什麼時候該給高層看簡潔白板、什麼時候該給工程師看防偽證據鏈」的產品設計思維。
  3. **「P0 失敗攔截證明」互動最優雅**：左下方獨立一張虛線紅卡，點擊後直接讓右側五欄白板即時切換成「當 `TC-MDQ-017` 失敗時的紅燈攔截狀態」，不會在預設綠燈時造成視覺混亂。
- **缺點（Cons）**：
  1. **前端狀態切換邏輯比單一靜態表稍微多一點**：需要實作頂部 Mode 切換（`白板模式` vs. `工程證據模式` vs. `失敗攔截預覽`）的 React state，以及深淺色主題切換。
  2. **若訪客完全不點頂部切換鈕，就只會看到第一層白板**：因此底部保留了一排輕量膠囊提示（`34 Case Specs`、`6 JUnit SHA-256 Receipts`、`00-08 Templates`、`6 Fail-Closed Rules`），提醒訪客底下還有完整工程證據可點開。



---

## 六、★ 終極混搭版示意圖（Ultimate Hybrid Low-Tech Board）

融合上述五個方案各自的強項：
1. **頂部雙視角切換（方案 5）**：`👁️ 1. Low-Tech 白板模式 (30s 決策總覽)` ⇄ `🔬 2. 工程證據與四步追溯 (G1–G6 / SHA)` ⇄ `🛑 3. 預覽 P0 失敗攔截 (Hold Replay)`。
2. **上方三問結果信號條（方案 2 + 方案 3）**：3 秒回答「能不能發（`2/2 SCOPED GO`）」、「測到多深（`Level 2 Target Met`）」、「有無阻擋風險（`0 P0/P1 Blockers`）」。
3. **左欄便利貼摘要卡（方案 2）**：分別呈現兩個受測專案的人話結論，以及獨立不干擾綠燈的「如果 P0 失敗會怎樣？」預覽按鈕。
4. **右欄 James Bach 五欄表 ✕ `msr5464` 視覺覆蓋長條（方案 1 + 方案 4）**：在第 3 欄 `Coverage` 同時放入 **James Bach `0 | 1 | 1+ | 2 | 2+ | 3` 階梯** 與 **`L1 Sanity ✓ → L2 Core ✓ → L3 壓測未測` 視覺分段條**，既看得到視覺比例、又保留完整人話判斷與單一證據連結。

![[QA/attachments/low-tech-opt6-ultimate-hybrid.png]]


---

## 七、★ 終極混搭版 v2（紅框長文預設收合 · Collapsible Progressive Disclosure）

針對第一版混搭圖中「上方三問卡與左側三張專案卡的解釋文字仍偏多、容易分散中央五欄白板注意力」的問題，將這兩處紅框區塊改為**預設收合（只留標題、結論徽章與 `▸ 展開說明` 按鈕）**：
- **上方信號條高度減半**：一眼只看 `✓ 2/2 SCOPED GO`、`Level 2 Target Met`、`0 P0/P1 Blockers` 三個結果。
- **左欄寬度由 `345px` 瘦身為 `285px`**：預設收起多行引述文字，想看專案總評或 `TC-017` 攔截背景的人點擊 `▸ 展開` 才拉開抽屜，讓視線 100% 聚焦在右側的 **James Bach 五欄品質評估表**。

![[QA/attachments/low-tech-opt7-hybrid-collapsible.png]]


---

## 八、取代「0, 1, 1+, 2, 2+, 3」密碼表：5 種更直覺的 Coverage（測試深度）表現方式

James Bach 1997 年原版的 `0, 1, 1+, 2, 2+, 3` 雖然避免了虛榮百分比，但需要讀者先看圖例背誦代號（Legend Tax）。以下 5 種現代改良作法既能**完全保留「不算虛榮百分比、誠實表達測試深度與未測邊界」的精神**，又能讓第一次看的主管或面試官 **1 秒看懂**：

1. **★ 做法 A（最推薦 · 三階段白話里程碑）**：直接用三格白話印章 **`[✓ 基礎正常] [✓ 異常與邊界] [◌ 壓測未測]`**（或排除列直接顯示 **`[🚫 明確排除（未測 · 不冒充零風險）]`**），完全不必查圖例，一眼看懂測到哪一層。
2. **做法 B（4 格手機訊號強度 ＋ 白話深度標籤）**：用視覺直覺的 4 格高低訊號柱配上一句話（如 `核心與邊界已覆蓋`），寬度最省。
3. **做法 C（已測情境 ✕ 未測情境標籤 Scope Chips）**：直接列出該區具體測了什麼（`✓ 正常遞增`、`✓ 亂序拒絕`、`◌ 壓測排除`）。
4. **做法 D（三格深度進度條 ＋ Depth 2/3）**：上方寫白話深度名稱，下方配乾淨的三格色條。
5. **做法 E（預期目標 vs. 實測狀態卡）**：標示「正常＋異常邊界（目標範圍）」＋ `✓ 已達標`，消除「為什麼沒填滿第 3 格」的誤會。

![[QA/attachments/low-tech-coverage-5-ways.png]]


---

## 九、★ 終極混搭定案版 v3（紅框長文預設收合 ＋ 三階段白話里程碑取代 0~3 密碼表）

把 `0, 1, 1+, 2, 2+, 3` 數字階梯徹底移除，換成最直覺的 **做法 A（三階段白話里程碑：`[✓ 基礎正常] [✓ 異常與邊界] [◌ 壓測未測]`）**，並保留上方與左側卡片的 **`▸ 展開` 預設收合設計**：

![[QA/attachments/low-tech-opt8-hybrid-v3-milestones.png]]
