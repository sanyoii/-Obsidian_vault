---
source: "https://github.com/HUANGCHIHHUNGLeo/claude-real-video"
author: "HUANGCHIHHUNGLeo"
stars: "619"
clipped: 2026-07-04
tags:
  - "github/repo"
  - "claude-code/skills"
  - "video/tooling"
---

# claude-real-video — 讓 Claude 真正「看」影片的本機關鍵幀擷取工具

> **HUANGCHIHHUNGLeo/claude-real-video** | ⭐ 619 | 🍴 27 | 📝 MIT
> "Let Claude (or any LLM) actually watch a video — scene-aware, deduplicated frames + transcript, from a URL or local file. Runs locally, MIT."

## 一句話說明

一支 Python CLI（`crv`），把影片（YouTube/IG/TikTok 連結或本機檔）轉成「場景變化關鍵幀 + 去重 + Whisper 逐字稿」的資料夾，讓不能直接吃影片的 LLM（Claude）也能「看」；同時附帶一個可直接裝進 `~/.claude/skills/` 的 Skill，讓 Claude Code 拿到影片連結就自動觸發分析。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 619 |
| Forks | 27 |
| 主要語言 | Python |
| 授權 | MIT |
| 建立時間 | 2026-06-30 |
| 最新 Release | v0.4.0 |
| 首頁 | 無（PyPI: claude-real-video）|

四天內 619 星，登上 Hacker News 首頁；單一 contributor（作者本人）。

## 核心功能

- **場景感知擷取**：`ffmpeg select` 單一 pass 抓場景變化 + density floor（至少每 N 秒一張），取代固定 fps 取樣
- **像素級去重**：真實 RGB 差異（非感知雜湊）+ sliding-window，避免 A-B-A 跳接鏡頭重複送出
- **逐字稿**：既有字幕優先，沒有才 fallback Whisper
- **`--why`**：告訴工具「為何而看」，聚焦特定目的分析
- **`--kb`**：分析結果存成帶日期筆記到指定資料夾（可接 Obsidian vault）
- **`--grid` contact sheet**：關鍵幀打包九宮格圖，token 用量再降 ~9 倍
- **Claude Code Skill**：`skills/claude-real-video/SKILL.md` 直接複製進 `~/.claude/skills/` 即用

免費版只做「看到什麼」；作者另售付費 crv Pro（$19）做鏡頭運動/剪輯節奏分析。

## 技術架構

```
crv <url-or-file>
  ├─ fetch_video()    yt-dlp（URL）或本機複製
  ├─ extract_frames() ffmpeg scene-detect + fps-floor
  ├─ dedup()          sliding-window 像素差異比對
  ├─ transcribe()     字幕優先 → Whisper fallback
  └─ manifest         MANIFEST.txt 彙總給 LLM 讀
```

單檔核心邏輯（`core.py`，~400 行），無多餘抽象，依賴僅 yt-dlp + ffmpeg（+ 選配 faster-whisper）。

## 安裝建議

✅ 適合安裝 — MIT、單檔可讀、無需額外 API key、補上「丟影片連結問 Claude」目前缺的能力。

## 相關連結

- [[project_video_to_brain]] — 批次逐字稿轉 gbrain 知識庫，與本工具「單支影片 ad-hoc 問答」互補不衝突
- [[project_ai_video_pipeline]] — AI 影片生成 pipeline，方向相反（生成 vs 解析）
