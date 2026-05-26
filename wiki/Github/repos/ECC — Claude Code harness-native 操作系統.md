# ECC (Enhanced Claude Code)

> harness-native 的 AI Agent 操作系統。為 Claude Code、Codex、Cursor 等 AI 編程助理提供生產級強化套件：Skills + Agents + Hooks + Rules + 持續學習機制。

**Repo：** https://github.com/affaan-m/ECC  
**npm：** `ecc-universal`、`ecc-agentshield`  
**作者：** affaan-m（Anthropic Hackathon 冠軍）  
**授權：** MIT（OSS 永遠免費；ECC Pro $19/seat/mo 含 GitHub App）  
**規模：** 182K+ stars、28K+ forks、170+ contributors

---

## 一句話說明

不只是 config 檔——在 AI harness 之上疊加一層「操作員系統」：Skills + Agents + Hooks + Rules + 持續學習，生產級直接可用。

---

## 核心組成

| 元件 | 說明 | 規模 |
|------|------|------|
| Skills | 各領域技能（backend、security、ML、前端…）| 100+ |
| Agents | 專責 agent（architect、code-reviewer、chief-of-staff…）| 40+ |
| Commands | Slash commands（/learn、/checkpoint、/loop-start…）| 80+ |
| Rules | 語言規則（TypeScript/Python/Go/Java/Kotlin/Rust/C++…）| 12 語言 |
| Hooks | 生命週期 hooks（session start/stop、pre-bash、memory 存取）| 完整覆蓋 |

---

## 6 大核心能力

1. **Token 優化** — 模型選路、system prompt 瘦身、背景進程管理
2. **Memory 持久化** — hooks 自動跨 session 儲存/載入 context
3. **持續學習（Instincts）** — 自動從對話萃取 pattern，寫回可重用 skills
4. **Verification Loops** — checkpoint vs continuous eval，pass@k 指標
5. **平行化** — git worktrees、cascade method、多 instance 擴展
6. **AgentShield 安全掃描** — `/security-scan`，1282 測試、102 規則

---

## 支援 Harness

Claude Code · Codex · Cursor · OpenCode · Gemini · Zed · GitHub Copilot

---

## ECC2（v2 alpha）

`ecc2/` 資料夾：用 **Rust** 寫的新控制平面，有 TUI dashboard。
指令：`dashboard`、`start`、`sessions`、`status`、`stop`、`resume`、`daemon`。
目前 alpha，非正式發布。

---

## 安裝方式

```bash
# 推薦（Claude Code plugin）
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc

# 手動（minimal，不含 hooks）
./install.sh --profile minimal --target claude --without baseline:hooks

# 不確定裝什麼？
npx ecc consult "你的需求" --target claude
```

---

## 與現有環境的衝突評估

### 高風險衝突

| 元件 | 衝突點 |
|------|--------|
| `hooks-runtime` | ECC 的 SessionStart / UserPromptSubmit hooks 與現有 hooks 重疊執行 |
| Memory hooks | 自動讀寫 memory files，衝突現有 auto-memory 系統 |
| Stop-phase summary hook | 與現有 cc-statusline hook 重疊 |
| `continuous-learning` skill | 自動寫入 CLAUDE.md，破壞精心維護的設定 |
| `instinct-import/export` | 讀寫 CLAUDE.md / AGENTS.md |
| `configure-ecc` | 可能覆蓋 `.claude/settings.json` |

### 低風險（可安心使用）

- 語言 Rules（TypeScript、Python、Go…）— 路徑隔離，additive
- Domain skills（api-design、accessibility、benchmark…）— 沒有的那些可直接加
- Agent 定義 — 獨立載入，不干擾現有設定
- ecc2 TUI — 完全獨立程式

---

## Claude Code 隔離架構限制

| 元件 | 層級 | 可專案隔離？ |
|------|------|-------------|
| Skills | User-level `~/.claude/skills/` | ❌ 全域載入 |
| Hooks | Project-level `.claude/settings.json` | ✅ |
| Commands | Project-level `.claude/commands/` | ✅ |
| Rules | Project-level `.claude/rules/` | ✅ |
| Agents | Project-level `.claude/agents/` | ✅ |

> Skills 無法隔離是最大限制，真正完全隔離需要新 Windows 使用者帳號。

---

## 建議策略（待定）

- [ ] 用 `--profile minimal --without baseline:hooks` 裝 commands/rules/agents（project-level，安全）
- [ ] 手動挑選有用的 domain skills，單個複製測試
- [ ] **不裝** hooks-runtime、continuous-learning、instinct 系列
- [ ] 評估是否有值得加入的 agents（architect、code-reviewer 等）

---

## Tags

#tool #claude-code #skills #hooks #agents #harness #ecc #ai-operator
