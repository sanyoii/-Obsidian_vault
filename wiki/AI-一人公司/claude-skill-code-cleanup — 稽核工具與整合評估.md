---
source: "https://github.com/Hao0321/claude-skill-code-cleanup"
author: "Hao0321"
stars: "73"
clipped: 2026-09-09
tags: [github/repo, ai-company, code-audit, skills]
---

# claude-skill-code-cleanup — 稽核工具與整合評估

## 一句話說明

適合為 AI 一人公司提供可重現的稽核候選；先採用 code-cleanup-helper，不把整套研發流程一起導入。它能減少機械式檢查，但不能代替主模型理解文件語意與授權。

## 專案概覽

以下是本次對話查詢 GitHub API 的快照，不代表持續更新。

| 項目 | 結果 |
|---|---|
| Stars | 73 |
| Forks | 11 |
| 核心語言 | Python；方法文件為 Markdown |
| 授權 | MIT |
| 最新 Release | v0.21.0，2026-08-31 |
| 原始碼版本 | `7f147ce60e40e10e2c82232861bec9f1ee6bcd93` |
| 版本差異 | main 含 9/4 尚未標記 Release 的安全強化 |
| 公開驗證 | 有 self-test 原始碼；本次 Actions API 未回傳執行紀錄 |

來源：[repository](https://github.com/Hao0321/claude-skill-code-cleanup)、[固定版本 README](https://github.com/Hao0321/claude-skill-code-cleanup/blob/7f147ce60e40e10e2c82232861bec9f1ee6bcd93/README.md)。

## 核心功能

- `code-cleanup-helper`：唯讀檢查相同段落、命名、文件長度、引用、Python 架構與版本／資產一致性。
- `run-benchmark-driven-rd`：保存 baseline、實驗及 promotion 證據，控制已授權的研發流程。
- 狀態區分 PASS、FAIL、REVIEW、NOT_CHECKED，未檢查不當成通過。

基本 Cleanup audit 使用標準函式庫；完整 token 量測與部分驗證需要 `tiktoken==0.11.0`，首次 tokenizer 資料可能需要下載。[依賴](https://github.com/Hao0321/claude-skill-code-cleanup/blob/7f147ce60e40e10e2c82232861bec9f1ee6bcd93/requirements.txt)

## 技術架構

```text
audit.py CLI → audit_core.py → inventory／規則檢查／Python AST → human 或 JSON 報告
                                      ↓
                           主模型判讀或 R&D gate 消費
```

程式支援 `--mode a|b|architecture|all`、`--config`、`--format json`；`--strict` 在有 FAIL 時回傳非零，不表示自動修正。[CLI 原始碼](https://github.com/Hao0321/claude-skill-code-cleanup/blob/7f147ce60e40e10e2c82232861bec9f1ee6bcd93/code-cleanup-helper/scripts/audit.py)

## 已確認的能力邊界

1. 重複偵測主要抓正規化後相同段落；不同措辭的契約衝突仍需人工判讀。
2. Python AST 解析不等於 JavaScript／TypeScript 依賴圖也已解析。
3. Markdown link 檢查不等於完整 Obsidian wikilink、能力表及 SCHEMA 驗證。
4. 通用行數門檻只提供檢查訊號，不能因超標就自動拆檔。

來源：[Mode A 判讀規則](https://github.com/Hao0321/claude-skill-code-cleanup/blob/7f147ce60e40e10e2c82232861bec9f1ee6bcd93/code-cleanup-helper/references/mode-a.md)、[audit_core.py](https://github.com/Hao0321/claude-skill-code-cleanup/blob/7f147ce60e40e10e2c82232861bec9f1ee6bcd93/code-cleanup-helper/scripts/audit_core.py)。

## 與 AI 一人公司的整合

推薦流程：限定範圍 → Cleanup 報告 → 主模型核對 SCHEMA 與上下文 → 授權內修正 → 既有 build／tests 驗收。

第一次先以 librarian、content-pipeline 等代表性 skills 試作；擴大前配置排除 Sessionlog、歷史備份、私人材料及 skills 別名。不要直接全庫 strict，避免歷史與合理重複造成噪音。工具不取代既有 quality-gate，也不另建研發總帳。

## 安裝建議

✅ **值得限定範圍試用 code-cleanup-helper；尚未安裝。** 暫不一起導入 run-benchmark-driven-rd。固定 commit 與設定，先量測誤報及實際找到的問題，再決定擴大。

接好後的使用指令：

> 用 code-cleanup-helper 唯讀檢查本次修改涉及的 skills，列出可定位的問題；再由主模型核對 SCHEMA，區分真正衝突、合理重複與未驗證項目。

## 驗證範圍

已讀 GitHub API、README、Skill、依賴、audit CLI、核心分析程式及 Mode A 規則。未安裝、未執行上游程式或 self-test。Repomix 因分析階段唯讀未執行，無 token 統計；原始碼採定向閱讀，不宣稱全庫安全審計。無外部首頁，未啟用文件站擷取；低於 1,000 stars，未做社群與教學搜尋。

## 相關連結

- [[AI-一人公司/_index|AI-一人公司分類]]
- [[AI-一人公司/video-autopilot-kit — 影片 QA 與整合評估|Video Kit 整合評估]]
