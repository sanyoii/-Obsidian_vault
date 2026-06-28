---
source: "https://github.com/mvanhorn/last30days-skill"
author: "mvanhorn (Matt Van Horn)"
version: "3.3.2"
clipped: 2026-06-06
tags:
  - "github/repo"
  - "skills"
  - "research"
  - "social-media"
  - "claude-code"
---

# last30days-skill — AI 多平台社群研究引擎

> 一個 AI Agent-led 多來源研究工具：搜尋任何主題過去 30 天的真實社群聲音，以 upvotes、likes、真實金錢（Polymarket）評分——不靠編輯挑選。

**Repo：** https://github.com/mvanhorn/last30days-skill  
**版本：** 3.3.2（Agent Skills 格式）  
**作者：** mvanhorn（Matt Van Horn）  
**授權：** MIT  
**規模：** GitHub Trending #1（曾登頂），102 個檔案

---

## 一句話說明

以 `/last30days <主題>` 呼叫，平行搜尋 Reddit、X、YouTube、TikTok、Instagram、Hacker News、Polymarket、GitHub 等 10+ 個平台，AI 以社群互動量（upvotes、likes、真實押注金額）排序，產出一份不受編輯干預的即時輿情簡報。

---

## 主要功能

- **多來源平行搜尋**：Reddit、X（Twitter）、YouTube、TikTok、Instagram、Hacker News、Polymarket、GitHub、Bluesky、Pinterest、Threads、Truth Social
- **社群訊號評分**：Reddit upvotes、X likes、YouTube 轉錄、Polymarket 真實金額押注——排序依據是真實人類的注意力與金錢
- **零設定啟動**：Reddit、HN、Polymarket、GitHub 即開即用；30 秒內透過 setup wizard 解鎖 X、YouTube、TikTok
- **Agent Skills 格式**：安裝為 `/last30days` slash command，跨 50+ AI 編碼 harness（Claude Code、Codex、Cursor、GitHub Copilot、Gemini CLI）
- **AI 合成簡報**：搜集完原始資料後，AI judge 合成為一份附來源的結構化研究報告
- **Competitors 模式**：`/last30days <主題> --competitors` 快速比較多個競品的社群聲量
- **Private Beta 通道**：實驗性功能在 `/last30days-beta` 測試後才推公版

---

## 技術棧

| 層    | 技術                                            |
| ---- | --------------------------------------------- |
| 語言   | Python 3.12+（核心），Node.js（X 搜尋 vendored 客戶端）   |
| 套件管理 | `uv`（venv 在 `.venv/`），無外部 Python runtime 依賴   |
| 測試   | pytest（89 測試檔，含 coverage；`uv run pytest`）     |
| 格式   | Agent Skills 開放格式（`SKILL.md` + `scripts/`）    |
| X 搜尋 | 自帶 `lib/vendor/bird-search/`（Node.js MJS 模組）  |
| 安裝方式 | `npx skills add mvanhorn/last30days-skill -g` |

---

## 與現有環境的相關性評估

| 面向                      | 評估                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------- |
| **Skill 格式相容性**         | ✅ 完全相容。使用 `SKILL.md` + `scripts/` 格式，與 `d:\Claude\.claude\skills\` 現有結構一致               |
| **Claude Code 安裝**      | ✅ 支援 `/plugin marketplace add mvanhorn/last30days-skill` + `/plugin install last30days` |
| **Morning Briefing 加值** | ✅ 可強化現有 social-monitor 報告——從「有什麼帖子」升級為「社群實際在討論什麼 + 輿情排名」                                |
| **Repo 分析工作流**          | ✅ 分析 GitHub repo 前可先 `/last30days <repo名>` 快速了解社群評價                                     |
| **研究查詢（/query）**        | ✅ 補充 wiki 不足時，可直接用 `/last30days` 取得帶來源的即時補充資料                                           |
| **平台相依性**               | ⚠️ 解鎖 X/YouTube/TikTok 需 API keys 或 browser session cookies；Polymarket 無需金鑰             |
| **衝突風險**                | 🟢 低。純 slash command skill，不改動 hooks/settings/agents                                    |

---

## 安裝建議

**✅ 適合安裝**

理由：與現有 Claude Code skills 環境完全相容，零設定即可啟用基本功能（Reddit + HN + Polymarket + GitHub），直接補強 morning briefing 與即時研究能力，沒有衝突現有 hooks 或 memory 系統的風險。

```bash
# Claude Code（推薦，自動更新）
/plugin marketplace add mvanhorn/last30days-skill
/plugin install last30days

# 或手動安裝（全域，跨所有 Agent Skills 主機）
npx skills add mvanhorn/last30days-skill -g
```

**使用範例：**
```
/last30days Claude Code 2026
/last30days nvidia earnings 市場反應
/last30days mvanhorn/last30days-skill --competitors
```

---

## 反向連結

- [[Claude/Claude環境操作手冊]] — Skills 安裝與管理
- [[Claude/Command Center Plugin — Obsidian 指揮中心]] — Morning Briefing 可整合
- [[ECC — Claude Code harness-native 操作系統]] — 同為 Agent Skills 生態工具

---

## Tags

#tool #claude-code #skills #research #social-media #reddit #twitter #youtube #tiktok #polymarket #agent-skills #multi-source
