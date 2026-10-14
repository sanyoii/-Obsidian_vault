---
source: "https://github.com/smicallef/spiderfoot"
author: "smicallef"
stars: "23.5K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "osint"
  - "attack-surface"
---

# spiderfoot — OSINT 事件框架與攻擊面盤點評估

## 一句話說明

SpiderFoot 是把公開情報來源、網頁擷取與主動探測接在一起的 OSINT 框架。它能從網域、IP、email、username 等目標開始，讓模組互相傳遞事件，再產出關聯與匯出資料。功能比 Maigret 廣，但固定分支、套件相容性與目標範圍都需要先核對；目前建議 ⏳ 收藏研究，不安裝到現有公司或 QA 流程。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Repository | smicallef/spiderfoot |
| Stars / Forks | 23,479 / 3,762 |
| 主要語言 | Python |
| 授權 | MIT |
| 建立時間 | 2012-04-28 07:10:13 UTC |
| Repo pushed_at | 2026-04-13 19:43:06 UTC；不等於 master 原始碼有更新 |
| 固定 SHA | `0f815a203afebf05c98b605dba5cf0475a0ee5fd`，master |
| master tip 日期 | 2023-11-05 18:36:23 UTC |
| 最新 Release | v4.0，2022-04-07 |
| Open Issues / PRs | 297 / 45；repo API 合計 342 |
| Python 宣告 | README 3.7+；Tests workflow 只列 3.7–3.10，Ubuntu／macOS |
| Topics | osint、attacksurface、threat-intelligence、recon 等 |
| Archived | false |

研究由 subagent 負責唯讀來源調查，主代理下載同 SHA、完成 Repomix 與離線檢查後整理。分支狀態、發布日期與本機可用性分開看。[固定來源](https://github.com/smicallef/spiderfoot/tree/0f815a203afebf05c98b605dba5cf0475a0ee5fd)、[固定 commit](https://github.com/smicallef/spiderfoot/commit/0f815a203afebf05c98b605dba5cf0475a0ee5fd)、[v4.0](https://github.com/smicallef/spiderfoot/releases/tag/v4.0)。

## Repomix 深度分析

| 指標 | 本次結果 |
|---|---|
| 工具 | Repomix 1.18.1，既有 task-local CLI |
| 打包檔案 | 795 |
| 總 Tokens | 5,059,220 |
| 總字元 | 13,868,455 |
| 模式 | XML，未使用 --compress，使用 --no-gitignore |
| 安全掃描 | 未偵測可疑檔案；只代表掃描器本次結果 |

### 最大 token 檔案 Top 5

| 檔案 | Tokens | 佔比 |
|---|---:|---:|
| spiderfoot/dicts/ispell/french.dict | 3,130,115 | 61.9% |
| spiderfoot/dicts/ispell/german.dict | 422,345 | 8.3% |
| spiderfoot/dicts/ispell/english.dict | 405,755 | 8.0% |
| spiderfoot/dicts/ispell/spanish.dict | 335,450 | 6.6% |
| spiderfoot/dicts/subdomains-10000.txt | 27,951 | 0.6% |

前四份字典已佔約 84.8%，不能把 token 數當作核心程式規模。架構與邊界以 sf.py、sfscan.py、sflib.py、sfwebui.py、spiderfoot/ 與具體 modules 原始碼核對。

## 核心功能

- **多類型目標**：IP／IPv6、CIDR、domain／hostname、ASN、email、電話、姓名、username、Bitcoin address。目標類別列出 11 個 event types；型別與非空驗證不代表每種值的語意、所有權或掃描授權都驗證完成。
- **模組事件鏈**：實際有 233 個 sfp_*.py 檔，包含 storage 與 template，不能當成 233 個獨立外部資料來源。模組訂閱事件、發布新事件，其他模組接著處理。
- **關聯引擎**：correlations 有 38 個 YAML，排除 template 為 37 份規則。規則是線索整理，沒有實證可以把關聯結果當作身分或弱點確認。
- **UI 與匯出**：CherryPy Web UI、CLI、SQLite 資料庫、CSV／JSON／GEXF 匯出與視覺化。開源版與 README 介紹的 SpiderFoot HX 雲端產品功能分開，不能套用 HX 的監控與多使用者承諾。
- **第三方來源**：84 個模組 metadata 標 apikey，可能需要 API key、帳號或付費方案；其餘模組也可能依賴來源可用性、配額或外部工具。Nmap、WhatWeb 等不是本機已具備的能力。
- **主動與被動用途**：DNS、網頁、公開資料服務、port scanning、zone transfer 等都出現在專案功能裡。`passive` 是模組篩選選項，不是網路隔離或授權檢查。

以上依 [README](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/README.md)、[target.py](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/spiderfoot/target.py#L23)、[模組目錄](https://github.com/smicallef/spiderfoot/tree/0f815a203afebf05c98b605dba5cf0475a0ee5fd/modules)、[correlation 說明](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/correlations/README.md)。

## 技術架構

```text
CLI sf.py / CherryPy Web UI sfwebui.py
              |
     target + config + selected modules
              |
       scan orchestration sfscan.py
              |
    event -> subscribed modules -> new events
              |                    |
    SQLite storage              HTTP / DNS / APIs
              |
     correlation rules + graph / exports
```

| 部分 | 實作 |
|---|---|
| 基礎資料 | spiderfoot/target.py、event.py、plugin.py |
| 事件分派 | plugin.py，watchedEvents／notifyListeners 與事件 queue |
| 網路共用層 | sflib.py，requests、DNS、proxy、cache |
| 儲存 | SQLite、spiderfoot/db.py 與 storage modules |
| Web | CherryPy、Mako、靜態 UI；不是本機已啟動服務 |
| 關聯 | YAML rules，sfcorrelation.py |

### passive 模式的邊界

`sf.py:324–328` 只把 usecase 首字改大寫，再檢查 module group 有沒有該名稱。原始模組 metadata 中 Passive 199、Footprint 157、Investigate 206，標籤可重疊。這個入口沒有依流量目的地阻擋網路，也沒有核對目標授權；選 Passive 仍應逐個檢視實際模組行為。[CLI 篩選](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sf.py#L323)。

### Web UI 與 TLS

UI 預設 127.0.0.1:5001。`sf.py:497–535` 只有在本地 passwd 含有效帳密時才啟用 Digest；未設定時登入保護關閉。`sf.py:540–556` 需要本地 key 與 certificate 才啟用 HTTPS。把服務綁到外部介面前必須另外處理存取與 TLS，本次沒有改設定或啟動服務。[UI 啟動實作](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sf.py#L497)。

對外請求的 `sflib.py:1191–1203` fetchUrl 預設 verify=True，但 `modules/sfp_accounts.py:127` 明確傳 verify=False。因此只能說共用方法預設驗證，不能宣稱所有模組都驗證 TLS。[共用 fetchUrl](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sflib.py#L1191)、[帳號模組](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/modules/sfp_accounts.py#L121)。

帳號模組還會從 WhatsMyName main 下載網站清單，快取 48 小時。固定 SpiderFoot SHA 不會連帶固定執行當下的帳號清單；候選結果仍需保存來源版本及人工核對。[清單載入](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/modules/sfp_accounts.py#L79)。

設定可匯入／匯出 API keys；sfwebui.py:1006–1031 的 optsexport 過濾規則沒有排除一般 api_key 欄位。匯出的設定可能含密鑰，不應直接收藏到 Wiki 或 Git。這是原始碼審閱結論，本次沒有讀取或匯出實際設定。[設定匯出](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/sfwebui.py#L1006)。

## 維護、依賴與文件狀態

master 最新 commit 為 2023-11-05，最近 30 筆樣本落在 2023 年；不能用 repo pushed_at 的 2026 日期宣稱核心程式近期活躍。主要貢獻者 smicallef 2,199、bcoles 934、krishnasism 352；這是累積計數，不能當作現役維護人力。

requirements.txt 保留 cryptography<4、pyOpenSSL<22、lxml<5、networkx<2.7 等較舊界線。這次未安裝，不宣稱現代 Python 一定失敗，也沒有把 AST 解析成功當成依賴可用。[依賴檔](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/requirements.txt)。

GitHub API 查到固定 SHA 的近期 CodeQL run success；Tests workflow 專用查詢回 total_count=0，因此功能測試狀態 Unknown，不能推成測試從未跑過或全部通過。Tests 定義涵蓋 Python 3.7–3.10、Ubuntu／macOS，沒有 Windows。[CodeQL run](https://github.com/smicallef/spiderfoot/actions/runs/38156034121)、[Tests 定義](https://github.com/smicallef/spiderfoot/blob/0f815a203afebf05c98b605dba5cf0475a0ee5fd/.github/workflows/tests.yaml)。

舊 homepage 現在取得的是企業威脅情報行銷頁，原 SpiderFoot documentation 入口失效；不把現行商業頁的功能承諾套到這份開源程式。defuddle 已執行，主要依固定 repository 文件補足。

### 社群口碑

公開搜尋找到使用者對維護停滯、passive 範圍與來源可用性的疑慮；這些是個人經驗，沒有形成準確率 benchmark。第三方 fork 的相容性修復宣稱也不能視為本上游已修復。[維護討論](https://www.reddit.com/r/OSINT/comments/1i1hfgi)、[Passive 討論](https://www.reddit.com/r/OSINT/comments/1l4obgu)。

## 本機驗證

| 檢查 | 結果與限制 |
|---|---|
| 來源固定 | API SHA 與下載目錄一致；未執行 repository 安裝腳本 |
| Python AST syntax | 702 個 Python 檔成功解析 |
| 原始 target properties | 抽取原始類別必要部分；接受合成 INTERNET_NAME，空值／非字串／未知型別分別拒絕 |
| 原始 CLI 篩選 | 抽取原始 if 區塊，用三個合成 module groups；Passive 選出 Passive 與雙標籤模組，All 選出全部 |
| fetchUrl 預設 | AST 核對 verify=True；verify=False 的帳號模組呼叫另依原始碼確認，未發 HTTP |
| 功能與實際來源 | 未驗：Web UI、SQLite scan、API key、目標掃描、網路辨識、圖表匯出與現代 Python 安裝 |

task-local 證據位於 `work/repo-intel/spiderfoot-20261014/`：metadata.json、spiderfoot.xml、repomix.log、ci.json、tests-ci.json、offline_probe.py、offline-results.json。這些是工作區檔案，沒有複製成 Wiki 附件。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian Wiki | 可收藏架構與人工確認的盤點摘要；完整掃描資料不應自動成為知識事實 |
| Codex | 一般 Python 框架，沒有本次已驗的 Skill／MCP 接線 |
| 軟體 QA | 和授權的 attack surface／安全測試較接近；無法替代功能測試、測試案例或 QA Evidence Pack |
| Automation | 模組可串成工作流，但外部來源、配額與主動流量須限定；現在不新增背景掃描 |

### 和 Maigret／Blackbird 比較

| 工具 | 適合回答的問題 | 目前主要限制 |
|---|---|---|
| Maigret | 這個 username 可能有哪些公開帳號與相關 ID？ | 遞迴範圍、誤報、主要 aiohttp TLS，AI 整份報告外送 |
| Blackbird | username／email 在哪些站點可能有帳號？ | 判定分類、TLS、外部清單版本與授權口徑 |
| SpiderFoot | 經授權目標的網域、IP、帳號與威脅情報如何關聯？ | 範圍更廣、API 依賴、主動行為、master 停滯與舊依賴 |

SpiderFoot 解決的範圍更廣，不代表它適合取代單純帳號查詢。若只做公開數位足跡盤點，Maigret 的評估與限定站點試驗更直接；若有組織攻擊面盤點，SpiderFoot 才有相應價值。

## 安裝建議

**⏳ 觀望，收藏研究；目前不安裝。** 現有 Wiki／Codex／QA 主線沒有需要這個框架的具體工作，來源維護與依賴也尚未驗證。

未來若要試用，先有經授權且能限定範圍的目標，再用隔離環境核對 Python／套件、指定少量模組、保存來源版本與實際查詢紀錄。Web UI 保持本地存取，登入與 TLS 分別確認；被動標籤不替代逐模組核對。這是後續驗收條件，本次沒有啟動掃描。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/maigret — 使用者名稱OSINT與遞迴調查評估|Maigret 評估]]
- [[Github/repos/blackbird — 帳號OSINT搜尋與結果可靠性評估|Blackbird 評估]]
