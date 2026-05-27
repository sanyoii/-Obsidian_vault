# 新 Idea / 新專案 SOP

> 最後更新：2026-05-28（整合 7-Agent 工廠工作流）
> 適用：有新想法、要開新功能、要建新專案時的標準流程

---

## 流程圖

```
[有 idea]
    ↓ Obsidian Inbox → gbrain-inbox.ps1
Phase 0  → 捕捉存檔

Phase 1  → researcher（調研）→ [人工確認] → story-writer（User Stories）→ [人工確認]
                ↑ 選策略：minimal / standard / research-heavy

Phase 2  → spec-writer（技術規格：資料模型 + API 合約 + 分工邊界）

Phase 3  → backend-builder + frontend-builder（平行）
         → test-verifier（整合測試 + Bug 路由）
         → validator（Code review + PR 準備）→ [人工 Review]

Phase 4  → contextual-commit → 更新 rules → 值得記的存 gbrain
```

---

## Phase 0 — 捕捉 Idea（隨時，30 秒完成）

想法出現當下先存，不要讓它消失：

1. 在 Obsidian `Inbox/` 新增 `idea-<名稱>.md`
   - `Ctrl+P → Insert template → idea` 套用模板
   - 一句話描述即可，不求完整
2. 存好後跑一個指令搞定（import + embed + 自動移到 `wiki/Ideas/`）：
   ```powershell
   D:\Claude\tools\gbrain-inbox.ps1
   ```

> **注意：** `_README.md` 等底線開頭的檔案不會被移動。`wiki/Ideas/` = 已進 gbrain 待 Phase 1 處理。

---

## Phase 1 — 調研釐清需求（新對話）

開一個**全新對話**（context 乾淨），先選策略，再用 researcher 開始：

**先選策略（[[7-Agent 工廠工作流 SOP#策略選擇]]）：**

| 策略 | 選它，當... |
|------|-----------|
| `minimal` | 只改一層（後端 or 前端），需求已明確 |
| `standard` | 前後端都要改的新功能（預設） |
| `research-heavy` | 完全沒用過的技術，或需要先做架構選型 |

**然後讓 researcher agent 做調研：**

```
我想做 [一句話描述]。
用 researcher agent 調研：技術選型、競品、可行性。
```

researcher 完成後，你確認方向，再讓 story-writer 整理 User Stories。

> **這步最重要。** 模糊的 idea 直接進 code，90% 會走冤枉路。

---

## Phase 2 — 技術規格（spec-writer）

```powershell
# 先查 gbrain，看有沒有相關知識或過去筆記
gbrain search "相關關鍵字"
```

人工確認 User Stories 後，讓 spec-writer 產出技術規格：

```
用 spec-writer agent，根據確認的 User Stories 寫技術規格。
需要包含：資料模型、API 合約、後端/前端分工邊界。
```

spec-writer 的輸出就是過去的 SPEC.md，但格式更嚴謹（有 Contract 定義）。

- 規格出來後在編輯器裡確認（`Ctrl+G`）
- 重點確認：分工邊界清不清楚？API 合約完整嗎？
- 確認後進 Phase 3

---

## Phase 3 — 實作 + 驗收

**Step 3a — 建構（平行或單層，視策略）**

```
用 backend-builder agent 依照技術規格實作後端。
（若有前端）同時用 frontend-builder agent 實作前端。
```

| 做 | 不做 |
|---|---|
| 發現跑偏立刻按 `Esc` 喊停 | 讓 Claude 繼續錯下去 |
| 改多個檔案前先確認方向 | 直接讓 Claude 改一堆再說 |
| `/clear` 換主題時用 | 把不相干的任務混在同一個對話 |

**Step 3b — 測試驗收（test-verifier）**

```
用 test-verifier agent 依照 User Stories 的驗收條件逐一測試。
```

- test-verifier 會自動做 Bug 路由（spec 問題 / 後端問題 / 前端問題）
- 等 P0 Bug 全修完，驗收條件 100% PASS 再往下

**Step 3c — 品質審查（validator）**

```
用 validator agent 做 code review 和安全檢查，準備 PR 描述。
```

- validator 輸出審查清單 + PR 描述草稿
- 你確認沒問題後，這是**人工檢查點 3**，決定是否 merge

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

- [[7-Agent 工廠工作流 SOP]] — Phase 3 實作時的 Agent 分工標準流程
- [[Claude 環境說明]] — 路徑與工具總覽
- [[知識庫操作手冊]] — gbrain 使用方法
- [[開發常用指令]] — git、gbrain、Claude Code 指令速查
