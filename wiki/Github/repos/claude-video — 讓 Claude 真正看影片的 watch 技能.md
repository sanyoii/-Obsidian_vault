---
source: "https://github.com/bradautomates/claude-video"
author: "bradautomates"
stars: "7.7K"
clipped: 2026-07-12
tags:
  - "github/repo"
  - "claude-code-skill"
  - "video"
  - "yt-dlp"
---

# claude-video — 讓 Claude 真正「看」任何影片的 /watch 技能

> **bradautomates/claude-video** | ⭐ 7.7K | 🍴 864 | 📝 MIT
> "Give Claude the ability to watch any video. /watch downloads, extracts frames, transcribes, hands it all to Claude."

## 一句話說明

Claude 天生沒有影片輸入——貼 YouTube 連結只能猜標題或讀殘缺字幕。此 skill 補上這個能力：貼 URL 或本地檔＋一個問題，腳本先抓字幕、按需下載、用 ffmpeg 抽場景感知影格、拉時間軸逐字稿（免費字幕優先，Whisper API 備援），Claude 逐一 `Read` 影格圖片後，像真的看過聽過那樣回答。目標使用者＝大量看技術影片／課程／競品 demo／bug 錄影的人。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 7.7K |
| Forks | 864（高 fork/star 比＝被大量二次開發） |
| 主要語言 | Python（112KB）＋ Shell（6KB） |
| 授權 | MIT |
| 最新 Release | v0.2.0 |
| Topics / 首頁 | 無 / 無 |
| 貢獻者 | 僅 bradautomates（單人專案，巴士因子 1） |

## 核心功能

- **一次呼叫看完影片**：`/watch <url> <問題>`，yt-dlp 支援站點（YouTube/Loom/TikTok/X/Instagram＋數百站）或本地 `.mp4/.mov/.mkv/.webm`。
- **字幕優先、按需下載**：`transcript` 模式對有字幕的 URL 直接回傳、完全不下載影片，最省 token。
- **四段細節撥盤**：`transcript`（純逐字稿，0 影格）→ `efficient`（keyframe，~0.5s 極快，cap 50）→ `balanced`（場景切換，cap 100）→ `token-burner`（場景感知、不設上限）。
- **影格去重**：ffmpeg 縮 16×16 灰階縮圖，算與「上一張保留影格」的平均絕對亮度差（MAD），閾值 2.0 以下當近重複丟棄——螢幕錄影久停一張投影片不會重複計費。純標準庫、無影像套件依賴。
- **逐字稿雙來源**：原生字幕（免費即時）→ 無字幕才 fallback 抽 16kHz 單聲道 mp3 送 Whisper（Groq `whisper-large-v3` 優先，OpenAI `whisper-1` 備援）。
- **影格預算自動節流**：依影片長度自動配影格數（≤30s ~30 張，>10min capped 100 張並警告「稀疏掃描」），`--start/--end` 聚焦區段給更密預算（上限 2fps）。
- **跨 host**：Claude Code plugin、Codex、Cursor、Copilot、Gemini CLI 等 50+ agent-skills host，claude.ai web 也可裝 `.skill` bundle。

## 技術架構

```
/watch <url|path> <question>
        │
        ▼
  setup.py --check ── 首次跑裝 yt-dlp/ffmpeg + scaffold ~/.config/watch/.env
        │
        ▼
  watch.py（orchestrator）
        ├─ download.py ── yt-dlp：字幕優先，按需下載
        ├─ frames.py ──── ffmpeg 抽影格（keyframe / scene-change）+ 16×16 灰階 MAD 去重
        └─ transcribe.py ─ 原生字幕 → whisper.py（Groq/OpenAI fallback）
        │
        ▼
  印出 frame 路徑(t=MM:SS) + 時間軸逐字稿 → Claude 逐一 Read 影格圖片
```

| 層次 | 技術 |
|------|------|
| Agent 介面 | SKILL.md（自解析 SKILL_DIR，跨 harness 無依賴環境變數） |
| Orchestration | watch.py（純 Python，argparse 撥盤） |
| 影片 I/O | yt-dlp（下載＋字幕）、ffmpeg/ffprobe（影格＋音訊） |
| 轉錄 | Groq / OpenAI Whisper API |
| 封裝 | .claude-plugin + .codex-plugin 雙 manifest、hooks/check-setup.sh |

架構乾淨：單一 orchestrator + 職責分離的 script，零第三方 Python 影像庫（去重全靠 ffmpeg + stdlib）。核心邏輯集中在 `frames.py`（影格抽取＋去重）與 `SKILL.md`（給 agent 讀的操作手冊）。

## 生態與二次開發

864 forks，被大量改造，值得注意的 fork：
- `mathiaschu/watch`：改用 **mlx-whisper 本地轉錄、免 API key**（Apple Silicon）。
- `Newuxtreme/watch-video-skill`：重定位為「像對真人一樣給視覺回饋」。
- `HUANGCHIHHUNGLeo/claude-real-video`：場景感知去重影格＋逐字稿的平行實作（見下）。

教學生態成熟：有 YouTube 教學影片＋部落格圖文，屬有機傳播非只靠 README。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Claude Code** | ⚠️ **高度重疊**：本機已裝 [[Github/repos/claude-real-video — 讓 Claude 真正看影片的本機關鍵幀擷取工具\|claude-real-video]]（本 repo 的 fork/平行實作），功能幾乎一對一。不建議並存兩套。 |
| **Obsidian / gbrain** | 「影片→逐字稿→筆記」用途與 gbrain 的 `video-to-brain.py` 批次入庫管線互補；但本工具是 on-demand 問答，非批次入庫。 |
| **Automation** | social-monitor / 影片 pipeline 皆已有各自轉錄鏈，無增量。 |

## 安裝建議

**❌ 不建議安裝（重複）** — 本機已有 `claude-real-video` 覆蓋同一需求。真正決策不是「裝不裝」而是**要不要換過去**：

- 本 repo（bradautomates）＝上游原始、7.7K stars、生態最大、四段細節撥盤更完整、跨 50+ host、官方 plugin marketplace 自動更新。
- `claude-real-video`＝目前這套。若功能夠用就維持；若想要 `token-burner` 不設上限模式、更成熟的 setup preflight，可考慮遷移官方版（先確認 claude-real-video 有無所依賴的本地化改動）。

若無 `claude-real-video`，此為 ✅ 同類首選。

## 相關連結

- [[Github/repos/claude-real-video — 讓 Claude 真正看影片的本機關鍵幀擷取工具\|claude-real-video]] — 本機已裝的平行實作
- [[Github/repos/ReClip — 自架開源影片音訊下載工具\|ReClip]] — 純下載工具
- [[Github/_index|Github Repo 分析總索引]]
