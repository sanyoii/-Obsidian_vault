---
source: "https://github.com/santifer/career-ops"
author: "santifer (Santiago Fernández de Valderrama)"
stars: "55K+"
clipped: 2026-06-25
tags:
  - "github/repo"
  - "job-search"
  - "claude-code"
  - "ai-agent"
  - "career"
  - "automation"
---

## career-ops — AI 驅動的求職自動化指揮系統

> **santifer/career-ops** | ⭐ 55K+ | 🍴 11K+ | 📝 MIT
> "AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, PDF generation, batch processing."

---

### 一句話說明

Career-ops 是一套以 AI 編程 CLI（Claude Code / Gemini / Codex / OpenCode 等）為核心的全方位求職管線工具。幫求職者從數百個職缺中篩選出值得投遞的機會，自動產生 ATS 優化的客製化 CV，追蹤所有申請狀態。作者本人用它評估了 740+ 份職缺、產出 100+ 份客製 CV，最終拿到 Head of Applied AI 職位。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 55,688 |
| Forks | 10,995 |
| 主要語言 | JavaScript（698K）+ Go（154K）+ Shell（30K） |
| 授權 | MIT |
| 建立時間 | 2026-04-04 |
| 最新 Release | v1.13.0（2026-06-25） |
| Topics | ai-agent, anthropic, automation, career, claude-code, cli, golang, interview-prep, job-search, resume |
| 首頁 | https://career-ops.org |
| 媒體報導 | WIRED、Business Insider、Product Hunt |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 271 |
| 總 Tokens | 569,675 |

#### 最大 Token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| test-all.mjs | 57,042 | 10.0% |
| CHANGELOG.md | 19,299 | 3.4% |
| templates/portals.example.yml | 13,984 | 2.5% |
| dashboard/internal/ui/screens/pipeline.go | 11,750 | 2.1% |
| scan.mjs | 10,197 | 1.8% |

---

### 核心功能

- **Auto-Pipeline**：貼上職缺 URL，一鍵完成評估 + PDF 產出 + 追蹤器登錄
- **A-F 六區塊評估**：角色摘要、CV 匹配度、等級策略、薪酬研究、個人化建議、面試準備（STAR+R），附 Block G 職缺真假檢測（反詐騙/幽靈職缺）
- **ATS PDF 產生器**：Playwright + HTML 模板，Space Grotesk + DM Sans 設計，關鍵字注入
- **Cover Letter 產生器**：研究驅動、四角度互動提問、審批關卡、A4 PDF
- **Portal Scanner**：45+ 公司預設（Anthropic/OpenAI/ElevenLabs/Retool/n8n...），支援 Ashby/Greenhouse/Lever/Wellfound/Workable 等 ATS
- **Batch 批次處理**：headless CLI worker 平行評估 10+ 份職缺
- **Dashboard TUI**：Go + Bubble Tea + Lipgloss（Catppuccin Mocha 主題），6 種篩選、4 種排序
- **Interview Story Bank**：跨評估累積 STAR+Reflection 故事，5-10 個主故事應對所有行為面試
- **薪資談判腳本**：框架化的談判策略、地理折扣反擊、競爭 Offer 槓桿
- **多語系**：13 國語言 README + modes 翻譯（含繁體中文）
- **多 CLI 支援**：Claude Code / OpenCode / Gemini(Antigravity) / Codex / Qwen / Grok Build / GitHub Copilot

---

### 技術架構

```
career-ops/
├── AGENTS.md / CLAUDE.md      ← Agent 指令層（所有 CLI 共用 AGENTS.md）
├── modes/                     ← 15+ Skill 模式（Markdown 驅動）
│   ├── _shared.md             ← 共用 context
│   ├── _profile.md            ← 使用者個人化（User Layer）
│   └── {ar,da,de,fr,ja,pl,pt,ru,tr,ua,zh}/  ← 多語系
├── providers/                 ← ATS 爬蟲模組（15 個）
│   ├── greenhouse / ashby / lever / workday / workable / ...
│   └── _http.mjs              ← HTTP 共用傳輸層
├── dashboard/                 ← Go TUI（Bubble Tea）
├── templates/                 ← CV/Cover Letter HTML + portals YAML
├── batch/                     ← 批次處理 orchestrator
├── scaffolder/                ← npx init 安裝器
└── *.mjs                      ← 各類腳本（scan/tracker/dedup/pdf/...）
```

| 層次 | 技術 |
|------|------|
| Agent 引擎 | Claude Code / 任何 AI CLI |
| PDF 產生 | Playwright + HTML 模板 |
| Portal 掃描 | Playwright + ATS REST API |
| Dashboard | Go + Bubble Tea + Lipgloss |
| 資料層 | Markdown 表格 + YAML + TSV |
| 套件管理 | npm (Node.js) |

---

### 安裝

```bash
npx @santifer/career-ops init    # 安裝到 ./career-ops
cd career-ops
claude                           # 開啟 Claude Code
```

首次啟動會引導設定 CV、profile 和目標角色。

---

### 相關連結

- [[Ashby Support Engineer 求職]]
- [[job-crawler 職缺海巡系統]]
- [[CareerBot 求職助手]]
- 作者 Portfolio：https://github.com/santifer/cv-santiago
- Discord 社群：https://discord.gg/8pRpHETxa4
