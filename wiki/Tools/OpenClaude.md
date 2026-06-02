---
tags: [AI, tools, evaluation, claude-code, llm]
date: 2026-05-30
status: evaluated
verdict: 備用可裝，不取代官方 Claude Code
---

# OpenClaude 評估報告

> 評估日期：2026-05-30  
> 來源：https://github.com/Gitlawb/openclaude  
> 版本：v0.15.0

## 這是什麼？

**OpenClaude 是 Claude Code CLI 的非官方 fork**，主要目的是讓你用 Claude Code 的完整介面和工作流程，但接入非 Anthropic 的 LLM。

一句話定義：「Claude Code 的 UI + 工具引擎，後端換成任意 OpenAI-compatible API 或本地模型」

## 核心功能差異

| 能力 | 官方 Claude Code | OpenClaude |
|------|----------------|------------|
| Anthropic Claude 模型 | ✅ 原生 | ✅ 也支援（via Bedrock/Vertex） |
| OpenAI / GPT-4o | ❌ | ✅ `CLAUDE_CODE_USE_OPENAI=1` |
| Gemini | ❌ | ✅ |
| GitHub Models | ❌ | ✅ |
| Ollama 本地模型 | ❌ | ✅ |
| DeepSeek / Groq / Mistral | ❌ | ✅ OpenAI-compatible |
| 你的 skills / agents / hooks | ✅ | ✅ （格式相同，fork 保留） |
| 遙測 / 資料回傳 | 有（可關閉） | **完全移除**，telemetry 全 no-op |

## 安全性評估

**好消息**：telemetry 完全乾淨
- `isAnalyticsDisabled()` 直接 `return true`（hardcoded）
- Datadog = 空殼 no-op stub
- 自動更新 phone-home 全部 build-time 移除
- 沒有資料會回傳給 Gitlawb 或 Anthropic

**需要注意**：
- 是 Anthropic 商業產品的 fork，Anthropic ToS 灰色地帶
- 安全漏洞不受 Anthropic 官方支援（security policy 明確寫 unofficial forks ❌）
- 維護者是 GitLawb 公司（贊助商之一），商業動機存在

## 安裝方式

```powershell
npm install -g @gitlawb/openclaude
```

切換到 OpenAI-compatible 模型：
```powershell
$env:CLAUDE_CODE_USE_OPENAI="1"
$env:OPENAI_API_KEY="sk-your-key"
$env:OPENAI_MODEL="gpt-4o"
openclaude
```

切換到 Ollama 本地模型：
```powershell
$env:CLAUDE_CODE_USE_OPENAI="1"
$env:OPENAI_BASE_URL="http://localhost:11434/v1"
$env:OPENAI_MODEL="qwen2.5-coder:7b"
openclaude
```

## 裁決

**值得「備用」但不值得「取代」**

- 日常主力：保持官方 Claude Code + Sonnet 4.6
- 備用場景：偶爾用便宜/本地模型跑簡單任務
- 相容性：你的 CLAUDE.md、skills、agents 格式相同，大部分可直接沿用

## 支援的 Provider 清單

- OpenAI-compatible（OpenAI、OpenRouter、DeepSeek、Groq、Mistral、LM Studio）
- Gemini（API key）
- GitHub Models（互動式 onboarding）
- Codex OAuth / Codex
- Ollama（本地，無 API key）
- Atomic Chat（本地）
- Xiaomi MiMo
- Gitlawb Opengateway（免費 smart gateway）
- Bedrock / Vertex / Foundry（Anthropic-family cloud）
