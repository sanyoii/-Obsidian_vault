---
source: "https://github.com/p-e-w/heretic"
author: "p-e-w (Philipp Emanuel Weidmann)"
stars: "35.5K"
clipped: 2026-10-16
tags:
  - "github/repo"
  - "model-evaluation"
  - "llm-research"
---

# heretic — 模型權重研究與評估指標界線

## 一句話說明

Heretic 是針對可取得權重的 Transformer 語言模型進行方向消融與參數搜尋的研究工具，主要目標是減少拒答、限制模型輸出相對原版的分布變化。它不是聊天前端、Codex Skill 或通用模型品質升級器。對目前工作流建議 **⏳ 作為模型評估研究收藏，暫不安裝或接入自動化**。

## 專案概覽

| 項目 | 2026-10-16 公開 API／固定原碼快照 |
|---|---|
| Repository | p-e-w/heretic |
| Stars / Forks | 35,468 / 4,015 |
| 主要語言 | Python |
| 授權 | pyproject 與原碼 SPDX：AGPL-3.0-or-later；GitHub API 歸類 AGPL-3.0 |
| 建立時間 | 2025-09-21 05:46:16 UTC |
| 最後推送 | 2026-10-12 12:23:20 UTC |
| 預設分支／固定 SHA | master，`66a952b49b00bfd1854bdad769fee5fb225b53be` |
| 固定原碼版本 | heretic-llm 2.0.0.dev0，Development Status: Beta |
| 最新正式 Release | v1.4.0，2026-06-14 12:55:57 UTC |
| Open Issues / PRs | repo API 合計 58，含 PR；GitHub HTML 顯示 Issues 29／PR 29，非原子快照 |
| Topics / Archived | abliteration、llm、transformer；false |
| 首頁／文件 | https://heretic-project.org ／ https://heretic-project.org/tutorial |

master 已在 2.0 開發版本，不能把本次原碼與正式發行 1.4.0 視為相同產品。本文沒有安裝 PyPI package 或核對其 wheel 內容。[固定原碼](https://github.com/p-e-w/heretic/tree/66a952b49b00bfd1854bdad769fee5fb225b53be)、[package 契約](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/pyproject.toml)、[正式 release](https://github.com/p-e-w/heretic/releases/tag/v1.4.0)。

## Repomix 深度分析

| 指標 | 結果 |
|---|---|
| 工具／模式 | 已安裝 Repomix 1.14.0；XML、未 compress、--no-gitignore |
| 固定來源 | codeload 438,363 bytes，下載檔案 66 |
| 打包檔案 | 65 |
| Tokens / 字元 | 78,394 / 350,221 |
| 掃描器 | 未偵測可疑檔案；不當成安全或模型效果驗收 |

### 最大 token 檔案 Top 5

| 檔案 | Tokens | 佔比 |
|---|---:|---:|
| src/heretic/main.py | 9,907 | 12.6% |
| LICENSE | 7,275 | 9.3% |
| src/heretic/model.py | 6,866 | 8.8% |
| src/heretic/utils.py | 5,818 | 7.4% |
| src/heretic/config.py | 4,049 | 5.2% |

包內含授權、鎖檔、設定及測試，因此 token 總量不等於自有程式規模。CodeGraph status 回報未初始化，沒有自行建索引；本次用原碼與 Python AST 核對。

## 核心功能

- **模型權重研究**：在支援的模型架構上進行方向消融，配合 Optuna 搜尋；沒有把 API-only 模型當成可修改對象。
- **多目標評估**：Evaluator 載入 scorer plugins、建立 baseline 並回傳各項分數。預設配置含 KeywordRate 與 KLDivergence。
- **可擴充 scorer／modifier**：master 2.0 有分離的 plugin 契約；另有 lm-eval benchmark scorer，可配置不同測量目標。
- **產物與重現**：程式可保存模型／adapter、產生重現資料，另有 Hugging Face 發布路徑。是否可重現仍受環境、dtype、模型 revision 與 plugin 來源影響。
- **模型與硬體適配**：依 PyTorch／Transformers 支援模型與裝置；README 宣稱支援多種 dense、部分 MoE／hybrid，但不是所有架構皆可用。

官方首頁已用 Defuddle 擷取，tutorial 也已讀取；宣傳中的「總是服從指令」及 README 中的品質敘述不是本機驗證結果。[README](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/README.md)、[官方文件](https://heretic-project.org/tutorial)。

## 技術架構

```text
CLI / TOML / Pydantic Settings
    -> Transformers + PyTorch / PEFT 模型介面
    -> modifier plugins 與 Optuna study
    -> Evaluator + scorer plugins + baseline
    -> 候選分數、模型產物、重現資訊
```

| 部分 | 實作與依賴 |
|---|---|
| CLI 入口 | heretic.main:main；main.py 管理流程與產物選項 |
| 模型 | model.py；Transformers、PyTorch、Accelerate、PEFT、bitsandbytes |
| 搜尋 | Optuna／TPE，多項 scorer 的 study directions |
| 配置與 plugin | Pydantic Settings、TOML；plugin.py 可載入內建或外部 Python 類別 |
| 評估 | evaluator.py、scorers/keyword_rate.py、kl_divergence.py、benchmark_score.py |
| 建置／環境 | uv_build、uv.lock；Python >=3.10 |

### 硬體與安裝界線

README 列 Python 3.10+／PyTorch 2.2+ 為基本條件，同時指出某些模型需要更新功能。master 的 pyproject 已使用 Transformers 5.18、Optuna 5.0 等依賴系列，不能把舊範例的環境需求套到開發版。uv index 預設使用 PyTorch CPU wheels 供 CI，鎖檔存在也不代表會自動配好這台機器的 GPU runtime。

README 的 RTX 3090 與特定 4B 模型約 20–30 分鐘，是作者情境數據；本次未重現、不用來估算本機耗時或 VRAM。載入、試驗與保存模型的尖峰需求可能不同，公開 issues 有 OOM 與量化後記憶體仍不足的案例。本機 GPU／可用 VRAM：Unknown，本次未盤點或下載模型。

外部 plugin 由 Python import／exec_module 載入，會執行其程式；模型 remote-code 路徑則依 trusted_models 或 Transformers 提示處理，不能說無條件信任所有模型。沒有在本次執行這些載入路徑。程式授權、底層模型授權與外部資料集來源需分別確認，不用專案的 AGPL 標示推定所有產物同一授權。[plugin loader](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/src/heretic/plugin.py#L63)、[模型載入](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/src/heretic/model.py#L128)。

### 評估結果能證明什麼

**預設 KeywordRate 是字串命中率，不能直接當成語意上的拒答率。** 它把空白回答算命中，將大小寫、星號、彎引號與空白正規化，再找 marker 子字串。預設 markers 主要是英文；測量定義與「模型有沒有正確回答」不同。

本次從固定原碼用 AST 取出 `_is_match` 與 marker 常數，只執行下列五個無模型案例：

| 輸入 | 原始函式結果 | 可觀察限制 |
|---|---|---|
| 空字串 | 命中 | 明確避免空回答拿到低命中分數 |
| I cannot answer that. | 命中 | 英文拒答 marker 可辨識 |
| Here is the weather forecast. | 不命中 | 一般英文回答對照 |
| This checklist prevents harmful mistakes. | 命中 | 非拒答句也會因 harmful 被計入 |
| 這個要求我無法協助。 | 不命中 | 中文拒答未命中預設英文 markers |

這是隔離原碼函式的行為驗證，沒有載入 Heretic package、產生模型回答或執行上游完整 unittest；五個預期結果通過，不等於評分準確度通過。[KeywordRate 實作](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/src/heretic/scorers/keyword_rate.py#L127)。

**預設 KLDivergence 比較的是提示集合上的第一個輸出 token 機率分布。** 它不是長篇推理、工具使用、中文能力、事實正確性或完整任務成功率的量測。低 KL 只能支持這個限定分布與 baseline 接近，不能推出能力完全保留。另有 benchmark scorer，但不等於預設每次都跑完整泛化能力測試。[KL scorer](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/src/heretic/scorers/kl_divergence.py#L50)、[BenchmarkScore](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/src/heretic/scorers/benchmark_score.py)。

### 試驗分數與匯出後重測的落差

作者在 #490 明確記錄 live LoRA 評分與匯出合併權重重測可能不同，原因涉及浮點捨入路徑。2026-10-16 GitHub API 核對：issue #490 open；候選 PR #495 open、merged=false。不能因 PR 已提出就把固定 master 寫成已修復。

本次確認了問題紀錄與 PR 狀態，沒有下載模型重現數值差異。README 的單一 benchmark 表與 trial 分數也不能直接當成實際保存模型的驗收證據。[作者問題紀錄](https://github.com/p-e-w/heretic/issues/490)、[尚未合併的修正 PR](https://github.com/p-e-w/heretic/pull/495)。

## 社群健康度

| 指標 | 快照與限制 |
|---|---|
| Top 10 貢獻者 | p-e-w 114、dependabot[bot] 22、anrp 8、Vinay-Umrethe 8、spikymoth 6、umran666 5、red40maxxer 5、kldzj 3、rocker-zhang 3、MoonRide303 2 |
| 近四週 commit | since 2026-09-18 查詢取得 10 筆，最舊 9/30；主力集中於作者 |
| 發布狀態 | 正式 release v1.4.0；master 2.0.0.dev0，版本需分開 |
| 固定 SHA CI | success；Ubuntu、Python 3.10–3.13 的 format／lint／typing／tests／build |
| 本機差距 | 沒有 Windows GPU／完整推論驗收，也未重跑 CI 的 tiny-model 權重測試 |

[固定版 CI](https://github.com/p-e-w/heretic/actions/runs/38248720271)、[workflow](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/.github/workflows/ci.yml)、[測試指南](https://github.com/p-e-w/heretic/blob/66a952b49b00bfd1854bdad769fee5fb225b53be/tests/README.md)。

## 社群口碑

Agent Reach doctor 顯示 Exa 未配置，X／Reddit 等可選頻道未就緒，改用公開搜尋與上游第一手 issues；未調整帳號或安裝連接器。YouTube 為選配，本次未執行。

README 挑選了正面使用者回饋與其他 benchmark 連結，不能當成獨立完整評估。公開 issues 的工程訊號包括記憶體尖峰、某些衍生模型推理退化、分數與匯出產物落差；舊 issue closed 不代表這台機器或所有模型相容，本次沒有重現這些 GPU 案例。Wiki 保留可追溯的問題來源，不轉載短期社群熱度。[記憶體案例](https://github.com/p-e-w/heretic/issues/123)、[衍生模型退化回報](https://github.com/p-e-w/heretic/issues/253)、[匯出差異](https://github.com/p-e-w/heretic/issues/490)。

## 本機驗證

| 檢查 | 結果與邊界 |
|---|---|
| 固定來源／Repomix | 成功；65 檔打包、78,394 tokens，scanner 未偵測可疑檔案 |
| Python AST | src 下所有 Python 與 tests 根層 Python，共 22 檔解析成功 |
| 評分函式隔離檢查 | AST 抽出 KeywordRate._is_match，五個合成文字案例符合原碼行為；無模型、無 package import |
| 上游 CI | 遠端 success；本機未執行完整 unittest、model tests、GPU 推論或 benchmark |
| 外部來源 | 首頁 Defuddle、GitHub API、原碼與 issues 已核對；沒有執行上游安裝／修改權重／發布模型 |

產物保留在工作區 `work/repo-intel/heretic-20261016/`：固定 source、metadata／release／contributors／commits／CI／issues JSON、issue490.json、pr495.json、repomix.xml／log、homepage.md、offline_checks.py、offline-results.json。它們不是 Wiki 附件；本次未清理檔案。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian Vault | 適合收藏模型評估的指標界線與產物重測案例，沒有直接改善 Wiki 閱讀或檢索的功能 |
| Codex | 不能改變 OpenAI 託管 Codex 模型，也不是可直接安裝的 Codex Skill／MCP |
| QA／模型測試 | 關鍵字與語意判斷的差別、首 token 指標限制、trial 與交付產物重驗值得參考；沒有修改既有 QA 流程 |
| Automation | 與目前工作流沒有已確認的權重修改需求，不接到工作代理或排程 |

## 安裝建議

**⏳ 研究收藏，暫不安裝。** 本專案有實際原碼、可擴充評估與 CI，但本機沒有已確認的模型權重研究需求。master／release 差異、預設指標盲點、匯出差異與未知硬體條件，都使它不適合直接加入目前日常工作流。

本次結論只針對研究與採用適配性；未把拒答減少當成回答品質提升，也未把 CI／五個函式案例當成模型效果驗收。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[Github/repos/odysseus — 自架AI工作區與跨平台執行邊界評估|Odysseus：自架模型工作區，與權重研究用途不同]]
