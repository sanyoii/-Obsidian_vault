---
source: "https://github.com/davila7/claude-code-templates"
author: "davila7 (Daniel Ávila)"
stars: "30K+"
clipped: 2026-08-02
tags:
  - "github/repo"
  - "claude-code"
  - "supply-chain"
  - "agent-skill"
---

# claude-code-templates — 1700+ 元件的 Claude Code 設定分發器

> **davila7/claude-code-templates** | ⭐ 30,048 | 🍴 3,298 | 📝 MIT
> "CLI tool for configuring and monitoring Claude Code"

## 一句話說明

一個把 1,700+ 個社群 agents／commands／skills／MCP 設定收在同一個 repo，再用 `npx claude-code-templates` 一鍵寫進你 `~/.claude/` 的分發器，附帶一個本機分析儀表板。它不是函式庫也不是框架，是**目錄＋安裝器**——所以評估重點不在功能而在它往你的 agent 執行路徑裡放什麼、怎麼放。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 30,048 |
| Forks | 3,298 |
| 主要語言 | Python（5.26 MB）＋ HTML／JavaScript／TypeScript 等共 18 種 |
| 授權 | MIT |
| 建立時間 | 2025-07-04 |
| 最後推送 | 2026-08-02（每日活躍） |
| Open Issues | 85 |
| Open PRs | 131 |
| 最新 Release（GitHub） | v1.28.3（2025-11-15） |
| 最新版本（npm） | **1.29.4（2026-07-14）** |
| Watchers | 219 |
| Topics | anthropic, anthropic-claude, claude, claude-code |
| 首頁 | https://aitmpl.com |
| 是否 Archived | 否 |

### 體積與安裝物

| 指標 | 數值 |
|------|------|
| repo diskUsage | **215 MB** |
| npm 套件解壓後 | **2.4 MB / 96 檔** |
| repo 檔案樹 | 9,189 個 blob |
| 週下載量 | **2,989** |

**215 MB 是 repo 不是安裝物**——`npx` 只拉 2.4 MB 的 CLI。體積來自元件市集本身加上 git 歷史膨脹（bot 每日多次重寫多 MB 的 JSON 索引）。

**星數與使用量落差明顯**：30K stars 對約 3K 週下載。星數反映的是關注度而非採用度。

## 核心功能

- **元件市集**：自行從檔案樹清點為 **872 個 skills、408 個 agents**（方法：數 `components/skills/*/SKILL.md` 的目錄數與 `components/agents/**/*.md`），另有 commands、MCP 設定、hooks、settings、loops。README 宣稱值未採用。
- **單一元件安裝**：`--agent` / `--command` / `--skill` 各自抓一個檔案寫進 `.claude/`。
- **完整模板安裝**：整套語言/框架設定，含備份與合併保護。
- **本機分析儀表板**：`--analytics`，讀本機 Claude Code 使用資料。
- **Session 分享**：把對話匯出並上傳，產生分享連結；`--clone-session` 可反向匯入。
- **Claude Code Studio**（`--studio`）：本機伺服器介面。

## 技術架構

```
  npx claude-code-templates
        │
        ▼
  cli-tool/bin/create-claude-config.js   ← npm bin（別名 cct）
        │
        ├─ 下載層：一律拉自家 repo
        │    raw.githubusercontent.com/davila7/claude-code-templates/main/
        │      cli-tool/components/{agents,commands,skills,mcps,hooks,settings,loops,sandbox}/
        │    aitmpl.com 只做清單索引＋遙測收件，無自架 CDN
        │
        ├─ 寫入層 ⚠ 兩種待遇
        │    .mcp.json / settings.json / hooks  → pathExists → 讀取 → 合併（有提示）
        │    agents / commands / skills 的 .md  → fs.writeFile 直接覆蓋（無檢查）
        │
        ├─ 遙測層
        │    使用分析 tracking-service.js   預設開
        │    錯誤回報 error-reporting.js    預設關
        │    opt-out: CCT_NO_TRACKING / CCT_NO_ANALYTICS / CI
        │
        └─ 週邊：analytics dashboard（express + ws）、studio、session-sharing（x0.at）
```

| 層次 | 技術 |
|------|------|
| CLI | Node.js，commander + inquirer + @clack/prompts |
| 伺服器功能 | express、ws |
| 雲端相依 | @supabase/supabase-js、@vercel/postgres、discord-interactions |
| 元件格式 | Markdown（agents/commands/skills）＋ JSON（mcps/settings/hooks） |

執行期相依含 Supabase 與 Vercel Postgres，對一個「設定 CLI」而言不尋常——這些服務於專案的後端／社群功能，一併打包在同一個 npm 套件裡。

## 🔴 安裝行為：同名元件會被靜默覆蓋

**這是本次分析對既有使用者最重要的發現，已逐行讀原始碼確認。**

`cli-tool/src/index.js` 對兩類檔案的待遇不同：

```js
// agents（約 513-526 行）：無任何存在性檢查
const targetFile = path.join(agentsDir, `${fileName}.md`);
await fs.writeFile(targetFile, agentContent, 'utf8');
```

commands（約 582-596）與 skills（約 1613-1626）是同一個模式。而 JSON 設定類則有保護：

```js
if (await fs.pathExists(targetMcpFile)) {
  existingConfig = await fs.readJson(targetMcpFile);
  console.log(chalk.yellow('📝 Existing .mcp.json found, merging configurations...'));
}
```

全檔 12 處 `pathExists`／`existsSync` 全部落在 MCP、settings、hooks、components 目錄檢查上，**沒有一處在 agent／command／skill 的寫檔路徑上**。

**這是設計選擇而非疏漏**：JSON 設定需要合併，Markdown 元件視為可替換。但後果是——**若你本機有同名且經過修改的元件，安裝會直接蓋掉，無提示、無備份、無 undo。**

完整模板安裝（非單一元件）走 `file-operations.js`，遇既存檔預設走備份而非盲覆蓋，這條路徑是安全的。

## 完整性驗證：有做，但沒接到安裝流程

`IntegrityValidator` 存在且支援 SHA256 與來源檢查，另有 NVIDIA SkillSpector 靜態掃描——但這些**只接在 CI 的 PR 閘門**。`expectedHash` 預設為 `null`，**使用者端的安裝路徑沒有任何 checksum 驗證**，下載到什麼就寫什麼。

正面的一點：下載來源單一且透明，全部指向 `raw.githubusercontent.com/davila7/claude-code-templates/main/...`，沒有自架 CDN、沒有第三方端點。要稽核裝了什麼，直接看 repo 對應路徑即可。

## 遙測與資料外送

| 項目 | 預設 | 內容 |
|---|---|---|
| 使用分析 | **開啟** | 元件名稱、環境資訊。不含程式碼內容 |
| 錯誤回報 | 關閉 | — |
| opt-out | 一致 | `CCT_NO_TRACKING` / `CCT_NO_ANALYTICS` / `CI` |

遙測資料本身克制，opt-out 機制一致可用。但預設開啟這點要知道。

**Session 分享要特別留意**：`session-sharing.js` 把完整對話上傳到匿名檔案空間 **x0.at**，保存 3–100 天，且程式碼自己寫著：

```js
console.log(chalk.gray(`🔓 Note: Files are not encrypted by default`));
```

反向的 `--clone-session` 匯入幾乎不驗證內容。把來路不明的 session 匯進來再 `claude --resume`，理論上構成提示注入向量（Inferred，未實測）。

## 安全事件與版本追溯

**GHSA-79wm-x847-7cvg**（HIGH，**CVSS 8.8**）：`--studio` 的本機伺服器有**未鑑權 OS 命令注入（RCE）**，成因是 `shell: true` 的命令拼接。

- 公告日 2026-07-14，**修補版 1.29.4 同日發佈**——響應速度值得肯定
- 但 **v1.29.4 在 GitHub 上連 tag 都沒有**（tags 只到 v1.29.2），無法透過 tag diff 稽核修補內容

**兩個發佈管道脫鉤**：npm 已到 1.29.4，GitHub Releases 頁面停在 v1.28.3（2025-11-15）。只看 GitHub 會誤判專案停更八個月，實際上每日都有實質提交。副作用是**安全修補不會出現在 release 通知裡**。

## 供應鏈稽核

| 檢查項 | 結果 |
|---|---|
| postinstall / preinstall 腳本 | ✅ **無**（npm 供應鏈首要檢查點過關） |
| 下載來源 | ✅ 單一且透明，全在自家 GitHub raw |
| 硬編碼金鑰 | ✅ 未發現 |
| 依賴健康度 | ⚠️ `@vercel/postgres` 已 deprecated（低風險技術債） |
| **npm provenance／attestations** | ❌ **無**——無法驗證 npm 產物確實由此 repo 建出 |
| **npm 維護者** | ⚠️ **單人 `danisan_avila`**——該帳號被盜即可對 30K 星套件推惡意版本 |
| 收錄元件抽樣 | 17 檔（<2% 覆蓋率）未見注入或外送代碼。**樣本小，不足以宣稱整個市集乾淨** |

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| Bus factor | **1**（davila7 主導） | 低 |
| 131 open PR 性質 | 抽樣 60 筆：38 位不同作者，33 位外部作者各只投 1 筆；87% 改動 ≤3 檔，典型為「Add X skill to catalog」 | **社群投稿元件的自然堆積**，非灌水也非深度協作 |
| 審查方式 | 幾乎全由 bot 處理（GitHub Actions 歡迎詞＋greptile AI review），維護者少留言 | — |
| 積壓實例 | #274（marketplace.json 28 處路徑錯誤，開 6.5 個月無人理）、#128（plugin 載入錯誤，開 9 個月、4 人回報同問題） | 確有積壓 |
| 合併率 | 已關閉案件 76.2% 被合併；但 131/539（24.3%）卡在 open | — |

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 低。工具類留存。 |
| **Claude Code** | **高度重疊且有流程衝突**，見下。 |
| **Automation** | 低。 |

### ⚠️ 18 個 skill 名稱正面相撞

以本機 86 個 user-level skills 與 CCT 的 872 個 skill 目錄做精確名稱比對，**18 個同名（21%）**：

```
brainstorming          dispatching-parallel-agents   docx
executing-plans        frontend-design               obsidian-bases
obsidian-markdown      pdf                           pptx
skill-creator          subagent-driven-development   ui-ux-pro-max
using-git-worktrees    using-superpowers             verification-before-completion
web-design-guidelines  writing-plans                 xlsx
```

這 18 個全部是**單一元件安裝路徑下的靜默覆蓋候選**。且它們幾乎都源自 `anthropics/skills` 與 `obra/superpowers`——CCT 只是這些上游的定期鏡射同步（PR #758／#742 可證），本機既然已從源頭取得，透過 CCT 再裝一次只是多一層轉發，卻換來覆蓋風險。

### 與四步 SOP 直接衝突

本環境的新增 Skill SOP 是：**逐字讀來源 → 備份區 → user-level → marketplace → commit**。CCT 的一鍵安裝：

- `--yes` 跳過所有確認，繞過「逐字讀來源」這個防供應鏈風險的核心步驟
- 裝進去的東西不會進備份區、不會同步 marketplace、不進版控
- 本機對元件的修改（如移除上游推廣段落、加本地 patch）會在下次同名安裝時消失

## 安裝建議

❌ 不適合（就本環境而言）

**這不是說它是壞專案**。下載來源透明、無 postinstall、RCE 同日修補、遙測克制且可 opt-out——以聚合器而言體質算好。判 ❌ 是因為它與**這個環境**的具體衝突：

1. **21% 的既有 skill 是靜默覆蓋候選**，而本機元件帶有本地修改（`LOCAL-CHANGES.md` 模式），覆蓋即失去且無備份。
2. **重疊的部分幾乎都是上游鏡射**，已從源頭取得，透過它再裝是多一層無收益的轉發。
3. **一鍵安裝繞過四步 SOP**，制度上的稽核點全部失效。
4. 供應鏈結構性弱點：無 provenance、單一維護者、安全修補版本無 tag。

**若仍要用，唯一安全的姿勢**：把它當**目錄瀏覽**用（在 aitmpl.com 或 repo 裡找元件），看到想要的就用四步 SOP 手動取用，**不要跑安裝指令**。這樣拿到目錄的價值，避開覆蓋與繞過稽核的代價。

**復查觸發（→ 改 ⏳）**：單一元件安裝加上既存檔案提示或備份；或推出 npm provenance。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
- [[Github/repos/beautify-github-readme — GitHub README 首頁設計 agent skill|beautify-github-readme]]（本機帶 local patch 的 skill，正是會被靜默覆蓋的案例）
- [[Github/repos/addyosmani-agent-skills — 生產級工程 Skills 套件|addyosmani/agent-skills]]（另一個 skill 聚合來源）
