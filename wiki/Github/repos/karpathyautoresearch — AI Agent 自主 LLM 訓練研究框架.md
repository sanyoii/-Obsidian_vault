---
title: "karpathy/autoresearch: AI Agent 自主進行 LLM 訓練實驗"
source: "https://github.com/karpathy/autoresearch"
author: "Andrej Karpathy"
created: 2026-05-30
description: "讓 AI agent 整夜自主修改 train.py、跑 5 分鐘 GPU 訓練、比較 val_bpb，循環直到你早上醒來。ML 研究自動化的最小可行實驗框架。"
tags:
  - clippings
  - ml
  - llm
  - training
  - autonomous-agent
  - karpathy
verdict: "不推薦安裝（需要 NVIDIA GPU，非日常工具）"
---

# autoresearch — AI Agent 自主 LLM 訓練研究框架

> *"One day, frontier AI research used to be done by meat computers..." — @karpathy, March 2026*

Karpathy 2026 年 3 月的實驗：讓 AI agent 擔任 ML 研究員，整夜自主跑 LLM 訓練實驗。你去睡覺，agent 自己做研究。

---

## 工作流程

```
人類設定 program.md
        ↓
Claude/Codex 接手
        ↓
loop:
  改 train.py（架構/優化器/超參數）
  → 跑 5 分鐘訓練（固定時間預算）
  → 量 val_bpb（validation bits per byte）
  → 比 baseline：進步則保留，退步則丟棄
  → 重複
        ↓
早上起床：100 個實驗日誌 + 更好的 model
```

---

## 三個核心檔案

| 檔案 | 角色 | 誰編輯 |
|------|------|--------|
| `prepare.py` | 資料準備、BPE tokenizer、dataloader、評估函數（固定）| **禁止修改** |
| `train.py` | GPT 模型 + Muon/AdamW 優化器 + 訓練迴圈 | **Agent** 自主修改 |
| `program.md` | Agent 操作指令（超輕量 skill）| **人類** 設定 |

評估指標：**val_bpb**（validation bits per byte）越低越好，不受 vocab size 影響可跨架構比較。

---

## 硬體需求

- 單張 NVIDIA GPU（H100 測試，Flash Attention 3）
- Python 3.10+、`uv` 套件管理
- 約 **12 個實驗/小時**，整夜約 **100 個實驗**

## 社群 Fork

| Fork | 平台 |
|------|------|
| miolini/autoresearch-macos | macOS |
| trevin-creator/autoresearch-mlx | macOS MLX |
| jsegov/autoresearch-win-rtx | Windows RTX |
| andyluo7/autoresearch | AMD |

---

## 安裝方式（備查）

```bash
uv sync
uv run prepare.py     # 一次性資料準備
uv run train.py       # 單次訓練（5 分鐘）
# 接著在 Claude Code 裡提示 agent 讀 program.md 開始實驗
```

---

## 結論：不推薦安裝（目前情境）

**原因：**
1. 需要 NVIDIA GPU（H100 理想，至少 RTX）——沒有 GPU 無法跑訓練
2. 這是 ML 研究工具，不是日常生產力工具
3. 整個 repo 只有 8 個檔案，概念比程式碼更有價值

**真正的價值**：`program.md` 的設計哲學——用一份 Markdown 控制 AI agent 的完整研究流程，與 skill 系統概念相通，值得借鑒。

**未來若有 GPU 機器或想做 LLM 訓練實驗**，這是最小可行的自主研究框架。

---

*相關：[[karpathy]] · [[nanochat]] · [[llm-training]]*
