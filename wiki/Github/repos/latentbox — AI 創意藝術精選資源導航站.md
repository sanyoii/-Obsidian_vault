---
source: "https://github.com/latentcat/latentbox"
author: "latentcat"
stars: "2.2K"
clipped: 2026-07-02
tags:
  - "github/repo"
  - "design-resources"
  - "awesome-list"
---

## latentbox — AI、創意與藝術領域的精選資源導航站

> **latentcat/latentbox** | ⭐ 2,151 | 🍴 193 | 📝 CC BY-NC-ND 4.0（內容）
> "A collection of awesome-lists for AI, creativity and art. AI、创意和艺术领域的精选合集。https://latentbox.com"

---

### 一句話說明

latentbox 是由中國團隊 Latent Cat 維護的「重新構想的聚合站」——用 Next.js 打造成一個真正好用的網站，而非又一份 markdown 清單，把 AI 產品、生成藝術演算法、設計資源、Web3D、Unity 資源等領域中「真正好、會被打開試用」的精選項目，以分類瀏覽 + 視覺化樹狀圖等形式呈現，目標使用者是尋找高品質創意/AI 工具而厭倦傳統 awesome-list 純文字牆的人。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 2,151 |
| Forks | 193 |
| 主要語言 | TypeScript |
| 授權 | CC BY-NC-ND 4.0（內容授權，非典型程式碼開源——僅限非商業、禁止衍生） |
| 建立時間 | 2024-04-05 |
| 最後推送 | 2025-03-05 |
| Topics | ai, art, awesome-list, creative-coding, design, ui, ux |
| 首頁 | https://latentbox.com |
| 是否 Archived | 否（但最後推送已逾一年，活躍度偏低） |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 183 |
| 總 Tokens | 116,932 |
| 壓縮模式 | 是（--compress） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `public/assets/collections/awesome-ai-products/leonardo.svg` | 34,569 | 29.6% |
| `src/app/[locale]/(docs)/houdini-nodes/data.json` | 28,976 | 24.8% |
| `src/app/[locale]/(docs)/sd-ecology/data.json` | 7,131 | 6.1% |
| `public/assets/collections/awesome-ai-products/code-former.svg` | 6,507 | 5.6% |
| `LICENSE` | 3,805 | 3.3% |

（Top 2 大檔為資產/資料檔而非程式碼，顯示專案「重量」在內容資料而非邏輯複雜度）

---

### 核心功能

- **分類瀏覽的精選資源庫**：不做搜尋引擎式海量收錄，每個分類（Awesome AI Products、Stable Diffusion 生態、Digital Art Tools、Gen Art Algorithm 等）皆人工篩選
- **多元視覺化呈現**：部分分類用樹狀圖（`ProductTree.tsx`）、放射狀聚類圖（`RadialClusterTree.tsx`）取代純文字表格
- **雙語系統**：next-intl 完整英文/簡體中文雙語內容與 UI
- **結構化資料模型**：每個集合背後是型別化的 `ResourceItem[]`（id/name/url/desc/iconType），透過統一 View 元件（ListView / GalleryView / ProductView / PaperView）渲染
- **社群共創機制**：GitHub 開源 + Discord + 小紅書 + X，鼓勵透過 PR 直接貢獻收錄項目並掛名（all-contributors 機制，已列 25+ 貢獻者）
- **涵蓋領域廣泛**：AI（產品/論文/資料集/播客）、Art（數位藝術工具/MIDI 控制器/生成藝術演算法）、Design（設計資源/中文開源字型）、Web（Web3D/微信 SVG）、Dev、Game（Unity）、Visualization 等 8 大主題

---

### 技術架構

```
latentbox/
├── src/app/[locale]/
│   ├── (common)/              ← 首頁 Hero + 分類導覽區
│   └── (docs)/                ← 每個 collection 一個目錄
│       ├── awesome-ai-products/
│       │   ├── data.ts            型別化資料（ResourceItem[]）
│       │   ├── page.tsx           頁面渲染
│       │   └── ProductTree.tsx    專屬視覺化元件
│       ├── sd-ecology/
│       │   ├── data.json          大型資料檔（放射狀聚類圖用）
│       │   └── RadialClusterTree.tsx
│       └── ... (共 20+ 個分類目錄，各自獨立 data + view)
├── src/components/
│   ├── collection/             ← 通用檢視元件
│   └── ui/                     ← shadcn/ui（Radix 為底）
├── src/lib/
│   ├── data_types.ts            ResourceItem 核心型別
│   ├── docs_navigation.ts       導覽選單資料
│   └── server/mongodb.ts        MongoDB（動態數據，如 star 數）
└── messages/{en,zh}.json        next-intl 雙語文案
```

| 層次 | 技術 |
|------|------|
| Framework | Next.js 14（App Router，`[locale]` 動態路由做 i18n） |
| UI | Tailwind CSS + shadcn/ui（Radix UI 為底） |
| i18n | next-intl（英文/簡體中文） |
| 資料層 | 靜態 TypeScript/JSON 資料檔，部分動態數據走 MongoDB |
| 視覺化 | 自製樹狀圖 / 放射狀聚類圖元件 |

---

### 社群健康度（簡述）

貢獻者以核心維護者為主，README 另列 25 名貢獻者掛名。Issue 數量少（9 open），維護負擔不重，但最後 push 已逾一年，需留意近期活躍度。未使用 GitHub Releases 正式發版，持續部署到 latentbox.com。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 中度相關。性質上與 `wiki/AI-Prompts/` 收藏庫、`references/reference_web_tools.md` 等收藏型條目同類——都是「值得偶爾翻閱找靈感的資源庫」，可作靈感書籤，不需深度技術整合。 |
| **Claude Code** | 低相關。無 MCP、CLI、Skill 或可程式化介面，純瀏覽器導航網站，無自動化接口。 |
| **Automation** | 低相關。CC BY-NC-ND 4.0 授權（禁止衍生）限制了抓取其資料整合進自己系統的可能性。 |

---

### 安裝建議

❌ 不適合安裝 — 非可安裝工具/函式庫，是純瀏覽用的資源導航網站。內容授權為 CC BY-NC-ND 4.0，不建議抓取資料整合進自己的系統。建議用法：直接把 https://latentbox.com 加入瀏覽器書籤，作為尋找 AI/創意工具靈感時的參考站台。

---

## 相關連結

- 同類收藏型 wiki 條目：`wiki/AI-Prompts/`（AI Prompts 收藏庫，性質相近但無獨立索引頁可連結）
