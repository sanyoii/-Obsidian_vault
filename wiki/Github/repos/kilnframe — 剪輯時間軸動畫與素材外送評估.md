---
source: "https://github.com/erhanmeydan/kilnframe"
author: "erhanmeydan"
stars: "16"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "video"
  - "hyperframes"
---

# kilnframe — 剪輯時間軸動畫與素材外送評估

## 一句話說明

Kilnframe 把剪輯軟體片段交給本機轉錄、AI 場景製作、逐場預覽與 HyperFrames render，再放回時間軸。⏳ 先收藏；有 Premiere／Resolve Studio 時間軸接線需求時才值得獨立試用，現在不安裝。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Stars / Forks / Issue | 公開 HTML16 / 1 / 1 |
| 主要語言 | TypeScript，pnpm monorepo |
| 授權 | 本體 Apache-2.0；installer依賴各自授權 |
| 固定 SHA | 3ec92107c9a49225949a23c069e22e3856f6e933，main |
| package | private、Node>=24、pnpm11.10.0；core0.0.0不是正式release承諾 |
| HyperFrames pin | 0.8.133 |
| HTML commits | 117 |
| 精確建立／push／release／人力 | API限流，本輪未確認 |
| 相容宣告 | Premiere2026／25.6+、Resolve Studio21.1+與GPU；本機未驗 |

[固定來源](https://github.com/erhanmeydan/kilnframe/tree/3ec92107c9a49225949a23c069e22e3856f6e933)、[package](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/package.json)、[core](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/core/package.json)。

## Repomix 深度分析

Repomix1.18.1、XML、未compress、--no-gitignore：392檔、622,201tokens、2,222,347字元；來源593檔。掃描器未偵測可疑檔案，不代表installer與影片runtime已驗。

| Top5 | Tokens | 佔比 |
|---|---:|---:|
| packages/panel/src/app.ts | 39,152 | 6.3% |
| site/tr/index.html | 10,632 | 1.7% |
| site/index.html | 9,872 | 1.6% |
| examples/golden/kil-lacivert/scenes/s1.html | 8,962 | 1.4% |
| examples/golden/kolaj-halftone/scenes/s1.html | 8,958 | 1.4% |

## 核心功能

Premiere UXP／Resolve panel、本機companion、Whisper轉錄與語音對齊、plan／compose／review、逐場核准、HyperFrames＋Chrome＋FFmpeg渲染、SFX與可選Lyria音樂、時間軸回填。場景finding可定位局部重修；功能存在不代表視覺品質已通過。

真正補的是剪輯時間軸入口，不是新的frontend／QA Skill。現有HyperFrames能力與其render路徑重疊。[stages](https://github.com/erhanmeydan/kilnframe/tree/3ec92107c9a49225949a23c069e22e3856f6e933/packages/core/src/stages)。

## 技術架構

```text
Premiere/Resolve panel -> loopback WebSocket companion
    -> worker/job -> transcribe/plan/compose/review
    -> per-scene approval -> HyperFrames/Chrome/FFmpeg
    -> SFX/optional cloud music -> timeline
Electron app -> companion/plugin/login-start/update管理
```

### 素材與模型服務

原始音影在本機轉錄與渲染；**雲端模式仍送逐字稿、文字與畫面／資產預覽給模型服務**。compose.ts:184–215加入style stills、asset previews及footage frame.preview；Anthropic與OpenAI-compatible adapter把image轉API payload。因此README「音影不離開本機」不能解讀成所有素材不外傳。LM Studio路線與音樂endpoint也需各自核對，不能稱air-gapped。[compose](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/core/src/stages/compose.ts)、[Anthropic payload](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/core/src/providers/anthropic.ts)、[音樂request](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/core/src/music/index.ts)。

### 本機權限與依賴

companion listen loopback，client需5秒內hello+token，用timingSafeEqual。Keys走OS keyring，但本次未驗keychain／Windows Credential Manager。Codex adapter使用exec --sandbox read-only；Claude Code adapter限制Read與MCP，沒看到危險sandbox bypass。[server](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/companion/src/server.ts)、[Codex adapter](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/core/src/providers/codex.ts)。

Electron首次啟動會setOpenAtLogin(true)，也可安裝／更新剪輯外掛；不是單純讀素材。Updates設定autoDownload=false與autoInstallOnQuit=false，按鈕才下載，不應描述為靜默自動安裝。第一次Whisper model約1GB；Chrome、FFmpeg、GPU與剪輯軟體都要另核對。本輪沒有啟動或修改登入設定。[app](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/app/src/main.ts)、[updates](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/packages/app/src/updates.ts)。

NOTICE列HyperFrames衍生prompts與FFmpeg、fonts、libvips、Chrome、GSAP等不同授權；不能把整個installer所有元件叫Apache2。部分NOTICE版本與package pin有落差，版本以鎖定來源為準。[NOTICE](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/NOTICE)。

## 社群健康度與CI

Stars16，沒有啟動大型口碑調查，採用率與成熟度資料不足。Windows workflow是manual，配置Node24、frozen pnpm、Chrome/FFmpeg下載、build/test及installer；未確認實際run成功。Unsigned Windows installer也是限制，沒有操作或繞過系統檢查。[workflow](https://github.com/erhanmeydan/kilnframe/blob/3ec92107c9a49225949a23c069e22e3856f6e933/.github/workflows/windows.yml)。

## 本機驗證

593來源檔盤點，沒有Python檔。抽取原始isLoopbackAddress，僅剝除TypeScript型別再用Node執行六案例：三種明確loopback為true；0.0.0.0、私有IP、localhost字串為false。只驗此函式，未驗WebSocket auth或整套服務。

未安裝依賴、未跑typecheck/build/test、未調LLM、未render、未操作Premiere／Resolve或真人驗收。證據：work/repo-intel/kilnframe-20261014/的fixed-source.json、inventory.json、repomix.log、repomix.xml、offline_probe.cjs、offline-results.json。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 收藏剪輯接線與資料外送界線 |
| Codex | CLI adapter不是已驗桌面接線，未共享或改模型設定 |
| HyperFrames | 核心製作/render重疊，新增價值是NLE時間軸 |
| QA／Automation | 有局部repair與核准設計，未證實輸出品質或自動化省時 |

## 安裝建議

**⏳ 先收藏，不安裝。** 確認有相容剪輯軟體與時間軸自動加動畫需求後，再用非敏感素材、明確provider與隔離專案試驗，分開驗資料外送、登入啟動、render和時間軸回填。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
