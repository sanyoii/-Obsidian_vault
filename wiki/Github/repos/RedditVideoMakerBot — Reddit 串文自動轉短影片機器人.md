# RedditVideoMakerBot

> 自動把 Reddit 討論串轉成可發布的短影片。截圖留言 → TTS 語音朗讀 → 疊上背景遊戲影片 → 輸出 MP4。

**Repo：** https://github.com/elebumm/RedditVideoMakerBot  
**作者：** Lewis Menelaws (elebumm)  
**版本：** v3.4.0  
**授權：** MIT

---

## 一句話說明

給它一個 Reddit 討論串，它全自動產出那種 TikTok / YouTube Shorts / Instagram Reels 上爆紅的「Reddit 故事朗讀影片」。

---

## 整個 Pipeline

```
Reddit API（PRAW）
  └─ 抓取討論串（標題 + 留言）
       │
       ├─ Playwright → 截圖每則留言（仿 Reddit UI，亮/暗色）
       │
       ├─ TTS 語音合成（逐則朗讀）
       │    ├─ TikTok TTS
       │    ├─ AWS Polly
       │    ├─ Streamlabs Polly
       │    ├─ ElevenLabs
       │    ├─ OpenAI TTS
       │    └─ Google TTS (gTTS) / pyttsx3（本地離線）
       │
       └─ FFmpeg 合成最終影片
            ├─ 背景影片（GTA 摩托車、Minecraft Parkour、Rocket League…）
            ├─ 背景音樂（可選）
            └─ 輸出 MP4（需手動上傳）
```

---

## 主要功能

| 功能 | 說明 |
|------|------|
| TTS 語音引擎 | 6 種可選（TikTok / AWS Polly / Streamlabs / ElevenLabs / OpenAI / gTTS） |
| 背景影片 | GTA、Minecraft、Rocket League 等，可自訂新增 |
| 背景音樂 | 可搭配配樂 |
| 截圖主題 | 亮色 / 暗色 Reddit UI |
| 批次模式 | `run_many(n)` 一次產生多部影片 |
| Web GUI | Flask 介面（`GUI.py`）可視覺化設定 |
| NSFW 過濾 | 自動跳過 NSFW 貼文 |
| 重複偵測 | 已產生過的影片不重做 |
| Docker 支援 | 附 Dockerfile |

---

## 技術規格

- **語言：** Python 3.10
- **截圖：** Playwright（截 Reddit 留言 UI）
- **影片合成：** FFmpeg
- **Reddit API：** PRAW（需申請 Reddit Script App）
- **檔案數：** 69 個
- **設定檔：** `config.toml`（初次執行互動式引導填寫）

---

## 專案結構

```
main.py                   # 主程式入口
TTS/                      # 各 TTS 引擎模組
video_creation/
  ├── screenshot_downloader.py  # Playwright 截圖
  ├── background.py             # 背景影片處理
  ├── final_video.py            # FFmpeg 合成輸出
  └── voices.py
reddit/subreddit.py       # Reddit API 抓取
utils/                    # 設定、工具函式
GUI.py                    # Flask Web GUI
```

---

## 快速啟動

```bash
git clone https://github.com/elebumm/RedditVideoMakerBot.git
cd RedditVideoMakerBot
python -m venv ./venv && source ./venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python -m playwright install
python main.py
# 依提示填入 Reddit API 金鑰與設定
```

---

## 注意事項

- 產出的影片**不會自動上傳**，需手動發布（避免違反平台條款）
- 背景影片需自行下載（程式提供 YouTube 來源連結）
- 使用 TikTok TTS / ElevenLabs 等需對應帳號或 API Key

---

## Tags

#tool #automation #video #reddit #tts #ffmpeg #python #short-video #content-creation
