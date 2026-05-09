
Prompt:
```
Build a single self-contained HTML5 file that plays an animated, narrated visual explainer — same engine and visual language as the reference attached at the end of this prompt (3d-animation-demo.html). Match its architecture exactly.

=== ENGINE REQUIREMENTS (do not deviate) ===

1. ONE FILE.
All HTML + CSS + JS inline. No external assets except Google Fonts. No WebGL, no canvas, no libraries — pure CSS 3D transforms only.

2. SCENE + CAPTION ENGINE.
Replicate the reference's runtime:
- scenes array: each item { start, end, html } where html is the scene markup
- subs array: each item { s, e, t } — start sec, end sec, caption text
- TOTAL = total seconds
- requestAnimationFrame tick loop drives currentTime, captions, scene transitions, progress bar, chapter dots, and [data-at] timed reveals
- Active scene gets .active; outgoing gets .zoom-out
- Elements with data-at="N" fade/slide in when currentTime >= N
- Caption swaps with a .cap-in fade animation on text change

3. CONTROLS BAR fixed, bottom 44px:
- ◀ prev / ▶ play / ▶ next buttons (class cb, active state .on)
- Single-line caption truncate with ellipsis
- mm:ss / mm:ss timer
- 3px progress bar above the bar, click-to-seek
- Chapter dots on the progress bar one per scene start, except scene 0 with .past and .next pulsing states
- Keyboard: Space = play/pause, ←/→ = prev/next scene
- Touch: horizontal swipe = prev/next

4. AMBIENT LAYER:
18 floating particles + 2 large blurred bg shapes drifting slowly.
Plus a #sceneFlash radial gradient that fires on each scene change.

5. DESIGN TOKENS CSS variables, exactly these — do not invent new colors:
--bg:#F9F7F7
--bg2:#EEF1F7
--card:#fff
--teal:#3F72AF
--teal-soft:rgba(63,114,175,0.08)
--coral:#E07A5F
--coral-soft:rgba(224,122,95,0.08)
--navy:#112D4E
--text:#112D4E
--muted:rgba(17,45,78,0.7)
--border:rgba(17,45,78,0.08)
--shadow:0 2px 20px rgba(17,45,78,0.06)

6. TYPOGRAPHY Google Fonts:
--font-heading: 'Chiron GoRound TC', 'Instrument Serif', sans-serif
--font-body: 'Chiron GoRound TC', sans-serif
--font-mono: 'DM Mono', monospace

Standard text classes:
.subtitle mono, teal, uppercase, letter-spaced
.title heading, navy, with .hl spans in teal
.note body, muted, max 640px, supports inline <code> chips

7. STAGE:
Full viewport minus the 44px bar; perspective:1800px.
Each .scene is absolute-positioned, flex-column-centered, and uses cubic-bezier transitions for opacity + transform.

8. ACCESSIBILITY:
Include a @media (prefers-reduced-motion:reduce) block that disables looping animations and reduces transitions, exactly like the reference.

=== HOW TO BUILD THE SCENES ===

For every scene I list in CONTENT below:
- Pick a 3D technique that fits the message.
- Reuse the reference's vocabulary:
  - flip card
  - rotating cube
  - parallax stacked layers
  - carousel ring
  - floating phone mockup
  - 3D extruded text multi-layer text-shadow
  - tilted browser mockup
  - z-axis arc of steps
  - 3D conversation bubbles
  - pop-out spotlight grid
  - before/after tilted panels
  - orbiting concept network
- You may invent variants of these but stay within the same CSS-3D-transform toolkit.
- Every scene must contain at least:
  - one .subtitle label
  - one .title with one .hl span for emphasis
  - the 3D visual itself
  - one .note caption explaining the technique or the point
- All four use data-at so they cascade in over the first ~6 seconds of the scene.
- Animations loop with ease-in-out or linear infinite keyframes — the scene should feel alive even when paused on it.

=== CAPTIONS ===

2–4 captions per scene is typical.
Match the reference's tone: short, punchy, one idea per line.
If the reference is bilingual and you want bilingual output, mirror that; otherwise pick one language and stay consistent.

=== DELIVERABLE ===

Output the complete HTML file as a single fenced code block.
Nothing else.
The file must run by double-clicking it — no build step, no server.

=== CONTENT TO ANIMATE ===

[ATTACH YOUR CONTENT HERE. Provide:
• Topic / one-line pitch
• Total target duration in seconds e.g. 180
• Ordered list of scenes — for each: a heading, the point you want to make, and any specific text/labels/data that must appear on screen
• Caption language(s)
• Optional: any palette/font overrides otherwise keep the reference's]
```







Template:
```
=== CONTENT TO ANIMATE ===

## Topic / One-Line Pitch: 這裡需要用一句話簡潔地描述你的動畫主題。這能幫助 AI 快速掌握核心思想。

An animation explaining the Git rebase command.

## Total Target Duration: 

90 seconds

## Caption Language

English

## Scenes

### Scene 1 — Two Diverging Branches

**Point:**
Show that the 'feature' branch was created from 'main', but now both have new, separate commits. This creates a divergence.

**Required on-screen text / labels / data:**
- A series of connected blocks representing commits.
- Label one path "main" with commits labeled "M1", "M2", "M3".
- Label another path branching off "M2" as "feature" with commits "F1", "F2".
- On-screen title: "Diverged History"

### Scene 2 — The Rebase Command

**Point:**
Explain that 'git rebase main' takes all commits from the current branch ('feature') and replays them on top of the latest 'main' branch.

**Required on-screen text / labels / data:**
- The code snippet 'git rebase main' displayed in a monospaced font.
- An animation showing the "F1" and "F2" blocks being lifted off.
- The "feature" branch pointer moving from "M2" to the tip of "main" ("M3").

### Scene 3 — A Linear History

**Point:**
Show the final result: the 'feature' branch is now based on the latest 'main', creating a clean, linear project history.

**Required on-screen text / labels / data:**
- A single line of commits: "M1" -> "M2" -> "M3" -> "F1'" -> "F2'".
- The "main" and "feature" labels both pointing to "F2'".
- On-screen title: "A Clean, Linear History"

## Optional Palette / Font Overrides

None. Keep the reference palette and fonts.

```
