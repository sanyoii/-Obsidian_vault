---
source: "https://github.com/meituan-longcat/LongCat-Video"
author:
stars: "2,799"
clipped: 2026-05-25
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/meituan-longcat/LongCat-Video](https://github.com/meituan-longcat/LongCat-Video) | ⭐ 2,799

---

## Description


## README
[![LongCat-Video](/meituan-longcat/LongCat-Video/raw/main/assets/longcat-video_logo.svg)](/meituan-longcat/LongCat-Video/blob/main/assets/longcat-video_logo.svg)

---

[![LongCat-Video](/meituan-longcat/LongCat-Video/raw/main/assets/longcat_video_title.svg)](/meituan-longcat/LongCat-Video/blob/main/assets/longcat_video_title.svg) [![](https://camo.githubusercontent.com/cafdcb5612b1ab28528d47af9245604f8f7b0792562c7c5151fff90340a3d6cc/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50726f6a6563742d506167652d677265656e)](https://meituan-longcat.github.io/LongCat-Video/) [![](https://camo.githubusercontent.com/9e665191353cbb99c3a190cb01e4f97270cb0e05091ded221d25a36291d0ce93/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f546563686e697175652d5265706f72742d726564)](https://arxiv.org/abs/2510.22200) [![](https://camo.githubusercontent.com/4cf691142cf0c473ba7ee6e189cd96109576e2ed5b861e866748cb1a32feddbe/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f25463025394625413425393725323048756767696e67253230466163652d4d6f64656c2d626c7565)](https://huggingface.co/meituan-longcat/LongCat-Video)

[![LongCat-Video-Avatar 1.5](/meituan-longcat/LongCat-Video/raw/main/assets/longcat_video_avatar_1.5_title.svg)](/meituan-longcat/LongCat-Video/blob/main/assets/longcat_video_avatar_1.5_title.svg) [![](https://camo.githubusercontent.com/cafdcb5612b1ab28528d47af9245604f8f7b0792562c7c5151fff90340a3d6cc/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50726f6a6563742d506167652d677265656e)](https://meigen-ai.github.io/LongCat-Video-Avatar-1.5-Page/) [![](https://camo.githubusercontent.com/9e665191353cbb99c3a190cb01e4f97270cb0e05091ded221d25a36291d0ce93/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f546563686e697175652d5265706f72742d726564)](https://github.com/meituan-longcat/LongCat-Video/blob/main/assets/LongCat-Video-Avatar-1.5-Tech-Report.pdf) [![](https://camo.githubusercontent.com/4cf691142cf0c473ba7ee6e189cd96109576e2ed5b861e866748cb1a32feddbe/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f25463025394625413425393725323048756767696e67253230466163652d4d6f64656c2d626c7565)](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5) [![](https://camo.githubusercontent.com/67943a74734efcfb6bc7d3f4771825e2bd40becf7ac654873471adcd37281117/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f64656c53636f70652d4d6f64656c2d707572706c65)](https://www.modelscope.cn/models/meituan-longcat/LongCat-Video-Avatar-1.5)

[![placeholder](/meituan-longcat/LongCat-Video/raw/main/assets/title_placeholder.svg)](/meituan-longcat/LongCat-Video/blob/main/assets/title_placeholder.svg) [![](https://camo.githubusercontent.com/06225b62b54fbb66360587e6c7578c5be745c03ed82f983a188e83f444321ec0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5765436861742d4c6f6e674361742d627269676874677265656e3f6c6f676f3d776563686174266c6f676f436f6c6f723d7768697465)](https://github.com/meituan-longcat/LongCat-Flash-Chat/blob/main/figures/wechat_official_accounts.png) [![](https://camo.githubusercontent.com/88d7107dba109eb0225f5c486e5fda5adb980e934b51a15e4f7314f3c80b3f52/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547769747465722d4c6f6e674361742d77686974653f6c6f676f3d78266c6f676f436f6c6f723d7768697465)](https://x.com/Meituan_LongCat) [![](https://camo.githubusercontent.com/7d0a82b36f0eee0097b25472ac7101111668cceda45a682c6ae6cd3d939f826e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446973636f72642d4a6f696e253230436861742d3538363546323f6c6f676f3d646973636f7264266c6f676f436f6c6f723d7768697465)](https://discord.gg/EXsG52D8SW) [![](https://camo.githubusercontent.com/e33f037e57dc55617d2a83a9996ff8d2fe062f86abae5d190bc7dd1d26dac05e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d6635646535333f26636f6c6f723d663564653533)](/meituan-longcat/LongCat-Video/blob/main/LICENSE)

## Model IntroductionWe introduce LongCat-Video, a foundational video generation model with 13.6B parameters, delivering strong performance across *Text-to-Video*, *Image-to-Video*, and *Video-Continuation* generation tasks. It particularly excels in efficient and high-quality long video generation, representing our first step toward world models.

### Key Features- 🌟 **Unified architecture for multiple tasks**: LongCat-Video unifies *Text-to-Video*, *Image-to-Video*, and *Video-Continuation* tasks within a single video generation framework. It natively supports all these tasks with a single model and consistently delivers strong performance across each individual task.
- 🌟 **Long video generation**: LongCat-Video is natively pretrained on *Video-Continuation* tasks, enabling it to produce minutes-long videos without color drifting or quality degradation.
- 🌟 **Efficient inference**: LongCat-Video generates $720 p$ , $30 f p s$ videos within minutes by employing a coarse-to-fine generation strategy along both the temporal and spatial axes. Block Sparse Attention further enhances efficiency, particularly at high resolutions
- 🌟 **Strong performance with multi-reward RLHF**: Powered by multi-reward Group Relative Policy Optimization (GRPO), comprehensive evaluations on both internal and public benchmarks demonstrate that LongCat-Video achieves performance comparable to leading open-source video generation models as well as the latest commercial solutions.

For more detail, please refer to the comprehensive [***LongCat-Video Technical Report***](https://arxiv.org/abs/2510.22200).

## 🎥 Teaser Videoteaser\_video\_1min\_0p5size.mp4<video src="https://private-user-images.githubusercontent.com/5246824/505617997-00fa63f0-9c4e-461a-a79e-c662ad596d7d.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzk3MDE0MDAsIm5iZiI6MTc3OTcwMTEwMCwicGF0aCI6Ii81MjQ2ODI0LzUwNTYxNzk5Ny0wMGZhNjNmMC05YzRlLTQ2MWEtYTc5ZS1jNjYyYWQ1OTZkN2QubXA0P1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDUyNSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA1MjVUMDkyNTAwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9OTdmOGMyMDdlMWFlYzZmZjc2ZWM4YjAwNDYzMDdlMjljZTk4NWEzZmMzNGJhYjU4ODZkOWU1NDgzNGNlOWUxZCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPXZpZGVvJTJGbXA0In0.Y8cSFo4Sr7-vsTzd6Tbee8AfhBvCqRs42hecX2CQgbQ" data-canonical-src="https://private-user-images.githubusercontent.com/5246824/505617997-00fa63f0-9c4e-461a-a79e-c662ad596d7d.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Nzk3MDE0MDAsIm5iZiI6MTc3OTcwMTEwMCwicGF0aCI6Ii81MjQ2ODI0LzUwNTYxNzk5Ny0wMGZhNjNmMC05YzRlLTQ2MWEtYTc5ZS1jNjYyYWQ1OTZkN2QubXA0P1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDUyNSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA1MjVUMDkyNTAwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9OTdmOGMyMDdlMWFlYzZmZjc2ZWM4YjAwNDYzMDdlMjljZTk4NWEzZmMzNGJhYjU4ODZkOWU1NDgzNGNlOWUxZCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPXZpZGVvJTJGbXA0In0.Y8cSFo4Sr7-vsTzd6Tbee8AfhBvCqRs42hecX2CQgbQ" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px"></video>

## 🔥 Latest News!!- May 21, 2026: 🚀 We release [***LongCat-Video-Avatar-1.5***](https://meigen-ai.github.io/LongCat-Video-Avatar-1.5-Page/), an upgraded open-source framework for audio-driven human video generation. v1.5 replaces Wav2Vec2 with Whisper-Large for more accurate lip synchronization, achieves production-ready physical rationality and temporal stability with robust long-video generation, generalizes to stylized domains (anime, animals, complex real-world conditions), supports both single-stream and multi-stream audio inputs, and accelerates inference to 8 steps via step distillation. \[ [***code***](https://github.com/meituan-longcat/LongCat-Video) | 🤗 [***weights***](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5) | [***project page***](https://meigen-ai.github.io/LongCat-Video-Avatar-1.5-Page/) \]
- Dec 16, 2025: 🚀 We are excited to announce the release of [***LongCat-Video-Avatar***](https://meigen-ai.github.io/LongCat-Video-Avatar/), a unified model that delivers expressive and highly dynamic audio-driven character animation, supporting native tasks including *Audio-Text-to-Video*, *Audio-Text-Image-to-Video*, and *Video Continuation* with seamless compatibility for both *single-stream* and *multi-stream* audio inputs. The release includes our [***Technical Report***](https://github.com/meituan-longcat/LongCat-Video), [***inference code***](https://github.com/meituan-longcat/LongCat-Video), 🤗 [***model weights***](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar), and [***project page***](https://meigen-ai.github.io/LongCat-Video-Avatar/).
- Oct 25, 2025: 🚀 We've released LongCat-Video, a foundational video generation model. Tech report and models are available at [***LongCat-Video Technical Report***](https://arxiv.org/abs/2510.22200) and 🤗 [***Huggingface***](https://huggingface.co/meituan-longcat/LongCat-Video) !

## Quick Start### InstallationClone the repo:

git clone --single-branch --branch main https://github.com/meituan-longcat/LongCat-Video
cd LongCat-Video

Install dependencies:

# create conda environment
conda create -n longcat-video python=3.10
conda activate longcat-video

# install torch (configure according to your CUDA version)
pip install torch==2.6.0+cu124 torchvision==0.21.0+cu124 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cu124

# install flash-attn-2
pip install ninja 
pip install psutil 
pip install packaging 
pip install flash\_attn==2.7.4.post1

# install other requirements
pip install -r requirements.txt

# install longcat-video-avatar requirements
conda install -c conda-forge librosa
conda install -c conda-forge ffmpeg
pip install -r requirements\_avatar.txt

FlashAttention-2 is enabled in the model config by default; you can also change the model config ("./weights/LongCat-Video/dit/config.json") to use FlashAttention-3 or xformers once installed.

### Model Download| Models | Description | Download Link |
| --- | --- | --- |
| LongCat-Video | foundational video generation | 🤗 [Huggingface](https://huggingface.co/meituan-longcat/LongCat-Video) |
| LongCat-Video-Avatar | single- and multi-character audio-driven video generation (wav2vec2) | 🤗 [Huggingface](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar) |
| LongCat-Video-Avatar-1.5 | upgraded avatar model with Whisper-large-v3 audio encoder, distillation-based fast inference | 🤗 [Huggingface](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5) |

Download models using huggingface-cli:

pip install "huggingface\_hub\[cli\]"
huggingface-cli download meituan-longcat/LongCat-Video --local-dir ./weights/LongCat-Video
huggingface-cli download meituan-longcat/LongCat-Video-Avatar --local-dir ./weights/LongCat-Video-Avatar
huggingface-cli download meituan-longcat/LongCat-Video-Avatar-1.5 --local-dir ./weights/LongCat-Video-Avatar-1.5

### Run Text-to-Video# Single-GPU inference
torchrun run\_demo\_text\_to\_video.py --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

# Multi-GPU inference
torchrun --nproc\_per\_node=2 run\_demo\_text\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

### Run Image-to-Video# Single-GPU inference
torchrun run\_demo\_image\_to\_video.py --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

# Multi-GPU inference
torchrun --nproc\_per\_node=2 run\_demo\_image\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

### Run Video-Continuation# Single-GPU inference
torchrun run\_demo\_video\_continuation.py --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

# Multi-GPU inference
torchrun --nproc\_per\_node=2 run\_demo\_video\_continuation.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

### Run Long-Video Generation# Single-GPU inference
torchrun run\_demo\_long\_video.py --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

# Multi-GPU inference
torchrun --nproc\_per\_node=2 run\_demo\_long\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

### Run Interactive Video Generation# Single-GPU inference
torchrun run\_demo\_interactive\_video.py --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

# Multi-GPU inference
torchrun --nproc\_per\_node=2 run\_demo\_interactive\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video --enable\_compile

### Run LongCat-Video-Avatar💡 User tips for 1.5

> - **Lip synchronization accuracy:** Audio CFG works optimally between 3–5. Increase the audio CFG value for better synchronization.
> - **Prompt Enhancement:** Longer, more descriptive prompts yield better consistency and naturalness than short ones. We recommend including rich details such as character appearance, actions, and scene context (e.g., *"A young woman with long black hair is speaking and smiling, wearing a white blouse, sitting in a bright café"*) for best results.
> - **Mitigate repeated actions:** Setting the reference image index（--ref\_img\_index, default to 10） between 0 and 24 ensures better consistency; setting it to 30 helps reduce repeated actions. Additionally, increasing the mask frame range (--mask\_frame\_range, default to 3) can further help mitigate repeated actions, but excessively large values may introduce artifacts.
> - **Super resolution:** Our model is compatible with both 480P and 720P, which can be controlled via --resolution.
> - **Dual-Audio Modes:** Merge mode (set audio\_type to para) requires two audio clips of equal length, and the resulting audio is obtained by summing the two clips; Concatenation mode (set audio\_type to add) does not require equal-length inputs, and the resulting audio is formed by sequentially concatenating the two clips with silence padding for any gaps, where by default person1 speaks first and person2 speaks afterward.
> - **Model versions:** `--model_type avatar-v1.0` uses wav2vec2 audio encoder (default); `--model_type avatar-v1.5` uses Whisper-large-v3 audio encoder for better lip sync quality.
> - **Distillation mode:** Add `--use_distill` to enable distillation sampling (fewer steps, faster inference). This is **required** when using `--model_type avatar-v1.5`.
> - **INT8 quantization:** Add `--use_int8` to load the INT8 quantized DiT model for reduced VRAM usage. Only supported with `--model_type avatar-v1.5`.

💡 User tips for 1.0

> - Lip synchronization accuracy:​​ Audio CFG works optimally between 3–5. Increase the audio CFG value for better synchronization.
> - Prompt Enhancement: Include clear verbal-action cues (e.g., talking, speaking) in the prompt to achieve more natural lip movements.
> - Mitigate repeated actions: Setting the reference image index（--ref\_img\_index, default to 10） between 0 and 24 ensures better consistency, while selecting other ranges (e.g., -10 or 30) helps reduce repeated actions. Additionally, increasing the mask frame range (--mask\_frame\_range, default to 3) can further help mitigate repeated actions, but excessively large values may introduce artifacts.
> - Super resolution: Our model is compatible with both 480P and 720P, which can be controlled via --resolution.
> - Dual-Audio Modes: Merge mode (set audio\_type to para) requires two audio clips of equal length, and the resulting audio is obtained by summing the two clips; Concatenation mode (set audio\_type to add) does not require equal-length inputs, and the resulting audio is formed by sequentially concatenating the two clips with silence padding for any gaps, where by default person1 speaks first and person2 speaks afterward.

#### LongCat-Video-Avatar-1.5- Single-Audio-to-Video Generation

# Audio-Text-to-Video
torchrun --nproc\_per\_node=2 run\_demo\_avatar\_single\_audio\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video-Avatar-1.5 --stage\_1=at2v --input\_json=assets/avatar/single\_example\_1.json --use\_distill --model\_type avatar-v1.5 --use\_int8

# Audio-Image-to-Video
torchrun --nproc\_per\_node=2 run\_demo\_avatar\_single\_audio\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video-Avatar-1.5 --stage\_1=ai2v --input\_json=assets/avatar/single\_example\_1.json --use\_distill --model\_type avatar-v1.5 --use\_int8

# Audio-Text-to-Video and Video-Continuation
torchrun --nproc\_per\_node=2 run\_demo\_avatar\_single\_audio\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video-Avatar-1.5 --stage\_1=at2v --input\_json=assets/avatar/single\_example\_1.json --num\_segments=5 --ref\_img\_index=10 --mask\_frame\_range=3 --use\_distill --model\_type avatar-v1.5 --use\_int8

# Audio-Image-to-Video and Video-Continuation
torchrun --nproc\_per\_node=2 run\_demo\_avatar\_single\_audio\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video-Avatar-1.5 --stage\_1=ai2v --input\_json=assets/avatar/single\_example\_1.json --num\_segments=5 --ref\_img\_index=10 --mask\_frame\_range=3 --use\_distill --model\_type avatar-v1.5 --use\_int8

- Multi-Audio-to-Video Generation

# Audio-Image-to-Video
torchrun --nproc\_per\_node=2 run\_demo\_avatar\_multi\_audio\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video-Avatar-1.5 --input\_json=assets/avatar/multi\_example\_1.json --use\_distill --model\_type avatar-v1.5 --use\_int8

# Audio-Image-to-Video and Video-Continuation
torchrun --nproc\_per\_node=2 run\_demo\_avatar\_multi\_audio\_to\_video.py --context\_parallel\_size=2 --checkpoint\_dir=./weights/LongCat-Video-Avatar-1.5 --input\_json=assets/avatar/multi\_example\_1.json --num\_segments=5 --ref\_img\_index=10 --mask\_frame\_range=3 --use\_distill --model\_type avatar-v1.5 --use\_int8

### Run Streamlit# Single-GPU inference
streamlit run ./run\_streamlit.py --server.fileWatcherType none --server.headless=false

## Evaluation Results### Text-to-VideoThe *Text-to-Video* MOS evaluation results on our internal benchmark.

| **MOS score** | **Veo3** | **PixVerse-V5** | **Wan 2.2-T2V-A14B** | **LongCat-Video** |
| --- | --- | --- | --- | --- |
| **Accessibility** | Proprietary | Proprietary | Open Source | Open Source |
| **Architecture** | \- | \- | MoE | Dense |
| **\# Total Params** | \- | \- | 28B | 13.6B |
| **\# Activated Params** | \- | \- | 14B | 13.6B |
| Text-Alignment↑ | 3.99 | 3.81 | 3.70 | 3.76 |
| Visual Quality↑ | 3.23 | 3.13 | 3.26 | 3.25 |
| Motion Quality↑ | 3.86 | 3.81 | 3.78 | 3.74 |
| Overall Quality↑ | 3.48 | 3.36 | 3.35 | 3.38 |

### Image-to-VideoThe *Image-to-Video* MOS evaluation results on our internal benchmark.

| **MOS score** | **Seedance 1.0** | **Hailuo-02** | **Wan 2.2-I2V-A14B** | **LongCat-Video** |
| --- | --- | --- | --- | --- |
| **Accessibility** | Proprietary | Proprietary | Open Source | Open Source |
| **Architecture** | \- | \- | MoE | Dense |
| **\# Total Params** | \- | \- | 28B | 13.6B |
| **\# Activated Params** | \- | \- | 14B | 13.6B |
| Image-Alignment↑ | 4.12 | 4.18 | 4.18 | 4.04 |
| Text-Alignment↑ | 3.70 | 3.85 | 3.33 | 3.49 |
| Visual Quality↑ | 3.22 | 3.18 | 3.23 | 3.27 |
| Motion Quality↑ | 3.77 | 3.80 | 3.79 | 3.59 |
| Overall Quality↑ | 3.35 | 3.27 | 3.26 | 3.17 |

## Community WorksCommunity works are welcome! Please PR or inform us in Issue to add your work.

- [CacheDiT](https://github.com/vipshop/cache-dit) offers Fully Cache Acceleration support for LongCat-Video with DBCache and TaylorSeer, achieved nearly 1.7x speedup without obvious loss of precision. Visit their [example](https://github.com/vipshop/cache-dit/blob/main/examples/pipeline/run_longcat_video.py) for more details.

## License AgreementThe **model weights** are released under the **MIT License**.

Any contributions to this repository are licensed under the MIT License, unless otherwise stated. This license does not grant any rights to use Meituan trademarks or patents.

See the [LICENSE](/meituan-longcat/LongCat-Video/blob/main/LICENSE) file for the full license text.

## Usage ConsiderationsThis model has not been specifically designed or comprehensively evaluated for every possible downstream application.

Developers should take into account the known limitations of large language models, including performance variations across different languages, and carefully assess accuracy, safety, and fairness before deploying the model in sensitive or high-risk scenarios. It is the responsibility of developers and downstream users to understand and comply with all applicable laws and regulations relevant to their use case, including but not limited to data protection, privacy, and content safety requirements.

Nothing in this Model Card should be interpreted as altering or restricting the terms of the MIT License under which the model is released.

## CitationWe kindly encourage citation of our work if you find it useful.

```
@misc{meituanlongcatteam2025longcatvideotechnicalreport,
      title={LongCat-Video Technical Report}, 
      author={Meituan LongCat Team and Xunliang Cai and Qilong Huang and Zhuoliang Kang and Hongyu Li and Shijun Liang and Liya Ma and Siyu Ren and Xiaoming Wei and Rixu Xie and Tong Zhang},
      year={2025},
      eprint={2510.22200},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2510.22200}, 
}
@misc{meituanlongcatteam2025longcatvideoavatar15technicalreport,
      title={LongCat-Video-Avatar 1.5 Technical Report}, 
      author={Meituan LongCat Team},
      year={2026},
      eprint={},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={}, 
}
@misc{meituanlongcatteam2025longcatvideoavatartechnicalreport,
      title={LongCat-Video-Avatar Technical Report}, 
      author={Meituan LongCat Team},
      year={2025},
      eprint={},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={}, 
}
```

## AcknowledgementsWe would like to thank the contributors to the [Wan](https://huggingface.co/Wan-AI), [UMT5-XXL](https://huggingface.co/google/umt5-xxl), [Diffusers](https://github.com/huggingface/diffusers) and [HuggingFace](https://huggingface.co) repositories, for their open research.

## ContactPlease contact us at [longcat-team@meituan.com](mailto:longcat-team@meituan.com) or scan the QR code to join our WeChat Group if you have any questions.  
[![](https://raw.githubusercontent.com/meituan-longcat/LongCat-Flash-Chat/main/wechat-assets/Wechat.png)](https://raw.githubusercontent.com/meituan-longcat/LongCat-Flash-Chat/main/wechat-assets/Wechat.png)
