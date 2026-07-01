---
source: "https://github.com/wshobson/agents"
author: "wshobson (Seth Hobson)"
stars: "37K+"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "claude-code"
  - "python"
  - "skills"
  - "agents"
---

# wshobson/agents — python-development Plugin

> **wshobson/agents** | ⭐ 37K+ | 🍴 4K+ | 📝 MIT  
> "Multi-harness agentic plugin marketplace for Claude Code, Codex CLI, Cursor, OpenCode, GitHub Copilot, and Gemini CLI"

---

## 一句話說明

wshobson/agents 是一個多平台 Plugin Marketplace（88 plugins / 194 agents / 158 skills / 106 commands），跨 Claude Code、Codex、Cursor、OpenCode、Gemini CLI、Copilot 六個平台原生支援。`python-development` 是其中最完整的 Python 插件，包含 3 個 Python 專家 Agent、16 個可按需載入的 Skills、1 個專案腳手架指令，覆蓋 Python 3.12+ 全棧開發。

---

## 專案概覽（wshobson/agents）

| 項目 | 數值 |
|------|------|
| Stars | 37,364 |
| Forks | 4,015 |
| 主要語言 | Python |
| 授權 | MIT |
| 建立時間 | 2025-07-24 |
| 最後推送 | 2026-06-29（昨天，極活躍） |
| Open Issues | 1 |
| Open PRs | 5 |
| Plugin 總數 | 88 個 |
| 首頁 | https://sethhobson.com |

---

## python-development Plugin 詳細內容（v1.2.3）

### 安裝指令

```bash
/plugin marketplace add wshobson/agents
/plugin install python-development
```

### 3 個 Python 專家 Agent

| Agent | 模型 | 定位 |
|-------|------|------|
| `python-pro` | Opus | Python 3.12+、uv、ruff、async、FastAPI、ML、DevOps 全能專家 |
| `django-pro` | Opus | Django 5.x 全棧、ORM、Django REST Framework 專家 |
| `fastapi-pro` | Opus | FastAPI 高性能 API、Pydantic v2、async 路由專家 |

### 16 個 Skills（按需載入）

| Skill | 說明 |
|-------|------|
| `async-python-patterns` | asyncio、aiohttp、並發模式 |
| `python-anti-patterns` | 常見反模式偵測與修正 |
| `python-background-jobs` | Celery、RQ、ARQ 背景任務 |
| `python-code-style` | ruff、PEP 8、現代風格規範 |
| `python-configuration` | pydantic-settings、dotenv、12-factor |
| `python-design-patterns` | GoF 設計模式 Python 實作 |
| `python-error-handling` | 自訂 Exception、結構化錯誤處理 |
| `python-observability` | 結構化日誌、APM、metrics |
| `python-packaging` | pyproject.toml、hatchling、PyPI 發布 |
| `python-performance-optimization` | profiling、cProfile、記憶體優化 |
| `python-project-structure` | src layout、模組化架構 |
| `python-resilience` | retry、circuit breaker、timeout 策略 |
| `python-resource-management` | context manager、資源清理 |
| `python-testing-patterns` | pytest、fixtures、mock、coverage |
| `python-type-safety` | mypy、pyright、Protocol、Generic |
| `uv-package-manager` | uv 全套：venv、add、run、lock |

### 1 個 `/python-scaffold` 指令

一鍵生成四種完整 Python 專案架構：

| 模板 | 內容 |
|------|------|
| FastAPI | src layout + routers + deps + Pydantic v2 + SQLAlchemy async |
| Django | config layout + env + psycopg3 + gunicorn |
| Library | hatchling + py.typed + src layout + PyPI 配置 |
| CLI | typer + rich + pyproject.toml scripts |

所有模板包含：uv 依賴管理、ruff 設定、pytest、.env.example、Makefile。

---

## 技術架構

```
wshobson/agents/
├── plugins/
│   ├── python-development/      ← 此 plugin
│   │   ├── agents/              ← python-pro / django-pro / fastapi-pro
│   │   ├── commands/            ← python-scaffold
│   │   └── skills/              ← 16 個 skills（含 references/details.md）
│   └── 87 其他 plugins...
├── docs/harnesses.md            ← 多平台支援矩陣
└── .claude-plugin/marketplace.json
```

**Tiered Model 策略：**
- Tier 0: Fable 5（最長任務）
- Tier 1: Opus（架構、安全、程式碼審查）
- Tier 2: 繼承使用者設定
- Tier 3: Sonnet（文件、測試、debug）
- Tier 4: Haiku（快速操作）

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **QA 工作** | ✅ `python-testing-patterns` 直接加值：pytest fixtures、mock 策略、coverage |
| **現有 Python 腳本** | ✅ `social_monitor_v2.py`、AI Pipeline 等可用 `python-error-handling` + `python-observability` 強化 |
| **uv 已裝** | ✅ `uv-package-manager` skill 與現有工具鏈完全對齊（你已用 uv 0.11.10） |
| **新 Python 專案** | ✅ `/python-scaffold` 可快速建立 FastAPI/CLI 專案架構 |
| **衝突風險** | 🟢 低。純 Skills + Agents，不動 hooks/settings |
| **Obsidian Vault** | 📌 可補充 wiki/Python/ 技術參考（目前無 Python 分類）|

---

## 安裝建議

**✅ 適合安裝**

優先使用的 5 個 Skills：
1. `python-testing-patterns` — QA 核心，pytest 策略直接套用
2. `uv-package-manager` — 現有環境已用 uv，加深掌握
3. `python-error-handling` — social-monitor 錯誤處理改善
4. `async-python-patterns` — social-monitor async 架構參考
5. `python-observability` — 自動化腳本加入結構化日誌

`python-pro` Agent 以 Opus 跑，適合架構設計與複雜重構時使用（留意成本）。

---

## 相關連結

- [[Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件|addyosmani/agent-skills]] — 另一個大型 Skills 庫
- [[Github/repos/f-prompts.chat — 全球最大開源 AI Prompt 庫 + Claude Code 插件|f/prompts.chat]] — Prompt 探索工具
