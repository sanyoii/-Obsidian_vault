---
source: "https://github.com/mohankumarelec/airgapped-qr-code-transfer"
author: "mohankumarelec (Mohankumar Ramachandran / mohanram，Red Hat，Bengaluru)"
stars: "364"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "qr-code"
  - "air-gap"
  - "offline-first"
  - "vue"
  - "supply-chain-audit"
---

# airgapped-qr-code-transfer — 用 QR Code 螢幕對鏡頭離線傳檔的純前端工具

> 來源：https://github.com/mohankumarelec/airgapped-qr-code-transfer
> 授權：MIT｜⭐ 364｜🍴 49｜建於 2023-07-04，最後推送 2025-02-05
> 規模：**5 檔 / 5,960 tokens / 25,776 chars**（2026-08-01 repomix 實測），實際程式碼只有 3 個 HTML 檔共 18,176 bytes
> ⚠️ **核心結論：資料面確實不出裝置，但這個 App 本身開不起來就得先上網——「air-gapped」只成立一半**（詳見「供應鏈稽核」§⑤）

## 一句話說明

寄件端瀏覽器把檔案 gzip 壓縮、切成 250 bytes 一塊、逐塊畫成 QR Code 顯示在螢幕上；收件端瀏覽器開相機對著螢幕連續掃描，收齊所有塊後重組並解壓，直接下載成檔案。整個過程沒有伺服器、沒有配對、沒有藍牙／USB，只靠「螢幕發光、鏡頭接收」這條單向光學通道，適合用在真正物理隔離（air-gapped）的機器之間搬小檔案。全部實作只有 `generator.html` 與 `scanner.html` 兩個檔，各約 120～165 行，是概念驗證等級的極簡實作。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 364 |
| Forks | 49 |
| 主要語言 | HTML（GitHub 統計 18,176 bytes，全部語言僅此一項） |
| 授權 | MIT License（Copyright (c) 2024 Mohankumar Ramachandran） |
| 建立時間 | 2023-07-04 |
| 最後推送 | 2025-02-05（距今約 18 個月，且該次只改 readme） |
| Open Issues | 3（另有 2 個 open PR） |
| Open PRs | 2（#3 PowerShell 版產生器、#6 QR 參數設定；皆未合併） |
| 最新 Release | 1.0.0（2024-07-22） |
| Topics | airgap, airgap-download, airgapped, offline-first, qrcode, qrcode-generator, qrcode-scanner |
| 首頁 | https://airgapped-qr-code-transfer.mohanram.co.in（實測 HTTP 200，Cloudflare 代管） |
| 是否 Archived | 否 |
| 貢獻者 | 僅 mohankumarelec 一人，10 個 commit |

作者背景：GitHub 帳號建於 2017-04，53 個公開 repo，12 followers，bio 自述任職 Red Hat、方向為 GenAI／全端／資料工程／資安，個人站 mohanram.dev。**是有正常長期活動軌跡的真實帳號，非為此專案新建的小號。**

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 5 |
| 總 Tokens | 5,960 |
| 總字元數 | 25,776 |
| 壓縮模式 | 無（diskUsage 僅 28 KB，不需 --compress） |
| Repomix 安全掃描 | ✔ 未偵測到可疑檔案 |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| index.html | 1,891 | 31.7% |
| scanner.html | 1,285 | 21.6% |
| readme.md | 1,117 | 18.7% |
| generator.html | 1,025 | 17.2% |
| LICENSE | 226 | 3.8% |

注意 `index.html` 只是 readme 的 HTML 版落地頁，不含任何功能程式碼。**真正的實作只有 generator.html（4,547 chars）與 scanner.html（6,241 chars）。**

## 核心功能

- **寄件端（generator.html）**：`pako.gzip(level: 9)` 壓縮整個檔案 → 依 `chunk_size = 250` bytes 切塊 → 每塊做 `String.fromCharCode` → `TextEncoder` → `btoa` 三段編碼 → 前綴序號後產生 QR（`typeNumber: 40`，糾錯等級 M）→ 每 50 ms 換一張。第一張 QR 是 metadata（`{name, chunks}`）。
- **收件端（scanner.html）**：`getUserMedia({video:{facingMode:"environment"}})` 取相機 → 每 10 ms 把 video 畫進 canvas → `zbarWasm.scanImageData()` 解碼 → 依序號存進 `decoded_chunks` 物件 → 收齊後串接、`pako.inflate` 解壓 → `Blob` + `URL.createObjectURL` 觸發下載。
- **序號去重**：接收端以序號當 key 寫入物件，同一塊重複掃到會覆蓋而非重複累加，所以「盯著同一張 QR 看」不會壞掉。
- **中止機制**：兩端都有 Stop 按鈕，會清空狀態重來。

**功能就這些。沒有的東西同樣重要**：沒有錯誤更正碼、沒有重傳協商、沒有 ACK 回傳通道、沒有檔案雜湊校驗、沒有加密、沒有傳輸速率調整 UI、沒有分段續傳。

## 技術架構

```
   寄件端（螢幕）                              收件端（相機）
 ┌──────────────────┐                    ┌──────────────────────┐
 │ generator.html   │                    │ scanner.html         │
 │  <input file>    │                    │  getUserMedia()      │
 │       ↓          │                    │       ↓              │
 │  pako.gzip(L9)   │                    │  <video> → canvas    │
 │       ↓          │                    │       ↓ 每 10ms      │
 │  切 250B/塊      │                    │  zbar-wasm 掃描      │
 │       ↓          │   ░░ 光學單向 ░░   │       ↓              │
 │  fromCharCode    │  ══════════════▶   │  atob → TextDecoder  │
 │  TextEncoder     │   螢幕 → 鏡頭      │       ↓              │
 │  btoa            │   （無回傳通道）   │  依序號填入物件      │
 │       ↓          │                    │       ↓ 收齊         │
 │  QRCode.makeCode │                    │  pako.inflate        │
 │  每 50ms 換一張  │                    │       ↓              │
 │  單次跑完就停 ✗  │                    │  Blob → 下載         │
 └──────────────────┘                    └──────────────────────┘
        │                                          │
        └──── 兩端都需先從 CDN 載 4 支腳本 ───────┘
              unpkg / cdnjs / jsdelivr / cdn.tailwindcss.com
```

| 層次 | 技術 |
|------|------|
| UI 框架 | Vue 3（`vue.global.js`，非建置版，直接用 `createApp` + `ref`） |
| 樣式 | Tailwind Play CDN（`cdn.tailwindcss.com`，官方明示「不供正式環境使用」） |
| 壓縮 | pako 2.0.3（zlib 的 JS 移植） |
| QR 產生 | qrcode.js 1.0.0（davidshimjs，npm 上僅此一版，**2015-06-18 發布後從未更新**） |
| QR 掃描 | @undecaf/zbar-wasm（ZBar 的 WASM 編譯版）**未鎖版，寫 `@latest`** |
| 建置流程 | 無。無 package.json、無 node_modules、無 bundler |

## 三個實測發現的設計缺陷

**① 單次播放、無重傳 → 掉一塊就死鎖。** `generator.html:81` 的迴圈跑完 `total_chunks` 就呼叫 `stop_transfer()`；而 `scanner.html:91` 的接收迴圈條件是「已收塊數 ≠ 總塊數就繼續等」。只要中途漏掉任何一塊（模糊、反光、換頁太快），寄件端已經播完，收件端會**無限空轉等一張永遠不會再出現的 QR**。這不是理論推測——issue #2 的 TCB13 原話：「I also miss QR codes sometimes, it would be better to have some process at the end that would check what codes are missing and re-transmit those.」

> 對照組：同賽道的 [[Github/repos/decimen-optical-transfer — 噴泉碼動畫 QR 螢幕對相機傳檔 PoC|decimen-optical-transfer]] 用 **LT 噴泉碼**正面解掉這題——每幀是若干塊的 XOR，收到任意約 K×1.15 幀即可還原，掉幀只損失時間不損失正確性。這正是本專案缺的那一層。

**② 編碼鏈有約 2 倍無謂膨脹。** `encode_data()` 把 gzip 後的原始 bytes（值域 0–255）先 `String.fromCharCode` 轉成碼點，再用 `TextEncoder` 做 UTF-8 編碼——**碼點 ≥128 會膨脹成 2 bytes**，gzip 輸出的位元組分布接近均勻，等於平均約 1.5 倍膨脹，之後 `btoa` 再乘 1.33 倍。250 bytes 的原始塊實際要塞進約 500 個字元。直接對 `Uint8Array` 做 base64（或改用 QR 的 byte mode）就能省掉這 1.5 倍。

**③ 沒有完整性校驗。** 重組後直接 `pako.inflate`。若某塊掃錯（QR 糾錯等級只設 M）而恰好還能解壓，會靜默產出壞檔。沒有 CRC、沒有雜湊、沒有檔案大小回檢。

**吞吐量實測推算**：250 bytes/塊 ÷ 50 ms 是理論上限 5 KB/s，但受限於接收端 10 ms 輪詢 + zbar 解碼耗時 + 相機曝光，實際大約落在 1～2 KB/s。**傳一個 1 MB 的檔約需 10～20 分鐘，且期間不能掉任何一塊。** 這決定了它只適合傳金鑰、設定檔、憑證這類 KB 級小檔。

## 供應鏈稽核

### ① 作者真實性 — 通過

`mohankumarelec` 帳號建於 2017-04-22，53 個公開 repo，bio 註明任職 Red Hat、個人網域 mohanram.dev（與代管本專案的 mohanram.co.in 同名）。commit 作者名在 `mohankumarelec` / `Mohankumar Ramachandran` / `mohanram` 間切換但一致指向同一人。**無小號特徵（帳號與 repo 同日建立、零歷史、突發高星）。證據等級：Confirmed。**

### ② 安裝腳本 — 無，零風險

沒有 `install.sh`、沒有 `curl | bash`、沒有 postinstall hook、沒有 package.json。安裝方式就是把 3 個 HTML 檔用瀏覽器打開。**這是本專案最乾淨的一面。證據等級：Confirmed（repomix 全檔清單只有 5 檔）。**

### ③ 相依套件實查存在性 — 全部存在，但版本健康度有問題

本專案**沒有 npm 依賴宣告**（無 package.json），實際依賴是 4 個硬編碼的 CDN URL。逐一打 npm registry 實查結果：

| 套件 | 程式碼指定 | npm 現況 | 判定 |
|------|-----------|---------|------|
| `vue` | `@3`（浮動） | latest 3.5.40（2026-07-16） | 存在、未 deprecated；但 `@3` 是浮動標籤 |
| `pako` | `2.0.3`（cdnjs） | 該版存在（2021-01-09），latest 已是 3.0.1 | 存在、未 deprecated、**落後兩個大版本** |
| `qrcodejs` | `1.0.0`（cdnjs） | 該版存在，**npm 上總共只有 1 個版本，2015-06-18 發布後 11 年零更新** | 存在、未 deprecated，但**實質廢棄** |
| `@undecaf/zbar-wasm` | `@latest`（浮動） | latest 0.11.0（2024-05-22），16 個版本 | 存在、未 deprecated；**但鎖版失敗，見下** |
| `tailwindcss` | `cdn.tailwindcss.com` | latest 4.3.3 | 存在；但此 CDN 為 Play CDN，官方明示非正式環境用途 |

**無 quarantined、無 yanked、無 typosquatting、無不存在的套件。** 這點與先前稽核過的 LongCat（requirements 兩顆地雷）截然不同。

⚠️ **但有一個真實風險：`@undecaf/zbar-wasm@latest` 是浮動版本。** 這支 WASM 模組會經手你傳輸的每一個 byte（負責解碼 QR 內容），卻沒鎖版、沒有 SRI（`integrity=`）雜湊。jsDelivr 上 `@latest` 現在解析到 0.11.0，但上游任何一次發版都會**在使用者毫無察覺的情況下換掉這支解碼器**。所有 4 支腳本標籤都沒有 `integrity` 與 `crossorigin` 屬性（實測 grep：0 個 `integrity=`）。

### ④ 安裝改動面 — 零

不寫任何檔案到系統、不改 PATH、不裝服務、不要求權限。唯一的執行期權限請求是 `getUserMedia`（相機），為功能所必需且由瀏覽器彈窗把關。輸出只有一個使用者主動觸發的檔案下載。

### ⑤ 對外網路呼叫面 — **關鍵發現：資料面乾淨，載入面不乾淨**

**資料面（Confirmed，證據充分）**：對 3 個 HTML 檔全文 grep `fetch(` / `XMLHttpRequest` / `WebSocket` / `sendBeacon` / `EventSource` / `RTCPeerConnection` / `new Worker` / `import(`，**結果全部為 0 個匹配**。使用者選的檔案只經過 `pako.gzip` → `btoa` → canvas 繪圖 → 相機讀取 → `pako.inflate` → `Blob` 下載，**全程留在瀏覽器記憶體內，沒有任何一行程式碼把它送出去**。無分析工具、無遙測、無錯誤回報服務（grep google-analytics/gtag/plausible/sentry/posthog/mixpanel 等 12 種：0 匹配）。

**額外查證**：把線上版 3 個頁面抓下來與 repo 原始檔逐 byte `diff`，**三個檔案全部 IDENTICAL**。代管版沒有偷加追蹤碼。這是值得記下的正面結果。

**載入面（Confirmed，這才是問題）**：`generator.html` 與 `scanner.html` 各自從 **4 個第三方網域**載入腳本：

```
cdn.tailwindcss.com                          （兩頁都有）
unpkg.com/vue@3/dist/vue.global.js           （兩頁都有）
cdnjs.cloudflare.com/.../qrcode.min.js       （generator）
cdnjs.cloudflare.com/.../pako.min.js         （兩頁都有）
cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@latest（scanner）
```

**在真正斷網的機器上，這兩個頁面連跑都跑不起來**——Vue 載不到就不會 mount，畫面停在未渲染的模板。更糟的是 `zbar-wasm` 的 `dist/index.js` 內部使用 `WebAssembly.instantiateStreaming` + `fetch` + `new URL()` 在**執行期再抓一次 `.wasm` 二進位檔**（實測 grep 該檔：5 個 `fetch`、2 個 `instantiateStreaming`、1 個 `.wasm`）。也就是說即使 JS 被瀏覽器快取了，掃描端仍需要第二次網路請求。

這與使用者回報完全吻合。issue #2 的 iuvi7：「用 PC 網路攝影機在離線模式下可以直接運作……但在手機上開 scanner.html 就抓不到相機，連權限都不問。只有連上網路的版本在手機上才真的能用。」Looper21 進一步：「我檢查過程式碼，這專案不知為何有防護導致無法離線運作，儘管描述寫著『enabling offline file transfer without network connectivity』。」（Looper21 對根因的描述不精確——不是什麼「防護」，就是 CDN 依賴 + WASM 執行期抓取；但他觀察到的現象是對的。）

「PC 上離線可以、手機上離線不行」的差異可由瀏覽器快取解釋：PC 先前連線時已快取那 4 支腳本與 wasm，手機是全新環境故全數失敗。

**一個補強證據**：repo 的第一個 commit（2023-07-04）曾包含 `localhost-2023-07-03-142430.cer/.csr/.pkey` 與 `.vscode/settings.json`（Live Server HTTPS 設定）。作者自己開發時必須架 HTTPS 才能用相機——因為 `getUserMedia` 需要 secure context，`file://` 在 Chrome 下不算。**所以 readme 教的「直接 open scanner.html」對掃描端在 Chrome 上本來就行不通**（Firefox 對 `file://` 較寬鬆，屬 Inferred）。

**結論：「air-gapped」對『你的資料』成立，對『這個 App』不成立。** 要在真實隔離環境使用，必須自己把 4 支腳本與 `.wasm` 下載下來改成本地相對路徑，並用本機 HTTPS（或 localhost）伺服器提供頁面。這是可行的改造，但 repo 沒有提供，README 也沒有說明。

### ⑥ 額外發現：git 歷史中留有私鑰（低危但屬實）

`Removed Certificates`（2024-07-22）刪掉的 localhost 開發憑證私鑰 `.pkey` **至今仍可從 git 歷史直接下載**——實測對初始 commit 發請求回 **HTTP 200、1,679 bytes、開頭為 `-----BEGIN RSA PRIVATE KEY-----`**。同時被刪的 `.vscode/settings.json` 內含明文 `"passphrase": "password"`，以及作者本機的絕對路徑（連帶洩漏其作業系統帳號名）。

> 具體的 commit SHA 與帳號名此處刻意不記——那是第三方個資，本檔在公開 vault 內，不轉載可直接指向他人憑證的座標。要複驗照上述描述自行查該 repo 的 git 歷史即可。

**嚴重性評估：低。** openssl 實測憑證 subject/issuer 皆為 `CN=localhost`（自簽，有效期至 2033-07-03），只對「曾經手動信任過這張憑證的機器」有意義，無法用於攻擊任何真實網域。列出來是因為屬於客觀事實與衛生問題，不是為了誇大風險。

## 社群口碑

依 repo-intel 規則，stars（364）未達 1,000 門檻，**Phase 4 社群口碑（Exa／Reddit／X）與 Phase 4.5（YouTube 教學訊號）本次跳過**——小型專案在社群平台通常搜不到有統計意義的討論，勉強搜尋只會得到雜訊。

替代訊號改用 repo 自身的 issue/PR 實質內容（見上文 issue #2），這反而是本專案品質訊號最集中的地方：3 個 open issue 中有 1 個是實質 bug 報告且獲得 2 位不同使用者附和，2 個 open PR（PowerShell 產生器、QR 參數設定）自 2025-12／2026-01 提出後**至今未獲作者回應**。結合最後一次 commit 是 2025-02 且只改 readme，**專案處於實質停止維護狀態（Confirmed）**。

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 1 人（mohankumarelec，10 commits） | 單人專案，無巴士因子 |
| 近 4 週 commit | 0 | 停滯 |
| 最後程式碼變更 | 2024-07-22（`index.html`）；2025-02 那次只改 readme | 程式碼已 2 年未動 |
| Release 頻率 | 僅 1.0.0 一個（2024-07-22） | 無版本演進 |
| Issue / PR 回應 | 2 個 PR 掛 7～8 個月無回應 | 作者已不維護 |
| Fork/Star 比 | 49/364 ≈ 13.5% | 偏高，暗示不少人選擇自己改而非等上游 |

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯。vault 同步走 git（`sanyoii/-Obsidian_vault`），已是成熟方案；用 QR 光學通道搬筆記在頻寬上完全不成比例（1～2 KB/s vs 一次 git push）。 |
| **Claude Code** | 無關聯。不是 skill／MCP／plugin，沒有可整合面。 |
| **Automation** | 無關聯。純手動、需人眼對準與人手持相機的互動流程，無法排程或腳本化。 |
| **跨機傳檔需求** | **依 R13 誠實評估：目前沒有真需求。** 現有環境的跨機情境是 D:\Claude 主 repo ↔ GitHub ↔ 另一台機器，全部走 git / robocopy / portable-bundle（`docs/portable/`），都有網路。本工具的適用前提是「兩台機器物理隔離且必須用光學通道」——這個前提在使用者環境中不存在。 |

**唯一有想像空間的場景**：未來若 Web3／CEX 託管方向的工作真的接觸到冷錢包簽名機（那是貨真價實的 air-gapped 場景，助記詞／PSBT 走 QR 是業界標準做法），這個賽道的知識會有用。但屆時該用的是 BlueWallet／Sparrow／SeedSigner 這類經過審計的成熟實作，**不會是一個 165 行、無 ECC、無重傳、無校驗、停止維護的 PoC**。

## 安裝建議

❌ **不適合安裝** — 三個獨立理由，任一條都足以否決：

1. **核心宣稱不成立**：主打 air-gapped，實際上斷網開不起來（需自行下載 4 支 CDN 腳本 + wasm 並改路徑，README 未提供此步驟）。買點與實況不符。
2. **有已知會導致傳輸失敗的設計缺陷**：單次播放無重傳，掉一塊即死鎖，使用者已回報且作者未修。同賽道的 decimen-optical-transfer 用噴泉碼正確解決了這題。
3. **無真實需求**：使用者環境的跨機傳檔全部有網路可用，R13 判準「加複雜度換小改善 → 不做」直接適用；此處連「小改善」都談不上。

**沒有升級／放棄觸發條件需要追蹤**——這是 ❌ 判定而非 ⏳ 觀望，不進復查佇列。若未來真的出現冷錢包簽名機這類 air-gapped 需求，正確做法是重新評估該領域的成熟工具（SeedSigner／Sparrow／Keystone），而不是回頭撿這個 repo。

**值得留下的不是工具而是三件知識**：①QR 光學單向通道的實際吞吐天花板約 1～2 KB/s，決定了它只能傳 KB 級秘密；②單向通道沒有 ACK，重傳問題必須靠噴泉碼／FEC 在編碼層解決，不能靠協商；③`getUserMedia` 需要 secure context，`file://` 在 Chrome 下拿不到相機——任何「離線單頁掃碼」的設計都會撞到這道牆。

## 相關連結

- [[Github/repos/decimen-optical-transfer — 噴泉碼動畫 QR 螢幕對相機傳檔 PoC|decimen-optical-transfer]] — 同賽道、更晚（2026-07）、用 LT 噴泉碼正面解決本專案的掉塊死鎖問題；兩篇對照可看出光學傳檔的關鍵難點在哪
- [[Github/repos/Infinite_Storage_Glitch — KKarmugil 的 YouTube 當雲端硬碟 Python 重寫版|Infinite_Storage_Glitch (KKarmugil)]] — 同批分析，同樣是「把資料編碼成視覺媒介」的思路（QR vs 影片畫面）
- 供應鏈稽核方法論：memory `feedback_supply_chain_audit_repo_intel`（五項固定檢查；本次「線上版與 repo 逐 byte diff」可作為第 ⑤ 項的補充手法）
