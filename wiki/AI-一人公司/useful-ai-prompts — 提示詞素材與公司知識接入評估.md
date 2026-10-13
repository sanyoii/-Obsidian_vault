---
source: "https://github.com/aj-geddes/useful-ai-prompts"
author: "aj-geddes (AJ Geddes)"
stars: "340"
clipped: 2026-09-20
tags:
  - github/repo
  - ai-company
  - prompt-library
---

# useful-ai-prompts — 提示詞素材與公司知識接入評估

## 一句話說明

這是提示詞、Claude Code Skills 與 Bash hooks 的合集，適合按需挑選文件方法作參考。對目前一人公司最有用的是文件分型、明確輸入與適用範圍；不建議整包安裝或直接匯入正式知識庫。

## 專案概覽

查核日期：2026-09-20。原始碼固定於 `3f5182cfd739fc113f4af5244a1cf342ad7f7911`，不是以浮動 main 作驗收基準。

| 項目 | 查核結果 |
|---|---|
| Stars | 340 |
| Forks | 55 |
| 主要語言 | GitHub API 標示 Shell；內容主體是 Markdown 提示詞與技能文件 |
| 授權 | 根 LICENSE 為 MIT；package.json 卻標 ISC，標示不一致 |
| 建立時間 | 2025-06-08 |
| 最後推送 | 2026-03-04 08:20:59 UTC |
| Archived | false |
| Open Issues／PRs | 分開計數為 1／1；API open_issues_count=2 包含 PR |
| Release | API 回傳空陣列，未找到正式 Release |
| 維護 | contributors 回傳 aj-geddes 324、claude 19 次 contributions；這是帳號統計，不代表兩位獨立人工審查者 |
| 最近四週 | 從 2026-08-23 起查詢預設分支 commits，回傳 0 |
| Homepage | repository metadata 未設定；README 另連 GitHub Pages 網站 |

來源：[GitHub API](https://api.github.com/repos/aj-geddes/useful-ai-prompts)、[固定版本](https://github.com/aj-geddes/useful-ai-prompts/tree/3f5182cfd739fc113f4af5244a1cf342ad7f7911)、[LICENSE](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/LICENSE)、[package.json](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/package.json)。數字為本次 API 快照。

## Repomix 深度分析

GitHub CLI 因讀取本機 config.yml 時 Access is denied，exit 1；改用公開 GitHub REST API 與固定 SHA 的 codeload ZIP。未使用登入憑證。下載原始碼供分析，不代表安裝其 Skills 或啟用 hooks。

Repomix v1.18.0 對固定原碼打包，exit 0，未壓縮。npm cache、temp 與輸出均限制在本次工作資料夾。

| 指標 | 結果 |
|---|---:|
| codeload 檔案數 | 3,640 |
| Repomix 打包檔案數 | 3,635 |
| Tokens | 4,217,790 |
| 字元數 | 19,193,366 |
| prompts 下非 README Markdown | 679 |
| prompts 第一層分類 | 47 |
| skills 下 SKILL.md | 259 |
| hooks | 7 個目錄，其中 6 個有 hook.sh；pre-commit-linting 只有 README |

最大檔案：docs/PROMPT-INDEX.json 與根 PROMPT-INDEX.json 各 135,306 tokens；docs/assets/data/search-index.json 48,145；docs/assets/css/main.css 18,265；system-prompts/claude-system-prompt.md 12,836。

Repomix 排除兩個觸發敏感字串偵測的檔案：hooks/security-scan/hook.sh 與 prompts/technical/devops/cicd-pipeline-optimizer.md。此偵測不是防毒掃描，也不能據此判定真實密鑰外洩或惡意程式；本輪未驗證字串真偽，不複製疑似敏感值。打包檔並非所有原碼的完整安全審查。

## 核心功能

1. **任務提示詞**：以情境、輸入、步驟、交付規格及品質條件組織工作，涵蓋文件、客服、研究、管理與開發。
2. **Skills 參考**：技能入口搭配 references，按需要讀取較長範例；包含架構圖、無障礙、API 與部署等題目。
3. **hooks 範例**：自動格式化、依賴／安全檢查、測試與 session setup。這部分含實際 shell 命令，不能視為純文字提示詞。
4. **目錄與網站**：Python 建立 JSON 索引並轉換 Jekyll 網站內容，方便搜尋與瀏覽。

來源：[README](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/README.md)、[skills](https://github.com/aj-geddes/useful-ai-prompts/tree/3f5182cfd739fc113f4af5244a1cf342ad7f7911/skills)、[hooks](https://github.com/aj-geddes/useful-ai-prompts/tree/3f5182cfd739fc113f4af5244a1cf342ad7f7911/hooks)。

## 技術架構

```text
prompts/**/*.md ── update_prompt_index.py ── PROMPT-INDEX.json
       │
       └─ convert_prompts_to_jekyll.py ── docs/_prompts/
skills/*/SKILL.md + references/ ─┐
hooks/*/README.md + hook.sh ────┴─ convert_skills_hooks_to_jekyll.py
                                      │
                                docs/ 的 Jekyll 網站
```

這個 repository 主要提供文字方法、網站建置腳本與 hooks。本輪未找到可取代公司既有工作台的任務執行後端；它也不會自動替公司完成「回饋→改稿→存檔→驗收」接線。

來源：[索引腳本](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/update_prompt_index.py)、[提示詞網站轉換](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/convert_prompts_to_jekyll.py)、[Skills／hooks 網站轉換](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/convert_skills_hooks_to_jekyll.py)。本次是原碼文字與結構抽查，沒有 AST 證據。

## 品質與採用風險

### 1. 文件數量與品質宣稱需分開核對

README 宣稱 488+ prompts、260+ Skills。固定原碼實數為 679 份非 README 提示詞、259 份 SKILL.md。JSON 索引有 679 筆且 file_path 無重複，與本次提示詞路徑集合完全相符。代表索引盤點可用，但 README 已落後，數量不能當作品質背書。

### 2. CI 並沒有驗證 README 列出的全部 11 項品質要求

`.github/workflows/validate.yml` 的 prompt schema 檢查只查四個指定章節字串與 H1 標題。其他工作是 Prettier、Jekyll build 與索引日期提醒；日期過期只警告。

本輪獨立重現相同五項結構條件，679／679 通過。這不會驗證內容正確、輸出有用、沒有重複、範例能執行，或使用者可以完成任務。package.json 的 npm test 是直接 exit 1 的預留命令。本輪沒有把結構通過當成提示詞效果通過。

來源：[CI 原碼](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/.github/workflows/validate.yml)。

### 3. 部分提示詞會帶入不合本公司的預設

- onboarding-experience 預設 email＋產品內引導，並帶入 SaaS 轉換／留存視角；本公司入門說明不需要因此多建寄信與追蹤流程。
- feedback-implementation 預設中型組織 100–500 人，重點是管理者、文化與 360 度回饋，不是使用者逐段改稿。
- documentation-writing 的固定輸出列 API reference 等章節；寫一般開始使用說明時，應刪去不適用章節，不能為符合模板而灌水。
- knowledge-base-builder 明確以客戶自助文件為對象，排除內部 agent SOP；名稱含 knowledge base，不代表可以直接拿來管理公司方法庫。

來源：[入門體驗](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/prompts/customer-focused/onboarding-experience-expert.md)、[回饋制度](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/prompts/learning-development/feedback-implementation-expert.md)、[文件撰寫](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/prompts/creation/documentation-writing-expert.md)、[客戶知識文件](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/prompts/customer-service/knowledge-base-builder.md)。

### 4. hook 有超出參考閱讀的副作用

auto-format 預設允許格式化，另有預設關閉的 AUTO_COMMIT_FORMAT；啟用後會 git add、git commit --no-verify，並吞掉錯誤後顯示已提交訊息。session-setup 會 source 設定／環境檔，另有預設關閉的自動啟動服務功能。這些不是病毒結論，但與公司明確授權 Git、保留既有修改及如實回報的要求需要分開審查。本輪未執行任何上游 hook。

來源：[auto-format](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/hooks/auto-format/hook.sh#L410-L426)、[session-setup](https://github.com/aj-geddes/useful-ai-prompts/blob/3f5182cfd739fc113f4af5244a1cf342ad7f7911/hooks/session-setup/hook.sh)。

### 5. 網站產製有名稱碰撞風險

本輪找到 14 組跨資料夾同名提示詞。convert_prompts_to_jekyll.py 以檔名 stem 產 slug，再寫入單一 docs/_prompts/{slug}.md，沒有碰撞檢查；依原碼，同名且成功解析的來源會寫到同一目標。這是靜態分析發現，未執行轉換重現覆寫。挑素材應記完整來源路徑與 SHA，不能只記文章名稱或網站 slug。

## 與現有系統的相關性評估

| 候選方法 | 適用位置 | 本公司需要保留的邊界 | 建議 |
|---|---|---|---|
| 操作說明、概念、排錯、FAQ 四種文件分型 | 下一份既有需求的說明文件 | 新使用者指南已有核准 C＋T2，不重新設計 | 優先參考 |
| 先定義讀者要完成的任務，再安排資訊 | 幕僚與文件承作角色 | 不新增未驗證功能、時間承諾或產品機制 | 優先參考 |
| 適用／不適用、必要／選填輸入、交付條件 | 現有角色方法缺漏處 | 只補實際缺口，不為所有角色加一套重複模板 | 次優先 |
| 小型 SKILL 入口＋references | 個別過長的技能文件 | 必須有載入成本問題與實測，不因外觀整齊就批次重構 | 按需 |
| 架構圖、無障礙範例 | 既有 designer／UI UX 方法的補充來源 | 已有圖表工具與分層驗收；不能用自動檢查代替真人／screen reader | 低增量 |
| hooks、整套 system prompt | 常駐執行或全域設定 | 不取代 AGENTS、Memory、授權邊界與既有 hooks | 不接入 |

研究 Wiki 與公司正式知識庫分開：本報告保存外部來源評估，不代表679份提示詞已成為公司方法。已抽查本公司 skills/chief-of-staff/SKILL.md、skills/designer/SKILL.md、知識/UX-驗收與無障礙.md；公司既有的回饋定位、局部修改、核准版型與證據分層較貼近目前問題。

建議採用路線：

```text
外部來源留在 Wiki
    → 真實任務遇到缺口時選一個方法
    → 去除不適用預設並保留來源
    → 與既有方法比較實際成果
    → 通用且有效，再依確認流程補到角色規則或知識
```

試用條件：沿用下一份原本就要做的文件，固定資料、讀者、交付格式及既有視覺；只加入一項方法。記錄回饋遺漏、越界修改、搬檔次數與返工情況；沒有改善就停留在參考資料，不擴大接入。此為建議，尚未啟動新試作。

## 安裝建議

⏳ **暫緩整包安裝；保留為按需參考來源。** 對公司有價值的是少數文件方法，尚無證據顯示安裝全部 Skills 或 hooks 會改善現有工作。已有對應能力的部分不重複安裝；不改 AGENTS、Memory、公司知識或工作台。本輪沒有 commit、push 或發布。

## 社群與驗證限制

340 stars 未達 Skill 的 1,000 星門檻，未啟動 agent-reach 社群或 YouTube 搜尋。homepage metadata 空值，未啟動 Defuddle；README 指向的網站沒有實際瀏覽器走讀。

已驗證：固定版本檔案盤點、679 份提示詞的五項基本結構、679 筆索引路徑集合一致、259 份 Skill 入口都有 YAML description、入口引用的 1,084 個 references 連結均找到檔案。存在性不代表程式範例可執行。本輪未執行上游 npm test、Jekyll build、hooks、模型品質測試或 Windows 安裝流程，也沒有 AST 或完整安全稽核。

本機研究產物保留在 D:/Codex/AI-一人公司/work/repo-intel/useful-ai-prompts-20260920/，包含固定原碼與 repomix.xml。未授權清理，未刪除。

## 相關連結

- [[AI-一人公司/_index|AI 一人公司研究索引]]
- [[Github/_index|GitHub Repo 分析總索引]]
- [[AI-一人公司/prompts.chat MCP — 公司參考來源與先驗證後接入評估|prompts.chat 的參考來源評估]]
- [[wiki/AI-一人公司/稿件工作台 — 真人試用結果與流程補強驗證|稿件工作台真人試用與流程補強]]
