---
source: "https://github.com/sherlock-project/sherlock"
author: "sherlock-project (Siddharth Dushantha 等)"
stars: "87K+"
clipped: 2026-08-02
tags:
  - "github/repo"
  - "osint"
  - "security"
  - "python-cli"
---

# sherlock — 跨 400+ 社群網站的使用者名稱 OSINT 搜尋工具

> **sherlock-project/sherlock** | ⭐ 87,501 | 🍴 10,279 | 📝 MIT
> "Hunt down social media accounts by username across social networks"

## 一句話說明

給一個使用者名稱，Sherlock 會並行去 481 個社群網站查有沒有同名帳號，把命中的網址列出來。核心邏輯不到 1000 行 Python，價值幾乎全在那份持續眾包維護的站點清單上。適合用來稽核自己的數位足跡、做授權範圍內的滲透測試偵察，或當 OSINT 入門教材。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 87,501 |
| Forks | 10,279 |
| 主要語言 | Python（81 KB；另有 Dockerfile / Shell） |
| 授權 | MIT |
| 建立時間 | 2018-12-24 |
| 最後推送 | 2026-08-01 |
| Open Issues | 95 |
| Open PRs | 227 |
| 最新 Release | v0.16.0（2025-09-16，距今約 11 個月） |
| Topics | osint, reconnaissance, redteam, pentesting, cybersecurity, forensics, hacktoberfest, cli, python3 |
| 首頁 | https://sherlockproject.xyz |
| 是否 Archived | 否 |

### Repomix 指標

| 指標 | 數值 |
|------|------|
| 壓縮模式 | 未壓縮（diskUsage 18.9 MB < 50 MB） |
| 核心程式 | `sherlock.py` + `sites.py` + `notify.py` + `result.py`，合計 < 1000 行 |
| 最大檔案 | `sherlock_project/resources/data.json`（站點清單，佔絕大多數體積） |

程式碼與資料的比例是這個專案的關鍵特徵：**邏輯很小，資產是那份 481 站的 JSON**。

## 核心功能

- **481 個站點的存在性檢查**（本次自行從 `data.json` 數出的實數，非 README 宣稱的「400+」）。判定方式三選一：
  - `status_code`：327 站，看 HTTP 狀態碼
  - `message`：127 站，在回應內文找特定字串
  - `response_url`：27 站，關掉 redirect 後看最終網址
- **執行緒併發**：`requests.session()` 重用連線池，`max_workers = min(N, 20)`。不是 asyncio。
- **WAF 指紋防呆**：硬編碼 4 組常見 WAF 回應特徵，避免把攔截頁誤判成「帳號存在」。
- **輸出格式**：純文字、CSV、XLSX（透過 pandas / openpyxl）。
- **執行時抓取即時站點清單**：預設會打 `data.sherlockproject.xyz`，實測 301 導向 `raw.githubusercontent.com/.../data.json`。另有 `EXCLUSIONS_URL`（誤判排除清單）與 GitHub API 版本檢查。**未發現任何把使用者查詢對象回傳的遙測端點。**

## 技術架構

```
  使用者輸入 username
        │
        ▼
  ┌───────────────┐   啟動時抓取
  │  sites.py     │◄────────────── data.sherlockproject.xyz
  │  站點清單載入  │                 └─301→ raw.githubusercontent.com/.../data.json
  └───────┬───────┘                 EXCLUSIONS_URL（誤判排除）
          │ 481 站定義
          ▼
  ┌───────────────────────────────────┐
  │  sherlock.py  ThreadPoolExecutor  │
  │  max_workers = min(N, 20)         │
  │  共用 requests.session() 連線池    │
  └───────┬───────────────────────────┘
          │ 每站一次 HTTP
          ▼
  ┌───────────────────────────────┐
  │ 判定層（errorType 三選一）      │
  │  status_code (327)            │
  │  message     (127)            │
  │  response_url (27)            │
  │  + 4 組 WAF 指紋防呆           │
  └───────┬───────────────────────┘
          ▼
  result.py / notify.py → 終端輸出 / CSV / XLSX
```

| 層次 | 技術 |
|------|------|
| CLI | Python 3，`sherlock_project` 套件 |
| 併發 | `concurrent.futures` 執行緒池（非 asyncio） |
| HTTP | requests + requests-futures + PySocks（可走 Tor：stem） |
| 資料 | `resources/data.json` 站點定義（眾包維護） |
| 輸出 | pandas / openpyxl（CSV、XLSX） |
| 容器 | 官方 Dockerfile |

## 安裝前必讀：PyPI 命名碰撞

**這是本次分析最重要的實務發現。**

| 套件名 | 實際是什麼 | 版本 |
|---|---|---|
| `sherlock-project` | ✅ 本專案（OSINT 工具） | 0.16.0（2025-09-16） |
| `sherlock` | ❌ 完全無關的「distributed inter-process locks」，作者 Vaidik Kapoor | 0.4.1 |

`pip install sherlock` 會裝到一個毫無關係的分散式鎖套件。正確指令是 `pip install sherlock-project`。

這不是惡意 typosquatting（`sherlock` 套件早於本專案且是正當專案），但誤裝的機率很高。另注意 PyPI 停在 0.16.0，repo 內版本號已是 0.16.1 但未發布。

## 供應鏈稽核

| 檢查項 | 結果 |
|---|---|
| 依賴是否存在／未 yank | ✅ 全數通過（certifi、colorama、PySocks、requests、requests-futures、stem、pandas、openpyxl、tomli） |
| 安裝期腳本可疑行為 | ✅ 無 |
| 對外網路呼叫 | 站點清單 + 排除清單 + GitHub 版本檢查；**無使用者資料上報** |
| 硬編碼金鑰 | ✅ 無 |
| Release 產物與原始碼一致 | ✅ 一致 |

### 已修復的 CVE-2026-44590（CVSS 9.3 Critical）

- GHSA-v6wr-ccr4-x8g9，公告日 2026-05-07
- 成因：CI workflow `validate_modified_targets.yml` 用 `pull_request_target` 搭配 `${{ }}` 直接插值，構成 command injection，可竊取 `GITHUB_TOKEN`、偽造機器人核准 PR
- 3 天內修復（commit `6eaec5cc`）
- **影響範圍是專案的 CI 基礎設施，不是使用者安裝的套件本身**——裝了不會中毒，但它一度可能被用來污染倉庫內容（GHSA 只寫「可能危害基礎設施」，未證實真的發生過）

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者集中度 | sdushantha 876 / hoadlck 467 / ppfeister 417，前三人佔前八大貢獻者的 86% | Bus factor 偏低 |
| 近期 commit | 2026-08-01 三筆**全是贊助商 banner**（UserSearch、OSINT Industries）；上一次實質修復批次在 2026-05-05 | 功能開發近停滯 |
| Release 頻率 | v0.15 → v0.16 間隔 14 個月 | 不定期 |
| Open PR | 227 筆，166 個不重複作者，最多者僅 7 筆；48% 是 ≤2 檔案 ≤20 行的小型 PR；年齡中位數 124 天、55 筆等超過一年 | hacktoberfest 驅動的站點新增投稿 + 3 人團隊批次審查 → 長期積壓（**非灌水**） |
| 安全響應 | CVE 通報後 3 天修復；每日 Exclusions Updater 自動化綠燈 | 良好 |

判定：**自動化與安全響應仍在運轉，功能開發近三個月停滯**。專案沒棄坑，但也不能期待新功能。

## 已知問題

- **假陽性（false positive）是持續且未根治的現象**。多筆「False positive for: X」issue 掛零回覆超過一年。唯一找到的實測數字是某部落格的 32%，樣本 n=1，**不足以推廣成通用誤報率**，此處僅記為社群主觀共識而非量化結論。
- 站點清單會過期：社群網站改版就會讓判定邏輯失效，靠眾包 PR 修補，而 PR 積壓嚴重。
- 部分目標站會 rate limit 或封鎖大量請求。

## 替代方案對照

| 工具 | 定位 |
|---|---|
| **Sherlock** | 快但淺——只做「帳號是否存在」檢查，站點數多、上手最快 |
| **Maigret** | 深但慢——會抓取並解析個人頁面資料 |
| **WhatsMyName** | 免安裝（有網頁版），社群評價假陽性最低 |
| **Blackbird** | 主打另類平台覆蓋 + 報表輸出 |

選用判準：要快速大範圍掃一輪用 Sherlock；要把結果當證據用，改用 WhatsMyName 或 Maigret 覆核。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低。無知識庫整合價值，屬工具類留存。 |
| **Claude Code** | 中。純 CLI，可包成 skill 但價值不高（一行指令的事）。真正用途是 QA/資安面試的實作談資：三種偵測策略、假陽性成因、眾包資料維護的困境都是好素材。 |
| **Automation** | 中低。可排程定期掃自己的常用 username，監控數位足跡變化；但假陽性率高會製造噪音，需人工覆核。 |
| **個人求職網站** | 有實用場景：上線前掃一次自己的 username，確認公開帳號分佈符合預期。 |

## 安裝建議

⏳ 觀望

理由：工具本身乾淨（MIT、供應鏈無異常、無使用者資料上報），但**假陽性未根治 + 功能開發近停滯 + 站點清單靠積壓中的 PR 維護**，對「拿結果當證據」的場景不可靠。若只是偶爾稽核自己的數位足跡，用 WhatsMyName 網頁版更省事，不必裝。

- **升級條件（→ ✅ 裝）**：需要批次掃多個 username 或整合進自動化流程時；或官方發布 v0.17 並清理假陽性 issue 積壓。
- **放棄條件（→ ❌ 不裝）**：再過 6 個月仍無實質功能 commit（只有贊助商 banner），或 PyPI 版本持續落後 repo；屆時改用 Maigret / WhatsMyName。

安裝時務必用 `pip install sherlock-project`，不要用裸名 `sherlock`。

## 使用倫理

這是雙用途 OSINT 工具。合法用途包含稽核自己的足跡、授權範圍內的滲透測試、CTF、資安教學。用來蒐集他人資訊需有明確授權，各地個資法規（GDPR、台灣個資法）皆適用。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Tools/agent-reach|Agent Reach — AI Agent 互聯網感知層]]（同屬對外情報蒐集工具鏈）
