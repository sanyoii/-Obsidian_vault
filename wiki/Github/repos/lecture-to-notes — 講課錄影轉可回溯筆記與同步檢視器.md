---
source: "https://github.com/drpwchen/lecture-to-notes"
author: "drpwchen (台灣復健科醫師)"
stars: "81"
clipped: 2026-08-06
tags:
  - "github/repo"
  - "claude-code/skill"
  - "obsidian"
  - "transcription"
  - "note-taking"
---

# lecture-to-notes — 講課錄影轉可回溯筆記＋同步 HTML 檢視器

> **drpwchen/lecture-to-notes** | ⭐ 81（2026-08-06，建立僅 4 天） | 🍴 19 | 📝 MIT
> "Lecture recordings → structured grounded notes + a synced HTML viewer. Local GPU pipeline (Whisper ASR · slide extraction · OCR · VLM signals · capture-time alignment). Claude Code skill + plain CLI."
> 部落格長文：https://drpwchen.com/posts/lecture-to-notes/

---

## 一句話說明

台灣復健科醫師 drpwchen 開源的「講課錄影→結構化筆記」管線：把一場課的影片／錄音／投影片照片／PDF 講義原樣丟進資料夾，本機 GPU 跑完 Whisper 轉錄、投影片抽取去重、OCR、VLM 語意判讀、多來源對時，LLM 只在最後一步根據已組好的證據寫總整理。產出三種形態：同步 HTML 檢視器（影片＋逐字稿＋總整理同一頁、雙向連動）、Obsidian vault markdown、PDF。設計目標不是「摘要影片」而是**可回溯（traceability）**——筆記裡每句話都能指回逐字稿的時間點與當時螢幕上那張投影片。同時是 Claude Code skill 與純 CLI。作者場景：徒手治療、超音波這類「知識藏在動作裡」、現場滿是腳架但沒人回去看完錄影的課。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 81（4 天，臉書貼文引爆，台灣社群有機成長） |
| Forks | 19 |
| 主要語言 | Python（644KB；JS 26KB + CSS 17KB 為檢視器 UI） |
| 授權 | MIT |
| 建立時間 | 2026-08-02 |
| 首個公開版本 | v0.6.x 起跳——公開前已私下迭代多輪，`reference/decisions.md` 滿是 post-mortem |
| Topics | claude-code, faster-whisper, lecture-notes, note-taking, obsidian, ocr, transcription, whisper |
| 是否 Archived | 否 |

單人專案（bus factor = 1），4 天新齡下屬正常。

---

## 原始碼結構

| 指標 | 數值 |
|------|------|
| 總檔案數 | 73（40 支 Python 腳本） |
| 總 Tokens | 427,089（repomix） |
| 最大檔 | `data/real_words.txt` 173,751 tokens（40.7%）——ASR 疑字比對詞庫 |
| 次大 | `scripts/export_web.py` 19,742（4.6%）——HTML 檢視器產生器 |

四成 token 是詞庫資料檔；扣掉 data/ 後真正的程式碼＋文件約 24 萬 tokens。

---

## 核心功能

- **「手上有什麼就帶什麼來」路由**：`route_inputs.py` 前門分類資料夾（影片／純音檔／PDF 講義／散裝照片／N-up 講義／多講題工作坊），印出執行計畫與需要人回答的問題。**plan-only，不執行不寫檔**。
- **本機優先成本結構**：Whisper（faster-whisper）、抽幀、OCR（RapidOCR→Surya 兩級）、VLM（ollama minicpm-v:8b）全本機，**LLM 零 token 直到最後合成**。中間產物 `slides_grounded.json` 獨立可讀——不跑合成也拿到逐字稿＋去重投影片集＋對應關係。
- **同步 HTML 檢視器（招牌）**：單一自包含 HTML——影片播到哪筆記自動高亮、點時間戳影片跳過去、三種閱讀模式、離線可分享（資料夾寄人雙擊就開）。
- **三種耐久形態**：HTML＋Obsidian vault markdown（wikilink 重寫、support 資料夾可直接當 vault 開）＋PDF。
- **逐字稿永不自動改字**：兩版自動改錯字「實作→量測→全部退役」；可疑詞只標記——「每個標記是一個問題，不是一個替換，因為改錯了你永遠不會發現」。
- **對時哲學**：檔案拍攝時間是**假說**，重疊音訊交叉比對（xcorr）才是**證據**；差 >5 秒標 conflict 停下來問人，絕不自動修正——擋「44 分鐘錯位但每頁輸出看起來都正常」的災難。
- **VLM 補 OCR 盲區**：純 OCR 把流程圖／超音波影像判成空白頁（作者實案：一場演講 11 張流程圖全漏）；VLM 只給語意訊號（圖型＋非文字資訊密度），不做 OCR。
- **缺件大聲說，不悄悄降級**：可選依賴沒裝→功能關掉並明講少了什麼——「悄悄降級產生的是『錯的輸出』而不是『少的輸出』，那是最貴的一類 bug」。
- **PHI 紅線**：含病人可識別內容→只准本機轉錄，禁 Groq offload。

---

## 技術架構

```
material folder（影片/音檔/PDF/照片，原樣）
        │
  route_inputs.py ── 分類＋印計畫（plan-only）
        │
  ┌─────┴──────────────┐
  │ transcribe_video.py │ 投影片來源三路：
  │ (faster-whisper,    │  extract_slides.py（抽幀+感知去重）
  │  本機 GPU)          │  build_slides_from_pdf.py（PDF 渲染+內嵌文字）
  │                     │  build_slides_from_images.py（散裝照片）
  │                     │        ↓
  │                     │  quick_ocr.py（B：便宜 OCR 分流）
  │                     │  dedup_semantic.py（C：canonical slides）
  │                     │  ocr_surya.py（B2：高品質 OCR，獨立 venv 子行程）
  │                     │  vlm_signals.py（D：ollama minicpm-v 語意訊號）
  └─────┬──────────────┘        ↓
        └────→ ground_slides.py（E：投影片↔口語對應）
                     ↓
          slides_grounded.json（中間真相，獨立可讀）
                     ↓
        Stage F 合成（LLM 只在這裡：tier pass → write pass）
                     ↓
  ┌──────────────┬─────────────────┬──────────┐
  export_web.py   finalize_to_vault  audit_note.py
  (同步 HTML)     (Obsidian vault)   (筆記驗收)
```

（語法格式：ASCII 架構圖）

| 層次 | 技術 |
|------|------|
| 轉錄 | faster-whisper 本機 GPU（8GB 卡實測甜蜜點 `--batch-size 3 --beam-size 10`）；無 NVIDIA 退階 `--engine groq` |
| OCR | RapidOCR → Surya（**必須獨立 venv** 防 torch 衝突，子行程呼叫）；`ocr_bench/` 附 A/B 測試架 |
| VLM | ollama + minicpm-v:8b（僅語意訊號） |
| 對時 | 音訊互相關＋感知雜湊（ImageHash）＋PyMuPDF |
| 輸出 | 自包含 HTML（UI 資產與產生器分離）／Obsidian markdown／pandoc PDF |
| 系統依賴 | ffmpeg/ffprobe、ollama、pandoc；Python 3.12 |
| 品質工程 | `audit_note.py` 筆記驗收、CI secret-scan、`sync_from_skill.py` 私有 skill→公開 repo 單向白名單投影 |

### SKILL.md 十條硬規則（治理成熟度遠超新專案預期）

①先問講者語言（猜錯 Whisper 把腔調英文幻聽成中文）②不准為趕時間跳過 VLM/grounding——**「使用者沒設 deadline，不要自己發明一個」**③永不自動改逐字稿 ④token-collapse 自動重轉錄不可繞過 ⑤VLM 不做 OCR ⑥GPU 工作序列化 ⑦8GB 卡參數上限（超過實測 `0xC0000005` crash）⑧批次派工拆兩個 subagent（GPU 長等待讓單一 subagent 彈跳燒 30+ 分鐘）⑨**素材排序用真實拍攝時間，不用檔名不用議程表**（攝影機計數器跨天重置；議程第一天早 25 分第二天晚 35 分）⑩PHI 紅線。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | **直接命中**——原生輸出 Obsidian 式 vault，與本環境「課程影片→gbrain/wiki」流水線（水球 47 支影片入庫，見 [[水球流軟體設計模式精通之旅/水球流OADP|水球課程 wiki]]）同一問題空間，投影片對時＋可回溯比當時自製流程深。 |
| **Claude Code** | 本身就是 Claude Code skill（SKILL.md＋reference/ 漸進揭露）；十條硬規則、`audit_note.py` 驗收、「證據先於合成」與本環境 R17／制度哲學高度同族。 |
| **Automation** | 純 CLI 可排程；但**本機無 NVIDIA GPU（Intel Iris Xe，`nvidia-smi` 實測不存在）**——本機 Whisper/VLM 不可行，管線核心價值（貴的事全本機跑）發揮不出來。 |

---

## 安裝建議

⏳ 觀望 — 工具品質與理念契合度都高，但**本機硬體不配**（無 NVIDIA，VLM 純 CPU 慢到不可用），且目前無課程錄影積壓（水球已入庫完畢）。裝了是佔 skill 清單預算的閒置件。

**升級條件（→ ✅ 裝）**：①出現新的課程影音要入庫，**且** ②換到 ≥8GB NVIDIA GPU 機器，或實測 Groq 轉錄＋CPU VLM 端到端時間可接受。兩條件都滿足再裝。

**放棄條件（→ ❌ 不裝）**：轉 archived／停更超過 6 個月且相容性 issue 無人理／出現 CPU/iGPU 支援更好的同功能替代品。

**即使不裝也值得抄的三樣**：
1. `sync_from_skill.py` 的 manifest 白名單投影模式——私有 skill 發佈成公開 repo，每個發佈路徑顯式列名（新私檔不會自動外洩）、transform 錨點找不到就 ABORT（防靜默漏轉換）、`--check` 乾跑抓「有人直接改了 repo 副本」
2. 「檔案時間是假說、交叉比對才是證據、衝突停下來問人」的多來源對時協議
3. 「悄悄降級是最貴的 bug」的依賴治理——連 requirements.txt 註解都在講設計理由與退役歷史

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[水球流軟體設計模式精通之旅/水球流OADP|水球課程 wiki]] — 本環境既有的課程影片入庫成果（47 支影片），lecture-to-notes 是同問題空間的「深度版」流水線
- [[Tools/gbrain-使用指南|gbrain 使用指南]] — 入庫後的語意檢索層
