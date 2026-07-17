---
source: "https://github.com/zero00072/ten-wins-ten-losses"
author: "zero00072 (Zhang Xiaowei)"
stars: "2"
clipped: 2026-07-17
tags:
  - "github/repo"
  - "claude-code/skills"
  - "sdd"
  - "workflow"
---

# ten-wins-ten-losses — 三國官渡 SDD 角色扮演開發工作流

> **zero00072/ten-wins-ten-losses** | ⭐ 2 | 🍴 1 | 📝 MIT
> Agent Skill：以《官渡之戰》曹營四謀士為人設的規格驅動開發（SDD）工作流

---

## 一句話說明

純 Markdown 的 Agent Skill（無任何程式碼），把軟體開發流程包裝成三國角色扮演：郭嘉（設計師）寫規格、荀彧（審核師）批文審查、徐晃（執行者）寫程式、荀攸（重構師）重構。核心是規格驅動開發（SDD）＋漸進式揭露（SKILL.md 路由到 references/ 各角色檔），目標使用者是想用單一 AI 助理跑完「需求→規格→審查→實作→重構」閉環的個人開發者。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 2 |
| Forks | 1 |
| 主要語言 | 無（純 Markdown） |
| 授權 | MIT |
| 建立時間 | 2026-06-15 |
| 最後推送 | 2026-06-22 |
| Open Issues / PRs | 0 / 0 |
| Release | 無（SKILL.md 標 v1.0.1） |
| 大小 | 21 KB、14 檔、~11.8K tokens |

---

## 核心功能

- **四角色人設路由**：SKILL.md 依觸發詞（「奉孝」「文若」「公明」「公達」）路由到 `references/` 對應角色檔，各角色有獨立 SOP——單一 session 內切換人格，非真正多 agent 派工。
- **零配置文件初始化（安營紮寨）**：一聲令下把 `assets/` 四份範本（specification / wishlist / questions / refactoring_notes）複製到專案 `docs/`，固定檔名、自動替換專案名。
- **十階段工作流**：許願池寫願景 → 規格起草 → 問對錄釐清 → 審查批文 → 辯論 → 主公拍板 → 結案 → TDD 實作 → 重構劄記。
- **Git diff 增量鎖定**：審查者與執行者接手前必跑 `git diff docs/specification.md`，只處理上一手的變動增量（Delta），不重審已決之局。
- **文件內評論串協議**：固定格式的批文（`> **針對這一點，文若認為**：`）、二層引用回覆、`✅ **文若結案**` 結案權限專屬審核師——設計師不得自行結案。
- **questions.md 安全閥**：執行者遇規格模糊「絕對不可妄自揣度」，必須停下寫入問對錄請示，等主公裁決。
- **條件式 TDD 判準**：不查語言名單，查「專案根目錄能否單一指令跑全部測試」；全新專案＋有標準 test runner 才強制 TDD，否則明標「免除 TDD」。
- **完整風格指南**：style_guide.md（佔全 repo 29% token）規範中英空格、全形括號、章節編號、GFM Alert、表格 vs 條列的判準。

---

## 技術架構

```
SKILL.md（路由層：觸發詞 → 角色檔）
 ├─ references/
 │   ├─ fengxiao.md   郭嘉·設計師（規格起草＋文件初始化）
 │   ├─ wenruo.md     荀彧·審核師（diff 增量審查＋專屬結案權）
 │   ├─ gongming.md   徐晃·執行者（TDD 先行＋安全閥）
 │   ├─ gongda.md     荀攸·重構師（重構＋四節劄記）
 │   ├─ style_guide.md 全域風格約束
 │   └─ tdd_guide.md   TDD 適用性判準
 └─ assets/            四份 {{PROJECT_NAME}} 範本
```

| 層次 | 技術 |
|------|------|
| 全部 | Markdown（instruction-only skill，零程式碼） |
| 依賴 | Git（強需求，diff 增量追蹤） |

---

## 與現有系統的相關性評估

定位：與本系統的 institution 制度層 + 7-Agent 工廠**同構但精簡**——它是「單 session 人格切換」版，本系統是「真 subagent 派工」版。皮（三國人設）零增量，但四個機制值得分診：

| 機制 | 本系統現況 | 增量判斷 |
|------|-----------|---------|
| **git diff 增量鎖定**（審查/執行只看 Delta） | R17 契約表驗收「交付項目」，但無「以 diff 增量為唯一執行依據」的明文規則 | ⭐ 最大增量候選。省 token、防重審已決事項；可考慮入 03-delegation-templates 的派工規格 |
| **questions.md 安全閥**（執行者禁猜，問題落檔待裁決） | Karpathy #1「不確定就問」，但 subagent 跑到一半無法問人 | ⭐ 次增量。subagent 遇模糊時寫 questions 檔而非硬做，指揮官收工時代答——補了「禁猜」在派工情境的落地機制 |
| **結案權專屬審核者**（設計師不得自結） | 三鐵則「驗證不自驗」已覆蓋概念 | 概念已有；「結案 token 寫在文件裡、可追溯」的形式可參考 |
| **TDD 適用性判準**（查一鍵測試環境，不查語言名單） | 工廠 test-verifier 無明文判準 | 小增量，一句 if-then 即可折入 02-judgment 或 spec-writer |
| **結案紀律**（結案後禁開新議題；追加只准 `💡 補充觀察` 非阻塞通道） | council／對抗審查靠輪數自然收斂，無明文收斂規則 | ⭐ 一行規則直擊 LLM 審查者真實失效模式——每輪都能再挑出新東西、迴圈不收斂；巧在給審查者不阻塞的出口而非叫他閉嘴 |
| **審查意見三分支分診**（①可修→直接修 ②審查者誤解→駁回說明 ③主觀設計→升級人類裁決） | 「審查員 findings 也要抽驗證據」已有駁回精神；「主觀設計禁止兩個 AI 自行合意」無明文 | 一句話可入 reviewer/validator 派工模板 |
| **固定措辭協議**（批文/結案用固定字串落在規格檔內，審查狀態可 grep） | 審查輸出在對話層，不落檔 | 有前提的增量：若規格審查落檔化，「有未結案批文→hook 擋實作」可純 grep 實現（verify_gate 同型）；先觀望 |
| **重構回報四節**（命名對照表／邏輯錯誤三色分級／受影響檔案／驗證結果） | R17 契約表管交付項，無重構內容格式 | 命名對照表比讀 diff 快；派重構工時可要求此回報格式 |

依 evidence-first-governance 原則：採納前先對自家 2-3 個實際派工案例分診（是否真發生過「重審已決」「subagent 硬猜」），確認再折入 03/hook，不另開新檔。

---

## 安裝建議

❌ 不安裝 — 2⭐ 小品，工作流本體已被 institution + 7-Agent 工廠完整覆蓋且更強（真派工 vs 人格切換）。價值在抽機制不在裝皮：候選是「diff 增量鎖定」與「questions.md 安全閥」兩條，走分診流程評估。

---

## 相關連結

- [[Github/repos/fable-harness — Fable 行為協議移植套件（hooks 強制執行層）|fable-harness]] — 同為「與 institution 同構」的外部方法論，同樣走抽機制不整裝路線
- [[Github/repos/looper — Claude Code Agent Loop 設計教練|looper]] — 同型：外部流程設計層，八成同構觀望中
- [[Github/repos/pilotfish — Claude Code 多模型委派配置包|pilotfish]] — 委派設定包，與三鐵則同構
