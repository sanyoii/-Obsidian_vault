# ai-music-channel-starter — 半自動 AI 音樂 YouTube 頻道 Pipeline

來源：https://github.com/Winston774/ai-music-channel-starter  
類型：TypeScript CLI，Student Starter Kit  
教練 Skill（收費）：https://www.skool.com/ai10x

---

## 這個專案在做什麼

把 AI 音樂頻道的內容生產整理成一條**可管理、可審核、可追蹤**的工程流程：

> MiniMax 生音樂 → Codex/OpenAI 生圖片 → FFmpeg 混音 → HyperFrames 渲染影片 → Notion 人工審核 → YouTube 私人上傳 → 數據追蹤回 SQLite

每一步都是獨立的 npm script，支援 dry run，失敗後可局部重跑。

---

## 技術棧

| 工具 | 用途 |
|------|------|
| TypeScript + tsx | CLI 主體，所有 npm scripts |
| SQLite (better-sqlite3) | Source of truth，保存全部狀態與素材路徑 |
| MiniMax Music API | AI 音樂生成（music-2.6 模型） |
| OpenAI / Codex | 圖片生成（gpt-image-1.5）|
| FFmpeg / ffprobe | 音訊 QC、混音、影片渲染 |
| Sharp | 圖片規格化、縮圖文字排版 |
| HyperFrames (heygen) | HTML-based 影片合成（GSAP 動畫） |
| Notion API | 人工審核 dashboard |
| YouTube Data API | 私人上傳、縮圖、playlist、數據追蹤 |
| Zod / Pino / Commander | 驗證、structured logging、CLI parsing |

---

## 安裝 Steps

### 1. 環境需求

安裝前先確認本機有：
- Node.js
- Git
- FFmpeg / ffprobe（在 PATH 中）

### 2. Clone + 安裝

```powershell
git clone https://github.com/Winston774/ai-music-channel-starter
cd ai-music-channel-starter
npm install
```

### 3. 環境設定

```powershell
Copy-Item .env.example .env
```

填入 `.env`：

```env
# 必填（音樂生成）
MINIMAX_API_KEY=
MINIMAX_GROUP_ID=
MINIMAX_BASE_URL=https://api.minimax.io
MINIMAX_MUSIC_MODEL=music-2.6

# 選填（圖片生成，也可用 Codex 互動流程）
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-1.5

# 選填（人工審核 dashboard）
NOTION_API_KEY=
NOTION_DATABASE_ID=

# YouTube OAuth（上傳用）
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=
YOUTUBE_CHANNEL_ID=
YOUTUBE_REDIRECT_URI=http://localhost:53682/oauth2callback

# 多頻道設定
YOUTUBE_ACTIVE_CHANNEL=orbital_focus
YOUTUBE_CHANNELS_JSON={"orbital_focus":{...}}

# 其他
DB_PATH=./data/music-channel.sqlite
OUTPUT_DIR=./outputs
PUBLISH_TIMEZONE=Asia/Taipei
DAILY_PUBLISH_HOUR=21
```

### 4. 環境健康檢查

```powershell
npm run student:doctor
```

### 5. 初始化資料庫

```powershell
npm run db:migrate
```

會建立 SQLite DB 並 seed 內建 series config（Lunar Night Shift / Deep Space Focus / Midnight Terminal）。

### 6. YouTube OAuth（如果要上傳）

```powershell
# 產生授權 URL
npm run youtube:auth-url -- --channel orbital_focus

# 瀏覽器開啟 URL → 授權 → 複製 code 參數
npm run youtube:exchange-code -- --channel orbital_focus --code "PASTE_CODE_HERE" --write-env
```

每個 channel 跑一次。

---

## 完整工作流

### Step 1：建立 Episode Plan

```powershell
npm run episode:create -- --series orbital-systems --subtitle "Demo Episode"
# 回傳 episode-id，例：2026-05-07-orbital-systems-demo-episode
```

內建 series（`--series` 用的 slug）：
- `lunar-night-shift`
- `deep-space-focus`
- `midnight-terminal`
- `orbital-systems`

### Step 2：音樂生成（先 dry run）

```powershell
# 預覽，不呼叫真實 API
npm run episode:generate -- --episode-id <episode-id> --dry-run

# 實際生成（呼叫 MiniMax，費用）
npm run episode:generate -- --episode-id <episode-id>
```

生成 15–20 首 tracks，目標 60 分鐘，MiniMax 回傳 URL 會立刻下載到本機。

### Step 3：音訊 QC

```powershell
npm run audio:qc -- --episode-id <episode-id>
```

檢查項目：下載成功、duration 合理、無靜音、無爆音、總長度 55–65 分鐘。

### Step 4：混音

```powershell
npm run audio:mix -- --episode-id <episode-id>
```

用 FFmpeg 做 crossfade 串接 + loudnorm 音量標準化。

### Step 5：圖片素材

**推薦流程（Codex 互動式）：**
1. 在 Codex 內生成 hero image + thumbnail source image
2. 把圖片存在本機後執行：

```powershell
npm run image:import-codex -- `
  --episode-id <episode-id> `
  --hero-path <hero.png> `
  --thumbnail-path <thumbnail.png>
```

自動：
- 複製到 `outputs/{episodeId}/images/raw/`
- 渲染 `hero-1920x1080.png`
- 渲染 `thumbnail-base-1280x720.png`
- 疊上系列名稱文字 → `thumbnail-final-1280x720.png`（Sharp 程式疊字，不靠 AI）

**API 直接生成（非推薦，費用）：**
```powershell
npm run image:generate -- --episode-id <episode-id>
```

### Step 6：影片渲染

```powershell
# 準備 HyperFrames 設定
npm run video:prepare-hyperframes -- --episode-id <episode-id>

# FFmpeg 渲染（zoompan + xfade + drawtext）
npm run video:render-ffmpeg -- --episode-id <episode-id>
```

影片風格：慢速 ambient，15–30s intro 動畫，chapter 淡入淡出，最終 fade-out。

### Step 7：產生 YouTube Publish Package

```powershell
npm run youtube:package -- --episode-id <episode-id> --video-path <final-video.mp4>
```

輸出 Markdown（人看）+ JSON（upload command 讀）包含：
- title / description / chapters / tags / hashtags
- final video / thumbnail / preview audio 路徑
- 上傳 checklist / pinned comment

### Step 8：人工審核

```powershell
npm run episode:approve -- --episode-id <episode-id> --reviewer "你的名字"
# 或要求重新生成
npm run episode:request-regenerate -- --episode-id <episode-id>
```

**Approval Gate**：沒有 approval 記錄，`youtube:upload` 直接擋下。

人工審核重點：
- Final MP4 正常播放
- 前 30 秒開場合適
- 15、30、50 分鐘附近無刺耳聲
- 縮圖文字正確
- Title / description / chapters 合理
- 已標示 AI-assisted / synthetic content

### Step 9：YouTube 上傳

```powershell
# 先 dry run
npm run youtube:upload -- --channel orbital_focus --episode-id <episode-id> --dry-run

# 實際上傳（預設 private）
npm run youtube:upload -- --channel orbital_focus --episode-id <episode-id>
```

自動：private 上傳 → 設定 thumbnail → 加入 playlist → 儲存第一筆 performance snapshot。

### Step 10：數據追蹤

```powershell
# 單集
npm run youtube:track-performance -- --channel orbital_focus --episode-id <episode-id>

# 整個頻道
npm run youtube:track-all-performance -- --channel orbital_focus

# 查看報表
npm run youtube:performance-report -- --channel orbital_focus --episode-id <episode-id>
```

追蹤節奏：上傳後立刻抓 → 前期每天 → 一週後改每週。

---

## Episode 狀態機

```
planned
  → music_generating → music_ready → audio_qc_failed
                     → audio_ready
                         → images_generating → images_ready
                                              → rendering
                                                  → needs_approval ← MVP 停在這裡
                                                      → approved
                                                          → uploading → uploaded → scheduled
                         → failed
```

---

## Notion Dashboard（選填）

```powershell
# 確認 schema
npm run notion:schema

# 自動補齊缺少的欄位
npm run notion:ensure-schema

# 同步 episode
npm run notion:sync -- --episode-id <episode-id>

# 或 dry run 預覽
npm run notion:sync -- --episode-id <episode-id> --dry-run
```

必填 Notion 欄位：Name / Episode ID / Series / Status / Approval / Visibility / Runtime Minutes / Publish Date / Final Video Path / Thumbnail Path 等 14 個屬性。

---

## 多頻道操作

在 `.env` 中設定 `YOUTUBE_CHANNELS_JSON`，每個 channel profile 包含：
- `channelId`
- `refreshToken`
- `defaultPlaylistId`
- `playlists`（series name → playlist ID 對應）

每個指令用 `--channel <channel-key>` 切換，不指定時用 `YOUTUBE_ACTIVE_CHANNEL`。

---

## 實驗數據追蹤

每次上傳自動記錄 `youtube_publish_experiments`：
- series / title / thumbnail concept / visual style / music style
- duration / track count / 是否有 telemetry overlay / 是否每首 track 有獨立場景

→ 未來可分析哪種 series/thumbnail/長度表現最好。

---

## 全部 npm Scripts 速查

| Script | 說明 |
|--------|------|
| `student:doctor` | 本機環境健康檢查 |
| `db:migrate` | 初始化 SQLite DB |
| `episode:create` | 建立 episode plan |
| `episode:refresh-prompts` | 重新生成 prompts |
| `episode:generate` | 音樂生成（支援 --dry-run） |
| `track:reset` | 重置單首 track |
| `audio:qc` | 音訊品質檢查 |
| `audio:mix` | 混音輸出 |
| `image:generate` | API 圖片生成 |
| `image:import-codex` | 匯入 Codex 生成的圖片 |
| `youtube:package` | 產生 publish package |
| `episode:approve` | 人工 approval |
| `episode:request-regenerate` | 要求重新生成 |
| `youtube:upload-check` | 上傳前檢查 |
| `notion:schema / ensure-schema / bootstrap / sync` | Notion 操作 |
| `video:prepare-hyperframes` | 準備 HyperFrames 設定 |
| `video:render-ffmpeg` | FFmpeg 渲染影片 |
| `youtube:auth-url / exchange-code` | YouTube OAuth |
| `youtube:upload` | 上傳（支援 --dry-run） |
| `youtube:status` | 查詢上傳狀態 |
| `youtube:set-thumbnail` | 設定縮圖 |
| `youtube:record-experiment` | 記錄實驗 metadata |
| `youtube:track-performance` | 單集數據追蹤 |
| `youtube:track-all-performance` | 全頻道數據追蹤 |
| `youtube:performance-report` | 查看報表 |
| `youtube:add-to-playlist` | 加入 playlist |

---

## 安全設計

- `.env`、SQLite data、outputs、logs、rendered videos 全部在 `.gitignore`
- YouTube 上傳預設 private
- 必須先有人工 approval 才能 upload
- 上傳前建議 dry run
- 不把 secrets 貼到聊天或 issue

---

## 注意事項

- MiniMax 回傳的 URL 有過期時間，**立刻下載**，不要留 URL 在 DB 裡當永久資料
- 圖片文字用 Sharp 疊，不要叫 AI 生成文字（AI 會拼錯）
- YouTube API 配額：上傳 100 單位、設縮圖 50 單位
- HyperFrames 每次修改 `.html` 後必須跑 `npm run check`

---

*記錄日期：2026-06-05 | 來源：repomix 分析 Winston774/ai-music-channel-starter*
