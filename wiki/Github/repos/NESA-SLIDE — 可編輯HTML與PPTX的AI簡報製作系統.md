---
source: "https://github.com/slidefirm/NESA-SLIDE"
author: "slidefirm"
stars: "73"
clipped: 2026-09-11
tags: [github/repo, presentation, codex]
---

# NESA-SLIDE — 可編輯HTML與PPTX的AI簡報製作系統

## 一句話說明

以七個專案Skills、共用設計資料及真正的HTML編輯器，製作圖片、HTML、圖片背景HTML與原生PPTX。建議獨立試用，尚不取代既有簡報工具；本次未正式安裝或製作新簡報。

## 專案概覽

2026-09-11公共GitHub API快照；固定commit `4b18b520c9488bc86771a12a0950bd3acfc1bfde`。

| 項目 | 數值 |
|---|---|
| Stars／Forks | 73／7 |
| 主要語言 | JavaScript |
| 授權 | MIT；素材仍須核對個別來源及THIRD_PARTY_NOTICES |
| 建立／最後推送 | 2026-08-28／2026-09-03 |
| Open Issues及PR合計 | 0 |
| 最新Release | v0.3.0，2026-09-02；main有後續提交 |
| 貢獻者 | API列slidefirm，23次貢獻 |
| Archived／Topics | false／空 |
| Repository size | 255906 KB，約250 MiB，非安裝後需求 |
| 官網 | https://slidefirm.github.io/NESA-SLIDE/ |

## Repomix 深度分析

Repomix 1.18.0，以固定來源快照執行`--compress`，輸出約64 MiB XML，處理階段顯示831個文字檔。Token計算長時間停在781/831，尚未取得正常完成狀態、總tokens與Top 5；不列完整通過。XML作定位，結論另讀原始檔核對。

實際數得36個Theme YAML、75個Layout YAML、43個style case YAML；主編輯器20,670行。53支Python scripts經AST解析無語法錯誤，但未建立完整呼叫圖。

## 核心功能

| Skill | 用途 |
|---|---|
| design-presentations | 設計方向與格式分流 |
| slide-outline-planner | 大綱、逐頁內容、講稿與layout mapping |
| generate-image-slide | 七階段YAML與圖片流程，需宿主生圖 |
| html-pattern-slide | 1920×1080可編輯HTML |
| html-image-slide | 圖片參與版型，文字與媒體分開 |
| slide-background-image | 逐頁量測、安全區、抽象背景與合成QA |
| ppt-builder | 原生文字、形狀、母片與版面 |

## 技術架構

```text
內容 → Art Direction → Theme／Layout／Composition
                      ├─ Image2 YAML → 宿主生圖
                      ├─ Python renderer → HTML editor → 儲存／匯出
                      └─ manifest → artifact-tool → PPTX修復／條件式PowerPoint收尾
```

Node>=22；直接開發依賴jszip 3.10.1、playwright 1.62.0；Python鎖定BeautifulSoup、matplotlib、Pillow、PyYAML。本輪未安裝這些專案依賴。

正式PPTX使用宿主`@oai/artifact-tool`；HTML編輯器另走PptxGenJS browser adapter。只有clone或npm安裝，不保證完整功能可用。[ppt-builder:141](https://github.com/slidefirm/NESA-SLIDE/blob/4b18b520c9488bc86771a12a0950bd3acfc1bfde/.agents/skills/ppt-builder/SKILL.md#L141)

HTML編輯器實作localStorage、檔案handle及showSaveFilePicker，不支援時退回下載副本；不可一概宣稱支援原檔儲存。[edit-mode.js:19425](https://github.com/slidefirm/NESA-SLIDE/blob/4b18b520c9488bc86771a12a0950bd3acfc1bfde/src/html-editor/edit-mode.js#L19425)

## 優點與風險

- 真正增量是可手動編輯的HTML及原生PPTX物件流程，超出純提示詞或靜態樣板。
- 設計與renderer分離；可共同使用內容，不把整頁截圖冒充原生可編輯PPTX。
- 有回歸腳本及Windows audit CI；上游歷史PASS仍不能當本輪證據。
- Artifact Tool未穩定保留背景／Surface時，規則要求PowerPoint finalizer；不能取得只能partial。[規則:164](https://github.com/slidefirm/NESA-SLIDE/blob/4b18b520c9488bc86771a12a0950bd3acfc1bfde/.agents/skills/ppt-builder/SKILL.md#L164)
- 巨型editor、規格與生成資產提高維護成本；專案Skills依賴相對路徑，不適合只搬七個SKILL.md到全域。
- Google Fonts及瀏覽器API有環境差異；字型、儲存重開、PPTX換行及圖表保真都須實測。

## 本次驗證

Windows／Git Bash、Node v24.19.0、Python 3.14.2；固定原碼、未裝專案依賴。

| 命令／方法 | 結果與界線 |
|---|---|
| node scripts/test_pptx_positioning.mjs | exit 0，位置與placeholder輔助函式 |
| node scripts/test_pptx_corner_radius.mjs | exit 0，圓角回歸 |
| node scripts/test_pptx_browser_export.cjs | exit 0；Node VM＋FakePptx，非真瀏覽器或真PPTX |
| Python ast.parse 53支 | 0語法錯誤，不證明依賴可用 |
| 完整audit／npm ci／Playwright QA | Not Run |
| 新簡報生成／PowerPoint／手機／畫面 | Not Run |

原始輸出：`D:/Codex/AI-一人公司/work/repo-intel/nesa-slide-20260911/verification.json`。GitHub CLI因設定權限失敗，改公共REST API。Defuddle CLI不存在；官方網站改用頁面讀取但被URL政策拒絕，未繞路。未取得正常Repomix退出碼。研究來源、API與XML留在上述task root。

## 社群健康度

約兩週的新專案、一名API列出貢獻者，有release與CI，尚不足以判定成熟。近四週commit統計回空物件；社群與YouTube因73 stars低於Skill門檻跳過，沒有獨立使用者評價證據。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Obsidian | 可用筆記作簡報內容來源，未建立直接同步 |
| Codex | 保留獨立專案，與現有pptx、ppt-master、html-ppt、guizang-ppt-skill並存 |
| Automation | 已有renderer與QA腳本，完整生圖／瀏覽器／PowerPoint仍依宿主 |
| 優先價值 | 製作後可編輯的HTML，而非再增加一組大綱Prompt |

## 安裝建議

⏳ 建議獨立專案試用，暫不作預設簡報引擎。先驗三頁繁體中文純HTML：編輯文字、儲存、重開；再驗PPTX文字／圖表可編輯、換行與圖片一致。本次只有研究快照與Wiki，沒有全域安裝、部署或Git提交。

## 相關連結

- [[Github/_index]]
- [[Github/repos/hugohe3-ppt-master]]
- [[Github/repos/bento — 塞進單一 HTML 檔的辦公套件（PowerPoint 替代品）]]
