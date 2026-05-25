---
source: "https://github.com/anthropics/knowledge-work-plugins"
author:
stars: "14,806"
clipped: 2026-05-25
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | ⭐ 14,806

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


---
source: "https://github.com/anthropics/knowledge-work-plugins"
author:
stars: "14,806"
clipped: 2026-05-25
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | ⭐ 14,806

---

## Description


## README
Plugins that turn Claude into a specialist for your role, team, and company. Built for [Claude Cowork](https://claude.com/product/cowork), also compatible with [Claude Code](https://claude.com/product/claude-code).

## Why PluginsCowork lets you set the goal and Claude delivers finished, professional work. Plugins let you go further: tell Claude how you like work done, which tools and data to pull from, how to handle critical workflows, and what slash commands to expose — so your team gets better and more consistent outcomes.

Each plugin bundles the skills, connectors, slash commands, and sub-agents for a specific job function. Out of the box, they give Claude a strong starting point for helping anyone in that role. The real power comes when you customize them for your company — your tools, your terminology, your processes — so Claude works like it was built for your team.

## Plugin MarketplaceWe're open-sourcing 11 plugins built and inspired by our own work:

| Plugin                                                                                                | How it helps                                                                                                                                                   | Connectors                                                                                             |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **[productivity](/anthropics/knowledge-work-plugins/blob/main/productivity)**                         | Manage tasks, calendars, daily workflows, and personal context so you spend less time repeating yourself.                                                      | Slack, Notion, Asana, Linear, Jira, Monday, ClickUp, Microsoft 365                                     |
| **[sales](/anthropics/knowledge-work-plugins/blob/main/sales)**                                       | Research prospects, prep for calls, review your pipeline, draft outreach, and build competitive battlecards.                                                   | Slack, HubSpot, Close, Clay, ZoomInfo, Notion, Jira, Fireflies, Microsoft 365                          |
| **[customer-support](/anthropics/knowledge-work-plugins/blob/main/customer-support)**                 | Triage tickets, draft responses, package escalations, research customer context, and turn resolved issues into knowledge base articles.                        | Slack, Intercom, HubSpot, Guru, Jira, Notion, Microsoft 365                                            |
| **[product-management](/anthropics/knowledge-work-plugins/blob/main/product-management)**             | Write specs, plan roadmaps, synthesize user research, keep stakeholders updated, and track the competitive landscape.                                          | Slack, Linear, Asana, Monday, ClickUp, Jira, Notion, Figma, Amplitude, Pendo, Intercom, Fireflies      |
| **[marketing](/anthropics/knowledge-work-plugins/blob/main/marketing)**                               | Draft content, plan campaigns, enforce brand voice, brief on competitors, and report on performance across channels.                                           | Slack, Canva, Figma, HubSpot, Amplitude, Notion, Ahrefs, SimilarWeb, Klaviyo                           |
| **[legal](/anthropics/knowledge-work-plugins/blob/main/legal)**                                       | Review contracts, triage NDAs, navigate compliance, assess risk, prep for meetings, and draft templated responses.                                             | Slack, Box, Egnyte, Jira, Microsoft 365                                                                |
| **[finance](/anthropics/knowledge-work-plugins/blob/main/finance)**                                   | Prep journal entries, reconcile accounts, generate financial statements, analyze variances, manage close, and support audits.                                  | Snowflake, Databricks, BigQuery, Slack, Microsoft 365                                                  |
| **[data](/anthropics/knowledge-work-plugins/blob/main/data)**                                         | Query, visualize, and interpret datasets — write SQL, run statistical analysis, build dashboards, and validate your work before sharing.                       | Snowflake, Databricks, BigQuery, Definite, Hex, Amplitude, Jira                                        |
| **[enterprise-search](/anthropics/knowledge-work-plugins/blob/main/enterprise-search)**               | Find anything across email, chat, docs, and wikis — one query across all your company's tools.                                                                 | Slack, Notion, Guru, Jira, Asana, Microsoft 365                                                        |
| **[bio-research](/anthropics/knowledge-work-plugins/blob/main/bio-research)**                         | Connect to preclinical research tools and databases (literature search, genomics analysis, target prioritization) to accelerate early-stage life sciences R&D. | PubMed, BioRender, bioRxiv, ClinicalTrials.gov, ChEMBL, Synapse, Wiley, Owkin, Open Targets, Benchling |
| **[cowork-plugin-management](/anthropics/knowledge-work-plugins/blob/main/cowork-plugin-management)** | Create new plugins or customize existing ones for your organization's specific tools and workflows.                                                            | —                                                                                                      |

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

##### knowledge-work-plugins 值得安裝嗎？

### 這個 Repo 是什麼

Anthropic 官方出品的「角色專用 Plugin 集」，主要為 **Claude Cowork**（claude.com/product/cowork，一個新的 SaaS 服務）設計，但也**相容 Claude Code**。

### 內容概覽（1,134 個檔案）

|Plugin|包含技能|適合誰|
|---|---|---|
|`engineering`|code-review, debug, standup, architecture, incident-response, deploy-checklist|**開發者 ✅**|
|`productivity`|task-management, memory-management, dashboard|**日常使用 ✅**|
|`data`|sql-queries, explore-data, build-dashboard, statistical-analysis|資料工作者|
|`product-management`|write-spec, roadmap-update, sprint-planning|PM|
|`marketing`|content-creation, campaign-plan, brand-review|行銷|
|`finance` / `legal` / `sales`|各種業務流程|企業用戶|
|`partner-built/zoom`|Zoom API 開發完整文件（800+ 個 skill files）|Zoom 開發者|
|`small-business`|現金流、CRM、稅務|小型企業主|

### 值得安裝的部分

**強烈推薦安裝 `engineering` Plugin 的這幾個 Skill：**

```bash
claude plugins add knowledge-work-plugins/engineering
```

包含：`/review`（安全+效能審查）、`/debug`（結構化除錯）、`/architecture`（ADR 格式）、`/standup`（每日進度）、`/incident`（事故應變）

這些 skill 的格式和你現有的 SKILL.md 一樣，可直接使用，不需要額外 MCP 連接器。

### 不建議安裝的部分

- **Zoom plugin**：佔了約 40% 的檔案量（Zoom 完整 SDK 文件），除非你在開發 Zoom 整合
- **sales / legal / finance**：業務導向，和你的用途完全不符
- **全部一口氣安裝**：這個 repo 體積龐大（1.65M token），會影響 context 效率

### 安裝注意事項

1. `claude plugins add` 指令是**新功能**，需確認你的 Claude Code 版本支援
2. Productivity 的 `memory-management` skill 和你的 gbrain 系統有功能重疊，安裝前評估是否需要
3. 大多數「supercharged」功能需要連接 Slack/Linear/GitHub MCP，你已有的環境若未設定這些，僅有基礎功能

### 結論

**建議只挑選 `engineering` plugin 安裝**，對你最有用的是程式碼審查、除錯、架構決策這幾個 skill。Zoom、sales、finance 等可直接略過。