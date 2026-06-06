---
type: guide
tags: [QA, bug, workflow, obsidian]
---

# Bug 記錄流程

## 一次性設定（已完成）

- [x] 啟用核心外掛「資料庫（Bases）」：設定 → 核心外掛程式 → Bases → 開啟
- [x] 啟用核心外掛「範本」：設定 → 核心外掛程式 → 範本 → 開啟
  - 範本資料夾設為 `Templates`
- [x] 模板已建立：`Templates/bug-report.md`

---

## 每次記錄 Bug 的步驟

1. 在 `wiki/QA/Bugs/` 新建筆記，命名為 Bug 標題
2. `Ctrl+P` → 輸入「插入範本」→ 選 `bug-report`
3. 填寫以下欄位：

| 欄位 | 說明 |
|------|------|
| `severity` | P0（緊急）/ P1（高）/ P2（一般） |
| `status` | `open` / `in-progress` / `fixed` / `closed` |
| `component` | 受影響的功能模組 |
| `reported_date` | 發現日期 |
| `fixed_date` | 修復後填入 |

4. 填完 Bug 描述、重現步驟、預期/實際結果
5. P0/P1 → 同步建立 GitHub Issue

---

## SLA

| 等級 | 標準 | 期限 |
|------|------|------|
| P0 | 核心功能無法使用 | 同一工作日修復並驗證 |
| P1 | 重要功能異常 | 下次工作階段 |
| P2 | 次要問題 | Backlog 排期 |

---

## Bases 資料庫視圖（選用）

建立 `wiki/QA/bugs.base`，設定過濾條件 `type = bug`，即可看到所有 Bug 的表格視圖，支援按 severity / status 排序。
