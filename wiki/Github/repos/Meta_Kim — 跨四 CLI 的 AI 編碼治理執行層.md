---
source: "https://github.com/KimYx0207/Meta_Kim"
author: "KimYx0207（老金，游戲製作人 × AIGC 創作者）"
stars: "257"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "ai-governance"
  - "claude-code"
  - "multi-runtime"
---

# Meta_Kim — 跨四 CLI 的 AI 編碼治理執行層

> **KimYx0207/Meta_Kim** | ⭐ 257 | 🍴 67 | 📝 Apache-2.0
> "Governed execution layer for AI coding assistants: clarify intent, route capabilities, review evidence, verify results, and write back lessons across Claude Code, Codex, OpenClaw, and Cursor."

---

## 一句話說明

Meta_Kim 是一套「AI 編碼治理層」：以單一 canonical 源（9 個 meta-agents＋86KB 調度 SKILL＋17 支 hooks＋機讀契約 JSON）投影到 Claude Code / Codex / OpenClaw / Cursor 四個 runtime，強制每個任務走「意圖澄清 → 能力路由 → 執行 → 審查 → 元審查 → 驗證 → 經驗回寫」八階段脊柱（Critical → Fetch → Thinking → Execution → Review → Meta-Review → Verification → Evolution），目標使用者是想把「人肉紀律」變成「可執行制度」的 AI coding 重度使用者。與本環境的 CLAUDE.md R 系列＋institution/＋verify_gate 是**同題材、不同哲學**的完整替代品。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 257 |
| Forks | 67 |
| 主要語言 | JavaScript（另含 Python/TS/PowerShell/Shell） |
| 授權 | Apache-2.0 |
| 建立時間 | 2026-03-23 |
| 最後推送 | 2026-07-31 |
| Issues（歷史總數） | 35（現全關閉，open=0） |
| PRs（歷史總數） | 13（open=0） |
| 最新 Release | v2.9.16（2026-07-31；7/27–7/31 五天內連發 8 版） |
| Topics | agent-governance, ai-coding, claude-code, codex, cursor, openclaw, mcp, skills, verification, workflow |
| 首頁 | https://www.aiking.dev/ （作者個人站，SPA） |
| 是否 Archived | 否 |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 621（tree 全量 679） |
| 總 Tokens | 1,023,055（--compress 後仍破百萬） |
| 壓縮模式 | 是（--compress） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| config/runtime-capability-matrix.json | 113,452 | 11.1% |
| CHANGELOG.zh-CN.md | 62,361 | 6.1% |
| CHANGELOG.md | 53,837 | 5.3% |
| config/contracts/workflow-contract.json | 35,270 | 3.4% |
| config/capability-index/provider-registry.json | 33,077 | 3.2% |

註：前五名全是 config/CHANGELOG，不是程式碼——本體是「制度即資料」的巨型 JSON 契約＋腳本群（scripts/ 182 支、tests/ 254 支、npm scripts 180+ 條）。

---

## 核心功能

- **八階段治理脊柱**：Critical → Fetch → Thinking → Execution → Review → Meta-Review → Verification → Evolution，由 `config/contracts/core-loop-contract.json` 綁定為可測試契約，`npm run meta:theory:demo` 可零參數重播一次治理運行。
- **9 個 meta-agents 組織鏡像**：warden（品質仲裁）/ conductor（節奏編排）/ prism(審查) / scout（工具發現）/ genesis / artisan / sentinel（安全 hooks）/ librarian（記憶）/ chrysalis（演化回寫），每個 agent 檔案都有 own / do_not_touch / boundary 欄位，明文「meta 層只協調不執行」。
- **能力索引路由**：`discover:global` 掃描本機已裝 agents/skills 生成 `capability-index/meta-kim-capabilities.json`，任務先查索引選 owner 再執行（capability-first dispatch），而非「哪個工具在手邊用哪個」。
- **單源多投影**：canonical/ 為唯一事實源，`meta:sync` 投影到 `.claude/`（settings hooks＋agents＋skills＋commands＋MCP）、`.codex/`、`.cursor/`、`openclaw/`；global hooks 寫入需明示 `--with-global-hooks`。
- **證據分級**：smoke 證據不得升格為 native live 證據；stage-DAG 支援中斷續跑（durable run kernel，completed nodes 持久化）。
- **Hook 執法**：UserPromptSubmit 啟動脊柱、PreToolUse 對 Write/Edit/Bash/Task 全攔（enforce-agent-dispatch）、PostToolUse format/typecheck、Stop 掛 4 支（compaction / console-log 稽核 / completion-guard / spine-cleanup）。
- **MCP 記憶服務**：安裝第三方 PyPI `mcp-memory-service` 為本機常駐（127.0.0.1:8000），經驗回寫走此通道；Windows 以「啟動」資料夾 VBS 自啟動、macOS LaunchAgent、Linux .desktop。

---

## 技術架構

```
canonical/                    ← 唯一事實源
├─ agents/ (9 meta-agents)         meta-warden / conductor / prism / ...
├─ skills/meta-theory/SKILL.md     86KB 調度器（八階段＋Type A-E 路由）
└─ runtime-assets/                 claude|codex|cursor|openclaw 各自的
   hooks / settings / mcp.json       hook 與設定模板
        │  meta:sync（投影）
        ▼
~/.claude  ~/.codex  ~/.cursor  ~/.openclaw   ← 全域安裝目標
        ▲
config/   契約與矩陣（runtime-capability-matrix 53萬字元、workflow-contract、
          capability-index、provider-registry）
scripts/  182 支 .mjs（setup 308KB、governed-execution kernel、數十支 validate-*）
tests/    254 支 node test
```

| 層次 | 技術 |
|------|------|
| 執行環境 | Node.js ≥ 22.13（純 ESM .mjs，無 build step） |
| 相依 | 僅 3 個：@inquirer/prompts、@modelcontextprotocol/sdk、zod |
| 記憶層 | PyPI mcp-memory-service（第三方，本機 127.0.0.1:8000） |
| 治理資料 | 巨型 JSON 契約（capability matrix / workflow contract / provider registry） |
| 分發 | `npx github:KimYx0207/Meta_Kim meta-kim` 或 clone + `node setup.mjs` |

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | KimYx0207 668 commits，其餘 4 人合計 10 | 實質單人專案（>98%） |
| 近 4 週 commit | 17/28/7/32 | 活躍（但全是作者本人） |
| Release 頻率 | 4 個月衝到 v2.9.16，末五天連發 8 版 | AI 輔助高速 churn |
| Issue open/close | 35 全關、0 open | 回應快，但互動量低 |
| 外部驗證 | 阿里雲開發者社區一篇轉述文；HN/Reddit 零訊號 | 幾乎全在作者自有流量圈（5.5K⭐ AI-Coding-Guide-Zh、飛書知識庫、X） |

---

## 社群口碑

星數 <1K，未觸發 agent-reach 全量海巡；輕量 WebSearch 結果：獨立第三方評測近乎為零，唯一可查的中文報導是阿里雲開發者社區〈老金開源了個支持含 CC、Codex 等 4 個平台的編程治理框架〉（轉述型）。口碑主要來自作者自身內容生態（AI-Coding-Guide-Zh 5.5K⭐ 讀者群）。「X 回覆串陌生人推薦」與此相符——是粉絲圈內推薦，不是獨立採用訊號。

---

## 供應鏈稽核（陌生人推薦 repo 固定動作）

| # | 檢查 | 結果 | 證據 |
|---|------|------|------|
| ① | 作者帳號真實性 | ✅ 真實創作者 | 帳號 2023-04-14 建立（3 年）、542 followers、14 repos；AI-Coding-Guide-Zh 5,507⭐；aiking.dev 個人站＝15 年遊戲業製作人「老金」，飛書知識庫＋支付寶打賞碼＝中文內容創作者典型配置，非拋棄式帳號 |
| ② | postinstall 安裝腳本 | ✅ 良性 | `scripts/postinstall-check.mjs` 逐字審查：僅檢查本地 capability index 檔案存在性與 mtime，**零網路呼叫**，可 `npm install --ignore-scripts` 跳過 |
| ③ | 相依套件 | ✅ 全部存在、未被 quarantine | 僅 3 顆：@inquirer/prompts 8.5.2＝latest、@modelcontextprotocol/sdk 1.29.0 存在未 deprecate、zod 4.4.3＝latest（npm registry 逐一實查）；PyPI `mcp-memory-service` 11.5.5 存在未 yank（doobidoo 專案，作者 Heinrich Krupp，與本 repo 作者無關的既有開源專案） |
| ④ | 安裝改動面 | ⚠️ 大（合法但要知情） | 寫入 `~/.claude/`（agents/skills/commands/settings hooks/MCP config）＋ `.codex/` `.cursor/` `.openclaw/` 同構投影；**global hooks 需明示 `--with-global-hooks`**（預設不碰）；**Windows 會往「啟動」資料夾寫 `mcp-memory-silent.vbs` 自啟動**（macOS LaunchAgent / Linux .desktop 同型）＝登入持久化；另讀 HKCU proxy 設定（判斷網路環境用）；附 uninstall（`meta:uninstall:deep`）與 backups/manifests |
| ⑤ | 對外網路呼叫面 | ✅ 窄且可解釋 | raw 原文複掃（compressed 掃描不可信已知）：(a) GitHub tarball 下載第三方 skills——來源全是具名知名 repo（obra/superpowers、anthropics/skills、safishamsi/graphify、garrytan/gstack、OthmanAdi/planning-with-files、HKUDS/CLI-Anything、affaan-m/ECC）；(b) GitHub API 查 marketplace.json 版本；(c) 127.0.0.1:8000 本機健康檢查。**無 telemetry/analytics SDK、無不明 endpoint、無自我更新迴路** |

**結論一句話**：不是散布向量，是真人創作者的真專案；風險不在惡意而在**腳印**——啟動資料夾持久化＋四 runtime 全域寫入＋常駐記憶服務，裝了就是把整台機器的 AI coding 環境交給它管。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯；其記憶層走 mcp-memory-service（SQLite+向量），與本環境 Obsidian/gbrain/claude-mem 三層檢索完全平行，裝了＝開第二個腦 |
| **Claude Code** | **正面衝突為主**。逐項對照：八階段脊柱 ≈ R10 checkpoint＋R14 流程；stop-completion-guard ≈ verify_gate Stop hook（本環境已轉正全域化）；證據分級「smoke ≠ live」 ≈ R17「驗收腳本先 FAIL 才算成立」＋「編排者親跑驗收」；capability routing ≈ institution/01 模型調度；Evolution 回寫 ≈ /last-word＋memory 系統；跨 Claude/Codex 投影 ≈ 既有雙 AI 工作流。概念重疊估 8 成，且哲學相反：本環境是「路由層極簡（CLAUDE.md 150 行檢視線）＋需要時讀細則」，Meta_Kim 是「全量前置強制」——86KB SKILL＋4 支 Stop hooks＋PreToolUse 全攔，context 與延遲成本違反 R13 |
| **Automation** | 真正增量三處可**抄想法不裝系統**：① `discover:global` 把已裝 agents/skills 掃成機讀能力索引供派工查詢（本環境 124 skills 靠人腦記）；② durable run kernel 的 stage-DAG 斷點續跑（對應本環境「subagent 被 API error 中斷不等於沒產出」的痛點，它做成了制度）；③ 「smoke 證據不得升格 live 證據」的分級詞彙，比 R17 現行表述更精確 |

---

## 安裝建議

⏳ **觀望（不裝系統，可抽想法）** — 理由：(1) 供應鏈乾淨但**與既有治理體系正面衝突**——同一台機器跑兩套強制治理（verify_gate＋institution vs 八階段脊柱＋enforce-agent-dispatch）會互相絆倒；(2) 成本違反 R13：86KB 調度 SKILL 常駐＋每次 Write/Edit/Bash 過 PreToolUse hook＋4 支 Stop hooks，換到的能力本環境已有 8 成；(3) 實質單人專案、外部獨立驗證近乎零、五天 8 個 release 的 churn 速度，制度穩定性存疑。

- **升級條件（→ ✅ 改裝或部分採用）**：出現可獨立安裝的 `discover:global` 能力索引子模組（不綁全家桶）；或本環境派工錯誤率上升到需要機讀能力索引時，抄其 `capability-index` schema 自建；或該專案出現 ≥3 個獨立第三方深度評測且 6 個月後仍活躍。
- **放棄條件（→ ❌ 結案）**：6 個月無 commit；或爆出安裝腳本越權事件；或本環境 institution/01 補上能力索引機制後，其唯一增量歸零。

---

## 相關連結

- [[Github/repos/ChronicleCore-Architecture — 38人格多Agent治理架構白皮書|ChronicleCore]] — 同為「治理架構」題材，彼為純概念白皮書，此為可執行全家桶
- [[Github/repos/swarm-forge — Uncle Bob 的 tmux 多 Agent 紀律協作平台|swarm-forge]] — 同樣「憲法分層強制紀律」，handoff 窄化想法已列入 R17 參考
- [[Tools/claude-code-design-guide]] — hook 機制底層原理
- 對照本環境制度：`d:\Claude\CLAUDE.md`（R 系列）＋ `docs/institution/01-model-dispatch.md`（能力路由的人腦版）
