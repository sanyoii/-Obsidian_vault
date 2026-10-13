# Web3／Crypto QA 互動教材

> **對象**：William Lu（Senior QA／PQE，Web3／Crypto）  
> **來源母稿**：[[Web3-Crypto-QA-入門學習包]]  
> **形式**：關卡制 — 每關「30 秒精讀 → 題目 → 對答案／迷思標註」  
> **規則**：先自己答再展開答案；未答過不宣稱已學會。僅防禦／QA 觀念，不含 exploit 步驟。  
> **建立**：2026-09-12

---

## 怎麼玩

1. 依序打關（建議一次 1～2 關）。  
2. 每關先讀「精讀卡」，再做題；答案用 callout 折疊，**先寫自己的答案再展開**。  
3. 自評：`正確`／`部分`／`錯`。錯或部份 → 看「最小補課」再重答同題。  
4. 全部關卡 + Boss 關過完 → 才算本互動教材達停止條件。  
5. 想跟 Learning Assistant 對打：回聊天說「開第 N 關」即可即時評分。

### 進度表（自己勾）

- [ ] 開場：心智模型  
- [ ] 關卡 1：不可變性  
- [ ] 關卡 2：Gas／Finality／狀態  
- [ ] 關卡 3：錢包／簽章／Approve  
- [ ] 關卡 4：風險地圖（高層）  
- [ ] 關卡 5：ERC 標準整合  
- [ ] 關卡 6：橋／Oracle／L2  
- [ ] 關卡 7：測試分層與 QA vs Audit  
- [ ] Boss 關：綜合情境  

---

## 開場關 — 心智模型

### 精讀卡（30 秒）

> Web3 QA 的核心不是「上線後再 hotfix」，而是在**不可逆、公開、有真實資產與 gas、對手可匿名且無需許可**的環境裡，事前驗證狀態機、權限邊界、簽章語意與跨系統假設。

來源錨點：ethereum.org Testing／Security。

### 題目 O1（簡答）

用**一句話**寫出 Web3 QA 與 Web2 QA 最關鍵的差異（不要列舉超過一個主軸）。

### 自評提示

展開前先寫下你的答案。

> [!success]- 參考答＋評分
> **參考答：** Web2 多半能熱修／補償；Web3 預設部署後難改、資產難追回，且任何人可呼叫公開介面，因此品質必須在部署前用可回歸證據鎖住。  
> **正確：** 點到不可逆／難追回／permissionless 至少兩點，或「部署前驗證」為核心。  
> **部分：** 只說「比較去中心化」或只提 gas。  
> **錯：** 認為和 Web2 測試流程完全一樣、上線後再修即可。  
> **最小補課：** 重讀母稿「一句結論心智模型」＋對照表「錯誤修復／失敗後果」列。

---

## 關卡 1 — 不可變性與部署前門檻

### 精讀卡

- 合約上鏈後程式碼通常不能像 Web2 改檔熱修；proxy 升級會改信任假設。  
- 常見錯覺：「有 upgradeable／pause 就不需完整測試」「audit 過就永遠安全」。  
- QA 要驗：部署前風險對應測試是否齊；升級路徑（若有）的權限／初始化／storage 假設；緊急停止能否在 testnet／fork 演練。

### 題目 1A（選擇）

產品說「我們有 pause，所以可以少測一點負向路徑」。你的立場？

- A. 同意，pause 等於熱修  
- B. 不同意：pause／升級本身也是要測的信任與狀態路徑，不能替代部署前驗證  
- C. 無所謂，交給 audit 即可  

### 題目 1B（情境）

上線前一天才發現關鍵權限角色可被任意呼叫。你會要求釋出閘門加什麼**最低證據**？（寫 2 點）

> [!success]- 1A／1B 參考答
> **1A：B。** pause／升級不是免測金牌；它們改變信任模型，本身需要演練。A 把 pause 當熱修；C 把 audit 當 QA 替代（ethereum.org：audit 非銀彈、測試與 audit 互補）。  
> **1B 示例：** ①非授權呼叫必須 revert 的自動化測試／fork 證據；②權限角色變更與緊急路徑的 testnet 或 fork 演練紀錄＋已知假設清單。  
> **迷思：** 「有 multisig 就不用測權限。」Multisig 仍可能配錯或流程未演練。  
> **最小補課：** 母稿觀念 1；ethereum.org Security（access control／upgrades）。

---

## 關卡 2 — 鏈上狀態、Gas、Finality

### 精讀卡

- 寫入＝交易＝簽章＋gas；確認／最終性依鏈與 L2 而異。  
- 常見錯覺：單測綠＝主網一樣；UI 顯示成功＝資產已最終確認。  
- QA 要驗：pending／revert／失敗 UX；換網路；RPC 不一致；關鍵路徑 gas 回歸（概念上）。**各鏈秒數不背死，依目標鏈文件。**

### 題目 2A（選擇）

使用者看到「Success」但資產未到帳。最可能缺哪類驗證？

- A. 只測了合約單元測試  
- B. 產品把「交易已送出／某層確認」當成「最終到帳」，缺確認深度／L2 最終性／RPC 狀態同步檢查  
- C. 一定是使用者詐騙  

### 題目 2B（改錯）

「我們在 Hardhat 單測全綠，所以不用 testnet。」改正這句話。

> [!success]- 2A／2B 參考答
> **2A：B**（A 可能是根因之一，但題幹現象直接對應確認／狀態同步假設；C 武斷）。  
> **2B 示例：** 單測驗證局部邏輯；仍需 fork／testnet／E2E 覆蓋真實 RPC、最終性與整合差異。ethereum.org Testing：local／testnet 分層逼近，仍有差異。  
> **最小補課：** 母稿觀念 2；OWASP SCS 前端錯誤處理相關檢查。

---

## 關卡 3 — 錢包、簽章、Approve／Allowance

### 精讀卡

- 身分＝錢包＋簽章（含**鏈下** typed data）；ERC-20 `approve`／`allowance`／`transferFrom` 可授權第三方。  
- 常見錯覺：「只是簽訊息沒上鏈就沒風險」；「UI 寫 list 就只做 list」。  
- QA 要驗：連線／斷線／換帳／換鏈；簽章提示是否揭露 spender、額度、deadline、合約；拒絕簽章後狀態；無限額 approve 的警告與撤銷說明。**不寫攻擊操作步驟。**

### 題目 3A（選擇）

哪個**最像** QA 應阻擋的產品預設？

- A. 預設請求精確額度 approve，並在 UI 顯示 spender  
- B. 預設無限額 approve，簽章摘要難以辨識 spender／額度  
- C. 拒絕簽章後回滾本地草稿狀態  

### 題目 3B（填空）

EIP-20 語意下，`transferFrom` 能成功的前提之一是 spender 仍有足夠的 ______。

### 題目 3C（情境決策）

簽章彈窗只顯示「Sign in」。你要開的 bug／風險單標題怎麼寫？（一句）

> [!success]- 3A／3B／3C 參考答
> **3A：B**（危險預設）。A、C 是較佳行為。  
> **3B：`allowance`（授權額度）。**  
> **3C 示例：**「簽章提示未揭露授權對象與額度／訊息語意，使用者無法知情同意」。  
> **迷思：** 鏈下簽章＝無風險。MetaMask：簽章可授權後續動作且不一定立刻上鏈。  
> **最小補課：** EIP-20；MetaMask Signature phishing；母稿觀念 3。

---

## 關卡 4 — 風險地圖（高層，知要驗什麼）

### 精讀卡

- 高層類別含：重入、存取控制、業務邏輯、oracle／價格、未檢查外部呼叫、proxy／升級等（見 OWASP SC Top 10；細節以官網為準）。  
- QA 目標：把風險變成**負向案例與 invariant**，不是重現 exploit。  
- 常見錯覺：靜態分析綠＝無洞；只測自己的合約、忽略外部 token／組合性。

### 題目 4A（配對）

把左邊驗收句配到風險焦點：

1. 非授權位址呼叫管理函式應 revert  
2. 外部呼叫後狀態仍符合「先更新狀態再互動」的意圖  
3. 價格過期或來源失敗時協議應安全暫停／拒絕  

選項：`(甲) 存取控制` `(乙) 重入／外部呼叫順序` `(丙) Oracle／價格假設`

### 題目 4B（簡答）

為什麼「只測 happy path」在 Web3 特別不夠？（一句）

> [!success]- 4A／4B 參考答
> **4A：** 1→甲；2→乙；3→丙。  
> **4B：** 對手可無需許可呼叫公開介面且可組合惡意合約；錯誤常直接變成資產損失且難逆轉。  
> **注意：** 本關不要求、也不應寫攻擊步驟。  
> **最小補課：** 母稿觀念 4；Solidity Security（CEI／reentrancy 概念）；OWASP Top 10 條目名稱。

---

## 關卡 5 — 代幣標準（ERC-20／721）整合

### 精讀卡

- 標準定義介面與事件語意；實作常偏離。  
- 常見錯覺：名字叫 ERC-20 就完全合規；只測 transfer 成功即可。  
- QA：回傳值、事件、`approve`／allowance、ERC-721 `safeTransferFrom`／接收回呼；非標準 token（缺 return、fee-on-transfer）整合行為。

### 題目 5A（選擇）

整合「聲稱 ERC-20」的第三方 token，最低限度還要多驗什麼？

- A. 只要 symbol／decimals 有值  
- B. 轉帳回傳值／事件／approve 語意，以及異常 token 行為下協議是否安全失敗  
- C. 只在主網手動轉一筆  

### 題目 5B（改錯）

「用了 OpenZeppelin 實作，所以免測 ERC 語意。」改正。

> [!success]- 5A／5B 參考答
> **5A：B。**  
> **5B：** OZ 是高品質起點，不是免測證明；仍要測你們的整合假設與升級／配置。ethereum.org 亦強調複用標準庫，但測試責任仍在專案。  
> **最小補課：** EIP-20／721；母稿觀念 5。

---

## 關卡 6 — 橋、Oracle、L2（跨系統假設）

### 精讀卡

- Oracle 帶鏈下資料；橋／L2 有延遲、訊息驗證、最終性假設。  
- 常見錯覺：DEX spot 當唯一價格；L2 與 L1 行為完全相同。  
- QA：staleness、失敗／暫停行為、跨鏈重放與錯誤路徑（依專案文件）。深度依職缺域再定。

### 題目 6A（情境）

協議在「價格饋送暫停」時仍繼續清算。這違反哪類假設？你要的測試證據是什麼？

### 題目 6B（選擇）

關於 MEV／執行品質，QA 較合理的關注是：

- A. 學會寫搶跑機器人  
- B. 使用者滑點／失敗交易／交易排序造成的可感知缺陷與提示是否誠實  
- C. 忽略，因為那是礦工的事  

> [!success]- 6A／6B 參考答
> **6A：** 違反 oracle／價格可用性與安全失敗假設。證據：饋送暫停或過期時，清算／開倉等路徑應 revert 或進入文件定義的安全模式（自動化或 fork 測試）。  
> **6B：B。** A 超出本教材範圍且非 QA 入門目標；C 忽略使用者可感知品質。來源：ethereum.org MEV（對使用者執行品質的影響，高層）。  
> **最小補課：** 母稿觀念 6；OWASP SCS Oracles／Bridges。

---

## 關卡 7 — 測試分層與 QA vs Audit

### 精讀卡

- 分層：單元 → 整合／fork → 靜態分析 → fuzz／invariant → local／testnet E2E。  
- 測試不能保證完全正確；audit／bug bounty **互補不取代** QA。  
- Senior QA 價值：把風險變成可回歸的驗收條件與品質門檻。

### 題目 7A（排序）

若只有兩週上線，你會如何排優先？（排出前 4）  
選項：視覺回歸精修、關鍵 invariant／負向單測、主網 fork 整合、靜態分析進 CI、完整 UI 動畫驗收、獨立 audit 報告閱讀與缺口清單

### 題目 7B（簡答）

寫出 QA 交給 audit 的交接物應有的 3 項。

> [!success]- 7A／7B 參考答
> **7A 合理示例：** ①關鍵 invariant／負向單測 ②靜態分析進 CI ③主網 fork 整合 ④讀 audit／整理測試缺口清單。視覺／動畫精修通常較後。  
> **7B 示例：** 威脅／假設摘要；已自動化的 invariant 與覆蓋缺口；已知限制與未測項。  
> **迷思：** 「有 audit＝QA 可省略」「覆蓋率 100%＝安全」。  
> **最小補課：** ethereum.org Testing（property／audits）；Foundry invariant（概念）；母稿觀念 7。

---

## Boss 關 — 綜合情境（面試向）

一次答完再對。自評每題 `正確／部分／錯`。

**B1.** 為什麼「測試通過」仍不能宣稱合約正確？形式化驗證與 audit 各補什麼？  

**B2.** 舉三個 Web3 特有、必須在發布前堵住的品質風險（至少一個簽章／approve UX）。  

**B3.** 對 ERC-20 `approve`，產品／QA 應堅持哪些使用者可見的安全預設？（對照 EIP-20，不談攻擊細節）  

**B4.** 畫或列出你的測試分層，並標每層「QA 可問的一個問題」。  

**B5.** 30 秒口條：QA 和外部 audit 差在哪？如何協作？

> [!success]- Boss 參考答（綱要）
> **B1：** 測試是抽樣／屬性檢查，非窮盡證明。形式化驗證補數學／規格證明（成本高、範圍有限）；audit 補獨立專家審查但仍非保證。ethereum.org：測試≠形式化驗證；audit 非銀彈。  
> **B2 示例：** 權限錯誤；無限額／不清簽章；錯誤最終性提示；oracle 過期仍作動；非標準 ERC 整合卡住資金。  
> **B3 示例：** 清楚 spender 與額度；慎用無限額；可撤銷說明；拒絕簽章後狀態一致；換鏈／換帳提示。  
> **B4 示例：** 單測「非法狀態能到嗎？」；fork「真實 token 整合？」；靜態分析「常見洞模式？」；invariant「資產守恆？」；testnet「簽章 UX 可理解嗎？」  
> **B5 示例：** QA 負責持續、可回歸的風險驗收與釋出門檻；audit 是獨立深審與時間點快照；交接假設／invariant／缺口，audit 後把發現變回歸測試。

---

## 過關標準（停止條件）

- [ ] 開場＋關卡 1–7 自評至少 80% 題目為「正確」或訂正後「正確」  
- [ ] Boss 五題皆作答；錯題完成最小補課  
- [ ] 產出三件實物（可放面試夾）：Web2 vs Web3 自用對照（5 點）、錢包／approve 測試清單草稿、一頁「風險→QA 證據」  

達標即停止本互動教材；Foundry 實作課、特定協議深挖、履歷敘事另開主題。

---

## 來源速查（與母稿一致）

| 優先 | 來源 |
|------|------|
| 官方 | https://ethereum.org/developers/docs/smart-contracts/testing/ |
| 官方 | https://ethereum.org/developers/docs/smart-contracts/security/ |
| 官方 | https://docs.soliditylang.org/en/latest/security-considerations.html |
| 標準 | https://eips.ethereum.org/EIPS/eip-20 |
| 產品／業界 | https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/signature-phishing/ |
| 業界 | https://scs.owasp.org/checklists/ |
| 業界 | https://owasp.org/www-project-smart-contract-top-10/ （請以官網為準） |
| 工具文件 | https://www.getfoundry.sh/guides/invariant-testing |
| 官方 | https://ethereum.org/developers/docs/mev/ |

完整表見 [[Web3-Crypto-QA-入門學習包]]。

---

## 未確認（沿用）

- 職缺主軸偏 DeFi／NFT／Infra／純合約：影響第 2 週加深  
- 目標鏈／L2：影響 finality 細節  
- OWASP Top 10 頁細節以官網為準（曾有抓取失敗紀錄）
