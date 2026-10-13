---
source: "https://github.com/geekjourneyx/travel-guidebook"
author: "geekjourneyx"
stars: "85"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, repo-intel]
---

# travel-guidebook — 旅遊公司閱讀與列印交付評估

## 一句話說明

以研究、每日章節、實用附錄與 A4 PDF 為主的輕量路書 Skill。最有價值的是讀者如何迅速找到今天的資訊，以及行前閱讀與列印的版面；它不是可行性求解器，也沒有完整的自動旅程驗證器。

## 專案概覽

2026-09-10 公開 GitHub REST API 快照，原碼固定於下列 commit；數字不混用搜尋頁快取。

| 項目 | 結果 |
|---|---|
| Repo | [geekjourneyx/travel-guidebook](https://github.com/geekjourneyx/travel-guidebook) |
| Stars / Forks | 85 / 7 |
| 主要語言 | JavaScript |
| 授權 | MIT |
| 建立／最後推送 UTC | 2026-04-18T15:32:03Z／2026-04-19T09:33:48Z |
| 固定 commit | [e8ae3fe82eac448751b957cf84f42fb069de645c](https://github.com/geekjourneyx/travel-guidebook/tree/e8ae3fe82eac448751b957cf84f42fb069de645c) |
| Open Issues／PRs | 0／1；已將PR從open_issues_count分離 |
| 最新 Release | 無GitHub Release；不代表沒有tag |
| Archived／Fork | 否／否 |
| Topics | agent-skills、ai-agents、claude-skills、html-to-pdf、openclaw-skills、playwright、skills、travel-guidebook、travel-planner |
| homepage | 未設定 |

## Repomix 深度分析

以既有 Repomix 1.18.0 對固定 commit 下載的 source 打包，未壓縮，exit 0。共 8 檔、24,363 tokens、57,640 字元。打包完成不等於逐行審計；本報告深讀主要流程與風險分支。

| Top 5 檔案 | Tokens | 比例 |
|---|---:|---:|
| SKILL.md | 8,334 | 34.2% |
| references/chapter-templates.md | 4,933 | 20.2% |
| references/layout-css.md | 3,484 | 14.3% |
| README.md | 2,176 | 8.9% |
| references/report-template.md | 781 | 3.2% |

Repomix未提示可疑檔案；這不是依賴漏洞、商用授權、資料隱私或供應商安全證明。原始檔與紀錄保存於本機 `D:/Codex/一人旅遊公司/work/repo-intel/travel-seven-20260910/geekjourneyx--travel-guidebook/`。

## 核心功能

- 從需求、研究、路線架構、HTML 到 PDF 的六階段方法。
- 地點與時間先可掃讀，再補推薦理由與文化背景，兼顧快速查找及深入閱讀。
- 每日章節、行前準備、目的地深度與附錄的 HTML 結構，另有 A4 分頁 CSS。
- `html2pdf.mjs` 以 Playwright／Chromium 印出背景與頁碼；地理資料可選高德 MCP。

## 技術架構

```text
需求 → 研究 → 路線架構
                 ↓
       chapter templates + CSS
                 ↓
               HTML
                 ↓
       html2pdf.mjs → A4 PDF
```
主要是 Markdown 方法與 CSS／HTML 範例，執行腳本只有簡短 PDF 匯出器。沒有結構化 trip schema 或本機資料庫。

## 主要發現與採用限制

1. **外部依賴與離線宣告不一致。** 版面仍載入 Google Fonts 與 Tabler Icons CDN，其中圖示採 latest。HTML 單檔不等於全部資源離線；固定版本 PR #1 正在提系統字型與 CSS 圖示改良，尚未合併到所分析的 main。 [references/layout-css.md:20](https://github.com/geekjourneyx/travel-guidebook/blob/e8ae3fe82eac448751b957cf84f42fb069de645c/references/layout-css.md#L20)

2. **PDF 輸出有環境與驗收缺口。** file URL 直接拼接 resolve 後的路徑；Windows 含特殊字元路徑需以標準 file URI 做測試。腳本等待 networkidle 加固定2秒後匯出，未檢查每頁溢出、中文字形、來源到期或輸出內容。檔案產生不能當品質通過。 [scripts/html2pdf.mjs:26](https://github.com/geekjourneyx/travel-guidebook/blob/e8ae3fe82eac448751b957cf84f42fb069de645c/scripts/html2pdf.mjs#L26)

3. **地理工具不可用時會退回模型估算。** 方法允許距離、交通等資訊降為 LLM 估算。公司可以保留帶明確標記的草案，但不能讓估算替代來源、逐段交通與可行性檢查。 [SKILL.md:71](https://github.com/geekjourneyx/travel-guidebook/blob/e8ae3fe82eac448751b957cf84f42fb069de645c/SKILL.md#L71)

4. **研究編排與固定門檻需要改寫。** 上游預設多路 agent 並行、字節與文件大小檢查，另含固定距離與特殊目的地限制。這些是作者啟發式方法，並未在本次證明適用不同旅客與交通模式；不取代公司有界派工與每位旅客硬條件。 [SKILL.md:129](https://github.com/geekjourneyx/travel-guidebook/blob/e8ae3fe82eac448751b957cf84f42fb069de645c/SKILL.md#L129)

## 社群健康度

貢獻者端點：geekjourneyx（API contributions 8）。近四週 commit_activity回空物件，列Unknown，不記0。所有7個repo均少於1,000 Stars，依skill條件未啟動社群口碑／YouTube搜尋，不能推論沒有外部使用者。本repo有1個open PR；未合併提案不當成main既有能力。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 適合作為閱讀結構與列印設計參考 |
| Codex | 沿用主模型規劃，不載入另一套廣泛觸發與自動環境安裝流程 |
| Automation | 由現有 renderer 產 HTML，再以既有可用 PDF 工具驗收；不因研究自動裝 Playwright |
| 公司新增價值 | 最貼近現有 A 旅行手冊的閱讀／列印缺口；先驗一日，再展開整趟 |

對照基準為本次實際讀取的一人旅遊公司 README、HUB、travel-dispatch v5與 docs/geo-integration.md；公司已有正式trip.json、逐段地理契約與三個展示預覽。本輪不採用舊測試數字當現況驗收。

## 安裝建議

⏳ **本輪最優先參考其閱讀層級與列印結構；暫不整包安裝。以現有資料與 renderer 作小範圍改寫，比導入另一套研究／派工流程更符合公司。**

## 驗證與限制

Repomix與 PDF腳本／CSS／方法走讀完成。未執行 Playwright、未產出本 repo 的 PDF、未量測頁數或列印品質。不存在上游 package.json／lockfile／專用測試套件的固定樹證據；不可把簡短腳本視為已驗收產品。

共同工具限制：gh CLI因既有設定檔Access denied未取得資料，改用公開REST API；CodeGraph沒有本session可用project，採原碼與Python AST解析，未宣稱CodeGraph結果。未安裝上游、未改正式旅程、未提交或推送、未發布。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|七案比較與採用順序]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|公司架構]]
- [[AI-一人公司/_index|AI-一人公司索引]]
- [[Github/_index|Github分析總索引]]

