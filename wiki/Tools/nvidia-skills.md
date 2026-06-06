# NVIDIA Skills Catalog

> NVIDIA 官方 Claude Code Skills Catalog，132 個 skills，全部針對 NVIDIA 自家產品生態系。
>
> - Repo: https://github.com/NVIDIA/skills
> - Stars: — | 官方維護
> - 授權: Apache 2.0 | Markdown + Python scripts | 2026-06-02 評估
> - **評估結論：不安裝**

---

## 評估結論（2026-06-02）

**不安裝**。132 個 skills 全部是 NVIDIA 企業平台的操作手冊，需要 Docker + NVIDIA GPU + 專屬平台，與現有開發環境無交集。

---

## Repo 結構

```
skills/               ← 132 個 NVIDIA 產品 skills
plugins/nvidia-skills/
  skills/             ← 11 個精選打包 skills（與上方重疊）
components.d/         ← 各產品 component 設定
plugins.d/            ← plugin 定義
docs/                 ← 說明文件（skill 簽名、掃描、trust pipeline）
```

---

## Skills 產品族一覽

| 產品族 | Skills 數 | 說明 |
|--------|----------|------|
| **cuOpt**（路由/數學最佳化） | 15 | routing / numerical optimization API，需 cuOpt server |
| **NeMo / Megatron**（LLM 訓練） | 20+ | 分散式訓練、Slurm 叢集、mbridge 效能調教 |
| **Omniverse**（3D 仿真） | 3 | CAD→SimReady、Realtime Viewer、USD 效能 |
| **VSS**（影片監控分析） | 14 | 部署偵測追蹤、影片搜尋摘要，需 NGC |
| **Dynamo**（推論框架） | 4 | router 啟動、interconnect 診斷 |
| **AIQ**（AI 工作流） | 2 | deploy + research |
| **NeMoClaw**（AI agent 平台） | 10 | 部署、policy、sandbox 管理 |
| **Earth2Studio**（氣候 AI） | 4 | 天氣預報、資料下載 |
| **Holoscan**（邊緣 AI） | 6 | conda/container/debian 安裝 |
| **DeepStream**（影像推論） | 2 | 開發環境、模型導入 |
| **DICOM / 醫療 AI** | 8 | 影像擷取、體積重建、ASR |
| **Physical AI**（機器人） | 4 | 基礎設施 scaling、神經重建、缺陷生成 |
| **RAG Blueprint** | 3 | deploy + eval + perf |
| **cuPyNumeric / DALI / cuDF** | 6 | GPU 加速 NumPy/資料管線 |

---

## 安裝前提（全部需要）

- Docker（幾乎每個 skill 都依賴）
- NVIDIA GPU（含正確驅動版本）
- NGC 帳號（部分 skills 需要 NGC API key）
- Linux / WSL2（部分只支援 Linux）
- 對應 NVIDIA 產品已部署（NeMo、cuOpt server、Omniverse 等）

---

## 與現有環境的差距

| 需求 | 現狀 |
|------|------|
| Docker | 未安裝 |
| NVIDIA GPU 開發 | 無此需求 |
| NVIDIA 企業平台 | 未使用任何 NVIDIA 雲端服務 |

---

## Tags

#tools #nvidia #cuda #skills #not-installed #enterprise
