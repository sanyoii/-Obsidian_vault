---
source: "https://github.com/anthropics/knowledge-work-plugins"
author:
stars: "13.5k"
clipped: 2026-05-24
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | ⭐ 13.5k

---

## Description


## README
Plugins that turn Claude into a specialist for your role, team, and company. Built for [Claude Cowork](https://claude.com/product/cowork), also compatible with [Claude Code](https://claude.com/product/claude-code).

## Why PluginsCowork lets you set the goal and Claude delivers finished, professional work. Plugins let you go further: tell Claude how you like work done, which tools and data to pull from, how to handle critical workflows, and what slash commands to expose — so your team gets better and more consistent outcomes.

Each plugin bundles the skills, connectors, slash commands, and sub-agents for a specific job function. Out of the box, they give Claude a strong starting point for helping anyone in that role. The real power comes when you customize them for your company — your tools, your terminology, your processes — so Claude works like it was built for your team.

## Plugin MarketplaceWe're open-sourcing 11 plugins built and inspired by our own work:

| Plugin | How it helps | Connectors |
| --- | --- | --- |
| **[productivity](/anthropics/knowledge-work-plugins/blob/main/productivity)** | Manage tasks, calendars, daily workflows, and personal context so you spend less time repeating yourself. | Slack, Notion, Asana, Linear, Jira, Monday, ClickUp, Microsoft 365 |
| **[sales](/anthropics/knowledge-work-plugins/blob/main/sales)** | Research prospects, prep for calls, review your pipeline, draft outreach, and build competitive battlecards. | Slack, HubSpot, Close, Clay, ZoomInfo, Notion, Jira, Fireflies, Microsoft 365 |
| **[customer-support](/anthropics/knowledge-work-plugins/blob/main/customer-support)** | Triage tickets, draft responses, package escalations, research customer context, and turn resolved issues into knowledge base articles. | Slack, Intercom, HubSpot, Guru, Jira, Notion, Microsoft 365 |
| **[product-management](/anthropics/knowledge-work-plugins/blob/main/product-management)** | Write specs, plan roadmaps, synthesize user research, keep stakeholders updated, and track the competitive landscape. | Slack, Linear, Asana, Monday, ClickUp, Jira, Notion, Figma, Amplitude, Pendo, Intercom, Fireflies |
| **[marketing](/anthropics/knowledge-work-plugins/blob/main/marketing)** | Draft content, plan campaigns, enforce brand voice, brief on competitors, and report on performance across channels. | Slack, Canva, Figma, HubSpot, Amplitude, Notion, Ahrefs, SimilarWeb, Klaviyo |
| **[legal](/anthropics/knowledge-work-plugins/blob/main/legal)** | Review contracts, triage NDAs, navigate compliance, assess risk, prep for meetings, and draft templated responses. | Slack, Box, Egnyte, Jira, Microsoft 365 |
| **[finance](/anthropics/knowledge-work-plugins/blob/main/finance)** | Prep journal entries, reconcile accounts, generate financial statements, analyze variances, manage close, and support audits. | Snowflake, Databricks, BigQuery, Slack, Microsoft 365 |
| **[data](/anthropics/knowledge-work-plugins/blob/main/data)** | Query, visualize, and interpret datasets — write SQL, run statistical analysis, build dashboards, and validate your work before sharing. | Snowflake, Databricks, BigQuery, Definite, Hex, Amplitude, Jira |
| **[enterprise-search](/anthropics/knowledge-work-plugins/blob/main/enterprise-search)** | Find anything across email, chat, docs, and wikis — one query across all your company's tools. | Slack, Notion, Guru, Jira, Asana, Microsoft 365 |
| **[bio-research](/anthropics/knowledge-work-plugins/blob/main/bio-research)** | Connect to preclinical research tools and databases (literature search, genomics analysis, target prioritization) to accelerate early-stage life sciences R&D. | PubMed, BioRender, bioRxiv, ClinicalTrials.gov, ChEMBL, Synapse, Wiley, Owkin, Open Targets, Benchling |
| **[cowork-plugin-management](/anthropics/knowledge-work-plugins/blob/main/cowork-plugin-management)** | Create new plugins or customize existing ones for your organization's specific tools and workflows. | — |

Install these directly from Cowork, browse the full collection here on GitHub, or build your own.

## Getting Started### CoworkInstall plugins from [claude.com/plugins](https://claude.com/plugins/).

### Claude Code# Add the marketplace first
claude plugin marketplace add anthropics/knowledge-work-plugins

# Then install a specific plugin
claude plugin install sales@knowledge-work-plugins

Once installed, plugins activate automatically. Skills fire when relevant, and slash commands are available in your session (e.g., `/sales:call-prep`, `/data:write-query`).

## How Plugins WorkEvery plugin follows the same structure:

```
plugin-name/
├── .claude-plugin/plugin.json   # Manifest
├── .mcp.json                    # Tool connections
├── commands/                    # Slash commands you invoke explicitly
└── skills/                      # Domain knowledge Claude draws on automatically
```

- **Skills** encode the domain expertise, best practices, and step-by-step workflows Claude needs to give you useful help. Claude draws on them automatically when relevant.
- **Commands** are explicit actions you trigger (e.g., `/finance:reconciliation`, `/product-management:write-spec`).
- **Connectors** wire Claude to the external tools your role depends on — CRMs, project trackers, data warehouses, design tools, and more — via [MCP servers](https://modelcontextprotocol.io/).

Every component is file-based — markdown and JSON, no code, no infrastructure, no build steps.

## Making Them YoursThese plugins are generic starting points. They become much more useful when you customize them for how your company actually works:

- **Swap connectors** — Edit `.mcp.json` to point at your specific tool stack.
- **Add company context** — Drop your terminology, org structure, and processes into skill files so Claude understands your world.
- **Adjust workflows** — Modify skill instructions to match how your team actually does things, not how a textbook says to.
- **Build new plugins** — Use the `cowork-plugin-management` plugin or follow the structure above to create plugins for roles and workflows we haven't covered yet.

As your team builds and shares plugins, Claude becomes a cross-functional expert. The context you define gets baked into every relevant interaction, so leaders and admins can spend less time enforcing processes and more time improving them.

## ContributingPlugins are just markdown files. Fork the repo, make your changes, and submit a PR.

--------------------------------------------
## anthropics/knowledge-work-plugins — 分析結論

這是 **Anthropic 官方維護的 Claude Code Plugin 範例庫（Marketplace）**，專門為企業「知識工作者」設計，用來擴充 Claude Code 的 `/install` 指令。

### 這個 Repo 是什麼

本質上是一個 **官方 Plugin 模板集合**，每個 plugin 裡包含：

- `skills/` — Claude Code Skills（SKILL.md 格式，即你已在用的技能）
- `commands/` — 斜線指令
- `agents/` — 子 Agent 定義
- `.mcp.json` — 搭配的 MCP Server 設定
- `.claude-plugin/plugin.json` — Plugin 元資料

---

### 包含的 Plugin 分類（15 個）

|分類|內容|
|---|---|
|**productivity**|行事曆、Email、待辦管理，與 Google/Slack 整合|
|**engineering**|code-review / debug / testing-strategy / incident-response 等 10 個 Skills|
|**data**|SQL / 資料分析 / 視覺化 / Dashboard 建立|
|**design**|UX、Design Critique、Accessibility Review 等|
|**sales**|開發客戶、通話準備、Deal 策略|
|**finance**|財務報表、Journal Entry、SOX 合規|
|**legal**|合約審查、NDA 分類、法律風險評估|
|**marketing**|品牌文案、SEO、Email 行銷序列|
|**human-resources**|績效考核、招募流程、Onboarding|
|**operations**|流程文件、風險評估、Runbook|
|**customer-support**|客服分類、升級處理、KB Article 撰寫|
|**enterprise-search**|跨工具搜尋（Email/Slack/文件統一搜尋）|
|**bio-research**|生醫研究（scRNA、Nextflow 流程、Allotrope 轉換）|
|**small-business**|小企業版（合約審查、利潤分析、支票核對）|
|**partner-built**|第三方貢獻：Zoom / Slack / Apollo / Common Room / Brand Voice|

---

### 值得你安裝嗎？

對於你目前的使用情境（個人開發者 + Obsidian 知識庫 + 求職 + 旅遊規劃），**大部分不直接適用**，但有幾個值得關注：

|Plugin|對你的價值|
|---|---|
|`engineering`|**值得看**：code-review / debug / testing-strategy Skills 可直接使用|
|`data`|中等：SQL 分析有時用得到|
|`cowork-plugin-management`|**特別值得看**：含「create-cowork-plugin」技能，教你自己做 Plugin|
|其他|企業場景為主，個人用途有限|

**安裝方式**（若要用 engineering plugin）：

```bash
/install anthropics/knowledge-work-plugins engineering
```