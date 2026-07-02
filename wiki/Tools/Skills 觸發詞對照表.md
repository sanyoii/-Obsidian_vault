---
title: Skills 觸發詞對照表
created: 2026-06-30
updated: 2026-07-03
tags: [claude-code, skills, triggers, index]
---

# Skills 觸發詞對照表

> 135 個曾安裝 Claude Code Skills 的觸發詞完整清單（歷史記錄，含已移除項目）。
> Claude Code 靠 SKILL.md frontmatter 的 `description` 欄位路由觸發。
> ✅ 有觸發詞 ｜ ❌ 無觸發詞（需用 `/skill-name` 手動呼叫）｜ ⛔ 已移除
> 最後更新：2026-07-03（skills diet 147→55 後標註移除項目）

> ⚠️ **2026-07-03 skills diet**：user-level skills 147→55，移除 92 個。本表 ⛔ 標記的 skill 對應 folder 已刪除，若無 plugin 同名版則觸發詞失效；還原方式：`Copy-Item -Recurse d:\Claude\.claude\skills\<name> C:\Users\sanyo\.claude\skills\`。完整取捨依據見 `workspace/plans/skills-diet-proposal.md`。仍標 ✅ 但註記「plugin 提供」的（如 caveman、do、mem-search 等）觸發詞不受影響，照常可用。

---

## 📊 統計摘要

| 指標 | 數值 |
|------|------|
| 表列 Skills 數（歷史） | 135 |
| 現存 user-level | 55（另有本表未逐一收錄的 plugin/namespaced skills）|
| 本表已標 ⛔ 移除 | 72 |
| 觸發詞格式標準 | `Use when` + `Trigger keywords:` |
| 參考 Gold Standard | deck-ai-classroom |

---

## 🎞️ 投影片 / Deck（19 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| deck-ai-classroom | ✅ | AI小課堂, 教育圖文, 教學圖, 資訊圖, infographic, carousel, 社群圖文 |
| ~~deck-course-module~~ | ⛔ | [已移除 2026-07-03] 课程, 培训, workshop, training deck, course module, 教学 |
| ~~deck-dir-key-nav~~ | ⛔ | [已移除 2026-07-03] 极简, minimal keynote, monocolor, 大字报, kbd navigation |
| ~~deck-graphify-dark~~ | ⛔ | [已移除 2026-07-03] 知识图谱, graph deck, dark dev, force-directed, 暗底 |
| ~~deck-guizang-editorial~~ | ⛔ | [已移除 2026-07-03] 编辑, editorial, e-ink, 杂志, magazine deck, 墨水, guizang |
| ~~deck-obsidian-claude~~ | ⛔ | [已移除 2026-07-03] GitHub dark, purple gradient, developer tutorial, changelog |
| ~~deck-open-slide-canvas~~ | ⛔ | [已移除 2026-07-03] 自由画布, freeform, canvas, open-slide, 不绑模板, 作品集 |
| ~~deck-presenter-mode~~ | ⛔ | [已移除 2026-07-03] 提词器, presenter notes, teleprompter, speaker notes |
| ~~deck-product-launch~~ | ⛔ | [已移除 2026-07-03] 产品发布, product launch, keynote, 发布会, pricing, CTA |
| ~~deck-replit~~ | ⛔ | [已移除 2026-07-03] Replit, slides theme, helix, holm, vance, bevel |
| ~~deck-safety-alert~~ | ⛔ | [已移除 2026-07-03] 安全, safety alert, incident, risk, 事故复盘, hazard |
| ~~deck-tech-sharing~~ | ⛔ | [已移除 2026-07-03] 技术分享, tech talk, conference, engineering sharing, 代码演示 |
| ~~deck-xhs-post~~ | ⛔ | [已移除 2026-07-03] 小红书, xiaohongshu, Instagram carousel, 竖版图文, XHS |
| guizang-ppt | ✅ | 杂志风PPT, horizontal swipe deck, editorial magazine, e-ink presentation |
| ~~web-video-presentation~~ | ⛔ | [已移除 2026-07-03] 网页做视频, 口播稿变解说, B站/YouTube录屏, 产品demo |
| ~~GordenPPTSkill~~ | ⛔ | [已移除 2026-07-03] PPT, 幻灯片, 做PPT, 做简报, 演示文稿, presentation, 模板 |
| ~~frontend-slides~~ | ⛔ | [已移除 2026-07-03] build a presentation, convert PPT/PPTX to web, create slides |
| pptx | ✅ | create, read, edit PPTX files |
| ~~ppt-master~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫（SVG→DrawingML 管線） |

---

## 🎨 設計 / UI（18 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| design-taste-frontend | ✅ | landing page, portfolio, redesign, "tasteful", "anti-slop", "Awwwards-tier" |
| high-end-visual-design | ✅ | "high-end", "Awwwards", "Linear-tier", "Apple-esque", premium agency-level |
| minimalist-ui | ✅ | minimalist, editorial UI, bento grid, document-style, warm monochrome |
| design-fetch | ✅ | DESIGN.md, 品牌设计, brand guidelines, design system fetch, '/design-fetch' |
| ~~design-system~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫（Design Token 架構） |
| ~~huashu-design~~ | ⛔ | [已移除 2026-07-03] 做原型, 设计Demo, 交互原型, HTML演示, 动画Demo, 设计变体 |
| frontend-design | ✅ | build web components, pages, dashboards, React components |
| ~~web-design-engineer~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫 |
| ~~web-artifacts-builder~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫 |
| ~~brand-guidelines~~ | ⛔ | [已移除 2026-07-03] brand colors, style guidelines, visual formatting, Anthropic design |
| ~~canvas-design~~ | ⛔ | [已移除 2026-07-03] create a poster, piece of art, design, static piece |
| ui-ux-pro-max | ❌ | 需手動呼叫（161 色票、67 UI 風格） |
| ~~ui-styling~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫（Tailwind 客製化） |
| ~~theme-factory~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫 |
| redesign-existing-projects | ❌ | 需手動呼叫 |
| ~~claude-code-design-guide~~ | ⛔ | [已移除 2026-07-03] Claude Code internals, source architecture, QueryEngine, Context Engineering |
| ~~algorithmic-art~~ | ⛔ | [已移除 2026-07-03] generative art, algorithmic art, flow fields, particle systems |
| ~~excalidraw-diagram~~ | ⛔ | [已移除 2026-07-03] Excalidraw, 画图, 流程图, 思维导图, 可视化, diagram |

---

## 🔧 開發 / 分析（14 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| ~~understand~~ | ⛔ | [已移除 2026-07-03] "analyze codebase", "understand this project", architectural overview, /understand |
| ~~understand-dashboard~~ | ⛔ | [已移除 2026-07-03] view knowledge graph dashboard, "/understand-dashboard" |
| ~~understand-domain~~ | ⛔ | [已移除 2026-07-03] domain knowledge extraction, business flows, process maps |
| ~~understand-knowledge~~ | ⛔ | [已移除 2026-07-03] Karpathy-pattern LLM wiki, generate knowledge graph |
| ~~understand-chat~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫 |
| ~~understand-diff~~ | ⛔ | [已移除 2026-07-03] analyze git diffs, pull requests, what changed |
| ~~understand-explain~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫 |
| ~~understand-onboard~~ | ⛔ | [已移除 2026-07-03] generate onboarding guide for new team members |
| smart-explore | ✅ | token-optimized structural code search using tree-sitter AST（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| repo-intel | ✅ | GitHub URL, owner/repo, 分析repo, repo情報, explore codebase |
| repomix-explorer | ✅ | analyze repo, explore codebase, what's the structure |
| pathfinder | ✅ | find ideal path, unify duplicated systems, audit architecture（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| karpathy-guidelines | ✅ | writing/reviewing/refactoring code, avoid overcomplication |
| ~~zoom-out~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫 |

---

## 📝 知識 / 規劃（16 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| make-plan | ✅ | plan a feature, task, multi-step implementation（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| do | ✅ | execute, run, carry out a plan（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| executing-plans | ✅ | written implementation plan, separate session with checkpoints |
| writing-plans | ✅ | spec or requirements for multi-step task, before code |
| ~~writing-skills~~ | ⛔ | [已移除 2026-07-03] creating/editing/verifying skills before deployment |
| skill-creator | ✅ | create skill from scratch, edit, optimize, run evals |
| find-skills | ✅ | "how do I do X", "find a skill for X" |
| ~~agent-memory~~ | ⛔ | [已移除 2026-07-03] save, remember, recall, organize memories |
| mem-search | ✅ | "did we already solve this?", "how did we do X last time?"（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| book-to-skill | ✅ | study a document, apply author's frameworks |
| timeline-report | ✅ | timeline report, project history, development journey（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| ~~to-issues~~ | ⛔ | [已移除 2026-07-03] convert plan into issues, create implementation tickets |
| ~~to-prd~~ | ⛔ | [已移除 2026-07-03] create PRD from current context |
| subagent-driven-development | ✅ | independent tasks in current session |
| context-budget | ❌ | 需手動呼叫（context 用量審計） |
| ~~continuous-learning-v2~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫（instinct 學習系統） |

---

## 🧪 測試 / 品質（5 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| audit-skill | ✅ | "audit skill", "test this skill", "review skill quality", "check skill X" |
| tdd | ✅ | TDD, "red-green-refactor", test-driven development |
| systematic-debugging | ✅ | bug, test failure, unexpected behavior, before proposing fixes（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| skills-security-check | ✅ | "scan skills", "check skill safety", "audit skills", security issues |
| webapp-testing | ✅ | test webapp, browser test, Playwright, screenshot app, debug UI（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |

---

## 🔀 Git / Recursive（9 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| ~~contextual-commit~~ | ⛔ | [已移除 2026-07-03] committing code, finishing a task |
| using-git-worktrees | ✅ | feature work needing isolation, before executing plans |
| ~~recursive-mode~~ | ⛔ | [已移除 2026-07-03] recursive-mode runs, resuming, locking phase |
| ~~recursive-spec~~ | ⛔ | [已移除 2026-07-03] creating plan, spec, scope, requirements |
| ~~recursive-subagent~~ | ⛔ | [已移除 2026-07-03] delegated audit, review, bounded implementation |
| ~~recursive-review-bundle~~ | ⛔ | [已移除 2026-07-03] canonical delegated-review or audit handoff |
| ~~recursive-router~~ | ⛔ | [已移除 2026-07-03] route delegated audit/review work |
| ~~recursive-worktree~~ | ⛔ | [已移除 2026-07-03] recursive-mode isolated git worktree setup |
| ~~recursive-benchmark~~ | ⛔ | [已移除 2026-07-03] benchmark recursive-mode, compare recursive vs non-recursive |

---

## 🔄 工作流（6 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| brainstorming | ✅ | before any creative work, creating features, building components |
| dispatching-parallel-agents | ✅ | 2+ independent tasks without shared state |
| ~~finishing-a-development-branch~~ | ⛔ | [已移除 2026-07-03] implementation complete, all tests pass, integrate work |
| ~~receiving-code-review~~ | ⛔ | [已移除 2026-07-03] receiving code review feedback, before implementing suggestions |
| ~~requesting-code-review~~ | ⛔ | [已移除 2026-07-03] completing tasks, before merging, verify work |
| verification-before-completion | ✅ | about to claim work is complete, before committing |

---

## ☁️ Cloud / API（10 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| ~~claude-api~~ | ⛔ | [已移除 2026-07-03] imports anthropic/@anthropic-ai/sdk, Claude API, prompt caching |
| gemini-api | ✅ | Gemini, Vertex AI, Google Cloud, Agent Platform |
| ~~firecrawl-build~~ | ⛔ | [已移除 2026-07-03] feature needs data from the web |
| ~~firecrawl-build-scrape~~ | ⛔ | [已移除 2026-07-03] app has URL, needs markdown/HTML/screenshots |
| ~~firecrawl-build-search~~ | ⛔ | [已移除 2026-07-03] app needs discovery before extraction, query-based |
| ~~firecrawl-build-interact~~ | ⛔ | [已移除 2026-07-03] clicks, form fills, pagination, authentication-aware |
| ~~firecrawl-build-onboarding~~ | ⛔ | [已移除 2026-07-03] FIRECRAWL_API_KEY setup, SDK setup |
| ~~mcp-builder~~ | ⛔ | [已移除 2026-07-03] building MCP servers, FastMCP or TypeScript |
| ~~context7-mcp~~ | ⛔ | [已移除 2026-07-03] library docs, framework docs, API syntax |
| notebooklm-skill | ✅ | query NotebookLM notebooks, source-grounded answers |

---

## 📓 Obsidian（4 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| obsidian-cli | ✅ | interact with Obsidian vault, manage notes, search, plugin dev |
| obsidian-bases | ✅ | Bases 資料庫視圖 |
| obsidian-markdown | ✅ | wikilink, callout, frontmatter, Obsidian 語法 |
| obsidian-canvas-creator | ❌ | 需手動呼叫 |

---

## 🎬 媒體 / 文件（8 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| docx | ✅ | Word doc, .docx, tables of contents, headings |
| pdf | ✅ | PDF files |
| xlsx | ✅ | Excel, spreadsheet, .xlsx |
| ~~gimp-inkscape~~ | ⛔ | [已移除 2026-07-03] resize/crop/composite image, SVG, watermark, banner |
| ~~gpt-image-2~~ | ⛔ | [已移除 2026-07-03] 图像生成/编辑, 海报/UI/产品/信息图 |
| ~~slack-gif-creator~~ | ⛔ | [已移除 2026-07-03] animated GIFs for Slack |
| ~~nuwa-skill~~ | ⛔ | [已移除 2026-07-03] 需手動呼叫 |
| resume-architect | ❌ | 需手動呼叫（履歷優化） |

---

## 📖 內容 / 寫作（8 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| prompt-master | ✅ | writing/fixing/improving prompts for LLM, Cursor, Midjourney |
| stop-slop | ✅ | drafting/editing text, eliminate AI tells |
| ~~grill-me~~ | ⛔ | [已移除 2026-07-03] stress-test a plan, "grill me" |
| ~~grill-with-docs~~ | ⛔ | [已移除 2026-07-03] stress-test against domain model, update docs inline |
| ~~doc-coauthoring~~ | ⛔ | [已移除 2026-07-03] write documentation, proposals, technical specs |
| ~~internal-comms~~ | ⛔ | [已移除 2026-07-03] status reports, leadership updates, newsletters, incident reports |
| jane-finance | ✅ | 投資/理財/股票/景氣循環/ETF/CBDC/Jane |
| caveman | ✅ | "caveman mode", "less tokens", "be brief"（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |

---

## 🔮 命理（4 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| ~~bazi~~ | ⛔ | [已移除 2026-07-03] 八字, 四柱, 天干地支, 日主, 十神, 大运流年 |
| ~~bazi-skill~~ | ⛔ | [已移除 2026-07-03] 算八字, 看八字, 批八字, 排八字, bazi analysis |
| qimen-dunjia | ✅ | 奇門遁甲 |
| ziwei-doushu | ✅ | 紫微斗數 |

---

## ⚙️ 設定 / 其他（14 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| full-output-enforcement | ✅ | truncated output, incomplete code, "// rest of code", unabridged |
| last-word | ✅ | "/last-word", wrap up session, context ~40% full, handoff |
| using-superpowers | ✅ | starting any conversation, find and use skills |
| ~~write-a-skill~~ | ⛔ | [已移除 2026-07-03] create, write, build a new skill |
| triage | ✅ | create issue, triage, review bugs/feature requests |
| defuddle | ✅ | extract clean markdown from web pages, online docs |
| ~~kb-retriever~~ | ⛔ | [已移除 2026-07-03] 从知识库回答问题/检索信息/查资料 |
| ssc | ✅ | 建 Skill, 做 Agent, 加 Hook, 升級 Skill |
| resume-pdf-optimize | ✅ | convert HTML resume to PDF, fix page-break |
| version-bump | ❌ | 需手動呼叫（user-level 目錄已移除，功能由同名 plugin 提供，觸發詞不變） |
| agent-hygiene | ❌ | 需手動呼叫（$agent-hygiene 專用） |
| agent-reach | ❌ | 需手動呼叫（互聯網感知層） |

---

## 相關連結

- [[Claude Code 工具生態系儀表板]] — Apps/Skills/CLI 速查
- [[CLAUDE.md 架構與 Path-Scoped Rules]] — Skill 管理規則
- [[Skills 品質升級（Gold Standard/Baton/驗證腳本）]] — 品質工程
- [[addyosmani agent-skills 安裝紀錄]] — 32 Skills 來源
- [[huangwb8-skills — Claude Code Skill 開發流水線]] — auto-test 概念來源
