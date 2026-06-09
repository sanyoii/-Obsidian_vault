# last30days

> 多平台社群研究引擎，以關鍵字搜尋 Reddit、HN、Polymarket、X 等平台的近 30 天討論。
>
> - 觸發方式：`/last30days <主題>`
> - 安裝路徑：`C:\Users\sanyo\.claude\skills\last30days\`
> - config：`~/.config/last30days/.env`

---

## 資料來源

### 免費（不需設定任何 API key）

| 來源 | `--search` 關鍵字 | 說明 |
|------|------------------|------|
| Reddit | `reddit` | 社群討論，多種爬取方式（rss/keyless/public）|
| Hacker News | `hackernews` 或 `hn` | 技術圈連結 + 評論 |
| Polymarket | `polymarket` | 預測市場（追熱門事件走向）|
| GitHub | `github` | Issue/PR 討論 ⚠️ 中文關鍵字會打到中文 repo |
| Digg | `digg` | 社群連結聚合 |

### 需要 API key / 帳號

| 來源 | `--search` 關鍵字 | 需設定的 env 變數 |
|------|------------------|-----------------|
| X (Twitter) | `x` | `AUTH_TOKEN` + `CT0`（從 browser cookie 匯出）|
| TikTok | `tiktok` | `SCRAPECREATORS_API_KEY` 或 `APIFY_API_TOKEN` |
| Instagram | `instagram` | 同上 |
| YouTube | `youtube` | Google API key（`GOOGLE_API_KEY`）|
| Bluesky | `bluesky` 或 `bsky` | `BSKY_HANDLE` + `BSKY_APP_PASSWORD` |
| 小紅書 | `xiaohongshu` 或 `xhs` | `XIAOHONGSHU_API_BASE` |
| TruthSocial | `truthsocial` 或 `truth` | `TRUTHSOCIAL_TOKEN` |
| Grounding/Web | `grounding` 或 `web` | `GOOGLE_API_KEY` / `GEMINI_API_KEY` |
| Perplexity | `perplexity` | `PERPLEXITY_API_KEY` |
| xquik | `xquik` | `XQUIK_API_KEY` |

---

## Source Aliases（`--search` 支援縮寫）

| 縮寫 | 完整名稱 |
|------|---------|
| `hn` | `hackernews` |
| `bsky` | `bluesky` |
| `truth` | `truthsocial` |
| `web` | `grounding` |
| `xhs` | `xiaohongshu` |

---

## CLI 用法

```bash
# 基本搜尋
last30days "Claude AI"

# 指定來源（排除 GitHub）
last30days "體育" --search reddit,hn,polymarket

# 指定多個來源含 X
last30days "NBA playoffs" --search reddit,x,hn,youtube

# 深度選項
last30days "topic" --depth=quick      # 低延遲（2來源/intent）
last30days "topic" --depth=balanced   # 預設
last30days "topic" --depth=deep       # 高 recall

# 輸出格式
last30days "topic" --emit=compact     # social-monitor 用
last30days "topic" --emit=md          # 完整 markdown
last30days "topic" --emit=json        # 結構化 JSON
```

---

## 設定 X (Twitter) 憑證

X 使用 cookie-based 認證（不需付費 API key）：

1. 開啟 Chrome/Edge，登入 twitter.com / x.com
2. 打開 DevTools（F12）→ Application → Cookies → x.com
3. 複製 `auth_token` 和 `ct0` 的值
4. 寫入 `~/.config/last30days/.env`：

```env
AUTH_TOKEN=你的auth_token值
CT0=你的ct0值
```

> ⚠️ Cookie 有效期約數週至數月，失效後需重新取得。

---

## 設定 TikTok / Instagram 憑證

需要付費的第三方爬蟲服務（擇一）：

**ScapeCreators**（推薦，較便宜）
- 官網：scrapecreators.com
- 設定：`SCRAPECREATORS_API_KEY=your_key`

**Apify**（備選）
- 設定：`APIFY_API_TOKEN=your_token`

兩個 key 都寫入 `~/.config/last30days/.env`，last30days 會自動選擇可用的。

---

## 與 social-monitor 整合

social-monitor 透過 `social_monitor_v2.py` 呼叫 last30days。

**控制來源**：在 `d:\Claude\social-monitor\.env` 設定：

```env
# 逗號分隔，留空則 last30days 自行決定
SOCIAL_SOURCES=reddit,hackernews,polymarket

# 有 X cookie 後改成：
# SOCIAL_SOURCES=reddit,hackernews,polymarket,x

# 有 TikTok key 後加上：
# SOCIAL_SOURCES=reddit,hackernews,polymarket,x,tiktok,instagram
```

**完整管線**：
```
watchlist.txt → social_monitor_v2.py
                  ↓ --search {SOCIAL_SOURCES}
              last30days (每個主題)
                  ↓
              reports/report-*.md
                  ↓
              fetch-dashboard-data.ps1
                  ↓
              data/dashboard.json
                  ↓
              Obsidian Dashboard (Social Trends panel)
```

---

## 相關連結

- [[command-center-dashboard]] — Social Trends 面板設定
- [[social-monitor]] — 社群海巡引擎說明

---

*最後更新：2026-06-10*
