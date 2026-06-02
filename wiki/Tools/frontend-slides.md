---
tags: [AI, tools, skill, html, presentation, claude-code]
date: 2026-05-30
status: installed
verdict: 已安裝，設計哲學強，PPT 轉換是獨有優勢
---

# frontend-slides 評估報告

> 來源：https://github.com/zarazhangrui/frontend-slides  
> 安裝路徑：`C:\Users\sanyo\.claude\skills\frontend-slides\`  
> 安裝方式：`git clone`

## 這是什麼？

Claude Code AgentSkill，輸出純靜態 HTML/CSS/JS 投影片（零依賴、無 build step）。
設計哲學以「反 AI 濫調」為核心，搭配視覺選樣工作流。

## 核心特色

### 1. 反 AI 濫調（Anti-AI-Slop）
明確拒絕 purple-gradient-on-white 等千篇一律的 AI 輸出風格。
要求使用：獨特字型、有個性的配色、脈絡相符的背景處理。

### 2. Show, Don't Tell 工作流
不問你「想要什麼風格」，而是先生成 3 個視覺預覽讓你選。

### 3. Bold Template Pack — 30 套設計師風格模板

| 模板 | 風格 |
|------|------|
| 8-bit-orbit | 像素藝術 |
| biennale-yellow | 藝術雙年展 |
| sakura-chroma | 日系 |
| retro-windows | 復古 Windows |
| retro-zine | 地下雜誌 |
| scatterbrain | 解構主義 |
| cobalt-grid | 深藍網格 |
| monochrome | 黑白極簡 |
| editorial-forest | 森系編輯 |
| neo-grid-bold | 新格線粗體 |
| ... | 共 30 套 |

### 4. PPT → HTML 轉換
提取 .pptx 中的文字、圖片、備注，轉為網頁版投影片。

### 5. 技術規格
- 固定 1920×1080 stage，uniform scale，不 reflow
- `viewport-base.css` 統一基底
- 支援 `prefers-reduced-motion`
- 附 PDF 匯出 script（`scripts/export-pdf.sh`）
- 附 deploy script（`scripts/deploy.sh`）

## 與 html-ppt-skill 比較

| | html-ppt-skill | frontend-slides |
|-|---------------|----------------|
| 主題數 | 36 個主題 | 30 套設計師模板 |
| 動畫 | 47 個 | animation-patterns 文件 |
| PPT 轉換 | ❌ | ✅ |
| Presenter Mode | ✅ | ❌ |
| 中文支援 | ✅ 小紅書版型 | ❌ |
| 設計哲學 | 豐富 + 工具多 | 獨特 + 反 AI 濫調 |

## 裁決

**已安裝，與 html-ppt-skill 互補。**
需要 PPT 轉換或更有個性設計風格時優先選用。

## 相關

- [[html-ppt-skill]] — 競品，功能更豐富，有中文支援
- [[GordenPPTSkill]] — PPTX 輸出
- [[HTML投影片框架比較]] — 底層框架評估
