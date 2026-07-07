---
source: "https://github.com/jamiepine/voicebox"
author: "jamiepine (Jamie Pine)"
stars: "38.2K"
clipped: 2026-07-03
updated: 2026-07-06
tags:
  - "github/repo"
  - "ai-voice"
  - "tts"
  - "mcp"
---

## voicebox — 本機優先的開源 AI 語音工作室

> **jamiepine/voicebox** | ⭐ 38,246 | 🍴 4,600 | 📝 MIT
> "The open-source AI voice studio. Clone, dictate, create."
> _（2026-07-06 複查：結論不變，僅星數/fork 數更新；423 open issues、v0.5.0 為最新版）_

---

### 一句話說明

Voicebox 是一個跑在本機的桌面 App（Tauri + Rust），把 ElevenLabs（語音克隆/生成）跟 WisprFlow（語音輸入/口述）兩個訂閱制雲端服務的功能合而為一，還多送一個 MCP Server 讓 Claude Code / Cursor 這類 AI agent 直接「開口說話」——全部本機推論、免 API Key、免訂閱費。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 38,246（2026-07-06 複查） |
| Forks | 4,600 |
| 主要語言 | TypeScript（+ Python 後端、Rust/Tauri 殼） |
| 授權 | MIT |
| 建立時間 | 2026-01-25 |
| 最新 Release | v0.5.0（2026-04-25） |
| Topics | ai, voice-clone, qwen3-tts, voice-ai, whisper, cuda, mlx |
| 首頁 | https://voicebox.sh |

單月從公開發佈衝到 34K+ stars、GitHub Trending 前 10。作者 Jamie Pine 是 Spacedrive（跨平台檔案總管，Rust）的原作者。

---

### 核心功能

- **7 個 TTS 引擎**：Qwen3-TTS、Qwen CustomVoice、LuxTTS、Chatterbox（多語 + Turbo）、HumeAI TADA、Kokoro
- **語音克隆**：3 秒參考音檔即可 zero-shot 克隆，另有 50+ 預設聲音
- **全域口述輸入**：系統級快捷鍵按住即說、放開即轉錄貼回任一輸入框
- **Agent 語音輸出（MCP）**：`voicebox.speak` 一個 tool call，任何支援 MCP 的 agent（Claude Code、Cursor、Cline）就能用你克隆的聲音開口說話
- **語音人格（Personality）**：幫任一聲音檔綁定自由文字人設，之後可 Rewrite 或 Compose
- **後製效果鏈**：8 種效果（pitch/reverb/delay/chorus/compressor/gain/high-pass/low-pass）
- **Stories 多軌編輯器**：時間軸拖拉排列對話/podcast
- **無限長度生成**：自動依句界分段生成再交叉淡化，單次最長 50,000 字元
- **本機 REST API**：`http://127.0.0.1:17493`，無 API Key、無流量限制

---

### 技術架構

```
桌面殼層：tauri/ (Rust) → 掛載 app/ 的 React 前端 (Vite + shadcn/ui)
app/src/：components / stores(zustand) / lib/api(OpenAPI client) / i18n
backend/ (Python FastAPI)：
  ├─ backends/ (7 個 TTS 引擎 adapter + mlx/pytorch)
  ├─ routes/、services/ (effects, refinement, task_queue)
  └─ mcp_server/ (獨立 MCP Server：HTTP + stdio)
web/、landing/(Next.js 官網)、docs/(Fumadocs 文件站)
```

| 層次 | 技術 |
|------|------|
| 桌面殼 | Tauri 2（Rust），非 Electron |
| 前端 | React + TypeScript + Vite + shadcn/ui + zustand |
| 後端 | Python + FastAPI，SSE 串流狀態、序列化生成佇列防 GPU 爭用 |
| 推論加速 | MLX（Apple Silicon）、CUDA、ROCm、Intel Arc、CPU |
| Agent 整合層 | 內建 MCP Server（HTTP + stdio） |

`app/`（Tauri 殼）與 `web/`（純瀏覽器）共用同一份 `platform/` 抽象介面，同一套 UI 邏輯可同時跑桌面版與未來的瀏覽器版。

---

### 社群口碑摘要（2026-07 觀察，時效性內容）

多篇獨立部落格評測（neural-nexus.net、andrew.ooo、TheAIToolkit）在 2-6 月密集出現，一致定位為「ElevenLabs + WisprFlow 雙訂閱殺手」。曾登上 GitHub Trending 第 7 名，單週新增 3,583 顆星。Reddit 正面回饋居多（「cloned my voice well」「quality OFF THE CHARTS」），評測給出 8.2/10（對隱私優先/開發者受眾），但強調需要 GPU 才有好體驗，CPU-only 使用者評分較低（6.8/10）。YouTube 已有正式入門教學影片。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接整合點，若想做筆記朗讀可考慮透過 REST API 餵文字 |
| **Claude Code** | 內建 MCP Server，`voicebox.speak` 可讓 Claude Code 長任務完成時用克隆聲音口頭通知，與 [[R16 長迴圈透明化]] 精神相合，但屬於錦上添花 |
| **Automation** | 本機 REST API 無金鑰無限流，理論上可接進既有 pipeline 做語音摘要輸出，但需要 GPU 常駐服務，與現有輕量腳本風格不搭 |

---

### 安裝建議

⏳ 觀望 — 專案品質與熱度都高（37K stars、活躍迭代、真實正面口碑），但落地門檻不低：需 GPU 常駐服務 + Tauri 桌面安裝 + 模型下載，且目前沒有非裝不可的使用情境。未來若想幫 Claude Code 長任務加語音通知，或做語音克隆類個人專案，值得回頭裝。

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
