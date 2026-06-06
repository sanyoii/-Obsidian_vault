---
tags: [AI, tools, tutorial, vibe-coding, claude-code, datawhale, education]
date: 2026-06-06
status: reference
source: https://github.com/datawhalechina/easy-vibe
verdict: Datawhale 出品的 AI Vibe Coding 完整教程，Stage 3 含 Claude Code/MCP/Agent SDK 中文完全指南，適合帶新手入門
---

# easy-vibe — AI Vibe Coding 完整教程

> 來源：https://github.com/datawhalechina/easy-vibe  
> 作者：Datawhale 中文 AI 開源社群  
> 定位：從零開始的 Vibe Coding 完整課程（「會說話就會做應用」）  
> 分析日期：2026-06-06

---

## 這是什麼？

Datawhale 製作的 **AI Vibe Coding 入門到進階教程**，以 VitePress 靜態網站形式發布，目標受眾是**完全沒有程式基礎的人**。

- 線上閱讀：https://datawhalechina.github.io/easy-vibe/welcome.html
- 支援語言：10 種（zh-cn、zh-tw、en、ja-jp、ko-kr、fr-fr、de-de、es-es、ar-sa、vi-vn）
- 技術棧：VitePress + Vue（含大量互動式教學元件）

---

## 課程結構（4 Stages）

### Stage 0 — 入門準備
- 學習地圖
- AI 能力遊戲體驗

### Stage 1 — 第一個 App ⭐ 新手起點
- 1.0 找到好點子
- 1.1 AI IDE 入門
- 1.2 建立 Prototype
- 1.3 整合 AI 能力
- 1.4 完整專案實戰
- 附錄：產品思維、Double Diamond、Jobs-to-be-Done、Mom Test

### Stage 2 — 全端開發
**Frontend：**
- Figma / MasterGo 設計
- UI 設計原則
- 多產品 UI
- LLM × 美化技巧
- 霍格華茲人像（圖像 AI 應用）
- Design-to-Code
- 現代元件庫

**Backend：**
- Supabase 資料庫
- AI 介面程式碼
- Git 工作流
- Zeabur 部署
- Modern CLI
- Stripe 支付整合

**AI 能力：**
- Dify 知識庫
- 多模態 API

### Stage 3 — 進階實戰 ⭐ 與 Claude Code 高度相關

**Core Skills（Claude Code 核心）：**

| 章節 | 內容 |
|------|------|
| `skills/` | Claude Code Skills 完全指南 |
| `mcp/` | Claude Code MCP 完全指南 |
| `claude-agent-sdk/` | Claude Agent SDK 完全指南（基礎 SDK vs Agent SDK 差異、工具呼叫迴圈） |
| `superpowers/` | Superpowers 技能包 |
| `agent-teams/` | Agent 協作團隊 |
| `spec-coding/` | Spec-driven Coding |
| `workflow/` | 工作流設計 |
| `long-running-tasks/` | 長時間任務處理 |
| `mobile-development/` | 行動端開發 |

**AI Advanced：**
- RAG 入門
- LangGraph 進階 RAG

**Cross-platform：**
- WeChat 小程式（前端 + 後端）
- Android App
- iOS App
- PWA 本地 App
- 瀏覽器 AI 擴充套件
- Electron 語音轉文字
- NFT Minting
- VS Code 擴充套件
- Qt 工業 HMI
- 個人品牌網站

---

## 技術亮點

- **互動式 Vue 元件**：AgentArchitectureDemo、AttentionMechanismDemo、TransformerDemo 等數十個可操作視覺化（在網站上直接執行）
- **1,633 個檔案** — 規模非常完整
- **Stage 3 Claude Code 章節品質高**：中文說明清楚，有 Code 範例，對比「基礎 API」vs「Agent SDK」

---

## 與現有工作流的關聯

Stage 3 的以下章節直接對應你的工具鏈：

| easy-vibe 章節 | 對應你的工具 |
|---------------|-------------|
| `core-skills/skills/` | 你的 145 個 Skills |
| `core-skills/mcp/` | codegraph / firecrawl / ruflo MCP |
| `core-skills/claude-agent-sdk/` | Claude Code API 開發 |
| `core-skills/superpowers/` | superpowers skill 套件 |

---

## 適用場景

- **帶新手入門 Claude Code / Vibe Coding** — 目前最完整的中文教程之一
- **補充 Stage 3 進階知識** — 特別是 Agent SDK、RAG、LangGraph 的中文說明
- **給技術分享用**：Stage 1-3 已有 10 語言版本，適合對外推薦

---

## 深度利用方向（尚未執行）

> 目前只有 Wiki 筆記，尚未將課程內容轉化成任何工具。以下三個方向供日後評估：

### 方向 A：轉成 Claude Code Skill（最實用）
把 Stage 3 的 Claude Code 章節（Skills / MCP / Agent SDK）打包成一個 skill，讓 Claude 在相關問題時自動參考這份中文說明。

**適合場景**：「讓 Claude 更懂怎麼教新手用 Claude Code」  
**做法**：用 `/book-to-skill` 或 `write-a-skill` skill，選取 `docs/zh-cn/stage-3/core-skills/` 目錄下的章節  
**成本**：中（需選章節、撰寫 SKILL.md 觸發詞）

### 方向 B：匯入 gbrain 知識庫
把課程 Markdown 文件批量匯入 gbrain，讓語意搜索能找到這些內容。

**適合場景**：「做 AI 教學時查詢特定概念的中文說明」  
**做法**：複製 `docs/zh-cn/` 到 `d:\Claude\brain-docs\`，執行 gbrain import  
**成本**：低（一次性匯入，但會增加 gbrain 索引大小）

### 方向 C：用 `/book-to-skill` 直接轉換
已安裝 `book-to-skill` skill，可以把幾個關鍵 Markdown 章節直接轉成 skill。

**適合場景**：「我要快速把某一章節變成 Claude 的常駐知識」  
**做法**：`/book-to-skill docs/zh-cn/stage-3/core-skills/claude-agent-sdk/index.md`  
**成本**：最低（一行指令，但每章節要個別轉）

---

## 相關筆記

- [[AI-PPT排行榜2026]] — 同類型 AI 工具評估
- [[ppt-master]] — Stage 2 level 工具（PPTX 生成）
- [[frontend-slides]] — Stage 2 level 工具（HTML 投影片）
