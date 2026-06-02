# obsidian-second-brain

> 把 Obsidian vault 變成跨 CLI（Claude Code / Codex / Gemini / OpenCode）的 AI-first 第二大腦。43 個 slash commands，免 API key 即可做網路研究。
>
> - Repo: https://github.com/eugeniughelbur/obsidian-second-brain
> - Stars: 1,984 | Forks: 222（2026-06）
> - 授權: MIT | Python | 2026-06-02 更新

---

## 安裝狀態（2026-06-02）

**選擇性安裝**：只取最有獨特價值的 3 個 commands，其餘 40 個與現有 Obsidian workflow 重疊太高。

| 項目 | 狀態 |
|------|------|
| Commands active path | `C:\Users\sanyo\.claude\commands\` |
| Commands backup path | `d:\Claude\.claude\commands\` |
| Repo（Python scripts） | `d:\Claude\obsidian-second-brain\` |
| Python deps（uv sync） | ✅ 已安裝 |
| uv 路徑 | `C:\Users\sanyo\AppData\Local\Microsoft\WinGet\Packages\astral-sh.uv_...` |
| `.env` 設定 | `d:\Claude\obsidian-second-brain\.env`（OBSIDIAN_VAULT_PATH 已設） |

### 已安裝的 Commands

| Command | 用途 |
|---------|------|
| `/obsidian-architect` | 掃描任意 codebase → 寫入維護式架構筆記到 vault |
| `/research` | 免 API key 網路研究（Wikipedia/HN/arXiv/Reddit），有 Perplexity key 時升級 |
| `/research-deep` | Vault-first 深度研究：先掃 vault 找 gap，再補充外部資料，傳播更新 |

---

## 用法

### `/obsidian-architect`

```bash
/obsidian-architect d:\Claude\ziwei
/obsidian-architect d:\Claude\job-crawler
```

輸出（寫入 `wiki/projects/<name>/Architecture/`）：
- `Architecture - Overview.md`（含 Mermaid 模組圖）
- `Architecture - <Module>.md`（每個核心模組）
- `Architecture - Key decisions.md`（從 commit 歷史挖掘）

**Sentinel 保護**：生成區塊用 `<!-- @generated:start/end -->` 包住，重跑只更新 generated 區塊，不碰手動編輯。

### `/research`

```bash
/research "AI memory tools"
/research --free "vector databases for RAG"     # 強制免費模式
/research --academic "transformer attention"    # 限學術來源
```

輸出：Summary、Key Facts（附 recency marker）、Timeline、Key Players、Contrarian Views、Sources，存至 `Research/Web/YYYY-MM-DD - <slug>.md`。

### `/research-deep`

```bash
/research-deep "distributed consensus algorithms"
```

1. 先掃 vault 現有知識，找 gap
2. 再做外部研究補充
3. 透過 `/obsidian-save` 傳播更新到相關人物/專案/想法筆記

---

## 底層架構

research scripts 位置：`d:\Claude\obsidian-second-brain\scripts\research\`

免費研究來源（無需 API key）：

| 來源 | 類型 |
|------|------|
| Wikipedia | 百科 |
| HackerNews | 技術討論 |
| arXiv | 學術論文 |
| Reddit | 社群討論 |
| OpenAlex / CrossRef | 學術引用 |
| DuckDuckGo | 網頁搜尋 |
| Lobsters | 技術新聞 |
| dev.to | 開發者文章 |

可選付費加強（設 `.env`）：Perplexity Sonar Pro、xAI Grok（X discourse）

---

## 與現有 Obsidian Workflow 的差異

現有 `d:\Claude\obsidian\CLAUDE.md` 已有完整的 `/compile`, `/query`, `/lint` 系統。

| 功能 | 現有 workflow | obsidian-second-brain |
|------|-------------|----------------------|
| 文件編譯→wiki | ✅ `/compile` | `/obsidian-ingest`（重疊） |
| 知識查詢 | ✅ `/query` + NotebookLM | `/research`（**獨特**：即時網路） |
| 矛盾偵測 | ✅ `/lint` | `/obsidian-reconcile`（重疊） |
| **Codebase 文件化** | ❌ 無 | ✅ `/obsidian-architect`（**獨特**） |
| **即時網路研究** | ❌ 無 | ✅ `/research` / `/research-deep`（**獨特**） |

---

## Windows 注意事項

- `uv` 需在 PATH 或用完整路徑呼叫
- commands 中的路徑已從 `~/Projects/personal/obsidian-second-brain/` 改為 `d:\Claude\obsidian-second-brain\`
- `OBSIDIAN_VAULT_PATH=d:\Claude\obsidian` 已設定於 `.env`
- research scripts 用 `uv run -m scripts.research.<name>` 執行，需從 repo 目錄執行

---

## Tags

#tools #claude-command #obsidian #research #architecture #knowledge-management
