---
source: "https://github.com/littledivy/mimic"
author: "littledivy (Divy Srivastava, Deno 核心貢獻者)"
stars: "1.4K"
clipped: 2026-07-21
tags:
  - "github/repo"
  - "dev-tools/api"
  - "qa/testing"
---

# mimic — 攔截 App 流量，AI 生成 Python client 直接調用

> **littledivy/mimic** | ⭐ 1.4K | 🍴 88 | 📝 MIT
> "Intercept any app, then call it from Python like a library"

## 一句話說明

抓一次你自己 App 的流量（mitmproxy/HAR/cURL），AI 讀捕獲的 endpoints 自動生成 Python client——之後 `Hinge().get_recommendations()` 就能像呼叫函式庫一樣重放已認證 session。核心洞察：多數 App 每個 request 用同一組穩定認證（bearer token + device id + cookie），抓一次就能重放。作者是 Deno 核心貢獻者，8 天衝 1.4K star。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 1.4K / 88 |
| 主要語言 | Python |
| 授權 | MIT |
| 建立 | 2026-07-13（極新） |
| Release | 無（未版本化） |
| 規模 | 43KB、18 檔 |

## 核心功能

- **三種捕獲後端**：mitmproxy（iOS 預設，走 uvx 免另裝）／`Copy as cURL`（web 版直接貼，免 proxy 免憑證）／HAR 檔（瀏覽器 devtools 匯出）
- **AI codegen**：捕獲 endpoints → digest → 餵 `claude` 生成 human-named 方法、body templates、多步 call chaining（mobile API 常見「先拿 token 再花掉」）
- **Session 執行層**：`from_mitm`/`from_curl`/`from_har`/顯式四種建構；`.get`/`.post` 回傳解析 JSON；token 輪替時 idempotent 請求 401 自動重抓
- **extract.py 認證萃取**：白名單保留 `authorization`/`cookie`/`x-*`，DROP 掉 `content-length`/`host` 等 HTTP 層雜訊
- **unpin（Frida 憑證解鎖）**：編排上游 httptoolkit/frida-interception-and-unpinning，把自己的 mitmproxy CA 烤進腳本

## 技術架構

```
capture(mitmproxy/HAR/cURL) → extract auth(白名單標頭) → codegen(claude 讀 endpoints)
       │                                                        │
       ▼                                                        ▼
   flows(JSON) ──────────────► Session ◄──────────── hinge_client.py (subclass mimic.App)
                       .get/.post → parsed JSON + 401 自動 refresh
```

| 層次 | 技術 |
|------|------|
| 捕獲 | mitmproxy(uvx) / HAR / cURL parse |
| 萃取 | 標頭白名單（KEEP_EXACT + x-* 前綴） |
| 生成 | claude CLI subprocess |
| 執行 | requests.Session + idempotent 重試 |
| 解鎖 | Frida（編排上游腳本） |

## 兩大限制（README 自陳）

- **憑證 pinning**（銀行/IG）：擋捕獲不擋重放；unpin（Frida）可解
- **DPoP / sender-constrained token**：每 request 新簽章、私鑰不離裝置 → 重放失效，**無解**，打穿核心模型

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **QA 職涯** | 領域關聯點。API 測試 / 手動測試自動化：手動點 App 捕獲流量 → 轉可重放 client → 沉澱回歸腳本，契合「手動測試≈自動化」信念 |
| **Claude Code** | codegen 直接 subprocess 呼 claude；codegen.py 的 PROMPT 是研究 AI codegen prompt 設計的好樣本 |
| **jobsmith/career-ops** | 相關但別混用：那些打**公開 API**（104 JSON API 公開）；mimic 重放**私有 App 認證 session**，法律/ToS 層級不同 |

## 安裝建議

**⏳ 觀望** — 技術漂亮、與 QA 相關，但無當前用例、法律面要謹慎。

- **升級條件**：① 具體 QA 場景需把某 App 手動流程轉可重放測試（自己測試帳號）② 只想研究 codegen prompt → 讀 codegen.py 即可不必實跑 → ✅
- **放棄條件**：作者棄坑（個人專案、極新、無 release，風險真實）／半年沒碰 API 重放測試需求 → ❌

⚠️ 倫理邊界（README 明訂）：只用自己的帳號和資料、重放自己的 session、遵守各 App ToS。拿去打別人帳號＝未授權存取。

## 相關連結

- [[Jobsmith 台灣求職 AI Co-Pilot]] — 打公開 API，與 mimic 私有 session 重放法律層級不同
- [[使用者 QA 職位]] — QA 職涯相關工具評估脈絡
