# 初次檢查，保留失敗紀錄

2026-09-18，Windows，交付 staging 副本。

- `node offline/build.mjs`：exit 0，但 sysflow 有 15 個懸空引用。原因是 ZIP 的 `.claude/skills` 為待 doctor 修復的文字佔位；已在交付副本將系統流程方法路徑改為實際 `skills/`。原始工作目錄不改。
- 系統 Python 3.14.2：`py -3 -B -X utf8 -m unittest discover -s evaluations -p 'test_*.py' -v`，exit 0，19 tests 通過。
- 系統 Python 3.14.2：`py -3 -B -X utf8 -m unittest discover -s skills/social-post/tests -v`，exit 1；10 tests 中 4 通過、6 Error。錯誤為 `timezone is not a recognized IANA timezone: 'UTC'`。此 runtime 缺 IANA 時區資料；未修改驗證條件、未安裝任何套件。
- 後續以已確認 UTC／Asia/Taipei 可用的 bundled Python 3.12.14 重驗；完整命令、exit code 和 stdout／stderr 另存本目錄。原失敗不被後續通過取代。

初次命令的完整輸出保留於本次對話工具結果；本檔保存命令、環境與失敗摘要。
