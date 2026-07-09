---
source: https://github.com/emilkowalski/skills
author: emilkowalski
stars: 6.8K
clipped: 2026-07-10
tags: [github, repo, claude-code, skills, animation, design, frontend]
---

# emilkowalski/skills — Design Engineer 動效與 Apple 設計 Skill 合集

> 6.8K⭐ · 402 forks · MIT License
> Skills for Design Engineers.

一句話：Sonner/Vaul 作者 Emil Kowalski（前 Vercel、現 Linear）把自己多年動效與介面設計的職業判斷，濃縮成 4 個 Claude Code Skill，教 agent「該不該動、怎麼動、動多快、怎麼審查」。

## 專案概覽

| 項目 | 內容 |
|---|---|
| Repo | emilkowalski/skills |
| 作者 | Emil Kowalski（Sonner、Vaul 作者，曾任職 Vercel，現職 Linear） |
| Stars / Forks | 6,806 / 402 |
| License | MIT |
| 建立時間 | 2026-03-16 |
| 最近 push | 2026-07-09（活躍維護中） |
| Disk Usage | 81 KB（極輕量） |
| Contributors | 僅 emilkowalski 一人 |
| Releases | 無正式 release，靠持續 push 更新 |
| Homepage | https://emilkowal.ski/skill（連結至付費課程 animations.dev） |
| 安裝方式 | `npx skills@latest add emilkowalski/skills` |

## Repomix 深度分析

| 指標 | 數值 |
|---|---|
| 總檔案數 | 8（含 .gitignore/LICENSE/README） |
| 總 Tokens | 19,851 |
| 總字元數 | 86,426 |
| 安全掃描 | 無可疑檔案 |

### Top 5 檔案（按 Token 數）

| 排名 | 檔案 | Tokens | 佔比 |
|---|---|---|---|
| 1 | skills/emil-design-eng/SKILL.md | 6,105 | 30.8% |
| 2 | skills/apple-design/SKILL.md | 5,089 | 25.6% |
| 3 | skills/animation-vocabulary/SKILL.md | 2,905 | 14.6% |
| 4 | skills/review-animations/STANDARDS.md | 2,491 | 12.5% |
| 5 | skills/review-animations/SKILL.md | 1,921 | 9.7% |

## 核心功能——四個 Skill 逐一拆解

### 1. `emil-design-eng`（主力 Skill）

UI 打磨與動效決策的核心哲學，內容包括：

- **動畫決策框架**：先問「該不該動？」——依使用頻率分級（100+次/天的鍵盤操作絕不動畫；偶爾出現的 modal/drawer 才給標準動畫）。再問「目的是什麼？」（空間一致性/狀態指示/回饋/防止跳變），純粹「看起來酷」在高頻元素上直接否決。
- **Easing 決策樹**：進出用 `ease-out`；畫面內移動用 `ease-in-out`；hover 用 `ease`；恆速用 `linear`。強調絕不用 `ease-in`（會讓使用者最關注的那一刻感覺遲鈍），且內建 CSS easing 太弱，要用自訂 cubic-bezier。
- **時長表**：按鈕回饋 100–160ms、tooltip 125–200ms、dropdown 150–250ms、modal 200–500ms，UI 動畫一律 <300ms。
- **Spring 動畫**：何時用彈簧（拖曳動量、Dynamic Island 式「有生命感」元素、可中斷手勢），Apple 式 `{ duration, bounce }` 參數 vs 傳統物理參數 `{ mass, stiffness, damping }`。
- **元件細節**：按鈕 `:active` 用 `scale(0.97)`；絕不從 `scale(0)` 進場（改用 `scale(0.9-0.97)+opacity`）；popover 要 origin-aware（從觸發元素縮放，modal 例外維持置中）；tooltip 群組第二個以後跳過 delay；`@starting-style` 取代 `useEffect` mounted pattern。
- **效能規則**：只動 `transform`/`opacity`；CSS 變數掛在父層會觸發全子層 style recalc；Framer Motion 的 `x`/`y`/`scale` 簡寫不是硬體加速，要用完整 `transform` 字串；CSS 動畫在主執行緒忙碌時比 JS 動畫穩（Vercel dashboard 實戰案例）。
- **Sonner 六原則**：低摩擦 DX、預設值比選項重要、命名塑造識別、無形處理 edge case、用 transition 不用 keyframes、文件即產品。
- **審查格式強制**：規定必須輸出 Before/After/Why 三欄 markdown table，明確禁止用列表格式（附帶「錯誤示範」對照）。

### 2. `apple-design`

翻譯自 Apple WWDC 設計演講（主要是 *Designing Fluid Interfaces* 2018）的 17 條原則，核心主張：**介面感覺有生命，是因為動作從畫面當前值出發、繼承使用者手勢速度、向前投射動量、且隨時可被抓取反轉。**

涵蓋：response（消除延遲）、direct manipulation（1:1 跟手）、interruptibility（任何動畫必須可被打斷重定向，包含「brick wall」速度斷層的具體解法）、spring 參數表（Apple 官方數值：移動 damping 1.0/response 0.4，旋轉 0.8/0.4，抽屜 0.8/0.3）、velocity handoff 公式、momentum projection（Apple 原始 exponential-decay 投射公式，非教科書 v²/2a）、空間一致性、rubber-banding 公式、材質與景深（`backdrop-filter` 分層邏輯）、多感官回饋（因果性/協調性/實用性三原則）、reduced-motion 的三種獨立訊號處理、Typography（optical sizing/tracking/leading 隨字級反向縮放）、以及 *Principles of Great Design*（WWDC 2026）八大設計原則（Purpose/Agency/Responsibility/Familiarity/Flexibility/Simplicity/Craft/Delight）。內容密度高，是全庫最紮實的一份文件。

### 3. `review-animations`

專職審查 Skill（`disable-model-invocation: true`，需顯式呼叫），姿態是「預設攔下，通過需要理由」。定義十條不可妥協標準（正當性/頻率適配/易入曲線/300ms 上限/origin 正確性/可中斷性/GPU-only 屬性/無障礙/進出不對稱/整體協調），附帶「一眼揪出」escalation triggers 清單，以及修復優先順序（先刪除→再簡化→修 easing→修 origin→變可中斷→搬到 GPU→不對稱時序→潤飾→無障礙）。輸出格式固定為「Findings Table + 分級 Verdict + Block/Approve 明確裁決」，並要求 cite `file:line` 與精確數值（來自 STANDARDS.md）。是四個 skill 中設計最嚴謹的一個——把「code review」的方法論（非負判準、升級觸發、分級輸出）套用到動效審查上。

### 4. `animation-vocabulary`

反查詞典：使用者描述一種動態感覺（如「popover 好像從按鈕長出來」），回傳精確術語（Origin-aware animation）。收錄 60+ 術語，分十類（進出場/時序/變形/狀態轉場/滾動/互動回饋/緩動/彈簧/循環/質感/效能/原則）。用途是幫使用者/agent 精準下 prompt，不負責設計或實作，純命名查詢。

## 技術架構

```
emilkowalski/skills/
├── README.md                          # 專案簡介 + 安裝指令 + 4 skill 索引
├── LICENSE                             # MIT
└── skills/
    ├── emil-design-eng/
    │   └── SKILL.md                    # 主力：UI 打磨哲學 + 動畫決策框架
    ├── apple-design/
    │   └── SKILL.md                    # WWDC 設計演講翻譯（17 條原則）
    ├── review-animations/
    │   ├── SKILL.md                    # 審查 posture + 10 條非負標準 + 輸出格式
    │   └── STANDARDS.md                # 審查用精確數值/曲線參考表（被前者引用）
    └── animation-vocabulary/
        └── SKILL.md                    # 反查詞典（60+ 術語）
```

| 層次 | 說明 |
|---|---|
| 內容形態 | 純 Markdown Prompt 型 Skill，無程式碼、無依賴、無 build 流程 |
| 耦合設計 | `review-animations` 引用 `STANDARDS.md` 做精確值來源，避免 SKILL.md 本體過肥 |
| 觸發設計 | 3 個 skill 自動觸發（description 驅動），`review-animations` 刻意設 `disable-model-invocation: true` 需顯式呼叫，避免審查姿態干擾一般開發流程 |
| 知識來源 | 一手經驗（Sonner/Vaul/Vercel/Linear 實戰）+ Apple 官方 WWDC 內容再詮釋，非二手彙整 |

## 社群健康度

| 指標 | 數值 |
|---|---|
| Stars | 6,806（3 個月內從 0 到近 7K，成長極快） |
| Forks | 402 |
| Watchers | 37 |
| Open Issues/PRs | 0 / 0（單人維護，未開放協作模式） |
| 最近活動 | 2026-07-09 仍在 push |
| 授權 | MIT，無使用限制 |

## 與現有系統相關性評估

| 系統 | 重疊 / 增量評估 |
|---|---|
| Obsidian Vault | 純參考資料，可作為前端動效知識條目收錄；不涉及 vault 操作，無直接功能重疊 |
| Claude Code（本機已裝：design-taste-frontend / high-end-visual-design / web-design-guidelines / frontend-design / minimalist-ui / ui-ux-pro-max / css-animations / animejs / gsap / waapi） | **技術層 vs 決策層互補，非重複**：css-animations/animejs/gsap/waapi 教「如何用某個函式庫寫動畫」，本庫教「該不該動、動多快、用哪種 easing、審查標準是什麼」——後者是前者的判斷依據，目前本機技術 skill 群缺這一塊。apple-design 與 high-end-visual-design/design-taste-frontend 在「品味」層面有主題重疊，但 apple-design 獨有的手勢物理（可中斷性、velocity handoff、momentum projection 精確公式）是其他 skill 沒有的深度內容。review-animations 填補「動效專項 code review」的空白（現有 code-review skill 是通用型）。整體判斷：值得裝，複雜度極低（純 Markdown，81KB）。 |
| Automation | 不涉及自動化流程，純知識/審查型 Skill，無 hook/排程需求 |

## 安裝建議

✅ **建議安裝**

理由：
1. 內容品質高——來自 Sonner（13M+ 週下載）作者的一手實戰經驗與 Apple 官方演講的認真翻譯，非拼湊型內容。
2. 與本機既有前端 skill 群互補而非重複：填補「動效決策/審查標準」這塊技術 skill 缺的判斷層。
3. 體積極小（81KB，4 個純 Markdown skill），安裝成本趨近於零，複雜度換來的增量價值高（符合 R13 品味量化）。
4. `review-animations` 需顯式呼叫（`disable-model-invocation: true`），不會干擾日常流程，風險可控。
5. 唯一顧慮：single-maintainer、無 release tag，需注意上游變動；但 MIT 授權、內容穩定成熟，風險低。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
