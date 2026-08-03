---
source: "https://github.com/microsoft/skill-recorder"
author: "microsoft (Microsoft)"
stars: "1.3K"
clipped: 2026-08-03
tags:
  - "github/repo"
  - "agent-skills"
  - "automation"
  - "electron"
  - "screen-recording"
---

# skill-recorder — 錄一次螢幕操作變成 Agent Skill 的桌面工具

> **microsoft/skill-recorder** | ⭐ 1,273 | 🍴 129 | 📝 MIT
> "Desktop app that records your on-screen work session and uses the GitHub Copilot CLI to reconstruct it as an intent + ordered steps, then builds a reusable Skill or Automation for Microsoft Scout, Microsoft Copilot Cowork, or Copilot Studio."

## 一句話說明

微軟官方的 Electron 桌面 App：你做一次工作（點擊、切視窗、開網頁、可選口述旁白），它在本機錄下事件時間軸與螢幕快照，按下 Analyze 後交給 **GitHub Copilot CLI** 重建成「一個意圖 ＋ 一串有序步驟」，你審閱編輯後一鍵產出可重用的 **Skill**（`SKILL.md`）或 **Automation**（排程／觸發）。關鍵設計是產出**優先使用 agent 的原生工具**（`gh` CLI、`web_fetch`）而非重播 UI 點擊，並從你這一個例子泛化——錄一次填表，教會 agent 填全部。目標使用者是 Copilot 生態（Scout／Cowork／Copilot Studio）的知識工作者。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,273 |
| Forks | 129 |
| 主要語言 | TypeScript（716 KB）＋ JavaScript（152 KB）＋ PowerShell（31 KB）＋ CSS／HTML／Shell／NSIS |
| 授權 | MIT |
| 建立時間 | **2026-07-29**（僅 5 天） |
| 最後推送 | 2026-08-03（當日） |
| Open Issues | 21（不含 PR） |
| Open PRs | 3 |
| 最新 Release | v0.3.1（2026-07-30） |
| Topics | agent-skills, ai-agents, automation, copilot, copilot-cli, copilot-cowork, copilot-studio, electron, microsoft-scout, screen-recording |
| 首頁 | 無（未設 homepageUrl，故跳過 defuddle） |
| 是否 Archived | 否 |

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 162 |
| 總 Tokens | 276,723 |
| 壓縮模式 | 未使用（diskUsage 5.9 MB） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| src/App.css | 18,505 | 6.7% |
| scripts/compliance.mjs | 16,829 | 6.1% |
| src/Library.tsx | 11,544 | 4.2% |
| scripts/compliance.test.mjs | 9,040 | 3.3% |
| install.ps1 | 7,166 | 2.6% |

檔案組成 105 支 `.ts` ／ 7 支 `.tsx` ／ 11 支 `.mjs` ／ 12 份 `.md`，含 **14 個 `.test.ts`／`.test.mjs`**。token 第二、四名都是**授權合規工具**（`compliance.mjs` ＋ 其測試）——這是微軟 OSS 流程的痕跡，不是功能碼。

## 核心功能

- **本機錄製**：全域快捷鍵 `Ctrl+Shift+R`／`⌘⇧R` 啟停，錄製時有 always-on-top 控制列（靜音／換麥克風／結束／捨棄）。
- **四類擷取訊號**：視窗／App 切換、瀏覽器網址、螢幕快照（1 fps 去重 ＋ 至少每 5 秒心跳）、剪貼簿短預覽。
- **可選旁白，本機轉錄**：Whisper 99 種語言，**on-device**（首次下載 ~252 MB 模型），不上傳音檔。
- **Copilot 重建**：describer 把事件時間軸還原成 intent ＋ ordered steps，可人工編輯後才進下一步。
- **雙產出**：Skill（`SKILL.md`，裝到 `~/.copilot/skills`）或 Automation（排程／觸發，裝到 `~/.copilot/automations`）；支援 Scout／Cowork／Copilot Studio 三種 target catalog。
- **原生工具優先**：builder 有 `read-tools.ts` 讀取目標 agent 的可用工具清單，產出步驟時優先映射到 `gh` CLI／`web_fetch` 這類原生工具，而不是「再點一次那個按鈕」。
- **eval 套件**：`evals/` 有 10 個合成情境（發票抽取、CRM 建檔、費用報告、**含刻意的無關岔路 `irrelevant-detour`**）對 describer 與 builder 做 fixture-based 評分。

## 技術架構

```
 ┌──────────────── Electron main ────────────────┐
 │  recorder/controller.ts（狀態機）              │
 │       ├─ collectors/                           │
 │       │    ├ windows-active-window.ts ─┐       │
 │       │    ├ windows-url-provider.ts   │ Koffi FFI
 │       │    ├ active-window.ts (mac)    ├─▶ user32.dll
 │       │    └ clipboard.ts              │   kernel32.dll
 │       │                                 └   dwmapi.dll
 │       ├─ video/recorder.ts ── 隱藏 Chromium renderer
 │       │        （MediaRecorder VP8/VP9，1fps 去重快照）
 │       └─ audio/recorder.ts ── 隱藏 renderer 用 AudioContext
 │                解 Opus/WebM → 16kHz mono → 靜音偵測
 └────────────────────┬──────────────────────────┘
                      ▼
        frames/extractor.ts（sharp 裁切去重）
        narration/whisper.ts（onnxruntime-node，本機）
                      ▼
              session-store（全程留在本機）
                      │
        ── 使用者按下 Analyze（唯一的雲端邊界）──
                      ▼
        describer/ ──▶ GitHub Copilot CLI ──▶ GitHub 雲端
                      ▼
              intent + ordered steps（人工審閱編輯）
                      ▼
        ┌─────────────┴─────────────┐
        ▼                           ▼
  skillbuilder/               automationbuilder/
  → SKILL.md                  → 排程／觸發設定
  → ~/.copilot/skills         → ~/.copilot/automations
```

| 層次 | 技術 |
|------|------|
| 殼層 | Electron 43 ＋ TypeScript ＋ Vite／Rolldown ＋ Lightning CSS |
| Windows 原生 | **Koffi FFI** 直呼 `user32`／`kernel32`／`dwmapi`（不依賴 `get-windows` prebuild） |
| Windows 網址擷取 | **UI Automation**，因 UIA 組件只可靠存在於 **Windows PowerShell 5.1**，故用常駐 `powershell.exe` host process（載入 UIA 一次，之後每行 stdin 回一行 stdout） |
| 影音 | 全部走 Chromium：`MediaRecorder` 錄影、`AudioContext` 解碼——**已刻意移除 ffmpeg-static** |
| 影像處理 | sharp / libvips（`@img/sharp-win32-*`） |
| 語音 | Whisper via `onnxruntime-node`（x64 與 ARM64 payload 同包） |
| LLM | GitHub Copilot CLI（`@github/copilot-win32-*`，隨 App 附帶，不需全域安裝） |

**架構上最值得注意的三件事**（讀原始碼得到，README 沒說或說反了）：

1. **README 說瀏覽器網址擷取是「(macOS)」，但 Windows 實作是存在的**——`windows-url-provider.ts` 用 UIA 讀前景視窗的網址列 Edit control，並且刻意剪掉 `Document` 子樹避免下探整個網頁 accessibility tree。註解明寫「UIA 只在 PowerShell 5.1 可靠、PS7 不一定」——這正是本地 CLAUDE.local.md 記過的同一個坑（PS 5.1 vs pwsh 7 行為不同）。
2. **ARM64 能裝的原因是砍掉 ffmpeg**：`ffmpeg-static` 的 postinstall 沒有 Windows ARM64 binary，他們把它從 package.json、lockfile、Vite externals、electron-builder 規則整條移除，改用 Chromium 既有能力。這是「移除相依而非增加分支」的乾淨解法。
3. **`recording-privacy.ts` 只有 12 行**——一個 app-lifetime 的「是否已看過警告」旗標，程序重啟就重置。隱私保護的實質是那句警告文字，不是任何技術機制。

## 供應鏈與安全檢查

| 檢查 | 結果 | 證據 |
|------|------|------|
| 遙測／分析 | **無** | 全 repo 只有一句註解 `"Replaced/extended when telemetry lands"`——目前零遙測，但**明示未來會加** |
| 安裝方式 | `curl \| bash`／`irm \| iex`，**但釘死 40 字元 commit** | 腳本 URL 與所建原始碼同綁一個 commit hash |
| 下載完整性 | **有 checksum 驗證** | Node.js 走官方 `SHASUMS256`（regex 比對 64 hex）；Electron 比對 `checksums.json` 且再對「reviewed distribution hash」，不符即 throw |
| 危險執行 | 無異常 | 唯一 `powershell.exe` 常駐 host 是 UIA 讀取器，職責單一 |
| Repomix 安全掃描 | ✔ No suspicious files detected | 162 檔全掃 |
| Dependabot | **積極處理中** | 08-02 一次修 14 個告警（tar／adm-zip／fast-uri），08-03 升 sharp 0.35.3 並補 libvips 合規審查 |

⚠️ **真正的風險面是資料流向，不是程式碼**：錄製全程本機，但按下 **Analyze 就把事件時間軸（視窗／文件標題、URL、剪貼簿預覽）＋ 擷取的螢幕影像 ＋ 旁白文字送到 GitHub 雲端**。README 有明確警語且 App 每次錄製前都提醒——但程式層沒有任何遮罩、遮蔽或敏感詞攔截，防護完全靠使用者自律。

**微軟自己公開的缺陷清單**（罕見的透明度，21 個 open issue 裡多數是他們自填的 code audit 結果，附嚴重度／位置／機制／建議修法／回歸測試）：

- **[High] #8 Skill 安裝可以擴大 `allowed-tools`，超出人類核准的範圍** —— `builder.ts:181` 的註解宣稱「agent 只能收緊、不能低於 plan 宣告」，但**沒有任何程式碼強制這個不變量**。LLM 回傳的 `submission.allowedTools` 非空時就原樣寫進 `SKILL.md` frontmatter，可以加進審閱者從沒批准的工具（例如 shell／網路）。這是**繞過 human-in-the-loop 的權限提升**，而 skillbuilder 目前完全沒有單元測試。
- **[High] #9** recorder 狀態機在 finalize／start I/O 失敗時卡死在 `stopping`／`starting`。
- **[High] #7** 未處理的 write-stream `error` 可在錄製中讓 main process 崩潰。
- **[Medium] #16** Whisper 模型快取只檢查「檔案存在」，下載中斷的殘檔會被判定 ready → 對截斷模型做轉錄。
- **[Medium] #14** ffmpeg 抽幀呼叫無 timeout；**#10** 音訊解碼把整個檔案載進記憶體（可達 ~1 GiB）。

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 3 人（`GiorgioUghini` 37、`adilei` 30、`adilei-powerapps` 9） | 小而集中的微軟內部團隊 |
| Release | 5 個（v0.1.0 ~ v0.3.1，全在 07-29～07-30 兩天內） | 初始爆發期 |
| 最後推送 | 當日 | **極活躍** |
| PR | 開 3；近期 merge 頻繁（#30／#31／#34／#36 皆已併） | 維護回應快 |
| Issues | 21 open，多為自填的 audit 項目 | 品質透明 |
| Watchers | 5 | star:watcher 約 255:1，依實測基準（42:1~2413:1）屬正常，不構成訊號 |

`default_branch = main`，無孤兒分支。**專案只有 5 天大**——所有健康度指標都還在初始期，唯一能確定的是團隊當下在積極推進（每日 commit、當日修 Dependabot）。

## 社群口碑

WebSearch 未找到任何第三方評測、部落格或論壇討論——專案 07-29 才建立，尚無外部聲量。1,273 顆星在 5 天內累積，主要來自 `microsoft/` 命名空間本身的曝光效應。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低。不是知識庫型專案。 |
| **Claude Code** | **中——概念相關，生態不相容**。它產出的是 `SKILL.md`，格式與 Claude Skill 高度相似，理論上錄一次操作 → 產出 SKILL.md → 手動搬進 `C:\Users\sanyo\.claude\skills\`。但整條管線綁 **GitHub Copilot CLI ＋ Copilot 訂閱**，target catalog 是 Scout／Cowork／Copilot Studio，沒有 Claude target。issue #8（allowed-tools 可被 LLM 擴權）對任何 skill 生態都是必讀的警示案例。 |
| **Automation** | 中。「錄一次操作 → 泛化成可重用程序」正面回應既有 skill 建立流程的痛點（現行 SOP 是逐字讀來源檔＋三位置同步，全手工）。但它產的是 Copilot Automation，不接 Windows Task Scheduler 或既有 `scripts/` 機制層。 |

## 安裝建議

⏳ 觀望

理由：工程品質明顯是微軟正規流程（checksum 驗證的安裝腳本、Windows x64／ARM64 雙 CI 閘、14 個測試檔、10 個 eval 情境含刻意的無關岔路、授權合規工具佔 token 第二名、當日修 Dependabot），Windows 支援不是敷衍——Koffi 直呼 Win32、UIA 網址擷取、為了 ARM64 整條移除 ffmpeg。**但現在裝有三個明確阻礙**：

1. **生態不對**：整條管線要 GitHub Copilot 訂閱，產物裝進 `~/.copilot/`，沒有 Claude Code target。對本機工作流是「產 SKILL.md 後手動搬家」，不是接上去就能用。
2. **5 天大的專案，且維護者自己標了三個 High**：其中 #8 是 skill 安裝可繞過人類核准擴大 `allowed-tools`——正好打在「用它產 skill」這個核心用途上，且 skillbuilder 零單元測試。
3. **資料流向**：Analyze 會把螢幕影像、視窗標題、URL、剪貼簿預覽送上 GitHub 雲端，程式層無遮罩機制。錄工作畫面等於把畫面內容交出去。

**升級條件（→ ✅ 裝）**：issue #8 修掉且 skillbuilder 補上 subset 不變量的單元測試；**或**上游加入「generic agent」target（issue #19 已在規劃，明寫「不知道特定內部工具」的通用架構）——那條一旦落地，產物就能直接餵 Claude Code；**或**你開始用 Copilot 生態。

**放棄條件（→ ❌ 不裝）**：遙測落地且無法關閉（原始碼已預告會加）；或三個 High 級 issue 三個月內未處理（代表這是 demo 專案不是產品）；或目標架構始終寫死在 Copilot 三件套、`generic agent` 提案被關閉。

**📌 可單獨抽取**（不裝也有價值）：

- **issue #8 本身就是一份 skill 生態的威脅模型範例**——「人類批准 plan → LLM 回傳 submission → 沒人檢查 submission ⊆ plan」這個模式，在任何「agent 產生 agent 設定」的流程都會出現。對照本地 skill 安裝 SOP：逐字讀來源檔正是防這件事，但目前也沒有任何機械檢查。
- **`evals/scenarios/irrelevant-detour.ts`**：eval 情境刻意包含無關岔路，測的是「模型會不會把雜訊寫進步驟」——比只測 happy path 誠實得多。
- **install.ps1 的 checksum 流程**：`curl | bash` 型安裝要怎麼做才不算裸奔的範本（釘 commit ＋ 官方 SHASUMS ＋ 二次比對 reviewed hash）。

## 相關連結

- [[video-use — 用 Coding Agent 剪影片的 Claude Skill|video-use]] — 同為「產出 SKILL.md 交給 agent 執行」的思路，但規則手寫而非錄製推導
- [[antigravity-awesome-skills]] — Skill 生態的另一端：現成 skill 集散地
- [[Github/_index|Github 索引]]
