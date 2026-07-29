---
source: "https://github.com/VoltAgent/awesome-design-md"
author: "VoltAgent"
stars: "105K"
clipped: 2026-06-26
updated: 2026-07-29
tags:
  - "github/repo"
  - "design-system"
  - "design-md"
  - "google-stitch"
  - "vibe-coding"
  - "ui-generation"
  - "awesome-list"
---

## awesome-design-md — 74 套品牌 DESIGN.md 設計系統收藏庫

> **VoltAgent/awesome-design-md** | ⭐ 105,154 | 🍴 12,035 | 📝 MIT
> "A collection of DESIGN.md files analysis by popular brand design systems. Drop one into your project and let coding agents generate a matching UI."

> 📌 檔名仍為「73 套」是歷史遺留（有 4 條反向連結指向舊檔名，改名成本大於收益故不改）。**實際為 74 套**——下方分類表本來就列滿 74 個（12+7+8+7+6+7+5+13+7+2），只有舊標題數字寫錯。

---

### 一句話說明

基於 Google Stitch 提出的 DESIGN.md 規範，從 74 個知名品牌網站萃取出可讓 AI 程式碼生成器直接讀取的設計系統文件。複製一個 `DESIGN.md` 到專案根目錄，AI Agent 就能產出風格一致的 UI。

---

### 專案概覽

| 項目 | 數值（2026-07-29 回訪） | vs 初訪（2026-06-26） |
|------|------|------|
| Stars | 105,154 | 93,468 → **+12.5%** |
| Forks | 12,035 | 11,091 |
| 主要語言 | 無（純 Markdown） | 同 |
| 授權 | MIT | 同 |
| 建立時間 | 2026-03-31 | 同 |
| 最後推送 | 2026-06-16（僅改 README banner 圖） | 同 → **已停 6 週** |
| 最後**內容**變更 | **2026-06-08**（`add nintendo design`） | **已停 7 週** |
| Open Issues | **300**（幾乎全是新品牌請求，無人處理） | 290 |
| Open PRs | 7 | — |
| 總 commit | 60（necatiozmen 一人 57） | — |
| 品牌數 | **74** | 標題誤記 73，內容本來就 74 |
| Topics | awesome-list, design-md, design-system, google-stitch, landing-page, design-tokens, figma, vibe-coding, vibe-design, vibecoding | — |

---

## 🔁 2026-07-29 回訪：兩件初訪沒有的事

### ① 已轉為付費服務的引流層

README 的品牌連結**全部改指 getdesign.md 官網**（不再指向 repo 內檔案），而官網的「請求新品牌」已是付費：

| 產品 | 價格 | 內容 |
|---|---|---|
| Private DESIGN.md | ~~$59~~ **$39** 單次 | 指定網站的客製 DESIGN.md（light+dark）+ HTML 主題預覽 + 私有 Discord |
| Web Launch Kit + DESIGN.md | ~~$299~~ **$249** 單次 | 完整 production-stack 模板 |

官網另宣稱「300+ DESIGN.md analyses, ready to request」——**那 300+ 不在免費 repo 裡**，是付費請求的目錄。

**結構性判讀**：300 張 open issue 幾乎全是「DESIGN.md for X」（含 shadcn/ui、Cloudflare、ChatGPT、Ant Design 等高需求品牌），而內容 commit 停在 06-08。這不是維護者忙不過來，是**請求流被改道**——GitHub 免費管道保留但不服務，同樣需求官網標價 $39。

➡️ **實務結論：免費的 74 套仍可用（raw URL 實測 200），但別期待新品牌會被免費加進來。**

### ② `/design-fetch` 有 6 項對照失效（P1，**2026-07-29 已修復並驗收**）

skill 的品牌→目錄對照表與 repo 實際目錄不符。12 次實呼叫驗證：

| skill 舊值 | 實測 | 修正後目錄 | 實測 |
|---|---|---|---|
| `linear` | **404** | `linear.app` | 200 |
| `opencode-ai` | **404** | `opencode.ai` | 200 |
| `runway` | **404** | `runwayml` | 200 |
| `the-verge` | **404** | `theverge` | 200 |
| `together-ai` | **404** | `together.ai` | 200 |
| `xai` | **404** | `x.ai` | 200 |

其餘 68 項正確。**`linear` 是本頁「開發者 Dashboard」第一推薦**，等於最常用的那條路是壞的。

**根因**：上游目錄用了含點號的真實網域名（`linear.app`／`x.ai`），skill 建立時寫成慣用短名。屬「淺探型」驗證盲區的同族——skill 裝好後從未實呼叫驗證過。

**修復**（2026-07-29）：只改對照表第 2 欄（目錄名稱），第 1 欄使用者輸入名保留短名，故 `/design-fetch linear` 用法不變。雙位置同步（`~/.claude/skills/` + `infra/skills-backup/`，MD5 一致）。順帶修正 skill 內兩處「73 個／73 brands」為 74。**驗收：對表列全部 74 個目錄實跑 raw URL，74/74 皆 200。**

---

### 什麼是 DESIGN.md？

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) 是 Google Stitch 提出的概念：一個純文字設計系統文件，讓 AI Agent 讀取後產出一致的 UI。

| 檔案 | 誰讀 | 定義什麼 |
|------|------|---------|
| `AGENTS.md` | Coding agents | 如何建構專案 |
| `DESIGN.md` | Design agents | 專案應該長什麼樣 |

不需 Figma 匯出、不需 JSON schema、不需特殊工具。Markdown 是 LLM 最擅長讀取的格式。

---

### DESIGN.md 9 大區段結構

| # | 區段 | 內容 |
|---|------|------|
| 1 | **Visual Theme & Atmosphere** | 情緒、密度、設計哲學 |
| 2 | **Color Palette & Roles** | 語意名稱 + hex + 功能角色 |
| 3 | **Typography Rules** | 字型家族、完整階層表（family/size/weight/lineHeight/letterSpacing） |
| 4 | **Component Stylings** | 按鈕、卡片、輸入框、導覽列（含 hover/active/disabled 狀態） |
| 5 | **Layout Principles** | 間距系統、網格、留白哲學 |
| 6 | **Depth & Elevation** | 陰影系統、表面層次 |
| 7 | **Do's and Don'ts** | 設計護欄與反模式 |
| 8 | **Responsive Behavior** | 斷點、觸控目標、收合策略 |
| 9 | **Agent Prompt Guide** | 快速色彩參考、可直接用的提示詞 |

---

### 74 套品牌完整分類

#### AI & LLM 平台（12 個）

| 品牌 | 設計特色 |
|------|---------|
| **Claude** | 暖陶土強調色、乾淨社論式排版、cream canvas + coral CTA |
| **Cohere** | 活力漸層、數據密集儀表板美學 |
| **ElevenLabs** | 深色電影風 UI、音頻波形美學 |
| **Minimax** | 大膽深色介面、霓虹強調色 |
| **Mistral AI** | 法式工程極簡、紫色調 |
| **Ollama** | 終端機優先、單色極簡 |
| **OpenCode AI** | 開發者中心深色主題 |
| **Replicate** | 乾淨白色畫布、程式碼導向 |
| **Runway** | 電影節社論美學、紙白閱讀帶、黑色膠囊 CTA |
| **Together AI** | 技術藍圖風格設計 |
| **VoltAgent** | 虛空黑畫布、翡翠強調、終端原生 |
| **xAI** | 嚴峻單色、未來主義極簡 |

#### 開發工具 & IDE（7 個）

| 品牌 | 設計特色 |
|------|---------|
| **Cursor** | AI-first 程式碼編輯器、流線深色、漸層強調 |
| **Expo** | React Native 平台、深色主題、緊湊字距 |
| **Lovable** | AI 全端建構器、活潑漸層、友善開發美學 |
| **Raycast** | 生產力啟動器、流線深色鍍鉻、活力漸層 |
| **Superhuman** | 高速 Email、頂級深色 UI、鍵盤優先、紫色光暈 |
| **Vercel** | 前端部署平台、黑白精確、Geist 字型 |
| **Warp** | 現代終端機、深色 IDE 風格、區塊式指令 UI |

#### 後端、資料庫 & DevOps（8 個）

| 品牌 | 設計特色 |
|------|---------|
| **ClickHouse** | 快速分析資料庫、黃色強調、技術文件風格 |
| **Composio** | 工具整合平台、現代深色搭彩色圖示 |
| **HashiCorp** | 基礎設施自動化、企業級、黑白 |
| **MongoDB** | 文件資料庫、綠葉品牌、開發者文件導向 |
| **PostHog** | 產品分析、刺蝟品牌、開發者友善深色 UI |
| **Sanity** | Headless CMS、深色社論行銷面、IBM Plex Mono 技術眉標 |
| **Sentry** | 錯誤監控、深色儀表板、數據密集、粉紫強調 |
| **Supabase** | 開源 Firebase 替代、深色翡翠主題、程式碼優先 |

#### 生產力 & SaaS（7 個）

| 品牌 | 設計特色 |
|------|---------|
| **Cal.com** | 開源排程、乾淨中性 UI、開發者導向 |
| **Intercom** | 客戶通訊、友善藍色調、對話 UI 模式 |
| **Linear** | 工程專案管理、超極簡、精準、紫色強調 |
| **Mintlify** | 文件平台、乾淨、綠色強調、閱讀優化 |
| **Notion** | All-in-one 工作區、暖調極簡、襯線標題、柔和表面 |
| **Resend** | 開發者 Email API、極簡深色、等寬強調 |
| **Zapier** | 自動化平台、暖橘色、友善插畫驅動 |

#### 設計 & 創作工具（6 個）

| 品牌 | 設計特色 |
|------|---------|
| **Airtable** | 試算表資料庫混合體、色彩豐富、結構化數據美學 |
| **Clay** | 創意代理商、有機形狀、柔和漸層、藝術指導排版 |
| **Figma** | 協作設計工具、活力多色、活潑又專業 |
| **Framer** | 網站建構器、大膽黑藍、動態優先、設計導向 |
| **Miro** | 視覺協作、亮黃強調、無限畫布美學 |
| **Webflow** | 視覺網頁建構器、藍色強調、精緻行銷網站美學 |

#### 金融科技 & 加密貨幣（7 個）

| 品牌 | 設計特色 |
|------|---------|
| **Binance** | 加密交易所、幣安黃配單色、交易廳急迫感 |
| **Coinbase** | 加密交易所、乾淨藍色身分、信任導向、機構感 |
| **Kraken** | 加密交易平台、紫色深色 UI、數據密集儀表板 |
| **Mastercard** | 全球支付網絡、暖 cream 畫布、軌道膠囊形狀、社論暖度 |
| **Revolut** | 數位銀行、流線深色、漸層卡片、金融科技精準 |
| **Stripe** | 支付基礎設施、標誌性紫色漸層、weight-300 優雅 |
| **Wise** | 國際匯款、明亮綠色強調、友善清晰 |

#### 電商 & 零售（5 個）

| 品牌 | 設計特色 |
|------|---------|
| **Airbnb** | 旅遊市集、暖珊瑚強調、攝影驅動、圓角 UI |
| **Meta** | 科技零售店、攝影優先、二元光暗表面、Meta Blue CTA |
| **Nike** | 運動零售、單色 UI、巨型大寫 Futura、全幅攝影 |
| **Shopify** | 電商平台、深色電影優先、霓虹綠強調、超輕展示字 |
| **Starbucks** | 咖啡旗艦零售、四階地球綠系統、暖 cream 畫布、SoDoSans 字型 |

#### 媒體 & 消費科技（13 個）

| 品牌 | 設計特色 |
|------|---------|
| **Apple** | 消費電子、頂級留白、SF Pro、電影級影像 |
| **HP** | PC 與印表機、純白畫布、HP Electric Blue 信號 CTA |
| **IBM** | 企業科技、Carbon 設計系統、結構化藍色 |
| **NVIDIA** | GPU 運算、綠黑能量、技術力量美學 |
| **Pinterest** | 視覺探索平台、紅色強調、瀑布流網格、圖像優先 |
| **PlayStation** | 遊戲主機零售、三表面頻道排版、青色 hover 縮放互動 |
| **SpaceX** | 太空科技、嚴峻黑白、全幅影像、未來感 |
| **Spotify** | 音樂串流、活力綠配深色、粗體字、專輯封面驅動 |
| **The Verge** | 科技社論媒體、酸薄荷+紫外線強調、Manuka 展示字型 |
| **Uber** | 行動平台、大膽黑白、緊湊字排、都市能量 |
| **Vodafone** | 全球電信品牌、紀念碑式大寫展示、Vodafone Red 章節帶 |
| **WIRED** | 科技雜誌、紙白大報密度、客製襯線、墨藍連結 |
| **Slack** | 團隊通訊平台 |

#### 汽車（7 個）

| 品牌 | 設計特色 |
|------|---------|
| **BMW** | 豪華汽車、深色頂級表面、精準德式工程美學 |
| **BMW M** | 性能汽車、賽車風對比、M 色彩強調、精準驅動排版 |
| **Bugatti** | 奢華超跑、電影黑畫布、單色嚴肅、紀念碑式展示字 |
| **Ferrari** | 奢華汽車、明暗對比黑白社論、Ferrari Red 極端節制 |
| **Lamborghini** | 奢華汽車、純黑教堂、金色強調、LamboType 新怪誕體 |
| **Renault** | 法系汽車、鮮豔極光漸層、NouvelR 專屬字型、零圓角按鈕 |
| **Tesla** | 電動車、極端減法、電影全視窗攝影、Universal Sans |

#### 復古 Web・DESIGN.md 懷舊系列（2 個）

| 品牌 | 設計特色 |
|------|---------|
| **Dell (1996)** | 目錄時代企業 Web、黑色頁框、扁平色塊、Helvetica-Black + Times Roman |
| **Nintendo.com (2001)** | Y2K 主機鍍鉻風、拉絲長春花金屬面板、琥珀發光導覽列、像素 Mario |

---

### 使用方式

```
1. 瀏覽品牌清單，挑選喜歡的視覺風格
2. 複製該品牌的 DESIGN.md 到你的專案根目錄
3. 告訴 AI Agent：「按照 DESIGN.md 的設計系統來做 UI」
```

不需要 clone 整個 repo（576K tokens），按需取用單個檔案即可。

---

### 適用場景

| 場景 | 推薦品牌風格 |
|------|------------|
| 開發者工具 Dashboard | Linear、Vercel、Raycast |
| 命理/生活類 App | Notion（暖調極簡）、Airbnb（暖珊瑚） |
| 資料密集儀表板 | PostHog、Sentry、Cohere |
| 技術文件站 | Mintlify、Supabase、ClickHouse |
| 投影片/簡報 | Apple（留白）、Tesla（電影感）、SpaceX（未來風） |
| 電商/產品頁 | Shopify、Nike、Starbucks |

---

### 搭配 Skill

| Skill | 用途 |
|-------|------|
| `/design-fetch <品牌名>` | 一鍵從 GitHub 取得該品牌的 DESIGN.md 放到當前專案根目錄。**2026-07-29 已修 6 項對照並驗收 74/74 → 200**（見上方回訪 §②）。取檔機制：`curl -sL https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/<目錄>/DESIGN.md`，**不要改走 README 連結**（已導向官網付費漏斗） |
| `/design-taste-frontend` | Anti-Slop 前端生成，搭配 DESIGN.md 強制風格一致 |
| `/high-end-visual-design` | $150k 代理商等級設計規則 |
| `/minimalist-ui` | Editorial/Minimalist 風格（Notion/Linear 美學） |
| `/ui-ux-pro-max` | 161 色票 + 67 UI 風格 + 57 字型配對 |

### 相關連結

- [[taste-skill Anti-Slop 前端設計]] — 5 個 UI 品味 Skill，可搭配 DESIGN.md 使用
- [[Claude Code 設計指南 Skill]] — Claude Code 源碼架構書
- [[ui-ux-pro-max]] — 161 色票 + 67 UI 風格 + 57 字型配對
