---
source: "https://github.com/soxoj/maigret"
author: "soxoj"
stars: "39K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "osint"
  - "username-search"
---

# maigret — 使用者名稱 OSINT 與遞迴調查評估

## 一句話說明

Maigret 用使用者名稱找公開帳號、擷取個人檔案資訊，並追查頁面裡的新名稱或 ID，最後輸出調查報告與關聯圖。若有經授權的數位足跡盤點需求，值得優先評估；目前公司、Wiki 與 QA 工作流沒有明確需求，建議 ⏳ 觀望、不安裝。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Repository | soxoj/maigret |
| Stars / Forks | 38,974 / 3,068 |
| 主要語言 | Python |
| 授權 | MIT；GitHub API、根目錄 LICENSE 與 pyproject.toml 一致 |
| 建立時間 | 2020-06-27 14:16:42 UTC |
| 最後推送 | 2026-10-12 17:40:30 UTC |
| 固定 SHA | `eaf820666d15bfd545129f3223e2261c27191e74` |
| 穩定 Release | v0.6.6，2026-09-18；API 第一筆 nightly-main 不代表最新穩定版 |
| Open Issues / PRs | Repo API 合計 42；另查 open PR 13。Issue 單獨數量未以同一時間點查詢 |
| Python 要求 | pyproject.toml 宣告 ^3.10；CI matrix 3.10–3.14 |
| Homepage / Docs | https://maigret.app/gh ／ https://maigret.readthedocs.io/en/latest/ |
| Archived | false |
| Topics | osint、username、socmint、scraping、cli、investigation 等 |

數字來自公開 GitHub API；原始碼分析以固定 SHA 為準，不能把 main、PyPI 或 nightly 視為同一份交付物。[固定來源](https://github.com/soxoj/maigret/tree/eaf820666d15bfd545129f3223e2261c27191e74)、[LICENSE](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/LICENSE)、[Release](https://github.com/soxoj/maigret/releases/tag/v0.6.6)。

## Repomix 深度分析

| 指標 | 本次結果 |
|---|---|
| 工具 | Repomix 1.18.1，既有 task-local CLI |
| 打包檔案 | 178 |
| 總 Tokens | 2,457,111 |
| 總字元 | 8,164,838 |
| 模式 | XML，未使用 --compress，使用 --no-gitignore |
| 掃描排除 | tests/test_checking.py 被安全掃描器排除 1 個 issue；未據此判定為真實秘密或漏洞 |

最大 token 檔案 Top 5 的 CLI 輸出未完整保留，這裡不補猜值。另以下載來源的檔案大小呈現資料分布；這不是 token 排名，也不等同 XML 收錄清單：

| 檔案 | Bytes |
|---|---:|
| maigret/resources/data.json | 3,187,246 |
| static/recursive_search.svg | 1,704,945 |
| sites.md | 1,453,999 |
| static/report_alexaimephotography_html_screenshot.png | 461,882 |
| static/web_interface_screenshot.png | 455,276 |

大量內容來自網站資料、清單與範例素材。核心判定另讀原始 Python，不只看 Repomix 摘要；被排除的測試檔也有直接檢視。

## 核心功能

- **帳號搜尋**：固定版 data.json 有 8,144 筆 sites，699 筆原始紀錄標 disabled。這是資料筆數，不能當成可用網站數；還有 identifier 類型、engine 繼承與網站失效差異。README 的 5,900／description 的 6K 是不同口徑。
- **限定範圍**：預設 top_sites_count 為 500，可指定站點或 tags。ranked_sites_dict 會補入符合條件的 mirror，因此「top 500」不保證實際只發出 500 個站點查詢。
- **資料擷取與遞迴**：預設 recursive_search、info_extracting 為 true。找到頁面裡的新 username／ID 後可能擴大搜尋；`--no-recursion` 可關閉遞迴。
- **多種交付方式**：CLI、Python library、Flask Web UI；JSON、CSV、Markdown、HTML、PDF、XMind 與 graph 等報告。PDF 是 optional extra，本次未安裝或驗證匯出。
- **網站資料更新**：預設每 24 小時檢查 GitHub main 的 meta，下載時驗 SHA-256 與 JSON 結構，失敗可用本地資料。可用 `--no-autoupdate` 限制版本漂移；hash 比對不代表網站規則準確或來源具獨立簽章。
- **AI 分析**：需明確啟用 --ai。maigret/ai.py:175–181 把整份 markdown_report 放入 chat/completions 的 user message；資料送往設定的 OpenAI-compatible endpoint。應把它視為調查資料外送，而非純本機摘要。

功能依固定版 [README](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/README.md)、[settings.json](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/maigret/resources/settings.json)、[sites.py](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/maigret/sites.py#L415)、[AI 實作](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/maigret/ai.py#L158)。官網經 defuddle 只取得數位足跡與隱私保護短文，不能當作完整文件。

## 技術架構

```text
CLI / Flask Web UI / Python library
          |
 settings + bundled/cache site database
          |
 ranked filtering -> asynchronous site checkers
          |                    |
          |              HTTP / DNS / proxy
          v
 result classifier -> profile extraction -> recursive identifiers
          |
 JSON / Markdown / HTML / PDF / graph
          |
 optional --ai -> configured external API
```

| 部分 | 技術與位置 |
|---|---|
| 入口與選項 | maigret/maigret.py、settings.py |
| 網站與 engine | sites.py、resources/data.json |
| HTTP 與錯誤分類 | checking.py、errors.py；aiohttp、curl_cffi、aiodns |
| 資訊擷取 | socid-extractor；結果再交遞迴搜尋 |
| 輸出與 Web | report.py、Flask、Jinja2、NetworkX／PyVis；PDF optional extra |
| DB 更新 | db_updater.py，requests，cached DB 與 bundled fallback |

### 結果可靠性與 TLS

`checking.py:338–340` 建立 SSLContext 後設 `check_hostname=False` 與 `verify_mode=CERT_NONE`，用於主要 aiohttp 非 proxy 路徑。程式註解雖寫「real SSL context」，仍未驗證伺服器身分；不能因為沒有 ssl=False 就認為 TLS 驗證開著。ProxyConnector 與 curl_cffi 是其他路徑，本次沒有把這個結論擴張到所有 transport。[實作](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/maigret/checking.py#L332)。

`process_site_result` 先處理已辨識的錯誤為 UNKNOWN，再依 message／status_code／response_url 分類。message 模式在 presense_strs 為空時可把一般頁面視為正向；中文等非 ASCII username 有額外檢查，但 ASCII 名稱仍可能中招。status_code 模式則主要依 2xx 判定，規則準確性依賴每個網站。[分類實作](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/maigret/checking.py#L755)。

因此 CLAIMED 只是該規則判到的帳號候選；同名帳號也不能證明同一個人。官方文件也承認 false positives，需要逐站核對。[官方使用範例](https://maigret.readthedocs.io/en/stable/usage-examples.html)。

## 本機驗證

| 檢查 | 結果與邊界 |
|---|---|
| Python AST syntax | 66 個 Python 檔成功解析；沒有執行整個套件 |
| 原始分類函式 fixture | 抽取固定版函式與結果類別；錯誤頁辨識用 stub，parsing 關閉，沒有網路請求 |
| 正向／缺席／雙標記 | 分別 CLAIMED／AVAILABLE／AVAILABLE |
| 空正向標記＋一般 ASCII 頁面 | CLAIMED，重現誤報條件 |
| 中文名稱未出現 | AVAILABLE，確認額外防護分支 |
| 注入 transport error | UNKNOWN；這只驗分類分支，未驗真實 timeout 或反機器人辨識 |
| 原始 TLS 設定 | 抽取原始三行設定執行，確認 check_hostname=false、verify_mode=0 |
| 實際搜尋／Web／匯出／AI | 未驗；未搜尋真人、未啟動 UI、未呼叫 AI、未安裝依賴 |

本次 task-local 證據：`work/repo-intel/maigret-20261014/metadata.json`、`maigret.xml`、`offline_probe.py`、`offline-results.json`。這些位於執行工作區，不是 Wiki 附件。

## 社群健康度與口碑

此日期快照顯示專案仍活躍：最新 30 筆 commit 的最舊日期為 2026-10-04，因此近四週至少 30 筆，未當成完整總量。穩定版本 0.6.3／0.6.4／0.6.5／0.6.6 分別在 7/13、8/11、8/25、9/18 發布。主要維護者 soxoj，另有 dependabot、kustermariocoding 等；自動帳號貢獻不能直接算成人力。

CI 定義有 Python 3.10–3.14 與不含 PDF extra 的 minimal-install。公開 API 最近五筆 Linting and testing 為 success，但 SHA 都不同於本報告固定來源；固定 SHA 查詢回 HTTP 500，**該 SHA 的 CI 狀態 Unknown**，沒有當成本機 Windows 通過。[CI 設定](https://github.com/soxoj/maigret/blob/eaf820666d15bfd545129f3223e2261c27191e74/.github/workflows/python-package.yml)、[查到的近期 run](https://github.com/soxoj/maigret/actions/runs/38554161549)。

社群 connector 不足，改用公開搜尋。Reddit「Maigret + LLM」有對模型混淆誤報與有效資料的質疑；這是個別意見，未提供可重現準確率，不能外推整體評價。本文不採用無證據的授權指控。[討論來源](https://www.reddit.com/r/OSINT/comments/1jm78ws)。沒有可靠的整體滿意度或準確率數據；本次未做 YouTube 教學調查。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian Wiki | 保存比較與人工核對後的候選即可；沒有必要自動灌入完整人際圖或調查檔案 |
| Codex | 一般 Python 工具；不是已安裝 Skill 或 MCP。不能把 library 介面寫成現成接線 |
| QA／Automation | 能參考 UNKNOWN 與逐站規則測試方法，但不是一般軟體 QA 工具；全站遞迴搜尋不適合作為預設背景工作 |

### 和 Blackbird 比較

| 面向 | Maigret 固定版 | 本次 Blackbird 評估 |
|---|---|---|
| 輸入與定位 | username／相關 ID，資料擷取與遞迴 | username／email 帳號搜尋 |
| 網站資料 | 附 data.json，另有預設 auto-update | username 清單從外部 main 下載；email 有 16 個站點資料 |
| 介面 | CLI、library、Flask Web UI | CLI |
| AI 外送 | 整份 Markdown 報告 | 找到的站名清單 |
| 授權與維護 | MIT；2026-10 有推送 | 授權檔口徑未釐清；最後推送 2025-07 |
| TLS | 主要 aiohttp 路徑關閉驗證 | 同步／非同步搜尋關閉驗證 |
| 可靠性 | 有 UNKNOWN；仍重現空標記誤報 | 已重現雙標記導致 NONE 等問題 |

Maigret 的資料、介面、維護與授權更適合後續試用；本次沒有公平的真人或共同 fixture benchmark，不能宣稱實際搜尋準確率較高。Blackbird 細節見下方 Wiki 評估。

## 安裝建議

**⏳ 觀望，現在不安裝。** 當前沒有必須做 OSINT 的工作，增加這個套件不會直接改善現有 Wiki／QA 流程。

若未來要盤點本人或經授權對象的公開數位足跡，Maigret 是比 Blackbird 更值得先做小範圍驗證的候選：固定程式與 DB、關閉 auto-update／recursion／AI，只選必要站點，逐筆人工核對結果，並先處理所選 transport 的 TLS 驗證。這是後續試用條件，本次沒有執行。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/blackbird — 帳號OSINT搜尋與結果可靠性評估|Blackbird 評估]]
- [[Github/repos/sherlock — 跨 400+ 社群網站的使用者名稱 OSINT 搜尋工具|Sherlock]]
