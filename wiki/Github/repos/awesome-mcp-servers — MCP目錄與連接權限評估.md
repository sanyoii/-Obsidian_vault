---
source: "https://github.com/punkpeye/awesome-mcp-servers"
author: "punkpeye"
stars: "96.3K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "reference"
---

# awesome-mcp-servers — MCP目錄與連接權限評估

## 一句話說明

這是公開 MCP server repository 的分類目錄，讓人發現可連接軟體與資料服務的候選。適合收藏搜尋；清單不交付自己的 server runtime，也不替下游的權限、授權或安全背書。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Stars / Forks | 公開 HTML 約 96.3K / 17.6K，非精確 API 值 |
| 主要語言／內容 | Markdown 目錄，無 Python 執行碼 |
| 授權 | MIT；這份清單的授權不涵蓋全部下游 |
| 固定 SHA | cc7f1f42c3fa8ced6fd5c0e02ea366ef7ed8cf1b，main |
| PR | HTML 約 2.8K；不是精確 API 計數 |
| Homepage | https://glama.ai/mcp/servers |
| 建立／push／release | API 限流，本輪未確認 |

[固定來源](https://github.com/punkpeye/awesome-mcp-servers/tree/cc7f1f42c3fa8ced6fd5c0e02ea366ef7ed8cf1b)、[LICENSE](https://github.com/punkpeye/awesome-mcp-servers/blob/cc7f1f42c3fa8ced6fd5c0e02ea366ef7ed8cf1b/LICENSE)。

## Repomix 深度分析

Repomix 1.18.1，XML、未 compress、--no-gitignore：12 檔、679,156 tokens、2,063,873 字元；安全掃描沒有可疑檔案。

| Top 5 | Tokens | 佔比 |
|---|---:|---:|
| README.md | 429,606 | 63.3% |
| README-fa-ir.md | 70,080 | 10.3% |
| README-th.md | 35,604 | 5.2% |
| README-ja.md | 33,340 | 4.9% |
| README-zh.md | 29,906 | 4.4% |

來源只有 12 檔，主要是目錄、翻譯與維護文件。沒有本 repo 的 MCP tools/API/auth 實作可做 runtime AST 驗證。

## 核心功能

- 按用途、實作語言、資源位置與平台分類候選。
- README 明說 production-ready 與 experimental 混合，不是全部可上正式環境。
- 範圍要求公開 GitHub repository、可自行安裝運行；remote-only URL 另有 awesome-remote-mcp-servers。
- official 標示 是作者／官方來源標示；Local／Cloud 標示 表示所連資源是本地軟體或遠端 API，不等於 transport、無網路或讀寫權限。
- ray.run 的 Ad 有明示；featured／平台排序不能當測試結果。

[README 範圍與圖例](https://github.com/punkpeye/awesome-mcp-servers/blob/cc7f1f42c3fa8ced6fd5c0e02ea366ef7ed8cf1b/README.md#L30)、[投稿範圍](https://github.com/punkpeye/awesome-mcp-servers/blob/cc7f1f42c3fa8ced6fd5c0e02ea366ef7ed8cf1b/CONTRIBUTING.md)。

## 技術架構

```text
Markdown分類與圖例 -> 下游 GitHub server
                    -> 個別安裝 / transport / credentials / permissions
Glama registry      -> 外部搜尋平台，另外驗證
```

不存在整包安裝這份索引的執行鏈。下游 stdio、HTTP、本地 process、雲端 endpoint 的安全與資料外送要各自讀實作；清單只給線索。

## 社群健康度與驗收界線

CONTRIBUTING 要求分類、簡介、字母排序與資訊正確，也提供 agent PR fast-track。這些是投稿機制，不足以宣稱每項已安全驗收。Glama 的 registry entries 或 quality grades 屬外部平台指標，不能當本清單 server 數量或本機 PASS。

社群有人認為目錄有助找工具，也反映安裝與配置需要別處處理；不是下游成功率證據。[目錄討論](https://www.reddit.com/r/MCPservers/comments/1ww9n7h/)、[配置討論](https://www.reddit.com/r/mcp/comments/1hdhl9w/)。

## 本機驗證

固定 SHA 下載、12 檔盤點與 Repomix 成功。沒有本 repo runtime 可測；未安裝任何下游、未登入服務、未調整 MCP 或讀 credentials。首頁資料依 subagent 公開來源研究；本次沒有把 Glama 行銷數字當作 repo 內容。證據：work/repo-intel/awesome-mcp-servers-20261014/ 的 fixed-source.json、repomix.log、repomix.xml。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 作 MCP 候選發現入口 |
| Codex | 當前已暴露的 connector 才是可用能力；清單不會自動增添工具 |
| QA | 評估候選時核對工具行為、scope、寫入、副作用與失敗結果 |
| Automation | 沒有具體缺口就不新增 connector 或認證 |

## 安裝建議

**⏳ 每個 server 單獨評估；推薦收藏索引。** 先知道要連哪份資料、做哪個動作，再固定候選版本並確認最小讀寫權限。現在不裝整包、不啟用新的連接器。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]

