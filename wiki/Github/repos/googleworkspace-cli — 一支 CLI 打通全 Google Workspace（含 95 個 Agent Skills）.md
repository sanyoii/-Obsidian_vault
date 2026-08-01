---
source: "https://github.com/googleworkspace/cli"
author: "googleworkspace (Google Workspace org；主開發 Justin Poehnelt)"
stars: "30.1K"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "cli"
  - "google-workspace"
  - "agent-skills"
  - "rust"
  - "automation"
---

# googleworkspace/cli（gws）— 一支 CLI 打通全 Google Workspace，含 95 個 Agent Skills

> 來源：https://github.com/googleworkspace/cli
> 授權：Apache-2.0｜⭐ 30.1K｜🍴 1,758｜建於 2026-03-02
> 規模：217 檔 / 372,550 tokens（2026-08-01 repomix 實測）｜Rust 為主（1.13MB）
> ⚠️ README 明文「**not an officially supported Google product**」——掛在官方 org、官方 npm bot 發布，但屬 DevRel 專案非正式產品

## 一句話說明

`gws`——Rust 寫的 Google Workspace 統一 CLI。**不寫死指令表**：runtime 讀 Google Discovery Service 動態生成整個指令面，Google 加新 API 端點它自動長出對應指令。雙受眾設計：人類得到 `--help`/`--dry-run`/自動分頁；AI agent 得到結構化 JSON 輸出＋**95 個隨附 SKILL.md**（`npx skills add` 一鍵裝進 Claude Code），涵蓋 Gmail/Drive/Calendar/Sheets/Docs/Chat/Admin/Forms/Tasks/Meet/Keep/Classroom＋workflow 型（meeting-prep／standup-report／weekly-digest／email-to-task）＋ModelArmor prompt 消毒。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 30,105 |
| Forks | 1,758 |
| 主要語言 | Rust（1.13MB；另 Shell/Nix/JS 少量） |
| 授權 | Apache-2.0 |
| 建立時間 | 2026-03-02 |
| 最後推送 | 2026-07-31（bot：skills 再生）；**最後 human commit 2026-03-31** |
| Open Issues / PRs | 116 / 4 |
| 最新 Release | v0.22.5（2026-03-31） |
| Topics | google-workspace, agent-skills, ai-agent, rust, gemini-cli-extension 等 16 個 |
| 首頁 | developers.google.com/workspace（通用開發者入口，非本專案文件站，defuddle 略過） |
| 是否 Archived | 否 |

## 核心功能

- **動態指令面**：`crates/google-workspace/`（Discovery client）＋`crates/google-workspace-cli/`（executor/formatter/helpers）。原生 API 直呼叫（`gws drive files list --params '{...}'`）＋人性化 helper 層（`gws gmail +send --to ... --subject ...`）雙軌
- **認證體系完整**：`gws auth setup` 自動建 GCP 專案＋啟 API；憑證 AES-256-GCM 加密、金鑰進 OS keyring；支援 service account／token env／headless export 流；unverified app 有 ~25 scope 上限陷阱（README 有寫）
- **skills 自動再生**：`generate-skills.yml` workflow 從 Discovery API 重生 SKILL.md（`chore/sync-skills` branch 持續有 bot 活動），skill 與 CLI 版本同步
- **每個寫入型 skill 帶 `[!CAUTION]` 確認要求**；`gws-shared` 集中安全規則（不輸出 secrets、寫入前確認、`--dry-run` 優先、`--sanitize` PII 篩查）
- **ModelArmor 整合**：prompt/response 消毒指令＋jailbreak 偵測模板——CLI 內建 LLM 安全層是同類工具沒有的

## 技術架構

```
Discovery Service（Google 官方 API 目錄）
        │ runtime 拉取
┌───────▼────────────┐   ┌──────────────────────────┐
│ crates/            │   │ crates/                  │
│ google-workspace   │──>│ google-workspace-cli     │
│ (Discovery client, │   │ executor / formatter /   │
│  schema validate)  │   │ auth(TUI setup, keyring) │
└────────────────────┘   │ helpers: gmail/calendar/ │
                         │  drive/sheets/chat/docs/ │
                         │  modelarmor/workflows    │
                         └───────────┬──────────────┘
                 ┌───────────────────┼──────────────────┐
        skills/ (95 SKILL.md,   npm/ (下載器+SHA256)   registry/
        generate-skills.yml     brew / nix / cargo      (personas,
        自動再生)                                        recipes.toml)
```

| 層次 | 技術 |
|------|------|
| 核心 | Rust workspace 雙 crate；動態指令面（無靜態指令表） |
| 認證 | OAuth（AES-256-GCM＋OS keyring）／service account／token env 四層優先序 |
| 發行 | GitHub Releases 二進位＋npm 下載器（SHA256 驗證）＋brew＋nix＋cargo |
| Agent 整合 | skills/（Claude Code 格式）＋Gemini CLI extension＋OpenClaw metadata |
| CI | cargo-audit＋cargo-deny＋coverage＋changesets 版控 |

## 供應鏈稽核

| # | 檢查 | 結果 |
|---|------|------|
| 1 | 組織/作者 | ✅ `googleworkspace` 官方 org；主開發 jpoehnelt（Justin Poehnelt，Google Workspace DevRel）124 commits；npm 由 `google-wombot`（Google 官方 npm bot）＋jpoehnelt 共同維護，`wombat-dressing-room` 官方發布代理＋provenance |
| 2 | 安裝腳本 | ✅ npm postinstall（`node install.js`）逐字審過：從 GitHub Releases 下載對應平台二進位，**SHA256 checksum 強制驗證**（mismatch 即 throw），來源 URL 錨定官方 repo，temp 清理完整 |
| 3 | 相依 | ✅ npm 包**零依賴**（純下載器）；Rust 側 CI 有 cargo-audit（弱點掃描）＋cargo-deny（授權/advisory 稽核） |
| 4 | 安裝改動面 | ✅ 窄：二進位進 npm 包內 `bin/`；設定/憑證在 `~/.config/gws/`；不碰全域設定 |
| 5 | 對外網路 | ✅ 只打 Google API＋GitHub Releases。⚠️ 一個註記：`gws-shared/SKILL.md` 有「Community & Feedback Etiquette」節，**指示 agent 鼓勵使用者去 star repo**——良性但屬「skill 內文影響 agent 行為」的實例（AgentKey 同型、烈度低很多），30K 星有一部分可能是這條催出來的 |

## 最重要的警訊：人力開發停在 2026-03-31

- main branch 最後 human commit **2026-03-31**（v0.22.5 同日發布），至今 4 個月——期間只有 bot 活動（skills 再生、dependabot）
- 同期 issue 持續湧入且無人修：**116 open**，含多個 auth 關鍵 bug——`credentials 解密失敗時被靜默刪除`（#886）、`auth login 留下 stale/split token cache`（#876）、`gmail +read 靜默丟失信件本文`（#889）
- 3 月連發 8 版（活躍衝刺）→ 4 月起熄火。「march toward v1.0」停在 v0.22.5
- 模式判讀：官方 org 的 DevRel 專案爆紅後失去投入——不是死透（bot 還在跑、org 還在），但**當下裝＝接手一堆已知 auth bug 且無修復節奏**

## 社群口碑（2026-08-01 快照，時效性內容從簡）

- Reddit r/ADHD_Programmers 59 分真實見證：Claude Code＋gws skills 做 Gmail 分類/filters/自動回信/從 Drive 模板產發票——「executive dysfunction 部分被修好了」。真用戶真工作流，非行銷文
- YouTube 有教學生態（最高 26K 觀看：OpenClaw 接 Workspace 教學）
- X 搜尋失敗（opencli stale page），跳過

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian | 無直接關聯 |
| Claude Code | **高**：95 個 SKILL.md 直接可裝；Gmail triage／calendar agenda／weekly digest 全是現成場景 |
| 求職工作流 | **最實際的落點**：求職信件 triage／追蹤回覆／面試行程進 Calendar——jobsmith 的 Gmail OAuth 是自建的，gws 是通用替代 |

## 安裝建議

⏳ **觀望** — 工具本身品質高（供應鏈乾淨、安全設計認真、真用戶見證），但：①**4 個月零人力維護＋116 open issues 含 auth 級 bug**，現在裝等於自己當 QA；②安裝成本非零（GCP 專案＋OAuth 同意畫面＋test user 設定＋scope 上限陷阱）；③目前沒有排上的 Workspace 自動化需求（R13——需求驅動，不為裝而裝）。

**升級條件（→ ✅）**：①求職進入大量投遞期、需要 Gmail triage／行程自動化時（最可能的觸發），裝了先實測 auth 穩定性再往工作流接；②維護恢復（main 有新的 human commits＋auth bugs 開修）。
**放棄條件（→ ❌）**：①2026-10 前仍零人力 commit → 視同棄置，改找替代（Gemini CLI extension 路線或 MCP）；②repo 被 archive；③auth 資料損毀類 bug（#886）被更多人回報而無修復。

## 相關連結

- [[Github/_index|GitHub Repo 分析索引]]
- [[Tools/repo-intel|repo-intel Skill]]
- 求職自動化既有件：jobsmith（自建 Gmail OAuth）、career-ops、jobuzzer MCP
