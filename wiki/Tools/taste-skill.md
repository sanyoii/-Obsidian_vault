# Taste Skill — Anti-Slop 前端設計 Skills

**來源：** https://github.com/Leonxlnx/taste-skill  
**安裝日期：** 2026-06-08  
**Stars：** 38,365（截至安裝日）

## 是什麼

一套「反 AI 濫調」前端設計 Skills，告訴 Claude Code / Codex / Cursor 生成有品味的 UI，而不是千篇一律的樣板。核心邏輯：封殺壞模式（Inter 字體、Bootstrap 格線、linear 動畫、對稱三欄）+ 注入好規則（Double-Bezel 卡片、Spring Physics 動效、Magnetic Button、 $150k 代理商等級設計系統）。

## 已安裝的 5 個 Skills

| Skill 名稱 | Install Name | 用途 |
|-----------|-------------|------|
| `taste-skill` v2 | `design-taste-frontend` | 主力：讀 brief → 推斷設計方向 → 防濫調規則 + GSAP 骨架 |
| `soft-skill` | `high-end-visual-design` | $150k 代理商等級：Double-Bezel、Magnetic Button、Spring Motion |
| `output-skill` | `full-output-enforcement` | 強制完整輸出，防止 AI 截斷 code |
| `redesign-skill` | `redesign-existing-projects` | 先 audit 既有 UI 再重設計，適合舊專案改版 |
| `minimalist-skill` | `minimalist-ui` | Notion/Linear 風格：restrained palette、crisp structure |

### 未安裝（原因）

| Skill | 跳過原因 |
|-------|---------|
| `design-taste-frontend-v1` | v2 功能更完整，除非 v2 有 breaking change 才需要 |
| `gpt-taste` | 給 GPT/Codex 優化，不適用 Claude Code |
| `stitch-design-taste` | Google Stitch 專用 |
| 3 個 imagegen-* | 圖片生成 skill，非 code；需 ChatGPT Images |
| `image-to-code` | 目前沒有 image → analyze → code 工作流需求 |
| `industrial-brutalist-ui` | 極端風格，按需再裝 |

## 觸發方式

```
「做一個 landing page，premium consumer 風格」
 → Claude 自動載入 design-taste-frontend

「這個 UI 做得很普通，幫我按 $150k 代理商標準重做」
 → 搭配 high-end-visual-design

「幫我把現有的 dashboard UI 改版，不要從零寫」
 → redesign-existing-projects

「幫我做一個 Notion 風格的個人作品集頁面」
 → minimalist-ui

「給我完整的程式碼，不要截斷」
 → full-output-enforcement
```

## 設計系統核心規則（high-end-visual-design）

### 封殺的壞模式
- **字體：** Inter、Roboto、Arial、Open Sans、Helvetica → 改用 Geist、Clash Display、PP Editorial New
- **圖示：** 粗線 Lucide / FontAwesome → 改用 Phosphor Light / Remix Line
- **邊框：** 一般 1px solid gray → 改用 `ring-1 ring-black/5`
- **版型：** 對稱三欄 Bootstrap 格線 → 改用 Asymmetrical Bento / Z-Axis Cascade
- **動畫：** `linear` / `ease-in-out` → 改用 `cubic-bezier(0.32,0.72,0,1)`

### 強制的好模式
- **Double-Bezel 卡片：** Outer Shell（外框 + padding）+ Inner Core（內容 + inset shadow）
- **Macro Whitespace：** 最少 `py-24`，讓版面呼吸
- **Button-in-Button：** 箭頭圖示必須嵌入自己的圓形容器
- **Scroll Entry：** 所有元素進入視口時 fade-up（`translate-y-16 blur-md opacity-0` → 正常）

### 三個可調旋鈕（design-taste-frontend）
```
DESIGN_VARIANCE  1-10：版型實驗性（低=置中乾淨，高=不對稱現代）
MOTION_INTENSITY 1-10：動畫深度（低=hover only，高=scroll/magnetic）
VISUAL_DENSITY   1-10：每畫面資訊量（低=空白多，高=密集 dashboard）
```

## 跟現有 Skills 的關係

| 現有 Skill | Taste Skill 的補充 |
|------------|-----------------|
| `gsap` / `animejs` | Library API 參考 → taste-skill 提供**設計意圖**（要用 spring physics，不只是 API） |
| `ui-ux-pro-max` | 方法論/流程 → taste-skill 提供**具體 CSS pattern + 反模式清單** |
| `frontend-design` | React+Tailwind 基礎 → taste-skill 的**設計品味層** |
| `html-ppt` | 投影片域（不重疊） |

## 安裝資訊

```bash
# 安裝位置：d:\Claude\.agents\skills\（npx skills add 管理，symlink 到 Claude Code）
# 備份位置：d:\Claude\.claude\skills\
# User-level：C:\Users\sanyo\.claude\skills\

# 更新指令
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```
