---
source: "https://github.com/toufuim/personal-ip-brand-intro-skill"
author: "toufuim (FuFu AI Lab)"
stars: "14"
clipped: 2026-07-31
tags:
  - "github/repo"
  - "codex-skill"
  - "hyperframes"
  - "motion-graphics"
  - "personal-branding"
---

# personal-ip-brand-intro — 台灣創作者開源的「個人品牌開場動畫」Codex Skill

> 來源：https://github.com/toufuim/personal-ip-brand-intro-skill
> 授權：MIT｜⭐ 14｜建於 **2026-07-30（分析前一天）**，2 commits
> 規模：17 檔 / 11,572 tokens（2026-07-31 repomix 實測）
> 作者：FuFu（fufuailab.com——101 組 AI 字體提示詞庫＋台灣語音字幕工具；Threads @xiaochou.chou）

## 這是什麼？

給 Codex 用的 Agent Skill：輸入品牌名稱、定位與服務內容，產出 7 秒左右的個人品牌開場動畫（16:9 / 9:16 / 1:1），走 HyperFrames（預設）或 Remotion 渲染。

賣點不是程式碼（4 支小腳本），是**方法論**：強制每個品牌重建視覺系統、hard rule 禁止套模板、無音樂時自行設計 BPM 節拍表、渲染前必過分鏡確認閘門。

## 核心設計

- **三種視覺模式**：`text-illustration`（無圖可做，動態大字＋原創向量插圖）／`image-assisted`（用戶提供人像/IP/Logo）／`mixed`
- **雙節拍路線**：上傳音樂 → `$music-to-video` 分析重拍產 `audiomap.json` 對拍；**無音樂 → 依品牌個性自選 BPM 產靜音節拍表**——成品無聲但所有動態仍按節奏設計（全案最聰明的設計）
- **原創性強制**：七項「設計指紋」（構圖文法/字體個性/圖形語彙/主體處理/色彩邏輯/轉場家族/節奏行為）＋內部產三方向擇一；禁止沿用示範品牌任何元素
- **審批閘門**：先出視覺方向＋分鏡給使用者確認才渲染；`verify-render.mjs` 對成品 ffprobe＋抽幀驗證
- 依賴：Node.js、FFmpeg；跨 skill 引用 `$hyperframes`、`$music-to-video`、`$imagegen`

## 安全稽核（逐字掃過）

腳本唯二的 `execFileSync` 都以**陣列參數呼叫 ffprobe**（無 shell 拼接＝無注入面）；全 repo **零網路呼叫**、零 eval、零自動更新指令；SKILL.md 明文「不會搜尋、下載或偷偷替換網路音樂」「未經授權不發布/覆寫/正式渲染」。與 agentskill.sh 那種夾自動行為的 skill 是反例對照。`agents/openai.yaml` 僅 4 行介面宣告，無自動行為。

## 專案體質

單人（toufuim，0 followers，唯一公開 repo）、2 commits、0 issue/release。14⭐ 屬「發布首日」狀態，無從評價存續性。作者站台有實質內容，屬台灣 AI 創作者生態（與 AK-Threads-booster 的 akseolabs 同圈）。

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| HyperFrames 全家桶（已裝） | **直接可用的上層應用**——本 skill 是架在該引擎上的「導演層」，補的是品牌開場方法論，不是引擎 |
| Codex 雙 AI | 安裝目標 `~/.codex/skills/`；但 Agent Skills 格式與 Claude 相容，搬進 Claude skills 也能跑（`$hyperframes` Claude 側已有；缺 `$music-to-video` 就走無音樂路線） |
| 實際用途 | sanyoii.github.io 求職網站＋Threads 經營——7 秒品牌開場是現成素材需求，非假想場景 |
| 方法論同構 | 「分鏡確認才渲染」＝R17 審批閘門；「抽幀驗成品」＝驗證不自驗；七項指紋與 hallmark/design-taste 的 anti-slop 同題不同域 |

## 安裝建議

⏳ **觀望** — 內容品質高於星數（方法論完整、腳本乾淨），HyperFrames 引擎層已就緒。判 ⏳ 只因**目前沒有排上的品牌開場產出需求**——為「以後可能用」先裝是 R13 反面。

**升級條件（→ ✅）**：個人網站或 Threads 真的要做品牌開場動畫時（`$skill-installer` 一句話裝 Codex 側，或複製進 Claude skills 走既有 SOP）；**或** repo 三個月後仍維護且有實際使用案例。

**放棄條件（→ ❌）**：90 天零更新且無使用案例（單人日拋型 repo 常態結局）；**或** HyperFrames 生態自帶同等品牌開場範本。

> [!tip] 📌 不必安裝就能取用
> - `references/originality-rules.md` 的**七項設計指紋**——可抄進自己的設計類 skill 當 anti-template 檢核表
> - **「無音樂也要有節拍表」**思路（BPM 由品牌個性推導、靜音成品仍按節奏動）——對既有 hyperframes 產出普遍適用
> - `verify-render.mjs` 的「ffprobe＋抽幀驗成品」——與 OpenMontage 的 post-render self-review 同型，只有 60 行

## 相關連結

- [[Github/repos/video-shotcraft — 用 Remotion 拍電影感產品宣傳片的 AI Agent Skill\|video-shotcraft]]（同為導演層 skill，實拍質感 vs 品牌開場）
- [[Github/repos/calesthio-OpenMontage\|OpenMontage]]（重量級對照：整條產線 vs 單一開場）
- [[Github/repos/AK-Threads-booster — Threads 演算法寫文決策 skill\|AK-Threads-booster]]（同一台灣創作者生態）
- [[Github/repos/awesome-codex-skills A curated list of practical Codex skills for automating workflows across the Codex CLI and API\|awesome-codex-skills]]（可收錄候選）
