---
source: "https://github.com/Panniantong/Agent-Reach"
author: "Panniantong (Neo Reid)"
version: "1.4.0"
clipped: 2026-06-06
tags:
  - "github/repo"
  - "skills"
  - "tools"
  - "automation"
  - "claude-code"
  - "social-media"
---

# Agent Reach — AI Agent 互聯網感知層

> 一句話安裝指令，讓 AI Agent 同時讀懂 17 個平台：網頁、YouTube、Twitter、Reddit、小紅書、B站、微博、V2EX、雪球……零配置 8 個頻道，Cookie 解鎖其餘。

**Repo：** https://github.com/Panniantong/Agent-Reach  
**版本：** 1.4.0  
**作者：** Panniantong（Neo Reid）  
**授權：** MIT  
**規模：** 80 個檔案，Python 3.10+

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
| 測試      | pytest，CI 涵蓋 Python 3.10–3.13                              |
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

## 安裝狀態（2026-06-06）

**Skill 路徑：**
- Claude Code skill：`C:\Users\sanyo\.claude\skills\agent-reach\`
- Agent skill：`C:\Users\sanyo\.agents\skills\agent-reach\`
- 原始碼：`d:\Claude\tools\agent-reach\`

**頻道狀態（4/16 可用）：**

| 頻道 | 狀態 | 說明 |
|------|------|------|
| GitHub | ✅ | gh CLI 完整可用 |
| V2EX | ✅ | 公開 API |
| RSS/Atom | ✅ | feedparser |
| 任意網頁 | ✅ | Jina Reader（`curl https://r.jina.ai/URL`）|
| YouTube | ⚠️ | yt-dlp 已裝，PATH 未含 Scripts 目錄 |
| Reddit | ⚠️ | rdt-cli 0.4.1 已裝，需 `rdt login` 登入 |
| 全網語意搜尋 | ❌ | 需 `npm install -g mcporter`（npm 安裝失敗）|
| 微信公眾號 | ❌ | 需 mcporter + Exa MCP |

**可選頻道（尚未設定）：** Twitter/X、B站、小紅書、微博、小宇宙、雪球、抖音、LinkedIn

**後續擴充（按需配置）：**
```
告訴 Agent「帮我配 Twitter」  → 需 Cookie-Editor 匯出
告訴 Agent「帮我配微博热搜」  → 零設定（公開 API）
告訴 Agent「帮我配雪球」      → 需 Cookie-Editor 匯出
```

---

## 反向連結

- [[Claude/Claude環境操作手冊]] — Skills 安裝與管理
- [[Claude/Command Center Plugin — Obsidian 指揮中心]] — Morning Briefing 可整合 Twitter/微博頻道
- [[mvanhorn-last30days-skill — AI 多平台社群研究引擎]] — 同為多平台社群研究工具，定位互補

---

## Tags

#tool #claude-code #skills #social-media #twitter #youtube #reddit #bilibili #xiaohongshu #weibo #v2ex #github #rss #web #mcp #agent-skills #internet
