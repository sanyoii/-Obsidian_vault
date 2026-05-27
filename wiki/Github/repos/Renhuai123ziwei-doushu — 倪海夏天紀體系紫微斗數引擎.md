---
source: "https://github.com/Renhuai123/ziwei-doushu"
author: Renhuai123
clipped: 2026-05-26
tags:
  - "github/repo"
  - "ziwei"
  - "astrology"
  - "nextjs"
  - "dataset"
  - "not-installed"
---

# 紫微斗數 — 倪海夏《天紀》體系排盤引擎

> **出處：** https://github.com/Renhuai123/ziwei-doushu
> **線上體驗：** https://ziwei-30.vercel.app（備案審核中）
> **狀態：** 未安裝（僅 repomix 分析）

---

## 一句話說明

基於**倪海夏《天紀》**教學體系的紫微斗數排盤系統。同樣用 `iztro` 做排盤核心，但在其之上疊加了：1100+ 行格局知識庫、三部古籍原文、51.8 萬命盤樣本數據集，以及倪師三紀（天紀/地紀/人紀）學習體系。

---

## 技術棧

- **Next.js 14** + TypeScript（vs ruijayfeng/ziwei 用 Vite）
- Tailwind CSS + 亮/暗主題
- `iztro`（同款排盤核心）
- 零 DB，所有古籍/知識靜態打包進 TS 檔案
- 66 個檔案，28,233 tokens

---

## 核心資產（對現有系統的價值）

### 1. `lib/ziwei/patterns.ts` ⭐ 最高價值

1100+ 行的**格局識別知識庫**，設計原則：
- 古書條件優先：每個格局分「必須 / 加分 / 破格」三層結構，出處可考
- 倪師立場：不用宮干自化、大限四化等飛星派工具
- 古籍依據：《紫微斗數全集》、《紫微斗數全書》、《骨髓賦》、倪海夏《天紀》

**可移植做法：** 將 patterns.ts 的格局判斷邏輯打包成 JSON，注入 ruijayfeng/ziwei 的 AI system prompt，大幅提升格局解讀準確度。

### 2. `lib/classics/` — 三部古籍原文

| 檔案 | 內容 |
|------|------|
| `gusuifu.ts` | 骨髓賦（核心歌訣） |
| `quanji.ts` | 紫微斗數全集（清代古本）|
| `quanshu.ts` | 紫微斗數全書（陳希夷傳本）|

格式：每段有 `id`、`text`（古文）、`translation`（現代翻譯，部分填充）、`niNote`（倪師注解）

**可移植做法：** 在 ruijayfeng/ziwei 加「古籍引用」功能，AI 解讀時引用相關原文段落。

### 3. `lib/ziwei/famous.ts` — 名人命盤資料庫

分類：商業、文藝、歷史、體育、科技

**可移植做法：** 在 ruijayfeng/ziwei 加「名人命盤對比」功能，讓使用者比對自己與歷史人物的格局。

### 4. `lib/seo/knowledge.ts` — 結構化知識圖譜

14 主星 × 12 宮位的完整 structured data

**可移植做法：** 補充 AI 解讀的 context，或作為「命理百科」模組的資料來源。

### 5. `lib/nihai/` — 倪師三紀學習體系

天紀（紫微斗數）/ 地紀（中醫）/ 人紀（針灸等）三套學習模組定義

**可移植做法：** 純學習材料，現有系統參考價值有限。

### 6. 51.8 萬命盤樣本數據集 ⭐ AI 訓練/RAG

| 規格 | 內容 |
|------|------|
| 數量 | **518,400 條** |
| 大小 | 5.5 GB（分 3 卷）|
| 體系 | 倪海夏《天紀》正統 |
| 內容 | 命盤 JSON + **13 主題解讀文本**（命格總覽、財運、事業、感情、健康等） |

**下載：** https://github.com/Renhuai123/ziwei-doushu/releases/tag/v3.0-samples

**可移植做法：**
- 作為 RAG 向量庫，讓 AI 解讀時可檢索相似命盤作為參考
- fine-tune 小模型（51.8萬 input-output 配對）
- 驗證 patterns.ts 修改後的 A/B 差異

---

## Enhancement 路線圖（對 ruijayfeng/ziwei）

### Phase 1：免費、低工時，立即可做

| 任務 | 方法 | 預估工時 |
|------|------|---------|
| 移植 patterns.ts | 把格局資料轉 JSON 注入 AI prompt | 2-4h |
| 移植 classics data | 加古籍引用 tab/modal | 4-6h |
| 移植 famous.ts | 加名人命盤頁面 | 2-3h |
| 移植 knowledge.ts | 擴充 AI 解讀 context | 1-2h |

### Phase 2：需下載 5.5GB 樣本數據

| 任務 | 方法 | 前置條件 |
|------|------|---------|
| RAG 向量庫 | 用 Dexie（已有）或 SQLite 本地向量搜尋 | 下載樣本 |
| 離線解讀強化 | 相似命盤 → AI 解讀更有參考依據 | 下載樣本 |

---

## 與 ruijayfeng/ziwei 對比

| 面向 | ruijayfeng/ziwei | Renhuai123/ziwei-doushu |
|------|-----------------|------------------------|
| 框架 | Vite + React 19 | Next.js 14 |
| 排盤核心 | iztro | iztro（相同）|
| 格局知識庫 | ❌ 無 | ✅ 1100+ 行 |
| 古籍資料 | ❌ 無 | ✅ 三部古籍 |
| 名人命盤 | ❌ 無 | ✅ 有 |
| 51.8萬樣本 | ❌ 無 | ✅ Release 下載 |
| 倪師體系 | 通用 | ✅ 倪海夏《天紀》正統 |
| 合盤 | ✅ 完整 | 部分 |
| 人生 K 線 | ✅ | ❌ |
| AI 多模型 | ✅ | 需自行接入 |

---

## Tags

#ziwei #astrology #nextjs #iztro #dataset #patterns #classics #enhancement-target
