---
source: "https://github.com/satnaing/shadcn-admin"
author: "satnaing (Sat Naing)"
stars: "13.3K"
clipped: 2026-08-06
tags:
  - "github/repo"
  - "frontend/react"
  - "ui/shadcn"
  - "admin-dashboard"
---

# shadcn-admin — Shadcn UI + Vite 打造的管理後台介面集合

> **satnaing/shadcn-admin** | ⭐ 13,292 | 🍴 2,076 | 📝 MIT
> "Admin Dashboard UI built with Shadcn and Vite."
> Demo：https://shadcn-admin.netlify.app/

---

## 一句話說明

這是一份用 Shadcn UI（TailwindCSS + Radix UI）＋ Vite ＋ TanStack Router 寫成的管理後台**介面集合**——10 多個已經做好的頁面（儀表板、任務表、使用者管理、聊天、五種錯誤頁、五個設定分頁、五個 Auth 頁），主打響應式、無障礙、亮暗主題、全域指令搜尋（Cmd+K）與 RTL 支援。作者在 README 明講「這不是 starter template」：它沒有後端、沒有真實 API、資料全是 faker 假資料，定位是「抄現成 UI 元件與版面」而非「開箱即用的專案骨架」。目標使用者是要自建後台、不想從零刻側邊欄／資料表／表單版面的 React 前端開發者。

---

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 13,292 |
| Forks | 2,076 |
| Watchers | 71 |
| 主要語言 | TypeScript（587KB／占程式碼 98%） |
| 授權 | MIT |
| 建立時間 | 2024-01-26 |
| 最新 Release | v2.2.1（2025-11-06） |
| Topics | admin-dashboard, admin-panel, dashboard, shadcn-ui, shadcn-admin |
| 首頁 | https://shadcn-admin.netlify.app/ |
| 是否 Archived | 否 |

> **活躍度判讀陷阱**：GitHub 首頁的 `pushedAt` 顯示 2026-07-21 看似很新，那其實是 dependabot 的 `axios-1.18.0` 分支。**main 停在 2026-06-11（dependabot bump），最後人工 commit 是 2026-04-21**，且距上一次 release 已 9 個月。只看首頁時間戳會高估此專案活躍度。

---

## 原始碼結構分析

> 初次分析時本機 `npx` 不可用故 repomix 未執行，改走 GitHub Trees + Contents API；npx 修復後（2026-08-06）已補跑 repomix 回填 token 數。兩組數據並列如下。

| 指標 | 數值 | 來源 |
|------|------|------|
| 總檔案數（含二進位） | 272（blob） | Trees API |
| 總體積 | 2,071,620 bytes（約 2.0 MB） | Trees API |
| repomix 打包檔案數 | 264（排除二進位／忽略項） | repomix |
| **總 Tokens** | **166,716** | repomix |
| 總字元數 | 665,637 | repomix |
| 副檔名分佈 | `.tsx` 206、`.ts` 28、`.json` 8、`.md` 7、`.png` 5 | Trees API |
| 測試檔 | 21 個 `*.test.ts(x)` | Trees API |

### 最大檔案 Top 5（依 Bytes，含二進位）

| 檔案 | Bytes | 佔比 |
|------|-------|------|
| `src/features/auth/sign-in/assets/dashboard-dark.png` | 461,766 | 22.3% |
| `src/features/auth/sign-in/assets/dashboard-light.png` | 450,987 | 21.8% |
| `public/images/shadcn-admin.png` | 279,656 | 13.5% |
| `pnpm-lock.yaml` | 236,298 | 11.4% |
| `src/routeTree.gen.ts`（TanStack 自動產生） | 26,801 | 1.3% |

### 最大 token 消耗檔案 Top 5（repomix）

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `src/routeTree.gen.ts`（自動產生） | 6,409 | 3.8% |
| `src/components/ui/sidebar.tsx` | 5,607 | 3.4% |
| `src/features/chats/index.tsx` | 2,819 | 1.7% |
| `src/hooks/use-table-url-state.test.ts` | 2,802 | 1.7% |
| `src/features/users/components/users-action-dialog.test.tsx` | 2,648 | 1.6% |

token 分佈非常平坦——最大檔僅占 3.8%，前五名合計 12.2%。這是元件庫型專案的典型形狀：沒有巨獸檔案，程式碼平均散在 264 個小檔裡。repomix 安全掃描亦回報「無可疑檔案」。

三張 PNG 就吃掉 57% 體積，扣掉圖片與 lock file 後真正的程式碼只有約 597 KB。最大的**手寫**原始碼檔是 `src/components/ui/sidebar.tsx`（21,910 bytes）——Shadcn 官方 sidebar 元件的客製版，也是本專案最常被抄走的單一檔案。

---

## 核心功能

- **10+ 個成品頁面**：Dashboard（Recharts 圖表 + Analytics 分頁）、Tasks（可篩選／批次操作資料表）、Users（新增／邀請／刪除／批次刪除對話框）、Apps、Chats、Help Center，外加 5 個錯誤頁（401/403/404/500/503）。
- **兩套 Auth 版面並存**：`(auth)` 群組是純 UI 的 Sign In／Sign In 2-Col／Sign Up／Forgot Password／OTP；`clerk/` 群組是真接上 Clerk 的可運作登入與 User Management（Clerk 為本專案贊助商）。
- **可折疊側邊欄 + 全域指令面板**：`app-sidebar` 從 `sidebar-data.ts` 單一資料源渲染多層導航；`command-menu.tsx` 以 cmdk 提供 Cmd+K 跳頁。
- **資料表工具組**：`src/components/data-table/` 抽出泛型的 column-header／faceted-filter／pagination／toolbar／view-options／bulk-actions 六件套，Tasks 與 Users 共用。
- **URL 即狀態**：自製 `use-table-url-state` hook，把分頁、全域搜尋、多欄位篩選（含陣列型）雙向序列化進 TanStack Router 的 search params——重整／分享網址後表格狀態不掉。這是本專案少見的原創邏輯（非 Shadcn 範例抄來）。
- **四層外觀客製**：ThemeProvider（亮／暗／跟隨系統）、FontProvider、DirectionProvider（LTR/RTL），加上 `config-drawer.tsx` 即時切換。
- **RTL 支援**：10 個 Shadcn 元件（alert-dialog／calendar／command／dialog／dropdown-menu／select／table／sheet／sidebar／switch）被改寫過以支援右到左排版。README 明列清單並警告：用 `shadcn CLI` 更新這些元件會覆蓋掉客製。
- **無障礙**：`skip-to-main` 跳過導航連結、Radix 底層的鍵盤與 ARIA 行為。

---

## 技術架構

```
                    main.tsx  ← StrictMode
                       │
      ┌────────────────┴─────────────────┐
      │  QueryClientProvider (TanStack Query v5)
      │    ├─ retry policy: 401/403 不重試, PROD 上限 3 次
      │    └─ queryCache.onError 全域攔截:
      │         401 → toast + authStore.reset() + 導向 /sign-in?redirect=
      │         500 → 僅 PROD 導向 /500 (避免打斷 HMR)
      ├─ ThemeProvider → FontProvider → DirectionProvider
      └─ RouterProvider (TanStack Router, 檔案路由)
             │
             └── routeTree.gen.ts  ← 由 @tanstack/router-plugin 自動產生
                    │
   ┌────────────────┼──────────────────┬──────────────┐
 (auth)          (errors)        _authenticated      clerk/
 純 UI 登入頁     401~503          ↓                  ↓
                              AuthenticatedLayout   真實 Clerk 驗證
                              (app-sidebar+header)   sign-in/sign-up/
                                   ↓                 user-management
                      dashboard / tasks / users /
                      apps / chats / settings / help-center
                                   ↓
                    src/features/<feature>/
                      ├─ index.tsx        (頁面)
                      ├─ components/      (該功能專屬)
                      └─ data/            (schema.ts + faker 假資料)
                                   ↓
              共用層：components/ui (Shadcn 66 檔) ·
                     components/data-table (泛型表格六件套) ·
                     components/layout · hooks · lib · stores
```

（語法格式：ASCII 架構圖）

| 層次 | 技術 |
|------|------|
| 建置 | Vite 8 + `@vitejs/plugin-react`，pnpm |
| 語言 | TypeScript ~6.0（`tsc -b` 於 build 前把關） |
| 路由 | TanStack Router v1（檔案式路由，`routeTree.gen.ts` 自動生成，`defaultPreload: 'intent'`） |
| 伺服器狀態 | TanStack Query v5（全域 error 攔截 + 401 自動登出） |
| 客戶端狀態 | Zustand（僅 `auth-store`，token 落 cookie）＋ React Context ×4（theme／font／direction／layout） |
| UI | Shadcn UI = TailwindCSS v4（`@tailwindcss/vite`，CSS-first）+ Radix UI 20 個 primitive |
| 表格 | TanStack Table v8 + 自製 `use-table-url-state` |
| 表單 | react-hook-form + zod v4 + `@hookform/resolvers` |
| 圖表 | Recharts v3 |
| HTTP | axios（僅用於錯誤型別判斷，專案內無真實 API 呼叫） |
| 測試 | Vitest v4 **browser mode**（Playwright Chromium 實跑瀏覽器）+ vitest-browser-react，21 個測試檔 |
| CI | GitHub Actions：lint → prettier check → 裝瀏覽器 → 跑測試 → build（knip 那步被註解掉） |

### 值得注意的架構決定

1. **Feature-folder 而非 type-folder**：`src/features/<name>/{index,components,data}` 就地放置，只有真正共用的才上提到 `src/components/`。81 檔在 features、67 檔在 components，切分乾淨。
2. **API 錯誤處理集中在 `main.tsx`**：401 觸發「清 token → 存當前網址 → 導去登入頁」的完整流程寫在 QueryCache 層，不散落各頁。這段可直接搬去自己的專案。
3. **Vitest browser mode 而非 jsdom**：21 個測試跑在真 Chromium 裡，CI 每次都要 `playwright install chromium --with-deps`，比 jsdom 慢，但對 Radix 這種重 portal／焦點管理的元件比較可信。
4. **`routeTree.gen.ts` 進版控**：27KB 自動產生檔被 commit 進 repo，fork 後改路由要記得它會被重新產生。

### ⚠️ 安全提醒（若要拿去改成真專案）

`src/stores/auth-store.ts` 把 access token 用 `document.cookie` 寫入，cookie 名稱寫死為字串 `'thisisjustarandomstring'`，且 `src/lib/cookies.ts` 的 `setCookie` **沒有 `Secure`、沒有 `SameSite`，也不可能有 `HttpOnly`**（JS 寫的 cookie 本質上拿不到 HttpOnly）。示範專案沒問題（根本沒有真 token），但直接沿用到有真實 JWT 的產品上就是 XSS 竊取 token 的入口。搬用時改成由後端下 `HttpOnly; Secure; SameSite` cookie。

---

## 社群健康度

| 指標 | 數值 |
|------|------|
| 貢獻者結構 | satnaing 283 commits、dependabot 13，其餘外部貢獻者皆 ≤2 → **bus factor = 1**，作者一人約 87% |
| Release 節奏 | 2025 下半年密集（v1.4.2→v2.2.1 五個版本），2025-11 之後零 release |
| Issue | 13 open / 54 closed；open 中數件 0 留言、最舊停在 2025-11 |
| 分支 | main + 2 個 dependabot 分支，無隱藏開發分支（已逐一比對最後 commit 日期） |

已知 open issue 皆為細節：`theme-color` meta 在「跟隨系統」下不更新、`/clerk` 頁按鈕錯位、設定頁表單過長時出現多餘捲軸。

作者自述的兩個限制：①客製過的 10 個 Shadcn 元件會與 `shadcn CLI` 升級衝突需手動 merge；②「這不是 starter template」——沒有後端、沒有 API 層。

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無直接關聯，僅作前端設計參考留存 |
| **Claude Code** | **間接高相關**。已裝的 [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫\|awesome-design-md]]、`ui-ux-pro-max`、`frontend-design` 等產出的是「風格指引」，本 repo 提供的是「可直接複製的實作」，兩者互補。`src/components/data-table/` 六件套與 `use-table-url-state` 是要 agent 生後台表格時的好 few-shot 參考。不適合裝成 skill（它是專案不是工具）。 |
| **Automation** | 無關聯。無 CLI、無 MCP、無可自動化介面。 |
| **既有專案** | 與 `active/ziwei/app`（Vite + React SPA）、`active/fate` 技術棧同族。ziwei 若要加後台管理／資料表，data-table 六件套可直接搬。 |

---

## 安裝建議

⏳ 觀望 — 不建議「安裝」（它不是工具也不是 skill，是一份要 clone 來抄的 UI 專案），但值得**加書籤當程式碼參考庫**。

三條理由：

1. **價值明確但一次性**：真正可搬用的是三塊——`components/data-table/` 泛型表格六件套、`hooks/use-table-url-state.ts`（URL 即表格狀態）、`main.tsx` 的 401 全域攔截流程。用到時再去抄，不需要常駐本機。
2. **維護風險已浮現**：bus factor = 1、9 個月沒發 release、近 90 天 main 只有 1 個 dependabot commit。它更像「已完成的作品」而非「持續演進的專案」——對「抄程式碼」影響不大，對「當長期依賴」影響很大。
3. **不能直接當產品骨架**：無後端、無 API 層、auth 是假的、cookie 寫法有安全問題（見上方警告）。

**升級條件（→ ✅ 實際 clone 使用）**：手上出現要做 React 管理後台的實案（例如 ziwei／fate／jobsmith 要加管理介面），且技術棧確定是 Vite + TanStack Router；屆時 clone 下來抄 data-table 與 url-state 兩塊，其餘自寫。

**放棄條件（→ ❌ 不再參考）**：①repo 轉為 archived；②Shadcn 官方 blocks 推出等價的 dashboard／資料表區塊（官方已在補 sidebar/dashboard，若覆蓋到資料表就沒必要繞道）；③再過 6 個月（即 2027-02）仍零人工 commit 且 open issue 持續無人回覆，代表與 Shadcn／Tailwind／React 新版的相容性會開始腐化。

---

## 本次執行限制（誠實揭露）

| 引擎 | 狀態 |
|------|------|
| gh API | ✅ 完整（含分支／貢獻者／commit 活躍度交叉驗證） |
| Repomix | ✅ **已補跑**（2026-08-06 修好 npx 後）— 264 檔 / 166,716 tokens；初次分析時因本機 npx/npm 遺失而改走 GitHub Trees + Contents API |
| defuddle | ❌ 未執行（初次分析時 npx 不可用）；Jina Reader 備援對 SPA demo 站僅回標題，無內容 |
| agent-reach 社群口碑 | ⚠️ 降級為 WebSearch，結果多為模板列表型內容農場，非一手開發者討論 |
| YouTube 教學訊號 | ❌ 未執行（yt-dlp 未驗證可用） |
| smart-explore AST | — 不適用（遠端 repo，非本地路徑） |

---

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/awesome-design-md — 73 套品牌 DESIGN.md 設計系統收藏庫|awesome-design-md]] — 品牌設計規範（風格層），與本 repo 的實作層互補
- [[Github/repos/galaxy — Uiverse.io 開源 UI 元件庫鏡像（3800+ CSS-Tailwind 元件）|galaxy]] — 單檔 CSS/Tailwind 元件庫，粒度比本 repo 更細
- [[Github/repos/open-slide — Agent 原生 React 簡報框架|open-slide]] — 同為 React 成品專案型參考
