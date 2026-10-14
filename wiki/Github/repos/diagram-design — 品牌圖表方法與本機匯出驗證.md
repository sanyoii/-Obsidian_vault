---
source: "https://github.com/cathrynlavery/diagram-design"
author: "cathrynlavery"
stars: "54.3K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "diagrams"
  - "agent-skills"
---

# diagram-design — 品牌圖表方法與本機匯出驗證

## 一句話說明

Diagram Design 把圖型選擇、品牌字色、布局、匯入與匯出方法交給現有 agent，讓它產生單一 HTML＋inline SVG 圖表。適合對外架構圖、流程說明、QA 狀態圖與客戶簡報。這次建議保留既有安裝按需使用；上游升級先觀望，沒有把文件、測試或安裝存在當成圖表驗收。

## 專案概覽

| 項目 | 查詢結果 |
|---|---|
| Repository | cathrynlavery/diagram-design |
| Stars | 54,337，2026-10-14 REST API 快照 |
| Forks | 3,442 |
| 主要語言 | HTML；本機工具為 Python |
| 授權 | MIT；另有 THIRD_PARTY_LICENSES.md |
| 建立時間 | 2026-04-16 18:01:16 UTC |
| 最後推送 | 2026-10-13 21:48:36 UTC |
| 固定 SHA | `11b08eade8049c441ed3df1895e3b527c26c0fbe` |
| Codex manifest | 2.6.98；SKILL metadata 僅記 2.6 |
| 本機已載入 | plugin cache 2.6.90；manifest 已讀回確認 |
| 最新 Release | releases API 空陣列；版本由 manifest／main 自動 bump 管理 |
| Open Issues / PRs | 46 為 API 合計；另外查 PR 為 29，因此 issue 為 17。分次查詢可能有時間差 |
| Archived | false |
| 首頁 | https://diagramdesign.dev |

來源：[GitHub API](https://api.github.com/repos/cathrynlavery/diagram-design)、[固定來源樹](https://github.com/cathrynlavery/diagram-design/tree/11b08eade8049c441ed3df1895e3b527c26c0fbe)、[Codex manifest](https://github.com/cathrynlavery/diagram-design/blob/11b08eade8049c441ed3df1895e3b527c26c0fbe/.codex-plugin/plugin.json)。

## Repomix 深度分析

固定 codeload 解壓原始檔 680 個，Skill 子樹 286 個檔案；Repomix 1.18.1 未壓縮打包 533 個文字檔，2,830,560 tokens、8,066,496 字元。其餘二進位或預設排除項不在 XML 內。沒有把整包 XML 塞入上下文，採定向讀取入口、五個 packaged Python helper、CI／tests、匯出與隱私文件。

| Top 5 | Tokens | 佔比 |
|---|---:|---:|
| example-exploded-keyboard-animated.html | 120,440 | 4.3% |
| example-exploded-keyboard-full.html | 117,238 | 4.1% |
| example-exploded-keyboard.html | 116,327 | 4.1% |
| example-exploded-keyboard-dark.html | 109,711 | 3.9% |
| assets/icons.html | 60,745 | 2.1% |

大檔主要是 SVG 範例，不代表生成每張圖都需要數百萬 tokens。入口依題型讀 references 才是實際用法。

初次 npx 安裝 Repomix 的 task-local cache 遇 EEXIST／EPERM，沒有產生有效 XML；後改用前一輪已下載的同版 Repomix CLI，對本次固定來源重新打包，exit 0 且檔數／XML 已核對。快取與研究產物保留於工作區 `work/repo-intel/diagram-design-20261014/`，未刪除、未改全域設定。Security check 無命中不代表完整安全認證。

## 核心功能

| 能力 | 原碼／方法確認 |
|---|---|
| 圖型選擇 | 45 份 type references，含架構、架構差異、狀態、ER、流程、sequence、Sankey、journey、service blueprint 等 |
| 品牌化 | style-guide tokens、project marker、保存 profile；預設品牌未設定時有首次設定詢問流程 |
| 匯入 | draw.io、Mermaid、Excalidraw 經 Python extractor 轉成中間描述，再由 agent 重繪；不是逐像素還原 |
| 交付 | 自含 HTML＋SVG；light／dark／full-editorial 範例與受控動畫 |
| 自檢 | packaged self_check 檢查遠端內容、可執行 script、SVG naming、viewBox 外溢、動畫 controller 等 |
| SVG 匯出 | Python 標準庫 helper，攜帶 CSS、namespace defs／引用、處理 rgba 與 accessibility metadata；提供 system-fonts 模式 |
| PNG 匯出 | 方法依賴 Python Playwright 與瀏覽器；不應由文件存在推定本機 ready |

來源：[Skill](https://github.com/cathrynlavery/diagram-design/blob/11b08eade8049c441ed3df1895e3b527c26c0fbe/skills/diagram-design/SKILL.md)、[匯出方法](https://github.com/cathrynlavery/diagram-design/blob/11b08eade8049c441ed3df1895e3b527c26c0fbe/skills/diagram-design/references/export.md)。

## 技術架構

```text
使用者描述／原始 draw.io、Mermaid、Excalidraw
                  │
      Python extractor → 中間描述
                  │
      Agent + Skill + type reference + 品牌 tokens
                  │
           HTML + inline SVG
             ├─ self_check → 安全與結構檢查
             ├─ export_svg → SVG（Python 標準庫）
             └─ PNG 方法 → Playwright + 瀏覽器
```

五個隨 Skill 出貨的 helper 是 `drawio_extract.py`、`excalidraw_extract.py`、`mermaid_extract.py`、`export_svg.py`、`self_check.py`。repo 根的 scripts 是維護者測試／驗證／生成工具，不應全部當成已安裝 Skill 的 runtime 能力。`doctor` 是命令文件＋reference 的檢查流程，沒有 packaged doctor.py。

Mermaid 匯入指示明確把標籤、URL 與 directive 視為不可信資料；extractor 不執行、渲染或抓取內嵌程式與 URL。這是較好的輸入邊界，但本輪沒有完整安全稽核或惡意 fixture 的全量執行。

## 本機驗證與限制

| 項目 | 本次結果 |
|---|---|
| `scripts/test-self-check.py` | 通過；覆蓋 remote image、CSS URL／import、javascript URL、iframe、script、尺寸外溢及 offline fonts 等合成案例 |
| `scripts/test-export-svg-standalone.py` | 88 tests，OK；9.892 秒，exit 0 |
| 上游該 SHA 的 CI | GitHub Actions `CI` 成功；Auto Version Bump／Pages 成功；另有 Dependabot 工作失敗，不能混稱整個 Actions 全綠 |
| 真模型產圖 | 未執行 |
| PNG／瀏覽器渲染／手機 | 未執行 |
| 本機已安裝 2.6.90 的功能驗證 | 未執行；測試跑的是固定上游 2.6.98 的研究副本 |
| 全 repo 測試 | 未執行；根 scripts 有 41 份 test-*.py，本輪僅選兩套 |

CI：[固定 SHA 的 CI run](https://github.com/cathrynlavery/diagram-design/actions/runs/38471609918)。tests：[self-check](https://github.com/cathrynlavery/diagram-design/blob/11b08eade8049c441ed3df1895e3b527c26c0fbe/scripts/test-self-check.py)、[SVG regression](https://github.com/cathrynlavery/diagram-design/blob/11b08eade8049c441ed3df1895e3b527c26c0fbe/scripts/test-export-svg-standalone.py)。

### 已重現：CSS 跳脫引用匯出後斷鏈

本輪用固定版本 `export_svg_document(..., system_fonts=True)` 跑最小案例：漸層 ID 為 `paint`，填色引用為 `url(#\70 aint)`，CSS escape 代表 p。匯出把 ID 改成 `example-paint`，卻保留原引用，導致引用不再對得上。這是原碼輸出驗證，未另做瀏覽器畫面驗證。

與作者 repo 的 [issue #429](https://github.com/cathrynlavery/diagram-design/issues/429) 相符；對應修補 PR #432 仍 open。88 個既有 tests 通過不能排除這個缺口。一般未使用 CSS escape 的圖不應由此推定全部失敗。

另有 [#428](https://github.com/cathrynlavery/diagram-design/issues/428) 回報 Doctor 把可用 headless-shell 環境判 WARN，以及 [#431](https://github.com/cathrynlavery/diagram-design/issues/431) 回報多個 verifier 誤讀 quoted CSS data；本輪已讀原始 issue，未重現後兩項，不標為本機 confirmed。

## 隱私與交付邊界

上游無自身 server／account／telemetry，仍由使用者的 AI provider 處理提示詞與材料。預設 HTML 與 standalone SVG 使用 Google Fonts；打開或 headless export 會有字型請求。因此單一 HTML 不代表全離線，若有需求需 system-fonts 並驗 `self_check --offline`。本輪只跑相關合成測試，沒有宣稱新產物已離線驗通。

SVG／PNG 匯出只保留 diagram SVG，不含 full-editorial wrapper 的頁首、摘要卡及頁尾；想要整頁是另一個 screenshot 需求。品牌 profile 保存會寫到執行環境，不能在研究中擅自建立或改全域 profile。

來源：[PRIVACY.md](https://github.com/cathrynlavery/diagram-design/blob/11b08eade8049c441ed3df1895e3b527c26c0fbe/PRIVACY.md)、[export.md](https://github.com/cathrynlavery/diagram-design/blob/11b08eade8049c441ed3df1895e3b527c26c0fbe/skills/diagram-design/references/export.md)。

## 社群健康度與口碑

前十貢獻者包含 cathrynlavery（127）、github-actions[bot]（89）、parveen0029（16）、rudycelekli（12）、mvanhorn（12）等。近 30 筆 commits 有大量自動版本 bump，不能當成 30 次功能更新；近四週完整 commit 統計本輪未取得。

官方網站用 defuddle 成功擷取；網站仍寫 44 visual types，固定樹則有 45 份 type reference，資料數量以本次原碼為準。沒有 GitHub Releases 不等於沒有維護，但採用時應固定 SHA／manifest 版本。

Agent Reach doctor 顯示 Reddit Chrome 擴充未就緒、X 認證失敗、Exa 未設定，本輪沒有修登入或裝擴充。改以現有 web 搜尋讀公開 Reddit 討論：少量使用者提及用於客戶流程／briefing，也有使用後偏好它的留言；樣本少且沒有可重現產物，不能據此宣稱成熟或普遍勝過其他工具。Wiki 不保留易過期的口碑細節作為採用依據。

## 與現有系統的相關性評估

| 面向 | 建議 |
|---|---|
| Obsidian | 可在筆記旁提供 HTML／SVG 圖解，仍以筆記或正式資料為來源；沒有自動索引或知識庫同步能力 |
| Codex | 已有 native plugin cache 2.6.90，沿現有入口即可；不需要再建同名 Skill 或改全域工具 |
| QA／產品說明 | state machine、sequence、flowchart、service blueprint 與 architecture delta 很適合整理失敗路徑、角色交接及前後變化；圖的正確性仍需對照事實 |
| Automation | deterministic helper 可被本機流程調用，但本輪未接入新排程／背景服務 |
| 與 Archify 分工 | 需要品牌一致、圖型規則與匯入重繪時優先 Diagram Design；互動解釋與現有 Archify 成品沿既有入口，不因本次研究全面替換 |

### 本機 2.6.90 → 上游 2.6.98 的實際差異

按 LF 正規化比較 Skill 子樹：8 個既有檔變更、3 個 architecture-containment 範例新增，沒有移除檔。改動檔為 SKILL.md、assets/index.html、export.md、import-mermaid.md、layout-budget.md、type-architecture.md、export_svg.py、mermaid_extract.py。

這是版本差異檢查，不是升級授權。本輪未寫入 plugin cache、未升級、未改設定。

## 安裝建議

⏳ **保留已裝版本按需使用，暫緩升級。** 方法價值明確，兩套本機腳本驗證通過；升級增量集中在 SVG／Mermaid 處理、布局文件與 containment 範例，尚有可重現 SVG 邊界錯誤。先以一個真實的繁中 QA 圖題驗內容、標籤溢出與 SVG 交付，才決定是否升級。

不新增第二份同名 Skill，不改品牌 profile，不接全域 hook；本輪只交付研究。新 Wiki 報告與必要索引已新增，先前 commit／push 已完成的授權不延伸到本輪新產物，這次未提交或推送。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/archify — 用大白話生成架構圖的 Claude Skill|Archify 既有分析]]
