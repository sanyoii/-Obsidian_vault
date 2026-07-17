---
source: "https://github.com/Miguok/fable-harness"
author: "Miguok"
stars: "83"
clipped: 2026-07-05
tags:
  - "github/repo"
  - "claude-code"
  - "hooks"
  - "agent-governance"
---

# fable-harness — Fable 行為協議移植套件（hooks 強制執行層）

> **Miguok/fable-harness** | ⭐ 83 | 🍴 11 | 📝 MIT
> "Make Claude Code work like a disciplined engineer: OODA, multi-party adversarial review, model routing, fail-then-pass. Distilled from Fable to reinforce the Opus harness."

---

## 一句話說明

把 Fable 5 的紀律行為（先蒐證、亮假設、重大結論抗辯、fail-then-pass 驗證）蒸餾成可安裝的 Claude Code 套件——3 個 hooks + 1 個 skill + 3 個反方 agents——讓 Opus/Sonnet/Haiku 驅動時也維持同等程序紀律。發布首日（2026-07-05）即 83⭐。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 83 / 11（發布首日） |
| 主要語言 | Python（verify gate + 測試） |
| 授權 | MIT |
| 建立時間 | 2026-07-05 |
| 內容 | 24 檔案 / 23K tokens；zh-TW README 為主 |
| 維護 | 單人（Miguok），含 10+ 案例 pytest 測試 |

---

## 核心功能

| 組件 | 機制 | 說明 |
|------|------|------|
| `fable_protocol.md` + `inject_protocol.sh` | SessionStart hook | 每 session 注入 6 節行為協議（OODA/抗辯/回報紀律/DoD/模型分工/harness 分流） |
| `prompt_nudge.sh` | UserPromptSubmit hook | 每輪一行協議微提醒 |
| **`verify_gate.py`** | **Stop hook** | **改了程式碼卻沒跑測試 → 機械擋回一次**（soft：第二次結束放行防卡死；解析錯誤 fail-open）。附 10 案例測試含假放行防護 |
| `adversarial-review` skill + 3 agents | skeptic / red-team / simplifier 平行三鏡頭 | 重大結論過半存活才採信；影響生產者 loop-until-dry（連續 2 輪無新發現才停） |
| `model_dispatch_rules.md` | 治理文件 | 派工包 7 欄（目標/範圍/非目標/允許路徑/驗收/回報格式/停止條件）+ 強制回報模板 |
| `cognitive_rubrics.md` | 治理文件 | when to slow down / ask / change path / escalate 機械判準 |
| `detect_harness.py` | 唯讀腳本 | 偵測專案已有 harness（Superpowers 等）時退居底線，不搶主流程 |

---

## 技術架構

```
Claude Code session
├── SessionStart  → inject_protocol.sh ──→ fable_protocol.md（6 節協議全文注入）
├── UserPromptSubmit → prompt_nudge.sh（每輪一行提醒）
├── Stop          → verify_gate.py（解析 transcript：有改碼無測試 → block 一次）
├── Skill: adversarial-review ──→ Agent×3 平行（skeptic / red-team / simplifier）
└── CLAUDE.md 路由表 → model_dispatch_rules / cognitive_rubrics（按需讀取）
```

| 層次 | 技術 |
|------|------|
| 注入層 | bash hooks（SessionStart / UserPromptSubmit） |
| 閘門層 | Python Stop hook（stdin JSON → block JSON，零相依，pytest 10 案例） |
| 審查層 | Claude Code Agent 工具 + 3 個 agent persona .md |
| 治理層 | 純 Markdown 文件路由（CLAUDE.md 為正本） |

---

## 與本系統的同構對照（重點）

此 repo 與 `docs/institution/` 體系**同源異株**——都從 Fable 5 行為蒸餾，架構幾乎一一對應：

| fable-harness | 本系統 | 誰較完整 |
|---|---|---|
| `model_dispatch_rules.md`（派工包 7 欄） | `01-model-dispatch.md` + R17 契約表（三件套） | 各有所長：它多「非目標/允許路徑/停止條件」三欄 |
| `cognitive_rubrics.md` | `02-judgment-rubrics.md` | 相當；它的「兩個門檻管不同對象」註記寫法值得學 |
| 派工模板 | `03-delegation-templates.md` | 相當 |
| `future_session_letter.md` | `05-letter-to-future-sessions.md` | 相當 |
| SessionStart 協議注入 | CLAUDE.md 自動載入 | 等價 |
| **verify_gate.py Stop hook** | **無對應——R10/R12 全靠自律** | **它獨有，本系統最大缺口** |
| adversarial-review 三鏡頭投票制 | 「驗證不自驗」+ 高風險第二意見（散文規則） | 它更結構化（過半存活/loop-until-dry/逐條不打包） |

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無關 |
| **Claude Code** | 高度相關——制度層 95% 重疊不需要；**hooks 機械執行層是本系統沒有的**：制度靠模型自律遵守，verify_gate 是第一個「不遵守就擋下」的硬體層 |
| **Automation** | verify_gate.py 可獨立摘出（stdin JSON in / block JSON out，無相依），移植成本低 |

**可借鏡（按價值排序）：**
1. **verify_gate.py** — 把 R10「驗證是強制步驟」從君子協定變機械閘門。soft 設計（擋一次、fail-open）不會卡死純討論 session。QA 視角：這是把測試紀律做成 process gate
2. **派工包的「非目標/允許路徑/停止條件」三欄** — R17 契約表可補這三欄（防子代理順手改）
3. **抗辯投票制**（過半存活 + REFUTED 理由必列風險清單）— 比「找第二意見」可裁決

**注意**：hook 堆疊已重（claude-mem/caveman/router/statusline），再加兩個注入型 hook 會增每輪 token 稅；只挑 verify_gate（Stop hook，無注入成本）最划算。

---

## 安裝建議

✅ **verify_gate 組件已轉正＋全域化（2026-07-17）；其餘整包維持不裝** — 制度文件層與本系統重疊 95%，整包安裝製造雙源衝突（兩套 CLAUDE.md 路由/兩套派工規則打架）。verify_gate.py 試用 12 天（07-05→07-17 檢討）：正當攔截 ≥3、零誤擋記錄、一次被迫多驗抓到真 bug → 依升級條件搬入 user-level settings 全專案生效。檢討時另抓到測試套件缺 -X utf8 的 cp950 假綠 P2 並修復（hook 已自帶 UTF-8）。

復查觸發已結案（2026-07-17）：升級條件成立 → 已執行；整包其餘組件無升級路徑（同構重疊），不再追蹤。

---

## 相關連結

- [[Github/repos/Vault-for-Founders — 創辦人 AI 知識庫建置框架|Vault-for-Founders]] — 同日分析；它管知識庫，本 repo 管行為紀律，互不重疊
- `docs/institution/01-model-dispatch.md`（主 repo）— 本系統的對應正本
