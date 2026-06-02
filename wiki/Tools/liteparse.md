---
tags:
  - tools
  - pdf
  - parsing
  - python
  - gbrain
date: 2026-05-30
---

# LiteParse — 本地 PDF 解析工具

> 官方 repo：[run-llama/liteparse](https://github.com/run-llama/liteparse)
> 版本：`2.0.3`（2026-05-30 安裝）

LlamaIndex 官方出品的輕量 PDF 解析工具，Rust 核心 + PDFium，提供 Python/Node.js/WASM binding。**完全離線**，不依賴雲端或 API key。

---

## 安裝

```powershell
pip install liteparse
```

安裝後自動提供 `lit` CLI 指令。

---

## 使用方式

### CLI

```powershell
# 解析單一 PDF（輸出純文字）
lit parse document.pdf

# 輸出 JSON（含 bounding box 座標）
lit parse document.pdf --format json -o output.json

# 批次解析整個資料夾
lit batch-parse ./brain-docs ./output

# 只解析特定頁
lit parse document.pdf --target-pages "1-5,10"

# 關閉 OCR（只用 PDFium 文字層，速度最快）
lit parse document.pdf --no-ocr

# 從 URL/stdin 解析
curl -sL https://example.com/report.pdf | lit parse -

# 產生頁面截圖（供 LLM 視覺分析）
lit screenshot document.pdf -o ./screenshots
lit screenshot document.pdf --target-pages "1,3,5" -o ./screenshots
lit screenshot document.pdf --dpi 300 -o ./screenshots
```

### Python API

```python
from liteparse import LiteParse

parser = LiteParse(
    ocr_enabled=True,        # 預設開啟 Tesseract OCR
    max_pages=1000,
    quiet=False,
)

# 解析檔案
result = parser.parse("document.pdf")
print(result.text)

# 存取結構化資料（含 bounding box）
for page in result.pages:
    print(f"Page {page.page_num}: {len(page.text_items)} text items")

# 解析 bytes（適合 web 上傳或下載後的 PDF）
with open("document.pdf", "rb") as f:
    result = parser.parse(f.read())

# 產生截圖
screenshots = parser.screenshot("document.pdf", page_numbers=[1, 2, 3])
for s in screenshots:
    with open(f"page_{s.page_num}.png", "wb") as f:
        f.write(s.image_bytes)
```

---

## 支援格式

| 格式 | 需求 |
|------|------|
| PDF | 內建，零依賴 |
| DOCX / XLSX / PPTX | 需安裝 LibreOffice |
| ODT / ODS / ODP | 需安裝 LibreOffice |
| PNG / JPG / TIFF | 需安裝 ImageMagick |

---

## 輸出格式

| 格式 | 說明 |
|------|------|
| `text`（預設）| 保留排版的純文字 |
| `json` | 結構化 JSON，含每個文字區塊的 bounding box 座標 |
| Screenshot | 每頁 PNG，供 LLM 視覺理解用 |

---

## 技術細節

| 項目 | 說明 |
|------|------|
| 核心語言 | Rust + PDFium C library |
| OCR 引擎 | 內建 Tesseract；或接 EasyOCR / PaddleOCR HTTP server |
| Platform | Windows / macOS（Intel/ARM）/ Linux |
| License | Apache 2.0 |

---

## 限制

- 複雜排版（密集表格、多欄、掃描圖、手寫）效果不佳 → 建議用 LlamaParse 雲端版
- DOCX/XLSX/PPTX 需另裝 LibreOffice
- Scanned PDF（全圖）的 OCR 品質不如 Chandra OCR（GPU 版）

---

## 使用場景

| 場景 | 指令 |
|------|------|
| `brain-docs/` 批次轉 Markdown 再匯 gbrain | `lit batch-parse ./brain-docs ./output` |
| 履歷 PDF 解析（careerbot） | `parser.parse("resume.pdf")` |
| AI pipeline 文件預處理 | Python API + `result.pages` |
| 頁面截圖給 LLM 視覺分析 | `lit screenshot doc.pdf -o ./shots` |

---

*相關：[[video-to-brain]] · [[gbrain-inbox]]*
