---
source: "https://github.com/calesthio/OpenMontage"
author: "calesthio (Calesthio AI Labs)"
stars: "44K+"
clipped: 2026-07-30
tags:
  - "github/repo"
  - "video-production"
  - "agentic-ai"
  - "claude-code"
  - "remotion"
date: 2026-06-20
updated: 2026-07-30
status: evaluated
verdict: 開源 Agentic 影片製作系統；架構紮實但 Windows 未驗證通過、有冒名散布事件
---

# OpenMontage — 把 AI coding agent 變成整間影片製作公司的開源 pipeline 系統

> 來源：https://github.com/calesthio/OpenMontage
> 授權：AGPL-3.0｜⭐ 44K+｜🍴 5.3K
> 規模：**1,887 檔 / 3.08M tokens**（2026-07-30 repomix `--compress` 實測）

> [!warning] 只認 `calesthio/OpenMontage`，任何「下載頁 / 安裝包」都是假的
> 正版 repo **從未發過任何 release**（`gh api .../releases` → 0）。冒名組織 `Open-Montage/OpenMontage`（2026-06-26 建立）在其 release 頁散布 `OpenMontage-x64.7z`，已被下載 358 次，Windows Defender 判定為 `Trojan:Win32/Tecabans.STV!cl`；正版 repo 上已有受害者開 issue（他以為那是官方頁）。GitHub 上同名 repo 有 20+ 個。唯一正確取得方式：`git clone https://github.com/calesthio/OpenMontage.git`

---

## 這是什麼？

把「拍一支影片」拆成 `research → proposal → script → scene_plan → assets → edit → compose` 七道工序，每道工序寫成一份 Markdown **導演技能檔**（director skill）與一份 YAML manifest，由你手邊的 AI coding agent（Claude Code / Cursor / Codex / Copilot / Windsurf）逐關讀取執行、逐關停下來等你簽核。

核心設計決斷：**沒有程式碼 orchestrator，agent 本身就是 orchestrator**。Python 只提供工具（`tools/`）與狀態持久化（`lib/checkpoint.py`），所有創意判斷、審查標準、品質門檻都寫在人類可讀可改的 YAML + Markdown 裡。

與多數「免費 AI 影片」專案的實質差異：它能走**真・實拍素材路線**——`documentary-montage` pipeline 用 CLIP 建立語意可搜尋的素材庫（Archive.org、NASA、Wikimedia Commons、Pexels、Unsplash），檢索真實動態片段剪成時間軸，不是「幾張靜圖加 Ken Burns 假裝是影片」。

---

## 檔案分佈（實測，非 README 宣稱）

| 區域 | 檔案數 | 說明 |
|------|--------|------|
| `.agents/skills/` | 860（567 .md） | 83 個外部技術知識包（Layer 3） |
| `.claude/` | 431 | 48 個 Claude Code skills + 3 個 slash commands |
| `skills/` | 156 .md | pipelines 103 / creative 35 / meta 11 / core 6 |
| `tools/` | 144 .py | video 56、audio 17、graphics 17、analysis 15、_kling 9、enhancement 7、_comfyui 6、avatar 5 |
| `tests/` | 77 .py | contracts / qa / eval / pipelines / styles |
| `remotion-composer/` | 39 | React 合成引擎 |
| `ink-theater/` | 28 | SVG 角色骨架 + mocap（token 前 5 大檔全在這） |
| `schemas/` | 24 .json | 契約驗證 |
| `lib/` | 20 .py | scoring / checkpoint / delivery_promise / slideshow_risk / corpus |
| `pipeline_defs/` | 13 .yaml | 12 條正式 pipeline + 1 條 framework-smoke |

> [!success] README 數字對帳：全數屬實
> 「700+ agent skill 檔」→ `skills/` 156 + `.agents/skills/` 567 = **723 個 .md** ✔
> 「12 pipelines」→ 13 YAML 扣掉 smoke test = **12** ✔
> 「100+ tools」→ 144 .py（含 base/registry 基礎檔）✔
> 少見地沒有灌水，這在 40K 星等級的專案裡是加分項。

---

## 核心功能

- **12 條完整製作管線**：動畫解說、動畫、虛擬主播、電影感預告、Clip Factory（長片切短片）、紀錄片蒙太奇、混合式、在地化配音、Podcast 再利用、螢幕演示、真人講話、角色動畫
- **零 API key 可用**：Piper TTS（離線配音）+ 免費/開放素材 + Remotion/HyperFrames 合成 + FFmpeg 後製 + 內建字幕，全程 0 元
- **參考影片起步**：貼一支 YouTube / Short / Reel / TikTok，agent 分析逐字稿、節奏、分鏡、關鍵影格，回傳 2–3 個差異化企劃 + 成本估算 + 樣片
- **The Gate**：所有付費生成前先出提案與估價；checkpoint writer 會**拒絕**把未取得核可的 gated stage 標記為 completed
- **7 維計分選 provider**：task fit 30% / output quality 20% / control 15% / reliability 15% / cost efficiency 10% / latency 5% / continuity 5%，勝出者與所有落選者一起寫進決策日誌
- **交付承諾與投影片風險偵測**：render 前擋下「說好是動態影片結果 80% 靜圖」的產出，6 維度評分（重複性、裝飾性視覺、弱動態、鏡頭意圖、過度依賴排版、無支撐的電影感宣稱）
- **Backlot 即時故事板**：本機 web board，pipeline 跑到哪就亮到哪，跑完可 `▶ REPLAY RUN` 依時間戳重播整場製作
- **預算治理**：估算 → 預留 → 對帳三段式，observe / warn / cap 三模式，單次動作預設 $0.50 以上要核可，總預算預設上限 $10

實測成本區間（官方範例，附完整 pipeline 紀錄）：$0.02（手工場景 + 免費素材）→ $0.15（FLUX 圖片動畫）→ $0.69（單一 OpenAI key）→ $1.33（Kling v3 動態片段 60 秒）

---

## 技術架構

```
                     你的 AI coding agent（= orchestrator，無程式碼 orchestrator）
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
  Layer 1「有什麼」              Layer 2「怎麼用」               Layer 3「原理是什麼」
  tools/ 144 .py                 skills/ 156 .md               .agents/skills/ 567 .md
  pipeline_defs/ 13 .yaml        （pipelines/creative/         （83 個知識包：manimgl 107、
  schemas/ 24 .json                core/meta 導演技能）           hyperframes-animation 98、
        │                              │                          vercel-react 71、remotion 41…）
        └──────────────┬───────────────┘
                       │
              lib/ 20 .py 核心基礎設施
   scoring（7維選型）｜checkpoint（可續跑狀態）｜delivery_promise
   slideshow_risk｜corpus + clip_embedder（CLIP 素材檢索）｜cost_tracker
                       │
        ┌──────────────┴───────────────┬────────────────┐
   Remotion（React）            HyperFrames（HTML/GSAP）   FFmpeg
   資料型解說、圖表、字幕         動態排版、產品片、         編碼/燒字幕/混音/調色
                                 ink-theater SVG 角色綁定
```

| 層次 | 技術 |
|------|------|
| Agent 契約 | `AGENT_GUIDE.md` + `PROJECT_CONTEXT.md`，五家 harness 各一份指路檔 |
| 編排 | YAML manifest + Markdown director skill（無程式碼 orchestrator） |
| 工具層 | Python 3.10+，`BaseTool` 契約 + `ToolRegistry` 自動探索，工具自帶 tier / stability / runtime / 成本估算 |
| 合成 | Remotion（Node.js）、HyperFrames（Node ≥ 22）、FFmpeg；runtime 在提案時鎖定為 `render_runtime`，中途偷換算治理違規 |
| 素材檢索 | CLIP embedding + 語意 corpus |
| 品質 | 24 個 JSON Schema 契約 + 77 個 pytest |
| CI | 只有一條 `.github/workflows/ci.yml` |

**Windows 專屬防禦碼**（值得單獨記）：`tools/base_tool.py` 自製 `.env` parser 處理行內註解；`tool_registry.py` 有 `_scrub_unicode_dashes()` 把 em dash / 彎引號 / 刪節號全部降級成 ASCII，以免 cp1252 stdout 爆掉。作者知道 Windows 使用者會來——但終點線目前還沒有人跨過（見下）。

---

## 已知問題（來自 open issues，都指向「架構承諾 vs 實作」的裂縫）

| 問題 | 為何重要 |
|------|---------|
| `write_checkpoint()` 從不檢查前置 gated stage 是否已核可就讓後續 stage 前進 | 直接打臉 README 的「人工核可是強制不是建議」 |
| `.env.example` 行內註解被當成憑證值載入 | 導致**約 30 個工具謊報自己可用** |
| `google_imagen` 三個寫死的 imagen-4.0 model ID 全回 404 | 寫死外部座標的通病 |
| `corpus_builder` 在 transformers 5.x 下 CLIP embed 拋錯，卻回報 `success=True` 並寫出空索引 | **fallback 靜默失效**的教科書案例 |
| `video_compose` 在 `documentary-montage` 下產出 30 秒純黑影片 | 傳錯 schema props 給 renderer |
| **「Windows + WSL2：6 小時以上、15 個以上可重現問題、無法產出任何成品影片」** | 對本環境是決定性阻礙 |

另有一筆已合併的真實安全修補：PR #413 `fix: sanitize os.system() shell injection in manimgl scene templates`。Repomix secret scan 對現有程式碼回報 `No suspicious files detected`。

---

## 專案體質

- **單人專案**：321 commits 中 226 筆（70%）出自作者一人；第二名 0xDevNinja 28 筆
- **貢獻潮遠超審查量能**：73 open issues、148 open PRs（單一貢獻者就掛了 13 個 PR），作者已開 issue 徵求「有影片製作實務經驗的 PR reviewer」
- **從未發版**：0 個 release，只能 `git clone`
- **治理變動**：2026-07-19 撤除 CLA 貢獻門檻（commit `chore: remove CLA contribution gate`）
- **商業模式**：AGPL-3.0 開源 repo + `openmontage.video` 的 credit 計價 Studio（private alpha / waitlist）+ GitHub Sponsors。典型 open-core，AGPL 是防 SaaS 競品的標準選擇
- **外部驗證薄**：Hacker News 共 5 篇投稿、最高 7 分 1 則留言（44K 星卻在 HN 幾乎零討論）；YouTube 教學生態存在但淺（官方 12.2K 觀看、第三方最高 12.7K，多為 AI 工具導購型頻道）；媒體轉載內容幾乎是 README 改寫，無獨立實測。fork/star = 12.1% 偏高，屬「clone 來用」而非「fork 來改」的形態

---

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| `d:\Claude\active\ai-video-pipeline`（本機專案，非 wiki 筆記） | **最強相關**。你那個 6 stages、Claude + fal.ai + OpenAI + FFmpeg 的專案卡在「待申請 FAL_KEY 與安裝 FFmpeg」。OpenMontage 是它的**嚴格超集**且已有 1,887 檔實作。要嘛取代自建，要嘛抽 `lib/scoring.py` 與 `lib/delivery_promise.py` 回自己的專案 |
| Claude Code | **極高但雙面刃**。原生為 Claude Code 設計（`.claude/` 431 檔、48 skills、3 commands、CLAUDE.md 契約）。但其 `hyperframes-*` / `remotion-*` / `create-video` / `flux-best-practices` 與**已安裝在 user-level 的同名 skills 大量重疊**。務必放在 `active/` 底下獨立 cwd，**絕不可放在 `d:\Claude` 根目錄**（會踩到與 `infra\skills-backup\` 同型的 project-level skills 被載入問題） |
| [[Github/repos/Remotion — 用 React 寫程式碼產生影片\|Remotion]] | 合成引擎之一；OpenMontage 在提案階段於 Remotion 與 HyperFrames 之間二選一並鎖定 |
| [[Github/repos/video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill\|video-shotcraft]] | 同賽道但層級不同：video-shotcraft 是單一 skill 包（鏡頭配方），OpenMontage 是整條產線 |
| institution 制度層 | 意外同構：「provider 選型必須可解釋 + 落選者一併記錄」≈ R13；「gated stage 未核可不得標記完成」≈ R17；「render 後強制 ffprobe + 抽幀 + 音量分析自檢」≈ 驗證不自驗。**但它自己的 issue 顯示這些 gate 有實作漏洞**——正好是「有規則 ≠ 規則有被執行」的活教材 |
| Obsidian | 無直接關聯 |

---

## 安裝建議

⏳ **觀望** — 專案品質高於同類（README 數字對帳全數屬實、治理設計有真材實料、77 個 pytest + 24 個 schema 契約），但對本環境有三個硬阻礙：

1. **Windows 原生路徑未驗證通過**——repo 上有具體回報「Windows + WSL2 花 6 小時、15 個可重現問題、無法產出成品」
2. **成熟度與版本治理**——0 release、148 open PR、多處寫死 model ID 已 404
3. **Skill 命名空間衝突**——48 個 `.claude/skills/` 與既有 user-level skills 大量重名

**升級條件（→ ✅ 裝）**：出現第一個 tagged release；**或**「Windows + WSL2 無法產出成品」issue 被關閉且附 Windows 端成品影片；**或**確定要做影片產出且願意改走 WSL2/Linux——此時它直接取代 `active/ai-video-pipeline`。

**放棄條件（→ ❌ 不裝）**：90 天內 commit 活躍度維持 0–5/週且 open PR 突破 200（單人量能已崩）；**或** 付費 Studio 上線後核心 pipeline 停止同步進 AGPL repo（開源側降級為引流殼）。

> [!tip] 📌 不必等就能抽取（不需安裝全套）
> - `lib/scoring.py` — 7 維加權 provider 選型 + `explain()` 可讀化，可搬進 career-ops / jobsmith 的來源選擇邏輯
> - `lib/delivery_promise.py` + `lib/slideshow_risk.py` — 「宣稱的交付物 vs 實際產出」自動落差偵測，是 R12「失敗大聲說」的可執行版本
> - `tools/base_tool.py` 的 Windows 防禦段（cp1252 降級表、行內註解 .env parser）— 本環境 `ENCODING-001/002` bug pattern 的現成解法參考

---

## 版本沿革

| 日期 | 規模 | 變化 |
|------|------|------|
| 2026-06-20 | 1,356 檔 / 2.3M tokens | 初次評估（📎 簡單留存） |
| 2026-07-30 | **1,887 檔 / 3.08M tokens** | +531 檔 / +0.78M tokens（4 週增幅 39%）；本次升級為 🔬 深度分析。新增：ink-theater SVG 角色系統、backlot 即時故事板、character-animation 與 documentary-montage pipeline、HyperFrames 雙 runtime。同期發現冒名散布事件與 Windows 未驗證通過 |

---

## 相關連結

- 本機專案：`d:\Claude\active\ai-video-pipeline`（定位重疊，OpenMontage 為其超集）
- [[Github/repos/Remotion — 用 React 寫程式碼產生影片\|Remotion]]
- [[Github/repos/video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill\|video-shotcraft]]
- [[Github/repos/video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架\|video-autopilot-kit]]
- [[Github/repos/seedance-2.0 — 導演式操作Seedance影片模型的Skill OS\|seedance-2.0]]
- [[Github/repos/ai-media-generator — 跨平台 AI 媒體生成 Prompt Skill|ai-media-generator]]
