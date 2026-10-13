---
source: "https://github.com/MozartofCode/travel-agent"
author: "MozartofCode"
stars: "2"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, repo-intel]
---

# MozartofCode travel-agent — CrewAI 分工範例與入口完整性評估

## 一句話說明

以 CrewAI 階層式團隊模擬旅行顧問分工：交通、飯店、活動、穿著、歷史與總報告。主要價值是角色與任務設定範例，離穩定可操作的公司工具仍有明顯距離。

## 專案概覽

2026-09-10 公開 GitHub REST API 快照，原碼固定於下列 commit；數字不混用搜尋頁快取。

| 項目 | 結果 |
|---|---|
| Repo | [MozartofCode/travel-agent](https://github.com/MozartofCode/travel-agent) |
| Stars / Forks | 2 / 0 |
| 主要語言 | Python |
| 授權 | API未辨識，固定source tree及README未查得明確授權；不作授權法律結論 |
| 建立／最後推送 UTC | 2024-11-16T22:44:54Z／2025-02-18T03:14:29Z |
| 固定 commit | [baf1bb0ab9e7a6112976ade805a4ce665f9f475f](https://github.com/MozartofCode/travel-agent/tree/baf1bb0ab9e7a6112976ade805a4ce665f9f475f) |
| Open Issues／PRs | 0／0；已將PR從open_issues_count分離 |
| 最新 Release | 無GitHub Release；不代表沒有tag |
| Archived／Fork | 是／否 |
| Topics | ai、ai-agents、crewai |
| homepage | 未設定 |

## Repomix 深度分析

以既有 Repomix 1.18.0 對固定 commit 下載的 source 打包，未壓縮，exit 0。共 11 檔、6,741 tokens、27,015 字元。打包完成不等於逐行審計；本報告深讀主要流程與風險分支。

| Top 5 檔案 | Tokens | 比例 |
|---|---:|---:|
| travel_agent/src/travel_agent/config/agents.yaml | 1,625 | 24.1% |
| travel_agent/src/travel_agent/crew.py | 1,185 | 17.6% |
| travel_agent/src/travel_agent/config/tasks.yaml | 1,159 | 17.2% |
| README.md | 682 | 10.1% |
| Report.md | 513 | 7.6% |

Repomix未提示可疑檔案；這不是依賴漏洞、商用授權、資料隱私或供應商安全證明。原始檔與紀錄保存於本機 `D:/Codex/一人旅遊公司/work/repo-intel/travel-seven-20260910/MozartofCode--travel-agent/`。

## 核心功能

- crew.py 定義12個 Agent方法，其中11個專業角色與1個 reporter manager。
- 多數角色使用相同 SerperDevTool 搜尋工具，而非各自擁有交通／住宿供應商整合。
- agents.yaml／tasks.yaml 描述角色與期望輸出，總報告寫入 Report.md。
- 有 train／replay／test 的函式外殼；不能把函式名稱當作已存在測試套件。

## 技術架構

```text
起點／終點／日期 → CrewAI manager
                      ↓
             專業角色 + Serper 搜尋
                      ↓
                   Report.md
```
`Process.hierarchical` 與 GPT-3.5-Turbo manager 組成執行模型。主要來源是 crew.py 和 YAML；未查得公司需要的 revision/hash、來源期限與訂單／支付分離。

## 主要發現與採用限制

1. **console entry point 指向不存在的 run。** travel_agent 與 run_crew 都指定 travel_agent.main:run，但 main.py 實際定義為 run_crew、train、replay、test。固定原碼與 AST 名稱核對確認缺 run；沒有安裝套件，所以未宣稱重現實際 CLI 堆疊。 [travel_agent/pyproject.toml:13](https://github.com/MozartofCode/travel-agent/blob/baf1bb0ab9e7a6112976ade805a4ce665f9f475f/travel_agent/pyproject.toml#L13)

2. **入口 import 與封裝路徑待修。** main.py 使用 travel_agent.src.travel_agent.crew，與宣告的 travel_agent.main 套件入口不一致。須先按實際 build layout 驗證；本次未安裝因此列為相容性風險，不另假定特定 ImportError。 [travel_agent/src/travel_agent/main.py:3](https://github.com/MozartofCode/travel-agent/blob/baf1bb0ab9e7a6112976ade805a4ce665f9f475f/travel_agent/src/travel_agent/main.py#L3)

3. **框架設定沒有端到端能力證據。** 總報告使用 subtasks／action 組裝並交給 manager；是否符合宣告版本 CrewAI 的預期語義需以隔離執行確認。本次只確認原碼設定，不把它判成已運作的多Agent系統。 [travel_agent/src/travel_agent/crew.py:150](https://github.com/MozartofCode/travel-agent/blob/baf1bb0ab9e7a6112976ade805a4ce665f9f475f/travel_agent/src/travel_agent/crew.py#L150)

## 社群健康度

貢獻者端點：MozartofCode（API contributions 29）。近四週 commit_activity回空物件，列Unknown，不記0。所有7個repo均少於1,000 Stars，依skill條件未啟動社群口碑／YouTube搜尋，不能推論沒有外部使用者。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 保留早期多角色旅行 Agent 的概念樣本 |
| Codex | 現有16角色方法庫已涵蓋分工，沒有理由再疊12角色 |
| Automation | archived與入口缺漏使維護成本大於可見新增價值 |
| 公司新增價值 | 沒有足夠值得直接接線的新增能力 |

對照基準為本次實際讀取的一人旅遊公司 README、HUB、travel-dispatch v5與 docs/geo-integration.md；公司已有正式trip.json、逐段地理契約與三個展示預覽。本輪不採用舊測試數字當現況驗收。

## 安裝建議

❌ **不安裝。repo 已 archived，未找到明確授權文件，且宣告的 console entry point 與實際函式不符；多角色數量沒有帶來本公司尚缺的可驗證能力。**

## 驗證與限制

5份 Python AST語法解析完成，console入口符號缺失已核對。沒有套件安裝、CrewAI執行、Serper查詢、GPT呼叫或真Report生成。GitHub API archived=true；未拿最後推送時間推論作者未來意圖。

共同工具限制：gh CLI因既有設定檔Access denied未取得資料，改用公開REST API；CodeGraph沒有本session可用project，採原碼與Python AST解析，未宣稱CodeGraph結果。未安裝上游、未改正式旅程、未提交或推送、未發布。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|七案比較與採用順序]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|公司架構]]
- [[AI-一人公司/_index|AI-一人公司索引]]
- [[Github/_index|Github分析總索引]]
