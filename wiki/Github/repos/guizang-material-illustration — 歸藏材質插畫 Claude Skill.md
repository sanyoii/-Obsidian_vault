---
source: "https://github.com/op7418/guizang-material-illustration"
author: "op7418"
stars: "463"
clipped: 2026-07-10
tags:
  - "github/repo"
  - "claude-code-skill"
  - "image-generation"
---

# guizang-material-illustration — 歸藏材質插畫 Claude Skill

> **op7418/guizang-material-illustration** | ⭐ 463 | 🍴 38 | 📝 未設定授權
> "归藏的材质插画 skill：生成带字解释图、图表美化和参考辅助配图。"

## 一句話說明

這是一個 Claude Code / Codex 通用 **Agent Skill**（非程式庫），專門負責「配圖層」——把文章、周報、教程、圖表資料轉成一張帶中文標籤、瑞士編輯風格的 3D 材質插畫，用於解釋概念、美化圖表、或作為社群卡片/PPT/文件的中心圖，本身不做完整版面排版。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 463 |
| Forks | 38 |
| 主要語言 | 無（純 Markdown/YAML，無程式碼） |
| 授權 | 未設定 |
| 建立時間 | 2026-07-07（3 天前，全新專案） |
| 最後推送 | 2026-07-07 |
| Open Issues | 1 |
| Open PRs | 0 |
| 最新 Release | 無 |
| Topics | agent, chart-visualization, chinese, claude-code, codex, data-visualization, explainer, illustration, image-generation, skill, social-media, material-illustration |
| 首頁 | 無 |
| 是否 Archived | 否 |

3 天內衝到 463 星、38 forks——典型「小而美」Skill 爆紅模式：內容極輕（37KB），傳播靠 X/小紅書口碑而非程式碼複雜度。stars > 1,000 門檻未達，故本報告跳過社群口碑（agent-reach）與 YouTube 教學訊號兩引擎。

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 13 |
| 總 Tokens | 15,622 |
| 壓縮模式 | 否（37KB 無需壓縮） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| README.md | 3,911 | 25% |
| references/chart-beautify.md | 2,035 | 13% |
| PRODUCT.md | 1,617 | 10.4% |
| references/use-cases-and-routing.md | 1,438 | 9.2% |
| SKILL.md | 1,381 | 8.8% |

## 核心功能

- **SKILL.md 主流程**：讀取來源文字/截圖/圖表資料 → 自行判斷圖型（不強迫使用者選模式）→ 若涉及冷門概念/品牌/科學裝置先查參考資訊 → 寫一張圖一條 prompt（含中文標籤、比例、安全區）→ 呼叫 `imagegen` 生成 → 檢查文字/資料/裁切 → 存檔並記錄 prompt
- **8 種視覺結構模板**：Cycle（循環）、Pipeline（管線）、Hub-and-spoke（中心輻射）、Before/after（前後對比）、Layer stack（分層架構）、Data-first scene（資料場景）、Scientific mechanism（科學機制）、Text scene（人文場景）
- **`references/chart-beautify.md`**：圖表美化規則——只萃取語義（類型/標題/數據/座標/單位），不照抄爛截圖的版面
- **`references/reference-gathering.md`**：生僻概念/品牌/科學裝置的參考資訊蒐集規則，只取事實與穩定視覺線索再統一轉換成歸藏風格
- **`references/qa-checklist.md`**：交付前的文字/數據/裁切/參考準確性檢查清單
- **`agents/openai.yaml`**：Codex/OpenAI 平台的 Skill 展示配置（brand_color、隱式呼叫策略），代表作者同時面向 Claude Code 與 Codex 兩個生態發佈

## 技術架構

```
guizang-material-illustration/
├── SKILL.md                      ← 入口：何時觸發、10 步工作流、文字規則
├── PRODUCT.md                    ← 產品定位：只做配圖層，不做完整排版
├── HANDOFF.md                    ← 實作事實：目錄結構、測試案例、已知坑
├── agents/openai.yaml            ← Codex/OpenAI 平台展示配置
├── assets/prompt-template.md     ← 可複用 prompt 模板（含固定風格描述）
└── references/                   ← 6 份規則文件，SKILL.md 依情境指向讀取
    ├── visual-style.md           ← 瑞士編輯 3D 風格、比例、安全區、5 色系統
    ├── prompt-patterns.md        ← 5 種圖解結構 prompt shell（cycle/pipeline/hub/before-after/layer-stack）
    ├── chart-beautify.md         ← 圖表語義抽取規則
    ├── use-cases-and-routing.md  ← 情境路由判斷
    ├── reference-gathering.md    ← 冷門概念參考蒐集規則
    └── qa-checklist.md           ← 交付前檢查清單
```

| 層次 | 技術 |
|------|------|
| 核心邏輯 | 純 Prompt Engineering（Markdown 規則文件，無程式碼） |
| 圖片生成 | GPT-Image / imagegen（外部影像生成工具） |
| 分工介面 | 與「社群卡片 Skill」「PPT Skill」上下游協作，只出中心圖不做排版 |

這是「純知識型 Skill」的典型結構——沒有一行可執行程式碼，全部價值在於 SKILL.md 的 10 步工作流設計與 references/ 的規則細節（風格系統、5 色 accent、8 種圖解結構、QA checklist），透過精確的自然語言約束讓 LLM 產出一致品質的插畫。

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 僅 op7418 | 個人專案，未見外部貢獻 |
| 近期活動 | 建立即推送完成，之後無新 commit | 3 天新專案，剛發佈 |
| Release 頻率 | 無 release | 未版本化，直接用 main |
| Issue open/close | 1 open / 0 PR | 極輕量，尚無維護負擔 |

## 社群口碑

此專案星數低於 1,000 門檻（463⭐），且屬於 3 天內的全新專案，社群討論資料不足，本報告跳過 agent-reach 社群口碑與 YouTube 教學訊號兩引擎。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 與已安裝的 `guizang-ppt` skill（靛藍瓷風格投影片）同一作者 op7418 的姊妹作，皆屬「歸藏」系列 Skill 家族（guizang-ppt-skill / guizang-social-card-skill / guizang-s-prompt），此為配圖層補完 |
| **Claude Code** | 可直接作為 Skill 安裝，與現有 deck-ai-classroom、html-ppt 等簡報類 Skill 形成「配圖→排版」上下游分工；SKILL.md 的「不強迫使用者選模式、自行判斷情境」設計原則可借鏡 |
| **Automation** | 依賴 `imagegen`/GPT-Image 外部影像生成能力，本環境若無對應工具則無法實際出圖，僅能借用其 prompt 設計方法論 |

## 安裝建議

⏳ 觀望 — 若已有 imagegen/GPT-Image 生成管線且常需要「帶中文標籤的解釋圖」（教育配圖、圖表美化、周報配圖），值得安裝試用；純方法論參考則可只借鏡其 SKILL.md 工作流設計（不強迫選模式、8 種圖解結構分類）與 QA checklist 結構，不必整包安裝。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
