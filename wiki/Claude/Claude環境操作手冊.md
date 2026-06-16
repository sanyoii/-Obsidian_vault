# D:\Claude 環境操作手冊

> **分類：** Claude / 系統
> **標籤：** `#Claude` `#系統` `#環境` `#Skills` `#Ruflo`
> **建立：** 2026-05-08
> **最後更新：** 2026-06-04（135 Skills、5 Commands；移除 Open Design/AI Website Cloner/Hindsight；autohedge-env 已刪）
> **來源：** `D:\Claude\CLAUDE.md`

---

## 環境概覽

`D:\Claude` 是 sanyoii 的 Claude Code 個人環境，兼作備份與還原 repo（Windows）。包含：

- Claude Code 執行檔與 `settings.json`
- 135 個 Skills 備份（`d:\Claude\.claude\skills\`）+ 15 hyperframes
- 還原腳本（`setup.ps1` / `setup.sh`）
- 子專案：`obsidian/`、`job-crawler/`、`social-monitor/`、`careerbot/`、`ai-workshop/`、`ai-video-pipeline/`、`open-slide/`、`hd-decode/`
- 個人 Skill Marketplace（`my-marketplace/`）同步至 `sanyoii/claude-skills` GitHub
- ⚠️ 已移除：open-design（2GB）、ai-website-cloner（508MB）、hindsight（1.3GB）；autohedge-env venv 已刪（1.5GB）

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

### Job Crawler（職缺海巡）
```powershell
cd d:\Claude\active\job-crawler
python app.py   # Flask UI at http://localhost:5000
python crawler.py   # 手動抓取一次
```

### Social Monitor（社群海巡）
```powershell
cd d:\Claude\active\social-monitor
python run.bat   # 手動執行；自動排程 10:30 + 22:00
```

### AutoHedge（Solana 交易 — ⚠️ venv 已刪，需重建）
```powershell
# 重建 venv
python -m venv d:\Claude\autohedge-env
d:\Claude\autohedge-env\Scripts\Activate.ps1
pip install autohedge
# 填入 API Keys：d:\Claude\autohedge.env.example → .env
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

135 個 Skills（+ 15 hyperframes），分 5 個 marketplace 群組：

| 群組 | 數量 | 內容 |
|------|------|------|
| `chinese-arts` | 7 | 八字/紫微/奇門/歸藏 PPT/女媧/SSC |
| `design-tools` | 13+ | 花叔 Design、frontend-design、canvas、pdf/docx/xlsx/pptx、html-ppt、deck-* |
| `dev-workflow` | 30+ | TDD、debugging、code-review、recursive-mode（9 子技能）、book-to-skill |
| `ai-agents` | 10 | claude-api、gemini-api、subagent、make-plan/do、pathfinder |
| `google-cloud` | 13 | BigQuery、Cloud Run、GKE、Firebase、WAF guides |

hyperframes（15 Skills）安裝於 `C:\Users\sanyo\.agents\skills\`（HTML→MP4 影片製作）。
claude-mem（8 skills）為獨立 Plugin，透過 `thedotmack` marketplace 安裝，提供 Worker Service（port 37777）、SQLite 記憶體與自動 hooks。

### 新增 Skill 到個人 Marketplace

1. 在 `d:\Claude\.claude\skills\<skill-name>\` 建立含 `SKILL.md` 的 skill
2. 複製到 `C:\Users\sanyo\.claude\skills\<skill-name>\`（啟用）
3. 複製到 `d:\Claude\infra\my-marketplace\plugins\<group>\skills\<skill-name>\`
4. 若新群組，更新 `d:\Claude\infra\my-marketplace\.claude-plugin\marketplace.json`
5. `git add . && git commit && git push` — `sanyoii/claude-skills` 自動更新

---

## 重要路徑速查

| 路徑 | 用途 |
|------|------|
| `C:\Users\sanyo\.claude\skills\` | Active skills（135 個） |
| `C:\Users\sanyo\.agents\skills\` | hyperframes 等 15 個 |
| `C:\Users\sanyo\.claude\commands\` | Active commands（5 個） |
| `C:\Users\sanyo\.claude\plugins\marketplaces\thedotmack\` | claude-mem plugin |
| `C:\Users\sanyo\.claude\plugins\marketplaces\sanyoii\` | Junction → `d:\Claude\infra\my-marketplace\` |
| `d:\Claude\.claude\skills\` | Skill 備份（git-tracked） |
| `d:\Claude\.claude-flow/` | Ruflo 執行期資料、記憶體、logs |
| `d:\Claude\.claude-flow/config.yaml` | Ruflo 主設定 |
| `d:\Claude\infra\Skill_origin\` | 原始 zip/來源檔 |

---

## 相關概念

- [[wiki/Claude/知識庫操作手冊]] — 此 Vault 的 LLM 編譯器操作規範

## 反向連結

_此文章記錄 D:\Claude 整體環境，是 Vault 以外所有工具的操作根文件。_
