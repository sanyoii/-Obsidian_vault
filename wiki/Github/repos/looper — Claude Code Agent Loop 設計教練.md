---
source: "https://github.com/ksimback/looper"
author: "ksimback (Kevin Simback)"
stars: "623"
clipped: 2026-07-07
tags:
  - "github/repo"
  - "claude-code/skills"
  - "agent-loops"
  - "llm-as-judge"
---

# looper — Claude Code Agent Loop 設計教練

> **ksimback/looper** | ⭐ 623 | 🍴 56 | 📝 MIT
> "Design visual, review-gated agent loops for Claude Code before you run them."

## 一句話說明

Looper 是 Claude Code 的「迴圈設計教練」Skill：在你真正跑 agent loop **之前**，用七階段訪談 + 內建 rubrics 逼你把目標、可驗證的成功標準、跨模型審查席（reviewer/judge 分離）、終止護欄全部外顯化，再產出可攜、可版控的 loop 規格（`loop.yaml` + `RUN_IN_SESSION.md` + Python runner）。定位是設計層（pre-flight），不是執行層——它自己不排程、不做 durable orchestration。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 623 / 56 |
| 主要語言 | Python |
| 授權 | MIT |
| 建立時間 | 2026-06-18（分析時僅 3 週） |
| 最後推送 | 2026-07-06 |
| Open Issues / PRs | 0 / 0 |
| 最新 Release | v0.3.0 — Loop pattern library（2026-07-06） |
| Topics | agent-loops, agentic-workflows, ai-agents, claude-code, claude-code-skill, llm-as-judge |
| 首頁 | 無（GitHub only） |
| 是否 Archived | 否 |

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 57 |
| 總 Tokens | 67,035 |
| 壓縮模式 | 無（repo 僅 127KB） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens（約） | 佔比 |
|------|--------|------|
| scripts/looper.py | 9,654 | 14.2% |
| tests/test_looper.py | 9,360 | 13.8% |
| templates/run-loop.py | 7,680 | 11.3% |
| looper-spec.md | 4,685 | 6.9% |
| README.md | 3,479 | 5.1% |

測試檔是第二大檔（13.8%）——3 週新專案有這種測試密度 + CI workflow + JSON Schema 雙版本驗證，工程紀律訊號很強。

## 核心功能

- **七階段設計訪談**：goal → verification → host model → council → gates/control → 流程預覽 → emit/run。每階段先批判再接受，弱目標會被推向「outcome + scope + context + done state」。
- **分階段載入 rubrics**：五份內建最佳實踐評分表（goal / verification / council / control / model-detection），進到該階段才載入——context 節約設計。
- **Reviewer / Judge 角色強制分離**：reviewer 只寫意見，judge 回結構化 verdict；`revise_until_clean` 必須指名 judge 或 human 作 verdict 來源。預設要求審查席是**另一個模型**（跨模型 LLM-as-judge），直接針對「模型自己改自己作業」的盲點。
- **終止護欄多重強制**：max_iterations + 每 gate 修訂上限 + no-progress 偵測 + 預算帽或人工停點，缺一不可。
- **五個 pattern 模板**：security-scan / code-review / bug-hunt / docs-sync / research-synthesis，各自帶 programmatic check 腳本。
- **隱私邊界外顯**：選跨廠商 council 成員前，必須聲明哪些 context 會離開本機、給哪個 CLI、redaction globs 為何，且首次送出需同意。`~/.looper/models.json` registry 有 secret pattern 拒收機制。
- **雙執行合約**：預設 in-session handoff（`RUN_IN_SESSION.md` 交給當前 session 跑）；進階為可自行修改的 `run-loop.py` 外部 runner。

## 技術架構

```
/looper 指令（SKILL.md，disable-model-invocation）
    │  七階段訪談 + 分階段 rubrics（references/*.md）
    ▼
loop.yaml（人寫規格）──looper.py compile──▶ loop.resolved.json（機讀）
    │                                        ▲ schemas/ 雙 JSON Schema 驗證
    ▼
RUN_IN_SESSION.md（in-session 執行合約）＋ LOOP.md（人讀）＋ run-loop.py（外部 runner）
```

| 層次 | 技術 |
|------|------|
| 設計層 | SKILL.md 訪談流程 + 5 份 rubric markdown |
| 規格層 | loop.yaml → loop.resolved.json（JSON Schema v1 驗證） |
| 工具層 | scripts/looper.py（compile/render/model 偵測；明確禁止代跑模型） |
| 執行層 | RUN_IN_SESSION.md 交棒當前 session；templates/run-loop.py 外部跑 |
| 品質層 | pytest（含 fake_host/fake_judge fixtures）+ GitHub Actions CI |

刻意的「scaffolder/runtime 邊界」：looper.py 只做編譯與偵測，不呼叫模型 CLI 做迴圈工作——執行責任完全交給 session 或使用者擁有的 runner。

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | ksimback, kenstephoang（2 人） | 個人專案 |
| Release 頻率 | v0.2.0→v0.3.0 兩天內三發 | 快速迭代期 |
| Issue open/close | 0 open | 太新，無法判讀 |

星數 <1K，未跑社群口碑引擎；專案僅 3 週大，健康度數據參考價值有限。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯；loop 產出的 state.json/run-log.md 屬工作檔 |
| **Claude Code** | 概念與本機制度高度同構：跨模型 judge＝「驗證不自驗」鐵則、typed verification＝R17 契約表的可執行驗收條件、termination guards＝R16 長迴圈透明化的護欄版。它把這套紀律做成**可攜 loop.yaml 工件**，是 institution 檔目前沒有的形態。README 明確對比 Claude Code 內建 `/goal`（同模型自評）與 `/loop`（純排程）的缺口，定位清楚 |
| **Automation** | 五個 pattern 模板中 bug-hunt / code-review / security-scan 與 QA 背景直接相關；可作為定期巡檢 loop 的規格骨架 |

## 安裝建議

⏳ **觀望** — 理由：紀律本體（跨模型驗收、可執行成功標準、多重停止護欄）本機 institution 體系已覆蓋約八成，重複安裝不符合 R13；它獨有的增量是「loop 規格工件化（loop.yaml 可版控可攜）」與五份現成 rubrics/模板。if-then：下次要設計**多 gate、需跨模型 judge 的常設迴圈**（例如每日 bug-hunt 巡檢）時再裝，屆時它省的是規格設計時間；平時單次任務用現有 R17 契約表即可。3 週新 + 單人維護，也值得等它過第一個月再看存活度。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：需要設計「多 gate、跨模型 judge 的常設迴圈」（例如每日 bug-hunt 巡檢）
- **放棄條件**（→ ❌ 不裝）：發布滿一個月後轉為停滯（無新 release/commit、issue 無回應）→ 存活度不足，放棄追蹤

## 相關連結

- [[Github/repos/fable-harness — Fable 行為協議移植套件（hooks 強制執行層）|fable-harness]] — 同樣把「驗證紀律」工件化，但走 hooks 強制層；looper 走 pre-flight 設計層，互補
- [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill|web-design-guidelines]] — 同為單一 Skill 型安裝
