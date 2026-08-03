---
source: "https://github.com/Hao0321/video-autopilot-kit"
author: "Hao0321 (Hao0321 Studio)"
stars: "1.6K"
clipped: 2026-07-21
updated: 2026-08-03
tags:
  - "github/repo"
  - "video-automation"
  - "ffmpeg"
  - "capcut"
  - "creator-tools"
---

# video-autopilot-kit — 填自己資料的 YouTube / 短影音自動化框架

> 🔄 **2026-08-03 二次分析更新**（首次分析 2026-07-21，當時為 v0.8.0 / 1,476⭐）：改版至 v0.11.0，新增供應鏈與安全檢查、三條生產線架構、社群指標判讀。

> **Hao0321/video-autopilot-kit** | ⭐ 1,580 | 🍴 271 | 📝 MIT
> "Fill-in-your-own-data framework for YouTube / short-form video automation: CapCut JSON + ffmpeg tooling + an onboarding questionnaire. Ships with zero private data."

---

### 一句話說明

這是一套把「個人 YouTube 創作系統」抽成骨架的開源框架：給你 ffmpeg 純程式化影片生產線、CapCut 草稿 JSON 直改工具、三十份影片製作方法論筆記，以及一份問卷（`SETUP.md`）——你回答關於自己頻道的問題，把 `templates/*.template.md` 填成 `profiles/*.md`，它才變成屬於你的系統。刻意不含作者的私人後台數字，目標使用者是想把剪輯／發布流程機械化、但不想抄別人參數的中文圈個人創作者。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,580 |
| Forks | 271 |
| 主要語言 | Python（100%，592 KB） |
| 授權 | MIT |
| 建立時間 | 2026-06-01 |
| 最後推送 | 2026-07-28 |
| Open Issues | 0（歷史累計僅 2 筆） |
| Open PRs | 2 |
| 最新 Release | v0.11.0（2026-07-28） |
| Topics | capcut, content-creation, creator-tools, ffmpeg, python, shorts, video-automation, youtube |
| 首頁 | 無（未設 homepageUrl，故跳過 defuddle 文件站爬取） |
| 是否 Archived | 否 |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 115 |
| 總 Tokens | 419,199 |
| 壓縮模式 | 未使用（diskUsage 713 KB，遠低於門檻） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| knowledge/meta-lessons.md | 40,435 | 9.6% |
| CHANGELOG.md | 20,163 | 4.8% |
| knowledge/ai-content-compliance-sources.md | 18,034 | 4.3% |
| src/capcut_helpers/delivery_qa.py | 13,814 | 3.3% |
| knowledge/youtube-algorithm-mastery.md | 11,930 | 2.8% |

檔案組成 53 支 `.py` ／ 57 份 `.md` ／ 3 個 `.json`——**文件與程式碼幾乎一比一**，且 token 前三名有兩名是知識庫文件。這不是「順手附說明」的比例，是刻意把方法論當第一級交付物。

---

### 核心功能

- **三條同構生產線**：教學長片、直式 Shorts、線上訪談。三條刻意長成同一形狀——知識層（為什麼）→ 機械閘門（不靠人記得）→ 一鍵驅動。學一條等於學三條。
- **機械閘門（gate）**：`plan_gate` / `script_gate` / `shorts_gate` / `interview_gate`，在**產出之前**擋掉壞剪法、無來源數據、觀眾語言不符。共用外殼 `gate_core.py` 統一 `report / assert / selftest` 三件套，判定規則各自留在自己的檔（作者明說「不集中才不會互相污染」）。
- **純 ffmpeg 生產線**（Path 1，跨平台）：`silent_vlog_maker`（直式 Shorts、多色字幕、BGM 高光起點、響度正規化）、`longform_maker`（`fx_lib` 亞像素 Ken Burns／雙層 bloom／light sweep、字級時間字幕、螢幕錄影機械化清理）。
- **CapCut 自動化**（Path 2，Windows 優先）：草稿 JSON 直改（draft I/O、四級靜音、花字、AI 字幕校正）＋ Computer Use 操作 CapCut 視窗套模板／匯出。作者自陳這是他本人主用路線，但**明講開源採用者多數應該從 Path 1 開始**。
- **交付前 QA**：`delivery_qa` 掃頻閃／死空檔／caption-sync／全幀檢查，`broll_audit` 占比，`caption_broll_matcher` 對位。兩條 path 的成品都過同一關。
- **競品拆解 `teardown.py`**（v0.11 新增）：一個指令量出刀速／刀距中位＋標準差／換句速率／換句÷剪點／LUFS。OCR 是選配，缺套件只降級不崩潰。
- **`knowledge/` 30 份方法論**：M1–M111 避坑條目、YouTube 演算法、腳本三支柱、AI 內容合規（R26–R38 ＋ 53 條分級法源，逐條標 `[official]`／`[reported]`／`[speculative]`）。

---

### 技術架構

```
                       SETUP.md（問卷）
                              │
              templates/*.template.md ──▶ profiles/*.md（gitignored，你的數據）
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
  Path 1 — Programmatic                      Path 2 — CapCut-assisted
  （Win / Mac / Linux）                       （Windows-first，版本敏感）
        │                                           │
  ┌─────┴──────┬──────────────┐              capcut_helpers/
  │            │              │              draft_io / mute / text_style
longform_   silent_vlog_   shorts_/          subtitle_corrections
maker/      maker/         interview_               │
（fx_lib    （pipeline     autopilot.py             │
 word_       effects        teardown.py             │
 captions    captions）         │                   │
 screen_         │              │                   │
 clean）         └──────┬───────┘                   │
        │               │                           │
        └────────► gate_core.py ◄───────────────────┘
                （report / assert / selftest 共用外殼）
                        │
                   av_util.py（subprocess / ffprobe / 抽幀）
                        │
                  delivery_qa.py（交付前機械化 QA）
                        │
                   成片 MP4 ＋ QA 驗證圖
```

| 層次 | 技術 |
|------|------|
| 媒體處理 | ffmpeg / ffprobe（全程 subprocess 呼叫，29 處 ffmpeg、21 處 ffprobe） |
| 核心語言 | Python 3.9+，標準庫為主（os / subprocess / json / pathlib / dataclasses / statistics） |
| 選配相依 | Pillow + numpy（僅 `shorts_autopilot`）、rapidocr-onnxruntime + opencc（僅 `teardown` 的 OCR 段） |
| 跨平台 | `platform_compat.py` 探測系統路徑與 CJK 字型（不 hardcode） |
| 閘門層 | 純 Python，零第三方相依，可單檔複製走 |
| 知識層 | Markdown（`knowledge/` 30 份 ＋ `templates/` 20 份） |

**架構上真正的設計取捨**（讀原始碼看到、README 沒直說的）：閘門刻意做成「純 Python 可單獨執行」——`shorts_gate.py` 連 ffmpeg 都不需要，`python examples/04_shorts_gate.py` 零 pip install 就能跑。代價是 import 路徑有陷阱：必須平面 import（把 `src/longform_maker/` 加進 `sys.path`），走套件路徑會經過 `__init__` 載入 `fx_lib` 而拖進 numpy + Pillow。作者在 README 明寫了這個坑。

---

### 供應鏈與安全檢查

repo-intel 固定動作，五項全過：

| 檢查 | 結果 | 證據 |
|------|------|------|
| 網路呼叫 | **零** | 全 repo grep `requests` / `urllib` / `urlopen` / `socket` 無命中；所有 `http://` 字串都是 `knowledge/` 的文獻出處連結 |
| 危險執行 | **無** | 無 `os.system` / `eval(` / `exec(` / `pickle`；`subprocess` 20 處全指向 ffmpeg / ffprobe |
| 相依套件 | **無 requirements.txt / pyproject / setup.py** | 沒有套件宣告檔＝沒有可被投毒的相依清單；選配套件（Pillow、numpy、rapidocr-onnxruntime、opencc-python-reimplemented）都是既有知名套件，由使用者自行安裝 |
| CI／腳本 | **無 .yml / .sh / .bat / .ps1** | 無自動執行入口 |
| Repomix 安全掃描 | ✔ No suspicious files detected | 115 檔全掃 |

隱私宣稱也做了實質檢查：`config.py`、`profiles/` 走 gitignore，模板欄位是 `<fill in>` / `______` 佔位；`knowledge/` 引用第三方創作者時採 citation-first（沒有可點出處就不給數字），合規檔逐條標 `[official]`／`[reported]`／`[speculative]`。這是本次審視中少見的「作者自己先把可信度分級做掉」。

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 實質 1 人（`Hao0321`；多數 commit 作者署名 `BuildTools`，未綁 GitHub 帳號故不入 contributors API） | **單一維護者，巴士係數 1** |
| Release 頻率 | 12 個 release 集中在 2026-06-21 ~ 07-28（約 5 週） | 極頻繁，但整個專案只有 2 個月歷史 |
| 最後推送 | 2026-07-28（約 6 天前） | 活躍 |
| Issues | 歷史累計 2 筆，目前 0 open | 使用者回報極少 |
| Watchers | 3 | 見下方判讀 |
| Fork:Star | 271:1,580 ≈ 17% | 對「填你自己數據」型 repo 屬合理——fork 是預期的使用方式，不是異常訊號 |

**指標判讀（避免誤判）：** star:watcher 約 527:1，看似極端，但依既有實測基準（42:1 至 2,413:1），此比值單獨**無鑑別力**，不構成刷星證據。`default_branch` 已查為 `main`、全 repo 僅一個分支，不存在孤兒分支污染貢獻者統計的情況。真正的風險訊號不是這些比值，而是**單人維護 ＋ 兩個月新專案 ＋ 幾乎零 issue 互動**——1,580 顆星與 2 筆 issue 之間的落差，說明多數人是「收藏」而非「在用」。

---

### 社群口碑

WebSearch 查詢 `"video-autopilot-kit" review OR 心得 OR discussion` 全數回到官方 GitHub 頁面本身，**未找到任何第三方評測、部落格、論壇或社群討論**。專案僅兩個月，尚未形成外部口碑。

同作者另有 `Hao0321/ai-media-generator`（Claude Code Skill，跨 14+ 生成平台的 AI 圖／影／音 prompt 工具），可作為判斷作者產出取向的旁證。

> 註：Reddit／X 頻道未取得（本次未啟動 OpenCLI 路），故社群覆蓋僅限公開搜尋引擎，範圍有限。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | `knowledge/` 30 份方法論是可直接吸收的內容資產，尤其 `ai-content-compliance-sources.md`（53 條分級法源）與 `meta-lessons.md`（M1–M111 避坑條目）。要吸收的是「怎麼想」，不是作者的數字。 |
| **Claude Code** | 高度同構。gate_core 的「機械閘門 ＋ selftest GREEN/RED ＋ 判定規則不集中」，跟本地 `scripts/` 制度機制層（`check_mechanism_health.py` 金絲雀、`verify_spec.py`）幾乎是同一套思路的另一個領域實作；「空白模板不擋你，只回一條 warn」也對應 R12 失敗大聲說。**參考價值高於安裝價值。** |
| **Automation** | 與 `active/ai-video-pipeline/`（Claude+fal.ai+OpenAI 生成式影片，仍卡 FAL_KEY 與 FFmpeg 未裝）**不重疊而是互補**：那條線是「AI 生成素材」，這套是「真實素材的剪輯／閘門／發布」。但目前沒有在跑的頻道，兩條線都無實際使用場景。 |

---

### 安裝建議

⏳ 觀望

理由：程式碼品質與工程紀律明顯高於同類（零網路呼叫、零相依宣告、閘門可單檔複製、OCR 邊界寫死在原始碼裡防誤用、合規數字逐條標可信度分級），供應鏈五項全清。但**沒有實際使用場景**——這套工具的價值前提是「有一個在經營的 YouTube／Shorts 頻道」，目前不成立；而 `knowledge/` 的方法論可以直接讀，不需要安裝。加上單人維護、兩個月專案、幾乎零 issue 互動，現在裝是加複雜度換零改善（R13）。

**升級條件（→ ✅ 裝）**：開始經營影音頻道並需要機械化交付 QA；或要做競品短片節奏量測（`teardown.py` 純 Python 那半可單獨複製走，不必整包裝）。

**放棄條件（→ ❌ 不裝）**：三個月內無新 release 且 issue 仍無互動（單人專案停更訊號）；或 CapCut 端持續加密草稿格式（剪映 CN 6.0+ 已加密不可直改）使 Path 2 全面失效、Path 1 又被 HyperFrames 覆蓋。

---

### 相關連結

- [[video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill|video-shotcraft]] — 同賽道互補（程式化動畫 vs 實拍剪輯）
- [[ai-media-generator — 跨平台 AI 媒體生成 Prompt Skill|ai-media-generator]] — 同作者 Hao0321 另一專案
- [[Remotion]] — 另一條 React 影片路線
