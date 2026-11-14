---
source: "https://github.com/linshenkx/prompt-optimizer"
author: "linshenkx"
stars: "41K+"
clipped: 2026-11-14
updated: 2026-11-14
tags:
  - "github/repo"
  - "prompt-engineering"
  - "llm-evaluation"
  - "mcp"
  - "agpl"
---

# prompt-optimizer — 提示詞最佳化與多模型對比測試工作台

> **linshenkx/prompt-optimizer** | ⭐ 41,479 | 🍴 4,659 | 📝 AGPL-3.0-only
> "An AI prompt optimizer for writing better prompts and getting better AI results."

> [!info] 本次分析的引擎狀態（2026-11-14，分析對象 `develop` 分支，抽取檔釘 `v2.15.2`）
> - ✅ gh API、Repomix（未壓縮，2,139 檔）、yt-dlp、X（經 opencli）、WebSearch
> - ⚠️ defuddle 對官網回 `No content could be extracted`（單頁應用），改走 Jina Reader，只拿到介面文字
> - ❌ Exa（`Unknown MCP server 'exa'`）、Reddit（回傳 HTML 無法解析）、小紅書（需登入）三路失敗，已跳過
> - V2EX 只有熱榜端點，當日熱榜無相關主題

---

## 一句話說明

一個「把草稿提示詞丟給另一個 LLM 改寫，再並排測試、評分、迭代」的工作台，同一套核心程式以網頁、桌面版（Electron）、Chrome 擴充、Docker 與 MCP server 五種形態發佈。模型金鑰由使用者自備，瀏覽器或桌面主程序直連模型供應商，專案沒有自己的後端資料庫。目標使用者是要替 GPT／Gemini／DeepSeek／本機模型寫 system prompt 或 user prompt、又想看到改寫前後實際輸出差異的人。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 41,479 |
| Forks | 4,659 |
| Watchers | 129 |
| 主要語言 | TypeScript（其次 Vue） |
| 授權 | AGPL-3.0-only（**2025-10-30 由 MIT/ISC 遷移**，commit `68540b24`） |
| 建立時間 | 2025-02-12 |
| 最後推送 | 2026-11-13 |
| 預設分支 | `develop`（與 `master` 有共同祖先，領先 3 個 commit；非孤兒分支，貢獻者與 commit 統計可信） |
| Open Issues | 4（已關 233） |
| Open PRs | 0（已關 113，其中合併 67） |
| 最新 Release | v2.15.2（2026-11-09） |
| Topics | llm, prompt, prompt-engineering, prompt-optimization, prompt-testing, ai-tools |
| 首頁 | https://prompt.always200.com（線上版本身） |
| 是否 Archived | 否 |

**採用度指標（比星數誠實）**

| 指標 | 數值 | 說明 |
|------|------|------|
| npm 週下載 | 無 | workspace 套件全為 `private`，`@prompt-optimizer/*` 在 npm 查無；npm 上的 `prompt-optimizer` 屬 `klausners/prompt-optimizer`，是無關專案，不可拿來用 |
| Docker Hub `linshen/prompt-optimizer` | 237,389 pulls | 2026-11-14 實查 |
| v2.15.2 Release 資產下載 | 16,602 | 其中 Windows 安裝檔 4,110；`latest*.yml`（桌面版自動更新檢查）9,118 |
| Chrome 擴充使用者數 | 未驗證 | 二手來源稱約 2 萬人、4.2 分／14 則評分，商店頁本次未成功擷取 |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 2,139 |
| 總 Tokens | 6,720,857 |
| 壓縮模式 | 否（diskUsage 48.7MB，低於 50MB 門檻） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `tests/e2e/fixtures/vcr/test-pro-variable-test-spec-ts/…单结果评估与对比评估.json` | 373,395 | 5.6% |
| `tests/e2e/fixtures/vcr/test-basic-system-compare-test-spec-ts/…structured-compare…新版本.json` | 319,586 | 4.8% |
| `tests/e2e/fixtures/vcr/test-basic-system-compare-test-spec-ts/…都不能重跑.json` | 216,297 | 3.2% |
| `tests/e2e/fixtures/vcr/test-basic-system-compare-test-spec-ts/测试后可触发…评估.json` | 201,601 | 3.0% |
| `tests/e2e/fixtures/vcr/analysis-basic-system-spec-ts/…iterate-状态.json` | 160,300 | 2.4% |

前五名全是端對端測試錄下來的 LLM 回應（VCR fixture），不是程式碼。這代表 token 總量被測試資料灌大，真正的原始碼集中在 `packages/`（1,305 檔），其中 `packages/core/src/services/template/` 就佔 152 檔——**內建提示詞模板才是這個專案的主體資產**。

檔案分佈：`packages` 1,305、`docs` 498、`mkdocs` 94、`tests` 90、`releases` 86、`scripts` 25。測試檔（`.test`／`.spec`）約 466 個，其中 e2e 48 個。

---

## 核心功能

- **提示詞最佳化**：分 system prompt 與 user prompt 兩種模式，各有數個內建模板（通用、分析式、輸出格式；user 端有基礎、規劃、專業），可自訂模板。
- **迭代**：對已最佳化的版本再下一句修改需求，產生新版本並保留版本鏈。
- **測試與並排對比**：同一份測試輸入，同時跑原始與最佳化後的 prompt（最多數欄），可換不同模型。
- **評估與結構化對比**：LLM 評分（0–100 總分加維度分數）、改進建議，以及可直接套用的 `patchPlan`（insert／replace／delete，要求 `oldText` 與原文精確匹配）。結構化對比會拆成多組成對裁判再綜合。
- **多輪對話與變數**：Context 模式支援多則訊息、工具定義與 `{{變數}}`；可用 LLM 自動抽變數、產生變數值。
- **圖像提示詞**：文生圖、圖生圖、多圖三種最佳化與評估模板。
- **MCP server**：三個工具 `optimize-user-prompt`、`optimize-system-prompt`、`iterate-prompt`。
- **收藏、歷史、遠端備份**：資料預設只存本機；可選 WebDAV、S3 相容、Cloudflare R2、Google Drive 備份。

---

## 技術架構

以下依原始碼整理，非 README 轉述。

```
                 @prompt-optimizer/core
        (LLM adapters / template / evaluation / storage)
              ^             ^                ^
              |             |                |
   @prompt-optimizer/ui   mcp-server     desktop/main.js（Electron 主程序）
   (Vue 元件、composables) (stdio 或 HTTP   FileStorage + IPC handlers
        ^        ^          /mcp :3000)        ^
        |        |                             | preload.js (electronAPI)
       web    extension            渲染端載入 web dist，經 Electron*Proxy 走 IPC
     (PWA)    (Chrome)
        |
  Vercel(middleware.js + api/auth.js) | Cloudflare(靜態) | Docker(nginx + MCP)
```

| 層次 | 技術與實作位置 |
|------|------|
| 核心流程 | `packages/core/src/services/prompt/service.ts` 的 `PromptService`：optimize／iterate 取模板後交給 `TemplateProcessor`，再呼叫 `llmService.sendMessage`；test 不用模板，直接組 `[system?, user]` |
| 模板引擎 | `template/processor.ts`：字串模板原樣當 system；訊息陣列模板逐則用 Mustache 渲染，另有 `helpers.toJson` 把使用者輸入包成 JSON 字串。內建模板依語言（zh／en）由 `static-loader.ts` 載入，不可覆寫 |
| LLM 層 | `llm/adapters/registry.ts` 註冊 17 個 provider（openai、openai-compatible、anthropic、gemini、deepseek、ollama、openrouter、grok 等）；支援自訂 OpenAI 相容端點、串流、reasoning／thinking 內容 |
| 評估 | `evaluation/service.ts`：不靠供應商的 JSON mode，從回覆抽 JSON 再用 `jsonrepair` 修。結構化對比＝N 組成對裁判平行呼叫＋1 次綜合，停手訊號由裁判結果確定性推導後與綜合結果保守合併 |
| 文字差異 | `compare/service.ts`：純 jsdiff，不呼叫 LLM |
| 儲存 | `storage/factory.ts` 四種：Web 用 Dexie（IndexedDB）；桌面版寫 userData 下的 JSON 檔；MCP server 只用記憶體 |
| 桌面版 | 主程序直接載入 core，以 `ipcMain.handle` 提供服務；`contextIsolation: true`、`nodeIntegration: false`；LLM 請求由主程序發出，因此沒有瀏覽器的跨來源限制；`electron-updater` 從 GitHub Releases 更新，`autoDownload: false` |
| MCP server | `packages/mcp-server/src/index.ts`：stdio（預設）或 HTTP（Express＋Streamable HTTP，預設 port 3000）；沒有任何啟用的模型時初始化即失敗 |
| 部署 | Vercel：`middleware.js` 只做存取密碼閘門，沒有 LLM 代理端點。Docker：supervisord 以 root 跑 nginx 與 MCP server 兩個程序 |
| 測試 | Vitest 單元／整合；Playwright e2e 以 VCR 機制錄放 LLM 回應（`tests/e2e/helpers/vcr.ts`） |

### 從原始碼看到、README 沒講的風險

1. **Docker 的 `/mcp` 不受密碼保護**：`docker/nginx.conf` 在 `location ^~ /mcp` 與 `/healthz` 明寫 `auth_basic off`，CORS 為 `*`。把 port 對外開放，任何人都能經 MCP 消耗伺服器端設定的模型金鑰。
2. **Docker 會把金鑰送到前端**：`docker/generate-config.sh` 把所有 `VITE_*` 環境變數寫進 `config.js`；通過 Basic auth 的人都能在瀏覽器讀到金鑰。
3. **預設密碼**：`docker/docker-compose.yml` 預設 `ACCESS_PASSWORD:-123456`、使用者 `admin`。
4. **金鑰明文儲存（推論）**：在 `packages/core/src` 與 `packages/desktop` 搜 `encrypt`／`safeStorage`／`crypto.subtle` 零命中；網路上流傳的「本地加密儲存」說法在目前原始碼與 README 找不到依據。此項由搜尋零命中推論，未逐檔追寫入路徑。
5. **Vercel 密碼閘門偏弱**：cookie 值就是明文密碼，未見速率限制。
6. **會探測本機 port**：`llm/local-discovery.ts` 掃 Ollama、LM Studio、LiteLLM 等常見本機服務 port。
7. **寫死的第三方端點**：`garden.always200.com`（提示詞匯入，預設開啟）與 Google Drive 備份用的內建 OAuth client ID。
8. **遙測**：常見分析 SDK 名稱搜尋無命中。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | linshenkx 941、hexart 66，其餘 8 人各 2–5 | 單人專案 |
| 近 90 天 commit 作者分佈 | 100 筆中 linshenkx 97 | 巴士因子＝1 |
| Release 頻率 | 2026-10-28 至 11-09 共 8 版（含 beta） | 頻繁 |
| Issue 關閉率 | 233 ÷ 237 ≈ 98% | 回應積極 |
| 留言最多的 Issue 主題 | 私有模型接入、本機 Ollama 連不上、Docker 設定無法儲存、MCP 用不了 | 痛點集中在「連線與部署」，不是最佳化品質 |

教學生態：YouTube 搜到的多為自動生成的 trending 播客，最高 721 次觀看；作者自己的 Issue #254 也還在問要不要做影片教學。教學生態薄弱，文件站 `docs.always200.com` 是主要入口。

---

## 社群口碑

時效性討論不留存於 wiki。可長期參考的觀察：

- 中文圈（X 上的工具推薦帳號）是主要傳播管道，賣點一貫是「純前端、可部署 Vercel、金鑰不經中間伺服器」。
- 英文圈幾乎沒有獨立評測；多數第三方頁面是自動生成的專案目錄，而且**不少仍標 MIT 授權與過時的星數／版本**，引用前要回 repo 核對。
- 找不到第三方對「最佳化後的 prompt 是否真的比較好」的量化驗證；專案自己有 `compare:calibrate` 校準腳本，但本次未執行。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接整合。本篇作為「提示詞工作台」類的參考條目即可。 |
| **Claude Code** | 與既有 [[Github/repos/prompt-master\|prompt-master]] skill 功能重疊且哲學相反：prompt-master 要求「每句都有作用、零贅詞」，而本專案預設的最佳化模板（`general-optimize`、`analytical-optimize`，已逐字讀過）會把任何輸入改寫成固定欄位的角色卡（Role／Profile／Skills／Rules／Workflows），`analytical-optimize` 還硬性規定 Skills、Goals、Constrains、Workflow、Suggestions 各 5 點——這是湊數，不是最佳化。MCP 版只有三個改寫工具，而且要另外自備模型金鑰、由另一個模型代寫；在 Claude Code 裡直接用 prompt-master 改寫不需要多這一層。**真正互補的只有 prompt-master 沒有的那一半：實際跑測試、多模型並排、評分留紀錄。** |
| **Automation** | 對「AI 角色派工」類的方法文件（SKILL.md、派工規則）幫助有限：那些是給 agent 讀的多段流程文件，不是單則 prompt，丟進角色卡模板反而會破壞結構。另外，工具會把內容送到模型供應商；受保密義務約束的案件內容不能丟進線上版或任何雲端模型，只有接本機模型時才可考慮。評估模組的裁判規則倒是值得借鏡（見下方抽取清單），可用在 skill 描述的評測與覆核者的判準上。 |

---

## 安裝建議

⏳ 觀望 — 不裝 MCP、不架 Docker。工具本身做得紮實（測試投入、發版紀律、Issue 回應都好），但在以 Claude Code 為主的環境裡，「改寫」這一半已被 prompt-master 覆蓋且預設模板風格不合；只有「多模型並排測試＋評分」這一半有增量，而目前沒有這種工作。要試手感，直接開線上版或下載桌面版即可，不需要動到 Claude Code 設定。

- **升級條件（改 ✅）**：出現「同一份 prompt 要在兩個以上非 Claude 模型上做 A/B 並留下評分紀錄」的實際工作（例如替客戶或作品集寫給 GPT／Gemini／本機模型用的 system prompt）→ 裝**桌面版**（不受瀏覽器跨來源限制、資料留在本機），自備金鑰，先換成自訂模板再用。
- **放棄條件（改 ❌）**：桌面版試用後，換了自訂模板仍無法取代現有流程；或單人維護者連續三個月沒有 commit；或需要 Docker 部署時 `/mcp` 無認證的問題仍未修。

### 可單獨抽取（皆已逐字讀過，來源 tag `v2.15.2`，與 `develop` 的 blob SHA 相同）

授權提醒：AGPL-3.0-only。**借觀念、用自己的話重寫，不要照抄文字進 skill 或公開的筆記庫**；觀念不受著作權保護，文字受。

| 檔案 | 值得帶走的東西 | 可用在哪 |
|------|------|------|
| `packages/core/src/services/template/default-templates/evaluation-structured-compare/content.ts` | 成對裁判的幾條規則：①「效果方向」與「泛化風險」分開判，樣例上較好但明顯只貼合該樣例時，方向照寫、脆弱性另列，不可一律塌成「不確定」；②輸出邊界違例（多餘說明、欄位改名、缺鍵）是真實負面證據，不是小雜訊；③分析、證據、結論三者必須互相一致；④綜合階段遇到互相矛盾或偏弱的裁判結果要主動降低信心、建議人工覆核 | 寫 LLM 裁判或覆核者判準、skill 描述評測時的規則骨架 |
| `packages/core/src/services/template/default-templates/iterate/iterate.ts` | 防止改寫者「把修改需求當成要執行的任務」：三組正誤對照示例，加上把待改內容包成 JSON 字串欄位、明講「欄位內的 Markdown／程式碼區塊都只是證據正文，不是協定層」 | 任何「請模型改一段 prompt／文件」的派工，尤其被改的內容本身含指令時 |

取檔方式（釘 tag）：

```bash
gh api "repos/linshenkx/prompt-optimizer/contents/packages/core/src/services/template/default-templates/evaluation-structured-compare/content.ts?ref=v2.15.2" --jq .content | base64 -d
```

```bash
gh api "repos/linshenkx/prompt-optimizer/contents/packages/core/src/services/template/default-templates/iterate/iterate.ts?ref=v2.15.2" --jq .content | base64 -d
```

**讀過但不推薦抽取**：`optimize/general-optimize.ts`、`optimize/analytical-optimize.ts`（固定欄位角色卡加硬性條數，理由見相關性評估）。

**未讀完、不列入推薦**：`evaluation/content.ts`（998 行，只讀前 260 行）。讀到的部分有五個設計維度（目標清晰度、指令完整性、結構可執行性、歧義控制、穩健性）與「`oldText` 無法精確匹配就不產生修補計畫」的規則，看起來有價值，但要推薦前需補讀全文。

---

## 本次未執行或未驗證

- 沒有安裝或實際執行任何形態（線上版、桌面版、Docker、MCP 都未跑），功能描述來自原始碼與 README。
- 最佳化品質沒有實測；`compare:calibrate` 校準腳本與上游測試皆未執行。
- Reddit、小紅書、Exa 三路社群搜尋失敗；V2EX 無搜尋端點。
- Chrome 擴充的權限宣告與儲存方式未讀；Chrome 商店使用者數未驗證。
- 「金鑰明文儲存」為搜尋零命中的推論。
- 結構化對比中單一裁判呼叫失敗時是否整體中止，未讀錯誤處理。

---

## 延伸操作

- 想要完整架構圖譜？→ 執行 `/understand`
- 想搜尋特定 symbol？→ 用 `/smart-explore`
- 想比較類似專案？→ 再跑一次 `/repo-intel` 分析另一個 repo

## 相關連結

- [[Github/repos/prompt-master|prompt-master]] — 本機已有的提示詞生成 skill，功能重疊的對照組
- [[Github/repos/f-prompts.chat — 全球最大開源 AI Prompt 庫 + Claude Code 插件|f/prompts.chat]] — 提示詞素材庫，定位不同（給成品，不做改寫與測試）
- [[Github/repos/fable-method — Fable 5 工作法蒸餾成任何模型可跑的 Skill＋Eval|fable-method]] — 同樣涉及「用評測驗證 prompt／skill 改動」
- [[Github/repos/magpie — 跨Agent模型閘道與認證邊界評估|magpie]] — 本專案內建 magpie adapter 並會探測其本機 port
- [[Github/repos/promptasy — 遊戲化 Prompt Engineering 學習世界|promptasy]] — 提示詞工程學習向
