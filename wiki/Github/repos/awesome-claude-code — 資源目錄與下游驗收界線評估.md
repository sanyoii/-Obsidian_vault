---
source: "https://github.com/hesreallyhim/awesome-claude-code"
author: "hesreallyhim"
stars: "55.7K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "reference"
---

# awesome-claude-code — 資源目錄與下游驗收界線評估

## 一句話說明

這是 Claude Code 的 tools、hooks、commands、Skills 與工作流資源索引，由 CSV 生成多種 README。適合查具體缺口，再審核單一候選；本 repo 不是可整包安裝的 plugin，也沒有保證下游安全或 Codex 相容。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Stars / Forks | 公開 HTML embedded JSON：55,664 / 4,820 |
| 主要語言／內容 | Python 維護腳本、CSV 資源表、Markdown 目錄 |
| 授權 | LICENSE：CC BY-NC-ND 4.0；各下游另有授權 |
| 固定 SHA | f51b5f338c8ea34adff134002a8d8eb59658e891 |
| 分支／Archived | main／false |
| Watchers／commits | HTML 331／2,121；不是貢獻者人數 |
| API 限制 | REST 403，建立／push／issue／release 精確資料未取得 |

[固定來源](https://github.com/hesreallyhim/awesome-claude-code/tree/f51b5f338c8ea34adff134002a8d8eb59658e891)、[LICENSE](https://github.com/hesreallyhim/awesome-claude-code/blob/f51b5f338c8ea34adff134002a8d8eb59658e891/LICENSE)。

## Repomix 深度分析

Repomix 1.18.1，XML、未 compress、--no-gitignore：55 檔、396,950 tokens、1,394,931 字元。下載來源 56 檔，27 Python；掃描器未偵測可疑檔案。

| Top 5 | Tokens | 佔比 |
|---|---:|---:|
| README_ALTERNATIVES/README_FLAT_ALL_AZ.md | 85,533 | 21.5% |
| README_ALTERNATIVES/README_EXTRA.md | 75,219 | 18.9% |
| README.md | 72,079 | 18.2% |
| README_ALTERNATIVES/README_CLASSIC.md | 35,988 | 9.1% |
| THE_RESOURCES_TABLE_NEW.csv | 31,084 | 7.8% |

多份生成 README 重複同一批資源，不能把 tokens 當獨立工具數。

## 核心功能

CSV 有 252 列：Active TRUE 241、FALSE 11，config 有 23 類。Stale 全部 FALSE 只代表欄位值，沒有證明 241 個候選都通過安全或 runtime 驗收。Testing、Observability、Usage/Cost 等分類可用來找實際缺口。

維護流程支援提交資源、分類校驗、README 生成與 ticker。使用目錄不需執行維護腳本或上游 workflow。[資源表](https://github.com/hesreallyhim/awesome-claude-code/blob/f51b5f338c8ea34adff134002a8d8eb59658e891/THE_RESOURCES_TABLE_NEW.csv)。

## 技術架構

```text
CSV（資源真相）+ category config + templates
          -> generate_readme.py（只收 Active、核對 category）
          -> README 與替代版
PR/提交 workflow -> 審查/生成/通知
```

目錄內的 Python 是維護系統，不是下游 tools 的實作。

### 操作與安全界線

Makefile 包含建 venv／pip、寫生成檔、pre-commit install、token ticker 與 gh 開 issue。上游 regenerate workflow 也有 commit/push。這次沒有執行任何 maintenance；README 內外部安裝指令也沒有執行。

SECURITY.md 明說本質為 Markdown 清單，第三方問題要走各自 security policy，且維護者沒有能力或義務全面調查第三方。curated 不能讀成 audited。Claude 的 hooks／statusline／slash commands 也不能當作 Codex 原生可用。[安全政策](https://github.com/hesreallyhim/awesome-claude-code/blob/f51b5f338c8ea34adff134002a8d8eb59658e891/SECURITY.md)、[Makefile](https://github.com/hesreallyhim/awesome-claude-code/blob/f51b5f338c8ea34adff134002a8d8eb59658e891/Makefile)。

## 社群健康度

目錄有持續維護的 plumbing、六個測試檔與五個 workflows；本輪沒有確認 CI 執行結果。精確 REST metadata 受限，社群資料不足以推論下游品質。此日期的 HTML 數字只作規模參考。

## 本機驗證

56 檔盤點、27 Python AST 通過，CSV 欄位和生成結構已核對。未執行六個測試檔，未審核 241 個 active 下游、未安裝工具或更改 hooks。工作區證據：work/repo-intel/awesome-claude-code-20261014/ 的 fixed-source.json、repomix.log、repomix.xml 與固定來源。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 收藏索引和評估入口，不整包複製資源表 |
| Codex | 對具體候選做相容性審核，沒有整包接線 |
| QA | Testing／Observability 的候選值得查，但沒有明確缺口就不新增 |
| Automation | 不啟用提交、ticker、生成或 hooks |

## 安裝建議

**⏳ 下游逐項審核；推薦收藏為發現清單。** 先確認缺少哪個工作結果，再挑一個候選固定版本比對，避免疊加用途相同的 Skills。此目錄授權和下游授權分開，這次不改全域配置。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]

