---
source: "https://github.com/tlzmw001/naiyue-skills"
author: "tlzmw001 (naiyue 奈月)"
stars: "4"
clipped: 2026-07-27
tags:
  - "github/repo"
  - "claude-code-skill"
  - "cross-host-skill"
  - "skill-audit"
  - "prior-art-research"
---

# naiyue-skills — 跨宿主的四支元技能工具箱（審 skill／調研／建 skill／思考框架）

> **tlzmw001/naiyue-skills** | ⭐ 4 | 🍴 0 | 📝 **MIT** | Python
> "奈月的 Claude skill 工具箱：AI 只做判断题，控制权交给确定性结构"

## 一句話說明

四支**元技能**（meta-skill）——不做業務，做「開工前後的判斷工序」：`skill-auditor`（把第三方 skill 的宣稱拆成 claim，丟進沙箱多輪實跑，逐條給證實／證偽／無法驗證的可追溯報告）、`prior-art-scout`（開工前多來源調研既有方案並做採用決策）、`naiyue-skill-builder`（skill 建構編排器）、`naiyue-thinking`（個人工程判斷框架）。全 repo 的中心主張寫在 description 裡：**AI 只做判斷題，轉不轉／停不停／狀態怎麼落，全部交給確定性腳本**。

## 專案概覽

| 項目 | 數值 |
|---|---|
| Stars / Forks | 4 / 0 |
| 主要語言 | Python 175.8 KB + Shell 2.9 KB |
| 授權 | **MIT**（Copyright 2026 naiyue） |
| 建立時間 | 2026-07-05 |
| 最後推送 | 2026-07-19（本文撰寫時 8 天前） |
| Issues / PRs | 0 / 0 |
| Release | 無 |
| Topics / 首頁 | 無 |
| Commit 數 | 3（`655cfb5` 07-05 skill-auditor → `4678da2` 07-15 統一倉庫佈局 → `014d3bf` 07-19 擴充 builder 與 prior-art）|
| 貢獻者 | tlzmw001 一人（`/contributors` API 回空，以 commit 作者判定）|
| CI | **無**（`.gitignore` 為 `.github/workflows/` 留了白名單但目錄不存在）|

### Repomix 指標

| 指標 | 數值 |
|---|---|
| 總檔案數 | 67（symlink 不計） |
| 總 Tokens | 88,979 |
| 壓縮模式 | 否（repo 僅 159 KB） |

**最大 token 消耗檔案 Top 5**

| 檔案 | Tokens | 佔比 |
|---|---|---|
| `skills/prior-art-scout/references/research-design.md` | 4,320 | 4.9% |
| `skills/prior-art-scout/SKILL.md` | 4,153 | 4.7% |
| `skills/prior-art-scout/tests/test_validate_workspace.py` | 3,896 | 4.4% |
| `skills/skill-auditor/SKILL.md` | 3,277 | 3.7% |
| `skills/prior-art-scout/scripts/tikhub_x_normalize.py` | 3,233 | 3.6% |

`prior-art-scout` 一支就佔掉前五名的三席——它是本 repo 最重的 skill，也是唯一有完整測試套件（8 個測試檔、45 個測試）的。

## 與 naiyue-cover-generator 的關係（結論：互補，不是重複）

同作者的姊妹 repo [[Github/repos/naiyue-cover-generator — Codex 用的文章封面與段內說明圖 Skill 組|naiyue-cover-generator]]。用時間、目錄、語言、內容四路比對：

| 比對軸 | naiyue-skills | naiyue-cover-generator |
|---|---|---|
| 建立 → 最後推送 | 2026-07-05 → 07-19 | 2026-07-25 → 07-25 |
| 語言 | Python（純標準庫）+ Shell | JavaScript `.mjs`（sharp + yaml） |
| 授權 | **MIT** | **無 LICENSE** |
| Skill 數／名稱 | 4：skill-auditor / prior-art-scout / naiyue-skill-builder / naiyue-thinking | 2：naiyue-cover / naiyue-paragraph-graph |
| 領域 | 元工序（審查、調研、建構、判斷） | 圖像生產（封面、段落說明圖） |
| 宿主 | Codex + Claude Code 雙入口，**不綁宿主能力** | 實質綁 Codex 內建 `image_gen` |
| 檔案／skill 名重疊 | **零** | **零** |

**判定：後繼但非取代，兩者是不同方向的姊妹作。** naiyue-skills 先出（早 20 天），cover-generator 後出。兩者共用**同一套倉庫慣例**——`skills/<name>/` 單一源碼、`.agents/skills/` 與 `.claude/skills/` 各放一個 symlink 當發現入口、`AGENTS.md` 當唯一維護規則來源。naiyue-skills 的 `AGENTS.md` 把這套慣例寫成了明文規範（含「遷移 Skill」章節），cover-generator 則是這套慣例的第二次套用。

**該追蹤哪一個？** 對本環境而言 **naiyue-skills 是正本**：它有 MIT 授權、零 pip 相依、雙宿主可用、有測試；cover-generator 無授權、IP 素材權利不明、Codex 專屬。cover-generator 的價值集中在那五條反幻覺機制的**設計思路**（可讀不可裝），naiyue-skills 則是**可直接安裝的工具**。

補充：作者另有一個獨立的 `naiyue-skill-builder` repo（2026-06-08，⭐0，此後未動）——它已被吸收進本 repo 的 `skills/naiyue-skill-builder/`，`AGENTS.md` 的「遷移 Skill」章節就是為此寫的。那個舊 repo 可視為已停更。

## 四支 Skill

### `skill-auditor` — skill 一致性審計（本 repo 最有價值的一支）

回答「**這個 skill 宣稱的能力，與它實際的表現是否一致？**」，輸出逐條聲稱、證據可追溯的審計報告。

架構是「確定性骨架 + 一處受控自迭代」：

- `claims.json` 是**單一事實源**（作者稱之為「脊柱」）：驅動循環、累積證據、投影報告，三職責一份資料。
- **AI 只做局部判斷**（拆聲稱、構場景、跑任務、判單條狀態、寫歸因）；**轉不轉、停不停、狀態怎麼落、報告怎麼出，全部由 `scripts/` 執行**。主 Agent 也不准直接編輯 `claims.json`。
- **唯一的自迭代**在循環體內：claim 的灰區觸發下一輪針對性場景，直到灰區清零或撞預算。

五條鐵律裡有三條特別值得抄：

1. **終態 claim 永不重測、永不改判**——堵住「多跑幾輪湊個好結論」。
2. **實跑 Agent 絕不收到 claim statement 或驗證意圖**，只拿到 task/setup/observe——防取證偏向。
3. **狀態判定 Agent 只拿 runtime 證據，不拿 design 證據**——防「看程式碼覺得爛」污染實證判斷；機制歸因隔離到 Phase 4 才做。

流程 Phase 0–5，兩個 interactive 硬停（claim 清單確認、依賴收齊）。硬停 1 明講是「全流程槓桿率最高的人工介入點」，且允許使用者**注入自己關心的場景**轉成新 claim。`cleanup.py` 預設保留 `review/` 複盤包而非全刪，`--purge-all` 才清零。

無子 Agent 環境（如 Claude.ai）有降級路徑：主 Agent 親自串行執行，隔離紀律靠自律。

### `prior-art-scout` — 開工前技術方案調研

「別人試圖解決什麼問題、用什麼工具流程技術、我能否直接用或借鑑、前人踩過什麼坑、共同還有什麼沒解決」。明講**不是產品熱度排行，star 只是參考信號**。

15 條鐵律中最反直覺的幾條：

- **鐵律 1：盡力證明「有人做過」。發現高度重疊的成熟方案是成功，不得為了支持開工而弱化重疊。**（反確認偏誤）
- **鐵律 2：存疑候選不得無記錄丟棄**，超預算標 `relevant_not_deep_verified`，不得偽裝成已驗證結論。
- **鐵律 6：判路線不可行必須有死因證據；專案停更 ≠ 路線不可行。**
- **鐵律 9：只能寫「本輪深驗方案中尚未解決」，不得從有限樣本推導「行業無法解決」。**
- **鐵律 11：廣搜不等於多讀**——初搜只抓輕量 metadata，GitHub 不在發現階段批量拉 README/commit/Issue，每源最多 5 個進深驗。
- **鐵律 14：Web 優先用宿主原生搜尋；宿主無搜尋時不得假裝執行，也不得自動安裝 MCP、索要新 key 或靜默切換 provider。**

工作區有 JSON schema 硬約束（`query-plan` / `candidate` / `scheme-card` / `selection` / `web-capture`），`validate_workspace.py` 在 Phase 4 前與 Phase 5 各跑一次。X 來源走 TikHub（**付費 API**，需 `TIKHUB_API_KEY`；key 只讀環境變數，macOS 可從 Keychain 兜底，禁止落檔／命令列／log）。

### `naiyue-skill-builder` — skill 建構編排器

四條路由（提煉個人思維 / 抽模版 / 寫新 skill / 記錄回饋）各載一份 reference。明講「不替代官方 `skill-creator`」，宿主有官方 skill-creator 時用它初始化再追加校驗。持久狀態在 `assets/registry.yaml` 與 `assets/global-rules.md`。驗證做 L1/L2/L3（宣告過的檔存在／內容是真實現不是 TODO 空殼／SKILL.md 已引用且流程能到達）。

### `naiyue-thinking` — 個人工程判斷框架

五張條件-動作-原因表（判斷順序／方案判斷／學習節奏／Skill 優化原則／機制直覺）。核心是「一次記錄、二次標記候選、三次才固化成檢查/測試/skill」的三振機制，以及「規則穩定且可機械判斷 → 落成 schema/validator/CI 門禁，確定性機制比反覆強調 prompt 可靠」。

（注：description 寫「耐阅」、README 與 repo 名寫「奈月」，同一人的兩種寫法。）

## 技術架構

```
naiyue-skills/
├── AGENTS.md                    ← 維護規則唯一來源（CLAUDE.md 只 @AGENTS.md 導入）
├── LICENSE (MIT)
├── .gitignore                   ← 白名單模式：/* 全忽略，逐項 re-include
├── docs/repository-layout.md
├── skills/<name>/               ← 唯一可編輯源碼
│   ├── SKILL.md                 只留觸發描述、主流程、資源導航
│   ├── references/*.md          按需載入的細則
│   ├── scripts/*.py|*.sh        確定性操作
│   ├── schemas/*.json           資料契約（prior-art-scout）
│   ├── assets/                  輸出素材與持久狀態
│   ├── agents/openai.yaml       Codex 展示資訊（不得成為核心依賴）
│   └── tests/                   prior-art-scout 有 45 個測試
├── .agents/skills/<name> → ../../skills/<name>   symlink（Codex 發現入口）
├── .claude/skills/<name> → ../../skills/<name>   symlink（Claude Code 發現入口）
└── tests/                       repository_layout + user_thinking_config（16 測試）
```

| 層次 | 技術 |
|---|---|
| 執行時 | Python 3（**純標準庫**，零 pip 相依：argparse/json/pathlib/urllib/subprocess） |
| 外部 CLI | `gh`（GitHub 搜尋，`gh_fetch.sh`）、bash |
| 付費 API | TikHub（僅 prior-art-scout 的 X 來源；不用可跳過該源） |
| 資料契約 | JSON Schema + 專用 validator 腳本 |
| 跨宿主 | 單一源碼 + 雙 symlink 入口；核心流程不得依賴 `.claude/`／`.agents/` 路徑，一律用 `SKILL_DIR` 解析 |

`.gitignore` 用**白名單模式**（`/*` 先全忽略再逐項放行），並禁止 `git add -f` 繞過——這是本 repo 少見的「發布邊界」設計，值得單獨學。

## 實測驗證（本機 Windows 11，2026-07-27）

不採信 README 自述，實際 clone 跑過：

| 驗證項 | 結果 |
|---|---|
| `quick_validate.py` × 4 skills | ✅ **4/4 passed** |
| 根 `tests/` 16 測試 | ❌ **9 failed**（環境問題，見下） |
| `prior-art-scout/tests/` 45 測試 | ❌ **2 errors**（環境問題） |
| symlink 還原 | ❌ **失敗** |

失敗全數是 **Windows 環境問題，不是邏輯 bug**，但對本環境是真實阻礙：

1. **symlink 在 Windows 上還原不了。** 預設 clone 下來，`.claude/skills/skill-auditor` 是一個 33 bytes 的純文字檔，內容是 `../../skills/skill-auditor`——不是連結。加 `-c core.symlinks=true` 重 clone，本機直接 `error: unable to create symlink ... Permission denied` + `fatal: unable to checkout working tree`（需開發者模式或管理員權限）。**結論：repo 層級的雙宿主發現入口在本機不可用**；但這不影響安裝，因為正確用法是把 `skills/<name>/` 複製進 `~/.claude/skills/`。
2. **測試硬編碼 `python3`。** Windows 無 `python3` → exit code 9009（Microsoft Store 別名攔截），`tests/test_user_thinking_config.py:28` 寫死 `["python3", str(SCRIPT)]`；另有 2 個 error 是 `WinError 193` 試圖執行 `.sh`。跑測試需自行改用 `py -3` 或絕對路徑 + git-bash。

同時發現一處**作者自己的規則沒對齊**：`AGENTS.md` 明訂「新腳本必須有測試」，但 `skill-auditor` 的 5 支腳本（`claims.py`／`update_states.py`／`render_report.py`／`init_workspace.py`／`cleanup.py`）**一個測試都沒有**——而這 5 支正是整個 skill 可信度的承重牆（「AI 不准直接編輯 claims.json」的保證全押在它們身上）。測試覆蓋集中在 prior-art-scout。

## 社群口碑

⭐4、0 issue、0 PR、0 fork、無 release。依 repo-intel 規則（stars < 1,000）**跳過 Phase 4 社群口碑與 Phase 4.5 YouTube 教學訊號**——不是查不到，是查了也只會是雜訊。無 `homepageUrl`，Phase 3 文件站爬取同樣跳過。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| **Claude Code** | **直接可用，且比姊妹 repo 更 Claude-native。** 有 `.claude/skills/` 入口、不依賴任何宿主專屬能力（無 `image_gen`）。`skill-auditor` 的並發子 Agent 派發架構本來就是照 Claude Code 的 Agent tool 設計的，Codex 側反而要降級。 |
| **既有 skill 群** | `skill-auditor` ↔ 已裝的 **`audit-skill`** 直接撞：兩者都在「審 skill」，名稱近乎相同，觸發詞「審核這個 skill／測一下這個 skill」會打架。但**能力層級不同**：`audit-skill` 是靜態審查（結構合規、觸發詞品質、指令清晰度）；`skill-auditor` 是**實跑取證**（沙箱多輪、逐條 claim 證實／證偽）。是升級不是重複。 |
| **`prior-art-scout` vs `repo-intel`/`research`/`research-deep`** | 互補但重疊。`repo-intel` 是單一 repo 深度；`prior-art-scout` 是**開工前多候選 + 採用決策**，且有 schema 驗證與名額上限（每源 ≤5）。目前無此工序的專用工具，但 `research-deep` + `repo-intel` 手動組合可覆蓋七成。 |
| **`naiyue-thinking` vs institution 制度層** | **高度同構、低增量。** 「AI 做判斷題、確定性機制做規則」＝ 模型調度三鐵則 + R17；「同類問題第三次才固化」≒ 迴歸案例集「同類失敗 ≥2 次才建」；「文件與實作不一致時以程式碼與可複現結果為事實」≒ R12。**這是獨立收斂的高信度訊號**（兩套系統各自演化到同一結論），但裝了會與 CLAUDE.md/institution 搶規則權威。 |
| **`naiyue-skill-builder` vs 新增 Skill SOP** | 衝突。它假設「新 skill 放在本 repo 的 `skills/`」，本環境的 SOP 是 `infra/skills-backup/` → `~/.claude/skills/` → `my-marketplace/` 三處同步。 |
| **Obsidian Vault** | 無直接關聯，屬工具層。 |
| **Windows 可用性** | 零 pip 相依 ✅；`gh` 已有 ✅；bash 走 git-bash ✅；symlink ❌（不影響手動安裝）；`python3` 硬編碼需改 ⚠️ |

## 安裝建議

### `skill-auditor` — ✅ 建議安裝（指名調用限定）

本環境反覆吃過「skill 名不副實」的虧：`hallmark` 裝了三個月後判定「未勝 design-taste-frontend → 移除」、`pixelshot` 靜默失效數週才發現、`guizang-material-illustration` 長期掛觀望無法結論、`last30days` 的 1400 行輸出協議與實際需求不成比例。這些全是**「宣稱 vs 實測」的落差**，而現有 `audit-skill` 只做靜態檢查，測不出來。`skill-auditor` 填的正是這個空白：沙箱實跑 + 逐條 claim 終態 + 證據可追溯。

安裝時三件事必做：

1. **改名避撞**（建議 `skill-runtime-auditor`），並在 description 明寫「指名調用限定」——與 `audit-skill` 觸發詞高度重疊，不改會隨機打架。`hallmark` 已用過這個模式，有效。
2. **走本環境新增 Skill SOP**（`infra/skills-backup/` → `~/.claude/skills/` → marketplace），不要 clone 整個 repo 靠 symlink 發現（本機做不到）。
3. **腳本用絕對路徑呼叫**（`C:\Python314\python.exe`），`python3` 在本機 Bash tool 抓不到。

首次使用建議拿一個**已知結論**的 skill 當校準對象（例如已判定移除的 `hallmark`），看它的結論是否收斂到相同答案——這比直接拿它去審未知 skill 更能檢驗它自己。

### `prior-art-scout` — ⏳ 觀望

流程重（5 phase、2 個硬停、schema 驗證），X 來源要付費 TikHub，且七成能力被 `research-deep` + `repo-intel` 組合覆蓋。

- **升級條件（→ ✅ 裝）**：下次出現真正的「開工前選型」場景（候選 ≥5 個、要做採用/自研決策，例如換 career-ops 的爬取方案或選 hyperframes 替代品）→ 跑一次實測，若報告品質明顯高於現有組合就裝。
- **放棄條件（→ ❌ 不裝）**：3 個月內沒有觸發場景；或跑一次後發現兩個硬停在單人工作流下純粹是摩擦、產出不如 `repo-intel` × N + 人工彙整。

### `naiyue-thinking` — ❌ 不安裝

與 `docs/institution/02-judgment-rubrics.md` + `karpathy-guidelines` + CLAUDE.md R 系列八成同構，且以「奈月個人偏好」為錨、簡體中文書寫。裝進來會多一層與現有制度層搶權威的規則。**價值在對照閱讀**：它的「機制直覺」表（一次記錄→二次標記→三次固化）比 institution 現有寫法更精簡，可考慮吸收進 02 而非整裝。

### `naiyue-skill-builder` — ❌ 不安裝

與本環境新增 Skill SOP 的目錄假設直接衝突。唯一可抄的是 `quick_validate.py` 的 **L1/L2/L3 檢查**（宣告的檔存在／內容非空殼／SKILL.md 有引用且流程可達）——這 60 行純標準庫腳本本機實測 4/4 通過，可獨立取用併進 `Sync-Skills.ps1` 或 `audit-skill`。

## 誠實標注：本次分析的缺口

- **Phase 3（defuddle 文件站）跳過**：`homepageUrl` 為空，無官方文件站可爬。
- **Phase 4（社群口碑）跳過**：⭐4 遠低於 1,000 門檻，依 skill 規則不執行；未用 WebSearch 補，因為 4 星專案的社群搜尋結果必為雜訊。
- **Phase 4.5（YouTube 教學訊號）跳過**：同上門檻。
- **`skill-auditor` 的實際審計效果未驗證**：只讀了 SKILL.md 與流程設計，**沒有真的跑一輪完整審計**（需要 workspace + 多輪子 Agent + 一個被測 skill，成本高於本次分析預算）。上面關於「它比 audit-skill 強」的判斷是**基於設計的推論，不是實測結論**。
- **`prior-art-scout` 的 X 來源未驗證**：無 TikHub API key，該路完全沒測。
- **測試失敗歸因**：9 failed + 2 errors 我判定為 Windows 環境問題（`python3` 缺失 + symlink 權限），依據是失敗訊息明確指向 exit 9009 / WinError 193 / "must be a symlink"，**未在 Linux/macOS 上複跑確認全綠**。

## 相關連結

- [[Github/_index|GitHub Repo 索引]]
- [[Github/repos/naiyue-cover-generator — Codex 用的文章封面與段內說明圖 Skill 組|naiyue-cover-generator]]（同作者姊妹 repo，圖像生產方向，共用同一套倉庫慣例）
- [[Github/repos/fable-method — Fable 5 工作法蒸餾成任何模型可跑的 Skill＋Eval|fable-method]]（同為「把工作法蒸餾成 skill + 驗證機制」的路線）
- [[Github/repos/huangwb8-skills — Claude Code Skill 開發流水線|huangwb8/skills]]（skill 開發流水線 + auto-test，與 naiyue-skill-builder 同領域）
- [[Github/repos/looper — Claude Code Agent Loop 設計教練|looper]]（迴圈設計 pre-flight，與 skill-auditor 的「確定性骨架控制迴圈」互為對照）
