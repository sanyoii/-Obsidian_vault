---
tags:
  - tools
  - pdf
  - markdown
  - python
date: 2026-05-27
---

# Markdown → PDF 轉換工具

> 腳本位置：`d:\Claude\md_to_pdf.py`

將 Markdown 檔案轉換為排版整潔的 PDF，支援繁體中文、日文等 CJK 字元。

---

## 使用方式

### 基本用法

開啟腳本，修改最下面的檔案清單：

```python
out = Path(r"d:\你的資料夾路徑")
for name in [
    "你的檔名（不含 .md）",
]:
    convert(out / (name + ".md"), out)
```

然後執行：

```powershell
$env:PYTHONIOENCODING="utf-8"
python d:\Claude\md_to_pdf.py
```

PDF 會輸出在與 MD 檔案相同的資料夾。

---

## 技術細節

| 項目 | 說明 |
|------|------|
| Markdown 解析 | `markdown-it-py`（已啟用 table 支援）|
| PDF 產生 | Microsoft Edge headless 列印 |
| 字型 | Microsoft JhengHei / Yu Gothic UI / Meiryo（系統字型）|
| 依賴套件 | `markdown-it-py`（`pip install markdown-it-py`）|

---

## 支援的 Markdown 語法

- 標題 H1–H6
- 表格（含交替底色）
- 程式碼區塊 / 行內程式碼
- 引言（blockquote）
- 清單（有序 / 無序）
- 水平線
- YAML frontmatter（自動略過）

---

## 注意事項

- 需要 Microsoft Edge 安裝於 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
- 執行前建議設定 `$env:PYTHONIOENCODING="utf-8"` 避免中文亂碼
- Smart2 票（EuroCity）不可退款，更改需補差價

---

## 首次使用案例

2026-05-27 用於輸出歐洲商旅 6/17 行程（中文版 + 日文版）：
- `wiki/Travel/2026-歐洲商旅/交通-0617-卡拉拉到巴塞爾.pdf`
- `wiki/Travel/2026-歐洲商旅/交通-0617-カッラーラからバーゼル（日本語）.pdf`
