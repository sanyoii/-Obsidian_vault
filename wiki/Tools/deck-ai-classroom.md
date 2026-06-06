---
tags: [AI, tools, skill, html, presentation, claude-code, social-media, infographic]
date: 2026-06-05
updated: 2026-06-06
status: installed
verdict: 自製 Skill，7 張全螢幕教育型資訊圖，IG/XHS Carousel 首選
---

# deck-ai-classroom

> 來源：自製（基於 nexu-io/html-anything 框架概念）  
> 安裝路徑：`C:\Users\sanyo\.claude\skills\deck-ai-classroom\`  
> 備份：`d:\Claude\.claude\skills\deck-ai-classroom\`

## 這是什麼？

封裝「AI 小課堂」視覺公式的 Claude Code Skill。輸入一個知識主題，輸出 7 張全螢幕 HTML 教育型資訊圖，適合截圖後上傳 Instagram / 小紅書 Carousel。

靈感來源：「小宙的AI创业学堂」KARPATHY CLAUDE.md 系列圖文（6 張，設計感強）。

## 設計規格

| 項目 | 規格 |
|------|------|
| 版型 | `100vw × 100vh` 全螢幕，無 header bar，無 footer |
| 投影片數 | **7 張**（1 張封面 + 6 張內容） |
| 字體 | `vmin` + `clamp`，響應任何螢幕大小 |
| 導航 | 左右箭頭按鈕 + 鍵盤 `←`/`→` + 底部圓點 |
| 色彩 | 紫 `#5b4fd4` / 橙 `#f59e0b` / 綠 `#10b981` / 紅 `#ef4444` |

## 7 張敘事弧

| # | 類型 | 背景 | 核心設計 |
|---|------|------|---------|
| 1 | **Title** | 深色 `#1a1a2e` | 品牌 badge + 主題大字 + 副標 |
| 2 | **Hook** | 白色 | 主標 + 雙統計數字 + 說明 |
| 3 | **Problem** | 白色 | 3 張並排問題卡片（紅色頂線） |
| 4 | **Solution** | 白色 | Before/After 色塊 + 4 條規則清單 |
| 5 | **Expansion** | 白色 | 2×2 受眾角色卡片 |
| 6 | **Options** | 白色 | 3 個比較卡（中間推薦標籤） |
| 7 | **Mindset** | 淡紫漸層 | 3 行 舊思維→新思維 對照 |

## 使用方式

```
/deck-ai-classroom 主題：[任何知識主題]
```

完整輸入格式：
```
主題：XXX
品牌名：XXX（預設「AI 小課堂」）
主色：#XXXXXX（預設 #5b4fd4）

7 張重點：
1. [Title]    主題拆兩行
2. [Hook]     驚人數字/事實
3. [Problem]  3 個問題/習慣
4. [Solution] 方法 + Before/After 數據
5. [Expansion] 打破受眾限制
6. [Options]  2-3 種選擇
7. [Mindset]  3 組舊→新思維
```

輸出檔案：`[topic-slug]-classroom.html`

## 成品範例

- `d:\Claude\karpathy-claude-md-classroom.html` — KARPATHY CLAUDE.md 完整示範

## 檔案結構

```
deck-ai-classroom/
├── SKILL.md      — 觸發指引、公式表、字體規格
├── template.html — 7 張 HTML 骨架（所有 ALLCAPS_PLACEHOLDER 可填空）
└── EXAMPLES.md   — 完整替換對照表 + 2 個快速套用主題
```

## 相關

- [[html-ppt-skill]] — 多主題 HTML 投影片，適合技術分享
- [[deck-xhs-post]] — 9 頁 3:4 小紅書風格，pastel 色調
- [[frontend-slides]] — 設計感 HTML，支援 PPT 轉換
- [[HTML投影片框架比較]] — 整體投影片工具評估
