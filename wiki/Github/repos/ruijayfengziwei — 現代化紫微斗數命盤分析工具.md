---
source: "https://github.com/ruijayfeng/ziwei"
author: ruijayfeng
clipped: 2026-05-26
tags:
  - "github/repo"
  - "installed"
  - "ziwei"
  - "astrology"
  - "react"
---

# 紫微知道 — 現代化紫微斗數命盤分析工具

> **出處：** https://github.com/ruijayfeng/ziwei
> **本機路徑：** `d:\Claude\ziwei`
> **啟動指令：** `cd d:\Claude\ziwei\app && npm run dev` → http://localhost:5173

---

## 一句話說明

把傳統紫微斗數知識、現代前端交互和多模型 AI 能力整合到一個可自部署的 Web App。不只展示命盤，圍繞「看得懂、用得上、方便分享」三件事提供完整分析體驗。

---

## 功能特性

| 功能 | 說明 |
|------|------|
| 精準排盤 | 基於 `iztro`，支援完整十二宮配置與傳統安星邏輯 |
| AI 命盤解讀 | 結構化分析，支援多模型接入（OpenAI-compatible） |
| 年度運勢 | 結合限流疊宮與月度趨勢，呈現階段性變化 |
| 雙人合盤 | 支援四化互飛、關係匹配與互動分析 |
| 人生 K 線 | 可視化長期運勢走勢 |
| 分享卡片 | 一鍵生成命格金句卡 |

---

## 技術棧

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4
- Zustand（狀態管理）
- ECharts / Recharts（圖表）
- `iztro`（紫微斗數排盤庫）
- Dexie（IndexedDB ORM）
- OpenAI-compatible LLM API

---

## 安裝紀錄

```bash
git clone https://github.com/ruijayfeng/ziwei.git  # d:\Claude\ziwei
cd ziwei/app
npm install   # 345 packages
npm run dev   # http://localhost:5173
```

---

## AI 設定

在 App 內開啟設定頁，填入：

| 欄位 | 值 |
|------|----|
| Base URL | `https://api.anthropic.com/v1` |
| API Key | Anthropic API Key |
| Model | `claude-sonnet-4-6` |

也支援：Kimi / Gemini / DeepSeek / 任何 OpenAI-compatible 端點。

---

## 紫微斗數知識庫

repo 內附完整的紫微斗數文件（`01-排盘算法/` 到 `06-运限系统/`），涵蓋：

- 命宮身宮定位、五行局、紫微星定位、安星訣
- 十四主星、六吉星、六煞星
- 十二宮詳解
- 四化飛星（十干四化表）
- 格局判斷、大限流年

---

## Tags

#tool #ziwei #astrology #react #typescript #vite #iztro #ai #installed
