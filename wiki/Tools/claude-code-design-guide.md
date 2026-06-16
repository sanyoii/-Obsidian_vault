# Claude Code 設計指南 — 源碼架構書籍

> **GitHub**: https://github.com/6551Team/claude-code-design-guide
> **語言**: 中文（含英文/韓文版）
> **本機 Skill**: `~/.claude/skills/claude-code-design-guide/`

---

## 這是什麼

對 Claude Code 1884 個 TypeScript 原始碼文件的完整架構分析，以書籍形式呈現（26章 + 30+ 架構深度模組）。

> 「不是推測，是基於 node_modules 中真實 TypeScript 源文件的分析。」

**作者**：@cryptoxiao / @BoxMrChen / @0xfaskety（X/Twitter）

---

## 書籍結構（9 個部分）

| Part | 主題 | 關鍵章節 |
|------|-----|---------|
| 1 | 認識 Claude Code（入門） | ch01-02 |
| 2 | 從 Unix 到 AI Agent 的歷史脈絡 | ch03-05 |
| **3** | **核心架構** | **ch06 QueryEngine**、ch07 狀態管理、ch08 流式處理 |
| **4** | **工具系統** | **ch09 工具哲學**、ch10 43 個工具、**ch11 權限模型** |
| **5** | **Context Engineering** | **ch12 概念**、ch13 系統提示、**ch14 CLAUDE.md**、ch15 Auto-Compact |
| **6** | **Agent Runtime** | ch16 Task 系統、**ch17 多代理**、ch18 協調器 |
| 7 | 擴展系統 | ch19 MCP、ch20 Skills、ch21 插件 |
| 8 | 安全與性能 | ch22 權限模型、ch23 安全、ch24 性能 |
| **9** | **設計哲學** | **ch25 六大設計原則**、ch26 未來展望 |

---

## 最重要的框架（從這本書學到的）

### 1. QueryEngine 核心設計
Claude Code 中樞（`src/QueryEngine.ts`，1295 行）。無狀態、配置驅動的 Agent 循環：
- 調用 Claude API（流式）
- 並行執行工具調用
- 消息只追加、不修改
- Token 預算雙重保護（數量 + 費用）

### 2. Context Engineering 三個維度
「LLM 的能力固定，輸出質量可變（由上下文決定）」：
- **內容**：CLAUDE.md、git status、對話歷史
- **結構**：系統提示 vs 用戶消息、信息優先級
- **管理**：Auto-compact、動態注入

### 3. CLAUDE.md 多級系統
`~/.claude/` → `/project/` → `/src/` → `/auth/` 自動發現合并，`@引用語法` 避免複製粘貼。

### 4. 原子工具 + AI 編排原則
FileRead/Grep/Edit/Bash 單一職責，複雜任務由 Claude 推理編排，而非大工具。

### 5. 六大設計原則
透明性 > 便利性 / 安全是默認 / 單一職責 / 顯式 > 隱式 / 為失敗設計 / 可觀察性

---

## 本機 Skill 結構

```
~/.claude/skills/claude-code-design-guide/
├── SKILL.md                            # 核心框架 + 主題索引
├── chapters/
│   ├── ch01-02-intro-quickstart.md
│   ├── ch03-05-history.md
│   ├── ch06-08-core-architecture.md    ⭐
│   ├── ch09-11-tool-system.md          ⭐
│   ├── ch12-15-context-engineering.md  ⭐
│   ├── ch16-18-agent-runtime.md        ⭐
│   ├── ch25-26-design-philosophy.md    ⭐
│   └── arch-deep-dive.md               # 30+ 架構模組索引
├── glossary.md                         # 30+ 術語定義
├── patterns.md                         # 10 個設計模式
└── cheatsheet.md                       # 快速參考表
```

使用方式：
```
/claude-code-design-guide                           # 載入核心框架
/claude-code-design-guide about CLAUDE.md           # 特定主題
/claude-code-design-guide ch12-15                   # 特定章節
```

---

## 架構深度分析（architecture/ 目錄）

30+ 模組，每個模組含 zh/en/ko 版本 + SVG 架構圖：
- `03-查询引擎` — QueryEngine 源碼深度
- `05-工具系统` — 43 工具實現細節
- `09-Hooks系统` — 70+ Hooks 事件系統
- `10-Skills系统` — SKILL.md 解析機制
- `11-多智能体` — AgentTool 實現
- `16-记忆系统` — Memory 四種類型
- `46-完整数据流图` — 端到端數據流（最重要的架構圖）

---

## 標籤

#tools #claude-code #architecture #agent-design #context-engineering #reference-book
