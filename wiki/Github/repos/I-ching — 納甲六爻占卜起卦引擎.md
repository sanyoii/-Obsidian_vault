---
source: "https://github.com/paganiwang-del/I-ching"
author: "paganiwang-del"
stars: "0"
clipped: 2026-07-13
tags:
  - "github/repo"
  - "命理"
  - "六爻"
  - "占卜"
  - "python"
---

# I-ching（專業六爻排盤）— 納甲六爻占卜起卦引擎

> **paganiwang-del/I-ching** | ⭐ 0 | 🍴 0 | 📝 無授權
> 首頁 https://i-ching-iota.vercel.app

## 一句話說明

以**納甲六爻**為核心的占卜排盤工具：銅錢起卦後自動排本卦/變卦，套上納甲（天干地支）、五行、六親、六神、世應。時間處理講究——用使用者裝置當地時間 + IANA 時區，年柱以立春換界、月建以二十四節氣的「節」換界、子初（23:00）換日。三形態：Vercel Serverless 線上版、FastAPI 瀏覽器本機版、Eel 桌面版（含打包 exe）。目標使用者＝懂六爻、想要規則統一且節氣精確排盤工具的人。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 0 / 0（早期個人專案） |
| 主要語言 | Python（33.7KB）+ JS/HTML/CSS 前端 |
| 授權 | **無 LICENSE**（法律預設保留所有權利，不可直接複製其 code） |
| 建立 | 2026-05-18 |
| 首頁 | i-ching-iota.vercel.app（Vercel） |

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 18 |
| 總 Tokens | 25,181 |

**Top 5 token 檔：** frontend/script.js（29.3%）、liuyao_logic.py（15.4%）、frontend/style.css（15.4%）、calendar_engine.py（11%）、frontend/index.html（6.7%）。前端佔近半，命理邏輯集中在 `liuyao_logic.py`（排盤）+ `calendar_engine.py`（曆法）。

## 核心功能

- **銅錢起卦 + 本卦/變卦**：由六爻陰陽（含動爻）排主卦與變卦。
- **完整納甲六爻要素**：八經卦五行、內外卦納甲天干地支、六親（生我=父母/同我=兄弟/我生=子孫/我剋=妻財/剋我=官鬼）、六神（依日干）、世應、64 卦名矩陣、地支六沖。
- **精確曆法**：用 `sxtwl`（壽星天文曆）算干支與二十四節氣；立春換年、節換月、子初換日、農曆日期僅供顯示（明確區分農曆月 ≠ 六爻月建）。
- **時區正確性**：前端傳裝置當地時間 + IANA 時區，UTC 僅作傳輸格式，排盤時轉回當地時間。
- **占卜紀錄**：桌面版存 SQLite（`divination.db`）。
- **三形態部署**：Vercel Serverless（`api/index.py`）、FastAPI 網頁（`web_app.py`）、Eel 桌面（`main.py` + PyInstaller exe）。

## 技術架構

```
前端 frontend/（原生 JS + HTML + CSS，無框架）
        │ 傳 client_now(ISO8601) + client_timezone(IANA)
        ▼
  三入口（共用核心）
    ├─ api/index.py ── Vercel Serverless（FastAPI + CORS）
    ├─ web_app.py ──── FastAPI 本機網頁
    └─ main.py ─────── Eel 桌面視窗
        │
        ▼
  核心引擎（純 Python，deterministic）
    ├─ liuyao_logic.py  LiuYaoEngine：納甲/五行/六親/六神/卦象
    └─ calendar_engine.py CalendarEngine：干支/節氣/農曆（sxtwl）
        │
  storage.py ── SQLite 占卜紀錄   time_utils.py ── 時區解析
```

| 層次 | 技術 |
|------|------|
| 前端 | 原生 JS/HTML/CSS（無框架，SPA） |
| API | FastAPI + CORS |
| 核心 | 純 Python 查表引擎（八卦/納甲/生剋矩陣） |
| 曆法 | sxtwl（壽星天文曆，節氣精確） |
| 部署 | Vercel Serverless / Eel 桌面 / PyInstaller exe |
| 儲存 | SQLite |

架構乾淨：單一核心引擎被三種前端入口共用，命理規則全用查表矩陣（八經卦、納甲地支、五行生剋、64卦名）表達，deterministic 可驗證，非 AI 生成。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **命理工具鏈** | 🎯 補空缺：現有命理棧（[[Github/repos/zhenheco-life-chart-engine — 三合一原生排盤引擎（西洋星盤×人類圖×紫微斗數）\|life-chart-engine]]、hd-decode、ziwei、fate）都是**命盤**（八字/紫微/人類圖/占星），沒有**占卜起卦**類。六爻是不同分支（問事占卜非生辰命盤），此 repo 補這塊。 |
| **技術可借鏡** | `calendar_engine.py` 的 sxtwl 節氣/干支算法、立春換年/節換月/子初換日界線處理，與 life-chart-engine 八字排盤曆法需求同源，可交叉驗證。 |
| **Claude Code** | 無直接整合；若做「六爻 AI 解卦」skill，此引擎可當 deterministic 排盤後端（如 life-chart-engine 之於 four-system-life-reading）。 |

## 安裝建議

**⏳ 觀望 / 參考（有價值但有前提）**

- 價值：填補命理棧缺的「占卜起卦」分支；納甲六爻邏輯完整、曆法 sxtwl 精確、deterministic 好驗證，架構與 life-chart-engine 同構。
- 阻礙：① **無授權**，不能合法把 code 併進自己專案，只能參考或聯繫作者；② 0 star 早期專案未經驗證，排盤正確性需自己對照古籍抽驗；③ 純占卜工具，與現有「命盤解讀」產品線是不同情境。
- if-then：想擴充「六爻占卜」→ 研究其引擎或聯繫作者授權；只做命盤解讀 → 存參考即可，不整合。

## 相關連結

- [[Github/repos/zhenheco-life-chart-engine — 三合一原生排盤引擎（西洋星盤×人類圖×紫微斗數）\|life-chart-engine]] — 命盤類三/四系統引擎（同構）
- [[Github/repos/OpenFate Bazi MCP — 八字四柱確定性排盤 MCP 伺服器\|OpenFate Bazi MCP]] — 八字曆法排盤
- [[Github/_index|Github Repo 分析總索引]]
