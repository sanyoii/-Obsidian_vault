# book-to-skill

> 把任何技術書籍（PDF/EPUB/DOCX/MD 等 9 種格式）轉成 Claude Code skill，讓作者「坐在你旁邊」一起工作。
>
> - Repo: https://github.com/virgiliojr94/book-to-skill
> - Stars: 3,692（2026-06）
> - 授權: MIT | Python | 2026-06-02 更新

---

## 安裝狀態

- ✅ 已安裝（2026-06-02）
- Active path: `C:\Users\sanyo\.claude\skills\book-to-skill\`
- Backup path: `d:\Claude\.claude\skills\book-to-skill\`
- Python deps: 全部已裝（見下方）

---

## 用法

```bash
# 轉換書籍（在 Claude Code session 中執行）
/book-to-skill ~/Downloads/your-book.pdf
/book-to-skill ~/books/clean-code.epub clean-code

# 轉換後使用
/your-book-slug                    # 載入核心心智模型
/your-book-slug replication        # 查詢特定主題
/your-book-slug ch05               # 直接看第五章
/your-book-slug "有哪些章節？"
```

---

## 輸出結構

安裝在 `~/.claude/skills/<slug>/`：

| 檔案 | 用途 | Token |
|------|------|-------|
| `SKILL.md` | 核心心智模型 + 章節索引 | ~4,000 |
| `chapters/ch01-*.md` | 各章節，**按需載入** | ~1,000 each |
| `glossary.md` | 術語表（附章節參照） | ~1,500 |
| `patterns.md` | 設計模式/演算法/技術 | ~2,000 |
| `cheatsheet.md` | 決策表、快查規則 | ~1,000 |

章節檔案**按需載入**——不查就不佔 context budget。

---

## 依賴工具（PDF 提取）

| 書籍類型 | 工具 | 狀態 | 速度 |
|---------|------|------|------|
| 純文字書 | `pdftotext`（poppler） | ⚠️ 需手動裝 | ⚡ 即時 |
| 純文字書 fallback | `PyPDF2 3.0.1` | ✅ 已裝 | ⚡ 即時 |
| 純文字書 fallback | `pdfminer.six 20260107` | ✅ 已裝 | ⚡ 即時 |
| **技術書（含表格/程式碼）** | **`docling 2.96.1`** | ✅ 已裝 | ~1.5s/頁 |

EPUB: `pip install ebooklib beautifulsoup4`（尚未裝）
DOCX: `python-docx 1.2.0` ✅（docling 附帶安裝）

### docling 2.96.1 附帶安裝的主要套件

| 套件 | 版本 | 用途 |
|------|------|------|
| `torch` | 2.12.0 | ML 模型推理 |
| `torchvision` | 0.27.0 | 影像處理 |
| `opencv-python` | 4.13.0.92 | 影像前處理 |
| `pypdfium2` | 5.9.0 | PDF 渲染 |
| `rapidocr` | 3.8.1 | OCR |
| `python-docx` | 1.2.0 | DOCX 支援 |
| `openpyxl` | 3.1.5 | XLSX 支援 |

### 技術書提取效能基準（103 頁 PDF）

| 方式 | 時間 | 表格 | 程式碼區塊 |
|------|------|------|---------|
| pdftotext | 0.1s | 0 | 0 |
| **docling** | **~164s** | **48** | **36** |

跑 `/book-to-skill` 時選「**technical**」會自動使用 docling。

---

## 與其他工具的定位差異

| | gbrain | NotebookLM | book-to-skill |
|--|--------|-----------|---------------|
| 最適場景 | 50+ 本書橫向搜尋 | 多書語意問答 | 1 本書深度應用 |
| 查詢方式 | embedding 向量搜尋 | 語意搜尋 | Claude 讀章節 MD 推理 |
| 位置 | 獨立工具 | 瀏覽器分頁 | 嵌入工作流程 |

---

## 設計原則

1. **密度勝於完整**：1,000 token 摘要 > 10,000 token 原文
2. **實踐者視角**：「何時用 X」而非「書中說 X」
3. **SKILL.md 前置重要**：compaction 只保留前 5,000 tokens，最重要內容優先
4. **按需載入章節**：topic index 告訴 Claude 要讀哪個檔案
5. **永遠合成，不貼原文**

---

## Tags

#tools #claude-skill #reading #knowledge-management #pdf
