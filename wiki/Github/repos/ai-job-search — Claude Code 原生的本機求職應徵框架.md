---
source: "https://github.com/MadsLorentzen/ai-job-search"
author: "MadsLorentzen (Mads Lorentzen)"
stars: "20.4K"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "求職"
  - "claude-code-skills"
---

# ai-job-search — Claude Code 原生的本機求職應徵框架

> **MadsLorentzen/ai-job-search** | ⭐ 20,350 | 🍴 5,803 | 📝 MIT
> "The job search that runs on your machine. AI job application framework built on Claude Code: evaluate postings, tailor CVs, write cover letters, prep interviews. Fork it and own it."

---

## 一句話說明

一個完全建在 Claude Code Skills/Commands/Subagent 機制上（無獨立後端、無 LangGraph）的求職應徵框架，使用者 fork 後填自己的 profile，靠 `/scrape → /rank → /apply → /interview → /outcome` 一條指令鏈跑完求職全流程，賣點是 LaTeX CV/求職信的「編譯後視覺校對 + ATS 文字層驗證」PDF 品質迴圈。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 20,350 |
| Forks | 5,803 |
| 主要語言 | TypeScript（69%）／Python（23%）／TeX（7%） |
| 授權 | MIT |
| 建立時間 | 2026-03-18 |
| 最後推送 | 2026-07-10（當日仍在更新） |
| Open Issues | 0 |
| Open PRs | 1 |
| 最新 Release | 無（未走 Release 流程，主線即最新） |
| Topics | ai, ai-agents, career, claude-code, cover-letter, cv, interview-preparation, job-application, job-hunting, job-search, latex, resume |
| 首頁 | 無（僅 GitHub repo 本身） |
| 是否 Archived | 否 |

四個月內從 0 衝到 2 萬星、近六千 fork——典型「模板倉庫」增長曲線：使用者不是來看程式碼，是來 fork 走用。

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 124 |
| 總 Tokens | 151,721 |
| 壓縮模式 | 未使用（diskUsage 僅 1.3MB，遠低於 50MB 門檻） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| README.md | 5,389 | 3.6% |
| .claude/commands/setup.md | 4,843 | 3.2% |
| .claude/commands/apply.md | 4,416 | 2.9% |
| .agents/skills/jobbank-search/cli/README.md | 3,964 | 2.6% |
| .agents/skills/jobdanmark-search/cli/README.md | 3,744 | 2.5% |

Top 5 全是文件/指令說明檔，不是程式邏輯——符合「這是一套 Prompt/Skill 工程專案，不是傳統軟體」的定位。

---

## 核心功能

- **九個 Slash Command 串成完整求職生命週期**：`/setup`（建檔案，支援讀 documents 資料夾／貼CV／訪談三種入口）→ `/scrape`（多求職網站搜尋+去重+適配度排序）→ `/rank`（批次評分排隊）→ `/apply <url>`（draft-review-compile 全流程）→ `/interview`（依應徵歷程建面試準備包+模擬面試）→ `/outcome`（記錄結果、歸檔文件、回饋校準評分框架）→ `/expand`（掃描 GitHub/Portfolio/Kaggle 補全技能）→ `/upskill`（技能落差熱圖+學習計畫）→ `/add-template` / `/add-portal`（模板/求職網站生成器）。
- **Drafter-Reviewer 雙 Agent 應徵流程**：草稿 Agent 寫 CV/Cover Letter，另一個「全新 context」的 Reviewer Agent 研究該公司並批評草稿，草稿 Agent 再修正——用兩次獨立推理抓漏。
- **LaTeX PDF 編譯後視覺校對迴圈**：CV 用 lualatex、Cover Letter 用 xelatex 編譯成 PDF 後，Claude 實際「讀」渲染出的頁面，反覆調整 `\needspace`/`\enlargethispage` 直到 CV 剛好 2 頁、Cover Letter 剛好 1 頁、無孤兒標題。這是市面上 LaTeX 履歷模板常見的「.tex 看起來沒問題、PDF 卻爛掉」問題的直接解法。
- **ATS 文字層驗證**：用 `pdftotext` 抽取編譯後 PDF 的文字層（ATS 解析器實際讀的內容，而非渲染畫面），檢查聯絡資訊完整、閱讀順序正常、無亂碼字形，並比對職缺關鍵字覆蓋率——履歷不會被塞入 profile 不支援的關鍵字，缺口誠實標注。
- **求職網站 CLI 生態**：內建六個求職網站 Skill（Jobbank/Jobdanmark/Jobindex/Jobnet 四個丹麥求職網站 + LinkedIn 公開端點 + freehire.dev 聚合 API），`/add-portal` 可依樣生成新市場的求職網站 Skill（自動偵測 search URL pattern、robots.txt、result 結構、跑一次即時查詢驗證）。
- **供應鏈安全門檻**：`tools/security_guards.py` 在 CI 強制檢查 `.claude/settings.json` 的 permissions.allow 白名單、`.gitignore` 個資規則、`.agents/**/package.json` 禁止 npm lifecycle scripts（preinstall/postinstall 等）——因為這是模板倉庫，每個 fork 使用者都會執行倉庫附帶的權限與 CLI 程式碼，作者把「權限擴大」這種高風險變更做成 CI 硬闖關。

---

## 技術架構

```
使用者 fork
   │
   ▼
CLAUDE.md（Profile 主檔）+ .claude/skills/job-application-assistant/
   01~07 候選人資料檔（教育/行為評估/寫作風格/評分框架/CV模板/信件模板/面試STAR）
   │
   ├─ /scrape ──► .agents/skills/{jobbank,jobdanmark,jobindex,jobnet,linkedin,freehire}-search/
   │                （各自獨立 Bun+TypeScript CLI，零/近零 runtime 依賴）
   │
   ├─ /rank ────► 平行 Agent 依五維評分框架批次打分
   │
   ├─ /apply ───► Drafter Agent（草稿 CV+Cover Letter LaTeX）
   │                 │
   │                 ▼
   │              Reviewer Agent（新 context，查公司+批評）
   │                 │
   │                 ▼
   │              LaTeX 編譯（lualatex CV / xelatex Cover Letter）
   │                 │
   │                 ▼
   │              視覺校對迴圈（讀 PDF 頁面，調整版面）
   │                 │
   │                 ▼
   │              pdftotext ATS 文字層驗證
   │
   ├─ /interview ► 讀 documents/applications/ 歸檔 + 模擬面試
   └─ /outcome ──► 歸檔到 documents/applications/<company>_<role>/ + 更新 tracker
```

| 層次 | 技術 |
|------|------|
| 執行引擎 | Claude Code（Skills + Commands + Subagent，無獨立後端服務） |
| 求職網站爬取 | Bun + TypeScript CLI（六個獨立 Skill，各自 tests + tsconfig） |
| 文件產出 | LaTeX（moderncv banking style CV、自訂 cover.cls 求職信），lualatex/xelatex |
| 輔助工具 | Python（salary_lookup.py 薪資比對、tools/security_guards.py CI 安全閘、tools/lint_skills.py） |
| CI | GitHub Actions：LaTeX smoke 編譯、skill/command lint、CLI typecheck、security guards、dependency review |

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | MadsLorentzen, ayobamiseun, sridhar-3009, akhil29897, erikpr1994, hopkienne, ShiroKSH, Yigtwxx, web-flow, Alwin4Zhang | 作者主導，外部貢獻剛起步 |
| 近 4 週 commit | 1 → 0 → 2 → 46 | 最近一週爆量更新（46 commits），明顯在密集迭代中 |
| Release 頻率 | 無正式 Release，主線滾動更新 | 模板倉庫常見模式，靠 fork 而非版本鎖定 |
| Issue open/close | 0 open | 剛爆紅、issue 量尚未累積，非長期穩定訊號 |

---

## 社群口碑

Repo 建立僅 4 個月、社群討論仍集中在近期爆紅這一波，資料時效性高，僅供參考。

**熱門討論：**
- **r/ClaudeAI「I built an open-source job search framework in Claude Code after getting laid off」**（作者本人發文，48 分／42 留言）：作者描述被裁員後三個月做出此框架，強調「fit evaluation 比潤飾過的求職信更值錢」——先用系統對真實 profile 打分再決定要不要投，避免病急亂投醫；系統設計上刻意停在送出鍵之前，人工做最終審閱，所有履歷主張都對照真實 profile、不可捏造。
- **X（微博式中文帳號 CycleDecoded，75 讚）**：中文圈以「求職外掛」「降維打擊」的行銷語氣轉述，重點放在「一鍵海王式選岗」「千機變定制簡歷」「面試全自動押題」等口語化賣點，反映其在中文 AI 工具愛好者社群也開始傳播。

**正面回饋：** 「先評分再投」的 fit-evaluation 前置關卡被多次提及為核心價值；PDF 品質校對迴圈解決了 LaTeX 履歷常見的排版翻車問題。
**負面回饋 / 已知問題：** 尚未見到明顯負評或已知問題討論——repo 太新，社群意見還沒有機會沉澱出批評聲量。

**YouTube 教學訊號：** 搜尋到 3 支相關影片，觀看數均個位數到兩百出頭（189 / 28 / 6 次），教學生態尚未成形，符合「4 個月新專案、剛開始爆紅」的階段特徵。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯，屬 Claude Code 求職工具類知識，歸入本 `wiki/Github/repos/` 求職分類即可，不需額外筆記串接。 |
| **Claude Code** | 與 `career-ops`（v1.18 求職指揮系統，A-F 評估+Go TUI）、`jobsmith`（14-agent LangGraph co-pilot，台灣八管道求職來源）功能上互補而非重疊：career-ops/jobsmith 的強項在「大量抓取＋批次評分」，本 repo 的強項在**應徵材料產出**——LaTeX CV/求職信編譯後視覺校對＋ATS 文字層驗證這一段，是 career-ops/jobsmith 目前都沒有做到的「生出真正能投的 PDF」步驟。若要截長補短，drafter-reviewer 雙 Agent 批評迴圈、以及 PDF 編譯後視覺校對這兩個**設計模式**值得抽出參考，但不建議整包安裝：本 repo 綁定丹麥求職網站與 LaTeX 工具鏈（需另裝 TeX Live/MiKTeX + lualatex/xelatex），與現有台灣求職堆疊的技術路線不同。 |
| **Automation** | `/add-portal` 生成器（自動偵測目標求職網站 URL pattern、robots.txt、跑即時查詢驗證後才註冊）是通用度較高的部分，理論上可仿照生成 104/1111/CakeResume 版本，但目前無立即需求，先觀望不動手複製。 |

---

## 安裝建議

⏳ 觀望 — 不整包安裝，但把「LaTeX PDF 編譯後視覺校對 + ATS 文字層驗證」這個設計模式記下來，未來若 career-ops/jobsmith 要補「產出可投遞履歷 PDF」這塊功能時可回頭參考本 repo 的 `/apply` 實作細節（`.claude/commands/apply.md`）。理由：① 求職網站部分是丹麥市場專屬、對台灣求職無直接用處；② 需要另外安裝 LaTeX 工具鏈，成本不小；③ 現有 career-ops+jobsmith 已覆蓋抓取與評分，此 repo 的差異化價值集中在應徵文件產出這一段，屬於「未來想補的功能」而非「現在缺的功能」。

---

## 延伸操作

- 想要完整架構圖譜？→ 執行 `/understand`
- 想搜尋特定 symbol？→ 用 `/smart-explore`
- 想比較類似專案？→ 再跑一次 `/repo-intel` 分析 career-ops 或 jobsmith 做橫向比較

---

## 相關連結

- [[Github/repos/career-ops — AI 驅動求職自動化指揮系統]]
- [[Github/repos/jobsmith — 台灣求職 AI 多代理 Co-Pilot]]
