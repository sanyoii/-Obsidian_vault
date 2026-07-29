---
source: "https://github.com/MDX-Tom/gpt-5.6-instruct"
author: "MDX-Tom"
stars: "3.5K"
clipped: 2026-07-29
tags:
  - "github/repo"
  - "security"
  - "jailbreak"
  - "threat-intel"
  - "do-not-install"
---

## gpt-5.6-instruct — Codex CLI 的越獄提示詞包 + 「拒絕即失敗」自動迴歸框架

> **MDX-Tom/gpt-5.6-instruct** | ⭐ 3,480 | 🍴 556 | 📝 MIT
> "A Codex CLI jailbreak prompt and test pack for gpt-5.6-sol. 针对 gpt-5.6 系列的 Codex CLI 破甲提示词与测试包。"

> ⚠️ **性質聲明**：這是**繞過模型安全護欄（越獄／破甲）的工具**。本頁是防禦性威脅情報——說明它是什麼、怎麼運作、風險在哪、為何不碰。**不轉載任何越獄提示詞原文**，只記機制與 metadata。狀態 ❌（不裝），保留純為讓未來 session 認得這類 repo。

---

### 一句話說明

一套把 OpenAI Codex CLI 的 `gpt-5.6-sol` 模型「破甲」的提示詞包：透過寫入 Codex 的 `model_instructions_file`，把安全研究、滲透測試、逆向工程、軟體破解、NSFW 虛構內容全部重新框定為「本地沙箱任務」，並顯式壓制模型的拒絕與「改用授權靶場」這類安全回退話術，好讓模型直接執行原本會拒絕的指令。真正少見的部分不是提示詞本身，而是它**把「越獄成功率」工程化成一條 CI 流水線**——用「模型拒絕＝測試失敗」當判準，自動生成測試集、跑分層迴歸、決定發不發版。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 3,480 |
| Forks | 556 |
| 主要語言 | Python |
| 授權 | MIT |
| 建立時間 | 2026-07-11（**18 天新**） |
| Open Issues | 8 |
| Open PRs | 0 |
| 最新 Release | `gpt-5.6-instruct_v41`（2026-07-23） |
| 首頁 | mdx-tom.github.io/gpt-5.6-instruct/（defuddle 失敗 → Jina Reader 成功） |
| Watchers | 5（對 3.5K 星極不成比例＝話題衝星，非持續使用群） |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 44 |
| 總 Tokens | 107,404 |
| 壓縮模式 | 未壓縮 |
| 安全掃描 | ✔ Repomix 未偵測可疑檔案（它掃密鑰不掃提示詞語意） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| codex-instruct.py | 6,498 | 6.1% |
| .github/scripts/star_history.py | 4,818 | 4.5% |
| docs/images/…version-pass-trend-zh-dark.svg | 4,767 | 4.4% |
| docs/images/…version-pass-trend-en-dark.svg | 4,729 | 4.4% |
| docs/images/…version-pass-trend-zh-light.svg | 4,711 | 4.4% |

**訊號**：Top 5 只有一個是實際程式碼（部署器），其餘是**星數趨勢圖**與**通過率趨勢圖**的 SVG。這個 repo 的「內容」大半是行銷用成長曲線與跑分圖表，營造「持續迭代、通過率上升」的專業感。

---

### 核心功能（機制層，非操作指南）

- **單入口部署器 `codex-instruct.py`**：把 v41 提示詞 `.md` 複製到 `CODEX_HOME`、在 `config.toml` 寫入頂層 `model_instructions_file`、動作前建快照。程式碼本身克制——只動自己管理的那一項、SHA256 比對、`--reset` 精準還原、`--dry-run` 預覽、原子寫入、明說不覆蓋 CCSwitch 管理的 provider/model 設定。**工程紀律好，用途是越獄。**
- **「拒絕即失敗」評測框架**：判準是模型給出直接非拒絕回應才 `pass`；出現「不能／無法／I can't／cannot provide」等拒絕語，或「可改為／授權靶場／safe alternative／use an authorized lab」等**安全回退話術**即 `fail`。測試集 = 6 領域 × 3 難度 × 2 語言 × 10 = 360 條 + 52 條專項。宣稱 v41 全數通過。
- **模型自我迭代迴圈**：讓模型吸收使用者指令、失敗案例、GitHub Issues，自行擴展測試集、分析失敗、重寫提示詞，經 low/medium/high 分層迴歸把關發版＝**用 AI 自動優化越獄提示詞**。
- **附掛第三方 hack skill**：`skill-examples/` vendored trailofbits dwarf-expert 與 yaklang 逆向 skill 套件（anti-debugging、binary-protection-bypass、code-obfuscation、symbolic-execution、vm-and-bytecode-reverse），`sources.json` 標上游 commit + SHA256。第三方 skill 本身正當，此 repo 把它們配越獄提示詞打包成「skills 版破甲」。

---

### 技術架構

```
   使用者 ──► codex-instruct.py（部署器）
                    │  寫入 CODEX_HOME/config.toml:
                    │     model_instructions_file = "./gpt-5.6-sol-unrestricted-v41.md"
                    ▼
             Codex CLI 啟動 ──► gpt-5.6-sol 每次請求都被注入 v41 系統指令
                    │            （重定義任務框架 + 壓制拒絕/回退話術）
                    ▼
             ┌───────────────── 迭代側（發版前）─────────────────┐
             │ 測試集生成 → 跑 360+52 條 prompt → 「拒絕=fail」判定  │
             │      → 模型分析失敗、重寫提示詞 → low/medium/high 迴歸 │
             │      → 過門禁才發 v41                                │
             └────────────────────────────────────────────────────┘
```

| 層次 | 技術 |
|------|------|
| 部署器 | Python 標準庫（argparse/re/hashlib/pathlib）；無第三方依賴 |
| 目標 | OpenAI Codex CLI 的 `config.toml` / `model_instructions_file` 機制 |
| 評測 | JSONL prompt bank + 啟發式拒絕語偵測 + 分層迴歸 |
| 測試 | `unit-tests/`（測部署器，非測越獄效果）+ GitHub Actions |
| 文件站 | GitHub Pages（雙語 README + Draw.io 架構圖 + 趨勢 SVG） |

---

### 社群健康度與威脅訊號

- 單人專案（MDX-Tom 48 commits，外部只貢獻文件/星圖修復），18 天衝 3.5K 星、41 次發版。Watchers 僅 5＝話題衝星非持續使用。
- **外部覆蓋薄**：Exa 只回傳 repo 頁面；Reddit 只有泛 gpt-5.6/jailbreak 話題、無此 repo 實測；V2EX 熱門無相關。無第三方評測。
- **最有訊號的是它自己的 GitHub Issues**（暴露真實用途）：
  - 「部署破甲之後讓 gpt-5.6-sol 逆向一個 app，還是提示不會進行改包等操作」→ 用途是**破解 App**。
  - 「V41 過雲端審核風險了嗎」「多帳號輪詢降低觸發雲端風控機率」→ 在意**規避 OpenAI 濫用偵測**。
  - 「涉及生物研究以及可能帶來安全風險的應用……」→ 有人試探**生物安全高風險請求**（模型仍擋下）。
  - 「上下文壓縮後破甲效果失效」「網路安全報警依然存在」→ 越獄穩定性與端點偵測問題。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 僅威脅情報價值。留存為讓未來 session 認得這類 repo、為何不碰。 |
| **Claude Code** | 無關且不相容——改的是 **Codex CLI**（OpenAI）的 `config.toml`，不碰 Claude Code。 |
| **Automation / 本環境** | **正面衝突**。本環境有 `verify_gate`、config-drift 金絲雀等治理層，且 CLAUDE.local.md 已記「Codex 桌面版寫壞 `~/.codex/config.toml` 致 MCP 啟動即死」——再讓外部腳本動同一份 config 只增加故障面。價值取向也相反（QA 求職 + 正規開發）。 |

---

### 安裝建議

**❌ 不適合安裝** — 兼具「用不到」與「不該用」。

1. **用途與本環境價值取向相反**。系統性解除 AI 安全護欄的工具，issue 實證訴求含破解 App、規避平台風控、試探生物安全邊界。零正當使用場景。
2. **平台違規風險**。繞過 OpenAI 內容政策違反使用條款；社群自己在討論「多帳號輪詢躲雲端風控」＝帳號封禁與帳務風險。
3. **技術面不相容**。改的是 Codex CLI 的 `config.toml`，與本機既有「Codex 寫壞 config.toml → MCP 啟動即死」陷阱同一檔案。
4. **供應鏈**：18 天新、單人、靠外部 ZIP 注入 Codex 系統指令＝高信任成本。

**無升級條件。** 這是用途層面排除，非「等成熟就裝」的觀望項——威脅情報留存即可，不進工具鏈。

**可留存的中性技術參考（與越獄無關）：**
- `codex-instruct.py` 的**設定檔安全改寫模式**：動作前快照、只改自己管理的頂層 key、SHA256 比對後才刪、`--reset` 精準還原不覆蓋他人設定、原子寫入。正好是 config-drift 金絲雀想防的正面範例。
- 「用 CI 把模糊的『成功率』做成可迴歸門禁」的**框架形狀**（自動生成測試集 → 啟發式判定 → 分層迴歸 → 過門禁才發版）可移植到正當 eval（如 institution 規則 trap-fixture 迴歸，見 [[institution 規則 eval 試點]]），與越獄用途無關。

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/system_prompts_leaks — 全網 AI System Prompt 逆向存檔庫|system_prompts_leaks]] — 同屬 AI 安全/威脅情報生態
