---
source: "https://github.com/SnailSploit/claude-red"
author: "SnailSploit"
stars: "11K+"
clipped: 2026-11-17
updated: 2026-11-17
tags:
  - "github/repo"
  - "security/red-team"
  - "claude-code/skills"
---

## claude-red — Claude 攻擊型資安 Skills 函式庫

> **SnailSploit/claude-red** | ⭐ 11,168 | 🍴 1,527 | 📝 MIT
> "claude-red is a curated library of offensive security skills designed for the Claude skills system. Each skill is a structured SKILL.md file that primes Claude with expert-level methodology for a specific attack surface — from SQLi to shellcode, EDR evasion to exploit development."

> **本次可用引擎（Phase 0，2026-11-17）**：gh ✅｜npx/repomix ✅（但輸出檔被 Defender 隔離，見下）｜defuddle ✅（無 homepage，未觸發）｜yt-dlp ✅｜mcporter ✅ 但 Exa 回 `Unknown MCP server 'exa'` → 改 WebSearch｜opencli ✅ 但 Reddit 搜尋無輸出 → 跳過。
>
> ⚠️ **Defender 攔截**：repomix 打包完成後，Windows Defender 把打包 XML 判為 `VirTool:Python/Empium!MTB`、把暫存的 `web/offensive-rce`、`web/offensive-sqli` SKILL.md 判為 `Backdoor:PHP/Perhetshell.A!dha`（皆 Severity 5），檔案無法讀取。**沒有繞過防毒**；後續內容改走 GitHub Trees/Contents API 逐檔讀進記憶體、不落地。repomix 自身的 secretlint 也排除了 1 檔（`post-exploitation/offensive-data-exfiltration`）。

---

### 一句話說明

claude-red 是 79 個攻擊型資安 `SKILL.md` 的集合（README 寫 78，`claude-skills.json` 已重建為 79），分 23 類（Web 16、無線 14、紅隊基礎設施 7、Exploit 開發 6⋯），放進 `~/.claude/skills/` 後讓 Claude 依對話觸發載入對應攻擊面的方法論（SQLi、ADCS、EDR evasion、shellcode、Wi-Fi 等）。**它是純知識層，不是掃描器**——沒有可執行工具，只有 Markdown 方法論＋少量建置腳本。目標使用者是授權滲透測試、bug bounty、CTF 與紅隊人員。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 11,168 |
| Forks | 1,527 |
| 主要語言 | Python（15KB，僅建置腳本）＋Shell（2.7KB）；實際內容 99% 是 Markdown |
| 授權 | MIT |
| 建立時間 | 2026-03-04 |
| 最後推送 | 2026-11-17 |
| Open Issues | 12 |
| Open PRs | 29 |
| 最新 Release | v0.3.0「78 Skills, 23 Categories, Full Wireless Suite」(2026-08-30) |
| Topics | claude-ai, claude-skills, redteam, redteam-tools, skills, claude-pt |
| 首頁 | 無（README 指向 snailsploit.com） |
| 是否 Archived | 否 |

---

### Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 92（repomix；1 檔被安全檢查排除）／Trees API 實掃 79 個 SKILL.md |
| 總 Tokens | 935,104 |
| 壓縮模式 | 否（diskUsage 1.6MB） |

#### 最大 token 消耗檔案 Top 5

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| `Skills/infrastructure/offensive-windows-boundaries/SKILL.md` | 142,399 | 15.2% |
| `Skills/infrastructure/offensive-windows-mitigations/SKILL.md` | 135,437 | 14.5% |
| `Skills/exploit-dev/offensive-crash-analysis/SKILL.md` | 112,784 | 12.1% |
| `Skills/exploit-dev/offensive-basic-exploitation/SKILL.md` | 94,051 | 10.1% |
| `Skills/fuzzing/offensive-fuzzing-course/SKILL.md` | 22,330 | 2.4% |

**SKILL.md 體積分佈**（Trees API）：79 檔、總 3.58MB、中位數 20KB、P90 66KB、最大 568KB；**4 檔 >100KB，前 4 名吃掉 52% token**。單一 skill 觸發就可能塞進 10 萬+ token，對 context 很不友善——這幾檔是把整門課程（Windows 內部機制、crash 分析）直接灌進 SKILL.md，而非用 progressive disclosure 拆 reference。

---

### 核心功能

- **79 個攻擊面方法論 skill**：每檔含 YAML frontmatter（name＋長 description 當觸發）、Metadata（指回作者另一 repo `offensive-checklist` 的來源檔）、Trigger Phrases、Instructions for Claude、Full Methodology。
- **23 類別覆蓋**：Web（SQLi/XSS/SSRF/SSTI/XXE/IDOR/上傳/RCE/反序列化/競態/走私/GraphQL/WAF bypass/業務邏輯）、Auth（JWT/OAuth）、AD（Kerberoast、ADCS ESC1-15）、無線全套（WPA2/3、EAP、WPS、evil twin、BLE、Zigbee、Z-Wave、LoRa、sub-GHz）、Exploit 開發、Fuzzing、雲/容器/CI-CD/供應鏈、提權、後滲透、反鑑識與 C2、社交工程、AI 安全（prompt injection/jailbreak）、Utility（快速檢查清單、報告寫作）。
- **安裝方式**：`git clone` 進 `~/.claude/skills/claude-red`、sparse-checkout 單類、`install.sh`（純 rsync/cp 複製，無網路、無 eval，已逐行讀過）、或 `cat SKILL.md | claude --system-file -`。
- **建置腳本**：`convert_skills.py`（西文註解，把舊 Markdown 格式轉成 skills 並打 zip）、`regen_index.py` / `tools/build_manifest.py`（重建 `claude-skills.json` 索引）。

---

### 技術架構

```
claude-red/
├── Skills/<category>/offensive-<topic>/SKILL.md   ← 79 個知識檔（本體）
├── claude-skills.json                              ← 機器可讀索引（regen_index.py 產生）
├── install.sh                                      ← 複製到 ~/.claude/skills
├── convert_skills.py / tools/build_manifest.py     ← 格式轉換與 manifest
└── .github/workflows/
    ├── codeql.yml
    ├── skill-preview.yml        ← PR 改 SKILL.md 時跑 tesslio/skill-review-and-optimize（read）
    └── skill-optimize-apply.yml ← PR 留言 /apply-optimize 觸發，contents: write
```

| 層次 | 技術 |
|------|------|
| 內容 | Markdown SKILL.md（Anthropic skills 格式） |
| 索引 | JSON manifest（Python 產生） |
| 安裝 | Bash（rsync / cp） |
| CI | CodeQL＋Tessl skill review action（pin 到 commit SHA） |

**觀察**：
1. **frontmatter 是 11 月才補齊的**——2026-11-15 PR #67 才「Add YAML frontmatter to 28 skills so they load as Claude skills」，代表 v0.3.0 發版時有 28 個（35%）根本不會被 Claude 自動載入；同題的 #68 仍 open。11 月前裝的人實際只拿到約 2/3。
2. **`skill-optimize-apply.yml` 的觸發條件只檢查「是 PR」＋「留言含 `/apply-optimize`」**，沒有 `author_association` 檢查，卻給 `contents: write`。是否真能被外人觸發寫入，要看 tesslio action 內部有無權限判斷——**未驗證**，列為疑點不列為漏洞。
3. 內容品質有社群修正痕跡：PR #62「Fix incorrect technique examples」、issue #64 指出 `offensive-business-logic` 的 verb 列舉迴圈會對每條路徑送 `PUT/PATCH/DELETE`，實戰會改壞資料（仍 open）——**照抄指令有破壞性風險**。

---

### 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 Top 10 | SnailSploit 26、claude 13、yogesh-tessl 3、LvL23HT 2、halilkirazkaya 2、其餘各 1 | 單人主導；「claude」13 筆＝大量由 Claude 代寫 |
| 近 4 週 commit | stats API 回空物件（GitHub 計算中）；commits 列表顯示 11/01–11/17 約 8 筆，多為合併外部 PR | 低頻、以合併為主 |
| Release 頻率 | 僅 2 個 tag（2026-03-08、2026-08-30） | 不定期 |
| Issue open/close | 12 open；29 open PR | PR 積壓偏多 |

**星數有機性**：8.5 個月 11K⭐、1.5K fork，Trendshift 上榜；但只有約 26 筆作者 commit。stargazers 時序未驗證（環境限制），**不據此下結論**；無 npm 套件，無下載量可對照。

---

### 社群口碑

（Exa 掛、Reddit 無結果；以 WebSearch＋YouTube 補）

**熱門討論：**
- **Claude 拒絕載入**（GitHub #61、#66）：使用者回報 `load claude red` 直接觸發 `Opus 4.7's safeguards flagged this message`，#66「Tried everything claude isn't allowing it to install」——**平台安全機制會擋，實用性打折**。
- **安全風險評論**（[remio.ai](https://www.remio.ai/post/snailsploit-claude-red-is-trending-but-the-offensive-ai-library-is-not-new)）：認為它能整理合法紅隊工作，但也讓敏感手法更容易被 AI agent 取用與執行；且指出這類函式庫並非新東西。
- **概覽型部落格**（[Jonathan's Blog](https://jonathansblog.co.uk/?p=30399)）：作者自承只讀 README 沒逐一跑 skill；定位為「知識層不是掃描器」，建議 Claude Code 保留指令核准。
- **Tessl registry**（[tessl.io](https://tessl.io/registry/skills/github/SnailSploit/Claude-Red)）：個別 skill 頁標「Do not install without reviewing」。
- **YouTube**：5 支相關影片，最高約 3 萬觀看（Avenox），其餘數十到一千多；教學生態初期。

**正面回饋：** 覆蓋面廣、分類清楚、可按類安裝。
**負面回饋 / 已知問題：** Claude 安全機制攔截；35% skill 曾缺 frontmatter；部分範例有破壞性指令（#64）；巨型 SKILL.md 吃 context；Defender 會報毒。**沒找到實際使用者的實測評價**。

---

### 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 同類已有 [[Github/repos/reverse-skill — AI 逆向滲透安全技能路由包\|reverse-skill]]（❌）、[[Github/repos/gpt-5.6-instruct — Codex CLI 越獄提示詞包（威脅情報，不裝）\|gpt-5.6-instruct]]（❌），本篇作「攻擊型 skill 生態」第三份參照 |
| **Claude Code** | 裝進 user-level 會把 79 條攻擊型 description 塞進每個 session 的 skill 清單；與 CLAUDE.md「Skills 瘦身」方向衝突，且有觸發平台 safeguards 的實例 |
| **Automation / 測試公司** | 使用者本業是 QA（功能／回歸測試＋Defect Report），非授權滲透。唯一直接有用的是 `utility/offensive-reporting`——Finding 範本、Reproduction Steps「15 分鐘內可重現」、Retest 表、Evidence 遮蔽規則，跟 Defect Report／回測流程同構 |

---

### 安裝建議

❌ **不適合安裝（整包）** — 理由：
1. **需求不存在**：本機工作是授權範圍內的 QA 測試，不是滲透測試；R13「加複雜度換不到改善」。
2. **環境衝突實證**：Windows Defender 對打包內容報毒並隔離（本次實測）；Claude 平台 safeguards 擋載入（#61、#66）。
3. **品質不齊**：4 個巨型 SKILL.md（單檔 9–14 萬 token）、frontmatter 11 月才補、部分範例有破壞性指令。

**📌 可單獨抽取（已逐字讀過原文）**：`Skills/utility/offensive-reporting/SKILL.md`（14.7KB，純報告寫作方法，無攻擊指令）。可借用到測試公司 Defect Report／測試報告範本：Finding 欄位結構、「Notes for Retest」、Retest Summary 表、證據時間戳與遮蔽規則、Common Report Mistakes 表。取檔釘 tag：

```bash
gh api "repos/SnailSploit/claude-red/contents/Skills/utility/offensive-reporting/SKILL.md?ref=v0.3.0" -H "Accept: application/vnd.github.raw"
```

（來源 tag v0.3.0；main 版本 2026-11-17 讀取，內容相同未逐字比對，取用時以 tag 為準。）

---

### 延伸操作

- 想把 reporting 方法論併入測試公司範本 → 讀測試公司的 Defect Report 範本後對照差異再改
- 想比較同類 → 參 [[Github/repos/reverse-skill — AI 逆向滲透安全技能路由包|reverse-skill]]

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/reverse-skill — AI 逆向滲透安全技能路由包|reverse-skill]]
- [[Github/repos/gpt-5.6-instruct — Codex CLI 越獄提示詞包（威脅情報，不裝）|gpt-5.6-instruct]]
- [[Github/repos/projectdiscoverynuclei Nuclei is a fast, customizable vulnerability scanner powered by the global security community and built on a simple YAML-based DSL, enabling collaboration to tackle trending vulnerabilities on the internet. It helps you fi|nuclei]]
