---
source: "https://thisweb.dev/post/claude-code-structure"
discovered_via: "https://www.threads.com/@this.web/post/DXEP6QJkjd7"
author: "this.web"
clipped: 2026-06-11
tags:
  - "claude-code"
  - "ai-prompts"
  - "web-scraping"
---

# Claude Code .claude/ 資料夾結構完整指南

> **出處：** https://thisweb.dev/post/claude-code-structure
> **發現於 Threads：** https://www.threads.com/@this.web/post/DXEP6QJkjd7

如果你從來沒了解過.claude 資料夾，那你只用了 Claude Code 10% 的能力而已。

我們可以透過一個結構化的.claude/ 資料夾，讓你把規則、習慣、工作流程「記錄下來」，讓 Claude 每次都能精準按照你的方式工作。

這篇文章會帶你逐一了解.claude/ 資料夾底下每個目錄的用途，並附上實際範例，讓你馬上可以套用。

## agents - 你的 AI 專屬團隊

一般人使用 Claude Code，就是一個 AI 幫你做所有事。

Agents 是你自訂的 AI 助理，每一個都有自己的角色設定、可用的工具和行為規則等等。

當 Claude 遇到符合的任務，它會自動把工作交給對應的 Agent 來處理，這就像一個主管把任務分配給不同的組員。

雖然 Claude Code **本身就內建一些子代理**，像是 `Explore`、`Plan`、`general-purpose`，Claude 會視任務情況自動委派。

但這些內建子代理，職責在於幫 Claude 做比較通用型的工作。

而我們自己放在 `.claude/agents/` 裡的，則是 **自訂子代理**。和內建的子代理差別為，自訂的子代理更像是根據工作流程打造的 **專職同事**。

所以如果你希望不同任務有不同的「專家」來處理，這時候就需要自訂 **Agents（子代理）**。

### Agents 怎麼使用？

在 `.claude/agents/` 資料夾下，建立一個 `.md` 檔案，並在最上方用 frontmatter 定義這個 Agent 的設定。

例如，你可以做一個「註解整理專家」，專門把零散 feedback 改寫成可直接交付的內容：

```markdown
---
name: feedback-editor
description: 根據 review 註解、批改意見或零散 feedback，整理並改寫文件或程式碼內容。
tools: Read, Grep, Glob, Edit, Write
model: haiku
---

你是一位資深工程師，擅長理解模糊的修改意見。當意圖不夠清楚時，會主動向使用者釐清，再整理成清楚的需求規劃。

每次被呼叫時，請：

1. 先閱讀原程式碼與所有 review 註解
2. 理解每則註解背後真正想修正的問題
3. 直接改寫程式碼，而不是只補一句說明
4. 保持程式碼可維護性、可讀性。
```

子代理常見有這幾種觸發方式：

1. **自動觸發**：Claude 根據 `description` 的描述，判斷什麼時候應該交給這個 Agent
2. **直接指定**：在對話中說「請用 `feedback-editor` 幫我整理這份修改意見」
3. **@提及**：手動輸入 `@"feedback-editor (agent)"`

## commands - 你的自訂快捷指令

Commands 可以讓你把常用的工作流程包裝成一個指令，只要輸入 `/指令名稱`，Claude 就會按照你設定的步驟執行。

這樣我們就不用每次都重新說明一長串流程，也不用擔心忘記步驟，一個指令搞定所有事。

### commands 怎麼使用？

在 `.claude/commands/` 資料夾下，建立一個 `.md` 檔案，檔名就是指令名稱：

`.claude/commands/explain-change.md`

```markdown
---
description: 解釋指定檔案或最近修改的變更範圍
argument-hint: [檔案路徑]
---

閱讀 $ARGUMENTS，或最近一次相關修改，然後整理出：

1. 這次改動主要改了什麼
2. 影響範圍包含哪些檔案、模組或功能
3. 哪些地方只是重構，哪些地方真的改變行為
4. 測試時應該優先確認哪些部分
```

新增好之後，在對話框輸入 `/explain-change src/cart.ts` 即可使用。

## hooks - 自動化你的工作流程

Hooks 是 Claude Code 的自動觸發機制，**讓你在特定事件發生時，自動執行某些動作，不需要每次手動提醒 Claude。**

舉例來說，你可以設定：Claude 在準備提交 commit 前，自動先跑 lint 和 format；或是在 Claude 要執行某些關鍵指令前，先做額外檢查。

### hooks 怎麼使用？

先來看一個實際的 hook 腳本。假設你希望 Claude 在準備提交 commit 前，先自動跑 lint 和 format，那你可以先建立：

`.claude/hooks/before-commit-check.sh`

```shell
#!/usr/bin/env bash
set -euo pipefail

echo "Running lint and format before commit..."
npm run lint
npm run format
```

這種寫法的好處是，真正的邏輯都放在 `.sh` 裡，之後要改檢查流程也很直覺。

寫好腳本之後，再回到 `.claude/settings.json` 把它掛上去：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit *)",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/before-commit-check.sh"
          }
        ]
      }
    ]
  }
}
```

這段設定的意思是：當 Claude 準備執行 `git commit` 這類 Bash 指令前，先觸發 `.claude/hooks/before-commit-check.sh`，把 lint 和 format 跑完再繼續。

### Hooks 的類型

Claude Code 的 Hook 類型其實很多，下面列的是最常用、最容易上手的一批：

| 事件 | 觸發時機 |
| --- | --- |
| `PreToolUse` | Claude 執行工具 **之前** |
| `PostToolUse` | Claude 執行工具 **之後** |
| `SubagentStart` | Claude 啟動子代理時 |
| `SubagentStop` | Claude 結束子代理時 |
| `Stop` | Claude 完成回覆時 |
| `SessionStart` | 對話開始時 |
| `Notification` | Claude 需要你輸入時 |
| `FileChanged` | 被監看的檔案發生變化時 |

## rules - 給 Claude 的行為準則

Rules 是你寫給 Claude 的「規定清單」，告訴它在這個專案裡應該怎麼寫程式、什麼事情不能做、要遵守哪些規範。

這裡要注意一個細節：不是所有 rules 都是無腦全讀。

- 沒有 `paths` frontmatter 的 rules，會在一開始就載入
- 有 `paths` frontmatter 的 rules，只有在 Claude 真的處理到符合的檔案時才載入

這也是 rules 很適合大型專案的原因，因為可以把上下文切得很精準，不會每次都把整包規範塞進來。

### rules 怎麼使用？

我們只要在 `.claude/rules/` 資料夾下，建立 `.md` 檔案：`.claude/rules/api.md` 來描述你個規範即可。

```markdown
---
paths:
  - 'src/api/**/*.ts'
  - 'app/api/**/*.ts'
---

# API 開發規範

## 路由命名

- 使用 RESTful 風格：`GET /users`、`POST /users`、`DELETE /users/:id`
- 版本號放在 URL：`/api/v1/users`

## 回應格式

所有 API 必須回傳統一格式：

- 成功：`{ success: true, data: {...} }`
- 失敗：`{ success: false, error: "錯誤訊息" }`

## 安全性

- 所有輸入必須驗證
- 敏感操作需要身份驗證
- 錯誤訊息不可洩漏內部資訊
```

這種 `paths` frontmatter 的好處是，**只有當 Claude 真的碰到 API 相關檔案時，這份規範才會被載入。**

也就是說，**你可以把前端規範、後端規範、資料庫規範拆成不同檔案，各自只在需要時出現，整體上下文會乾淨很多。**

## skills - 可重複使用的工作腳本

Skills 和 Commands 類似，都是讓你定義可呼叫的工作流程。

不同的是，Skills 像是工作手冊，Claude Code 會在做相關工作時，自動讀取相關內容或規範，如果做不相關工作，就不讀取，不佔用 token，這也是 Claude Code 官方推薦的現代寫法。

每個 Skill 是一個資料夾，裡面放著 `SKILL.md` 作為主要設定檔，還可以附上範本、範例等補充資料。

### skills 怎麼使用？

在 `.claude/skills/` 下建立一個資料夾，並在裡面新增 `SKILL.md`

裡面可以放上 description，讓 Claude Code 知道什麼時候要使用這個 skill，

比如說這個 `.claude/skills/clarify-before-doing/SKILL.md`：

```markdown
---
name: clarify-before-doing
description: 在動手做複雜任務前，先釐清使用者意圖、目的與成功條件，再規劃步驟。
---

當任務牽涉到多步驟修改、重構、文件大幅改寫或功能設計時，請先不要直接開始做。

請依照以下流程進行：

1. 先確認使用者真正想達成什麼
2. 問清楚限制條件、輸出格式與成功標準
3. 整理成可執行的步驟
4. 告訴使用者接下來你會怎麼做
5. 確認沒有誤解後，再開始執行

等你確定理解 95% 使用者意圖，向使用者做雙重確認後，才能修改程式碼。
```

## settings.json - 專案權限與行為設定

`settings.json` 是 Claude Code 的設定檔，用來控制 Claude **可以做什麼、不可以做什麼**，以及各種自動化行為。

例如你可以限制 Claude 不能執行某些危險指令，也可以設定環境變數、調整 UI 主題等。

### 設定檔的位置

設定檔可以放在多個位置：

| 位置 | 適用範圍 |
| --- | --- |
| `~/.claude/settings.json` | 你個人的所有專案 |
| `.claude/settings.json` | 當前資料夾的專案（可提交到 git 共享） |
| `.claude/settings.local.json` | 當前資料夾的專案（本機私用，不提交） |

### 範例設定

比如我們可以允許 Claude Code 去讀取和修改檔案，但是拒絕它刪除檔案，就可以這樣寫：

```javascript
{
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Write",
      "Bash(git *)",
      "Bash(npm *)",
      "Bash(npx prettier *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)",
      "Bash(curl * | sh)",
      "Bash(DROP TABLE *)"
    ]
  }
}
```

前面提到的 Hook，也是一樣寫在這個 `settings.json` 裡，基本上 `hooks/` 目錄放的是腳本本體，而 `settings.json` 裡是描述「什麼時候觸發哪一支腳本」。

例如前面提到的提交前檢查，就可以像這樣掛：

```javascript
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit *)",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/before-commit-check.sh"
          }
        ]
      }
    ]
  }
}
```

這對於團隊協作特別重要，可以在 `.claude/settings.json` 設定好規範，提交到 git，讓整個團隊的 Claude 行為一致。

## CLAUDE.md - Claude 的核心大腦

`CLAUDE.md` 是整個 `.claude/` 資料夾中最重要的一個檔案。

每次對話開始，Claude 都會優先讀取這個檔案，把裡面的內容當作這個專案的「基礎知識」。

你可以在這裡寫下專案背景、常用指令、開發規範，讓 Claude 一開始就掌握所有 **必要** 的上下文。

如果你想偷懶的話，也可以直接使用 `/init` 指令，讓 Claude 自動幫你生成一個 `CLAUDE.md` 的初始版本。

另外，官方現在也很鼓勵把 `CLAUDE.md` 維持精簡，必要時用 `@path/to/file` 的方式匯入其他說明文件。這樣可以保留核心規則在主檔，細節再拆出去，不容易越寫越肥。

以下是一個範例：

```markdown
# 專案：My Web App

## 使用技術

- Frontend：Next.js 15 + TypeScript + Tailwind CSS
- Backend：Express.js + PostgreSQL
- 測試：Vitest + Playwright

## 常用指令

- 開發：`npm run dev`
- 測試：`npm test`
- 建置：`npm run build`
- 資料庫遷移：`npm run db:migrate`

## 目錄結構

- `src/app/` - Next.js 頁面
- `src/components/` - 可複用元件
- `src/lib/` - 工具函式
- `src/server/` - 後端 API

## 開發規範

- 檔名使用 kebab-case：`user-card.tsx`
- 元件名稱使用 PascalCase：`UserCard`
- 禁止使用 `any`，一律使用明確型別
- 所有 API 必須有 Zod schema 驗證
- 提交前執行 `npm test` 確保測試通過

## 注意事項

- 正式環境的 API key 放在 `.env.local`，不可提交到 git
- 資料庫操作一律透過 `src/lib/db.ts`，不可直接使用裸 SQL
```

### CLAUDE.md 可以放哪裡？

CLAUDE.md 和 settings.json 一樣，可以分為全局和專案限定的：

| 位置 | 適用範圍 |
| --- | --- |
| `~/.claude/CLAUDE.md` | 你個人的所有專案 |
| `./CLAUDE.md` | 這個專案（通常提交到 git） |

### 和 rules/ 的差別

那 CLAUDE.md 和 rules/ 有什麼差別呢？

如果是小專案，單純用 CLAUDE.md 就非常夠，但是當專案越來越大，有越來越多相關規範，就可以考慮拆分出 rules/ 來更好地維護。

簡單說的話就是：`CLAUDE.md` 適合放「整個專案都該知道」的事情，而 `rules/` 適合放「特定檔案或特定領域才需要」的規則

|  | CLAUDE.md | .claude/rules/ |
| --- | --- | --- |
| 適合放什麼 | 專案整體說明、技術棧、常用指令 | 細分主題的詳細規範 |
| 讀取方式 | 每次對話一開始就會讀取 | 視規則型態而定 |
| 維護難度 | 單一檔案，容易管理 | 分主題，適合大型專案 |

## 總結

`.claude/` 資料夾就是你的 **Claude Code 設定中心**，讓你可以客製化自己的工作方式、流程，不用每次都重新說明。

最後簡單整理一下：

| 資料夾/檔案 | 用途 |
| --- | --- |
| `agents/` | 定義專屬的 AI 子代理 |
| `commands/` | 建立自訂快捷指令 |
| `hooks/` | 自動化工作流程觸發器 |
| `rules/` | 細分主題的行為規範 |
| `skills/` | 可複用的進階工作腳本 |
| `settings.json` | 權限控制與全域設定 |
| `CLAUDE.md` | 專案說明與開發規範 |

---

## Threads 留言中值得注意的觀點

> **@avantheim1997**：通用 convention 類規則（如 `src/*/*.py` 這種大範圍 path glob）不要放 `rules/`，因為每次 read/edit 符合的檔案都會被「逐檔」附加一次 rule context——讀 3 個檔案 × 3 條 convention = 9 倍 context 消耗。這種通用規範應該放 `CLAUDE.md`，或交給 linter/formatter/skill。

## 反向連結

- [[Claude/CLAUDE.md 架構與 Path-Scoped Rules]] — 本機 d:\Claude 的 CLAUDE.md/rules 實踐對照
