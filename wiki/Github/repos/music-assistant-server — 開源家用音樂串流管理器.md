# Music Assistant Server

> 家用開源音樂串流管理伺服器，統一整合 30+ 音源（Spotify / Tidal / YouTube Music 等）與 20+ 喇叭協議（Sonos / Chromecast / AirPlay 等），最佳搭檔為 Home Assistant；含實驗性 MCP Server plugin，可讓 Claude Code 直接下指令控制播放。

**Repo：** https://github.com/music-assistant/server  
**授權：** Apache-2.0（Open Home Foundation 旗下）  
**語言：** Python 3.14+  
**規模：** 106 個 providers（音源 / 播放器 / 元資料 / Plugin 四類）

---

## 一段話說明

Music Assistant 是一個**永遠在線**的媒體庫管理伺服器，統一管理串流服務帳號與家中連網喇叭：以 async Python 核心為中樞，透過插件式 Providers 連接音源（Spotify、Tidal、YouTube Music、Apple Music、Deezer 等）與播放設備（Sonos、Chromecast、AirPlay、Snapcast、DLNA 等），最適合部署在 Raspberry Pi、NAS 或以 Home Assistant Add-on 方式 24 小時運行。

---

## 主要功能

- **音源整合（30+ providers）**：Spotify、Tidal、YouTube Music、Apple Music、Deezer、Qobuz、SoundCloud、Plex、Jellyfin、Emby、Subsonic/OpenSubsonic、Internet Archive、Bandcamp、Audible、ibroadcast、Nugs、SiriusXM 等
- **播放設備（20+ providers）**：Sonos、Sonos S1、Chromecast、AirPlay、AirPlay Receiver、Snapcast、DLNA、MPD、Bluesound、WiiM、MusicCast、Squeezebox、HEOS、Samsung WAM、Alexa、Yandex Smart Home 等
- **多房間同步播放**：Sync Groups + Snapcast 實現全屋同步；Universal Group 支援跨協議群組
- **Home Assistant 深度整合**：自動化觸發、hass_players 整合、Alexa bridge
- **音訊分析 ML**：PyTorch + librosa 驅動的響度分析（Loudness Normalization）、聲音相似度（Sonic Similarity）、智慧淡入淡出（Smart Fades）
- **智慧播放清單 / 推薦**：Party 模式、Last.fm Recommendations、Smart Playlists
- **廣播 & Podcast**：Podcast Index、BBC Sounds、ARD、ORF、SomaFM、NTS、Mother Earth Radio、TuneIn 等
- **Scrobbling**：Last.fm、ListenBrainz、Subsonic Scrobble
- **檔案系統來源**：本機 / NFS / SMB / WebDAV
- **MCP Server（實驗性 plugin）**：透過 FastMCP 3.3 將 Music Assistant 暴露為 MCP 工具，讓 Claude / Codex 等 LLM 直接搜尋、佇列、控制播放

---

## 技術棧

| 層次 | 技術 |
|------|------|
| 語言 | Python 3.14+ |
| 非同步框架 | asyncio + aiohttp 3.14 |
| 資料庫 | SQLite（aiosqlite） |
| 音訊處理 | FFmpeg 6.1+（轉碼 / 串流，OS 元件，非 pip） |
| 音訊 ML | PyTorch 2.11 + librosa 0.11 + torchaudio |
| Web API | REST + WebSocket（aiohttp） |
| MCP 整合 | FastMCP 3.3.1（plugin，stage: experimental） |
| 部署 | Docker 容器 / Home Assistant Add-on（**唯二支援方式**） |
| 前端 | music-assistant-frontend（獨立 npm 套件，Web UI） |
| 格式解析 | mutagen、orjson、xmltodict、podcastparser |

> 注意：因依賴 FFmpeg 自訂二進位 + OS 元件，**無法單純 pip install 執行**，僅能用 Docker 或 HA Add-on。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | ❌ 無直接關聯，是媒體伺服器而非知識庫工具 |
| **Claude Code** | ⚠️ 有潛力：MCP Server plugin 可將播放控制暴露為 MCP 工具（目前 stage: experimental） |
| **Automation / Scripts** | ✅ 有用：REST API 可寫入 Python 自動化腳本；Home Assistant 觸發事件 |
| **Skills / Agents** | ❌ 無直接用途，非 coding / 工作流工具 |

**值得關注**：`fastmcp_server` plugin 可讓 Claude Code（透過 MCP 配置）直接呼叫 Music Assistant API，例如「播放 XX 專輯」、「加入佇列」等 — 但前提是區網有 MA 伺服器在運行，且 plugin 目前為 experimental 階段。

---

## 安裝建議

**⏳ 觀望** — 若有 Home Assistant 環境，可評估安裝為 Add-on；純 Claude Code / Obsidian 工作流目前無迫切需求，且需重量級 Docker + FFmpeg + PyTorch 執行環境，不適合直接裝在開發機。

---

## Tags

#media #music #home-assistant #mcp #streaming #self-hosted #docker #python #fastmcp
