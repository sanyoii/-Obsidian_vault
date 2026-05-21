# 新 Idea / 新專案 SOP

> 最後更新：2026-05-20
> 適用：有新想法、要開新功能、要建新專案時的標準流程

---

## 流程圖

```
[有 idea]
    ↓ brain-docs/ 或 Obsidian 記下來
[新對話] → Claude 訪談你 → SPEC.md
    ↓
[新對話] plan mode → 探索 codebase + gbrain search → 實作計畫
    ↓
離開 plan mode → 實作（有驗證）→ 喊停糾偏 → /clear 換題
    ↓
contextual-commit → 更新 rules → 值得記的存 gbrain
```

---

## Phase 0 — 捕捉 Idea（隨時，30 秒完成）

想法出現當下先存，不要讓它消失：

1. 在 Obsidian `Inbox/` 新增 `idea-<名稱>.md`
   - `Ctrl+P → Insert template → idea` 套用模板
   - 一句話描述即可，不求完整
2. 存好後跑一個指令搞定（import + embed + 自動移到 `wiki/Ideas/`）：
   ```powershell
   D:\Claude\gbrain-inbox.ps1
   ```

> **注意：** `_README.md` 等底線開頭的檔案不會被移動。`wiki/Ideas/` = 已進 gbrain 待 Phase 1 處理。

---

## Phase 1 — 訪談釐清需求（新對話）

開一個**全新對話**（context 乾淨），讓 Claude 問你問題：

```
我想做 [一句話描述]。
用 AskUserQuestion tool 訪問我，問清楚：
技術實作、UI/UX、edge cases、tradeoff、你沒想到的地方。
訪問完後把結論寫成 SPEC.md。
```

> **這步最重要。** 模糊的 idea 直接進 code，90% 會走冤枉路。

---

## Phase 2 — 探索 + 計畫（plan mode）

```powershell
# 先查 gbrain，看有沒有相關知識或過去筆記
gbrain search "相關關鍵字"
```

開**新對話**，帶著 SPEC.md 進 plan mode：

```
Ctrl+P（進入 plan mode）

"讀 SPEC.md，探索現有 codebase，
告訴我需要改哪些檔案，給我一個完整實作計畫。"
```

- 計畫出來後按 `Ctrl+G` 在編輯器裡確認方向
- 確認沒問題再進 Phase 3

---

## Phase 3 — 實作

離開 plan mode，開始 coding：

```
"按照計畫實作。每個功能完成後跑測試確認。"
```

**原則：**

| 做 | 不做 |
|---|---|
| 每個功能都要有驗證（測試/截圖/command output） | 沒有驗證就跳下一個 |
| 發現跑偏立刻按 `Esc` 喊停 | 讓 Claude 繼續錯下去 |
| 改多個檔案前先確認方向 | 直接讓 Claude 改一堆再說 |
| `/clear` 換主題時用 | 把不相干的任務混在同一個對話 |
| 糾正兩次還不對就 `/clear` 重來 | 一直在同個 context 裡糾正 |

---

## Phase 4 — 收尾

```
# 用 contextual-commit skill 寫有意義的 commit
/contextual-commit

# 新子專案的話，建 path-scoped rule
D:\Claude\.claude\rules\<專案名>.md

# 有值得記錄的決策或文件，存進 gbrain
gbrain import D:\Claude\brain-docs\<新文件>
gbrain embed --stale
```

---

## 核心兩個習慣

1. **新 idea 先訪談，不要直接跳 code** — 省的時間遠超花的時間
2. **每個對話一件事，`/clear` 不吝嗇** — context 乾淨，輸出品質直接上升

---

## 相關文件

- [[Claude 環境說明]] — 路徑與工具總覽
- [[知識庫操作手冊]] — gbrain 使用方法
- [[開發常用指令]] — git、gbrain、Claude Code 指令速查
