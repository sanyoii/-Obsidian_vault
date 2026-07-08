<!-- processed: 2026-07-08 -->
<!-- 來源：未具名作者（X/Twitter 風格教學文，使用者貼上原文，無 URL） -->
<!-- 取得方式：使用者貼原文；解讀為 wiki/Claude/fable5-mastery-leader-mode-workflows.md -->

# How to master Fable 5 (Full Course)

Anthropic not only just released the best model ever built, they introduced us to a whole new world of possibilities...

Fable 5 is a category of its own right now - until GPT 5.6 Sol launches, there's nothing on this earth capable of beating it

out of the box it's an insanely powerful model, exceptional at long horizon tasks, manages goals and loops better than anything else, an excellent planner and orchestrator... well, it does it all

but if you know the methods, the tactics and the secrets to use it like the top 1% of engineers, there's literally nothing you cannot achieve with this thing

people call it dangerous for a reason...

so this is the full course

what the model is truly exceptional at, how to run it as the leader of your own agent team, the secrets that pull the best results out of it, the goals and loops that keep it for hours, and the five workflows where it makes real money

one note: Fable leaves the Claude subscription on july 7 and becomes paid usage after

this week is the cheapest this course will ever be to run

if you want to learn how to get the most out of Fable 5 and how to make money with it, that's what the real time AI ops community is for: weeklyaiops.com

## what this model is exceptional at

before the methods, meet the machine... five things Fable does that nothing before it could:

it never loses the thread

give it a job that takes hours and it stays locked on

it once finished an 18,000-line code migration in a single 3-hour run with nobody watching... every earlier model needed a babysitter for work like that

the constraint you set three hours ago is as fresh to it as the one you just typed

it sees like a person

show it a screenshot and it can rebuild the working page behind it, read exact numbers off a chart, or spot what's broken on your site just by looking

its computer-use scores are the highest ever recorded, and it even fixes blurry images on its own before reading them

it delivers finished work, not answers

hand it raw files and it comes back with the deliverable: the report, the financial model, the plan

work that takes a professional analyst days comes back in hours, and on independent tests of real professional deliverables it beats every other model by the widest margin ever measured

it gets smarter from files

give it a folder of notes it can read and write and it improves faster than any model before it

your notes become its memory, and that memory compounds run after run

it's built to lead

it spins up and manages teams of smaller agents more naturally than anything before it

which is exactly why the setup below works... and exactly where the course starts

## the cockpit: every control you need

sixty seconds of setup, then the controls

update Claude Code first, Fable only shows up in the model picker on recent versions

that's the whole cockpit

the rest of this course is knowing which control to reach for, and when

## the main event: run Fable as the leader, not the worker

the single biggest upgrade is a role change

stop typing tasks at Fable like it's a worker... make it the manager of a team, because the smartest model on the market is worth more directing work than doing keystrokes

the setup:

> Fable makes the plan: feed it Matt Pocock's skills collection (github.com/mattpocock/skills), free planning skills that turn a rough idea into a clear, testable plan before any work starts

> Fable delegates: the actual work goes to subagents, Opus and Codex workers, each owning one lane in parallel

> Fable reviews: every finished piece comes back to the leader, gets checked against the plan, and goes back if it's not right

> you iterate with it: check in on a schedule, steer the plan, let it keep running

why this works: Fable dispatches parallel subagents more readily than any model before it, and it holds the whole workflow in its head for hours

it rarely forgets a constraint, a file, or a decision it made three hours ago... which is exactly what a leader needs and exactly what every model before it couldn't do

and the economics work in your favor

the workers are cheaper models, so the expensive brain only spends tokens on planning, checking and deciding... operators running this exact shape report their token bill going down, not up

## build your workers

the leader setup needs a team, and a worker takes two minutes to create

every worker is one small file in `.claude/agents/` inside your project: a name, the model it runs on, and a short job description

that's the entire mechanic... Fable reads the folder and knows who it can delegate to

a worker file, complete:

the verifier matters more than any worker

fresh eyes catch what the author can't, and a checked stage never has to be redone three stages later

three rules that keep the team fast:

> one worker, one lane... parallel lanes only when the tasks don't touch the same files

> workers run on Opus, the labor tier... Fable stays in the leader seat where the premium earns itself

> everything a worker claims, the verifier confirms... no self-graded homework

and if you run Codex too, it slots in as a second pair of hands: Fable can drive it through the terminal like any other tool, same rules, same verifier

## secret 1: don't overguide it

everything you learned about prompting was built for weaker models

step-by-step instructions, long rule lists, detailed scripts... that scaffolding kept old models on track, and on Fable it does the opposite

skill files written for older models actively drag its output down, because you're constraining a model that plans better than the script does

Fable is naturally very good at understanding context, planning for the long run, and remembering what matters

so give it three things and get out of the way:

> the outcome you want

> the constraints that must hold

> the reason you need it ("i'm preparing this for [who], they need [what], with that in mind: [request]")

that last line matters more than people expect... the reason reliably beats the bare request

and two things to never do, because both break the model:

> never ask it to show or explain its reasoning... that request can trip a safety filter, and your work silently gets handled by a lesser model while you think you're running Fable

> never show it how many tokens or how much budget it has left... a visible countdown makes it wrap up early and suggest a new session instead of finishing

## secret 2: keep your CLAUDE.md light

CLAUDE.md is the file Fable reads before every task in Claude Code, its standing memory of your project

the instinct is to stuff it... resist that, because a light file outperforms a heavy one on this model

three sections are enough:

> what this project is, in two lines

> the commands you actually use

> the mistakes it keeps making

open yours tonight and delete half of it

the shorter file is the upgrade

## secret 3: abuse loops and goals

this is where Fable stops being a chat and becomes a machine that works while you live your life

goals: in Claude Code, /goal lets you write one finish line, and a small judge model checks after every turn whether it's crossed... if not, Fable keeps working, on its own, until it's done

the craft is writing a finish line it can't fake:

> demand visible proof: "run the tests and paste the output, it must pass" is better than "make the tests pass"

> add a brake: "or stop after 20 turns", because there is no built-in limit and a loose goal with no brake has billed someone $960 on a single prompt

> keep one honesty line in every brief: every progress claim must point to a real result from the run... this alone nearly eliminates fake "done" reports

loops do the same on a schedule: every night, every hour, every monday

a loop that reviews yesterday's work, a loop that updates your docs, a loop that watches your numbers and drafts the alert

between goals and loops you can keep Fable working on something for as long as the job needs

hours of unattended work, with proof waiting at the end instead of promises

## how to one-shot a real project

everything above, assembled once, on a real build

the example is a landing page with a working waitlist, swap in your own project and the sequence holds

step 1, the brief

you type one message:

"i'm launching [product] for [audience], they need a landing page that captures emails

build it: one page, one clear promise, an email form that stores signups, looks premium

constraints: no frameworks i have to maintain, works on mobile, loads fast

plan first, then delegate, verify every stage"

step 2, the plan

switch to plan mode (shift+tab) and let it plan before it touches anything

if you installed the pocock skills collection (github.com/mattpocock/skills), say "use the planning skills"... the plan comes back staged, scoped and testable

read it, cut what you don't want, approve

step 3, the team goes to work

Fable dispatches the builder on stage one, the verifier checks it cold, stage two starts only after a pass

you're not watching any of this

step 4, the finish line

set the goal and walk away:

"/goal the page runs locally, the form stores a test signup,
proven by pasting the server response and a screenshot of the page on mobile width,
or stop after 25 turns"

step 5, the morning review

you come back to a run log where every claim has proof attached

review the screenshots, request the changes you want, ship

first time through takes an evening

the second time you'll realize the sequence is the same for every project you've been postponing... which is exactly what the next chapter is about

## the five workflows where it makes real money

now point the whole setup at something worth building

these five are where Fable makes a difference you can measure:

the giant codebase job: the migration scoped at weeks that nobody volunteers for

the leader runs it in stages, a fresh reviewer checks every stage, every progress claim ties to a real test result... the weeks-long job lands in days

deep research sprints: one goal in, workers gathering in parallel, a checker attacking every claim, structured files out

you come back to a dossier where every claim survived an attack, ready to feed a launch, a piece of content, or a market decision

the orchestrator setup: the leader system from the top of this article as a permanent installation

team-scale output from one seat, and the architecture outlives this model... whatever ships next slots into the same seat

reference-driven frontend: a folder of screenshots from sites with the taste you want, real CSS pulled from devtools, Fable building against the references and comparing its output to them in a loop

you supply the taste, it supplies the eyes and hands

knowledge base building, the longest run of all: point it at everything worth knowing in your field and let it build an interlinked vault out of it

a copywriter does this with the best sales pages ever written, a designer with design systems, an agency with case studies... the vault briefs every future model you ever run, forever

each of these was a someday project a month ago

each one is a this-week project now

## the whole setup in one block

> run Fable as the leader: pocock skills for the plan, Opus and Codex workers for the labor, Fable reviews everything

> don't overguide: outcome + constraints + reason, delete the scaffolding

> keep CLAUDE.md light: what it is, the commands, the known mistakes

> abuse goals and loops: finish lines with pasted proof and a written brake

> point it at the five workflows: codebase, research, orchestrator, frontend, knowledge base
