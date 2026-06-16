# Ponytail — 懶得出名的資深工程師技能包

> **一句話**：讓 AI Agent 強制「寫最少程式碼」的規則/插件包。
> **GitHub**：https://github.com/DietrichGebert/ponytail

---

## 核心理念

名字來自那位留著馬尾、戴眼鏡、不說話、把你 50 行改成 1 行的資深工程師。Ponytail 把這個「極簡主義」注入 AI Agent。

> *"He says nothing. He writes one line. It works."*

---

## 6 個決策梯（核心規則）

在寫任何程式碼前，依序停在第一個成立的：

```
1. 這東西需要存在嗎？         → 不需要：YAGNI，跳過
2. Stdlib 有嗎？               → 用 stdlib
3. 原生平台功能有嗎？          → 用原生（e.g. <input type="date"> 而非裝 flatpickr）
4. 已裝的依賴有嗎？            → 用現有依賴
5. 一行能搞定嗎？              → 一行解決
6. 以上都不行                  → 寫最小可運作的版本
```

**不偷懶的地方**：信任邊界的 input validation、防資料遺失的 error handling、安全性、無障礙設計。

**標記慣例**：刻意簡化的地方加 `ponytail:` 注解，說明限制與升級路徑：
```js
// ponytail: global lock, 換 Redis 前適用
const lock = new Mutex();
```

---

## 效能數據（官方 Benchmark）

5 個日常任務 × 3 個模型（Haiku/Sonnet/Opus） × 10 次執行，中位數：

| 指標 | 改善幅度 |
|------|---------|
| 程式碼行數 | **少 80–94%** |
| API 成本 | **少 47–77%** |
| 速度 | **快 3–6 倍** |

---

## 強度等級

| 等級 | 說明 |
|------|-----|
| `lite` | 寫你要求的，順帶說一行更懶的替代方案 |
| `full`（預設） | 完整 6 梯決策 |
| `ultra` | 先挑戰需求再動手，刪除優先於新增 |
| `off` | 關閉 |

設定預設等級：環境變數 `PONYTAIL_DEFAULT_MODE=lite` 或 `%APPDATA%\ponytail\config.json`：
```json
{ "defaultMode": "lite" }
```

---

## Claude Code 安裝

指令安裝（已手動複製 commands 到 `~/.claude/commands/`）：
- `/ponytail` — 切換等級
- `/ponytail-review` — 審查目前 diff 過度設計
- `/ponytail-audit` — 全 repo 過度設計審查
- `/ponytail-debt` — 收集 `ponytail:` 技術債清單
- `/ponytail-help` — 快速參考

若要完整 plugin 功能（hooks、statusline）：
```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

---

## 支援 13 個 AI 工具

Claude Code、Codex、OpenCode、Gemini CLI、Antigravity CLI、OpenClaw、Pi agent、Cursor、Windsurf、Cline、GitHub Copilot、Aider、Kiro

詳見：https://github.com/DietrichGebert/ponytail/blob/main/docs/agent-portability.md

---

## 標籤

#tools #ai-agent #claude-code #yagni #minimalism #productivity
