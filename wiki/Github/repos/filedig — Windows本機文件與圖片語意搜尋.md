---
source: "https://github.com/rupeshs/filedig"
author: "rupeshs"
stars: "30"
clipped: 2026-10-13
tags:
  - "github/repo"
  - "local-search"
  - "windows"
---

# filedig — Windows 本機文件與圖片語意搜尋

## 一句話說明

FileDig 是 Windows 桌面搜尋工具，讓人用內容描述找回筆記、文字 PDF 與照片。適合忘記檔名、仍記得內容的場景；目前建議 ⏳ 觀望，若要試用，先用可公開的小型資料夾，不要直接掃完整私人 Vault。本輪完成固定版本原碼研究，未安裝、下載模型或執行 App。

## 專案概覽

| 項目 | 數值 |
|---|---|
| Repository | rupeshs/filedig |
| Stars / Forks | 30 / 0，2026-10-13 GitHub REST API 快照 |
| 主要語言 | Rust；前端 TypeScript |
| 授權 | MIT；模型及 llama.cpp runtime 的授權需分開確認 |
| 建立時間 | 2026-10-11 15:33:58 UTC |
| 最後推送 | 2026-10-11 16:46:25 UTC |
| 固定版本 | `d88af733656b7429f87cfc1eb6295e42d48aeb2e` |
| 最新 Release | v0.1.0，2026-10-11 16:52:48 UTC；tag 與本次固定 SHA 相同 |
| Release 附件 | 僅 `FileDig.zip`，26,426,407 bytes；未下載或核對 binary |
| Open Issues / PRs | 0 / 0；issues API 無條目 |
| 貢獻者 / commits | 1 位 rupeshs / 6 個 commits |
| Topics | ai、rust、search、windows |
| 首頁 / Archived | 無獨立首頁 / false |

資料來源：[GitHub API](https://api.github.com/repos/rupeshs/filedig)、[固定原碼](https://github.com/rupeshs/filedig/tree/d88af733656b7429f87cfc1eb6295e42d48aeb2e)、[Release](https://github.com/rupeshs/filedig/releases/tag/v0.1.0)。數字是查詢當時快照，網頁快取可能不同。

## Repomix 深度分析

固定 SHA 的 codeload 已擷取至本次 workspace 的 `work/repo-intel/filedig-20261013/source/`，解壓後 43 個檔案。Repomix 1.18.1 使用 task-local npm-cache、tmp 與 XML，指定 `--no-gitignore`，避免外層 work ignore 隱藏來源；未壓縮，成功打包 22 個文字檔、37,765 tokens、138,056 字元。二進位圖片及預設排除檔未納入。Security check 無可疑檔案，不等於應用安全驗收。

| 最大檔案 Top 5 | Tokens | 佔比 |
|---|---:|---:|
| src/main.ts | 8,106 | 21.5% |
| src/styles.css | 5,287 | 14.0% |
| src-tauri/src/lib.rs | 5,168 | 13.7% |
| src-tauri/src/indexer.rs | 4,576 | 12.1% |
| README.md | 2,839 | 7.5% |

抽查範圍包括六份 Rust backend 檔、TypeScript UI、Cargo/package lock、Tauri 設定、portable 包裝腳本與 README。未建立 AST 索引，結構判讀來自原碼讀取。

## 核心功能

| 功能 | 原碼確認的行為 |
|---|---|
| 混合搜尋 | 本機 embedding 語意排名與 SQLite FTS5 keyword 排名，以 RRF 合併；每個檔案保留最佳片段 |
| 文件 | txt、md、markdown、rst、log、csv、html、htm、docx；DOCX 只抽 `word/document.xml` |
| PDF | 抽文字層、逐頁切片並保存頁碼；沒有掃描 PDF OCR 路線 |
| 圖片 | jpg、jpeg、png、webp、bmp、gif；送圖片 embedding，保存 JPEG 縮圖；keyword 只索引圖片檔名 |
| 增量索引 | 以修改時間（秒）與大小判斷是否重做；啟動與手動 Rescan 重掃，未見持續 filesystem watcher |
| 停止／續做 | 檔案級 transaction，取消中的檔案不寫入，之後重掃；擷取失敗與推論失敗另有缺口，見風險 |
| Windows 操作 | 全域 Ctrl+Shift+Space、tray、單一 instance、開檔與 Explorer 定位 |

原碼：[indexer.rs](https://github.com/rupeshs/filedig/blob/d88af733656b7429f87cfc1eb6295e42d48aeb2e/src-tauri/src/indexer.rs)、[lib.rs](https://github.com/rupeshs/filedig/blob/d88af733656b7429f87cfc1eb6295e42d48aeb2e/src-tauri/src/lib.rs)。

## 技術架構

```text
TypeScript + Vite UI（Tauri WebView2）
          │ invoke
          v
Rust commands / indexer
   ├─ 文字、PDF、DOCX 擷取 / 圖片縮放
   ├─ llama-server（127.0.0.1 動態 port）
   │       └─ EmbeddingGemma 2 GGUF，CUDA → CPU fallback
   └─ SQLite index.db
         ├─ chunks 原文、路徑、頁碼、縮圖
         ├─ FTS5 keyword index
         └─ 768 維 f32 vectors → 全量記憶體搜尋 → RRF
```

`engine.rs:16–20` 固定模型名稱與 768 維；`engine.rs:153–164` 綁定 loopback；`db.rs:108–151` 把所有 vectors 載入記憶體，逐筆內積後完整排序，沒有 ANN。每 10 萬片段的 vector matrix 約 293 MiB，還不含模型、縮圖、SQLite 與排名暫存；此為 `100000 × 768 × 4` 的估算，未量測效能。

切片為 1,200 字元、重疊 150；上限為文字／DOCX 5 MiB、PDF 100 MiB、圖片 50 MiB。略過點開頭路徑與 node_modules、target、AppData 等目錄。這些規則會影響實際可搜內容。

來源：[engine.rs](https://github.com/rupeshs/filedig/blob/d88af733656b7429f87cfc1eb6295e42d48aeb2e/src-tauri/src/engine.rs)、[db.rs](https://github.com/rupeshs/filedig/blob/d88af733656b7429f87cfc1eb6295e42d48aeb2e/src-tauri/src/db.rs)。

## 隱私、可靠性與文件落差

1. **本機搜尋有原碼支持，但索引存原文。** 文件內容經 loopback 送給本機 llama-server；外部 HTTP 路線集中在使用者啟動的模型及 CUDA 下載。SQLite 保存文字片段、檔案路徑、頁碼與縮圖，未見應用層加密。Portable 的 data 資料夾也應視為私人資料。未做封包觀察、runtime 網路稽核或 Release binary 對照。
2. **失敗可能長期漏搜。** `indexer.rs:186–189` 把擷取失敗轉成空內容；`:256–262` 單筆 embedding 重試仍失敗就略過；`:278–313` 仍記錄檔案並減少 pending。下一次掃描因 mtime/size 未變而跳過，UI 的完成數不能代表內容全部可搜尋。原檔沒有被刪，但索引可能缺片段或整檔。
3. **PDF 跳頁沒有接上。** README 宣稱開到命中頁；`src/main.ts:390–393` 只傳 path，`lib.rs:391–392` 直接 open_path，沒有傳 page。頁碼會顯示在結果中，點擊開檔沒有指定頁碼。
4. **README 的下載檔名與 Release 不符。** README 指向 `FileDig-lite.zip`，本次 API 的唯一附件卻是 `FileDig.zip`；腳本有 Lite 產包選項，但不能由此推定附件包含哪個 backend 或模型。
5. **繁中精確搜尋有分詞限制。** `db.rs:36–37` 使用預設 FTS5 tokenizer，`lib.rs:309–316` 以英數字邊界切 query。以 Python SQLite 建相同 FTS5 表，存「我的租屋合約每月租金兩萬元」，查「租金」為 0 筆，查整句為 1 筆。這只驗證本機 SQLite 底層行為，未執行 App，也不代表語意搜尋找不到；繁中召回率仍需實測。
6. **下載 hash 驗證有快取例外。** `setup.rs:27–53` 的 URL 固定 revision/build 與 SHA-256，新下載 `.part` 會驗 hash；但 `:175–177` 已存在且同大小的 staging 檔直接返回，不再 hash。它能檢查首次下載完整性，不能描述成每次使用都重新驗證。既有手動放入 runtime 的檔案亦未見啟動完整性檢查。
7. **前端防護仍可收緊。** Tauri config 的 CSP 為 null、asset scope 為 `**`。已讀 UI 以 textContent 類方式呈現檔名／摘要，未發現內容直接插入 innerHTML 的可證利用鏈；此處屬防護缺口，不能宣稱已證實 XSS。
8. **文字編碼與刷新邊界。** `read_text` 偵測 NUL 後拒收，否則 UTF-8 lossy 解碼，UTF-16 文字容易被判 binary，Big5 可能變亂碼；同大小且同秒 mtime 的變更也可能跳過。這些為原碼推論，未跑 App fixture。

來源：[setup.rs](https://github.com/rupeshs/filedig/blob/d88af733656b7429f87cfc1eb6295e42d48aeb2e/src-tauri/src/setup.rs)、[UI 開檔](https://github.com/rupeshs/filedig/blob/d88af733656b7429f87cfc1eb6295e42d48aeb2e/src/main.ts#L390)、[Tauri config](https://github.com/rupeshs/filedig/blob/d88af733656b7429f87cfc1eb6295e42d48aeb2e/src-tauri/tauri.conf.json)。

## 社群健康度

截至本次快照，建立約兩天、單一貢獻者、六個 commits、一次 Release。固定樹未見 `.github/workflows`、測試檔或 Rust `#[test]`，package scripts 也沒有 test。零 issues 不能證明穩定；維護持續性、搜尋品質與失敗回報機制仍缺證據。

星數低於 repo-intel 的 1,000 門檻，社群口碑與 YouTube 搜尋未啟動；無獨立 homepage，不啟動 defuddle。沒有把作者的效能數字當成本機實測。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian Vault | Markdown、文字 PDF 與圖片跨資料夾搜尋有直接用途，尤其只記得內容的情境；不能理解 wikilink、專案權威順序或狀態，不能當 Vault 帳本 |
| Codex | 公開入口是桌面 App；未見 MCP server、FileDig 搜尋 CLI 或可直接接入的 Skill。內部 llama HTTP 是 embedding 接口，不是對外文件搜尋 API |
| Automation | 未有穩定搜尋介面與持續 watcher，不適合作為現有自動化的正式資料源 |
| 本機條件 | 未查 GPU/RAM，不沿用舊硬體紀錄。CPU fallback 有原碼，繁中效果、大庫時間及實際記憶體未測 |

## 安裝建議

⏳ **觀望，暫不接入正式工作流。** 功能方向有價值，實作也比 README 展示更完整；但目前版本很新，失敗後不重試、PDF 跳頁與下載入口落差，以及繁中精確搜尋限制，都會影響找回資料的可信度。

最小試用範圍是可公開的 20–50 個檔案副本，涵蓋繁中 Markdown、文字 PDF、掃描 PDF、圖片與損壞文件。先比較語意查詢／精確查詢、缺檔提示、取消續作及修復後重掃；通過才評估擴大，另行授權安裝與資料範圍。本次沒有執行上游程式、pnpm build、Cargo tests、模型推論或真人操作驗收。

## 驗證與產物

- GitHub metadata、tag SHA、Release 附件清單與固定 codeload 已核對；gh API 可用。
- SQLite FTS5 合成例驗證中文子字串限制；未當作 Rust App 端到端測試。
- 本次研究檔保留在 workspace `work/repo-intel/filedig-20261013/`，未清理，未提交或推送。
- 本機 Git Bash 執行回傳 `Bash/E_ACCESSDENIED`，檢查使用可用的 PowerShell 與 Python。
- Wiki 報告結構驗證通過，語氣 lint 為退 0；索引同步至 238 篇、知識管理分類 9 篇，相關連結已核對。這些不等於 FileDig 產品驗收。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/graphify — 一指令把資料夾建成可查詢知識圖譜的多平台 Skill|graphify：知識圖譜路線]]
- [[Github/repos/obsidian-wiki — 讓 AI Agent 維護 Obsidian 數位大腦的跨平台 Skill 框架|obsidian-wiki：Vault 維護路線]]
