---
tags: [github, automation, ai, testing, ui-automation]
source: https://github.com/web-infra-dev/midscene
stars: 13.4k
added: 2026-05-26
---

# Midscene.js

> AI-powered, vision-driven UI automation for every platform

**Stars：** 13.4k　｜　**語言：** TypeScript 80%

## 是什麼

用自然語言描述操作步驟，由 AI（視覺語言模型）驅動，自動控制網頁、Android、iOS 的 UI。不需要手動寫 CSS selector 或 XPath，直接說「點擊登入按鈕」、「填入這個表單」就能執行。

## 主要功能

- **自然語言腳本**：用 JavaScript SDK 或 YAML 描述自動化目標
- **跨平台**：支援 Web、Android、iOS
- **三類 API**：互動（點擊/輸入）、資料擷取、實用工具
- **MCP 整合**：可讓上層 Agent 用自然語言操控 UI
- **純視覺定位**：支援 Qwen3-VL、Doubao 等視覺語言模型，不依賴 DOM

## 使用場景

- 自動化表單填寫與驗證
- 跨平台 UI 自動化測試
- 網頁資料擷取（不需寫 selector）
- 讓 AI Agent 直接操作瀏覽器或 App

## 安裝

提供 Chrome 擴充程式（零代碼）和 JavaScript SDK 兩種方式。詳見官方文件。

## 與現有工具的關係

- vs `webapp-testing`（Playwright）：Midscene 不需寫 selector，適合 UI 結構常變動或難以選取的場景；Playwright 更精確穩定
- vs `scrapling`：Scrapling 偏向資料爬取，Midscene 偏向 UI 互動操作
- 可搭配 MCP 讓 Claude 直接用自然語言操作瀏覽器

## 值不值得安裝

**暫緩**。功能強大但與 Scrapling + Playwright 有部分重疊。若有「需要 AI 看畫面操作 App/網頁」的具體需求再考慮。
