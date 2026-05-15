---
title: "sanyoii/awesome-codex-skills: A curated list of practical Codex skills for automating workflows across the Codex CLI and API."
source: "https://github.com/sanyoii/awesome-codex-skills"
author:
published:
created: 2026-05-14
description: "A curated list of practical Codex skills for automating workflows across the Codex CLI and API. - sanyoii/awesome-codex-skills"
tags:
  - "clippings"
---
## Awesome Codex Skills

[![Composio banner](https://github.com/sanyoii/awesome-codex-skills/raw/master/codex_cover_image.png)](https://dashboard.composio.dev/login?utm_source=Github&utm_medium=Youtube&utm_campaign=2025-11&utm_content=AwesomeCodexSkills)

A curated list of practical Codex skills for automating workflows across the Codex CLI and API.

> **Want skills that do more than generate text?** Codex can send emails, create issues, post to Slack, and take actions across 1000+ apps. [See how →](https://github.com/sanyoii/awesome-codex-skills/blob/master/connect)

---

## Quickstart: Add Skills to Codex

```
git clone https://github.com/ComposioHQ/awesome-codex-skills.git
cd awesome-codex-skills
# Install one or more skills into $CODEX_HOME/skills (defaults to ~/.codex/skills)
python skill-installer/scripts/install-skill-from-github.py --repo ComposioHQ/awesome-codex-skills --path meeting-notes-and-actions
```

The installer fetches the skill and places it in `$CODEX_HOME/skills/<skill-name>`. Restart Codex to pick up new skills.

### Manual install

1. Copy the desired skill folder (e.g., `./spreadsheet-formula-helper`) into `$CODEX_HOME/skills/` (defaults to `~/.codex/skills/`).
2. Restart Codex so it loads the new metadata.
3. In your next session, describe the task or mention the skill name; Codex will trigger matching skills based on their `description` frontmatter.

---

## Contents

## What Are Codex Skills?

Codex skills are modular instruction bundles that tell Codex how to execute a task the way you want it done. Each skill lives in its own folder with a `SKILL.md` that includes metadata (name + description) and step-by-step guidance. Codex reads the metadata to decide when to trigger a skill and loads the body only after it fires, keeping context lean.

## Skills

### Development & Code Tools

- [brooks-lint](https://github.com/hyhmrright/brooks-lint) - AI code reviews grounded in six classic engineering books — decay risk diagnostics with book citations, severity labels, and four analysis modes (PR review, architecture audit, tech debt, test quality). Install: `python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo hyhmrright/brooks-lint --path skills/brooks-lint --name brooks-lint`
- [bringyour-migration-auditor](https://github.com/unitedideas/bringyour-mcp/tree/main/skills/bringyour-migration-auditor) - Audit Claude Code to Codex harness migrations for AGENTS.md/CLAUDE.md scope, hooks, MCP config, skills, secrets, and validation notes. Install: `python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo unitedideas/bringyour-mcp --path skills/bringyour-migration-auditor --name bringyour-migration-auditor`
- [codebase-migrate/](https://github.com/sanyoii/awesome-codex-skills/blob/master/codebase-migrate) - Run large codebase migrations and multi-file refactors in reviewable batches with CI verification.
- [codebase-recon](https://github.com/yujiachen-y/codebase-recon-skill) - Analyze git history to understand a codebase before reading any code — surfaces hotspots, bug magnets, bus factor, momentum, and high-risk files (hotspot ∩ bug-magnet) via auto-scaled analysis. Install: `python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo yujiachen-y/codebase-recon-skill --path skills/codebase-recon --name codebase-recon`
- [create-plan/](https://github.com/sanyoii/awesome-codex-skills/blob/master/create-plan) - Quickly draft concise execution plans for coding tasks.
- [deploy-pipeline/](https://github.com/sanyoii/awesome-codex-skills/blob/master/deploy-pipeline) - End-to-end Stripe → Supabase → Vercel release pipelines with verify and rollback.
- [Emdash Skills](https://github.com/megabytespace/claude-skills) - 14-category autonomous product-building OS: CF Workers + Hono + Angular + D1 + Stripe. One-line prompts to deployed SaaS with 94 reference docs, 18 agents, and Codex-native `.agents/skills/` support.
- [gh-address-comments/](https://github.com/sanyoii/awesome-codex-skills/blob/master/gh-address-comments) - Address review or issue comments on the open GitHub PR for the current branch using `gh`.
- [gh-fix-ci/](https://github.com/sanyoii/awesome-codex-skills/blob/master/gh-fix-ci) - Inspect failing GitHub Actions checks, summarize failures, and propose fixes.
- [mcp-builder/](https://github.com/sanyoii/awesome-codex-skills/blob/master/mcp-builder) - Build and evaluate MCP servers with best practices and an evaluation harness.
- [pr-review-ci-fix/](https://github.com/sanyoii/awesome-codex-skills/blob/master/pr-review-ci-fix) - Automated GitHub/GitLab PR review plus CI auto-fix loop via the Composio CLI.
- [sentry-triage/](https://github.com/sanyoii/awesome-codex-skills/blob/master/sentry-triage) - Diagnose Sentry issues by mapping stack frames to local source — no copy-paste.
- [webapp-testing/](https://github.com/sanyoii/awesome-codex-skills/blob/master/webapp-testing) - Run targeted web app tests and summarize results.
- [AuraKit](https://github.com/smorky850612/Aurakit) - All-in-one skill framework: 46 modes, 23 sub-agents, 6-layer OWASP security, 10 lifecycle hooks, ~55% token savings. Install: `npx @smorky85/aurakit`
- [Vibe-Skills](https://github.com/foryourhealth111-pixel/Vibe-Skills) - Governed Codex skill harness for staged, test-driven work: routes 340+ skills through requirement freeze, plan approval, execution, verification evidence, and cross-session memory.

### Productivity & Collaboration

- [connect/](https://github.com/sanyoii/awesome-codex-skills/blob/master/connect) - Connect Codex to 1000+ apps via the Composio CLI for real actions (Slack, GitHub, Notion, etc.).
- [connect-apps/](https://github.com/sanyoii/awesome-codex-skills/blob/master/connect-apps) - Wire up Composio CLI connections for Claude and kick off app workflows from the shell.
- [issue-triage/](https://github.com/sanyoii/awesome-codex-skills/blob/master/issue-triage) - Triage Linear or Jira backlogs and run bug sweeps from the terminal.
- [linear/](https://github.com/sanyoii/awesome-codex-skills/blob/master/linear) - Manage issues, projects, and team workflows in Linear.
- [meeting-insights-analyzer/](https://github.com/sanyoii/awesome-codex-skills/blob/master/meeting-insights-analyzer) - Analyze meeting transcripts for themes, risks, and follow-ups.
- [meeting-notes-and-actions/](https://github.com/sanyoii/awesome-codex-skills/blob/master/meeting-notes-and-actions) - Turn meeting transcripts into summaries with decisions and owner-tagged action items.
- [internal-comms/](https://github.com/sanyoii/awesome-codex-skills/blob/master/internal-comms) - Craft internal announcements, updates, and stakeholder messaging.
- [invoice-organizer/](https://github.com/sanyoii/awesome-codex-skills/blob/master/invoice-organizer) - Normalize and extract invoice data for tracking and reporting.
- [notion-knowledge-capture/](https://github.com/sanyoii/awesome-codex-skills/blob/master/notion-knowledge-capture) - Convert chats or notes into structured Notion pages with proper linking.
- [notion-meeting-intelligence/](https://github.com/sanyoii/awesome-codex-skills/blob/master/notion-meeting-intelligence) - Prepare meeting materials with Notion context plus Codex research.
- [notion-research-documentation/](https://github.com/sanyoii/awesome-codex-skills/blob/master/notion-research-documentation) - Synthesize multiple Notion sources into briefs, comparisons, or reports with citations.
- [notion-spec-to-implementation/](https://github.com/sanyoii/awesome-codex-skills/blob/master/notion-spec-to-implementation) - Turn Notion specs into implementation plans, tasks, and progress tracking.
- [support-ticket-triage/](https://github.com/sanyoii/awesome-codex-skills/blob/master/support-ticket-triage) - Triage customer support tickets with categories, priority, next actions, and draft replies.
- [file-organizer/](https://github.com/sanyoii/awesome-codex-skills/blob/master/file-organizer) - Organize, rename, and tidy files to keep workspaces clean.
- [paperjsx/](https://github.com/sanyoii/awesome-codex-skills/blob/master/paperjsx) - Generate PPTX presentations, DOCX documents, XLSX spreadsheets, and PDF invoices/reports/charts from structured JSON. Runs locally via `@paperjsx/mcp-server` — no API key, no network calls.
- [skill-share/](https://github.com/sanyoii/awesome-codex-skills/blob/master/skill-share) - Share skills and reusable instructions across teammates.

### Communication & Writing

- [codex-sms-verification](https://github.com/virtualsms-io/codex-sms-verification) - External repo: real-SIM SMS verification for AI agents via VirtualSMS MCP. 145+ countries, 2000+ services, both hosted (mcp.virtualsms.io) and local stdio transports.
- [email-draft-polish/](https://github.com/sanyoii/awesome-codex-skills/blob/master/email-draft-polish) - Draft, rewrite, or condense emails for the right tone and audience.
- [changelog-generator/](https://github.com/sanyoii/awesome-codex-skills/blob/master/changelog-generator) - Create clear changelogs from commits or summaries.
- [content-research-writer/](https://github.com/sanyoii/awesome-codex-skills/blob/master/content-research-writer) - Research and draft content with sourced citations.
- [diasporic-intelligence](https://github.com/MinistaJazz/diasporic-intelligence) - External repo: source-credit skill for consent-governed lineage AI with attribution, provenance, revocation, and non-impersonation boundaries.
- [novel-writing](https://github.com/wgwtest/novel-writing) - External repo: public Codex skill for fiction planning, chapter drafting, scene continuation, and revision.
- [tailored-resume-generator/](https://github.com/sanyoii/awesome-codex-skills/blob/master/tailored-resume-generator) - Tailor resumes to job descriptions with quantified impact.
- [unslop](https://github.com/MohamedAbdallah-14/unslop) - External repo: CLI and MCP server that removes AI writing patterns from text: tricolons, em-dash overuse, hedging stacks, and sycophancy openers. Works with Codex, Claude Code, Gemini CLI, and Cursor. Five intensity levels and a lint-only audit mode.

### Data & Analysis

- [spreadsheet-formula-helper/](https://github.com/sanyoii/awesome-codex-skills/blob/master/spreadsheet-formula-helper) - Write and debug spreadsheet formulas, pivots, and array formulas.
- [competitive-ads-extractor/](https://github.com/sanyoii/awesome-codex-skills/blob/master/competitive-ads-extractor) - Analyze competitor ads and extract structured insights.
- [datadog-logs/](https://github.com/sanyoii/awesome-codex-skills/blob/master/datadog-logs) - Filter Datadog logs from the shell via the Composio CLI, with JSON-friendly output and digest workflows.
- [developer-growth-analysis/](https://github.com/sanyoii/awesome-codex-skills/blob/master/developer-growth-analysis) - Analyze Codex chat history for coding patterns and learning gaps.
- [lead-research-assistant/](https://github.com/sanyoii/awesome-codex-skills/blob/master/lead-research-assistant) - Research leads and enrich records with firmographic data.
- [domain-name-brainstormer/](https://github.com/sanyoii/awesome-codex-skills/blob/master/domain-name-brainstormer) - Brainstorm available domain names with criteria and checks.
- [raffle-winner-picker/](https://github.com/sanyoii/awesome-codex-skills/blob/master/raffle-winner-picker) - Randomly select winners with audit-friendly logs.
- [langsmith-fetch/](https://github.com/sanyoii/awesome-codex-skills/blob/master/langsmith-fetch) - Pull LangSmith project/test data for analysis.
- [helium-mcp/](https://github.com/sanyoii/awesome-codex-skills/blob/master/helium-mcp) - Search real-time news with bias scoring, get live market data, ML options pricing, and balanced news synthesis via MCP.

### Meta & Utilities

- [brand-guidelines/](https://github.com/sanyoii/awesome-codex-skills/blob/master/brand-guidelines) - Apply OpenAI/Codex brand colors and typography to artifacts.
- [agent-deep-links/](https://github.com/sanyoii/awesome-codex-skills/blob/master/agent-deep-links) - Build and validate deep links for Codex, Cursor, and VS Code with Slack-safe formatting and fallback guidance.
- [canvas-design/](https://github.com/sanyoii/awesome-codex-skills/blob/master/canvas-design) - Generate structured canvas layouts and design artifacts.
- [image-enhancer/](https://github.com/sanyoii/awesome-codex-skills/blob/master/image-enhancer) - Upscale and refine images with configurable presets.
- [slack-gif-creator/](https://github.com/sanyoii/awesome-codex-skills/blob/master/slack-gif-creator) - Generate GIFs for Slack with captions and styling.
- [theme-factory/](https://github.com/sanyoii/awesome-codex-skills/blob/master/theme-factory) - Create reusable theme tokens and palettes.
- [video-downloader/](https://github.com/sanyoii/awesome-codex-skills/blob/master/video-downloader) - Download and prepare videos for offline review.
- [template-skill/](https://github.com/sanyoii/awesome-codex-skills/blob/master/template-skill) - Starter template for building new skills.
- [skill-installer/](https://github.com/sanyoii/awesome-codex-skills/blob/master/skill-installer) - Helper scripts to install skills from curated lists or GitHub paths.
- [skill-creator/](https://github.com/sanyoii/awesome-codex-skills/blob/master/skill-creator) - Guidance for building effective Codex skills with progressive disclosure.

## Using Skills in Codex

- Skills live in `$CODEX_HOME/skills` (default `~/.codex/skills`). Each subfolder needs a `SKILL.md` with `name` and `description` frontmatter.
- After installing or updating a skill, restart Codex so it reloads metadata.
- In a session, describe the task naturally; Codex auto-triggers skills whose descriptions match the request. You can also mention a skill by name if you want it considered.
- To verify installation, list installed skills (`ls ~/.codex/skills`) and inspect metadata (`head ~/.codex/skills/<skill>/SKILL.md`).

## Creating Skills

Skill layout:

```
skill-name/
├── SKILL.md          # Required: instructions + YAML frontmatter
├── scripts/          # Optional: helper scripts for deterministic steps
├── references/       # Optional: long-form docs loaded only when needed
└── assets/           # Optional: templates or files used in outputs
```

Basic SKILL.md template:

```
---
name: my-skill-name
description: What the skill does and when Codex should use it.
---

# My Skill Name

Clear instructions and steps for Codex to execute the task.
```

Best practices:

- Keep the `description` exhaustive about when to trigger; keep the body focused on execution steps.
- Use progressive disclosure: put detailed references in `references/` and call them out from `SKILL.md` only when needed.
- Include scripts for repeatable or deterministic operations; mention when Codex should run them.
- Avoid extra docs (README, changelog) inside the skill folder to keep context lean.

## Contributing

PRs welcome. Add real, reusable skills, keep descriptions precise, and include any needed scripts or references. If you add new skills, ensure the `description` clearly states when Codex should trigger and test that metadata fits within context limits.

## Join the Community

- [Join our Discord](https://discord.com/invite/composio) - Chat with other developers building Codex skills.
- [Follow on X](https://twitter.com/composio) - Updates on new skills and features.
- Questions? [support@composio.dev](mailto:support@composio.dev)

## Resources

- [Top Codex Skills](https://composio.dev/content/top-codex-skills)

---

**Join thousands of developers building agents that ship**