# Obsidian Vault 更新紀錄

> repo：[sanyoii/-Obsidian_vault](https://github.com/sanyoii/-Obsidian_vault)（私人）
> 工具：Obsidian + obsidian-git plugin，自動同步至 GitHub

---

## 2026-06-03

**Command Center Plugin v3.1 — 新增 iThome RSS 全寬面板：**
- `scripts/fetch-dashboard-data.ps1`：新增 Section 9 iThome RSS 抓取（`https://www.ithome.com.tw/rss`，15 筆）
- `.obsidian/plugins/command-center/main.js`：新增 `renderiThome()` + ITHOME NEWS 全寬面板 HTML + 點擊事件
- `.obsidian/plugins/command-center/styles.css`：新增 `.cc-ithome-panel` 與 2 欄 grid 排版樣式
- `data/dashboard.json`：新增 `ithome` 陣列（rank/title/url/date/author）
- `wiki/Claude/Command Center Plugin.md`：更新版面圖示至 v3.1

**修正：**
- 刪除 Obsidian vault 左側欄亂碼資料夾（`D：Claudeobsidiandata`，U+F03A PUA 字元，意外建立的空資料夾）

---

## 2026-05-28

**更新 `wiki/Claude/Karpathy 最高遵守原則 — AI 行為準則.md`：**
- 新增「擴充規則（2026-05-28）」章節，加入 R8 / R10 / R12 三條規則
- 來源：文章《Karpathy's 4 CLAUDE.md rules cut Claude mistakes from 41% to 11%. After 30 codebases, I added 8 more》
- R8 寫之前先讀、R10 多步驟 Checkpoint、R12 失敗要大聲說
- 記錄未採用的 5 條及理由

**同步修改 `d:\Claude\CLAUDE.md`：**
- 全域行為規則從 63 行增加到 79 行

---

## 2026-05-15

**新增 wiki/Github/留看（13 個 repo）：**
- `CloakBrowser`：C++ 層級指紋修改的隱匿瀏覽器
- `GPT-Prompt-Hub/CLAUDE.md`：Claude 專用 Prompt Hub
- `LichAmnesia/gemini-evolve`：Gemini CLI 自我進化指令系統
- `LichAmnesia/lich-skills`：Lich Skills 合集
- `LichAmnesia/llm-engineering-handbook`：構建生產級 AI 副本教程
- `akseolabs-seo/cinematic-ui`：電影導演思維的 Web Design Skill
- `datawhalechina/hello-agents`：從零開始構建智能體教程
- `exo-explore/exo`：本地運行 frontier AI
- `mattpocockskills`：Real Engineers 的 Skills 合集
- `projectdiscovery/nuclei`：快速客製化漏洞掃描器
- `sanyoii/awesome-codex-skills`：Codex skills 精選清單
- `yamadashyrepomix`：Repomix — 將 repo 壓縮為 AI 友善單一檔案
- `zarazhangruifollow-builders`：AI builders digest — X + YouTube 重混
- AK-Threads-booster：數據驅動 Threads 寫文決策系統筆記

**更新：**
- `wiki/Github/留看/easychen/opc-methodology`：一人企業方法論筆記內容更新

---

## 2026-05-14

**新增 Clippings（1 篇）：**
- `Clippings/Nightmare-EclipseYellowKey YellowKey Bitlocker Bypass Vulnerability`：BitLocker Bypass 安全漏洞文章

**新增 wiki/Claude/Prompts（1 篇）：**
- `如何讓 Claude 一進來就懂公司`（@dreamwalkr.ai on Threads）

**新增 wiki/Github/留看（6 個 repo）：**
- `ParthJadhav/app-store-screenshots`：AI 驅動的 App Store 截圖生成器
- `Usagi-org/ai-goofish-monitor`：Playwright + AI 實現的閒魚多任務監控系統
- `Z4nzu/hackingtool`：All-in-One 駭客工具集
- `easychen/opc-methodology`：《一人企業方法論》第二版
- `roboflow/supervision`：可複用電腦視覺工具庫
- 不會設計也能做出專業級 App Store 截圖：AI 驅動截圖產生器（中文說明）

---

## 2026-05-13

### 備份 (2)
**新增 wiki/水球流軟體設計模式精通之旅（1 篇）：**
- `Christopher Alexander：設計模式 道館挑戰 - RPG`

### 備份 (1)
**新增 wiki/Claude（2 個文件）：**
- `Claude Code Skills 使用手冊.md`（965 行，含 103 Skills + 70+ Ruflo 命令完整說明）
- `Claude 環境說明.md`（D:\Claude 環境架構與日常維護指令）

**更新：**
- `obsidian-git` plugin 設定（`data.json`）

---

## 2026-05-10

**初次大量內容備份，新增：**

**Clippings（5 篇）：**
- `AiToEarn：幫你全網發內容、自動賺錢，已 9.3k Star`
- `Hermes Agent AI助理自主製作歌曲製作MV`
- `Using Claude Code The Unreasonable Effectiveness of HTML`
- `httpszero-native.dev Desktop Apps with Zig + WebView`
- `好的 AGENTS.md 等於免費換模型，寫錯了比沒文檔更糟`

**raw/assets：**
- `Pasted image 20260510021311.png`

**wiki/Claude/Prompts（3 篇）：**
- `Prompt 拆解 No.1 - 時尚說明文件`
- `Prompt 拆解 No.2 - 可愛打卡表`
- `Prompts for generating 可愛打卡表`

**wiki/Github/留看（14 個 repo）：**
- `KKKKhazix/khazix-skills`：數字生命卡茲克開源 AI Skills 合集
- `Shubhamsaboo/awesome-llm-apps`：100+ AI Agent & RAG apps
- `addyosmani/agent-skills`：Production-grade engineering skills for AI agents
- `cc-switch`：51K Star，讓 Agent 一鍵切換所有模型
- `crewAI/crewAI`：角色扮演自主 AI Agents 協調框架
- `farion1231/cc-switch`：跨平台 Claude Code 全合一桌面助理
- `langchain-ai/langgraph`：TypeScript 版彈性 Language Agent 圖形框架
- `mvanhorne/cli-printing-press`：API 秘密身份探索 + GOAT CLI 生成器
- `yikart/AiToEarn`：用 AI 賺錢
- `zhaooleе/ChromeAppHeroes`：Chrome 插件英雄榜中文說明書
- `wiki/Others/AI Learning Material`
- `wiki/Others/Free AI courses`

**設定更新：**
- `.claude/settings.json`
- `.obsidian/community-plugins.json`
- `obsidian-git` plugin 完整安裝（`main.js`、`manifest.json`、`styles.css`）

---

## 2026-05-10（Initial commit）

**建立 repo，連結 vault 至 GitHub：**
- 初次 commit：`Initial commit: link vault to Obsidian backup repo`
- 連結 remote：`https://github.com/sanyoii/-Obsidian_vault.git`
