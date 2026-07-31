---
url: "https://github.com/mvanhorn/cli-printing-press"
tags:
  - "github"
  - "repo"
description: "Every API has a secret identity. This finds it, absorbs every feature from every competing tool, then builds the GOAT CLI — designed for AI agents first, with SQLite sync, offline search, and compound insight commands. - mvanhorn/cli-printing-press"
clipped:
---
# mvanhorn/cli-printing-press: Every API has a secret identity. This finds it, absorbs every feature from every competing tool, then builds the GOAT CLI — designed for AI agents first, with SQLite sync, offline search, and compound insight commands.

> Every API has a secret identity. This finds it, absorbs every feature from every competing tool, then builds the GOAT CLI — designed for AI agents first, with SQLite sync, offline search, and compound insight commands. - mvanhorn/cli-printing-press

**Repo:** https://github.com/mvanhorn/cli-printing-press

---

## 重點筆記
## CLI Printing Press — 是什麼、怎麼用

### 一句話說明

**給一個 API spec（或讓它自動嗅探 API），自動生成一個可直接使用的 Go CLI 工具。**

---

### 核心概念

|名詞|說明|
|---|---|
|**Machine（本 repo）**|生成器本身，產出 Go CLI 程式碼|
|**Printed CLI**|生成出來的 CLI，存放在 `~/printing-press/library/`|
|**Catalog**|內建 30+ 個已設定好的 API（Stripe、GitHub、Discord 等）|
|**Spec**|輸入來源：OpenAPI YAML/JSON、GraphQL SDL、或自行嗅探的格式|

---

### 安裝

```bash
go install github.com/mvanhorn/cli-printing-press/v4/cmd/printing-press@latest
```

---

### 三種使用方式

**1. 從 catalog 直接生成（最簡單）**

```bash
printing-press catalog list              # 看有哪些內建 API
printing-press catalog show stripe       # 查看 stripe 的細節
printing-press generate stripe           # 生成 stripe CLI
```

**2. 從 OpenAPI spec 生成**

```bash
printing-press generate --spec https://api.dub.co/openapi.yaml
printing-press generate --spec ./local-spec.yaml
```

**3. 從 GraphQL 生成**

```bash
printing-press generate --spec schema.graphql --format graphql
```

---

### Claude Code Skills（bonus）

這個 repo 附帶了 7 個 Claude Code skills，安裝後可在 Claude Code 裡用 `/printing-press-*` 呼叫：

```bash
.claude/scripts/install-internal-skills.sh
```

|Skill|用途|
|---|---|
|`printing-press-amend`|根據使用 session 的 friction 自動開 PR 改善 CLI|
|`printing-press-catalog`|從 catalog 瀏覽並生成|
|`printing-press-import`|從現有 CLI 匯入|
|`printing-press-publish`|發布新 CLI 到公開 library|
|`printing-press-polish`|發布前品質改善|
|`printing-press-retro`|反思 machine 本身的問題|
|`printing-press-reprint`|重新生成已有的 CLI|

---

### 也是 Claude Code Plugin

這個 repo 有 `.claude-plugin/`，可以直接當作 Claude Code Marketplace plugin 安裝（`mvanhorn/cli-printing-press`）。

這個repo值得安裝嗎

對你目前的工作流程來說，**不值得安裝**。原因：

**主要障礙**

- 輸出是 **Go 程式碼**，需要 Go 環境才能編譯執行
- 你的技術棧是 Python（social-monitor、autohedge 都是 Python）
- 生成出來的 CLI 你還要自己維護

**什麼人值得安裝**

- 頻繁要對陌生 API 快速打造 CLI 工具的人
- 本來就用 Go 的開發者
- 要大量整合第三方 API（Stripe、HubSpot、Jira）的人

**你比較適合的替代方案**

- 你已有 `twitter`、`threads-api`、`x-trends` 等 skills，用 Python scripts 做 API 整合反而更靈活
- 如果只是想快速呼叫某個 API，直接讓 Claude 寫 Python script 更快

唯一可能有用的場景是：如果你想幫 autohedge 或其他工具快速做一個 CLI 介面——但那時候再考慮也來得及。


## README

