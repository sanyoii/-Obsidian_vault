---
source: "https://github.com/zhayujie/CowAgent"
author: "zhayujie (查宇杰)"
stars: "46K+"
clipped: 2026-07-27
tags:
  - "github/repo"
  - "ai-agent"
  - "agent-harness"
  - "personal-assistant"
  - "skills"
  - "mcp"
---

# CowAgent — chatgpt-on-wechat 改名後的開源個人 Agent Harness

> **zhayujie/CowAgent** | ⭐ 46,144 | 🍴 10,281 | 📝 MIT
> "Open-source super AI assistant & Agent Harness. Plans tasks, runs tools and skills, self-evolves with memory and knowledge. Multi-model, multi-channel. Lightweight, extensible, one-line install. (formerly chatgpt-on-wechat)"

---

## 一句話說明

CowAgent 是一個開源的「常駐型個人 AI 助理框架」——你把它裝在自己的電腦或伺服器上，它 24 小時待命，透過 Web 主控台或各種即時通訊軟體（Telegram / Slack / Discord / 微信 / 飛書 / 釘釘 / QQ⋯⋯）跟你對話，能自己規劃多步驟任務、呼叫終端機與瀏覽器操作你的電腦、安裝並執行 Skills、把對話沉澱成長期記憶與 Markdown 知識庫，還會在閒置時自我複盤來改進技能。它是 `chatgpt-on-wechat` 的同一個 repo 改名而來（2026-04-12 正式改名），定位對標 OpenClaw，但更輕量、部署更簡單。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 46,144 |
| Forks | 10,281 |
| 主要語言 | Python（3.32MB）＋ TypeScript/JavaScript（0.93MB，桌面版與 Web console） |
| 授權 | **MIT**（可商用、可修改，無 copyleft 限制） |
| 建立時間 | 2022-08-07 |
| 最後推送 | 2026-07-26（分析當日仍在推） |
| Open Issues | 17（另有 10 個 open PR；已關閉 issue **2,147** 件） |
| 最新 Release | `2.1.4`（2026-07-20） |
| Topics | ai-agent, harness, skills, mcp, multi-agent, claude, codex, claude-code, openclaw, chatgpt-on-wechat, deepseek, llm |
| 首頁 | https://cowagent.ai （文件站 https://docs.cowagent.ai） |
| 是否 Archived | 否 |

---

## 與 chatgpt-on-wechat 的關係（已實證，非推斷）

三項獨立證據確認**是同一個 repo 的原地演進，不是重寫也不是新專案**：

1. **repo ID 不變**：GitHub API 回傳 `created_at: 2022-08-07`，與 chatgpt-on-wechat 的建立時間一致；舊 URL `github.com/zhayujie/chatgpt-on-wechat` 自動 302 轉址到 CowAgent。
2. **改名 commit 可查**：2026-04-12 有一筆 `feat: rename repository name from chatgpt-on-wechat to CowAgent`，內容只改 README 徽章／文件連結／`run.sh` 與 `run.ps1` 的 clone URL，**並明寫「Docker image name (zhayujie/chatgpt-on-wechat) kept unchanged for compatibility」**。後續 2026-04-16 另有 `fix: update CI workflows for repo rename`。
3. **commit 歷史連續**：最早的 commit 是 `init: build minimum viable version`（2022），到 2023 年還能看到 `refactor: rename WechatComChannel to WechatComAppChannel` 這種微信時代的重構，跟今天的 `feat(grep): bundle ripgrep as the default backend` 在同一條線上。

**真正的斷代點不是改名，是 v2.0.0（2026-02-03）**——release note 寫「Major upgrade to a super Agent assistant with multi-step task planning, long-term memory, and the Skills framework」。也就是說：先做了架構級的產品轉向（1.x 聊天機器人 → 2.x Agent Harness），兩個月後才把名字改成能反映新定位的 CowAgent。

**對既有 cow 使用者的遷移意涵：**
- 只需 `git remote set-url origin https://github.com/zhayujie/CowAgent.git`，舊 URL 仍會轉址，不改也能用。
- Docker image tag 刻意沒改，`zhayujie/chatgpt-on-wechat` 繼續有效，docker-compose 使用者零動作。
- **真正的破壞性變更在 1.x → 2.x**：舊版的 `plugins/` 外掛體系已被 `skills/`（SKILL.md）＋`agent/tools/` 取代，工作區改成 `~/cow`（金鑰另放 `~/.cow`），config 從扁平 key 走向 `tools.*` 巢狀區塊。從 1.x 升級要當成換架構處理，不是 `git pull`。

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 681 |
| 總 Tokens | 773,732 |
| 壓縮模式 | 有（`--compress` + 排除圖片/dist/node_modules） |
| repo 磁碟大小 | 11.9 MB |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `channel/web/static/vendor/fontawesome/css/all.min.css` | 36,825 | 4.8% |
| `channel/web/chat.html` | 24,087 | 3.1% |
| `channel/web/web_channel.py` | 18,913 | 2.4% |
| `run.sh` | 15,460 | 2.0% |
| `channel/web/static/js/console.js` | 14,597 | 1.9% |

> Top 5 有 4 個屬於 Web console。前端資源（fontawesome / tailwind / highlight.js / d3）全部 **vendor 進 repo**、不走 CDN——這是刻意的離線友善設計，但也讓 repo 體積裡有相當比例是第三方壓縮檔。`run.sh` 高達 1.5 萬 token 顯示一鍵安裝腳本本身就是個小系統（環境偵測、Python 版本管理、服務註冊）。

---

## 核心功能

- **Agent 規劃迴圈**：`agent/protocol/agent.py` 的 `Agent` 類是核心，帶 `max_steps`（預設 config 30）、`max_context_tokens`（64000）、`max_context_turns`（30），跑「理解意圖 → 拆解計劃 → 逐步呼叫工具 → 更新記憶 → 回傳結果」的迴圈。有 `/compact`、`/clear` 這類上下文管理指令（跟 Claude Code 同型）。
- **三層長期記憶**：對話上下文（短期）→ 每日記憶（中期）→ `MEMORY.md`（長期）。底層是 **SQLite + FTS5**（`agent/memory/storage.py`），keyword 與向量混合檢索，且針對 CJK 特別寫了 trigram 分詞（涵蓋中日韓字元區段）。夜間跑 **Deep Dream** 把散落記憶蒸餾成長期條目。
- **個人知識庫**：與時間序的記憶互補，按主題把資訊整理成 Markdown wiki，自動維護索引與交叉引用，Web console 有互動式知識圖譜視圖（前端用 d3）。
- **Self-Evolution 自我演化**（v2.1.1 引入，預設關閉）：對話閒置 N 分鐘後，在**隔離的 agent** 中回顧該次對話，可以修改／新建 skill、補完未完成任務、回填漏記的記憶。有硬性 write-guard 限制只能改 workspace（內建 skill 受保護）、改檔前先備份、附 `evolution_undo` 工具可回滾。
- **Skills 系統**：`SKILL.md` + YAML frontmatter（`name` / `description` / `metadata`），目錄結構為 `skills/<name>/SKILL.md` + `scripts/` + `resources/`。可從 Skill Hub、GitHub repo、ClawHub、LinkAI、任意 URL 安裝。內建 `skill-creator`（對話式產生新 skill）、`knowledge-wiki`、`image-generation` 三個。
- **15 個內建工具**：`read` / `write` / `edit` / `ls` / `grep` / `bash` / `browser` / `web_fetch` / `web_search` / `vision` / `memory_search` / `memory_get` / `scheduler` / `send` / `env_config` / `evolution_undo`，外加 **原生 MCP**（stdio / SSE / Streamable HTTP，支援 OAuth 授權、熱重載、按需工具檢索）。
- **12 個訊息通道**：Web console（預設）、Telegram、Slack、Discord、微信、飛書、釘釘、企微機器人、企微應用、QQ、微信客服、微信公眾號。同一個 Agent 實例可同時服務多通道。
- **多模型路由**：chat / vision / 圖像生成 / ASR / TTS / embedding **六種能力可各自指定不同廠商**。支援 Claude、OpenAI、Gemini、DeepSeek、Qwen、GLM、豆包、Kimi、MiniMax、文心、MiMo、LinkAI 聚合、以及自訂 OpenAI 相容端點（本地模型可走這條）。
- **桌面版客戶端**：Electron + React + Vite + Tailwind（`desktop/`），macOS / Windows 皆有打包設定，後端 Python 用 PyInstaller 綁進去，開箱即用。

---

## 技術架構

```
                    ┌──────────────────────────────────────┐
   使用者訊息 ─────▶ │  Channels（12 種）                    │
   Web / TG / Slack │  channel/ ── Channel 抽象基底類        │
   Discord / 微信…  │  channel_factory.create_channel()     │
                    └──────────────┬───────────────────────┘
                                   │ 統一 Context / Reply 協定
                    ┌──────────────▼───────────────────────┐
                    │  Bridge 層                            │
                    │  bridge/agent_bridge.py               │
                    │  agent_initializer / event_handler    │
                    └──────────────┬───────────────────────┘
                                   │
        ┌──────────────────────────▼──────────────────────────────┐
        │  Agent Core（agent/）                                    │
        │  ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────────┐      │
        │  │protocol│ │ memory │ │knowledge │ │ evolution  │      │
        │  │(規劃迴圈)│ │SQLite+ │ │Markdown  │ │(閒置自我複盤)│      │
        │  │        │ │ FTS5   │ │ wiki     │ │            │      │
        │  └────────┘ └────────┘ └──────────┘ └────────────┘      │
        │  ┌──────────────────┐  ┌──────────────────────────┐     │
        │  │ tools/ (15 個)   │  │ skills/ (SKILL.md loader) │     │
        │  │ bash/browser/mcp │  │ Skill Hub / GitHub / URL  │     │
        │  └──────────────────┘  └──────────────────────────┘     │
        └──────────────────────────┬──────────────────────────────┘
                                   │
                    ┌──────────────▼───────────────────────┐
                    │  Models（models/）12+ 供應商           │
                    │  chat/vision/image/asr/tts/embedding  │
                    │  六能力可各自路由到不同廠商             │
                    └──────────────────────────────────────┘

   周邊：cli/（cow 指令）｜desktop/（Electron 客戶端）｜docker/｜docs/（三語 mdx）
```

| 層次 | 技術 |
|------|------|
| Agent Core | Python 3.9–3.13，無框架（不用 LangChain / LangGraph），手寫工具迴圈 |
| 記憶儲存 | SQLite + FTS5（含 UPSERT 版本偵測與舊版 fallback）、numpy 向量檢索 |
| 知識庫 | 純 Markdown 檔案 + 索引，前端 d3 畫知識圖譜 |
| Web Console | 單檔 `chat.html` + vanilla JS + vendor 進來的 Tailwind/highlight.js/markdown-it |
| 桌面版 | Electron + React 18 + TypeScript + Vite + Tailwind + Zustand（store/） |
| CLI | click，`cow start/stop/status/logs/update/skill/backup` |
| 部署 | 一行安裝腳本（bash / PowerShell）、Docker Compose、原始碼安裝 |
| 依賴 | **無外部資料庫、無 Redis、無向量資料庫**——requirements.txt 只有 ~20 個套件 |

**架構上值得注意的兩點：**

1. **Channel 抽象是乾淨的**。`channel/channel.py` 定義了 `startup()` / `handle_text()` / `send(reply, context)` 三個介面，`channel_factory.py` 是純 if-else 分派。要加一個新通道（比如 Threads、LINE），只要實作這三個方法，不需要碰 Agent Core。這是這個專案從 2022 年微信單通道長到 12 通道還沒爛掉的原因。
2. **Skill 格式跟 Anthropic Agent Skills 高度同構**。`agent/skills/frontmatter.py` 解析 `---` YAML frontmatter 取 `name` / `description`；`loader.py` 的探索規則是「子目錄裡有 SKILL.md 就當一個完整 skill、不再往下遞迴」。程式碼裡甚至明寫要拆解 `{"openclaw": {...}}` 或 `{"cowagent": {...}}` 的巢狀 metadata namespace——擺明是設計成**跨 harness 共用同一份 skill 檔**。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | zhayujie, lanvent, 6vision, Saboteur7, JS00000, resphinas, zwssunny, goldfishh, AaronZ345, jimmyzhuu | 有穩定核心圈，非一人專案 |
| 近 8 週 commit | 40 / 42 / 27 / 15 / 43 / 29 / 25 / 6 | **非常活躍**（週均約 28） |
| Release 頻率 | 2.0.5→2.1.4 共 10 版跨 2026-04 至 07 | **約每 2 週一版**，節奏極穩 |
| Issue open/close | 17 open / 2,147 closed | close ratio 極高，維護者確實在收 issue |
| Open PR | 10 | 未積壓 |

**維護品質的直接證據**（比星數更有說服力）：近期 commit 裡看得到「使用者回報 #2983 → 貢獻者送 PR 附 12 個測試 → 維護者 review 說 ToolManager 是通用層不該塞 bash 專屬邏輯 → 貢獻者砍掉多餘防禦、只留必要修正」這種完整的 code review 迴圈。也有 `fix(security): harden MCP client and write tool (#2968)` 這類主動安全加固。這是有紀律的維護，不是丟出來就不管。

---

## 社群口碑（資料極為有限，請看警語）

**⚠️ 誠實警告：這個 repo 的 46K 星幾乎不能當成 CowAgent 的採用度證據。**

- 星數是 **2022-08 起累積四年**的結果，絕大部分來自 `chatgpt-on-wechat` 時代——它當年是中文圈最紅的微信機器人專案。CowAgent 這個名字只存在 3 個多月（2026-04-12 起）。
- **Hacker News 完全零覆蓋**：Algolia API 查 `CowAgent` 與 `chatgpt-on-wechat` 均**無任何實際命中**（回傳的 8 筆全是 CogAgent / CoAgent / codagent.beehiiv.com 的模糊比對）。英文開發者社群基本上沒在討論這個專案。
- **WebSearch 找不到任何獨立實測**：搜尋結果全是 GitHub 本站頁面、Docker Hub 頁面、以及**鏡像 fork 的 README 轉述**（例如 `yeerhk/chatgpt-on-wechat` 直接複製了官方簡介）。沒有一篇第三方的部署心得、踩坑紀錄或負評。
- **小紅書路失敗**：`opencli xiaohongshu search` 回 `AUTH_REQUIRED`（登入牆），依既定規則試一次即跳過。
- **V2EX hot API 無輸出**，該路等同跳過。

**唯一可算「外部訊號」的**：Trendshift 徽章（repo #25763）——但那是流量榜單，不是使用者回饋。以及鏡像 repo 的簡介裡出現「比 OpenClaw 更輕量和便捷」這句自我定位，證明作者確實把 OpenClaw 當對標對象。

**結論**：可驗證的品質訊號**全部來自 repo 內部**（commit 紀律、issue close ratio、release 節奏、程式碼可讀性），這些是紮實的；但**外部第三方實測回饋接近於零**。中文專案的熱度常常是轉發報導堆出來的，這次連轉發報導都很少——它的真實使用者可能主要在微信社群裡，是搜尋引擎與 API 觸及不到的地方。判斷時請以程式碼證據為主，不要把星數當採用度。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | **概念高度重疊、實作互不相通。** CowAgent 的「個人知識庫」也是 Markdown wiki + 索引 + 交叉引用 + 圖譜視圖，跟本 vault 的 `wiki/` + `_index.md` + gbrain 幾乎是同一套設計哲學。但它讀寫自己的 `~/cow/knowledge/`，沒有 Obsidian vault 適配器。裝了等於**開第二個腦**，兩邊各記一半——這是最大的反對理由。 |
| **Claude Code** | **不是競品，是不同時態的工具。** Claude Code 是 session-based 的桌面開發工具；CowAgent 是 24/7 常駐、從 IM 收訊息的助理。功能上重疊的部分（工具迴圈、SKILL.md、MCP、`/compact`、三層記憶）多到像是同一套設計理念的另一個實作——**且 SKILL.md 格式相容**，理論上 `C:\Users\sanyo\.claude\skills\` 下的 skill 可以直接丟給 CowAgent 用（frontmatter 只吃 `name`/`description`，metadata namespace 會被拆解）。這是最有價值的可抽取點。 |
| **Automation** | 與 **social-monitor 幾乎不重疊**（CowAgent 沒有社群海巡能力，`web_search` 是問答式搜尋不是海巡）。與 **agent-reach 部分互補而非重疊**：agent-reach 是「抓取多平台內容進來」，CowAgent 的 channels 是「把對話送出去/收回來」——一個是讀，一個是收發。若真要整合，比較合理的形態是把 agent-reach 包成 CowAgent 的 skill，而不是取代它。scheduler 工具與現有 Windows 排程任務功能重疊。 |

### 是不是強綁微信 / 中國平台？

**通道層：不綁死。** 12 個通道裡有 6 個是中國平台（微信 ×3、飛書、釘釘、企微 ×2、QQ），但 **Web console、Telegram、Slack、Discord** 四條路完全可用，且 Web console 是**預設通道**——不接任何 IM 也能用。這點比預期好很多。

**但有兩處實質性的中國生態綁定：**

1. **`web_search` 工具的四個後端全是中國服務**：Bocha（博查）、智譜、百度千帆、LinkAI，程式碼裡的 fallback 順序註解寫明是「按中文即時性品質排序」。**沒有 Google / Brave / Tavily / DuckDuckGo 選項。** 台灣使用者要用內建網頁搜尋，得去申請中國廠商的 API Key（多半需要中國手機號實名）。這是繞不過去的——除非自己寫 skill 走 MCP 接別的搜尋。
2. **一鍵安裝腳本從 `cdn.link-ai.tech` 下載**（作者自家 CDN，非 GitHub Releases）。`bash <(curl -fsSL https://cdn.link-ai.tech/code/cow/run.sh)` 這種模式在台灣網路環境下速度未知，且從供應鏈角度是把安裝腳本的信任錨點放在單一非 GitHub 網域。**建議改走原始碼安裝或 Docker Compose。**

模型層則完全不綁：Claude / OpenAI / Gemini 都是一等公民，也支援自訂 OpenAI 相容端點。

**對台灣使用者的實際可用面：估計約 8 成。** 損失的是 6 個中國 IM 通道（本來就不用）＋內建 web_search（可用 MCP 或自寫 skill 替代）。核心的 Agent / 記憶 / 知識庫 / Skills / MCP / 桌面版全部照常運作。

### 有沒有可抽取的通用元件？

有，而且不只一個：

- **`channel/` 通道抽象**（最值得抄）：三方法介面 + factory 分派，是「同一個 agent 服務多個 IM」的乾淨參考實作。若日後想把 Claude Code 或 jobsmith 接上 Telegram，這是現成藍本。
- **`agent/skills/loader.py` 的探索規則**：「子目錄有 SKILL.md 就停止遞迴」這條規則解決了 skill collection 巢狀時子 skill 被誤列成頂層 skill 的問題——本環境 124 個 skills 的管理若遇到同類問題，這是直接可用的解法。
- **`agent/memory/storage.py` 的 CJK trigram 分詞**：SQLite FTS5 對中文分詞先天不良，這裡的處理（CJK 字元區段正則 + trigram token 化）是可直接移植的，對 gbrain / claude-mem 的中文檢索品質可能有參考價值。
- **`agent/evolution/` 自我演化子系統**：隔離 agent + workspace write-guard + 改檔前備份 + undo 工具 + 「只在真的改了檔才通知」的 no-nag 規則。這套安全設計比功能本身更值得讀——本環境若要做「自動改進 skill」，這是現成的風險控制範本。

### Windows 可用性

**意外地好，甚至可能是這個 repo 對本環境最大的驚喜。** 證據：

- `scripts/run.ps1` 一鍵安裝（PowerShell），PowerShell 程式碼佔 45KB。
- CI 有 `test-windows-bash.yml` 與 `release-win7.yml`（連 Win7 都打包）。
- 2026-07-26 剛 merge 的 commit：`refactor(desktop): bundle ripgrep on Windows only`、`fix(grep): correct Windows backend output and path separators`——維護者正在主動修 Windows 路徑分隔符問題。
- `bash` 工具有 `_convert_env_vars_for_windows()` 把 `$VAR` 轉成 `%VAR%`、長 `python -c` 指令寫成暫存腳本繞過 cmd.exe 命令列長度限制、以及 **cp936/GBK 編碼的 `UnicodeEncodeError` 處理**——這正是本環境反覆踩過的同一類坑（cp950/UTF-8）。
- 桌面版 `electron-builder.win.js` 獨立設定檔。

### 部署複雜度

**低。** 三條路：（1）一行安裝腳本（不建議，見上述 CDN 疑慮）；（2）**Docker Compose**（`docker compose up -d`，最乾淨）；（3）原始碼安裝 + `pip install -r requirements.txt`。

- **不需要外部資料庫**——記憶用 SQLite（檔案）、知識庫用 Markdown（檔案）、設定用 `config.json`。這是它敢自稱 lightweight 的實質原因。
- **不需要伺服器**——可以就跑在自己的電腦上，Web console 在 `localhost:9899`。要遠端存取才需要開 `web_host: 0.0.0.0` + `web_password` + 防火牆 9899 埠。
- **桌面版直接下載安裝包**，Python 後端已用 PyInstaller 綁進去，連 Python 環境都不用管。

### 授權狀態

**MIT**，已由 GitHub API 直接確認（`spdx_id: MIT`），且 README 免責聲明再次確認。可自由商用、修改、閉源衍生，只需保留授權聲明。**無任何限制性條款**——與最近幾個評估過的 repo（ChronicleCore 禁衍生、swarm-forge 無 LICENSE）相比，這點乾淨得多。

### 安全風險（必須明講）

1. **`bash` 工具的封鎖清單是刻意做最小的**——程式碼註解直言「Keep the blocklist minimal so the agent retains maximum freedom」，只擋「絕對災難性」的指令，其餘全放行。README 免責聲明第 2 條也承認「The Agent has access to your local operating system, so only deploy it in trusted environments」。
2. **Self-Evolution 會自動改你的檔案**（預設關閉，有 workspace 圍欄 + 備份 + undo，但仍是自動寫入行為）。
3. **Skill 可從任意 URL / GitHub 安裝**，跟 Claude Code skill 的供應鏈風險同型——安裝前應逐字讀過 SKILL.md（本環境已有此 SOP）。
4. 若要遠端存取 Web console，`web_password` 是唯一保護，沒有 OAuth / 2FA。

---

## 安裝建議

### ⏳ 觀望

**理由（三條，按權重）：**

1. **知識庫功能與 Obsidian vault 正面衝突。** CowAgent 的知識庫寫進 `~/cow/knowledge/`，跟本 vault 的 `wiki/` 是同一件事的兩個副本。裝了要嘛關掉它的知識庫（那就損失一半賣點），要嘛接受兩套知識分裂——這違反「一套系統跑全場」的既有原則（R13：加複雜度換小改善→不做）。
2. **真正的增量只有「常駐 IM 助理」這一格，而這一格目前沒有明確需求。** 工具迴圈、SKILL.md、MCP、三層記憶、`/compact`——這些 Claude Code + claude-mem 全都有。唯一補位的是「人在外面用手機從 Telegram 指揮電腦上的 agent」，這個場景目前沒被提出過。
3. **外部驗證訊號接近零。** HN 零覆蓋、無第三方實測、社群討論多半在觸及不到的微信群。程式碼品質看起來很好，但「看起來很好」不等於「跑三個月沒炸」。

**但它有兩個明確的可用點，即使不整套裝也有價值：**
- 📌 **原始碼可直接讀**：`channel/` 通道抽象、`agent/skills/loader.py` 探索規則、`agent/memory/storage.py` CJK 分詞、`agent/evolution/` 的安全圍欄設計，四段都是可移植的具體參考。
- 📌 **Skill 格式相容**：既有 Claude skills 理論上可直接跑在 CowAgent 上，若哪天真要試裝，遷移成本極低。

---

### ✅ 升級條件（發生任一 → 改成裝）

1. **出現明確的「離開電腦仍需指揮 agent」需求**——例如求職期間要在通勤時查 jobsmith 狀態、或社群海巡結果要即時推播到 Telegram。這是 Claude Code 結構上做不到的，CowAgent 是現成解。
2. **CowAgent 出現 Obsidian vault 適配器**（原生支援指定外部 vault 路徑當知識庫），知識分裂問題消失，那就從「開第二個腦」變成「給既有的腦加一張嘴」。
3. **`web_search` 加入非中國後端**（Tavily / Brave / DuckDuckGo 任一），最後一個實質的生態綁定解除。
4. **出現至少 2 篇可信的第三方長期實測**（非轉述型媒體、有具體踩坑紀錄），外部驗證缺口補上。

### ❌ 放棄條件（發生任一 → 直接判不裝、從觀望清單移除）

1. **release 節奏斷檔 ≥ 3 個月**（目前約 2 週一版）或 open issue 數翻倍到 50+ 而 close ratio 明顯惡化——代表 v2.x 的重構耗盡了維護動能。
2. **爆出 skill 供應鏈事件或 `bash` 工具導致的實際資料損失案例**——考慮到封鎖清單刻意做最小 + Self-Evolution 自動寫檔，這是結構性風險而非假設性風險。
3. **Windows 支援退化**（例如桌面版改成 macOS-only、或 Windows CI 移除）——目前的 Windows 投入是它相對本環境的關鍵優勢，這個優勢沒了就沒有裝的理由。
4. **本環境自建出等效的 IM 常駐層**（例如把 agent-reach + Claude Code 用 Telegram bot 串起來），那 CowAgent 的唯一增量消失。

**復查時機建議**：2026-10 月（約 3 個月後），或上述任一條件觸發時。

---

## 相關連結

- [[Github/repos/cua — 跨 OS 電腦操作 Agent 基礎設施（driver／sandbox／bench）|cua]] — 同為「讓 agent 操作電腦」方向，但 cua 是底層 driver／sandbox 基礎設施，CowAgent 是完整的終端使用者產品
- [[Github/repos/DeepTutor — 港大開源的 Agent 原生個人化學習工作站|DeepTutor]] — 同樣有「多層記憶 + 知識庫 + Obsidian 相關」的設計，且同樣面臨「替換而非補位」的問題
- [[Github/repos/activeloopaiHivemind — 跨 AI Coding Agent 共享記憶與 Skill 系統|Hivemind]] — 跨 agent 共享 skill／記憶的另一種解法
- 相關生態：[cow-skill-hub](https://github.com/zhayujie/cow-skill-hub)（開放 skill 市集，宣稱同時支援 CowAgent / OpenClaw / Claude Code）、[bot-on-anything](https://github.com/zhayujie/bot-on-anything)（同作者的輕量 LLM 應用框架）、[AgentMesh](https://github.com/MinimalFuture/AgentMesh)（多 agent 協作框架）
- 官方：[cowagent.ai](https://cowagent.ai/) · [docs.cowagent.ai](https://docs.cowagent.ai/) · [skills.cowagent.ai](https://skills.cowagent.ai/)

---

## 分析方法與限制（誠實揭露）

**已執行：** GitHub REST API（metadata / contributors / releases / commits / commit_activity / issue 統計）、Repomix（`--compress`，681 檔 / 773K tokens）、Jina Reader 抓官方架構文件、WebSearch ×2、HN Algolia API ×2、V2EX hot API、opencli 小紅書 ×1。

**未執行或失敗：**
- `defuddle` 未嘗試（本 session 已知連續失敗），直接走 Jina 備援。
- 小紅書 `AUTH_REQUIRED`（登入牆），依規則試一次即跳過。
- V2EX hot API 無輸出，該路等同跳過。
- Exa / mcporter 已知損壞，未嘗試。
- YouTube 教學訊號（Phase 4.5）**未執行**。
- **未實際安裝或執行過 CowAgent**。所有關於「能不能跑」「跑起來如何」的判斷都是**基於原始碼與文件的推論**，不是實測。Windows 支援的評估來自 CI 設定、PowerShell 腳本與 commit 訊息，不是本機跑過。
- README 宣稱的功能（如 Deep Dream 蒸餾品質、Self-Evolution 實際效果、知識圖譜可用性）**未經驗證**，僅確認對應程式碼存在。
