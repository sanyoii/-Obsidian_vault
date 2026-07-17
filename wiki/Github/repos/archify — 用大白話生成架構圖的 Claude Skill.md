---
source: "https://github.com/tt-a1i/archify"
author: "tt-a1i"
stars: "3.2K"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "claude-skill"
  - "diagram-as-code"
  - "developer-tools"
---

# archify — 用大白話生成架構圖的 Claude Skill

> **tt-a1i/archify** | ⭐ 3.2K | 🍴 227 | 📝 MIT
> "Any agent Skill: generate beautiful architecture diagrams with dark/light theme toggle and PNG/JPEG/WebP/SVG export"

---

## 一句話說明

archify 是一個可安裝進 Claude Code / Codex CLI / opencode 的 Agent Skill，讓使用者用純英文口語描述系統或流程，就能產出五種技術圖（架構圖、工作流程圖、時序圖、資料流圖、生命週期圖）的單一自包含 HTML 檔案，內建深/淺主題切換與 4× 高解析度匯出。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 3,230 |
| Forks | 227 |
| 主要語言 | JavaScript（另含 HTML／Mermaid／Shell） |
| 授權 | MIT |
| 建立時間 | 2026-04-15 |
| 最後推送 | 2026-07-06 |
| Open Issues | 10 |
| Open PRs | 0 |
| 最新 Release | v2.10.0（2026-07-05） |
| Topics | anthropic, architecture-diagram, claude-skill, dark-mode, developer-tools, diagram-as-code, mermaid-alternative, svg, system-design, html-diagram |
| 首頁 | https://tt-a1i.github.io/archify/ |
| 是否 Archived | 否 |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 83 |
| 總 Tokens | 308,548 |
| 壓縮模式 | 未使用（diskUsage 僅 ~7MB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| docs/index.html | 15,872 | 5.1% |
| examples/workflow-agent-tool-call-rendered.html | 15,037 | 4.9% |
| examples/workflow-agent-tool-call.html | 15,037 | 4.9% |
| examples/dataflow-product-analytics.html | 14,936 | 4.8% |
| examples/sequence-cache-miss-request.html | 14,540 | 4.7% |

---

## 核心功能

- **五種圖表模式**：architecture（系統/雲端組件）、workflow（流程/審批/CI-CD）、sequence（API 呼叫鏈）、dataflow（資料管線/PII 邊界）、lifecycle（狀態機）
- **JSON IR + Schema 驗證**：每種模式都有對應 `schemas/<type>.schema.json`，用 `ajv` 驗證輸入，渲染器並額外做 layout 檢查（節點重疊、標籤碰撞、超出畫布等）
- **語意色彩系統**：七種元件型別（frontend/backend/database/cloud/security/messagebus/external）對應固定 CSS class，深淺主題自動切換，不使用寫死顏色
- **自包含輸出**：產出單一 HTML，內嵌 SVG + ~19KB JS（主題切換＋匯出選單），零依賴、離線可開
- **高解析度匯出**：PNG/JPEG/WebP 原生 4× 解析度，SVG 為雙主題向量圖（跟隨讀者系統深淺色）
- **CLI 工具鏈**：`bin/archify.mjs` 提供 render / validate / inspect / check 子指令，供 Agent 在寫 JSON 後自我驗證與修正
- **Mermaid 輸入方言支援**：可讀懂貼入的 Mermaid 語法（flowchart/sequenceDiagram/stateDiagram），重新規劃版面而非機械轉譯

---

## 技術架構

```
archify/
├── bin/archify.mjs           CLI 入口（render/validate/inspect/check）
├── renderers/
│   ├── architecture/         grid.mjs + render-architecture.mjs
│   ├── workflow/  sequence/  dataflow/  lifecycle/   （各自 render-<type>.mjs + README）
│   └── shared/                cli.mjs / geometry.mjs / layout-report.mjs / utils.mjs / validator.mjs
├── schemas/                  五種 diagram type 的 JSON Schema（含 common.schema.json）
├── assets/template.html      無 Node 環境時的手工 SVG 排版 fallback 樣板
├── examples/                 五種模式的完整 worked examples（JSON + 渲染後 HTML）
├── test/                     node:test 單元測試 + golden 影像測試 + CLI 測試
├── SKILL.md                  Claude Skill 指令文件（渲染迴圈、layout 規則、設計系統）
└── docs/index.html           GitHub Pages 產品首頁
```

| 層次 | 技術 |
|------|------|
| Skill 層 | `SKILL.md`（Anthropic Skill 格式），描述 5 種模式選用邏輯、Mermaid 轉譯規則、hand-placed fallback |
| CLI/渲染層 | Node.js ≥18，`ajv` 做 Schema 驗證（唯一 runtime 依賴），純函式渲染器輸出 SVG 字串 |
| 輸出層 | 單檔 HTML：內嵌 CSS 變數系統 + inline SVG + 原生 Canvas 4× 匯出 JS，零外部依賴 |
| 測試層 | `node --test` + 自製 golden image 比對 + layout 規則驗證腳本 |
| CI/CD | GitHub Actions（`.github/workflows/ci.yml` + `release.yml`） |

**架構重點**：這不是通用繪圖引擎，而是「JSON IR → 型別化渲染器 → 驗證迴圈」的設計——Agent 先讀 schema + worked example，寫 JSON，渲染後用 `validate`/`check` 指令抓版面錯誤（節點重疊、標籤衝突、超框），錯誤訊息直接指出 JSON path 該怎麼修，讓 LLM 能自我迭代而非盲猜座標。整個系統刻意把「渲染器修正」與「JSON 內容修正」分開——SKILL.md 明確要求「fix the JSON and re-run; never edit the renderer」。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 目前僅 tt-a1i 一人 | 個人專案，尚無外部貢獻者加入 |
| Release 頻率 | v2.4.0(04-18) → v2.10.0(07-05)，近三個月 7 個版本 | 疊代密集、活躍維護中 |
| Issue open/close | 10 open / 0 open PR | 尚無社群 PR 貢獻，issue 有一定量待處理 |

---

## 社群口碑

*Stars > 1,000，已嘗試 Reddit + X/Twitter 搜尋。*

**熱門討論（X/Twitter，簡體中文科技帳號轉發）：**
- @GitHub_Daily（2026-07-01）：詳細介紹貼文，1,686 讚 / 141K 瀏覽，強調「省事」「單一 HTML 零依賴」「能直接貼進 Slack/Notion」
- 個人科技帳號（2026-07-09）：37 讚 / 4.6K 瀏覽，痛點切入「畫架構圖最煩不是講而是畫」，肯定其取代 Visio 手動拖拉的定位

**正面回饋：** 「省事」「零依賴單檔 HTML」「深淺主題自動跟隨」是反覆被提及的賣點，定位精準打中「畫圖比講解更花時間」的痛點。

**負面回饋 / 已知問題：** 搜尋結果未見負面評論；Reddit 搜尋未命中相關討論（`r/Archified` 為同名但無關的 Arch Linux 社群）。

（Note：YouTube 搜尋「archify tutorial」全部命中的是同名商業室內設計/建材平台 ArchifyNow，與本專案無關，故略過該區塊。）

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 可用於幫既有的 repo-intel 分析報告、架構決策記錄補上視覺化架構圖，比純文字 ASCII 樹更精緻，且可直接貼進 wiki 文章（單檔 HTML 可另存或截圖嵌入） |
| **Claude Code** | 直接是 Claude Skill 形式，與現有 mermaid-visualizer 定位部分重疊但更精緻（Mermaid 是語法圖，archify 是排版驗證迴圈+主題+匯出）；可補強現有技術文件/架構討論的視覺輸出品質 |
| **Automation** | CLI 化的 render/validate/inspect 子指令可被腳本呼叫，適合在文件產出流程或 CI 中自動生成架構圖快照 |

---

## 安裝建議

⏳ 觀望 — 功能扎實、口碑正面、疊代活躍，但與現有 `mermaid-visualizer` skill 有定位重疊；沒有立即需求前不必立刻裝，等真的需要「更精緻、可匯出高解析度圖片」的架構圖時再安裝（下載 `archify.zip` 解壓到 `~/.claude/skills/` 即可，安裝成本低，可隨時追加）。

復查觸發（2026-07-17 補）：
- **升級條件**（→ ✅ 裝）：出現需要「更精緻、可匯出高解析度圖片」的架構圖需求，mermaid-visualizer 無法滿足
- **放棄條件**（→ ❌ 不裝）：mermaid-visualizer 持續足夠應付架構圖需求 → 不裝

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
