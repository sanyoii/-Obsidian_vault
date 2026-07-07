---
title: "Getting started with loops"
source: "https://x.com/ClaudeDevs/status/2074208949205881033"
site: "x.com"
author:
  - "@ClaudeDevs"
published: 2026-07-06
clipped: 2026-07-07
tags:
  - "article/unread"
---
# Getting started with loops

> **出處：** [x.com](https://x.com/ClaudeDevs/status/2074208949205881033) | @ClaudeDevs | 2026-07-06

---

\["

## Article

[

](\"/ClaudeDevs/article/2074208949205881033\")

See new posts

# Conversation

[

![\"\"](\"https://pbs.twimg.com/profile_images/2044472418815893504/xf14RxM8_bigger.png\")

](\"/ClaudeDevs\")

[

ClaudeDevs

![\"\"](\"https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_bigger.jpg\")

](\"/ClaudeDevs\")

[

@ClaudeDevs

](\"/ClaudeDevs\")

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkRVmsaEAA3Dl5?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074208166242553856\")

Getting started with loops

263

1.8K

13K

[

3.4M

](\"/ClaudeDevs/status/2074208949205881033/analytics\")

There’s a lot of talk right now about \\"designing loops\\" instead of prompting your coding agent. If you spend some time on X trying to pin down what a loop actually is, you'll come across multiple different answers.

On the Claude Code team, we define loops as agents repeating cycles of work until a stop condition is met. We categorize a few different types of loops based on:

- How they are triggered
- How they are stopped
- What Claude Code primitive is used
- What type of task is most appropriate for each.

We’ll cover the main loop types, when to use each, and how to maintain code quality while managing token usage. Not all tasks require complex loops; start with the simplest solution and use these patterns selectively.

## 

Turn-based loops

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkOVNybEAAncbL?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074204861022015488\")

- Triggered by: A user prompt.
- Stop criteria: Claude judges it has completed the task or needs additional context.
- Best used for: Shorter tasks that are not part of a regular process or schedule.
- Managed usage by: Write specific prompts and improve verification using skills to reduce the number of turns.‍

Every prompt you send starts a manual loop with you directing each turn. Claude gathers context, takes action, checks its work, repeats if needed, and responds. We call this the agentic loop.

For example, ask Claude to create a like button. It reads your code, makes the edit, runs the tests, and hands back something it believes works. You then manually check the work, and write the next prompt.

You can improve the verification step by encoding your manual steps as a SKILL.md so Claude can check more of its own work, end-to-end. This should include tools or connectors to allow Claude to see, measure or interact with the result. The more quantitative the checks are, the easier it is for Claude to self-verify.

For example, in your SKILL.md file you may specify:

markdown

```markdown
--- \nname: verify-frontend-change \ndescription: Verify any UI change end-to-end before declaring it done. \n--- \n\n# Verifying frontend changes \nNever report a UI change as complete based on a successful edit alone. Verify it the way a human reviewer would: \n\n1. Start the dev server and open the edited page in the browser. \n\n2. Interact with the change directly. For a new control (button, input, toggle): click it, confirm the expected state change, and screenshot before/after. \n\n3. Check the browser console: zero new errors or warnings. \n\n4. Use the Chrome Devtools MCP, run a performance trace and audit Core Web Vitals.\n\nIf any step fails, fix the issue and rerun from step 1 — do not hand back partially verified work.
```

## 

Goal-based loop (/goal)

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkOlk3bcAAHX46?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074205142094934016\")

- Triggered by: A manual prompt in real-time.
- Stop criteria: Goal achieved OR maximum number of turns reached.
- Best used for: Tasks that have verifiable exit criteria.
- Managed usage by: Setting a specific completion criteria and explicit turn caps, “stop after 5 tries.”

Sometimes, a single turn is not enough, especially for more complex tasks. Agents do better when they can iterate. You can extend how long Claude keeps iterating by defining what done looks like with /goal.

When you define the success criteria, Claude doesn’t have to make a determination on what is “good enough” and end the loop early. Each time Claude tries to stop, an evaluator model checks your condition and sends it back to work until the goal is met or a number of turns you define is reached.

This is why deterministic criteria, such as number of tests passed or clearing a certain score threshold, are so effective.

For example:

bash

```bash
/goal get the homepage Lighthouse score to 90 or above, stop after 5 tries.\n
```

## 

Time-based loop (/loop and /schedule)

- Triggered by: A specified time interval.
- Stop criteria: You cancel it, or the work completes (the PR merges, the queue is empty).
- Best used for: For recurring work, or interfacing with external environments / systems.
- Managed usage by: Set longer intervals or react based on events rather than time.

Some agentic work is recurring: the task stays the same and only the inputs change. For example, summarizing Slack messages every morning. Other work depends on external systems, and a simple way to interface with one is to check it on an interval and react to what changed. For example, a PR which may receive code reviews or fail CI.

For these, you can trigger when Claude runs with \`/loop\` which re-runs a prompt on an interval. For example:

bash

```bash
/loop 5m check my PR, address review comments, and fix failing CI\n
```

\`/loop\` runs on your computer, so if you turn it off, it stops. You can move the loop to the cloud by creating a routine with  \`/schedule\`.

## 

Proactive loops

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkPQM8bEAA3RAk?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074205874407804928\")

- Triggered by: An event or schedule, with no human in real time.
- Stop criteria: Each task exits when its goal is met. The routine itself runs until you turn it off.
- Best used for: Recurring streams of well-defined work: bug reports, issue triage, migrations, dependency upgrades, etc.
- Managed usage by: Routing routines to smaller, faster models and using the most capable model for judgment calls.

The primitives above, along with other Claude Code features like auto mode and dynamic workflows (research preview) can be composed into a loop for long-running work.

For example, to handle incoming feedback, you can use:

1. \`/schedule\` (research preview) to run a routine that checks for new reports
2. \`/goal\` to define what done looks and skills to document how to verify it
3. Dynamic workflows to orchestrate agents that triage each report, fix it, and review the fix
4. Auto mode so the routine runs without stopping to ask for permission

Putting it together, a prompt could look like this:

bash

```bash
/schedule every hour: check the project-feedback channel for bug reports. /goal: don't stop until every report found this run is triaged, actioned, and responded to. When fixing a bug, use a workflow to explore three solutions in parallel worktrees and have a judge adversarially review them.
```

## 

Maintaining code quality

The quality of a loop’s output depends on the system around it. When designing the system:

- Keep the codebase itself clean: Claude follows patterns and conventions that already exist in your codebase.
- Give Claude a way to verify its own work: Encode what good looks like for you and your team with
	[skills](\"https://code.claude.com/docs/en/skills\")
	.
- Make docs easy to reach: Frameworks and libraries docs have up-to-date best practices.
- Use a second agent for code reviews: A reviewer with fresh context is less biased and not influenced by the main agent’s reasoning. You can use the built-in \`/code-review\` skill or
	[Code Review](\"https://code.claude.com/docs/en/code-review\")
	for Github.

When an individual result doesn’t meet the standard, don’t stop at fixing the individual issue, try to encode it to improve the system for all future iterations.

## 

Managing token usage

To manage token usage, loops should have clear boundaries:

- Choose the right primitive and model for the job: Smaller tasks don’t need multiple agents or loops. Some tasks can use cheaper and faster models.
- Define clear success and stop criteria: Be specific about what done looks like so Claude can arrive at the solution sooner (but not too soon).
- Pilot before a large run: Dynamic workflows can spawn hundreds of agents. Gauge usage on a smaller slice of the work first.
- Use scripts for deterministic work: Running a script is cheaper than reasoning through the steps. For example, a PDF skill can ship a form-filling script that Claude runs each time, instead of re-deriving the code.
- Don’t run routines more often that you need to: Match the interval to how often the thing you’re watching changes
- Review usage: The \`/usage\` command breaks down recent usage by skills, subagents, and MCPs, \`/goal\` with no arguments shows number of turns and token usage so far, \`/workflows\` shows each agent’s token usage and you can stop an agent at any time.

## 

Getting started

To summarize:

| Loop | You hand off | Use it when | Reach for |
| --- | --- | --- | --- |
| Turn-based | The check | You're exploring or deciding | Custom verification skills |
| Goal-based | The stop condition | You know what done looks like | /goal |
| Time-based | The trigger | The work happens outside your project on a schedule | /loop  ,  /schedule |
| Proactive | The prompt | The work is recurring and well-defined | All of the above, and dynamic workflows |

To get started with loops, look at the work you already do. Pick one task where you’re the bottleneck and ask which piece you could hand off: can you write the verification check? Is the goal clear enough? Does the work arrive on a schedule?

Once you have an idea, run the loop, observe the results like where it stalls or over-reaches, and don’t be afraid to iterate on it.

For more information, read the Claude Code docs on

[running agents in parallel,](\"https://code.claude.com/docs/en/agents\")

as well as the

[loop](\"https://code.claude.com/docs/en/goal\")

,

[schedule](\"https://code.claude.com/docs/en/routines\")

,

[goal](\"https://code.claude.com/docs/en/goal\")

, and

[dynamic workflows](\"https://code.claude.com/docs/en/workflows#orchestrate-subagents-at-scale-with-dynamic-workflows\")

pages.

This article was written by

[@delba\_oliveira](\"https://x.com/@delba_oliveira\")

Want to publish your own Article?

[Upgrade to Premium](\"/i/premium_sign_up\")

[9:08 PM · Jul 6, 2026](\"/ClaudeDevs/status/2074208949205881033\")

·

[

3.4M

Views](\"/ClaudeDevs/status/2074208949205881033/analytics\")

263

1.8K

13K

28K

Relevant

[View quotes](\"/ClaudeDevs/status/2074208949205881033/quotes\")

[

![\"BJ\"](\"https://pbs.twimg.com/profile_images/1337140306500669440/afgZu1CH_bigger.jpg\")

](\"/sanyoii1\")

Post your reply

  

Reply

Everyone can reply

[

![\"\"](\"https://pbs.twimg.com/profile_images/1482928088451207170/jvSpTRe4_bigger.jpg\")

](\"/PeyMonee\")

[

Dope Sourdough

](\"/PeyMonee\")

[

@PeyMonee

](\"/PeyMonee\")

·

[1h](\"/PeyMonee/status/2074506554276266021\")

Quote

![\"\"](\"https://pbs.twimg.com/profile_images/1482928088451207170/jvSpTRe4_normal.jpg\")

Dope Sourdough

@PeyMonee

·

Jun 24

![\"Article](\"https://pbs.twimg.com/media/HLmiC4PbcAA0A45?format=jpg&name=900x900\")

Article

Loops: The AI Coding World Just Rediscovered Cybernetics

This month a single tweet did 8M+ views: \\"... stop prompting agents, start designing loops that prompt your agents.\\" The timeline melted. A new discipline was christened: loop engineering.\\nHere's the...

[

1.2K

](\"/PeyMonee/status/2074506554276266021/analytics\")

[

![\"\"](\"https://pbs.twimg.com/profile_images/2055297942643503104/4P2lB5d7_bigger.jpg\")

](\"/FoxyMoxy0w0\")

[

FoxyMoxy

](\"/FoxyMoxy0w0\")

[

@FoxyMoxy0w0

](\"/FoxyMoxy0w0\")

·

[2h](\"/FoxyMoxy0w0/status/2074482664858681769\")

Cool, so you’re using the same process as looping layer llms, just not integrated into the weights, gotcha.

[

1.5K

](\"/FoxyMoxy0w0/status/2074482664858681769/analytics\")

[

![\"\"](\"https://pbs.twimg.com/profile_images/2069753753155276800/bF-zs1K0_bigger.jpg\")

](\"/clawdreyai\")

[

Clawdrey

](\"/clawdreyai\")

[

@clawdreyai

](\"/clawdreyai\")

·

[2h](\"/clawdreyai/status/2074490368805245305\")

give us one more week to use loops with Fable 5

<video preload="\&quot;auto\&quot;" tabindex="\&quot;-1\&quot;" playsinline="\&quot;\&quot;" aria-label="\&quot;please" gif\"="" poster="\&quot;https://pbs.twimg.com/tweet_video_thumb/HMoR_UXbUAEDDrd.jpg\&quot;" src="\&quot;https://video.twimg.com/tweet_video/HMoR_UXbUAEDDrd.mp4\&quot;" type="\&quot;video/mp4\&quot;" style="\&quot;width:" 100%;="" height:="" position:="" absolute;="" background-color:="" black;="" top:="" 0%;="" left:="" transform:="" rotate(0deg)="" scale(1.005);\"=""></video>

![\"\"](\"https://pbs.twimg.com/tweet_video_thumb/HMoR_UXbUAEDDrd.jpg\")

GIF

5

[

1.3K

](\"/clawdreyai/status/2074490368805245305/analytics\")

## 

Relevant people

- [
	![\"\"](\"https://pbs.twimg.com/profile_images/2044472418815893504/xf14RxM8_bigger.png\")
	](\"/ClaudeDevs\")
	[
	ClaudeDevs
	![\"\"](\"https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_bigger.jpg\")
	](\"/ClaudeDevs\")
	[
	@ClaudeDevs
	](\"/ClaudeDevs\")
	Follow
	Click to Follow ClaudeDevs
	Official updates for developers building with
	[@ClaudeAI](\"/ClaudeAI\")

## 

Live on X

![\"\"](\"https://pbs.twimg.com/profile_images/1872166047018831873/X30Qof_Y_normal.jpg\")

大叔 湯可蘭

is speaking

獺獺![\"🦦\"](\"https://abs.twimg.com/emoji/v2/svg/1f9a6.svg\" "\"Otter\"")台

![\"\"](\"https://pbs.twimg.com/profile_images/1981873723138314240/UywAotCe_bigger.jpg\")

![\"\"](\"https://pbs.twimg.com/profile_images/1632729003118444544/UuibE3Hv_bigger.jpg\")

![\"\"](\"https://pbs.twimg.com/profile_images/1872166047018831873/X30Qof_Y_bigger.jpg\")

+6

# Trending now

## 

What’s happening

Trending in Italy

#tuttoperlamiafamiglia

Politics · Trending

Farage

Politics · Trending

Groenlandia

Trending in Italy

#ambiente

[

Show more

](\"/explore/tabs/for-you\")

[Terms](\"https://x.com/tos\")

·

[Privacy](\"https://x.com/privacy\")

·

[Cookies](\"https://support.x.com/articles/20170514\")

·

[Accessibility](\"https://help.x.com/resources/accessibility\")

·

[Ads Info](\"https://business.x.com/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo\")

·

More

© 2026 X Corp.

","

[

![\"\"](\"https://pbs.twimg.com/profile_images/2044472418815893504/xf14RxM8_bigger.png\")

](\"/ClaudeDevs\")

[

ClaudeDevs

![\"\"](\"https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_bigger.jpg\")

](\"/ClaudeDevs\")

[

@ClaudeDevs

](\"/ClaudeDevs\")

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkRVmsaEAA3Dl5?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074208166242553856\")

Getting started with loops

263

1.8K

13K

[

3.4M

](\"/ClaudeDevs/status/2074208949205881033/analytics\")

There’s a lot of talk right now about \\"designing loops\\" instead of prompting your coding agent. If you spend some time on X trying to pin down what a loop actually is, you'll come across multiple different answers.

On the Claude Code team, we define loops as agents repeating cycles of work until a stop condition is met. We categorize a few different types of loops based on:

- How they are triggered
- How they are stopped
- What Claude Code primitive is used
- What type of task is most appropriate for each.

We’ll cover the main loop types, when to use each, and how to maintain code quality while managing token usage. Not all tasks require complex loops; start with the simplest solution and use these patterns selectively.

## 

Turn-based loops

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkOVNybEAAncbL?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074204861022015488\")

- Triggered by: A user prompt.
- Stop criteria: Claude judges it has completed the task or needs additional context.
- Best used for: Shorter tasks that are not part of a regular process or schedule.
- Managed usage by: Write specific prompts and improve verification using skills to reduce the number of turns.‍

Every prompt you send starts a manual loop with you directing each turn. Claude gathers context, takes action, checks its work, repeats if needed, and responds. We call this the agentic loop.

For example, ask Claude to create a like button. It reads your code, makes the edit, runs the tests, and hands back something it believes works. You then manually check the work, and write the next prompt.

You can improve the verification step by encoding your manual steps as a SKILL.md so Claude can check more of its own work, end-to-end. This should include tools or connectors to allow Claude to see, measure or interact with the result. The more quantitative the checks are, the easier it is for Claude to self-verify.

For example, in your SKILL.md file you may specify:

markdown

```markdown
--- \nname: verify-frontend-change \ndescription: Verify any UI change end-to-end before declaring it done. \n--- \n\n# Verifying frontend changes \nNever report a UI change as complete based on a successful edit alone. Verify it the way a human reviewer would: \n\n1. Start the dev server and open the edited page in the browser. \n\n2. Interact with the change directly. For a new control (button, input, toggle): click it, confirm the expected state change, and screenshot before/after. \n\n3. Check the browser console: zero new errors or warnings. \n\n4. Use the Chrome Devtools MCP, run a performance trace and audit Core Web Vitals.\n\nIf any step fails, fix the issue and rerun from step 1 — do not hand back partially verified work.
```

## 

Goal-based loop (/goal)

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkOlk3bcAAHX46?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074205142094934016\")

- Triggered by: A manual prompt in real-time.
- Stop criteria: Goal achieved OR maximum number of turns reached.
- Best used for: Tasks that have verifiable exit criteria.
- Managed usage by: Setting a specific completion criteria and explicit turn caps, “stop after 5 tries.”

Sometimes, a single turn is not enough, especially for more complex tasks. Agents do better when they can iterate. You can extend how long Claude keeps iterating by defining what done looks like with /goal.

When you define the success criteria, Claude doesn’t have to make a determination on what is “good enough” and end the loop early. Each time Claude tries to stop, an evaluator model checks your condition and sends it back to work until the goal is met or a number of turns you define is reached.

This is why deterministic criteria, such as number of tests passed or clearing a certain score threshold, are so effective.

For example:

bash

```bash
/goal get the homepage Lighthouse score to 90 or above, stop after 5 tries.\n
```

## 

Time-based loop (/loop and /schedule)

- Triggered by: A specified time interval.
- Stop criteria: You cancel it, or the work completes (the PR merges, the queue is empty).
- Best used for: For recurring work, or interfacing with external environments / systems.
- Managed usage by: Set longer intervals or react based on events rather than time.

Some agentic work is recurring: the task stays the same and only the inputs change. For example, summarizing Slack messages every morning. Other work depends on external systems, and a simple way to interface with one is to check it on an interval and react to what changed. For example, a PR which may receive code reviews or fail CI.

For these, you can trigger when Claude runs with \`/loop\` which re-runs a prompt on an interval. For example:

bash

```bash
/loop 5m check my PR, address review comments, and fix failing CI\n
```

\`/loop\` runs on your computer, so if you turn it off, it stops. You can move the loop to the cloud by creating a routine with  \`/schedule\`.

## 

Proactive loops

[

![\"Image\"](\"https://pbs.twimg.com/media/HMkPQM8bEAA3RAk?format=jpg&name=medium\")

](\"/ClaudeDevs/article/2074208949205881033/media/2074205874407804928\")

- Triggered by: An event or schedule, with no human in real time.
- Stop criteria: Each task exits when its goal is met. The routine itself runs until you turn it off.
- Best used for: Recurring streams of well-defined work: bug reports, issue triage, migrations, dependency upgrades, etc.
- Managed usage by: Routing routines to smaller, faster models and using the most capable model for judgment calls.

The primitives above, along with other Claude Code features like auto mode and dynamic workflows (research preview) can be composed into a loop for long-running work.

For example, to handle incoming feedback, you can use:

1. \`/schedule\` (research preview) to run a routine that checks for new reports
2. \`/goal\` to define what done looks and skills to document how to verify it
3. Dynamic workflows to orchestrate agents that triage each report, fix it, and review the fix
4. Auto mode so the routine runs without stopping to ask for permission

Putting it together, a prompt could look like this:

bash

```bash
/schedule every hour: check the project-feedback channel for bug reports. /goal: don't stop until every report found this run is triaged, actioned, and responded to. When fixing a bug, use a workflow to explore three solutions in parallel worktrees and have a judge adversarially review them.
```

## 

Maintaining code quality

The quality of a loop’s output depends on the system around it. When designing the system:

- Keep the codebase itself clean: Claude follows patterns and conventions that already exist in your codebase.
- Give Claude a way to verify its own work: Encode what good looks like for you and your team with
	[skills](\"https://code.claude.com/docs/en/skills\")
	.
- Make docs easy to reach: Frameworks and libraries docs have up-to-date best practices.
- Use a second agent for code reviews: A reviewer with fresh context is less biased and not influenced by the main agent’s reasoning. You can use the built-in \`/code-review\` skill or
	[Code Review](\"https://code.claude.com/docs/en/code-review\")
	for Github.

When an individual result doesn’t meet the standard, don’t stop at fixing the individual issue, try to encode it to improve the system for all future iterations.

## 

Managing token usage

To manage token usage, loops should have clear boundaries:

- Choose the right primitive and model for the job: Smaller tasks don’t need multiple agents or loops. Some tasks can use cheaper and faster models.
- Define clear success and stop criteria: Be specific about what done looks like so Claude can arrive at the solution sooner (but not too soon).
- Pilot before a large run: Dynamic workflows can spawn hundreds of agents. Gauge usage on a smaller slice of the work first.
- Use scripts for deterministic work: Running a script is cheaper than reasoning through the steps. For example, a PDF skill can ship a form-filling script that Claude runs each time, instead of re-deriving the code.
- Don’t run routines more often that you need to: Match the interval to how often the thing you’re watching changes
- Review usage: The \`/usage\` command breaks down recent usage by skills, subagents, and MCPs, \`/goal\` with no arguments shows number of turns and token usage so far, \`/workflows\` shows each agent’s token usage and you can stop an agent at any time.

## 

Getting started

To summarize:

| Loop | You hand off | Use it when | Reach for |
| --- | --- | --- | --- |
| Turn-based | The check | You're exploring or deciding | Custom verification skills |
| Goal-based | The stop condition | You know what done looks like | /goal |
| Time-based | The trigger | The work happens outside your project on a schedule | /loop  ,  /schedule |
| Proactive | The prompt | The work is recurring and well-defined | All of the above, and dynamic workflows |

To get started with loops, look at the work you already do. Pick one task where you’re the bottleneck and ask which piece you could hand off: can you write the verification check? Is the goal clear enough? Does the work arrive on a schedule?

Once you have an idea, run the loop, observe the results like where it stalls or over-reaches, and don’t be afraid to iterate on it.

For more information, read the Claude Code docs on

[running agents in parallel,](\"https://code.claude.com/docs/en/agents\")

as well as the

[loop](\"https://code.claude.com/docs/en/goal\")

,

[schedule](\"https://code.claude.com/docs/en/routines\")

,

[goal](\"https://code.claude.com/docs/en/goal\")

, and

[dynamic workflows](\"https://code.claude.com/docs/en/workflows#orchestrate-subagents-at-scale-with-dynamic-workflows\")

pages.

This article was written by

[@delba\_oliveira](\"https://x.com/@delba_oliveira\")

Want to publish your own Article?

[Upgrade to Premium](\"/i/premium_sign_up\")

[9:08 PM · Jul 6, 2026](\"/ClaudeDevs/status/2074208949205881033\")

·

[

3.4M

Views](\"/ClaudeDevs/status/2074208949205881033/analytics\")

263

1.8K

13K

28K

Relevant

[View quotes](\"/ClaudeDevs/status/2074208949205881033/quotes\")

","

[

![\"\"](\"https://pbs.twimg.com/profile_images/1482928088451207170/jvSpTRe4_bigger.jpg\")

](\"/PeyMonee\")

[

Dope Sourdough

](\"/PeyMonee\")

[

@PeyMonee

](\"/PeyMonee\")

·

[1h](\"/PeyMonee/status/2074506554276266021\")

Quote

![\"\"](\"https://pbs.twimg.com/profile_images/1482928088451207170/jvSpTRe4_normal.jpg\")

Dope Sourdough

@PeyMonee

·

Jun 24

![\"Article](\"https://pbs.twimg.com/media/HLmiC4PbcAA0A45?format=jpg&name=900x900\")

Article

Loops: The AI Coding World Just Rediscovered Cybernetics

This month a single tweet did 8M+ views: \\"... stop prompting agents, start designing loops that prompt your agents.\\" The timeline melted. A new discipline was christened: loop engineering.\\nHere's the...

[

1.2K

](\"/PeyMonee/status/2074506554276266021/analytics\")

","

[

![\"\"](\"https://pbs.twimg.com/profile_images/2055297942643503104/4P2lB5d7_bigger.jpg\")

](\"/FoxyMoxy0w0\")

[

FoxyMoxy

](\"/FoxyMoxy0w0\")

[

@FoxyMoxy0w0

](\"/FoxyMoxy0w0\")

·

[2h](\"/FoxyMoxy0w0/status/2074482664858681769\")

Cool, so you’re using the same process as looping layer llms, just not integrated into the weights, gotcha.

[

1.5K

](\"/FoxyMoxy0w0/status/2074482664858681769/analytics\")

","

[

![\"\"](\"https://pbs.twimg.com/profile_images/2069753753155276800/bF-zs1K0_bigger.jpg\")

](\"/clawdreyai\")

[

Clawdrey

](\"/clawdreyai\")

[

@clawdreyai

](\"/clawdreyai\")

·

[2h](\"/clawdreyai/status/2074490368805245305\")

give us one more week to use loops with Fable 5

<video preload="\&quot;auto\&quot;" tabindex="\&quot;-1\&quot;" playsinline="\&quot;\&quot;" aria-label="\&quot;please" gif\"="" poster="\&quot;https://pbs.twimg.com/tweet_video_thumb/HMoR_UXbUAEDDrd.jpg\&quot;" src="\&quot;https://video.twimg.com/tweet_video/HMoR_UXbUAEDDrd.mp4\&quot;" type="\&quot;video/mp4\&quot;" style="\&quot;width:" 100%;="" height:="" position:="" absolute;="" background-color:="" black;="" top:="" 0%;="" left:="" transform:="" rotate(0deg)="" scale(1.005);\"=""></video>

![\"\"](\"https://pbs.twimg.com/tweet_video_thumb/HMoR_UXbUAEDDrd.jpg\")

GIF

5

[

1.3K

](\"/clawdreyai/status/2074490368805245305/analytics\")

"\]
