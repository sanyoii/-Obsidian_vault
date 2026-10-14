---
source: "https://github.com/yetone/magpie"
author: "yetone"
stars: "12.3K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "model-gateway"
  - "agent-tools"
---

# magpie — 跨 Agent 模型閘道與認證邊界評估

## 一句話說明

Magpie 是本機模型閘道與 agent 設定管理工具，讓多個 coding agent 共用供應商、訂閱帳號及路由群組。Windows 有原碼與 Release 附件，並非只支援 macOS；但它會讀寫認證、改寫 agent 設定並改變模型服務路徑。對目前 Windows／Codex 工作流建議 ⏳ 觀望，先不接管主環境。

## 專案概覽

| 項目 | 2026-10-14 查詢快照 |
|---|---|
| Repository | yetone/magpie |
| Stars / Forks | 12,360 / 833 |
| 主要語言 | Go；GUI 有 JavaScript assets |
| 授權 | MIT |
| 建立時間 | 2026-09-23 16:22:35 UTC |
| 最後推送 | 2026-10-14 10:36:46 UTC |
| 固定 SHA | `845b5c4dddb0a2e03e259271ac044b41a08eb7a6` |
| 最新 Release | v0.1.1233，2026-10-14 08:19:16 UTC；不能視為固定 main 的相同 binary |
| Open Issues / PRs | repo API 合計 629；分次查詢 PR 18，issue 約 611，快速變動中 |
| Windows 附件 | GUI／CLI，amd64／arm64，各有 .exe；未下載或執行 |
| Go 需求 | go.mod 指定 1.26.8 |
| 首頁 | https://usemagpie.ai |
| Archived | false |

來源：[API](https://api.github.com/repos/yetone/magpie)、[固定來源樹](https://github.com/yetone/magpie/tree/845b5c4dddb0a2e03e259271ac044b41a08eb7a6)、[Release](https://github.com/yetone/magpie/releases/tag/v0.1.1233)。

## Repomix 深度分析

固定 codeload 解壓共有 5,080 檔，含 2,060 個 Go test 檔。Repomix 1.18.1 使用 `--compress --no-gitignore` 打包 4,275 檔、4,348,229 tokens、15,003,875 字元；11 個被 security scanner 標記的檔案被排除，均為 test／fixture 檔名。本輪未逐項確認是否真憑證，不把 scanner 命中說成已證實洩漏，也不把 XML 說成完整來源。

採定向原碼讀取，不把整個 XML 當上下文。核心抽查：main／Go dependencies、Codex adapter、subscription discovery、provider persistence、gateway LAN gate、stats、updater 與 CI。沒有建立本機 AST index。

原始文字檔最大五項如下；此表是檔案 bytes，並非壓縮後 token 排行，完整 token Top 5 本輪未保留：

| 檔案 | Bytes |
|---|---:|
| internal/gui/assets/i18n.js | 1,951,291 |
| internal/gui/assets/app.js | 1,347,879 |
| internal/gui/assets/routing.js | 317,377 |
| internal/gui/assets/plugins/library/client.js | 266,157 |
| internal/gui/assets/plugins/library/i18n.js | 252,322 |

研究與 XML 保留於本次 workspace `work/repo-intel/magpie-20261014/`，未清理、未安裝 Magpie、未提交或推送。

## 核心功能

| 能力 | 已讀到的實作／文件 |
|---|---|
| 多協定閘道 | OpenAI Chat／Responses、Anthropic Messages、Gemini 路線，轉換 streaming、tools、reasoning；本輪未驗協定對等性 |
| Agent 設定管理 | 對不同 agent 的 config 寫入 provider／base URL／model；提供 profiles 與回復機制 |
| Provider 與群組 | API keys、local models、訂閱來源、routing groups、額度與 account failover；不等於不同模型有相同能力 |
| 訂閱探索 | 預設讀 agent 既有登入；可用設定或 process env 關閉；部分 refresh／切換流程會寫入登入資料 |
| 使用介面 | GUI、CLI、TUI、Web UI；Go＋Wails v3 beta desktop runtime，並有 Windows build files |
| Plugin | OpenCode／Pi 類 auth plugin，另使用 Bun runtime；文件說首次需要時下載 Bun，擴大供應鏈與可執行程式範圍 |
| 分享與限制 | 遠端 gateway keys、來源 IP allowlist、模型／帳號與消耗限制；loopback 與遠端有不同門檻 |
| 備份同步 | profiles、providers、library 等備份；WebDAV／S3／GitHub encrypted backup 等需另外配置與授權 |

來源：[README](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/README.md)、[reference](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/docs/reference.md)。

## 技術架構

```text
GUI / CLI / TUI / Web UI
          │
          ├─ agent adapters → 各 agent 的設定與模型目錄
          ├─ subscription readers → 既有登入與 refresh
          └─ gateway（預設 127.0.0.1:3425）
                  ├─ protocol translation / middleware
                  ├─ routing groups / budget / account failover
                  └─ API provider / subscription / local model / plugin
```

`main.go` 只呼叫 `internal/cli.Main`，並透過 blank import 註冊內建 plugins；Go dependencies 包含 Wails v3 beta、Bubble Tea TUI、SQLite、TOML／YAML 等。它是有 daemon、storage、設定管理的應用，不能當成一份只讀 Skill 或零副作用的 model picker。

Codex adapter 在 ChatGPT sign-in、API key、額度耗盡等狀態下有不同 wiring。`internal/agent/codex.go:30–60` 說明有時僅改 `openai_base_url`，有時改為 `[model_providers.magpie]`、model_provider 與 catalog。曾用該 provider 建立的 thread 可能仍依賴 provider table；移除閘道不是只改回一個模型名稱。這是上游程式中的相容性設計，尚未核對目前本機 Codex 的全部行為。

來源：[Codex adapter](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/internal/agent/codex.go)、[go.mod](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/go.mod)。

## 認證、網路與更新邊界

1. **預設認證探索不是只讀 metadata。** `provider/discovery.go` 的 reader 會讀 agent credential files；`settings/accounts.go` 支援 `MAGPIE_NO_ACCOUNTS` 與 NoAccountDiscovery。訂閱來源的 refresh／切換能寫認證。這是產品功能，不據此指控竊密；但導入必須明確授權讀寫範圍，不能沿研究授權執行。
2. **Provider keys 是本機 JSON 資料。** `provider.go:store` marshal providers 後交 `writePrivate`，後者以 0700 目錄／0600 檔案模式與 atomic writer 保存。這層不是憑證內容加密；Windows 實際 ACL、備份與同步中的密鑰保護本輪未驗證，不能把 Unix mode 當成 Windows 隔離證據。
3. **Loopback 與共享路徑不同。** `gateway/lan.go` 有 IP allowlist、local／proxied 判定、DNS-rebinding host 檢查與 gateway key 門檻；本機 calls 不等同需要遠端 key。檔案中的防護存在不等於沒有繞過，部署 tunnel／LAN／反向代理要另測，不可直接把 loopback gateway 暴露到外網。
4. **Release 有遙測且可關閉。** `stats.go` 預設每日向 PostHog 送 active event；NoUsageStats 未開時，另包含內建 agent／provider／model IDs、群組數與 partner counts。原碼說不傳帳號、key、prompt；本輪未做封包觀察。固定 reference 已揭露 usage stats，不能描述成「完全無遙測」。DO_NOT_TRACK／MAGPIE_NO_STATS 與隱私設定是關閉入口；source build 預設不送。
5. **會自動下載與更新。** NoAutoUpdate 為 opt-out；更新 feed 在 usemagpie.ai/api/latest，update.go 以 SHA-256 比對 binary。macOS 路線另檢簽章 team，Windows／Linux bare binary 沒有相同簽章檢查。來源與 hash 來自更新 feed；本輪未驗 Release binary／簽章或回復。
6. **供應商變更也是資料流變更。** 把 Codex 改接另一家模型，prompt、程式與 tool 結果會沿新供應商路線處理。不能把既有 OpenAI 登入授權當成所有第三方資料處理授權；不同訂閱的相容性、使用條件與計費本輪沒有逐家核對。

來源：[discovery](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/internal/provider/discovery.go)、[credential writer](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/internal/provider/logins.go)、[LAN gate](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/internal/gateway/lan.go)、[stats](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/internal/stats/stats.go)、[update](https://github.com/yetone/magpie/blob/845b5c4dddb0a2e03e259271ac044b41a08eb7a6/internal/update/update.go)。

## 社群健康度與驗證狀態

前十貢獻者中 yetone 2,926 commits，第二位 50、第三位 42；維護高度集中。建立約三週而 Release patch 已到 1233，最近五次都在約一天內，表示變動密集，不能把版本號當成成熟度。近四週完整 commit count 本輪未取得；contributors 不是當月數據。

固定 SHA 的 [Test run](https://github.com/yetone/magpie/actions/runs/38550791684) 查詢先 pending，收尾刷新為 cancelled；[Docker run](https://github.com/yetone/magpie/actions/runs/38550791740) success。沒有該 SHA 完整 Test PASS。

`.github/workflows/test.yml` 有 Ubuntu／macOS／Windows matrix，但完整 `go test ./...` 與 race 步驟限制在非 Windows；Windows 有 vet 與兩個 plugin stderr tests。不能因 matrix 有 Windows 就說所有測試在 Windows 通過。

本機可用 PATH 未找到 Go，標準安裝位置探查也未找到；因此未執行 Go build／tests，不安裝 toolchain 補跑，也沒有啟動 Magpie／CLI、gateway 或登入探索。2,060 份 Go test files 是來源盤點，不是 2,060 個已通過的測試。

近期 issue 有 agent 偵測列出已卸載 app、protocol routing、429 failover、GUI 平行測試與 Claude context window 改寫回報。例如 [#2162](https://github.com/yetone/magpie/issues/2162) 的 272K 視窗寫入回報仍 open；僅讀 issue 線索，本輪未重現，不能當成已驗根因或本機故障。

## 官方網站與社群口碑

defuddle 成功擷取 usemagpie.ai，內容描述多 agent 共用供應商與模型列表，和 README 的方向一致。網頁展示不能代替認證、Windows 安裝、協定轉換及備份回復的本機驗證。

本 session 的 Agent Reach doctor 已顯示 X 認證失敗、Reddit 擴充未就緒、Exa 未設定，沿用此可用性檢查，改用現有 web 搜尋。對 yetone/magpie 的 Reddit／HN 定向搜尋無結果；搜尋到自動掃描聚合站把它稱為 Skill 並給 SAFE 評分，但實際來源是會讀寫認證的 gateway app，這類標籤不能作為安全證據。口碑證據不足，不填造正負評。

## 與現有系統的相關性評估

| 面向 | 判斷 |
|---|---|
| Obsidian Vault | 沒有直接知識整理或 Vault 索引增量；只是上游模型存取層 |
| Codex | 若確實要多供應商／多訂閱切換有用途，但會碰 config、catalog、auth 與 thread provider 依賴；目前主環境先保持既有登入路線 |
| Automation | 路由、budget、fallback 可參考；需要證明重試不造成副作用重複、不同模型 tool／reasoning 格式相容，才適合承接正式任務 |
| Windows | 有實際 Windows 原碼與附件；未驗本機 GUI、CLI、WSL、設定回復與 ACL |
| 維護成本 | 增加 gateway 常駐、provider keys、plugin runtime、自動更新與 fallback 行為；單一 agent 原廠方案足夠時增量有限 |

## 安裝建議

⏳ **觀望，不接管現有 Codex 主環境。** 工具解決的問題清楚，平台與協定實作也完整；目前的主要阻礙是高變動速度、認證與設定的廣泛讀寫、Windows 測試覆蓋限制，以及本輪沒有 runtime／protocol contract evidence。

若日後有明確「另一家模型要接進既有 agent」的需求，最小驗證應使用隔離 HOME／XDG_CONFIG_HOME／CODEX_HOME、獨立測試 API key、停用 subscription discovery／stats／auto-update，先驗 Responses tool call、streaming、錯誤與切回原設定。這些是未執行的候選範圍，需要另行授權安裝與供應商資料流；不操作真帳號來證明概念。

## 相關連結

- [[Github/_index|Github Repo 分析總索引]]
