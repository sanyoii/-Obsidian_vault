---
tags:
  - tools
  - gbrain
  - powershell
date: 2026-05-27
---

# Transcript 重複清理工具

> 腳本位置：`D:\Claude\tools\cleanup-transcripts.ps1`

刪除 `brain-docs/course/transcripts/` 中重複的 transcript 檔案，只保留編號最小（最早）的那份。

---

## 使用方式

```powershell
pwsh -File "D:\Claude\tools\cleanup-transcripts.ps1"
```

---

## 背景

`video-to-brain.py` 在兩個不同資料夾各匯入一次同名影片時，會產生重複 transcript。此腳本用於事後清理。

---

*相關：[[video-to-brain]] | [[gbrain-inbox]]*
