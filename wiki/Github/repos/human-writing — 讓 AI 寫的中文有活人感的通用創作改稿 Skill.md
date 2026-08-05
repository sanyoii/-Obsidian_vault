---
source: "https://github.com/KKKKhazix/human-writing"
author: "KKKKhazix (數字生命卡茲克)"
stars: "961"
clipped: 2026-08-06
tags:
  - "github/repo"
  - "claude-code/skill"
  - "writing"
  - "chinese"
---

# human-writing — 讓 AI 寫的中文有活人感的通用創作改稿 Skill

> **KKKKhazix/human-writing** | ⭐ 961 | 🍴 93 | 📝 MIT
> "让 AI 写的中文读起来像一个具体的人在说话。通用创作与改稿 Skill，开箱即用。"

## 一句話說明

一份給 Claude Code / Codex 等 Agent 的中文寫作 Skill，用「材料門檻 + 修辭動作級禁令 + 可執行檢查腳本」三段式，把模型產出的中文從「流暢但沒有作者」拉回「一個具體的人在說話」；適用知乎回答、公眾號、部落格、論壇長帖、人物故事、科普、評測、小說與口播。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 961 |
| Forks | 93 |
| 主要語言 | Python（僅一支檢查腳本，21.6 KB） |
| 授權 | MIT |
| 建立時間 | 2026-08-05 |
| 最後推送 | 2026-08-05 |
| Open Issues | 1 |
| Open PRs | 1 |
| 最新 Release | v1.1.0（2026-08-05） |
| Topics | agent-skills, chinese-writing, creative-writing, writing-skill |
| 首頁 | 無 |
| 是否 Archived | 否 |

倉庫僅 16 個檔案、67 KB。作者 KKKKhazix 即中文 AI 圈 KOL「數字生命卡茲克」，另有 19.2K⭐ 的 `khazix-skills` 合集——本 repo 是把其中 `khazix-writer`（模仿作者本人口吻）去人格化後的**通用版**，SKILL.md 明寫「不建立長期作者畫像、不生成個人規則庫」。兩者互補而非重複。

## 核心功能

- **材料門檻（第一關）**：非虛構長文計畫破 1,200 字前，內部必須先列出至少五件具體材料並註明來源；列不出就不准寫長稿，只能研究、追問（一次最多三題）或縮成 600 字短答。這是整份 Skill 最硬的一條，直指 AI 長文「把三個抽象觀點各解釋五遍」的通病。
- **修辭動作級禁令（1.1.0 核心改版）**：1.0 用字串禁「不是……而是……」，模型換字面繼續做同一件事；1.1 改禁「先替讀者立一個他沒有的誤解、再推翻它抬價」這個**動作**，並列九種已知外衣當舉例而非邊界。另加禁三項以上同構排比、抽象名詞配具體動詞的抒情、動詞名詞化。
- **標點與黑話硬線**：正文禁破折號（`—`／`——`／`–`）；冒號只允許引出人物直接原話，「核心是：」這類提示性冒號禁用；禁賦能／抓手／閉環／底層邏輯等 28 個硬黑話詞，另有一組「需結合語境判斷」的軟名單。
- **現實／虛構分流**：現實稿核事實、數字、引語、親歷，禁止無來源的精確時間、神態、天氣、對白（「假細節越具體，AI 味越重」）；虛構稿可自由創造，但每個場景要有目標、動作、變化。
- **可執行檢查腳本** `check_prose.py`：639 行、純標準庫、零網路。硬禁令 FAIL、疑似項目走「需要人工判斷」警告層，另有句長變異係數與連詞密度兩項統計檢查。
- **蒸餾版** `dist/human-writing-lite.md`：兩千字以內，五條最高槓桿規則，可直接貼進 ChatGPT／千問等不支援 Skill 的聊天視窗。

## 技術架構

沒有執行期框架，是「規則文件 + 一支 linter」的組合。SKILL.md 用**條件式載入**控制 context：動筆前只讀命中當前任務的參考檔，`revision.md` 一律留到初稿之後。

```
human-writing/
├── SKILL.md              入口（15.5 KB）：材料門檻、現實/虛構分流、交付禁令
├── VERSION               1.1.0
├── agents/openai.yaml    顯示名「活人感寫作」與預設 prompt
├── dist/
│   └── human-writing-lite.md   蒸餾版（2.7 KB，聊天視窗貼上即用）
├── references/           條件式載入，不一次全讀
│   ├── forum-prose.md    23.6 KB — 知乎/公眾號/論壇長帖節奏與措辭
│   ├── revision.md       12.8 KB — 初稿後逐遍檢查清單
│   ├── reality.md         5.9 KB — 真人/歷史/新聞/數據的事實邊界
│   ├── fiction.md         4.8 KB — 小說/故事/對白
│   └── formats.md         4.6 KB — 短內容/口播/演講/教程/評測
└── scripts/check_prose.py 21.6 KB — 硬禁令 + 警告 + 統計三層檢查
```

| 層次 | 技術 |
|------|------|
| 規則層 | Markdown（SKILL.md + 5 份 references，優先級明寫五級） |
| 檢查層 | Python 3，僅 `argparse`／`re`／`collections`／`dataclasses`／`pathlib` |
| 檢查策略 | 三層：硬禁令（FAIL）→ 疑似變形／排比／抒情詞（警告）→ 句長 CV 與連詞密度（統計） |
| 分發層 | GitHub Release + 資料夾直接複製 + lite 版貼上 |

`check_prose.py` 的設計值得單獨記一筆：它先 `mask_non_prose()` 遮掉程式碼區塊與網址再比對，避免誤傷；硬停詞與「需辨語境詞」分成兩個名單，後者只出警告不擋交付；`SEMANTIC_PIVOT_PATTERNS` 專門抓翻案腔的跨句變形（「。而是」「倒不如／毋寧」）。這是把「品味」拆成可機械驗證條款的一次實作。

## 實測

**壞樣本**（刻意寫入翻案句、黑話、提示性冒號、破折號）：

```
汉字数 63
翻案句 1，翻案腔变形 0，同构排比 0，名词化 0，黑话 4，硬停词 1 ...
需要修改
- 中文冒号共 1 处，出现在第 5 行。
- 破折号共 2 处，出现在第 5、5 行。
- 硬停词，第 3 行，说白了
- 黑话，第 3 行，赋能 / 全链路 / 商业闭环 / 底层逻辑
- 禁用翻案句，第 1 行，"不是一个简单的问题，而是"
exit=1
```

**對照組**（自然中文敘事，含動作、數字、代價）：`exit=0`，只出一條「需要人工判斷」警告（`不是高兴，是怕` 被標為疑似翻案腔變形——實際是正常中文，但作者刻意把它放在警告層而非硬擋，設計合理）。

檢查器有先 FAIL 再 PASS 的可觀測行為，不是裝飾。

**Windows 陷阱**：腳本輸出含中文，cp950 終端直接 `UnicodeEncodeError` 崩在 `print` 那行。必須 `PYTHONIOENCODING=utf-8` 或 `-X utf8`。

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 僅 KKKKhazix 一人 | 單點依賴 |
| Commit | 7 個，全部集中在 2026-08-05 一天 | 極新，尚無維護紀錄 |
| Release | v1.0.0 → v1.1.0，同日 | 迭代快，介面可能再變 |
| Issue / PR | 各 1 件，均由外部貢獻者開（功能分支、CLI 測試） | 已有社群參與 |

星數增速需要說明：repo 於 08-05 01:19 建立，01:40 起出現第一批 fork，一天內 961⭐／93 fork。作者帳號 2025-10 建立、2,856 followers、旗下 `khazix-skills` 19.2K⭐，是中文 AI 圈的既有流量來源，成長曲線與 KOL 發文分發吻合，非異常訊號。`stargazers` API 在本環境對任何 repo 皆回 404（token/環境限制），星標時序**未能驗證**。

## 供應鏈檢查

| 檢查項 | 結果 |
|--------|------|
| 相依套件 | 無（純標準庫，無 requirements.txt／package.json） |
| 網路行為 | 無 `requests`／`urllib`／`socket` |
| 動態執行 | 無 `eval`／`exec`／`subprocess`／`os.system` |
| 檔案寫入 | 無，只讀取指定稿件路徑 |
| 授權 | MIT，README 明寫「只有原創規則和工具，沒有第三方文章、訓練語料或模型權重」 |
| SKILL.md 自動行為指令 | 無自我更新、無回傳評分、無外部 API 呼叫 |

單檔純讀取的 linter，攻擊面接近零。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 中文長文寫作（wiki 條目、教材、報告）可直接套用；`check_prose.py` 能對 vault 的 .md 稿件離線跑 |
| **Claude Code** | 與已裝的 `stop-slop` 直接同賽道但不同層——stop-slop 是通用去 AI 腔（偏英文語感、無腳本），human-writing 是中文原生、含材料門檻與可執行 linter。與同作者的 `khazix-writer`（模仿卡茲克口吻）互補，本 repo 刻意不建作者畫像 |
| **Automation** | `check_prose.py` 可掛進交付前檢查（同 `verify_gate` 思路），對中文長文產出加一道機械關卡 |

## 安裝建議

✅ 適合安裝

三個理由：
1. **它帶可執行驗收器**。多數寫作 skill 只給規則，靠模型自律；這份給了一支會 exit 1 的 linter，且實測有先 FAIL 再 PASS 的可觀測行為——與本環境「驗收腳本要先跑出 FAIL 才算成立」的原則同構，這是它勝過 `stop-slop` 的真正增量。
2. **材料門檻是別處沒有的前置關卡**。「非虛構長文列不出五件具體材料就不准寫」直接擋掉 AI 長文最常見的灌水，屬於寫作前的准入條件而非事後修辭清理。
3. **零相依、零網路、單檔 linter**，供應鏈風險接近零，MIT 授權。

安裝時的兩個注意事項：
- Windows 跑腳本必加 `PYTHONIOENCODING=utf-8`，否則 cp950 崩在輸出中文那行。
- 規則層與已裝的 `stop-slop` 有重疊，建議中文長文用 human-writing、英文與短文留給 stop-slop，不要同時觸發兩套禁令名單。

未驗證的部分要說清楚：本次量的是 **linter 的準確度**（壞樣本抓到、對照組不誤擋），沒有量「同一份材料，掛與不掛這份 SKILL.md 的產出差多少」。規則層的實際增量待實寫一篇長文後才有結論。

## 相關連結

- [[Github/repos/KKKKhazixkhazix-skills 数字生命卡兹克开源的 AI Skills 合集|khazix-skills]] — 同作者 19.2K⭐ Skills 合集，內含人格化版 khazix-writer
- [[Github/repos/Stop-slop 寫作去除AI腔|Stop-slop]] — 已安裝的通用去 AI 腔 skill，同賽道對照組
