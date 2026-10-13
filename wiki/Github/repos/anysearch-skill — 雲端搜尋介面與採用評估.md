---
source: "https://github.com/anysearch-ai/anysearch-skill"
author: "anysearch-ai"
stars: "6.4K"
clipped: 2026-10-11
tags:
  - "github/repo"
  - "ai/search"
  - "skills"
---

# anysearch-skill：雲端搜尋介面與採用評估

## 一句話說明

給 AI Agent 使用的搜尋 CLI 與操作指引，將查詢送到 AnySearch 雲端，支援一般搜尋、領域查詢、並行批次及網頁取文。建議先觀望，不原樣安裝；已驗證三種 CLI 的本機契約，並重現整批失敗仍回傳成功退出碼。後續獲准的三題匿名搜尋均成功，但沒有顯示取代現有搜尋的優勢。

## 專案概覽

| 項目 | 2026-10-11 查核結果 |
|---|---|
| Repo | [anysearch-ai/anysearch-skill](https://github.com/anysearch-ai/anysearch-skill) |
| 固定版本 | `9b91ee215164de60d61c7d63789c891a1948b039` |
| Stars / Forks | 6,425 / 374；查核當下的 GitHub REST 快照 |
| 主要語言 | GitHub 標示 Python；另有 Node.js、PowerShell、Bash CLI |
| 授權 | Apache-2.0，含 LICENSE 與 NOTICE |
| 建立 / 最後推送 | 2026-04-30 / 2026-09-17 |
| 最新 release | v3.1.1，2026-09-02；本輪分析 HEAD，並非直接分析該 tag |
| 貢獻者 / 開放議題 | REST 列出 10 位貢獻者；1 個 issue、0 個 PR |
| 官網 | [anysearch.com](https://www.anysearch.com/) |

GitHub GraphQL 認證失效，本輪改用可讀取公開資料的 `gh api` REST。commit activity 端點未回傳預期陣列，未填造週均 commit。資料來源：[固定 revision](https://github.com/anysearch-ai/anysearch-skill/tree/9b91ee215164de60d61c7d63789c891a1948b039)、[releases](https://github.com/anysearch-ai/anysearch-skill/releases)。

## Repomix 深度分析

使用現有 Repomix 1.18.1，處理固定版本的 22 個檔案，產出 48,517 tokens、187,190 字元。最大五檔依序為 PowerShell CLI（8,269 tokens）、Bash（6,925）、Python（6,386）、Node.js（5,406）、中文 README（3,067）。

第一輪因外層 `work/` 的 Git ignore 收錄 0 檔，雖退出碼為 0，不能作分析證據。後續限定已下載的公開來源目錄，使用 `--no-gitignore`，並將 process 的 TEMP、TMP、npm cache 指到本輪 task root；最終收錄 22 檔。Repomix 沒有發現可疑檔案，只代表該掃描器的結果。

實際閱讀 README、SKILL、Python 的設定與 HTTP 路徑、跨 runtime 測試、生成器與 CI；對 Node.js／PowerShell 的錯誤及批次流程定向查讀，另執行三 runtime 契約測試。Bash 本輪未執行，不能宣稱四 runtime 行為均已驗證。

## 核心功能

| 功能 | 實作與限制 |
|---|---|
| `search` | POST `/v1/search`；查詢可帶 tag、params、語言與 zone，結果數限制 1–10 |
| `get_sub_domains` | GET `/v1/sub-domains`；查詢領域能力及必要參數，實際可用能力仍由後端決定 |
| `batch_search` | 1–5 個查詢並行發出，依原輸入次序排回；一批會發出多次搜尋請求 |
| `extract` | POST `/v1/extract`，由服務端抓指定 URL；文件列 HTML、文字、JSON、Markdown，未支援 PDF、Office、影像或影音 |
| `doc` | 由共用規格產生 CLI 說明，四語言文件及常數可作同步檢查 |

程式列出 17 個領域名稱，包括 general、finance、legal、code、security、travel 等。這是客戶端接受的分類，不能據此宣稱各領域的資料來源或品質已驗通。來源：[Python CLI](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/scripts/anysearch_cli.py)、[SKILL](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/SKILL.md)。

## 技術架構

```text
AI Agent 閱讀 SKILL.md
        |
        +-- Python / Node / PowerShell / Bash CLI
                  |
                  +-- 查詢、URL、參數、可選 API key
                  |
                  v
          api.anysearch.com
                  |
                  +-- 搜尋、領域資料、取文後端
                  |
                  v
          Markdown 結果與錯誤訊息
```

Repo 開源的是介面、文件、生成器及測試，沒有搜尋索引或服務端引擎。下載 CLI 仍依賴雲端；這個 Skill 使用 REST，不必加 MCP。官網另提供 MCP 安裝入口，但不是本輪採用範圍。

Python 依賴 `requests>=2.20.0`；Node CLI 使用內建模組。四份 CLI 的 SHA256 均符合 repo 內的 SHA256SUMS，`generate.py --check` 也通過。這可核對檔案一致性，同一 repo 內的校驗表不能獨立證明供應鏈可信度。來源：[requirements](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/requirements.txt)、[生成器](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/scripts/generate.py)。

## 已驗證的行為與接入問題

### 整批失敗仍退出成功

本輪用上游 localhost HTTP stub，送兩筆 `query=fail`，兩次都回 429。Python、Node、PowerShell 各印出兩筆 `Search failed`，三者 exit code 都是 0。上游測試覆蓋部分批次失敗，但未檢查整批失敗的退出碼。

```text
輸入：[fail, fail]
API： [429, 429]
輸出：兩筆 Search failed
退出碼：0（Python / Node / PowerShell 均重現）
```

人工讀輸出可以看見失敗；只認退出碼的自動研究流程可能把它當成功。若採用，應要求全批失敗回非零，或由外層逐項檢查結果後判定。來源：[Python batch 邏輯](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/scripts/anysearch_cli.py#L398)、[契約測試](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/scripts/test_cli.py)。

### 搜尋路由與金鑰管理需要本機適配

SKILL 第 32 行將自己設為推薦搜尋工具，並要求服務不可用時，取得使用者同意才改用其他搜尋。這會增加現有 Codex 搜尋流程的阻礙；本輪未採用這些上游指令。[原文位置](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/SKILL.md#L32)。

README 要求 Agent 用真實 email 註冊，成功後存 key 到 Skill 的 `.env`；SKILL 對 API 回傳新 key 的情境則要求先確認。兩段流程的確認條件不一致，而且公司密鑰的既有落點另有規則。Python 會將本地 `.env` 內容寫入 process environment，優先於既有環境變數，還可覆寫 API base URL。原樣接入前需要處理設定來源、金鑰保存及搜尋路由。[README 註冊](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/README.md#L53)、[Python env 載入](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/scripts/anysearch_cli.py#L18)。

Python 錯誤路徑還會直接印出 API `data`；若其中含新 key，可能進入工具紀錄。這是原碼可見的條件性風險，本輪未取得真實 key，也未用服務端回應驗證。[錯誤輸出](https://github.com/anysearch-ai/anysearch-skill/blob/9b91ee215164de60d61c7d63789c891a1948b039/scripts/anysearch_cli.py#L110)。

## 社群健康度與外部證據

專案有 releases、跨 runtime 契約測試及生成同步 CI；開放議題少，但不能單憑星數與低 issue 數認定穩定度。本輪 Agent Reach doctor 顯示 Exa 未配置，Reddit／X 等渠道待啟用，社群資料改由現有 Web 搜尋取得。看到部落格評介與品牌社群討論，沒有取得可重跑的獨立品質比較。Wiki 不留短期熱度排名，也不把轉述當實測。

官網公布 300 題、同一 LLM 比較搜尋 API 的正確率與延遲，另有模型評分的場景展示；屬供應商公布結果。本輪沒有取得完整逐題結果並重跑，不能直接推出它優於本機既有搜尋。[官方比較與方法](https://www.anysearch.com/)。

## 價格、資料外送與未驗項目

官方價格頁目前列 Free 為 $0／月、1,000 requests／日、每 key 20 QPS；Professional 標示 Coming Soon，Enterprise 要聯繫。這是公開標示，並非本輪帳號實際配額。匿名模式文件只說較低限制，本輪沒有驗證額度。[Pricing](https://www.anysearch.com/pricing)。

查詢文字、取文 URL、領域參數會交給 AnySearch API，帶 key 時也會送授權 header。官網宣稱 no logging／zero retention；客戶端原碼無法驗證後端保存政策。隱私政策頁本輪頁面讀取只有空殼，條款內容未驗證。[官網](https://www.anysearch.com/)、[Privacy 入口](https://www.anysearch.com/legal?type=privacy)。

初次審核僅跑本機假 API，後續依使用者確認完成三次匿名搜尋，詳見下節。沒有取文、註冊、儲存金鑰或安裝 Skill。長期連線穩定度、繁中來源覆蓋、整體搜尋召回、服務端隱私與真實配額都仍待驗。

## 三題匿名搜尋比較（2026-10-11）

使用固定版本 Node CLI，排除 ANYSEARCH 環境設定並確認來源目錄沒有 `.env`，對公開 API 發出三次一般搜尋，每題最多五筆、英文、各一次、不重試。現有 Web search 使用相同三個查詢，最後打開官方正文核對。這輪只評估一般搜尋，沒有執行領域能力查詢或 `extract`。

| 題目 | AnySearch 客戶端耗時 | 官方來源與內容核對 | 現有搜尋 |
|---|---|---|---|
| Python `asyncio.wait_for` 超時與取消 | 2.151 秒 | 第一筆找到 Python 官方文件；摘要偏向一般 task cancellation，未完整交代等取消完成的行為 | 找到同一官方文件，搜尋摘要含等待取消完成的細節 |
| CVE-2025-55182 受影響與初始修復版本 | 1.246 秒 | 第一筆找到 React 官方公告；該 CVE 初始修復版與正文一致 | 同樣找到 React 官方公告與相關官方資安公告 |
| 台灣護照赴日本短期免簽條件 | 2.576 秒 | 第一筆找到日本 MOFA；但另混入日本人入境台灣的 BOCA 規則，方向相反。第一筆摘要還接上其他國家的登錄有效期，須回正文拆開 | 找到日本 MOFA 的免簽清單及 FAQ，仍須核對國籍與停留條件 |

三次 CLI 均 exit 0、各五筆結果，stderr 空白。這只證明當時匿名一般搜尋可用，沒有測出每日匿名配額。三題不是整體準確率基準，也沒有測領域搜尋、繁中問題或完整研究成品。

現有 Web search 將三個查詢合併在一次工具呼叫，整次 3.324 秒；AnySearch 是三次獨立 Node process，三次合計 5.973 秒。兩者執行方式、結果數與工具包裝不同，不能據此判定速度勝負。記錄包含客戶端啟動、HTTP 與輸出處理，未單獨量服務端延遲，也不包括正文核對與人工閱讀。

Python 正文確認超時會取消等待項目，且會等取消完成。React 公告所列初始修復版是針對本題 CVE，不能作為目前所有漏洞的完整升級建議。日本 MOFA 將台灣護照的 personal ID 條件列在 Note 4；三年登錄有效期是其他國家的條件。BOCA 頁面則列外國人入境台灣的免簽規則，不能用於回答台灣人赴日本。[Python](https://docs.python.org/3/library/asyncio-task.html#asyncio.wait_for)、[React 公告](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)、[日本 MOFA](https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html)、[台灣 BOCA](https://www.boca.gov.tw/cp-149-4486-7785a-2.html)。

本輪結論：三題都能取得官方來源，但現有搜尋也能取得；程式題摘要缺細節，旅遊題存在適用對象混入。目前保留觀望，沒有安裝或替換搜尋入口的依據。核對沿既有研究方法，逐項檢查正文與適用範圍，未把官方網域或退出碼直接當答案正確的證明。

## 與現有系統的相關性評估

| 現有工作 | AnySearch 可嘗試補的部分 | 本輪判斷 |
|---|---|---|
| Codex 日常研究 | 領域能力發現、批次查詢 | 有介面增量，搜尋效果未證明；保留現有搜尋入口 |
| repo-intel | 多查詢搜尋、公開頁取文 | GitHub metadata／固定 revision 仍用官方 REST，不需經搜尋服務轉述 |
| 旅遊研究 | travel 領域、航班及交通相關查詢 | 結果須回官方來源核對時間與適用範圍，不能充當訂票或報價驗收 |
| QA／程式研究 | code、security 領域 | 適合用公開技術題做有限比較；不送私人程式或未公開測試資料 |
| Obsidian | 整理結果作研究素材 | 沒有 Vault 管理增量，不需因此建立第二套知識庫 |

最值得參考的是 HTTP stub 的跨語言契約測試與輸入順序保留。單純引入另一個搜尋供應商，是否能減少查核時間，仍需以相同問題與來源核對做比較。

## 安裝建議

**⏳ 觀望，不原樣安裝。** 三種 CLI 的本機契約通過，三題匿名一般搜尋可用，但沒有顯示優於現有搜尋。整批失敗退出碼、搜尋優先規則、註冊及金鑰流程仍需要處理。

已完成先前核准的三題匿名比較，額度不自動追加。領域搜尋的增量仍未知；這輪結果沒有足夠理由擴大接入。

## 驗證與產物

| 檢查 | 本輪結果 |
|---|---|
| 固定 revision／公開原碼 | 已下載並檢查 zip 路徑範圍 |
| Repomix | 最終 22 檔、48,517 tokens，exit 0 |
| `test_cli.py --runtime python,node,powershell` | PASS Python、Node、PowerShell；僅 localhost 假 API |
| `generate.py --check` | 四份 CLI 生成內容一致，exit 0 |
| SHA256SUMS | 四份 CLI 均吻合 |
| 全批 429 | 三 runtime 均重現兩筆失敗／exit 0 |
| Defuddle 官網 | 成功擷取正文；官方基準及價格另以頁面讀取核對 |
| 真實 AnySearch API | 後續獲准的三次匿名一般搜尋均成功；搜尋品質只作三題局部核對 |
| Bash runtime／領域搜尋／extract | 未執行 |

本機研究產物保留於 `C:/Users/sanyo/.codex/worktrees/bdc8/AI-一人公司/work/repo-intel/anysearch-20261011/`：固定來源、Repomix XML、官網 Markdown、`offline_probe.py`／`offline_probe.json`、`live_comparison.py`／`live_comparison.json` 及 `baseline_comparison.json`。此目錄僅保存研究材料，未清除。

## 相關連結

- [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層|Agent Reach]]
- [[Github/repos/iFixAi — AI Agent 行為與治理稽核工具|iFixAi]]
- [[Social/Threads/AI 搜尋工具：AnySearch|既有 AnySearch Threads 留存]]
- [[Github/_index|Github Repo 分析總索引]]
