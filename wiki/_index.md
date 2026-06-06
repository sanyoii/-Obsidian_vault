# 知識庫主索引

> 最後更新：2026-06-03
> 文章數量：151 篇
> 原始文件：持續累積中

---

## 快速導航

- [[_summaries|所有文章摘要]]
- [[_graph|概念連結圖]]
- [[log|操作日誌（Karpathy 模式）]]
- [[課程總覽|課程總覽（入口）]]

---

## 主題分類

### Claude

#### 系統
- [[Claude/知識庫操作手冊|LLM 知識庫 — Claude Code 操作手冊]] — /compile、/query、/lint、/morning、/slide、/search 指令集與知識迴圈 `#系統`
- [[Claude/Claude環境操作手冊|D:\Claude 環境操作手冊]] — Skills 76 個、Ruflo、子專案、日常維護指令 `#系統`
- [[Claude/Command Center Plugin — Obsidian 指揮中心|Command Center Plugin — Obsidian 指揮中心]] — 4 個 Ribbon 按鈕：Morning Briefing、Compile、Lint、Quick Capture；串接 social-monitor + job-crawler `#系統 #obsidian #automation`

#### Agent 設計
- [[Claude/Karpathy 最高遵守原則 — AI 行為準則|Karpathy 最高遵守原則 — AI 行為準則]] — 5 大原則，套用至 CLAUDE.md，/karpathy-audit 命令 `#agent-design #karpathy`
- [[Claude/Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則|Karpathy program.md Skill 設計哲學 — 讓 Agent 可靠工作的六個原則]] — CAN/CANNOT 邊界、單一指標、品味量化 if-then、baseline 先行、Checkpoint、三段式結構 `#agent-design #skills #karpathy`

---

### 軟體設計模式精通之旅（水球軟體學院）

#### 行為型模式
- [[策略模式|策略模式]] — 原始型行為變動，依賴反轉三步驟 `#行為型`
- [[樣板方法|樣板方法]] — 留同存異，控制反轉 (IoC) 基礎 `#行為型`
- [[責任鏈模式|責任鏈模式]] — 輸入比對型行為變動 `#行為型`
- [[觀察者模式|觀察者模式]] — 響應式行為，事件通知 `#行為型`
- [[指令模式|指令模式]] — 操作封裝，Undo/Redo `#行為型`
- [[狀態模式|狀態模式]] — 狀態驅動行為，FSM 基礎 `#行為型`

#### 結構型模式
- [[門面模式|門面模式]] — 簡化複雜介面，模組邊界 `#結構型`
- [[裝飾者模式|裝飾者模式]] — 動態疊加行為，解決組合爆炸 `#結構型`
- [[轉接器模式|轉接器模式]] — 介面轉換，隔離外部依賴 `#結構型`

#### 創建型模式
- [[工廠方法|工廠方法]] — 物件創建與生命週期管理 `#創建型`

#### SOLID 原則
- [[開閉原則|開閉原則 (OCP)]] — 對擴充開放，對修改封閉 `#SOLID`
- [[依賴反轉原則|依賴反轉原則 (DIP)]] — 八成設計模式的底層邏輯 `#SOLID`

#### 方法論
- [[水球流OADP|水球流 OADP]] — 疊代式物件導向開發框架 `#方法論`
- [[物件導向分析|物件導向分析 (OOA)]] — 單句分析，領域模型萃取 `#方法論`
- [[物件導向設計|物件導向設計 (OOD)]] — 循序圖，封裝解耦，模式套用 `#方法論`
- [[整潔架構|整潔架構 (Clean Architecture)]] — 封裝變化，單向穩定依賴 `#方法論`

#### 課程索引
- [[課程總覽|課程總覽]] — Ch 1–10 章節地圖與全模式索引

---

### AI Prompts 收藏庫

- [[AI-Prompts/_index|AI Prompts 收藏庫 — 統一索引]] — 旅遊插畫 + ChatGPT Image 2 爆款圖，依效果/標籤快速查詢，持續新增中 `#ai #prompts #image-gen`

---

### Tools（工具使用手冊）

- [[Tools/liteparse|LiteParse]] — 本地 PDF 解析工具（Rust/PDFium），`pip install liteparse`，CLI + Python API，支援批次轉換與截圖 `#tools #pdf`
- [[Tools/video-to-brain|影片轉文字 → gbrain]] — 課程影片批次轉錄 Markdown，Gemini API + gbrain import `#tools #video`
- [[Tools/gbrain-inbox|gbrain Inbox 快速匯入]] — Obsidian Inbox 一鍵 import + 移至 wiki/Ideas `#tools #gbrain`
- [[Tools/md-to-pdf|Markdown 轉 PDF]] — `#tools`
- [[Tools/cleanup-transcripts|清理逐字稿]] — `#tools`

---

### Github/Repos（已分析 Repos）

- [[Github/repos/Panniantong-Agent-Reach — AI Agent 互聯網感知層|Agent Reach — AI Agent 互聯網感知層]] — 17 平台 skills 腳手架（網頁/YouTube/Twitter/Reddit/小紅書/B站/微博/V2EX/雪球…），一句話安裝，零配置 8 頻道；✅ 適合安裝 `#skills #social-media #claude-code #mcp #internet`
- [[Github/repos/mvanhorn-last30days-skill — AI 多平台社群研究引擎|last30days-skill — AI 多平台社群研究引擎]] — `/last30days <主題>` 跨 Reddit/X/YouTube/TikTok/HN/Polymarket 等 10+ 平台平行搜尋，社群互動量排序；✅ 適合安裝 `#skills #research #social-media #claude-code`
- [[Github/repos/ECC — Claude Code harness-native 操作系統|ECC — Claude Code harness-native 操作系統]] — harness-native AI Agent 操作系統（Skills + Agents + Hooks + Rules），100+ skills，182K stars `#tool #claude-code #skills #hooks #agents`
- [[Github/repos/Headroom — AI Agent Context 壓縮層|Headroom — AI Agent Context 壓縮層]] — 自動壓縮 context window，減少 token 消耗 `#tool #claude-code #context`
- [[Github/repos/anthropicsknowledge-work-plugins|knowledge-work-plugins]] — Anthropic 官方知識工作 plugins 套件 `#anthropic #plugins`
- [[Github/repos/Stop-slop 寫作去除AI腔|Stop-slop 寫作去除AI腔]] — 去除 AI 生成文章的機器味 `#writing #ai`
- [[Github/repos/issue_tmp — GitHub Issue  PR 模板套件|issue_tmp — GitHub Issue / PR 模板套件]] — 繁體中文 9 種 Issue 表單 + PR 模板 `#github #templates`

---

## 如何新增知識

1. 用 Obsidian Web Clipper 剪報 → 存到 `Clippings/` 或 `Inbox/`
2. 手動將檔案移至 `raw/sources/`（或 NotebookLM 匯出放 `raw/notebooklm/`）
3. 在 Claude Code 輸入 `/compile`
4. 索引與 `log.md` 自動更新
