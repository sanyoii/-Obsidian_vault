---
tags:
  - tools
  - gbrain
  - knowledge-base
  - mcp
date: 2026-05-30
---

# gbrain 使用指南

> gbrain 是個人知識腦，用 Hybrid Search（Vector + BM25 + Knowledge Graph）查詢本地知識庫。  
> 版本：v0.36.3.0 ｜ 資料庫：PGLite（無需伺服器）｜ Embedding：Gemini

---

## 安裝位置

| 項目 | 路徑 |
|------|------|
| 資料庫 | `C:\Users\sanyo\.gbrain\brain.pglite` |
| Embedding 設定 | `C:\Users\sanyo\.gbrain\config.json` |
| Skills | `D:\Claude\gbrain-skills\`（43 個，供 gbrain 自身的 LLM 用） |
| 待匯入文件暫存 | `D:\Claude\brain-docs\` |

---

## 三種使用方式

### 1. MCP 整合（最高價值）

gbrain 已加入 Claude Code 的 MCP server 清單（`gbrain serve`）。  
在 Claude Code 對話中直接說「查一下我的筆記裡有沒有 X」，Claude 會自動呼叫 gbrain 搜尋。

**適合問法：**
- 「我之前有沒有記錄過 XX？」
- 「幫我找 Obsidian 裡關於 XX 的筆記」
- 「我的知識庫裡 XX 和 YY 有什麼關聯？」

### 2. CLI 直接搜尋

```powershell
gbrain search "關鍵字"        # 混合搜尋（最常用）
gbrain status                 # 查看收錄量與狀態
gbrain config list            # 查看 PGLite config
```

### 3. 匯入新資料

```powershell
# 把新文件放進暫存區
# D:\Claude\brain-docs\

# Step 1：匯入文件（不呼叫 API，不需要 key）
gbrain import D:\Claude\brain-docs

# Step 2：補 embedding（呼叫 Gemini API，這步才需要 key）
$env:GOOGLE_GENERATIVE_AI_API_KEY = "<AIza 開頭的 key>"
gbrain embed --stale
```

**已收錄來源：**
- Obsidian vault（`D:\Claude\obsidian\`）— 118 頁，534 chunks（2026-05-20）
- 軟體設計模式課程影片轉錄（42 支，2026-05-23）

**待收錄：**
- `D:\Claude\social-monitor\reports\`

---

## Obsidian Inbox 一鍵匯入

見 [[gbrain-inbox]]。腳本 `D:\Claude\tools\gbrain-inbox.ps1` 會掃描 `Inbox/`，匯入 gbrain 後移至 `wiki/Ideas/`。

---

## Embedding 設定注意事項

gbrain 有**兩套 config 系統**（互不同步）：

| 系統 | 用途 |
|------|------|
| `gbrain config set` | 寫入 PGLite 資料庫 |
| `~/.gbrain/config.json` | **Embedding runtime 讀這個** |

Embedding 出問題時，確認三件事：
1. `C:\Users\sanyo\.gbrain\config.json` 有正確的 `GOOGLE_GENERATIVE_AI_API_KEY`
2. 環境變數 `GOOGLE_GENERATIVE_AI_API_KEY` 已設定（User 層級）
3. `embedding_dimensions` 設為 `1536`（Gemini 強制對齊 schema）

---

## gbrain-skills 是什麼

`D:\Claude\gbrain-skills\` 裡的 43 個 skills 是 **gbrain 自身 LLM 的 prompt templates**，與 Claude Code skills 完全不同。目前主要用 Claude Code，這些 skills 不需要主動使用。

---

*相關：[[gbrain-inbox]] | [[video-to-brain]]*
