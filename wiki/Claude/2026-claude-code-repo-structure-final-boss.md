---
source: "使用者貼原文（英日混合）"
author: "未提供"
date: 2026-07-07
tags:
  - "Claude-Code"
  - "Repo結構"
  - "CLAUDE.md"
  - "Hooks"
  - "Skills"
  - "Agent設計"
  - "Context-Hierarchy"
---

# Claude Code 的終極挑戰：Repository 結構設計（Final Boss Setup）

> 來源：使用者貼原文（英日混合）
> 核心觀點：「瓶頸不是模型，而是 repository 結構」
> 日期：2026-07-07
> 標籤：#Claude-Code #Repo結構 #CLAUDE.md #Hooks #Skills #Agent設計

---

## 核心問題

在 Claude Code 社群中流傳著一個觀察：**同一個模型，同一個 prompt，卻能區分出「聊天機器人型」和「自主開發工程師型」的使用者。區別是什麼？答案：資料夾結構。**

掌握 Claude Code 的頂層使用者發現了一個遠比模型優化更重要的事實——**瓶頸不在模型，而在 repository 結構設計**。

隨著專案規模成長，把所有指令塞進 CLAUDE.md 的做法會導致 Claude 表現逐漸下降，不是因為模型變笨，而是因為**記憶層級設計不當**。

---

## 七大核心設計原則

### ① Context Ladder：四層載入時機（這是改變一切的關鍵）

**核心理念：** 不是「寫什麼進 CLAUDE.md」，而是**設計「什麼時候載入」**。

Claude 的上下文載入有四層，層級越低，被淘汰的可能性越高：

| 層級 | 載入時機 | 用途 | 特點 |
|------|---------|------|------|
| 第1層 | 每次 session 開始 | `CLAUDE.md`（保持精簡） | 全局規則、最常用指令 |
| 第2層 | 基於 path 觸發 | `rules/*.md`（只在觸碰目標檔案時載入） | 路徑特定規則、危險操作警告 |
| 第3層 | 被呼叫時載入 | `skills/*`（playbook，按需載入） | 重複工作流、程式化指令 |
| 第4層 | 完全獨立上下文 | `agents / workflows`（另起 context） | 高成本研究、獨立工作流 |

**常見錯誤：** 大多數人把所有東西都塞進第1層（CLAUDE.md）。結果隨著專案成長，CLAUDE.md 變成 500 行的怪物，重要資訊被淹沒，Claude 表現逐漸「變笨」——不是模型的問題，而是**記憶層級設計崩潰**。

**正確心態：** 你不是在寫文件，你是在**設計 AI 的記憶層級**。

---

### ② ASKED vs FORCED：請求與強制的分界線

**這是區分新手和專家的分界線。**

CLAUDE.md 和 rules 是 **ASKED**（請求）：Claude 讀了以後「盡力按照」，成功率約 90%。

而 Hooks 和 Settings 是 **FORCED**（強制）：它們是系統層級的執行機制，成功率 100%。

#### 實例對比

| 方式 | 型別 | 執行率 | 機制 |
|------|------|--------|------|
| `CLAUDE.md` 中寫「請執行 formatter」 | ASKED | ~90% | Claude 讀指令後「試著」執行 |
| `PostToolUse Hook` 自動格式化 | FORCED | 100% | 每次編輯後立即觸發，無選擇權 |

#### 應用對象

**ASKED（Markdown 請求）適合：**
- 風格指引（寫法偏好）
- 工作流提示（「記得先做 X」）
- 最佳實踐（「建議遵守」）

**FORCED（Hooks / Settings）適合：**
- 密鑰管理（秘密不能外洩）
- 正式環境 migration（不能手滑）
- 生產環境部署（必須經過檢查）

**黃金法則：**
> Style is Guidance. Safety is Enforcement.
> 
> 風格是指引，安全是強制。不可靠的事情不應該寫成「請求」。

---

### ③ Routing Rule：重複性任務的三分類

**一句口訣：** 如果你每次都要在 prompt 裡重複同樣的工作流，那說明你還沒有把它結構化。

重複性任務永遠可以分為以下三類：

| 類型 | 去向 | 執行方式 | 特點 |
|------|------|---------|------|
| **Research** | Subagent | 獨立 context 進行研究，只回傳結果 | 隔離上下文，避免污染主對話 |
| **Procedure** | Skill | 需要時載入的 playbook | 按需啟動，節省 token |
| **Guarantee** | Hook | 每次強制執行 | 系統層級保證 |

#### 你該轉換的訊號

- ❌ 「每次都得在 prompt 裡寫同樣的工作流」→ ✅ 應該轉換成 **Skill**
- ❌ 「每次都得手動說『執行測試』」→ ✅ 應該轉換成 **Hook**
- ❌ 「調查內容污染了主對話上下文」→ ✅ 應該用 **Subagent** 隔離

---

### ④ 自動載入的 Path Gating Rules（路徑觸發規則）

常被忽視但威力強大的功能：`.claude/rules/` 目錄下的路徑觸發機制。

例如：

```
frontend/react.md
```

**這個檔案只在你編輯 React 相關程式碼時自動載入。**

```
api-design.md
```

**這個檔案只在你編輯 API 時自動載入。**

**關鍵優勢：**

1. **需要的規則才出現** — 不必要的規則不消耗 token
2. **及時性更好** — 就像有個資深工程師在相關領域陪在身邊，只在必要時出現
3. **規則不會遺忘** — 進入該領域就自動載入，避免「進了 `/src/payments`，忘記要檢查加密」這種失誤

這等於為不同領域自動指派專家，無需任何手動干預。

---

### ⑤ 具有記憶的 Agent（Agent Memory 與持續學習）

2026 年的新功能，仍被大多數人忽視。

```
agent-memory/
```

Claude 本身可以：
1. 寫下學習內容
2. 直接 commit 到 Git
3. 其他 Agent 和團隊成員可以讀取共享知識

#### 實際案例

某個 debug Agent 上個月解決了棘手的 Race Condition。它把解決方案記在 `agent-memory/` 裡並 commit。

下個月同樣問題重現時，新的 Agent 一開始就擁有這份知識——**不是透過 prompt，而是透過 Git 版本管理的知識庫**。

**迴圈如下：**

```
Claude 寫學習筆記 → Git 管理 → 團隊全員讀取 → 下次工作繼承知識 → 累積
```

**AI 的經驗開始被版本管理。** 這從「一次性的聊天」升級成了「持續成長的知識系統」。

---

### ⑥ 危險地帶的位置特定 CLAUDE.md

全局的 CLAUDE.md 無法涵蓋所有領域特定的危險提示。

因此在特定目錄放置**位置特定的 CLAUDE.md**：

```
src/api/CLAUDE.md
src/payments/CLAUDE.md
src/auth/CLAUDE.md
```

**工作機制：**

Claude 進入這些目錄時，**就在那一瞬間**載入該目錄的 CLAUDE.md。危險警告不會被全局檔案的 4000 token 前淹沒，而是在關鍵時刻出現。

例如進入 `/src/payments` 時自動提示：
- 「這裡涉及真實金錢，PCI 合規檢查必須做」
- 「加密演算法不能自己寫」
- 「資料庫備份在執行前必須完成」

這種「及時警告」遠比「藏在全局文件裡的警告」更有效。

---

### ⑦ 現場學到的 Golden Rules

經歷數十個專案後總結的四條實戰規則：

#### Rule 1：CLAUDE.md 保持 200 行以內

超過 200 行就開始分割到 `rules/` 目錄。

為什麼？因為 CLAUDE.md 是**每次都載入**的，肥大化會：
- 重要資訊被淹沒
- Token 消耗無謂增加
- Claude 難以聚焦

#### Rule 2：寫下實際會用的命令

不要寫「建議執行 npm test」，要寫：

```bash
npm run test:watch
npm run build:prod
npm run lint:fix
```

**為什麼？** 因為 Claude 可以直接複製貼上執行，驗證更有效率。

#### Rule 3：密鑰永遠用環境變數引用

**禁止做：**
```json
{
  "apiKey": "sk-abc123..."
}
```

**必須做：**
```json
{
  "apiKey": "${OPENAI_API_KEY}"
}
```

不是「建議」，是**絕對規則**。

#### Rule 4：`.claude/` 進 Git，`*.local.*` 進 .gitignore

- `CLAUDE.md` → 團隊基礎設施，必須 commit
- `CLAUDE.local.md` → 個人設定，不 commit
- `settings.json` → commit（團隊規則）
- `settings.local.json` → 不 commit（個人微調）

這不是文件，這是**團隊基礎設施**。應該像管理程式碼一樣管理。

---

## 最終洞察

很少人理解的、真正重要的一點：

> **Prompt 改善一次對話。結構改善所有對話、所有隊員、永久改善。**

| 層面 | 投資報酬 | 時效 |
|------|--------|------|
| 改進一個 prompt | 改善單次對話品質 | 立即，一次性 |
| 改進 repository 結構 | 改善所有對話、所有隊員 | 長期累積 |

**更深層的區別：**

> Prompt 是「借用」AI 的智能。結構是「擁有」AI 的智能。

一旦你把 repository 設計好：
- Claude 不再是「訪問」你的程式碼
- Claude 開始「住在」你的程式碼裡
- 每次交互都更聰明，因為基礎設施層層遞進地支撐

---

## 反向連結

- [[Claude/Karpathy 最高遵守原則 — AI 行為準則]] — 五大原則覆蓋所有指令層面，與本文的結構設計互補
- [[Claude/Claude 環境說明]] — 詳細講解 CLAUDE.md 路由與 Path-Scoped Rules 載入機制
- [[Claude/Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則]] — Skill 設計的底層原則，對應本文第③章的 Procedure 分類
- [[Claude/制度層 docs-institution — 弱模型治理文件]] — 團隊層級的 CLAUDE.md 管理與制度落地
