---
source: "https://github.com/XiaoPuOuO/openchatx-mcp"
author: "XiaoPuOuO"
stars: "142"
clipped: 2026-09-28
tags:
  - github/repo
  - mcp
  - agent-runtime
---

# openchatx-mcp — ChatGPT 本機執行平台與公司採用評估

## 一句話說明

讓一般 ChatGPT 對話透過 MCP 呼叫本機檔案、Shell、電腦操作及外部工具的執行平台；對已有 Codex 與公司 Skills 的環境，主要價值是多一個 ChatGPT 工作入口，目前不建議整套替換或接入正式資料。

查核日 2026-09-28；固定原始碼 `8a42ffb5c2a0970d47653a65e0263a98331b757f`。本次為 API、文件與關鍵原始碼靜態抽查，未安裝、未連 Tunnel、未執行上游程式。下文的公司採用判斷是分析，不是安全認證。

## 專案概覽

| 項目 | 查核值 |
|---|---|
| Stars / Forks | 142 / 10；API 即時值，網頁快取曾顯示 135 stars |
| 語言與技術 | 核心 TypeScript、Node.js、Express、MCP SDK |
| 授權 | MIT；另有 THIRD_PARTY_NOTICES，包含 Shellby 衍生來源 |
| 建立 | 2026-09-23T14:25:56Z；不等於所有程式從此日開始開發 |
| 最後推送 | 2026-09-27T09:23:42Z |
| 最新 Release | v0.5.3，2026-09-27T09:23:42Z |
| Open issues + PRs | API 合計 0；all issues 查詢空陣列，不代表沒有缺陷 |
| Archived | false |
| Repo size | GitHub size 60,989 KB，不等於安裝後占用 |
| 獨立首頁 | API homepage 空白；package.json 指回 GitHub |
| 主要貢獻紀錄 | Austin1serb 307、XiaoPuOuO 85、ImgBotApp 1；不據此推定三名持續維護者 |

來源：[GitHub API](https://api.github.com/repos/XiaoPuOuO/openchatx-mcp)、[Releases](https://github.com/XiaoPuOuO/openchatx-mcp/releases)、[package.json](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/package.json)。近四週 commit_activity 沒取得可用陣列，不填推估值。

## 核心功能

- 內建檔案、搜尋、patch、Shell、長時間工作管理。
- 聚合外部 MCP 與自訂 Toolbox；工具按需發現與載入，避免一次塞入全部定義。
- Skills、Rules、Projects 與啟動指引，讓 ChatGPT 有本機工作規則。
- 可配置 OpenAI-compatible 模型供子代理使用，並管理任務、工作流與節點。
- 本機保存摘要，以 UUID 在新對話接續；這是暫時交接機制。

来源：[README](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/README.md)、[工具目錄](https://github.com/XiaoPuOuO/openchatx-mcp/tree/8a42ffb5c2a0970d47653a65e0263a98331b757f/src/tools)。功能存在不代表本機相容性已驗證。

## 技術架構

```text
ChatGPT 對話
  ↕ MCP 請求與工具結果
OpenAI Secure MCP Tunnel
  ↕ 本機向外建立連線
OpenChatX HTTP / MCP server
  ├─ 身分綁定與工具註冊
  ├─ 檔案 / Shell / Projects / Jobs
  ├─ 外部 MCP / 自訂 Toolbox
  ├─ Skills / Rules / 暫時 Summaries
  └─ 子代理 → 設定的模型 API
```

HTTP server 使用 MCP Express app；遠端帶 `x-openai-subject` 或遠端標記的 tools/call 經 auth store 檢查。auth store 第一次綁定 subject，後續拒絕不同 subject。這不是每個操作的細粒度授權，也不保證所有工具都受同一個沙箱保護。[HTTP server](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/src/server/http-server.ts)、[Auth store](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/src/auth/store.ts)。

Shell 先解析執行範圍，再啟動程序；Project 路徑政策不是 OS 隔離。子代理 runtime 對設定的 base_url 發出 `/chat/completions`，因此外部模型端點是額外資料流向；本機執行不等於資料全程留在本機。[Shell](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/src/tools/shell/bash-tool.ts)、[子代理 runtime](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/src/subagents/runtime.ts)。

官方確有 Secure MCP Tunnel 文件，能支持其連線架構；不代表 OpenAI 替這個第三方專案背書。README 關於一般 Chat 額度與 Codex 額度的說法，不能延伸成免費、無限制或保證較便宜；本次未驗使用者帳號資格、計費或額度。[OpenAI Tunnel 文件](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels)、[MCP apps 說明](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)。

## 值得注意的限制

1. **權限範圍大。** SECURITY 明說以本機使用者權限運作，localhost MCP 刻意不做認證；遠端須沿預期 Tunnel 信任路徑。自訂 Toolbox／外部 MCP 未必經過 Project 路徑檢查。不要把「只選一個專案」當成 OS 沙箱。[SECURITY](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/SECURITY.md)。
2. **第三方能力商店不是審核保證。** 上游有固定 commit、拒絕 symlink／submodule、路徑大小限制等設計，但官方仍明示社群程式未經其核可，靜態檢查不能证明安全。同上安全文件。
3. **接續摘要不適合直接當長期帳本。** `consume()` 從集合刪除摘要後保存，再回傳內容；重取相同 UUID 可能找不到。公司應保留現有可追溯文件，不能因有 summarize 就假定等同 Sessionlog。[summary-registry.ts](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/src/summaries/summary-registry.ts)。
4. **Windows 有支援，但證據要分層。** README 提供 x64／ARM64 套件並明示未做 Authenticode 簽章。CI 的 Windows 路線執行五個指定平台測試檔，僅 x64 執行 bundle smoke；macOS 路線執行 npm test。不能把 CI 綠燈說成 Windows 全套行為已驗。[CI 定義](https://github.com/XiaoPuOuO/openchatx-mcp/blob/8a42ffb5c2a0970d47653a65e0263a98331b757f/.github/workflows/ci.yml)。

## 社群健康度

固定 SHA 的 [CI](https://github.com/XiaoPuOuO/openchatx-mcp/actions/runs/36308518143) 與 [Release](https://github.com/XiaoPuOuO/openchatx-mcp/actions/runs/36308876699) 在 API 查詢時皆為 success。最近三版 v0.5.1、v0.5.2、v0.5.3 都在 9/27 發布，顯示更新頻繁，但觀察期短、還不能證明長期穩定。繼承的提交歷史也不能直接當作現維護者的長期維運紀錄。

星數未達 repo-intel 的 1,000 門檻，本輪未啟動社群口碑與 YouTube 搜尋；沒有第三方長期採用證據。

## Repomix 深度分析與證據限制

本次選擇唯讀遠端原碼抽查，未執行 Repomix、未 clone、未安裝依賴。沒有總 tokens／最大 token 檔案排名，也没有 AST 或 runtime 測試證據。gh 因無法讀取本機 config.yml 失敗，改用公開 GitHub REST API 取得 metadata、樹狀結構、release、contributors 與 Actions 結果。未執行本地索引；不將原碼文字搜尋稱為 AST 分析。

實際讀取：package.json、SECURITY、HTTP server、auth store、project scope、Shell tool、subagent config/runtime、summary registry、lazy tool registry、CI 定義；這是重點抽查，未逐檔審計所有桌面、UI、Toolbox 或依賴程式。無獨立 homepage，因此未啟動 Defuddle。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Codex | 本輪現有能力已能讀写檔案、執行命令與工具；再放一層 runtime 的直接增益有限。OpenChatX 主要補一般 ChatGPT 的本機入口。 |
| 公司 Skills | 可參考按需載入、工具目錄與能力健康狀態；不用搬整個執行平台，也不因外觀相似就假定 Skills 語意完全相容。 |
| Obsidian | 檔案可接入不代表符合公司的來源、私有資料、寫入及保存契約。暫時 UUID 摘要不能替代現有紀錄。 |
| Automation | Jobs／Workflows 有潛力，但目前沒有必須用它才能完成的已確認公司需求。新增維護、憑證與權限成本尚無相應效益證據。 |

## 安裝建議

⏳ **觀望，不整套導入公司；先作原碼參考。**

只有在明確需要「以一般 ChatGPT 直接處理本機工作」而既有 Codex 路線不適用時，才值得做隔離試用。試用應以獨立 OS 帳號或 VM、合成資料和最少工具建立一條完整流程，再驗檔案範圍、錯誤停止、摘要重取及 Windows 操作；不能只靠 Project flags 當隔離。這是未來試用條件，本次沒有執行或安裝授權。

值得參考的兩點是工具定義按需載入，以及能力健康狀態與實際可用性的分開呈現。跨對話 UUID 可參考呈現方式，但公司的保存與重試需求不同，不宜原樣搬入。它也不能直接解決本輪既有 Codex CLI `UnknownIssuer` 問題，沒有證據表明换平台能修復該 TLS 根因。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
- [[AI-一人公司/_index|AI 一人公司分析]]
- [固定版本原碼](https://github.com/XiaoPuOuO/openchatx-mcp/tree/8a42ffb5c2a0970d47653a65e0263a98331b757f)
