---
source: "https://github.com/github/spec-kit"
author: "github (GitHub 官方)"
stars: "125K+"
clipped: 2026-08-07
tags:
  - "github/repo"
  - "ai-agent"
  - "dev-workflow"
  - "spec-driven"
---

## spec-kit — GitHub 官方的規格驅動開發工具組

> **github/spec-kit** | ⭐ 125,719 | 🍴 11,224 | 📝 MIT
> "💫 Toolkit to help you get started with Spec-Driven Development"

---

### 一句話說明

spec-kit 是 GitHub 官方開源的「規格驅動開發（Spec-Driven Development, SDD）」工具組：它不是一個 AI Agent，而是一層**外掛在既有 coding agent 之上的流程骨架**——透過一支 `specify` CLI 把一組 slash command 與 Markdown 模板注入你的專案，強制 AI 在寫程式之前先產出「規格 → 計畫 → 任務清單」三份可被人類 review 的檔案，把「思考發生的位置」從 diff review 前移到 spec review。目標使用者是已經在用 Copilot／Claude Code／Codex 等 agent、但受夠了「一句 prompt 換一坨猜錯需求的程式碼」的開發者與團隊。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 125,719 |
| Forks | 11,224 |
| Watchers | 648 |
| 主要語言 | Python（6.32 MB）＋ Shell（112 KB）＋ PowerShell（108 KB） |
| 授權 | MIT |
| 建立時間 | 2025-08-21 |
| 最後推送 | 2026-08-07 |
| Open Issues | 152（已關閉 1,306） |
| Open PRs | 171 |
| 最新 Release | v0.16.0（2026-08-05） |
| Topics | ai, copilot, development, engineering, prd, spec, spec-driven |
| 首頁 | https://github.github.com/spec-kit/ |
| 是否 Archived | 否 |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 526 |
| 總 Tokens | 2,028,853 |
| 總字元數 | 8,796,685 |
| 壓縮模式 | 無（15 MB，全量打包） |
| Repomix 安全掃描 | ✔ 無可疑檔案 |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `tests/test_workflows.py` | 148,174 | 7.3% |
| `tests/test_presets.py` | 126,484 | 6.2% |
| `tests/test_extensions.py` | 94,441 | 4.7% |
| `extensions/catalog.community.json` | 53,410 | 2.6% |
| `src/specify_cli/presets/__init__.py` | 48,710 | 2.4% |

**值得注意**：體積前三名全是測試檔，合計佔全 repo token 的 18.2%。這在「AI 工具類」repo 裡很罕見——多數同類專案的最大檔是 prompt 模板或 README。測試覆蓋橫跨 contract／integration／unit／extensions 四層，並且有專門的 `*_python_parity.py` 測試強制 bash / PowerShell / Python 三套腳本行為一致。

---

### 核心功能

- **核心 SDD 流程（開箱即用）**：`/speckit.constitution`（專案憲章與編碼原則）→ `/speckit.specify`（做什麼、為誰做、驗收條件）→ `/speckit.plan`（技術藍圖）→ `/speckit.tasks`（拆成工作單元）→ `/speckit.implement`（執行）。每個階段產出一份 Markdown 檔進 repo，餵給下一階段。
- **可選品質閘門**：`/speckit.clarify`（讓 agent 主動反問模糊處）、`/speckit.analyze`（跨檔一致性檢查）、`/speckit.checklist`、`/speckit.converge`、`/speckit.taskstoissues`（任務直接開成 GitHub Issue）。
- **37 種 coding agent 整合**：原始碼實測 `src/specify_cli/integrations/` 下有 37 個模組——claude、copilot、codex、cursor_agent、gemini、grok、kilocode、kiro_cli、opencode、qwen、zed、amp、goose、junie、trae⋯⋯外加 `generic` 逃生口。`specify init --integration <name>` 會自動生成該 agent 對應的指令檔與目錄結構。
- **擴充系統（Extensions）**：內建 `agent-context`（同步 agent 上下文）、`assess`（需求評估五步）、`bug`（assess/fix/test 三段式除錯）、`git`（feature 分支、auto-commit、驗證）、`selftest`、`template`。社群目錄 `catalog.community.json` 實測收錄 **146 筆**擴充項目。
- **Presets 與 Bundles**：Preset 替換核心流程（`lean` 精簡版、`constitution-sync`、`scaffold`）；Bundle 是角色化整包設定，官方範例含 business-analyst／developer／product-manager／security-researcher 四種。文件站宣稱可整套換掉 SDD，甚至跑非軟體流程（官方點名的社群 preset 包括 .NET Framework 遷移七階段、多 agent QA 閘門、以及「長篇小說寫作」）。
- **Workflow 引擎**：`src/specify_cli/workflows/` 是一套真正的編排 DSL，步驟型別實測有 11 種——`command`、`shell`、`prompt`、`gate`、`if_then`、`switch`、`while_loop`、`do_while`、`fan_out`、`fan_in`、`init`。等於支援條件分支、迴圈、平行展開與匯聚。另有 `overlays/` 做分層合併（layer_sources／composer／merge／schema）。
- **企業／離線場景**：`authentication/` 模組同時支援 GitHub 與 Azure DevOps；文件明列 air-gapped 安裝、防火牆後運作、自架 catalog 以策展組織內可用的擴充清單。跨 Windows／macOS／Linux。

---

### 技術架構

（下圖語法格式：**ASCII 樹狀圖**）

```
specify CLI (Python, Typer/Rich)
│
├── commands/            init / bundle / event  ← 使用者入口
├── integrations/  (37)  每個 agent 一個模組，負責產生它認得的指令檔格式
│                        claude · copilot · codex · cursor_agent · gemini · … · generic
├── workflows/           編排引擎
│   ├── engine.py        執行器
│   ├── expressions.py   條件運算
│   ├── steps/     (11)  command · shell · prompt · gate · if_then · switch
│   │                    while_loop · do_while · fan_out · fan_in · init
│   └── overlays/        分層覆寫（layer_sources → composer → merge → schema）
├── presets/             替換核心流程的整包定義
├── extensions/          擴充載入與指令註冊
├── bundler/             封裝／發佈／安裝
│   ├── models/          catalog · manifest · records
│   └── services/        resolver · conflict · installer · packager · validator
├── authentication/      github.py · azure_devops.py（企業內網取用私有 catalog）
├── catalogs.py          官方 catalog.json + 社群 catalog.community.json（146 項）
└── _download_security.py  下載來源安全檢查

產出到使用者專案：
  .{agent}/commands/speckit.*.md   ← 指令定義（純 Markdown prompt）
  specs/<feature>/spec.md → plan.md → tasks.md   ← 流程產物

腳本層三套平行實作（測試強制 parity）：
  scripts/bash/*.sh  ·  scripts/powershell/*.ps1  ·  scripts/python/*.py
```

| 層次 | 技術 |
|------|------|
| CLI | Python 3（`specify-cli`，發佈於 PyPI 與 git tag 雙軌） |
| 流程定義 | 純 Markdown prompt 檔（不是程式碼，因此任何 agent 都讀得懂） |
| 編排 | 自製 workflow 引擎（11 種 step 型別 + overlay 合併） |
| 腳本 | bash / PowerShell / Python 三套等價實作 |
| 發佈 | PyPI（`uv tool install specify-cli`）＋ GitHub Release tag |
| CI/CD | GitHub Actions：test / lint / codeql / security / docs / publish-pypi，另有 6 支 agentic workflow（bug-assess、bug-fix、bug-test、社群投稿自動化） |
| 安全 | `_download_security.py` + `check_security_requirements.py` + CodeQL + Dependabot |

**架構上的關鍵設計**：流程本體是 Markdown 而非程式碼，Python CLI 只負責「把對的 Markdown 放到對的位置」。這是它能一口氣支援 37 個 agent 的原因，也是它的天花板——執行品質完全取決於下游 agent 讀不讀得懂那些 prompt，spec-kit 自己不做任何驗證。

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 5 | localden (361)、mnriem (293)、jawwad-ali (122)、Quratulain-bilal (80)、Noor-ul-ain001 (53) | 官方主導，`localden` = Den Delimarsky，同時是 YouTube 教學主力 |
| 近 8 週 commit | 59 / 63 / 63 / 68 / 89 / 112 / 103 / 44 | 加速中（非衰退） |
| Release 頻率 | v0.14.1 → v0.16.0 共 8 版發生在 14 天內 | 極高，接近日更；升級成本需納入考量 |
| Issue 開/關 | 152 open / 1,306 closed（關閉率 89.6%） | 健康 |
| PyPI 週下載 | 19,129（月 62,967） | 註：主推安裝路徑是 `uv tool install --from git+…`，PyPI 數字會低估實際採用 |
| 星數成長 | 2025-08 建立 → 2026-08 達 125K | 一年內破十萬，成長仍在持續（2026-04 時為 85K） |

⚠️ **本次未能驗證**：文件站宣稱「240+ contributors」，GitHub API 僅回傳 Top 10，未做全量比對；本報告只引用可直接觀測的數字。

---

### 教學生態

YouTube 搜尋訊號充足——Den Delimarsky（即最大貢獻者）的〈The ONLY guide you'll need for GitHub Spec Kit〉**58.9 萬觀看**、〈Using with EXISTING PROJECTS〉14.2 萬；第三方 Eric Tech 4.5 萬、Nathan Sebhastian 3.3 萬。教學生態成熟，且官方親自下場做內容。

---

### 已知限制與取捨（來自實務使用者，非 README）

外部部落格與 Reddit 討論歸納出的四項共通批評，值得在評估時對照：

1. **儀式感成本是真的**：改欄位名、修小 bug、加一條驗證——跑完整 constitution→specify→plan→tasks→implement 明顯不划算。使用者自訂的損益平衡點是「**這個需求是否模糊到兩個合理的工程師會做出不同實作**」；若全隊做法一致，直接做比較快。
2. **spec 漂移無自動防護**：產物是 repo 裡的 Markdown 檔，實作演進時**不會自動更新**。保持同步是紀律，不是保證。
3. **agent 起草的 spec 可能只是「把模糊描述寫得更長」**：人類 review 那一步是承重結構，跳過就失去全部意義。
4. **首跑學習曲線陡**：第一次走完全流程比預期慢；要幾輪之後才抓得到哪個階段該深、哪個階段可以輕量帶過。

另有一項結構缺口：核心流程**沒有 implement 之後的 code review 步驟**（社群 PR #2043 正在推 `/speckit.review`），目前只能靠社群擴充補。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Claude Code** | 官方有 `integrations/claude/` 模組，`specify init --integration claude` 可直接生成 `.claude/commands/speckit.*.md`。**但功能與本環境現有機制高度重疊**：7-Agent 工廠（researcher → story-writer → spec-writer → builder → test-verifier → validator）本身就是規格驅動流程；`writing-plans`／`executing-plans`／`spec-driven-development`／`brainstorming` 四個 skill 亦覆蓋同一段。spec-kit 的增量主要在 **workflow 引擎的 fan_out／fan_in／gate 表達力**，比目前手工編排的線性工廠強。 |
| **institution 制度層** | 概念同構度高：`gate` step ≈ R17 交付契約的驗收關卡；constitution ≈ CLAUDE.md 的原則層；「spec 先於 code」≈ R8 寫前先讀 + R4 目標驅動。可當作外部對照組閱讀，未必需要安裝。 |
| **Obsidian Vault** | 無直接關聯。流程產物是專案內 `specs/` 目錄，不進 vault。 |
| **Automation** | `taskstoissues` 可把任務直接開成 GitHub Issue，與 R14 Bug 協議的「P0/P1 開 Issue」流程可銜接；`extensions/bug`（assess→fix→test 三段）與 bug-protocol.md 的「先調查再修正」同構，但本環境已有更貼身的版本。 |

---

### 安裝建議

⏳ 觀望

判斷依據（R13 品味量化）：

- **加複雜度換小改善**。核心價值「寫程式前先產出可 review 的規格」在本環境已由 7-Agent 工廠 + 四個規劃類 skill 覆蓋。裝了它等於在既有路由層之上再疊一套 slash command 命名空間（`speckit.*`），CLAUDE.md 的路由規則與它的 constitution 誰說了算，需要額外協調成本。
- **需求密度不匹配**。使用者自陳的損益平衡點是「模糊到兩個工程師會做不同實作的需求」；本環境近期工作以基礎設施維護、腳本修正、單檔改動為主，正好落在 spec-kit 自己也承認「不划算」的那一側。
- **版本churn 高**。14 天 8 個 release，現在裝進去等於接受高頻升級維護。
- **正面因素不可忽略**：GitHub 官方維護、MIT、125K 星、測試投入紮實（前三大檔全是測試）、跨 37 agent 無鎖定、離線可用。這不是玩具，是可以放心長期押注的專案——問題只在「現在需不需要」。

**升級條件（→ ✅ 裝）**：出現一個需求模糊、跨多次工作階段、且需要把 spec 當成 PR review 產物的實作型專案（例如 career-ops 或 jobsmith 的大改版）；或確認其 workflow 引擎的 `fan_out`／`gate` 能取代目前 7-Agent 工廠的手工編排——屆時**先與 OpenSpec 比較**（同賽道更輕量的競品，Reddit 比較串的另一主角）再決定裝誰；選定後在 `workspace/` 隔離試跑一輪，`specify init` 注入的指令檔逐字審過，確認不與現有 skills/rules 路由打架。

（版本 churn 註記：templates 是 `specify init` 時落地的靜態檔、非 runtime 依賴，已 init 的專案不受上游日更影響——高 release 頻率對「裝不裝」的實際維護壓力低於直覺。）

**放棄條件（→ ❌ 不裝）**：①Claude Code 原生 plan mode／skills 把同等能力內建（訊號：官方 plan mode 支援可 review 的持久化 spec 產物）；②上游熄火（human commit 停滯 > 2 個月）；③隔離試跑後發現指令檔與 CLAUDE.md 路由層無法共存。

---

### 可單獨抽取（不裝也能用；均已逐字讀過 v0.16.0 版原文）

- **`extensions/bug/commands/speckit.bug.assess.md` 的「URL Trust Policy」段落**（最高價值）——完整的 prompt-injection 防禦規格：抓取內容一律視為資料非指令；拒抓 `file:`／RFC1918／loopback／cloud metadata endpoints；白名單域直抓；**可疑指令原文引述進 `Unverified` 段落供人審而非執行**。「引述存證」這步是「注入不信」規則之上的增量。
- **`templates/commands/clarify.md` 的機制設計**——上限 5 個高針對性問題、答案**回寫進 spec 檔**而非留在對話裡。「不確定就問」的原則落成機制的範例。
- **`templates/commands/analyze.md`**——跨產物（spec↔plan↔tasks）一致性稽核 prompt：STRICTLY READ-ONLY、constitution 衝突自動 CRITICAL 且不得以稀釋原則的方式「解決」、修復需顯式核准。severity 分級與唯讀約束措辭可直接參考。
- **`templates/spec-template.md` 的結構元素**——user story 強制優先級化＋每個 story 獨立可測（單獨實作即成 MVP）＋ Independent Test 欄＋ Given/When/Then 驗收句式。**別整份抄**：先 diff 既有派工模板，只嫁接缺的元素。
- 抽取時一律釘 tag 取檔（`gh api "repos/github/spec-kit/contents/<path>?ref=v0.16.0"`）並在檔頭記 source＋tag——上游近乎日更，不釘 provenance 之後對不上原文。
- 註：`scripts/` 三套（bash/PowerShell/Python）等價實作＋`*_python_parity.py` 是**維持重複**的工具（spec-kit 被迫跨 35+ 宿主）；本環境策略是消滅重複（單一 Python 實作），僅「同一腳本、雙引擎（powershell 5.1 vs pwsh 7）跑 parity」這個變體值得抄形。
- `.github/workflows/bug-{assess,fix,test}.md` + `.github/skills/add-community-extension/SKILL.md`——GitHub 自己用 SKILL＋Actions 做 repo 維運自動化的活範例；參考級，本環境 issue 量趨零不值得建。

---

### 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/Headroom — AI Agent Context 壓縮層|Headroom]]（同屬 agent 工作流強化層）
- [[Github/repos/resume-skills — 跨 AI Agent 的離線 session context 遷移工具（8×8）|resume-skills]]（同為跨 agent 中立設計）
