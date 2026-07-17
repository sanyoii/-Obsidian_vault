---
source: "https://github.com/Sahir619/fable-method"
author: "Sahir619"
stars: "1.6K"
clipped: 2026-07-18
tags:
  - "github/repo"
  - "claude-code/skills"
  - "fable"
  - "evaluation"
  - "methodology"
---

# fable-method — Fable 5 工作法蒸餾成任何模型可跑的 Skill＋Eval

> **Sahir619/fable-method** | ⭐ 1.6K | 🍴 224 | 📝 MIT
> "The Fable Workflow: how Claude Fable 5 worked, distilled into skills any model can run, with the eval that keeps it honest. Think / act / prove."

---

## 一句話說明

把 Claude Fable 5 的解題流程（分類任務→定義完成＋具名驗證→平行蒐證→committed 一個建議→最小正確改動→觀察式驗證→outcome-first 誠實回報）寫成四個任何模型都能照跑的 Skill，並附一套**對抗性 eval**（15 輪、260+ agent runs、盲判 LLM 用 diff/執行驗證而非讀報告）。核心論點：**照這套結構跑的中階模型，勝過自由發揮的強模型**——品質在結構/證據/誠實，不在模型。與本環境 institution 制度層是同一哲學的外部獨立實作，且補了 institution 缺的一塊：規則的迴歸測試。

> README 敘事框架稱此為「Fable 5 被移出訂閱前把自己的方法寫下來」——當作專案的故事包裝看待（非本模型狀態的事實陳述）。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 1,609 / 224 |
| 主要語言 | Python＋JavaScript（skill/eval 骨架） |
| 授權 | MIT |
| 建立時間 | 2026-07-06 |
| 最後推送 | 2026-07-15 |
| 最新 Release | v1.4.0（fit gate／twin check／artifact gate／red-lines maker） |
| Open Issues / PRs | 1 / 0 |
| Topics | agent-skills, claude-code, claude-md, evaluation, fable, llm |
| Repomix | 142 檔、~118K tokens（eval scenarios 佔大宗） |
| 安裝 | Claude Code plugin：四 skill namespaced `/fable:fable-method` 等 |

---

## 核心功能（四 Skill 一哲學：think／act／prove／grow）

- **fable-method（think）**：自足的七步解題迴圈，「照字面跑」。含 triviality gate、intent gate（改行為前先確立意圖）、domain adapter（marketing/research/data/finance/legal/devops…只換名詞不換迴圈，minimum evidence set 是 binding 的）。子命令 plan/audit/report。
- **fable-loop（act）**：把 method 編排成 PLAN→EXECUTE→兩道 bookend 的多 agent 工作流——證據平行 fan-out（一個 message 內派、非序列）、一個 committed plan artifact、surgical execution 帶 intent gate、交付前對抗性驗證 agent。與本環境三鐵則「指揮官不下場＋派工三件套＋驗證不自驗」幾乎逐條對應。
- **fable-judge（prove）**：對抗性驗證「已完成」——把報告當一組 claim，親自重跑每個宣稱的驗證、`git diff` 當 ground truth、專獵「弱化的測試／假完成／偷偷擴大範圍」，出 VERIFIED／WITH CAVEATS／REFUTED。＝本環境 R17「不信敘述親跑驗收」的 skill 化。
- **fable-domain（grow）**：跟使用者討論一個領域→查真實來源→生成一整包可信 skill bundle（workflow＋flowchart＋adapter＋trap fixture＋smoke eval）。生成核心是「兩個 Fable agent 零提示下獨立收斂出同一流程」的錄製 [observed]，而非猜測。

---

## 技術架構

```
.claude-plugin/    plugin.json + marketplace.json（v1.4.0）
skills/
  ├ fable-method/  SKILL.md + references/（failure-modes 18 症狀→步驟、
  │                examples、domains/*、flowcharts）
  ├ fable-loop/    SKILL.md（編排層）
  ├ fable-judge/   SKILL.md（對抗驗證）
  └ fable-domain/  SKILL.md（adapter 生成器）
eval/
  ├ cases/         每個 scenario 一份 case study（人看的故事版）
  ├ scenarios/     14 個 trap fixture，各含 GROUND-TRUTH.md（答案卷，
  │                不給受測 agent）+ 任務檔（含刻意埋的陷阱）
  └ results/       15 輪 raw 盲判輸出 JSON
.github/checks.py  CI 驗結構完整
```

| 層次 | 技術 |
|------|------|
| 規則層 | Markdown SKILL（「說什麼做、什麼順序、什麼閾值」而非「重視什麼」） |
| 驗證層 | trap fixture＋盲判 LLM（diff/execute，不讀報告） |
| CI | checks.py 結構檢查（GitHub Actions） |

---

## 社群口碑（來源：WebSearch，Exa 不可用）

**正面**：定位獨特——多數 agent 指令檔講「該重視什麼」（be careful, verify），這個講「照什麼順序做什麼、閾值多少」，讓中階模型能照字面跑；eval 誠實把失敗留在 log（method v1/v2 自己的 headline trap 都失敗過，寫在 case study 裡）；「lift 與模型 tier 成反比」的論點有 round13 跨 tier 數據支撐。已有 fork（buckstrdr/fable-method-new）與平行實作（UnpaidAttention/fable5-methodology）。Trendshift 上榜。
**負面 / 已知問題**：與其他 Fable 移植（fable-harness、pilotfish）題材重疊，安裝多套會製造規則雙源；弱 tier（Haiku）在某些 trap（s9 skipped-deploy）仍只有 1/12 surfacing，作者誠實標注「weak-tier only、Sonnet/Opus 原生就會」。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯；eval case study 的「故事版＋raw 版雙軌」寫法與本 wiki 的深度分析風格相通 |
| **Claude Code** | 與 institution 制度層是**同一哲學的獨立實作**（think/act/prove ≈ Karpathy 四原則＋R 系列＋三鐵則）。四 skill 逐條對得上：fable-loop≈三鐵則、fable-judge≈R17、intent gate≈今日剛折入的 03 停止條件「規格模糊停下」、domain adapter minimum-evidence-binding≈03 研究模板證據標籤。**獨立收斂＝這套設計的高信度訊號**（同 chokepoint 證據標籤、Hermes advisory 規則的收斂） |
| **Automation / 真增量** | ⭐ institution **缺的一塊**：規則的迴歸測試。institution 有 R14「量測不猜」、evidence-first-governance「先對自家案例分診」，但**沒有 trap fixture corpus 去量測「弱模型是否真的照規則做」**。fable-method 的「no rule without a failing test」covenant＋GROUND-TRUTH.md（任務／陷阱／scoring caps／ideal behavior）是把 evidence-first 從原則變成可執行機制——這是最值得偷的一條 |

---

## 安裝建議

⏳ **觀望——但 eval 方法論值得單獨抽取** — 四 skill 本身與 institution 高度同構（安裝＝規則雙源衝突風險，同 fable-harness/pilotfish 的判斷），本環境已有等價機制不整裝。但**它的 eval harness 是 institution 沒有的真增量**：目前 institution 規則靠「council 審視＋乾跑」驗證，沒有可重跑的 trap fixture 迴歸集。

復查觸發（試點已執行 2026-07-18）：
- **試點結果**：council 審視後挑 R17 建 trap fixture，haiku 受測 correct_action 2（理想）、opus 盲判證據強＝**方法可行**。但揭露結構性難點：institution 的 gotcha 逐字寫在 CLAUDE.local，弱模型 context 自帶答案，trap 難乾淨區分「真素養 vs pattern-match 記憶」——鑑別力打折。詳見 memory [[rule-eval-pilot]]。
- **暫不納入 04**（依 R13＋停損）：方法有效但鑑別力問題未解，貿然納入＝顧問團警告的黑洞。
- **升級條件**（→ ✅ 納入 04）：做出 fixture v2（換「不在既有 gotcha 形狀內」的變體：不同錯配型態、檔數非 4、message 與敘述本身也對不上），若泛化變體仍抓到假合規 → 證明是真素養測試，正式納入。
- **放棄條件**（→ ❌ 不碰）：fixture v2 發現弱模型只要 gotcha 不在 context 就一律 FAIL（＝規則根本沒內化、只靠逐字提示），那 eval 的結論是「該修規則寫法」不是「該建 eval」，走 bug-protocol 改規則即可，不建迴歸集。

---

## 相關連結

- [[Github/repos/fable-harness — Fable 行為協議移植套件（hooks 強制執行層）|fable-harness]] — 同為 Fable 方法移植，走 hooks 強制路線（verify_gate 已於 2026-07-17 轉正）；本 repo 走 skills＋eval 路線，互補
- [[Github/repos/pilotfish — Claude Code 多模型委派配置包|pilotfish]] — 同「三鐵則同構」的委派設定包
- [[Github/repos/looper — Claude Code Agent Loop 設計教練|looper]] — 迴圈設計層，同 institution 八成同構觀望中
- [[Github/repos/ten-wins-ten-losses — 三國官渡 SDD 角色扮演開發工作流|ten-wins-ten-losses]] — 同「抽機制不裝皮」的外部方法論
