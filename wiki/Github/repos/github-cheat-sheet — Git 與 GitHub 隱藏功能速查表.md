---
source: "https://github.com/tiimgreen/github-cheat-sheet"
author: "tiimgreen (Tim Green)"
stars: "58K+"
clipped: 2026-08-09
tags:
  - "github/repo"
  - "開發工具"
  - "git"
  - "cheat-sheet"
  - "reference"
---

## github-cheat-sheet — Git 與 GitHub 隱藏功能速查表

> **tiimgreen/github-cheat-sheet** | ⭐ 58,375 | 🍴 5,435 | 📝 MIT License
> "A list of cool features of Git and GitHub."

---

## 一句話說明

這是一份純 Markdown 撰寫的 Git 與 GitHub 冷知識／隱藏功能速查表——把散落在官方部落格、演講投影片、URL query 參數裡的技巧集中成一篇長文件，涵蓋 GitHub 網頁介面的 60 餘個小技巧（diff 加參數、比較分支、Gist、鍵盤快捷鍵……）與 Git 指令的實用招式（stripspace、fixup/autosquash、styled log……），目標使用者是想更熟練使用 Git／GitHub 的開發者，屬於「讀了就能用」的純文件型參考資料，不含任何可執行程式碼。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 58,375 |
| Forks | 5,435 |
| 主要語言 | 無（純 Markdown 文件庫，GitHub Linguist 未偵測到程式語言） |
| 授權 | MIT License |
| 建立時間 | 2014-04-12 |
| 最後推送 | 2024-04-15（**但最後一次實質內容變更是 2020-10-06**，2023-10-15 那次 commit 只改了贊助商連結，見「社群健康度」） |
| Open Issues | 28 |
| Open PRs | 20 |
| 最新 Release | 無（GitHub Releases 從未使用過） |
| Topics | `awesome`、`awesome-list`、`list`、`github`、`git` |
| 首頁 | http://git.io/sheet（**經查證：此短連結會 301 重定向回本 repo 的 README，不是外部文件站**，故本報告未觸發 defuddle 引擎，理由詳「引擎使用紀錄」） |
| 是否 Archived | 否 |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 9 |
| 總 Tokens | 61,908 |
| 總字元數 | 166,561 |
| 壓縮模式 | 未使用（repo 僅 776 KB，遠低於 50MB 門檻） |
| Repomix 內建安全掃描 | ✔ No suspicious files detected |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `README.ja.md` | 15,473 | 25% |
| `README.ko.md` | 12,124 | 19.6% |
| `README.md` | 11,565 | 18.7% |
| `README.zh-tw.md` | 11,310 | 18.3% |
| `README.zh-cn.md` | 10,293 | 16.6% |

> Top 5 全部是同一份內容的五種語言翻譯，這就是整個 repo 的真身——**沒有原始碼，只有五語言版本的同一篇長文件**。其餘檔案只有 `.travis.yml`（CI 連結檢查設定）、`CONTRIBUTING.md`、`LICENSE`、`.github/FUNDING.yml`。

---

## 核心功能

實質上是一篇分兩大章的長篇速查表：

**GitHub 章（網頁介面技巧，約 40 條）**，摘錄較實用者：
- **Diff URL 參數**：`?w=1` 忽略空白差異、`?ts=4` 調整 tab 顯示寬度
- **依作者篩選 commit**：`.../commits/master?author={user}`
- **分支比較**：`.../compare/{branch1}...{branch2}`，可加 `.diff`／`.patch` 後綴取純文字差異，甚至可用 `master@{1.day.ago}` 這種相對時間語法跨 fork 比較
- **Gist 技巧**：URL 加 `.pibb` 取得可內嵌的純 HTML 版本
- **git.io** 短連結服務（註：git.io 服務本身已於 2024 年關閉，此條目已過時，見下方風險評估）
- **關閉 Issue／交叉連結**：commit message 寫 `Closes #123`、`owner/repo#123` 自動連結
- **鎖定討論串、CI 狀態徽章、Markdown 語法高亮、Emoji、圖片/GIF 嵌入、快速引用、剪貼簿貼圖、快速授權（GitHub 會自動辨識 LICENSE 內容）、Task List checkbox、相對連結、GitHub Pages YAML metadata、表格渲染、PDF 直接渲染、還原 PR、Diff 的多種檢視模式（Rendered Prose Diff／Diffable Maps／展開上下文）、`hub` CLI（**已於社群共識中被官方 `gh` CLI 取代，此條同樣過時**）、CONTRIBUTING/ISSUE_TEMPLATE/PULL_REQUEST_TEMPLATE 模板檔、Octicons 圖示集、GitHub Student Developer Pack、SSH 金鑰、大頭貼裁切、Repository Template**

**Git 章（指令列技巧，約 15 條）**：
- 清空工作區已刪除檔案、`git checkout -`（回上一個分支）、`git stripspace`、`checkout` PR 分支、建立空 commit、彩色 `git status`／`git log`（含自訂 pretty format）、`git log -S`（pickaxe 搜尋內容變更）、`git grep`、列出已合併分支、`fixup` + `rebase --autosquash`、`git instaweb`（本機瀏覽 repo 的 web server）、Git 別名／自動更正／顏色設定

**多語系**：README 提供英文／韓文／日文／簡體中文／正體中文五個版本，內容同步維護。

---

## 技術架構

```
github-cheat-sheet/
├── .github/FUNDING.yml       ← GitHub Sponsors 設定
├── .travis.yml                ← CI：awesome_bot 檢查文件內所有連結是否失效
├── CONTRIBUTING.md
├── LICENSE                    ← MIT
├── README.md                  ← 英文正本
├── README.ja.md / README.ko.md / README.zh-cn.md / README.zh-tw.md
```

| 層次 | 技術 |
|------|------|
| 內容 | 純 Markdown，圖片多數經 `camo.githubusercontent.com` 代理或直連舊版 `i.imgur.com` |
| CI | Travis CI + `awesome_bot`（連結存活檢查）——但 Travis CI 免費額度已於 2020 年後大幅緊縮，此 CI 是否仍實際運作**未能驗證**（Travis 徽章狀態未抓取，標「未取得」） |
| 分發 | 無 npm／無 CLI／無安裝物，純粹透過 GitHub 網頁瀏覽或 clone |

沒有應用程式邏輯、沒有測試套件、沒有建置流程——這是一份文件，不是軟體。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 3 | tiimgreen（185 次）、marocchino（37 次）、tonyxue（19 次） | 集中於作者本人，社群貢獻多為小修訂 |
| 實質內容活躍度 | 最後一次**內容性** commit：2020-10-06（修正失效連結）；2023-10-15 之後僅剩贊助商連結變更 | ❌ 內容凍結近 6 年 |
| Release 頻率 | 從未使用 GitHub Releases | — |
| Open Issues / PRs | 28 / 20 | 長期無人處理，多為連結失效回報與翻譯 PR |

> **重要提醒**：58K 星數是十餘年累積的存量指標，不代表近期活躍——commit 歷史顯示這是一份「寫完就定型」的參考文件，而非持續維護的工具。

---

## 社群口碑

Reddit 上可查到的原生討論極少且陳舊：2014 年 r/coolgithubprojects 一則貼文（4 分、0 留言），此後未見有意義的獨立討論串；多數其他提及都只是把它當作眾多 "awesome list" 之一順帶列出。

搜尋過程中另發現一則 2026-08-09 的 X／Twitter 貼文，內容宣稱本專案是「今年用過最順手的 AI 工具」——**此描述與 repo 實際內容不符**（本專案是純 Markdown 文件、與 AI 完全無關），研判為利用熱門關鍵字產生的自動化／農場帳號內容，**存證引述但不採信為真實社群反饋**：

> 「说实话，github-cheat-sheet是我今年用过最顺手的AI工具，58.3k star不是没道理……」（@sunmer575399，2026-08-09，19 讚）

未發現 YouTube 教學生態訊號（搜尋結果均為不相關影片）。整體而言，本專案的高星數更接近「被大量開發者加星收藏當書籤」的長尾累積，而非活躍的口碑傳播。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 內容可作為 Git/GitHub 操作參考收錄進 wiki，但與 vault 現有結構（人類圖／履歷／技術筆記）無主題關聯，僅作工具書性質保存。 |
| **Claude Code** | 無 Skill／MCP／Agent 整合點，純文件無可安裝物。部分技巧（如 `git log -S`、`fixup --autosquash`）在日常派工 agent 執行 git 操作時可作為知識參考。 |
| **Automation** | 無關聯。 |

---

## 安裝建議

⏳ 觀望——不安裝，收錄為知識參考即可，不建議直接照抄操作步驟。

理由（R13 量化）：

1. **本質是文件不是工具，沒有「安裝」動作**：clone 下來也只是多一份本機 Markdown，價值在讀不在裝。
2. **內容已凍結近 6 年，部分條目已過時或失真**：`git.io` 短連結服務已於 2024 年關閉、`hub` CLI 已被官方 `gh` CLI 取代但文件未更新提及，且大量截圖走 `i.imgur.com` 直連（未驗證存活率）——照抄步驟前需自行驗證仍然有效。
3. **多語系與內容完整度是真實資產**：60 餘條技巧絕大多數（URL diff 參數、分支比較語法、commit 訊息關閉 Issue 語法等）至今仍完全有效，值得作為 Git/GitHub 操作的速查參考保留連結。
4. **社群口碑薄弱**：除十年前一則低分 Reddit 貼文外未見有意義討論，58K 星屬長尾書籤累積而非近期熱度。

**建議動作**：不 clone、不裝，若日後需要查 Git/GitHub 冷知識，直接連到 README 線上瀏覽即可；引用其中任何操作步驟前，先用該功能本身驗證仍然有效（尤其 URL 參數類與已棄用工具類）。

### 升級條件（→ 改 ✅ 收錄為常用速查）

- 團隊/個人 onboarding 流程需要一份 Git/GitHub 技巧教材，且評估後認為五語系涵蓋度優於自行整理；
- 上游恢復維護（近 12 個月內出現實質內容 commit），過時條目（`git.io`、`hub` CLI）被更新或移除。

### 放棄條件（→ 改 ❌ 不再參考）

- repo 被 Archived；
- 抽查發現半數以上截圖／連結已失效（目前僅完整抽查標題與正文，未逐一驗證數十個外部連結存活率，此為本報告已知未取得項）。

---

## 引擎使用紀錄

| 引擎 | 狀態 | 說明 |
|------|------|------|
| gh API | ✅ 完成 | metadata、contributors、commits、branches、releases 皆取得 |
| Repomix | ✅ 完成 | 776 KB 小型 repo，直接 `--remote` 打包，未啟用壓縮 |
| defuddle / Jina | ⏭️ 跳過 | `homepageUrl`（`http://git.io/sheet`）經 `curl -sIL` 驗證僅 301 重定向回本 repo README，非獨立文件站，抓取無新增資訊 |
| agent-reach 社群口碑（Exa／Reddit／X） | ✅ 完成（訊號稀薄） | 三路皆執行；Exa 僅回傳 repo 自身頁面、Reddit 僅 1 則 2014 年低分貼文、X 有 1 則疑似農場帳號貼文（已存證標注不採信） |
| smart-explore（AST） | N/A | 僅適用本地路徑分析，本次為遠端分析不觸發 |
| YouTube 教學訊號 | ✅ 完成（無訊號） | 搜尋結果均與本專案無關 |

---

## 相關連結

- 主題索引：[[Github/_index]]
- 官方短連結（會導回本 repo）：http://git.io/sheet
