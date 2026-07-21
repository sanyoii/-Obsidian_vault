---
source: "https://github.com/Vincentwei1021/video-shotcraft"
author: "Vincentwei1021 (Wei Yihao)"
stars: "337"
clipped: 2026-07-21
tags:
  - "github/repo"
  - "ai-video"
  - "claude-code-skill"
  - "remotion"
  - "motion-design"
---

# video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill

> **Vincentwei1021/video-shotcraft** | ⭐ 337 | 🍴 27 | 📝 Apache-2.0
> "AI video skill for Claude Code & Codex — cinematic product videos with Remotion: 106 shot recipe cards, 161 motion previews, a production-ready template"

## 一句話說明

把 Claude Code / Codex 變成一間動態設計工作室的 agent skill。指向你的產品，它用 Remotion（React 影片框架）分鏡、動畫、配音，產出電影感的產品宣傳／發表／demo 片——含真實頁面截圖、2.5D 運鏡、節奏卡點、電影級音效。核心產出是「知識庫」而非工具：106 張鏡頭配方卡 + 161 支動態樣片 + 一支已驗收的完整模板 + 六階段製作方法論，讓 AI agent 照著拍出有底線品質的片。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 337 |
| Forks | 27 |
| 主要語言 | TypeScript / JS / HTML / CSS / Python |
| 授權 | Apache-2.0 |
| 建立時間 | 2026-07-19（新專案） |
| Open Issues / PRs | 0 / 0 |
| 最新 Release | 無 |
| 首頁 | https://vincentwei1021.github.io/video-shotcraft/ |
| 作者 | Wei Yihao（單一作者） |

## Repomix 分析

- 總檔案數 421，總 tokens 478K（--compress，164MB repo）
- Top 檔：gallery/api/library.json（58K, 12.2%）、gallery/index.html、references/aesthetic-rules.md、references/pipeline.md
- token 分布極平均——典型「內容庫」型 repo，價值分散在 106 張卡 + demos 實作，非單一核心引擎

## 核心功能

- **106 張鏡頭配方卡**（`references/shots/`）：每張含意圖、能量、時長、**精確參數表（緩動/時值/cue 幀號）**、聲音句式、**已知坑**
- **161 支動態樣片 Gallery**：線上可搜尋/篩選/切換變體/複製卡名
- **Remotion demos 實作源碼**（`demos/<卡名>/*.tsx`）：參數真相在源碼，卡文只給語義
- **Ink Press 完整模板**：已驗收 36.2s / 1920×1080 / 30fps / 10 鏡頭紙墨琥珀風，換素材即複刻
- **可複用組件庫**（`assets/lib/`）：2.5D PageCam、Caption、DigitRoll、FlashCut + 截圖 capture 腳本
- **六階段方法論**：截圖採集 → 視覺方向 → 分鏡 → 實作 → 聲音設計 → QA，含 librosa 節奏卡點（誤差 ≤3f）

## 技術架構

```
使用者請求 → SKILL.md（agent 入口 + 9 條核心理念）
      ┌─────────┼─────────┐
   模板路線   自由創作    單鏡頭
      │         │          │
 TEMPLATE.md  pipeline.md  shots/<卡>.md + demos/<卡>/*.tsx
      └─────────┼─────────┘
                ▼  Remotion (React) 渲染
   assets/lib 組件 + assets/audio SFX
                ▼
  remotion still 自檢 → 整片渲染 → ffmpeg 抽幀
        → 獨立 subagent 視覺審查 → 交付
```

| 層次 | 技術 |
|------|------|
| Agent 入口 | SKILL.md（簡中）+ .claude-plugin/plugin.json |
| 知識層 | references/（shots / sequences / aesthetic-rules / music-beat-sync / sound-design） |
| 實作層 | demos/ + template/（Remotion + TypeScript + React） |
| 展示層 | gallery/（靜態 HTML + library.json） |
| 節奏分析 | Python（librosa） |

**設計亮點**：「方法論即產品」——9 條核心理念把難以言傳的電影感編碼成 agent 可執行規則（確定性渲染禁 `Date.now()`/`Math.random()`、關鍵資訊落定後 hold ≥1s、批量元素靠運動入場不逐個發光、交付前必派 fresh-context subagent 獨立審查）。與 institution R13/R17 高度同構。

## 與現有系統的相關性

- **Claude Code**：高。本身即 Claude Code / Codex agent skill（含 plugin.json），可 `npx skills add` 或 symlink 進 skills 目錄。與已裝 [[hyperframes]] 系列同類但更垂直（產品宣傳片）。
- **Obsidian**：中。與 [[Remotion]]、[[project_ai_video_pipeline]]、HyperFrames 同賽道。差異：走 Remotion/React 程式化 + 真實截圖路線，非 text-to-video 生成模型。
- **Automation**：低-中。需 Remotion 環境（Node + 無頭瀏覽器 + ffmpeg），非零配置。

## 安裝建議

**⏳ 觀望** — 品質高、方法論扎實、與 Claude Code skill 生態契合，但三保留：①極新（開源約 2 天、無 release、無社群驗證）；②與已裝 HyperFrames 系列功能重疊（都做 HTML/React 影片），需先釐清定位；③需 Remotion 授權注意（個人/小團隊免費，公司可能付費）+ 完整 Node/瀏覽器/ffmpeg 環境。

- **升級條件（→ ✅ 裝）**：發首個穩定 release，或社群出現 3+ 篇實戰評測且無品質翻車；或有具體產品宣傳片需求並確認勝過 HyperFrames。
- **放棄條件（→ ❌ 不裝）**：作者停更（單一作者風險）；或實測 106 張卡品質參差、demos 無法穩定渲染；或 Remotion 公司授權成本擋路。

## 相關連結

- [[Remotion]] — 本 skill 的底層 React 影片框架
- [[claude-real-video — 讓 Claude 真正看影片的本機關鍵幀擷取工具|claude-real-video]] — 影片理解（互補方向）
- [[hyperframes]] — 同類 HTML/React 影片製作 skill（功能重疊，需釐清定位）
