---
source: "https://github.com/antoniaci/blackbird"
author: "antoniaci"
stars: "9.1K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "osint"
  - "account-search"
---

# blackbird — 帳號 OSINT 搜尋與結果可靠性評估

## 一句話說明

Blackbird 是 Python CLI，用 username 或 email 向多個網站查詢可能存在的帳號，匯出 PDF／CSV／JSON，並可把找到的站名送到外部 AI 服務做推論。對目前 Obsidian／Codex／QA 工作流建議 ⏳ 觀望、不安裝；它有專門 OSINT 用途，但結果可靠性、TLS 與授權標示都需要先處理。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Repository | antoniaci/blackbird；README／文件仍有舊名稱 p1ngul1n0/blackbird |
| Stars / Forks | 9,134 / 1,080 |
| 主要語言 | Python |
| 授權 | GitHub API 為 null；`.github/LICENSE` 為 CC BY-NC-SA 4.0，`docs/LICENSE` 為 GPLv3；適用範圍未釐清 |
| 建立時間 | 2022-05-06 14:25:44 UTC |
| 最後推送 | 2025-07-13 13:48:19 UTC |
| 固定 SHA | `b45505080ef51bb3ef52dc29879ee6bef31e5b94` |
| Open Issues / PRs | repo API 合計 18；網頁快照顯示 8 issues／10 PRs |
| 最新 Release | releases API 空陣列 |
| 首頁 | https://p1ngul1n0.gitbook.io/blackbird/ |

來源：[GitHub API](https://api.github.com/repos/antoniaci/blackbird)、[固定原碼](https://github.com/antoniaci/blackbird/tree/b45505080ef51bb3ef52dc29879ee6bef31e5b94)。授權原文已讀，不以 repo 公開或沒有 API license 判成可無條件商用；本輪沒有法律適用性審查。

## Repomix 深度分析

固定 codeload 共有 69 檔。Repomix 1.18.1 未壓縮打包 53 個文字檔，99,702 tokens、319,468 字元，使用 `--no-gitignore` 避免外層 work ignore 隱藏來源。Scanner 無可疑檔案不等於安全驗收。

| Token Top 5 | Tokens | 佔比 |
|---|---:|---:|
| data/useragents.txt | 47,748 | 47.9% |
| docs/.gitbook/assets/digitalocean.svg | 9,659 | 9.7% |
| docs/LICENSE | 7,445 | 7.5% |
| .github/LICENSE | 4,148 | 4.2% |
| data/email-data.json | 3,071 | 3.1% |

近半 tokens 是 User-Agent 清單，不能把整包 token 數視為複雜演算法的規模。核心抽查為 CLI、HTTP helpers、username／email classifier、站點更新、AI payload、資料檔、tests 與 CI。

## 核心功能

| 功能 | 已確認的實作與限制 |
|---|---|
| Username 查詢 | aiohttp＋asyncio semaphore 並行；存在／不存在的 HTTP status 與文字指紋由 WhatsMyName JSON 決定 |
| Email 查詢 | 固定來源內 `email-data.json` 有 16 個 sites；可能用 GET／POST、pre-check 或 SHA-256 input transformation |
| 600+ 平台 | README 描述的是 WhatsMyName username 路線，不是 email 16 站；來源樹沒有 wmn-data.json，執行時抓上游 main，當下數量本輪未驗 |
| Metadata | 對已找到的站點抽出已配置欄位；Instagram 可使用另設 session cookie |
| 匯出 | PDF、CSV、JSON 與 HTML response dump；輸出可能含查詢目標與公開個資 |
| AI | `--ai` 將找到的站名逗號拼接，POST 到 API_URL/analyze，輸出 summary／tags／risk_flags 等；不等於對人的已證實事實 |
| CLI | filters、username permutations、proxy、timeout、concurrency 等；沒有本輪可直接接入的 MCP／Skill |

來源：[username.py](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/src/modules/core/username.py)、[email.py](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/src/modules/core/email.py)、[CLI](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/blackbird.py)。

## 技術架構

```text
blackbird.py（argparse / dotenv / Rich）
        ├─ config + 本機 email／metadata lists
        ├─ checkUpdates → WhatsMyName/main → 改寫本機 username list
        └─ username / email async checks
                ├─ aiohttp requests → 各站點
                ├─ status + body fingerprint → FOUND / NOT-FOUND / ERROR / NONE
                ├─ metadata / local dump / PDF / CSV / JSON
                └─ optional AI → 外部 API
```

requirements.txt 釘選 21 個版本，含 aiohttp、requests、Rich、ReportLab、Pillow、python-dotenv 等，不能由 pinning 推定這些版本在當前 Python 都相容。本機沒有安裝上游依賴。

## 具體風險與判斷

1. **TLS 驗證預設關閉。** `http_client.py` 的 sync request 傳 `verify=False`，async request 傳 `ssl=False`，並關掉相關警告。站點清單更新與 AI requests 使用同一 helper，不能只當作網站誤報問題；本輪已用抽出的原始函式與 stub transport 確認 sync 參數，零網路請求。
2. **版本固定仍會更新搜尋規則。** `config.py` 指向 WhatsMyName/main，`checkUpdates` 比 hash 後下載並覆寫本機清單。這不是簽章驗證或固定 revision；來源回應失敗後的下載路徑也未完整處理 None。評估結果若要可重現，除了程式 SHA 還要固定實際站點資料。
3. **存在訊號不等於帳號歸屬。** 相同 username 可由不同人使用，網站 soft-404、WAF、登入頁與改版都會影響 body/status 規則。README 的低 false-positive 宣稱，本輪沒有驗證基準或誤報率證據。
4. **部分不一致回應留下 NONE。** 原始 username checkSite 在 positive 條件成立、negative 字串也出現時，inner condition 不通過，但不改 status；合成 `account missing`／HTTP 200 fixture 重現回傳 NONE。這表示沒有明確分類，不能自動當成已確認不存在；不是完整 false-positive benchmark。
5. **AI 只收到站名，但仍是外部服務。** 已追 CLI payload：只拼接 found site names，沒有 username／email 欄位；該請求仍含 API key header、網路資訊與站點組合。網站查詢本身則把 username／email 或衍生值送到相應站點。不能把「AI payload 只有站名」擴張成所有功能完全不對外傳資料。
6. **人格／行為解讀證據薄。** 僅由站點類型生成 behavioral／technical profile，無法證實同一使用者、實際使用行為、人格或風險。適合作研究線索，不能作人員評等或真實歸屬結論。
7. **授權標示不同。** `.github/LICENSE` 與 docs/LICENSE 指向不同授權；本輪不替作者決定程式／資料／docs 各自適用哪份。未釐清前不整包納入商業公司交付。

來源：[HTTP helper](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/src/modules/utils/http_client.py)、[list updater](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/src/modules/whatsmyname/list_operations.py)、[AI client](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/src/modules/ai/client.py)、[repo license](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/.github/LICENSE)、[docs license](https://github.com/antoniaci/blackbird/blob/b45505080ef51bb3ef52dc29879ee6bef31e5b94/docs/LICENSE)。

## 社群健康度

最後推送距查詢約 15 個月，無 Release；主要貢獻者 antoniaci 596 commits，第二位 22，維護集中。近四週完整 commit activity 未取得，不能由 stars 判定目前站點規則可用。

CI 是 Ubuntu／Python 3.11，兩個 unittest jobs，沒有 Windows matrix。`tests/test_core.py` 在 import 時就 checkUpdates，並實際查詢 fixture username／email；它不是離線單元測試，本輪未執行。`.github/workflows/auto-close-issues.yaml` 30 天標 stale、7 天後 close，因此 issue closed 不能直接視為 bug fixed。

官方 GitBook 已用 defuddle 擷取，文件描述與主要功能一致。Agent Reach 的社群後端在本 session 已查為缺認證／擴充／Exa 設定，改走現有 web 搜尋。搜尋得到舊教學與獨立 Android companion，不能把不同產品或歷史體驗當作此 SHA 的驗證；定向 Reddit 口碑不足。Wiki 不保留易過期留言作為採用依據。

## 本次驗證

- 28 個 Python 檔案皆可 AST parse；這是語法檢查，不代表 imports／runtime 通過。
- 抽取原始 `do_sync_request`，stub transport 收到 verify=False，已確認。
- 抽取原始 username `checkSite`，合成衝突指紋回傳 NONE，已確認。
- Offline fixture 未 import 上游完整 module、未搜尋真人 username／email、未呼叫 AI 或實際站點，未改上游檔案。
- 未跑 upstream core／export suites、安裝依賴、Windows CLI、PDF／CSV、真實站點召回／誤報測試。
- 固定來源、metadata、XML 與 offline_check.py 保留在本次 workspace `work/repo-intel/blackbird-20261014/`，未清理。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian | 可以把經人工核對的調查線索寫筆記，但沒有原生 Vault 整理或同步功能 |
| Codex | Python CLI 可被 shell 調用，沒有 agent integration 增量；本次研究不授權真人查詢 |
| QA | 最值得借鏡的是多站回應分類、錯誤狀態與本輪 offline fixture；可用作網路錯誤判定教材，不需常駐此工具 |
| Automation | 未固定的站點清單與第三方頁面讓背景結果難以穩定；不接入既有夜班／職缺雷達 |

## 安裝建議

⏳ **收藏研究，不安裝。** 只有明確且已授權的公開數位足跡調查時才有直接用途；目前工作流增量有限。先釐清授權、恢復 TLS 驗證、固定站點資料與明確處理未分類／錯誤狀態，才值得評估隔離試用。本輪沒有修改全域 Skill、工具、排程、Git 或真實帳號。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/sherlock — 跨 400+ 社群網站的使用者名稱 OSINT 搜尋工具|Sherlock 既有分析]]
