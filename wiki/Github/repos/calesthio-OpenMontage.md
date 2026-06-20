---
tags: [AI, tools, video, production, agentic, remotion, open-source]
date: 2026-06-20
status: evaluated
verdict: 開源 AI 影片製作系統，Agent 驅動全自動產出影片
---

# OpenMontage — 開源 Agentic 影片製作系統

> 來源：https://github.com/calesthio/OpenMontage  
> 授權：AGPLv3  
> 規模：1,356 檔案 / 2.3M tokens

## 這是什麼？

**OpenMontage 是第一個開源的 Agent 驅動影片製作系統。** 你用自然語言描述想要的影片，AI coding agent（Claude Code/Cursor/Copilot/Windsurf/Codex）會自動完成：研究主題、寫腳本、生成素材、剪輯、配音、上字幕、最終合成。

一句話定義：「把 AI coding agent 變成完整的影片製作工作室」

特殊之處：不只做「圖片拼接偽影片」，可以用真實素材（免費圖庫影片）或 AI 生成動態影片（Veo/Kling/FLUX），做出有真正運動畫面的影片。

## 核心功能

- **Pipeline 驅動**：7+ 種影片製作管線（Cinematic/Character Animation/Localization Dub/Avatar Spokesperson 等）
- **參考影片起步**：貼 YouTube/TikTok/Reel 連結，自動分析後產出類似風格的新影片
- **多 Provider 支援**：
  - 圖片：FLUX（fal.ai）、DALL-E 3、Imagen、Recraft、xAI Grok
  - 影片：Veo、Kling v3、MiniMax、Runway Gen-4、Hunyuan、本地 GPU（Wan2.1/LTX/CogVideo）
  - 配音：Piper（免費本地）、ElevenLabs、OpenAI TTS、Google TTS（700+ voices）
  - 音樂：Suno、ElevenLabs、免費 Pixabay/Freesound
  - 字幕：WhisperX word-level
- **免費可用**：零 API key 也能用 Piper TTS + FLUX Schnell + Pixabay 素材 + 本地 GPU
- **成本極低**：展示影片從 $0.15（圖片動畫）到 $1.33（60 秒 Pixar 風短片）
- **Remotion 合成**：最終影片用 Remotion（React）渲染，支援數據圖表、粒子特效、字幕等
- **品質自檢**：ffprobe 驗證、音訊電平分析、字幕檢查、delivery promise 驗證
- **Skill 系統**：大量 `.agents/skills/` 和 `.claude/skills/`（HyperFrames/Remotion/ManimGL/Flux/HeyGen 等）

## 技術棧

- **後端**：Python 3.10+
- **合成引擎**：Remotion（React/TypeScript）
- **影片處理**：FFmpeg
- **AI Skills**：Claude Code / .agents/ / .claude/ 格式
- **測試**：pytest（含 contract tests、QA tests）
- **建構**：Makefile（`make setup`）

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| [[ai-video-pipeline]] | **高度重疊** — 同樣是 AI 全自動影片管線，但 OpenMontage 更成熟（1356 檔案 vs 早期規劃） |
| Claude Code Skills | **直接可用** — 內建大量 `.claude/skills/`，格式與現有環境相容 |
| HyperFrames | **互補** — OpenMontage 用 Remotion 合成，也有 HyperFrames skill |
| Obsidian | 無直接關聯 |

## 安裝建議

⏳ **觀望** — 功能非常強大但 AGPLv3 授權限制商用、需要 FFmpeg + Node.js + Python 全套環境、且與現有 `ai-video-pipeline` 專案定位重疊。建議先觀察其 Skill 是否可單獨抽取使用。

## 相關連結

- [[ai-media-generator — 跨平台 AI 媒體生成 Prompt Skill]]
- [[Remotion — 用 React 寫程式碼產生影片]]
