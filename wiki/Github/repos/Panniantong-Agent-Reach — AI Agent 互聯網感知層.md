---
source: "https://github.com/Panniantong/Agent-Reach"
author: "Panniantong (Neo Reid)"
version: "1.5.0"
stars: "60K+"
clipped: 2026-06-06
updated: 2026-07-26
tags:
  - "github/repo"
  - "skills"
  - "tools"
  - "automation"
  - "claude-code"
  - "social-media"
---

# Agent Reach — AI Agent 互聯網感知層

> 一句話安裝指令，讓 AI Agent 同時讀懂 15 個平台：網頁、YouTube、Twitter、Reddit、小紅書、B站、LinkedIn、V2EX、雪球……零配置 6 個頻道，Cookie/OpenCLI 解鎖其餘。

**Repo：** https://github.com/Panniantong/Agent-Reach  
**版本：** 1.5.0（2026-06-11，「能力层:多后端路由 + 真体检 + OpenCLI」）  
**作者：** Panniantong（Neo Reid）  
**授權：** MIT  
**規模：** 103 個檔案，159,368 tokens，Python 3.10+  
**社群：** ⭐ 60,842 · 🍴 4,924（2026-07-26 複查；建立僅 5 個月，Trendshift Trending #1）

---

## 一句話說明

Agent Reach 是一個 AI Agent 互聯網能力「腳手架」：把 Twitter CLI、yt-dlp、Jina Reader、rdt-cli、mcporter、gh CLI 等各平台的最佳工具選型與配置全部打包好，安裝後 AI Agent 自動讀取 `SKILL.md` 路由表，遇到「搜推特」、「看 YouTube」、「刷小紅書」等需求時直接知道呼叫哪個上游工具，不需要使用者記憶任何命令。

---

## 主要功能

- **17 平台覆蓋**：網頁（Jina Reader）、YouTube/B站（yt-dlp）、Twitter/X（twitter-cli）、Reddit（rdt-cli）、小紅書/抖音（mcporter MCP）、LinkedIn、微信公眾號、微博、V2EX、雪球、小宇宙播客（Whisper 轉錄）、全網語意搜尋（Exa via mcporter）、RSS（feedparser）、GitHub（gh CLI）
- **零配置即開即用**：網頁、YouTube、RSS、微博、V2EX、微信公眾號 8 個頻道無需任何設定
- **一句話安裝**：`帮我安装 Agent Reach：<install.md URL>` 告訴 Agent，由 Agent 完成全部環境設定
- **SKILL.md 路由系統**：依意圖自動路由（search/social/career/dev/web/video），Agent 讀取後自動選型
- **自帶診斷工具**：`agent-reach doctor` 顯示每個頻道的連通狀態與修復建議
- **MCP 整合**：透過 mcporter 接入 Exa 搜尋、小紅書、抖音 MCP server
- **可插拔架構**：每個 `channels/*.py` 獨立，不滿意可隨時換底層工具

---

## 技術棧

| 層        | 技術                                                          |
| --------- | ------------------------------------------------------------- |
| 語言      | Python 3.10+                                                  |
| 套件管理  | pip + pyproject.toml，constraints.txt 鎖版本                  |
| CLI 框架  | `agent-reach` 命令行（`cli.py` 15K tokens，主要入口）         |
| MCP 整合  | mcporter（小紅書、抖音、Exa 搜尋）                            |
| 上游工具  | yt-dlp、gh CLI、twitter-cli、rdt-cli、feedparser、Jina Reader |
| 安裝方式  | `pip install agent-reach`（PyPI）                             |
| 測試      | pytest，27 個測試檔／103 檔；GitHub Actions `pytest.yml` + wheel smoke test |
| 後端路由  | `Channel.backends` 有序清單（首選 ▸ 備選）；`ordered_backends()` 套用使用者覆寫 `<channel>_backend` / 環境變數 `<CHANNEL>_BACKEND` |
| 體檢原則  | `probe.py` **真執行**輕量指令才宣稱後端可用（`shutil.which()` 會被 stale venv shim 騙過）；`check()` 設定 `active_backend` |
| 設定格式  | Agent Skills `SKILL.md` + `references/*.md` 分類路由          |

---

## 與現有環境的相關性評估

| 面向                      | 評估                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| **SKILL.md 格式相容性**   | ✅ 原生 Agent Skills 格式，`SKILL.md` 直接對應 `C:\Users\sanyo\.claude\skills\` 結構                     |
| **Claude Code 整合**      | ✅ 專為 Claude Code 設計（README 首要提及），可直接 `pip install agent-reach` 並讀取 SKILL.md             |
| **Morning Briefing 加值** | ✅ 可強化 social-monitor：Twitter 搜尋、微博熱搜、V2EX 熱門貼文直接入報告                               |
| **現有 social-monitor**   | ⚠️ 部分功能重疊（Twitter/微博），但 Agent Reach 是 skills-based，social-monitor 是排程腳本，可共存       |
| **GitHub Repo 分析**      | ✅ 已有 gh CLI，`agent-reach` 提供統一的 doctor 診斷入口                                                  |
| **本機 vs 伺服器**        | ✅ 本機電腦不需要代理；B站/小紅書在伺服器才需要 ~$1/月 proxy                                             |
| **Cookie 管理**           | ⚠️ Twitter、小紅書需要 Cookie-Editor 匯出 Cookie；Cookie 存本機不上傳                                    |
| **衝突風險**              | 🟢 低。純 skills + CLI 工具，不改動 hooks/agents/settings                                                 |

---

## 安裝建議

**✅ 適合安裝 → ✅ 已安裝（2026-06-06）**

```bash
# 實際使用的安裝指令（PyPI zip 有 hatchling bug，改用 git clone）
git clone https://github.com/Panniantong/Agent-Reach.git d:\Claude\tools\agent-reach
C:\Python314\python.exe -m pip install -e d:\Claude\tools\agent-reach
%USERPROFILE%\AppData\Roaming\Python\Python314\Scripts\agent-reach.exe install --env=auto

# 診斷頻道狀態
agent-reach doctor
```

## 安裝狀態（2026-07-02 更新後，13/15 可用）

**Skill 路徑：**
- Claude Code skill：`C:\Users\sanyo\.claude\skills\agent-reach\`
- Agent skill：`C:\Users\sanyo\.agents\skills\agent-reach\`
- 原始碼：`d:\Claude\tools\agent-reach\`（git clone，editable install，已 pull 到 v1.5.0）

**頻道狀態：**

| 頻道 | 狀態 | 說明 |
|------|------|------|
| GitHub | ✅ | gh CLI 完整可用 |
| V2EX | ✅ | 公開 API |
| RSS/Atom | ✅ | feedparser |
| 任意網頁 | ✅ | Jina Reader |
| YouTube | ✅ | yt-dlp + `--js-runtimes node`（已修復） |
| 全網語意搜尋 | ✅ | mcporter + Exa MCP（免 Key） |
| Twitter / Reddit / Facebook / Instagram / B站 / 小紅書 | ✅ | OpenCLI（Chrome 擴充已裝，複用瀏覽器登入態） |
| LinkedIn | ✅ | linkedin-scraper-mcp（隨 OpenCLI 一起通） |
| 雪球 | ⚠️ 待辦 | `agent-reach configure --from-browser chrome` 讀 Chrome cookie 失敗（一般權限被拒，需系統管理員權限 + 關閉 Chrome 才能重跑），或改用 Cookie-Editor 手動匯出 |
| 小宇宙播客 | ❌ 待辦 | 需裝 ffmpeg（音訊轉碼切片），指令：`apt install -y ffmpeg`（Linux）/ 對應 Windows 安裝方式待確認 |

---

## 已知風險（2026-07-26 補）

> [!warning] 封號風險是實證發生的，不是理論
> - Issue #498（open）「小红书的封号警告来得很快，才用了2天」，附截圖。
> - Issue #452「关于封号的问题」、#63「注册了 Twitter 小号…结果被封号了」皆為同型。
> - README 自己建議用**拋棄式帳號**。要把小紅書／Twitter 渠道接進排程或長跑流程前，先開小號，勿用主帳號。

- **Cookie 每 7–30 天過期**：單機單人可接受；多機／cron 是維護稅。
- **安裝方式本身是供應鏈向量**：「叫 Agent 讀一個 URL 然後照做」——`install.md` 若被劫持，Agent 會照跑。生產環境應釘 commit SHA。
- **PR 積壓**：Open PR 96 / Open Issue 72，單人主導的合併瓶頸明顯。
- **平台偏中文圈**：Mastodon / Bluesky / TikTok(US) 需自行接。
- **「pure vibe coding、無測試」的舊評價已過時**（2026-06 第三方評測所述），現已有 27 個測試檔 + CI。

---

## 更新記錄（2026-07-26 repo-intel 複查）

- 星數 48.8K → **60.8K**（24 天 +12K）；forks 3,889 → 4,924；檔案 89 → 103、tokens 126.9K → 159.4K
- **v1.5.0 仍為最新 release（2026-06-11），已 45 天未發版**，但主線昨天（07-25）仍有 push；近 4 週 commit 7/1/0/15
- Open Issues 51 → 72、Open PRs 68 → **96**，積壓持續擴大
- 本機實測 `agent-reach doctor` = **13/15 渠道可用**（僅雪球、小宇宙未通，皆與版本無關）
- 架構亮點：`backends/opencli.py` 註解明載「`opencli doctor` 會副作用啟動 daemon，健康檢查絕不能用它」——與「驗證動作本身會污染觀測」（Class B 污染型驗證盲區）同一問題意識
- **結論：維持現狀，不需動作。** 下次動手觸發條件：① 出 v1.6.0 → pull + 重跑 doctor；② `doctor` 掉渠道（平台換代）→ 立即更新

---

## 更新記錄（2026-07-02 repo-intel 複查）

- 星數從安裝時（2026-06-06，尚未記錄）暴增至 48.8K，登上 GitHub Trending #1；近 4 週 commit 35→5→1→3，爆紅後明顯降溫但 release 仍密集（v1.3.0→v1.5.0）
- 平台數從 README 記載的「17」收斂為「15」，微信公眾號、微博兩個頻道在最新 README 中已不再列出（可能整併或下線，需實測確認）
- B站後端已從 yt-dlp 切換為 bili-cli（2026-06 實測：yt-dlp 被 B站風控 412 封死）
- Open Issues 51 / Open PRs 68，PR 積壓略多，社群貢獻踴躍但合併速度可能跟不上
- **2026-07-02 已完成更新**：v1.4.0 → v1.5.0，並補裝 Exa/LinkedIn/OpenCLI（Twitter/Reddit/Facebook/Instagram/B站/小紅書），頻道可用數 4/16 → 13/15
- **待辦（僅剩兩項，皆需人工操作）：** 雪球需管理員權限重跑 cookie 匯出；小宇宙播客需裝 ffmpeg

---

## 反向連結

- [[Claude/Claude環境操作手冊]] — Skills 安裝與管理
- [[Claude/Command Center Plugin — Obsidian 指揮中心]] — Morning Briefing 可整合 Twitter/微博頻道
- [[mvanhorn-last30days-skill — AI 多平台社群研究引擎]] — 同為多平台社群研究工具，定位互補

---

## Tags

#tool #claude-code #skills #social-media #twitter #youtube #reddit #bilibili #xiaohongshu #weibo #v2ex #github #rss #web #mcp #agent-skills #internet
