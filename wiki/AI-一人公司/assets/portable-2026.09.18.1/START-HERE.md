# AI 一人公司：解壓後從這裡開始

版本：2026.09.18.1（本機整理交付版，未發布至更新服務）。

這是一份供新使用者建立公司的資料夾，包含工作方法、角色、知識、工具說明、程式與離線工作台；不包含原使用者的私人專案、對話、帳號或金鑰，也不包含 AI 模型、桌面 App、Node、Python 或所有外部工具。

## 三步開始

1. 將 ZIP 完整解壓到你能讀寫的資料夾。開啟裡面的 `AI-一人公司`；這層應看得到 `AGENTS.md`、`SETUP.md` 和 `offline`。不要直接在 ZIP 預覽內操作。
2. 在下表所列的桌面模式選取／授權這個資料夾。帳號、功能和工具是否可用，以你當下的 App 為準。
3. 第一次貼上下面這段文字。AI 應先確認真的讀得到檔案，再一步一步引導；遇到缺工具或權限，就說明缺口，不宣稱全部完成。

```text
Setup。請先讀取這個資料夾的 START-HERE.md、AGENTS.md、機制.md 與 SETUP.md，確認公司根目錄，再依 SETUP 引導我完成首次設定或從未完成處續做。先確認目前 App 能讀寫此資料夾，以及能否執行必要命令；缺工具、權限、連結器或 hooks 時請明說，不假裝已啟用，也不自行修改全域設定。需要我的資料或帳號授權時，一次帶我完成一個步驟。只使用我指定的資料，私人歷史對話的讀取、持續記錄、排程及外部操作先確認。需要確認視覺的成品，先做圖片供我選方向／版型，確認後才實作。最後列出已完成、未完成和下一步，並提供 offline/index.html 的位置。
```

之後可說 `Setup` 續接。`hi` 是普通問候，不是四種模式都保證觸發的安裝指令；若 AI 只打招呼，貼上上面的完整文字。

## 桌面 App 怎麼選

| App／模式 | 使用方式 | 本包的限制 |
|---|---|---|
| Claude Code | 在桌面 Code 選本機 Local，選取解壓後的公司根目錄 | `CLAUDE.md` 是載入入口。必要 runtime、信任與 hooks 是否生效仍須現場檢查。 |
| Claude Cowork | 在桌面選取／授權公司資料夾，貼上首次提示詞 | 可依文件開始工作；不能把 Code 的 CLI、hooks、對話位置或自動載入規則直接套過來。無命令能力時停在可完成的文件設定。 |
| ChatGPT Codex | 開啟公司資料夾，使用本機 Local 工作 | `AGENTS.md` 是工作入口；不要選需要另一份 checkout 的 Worktree 或雲端環境來冒充此資料夾。 |
| ChatGPT Work | 桌面選 Work，保留 Work locally，選取／授權公司資料夾 | 官方支援可用工具下的本機檔案工作；本包的完整安裝、hooks 與外部連結器仍須逐項確認。 |

可以先雙擊 `offline/index.html` 看公司工作台，不需要先建置。工作台只是閱讀入口；AI 工作仍在對話中交辦。內容更動後，由能執行命令的 AI 重建工作台。

## AI 接入時的補充規則

本節補充可攜版的接入差異，不覆蓋目前使用者、App 或專案的有效指令。

- 第一次先確認根目錄、讀檔、寫檔與命令能力。依必要性檢查 Node 22+、Python 3.9+、Windows Git Bash；social-post 另需 Python 3.10+ 與 IANA 時區資料。
- `node ./offline/doctor.mjs --check` 只檢查。確認要完成設定後，`node ./offline/doctor.mjs` 才修復包內 `.claude/skills` 與 `.agent/skills` 別名；不安裝全域工具。Windows ZIP 內的別名是 `../skills` 文字佔位，需要此步驟修復，或直接讀 `skills/` 方法。
- `.agent/skills` 是本包沿用的相容別名，不代表每種 App 都會自動發現 skills；發現能力不足時，從角色卡按路徑讀取 `skills/`。
- 包內 hooks 設定供支援的 Claude Code 使用。設定存在不代表已執行；Node、信任或宿主能力不足時可能不生效。Codex hooks、Cowork 和 Work 的對話保存、排程須依當下官方介面與工具核對，不能套用舊記錄或猜 API。
- 安装後讀取私人歷史對話、啟用持續對話記錄、排程、全域設定或外部帳號前，確認資料範圍及使用者授權；連結器不是一次全裝，先接本次需要的服務。
- 新使用者的 `HUB.md` 保留示範條目。初次 `Setup` 應先做 §0 的環境與需求確認；續用才依 §0.6 從未完成處接續。缺 Node 時先說明如何安裝，不先要求執行 build。
- 報告、文件、網頁、軟體介面等需要確認視覺的成品，先提供圖片供使用者選方向／版型，確認後才實作。生圖工具不可用就明說並停在方向確認前，不把文字或程式碼當成已核准圖片；圖片定案不代替實作後的功能、排版與響應式檢查。
- Impeccable、style-library、瀏覽器等可選方法依目前 runtime 發現並讀取，並未因包含引用就隨包安裝；UI/UX 角色仍為 `forming`。

## 驗證到哪裡

交付包的本機檢查見同一 ZIP 外提供的驗收報告。這不等於已在四種桌面模式、全新電腦或 macOS 各跑完安裝。你仍需使用自己的帳號，按實際提示授權並確認每項能力。

## 官方說明（2026-09-18 核對）

- [Claude Code 桌面與本機模式](https://code.claude.com/docs/en/desktop)
- [Claude Cowork 資料夾與權限](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)
- [ChatGPT 桌面開啟資料夾](https://learn.chatgpt.com/docs/app)
- [ChatGPT Work：Work locally](https://learn.chatgpt.com/docs/get-started-with-work)
