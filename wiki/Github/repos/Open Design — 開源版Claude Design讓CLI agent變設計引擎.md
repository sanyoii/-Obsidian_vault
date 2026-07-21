---
source: "https://github.com/nexu-io/open-design"
author: "nexu-io"
stars: "80K"
clipped: 2026-07-22
tags:
  - "github/repo"
  - "ai-design"
  - "claude-design-alternative"
  - "desktop-app"
  - "design-systems"
---

# Open Design — 開源版 Claude Design：讓 CLI agent 變設計引擎的桌面工作室

> **nexu-io/open-design** | ⭐ 80,322 | 🍴 9,261 | 📝 Apache-2.0
> "🎨 The open-source Claude Design alternative. 🖥️ Local-first desktop app. Your coding agent becomes the design engine…"

## 一句話說明

Claude Design 的開源替代品——local-first 桌面 app（macOS/Windows，Electron），把你**已在用的 coding agent CLI**（Claude Code/Codex/Cursor/Gemini/OpenCode/Qwen 25+ via BYOK）變成設計引擎，產出原型/landing/dashboard/簡報/圖片/影片/HyperFrames，匯出真檔案（HTML/PDF/PPTX/MP4）。把 Claude Design 的封閉 agent-native 迴圈拆成可讀寫的「skills + DESIGN.md 設計系統 + plugins」檔案系統。定位「agent 時代的 Figma 替代」+「$0 增量」（已付 Claude Code 就不用再花錢）。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 80,322（2026-04-28 建，3 個月爆紅） |
| Forks | 9,261 |
| 主要語言 | TypeScript（+ HTML/Astro/Python） |
| 授權 | Apache-2.0 |
| 最後推送 | 2026-07-21（當天活躍） |
| Open Issues / PRs | 414 / 221 |
| 最新 Release | open-design-v0.15.1（2026-07-17） |
| diskUsage | 1.7GB |
| 首頁 | open-design.ai（有 Cloud 付費模型服務） |
| Topics | claude-design, figma-alternative, byok, local-first, design-systems, agent-skills |

## Repomix 分析（策略性跳過）

1.7GB repo（22MB HTML + 65MB TS + assets），repomix --remote 不切實際 → 改 gh API 取 monorepo 結構 + README。pnpm monorepo（Electron 桌面 app）。

- apps/：desktop（Electron）、daemon、web、landing-page、packaged
- packages/：agui-adapter、plugin-runtime、host、sidecar(-proto)、registry-protocol、components、platform、metatool、contracts
- .claude/：skills/od-contribute + commands + marketplace.json

## 核心功能

- **CLI-agnostic 設計引擎**：不綁自家 agent，接已裝 25+ CLI（Claude Code/Codex/Cursor/Gemini/OpenCode/Qwen/Copilot/Amp/Hermes/Kimi…）或任意 OpenAI-compatible 端點（BYOK）
- **多產出型態**（Studio）：Prototype（單頁 HTML 沙箱 iframe）、HyperFrame（程式化動態→MP4）、Deck（→PPTX/PDF）、Image、Dashboard、mobile 原型
- **19 composable skills + 71 brand DESIGN.md 設計系統**（Linear/Stripe/Vercel/Notion/Apple…）：DESIGN.md = 品牌契約
- **五大頁面**：Home / Automation（可排程工作流）/ Design System / Plugins / Integrations（MCP + 任意 IDE）
- **沙箱 iframe 預覽** + 匯出 HTML/PDF/PPTX/MP4/ZIP
- **Open Design Cloud**（官方付費模型服務）+ plugin-runtime/registry-protocol 插件生態

## 技術架構

```
桌面 GUI (apps/desktop, Electron)  五頁 Home/Automation/DesignSystem/Plugins/Integrations
   ▼
apps/daemon（本機常駐）
   ├── packages/sidecar + host   ← 橋接你的 CLI agent（BYOK）
   ├── packages/agui-adapter     ← AG-UI 協定（agent↔GUI 串流）
   ├── packages/plugin-runtime   ← 插件執行
   └── registry-protocol + DESIGN.md 系統 + composable skills
   ▼
Studio：Prototype/HyperFrame/Deck/Image → 沙箱 iframe 預覽 → 匯出 HTML/PDF/PPTX/MP4
```

| 層次 | 技術 |
|------|------|
| 桌面殼 | Electron（macOS/Windows）+ TS |
| 常駐/橋接 | daemon + sidecar + host（接 CLI agent） |
| Agent-GUI | agui-adapter（AG-UI 協定串流） |
| 產出 | HyperFrames→MP4、HTML 沙箱、PPTX/PDF |
| 設計系統 | DESIGN.md（71 套）+ 19 skills |
| 生態 | plugin-runtime + registry-protocol + MCP |

**設計亮點**：**「不 bundle agent，把你已裝的 CLI 當引擎」**是最大差異化——$0 增量、避開被單一 model 綁死。把 Claude Design 封閉迴圈拆成可讀寫檔案系統。這是同一 vendor（nexu-io）把旗下 hyperframes/html-anything 等 skill 收攏進一個 GUI 桌面殼。

## 社群健康度

- 商業支持的開源（Cloud 付費服務 + Fellow 計劃 + Discord）
- Release v0.13→v0.15.1 高速迭代；pushedAt 2026-07-21 當天活躍
- 80,322⭐/9,261 fork（3 個月 80K⭐ 現象級）；414 issues 反映爆紅維護壓力
- 社群口碑：多篇比較文（wotai.co/knightli.com/opendesigner.io），共識賣點「wire into 已有 CLI 而非 bundle agent」；商業化取向（utm/Cloud 推銷）部分社群觀感保留

## 與現有系統的相關性

- **Obsidian**：中-高。**2026-05-22 曾移除 Open Design（2GB）釋放空間**（見 [[d:\Claude 環境建置紀錄]]）即本專案。與 [[reference_awesome_design_md]]（已用 design-fetch 取 73 品牌 DESIGN.md）功能重疊（它 71 套）。
- **Claude Code**：高但重疊。**nexu-io 是已裝 [[hyperframes]] 系列 + html-anything deck skills 的 vendor**——Open Design 是把這些 skill 收進 GUI 桌面殼。已 CLI-first 用其 unbundled skills；桌面 app 多的是 GUI 編排 + DESIGN.md 系統 + 插件市集。BYOK 接 Claude Code $0 增量。
- **Automation**：中。Automation 頁可排程設計工作流；但自動化 CLI/腳本 first，GUI 編排未必契合。

## 安裝建議

**⏳ 觀望** — 專案本身頂級（80K⭐、活躍、$0 增量、71 設計系統），但對你三保留：①**已移除過一次（2GB 空間成本）**，現 1.7GB；②**已 CLI-first 用其 unbundled skills**（hyperframes、html-anything）+ design-fetch 取 DESIGN.md，桌面 app 增量主要是 GUI 編排，與終端機工作流不完全對味；③商業化取向（Cloud/utm/Fellow）需留意。**但它是同 vendor 生態核心**，值得追蹤其 skill 更新。

- **升級條件（→ ✅ 裝）**：想要 GUI 設計工作室（視覺化預覽/DESIGN.md 管理/插件市集）而非純 CLI；或磁碟充裕想試 71 設計系統 + Automation 排程
- **放棄條件（→ ❌ 不裝）**：維持 CLI-first；skill 繼續 unbundled 用；1.7GB 不值 GUI 便利；或不想碰 Cloud 商業化

## 相關連結

- [[hyperframes]] — nexu-io 同 vendor 的 HTML 影片 skill（已裝，Open Design 內建）
- [[reference_awesome_design_md]] — 73 品牌 DESIGN.md（design-fetch 取，與 Open Design 71 套重疊）
- [[d:\Claude 環境建置紀錄]] — 2026-05-22 移除 Open Design 2GB 的紀錄
