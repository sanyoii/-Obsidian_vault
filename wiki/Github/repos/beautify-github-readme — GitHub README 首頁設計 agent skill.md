---
source: "https://github.com/oil-oil/beautify-github-readme"
author: "oil-oil"
stars: "1.4K"
clipped: 2026-08-02
tags:
  - "github/repo"
  - "agent-skill"
  - "design"
  - "readme"
---

# beautify-github-readme — GitHub README 首頁設計 agent skill

> **oil-oil/beautify-github-readme** | ⭐ 1,417 | 🍴 95 | 📝 MIT
> "Design clear, theme-specific GitHub README homepages with SVG titles, real proof, and maintainable Markdown"

## 一句話說明

一套教 AI agent 怎麼把專案 README 首頁做得好看又不失實的 skill：產生 SVG 標題橫幅、要求放真實證據（實際截圖／程式碼／專案結構）而非行銷詞藻、並確保 Markdown 在 GitHub 的渲染限制下仍可維護。附一支手寫的 GIF 產生器腳本。目標使用者是要為自己的開源專案做門面、又不想弄成一堆徽章與空話的開發者。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 1,417 |
| Forks | 95 |
| 主要語言 | Python（22.5 KB，唯一語言） |
| 授權 | MIT |
| 建立時間 | 2026-07-13（約 3 週） |
| 最後推送 | 2026-07-27 |
| Open Issues | 1 |
| Open PRs | 2 |
| 最新 Release | 無任何 release |
| Topics | agent-skill, codex-skill, github-readme, readme-design, svg |
| 首頁 | 無 |
| 是否 Archived | 否 |

### Repomix 指標

| 指標 | 數值 |
|------|------|
| 指令／文件檔 | 16 個（SKILL.md + 8 份 references + agents/openai.yaml + 2 支 Python 腳本等，共約 40 檔含素材） |
| 程式碼 | 22.5 KB Python |
| diskUsage 落差 | 7.2 MB 中絕大多數是示範素材：兩份 hero.gif（3.7 MB）＋兩份 case-study PNG（1.1 MB） |

## 核心功能

- **SVG 標題橫幅設計規範**：什麼該放、什麼不該放，含對比度與深淺色模式相容性要求。
- **「真實證據」原則**：要求 README 放實際可驗證的東西（真實圖表、程式碼片段、專案結構），明文反對用行銷詞藻與裝飾性徽章充版面。
- **GitHub Markdown 限制知識**：針對 GitHub 渲染器的實際限制給規則（相對路徑光柵圖在 SVG 內不可靠、base64 內嵌會讓檔案過胖、應發布驗證過的 PNG/WebP 而非依賴渲染器行為）。
- **`scripts/render_motion_gif.py`**：手寫的 GIF 二進位格式解析器＋ffmpeg palettegen/paletteuse 兩階段流程，含 `ease_out_cubic` 等緩動函式與透明色處理。這是真實工程量，不是提示詞包裝。
- **同意閘門設計**：SKILL.md 與 `references/showcase-contribution.md` 明文禁止 agent 未經授權 commit／push／開 PR／加反向連結，並禁止把 attribution 當成交換條件。

## 技術架構

```
  SKILL.md（主指令）
    ├─ references/            8 份分項規範
    │    ├─ SVG 標題設計（對比度／深淺色模式）
    │    ├─ 真實證據原則（反行銷詞藻）
    │    ├─ GitHub Markdown 渲染限制
    │    └─ showcase-contribution.md（同意閘門：禁未授權 push/PR/backlink）
    ├─ agents/openai.yaml     Codex 相容宣告
    └─ scripts/
         ├─ render_motion_gif.py   手寫 GIF 格式解析 + ffmpeg 兩階段調色盤
         └─ （SVG → PNG 轉檔）      呼叫本地 renderer，list 形式參數
                │
                └─ 唯一依賴：Pillow
```

| 層次 | 技術 |
|------|------|
| Skill 指令層 | Markdown（SKILL.md + references/） |
| 相容宣告 | `agents/openai.yaml`（Codex skill 格式） |
| 工具腳本 | Python 3 + Pillow；外部呼叫 ffmpeg 與 SVG renderer |
| 素材 | 示範用 hero.gif / case-study PNG |

## 供應鏈與提示注入稽核

這是 agent skill——內容會被 LLM 當指令執行，所以稽核優先於功能介紹。本環境已有前例：某 skill 的 SKILL.md 內嵌四條自動行為指令（靜默自我更新、未經同意的網路 POST、把 package.json 送第三方 API）。

**逐字讀完全部指令檔 + 獨立 grep 比對，結果為五類皆無：**

| 檢查項 | 結果 |
|---|---|
| 指示 agent 執行網路請求（上報／評分回傳／自我更新／抓遠端腳本） | ✅ 無。`curl` / `wget` / `requests.*` / `urllib` / `fetch(` / `axios` 全數 0 命中 |
| 指示 agent 讀取並外送本地檔案（package.json／git config／環境變數／金鑰） | ✅ 無 |
| 安裝時自動執行／執行前自我更新 | ✅ 無。無安裝期腳本 |
| 隱藏指令（HTML 註解／零寬字元／base64） | ✅ 無。3 處 `<!--` 是 SVG 模板註解；3 處 `base64` 全是**勸阻**用法（建議不要 base64 內嵌大圖進 SVG） |
| 可疑的 shell 執行 | ✅ 無。9 處 `subprocess.run` 全是本地 ffmpeg／SVG renderer 呼叫，list 形式參數、無 `shell=True`、stdout 導 DEVNULL |

**依賴與命名**：唯一依賴 Pillow（PyPI 實查存在且維護中）。npm/PyPI 皆查無同名套件，無 typosquat 落點。無硬編碼金鑰。

**同意閘門反而優於既有壞案例**：這個 skill 主動明文禁止 agent 未授權 push/PR/backlink，也禁止拿 attribution 當交換條件——與本環境踩過的反面教材（強制自動評分回傳、無同意的網路 POST）方向相反。

## 星數有機性

3 週 1,417 star、watchers 僅 3，初看像刷星。實查後**傾向有機成長（中等信心）**：

- **「star:watcher 比例異常」的直覺不成立**。實測對照組跨度從 42:1（jwasham/coding-interview-university）到 **2,413:1**（punkpeye/awesome-mcp-servers，91.7K star 僅 38 watchers）。本 repo 的 474:1 落在正常區間內。清單型／話題型 repo 的 watcher 天生極低，此比值單獨不構成刷星證據。
- WatchEvent 時序（265 筆事件）：尖峰日跨 21/24 小時分散，無同秒／同分鐘叢集，非機器人特徵。
- 抽樣 30 個 stargazer 帳號：建立年份橫跨 2010–2026，repo／follower 分佈廣，僅 1 個時間點可疑。
- 18 筆 issue/PR 來自約 14 個不同外部帳號，含真實 bug 回報與 showcase 投稿——有人真的在用。

**結構性盲區（未解）**：GitHub events API 只能回溯到 2026-07-25，僅涵蓋 18.7% 的星數。**創建（07-13）到 07-25 之間、佔 81% 的成長軌跡無法查證**。推翻條件：若 GH Archive 逐時數據顯示該區間有單日爆量或同秒批次，本判定作廢。

## 社群口碑

Reddit / HN / X / 知乎 / V2EX 皆查無討論串，無法確認擴散管道。此為中性訊號——不加分也不扣分，但也代表沒有第三方使用回饋可參考。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低。工具類留存。 |
| **Claude Code** | **高，且填補空白**。現有設計 skill 群（design-taste-frontend、high-end-visual-design、hallmark、brand、minimalist-ui、redesign-existing-projects）全部針對網頁／App UI，**沒有一個處理 GitHub README 這個受限媒介**——GitHub Markdown 渲染器限制、SVG 深淺色模式相容、README 專屬的資訊架構都是獨立問題域。不是飽和賽道再一個。 |
| **Automation** | 低。人工調用型。 |
| **個人求職網站／作品集** | 直接相關。公開 repo 的 README 是作品門面，這個 skill 的「真實證據優先於行銷詞藻」原則與現有的「數字必有 resume 佐證」規則同源。 |

## 安裝建議

✅ 適合安裝

理由：稽核乾淨（五類注入行為全無、單一依賴、無安裝腳本、無外呼、無金鑰）、有真實工程含量（手寫 GIF 格式解析器）、填補現有設計 skill 群未覆蓋的 GitHub README 專項領域、體積極小（22 KB Python + Markdown）、MIT 授權。同意閘門設計比本環境踩過的壞案例更嚴謹。

**安裝時仍走既有 SOP**，不因稽核通過而省略：⓪ 逐字讀過來源檔案完整內容 + 查同名 skill → ① 備份區 → ② user-level skills → ③ marketplace → ④ commit + push。

**兩點保留**：
1. 3 週齡、零 release、無第三方討論——長期維護性未知。裝了之後若上游停更，內容本身仍可獨立使用（純 Markdown 規範），沉沒成本低。
2. 81% 的早期星數成長無法回溯。這不影響 skill 內容品質判斷，但代表「1.4K star」這個數字本身不宜當作品質背書。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Tools/taste-skill|taste-skill Anti-Slop 前端設計]]（既有設計 skill 群，領域不重疊）
