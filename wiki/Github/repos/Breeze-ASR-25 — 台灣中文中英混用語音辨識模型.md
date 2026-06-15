---
source: "https://github.com/mtkresearch/Breeze-ASR-25"
author: "mtkresearch (聯發科技研究)"
stars: "137"
clipped: 2026-06-15
tags:
  - "github/repo"
  - "asr"
  - "speech-to-text"
  - "繁體中文"
---
# Breeze-ASR-25 — 台灣中文/中英混用語音辨識模型

> **出處：** [https://github.com/mtkresearch/Breeze-ASR-25](https://github.com/mtkresearch/Breeze-ASR-25) | ⭐ 137

---

## Description

聯發科技研究（MediaTek Research）開源的語音辨識（ASR）模型，基於 **Whisper-large-v2** 微調，針對**台灣華語**以及**中英混用**情境優化。論文中代號為「Twister」（[arXiv:2506.11130](https://arxiv.org/pdf/2506.11130)）。

## 核心特色

- 強化繁體中文語境辨識能力
- 採用**單一混合語言向量解碼**，強化中英交錯情境（句內 + 句外切換），例如「面對不知道的我們怎麼用 open mind open heart 的心情去 explore」這種台灣人常見的中英夾雜講法
- 強化時間戳記對齊，適合自動字幕生成

### 效果範例（vs Whisper-large-v2）

同一段 MediaTek 24週年影片：
- **Breeze ASR 25**：`面對不知道的我們怎麼用 open mind open heart 的心情去 explore...`
- **Whisper-large-v2**：`面對不知道的我們怎麼用開放心情去探索...`（英文詞被翻譯成中文，語氣較失真）

## Benchmark（WER，越低越好）

對比 baseline WLV2-Auto / WLV3-Auto / COOL-Whisper：

| 資料集 | 語言 | Breeze ASR 25 | 相對 WLV2-Auto 改善 |
|---|---|---|---|
| ASCEND-OVERALL（中英混用） | Code-switching | 17.74 | -16.08% |
| CSZS-zh-en（中英混用） | Code-switching | 13.01 | **-55.88%** |
| CommonVoice16-zh-TW | 中文 | 7.97 | -19% |
| ML-lecture-2021-long（長音檔） | 中文 | 4.98 | -18.76% |

中英混用情境改善最明顯（CSZS-zh-en 降 55.88%），符合「為台灣中英夾雜口語優化」的定位。

## 訓練資料

全部來自**寬鬆開源授權**資料集，中文部分皆為**合成語音**：

| 資料集 | 類型 | 語言 | 小時數 | 授權 |
|---|---|---|---|---|
| ODC Synth | 合成 | 中文 | 10,000 | ODC-By + Apache 2.0 |
| CommonVoice17-EN | 真人 | 英文 | 1,738 | CC0 |
| NTUML2021 | 真人 | 中英混用 | 11 | MIT |

ODC Synth 由 FineWeb2 文本 + [BreezyVoice](https://huggingface.co/MediaTek-Research/BreezyVoice)（聯發科自家 TTS）合成。

## 使用方式

模型放在 HuggingFace：`MediaTek-Research/Breeze-ASR-25`

**方式一：transformers pipeline**
```bash
pip install --upgrade transformers datasets[audio] accelerate
python run.py --file_name=AUDIO_FILE_NAME
```
（`run.py` 內用 `WhisperForConditionalGeneration` + `AutomaticSpeechRecognitionPipeline`，`chunk_length_s=0` 效果最佳，需 CUDA）

**方式二：whisper CLI（含字幕生成）**
```bash
git submodule update --init --recursive
pip install third_party/whisper-patch-breeze
whisper {AUDIO_FILE_NAME} --model breeze-asr-25
```

## Repo 結構

僅 4 個檔案，是典型的「模型卡 + 推理腳本」repo：
- `README.md` — 模型介紹、benchmark、用法
- `run.py` — 最簡推理腳本（torchaudio 讀音檔 → resample 16kHz → Whisper pipeline）
- `.gitmodules` — 依賴 [Splend1d/whisper-patch-breeze](https://github.com/Splend1d/whisper-patch-breeze)（patch 過的 whisper CLI）
- `LICENSE` — MIT

## 可能應用

- 台灣口音/中英夾雜會議錄音轉錄（QA 工作、Ashby 求職準備的逐字稿等）
- 自動字幕生成（時間戳記對齊有強化）
- 可考慮整合進 [[project_ai_video_pipeline|AI 影片全自動化 Pipeline]] 作為中文影片的字幕/逐字稿引擎

## License

MIT
