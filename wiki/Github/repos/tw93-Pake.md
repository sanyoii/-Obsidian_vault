---
tags: [tools, desktop, tauri, rust, webapp-wrapper, cross-platform]
date: 2026-06-20
status: evaluated
verdict: 一行指令把網頁打包成跨平台桌面 App
---

# Pake — 網頁轉桌面 App 打包工具

> 來源：https://github.com/tw93/Pake  
> 授權：MIT  
> 規模：133 檔案 / 577K tokens  
> Stars：35K+

## 這是什麼？

**Pake 用 Rust + Tauri 把任何網頁一行指令打包成跨平台桌面應用程式（macOS/Windows/Linux）。** 產出的 App 體積約 5MB，比 Electron 包小近 20 倍，記憶體佔用也更低。

一句話定義：「Electron 的極輕量替代品 — 一行 CLI 把 URL 變成原生桌面 App」

## 核心功能

- **一行打包**：`pake https://example.com --name MyApp` 就完成
- **極輕量**：打包產物約 5MB（Electron 通常 100MB+）
- **跨平台**：macOS/Windows/Linux 全支援
- **預製 App**：WeRead、Twitter、ChatGPT、DeepSeek、Grok、Gemini、YouTube Music、小紅書、Excalidraw 等熱門 App 可直接下載
- **自訂選項**：自訂 icon、視窗大小、隱藏標題列、沉浸式視窗、拖放支援
- **樣式注入**：可自訂 CSS 去除廣告、修改頁面樣式
- **快捷鍵**：內建完整鍵盤快捷鍵（上一頁/下一頁/全螢幕/清除快取等）
- **GitHub Actions**：不想裝環境也能用線上建置

## 技術棧

- **核心**：Rust + Tauri v2
- **前端**：TypeScript
- **CLI**：pake-cli（npm 套件）
- **建構需求**：Rust ≥1.85、Node ≥22（≥18 也可）
- **套件管理**：pnpm

## 安裝方式

```bash
# CLI 安裝
pnpm install -g pake-cli

# 打包範例
pake https://github.com --name GitHub
pake https://weekly.tw93.fun --name Weekly --icon icon.icns --width 1200 --height 800 --hide-title-bar
```

## 與現有系統的相關性

| 面向 | 評估 |
|------|------|
| Obsidian Dashboard | 可以把 dashboard HTML 打包成獨立桌面 App |
| Claude Code | 無直接關聯（Pake 打包的是 web 應用，不是 CLI） |
| 日常使用 | 可以把常用 web 工具（ChatGPT/DeepSeek/Gemini）變成獨立視窗 App |

## 安裝建議

✅ **適合安裝** — 輕量實用，可以把常用的 Web AI 工具打包成獨立桌面 App（不占瀏覽器 tab），也可用來打包自己的 dashboard 或 web 專案。MIT 授權無顧慮。

## 相關連結

- [預製 App 下載](https://github.com/tw93/Pake/releases)
- [CLI 使用指南](https://github.com/tw93/Pake/blob/master/docs/cli-usage.md)
- [GitHub Actions 線上建置](https://github.com/tw93/Pake/blob/master/docs/github-actions-usage.md)
