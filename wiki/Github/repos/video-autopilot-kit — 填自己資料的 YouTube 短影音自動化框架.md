---
source: "https://github.com/Hao0321/video-autopilot-kit"
author: "Hao0321 (Hao0321 Studio)"
stars: "1.5K"
clipped: 2026-07-21
tags:
  - "github/repo"
  - "video-automation"
  - "capcut"
  - "ffmpeg"
  - "creator-tools"
---

# video-autopilot-kit — 填自己資料的 YouTube / 短影音自動化框架

> **Hao0321/video-autopilot-kit** | ⭐ 1,476 | 🍴 254 | 📝 MIT
> "Fill-in-your-own-data framework for YouTube / short-form video automation: CapCut JSON + ffmpeg tooling + an onboarding questionnaire. Ships with zero private data."

## 一句話說明

一套**框架式**（非成品）的 YouTube/短影音自動化工具 + 方法論模板。給你純程式 ffmpeg pipeline + CapCut 草稿 JSON 自動化的程式碼，加一份「問卷」（SETUP.md）——你回答關於自己頻道的問題，它就變成屬於你的系統。核心賣點：**零私人數據**，voice/策略/社群數字全是空白模板，避開「抄某個人的設定對你沒用還誤導」的陷阱。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,476 |
| Forks | 254（fork 率極高 ~5.8:1） |
| 主要語言 | Python（100%） |
| 授權 | MIT |
| 建立時間 | 2026-06-01 |
| Open Issues / PRs | 0 / 2 |
| 最新 Release | v0.8.0（2026-07-10，macOS 支援 + CapCut 版本相容 + 雙路徑重定位） |
| Release 節奏 | v0.5→v0.8 一個多月內 4 版，頻繁迭代 |
| 作者 | Hao0321 Studio（單一作者） |

## Repomix 分析

- 總檔案數 77，總 tokens 247K（411KB 小 repo，不壓縮）
- Top 檔：knowledge/meta-lessons.md（36K, 14.7%，M1-M106 避坑大全）、delivery_qa.py、caption_broll_matcher.py、youtube-algorithm-2026.md、CHANGELOG.md
- 價值一半在知識庫、一半在程式碼

## 核心功能

**雙 first-class path（v0.8.0 從「CapCut 主力/ffmpeg 次要」重定位）：**

- **Path 1 — Programmatic（推薦預設，跨平台 Win/Mac/Linux）**
  - `longform_maker/`：教學長片——`fx_lib` premium 動態引擎（亞像素 Ken Burns / 雙層 bloom / light sweep / 合成 SFX）、`word_captions` 字級時間字幕、`screen_clean` 螢幕錄影清理
  - `silent_vlog_maker/`：純 ffmpeg pipeline——直式 Shorts（多色字幕 / BGM 高光起點 / 正規化）、靜音 vlog、11 維度 audit
  - `capcut_helpers/` **QA gates**：交付前機械化 QA（`delivery_qa` 頻閃/死空檔/caption-sync 全幀掃描、`broll_audit`、`caption_broll_matcher`）——不需 CapCut
- **Path 2 — CapCut-assisted（作者主用，Windows-first、版本敏感）**：草稿 JSON 直改（4-level 靜音/花字/AI 字幕校正）+ Computer Use 操作 CapCut 視窗（套模板/匯出）。`detect_draft_format()` 先驗明文（剪映 CN 6.0+ 已 AES 加密不可直改）
- **共用**：`knowledge/`（M1-M106 避坑 + 演算法 + SOP 21 檔）、`templates/`（空白填寫模板）、`examples/`（60 秒可跑 demo）

## 技術架構

```
SETUP.md（問卷）→ templates/*.template.md → profiles/*.md
                         │  config.example.py → config.py
        ┌────────────────┴────────────────┐
   Path 1 純程式                      Path 2 CapCut
   (Win/Mac/Linux)                    (Windows-first)
   longform/silent_vlog/ffmpeg        draft JSON + Computer Use GUI
        └──────► QA gates (delivery_qa) ◄──┘
              頻閃/死空檔/caption-sync 全幀掃描
                         ▼  player-safe 成品
   platform_compat.py：CJK 字型探測 + 路徑解析（跨平台）
```

| 層次 | 技術 |
|------|------|
| 入口/方法論 | SETUP.md 問卷 + knowledge/（M1-M106） |
| 純程式路徑 | Python + ffmpeg/ffprobe |
| CapCut 路徑 | 草稿 JSON 直改 + Computer Use GUI |
| 跨平台層 | platform_compat.py（不 hardcode 字型/路徑） |
| 品質閘 | delivery_qa 機械化 QA（兩路共用） |

**設計亮點**：「方法論即產品」——知識庫（M1-M106）沉澱實戰踩坑、機械化 QA 閘 + self-critique 17 關。M10「不講話 > 編造數字」、「先看畫面再寫文案」與 QA 職涯 + institution R12/R14 高度共鳴。

## 與現有系統的相關性

- **Obsidian**：高。與 [[project_ai_video_pipeline]]、剛分析的 [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] 同賽道且**互補**：vak 走 ffmpeg/CapCut 實拍素材剪輯（vlog/Shorts），video-shotcraft 走 Remotion 程式化動畫（產品宣傳片）。
- **Claude Code**：中-高。Path 2 明說用 Claude 的 Computer Use 操作 CapCut；SETUP.md 可「丟整個 repo 給 Claude 照問卷問你」。非 skill 格式但 agent-friendly。
- **Automation**：中。Path 1（Python+ffmpeg）可接自動化零 GUI；Path 2 需 CapCut+Computer Use，不適合無人值守。

## 安裝建議

**⏳ 觀望** — 品質扎實、方法論成熟、雙路徑務實、MIT 友善，但對你的價值取決於是否真做 vlog/Shorts 實拍剪輯：①目前無明確短影音經營需求（求職 QA 定位為主）；②與 video-shotcraft 賽道重疊（互補：實拍 vs 程式化）；③Path 2 吃 CapCut 版本相容矩陣，維護成本真實。**但 knowledge/meta-lessons.md（M1-M106）零依賴可讀**，是最可攜資產。

- **升級條件（→ ✅ 採用）**：啟動實拍短影音/vlog 專案；或想吸收 M1-M106 避坑庫 + delivery_qa 機械化 QA 概念進自己流程。
- **放棄條件（→ ❌ 不裝）**：作者停更（單一作者風險）；或影片方向全走 Remotion 程式化（用 video-shotcraft 即可）；或不碰 CapCut 而 Path 1 被既有工具覆蓋。

## 相關連結

- [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] — 同賽道互補（程式化動畫 vs 實拍剪輯）
- [[ai-media-generator — 跨平台 AI 媒體生成 Prompt Skill|ai-media-generator]] — 同作者 Hao0321 另一專案
- [[Remotion]] — 另一條 React 影片路線
