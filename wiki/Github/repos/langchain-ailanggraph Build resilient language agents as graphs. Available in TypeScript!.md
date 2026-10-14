---
title: "langchain-ai/langgraph: Build resilient language agents as graphs. Available in TypeScript!"
source: "https://github.com/langchain-ai/langgraph"
author:
published:
created: 2026-05-10
description: "Build resilient language agents as graphs. Available in TypeScript! - langchain-ai/langgraph"
tags:
  - "clippings"
  - "github/repo"
clipped: 2026-10-14
---

> 本文上半保留 2026-05-10 的 README 剪藏；2026-10-14 固定版本評估見文末。舊版行銷描述不是本機驗收結果。
[

![LangGraph Logo](https://github.com/langchain-ai/langgraph/raw/main/.github/images/logo-dark.svg)

](https://www.langchain.com/langgraph)

### Low-level orchestration framework for building stateful agents.

Trusted by companies shaping the future of agents – including Klarna, Replit, Elastic, and more – LangGraph is a low-level orchestration framework for building, managing, and deploying long-running, stateful agents.

```
pip install -U langgraph
```

> [!tip] Tip
> If you're looking to quickly build agents, check out **[Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview)** — a higher-level package built on LangGraph for agents that can plan, use subagents, and leverage file systems for complex tasks.

For an equivalent JS/TS library, check out [LangGraph.js](https://github.com/langchain-ai/langgraphjs) and the [JS docs](https://docs.langchain.com/oss/javascript/langgraph/overview).

## Why use LangGraph?

LangGraph provides low-level supporting infrastructure for *any* long-running, stateful workflow or agent:

- **[Durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution)** — Build agents that persist through failures and can run for extended periods, automatically resuming from exactly where they left off.
- **[Human-in-the-loop](https://docs.langchain.com/oss/python/langgraph/interrupts)** — Seamlessly incorporate human oversight by inspecting and modifying agent state at any point during execution.
- **[Comprehensive memory](https://docs.langchain.com/oss/python/langgraph/memory)** — Create truly stateful agents with both short-term working memory for ongoing reasoning and long-term persistent memory across sessions.
- **[Debugging with LangSmith](https://www.langchain.com/langsmith)** — Gain deep visibility into complex agent behavior with visualization tools that trace execution paths, capture state transitions, and provide detailed runtime metrics.
- **[Production-ready deployment](https://docs.langchain.com/langsmith/deployments)** — Deploy sophisticated agent systems confidently with scalable infrastructure designed to handle the unique challenges of stateful, long-running workflows.

> [!tip] Tip
> For developing, debugging, and deploying AI agents and LLM applications, see [LangSmith](https://docs.langchain.com/langsmith/home).

## LangGraph ecosystem

While LangGraph can be used standalone, it also integrates seamlessly with any LangChain product, giving developers a full suite of tools for building agents.

To improve your LLM application development, pair LangGraph with:

- [Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview) – Build agents that can plan, use subagents, and leverage file systems for complex tasks.
- [LangChain](https://docs.langchain.com/oss/python/langchain/overview) – Provides integrations and composable components to streamline LLM application development.
- [LangSmith](https://www.langchain.com/langsmith) – Helpful for agent evals and observability. Debug poor-performing LLM app runs, evaluate agent trajectories, gain visibility in production, and improve performance over time.
- [LangSmith Deployment](https://docs.langchain.com/langsmith/deployments) – Deploy and scale agents effortlessly with a purpose-built deployment platform for long-running, stateful workflows. Discover, reuse, configure, and share agents across teams – and iterate quickly with visual prototyping in [LangSmith Studio](https://docs.langchain.com/langsmith/studio).

---

## Documentation

- [docs.langchain.com](https://docs.langchain.com/oss/python/langgraph/overview) – Comprehensive documentation, including conceptual overviews and guides
- [reference.langchain.com/python/langgraph](https://reference.langchain.com/python/langgraph) – API reference docs for LangGraph packages
- [LangGraph Quickstart](https://docs.langchain.com/oss/python/langgraph/quickstart) – Get started building with LangGraph
- [Chat LangChain](https://chat.langchain.com/) – Chat with the LangChain documentation and get answers to your questions

**Discussions**: Visit the [LangChain Forum](https://forum.langchain.com/) to connect with the community and share all of your technical questions, ideas, and feedback.

## Additional resources

- **[Guides](https://docs.langchain.com/oss/python/learn)** – Quick, actionable code snippets for topics such as streaming, adding memory & persistence, and design patterns (e.g. branching, subgraphs, etc.).
- **[LangChain Academy](https://academy.langchain.com/courses/intro-to-langgraph)** – Learn the basics of LangGraph in our free, structured course.
- **[Case studies](https://www.langchain.com/built-with-langgraph)** – Hear how industry leaders use LangGraph to ship AI applications at scale.
- [Contributing Guide](https://docs.langchain.com/oss/python/contributing/overview) – Learn how to contribute to LangChain projects and find good first issues.
- [Code of Conduct](https://github.com/langchain-ai/langchain/?tab=coc-ov-file) – Our community guidelines and standards for participation.

---

## Acknowledgements

LangGraph is inspired by [Pregel](https://research.google/pubs/pub37252/) and [Apache Beam](https://beam.apache.org/). The public interface draws inspiration from [NetworkX](https://networkx.org/documentation/latest/). LangGraph is built by LangChain Inc, the creators of LangChain, but can be used without LangChain.

---

## 2026-10-14 Repo Intel 覆核

## 一句話說明

LangGraph 是狀態、分支、工具執行與 checkpoint 的底層編排框架。⏳ 有跨重啟續跑或多階段人工核准的 Python 應用再採用；目前保存方法，不改既有公司流程。

## 專案概覽

| 項目 | 本次快照 |
|---|---|
| Stars / Forks | 公開 HTML 約43.2K / 7.4K；API 限流 |
| 主要語言／授權 | Python／MIT |
| 固定 SHA | 69d98cc0d98c87a255ddef7ef1f0fee26c940eb6，main |
| library version | langgraph1.2.15、Python>=3.10 |
| 依賴界線 | core>=1.4.7,<2；checkpoint>=4.3,<5；sdk>=0.4.6,<0.5 |
| Release | library1.2.15於10/12；cli0.4.34於10/13，不是同一套件版本 |
| 精確日期／issue／人力 | API 未取得，本輪 Unknown |

[固定來源](https://github.com/langchain-ai/langgraph/tree/69d98cc0d98c87a255ddef7ef1f0fee26c940eb6)、[套件契約](https://github.com/langchain-ai/langgraph/blob/69d98cc0d98c87a255ddef7ef1f0fee26c940eb6/libs/langgraph/pyproject.toml)、[Releases](https://github.com/langchain-ai/langgraph/releases)。

## Repomix 深度分析

Repomix1.18.1，XML、未 compress、--no-gitignore、共同 translations/** 排除參數：675檔、2,941,666tokens、9,660,034字元。來源689檔。安全掃描排除 libs/cli/tests/unit_tests/test_config.py 的兩個 issue；沒有據此判成真實秘密或漏洞。

| Top5 | Tokens | 佔比 |
|---|---:|---:|
| examples/rag/langgraph_self_rag_local.ipynb | 154,932 | 5.3% |
| examples/rag/langgraph_adaptive_rag.ipynb | 132,623 | 4.5% |
| examples/code_assistant/langgraph_code_assistant_mistral.ipynb | 129,390 | 4.4% |
| examples/rag/langgraph_crag_local.ipynb | 128,024 | 4.4% |
| examples/rag/langgraph_adaptive_rag_cohere.ipynb | 117,958 | 4.0% |

Notebook 大小包含歷史 outputs，不能當本次跑過或核心複雜度。

## 核心功能

StateGraph 宣告 state schema、nodes、edges 與 reducers，再 compile 成可執行 graph；可 stream、interrupt、checkpoint 與分支。LangChain 的現代 create_agent 使用這個底層，兩者不能當成同層替代品。

持久化需明確 checkpointer、適當 backend 與 thread identity。compile 的 checkpointer 預設 None，InMemorySaver 明示供debug/tests，process 重啟不持久。[state compile](https://github.com/langchain-ai/langgraph/blob/69d98cc0d98c87a255ddef7ef1f0fee26c940eb6/libs/langgraph/langgraph/graph/state.py#L1177)、[InMemory](https://github.com/langchain-ai/langgraph/blob/69d98cc0d98c87a255ddef7ef1f0fee26c940eb6/libs/checkpoint/langgraph/checkpoint/memory/__init__.py#L37)。

## 技術架構

```text
State schema + nodes + edges/reducers
    -> StateGraph.compile -> execution/stream
    -> explicit checkpointer + thread_id -> storage
    -> interrupt -> human/application decision -> resume
```

Interrupt 恢復會從 node 開頭重新執行，interrupt 前的外部副作用可能再跑。這不是 exactly-once，發信、付款或外部寫入需 app 自己確保冪等、去重與授權。人核准節點也不代替登入或身份驗證。[interrupt 實作](https://github.com/langchain-ai/langgraph/blob/69d98cc0d98c87a255ddef7ef1f0fee26c940eb6/libs/langgraph/langgraph/types.py#L903)、[官方說明](https://docs.langchain.com/oss/python/langgraph/interrupts)。

### Serializer 與雲端界線

JsonPlusSerializer 預設 pickle_fallback=False，不能寫成 pickle 預設啟用；但 msgpack 的預設 permissive type policy 也不代表能安全讀任意不可信 checkpoint。strict env 或 explicit allowlist 可限制，state compile 只在 strict 設定啟用時建立限制。checkpoint 來源信任仍需 app 處理。[serializer](https://github.com/langchain-ai/langgraph/blob/69d98cc0d98c87a255ddef7ef1f0fee26c940eb6/libs/checkpoint/langgraph/checkpoint/serde/jsonplus.py)。

OSS 不強制使用 LangSmith 雲端。Agent Server、Deployment、trace 與商業服務分開，未因 README 提及就啟用或取得服務權限。[官方概覽](https://docs.langchain.com/oss/python/langgraph/overview)、[persistence](https://docs.langchain.com/oss/python/langgraph/persistence)。

## 社群健康度

多package有近期 releases；本輪未確認固定SHA功能CI、精確人力或完整issue比。論壇有人遇到resume重跑節點，與官方語意一致，不能當新bug；cloud大thread個案也不等於本Python OSS已驗失敗。[resume討論](https://forum.langchain.com/t/pre-interrupt-code-re-runs-on-resume-anti-pattern-or-is-there-a-sanctioned-way-to-detect-resume/3809)。

## 本機驗證

470Python AST解析通過；其中測試檔有invalid escape SyntaxWarning，未視為runtime failure。抽取原始 _get_overwrite，以替代dataclass與sentinel執行五個fixture：typed、單key dict、JSON-erased辨識成功；一般dict與多key sentinel不誤判。只驗此函式，未驗graph持久化、resume、LLM、DB或序列化安全。

證據在 work/repo-intel/langgraph-20261014/ 的 fixed-source.json、inventory.json、repomix.log、repomix.xml、offline_probe.py、offline-results.json；未安裝或啟動服務。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 保存持久化、resume與副作用界線 |
| Codex | Python框架與原生subagents分開，未接線 |
| QA | 可參考中斷／恢復與重複執行測試，不當真人驗收 |
| Automation | 沒有具體續跑需求前不增加graph+DB |

## 安裝建議

**⏳ 保存方法，暫不安裝。** 真正需要跨重啟狀態、分支或人工核准時，再建立最小有明確副作用契約的試驗；不能只加checkpoint就宣稱所有操作可安全恢復。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/langchain — 模型工具抽象與Agent框架評估|LangChain 評估]]
