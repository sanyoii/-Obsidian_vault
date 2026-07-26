---
source: "https://github.com/uiverse-io/galaxy"
author: "uiverse-io (Uiverse.io)"
stars: "11.7K"
clipped: 2026-07-26
tags:
  - "github/repo"
  - "ui-components"
  - "css"
  - "tailwind"
  - "design-assets"
---

# galaxy — Uiverse.io 開源 UI 元件庫鏡像

> **uiverse-io/galaxy** | ⭐ 11.7K | 🍴 812 | 📝 MIT
> "The largest Open-Source UI Library! Community-made and free to use. Made with either CSS or Tailwind."

---

## 一句話說明

galaxy 是 [Uiverse.io](https://uiverse.io/) 平台的**唯讀元件鏡像倉庫**：社群設計師在網站上投稿的 UI 元件（按鈕、卡片、loader、開關等），審核通過後自動同步到這個 repo，共 3,804 個獨立 HTML 檔，每檔一個元件（HTML 片段 + `<style>` 純 CSS 或 Tailwind class），MIT 授權可自由商用。目標使用者是想快速抄一個現成動效元件的前端開發者——但官方自己也說：瀏覽請去網站，repo 只是存檔。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 11,660 |
| Forks | 812 |
| 主要語言 | HTML（100%） |
| 授權 | MIT License |
| 建立時間 | 2023-10-01 |
| 最後推送 | 2024-09-02（**休眠約 22 個月**） |
| Open Issues | 11 |
| Open PRs | 3 |
| 最新 Release | 無 |
| Topics | community, css, tailwind, ui |
| 首頁 | https://Uiverse.io |
| 是否 Archived | 否 |

⚠️ **鏡像已過時**：官網現宣稱 5,800+ 元件，repo 只同步到 3,804 個（2024-09 停更），自動同步機制實質上已停擺。

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 3,804 |
| 總 Tokens | 4,351,924 |
| 壓縮模式 | 否（diskUsage 5.3MB） |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| Cards/Smit-Prajapati_stupid-bullfrog-39.html | 101,075 | 2.3% |
| Notifications/Praashoo7_ugly-walrus-48.html | 75,256 | 1.7% |
| Buttons/andrew-demchenk0_plastic-hound-41.html | 63,978 | 1.5% |
| Buttons/Praashoo7_mighty-warthog-35.html | 47,429 | 1.1% |
| Buttons/d3uceY_dry-gecko-28.html | 35,475 | 0.8% |

（單一元件吃到 10 萬 token = 內嵌 base64 圖或超長手刻 CSS，屬社群投稿品質不齊的側寫。）

---

## 核心功能

- **11 類元件分類**：Buttons（1,231）、Cards（726）、loaders（718）、Toggle-switches（260）、Inputs（226）、Forms（180）、Checkboxes（171）、Patterns（103）、Radio-buttons（102）、Tooltips（62）、Notifications（23）。
- **零依賴、單檔即用**：每個 `.html` 就是完整元件——HTML 片段 + `<style>` 區塊（約 3,370 檔）或 Tailwind class（約 600 檔），複製貼上即可用，無 build、無框架綁定。
- **命名即歸屬**：檔名格式 `{作者}_{形容詞-動物-數字}.html`，首行註解標明作者與 tags，MIT 下鼓勵但不強制署名。
- **網站端加值**：官網另提供 React/Figma 匯出、搜尋、視覺預覽、投稿審核——這些都不在 repo 裡。
- **不收 PR**：README 明言直接對 repo 的貢獻一律忽略，唯一入口是網站投稿。

---

## 技術架構

```
uiverse-io/galaxy（唯讀鏡像）
├── Buttons/ Cards/ loaders/ ... （11 分類目錄）
│     └── {author}_{codename}.html   ← HTML 片段 + <style> 或 Tailwind
├── LICENSE (MIT)
└── README.md
        ↑ 自動同步（已停擺於 2024-09）
Uiverse.io 網站（投稿/審核/搜尋/React/Figma 匯出）
```

| 層次 | 技術 |
|------|------|
| 元件 | 純 HTML + CSS（88%）/ Tailwind class（12%） |
| 倉庫 | 無 build、無 package.json、無 CI——就是靜態檔案堆 |
| 上游 | Uiverse.io 平台（閉源），repo 僅為輸出端 |

---

## 社群健康度（分析時快照）

- 貢獻者 Top 10 全是元件投稿者（vinodjangid07、Yaya12085 等），非維護團隊。
- 近 4 週 commit：0（API 回空；最後推送 2024-09）。
- Release：從未發過。
- 星數仍持續上漲（靠官網導流），但 repo 本身無維護活動——「高星 ≠ 活躍」的典型案例。

## 社群口碑（摘要，來源：WebSearch 替代 Exa）

- 口碑整體正面：daily.dev、Product Hunt 評價集中在「省時、免費、動效品質高、MIT 可商用」。
- 常見抱怨：導航/分類不好找、投稿品質參差（本次 Repomix 也實測到單元件 10 萬 token 的極端案例）。
- YouTube 有零星教學（最高約 9K 觀看），教學生態小而非主流——因為用法就是複製貼上，沒什麼好教。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 純資產庫，無方法論可萃取；本篇即足夠 |
| **Claude Code** | 與已裝 taste 群 skills（design-taste-frontend、high-end-visual-design 等）定位不同：那些是「設計判斷」，這是「現成零件」；但 AI 生成元件的能力已大幅弱化零件庫的價值 |
| **Automation** | 無 CLI、無 API、無 npm 套件；要程式化取用只能 clone 後自己 glob |

---

## 安裝建議

⏳ **觀望（不 clone）** — 設計資產賽道已飽和（awesome-design-md 73 套品牌、awesome-design-skills 67 風格、taste 群 skills 全裝），且此 repo 是**過時的唯讀鏡像**（停更 22 個月、落後官網 2,000 個元件）；需要元件時直接上 uiverse.io 搜尋複製，比 clone 一個 4.35M token 的靜態檔案堆合理。

- **升級條件（→ ✅）**：出現「離線批量餵 agent」的實際需求（如建本地元件靈感 RAG、批量抽 CSS 動效 pattern 訓練 taste skill）→ clone 當語料庫用。
- **放棄條件（→ ❌）**：repo 被官方 archive，或官網轉閉源/收費導致鏡像永久凍結 → 直接放棄，改用官網或其他元件庫。

---

## 相關連結

- [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫|awesome-design-md]] — 品牌級設計系統 vs 本篇的單元件零件
- [[Github/repos/awesome-design-skills — 67種美學風格的SKILL.md註冊庫|awesome-design-skills]] — 美學風格 skill 註冊庫，同屬設計資產賽道
- [[Github/repos/hallmark — 拒絕 AI 味的前端設計 Skill（結構多樣性＋防呆閘門）|hallmark]] — 設計判斷層；galaxy 是零件層
