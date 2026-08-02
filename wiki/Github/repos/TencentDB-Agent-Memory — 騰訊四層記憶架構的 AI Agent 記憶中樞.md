---
source: "https://github.com/TencentCloud/TencentDB-Agent-Memory"
author: "TencentCloud (騰訊雲)"
stars: "10K+"
clipped: 2026-08-02
tags:
  - "github/repo"
  - "ai-agent"
  - "memory"
  - "security-alert"
---

# TencentDB-Agent-Memory — 騰訊四層記憶架構的 AI Agent 記憶中樞

> **TencentCloud/TencentDB-Agent-Memory** | ⭐ 10,166 | 🍴 978 | 📝 MIT（實質）
> "TencentDB Agent Memory is a team-level memory hub for AI Agents — turning conversations, docs, and code into four reusable memory assets"

## 一句話說明

騰訊雲開源的 AI Agent 長期記憶層：把對話拆成 L0 原始紀錄 → L1 原子事實 → L2 場景塊 → L3 用戶畫像四層，讓 agent 跨 session 記得使用者偏好；短期記憶則把長任務的完整日誌卸載到外部檔案、上下文只留一張 Mermaid 任務圖以省 token。技術設計扎實，但**這個倉庫實際塞了三條互不相通的產品線，且唯一能接進 Claude Code 的元件目前有兩個未修的 CRITICAL 未鑑權漏洞**。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 10,166 |
| Forks | 978 |
| 主要語言 | TypeScript（1.37 MB）＋ Python（125 KB）＋ Shell（114 KB） |
| 授權 | GitHub 標示 `other`，實查 LICENSE 全文為**標準 MIT**（Tencent 制式前言干擾偵測器所致，Inferred） |
| 建立時間 | 2026-04-07 |
| 最後推送 | 2026-07-29 |
| Open Issues | 58 |
| Open PRs | 345 |
| 最新正式版 | v1.0.1（2026-07-14），**target 分支 `feat/server`** |
| 預設分支版本 | v2.0.0-beta.1（2026-07-22），**`prerelease: true`** |
| Topics | agent, llm, memory, openclaw-plugin, ai-agent, embedding, local-first, long-term-memory, vector-search |
| 是否 Archived | 否 |

## ⚠️ 三分支＝三產品，且預設分支是 beta

這是使用前必須先搞清楚的結構問題。三個分支**彼此無共同祖先**（`gh api compare` 直接回 `No common ancestor`）：

| 分支 | 版本 | 內容 | 能接什麼 |
|---|---|---|---|
| `main` | v0.3.6（2026-05-28） | `SKILL.md`、`openclaw.plugin.json`、`src/`、`hermes-plugin/` | **OpenClaw / Hermes 外掛**。無 MCP、無 Claude Code |
| `feat/server` | **v1.0.1 = GitHub 認定的最新正式版** | 伺服器棧 | — |
| `feat/server_team` | v2.0.0-beta.1（**prerelease**） | `MemoryCore/ MemoryProxy/ MemoryPanel/ MemoryKnowledge/ deploy/ sdk/` | **唯一有 MCP server + Claude Code / CodeBuddy 反向代理的分支** |

**`feat/server_team` 是 GitHub 預設分支**，也就是說：

- 訪客打開 repo 首頁看到的是它
- `git clone` 裸指令拿到的是它
- 但 `gh api releases/latest` 回傳的是 **v1.0.1，target `feat/server`**——`v2.0.0-beta.1` 因為標了 `prerelease: true`，連「最新版」都不算

結果就是：**預設拿到的是 beta，真正的正式版在一個使用者不會主動切過去的第三分支上。**

## 核心功能

四項外部宣稱經原始碼核對，**全部 Confirmed**：

- **四層長期記憶**（`src/core/store/sqlite.ts:20711,20798`）：
  - **L0** `l0_conversations` — 原始對話，保留證據鏈
  - **L1** `l1_records`（附 `vec0` 向量索引 + FTS5 全文）— 從對話萃取的原子事實（偏好／約束／狀態）
  - **L2** `scene_blocks/*.md`（`src/core/scene/scene-extractor.ts`）— 按專案／主題聚合的場景塊
  - **L3** `persona.md`（`src/core/persona/persona-generator.ts`）— 沉澱的用戶畫像
  - 可追溯：L3 結論可一路回溯到 L2 場景 → L1 事實 → L0 原始對話
- **短期記憶卸載**：完整工具日誌寫到外部檔案，上下文只留一張帶狀態／依賴／節點 ID 的 Mermaid 任務圖，需要細節時按節點取回。**Confirmed 有實作。**
- **local-first**：預設後端確為本地 SQLite + sqlite-vec，儲存層完全本地。**唯一例外**：Hermes Docker 快速啟動路徑的預設 LLM 端點指向騰訊雲 DeepSeek（可覆蓋），儲存層不受影響。
- **對外整合**：`main` = OpenClaw / Hermes 外掛；`feat/server_team` = MCP server + Claude Code / CodeBuddy 反向代理。

### 官方公布的 benchmark（未經第三方複跑）

| 測試 | 數字 |
|---|---|
| PersonaMem 用戶事實召回 | 29.63% → 79.07% |
| WideSearch 成功率 / token | 33% → 50% / −61% |
| SWE-bench 通過率 / token | 58.4% → 64.2% / −33% |
| 短期記憶 token / 完成率 | −50%+ / +23% |

**全部是專案方自行公布，本次未複跑，社群也查無獨立複現。** 現有材料對錯誤記憶、過期偏好、跨專案污染、記憶刪除這四個失敗面零真實案例。

## 技術架構

```
main（v0.3.x）                    feat/server_team（v2.0.0-beta.1，預設分支）
  OpenClaw / Hermes 外掛              ┌──────────────────────────────┐
  ┌──────────────────┐                │ MemoryProxy   ← Claude Code  │
  │ SKILL.md         │                │  反向代理 + MCP server        │
  │ index.ts / src/  │                │  ⚠ admin 端點未鑑權          │
  │  ├ store/sqlite  │                ├──────────────────────────────┤
  │  ├ scene/        │                │ MemoryCore    記憶引擎        │
  │  └ persona/      │                │ MemoryKnowledge  文件/程式碼  │
  └────────┬─────────┘                │ MemoryPanel   管理介面        │
           │                          └──────────┬───────────────────┘
           ▼                                     ▼
   本地 SQLite + sqlite-vec + FTS5        deploy/ (Docker Compose)
   L0 對話 → L1 事實 → L2 場景 → L3 畫像

        ↑ 兩者無共同祖先，是不同產品 ↑
```

| 層次 | 技術 |
|------|------|
| 記憶儲存 | SQLite + sqlite-vec（向量）+ FTS5（全文） |
| 場景／畫像 | Markdown 檔（`scene_blocks/*.md`、`persona.md`） |
| 外掛層（main） | TypeScript，OpenClaw plugin / Hermes plugin |
| 服務層（server_team） | MemoryCore / MemoryProxy / MemoryPanel / MemoryKnowledge，Docker Compose 部署 |
| Agent 介接 | MCP server；Claude Code / CodeBuddy 反向代理（僅預設分支） |

## 🔴 安全：issue #672 兩個 CRITICAL 未修

**issue #672**（逐字標題：`[SECURITY ADVISORY] Unauthenticated Admin Endpoints, Auth Bypass, and SSRF in MemoryProxy & MemoryKnowledge`）由外部研究者 tarun1790 於 **2026-08-01** 提報，狀態 **OPEN**。

本次於 2026-08-02 對 `feat/server_team` HEAD 做新鮮讀取，確認：

1. **鑑權 fail-open**——`MemoryProxy/src/routes/admin-auth.ts:8` 逐字為：
   ```ts
   export function checkAdminAuth(c: Context, expected: string): AdminAuthResult {
     if (!expected) return "ok";
   ```
   預期 token 未設定（空字串）時直接回傳 `"ok"`，等於管理端點全開。**未修。**
2. **管理端點未包鑑權**——`MemoryProxy/src/routes/rate-limits.ts` 全檔查無 `checkAdminAuth` / `adminAuthError` 引用。**未修。**
3. SSRF：`git-fetcher.ts` 的過濾 regex 逐字未變（未修），但該檔案已被改寫過並引用內部安全規範，argument-injection 那一項未能下確定結論。

**這兩個問題正好落在唯一能接 Claude Code 的元件（MemoryProxy）上。**

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| Release 節奏 | 10 個月 10 次 release | 官方持續出貨，非棄坑 |
| Open PR / 合併率 | 345 open；全歷史合併率僅 **8.85%**（44 merged / 497 曾開） | 維護者瓶頸 |
| PR 性質 | 抽樣 50 筆皆為 400–9000 行的實質 fix/feat，**非灌水**；但同一批已知 bug（#157/#160/#235）被 5–10 個不同一次性作者各自重做，作者多為中國高校 CS 學生 | 疑似校園／獎勵型貢獻活動湧入，遠超審查能量 |
| 核心 merger | 近期合併幾乎全由 `Maxwell-Code07` 一人執行 | Bus factor 低 |
| Issue 回覆 | 多為制式模板「盡快處理」 | — |

**指標污染警告**：GitHub `/contributors` 與 `/commits` API 只看預設分支，而預設分支是孤兒分支——這兩個指標（顯示僅 2 貢獻者、近 8 週幾乎零 commit）**嚴重低估實況，不可直接引用**。

**星數有機性**：無法驗證。`stargazers` API 在本環境對任何 repo（含對照組）皆回 404，屬 token/環境層級限制。僅有的弱訊號是外部熱門推文屬 AI-hype 轉發風格。**star:watcher 比 245:1 不構成證據**——實測正常跨度為 42:1 至 2,413:1，此比值單獨無鑑別力。

## 社群口碑

外部討論清一色轉述官方 benchmark，**查無獨立技術負評，也查無獨立複現**。僅 DEV.to 一句保留意見。

對照 ByteDance OpenViking（另一個 agent memory 開源方案）：TencentDB 犧牲約 4% recall 換取更高精確度與約 30% token 節省。此比較來自二手來源，標 Weak。

## 供應鏈稽核

| 檢查項 | 結果 |
|---|---|
| 授權 | ✅ 兩分支 LICENSE 逐字相同，實質標準 MIT |
| 依賴 | ✅ 無不存在／deprecated／quarantined 套件 |
| 安裝期腳本 | ✅ 無可疑行為 |
| 遙測／使用者資料上報 | ✅ 未發現 |
| 硬編碼金鑰 | ✅ 無 |
| `SKILL.md`（main 分支，agent 指令檔） | ✅ 逐字讀畢，五類自動行為指令全無 |

供應鏈本身乾淨。**風險不在供應鏈，在服務端鑑權實作。**

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 中。四層記憶（L0 證據 → L1 事實 → L2 場景 → L3 畫像）與現有的 memory 檔／wiki 分層設計同構，架構思路可借鑑，即使不安裝也有參考價值。 |
| **Claude Code** | **高但被安全問題擋住**。本環境已有 claude-mem 提供 observation 記錄與跨 session 記憶，功能重疊明顯；而 TencentDB 唯一的 Claude Code 介接路徑（MemoryProxy 反向代理）正是漏洞所在，且只存在於 prerelease 分支。 |
| **Automation** | 低。需自架 Docker 服務棧，維運成本高於收益。 |

## 安裝建議

❌ 不適合（現階段）

理由三條，任一條單獨都足以否決：

1. **唯一能接 Claude Code 的元件有兩個未修的 CRITICAL 未鑑權漏洞**（本次對 HEAD 新鮮複驗確認未修，issue 昨日才提報）。
2. **該元件只存在於 `prerelease: true` 的 beta 分支**，而該分支恰好是 GitHub 預設分支——結構上容易讓人誤以為是穩定版。
3. **功能與既有的 claude-mem 重疊**，替換成本高、增量不明確；官方 benchmark 無第三方複現，錯誤記憶／跨專案污染／記憶刪除四個失敗面零案例。

**復查觸發（→ 改 ⏳ 或 ✅）**：
- issue #672 關閉且 `admin-auth.ts` 的 fail-open 分支被移除、`rate-limits.ts` 包上鑑權（可用本文的驗證指令複查）
- v2.0.0 脫離 prerelease 成為正式版，或三分支結構收斂成單一主線
- 出現第三方獨立複現的 benchmark

**放棄觸發（→ 永久 ❌）**：安全 issue 超過 90 天未處理、或預設分支持續指向 beta 而官方無說明。

即使日後解禁，**架構思路（四層可追溯記憶、Mermaid 任務圖卸載）本身就有借鑑價值，不必然要安裝整套服務。**

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Tools/claude-mem|claude-mem]]（本環境現用的記憶層，功能重疊對象）
