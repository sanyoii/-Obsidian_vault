---
source: "https://github.com/Hommy-master/capcut-mate"
author: "Hommy-master (简创AIGC)"
stars: "1.4K"
clipped: 2026-07-22
tags:
  - "github/repo"
  - "capcut"
  - "jianying"
  - "video-automation"
  - "coze"
---

# capcut-mate — 開源剪映草稿自動化 REST API（讓 LLM 剪片）

> **Hommy-master/capcut-mate** | ⭐ 1,418 | 🍴 230 | 📝 Apache-2.0
> "开源剪映小助手｜剪映API｜扣子插件｜Open-source CapCut automation toolkit to generate & download draft files."

## 一句話說明

建於 FastAPI 的開源剪映（CapCut/剪映）草稿自動化 API，把剪映核心剪輯功能封裝成 ~35 個 REST 端點，讓**大模型/LLM 程式化生成剪映草稿檔**——建草稿、加影片/音訊/圖片/字幕/貼紙/特效/濾鏡/遮罩/關鍵幀、算時間軸，最後雲端渲染出片。可獨立部署，或接 Coze（扣子）/ n8n 建自動化工作流。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,418 |
| Forks | 230 |
| 主要語言 | Python（+ Electron 桌面客戶端） |
| 授權 | Apache-2.0 |
| 建立時間 | 2025-08-31 |
| 最後推送 | 2026-07-20（當天發版） |
| Open Issues / PRs | 2 / 2 |
| 最新 Release | v8.0.70（2026-07-20，高速迭代） |
| 首頁 | jcaigc.cn（簡創 AIGC 平台，Coze 工作流市場，商業） |
| 貢獻者 | Hommy-master + 6 位 |

## Repomix 分析

- 總檔案數 350，總 tokens 748K（--compress）；security 乾淨
- Top 檔：openapi.yaml（121K，API 契約）、pyJianYingDraft/metadata/（特效/濾鏡/字型巨型對照表）
- 核心 = openapi.yaml + pyJianYingDraft（剪映 draft 生成庫）

## 核心功能

- **~35 個 REST 端點**：
  - 草稿：`create_draft`/`save_draft`/`get_url`（下載）
  - 素材：`add_videos`/`add_audios`/`add_images`/`add_sticker`/`add_captions`/`add_text_style`
  - 效果：`add_effects`/`add_filters`/`add_masks`/`add_keyframes`/`get_effects`/`get_filters`/`get_image_animations`/`get_text_animations`
  - 出片：`gen_video`（雲渲染）/`gen_video_status`
  - 工具：`timelines`/`get_audio_duration`/`easy_create_material`/str↔list 轉換
- **建於 pyJianYingDraft**：Python 生成剪映 draft 檔的底層庫，含完整特效/濾鏡/字型 metadata 對照
- **三層架構**：API 層（收請求）→ service 層（業務邏輯）→ tools 層（下載/草稿快取/剪映自動化匯出）
- **Pydantic 驗證** + FastAPI 自動文檔（/docs）
- **Electron 桌面客戶端**（React+Vite）：草稿路徑偵測、下載、歷史、設定中心
- **多部署**：獨立（uv run）/ Docker / Coze 插件 / n8n / 雲渲染
- **雲端渲染**：草稿 → 剪映雲渲染 → 最終 MP4

## 技術架構

```
LLM / Coze / n8n / 桌面客戶端
        │  HTTP（~35 REST 端點）
        ▼
FastAPI 伺服器（:30000/docs 自動文檔）
   ├── API 層     路由 + Pydantic + middleware/log
   ├── service 層 業務邏輯（組裝草稿）
   └── tools 層   下載 / 草稿快取 / 剪映自動化匯出
        │  呼叫 src/pyJianYingDraft/（生成剪映 draft）
        │         └── metadata/ 特效/濾鏡/字型/動畫 對照表
        ▼  draft 檔 ──→ 剪映雲渲染 ──→ 最終 MP4
```

| 層次 | 技術 |
|------|------|
| API | Python 3.11 + FastAPI + Pydantic + Uvicorn（uv） |
| 草稿引擎 | pyJianYingDraft（+ metadata 資源對照） |
| 桌面客戶端 | Electron + React + Vite + Less |
| 部署 | Docker / uv / Coze 插件 / n8n |
| 出片 | 剪映雲端渲染 |

**設計亮點**：**把剪映核心功能「API 化」讓 LLM 能剪片**——不同於 video-autopilot-kit（本機改草稿 JSON + Computer Use GUI），capcut-mate 是純 REST API 服務 + 雲渲染，更適合工作流/SaaS 規模化自動化。pyJianYingDraft 的 metadata 對照表（近 30 萬 token）把剪映內建特效/濾鏡/字型全映射成可程式呼叫的 ID。

## 社群健康度

- 貢獻者 Hommy-master + 6 位（真社群）；Release v6→v8.0.70 高速迭代；pushedAt 2026-07-20 活躍；Issue/PR 2/2 低積壓
- 阿里雲開發者社區完整文檔系列（概述/API/部署/故障排除）+ DEV.to + GitHub Wiki，文檔生態成熟
- 商業背景：作者 jcaigc.cn（簡創 AIGC）是 Coze 工作流市場/AI 影片平台，本 repo 是其開源引流 + 插件生態核心
- 已知邊界：綁剪映/CapCut 生態（草稿格式 + 雲渲染），非剪映用戶無用；雲渲染可能商業計費

## 與現有系統的相關性

- **Obsidian**：中。與 [[video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架|video-autopilot-kit]]（CapCut 草稿 JSON 編輯）同賽道互補：vak 走本機草稿改寫 + Computer Use，capcut-mate 走 REST API + 雲渲染。與 [[project_ai_video_pipeline]] 相關。
- **Claude Code**：中。非 skill/MCP，是自架 API。可讓 agent 呼叫其 REST 端點程式化剪片；或當 Coze 插件用。openapi.yaml 齊全，易整合。
- **Automation**：中-高。為自動化設計——REST API + Coze/n8n + 雲渲染，適合「LLM 生成腳本 → API 建草稿 → 雲渲染出片」無人值守管線。本 session AI 影片工具中最 automation-friendly。

## 安裝建議

**⏳ 觀望** — 工程紮實、文檔成熟、真社群、automation-friendly，但**強綁剪映/CapCut 生態**是決定性條件：①目前無剪映自動剪片需求（QA 定位為主）；②與 video-autopilot-kit + 多個 AI 影片工具賽道重疊；③商業背景（jcaigc.cn + 雲渲染可能計費）。**但它是 AI 影片工具中最適合「API 化自動剪片」的**——若要做剪映批次自動化，這是首選架構。

- **升級條件（→ ✅ 裝）**：啟動剪映/CapCut 批次自動剪片專案，或要建 Coze/n8n 影片工作流 → 自架其 API
- **放棄條件（→ ❌ 不裝）**：不碰剪映生態；或 AI 影片走 Remotion（video-shotcraft）/生成模型（seedance）；或雲渲染商業計費擋路

## 相關連結

- [[video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架|video-autopilot-kit]] — 同 CapCut 賽道互補（本機草稿 vs REST API+雲渲染）
- [[seedance-2.0 — 導演式操作Seedance影片模型的Skill OS|seedance-2.0]] — 生成模型路線
- [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] — Remotion 程式化路線
