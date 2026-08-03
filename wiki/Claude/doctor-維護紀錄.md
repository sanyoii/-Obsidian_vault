---
tags:
  - claude/maintenance
  - doctor
created: 2026-08-03
---

# /doctor 維護紀錄

> Claude Code 環境健檢的執行紀錄（滾動追加，最新在上）。
> 相關：[[Claude 環境說明]]、[[Claude環境操作手冊]]、memory `project_claude_config_dir_junction`（07-09 兩宇宙統一＋前次 /doctor 清理）。

---

## 2026-08-03 — 全面健檢（v2.1.220）

**掃描窗**：50 sessions／3 天（08-01～08-03）。窗薄，判定主要靠 lifetime 計數（07-09 歸零起算）。

### 健康項（無動作）

- 安裝本體：native 2.1.220 唯一安裝＝latest channel 最新版；無 npm 殘留、無 `~/.claude/local`
- 六個設定檔全部 parse OK（含 C: 空殼 `{}`）
- `permissions.defaultMode = auto` 已在 user scope，無 project/local 遮蔽
- CLAUDE.md 路由層 8k chars 已精簡、lazy-loading pattern（institution 細則層）已自建，無可遷
- 拒絕記錄僅 5 筆、各 1 次——無 pattern 值得預先核可

### 執行的清理（使用者挑選 3/4 項）

| 動作 | 檔案 | 復原 |
|---|---|---|
| 刪位元組相同的重複 agent 檔 | `.claude/agents/analysis/code-review/analyze-code-quality.md` | `git checkout --`（未 commit，留 git diff 審） |
| 停用 jobuzzer MCP（本專案；auth 掛著＋窗內零呼叫） | `.claude.json` projects 的 `disabledMcpServers`（D:/Claude 與 d:/Claude 兩個大小寫 key 都補） | `/mcp enable jobuzzer` 或 `.claude.json.doctor-backup-20260803` |
| 停用 ruflo MCP（從未見到呼叫；CLAUDE.md 本就寫「沒啟動就忽略」） | `.claude/settings.local.json` 加 `disabledMcpjsonServers: ["ruflo"]` | 刪該行或 `settings.local.json.doctor-backup-20260803` |

未選：bento-slides 插件（零使用但使用者保留）。設定檔手術一律 mktemp → jq → parse 驗證 → mv，改後複驗。MCP 停用下個 session 生效。

**過程修正**：voicebox 實際早已在本專案 disabledMcpServers（報告初版誤標「保留」）。

### 掛起的發現（連著既有 backlog，本次不動）

- **8 組內容相異的 agent 撞名**（system-architect／researcher／ml-developer／backend-dev／cicd-engineer／pr-manager／mobile-dev／api-docs）：兩檔內容不同，誰被載入取決於未排序目錄順序＝跨機器不定。需逐對審內容 → P2 backlog「agents 架構收斂」（memory `project_agents_architecture_convergence`）
- **75/86 user skills lifetime 零使用**（07-09 起算）：120-skill 逐項分類已登記停損，不重開
- **claude-mem per-tool-call hooks 三天累計阻塞約 80 分鐘**：PostToolUse:Bash n=1848 中位 1.1s（~34min）、PreToolUse:Read n=254 中位 2.3s（~10min）、其餘 Edit/Write/Read/Stop 合計 ~35min。日常延遲的最大單一來源；動不動它是獨立決策
- **常駐 context est.**：skill 清單 8.2k（86 user）＋ plugin skills 2.9k（42 條）＋ **agent 清單 4.1k（109 個）** ≈ 15k，另 CLAUDE.md 系 ~9k、MEMORY.md ~7k。**本 session skills 清單實際已被截斷**（多數條目剩裸名）＝skill 路由已在降級——最大可減塊即上兩條 backlog

### 派工

- 同日派 subagent 對 `chuspeeism/dashi-taskboard` 執行 repo-intel（結果見 [[Github/_index|Github 索引]]）

---
