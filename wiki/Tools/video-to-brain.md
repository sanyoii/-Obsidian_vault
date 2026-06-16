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
```

轉錄完成後，手動執行 gbrain import 匯入：

```powershell
# gbrain import（在 infra/brain-docs/course/transcripts/ 下執行）
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

---

## 路徑設定（腳本內）

| 設定 | 預設值 |
|------|--------|
| `BASE_DIR` | `D:\Claude\infra\brain-docs\course` |
| `DOWNLOAD_DIR` | `BASE_DIR\videos` |
| `TRANSCRIPT_DIR` | `BASE_DIR\transcripts` |
| `GEMINI_MODEL` | `gemini-2.5-flash` |

---

## 使用紀錄

| 日期 | 課程 | 影片數 | 狀態 |
|------|------|--------|------|
| 2026-05-23 | 軟體設計模式精通之旅（水球軟體學院）| 42 支唯一影片 | ✅ 全部完成，已匯入 gbrain |

驗證方式：`gbrain search "裝飾者模式"` 可正確找到轉錄內容。

---

*相關：[[md-to-pdf]]*
