---
title: "PartyPiuPiu — 06-執行與缺陷紀錄格式"
type: test-document
version: "1.0"
status: prepared-not-executed
created: 2026-09-17
updated: 2026-09-17
tags: [QA, 一人軟體測試公司, PartyPiuPiu]
---

# 06-執行與缺陷紀錄格式

文件版本：test-docs-v1.0｜依據：已核准企劃v0.2｜2026-09-17

> 本文件已編製，不代表產品測試通過。實際結果僅寫入原案件case.json並連到Run證據。

## 紀錄位置與命名

正式狀態唯一來源為case.json；Run只能追加。建議Run ID為 `RUN-日期-TC-ID-序號`，證據存案件內 `evidence/<run-id>/`。這是命名規則，現在不建立假Run或空證據。檔案使用相對路徑、非空內容與SHA-256，禁止跳出案件根。含真實身份或秘密的資料先遮蔽；原始未遮蔽內容的存放與保存期限仍需確認。

## Run必填內容

| 欄位 | 填寫方式 |
| --- | --- |
| id、case_id、retest_of | 唯一Run ID、實際詳細TC ID；第一次retest_of為null，重測指向原Run |
| version、environment | case中的版本/環境基準，加actual中的實際build、OS/瀏覽器/裝置；產品版本未知時不假裝企劃版即產品版 |
| started_at、actor、method | 含時區ISO8601時間；主模型、真人或工具實際身份；實際執行方式 |
| result | Pass / Fail / Blocked / Skipped / Not Run；只能按下表判定 |
| actual | 前提與資料、逐步實際結果、預期對照、提交次數、回復結果、實測版本；不是只寫「正常」 |
| artifacts | 每份原始檔的案件內相對path與sha256；Pass/Fail必須非空 |
| reason、cause | 結果原因；cause為product/test/environment/data/unknown/none，不由Fail直接推斷product |
| definition_snapshot | 保存當次case完整物件及requirement_ids對應需求物件；不可只連到之後會變的檔案 |
| definition_sha256 | snapshot用UTF-8、ensure_ascii=False、sort_keys=True、separators=(逗號,冒號)序列化後計SHA-256，沿用驗證器的canonical函式 |

每個裝置、資料邊界或修正版分開Run，即使case_id相同。結果不可用重測Pass覆蓋初次Fail。版本、環境、案例或oracle改變後，舊Run保留並判斷待重驗。未開始時維持runs=[]，由coverage顯示Not Run，不預塞假時間的紀錄。

## 結果判定

| 結果 | 可以使用的條件 |
| --- | --- |
| Pass | 已確認oracle；已執行且符合；版本/資料/環境一致；完整原始證據 |
| Fail | 已確認oracle；觀察明確不符合；有證據；先分辨產品/測試/環境原因 |
| Blocked | 原本安排執行，必要規格、授權、環境或回復前提缺少；記阻塞與解除人 |
| Skipped | 經取捨刻意未跑，記原因與決定來源；不得從覆蓋分母移除 |
| Not Run | 尚未執行；不是沒有缺陷、也不是通過 |

## 缺陷紀錄格式

只有實際Run及可支持的預期來源齊備才建立產品缺陷。case.json必填id、case_id、run_id、expected_source、actual、impact、status、external_ref；external_ref沒有外部tracker就填空字串，不假造連結。

完整缺陷正文保存：標題、S1–S4嚴重度及理由、處理優先序、版本/環境、前置資料與活動代稱、最少重現步驟、預期與來源、實際結果、重現次數、證據指標、首次時間、範圍/影響、可行繞法、回復狀態、修復版本和重測Run。嚴重度描述實際影響，P0案例不自動等於S1缺陷。

- S1：活動阻斷、跨活動外洩或重大資料損害；立即停止受影響操作，交事故窗口。
- S2：主要流程失效或大量支援裝置無法參與；優先修復。
- S3：局部問題、有可行繞法；依頻率與影響排序。
- S4：不阻擋使用的輕微呈現或文字問題。

建議狀態順序為待確認→已確認→待修復→待重測→已修復；不通過則重開。只有觀察而未確認oracle時記「待確認觀察」，不寫入正式產品缺陷。對外送出另按授權，不自行建立GitHub issue或寄信。

## 重測與交付摘要

收到修正版後先核對版本、有效規則、影響範圍與剩餘額度；原案例重測和必要鄰近回歸分開記，retest_of連回原Run。未確認版本不沿用舊Pass；同問題最多一次有依據重試，沒有新線索即停。

交付摘要列：本次版本、scope、總案例數、當前有效Pass/Fail及Blocked/Skipped/Not Run、S1/S2未解缺陷、真人/真機/後端未驗範圍、配額和投入、回復/殘留、建議與客戶決定。分母保留暫緩案例；可另列本輪排程子集，但不能拿子集通過率冒充全案覆蓋。

## 本機結構檢查

```bash
py -3 -X utf8 scripts/validate.py 專案/partypiupiu/case.json
```

exit 0只證明格式與本地證據結構；未測警告必須保留。正式驗收可用`--require-current`拒絕未測/過期結果，目前預期不通過，不能刪警告或虛造Run來讓它變綠。結構驗證不證明產品正確、真人核准或上線授權。

## 反向連結

- [[一人軟體測試公司/_index]]
- [[一人軟體測試公司/PartyPiuPiu — 委託測試企劃]]
- [[一人軟體測試公司/PartyPiuPiu — 00-測試文件入口]]
