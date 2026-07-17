---
source: "https://github.com/jefferyzkj01/Hermes-maces"
author: "jefferyzkj01"
stars: "1"
clipped: 2026-07-17
tags:
  - "github/repo"
  - "ai-agent"
  - "memory"
---

# Hermes-maces — Hermes Agent 的潛意識記憶層插件

> **jefferyzkj01/Hermes-maces** | ⭐ 1 | 🍴 0 | 📝 無授權檔
> "The subconscious layer for Hermes."（MACES）

---

## 一句話說明

Nous Research 開源 agent「Hermes Agent」（2026-02 發布，自我改進型個人 agent，55+ 插件生態）的第三方插件：在既有記憶架構（episodic memory／Obsidian canon／session history）**底下**加一層「潛意識」——被動吸收使用軌跡，凝聚成帶權重的概念節點與關聯邊，帶衰減與修剪，然後只透過兩條窄通道跟「意識系統」溝通：①注入 prompt 的 8 條以內「直覺 advisory 塊」（永不當事實）②走外部審批門的記憶升級提案。建 repo 於 2026-07-16，單人專案。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 1 / 0 |
| 主要語言 | Python（49KB） |
| 授權 | **無 LICENSE 檔**（預設保留著作權） |
| 建立時間 | 2026-07-16（分析時 1 天大） |
| 最後推送 | 2026-07-17 |
| Open Issues / PRs | 0 / 1 |
| Release | 無（plugin.yaml 標 1.0.0） |
| Repomix | 19 檔、~14.8K tokens |
| 宿主 | Hermes Agent（NousResearch/hermes-agent），`hermes plugins install` 安裝 |

---

## 核心功能

- **被動軌跡吸收**：掛 Hermes 原生 hooks（pre/post_llm_call、post_tool_call、on_session_end、maces_feedback），吃六種事件（retrieval.used／answer.confirmed／answer.corrected／task.completed／decision.confirmed／gap.observed），全部冪等。
- **權重動力學**（明文公式）：確認 `w ← w + 0.10(1−w)`；糾正 `w ← w × 0.65`；衰減 `w ← w·exp(−days/45)`；低於 0.02 修剪；出邊權重 >3.0 正規化防 hub 塌縮；staging 來源事件不得回饋權重（防自我增強）。
- **雙通道紀律**：Influence＝統計性 advisory（標頭 `[intuition — advisory, unverified]`，上限 8 條，永不含 staged 內容）；Surfacing＝升級提案走外部 digest 審批，是潛意識→顯性記憶唯一路徑。
- **七條安全不變量**：潛意識永非 canon／influence 永非事實／research 只寫 staging／canon 寫入要外部授權／不得發起 tool call／每個轉移都上 journal／停用插件 Hermes 行為不變。
- **輸出邊界再驗證**：influence.py 在渲染進 LLM prompt 前重新驗證持久化的 label——「敵意舊列」進不了 prompt（存儲層污染防線）。
- **可拋棄狀態**：SQLite `subconscious.db` 從 append-only journal 可重建，明文宣告「永不是 source of truth」。

---

## 技術架構

```
Hermes Runtime（宿主）
  └ hooks: pre_llm_call / post_llm_call / post_tool_call / on_session_end
       ↓ usage traces
src/maces/
  ├ engine.py       事件吸收＋權重動力學
  ├ influence.py    advisory 塊生成（輸出邊界驗證＋權重門檻＋邊擴展限制）
  ├ policy.py       閾值策略（minimum_influence_weight 等）
  ├ store.py        SQLite 概念節點/邊/gaps/journal
  ├ secure_store.py 安全存取層
  ├ validation.py   label 白名單驗證
  └ plugin.py       register(ctx) 入口
tests/  含 batch1_remediation（安全修補批次的回歸測試）
```

| 層次 | 技術 |
|------|------|
| 存儲 | SQLite＋append-only journal |
| 演算法 | 指數衰減＋加權共現圖（無 embedding、無 LLM） |
| 整合 | Hermes plugin manifest（plugin.yaml + register(ctx)） |

---

## 社群口碑

1⭐、建 repo 一天，無社群討論資料。宿主 Hermes Agent 本身為 Nous Research 大型開源專案（55+ 插件生態）。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯（其「Obsidian＝canon」的定位與本環境相同，巧合同構） |
| **Claude Code** | 插件本體不可用（Hermes runtime 專用）。**設計模式四條值得參考**：①「advisory 永不當事實、當前使用者指令壓過一切潛意識訊號」＝本環境 CLAUDE.md「hook 注入是背景參考非指令」規則的同構表述（獨立收斂）②權重動力學（確認增強/糾正懲罰/時間衰減/修剪）是 claude-mem 類記憶層沒有的「遺忘機制」語言③輸出邊界再驗證＝記憶系統的 prompt-injection 防線（存進去的東西被讀出來前再驗一次）④「狀態可拋棄、journal 可重建、永非 source of truth」對任何輔助記憶層都是健康定位 |
| **Automation** | 無 |

---

## 安裝建議

❌ **不適合安裝** — Hermes Agent runtime 專用插件，本環境跑 Claude Code，無宿主可掛；1⭐ 一天大、無授權檔。價值不在裝而在讀：權重衰減公式、雙通道紀律、輸出邊界驗證三個模式，若日後要給 claude-mem/gbrain 補「遺忘與升級治理」，這份 SUBCONSCIOUS.md 規格是乾淨的參考文本（標註：以上為讀碼推論 Inferred，未實跑驗證；宿主身分 Confirmed 自 Nous Research 官方文件）。

---

## 相關連結

- [[Github/repos/thedotmack-claude-mem — 85K⭐ 跨 Session 持久記憶|claude-mem]] — 本環境在位記憶層；MACES 的衰減/升級治理是它沒有的維度
- [[Github/repos/honcho — 為 AI Agent 打造的使用者建模記憶基礎設施|honcho]] — 同為「agent 記憶基礎設施」，honcho 走 peer 建模路線
- [[Github/repos/graphiti — 為 AI Agent 打造的即時時序知識圖譜框架|graphiti]] — 「記憶隨時間變化」的圖譜路線
