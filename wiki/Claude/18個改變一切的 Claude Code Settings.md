# 18 個改變一切的 Claude Code Settings

> 來源文章：@Mnilax on X — "18 Claude settings that change everything"
> 實際套用日期：2026-05-26

---

## 已套用的修改

### settings.json 修改（2026-05-26）

**檔案：** `C:\Users\sanyo\.claude\settings.json`（user-level，全域生效）

新增項目：

| 設定 | 值 | 說明 |
|------|-----|------|
| `model` | `"claude-sonnet-4-6"` | 明確指定預設模型 |
| `cleanupPeriodDays` | `180` | 延長記憶體清理週期（預設 30 天，影響 Dreaming 深度與過去對話搜尋） |
| `disableAllHooks` | `false` | 明確設為 false（panic switch） |
| `permissions.deny` | 5 條規則 | 防止讀取 .env、secret 檔案，封鎖 `rm -rf` 與 `sudo` |
| `mcpServers.chrome-devtools.enabled` | `false` | 已停用的 MCP server 加上 enabled flag（不刪除） |
| `hooks.SessionStart` branch-aware hook | `cat .claude/context-$(git branch).md` | 每次 session 開始自動載入 branch 對應的 context 檔案 |

**檔案：** `d:\Claude\.claude\settings.json`（project-level）

補上缺少的 deny 規則：
- `Read(**/*secret*)`
- `Bash(rm -rf:*)`
- `Bash(sudo:*)`

---

## 完整 18 設定對照表

### 1–8：Claude.ai UI（需手動確認）

| # | 設定 | 建議 |
|---|------|------|
| 1 | Memory scope | 設為 Project-level，避免跨 project 污染 |
| 2 | Extended Thinking | 複雜任務時手動開啟 |
| 3 | Custom Styles | 設定輸出語調（繁中已由 CLAUDE.md 處理） |
| 4 | Project Instructions | 已有各 project CLAUDE.md，等同此功能 |
| 5 | Past-chat search | 確認已開啟 |
| 6 | Web search citations | 建議 Footnotes 模式 |
| 7 | Cowork trusted folders | 有用 Cowork 時設定 |
| 8 | Incognito shortcut | 個人偏好 |

### 9–15：Claude Code settings.json

| # | 設定 | 狀態 |
|---|------|------|
| 9 | `enabledPlugins` 用 false 不刪除 | ✅ 原本已正確 |
| 10 | `permissions.deny` | ✅ 已修復 |
| 11 | `hooks.SessionStart` branch-aware | ✅ 已新增 |
| 12 | `disableAllHooks: false` | ✅ 已新增 |
| 13 | `model` 明確指定 | ✅ 已新增 |
| 14 | `mcpServers` 加 `enabled` flag | ✅ 已修復 |
| 15 | `cleanupPeriodDays: 180` | ✅ 已新增 |

### 16–18：API/Console（需程式碼或 Console 手動確認）

| # | 設定 | 說明 |
|---|------|------|
| 16 | `cache_control` breakpoint | 斷點放在穩定 system prompt 之後，不是 user message；加 `"ttl": "1h"` |
| 17 | `inference_geo` | 非合規需求不要設，Opus 4.7+ 會多收 10% |
| 18 | Workspace rate limits | batch jobs 用獨立 workspace，避免搶互動 chat 的 quota |

---

## 重要細節

### permissions.deny 完整規則

```json
"deny": [
  "Read(.env)",
  "Read(.env.*)",
  "Read(**/*secret*)",
  "Bash(rm -rf:*)",
  "Bash(sudo:*)"
]
```

> 注意：官方文件有記載 deny 規則偶有 bug 不生效，保底做法是 `chmod 600 .env`（Windows 用 icacls）。

### cleanupPeriodDays 的影響

預設 30 天 → 180 天：
- **Dreaming**（Claude 背景思考）能回顧更長的對話記錄
- **past-chat search** 搜尋深度更深
- 磁碟佔用會稍微增加，通常可忽略

### branch-aware SessionStart hook

```json
{
  "type": "command",
  "shell": "bash",
  "command": "cat .claude/context-$(git branch --show-current 2>/dev/null).md 2>/dev/null || true"
}
```

使用方式：在各 feature branch 的 `.claude/` 資料夾下建立 `context-<branch-name>.md`，session 開始時自動載入該 branch 的專屬 context。

### cache_control 正確寫法（API 用）

```python
# 正確：斷點放在 system prompt 之後
messages = [
    {"role": "system", "content": SYSTEM_PROMPT,
     "cache_control": {"type": "ephemeral", "ttl": "1h"}},
    {"role": "user", "content": user_question}
]

# 錯誤：斷點放在 user message（每次都不同，cache 無效）
messages = [
    {"role": "system", "content": SYSTEM_PROMPT},
    {"role": "user", "content": user_question,
     "cache_control": {"type": "ephemeral"}}
]
```

---

## Tags

#claude-code #settings #configuration #permissions #hooks #cache #api
