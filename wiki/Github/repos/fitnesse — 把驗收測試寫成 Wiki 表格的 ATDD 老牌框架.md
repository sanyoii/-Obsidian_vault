---
source: "https://github.com/unclebob/fitnesse"
author: "unclebob (Robert C. Martin / Object Mentor)"
stars: "2.1K"
clipped: 2026-07-25
tags:
  - "github/repo"
  - "qa"
  - "testing"
  - "atdd"
  - "java"
---

# fitnesse — 把驗收測試寫成 Wiki 表格的 ATDD 老牌框架

> **[unclebob/fitnesse](https://github.com/unclebob/fitnesse)** | ⭐ 2,125 | 🍴 709 | 📝 CPL 1.0
> "FitNesse -- The Acceptance Test Wiki"

## 一句話說明

FitNesse 是一台獨立跑起來的 wiki server，你在 wiki 頁面上用**表格**寫規格，那些表格**就是可執行的測試**。核心主張：驗收測試該由業務方/測試人員用他們看得懂的形式寫出來，程式設計師只負責把表格接到系統上的那層薄膠水（fixture）。2003 年由 Uncle Bob 與 Object Mentor 發起，是 ATDD 這個詞的原始載體之一。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 2,125 |
| Forks | 709（fork:star 33%，異常高——企業自建分支多） |
| 主要語言 | Java 3.55MB + JavaScript 1.08MB + SCSS 225KB |
| 授權 | **CPL 1.0**（Common Public License，弱 copyleft，非 MIT/Apache） |
| 建立時間 | 2008-12-06（GitHub；專案本身始於 2003） |
| 最後推送 | 2026-04-20（最後 commit 2026-03-13） |
| 最新 Release | v20251025（2025-10-25） |
| Open Issues / PRs | 101 / 14 |
| 首頁 | [fitnesse.org](http://fitnesse.org) |
| 規模 | 2,811 檔 / 1.2M tokens（--compress 後） |

## 核心功能

- **Wiki 即測試載體**：頁面用純文字表格寫測試，按「Test」直接執行，綠/紅染在儲存格上。
- **兩種測試引擎**：
  - **FIT**（2003 起，legacy）— HTML 表格 in/out
  - **SLIM**（主推）— 精簡 wire protocol，fixture 端只需薄 socket server，故各語言皆可寫 fixture（Java/C#/Python/Ruby/PHP…）
- **五類表格語意**（SLIM）：`DecisionTable`（真值表）／`ScriptTable`（逐步腳本，含 check / ensure / reject / show / note / `$symbol=`）／`QueryTable`・`OrderedQueryTable`・`SubsetQueryTable`（結果集比對）／`ScenarioTable`（可參數化重用子流程）／`TableTable`・`ImportTable`・`LibraryTable`
- **符號傳遞**：`$symbol=` 把一步輸出存成變數餵下一步，跨表格傳狀態。
- **JUnit 整合**：`FitNesseRunner` / `FitNesseSuite` 讓 wiki 測試被 CI 當一般 JUnit 跑，輸出 JUnit XML per page。
- **版本化**：wiki 頁存成檔案系統（`content.txt` + `properties.xml`），可進 git，與程式碼同 repo 同 review。
- **插件體系**：`PluginsLoader` + `PluginFeatureFactory`，可掛自訂 SlimTable、自訂比較器（`CustomComparatorRegistry`）、自訂認證。
- **單 jar 起跑**：`java -jar fitnesse-standalone.jar -p 8001` → `localhost:8001`，無需資料庫或應用伺服器。

### 決策表長相（官方 UserGuide 原文）

```
|should I buy milk                                              |
|cash in wallet|credit card|pints of milk remaining|go to store?|
|0             |no         |0                      |no          |
|10            |no         |0                      |yes         |
|10            |yes        |1                      |nope        |
```

fixture 只是 POJO：setter 對應輸入欄、無參 method 對應輸出欄（`goToStore()` ↔ `go to store?`）。人話欄名 → camelCase 方法名的轉換由 `Disgracer` 類別處理。

### 腳本表長相

```
| script | login dialog driver | Bob | xyzzy |
| login with username | Bob | and password | xyzzy |
| check | login message | Bob logged in. |
| reject | login with username | Bob | and password | bad password |
```

## 技術架構

```
瀏覽器 :8001
   ↓
FitNesse.java ── SocketService + ThreadPoolExecutor(5..maxWorkers)
   ↓
FitNesseExpediter → Responder 分派
   ├─ wiki/ (74 檔)        FileSystemPage → content.txt + properties.xml
   ├─ wikitext/ (82 檔)    自家 markup 解析 → HTML
   ├─ responders/ (79 檔)  edit / search / test / suite / refactor / versions
   ├─ authentication/(19)  basic / one-user / multi-user
   └─ testrunner/ (33 檔)  測試排程與批次
   ↓ 啟動被測系統（子行程）
testsystems/
   ├─ fit/     CommandRunningFitClient ── socket ── FIT fixture
   └─ slim/    SlimClient ── SLIM wire protocol ── SlimServer（任何語言）
        ├─ tables/      DecisionTable / ScriptTable / QueryTable / ScenarioTable …
        └─ converters/  25 個型別轉換器（表格字串 ↔ Java 型別）
   ↓
reporting/ (26 檔) → HTML 染色 + JUnit XML + 歷史紀錄
```

| 層次 | 技術 |
|------|------|
| Web/Server | 自寫 socket server（**無 Servlet 容器**）、自寫 HTTP 解析 |
| 儲存 | 純檔案系統（`FitNesseRoot/`），無資料庫，可進 git |
| 測試協議 | SLIM（自訂 wire protocol，跨語言）＋ FIT（HTML 表格，legacy） |
| 前端 | Bootstrap SCSS + CodeMirror + 少量 jQuery |
| 建置 | Gradle（bootstrap 式，內含 wrapper）、Java 11 toolchain、PIT 突變測試外掛 |
| CI | `FitNesseRunner` JUnit runner、JUnit XML per-page |

**架構觀察**：幾乎不依賴主流框架——無 Spring、無 Servlet API、HTTP 層自寫。`build.gradle` 開頭那段「拆成 fit / slim / common / networking 多模組」的註解至今仍是 TODO，結構債長期未動。`SlimServer` 明確標注 re-entrant「不得持有實例狀態」——這是它能 socket 服務多語言 fixture 的關鍵約束。

`FitNesseRoot/` 佔全 repo 1,318 檔（47%），全是 wiki 頁形式的使用手冊兼驗收測試套件——**文件即測試**，自己測自己。

## 社群健康度

- 維護早已交棒荷蘭社群（Arjan Molenaar、Fried Hoeben），**Uncle Bob 在貢獻者排名第 10**。
- 判讀為**維護模式**：定期發版（約半年至一年一版）、CI 仍綠，但功能演進停滯。
- 採用面：StackShare 上 FitNesse 32 stacks vs Robot Framework 345 stacks，約 1:10 落差。
- 教學生態成熟但停止生長：YouTube 最高觀看教學為 2012 年（10.9 萬），次高 2019 年（2.5 萬），近三年幾無新內容。

**正面**：業務方看得懂、規格與測試同一份、跨語言 fixture、單 jar 零安裝、wiki 頁進 git 可 review。
**負面**：自訂 wiki markup（非 Markdown）學習曲線、fixture 與表格命名耦合易脆、大型 suite 執行慢、UI 停在 Bootstrap 時代、新專案幾無人選、Stack Overflow 答案多為十年前。

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian Vault | 直接相關；決策表窮舉法可直接進 `wiki/QA/` 當手動測試設計工具，不需安裝 |
| Claude Code | 中度；SwarmForge `specifier` 產 Gherkin ≈ FitNesse 表格的後代。教 agent 寫驗收標準時，決策表比 Gherkin 更適合窮舉邊界值 |
| Automation | 低；Java 11 + Gradle + 常駐 server，與 Python/PowerShell/Node 棧無交集 |
| QA 定位 | **最高相關**；「測試設計權留在懂業務的人手上、程式設計師只提供 fixture 膠水」正是 ATDD 的工程化極致，面談談 BDD/ATDD 時能講 FIT→SLIM 演進與表格分類是有辨識度的答法 |

## 安裝建議

**⏳ 觀望**（拆兩件事看）

**不裝進環境：**
1. 技術棧不合 — Java 11 + Gradle + 常駐 server，與現有棧零交集
2. 市場已被取代 — Robot Framework 採用約 10 倍，Playwright/Cypress 吃 E2E、Cucumber 吃 BDD 敘事
3. 維護緩慢 — 2026 年至今 1 次 commit，101 issue 累積
4. CPL 1.0 弱 copyleft，商業整合前需看條款

**但值得低成本試玩（約 30 分鐘）：**

```
下載 fitnesse-standalone.jar → java -jar fitnesse-standalone.jar -p 8001 → localhost:8001
```

內建 UserGuide 本身即可執行測試套件，點下去看表格變綠變紅。對 QA 而言這是唯一能一眼看懂「規格即測試」的工具。

**零成本可帶走的三個概念：**
- **決策表窮舉法** — 布林/離散輸入畫真值表，每列一案例；Gherkin Scenario Outline 是它的後裔
- **fixture 是薄膠水** — 測試表達層與系統接線層分離，對應派工時「驗收條件」與「執行細節」分離
- **文件即測試** — FitNesse 47% 檔案既是手冊又是驗收測試；制度文件自帶可執行驗證即同一招

**升級條件（→ ✅）**：入職團隊實際在用 FitNesse 或 ATDD（Java/.NET 企業內部系統最可能）；或需要「規格即測試」的教學/工作坊現場 demo。
**放棄條件（→ ❌）**：連續 12 個月無 release（v20251025 已 9 個月）／QA 路線確定走 Playwright + API 測試不碰 Java 生態／三個核心概念寫進 `wiki/QA/` 後剩餘價值歸零。

## 相關連結

- [[Github/repos/swarm-forge — Uncle Bob 的 tmux 多 Agent 紀律協作平台|swarm-forge]] — 同作者，`specifier` 角色的 Gherkin 驗收規格是 FitNesse 表格的精神後裔
- [[QA/Bug記錄流程]] — 決策表窮舉法可併入測試案例設計
- 官方站：[fitnesse.org](http://fitnesse.org) · [User Guide](https://fitnesse.org/FitNesse/UserGuide.html)
- 比較參考：[StackShare FitNesse vs Robot Framework](https://stackshare.io/fitnesse/vs/robot-frame-work)
