---
tags: [AI, tools, evaluation, presentation, ranking, pptx, html-slides]
date: 2026-06-06
status: evaluated
source: 海趣社 開源AI PPT項目排行榜（GitHub Stars）
---

# 開源 AI PPT 工具排行榜評估 2026

> 來源：海趣社 GitHub Stars 排行（2026-06）  
> 評估者：Claude Code + repomix 深度分析  
> 評估日期：2026-06-06

---

## TL;DR 行動清單

| 優先級 | 工具 | 動作 | 原因 |
|--------|------|------|------|
| ⭐⭐⭐ | ppt-master | **安裝** | 唯一能輸出真正可編輯 PPTX 的 Claude Code Skill |
| ⭐⭐⭐ | frontend-slides | **已裝，更新** | 模板從 30 升至 34，中文支援確認 ✅ |
| ⭐⭐ | slidev | 留存，需要時裝 | 技術演講 / 代碼高亮場景 |
| ⭐⭐ | open-slide | 參考架構 | React for Agents 設計模式 |
| ⭐ | presenton | 留存 | 完全離線部署需求時再考慮 |
| — | 其餘 5 個 | 跳過 | 功能重疊、Stars 少、或流程不符 |

---

## TOP 5（明星阵营）

### #1 slidev ★ 47K
> `slidevjs/slidev` — Markdown 寫投影片，Vite 熱更新

**類型**：開發者工具（需 Node.js 環境）

**核心特色**：
- Markdown → 投影片，Vite 熱更新
- 嵌入 Vue 元件、代碼高亮、Live Coding
- 支援 LaTeX、Mermaid、UnoCSS
- Presenter Mode + 錄影 + 繪圖功能
- VS Code 擴充套件

**安裝**：`npm init slidev@latest`

**評估**：對技術演講場景是黃金標準。但你的內容多是教育/設計類，目前工作流（Claude Code skill → HTML）更快。**有技術分享需求時再裝**。

**Repo**：https://github.com/slidevjs/slidev

---

### #2 ppt-master ★ 24.7K 🔥
> `hugohe3/ppt-master` — SVG→DrawingML 管線，輸出原生可編輯 PPTX

**類型**：Claude Code Skill（直接安裝！）

**核心特色**：
- **本身就是 Claude Code Skill**：`skills/ppt-master/SKILL.md` 直接可用
- 輸入支援：PDF / DOCX / URL / Markdown → PPT
- 輸出：**真正可編輯的 DrawingML PPTX**（不是截圖）
- 內建：品牌 preset、圖表模板、LaTeX、AI 圖片生成
- 超大圖示庫（tabler-outline，數千個 SVG）
- 複雜工作流：9 步驟串行管線，15+ Python scripts

**安裝路徑**：`C:\Users\sanyo\.claude\skills\ppt-master\`

**為什麼重要**：所有其他 HTML 工具（html-ppt、frontend-slides）輸出的都是網頁版。只有 ppt-master 能讓你把 Claude 生成的 PPT 拿去 PowerPoint 繼續編輯。

**Repo**：https://github.com/hugohe3/ppt-master

---

### #3 frontend-slides ★ 20.5K 🔥
> `zarazhangrui/frontend-slides` — Claude Code Plugin，零依賴動畫 HTML 演示

**類型**：Claude Code Plugin（`/plugin marketplace add` 一行安裝）

**核心特色**：
- 34 套精心設計的視覺主題（見下表）
- Anti-AI-Slop 哲學：拒絕 Inter/Roboto、紫色漸層等 AI 陳腔濫調
- Show, Don't Tell：先生成預覽讓你選風格
- PPT → HTML 轉換（Mode B）
- **中文 CJK 字體 CDN 支援** ✅（之前評估漏記）
- 固定 1920×1080 stage，uniform scale

**34 套模板精選**：

| 模板 | 風格 |
|------|------|
| 8-bit-orbit | 像素藝術 |
| biennale-yellow | 藝術雙年展黃 |
| sakura-chroma | 日系櫻花 |
| retro-windows | 復古 Windows |
| retro-zine | 地下雜誌 |
| neo-grid-bold | 新格線粗體 |
| scatterbrain | 解構主義 |
| editorial-forest | 森系編輯 |
| cobalt-grid | 深藍網格 |
| broadside | 版面大標 |
| signal | 信號風格 |
| vellum | 羊皮紙質感 |
| creative-mode | 創意模式 |
| ... | 共 34 套 |

**安裝**：Plugin 方式安裝，或直接 clone 複製 skills 資料夾

**Repo**：https://github.com/zarazhangrui/frontend-slides

---

### #4 banana-slides ★ 14.8K
> `Anionex/banana-slides` — Gemini 原生驅動，一句話生成 PPT

**類型**：Web App（Docker 部署）

**核心特色**：
- 一句話 / 大綱 / 頁面描述 → PPT
- Gemini / OpenAI 多 provider 支援
- 上傳模板圖片 + 素材智能解析
- 口頭修改指定區域
- 一鍵導出 PPTX / PDF

**評估**：「Vibe PPT」概念最純粹的實現。需要 Docker + API Key，不是 Claude Code skill，與現有工作流不符。**概念留存，架構參考**。

**Repo**：https://github.com/Anionex/banana-slides

---

### #5 presenton ★ 7.9K
> `presenton/presenton` — 本地優先 AI 演示，Docker + Ollama 離線部署

**類型**：Web App（Docker + Ollama）

**核心特色**：
- 完全本地運行，隱私優先
- Docker + Ollama 支援（llama3.2 等本地模型）
- 多模型支援（OpenAI compatible API）
- 匯出 PPTX / PDF
- Apache 2.0 授權

**評估**：如果有完全離線 / 隱私需求，這是最成熟的選項。現在不需要，**留存備用**。

**Repo**：https://github.com/presenton/presenton

---

## RANK 6-10（潜力新秀）

### #6 html-ppt-skill ★ 5.6K
> AI Agent HTML PPT Studio，36主题+31布局+47动画

**評估**：與現有 `html-ppt` skill 高度重疊，**跳過**。

---

### #7 PptxGenJS ★ 5.5K
> `gitbrent/PptxGenJS` — JS 程式化生成 OOXML PowerPoint

**類型**：JS Library（非 AI，非 Skill）

**評估**：低階工具，適合寫自動化 PPTX 生成腳本。如果需要在 CI/CD 或 Node.js 環境自動生成標準化 PPTX，才考慮。**參考備用**。

**Repo**：https://github.com/gitbrent/PptxGenJS

---

### #8 open-slide ★ 4.8K 👀
> `1weiho/open-slide` — 專為 AI Agent 設計的 React 幻燈片框架

**類型**：React 框架（需要 Node.js）

**核心特色（架構值得學習）**：
- 每張投影片 = 獨立 React component，1920×1080 固定 canvas
- 自然語言 → Agent 寫 React → open-slide 渲染
- 有 `create-slide` SKILL.md 讓 Claude Code Agent 直接使用
- `npx @open-slide/cli init my-deck && npm run dev`
- 有示範投影片：claude-code-intro、harness-engineering

**評估**：架構設計思路（Agent 寫 React component）有參考價值。但需要 React 環境，與你的零依賴 HTML 路線不同。**架構參考**。

**Repo**：https://github.com/1weiho/open-slide

---

### #9 Presentation-Ai ★ 2.8K
> Gamma 開源替代，多模型後端，38主題+實時流式生成

**評估**：Stars 偏少，功能沒特別突出，**跳過**。

---

### #10 Ai-to-pptx ★ 1.4K
> 基於 DeepSeek 的在線 PPTX 生成，大綱→模板→導出

**評估**：DeepSeek 限定，Stars 最少，**跳過**。

---

## 工具對比矩陣

| 工具 | 輸出格式 | 輸入來源 | Claude Code | 需要服務 | 中文 | 推薦度 |
|------|----------|----------|-------------|----------|------|--------|
| **ppt-master** | ✅ 原生 PPTX | PDF/DOCX/URL/MD | ✅ Skill | Python only | ✅ | ⭐⭐⭐⭐⭐ |
| **frontend-slides** | HTML | 文字/PPTX | ✅ Plugin | ❌ | ✅ CDN | ⭐⭐⭐⭐ |
| **html-ppt-skill** | HTML | 文字 | ✅ Skill | ❌ | ✅ | ⭐⭐⭐ |
| **slidev** | HTML/PDF | Markdown | ❌ | Node.js | 條件性 | ⭐⭐⭐ |
| **presenton** | PPTX/PDF | 文字 | ❌ | Docker | ✅ | ⭐⭐ |
| **banana-slides** | PPTX/PDF | 文字 | ❌ | Docker+API | ✅ | ⭐⭐ |
| **open-slide** | HTML | React | ❌ | Node.js | 條件性 | ⭐⭐ |

---

## 相關筆記

- [[frontend-slides]] — 已安裝，設計哲學強
- [[html-ppt-skill]] — 已安裝，功能豐富
- [[HTML投影片框架比較]] — 底層框架比較（reveal.js 等）
- [[ppt-master]] — 待建，安裝後新增
