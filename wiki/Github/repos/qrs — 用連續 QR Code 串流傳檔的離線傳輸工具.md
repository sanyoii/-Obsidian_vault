---
source: "https://github.com/qifi-dev/qrs"
author: "qifi-dev (QiFi — LittleSound / Rizumu Ayaka、nekomeowww、antfu)"
stars: "1.6K"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "qrcode"
  - "file-transfer"
  - "fountain-code"
  - "air-gap"
  - "web-frontend"
---

## qrs — 用連續 QR Code 串流傳檔的離線傳輸工具

> **qifi-dev/qrs** | ⭐ 1,625 | 🍴 104 | 📝 MIT
> "Stream data through multiple series of QR codes"

---

## 一句話說明

qrs 把一個檔案切成小塊、用 **Luby Transform 噴泉碼（Fountain Code）** 編碼成無限量的資料塊，再以每秒 20 張的速度在螢幕上連續播放 QR Code；接收端用另一台裝置的相機持續掃描，湊夠塊數就能還原原檔——全程不需要網路、藍牙、配對或帳號，只需要「一個螢幕 + 一個鏡頭」。它解決的是**兩台裝置之間有視線、但沒有（或不該有）任何網路連線**的傳檔問題，目標使用者是氣隙（air-gap）環境操作者、跨防火牆／跨內外網搬資料的人，以及對噴泉碼有興趣的開發者。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,625 |
| Forks | 104 |
| 主要語言 | TypeScript（50.6 KB）／ Vue（39.9 KB） |
| 授權 | MIT |
| 建立時間 | 2024-10-01 |
| 最後推送 | 2026-03-11（**但僅為 LICENSE 年份更新；最後一次實質程式碼變更是 2025-05-08**） |
| Open Issues | 6 |
| Open PRs | 0 |
| 最新 Release | **無 GitHub Release**（npm 上為 v0.2.0，2025-02-03） |
| Topics | `qrcode`、`transfer-files` |
| 首頁 | https://qrss.netlify.app/ |
| 是否 Archived | 否（但實質停滯，見「社群健康度」） |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 75 |
| 總 Tokens | 60,226 |
| 總字元數 | 164,611 |
| 壓縮模式 | 未使用（repo 僅 880 KB） |
| Repomix 內建安全掃描 | ✔ No suspicious files detected |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `public/logo.svg` | 12,431 | 20.6% |
| `packages/generate/test/__snapshots__/ansi-qrcode.txt` | 8,679 | 14.4% |
| `packages/generate/test/__snapshots__/svg-qrcode.svg` | 5,318 | 8.8% |
| `app/components/Scan.vue` | 4,041 | 6.7% |
| `packages/luby-transform/README.md` | 2,444 | 4.1% |

> 前三名都是靜態資產與測試快照，**真正的核心邏輯非常小**——`luby-transform` 整個編解碼器不到 500 行。這是個小而聚焦的專案，不是大型框架。

---

## 核心功能

- **一發一收的網頁雙頁式介面**：`/`（Send，播放 QR）與 `/scan`（Receive，開相機掃描）。純瀏覽器執行，發送端不需要相機權限、接收端不需要選檔。
- **Luby Transform 噴泉碼容錯**：這是整個專案的技術核心。發送端產生**無限**不重複的編碼塊（`fountain()` 是個 `while(true)` generator），接收端不需要「收到第幾號」，只要湊夠數量就能解出來。因此**完全不需要回傳通道（feedback channel）**，也不需要重傳協商。
- **自動壓縮 + 完整性校驗**：編碼前先用 `pako` deflate 壓縮；用 CRC32 與分塊數 k 做 XOR 產生 checksum，解碼後比對，不符就拋 `Checksum mismatch`。
- **檔名與 MIME 型別隨檔傳輸**：`appendFileHeaderMetaToBuffer()` 把 `{filename, contentType}` 以 JSON 塞進 buffer 前綴，接收端還原後可直接產生正確副檔名的下載連結。
- **可調參數**：Slice Size（1–2000 bytes，預設 1000）、Ideal FPS（1–60 hz，預設 20）、Scanner URL 前綴開關。
- **Web Worker 解碼**：解碼器跑在獨立 worker（透過 `birpc` 做 RPC），避免阻塞相機掃描主執行緒。
- **PWA 離線可用**：`@vite-pwa/nuxt` 預快取，安裝成 PWA 後可離線開啟。
- **CLI 版本（`npx qifi ./file.txt`）**：直接在終端機用 ANSI／Unicode 字元畫 QR Code 播放，適合只有 SSH 文字介面的伺服器往外送檔。
- **三個可獨立使用的 npm 套件**：`luby-transform`（純噴泉碼，與 QR 無關）、`@qifi/generate`（QR 串流產生器）、`qifi`（CLI）。

---

## 技術架構

```
┌──────────────── 發送端（瀏覽器 / 終端機）────────────────┐
│ File → appendFileHeaderMetaToBuffer（塞入檔名/MIME）      │
│      → pako.deflate（壓縮）                              │
│      → sliceData（切成 k 塊，每塊 sliceSize bytes）       │
│      → LtEncoder.fountain()  ← 無限 generator            │
│          ├ getRandomDegree()  Ideal Soliton Distribution │
│          ├ getRandomIndices() 隨機挑 degree 個原始塊       │
│          └ XOR 合併成一個 EncodedBlock                    │
│      → blockToBinary（header: degree+indices+k+bytes+crc）│
│      → js-base64 編碼 → uqr.renderSVG() → <div v-html>   │
│      每 1000/fps ms 換一張（useIntervalFn）               │
└──────────────────────────────────────────────────────────┘
                          │
                    📷 光學通道（螢幕 → 鏡頭）
                       ※ 這是唯一的資料路徑
                          │
┌──────────────── 接收端（瀏覽器）─────────────────────────┐
│ qr-scanner（getUserMedia）→ scanFrame()                  │
│      → 去除 URL 前綴 → 用 Set 去重（cached）              │
│      → toUint8Array → binaryToBlock                      │
│      → birpc → Web Worker                                │
│          └ LtDecoder.addBlock() → propagateDecoded()     │
│              高斯消去式 XOR 遞迴傳播（degree 降階）        │
│      → decodedCount === k 時 getDecoded()                │
│      → pako.inflate → CRC32 驗證 → Blob → 下載            │
└──────────────────────────────────────────────────────────┘
```

| 層次 | 技術 |
|------|------|
| 框架 | Nuxt 4（`compatibilityVersion: 4`）、Vue 3、**`ssr: false`（純客戶端 SPA）** |
| 樣式 | UnoCSS + `@nuxtjs/color-mode` |
| 狀態 | Pinia、VueUse |
| QR 產生 | `uqr`（antfu／pi0 出品，純 TS，無 canvas 依賴） |
| QR 掃描 | `qr-scanner` + `jsqr-es6`（WASM／worker） |
| 編解碼核心 | 自研 `luby-transform`（唯一相依 `pako`） |
| Worker 通訊 | `birpc` |
| 部署 | Netlify 靜態託管（`netlify.toml`：SPA fallback 全導向 `index.html`） |
| CI | GitHub Actions：僅 `lint` + `typecheck` |

### 三個技術重點的實測答案

#### ① 用什麼糾錯／分片編碼？

**Luby Transform（LT）碼，採用 Ideal Soliton Distribution（理想孤子分布）**，位於 `packages/luby-transform/src/encoder.ts`：

```ts
// Use Ideal Soliton Distribution to select degree
probabilities[0] = 1 / k           // P(1) = 1/k
for (let d = 2; d <= k; d++)
  probabilities[d - 1] = 1 / (d * (d - 1))
```

編碼塊 = 隨機挑 `degree` 個原始分塊做 XOR。解碼端 `propagateDecoded()` 實作了三種降階路徑：已解出的塊直接 XOR 消去、用子集塊消去（`1x2x3 XOR 2x3 → 1`）、以及反向的超集傳播（`1x2 XOR 1x2x3 → 3`），並用 `encodedBlockKeyMap` / `encodedBlockSubkeyMap` / `encodedBlockIndexMap` 三張表做索引。

**這裡有個實質弱點**：Ideal Soliton Distribution 在理論上漂亮、在實務上表現差（它對 k 值的變異極度敏感，容易出現「差最後幾塊卻遲遲解不出來」）。標準做法是改用 **Robust Soliton Distribution**，而現代方案多半已改用 **RaptorQ**（RFC 6330）。專案自己的測試檔 `lt.test.ts` 也留了一行 `// TODO: target 180%`，代表作者知道現況離理想值有距離。

#### ② 單次吞吐與實際可傳檔案大小

先講**專案自己測出來的數字**（`packages/luby-transform/test/lt.test.ts`）：

```ts
expect(+(count / encoder.k * 100).toFixed(2),
  'Data rate should be less than 200%')
  .toBeLessThan(250)   // TODO: target 180%
```

也就是說：**要傳完一個檔案，實際播放的 QR 張數是理論最小值的 1.8～2.5 倍**。這是硬性的編碼開銷，寫死在他們自己的驗收條件裡。

據此推算預設情境（sliceSize=1000 bytes、fps=20）：

| 指標 | 數值 | 依據 |
|------|------|------|
| 每張 QR 承載 | 1000 bytes（+ `(degree+4)×4` bytes header） | `blockToBinary()` |
| base64 後字元數 | 約 1,380 字元 | ×4/3 膨脹 |
| 所需 QR 版本 | 約 version 28–30（約 129×129 模組） | QR byte mode 容量表 |
| **理論毛吞吐** | **約 19.5 KB/s** | 1000 B × 20 fps |
| **扣除噴泉碼開銷後淨吞吐** | **約 8–11 KB/s** | 毛吞吐 ÷ 1.8～2.5 |

實際可傳的檔案大小（以淨值 10 KB/s 估）：

| 檔案大小 | 預估耗時 | 可用性 |
|---------|---------|--------|
| 10 KB（文字、金鑰、設定檔） | 約 1–2 秒 | ✅ 很順 |
| 100 KB（一張壓過的圖） | 約 10–20 秒 | ✅ 可接受 |
| 1 MB（一張手機照片） | 約 1.7–3.5 分鐘 | ⚠️ 要一直舉著手機不動 |
| 10 MB | 約 17–35 分鐘 | ❌ 不實際 |
| 100 MB+ | 數小時 | ❌ 不可能 |

> 檔案會先 deflate 壓縮，所以純文字／JSON／原始碼類的實際速度會比上表快；已壓縮的檔案（JPG／MP4／ZIP）則完全吃不到這個好處。
>
> **實務甜蜜點是 1 MB 以下。** 這點有外部佐證——Issue #23 中，另一位獨立開發者 fidian（把 qrs 的方案移植進自己的 Be-Prepared PWA）實測後寫道：「我可以把手機裡幾 MB 的照片傳出來而不會睡著。它仍然不算快，但可以理解為什麼它快不起來。」

拉滿參數（sliceSize=2000、fps=60）理論上可到 120 KB/s，但 base64 後約 2,720 字元已逼近 QR byte mode 的規格上限（version 40 / ECC L = 2,953 bytes，177×177 模組），這種密度的 QR 手機相機在高速換頁下幾乎掃不動。**參數上限是規格上限，不是可用上限。**

#### ③ 接收端如何處理丟幀？

**答案是：不處理，也不需要處理——這正是選用噴泉碼的全部理由。**

- 接收端**不知道也不在乎**自己漏了第幾張。每張 QR 都是等價的、可互換的「一瓢水」，湊夠水量就能還原。
- 因此**沒有回傳通道、沒有 ACK、沒有重傳請求、沒有序號視窗**。發送端是純粹的單向廣播，`fountain()` 這個 generator 永遠不會結束，會一直播到使用者自己關掉為止。
- 唯一的去重機制是接收端一個 `cached: Set<string>`，把掃到過的完全相同字串丟掉（`if (cached.has(strData)) return`），避免相機在同一張 QR 上停留時重複計算。
- 進度回饋：UI 用一格一格的點陣顯示每個原始塊的狀態（已解出／被幾階的塊覆蓋中），並即時顯示「已收 X KB / 共 Y KB（Z%）」。
- 相機端 `maxScansPerSecond` 預設 30，高於發送端預設的 20 fps，設計上是讓接收端有餘裕。

**代價**：因為沒有回傳通道，發送端無從得知何時該停，也無法針對「就差那兩塊」做精準補發。當 LT 碼進入尾聲的長尾階段（Ideal Soliton 的典型弱點），使用者只能眼睜睜看著進度條卡在 95% 繼續等——這也是 fidian 在 Issue #23 提出改良的背景（該 issue 的實際訴求是**限制每個編碼區塊的索引數上限**：payload 為 Base64，每個索引 4 bytes＝5.333 字元，預設 slice 1000 時若某幀抽到 250 個索引就會讓資料量翻倍、大到編不進 QR）。

---

## 供應鏈稽核

> 這類「宣稱資料不離開瀏覽器」的工具，**宣稱本身不算證據**。以下五項逐項實查，正面結果同樣記錄。

### ① 作者／org 真實性 — ✅ 通過（高可信度）

| 項目 | 查核結果 |
|------|---------|
| org `qifi-dev` | GitHub ID 183571246，建立於 2024-10-02（比 repo 晚一天，屬正常的「先開 repo 再收攏成 org」），公開 repo 2 個，followers 22，未驗證網域（`is_verified: false`）——小型個人 org，非冒名企業 org |
| 貢獻者 | LittleSound（71，即 Rizumu Ayaka）、nekomeowww（34，Neko Ayaka）、antfu（13）、lawvs／rogepi／xavierskip 各 1 |
| **antfu = Anthony Fu** | Vue / Vite / Nuxt 核心團隊成員、VueUse 與 UnoCSS 作者。這是開源界高知名度的實名身分，不是可隨意冒用的帳號 |
| npm 維護者對帳 | `luby-transform`、`qifi`、`@qifi/generate` 三個套件的 maintainers 皆為 `nekomeowww, antfu, oikawa_rizumu`——**與 GitHub 貢獻者名單一致**，無第三方搶註或轉手跡象 |
| 相依套件的上游作者 | `uqr`（pi0, antfu）、`birpc`（antfu, oreanno）、`cac`（egoist, sxzz）、`ohash`（pi0）、`pako`（vitaly）、`js-base64`（dankogai）、`qr-scanner`／`jsqr-es6`（danimoh）——全是各自生態圈長期維護者 |
| 資金揭露 | `.github/FUNDING.yml` 僅 `github: LittleSound`，README 的贊助圖來自 `cdn.jsdelivr.net/gh/littlesound/sponsors`。透明、無隱藏商業模式 |

> 唯一雜訊：CLI README 有個壞掉的連結 `https://github.com//LittlsponsorseSound`（明顯是編輯時打錯字黏在一起），以及 `.stackblitzrc` 存在但 README 未提及。兩者均非安全問題。

### ② 安裝腳本／postinstall — ✅ 通過（乾淨）

全 repo grep `"postinstall"` / `"preinstall"` / `"prepublish"` → **零命中**。

唯一的生命週期腳本是 `"prepare": "nuxi prepare"`（根目錄與 server 各一處），這是 Nuxt 標準的型別產生指令，不執行任何下載或外部程式。三個 npm 套件（`luby-transform`／`qifi`／`@qifi/generate`）的 `scripts` 只有 `build` 與 `stub`（皆為 `unbuild`），**發佈到 npm 的套件本身不含任何安裝期腳本**。

`.npmrc` 內容為 `shamefully-hoist` / `strict-peer-dependencies=false` / `shell-emulator` / `ignore-workspace-root-check`——都是 pnpm monorepo 的常見設定，未指向任何私有 registry（**沒有 registry 覆寫，不存在 dependency confusion 的注入點**）。

### ③ 相依套件抽查 — ✅ 通過（13/13 全數存在且未 deprecated）

實查 npm registry（非從 lockfile 推論）：

| 套件 | registry latest | deprecated | 維護者 |
|------|----------------|-----------|--------|
| `birpc` | 4.0.0 | 否 | antfu, oreanno |
| `js-base64` | 3.9.2 | 否 | dankogai |
| `jsqr-es6` | 1.4.0-1 | 否 | danimoh |
| `qr-scanner` | 1.4.2 | 否 | danimoh |
| `uqr` | 0.1.3 | 否 | pi0, antfu |
| `pako` | 3.0.1 | 否 | vitaly |
| `cac` | 7.0.0 | 否 | egoist, sxzz |
| `mime` | 4.1.0 | 否 | broofa |
| `lz-string` | 1.5.0 | 否 | pieroxy |
| `ohash` | 2.0.11 | 否 | pi0 |
| `luby-transform` | 0.2.0 | 否 | nekomeowww, antfu, oikawa_rizumu |
| `qifi` | 0.2.0 | 否 | 同上 |
| `@qifi/generate` | 0.2.0 | 否 | 同上 |

**無 PyPI/npm 幽靈套件、無 quarantined、無 typosquat。** 執行期相依極少（前端 runtime 僅 5 個，編解碼核心僅 1 個 `pako`），攻擊面天然很小。

需注意的兩點：
- `jsqr-es6`（2022-05）與 `qr-scanner`（2022-11）已 **3 年多未更新**。目前無已知 CVE，但屬於「上游停更」風險。
- repo 內 pin 的版本已落後 registry latest 一到兩個 major（如 `birpc ^2.0.19` vs 4.0.0、`cac ^6.7.14` vs 7.0.0）——這是專案停滯的副作用，非安全事件。

### ④ 執行面改動 — ✅ 通過（純前端，無後端上傳）

- `nuxt.config.ts` 明寫 **`ssr: false`**——整個 App 是純客戶端 SPA，沒有伺服器渲染、沒有伺服器端資料處理。
- `netlify.toml` 部署為靜態託管 + SPA fallback（`from = "/*"` → `to = "/index.html"`），**部署形態上就沒有能接收檔案的後端**。
- 全 repo 唯一的伺服器端檔案是 `server/api/pageview.ts`，內容完整如下：

  ```ts
  const startAt = Date.now()
  let count = 0
  export default defineEventHandler(() => ({ pageview: count++, startAt }))
  ```

  這是一個**記憶體內計數器**，不寫檔、不連資料庫、不記錄任何請求者資訊。更關鍵的是：**全專案 grep 後沒有任何一處呼叫它**（僅出現在自身檔案與目錄樹中），是 Nuxt 範本殘留的死程式碼。同類殘留還有 `app/composables/count.ts`。
- 檔案處理全鏈路都在瀏覽器記憶體：`file.arrayBuffer()` → `Uint8Array` → 編碼 → `renderSVG()` 字串 → `v-html` 顯示。接收端還原後用 `URL.createObjectURL(new Blob(...))` 產生本機 blob URL 下載。**檔案內容從頭到尾沒有離開過 JS 記憶體。**
- 唯一的持久化是 `useLocalStorage('qrs-selected-camera', ...)`——只存使用者選了哪個攝影機的 deviceId，不含檔案資料。

### ⑤ 對外網路呼叫面 — ✅ 通過（這是本次稽核最關鍵的一項）

對全 repo（含 `.vue`／`.ts`／設定檔）執行下列 grep：

```
\$fetch | fetch\( | useFetch | useAsyncData | axios | XMLHttpRequest |
WebSocket | sendBeacon | navigator\.send | EventSource | RTCPeerConnection
```
→ **零命中。**

```
analytics | gtag | google-analytics | googletagmanager | telemetry |
posthog | sentry | plausible | umami | mixpanel | clarity | hotjar | track(
```
→ **零命中。**

再把原始碼中所有 `http(s)://` 字串全部列出逐條檢視，**全部**落在以下三類，**沒有任何一條是程式執行期會呼叫的資料端點**：

| 類別 | 實例 |
|------|------|
| README／文件連結 | Wikipedia（BEC、Fountain code、Luby transform）、`divan.dev` 部落格、`youtu.be` 教學、`github.com/google/gofountain` |
| 徽章／贊助圖（僅在 Markdown 中，不在 App 內） | `badgen.net/npm/v/...`、`img.shields.io/...`、`cdn.jsdelivr.net/gh/littlesound/sponsors` |
| 自我指涉 | `github.com/qifi-dev/qrs`、`qrss.netlify.app`、`npmjs.com/package/...` |
| XML namespace（非網路請求） | `http://www.w3.org/2000/svg` |

`nuxt.config.ts` 的 `app.head` 中**沒有任何外部 script/font/CSS 連結**，只有本地 favicon 與 logo。模組清單（`@vueuse/nuxt`、`@unocss/nuxt`、`@pinia/nuxt`、`@nuxtjs/color-mode`、`@vite-pwa/nuxt`、`@nuxt/eslint`）中無任何分析或錯誤回報服務。

> **唯一一條需要向使用者說明的「連外」行為，且它與檔案內容無關**：發送端預設會在 QR 內容前加上 URL 前綴（`location.href + '#'`，或自訂的 `qrcodePrefix`）。這是為了讓「用系統相機隨手一掃」的人能被導到掃描頁。此時**資料本身是放在 URL 的 `#` fragment 之後**——依 HTTP 規格，fragment **不會被送到伺服器**，而且接收端 `scanFrame()` 會立刻 `strData.slice(strData.indexOf('#') + 1)` 把前綴切掉。即便如此，若使用者用第三方相機 App 掃描，該 App 仍可能把整串 URL 送去做安全檢查或紀錄。**在真正的氣隙情境下，應把介面上的「Scanner URL」開關關掉**（UI 有提供這個開關），讓 QR 只含純資料。

### 供應鏈稽核小結

| 檢查項 | 結果 |
|--------|------|
| ① 作者／org 真實性 | ✅ 通過（antfu 實名背書，npm↔GitHub 維護者對帳一致） |
| ② 安裝腳本／postinstall | ✅ 通過（零 postinstall，無 registry 覆寫） |
| ③ 相依套件實查 | ✅ 通過（13/13 存在、未 deprecated；2 個上游停更 3 年） |
| ④ 執行面改動 | ✅ 通過（`ssr:false` 純前端，唯一 server 端點是無人呼叫的死計數器） |
| ⑤ 對外網路呼叫面 | ✅ 通過（fetch/XHR/WS/analytics **全數零命中**） |

**結論：資料確實不離開瀏覽器。** 這不是採信 README 的宣稱，而是「找不到任何能把資料送出去的程式碼路徑」——沒有 fetch、沒有 XHR、沒有 WebSocket、沒有 sendBeacon、沒有埋點 SDK、沒有外部 script 標籤，且部署形態（靜態 SPA）本身就不具備接收檔案的後端。

**但要在真正的氣隙環境使用，仍有兩個必要動作**：①**自行部署或用 PWA 離線模式**，不要在傳機密資料時連著網路開 `qrss.netlify.app`（不是因為它會偷傳，而是氣隙的定義就是不連網；且託管方 Netlify 至少能看到你的連線行為）；②**關閉「Scanner URL」前綴**。專案的 PWA 與 CLI 都支援離線，Issue #21 也有人做了純靜態的 fork（`laishulu/qrgap`）。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 6 人（前三名 LittleSound 71／nekomeowww 34／antfu 13 佔 96%） | ⚠️ 高度集中，實質為 2 人專案 |
| 實質開發活躍度 | 最後功能性 commit：2025-02-03（v0.2.0）；2025-05-08 後僅文件；2026-03-11 僅改 LICENSE 年份 | ❌ **停滯約 15 個月** |
| Release 頻率 | GitHub 無 Release；npm 停在 v0.2.0（2025-02-03） | ❌ 不定期／已停 |
| Open Issues | 6 open / 6 closed | 議題量小，但 open 的多是功能請求 |
| Open PRs | 0 | — |
| 維護者回應 | 有回應但明確表態沒空：「I will try this modification when I have time」「does anyone want to do it?」「my time is limited, I have no obligation to provide such services for free」 | ⚠️ 友善但已進入「等 PR」模式 |
| CI 覆蓋 | 僅 `lint` + `typecheck`，**`pnpm test` 未納入 CI** | ⚠️ 測試存在（vitest）但不把關 |
| Actions 版本 | `checkout@v3`、`setup-node@v3`、`pnpm/action-setup@v2` 皆為舊版；workflow 未宣告 `permissions:` | ⚠️ 衛生問題，但 CI 不觸及任何 secret、無自動發佈流程（npm 為手動發佈），實際風險低 |

**已知未解問題（來自 Issues）**：
- **#23（最重要）**：外部開發者 fidian 提出「限制每幀索引數上限」以避免高度數幀 payload 爆量編不進 QR，並在留言中給出具體改法（繞過 `encoder.fountain()`，改用 `createIndices(encoder.k, createDegree(encoder.k))` + `encoder.createBlock(indices)`，指到 `Generate.vue:37`）。維護者兩次回覆逐字為「I will try this modification when I have time」與「does anyone want to do it?」——**改良方案已擺在檯面上無人接手**。（註：本條經編排者開原文核對；此 issue 訴求是索引數上限，不是「替換 Ideal Soliton 分布」，亦未出現「省 30%」這個數字。）
- **#26**：手機無法穩定預設開啟後鏡頭，維護者自陳嘗試過但失敗。
- **#13**：QR 內容未含協定版本號——未來若改編碼格式會有相容性問題。
- **#17**：曾有人回報「所有塊都綠了但沒有觸發下載」的 bug，未見明確修復記錄。
- **#18／#20／#21**：離線／純靜態檔案使用的體驗不佳（接收端因瀏覽器 secure context 限制，用 `file://` 開啟無法取用相機）。社群自行催生了 `laishulu/qrgap` 與 `iuvi7/qrs` 等 fork 來補這塊。

---

## 社群口碑

> 來源：Exa 語意搜尋（僅回傳自我指涉結果）+ **WebSearch 補充**（Exa 對此 repo 無實質社群命中，故以 WebSearch 為主要來源，特此標注）。OpenCLI 路（Reddit／X）本次未執行。

**這個「串流 QR 傳檔」賽道相當熱鬧，qrs 是其中被實作最早、但已非最快的一個：**

- **ShadowCat**（Show HN，2026）：同樣是瀏覽器內 QR 串流傳檔，[Tom's Hardware 報導](https://www.tomshardware.com/networking/streaming-qr-codes-at-60-fps-achieves-nearly-190-kb-s-data-rate-in-phone-to-phone-tests-browser-based-method-requires-no-app-no-networking-no-pairing-and-no-permissions-beyond-camera-access)稱其在 60 FPS 手機對手機測試中達到 **約 190 KB/s**——比 qrs 預設情境的淨吞吐高一個數量級以上。
- **qr-send.com**：有開發者用 Dart/Flutter 重寫並改用 **RaptorQ**（搭配 Wirehair FEC），明確定位為 qrs／txqr 概念的效能升級版。
- **txqr**：更早的 Go 實作，qrs 的 README 也引用了同作者的〈Fountain codes and animated QR〉一文作為理論來源。
- **`laishulu/qrgap`、`iuvi7/qrs`**：直接從 qrs 分出去補「純靜態離線可用」缺口的 fork。
- **`Be-Prepared`（fidian）**：離線 PWA 工具箱，其檔案傳輸功能基於 qrs 並**維持格式相容**，同時替換掉了效率不佳的 Ideal Soliton 分布。

**正面回饋**：概念驗證漂亮、`luby-transform` 這個套件被獨立採用（可脫離 QR 情境單用）、antfu 掛名帶來的可信度、MIT 授權寬鬆、程式碼小而好讀（教學價值高）。

**負面回饋／已知問題**：速度是最大痛點（fidian：「不算快，但可以理解為什麼快不起來」）；離線／純靜態部署體驗差，逼出多個 fork；專案已停滯，社群改良（#23）進不了主線；npm 下載量極低（`qifi` CLI **每週僅 6 次下載**（2026-08-01 npm API 實測））——代表**星星數反映的是「這個點子很酷」的關注度，而非實際使用量**。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | ❌ 無直接關聯。vault 已是獨立 git repo（`sanyoii/-Obsidian_vault`）走 GitHub 同步，且含大量圖片／PDF（雷曼教材一手 PDF 就有 4,639 頁），體積遠超 QR 串流的可用範圍。 |
| **Claude Code** | ⚠️ 僅間接。無 MCP／Skill／Agent 整合點。`luby-transform` 是純函式庫，不是可掛載的工具。硬要說的話，CLI 版 `npx qifi` 可以在 Bash tool 裡跑，但輸出是滿螢幕的 ANSI QR 圖案，對 agent 工作流沒有意義。 |
| **Automation** | ❌ 無關聯。現有自動化（Task Scheduler、robocopy 快照、portable-bundle、daily snapshot commit）全部走檔案系統或網路，沒有任何一段需要光學通道。 |
| **跨機器傳檔現況** | 目前 `D:\Claude` ↔ 其他裝置靠 **git／GitHub**（主 repo private + obsidian repo public）、`docs/portable/` 可攜包、robocopy 本機快照。這三條路都已驗證可用、速度是 qrs 的數千倍。**qrs 在此無立足點。** |
| **是否有 air-gap 需求？** | **誠實回答：目前沒有。** 檢視現有工作內容——Claude Code／MCP／npm／gh CLI／網頁爬取／求職投遞／Obsidian 同步——**全部是連網工作流**。沒有任何一項是在斷網機器上進行、且需要把資料搬出來的。密鑰管理方面已有 pre-commit secret hook 這類「防外洩」措施，但那是防止不慎上傳，不是氣隙傳輸需求。 |
| **與既有工具重疊** | 高度重疊且全面劣勢：git/GitHub（已在用）、隨身碟、區域網路共享、雲端硬碟——任一種都比 8–11 KB/s 快數個數量級。qrs 唯一不可取代的場景是「連 USB 埠都被封、只剩螢幕與鏡頭」，而這個場景目前不存在。 |
| **⭐ 唯一的實質相關性：Web3／CEX 託管轉職的知識面** | 這條值得單獨拉出來講。**動態 QR 串流正是硬體錢包氣隙簽章的標準做法**——Keystone、Passport、Foundation 等冷錢包用 **BC-UR（Blockchain Commons Uniform Resources）** 格式的動態 QR（`ur:crypto-psbt/...`）在離線簽章裝置與連網 App 之間傳遞 PSBT 與簽章，機制上與 qrs 完全同構（分片 + 動態播放 + 相機接收），部分實作同樣用噴泉碼處理丟幀。既定的 Web3/CEX 託管賽道（提幣狀態機測試套件、託管流程 QA）**極可能要測到氣隙簽章流程**。讀懂 `luby-transform` 這 500 行，等於免費上了一堂「氣隙光學傳輸為什麼要用噴泉碼、它會在哪裡出錯」的課——這對設計冷錢包簽章的測試案例（丟幀率、長尾收斂、checksum 驗證、版本相容）是直接可用的。**價值在「讀」，不在「裝」。** |

---

## 安裝建議

⏳ **觀望——不安裝，但建議讀原始碼**

理由（R13 量化）：

1. **沒有真需求**。現有跨機器傳檔（git/GitHub、可攜包、robocopy）全部可用且快數千倍；目前沒有任何氣隙工作流。為一個不存在的問題安裝工具，是純加複雜度、零改善。
2. **效能不足以改變判斷**。8–11 KB/s 的淨吞吐（依專案自己的測試斷言 1.8–2.5 倍開銷推算）意味著實務甜蜜點在 1 MB 以下。即使未來真的需要氣隙傳輸，同賽道的 ShadowCat（約 190 KB/s）與 RaptorQ 系方案已明顯更成熟。
3. **專案已停滯**。功能性開發停在 2025-02，npm 停在 v0.2.0，外部開發者提的改良（Issue #23，限制每幀索引數）送到門口卻無人接手，維護者明確表示沒空。
4. **安全面完全乾淨，所以「不裝」的理由純粹是沒用到，不是不信任**。這點要講清楚——五項供應鏈稽核全數通過，資料確實不離開瀏覽器。
5. **知識價值 > 工具價值**。`luby-transform` 不到 500 行、註解清楚、有測試，是理解噴泉碼最快的教材；而噴泉碼 + 動態 QR 正是硬體錢包氣隙簽章的底層機制，與 Web3／CEX 託管轉職方向直接相關。

**建議動作**：不安裝、不 clone。若之後要補氣隙簽章的知識，直接讀本文的「技術架構」段與 `packages/luby-transform/src/{encoder,decoder}.ts` 即可（線上瀏覽就夠）。需要臨時傳個小檔時，直接開 https://qrss.netlify.app/ 用完即走，不需要本機安裝。

### 升級條件（→ 改 ✅ 安裝）

出現以下**任一**情況：
- Web3／CEX 託管職務實際要求測試**氣隙簽章流程**（冷錢包 PSBT 動態 QR 往返），需要本機可控的動態 QR 收發環境來做測試資料構造與丟幀模擬；
- 出現實際的斷網作業需求（例如客戶／雇主端禁用 USB 與網路的稽核環境）且需要把設定檔、金鑰或小型報告搬出來；
- 上游合併 Issue #23、或發佈 v0.3.0 以上並把傳輸開銷壓到 180% 以下。

> 註：若升級條件成立，**應同時評估 ShadowCat 與 RaptorQ 系方案**再決定裝哪一個，不要預設回頭裝 qrs。

### 放棄條件（→ 改 ❌ 不裝）

出現以下**任一**訊號：
- repo 被 Archived，或再過 12 個月（至 2027-08）仍無任何功能性 commit；
- 上游 npm 相依（尤其停更 3 年的 `qr-scanner` / `jsqr-es6`）爆出未修補的 CVE；
- 同賽道出現維護活躍、效能高一個數量級且同樣通過供應鏈稽核的替代品（ShadowCat／qr-send 若開源且社群穩定，即可直接取代 qrs 的所有用途）。

---

## 相關連結

- [[Github/repos/tw93-Pake|Pake — 網頁打包成桌面 App]]（同為「小而聚焦的前端工具」類型）
- 主題索引：[[Github/_index]]
- 官方 Demo：https://qrss.netlify.app/
- 理論來源：[Fountain codes and animated QR](https://divan.dev/posts/fountaincodes/)、[LT codes — a design and analysis epiphany](https://youtu.be/C4qi_oJoUrE)、[google/gofountain](https://github.com/google/gofountain)
- 相關 fork／衍生：[laishulu/qrgap](https://github.com/laishulu/qrgap)（純靜態離線版）、[Be-Prepared](https://github.com/Be-Prepared/Be-Prepared.github.io)（改良分布、格式相容）
