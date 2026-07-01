---
source: "https://github.com/zhenheco/life-chart-engine"
author: "zhenheco"
stars: "57"
clipped: 2026-06-30
tags:
  - "github/repo"
  - "命理"
  - "人類圖"
  - "紫微斗數"
  - "占星"
  - "deterministic-engine"
---

# life-chart-engine — 三合一原生排盤引擎

> **zhenheco/life-chart-engine** | ⭐ 57 | 🍴 11 | 📝 MIT
> "三合一排盤引擎：西洋星盤 + 人類圖 + 紫微斗數，原生天文/曆法計算，離線 deterministic，CLI + JSON（供 AI agent）。"

## 一句話說明

一支離線 CLI 工具：輸入一個人的出生資料（日期/時間/時區/經緯度），一次計算**西洋本命盤、人類圖、紫微斗數**三套獨立系統，輸出 Markdown 報告或結構化 JSON。所有數字來自真實天文計算（astronomy-engine）與真實紫微庫（iztro），不打遠端 API、不查快取、不上網——同一輸入永遠 byte-for-byte 相同輸出。目標族群：要可重現、可驗證排盤的命理工作者、開發者，以及需要純計算步驟的 AI agent。

## 核心設計理念：三系統交叉驗證

README 點出引擎的核心哲學：三套系統跑**同一個出生時刻**，所以彼此可互相佐證。
- 三系統都指向同一訊號 → 高信心
- 只有一套系統顯示某細節 → 當參考點，不當結論

它產出的是「可交叉閱讀的事實」，而非單一裁決。Type / Authority / Definition 在人類圖中**不是硬編碼**，而是從已定義中心的連通圖推導出來的。

## 三系統各自產出

| 系統 | 產出內容 |
|------|---------|
| **西洋本命盤**（Tropical / Placidus） | 上升 + 天頂、12 行星/點（含逆行旗標、星座、度數、宮位）、12 宮頭、所有相位（合/六分/四分/三分/對分，依緊密度排序）|
| **人類圖** | 類型、權威、輪廓、定義、輪迴交叉、88° 設計日期、定義/開放中心、定義通道、Personality + Design 雙圖每行星的 gate.line |
| **紫微斗數**（iztro） | 五行局、命主/身主、時辰、每宮 ganzhi + 命身旗標 + 大限年齡範圍 + 主/輔/雜曜（含亮度與四化）；可選大限/流年/小限流盤 |

## 技術架構

```
chart_engine.py  ← 主引擎：CLI + build_json，三系統整合
   ├── ephemeris.py     ← astronomy-engine 適配層（行星位置/宮位/JD 曆法計算）
   └── ziwei_iztro.cjs  ← Node sidecar，呼叫 iztro@2.5.8 算紫微
server.py        ← FastAPI HTTP 包裝（/health + /chart，X-Engine-Key 驗證，fail-closed）
webapp.py        ← Web UI
```

| 層次 | 技術 |
|------|------|
| 天文計算 | astronomy-engine（純 Python，取代 Swiss Ephemeris，無原生依賴）|
| 紫微 | iztro@2.5.8 Node bundle（checked-in vendor/iztro.cjs，esbuild 打包）|
| HTTP | FastAPI 0.128 + uvicorn |
| Runtime | CPython 3.12（鎖定，已驗證；紫微原生依賴解除後可日後 revisit）|
| 套件管理 | uv（venv + pinned requirements）|

**設計亮點：**
- 人類圖 gate/center/channel 對應表、64 閘門 SEQ 序列、OFFSET 全部寫死在 `chart_engine.py`，純查表+連通圖運算，不依賴外部人類圖庫
- 紫微走 Python→Node subprocess 橋接 iztro，因 iztro 是成熟 JS 庫
- `server.py` fail-closed：未設 `ENGINE_API_KEY` 直接回 503（除非 `ENGINE_ALLOW_OPEN=1`），因設計上會擺在公開 reverse proxy 後

## 倉庫狀態

| 項目 | 數值 |
|------|------|
| 主要語言 | Python（83KB）+ JS/Shell/PowerShell |
| 授權 | MIT |
| 建立 | 2026-05-31（很新）|
| 最後推送 | 2026-06-29（活躍）|
| 貢獻者 | zhenheco、htflymm（2 人）|
| Release | 無正式 release（rolling main）|
| 測試 | ephemeris baseline + iztro parity fixtures（deterministic 回歸驗證）|
| 國際化 | 19 種語言 README |

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **hd-decode** | 🔥 高度相關。現有 calc-server 是 Flask + pyswisseph（port 5001），有原生依賴。本引擎用純 Python astronomy-engine，**無 Swiss Ephemeris 原生編譯負擔**，且人類圖計算自帶（gate/channel/center 推導）。可評估替換或交叉驗證 calc-server 輸出 |
| **ziwei app** | 🔥 高度相關。本引擎紫微走 iztro@2.5.8，與 ziwei app 計劃整合的 iztro 同源；JSON schema 可直接餵前端 |
| **fate（命運羅盤）** | 🔥 直接對口。fate 是 Next.js 多系統命理 App，本引擎正好提供 deterministic JSON 後端（一次出三系統）|
| **AI agent 整合** | `--json` 模式專為 agent 設計，schema_version 1.1，可當 Claude/MCP 純計算工具 |

## 安裝建議

✅ **適合安裝/評估** — 與使用者三個進行中命理專案（hd-decode / ziwei / fate）高度重疊，是潛在的統一 deterministic 計算後端。最大價值：① 人類圖計算自帶、無 pyswisseph 原生依賴 ② 三系統同源出生時刻、可交叉驗證 ③ JSON 模式對 AI agent 友善。建議先 clone 跑 `--json` 比對 hd-decode calc-server 輸出，確認天文計算一致性後再決定整合策略。風險：很新（2026-05 建立）、2 人維護、無正式 release，API/schema 可能變動。

## 相關連結

- [[Github/repos/Renhuai123ziwei-doushu — 倪海夏夏天紀體系紫微斗數引擎|ziwei-doushu（倪海夏）]]
- [[Github/repos/Retsomm SelfMap 人類圖計算器 - Next.js + Swiss Ephemeris WASM|SelfMap 人類圖]]
- [[Github/repos/OpenFate Bazi MCP — 八字四柱確定性排盤 MCP 伺服器|OpenFate Bazi MCP]]
- 本機專案：active/hd-decode（人類圖 calc-server）、active/ziwei（紫微 App）、active/fate（命運羅盤）

## 安裝後更新（2026-07-01）

實際 clone 安裝至 `active/life-chart-engine/`，本機跑起來確認可用。過程中發現一個真實 bug：

- **人類圖 OFFSET 算錯**：`scripts/chart_engine.py` 的 `OFFSET=-1.375`（自訂 64 閘門序列，gate 25 起頭）跟 hd-decode 已驗證的標準 Rave Mandala 常數（`ARIES_0_OFFSET=58.0`，gate 41 起頭）對不上，導致人格太陽/地球閘門系統性錯位，角色（profile）、輪迴交叉、部分通道全錯（設計太陽/地球側因兩邊剛好結果一致才沒被發現）。GitHub 已有人獨立回報同個問題（issue #4，doreenku，2026-06-27，提出修正值 `-1.9450084318668388`，未驗證）。
- 已套用本地 patch（改用 hd-decode 驗證過的 58.0 offset + gate-41 序列），未提交上游，**`git pull` 會覆蓋需重套**。西洋占星與紫微部分不受影響。
- 衍生出 Claude Code skill `tri-system-life-reading`：把這次三系統交叉解讀的方法論（收斂訊號優先、HD閘門級分析、紫微命遷財官、西洋宮主星鏈等技法）固化成可重用 skill，含 Apple 風 HTML 視覺報告模板。

詳見本機 memory：`projects/project_life_chart_engine.md`、`projects/project_tri_system_skill.md`。
