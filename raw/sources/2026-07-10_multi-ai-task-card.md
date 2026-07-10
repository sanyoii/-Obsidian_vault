<!-- processed: 2026-07-10 -->
<!-- 來源：Leo (X @runes_leo)，訂閱區 https://x.com/runes_leo/creator-subscriptions/subscribe -->
<!-- 取得方式：使用者貼原文；解讀為 wiki/Claude/multi-ai-task-card.md -->

# 多 AI 协作不断片：我用任务卡把 Claude / Codex / Cursor 接起来

上次发过一条：多 AI 协作最难的不是 prompt，而是怎么让 Claude、Cursor、Codex 在不同对话里接得上、交得回。

里面把我现在的拆法写成五层：业务线对话只负责调度验收、任务卡记状态、执行模型推进、可验证产物证明、验收后再写回。核心就一句——聊天窗口适合推进，状态必须落到机器能读、别的 AI 也能接上的地方。

评论区有读者直接问：具体怎么操作？如果能出个 blog，一定点赞，甚至可以打赏。

这篇就是那篇 blog。

很多人开始同时用 Claude、Codex、Cursor、Grok 以后，很快会撞到同一个坑：一个任务在几个 AI、几个聊天、几个 repo 或文档之间来回接力时，下一棒到底靠什么知道现在到哪了？

如果答案是"靠它读聊天记录"或"靠它记得上次说过什么"，这个系统迟早会断。

聊天窗口适合推进，不适合当长期状态库。它能记录一段对话，但不会自动告诉下一个模型：哪条判断已经过时，哪个文件才是最新产物，哪个动作必须停在人类确认前。

我现在更倾向于把每个可交接任务先压成一张 AI Task Card。

它不是复杂系统，也不是模板包。它只是一个很小的工作单，把目标、边界、验收、产物和确认点写清楚。

我自己用下来，最核心的判断是四句：

Conversation moves the work.
Task card holds the state.
Artifact proves the work.
Writeback updates the next step.

中文就是：

对话负责推进。
任务卡负责状态。
产物负责证明。
写回负责接续。

AI Task Card 工作流前端示意

## 一个很常见的断片现场

举个脱敏的例子。

我把一个公开回复丢给 AI，说："继续把这个写成一篇文章。"

如果它只靠聊天记录，第一反应通常是直接开始写正文。

问题是，它可能不知道这件事前面已经有几个限制：

只能先写草稿，不能发布；
demo 要用合成素材，不能录真实桌面；
结尾可以提 agent resource，但不能写成人类模板包广告。

于是它很容易写出一篇看起来能用、但下一步全是坑的稿子。

产物放哪？谁来验收？哪里必须停下？另一个 AI 接手时应该读哪个文件？

这些都没有。

这种断片不是因为模型笨，而是因为"当前状态"只藏在聊天里，没有被压成一张可读取的任务卡。

## 聊天记录不是状态库

我以前也会把很多上下文直接堆在聊天里。

短期看很顺，因为你刚说过的东西模型还能接住。

长期看会出问题，因为聊天是一条时间线，不是状态机。

时间线的问题是：它会把所有东西都混在一起。

你可能前面说过一个方向，后面又否定了；前面让它做 A，后面临时改成 B；前面有个路径，后面文件已经换地方了。

人自己知道哪个判断更新，但下一个 AI 不一定知道。

换一个模型、开一个新对话、从 Cursor 切到 Codex，问题会更明显。它看到的不是"当前状态"，而是一堆历史片段。

于是它只能猜：

这件事是不是已经做完？
哪个文件是最新的？
现在能不能发布？
下一步应该继续写，还是先等人确认？

这就是很多多 AI 工作流断片的原因。

不是模型不会做事，而是任务状态没有被放在一个稳定的位置。

## 我把任务拆成六个节点

一个能接力的 AI 工作流，不需要一开始就很复杂。

我现在会先把它拆成六个节点：

human request
  -> working conversation
  -> task card
  -> execution place
  -> artifact
  -> writeback

第一个节点是人的请求。
它经常是模糊的，比如"继续推进这个文章""把这个需求做一下""看下这个链接能不能变成内容"。

第二个节点是工作对话。
对话窗口只负责推进：理解意图、拆边界、判断风险、安排下一步。它不应该承担长期记忆和事实数据库的角色。

第三个节点是任务卡。
任务卡负责把"继续推进"这种模糊请求变成一个可交接的状态单元。

第四个节点是执行位置。
它可能是某个 repo、某个文档、某个草稿目录，也可能只是一次只读判断。先知道工作发生在哪里，才能避免 AI 在错误的地方开工。

第五个节点是产物。
可以是草稿、报告、预览、截图、代码 diff、测试结果、demo outline。没有产物，就不要轻易说完成。

第六个节点是写回。
做完以后，不是说一句"好了"就结束，而是把 changed、validated、remaining gate、next action 写清楚。

这样下一个 AI 接手时，不用完整读完上一段聊天，也不用猜你脑子里记得什么。它只要读任务卡和产物，就能知道现在到哪了。

## 一张任务卡至少要写什么

我觉得最小版本不用复杂，先写这些字段就够：

goal:
boundary:
context:
current_state:
artifact:
acceptance:
hard_gate:
next_action:
owner:
updated_at:

每个字段都在防一种常见错误。

goal 防止 AI 把愿景当任务。
比如"优化内容系统"太大，"写一版 public-safe 文章草稿"才是这一步能完成的目标。

boundary 防止 AI 去错地方。
代码任务应该进 repo；内容任务应该产出草稿；系统任务要小心状态写回；决策任务不能伪装成执行任务。

context 防止下一个模型靠聊天历史补脑。
它应该写必须知道的背景，而不是把所有历史都塞进去。

artifact 让"完成"变得可检查。
AI 说写了文章，那文件在哪？说做了验证，验证结果在哪？说有预览，预览文件在哪？

acceptance 是验收标准。
没有验收标准，AI 很容易推进一小步就停下，或者把半成品当完成。

hard_gate 是安全边界。
只要涉及发布、资金、账号、凭证、生产、部署、钱包、交易、破坏性清理，就应该停在人类确认前。

next_action 是下一棒该做什么。
它比"继续优化"更具体，最好能让另一个 AI 直接开工。

updated_at 看起来不起眼，但很重要。
旧状态最危险。它看起来像事实，其实已经过期。

## 再看一次这个例子

假设我对 AI 说：

继续推进这个公开回复：
判断它能不能变成内容资产，并准备下一步。

一个不稳的 AI 会直接写。

一个更稳的 workflow 会先生成任务卡：

goal: 判断一个公开回复是否值得变成内容资产
boundary: artifact_bound
context:
  - 来源是一条公开回复
  - 读者想知道具体怎么操作
  - 当前只允许产出草稿和 demo 方案
current_state: intake
acceptance:
  - 已判断 publish / park / source material
  - 已产出 public-safe outline
  - 已标注 remaining gates
hard_gate:
  - public_publish
  - demo_recording
next_action: 先写 public-safe article draft，再等人类确认是否发布

有了这张卡，后面的动作就清楚很多。

AI 不是马上把内容发出去，而是先读来源、判断是否值得写、产出草稿、做脱敏、列出哪些动作还需要确认。

做完以后，它应该写回：

changed:
  - article_draft
  - demo_outline
validated:
  - synthetic data only
  - no private paths
  - no publish action
remaining_gate:
  - publish approval
  - demo recording approval
next_action: human reviews draft

这段 writeback 的价值很大。

它让另一个模型不用读完整聊天，也知道：草稿已经有了，demo 只是 outline，没有录制，没有发布，下一步是人先审。

## hard gate 是自动化的安全阀

AI Task Card 的价值不是让 AI 什么都自动做。

更重要的是，让 AI 知道哪里不能自动跨过去。

我会把这些动作默认写成 hard gate：

公开发布
资金
钱包
下单 / 撤单
账号
OAuth / API key / proxy
生产服务
deploy
scheduler / daemon
destructive cleanup

这些动作不是不能做，而是不能让 agent 自己悄悄做。

任务卡里把 gate 写清楚以后，自动化反而更安全。

AI 可以继续做草稿、验证、整理、预览、生成脚本、列出下一步，但不能替人按下真正有外部影响的按钮。

很多人一聊 AI agent，就会直接跳到"全自动"。

我反而觉得，真正能长期用的 agent workflow，第一步不是放权，而是把边界写清楚。

知道哪里能自动，哪里必须停，比让它一路冲更重要。

## boundary 怎么判

我一般会先粗分四类。

repo_bound：需要改某个 repo、worktree、代码、测试或 PR。
artifact_bound：需要写文章、草稿、报告、预览、配图、录屏或 source note。
system_bound：需要改 routing、automation、agent workflow 或长期状态。
decision_bound：需要做判断、风险评估、是否推进、是否发布、是否交易。

这个分类不是为了显得严谨，而是为了减少错位。

如果是 repo_bound，AI 就应该先确认目标 repo、分支、dirty state、测试方式。
如果是 artifact_bound，AI 就应该先明确产物路径、读者、可公开边界和验收标准。
如果是 system_bound，就要更小心，因为它可能影响后续所有任务的路由和状态。
如果是 decision_bound，AI 可以给判断、证据、选项和推荐，但不应该把人的决策直接伪装成"我已经执行了"。

很多断片不是能力问题，而是边界问题。

任务一开始没分清，后面就会出现：内容任务跑去改代码，判断任务变成执行，草稿任务被误发，demo outline 被当成真实录屏。

## 这东西不一定要做成模板包

我不太想把它理解成"下载一份模板，然后人自己填"。

模板当然有用，但多 AI 协作里真正重复的动作，是 agent 接到模糊请求以后，先把它结构化。

所以更自然的形态是一个 callable resource：

make_task_card(request, context?) -> task_card
validate_task_card(task_card) -> missing_fields / risk_flags
route_work_request(request) -> boundary / hard_gate / next_action

人读文章，是为了理解为什么多 AI 协作会断、任务卡怎么防止断片。

agent 需要的是调用一次，把模糊请求变成结构化任务卡，再开始执行。

这个资源不应该替人发布、部署、交易、创建账号或处理凭证。

它只做一件事：把工作结构化，并把该停下来的地方标出来。

## 先从最小版本开始

如果你也在同时用多个 AI 做事，先不要急着搭复杂系统。

可以先试一个最小版本：

每个可交接任务写一张 task card。
每次完成后必须有 artifact。
每次结束必须写回 next_action 和 remaining_gate。

这三点已经能解决很多问题。

因为下一次你换模型、换窗口、换工具时，它不再需要靠猜。

它能看到目标、边界、产物、验收和下一步。

聊天继续负责推进。
状态留在任务卡里。
完成靠产物证明。
接续靠写回发生。

这就是我现在理解的多 AI 协作不断片。

上面讲的是：为什么多 AI 会断片，以及一张最小 Task Card 怎么接住状态。

「开工前怎么写可检查的完成标准、失败怎么留台账、什么错误不该升级成全局规则」——这部分放在订阅区。

Leo Insider 这一期有：
· 开工验收表：怎么才算完成、用什么验证、最多试几轮
· 失败台账写法：不做、不发、失败怎么留下复用价值
· 错误分流表：什么一次小错不进全局规则
· 收口回执骨架：小任务结束时留下产物、验证、下一步
· hard gate 别名对照表：不同模型别各写各的停法

$5/月，一杯咖啡，随时退 👉 https://x.com/runes_leo/creator-subscriptions/subscribe

适合正在用 Claude / Codex / Cursor 真接力、不想只靠聊天记录硬扛的人
