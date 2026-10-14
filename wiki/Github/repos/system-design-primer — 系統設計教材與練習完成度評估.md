---
source: "https://github.com/donnemartin/system-design-primer"
author: "donnemartin"
stars: "374.2K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "reference"
---

# system-design-primer — 系統設計教材與練習完成度評估

## 一句話說明

System Design Primer 是系統設計學習與面試教材，涵蓋容量、快取、資料庫、佇列、負載與取捨。適合收藏閱讀，用現有 QA Dashboard 案例練習架構說明；程式片段包含未完成練習，不能當可部署服務。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Stars / Forks | 公開 HTML 約 374.2K / 58.9K；API 限流，非精確 API 數字 |
| 主要語言／內容 | Python 練習、Markdown 教材、圖檔與 Anki |
| 授權 | LICENSE.txt 明列 CC BY 4.0；外部引用各自核對權利 |
| 固定 SHA | ae9bbd7b02d90b9866215de185217d33f39ab733 |
| HEAD 日期 | 2026-03-20，連結修正；近四週沒有 HEAD 後的新 commit |
| Issue / PR | HTML 顯示 285 / 339；精確 API 未取得 |
| Release／建立時間 | 本輪未確認 |
| 實際來源 | 139 檔，26 Python、23 Markdown、6 notebook、3 Anki deck 等 |

Subagent 唯讀研究，主代理下載固定版與檢查。[固定來源](https://github.com/donnemartin/system-design-primer/tree/ae9bbd7b02d90b9866215de185217d33f39ab733)、[授權](https://github.com/donnemartin/system-design-primer/blob/ae9bbd7b02d90b9866215de185217d33f39ab733/LICENSE.txt)。

## Repomix 深度分析

Repomix 1.18.1，XML、未 compress、--no-gitignore：60 檔、212,883 tokens、649,487 字元。3 個 .apkg 被辨識為 binary 排除；來源總數和打包數不同。掃描器沒有可疑檔案，不代表教材程式已驗。

| Top 5 | Tokens | 佔比 |
|---|---:|---:|
| README-ja.md | 36,483 | 17.1% |
| README-zh-TW.md | 32,124 | 15.1% |
| README-zh-Hans.md | 27,516 | 12.9% |
| README.md | 26,479 | 12.4% |
| solutions/system_design/mint/README-zh-Hans.md | 5,426 | 2.5% |

## 核心功能

- 架構答題四步：釐清 use cases／constraints／assumptions，再畫高層設計、拆 components，最後處理 scale 與取捨。
- 八題 system_design 解題，六個已列出的 OOP 練習；OOP 仍註記 under development。
- 繁中 README 與三副 Anki deck 可用來複習；本次沒有打開 Anki 或執行 notebook。
- Latency 經典表適合作估算起點，不能代替目前硬體、服務價格或真實測量。

[四步框架](https://github.com/donnemartin/system-design-primer/blob/ae9bbd7b02d90b9866215de185217d33f39ab733/README.md#L218)、[繁中教材](https://github.com/donnemartin/system-design-primer/blob/ae9bbd7b02d90b9866215de185217d33f39ab733/README-zh-TW.md)。

## 技術架構

```text
README 概念 -> system_design 解題 -> Python/notebook 練習
           -> 圖例 / Anki 複習
           -> optional pandoc EPUB script
```

沒有正式 server、API 或雲端 runtime。generate-epub.sh 使用 pandoc 與 /tmp 暫存，會刪自己的暫存檔；這次只讀，不執行。

### 練習完成度

web_crawler、pastebin、lru_cache 等片段有 pass。LRU 的 Node.next 初始化與 tail.query 使用也需要完成或校正，不能直接抄成產品 cache。這是教材練習狀態，沒有修上游程式。[LRU](https://github.com/donnemartin/system-design-primer/blob/ae9bbd7b02d90b9866215de185217d33f39ab733/solutions/object_oriented_design/lru_cache/lru_cache.py)、[EPUB 腳本](https://github.com/donnemartin/system-design-primer/blob/ae9bbd7b02d90b9866215de185217d33f39ab733/generate-epub.sh)。

## 社群健康度

Stars 大、翻譯與參考內容多，但不等於所有解題已完成。當前 API 限流，release、完整貢獻者與 open/close 比未確認；本次未取得足以支持整體成效的社群評測。固定教材的內容價值與程式 runtime 驗證分開看。

## 本機驗證

139 個來源檔已盤點；26 Python AST 解析通過。這不會檢查 pass 是否完成，也不驗 cache 行為。未跑 notebook、EPUB、Anki 或完整測試。證據位於工作區 work/repo-intel/system-design-primer-20261014/ 的 fixed-source.json、repomix.log、repomix.xml 與固定來源。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 教材入口與取捨框架值得保存，原教材不整庫複製 |
| Codex | 可引用問題與框架，不是可安裝 Skill／MCP |
| QA／面試 | 用 Dashboard 等真實案例解釋容量、失效與可觀測性最有用 |
| Automation | 沒有必要建立教材自動更新或安裝服務 |

## 安裝建議

**⏳ 不需要整包安裝；推薦收藏學習。** 選一個已有專案，依四步寫出需求、架構、瓶頸與取捨，再自行驗證練習程式。現在沒有新增課程或修改既有專案。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]

