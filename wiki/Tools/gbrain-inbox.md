---
tags:
  - tools
  - gbrain
  - obsidian
  - powershell
date: 2026-05-27
---

# Obsidian Inbox → gbrain 匯入工具

> 腳本位置：`D:\Claude\tools\gbrain-inbox.ps1`

把 Obsidian `Inbox/` 資料夾的筆記一鍵匯入 gbrain，並移至 `wiki/Ideas/`。

---

## 使用方式

```powershell
pwsh -File "D:\Claude\tools\gbrain-inbox.ps1"
```

---

## 流程

1. 掃描 `D:\Claude\obsidian\Inbox\` 下的所有 `.md` 檔
2. 執行 `gbrain import` 匯入每份筆記
3. 移動原始檔至 `D:\Claude\obsidian\wiki\Ideas\`

---

*相關：[[video-to-brain]] | [[cleanup-transcripts]]*
