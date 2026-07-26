---
source: "https://github.com/HKUDS/DeepTutor"
author: "HKUDS (HKU Data Intelligence Lab)"
stars: "29.8K"
clipped: 2026-07-26
tags:
  - "github/repo"
  - "ai-agent"
  - "rag"
  - "learning"
---

# DeepTutor — 港大開源的 Agent 原生個人化學習工作站

> **HKUDS/DeepTutor** | ⭐ 29,809 | 🍴 3,926 | 📝 Apache-2.0 | Python + Next.js 16 | v1.5.4（2026-07-24）
> 官網 deeptutor.info ｜ 論文 [arXiv:2604.26962](https://arxiv.org/abs/2604.26962) ｜ Discord + 飛書 + 微信群

## 一句話說明

香港大學資料智能實驗室（HKUDS，**LightRAG 的同一團隊**）開源的自架式學習平台。家教對話、解題、出題測驗、深度研究、視覺化、精熟練習六種模式跑在**同一個 agent loop** 上——切換的是目標不是引擎，學習脈絡跟著走。2025-12 開源，111 天衝到 2 萬星。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 29,809 |
| Forks | 3,926 |
| Watchers | 161 |
| 語言 | Python 7.1MB / TypeScript 3.3MB / Docker / CSS |
| 授權 | Apache-2.0 |
| 建立時間 | 2025-12-28 |
| 最後推送 | 2026-07-24 |
| Open Issues / PRs | 45 / 24 |
| 最新 Release | v1.5.4（2026-07-24）|
| Topics | ai-tutor, multi-agent-systems, rag, deepresearch, cli-tool, clawdbot |
| 貢獻者 | 10+ 真人 + bots |
| 論文 | arXiv 2604.26962 |
| 是否 Archived | 否 |
| Repomix 指標 | 1,645 檔 / 1,413,588 tokens（`--compress`，219MB）|

## 核心功能

- **單一 runtime 六模式**：Chat / Quiz / Research / Visualize / Solve / Mastery Path 共用同一 agent loop
- **多引擎知識庫**：LlamaIndex（預設，本地向量 + BM25）、PageIndex（頁級引用的推理式檢索）、GraphRAG、LightRAG、LightRAG Server（外部實例 HTTP 卸載）、**或連結的 Obsidian vault（就地讀寫）**。每個 KB 綁定單一引擎
- **Subagents & Partners**：任一輪對話中可**呼叫本機 Claude Code / Codex / Gemini / Kimi / opencode / MiMo**，或匯入其過往對話；Partner 可跑成常駐 IM 夥伴（15 通道，含 Mattermost / Zulip / Matrix）
- **三層可檢視記憶**：L1 軌跡 / L2 表層摘要 / L3 綜合，附 Memory Graph 把每個主張回溯到證據
- **可擴充工具**：內建工具、MCP servers、圖/影/語音生成、EduHub / ClawHub 社群 skill（`deeptutor skill install`，有安全閘門）
- **30+ LLM provider**：OpenAI、Anthropic、DeepSeek、Gemini、Groq、Mistral、Ollama…

## 技術架構

```
deeptutor/          ← Python 核心
├── agents/ runtime/ core/ events/     ← agent loop 與事件系統
├── knowledge/                          ← 多引擎 RAG（含 obsidian/ 子模組）
├── learning/ book/ co_writer/          ← 學習流程 / 書 / 協作寫作
├── partners/ capabilities/ skills/ tools/
├── multi_user/ api/ services/          ← 多使用者隔離 + HTTP/SSE API
deeptutor_cli/      ← 16 個子命令（chat/kb/book/memory/notebook/partner/plugin…）
deeptutor_web/ web/ ← Next.js 16 前端
tests/              ← 與 deeptutor/ 對稱的 16 個測試目錄（含 test_obsidian_kb.py）
compose.yaml + 4 個 docker-compose 變體 + Dockerfile ×2
```

| 層次 | 技術 |
|------|------|
| 後端 | Python 3.11+，agent loop 為單一執行核心 |
| 前端 | Next.js 16 |
| 部署 | Docker Compose（含 rootless Podman 支援）|
| Session/使用者 | PocketBase，per-user 隔離 |
| 檢索 | LlamaIndex / PageIndex / GraphRAG / LightRAG / FAISS / Obsidian |
| 工程紀律 | pre-commit、`.secrets.baseline`、CITATION.cff、AGENTS.md、對稱測試樹 |

## 專案特性與風險

- **品質訊號極強**：HKUDS（LightRAG 團隊）、arXiv 論文、Apache-2.0、三個月約 30 個版本、10+ 貢獻者、對稱測試樹、11 種語言 README
- release notes 誠實：逐版列修了什麼 bug（post-answer generating stall、FAISS 非 ASCII 路徑、Windows/GBK robustness），不是只寫新功能
- ⚠️ **Obsidian KB 是「就地讀寫」**（reads and writes in place），不是唯讀索引
- ⚠️ 部署量級非 skill 級：Docker Compose + PocketBase + Next.js 16 + Python 3.11，是要維運的服務
- ⚠️ 教學生態相對星數偏薄：YouTube 最高僅約 1.8K 觀看；找到的社群內容多為介紹型評測，缺長期實用心得

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian Vault | **直接但有風險**——vault 是官方支援的 KB 引擎，且為就地讀寫 |
| Claude Code | **直接相關**——對話中可呼叫本機 Claude Code / Codex 當 subagent，並匯入其過往對話 |
| Automation | 中——完整 CLI（16 子命令）+ HTTP/SSE API |

**與既有三層檢索的衝突**：本環境已定義分工——**Obsidian 寫 / gbrain 語意搜 / NotebookLM 引文接地深答**（見 [[project_wiki_retrieval_architecture|三層檢索架構]]）。DeepTutor 想同時取代這三層（多引擎 RAG + 三層記憶 + Memory Graph）。這不是補位，是**替換**。

## 安裝建議

**⏳ 觀望 —— 品質沒有疑問，問題在它是「替換」不是「補位」。**

專案品質極高（HKUDS、arXiv、三個月 30 版、對稱測試樹），不是曇花一現的衝星專案。但對本環境有三個具體阻力：

1. **Obsidian「就地讀寫」是真風險**：vault 是 **public git repo**，且有「commit 前必須列變更確認」的硬規則。一個會自動寫入 vault 的外部服務會讓該規則失效
2. **要取代已運作的三層架構**：gbrain（43 skills、118 頁已匯入）+ NotebookLM（5 本書庫）+ Obsidian（173 篇分析）已各有分工，換掉等於重做知識層，而當前痛點不在檢索
3. **部署量級不是 skill 級**：Docker Compose + PocketBase + Next.js + Python，是要維運的服務

**真正值得盯的一點**：v1.4.7 的「對話中呼叫本機 Claude Code / Codex」與 [[project_dual_ai_codex_workflow|Claude+Codex 雙 AI 工作流]]是同一問題的不同解法——本環境用 task 檔 + `codex exec`，它用 UI 內即時諮詢 + **可重播 trace**。值得看它怎麼做，不一定要用。

**零風險先行動作**：讀 `deeptutor/partners/` 與 v1.4.7 release notes，看它如何處理「外部 agent 回傳內容的信任邊界」與「可重播 trace」——正是 HANDOFF-001 在解的題目。

**升級條件（→ ✅ 裝）**，任一：
1. 出現明確的系統性學習需求（如再開一門像水球設計模式那樣 47 支影片的課），需要 quiz / mastery path / 進度追蹤——既有三層架構完全沒有的能力
2. Obsidian KB 支援**唯讀模式**（從 issue / release notes 確認），寫入風險消失
3. 決定收斂知識層（gbrain + NotebookLM 併入單一平台），願付遷移成本

**放棄條件（→ ❌ 結案）**：
1. 2026-09-30 前沒有需要 quiz/mastery 的學習任務 → 核心價值用不到
2. 實測確認 Obsidian KB 會非受控寫入 vault → 對 public repo 不可接受，直接排除

## 相關連結

- [[project_wiki_retrieval_architecture|Wiki 索引自動化 + 三層檢索分工]]
- [[project_gbrain|gbrain 個人知識腦]]
- [[project_dual_ai_codex_workflow|Claude+Codex 雙 AI 工作流]]
- [[reference_notebooklm_library|NotebookLM 書庫]]
