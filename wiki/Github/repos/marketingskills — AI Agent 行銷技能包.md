---
source: "https://github.com/coreyhaines31/marketingskills"
author: "coreyhaines31 (Corey Haines)"
stars: "35K+"
clipped: 2026-06-28
tags:
  - "github/repo"
  - "marketing"
  - "ai-agent"
  - "claude-code-plugin"
  - "skills"
---

## marketingskills — AI Agent 行銷技能包

> **coreyhaines31/marketingskills** | ⭐ 35K+ | 🍴 5,767 | 📝 MIT
> "Marketing skills for Claude Code and AI agents. CRO, copywriting, SEO, analytics, and growth engineering."

### 一句話說明

由行銷專家 Corey Haines 打造的 **45 個 AI Agent 行銷技能 + 51 個 CLI 工具 + 80+ 整合指南**，涵蓋 CRO、文案、SEO、廣告、社群、影片、社群行銷等完整行銷棧。設計給技術行銷人員和創辦人，透過 Claude Code / Codex / Cursor 等 AI Agent 執行行銷任務。

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 35,289 |
| Forks | 5,767 |
| 主要語言 | JavaScript |
| 授權 | MIT |
| 建立時間 | 2026-01-15 |
| 最後推送 | 2026-06-17 |
| 最新 Release | v2.5.1 (2026-06-17) |
| Topics | claude, codex, marketing |
| 首頁 | https://marketing-skills.com |

### 45 個行銷技能（7 大分類）

| 分類 | 技能 |
|------|------|
| **轉換優化** | cro, signup, onboarding, popups, paywalls |
| **內容與文案** | copywriting, copy-editing, cold-email, emails, social, image, video, sms |
| **SEO 與發現** | seo-audit, ai-seo, programmatic-seo, site-architecture, competitors, schema |
| **付費與投放** | ads, ad-creative |
| **測量與測試** | analytics, ab-testing |
| **留存** | churn-prevention, community-marketing, referrals, co-marketing, free-tools, lead-magnets |
| **策略與 GTM** | marketing-plan, marketing-psychology, customer-research, competitor-profiling, product-marketing, pricing, offers, launch, revops, sales-enablement, public-relations, directory-submissions, prospecting, content-strategy, aso |

### 技術架構

- **技能格式**：Agent Skills spec（Markdown + YAML frontmatter）
- **CLI 工具**：51 個零依賴 Node.js 腳本，涵蓋 GA4/Semrush/Mailchimp/Meta Ads/TikTok Ads 等
- **整合平台**：Claude Code / Codex / Cursor / Windsurf
- **插件系統**：`.claude-plugin/marketplace.json`
- **跨技能協作**：所有技能以 `product-marketing` 為中心上下文

### 安裝方式

```bash
# 全部安裝
npx skills add coreyhaines31/marketingskills

# 選擇性安裝
npx skills add coreyhaines31/marketingskills --skill social video copywriting ads

# Claude Code 插件
/plugin marketplace add coreyhaines31/marketingskills
```

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 380 |
| 總 Tokens | 688,675 |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| skills/marketing-plan/references/example-quietude.md | 16,710 | 2.4% |
| tools/REGISTRY.md | 8,026 | 1.2% |
| skills/directory-submissions/references/directory-list.md | 6,885 | 1.0% |
| skills/directory-submissions/references/submission-tracker-template.csv | 6,730 | 1.0% |
| skills/ad-creative/references/generative-tools.md | 6,077 | 0.9% |

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 5 | coreyhaines31, claude, basseko, bensabic, Jiliac | 核心維護者 + AI 協作 |
| 近 4 週 commit | 8, 4, 0, 0（共 12） | 穩定（v2.5 後暫歇） |
| Release 頻率 | 5 releases in 3 days (6/15-6/17) | 密集迭代後穩定 |
| Issue open | 11 | 低量，社群活躍度適中 |

### 虛擬歌手行銷適用性評估

#### 判定：⏳ 選擇性安裝

核心定位為 SaaS/B2B 行銷，但部分技能對虛擬歌手場景直接可用。

#### 直接適用的技能（可裝即用）

| 技能 | 虛擬歌手場景 | 適用度 |
|------|-------------|--------|
| **social** | IG/TikTok/YouTube 內容策略、短影音 hook 公式、內容支柱框架、粉絲互動 | ★★★★★ |
| **video** | AI MV 生成（Veo/Sora/Kling）、Programmatic Video（HyperFrames）、AI Avatar | ★★★★★ |
| **image** | AI 概念圖、專輯封面、社群圖片 | ★★★★ |
| **community-marketing** | Discord 粉絲社群建設、社群飛輪、Ambassador 計畫 | ★★★★★ |
| **content-strategy** | 內容日曆、內容支柱規劃 | ★★★★ |
| **copywriting** | 文案撰寫（Bio、宣傳文案、歌曲介紹） | ★★★★ |
| **ads / ad-creative** | 付費推廣（IG/TikTok/YouTube 廣告） | ★★★★ |
| **launch** | 新歌/專輯上線策略 | ★★★ |
| **public-relations** | 媒體曝光、記者 pitch | ★★★ |
| **co-marketing** | 與其他虛擬歌手/品牌合作 | ★★★ |

#### 需要大幅改造的技能

| 技能 | 問題 |
|------|------|
| **product-marketing** | 欄位完全是 SaaS 導向（定價、功能、ICP），需重寫為歌手人設/IP 定位 |
| **emails** | SaaS 歡迎序列框架可借用，但案例和模板要換 |
| **referrals** | 概念適用（粉絲推薦/分享機制），細節需調整 |

#### 完全缺失的關鍵領域

| 缺口 | 說明 |
|------|------|
| **音樂發行策略** | Spotify/Apple Music/KKBOX 上架、播放清單 pitching、Release Radar 優化 |
| **串流平台 SEO** | Spotify for Artists 優化、YouTube Music metadata |
| **Influencer 行銷** | 與 KOL/網紅合作、試聽推廣 |
| **Live Streaming** | 直播互動、虛擬演唱會 |
| **周邊商品** | Merch 策略（虛擬歌手週邊、NFT） |
| **粉絲經濟** | 會員制（Patreon/Fanbox）、分級粉絲權益 |
| **中文市場** | 小紅書/B 站/抖音策略、繁中/簡中在地化 |

#### 建議做法

```bash
# 選裝最有價值的 10 個技能
npx skills add coreyhaines31/marketingskills --skill social video image community-marketing content-strategy copywriting ads ad-creative launch public-relations
```

再自建 `virtual-singer-marketing` Skill 補上音樂發行、串流優化、粉絲經濟等缺口。

### 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 行銷策略文件可匯入 wiki/Marketing/；product-marketing.md 可作為歌手 IP 設定文件 |
| **Claude Code** | 高度相容 — 原生 `.claude-plugin` 支援，直接 `npx skills add` 安裝；與現有 Skills 系統完全對齊 |
| **現有 Skills** | social/video/community 與已有的 `hyperframes`、`gpt-image-2`、`last30days` 互補；不衝突 |
| **Automation** | CLI 工具可整合進 social-monitor 或自動排程（Buffer、Mailchimp 等） |

## 相關連結

- [[addyosmani-agent-skills — 生產級工程 Skills 套件]] — 同為 Agent Skills 生態系
- [[taste-skill]] — 前端設計 Skills（與行銷視覺素材互補）
- [[(參考)Winston774ai-music-channel-starter 半自動 AI 音樂 YouTube 頻道 Pipeline|ai-music-channel-starter]] — AI 音樂 YouTube Pipeline（互補）
