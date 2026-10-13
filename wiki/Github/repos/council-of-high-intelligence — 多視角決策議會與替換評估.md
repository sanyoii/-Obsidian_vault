---
source: "https://github.com/0xNyk/council-of-high-intelligence"
author: "0xNyk"
stars: "4.6K"
clipped: 2026-10-11
tags:
  - github/repo
  - decision-making
  - agent-skills
---

# council-of-high-intelligence — 多視角決策議會與替換評估

> ⏳ 建議列為 yongli-council 的替換候選，先做本機適配與同題比較。固定來源 `d641b8d8b404cbd589a4ea1a491039a355be3dc5`，查核日期 2026-10-11。沒有安裝、移除 Skill、召開議會或呼叫外部模型。

## 一句話說明

這是一套讓 AI 對難題分別分析、互相質疑，再形成決策建議的 Skill 與角色檔。可從 18 種分析視角選兩人辯論、三人小組或完整議會，並保留少數意見、未知資訊與推翻建議的條件。議事流程主要寫在 Markdown，由宿主 agent 執行。

## 專案概覽

| 項目 | 本次查核 |
|---|---|
| Repo | 0xNyk/council-of-high-intelligence |
| Stars | 4,604 |
| Forks | 432 |
| 主要語言 | Shell；主要分析方法與角色為 Markdown |
| 授權 | MIT |
| 建立時間 | 2026-03-02 |
| 最後推送 | 2026-10-05 13:40（台北） |
| Open Issues / PRs | 10 / 11；API 的 21 含兩者，已逐筆分類 |
| 最新 Release | v1.2.0，2026-07-04 |
| Archived | 否 |
| 首頁 | https://www.nyk.dev/oss/council-of-high-intelligence |
| 主要 topics | agent-skill、decision-making、structured-debate、multi-llm |

來源：[REST metadata](https://api.github.com/repos/0xNyk/council-of-high-intelligence)、[Release](https://github.com/0xNyk/council-of-high-intelligence/releases/tag/v1.2.0)。數值只代表本次快照。

## Repomix 深度分析

Repomix 1.18.1，固定 commit 的 source archive，無壓縮；原始碼 68 檔，收錄 60 個文字檔、92,995 tokens、360,570 characters。18 個角色檔已計數。

| 最大檔案 | Tokens | 佔比 |
|---|---:|---:|
| SKILL.md | 13,749 | 14.8% |
| SKILL.opencode.md | 12,796 | 13.8% |
| scripts/council-simulation-checklist.sh | 4,334 | 4.7% |
| install.sh | 4,293 | 4.6% |
| SKILL.codex.md | 4,022 | 4.3% |

本輪核對 install、Codex 協議、Claude 主協議的路由／匿名／投票／主席部分、provider detection、CI、roster validator、simulation checklist 與代表角色。未逐句審查全部 18 份角色。Repomix 掃描未命中可疑檔案，不能代替行為或供應鏈安全驗證。

## 核心功能

- **依問題選視角**：18 個角色有 domain、polarity、triads、provider_affinity、reasoning_method；提供 20 組 triad 與三種 profile。人格名字搭配具體方法與盲點，不只是要求模型換口吻。
- **Full／Quick／Duo**：獨立分析、互相質疑、最終立場；Codex 無 panel flag 時預設選 triad，`--full` 才選全 18 人。full mode 與 full panel 是不同選項。
- **匿名互評**：用 Member A/B/C 遮蔽他人身份，保留映射；更新立場時要求指出原論點的具體缺陷。Duo 不匿名。
- **結構化立場與分歧**：要求 STANCE／CONFIDENCE／DEALBREAKER；未達門檻保留 split，少數的重大反對進 Minority Report。
- **有限輪次與執行紀錄**：有 round caps、timeout／retry／fallback 規則，以及 panel、provider、enforcement、token estimates 等 metadata。
- **事後回看**：verdict 建議記錄 prediction、owner、review date 與改變建議的證據。這些是方法與模板，未找到自動追蹤成效的常駐服務。

來源：[Codex 協議](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/SKILL.codex.md)、[Feynman 角色](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/agents/council-feynman.md)、[決策模板](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/demos/verdict-template.md)。

## 技術架構

```text
使用者問題 + flags + .council.yaml
                  |
       主對話 coordinator 選視角／供應商
                  |
       各自重述 -> 獨立分析 -> 匿名質疑
                  |
       最終立場 -> 統計／保留少數意見
                  |
       Chairman 彙整 -> verdict + metadata
```

| 層 | 實作 |
|---|---|
| 流程 | SKILL.md、SKILL.codex.md、SKILL.gemini.md、SKILL.opencode.md |
| 角色 | agents/council-*.md，18 份 Markdown＋YAML frontmatter |
| 路由 | configs/*.yaml＋scripts/detect-providers.sh |
| 執行 | 宿主的子代理、外部 CLI 或 OpenAI-compatible HTTP，呼叫模板寫在 Skill |
| 安裝 | install.sh 複製 Skill／角色／偵測腳本；OpenCode 另轉換 frontmatter |
| 靜態檢查 | Shellcheck、Markdownlint、Python roster validation、Bash checklist |

沒有已合併的 MCP server 或可獨立執行整場議會的 Python state machine。議事規則、匿名處理、計票和降級主要靠 coordinator 遵循文字；`simulation-checklist` 多數檢查文件與關鍵字，另測 installer dry-run，並不是實際模型辯論測試。

來源：[安裝器](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/install.sh)、[CI](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/.github/workflows/lint.yml)、[checklist](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/scripts/council-simulation-checklist.sh)。

## 與 yongli-council 的比較

本輪直接讀取本機 `C:/Users/sanyo/.codex/skills/yongli-council/SKILL.md`；以下比較的是現行文字契約，沒有拿舊 PASS 當成實際品質證據。

| 面向 | yongli-council 現行做法 | 上游 Council |
|---|---|---|
| 視角 | 固定五個互斥顧問任務 | 18 種領域／方法視角，按題目選 panel |
| 流程 | 五份獨立答案＋五位新 reviewer | 重述＋2–3 輪，保留相同 member 跨輪回應 |
| 結論 | 主對話主席必須選一個結論 | 獨立 Chairman；未達共識可保留 split，Duo 不發投票判決 |
| 少數意見 | 彙整理由，可採少數方案 | 明列 Minority Report、DEALBREAKER、kill criteria |
| 第一輪隔離 | fork_turns=none，只給中立問題與角色 | Codex 文本指定 fork_context=true |
| 失敗 | 一次重試後列缺席，剩餘席續行 | 重試兩次後可模擬席次，甚至全場模擬 |
| 模型 | 使用目前模型與 collaboration surface | 依 provider/model config 路由，可多供應商 |

**方法上的增益**：Council 更容易依決策選對分析方法，也更明確表達未知、重大反對與無共識。是否比固定五顧問得出更好的建議，仍需同題比較；人數、名人角色或更多 provider 都不是品質證據。

**執行代價**：小 panel 不一定更省。照 Codex 協議，三席 full 包含三個重述請求、三輪共九次 member 回應，加一次主席，為 13 次階段請求，尚未算重試與補問；舊版是五份初答＋五份互評，由主對話收斂。這是契約計數，不是本輪 token／費用量測。

## 本機替換前要處理的地方

### 1. 工具與代理數限制

上游 `SKILL.codex.md:117` 使用 `fork_context=true`，`162` 使用 `send_input`；本 session 的 collaboration surface 使用 `fork_turns`、send_message／followup_task。現行 AGENTS.md 另限制最多兩個 child，且不准 child 再委派。直接套三席／18席＋額外主席會碰到限制；舊版要求十個新 child，也需要同樣核對，不能假定舊版在當前環境就符合。

### 2. 可用 provider 判定過度樂觀

`detect-providers.sh:46` 把 Anthropic 設為 always available；Codex／Gemini／Cursor 多以 CLI `--version` 成功當可用訊號。這只能證明 executable 可執行，未驗證登入、額度與模型呼叫。它的 timeout 依賴 Perl，亦需本機能力查核。腳本沒有在本輪執行，避免探查憑證或發出 provider 請求。

來源：[provider detection](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/scripts/detect-providers.sh#L43)。

### 3. 授權與模擬結果

上游 CLI 示例有 `codex exec -c auto_approve=true`，模型亦有自動選型，與本機「保持模型設定、按本次授權執行」不一致。這只是上游示例；本輪未驗證該設定是否會被目前 CLI 接受，也沒有照做。

失敗席次雖標 `[Simulated]`，仍可進後續議事。當目的在於獨立意見，就應將缺席與主模型模擬分開；保留 yongli 的缺席揭露會更適合此環境。

來源：[CLI 示例](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/SKILL.md#L309)、[Codex fallback](https://github.com/0xNyk/council-of-high-intelligence/blob/d641b8d8b404cbd589a4ea1a491039a355be3dc5/SKILL.codex.md#L241)。

### 4. 投票與成效證據

1.5 倍領域權重與 high/med/low 自評信心會影響投票；信心並未在本輪證明經過校準。保留加權結果作參考可以，仍應評估論據與可驗證條件。引用論文不等於這套 Skill 的本機決策成效已驗。

open issues #84（Codex 不在 Git repo／stdin 卡住）、#82/#83（HTTP 的 1200 max_tokens 導致空回答）有對應修正 PR，仍開放。本輪核對到現行固定 1200 與 CLI 模板，未重現故障，問題影響仍按原回報標示。

來源：[issue 84](https://github.com/0xNyk/council-of-high-intelligence/issues/84)、[issue 83](https://github.com/0xNyk/council-of-high-intelligence/issues/83)。

## 最小替換提案

此節是評估後的提案，尚未修改現行 Skill。

| 現有／上游條文 | 擬採本機條文 |
|---|---|
| 舊版固定五顧問；上游無旗標選 triad | 「依問題選兩個互補且會衝突的視角；主對話擔任主席。三席或更大 panel 只在當前規則與能力允許時使用。」 |
| 上游 fork_context=true／send_input | 「初始 child 使用 fork_turns=none，只提供中立問題與角色；後續回合沿當前 collaboration schema。」 |
| 上游席次失敗後產生模擬回答 | 「缺席就列缺席；單模型示範另列為模擬，不加入獨立席次或共識計數。」 |
| 上游自動模型路由與 auto_approve 示例 | 「保持本機模型與授權；外部 provider 路由須另有涵蓋成本及資料範圍的明確授權。」 |
| 舊版主席必須選一個結論 | 「給出目前建議；證據不足或分歧未解時，列出最可能改變決策的一項驗證，不強迫宣稱共識。」 |

預期流程：讀中立問題 → 兩席各自分析 → 互相質疑 → 最終立場 → 主對話交建議、少數意見、未知與驗證動作。沿用上游分析方法，保留本機明確授權、第一輪隔離與缺席揭露。

驗收以同一個真實問題比較：是否發現可驗證的新盲點、是否誤改問題、能否保留反對理由，以及 token／耗時是否合理。先做候選與對照，通過後才停用舊入口；移除需明確授權。本輪沒有製作或執行候選。

## 社群健康度

contributors endpoint 回傳九個帳號，含 bot；主要 contributions 是 0xNyk 46、github-actions 11、xiaolai 3，其餘多為 1–2。近 28 天四筆 commits，最新 release 距查核約三個月。維護集中在原作者，仍有開放的 provider、MCP 與 framework 提案；未合併功能不算現行能力。

GitHub Actions 查到 Lint 與 Star Chart 工作流；本次以固定 SHA 篩選 main runs 沒有取得對應項目，未宣稱該 SHA CI 通過。實際跑 `validate-roster.py` 得 18 members、166 checks、PASS，證明角色 frontmatter 與 SKILL 名冊一致。

## 社群口碑與教學

Agent Reach 前一輪 doctor 顯示 Exa／X／Reddit 後端限制，本輪沿當前 web search 做公開搜尋。找到介紹、靜態掃描與彙整頁，沒有取得本套 Skill 相較單一 agent 的獨立成效重現。掃描分數不當成安全或能力結論。

YouTube metadata 搜尋找到專案歷史視覺化、單支使用介紹與工具彙整影片；本輪未觀看影片，不能當成實測證據。Wiki 不保留短期票數／觀看數。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 可存 verdict、原始問題、反對理由與回看條件；沿既有一件事一本帳 |
| Codex | 值得採分析方法，需先適配工具參數、child 上限、模型與授權 |
| 一人公司 | 對產品取捨、風險、架構等決策有用途；事實查詢或便宜可逆選擇直接查證／試驗即可 |
| Automation | 沒有已驗的成效追蹤引擎；不宜把多數決自動接成外部執行授權 |

## 安裝建議

⏳ **把它列為替換候選，先做本機適配與同題比較。** 方法的選擇更豐富，對未解分歧的表達也較完整；直接安裝上游版本會引入不合本機的工具、provider 與降級假設。沒有必要長期並存兩套相同用途的入口，但現在刪除 yongli 還缺行為比較證據。

installer 主要複製檔案，可 dry-run，原始碼未見安裝時下載套件；目的地預設在各工具的使用者設定目錄，`install -m` 可能覆蓋同名檔案，未見備份步驟。Windows 的 Bash 安裝／多 provider 需另驗。本輪未執行安裝器。

## 分析與驗證範圍

- 已完成：GitHub REST、固定 source archive、Defuddle 首頁、Repomix、關鍵協議與腳本閱讀、與本機 yongli 文字比較、roster validator。
- roster validator 是先讀取確認為檔案／YAML 檢查後執行，未安裝新 Python 依賴。
- 未完成：實際議會、provider health／auth、費用與延遲量測、安裝 dry-run、Bash checklist、Shellcheck、Markdownlint、AST 索引與論文主張重現。
- source archive 中的 `skills/council/SKILL.md` 以文字保留 `../../SKILL.md` symlink target；研究時讀根 SKILL，未把該 archive 當可直接安裝的 Plugin。
- Repomix 初次 npm EPERM，workspace-local 重試後收錄 60 檔成功；沒有把失敗輸出當成安全或分析通過。
- 原始碼／XML／npm cache 保留在本場 `work/repo-intel/council-20261011/`，未清理。
- 本輪只寫本報告與必要索引；未修改全域 Skill／AGENTS／Memory／模型設定。文字沿 repo-intel＋公司 copywriter 方法整理。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Tools/repo-intel|repo-intel Skill]]
- [[AI-一人公司/_index|AI-一人公司]]
