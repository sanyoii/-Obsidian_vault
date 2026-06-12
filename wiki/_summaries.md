# 文章摘要總覽

> 最後更新：2026-06-03

---

## [[Claude/Command Center Plugin — Obsidian 指揮中心|Command Center Plugin — Obsidian 指揮中心]]
**標籤：** `#Claude` `#系統` `#obsidian` `#automation` `#plugin` `#dashboard`
**摘要：** 自製 Obsidian Plugin（v3）。5 個 Ribbon 按鈕 + 主內容區 Dashboard Tab。Dashboard 為 2×2 grid：GitHub Trending（點擊 repomix 分析→wiki）/ Hacker News（點擊開原文）/ Product Hunt Daily（GraphQL API）/ Lobsters Hottest（免認證 JSON）。資料橋接腳本 fetch-dashboard-data.ps1 彙整四大來源 + 職缺/社群/token 估算到 dashboard.json，Plugin 每 30 秒自動刷新。字型使用 Obsidian CSS 變數。
**最後更新：** 2026-06-03（v3）

## [[Claude/Obsidian Dashboard 路線圖|Obsidian Dashboard 路線圖]]
**標籤：** `#Claude` `#系統` `#obsidian` `#dashboard` `#roadmap`
**摘要：** Phase 0–4a 全部完成（2026-06-03）：Ribbon ✅、Bases ✅、Plugin Panel 2×2 grid ✅、Google Calendar ✅、Email Brief ✅（Emergency/High/Med/Low 四級，todo 萃取，略過 newsletter）。Phase 4b 待做：職缺操作/Careerbot/社群趨勢/Token 精確版。
**最後更新：** 2026-06-03（Phase 4a Email Brief 完成）

---

## [[Github/留看repos/已整理/Madison-de-Chao-rainbow-sanctuary-report-site — 命理解讀報告銷售落地頁|Rainbow Sanctuary — 命理解讀報告銷售落地頁]]
**標籤：** `#nextjs` `#landing-page` `#ziwei` `#astrology` `#human-design` `#reference`
**摘要：** Next.js 15 單頁網站，銷售《全方位命理解讀報告》（紫微×八字×占星×人類圖，以「人生羅盤」為中樞）。三階定價 1680/2880/3980，內容全部 `data/*.json` 驅動。非排盤引擎，純行銷落地頁，與「命運羅盤」專案主題高度重疊，頁面架構可參考。
**來源：** https://github.com/Madison-de-Chao/-
**建立：** 2026-06-12

---

## [[Github/留看repos/已整理/itsfatduckoptimizerDuck — Windows 系統最佳化工具|optimizerDuck — 免費開源 Windows 系統最佳化工具]]
**標籤：** `#tool` `#windows` `#optimization` `#wpf` `#dotnet`
**摘要：** 免費開源 Windows 優化工具，30+ 個調整項（效能/隱私/GPU/電源/Bloatware/UX），每項附風險評級，全部可一鍵復原。WPF/.NET 10，不需安裝直接跑 exe。內附完整 Claude Code/Codex/Gemini 開發 skills（10 個），.resx 本地化含繁中。
**來源：** https://github.com/itsfatduck/optimizerDuck
**建立：** 2026-05-26

---

## [[Github/留看repos/已整理/Renhuai123ziwei-doushu — 倪海夏天紀體系紫微斗數引擎|Renhuai123/ziwei-doushu — 倪海夏《天紀》體系排盤引擎]]
**標籤：** `#ziwei` `#astrology` `#nextjs` `#dataset` `#enhancement-target`
**摘要：** 倪海夏《天紀》體系 Next.js 紫微斗數 App，最大價值：1100+ 行格局知識庫 patterns.ts、三部古籍原文（骨髓賦/全集/全書）、名人命盤資料庫、51.8 萬條命盤樣本數據（5.5GB，可 RAG/fine-tune）。與 ruijayfeng/ziwei 互補，enhancement 路線圖已列出。
**來源：** https://github.com/Renhuai123/ziwei-doushu
**建立：** 2026-05-26

---

## [[Github/留看repos/已整理/ruijayfengziwei — 現代化紫微斗數命盤分析工具|紫微知道 — 紫微斗數命盤分析工具]]
**標籤：** `#tool` `#ziwei` `#astrology` `#react` `#installed`
**摘要：** React 19 + TypeScript + Vite 的紫微斗數 Web App，本機已安裝於 `d:\Claude\ziwei`，`npm run dev` 跑在 localhost:5173。功能含精準排盤（iztro）、AI 命盤解讀（支援 Claude/DeepSeek/Gemini）、年度運勢、雙人合盤、人生 K 線、分享卡片。
**來源：** https://github.com/ruijayfeng/ziwei
**建立：** 2026-05-26

---

## [[Claude/Karpathy 最高遵守原則 — AI 行為準則|Karpathy 最高遵守原則 — AI 行為準則]]
**標籤：** `#claude-code` `#principles` `#karpathy` `#guidelines`
**摘要：** 來自 Karpathy 對 LLM 編程行為觀察的四原則：思考在前、簡潔優先、精準修改、目標驅動執行。已套用至 CLAUDE.md（最高優先級）、建立 /karpathy-audit 定期審查命令。2026-05-26 首次合規審查結果：✅ 合格。
**來源：** https://github.com/multica-ai/andrej-karpathy-skills
**建立：** 2026-05-26

---

## [[Claude/18個改變一切的 Claude Code Settings|18 個改變一切的 Claude Code Settings]]
**標籤：** `#claude-code` `#settings` `#configuration` `#permissions` `#hooks`
**摘要：** 依 @Mnilax 文章逐一檢查並套用的 18 個設定：新增 permissions.deny（.env/secret/rm -rf/sudo 保護）、cleanupPeriodDays 180、branch-aware SessionStart hook、model 顯式指定、mcpServer enabled flag；附 cache_control 正確寫法與 API/Console 設定說明。
**來源：** @Mnilax on X — "18 Claude settings that change everything"
**建立：** 2026-05-26

---

## [[Claude/知識庫操作手冊|LLM 知識庫 — Claude Code 操作手冊]]
**標籤：** `#Claude` `#系統` `#操作手冊`
**摘要：** Vault 的 LLM 編譯器角色說明、raw/ 目錄結構、五個指令（/compile /query /lint /slide /search）與知識迴圈架構。
**來源：** CLAUDE.md
**建立：** 2026-05-08

---

## [[Claude/Claude環境操作手冊|D:\Claude 環境操作手冊]]
**標籤：** `#Claude` `#系統` `#環境` `#Skills` `#Ruflo`
**摘要：** D:\Claude 個人 Claude Code 環境完整文件：76 Skills 架構、Ruflo 多 Agent 指令、子專案（Open Design/AI Cloner/AutoHedge）、日常維護與重要路徑。
**來源：** D:\Claude\CLAUDE.md
**建立：** 2026-05-08

---

## [[課程總覽|課程總覽]]
**標籤：** `#課程` `#索引`
**摘要：** 水球軟體學院「軟體設計模式精通之旅」完整章節地圖，白段（Ch1-5）與黑段（Ch6-10）道館全覽。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[水球流OADP|水球流 OADP]]
**標籤：** `#方法論`
**摘要：** 疊代式開發框架，OOA → OOD → OOP → Pattern 循環，把無形領域知識轉化為高維護性程式碼。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[物件導向分析|物件導向分析 (OOA)]]
**標籤：** `#方法論` `#OOA`
**摘要：** 不考慮實作，透過單句分析萃取領域知識：點的萃取（物件/類別/屬性）、線的萃取（關係/基數）。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[物件導向設計|物件導向設計 (OOD)]]
**標籤：** `#方法論` `#OOD`
**摘要：** 用循序圖「先求跑」、再用最小知識原則「再求好」（封裝、解耦、萃取），按需套用設計模式。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[開閉原則|開閉原則 (OCP)]]
**標籤：** `#SOLID` `#OCP`
**摘要：** 對擴充開放對修改封閉，但應視為「力量」而非教條，只在主概念重要且有大量擴充需求時套用。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[依賴反轉原則|依賴反轉原則 (DIP)]]
**標籤：** `#SOLID` `#DIP`
**摘要：** 套用八成設計模式的底層邏輯，重構三步驟：封裝變動 → 萃取介面 → 委派注入。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[整潔架構|整潔架構 (Clean Architecture)]]
**標籤：** `#方法論` `#架構`
**摘要：** 兩大方針：封裝變化（同變的放一起）+ 單向穩定依賴（易變依賴穩定）。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[策略模式|策略模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 處理「原始型」行為變動，外部動態注入演算法，OCP + DIP 的最直接實踐，入門模式。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[樣板方法|樣板方法]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 父類別定義流程骨架，子類別實作變動步驟，控制反轉 (IoC) 的最基礎體現。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[責任鏈模式|責任鏈模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 處理「輸入比對型」行為變動，多個 Handler 串鏈，請求沿鏈傳遞至對應處理者。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[觀察者模式|觀察者模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 處理「響應式行為」，主體狀態改變時廣播通知所有已註冊的觀察者，事件系統的原型。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[指令模式|指令模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 將指令封裝為物件，解耦「操作」與「能力」，天然支援 Undo/Redo。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[狀態模式|狀態模式]]
**標籤：** `#行為型` `#設計模式`
**摘要：** 將物件各狀態的行為封裝為獨立類別，消滅龐大的 if/switch，是有限狀態機的 OO 實作。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[門面模式|門面模式]]
**標籤：** `#結構型` `#設計模式`
**摘要：** 提供簡單門面隱藏內部複雜度，是模組邊界劃分的核心工具。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[裝飾者模式|裝飾者模式]]
**標籤：** `#結構型` `#設計模式`
**摘要：** 物件組合動態疊加行為，解決繼承造成的「組合爆炸」，M 種功能不需要 2^M 個子類別。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[轉接器模式|轉接器模式]]
**標籤：** `#結構型` `#設計模式`
**摘要：** 解耦核心與外部依賴，讓介面不相容的類別合作，是 DIP 在外部依賴場景的具體工具。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08

---

## [[工廠方法|工廠方法]]
**標籤：** `#創建型` `#設計模式`
**摘要：** 將物件創建職責交給子類別，處理物件的生命週期約束，避免核心直接 `new` 具體類別。
**來源：** raw/notebooklm/2026-05-08_notebooklm_軟體設計模式精通之旅_overview
**建立：** 2026-05-08
