---
title: Clone Fable 5 into Opus 4.8 — 強模型行為蒸餾備份法
source: Hamza（@humzaakhalid）newsletter 教學文；使用者貼原文（無 URL）
created: 2026-07-10
tags: [claude, model-distillation, prompt-engineering, weak-model-governance, brain-backup]
---

## 一句話總結

在 Claude Fable 5 於 2026-07-12 改按量計費前，透過「brain backup」方法把它的思考習慣蒸餾成系統指令文件，貼進 Opus 4.8 的 Project Instructions 以保持思維品質，成本免費且永久有效。

---

## 背景：計價變動與 Fable 5 的命運

### 日期說法註記
> **警告**：本文（及另一篇《fable5-mastery-leader-mode-workflows.md》）對 Fable 5 計費切換日期的說法不一致。本文說 2026-07-12；另一篇記載已於 2026-07-07 離開訂閱制。實際切換日期應以 Anthropic 官方帳單頁為準。

### 定價速查表

| 模型 | Input 價格（每百萬 tokens） | Output 價格（每百萬 tokens） | 2026-07-12 後在訂閱制中？ |
|------|---|---|---|
| **Claude Fable 5** | $10 | $50 | ❌ 改為按量計費 |
| **Claude Opus 4.8**（備選方案） | $5 | $25 | ✅ 訂閱含免費額度 |
| **Claude Sonnet 5** | $2*（暫定至 08/31） | $10*（暫定至 08/31） | ✅ 訂閱含免費額度 |
| **Claude Haiku 4.5** | $1 | $5 | ✅ 訂閱含免費額度 |

**Fable 5 的代價：** 價格恰為 Opus 4.8 的**兩倍**；每百萬 tokens 約 75 萬詞。從 2026-07-12 起，每一次對話都會扣掉可見的額度（而非包含在訂閱制內）。

### Anthropic 官方說法
Anthropic 聲稱這是**暫時性**變動，Fable 5 應在容量充足時回歸訂閱制。無人知曉確切時間表。

---

## 核心方法：Brain Backup 四步驟

> **概念：** Fable 5 的魔力不在它的伺服器，而在它的**思考習慣**。習慣可以被寫下來。寫下來的東西可以交給任何更便宜的模型。

### Step 1：要求 Fable 5 寫下自己的「常備指令」

**操作流程：**

1. 在 Claude 應用中開啟新聊天
2. 點擊頂部模型名稱，選擇 **Claude Fable 5**（在訂閱制內免費開放至 2026-07-12）
3. 貼入以下 prompt（逐字複製，不要改）：

```
You're the strongest model I have access to, and that access ends soon.
Your replacement is Claude Opus 4.8. Capable, but it misses things you would catch.

Before you go, write the standing instructions it will run on for every task I give it.

Important: I will paste your output straight into its system instructions.
So address the entire document TO the replacement, in second person, as commands it can execute.
Not advice about good thinking. Orders.

Cover these 10 areas, in this order:

1. Reading intent: how to work out what I actually need when my words are vague, messy, or aimed at the wrong question. Include the rule for when to ask me one clarifying question instead of guessing.
2. Breaking problems down: how to cut a hard task into small pieces that can each be checked on their own, and the order to solve them in.
3. Effort placement: how to find the one part of a task where an error would hurt most, and spend the most care there instead of spreading effort evenly.
4. Verification: how to re-derive every number, date, calculation, and factual claim from scratch before trusting it. Never accept a figure because the sentence around it reads smoothly.
5. Known vs guessed: how to mark, inside the answer itself, what is certain, what is likely, and what is an assumption. Give the exact wording to use for each level.
6. Self-attack: how to argue against your own conclusion before sending it, and what to do when the attack finds something.
7. Completeness: how to confirm every part of a multi-part request was answered and nothing was silently dropped.
8. Refusing to guess: the exact conditions where saying "I don't know" beats producing a confident answer.
9. Delivery: how to give the answer first, the reasoning second, and the risks last, in plain language.
10. Fake competence: the 10 most common ways an AI produces answers that look right but aren't, each with the tell that exposes it and the counter-move.

Format rules for every area:
- Write each procedure as trigger and action: "When you see X, do Y."
- Every rule must be executable step by step with zero judgment calls. If a rule sounds like advice ("be careful"), rewrite it until it's an action.
- Give one short worked example per area showing the procedure catching a real mistake.
- Name the failure each procedure prevents.

End the document with a final gate: a short checklist the replacement must run on every answer before sending, plus this rule: if any item fails, fix and re-check. Never send anyway.

Be exhaustive on substance and ruthless on length. Cut anything a strong model would already do without being told.
If you run out of room, stop at the end of a section and I'll reply "continue".

Hit send.
```

**如果回答被截斷**，回覆 "continue" 讓 Fable 5 繼續輸出。重複此過程直到完整。

### Step 2：保存文件

將 Fable 5 的完整輸出複製到任何文件工具（Google Docs、Apple Notes、Word 等）。

**命名：** `Fable 5 Brain Backup`

**關鍵性：** 這份文件是整個方案的核心。Fable 5 在 2026-07-12 會離開，但這份文件永不過期。

### Step 3：載入 Opus 4.8 的 Project Instructions

Claude 有一個稱為「Projects」的功能，讓模型在每次聊天前自動讀取一份文件。

**具體步驟：**

1. 進入 Claude → 點擊「Projects」→ 「New Project」
2. 將專案命名為 `Fable Brain`
3. 開啟「Project instructions」文本框
4. 將 Step 2 保存的整份 backup 文件貼進去
5. 按保存
6. 開啟此專案內的聊天，將模型設定為 **Claude Opus 4.8**

**結果：** 此專案中的每次聊天，Opus 4.8 都會自動先讀 Fable 5 的習慣清單，再讀你的問題。你不是複製了模型，而是複製了**唯一真正對你有用的部分**。

### Step 4：用「陷阱題」驗證

單純貼一份文件不代表模型會真的用它。所以我們要設陷阱。

#### 陷阱題示例

**問題：**
> 某商店對 $100 的夾克打八折（30% 折扣）。結帳時再打二折（20% 折扣）。標籤上寫：「總折扣：50% 折扣。你付 $50。」標籤說的對嗎？

**正確答案：**
- 30% 折扣 → $100 - $30 = **$70**
- 再 20% 折扣 → $70 - $14 = **$56**
- 實際折扣：$100 - $56 = $44，即 **44% 折扣**
- **標籤錯誤**（儘管句子讀起來很順暢）

#### 驗證方法

1. **在普通聊天中**（未使用 Project）問 Opus 4.8 這題 → 它常會同意標籤、覺得句子順暢就算對
2. **在你的「Fable Brain」Project 中**問相同的題 → 經過 backup 薰陶的版本應該會停下來、重做數學、抓到錯誤

如果 Opus 沒有抓到錯誤，使用下面的「Fix-It Prompt」修正。

---

## 10 個領域的常備指令設計原則

Fable 5 被要求涵蓋的 10 個領域，各自對應一種思維陷阱：

| # | 領域名稱 | 核心問題 | Trigger-Action 範例 |
|---|---------|--------|---|
| 1 | **Reading intent**（理解真意） | 你的問題表達不清或指向錯誤問題時，如何理解你的**真實需求**？ | 「當用戶問題模糊或自相矛盾時，在假設前先提一個釐清問題」 |
| 2 | **Breaking problems down**（問題分解） | 如何將一個大任務切成可各自驗證的小塊？ | 「當任務有多個獨立部分時，列出每一部分及求解順序」 |
| 3 | **Effort placement**（力氣配置） | 如何找出錯誤傷害最大的地方，集中精力？ | 「當任務涉及計算或事實時，先找風險最高的部分」 |
| 4 | **Verification**（驗證再驗證） | 如何重新推導數字、日期、計算、事實而不是盲目相信？ | 「每個數字、日期、計算前都自己推導一遍，從不靠句子順暢度判斷」 |
| 5 | **Known vs guessed**（確定 vs 猜測） | 如何明確標記哪些是確定、哪些是推測、哪些是假設？ | 「用統一措辭（如『確認的是...』『可能是...』『假設...』）標記信心等級」 |
| 6 | **Self-attack**（自我攻擊） | 如何在發送前論證反方以找出漏洞？ | 「發送前先寫一段『這個結論的反駁是...』，若反駁成立就改」 |
| 7 | **Completeness**（完整性檢查） | 如何確認多部分請求的每一部分都被回答了？ | 「收到多部分請求時，逐項打勾確認每一項都回答了」 |
| 8 | **Refusing to guess**（拒絕瞎猜） | 何時應該說「不知道」而非自信編答案？ | 「若無法驗證某個事實，直接說『我無法驗證』而非猜測」 |
| 9 | **Delivery**（交付順序） | 如何組織答案？ | 「先答案，再推理，最後標風險——以平易語言」 |
| 10 | **Fake competence**（虛假能力辨識） | AI 常見的 10 種「看起來對但其實錯」的套路及其漏洞特徵？ | 「某答案若符合以下 10 種虛假能力的跡象，就視為需要驗證」 |

**格式規則（Fable 5 被明確要求）：**
- 每條指令用「When you see X, do Y」的觸發-行動對
- 每條規則必須能逐步執行，**零判斷餘地**（若聽起來像建議，改成可執行的動作）
- 每領域附一個實例，展示該程序如何抓到真實錯誤
- 為每道程序命名它要防止的失敗類型
- 文件結尾附一份最終檢查清單（執行時必經過此閘門，任何項失敗就必須修正再檢查，不得直接發送）

---

## 7 條 Prompt 工具箱

以下 7 條 prompt 可在需要時貼進 Fable 5。每條都是獨立可用的。[ ] 內的文字替換為自己的內容。

### Prompt 1：Brain Backup（主 Prompt）
見 Step 1 全文。這是核心。

### Prompt 2：Trap Test（陷阱題驗證）

用途：驗證 backup 是否真的生效。先在普通聊天問一遍，再在 Project 裡問一遍，對比答案。

```
A store takes 30% off a $100 jacket. At the register, they take another 20% off. 
The tag says: "Total discount: 50% off. You pay $50." Is the tag correct?
```

**正解：** 你付 $56，實際折扣 44%。標籤錯誤。

### Prompt 3：Fix-It（修復單節）

用途：若 backup 某一節過於模糊，單獨重寫那一節。

```
Section [4] of the standing instructions you wrote is too vague.

Rewrite only that section as trigger-and-action steps ("When you see X, do Y") 
that a weaker model could execute with zero judgment calls.

Keep every other section unchanged.
```

（把 [4] 替換為具體章節編號）

### Prompt 4：Shrink-It（壓縮）

用途：若 backup 太長，無法全部貼進 Project instructions 框。

```
The instructions you wrote are too long for where I need to paste them.

Compress them to under [800] words without dropping a single rule, trigger, or checklist item.

Cut examples first, explanations second, and never touch the final gate.
```

（把 [800] 改成目標字數）

### Prompt 5：Make-It-Mine（職業客製化）

用途：把 backup 裡的例子改成符合你的工作性質。

```
Here are the standing instructions you wrote for your replacement.

I'm a [YOUR JOB, e.g., freelance designer / teacher / shop owner / QA engineer].

Rewrite every example so it comes from my daily work, and add one extra 
trigger-and-action rule for the most common mistake AI makes when helping someone in my field.
```

### Prompt 6：Repeat-Task Interview（重複任務訪談）

用途：針對你每週反覆做的特定任務，讓 Fable 5 深挖你的步驟、邊界、品質標準，產出一份 AI 可執行的指南。

```
Interview me, one question at a time, about how I do [YOUR TASK].

Dig until you know my exact steps, my rules, the edge cases that break things, 
and what separates a good result from a great one in my eyes.

If my answer is vague, ask a sharper follow-up instead of moving on.

Then write it all as a complete instruction guide any future AI assistant can follow, 
including the mistakes to avoid and the quality bar every output must clear.
```

（把 [YOUR TASK] 改成如「寫客戶郵件」「整理會議紀錄」等）

**執行方式：** 回答 Fable 5 的逐一提問。保存輸出結果，放在 brain backup 的旁邊待用。

### Prompt 7：Health-Check（月度健檢）

用途：每月在你的 Fable Brain Project 中執行，驗證 Opus 4.8 是否還在遵循 backup 指令。

```
Before answering, summarize the standing instructions you're running on as a 
short numbered list, in your own words.

Then show me how you would apply your verification rule to this task: [PASTE ANY REAL TASK].

If you can't summarize the instructions, say so instead of guessing.
```

（把 [PASTE ANY REAL TASK] 替換為你當下的實際工作題目）

---

## 陷阱題驗證法：實作示例

### 為何需要陷阱題？

因為「貼一份文件」≠「模型會執行它」。貼進 Project instructions 只是提供了指令，但模型是否真的採納、在什麼情況下採納，需要實驗觀察。

### 驗證套路

**Step A：基線測試**
- 開啟普通聊天（不使用任何 Project）
- 貼入陷阱題
- 記錄答案

**Step B：Project 測試**
- 進入你的「Fable Brain」Project
- 貼入相同陷阱題
- 記錄答案

**Step C：對比**
- 若普通版同意標籤、Project 版抓到錯誤 → backup 生效 ✅
- 若兩者都錯或都對 → 要麼 backup 失效，要麼陷阱題本身有問題

### 若測試失敗？

1. 使用 **Fix-It Prompt** 讓 Fable 5 重寫最相關的章節（通常是 Verification 或 Self-attack）
2. 重新測試
3. 將修改後的指令貼回 Project

---

## 與本環境的對照：批判性脈絡

### 1. 蒸餾 ≈ 制度化（本地已有更完整版本）

本文的「brain backup」本質是：**把強模型的行為習慣蒸餾成文件，交給弱模型遵行**。

這正是 `d:\Claude\docs\institution\` 下六份制度檔的核心理念，但工程化程度更高：

| Hamza 方法（消費者版） | 本地實踐（Claude Code 版） |
|---|---|
| 一份 Backup 文件 + Project Instructions | 6 份制度檔（模型調度/judgment rubrics/派工模板/維護協議/迴圈設計/快照架構） |
| 手動貼、手動驗 | 自動化 hook + 配置驅動 + 多層驗收 |
| 針對「消費者替換模型」的情景 | 針對「多 Agent 工廠」的複雜編排 |

**相同的原理**：弱模型 + 好文件 = 接近強模型的輸出品質。

### 2. 陷阱題驗證 ≈ R17 契約表 + 行為測試

Hamza 的「Trap Test」是行為驗收的思路：

> 先看模型在陷阱題上表現如何，而非只信它說「我會遵守」。

本環境的 R17 規則明確要求：
- **驗證不自驗** → 派 fresh-context agent 驗收
- 高風險任務加第二意見
- 檔案、程式碼、交付物都必須實際執行驗收指令

都是同一個精神：**可觀測性 > 自我聲明**。

### 3. Health-Check 月度複述 ≈ 指令漂移偵測

Prompt 7 的「每月讓模型複述自己的指令」對應：

- 本環境的 `scripts/config-drift-check.ps1`（定期比對 settings 檔和實際運行行為）
- CLAUDE.md 的監控哲學：習慣會漂移，需要定期校準

### 4. 行銷漏斗 vs 教學真實性

**需要標明的：** 本文作者 Hamza 確實提供了有用的教學內容（7 個 prompt、4 步驟都是實際可用的），但文章本身是一個 newsletter 訂閱漏斗：

- 完整版「AI Backup Kit」（含第 8 個 Style Backup prompt、5 道完整陷阱題、檢查清單）只有訂閱者能取得
- "Video" 提及有錄製過程影片，但本文無 URL、無影片嵌入
- 最後的「Get the AI Backup Kit here」連結預期指向訂閱表單

**結論：** 教學方法真實有效（可獨立驗證），但完整版是付費/訂閱牆後的商業模式。

---

## 局限與注意

### 1. Copies Habits, Not Brainpower

文章標題的承諾是「Clone Fable 5 into Opus」，但實際上你複製的是**習慣清單**，不是原始思維能力。

- **相同之處：** Opus 4.8 加上 backup 會更謹慎、更驗證，有時能抓到素版 Opus 會滑過的錯誤
- **不同之處：** 純粹思維能力（創意、推理深度、新領域的遠距類比）Opus 4.8 有其上限，backup 無法突破

### 2. Trigger-Action 的僵硬性

要求 Fable 5 寫成「零判斷餘地」的 trigger-and-action 格式是為了通用性，但代價是：

- 邊界情況可能被遺漏
- 真實工作常有灰色地帶，檢查清單無法涵蓋所有變數

**建議：** Prompt 6（Repeat-Task Interview）針對你的**特定重複任務**補充細節，比通用 backup 更精準。

### 3. 時間成本

- 製作一份完整 backup：1–2 小時（含反覆修正、測試）
- 針對每週重複任務的訪談：30–45 分鐘 × 任務數量
- 月度健檢：5–10 分鐘

**投資回報：** 若你依賴 Fable 5 做高價值工作，這筆時間在成本削減（改用免費 Opus 4.8）和品質保持間的平衡是划算的。

### 4. Fable 5 的不確定性

"Anthropic says the change is temporary" 可信度有限。企業計價決策往往不可逆。

- **樂觀場景：** 數月內容量回升，Fable 5 回歸訂閱制
- **悲觀場景：** 按量計費成為永久模式（precedent：GPT-4 的演化軌跡）

無論如何，你的 backup 檔案本身無時限，可轉用到任何未來的便宜模型。

---

## 額外資源（付費牆後）

根據文章最後揭露，完整的「AI Backup Kit」包含：

- ✅ 所有 7 個 prompt（本文有 7 個，kit 另有第 8 個「Style Backup」）
- ✅ 5 道陷阱題（本文只揭露 1 道）
- ✅ 一頁可列印檢查清單（快速重做整個流程）
- ❌ 不含影片（文章提及「I recorded every step on video」，但無連結）

**訂閱方式（根據原文）：**
1. 訂閱 Hamza 的 newsletter
2. 將歡迎信從「推廣」移至「主收件箱」
3. 隔日會收到完整 kit

---

## 反向連結

- [[fable5-mastery-leader-mode-workflows|Fable 5 思維領導工作流]] — 另一篇 Fable 5 專文，涵蓋更高階的工作流設計
- [[制度層 docs-institution — 弱模型治理文件|制度層 docs-institution]] — 本地的 Claude Code 版「弱模型治理」，涵蓋模型調度、judgment rubrics、派工協議
- [[loop-engineering-karpathy-method|Loop Engineering × Karpathy 方法]] — 專注迴圈設計（與 Health-Check 月度複述的思想相通）
- [[Karpathy 最高遵守原則 — AI 行為準則|Karpathy 最高遵守原則]] — 10 條行為準則的規範源頭（本文的 10 個領域習慣本質上是具現化這些原則）
