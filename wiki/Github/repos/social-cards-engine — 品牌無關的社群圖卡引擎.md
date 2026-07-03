---
source: "https://github.com/DennisWei9898/social-cards-engine"
author: "DennisWei9898"
stars: "23"
clipped: 2026-07-03
tags:
  - "github/repo"
  - "claude-code-skill"
  - "social-media"
---

# social-cards-engine — 品牌無關的社群圖卡引擎

> **DennisWei9898/social-cards-engine** | ⭐ 23 | 🍴 4 | 📝 MIT
> "品牌無關的社群圖卡引擎：一套引擎、換 brand pack 就換風格；含知識型/迷因型獨立審核員。"

## 一句話說明

這是一個 **Claude Code Skill**（非傳統程式庫）：把任何主題或文章，透過「引擎（固定）＋ brand pack（換品牌就換風格）」的架構，經 HTML+CSS 模板 → Chrome headless 渲染成一排可直接發布的 IG/Threads/X/FB 輪播 PNG 圖卡，並內建兩位「找碴型」AI 審核員（carousel-joker / meme-joker）把關擴散體質，出圖前逐條 PASS/FAIL、禁止 LGTM。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 23 |
| Forks | 4 |
| 主要語言 | Python（HTML 次之） |
| 授權 | MIT |
| 建立時間 | 2026-07-01 |
| Topics | 無 |
| 首頁 | 無 |

## 核心功能

- **品牌無關引擎**：渲染邏輯（Python + Chrome headless）與視覺風格（brand pack）解耦，接哪個 pack 出哪個風格
- **Brand Pack 系統**：`brands/<brand>/brand.md`（色票/字體/尺寸/敘事 DNA）+ 對應 `render_template.py`
- **雙審核員（寫審分離）**：`carousel-joker`（知識型，五類硬規則）與 `meme-joker`（迷因型，H1-H10 幽默可判定要素 + 版權安全），皆預設有罪推定、禁止只誇不罵
- **對話式共創風格**：可選預設模板，或被 Claude 訪談 / 貼樣本自動萃取建立個人 brand pack
- **擴散規則內建**：對齊 IG 官方訊號權重（sends 私訊分享 > saves 收藏 > likes），封面/結構/速查卡皆圍繞轉傳率
- **4 平台文案產出**：出圖同時產 `social_captions.md`

## 技術架構

```
主題/文章 → 選 brand pack → HTML+CSS 模板 → Chrome headless 截圖
         → 4:5（1080×1350）PNG 輪播圖卡 → joker 審核（PASS/FAIL）→ 定版 + 4 平台文案
```

| 層次 | 技術 |
|------|------|
| 渲染 | Python subprocess + Chrome headless（無框架依賴） |
| 模板 | 純 HTML+CSS（navy / 暖色 Morandi / 暖大地 ELI5 / meme 四套起手式） |
| 品牌系統 | Markdown brand.md + 每品牌獨立 render_template.py |
| QA / 審核 | 兩個獨立 Claude sub-skill，rubric 硬規則而非主觀評分 |
| 擴散方法論 | `references/knowledge_carousel_rubric.md`（sends>saves>likes 權重） |

## 相關連結

- [[Tools/deck-ai-classroom|deck-ai-classroom]] — 你已裝的教育型社群圖文 Skill，輸出單頁可滾動 HTML；此工具輸出格式不同（多張可上傳 IG 的 PNG），兩者互補
- [[Tools/guizang-ppt|guizang-ppt]] — 同類雜誌風 HTML 簡報 Skill
- huashu-design（已裝）— 此工具官方建議搭配做版面 QA
- social-post（Hao0321，未裝）— 此工具擴散規則的來源，搭配可做到「產圖→審核→發文」全鏈路

## 安裝建議

**⏳ 觀望** — 與現有 `deck-ai-classroom`/`guizang-ppt` 有明確差異化（真正可上傳 IG 的 PNG 輪播而非單頁 HTML），但 repo 建立僅 2 天、單一貢獻者、零 Issue/PR/Release，缺乏長期維護訊號。若近期有實際 IG/Threads 輪播發文需求，可直接裝來試（安裝成本低、不影響現有工具）；否則先觀望作者後續釋出。

---
記錄時間：2026-07-03
