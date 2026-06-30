---
source: "https://github.com/ripienaar/free-for-dev"
author: "ripienaar (R.I.Pienaar)"
stars: "126K+"
clipped: 2026-06-30
tags:
  - github/repo
  - developer-tools
  - awesome-list
  - free-tier
  - saas
---

# free-for-dev — 開發者免費 SaaS 資源清單

> **ripienaar/free-for-dev** | ⭐ 126,677 | 🍴 13,256 | 📝 無明確授權
> "A list of SaaS, PaaS and IaaS offerings that have free tiers of interest to devops and infradev"

---

## 一句話說明

全 GitHub 最大的開發者免費服務清單——由 1,600+ 位貢獻者人工維護，收錄 **1,226 個** SaaS/PaaS/IaaS 服務的免費方案細節，橫跨 **61 個分類**，從雲端基礎設施到 AI API、從 CI/CD 到 Email、從 CDN 到低代碼平台。目標使用者是 DevOps/SRE/後端工程師，幫助快速找到「不用付錢就能開始用」的工具。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 126,677 |
| Forks | 13,256 |
| 主要語言 | HTML（docsify 靜態站） |
| 授權 | 無明確 License |
| 建立時間 | 2015-03-18 |
| 最後推送 | 2026-06-29 |
| Open Issues | 0 |
| Open PRs | 1 |
| 最新 Release | 無（純內容專案） |
| Topics | `free-for-developers`, `awesome-list` |
| 首頁 | https://free-for.dev/ |
| 是否 Archived | 否 |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 9 |
| 總 Tokens | 60,304 |
| 壓縮模式 | 是（`--compress`） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| README.md | 57,852 | 95.9% |
| index.html | 861 | 1.4% |
| .github/PULL_REQUEST_TEMPLATE.md | 431 | 0.7% |
| CONTRIBUTING.md | 413 | 0.7% |
| AGENTS.md | 77 | 0.1% |

> 這是純「內容型」Repo——沒有任何程式邏輯，所有價值都在 README.md 這個巨型清單裡。

---

## 核心功能

- **61 大分類清單**：涵蓋 Major Cloud Providers、Source Code Repos、APIs/Data/ML、CI/CD、Testing、Security、Monitoring、DNS、PaaS、BaaS、IDE、Analytics、Generative AI 等
- **1,226 個服務條目**：每條列出服務名稱、免費方案具體內容（額度/限制/期限）
- **Docsify 文件站**：`free-for.dev` 提供搜尋、暗色模式、分類導航
- **嚴格社群審核**：PR 模板強制填寫、**明確拒絕 AI 生成的貢獻**（AGENTS.md + CLAUDE.md + CODE_OF_CONDUCT.md 三重聲明）
- **持續更新**：近 4 週仍有 28 次 commit，11 年歷史持續活躍

---

## 技術架構

```
free-for-dev/
├── README.md          ← 核心內容（57K tokens，61 分類 × 1226 條目）
├── index.html         ← Docsify 靜態站殼（vue.css + darklight theme）
├── CNAME              ← free-for.dev 自訂域名
├── CONTRIBUTING.md    ← 貢獻指南（拒絕 AI、拒絕 cPanel/DNS frontend/工具箱）
├── AGENTS.md          ← AI 貢獻禁令
├── CLAUDE.md          ← AI 貢獻禁令（同 AGENTS.md）
├── CODE_OF_CONDUCT.md ← 行為準則
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md  ← 強制 Checklist
└── .gitignore
```

| 層次 | 技術 |
|------|------|
| 前端 | Docsify（CDN 載入，無建置步驟） |
| 內容 | 單一 Markdown 文件（README.md） |
| 部署 | GitHub Pages + CNAME |
| 搜尋 | Docsify 內建搜尋插件 |
| 主題 | docsify-darklight-theme |
| 分析 | Google Analytics (G-DLYKZXPL9J) |

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | ripienaar, FatGrizzly, Skxxtz, thispsj, TraderStf, Reubend, staeff, clarmso, rizdaprasetya, BunnyNabbit | — |
| 近 4 週 commit | 28 | 🟢 活躍 |
| Release 頻率 | 無 Release（內容型專案不需要） | — |
| Issue open/close | 0 open | 🟢 極佳（維護者積極關閉） |
| 觀察者 | 1,776 | — |

---

## 社群口碑

> last30days 工具未安裝，以下基於 GitHub 指標與專案本身特徵分析。

**市場定位**：全 GitHub **排名前 50** 的超熱門專案（126K+ stars），是 `awesome-list` 類別的標竿之一。

**已知特色**：
- 維護者 ripienaar 對品質控管極嚴——拒絕 AI 生成 PR、拒絕 cPanel 型託管、拒絕臨時信箱服務、拒絕通用轉換工具
- 社群驅動（1,600+ 貢獻者）但核心維護者把關品質
- 11 年持續更新，未歸檔，近期 commit 密度穩定

**潛在問題**：
- 無明確開源授權（README 無 License badge，repo 未指定 License）
- 部分連結可能過期（1,226 個外部連結的維護壓力）

---

## 61 大分類速覽

| 分類群 | 包含分類 |
|--------|---------|
| 雲端基礎設施 | Major Cloud Providers, Cloud Management, IaaS, PaaS, BaaS, Web Hosting, DNS, Domain, Docker |
| 開發工具 | Source Code Repos, CI/CD, Code Quality, Code Search, Code Generation, IDE, Package Build, Low-code |
| 資料與 AI | APIs/Data/ML, Generative AI, Managed Data Services, Search |
| 監控與安全 | Monitoring, Log Management, Crash Handling, Security/PKI, Authentication, Privacy |
| 協作與管理 | Tools for Teams, Issue Tracking, CMS, Forms, Messaging/Streaming |
| 前端與設計 | Design/UI, Font, CDN/Protection, Analytics, Visitor Recording, Maps |
| 商業工具 | Email, Payment/Billing, Translation, Feature Toggles, Mobile Distribution |
| 其他 | Education, Dev Blogging, Commenting, Screenshots, Flutter, Remote Desktop, Miscellaneous |

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 📎 **高度相關**——求職/開發/側專案都會需要免費工具參考。可作為「工具選型速查」收入 wiki，但內容量巨大（57K tokens），不建議全文匯入 gbrain |
| **Claude Code** | 📎 這個 repo 的 AGENTS.md 明確禁止 AI 貢獻，不適合用 Claude Code 提交 PR。但可作為免費 API/服務的查詢參考（例如找免費 email API、免費 CI/CD 等） |
| **Automation** | 📎 可以定期檢查是否有新增的免費 AI API 或開發工具，但 repo 本身不提供程式化介面 |

---

## 安裝建議

📌 **參考收藏** — 這不是一個需要「安裝」的工具，而是一份持續更新的免費服務百科。建議：

1. **書籤 free-for.dev**：需要時直接搜尋
2. **不需要 clone**：9 個檔案、純內容，直接看網站更方便
3. **不要用 AI 提交 PR**：維護者會直接關閉並封鎖帳號

---

## 相關連結

- [[Tools/repo-intel|repo-intel Skill]] — 本報告分析工具
- [[Github/repos/anthropicsknowledge-work-plugins|knowledge-work-plugins]] — Anthropic 官方 plugins（部分服務可能有 free tier）
