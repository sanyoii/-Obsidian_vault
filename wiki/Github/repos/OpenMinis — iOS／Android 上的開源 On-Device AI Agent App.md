---
source: "https://github.com/OpenMinis/OpenMinis"
author: "OpenMinis (wsvn53，單人維護的組織帳號)"
stars: "1.4K"
clipped: 2026-07-27
tags:
  - "github/repo"
  - "ai-agent"
  - "mobile"
  - "ios"
  - "android"
  - "claude-skills"
  - "on-device"
---

# OpenMinis — iOS／Android 上的開源 On-Device AI Agent App

> **OpenMinis/OpenMinis** | ⭐ 1,379 | 🍴 139 | 📝 GPL-3.0
> "OpenMinis — The AI Agent app across platforms. Fully free and open source."

---

## 一句話說明

OpenMinis（App 名稱 **Minis**／App Store 上架名 **Open Minis**）是一款 iOS + Android 原生 AI Agent App：它讓你自帶 API Key 接 Claude／GPT／Gemini，然後**在手機上給這個 agent 一台真正的電腦**——一個跑在 App 進程內的沙箱化 Alpine Linux（iOS 用 iSH ARM64 fork，Android 用 PRoot），外加 60+ 個原生系統橋接（HealthKit／Calendar／Reminders／HomeKit／NFC／藍牙／Vision OCR／語音）、瀏覽器自動化、SKILL.md 技能系統與跨 session 記憶。目標使用者是「想把 Claude Code 那套 agent 體驗搬到手機上、且不願把資料交給雲端 agent 服務」的重度使用者。

**⚠️ 讀這份 repo 前必須知道的事**：這個 repo 從 2026-04-25 建立到 2026-07-25 為止的三個月，**只是一個 README + issue tracker 的空殼**（前 8 個 commit 全是改 README／issue template）。1,379 顆星是 App 本身的人氣累積，不是程式碼的。真正的原始碼是 2026-07-25 用**單一 commit** 一次性倒出來的。而且 README 與 CONTRIBUTING 都明講：**這是私有開發樹的鏡像，不接受 Pull Request**（2026-07-25 的 commit `docs: state that this mirror does not accept pull requests` 專門為此而寫）。所以它是「原始碼可讀、可自建、可 fork」的開源，但**不是協作式開源**。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,379 |
| Forks | 139 |
| 主要語言 | Swift 8.9MB／Kotlin 7.1MB／Objective-C 1.05MB／Python 167KB／C++ 85KB |
| 授權 | **GPL-3.0**（因連結 iSH GPLv3 + PRoot GPLv2，combined work 必須 GPLv3） |
| 建立時間 | 2026-04-25 |
| 原始碼首次公開 | **2026-07-25**（僅 2 天前） |
| 最後推送 | 2026-07-25 |
| Open Issues | 33（已關閉 issue 60 個） |
| PR 總數 | 2（且明文拒收外部 PR） |
| 貢獻者 | **1 人**（wsvn53，6 個 commit） |
| 最新 Release | `0.20-preview`（2026-07-13） |
| Topics | 無 |
| 首頁 | https://openminis.app |
| 是否 Archived | 否 |

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 1,466 |
| 總 Tokens | 13,413,027 |
| 壓縮模式 | `--compress` + 排除圖片／dist／node_modules／xcassets |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `src/android/.../assets/jieba/jieba.dict.utf8` | 2,479,351 | 18.5% |
| `src/ios/Resources/jieba.dict.utf8` | 2,479,351 | 18.5% |
| `src/ios/Shared/cl100k_base.tiktoken` | 1,057,979 | 7.9% |
| `src/android/.../assets/models-dev-api.json` | 884,704 | 6.6% |
| `src/ios/Resources/models-dev-api.json` | 884,704 | 6.6% |

**觀察**：Top 5 有 58% 是**資料檔而非程式碼**（中文斷詞辭典 cppjieba、tiktoken 詞表、models.dev 模型目錄），且 iOS／Android 各存一份完全相同的副本——這是刻意的雙平台獨立打包策略，不是重複程式碼。真正的程式碼分佈：`src/android` 547 檔、`src/ios` 539 檔、`deps/lame-3.100` 345 檔（vendored 第三方）。

檔案分佈說明兩件事：①**兩個平台是各自獨立實作的**（Swift 一套、Kotlin 一套，共用的只有 `src/shared/` 3 個檔案：bashism 偵測規則 JSON + 測試向量）；②repomix 的 security check 乾淨，無外洩憑證。

---

## 核心功能

- **自帶模型（BYOK）**：Anthropic（Claude Opus 4.6／Sonnet 4.6／Haiku 4.5）、OpenAI、Google Gemini、OpenRouter、xAI、Antigravity、Mistral、Venice.ai 等。原始碼可見 `provider/{anthropic,openai,gemini,openrouter,xai,antigravity}/` 各自獨立實作。除 API Key 外也支援 Claude OAuth 登入（但 OAuth 相關值屬 build-time 注入，開源版只給 `.example` 樣板，**自建版的 Claude OAuth 登入不可用**，API Key 路徑不受影響）。
- **裝置內 Linux 沙箱**：iOS 端用 iSH ARM64 fork（Asbestos threaded-code JIT 直譯器、SQLite-based fakefs、100+ syscall、完整 TCP/UDP/DNS 網路），Android 端用 PRoot ptrace chroot。agent 可以 `apk add` 裝套件、跑腳本、操作真實檔案。
- **60+ 原生 offload**：`src/ios/NativeOffloads/` 有 HealthKit／HomeKit／Calendar／Reminders／Photos／Media／Player／NFC／Bluetooth／Location／Maps／Weather／Vision（OCR）／NLP／Speech／Speak（TTS）／Clipboard／Alarm／Notification／FFmpeg 等，把重活丟給原生框架而不是沙箱。
- **瀏覽器自動化**：`Agent/BrowserUse/` 有 tab pool、cookie 稽核記錄器與 cookie 備份、JS 注入操作。
- **Skills 系統（本環境最相關）**：一個 skill 就是含 `SKILL.md` 的資料夾，metadata 常駐 context 做觸發、body 與資源按需載入——**與 Claude Code 的 skill 模型同構**。原始碼 `SkillRepository.kt` 可見實作細節：SQLite 存 metadata、`minis-global/skills/<id>/SKILL.md` 存內容、`MAX_SKILLS_IN_PROMPT = 20`（system prompt 內最多注入 20 個 skill）、`MAX_SKILL_DESC_LENGTH = 200`、7 天近用視窗做排序、session-level override 表。README 宣稱「為 Claude／Codex／OpenClaw／Hermes Agent 寫的 skill 一般可直接在 Minis 跑」。
- **MCP 支援**：Android／iOS 皆有 `MCPStore`／`MCPRepository` 與完整 OAuth PKCE 流程（`McpPkce.kt`／`MCPOAuthController`），另在沙箱內附一支 Python 寫的 `minis-mcp-cli`（stdio + http transport + daemon）。
- **Workspaces 與 URL scheme**：`minis://workspace/`、`minis://attachments/`、`minis://browser/`、`minis://offloads/`。
- **iOS 系統整合**：App Intents（12 個 Intent：AskMinis／QuickTask／FollowUpSession／SessionStatus／Retry…）可被 Shortcuts 驅動、Share Extension、FileProvider、Widget、Live Activity。
- **iCloud／區網同步**：`Agent/Sync/V2/` 有自製同步引擎（CloudKit shared zone + LAN transport + tombstone + migration engine）。
- **繁中在地化**：`zh-Hant.lproj` 存在（另有 zh-Hans／ja／ko／fr／de）。

---

## 技術架構

```
┌──────────────────────────────────────────────────────────┐
│  UI 層     iOS: SwiftUI (Views/)   Android: Compose      │
├──────────────────────────────────────────────────────────┤
│  Agent 迴圈  AIChatViewModel(+18 個 extension)            │
│    ToolDefinitions / ToolPreflight / ConcurrentTools     │
│    Compaction(context 壓縮) / Fallback / RequestBudget   │
│    ToolLoopDetector(迴圈偵測) / ContextPolicy            │
├───────────────┬───────────────┬──────────────────────────┤
│  Skills       │  MCP          │  Memory / Soul           │
│  SkillStore   │  MCPStore     │  MemoryRepository        │
│  (SQLite+md)  │  +OAuth PKCE  │  SoulStore               │
├───────────────┴───────────────┴──────────────────────────┤
│  能力層                                                   │
│   ├─ Linux 沙箱   iOS: iSH(ARM64/Asbestos JIT/fakefs)     │
│   │                Android: PRoot(ptrace chroot)+talloc   │
│   │                共用 Alpine minirootfs                 │
│   ├─ Native Offloads (60+ .m/.h → iOS 框架)               │
│   ├─ BrowserUse (WKWebView tab pool + JS 注入)            │
│   └─ Providers (Anthropic/OpenAI/Gemini/OpenRouter/xAI…)  │
├──────────────────────────────────────────────────────────┤
│  Bashism Detector（共用層，唯一雙平台共用的邏輯）           │
│   偵測 agent 寫出 Alpine ash 不支援的 bash 語法並提醒      │
└──────────────────────────────────────────────────────────┘
```

| 層次 | 技術 |
|------|------|
| iOS App | Swift / SwiftUI / Objective-C（offload 橋接）/ App Intents |
| Android App | Kotlin / Jetpack Compose / JNI |
| 沙箱（iOS） | iSH ARM64 fork（Meson 交叉編譯，`libish.a`／`libish_emu.a`／`libfakefs.a`），iOS 14.0+ |
| 沙箱（Android） | PRoot fork + talloc，NDK r28+ |
| 媒體 | FFmpeg（LGPL 配置）+ LAME，皆從原始碼建置 |
| 文字 | cppjieba（中文斷詞）、KaTeX、swift-cmark／SwiftMath |
| 同步 | CloudKit shared zone + 自製 LAN transport + CRDT-ish tombstone |
| 建置 | Xcode（iOS）／Gradle（Android）+ 6 支 shell 建置腳本 |

**值得注意的工程決策**：原生相依全部**從原始碼建置而非提交二進位檔**——commit message 明說理由是「提交的 binary 會把建置機的路徑帶進 debug symbol」。這代表首次建置要跑 `build_lame.sh → build_ffmpeg.sh → build_ish.sh → prepare_alpine_rootfs.sh`（順序有依賴），成本不低。

另一個少見的設計是 **BashismDetector**：因為 Alpine 用的是 ash 而非 bash，agent 很容易寫出跑不動的 bash-ism，所以他們做了規則表（`bashism_rules.json` + 測試向量）在執行前偵測並回饋給模型。這是「LLM 產生的 shell script 在受限 shell 上失敗」這類問題的具體工程解，值得單獨參考。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | **1 人**（wsvn53） | 單點風險極高 |
| GitHub 上的 commit 數 | 10（含 2 個 merge） | 這是鏡像，**不反映真實開發量** |
| Release 頻率 | 0.11→0.15→0.17→0.18→0.19→0.20-preview（6/9 至 7/13） | 約 1–2 週一版，**產品端很勤** |
| Issue open/closed | 33 / 60 | 回應率尚可，但多數 issue 零留言 |
| 接受外部 PR | ❌ 明文拒收 | 貢獻只能走 issue／AwesomeMinis／MinisSkills |
| 版本狀態 | 全部標 `-preview`，尚無 1.0 | 產品仍在 beta |

**周邊生態**（同組織）：`MinisSkills` 317⭐（40+ skill，7/26 仍在更新）、`AwesomeMinis` 106⭐（用例集，但**5/30 後停更**）、`ish-arm64` 163⭐、`proot` 3⭐。

從 open issue 標題可看出真實的品質狀況（這些是使用者實際踩到的）：iSH 容器重新佈署會讓 shell 檔案系統與 App 端儲存**靜默失步**、雙裝置 iCloud 同步合併會**孤兒化 model group 並清空設定稽核記錄**、沙箱暫存檔從不清理、iPadOS 終端機缺 python/pip/ffmpeg。也就是說：**沙箱與同步這兩個最複雜的子系統目前都有已知的資料完整性問題**。

---

## 社群口碑

> ⚠️ **來源說明（誠實標注）**：Exa／mcporter 本環境已知失效，改用 WebSearch tool；小紅書 `opencli` 回 `AUTH_REQUIRED`（登入牆）跳過；defuddle 依既知失效直接走 Jina Reader 備援抓官網。以下多為**媒體評論與 App Store 評價轉述**，非本人實測。

**媒體評論（一手可查）：**
- **MacStories**（Federico Viticci，2026-07）：「the most impressive indie app I've seen in a while」，形容它是「把 Claude Code 和 OpenClaw 揉成一個為 Apple 使用者設計的直覺 agent 體驗」。這是本專案最有份量的一則背書。
- **知乎**（Ye Han，2026-06）：「在很大程度上實現甚至局部超越了 Apple Intelligence」。
- **小眾軟體 Appinn**（2026-03）：「可能是 iOS 端最強 AI Agent」。

**Hacker News**：僅 1 則相關 story（MacStories 那篇轉貼），**7 分、0 留言**。HN 圈子基本沒有討論——這與媒體熱度形成明顯落差。

**Reddit／X**：WebSearch 未找到成規模的專門討論串；找到的正面評價來自 App Store 評論轉述（「試過幾乎所有 iOS 上的開源與付費 AI 推論客戶端與 agent harness，這是我遇過最好的」）。**未能取得原始 Reddit thread 佐證，此條可信度標為低。**

**YouTube 教學訊號**：`yt-dlp ytsearch5 "Open Minis iOS agent"` 回傳的 5 支影片**全部是 OpenClaw 相關內容**（Fireship 201 萬觀看那支等），無一支關於 Open Minis。結論：**YouTube 教學生態為零**。

**整體判讀**：媒體評價高、但社群深度討論薄。星數三個月累積到 1.4K 對一款獨立 App 是好成績，但**這些星大多是給 App 的，不是給程式碼的**（原始碼才公開 2 天）。

---

## 與現有系統的相關性評估

### 先確定它是什麼

**它是一款手機 App 的原始碼，不是可安裝到桌面工作流的工具。** 沒有 CLI、沒有可掛載的 MCP server、沒有 plugin marketplace 入口、沒有能複製到 `~/.claude/skills/` 的東西。對 Windows 11 + Claude Code 的桌面環境，這個 repo 的**直接功能增量是零**。

| 面向 | 評估 |
|------|------|
| **Windows 可用性** | ❌ **完全不可用**。iOS 端需 macOS + Xcode，Android 端需 NDK r28+ 與 Gradle（技術上 Windows 可建 APK，但要先跑 `build_proot.sh` 這支 shell 腳本，實務上得走 WSL）。且產物是手機 App，不是桌面程式。 |
| **Claude Code 接口** | ❌ 無 MCP server、無 plugin、無可取用 skill。它**自己是** MCP client 與 skill host，不是被掛載的一方。 |
| **Skills 生態** | ⚠️ **唯一真正的交集**：Minis 的 skill 格式與 Claude skill 同構（SKILL.md + 資料夾 + 按需載入）。本環境的 124 個 skill 理論上可直接丟進手機跑；反向地，`MinisSkills`（317⭐、40+ skill）裡有幾個是 Claude Code 沒有的類別（TTS、抖音／推特下載、股票資金流、Notion／Telegram hub）。**但這是「內容可互通」，不是「系統可整合」。** |
| **Obsidian Vault** | ⚠️ README 有「掛載 Obsidian vault 當 workspace」的用例——但本環境的 vault 在 `d:\Claude\obsidian\`（Windows 本機、且是 public git repo）。要讓手機 agent 讀寫，得先解決同步（Obsidian Sync／iCloud／Git）與**public repo 的個資風險**。實務上不成立。 |
| **Automation** | ⚠️ iOS Shortcuts + App Intents 可做「早上鬧鐘唸摘要」這類自動化，與現有 Windows Task Scheduler 排程（social-monitor、portable-bundle）**完全平行、無交集**。 |
| **與已評估專案的關係** | 與 cua（跨 OS 電腦操作 agent）**不重疊**：cua 操作桌面／VM，Minis 操作手機與手機沙箱。與 CowAgent（IM 常駐 agent harness）**部分重疊但形態不同**：兩者都是「另一個腦」，Minis 是手機端 GUI App，CowAgent 是伺服器端 IM bot。與 bento／addyosmani skills／antigravity skills 這類 skill 集**不同物種**——那些是內容，這是 host。 |
| **搶觸發風險** | ❌ 無。它不進 Claude Code 的 skill 清單，不會影響任何觸發。 |
| **授權** | ✅ **GPL-3.0，LICENSE 檔存在，且 `THIRD_PARTY_LICENSES.md` 逐項列出版本與條款**——這是本輪掃過的 repo 裡授權處理最嚴謹的一個。但要注意 GPLv3 的傳染性：任何 fork 或衍生的 App **都必須開源**，這排除了拿它當閉源產品基礎的可能。 |

---

## 安裝建議

### ⏳ 觀望（分兩件事看）

**repo 本身 → ❌ 不裝、不 clone。** 對 Windows 桌面工作流零增量，13.4M token 的原始碼裡沒有可搬走的元件（Swift／Kotlin／Objective-C 全是平台綁定）。GPLv3 也讓「抄一段進自己專案」變得要小心。要 clone 的唯一理由是想自建 App，而那需要 Mac + Xcode。

**App 本身 → ⏳ 觀望（若你有 iPhone，這是本輪最值得實際試用的一個）。** 理由：它是目前唯一一個「能原封不動跑你既有 Claude skill 的手機 agent」。從 App Store 或 TestFlight 裝、填 Anthropic API Key，30 分鐘內就能驗證「我的 skill 在手機上跑得動嗎」這個問題——這個問題的答案對「AI 工作流不綁在桌機前」有實質價值。成本只有 API token。

**現在判 ⏳ 而不是 ✅ 的原因**：①原始碼才公開 2 天，`0.20-preview` 尚無 1.0；②open issue 裡沙箱失步與 iCloud 同步資料損毀是**兩個資料完整性等級的已知 bug**，不適合放重要資料；③單人維護、拒收 PR、AwesomeMinis 已停更近兩個月，bus factor = 1；④社群深度驗證薄（HN 7 分 0 留言、YouTube 教學為零），現有正評高度集中在少數媒體與 App Store 評論。

**升級條件（→ ✅ 實際採用）**：滿足任一即回頭
- 發出 **1.0 正式版**（脫離 `-preview`），且 #99（iSH 容器失步）與 #98（iCloud 同步資料損毀）兩張 issue 關閉
- 你實測把本環境任一既有 skill（如 `repo-intel` 或 `jane-finance`）丟進 Minis 能正常觸發並執行 — 「skill 跨 host 可攜」一旦被自己驗證，價值就從推測變事實
- 出現第二位實質貢獻者，或 repo 改為接受 PR

**放棄條件（→ ❌ 淘汰）**：滿足任一即結案不再追
- 三個月內（至 2026-10 底）無新 release，或 GitHub 鏡像停止跟隨私有樹更新
- 你三個月內沒有為它填任何 API Key —— 代表「手機 agent」在你的工作流裡沒有真實需求，不需要再花注意力
- 出現 App Store 下架、或 GPLv3 合規爭議（連結 iSH／PRoot 的授權結構若被上游質疑，可能影響 App 存續）

**📌 可單獨抽取的東西**（不裝也值得看一眼）：
- `src/shared/bashism/bashism_rules.json` + `bashism_test_vectors.json` — 「偵測 LLM 產生的 shell script 用了目標 shell 不支援的語法」的可運行規則表，這個問題在本環境（git-bash vs PowerShell vs pwsh 混用）同樣存在
- `2026-07-25` 那則 open-source commit message — 是「把私有專案開源時該交代什麼」的優秀範本（授權推導、為何不提交 binary、build-time 注入怎麼處理、什麼刻意沒公開、如何驗證能建置）
- `docs/specs/ios-sandbox-ish-summary.md` — iSH 在 App 內跑 Linux 的完整能力邊界，寫得比 iSH 官方文件清楚

---

## 相關連結

- [[Github/repos/cua — 跨 OS 電腦操作 Agent 基礎設施（driver／sandbox／bench）|cua]] — 桌面／VM 端的對照組
- [[Github/repos/CowAgent — chatgpt-on-wechat 改名後的開源個人 Agent Harness|CowAgent]] — 另一種「第二個腦」形態
- 官網：https://openminis.app ｜ Skills：https://github.com/OpenMinis/MinisSkills ｜ 用例：https://github.com/OpenMinis/AwesomeMinis
