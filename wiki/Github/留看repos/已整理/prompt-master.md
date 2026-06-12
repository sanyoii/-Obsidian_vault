---
source: "https://github.com/nidhinjs/prompt-master"
author: "Nidhin Joseph Nelson"
stars: ""
clipped: 2026-05-28
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/nidhinjs/prompt-master](https://github.com/nidhinjs/prompt-master)

---

## README

**prompt-master** — A Claude skill that writes the accurate prompts for any AI tool. Zero tokens or credits wasted.

Claude Skill（v1.6.0），幫你為各種 AI 工具生成最佳化的 prompt。不是 CLI 也不是程式庫，純粹是一個 Markdown Skill 檔案，零依賴。

**安裝（Claude Code）：**
```bash
mkdir -p ~/.claude/skills
git clone https://github.com/nidhinjs/prompt-master.git ~/.claude/skills/prompt-master
```

**安裝（Claude.ai web）：**
下載 ZIP → claude.ai → Sidebar → Customize → Skills → Upload a Skill

**使用：**
```
/prompt-master 幫我寫一個 Claude Code prompt，要它重構 auth 模組
Write me a prompt for Midjourney: a samurai in the rain at night
```

---

## 分析報告

### 這是什麼？

**prompt-master** 是一個 **Claude Skill**，輸入粗糙的意圖描述，輸出針對指定 AI 工具精準優化過的 prompt。

**Repo 規模：**

| 項目 | 數值 |
|------|------|
| 檔案數 | 5 個 |
| 總大小 | 16,841 tokens |
| 授權 | MIT |
| 版本 | v1.6.0 |
| 依賴 | 零（純 Markdown） |

**檔案內容：**

| 檔案 | 說明 |
|------|------|
| SKILL.md | 核心路由邏輯、工具 profiles、診斷規則 |
| README.md | 說明與範例 |
| references/templates.md | 13 種 prompt 框架（RTF、CO-STAR、RISEN、CRISPE、CoT 等）|
| references/patterns.md | 37 種「浪費 token 模式」的 before/after 修正對照 |

---

### 核心功能

**運作流程：**
1. 偵測目標 AI 工具（30+ 工具路由）
2. 萃取 9 個維度（任務、格式、限制、情境、受眾、成功標準等）
3. 必要時最多問 3 個問題
4. 靜默選擇框架架構
5. Token 效率審計（去掉不影響輸出的詞）
6. 輸出一個乾淨可複製的 prompt + 一行策略說明

**支援工具（30+）：**

| 類別 | 工具 |
|------|------|
| Agentic | Claude Code、Cursor、Windsurf、Cline、Devin、Bolt、v0 |
| LLM | Claude、ChatGPT、Gemini、o3/o4-mini、Qwen3、DeepSeek-R1 |
| 圖像 | Midjourney、DALL-E、Stable Diffusion、SeeDream、ComfyUI |
| 影片 | Sora、Runway、Kling、LTX、Dream Machine |
| 語音 | ElevenLabs |
| 工作流 | Zapier、Make、n8n |

**37 種壞模式偵測範例：**
- 模糊動詞（"help me with code" → 指定函數名稱）
- 缺乏成功標準（自動推導二元通過/失敗條件）
- 沒有停止條件（Agent 任務強制補上 checkpoints）
- 模糊美學描述（"professional" → hex 值、間距、陰影）
- 範圍不明（"the whole codebase" → 指定檔案邊界）

---

### 活躍度

- v1.6.0 含 Opus 4.7 適應性思考校準、新 Template M、Agent AI 路由
- 開發者：Nidhin Joseph Nelson（單人維護）
- 2026 版權年份，追蹤最新模型更新（Opus 4.7、Qwen3 thinking mode）
- MIT 授權，純文件，老化速度慢

---

### 值得安裝嗎？

**可以裝，但先確認有無重複。**

你的 skill 清單裡已有 `prompt-master`（`C:\Users\sanyo\.claude\skills\` 下），安裝前先確認版本。

**值得裝的情境：**
- 常用 Midjourney / 圖像 / 影片 AI，需要格式正確的 prompt
- 用 Opus 4.7，v1.6.0 針對其「字面解讀」特性有專屬策略
- 需要一份完整的 37 種壞模式參考清單

**不一定需要：**
- 你本身已是 prompt 工程老手，多數模式已內化
- 僅用 Claude Code，很少切換其他工具

**安裝成本：** 極低（5 個 Markdown 檔案），裝了沒損失。
