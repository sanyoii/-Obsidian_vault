# Web3／Crypto QA 入門學習包

> **對象**：William Lu（求職向 Senior QA／Product Quality Engineer，Web3／Crypto track）  
> **觸發**：先學 Web3／Crypto QA 相關觀念  
> **格式**：學習目標｜來源清單｜學習包｜未確認事項｜停止條件  
> **撰寫原則**：主張皆可對應來源；不確定處標 **Unknown**；不臆造審計數字／CVE 統計／工具排名；僅防禦／QA 觀念（高層），不含 exploit PoC 或攻擊步驟。  
**日期**：2026-09-12

---

## 學習目標

完成本入門包後，你應能：

1. 用一句話說明「Web3 QA 與 Web2 QA 的本質差異」為何。
2. 指出合約／錢包簽章 UX／dApp↔鏈整合／代幣標準／橋與預言機等**測試域**與各自的風險焦點。
3. 用 QA 語言描述常見風險類別（重入、存取控制、預言機、approve／allowance、簽章釣魚、MEV 相關 UX）—**知道要驗什麼**，而非如何攻擊。
4. 畫出測試金字塔式地圖：單元／整合／fork、靜態分析、fuzz／invariant、testnet，並說清 **QA vs Audit** 邊界。
5. 能依一手文件自行延伸閱讀，不依賴隨機部落格。

---

## 來源清單（一手／高可信）

| # | 來源 | URL | 出版／維護方 | 約日期／更新 | 可信度層級 | 用途 |
|---|------|-----|--------------|--------------|------------|------|
| 1 | Testing smart contracts | https://ethereum.org/developers/docs/smart-contracts/testing/ | ethereum.org | Page last update: 2026-07-07 | **官方** | 不可變性、單元／整合／property／local／testnet、測試≠形式化驗證、測試 vs audit／bug bounty |
| 2 | Smart contract security | https://ethereum.org/developers/docs/smart-contracts/security/ | ethereum.org | Page last update: 2026-02-26 | **官方** | 存取控制、測試與靜態／動態分析、audit 非銀彈、重入概念、oracle 操縱概念、升級／緊急停止 |
| 3 | Smart contract security checklist | https://ethereum.org/developers/tutorials/secure-development-workflow/ | ethereum.org（內容源自 Trail of Bits 工作流） | 原文標註 2020-09-07；頁面更新 2026-03-03 | **官方／業界標準** | Slither／Echidna／屬性文件化、ERC 符合性、工具找不出的問題（mempool 可見、frontrun） |
| 4 | Solidity Security Considerations | https://docs.soliditylang.org/en/latest/security-considerations.html | Solidity 官方文件 | 持續更新（latest） | **官方** | 公開執行、重入、Checks-Effects-Interactions、gas／迴圈、tx.origin、overflow 模式 |
| 5 | OWASP Smart Contract Top 10 | https://owasp.org/www-project-smart-contract-top-10/ | OWASP Foundation | 標為 **2026** 版（搜尋摘要；本環境對該頁 WebFetch 回 409，細節以官網為準） | **業界標準** | 風險類別清單（存取控制、業務邏輯、oracle、flash loan、外部呼叫、重入、proxy／升級等） |
| 6 | OWASP SCS Checklist | https://scs.owasp.org/checklists/ | OWASP Smart Contract Security | 現況頁（抓取日 2026-09-12） | **業界標準** | 架構／oracle／整合檢查；層級含合約、橋、前端簽章 UX |
| 7 | ERC-20 Token Standard | https://eips.ethereum.org/EIPS/eip-20 | Ethereum EIPs | Created 2015-11-19 | **標準** | transfer／approve／allowance／transferFrom；approve 競態注意事項 |
| 8 | ERC-20／ERC-721 說明（ethereum.org） | https://ethereum.org/developers/docs/standards/tokens/erc-20/ 、https://ethereum.org/developers/docs/standards/tokens/erc-721/ | ethereum.org | 持續維護 | **官方** | 代幣標準 QA 語意與介面預期 |
| 9 | ERC-721 | https://eips.ethereum.org/EIPS/eip-721 | Ethereum EIPs | 標準文件 | **標準** | NFT 所有權、safeTransferFrom、approval |
| 10 | Maximal extractable value (MEV) | https://ethereum.org/developers/docs/mev/ | ethereum.org | Page last update: 2026-02-26 | **官方** | MEV 定義；三明治等對使用者執行品質／滑點的影響（高層） |
| 11 | Signature phishing（MetaMask Help） | https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/signature-phishing/ | MetaMask／Consensys 產品說明 | 現況頁（抓取日 2026-09-12） | **官方產品／業界** | 鏈下簽章釣魚、Permit2 風險型態、簽章非即時上鏈 |
| 12 | Foundry Invariant Testing | https://www.getfoundry.sh/guides/invariant-testing | Foundry（Paradigm 生態開發框架文件） | 現況文件（抓取日 2026-09-12） | **業界標準（工具官方）** | invariant、handler、solvency／conservation 等 QA 可對應的屬性 |
| 13 | Consensys Diligence Fuzzing | https://diligence.security/fuzzing/ 、介紹文 https://diligence.security/blog/2023/04/re-introducing-diligence-fuzzing/ | Consensys Diligence | 部落格 2023-04 | **業界標準** | 屬性／invariant fuzz、多交易序列（概念層） |
| 14 | Trail of Bits — Building Secure Smart Contracts | https://trailofbits.com/guides/building-secure-smart-contracts/ | Trail of Bits | 指南入口 | **業界標準** | 安全合約開發／測試框架入口（延伸） |
| 15 | OpenZeppelin Contracts（測試／函式庫） | https://www.openzeppelin.com/contracts （實作參考；ethereum.org 亦推薦複用） | OpenZeppelin | 持續維護 | **業界標準** | 標準實作、存取控制／可暫停等模式；**非**「用了就免測」 |

**刻意降權／僅作對照（非入門一手）**：一般行銷向 Web3 QA 部落格、未標方法論的「駭客損失總額」圖表、未具名工具排行。ethereum.org 安全頁有提到歷史事件與「估計超過 $1B」等敘述—**本包不獨立引用為統計事實**，僅指向官頁自行閱讀。

---

## 學習包

### 一句結論心智模型

> **Web3 QA 的核心不是「上線後再 hotfix」，而是在「不可逆、公開、有真實資產與 gas 成本、對手可匿名且無需許可」的環境裡，事前驗證狀態機、權限邊界、簽章語意與跨系統假設是否成立。**

對照錨點：ethereum.org《Testing smart contracts》強調鏈上程式難以事後修改，部署前測試是最低要求；《Smart contract security》強調公開鏈上資產難追回、合約邏輯不可變使品質門檻提高。

---

### Web2 QA vs Web3 QA 對照表

| 面向 | Web2 QA（典型） | Web3 QA（典型） | 來源依據 |
|------|-----------------|-----------------|----------|
| 錯誤修復 | 可熱修、回滾 DB、發版補丁 | 預設不可變；升級複雜且引入新信任假設 | ethereum.org Testing；Security |
| 狀態真相 | 後端／DB 為權威 | 共識與鏈上狀態為權威；錢包是身分與授權邊界 | ethereum.org 安全／測試敘述；產業對照 |
| 寫入成本 | 幾乎免費、可重試 | 需簽章、付 gas、受 finality／確認深度影響 | ethereum.org Testing（mainnet gas）；MEV／gas 脈絡 |
| 對手模型 | 帳號體系、權限、常見 Web 攻擊 | **Permissionless**：任何人可呼叫 `public`／`external`；可組合惡意合約 | Solidity Security；ethereum.org Access control |
| 觀測性 | 伺服器 log、可私有 staging | 交易公開；mempool 可見 → 排序／搶跑等議題 | ethereum.org checklist（mempool／frontrun）；MEV 頁 |
| 身分 | Email／session／OAuth | 錢包位址 + 簽章（含鏈下 typed data） | MetaMask Signature phishing |
| 失敗後果 | 資料損毀／體驗差，常可補償 | 資產損失常難逆轉；「小邏輯錯」即可釀重大損失 | ethereum.org Testing／Security |
| 測試環境 | Staging ≈ Prod | Local node／mainnet fork／testnet 分層逼近；仍有 RPC／狀態差異 | ethereum.org Testing |
| 品質保證邊界 | QA + AppSec + SRE | QA／開發測試 + **獨立 Audit／Bug bounty**（互補，非取代） | ethereum.org Testing vs audits |

---

### 5–7 個核心觀念（QA 視角）

#### 1. 不可變性與部署前品質門檻（Immutability）

| 欄位 | 內容 |
|------|------|
| **是什麼** | 合約部署後，EVM 上執行的程式碼通常無法像 Web2 一樣直接改檔熱修；雖有 proxy 等「虛擬升級」，但複雜且改變信任模型。 |
| **為何重要** | 漏洞若先被攻擊者發現，可能來不及修；升級本身也可能出錯。 |
| **常見錯覺** | 「有 upgradeable／有 pause 就不需要完整測試」；「audit 過就永遠安全」。 |
| **QA 要驗證什麼** | 需求與風險對應的測試是否在部署前完成；升級路徑（若有）的初始化、權限、storage layout 假設是否被測到；緊急停止／恢復路徑是否可演練（testnet／fork）。 |
| **來源** | ethereum.org Testing；Security（upgrades、emergency stop）；OWASP SCS（Architecture／Proxy） |

#### 2. 鏈上狀態、Gas 與 Finality

| 欄位 | 內容 |
|------|------|
| **是什麼** | 寫入需交易；消耗 gas；確認與最終性依鏈／L2 而異；失敗可 revert，但使用者仍可能付出成本或卡在 pending／replaced。 |
| **為何重要** | 功能正確但 gas 暴增、卡住、或錯誤的確認提示，都是產品品質缺陷。 |
| **常見錯覺** | 「單元測試綠了＝主網行為一樣」；「顯示成功＝資產已最終確認」。 |
| **QA 要驗證什麼** | 關鍵路徑的 gas 回歸（概念上）；pending／失敗／revert 的 UX 與狀態同步；網路切換（mainnet／testnet／L2）；RPC 不一致時的錯誤處理。**具體各鏈 finality 秒數：依目標鏈文件，本包不寫死數字（Unknown until scoped）。** |
| **來源** | ethereum.org Testing（gas、local vs mainnet、testnet）；OWASP SCS（前端錯誤處理） |

#### 3. 錢包、簽章與 Approve／Allowance

| 欄位 | 內容 |
|------|------|
| **是什麼** | 使用者透過錢包對交易或**鏈下訊息**簽章；ERC-20 的 `approve`／`allowance`／`transferFrom` 讓第三方合約代為轉幣；另有 Permit／Permit2 等鏈下授權型態。 |
| **為何重要** | 簽錯一次可能授予長期／無限額度；鏈下簽章可能不上鏈，調查困難。 |
| **常見錯覺** | 「只是簽個訊息、沒廣播就沒風險」；「UI 說 list／deposit 就等於只做那件事」。 |
| **QA 要驗證什麼** | 連線／斷線／換帳號／換網路；簽章提示是否清楚揭露 spender、額度、deadline、合約位址；拒絕簽章後系統狀態；無限額 approve 的產品決策與警告；授權可撤銷的說明與流程（產品層）。**不寫釣魚攻擊操作步驟。** |
| **來源** | EIP-20；MetaMask Signature phishing；ethereum.org ERC-20 說明；OWASP SCS（Frontends／Signing） |

#### 4. 智慧合約風險類別（高層地圖）

| 欄位 | 內容 |
|------|------|
| **是什麼** | 常見缺陷類型包括：重入（外部呼叫交還控制流）、存取控制錯誤、業務邏輯錯、預言機／價格操縱、未檢查外部呼叫、算術問題、proxy／升級問題等（見 OWASP SC Top 10 2026 分類）。 |
| **為何重要** | QA 需知道**缺陷如何在需求／狀態機上顯現**，才能設計負向案例與 invariant，而非只測 happy path。 |
| **常見錯覺** | 「靜態分析綠燈＝無漏洞」；「只測自己的合約、忽略外部 token／組合性」。 |
| **QA 要驗證什麼** | 權限：非授權呼叫應 revert；狀態機：非法轉換不可達；外部呼叫後狀態是否符合 Checks-Effects-Interactions 意圖；與非標準 ERC-20（缺 return、fee-on-transfer 等）整合時行為。**驗證屬性，不重現 exploit。** |
| **來源** | OWASP Top 10 2026；Solidity Security（reentrancy、CEI）；ethereum.org Security；OWASP SCS Integrations |

#### 5. 代幣標準（ERC-20／721／1155）合規與整合

| 欄位 | 內容 |
|------|------|
| **是什麼** | 標準定義介面與事件語意，使錢包與協議可互操作；實作常偏離標準。 |
| **為何重要** | 合規偏差會導致整合方 revert、靜默失敗或資金卡住。 |
| **常見錯覺** | 「名字叫 ERC-20 就一定完全符合」；「只測 transfer 成功即可」。 |
| **QA 要驗證什麼** | 介面回傳值、事件、`approve`／allowance 語意、ERC-721 `safeTransferFrom`／接收回呼、授權清除；整合清單式檢查（官方 token integration checklist／`slither-check-erc` 等工具**作為手段**，非本包教戰）。 |
| **來源** | EIP-20／721；ethereum.org token 文件與 token integration checklist；OWASP SCSTG-TEST-0012（搜尋可見） |

#### 6. 橋、預言機、L2（跨系統假設）

| 欄位 | 內容 |
|------|------|
| **是什麼** | 預言機把鏈下資料帶上鏈；橋與 L2 涉及跨域訊息、延遲、sequencer／最終性假設。 |
| **為何重要** | 單點價格或錯誤訊息驗證可導致錯誤清算／錯誤鑄造；QA 常漏測「過期價格」「重放」「對端失敗」。 |
| **常見錯覺** | 「讀 DEX spot 當唯一價格就夠」；「L2 與 L1 行為完全相同」。 |
| **QA 要驗證什麼** | 價格來源策略（如 TWAP vs spot—概念）、staleness、失敗／暫停時協議行為；跨鏈訊息的重放保護與錯誤路徑（依專案文件）。深度依職缺域再定。 |
| **來源** | ethereum.org Security（oracle）；OWASP SCS（Oracles & Pricing；Bridges & cross-chain） |

#### 7. QA 方法地圖與 Audit 邊界

| 欄位 | 內容 |
|------|------|
| **是什麼** | 分層：單元 → 整合／fork → 靜態分析 → fuzz／invariant（property）→ local／testnet 手動或 E2E；獨立 audit 與 bug bounty 是額外審查，不是測試的替代品。 |
| **為何重要** | 單測無法證明所有輸入正確；ethereum.org 明言測試不能保證 functional correctness；audit「不會抓到所有 bug」。 |
| **常見錯覺** | 「有 audit 報告＝QA 可省略」；「覆蓋率 100%＝安全」；「QA = 審計員」。 |
| **QA 要驗證／推動什麼** | 關鍵 invariant 是否被寫下並自動化；負向測試是否存在；CI 是否跑靜態分析；fork／testnet 是否覆蓋真實整合；與安全團隊的交接清單（已知假設、威脅模型摘要）。**Senior QA 價值：把風險變成可回歸的驗收條件與品質門檻。** |
| **來源** | ethereum.org Testing（unit／integration／property／formal ver／audits）；Foundry invariant guide；Diligence fuzzing（概念）；ethereum.org checklist |

---

### 建議學習順序（1–2 週入門，偏 QA，非開發者深造）

**原則**：先建立心智模型與詞彙 → 再對風險地圖 → 再對測試手段 → 最後用驗收題自測。每天約 1–1.5 小時可完成。

| 日 | 主題 | 必讀（一手） | 產出（給自己） |
|----|------|--------------|----------------|
| D1 | 為何 Web3 難測 | ethereum.org Testing（全文結構掃讀） | 用自己的話寫 5 點 Web2 vs Web3 |
| D2 | 安全總覽與權限 | ethereum.org Security §Access control + §Test；Solidity Security 開頭與 Reentrancy／CEI（**只讀概念，不實作攻擊**） | 列出「權限／狀態機」各 3 個負向驗收句 |
| D3 | 風險地圖 | OWASP SC Top 10 2026 條目名稱 + OWASP SCS Checklist 表格 | 做成一頁「風險→QA 證據」對照（無 PoC） |
| D4 | 代幣與授權 | EIP-20（approve／allowance 段）+ ethereum.org ERC-20；MetaMask Signature phishing | 錢包／approve 測試清單草稿（連線、簽章、額度、拒絕、換鏈） |
| D5 | 測試手段地圖 | ethereum.org Testing（unit／integration／property／testnet）；Foundry Invariant 頁「Common invariants」表 | 畫測試分層圖 + 各層「QA 可問的問題」 |
| D6 | 預言機／橋／MEV UX（高層） | ethereum.org Security oracle 段；MEV 頁「Effects of MEV」；SCS Bridges／Frontend | 依目標域選 3 個「使用者可感知缺陷」案例描述 |
| D7 | 角色邊界與履歷話術 | ethereum.org Testing vs audits；自複習本包對照表 | 30 秒口條：QA vs Audit；準備面試 3 問（見下） |
| D8–14（可選加深度） | 依未確認範圍擇一：DeFi 狀態機／NFT 授權／純合約 CI | Trail of Bits guide 入口；OpenZeppelin 模式；目標協議文件 | 一份「專案 QA kickoff checklist」 |

**面試／自測驗收題（完成即達停止條件）**

1. 為什麼說「測試通過」仍不能宣稱合約正確？形式化驗證與 audit 各補什麼？  
2. 舉例三個 Web3 特有、必須在發布前堵住的品質風險（含至少一個簽章／approve UX）。  
3. 若只有兩週，你會如何安排單元、fork、靜態分析、testnet 的優先序？為什麼？  
4. QA 與外部 audit 的交接物應包含什麼？（假設、invariant、已知限制、測試缺口）  
5. 對 ERC-20 `approve`，產品／QA 應堅持哪些使用者可見的安全預設？（對照 EIP-20 note，不談攻擊細節）

---

### 建議一手來源清單（精選 10，給使用者收藏）

1. https://ethereum.org/developers/docs/smart-contracts/testing/  
2. https://ethereum.org/developers/docs/smart-contracts/security/  
3. https://ethereum.org/developers/tutorials/secure-development-workflow/  
4. https://docs.soliditylang.org/en/latest/security-considerations.html  
5. https://owasp.org/www-project-smart-contract-top-10/  
6. https://scs.owasp.org/checklists/  
7. https://eips.ethereum.org/EIPS/eip-20  
8. https://eips.ethereum.org/EIPS/eip-721  
9. https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/signature-phishing/  
10. https://ethereum.org/developers/docs/mev/  
11. https://www.getfoundry.sh/guides/invariant-testing  
12. https://diligence.security/fuzzing/  

（可加：https://trailofbits.com/guides/building-secure-smart-contracts/ 、OpenZeppelin Contracts 文件）

---

## 未確認事項／需使用者指定的範圍

| ID | 項目 | 現況 | 影響 |
|----|------|------|------|
| U1 | 職缺主軸偏 **DeFi／NFT／Infra／純合約／全端 dApp**？ | **Unknown**（使用者未指定） | 決定第 2 週加深模組與面試故事 |
| U2 | 目標鏈：以太坊 L1 only，或含特定 L2／非 EVM？ | **Unknown** | Finality、橋、工具鏈差異 |
| U3 | 角色期待：偏 **產品／E2E QA**、**協議測試工程**，或 **安全測試協作**？ | **Unknown**（履歷向 Senior QA／PQE） | Audit 邊界深淺、是否碰 Foundry 實作 |
| U4 | 是否已有 Solidity／Hardhat／Foundry 基礎？ | **Unknown** | 學習節奏；本包假設「可讀文件、暫不強制寫合約」 |
| U5 | OWASP SC Top 10 **2026** 完整方法論與排序依據 | 本環境對 owasp.org 該頁 WebFetch **409**；條目來自搜尋摘要與 SCS 站 | 使用者應直接打開官網核對最新條文 |
| U6 | 具體 gas／確認時間／歷史損失統計 | **不寫死**；避免無來源數字 | 面試用「指向官頁／專案跑測」而非背數字 |
| U7 | ERC-1155 是否納入第一波 | 任務有提到；本包以 20／721 為主，1155 標為延伸 | 若做遊戲／多 token 再補 EIP-1155 |

---

## 停止條件建議

**結案條件（本主題）**

- [ ] 讀完並能複述：Testing + Security（ethereum.org）核心論點  
- [ ] 產出：Web2 vs Web3 對照表（自用版）+ 一頁風險→QA 證據圖  
- [ ] 產出：錢包／approve 測試清單草稿  
- [ ] 口頭通過上方 **5 題驗收**（可自行錄音或與 mock interviewer）  

**達標即停止本學習包**；下列另開主題，勿無限延伸：

- Foundry／Hardhat 實作工作坊  
- 特定協議（Uniswap／Aave 等）深入  
- 審計員向 CTF／攻防練習（**非本 QA 入門範圍**；且執行層需嚴格遵守安全政策）  
- 履歷／面試故事打磨（可另開「Web3 QA 履歷敘事」包）

---

