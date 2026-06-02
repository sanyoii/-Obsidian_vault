---
tags: [AI, tools, skill, pptx, claude-code]
date: 2026-05-30
status: installed
verdict: 已安裝，與 HTML 工作流不衝突，備用
---

# GordenPPTSkill 評估報告

> 來源：https://github.com/GordenSun/GordenPPTSkill  
> 版本：1.0.8  
> 安裝路徑：`C:\Users\sanyo\.claude\skills\GordenPPTSkill\`

## 這是什麼？

Claude Code AgentSkill，格式與現有 skills 完全相容。給個主題就生成高品質 `.pptx`，19 套中文場景模板。

## 19 套模板清單

| slug | 適用場景 |
|------|---------|
| minimal-business-summary | 簡約商務總結汇報 |
| red-patriot-youth | 新時代紅色教育（黨政） |
| cute-orange-class | 可愛卡通教學（幼兒/小學） |
| quarterly-illust | 藍灰酸性插畫季度總結 |
| geometric-summary | 多彩幾何工作總結 |
| mckinsey-style | 麥肯錫顧問風 |
| data-viz-deck | 資料視覺化 |
| architecture-deck | 技術架構分享 |
| operations-deck | 營運報告 |
| premium-corp | 企業高端簡報 |
| competition-speech | 競賽演講 |
| thesis-formula | 論文答辯（公式型） |
| thesis-novice | 論文答辯（新手型） |
| top-thesis | 頂尖論文 |
| report-savior | 報告救星 |
| red-patriot-general | 黨政通用 |
| report-massive-* | 大型資料報告（charts/models/reports） |

## 依賴

- `python-pptx >= 1.0`（已安裝 1.0.2）
- LibreOffice（僅渲染預覽時需要）

## 自動更新

每次 session 使用前執行：
```bash
python3 scripts/apply_update.py
```

## 裁決

**非商業用途免費，已安裝備用。**
適合需要交 .pptx 的場合（論文答辯、公司報告、政府機關）。
日常 HTML 投影片工作流不受影響。

## 相關

- [[html-ppt-skill]] — HTML 投影片 Skill（主力）
- [[frontend-slides]] — HTML 投影片 Skill（競品）
