# Claude Code 開發工作流與 Loop Engineering

> 來源：Threads @chan_yu_chen
> 日期：2026-06-21
> 主題：十年軟工經驗整合 Claude Code 的開發方式，寫給非軟工背景 Vibe Coder

---

## 功能開發

### 1. 確認規格（Spec-Driven）

走**規格驅動開發**，規格優先，並且把規格列為**第一級產出**（First Class Artifacts）——規格本身就是專案的一級資產，不是寫完就丟的中介物。

產出完成後：
- 開 **subagent 做對抗性驗證**（adversarial review）：請 AI 反向攻擊——哪裡模糊、會不會 scope creep、有沒有隱含決策、有沒有必要
- 考慮引入 **ponytail skill**，確保「做對的事」而不只是把事情做對
- 推上 GitHub，讓 **Codex 自動 pickup** 做 Code Review（review spec 細節是否完整、是否矛盾）

好處：之後的 code review、debug、post-mortem 都有可參照的來源。

> 在 spec 規劃時就先把預計拆成幾個 PR 一併規劃好，讓每個 PR 盡量小，保持人類可以輕鬆理解的程度。

### 2. 開始實作（TDD Loop）

走**測試驅動、紅綠開發**（TDD）。本地開發完送上 GitHub，讓 Codex 自動 review。

目前 Claude Code 會自己做：
- **smoke test**（基本能跑就行的冒煙測試）
- **e2e test**（end-to-end 整合測試）

第二步本身會一直 **loop**，直到第一步產生的 spec 被滿足為止。

---

## 基礎工程架構（Infrastructure）

CI / CD / Monitoring / Bug Report / Feature Backlogging / Customer Support 等等，也一樣當成功能開發。

Spec 階段就要決定：
- 壞了怎麼知道
- log 留什麼
- rollback path（出事退回前一版的路徑）是什麼

---

## 事故發生的流程

1. Bug 進生產環境 / API 壞掉 / 部署壞掉 → 先做基本原因調查
2. 緊急就先上 **hotfix**（緊急修補）
3. 修復走嚴謹路線：plan → TDD
4. 修復後做**事後檢討（post-mortem）**：
   - 事故的時間軸
   - 事故成因
   - 修復方式
   - 日後改進的方法
   - 不只看程式碼，也看開發流程哪裡有問題

---

## 總是反省目前的工作流程

### /last-word skill

在 context window usage 到 **40% 左右**、或要切新工作項目時跑一次。功能：
- 反省這次流程哪裡做得不順
- 提出改善建議
- 更新 memory 檔案跟 claude.md 檔案
- 若工作做到一半，留下**交接文件**讓下一個 session 無縫接軌

> GitHub 上也有類似的 `/handoff` skill，幾乎同樣概念。

### /explain skill（decision-diff）

當跟不上 Agent 在做什麼時使用：
- 隨時介入、知道這個 loop 裡發生什麼事
- 請 AI 生成**互動式介面**，讓人類更好理解 Agent 正在做的事

> Anthropic 宣布的 `/artifact` 功能與此概念幾乎相同。

---

## 小結：四個核心目標

1. **讓 AI 執行的成功率變高**，我更可以放手
2. **即使 AI 開發速度很快，我不會喪失對專案的理解**
3. **發生意外時的爆炸範圍更可控**（基本的工程素養）
4. **總是不停地迭代開發流程本身**，甚至「怎麼迭代」本身也進行迭代

---

## 關鍵概念索引

| 概念 | 說明 |
|------|------|
| Spec-Driven Development | 規格優先，規格是第一級產出 |
| Adversarial Review | subagent 對抗性驗證，反向攻擊找漏洞 |
| TDD Loop | 測試驅動開發，loop 到 spec 滿足為止 |
| Ponytail Skill | 確保「做對的事」而非「把事情做對」 |
| /last-word | context 40% 時反省流程 + 交接文件 |
| /explain (decision-diff) | 跟不上 Agent 時的可視化介面 |
| Post-mortem | 事後檢討，含流程層面反思 |
| Rollback Path | spec 階段就規劃好退路 |
| Scope Creep | 範圍蔓延，做 A 做成 A+B+C |

---

## 反向連結

- [[Code Wiki]]
