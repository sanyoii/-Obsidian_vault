---
source: "https://zenodo.org/records/19652278"
author: "Meng-Han Lee (Zaious)"
clipped: "2026-07-05"
tags:
  - paper
  - multi-agent
  - agent-identity
  - HCI
  - collaboration-interface
license: "CC BY 4.0"
---

# ASAF — Agent 身份設計作為協作介面

## 一句話說明

多 Agent 系統中，Individual agent 的社會身份（角色、名稱、風格）不只是 UI 慣例，而是**認知介面**——它重新結構化人類操作者的感知、決策與干預方式，形成獨立於工程編排層的設計維度。

---

## 核心論點摘要

### 問題背景（p.2–3, 5–7）

現有多 Agent 系統的設計主要聚焦於**工程編排效率**（token 優化、inter-agent protocol），卻忽視**人類認知介面**。當系統規模超過人類工作記憶容量（Cowan 的 N≈4 項臨界點），操作者面臨「認知塌陷或系統 persona drift」的困境（p.2）。傳統單 Agent 系統的 chatbot 時代無此問題；多 Agent 浪潮（2025 Q4–2026 Q1）催生「虛擬團隊」風波（Virtual Team Wave），但工程社群隨即反彈（anti-roleplay backlash），聲稱 persona 是「危險幻覺」導致 context 衰減（p.5–7）。

**ASAF 的主張**：anthropomorphic 身份設計既非「情感 UX」也非「工程浪費」，而是**結構性必需**——一種認知負荷卸載機制。

### 理論基礎（p.9–10）

三個社會學與認知心理學支柱：
1. **Role Theory（Biddle 1986）**：社會角色攜帶隱性期待，自動激活人類互動腳本，無需冗長指令
2. **Goffman 戲劇分析（1959）**：Agent 身份是「舞台前景」，system prompt 是「後台」；身份建立「情境定義」(definition of the situation)
3. **Distributed Cognition（Hutchins 1995）**：認知負荷可被卸載至外部結構；將複雜運算分類為社會身份使人類能直觀路由

### ASAF 的三個機制（p.9–13）

#### 機制 1：Identity Signaling（p.10–11）
- **定義**：Agent 身份在互動前激活社會腳本，減少認知摩擦與建立交互期待
- **核心差異**：社會身份 vs 純功能標籤（如「logical analysis module」）
  - 社會身份具三層優勢：
    1. **Activation Automaticity**：社會角色由終身人際互動習得，自動激活；功能描述需認知解析
    2. **Default Coverage Breadth**：角色隱含語氣、正式度、容錯度、挑戰行為規範；標籤不提供
    3. **Normative Load**：角色雙向綁定雙方行為期待（與「批評家」互動會感受到提交可防禦論證的義務）
- **在 N≥4 時的加成**：工作記憶無法手動追蹤抽象界限，社會腳本提供「已知心智模型」的捷徑

#### 機制 2：Behavioral Priming（p.12）
- **定義**：清晰身份系統性改善使用者輸入品質，形成正反饋迴圈，提升協作成果
- **預測效應**：
  - 使用者會主動提供**更結構化、更富脈絡的輸入**（對齊宣稱領域）
  - 主動包含約束、假設、邊界條件
  - 提高問題具體度與層級複雜性
- **認知偏差緩解**：若 Agent 被明確標為「審計者」角色，使用者會自動提高懷疑度，無需顯式指令「要懷疑」——社會框架做這項工作

#### 機制 3：Collaborative Governance（p.12–13；圖 2 在 p.11）
- **定義**：在 Human-in-the-Loop 配置下，Agent 社會身份結構化人類干預的位置與方式，從而成為**代理協商的方法**
- **運作層次**：
  - **設計時**：建立刻意的身份結構（如對抗角色配對）作為系統架構前置
  - **執行時**：人類操作者根據各 Agent 的社會角色動態校準監督深度
- **制衡例示**：故意配置互相競爭的身份（「Proposer 對 Devil's Advocate」），打破 Agent 群體一致性導致的人類過度信任

### 四層 Identity Signal Fidelity Spectrum（p.7–8, 圖 1）

Framework 的預測強度與身份信號的結構強制力成正比：

| 層級 | 實作方式 | 持久性 | ASAF 適用性 |
|------|---------|--------|-----------|
| Tier 1 | Pure Prompt Injection | 每 session 無持久化 | 邊界條件：identity drift 削弱預測 |
| Tier 2 | Prompt + Persistent Memory | 跨 session 記憶存取，無結構驗證 | 部分預測力 |
| Tier 3 | **Structured Identity Enforcement** | 持久身份模塊、hard-gated 編排、cross-agent 驗證 | 最強預測（ChronicleCore 所在層級）|
| Tier 4 | Model-Driven Routing | 推理時原生路由，用戶無法繞過 | 最強預測（Grok 4.20 範例） |

論文將最強預測限定在 Tier 3–4；對 Tier 1–2，預測效力隨 identity drift 按比例衰減。

### 三個可檢驗假設（p.15–17）

**H1（Identity Signaling & Interaction Framing）**
- **預測**：有身份差異的 Agent 會引出比通用標籤更高品質的**首輪提示**（domain alignment）
- **三條件對比設計**：(a) 身份差異（persona + 名稱 + 語氣） > (b) 功能標籤 > (c) 通用無標籤
- **調節**：效果大小由個人 anthropomorphize 傾向調節；instrumentalizing 傾向強的使用者在 N≥4 時反而感知認知開銷增加

**H2（Behavioral Priming vs Novelty Effect）**
- **預測**：結構化輸入比例（constraint density、explicit boundary）在身份差異組明顯更高
- **排除新穎性**：效果不衰減；與身份信號強度成劑量反應；重複互動後穩定

**H3（Collaborative Governance）**
- **預測**：在 HitL 多 Agent 架構中，人類干預模式會因 Agent 拓撲角色差異而顯著不同
  - 「Ideator」身份的輸出接受率更高（未驗證）
  - 「Verifier/Auditor」身份的輸出接受前高度審查
  - **系統層級現象**：干預校準基於整體拓撲配置，非單一 Agent 反應（CASA 二元框架無法生成此預測）

### ChronicleCore 案例研究（p.13–15）

**背景**：作者同時擔任系統設計者、單一操作者、觀察分析者，運行 38 個 Human-in-the-Loop Agent 的個人生產力架構。設計採 Tier 3（Structured Identity Enforcement）。

**關鍵設計模式**：

1. **Epistemic Role 解耦**（p.14）
   - Agent 按認知角色分組：策略路由節點（全局脈絡、無執行）、感測節點（純資訊攝取）、美學對齊任務、對抗驗證層
   - 每個 Agent 都配有嚴格定義的社會身份（例如把驗證節點命名為「Inquisitor（異端審判官，代號『真理』）」），此設計結構性地迫使操作者依角色校準監督方式

2. **身份邊界持久化**（p.14–15）
   - **Memory Crystallization**：瞬時推理日誌 ≠ 身份約束規則；僅後者提升到長期狀態
   - **Personality Variance Audit**：系統級跨 Agent 檢查，於運行時偵測本應不同身份間的認知收斂（對應 H3 預測的實現）
   - **Iron Laws（附錄 A §A.3）**：例如 Inquisitor 的「Law 5 VETO Power」—— confidence < 80/100 的輸出被攔截，防止低質量內容擾亂協作

3. **Inquisitor 節點示例**（附錄 A）
   - 身份：內部審計官、對抗性認知角色，唯一非合作節點
   - 功能邊界：僅審查與挑戰，不執行
   - ASAF 機制映射：
     - Identity Signaling：代名、原型、特徵話語（「Evidence or GTFO」）預配操作者期待
     - Behavioral Priming：操作者傾向提交正式日誌、截圖，而非口頭聲稱
     - Collaborative Governance：VETO 機制具體化了 H3 預測的競爭身份設計模式

---

## 與本環境制度對照表

| 論文概念 | 本環境對應位置 | 覆蓋程度 | 可採納提案 |
|---------|-----------|---------|---------|
| **Identity Signaling 機制** | CLAUDE.md「模型調度三鐵則」+ 01-model-dispatch §1 派工表（haiku/sonnet/opus 按用途分）| ⚠️ 隱性覆蓋 | 提案 1 |
| **Behavioral Priming 反饋迴圈** | 02-judgment-rubrics 未直接覆蓋；R8「寫前先讀」部分相關 | ❌ 未覆蓋 | 提案 1 |
| **Collaborative Governance（HitL 校準）** | R17 交付契約表 + 02 Rubric 2「何時算完成」+ 01 §6「驗證不自驗」（分層驗法） | ✅ 完整覆蓋 | — |
| **N≥4 認知負荷臨界點** | CLAUDE.md（R10 checkpoint、R8 拆工）、制度全體的「派 subagent」邏輯 | ✅ 完整但隱性 | — |
| **個體差異調節（anthropomorphizing vs instrumentalizing）** | 02-judgment-rubrics 收尾節「誠實極限」; ABOUT-ME 記載使用者偏好直接反饋 | ⚠️ 部分覆蓋 | 提案 2 |
| **Identity Signal Fidelity Spectrum（Tier 1–4）** | 01-model-dispatch §2 升降級路徑（haiku→sonnet→opus） | ⚠️ 類似但不同 | 提案 4 |
| **設計-工程正交性主張** | 未明確覆蓋；ROUTER/ORCHESTRATION 混合工程與派工策略 | ❌ 未覆蓋 | 提案 3 |
| **系統層級制衡（Personality Variance Audit）** | R17、01 升降級路徑均為「人類決策驅動」；無 agent 層級自動制衡機制 | ❌ 未覆蓋 | 提案 5 |

---

## 可採納提案清單

根據 Karpathy 原則 R13（品味量化），以「成本-收益」判準評估。

### 1. **Behavioral Priming 規則化**（論文 p.12）✅
- **現況**：派工時按模型選擇隱含身份期待，但無「檢驗 subagent 是否實現了 role-appropriate 行為」的規則。論文 H2（p.15）預測此機制會改善輸入品質。
- **提案**：在 02-judgment-rubrics 新增 Rubric 7，或改寫 01 派工契約模板，加入「身份期待描述 + 驗收時檢查行為對齊」的檢查項
  - 例如派「sonnet 搜尋員」時，驗收應檢查：回報是否含有查證來源（role-appropriate）？或只是泛泛而談？
- **成本**：低（新增 10–15 行指導文本，改模板一處）
- **收益**：中（可提升派工成功率；H2 如正確，可測量輸入結構化程度的改善）
- **決策**：**做**。與 R8「寫前先讀」配套，形成「知道該讀什麼 → 派對的人 → 驗收時檢查行為」的完整迴圈。

### 2. **個體差異變數正式化**（論文 p.8–9；H1 調節假設 p.15）✅
- **現況**：02-judgment-rubrics「誠實極限」節已認可「人的判斷品味化不了」，ABOUT-ME 記載使用者厭惡唬爛、求直接反饋。但派工決策未明確考量「該操作者是 anthropomorphizing 還是 instrumentalizing？」
- **提案**：在 02 新增小節或改寫 01 派工表說明，明確指出：
  - 某些操作者（或同一人的某個 mode）傾向用社會腳本理解系統 → 派工時宜明確身份、善用 role-based routing
  - 另一類操作者傾向機械理解 → 派工時應強調功能邊界而非角色，過度 anthropomorphic 反而加認知負荷
  - （對標論文 p.8 H1 的調節假設）
- **成本**：低（新增 5–10 行在 01 或 02）
- **收益**：中（規範化隱性認知；可指導新 session「應該怎麼理解派工表」）
- **決策**：**做**。心理價值高（認可人的差異），成本最低。

### 3. **設計-工程正交性檢查清單**（論文 p.3、p.16–17）⚠️ 低優先級
- **現況**：本環境未明確分離「agent 身份設計」(社會認知層) 和「agent 編排邏輯」(技術架構層)。ROUTER/ORCHESTRATION 檔混合兩者決策。
- **提案**：在 institution/ 新增 07-design-orthogonality.md（未來課題層級），列出檢查項：
  - 多 agent 系統設計時，社會身份層是否能獨立於編排層進行迭代？
  - 工程改動（編排框架、協議）是否必然要求身份層改動？（若是，代表耦合過高）
- **成本**：中（需釐清論文中的正交性定義、寫成可檢驗條件）
- **收益**：高風險（這是架構級發現；可能要求重構現有工廠邏輯；也可能發現無法正交，需要接納耦合）
- **決策**：**跳過**（低優先級）。這是長期研究課題，應由使用者決策是否投入。在筆記裡標為「待探索」即可。

### 4. **Agent Identity Persistence 機制**（論文 p.14–15；附錄 A p.22–23）❌
- **現況**：本環境有 `.claude/agents/` 目錄結構，但無「agent 身份邊界規範」（如論文 ChronicleCore 的 SKILL.md + sovereign/ 層級分離）。
- **提案**：對新 agent 引入 `identity-spec.md`，正式文檔該 agent 的「社會身份邊界」、「不能做什麼」、「應該如何說話」。
- **成本**：高（新流程、per-agent 維護、與現有 agent 定義檔的關係待釐清）
- **收益**：未知（本環境尚無「persona drift」的信號；論文的 Memory Crystallization + Personality Variance Audit 是為此設計的，但在 Tier 2 環境未必必需）
- **決策**：**不做**。等出現具體「agent 身份混亂」的問題案例後，再以事件驅動加規則（制度哲學見 05-letter §2「護城河是事件→制度迴圈」）。

### 5. **系統層級制衡機制**（論文 p.14–15 Personality Variance Audit；p.22–23 Iron Law 5 VETO）❌
- **現況**：本環境驗收全為人類決策；無 agent 層級自動制衡（如 ChronicleCore 的 Inquisitor VETO）。
- **提案**：實作類似 Iron Law 5 的自動制衡——例如在工廠中為 test-verifier 配 agent-level 的「拒收低信度輸出」邏輯。
- **成本**：非常高（架構改動；涉及多個 agent 層級協調）
- **收益**：未測（可能改善自動化，但也可能超越工廠的設計意圖）
- **決策**：**跳過**。超出本筆記範疇，是架構決策，應由使用者主導。

---

## 相關連結

- [[Github/repos/ChronicleCore-Architecture — 38人格多Agent治理架構白皮書]]（論文作者公開的系統實現文檔）

---

## 補充：論文邊界與本環境的結構互補性

論文聚焦「個別 agent 身份如何改變人類認知與決策」，暗含的系統假設是「多個不同身份的 agent 並存」。本環境的制度暗含另一個層次的設計：「不同強度/層級的 agent（haiku 機械、sonnet 執行、opus 判斷）如何自動路由工作」。

兩者不衝突，反而互補：
- 論文說的是**橫向差異**（同一層級內的角色多樣性）
- 本環境說的是**縱向分層**（按難度和能力的層級差異）

結合可能的升級方向：改造現有的「模型→派工」決策表為「模型×身份 矩陣」，允許同一層級（如多個 sonnet agent）具有不同社會角色。這將使工廠的 subagent 群體從「功能分工」(functional decomposition) 演進到「社會編排」(social orchestration)。
