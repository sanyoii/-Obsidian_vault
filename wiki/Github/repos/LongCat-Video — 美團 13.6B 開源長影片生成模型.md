---
source: "https://github.com/meituan-longcat/LongCat-Video"
author: "meituan-longcat (美團 LongCat Team)"
stars: "5.7K"
clipped: 2026-07-31
tags:
  - "github/repo"
  - "video-generation"
  - "diffusion-transformer"
  - "open-weights"
  - "ai-ml"
---

# LongCat-Video — 美團開源的 13.6B 長影片生成模型，主打「分鐘級不崩壞」

> 來源：https://github.com/meituan-longcat/LongCat-Video
> 授權：**MIT（權重與程式碼皆是，可商用）**｜⭐ 5.7K｜🍴 896
> 規模：40 檔程式碼 / 66,160 tokens（2026-07-31 repomix 實測，`--include` 排除 1.34 GB 展示素材）
> 技術報告：[arXiv 2510.22200](https://arxiv.org/abs/2510.22200)（基礎模型）｜[arXiv 2605.26486](https://arxiv.org/abs/2605.26486)（Avatar 1.5）

> [!warning] `requirements_avatar.txt` 有兩個裝不起來的套件，其中一個名字被 PyPI 隔離
> `libsndfile1==0.0.1` 在 PyPI **根本不存在**（`/pypi/json` 與 `/simple/` 皆 404）——那是 apt 系統套件不是 Python 套件。
> `tritonserverclient==0.0.6` 的 `/simple/` 回 200 但**發行檔 0 個**，metadata 標 **`project-status: quarantined`**（PyPI 對經檢舉待調查、通常涉惡意套件的處置）；正確的 NVIDIA 套件叫 `tritonclient`。
> 後果：`pip install -r requirements_avatar.txt` 直接失敗（2025-12-21 已有 issue 附完整錯誤，**至今未修**）。風險面：5.7K 星專案的 requirements 釘著一個曾被搶註、現被平台隔離的名字，是典型 dependency-confusion 形狀。
> **解法**：刪掉那兩行，`libsndfile` 走 `conda install -c conda-forge libsndfile`；`tritonserverclient` 直接不裝——全原始碼無任何一處 import 它。

---

## 這是什麼？

美團 LongCat 團隊開源的 13.6B **dense** 影片生成模型，把 **文生影片 / 圖生影片 / 影片續寫** 三個任務統一在同一個模型。

真正的差異點不是畫質而是**長度**：它原生以「影片續寫」任務預訓練，能一路續寫出分鐘級影片而不出現色偏與畫質衰減（多數同類模型續寫幾輪就崩）。

---

## 結構

40 個檔案、63 個 commit——**這是推論倉庫，不是訓練框架**：無訓練腳本、無資料處理、無微調程式碼（已有 issue 專門問「有微調程式碼嗎」）。

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `longcat_video/pipeline_longcat_video_avatar.py` | 6,738 | 10.2% |
| `longcat_video/modules/autoencoder_kl_wan.py` | 6,140 | 9.3% |
| `longcat_video/pipeline_longcat_video.py` | 5,437 | 8.2% |
| `README.md` | 5,312 | 8.0% |
| `longcat_video/block_sparse_attention/bsa_interface.py` | 3,564 | 5.4% |

第二大檔 `autoencoder_kl_wan.py` 的檔名直接洩漏血統：**VAE 來自阿里的 Wan**，README 致謝也承認（Wan / UMT5-XXL / Diffusers）。

---

## 核心功能

- **單一模型統一三任務**：T2V / I2V / 影片續寫共用一套框架，不需切模型
- **原生長影片**：以續寫預訓練，分鐘級無色偏／無畫質衰減——全案最實質的賣點
- **粗到細生成**：時間軸與空間軸雙向 coarse-to-fine，號稱數分鐘產出 720p / 30fps
- **Block Sparse Attention**：自帶 Triton kernel（含 TMA descriptor 自動調優），高解析度省算力
- **Context Parallel**：Ulysses wrapper，多卡切 context 而非切 batch，`--context_parallel_size=2` 直接開
- **多獎勵 RLHF**：多獎勵 GRPO 訓練
- **LongCat-Video-Avatar 1.5**（2026-05-21）：音訊驅動數位人。Wav2Vec2 → Whisper-Large-v3 提升對嘴、步數蒸餾壓到 8 步、單／雙音軌、附 INT8 量化
- **INT8 量化**：自寫 weight-only per-channel 對稱量化（scale = `|W|.amax(dim=1)/127`），有 `DEFAULT_SKIP_PATTERNS` 白名單跳過精度敏感層。**僅 avatar-v1.5 支援**
- **Streamlit 介面**：`run_streamlit.py`，不必背 torchrun 參數

---

## 技術架構

```
                   文字 prompt ／ 參考圖 ／ 音訊
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        UMT5-XXL         VAE (Wan)      audio_process/
        文字編碼      autoencoder_kl_wan  wav2vec2 或 Whisper-L
              └───────────────┼───────────────┘
                              ▼
              ┌──────────────────────────────────┐
              │  LongCat-Video DiT  13.6B dense  │
              │  ├ rope_3d（3D 旋轉位置編碼）      │
              │  ├ blocks / attention             │
              │  ├ block_sparse_attention（Triton │
              │  │   kernel＋TMA autotune）        │
              │  └ quantization（INT8 weight-only）│
              └──────────────────────────────────┘
                              │
              scheduling_flow_match_euler_discrete
              （flow matching，非傳統 DDPM）
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
     pipeline_longcat_video          pipeline_longcat_video_avatar
     T2V / I2V / 續寫 / 長片 / 互動      音訊驅動數位人（單/多音軌）
                              │
              context_parallel（Ulysses）→ 多 GPU
                              │
                    7 支 run_demo_*.py ＋ run_streamlit.py
```

| 層次 | 技術 |
|------|------|
| 骨幹 | 13.6B **dense** DiT（對照：Wan 2.2 為 28B MoE / 14B 啟用） |
| 取樣 | Flow Matching Euler（非傳統 DDPM） |
| 位置編碼 | 3D RoPE（base 與 avatar 各一份） |
| 注意力 | FlashAttention-2 預設，可切 FA3 / xformers；另有自寫 Block Sparse Attention |
| VAE | 來自 Wan |
| 文字編碼 | UMT5-XXL |
| 音訊編碼 | wav2vec2（v1.0）→ Whisper-large-v3（v1.5） |
| 平行化 | Context Parallel（Ulysses），非 tensor parallel |
| 量化 | 自寫 INT8 weight-only per-channel 對稱量化 |
| 依賴 | torch 2.6.0 / diffusers 0.35.1 / transformers 4.41.0 / flash-attn 2.7.4.post1，全部**硬釘版本** |

---

## 評測：官方沒有灌水

README 的 MOS 表把自己輸的數字原樣列出，這在中國大廠開源模型裡不常見：

| 任務 | LongCat-Video Overall | 對手 |
|------|------|------|
| Text-to-Video | **3.38** | 贏 Wan 2.2（3.35）、PixVerse-V5（3.36）；**輸 Veo3（3.48）** |
| Image-to-Video | **3.17** | **四者墊底**（Seedance 3.35 / Hailuo-02 3.27 / Wan 2.2 3.26） |

⚠️ 但這是**內部 benchmark 的自評 MOS**，非第三方盲測。

> [!warning] VRAM 需求：官方完全沒寫
> repo 與 README **未標示任何 VRAM 需求**，這是文件的實質缺口。網路流傳的「FP8 約 15 GB、BF16 需 24 GB+」出自第三方 SEO 部落格與社群量化倉庫，**非官方數據、未經驗證**。官方唯一線索是 `--use_int8` 旗標與一則 issue 標題「LongCat-Video-Avatar-1.5量化24G显存」。要當採購依據請自行實測。

---

## 專案體質

- **企業發布型，非社群共建**：7 位貢獻者、63 commits（最多者 15 筆）
- **已停滯**：最後推送 2026-05-27，0 release（版本以 HuggingFace 權重區分）
- **issue 區失管**：62 open issues 對 63 commits 是極高比例，且**混雜明顯垃圾貼**（英文健康雞湯、印地語標題殺、無關的摔角挑戰標題）——無人清理
- **實質技術 issue**：INT8 而非 FP8 的選型質疑、`--use_distill` 導致嘴唇越來越紅、v1.5 表情過度誇張、H100 上 FA3 崩潰、身分保持失敗、產出全雜訊、無微調程式碼。**多數 0–2 則回覆，官方回應率低**
- **重心已轉向 Avatar**：HuggingFace 30 天下載 base 1,729（540 讚）／Avatar 149（258 讚）／**Avatar-1.5 1,657（689 讚）**
- **真正的採用路徑是 ComfyUI 生態**：`pixaroma` 的 ComfyUI Ep 69 教學有 8.2 萬觀看，遠超這個 repo 本身的能見度；社群另有 GGUF 量化版與 `CacheDiT` 約 1.7 倍加速（已被官方 README 收錄）。英語技術社群反而無感——HN 僅 3 篇、最高 3 分

---

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| 硬體前提 | **決定性的一關**。純 CUDA + Linux 取向：`torchrun`、`flash_attn`、Triton kernel、`conda`。Windows 上 flash-attn 與 Triton 向來苦戰，官方零 Windows 說明。**沒有 24 GB 級 NVIDIA 卡就完全不用考慮本地跑** |
| `active/ai-video-pipeline` | 概念上是「生成引擎」非「產線」，**互補不取代**——但那條產線卡在更前面（FAL_KEY／FFmpeg 未到位），塞一個要 24 GB 顯存的本地模型只會更難啟動 |
| [[Github/repos/calesthio-OpenMontage\|OpenMontage]] | 直接相關：OpenMontage 的本地 GPU provider 清單是 WAN 2.1 / Hunyuan / CogVideo / LTX，**沒有 LongCat**。若要走本地生成，LongCat 是可補進該清單的候選——但得先解決 OpenMontage 自身在 Windows 跑不起來的問題 |
| Claude Code | 無整合面。無 MCP、無 CLI、無 skill 格式 |
| Obsidian | 無直接關聯 |
| 實際可用路徑 | 真要試就走 **ComfyUI + 社群 GGUF 量化版**（8.2 萬觀看的教學已鋪好路），別照這個 repo 的 conda + flash-attn 流程；或直接用雲端 GPU |

---

## 安裝建議

⏳ **觀望** — 模型本身是紮實的工程作品（自寫 Triton BSA kernel、Ulysses context parallel、自寫 INT8 量化、評測誠實列出自己輸的項目），「長片不崩」是真差異點。但對本環境有三個當下無解的阻礙：

1. **硬體不符**——需 NVIDIA 24 GB 級顯卡 + CUDA + flash-attn，Windows 環境無此前提
2. **安裝路徑實際壞掉**——`requirements_avatar.txt` 兩個套件裝不起來，其一名字處於 PyPI quarantined 狀態，相關 issue 開了 7 個月未修
3. **repo 已停滯**——0 release、2 個月未推送、62 issue 積壓混雜垃圾貼、官方回應率低

**升級條件（→ ✅ 裝）**：取得 24 GB+ NVIDIA GPU 環境（本地或雲端）**且**確有長影片／數位人口播的實際產出需求——屆時走 **ComfyUI + 社群 GGUF** 而非官方 conda 流程；**或** 官方修掉 requirements、補上 VRAM 需求表並恢復推送。

**放棄條件（→ ❌ 不裝）**：再過 90 天仍零推送且 issue 破百（美團已放生，社群 fork 接手才是正解）；**或** 出現同級長片模型附完整 Windows／ComfyUI 官方支援，本案即無獨佔理由。

> [!tip] 📌 不必安裝就能取用
> - `longcat_video/modules/quantization.py` — 不到 60 行的 INT8 weight-only per-channel 量化，含「跳過精度敏感層」白名單，教學級乾淨範例
> - `longcat_video/block_sparse_attention/` — 帶 TMA descriptor 自動調優的 Triton BSA kernel，寫得比多數論文附錄清楚
> - **技術報告本身**——真正的知識密度在 arXiv 兩篇報告裡，不在這 40 個檔案

---

## 版本沿革

| 日期 | 狀態 |
|------|------|
| 2025-10-25 | 基礎模型發布（arXiv 2510.22200） |
| 2025-12-16 | LongCat-Video-Avatar 發布（wav2vec2） |
| 2026-05-21 | Avatar 1.5（Whisper-large-v3 + 步數蒸餾 + INT8） |
| 2026-05-25 | 本 wiki 首次留存（📎 Web Clipper 原始傾印，2,799⭐） |
| 2026-05-27 | 最後一次推送 |
| **2026-07-31** | **升級為 🔬 深度分析**（5,673⭐）；新增供應鏈發現、架構解析、評測誠實度評估、VRAM 來源分級 |

---

## 相關連結

- [[Github/repos/calesthio-OpenMontage\|OpenMontage]]
- [[Github/repos/Remotion — 用 React 寫程式碼產生影片\|Remotion]]
- [[Github/repos/seedance-2.0 — 導演式操作Seedance影片模型的Skill OS\|seedance-2.0]]
- [[Github/repos/video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill\|video-shotcraft]]
