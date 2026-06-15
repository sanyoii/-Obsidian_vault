---
source: "https://github.com/StarTrail-org/PixelRAG"
author: "StarTrail-org（Berkeley 研究專案）"
stars: "248"
clipped: 2026-06-15
tags:
  - "github/repo"
  - "rag"
  - "browser-automation"
  - "screenshot"
  - "claude-code-plugin"
---
# PixelRAG — 像素原生 RAG，截圖讓 AI 用視覺讀網頁

> **出處：** [https://github.com/StarTrail-org/PixelRAG](https://github.com/StarTrail-org/PixelRAG) | ⭐ 248
> "The end of web parsing. The beginning of scalable pixel-native search."

---

## Description

Berkeley 研究專案，核心主張是：與其解析網頁 HTML/DOM（容易因排版、JS 渲染、反爬蟲而失真），不如直接把網頁/PDF**截圖成圖片**，讓多模態 LLM 用「視覺」讀取內容。專案提供：

- **`pixelrag`**（PyPI 套件）：含 `pixelshot` CLI，把 URL 或 PDF 渲染成「瀑布式分塊」(tiled) JPEG，供 LLM 逐塊讀取。
- **`pixelbrowse`**：Claude Code plugin/skill，封裝 `pixelshot`，讓 Claude 可以直接「截圖看網頁」。

## 核心特色

- 適合 JS 重度頁面、動態渲染內容、defuddle/repomix 等文字解析工具抓不到的版面問題
- `--tile-height` 控制分塊高度，避免單張圖過大超出模型輸入限制
- 兩種 backend：`cdp`（預設，連接 Chrome DevTools Protocol）與 `websocket`

## 安裝與相容性分析（2026-06-15 實測）

### 安裝路徑
- `pip install pixelrag`（含 `cef-capi-py` 149MB win_amd64 wheel，Windows 上**可正常安裝**，先前評估的相容性疑慮已排除）
- Claude Code plugin：`claude plugin marketplace add StarTrail-org/PixelRAG` + `claude plugin install pixelbrowse@pixelrag-plugins`，成功安裝（2 個 skills：pixelbrowse、screenshot，~130 tokens 常駐成本）

### Windows 相容性問題與解法

1. **`pixelshot` 找不到 Chrome**
   `pixelrag_render/chrome.py` 的 `find_chrome()` 在 Windows 上找不到 Chrome 時會嘗試 `install_chrome()`，但該函式 `if platform.system() != "Linux"` 直接 `raise RuntimeError("Pre-built headless_shell only available for linux-x64")` —— **Windows 完全無法自動安裝 Chrome**。
   **解法**：`playwright install chromium` 取得 Chrome-for-Testing，再設定 `CHROME_PATH` 環境變數指向該 binary（`find_chrome()` 的 search order 第一項就是 `CHROME_PATH`）。系統安裝的完整版 Chrome（`Program Files\Google\Chrome`）在複雜頁面（如 Wikipedia）上會無聲失敗，Playwright 的 Chrome-for-Testing 則穩定可用。

2. **`--backend playwright` 選項實際不可用**
   `pip install 'pixelrag[playwright]'` 後指定 `--backend playwright` 會丟 `ValueError: Unknown backend: 'playwright'. Choose 'cdp' or 'websocket'`，儘管 `--help` 有列出這個選項。維持用預設 `cdp` backend。

3. **`--wait-network-idle` 參數不存在**
   repo 內 `pixelbrowse` skill 的 SKILL.md 範例指令含 `--wait-network-idle`，但目前發布版 CLI（`pixelrag==0.2.1`）的 `pixelshot --help` 並**沒有**這個選項 —— SKILL.md 與實際發佈的 PyPI 版本有落差，使用時需移除此參數。

### 最終整合方案

建立 wrapper script `C:\Users\sanyo\.local\bin\pixelshot`（bash，已加入 PATH）：
```bash
#!/bin/bash
export CHROME_PATH="C:/Users/sanyo/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe"
exec "/d/Claude/pixelrag-env/Scripts/pixelshot.exe" "$@"
```
這樣 Claude 透過 Bash 呼叫 `pixelshot <url> --output ... --tile-height 1568` 時會自動套用正確的 `CHROME_PATH`，不需每次手動設定環境變數。

## 結論 / 建議

值得安裝，且已完成安裝整合。主要價值：當 [[reference_firecrawl|defuddle/Firecrawl]] 等文字型擷取工具無法正確呈現版面（CSS 排版問題、視覺 bug 除錯、PDF 版面確認）時，可用 `pixelshot` 截圖讓 Claude 直接「看」。但 Windows 上有明顯的版本落差與環境問題，已記錄在 [[reference_pixelrag|reference memory]] 供日後參考。

## License

Apache License 2.0
