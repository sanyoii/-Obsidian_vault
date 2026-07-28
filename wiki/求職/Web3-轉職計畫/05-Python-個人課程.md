---
tags:
  - 求職/Web3
  - Learning/Python
created: 2026-07-28
status: active
---

# 05 — Python 個人課程（從零生產力養成）

> 附屬於轉職計畫（[[02-35天執行計畫]]），但獨立運作。
> 目標只有一個：**coding screen 現場不需要任何 AI 輔助。**

---

## 診斷：你缺的不是 Python，是「從零生產」

12 年 QA、履歷上有 Python、改別人的程式沒問題——語法和概念都在。
卡住的是兩件事：

1. **空白頁凍結**：沒有既有程式當扶手，不知道第一行寫什麼。
2. **壓力下提取失敗**：知識在，但面試計時器一開就撈不出來。

這兩個都不是「上課」能解的——課程是輸入，你缺的是**輸出訓練**。
所以這份課程沒有影片、沒有教材閱讀，**每一分鐘都在空白檔案裡打字**。

---

## 核心武器：開場儀式（治空白頁凍結）

每一題、每一次，一模一樣的四步。練到變反射動作：

```
① 把題目改寫成 I/O 契約（一行註解）
   # input: log 檔路徑 → output: {suite_name: fail_count}
② 寫函式簽名 + 一行 docstring
   def count_fails(log_path: str) -> dict:
③ 先寫測試（你是 QA——這是你的主場優勢）
   assert count_fails("sample.log") == {"auth": 3, "payment": 1}
④ 先寫暴力解，能跑再變漂亮
```

**寫完 ③ 的瞬間，空白頁就消失了**——你面對的不再是「從零開始」，
而是「讓這個 assert 過」。這是你做了 12 年的事。

面試時同樣四步照走，邊寫邊唸出來——這在面試官眼裡是加分（結構化思考），
對你是防凍結的欄杆。

---

## AI 使用規則（戒斷條款）

| 時機 | 規則 |
|---|---|
| Drill / 模擬中 | **全程禁用 AI**（Claude、FinalRound、Copilot 全關）。可查官方文件（Stage 3 起連文件也關） |
| Drill 做完後 | 把程式碼丟給 Claude review：「更 pythonic 的寫法？我漏了什麼 edge case？」→ 讀完**把 AI 版本關掉，自己重打一次** |
| 卡死 >15 分鐘 | 看提示（問 AI「只給方向不給程式碼」），記入錯誤日誌，兩天後重做原題 |

> 重打一次是關鍵。看懂 AI 的答案＝閱讀能力（你已經有）；關掉重打＝生產能力（你要練的）。

---

## 四階段課表（對齊轉職時程，不搶 Week 2–3 的時間）

| 階段 | 期間 | 每天 | 內容 |
|---|---|---|---|
| **S1 肌肉記憶** | 現在 → Week 2 結束 | 30–45 min | 20 個核心 pattern，每天 1–2 題冷啟動 drill |
| **S2 從零小專案** | ＝Week 3（同一件事） | 併入作品時數 | 主作品的每個模組都從空白檔開始寫，四步儀式開場 |
| **S3 面試模擬** | ＝Week 4–5 | 30–45 min | 計時 25 min、英文唸出聲、禁文件禁 AI |
| **S4 維持** | M2 之後 | 每週 3 題 | 錯誤日誌重做 + 新題保鮮 |

**S2 就是 Week 3**——不另外排時間。作品的 log parser、對帳 diff、狀態機
驗證器，每一個都是「從零寫」的練習題，寫完還變成作品。一魚兩吃。

---

## S1：20 個核心 Pattern（每題都是 QA 情境）

規則：空白檔開始、15 分鐘上限、先寫 assert、跑過才算完成。
順序即優先序——前 10 個覆蓋九成 coding screen。

| # | Pattern | Drill 題目（QA 情境） |
|---|---|---|
| 1 | 讀檔逐行 + strip | 讀 test log，印出所有含 FAIL 的行 |
| 2 | split 解析 | 每行 `2026-07-28 10:31:05 [auth] FAIL timeout`，拆成四欄 |
| 3 | dict 計數（Counter） | 數每個 suite 的 FAIL 次數 |
| 4 | dict 分組（defaultdict） | 把 log 行按 suite 分組成 {suite: [行...]} |
| 5 | list comprehension 過濾 | 從交易清單濾出 amount > 10000 的 |
| 6 | sorted(key=) | 交易清單按 timestamp 排序、按金額倒排 |
| 7 | set 交集/差集 | 兩份 txid 清單：哪些只在 A、哪些兩邊都有（對帳雛形） |
| 8 | f-string / join | 把結果組成報表字串輸出 |
| 9 | datetime 解析與差值 | 算每筆交易 pending → confirmed 花了幾秒；抓出 >300s 的 |
| 10 | try/except | 解析壞掉的行不 crash，收集到 errors 清單 |
| 11 | 巢狀 dict / JSON 走訪 | 從 API response JSON 撈出所有 status != "complete" 的 transfer id |
| 12 | dataclass | 定義 Transaction(txid, amount, status)，從 CSV 建清單 |
| 13 | 寫出 CSV / JSON | 把對帳差異寫成 report.csv |
| 14 | regex 基礎 | 從自由文字 log 抽出所有 0x 開頭的 address |
| 15 | enumerate / zip | 逐行比對兩份檔案，印出第幾行不同 |
| 16 | 函式拆分 | 把 50 行的髒腳本拆成三個函式 + main |
| 17 | dict.get / setdefault | 防 KeyError 的計數與查表 |
| 18 | argparse | 給 drill 3 加上 CLI 參數（檔案路徑、--suite 過濾） |
| 19 | pytest 基礎 | 把 drill 7 的 assert 改寫成正式 pytest 測試檔 |
| 20 | generator（選修） | 大檔逐行處理不吃記憶體 |

**每日流程**：抽 1 題（前三天照順序，之後隨機）→ 四步儀式 → 15 min 內完成
→ AI review → 關掉重打 → 錯誤日誌記一行。
**S1 出關考**：隨機抽 10 題，每題 <10 min 冷寫通過自己的 assert。

---

## S3：面試模擬規則（Week 4–5）

- 25 分鐘計時、**英文邊寫邊講**、無文件無 AI——完全還原真實 screen。
- 題源：S1 的 pattern 混合變形（例：「兩份 ledger CSV，找出金額不符的 txid 並輸出報告」＝ pattern 7+12+13 合體）。
- 每週兩場，其中一場請 Claude 出題＋事後當面試官追問（「為什麼用 dict 不用 list？」「這段 O(n²) 怎麼辦？」）。
- 搭配 [[02-35天執行計畫]] Week 5 的七題技術題庫同場練。
- **S3 出關考：連續兩場模擬全程無輔助完成**——這就是「不再需要 FinalRound」的可量測定義。

## 錯誤日誌（壓力提取的解方）

`workspace/python-dojo/error-log.md`，每次卡住記一行：
`日期 | 題號 | 卡在哪（一句話）| 缺的 pattern`
**重做節奏：卡住的題 2 天後重做、7 天後再做一次。** 三次都順＝畢業。
間隔重複是把知識從「看得懂」搬到「提取得出」的唯一已驗證方法。

---

## 驗收總表

- [ ] S1 出關：隨機 10 pattern 冷寫，各 <10 min
- [ ] S2 出關：主作品至少 3 個模組是空白檔開始寫的（git 歷史可證）
- [ ] S3 出關：連續兩場 25-min 英文模擬，零輔助完成
- [ ] 終極驗收：一場**真實** coding screen 全程沒開任何輔助工具

---

## 相關筆記

- [[02-35天執行計畫]] — Week 3 作品＝S2、Week 5 面試準備＝S3
- [[01-賽道地圖與資產缺口]] — Python 13/36 市場訊號
