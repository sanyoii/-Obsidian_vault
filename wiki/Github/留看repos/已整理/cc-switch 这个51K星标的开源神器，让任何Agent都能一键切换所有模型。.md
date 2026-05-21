---
title: "这个51K星标的开源神器，让任何Agent都能一键切换所有模型。"
source: "https://x.com/Khazix0918/status/2048983462942789978"
author:
  - "[[@Khazix0918]]"
published: 2026-04-28
created: 2026-05-10
description: "上周我一连发了好几篇模型评测的文章。特别是上周五，直接化身鸡排哥一天三连发。然后，很多朋友就在下面问我。其实说实话，上周一我已经写了一篇超级详细的Claude Code使用教程，里面就有很大的篇幅，写的就是如何在Claude Code里接国产模型这件事。不过说实话，其实大家都懂，..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HG91liRbwAA92sX?format=jpg&name=large)

上周我一连发了好几篇模型评测的文章。

特别是上周五，直接化身鸡排哥一天三连发。

然后，很多朋友就在下面问我。

![Image](https://pbs.twimg.com/media/HG9pi1qakAAoBGJ?format=jpg&name=large)

其实说实话，上周一我已经写了一篇超级详细的Claude Code使用教程，里面就有很大的篇幅，写的就是如何在Claude Code里接国产模型这件事。

不过说实话，其实大家都懂，就是那么长的教程文，其实看的后面的真的没几个。

所以，我也觉得，得把这个我自己真的用的非常多也超级好用的小工具，单独拎出来详细的写一篇，分享给大家。

毕竟，这个工具在我看来，他目前确实不仅是Claude Code里接国产模型，也还是其他的各种Agent产品比如OpenClaw、Hermes等等里面，切换模型最方便、最好用的一个。

他就是开源的大名鼎鼎的cc switch，至今在github上已经50k的星标了。

![Image](https://pbs.twimg.com/media/HG9pnjoaIAArRZC?format=jpg&name=large)

链接在此：

[https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)

它的工作原理也超级简单，就是直接帮你去改模型配置文件。

因为大家要知道其实要给Claude Code、OpenClaw之类的Agent产品，改你的背后的模型，其实对于非程序出身的绝大多数的普通人来说，是有一点麻烦的。

因为，你是真的要懂一点代码，知道啥叫配置文件，才能去手动修改的。

在Claude code里，这玩意就是settings.json文件。

![Image](https://pbs.twimg.com/media/HG9psJja4AAPsML?format=jpg&name=large)

你只要自己手动改过一次Claude Code的settings.json，你就知道这事到底有多烦。

我到现在还记得，当初GLM-5刚发布的时候，我想试一下，把它接到Claude Code里面去用。

当时看文档，他让我找到Claude Code的settings.json，开始手填各种东西。

![Image](https://pbs.twimg.com/media/HG9pxZ2bkAA5yAg?format=png&name=large)

base\_url、auth\_token、model name各种字段。。。

我人直接炸了，真的，感觉这事太蠢了。

之前玩小龙虾的时候也是一样，每次出了新模型想试试，我就直接让它自己去给自己改模型。

结果我相信玩过小龙虾的都知道了，小龙虾GG的最常见的原因，基本就是换模型，经常就是模型切着切着，然后自己就崩了。

简直太呆逼了。。。

直到后面我实在忍无可忍，就去问了下Claude，有没有类似的可以便捷切换Agent产品模型的开源项目，当时还真挖到了。

从那以后，我再也没为切模型这事烦恼过。

回到CC Switch本身。

它是一个桌面App，全平台也就是Windows、Mac、Linux都可以用。

目前一共6个Agent工具，Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw，前几天最新版还把 Hermes也加进来了。基本上你电脑上在跑的这类Agent工具，它都用得上。

因为是个纯粹的开源产品，所以信息啥的还是比较安全的，所有相关的数据都存在你本地的一个SQLite数据库里，路径是~/.cc-switch/cc-switch.db。

包括你添加的供应商配置，全局配置，模型定价之类的等等的东西。

你在用他切换供应商的时候，它会从这个数据库里读出对应配置，再帮你写到各家Agent的配置文件里，从而帮你无痛切模型。

直接进入项目的github，下滑找到Assets。

[https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)

根据自己的系统找到对应的文件进行下载安装。

![Image](https://pbs.twimg.com/media/HG9qA2HaUAAcLk3?format=jpg&name=large)

比如Mac，我们下载好红框中的文件。

![Image](https://pbs.twimg.com/media/HG9qDBTbgAAGnVI?format=png&name=large)

直接双击运行，然后在App中我们就能看到这个logo和Claude极其相似，但颜色不一样的东西了。

![Image](https://pbs.twimg.com/media/HG9qGm1aUAAqYBy?format=jpg&name=large)

安装好后，我们主要再来非常非常详细的说说他怎么用。

先来看怎么在Claude Code里接模型。

我们双击打开CC Switch。

在Claude图标下面点击右侧的加号。

![Image](https://pbs.twimg.com/media/HG9qKYDbYAABi9b?format=png&name=large)

它内置了40+家供应商的预设，智谱、MiMo、DeepSeek、千问、Kimi、MiniMax、DouBaoSeed、阶跃等等等等，反正国内主流的他基本都有。

![Image](https://pbs.twimg.com/media/HG9qOFHakAAAq0m?format=png&name=large)

我们这里以GLM为例，选Zhipu GLM，你想用哪个模型就点哪一家就行。

![Image](https://pbs.twimg.com/media/HG9qV2HbQAEjIMr?format=jpg&name=large)

没选供应商的话，所有的配置都是空的。

选好供应商之后，除了API Key，剩下的字段它都帮你预填好了，完全不用你操心。

![Image](https://pbs.twimg.com/media/HG9qZIbaAAAgtb2?format=jpg&name=large)

API Key填进去之后，可以下拉看一眼CC Switch自动给你配的模型版本，不喜欢可以改。

![Image](https://pbs.twimg.com/media/HG9qdJrbkAAYf6A?format=jpg&name=large)

你要是不清楚模型名字的话，就点右上角的获取模型列表。

![Image](https://pbs.twimg.com/media/HG9qgzFb0AAaYJc?format=jpg&name=large)

然后你就可以看到厂商提供的所有可以调用的模型了。

这里需要注意一下，并不是每个供应商都支持查询列表，不支持的话就需要你手动填一下模型名。

![Image](https://pbs.twimg.com/media/HG9qkgFaQAA5u5q?format=jpg&name=large)

模型修改后，你能看到他给你写的配置文件代码是随你同步的。

![Image](https://pbs.twimg.com/media/HG9qoZkaMAAPXjc?format=jpg&name=large)

这里的配置json文件，就是CC Switch会写进Claude code的settings.json里面的内容，但其实我们根本不用管。

![Image](https://pbs.twimg.com/media/HG9qr-ga8AEFV_m?format=jpg&name=large)

从头到尾我们做的就三步，选供应商、填API Key、选模型就行了。

格式啊兼容啊七七八八的问题，你都不用操心。

最后，点击右下角的保存。

这样，我们就能在首页的模型列表看见他了，直接点启用，就能在Claude code里用上了。

其他家的模型，也可以同样的操作加进来。

甚至切换的时候我们都不用再点开主页面。

直接点击桌面右上方的图标，你想换哪个就点哪个，每个工具下面挂着自己的一套供应商列表，互不干扰。

![Image](https://pbs.twimg.com/media/HG9r7lNaMAABpN4?format=png&name=large)

这玩意装上以后有一个很爽的点就是，在Claude Code里面，热切换模型的操作变得无敌简单。

热切换，就是你不用重启终端，不用关掉Claude Code当前会话。

比如你正跑着东西，觉得这个模型不太聪明，你只需要等他回复之后，在菜单栏点一下CC Switch的小图标，选一个别的模型，切完就立刻生效。

下一轮对话直接就是新模型在回你了。

但是注意，你千万不要犯傻，非要在模型正在干活的时候切，那...必然会报下面的错。

![Image](https://pbs.twimg.com/media/HG9q4GKasAAlyKd?format=jpg&name=large)

这个功能用来做成本管理，贼爽。

因为其实我知道，很多朋友做一些日常任务，还有大项目里的部分小活儿，其实没必要上最贵最强的模型，挂个性价比高的模型，真的又快又便宜。

而做这个成本管理的操作成本，有了他几乎为零了。

但光是切模型这一个功能还只是基操，CC Switch里还做了很多功能。

比如，他还做了个用量追踪，可以快速看到，API key接入的余额，和coding plan的额度。

![Image](https://pbs.twimg.com/media/HG9sBambQAAspSl?format=jpg&name=large)

打开用量配置的操作也不复杂。

在模型列表点击配置用量查询。

![Image](https://pbs.twimg.com/media/HG9sEIqbMAAW6Oc?format=png&name=large)

打开启用用量查询。

![Image](https://pbs.twimg.com/media/HG9sGylawAAoPuj?format=jpg&name=large)

如果你是走的API，这里点击官方，再点击保存配置。

![Image](https://pbs.twimg.com/media/HG9sI_obQAAjaqj?format=png&name=large)

如果你是买的token plan的话。这里我们不点官方，而是点token plan。

选择对应的模型供应商，点击保存配置。

首页列表就能看到实时的消耗或者余额了。

除了用量，CC Switch还提供了更详细的使用统计，可以更直观地看到每个时间段的成本消耗。

能明显的看到，过去一天我的用量高峰，基本都是下了班以后的凌晨，夜深人静，适合Coding。。。

就这个统计，真的非常的好用。

最后一个，也是一个非常实用的功能，特别适合一些使用多个国产模型搭配使用的用户。

就是，有的时候，你可能会睡前给agent派个大活，让他抓紧我睡觉的时候猛猛干活。

但是呢，你可能会遇到额度突然用完，或者魔法不稳定中断的情况，第二天起床一看，活儿压根没干完。

这种事用CC-Switch的本地代理带故障转移就能解决。

CC-Switch可以在你本地起一个代理服务，拦住你的CLI工具发出去的请求，帮你做API格式转换、故障转移和熔断保护。

翻译成人话就是。

你给同一个工具配了三家Claude Code供应商，比如GLM、MiMo、DeepSeek。

某天，某一家突然宕机了，或者额度用完了，或者请求半天没响应。

CC Switch会自动切到下一家继续跑，无痛迁移，不让你的等待变成白等。

详细的操作我也写在这里了。

我们点进左上角的设置。

![Image](https://pbs.twimg.com/media/HG9sZoxbQAAPEoK?format=jpg&name=large)

找到路由服务，先打开本地路由的开关，把本地代理服务跑起来。

在应用路由区域启用Claude路由，把Claude Code的请求接到本地代理上。

这里建议也点开在主页面显示本地路由开关。这样我们在主页就能快速打开或关闭路由。

然后我们打开自动故障转移，选择Claude，再点添加供应商，把你要做备用的几家加进队列。

但是这里需要注意，如果你用的是Claude的官方模型，那就别开路由，问题还是有点多的。

最后我们可以在首页列表通过拖拽给他们排序。

![Image](https://pbs.twimg.com/media/HG9tOGeaUAAWWuN?format=jpg&name=large)

这样CC Switch会优先列表上面的供应商进行路由，碰到故障就自动往下一家切。每个供应商卡片上会显示一个健康状态徽章。

要关闭的话，直接在主页把这两个按钮关闭就行。

除了上面说的这些，CC Switch还有挺多其他功能可以细挖，比如会话管理。

![Image](https://pbs.twimg.com/media/HG9tll6aUAANVQw?format=jpg&name=large)

还有模型配置云同步等等，这里就不一一展开了。

官方提供了一份非常全面的用户手册，写得很详细，地址放在这里，有兴趣的朋友可以去翻翻。

[https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/README.md](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/README.md)

感谢每一位可以看到这里的朋友。

说实话，这篇文章，我自己读下来是有点枯燥的。

但是作为一篇工具介绍的文章，我也确实写不出什么花来。

这类文章的完读率也一向比较低。

但如果能帮到其中，哪怕一个人。

那我觉得，这篇文章也就有价值了。

希望能对大家有那么一点点用。

剩下的，就交给屏幕前的你自己折腾了。

祝各位，创作愉快。