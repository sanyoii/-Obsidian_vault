---
title: Skills 觸發詞對照表
created: 2026-06-30
updated: 2026-06-30
tags: [claude-code, skills, triggers, index]
---

# Skills 觸發詞對照表

> 135 個已安裝 Claude Code Skills 的觸發詞完整清單。
> Claude Code 靠 SKILL.md frontmatter 的 `description` 欄位路由觸發。
> ✅ 有觸發詞 ｜ ❌ 無觸發詞（需用 `/skill-name` 手動呼叫）
> 最後更新：2026-06-30（Phase 2 觸發詞批量升級後）

---

## 📊 統計摘要

| 指標 | 數值 |
|------|------|
| 總 Skills 數 | 135 |
| 有觸發詞 | ~115 (85%) |
| 無觸發詞 | ~20 (15%) |
| 觸發詞格式標準 | `Use when` + `Trigger keywords:` |
| 參考 Gold Standard | deck-ai-classroom |

---

## 🎞️ 投影片 / Deck（19 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| deck-ai-classroom | ✅ | AI小課堂, 教育圖文, 教學圖, 資訊圖, infographic, carousel, 社群圖文 |
| deck-course-module | ✅ | 课程, 培训, workshop, training deck, course module, 教学 |
| deck-dir-key-nav | ✅ | 极简, minimal keynote, monocolor, 大字报, kbd navigation |
| deck-graphify-dark | ✅ | 知识图谱, graph deck, dark dev, force-directed, 暗底 |
| deck-guizang-editorial | ✅ | 编辑, editorial, e-ink, 杂志, magazine deck, 墨水, guizang |
| deck-obsidian-claude | ✅ | GitHub dark, purple gradient, developer tutorial, changelog |
| deck-open-slide-canvas | ✅ | 自由画布, freeform, canvas, open-slide, 不绑模板, 作品集 |
| deck-presenter-mode | ✅ | 提词器, presenter notes, teleprompter, speaker notes |
| deck-product-launch | ✅ | 产品发布, product launch, keynote, 发布会, pricing, CTA |
| deck-replit | ✅ | Replit, slides theme, helix, holm, vance, bevel |
| deck-safety-alert | ✅ | 安全, safety alert, incident, risk, 事故复盘, hazard |
| deck-tech-sharing | ✅ | 技术分享, tech talk, conference, engineering sharing, 代码演示 |
| deck-xhs-post | ✅ | 小红书, xiaohongshu, Instagram carousel, 竖版图文, XHS |
| guizang-ppt | ✅ | 杂志风PPT, horizontal swipe deck, editorial magazine, e-ink presentation |
| web-video-presentation | ✅ | 网页做视频, 口播稿变解说, B站/YouTube录屏, 产品demo |
| GordenPPTSkill | ✅ | PPT, 幻灯片, 做PPT, 做简报, 演示文稿, presentation, 模板 |
| frontend-slides | ✅ | build a presentation, convert PPT/PPTX to web, create slides |
| pptx | ✅ | create, read, edit PPTX files |
| ppt-master | ❌ | 需手動呼叫（SVG→DrawingML 管線） |

---

## 🎨 設計 / UI（18 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| design-taste-frontend | ✅ | landing page, portfolio, redesign, "tasteful", "anti-slop", "Awwwards-tier" |
| high-end-visual-design | ✅ | "high-end", "Awwwards", "Linear-tier", "Apple-esque", premium agency-level |
| minimalist-ui | ✅ | minimalist, editorial UI, bento grid, document-style, warm monochrome |
| design-fetch | ✅ | DESIGN.md, 品牌设计, brand guidelines, design system fetch, '/design-fetch' |
| design-system | ❌ | 需手動呼叫（Design Token 架構） |
| huashu-design | ✅ | 做原型, 设计Demo, 交互原型, HTML演示, 动画Demo, 设计变体 |
| frontend-design | ✅ | build web components, pages, dashboards, React components |
| web-design-engineer | ❌ | 需手動呼叫 |
| web-artifacts-builder | ❌ | 需手動呼叫 |
| brand-guidelines | ✅ | brand colors, style guidelines, visual formatting, Anthropic design |
| canvas-design | ✅ | create a poster, piece of art, design, static piece |
| ui-ux-pro-max | ❌ | 需手動呼叫（161 色票、67 UI 風格） |
| ui-styling | ❌ | 需手動呼叫（Tailwind 客製化） |
| theme-factory | ❌ | 需手動呼叫 |
| redesign-existing-projects | ❌ | 需手動呼叫 |
| claude-code-design-guide | ✅ | Claude Code internals, source architecture, QueryEngine, Context Engineering |
| algorithmic-art | ✅ | generative art, algorithmic art, flow fields, particle systems |
| excalidraw-diagram | ✅ | Excalidraw, 画图, 流程图, 思维导图, 可视化, diagram |

---

## 🔧 開發 / 分析（14 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| understand | ✅ | "analyze codebase", "understand this project", architectural overview, /understand |
| understand-dashboard | ✅ | view knowledge graph dashboard, "/understand-dashboard" |
| understand-domain | ✅ | domain knowledge extraction, business flows, process maps |
| understand-knowledge | ✅ | Karpathy-pattern LLM wiki, generate knowledge graph |
| understand-chat | ❌ | 需手動呼叫 |
| understand-diff | ✅ | analyze git diffs, pull requests, what changed |
| understand-explain | ❌ | 需手動呼叫 |
| understand-onboard | ✅ | generate onboarding guide for new team members |
| smart-explore | ✅ | token-optimized structural code search using tree-sitter AST |
| repo-intel | ✅ | GitHub URL, owner/repo, 分析repo, repo情報, explore codebase |
| repomix-explorer | ✅ | analyze repo, explore codebase, what's the structure |
| pathfinder | ✅ | find ideal path, unify duplicated systems, audit architecture |
| karpathy-guidelines | ✅ | writing/reviewing/refactoring code, avoid overcomplication |
| zoom-out | ❌ | 需手動呼叫 |

---

## 📝 知識 / 規劃（16 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| make-plan | ✅ | plan a feature, task, multi-step implementation |
| do | ✅ | execute, run, carry out a plan |
| executing-plans | ✅ | written implementation plan, separate session with checkpoints |
| writing-plans | ✅ | spec or requirements for multi-step task, before code |
| writing-skills | ✅ | creating/editing/verifying skills before deployment |
| skill-creator | ✅ | create skill from scratch, edit, optimize, run evals |
| find-skills | ✅ | "how do I do X", "find a skill for X" |
| agent-memory | ✅ | save, remember, recall, organize memories |
| mem-search | ✅ | "did we already solve this?", "how did we do X last time?" |
| book-to-skill | ✅ | study a document, apply author's frameworks |
| timeline-report | ✅ | timeline report, project history, development journey |
| to-issues | ✅ | convert plan into issues, create implementation tickets |
| to-prd | ✅ | create PRD from current context |
| subagent-driven-development | ✅ | independent tasks in current session |
| context-budget | ❌ | 需手動呼叫（context 用量審計） |
| continuous-learning-v2 | ❌ | 需手動呼叫（instinct 學習系統） |

---

## 🧪 測試 / 品質（5 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| audit-skill | ✅ | "audit skill", "test this skill", "review skill quality", "check skill X" |
| tdd | ✅ | TDD, "red-green-refactor", test-driven development |
| systematic-debugging | ✅ | bug, test failure, unexpected behavior, before proposing fixes |
| skills-security-check | ✅ | "scan skills", "check skill safety", "audit skills", security issues |
| webapp-testing | ✅ | test webapp, browser test, Playwright, screenshot app, debug UI |

---

## 🔀 Git / Recursive（9 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| contextual-commit | ✅ | committing code, finishing a task |
| using-git-worktrees | ✅ | feature work needing isolation, before executing plans |
| recursive-mode | ✅ | recursive-mode runs, resuming, locking phase |
| recursive-spec | ✅ | creating plan, spec, scope, requirements |
| recursive-subagent | ✅ | delegated audit, review, bounded implementation |
| recursive-review-bundle | ✅ | canonical delegated-review or audit handoff |
| recursive-router | ✅ | route delegated audit/review work |
| recursive-worktree | ✅ | recursive-mode isolated git worktree setup |
| recursive-benchmark | ✅ | benchmark recursive-mode, compare recursive vs non-recursive |

---

## 🔄 工作流（6 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| brainstorming | ✅ | before any creative work, creating features, building components |
| dispatching-parallel-agents | ✅ | 2+ independent tasks without shared state |
| finishing-a-development-branch | ✅ | implementation complete, all tests pass, integrate work |
| receiving-code-review | ✅ | receiving code review feedback, before implementing suggestions |
| requesting-code-review | ✅ | completing tasks, before merging, verify work |
| verification-before-completion | ✅ | about to claim work is complete, before committing |

---

## ☁️ Cloud / API（10 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| claude-api | ✅ | imports anthropic/@anthropic-ai/sdk, Claude API, prompt caching |
| gemini-api | ✅ | Gemini, Vertex AI, Google Cloud, Agent Platform |
| firecrawl-build | ✅ | feature needs data from the web |
| firecrawl-build-scrape | ✅ | app has URL, needs markdown/HTML/screenshots |
| firecrawl-build-search | ✅ | app needs discovery before extraction, query-based |
| firecrawl-build-interact | ✅ | clicks, form fills, pagination, authentication-aware |
| firecrawl-build-onboarding | ✅ | FIRECRAWL_API_KEY setup, SDK setup |
| mcp-builder | ✅ | building MCP servers, FastMCP or TypeScript |
| context7-mcp | ✅ | library docs, framework docs, API syntax |
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
| gimp-inkscape | ✅ | resize/crop/composite image, SVG, watermark, banner |
| gpt-image-2 | ✅ | 图像生成/编辑, 海报/UI/产品/信息图 |
| slack-gif-creator | ✅ | animated GIFs for Slack |
| nuwa-skill | ❌ | 需手動呼叫 |
| resume-architect | ❌ | 需手動呼叫（履歷優化） |

---

## 📖 內容 / 寫作（8 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| prompt-master | ✅ | writing/fixing/improving prompts for LLM, Cursor, Midjourney |
| stop-slop | ✅ | drafting/editing text, eliminate AI tells |
| grill-me | ✅ | stress-test a plan, "grill me" |
| grill-with-docs | ✅ | stress-test against domain model, update docs inline |
| doc-coauthoring | ✅ | write documentation, proposals, technical specs |
| internal-comms | ✅ | status reports, leadership updates, newsletters, incident reports |
| jane-finance | ✅ | 投資/理財/股票/景氣循環/ETF/CBDC/Jane |
| caveman | ✅ | "caveman mode", "less tokens", "be brief" |

---

## 🔮 命理（4 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| bazi | ✅ | 八字, 四柱, 天干地支, 日主, 十神, 大运流年 |
| bazi-skill | ✅ | 算八字, 看八字, 批八字, 排八字, bazi analysis |
| qimen-dunjia | ✅ | 奇門遁甲 |
| ziwei-doushu | ✅ | 紫微斗數 |

---

## ⚙️ 設定 / 其他（14 個）

| Skill | 觸發 | 觸發詞摘要 |
|-------|------|-----------|
| full-output-enforcement | ✅ | truncated output, incomplete code, "// rest of code", unabridged |
| last-word | ✅ | "/last-word", wrap up session, context ~40% full, handoff |
| using-superpowers | ✅ | starting any conversation, find and use skills |
| write-a-skill | ✅ | create, write, build a new skill |
| triage | ✅ | create issue, triage, review bugs/feature requests |
| defuddle | ✅ | extract clean markdown from web pages, online docs |
| kb-retriever | ✅ | 从知识库回答问题/检索信息/查资料 |
| ssc | ✅ | 建 Skill, 做 Agent, 加 Hook, 升級 Skill |
| resume-pdf-optimize | ✅ | convert HTML resume to PDF, fix page-break |
| version-bump | ❌ | 需手動呼叫 |
| agent-hygiene | ❌ | 需手動呼叫（$agent-hygiene 專用） |
| agent-reach | ❌ | 需手動呼叫（互聯網感知層） |

---

## 相關連結

- [[Claude Code 工具生態系儀表板]] — Apps/Skills/CLI 速查
- [[CLAUDE.md 架構與 Path-Scoped Rules]] — Skill 管理規則
- [[Skills 品質升級（Gold Standard/Baton/驗證腳本）]] — 品質工程
- [[addyosmani agent-skills 安裝紀錄]] — 32 Skills 來源
- [[huangwb8-skills — Claude Code Skill 開發流水線]] — auto-test 概念來源
