---
tags: [AI, tools, skill, html, presentation, claude-code]
date: 2026-05-30
status: installed
verdict: 已安裝，36 主題豐富，推薦主力使用
---

# html-ppt-skill 評估報告

> 來源：https://github.com/lewislulu/html-ppt-skill  
> 安裝路徑：`~\.agents\skills\html-ppt`（全域）  
> 安裝方式：`npx skills add https://github.com/lewislulu/html-ppt-skill -g -y`

## 這是什麼？

Claude Code AgentSkill，輸出純靜態 HTML/CSS/JS 投影片，無 build step。

## 功能清單

| 項目 | 數量 |
|------|------|
| 主題（Themes） | **36 個** |
| 完整 Deck 模板 | **15 套** |
| 單頁版型（Layouts） | **31 種** |
| CSS 動畫 | **27 個** |
| Canvas FX 動畫 | **20 個** |
| Presenter Mode | **有**（S 鍵啟動） |

## 主題範例

`minimal-white`、`cyberpunk-neon`、`tokyo-night`、`glassmorphism`、`aurora`、`dracula`、`nord`、`gruvbox-dark`、`rose-pine`、`neo-brutalism`、`bauhaus`、`swiss-grid`、`terminal-green`、`xiaohongshu-white`、`memphis-pop`...

## Presenter Mode

按 `S` 開副視窗，含：
- 當前 / 下一張預覽（iframe，像素完美同步）
- 逐字稿（150-300 字/張）
- 計時器
- BroadcastChannel 雙視窗同步，切換不 reload

## 觸發詞

`presentation`、`ppt`、`slides`、`deck`、`keynote`、`幻灯片`、`演讲稿`、`分享稿`、`小红书图文`

## 裁決

**已安裝，推薦作為 HTML 投影片主力 Skill。**
功能豐富，主題多，有 Presenter Mode 和中文支援。

## 相關

- [[frontend-slides]] — 競品，設計哲學更強，有 PPT 轉換
- [[GordenPPTSkill]] — PPTX 輸出，不同格式
- [[HTML投影片框架比較]] — 底層框架評估
