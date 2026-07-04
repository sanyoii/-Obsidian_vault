---
source: "https://github.com/asgeirtj/system_prompts_leaks"
author: "asgeirtj"
stars: "48K+"
clipped: 2026-07-04
tags:
  - "github/repo"
  - "prompt-engineering"
  - "claude-code/reference"
---

# system_prompts_leaks — 全網 AI 聊天機器人 System Prompt 逆向存檔庫

> **asgeirtj/system_prompts_leaks** | ⭐ 48.7K | 🍴 7.9K | 📝 CC0-1.0（公共領域）
> "Extracted system prompts from Anthropic, OpenAI, Google, xAI, Cursor, Copilot, Perplexity, and more. Updated regularly."

## 一句話說明

社群眾包的「AI system prompt 考古庫」——把 Claude / ChatGPT / Gemini / Grok / Cursor / Copilot 等主流 AI 產品洩漏或提取出的原始 system prompt 與內建工具/skill 定義，按廠商分類存成純 markdown。CC0 授權，登過《華盛頓郵報》。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 48,723 |
| Forks | 7,942 |
| 授權 | CC0-1.0（公共領域）|
| 建立 | 2025-05-03 |
| 最後推送 | 2026-07-04（高度活躍）|
| 首頁 | https://asgeirtj.github.io/system_prompts_leaks/ |
| 內容規模 | 286 檔，壓縮後仍近 2M token（純資料庫）|

## 核心內容

- **按廠商分類**：Anthropic 122 檔（最大宗）、OpenAI 87、Google 23、Misc 23、xAI 11、Microsoft 5、Perplexity/Cursor/Meta/Mistral/Notion/Qwen
- **Claude Code 內部拆解**：`Anthropic/Claude Code/bundled-skills/` 收錄官方 skill 原始 prompt——`code-review`（low/medium/high/xhigh/max 各級）、`deep-research`、`dataviz`、`security-review`、`verify`、`run-skill-generator`、`simplify`
- **版本對照**：同版 Claude Code 三模型並列（fable-5 / opus-4.8 / opus-4.6）；claude.ai 主 prompt 有 Fable 5 vs Opus 4.8 diff
- **滾動更新**：Sonnet 5（7/1）、Claude Design（6/26）、GPT-5.5 Codex（6/18）當月補進

## 社群信號

- 《華盛頓郵報》專文引用（2026-05-11）——主流媒體級背書
- YouTube 教學生態成熟：Matthew Berman 17.1 萬觀看、Mark Kashef 系統 prompt 拆解
- prompt engineering 圈當「頂尖團隊怎麼寫 prompt」的一手教材

## 安裝建議

⏳ **選擇性 clone，不整包匯入** — 這是參考資料庫非工具。

- **值得**：把 `Anthropic/Claude Code/bundled-skills/` 關鍵檔（code-review.md、deep-research/SKILL.md、simplify.md）單獨存進 vault/gbrain，當寫 skill、寫制度檔時的一手範本
- **不值得**：整庫近 2M token 匯 gbrain，多數是不用的他廠 prompt，稀釋檢索品質

## 相關連結

- [[Github/repos/x1xhlol-system-prompts-and-models-of-ai-tools]] — 同類姊妹庫（30+ 工具），本 repo 更大更新且獨有 Claude Code bundled-skills 原始碼；institution 制度檔（ROUTER/ORCHESTRATION）先前以 x1xhlol 為設計參考，此庫可補充 Claude Code 深度
