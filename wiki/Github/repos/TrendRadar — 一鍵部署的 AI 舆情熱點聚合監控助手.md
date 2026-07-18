---
source: "https://github.com/sansan0/TrendRadar"
author: "sansan0"
stars: "60K+"
clipped: 2026-07-18
tags:
  - "github/repo"
  - "automation"
  - "news-aggregation"
  - "mcp"
  - "public-opinion"
---

# TrendRadar — 一鍵部署的 AI 舆情熱點聚合監控助手

> **sansan0/TrendRadar** | ⭐ 60,653 | 🍴 24,789 | 📝 GPL-3.0 | Python ≥3.12 | v6.10.0（MCP v4.1.0）
> 官網：https://trendradar.sandev.cc

## 一句話說明

聚合 35+ 中文主流平台（抖音/知乎/微博/B站/百度等）與 RSS 訂閱源的即時熱點，用關鍵字語法 + AI 自然語言篩選出使用者真正在意的新聞，經 AI 分析/翻譯後推播到 9 種通知渠道（微信/飛書/Telegram/email/ntfy/bark/slack 等），並可掛 MCP server 讓 AI 對話式做趨勢與情感分析。核心賣點是**最快 30 秒 fork 即跑**——靠 GitHub Actions 免費排程，零伺服器、零程式基礎。

## 核心功能

- **全網熱榜聚合**：35+ 平台，資料來自第三方 [newsnow](https://github.com/ourongxing/newsnow) API（非自建爬蟲，靠作者善意授權）
- **RSS 訂閱融合**（v4.5+）：RSS/Atom 與熱榜同一管線篩選合併
- **精準篩選語法**：`+必含`、`!排除`、`/正則/`、`@數量上限`
- **AI 智能篩選**（v6.5+）：自然語言描述興趣 → AI 自動分類打分只推需要的
- **AI 分析推播 + 多語翻譯**：LiteLLM 統一介面接 100+ 模型（DeepSeek/OpenAI/Gemini/Ollama），批次翻譯省 token
- **MCP 對話分析**（v4.1）：17 個分析工具，AI 自然語言查熱點動態/跨平台關聯/情感洞察
- **9 推播渠道 × 3 推播模式**（日報 / 當前榜 / 增量監控）
- **趨勢追蹤**：排名變化偵測，抓上升下降轉折點

## 技術架構

模組化 Python pipeline，資料流單向清晰：

```
newsnow API ──► crawler/ (fetcher + rss/)
                    │
                    ▼
              core/ (scheduler, config, data, frequency, analyzer)
                    │
                    ▼
              ai/ (filter_pipeline, translator, analyzer ── LiteLLM)
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   report/      notification/  storage/
  (html,        (dispatcher,   (local SQLite /
   rss_html)     senders,       remote S3-boto3)
                 splitter,
                 batch)

  mcp_server/ (FastMCP) ── services + 17 tools + utils
```

| 層次 | 技術 |
|------|------|
| 爬取 | requests、feedparser（RSS）、newsnow API |
| AI | litellm（100+ 模型）、json-repair、tenacity（重試）|
| MCP | fastmcp 2.12、websockets |
| 儲存 | SQLite（本地）/ boto3 S3（雲端自持）|
| 部署 | GitHub Actions、Docker、Cloudflare Pages、本地 |
| 設定 | PyYAML（config.yaml / timeline.yaml / frequency_words）|

- **主要依賴**：requests、pytz、PyYAML、fastmcp、websockets、feedparser、boto3、litellm、json-repair、tenacity
- **入口**：`trendradar`（主程式）、`trendradar-mcp`（MCP server）
- 121 檔 / 458K tokens（repomix）；最大檔集中在 `notification/`（多帳號批次推播切分邏輯）

## 專案特性與風險

- **fork/star ≈ 0.41**（24.7K forks）異常高——反映「fork 來自己跑」的部署模型，非協作貢獻量
- **單人主導**（sansan0 + 2 偶發貢獻者），巴士因子=1
- **核心資料綁定 newsnow 單一第三方 API**：作者靠善意授權、無正式 SLA，一旦失效整個工具空轉
- **GPL-3.0**：商用衍生需開源
- 中文圈曝光度極高：阮一峰週刊、小眾軟體、HelloGitHub、LinuxDo、Trendshift #14726 收錄

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian Vault | 可餵熱點簡報進知識庫，但與既有 [[Github/repos/mvanhorn-last30days-skill — AI 多平台社群研究引擎\|last30days]] / [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層\|Agent Reach]] 高度重疊 |
| Claude Code | 差異化亮點：**MCP server（17 工具）**可掛進 Claude Code 做對話式趨勢分析——現有 social-monitor / agent-reach 無此形態 |
| Automation | GitHub Actions cron 推播；本環境已有 Task Scheduler 版 social-monitor，機制不同目的相同 |

**重疊盤點**：既有 social-monitor（last30days 引擎）+ agent-reach + last30days 已覆蓋「聚合+推播」約 80%。TrendRadar 唯一不重疊處是**中文熱榜（抖音/微博/知乎）聚合** + **MCP 對話式分析介面**。

## 安裝建議

**⏳ 觀望** — 職能與既有 social-monitor / agent-reach 高度重疊，核心資料綁定 newsnow 單點第三方 API，貿然接入是加複雜度換小改善（R13 不划算）。

- **升級條件（→ ✅ 裝）**：需要中文平台熱榜 + AI 對話式查趨勢時，單獨接其 MCP server（`trendradar-mcp`）進 Claude Code，不跑整套推播管線。
- **放棄條件（→ ❌ 不裝）**：newsnow API 停止授權/失效，或 social-monitor 已能覆蓋中文熱點需求。

## 相關連結

- [[Github/repos/mvanhorn-last30days-skill — AI 多平台社群研究引擎|last30days]]
- [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層|Agent Reach]]
- [[Github/repos/Usagi-orgai-goofish-monitor 基于 Playwright 和AI实现的闲鱼多任务实时定时监控与智能分析系统，配备了功能完善的后台管理UI。帮助用户从闲鱼海量商品中，找到心仪产品。|閒魚監控]]
