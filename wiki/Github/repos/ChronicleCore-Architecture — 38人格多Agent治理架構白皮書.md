---
source: "https://github.com/Zaious/ChronicleCore-Architecture"
author: "Zaious (Martin Lee)"
stars: "49"
clipped: 2026-07-05
tags:
  - "github/repo"
  - "ai-agents"
  - "llm-orchestration"
  - "multi-agent-governance"
---

# ChronicleCore-Architecture — 38 人格多 Agent 治理架構白皮書

> **Zaious/ChronicleCore-Architecture** | ⭐ 49 | 🍴 8 | 📝 專有授權（禁商用/禁複製人格/禁衍生）
> "The conceptual architecture and governance whitepaper for ChronicleCore, an enterprise-grade Multi-Agent orchestration framework."

## 一句話說明

台灣作者 Martin Lee 的個人 38-agent 人格治理系統**概念白皮書**——純 markdown、零程式碼，公開的是拓撲圖、治理哲學（5 Pillars）與一個旗艦案例（異端審判官「真理」的完整身份模組）；其餘 37 個 agent 定義留在私有系統。附 Zenodo 學術預印本（ASAF：Agent Identity Design as a Collaboration Interface）。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 49 / 8 |
| 主要語言 | 無（純 Markdown，25 檔） |
| 授權 | 專有（Whitepaper 條款：可讀可引用需署名；禁商用、禁人格複製、禁衍生架構圖） |
| 建立 / 最後推送 | 2026-02-25 / 2026-04-21 |
| Open Issues / PRs | 0 / 0 |
| 最新 Release | v2.0-asaf（2026-04-21） |
| 貢獻者 | 1（單人專案） |
| 首頁 | chroniclecore.com（個人編年史風格站，Jina 可爬） |

## 核心概念

- **Context Governance**：「你管理的不是 AI 模型，是它們的組織圖」。執行層 agent 做戰略決策必幻覺 → 職責物理分離。
- **5 Pillars**：👑 Core（戰略路由，禁止寫 code）／👁️ Senses（唯一情報入口）／🎭 Soul（美學/修辭）／🔨 Hands（純執行）／🛡️ Shield(內部審計，「機關槍辯論」共識辯證後才准入記憶核心）。
- **Identity Module Pattern**：每個 agent = `SKILL.md`（身份約束）＋ `assets/persona.md`（性格）＋ `sovereign/`（diary 流水 + preferences 結晶 + DIRECTIVES 主權指令）＋ `evolutions/`（能力 DLC）。宣稱是 Anthropic SKILL.md 格式的多層身份擴展。
- **Memory Crystallization**：身份約束（SKILL.md）與暫態推理紀錄（diary.md）分離，防止任務推理侵蝕人格核心。
- **旗艦案例「真理」**：前橋水 Radical Truth 人設的審計官——蘇格拉底審問、20 種認知偏誤剝削、「拒收『我測過了』口頭擔保，強制要求截圖或 Log」。

## 技術架構

```
Sovereign（人類，Human-in-the-Loop）
   └── Trinity Council（Core：樞機師/幕僚長/星探）
         ├─→ Intelligence Bureau（Senses，天機星單一入口）
         ├─→ Creative Atelier（Soul，5 節點）
         ├─→ Build Factory（Hands，8 節點）
         └─← Shadow Guard（Shield，真理+資安）辯論攔截
```

概念層而已——無 runtime、無 orchestrator 程式碼、無安裝物。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **制度層（institution/）** | 高度平行印證，幾乎逐條對應：Core 禁寫 code ≈ 「指揮官不下場」；Shield 證據審計 ≈ R17「親跑驗收指令，不信敘述報告」；Memory Crystallization ≈ 04 協議「memory 記發生過什麼、institution 記以後怎麼做」的分工。**驗證了現有設計方向，但無新增可執行內容。** |
| **Claude Code** | 無可安裝物。Identity Module 的 `sovereign/preferences.md`（人格結晶層）是現有 agents 沒有的一層，但 38 人格編制對個人環境是過度工程（R13）。 |
| **可借鑑點** | ① 審計 agent 的「證據強制」措辭可豐富 validator/驗收 prompt；② ASAF 預印本（zenodo.org/records/19652278）談 agent 身份設計作為協作介面，值得一讀。 |
| **授權風險** | Anti-Cloning 條款明文禁止複製人格、衍生架構圖——只能讀與引用（需署名），不能照抄進自己系統。 |

## 安裝建議

📌 **參考閱讀，無物可裝** — 純概念白皮書，零程式碼。價值在「別人也走到同樣結論」的印證：38-agent 人格治理與本環境的 institution/ 制度殊途同歸。授權禁止衍生使用，照抄不可行也不必要——現有 R 系列 + 7-Agent 工廠已覆蓋同樣問題域。想深挖只需讀 ASAF 論文與 inquisitor 案例目錄。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Articles/ASAF — Agent 身份設計作為協作介面（論文筆記）|ASAF 論文筆記]]（PDF 存 `raw/sources/ASAF-agent-identity-2026.pdf`）
- ASAF 論文預印本：https://zenodo.org/records/19652278
- 對照：本環境 `docs/institution/`（01 模型調度／04 維護協議）、`.claude/agents/workflow/ORCHESTRATION.md`
