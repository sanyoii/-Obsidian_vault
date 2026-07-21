---
source: "https://github.com/tt-a1i/archify"
author: "tt-a1i"
stars: "6.5K"
clipped: 2026-07-10
updated: 2026-07-21
tags:
  - "github/repo"
  - "claude-skill"
  - "diagram-as-code"
  - "developer-tools"
---

# archify — 用大白話生成架構圖的 Claude Skill

> **tt-a1i/archify** | ⭐ 6.5K | 🍴 438 | 📝 MIT
> "Any agent Skill: generate beautiful architecture diagrams with dark/light theme toggle and PNG/JPEG/WebP/SVG export"

> [!note] 2026-07-21 復盤更新
> 距首次分析（07-10, 3.2K⭐/v2.10）兩週後重跑 repo-intel：**星數翻倍至 6.5K、發版至 v2.11.0**，功能大幅擴充。**你已裝的是舊版 → 此為升級候選**（詳見「安裝建議」）。

---

## 一句話說明

archify 是一個可安裝進 Claude Code / Codex CLI / opencode 的 Agent Skill，讓使用者用純英文口語描述系統或流程，就能產出五種技術圖（架構圖、工作流程圖、時序圖、資料流圖、生命週期圖）的單一自包含、**可互動探索**的 HTML 檔案，內建深/淺主題切換與 4× 高解析度匯出（PNG/JPEG/WebP/SVG/WebM）。定位為 Mermaid 替代品。

---

## 專案概覽

| 項目 | 數值（2026-07-21） |
|------|------|
| Stars | 6,531（07-10 為 3,230，兩週翻倍） |
| Forks | 438 |
| 主要語言 | HTML（多為 rendered artifacts）+ JavaScript（.mjs renderers） |
| 授權 | MIT |
| 建立時間 | 2026-04-15 |
| 最後推送 | 2026-07-21（當天，高度活躍） |
| Open Issues / PRs | 5 / 1 |
| 最新 Release | v2.11.0（2026-07-16） |
| Release 節奏 | v2.7→v2.11 密集迭代 |
| Topics | anthropic, architecture-diagram, claude-skill, mermaid-alternative, diagram-as-code, svg, system-design |
| 首頁 | https://tt-a1i.github.io/archify/（含 proof gallery） |
| 貢獻者 | tt-a1i, ShiroKSH（2 人） |
| 基於 | Cocoon-AI/architecture-diagram-generator（MIT v1.0） |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 229（07-10 為 83） |
| 總 Tokens | 3,701,804（多為 rendered HTML artifacts） |
| 壓縮模式 | 未使用 |

3.7M tokens 幾乎全是 `docs/gallery/artifacts/*.html` 的 rendered 圖表（每支自包含 ~128K token）；真正源碼在 `archify/renderers/*.mjs`，核心邏輯輕巧。

---

## 核心功能

- **五種圖表模式**：architecture / workflow / sequence / dataflow / lifecycle，各一 `render-<type>.mjs` + JSON Schema + 編譯後 standalone validator（零依賴即時驗證）
- **3 種視覺 preset**（v2.11 新）：stable classic / luminous signal-flow / precise blueprint
- **可互動探索 HTML**（v2.11 大幅擴充）：漸進 Reading Depth（MAP→READ→FULL）、語意鏡頭、Node Finder 搜尋、Route Probe 兩端點分析、Named Chapter Rail story 導覽、Story Follow Camera、可分享 deep link、Presentation Stage、零依賴 pan/zoom
- **JSON IR + Schema 驗證**：`schemas/<type>.schema.json` + ajv，渲染器額外做 layout 檢查（節點重疊、標籤碰撞、超框），錯誤直指 JSON path 供 LLM 自我迭代
- **高解析匯出**：copy PNG 到剪貼簿、4× 原生 PNG/JPEG/WebP、雙主題 SVG、**trace 圖錄 WebM（v2.11 新）**
- **CLI**（`bin/archify.mjs`）：`doctor` 驗裝、`demo` 產範例、`guide "<情境>"` 11 種 bounded 情境 recipe 選型（`--json`/`--lang`）、render/validate
- **Mermaid 輸入方言**：讀懂貼入的 flowchart/sequenceDiagram/stateDiagram，**重新排版**非機械轉譯
- **零依賴**：distributed skill 內含編譯 validator，HTML + runtime 全零依賴、離線可開

---

## 技術架構

```
使用者描述 / Mermaid → agent（讀 SKILL.md）
                          │
        bin/archify.mjs guide "<情境>" → 11 recipe 選型
                          │
              選 5 種 renderer 之一
                          │
   JSON-IR ──► schemas/*.schema.json 驗證（generated-validators, ajv）
                          │
   renderers/<type>/render-<type>.mjs + shared/（geometry/layout/cli/validator）
                          │
   assets/template.html + 內聯 SVG + 互動 runtime JS
                          ▼
        自包含 HTML 單檔（可探索 + 匯出 PNG/SVG/WebM）
```

| 層次 | 技術 |
|------|------|
| Skill 層 | `SKILL.md`（Anthropic Skill 格式；description 極長 = 觸發面極廣） |
| CLI/渲染層 | Node.js ≥18，`ajv` Schema 驗證，純函式渲染器輸出 SVG 字串 |
| 選型層 | recipes/scenarios.mjs（11 bounded 情境 guide） |
| 輸出層 | 單檔 HTML：CSS 變數系統 + inline SVG + 原生 Canvas 4× 匯出 JS，零依賴 |
| 測試/CI | `node --test` + golden image 比對 + GitHub Actions（ci.yml/release.yml） |

**架構重點**：不是通用繪圖引擎，而是「JSON IR → 型別化渲染器 → 驗證迴圈」的設計——Agent 讀 schema + worked example，寫 JSON，渲染後用 validate/check 抓版面錯誤，錯誤直指 JSON path，讓 LLM 自我迭代而非盲猜座標。SKILL.md 明令「fix the JSON and re-run; never edit the renderer」。這是 agent skill 少見的工程完整度（schema + golden test + CI）。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | tt-a1i, ShiroKSH | 小團隊 |
| 近 4 週 commit | 6 / 8 / 6 / 3 | 穩定活躍 |
| Release 頻率 | v2.7→v2.11 密集 | 頻繁迭代 |
| Issue/PR | 5 open / 1 PR | 有社群互動 |

6,531⭐/438 fork——高星健康比，登過 GitHub Trending（trendshift #31352）、有 YouTube short、列於 openagentskill.com skill 目錄。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Claude Code** | 極高——**已裝 archify skill，但為舊版**（描述僅到 PNG/JPEG/WebP/SVG）。v2.11 多了 WebM、語意鏡頭、Story 導覽、Route Probe、11-recipe guide 等大量新功能。明確升級候選。 |
| **Obsidian Vault** | 中-高。與 [[mermaid-visualizer]] 定位重疊但更精緻（Mermaid 是語法圖，archify 是排版驗證迴圈 + 主題 + 匯出）；可幫 repo-intel 報告/架構決策補視覺化圖。 |
| **Automation** | 中。CLI（`archify.mjs render`）可腳本化批次產圖，零依賴適合 CI 產文件圖快照。 |

---

## 安裝建議

**✅ 適合安裝（升級）** — 已裝舊版 archify，v2.11 是同一 skill 的大幅進化（+WebM、語意互動、Story 導覽、11-recipe guide、golden test/CI 工程完整度）。零依賴、MIT、當天仍在推、6.5K⭐ 已驗證。升級：`npx skills add tt-a1i/archify -g` 覆蓋，或依 skill SOP（逐字讀 SKILL.md → 雙位置 + marketplace）重裝。

**升級前一個檢查點**：現版走 `~/.claude/skills` junction 實體，重裝前先 `test -d` 確認路徑、備份舊 SKILL.md 對比 description 觸發詞差異（新版 description 極長，可能擴大自動觸發面，與 [[mermaid-visualizer]] 的觸發邊界要留意——類似 hallmark 當初的觸發打架考量）。

> 歷史狀態：07-10 首裝時判 ⏳ 觀望（與 mermaid-visualizer 重疊），後已安裝（索引標 ✅）。07-21 復盤：既已在用，跟上 v2.11 為順勢升級。

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[mermaid-visualizer]] — 同賽道語法圖 skill（觸發邊界需留意）
- [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] — 同為 tt-a1i 生態外的 agent skill 工程完整度典範
