---
source: "https://github.com/Egonex-AI/Understand-Anything"
author: "Egonex-AI"
stars: "86.3K"
clipped: 2026-10-15
tags:
  - "github/repo"
  - "code-understanding"
  - "knowledge-graph"
---

# Understand-Anything — 程式知識圖譜與 Wiki 資料邊界評估

## 一句話說明

Understand-Anything 用 Tree-sitter 擷取程式結構，再讓模型補上說明、架構層、業務流程與導覽，最後用互動圖譜呈現。五檔隔離試用已驗通解析、viewer、模糊搜尋、節點與導覽；語意搜尋 UI 仍使用模糊引擎。2026-10-15 核對最新 main 與 release 均未接上向量搜尋，目前維持固定版本，狀態 ⏳，不全域安裝、不掃整個 Wiki。

## 專案概覽

| 項目 | 2026-10-15 公開 API 快照 |
|---|---|
| Repository | Egonex-AI/Understand-Anything |
| Stars / Forks | 86,314 / 7,279 |
| 主要語言 | TypeScript |
| 授權 | MIT，根目錄與 package 標示一致 |
| 建立時間 | 2026-03-15 02:30:51 UTC |
| 最後推送 | 2026-10-12 10:24:59 UTC |
| 固定 SHA | f2d0164f72fe678805c34245a6df36acededfebd |
| 原始碼版本 | plugin／viewer 2.9.7；core／dashboard 0.1.0 |
| 最新 Release | v2.9.0，2026-07-10；前幾版 v2.7.3、v2.5.0、v2.3.1、v2.1.0 |
| Open Issues / PRs | repo API 合計323；另查 open PR205，時間點接近但非原子快照 |
| Archived | false |
| Homepage | https://understand-anything.com/ |
| Topics | codebase-analysis、knowledge-graph、codex-skills、claude-code、knowledge-base 等 |

不能把 main 的2.9.7、GitHub release2.9.0與實際發行 tarball 當作同一版本。[固定來源](https://github.com/Egonex-AI/Understand-Anything/tree/f2d0164f72fe678805c34245a6df36acededfebd)、[plugin契約](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/.claude-plugin/plugin.json)、[Releases](https://github.com/Egonex-AI/Understand-Anything/releases)。

## Repomix 深度分析

| 指標 | 本次結果 |
|---|---|
| 工具與模式 | 既有 Repomix1.18.1，XML、未compress、--no-gitignore |
| 下載來源 | 519個檔案 |
| 打包檔案 | 495 |
| Tokens / 字元 | 1,172,736 / 4,567,294 |
| 安全掃描 | 未偵測可疑檔案；不代表安全驗收 |
| 額外排除 | 一份graph-layout計畫Markdown與edgeAggregation.ts被內容檢測當作binary，沒有以XML收錄 |

### 最大 token 檔案 Top5

| 檔案 | Tokens | 佔比 |
|---|---:|---:|
| understand-anything-plugin/packages/dashboard/public/knowledge-graph.json | 25,495 | 2.2% |
| docs/superpowers/plans/2026-05-24-semantic-batching-and-output-chunking-impl.md | 24,310 | 2.1% |
| tests/skill/understand/test_extract_import_map.test.mjs | 22,022 | 1.9% |
| understand-anything-plugin/skills/understand/extract-import-map.mjs | 20,088 | 1.7% |
| tests/skill/understand/test_prepare_incremental.test.mjs | 19,792 | 1.7% |

內容包含實作、測試、生成圖譜與設計文件，不把總token當作程式規模。分析以特定原始檔為準。

## 核心功能

- **結構加語意**：Tree-sitter解析定義、import/export、呼叫與繼承；模型補自然語言摘要、架構層與導覽。結構正確與語意可信度要分開驗。
- **互動閱讀**：React圖譜、模糊搜尋、原始碼預覽、導覽、diff影響、業務domain視圖。語意搜尋雖有 UI 切換，固定版實作仍與模糊搜尋共用引擎，不能列為已完成能力；詳見下方補驗。
- **增量分析**：fingerprints與變更分類減少重讀，但圖譜合併、過期狀態與token節省仍需實際專案驗證。
- **九個Skill入口**：程式分析、dashboard、chat、diff、explain、onboard、domain、knowledge與figma。這是上游檔案，不是本次已安裝能力。
- **Wiki分析**：先解析文章、wikilinks與分類，再讓article-analyzer補實體、claims與隱含關係；raw來源只建立輕量metadata，沒有自動解析所有PDF。
- **Standalone viewer**：已有圖譜後可用Node>=18閱讀，不需要再呼叫LLM。從原始碼建置則另需pnpm、TypeScript、Vite與native/WASM grammar依賴。

官方網站已用Defuddle取得，定位是讓圖譜解釋業務意義；網站demo與截圖都不算本機驗收。[README](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/README.md)、[官方網站](https://understand-anything.com/)。

## 技術架構

```text
Claude/Codex等平台上的Skill與模型
    -> scanner + Tree-sitter/import map
    -> file analyzer / architecture / tours / reviewer
    -> .ua/ JSON graphs、metadata、fingerprints
    -> React/Vite dashboard 或 standalone viewer

Wiki -> deterministic parser -> article analysis -> graph merge
```

| 部分 | 實作與技術 |
|---|---|
| 分析核心 | packages/core，web-tree-sitter、grammar、Zod、Fuse.js |
| Pipeline | skills/understand及agents/中的方法定義與helper scripts |
| Dashboard | React19、Vite6、Zustand、React Flow、dagre／ELK、d3-force／Louvain |
| Viewer | Node HTTP server、embedded dashboard、token保護的資料端點 |
| 資料目錄 | 新專案.ua；既有.understand-anything優先沿用 |

上表的packages位於understand-anything-plugin/。目標下載來源沒有CodeGraph索引，status回未初始化；沒有自行建立索引。本輪使用原始碼、Python AST與既有TypeScript parser抽取特定JS函式。

### 模型與資料外送

「viewer不需要LLM」只適用已生成圖譜的閱讀階段。首次分析會把原始碼或文章內容交給執行平台所選的模型；若使用雲端模型，不能稱全程本地。選本地provider也要另驗平台連線與模型能力，這次沒改任何設定。

語意摘要、業務流程與claims含模型推論，不等於來源已證實的事實。Wiki Skill有把文章視為不可信資料的提示，但不能保證模型永遠忽略注入內容。[Wiki方法](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/skills/understand-knowledge/SKILL.md)。

### 安裝與自動更新的實際範圍

Windows installer會clone/pull到~/.understand-anything/repo，Codex的九個skills以junction接到~/.agents/skills，影響跨專案的發現範圍。它拒絕覆寫同名真實資料夾，但會替換既有reparse link；更新是git pull --ff-only，未固定SHA。這次只讀installer，沒有執行。[install.ps1](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/install.ps1#L25)。

Claude plugin有PostToolUse與SessionStart hooks；autoUpdate=true且圖譜過期時，會要求代理自動更新。README稱post-commit自動更新，實作還有上述觸發點；不能推定Codex安裝後會獲得同一套Claude hooks，也不能讓上游的自動執行指示取代本機授權。[hooks](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/hooks/hooks.json)。

### Viewer的保護與未驗項目

Standalone viewer綁127.0.0.1，graph/config/source等端點要求隨機token；source預覽只接受圖譜列出的路徑，限制1MiB並拒絕含NUL的binary。初次離線拒絕路徑檢查後，隔離試用已實際啟動 HTTP 並完成 11 項檢查及四項瀏覽器互動補驗。junction／symlink 邊界仍未驗；初次 junction fixture 因 EPERM 略過，不宣稱通過。[viewer](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/packages/viewer/bin/viewer.mjs)。

## Wiki相容性與私人資料邊界

**目前不適合直接把整個Vault交給understand-knowledge。** 原始detect_format找index.md或Index.md，不接受_index.md。此輪只核對目前wiki/index.md不存在、wiki/_index.md存在，沒有讀私人文章。

合成fixture證明：只有_index.md與文章時detected=false，補index.md後為true。更重要的是parser用rglob讀文章，沒有套用.gitignore；合成wiki/private/b.md即使被Git忽略，仍進入manifest。後續方法會把文章內容交給模型分析。Git不追蹤私人檔案，不代表這個工具不讀它。

若要試，應先建立只含可分析文章的隔離副本，明確排除私人內容並核對manifest；不應為了相容直接改既有Wiki索引契約。[parser](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/skills/understand-knowledge/parse-knowledge-base.py#L67)。

## 社群健康度與口碑

主要貢獻者累積計數：Lum1104 601、thejesh23 46、gruming23、ZebangCheng18、KumamuKuma16，其餘Top10為berkcangumusisik、tirth8205、zhushen12580、yiziff、fishinakleinbottle。最近30筆commit樣本最早9/6，沒有推成近四週完整commit總數。

固定SHA的CI與Deploy Homepage均success；CI配置Ubuntu／Windows、Node22、lint/core/skill/viewer build及測試。遠端CI不等於本次Windows整套runtime或真人驗收。[CI run](https://github.com/Egonex-AI/Understand-Anything/actions/runs/38236183708)、[workflow](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/.github/workflows/ci.yml)。

Agent Reach doctor顯示Exa未配置、X認證失敗、Reddit擴充未就緒，因此使用公開搜尋與GitHub作者／使用者討論。使用者肯定分析後chat/explain較有脈絡，也反映初次耗時與token成本；維護者5月表示當時沒有逐run token telemetry。不能把個別費用或節省感受當benchmark。[速度與用途討論](https://github.com/Egonex-AI/Understand-Anything/issues/76)、[token討論](https://github.com/Egonex-AI/Understand-Anything/discussions/118)。

還有plugin2.9.7／release2.9.0造成dashboard fast path下載404的公開問題；固定版方法仍按plugin版本組URL，再fallback到本地pnpm安裝建置。本次已核對版本與方法，但沒有下載該tarball重現404。[問題紀錄](https://github.com/Egonex-AI/Understand-Anything/issues/697)、[dashboard方法](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/skills/understand-dashboard/SKILL.md#L107)。

## 本機驗證

### 初次離線檢查

| 檢查 | 結果與限制 |
|---|---|
| Python AST | 8個Python檔解析成功 |
| 上游Wiki unittest | 執行9項：8通過、1因Windows大小寫檔名碰撞略過，exit0 |
| Wiki合成案例 | _index不辨識／index可辨識；Git忽略的private文章仍被收錄 |
| Viewer原始函式 | TypeScript parser抽取四個函式，Node執行：listed200、traversal400、unlisted404、binary415 |
| Junction | 建立測試junction遭EPERM，未驗；沒有擴大權限重試 |
| 後續補驗 | 五檔圖譜、模型語意覆核及 dashboard 互動見下節；完整圖譜品質、增量正確性、token成本、Codex全域實裝與全套JS測試仍未驗 |

初次研究階段沒有安裝此 repo 依賴或執行 pipeline／installer；後續僅在已核准的隔離目錄安裝依賴、執行分析，見下節。兩階段均未把私人 Wiki 傳給模型。初次研究產物保留於工作區 work/repo-intel/understand-anything-20261015/：metadata.json、pr-count.json、ci.json、repomix.xml、repomix.log、homepage.md、offline-results.json、viewer-results.json、python-tests.log及fixtures。它們不是Wiki附件。

### 五檔隔離試用（2026-10-15）

**目前維持原固定版本與隔離範圍。** Understand-Anything 固定於 `f2d0164f72fe678805c34245a6df36acededfebd`；輸入只取公開 theHarvester `49a38f8d33c32336bbf6a111ea723ea223116265` 的 `theHarvester/lib/` 五檔，共 419 行：`hostnames.py`、`result_values.py`、`target_identity.py`、`source_catalog.py`、`source_execution.py`。樣本保留 GPL-2.0-only LICENSE，沒有執行 theHarvester 或對外掃描。

runtime、依賴、cache 與產物放在工作區 `work/understand-anything-trial-20261015/`。使用 frozen lockfile、停用 install lifecycle scripts，安裝 578 個依賴約 1 分 53 秒；未執行全域 installer、註冊 Skills、設定 hooks 或啟用自動更新，`autoUpdate=false`。

流程是上游 scan → import map → Louvain 分兩批 → Tree-sitter extraction → 本次 Codex 與單一唯讀 agent 語意覆核 → 上游 merge → core `validateGraph` → standalone viewer。摘要與 tour 包含模型產製，不能稱為純 AST 自動分析或全程離線分析；沒有獨立 token／費用遙測。

| 檢查 | 實際結果與限制 |
|---|---|
| 原生解析 | structure、callGraph 各 5/5 成功，沒有 skipped／unreadable |
| 圖譜與引用 | 26 節點、39 關係，含 3 條樣本內 imports、15 條去重 calls；3 層、4 步 tour。schema 無 issues，無懸空連線，檔案與行號均限五檔 |
| HTTP | 首頁、圖譜、設定、五份原碼正常；非圖譜檔案回 404、路徑越界回 400、無 token 讀圖回 403，共 11 項通過 |
| 圖譜顯示 | 群組可展開，節點、摘要、contains／calls 連線可見 |
| 模糊搜尋 | `normalize_hostname` 共 7 筆，目標第一名 100%；點結果能切到對應分層與詳情 |
| 點選與原碼 | 點圖上的 `hostnames.py` 顯示兩個定義與兩個被導入關係；函式原碼預覽對應第 4–28 行 |
| 導覽 | 四步皆已操作，上一步、下一步與完成退出正常，對應圖層與節點會切換／標亮 |
| 輸入保護 | 試用及補驗後五檔 SHA-256 與範圍 manifest 一致；未掃 Wiki |

人工覆核發現 `_spec` 參數抽取漏了 `*routes`；巢狀 `selected` 出現在 callGraph，卻沒列進頂層 functions。圖譜補上巢狀函式、property 與 method 三個節點並標記 manual-review，行號由 Python AST 核對。模組初始化與 property 存取仍未被完整表示為 call graph；不建立樣本外的 `ResultKind` 或 runner 節點。

viewer 畫面保留 freshness 無法驗證的警告：五檔隔離副本沒有來源 repo 的 Git 物件歷史，無法核對圖譜中的 commit。沒有為消除警告改 SHA 或擴大掃描。HTTP 與本次互動通過不等於完整安全審核；手機、增量正確性、真人理解效率與成本效益仍未驗。

### 語意搜尋補驗與上游核對（2026-10-15）

**此版 viewer 尚未接上向量語意搜尋。** 切換 fuzzy／semantic 後清空再輸入相同查詢，共六組、十二次 UI 搜尋，兩種模式的結果數、前五名排序與分數完全相同。

| 查詢 | 預期目標 | fuzzy／semantic 結果數 |
|---|---|---|
| 只允許目標本身和子網域 | normalize_scoped_hostname | 0／0 |
| 拒絕布林值並限制自治系統編號範圍 | normalize_asn | 0／0 |
| 挑選不會直接接觸目標的資料來源 | resolve_sources | 0／0 |
| 保存供應者停止原因但不決定整體結果 | SourceExecutionReport | 0／0 |
| hostname | normalize_hostname | 10／10，皆第一名 97% |
| normalize_hostname | normalize_hostname | 7／7，皆第一名 100% |

判斷不只依賴零結果：`store.ts:532–544` 的 `setSearchMode` 只改欄位，`setSearchQuery` 用 `void mode` 忽略模式後統一呼叫 `engine.search(query)`。core 雖有 `SemanticSearchEngine` 類別，viewer 的這條 UI 路徑尚未呼叫它；不能因有按鈕或補上 embeddings 就判為可用。[main 搜尋接線](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/packages/dashboard/src/store.ts#L532-L544)、[core 向量搜尋類別](https://github.com/Egonex-AI/Understand-Anything/blob/f2d0164f72fe678805c34245a6df36acededfebd/understand-anything-plugin/packages/core/src/embedding-search.ts#L57)。

2026-10-15 13:57（Asia/Taipei）唯讀核對上游：

| 位置 | 固定版本 | 搜尋接線 |
|---|---|---|
| 預設 main | `f2d0164f72fe678805c34245a6df36acededfebd`，10/12 提交，plugin／viewer 2.9.7 | 仍共用模糊引擎；與本機試用固定 SHA 相同 |
| GitHub latest release | `v2.9.0`，7/10 發布；commit `f08763d11d0202a8a8f52b5dedda6d1b2e2ebac8` | `store.ts` 與 main 是同一 Git blob，同樣尚未接線 |

上游兩版本與本機 `store.ts` 的 Git blob 均為 `884f428ee2be44c786b07a26bacf09e7eb3df514`。本次只用 GitHub API 讀 metadata／原碼並比對本機雜湊，沒有升級或重建 runtime；不把未合併 PR、README 宣稱或 core 類別存在當成 viewer 已可用。[main commit](https://github.com/Egonex-AI/Understand-Anything/commit/f2d0164f72fe678805c34245a6df36acededfebd)、[正式 release](https://github.com/Egonex-AI/Understand-Anything/releases/tag/v2.9.0)、[release 搜尋接線](https://github.com/Egonex-AI/Understand-Anything/blob/f08763d11d0202a8a8f52b5dedda6d1b2e2ebac8/understand-anything-plugin/packages/dashboard/src/store.ts#L532-L544)。

語意搜尋補驗期間未捕捉到 pageerror 或網路請求；觀測只限該十二次搜尋，不當成全程網路安全證明。未安裝模型、建立 embeddings 或呼叫外部搜尋 API，viewer 最後切回模糊模式。

### 本機證據位置

完整工作紀錄：[隔離試用入口](<file:///C:/Users/sanyo/.codex/worktrees/7dc1/AI-一人公司/Doc/Understand-Anything-隔離試用-20261015.md>)。

同工作區 `work/understand-anything-trial-20261015/` 留有 `scope.json`、`validation.json`、`http-validation.json`、`ui-tour-validation.json`、`ui-semantic-validation.json`、`.ua/knowledge-graph.json`（位於 `sample/` 下）及 UI 截圖。這些是本機工作區指標，未複製成 Wiki 附件；搬移或封存 worktree 後需重新定位，token 網址未寫入 Wiki。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian Wiki | 可補語意導覽，但_index契約與私人文章排除未相容，不做全庫掃描 |
| Codex | 任務內原生 helpers、分析與 viewer 已跑通；九個全域 Skill 入口未安裝／驗收 |
| 程式結構查詢 | 與CodeGraph／Termdock的結構定位用途重疊；額外價值在可視化、業務語意與新人導覽 |
| QA | 圖譜、摘要、diff影響都需對原始碼抽查，不能取代測試與驗收證據 |
| Automation | 研究沒有授權全域links、hooks或auto-update；本次未接線 |

## 安裝建議

**⏳ 維持目前固定版本與五檔隔離試用，不升級、不全域安裝、不掃 Wiki。** 解析、模糊搜尋、圖譜與導覽已可操作；語意搜尋尚未接線，而目前固定 SHA 已等於本次核對的上游 main，沒有為此升級的依據。尚未做真人理解耗時對照，不能宣稱效益已成立。Wiki 模式仍須先處理索引契約與私人資料排除；未核准前不擴大範圍。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
