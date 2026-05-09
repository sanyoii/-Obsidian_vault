---
title: "The unreasonable effectiveness of HTML"
source: "https://thariqs.github.io/html-effectiveness/?fbclid=IwY2xjawRr9FpleHRuA2FlbQIxMABicmlkETFac3VDaGlnSmltc0NpZ09Wc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHqrPMIlXms0FBWd8QRpYKAtBYyPHQ8-QRo7Jdz5MglyP57qE7xglR91TlgsU_aem_cfvgKHKFp8mGxyPd_NZSuQ"
author:
published:
created: 2026-05-09
description:
tags:
  - "clippings"
---
01

## Exploration & Planning

3 demos

When you're not sure what you want yet. Ask the agent to fan out across several directions and lay them next to each other so you can point at one — instead of reading three sequential walls of text and trying to hold them all in your head. And once you've picked, turn the pick into a plan the implementer can actually read.[Three code approaches](https://thariqs.github.io/html-effectiveness/01-exploration-code-approaches.html)

[

Side-by-side comparison of three ways to solve the same problem, with trade-offs called out inline.

01-exploration-code-approaches.html→

](https://thariqs.github.io/html-effectiveness/01-exploration-code-approaches.html)[

Visual design directions

A handful of layout and palette options rendered live so you can react to them, not imagine them.

02-exploration-visual-designs.html→

](https://thariqs.github.io/html-effectiveness/02-exploration-visual-designs.html)[

Implementation plan

Milestones on a timeline, a data-flow diagram, inline mockups, the risky code, and a risk table — the plan you hand off.

16-implementation-plan.html→

](https://thariqs.github.io/html-effectiveness/16-implementation-plan.html)

02

## Code Review & Understanding

3 demos

Diffs and call-graphs are spatial information; markdown flattens them. Let the agent render the change as an annotated diff, draw the module as boxes and arrows, or write the PR description your reviewers actually want — so the shape of the code is visible at a glance.[Annotated pull request](https://thariqs.github.io/html-effectiveness/03-code-review-pr.html)

[

A diff rendered with margin notes, severity tags and jump links — easier to scan than scrolling a terminal.

03-code-review-pr.html→

](https://thariqs.github.io/html-effectiveness/03-code-review-pr.html)[

PR writeup for reviewers

The author's side: motivation, before/after, a file-by-file tour with the *why*, and where to focus the review.

17-pr-writeup.html→

](https://thariqs.github.io/html-effectiveness/17-pr-writeup.html)[

Module map

An unfamiliar package drawn as boxes and arrows, with the hot path highlighted and entry points listed.

04-code-understanding.html→

](https://thariqs.github.io/html-effectiveness/04-code-understanding.html)

03

## Design

2 demos

HTML *is* the medium your design system ships in, so it's the natural format for talking about it. Tokens become swatches, components become contact sheets, and the artifact can be fed straight back into the next prompt.[Living design system](https://thariqs.github.io/html-effectiveness/05-design-system.html)

[

Colors, type scale and spacing tokens pulled from a repo and rendered as swatches you can copy from.

05-design-system.html→

](https://thariqs.github.io/html-effectiveness/05-design-system.html)[

Component variants

Every size, state and intent of one component laid out on a single sheet for review.

06-component-variants.html→

](https://thariqs.github.io/html-effectiveness/06-component-variants.html)

04

## Prototyping

2 demos

Motion and interaction can't be described, only felt. A throwaway page with the real easing curve or the real click-through tells you in five seconds what a paragraph of prose never could.[Animation sandbox](https://thariqs.github.io/html-effectiveness/07-prototype-animation.html)

[

The transition in isolation with sliders for duration and easing, so you can tune it before wiring it in.

07-prototype-animation.html→

](https://thariqs.github.io/html-effectiveness/07-prototype-animation.html)[

Clickable flow

Four screens linked together — enough fidelity to feel whether the interaction is right.

08-prototype-interaction.html→

](https://thariqs.github.io/html-effectiveness/08-prototype-interaction.html)

05

## Illustrations & Diagrams

2 demos

Inline SVG gives the agent a real pen. Ask for the figures for a post or a flowchart of a process and get vector art you can tweak by hand or paste straight into the final document.[SVG figure sheet](https://thariqs.github.io/html-effectiveness/10-svg-illustrations.html)

[

The diagrams for a blog post, drawn inline so they can be tweaked and copied out one by one.

10-svg-illustrations.html→

](https://thariqs.github.io/html-effectiveness/10-svg-illustrations.html)[

Annotated flowchart

A deploy pipeline drawn as a real flowchart — click any step to see what runs, timings, and failure paths.

13-flowchart-diagram.html→

](https://thariqs.github.io/html-effectiveness/13-flowchart-diagram.html)

06

## Decks

1 demo

A handful of `<section>` tags and twenty lines of JS is a slide deck. Point the agent at a Slack thread or a design doc and get something you can arrow-key through in a meeting — no Keynote, no export step.[Arrow-key slide deck](https://thariqs.github.io/html-effectiveness/09-slide-deck.html)

[

A short presentation as one HTML file. Left and right to navigate, no build step.

09-slide-deck.html→

](https://thariqs.github.io/html-effectiveness/09-slide-deck.html)

07

## Research & Learning

2 demos

An explainer with collapsible sections, tabbed code samples and a glossary in the margin reads very differently from the same words dumped linearly. The agent can build the scaffolding that makes a new topic navigable.[How a feature works](https://thariqs.github.io/html-effectiveness/14-research-feature-explainer.html)

[

"Explain rate limiting in this repo" — TL;DR box, collapsible request-path steps, tabbed config snippets, and an FAQ.

14-research-feature-explainer.html→

](https://thariqs.github.io/html-effectiveness/14-research-feature-explainer.html)[

Concept explainer

Consistent hashing taught with a live ring you can add/remove nodes from, a comparison table, and a hover-linked glossary.

15-research-concept-explainer.html→

](https://thariqs.github.io/html-effectiveness/15-research-concept-explainer.html)

08

## Reports

2 demos

Recurring documents — status updates, post-mortems — benefit most from a bit of structure and color. A small chart and a colored timeline turn something people skim into something they actually read.[Weekly status](https://thariqs.github.io/html-effectiveness/11-status-report.html)

[

What shipped, what slipped, and a small chart — formatted for a quick skim on Monday morning.

11-status-report.html→

](https://thariqs.github.io/html-effectiveness/11-status-report.html)[

Incident timeline

A post-mortem with a minute-by-minute timeline, log excerpts and the follow-up checklist.

12-incident-report.html→

](https://thariqs.github.io/html-effectiveness/12-incident-report.html)

09

## Custom Editing Interfaces

3 demos

Sometimes it's hard to describe what you want in a text box. Ask for a throwaway editor for the exact thing you're working on — and always end with an export button that turns whatever you did in the UI back into something you can paste into the agent or commit. You stay in the loop; the loop gets tighter.[Ticket triage board](https://thariqs.github.io/html-effectiveness/18-editor-triage-board.html)

[

Drag thirty tickets across Now / Next / Later / Cut, then copy the final ordering out as markdown.

18-editor-triage-board.html→

](https://thariqs.github.io/html-effectiveness/18-editor-triage-board.html)[

Feature flag editor

Toggles grouped by area, dependency warnings when a prerequisite is off, and a "copy diff" button for just the changed keys.

19-editor-feature-flags.html→

](https://thariqs.github.io/html-effectiveness/19-editor-feature-flags.html)[

Prompt tuner

Editable template on the left with variable slots highlighted; three sample inputs on the right re-render live as you type.

20-editor-prompt-tuner.html→

](https://thariqs.github.io/html-effectiveness/20-editor-prompt-tuner.html)