---
source: "https://github.com/google-research/timesfm"
author: "Google Research"
stars: "4K+"
clipped: 2026-06-22
tags:
  - "github/repo"
  - "machine-learning"
  - "time-series"
  - "forecasting"
  - "foundation-model"
  - "google-research"
  - "transformer"
---
# TimesFM — Google 時間序列基礎模型

> **出處：** [https://github.com/google-research/timesfm](https://github.com/google-research/timesfm)
> "A decoder-only foundation model for time-series forecasting" — ICML 2024

---

## 一句話說明

Google Research 開發的預訓練時間序列基礎模型，對任何單變量時間序列做 **zero-shot 預測**（不需訓練），回傳點預測 + 分位數信賴區間。

---

## 模型規格

| 項目 | TimesFM 2.5（最新） | v1/v2（舊版） |
|------|---------------------|---------------|
| 參數量 | **200M** | 500M |
| 最大 context | **16,384** 個時間點 | 2,048 |
| 最大 horizon | **1,000**（連續分位數） | 較短 |
| 模型大小 | ~800 MB（HuggingFace） | ~32 GB RAM |
| 架構 | Decoder-only Transformer | 同 |
| 論文 | [ICML 2024](https://arxiv.org/abs/2310.10688) | — |

---

## 安裝

```bash
pip install timesfm[torch]    # PyTorch 版
pip install timesfm[flax]     # Flax/JAX 版
pip install timesfm[xreg]     # 加上協變量支援
```

PyPI 套件名：`timesfm`，最新版 2.0.0（2026-06-05）。

---

## 快速範例

```python
import timesfm
import numpy as np

model = timesfm.TimesFM_2p5_200M_torch.from_pretrained(
    "google/timesfm-2.5-200m-pytorch"
)
model.compile(
    timesfm.ForecastConfig(
        max_context=1024,
        max_horizon=256,
        normalize_inputs=True,
        use_continuous_quantile_head=True,
        force_flip_invariance=True,
        infer_is_positive=True,
    )
)
point, quantile = model.forecast(
    horizon=12,
    inputs=[np.linspace(0, 1, 100)],
)
# point.shape = (1, 12)
# quantile.shape = (1, 12, 10)  ← mean + 10th~90th 分位數
```

---

## 適用場景

- 銷售額 / 需求量預測
- 感測器讀數 / IoT 資料
- 股價 / 金融時間序列
- 能源需求預測
- 天氣 / 溫度預測
- 病人生理指標
- 任何單變量時間序列的 zero-shot 預測

**不適合：** 需要係數解釋（用 statsmodels）、時間序列分類/聚類（用 aeon）、多變量向量自回歸（用 statsmodels）、非時序表格資料（用 scikit-learn）。

---

## 技術架構

- **Decoder-only Transformer** — 類似 GPT 架構，用在時間序列
- **Patched input** — 時間序列切成 patch 餵入
- **Rotary Position Embeddings (RoPE)** — 位置編碼
- **RMS Normalization** — attention + feedforward
- **Dual backend** — PyTorch 和 Flax/JAX 兩套完整實作
- **連續分位數頭** — 可選 30M 參數 quantile head，避免 quantile crossing
- **Flip Invariance** — 保證 `TimesFM(aX+b) = a·TimesFM(X)+b`
- **非負推斷** — 輸入全非負時，輸出也保證非負

---

## 進階功能

| 功能 | 說明 |
|------|------|
| **XReg 協變量** | 外部變數（促銷、節假日、天氣）加入預測 |
| **LoRA 微調** | HuggingFace PEFT 微調自己的資料 |
| **異常偵測** | 分位數預測的信賴區間當異常邊界（q10–q90） |
| **批次預測** | 同時預測數百/數千條序列 |
| **Claude Code Skill** | `timesfm-forecasting/SKILL.md` — Agent 可直接調用 |

---

## Google 產品整合

- **BigQuery ML** — SQL 查詢直接呼叫 TimesFM
- **Google Sheets** — 試算表內建預測功能
- **Vertex Model Garden** — Docker 端點供 Agent 呼叫

---

## Repo 結構（Repomix 分析，94 檔 / 295K tokens）

| 路徑 | 用途 |
|------|------|
| `src/timesfm/` | v2.5 核心（configs、torch/flax backend） |
| `src/timesfm/timesfm_2p5/` | 2.5 版模型載入 |
| `src/timesfm/utils/xreg_lib.py` | 協變量處理 |
| `timesfm-forecasting/` | Claude Code Skill + 範例 |
| `v1/` | 舊版 v1/v2 歸檔 |
| `tests/` | 單元測試 |

---

## 相關連結

- 論文：[A decoder-only foundation model for time-series forecasting](https://arxiv.org/abs/2310.10688)
- HuggingFace：[TimesFM Collection](https://huggingface.co/collections/google/timesfm-release-66e4be5fdb56e960c1e482a6)
- Google Blog：[Research blog post](https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/)
- 授權：Apache 2.0
