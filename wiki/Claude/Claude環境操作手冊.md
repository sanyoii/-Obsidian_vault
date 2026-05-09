# D:\Claude 環境操作手冊

> **分類：** Claude / 系統
> **標籤：** `#Claude` `#系統` `#環境` `#Skills` `#Ruflo`
> **建立：** 2026-05-08
> **來源：** `D:\Claude\CLAUDE.md`

---

## 環境概覽

`D:\Claude` 是 sanyoii 的 Claude Code 個人環境，兼作備份與還原 repo（Windows）。包含：

- Claude Code 執行檔與 `settings.json`
- 76 個 Skills 備份（`d:\Claude\.claude\skills\`）
- 還原腳本（`setup.ps1` / `setup.sh`）
- 子專案：`open-design/`、`ai-website-cloner/`、`autohedge-env/`、`hindsight/`、`vault/`
- 個人 Skill Marketplace（`my-marketplace/`）同步至 `sanyoii/claude-skills` GitHub

### Skills 兩層架構

| 層級 | 路徑 | 說明 |
|------|------|------|
| 使用中（active） | `C:\Users\sanyo\.claude\skills\` | Claude Code 實際載入 |
| 備份（git-tracked） | `d:\Claude\.claude\skills\` | 版本控制備份 |

修改 skill 後，兩個位置都要同步再 push。

---

## 環境還原

```powershell
# 一鍵完整還原（Windows）
pwsh -ExecutionPolicy Bypass -File D:\Claude\setup.ps1
```

前提：Claude Code Windows App、Git、Node.js、Python 已安裝。

---

## 日常維護指令

```powershell
# 同步 skills + settings 到 GitHub
cd d:\Claude
git add .claude/skills/ README.md settings.json
git commit -m "更新: <說明>"
git push

# 更新 claude-mem plugin 到最新版
gh repo clone thedotmack/claude-mem "$env:TEMP\claude-mem-latest"
$dst = "$env:USERPROFILE\.claude\plugins\marketplaces\thedotmack"
Copy-Item "$env:TEMP\claude-mem-latest\.claude-plugin" "$dst\.claude-plugin" -Recurse -Force
Copy-Item "$env:TEMP\claude-mem-latest\plugin" "$dst\plugin" -Recurse -Force
$env:CLAUDE_PLUGIN_ROOT = "$dst\plugin"
node "$dst\plugin\scripts\smart-install.js"

# 更新 Anthropic 官方 skills + Superpowers
git clone --depth 1 https://github.com/anthropics/skills "$env:TEMP\a-skills"
Copy-Item "$env:TEMP\a-skills\skills\*" "C:\Users\sanyo\.claude\skills\" -Recurse -Force
Copy-Item "$env:TEMP\a-skills\skills\*" "d:\Claude\.claude\skills\" -Recurse -Force
git clone --depth 1 https://github.com/obra/superpowers "$env:TEMP\superpowers"
Copy-Item "$env:TEMP\superpowers\skills\*" "C:\Users\sanyo\.claude\skills\" -Recurse -Force
Copy-Item "$env:TEMP\superpowers\skills\*" "d:\Claude\.claude\skills\" -Recurse -Force
```

---

## 子專案指令

### Open Design
```powershell
cd d:\Claude\open-design
pnpm tools-dev start web   # 啟動（查看輸出取得隨機 port）
pnpm tools-dev stop
pnpm tools-dev status
pnpm tools-dev logs
```

### AI Website Cloner
```powershell
cd d:\Claude\ai-website-cloner
claude --chrome            # 必須加 --chrome flag
# 然後輸入：/clone-website https://target.com
npm run dev                # 預覽結果 localhost:3000
```

### AutoHedge（Solana 交易 — 真實資金）
```powershell
cd d:\Claude\autohedge-env
.\Scripts\Activate.ps1
autohedge
# 設定檔：d:\Claude\autohedge-env\.env（絕對不要 commit）
```

---

## Ruflo — 多 Agent 協調平台

Ruflo 全域安裝於 `D:\Claude`，對所有子專案生效。設定：`.claude-flow/config.yaml`。預設模型：`claude-sonnet-4-6`。

### 狀態查詢
```powershell
npx ruflo@latest status          # 系統整體狀態
npx ruflo@latest agent list      # 列出 active agents
npx ruflo@latest memory stats    # 記憶體使用統計
npx ruflo@latest swarm status    # swarm 拓撲狀態
```

### Memory（跨 session 向量記憶）
```powershell
npx ruflo@latest memory store --key "topic" --value "content"
npx ruflo@latest memory retrieve --query "topic"
npx ruflo@latest memory search --query "keyword" --limit 10
npx ruflo@latest memory export --output memory-backup.json
npx ruflo@latest memory import --input memory-backup.json
```

### Swarm（多 Agent 並行）
```powershell
npx ruflo@latest swarm spawn --task "任務描述" --agents 5
npx ruflo@latest swarm spawn --task "..." --background
npx ruflo@latest swarm monitor
```

### SPARC（5 階段開發方法論）
```powershell
npx ruflo@latest sparc run --task "build feature X"   # 完整循環
npx ruflo@latest sparc spec      # Specification
npx ruflo@latest sparc pseudo    # Pseudocode
npx ruflo@latest sparc arch      # Architecture
npx ruflo@latest sparc refine    # Refinement
npx ruflo@latest sparc complete  # Completion
```

### Autopilot / Daemon / MCP
```powershell
npx ruflo@latest autopilot start --goal "目標描述"
npx ruflo@latest daemon start    # 背景 workers（audit/optimize/map）
npx ruflo@latest mcp start       # 啟動 MCP Server（~210 工具）
```

### 模型選擇原則

| 用 Sonnet（預設） | 用 Opus（`/fast`） |
|-------------------|-------------------|
| 日常開發、修 bug | 架構設計決策 |
| /query、/compile | 複雜多系統 debug |
| 文件生成 | 大型重構規劃 |
| Swarm 路由任務 | 深度研究綜合 |

---

## Skill 生態系架構

76 個 skills，分 5 個 marketplace 群組：

| 群組 | 數量 | 內容 |
|------|------|------|
| `chinese-arts` | 7 | 八字/紫微/奇門/歸藏 PPT/女媧/SSC |
| `design-tools` | 12 | 花叔 Design、frontend-design、canvas、pdf/docx/xlsx/pptx |
| `dev-workflow` | 29 | TDD、debugging、code-review、recursive-mode（9 子技能） |
| `ai-agents` | 10 | claude-api、gemini-api、subagent、make-plan/do、pathfinder |
| `google-cloud` | 12 | BigQuery、Cloud Run、GKE、Firebase、WAF guides |

claude-mem（8 skills）為獨立 Plugin，透過 `thedotmack` marketplace 安裝，提供 Worker Service（port 37777）、SQLite 記憶體與自動 hooks。

### 新增 Skill 到個人 Marketplace

1. 在 `d:\Claude\.claude\skills\<skill-name>\` 建立含 `SKILL.md` 的 skill
2. 複製到 `C:\Users\sanyo\.claude\skills\<skill-name>\`（啟用）
3. 複製到 `d:\Claude\my-marketplace\plugins\<group>\skills\<skill-name>\`
4. 若新群組，更新 `d:\Claude\my-marketplace\.claude-plugin\marketplace.json`
5. `git add . && git commit && git push` — `sanyoii/claude-skills` 自動更新

---

## 重要路徑速查

| 路徑 | 用途 |
|------|------|
| `C:\Users\sanyo\.claude\skills\` | Active skills（76 個） |
| `C:\Users\sanyo\.claude\commands\` | Active commands（2 個） |
| `C:\Users\sanyo\.claude\plugins\marketplaces\thedotmack\` | claude-mem plugin |
| `C:\Users\sanyo\.claude\plugins\marketplaces\sanyoii\` | Junction → `d:\Claude\my-marketplace\` |
| `d:\Claude\.claude\skills\` | Skill 備份（git-tracked） |
| `d:\Claude\.claude-flow/` | Ruflo 執行期資料、記憶體、logs |
| `d:\Claude\.claude-flow/config.yaml` | Ruflo 主設定 |
| `d:\Claude\Skill_origin\` | 原始 zip/來源檔 |

---

## 相關概念

- [[wiki/Claude/知識庫操作手冊]] — 此 Vault 的 LLM 編譯器操作規範

## 反向連結

_此文章記錄 D:\Claude 整體環境，是 Vault 以外所有工具的操作根文件。_
