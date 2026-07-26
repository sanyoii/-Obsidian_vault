---
source: "https://github.com/nyblnet/bento"
author: "nyblnet (The Bento authors)"
stars: "2K"
clipped: 2026-07-26
tags:
  - "github/repo"
  - "presentation"
  - "local-first"
  - "claude-code-plugin"
  - "single-file-app"
---

# bento — 塞進單一 HTML 檔的辦公套件

> **nyblnet/bento** | ⭐ 2,039 | 🍴 132 | 📝 MIT
> "Bento, the office suite that fits in a file"
> 官網：https://bento.page ｜ 最新版 v1.0.10（2026-07-25）

## 一句話說明

Bento 是一個「**檔案即軟體**」的簡報工具：一份 `.bento.html`（約 560 KB）同時是文件、編輯器、播放器與協作端，用瀏覽器打開就能編輯、簡報、寄給別人，收件者不需安裝任何東西。文件本體是檔案開頭一段**明文 JSON**，所以 AI agent 可以直接就地改檔——這是它同時打「local-first」與「AI-native」兩張牌的核心設計。

## 核心特性

| 功能 | 說明 |
|---|---|
| **Morph 簡報** | 相同 id 的元素在頁與頁之間補間（位置／尺寸／顏色／漸層）。複製一頁再重排，動畫自動生成 |
| **即時協作** | AES-GCM E2EE，金鑰只存在檔案裡不上伺服器；「持有檔案＝成員資格」，Rotate keys 即撤銷。自研 CRDT，含字元級文字合併 |
| **盲中繼** | 選配的 sync relay（Cloudflare Worker + Durable Objects）只看得到密文、連線時間、room key 雜湊 |
| **內建圖表** | 自研零依賴引擎（bar/line/pie/scatter），簡報中可 tooltip／zoom，長條圖變圓餅圖時資料會 morph |
| **AI 設計取向** | 文件是明文 JSON，agent 直接改 `.bento.html`；chatbot 走 `window.bento.loadDoc` 往返 |
| **簽章自我更新** | Release 用 ECDSA 簽章、app 內提示更新；更新是**寫出新檔**，舊檔留著當 rollback |
| 其他 | 講者視窗、註解、隱藏互動狀態、hover reveal、motion path、PDF 匯出、8 種 UI 語言 |

## 技術架構

```
.bento.html（單檔）
├── <script type="application/bento+json" id="bento-doc">  ← 明文 JSON 文件（AI 改這裡）
└── 壓縮後的 runtime shell（~560 KB）
        ├── model.ts     文件模型（唯一真相）
        ├── render.ts    單一 renderer：編輯畫布／縮圖／簡報共用
        ├── anim.ts      自研動畫引擎（morph 由 model 算，不看 DOM）
        ├── charts.ts    自研圖表引擎
        ├── sync/crdt.ts 自研 CRDT（scripts/test-sync.ts 跑數十萬次收斂檢查）
        └── save.ts      File System Access API 自我改寫，失敗退回下載
```

| 層次 | 技術 |
|---|---|
| 建置 | Vite 7 + TypeScript 5.8 + `vite-plugin-singlefile` → `npm run build:single` |
| 執行時相依 | reveal.js 5（只做導覽）、moveable、selecto、temml（數學式）——動畫／圖表／CRDT 全自研 |
| 後端（選配） | Cloudflare Workers：`sync-worker`（盲中繼）、`guestbook-daemon` |
| 平台 | 141 檔／約 115 萬 tokens；含 iOS `BentoHost` Xcode 殼；`spaces`（筆記）、`dash`（表格）規劃中 |

最大 token 檔是 `ios/BentoHost/Resources/starter.bento.html`（40.6 萬 tokens，35.3%）——就是被打包進去的成品範例檔本身。

## 對本機環境的相關性

**這是本 repo 最直接的價值：它自帶 Claude Code plugin marketplace。**

- `.claude-plugin/marketplace.json` 定義 `bento-slides` plugin
- `plugins/bento-slides/skills/bento-slides/SKILL.md` 是一支完整 skill：**從零開始也能用**——它自己 `curl` 下載最新 Bento app 當空白容器，再照 `bento.page/agents.md` 的 schema 寫入文件 JSON
- 安裝：`/plugin marketplace add nyblnet/bento`（HTTPS 形式，符合本機既有 SOP）

與既有簡報 skill 的分工：`guizang-ppt`／`html-ppt`／`deck-ai-classroom` 產出的是**靜態 HTML**（給人看、不能再編）；Bento 產出的是**可交付給別人繼續編輯＋可正式簡報**的單檔（morph、講者視窗、PDF 匯出）。定位不重疊，屬補位不是替換。

## 專案健康度

| 指標 | 數值 |
|---|---|
| 建立時間 | 2026-07-17（本文撰寫時僅 9 天） |
| 貢獻者 | nyblnet、YishenTu（2 人） |
| Release | v1.0.6 → v1.0.10，一週內 5 版 |
| 近 4 週 commit | 0 / 122 / 215 / 35 |
| Issue | 9 open / 7 closed，多為功能請求（雷射筆、Android/iOS port、韓文翻譯） |

## 社群評價（2026-07 Show HN）

Show HN 拿到 **1,019 points / 238 則留言**（[HN #49008211](https://news.ycombinator.com/item?id=49008211)），GIGAZINE 等媒體跟進報導。

- **正面**：反覆被類比為 TiddlyWiki 與 **HyperCard** 的精神繼承；「560 KB、拿到就不用再連網」被視為最強賣點；作者本人在串上高密度回覆並當場認 bug
- **負面／已知問題**：mobile Safari 捏合縮放會讓框選錯亂甚至讓頁面崩潰；協作時收到更新會**搶走文字元素的焦點**（作者已列入待修）；直播協作中的 undo 是 snapshot-based，可能回捲協作者的並發編輯
- **信任面質疑**：有人指出 GitHub 帳號是為此專案「一週前新建」，缺可查的維護／安全紀錄——這串在文章寫作時未見作者回覆
- 有人希望改用 Nostr relay 取代 Cloudflare 依賴

## 已知風險

1. **專案極新**：9 天、2 人、無長期維護紀錄；作者帳號新建（HN 上被公開質疑）
2. **自我更新即自我改寫**：功能雖有 ECDSA 簽章＋雜湊＋版本單調性驗證，但「檔案會重寫自己」本質上就是一個要信任的執行面
3. **持有檔案＝成員資格**：協作模型沒有身分層，`.bento.html` 外流等同房間外流（作者自承「presence names 是宣稱不是證明」）
4. **編輯體驗桌機優先**：手機能看能播，編輯不行

## 相關連結

- [[Github/_index|GitHub Repo 索引]]
- [[Tools/taste-skill|taste-skill 前端設計 skills]]
- 官方 agent 指南：https://bento.page/agents.md
- Show HN：https://news.ycombinator.com/item?id=49008211
