---
source: "https://github.com/Hao0321/video-autopilot-kit"
author: "Hao0321"
stars: "2.1K"
clipped: 2026-09-09
tags: [github/repo, ai-company, video-qa, video-automation]
---

# video-autopilot-kit — 影片 QA 與整合評估

## 一句話說明

先採用可獨立驗證的成片 QA，完整自動剪輯暫緩。此版已改為 Editkin 執行契約，不能沿用舊版 CapCut／純 ffmpeg 路線的評估直接安裝。

## 專案概覽

以下是本次對話查詢 GitHub API 的快照，不代表持續更新。

| 項目 | 結果 |
|---|---|
| Stars | 2,072 |
| Forks | 334 |
| 核心語言 | Python；方法文件為 Markdown |
| 授權 | MIT |
| 最新 Release | v0.23.0，2026-08-27 |
| 原始碼版本 | `74041fcb292788f4c24e3d06f39fe2c9dee7a8cb` |
| Open 項目 | 本次 API 的 3 項均為 PR，不是 3 個已確認缺陷 |
| 公開驗證 | 該 commit 的 Actions 顯示 success；不等於本機完整剪輯已驗證 |

來源：[repository](https://github.com/Hao0321/video-autopilot-kit)、[固定版本 README](https://github.com/Hao0321/video-autopilot-kit/blob/74041fcb292788f4c24e3d06f39fe2c9dee7a8cb/README.md)、[CI 紀錄](https://github.com/Hao0321/video-autopilot-kit/actions/runs/33085420252)。

## 核心功能

- 長片、Shorts、訪談的規劃與素材支援。
- Python／ffmpeg 技術 QA：音量、字幕時間、黑邊、頻閃、停頓與檢視圖。
- Editkin plan、audit、apply、render 與 receipt 狀態契約。
- 發布包、成效、個人化 profiles 及相容版本更新／工作區 migration。

完整媒體依賴包含 Pillow、numpy、OpenCV contrib headless，並需要 ffmpeg／ffprobe；部分純規則工具依賴較少。不能把低依賴 demo 當完整渲染已可用。[依賴契約](https://github.com/Hao0321/video-autopilot-kit/blob/74041fcb292788f4c24e3d06f39fe2c9dee7a8cb/requirements-media.txt)

## 技術架構

```text
素材與 brief → Editkin v4 plan → audit → atomic apply → render
                    ↑                                  ↓
          Python 素材／規則工具                  技術 QA → 真人審片
```

`workflow_contract.py` 驗證步驟與狀態，`workflow_transport.py` 處理工具回傳資料；它們不等於 Editkin editor 本體。[workflow contract](https://github.com/Hao0321/video-autopilot-kit/blob/74041fcb292788f4c24e3d06f39fe2c9dee7a8cb/src/workflow_contract.py)

## 已確認的整合阻礙

1. **文件主入口缺檔**：README 與流程文件要求 `scripts/hao_autopilot.py workflow ...`，但本次固定 commit 的公開 source tree 沒有該檔。雖有 workflow_contract.py 自帶 CLI，仍需驗證替代調用與依賴；此結論針對 source tree，未檢查 release ZIP。[操作文件](https://github.com/Hao0321/video-autopilot-kit/blob/74041fcb292788f4c24e3d06f39fe2c9dee7a8cb/codex-skill/video-autopilot/references/editkin-workflow-execution.md)
2. **Editkin 環境未具備證據**：本次 Codex 可用工具清單沒有 Editkin。現有一人公司 video-editor 指向 Cutline，不能直接新增第二個總入口或宣稱兩者等同。
3. **QA 預設並非全項檢查**：final_delivery_qa 預設未開音訊／字幕同步等所有檢查。teaching_longform 有較強要求，但不應直接套在懸疑敘事片；刻意停頓須依本片目標判斷。[QA 程式](https://github.com/Hao0321/video-autopilot-kit/blob/74041fcb292788f4c24e3d06f39fe2c9dee7a8cb/src/media_delivery_qa.py#L564)
4. **生產入口可能改動工作區**：startup_update 包含更新與 migration，不能把完整入口當唯讀分析。正式採用前需界定更新政策與隔離落點。[啟動更新](https://github.com/Hao0321/video-autopilot-kit/blob/74041fcb292788f4c24e3d06f39fe2c9dee7a8cb/src/startup_update.py)

## 與 AI 一人公司的整合

推薦先為 Forbidden Asia Files 做一段授權素材的 QA 試作：既有剪輯流程產 MP4 → 選定技術 QA → 原 quality-gate 彙整證據及真人審片 → 原發布流程。

先校準音量、字幕時間與黑邊等可客觀檢查項目。不要把懸疑片刻意停頓當廢句，也不把機器分數當品味或文化審查結果。成效仍由已接好的 social-post 管理，不建立第二份頻道／發布帳本。

## 安裝建議

⏳ **完整套件暫緩；優先局部 QA 試作，尚未安裝。** 先驗證來源版本、所選模組依賴及正常／異常素材，再決定擴大。完整剪輯須先解決 CLI 入口、Editkin 工具環境與真實 render 驗證。

## 驗證範圍

已讀 GitHub API、README、Skill、依賴、workflow／transport、QA、startup update 及 CI 文件。未安裝、未執行上游測試、未渲染影片、未檢查 release ZIP。Repomix 因分析階段唯讀未執行，無 token 統計；無外部首頁。社群搜尋不足以證明目前 Editkin 路徑可用；本頁不保留易過期的社群摘要。

## 相關連結

- [[AI-一人公司/_index|AI-一人公司分類]]
- [[AI-一人公司/claude-skill-code-cleanup — 稽核工具與整合評估|Cleanup 整合評估]]
- [[Github/repos/video-autopilot-kit — 填自己資料的 YouTube 短影音自動化框架|舊版分析：截至 2026-08-03，非現行版本結論]]
