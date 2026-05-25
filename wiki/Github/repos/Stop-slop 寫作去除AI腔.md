---
source: "https://github.com/hardikpandya/stop-slop"
author:
stars: "4,215"
clipped: 2026-05-25
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | ⭐ 4,215

---

## Description


## README
A skill for removing AI tells from prose.

[![G-Yg4RVbIAAhVxW](https://private-user-images.githubusercontent.com/591262/534376264-902afc15-1f40-4a9d-af24-8cd67afb8ebf.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzk3MjA3MDksIm5iZiI6MTc3OTcyMDQwOSwicGF0aCI6Ii81OTEyNjIvNTM0Mzc2MjY0LTkwMmFmYzE1LTFmNDAtNGE5ZC1hZjI0LThjZDY3YWZiOGViZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNTI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDUyNVQxNDQ2NDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kMTU0M2U0ZGNmNzkyNGE1Yzk3OWUyNTM3YjJmZGJjNjc3MjRkNjMyYTBmNTgyNTIxNTU5MzNiMDIxYzgyYTBjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.lzpPe4owFQ8cY7Bvchjo-3zUYXyQH35By8_KpceB1eA)](https://private-user-images.githubusercontent.com/591262/534376264-902afc15-1f40-4a9d-af24-8cd67afb8ebf.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzk3MjA3MDksIm5iZiI6MTc3OTcyMDQwOSwicGF0aCI6Ii81OTEyNjIvNTM0Mzc2MjY0LTkwMmFmYzE1LTFmNDAtNGE5ZC1hZjI0LThjZDY3YWZiOGViZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNTI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDUyNVQxNDQ2NDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kMTU0M2U0ZGNmNzkyNGE1Yzk3OWUyNTM3YjJmZGJjNjc3MjRkNjMyYTBmNTgyNTIxNTU5MzNiMDIxYzgyYTBjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.lzpPe4owFQ8cY7Bvchjo-3zUYXyQH35By8_KpceB1eA)

## What this isAI writing has patterns. Predictable phrases, structures, rhythms. This skill teaches Claude (or any LLM) to catch and remove them.

## Skill Structure```
stop-slop/
├── SKILL.md              # Core instructions
├── references/
│   ├── phrases.md        # Phrases to remove
│   ├── structures.md     # Structural patterns to avoid
│   └── examples.md       # Before/after transformations
├── README.md
└── LICENSE
```

## Quick start**Claude Code:** Add this folder as a skill.

**Claude Projects:** Upload `SKILL.md` and reference files to project knowledge.

**Custom instructions:** Copy core rules from `SKILL.md`.

**API calls:** Include `SKILL.md` in your system prompt. Reference files load on demand.

## What it catches**Banned phrases** - Throat-clearing openers, emphasis crutches, business jargon, all adverbs, vague declaratives, meta-commentary. See `references/phrases.md`.

**Structural clichés** - Binary contrasts, negative listings, dramatic fragmentation, rhetorical setups, false agency, narrator-from-a-distance voice, passive voice. See `references/structures.md`.

**Sentence-level rules** - No Wh- sentence starters, no em dashes, no staccato fragmentation, no lazy extremes, active voice required.

## ScoringRate 1-10 on each dimension:

| Dimension | Question |
| --- | --- |
| Directness | Statements or announcements? |
| Rhythm | Varied or metronomic? |
| Trust | Respects reader intelligence? |
| Authenticity | Sounds human? |
| Density | Anything cuttable? |

Below 35/50: revise.

## Author[Hardik Pandya](https://hvpandya.com)

## LicenseMIT. Use freely, share widely.
