---
source: "https://github.com/Jaycheng1103/chatgpt-video-editing-skills"
author: "Jaycheng1103 (傑少)"
stars: "188"
clipped: 2026-08-05
tags:
  - "github/repo"
  - "agent-skill"
  - "video-editing"
  - "ffmpeg"
  - "traditional-chinese"
---

## chatgpt-video-editing-skills — 繁中「八大步驟」短影音剪輯安全 skill 組

> **Jaycheng1103/chatgpt-video-editing-skills** | ⭐ 188 | 🍴 44 | 📝 MIT
> "用 ChatGPT／Codex 安裝 AI 剪輯環境，並依八大步驟完成可驗證的短影音剪輯。"

---

### 一句話說明

一組**繁體中文**的 agent skill，把「把使用者自己拍的影片剪成 9:16 直式短片」拆成兩個嚴格分工的 skill：`chatgpt-video-editing-setup`（只檢查／安裝／驗證環境——video-use、FFmpeg、思源黑體字幕字體、ElevenLabs 憑證、選用的 HyperFrames，永不上傳或剪輯）與 `chatgpt-short-video-editor`（對既有影片跑逐字轉寫→剪輯策略→粗剪→字幕→預覽→QA→正式輸出的八步流程）。目標使用者是想用 AI agent 安全地把真實素材做成繁中 Reels/Shorts 的人。**真正的賣點不是功能而是安全工程**：全流程 inspect-before-mutate、每個變更／上傳／付費動作都要顯式核准、憑證處理有 600 權限＋check-ignore 驗證、不把計畫或未驗證檔案當成品——是一份 R17（先驗證再宣稱完成）思路的教科書級 skill。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 188 |
| Forks | 44 |
| 主要語言 | Shell（僅 6 KB） |
| 授權 | MIT（skill 本體；第三方各依上游授權） |
| 建立時間 | 2026-07-20 |
| 最後推送 | 2026-07-26 |
| Open Issues | 0 |
| Open PRs | 0 |
| 最新 Release | 無 |
| Topics | agent-skills / elevenlabs / ffmpeg / hyperframes / traditional-chinese / video-editing |
| 首頁 | 無 |
| 是否 Archived | 否 |
| 磁碟用量 | ~1.8 MB（幾乎全是一張八步驟 PNG） |

**規模脈絡**：2.7 週齡、單一作者傑少、無 release、188⭐/44🍴、watcher 僅 3。star:watcher 63:1 依實測基準無鑑別力。fork:star ≈ 1:4.3 偏高＝多為「複製走用」而非貢獻。

---

### 內容分析（18 檔，走 Trees API）

檔案極少，全是 Markdown skill 文件＋一支測試腳本＋一張圖：

| 檔案 | 大小 | 內容 |
|------|------|------|
| `assets/…八大步驟.png` | 1.8 MB | 流程圖（佔全 repo 體積 99%） |
| `examples/完整提示詞.md` | 20 KB | 一次給完整規格的範例 prompt |
| `skills/…-setup/references/setup-runbook.md` | 13 KB | 安裝指令與選項（真正的執行面） |
| `skills/…-setup/references/security-and-verification.md` | 5 KB | 憑證與驗證安全規則 |
| `skills/…-setup/SKILL.md` | 3.6 KB | Setup 入口（7 步操作序列） |
| `skills/…-editor/SKILL.md` + 3 refs | ~10 KB | 剪輯八步／製作規則／輸出契約 |
| `tests/validate_repo.sh` | 6 KB | 純文字契約測試（grep 檢查各檔片語） |
| `evals/evals.json` + `baseline.md` | 8 KB | 行為 eval |

無 build、無執行期程式碼——skill 本體只是文件＋指令模板，實際運算全靠使用者自裝的 video-use/FFmpeg/ElevenLabs。

---

### 核心功能

- **兩 skill 硬分工**：setup 只讀不剪、editor 只剪不裝——editor 缺工具就停在安全位置交回 setup，永不靜默安裝。
- **八大步驟閘門流程**：素材檢查→逐字轉寫→內容整理→剪輯決策（先給 4–8 句白話策略等核准）→逐段粗剪（依字詞邊界建 EDL，30–200ms padding）→轉色／圖卡／字幕（思源黑體 TW 最後合成）→720p 完整預覽→QA 與 1080×1920 正式定稿。**每個創意決策（B-roll/動畫/音樂/CTA）都是 opt-in 非預設**。
- **原始素材零破壞**：所有產物放 `<source>/edit/`，原檔不覆寫／移動／改名／刪除。
- **付費前同意**：第一次把媒體上傳 ElevenLabs Scribe v2 前，必須具名檔案＋說明會消耗額度＋等明確同意；不願上雲可降級本機 Whisper 但明標時間碼信心較低。
- **選用 HyperFrames**：只有已核准策略需要 HTML/CSS/GSAP 動畫時才裝，否則明確報「HyperFrames 未要求」不當失敗。

---

### 技術架構

```
chatgpt-video-editing-skills/   ← 只有文件，無執行碼
├── skills/
│   ├── chatgpt-video-editing-setup/   環境檢查/安裝/驗證
│   │   ├── SKILL.md                   7 步：inspect → 硬停 → 列變更 → 核准後裝 → 憑證 → 驗證 → 報告
│   │   └── references/{setup-runbook, security-and-verification}.md
│   └── chatgpt-short-video-editor/    八步剪輯
│       ├── SKILL.md
│       └── references/{eight-step-workflow, production-rules, output-contract}.md
├── tests/validate_repo.sh    純 grep 契約測試（無網路/eval）
└── evals/{evals.json, baseline.md}
```

| 層次 | 技術 |
|------|------|
| Skill 層（本 repo） | Markdown 指令 + Shell 契約測試 |
| 轉寫 | ElevenLabs Scribe v2（word-level 時間碼）／降級本機 Whisper |
| 剪輯核心 | browser-use/**video-use**（外部 MIT repo，helper 在其中） |
| 音視訊 | FFmpeg / ffprobe |
| 字幕 | 思源黑體 TW 子集 OTF（SIL OFL，僅官方 release 分支下載） |
| 圖卡／動畫 | Pillow（靜態）／HyperFrames（選用動畫，Apache-2.0） |

---

### 🔒 安全審查：範本級乾淨（正面案例）

逐檔讀 setup-runbook / security-and-verification / validate_repo.sh，供應鏈與注入面**全清**，且防呆做得比多數同類好：

1. **來源全釘官方 HTTPS**：video-use / hyperframes / 思源黑體三個上游 URL 硬編碼，字體用 `curl -fL --proto '=https'`（強制 TLS）、HyperFrames 用 `GIT_LFS_SKIP_SMUDGE=1` 避免拉大檔、`bun install --frozen-lockfile`、本機 `npx` 驗證隔離 npm cache。無自架 CDN、無 base64、無 eval。
2. **憑證處理嚴謹**：`.env` 先 `check-ignore` 驗證被 git 忽略才准寫、拒絕 symlink/非 regular file、`chmod 600` 後用平台對應 `stat` 複驗、agent 明文「永不讀取檔案內容／不 echo/log/commit 金鑰」。
3. **不靜默動任何東西**：非 git worktree 的既有路徑＝hard stop、dirty status＝hard stop、不自動改 remote、不 pull/reset/覆寫、每個 mutation 進核准清單才做。
4. **測試無副作用**：`validate_repo.sh` 純 grep 檢查各檔應含的片語，零網路呼叫。
5. **授權清楚**：THIRD_PARTY_NOTICE 明列六個上游各自授權，`.gitignore` 正確排除 `.env*` 與所有媒體。

這是「skill 內文自動行為指令」的**反面**——它主動把 agent 的權限收到最小、把決定權交回使用者。與同批分析的 reverse-skill（強制自我注入）恰成對比。

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 傑少 1 人（contributors API 空） | 單人 |
| 近期 commit | 07-20 一波 11 個 + 07-26 一個字體修正 | 起步後即靜默 |
| Release | 無 | — |
| Issue/PR | 0/0 | 無外部參與 |
| 外部口碑 | Exa 僅回一個 GitHub 鏡像站，無任何評測討論 | 幾乎零社群訊號 |

---

### 相關連結

- [[Github/repos/emilkowalski-skills — Design Engineer 動效與 Apple 設計 Skill 合集|emilkowalski/skills]] — 同為 `npx skills` 生態的高品質 skill
- [[Github/repos/reverse-skill — AI 逆向滲透安全技能路由包|reverse-skill]] — 安全姿態的**反面對照**（強制自我注入 vs 主動收權）
- HyperFrames 技能群（hyperframes / hyperframes-media / claude-real-video，已裝）— 功能相鄰但定位不同：那些是「從零生成 HTML 影片／轉寫」，本 skill 是「剪真實素材」

---

### 安裝建議

⏳ 觀望

**理由：**

1. **需求目前不存在**。本 skill 專做「把使用者拍的真實影片剪成繁中直式短片」。本環境已裝 HyperFrames 群（從零生成影片）＋`claude-real-video`（看影片）＋`hyperframes-media`（TTS/轉寫/字幕），但**剪真實素材成 Reels**這件事目前沒有在跑的任務（R13：無可量化收益的觀望項）。
2. **硬依賴重且含付費**：要能真正運作得先裝 browser-use/video-use 完整 repo＋uv 環境＋ElevenLabs Scribe v2 付費憑證（word-level 時間碼是核心價值所在），選用動畫還要 Node 22＋Bun。為零現有需求建這套環境不成比例。
3. **太新太小外部零驗證**：2.7 週、單人、無 release、社群訊號近乎零。安全工程雖優，但成熟度與 bus factor 都是弱點。

**（公平地說）它的優點**：安全設計是同類最佳之一，八步閘門流程＋原檔零破壞＋付費前同意的模式，即使不裝也值得當「安全 skill 該長什麼樣」的參考範本。

**升級條件（→ ✅ 裝）**：真的出現「把自己拍的素材剪成繁中直式短片」的重複任務（例如個人品牌 Threads 影片、求職自我介紹短片），且願意設 video-use＋ElevenLabs——屆時走本環境四步 SOP 手動取用（先 clone 讀過再 `npx skills add .`）。
**放棄條件（→ ❌ 不裝）**：上游持續靜默（已 2 週無 commit，若至 2026 年底仍停更即淘汰）、或 browser-use/video-use 上游改動使 runbook 失效、或 hyperframes-media 的轉寫＋既有 FFmpeg 流程已足以覆蓋此需求。

**📌 可單獨抽取（不裝整包）**：`security-and-verification.md` 的憑證處理範式（check-ignore→拒 symlink→chmod 600→stat 複驗）與 `output-contract.md` 的「未驗證不得稱完成」契約，都可當自寫 skill 或安全 QA 的參考模板。
