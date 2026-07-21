---
source: "https://github.com/Emily2040/seedance-2.0"
author: "Emily2040 (Iamemily2050)"
stars: "5K"
clipped: 2026-07-21
tags:
  - "github/repo"
  - "claude-skill"
  - "ai-video"
  - "prompt-engineering"
  - "seedance"
---

# seedance-2.0 — 導演式操作 Seedance 2.0 影片模型的 Skill OS

> **Emily2040/seedance-2.0** | ⭐ 4,954 | 🍴 761 | 📝 MIT
> "Comprehensive production pipeline for quad-modal AI filmmaking with Seedance 2.0"

## 一句話說明

模組化 agent-skill 包，把 AI 助手變成「導演」操作 ByteDance **Seedance 2.0** 影片生成模型（即夢/Dreamina/豆包/Volcengine/Runway/fal）。核心理念「**導演模型，別微管理每一格**」——先讀場景戲劇功能，定一個導演意圖，讓運鏡/光/走位/表演/聲音全服務同意圖，而非堆砌「電影感」形容詞。目標：用 Seedance/即夢做 AI 短片的創作者與影視團隊。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 4,954 |
| Forks | 761 |
| 主要語言 | Python（驗證腳本）+ Markdown（skill 主體） |
| 授權 | MIT |
| 建立時間 | 2026-02-25 |
| 最後推送 | 2026-07-13（活躍） |
| Open Issues / PRs | 3 / 0 |
| 最新 Release（gh tag） | v5.3.0（2026-05-08） |
| skill metadata 版本 | v6.6.0（2026-07-04）⚠️ 與 release tag 不一致 |
| 作者 | Iamemily2050（AI 藝術家/filmmaker） |

## Repomix 分析

- 總檔案數 192，總 tokens 301K（不壓縮）；security 掃描乾淨
- Top 檔：evals/evals.json（33K, 11.1%，126 eval cases）、README、CHANGELOG、seedance-filter/vocab-zh reference
- 「方法論即產品」型：價值在 skill 主體 + 詞彙庫 + eval，非可執行引擎

## 核心功能

- **28 個子技能**（`skills/seedance-*/SKILL.md`，皆 user-invocable）：
  - 流程：interview / prompt / prompt-short / sequence（長故事分片）/ continuation（從已接受素材續拍）/ pipeline / troubleshoot
  - 電影語言：camera / lighting / motion / characters（角色一致性）/ style / vfx / audio
  - 安全品質：antislop（去 AI 腔）/ copyright（IP 改寫）/ filter（誤判修復）
  - 多語詞彙：vocab-en/zh/ja/ko/es/ru + examples-zh/ja/ko
- **導演引擎**（directing-engine.md）：讀戲劇功能→定意圖→導出連貫設定，附 33 個 worked derivations
- **四模態 + 多工作流**：T2V/I2V/V2V/R2V/FLF2V/edit/extend/audio-aware/首尾幀；reference 按角色分（identity/environment/motion/audio/style/endpoint）
- **producer 式收尾**：五判定 take triage、單變數重拍、attempt budget、成本感知
- **source-dated 平台事實**：API/定價/區域/quota/model-ID 標來源日期不猜
- **驗證基建**：126 evals + test_behavior_contract/continuity_chain/generation_run_check.py + CI
- **state-driven 長片**：project-state 為真相源、已接受素材決定下一步

## 技術架構

```
使用者想法 → seedance-interview → directing-engine（讀戲劇功能→定意圖）
   ┌────────────────┼────────────────┐
 單鏡頭 prompt   長故事 sequence   續拍 continuation
        載入電影語言子技能 + vocab-<lang> + antislop/copyright/filter
                    ▼
     產出 Seedance prompt（貼進 Dreamina/即夢/Runway/fal 執行）
                    ▼
   五判定 take triage → 單變數重拍 → 更新 project-state → 續拍
   驗證：evals.json（126）+ test_*.py + CI
```

| 層次 | 內容 |
|------|------|
| Agent 入口 | 根 SKILL.md + 28 子技能（user-invocable） |
| 知識層 | references/（60 篇：directing-engine/vocab/platform-surface-matrix） |
| 範例層 | examples/（golden-prompts + sequence 範例 + project-state JSON） |
| 驗證層 | evals/（126）+ test_*.py + CI |
| 多語 | EN/ZH/JA/KO/ES/RU |

**設計亮點**：與 [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] 高度同構（方法論即產品 + eval + 觀察迴圈），但 seedance 針對**生成式影片模型**（給 prompt 不給程式碼）。差異化：state-driven 長片續拍（Seedance 不會剛好停在 prompt 預期處，須從已接受素材真實結尾續寫）、source-dated 平台事實防幻覺、多語詞彙庫。

## 社群健康度

- 貢獻者：Emily2040 + claude（單一作者用 Claude 協作）
- 版號治理不一致：gh tag v5.3.0 vs skill metadata v6.6.0（release 落後多版）
- pushedAt 2026-07-13 活躍；Issue/PR 3/0 低外部互動
- 4,954⭐/761 fork 高 fork 率（fork 客製化典型）；無 topics 稍不利發現性

## 與現有系統的相關性

- **Obsidian**：中。與 [[project_ai_video_pipeline]]、[[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] 同 AI 影片賽道。差異：seedance 綁特定生成模型（Seedance 2.0）非通用。
- **Claude Code**：中-高。正規 28-skill 包（user-invocable），可 `npx skills add`。但**強綁 Seedance 2.0 模型**——不用該模型即無價值。與 hyperframes/video-shotcraft 不同層（它們產影片檔，seedance 產餵生成模型的 prompt）。
- **Automation**：低。純指引 + eval 無執行，要自動化得自接 Seedance/fal API。

## 安裝建議

**⏳ 觀望** — 工程紮實、eval 完整、多語、方法論與 video-shotcraft 同級，但**強綁 Seedance 2.0 模型**是決定性條件：①目前無 Seedance/即夢使用需求（QA 定位為主）；②與 hyperframes/video-shotcraft 賽道重疊且更窄（單一模型）；③版號治理不一致（gh v5.3.0 vs skill v6.6.0）小扣分。**directing-engine.md + 多語 vocab 零依賴可讀**，即使不裝也是好 prompt-craft 教材。

- **升級條件（→ ✅ 裝）**：實際開始用 Seedance 2.0/即夢/Dreamina 做 AI 影片，需系統化 prompt 導演方法
- **放棄條件（→ ❌ 不裝）**：不碰 Seedance 生態；或 AI 影片全走 Remotion（video-shotcraft）/現有 pipeline；或該模型台灣/海外可及性差

## 相關連結

- [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] — 同賽道（程式化動畫 vs 生成模型導演）
- [[video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架|video-autopilot-kit]] — 實拍剪輯路線
