---
source: "https://github.com/Madison-de-Chao/-"
author: Madison-de-Chao
clipped: 2026-06-12
tags:
  - "github/repo"
  - "nextjs"
  - "landing-page"
  - "ziwei"
  - "astrology"
  - "human-design"
---

# Rainbow Sanctuary — 命理解讀報告銷售落地頁

> **出處：** https://github.com/Madison-de-Chao/-

---

## 一句話說明

Next.js 15 單頁產品介紹網站，用來銷售《全方位命理解讀報告》——整合紫微斗數 × 八字 × 占星 × 人類圖四系統，以「人生羅盤」為中樞架構解讀章節，走「看試閱 → 選方案 → 下單/諮詢」的銷售流程。

---

## 主要功能

| 頁面/區塊 | 內容 |
|------|------|
| `/`（首頁） | Hero → About → FeatureCards → Preview → Pricing → StepsFlow → FAQ → CTA |
| `/preview` | 試閱樣章（乾隆篇／楊貴妃篇分頁滑動卡） |
| `/pricing` | 三方案定價：基本版 1680 / 完整版 2880 / 深入探討版 3980（含靈魂畫像 + 1對1） |
| `/faq` | 完整 FAQ 列表（摺疊式） |
| `/api/revalidate` | ISR 重新驗證端點（含 token 驗證） |

內容全部抽成 `data/*.json`（hero/about/features/preview/plans/flow/faq/cta），改文案不需動元件。

---

## 技術棧

- Next.js 15（App Router + SSG）+ React 19 + TypeScript
- Tailwind CSS + Framer Motion
- 部署目標：Vercel（含 ISR）
- 品牌色：琉璃紫 `#3A2E91` + 深藍 `#0C2E3E`，強調金 `#D4AF37`

規模：38 檔案 / 16,161 tokens（小型專案）。

---

## 商業模式

| 方案 | 價格 | 內容 |
|------|------|------|
| 基本版 | 1680 | 開場至特別注意章節，書面回覆 3 個問題 |
| 完整版 | 2880 | 全 14 章完整內容，書面回覆 3 個問題 |
| 深入探討版 | 3980 | 全篇章 + 靈魂畫像（需清晰臉照）+ 1對1 書面 30 分鐘 |

PROJECT_SUMMARY.md 標示「100% 完成架構，可立即部署」，但 `public/images/preview/` 試閱圖、OG 圖、實際 LINE/Email 聯絡資訊仍為待填項目。

---

## 與現有環境的相關性評估

| 面向 | 評估 |
|------|------|
| **命理主題重疊** | ✅ 高度相關——「人生羅盤」整合四系統的命名與架構，跟 [[命運羅盤開發進度\|命運羅盤]]（fate/，TST 八字 + 五行 + 性格原型）高度同主題 |
| **排盤引擎** | ❌ 不是排盤引擎，純銷售落地頁，無命理計算邏輯 |
| **行銷頁面參考** | ✅ 結構乾淨——`data/*.json` 內容與元件分離、三階定價表、試閱滑動卡的設計值得借鏡 |
| **直接整合** | ❌ 無——這是別人賣付費命理報告服務的模板，非開源工具 |

---

## 結論

不是工具或函式庫，是一個**銷售付費命理報告的落地頁模板**。對排盤引擎開發沒有直接用處，但如果未來想把「命運羅盤」或紫微斗數 App 包裝成付費報告銷售頁，這個 repo 的頁面架構（Hero/Preview/Pricing/FAQ/CTA 全部資料驅動）與定價區塊設計可以直接參考。

---

## Tags

#nextjs #landing-page #ziwei #astrology #human-design #reference
