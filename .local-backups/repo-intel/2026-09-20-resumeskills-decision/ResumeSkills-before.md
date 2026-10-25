---
source: "https://github.com/Paramchoudhary/ResumeSkills"
author: "Paramchoudhary"
stars: "2.3K"
clipped: 2026-09-20
tags:
  - github/repo
  - career
  - agent-skills
---

# ResumeSkills — 履歷與求職提示技能集

## 一句話說明

ResumeSkills 是 22 個履歷、職缺分析、面試與申請文字的 Markdown skills；適合挑選方法參考，目前不建議整包安裝進既有求職流程。它沒有自帶 ATS parser、PDF renderer 或職缺搜尋服務。

分析日期：2026-09-20。固定版本：[74ae19e7c62b0516d1c298328e5544976c12da5d](https://github.com/Paramchoudhary/ResumeSkills/tree/74ae19e7c62b0516d1c298328e5544976c12da5d)。上游文件是分析材料，未作為本機操作指令執行。

## 專案概覽

| 項目 | 本輪快照 |
|---|---|
| Stars | 2,357 |
| Forks | 200 |
| 主要語言 | Markdown、JSON；GitHub language 欄位為 null |
| 授權 | MIT |
| 建立時間 | 2026-01-30 |
| 最後推送 | 2026-06-19 07:20:29 UTC |
| Open Issues / PRs | 3 / 2；API open_issues_count=5 包含 PR |
| Release | releases API 回傳空陣列；config.json 的 1.0.0 不是已發布 Release |
| 貢獻者 | Paramchoudhary 6、bullet-ant 1、Vswaroop04 1 commits |
| 近四週 commits | 0，查詢自 2026-08-23 起 |
| Homepage / Topics | 未設定 / 空陣列 |
| Archived | false |

來源：[GitHub metadata](https://api.github.com/repos/Paramchoudhary/ResumeSkills)、[contributors](https://api.github.com/repos/Paramchoudhary/ResumeSkills/contributors)、[issues / PRs](https://github.com/Paramchoudhary/ResumeSkills/issues)、[releases](https://github.com/Paramchoudhary/ResumeSkills/releases)。星數是關注訊號，不是履歷成效證據。

## Repomix 深度分析與限制

原始碼研究採唯讀方式，Repomix 未執行；未建立 npm cache、clone、安裝或執行目標 repo。以 GitHub API 固定 SHA，再於記憶體解開該 SHA 的 codeload archive。沒有 AST 分析或 token 統計，不能把下列字元數當 tokens。

完整檔案清冊：82 個非目錄項目，由 22 個主 skills、7 個相同內容副本、49 個 symlinks、README、CONTRIBUTING、LICENSE、config.json 組成。主 skills 合計 212,192 個 Unicode 字元。

| 主 skills 最大五檔 | 字元數 |
|---|---:|
| resume-bullet-writer/SKILL.md | 14,183 |
| job-description-analyzer/SKILL.md | 13,544 |
| interview-prep-generator/SKILL.md | 12,021 |
| salary-negotiation-prep/SKILL.md | 10,627 |
| tech-resume-optimizer/SKILL.md | 10,496 |

全文精讀 ATS optimizer、quantifier、tailor、job-description-analyzer、application-form-filler 與 plugin config；其餘 skills 檢查結構與相關段落，未逐一進行使用者案例試跑。未見程式碼套件、測試或 CI workflow；沒有可直接執行的產品測試套件。

## 核心功能

| 類別 | 能做什麼 | 實際邊界 |
|---|---|---|
| 履歷改寫 | 選材、調整摘要與 bullets、格式檢查 | 由宿主模型讀文字並產生建議 |
| 職缺分析 | 分 required / preferred、缺口、關鍵字 | 分數是提示內的人工規則，非雇主評分 |
| 申請文字 | Cover letter、cold email、申請表短答 | 不提供真正的送信或填表引擎 |
| 面試準備 | STAR 題庫與回答長短版本 | 故事細節仍需逐项確認 |
| 薪資與 offer | 市場調查提示、counter-offer、總報酬比較 | 沒有即時薪資資料庫或幣別驗證機制 |
| 版本管理 | Master resume、檔名、申請追蹤模板 | 沒有 tracker backend 或資料一致性驗證 |

最值得借用的是 [application-form-filler](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/application-form-filler/SKILL.md)：先讀 CV、JD 和實際問題，每項經驗連回真實專案，間接經驗要說清楚，按欄位長度作答。這對準備 Sumsub 申請短答有用，但不授權實際送出申請。

## 技術架構

```text
履歷與 JD
    |
宿主 AI 讀取 SKILL.md
    +-- 需求分類／文字比對／啟發式計分
    +-- 選材／改寫／STAR／短答
    |
文字稿與檢查清單
    |
實際文件輸出與驗證：仍靠宿主工具和本機流程
```

`skills/` 有 22 份主 skills；`.agents/skills/` 只有 7 份副本，本輪比對與主檔內容相同。`.codex/skills/` 等七個工具目錄各有 7 個 symlinks，共 49 個；不是每個工具目錄都包含 22 個 skills。Windows checkout 的 symlink 行為未實機安裝驗證。

README 與 `.claude-plugin/config.json` 仍列 20 個，漏掉六月新增的 cold-email-writer、application-form-filler；config.repository 仍指向 `yourusername/resume-skills`。這是包裝與文件未同步的證據，不能推論標準 CLI 安裝一定失敗。Open PR #6 正在處理技能入口與 marketplace 問題，本輪未合併。來源：[固定版本結構](https://github.com/Paramchoudhary/ResumeSkills/tree/74ae19e7c62b0516d1c298328e5544976c12da5d)、[config](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/.claude-plugin/config.json)、[PR #6](https://github.com/Paramchoudhary/ResumeSkills/pull/6)。

## 主要發現

1. **量化範例會引入沒有根據的數字。** Quantifier 要求每個 bullet 都有數字，範例把使用者的「retained most」寫成 95% retention；即使另有保守估計與不能誇大的提醒，這個具體示範仍超出輸入證據。不能用來補 BTSE、Trend Micro 或 ASML 沒有紀錄的績效百分比。[resume-quantifier:294–312](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/resume-quantifier/SKILL.md#L294-L312)

2. **配對分數不能代表錄取率或 ATS 通過率。** ATS skill 以命中關鍵字數除以所需字數；JD analyzer 用 required 70%、preferred 30%，並把 90–100% 定義為 overqualified。完全符合條件本身不支持這個判斷。repo 沒有提供雇主資料、校準或實際 parser 測試。[ATS optimizer](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/resume-ats-optimizer/SKILL.md)、[JD analyzer:87–110](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/job-description-analyzer/SKILL.md#L87-L110)

3. **STAR 展開需要事實閘門。** 面試 skill 示範从一條 team/product launch bullet 擴寫市場背景、解決三次衝突、50 位客戶及獎項。這是示例，不是你的履歷證據；使用時應先詢問缺失資訊，不能自動補齊故事。[interview-prep-generator:118–143](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/interview-prep-generator/SKILL.md#L118-L143)

4. **有些方法與目前履歷規則不同。** Tailor 建議把較舊但相關的工作搬到前面；你的履歷保留既有 chronology，適合重排同職位 bullets 與摘要，不能照此改工作排序。ATS skill 還建議必要時只顯示年份，亦不應拿來模糊目前明確的工作月份。[resume-tailor:46–54](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/resume-tailor/SKILL.md#L46-L54)

5. **成效宣傳缺少佐證。** README 的 ATS 淘汰率、面試倍數與節省求職時間等宣稱，相關段落沒有附研究或評測資料。本次不採為有效成效證據。[README:141–159](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/README.md#L141-L159)

6. **解除安裝範例範圍過廣。** README 用 `resume-*` wildcard 刪除 skills，可能波及不屬於本 repo 的同前綴技能，未限制安裝清單。這些指令本輪未執行。[README:66–75](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/README.md#L66-L75)

## 社群健康度與證據限制

目前主要維護者一人、兩位其他貢獻者；沒有 Release，近四週沒有 commit，不能單憑此判定專案已停止維護。未將 issue #4 的使用者自述安全評估當成獨立安全認證。

已嘗試 Agent Reach 能力檢查與 OpenCLI 社群讀取；另以公開網頁搜尋補充。搜尋結果以 skills 目錄轉載為主，不足以證實求職成效。沒有官方 homepage，因此未啟動 defuddle；YouTube 為選配，本輪未查。沒有做完整安全稽核、安裝或 Windows 跨宿主相容性測試。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Web3 求職主線 | 與現有 resume-architect、evidence matrix、application packet 大量重疊；現有流程更符合可追溯事實與 chronology 限制 |
| Sumsub L3 履歷 | 已有職缺對照、兩頁 PDF 與文字／視覺檢查，不需要為此改換工具；不可補出 Kibana、SDK 或未知薪資 |
| Codex | SKILL.md 形式可供參考，但不代表 22 項已載入、可執行或驗證；不自動安裝 |
| Obsidian | 保存判斷與來源；不另建投遞帳本，不改既有權威 tracker |
| Automation | 沒有新增可靠的 parser、文件產出、求職搜尋或提交能力 |

## 安裝建議

⏳ **目前不整包安裝。** 保留現有 resume-architect 為主要流程，選讀 application-form-filler 的回答結構與 resume-tailor 的真實選材原則即可。若未來正式採用任何 skill，先移除無證據量化、錄取率式解讀、任職時間重排與未授權外部動作，並用已知履歷做實例驗證；這些是採用條件，本輪未修改或安裝 skills。

## 相關連結

- [[Github/_index|GitHub repo 分析索引]]
- [[Github/repos/career-ops — AI 驅動求職自動化指揮系統|career-ops]]
- [[Github/repos/ai-job-search — Claude Code 原生的本機求職應徵框架|ai-job-search]]

本報告僅保存公開 repo 分析，不收錄履歷聯絡資料。未變更履歷、tracker、Memory、AGENTS、Git 或外部系統。
