---
tags:
  - claude-code
  - skills
  - agent-design
  - karpathy
date: 2026-05-30
---

# Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則

> 來源：[karpathy/autoresearch](https://github.com/karpathy/autoresearch) 的 `program.md` 設計，2026-05-30 整理

`program.md` 是 autoresearch 的核心 Skill 文件，定義 AI Agent 執行 LLM 訓練研究時的完整行為規範。它的設計不只是一份指令清單，而是一套讓 Agent 可以**在無人監督下可靠工作**的心智模型轉移機制。以下六個原則可直接移植到 Claude Code Skill 設計中。

---

## 原則一：**明確劃定邊界：CAN / CANNOT 分清楚**

大多數 Skill 只說「要做什麼」，卻沒說「不能做什麼」。`program.md` 明確列出 Agent 被允許操作的範圍，以及明確禁止的行為（例如不得修改評估基礎設施、不得更動固定的資料載入邏輯）。

**為什麼重要：** Agent 在模糊地帶容易「聰明過頭」——以為幫你做了更多，實際上踩到了地雷。邊界即護欄，沒有護欄的 Skill 等於把 Agent 放進無界的沙漠。

**對應你可以做的：**
在每份 Skill 裡加「禁止觸碰的檔案 / 範圍」清單。例如：
```
禁止觸碰：
- src/config/ 底下的任何設定檔
- 任何包含 .env 的路徑
- 已有測試覆蓋的邏輯（除非任務明確要求）
```

---

## 原則二：**單一客觀指標，不留詮釋空間**

`program.md` 的成功標準非常明確：「get the lowest val_bpb」（validation bits-per-byte，越低越好）。這是一個可以程式化驗證的數字，沒有模糊地帶。

**失敗案例對比：**
- 模糊：「讓程式碼更好」→ Agent 不知道是要更快、更易讀、還是更短
- 清楚：「讓 `/api/search` 的 p95 latency 從 800ms 降到 400ms 以下」

**對應你可以做的：**
成功標準用具體指令或輸出格式定義。每個 Skill 加一行：
```
成功標準：[可測試的條件，例如：測試全過 / 指定檔案存在 / 輸出符合指定格式]
```
「更好」、「優化」、「改善」這類詞，在 Skill 裡視為無效標準。

---

## 原則三：**把品味（taste）量化成 if-then 規則**

這是 `program.md` 最有價值的設計之一。Karpathy 把「什麼時候要保留一個實驗結果」這件本來只在腦子裡的直覺，轉化成明確的判斷規則（Simplicity criterion）：

- 0.001 val_bpb 進步 + 增加 20 行複雜度 = **不值得**
- 0.001 val_bpb 進步 + **刪掉**程式碼 = **一定保留**
- 幾乎 0 進步 + 更簡潔 = **保留**

這讓 Agent 可以在不打擾人類的情況下做出「Karpathy 風格」的判斷，而不是每次都回來問。

**對應你可以做的：**
把「通常我會這樣判斷」的直覺外顯化，寫成 if-then 規則。例如：
```
如果修改讓測試從 5 秒變 4.5 秒，但新增超過 30 行 → 不接受
如果修改讓程式碼行數減少且測試仍通過 → 優先接受
如果效能差異小於 10%，但可讀性明顯提升 → 接受
```
Agent 才能代替你做判斷，而不是遇到任何取捨就停下來問。

---

## 原則四：**科學方法：先建 baseline，再優化**

`program.md` 規定：第一次執行永遠先跑 baseline，記錄基準數字。後續所有實驗都以 baseline 為比較基準。這個規則防止 Agent 跳過基準測試直接優化，導致「不知道從哪裡起跳、也不知道進步了多少」的狀況。

**常見問題：** Agent 直接開始修改，改完之後無法判斷結果是更好還是更差（因為沒有起點）。

**對應你可以做的：**
對任何涉及「比較/優化」的任務，Skill 第一步強制要求：
```
步驟 0（必須）：執行現有版本，記錄 [指標名稱] 的基準值，再繼續後續步驟。
```

---

## 原則五：**Setup 是獨立 Phase，末尾有人工 Checkpoint**

`program.md` 把整個工作流程分為兩個明確階段：
1. **Setup**：初始化環境、確認工具可用、建立基準
2. **Confirm**：在此節點，人類確認環境已就緒
3. **自動化迴圈**：確認安全後，Agent 才進入自主執行模式

這個設計避免了「Agent 在未就緒的環境裡開始執行，跑了兩小時才發現 GPU 沒掛上」的常見災難。

**對應你可以做的：**
長流程 Skill 在 Setup 結束後加一個明確的人工確認節點：
```
【Checkpoint】以上步驟完成後，請回報：
- [工具/服務] 是否可用？
- 基準數字為何？
- 是否繼續進入自動化迴圈？
```
不要讓 Agent 靜默地從 Setup 滑進 Execution。

---

## 原則六：**結構對應人類心智模型**

整份 `program.md` 遵循一個人類熟悉的流程：**Setup → Experimentation → Output Format**。這不只是格式問題，而是認知負擔的問題：Agent 理解「熟悉的流程結構」遠比「任意排列的指令清單」容易得多。

**為什麼：** LLM 的 in-context learning 依賴結構線索。整齊的三段式結構讓 Agent 在任何時候都知道「我現在在哪個 Phase」，就像程式碼縮排讓人知道「我現在在哪個 scope」。

**對應你可以做的：**
所有複雜 Skill 採用三段式結構：
```
## Setup（環境確認 / 前置作業）
## Execution（主要任務步驟）
## Output Format（輸出格式要求）
```
即使任務簡單，明確的段落標題也能降低 Agent 的解讀誤差。

---

## 總結：六個原則對照表

| Karpathy 的設計 | 移植到 Claude Code Skill 的方式 |
|---|---|
| CAN/CANNOT 清單 | Skill 加「禁止觸碰的檔案 / 範圍」 |
| 單一可驗證指標 | 成功標準用具體指令或輸出格式定義 |
| 品味量化 if-then | 把判斷直覺寫成 if A then B else C |
| baseline 先行 | 有比較的任務先跑基準，記錄起點 |
| Checkpoint 確認 | 長流程加人工確認節點，Setup 結束才進 Execution |
| 熟悉結構 | Setup / Execution / Output 三段式 |

---

## 反向連結

*相關：[[karpathyautoresearch — AI Agent 自主 LLM 訓練研究框架]] · [[Karpathy 最高遵守原則 — AI 行為準則]]*
