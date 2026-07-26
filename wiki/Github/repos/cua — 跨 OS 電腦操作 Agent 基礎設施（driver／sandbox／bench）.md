---
source: "https://github.com/trycua/cua"
author: "trycua (Cua, YC X25)"
stars: "20K+"
clipped: 2026-07-27
tags:
  - "github/repo"
  - "computer-use-agent"
  - "desktop-automation"
  - "sandbox"
  - "benchmark"
  - "mcp"
---

# cua — 跨 OS 電腦操作 Agent 基礎設施

> **trycua/cua** | ⭐ 20,640 | 🍴 1,375 | 📝 MIT
> "Scale computer-use 2.0 with open-source drivers, cross-OS fleets, and benchmarks for training, evaluation, and data generation."
> 官網：https://cua.ai ｜ YC X25

## 一句話說明

Cua 是「**讓 agent 真的去操作一台電腦**」的基礎設施——不是呼叫 API，是看螢幕、動滑鼠、打鍵盤。它把這件事拆成四個可獨立使用的產品：背景操作 driver（不搶游標焦點）、跨 OS sandbox SDK（Linux/macOS/Windows/Android 同一套 API）、benchmark／RL 環境（OSWorld、Windows Arena）、以及 Apple Silicon 上的 macOS 虛擬化 Lume。全部 MIT。

## 四條產品線

| 產品 | 做什麼 | 進入點 |
|---|---|---|
| **Cua Driver** | 在 macOS／Windows／Linux **背景**驅動原生桌面 App，不搶游標與焦點。講 MCP over stdio | `irm https://cua.ai/driver/install.ps1 \| iex`（Windows） |
| **Cua Sandbox** | 一套 API 跨 Linux 容器／Linux VM／macOS／Windows／Android，雲端或本機 QEMU 都能跑 | `pip install cua` |
| **Cua-Bench** | 在 OSWorld / ScreenSpot / Windows Arena 及自訂任務上評測 computer-use agent，可匯出軌跡當訓練資料 | `cb run dataset ... --agent cua-agent` |
| **Lume** | 用 Apple Virtualization.Framework 在 Apple Silicon 上開 macOS/Linux VM，支援 `--unattended` 離線預備 guest | `lume create macos-tahoe --ipsw ...` |

Sandbox SDK 範例：

```python
from cua import Sandbox, Image

async with Sandbox.ephemeral(Image.linux()) as sb:   # 或 .macos() .windows() .android()
    result = await sb.shell.run("echo hello")
    screenshot = await sb.screenshot()
    await sb.mouse.click(100, 200)
    await sb.keyboard.type("Hello from Cua!")
    await sb.mobile.gesture((100, 500), (100, 200))
```

## 技術架構

```
trycua/cua（monorepo, 21 種語言）
├── libs/cua-driver/     Rust 核心 → C ABI (cua_driver_*_v1) → UniFFI
│    ├── rust/           daemon + 平台 crate（X11 / Wayland / Win / macOS）
│    ├── python/         cua_driver（內嵌 binary）
│    ├── typescript/     @trycua/cua-driver
│    └── contract/       contract-first：Rust 產生 manifest，CI --check 防漂移
├── libs/python/         15 個 package：cua / agent / computer / computer-server
│                        cua-fleet / cua-sandbox / cua-train / som / mcp-server …
├── libs/cua-bench/      benchmark + RL 環境 + 任務資料集
├── libs/lume/ lumier/   Swift（Apple Virtualization.Framework）＋ Docker 式包裝
├── libs/fleet/          Go / terraform-provider-fleets，跨 OS 機群編排
├── libs/qemu-docker/ kasm/ xfce/   本機執行時
└── skills/gui-automation/  ← Agent Skill（SKILL.md + command-reference.md）
```

| 層次 | 技術 |
|---|---|
| Driver 核心 | Rust（7.5 MB）→ 版本化 C ABI → UniFFI 產 Python/TS binding |
| macOS 虛擬化 | Swift（1.4 MB）＋ Apple Virtualization.Framework |
| SDK / Agent | Python 3.11+（7.2 MB）、TypeScript（1.8 MB） |
| 機群 / IaC | Go + Terraform provider、Open Policy Agent |
| 本機執行時 | QEMU、Docker、Kasm、XFCE |
| Agent 介面 | **MCP over stdio**（`cua-driver mcp`）＋ CLI（`cua-driver call`） |

架構上值得學的一點：driver 走 **contract-first**——Rust `#[repr(C)]` 匯出產生 C header，CI 用同一指令 `--check` 比對，讓實作與發行 header 無法漂移；Python wheel 與 npm 套件都由同一份 `cua-driver-rs-v*` release artifact 組裝，`validate_release_versions.py` 直接擋 source drift。

## 對本機環境的相關性

**1. 自帶 `gui-automation` Agent Skill**（`skills/gui-automation/SKILL.md`）

觸發語意直指 QA：「test buttons, fill forms, verify visual layouts, fuzz web pages, automate user flows, take screenshots, or perform **end-to-end QA on any application**」。工作流是 **Look → Act → Verify**：

```bash
cua do screenshot          # look
cua do click 450 280       # act
cua do screenshot          # verify
cua trajectory share       # 產出可重播連結給使用者
```

目標可切 cloud VM／docker container／**本機主機**（`cua do-host-consent && cua do switch host`）。`ANTHROPIC_API_KEY` 選配——有的話 `cua do snapshot` 回傳帶元素座標的 AI 標註畫面。

**2. Claude Code 官方 MCP 註冊路徑**

```bash
claude mcp add --transport stdio cua-driver -- cua-driver mcp
```

repo 內另有 `libs/cua-driver/examples/agent-sdks/claude_agent.py|.ts` 與 `docs/.../use-claude-agent-sdk.mdx`。

**3. 能力缺口定位**

現有環境的視覺自動化只有 **playwright（瀏覽器內）** 與 pixelshot 截圖。Cua 補的是**瀏覽器以外的原生桌面 App**——這是既有工具鏈完全沒有的一塊。對 QA 職位是直球。

## 專案健康度

| 指標 | 數值 |
|---|---|
| 建立時間 | 2025-01-31 |
| 貢獻者 | f-trycua、ddupont808、jamesmurdza、sarinali、mdean808、synacktraa… |
| 近 4 週 commit | 64 / 113 / 122 / 7（高度活躍） |
| Release 節奏 | 極頻繁，各 package 獨立版本（fleet-v0.0.3、cua-driver-rs-v0.12.6、lume-v0.4.0，皆在 7/23–7/25） |
| Issue | 243 open / 308 closed |
| PR | 334 open（偏高） |
| 規模 | 3,363 檔／2,734 萬 tokens（已 `--compress` 並排除 html/svg/png/dist） |

## 已知取捨與風險

1. **安裝走 remote script pipe**：`irm https://cua.ai/driver/install.ps1 | iex`（Windows）／`curl | bash`（*nix）——供應鏈面要自己評估，可先讀腳本再跑
2. **Lume 綁 Apple Silicon**：Windows 環境完全用不到這條線
3. **雲端是商業產品**：cua.ai 需註冊／waitlist；本機路線（QEMU／Docker／host）才是免費全開源的部分
4. **Linux 背景輸入有明確限制**：README 自陳 Wayland 的 raw background input 依 compositor 而異
5. **PR 積壓 334 件**：成長速度快於 review 速度
6. **本機 host 模式＝把滑鼠鍵盤交給 agent**：`do-host-consent` 是一次性同意，風險自負

## 社群評價

- **GitHub Trending 常客**，2026-04 開源以來一週增星逾千；Trendshift 收錄
- HN 上是**分產品發**而非一次大爆：[Lume 0.2](https://news.ycombinator.com/item?id=46670181)（154 pts / 44 留言，2026-01）討論最熱，主軸是「為什麼不用 Docker」——維護者回答清楚：Docker on Mac 跑的是 Linux VM，**開不了 macOS**，要驅動 Xcode/Safari 等 macOS GUI App 只能走 Virtualization.Framework。`--unattended` 免 MDM/DEP 預備 guest 被視為實質改進
- [Cua-Bench](https://news.ycombinator.com/item?id=46768906)（40 pts）與 CuaBot（2 pts）反應平淡
- 第三方評測定位其**競品為 E2B Desktop、Daytona**；Cua 的差異點是多 OS 覆蓋（尤其 macOS）＋ bench／driver 兩塊
- 生態訊號：Qwen Code、Nous Research（Hermes agent 的 macOS computer-use skill）已整合 Cua Driver

## 相關連結

- [[Github/_index|GitHub Repo 索引]]
- 官方文件：https://cua.ai/docs ｜ Discord：https://discord.gg/mVnXXpdE85
- HN Lume 0.2：https://news.ycombinator.com/item?id=46670181
- 第三方評測：https://andrew.ooo/posts/trycua-cua-open-source-computer-use-agents/
