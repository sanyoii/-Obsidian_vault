---
source: "https://github.com/tlzmw001/naiyue-cover-generator"
author: "tlzmw001"
stars: "3"
clipped: 2026-07-27
tags:
  - "github/repo"
  - "codex-skill"
  - "image-generation"
  - "social-cover"
  - "human-in-the-loop"
---

# naiyue-cover-generator — Codex 用的文章封面與段內說明圖 Skill 組

> **tlzmw001/naiyue-cover-generator** | ⭐ 3 | 🍴 0 | 📝 **無授權檔**
> "Codex skills for Naiyue article covers and paragraph diagrams"

## 一句話說明

兩支給 **Codex** 用的 Skill：從文章生成帶「奈月」個人 IP 形象的橫向封面（`naiyue-cover`），以及把段落轉成手繪說明圖（`naiyue-paragraph-graph`）。核心主張是**不把整張圖交給一次性自由生成**——AI 只負責視覺規劃與整圖生成，Node.js 腳本負責「可機械證明」的部分（精確像素、等比派生、artifact hash、輸出驗證），中間插入 3–4 道**人工門禁**。

## 專案概覽

| 項目 | 數值 |
|---|---|
| Stars / Forks | 3 / 0 |
| 主要語言 | JavaScript（145 KB，全部是 `.mjs`） |
| 授權 | **無 LICENSE 檔** |
| 建立時間 | 2026-07-25（本文撰寫時 2 天） |
| 最後推送 | 2026-07-25 |
| Issues / PRs | 0 / 0 |
| Release | 無 |
| Topics / 首頁 | 無 |
| 貢獻者 | tlzmw001（1 人，共 3 個 commit） |
| Repomix | 47 檔／59,842 tokens（已排除圖檔） |

最大檔前五：`v3-spec-validator.mjs`（4.8K tokens）、`spec-validator.mjs`（4.3K）、`platform-adapter.mjs`（4.2K）、`references/formats.md`（3.3K）、`artifact-pipeline.mjs`（3.0K）——**驗證器與適配器就佔掉近三成**，這個比例本身說明了專案重心。

## 兩支 Skill

### `naiyue-cover`（文章封面）

- 從文章抽出標題簇、核心視覺隱喻、3–4 個流程步驟、奈月的 `pose_id` / `pose_intent`
- 用「手繪知識白板風」＋人物參考圖生成完整母圖
- **按寬高比分族**：同族用一張已批准母圖等比派生多個精確尺寸；比例不同必須重新生圖，**不准裁切舊母圖充數**
- `shared-crop-core` 模式：同一張上傳圖要相容多個中心裁切時，母圖是「語義核心」不是上傳圖，頂部 12.5% 只留純紙張紋理供背景派生
- 依使用者提供的**平台裁切截圖**校準安全區；安全區是 opt-in，沒有裁切證據時不准只憑平台名就主動縮內容

### `naiyue-paragraph-graph`（段內說明圖）

支援五種關係圖型：`flow`（步驟順序）、`timeline`（階段前後）、`decision-map`（多候選＋明確推薦）、`comparison`（客觀比較）、`concept-diagram`（原理組成）。先產 Visual Card 明確圖型／題頭／元素／關係／姿勢／允許符號／**主動省略內容**，人工確認後才生圖。

## 技術架構

```
skills/<name>/                     ← 唯一正式來源
├── SKILL.md                       流程與硬規則（frontmatter description 極長，精準界定觸發/不觸發）
├── agents/openai.yaml             Codex 端介面：display_name + default_prompt
├── assets/
│   ├── ip/manifest.json           人物身份 manifest（+ naiyue.png 等 IP 素材）
│   ├── renderer.json              limits（含 attempt_limit）
│   └── fonts.conf
├── references/
│   ├── workflow.md / formats.md   啟動時強制「完整讀取」
│   ├── prompt-templates/*.md      真實 prompt 落檔用的模板
│   ├── visual-profiles/*.yaml     視覺 Profile（奈月手繪白板風）
│   ├── platform-presets.yaml      平台 preset（只選 preset，不能取代最終像素）
│   └── quality-rubric.md          品質檢查表
└── scripts/
    ├── guard-*-attempt.mjs        ★ 生圖前的嘗試次數閘門
    ├── register-master.mjs        登記真實 artifact → 不可覆寫的 attempts/ 快照
    ├── render-v3.mjs              等比派生精確尺寸
    ├── validate-*-run.mjs         整輪驗證
    └── lib/                       spec-validator / platform-adapter / text-layer
                                   whiteboard-svg / contact-sheet / master-artifact

.agents/skills/ 與 .claude/skills/  只放指向正式目錄的軟連結，不維護第二份 Skill 文本
```

| 層次 | 技術 |
|---|---|
| 執行時 | Node.js ≥ 20.9，ESM（`type: module`） |
| 相依 | 只有兩個：`sharp` 0.35.3（影像處理）、`yaml` 2.9.0 |
| 生圖 | 宿主內建 `image_gen`（Codex 側），**明令禁止靜默改走需要 API Key 的外部路徑** |
| 產物 | `runs/<run-id>/`：article.md（唯讀複製 + SHA-256）、prompt.md、references.json、raw.png、master.png、artifact.json、reviews/、ai-review.json |

## 真正值得抄的東西：反幻覺的落地機制

這個 repo 星數只有 3，但它把「怎麼讓 AI 不在圖像工作流裡唬爛」寫成了可執行程式碼，有五個機制是可移植的：

1. **Review 綁 hash**：使用者批准的 review 必須綁定當下內容卡的 hash（`reviews/content-card.json`）。內容一改，舊批准自動失效。
2. **嘗試次數閘門**：`guard-cover-attempt.mjs` 在每次生圖前跑，把嘗試次數寫進 `cover-attempts.json` 並比對 `renderer.json` 的 `limit`。超限直接非零退出——**用檔案狀態擋住無限重試**，不靠模型自律。
3. **不可覆寫的 attempt 快照**：`register-master.mjs` 產生 `attempts/attempt-<n>/`，明文規定「不得用本地替代圖冒充 raw」。
4. **逐字標題比對**：文章已有標題時，只准調整換行與強調邊界，**按行拼接後必須與來源逐字一致（含空格、標點、英文大小寫）**；「批准內容卡」不構成改寫標題的授權，要改必須單獨授權具體新標題。這條直接堵掉 LLM 最愛的「順手潤色」。
5. **拒絕從平台名推斷事實**：使用者必須明確給出每個 output 的最終 `width`/`height`，平台 preset 只能選、不能取代像素事實；沒有裁切證據不得聲稱「已適配」。

`SKILL.md` 的 frontmatter `description` 寫得極長且**同時界定觸發與不觸發**（「不用於一般圖片生成、方圖/竖圖、批量發布或平台帳號操作」），是 skill 描述寫法的好範例。

## 已知風險

1. **無 LICENSE**：預設保留所有權利，法律上不可自由複用或衍生
2. **IP 素材權利不明**：`assets/ip/` 內含「奈月」人物圖，README 明講要複用就得換成自己有使用權的 IP——**素材本身不可直接沿用**
3. **極早期**：2 天大、3 個 commit、1 人、0 issue/PR、無 release、無測試
4. **綁定 Codex 宿主 `image_gen`**：Claude Code 這側沒有等價的內建生圖工具，`.claude/skills/` 的軟連結給的是發現路徑，不是能跑的等價能力
5. **硬綁專案根目錄**：SKILL.md 第一步就要求 `git rev-parse --show-toplevel` 必須是 `naiyue-cover-generator`，不一致就停止——不是可以直接丟進別的專案的 skill
6. **Windows 軟連結**：`.agents/skills/`、`.claude/skills/` 用 symlink，Windows 上 clone 需開發者模式或管理員權限才會正確還原

## 相關連結

- [[Github/_index|GitHub Repo 索引]]
- [[Github/repos/naiyue-skills — 跨宿主的四支元技能工具箱（審 skill／調研／建 skill／思考框架）|naiyue-skills]]（**同作者姊妹 repo**，早 20 天、MIT、Python、四支元技能；共用同一套「`skills/` 單一源碼 + 雙 symlink 發現入口 + AGENTS.md 唯一規則來源」倉庫慣例，但領域零重疊。兩者是互補而非取代——本 repo 管圖像生產、naiyue-skills 管審查/調研/建構工序）
- [[Github/repos/social-cards-engine — 品牌無關的社群圖卡引擎|social-cards-engine]]（同為圖卡產生器，但走程式碼繪製路線）
- [[Github/repos/guizang-material-illustration — 歸藏材質插畫 Claude Skill|guizang-material-illustration]]（純 Prompt 型配圖 skill，無驗證層）
