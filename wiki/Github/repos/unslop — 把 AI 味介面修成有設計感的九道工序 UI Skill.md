---
source: "https://github.com/heydamir/unslop"
author: "heydamir (Damir Sokolovsky)"
stars: "15K+"
clipped: 2026-11-14
tags:
  - "github/repo"
  - "agent-skill"
  - "design"
  - "anti-slop"
  - "frontend"
---

## unslop — 把 AI 味介面修成有設計感的九道工序 UI Skill

> **heydamir/unslop** | ⭐ 15,785 | 🍴 914 | 📝 CC BY 4.0
> "A Claude skill that turns vibecoded, AI-looking UI into a designed interface"

> [!warning] 先釐清：這不是寫作去 AI 腔的那個 unslop
> 同名 skill 至少有兩個。`cursor/plugins` 的 pstack 內有一個 **寫作用** 的 `unslop`（清 AI 文字腔），本 repo 是 **介面設計用** 的 `unslop`（清紫色漸層、發光、emoji 圖示）。上游 issue #3 有人要求改名 `unslop-ui`，作者拒絕，只同意別人 fork（`pompydev/unslop-ui`）。與本 vault 已收的 [[Github/repos/Stop-slop 寫作去除AI腔|Stop-slop]]、[[Github/repos/human-writing — 讓 AI 寫的中文有活人感的通用創作改稿 Skill|human-writing]] **不同賽道、沒有取代關係**。

**本次可用引擎（2026-11-14 實測）**：gh API ✅｜Repomix ✅（17 檔、37,950 tokens）｜defuddle ✅ 但 GitHub `homepageUrl` 為空，Phase 3 依規則不觸發｜Exa（mcporter）❌ `Unknown MCP server 'exa'`，改用 WebSearch｜Reddit（opencli）❌ JSON 解析錯誤，跳過｜X：twitter-cli ❌ 取不到 cookie，改 `opencli twitter search` ✅｜yt-dlp ✅｜smart-explore 不適用（非本地路徑）。

---

### 一句話說明

unslop 是設計師 Damir Sokolovsky 把自己在 X 上的「Unslopping」系列做成的 agent skill（Claude Code／Codex／Google Antigravity 都能用）：對一個已經存在、看起來就是 AI 生的畫面，先照 64 條「徵兆 → 修法」清單稽核，再從產品本身推導五行設計方向並停下來等使用者確認，最後照固定順序跑九道工序（間距 → 色彩 → 圖示 → 文案 → 字體 → 版面 → 細節 → 視覺 → 動效）。它是「改既有畫面」的工具，不是從零生頁面的工具；另附兩支 Node 腳本，一支把線上網站存成單檔 HTML，一支把修改過程錄成 10 秒短片。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 15,785 |
| Forks | 914 |
| Watchers | 17 |
| 主要語言 | JavaScript（42,267 bytes，全是兩支腳本與測試；真正的內容是 Markdown） |
| 授權 | CC BY 4.0（**不是軟體授權**，見下方「授權注意」） |
| 建立時間 | 2026-10-29 |
| 最後推送 | 2026-11-08 |
| Open Issues | 3 |
| Open PRs | 9 |
| 最新 Release | 無（零 release、零 tag） |
| 預設分支 HEAD | `97daa3eb365670ea3f87ed85356cbfcee18105a5`（2026-11-08） |
| Topics | 無 |
| 首頁 | 無（SKILL.md metadata 另列 `heydamir.design/unslop`，是作者的付費設計服務頁） |
| 是否 Archived | 否 |
| diskUsage | 2,305 KB |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 17（文字檔；另有 6 張 webp 圖共約 1.3 MB 未入包） |
| 總 Tokens | 37,950 |
| 總字元 | 146,243 |
| 壓縮模式 | 否（diskUsage 2.3 MB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `skills/unslop/scripts/story.mjs` | 7,422 | 19.6% |
| `skills/unslop/SKILL.md` | 7,307 | 19.3% |
| `examples/dashboard.html` | 4,058 | 10.7% |
| `LICENSE` | 3,716 | 9.8% |
| `skills/unslop/scripts/snapshot.mjs` | 2,129 | 5.6% |

SKILL.md 本體 235 行、31,658 bytes，每次觸發就吃掉約 7.3K tokens，還沒算四份 reference。這是個重型 skill。

---

### 核心功能

- **三級分流（先判斷要改多少）**：稽核後分「重度 slop → 跑完整流程」「輕度 → 只修稽核到的項目，沿用既有品牌」「沒有 slop → 直說，最多建議兩三個帶具體數值的小調整，使用者同意才動」。明文寫「不要為了不一樣而改一個好畫面」。本機同類 skill 多半沒有這個煞車。
- **Direction 五行＋強制停頓**：動手前寫 Product／Character／World／Moments／Signature 五行，並把稽核結果與方向交給使用者確認後才編輯。Character 明文禁用 clean、modern、sleek、minimal、premium 這類「每個模板都適用」的詞。
- **九道固定順序的工序**：每道做完整個畫面才進下一道，順序有理由（間距先做因為節奏對了其他東西讀起來才不一樣；文案排在字體與版面之前因為標題長度決定字級與位置；視覺與動效最後）。
- **`signs.md` 徵兆清單**：10 組共 64 條「徵兆 → 修法」配對，從 Tailwind class 層級下手（例如任意值 `mt-[13px]`、`shadow-[0_0_20px_rgba(...)]`、`animate-pulse`）。最後一組「Template look」處理第二層問題：把 slop 清乾淨後退回「純灰底＋Inter＋一顆品牌色按鈕」的另一種模板。
- **`tokens.md` 起始數值**：4px 間距階、三套中性色階（graphite／warm／ink，各有深淺兩版的具體 hex）、字級表、圓角巢狀公式（內＝外−padding，不低於 4）、單一 easing 曲線與時長表。
- **`visuals.md` 圖像生成配方**：先用一句話寫出主體，再照「主體 → 場景 → 光與色 → 風格 → 構圖 → 排除項 → 尺寸」組 prompt。附實戰失敗筆記（要求 film grain 會被烤進棋盤紋；去背會吃掉接近背景色的暗部；要在生成的裝置上顯示真 UI 就正面生成再疊 HTML）。生成前必須先給使用者看 prompt 並詢問，因為要花錢。
- **`snapshot.mjs`**：用 Playwright 開啟 URL 或本機檔，先捲到底觸發 lazy load，把樣式表、圖片、字型以 data URI 內嵌，輸出單檔 HTML＋一張 `.live.png` 對照截圖。讓「只有一個網址、沒有程式碼」的情境也能改。
- **`story.mjs` 故事影片**：把修改過程做成同一頁上逐步疊 CSS 的 `story.html`，腳本逐格截圖後交給 ffmpeg 合成約 10 秒 1080×1080 的 mp4，畫面上有紅色量測線。**每支影片右下角硬寫入 `unslop by @heydamir` 浮水印**。

---

### 技術架構

```
unslop/
├── skills/unslop/               ← 要複製進 skills 資料夾的就是這一包
│   ├── SKILL.md                 流程主檔：分流 → Direction → 九道工序 → 17 項 Checklist
│   ├── agents/openai.yaml       Codex 介面 metadata（3 行）
│   ├── references/
│   │   ├── signs.md             64 條徵兆→修法（稽核用）
│   │   ├── tokens.md            數值表（各工序取值）
│   │   ├── visuals.md           主視覺決策與圖像 prompt 配方
│   │   ├── effects.md           影像轉字元/半色調/抖色/雙色調的 canvas 程式
│   │   ├── refs.md + refs/*.webp  5 張作者成品圖（約 1.3 MB）
│   └── scripts/
│       ├── snapshot.mjs         Playwright：線上頁 → 單檔 HTML ＋ 截圖
│       └── story.mjs            本機 HTTP server ＋ iframe 舞台 ＋ 逐格截圖 ＋ ffmpeg
├── examples/                    兩個故意做爛的練習頁（dashboard.html、hero.html）
├── test/                        node:test，只測兩支腳本的參數解析與錯誤訊息
├── CITATION.cff / LICENSE       CC BY 4.0 署名要求
```

| 層次 | 技術 |
|------|------|
| 規則層 | 純 Markdown（SKILL.md ＋ 4 份 reference），漸進揭露：主檔放流程與判斷，數值與清單下放 |
| 腳本層 | Node ESM 單檔、零 npm 相依宣告（repo 沒有 `package.json`）；執行期動態 import 使用者專案裡的 `playwright` 或 `playwright-core` |
| 影片層 | `story.mjs` 起一個綁 `127.0.0.1` 隨機埠的 HTTP server，把 story 頁放進 iframe，注入 runtime 以 Web Animations API 逐格推進時間，JPEG 序列交 `ffmpeg`（libx264、crf 18） |
| 驗證層 | **只有模型自評的 17 項 Checklist**，沒有可執行的 linter；`test/` 的 node:test 驗的是腳本 CLI，不是 skill 產出品質 |

**原始碼層級的觀察（逐字讀過兩支腳本）**

- 沒有遙測、沒有對外回報。`snapshot.mjs` 的 `fetch` 都在被擷取的頁面 context 內，用途是把資源內嵌；`process.env` 只讀 `CHROME_PATH`。
- `story.mjs` 的路徑檢查是 `target.startsWith(root)`，少了結尾分隔符，同名前綴的兄弟目錄可以穿過去（上游 issue #32，修補 PR #33 尚未合併）。伺服器只綁本機隨機埠且短命，風險低，但確實存在。
- Chrome 候選路徑只列了 macOS 與 Linux 的位置，Windows 上會落到 Playwright 自帶的 Chromium 或 `CHROME_PATH`；ffmpeg 缺失時的提示是 `brew install ffmpeg`。README 的安裝指令在 PowerShell 會失敗（上游 PR #5 指出，作者關掉並表示改以 plugin 解決，plugin 尚未上線）。**以上是讀碼判斷，本次沒有實際執行腳本。**

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | heydamir 16、ryoaonetsuki 5、TheGeekyM 3、dhruv1220 2、garvrao80 2、jmsaham 1 | 作者主導，所有合併都由作者本人按 |
| 近 4 週 commit | 0／6／7／5（共 18） | repo 才 16 天大，數字本身沒有趨勢意義 |
| Release 頻率 | 無 release、無 tag | 沒有版本可釘，只能釘 commit SHA |
| Issue | open 3／closed 6 | 量很小 |
| PR | open 9／merged 10／未合併關閉 8 | 外部 PR 多；改規則層的 PR 多數未合併（#1、#4、#23 關閉，#14 合併），腳本修正較常被收 |

**判讀注意**：15.7K 星在 16 天內累積，`star:watcher` 為 928:1。這個比值單獨不能當刷星證據（清單型與話題型 repo 天生偏高），而 `stargazers` API 在本環境回 404（環境層級限制），**星標時序未能驗證**。能確認的是 X 上有真實擴散（見下）。npm 上的 `unslop` 套件指向 `unslop/unslop`，與本 repo 無關，**無 npm 採用度指標**。

---

### 社群口碑

（Reddit 與 Exa 兩路本次不可用，以下只來自 X 搜尋、YouTube 搜尋、WebSearch 與上游 issue；時效性貼文已略去細節。）

- **擴散路徑是 X 上的短片**：作者先有一支「介面自己把自己修好」的影片走紅，之後才把流程開源成 skill。日文圈與中文圈都有轉介，其中一則日文試用貼文約 5 萬次觀看。
- **YouTube 已有多語教學與介紹片**（英、日、韓、法），但觀看數都在數十到兩千多之間，屬於「有人做、沒人深挖」的早期訊號，還談不上成熟的教學生態。
- **正面回饋**：流程有次序、會先問方向、畫面本來就好時不亂改。
- **負面回饋／已知問題**：名稱撞車（issue #3）；安裝方式原始（只有 git clone ＋ cp，plugin 化的 issue #8 與 PR #26、#30 都還沒合）；作者拒收 `prefers-reduced-motion` 規則（PR #1）；不支援 RTL 文字（issue #35）；第三方目錄站多為自動生成頁，找不到獨立的實測評論。
- **未找到**：Hacker News 無相關 story；沒有任何「掛與不掛這個 skill 產出差多少」的量測。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 與已收的 [[Github/repos/hallmark — 拒絕 AI 味的前端設計 Skill（結構多樣性＋防呆閘門）|hallmark]]、[[Github/repos/make-interfaces-feel-better — UI 細節打磨的 agent skill|make-interfaces-feel-better]] 同屬「反 AI 味 UI」主題，可互連。`signs.md` 本身是一份不錯的參考筆記素材（CC BY，摘要並署名即可）。 |
| **Claude Code** | 本機已有 10 個同域 skill（`redesign-existing-projects`、`design-taste-frontend`、`hallmark`、`high-end-visual-design`、`minimalist-ui`、`frontend-design`、`ui-ux-pro-max`、`emil-design-eng`、`apple-design`、`web-design-guidelines`）。本機沒有同名 `unslop` 資料夾。unslop 的 description 長 686 bytes，照本機清單預算估算法約 170 tokens，會成為清單裡最大的一條（目前最大 84）；原樣安裝後總量由 4,005 升到約 4,175／5,000。它的觸發詞含 polish、clean up、redesign a screen，會與 `redesign-existing-projects`、`design-taste-frontend` 搶觸發。 |
| **Automation** | `snapshot.mjs` 可獨立當「線上頁 → 單檔 HTML」工具，需要專案內裝 Playwright。`story.mjs` 需要 Playwright ＋ ffmpeg，產物帶作者浮水印，對一般工作流用處有限。 |

#### 與本機三個最接近的 skill 逐點比對（三份原文都讀過對應段落）

| 主題 | unslop | redesign-existing-projects | design-taste-frontend §9／§11 | hallmark Floor |
|------|--------|---------------------------|-------------------------------|----------------|
| 圖示庫 | 預設 lucide，16/18px、stroke 1.5 | 只用 Lucide/Feather 是「AI 預設」，改 Phosphor/Heroicons | Lucide 只在明確要求時用 | 禁 emoji 當圖示 |
| 標題字重 | 400–500，階層靠字級與顏色、不靠字重 | 標題要「heavy and intentional」 | 階層靠字重＋顏色、不靠放大 | 標題單一字重單一色 |
| 質感 | 禁止以 glass、grain、noise、neon、bento 取代被移除的裝飾 | 建議加 noise/grain、真 glassmorphism、spotlight border、mesh gradient | （該段本次未讀） | 主題指定才用 |
| 陰影 | 中性、小、禁彩色陰影 | 建議彩色／帶色調陰影 | 可用微染色陰影 | — |
| 動效 | 單一 ease-out 曲線；禁 spring、parallax、`hover:scale` | 建議 spring physics、parallax card stack、慣性捲動 | MOTION_INTENSITY dial | 只准 transform/opacity，**必須**有 reduced-motion fallback |
| Hero 的產品預覽 | 沒有圖像工具時用程式碼搭一個產品預覽 | — | 以 div 搭假產品畫面是「頭號 AI Tell」，禁止 | 能截真產品就截，截不到才搭；禁手繪瀏覽器視窗 |
| 狀態小圓點 | 可作為 Signature 細節 | — | 預設零裝飾圓點 | 禁裝飾性狀態點 |
| 無障礙 | 有 focus ring 與 4.5:1 對比；**沒有** reduced-motion（作者明拒） | focus ring、skip link | 有專章（本次未讀） | focus-visible、reduced-motion 皆為不可豁免 |
| 驗證手段 | 模型自評 17 項 Checklist，渲染最多 3 次 | 「每次改完測試」 | Pre-flight check | 可執行的 `sloplint.mjs --render` |
| 使用時機 | 只改既有畫面 | 只改既有專案 | 新建與改版皆可 | 以新建為主，改版須點名 |

**共識區（四者一致）**：紫藍漸層、漸層文字、發光、emoji 圖示、hype 文案、假整數資料都要清；數字用 tabular-nums；只動 transform 與 opacity、不用 `transition-all`；巢狀圓角要算。

**結論**：unslop 與 `redesign-existing-projects` 在質感、陰影、動效、圖示、標題字重五個主題上給的是**相反指令**。兩個都開自動觸發，同一次改版會收到互相打架的規則。要用 unslop 就得二選一，或把它收窄成點名才觸發（hallmark 在本機就是這樣處理的）。本機其餘 7 個設計 skill 本次未逐條比對。

#### 語言落差（繁體中文介面要注意）

- 文案工序是英文導向：hype 詞表（supercharge、seamless、unlock…）、sentence case、全大寫加寬字距的標籤、標籤結尾不加句點，這些對中文介面多半不適用或要另外翻成中文對應規則。
- 字體表只列拉丁字型（Geist、Inter、Instrument Serif、Newsreader 等），**沒有任何 CJK 字型、中文行高或中文字距的指引**；「大標可用負字距」直接套到中文會出問題。
- 間距、色彩、圖示、版面、細節、動效六道工序與語言無關，可直接用。

---

### 授權注意（CC BY 4.0）

- 可使用、修改、再散布、商用，條件是**保留作者署名並連回 repo**，改過要註明。四份 reference 檔尾都有一行署名要求。
- 個人本機使用不涉及散布；但若把抽取的檔案放進會分享出去的 marketplace 或公開 repo，署名行與授權連結必須留著。
- CC 授權不含專利授權，Creative Commons 本身也不建議用在軟體上；兩支 `.mjs` 腳本同樣在這份授權底下，沒有另附軟體授權。
- README 末段是作者的付費服務導流（三天改一個畫面），skill 兼具獲客用途，不影響使用。

---

### 相關連結

- [[Github/repos/hallmark — 拒絕 AI 味的前端設計 Skill（結構多樣性＋防呆閘門）|hallmark]] — 同主題，以新建頁面為主，有可執行的 sloplint
- [[Github/repos/make-interfaces-feel-better — UI 細節打磨的 agent skill|make-interfaces-feel-better]] — 同賽道的審查協議型 skill，同樣判 ⏳
- [[Github/repos/emilkowalski-skills — Design Engineer 動效與 Apple 設計 Skill 合集|emilkowalski/skills]] — 動效決策層，與 unslop 第九道工序重疊
- [[Github/repos/vercel-labs-agent-skills — web-design-guidelines 前端審查 Skill|web-design-guidelines]] — 無障礙與規範面，補 unslop 缺的 reduced-motion
- [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫|awesome-design-md]] — 品牌規範層，可當 Direction 的品牌依據
- [[Github/repos/Stop-slop 寫作去除AI腔|Stop-slop]]、[[Github/repos/human-writing — 讓 AI 寫的中文有活人感的通用創作改稿 Skill|human-writing]] — 寫作去 AI 腔，**不同賽道**，容易因名稱混淆

---

### 安裝建議

⏳ 觀望（整包先不裝；可先抽取 reference 檔）

**理由**

1. **同域已有 10 個 skill，而且規則會打架。** 與 `redesign-existing-projects` 在五個主題上指令相反，並存只會讓產出不穩定。
2. **沒有可驗證的版本與驗收。** 零 tag、零 release、建立 16 天、所有合併靠作者一人；skill 效果只靠模型自評 Checklist，沒有像 hallmark 的 sloplint 那種可執行檢查，也沒有任何公開的對照量測。
3. **本機成本不低。** 主檔每次觸發約 7.3K tokens，description 會是清單中最大的一條，觸發詞又與既有 skill 重疊。
4. **它最有價值的部分可以不裝就拿到。** `signs.md`、`tokens.md`、`visuals.md` 是獨立可讀的參考檔，CC BY 允許抽取。

**升級條件（→ ✅ 裝）**：拿 repo 內附的 `examples/dashboard.html` 當固定題目，分別用 unslop 與 `redesign-existing-projects` 各改一次並排比較；若 unslop 的結果明顯較好，就以**點名才觸發**的窄 description 安裝，並**取代** `redesign-existing-projects` 而不是並存。另一個觸發點：上游發出第一個 tag 或 plugin 正式上線（issue #8 關閉），有版本可釘。

**放棄條件（→ ❌ 不裝）**：並排實測分不出高下；或抽取的三份 reference 已經夠用；或到 2026 年底仍無 tag、issue #32 仍未修、維持單人維護。

#### 可單獨抽取（以下檔案皆已逐字讀過原文；無 tag，釘 commit SHA）

來源：`heydamir/unslop@97daa3eb365670ea3f87ed85356cbfcee18105a5`（2026-11-08）。抽取後請保留檔尾署名行並註明來源與修改。

| 優先 | 檔案 | 為什麼值得抽 |
|------|------|-------------|
| 1 | `skills/unslop/references/signs.md` | 64 條徵兆→修法，可直接當 AI 生成 UI 的審查清單；「Template look」一組是其他 skill 少見的第二層檢查 |
| 2 | `skills/unslop/references/tokens.md` | 三套中性色階的具體 hex、字級與圓角表，補既有 skill 偏原則少數值的缺口 |
| 3 | `skills/unslop/references/visuals.md` | 圖像 prompt 配方與失敗筆記，與介面無關的生圖工作也用得到 |
| 4 | `skills/unslop/SKILL.md` 的「Decide how much to change」「Direction」「Do not」三段 | 三級分流與五行方向可以改寫後併入既有改版 skill（屬改作，須署名並註明已修改） |
| 5 | `skills/unslop/scripts/snapshot.mjs` | 獨立的單檔擷取工具；**已讀碼但未實跑**，Windows 需自備 Playwright Chromium 或設 `CHROME_PATH` |

```bash
REF=97daa3eb365670ea3f87ed85356cbfcee18105a5
gh api "repos/heydamir/unslop/contents/skills/unslop/references/signs.md?ref=$REF"   -H "Accept: application/vnd.github.raw" > signs.md
gh api "repos/heydamir/unslop/contents/skills/unslop/references/tokens.md?ref=$REF"  -H "Accept: application/vnd.github.raw" > tokens.md
gh api "repos/heydamir/unslop/contents/skills/unslop/references/visuals.md?ref=$REF" -H "Accept: application/vnd.github.raw" > visuals.md
gh api "repos/heydamir/unslop/contents/skills/unslop/SKILL.md?ref=$REF"              -H "Accept: application/vnd.github.raw" > SKILL.md
gh api "repos/heydamir/unslop/contents/skills/unslop/scripts/snapshot.mjs?ref=$REF"  -H "Accept: application/vnd.github.raw" > snapshot.mjs
```

**不建議抽**：`story.mjs`（硬寫浮水印、issue #32 未修、用途是做宣傳短片）、`effects.md`（影像轉字元的小眾效果）、`refs/*.webp`（1.3 MB 成品圖，原文也要求只學品質不學題材）。

---

### 本次未驗證事項

- 沒有實際執行 skill，也沒有執行 `snapshot.mjs`、`story.mjs` 或測試；腳本相關結論全來自讀碼。
- 沒有做 unslop 與本機 skill 的並排產出比較，「誰改得比較好」沒有資料。
- 星標成長是否有機未能驗證（stargazers API 404）。
- Reddit、Exa 兩路社群資料未取得；小紅書與 V2EX 因 README 為英文未觸發。
- 本機 10 個設計 skill 只逐點比對了 3 個。

---

### 延伸操作

- 想要完整架構圖譜？→ 執行 `/understand`
- 想搜尋特定 symbol？→ 用 `/smart-explore`
- 想比較類似專案？→ 再跑一次 `/repo-intel` 分析另一個 repo
