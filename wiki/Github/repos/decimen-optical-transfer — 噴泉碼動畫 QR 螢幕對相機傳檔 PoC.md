---
source: "https://github.com/bashalarmistalt/decimen-optical-transfer"
author: "bashalarmistalt (Bash Alarmist；小號，帳號與 repo 同日建立)"
stars: "2.1K"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "fountain-code"
  - "qr-code"
  - "air-gap"
  - "typescript"
  - "vibe-coded"
---

# decimen-optical-transfer — 噴泉碼動畫 QR 螢幕對相機傳檔 PoC

> 來源：https://github.com/bashalarmistalt/decimen-optical-transfer
> 授權：MIT｜⭐ 2,051｜🍴 241｜建於 **2026-07-30（分析時僅 2 天）**
> 規模：15 檔 / 12,797 tokens（2026-08-01 repomix 實測）；2.7MB 磁碟中 2.5MB 是兩張示範圖
> ⚠️ **實測結論：這是傳輸層 demo，不是能傳你的檔案的工具**（詳見下方「最重要的落差」）

## 一句話說明

一台裝置的螢幕播放無限串流的動畫 QR，另一台用相機拍，把檔案「用光」傳過去——兩端無網路、無配對、無 App。核心是 **LT 噴泉碼（Luby transform）**：每一幀是若干資料塊的 XOR，接收端收到任意約 K×1.15 個不重複幀就能解出原檔，掉幀只損失時間不損失正確性，且兩端幀率完全不需匹配。作者自述是從更大的實驗（曾達 128 KB/s 手機對手機）抽出的最小 PoC。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 2,051 |
| Forks | 241 |
| 主要語言 | TypeScript |
| 授權 | MIT |
| 建立時間 | 2026-07-30（帳號同日建立，早 77 分鐘） |
| 最後推送 | 2026-07-31 |
| Open Issues / PRs | 3 / 1 |
| 最新 Release | v0.1.0（2026-07-31，**無任何 asset**） |
| Topics | 無；description 空白 |
| 首頁 | 無 |
| 是否 Archived | 否 |

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 15 |
| 總 Tokens | 12,797 |
| 壓縮模式 | 未使用 |

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| receive/main.ts | 2,072 | 16.2% |
| README.md | 1,650 | 12.9% |
| send/main.ts | 1,600 | 12.5% |
| shared/style.css | 967 | 7.6% |
| shared/fountain.ts | （7,674 bytes 原始碼） | — |

磁碟 2,762KB 中 **2,574KB 是兩張示範 PNG**（`public/success-2mb.png` 2.04MB＋`public/success.png` 536KB）＋`docs/receiving.jpg` 244KB。實際程式碼僅約 30KB。

## 核心功能

- **LT 噴泉碼傳輸層**（`shared/fountain.ts`，實作紮實正確）：robust-soliton 度分布 CDF、inverse-CDF 抽樣、splitmix32 PRNG、大度數走 partial Fisher–Yates。幀序號決定該幀 XOR 哪些塊，兩端各自算出同一組索引，無需協商
- **每幀自帶 20-byte header**（session id／序號／塊數塊大小／檔長／hash）：**無握手**，接收端可中途插入串流；發送端重啟換新 session id 會自動重置接收端
- **確定性 `dlog()`**：因 `Math.log` 在 JS 規範中是「實作近似」，V8（發送端）與 JavaScriptCore（iPhone 接收端）可能差一個 ulp 導致 soliton 分布不同 → 串流靜默 desync。作者用只含精確定義 IEEE-754 運算的 atanh 級數自行實作 log
- **解碼走 zxing-cpp WASM + Web Workers**（因 Safari 從未支援 `BarcodeDetector`，WebKit bug 281848），由 `requestVideoFrameCallback` 餵幀；worker 忙碌造成的掉幀由噴泉層吸收
- **QR 糾錯刻意設最低（L）**：幀內 ECC 對付「損壞」、噴泉層對付「遺失」，兩者解決不同問題；此幀大小下 L＋丟棄壞幀是較好的取捨

## 技術架構

```
send/                          shared/                    receive/
 index.html                     fountain.ts                index.html
 main.ts ──┐                    ├ dlog()（確定性 log）      main.ts ──┐
           │                    ├ solitonCdf()             worker.ts │
  fetch(../success.png)         ├ frameSeed()               (zxing-wasm)
  （只讀 repo 內建示範圖）        └ frameIndices()                     │
           │                    protocol.ts                          │
           ▼                     └ splitmix32 / header             解碼
   canvas 畫 QR ──── 螢幕 ~光~ 相機 ────> requestVideoFrameCallback
           │                                                        │
     wakeLock 防休眠                              收齊 K×1.15 幀 → peel
                                                        │
                                          Blob → <img> 顯示（無下載連結）
```

| 層次 | 技術 |
|------|------|
| 建置 | Vite 6＋TypeScript 5.5＋`@vitejs/plugin-basic-ssl`（因 `getUserMedia` 要求 secure context） |
| 編碼 | 自寫 LT fountain（無外部 fountain 函式庫）＋`qrcode` 產碼 |
| 解碼 | `zxing-wasm` 2.x 跑在 Web Worker |
| 傳輸 | 無——純螢幕→相機單向光學通道 |

## 最重要的落差：沒有檔案選擇器

README 開頭寫「Send a **file** between two devices」，但**原始碼裡不存在任何檔案輸入**——實測 grep `type="file"` / `input.files` / `FileReader` / DataTransfer 全數 **0 命中**。發送端只有一個下拉選單，兩個選項都是 repo 內建的示範 PNG（`../success.png` 512KB、`../success-2mb.png` 2MB）；接收端解出後只做 `URL.createObjectURL` 丟給 `<img>` 顯示，**沒有下載連結、不落檔**。

也就是說：這份程式碼可以示範「2MB 圖片用光傳過去並顯示」，但**無法傳你自己的檔案**。README 對此的說法是「minimal proof of concept extracted from a larger experiment」——技術上誠實，但標題與首段容易讓人以為是可用工具。要變成工具，發送端要加 file input、接收端要加 download anchor，都不難但目前沒有。

## 供應鏈稽核

| # | 檢查 | 結果 |
|---|------|------|
| 1 | 作者真實性 | ⚠️ 但可解釋：帳號 2026-07-30 17:18 建立、77 分鐘後首個也是唯一一個 "Initial commit"、僅此 1 repo。**帳號名 `bashalarmist-alt` 自帶 alt 字樣＝作者的小號**，與「匿名發表」一致，非冒名 |
| 2 | 安裝腳本 | ✅ 零 postinstall／preinstall／prepare，`package.json` 只有 dev／build／preview |
| 3 | 相依套件 | ✅ 6 顆全為 devDependencies（vite、typescript、qrcode、@types/qrcode、zxing-wasm、@vitejs/plugin-basic-ssl），逐一打 npm registry 確認存在（HTTP 200），皆為知名套件無 typosquat |
| 4 | 安裝改動面 | ✅ 純前端專案，`npm install` 只落 `node_modules`，不寫全域設定；無二進位下載 |
| 5 | 對外網路 | ✅ **全 repo 只有一處 `fetch()`**，且參數來自寫死的 `<option value="../success.png">`——讀 repo 自帶的本地資源。無 XHR／WebSocket／sendBeacon／analytics／第三方主機；無 `eval`／`new Function`；`createObjectURL` 僅用於顯示解出的圖 |

**結論：供應鏈乾淨，五項全過。** 「2 天帳號 2,051 星」的異常外觀有完整合理解釋（見下），不是散布向量。

## 星數來源已查證：自然流量

初看「30 小時 2,051 星 / 241 fork、帳號同日建立」符合灌量特徵，但實際來源查到了：**r/vibecoding 貼文「Had an idea for air gapped file transfer, able to get 120 KB/s」5,622 讚 / 513 留言**，作者自述用 Claude Code 一晚做出 PoC 並在編輯中附上此 repo 連結。Hacker News 那兩則投稿只有 3 分與 1 分、零留言——**HN 不是來源，Reddit 才是**。Fork 帳號抽查五個皆為 2011／2013／2020／2022／2025 建立的真實帳號（有 17～228 個 repo），非機器農場。

> 方法學註記：分析中曾因 `stargazers` API 回 404 而推論「GitHub 標記此 repo」，經**對照組實測**（`qifi-dev/qrs`、`googleworkspace/cli` 同樣 404）證明是本機 token 權限問題，與該 repo 無關，該推論已作廢。異常訊號要先驗證量測工具本身。

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian | 無關聯 |
| Claude Code | 無直接關聯（本身不是 agent 工具）。間接：它是「Claude Code vibe-code 一晚產出爆紅 PoC」的樣本 |
| Automation | 無——目前環境沒有 air-gap 或跨裝置離線傳檔需求（同網段傳檔用一般網路即可） |

真正可帶走的是**知識而非工具**：①LT 噴泉碼的可讀參考實作（`fountain.ts` 約 200 行，含 robust soliton 推導）②README 那幾條瀏覽器硬傷（`Math.log` 跨引擎不確定性、iOS `frameRate` 要 `{exact:60}` 且必須 `getSettings()` 回讀、`requestVideoFrameCallback` 鏈會跨串流殘留需 generation counter、進度條要數收到的幀而非解出的塊）——這些是實作過才知道的細節，對任何做瀏覽器相機／即時串流的專案都有用。

## 安裝建議

⏳ **觀望** — 程式碼品質與供應鏈都沒問題，但**它現在不是工具**（無檔案選擇器、無下載，只能傳內建示範圖），而目前環境也沒有 air-gap 傳檔的真實需求（R13：需求驅動，不為技術漂亮而裝）。2 天大、單一 commit、作者自承 vibe-coded，API 與行為隨時可能大改。

- **升級條件（→ ✅ 裝）**：①出現真實 air-gap 傳檔需求（例：要把檔案送進／帶出無網路環境的機器）**且**上游補上 file input＋下載（追 issue/PR 或自己 fork 加 30 行）②或作者把「128 KB/s 完整版」開源，效能與可用性一次到位
- **放棄條件（→ ❌ 不裝）**：①一個月後（2026-09-01）仍停在單一 commit 且 issues 無回應＝熱度過去的一次性 PoC ②同類專案（如 Reddit 上另一個 `qr.linkto.host` 宣稱 ~180 KB/s）功能更完整且維護活躍 → 直接看那個

## 相關連結

- [[Github/_index|GitHub Repo 分析索引]]
- [[Tools/repo-intel|repo-intel Skill]]
- 同批光學傳輸分析：qifi-dev/qrs、airgapped-qr-code-transfer、Infinite_Storage_Glitch
