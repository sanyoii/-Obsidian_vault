---
source: "https://github.com/romanticamaj/promptasy"
author: "romanticamaj (Gary Hsieh)"
stars: "27"
clipped: 2026-08-15
tags:
  - "github/repo"
  - "prompt-engineering"
  - "learning/tutorial"
---

# promptasy — 遊戲化 Prompt Engineering 學習世界

> **romanticamaj/promptasy** | ⭐ 27 | 🍴 6 | 📝 MIT（原始碼；素材另行授權）
> "A browser game to learn prompt engineering by playing — explore a world and solve challenges by writing prompts. Techniques from OpenAI, Anthropic, Google & xAI, each cited."

---

## 一句話說明

Promptasy 是一個無 backend、可離線計分的繁體中文 browser game，把 Prompt Engineering 拆成 12 個區域、130 座教學神廟與 12 個應用關。你連結的 `prompt-engineering-master-list.md` 是其知識來源中樞：4,126 行、17 章、292 個去重技巧條目，並保留廠商文件出處、使用方式、適用限制與追溯表。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 27 |
| Forks | 6 |
| 主要語言 | JavaScript 75.3%（HTML 18.6%／CSS 6.1%） |
| 授權 | 原始碼 MIT；字型 OFL-1.1；音樂／音效依 `public/LICENSE.md` 另行授權 |
| 建立時間 | 2026-07-30 |
| 最後推送 | 2026-08-05 |
| Open Issues | 0（歷史 closed 2） |
| Open PRs | 0（歷史 closed 1） |
| 最新 Release | v1.1.0（2026-08-03） |
| Topics | education, game, gamification, llm, prompt-engineering, threejs, webgl, learn-prompting |
| 線上版 | https://garyhsieh.com/promptasy（README 提供；GitHub homepage 欄位為空） |
| 是否 Archived | 否 |

GitHub 將 license 顯示為 `Other`，不代表沒有授權：根目錄 `LICENSE` 是 MIT，但特別註明 bundled assets 不包在 MIT 內，因此需同時讀取 `public/LICENSE.md`。

---

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 119 個文字檔（checkout 共 169 個檔案；Repomix 排除 binary assets） |
| 總 Tokens | 1,508,921 |
| 壓縮模式 | 是（GitHub `diskUsage` 77,553 KB） |
| Security Check | Repomix 未偵測到可疑檔案；這不等同完整 security audit |

### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `reference/prompting-crystal.html` | 221,789 | 14.7% |
| `docs/prompt-engineering-master-list.md` | 134,619 | 8.9% |
| `src/data/flows.json` | 134,561 | 8.9% |
| `src/data/challenges.json` | 117,062 | 7.8% |
| `docs/history/progress.md` | 77,352 | 5.1% |

`prompt-engineering-master-list.md` 的實體大小約 444 KB，本輪重算為 292 個編號條目與 276 個全檔 unique URLs。檔內自述的 257 個「出處欄」unique URLs 是更窄的子集，兩個數字不應混用。

---

## 核心功能

- **遊戲化課程**：12 區、130 座一廟一技巧的教學神廟，加 12 個只複習已學技巧的應用關。
- **離線 rubric engine**：81 個可複用 checks，以結構與雙語 patterns 判斷，不呼叫 LLM、不需 backend 或帳號。
- **多種互動題型**：石碑刻印、排序、修復、找缺陷、歸納、取捨、constraint gauges、tool dispatch 等共 11 種 board，共用同一評分引擎。
- **可追溯內容層**：legacy 68 技巧、v2 130 skills、game-authored 翻譯／coach／glossary 分檔存放，減少「自寫摘要冒充官方原文」的風險。
- **Prompt Engineering Master List**：將 493 個來源編號去重成 292 個技巧，每條有使用方式、出處與注意事項，並建立正向／反向追溯。
- **本地優先 runtime**：Three.js 程序式世界、localStorage 存檔、self-hosted fonts、音檔失敗時 Web Audio synth fallback，無外部 runtime requests。

### Master List 的證據邊界

這份 master list 的內部稽核很有紀律：條目 1–292 無跳號，493 個來源編號都有追溯列，並全量檢查廠商網域一致性。但「目前仍準確」不可由結構完整性直接推得：檔內明示只實打 32/257 個出處 URL（12.5%），只深度人工抽查 25/493 個來源對應（5.1%），而且未重新擷取全部官方原文。本輪 repo-intel 也沒有獨立重驗全部 276 個 URLs，因此它是高品質的 source map，不是永不過期的權威快照。

---

## 技術架構

```text
docs/promptbooks/* + official source URLs
                    ↓ 去重／追溯
docs/prompt-engineering-master-list.md
                    ↓ 資料層投影
curriculum.json + skill-codex-v2.json + authored zh/coach/flows
                    ↓
challenges/catalog.js + checks.js + rubric.js
                    ↓
prompt/* 11 種互動 board → progression/* → save/localStorage
                    ↓
main.js orchestration → Three.js world/player + UI + Web Audio
```

| 層次 | 技術／責任 |
|------|------|
| Content research | Markdown promptbooks、master list、source-anchor audit |
| Data model | JSON curriculum、skills、challenges、flows、regions、glossary |
| Scoring | Vanilla JS rubric/checks，雙語 heuristic，無 model call |
| Interaction | Vanilla JS modules，11 種 prompt boards，keyboard-first UI |
| World | Three.js r170，程序式地形／物件，WebGL |
| Persistence | localStorage + migration/normalize |
| Audio | Howler/Web Audio，m4a 素材 + synth fallback |
| Build | Vite 6，ES modules，static deployment |

`src/main.js` 是直接 orchestration root，會一次 import 大量 JSON 與 UI/world modules。這使架構直觀，但也反映在生產 bundle：主 JS 為 2.31 MB（gzip 664 KB），Vite 已發出 >500 KB chunk warning。

---

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | GitHub contributors API 僅列 `romanticamaj`；commit author 主要顯示 Gary Hsieh | 單人主導，bus factor 高 |
| Commit activity | 2026-07-30 至 08-05 共 70 commits | 短期衝刺極活躍，但專案年齡太短，無法判斷長期維護 |
| Release | v1.0.0（08-01）、v1.1.0（08-03） | 建立初期發版密集；尚未形成週期 |
| Issue open/closed | 0 / 2 | 樣本過少 |
| PR open/closed | 0 / 1 | 外部貢獻生態尚未形成 |
| 最後 push | 2026-08-05 | 截至 2026-08-15 已 10 天無新 push，對兩週齡專案不應過度解讀 |

---

## 社群口碑

此專案僅 27 stars，未達 repo-intel 的 1,000-star 社群搜尋門檻，因此本輪未啟動 Reddit／X／外部評測與 YouTube 教學訊號。不應把「沒有搜到負評」解讀為已獲得社群驗證。

---

## 驗證與已知風險

| 驗證 | 本輪結果 |
|------|------|
| `npm ci --ignore-scripts` | 成功；安裝 26 packages |
| `npm run test:playtest` | 通過：2,372 assertions |
| `npm run build` | 通過：86 modules，已產生 `dist/` |
| `npm run test:rubric` | **失敗**：79,453 通過、724 失敗 |
| `npm run test:e2e` | 本輪未跑；README 估 25–40 分鐘且需 system Chrome |
| `npm audit` | 1 high：`vite@6.4.3 → postcss@8.5.23 → nanoid@3.3.16`，`GHSA-2v37-7h3g-55p8`，fix available |

### 1. Windows 測試 harness 不可攜

724 個 rubric failures 不是 724 個獨立內容錯誤，而是同一個 CRLF 根因的 cascade：

- 當前 Windows Git system config 是 `core.autocrlf=true`，repo 沒有 `.gitattributes`。
- Git blob 中 `src/data/curriculum.json` 的 SHA-256 為測試期待的 `53b0ca...9062`；checkout 轉成 CRLF 後變為 `aa0773...05f`。
- master list 的 Git blob 全為 LF，Windows checkout 全為 CRLF；parser 用 `masterMd.split('\n')` 後直接套 `/^### (\d+)\. (.+)$/`，行尾殘留 `\r`，因此 292 個條目被解析為 0。

這是已驗證的 cross-platform test defect，不是本輪修正範圍；它也意味著 README 的 rubric 全綠宣稱不是當前 Windows checkout 可複現證據。

### 2. Dependency 與 bundle

- `nanoid@3.3.16` 是 transitive dev/build dependency，advisory 條件是 custom generator 使用 size 0 可能無限迴圈；未在遊戲原始碼看到直接呼叫，但 lockfile 仍應更新到有修正的版本。
- 靜態 build 可成功，但 2.31 MB 主 chunk 顯示尚無 code splitting；對網頁遊戲可能影響首次 parse／execution。

### 3. 文件 drift

- `public/LICENSE.md` 前文說「十二首配樂（開場＋十一區）」，同檔後文又說 wards 仍是 synth-only；但表格、README 與實際 build 都已包含 `bgm_wards.m4a`，實際是開場＋12 區共 13 首。
- master list 標題寫「九家廠商」，但其 audit log 列出的 source sets 與 README 都是 10 vendors；不影響條目追溯，但是小型編輯 drift。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 主要價值是作為可搜尋的 Prompt Engineering source map。但 444 KB 單檔過大，應保留為參考庫，不要每次整份塞入 context。 |
| **Codex** | 可用來核對 prompt/agent 規則的一手出處，尤其 tool use、approval boundary、grounding、eval 與 migration 章節。適合 on-demand 檢索，不適合整包改寫成全域 Skill。 |
| **Automation** | 最可借鏡的是 source-anchor audit、追溯表與 data integrity tests；但導入自動化前應先修正 CRLF portability，並將官方 URL 健康檢查改成週期性。 |

---

## 安裝建議

❌ **不建議當成本機工具安裝；📌 適合留存參考。**

你連結的 master list 值得保留：結構完整、追溯意識強、對「找不到一手出處」有誠實標記。但 Promptasy 本體是靜態教學遊戲，不會為現有 Codex／Obsidian 工作流增加新的執行能力；直接玩 hosted version 或閱讀指定章節即可。若要 self-host，建議先等上游補 `.gitattributes`/測試 newline normalization、更新有 advisory 的 transitive dependency，並將 13-track 授權文件同步。

---

## 相關連結

- [GitHub repository](https://github.com/romanticamaj/promptasy)
- [Prompt Engineering Master List](https://github.com/romanticamaj/promptasy/blob/main/docs/prompt-engineering-master-list.md)
- [v1.1.0 release](https://github.com/romanticamaj/promptasy/releases/tag/v1.1.0)
- [[Github/repos/prompt-master|prompt-master]]
- [[Tools/repo-intel|repo-intel Skill]]

---

## 延伸操作

- 完整架構圖譜：`/understand`
- 搜尋特定 symbol：`/smart-explore`
- 比較類似專案：對另一個 repo 執行 `/repo-intel`
