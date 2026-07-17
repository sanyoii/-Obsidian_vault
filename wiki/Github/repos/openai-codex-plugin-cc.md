---
tags: [codex, claude-code, plugin, code-review, agent-delegation, openai]
date: 2026-07-17
status: evaluated
verdict: OpenAI 官方出品，把 Codex 塞進 Claude Code 當 review/delegate 副手；跨 AI 協作剛需，直接可裝。
---

# codex-plugin-cc — 在 Claude Code 裡呼叫 Codex 做審查與委派

> 來源：https://github.com/openai/codex-plugin-cc
> 授權：Apache-2.0
> 規模：62 檔案 / 96,037 tokens

## 這是什麼？

OpenAI **官方**發布的 Claude Code plugin，讓你在 Claude Code 工作流內直接叫 OpenAI Codex 做程式碼審查、或把任務委派給 Codex 背景執行。一句話定義：**Claude Code 的 Codex 橋接外掛——用一組 `/codex:*` slash command 把 Codex 當第二個 AI agent 使喚。**

marketplace 名 `openai-codex`，plugin 名 `codex`，現版 1.0.6。

## 核心功能

- **`/codex:review`** — 唯讀的標準 Codex code review（等同在 Codex 內跑 `/review`）；支援 `--base <ref>` 比對分支、`--wait`、`--background`。
- **`/codex:adversarial-review`** — 可**操控（steerable）**的挑戰式審查，質疑實作/設計、壓測假設與失敗模式，flag 後可接自訂 focus 文字。
- **`/codex:rescue`** — 把任務丟給 `codex:codex-rescue` subagent（查 bug／試修／續跑舊任務／換小模型跑快版）；支援 `--model`、`--effort`、`--resume`、`--fresh`、`--background`。`spark` 會映射到 `gpt-5.3-codex-spark`。
- **`/codex:transfer`** — 把當前 Claude Code session 轉成持久 Codex thread，印出 `codex resume <session-id>`，接續同一段上下文到 Codex App/TUI。
- **`/codex:status` / `/codex:result` / `/codex:cancel`** — 管理背景 job：查進度、取最終輸出、取消。
- **`/codex:setup`** — 檢查 Codex 是否就緒，缺就代裝（`npm install -g @openai/codex`）。

## 技術棧

- **純 Node.js ESM**（`type: module`），engines `node >=18.18`；**零 runtime 依賴**，devDeps 僅 `typescript` + `@types/node`。
- 核心邏輯在 `plugins/codex/scripts/`：`codex-companion.mjs`、`app-server-broker.mjs` + `lib/`（job-control、tracked-jobs、broker-lifecycle、claude-session-transfer、git、workspace…）。
- 透過 **Codex app-server protocol** 通訊（`prebuild` 用 `codex app-server generate-ts` 產 TS 型別）。
- Claude Code plugin 標準結構：`commands/`、`agents/`、`hooks/`（SessionStart、stop-review-gate）、`skills/`（`codex-cli-runtime`、`codex-result-handling`、`gpt-5-4-prompting`）、`schemas/`。
- 測試用 `node --test`（`tests/*.test.mjs`，含 fake-codex fixture），CI 在 GitHub Actions（Node 22）。
- 需求：ChatGPT 訂閱（含 Free）或 OpenAI API key，用量計入 Codex limits。

## 與現有系統的相關性

**高度相關。** 本環境已在用 codex 這條線：
- 已裝 `codex:codex-rescue` subagent 與 `codex:rescue`/`codex:setup` skill（見 available-agents / skills 清單）——**這個 repo 正是那些東西的上游來源**。
- 契合 CLAUDE.md「多 AI 協作」與「codex-rescue：Claude 卡住時第二意見/deeper root-cause」的既有分工。
- plugin 內附的 `gpt-5-4-prompting` skill（prompt recipes/antipatterns/blocks）可獨立參考，對寫 Codex prompt 有用。
- 對比 wiki 既有〈多 AI 協作不斷片〉文章——這是「不斷片」的官方工程化實作（session transfer + 背景 job 管理）。

## 安裝建議

✅ **適合安裝**（且環境很可能已裝其 skill/agent）——OpenAI 官方、Apache-2.0、零依賴、跨 AI 審查/委派是剛需；唯一成本是需 ChatGPT 訂閱或 API key 且用量計入 Codex 額度。
