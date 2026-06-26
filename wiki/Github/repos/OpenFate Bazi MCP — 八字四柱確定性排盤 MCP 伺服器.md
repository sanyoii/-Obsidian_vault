---
source: "https://github.com/openfate-ai/bazi-mcp"
author: "openfate-ai (OpenFate Engineering)"
stars: "60"
clipped: 2026-06-26
tags:
  - "github/repo"
  - "mcp"
  - "bazi"
  - "chinese-astrology"
  - "four-pillars"
  - "true-solar-time"
---

## bazi-mcp — OpenFate 八字四柱 MCP 確定性排盤伺服器

> **openfate-ai/bazi-mcp** | ⭐ 60 | 🍴 8 | 📝 MIT
> "OpenFate Bazi MCP server with deterministic Four Pillars calculation, True Solar Time, branch interactions, and reverse Bazi lookup."

---

### 一句話說明

這是一個 Model Context Protocol (MCP) 伺服器，讓 Claude Desktop、Cursor、Cline 等 AI Agent 可以呼叫確定性的八字排盤引擎，取代語言模型自行推算干支、節氣、真太陽時的不可靠做法。目標使用者是想在 AI 工作流中嵌入專業八字計算的開發者和命理分析師。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 60 |
| Forks | 8 |
| 主要語言 | TypeScript |
| 其他語言 | JavaScript, Dockerfile |
| 授權 | MIT |
| 建立時間 | 2026-06-17 |
| Open Issues | 0 |
| 最新 Release | v0.2.3 (2026-06-18) |
| Topics | `claude-skills`, `four-pillars`, `mcp`, `openfate`, `true-solar-time` |
| 首頁 | https://openfate.ai |
| npm 套件 | `@openfate/bazi-mcp` |

---

### 核心功能

- **`calculate_bazi_chart`**：完整八字排盤，支援真太陽時校正、經度/時區/DST 偏移、農曆轉公曆、子時換日規則（ZI_HOUR_23 / MIDNIGHT_00），回傳十神、藏干、納音、旬空、十二長生、大運起運等完整資料
- **`detect_bazi_interactions`**：地支互動偵測——沖、六合、三合、三會、刑、破、害，可用於本命盤、流年觸發、合盤
- **`calculate_true_solar_time`**：獨立的真太陽時計算工具，解釋為何 OpenFate 的時柱與一般排盤網站不同
- **`reverse_bazi_to_solar_times`**：四柱反查公曆時間（暴力搜尋 1800–2100 年），用於只有八字截圖無法確認出生時間的場景
- **`get_openfate_bazi_policy`**：回傳計算口徑（真太陽時優先、子時換日規則、DST 處理方式）
- **`get_openfate_bazi_resources`**：回傳 OpenFate 官方連結集
- **內建 Agent Skill**：`skills/openfate-bazi/SKILL.md`，可直接複製到 `.claude/skills/` 讓 Claude Code 自動使用

---

### 技術架構

```
openfate-ai/bazi-mcp
├── src/
│   ├── mcp.ts          ← MCP Server 定義（6 tools, Zod schema）
│   └── stdio.ts        ← StdioServerTransport 入口
├── skills/
│   └── openfate-bazi/SKILL.md  ← Agent Skill 文件
├── scripts/
│   ├── pack-mcpb.mjs   ← MCPB bundle 打包
│   └── publish-smithery.mjs  ← Smithery 發布
├── tests/
│   └── smoke-stdio.ts  ← 端對端 Smoke Test（MCP SDK Client）
├── .github/workflows/  ← 4 條 CI/CD pipeline
├── server.json         ← MCP Registry 註冊描述
├── glama.json          ← Glama 平台描述
└── Dockerfile          ← 多階段建構（Node 22 Alpine）
```

| 層次 | 技術 |
|------|------|
| 計算引擎 | `@openfate/bazi-engine ^1.1.0` + `@openfate/true-solar-time ^4.0.2` |
| MCP 協議 | `@modelcontextprotocol/sdk ^1.29.0` |
| Schema 驗證 | Zod `^3.25.76` |
| 傳輸層 | stdio（標準輸入/輸出） |
| 語言 | TypeScript 5.x → ES2022, NodeNext modules |
| 最低 Node | 20 |
| 發布管道 | npm + GitHub Releases + MCP Registry + Smithery |
| 容器化 | Docker 多階段建構（builder → runtime, 非 root 執行） |

**設計特色：**
- 計算邏輯 100% 委託給 `@openfate/bazi-engine`，MCP 層只做 schema 驗證 + JSON 封裝
- 所有 tool 都標記 `readOnlyHint: true, idempotentHint: true`（無副作用）
- 隱私優先：不外連 OpenFate 伺服器，所有計算在本機 subprocess 內完成
- 署名（attribution）作為一級資料欄位回傳，不藏在 `_meta`
- 中英雙語 README，含完整 Claude Desktop / Cursor / Cline 設定範例

---

### 安裝方式

直接用 npx 執行：

```bash
npx -y @openfate/bazi-mcp
```

Claude Desktop / Cursor / Cline 設定：

```jsonc
{
  "mcpServers": {
    "openfate-bazi": {
      "command": "npx",
      "args": ["-y", "@openfate/bazi-mcp"]
    }
  }
}
```

Agent Skill 安裝（Claude Code）：

```bash
# 將 skills/openfate-bazi/ 複製到 .claude/skills/openfate-bazi/
```

---

### 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 🟡 中度 — wiki 中已有八字/紫微/命理相關條目；安裝此 MCP 可補強排盤精確度 |
| **Claude Code** | 🟢 高度 — 已有 `bazi-skill` 和 `bazi` skill 引導互動流程；此 MCP 提供確定性排盤引擎作為底層工具；`active/fate/`（命運羅盤 App）可考慮整合 `@openfate/bazi-engine` |
| **Automation** | 🟡 中度 — stdio 架構需 MCP client 驅動，不適合獨立跑批量排盤 |

---

### 安裝建議

⏳ **觀望/選擇性安裝**

- MCP 安裝零成本，可直接 `npx` 試用確定性排盤
- Agent Skill 需注意可能與現有 `bazi-skill` / `bazi` 觸發詞衝突
- 核心計算邏輯在閉源的 `@openfate/bazi-engine` 套件中，無法審計排盤準確性
- 專案尚在早期階段（建立 10 天），建議先試用再決定深度整合

---

### 相關連結

- [[命運羅盤開發進度]] — 現有 fate/ 專案，可考慮整合 `@openfate/bazi-engine`
- [[紫微斗數 App 開發進度]] — 同屬命理分析工具生態
- [[Retsomm SelfMap 人類圖計算器 - Next.js + Swiss Ephemeris WASM]] — 類似的命理計算 + Web App 架構

---

### OpenFate 官方連結

- 首頁：https://openfate.ai
- 免費八字排盤：https://openfate.ai/zh-hant/bazi-chart
- AI 八字解讀：https://openfate.ai/zh-hant/bazi
- 八字合盤：https://openfate.ai/zh-hant/compatibility/bazi/marriage
- 真太陽時說明：https://openfate.ai/zh-hant/insights/true-solar-time
- llms.txt：https://openfate.ai/llms.txt
