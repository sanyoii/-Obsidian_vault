> 最後更新：2026-05-25（新增 Claude Code Router、CCPlugins 12 個指令、Claude Code Action、Understand Anything 8 個 Skills）

> Skills 在 **Claude Code** 和 **Claude Cowork** 中均可使用，Claude 一般網頁版不支援。

> GitHub 備份：https://github.com/sanyoii/claude-setup（私人）

  

---

  

## 目錄

  

- [換電腦恢復步驟](#換電腦恢復步驟)

- [已安裝的程式](#已安裝的程式)

- [已安裝的 Skills](#已安裝的-skills)

- [已安裝的 Commands](#已安裝的-commands)

- [操作建議：按任務選工具](#操作建議按任務選工具)

- [目錄結構](#目錄結構)

- [日常維護](#日常維護)

  

---

  

## 換電腦恢復步驟

  

> 預計時間：約 10-15 分鐘（自動）

  

### 快速恢復（推薦）

  

#### Windows

  

**前提：** 已安裝 Claude Code Windows App、Git、Node.js、Python

  

```powershell

# 1. Clone repo

git clone https://github.com/sanyoii/claude-setup D:\Claude

  

# 2. 一鍵恢復（自動安裝 103 Skills、claude-mem、所有工具）

pwsh -ExecutionPolicy Bypass -File D:\Claude\setup.ps1

  

# 3. 啟動 Claude Code

cd D:\Claude

claude

```

  

#### macOS

  

**前提：** 已安裝 Claude Code、Git（或讓腳本自動裝 Homebrew）

  

```zsh

# 1. Clone repo

git clone https://github.com/sanyoii/claude-setup ~/Claude

  

# 2. 一鍵恢復（自動安裝 Homebrew、103 Skills、claude-mem、所有工具）

chmod +x ~/Claude/setup.sh && ~/Claude/setup.sh

  

# 3. 啟動 Claude Code

cd ~/Claude

claude

```

  

腳本完成後會輸出驗證報告，確認所有項目都安裝成功。

唯一需要手動補的是 `.env` 檔案（填入 API Keys，涉及私鑰不備份）。

  

---

  

### 手動恢復（逐步說明）

  

> 若自動腳本遇到問題，可參考以下步驟手動執行

  

### 步驟 1：安裝基礎工具

  

```powershell

winget install --id Git.Git --silent

winget install --id OpenJS.NodeJS.LTS --silent

npm install -g pnpm

winget install --id Python.Python.3 --silent

```

  

### 步驟 2：Clone 備份 repo

  

```powershell

git clone https://github.com/sanyoii/claude-setup d:\Claude

```

  

### 步驟 3：安裝 Claude Code

  

從 [claude.ai/download](https://claude.ai/download) 下載安裝，登入同一個帳號即可。

  

### 步驟 4：恢復全域 Skills

  

```powershell

New-Item -ItemType Directory -Force "C:\Users\$env:USERNAME\.claude\skills"

Copy-Item "d:\Claude\.claude\skills\*" "C:\Users\$env:USERNAME\.claude\skills\" -Recurse -Force

  

# 驗證數量（應為 98，含 claude-mem 的 8 個）

(Get-ChildItem "C:\Users\$env:USERNAME\.claude\skills" -Directory).Count

```

  

### 步驟 4.5：恢復 claude-mem Plugin

  

```powershell

# 複製 plugin 到 user-level

$src = "d:\Claude\Skill_origin\claude-mem-main\claude-mem-main"

$dst = "$env:USERPROFILE\.claude\plugins\marketplaces\thedotmack"

New-Item -ItemType Directory -Path "$dst" -Force | Out-Null

Copy-Item "$src\.claude-plugin" "$dst\.claude-plugin" -Recurse -Force

Copy-Item "$src\plugin" "$dst\plugin" -Recurse -Force

  

# 安裝 Bun 和依賴（smart-install 自動處理）

$env:CLAUDE_PLUGIN_ROOT = "$dst\plugin"

node "$dst\plugin\scripts\smart-install.js"

  

# 複製 claude-mem skills

$skills = @('do','knowledge-agent','make-plan','mem-search','pathfinder','smart-explore','timeline-report','version-bump')

foreach ($s in $skills) {

    Copy-Item "$dst\plugin\skills\$s" "$env:USERPROFILE\.claude\skills\$s" -Recurse -Force

}

```

  

> Hooks 已內含於 `~/.claude/settings.json`（隨 repo 備份）。Worker Service 在下次 Claude Code 啟動時自動運行。

  

### 步驟 4.6：建立 Marketplace 結構（可選）

  

```powershell

# 建立 junction link（開發目錄 ↔ user-level）

New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\plugins\marketplaces\sanyoii" `

  -Target "d:\Claude\my-marketplace"

```

  

### 步驟 5：安裝各程式

  

```powershell

# Repomix

npm install -g repomix

  

# OpenSpec

npm install -g openspec

  

# Scrapling

pip install scrapling

python -m playwright install

  

# Open Design

cd d:\Claude\open-design

pnpm install

  

# AutoHedge（建虛擬環境）

cd d:\Claude

python -m venv autohedge-env

.\autohedge-env\Scripts\Activate.ps1

pip install autohedge

# 填入真實 API keys：

Copy-Item d:\Claude\autohedge.env.example d:\Claude\autohedge-env\.env

notepad d:\Claude\autohedge-env\.env

  

# AI Website Cloner

cd d:\Claude\ai-website-cloner

npm install

```

  

### 步驟 6：驗證

  

```powershell

repomix --version

openspec --version

python -c "import scrapling; print(scrapling.__version__)"

```

  

> Open Design 的 Windows symlink 修復已包含在 repo 中，不需重新修改。

  

---

  

## 日常維護

  

### 新增 Skill 或修改後同步 GitHub：

  

```powershell

cd d:\Claude

git add .claude/skills/ README.md settings.json

git commit -m "更新: <說明>"

git push

```

  

### 更新 claude-mem 到最新版：

  

```powershell

# 重新 clone 最新版

gh repo clone thedotmack/claude-mem "$env:TEMP\claude-mem-latest"

$dst = "$env:USERPROFILE\.claude\plugins\marketplaces\thedotmack"

Copy-Item "$env:TEMP\claude-mem-latest\.claude-plugin" "$dst\.claude-plugin" -Recurse -Force

Copy-Item "$env:TEMP\claude-mem-latest\plugin" "$dst\plugin" -Recurse -Force

$env:CLAUDE_PLUGIN_ROOT = "$dst\plugin"

node "$dst\plugin\scripts\smart-install.js"

Remove-Item "$env:TEMP\claude-mem-latest" -Recurse -Force

```

  

### 更新官方 Skills 到最新版：

  

```powershell

# Anthropic 官方

git clone --depth 1 https://github.com/anthropics/skills "$env:TEMP\a-skills"

Copy-Item "$env:TEMP\a-skills\skills\*" "C:\Users\$env:USERNAME\.claude\skills\" -Recurse -Force

Copy-Item "$env:TEMP\a-skills\skills\*" "d:\Claude\.claude\skills\" -Recurse -Force

Remove-Item "$env:TEMP\a-skills" -Recurse -Force

  

# Superpowers

git clone --depth 1 https://github.com/obra/superpowers "$env:TEMP\superpowers"

Copy-Item "$env:TEMP\superpowers\skills\*" "C:\Users\$env:USERNAME\.claude\skills\" -Recurse -Force

Copy-Item "$env:TEMP\superpowers\skills\*" "d:\Claude\.claude\skills\" -Recurse -Force

Remove-Item "$env:TEMP\superpowers" -Recurse -Force

```

  

---

  

## 已安裝的程式

  

### 1. Claude Code

  

**用途：** Anthropic 官方 AI 程式碼助手，可讀寫檔案、執行指令、分析程式碼。

  

**使用方法：** 透過 VSCode 擴充功能，或在終端執行：

```powershell

claude

```

需要 Chrome 整合（截圖、瀏覽器操作）時：

```powershell

claude --chrome

```

  

---

  

### 2. Repomix（全域 npm）

  

**用途：** 將整個程式碼庫打包成單一 XML 檔，供 AI 分析。

  

```bash

repomix                                                    # 分析目前目錄

repomix --remote username/repo --output /tmp/out.xml       # 分析 GitHub 倉庫

repomix --remote facebook/react --compress --output /tmp/out.xml  # 大型倉庫加壓縮

```

  

---

  

### 3. AutoHedge（`autohedge-env/`）

  

**用途：** 企業級 AI 自主對沖基金，使用多代理人協作在 **Solana 鏈上自動交易**。四個代理人分工：

  

| 代理人 | 職責 |

|--------|------|

| Director Agent | 制定交易策略與論點 |

| Quant Agent | 技術分析與統計模型 |

| Risk Agent | 部位大小與風險控管 |

| Execution Agent | 建立並執行訂單 |

  

**使用前必填 `.env`：**

  

編輯 `d:\Claude\autohedge-env\.env`，填入以下 API Keys：

  

| 環境變數 | 說明 | 申請 |

|---------|------|------|

| `JUPITER_API_KEY` | 市場數據（必填）| https://portal.jup.ag |

| `ANTHROPIC_API_KEY` | Claude AI（擇一填）| https://console.anthropic.com |

| `OPENAI_API_KEY` | GPT AI（擇一填）| https://platform.openai.com |

| `WALLET_PRIVATE_KEY` | Solana 錢包私鑰 | 你的 Solana 錢包 |

  

**啟動方式：**

```powershell

cd d:\Claude\autohedge-env

.\Scripts\Activate.ps1

autohedge

```

  

> ⚠️ **警告：這個程式會用你的 Solana 錢包進行真實交易。** 錢包裡只放你願意損失的金額，切勿將 `.env` 上傳至 GitHub 或分享給他人。

  

---

  

### 4. Scrapling（全域 Python 套件）

  

**用途：** 自適應網頁爬蟲框架，從單一 HTTP 請求到大規模並發抓取都支援。能繞過 Cloudflare 等反爬系統，支援瀏覽器自動化，並有 AI MCP Server 整合。**安裝版本：** 0.4.7（Playwright 瀏覽器已就緒）

  

#### 選哪種 Fetcher？

  

| 情境 | 用哪個 |

|------|--------|

| 一般網頁、API | `Fetcher` |

| 有 Cloudflare / 反爬保護 | `StealthyFetcher` |

| 需要執行 JS、點擊互動 | `DynamicFetcher` |

| 同時抓很多頁面 | `AsyncStealthySession` |

| 爬整個網站（多頁翻頁）| `Spider` |

  

#### 基本 HTTP（`Fetcher`）

  

```python

from scrapling.fetchers import Fetcher

  

page = Fetcher.get('https://example.com')

  

title = page.css('h1::text').get()           # CSS 選取器，取第一個

links = page.css('a::attr(href)').getall()   # 取所有連結

items = page.xpath('//div[@class="item"]/text()').getall()  # XPath

divs  = page.find_all('div', class_='product')  # BeautifulSoup 風格

```

  

#### 繞過 Cloudflare（`StealthyFetcher`）

  

```python

from scrapling.fetchers import StealthyFetcher

  

page = StealthyFetcher.fetch(

    'https://目標網站.com',

    headless=True,

    solve_cloudflare=True

)

data = page.css('.content::text').getall()

```

  

#### 完整瀏覽器互動（`DynamicFetcher`）

  

需要點按鈕、填表單、等 JS 載入時用：

  

```python

from scrapling.fetchers import DynamicSession

  

with DynamicSession(headless=True, network_idle=True) as browser:

    page = browser.fetch('https://example.com')

    btn = page.find('button', class_='load-more')

    btn.click()

    items = page.css('.item::text').getall()

```

  

#### 並發大量抓取（非同步）

  

```python

import asyncio

from scrapling.fetchers import AsyncStealthySession

  

async def scrape_many():

    urls = ['https://example.com/page1', 'https://example.com/page2']

    async with AsyncStealthySession(max_pages=3) as session:

        pages = await asyncio.gather(*[session.fetch(u) for u in urls])

    for page in pages:

        print(page.css('h1::text').get())

  

asyncio.run(scrape_many())

```

  

#### 爬整個網站（`Spider`）

  

```python

from scrapling.spiders import Spider, Response

  

class MySpider(Spider):

    name = "my_spider"

    start_urls = ["https://quotes.toscrape.com/"]

    concurrent_requests = 5

  

    async def parse(self, response: Response):

        for quote in response.css('.quote'):

            yield {

                "text": quote.css('.text::text').get(),

                "author": quote.css('.author::text').get(),

            }

        next_page = response.css('.next a')

        if next_page:

            yield response.follow(next_page[0].attrib['href'])

  

result = MySpider(crawldir="./my_crawl").start()  # Ctrl+C 可暫停，再執行續爬

result.items.to_json("output.json")

```

  

#### 直接解析 HTML 字串

  

```python

from scrapling.parser import Selector

  

page = Selector("<div class='item'><h2>標題</h2><p class='price'>NT$100</p></div>")

title = page.css('h2::text').get()

price = page.css('.price::text').get()

```

  

#### CLI 不寫程式直接用

  

```powershell

# 把網頁轉成 Markdown

scrapling extract get "https://example.com" output.md

  

# 只抓特定 CSS 區塊

scrapling extract get "https://example.com" output.html --css-selector "#main"

  

# 隱身模式抓（繞 Cloudflare）

scrapling extract stealthy-fetch "https://目標網站.com" output.html --solve-cloudflare

  

# 開互動 shell

scrapling shell

```

  

> CLI 路徑：`C:\Users\sanyo\AppData\Roaming\Python\Python314\Scripts\scrapling.exe`

  

---

  

### 5. OpenSpec（全域 npm 套件）

  

**用途：** AI 原生規格管理框架，讓 AI 助手和開發者在開始實作前先對需求達成共識。每個功能變更都有獨立資料夾，包含提案、規格文件、技術設計和實作任務清單。**安裝版本：** 1.3.1

  

#### 典型工作流程

  

```

1. /opsx:propose  → AI 建立提案資料夾（需求規格 + 技術設計 + 任務清單）

2. /opsx:apply    → AI 依照規格實作每個任務

3. /opsx:archive  → 完成的工作歸檔，更新主規格文件

```

  

#### 在專案中初始化

  

```powershell

cd 你的專案目錄

openspec init              # 初始化 OpenSpec

openspec config profile    # 選擇工作流程類型

openspec update            # 更新 AI 指引文件

```

  

#### 日常使用（在 Claude Code 對話中）

  

```

/opsx:propose add-dark-mode    # 提出「新增深色模式」的變更

/opsx:apply                    # 執行實作任務

/opsx:archive                  # 歸檔並更新規格

```

  

其他指令：

  

| 指令 | 說明 |

|------|------|

| `/opsx:new` | 開始新的變更 |

| `/opsx:continue` | 繼續現有提案 |

| `/opsx:verify` | 品質檢查產出物 |

| `/opsx:bulk-archive` | 一次歸檔多個變更 |

| `/opsx:onboard` | 設定團隊工作流程 |

  

#### CLI 指令

  

```powershell

openspec list              # 列出所有變更

openspec list --specs      # 列出所有規格

openspec view              # 開啟互動式 Dashboard

openspec status            # 查看目前變更的完成狀態

openspec validate          # 驗證變更與規格

openspec show <名稱>        # 查看特定變更或規格

openspec schemas           # 列出可用的工作流程 schema

```

  

---

  

### 6. Claude Code Router（全域 npm）

**用途：** 按任務類型將 Claude Code 的請求路由到不同模型。背景/輕量任務走 Gemini Flash（省費用），主要對話仍用 Claude Sonnet（保品質）。

**設定檔：** `C:\Users\sanyo\.claude-code-router\config.json`

```powershell
ccr start    # 啟動路由服務（port 3456）
ccr code     # 透過路由啟動 Claude Code
ccr status   # 查看狀態
ccr ui       # 開啟 Web UI 管理介面
ccr stop     # 停止服務
```

**路由規則：**
- 背景任務 → `gemini-2.5-flash`（快速、便宜）
- 主要對話 → Claude Sonnet（預設）

> 平常直接用 `claude` 即可；要省 token 或測試 Gemini 時用 `ccr code` 啟動。

---

### 7. Recursive Mode（Claude Code Skills）

  

**用途：** AI Agent 的結構化工作流程系統。強制依序走完七個開發階段，每個階段產出的文件鎖定不可竄改，跨對話保持上下文，適合多輪對話才能完成的複雜任務。

  

**安裝的 9 個 Sub-Skills：**

  

| Skill | 說明 |

|-------|------|

| `recursive-mode` | 主 skill，完整七階段工作流程 |

| `recursive-debugging` | Phase 1.5，先診斷 root cause 再修 bug |

| `recursive-tdd` | TDD 模式（Red→Green→Refactor）|

| `recursive-spec` | 規格文件管理 |

| `recursive-subagent` | Phase 3.5，委派 subagent 審查 |

| `recursive-review-bundle` | 程式碼 Review 打包 |

| `recursive-worktree` | Git worktree 隔離執行 |

| `recursive-router` | 智能路由，決定走哪個 phase |

| `recursive-benchmark` | 效能基準測試 |

  

**在專案中啟用（每個新專案執行一次）：**

  

```powershell

cd 你的專案目錄

  

# 用 bootstrap 腳本建立 /.recursive/ 控制平面

pwsh -NoProfile -File "d:\Claude\.agents\skills\recursive-mode\scripts\install-recursive-mode.ps1" -RepoRoot .

```

  

**使用方式（在 Claude Code 對話中說）：**

  

```

Implement the run          ← 啟動一個新的 Run，AI 依序走完七個階段

```

  

**七個強制階段：**

  

```

Phase 1    需求分析        — 釐清要做什麼

Phase 1.5  除錯診斷        — 找 root cause（修 bug 時插入）

Phase 2    AS-IS 分析     — 分析現有程式碼狀態

Phase 3    規劃            — 制定實作計畫

Phase 3.5  委派 Review    — Subagent 審查計畫

Phase 4    實作            — 寫程式（TDD）

Phase 5    測試            — 驗證功能

Phase 6    QA              — 品質審查

Phase 7    Closeout        — 歸檔，更新記憶

```

  

> 所有階段產出存於專案的 `/.recursive/` 資料夾，鎖定後不可覆蓋，只能追加 addendum。適合「一次對話講不完」的大型任務。

  

---

  

### 8. Social Monitor（`social-monitor/`）

**用途：** 定時抓取 X (Twitter) / Threads / Instagram 熱門話題，輸出 Markdown 報告，並可 Gmail 通知。Task Scheduler 設定於 10:30 + 22:00 自動執行。

```powershell
cd d:\Claude\social-monitor
python run.bat         # 手動執行一次
```

報告輸出至 `d:\Claude\obsidian\wiki\Social\社群海巡 YYYY-MM-DD-HHMM.md`

---

### 9. Job Crawler（`job-crawler/`）

**用途：** 定時從多個求職平台（104、CryptoJobsList、Web3Career）抓取職缺，自動去重、過濾、Email 通知，並提供 Flask Web UI 瀏覽與追蹤。

```powershell
cd d:\Claude\job-crawler
python app.py          # 啟動 Web UI（預設 http://localhost:5000）
python crawler.py      # 手動抓取一次
```

---

### 10. AI Video Pipeline（`ai-video-pipeline/`）

**用途：** AI 影片全自動化 Pipeline，6 個處理階段：腳本生成 → 素材搜集 → 影片生成（fal.ai）→ 旁白合成（OpenAI TTS）→ 字幕 → FFmpeg 合成。

依賴：`FAL_KEY`（fal.ai）、`OPENAI_API_KEY`、FFmpeg（需手動安裝）

---

### 11. CareerBot（`careerbot/`）

**用途：** AI 求職助手。研究目標公司、找出符合偏好的職缺、從 Answer Bank 自動草擬各平台申請表答案（Why us、自我介紹等），可重複跨申請複用。

```powershell
cd d:\Claude\careerbot
# 先填入 context 和放入 resume.pdf，再執行 /onboard
```

---

### 12. HD Decode（`hd-decode/`）

**用途：** 人類圖（Human Design）深度分析工具。讀取個人圖表，輸出類型、策略、權威、通道、PHS 等完整解析報告。

---

### 13. Open Slide（`open-slide/`）

**用途：** React 元件式投影片工具。每張投影片是一個 `slides/<id>/index.tsx`，由 `@open-slide/core` 處理排版、縮放、導覽與全螢幕播放。

```powershell
cd d:\Claude\open-slide
npm run dev            # 啟動預覽伺服器
```

---

  

## 已安裝的 Skills

  

Skills 位置：

- 全域（任何專案）：`C:\Users\sanyo\.claude\skills\`

- 此目錄備份：`d:\Claude\.claude\skills\`

  

> **跨平台支援：** Skills 在 **Claude Code**（CLI/桌面/VSCode）和 **Claude Cowork** 中均可使用，安裝一次全平台共享。

  

目前共 **116 個 Skills**（含 Understand-Anything 8 個），分為以下類別：

  

---

  

### Anthropic 官方 Skills（17 個）

  

來源：[anthropics/skills](https://github.com/anthropics/skills)

  

#### 文件處理

  

| Skill | 用途 |

|-------|------|

| `pdf` | 讀取、建立、合併、拆分 PDF，提取表格與文字 |

| `docx` | 建立/編輯 Word 文件，支援追蹤修訂、格式保留 |

| `pptx` | 建立/編輯 PowerPoint，含版型、圖表、自動生成 |

| `xlsx` | 建立/編輯 Excel，支援公式、格式化、資料分析 |

| `doc-coauthoring` | 協作文件撰寫輔助 |

  

**觸發：** 說「讀取這個 PDF」、「幫我做一份 Excel 報表」、「整理成 Word 文件」等自動啟用

  

#### 設計與創作

  

| Skill | 用途 |

|-------|------|

| `algorithmic-art` | p5.js 生成藝術，含種子隨機與粒子系統 |

| `canvas-design` | 視覺藝術創作，輸出 PNG/PDF |

| `frontend-design` | 前端設計指引（React + Tailwind），避免 AI 俗套設計 |

| `slack-gif-creator` | 生成 Slack 優化動態 GIF |

| `theme-factory` | 主題色彩系統生成 |

| `web-artifacts-builder` | 用 React + shadcn/ui 建立複雜 HTML artifacts |

  

#### 開發工具

  

| Skill | 用途 |

|-------|------|

| `webapp-testing` | 用 Playwright 測試網頁應用 |

| `mcp-builder` | 建立高品質 MCP Server，整合外部 API |

| `claude-api` | Claude API 整合指引 |

| `skill-creator` | 官方互動式 Skill 建立工具（問答引導） |

  

#### 溝通

  

| Skill | 用途 |

|-------|------|

| `brand-guidelines` | Anthropic 品牌規範應用 |

| `internal-comms` | 內部溝通文件撰寫指引 |

  

---

  

### Superpowers 系列（14 個）

  

來源：[obra/superpowers](https://github.com/obra/superpowers)

  

#### 除錯

  

| Skill | 用途 |

|-------|------|

| `systematic-debugging` | 4 階段系統性除錯：觀察 → 假設 → 驗證 → 修復 |

| `verification-before-completion` | 確認修復真的有效，不是只有「看起來有效」|

  

**觸發：** 報告 bug、說「這裡有問題」、「幫我除錯」時自動啟用

  

#### 開發協作

  

| Skill | 用途 |

|-------|------|

| `test-driven-development` | RED-GREEN-REFACTOR 循環，含測試反模式參考 |

| `writing-plans` | 把任務拆解成 2-5 分鐘可執行的清單 |

| `executing-plans` | 批次執行計畫，附人工確認節點 |

| `dispatching-parallel-agents` | 啟動並行 subagent 工作流，加速複雜任務 |

| `subagent-driven-development` | 兩階段 review 的快速迭代開發 |

  

#### Code Review

  

| Skill | 用途 |

|-------|------|

| `requesting-code-review` | 送 review 前的 pre-check 清單 |

| `receiving-code-review` | 正確處理 review 回饋的流程 |

  

#### Git 工作流

  

| Skill | 用途 |

|-------|------|

| `using-git-worktrees` | 管理並行開發分支（Git worktree）|

| `finishing-a-development-branch` | 處理 merge/PR 決策 |

  

#### 腦力激盪

  

| Skill | 用途 |

|-------|------|

| `brainstorming` | Socratic 式設計討論，透過反覆提問精煉需求 |

  

**觸發：** 說「幫我想想」、「這個設計好嗎」、「有什麼更好的做法」時啟用

  

#### Meta

  

| Skill | 用途 |

|-------|------|

| `using-superpowers` | Superpowers 系統入門說明 |

| `writing-skills` | 建立新 Skill 的框架與測試方法 |

  

---

  

### Recursive Mode（結構化工作流程）

  

以下 9 個 Skills 由 Recursive Mode 提供，在每個專案的 `/.recursive/` 初始化後自動可用：

  

| Skill | 觸發時機 |

|-------|---------|

| `recursive-mode` | 說「Implement the run」啟動完整七階段流程 |

| `recursive-debugging` | 修 bug 前說「插入 Phase 1.5」找 root cause |

| `recursive-tdd` | 說「用 TDD 模式實作」|

| `recursive-spec` | 管理規格文件 |

| `recursive-subagent` | Phase 3.5 委派 Review |

| `recursive-review-bundle` | 打包程式碼 Review |

| `recursive-worktree` | Git worktree 隔離 |

| `recursive-router` | 智能判斷走哪個 phase |

| `recursive-benchmark` | 效能基準測試 |

  

---

  

### 通用開發工具

  

#### `agent-memory` — 跨對話記憶

跨對話儲存重要資訊，下次開新對話仍能記住。

  

**觸發：** 自動觸發，或說「記住這個」、「你還記得...嗎」、「整理你的筆記」

  

記憶儲存於 `.claude/skills/agent-memory/memories/`（各專案獨立）

  

---

  

#### `contextual-commit` — 有語境的 Git Commit

Commit 時自動在 body 記錄「為什麼這樣改」，不只是「改了什麼」。

  

**觸發：** 每次要 git commit 時自動使用

  

```

feat(auth): 新增 Google OAuth 登入

  

intent(auth): 使用者希望支援社群登入

decision(oauth): 選用 passport.js 而非 auth0-sdk

rejected(auth0-sdk): 與現有 Redis session 架構不相容

learned(passport): 需明確加上 offline_access scope 才能取得 refresh token

```

  

---

  

#### `gimp-inkscape` — 圖片處理工具組

  

本地圖片建立與處理，無 API 費用、不需網路。工具涵蓋：

  

| 工具 | 適用場景 |

|------|---------|

| ImageMagick | resize、裁切、格式轉換、文字疊加、浮水印、WebP |

| Inkscape | SVG → PNG 匯出、精確排版（OG 圖、社群卡片）|

| GIMP | 圖層合成、色彩校正、Script-Fu 批次處理 |

| FFmpeg | GIF 製作、影片轉圖、動畫 |

| ExifTool | 元資料讀取與清除（上傳前去除隱私資訊）|

| OptiPNG / jpegoptim | 無損壓縮（PNG 節省 20-50%）|

| pdftoppm | PDF → PNG/JPEG 逐頁轉圖 |

  

**觸發：** 說「縮圖」、「轉 WebP」、「加浮水印」、「SVG 轉 PNG」、「壓縮圖片」、「PDF 轉圖」等

  

來源：[ramon-webdevpro-nl/claude-skills](https://github.com/ramon-webdevpro-nl/claude-skills)

  

> 需先安裝對應 CLI 工具（ImageMagick、Inkscape、GIMP、FFmpeg 等）

  

---

  

#### `repomix-explorer` — 程式碼庫分析

用 Repomix 分析本地或 GitHub 倉庫的結構與內容。

  

**觸發：** 說「分析這個 repo」、「這個專案結構是什麼」、「找所有 API endpoint」

  

需要：Repomix CLI 已安裝（`repomix --version`）

  

---

  

#### `resume-pdf-optimize` — HTML 履歷轉 PDF 優化

優化 HTML 履歷的 PDF 列印輸出，修正分頁、排版、符號對齊等問題。

  

**使用：** `/resume-pdf-optimize 你的履歷.html`（或直接說「優化這份履歷」）

  

輸出 PDF：Chrome → `Ctrl+P` → 儲存為 PDF → A4 → 勾選「背景圖形」

  

---

  

#### `ssc` — Skill / Agent / Hook 建立工具

協助建立或升級 Claude Code 的 Skill、Agent、Hook，走標準化三世代流程（確認方向 → 訪談 → 產出）。

  

**使用：** 說「建一個 Skill」、「做 Agent」、「加 Hook」、「升級這個 Skill」時觸發

  

---

  

#### `byethrow` — JS/TS Result 型別錯誤處理

在 JS/TS 專案中使用 `@praha/byethrow` 函式庫，用 Result 型別取代 throw/catch。

  

**觸發：** 在含有 `@praha/byethrow` 的專案中自動啟用

  

```bash

npx @praha/byethrow-docs list

npx @praha/byethrow-docs search "查詢關鍵字"

```

  

---

  

#### `use-gunshi-cli` — Gunshi CLI 函式庫

建立 JS/TS CLI 工具時，改用 Gunshi 取代 yargs/commander/cac。

  

**觸發：** 在 `.ts/.js/package.json` 相關 CLI 開發中自動啟用

  

---

  

### 設計與創作

  

#### `huashu-design` — 花叔 HTML 設計

用 HTML 做高保真原型、互動 Demo、幻燈片、動畫、設計變體探索。以「設計師」而非程式員角色工作，避免 AI 設計俗套。

  

**觸發：** 說「做原型」、「設計 Demo」、「做個好看的 HTML 頁面」、「iOS 原型」、「匯出 MP4」、「推薦設計風格」等

  

功能：Junior Designer 工作流、Playwright 驗證、動畫 → MP4/GIF 匯出（含 BGM）、設計方向顧問模式

  

---

  

#### `nuwa-skill` — 女媧造人 Skill 生成器

輸入人名或模糊需求，自動深度調研 → 提煉思維框架 → 生成可運行的人物 Skill。

  

**觸發：** 說「幫我做一個 XXX 的 Skill」、「蒸餾 XX 人物」或給出模糊需求讓它推薦人物

  

兩種入口：(1) 明確人名 → 直接蒸餾 (2) 模糊需求 → 診斷推薦 → 再蒸餾

  

---

  

#### `guizang-ppt` — 歸藏雜誌風 PPT

生成「電子雜誌 × 電子墨水」風格的橫向翻頁網頁 PPT（單一 HTML 檔）。含 WebGL 流體背景、10 種版型、5 種色彩主題。

  

**觸發：** 說「做個 PPT」、「雜誌風簡報」、「橫滑 deck」、「發布會風格」

  

---

  

#### `prompt-master` — AI Prompt 工程師

為任何 AI 工具生成精準、零浪費的 production-ready prompt。確認目標工具 → 提取意圖 → 輸出單一可複製的 prompt。

  

**觸發：** 說「幫我寫一個 prompt」、「優化這個 prompt」、「為 Midjourney/Claude/GPT 寫 prompt」

  

支援：Claude、GPT、o3/o4-mini、Gemini、Midjourney、DALL-E、Stable Diffusion、Claude Code、Cursor 等

  

---

  

### 術數命理

  

#### `bazi`（FANzR 版）— 八字排盤

四柱八字專業排盤與解盤。分析天干地支、日主、十神、大運流年、喜用神、格局、五行旺衰。

  

**觸發：** 說「幫我排八字」、「分析命局」、「大運流年怎麼看」

  

---

  

#### `bazi-skill`（jinchenma94 版）— 八字命理分析

互動式收集生辰資訊（姓名、陽曆/農曆生日、時辰、性別、出生地），參照穷通宝典、三命通會、滴天髓等經典典籍進行分析。

  

**觸發：** 說「我要算八字」、「幫我看命盤」

  

---

  

#### `qimen-dunjia` — 奇門遁甲

奇門遁甲排盤、解盤、擇時、方位判斷與理論教學。

  

**觸發：** 說「用奇門分析」、「奇門排盤」、「奇門擇吉」、「選方位」

  

---

  

#### `ziwei-doushu` — 紫微斗數

紫微斗數專業排盤與解盤。分析命宮、十二宮、主星、四化、大限、流年、飛星。

  

**觸發：** 說「幫我排紫微」、「紫微命盤」、「大限流年分析」

  

---

  

### Google Cloud

  

以下 Skills 在使用 Google Cloud 相關服務時自動觸發：

  

| Skill | 對應服務 |

|-------|---------|

| `alloydb-basics` | AlloyDB（PostgreSQL 相容資料庫） |

| `bigquery-basics` | BigQuery（資料倉儲） |

| `cloud-run-basics` | Cloud Run（無伺服器容器） |

| `cloud-sql-basics` | Cloud SQL（託管關聯式資料庫） |

| `firebase-basics` | Firebase（應用開發平台） |

| `gemini-api` | Gemini API 整合 |

| `gke-basics` | Google Kubernetes Engine |

| `google-cloud-networking-observability` | GCP 網路監控與可觀測性 |

| `google-cloud-recipe-auth` | GCP 身份驗證最佳實踐 |

| `google-cloud-recipe-onboarding` | GCP 入門配置 |

| `google-cloud-waf-cost-optimization` | GCP 成本優化 |

| `google-cloud-waf-reliability` | GCP 可靠性架構 |

| `google-cloud-waf-security` | GCP 安全最佳實踐 |

  

---

  

### Matt Pocock 工程技能組（14 個）

  

來源：[mattpocock/skills](https://github.com/mattpocock/skills)

  

這組 Skills 圍繞「深度工程工作流程」設計，從診斷 bug、TDD、架構改善，到 Issue 管理、PRD 撰寫一條龍。部分 Skills 需在專案中先執行 `/setup-matt-pocock-skills` 初始化。

  

#### 溝通與壓縮

  

| Skill | 用途 |

|-------|------|

| `caveman` | 極簡輸出模式，省略填充詞和客套話，說「/caveman」或「少廢話」觸發 |

| `zoom-out` | 告訴 AI 往上一層看：列出相關模組、呼叫者、依賴圖 |

| `find-skills` | 搜尋並推薦可安裝的 Skills |

  

#### 診斷與開發

  

| Skill | 用途 |

|-------|------|

| `diagnose` | 嚴格診斷流程：重現 → 最小化 → 假設 → 驗測 → 修復 → 回歸測試 |

| `tdd` | TDD 紅綠重構循環，強調透過公開介面驗證行為（不測實作細節）|

| `context7-mcp` | 查詢任意函式庫/框架的最新文件，避免依賴過時訓練資料 |

| `improve-codebase-architecture` | 找架構優化機會（深化模組、提高可測試性與 AI 可導航性）|

  

#### 設計討論

  

| Skill | 用途 |

|-------|------|

| `grill-me` | 對你的計畫進行無情提問，逐步走完決策樹 |

| `grill-with-docs` | 結合專案 CONTEXT.md 和 ADR 的設計 Grilling，決策結晶後更新文件 |

  

#### Issue / PRD 管理

  

| Skill | 用途 |

|-------|------|

| `to-issues` | 把計畫/規格拆解成獨立可執行的 Issue（縱向切片）|

| `to-prd` | 從當前對話脈絡自動生成 PRD |

| `triage` | 透過狀態機流程管理 Issue 分類 |

| `write-a-skill` | 建立新 Skill，含結構、漸進式揭露、打包資源 |

| `setup-matt-pocock-skills` | 初始化腳本：在專案建立 AGENTS.md 區塊和 docs/agents/，供上述 Skills 讀取 Issue Tracker 設定 |

  

---

  

### ConardLi Garden Skills（4 個）

  

來源：[ConardLi/garden-skills](https://github.com/ConardLi/garden-skills)

  

| Skill | 用途 |

|-------|------|

| `gpt-image-2` | 圖片生成：海報、Mockup、信息圖，支援多種執行模式，OpenAI 相容 API |

| `kb-retriever` | 本地知識庫查詢：在 Markdown/TXT/PDF/Excel 階層文件中提取證據，不塞爆 context |

| `web-design-engineer` | 將 AI 生成的 web artifact 升級為精緻前端：版型、動畫、互動原型，結構化設計工作流 |

| `web-video-presentation` | 把文章/腳本轉為 16:9 可點擊網頁簡報，最佳化螢幕錄製輸出為影片 |

  

---

  

### NotebookLM（1 個）

  

| Skill | 用途 |

|-------|------|

| `notebooklm-skill` | 從 Claude Code 直接查詢 Google NotebookLM 筆記本，獲得有引用來源的 Gemini 回答，大幅降低幻覺 |

  

**觸發：** 說「查 NotebookLM」、「從我的筆記本找答案」

  

---

  

### kepano Obsidian Skills（5 個）

  

來源：[kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)

  

| Skill | 用途 |

|-------|------|

| `obsidian-markdown` | Obsidian 風格 Markdown：callout、內嵌、wikilink、front matter 語法 |

| `obsidian-bases` | Obsidian Bases（資料庫視圖）：建立、查詢、管理屬性與過濾條件 |

| `json-canvas` | 建立和操作 JSON Canvas（.canvas）無限畫布檔案 |

| `obsidian-cli` | 透過 obsidian-cli 與 Obsidian vault 互動：搜尋、讀寫筆記 |

| `defuddle` | 網頁內容擷取清洗：移除廣告/導覽，提取純文章 Markdown |

  

需要：Google 帳號瀏覽器登入狀態

  

---

  

### Termdock（2 個）

  

| Skill | 用途 |

|-------|------|

| `termdock-ast` | 查詢 AST Index：找符號位置、依賴、呼叫者，重構前影響分析 |

| `termdock-terminal-api` | 透過 Termdock Terminal API 控制 raw 終端機或 agent session |

  

**觸發：** 說「哪裡定義了 X」、「誰呼叫了這個函式」時自動用 `termdock-ast`；無直接終端機工具時用 `termdock-terminal-api`

  

---

  

### claude-mem（記憶系統，8 個）

  

來源：[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

  

這是一個完整的 Plugin（不只是 Skills），包含：Worker Service（port 37777）、SQLite 記憶庫、自動 Hooks、以及 8 個 Skills。

  

**架構：** Hooks 在背景自動記錄工具使用和工作流程，跨 session 可查詢歷史。

  

| Skill | 用途 |

|-------|------|

| `mem-search` | 搜尋過去的工作記憶，問「之前怎麼做的」自動觸發 |

| `make-plan` | 建立分階段實作計畫（帶文件探索） |

| `do` | 執行 make-plan 產出的計畫，協調 subagent |

| `knowledge-agent` | 知識圖譜管理，儲存和查詢結構化知識 |

| `smart-explore` | 智慧探索程式碼庫，找相關檔案和脈絡 |

| `pathfinder` | 路徑尋找，找依賴關係和呼叫鏈 |

| `timeline-report` | 產生工作時間線報告 |

| `version-bump` | 版本號管理 |

  

**Hooks 觸發時機：**

  

| Hook | 時機 | 動作 |

|------|------|------|

| Setup | Claude Code 啟動時 | 確認依賴已安裝 |

| SessionStart | 每次開始新 session | 啟動 Worker，注入歷史記憶 |

| UserPromptSubmit | 每次送出 prompt | 初始化 session 記錄 |

| PreToolUse (Read) | 讀取檔案前 | 注入檔案相關記憶 |

| PostToolUse | 每次工具使用後 | 記錄觀察 |

| Stop | session 結束時 | 摘要本次工作 |

  

**Plugin 位置：** `C:\Users\sanyo\.claude\plugins\marketplaces\thedotmack\`

**Bun 位置：** `C:\Users\sanyo\.bun\bin\bun.exe`（v1.3.13）

  

---

  

## 已安裝的 Marketplace

  

Marketplace 是 Plugin 的分發機制，讓你透過 `/plugin install` 安裝他人發布的 Plugin。

  

| Marketplace | 來源 | 說明 |

|-------------|------|------|

| `claude-plugins-official` | anthropics/claude-plugins-official | Anthropic 官方 Plugin 目錄 |

| `thedotmack` | thedotmack/claude-mem | claude-mem Plugin |

| `sanyoii` | [sanyoii/claude-skills](https://github.com/sanyoii/claude-skills) | 個人 Skills 分享（公開） |

  

**自訂 Marketplace 位置：** `d:\Claude\my-marketplace\`（Junction 連結至 user-level）

**公開 GitHub Repo：** https://github.com/sanyoii/claude-skills

  

### 安裝方式（給其他人）

  

```

# 加入 Marketplace

/plugin marketplace add sanyoii/claude-skills

  

# 安裝任一 Plugin 群組

/plugin install chinese-arts@sanyoii

/plugin install design-tools@sanyoii

/plugin install dev-workflow@sanyoii

/plugin install ai-agents@sanyoii

/plugin install google-cloud@sanyoii

```

  

### Plugin 群組一覽

  

| Plugin | Skills 數 | 說明 |

|--------|-----------|------|

| `chinese-arts` | 7 | 八字、紫微斗數、奇門遁甲、歸藏 PPT、女媧、SSC |

| `design-tools` | 13 | 花叔 Design、前端 UI、canvas/演算法藝術、DOCX/XLSX/PDF/PPTX、gimp-inkscape |

| `dev-workflow` | 29 | TDD、debugging、code review、recursive-mode、git worktrees、skill creator |

| `ai-agents` | 10 | Claude API、Gemini API、subagent 編排、make-plan/do、pathfinder |

| `google-cloud` | 12 | BigQuery、Cloud Run、GKE、Firebase、Vertex AI、WAF 指引 |

  

新增 Skill 到自訂 Marketplace：

1. 在 `d:\Claude\.claude\skills\<skill-name>\` 建立 `SKILL.md`

2. 將 skill 目錄複製到 `d:\Claude\my-marketplace\plugins\<group>\skills\<skill-name>\`

3. 更新 `d:\Claude\my-marketplace\.claude-plugin\marketplace.json`（若需新 group）

4. Commit → Push → `sanyoii/claude-skills` 自動更新

  

---

  

## 已安裝的 Commands

  

Commands 位置：`C:\Users\sanyo\.claude\commands\`

  

使用方式：在對話中輸入 `/指令名稱`

  

### 原有指令（2 個）

| Command | 用途 |
|---------|------|
| `/threads-to-fb` | 將 Threads 貼文轉換為繁中 Facebook 貼文（含格式、Emoji、Hashtag） |
| `/generate-cover` | 生成 1200×1200 社群封面圖（支援 Threads/X/LinkedIn/Reddit，深色/淺色版） |

### CCPlugins（12 個，2026-05-25）

來源：[brennercruvinel/CCPlugins](https://github.com/brennercruvinel/CCPlugins)

| Command | 用途 |
|---------|------|
| `/review` | 多 subagent 全面 code review（安全/效能/品質/架構） |
| `/security-scan` | 安全漏洞掃描，有 session 記憶可 resume |
| `/predict-issues` | 預測未來潛在問題（複雜度、效能、維護性） |
| `/refactor` | 系統性重構，有 session 記憶，每步驟自動驗證 |
| `/implement` | 從 URL/路徑/描述實作功能，有 session 記憶 |
| `/understand-project` | 分析整個專案架構，輸出架構圖與關鍵元件說明 |
| `/scaffold` | 依照現有專案模式生成新功能骨架 |
| `/commit` | 智慧 git commit，生成 conventional commit 訊息 |
| `/session-start` | 開始工作階段，記錄目標到 CLAUDE.md |
| `/session-end` | 結束階段，總結完成事項與待辦 |
| `/undo` | 還原上一個操作（git 或 project backup） |
| `/todos-to-issues` | 掃描代碼 TODO 並建立 GitHub Issues |

### Understand Anything Plugin（8 個 Skills，2026-05-25）

來源：[Lum1104/Understand-Anything](https://github.com/Lum1104/Understand-Anything)
Plugin 位置：`C:\Users\sanyo\.claude\plugins\marketplaces\understand-anything\`

| Skill | 用途 |
|-------|------|
| `/understand` | 主分析：多 agent 掃描專案，建立知識圖譜（支援 --language zh-TW） |
| `/understand-dashboard` | 開啟互動式 Web Dashboard，視覺化探索架構 |
| `/understand-chat` | 用自然語言問任何關於 codebase 的問題 |
| `/understand-diff` | 分析當前改動影響到哪些地方（code review 前用） |
| `/understand-explain` | 深度解釋特定檔案或函式 |
| `/understand-onboard` | 為新成員生成 onboarding 指南 |
| `/understand-domain` | 提取業務邏輯（domains/flows/steps） |
| `/understand-knowledge` | 分析 Karpathy 風格 wiki 知識庫 |

### Claude Code Action（GitHub Actions）

在 GitHub PR/Issue 留言 `@claude` 即可呼叫 Claude 自動處理。已設定於 `sanyoii/claude-setup`。
需在 GitHub Secrets 設定 `ANTHROPIC_API_KEY`。

---

## 操作建議：按任務選工具

### 📦 評估 / 探索陌生 Repo

| 需求 | 做法 |
|------|------|
| 快速判斷值不值得裝（幾秒） | 直接說「用 /repomix-explorer 分析 https://github.com/user/repo」 |
| 深入理解架構（幾分鐘，有 Dashboard） | 「幫我把這個 repo clone 到暫存，再用 /understand 分析」 |

> **建議流程：先 repomix 篩選，有興趣再 clone + understand 深入。**

---

### 💻 日常開發工作流

```
/session-start   ← 開始前說明今天目標，Claude 記錄到 CLAUDE.md
/implement       ← 描述需求或貼 URL，Claude 幫你實作
/understand-diff ← commit 前確認改動影響範圍
/review          ← 全面 code review（安全/效能/架構）
/commit          ← 自動生成 conventional commit 訊息
/session-end     ← 記錄完成事項和待辦，下次繼續
```

> 複雜、跨多天的任務：改用 `Recursive Mode`（`Implement the run`），強制 7 個 phase，跨對話保持上下文。

---

### 🔧 各程式使用時機

| 程式 | 何時用 | 快速啟動 |
|------|--------|---------|
| **Claude Code Router** | 要省 token 或測試 Gemini 路由時 | `ccr code`（替代 `claude`） |
| **Repomix** | 讓 AI 讀整個 codebase，或打包給外部分析 | `/repomix-explorer` 或 `repomix --remote user/repo` |
| **Social Monitor** | 已自動 10:30/22:00 執行，要手動跑時 | `cd d:\Claude\social-monitor && python run.bat` |
| **Job Crawler** | 查看最新職缺、追蹤申請狀態 | `cd d:\Claude\job-crawler && python app.py`（Flask UI at port 5000） |
| **CareerBot** | 草擬求職申請表、Why Us 答案 | `cd d:\Claude\careerbot`（⚠️ 需先執行 `/onboard`） |
| **HD Decode** | 讀取人類圖報告、查詢通道或中心說明 | `cd d:\Claude\hd-decode` |
| **Open Slide** | 製作 React 元件式投影片 | `cd d:\Claude\open-slide && npm run dev` |
| **AI Video Pipeline** | 全自動影片生成（⚠️ 需先申請 FAL_KEY） | `cd d:\Claude\ai-video-pipeline` |
| **AutoHedge** | Solana 鏈上自動對沖（⚠️ 真實資金） | `cd d:\Claude\autohedge-env && .\Scripts\Activate.ps1 && autohedge` |
| **Scrapling** | Python 網頁爬蟲，繞過 Cloudflare | `from scrapling.fetchers import Fetcher` |
| **OpenSpec** | AI 輔助需求規格管理，開始新功能前用 | `cd 專案 && openspec init`，再用 `/opsx:propose` |

---

### 🧠 Skills 按情境速查

**寫文件 / 格式轉換**
- `pdf` / `docx` / `pptx` / `xlsx` — 直接說「幫我把這個整理成 Word/PDF」
- `obsidian-cli` — 搜尋 vault、讀寫筆記、管理 Daily Note

**程式碼分析 / 理解**
- `/repomix-explorer` — 快速分析任何 repo（支援 URL）
- `/understand` → `/understand-dashboard` — 深度知識圖譜（需先 clone）
- `/understand-explain` — 解釋特定檔案或函式
- `/understand-chat` — 用自然語言問 codebase 任何問題

**開發流程**
- `/implement` — 從描述/URL/路徑實作功能
- `/scaffold` — 依現有模式生成新功能骨架
- `/refactor` — 系統性重構（有 session 記憶）
- `/commit` — 自動 conventional commit 訊息

**品質 / 安全**
- `/review` — 多 agent 全面 code review
- `/security-scan` — 安全漏洞掃描（可 resume）
- `/predict-issues` — 預測潛在問題
- `/understand-diff` — commit 前確認改動影響

**術數命理**
- `bazi` / `bazi-skill` — 八字命盤分析
- `ziwei-doushu` — 紫微斗數
- `qimen-dunjia` — 奇門遁甲
- `nuwa-skill` / `huashu-design` — 女媧術數 / 花術設計

**視覺 / 設計**
- `mermaid-visualizer` — 流程圖、架構圖、時序圖（Mermaid 語法）
- `excalidraw-diagram` — 手繪風格流程圖
- `algorithmic-art` / `canvas-design` — 生成藝術 / 視覺創作
- `json-canvas` — 編輯 Obsidian 畫布

**Obsidian 整合**
- `obsidian-cli` — 搜尋/讀寫/管理筆記
- `obsidian-markdown` — Wikilink、Callout、Frontmatter 語法
- `obsidian-bases` — 建立資料庫視圖
- `notebooklm-skill` — 查詢 NotebookLM Notebook 補充資訊

**AI 研究 / 資料擷取**
- `defuddle` — 從網址擷取乾淨 Markdown（省 token）
- `repomix-explorer` — 分析 GitHub repo 結構

---

  

## 目錄結構

  

```

d:\Claude\

├── claude.exe                  # Claude Code 執行檔

├── README.md                   # 本說明檔

├── settings.json               # Claude Code 設定（含 enabledPlugins）

├── open-design\                # Open Design 設計工具

├── ai-website-cloner\          # AI 網站克隆工具

├── autohedge-env\              # AutoHedge 虛擬環境（含 .env 設定）

│                               # Scrapling 安裝於全域 Python（直接 import 使用）

│                               # OpenSpec 安裝於全域 npm（openspec 指令）

├── hindsight\                  # Hindsight 記憶系統（部分可用：retain ✅ recall ⚠️）

├── my-marketplace\             # 個人 Skill Marketplace（可推 GitHub 分享）

│   ├── .claude-plugin\

│   │   └── marketplace.json

│   └── skills\                 # 放你的 SKILL.md 檔

├── .claude\

│   └── skills\                 # 本目錄的 Skills 副本

├── Skill_origin\               # Skills 原始 zip 檔（含 claude-mem-main）

├── plugins\                    # Plugin 資料夾

├── projects\                   # Claude Code 專案

├── sessions\                   # 對話記錄

├── history.jsonl               # 指令歷史

├── prompt_master_studio.html   # Prompt 工具頁面

└── prompt_master_studio_v2.html

```

  

全域 Skills 位置：`C:\Users\sanyo\.claude\skills\`（103 個）

全域 Commands 位置：`C:\Users\sanyo\.claude\commands\`（2 個）

claude-mem Plugin：`C:\Users\sanyo\.claude\plugins\marketplaces\thedotmack\`

個人 Marketplace：`C:\Users\sanyo\.claude\plugins\marketplaces\sanyoii\`（→ Junction → d:\Claude\my-marketplace\）