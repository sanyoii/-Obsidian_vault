---
title: "akseolabs-seo/cinematic-ui: A reasoning-first cinematic web design skill. Makes AI think like a film director — research a real film, extract its visual language, translate it into page narrative and composition. Not a style picker. A director's workflow.   讓 AI 像電影導演一樣思考的網站設計 Skill。研究真實電影語言、轉譯成頁面敘事與構圖。不是風格選單，是導演工作流。"
source: "https://github.com/akseolabs-seo/cinematic-ui"
author:
published:
created: 2026-05-14
description: "A reasoning-first cinematic web design skill. Makes AI think like a film director — research a real film, extract its visual language, translate it into page narrative and composition. Not a style picker. A director's workflow.   讓 AI 像電影導演一樣思考的網站設計 Skill。研究真實電影語言、轉譯成頁面敘事與構圖。不是風格選單，是導演工作流。 - akseolabs-seo/cinematic-ui"
tags:
  - "clippings"
---
## Cinematic UI

[![Cinematic UI Banner](https://github.com/akseolabs-seo/cinematic-ui/raw/master/docs/banner.svg)](https://github.com/akseolabs-seo/cinematic-ui/blob/master/docs/banner.svg)

A cross-agent skill for designing websites using a director-and-film research workflow.

[繁體中文](https://github.com/akseolabs-seo/cinematic-ui/blob/master/README.zh-TW.md) · [简体中文](https://github.com/akseolabs-seo/cinematic-ui/blob/master/README.zh-CN.md)

---

## Demo

cinematic.U-1775306676761.mp4<video src="https://github.com/user-attachments/assets/43343d78-9697-4d29-9387-2da72694f2fc" controls="controls"></video>

*No references provided. No instructions given. Director and film picked at random. Single-pass output.*

---

## What It Is

`cinematic-ui` is a skill package for AI coding agents (Claude Code, Codex, Cursor, Windsurf, Gemini, Copilot). It guides the agent through a structured workflow for building websites:

1. Pick a director and a specific film
2. Research that film's visual language (cinematography, lighting, rhythm, material)
3. Translate the research into web artifacts: `decisions.md`, `storyboard.md`, `compiled-spec.md`
4. Implement HTML / CSS / JS from the spec

The film is research input, not a spec sheet. The agent's job is to extract structural patterns from cinema and translate them into layout, composition, motion, and typography.

---

## Workflow

| Phase | Work | Output |
| --- | --- | --- |
| Phase 1 | Start questionnaire, choose director + film, uniqueness audit, research | `decisions.md` |
| Phase 2 | Site-wide cinematic grammar, per-page scene thesis, signature composition | `storyboard.md` |
| Phase 3 | Camera, interaction, composition, texture, typography per storyboard | `compiled-spec.md` |
| Phase 4 | Implement, add reduced-motion + responsive, run anti-garbage checks | HTML / CSS / JS |

Phase 2 internal order is fixed: site-wide grammar → per-page thesis → per-page composition → shared system.

---

## Supported Tools

| Tool | Entry File | Install Path |
| --- | --- | --- |
| Claude Code | [`CLAUDE.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/CLAUDE.md) | `~/.claude/skills/cinematic-ui` |
| Codex / ChatGPT | [`CODEX.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/CODEX.md) | `$CODEX_HOME/skills/cinematic-ui` |
| Cursor | [`.cursor/rules/cinematic-ui.mdc`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/.cursor/rules/cinematic-ui.mdc) | Auto-loaded on clone |
| Windsurf | [`.windsurf/rules/cinematic-ui.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/.windsurf/rules/cinematic-ui.md) | Auto-loaded on clone |
| GitHub Copilot | [`.github/copilot-instructions.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/.github/copilot-instructions.md) | Auto-loaded on clone |
| Gemini / Antigravity | [`GEMINI.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/GEMINI.md) | Read at project startup |
| Cross-tool | [`AGENTS.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/AGENTS.md) | Universal reference |

---

## Installation

### Claude Code

**Windows:**

```
git clone https://github.com/akseolabs-seo/cinematic-ui "$env:USERPROFILE\.claude\skills\cinematic-ui"
```

**macOS / Linux:**

```
git clone https://github.com/akseolabs-seo/cinematic-ui ~/.claude/skills/cinematic-ui
```

Invoke with `/cinematic-ui` inside Claude Code.

### Codex / ChatGPT

```
git clone https://github.com/akseolabs-seo/cinematic-ui $CODEX_HOME/skills/cinematic-ui
```

### Cursor / Windsurf / GitHub Copilot

```
git clone https://github.com/akseolabs-seo/cinematic-ui
```

The relevant rule files are already in place. No additional config needed.

---

## Suggested Prompt

```
Use cinematic-ui to build a homepage.
Pick the director and film yourself.
Research the director and film first if web access is available.
Run the Demo Uniqueness Protocol.
Do not reuse shells from previous demos.
```

---

## References Library

All reference data lives in `references/`, organized by phase. Load only what the current phase needs.

### Core Rule Files

| File | Purpose |
| --- | --- |
| [`references/library-index.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/references/library-index.md) | Which files to read per phase |
| [`references/premium-calibration.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/references/premium-calibration.md) | Self-check after director brief |
| [`references/anti-garbage.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/references/anti-garbage.md) | Common AI design degradation patterns |
| [`references/anti-convergence.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/references/anti-convergence.md) | Hash-based selection to prevent repeated shells |
| [`references/implementation-guardrails.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/references/implementation-guardrails.md) | Phase 3–4 build rules |
| [`references/reference-protocol.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/references/reference-protocol.md) | How to decompose a reference site without copying |
| [`references/output-templates.md`](https://github.com/akseolabs-seo/cinematic-ui/blob/master/references/output-templates.md) | Standard format templates per phase |

### Data Libraries

| File | Contents |
| --- | --- |
| `references/data/directors-200.md` | 200+ directors with films and visual style |
| `references/data/hero-archetypes.md` | 30 hero skeletons |
| `references/data/narrative-beats.md` | 25 narrative beats + 18 director arc templates |
| `references/data/section-functions.md` | 50 functional section types |
| `references/data/section-archetypes.md` | 91+ section skeletons |
| `references/data/dna-index.tsv` | Design DNA index of 1,486 sites |
| `references/data/design-dna-db.txt` | Site-level DNA data |
| `references/data/camera-shots-50.md` | 55 entrance and reveal behaviors |
| `references/data/interaction-effects-50.md` | 55+ hover / click / scroll interactions |
| `references/data/compositions.md` | 80 layout compositions |
| `references/data/visual-elements.md` | 40 visual decoration elements |
| `references/data/background-techniques.md` | 50+ hero background techniques |
| `references/data/typography-cinema.md` | 40+ text treatments |
| `references/data/color-grades.md` | 40+ film palette to UI token translations |
| `references/data/font-moods.md` | 30+ font pairings by tone |
| `references/data/textures.md` | 30+ surface techniques |

---

## Repository Structure

```
cinematic-ui/
├── SKILL.md                        ← main skill logic
├── skill.json                      ← universal skill manifest
├── CLAUDE.md                       ← Claude Code
├── AGENTS.md                       ← cross-tool shared reference
├── CODEX.md                        ← Codex / ChatGPT
├── GEMINI.md                       ← Gemini / Antigravity
├── .cursor/rules/                  ← Cursor rules (auto-loaded)
├── .windsurf/rules/                ← Windsurf rules (auto-loaded)
├── .github/copilot-instructions.md ← GitHub Copilot (auto-loaded)
├── agents/openai.yaml              ← OpenAI skill metadata
├── docs/                           ← banner, demo assets
└── references/
    ├── library-index.md
    ├── premium-calibration.md
    ├── anti-garbage.md
    ├── anti-convergence.md
    ├── implementation-guardrails.md
    ├── reference-protocol.md
    ├── output-templates.md
    └── data/                       ← 18 design data libraries
```

問:
這個repo能改成用在Facebook 或是IG上嗎?
A:
架構分析完畢。

---

**核心問題：** 三層平台綁定，缺一不可。

|層|Threads 專用|改 FB/IG 需要|
|---|---|---|
|API|`graph.threads.net/v1.0` in `fetch_threads.py`|換 `graph.facebook.com` / `graph.instagram.com`|
|DOM scraping|`chrome-selectors.md`（Threads 結構）|全部重寫，完全不同 DOM|
|知識庫|`psychology.md`、`algorithm.md` 描述 Threads 演算法邏輯|需重新研究 FB/IG ranking signals|

---

**Facebook 可行性：🟡 可改，工程量大**

- API 架構類似（同是 Meta Graph API）
- 但 FB 貼文（Page/個人）DOM 跟 Threads 完全不同
- 演算法邏輯不同（觸及、分享 > 回覆）
- 約 40-50% 重寫

**Instagram 可行性：🔴 困難**

- IG 以視覺為主，文字貼文模式不同
- IG API 限制更多（Graph API for IG 只給商業帳號）
- 核心 skills（analyze、draft、optimize）假設文字互動，IG 不適用
- 約 60-70% 重寫 + 邏輯重設計

---

**結論：** 可改但不划算。架構（tracker JSON、voice guide、skills pipeline）值得借鑑，但比起從頭針對 FB/IG 設計，改這個更麻煩。Threads 邏輯滲透太深。