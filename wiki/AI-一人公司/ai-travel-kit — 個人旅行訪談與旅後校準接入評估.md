---
source: "https://github.com/drpwchen/ai-travel-kit"
author: "drpwchen"
stars: "19"
clipped: 2026-10-12
tags: [github/repo, ai-company, travel, repo-intel]
---

# ai-travel-kit — 個人旅行訪談與旅後校準接入評估

## 一句話說明

值得局部採用個人化訪談與旅後校準，不整包接入。它主要是給 AI 閱讀的 Markdown 方法包；公司的正式旅程、來源查核、授權與 Migo 交付流程繼續作為權威入口。本輪僅研究與 Wiki 存檔，未修改公司方法或正式旅程。

## 專案概覽

2026-10-12 公開 GitHub REST API 快照。原文固定於 commit `c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab`，不混用 GitHub 網頁快取的星數。

| 項目 | 結果 |
|---|---|
| Repo | [drpwchen/ai-travel-kit](https://github.com/drpwchen/ai-travel-kit) |
| Stars / Forks | 19 / 4 |
| 主要語言 | API 標 Python；實際檔案以 Markdown 為主 |
| 授權 | CC-BY-4.0；取用時保留作者、來源、授權及修改說明 |
| 建立／最後推送 UTC | 2026-10-10T03:04:41Z／2026-10-10T16:58:48Z |
| Open Issues / Archived | 0 / false |
| 固定來源 | [commit c9b9a59](https://github.com/drpwchen/ai-travel-kit/tree/c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab) |

## 核心功能

- 訪談先消化已有筆記，跳過已答項；快速六題分兩輪，附每題如何改變安排，模糊偏好用具體情境追問。
- 個人旅行總檔與單趟旅行分開；跨趟保存速度、習慣、提醒、花費基準，旅途中記錄，旅後回填。
- 按規劃、行前、旅中、旅後提供方法；同行者只交必要摘要，一份正本由維護者合併改動提案。
- 附出事、行李、時間軸、能力與行程網頁的指引。這些是方法內容，並非已連線的服務。

原文：[訪談題庫](https://github.com/drpwchen/ai-travel-kit/blob/c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab/interview.md)、[旅後流程](https://github.com/drpwchen/ai-travel-kit/blob/c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab/phases/after.md)。

## 技術架構

`START.md / AGENTS.md` 負責入口；`interview.md`、`phases/`、`guide/` 提供方法；`templates/` 定義 Markdown 個人總檔、這趟檔及檢討；`examples/` 為示例。固定 tree 中只有一支程式 `scripts/build_bundle.py`，它按 ORDER 合併文字為 ALL-IN-ONE.md，--check 只比對合成文件是否過期。沒有在此 tree 找到預訂 API、EXIF/GPX 分析器、排程執行器或旅行驗收測試；相關工作交給宿主 AI 或另寫程式。

程式走讀：讀 ROOT 下固定文件，預設覆寫 ALL-IN-ONE.md，沒有匯入第三方依賴或網路請求。未執行此脚本，不能聲稱上游檢查通過。

## 與現有系統的相關性評估

已讀本機 README、HUB、travel-dispatch、traveler-advisor、companion-needs、trip-assistance、librarian，以及需求／旅後知識；SCHEMA 以文字關鍵詞比對。以下是文件層的適用性判斷，沒有模型同題效能測量。

| 面向 | 增量價值與最小落點 |
|---|---|
| 需求訪談 | 公司已有硬條件／偏好分離及避免重問；增量是把出門延遲、每日步行耐受、準備習慣直接映射到安排。放 traveler-advisor 與需求知識，不每趟強制六題。 |
| 旅後校準 | 公司已有實際耗時、費用、偏好候選；增量是對照計畫與實際，按人數／地形／情境整理可用估計。放 librarian 與旅後知識，長期採用仍由本人確認。 |
| 同行摘要 | 本人的摘要優先於他人代述、只分享必要條件有參考價值；現有逐人 constraints 與單一寫入規則已有大部分能力。 |
| 正式資料 | 不另建有權威地位的 Markdown 這趟檔；維持旅程/名稱/trip.json 與 revision/hash，任何摘要只作衍生呈現。 |
| 視覺／離線 | 保留既有 original-tokyo/Migo 和驗收。上游建議不做離線版，且這趟檔不記住宿名稱地址，不能直接套到公司私人交付。 |
| 工具／帳號 | 能力存在不代表任務已授權。上游「有就直接用」的信箱及排程方法須改成公司本次範圍；不因文件開監控、建私 repo 或推送。 |

## 採用邊界與品質缺口

1. 訪談需挑題：例如長輩一律放慢的預設不能代替逐人需求，已知答案不再问。
2. baselines 的步速、出門延遲、天氣倍率是上游估計／經驗；未驗適用性，不可直接當旅行或安全事實。採用的是記錄與校準方法。
3. 照片第一／最後一張只能界定拍照區間，不足以證明實際抵達、離開或完整步行耗時；EXIF 時區與時鐘、GPX 停留／訊號缺漏必須另核。來源衝突保留，不照能力表把某來源一律視為準確。
4. 旅後「估計直接用新實測取代」改為帶日期／條件的候選；單趟不直接升成長期偏好，不自動覆蓋既有數字。
5. 複製或改寫內容保留 CC-BY-4.0 attribution 與修改说明；本輪沒有把上游入口當操作授權。

來源：[START](https://github.com/drpwchen/ai-travel-kit/blob/c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab/START.md)、[能力表](https://github.com/drpwchen/ai-travel-kit/blob/c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab/guide/capabilities.md)、[估計基準](https://github.com/drpwchen/ai-travel-kit/blob/c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab/guide/baselines.md)、[網頁方法](https://github.com/drpwchen/ai-travel-kit/blob/c9b9a59de92d804aadb5bc56d5b6a8b2bcc61fab/guide/trip-website.md)。

## 分析深度與驗證限制

已取得固定 tree、metadata，讀取入口、訪談、旅後、基準、同行合併、網頁與 bundle 原碼；其他階段與能力表作定向閱讀。Repomix 未執行：此案以小型文件包唯讀評估，不下載套件或建立來源副本；無 token 指標。沒有独立官方文件站；星數未達 Skill 社群調查門檻。未執行上游程式、模型試作、供應商查核或真人旅行驗證。公司已有髒檔全部保留，不消耗先前模型補測或視覺返工額度。

## 安裝建議

⏳ 不整包接入；推薦局部採用「問題→安排」訪談與「計畫→實際→候選」旅後校準，沿用現有角色與資料，不新增員工、連接器、背景排程、總檔系統或版型。本輪結論是方法適用性，尚未證明排程準確度或省時。

後續最小試作：在原有兩個角色方法及相應知識中補入規則，用同一合成案例檢查已知條件不重問、出門延遲落入排程、來源矛盾保留、偏好變更需確認、正式 trip 不分岔。涉及新模型補測另按額度授權，不沿用已耗尽的歷史次數。

## 2026-10-12 採用進度更新

使用者後續明確授權最小接入，已補旅客顧問、旅後整理員、行程設計師的交接及兩份既有知識；方法版 personal-calibration-20261012。前文為接入前研究快照，不覆寫其未執行紀錄。

本輪6題主模型合成走查、16角色文件引用、10項回放／保留檢查通過；6種錯誤變異均拒絕，362個既有旅程／私人／Dashboard／Migo檔案hash不變。初次URL編碼連結檢查誤判已修正，失敗與修正後結果分別保留。正式trip、schema、授權、Migo與長期確認流程不變；未另開模型批次、供應商、真人或手機驗收，實際旅遊準確度及效益未驗。

權威執行紀錄：D:/Codex/一人旅遊公司/evaluations/runs.local/20261012-personalization/README.md。此為公司方法局部接入，未安裝上游完整工具箱。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|旅行開源專案採用比較]]
- [[AI-一人公司/AtlasAgent — 全球旅行方法包與日期工具評估|AtlasAgent 評估]]
- [[AI-一人公司/_index|AI-一人公司索引]]
