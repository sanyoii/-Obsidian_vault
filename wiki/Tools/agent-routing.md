# Agent Routing 自動路由系統

## 運作原理

你**不需要打任何特殊指令**。每次按 Enter 送出訊息，Claude Code 就會自動觸發路由：

```
使用者輸入 prompt → 按 Enter
    ↓
Claude Code 觸發 UserPromptSubmit 事件（自動）
    ↓
hook-handler.cjs route → router.js 分析關鍵詞
    ↓
輸出 [ROUTING_DIRECTIVE] 結構化指令
    ↓
Claude 遵從路由（confidence ≥ 0.85 自動執行，< 0.85 問你確認）
```

`UserPromptSubmit` 是 Claude Code 的內建事件名稱，不是使用者需要輸入的指令。

---

## 三種路由模式

### `direct` — 直接處理（不 spawn agent）

適用：範圍明確的 1-2 個檔案修改、Q&A、code review。

| 中文觸發詞 | 英文觸發詞 |
|-----------|-----------|
| 改、修改、命名、改名 | fix, rename, change |
| 為什麼、解釋、看程式碼 | why, explain, review |
| 報錯、壞了、修 bug | error, broken, debug |
| 加 log、改 if、更新文件/wiki | add log, update docs |
| 重構這個、移動檔案 | refactor this, move file |

### `factory` — 7-Agent 工廠流程

適用：新功能、跨前後端、需求不明確。

| 中文觸發詞 | 英文觸發詞 |
|-----------|-----------|
| 新增功能、加一個功能 | new feature, add feature |
| 前後端、前端+後端 | full-stack, frontend+backend |
| 整合、串接 API | integrate, connect API |
| 使用者想要、身為…我想 | user story, user wants |
| 需要研究、不確定、先了解 | investigate, research |
| 做系統、建平台 | build system, create platform |

**工廠策略子分類：**

| 策略 | 觸發條件 |
|------|---------|
| `research-heavy` | 未知/新技術/沒用過/競品/benchmark/整合第三方 API |
| `standard` | 前後端/前端+後端/UI+API |
| `minimal` | 預設（不符合以上時），如：新增 API endpoint |

### `sparc` — 架構/演算法設計流程

適用：演算法設計、架構決策、需要 pseudocode。

| 中文觸發詞 | 英文觸發詞 |
|-----------|-----------|
| 演算法、算法設計 | algorithm |
| 架構設計、重新設計模組 | architecture, redesign |
| pseudocode、偽碼 | pseudocode |
| ADR、架構決策 | architecture decision |

---

## 什麼時機用 Sub Agent？

| 場景 | 路由結果 | 原因 |
|------|---------|------|
| 更新檔案/文件/wiki | `direct` — 不 spawn | 範圍已知，直接改 |
| 修一個已知 bug | `direct` — 不 spawn | 單點修復 |
| 「為什麼這段 code 這樣寫？」 | `direct` — 不 spawn | Q&A |
| 「加一個職缺收藏功能」 | `factory` — spawn 7-Agent | 跨前後端的新功能 |
| 「整合新的第三方 API」 | `factory (research-heavy)` | 需要研究+實作 |
| 「重新設計這個模組的架構」 | `sparc` — spawn orchestrator | 架構決策 |
| 同時做 3 件不相關的事 | 平行 Agent | 保護 context、加速 |

---

## Method A：規則驅動路由（即時生效）

改完程式碼就自動運作，不需要手動啟用。

**相關檔案：**
- `.claude/helpers/router.js` — 三層決策樹（direct/factory/sparc）+ 策略選擇
- `.claude/helpers/hook-handler.cjs` — route handler 輸出 `[ROUTING_DIRECTIVE]`
- `.claude/helpers/intelligence.cjs` — 支援 CJK bigram tokenize
- `CLAUDE.md` — Hook 路由指令遵從規則

**指令格式：**
```
[ROUTING_DIRECTIVE]
mode: factory
strategy: standard
confidence: 0.92
reason: 新功能需求，涉及前後端協作
first_agent: researcher
[/ROUTING_DIRECTIVE]
```

**遵從規則：**
- confidence ≥ 0.85 → Claude 自動執行
- confidence < 0.85 → Claude 向你確認
- 路由建議不合理時 Claude 會說明並建議替代

---

## Method C：Ruflo AutoPilot 學習層（手動啟用）

### 啟用步驟

1. 執行 `powershell .claude/helpers/ruflo-toggle.ps1`（切換 autoStart 為 true）
2. **重開 Claude Code**（Ruflo MCP 在啟動時連線）
3. 確認 Ruflo MCP 不再顯示 "still connecting"

### 學習機制

- 每次 SubagentStop 自動記錄 task→agent→outcome 到 `.claude-flow/data/routing-outcomes.jsonl`
- 輸出 `[RUFLO_LEARN_SUGGESTION]` → Claude 呼叫 `mcp__ruflo__autopilot_learn`
- 累積 50+ patterns 後，路由 hook 自動輸出 `[RUFLO_PREDICT_REQUEST]`
- Ruflo 預測 confidence > 0.90 且與 router.js 不同 → 展示兩個建議讓你選

### 相關檔案

- `.mcp.json` — Ruflo MCP 配置（autoStart 開關）
- `.claude/helpers/ruflo-toggle.ps1` — 開關腳本
- `.claude-flow/data/routing-outcomes.jsonl` — 路由結果記錄
- `CLAUDE.md` — Ruflo 學習指令規則

---

## 預設規則

- 無法判斷模式時 → `direct`（先用最輕量方式，中途發現需要再升級）
- Method A（規則）與 Method C（學習）互補：A 是底線，C 可提升上限
- 50+ patterns 之前 Method A 全權決定；之後 Ruflo 可補充建議

---

*建立日期：2026-06-21*
*相關計劃：`plans/a-c-sunny-swing.md`*
