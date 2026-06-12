---
source: "https://github.com/Retsomm/SelfMap"
author: "Retsomm"
stars: "0"
clipped: 2026-06-12
tags:
  - "github/repo"
  - "人類圖"
---
# SelfMap — 探索你的內在地圖

> **出處：** [https://github.com/Retsomm/SelfMap](https://github.com/Retsomm/SelfMap) | ⭐ 0

---

## Description

精準的人類圖（Human Design）計算器，輸入出生日期、時間與地點，在瀏覽器端即時計算並視覺化呈現完整身體圖（Body Graph）。Next.js 16 + React 19 + Swiss Ephemeris WebAssembly。

## README

SelfMap 是一個精準的人類圖（Human Design）計算器，透過出生日期、時間與地點，在瀏覽器端即時計算並視覺化呈現完整身體圖（Body Graph）。

### 功能特色

- **即時人類圖計算** — 輸入出生資料後生成完整身體圖，計算所有 13 顆行星的 Personality 與 Design 位置
- **互動式身體圖（BodyGraph）** — SVG 渲染 9 大能量中心、64 個閘門、36 條通道，點擊可展開詳細說明
- **完整人類圖分析** — 類型（Type）、人生角色（Profile）、決策權威（Authority）、定義（Definition）、輪迴交叉（Incarnation Cross）、四箭頭（Variables）
- **合圖分析（Composite）** — 兩人圖表合併檢視，分析關係連結動態
- **流日分析（Transit）** — 即時計算當下行星閘門位置，對照個人圖表查看能量流動
- **出生資料管理** — 登入後可儲存多組常用出生資料，一鍵快速填入個人圖表或合圖分析
- **儲存圖表** — 登入後可儲存多份人類圖至個人帳號
- **圖表下載** — 匯出為 PNG/PDF 留存
- **AI 提示詞** — 一鍵複製結構化提示詞，貼至任何 AI 進行深度解讀
- **人類圖教學內容** — 涵蓋五大類型、九大中心、通道、閘門、輪迴交叉等主題說明
- **雙語介面** — 繁體中文 / English（透過 cookie 切換）

### 技術架構

| 層級 | 技術 |
|------|------|
| 框架 | Next.js 16 (App Router) + React 19 + TypeScript |
| 樣式 | Tailwind CSS 4 |
| 星曆計算 | Swiss Ephemeris (`@swisseph/browser` WebAssembly) |
| 身份驗證 | Clerk (`@clerk/nextjs`) |
| 資料庫 | PostgreSQL via Prisma（Supabase 托管） |
| UI 元件 | Radix UI（Select / Popover）+ react-day-picker |
| 動畫 | Framer Motion |
| 圖表匯出 | html-to-image + jsPDF |
| 部署 | Vercel |

### 計算原理

1. **時間轉換** — 依出生地點時區，將本地時間轉為 UTC，再轉為儒略日（Julian Day）
2. **Personality 時刻** — 出生當下的行星黃道位置
3. **Design 時刻** — 出生前太陽退行 88° 的時間點（約 88 天前），再計算全天球行星位置
4. **閘門轉換** — 將黃道度數（0–360°）映射至易經 64 卦對應的人類圖閘門與爻線
5. **中心 / 通道定義** — 兩閘門同時激活時形成通道，通道所連接的中心被「定義」
6. **類型推導** — 依薦骨（Sacral）、喉嚨（Throat）等關鍵中心的定義狀態判斷五大類型
7. **權威優先順序** — 情緒 → 薦骨 → 脾 → 意志力 → G 中心 → 腦部 → 環境 / 月亮
8. **輪迴交叉** — 以太陽 / 地球（Personality + Design）四個閘門組成
9. **四箭頭 Variables** — 以太陽與北交點的 Personality / Design 爻線判斷

計算範圍：1900–2040 年。

### 專案目錄

```
selfmap/
├── app/                      Next.js App Router 頁面
│   ├── page.tsx              主頁（計算器）
│   ├── map/[chartId]/        已儲存圖表分享頁
│   ├── human-design/         人類圖教學頁
│   ├── about/                關於頁
│   ├── account/              帳號頁
│   ├── dashboard/             儀表板
│   ├── create/               建立頁
│   └── api/
│       ├── charts/           圖表 CRUD API（GET / POST）
│       ├── charts/[id]/      單一圖表操作（GET / DELETE）
│       └── stats/             頁面流量統計
├── components/
│   ├── humanDesign/           人類圖相關元件
│   │   ├── BodyGraph.tsx      SVG 身體圖主體
│   │   ├── ChartView.tsx      個人圖表詳情檢視
│   │   ├── CompositeView.tsx  合圖雙人比對檢視
│   │   ├── CompositeTab.tsx   合圖分頁（含自動填入出生資料）
│   │   ├── TransitTab.tsx     流日分析分頁
│   │   ├── TransitView.tsx    流日行星閘門視覺化
│   │   ├── BirthProfileManager.tsx 出生資料管理（新增 / 編輯 / 刪除）
│   │   ├── DetailDrawer.tsx   閘門 / 通道詳情抽屜
│   │   ├── PersonalTab.tsx    個人資訊分頁（含自動填入出生資料）
│   │   ├── LocationPicker.tsx 城市時區選擇器
│   │   ├── hd-chart-data.ts   圖表靜態資料（閘門 / 通道說明）
│   │   ├── hd-cross-data.ts   輪迴交叉靜態資料
│   │   └── hd-summary-data.ts 中心摘要靜態資料
│   └── ui/                    基礎 UI 元件（Radix UI 封裝）
├── lib/
│   ├── computeHdResult.ts     人類圖主計算流程（整合入口）
│   ├── computeTransit.ts      流日行星閘門計算（只取當下意識層）
│   ├── compositeAnalysis.ts   合圖關係分析邏輯
│   ├── buildAiPrompt.ts       AI 提示詞組合
│   ├── swissEph.ts            Swiss Ephemeris WASM 封裝
│   ├── saveChart.ts           圖表儲存（個人 / 合圖）
│   ├── downloadChart.ts       圖表下載（PNG / PDF）
│   └── humanDesign/            計算模組
│       ├── engine.ts           行星計算主引擎
│       ├── constants.ts        閘門 / 通道映射常數
│       ├── gates.ts            閘門定義資料
│       └── types.ts            TypeScript 型別定義
├── data/                       人類圖教學 Markdown 內容（九篇）
├── i18n/                        多語言翻譯（zh / en）
├── prompt/                      計算邏輯說明文件（01–13）
├── prisma/schema.prisma         資料庫 Schema
└── public/swisseph.wasm         Swiss Ephemeris WebAssembly 二進位
```

### 資料庫 Schema

```
User    id, clerkId, email, name, createdAt, updatedAt
Chart   id, userId, name, birthDate, birthTime, birthCity, timezone,
        type, authority, profile, definition,
        centers (Json), channels (Json), gates (Json),
        createdAt, updatedAt
```

### API 路由

| 方法 | 路徑 | 說明 |
|------|------|------|
| `GET` | `/api/charts` | 取得目前用戶所有圖表 |
| `POST` | `/api/charts` | 建立並儲存新圖表 |
| `GET` | `/api/charts/[id]` | 取得單一圖表（公開） |
| `DELETE` | `/api/charts/[id]` | 刪除圖表（需為擁有者） |
| `GET` | `/api/stats` | 頁面瀏覽統計（Umami） |

---

## SelfMap 分析報告

### 這是什麼？

**SelfMap** 是一個**正式上線的人類圖 SaaS 產品**（[selfmap.tw](https://selfmap.tw)，README 內含 Umami 流量統計徽章），用 Next.js 16 + React 19 + Swiss Ephemeris WASM 在瀏覽器端做完整的人類圖計算與互動式 BodyGraph 視覺化，並接 Clerk 帳號系統 + Supabase/Postgres 做圖表儲存。

- 129 個檔案，約 312k tokens（含 9 篇人類圖教學 Markdown + 13 份計算邏輯說明文件 `prompt/01-13`）
- 最大檔案是 `data/輪迴交叉.md`（61k tokens）和 `components/humanDesign/hd-cross-data.ts`（51k tokens）——輪迴交叉的靜態資料量很大
- License：**無**（repo 未設定 license，使用前需注意）
- 倉庫剛建立（2026-05-26），目前 0 star，作者帳號 Retsomm

### 核心功能對照表

|功能|說明|
|---|---|
|**個人圖表**|13 顆行星 Personality + Design 位置 → Type / Profile / Authority / Definition / Incarnation Cross / Variables|
|**互動 BodyGraph**|SVG 渲染 9 中心 / 64 閘門 / 36 通道，點擊展開說明|
|**合圖（Composite）**|雙人圖表比對，分析關係連結動態|
|**流日（Transit）**|即時行星閘門位置 vs 個人圖表|
|**帳號系統**|Clerk 登入 + 多組出生資料管理 + 圖表儲存（Prisma/Postgres）|
|**匯出**|html-to-image + jsPDF 匯出 PNG/PDF|
|**AI 提示詞**|`buildAiPrompt.ts` 一鍵生成結構化提示詞給 LLM 深度解讀|
|**教學內容**|九大中心/五大類型/通道/閘門/輪迴交叉等 9 篇 Markdown，雙語|

### 計算核心與 [[project_hd_decode|hd-decode]] 的關聯

這個 repo 是 hd-decode（`d:\Claude\hd-decode\calc-server`）Phase 3 四箭頭/PHS 演算法的**反推來源**（已記錄於 `project_hd_decode.md`）。實際看過 `lib/computeHdResult.ts` 後可以補充：

- **真正的計算入口是 `lib/computeHdResult.ts`**，流程與 hd-decode 的 `hd_engine.py` 幾乎一致：
  1. `initSwissEph()` 初始化 WASM
  2. 出生地時區 → UTC → Julian Day（`toUtcDate` + `dateToJulianDay`）
  3. `getDesignJd()` 算出設計日（太陽退行 88°）
  4. 對 13 個天體（含計算出的地球=太陽+180°、南交點=北交點+180°）分別算 Personality / Design 黃道經度
  5. `calculatePlanetGates` 把經度轉閘門/爻線（對應 hd-decode 的 `degrees_to_gate_line()`）
  6. `calculateCentersAndChannels` / `calculateType` / `calculateAuthority` / `calculateDefinition` / `calculateIncarnationCross` / `calculateVariables` 各自獨立函式
- `lib/humanDesign/engine.ts` 裡有一組 `seededGate`/`seededLine`（hash-based 偽隨機）函式——**這不是主計算路徑**，從命名與用途看像是 demo/placeholder 資料產生器，主流程不會用到它，可忽略。
- `Variables`（四箭頭）計算只用太陽 + 北交點的 Personality/Design 四個經度（`planets[0]` 太陽 + `planets[3]` 北交點），與 hd-decode 記錄的「四個來源 longitude 皆已存在於 personality_list/design_list」說法一致，**互相驗證了 hd-decode Phase 3 的反推方向是對的**。

### 值得參考的地方

- **`prompt/01-13` 系列文件**：把整個計算流程拆成 13 個步驟的說明文件，是很好的人類圖計算邏輯參考資料，比直接看程式碼更快理解整體 pipeline
- **`lib/humanDesign/` 模組拆分**：constants / gates / types / engine 各司其職，若 hd-decode 之後要做「合圖（Composite）」或「流日（Transit）」功能，這裡的 `compositeAnalysis.ts` / `computeTransit.ts` 可作為架構參考
- **`buildAiPrompt.ts`**：一鍵生成 AI 解讀提示詞的做法，與 hd-decode 的「解讀工具」定位高度相關，可參考其提示詞結構設計

### 注意事項

- 整個 repo 含 Clerk + Prisma + Vercel 部署設定，是完整 SaaS 而非單純演算法庫，若要抽取演算法部分，重點看 `lib/humanDesign/` + `lib/computeHdResult.ts` + `utils/ephemeris.ts` 即可，不需要整套帳號/資料庫系統
- 無 License，僅供閱讀參考邏輯，勿直接搬用程式碼到自己專案
