---
source: "https://github.com/microsoft/VibeVoice"
author: "microsoft (Microsoft Research)"
stars: "50.8K"
clipped: 2026-07-29
tags:
  - "github/repo"
  - "tts"
  - "asr"
  - "speech-ai"
---

## VibeVoice — 微軟的長音檔語音 AI 家族（TTS 已下架、ASR 仍在推進）

> **microsoft/VibeVoice** | ⭐ 50,870 | 🍴 5,678 | 📝 MIT
> "Open-Source Frontier Voice AI"

---

### 一句話說明

微軟研究院的語音模型家族，核心創新是**在 7.5 Hz 超低幀率下運作的連續語音 tokenizer**（聲學 + 語意雙路），配上 next-token diffusion 架構——用 LLM（Qwen2.5）理解文本與對話流、用 diffusion head 生成高保真聲學細節。這讓它能一次處理極長序列：TTS 側可合成 **90 分鐘、4 人對話**的 podcast；ASR 側可**單次吞 60 分鐘音檔**，直接輸出「誰（speaker）／何時（timestamp）／說了什麼」的結構化逐字稿。TTS 論文獲 ICLR 2026 Oral。

**但這個 repo 現在只剩半套。** 2025-09-05 微軟因為「發現被用於偏離原意的用途」把 **TTS 的安裝與使用說明整段移除**（`docs/vibevoice-tts.md` 的 Installation and Usage 段落現在只有一行字：*Disabled due to widespread misuse.*），VibeVoice-Large 權重也從 HuggingFace 下架。現在 repo 主線推的是 ASR。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 50,870 |
| Forks | 5,678 |
| 主要語言 | Python（100%） |
| 授權 | MIT（`LICENSE` 完整；但 `pyproject.toml` 的 MIT classifier **被註解掉**） |
| 建立時間 | 2025-08-25 |
| Open Issues | 123 |
| Open PRs | 54 |
| 最新 Release | **零 Release、零 tag**（版本只在 `pyproject.toml` v1.0.0） |
| Topics | 無 |
| 首頁 | https://microsoft.github.io/VibeVoice/ |
| 是否 Archived | 否（但 2025-09 曾整個下架後復原） |
| 總 commit 數 | 140 |
| 磁碟用量 | 215 MB（含 25 個 `.pt` 語音預設） |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 58（`--compress` 模式；25 個 `.pt` 二進位語音預設被排除） |
| 總 Tokens | 100,437 |
| 壓縮模式 | **是**（diskUsage 215 MB 落在 50–500 MB 區間） |
| 安全掃描 | ✔ 無可疑檔案 |

#### 最大檔案 Top 5

*註：以打包後 XML 直接計算的**字元數**佔比（同一份壓縮內容，排序等價）。*

| 檔案 | Chars | 佔比 |
|------|--------|------|
| vllm_plugin/scripts/gradio_asr_demo_api_video.py | 30,802 | 8.0% |
| demo/web/index.html | 27,378 | 7.1% |
| vllm_plugin/model.py | 26,803 | 7.0% |
| vibevoice/schedule/dpm_solver.py | 24,624 | 6.4% |
| vibevoice/modular/modular_vibevoice_tokenizer.py | 18,384 | 4.8% |

**訊號**：前三大有兩個是 **vLLM plugin**——工程重心已從研究程式碼移到「ASR 的高吞吐部署」。`dpm_solver.py`（diffusion 取樣器）排第四，是 TTS 留下的骨架。

---

### 核心功能

**三個模型，狀態各不相同（2026-07-29 實測）：**

| 模型 | 用途 | repo 內程式碼 | HF 權重 | 實際可用性 |
|------|------|--------------|---------|-----------|
| **VibeVoice-ASR-7B** | 60 分鐘長音檔語音辨識 | ✅ 完整（含 vLLM plugin、LoRA 微調） | ✅ 公開 | ✅ 主推 |
| **VibeVoice-ASR-BitNet** | 邊緣 CPU 推論（4.62 GB → 1.58 GB，RTF<1 於 3+ 執行緒） | ➖ 在 [microsoft/VibeASR.cpp](https://github.com/microsoft/VibeASR.cpp)（另一 repo，⭐50） | ✅ 公開 | ⚠️ 極新 |
| **VibeVoice-Realtime-0.5B** | 串流即時 TTS | ✅ 完整（demo + Colab） | ✅ 公開 | ✅ 可用 |
| **VibeVoice-TTS-1.5B** | 90 分鐘多人 TTS | ⚠️ 模型類別留著（`VibeVoiceForConditionalGeneration`、diffusion head、processor、dpm_solver 都在），但**推論 demo 與使用文件被移除** | ✅ **權重仍公開**（57K 下載、2.4K likes、`gated=False`） | ❌ 官方路徑封死 |
| **VibeVoice-Large** | 45 分鐘 TTS | ❌ | ❌ **HTTP 401**（實測已下架） | ❌ |

**ASR（現行主線）賣點：**
- **60 分鐘單次處理**：不切片，64K token 內吞完整一小時音檔，維持全域 speaker 追蹤與語意連貫。傳統 ASR 切 chunk 會丟全域脈絡。
- **Who / When / What 結構化輸出**：ASR + diarization + timestamp 由同一模型聯合完成，不是三個模型串起來。
- **自訂 hotwords**：可餵人名、術語、背景資訊引導辨識。
- 原生多語，宣稱支援 50+ 語言；附 LoRA 微調程式碼與 toy dataset。已進 HF Transformers 主線與 Azure AI Foundry Labs。

**Realtime-0.5B（可用的 TTS）：** 0.5B 參數、**首個可聽音約 300 ms 延遲**、支援串流文字輸入、長音穩定約 10 分鐘。內建 25 個語音預設涵蓋 9 種語言（DE/FR/IT/JP/KR/NL/PL/PT/ES）＋ 11 種英語風格音色。**沒有中文預設。**

---

### 技術架構

```
   文字 ──────────────► LLM 主幹（Qwen2.5 1.5B / 7B，configs/ 有 64K 與 32K 兩組）
                              │  理解上下文與對話流
                              ▼
                        next-token diffusion
                              │
      ┌───────────────────────┴───────────────────────┐
      ▼                                               ▼
  Diffusion Head                          Continuous Speech Tokenizer @ 7.5 Hz
  (modular_vibevoice_                     ├ Acoustic tokenizer  ┐ 這是能吞 90 分鐘 /
   diffusion_head.py)                     └ Semantic tokenizer  ┘ 60 分鐘的關鍵——
      │  高保真聲學細節                                            超低幀率大幅壓縮序列長度
      ▼
  DPM-Solver 取樣（schedule/dpm_solver.py，10 steps）
      ▼
   24 kHz 音訊

   ASR 反向路徑：音訊 → tokenizer → LLM → 結構化逐字稿（Who/When/What）
                 部署走 vllm_plugin/（註冊為 vLLM general plugin，透過 entry-point）
```

| 層次 | 技術 |
|------|------|
| LLM 主幹 | Qwen2.5（1.5B / 7B），`vibevoice/configs/` 兩組 JSON |
| 生成 | Diffusion head + DPM-Solver 取樣器 |
| 語音表徵 | 自研連續 tokenizer，7.5 Hz（`modular_vibevoice_tokenizer.py`） |
| 框架 | PyTorch + transformers（**釘死 `>=4.51.3,<5.0.0`**，streaming 額外釘 `==4.51.3`） |
| 高吞吐部署 | vLLM plugin（`[project.entry-points."vllm.general_plugins"]`） |
| Demo | Gradio + FastAPI + aiortc（WebRTC 串流）+ 純 HTML 前端 |
| 微調 | `finetuning-asr/`：LoRA 微調 + 推論腳本 + toy dataset |
| 測試 | 僅 `vllm_plugin/tests/` 兩支 API 測試——**核心模型程式碼零測試** |

---

### 社群健康度

- 貢獻者是微軟內部小團隊（~6 人，YaoyaoChang 50 commits 為首），外部貢獻幾乎為零。
- **程式碼已停滯**：最後一次程式碼變更是 2026-05-06（`weights_only=True` 修 CWE-502 反序列化漏洞），之後只更新 README news。
- 零 Release、零 tag，靠 HF 權重與 README 公告發版。140 commits / 11 個月＝研究型節奏。
- Issue 數（123）對 5 萬星專案偏低——多數討論已外流到 Reddit 與第三方 repo。

### 社群反應與繞道生態

2025-09 微軟突然刪 repo 時，ComfyUI 節點作者 Fabix84 在 r/StableDiffusion 發的「VibeVoice RIP?」引爆討論——他兩週的貢獻一夜變孤兒，並指出 VibeVoice-Large 權重可在 **ModelScope 鏡像**取得。生態隨即繞道：

| 繞道路徑 | 現況 |
|---|---|
| [Enemyx-net/VibeVoice-ComfyUI](https://github.com/Enemyx-net/VibeVoice-ComfyUI) | ⭐1,521、MIT、最後推送 2026-02-18 |
| [0xShug0/audio.cpp](https://github.com/0xShug0/audio.cpp) | ⭐983、C++/ggml 移植，RTX 5090 上 22.95 分鐘產 93.6 分鐘音檔（比 Python 快 2.86×），持續更新 |
| ModelScope 鏡像 | 存放已從 HF 下架的 Large 權重 |

**授權矛盾未解**：Issue #95「What do you mean by out-of-scope exactly?」仍 open——「MIT 允許任何人複製、修改、販售，你說的 out-of-scope 是什麼意思？」微軟未正面回應。

**技術面已知問題**（open issue）：新語言訓練困難、生成速度慢、**1 分鐘音檔就有人 CUDA OOM**、無 Apple Silicon 支援、tensor 維度不匹配崩潰。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 間接相關。既有 `video-to-brain.py` 流程（水球設計模式課 47 支影片已入庫）目前靠 Whisper 逐字稿。VibeVoice-ASR 的增量是 **speaker diarization + timestamp 一次到位**——對單人講課影片增量小，對多人訪談／podcast／會議錄音才有意義。 |
| **Claude Code** | 無直接整合。無 MCP server、無 skill、無 CLI 套件，要用只能自己包腳本。既有 `hyperframes-media` skill 已含 Whisper 轉錄與 Kokoro TTS、`claude-real-video` 已含關鍵幀＋逐字稿——**功能位置被佔滿**。 |
| **Automation** | 低。現行自動化都不吃音訊。 |
| **競品對照** | [[Github/repos/Breeze-ASR-25 — 台灣中文中英混用語音辨識模型\|Breeze-ASR-25]] 是**台灣口音中英夾雜**專門解，VibeVoice-ASR 是**長音檔＋分人**通用解，兩者不重疊。Whisper 生態的 WhisperX 已有成熟 diarization，是 VibeVoice-ASR 的現任對手。 |

---

### 安裝建議

**⏳ 觀望** — 能力真實且獨特，但現在裝不划算。

**不裝的理由：**
1. **需求尚未出現**。現行影片入庫是單人講課，Whisper 已足夠；沒有需要分人的長音檔任務在排期。R13 判準：加複雜度換用不到的能力 → 不做。
2. **CPU 路徑太新**。7B 要 GPU（issue 顯示 1 分鐘音檔就有人 OOM）；免 GPU 的 BitNet 版在 `VibeASR.cpp`（⭐50、開版一週），Windows 要自己 build C++。
3. **治理風險已實證**。同一 repo 已發生過「MIT 授權 → 整個下架 → 部分復原 → 文件永久封存」。不是假設風險。
4. **無 Claude Code 接口**，且轉錄位置已被 `hyperframes-media` / `claude-real-video` 佔住。

**升級條件（→ ✅ 裝）：**
- 出現**需要分人逐字稿的實際任務**（訪談錄音、多人會議、podcast 分析）——Whisper 單獨做不到、VibeVoice-ASR 一次到位的唯一場景；或
- `VibeASR.cpp` 提供 **Windows 預編譯 binary**（免自 build），CPU 路徑變「下載即用」。

**放棄條件（→ ❌ 不裝）：**
- `VibeASR.cpp` 至 2027-01 仍無 Windows 支援或停更；或
- 把 WhisperX 的 diarization 接進現有 `hyperframes-media` 即滿足需求（同等能力、零新依賴、零治理風險）；或
- 微軟再次下架 ASR 權重／文件。

**❌ 明確不建議的部分**：TTS。官方路徑已封（文件寫 *Disabled due to widespread misuse*、Large 權重 401），要用只能走 ComfyUI 節點或 ModelScope 鏡像等**非官方繞道**——授權立場不明，不值得押。真要 TTS，既有 `hyperframes-media` 的 Kokoro 已可用且無此包袱。

**📌 可單獨參考（不需安裝）**：7.5 Hz 連續語音 tokenizer + next-token diffusion 的組合（`modular_vibevoice_tokenizer.py` + `modular_vibevoice_diffusion_head.py` + `dpm_solver.py`）是「用超低幀率換長序列處理能力」的可讀範例；`vllm_plugin/` 是把自訂模型註冊成 vLLM general plugin 的完整範本。

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/Breeze-ASR-25 — 台灣中文中英混用語音辨識模型|Breeze-ASR-25]] — 台灣中英混用 ASR，與本模型不重疊
- [[Github/repos/claude-real-video — 讓 Claude 真正看影片的本機關鍵幀擷取工具|claude-real-video]] — 現行影片逐字稿路徑（已安裝）
- [[影片轉文字匯入 gbrain 進度]] — 現行 Whisper 轉錄流程
