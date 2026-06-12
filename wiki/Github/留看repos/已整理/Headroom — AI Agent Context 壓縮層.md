# Headroom

> AI Agent 的 Context 壓縮層。在 prompt 送出前自動壓縮，節省 60–95% tokens，答案品質不變。

**Repo：** https://github.com/chopratejas/headroom  
**PyPI：** `pip install "headroom-ai[all]"`  
**npm：** `npm install headroom-ai`  
**授權：** Apache 2.0  
**社群已節省：** 600 億+ tokens

---

## 一句話說明

幫 Claude Code / Cursor / Codex / LangChain 等 AI Agent 在送出 prompt 前壓縮所有內容（tool 輸出、log、RAG 結果、對話歷史），省錢不掉精度。

---

## 真實節省數字

| 工作負載 | 壓縮前 | 壓縮後 | 節省 |
|---------|--------|--------|------|
| Code search（100 筆）| 17,765 | 1,408 | **92%** |
| SRE 事件偵錯 | 65,694 | 5,118 | **92%** |
| GitHub issue 分類 | 54,174 | 14,761 | **73%** |
| Codebase 探索 | 78,502 | 41,254 | **47%** |

準確率幾乎不變（GSM8K ±0%、工具呼叫 97%）。

---

## 4 種使用方式

| 模式 | 指令 / API |
|------|-----------|
| Library | `compress(messages)` — Python / TypeScript |
| Proxy | `headroom proxy --port 8787` 零程式碼改動 |
| Agent wrap | `headroom wrap claude\|codex\|cursor\|aider` |
| MCP server | `headroom mcp install` |

---

## 核心架構

```
Agent（Claude Code / Cursor / Codex / LangChain…）
    │  prompt + tool 輸出 + log + RAG
    ▼
┌──────────────────────────────────────┐
│  Headroom（本地執行，資料不外送）      │
│  CacheAligner → ContentRouter → CCR   │
│    ├─ SmartCrusher   (JSON)           │
│    ├─ CodeCompressor (AST)            │
│    └─ Kompress-base  (prose, HF 模型) │
│  Cross-agent memory · learn · MCP     │
└──────────────────────────────────────┘
    │  壓縮後 prompt
    ▼
LLM provider（Anthropic / OpenAI / Bedrock…）
```

---

## 6 種壓縮演算法

| 演算法 | 針對內容 |
|--------|---------|
| SmartCrusher | JSON 陣列 / 巢狀物件 |
| CodeCompressor | 程式碼（AST，Python/JS/Go/Rust/Java/C++）|
| Kompress-base | 自然語言（HuggingFace 自訓練模型）|
| CacheAligner | 穩定 prefix，KV cache 命中率最大化 |
| IntelligentContext | 重要性評分 context fitting |
| Image 壓縮 | 圖片 40–90%（ML router）|

---

## CCR（可逆壓縮）

壓縮後原始內容存在本地，LLM 可透過 `headroom_retrieve` 工具隨時取回，永不遺失。

---

## 支援整合

Python SDK · TypeScript SDK · Anthropic/OpenAI SDK · Vercel AI SDK · LiteLLM · LangChain · Agno · Strands · ASGI middleware · MCP

---

## 技術規格

- **語言：** Python（主）+ Rust（`headroom-core` crate 高效能核心）+ TypeScript SDK
- **Python：** 3.10+
- **檔案數：** 1,447

---

## 安裝評估（個人筆記）

**目前暫不安裝，原因：**
- 用訂閱制 Claude Code，不是按 token 計費的 API，省 token 效益不直接
- Claude Code 已內建 compact，功能重疊
- `headroom learn` 自動寫入 CLAUDE.md 可能衝突現有精細設定
- proxy 模式多一層 middleware，增加 debug 複雜度

**未來考慮安裝的場景：**
- 有付費 API 應用需要壓縮 token（social-monitor / job-crawler 換 API 付費版時）
- 用 Library 模式 `compress(messages)` 直接在程式碼中使用

---

## Tags

#tool #llm #token-compression #ai-agent #claude-code #context-management #proxy
