---
title: Full Spectrum Soul Reading 靈魂解讀 PDF Prompt
date: 2026-10-24
tags:
  - prompts
  - 靈魂解讀
  - PDF
---

# Full Spectrum Soul Reading 靈魂解讀 PDF Prompt

> 收藏日期：2026-10-24
> 來源：使用者於本次對話提供；原始出處網址未提供。
> 狀態：原文收藏，未執行報告生成或驗證解讀內容。

## Prompt 全文

下方保留原文，包括頁碼編號、用詞與 Natalia 引文，可直接複製。

```text
請為以下個案製作一份「Full Spectrum Soul Reading 靈魂解讀」PDF 報告。
【個案資料】
生日：年 月 日
出生時間：
性別：
星座：
出生地：
【報告規格】
∙ 格式：A4 電腦版 PDF
∙ 語言：繁體書面中文（非廣東話）
∙ 工具：HTML + Playwright PDF 生成
∙ 字體：Noto Serif TC + Cormorant Garamond（Google Fonts）
【封面設計】
∙ 背景：純 CSS radial-gradient 多層疊加
∙ 封面 page div 必須設 background 純色 fallback
∙ 必須加一個 position:absolute;inset:0 的底色覆蓋層（避免白邊）
∙ 光暈效果全部寫在 background CSS 裡，不用獨立 div（避免方塊問題）
∙ 中心只加一個小白核光點 div（55px，柔和 box-shadow）
∙ 「靈魂」Noto Serif TC weight:400，「解讀」weight:200
∙ 下方個人資料欄（姓名/生日/星座/生命靈數/解讀師）
【報告結構（共15頁）】
1. 封面
2. 目錄
3. 致你的一封信
4–5. 第一章：靈數解讀
∙ 計算生命靈數、靈魂數、命運數、個性數、2026流年
∙ 每個數字深度個人化分析
6–7. 第二章：人類圖
∙ 以生日推算類型/策略/內在權威/Not-Self/Signature
∙ 天賦與陰影的實際運用
4. 第三章：靈魂原型
∙ 主原型 × 隱性原型
∙ 光明面/陰影面/靈魂家族使命
5. 第四章：七脈輪掃描
∙ 橫條 bar 圖（純 CSS）
∙ 能量失衡分析 + 具體落地練習
10–11. 第五章：內在小孩
∙ 停留年齡 + 成因分析
∙ 家族傳承模式
∙ 日常療癒練習
6. 第六章：整合
∙ ① 你現在的靈魂方向
∙ ② 卡住的位置（五系統共同根源）
∙ ③ 五個系統共同說的話
13. 靈魂維度
∙ 3D / 4D / 5D 詳細解釋（三欄卡片）
∙ SVG 人仔路線圖（人仔企喺4D，🌊或🦋圖示）
∙ 個案維度分析
14. 過渡指引
∙ 針對個案性格的3個卡點
∙ 每個卡點附具體練習
15. 致你的祝福
∙ 為個案靈魂寫的祝福詩
∙ 以下 Natalia 的話（原文照錄）：
「了解自己，從來都是第一步。
而你選擇了這一步，已經是一個進步。
每一個第一步都很重要——不要小看今天的你。
我相信由現在開始，你會感受到越來越多的變化，越來越不同的自己。
變化不一定是可怕的，反而，它是你選擇改變之後的開始。
放眼未來，溫柔前行。
— Natalia @awakeningGALS」
【設計規範】
∙ 每頁：width:210mm; height:297mm; overflow:hidden
∙ 封面文字區用 position:absolute 定位，不用 flexbox space-between
∙ 強調色跟隨星座/元素：
水象（雙魚/巨蟹/天蠍）→ 藍綠水系
火象（射手/牡羊/獅子）→ 橙金暖系
土象（摩羯/金牛/處女）→ 大地棕綠
風象（雙子/天秤/水瓶）→ 薰衣草紫灰
∙ 內頁 accent color 對應封面色調
∙ 靈魂維度 SVG 路線圖顏色配合整體色調
【技術規範】
∙ PDF 生成：playwright page.pdf(format=‘A4’, print_background=True, margin全部’0’)
∙ 字體從 Google Fonts import
∙ 所有圖表用純 CSS 或 SVG，不用外部圖片
```

## 相關連結

- [[AI-Prompts/_index|AI Prompts 收藏庫]]

