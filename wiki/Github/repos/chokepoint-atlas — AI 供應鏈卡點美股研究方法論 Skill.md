---
source: "https://github.com/wesson9527/chokepoint-atlas"
author: "wesson9527"
stars: "42"
clipped: 2026-07-17
tags:
  - "github/repo"
  - "investing"
  - "claude-code/skills"
  - "supply-chain"
---

# chokepoint-atlas — AI 供應鏈卡點美股研究方法論 Skill

> **wesson9527/chokepoint-atlas** | ⭐ 42 | 🍴 4 | 📝 無授權
> 「卡脖子美股战法：用供应链瓶颈思维研究 AI 美股」

---

## 一句話說明

一個 Claude Agent Skill，把「AI 產業鏈美股研究」從「問 AI 哪支票會漲」翻轉成「先拆系統→找物理卡點→拉證據→才給方向和候選股」的結構化流程。專攻 AI / 光通訊 / 半導體 / 資料中心 / 電源散熱 / 先進封裝供應鏈，方法論借鏡兩位公開研究者（Serenity @aleabitoreddit、Crux Capital）的提問邏輯但不冒名不編引言。目標使用者：研究美股 AI 硬體產業鏈、想找「第二/三層瓶頸」而非熱門大票的個人投資者。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 42 |
| Forks | 4 |
| 主要語言 | Python（純確定性後處理，非金融運算） |
| 授權 | 無 LICENSE 檔（⚠️ 預設保留全部著作權，非開源） |
| 建立時間 | 2026-06-01 |
| 最後推送 | 2026-06-03（停更一個半月） |
| Open Issues / PRs | 0 / 4 |
| Release | 無 |
| 大小 | 1.8 MB、26 檔、~36.8K tokens |

---

## 核心功能

- **兩鏡頭方法論**：Serenity 鏡（找被忽略的卡點——供給集中、認證週期長、不可替代、產能訂滿、管理層講「sole source / qualification / ramp / demand > supply」）＋ Crux 鏡（拆 6-9 層 stack、給每家公司角色、部位大小跟執行確定性走）。兩鏡疊加。
- **L1-L5 分層對話工作流**：L1 產業診斷 → L2 stack 拆解 → L3 證據鏈 → L4 給方向（非個股）→ L5 使用者追問後才下沉到小市值標的。硬規則：建論點前絕不先報個股。
- **證據階梯（Evidence Ladder）**：四級 Tier A-D（財報/法說 → 產業媒體 → 社群貼文 → 傳言），每條主張強制標 `Confirmed / Inferred / Weak / Needs verification`。
- **五維打分框架**：Constraint / Evidence / Consensus / Mispricing / Catalyst 各 1-5 分，替 lane 與個股排優先序；明文警告「不得把分數當假精確」。
- **三種腳本管線**：①單條研究線出研究包（build_research_pack.py）②多線橫向比較排序（compare_lanes.py）③原始材料抽取成研究包（run_source_pipeline.py）＋資訊圖生成（generate_infographics.py）。
- **反冒名護欄**：SKILL.md + style-and-voice.md 明列「借提問習慣、不抄用語 slogan、不編造他們的私人持倉」。

---

## 技術架構

```
SKILL.md（方法論主檔：兩鏡頭＋L1-L5＋硬規則）
 ├─ references/（9 檔方法論細則：evidence-ladder / scoring-framework /
 │   graph-schema / catalyst-watch / question-ladder / output-formats(-v2) /
 │   style-and-voice / product-manual）
 ├─ scripts/（Python 確定性後處理，非資料抓取、非運算）
 │   ├─ build_research_pack.py    證據 JSON → schema 驗證＋分數聚合(mean)＋markdown/mermaid
 │   ├─ compare_lanes.py          多 lane 排序表
 │   ├─ run_source_pipeline.py    原始材料 → 抽 evidence/signal/quote
 │   ├─ extract_sources_to_pack.py
 │   └─ generate_infographics.py  研究包 → 資訊圖
 ├─ examples/（3 份輸入 JSON 範例）
 └─ agents/openai.yaml
```

| 層次 | 技術 |
|------|------|
| 方法論 | Markdown（SKILL.md + 9 references，佔智識核心） |
| 後處理 | Python：JSON schema 驗證器 + 分數平均 + mermaid/資訊圖格式化 |
| 資料來源 | 無自動抓取——證據 JSON 由使用者手工餵入（腳本只驗證與格式化） |

> 關鍵理解：分數與證據 tier 都是 LLM/人工填入的**輸入**，Python 腳本不做金融運算，只驗 schema、算平均、轉格式。價值在**方法論紀律**不在自動化。

---

## 社群口碑

星數較低（42 < 1K），社群平台無有意義討論，跳過口碑蒐集。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 投資/金融類第 6 篇。與 [[Github/repos/ai-berkshire — AI 時代的價值投資研究框架\|ai-berkshire]]（四大師價值投資）方法互斥：那個看「公司品質/護城河」，這個看「供應鏈物理卡點」 |
| **Claude Code** | 與已裝 jane-finance skill **鏡頭互補不重疊**：jane-finance = Jane 沙龍萃取的宏觀/景氣循環/資金流；chokepoint-atlas = AI 硬體供應鏈微觀卡點。同屬投資研究但抽象層不同 |
| **Automation** | 無自動化價值——腳本不抓資料，證據仍需人工整理成 JSON；是紀律層不是省工層 |

**值得偷的機制（與命理/求職報告工作流通用）**：
- **證據四級標籤 + 每主張強制 tag**：可移植到任何「不唬爽」需求的報告（對齊使用者 about-me 的「回覆前 double-check 不唬爛」原則）——jane-finance 已有可信度分級，此處的 `Confirmed/Inferred/Weak/Needs verification` 更簡潔可直接抄。
- **「先給方向、追問才下沉個股」的逐層升級**：與 institution 的 output-level 升級同構（最淺層先答、追問才深化）。
- **「不得把分數當假精確」自我警告**：打分框架的誠實護欄，與 R13「無法量化改善先問成功標準」同源。

---

## 安裝建議

⏳ **觀望** — 方法論紮實（證據階梯＋卡點 stack＋五維打分是真可複用的研究紀律），但三個保留：①**領域窄**——只服務 AI 硬體/半導體美股，非通用投資；②**無授權檔**（非開源，安裝/散布法律狀態不明）；③停更一個半月、42⭐ 生態薄。

復查觸發（依 2026-07-17 新規）：
- **升級條件**（→ ✅ 裝）：使用者實際開始研究 AI 硬體/半導體美股，且 repo 補上 LICENSE
- **放棄條件**（→ ❌ 不裝）：停更超過 6 個月（2026-12 前無新 commit），或核心機制（證據四級標籤）已折入本系統後無殘餘需求

---

## 相關連結

- [[Github/repos/ai-berkshire — AI 時代的價值投資研究框架|ai-berkshire]] — 同投資類，方法互斥（公司品質 vs 供應鏈卡點）
- [[Github/repos/machine-learning-for-trading — ML4T 第三版機器學習交易全流程|ml4t 3rd ed]] — 同投資類，量化 ML 路線
