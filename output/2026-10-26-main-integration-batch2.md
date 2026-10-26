# 第二批主線整合：QA 模板參考入口

2026-10-26。基準 `10d9144f534b7b0ca71d23d6c6e56da803937232`；保留分支 `dbbd04091ffba1d2f53eb46261755d5cf4ced139` 的九份 v0.1.0 不直接升為正式規則。本批從 RiskQADemoSite `0a4d1d099651d5bcedb49f85965eeb02bbdb0c98` 取九份 v0.3.0 位元組相同副本。

## 使用與驗證

- [[Templates/QA/README|QA 範本入口]]：固定來源、版本、QA-Lite 三份紀錄、20 頁中英文閱讀入口／示例連結；執行命令回正式 repository。
- 更新公司 Wiki 入口、主索引、摘要、關聯與 log；既有案件表加上歷史快照提示，不改案件內容或 Run。
- `.gitignore` 排除個人命盤目錄。正反例確認私人路徑被排除、正式模板仍可追蹤。
- `py -3 -B -X utf8 -m unittest discover -s scripts -p test_qa_template_mirror.py`：2/2，核對九份版本／完整來源雜湊、20 個固定版本中英文連結與本機入口。
- 來源連結的目標路徑另以固定 commit tree 核對；未聲稱遠端頁面已實際開啟。

## 保留項目

未合併 `.local-backups`、Obsidian plugin build、Claude 設定、課程／原始來源包、其他研究筆記與 UI 提案。沒有執行 gbrain 匯入或 embedding；本次不是全庫 compile。正式案件狀態仍在測試公司 case.json。
