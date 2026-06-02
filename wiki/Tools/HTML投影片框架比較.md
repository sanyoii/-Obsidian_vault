---
tags: [AI, tools, evaluation, html, presentation, framework]
date: 2026-05-30
status: evaluated
---

# HTML 投影片框架比較

> 評估日期：2026-05-30

## 評估範圍

6 個 HTML 投影片相關工具的比較分析。

## 快速結論

| 工具        | 類型   | 推薦     | 備註                 |
| --------- | ---- | ------ | ------------------ |
| reveal.js | 框架   | ✅ 業界標準 | 最成熟，自己寫時用          |
| shower    | 框架   | 條件性    | 極簡，功能遠不如 reveal.js |
| WebSlides | 框架   | 條件性    | 行銷/視覺故事型投影片        |
| deck.js   | 框架   | ❌ 已棄坑  | jQuery 依賴，多年未更新    |
| decktape  | 匯出工具 | 條件性    | HTML→PDF，有此需求才裝    |

## 詳細分析

### reveal.js v6.0.1（hakimel）
- **定位**：業界最成熟的 HTML 投影片框架（2011-2026）
- **功能**：巢狀幻燈片、Markdown、Auto-Animate、PDF 匯出、Speaker Notes、LaTeX、語法高亮
- **安裝**：`npm install reveal.js` 或 CDN
- **授權**：MIT
- 171 個檔案，文件完整
- 有付費視覺編輯器 slides.com

### shower（shower/shower）
- **定位**：純 HTML/CSS/Vanilla JS，極簡主義
- **功能**：鍵盤友善、PDF 列印、CLI 工具
- **安裝**：`npm install -g @shower/cli && shower create`
- **內建主題**：Material Design、Ribbon
- 比 reveal.js 簡單，適合不需要複雜動畫的場合

### WebSlides
- **定位**：視覺故事框架（Landing Page + 投影片混合）
- **功能**：40+ 元件、垂直捲動、自動播放、swipe
- 適合行銷/視覺型內容，不適合一般工作簡報
- 最後更新已多年，社群較小

### deck.js — 不建議
- jQuery + Modernizr 依賴（2010 年代技術棧）
- 多年未維護

### decktape — 工具，非框架
- 用 Puppeteer 把 reveal.js / Shower / impress.js 等匯出成 PDF
- 有此需求才安裝：`npm install -g decktape`
- 5.8MB 包含 Chromium

## 相關 Skills

- [[html-ppt-skill]] — 36 主題、47 動畫、Presenter Mode
- [[frontend-slides]] — 30 設計師模板、PPT 轉換、反 AI 濫調哲學
