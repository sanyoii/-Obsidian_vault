---
source: "https://github.com/Jakeschincariol/arena-skill"
author: "Jakeschincariol (Jake Schincariol)"
stars: "846"
clipped: 2026-10-21
tags:
  - github/repo
  - claude-code
  - multi-agent
  - evaluation
---

## arena-skill — 多策略答案淘汰賽與採用評估

> 分析日期：2026-10-21，Asia/Taipei。固定原始碼：`df07b8e518e10cdecd8cd7712d9958b6f396250e`。
> **⏳ 觀望，先收藏方法，暫不安裝。** 已讀完整核心狀態機、提示詞、評分規則與測試；Repomix、Python AST 語法及 JSON 格式檢查完成。未執行上游測試、Claude Code 競賽或真模型品質比較。

## 一句話說明

Arena 把同一題交給多位使用不同策略的子代理，再讓答案經過互相攻擊、修訂與裁判淘汰，留下最後一份答案。適合研究如何擴大候選解法；對目前 Codex 環境，預設成本與代理數量都超出日常用途，先參考機制較合適。

## 專案概覽

| 項目 | 本次證據 |
|---|---|
| Repository | Jakeschincariol/arena-skill |
| Stars / Forks | 846 / 135，公開 REST API 快照；網頁快取顯示 833 / 132，採 API 值 |
| Watchers | 6 |
| 主要語言 | Python |
| 授權 | MIT，根目錄含 LICENSE |
| 建立時間 | 2026-09-27T13:20:04Z |
| 最後推送 | 2026-09-27T13:20:07Z |
| 固定 commit 日期 | 2026-09-26T22:55:49Z；與推送時間分開記錄 |
| Open Issues / PRs | 2 / 1；API 的 open_issues_count=3 包含 PR |
| 最新 Release | 無 GitHub Release；plugin manifest 宣告 1.0.0 |
| 預設分支 / Archived | main / false |
| Repo 大小 | GitHub size=37 KiB |
| Topics | arena、claude-code、claude-skills、multi-agent、prompting、subagents、tournament |
| 首頁 | API homepage=null，沒有獨立文件站 |

來源：[Repository REST API](https://api.github.com/repos/Jakeschincariol/arena-skill)、[固定版本](https://github.com/Jakeschincariol/arena-skill/tree/df07b8e518e10cdecd8cd7712d9958b6f396250e)、[manifest](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/.claude-plugin/plugin.json)。數字僅代表本次查核。

## Repomix 深度分析

Repomix 1.18.1 對下載的固定 SHA 原始碼執行，使用 `--no-gitignore`，避免外層 work 目錄被忽略；未壓縮。exit code 0，XML 含 10 個檔案，30,380 tokens、115,555 字元。安全掃描未標記可疑檔案，這只代表掃描結果，不是沙箱或產品安全保證。

| 最大檔案 Top 5 | Tokens | 佔比 |
|---|---:|---:|
| skills/arena/bracket.py | 13,406 | 44.1% |
| tests/test_bracket.py | 5,367 | 17.7% |
| skills/arena/SKILL.md | 4,718 | 15.5% |
| README.md | 2,618 | 8.6% |
| skills/arena/strategies.json | 2,223 | 7.3% |

## 核心功能

- **策略發牌**：15 種推理方式、12 種工作流程、12 種策略，組合為 2,160 張卡。`deal()` 使用 seed 平衡分配並避免完整重複；在可行範圍也避免重複兩項組合。這保證卡片分配特性，不能保證模型產生彼此獨立的答案。
- **答案淘汰賽**：每場兩次攻擊、兩次答辯修訂、一次裁判，共五次代理呼叫。奇數人數有輪空，優先分給較少輪空者。
- **固定題目**：`init` 保存題目，`render_job` 將同一份題目放進各階段提示詞；只在模板上做一次替換，避免題目內的大括號被當成模板變數。輸入會經過首尾空白整理，所謂一致指參賽者收到同一份保存後的題目。
- **落盤與續跑**：`arena.json` 保存賽程、答案路徑、淘汰與裁判結果；`next` 依缺少哪些檔案判斷下一階段。狀態檔採暫存檔加 `os.replace` 寫入。
- **基準答案比較**：提供被否決的舊答案時，最後複製冠軍與舊答案為 X/Y，另由裁判比較。種子固定發牌與賽程，不固定模型答案。

來源：[bracket.py:167](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py#L167)、[配對與狀態:270](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py#L270)、[提示詞產生:680](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py#L680)。

## 技術架構

```text
使用者題目 + 可選舊答案
          |
Claude Code 主對話讀取 SKILL.md
          |
bracket.py -> 發牌、配對、寫提示詞、記錄狀態
          |
主對話依批次呼叫 Agent 工具
          |
初稿 -> 攻擊 -> 答辯與修訂 -> 裁判 JSON
                ^                 |
                +--- 下一輪 <-----+ collect / advance
                                  |
                        冠軍 -> 可選 X/Y 比較
```

| 層次 | 實際內容 |
|---|---|
| 執行編排 | SKILL.md 指示 Claude Code 呼叫 Agent；Python 本身不啟動模型 |
| 狀態機 | 標準函式庫 Python；argparse、json、random、os 等 |
| 策略資料 | strategies.json |
| 評分 | rubric.md 描述準則；bracket.py 的 WEIGHTS 執行計分 |
| 儲存 | 工作目錄的 .arena/&lt;run&gt;/；LATEST 指向最近一場 |
| 安裝描述 | Claude Code Skill／plugin marketplace manifests |
| 測試 | unittest，含模擬參賽者的 CLI 流程 |

它提供的是 Skill 與 Python 帳務工具，沒有 MCP server、網頁服務或 Obsidian 連接功能。對這個遠端輸入未查 CodeGraph；補充使用 Python 標準 ast 做兩檔語法解析，不宣稱有呼叫圖或可用的本地索引。

## 成本與採用風險

### 呼叫量隨候選數成長

N 位參賽者需淘汰 N−1 人；無重試時總呼叫量為 `N + 5 × (N−1) = 6N−5`。基準答案比較另加一次。

| 規模 | 輪數 | 代理呼叫 | 每批10個的批次數 |
|---|---:|---:|---:|
| 預設100 | 7 | 595 | 70 |
| 32 | 5 | 187 | 28 |
| quick 16 | 4 | 91 | 16 |
| 8 | 3 | 43 | 10 |

以上由 `plan_totals()` 的原始碼公式及 README 對照，這輪未執行 plan。模型費用、實際 tokens、時間與重試增加量為 Unknown；「免費 Skill」不表示模型運算免費。現版會列出呼叫量，明確點名 arena 時即可開始，沒有額外的大規模 token 預算確認。來源：[plan:788](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py#L788)、[啟動規則:40](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/SKILL.md#L40)。

### 裁判資料缺漏仍可能晉級

`decide()` 在任一方分數不完整時，若 winner 能識別，便直接採用裁判的選擇；此分支先於 fatal 規則。因此分數缺漏時，致命錯誤的淘汰規則也未必生效。上游測試 `test_incomplete_scores_fall_back_to_the_pick` 明確接受此行為。若作為品質閘門，應拒收缺欄、型別錯誤與不合理數值，要求裁判重交；不能只因有 winner 就推進。來源：[bracket.py:481–506](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py#L481)、[test_bracket.py:243](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/tests/test_bracket.py#L243)。本輪為靜態確認，未執行反例。

### 失敗處理會丟掉可用答案

SKILL 要求同一工作失敗兩次後，把各個輸出寫為 NO OUTPUT。defend 有答辯與修訂答案兩個輸出；`_has_output()` 只檢查非空，`advance()` 會將非空的修訂檔設為後續答案。因此依該規則處理失敗，可能用占位文字取代原本可用的答案。適配時應保留原答案，並另外標記答辯失敗。來源：[SKILL.md:107](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/SKILL.md#L107)、[bracket.py:404](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py#L404)。這是原碼推導的失敗路徑，未做 runtime 重現。

### 檔案限制與評分規則需要額外保護

子代理以 general-purpose 啟動，限制寫入 .arena 的規則放在提示詞；Python 沒有替代理建立 OS 沙箱。README 的專案檔案保護主張，不能當成已強制實現的權限保證。主對話也不能只憑模型回報判斷有無越界。來源：[Agent 呼叫與限制](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/SKILL.md#L99)。

`rubric.md` 與 Python `WEIGHTS` 各有一份權重。現值一致，測試也檢查一致，但修改 Markdown 不會自動更新計分程式；run 複製的 rubric 也不會改變 WEIGHTS。若更換評分方法，兩處需同步。來源：[WEIGHTS](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py#L54)、[一致性測試](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/tests/test_bracket.py#L217)。

模型同時生成、批評與評分，可能共享錯誤或偏好。單敗淘汰的最後存活者，也可能受配對與裁判差異影響。這些是方法限制；本輪沒有品質實驗，不能推定100位一定比16位或單次回答好。

## 社群健康度

公開 API 僅有一筆 commit、一位列名 contributor：Jakeschincariol。沒有 Release；近四週 commit_activity 回傳 `{}`，不能把未完成統計解讀為0，未據此計算活躍度。倉庫中沒有 .github CI workflow。

本次共讀到2張 open issue、1張 closed issue、1張 open PR 與1張 closed PR。Issue #1 提到 token 耗盡，PR #2 提議預估 token 並在大型執行前確認；這是公開回報與提案，未代表本機重現。PR #5 描述1.1.0的成本、裁判與 headless 改善，但已關閉且 merged_at=null，不屬本次 main 的功能。

來源：[commits API](https://api.github.com/repos/Jakeschincariol/arena-skill/commits?per_page=100)、[contributors API](https://api.github.com/repos/Jakeschincariol/arena-skill/contributors?per_page=10)、[Issue #1](https://github.com/Jakeschincariol/arena-skill/issues/1)、[PR #2](https://github.com/Jakeschincariol/arena-skill/pull/2)、[未合併 PR #5](https://github.com/Jakeschincariol/arena-skill/pull/5)。

## 社群口碑與文件引擎

API 星數846，未達 Skill 的1000門檻，未啟動 agent-reach 或 YouTube 搜尋；不以缺少這次搜尋結果判斷沒有使用者。homepage=null，未啟動 defuddle。gh GraphQL 回傳 HTTP 401，改用無須登入的 GitHub REST API；不改登入設定。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian Vault | 可保存研究與答案評比紀錄；專案本身沒有 Wiki 讀寫、索引或資料契約能力。題目及基準答案會重複進入模型上下文，應限於本題需要的材料。 |
| Codex | 上游使用 Claude Code Agent schema、CLAUDE_SKILL_DIR 與 python3；本場是 Windows Codex。需改工具呼叫及命令；當前規範最多建立兩個 children，調小 wave 不能解決總 child 數超限。 |
| 既有 Council | 本機 council-local 已有兩席獨立分析、互相質疑及最終立場；Arena 多了大量候選淘汰、策略卡發牌及獨立裁判，但尚無證據表明其答案品質勝過現有入口。 |
| Automation | arena.json、缺檔續跑與固定題目值得參考；目前沒有定時器、成本上限或模型執行服務，不接背景排程。 |

本機比較依本輪讀到的 council-local 與 yongli-council Skill 文件及當前工具限制；沒有召開議會，也沒有修改這些 Skill。

## 安裝建議

**⏳ 觀望，暫不整包安裝，不替換 council-local。**

現階段最值得保留的是：同一份中立題目、明示攻擊與修訂、基準答案的X/Y比較，以及可恢復的狀態紀錄。策略卡與淘汰賽可供未來有明確品質缺口時研究；尚未形成必須另建 Skill 的需求。

若日後決定試用，先設總呼叫與時間上限、嚴格檢查裁判資料、保留失敗答辯前的答案，並讓寫入範圍由工具權限保障。品質比較需用相同題目與判準，分別記錄單次回答、現有Council與實際受測的Arena版本；縮減版的結果只能代表縮減版。本輪沒有授權安裝、適配或執行競賽。

## 驗證與限制

- Repomix 1.18.1：exit 0，10檔、30,380 tokens；XML 目錄與實際檔案對照。
- Python 標準 ast：2份 .py 語法解析通過；JSON：3份格式解析通過。沒有 import 或執行上游程式。
- 上游測試：讀到27個 test_ 方法，含100人模擬淘汰及fake-agent流程；本輪未執行，不能列為PASS，也不能作為真模型效果證據。
- 未驗：Claude Code 安裝、Agent 相容性、完整賽程、真實費用與時間、OS寫入隔離、最終答案品質、Windows CLI執行。
- Git Bash 在本機啟動回傳 NtCreateDirectoryObject / 0xC0000022，依目前可用環境改用原生 shell；沒有改系統設定。
- 原始碼、API快照、Repomix XML與索引修改前備份保留於本次工作目錄的 `work/repo-intel/arena-skill/`；未獲清理授權，未刪除。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/council-of-high-intelligence — 多視角決策議會與替換評估|Council 多視角決策評估]]
- [[wiki/Claude/Codex子代理角色與來源|Codex 子代理角色與來源]]
- [固定版 SKILL](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/SKILL.md)
- [固定版評分規則](https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/rubric.md)
