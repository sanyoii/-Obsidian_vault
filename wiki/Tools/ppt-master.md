---
tags: [AI, tools, skill, pptx, presentation, claude-code, python]
date: 2026-06-06
status: installed-fully-ready
install-path: C:\Users\sanyo\.claude\skills\ppt-master\
repo-path: D:\Claude\ppt-master\
python-deps: 已全部安裝（python-pptx, PyMuPDF, flask, Pillow, edge-tts, svglib, google-genai 等）
verdict: 唯一能輸出原生可編輯 PPTX 的 Claude Code Skill；支援 PDF/DOCX/URL 輸入；Python deps 2026-06-06 確認裝完，立即可用
---

# ppt-master 評估與安裝紀錄

> 來源：https://github.com/hugohe3/ppt-master  
> Stars：★ 24.7K（2026-06）  
> 安裝日期：2026-06-06  
> 安裝路徑：`C:\Users\sanyo\.claude\skills\ppt-master\`  
> Repo 備份：`D:\Claude\ppt-master\`（shallow clone）

---

## 這是什麼？

Claude Code Skill，把任意來源文件（PDF/DOCX/URL/Markdown）轉成**真正可編輯的 PPTX**。

其他 HTML 投影片工具（html-ppt、frontend-slides）輸出的是網頁。ppt-master 輸出的是 PowerPoint native DrawingML — 每個元素都能在 PPT 裡繼續編輯、拖動、改顏色。

---

## 核心 Pipeline

```
Source Document
    ↓ 轉成 Markdown
Step 1: 來源處理（PDF/DOCX/URL→MD）
    ↓
Step 2: 建立專案（project_manager.py）
    ↓ ⛔ BLOCKING：使用者確認
Step 3: 選模板（可選）
    ↓
Step 4: Strategist（AI 設計策略師 — 生成 spec_lock.md）
    ↓ ⛔ BLOCKING：8 項確認（風格/頁數/版型/色彩...）
Step 5: 圖片生成（可選，AI 生成插圖）
    ↓
Step 6: Executor（主 Agent 逐頁手寫 SVG — 不可委派 Sub-Agent）
    ↓ Live Preview（瀏覽器即時預覽）
Step 7: 品質檢查（svg_quality_checker.py）
    ↓
Step 8: Post-processing（finalize_svg.py）
    ↓
Step 9: 匯出 PPTX（svg_to_pptx.py → DrawingML）
```

**重要限制**：
- Step 6 必須由主 Agent 端對端完成，**禁止委派 Sub-Agent 生成 SVG**
- 每頁前必須重讀 `spec_lock.md`，防止 context compression 飄移
- 不能用 Python script 批量生成 SVG（每頁必須 Agent 手寫）

---

## 支援輸入格式

| 格式 | 腳本 |
|------|------|
| PDF | `scripts/source_to_md/pdf_to_md.py` |
| DOCX/HTML/EPUB | `scripts/source_to_md/doc_to_md.py` |
| Excel | `scripts/source_to_md/excel_to_md.py` |
| PowerPoint | `scripts/source_to_md/ppt_to_md.py` |
| 網頁（含微信） | `scripts/source_to_md/web_to_md.py` |
| Markdown / 文字 | 直接輸入 |

---

## 內建資源

- **品牌 Preset**：`templates/brands/brands_index.json`（色彩/字型/Logo/Tone）
- **版型模板**：`templates/layouts/layouts_index.json`
- **圖表模板**：`templates/charts/charts_index.json`
- **圖示庫**：`templates/icons/tabler-outline/`（數千個 SVG）

---

## 特殊 Workflow（主 Pipeline 外）

| Workflow | 用途 |
|----------|------|
| `topic-research` | 只有主題名稱時，先上網研究再進管線 |
| `template-fill` | 給已有 PPTX 模板 + 素材，直接填內容 |
| `create-template` | 新建版型模板 |
| `create-brand` | 新建品牌 Preset |
| `live-preview` | 瀏覽器即時預覽（自動啟動） |
| `visual-review` | 視覺品質審查（使用者明確要求時才跑） |

---

## Python 依賴

```bash
pip install -r skills/ppt-master/requirements.txt
```

> Windows 注意：如果 `python3` 找不到，用 `python` 替代

---

## 與其他工具比較

| | ppt-master | frontend-slides | html-ppt-skill |
|-|------------|----------------|----------------|
| 輸出格式 | **原生 PPTX** | HTML | HTML |
| 可在 PPT 繼續編輯 | ✅ | ❌ | ❌ |
| 輸入支援 | PDF/DOCX/URL/MD | 文字/PPTX轉換 | 文字 |
| 中文 | ✅ | ✅ CDN | ✅ |
| 複雜度 | ★★★★★ 9步驟 | ★★★ | ★★ |
| Claude Code Skill | ✅ 直接裝 | ✅ Plugin | ✅ |
| 需要 Python | ✅ | ❌ | ❌ |

---

## 觸發方式

說「create PPT」、「make presentation」、「生成PPT」、「做PPT」、「制作演示文稿」即可觸發。

---

## 相關筆記

- [[frontend-slides]] — HTML 投影片，已安裝
- [[html-ppt-skill]] — HTML 投影片，已安裝
- [[AI-PPT排行榜2026]] — 10 個 AI PPT 工具完整評估
- [[HTML投影片框架比較]] — 底層框架比較（reveal.js 等）
