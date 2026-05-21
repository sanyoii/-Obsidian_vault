---
title: "CloakBrowser：一個從 C++ 原始碼層級修改指紋的隱匿瀏覽器，讓你的自動化腳本不再被封鎖"
source: "https://repoinside.com/CloakHQ/CloakBrowser"
author:
  - "[[RepoInside]]"
published: 2026-04-03
created: 2026-05-14
description: "CloakBrowser 是一款從 C++ 原始碼層級修改 33 個指紋點的隱匿 Chromium 瀏覽器，完美通過 Cloudflare Turnstile、reCAPTCHA v3（0.9 分）等 30+ 偵測系統。支援 Python 與 JavaScript，一行 import 即可取代 Playwright/Puppeteer，還內建貝茲曲線滑鼠移動與逐字打字的人類行為模擬。"
tags:
  - "clippings"
---
## 專案簡介

你有沒有過這樣的經驗？寫好了一支爬蟲或自動化腳本，結果一跑起來就被 Cloudflare 擋下、reCAPTCHA 分數低到離譜、或是被網站標記為機器人？

CloakBrowser 是一個開源的隱匿瀏覽器專案，它不像傳統的反偵測工具那樣透過 JavaScript 注入或修改瀏覽器設定來繞過偵測，而是直接在 Chromium 的 C++ 原始碼層級修改了 33 個指紋點——包含 Canvas、WebGL、音訊、字型、GPU、螢幕屬性、自動化訊號移除，以及 CDP 輸入行為模擬。

換句話說，CloakBrowser 不是「偽裝」成正常瀏覽器，它本身就「是」一個正常瀏覽器。反機器人系統看到的是一個真實的 Chrome 瀏覽器指紋，因為它確實是從 Chromium 原始碼編譯出來的。

它同時提供 Python 和 JavaScript/TypeScript 的封裝，API 完全相容 Playwright 和 Puppeteer，只要換一行 import 就能無痛切換，3 行程式碼、30 秒就能解除封鎖。

## 操作畫面

![CloakBrowser Logo](https://i.imgur.com/cqkp6fG.png)

![Cloudflare Turnstile — 3 Tests Passing](https://i.imgur.com/IvB0It7.gif)

## 這個專案要解決哪些問題？

- **自動化腳本被反機器人系統偵測並封鎖** ：使用 Playwright 或 Puppeteer 時， `navigator.webdriver` 為 `true` 、 `window.chrome` 為 `undefined` 、UA 字串含有 `HeadlessChrome` 等特徵，讓網站輕易識別為機器人
- **傳統反偵測工具不穩定** ： `playwright-stealth` 、 `undetected-chromedriver` 、 `puppeteer-extra` 等工具透過 JS 注入或設定修改來繞過偵測，每次 Chrome 更新就容易失效，且反機器人系統可以偵測到這些修補本身
- **reCAPTCHA v3 分數過低** ：一般 Playwright 只能拿到 0.1 分（機器人等級），導致無法正常存取受保護的頁面
- **Cloudflare Turnstile 驗證失敗** ：標準自動化瀏覽器無法通過 Turnstile 的非互動式與管理式驗證
- **瀏覽器指紋不一致** ：跨平台執行時（本機、Docker、VPS），指紋表現不一致，容易被偵測出異常
- **行為偵測（Behavioral Detection）** ：即使指紋正確，滑鼠瞬移、鍵盤瞬間填入等非人類行為仍會被識別
- **代理伺服器時區/語系不匹配** ：使用 Proxy 時，瀏覽器的時區與語系和 Proxy 出口 IP 的地理位置不一致，被反機器人系統識破

## 適合哪些使用者？

- **網頁爬蟲開發者** ：需要爬取有反機器人保護的網站資料
- **自動化測試工程師** ：需要在真實環境中進行端對端測試，但不想被偵測為自動化工具
- **AI Agent 開發者** ：建構能瀏覽網頁的 AI 代理人（如 browser-use、Stagehand），需要隱匿的瀏覽器環境
- **資料工程師與研究人員** ：進行大規模網頁資料擷取與分析
- **SEO 監測與競品分析人員** ：需要自動化監測搜尋結果或競爭對手網站
- **電商價格監測開發者** ：追蹤商品價格但常被電商平台封鎖
- **社群媒體自動化開發者** ：管理多帳號、自動化社群互動
- **安全研究人員** ：進行授權的滲透測試與安全評估

工商服務時間

RepoInside 為 [開源報報](https://www.patreon.com/githubcurator) 的加值服務。開源報報每天透過 Patreon 為付費會員整理一份使用繁體中文的開源專案摘要列表電子報。

[詳細加值服務介紹](https://repoinside.com/)

## 專案資訊

- GitHub 網址： [https://github.com/CloakHQ/CloakBrowser](https://github.com/CloakHQ/CloakBrowser)
- 使用授權：MIT License（封裝程式碼）；CloakBrowser Binary License（編譯後的 Chromium 二進位檔，免費使用但不可再散布）
- PyPI： [https://pypi.org/project/cloakbrowser/](https://pypi.org/project/cloakbrowser/)
- npm： [https://www.npmjs.com/package/cloakbrowser](https://www.npmjs.com/package/cloakbrowser)
- Docker Hub： [https://hub.docker.com/r/cloakhq/cloakbrowser](https://hub.docker.com/r/cloakhq/cloakbrowser)

評估：20260514
CloakBrowser 是一個修改版 Chromium，能繞過機器人檢測（Cloudflare、reCAPTCHA v3），主要用於網頁爬蟲和自動化測試。

**跟你的工具對比：**

|情境|幫助程度|
|---|---|
|`notebooklm-skill`（需登入 Google）|幾乎沒有，用一般 Chrome 就夠|
|`ai-website-cloner`（`--chrome` flag）|幾乎沒有，cloner 只是讀取頁面|
|爬取有反爬保護的網站（Cloudflare 等）|✅ 有用，但你目前沒這類需求|
|Claude Code MCP 工具|沒有關係|

**結論：** 除非你有明確的爬蟲或自動化需求（例如要大量抓取有 bot 保護的頁面），否則現在裝了也不會用到。而且這類工具本質上是持續的軍備競賽，維護成本高。

**建議：** 先不用裝。等哪天遇到「正常 Playwright 被擋」的具體問題再考慮。