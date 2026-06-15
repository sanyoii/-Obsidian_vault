---
source: "https://github.com/Hao0321/ai-media-generator"
author: "Hao0321"
stars: "116"
clipped: 2026-06-15
tags:
  - "github/repo"
  - "claude-skill"
  - "ai-媒體生成"
---
# ai-media-generator — 跨平台 AI 媒體生成 Prompt Skill

> **出處：** [https://github.com/Hao0321/ai-media-generator](https://github.com/Hao0321/ai-media-generator) | ⭐ 116

---

## Description

Zero-skill cinema. Senior-director prompts on autopilot. 一個 Claude Code Skill，涵蓋 14+ AI 生圖/生影片/生音樂平台（Midjourney V8.1、Flux 1.1 Pro、Veo 3.1、Kling 3.0、Seedance 2.0 pro、Suno v5.5、Runway Gen-4.5、Ideogram 3、Seedream 5.0、Nano Banana Pro、Vidu Q3、Stable Diffusion、OiiOii…），自動選平台、寫對該平台「真正吃」的 prompt 語彙，並可透過瀏覽器 MCP 直接操作網站送出。

## 核心定位

說「做個古代將軍騎馬衝鋒的電影感短片」，Claude 會：
1. **選對平台** — 按 `references/selector.md` / `model-picker.md` 選最適合的模型
2. **寫對 prompt** — 不用 `cinematic, 8k, beautiful` 這種廢話，改用 Deakins/Lubezki 級導演詞彙、Kodak Vision3 底片、teal-orange 色調等各平台真正有效的 token（每個 prompt 強制嵌入 5-8 個高訊號 token）
3. **驅動瀏覽器送出** — 透過 `claude-in-chrome` MCP 操作 OiiOii / Flow / Kling / Suno 等網站並抓回成品

## 結構（59 檔，~29 萬 tokens，全 Markdown）

```
ai-media-generator/
├── SKILL.md                # 核心入口：Auto-Pilot 流程 + 硬規則 + 平台禁忌
├── references/             # 14 平台各一檔 + 共用語彙庫
│   ├── community-prompt-patterns.md  # ⭐ 跨平台 meta + 各模型簽名 token
│   ├── cinematic-direction.md        # 導演/DP/底片/燈光/構圖語彙
│   ├── commercial-direction.md       # 廣告/時尚/MV 語彙
│   ├── vfx-effects.md / sound-design.md / editing-transitions.md
│   ├── model-picker.md / selector.md / quality-control.md
│   └── kling.md / seedance.md / veo.md / suno.md / midjourney.md / flux.md ...
├── templates/
│   ├── auto-pilot.md        # 一句話到成品的 pipeline
│   ├── preset-packs.md      # 30+ 現成 preset
│   ├── storyboard.md / music-video.md / negative-bank.md
│   ├── user-flags.md        # 自然語言 flag 翻譯表
│   └── token-efficient-mode.md  # 大專案省 token 策略
└── automation/
    ├── browser-guide.md / click-protocol.md
    └── site-profiles/        # 各平台 UI 深度地圖
        ├── oiioii.md ✅  flow.md(Veo) ✅  kling.md ✅  suno.md ✅
        └── midjourney / seedream / runway / sora / vidu / ideogram（stub）
```

## 重點筆記

- **Meta 鐵律**：「Prompt 寫對一次 ≫ 操作快 10 次」— 寫錯 prompt 重做要等 8-10 分鐘，遠比操作慢 5 分鐘的成本高
- **平台分流很重要**：同一個詞在不同平台效果完全不同
  - 導演/DP 名 → MJ/Sora 2/Veo 吃，Flux/Nano Banana Pro/Seedance/Wan **不吃**
  - 底片質感（Kodak Vision3）→ Flux/MJ 吃，Seedance 不吃
  - `cinematic/4K/8K` → 舊 Seedance 1.0 弱，**Seedance 2.0 大量吃**（v1.1.0 修正過的斷言）
- **全平台禁用詞**：`beautiful / masterpiece / detailed / high quality / professional` — 從沒在新一代模型有實證效果
- **Provenance**：兩輪 head-to-head benchmark，有 skill vs 無 skill 為 95% vs 47%
- ⚠️ OpenAI Sora 2 已於 2026-04-26 停運（API 撐到 2026-09-24），新任務改推 Runway Gen-4.5 / Veo 3.1 / Kling 3.0

## 安裝

```bash
git clone https://github.com/Hao0321/ai-media-generator.git ~/.claude/skills/ai-media-generator
# 或 project-level
git clone https://github.com/Hao0321/ai-media-generator.git ./.claude/skills/ai-media-generator
```

## 與現有工具的關係

跟 [[reference_ai_prompts_wiki|AI Prompts 收藏庫]] 性質類似但更系統化 — 是一整套「平台簽名 prompt 知識庫 + 瀏覽器自動化操作手冊」，可考慮整合進 `ai-video-pipeline` 或日常生圖/生影片需求時直接用。

## License

MIT
