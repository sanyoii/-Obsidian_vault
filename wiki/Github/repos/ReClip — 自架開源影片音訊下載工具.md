# ReClip

> 自架的開源影片／音訊下載工具，有乾淨的 Web UI。貼上連結，選 MP4 或 MP3，直接下載。

**Repo：** https://github.com/averygan/reclip  
**作者：** averygan  
**授權：** MIT

---

## 一句話說明

貼上 YouTube、TikTok、Instagram、Twitter/X 等 1000+ 網站的連結，選 MP4 或 MP3，直接從瀏覽器下載到本機。

---

## 功能

| 功能 | 說明 |
|------|------|
| 支援網站 | 1000+（底層 yt-dlp） |
| 輸出格式 | MP4 影片 / MP3 音訊 |
| 畫質選擇 | 可選解析度 |
| 批次下載 | 一次貼多個 URL，自動去重 |
| 前端 | Vanilla HTML/CSS/JS，無框架、無 build 步驟 |
| 後端 | Python + Flask，~150 行 |

---

## 技術架構

```
Flask (app.py ~150行)
  ├── /api/info          → yt-dlp -j 取影片資訊、解析度清單
  ├── /api/download      → background thread 執行 yt-dlp 下載
  ├── /api/status/<id>   → 輪詢下載進度
  └── /api/file/<id>     → 下載完成後提供檔案

下載引擎：yt-dlp + ffmpeg
UI：templates/index.html（單一檔案）
依賴：2 個（Flask、yt-dlp）
檔案數：9 個
```

---

## 快速啟動

```bash
# macOS
brew install yt-dlp ffmpeg
git clone https://github.com/averygan/reclip.git
cd reclip && ./reclip.sh
# 開 http://localhost:8899
```

```bash
# Docker
docker build -t reclip . && docker run -p 8899:8899 reclip
```

---

## 支援平台（部分）

YouTube · TikTok · Instagram · Twitter/X · Reddit · Facebook · Vimeo · Twitch · Dailymotion · SoundCloud · Loom · Streamable · Pinterest · Tumblr · Threads · LinkedIn · 及更多

---

## 適合場景

- 自己架來下載影片（個人使用）
- 研究最小可行 Flask + yt-dlp Web 整合的範本

---

## Tags

#tool #self-hosted #yt-dlp #flask #video-downloader #python
