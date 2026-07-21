---
source: "https://github.com/ourongxing/newsnow"
author: "ourongxing (荣星)"
stars: "21K"
clipped: 2026-07-22
tags:
  - "github/repo"
  - "news-aggregator"
  - "self-hosted"
  - "hotlist"
  - "typescript"
---

# newsnow — 優雅的即時熱榜新聞聚合器（可自架）

> **ourongxing/newsnow** | ⭐ 21,083 | 🍴 5,837 | 📝 MIT
> "Elegant reading of real-time and hottest news"

## 一句話說明

優雅、可自架的即時熱榜聚合器。把 40+ 中外平台的熱榜/熱搜（百度/微博/知乎/B站/抖音/華爾街見聞/財聯社/雪球/V2EX/GitHub Trending/Hacker News/Product Hunt…）集中到乾淨介面，分「關注/最熱/實時/更新」四模式，支援 GitHub 登入收藏、深色模式。前後端全開源、Docker/Cloudflare/Vercel 一鍵部署。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 21,083 |
| Forks | 5,837（極高，自架/客製典型） |
| 主要語言 | TypeScript |
| 授權 | MIT |
| 建立時間 | 2024-09-23 |
| 最後推送 | 2026-07-07（活躍） |
| Open Issues / PRs | 139 / 13 |
| 最新 Release | v0.0.41（2026-06-26） |
| 首頁 | newsnow.busiyi.world（官方 demo） |
| 貢獻者 | ourongxing + 多位外部（真社群專案） |

## Repomix 分析

- 總檔案數 156，總 tokens 78K（精簡）；security 掃描乾淨
- Top 檔：public/icon.svg、shared/sources.json（66 源定義）、pre-sources.ts、column/card.tsx
- 核心價值在 `shared/sources.json`（源 metadata）+ `server/sources/*.ts`（每源一爬蟲）

## 核心功能

- **40+ 熱榜來源聚合**（sources.json 66 條含子分頁）：中文（百度/微博/知乎/抖音/B站/36氪/IT之家/澎湃/貼吧/酷安/虎撲）、財經（華爾街見聞/財聯社/雪球/格隆匯/金十/法布/MKTNews）、國際科技（Hacker News/Product Hunt/GitHub Trending/Solidot/聯合早報/參考消息）、社群（V2EX/虫部落/遠景論壇）
- **四種閱讀模式**：關注（登入自訂）/ 最熱 / 實時 / 更新
- **每源獨立爬蟲**（`server/sources/<source>.ts`，cheerio+ofetch）：易擴充新源
- **GitHub OAuth 登入**：收藏個人化來源、跨裝置同步
- **sqlite 快取**（better-sqlite3）：保護來源站不被打爆
- **一鍵部署**：Docker / Cloudflare Pages / Vercel（Nitro serverless）
- **深色模式 + 優雅動畫**（UnoCSS）

## 技術架構

```
瀏覽器 (React 19 + TanStack Router/Query + UnoCSS)
        │  fetch /api/s?id=<source>
        ▼
Nitro 伺服器 (nitro-go + h3)
   ├── server/api/       s/（熱榜資料）, oauth/github, me/sync, login
   ├── server/middleware/auth.ts   （GitHub OAuth）
   ├── server/sources/<source>.ts  （每源一爬蟲，cheerio+ofetch）
   ├── server/database/  cache.ts（sqlite 快取）+ user.ts（收藏同步）
   └── shared/sources.json         （66 源 metadata）
        ▼  部署：Docker / Cloudflare / Vercel
```

| 層次 | 技術 |
|------|------|
| 前端 | React 19 + TanStack Router + TanStack Query + UnoCSS |
| 伺服器 | Nitro（nitro-go）+ h3 |
| 爬取 | cheerio + ofetch（每源獨立 parser） |
| 儲存 | better-sqlite3（快取 + 收藏） |
| 認證 | GitHub OAuth |
| 部署 | Docker / Cloudflare / Vercel（serverless） |

**設計亮點**：「每源一檔爬蟲 + 中央 sources.json」的可擴充架構——加新源 = 寫一支 `server/sources/xxx.ts` + sources.json 加一條，低門檻讓社群貢獻新源（5837 forks 多為此）。Nitro serverless 讓同一份碼跑 Docker/Cloudflare/Vercel。sqlite 快取保護來源站。

## 社群健康度

- 貢獻者：ourongxing + 10+ 外部（真社群專案）
- Release v0.0.37→v0.0.41 持續迭代（版號仍 0.x）
- 21,083⭐/5,837 fork（star-fork 3.6:1，fork 率極高）；139 open issues 反映固有痛點：來源站改版→個別爬蟲失效需社群持續修
- 社群口碑正面（多篇知乎/騰訊雲/博客園/CSDN 教學）：擺脫演算法繭房、介面優雅、Docker 自架簡單

## 與現有系統的相關性

- **Obsidian**：高。與 [[project_social_monitor]]（社群海巡）、[[project_obsidian_dashboard]]（Social Trends 面板）直接相關。現成 40+ 源熱榜聚合，可當海巡資料源或自架資訊中心。財經源（雪球/華爾街見聞/財聯社）能餵 [[jane-finance]] 市場情緒。
- **Claude Code**：中。非 skill/MCP，是自架 web app。`server/sources/*.ts` 爬蟲寫法可借鑑；自架後 `/api/s` 端點當結構化熱榜 API 給 agent 查。
- **Automation**：中-高。自架後 `/api/s?id=<source>` 是現成熱榜 JSON API，可接海巡自動化（定時抓 → 分析 → 寫 Obsidian），比自維護 66 支爬蟲省事。

## 安裝建議

**✅ 適合安裝（自架評估）** — 21K⭐ 成熟、MIT、活躍、架構乾淨、口碑佳、Docker 一鍵部署。對 social-monitor 海巡 + Obsidian Dashboard 高度契合，自架後 `/api/s` 可當結構化熱榜 API 接自動化，財經源能餵 jane-finance。建議：先跑官方 demo 確認源覆蓋，再 Docker 自架接海巡 pipeline。

- **升級條件（→ 深度整合）**：實測 `/api/s` 端點穩定、源覆蓋滿足海巡 → Docker 自架接 social-monitor 定時抓取
- **放棄條件（→ 不用）**：只需少數源（自寫爬蟲更輕）；或不想維護自架服務（來源站改版→爬蟲壞的負擔）；或現有 last30days/agent-reach 已覆蓋

## 相關連結

- [[Github/repos/TrendRadar — 一鍵部署的 AI 舆情熱點聚合監控助手|TrendRadar]] — **下游**：TrendRadar 綁 newsnow 單點 API 當資料源 + 加 AI 篩選/MCP
- [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層|Agent Reach]] — 互聯網感知（已裝，部分重疊）
- [[Github/repos/mvanhorn-last30days-skill — AI 多平台社群研究引擎|last30days]] — 社群研究引擎（已裝）
