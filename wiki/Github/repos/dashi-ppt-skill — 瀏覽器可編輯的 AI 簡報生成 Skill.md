---
source: "https://github.com/chuspeeism/dashi-ppt-skill"
author: "chuspeeism (Dashi AI Lab)"
stars: "4.6k"
clipped: 2026-08-03
tags:
  - "github/repo"
  - "claude-code-skill"
  - "presentation"
---

# dashi-ppt-skill — 瀏覽器可編輯的 AI 簡報生成 Skill

## 一句話說明

給 AI Agent（Claude Code / Codex / 豆包等）用的重型 PPT skill：把自然語言需求編譯成 JSON 計劃，用 12 套主題 × 1020 個預置版式在本機渲染出「自帶編輯控制台」的 HTML 簡報，改完可一鍵導出真實可編輯的 PPTX——生成在本機、內容零上傳，靠「鎖模板填文案」換取穩定產出。

## 專案概覽

| 項目 | 內容 |
|---|---|
| Stars | 4,565 |
| Forks | 433 |
| 主要語言 | JavaScript（另有 HTML/CSS/Shell/PowerShell） |
| 授權 | AGPL-3.0 ＋ 專有子包例外（導出引擎 `html-deck-to-pptx` 禁止單獨再分發） |
| 建立時間 | 2026-06-10 |
| 最後推送 | 2026-07-30（v0.4.11） |
| Open Issues | 7 |
| 最新 Release | `readme-assets-v1`（僅 README 圖床，非軟體版本；軟體版本走 commit + npm） |
| Topics | agent-skill, ai-ppt, claude-code, pptx, presentation-generator, slide-generator 等 14 個 |
| 首頁 | 無（品牌主陣地在小紅書「大师的AI小灶」） |
| 是否 Archived | 否 |

## 核心功能

- **多宿主 agent skill**：標準 `SKILL.md` 佈局，官方實測支援 Claude Code、Codex、豆包、Marvis、Workbuddy、Dumate、Qclaw；附 `agents/openai.yaml`（Codex 介面）與 `.claude-plugin/marketplace.json`（Claude plugin marketplace）。
- **鎖模板填文案**：12 套視覺主題、1020 個版式頁、8576 個可調控件（`layout-manifest.json` 3.5MB 佐證數量級可信）。前三個方案保留模板視覺只換文字，第四個方案（v4 bespoke）由 Agent 在主題視覺語言內定制構圖——用約束換穩定，明說「不適合逐像素定制」。
- **產物即編輯器**：輸出的 HTML 每頁自帶控制台（滑杆調模組數量、換佈局、換配色、換圖表類型），點文字就地編輯、拖拽換圖，改動經本機預覽服務自動存回 `index.html`。這是與多數「凍結成品」型 AI 簡報工具的最大差異。
- **可編輯 PPTX 導出**：經 headless Chromium 逐節點還原成真實可編輯的 `.pptx`（也可導 PDF / 離線 HTML 包）。導出引擎是專有子包，僅授權作為本 skill 組成部分使用。
- **工程化工作流**：goal.json（schema v2）→ `layout:query` 容量查詢 → `goal:scaffold` 整稿組裝 → 渲染 → 三道機器校驗（`validate:swiss` / `goal-copy` / `four-variant-quality`）→ 本機預覽。全程有 workflow telemetry（純本地 JSON）記錄各階段耗時與重試。
- **成本誠實揭露**：README 自述 10 頁一套實測約 10 萬 token——是重型 skill，不是輕量模板。

## 技術架構

```
使用者需求（自然語言）
   │  Agent 依 SKILL.md（27KB 工作流指令）整理
   ▼
goal.json（schema v2：每頁 3 template + 1 bespoke）
   │  render_goal_deck.sh / .ps1
   ▼
┌────────────── skills/dashi-ppt/project/（Node 20+ 生成器）─────────────┐
│ scripts/：layout-query／goal-scaffold／props:safe／3 道 validate       │
│ dist/theme-runtime/：12 套主題 runtime（打包 JS，每套約 1MB）           │
│ packages/html-deck-to-pptx/：專有導出引擎（src 未混淆，僅限本 skill 用）│
└──────────────────────────┬────────────────────────────────────────────┘
                           ▼
   output/<deck>/ppt/index.html ←─ 自動保存 ── 本機預覽服務
   （離線可開、自帶編輯控制台）      （HTTP 5200-5999，預設 bind 0.0.0.0）
                           │  /api/export-editable-pptx
                           ▼  （headless Chromium；Origin/Referer＋loopback 鑑權）
                    PPTX / PDF / HTML 離線包
```

| 組件 | 實作 |
|---|---|
| 渲染 | React 18 SSR（tsx 驅動 `render-goal-deck.jsx`） |
| 版式庫 | 1020 版式 metadata（`generated-metadata.js` 4.6MB）＋ 3.5MB layout manifest |
| 動畫 | GSAP 3 |
| 導出 | playwright-core ＋ chromium-headless-shell；pptxgenjs / pdf-lib / html-to-image |
| 字型 | 186 個 woff2 內嵌（4.8MB，離線化） |
| 相依管理 | package.json ＋ package-lock.json；`.npmrc` 預設 npmmirror、首裝探測官方 registry 可達即解鎖 |
| 散布 | GitHub（v0.4.11）＋ npm `dashi-ppt-skill`（npx 一鍵安裝器，偵測 `.agents/.claude/.codex/.config` 四宿主目錄全裝） |

值得注意的設計：repo 是「發佈鏡像」而非開發倉——commit 全是 `Publish skill vX.Y.Z`（單日最多連發 5 版），主題工具鏈不在庫內（issue 中有人求開源被擱置）；`ensure-registry.mjs` 對外網使用者友善（官方 registry 可達就移除鏡像鎖定，尊重全域配置）。

## 供應鏈與安全檢查

逐項核對（正面結果也列出）：

1. **網路呼叫實際 endpoint**：全 repo 僅兩處主動聯網——①`check_latest_version.mjs`：GET `registry.npmmirror.com` → `registry.npmjs.org` → GitHub raw 三備援拉版本號 JSON，5 秒 timeout、失敗靜默、**無 POST、不上傳任何內容**；②`ensure-registry.mjs`：GET `/-/ping` 探測 registry 可達性。其餘聯網為 npm install 與 playwright chromium 下載（安裝期正常行為）。README FAQ 對聯網行為的自述與程式碼實測**完全一致**。✅
2. **危險執行**：`eval(` 0 處、`execSync` 0 處；`child_process` 出現於 9 檔，抽驗確認用途正當（`chrome-path.mjs` 用 `execFileSync` 探測瀏覽器版本、`network.mjs` 呼叫 macOS `scutil` 取主機名、導出與媒體轉檔）。✅
3. **相依宣告與 lockfile**：runtime 5 顆（gsap / html-to-image / pptxgenjs / react / react-dom）＋ dev 5 顆（tsx / esbuild / pngjs / playwright-core / pdf-lib），全為百萬下載級知名套件，**附 package-lock.json**。npm 套件 `dashi-ppt-skill` 真實存在、maintainer jadon7 與 GitHub 主要貢獻者同一人。⚠️ 唯一落差：npm 最新版 0.4.5 落後 GitHub main 的 0.4.11 六個 patch——`npx` 安裝管道拿到的是舊版（散布通道脫鉤的又一實例）。
4. **安裝腳本/CI 寫入行為**：`npm-dist/install.mjs` 未指定 `--dir` 時會把 skill 裝進**所有**偵測到的宿主目錄（`~/.agents/skills`、`~/.claude/skills`、`~/.codex/skills`、`~/.config/agents/skills`）——多宿主機器上是刻意的全裝設計，要單裝需顯式 `--dir`。採原子替換（staging + rename，不會留半殘安裝），保留既有 node_modules 與 .npmrc，偵測到舊名目錄 `dashiai-ppt` 會遷移後刪除。寫入範圍限技能目錄內，**不碰 settings.json、不碰 shell rc**。無 CI（`.github/` 僅 issue 模板）。✅（全裝行為需知情）
5. **repomix 安全掃描**：未執行——repo 磁碟 101MB 超過門檻，改用 Git Trees API（426 檔完整清單）＋ GitHub code search ＋ 關鍵檔逐字下載審查替代；掃描深度低於 repomix 全文掃描，此為方法限制、如實註記。
6. **SKILL.md 內嵌自動行為指令審查**（skill 類 repo 特有）：27KB 指令全文逐字讀畢。唯一自動行為＝「每次完成請求前運行版本檢查腳本，無輸出則保持靜默」——腳本本體只 GET 版本號並印提醒文字，**無靜默自我更新、無強制回傳評分、無環境資訊外送、無 server-side 信任依賴**（與 learn plugin 四條惡性自動行為逐項對照全數不成立）。其餘指令均為生成工作流規範。✅

**最值得注意的一點**：本機預覽服務預設 bind `0.0.0.0`（README 誠實揭露「同一局域網內可訪問，僅供瀏覽」），導出 API 另有 Origin/Referer 白名單＋loopback 鑑權（`preview-export-auth.mjs` 邏輯實測存在且註解說明威脅模型）。在公用 Wi-Fi 或辦公網使用時，簡報內容對同網段可見——可設 `DASHI_PPT_PREVIEW_HOST=127.0.0.1` 收斂。

## 社群健康度

| 指標 | 觀察 |
|---|---|
| 成長速度 | 50 天 4,565 stars（知乎爆文期單週破千），中文 AI 工具圈標準的熱點曲線 |
| 貢獻結構 | jadon7 391 commits ＋ chuspeeism 3 commits——**owner 是品牌散布帳號，實際工程者是 jadon7**（北京小米體驗設計師/動效設計師，npm maintainer 同人），無外部貢獻者 |
| 迭代節奏 | 6/10 建庫至 7/30 共 25+ 個版本，7/30 單日連發 5 版（v0.4.7→v0.4.11）——高頻但無 CI、無測試在庫（發佈鏡像模式，品質流程不可見） |
| Issue 治理 | 有中英雙語 issue 模板；20 則 issues 多數已關閉，含實質功能討論（校驗器分批報錯、中文字數限制過嚴）與外部 PR 型貢獻被消化的痕跡 |
| PR | 0 open——發佈鏡像模式下外部 PR 實際無處落地 |

## 社群口碑

中文圈熱度明確、評價兩極：

- **正面**：知乎專欄爆文［[又一个神级 PPT Skill 火了](https://zhuanlan.zhihu.com/p/2059655046011285701)］、B站教學影片［[大师帮你做PPT](https://www.bilibili.com/video/BV1WEKV6FEeB/)］、多個 skill 目錄站收錄（[万象](https://www.onexiang.cc/skills/dashi-ppt-skill)、[技术栈](https://jishuzhan.net/article/2078636667455021057)、[open-design.ai](https://open-design.ai/zh/blog/dashiai-ppt-skill/)）。共同讚點：產出後仍可編輯（多數 AI 簡報是凍結成品）、可導真實 PPTX。庫內也有使用者專門開 issue 寫「真的优秀」。
- **負面**：8 月初連續兩則強負評 issue（「一坨」「真的一言难尽」）——細讀環境欄位，其一是 **豆包 seed-2.1-turbo ＋ Trae** 環境：27KB 工作流指令對弱模型是災難（燒 token、產出不符要求），這類「重編排型 skill」的品質高度綁定宿主模型能力。搭配 README 自述 10 頁 10 萬 token，弱模型使用者的「燒 token 產廢品」抱怨結構上必然出現。
- 英文圈聲量近零（README.en.md 存在但推廣全在中文平台）。

## 與現有系統的相關性評估

| 系統 | 相關性 |
|---|---|
| Obsidian Vault | 無直接整合點；產出是獨立 HTML/PPTX，不進 wiki 工作流 |
| Claude Code | 本環境已有 PPT 技能群：`html-ppt`（多風格 HTML 簡報工作室，觸發面最寬）、`guizang-ppt`（杂志風橫向翻頁）、`deck-ai-classroom`（教育圖文）、`ppt-master`、`pptx`。dashi-ppt 與 `html-ppt` 高度重疊，**獨占差異只有兩項：生成後瀏覽器控制台編輯、可編輯 PPTX 導出**——前者對「交付給會自己改稿的非技術受眾」有實際價值，後者是現有技能群完全沒有的能力（`pptx` skill 是直接生成、非 HTML 轉譯）。代價：103MB 磁碟＋node_modules＋chromium-headless-shell，且觸發詞（PPT/簡報/幻燈片）與現有技能群正面相撞，裝了必須管理路由 |
| Automation | 10 頁 ≈ 10 萬 token 的成本結構不適合排程批量；版本檢查每次任務尾端一次 GET，可接受 |

使用者現有「AI 教學工作坊」投影片需求（QA×AI 22 張 TBD）理論上可用它做，但工作坊投影片是自用展示，HTML 交付即可，`guizang-ppt`/`html-ppt` 已覆蓋；dashi-ppt 的價值要等「需要把可編輯 PPTX 交付給他人」的場景出現才成立（R13：無場景先不加重量）。

## 安裝建議

⏳ 觀望（供應鏈乾淨、工程紀律高，但與現有技能群重疊且成本重）。

- **升級條件**：出現真實的「交付可編輯 PPTX 給他人自行修改」需求（客戶提案、跨部門匯報模板）時安裝——這是它相對 `html-ppt`/`guizang-ppt` 的唯一不可替代能力；屆時用 `npx dashi-ppt-skill --dir <單一目錄>` 避免四宿主全裝，並設 `DASHI_PPT_PREVIEW_HOST=127.0.0.1`。
- **放棄條件**：半年內無 PPTX 交付場景；或負評趨勢從「弱模型環境」擴散到 Claude/Codex 主力環境；或 npm 散布持續落後 GitHub 導致 `npx` 管道長期拿舊版。

## 相關連結

- [[dashi-taskboard — 嵌入 Codex 的本地優先任務看板|dashi-taskboard]] — 同作者（大师的AI小灶）另一作品。兩庫對照很有意思：taskboard 無 LICENSE、無 lockfile、10 天單人衝刺；本庫 AGPL＋lockfile＋50 天高頻迭代＋雙人分工（品牌帳號散布、設計師 jadon7 工程）——**dashi-ppt-skill 是品牌旗艦，taskboard 是側翼實驗**，owner 輪廓一致（小紅書內容品牌的 GitHub 延伸，非冒名帳號）
- [[html-ppt]]、[[guizang-ppt]]、[[deck-ai-classroom]] — 本環境既有 PPT 技能群（重疊度評估見上）
- GitHub：https://github.com/chuspeeism/dashi-ppt-skill ｜ npm：`dashi-ppt-skill`
