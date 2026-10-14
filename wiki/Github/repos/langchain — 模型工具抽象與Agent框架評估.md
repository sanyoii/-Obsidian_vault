---
source: "https://github.com/langchain-ai/langchain"
author: "langchain-ai"
stars: "147.8K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "ai-agent"
---

# langchain — 模型工具抽象與Agent框架評估

## 一句話說明

LangChain 提供 Python 模型、工具、訊息與 Agent 的共同介面，現代 create_agent 建在 LangGraph 上。⏳ 有具體 Python 模型／工具應用需求再採用；目前沒有理由為既有公司流程加第二套框架。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Stars / Forks | 公開 HTML 約147.8K / 24.8K |
| Issue / PR | HTML約530 / 115；非精確 REST 值 |
| 主要語言／授權 | Python／MIT |
| 固定 SHA | 170060e8387e06cd67b2458db0f232b2fa53fefd |
| 現代 LangChain | libs/langchain_v1：1.4.5，Python>=3.10,<4 |
| 其他 package | core1.6.10、classic1.0.8；不是同一個 version |
| Release 訊號 | 1.4.5、core1.6.10於10/12，openai1.7.2於10/14 |
| 建立／push／貢獻者 | API限流，本輪精確數據未確認 |

[固定來源](https://github.com/langchain-ai/langchain/tree/170060e8387e06cd67b2458db0f232b2fa53fefd)、[現代 package](https://github.com/langchain-ai/langchain/blob/170060e8387e06cd67b2458db0f232b2fa53fefd/libs/langchain_v1/pyproject.toml)、[Releases](https://github.com/langchain-ai/langchain/releases)。

## Repomix 深度分析

Repomix1.18.1，XML、未 compress、--no-gitignore，使用共同 translations/** 排除參數：3,014檔、4,087,088tokens、17,537,520字元。安全掃描排除三個測試檔（SSRF、evaluation、Ollama auth），另六個 binary fixtures；沒有據此認定真實密鑰外洩。來源總數3,190檔。

| Top5 | Tokens | 佔比 |
|---|---:|---:|
| libs/core/tests/unit_tests/runnables/__snapshots__/test_runnable.ambr | 75,177 | 1.8% |
| libs/partners/openrouter/langchain_openrouter/data/_profiles.py | 70,029 | 1.7% |
| libs/partners/anthropic/tests/unit_tests/test_chat_models.py | 53,333 | 1.3% |
| libs/core/langchain_core/runnables/base.py | 49,724 | 1.2% |
| libs/core/tests/unit_tests/runnables/test_runnable.py | 49,547 | 1.2% |

## 核心功能

模型供應商抽換、tool calling、structured outputs、middleware、Agent graph 與 trace/evaluation 生態。Provider packages 另選與安裝，不能把 monorepo 全部依賴視為單一必裝套件。libs/langchain 是 classic，現代 create_agent 在 libs/langchain_v1。

LangSmith tracing 為可選配置，啟用後會向設定的服務送 trace；不能宣稱 OSS 預設外傳或必買商業方案。Deep Agents／Deployment 也各自分開。[官方概覽](https://docs.langchain.com/oss/python/langchain/overview)。

## 技術架構

```text
app -> messages/models/tools(core + chosen provider)
    -> create_agent + middleware
    -> StateGraph / ToolNode (LangGraph)
    -> optional checkpointer / store / tracing
```

現代package要求core>=1.6.10,<2及langgraph>=1.2.11,<1.3。create_agent的checkpointer預設None，interrupt_before／after也為None；不能只建立Agent就認為有持久化或人工核准。[factory](https://github.com/langchain-ai/langchain/blob/170060e8387e06cd67b2458db0f232b2fa53fefd/libs/langchain_v1/langchain/agents/factory.py)。

HITL middleware 只對 interrupt_on 配置的工具暫停，並非所有外部寫入都自動詢問。recursion_limit9999是執行限制，不能當作成本上限；工具權限、密鑰、輸出和外部副作用仍由app負責。[HITL](https://github.com/langchain-ai/langchain/blob/170060e8387e06cd67b2458db0f232b2fa53fefd/libs/langchain_v1/langchain/agents/middleware/human_in_the_loop.py)、[安全政策](https://docs.langchain.com/oss/python/security-policy)。

## 社群健康度

多package持續release、測試與接線規模大，但本輪沒有確認固定SHA功能CI。官方論壇有人討論大tool output的token成本與工具去重需求；屬應用案例，不當本版已確認缺陷。[使用者案例](https://forum.langchain.com/t/structured-query-over-withheld-large-tool-results-a-lossless-alternative-to-clearing-summarizing/4497)。

## 本機驗證

2,636Python檔盤點；UTF-8 AST讀取2,635通過，另1個刻意非UTF8 fixture以原始bytes按宣告encoding解析也通過。未安裝provider、未調LLM、未跑上游套件測試或全安全稽核。主要架構已由subagent讀原始source，主代理做來源與結構核對。證據：work/repo-intel/langchain-20261014/的fixed-source.json、inventory.json、repomix.log、repomix.xml。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 存抽象、版本與安全界線 |
| Codex | 使用者框架與原生subagents分開，未自動接入 |
| QA | 跨provider契約／工具輸出可測，但測試通過不代表Agent工作結果正確 |
| Automation | 目前不增加服務、trace或第二編排層 |

## 安裝建議

**⏳ 先收藏，具體Python應用需要provider抽換與middleware時再採用。** 最小採core／現代package加必要provider，固定相容版本；LangGraph是Agent底層而非兩個可直接互換的選項。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/langchain-ailanggraph Build resilient language agents as graphs. Available in TypeScript!|LangGraph覆核]]

