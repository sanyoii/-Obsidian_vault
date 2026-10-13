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
| 面試準備 | STAR 題庫與回答長短版本 | 故事細節仍需逐項確認 |
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

3. **STAR 展開需要事實閘門。** 面試 skill 示範從一條 team/product launch bullet 擴寫市場背景、解決三次衝突、50 位客戶及獎項。這是示例，不是你的履歷證據；使用時應先詢問缺失資訊，不能自動補齊故事。[interview-prep-generator:118–143](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/interview-prep-generator/SKILL.md#L118-L143)

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

⏳ **不整包安裝；優先引入 application-form-filler，接著改寫職缺篩選與面試準備。** 保留 resume-architect 為履歷主流程。完整 2／9／11 分類與採用條件見下節；內容判斷不代表安裝、觸發或求職成效已驗證。

## 採用決策：22 個 skills 分類

更新日期：2026-09-20。此節補充本 repo 的採用決策，評估版本仍為 `74ae19e7c62b0516d1c298328e5544976c12da5d`；不是重新取得的上游版本快照。依使用者指定的 decision-ready-answer 方法，對照現有 resume-architect 與台灣 Fully Remote QA／Technical Support 求職主線。

**推薦：先引入 application-form-filler，再改寫職缺篩選與面試準備；不整包安裝。** 22 個 skills 分為 2 個內容可直接採用、9 個值得改寫或局部吸收、11 個不值得引入。可直接採用是內容判斷，不代表安裝與觸發行為已實測。

### 可直接搬回來：2 個，目前只優先引入 1 個

| Skill | 採用時機 | 價值與條件 |
|---|---|---|
| application-form-filler | 優先 | 有 CV＋JD＋實際問題的輸入要求，經驗連回真實專案、區分直接與間接經驗、依欄位控制長度；補足履歷之外的申請表短答。 |
| reference-list-builder | 進入 reference check 階段再引入 | 推薦人選擇、徵求同意、職缺 briefing 與分享資料前確認等方法完整，目前不必提早常駐。 |

共同接線規則：缺少的年資或資料保留 Unknown；使用既有職涯來源；聯絡、提交與外部操作另需明確授權。兩者核心方法不需大幅重寫，但仍須做本機觸發與輸出驗證。

### 值得改寫或局部吸收：9 個

| Skill | 保留的價值 | 必須改寫的內容 | 建議落點 |
|---|---|---|---|
| job-description-analyzer | 必要／加分條件拆解、缺口與投遞優先序 | 移除任意配對百分比及完全符合＝overqualified；先查台灣聘僱、全遠端、聘僱型態與班表，再區分直接／相鄰／未證實能力。 | 優先，求職篩選流程；與 resume-architect 分工。 |
| interview-prep-generator | 職缺題目、STAR 素材、長短回答版本 | 不得從履歷 bullet 補出衝突、客戶數或獎項；先問缺失事實，一次一題，保留原答／重答，評分後才給校準答案。 | 優先，接入既有面試練習流程。 |
| portfolio-case-study-writer | Problem → Process → Solution → Results、不同閱讀深度 | 改成 QA／Support 的 requirement、risk、oracle、調查過程及證據限制；移除強制量化／附圖，加入保密與個人／團隊貢獻界線。 | 既有 case-study 方法的補充。 |
| salary-negotiation-prep | 行情研究、書面 offer、附理由的 counter-offer | 必記幣別、月／年薪、地區、來源日期、雇主揭露或平台估計；移除無來源統計、美國預設與一律談判規則。 | 薪資研究與談判模組。 |
| offer-comparison-analyzer | 首年／經常性報酬、非金錢因素、個人優先序 | 分開保證現金、目標獎金與股權情境；福利估值不當實領薪資；增加台灣聘僱／EOR／承攬、工時與 on-call 比較。 | 與薪資模組共用資料，不另建帳本。 |
| cold-email-writer | 公司具體資訊＋相關經歷＋低壓力邀請 | 移除固定 150 字下限、仍在職假設及含糊跨國聘僱表述；簡短說明 Taiwan／UTC+8 與聯絡目的。 | 對外文字模組，只產草稿。 |
| cover-letter-generator | 公司需求與候選人證據的連結 | 移除固定 250–400 字、強制數字、刻意 hook 和配對分數；依實際申請要求決定篇幅。 | 與 cold email 共用方法，不必各裝一個。 |
| linkedin-profile-optimizer | Headline／About／Experience／Featured 的分工 | 移除填滿 skills、曝光倍數與未驗證排序說法；平台限制當次查證，公開履歷保持一致。 | 既有 profile 內容流程的補充。 |
| career-changer-translator | 讓目標產業理解原有經驗的語言轉換 | 禁止新增數字、改職稱／責任／年資或把相鄰經驗寫成直接經驗。 | 吸收進 resume-architect，不獨立安裝。 |

共通改寫原則：缺資料先問或保留 Unknown，不能在稿件完成後才檢查。面試與轉職的上游示例會展開出原輸入沒有的細節；示例不能作為候選人事實。

### 不值得引入：11 個

這一類區分方法不適合、能力重複及目標不符；不是斷言每份內容對所有人都沒有價值。

| Skill | 判斷與理由 |
|---|---|
| resume-quantifier | 不採這套方法：強制每個 bullet 有數字，且示例把 retained most 改成 95%；現有 resume-architect 已有補問真實 metrics 的方法。 |
| resume-ats-optimizer | 不安裝：沒有實際 ATS parser；主要新增內容是未校準分數，格式清單不比現有 PDF 文字／順序／視覺驗證更具體。 |
| resume-bullet-writer | Action／scope／result 與 STAR 已具備，另帶估算數字傾向，新增價值低。 |
| resume-tailor | 既有 resume-architect 已涵蓋，且任職重排建議與目前 chronology 規則不同。 |
| resume-formatter | 通用排版清單可讀，但無 renderer 或驗證程式；現有 PDF／DOCX 方法與版型已足夠。 |
| resume-section-builder | 摘要、技能、經歷與學歷的通用組稿規則，現有流程已涵蓋。 |
| tech-resume-optimizer | 主要是 SWE／PM／Data 通用建議，沒有足夠 QA／Support 專屬增量。 |
| resume-version-manager | 已有 master、application packets 與權威 tracker，再加資料夾與追蹤表會增加維護負擔。 |
| executive-resume-writer | C-suite／VP、P&L、組織轉型定位不符目前目標，不能只因年資長就套用。 |
| academic-cv-builder | 學術職缺、論文、研究與補助，不在目前求職主線。 |
| creative-portfolio-resume | 設計／創意職的雙版本策略，目前 QA／Support 投遞不需要。 |

### 執行優先序與驗收條件

1. **application-form-filler**：支援目前及後續申請表。以現有履歷＋官方 JD＋實際問題試跑，逐項核對事實、字數與 Unknown；只產草稿。
2. **職缺篩選方法**：先判台灣聘僱、Fully Remote、工作條件，再做能力對照。以已知可投／不符／未知的案例驗證，不產錄取率或 ATS 通過率。
3. **面試準備方法**：使用真實案例與既有練習紀錄，一次一題；驗證原答保留、先評分後校準及缺資料不編造。

其餘等 cover letter、LinkedIn 更新、reference check 或 offer 的實際需求出現再處理。此節是採用決策；使用者後續明確授權的三項執行結果見下方「已執行狀態」。

### 分類來源

以上分類是對下列固定版本原文與既有 resume-architect 的比較判斷，不是上游官方背書。原始碼全文／重點段落與目錄結構已檢視；22 個 skills 未逐一執行實例測試。

- [固定版本全部 skills](https://github.com/Paramchoudhary/ResumeSkills/tree/74ae19e7c62b0516d1c298328e5544976c12da5d/skills)
- [application-form-filler](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/application-form-filler/SKILL.md)
- [reference-list-builder](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/reference-list-builder/SKILL.md)
- [job-description-analyzer](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/job-description-analyzer/SKILL.md)
- [interview-prep-generator](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/interview-prep-generator/SKILL.md)
- [resume-quantifier 的量化範例](https://github.com/Paramchoudhary/ResumeSkills/blob/74ae19e7c62b0516d1c298328e5544976c12da5d/skills/resume-quantifier/SKILL.md#L294-L312)

## 已執行狀態 — 2026-09-20

使用者在保存分類後明確要求「按照建議處理」，本輪完成優先三項。前面的 2／9／11 是採用分類；目前實際為 **1 個上游引入並補強、2 個本機改寫，合計 3 個已安裝，其他 19 個未安裝**。

| 已安裝 skill | 本輪處理 | 主要行為 |
|---|---|---|
| [application-form-filler](C:/Users/sanyo/.codex/skills/application-form-filler/SKILL.md) | 固定上游 commit 安裝，保留問題結構，補事實與操作界線 | 依 CV／JD／實際題目產短答，未知必填值不猜；不自動填表或送出。 |
| [job-description-analyzer](C:/Users/sanyo/.codex/skills/job-description-analyzer/SKILL.md) | 本機改寫 | 先查 Taiwan／Fully Remote／聘僱與班表條件，再做證據對照；無配對百分比。 |
| [interview-prep-generator](C:/Users/sanyo/.codex/skills/interview-prep-generator/SKILL.md) | 本機改寫 | 一次一題，先評分後校準，保留原答／重答，缺 oracle／severity 定義先澄清。 |

三個 skill 均保留上游出處與 MIT LICENSE，已產生 agents/openai.yaml，維持預設可自動選用。resume-architect 未更動。檔案已安裝；下一輪 runtime 發現與自動觸發尚待實際使用，未宣稱本輪已載入。

驗證：官方 quick_validate.py 三項 exit 0；installed 與 staged 稿逐字相同、UI metadata 與授權檔讀回通過。另做 8 個主模型案例走讀，涵蓋語言／年資 Unknown、Taiwan Unknown、US-only 不符、已符合條件的正例、不得補面試成果、oracle 澄清及重答保留。這不是獨立模型評測或真實 ATS 測試。

完整驗證與限制：[本機驗證紀錄](D:/Codex/Web3/application-packets/2026-09-20-career-skills/verification.md)。既有 Web3 dirty worktree 與 resume-architect hash 未變；未改履歷、投遞 tracker、Memory、AGENTS，未提交、送信或發布。

## 相關連結

- [[Github/_index|GitHub repo 分析索引]]
- [[Github/repos/career-ops — AI 驅動求職自動化指揮系統|career-ops]]
- [[Github/repos/ai-job-search — Claude Code 原生的本機求職應徵框架|ai-job-search]]

本報告僅保存公開 repo 分析，不收錄履歷聯絡資料。未變更履歷、tracker、Memory、AGENTS、Git 或外部系統。
