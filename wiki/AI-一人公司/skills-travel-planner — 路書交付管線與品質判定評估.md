---
source: "https://github.com/huanyuzhilv/skills-travel-planner"
author: "huanyuzhilv"
stars: "15"
clipped: 2026-09-10
tags: [github/repo, ai-company, travel, repo-intel]
---

# skills-travel-planner — 路書交付管線與品質判定評估

## 一句話說明

七個專案中，這個最接近定制旅遊工作室的路書製作管線：簡表轉 tripData.json，再補文案、住宿與配圖，輸出 HTML／PDF。程式最豐富，但其 strict 驗證主要檢查圖片 URL 條件，不能拿來認定旅行內容已可交付。

## 專案概覽

2026-09-10 公開 GitHub REST API 快照，原碼固定於下列 commit；數字不混用搜尋頁快取。

| 項目 | 結果 |
|---|---|
| Repo | [huanyuzhilv/skills-travel-planner](https://github.com/huanyuzhilv/skills-travel-planner) |
| Stars / Forks | 15 / 2 |
| 主要語言 | HTML |
| 授權 | MIT |
| 建立／最後推送 UTC | 2026-06-01T13:12:33Z／2026-06-01T13:57:54Z |
| 固定 commit | [ea0576ff0e3708090b29541415a70da569e4b3f1](https://github.com/huanyuzhilv/skills-travel-planner/tree/ea0576ff0e3708090b29541415a70da569e4b3f1) |
| Open Issues／PRs | 1／0；已將PR從open_issues_count分離 |
| 最新 Release | v1.0.0，2026-06-01T13:57:11Z |
| Archived／Fork | 否／否 |
| Topics | ai-travel-planner、claude-skill、cursor-skill、custom-travel、html-itinerary、itinerary-generator、llm、roadbook、travel-agent、trip-planner、xiaohongshu |
| homepage | [專案首頁](https://huanyuzhilv.github.io/skills-travel-planner/) |

## Repomix 深度分析

以既有 Repomix 1.18.0 對固定 commit 下載的 source 打包，未壓縮，exit 0。共 81 檔、357,641 tokens、1,111,905 字元。打包完成不等於逐行審計；本報告深讀主要流程與風險分支。

| Top 5 檔案 | Tokens | 比例 |
|---|---:|---:|
| assets/templates/roadbook-v2/template-roadbook-v2.html | 51,971 | 14.5% |
| assets/templates/roadbook/template-roadbook.html | 18,639 | 5.2% |
| assets/generate.py | 18,419 | 5.2% |
| skill.md | 17,977 | 5% |
| assets/template-roadbook.html | 17,340 | 4.8% |

Repomix未提示可疑檔案；這不是依賴漏洞、商用授權、資料隱私或供應商安全證明。原始檔與紀錄保存於本機 `D:/Codex/一人旅遊公司/work/repo-intel/travel-seven-20260910/huanyuzhilv--skills-travel-planner/`。

## 核心功能

- `roadbook_intake.py` 將文字／DOCX 簡表整理成結構化資料；OCR 支援屬方法與宿主能力，未在本次實測。
- 每日文案、亮點與住宿分開補強，外接 TikHub 小紅書、OpenAI 相容 LLM、FlyAI 等來源。
- roadbook-v2 使用組件與圖片槽位、備選圖與本機預覽，並有列印分頁輔助。
- 交付入口可選 fail-fast，預設會嘗試降級生成並以 exit 2 區分部分降級情況。

## 技術架構

```text
文字／DOCX → intake → tripData.json
                         ↓
          每日內容／LLM文案／飯店簡介
                         ↓
              配圖 → 圖片URL校驗
                         ↓
           generate.py → HTML → PDF
```
Python 腳本與大型 HTML 模板構成主要執行層。`package.json` 只是 Python 交付命令入口，沒有必要改造為公司新後端。官方文件站也以這條資料到路書管線作為主軸。

## 主要發現與採用限制

1. **內容補強失敗仍可能回 strict 成功。** 每日內容、LLM文案與飯店簡介的 `_run_allow_fail` 回傳值未納入最終 degraded 判斷；第516行只彙整圖片與圖片校驗。合成子程序案例令三個 enrich 全部 exit 1，配圖／校驗／generate stub exit 0，最終仍 exit 0 並輸出 strict。這是已重現的判定漏洞；不是實際生成過可交付 HTML。 [scripts/deliver_roadbook_v2.py:338](https://github.com/huanyuzhilv/skills-travel-planner/blob/ea0576ff0e3708090b29541415a70da569e4b3f1/scripts/deliver_roadbook_v2.py#L338)

2. **缺旅行日期會推算並寫回。** 日期不足時取 generationDate／updatedAt，仍不足則取執行當日與次日；第288行開始寫入 tripData.meta。製作日期不能代替入住日期。公司接入應明確拒絕缺日期或保留 unknown，不能自動形成供應商查詢條件。 [scripts/deliver_roadbook_v2.py:72](https://github.com/huanyuzhilv/skills-travel-planner/blob/ea0576ff0e3708090b29541415a70da569e4b3f1/scripts/deliver_roadbook_v2.py#L72)

3. **圖片 URL 門檻不足以證明內容與素材可用。** 主要檢查槽位 URL 數量與是否 HTTPS，並排除封面 Logo／部分文字區的圖片槽。沒有在這段校驗中驗證景點是否匹配、權利、圖片可下載、當期開放或總成本。應把圖片品質、使用權與旅行事實分開驗。 [scripts/validate_roadbook_image_alternates.py:58](https://github.com/huanyuzhilv/skills-travel-planner/blob/ea0576ff0e3708090b29541415a70da569e4b3f1/scripts/validate_roadbook_image_alternates.py#L58)

4. **Windows 與外部資源仍待實測。** 自動尋找 Chrome 的候選清單為 macOS 路徑，CLI 可另給 chrome-path；不能宣稱完全不支援 Windows，也不能宣稱開箱即用。完整管線有多個計費／網路來源、預設補強與圖片處理，成本不由免費程式授權消除。 [assets/generate.py:27](https://github.com/huanyuzhilv/skills-travel-planner/blob/ea0576ff0e3708090b29541415a70da569e4b3f1/assets/generate.py#L27)

## 社群健康度

貢獻者端點：API空清單；作者／實際貢獻者數不據此判0。近四週 commit_activity回空物件，列Unknown，不記0。所有7個repo均少於1,000 Stars，依skill條件未啟動社群口碑／YouTube搜尋，不能推論沒有外部使用者。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian | 方法與品質缺口存 Wiki；圖片URL不當成素材授權帳本 |
| Codex | 可參考獨立步驟、輸出狀態與模板組件；避免照搬強制補圖和品牌預設 |
| Automation | 先讓每一步回傳明確狀態，失敗後保留草稿，不以文件存在判定成功 |
| 公司新增價值 | 適合從 trip.json 的展示白名單產生暫存路書輸入；不引入第二份正式 tripData |

對照基準為本次實際讀取的一人旅遊公司 README、HUB、travel-dispatch v5與 docs/geo-integration.md；公司已有正式trip.json、逐段地理契約與三個展示預覽。本輪不採用舊測試數字當現況驗收。

## 安裝建議

⏳ **先參考結構化資料、展示模板與輸出流程；整包導入暫緩。必須先修正失敗狀態、日期來源、素材證據及成本控制，再考慮隔離試作。**

## 驗證與限制

35 份 Python 檔案通過 AST 語法解析。已執行隔離的原函式控制流程重現；子程序皆為 stub，沒有 TikHub、FlyAI、LLM、圖片抓取、HTML／PDF實作執行。probe-extra 最初兩次 exit 1 是本次 stub 缺少 argparse 屬性，補齊後 exit 0，未把這兩次當成上游失敗。官方 homepage 已透過現有頁面讀取工具取得；Defuddle CLI 未安裝，未額外下載。

共同工具限制：gh CLI因既有設定檔Access denied未取得資料，改用公開REST API；CodeGraph沒有本session可用project，採原碼與Python AST解析，未宣稱CodeGraph結果。未安裝上游、未改正式旅程、未提交或推送、未發布。

## 相關連結

- [[AI-一人公司/七個旅行開源專案 — 一人旅遊公司採用比較|七案比較與採用順序]]
- [[AI-一人公司/一人旅遊公司 — 架構與工作流程|公司架構]]
- [[AI-一人公司/_index|AI-一人公司索引]]
- [[Github/_index|Github分析總索引]]

