---
source: "https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools"
author: "x1xhlol (Lucas Valbuena)"
stars: "trending"
clipped: 2026-06-10
tags:
  - "github/repo"
  - "ai-prompts"
  - "reverse-engineering"
  - "claude-code"
  - "research"
---
# x1xhlol/system-prompts-and-models-of-ai-tools

> **出處：** [https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)

---

## 這是什麼？

這個 repo 是目前最完整的 **AI 工具 System Prompt 逆向工程資料庫**，收錄 30+ 個主流 AI 編程助理、Agent 平台、網頁 AI Builder 的真實 system prompt（.txt）和工具定義（tools.json / .yaml），從 Cursor、Claude Code 2.0 到 Manus、Devin，全部是從生產環境提取的第一手原文，沒有混淆或刪改。

---

## 主要功能列表

- **Claude Code 2.0 完整 system prompt**（2025-09-29 版本，含模型版本、指令集、工具列表）
- **Cursor 多版本進化對比**（v1.0 → v1.2 → Agent 2.0 → 2025-08 → 2025-09-03）
- **Windsurf Wave 11** prompt + tools.json
- **VS Code Copilot Agent** 5 個模型版本（gpt-4.1、gpt-4o、gpt-5、gpt-5-mini、gemini-2.5-pro、claude-sonnet-4）
- **Manus AI** 完整三件套（Prompt.txt + Agent loop.txt + Modules.txt + tools.json）
- **Kiro** 三模式（Mode Classifier / Spec / Vibe Prompt）
- **Traycer AI** 雙模式（Phase + Plan）
- **開源工具 prompts**：Cline、RooCode、Codex CLI（OpenAI）、Gemini CLI（Google）、Bolt
- **Google Antigravity**（內部 AI 工具，fast + planning mode）
- **商業 AI Builder**：Lovable、v0、Same.dev、Replit、Orchids.app、Emergent、Leap.new
- **Xcode AI** 六種 Action prompt（Document、Explain、Message、Playground、Preview、System）
- **其他**：Augment Code、Amp（Sourcegraph）、Warp.dev、Perplexity、NotionAI、Devin、dia、Poke、Qoder、CodeBuddy、Junie、Z.ai Code、Comet、Cluely（含 Enterprise 版）

---

## 技術棧

| 項目 | 說明 |
|------|------|
| 語言 | 純文本（.txt、.json、.yaml） |
| 框架 | 無，靜態檔案集合 |
| 總規模 | 104 檔案、461K tokens、2.1MB |
| 授權 | 未明示（非軟體授權，屬 "as-is" 資料集） |
| 更新頻率 | 高，最後更新 2026-05-10（追蹤最新模型版本）|

---

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| **Claude Code 直接相關** | ✅ 高度相關——包含 Claude Code 2.0 完整 system prompt，可與本機 harness 對比驗證實際指令結構 |
| **Skills / Prompt 設計** | ✅ Cursor、Lovable、Manus 的 tools.json 是設計 Claude Code skills 的最佳參考 |
| **競品分析** | ✅ Windsurf / Kiro / Augment 三大競品 Agent prompt 全部在內，可學習 agent loop 設計策略 |
| **Automation / Hooks** | ⚠️ 間接相關——Manus Modules.txt 揭示完整 agent module 架構，可啟發 Obsidian Automation 設計 |
| **Obsidian Vault 整合** | ❌ 無直接整合點，純查閱用途 |

### 值得關注的細節

- **Claude Code 2.0**（2025-09-29）system prompt 比本機使用版本更新，可見未來版本的指令差異
- **Manus Modules.txt** 揭露「Browser、File、Shell、Python 模組分工」的真實 agent 架構
- **Kiro Vibe_Prompt** 顯示 Amazon 如何設計 spec-driven coding agent，與 7-Agent 工廠工作流可對比
- **Cluely Enterprise Prompt** vs Default Prompt 差異可作為「企業版 prompt 策略」的研究樣本

---

## 安裝建議

**✅ 適合收藏（clone 本機備查）**— 已完成

這不是可執行工具，是純文本知識庫。已 clone 一份到本機，作為 prompt 設計、競品研究的離線參考資料庫。

```bash
git clone https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools
```

> 無需安裝依賴，無需設定，clone 即可查閱。

**本機路徑：** `d:\Claude\reference-repos\system-prompts-and-models-of-ai-tools\`（已加入 d:\Claude 根目錄 .gitignore，不 track 進主 repo）

---

## 已套用的改善（2026-06-11）

7-Agent 工廠工作流補了兩塊黏合層文件，直接借鑑此 repo 的結構：

- **Kiro `Mode_Clasifier_Prompt.txt`** → 啟發 `workflow/ROUTER.md`（Step 0 路由：
  direct / factory / sparc 三選一，模稜兩可預設 direct）
- **Manus `Agent loop.txt` + `Modules.txt`** → 啟發 `workflow/ORCHESTRATION.md`
  （context 傳遞、平行執行、人工檢查點、Bug loop-back 機制）

詳見 [[7-Agent 工廠工作流 SOP]]（v4）。

---

## 反向連結

- [[Github/repos/prompt-master]] — 同屬 prompt 設計研究資源
- [[Claude/Karpathy 最高遵守原則 — AI 行為準則]] — Claude Code system prompt 設計原則比對
- [[Github/repos/ECC — Claude Code harness-native 操作系統]] — 同類 Claude Code 深度工具
- [[Claude/7-Agent 工廠工作流 SOP]] — 實際套用此 repo 結構模式的工作流文件
