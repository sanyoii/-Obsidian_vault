---
title: 多 AI 協作不斷片：用任務卡把 Claude / Codex / Cursor 接起來
author: Leo
x_account: "@runes_leo"
source: "https://x.com/runes_leo/creator-subscriptions/subscribe"
date: 2026-07-10
tags: 
  - 多AI協作
  - 任務卡
  - agent設計
  - 狀態管理
  - 工作流
  - Claude
  - Codex
  - Cursor
---

# 多 AI 協作不斷片：用任務卡把 Claude / Codex / Cursor 接起來

> 作者：Leo (X @runes_leo)  
> 來源：Leo Insider 訂閱區  
> 日期：2026-07-10

## 核心問題

很多人開始同時用 Claude、Codex、Cursor、Grok 以後，很快會撞到同一個坑：一個任務在幾個 AI、幾個聊天、幾個 repo 或文檔之間來回接力時，下一棒到底靠什麼知道現在到哪了？

**關鍵洞察：聊天窗口適合推進，不適合當長期狀態庫。**

時間線的問題是它會把所有東西都混在一起。前面說過一個方向，後面又否定了；前面讓它做 A，後面臨時改成 B；前面有個路徑，後面檔案已經換地方了。人自己知道哪個判斷更新，但下一個 AI 不一定知道。

於是它只能猜：
- 這件事是不是已經做完？
- 哪個檔案是最新的？
- 現在能不能發佈？
- 下一步應該繼續寫，還是先等人確認？

這就是很多多 AI 工作流斷片的原因——不是模型不會做事，而是任務狀態沒有被放在一個穩定的位置。

---

## 四句心法

```
對話負責推進。
任務卡負責狀態。
產物負責證明。
寫回負責接續。
```

**英文原文：**
```
Conversation moves the work.
Task card holds the state.
Artifact proves the work.
Writeback updates the next step.
```

---

## 六節點工作管線

一個能接力的 AI 工作流，不需要一開始就很複雜。把它拆成六個節點：

```
human request
  → working conversation
  → task card
  → execution place
  → artifact
  → writeback
```

| 節點 | 責任 | 說明 |
|------|------|------|
| **human request** | 人 | 通常是模糊的，如「繼續推進這個文章」「把這個需求做一下」 |
| **working conversation** | 對話窗口 | 只負責推進：理解意圖、拆邊界、判斷風險、安排下一步。不承擔長期記憶和事實數據庫角色 |
| **task card** | 任務卡 | 把「繼續推進」這種模糊請求變成一個可交接的狀態單元 |
| **execution place** | 執行位置 | 可能是某個 repo、某個文檔、某個草稿目錄，也可能只是一次只讀判斷。先知道工作發生在哪裡，才能避免 AI 在錯誤的地方開工 |
| **artifact** | 產物 | 可以是草稿、報告、預覽、截圖、代碼 diff、測試結果、demo outline。沒有產物，就不要輕易說完成 |
| **writeback** | 寫回 | 做完以後寫清楚 changed、validated、remaining gate、next action。下一個 AI 接手時，不用完整讀完上一段聊天，也不用猜腦子裡記得什麼 |

---

## 任務卡的十個必寫字段

```yaml
goal:             # 具體可完成的目標
boundary:         # 工作邊界分類
context:          # 背景資訊（不是全部歷史）
current_state:    # 當前進度
artifact:         # 產物檔案路徑或位置
acceptance:       # 驗收標準清單
hard_gate:        # 人類必須確認的動作
next_action:      # 下一步具體行動
owner:            # 責任人
updated_at:       # 更新時間戳
```

### 每個字段防什麼錯

| 字段 | 防止的常見錯誤 | 範例 |
|------|---|---|
| **goal** | AI 把願景當任務 | ❌「優化內容系統」太大 ✅「寫一版 public-safe 文章草稿」才是這一步能完成的目標 |
| **boundary** | AI 去錯地方 | 代碼任務進 repo；內容任務產出草稿；系統任務要小心狀態寫回；決策任務不能伪裝成執行任務 |
| **context** | 下一個模型靠聊天歷史補腦 | 只寫必須知道的背景，而不是把所有歷史都塞進去 |
| **current_state** | 不知道現在進度 | 用明確的進度標籤，如 intake / in_progress / review / complete |
| **artifact** | 「完成」沒有檔案可查 | AI 說寫了文章，那檔案在哪？說做了驗證，驗證結果在哪？ |
| **acceptance** | 半成品當完成 | 設定明確的驗收條件，避免 AI 推進一小步就停下 |
| **hard_gate** | 無意間自動化了危險動作 | 涉及發佈、資金、賬號、凭證、生產、部署時必須停在人類確認前 |
| **next_action** | 「繼續優化」不夠具體 | 最好能讓另一個 AI 直接開工 |
| **owner** | 不知道誰該負責 | 明確指定責任人 |
| **updated_at** | 舊狀態當新狀態 | 旧狀態最危險。它看起來像事實，其實已經過期 |

---

## 完整範例：任務卡 + Writeback

### 場景

對 AI 說：「繼續推進這個公開回覆：判斷它能不能變成內容資產，並準備下一步。」

### 生成的任務卡

```yaml
goal: 判斷一個公開回覆是否值得變成內容資產
boundary: artifact_bound
context:
  - 來源是一條公開回覆
  - 讀者想知道具體怎麼操作
  - 當前只允許產出草稿和 demo 方案
current_state: intake
artifact:
  - article_draft
  - demo_outline
acceptance:
  - 已判斷 publish / park / source material
  - 已產出 public-safe outline
  - 已標注 remaining gates
hard_gate:
  - public_publish
  - demo_recording
next_action: 先寫 public-safe article draft，再等人類確認是否發佈
owner: AI
updated_at: "2026-07-10T10:00:00Z"
```

### 工作完成後的 Writeback

```yaml
changed:
  - article_draft
  - demo_outline
validated:
  - synthetic data only
  - no private paths
  - no publish action
remaining_gate:
  - publish approval
  - demo recording approval
next_action: human reviews draft
updated_at: "2026-07-10T11:30:00Z"
```

**Writeback 的價值**：另一個模型不用讀完整聊天，也知道：草稿已經有了，demo 只是 outline，沒有錄製，沒有發佈，下一步是人先審。

---

## Hard Gate 清單：自動化的安全閥

AI Task Card 的價值不是讓 AI 什麼都自動做，而是**讓 AI 知道哪裡不能自動跨過去**。

以下動作默認寫成 hard gate，不是不能做，而是不能讓 agent 自己悄悄做：

| 動作類別 | 具體例子 |
|---------|---------|
| **公開發佈** | public_publish、post_to_social、release_notes |
| **資金** | payment、withdrawal、transfer |
| **錢包** | wallet_connect、sign_transaction |
| **下單 / 撤單** | buy_order、sell_order、cancel_trade |
| **賬號** | create_account、delete_account、change_permissions |
| **OAuth / API key / proxy** | generate_api_key、set_oauth_token、configure_proxy |
| **生產服務** | prod_deployment、db_migration、backup_restore |
| **部署** | deploy_to_main、update_production |
| **排程 / 守護進程** | create_scheduler、start_daemon、modify_cron |
| **破壞性清理** | delete_files、drop_database、purge_cache |

---

## Boundary 四分類與開工確認

### 四類邊界

| 邊界類型 | 定義 | 開工前確認清單 |
|---------|------|-----------|
| **repo_bound** | 需要改某個 repo、worktree、代碼、測試或 PR | ✓ 目標 repo 確認<br/>✓ 分支明確（main / feature / hotfix）<br/>✓ dirty state 檢查<br/>✓ 測試方式已定 |
| **artifact_bound** | 需要寫文章、草稿、報告、預覽、配圖、錄屏或 source note | ✓ 產物路徑已明確<br/>✓ 讀者/使用場景已知<br/>✓ 公開邊界已劃分<br/>✓ 驗收標準已定 |
| **system_bound** | 需要改 routing、automation、agent workflow 或長期狀態 | ⚠️ 謹慎：可能影響後續所有任務<br/>✓ 變更範圍已評估<br/>✓ 回滾方案已備<br/>✓ 依賴方已通知 |
| **decision_bound** | 需要做判斷、風險評估、是否推進、是否發佈、是否交易 | ✓ AI 可給判斷、證據、選項和推薦<br/>✗ 不應伪裝人的決策為「已執行」 |

### 邊界錯位的災難場景

很多斷片不是能力問題，而是邊界問題。任務一開始沒分清，後面就會出現：
- 內容任務跑去改代碼
- 判斷任務變成執行
- 草稿任務被誤發
- demo outline 被當成真實錄屏

---

## Callable Resource 構想

不一定要做成模板包。多 AI 協作裡真正重複的動作，是 agent 接到模糊請求以後，先把它結構化。

更自然的形態是一套可調用的資源：

```
make_task_card(request, context?) → task_card
validate_task_card(task_card) → missing_fields / risk_flags
route_work_request(request) → boundary / hard_gate / next_action
```

這個資源不應該替人發佈、部署、交易、創建賬號或處理凭證。它只做一件事：**把工作結構化，並把該停下來的地方標出來。**

---

## 最小起步：三件事

如果你也在同時用多個 AI 做事，先不要急著搭複雜系統。可以先試最小版本：

1. **每個可交接任務寫一張 task card**
2. **每次完成後必須有 artifact**
3. **每次結束必須寫回 next_action 和 remaining_gate**

這三點已經能解決很多問題。因為下一次你換模型、換窗口、換工具時，它不再需要靠猜。它能看到目標、邊界、產物、驗收和下一步。

```
聊天繼續負責推進。
狀態留在任務卡裡。
完成靠產物證明。
接續靠寫回發生。
```

---

## 付費區內容清單

原文在 Leo Insider 訂閱區有進階內容（$5/月），包括：

- **開工驗收表**：怎麼才算完成、用什麼驗證、最多試幾輪
- **失敗台賬寫法**：不做、不發、失敗怎麼留下復用價值
- **錯誤分流表**：什麼一次小錯不進全局規則
- **收口回執骨架**：小任務結束時留下產物、驗證、下一步
- **hard gate 別名對照表**：不同模型各自的停法對照

📚 訂閱連結：https://x.com/runes_leo/creator-subscriptions/subscribe

適合正在用 Claude / Codex / Cursor 真接力、不想只靠聊天記錄硬扛的人。

---

## 常見斷片場景與防護

### 場景 1：「繼續推進文章」

**斷片現象**：
- AI 直接開始寫正文
- 忽略了前面的限制條件（只能草稿、demo 要合成素材、結尾不能是廣告）
- 產出看起來能用，但全是坑

**防護方式**：
- 使用任務卡明確 boundary（artifact_bound）
- 列出所有 hard_gate（public_publish、demo_recording）
- 驗收標準清晰（已脱敏、無私密路徑、無發佈動作）

### 場景 2：「看看這個需求」

**斷片現象**：
- 不知道是 decision_bound（判斷）還是 execution_bound（執行）
- AI 可能直接改代碼而不是先評估可行性
- 或反過來，只給判斷不做實現

**防護方式**：
- 任務卡開工前明確 boundary 類型
- decision_bound 時不允許偷偷執行
- 如需執行，轉為新的任務卡

### 場景 3：「部署到生產」

**斷片現象**：
- AI 沒認識到這是 hard_gate
- 悄悄執行了破壞性操作
- 沒有回滾點，沒有人類確認

**防護方式**：
- hard_gate 清單裡明確列出 deploy_to_main
- AI 停止並給出部署清單
- 只有人類確認後才執行下一步

---

## 關鍵洞察小結

1. **時間線 ≠ 狀態機**：聊天記錄是時間序列，不能作為狀態庫
2. **狀態必須結構化**：任務卡就是這個結構化容器
3. **產物是終極證明**：「完成」必須有檢查點
4. **邊界要前置**：先分清是什麼類型的任務，再決定怎麼做
5. **安全閥要明確**：hard gate 不是限制，是給 AI 和人都設的安全邊界
6. **寫回是接力關鍵**：不是說「好了」就結束，要寫清變化、驗證、剩餘關卡、下一步

---

## 反向連結

- [[7-Agent 工廠工作流 SOP]]
- [[Claude 工具全覽（2026）]]
- [[Claude 環境說明]]

