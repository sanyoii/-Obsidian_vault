---
tags:
  - tools
  - video
  - transcription
  - gbrain
  - python
date: 2026-05-27
---

# 影片轉文字 → gbrain 匯入工具

> 腳本位置：`D:\Claude\tools\video-to-brain.py`
> 輔助腳本：`D:\Claude\tools\cleanup-gemini-files.py`（清除 Gemini File API 殘留）

將本機或 Google Drive 的課程影片批次轉錄成 Markdown，並匯入 gbrain 個人知識腦。

---

## 使用方式

```powershell
# 從本機資料夾轉錄
python D:\Claude\tools\video-to-brain.py --source "D:\路徑\影片資料夾"

# 從 Google Drive 下載後轉錄
python D:\Claude\tools\video-to-brain.py

# 略過下載，只轉錄已存在的影片
python D:\Claude\tools\video-to-brain.py --skip-dl

# 重建 manifest（比對既有 transcript ↔ 影片，不觸發轉錄）
python D:\Claude\tools\video-to-brain.py --rebuild-manifest --source "D:\路徑\影片資料夾"
```

轉錄完成後，手動執行 gbrain import 匯入（逐字稿在 `infra/brain-docs/` 下，不會被 `/compile` 自動帶進 gbrain）：

```powershell
gbrain import "D:\Claude\infra\brain-docs\course\transcripts"
gbrain embed --stale
```

---

## 流程

1. 讀取影片（本機資料夾 或 Google Drive 下載）
2. 每支影片：先找字幕（sidecar `.srt` / `.vtt` 或嵌入字幕軌）→ 找不到才呼叫 Gemini 轉錄
3. 輸出 Markdown 至 `D:\Claude\infra\brain-docs\course\transcripts\`
4. 提示執行 `gbrain import`

---

## 技術細節

| 項目 | 說明 |
|------|------|
| 轉錄模型 | `gemini-2.5-flash`（Google Gemini File API）|
| 輸出格式 | Markdown（`.md`），存至 `infra/brain-docs/course/transcripts/`|
| 依賴工具 | `ffprobe`（ffmpeg）、`google-generativeai`、`gbrain` CLI |
| 字幕優先 | 有 `.srt`/`.vtt` 就直接用，省 API 呼叫 |
| 冪等去重 | `_manifest.json`：以「來源影片相對路徑」為 key，已記錄的影片跳過不重轉 |

---

## 路徑設定（腳本內）

| 設定 | 預設值 |
|------|--------|
| `BASE_DIR` | `D:\Claude\infra\brain-docs\course` |
| `DOWNLOAD_DIR` | `BASE_DIR\videos` |
| `TRANSCRIPT_DIR` | `BASE_DIR\transcripts` |
| `MANIFEST_PATH` | `TRANSCRIPT_DIR\_manifest.json` |
| `GEMINI_MODEL` | `gemini-2.5-flash` |

---

## Manifest 機制

腳本用 `transcripts/_manifest.json` 追蹤「哪些影片已轉錄」，避免重複消耗 Gemini API。

- **Key**：來源影片的相對路徑（相對於 `--source` 根目錄）
- **Value**：`{ "transcript_file": "slug.md", "source": "gemini|sidecar-subtitle|...", "date": "YYYY-MM-DD" }`
- **輸出檔名**：由影片相對路徑衍生的穩定 slug（非列舉序號），同一支影片每次對到同一個檔名
- **Backfill**：首次執行時若偵測到既有 transcript 但無 manifest，自動比對課號回填；亦可手動 `--rebuild-manifest`
- **保守策略**：比對不到的既有 transcript 保留不動、不刪除、不覆寫

---

## 使用紀錄

| 日期 | 課程 | 影片數 | 狀態 |
|------|------|--------|------|
| 2026-05-23 | 軟體設計模式精通之旅（水球軟體學院）| 42 支唯一影片 | ✅ 全部完成，已匯入 gbrain |
| 2026-06-29 | 架構修正 + 補轉 5 支 | 47 支（含新增轉接器/代理/複合/單體/抽象工廠）| 🔧 BASE_DIR 修正 + manifest 冪等機制 |

驗證方式：`gbrain search "裝飾者模式"` 可正確找到轉錄內容。

---

*相關：[[md-to-pdf]]*
