---
source: "https://github.com/laramies/theHarvester"
author: "laramies"
stars: "18K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "osint"
  - "domain-discovery"
---

# theharvester — 網域 OSINT 與查詢來源留證評估

## 一句話說明

theHarvester 收集網域、IP、ASN 相關的公開情報，並記錄來源、查詢結果與失敗原因。固定版已有 CLI、REST API、HarvestView 和已存報告分析；若有授權的網域資產盤點需求，值得優先試用。目前建議 ⏳ 先收藏、不安裝。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Repository | laramies/theHarvester |
| Stars / Forks | 17,954 / 2,664 |
| 主要語言 | Python |
| 授權 | GitHub GPL-2.0；pyproject.toml 明定 GPL-2.0-only |
| 建立時間 | 2011-01-01 20:40:15 UTC |
| Repo pushed_at | 2026-10-14 05:13:58 UTC |
| 固定 SHA | `49a38f8d33c32336bbf6a111ea723ea223116265`，master |
| master tip 日期 | 2026-10-02 02:48:14 UTC |
| 穩定 Release | 4.11.1，2026-06-03 |
| 固定來源版本 | 5.0.0，Python >=3.14；不能等同穩定 4.11.1 |
| Open Issue / PR | 3 / 5，repo API 合計 8 |
| Homepage / Archived | http://www.edge-security.com/ ／ false |

Subagent 唯讀研究，主代理下載同 SHA、完成 Repomix 與離線檢查。docs/architecture.md 仍稱 development line 在 dev，但本次來源是 master；保留此文件差異。[固定來源](https://github.com/laramies/theHarvester/tree/49a38f8d33c32336bbf6a111ea723ea223116265)、[套件契約](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/pyproject.toml)、[Release](https://github.com/laramies/theHarvester/releases/tag/4.11.1)。

## Repomix 深度分析

| 指標 | 本次結果 |
|---|---|
| 工具 | Repomix 1.18.1，既有 task-local CLI |
| 打包檔案 | 311 |
| 總 Tokens / 字元 | 805,442 / 3,529,541 |
| 模式 | XML，未使用 --compress，使用 --no-gitignore |
| 安全掃描 | 未偵測可疑檔案；不是安全或 runtime 驗收 |

| 最大 token 檔案 Top 5 | Tokens | 佔比 |
|---|---:|---:|
| tests/test_main.py | 41,438 | 5.1% |
| tests/e2e/test_harvestview.py | 23,127 | 2.9% |
| theHarvester/__main__.py | 19,833 | 2.5% |
| tests/lib/test_api_v1.py | 19,387 | 2.4% |
| theHarvester/lib/api/static/harvestview/app.js | 18,502 | 2.3% |

檔案存在不代表測試通過；核心另讀 catalog、runner、API auth、hostnames 與 transport。

## 核心功能

- **網域資產發現**：有限目標的網域、IP、ASN 枚舉；用途和 username 帳號搜尋不同。
- **來源選取**：60 個 canonical specs，P0 Passive 55、P1 DNS 4、P2 Direct 1。`all` 只選 P0；明確來源或 capability 可含 P1／P2，工具也有 DNS、screenshot、vhost 等直接行為。
- **失敗留證**：runner 區分 failed、partial、no-results；缺 credential 為 skipped/missing-credentials。缺 key 不應寫成目標沒有資料。
- **結果保存**：JSONL 含 summary／finding 與 provenance，SQLite 保存完整 terminal evidence；相容 JSON／XML 不含全部結構化證據。
- **服務與已存分析**：FastAPI、HarvestView、durable run queue 與排程設計；harvest-report 分析已保存 run，可避免重啟 discovery。這些沒有在本機啟動。

[來源 catalog](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/theHarvester/lib/source_catalog.py)、[runner](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/theHarvester/lib/source_runner.py)、[結果文件](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/docs/wiki/Results-and-Local-Data.md)。

## 技術架構

```text
CLI / REST API / localhost HarvestView
    -> target normalization + source selection
    -> central runner -> provider / DNS / direct action
    -> observations + outcome + provenance
    -> SQLite / JSONL / compatible JSON, XML
    -> harvest-report / saved-run UI
```

| 部分 | 技術 |
|---|---|
| 入口 | theHarvester、harvestview、harvest-report |
| 來源契約 | source_catalog.py、source_execution.py、source_runner.py |
| 網路 | aiohttp、aiodns、proxy、certifi、Playwright |
| 儲存與服務 | aiosqlite／SQLAlchemy、FastAPI／uvicorn、static UI |
| 平台宣告 | Windows winloop、其他平台 uvloop；未驗 Windows runtime |

### 範圍、API 與資料品質

hostnames.py 接受精確 target 或子域，沒有自動去掉 www；`evil-example.com` 不納入 `example.com`。原始函式已離線驗證，但不能據此證明目標授權。source report 要求狀態與非空 stop_reason；來源數量也不等於獨立佐證或準確率。[範圍](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/theHarvester/lib/hostnames.py)、[report 契約](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/theHarvester/lib/source_execution.py)。

API operator key 由環境或 _FILE 讀取：缺 key 回 503、錯 key 回 401；browser cookie 的寫入操作核對 Origin。HarvestView 預設 127.0.0.1:5000，頁面要求 local client 與 loopback Host，有明示 Docker opt-in 例外。衍生 cookie 是 HttpOnly、SameSiteStrict，不直接把 operator key 給 JS。這是程式控制，未做 runtime 安全測試。[API auth](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/theHarvester/lib/api/auth.py)、[UI 限制](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/theHarvester/lib/api/harvestview.py)。

Provider keys 與 operator key 用途不同。core 缺配置時會在 home 建預設檔案並設 chmod；未驗 Windows ACL，這次未 import app。Transport 預設 verify=True 與 certifi，但可覆寫；本輪未找到實際 verify=False／ssl=False 呼叫，不當作完整 TLS 稽核。HarvestView 啟動處也沒有直接設定 server TLS。[配置](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/docs/wiki/Configuration-and-API-Keys.md)、[core](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/theHarvester/lib/core.py)。

## 社群健康度與文件

分支 tip 在 2026-10-02；近期 release 4.11.1／4.11.0／4.10.1／4.10.0 在 6/3、5/23、2/22、1/18 發布。主要貢獻者 L1ghtn1ng 1,881、NotoriousRebel 902、laramies 160；機器帳號不算真人人力。

固定 SHA 查到的前六筆 Actions 是 Dependabot 與 Scorecard success，功能 CI 結果未確認。workflow 有 Ubuntu／Python3.14、pytest 與 ty，未重跑全套。[CI 定義](https://github.com/laramies/theHarvester/blob/49a38f8d33c32336bbf6a111ea723ea223116265/.github/workflows/theHarvester.yml)、[Scorecard run](https://github.com/laramies/theHarvester/actions/runs/38364626634)。

官網 defuddle 取得品牌演進與安全服務內容，使用契約依 repo docs/wiki。社群歷史有來源移除與深度限制的討論，不能證明目前 5.0.0 成功率。[來源變動](https://www.reddit.com/r/OSINT/comments/13dx96o)、[工具比較](https://www.reddit.com/r/OSINT/comments/16nw2bs)。

## 本機驗證

| 檢查 | 結果與邊界 |
|---|---|
| Python AST syntax | 234 檔成功解析，未 import app |
| 原始 hostname 函式 | AST 抽取兩函式，只用 stdlib ipaddress，無網路 |
| 六個 fixture | 正規化、合法子域、相似字尾、www 母域、IP、invalid label 均符合預期 |
| 未驗 | 安裝、provider API、掃描、REST／UI、queue、排程、匯出、Windows runtime |

task-local 證據在 `work/repo-intel/theharvester-20261014/`：metadata.json、theharvester.xml、repomix.log、ci.json、offline_probe.py、offline-results.json。沒有輸入真人或外部目標，也沒有讀密鑰。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 收藏比較，參考 failed／partial／no-results 與 provenance |
| Codex | Python 工具與 API，未接入 Skill／MCP |
| QA | 留證方法有價值；不能替代功能驗收或弱點確認 |
| Automation | 不新增服務、背景查詢或密鑰設定 |

比停滯的 SpiderFoot 更值得優先做授權網域盤點試用；SpiderFoot 強在事件連鎖與關聯，Maigret 集中帳號搜尋。沒有做準確率 benchmark。

## 安裝建議

**⏳ 收藏，列為未來授權網域盤點候選；目前不安裝。** 試用前明確選 4.11.1 或固定 5.0.0 開發源，核對 Python、keys／配額、範圍與 P0／P1／P2，再用隔離環境驗證。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/spiderfoot — OSINT事件框架與攻擊面盤點評估|SpiderFoot 評估]]
- [[Github/repos/maigret — 使用者名稱OSINT與遞迴調查評估|Maigret 評估]]
