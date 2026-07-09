---
title: Loop Engineering — Karpathy Method 與 Bilevel Autoresearch
source: 使用者貼上原文（無 URL）
created: 2026-07-10
tags: [claude-code, agent-design, loop-engineering, karpathy]
---

## 一句話總結
Loop 是讓 AI 自己反覆執行直到達成目標、無需人類每一步都驅動的架構；Karpathy 的 AutoResearch 是最知名的實現，而 Bilevel Autoresearch 透過疊加第二層控制迴圈，將效能提升 5 倍。

---

## 什麼是 Loop

Loop 與傳統 prompt 的本質區別：

| 特性 | Prompt（一問一答） | Loop（目標導向） |
|------|---------|---------|
| **驅動方式** | 人類每一步都推一下 | AI 自我驅動直到完成 |
| **執行流程** | 問 → 讀答 → 再問 | 目標定義後全自動 |
| **反饋機制** | 人工判斷結果 | 自動驗證（測試/指標） |
| **狀態管理** | 無記憶，每輪從零開始 | 有狀態，知道試過什麼 |

### Loop 的三個必要元素

1. **Verifier（驗證器）**：檢查結果是否符合要求的客觀標準  
   - 沒有 verifier 時，agent 只是在自我認可一遍遍重複同樣的錯誤
   - 可以是自動化測試、型別檢查、metrics 上下升、build 編譯成功與否
   - **無驗證 = 無 loop**，只有自欺欺人

2. **State（狀態記錄）**：記錄已試過的方案、失敗原因、下一步方向  
   - 讓下一輪知道「我們已經試過 X 不行」，避免陷入循環
   - 一個簡單的檔案就夠，記錄試驗日誌與進度

3. **Stop Condition（停止條件）**：定義什麼時候迴圈終止  
   - 達標（目標完成）或達上限（最多試 N 次）
   - 沒有停止條件的 loop 會耗盡預算或無限重複

---

## 你是否真的需要 Loop？自我測試

Loop 的建置成本很高，只有**四個條件全部符合**才值得：

1. **任務至少每週重複**  
   - 一次性工作用好 prompt 就夠了
   - Loop 的安裝與維護成本在任務頻繁度低時永遠回不本

2. **驗證能自動化**（測試、型別檢查、build 等）  
   - 如果你必須逐行讀 diff 來檢查結果，loop 就沒省到工作量
   - 沒有自動驗證 = 無法真正檢查進度

3. **Token 預算夠寬裕**  
   - Loop 會重複讀 context、多次重試、探索空間很耗 token
   - 消費級方案（~$20 額度）無法支撐重 loop
   - 無限額度才敢跑

4. **Agent 有真實工具**（不只是語言模型）  
   - 能看到執行 logs、能在再現環境跑程式、能看到什麼壞了
   - 沒工具的 loop 是盲目迭代，進步緩慢

**只要缺一項，loop 的成本大於效益。** 不必硬用。

---

## Karpathy AutoResearch 案例：把人類從實驗迴圈中移除

### 背景與契機
2026 年 3 月，Andrej Karpathy 發布了 GitHub repo `AutoResearch`。  
三個檔案、約 630 行程式碼。  
一個月內累積 66,000+ stars。  
*Fortune 雜誌給它起了個名字：**The Karpathy Loop**。*

### 三檔案架構（核心設計思想：人類寫方向，AI 寫改動）

| 檔案 | 角色 | 誰可以改 |
|------|------|---------|
| `train.py` | 訓練腳本 | **只有 agent 可改**，這是優化的發生地 |
| `prepare.py` | 評分器 | **agent 禁碰**，否則它會作弊改簡單測試而非改好模型 |
| `program.md` | 探索指南 | **人類寫**，定義搜尋方向與限制條件 |

核心洞察：把「寫程式」和「檢查程式」分開，agent 作弊的誘因消失。

### 運作流程

```
1. 讀 train.py 的現有代碼
   ↓
2. 提出一個改動方案（寫新版 train.py）
   ↓
3. 訓練 5 分鐘
   ↓
4. prepare.py 評分
   ↓
5. 進步？→ commit  │  沒進步？→ rollback
   ↓
6. 重複直到達成目標或試滿上限
```

人類全程睡著或忙別的事，早上起來檢查日誌。

### 成果數據

**案例 1：Karpathy 自己的實驗**  
- 輸入：他二十年來手調的 GPT 預訓練模型（已經很優化了）
- 執行時間：2 天
- Agent 運行次數：700 次實驗
- 發現的改進：20 項（都是 Karpathy 自己遺漏的）
- 典型發現：attention 機制裡一個漏乘的 scalar multiplier，導致注意力在多頭間過度分散  
  * 不是 fuzzer 能抓到的 bug
  * 是「人類會在第 12 次實驗時累，agent 不會累」才找到的細膩優化

**案例 2：Shopify CEO Tobi Lutke 的內部模型**  
- 執行時間：一晚（overnight run）
- 成果：
  * 品質提升 19%
  * 模型體積砍半
- 關鍵：agent 不是無腦「越大越好」，而是針對硬體特性最佳化

### Karpathy 的核心洞察

> **如果你有客觀指標，你就不應該是親自跑實驗的人。你是瓶頸。把自己從迴圈裡移除。**

---

## 一個可運作的 Loop 由五個部件組成

Claude Code 與 Codex 目前都已全部支援：

| 部件 | 作用 | Claude Code 對應 | Codex 對應 |
|------|------|--------|--------|
| **Automation** | 心跳：排程/事件觸發迴圈 | `/loop` (週期) 或 `/goal` (條件達成) | Automations tab |
| **Skill** | 專案知識庫，每次都讀，讓意圖累積 | `.claude/skills/` 檔案 | Skill 定義頁面 |
| **Sub-agents** | 分工：執行者 vs 檢查者，減少自欺 | 派多個 Agent，不同 instructions | Agent management |
| **Connectors** | 環境整合：讀 issue、開 PR、通知 Slack、更新 Linear | Bash/GitHub tools | Connectors tab |
| **Verifier** | 真正的關卡：測試/型別檢查/build，自動拒絕壞作品 | 測試指令、exit code 檢查 | Build gates |

前四個是**管線**，最後一個才是讓 loop **「真」** 的部件。沒有 verifier，你只是付費讓 agent 同意自己說得對。

---

## 之後發生的事：Bilevel Autoresearch — 一層 Loop 上層 Loop

2026 年 3 月，兩位研究者發表 arxiv 論文《Bilevel Autoresearch: Meta-Autoresearching Itself》。

他們問了一個簡單的問題：  
**如果 autoresearch 本身是一種研究，那是否可以對 autoresearch 進行 autoresearch？**

答案是「可以」，而且效果驚人。

### 架構：層疊的反饋迴圈

```
Outer Loop（Meta-層）
  ├─ 看 Inner Loop 在做什麼
  ├─ 讀 Inner Loop 的代碼與軌跡
  ├─ 找出搜尋過程卡住的地方
  ├─ 產生 Python 代碼來改變 Inner Loop 的搜尋策略
  └─ 注入新代碼，讓 Inner Loop 重新執行

    ↓ 控制

Inner Loop（原本的 Karpathy Loop）
  ├─ 提出改動方案
  ├─ 訓練並評估
  ├─ 保留或捨棄
  └─ 重複
```

### 成果：5 倍進步

在 Karpathy 的 GPT 預訓練 benchmark 上：
- 單層 loop：val_bpb = -0.045
- Bilevel：val_bpb = -0.009
- **差距：5 倍進步（不是 5%）**

重點：**兩層都用同一個 LLM。** 改善來自架構，不是從更聰明的模型。

### Outer Loop 發現了什麼

Inner loop 一直掉進同樣的搜尋模式——LLM 對「該試什麼優化」有先驗偏好，即使那些優化已經不工作了，LLM 還是會回去試。

**Outer loop 的角色**：強迫 inner loop 往模型的直覺會避開的方向探索，打破這個模式。

### 論文的結尾宣言

> 如果 autoresearch 本身可以被 meta-autoresearch，原則上任何有可測量目標的東西都可以被 meta-autoresearch。

---

## 可立即自己動手的簡化版 Loop

**你不需要任何工具就能體驗 loop 的核心機制。** 直接貼以下 prompt 到任何 LLM（包括免費的 Claude.ai）：

```
You will work in a loop until the task meets the bar.

TASK:
[describe exactly what you want produced]

SUCCESS CRITERIA (be strict):
- [criterion 1]
- [criterion 2]
- [criterion 3]

LOOP PROTOCOL, repeat every turn:
1. PLAN   - state the single next step.
2. DO     - produce or improve the work.
3. VERIFY - score the result 1-10 on each criterion.
            Be brutally honest. List exactly what is still weak.
4. DECIDE - if every criterion is 8+, print FINAL and stop.
            Otherwise print ITERATING and go again, fixing
            the weakest point first.

RULES:
- Never call it done until every criterion is 8 or higher.
- Each pass must fix the weakest score from the last VERIFY.
- Do not ask me questions. Make a sensible assumption
  and keep going.

Begin.
```

### 實際運作方式

Model 會：
1. 閱讀你的需求
2. 自己評分（1–10，每個標準）
3. 找到最弱的部分
4. 重寫來修正那個弱點
5. 再評分
6. 重複到所有標準都 8 以上

**你剛剛建造了一個 loop。只用一段文字。**

### 這個簡化版的限制

- 你還是手動觸發（無自動排程）
- 沒有持久狀態（關掉分頁就消失）
- 無法整合到真實環境（無工具）

但它展示了核心機制。從這裡到完整的自主 loop（如 Karpathy 那種），只需要加上：automation（排程）、state file（持久化）、verifier（真實的關卡）。

---

## 誠實的部分：Loop 不會解決的兩個問題

Loop 加速了工作，但它帶來了兩個代價。而且 loop 跑得越順，這兩個問題反而越尖銳。

### 1. Comprehension Debt（理解負債）

Loop 製造代碼的速度越快，你的 repo 裡「存在的東西」跟「你真正理解的東西」之間的落差就越大。

一個順暢運作的 loop 對這筆負債收**複利**：
- 第一天：agent 寫了 10 個改動，你還讀得出來
- 第十天：agent 寫了 100 個改動，沒人真正讀過
- 第一百天：系統變得又大又黑，要 debug 時發現沒人懂裡面發生什麼

這時候還債的代價（重寫、重新學習）會遠遠超過 loop 省下的 token。

**防禦方案**：定期停下來，**把 agent 寫的代碼讀一遍**。不是測試、不是 code review，是真的坐下來讀，確保你理解系統裡發生了什麼。

### 2. Cognitive Surrender（認知投降）

當 loop 自己跑起來後，很容易懶得再形成自己的判斷。  
來什麼就收什麼。「反正 agent 會繼續優化。」

設計 loop 時有兩種方式用同一個動作，結果完全相反：

**✓ 有判斷力的用法**  
- 深度理解工作的前提下建造 loop
- Loop 在你已經掌握的領域加速
- 你還在思考「什麼值得優化」
- → loop 是加速器

**✗ 逃避思考的用法**  
- 用 loop 來迴避「我真的理解這個系統嗎」的問題
- 把責任丟給 agent：「你去改，我看結果」
- 停止形成自己的判斷
- → loop 是麻痺劑

**同一個工具，完全相反的結果。** Loop 分不出差別。只有你自己分得出來。

---

## 金句

> Karpathy 不再寫程式碼了。Cherny 不再下 prompt 了。  
> 但兩人都沒有停止思考。

---

## 反向連結

- [[Karpathy 最高遵守原則 — AI 行為準則|Karpathy 最高遵守原則]]
- [[Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則|Karpathy program.md Skill 設計哲學]]
