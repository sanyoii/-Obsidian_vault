---
source: "https://github.com/browser-use/video-use"
author: "browser-use (Browser Use)"
stars: "18.7K"
clipped: 2026-08-03
tags:
  - "github/repo"
  - "claude-skill"
  - "video-editing"
  - "ffmpeg"
  - "agent"
---

# video-use — 用 Coding Agent 剪影片的 Claude Skill

> **browser-use/video-use** | ⭐ 18,698 | 🍴 2,331 | 📝 MIT
> "Edit videos with coding agents"

## 一句話說明

這是 browser-use 團隊出的一個 Claude Code Skill（32 個檔案、無 GUI、無 timeline）：把一資料夾的原始素材丟給 agent，用對話描述你要什麼，它產出 `edit/final.mp4`。核心主張是「**LLM 不看影片，它讀影片**」——用 ElevenLabs Scribe 拿到詞級時間戳的逐字稿當主要閱讀面，只在決策點才生成視覺合成圖，把 30,000 幀 × 1,500 tokens ≈ 45M tokens 的雜訊壓成 12KB 文字。目標使用者是已經在用 Claude Code／Codex、要剪 talking head／教學／montage 的創作者。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 18,698 |
| Forks | 2,331 |
| 主要語言 | Python（66 KB）＋ HTML（20 KB）＋ Shell |
| 授權 | MIT（2026-05-10 才補上，PR #32） |
| 建立時間 | 2026-04-12 |
| 最後推送 | 2026-07-01（約一個月前） |
| Open Issues | 14（不含 PR） |
| Open PRs | **45** |
| 最新 Release | **從未發過 release** |
| Topics | 無（未設） |
| 首頁 | 無（未設 homepageUrl，故跳過 defuddle） |
| 是否 Archived | 否 |

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 32 |
| 總 Tokens | 66,922 |
| 壓縮模式 | 未使用（diskUsage 561 KB） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| poster.html | 7,061 | 10.6% |
| helpers/render.py | 6,158 | 9.2% |
| SKILL.md | 5,693 | 8.5% |
| static/timeline-view.svg | 4,889 | 7.3% |
| helpers/timeline_view.py | 3,585 | 5.4% |

整個專案只有 **6 支 Python helper**（`transcribe` / `transcribe_batch` / `pack_transcripts` / `timeline_view` / `render` / `grade`）＋ 一份 SKILL.md ＋ 一個 vendored 的 `skills/manim-video/` 子技能（14 份 Manim 參考文件）。**真正的產品是 SKILL.md 裡的規則，不是程式碼**——helper 只是 ffmpeg 包裝，決策全在 agent。

## 核心功能

- **詞級逐字稿為主要介面**：ElevenLabs Scribe（`scribe_v1`，開 diarize＋audio events＋word granularity），所有 take 打包成單一 `takes_packed.md`（相位級、靜音 ≥0.5s 斷句）。
- **on-demand 視覺合成**：`timeline_view.py` 產 filmstrip ＋ 說話者軌 ＋ 波形 ＋ 詞標籤 PNG，明確定位為「決策點工具，不是掃描工具」。
- **12 條硬規則**（production correctness，非品味）：字幕**最後**上（否則被 overlay 蓋掉＝靜默失敗）、逐段抽取後 `-c copy` 無損串接（否則二次編碼）、每個接點 30ms 音訊淡入淡出（否則爆音）、overlay 用 `setpts=PTS-STARTPTS+T/TB`、SRT 用輸出時間軸偏移、**絕不在字中間切**、每個切點 padding 30–200ms（吸收 Scribe 的 50–100ms 漂移）。
- **自我評估迴圈**：render 後在**每個切點**對成品跑 `timeline_view`，抓視覺跳接／爆音／被蓋住的字幕，過關才給使用者看，最多重修 3 次。
- **平行動畫子代理**：多個動畫槽用 `Agent` tool 一次全開（硬規則 10 明訂不得循序），支援 HyperFrames／Remotion／Manim／PIL。
- **session 記憶**：`project.md` 逐次追加，下週接得上。
- **輸出隔離**：所有產物一律進 `<videos_dir>/edit/`，硬規則 12 明訂**不得寫進 skill 目錄**。

## 技術架構

```
  raw takes/                     ElevenLabs Scribe API
      │                          （唯一對外網路呼叫）
      ▼                                  ▲
 transcribe_batch.py ──4 workers─────────┘
      │  transcripts/<name>.json（快取，硬規則 9）
      ▼
 pack_transcripts.py ──▶ takes_packed.md（~12KB，LLM 主要閱讀面）
      │
      ▼
 ┌──────────────── LLM 推理層（SKILL.md）────────────────┐
 │  盤點 → 預掃問題 → 對話 → 提策略 → 等確認 → 執行      │
 │        ▲                                              │
 │        └── timeline_view.py（只在決策點呼叫）          │
 └───────────────────────┬───────────────────────────────┘
                         ▼
                     edl.json（切點決策）
                         │
       ┌─────────────────┼──────────────────┐
       ▼                 ▼                  ▼
  grade.py         animations/slot_N/    render.py
（ffmpeg 濾鏡）   （平行 sub-agent：      逐段抽取＋30ms fade
                  HyperFrames/Remotion/  → -c copy 串接
                  Manim/PIL）            → overlay（PTS shift）
                                         → 字幕 LAST
                         │
                         ▼
                  自我評估（每個切點跑 timeline_view）
                         │  失敗 → 修 + 重 render（上限 3）
                         ▼
                    edit/final.mp4
```

| 層次 | 技術 |
|------|------|
| 語音辨識 | ElevenLabs Scribe API（`api.elevenlabs.io/v1/speech-to-text`，`xi-api-key` header，timeout 1800s） |
| 媒體處理 | ffmpeg / ffprobe（全程 subprocess，14 處呼叫） |
| 視覺化 | librosa（波形）＋ matplotlib ＋ Pillow（合成 PNG） |
| 推理層 | SKILL.md — 7 條原則 ＋ 12 條硬規則 ＋ 反模式清單 |
| 動畫（選配） | HyperFrames（Node 22+）／Remotion／Manim（vendored 子技能）／PIL |
| 相依 | requests, librosa, matplotlib, pillow, numpy；`animations` extra = manim |

**架構上的真正取捨**：這是「規則寫在 Markdown、決策交給 agent」的極端版本——程式碼刻意保持薄（6 支 helper），因為作者認定剪輯決策無法窮舉成參數。代價是**行為可重現性完全綁在 agent 的服從度上**：12 條硬規則若 agent 漏掉任一條，產出的是**靜默失敗**（字幕被蓋、每個接點爆音、overlay 播到一半），沒有任何程式層閘門會擋。對照上一篇分析的 video-autopilot-kit 走的是相反路線（機械閘門 `assert` 擋在產出前），兩者是同一問題的兩種答案。

## 供應鏈與安全檢查

| 檢查 | 結果 | 證據 |
|------|------|------|
| 網路呼叫 | **僅一處**：`api.elevenlabs.io/v1/speech-to-text`（`transcribe.py`） | 全 repo 只有 1 個 `import requests`；其餘 URL 都是 README 連結。另 `poster.html`（行銷海報，不在管線內）載 `cdn.tailwindcss.com` 與 `fonts.googleapis.com` |
| 危險執行 | **無** | 無 `os.system` / `eval` / `exec` / `pickle`；14 處 subprocess 全指向 ffmpeg / ffprobe |
| 相依套件 | 5 個主流套件（requests, librosa, matplotlib, pillow, numpy） | 全部知名維護中；**無 lockfile**（PR #108 補 `uv.lock` 尚未合併） |
| 安裝腳本 | `skills/manim-video/scripts/setup.sh` **只做環境檢查**，不安裝任何東西 | 逐行讀過：`command -v` ＋ `import manim` 判斷，缺什麼印安裝指令 |
| Repomix 安全掃描 | ✔ No suspicious files detected | 32 檔全掃 |

⚠️ **真正該注意的不是惡意程式碼，是資料流向**：你的**原始素材音訊全部上傳到 ElevenLabs**（每個 source 一次 API 呼叫，含未剪的 NG、私下對話、口誤）。這是產品的核心機制不是 bug，但敏感內容、客戶素材、未公開產品畫面的音軌都會離開本機。README 與 SKILL.md 都沒有提醒這件事。

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 6 人（`gregpr07` 9、`ShawnPana` 4、`antoinersx` 2，其餘各 1） | 核心 2 人 |
| Release | **零**（從未發過 release，無版本號可釘） | 依賴 git HEAD |
| 最後推送 | 2026-07-01（約一個月前） | 停滯 |
| PR 合併紀錄 | **開 45 / 歷史合併僅 9**；最舊未處理 PR 停在 2026-04-22（3.5 個月） | **社群送修但沒人收** |
| Issues | 14 open | — |
| Watchers | 128 | star:watcher 約 146:1，依實測基準（42:1~2413:1）屬正常區間 |

`default_branch = main`，無孤兒分支問題。18.7K⭐ 對 9 個合併 PR 的落差是本專案最硬的訊號：**這是一個發布後就大致停在原地的 demo-quality 專案**，社群送來的修補（Windows 編碼、直式影片旋轉、CJK 字幕、uv.lock、CLAUDE.md）全部堆在門口。

## 社群口碑

WebSearch 顯示**第三方內容生態確實存在**（與多數 1K 級專案不同）：日文 note.com 有完整教學指南（涵蓋 Claude Code／Codex／Cursor／Windsurf 等多 agent 接法）、explainx.ai 與 aibit.im 有專文、Medium 有「Claude Code 剪片四工具」對比文、MindStudio 有端到端自動化教學、`claudemarketplaces.com` 已收錄為可安裝 skill。

**正面**：普遍認可「不給 LLM 看 pixel、給結構化資訊」的典範轉移，視為 browser-use 把 DOM 思路移植到影片的延伸。
**負面／已知問題**（來自 open PR 與 issue，非評論文章）：Windows console crash、非 ASCII 路徑的 ffmpeg 跳脫錯誤、直式素材 rotation metadata 未偵測、CJK 字幕支援不足。這些都**已有社群 PR 但未合併**。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低。方法論可讀性高（12 條硬規則是好素材），但不是知識庫型專案。 |
| **Claude Code** | **極高——這就是一個 Claude Skill**。SKILL.md 標準 frontmatter，symlink 進 `~/.claude/skills/video-use/` 即用。且它明確呼叫 **HyperFrames**（你已裝 `hyperframes` / `hyperframes-cli` / `hyperframes-media` 三個 skill）當動畫後端，接口是現成的。硬規則 10「平行 sub-agent，不得循序」與 institution 的派工制度同構。 |
| **Automation** | 中。與 `active/ai-video-pipeline/`（生成式素材）不重疊：這條是**實拍素材的剪輯**。但需要 ElevenLabs API key（付費），與既有 FIRECRAWL_API_KEY 未設的狀況同型——沒有 key 就完全跑不動，因為逐字稿是整個架構的地基。 |

## 安裝建議

⏳ 觀望

理由分三層。**架構值得學**：transcript-as-DOM 的取捨、12 條硬規則的寫法（每條都附「否則會發生什麼靜默失敗」）是高品質素材，光讀 SKILL.md 就有價值，而讀不需要安裝。**但現在裝會踩三個具體的坑**：

1. **Windows 支援實質未完成**（已逐行驗證，非推測）：`timeline_view.py` 的 `FONT_CANDIDATES` 只列 macOS（`/System/Library/Fonts/*`）與 Linux（DejaVu／Liberation）路徑，**無任何 Windows 字型路徑**，全數 miss 後 fallback 到 `ImageFont.load_default()` 的點陣字——決策用的 PNG 標籤會極小且 CJK 全豆腐字。加上非 ASCII 路徑的 ffmpeg 跳脫問題（PR #116 未合併），而你的路徑大量含中文。
2. **依賴付費 API 且素材外流**：ElevenLabs key 未持有；且原始音訊（含 NG 片段）全上傳第三方。
3. **維護停滯**：零 release、45 open PR 對 9 次歷史合併、最後推送一個月前。裝了等於釘在 git HEAD，且上游修不修 Windows 是未知數。

**升級條件（→ ✅ 裝）**：實際要剪實拍影片且已取得 ElevenLabs key；或上游合併 Windows 編碼／字型那批 PR（追 #116、#112、#103）；或你先在 fork 裡補上 `C:\Windows\Fonts\` 字型候選（單檔改動，成本極低）。

**放棄條件（→ ❌ 不裝）**：三個月內 PR 佇列仍無合併動作（維護者已放生）；或 HyperFrames 那條線足以覆蓋你的影片需求（實拍剪輯需求始終沒出現）；或 ElevenLabs 定價／條款不接受素材上傳。

**📌 可單獨抽取**（不裝也能用）：SKILL.md 的 12 條硬規則寫法——「規則 + 違反後的靜默失敗現象」這個格式，比純規則清單更難被 agent 忽略，可直接借進 institution 文件；以及 `render.py` 的「逐段抽取 → `-c copy` 串接 → overlay → 字幕最後」濾鏡順序，是任何 ffmpeg 合成流程都適用的正確順序。

## 相關連結

- [[video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架|video-autopilot-kit]] — 同題反向解法（機械閘門 assert vs Markdown 規則交給 agent）
- [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] — 同為影片 agent skill，走程式化動畫路線
- [[calesthio-OpenMontage|OpenMontage]] — 同樣「agent 即 orchestrator」的思路，規模大得多
- [[Remotion — 用 React 寫程式碼產生影片|Remotion]] — 本 skill 的動畫後端選項之一
