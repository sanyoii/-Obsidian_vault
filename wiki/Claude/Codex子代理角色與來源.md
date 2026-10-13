---
title: Codex 子代理角色與來源
date: 2026-09-29
tags: [Codex, agents, configuration]
type: reference
---

# Codex 子代理角色與來源

本頁保存本次對話介紹的角色與來源查核。範圍是這台電腦與本次會話；角色出現在清單、檔案存在、模型實際執行與任務品質是不同證據。

## 從哪裡來

| 類別 | 角色 | 查核結果 |
|---|---|---|
| Codex 內建 | default、worker、explorer | 官方文件列出的三個內建角色，本次工具清單亦有 |
| 第三方 Agency 角色 | 下表 17 個職能角色 | 本機 Codex 與 Claude 同名指令本文比對全部一致；既有 Wiki 記載 Agency-Agents 來源，公開專案亦列出對應角色 |
| 第三方工程角色 | test-engineer、code-reviewer | 可追到 addyosmani/agent-skills 的 agents 定義；test-engineer 本機兩端本文一致，code-reviewer 不完全一致 |
| 本機自訂角色 | luna_reader、luna_worker、terra_reviewer、sol_worker、sol_max_validator | 2026-09-28 安裝收據與目前五個檔案 SHA-256 全部相符 |

來源：[Codex 官方 subagents 文件](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents)、[Agency-Agents 原始專案](https://github.com/msitarzewski/agency-agents)、[test-engineer 原始定義](https://github.com/addyosmani/agent-skills/blob/main/agents/test-engineer.md)、[code-reviewer 原始定義](https://github.com/addyosmani/agent-skills/blob/main/agents/code-reviewer.md)。

Corporate Training Designer 的名稱、描述與指令開頭，與 [Agency 上游檔案](https://github.com/msitarzewski/agency-agents/blob/main/specialized/corporate-training-designer.md) 相符。這支持其角色內容來源，不能據此推定每個檔案都與上游最新版本完全一致。

## 角色用途與檔名

下表依本機角色定義與本次可用工具清單整理。檔名均位於 `C:/Users/sanyo/.codex/agents/`。A 表示 Agency 類，E 表示 addyosmani 工程類；這是用途摘要，不是能力實測評級。

| 角色 | 用途 | 類別／本機檔名 |
|---|---|---|
| Corporate Training Designer | 需求、課程、練習與學習成效 | A：corporate-training-designer.toml |
| Blockchain Security Auditor | 智能合約漏洞與攻擊分析 | A：blockchain-security-auditor.toml |
| Solidity Smart Contract Engineer | 合約實作與 EVM 工程 | A：engineering-solidity-smart-contract-engineer.toml |
| API Tester | API 功能、錯誤與效能驗證 | A：testing-api-tester.toml |
| Test Results Analyzer | 結果分析與驗證缺口 | A：testing-test-results-analyzer.toml |
| Security Engineer | 應用安全與威脅分析 | A：engineering-security-engineer.toml |
| Reality Checker | 對照證據檢查完成主張 | A：testing-reality-checker.toml |
| Product Manager | 需求與產品優先序 | A：product-manager.toml |
| UX Researcher | 使用者研究與可用性 | A：design-ux-researcher.toml |
| Workflow Architect | 完整流程、分支與交接 | A：specialized-workflow-architect.toml |
| Data Engineer | 資料流程與基礎設施 | A：engineering-data-engineer.toml |
| Analytics Reporter | 分析、指標與報告 | A：support-analytics-reporter.toml |
| Document Generator | 文件與簡報等檔案製作 | A：specialized-document-generator.toml |
| Technical Artist | Shader、VFX 與遊戲引擎素材流程 | A：technical-artist.toml |
| Visual Storyteller | 視覺敘事與圖像溝通 | A：design-visual-storyteller.toml |
| Chief of Staff | 協調、決策整理與工作追蹤 | A：specialized-chief-of-staff.toml |
| Project Shepherd | 跨團隊交接與進度 | A：project-management-project-shepherd.toml |
| test-engineer | 測試策略、測試撰寫與覆蓋 | E：test-engineer.toml |
| code-reviewer | 正確性、架構、安全與效能審查 | E：code-reviewer.toml |

Technical Artist 的專長偏遊戲引擎與美術工程；先前把它放在一般文件製作旁，容易誤解用途，這裡已修正。

## 五個本機自訂角色

| 名稱 | 設定模型 | 設定強度 | 用途 |
|---|---|---|---|
| luna_reader | gpt-5.6-luna | medium | 範圍小的唯讀調查 |
| luna_worker | gpt-5.6-luna | medium | 小型、單一寫入者實作 |
| terra_reviewer | gpt-5.6-terra | high | 唯讀正確性與範圍審查 |
| sol_worker | gpt-6-sol | medium | 有界的多步本機實作 |
| sol_max_validator | gpt-5.6-sol | max | 高風險最終唯讀驗證 |

此表是設定值，本輪未啟動任何代理，沒有本輪有效模型／權限證據。其餘上述 19 個第三方角色檔未指定 model 或 model_reasoning_effort；執行設定須依宿主繼承與覆寫規則確認。

安裝證據位於公司 `Doc/global-agent-candidates-20260928/installation.json`，時間欄為 `2026-09-28T04:18:12.663127+00:00`。本輪只核對五檔雜湊。該批 README 與收據記錄有限合成任務已完成，屬歷史紀錄，未重跑、不擴張為全任務品質保證。

## 載入方式與角色的意義

官方文件說明，自訂角色可置於個人 `~/.codex/agents/` 或專案 `.codex/agents/`，以 TOML 的 name、description、developer_instructions 定義。角色可以另帶模型等設定。角色名稱本身不是模型名稱，也不證明專門訓練或實際專業資歷。[官方設定說明](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents)

```text
第三方角色文字／本機自訂指令
                ↓
個人 agents/*.toml
                ↓
Codex 本次可用角色清單
                ↓
有授權時才派工，執行結果另外驗證
```

本機 config.toml 的 agents 區段只有 `max_concurrent_threads_per_session = 2`，沒有逐角色登記；獨立 TOML 探索方式與官方文件吻合。本輪 agents 目錄有 172 個 TOML，這是檔案數，不直接當成 172 個已驗通角色。本次可用清單已明列本頁介紹的角色。

角色中的「多年經驗」「曾審計大量協議」等敘述是提示詞人設，不能轉述為 AI 的真實履歷。公司 skills/card.md 名冊與全域 Codex 角色是兩個系統；同名 Chief of Staff 也不代表自動共用公司流程。

## 證據與尚未確認

- Codex 定義：`C:/Users/sanyo/.codex/agents/*.toml`；代表檔 corporate-training-designer.toml 第 1–4 行為名稱、描述與指令起點。
- Claude 端比對：`C:/Users/sanyo/.claude/agents/*.md`；移除 Markdown frontmatter、統一換行與首尾空白後，17 個 A 類本文全相符，test-engineer 亦相符，code-reviewer 不相符。未改任何角色設定。
- 既有來源登記：[[wiki/Claude/Claude 工具全覽（2026）|Claude 工具全覽]] 的 Agency-Agents 段落記錄原始專案與 Claude 安裝位置。
- 自訂角色收據：`D:/Codex/AI-一人公司/Doc/global-agent-candidates-20260928/installation.json`，五檔目前 hash 相符。
- 未找到 Agency 角色轉入 Codex 的精確日期、執行者、安裝指令或完整匯入收據。本機兩端一致支持相同內容來源，不能證明搬移方向或執行者。
- 嘗試取得 GitHub 原始樹做完整上游逐位元比較時，Node fetch 失敗；改由可用 web 工具核對上游代表定義與目錄。本輪沒有宣稱全部角色與上游最新 commit 相同。
- code-reviewer 本機兩端差異未進一步逐行評估；來源家族可辨識，不能說兩檔是完全相同版本。
- 沒有測試 UI 是否提供角色選單，沒有啟動代理、安裝套件或更改模型／權限。

## 反向連結

- [[wiki/_index|知識庫主索引]]
- [[wiki/Web3-基礎/區塊鏈與QA課程/00-課程入口|區塊鏈與 QA 課程]]：本次課程由主代理製作，沒有調用 Corporate Training Designer。
