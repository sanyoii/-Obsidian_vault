---
source: "https://github.com/codeman008/awesome-distillhub-persona-skills"
author: "codeman008"
stars: "76"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "persona"
  - "skill-catalog"
---

# awesome-distillhub-persona-skills — 人格技能目錄與交付證據評估

## 一句話說明

這是一份人格、方法論與 DistillHub 工具的 GitHub 連結目錄。固定版本只交付 README，沒有實際 Skill 檔或客戶端。建議只作發現線索，不把這個 repo 當成可安裝的技能包，也不照未驗指令接入 Codex。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Repository | codeman008/awesome-distillhub-persona-skills |
| Stars / Forks | 76 / 18 |
| 主要語言 | API null；實際內容為 Markdown |
| 授權 | API null、沒有 LICENSE；README 的 CC0 徽章與末尾非商業聲明口徑不一致 |
| 建立時間 | 2026-04-08 06:13:59 UTC |
| 最後推送／tip | 2026-04-20 02:59:28 UTC |
| 固定 SHA | `dcd58e393f63ce296938534dff182ad7a88deeac`，main |
| Open Issue / PR | 1 / 0 |
| Release / Homepage / Topics | 0 / 無 / 空 |
| Archived | false |

研究由 subagent 唯讀檢視 API、固定來源與連結，主代理下載同版、跑 Repomix 與結構核對。[固定來源](https://github.com/codeman008/awesome-distillhub-persona-skills/tree/dcd58e393f63ce296938534dff182ad7a88deeac)。

## Repomix 深度分析

| 指標 | 本次結果 |
|---|---|
| 工具 | Repomix 1.18.1，既有 task-local CLI |
| 打包檔案 | 1，README.md |
| 總 Tokens / 字元 | 6,903 / 18,126 |
| README tokens | 6,550，占 94.9%；其餘為打包資訊 |
| 模式 | XML，未使用 --compress，使用 --no-gitignore |
| 安全掃描 | 未偵測可疑檔案；不代表下游連結、服務或授權已驗證 |

只有一個來源檔，因此沒有五個檔案可排行。下載來源共一份 README，248 行、23,135 UTF-8 bytes。**SKILL.md、.skill、程式、測試、CI、package manifest 都是 0**；沒有適用的程式 AST 或 runtime 測試對象。

## 核心功能

實際功能是分類與指向下游 repository。九個 persona 分類表合計 72 列、70 個唯一 GitHub 連結，bazi-skill 與 anti-distill 各重複一次。

| 分類 | 表列數 |
|---|---:|
| 核心蒸餾器 | 12 |
| 職場 | 7 |
| 情感／關係 | 8 |
| 方法論 | 23 |
| 流行文化 | 8 |
| 玄學 | 5 |
| 平台編排 | 4 |
| 倫理／隱私 | 3 |
| 數位遺產 | 2 |

README 還有技能商店參考表、DistillHub 工具箱與投稿規則。這些列表沒有提供本 repo 的連接實作、測試報告或服務入口。

### 宣稱與實際交付的差距

| README 宣稱 | 固定版可確認的內容 |
|---|---|
| 市場一鍵匯入、拖曳 .skill | 沒有 .skill 或客戶端可下載 |
| distillhub import 指令 | 文件裡有指令，repo 沒有 CLI 實作或安裝說明可驗 |
| 熱更新、群聊編排、零雲端模式 | 工具名稱與描述；沒有 schema、runtime 或測試證據 |
| 完整思維方式、真實同事習慣與決策 | 沒有來源樣本、引文映射、prompt、評分或對照實驗 |
| 收錄已在客戶端測試通過的 Skill | 投稿準則，沒有對每列附通過紀錄 |

使用與人格宣稱見固定 [README 使用指南](https://github.com/codeman008/awesome-distillhub-persona-skills/blob/dcd58e393f63ce296938534dff182ad7a88deeac/README.md#L16)、[人格描述](https://github.com/codeman008/awesome-distillhub-persona-skills/blob/dcd58e393f63ce296938534dff182ad7a88deeac/README.md#L84)、[工具箱](https://github.com/codeman008/awesome-distillhub-persona-skills/blob/dcd58e393f63ce296938534dff182ad7a88deeac/README.md#L221)。DistillHub 的價格、服務存在與實際資料流在本次資料裡未獲證實，不能推定免費或完全本地。

## 技術架構

```text
README 分類表
      |
      +-> 下游 GitHub repos（各自需另審）
      |
      +-> DistillHub 操作描述（無本 repo 實作）
```

這是目錄結構，沒有可追蹤的執行路徑。README 無 Skill frontmatter；不能把不同下游的 .skill、SKILL.md 或自有格式視為 Codex 相容。

### 抽樣連結

Subagent 用公共 GitHub API 抽查六個同作者工具及一個遺產項目，以下七個都回 404：distillhub-orchestrator、multi-persona-council、multimodal-distill、privacy-vault、ethical-guard、digital-legacy（以上 codeman008），以及 agenmod/immortal-blueprint-v2。

這代表此次公開查不到；原因可能是改名、私有或不存在，無法由 404 單獨判定。不能因此把整份目錄都說成假連結，也不能將這七個當已可用工具。[相應編排與隱私表](https://github.com/codeman008/awesome-distillhub-persona-skills/blob/dcd58e393f63ce296938534dff182ad7a88deeac/README.md#L188)、[遺產表](https://github.com/codeman008/awesome-distillhub-persona-skills/blob/dcd58e393f63ce296938534dff182ad7a88deeac/README.md#L211)。

## 社群健康度與來源爭議

全歷史 10 個 commit，貢獻者 codeman008 的 API 計數為 10；近四週沒有 commit。沒有 release 或 CI。Stars 低於 1,000，本次沒有強制做社群／YouTube 搜尋，不能形成整體口碑結論。

唯一 open Issue #1 由另一份 persona 目錄的維護者提出，質疑上游內容的來源說明與當時授權標示。目前 README 徽章是 CC0，但沒有 LICENSE，末尾又聲明限非商業學研；Issue 還 open、沒有 comments。這是未釐清的來源與授權異議，不能據此裁定抄襲或違法。[Issue #1](https://github.com/codeman008/awesome-distillhub-persona-skills/issues/1)、[目前聲明](https://github.com/codeman008/awesome-distillhub-persona-skills/blob/dcd58e393f63ce296938534dff182ad7a88deeac/README.md#L240)。

下游 repository 的授權也不能由此目錄的徽章涵蓋；若要重用實際方法或內容，應以該下游自己的來源及授權為準。

## 本機驗證

| 已驗 | 邊界 |
|---|---|
| API metadata、固定 SHA tree、下載檔案 | 確認單一 README；未執行 distillhub import |
| Repomix | 1 檔成功打包；掃描器沒有 runtime 可驗 |
| 完整 README 與表列 | 分類、宣稱、缺少 Skill 入口與授權口徑已核對 |
| 七個公開連結抽樣 | 404；未審核全部 70 個下游 |
| 未驗項目 | 客戶端、登入、費用、人格效果、個資輸入、Codex 相容性與下游安裝 |

task-local 證據在 `work/repo-intel/persona-skills-20261014/`：metadata.json、persona-skills.xml、repomix.log 與固定來源 README。這些是工作區檔案，沒有另存成 Wiki 附件。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian Wiki | 保存分類與候選連結即可；每列只是線索 |
| Codex | 沒有可直接安裝的 Skill，沒有已驗連接器或 MCP |
| 多角色討論 | 目的和既有 council-local、yongli-council、native subagents 重疊；沒有可比較實作支持新增編排層 |
| Prompt／角色製作 | 既有 prompt-master、eli5、grok-bot-team-design 可用；此目錄未證明補足方法缺口 |
| Automation | 沒有程式可接線；不新增自動匯入、熱更新或人格資料收集 |

## 安裝建議

**⏳ 僅保留發現清單，不安裝此 repo。** 想採用某一角色方法時，應先選定實際解決問題的一個下游 repo，確認內容存在、來源可追溯、授權與相容，再比較是否勝過現有方法。這次沒有選定或安裝任何下游。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
