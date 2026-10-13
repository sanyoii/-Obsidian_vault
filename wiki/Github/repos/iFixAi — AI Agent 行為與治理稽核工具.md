---
source: "https://github.com/ifixai-ai/iFixAi"
author: "ifixai-ai"
stars: "23.4K"
clipped: 2026-10-11
tags:
  - github/repo
  - ai-evaluation
  - agent-governance
---

# iFixAi — AI Agent 行為與治理稽核工具

> 採用判斷：⏳ 先參考測試方法，暫不安裝 Plugin。分析固定於 `c1741d78496a169f2f47ea2362f8e2cc906eb8b8`，資料查核日期為 2026-10-11（台北）。本輪完成原始碼分析，沒有執行 iFixAi、單元測試或付費模型評測。

## 一句話說明

iFixAi 是 Python CLI，將 agent 的角色、工具、權限、政策與資料來源整理成 fixture，再對模型或實際 agent endpoint 執行行為測試，產出證據、缺口與 A–F 評分。適合有明確授權邊界、能提供測試入口的 agent 開發與 QA 團隊。

## 專案概覽

| 項目 | 查核結果 |
|---|---|
| Repo | ifixai-ai/iFixAi |
| Stars | 23,399，API 即時快照 |
| Forks | 1,440 |
| 主要語言 | Python |
| 授權 | Apache-2.0 |
| 建立時間 | 2026-04-27 |
| 最後推送 | 2026-10-11 00:04（台北） |
| Open Issues / PRs | 0 / 34；REST open_issues_count 的 34 包含 PR，逐筆分類後全是 PR |
| 最新 Release | v4.1.0，2026-10-08 |
| PyPI | 4.1.0；wheel 與 sdist 均未 yanked |
| 開發狀態 | pyproject 自標 Beta，Python >=3.10 |
| Archived | 否 |
| 首頁 | https://www.ifixai.ai |
| 主要 topics | agent-evaluation、ai-governance、prompt-injection、llm-security |

來源：[GitHub REST metadata](https://api.github.com/repos/ifixai-ai/iFixAi)、[Release](https://github.com/ifixai-ai/iFixAi/releases/tag/v4.1.0)、[PyPI](https://pypi.org/project/ifixai/4.1.0/)。星數、PR 與版本會變動，此表只代表本次快照。

## Repomix 深度分析

使用 Repomix 1.18.1 對固定 commit 的 codeload 原始碼打包，未使用壓縮。原始碼共 690 檔；Repomix 收錄 685 個文字檔、1,727,439 tokens、7,166,994 characters。另直接計數得 60 個 inspection definition 與 103 個 `test_*.py`。

| 最大檔案 | Tokens | 佔比 |
|---|---:|---:|
| docs/assets/brand/hero-audit-phone.svg | 54,060 | 3.1% |
| docs/assets/brand/hero-audit-dark.svg | 35,662 | 2.1% |
| docs/assets/brand/hero-audit-light.svg | 35,604 | 2.1% |
| ifixai/core/types.py | 25,313 | 1.5% |
| scripts/build_brand_assets.py | 22,324 | 1.3% |

前幾名包含品牌素材，總 tokens 不等於引擎複雜度。本輪實際閱讀重點是 CLI、provider 介面、grounding、runner、scoring、B01/B12、telemetry、Plugin bootstrap 與 CI；未逐檔審查全部程式碼。Repomix 的安全掃描沒有命中可疑檔案，此結果不構成安全認證。

## 核心功能

- **治理與授權測試**：B01 枚舉使用者角色與工具，檢查授權決策；B08 檢查權限提升；P01 檢查破壞性能力的控制。
- **文字與跨回合行為測試**：涵蓋來源、捏造、政策遵循、提示注入、靜默失敗、目標漂移等。B12 以版本化 corpus 與可重播 seed 產生攻擊案例，再由 rubric judge 判分。
- **三種證據路徑**：typed capability 回傳值的 structural 測試、LLM rubric judge，以及 atomic claims。缺 hook 或證據時有 insufficient_evidence／inconclusive 訊號。
- **獨立與多 judge 評估**：支援不同 provider 的 judge、self 模式警告及 ensemble。不同供應商有助減少自評偏差，實際 judge 準確度仍需另外驗證。
- **可重播與比較**：保存 fixture、seed、manifest、JSON／Markdown／HTML artifact，並提供 compare；比較要固定版本、fixture、grounding、judge 與覆蓋範圍。
- **受控執行**：CLI 有 dry-run、judge-budget、concurrency、checkpoint／resume。judge-budget 控制呼叫數，不是涵蓋 SUT 與所有供應商的金額上限。

來源：[B01 runner](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/inspections/b01_tool_governance/runner.py#L70)、[B12 runner](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/inspections/b12_prompt_injection/runner.py)、[CLI](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/cli/run.py#L592)。

## 技術架構

```text
角色／權限／政策 fixture + CLI/config
                  |
         capability discovery + grounding
                  |
          core runner + inspection registry
                  |
       ChatProvider ----> 真實 HTTP agent／模型 API
                  |
     structural／rubric judge／atomic claims
                  |
      category score + mandatory minimums
                  |
       JSON／Markdown／HTML + 差異比較
```

| 層 | 原始碼與技術 |
|---|---|
| CLI | Click、Rich、Questionary；setup、run、validate、compare、scaffold |
| 契約 | Pydantic、YAML、JSON Schema；core/types.py 與 fixture schema |
| 測試引擎 | asyncio runner、registry、concurrency、版本化 corpus |
| 接口 | ChatProvider.send_message；可擴充 list_tools、authorize_tool、get_audit_trail、retrieve_sources 等 hook |
| HTTP | aiohttp，支援 OpenAI-compatible endpoint 及額外 auth headers |
| 評分 | 五個 core 支柱、mandatory minimums、證據不足處理、Wilson CI |
| 使用入口 | CLI、scaffolded Skill、Claude/Codex Plugin；Plugin 是呼叫 CLI 的操作方法 |

`--grounding sut` 保留 SUT 自身治理；`fixture` 模式會把 fixture 的角色與政策加入 system prompt。測試 fixture 模式回答得好，不能直接推出現行部署已具有這些控制。HTTP endpoint 也不會自動替 agent 生出實際授權與稽核 hook。

來源：[Provider 介面](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/providers/base.py#L397)、[Grounding](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/core/grounding.py#L128)、[測自己的 agent](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/docs/testing-your-agent.md)。

## 評分與採用風險

### 1. CI success 尚未涵蓋 pytest

固定 commit 的 GitHub CI 回傳 success，但 `.github/workflows/ci.yml` 只執行 fixture validation、Ruff、Bandit 與文件存在檢查，沒有 pytest step。repo 的 103 個測試檔確實存在；本輪沒有安裝測試依賴，也沒有執行它們，測試通過率為 Unknown。

來源：[CI 定義](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/.github/workflows/ci.yml)。

### 2. 最新 Plugin 裝到較舊引擎

`pyproject.toml` 與 PyPI 是 4.1.0，`plugin/requirements.txt:6` 卻固定 `ifixai[anthropic]==3.3.0`。`SessionStart` hook 會建立持久 venv、升級 pip、安裝該 requirements。這是已確認的版本落差；尚未驗證 3.3.0 是否支援現行 Skill 的每個參數，不能宣稱必然壞掉。

因此不建議先裝 Plugin 再拿 4.1.0 文件解讀其結果。未來試用以隔離且固定版本的 CLI 為優先。

來源：[Plugin pin](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/plugin/requirements.txt#L6)、[bootstrap](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/plugin/hooks/bootstrap.py#L85)、[hook](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/plugin/hooks/hooks.json)。

### 3. 高分需要連同覆蓋範圍閱讀

core 權重為 fabrication 20%、manipulation 35%、其餘三支柱各 15%。`compute_category_score` 排除 insufficient_evidence、ERROR、exploratory、advisory 與 attestation；`compute_overall_score` 跳過 null 支柱，將剩餘權重重新正規化。文件一面寫 fixed denominator 1.00，一面也註明 null categories 會退出分母，因此不能只引用「固定分母」解讀完整度。

B01 必須 100%、B08 95%、P01 100%；必要門檻失敗會把分數封頂 60%。未選到必要門檻的部分 suite 不給 overall score；真正不適用與無法驗證也分開處理。這些控制有實作，仍不能用單一 A–F 取代逐項證據與 coverage。

來源：[score engine](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/scoring/engine.py#L146)、[mandatory minimums](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/scoring/mandatory_minimums.py)、[scoring 文件](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/docs/scoring.md)。

### 4. 遙測與模型呼叫是兩條資料外送路徑

telemetry 預設啟用，向美國 PostHog endpoint 送出隨機安裝 ID、started/completed、版本、OS、surface、install source 與 UTC timestamp。程式用 allowlist 建 payload，並設 `$ip=null` 與 geoip disable。可用 `--no-telemetry`、`IFIXAI_TELEMETRY=0`、`DO_NOT_TRACK` 關閉，CI 自動停用；本輪未做封包驗證。

此外 SUT 和 judge 本身仍會收到測試訊息與待判分內容。關閉 telemetry 不會停掉付費模型請求，也不代表私人材料不會進到模型供應商。

來源：[telemetry](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/ifixai/telemetry.py)、[SECURITY](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/SECURITY.md)。

### 5. 120 秒與案例不能當產品效能證據

本輪未量測實際 runtime、成本、誤判率或 detection coverage。「120 秒」是專案宣稱；README 另提醒 full suite 可能有約 2,000 次 judge calls，SUT 另計。官方 methodology 自稱 diagnostic；公開攻擊 corpus 的通過結果也不能保證能抵擋有動機的攻擊者。

Pizza Hut 案例明示是依申訴重建的示意 fixture，沒有取自其原始碼；官網退款案例亦標 illustrative scenario。開源 60 inspections 與商業 Pro 85–400 inspections 的服務範圍應分開。

來源：[Methodology](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/docs/methodology.md)、[案例界線](https://github.com/ifixai-ai/iFixAi/blob/c1741d78496a169f2f47ea2362f8e2cc906eb8b8/case_studies/pizza-hut-dragontail/SCORECARD.md#L9)、[官網](https://www.ifixai.ai)。

## 社群健康度

REST contributors 共 15 個帳號，包含 github-actions bot；前三名 rudycelekli 109、stefyi-4355 39、n-papaioannou 35 contributions。最近 28 天 API 分兩頁取得 129 筆 commits，包含合併與維護工作，不等於 129 個功能。最近五次 release 從 8/5 到 10/8，持續發布，但主要貢獻集中在少數人。

34 個 open PR 多是修正 fixture、HTTP 錯誤、judge、digest 與資源清理。PR 存在是待修線索，本輪未逐筆驗證其指控，不能當成全部已確認漏洞。commit_activity endpoint 回 `{}`，週別分布未取得。

## 社群口碑與教學

本輪搜尋到公開介紹與 Reddit 推薦，沒有取得足以驗證實際 detection 能力的獨立重現。Wiki 不保留短期討論票數。Agent Reach doctor 顯示 Exa 未配置、X 認證失敗、Reddit／小紅書缺 OpenCLI 擴充，因此改用當前 web search，未更動認證或安裝擴充。

YouTube 搜尋找到官方 CLI／Plugin 說明與一支第三方低記憶體試跑影片；僅取得標題、頻道與觀看 metadata，沒有觀看內容，不能評估教學品質或把影片當行為驗證。

## 與現有系統的相關性評估

| 面向 | 建議 |
|---|---|
| Obsidian | 適合存方法、fixture 說明與去敏後證據；不是 Wiki 整理或記憶檢索工具 |
| Codex | scaffold/plugin 的用途是讓 agent 操作 CLI；本 repo 的支援宣稱不代表本機已安裝或已驗可用 |
| 一人公司 | 可參考「角色 × 工具 × 權限」與缺證據分流方法，補強既有評測；不需更換公司流程 |
| 軟體 QA | 適合新增授權治理、來源追溯、靜默失敗情境；採用價值取決於能否測真實系統而非重建 prompt |
| Automation | 有 fixture、exit code、artifact 與 dry-run 可作自動化材料；應先驗 engine 與 judge，再決定是否成為 gate |

## 安裝建議

⏳ **觀望安裝，採用方法參考。** 60 項測試契約、可追溯 evidence、mandatory minimums 與不同 judge 的設計值得研究。當前阻礙是 Plugin 版本落差、CI 未執行 pytest，以及本機尚無 fixture／真實 endpoint／判分準確度的驗證。

若後續明示試用，先固定 CLI 4.1.0、隔離環境、停 telemetry，使用已知缺陷的合成 fixture 做免費 mock；mock 只能驗流程。接著才在核准成本與資料範圍下測真實 endpoint，並人工核對 false positive／false negative。這是採用路線，本輪沒有執行。

## 分析深度與驗證

- GitHub REST、固定 source archive、PyPI、Defuddle 官網擷取、Repomix 與主要執行路徑閱讀已完成。
- gh GraphQL 回 401，改讀公開 REST；沒有重新登入或修改設定。
- Git Bash 因 NtCreateDirectoryObject 權限錯誤無法啟動，使用原生 shell。
- Repomix 第一次 npm EPERM；workspace-local 重試成功，但父 repo 的 gitignore 導致收錄 0 檔。核對原始碼 690 檔後，以 `--no-gitignore` 完成 685 檔打包；0 檔輸出未當成分析成功。
- 本輪未執行目標 repo 程式、pytest、mock、付費評測、Plugin hook、封包測試或 AST 索引，亦未做完整 dependency vulnerability audit。
- 任務原始碼／XML／npm cache 保留在公司 worktree 的 `work/repo-intel/ifixai-20261011/`，未清理或刪除。
- 報告由 repo-intel 整理，文字依公司 copywriter 方法編修；報告結構與索引另行驗證，不能當作 iFixAi 行為驗收。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Tools/repo-intel|repo-intel Skill]]
- [[AI-一人公司/_index|AI-一人公司]]
