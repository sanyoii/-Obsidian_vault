---
source: "https://github.com/Alishahryar1/free-claude-code"
author:
stars: "29,462"
clipped: 2026-05-25
tags:
  - "github/repo"
---
# 

> **出處：** [https://github.com/Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | ⭐ 29,462

---

## Description


## README
Use Claude Code CLI, VS Code, JetBrains ACP, or chat bots through your own Anthropic-compatible proxy.

[![License: MIT](https://camo.githubusercontent.com/7a1226d14a365d288bfe51ece915ee0c7e754a16faa51ff06436504de29b33b4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d79656c6c6f772e7376673f7374796c653d666f722d7468652d6261646765)](https://opensource.org/licenses/MIT) [![Python 3.14](https://camo.githubusercontent.com/84c91f31355cd06fc650034d4a2e86b4c311dd6c6cdda84970fcf4ba1780fec7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f707974686f6e2d332e31342d3337373661622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d707974686f6e266c6f676f436f6c6f723d7768697465)](https://www.python.org/downloads/) [![uv](https://camo.githubusercontent.com/9667c5747613b2fa3531c98eedc14181aa4a52cc9ecc8beb650145808d08eefb/68747470733a2f2f696d672e736869656c64732e696f2f656e64706f696e743f75726c3d68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f61737472616c2d73682f75762f6d61696e2f6173736574732f62616467652f76302e6a736f6e267374796c653d666f722d7468652d6261646765)](https://github.com/astral-sh/uv) [![Tested with Pytest](https://camo.githubusercontent.com/8afe4b033e67d48cec0f2e0846546533934dcf66738849fbab86517be4ca628d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f74657374696e672d5079746573742d3030633066662e7376673f7374796c653d666f722d7468652d6261646765)](https://github.com/Alishahryar1/free-claude-code/actions/workflows/tests.yml) [![Type checking: Ty](https://camo.githubusercontent.com/e7876ba59b074e4c4d0145ab5b38cac0731b0e5cd7af2bdb7f5c0677ddda33c0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f74797065253230636865636b696e672d74792d6666636330302e7376673f7374796c653d666f722d7468652d6261646765)](https://pypi.org/project/ty/) [![Code style: Ruff](https://camo.githubusercontent.com/784fc8d2105b04bfd0a7db6addd7918bead1551be1428bd264eb3724adc05188/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f6465253230666f726d617474696e672d727566662d6635613632332e7376673f7374796c653d666f722d7468652d6261646765)](https://github.com/astral-sh/ruff) [![Logging: Loguru](https://camo.githubusercontent.com/14b3670d7ba458459006cefd63478ad78813a46a5ca311d168b8c289aaa448eb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6f6767696e672d6c6f677572752d3465636463342e7376673f7374796c653d666f722d7468652d6261646765)](https://github.com/Delgan/loguru)

Free Claude Code routes Anthropic Messages API traffic from Claude Code to any provider. It keeps Claude Code's client-side protocol stable while letting you choose free, paid, or local models.

[Quick Start](#quick-start) · [Providers](#choose-a-provider) · [Clients](#connect-claude-code) · [Integrations](#optional-integrations) · [Development](#development)

[![Free Claude Code in action](/Alishahryar1/free-claude-code/raw/main/assets/pic.png)](/Alishahryar1/free-claude-code/blob/main/assets/pic.png)

## Star History  [![Star History Chart](https://camo.githubusercontent.com/43d4654eca1e0576010f4582a928b9d8854095681b93138f7920d50f0cfb1f23/68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f7376673f7265706f733d416c697368616872796172312f667265652d636c617564652d636f646526747970653d44617465)](https://star-history.com/#Alishahryar1/free-claude-code&Date)

## What You Get- Drop-in proxy for Claude Code's Anthropic API calls.
- Seventeen provider backends: NVIDIA NIM, OpenRouter, Google AI Studio (Gemini), DeepSeek, Mistral La Plateforme, Mistral Codestral, OpenCode Zen, OpenCode Go, Wafer, Kimi, Cerebras Inference, Groq, Fireworks AI, Z.ai, LM Studio, llama.cpp, and Ollama.
- Per-model routing: send Opus, Sonnet, Haiku, and fallback traffic to different providers.
- Native Claude Code `/model` picker support through the proxy's `/v1/models` endpoint (Claude Code must opt in to Gateway model discovery; see [Model Picker](#model-picker)).
- Streaming, tool use, reasoning/thinking block handling, and local request optimizations.
- Optional Discord or Telegram bot wrapper for remote coding sessions.
- Optional Usage through the VSCode extension.
- Optional voice-note transcription through local Whisper or NVIDIA NIM.
- Local **Admin UI** at `/admin` to edit supported proxy settings, validate changes, and check providers (loopback access only).

## Quick Start### 1\. Fast InstallInstall Claude Code if missing, install or update uv, then install Python 3.14.0 and Free Claude Code:

macOS/Linux:

curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh

Windows PowerShell:

irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1" | iex

Review the installers at [scripts/install.sh](https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh) and [scripts/install.ps1](https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1).

### 2\. Start The Proxyfcc-server

After startup, Uvicorn prints the proxy bind address and the app logs the admin URL:

```
INFO:     Admin UI: http://127.0.0.1:8082/admin (local-only)
```

Many terminals make these clickable. Use your configured `PORT` if it is not `8082`.

### 3\. Open The Admin UI And Configure NVIDIA NIMOpen the **Admin UI** URL from the terminal output.

Need an NVIDIA NIM API key? Use the **[NVIDIA NIM provider](#nvidia-nim-provider)** section below, then scroll back up here.

[![Local admin UI for proxy settings](/Alishahryar1/free-claude-code/raw/main/assets/admin-page.png)](/Alishahryar1/free-claude-code/blob/main/assets/admin-page.png)

Paste your NVIDIA NIM API key into `NVIDIA_NIM_API_KEY`, then click **Validate** and **Apply**.

The default model is already set to `nvidia_nim/nvidia/nemotron-3-super-120b-a12b`. You can change it later from the same Admin UI.

### 4\. Run Claude Codefcc-claude

`fcc-claude` reads the current configured port and auth token each time it starts, sets the Claude Code environment variables (including a 190k-token `CLAUDE_CODE_AUTO_COMPACT_WINDOW` for auto-compaction), and then launches the real `claude` command.

## Choose A ProviderPick one provider, enter its key or local URL in the Admin UI, and set `MODEL` to a provider-prefixed model slug. `MODEL` is the fallback. `MODEL_OPUS`, `MODEL_SONNET`, and `MODEL_HAIKU` can override routing for Claude Code's model tiers.

### 1\. [NVIDIA NIM](https://build.nvidia.com/)Get a key at [build.nvidia.com/settings/api-keys](https://build.nvidia.com/settings/api-keys).

In the Admin UI, paste it into `NVIDIA_NIM_API_KEY`. The default `MODEL` is `nvidia_nim/nvidia/nemotron-3-super-120b-a12b`.

Popular examples:

- `nvidia_nim/nvidia/nemotron-3-super-120b-a12b`
- `nvidia_nim/z-ai/glm5.1`
- `nvidia_nim/moonshotai/kimi-k2.5`
- `nvidia_nim/minimaxai/minimax-m2.5`

Browse models at [build.nvidia.com](https://build.nvidia.com/explore/discover).

### 2\. [OpenRouter](https://openrouter.ai/)Get a key at [openrouter.ai/keys](https://openrouter.ai/keys).

In the Admin UI, paste it into `OPENROUTER_API_KEY`, then set `MODEL` to an OpenRouter slug such as `open_router/stepfun/step-3.5-flash:free`.

Browse [all models](https://openrouter.ai/models) or [free models](https://openrouter.ai/collections/free-models).

### 3\. [Google AI Studio (Gemini)](https://aistudio.google.com/)Get a Gemini API key at [Google AI Studio](https://aistudio.google.com/apikey) (see Google's [Gemini OpenAI compatibility](https://ai.google.dev/gemini-api/docs/openai) docs).

In the Admin UI, paste it into `GEMINI_API_KEY`, then set `MODEL` to a Gemini model slug such as `gemini/gemini-2.5-flash` or `gemini/gemini-3.1-flash-lite`.

The Gemini API exposes an OpenAI-compatible endpoint at `https://generativelanguage.googleapis.com/v1beta/openai/`. Free tier quotas are per-model; prompts may be used to improve Google's products outside the UK/CH/EEA/EU unless your account region says otherwise—see Google's terms.

Popular examples:

- `gemini/gemini-2.5-flash`
- `gemini/gemini-3.1-flash-lite`

### 4\. [DeepSeek](https://platform.deepseek.com/)Get a key at [platform.deepseek.com/api\_keys](https://platform.deepseek.com/api_keys).

In the Admin UI, paste it into `DEEPSEEK_API_KEY`, then set `MODEL` to a DeepSeek slug such as `deepseek/deepseek-chat`.

This provider uses DeepSeek's Anthropic-compatible endpoint, not the OpenAI chat-completions endpoint.

### 5\. [Mistral La Plateforme](https://console.mistral.ai/)[Mistral](https://mistral.ai) hosts an OpenAI-compatible Chat Completions API at `https://api.mistral.ai/v1`. Activate the **Experiment** plan on [console.mistral.ai](https://console.mistral.ai/) for free-tier API access with rate limits (upgrade for higher quotas).

In the Admin UI, paste your API key into `MISTRAL_API_KEY`, then set `MODEL` to a Mistral model slug such as `mistral/devstral-small-latest` or `mistral/mistral-small-latest`.

Popular examples:

- `mistral/devstral-small-latest`
- `mistral/mistral-small-latest`

Browse models at [Mistral documentation](https://docs.mistral.ai/).

### 6\. [Mistral Codestral](https://console.mistral.ai/)Mistral's **Codestral** gateway uses a **separate API key** from La Plateforme: provision `CODESTRAL_API_KEY`, then route with the `mistral_codestral/` prefix. The default upstream is **`https://codestral.mistral.ai/v1`** (OpenAI-compatible Chat Completions; same request shaping as the `mistral` provider). See Mistral's [coding / FIM domains](https://docs.mistral.ai/mistral-vibe/using-fim-api); the curated [free LLM API list](https://github.com/cheahjs/free-llm-api-resources#mistral-codestral) summarizes typical Codestral access terms.

Popular examples:

- `mistral_codestral/codestral-latest`

### 7\. [OpenCode Zen](https://opencode.ai/)Get an API key at [opencode.ai/auth](https://opencode.ai/auth).

In the Admin UI, paste it into `OPENCODE_API_KEY`, then set `MODEL` to an OpenCode Zen model slug such as `opencode/gpt-5.3-codex`. The same `OPENCODE_API_KEY` powers **OpenCode Go** (below); use `opencode_go/` slugs there.

OpenCode Zen is a curated model gateway that provides access to models from Anthropic, OpenAI, Google, DeepSeek, and more through a single API key and OpenAI-compatible endpoint at `https://opencode.ai/zen/v1`.

Popular examples:

- `opencode/gpt-5.3-codex`
- `opencode/claude-sonnet-4`
- `opencode/deepseek-v4-flash-free` (free)
- `opencode/gemini-3-flash`
- `opencode/big-pickle` (free)
- `opencode/glm-5.1`

Browse available models at [opencode.ai](https://opencode.ai).

### 8\. [OpenCode Go](https://opencode.ai/)Get an API key at [opencode.ai/auth](https://opencode.ai/auth) (same as OpenCode Zen).

In the Admin UI, use `OPENCODE_API_KEY`, then set `MODEL` to an OpenCode Go model slug such as `opencode_go/minimax-m2.7`.

OpenCode Go is a subscription gateway with its own curated catalog and OpenAI-compatible endpoint at `https://opencode.ai/zen/go/v1`. It shares the **same OpenCode API key** as Zen; only the slug prefix (`opencode_go/` vs `opencode/`) and upstream path differ.

Popular examples:

- `opencode_go/minimax-m2.7`

Browse available models at [opencode.ai](https://opencode.ai).

### 9\. [Wafer](https://wafer.ai/)Get a key from [wafer.ai](https://wafer.ai). In the Admin UI, paste it into `WAFER_API_KEY`, then set `MODEL` to a Wafer Pass model such as `wafer/DeepSeek-V4-Pro`.

Popular examples:

- `wafer/DeepSeek-V4-Pro`
- `wafer/MiniMax-M2.7`
- `wafer/Qwen3.5-397B-A17B`
- `wafer/GLM-5.1`

This provider uses Wafer's Anthropic-compatible endpoint at `https://pass.wafer.ai/v1/messages`.

### 10\. [Kimi](https://platform.moonshot.ai/)Get a key at [platform.moonshot.ai/console/api-keys](https://platform.moonshot.ai/console/api-keys).

In the Admin UI, paste it into `KIMI_API_KEY`, then set `MODEL` to a Kimi slug such as `kimi/kimi-k2.5`.

This provider calls Kimi's **Anthropic-compatible** Messages API (`https://api.moonshot.ai/anthropic/v1/messages`; model discovery uses OpenAI-compat `GET https://api.moonshot.ai/v1/models`). It is **not** the OpenAI Chat Completions path.

Browse models at [platform.moonshot.ai](https://platform.moonshot.ai).

### 11\. [Cerebras Inference](https://inference-docs.cerebras.ai/quickstart)Sign up and create an API key in the [Cerebras Cloud Console](https://cloud.cerebras.ai) (see [Quickstart](https://inference-docs.cerebras.ai/quickstart)).

In the Admin UI, set `CEREBRAS_API_KEY`, then route with `MODEL` such as `cerebras/llama3.1-8b` or `cerebras/gpt-oss-120b` (ids from [List models](https://inference-docs.cerebras.ai/api-reference/models/list-models)).

Cerebras exposes an OpenAI-compatible API at `https://api.cerebras.ai/v1` ([OpenAI compatibility](https://inference-docs.cerebras.ai/resources/openai)). Non-standard request fields should go in `extra_body` when using the OpenAI client; see the same page. For reasoning models and parameters, see [Reasoning](https://inference-docs.cerebras.ai/capabilities/reasoning). This proxy follows other OpenAI-compat adapters for thinking via `reasoning_content` when Claude-style thinking is enabled.

### 12\. [Groq](https://console.groq.com/)Get an API key at [console.groq.com/keys](https://console.groq.com/keys).

In the Admin UI, paste it into `GROQ_API_KEY`, then set `MODEL` to a Groq OpenAI-compat model slug such as `groq/llama-3.3-70b-versatile`.

Groq routes through `https://api.groq.com/openai/v1` ([OpenAI-compatible Chat Completions](https://console.groq.com/docs/openai)). Some request fields yield HTTP 400; this adapter strips known-unsupported shapes (documented in Groq's compatibility notes).

Reasoning-heavy models expose extra knobs documented under [Groq reasoning](https://console.groq.com/docs/reasoning). This release mirrors other OpenAI-compat adapters for thinking via `reasoning_content` deltas when Claude-style thinking is enabled; you can tune advanced parameters through request `extra_body` when needed.

Browse models at [console.groq.com/docs/models](https://console.groq.com/docs/models).

### 13\. [Fireworks AI](https://fireworks.ai/)Get an API key at [fireworks.ai/account/api-keys](https://fireworks.ai/account/api-keys).

In the Admin UI, paste it into `FIREWORKS_API_KEY`, then set `MODEL` to a Fireworks model slug such as `fireworks/accounts/fireworks/models/llama-v3p3-70b-instruct`.

Fireworks exposes an **Anthropic-compatible** Messages API at `https://api.fireworks.ai/inference/v1/messages` (same inference host as before; Chat Completions is not used here). Vendor-specific JSON keys can still be merged from request `extra_body` when allowed.

Browse models at [fireworks.ai/models](https://fireworks.ai/models).

### 14\. [Z.ai](https://z.ai/)Get an API key at [Z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list).

In the Admin UI, paste it into `ZAI_API_KEY`, then set `MODEL` to a Z.ai model slug such as `zai/glm-5.1`.

This provider calls Z.ai's **Anthropic-compatible** Messages API (`https://api.z.ai/api/anthropic/v1/messages`). The former OpenAI Coding Plan base (`https://api.z.ai/api/coding/paas/v4`) is **not** used by this gateway.

Popular examples:

- `zai/glm-5.1`
- `zai/glm-5-turbo`

Browse models at [Z.ai](https://z.ai).

### 15\. [LM Studio](https://lmstudio.ai/)Start LM Studio's local server and load a model. In the Admin UI, keep or update `LM_STUDIO_BASE_URL`, then set `MODEL` to the model identifier shown by LM Studio, prefixed with `lmstudio/`.

Prefer models with tool-use support for Claude Code workflows.

### 16\. [llama.cpp](https://github.com/ggml-org/llama.cpp)Start `llama-server` with an Anthropic-compatible `/v1/messages` endpoint and enough context for Claude Code requests.

In the Admin UI, keep or update `LLAMACPP_BASE_URL`, then set `MODEL` to the local model slug, prefixed with `llamacpp/`.

For local coding models, context size matters. If llama.cpp returns HTTP 400 for normal Claude Code requests, increase `--ctx-size` and verify the model/server build supports the requested features.

### 17\. [Ollama](https://ollama.com/)Run Ollama and pull a model:

ollama pull llama3.1
ollama serve

In the Admin UI, keep or update `OLLAMA_BASE_URL`, then set `MODEL` to the same tag shown by `ollama list`, prefixed with `ollama/`.

`OLLAMA_BASE_URL` is the Ollama server root; do not append `/v1`. Example model slugs include `ollama/llama3.1` and `ollama/llama3.1:8b`.

### 18\. Mix Providers By Model TierEach model tier can use a different provider by setting `MODEL_OPUS`, `MODEL_SONNET`, and `MODEL_HAIKU` in the Admin UI. Leave a tier blank to inherit `MODEL`.

For example, you can route Opus to `nvidia_nim/moonshotai/kimi-k2.5`, Sonnet to `open_router/deepseek/deepseek-r1-0528:free`, Haiku to `lmstudio/unsloth/GLM-4.7-Flash-GGUF`, and keep the fallback `MODEL` on `zai/glm-5.1`.

## Connect Claude Code### 1\. Claude Code CLIFor terminal use, prefer the installed launcher:

fcc-claude

Keep `fcc-server` running while you work. The Admin UI manages proxy config, restarts the server when runtime settings change, and `fcc-claude` reads the current Admin UI-managed port and auth token every time it starts. It also sets `CLAUDE_CODE_AUTO_COMPACT_WINDOW` to `190000` for auto-compaction.

### 2\. VS Code ExtensionOpen Settings, search for `claude-code.environmentVariables`, choose **Edit in settings.json**, and add:

"claudeCode.environmentVariables": \[
  { "name": "ANTHROPIC\_BASE\_URL", "value": "http://localhost:8082" },
  { "name": "ANTHROPIC\_AUTH\_TOKEN", "value": "freecc" },
  { "name": "CLAUDE\_CODE\_ENABLE\_GATEWAY\_MODEL\_DISCOVERY", "value": "1" },
  { "name": "CLAUDE\_CODE\_AUTO\_COMPACT\_WINDOW", "value": "190000" }
\]

Reload the extension. If the extension shows a login screen, choose the Anthropic Console path once; the local proxy still handles model traffic after the environment variables are active.

### 3\. JetBrains ACPEdit the installed Claude ACP config:

- Windows: `C:\Users\%USERNAME%\AppData\Roaming\JetBrains\acp-agents\installed.json`
- Linux/macOS: `~/.jetbrains/acp.json`

Set the environment for `acp.registry.claude-acp`:

"env": {
  "ANTHROPIC\_BASE\_URL": "http://localhost:8082",
  "ANTHROPIC\_AUTH\_TOKEN": "freecc",
  "CLAUDE\_CODE\_ENABLE\_GATEWAY\_MODEL\_DISCOVERY": "1",
  "CLAUDE\_CODE\_AUTO\_COMPACT\_WINDOW": "190000"
}

Restart the IDE after changing the file.

### 4\. Model Picker[![Claude Code model picker showing gateway models](/Alishahryar1/free-claude-code/raw/main/assets/cc-model-picker.png)](/Alishahryar1/free-claude-code/blob/main/assets/cc-model-picker.png)

## Optional IntegrationsFor every integration below, change **managed proxy settings** only in the **Admin UI** at `/admin`: edit fields, click **Validate**, then **Apply**. The footer shows where the managed config is stored; this README does not walk through editing that file by hand.

### 1\. Discord And Telegram BotsThe bot wrapper runs Claude Code sessions remotely, streams progress, supports reply-based conversation branches, and can stop or clear tasks.

**Discord**

1. Create the bot in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Enable **Message Content Intent**.
3. Invite the bot with read, send, and message history permissions.
4. Copy the bot token and the numeric channel ID (or IDs) where the bot should respond.

**Telegram**

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the bot token.
2. Get your numeric user ID from [@userinfobot](https://t.me/userinfobot) so only you can use the bot.

**Configure in the Admin UI**

1. With `fcc-server` running, open the **Admin UI** URL from the terminal output.
2. In the sidebar, choose **Messaging**.
3. Set **Messaging Platform** to **discord** or **telegram**.
4. For Discord, paste **Discord Bot Token** and **Allowed Discord Channels**. For Telegram, paste **Telegram Bot Token** and **Allowed Telegram User ID**.
5. Set **Allowed Directory** to an absolute path on the machine running the proxy—the workspace root the bot may use.
6. Click **Validate**, then **Apply**. Restart the server if the UI says one is required.

[![Admin UI Messaging view with bot and voice settings](/Alishahryar1/free-claude-code/raw/main/assets/admin-messaging.png)](/Alishahryar1/free-claude-code/blob/main/assets/admin-messaging.png)

*Admin UI → Messaging (platform, bots, and Voice)*

**Useful commands**

- `/stop` cancels a task; reply to a task message to stop only that branch.
- `/clear` resets sessions; reply to clear one branch.
- `/stats` shows session state.

### 2\. Voice NotesVoice notes work on Discord and Telegram after you extend your [Free Claude Code install](#1-fast-install) with the matching optional extras.

macOS/Linux:

# NVIDIA NIM transcription (Riva gRPC)
curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh -s -- --voice-nim

# Local Whisper (CPU or CUDA)
curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh -s -- --voice-local

# Both backends
curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh -s -- --voice-all

# Local Whisper with CUDA
curl -fsSL "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.sh?raw=1" | sh -s -- --voice-local --torch-backend cu130

Windows PowerShell:

# NVIDIA NIM transcription (Riva gRPC)
& (\[scriptblock\]::Create((irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1"))) \-VoiceNim

# Local Whisper (CPU or CUDA)
& (\[scriptblock\]::Create((irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1"))) \-VoiceLocal

# Both backends
& (\[scriptblock\]::Create((irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1"))) \-VoiceAll

# Local Whisper with CUDA
& (\[scriptblock\]::Create((irm "https://github.com/Alishahryar1/free-claude-code/blob/main/scripts/install.ps1?raw=1"))) \-VoiceLocal \-TorchBackend cu130

Restart `fcc-server` after reinstalling.

In the **Admin UI**, open **Messaging** and scroll to **Voice**. Turn on **Voice Notes**, choose **Whisper Device** (`cpu`, `cuda`, or `nvidia_nim`), set **Whisper Model**, and enter **Hugging Face Token** when your setup needs it. For **nvidia\_nim** transcription, install the `voice` extra and set **NVIDIA NIM API Key** on the **Providers** view. The screenshot above shows the **Voice** block in the same view.

## How It Works[![Free Claude Code request flow architecture](/Alishahryar1/free-claude-code/raw/main/assets/how-it-works.svg)](/Alishahryar1/free-claude-code/blob/main/assets/how-it-works.svg)

Diagram source: [`assets/how-it-works.mmd`](/Alishahryar1/free-claude-code/blob/main/assets/how-it-works.mmd).

Important pieces:

- FastAPI exposes Anthropic-compatible routes such as `/v1/messages`, `/v1/messages/count_tokens`, and `/v1/models`.
- Model routing resolves the Claude model name to `MODEL_OPUS`, `MODEL_SONNET`, `MODEL_HAIKU`, or `MODEL`.
- NIM, OpenCode Zen, and OpenCode Go use OpenAI chat streaming translated into Anthropic SSE.
- Wafer, OpenRouter, DeepSeek, Kimi, Fireworks AI, Z.ai, LM Studio, llama.cpp, and Ollama use Anthropic Messages style transports where applicable (with provider-specific quirks and model-list URLs).
- The proxy normalizes thinking blocks, tool calls, token usage metadata, and provider errors into the shape Claude Code expects.
- Request optimizations answer trivial Claude Code probes locally to save latency and quota.

## Development### 1\. Project Structure```
free-claude-code/
├── server.py              # ASGI entry point
├── api/                   # FastAPI routes, service layer, routing, optimizations
├── core/                  # Shared Anthropic protocol helpers and SSE utilities
├── providers/             # Provider transports, registry, rate limiting
├── messaging/             # Discord/Telegram adapters, sessions, voice
├── cli/                   # Package entry points and Claude process management
├── config/                # Settings, provider catalog, logging
└── tests/                 # Unit and contract tests
```

### 2\. Run From SourceUse this path if you are developing or want to run directly from a checkout:

git clone https://github.com/Alishahryar1/free-claude-code.git
cd free-claude-code
uv run uvicorn server:app --host 0.0.0.0 --port 8082

### 3\. Commandsuv run ruff format
uv run ruff check
uv run ty check
uv run pytest

Run them in that order before pushing. CI enforces the same checks.

### 4\. Package Scripts`pyproject.toml` installs:

- `fcc-server`: starts the proxy with configured host and port.
- `fcc-init`: optional advanced scaffold for `~/.fcc/.env`; prefer the **Admin UI** for normal configuration.
- `fcc-claude`: launches Claude Code with the configured local proxy URL, auth token, model discovery flag, and a 190k `CLAUDE_CODE_AUTO_COMPACT_WINDOW` for auto-compaction.
- `free-claude-code`: compatibility alias for `fcc-server`.

### 5\. Extending- Add OpenAI-compatible providers by extending `OpenAIChatTransport`.
- Add Anthropic Messages providers by extending `AnthropicMessagesTransport`.
- Register provider metadata in `config.provider_catalog` and factory wiring in `providers.registry`.
- Add messaging platforms by implementing the `MessagingPlatform` interface in `messaging/`.

## Contributing- [`.env.example`](/Alishahryar1/free-claude-code/blob/main/.env.example) lists env key names as a read-only reference for contributors; use the **Admin UI** to change managed proxy settings.
- Report bugs and feature requests in [Issues](https://github.com/Alishahryar1/free-claude-code/issues).
- Keep changes small and covered by focused tests.
- Do not open Docker integration PRs.
- Do not open README change PRs just open an issue for it.
- Run the full check sequence before opening a pull request.
- The syntax `except X, Y` is brought back in python 3.14 final version (not in 3.14 alpha). Keep in mind before opening PRs.

## LicenseMIT License. See [LICENSE](/Alishahryar1/free-claude-code/blob/main/LICENSE) for details.
