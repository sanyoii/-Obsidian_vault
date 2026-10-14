---
source: "https://github.com/microsoft/ai-agents-for-beginners"
author: "microsoft"
stars: "77.1K"
clipped: 2026-10-14
tags:
  - "github/repo"
  - "ai-agent"
---

# ai-agents-for-beginners — Agent教材與範例驗收界線評估

## 一句話說明

Microsoft 的 18 課 Agent 教材，涵蓋工具使用、RAG、可信任 Agent、部署與安全。適合閱讀與隔離練習；範例和 smoke test 都有明確簡化，不能直接當正式公司服務或完整驗收套件。

## 專案概覽

| 項目 | 2026-10-14 快照 |
|---|---|
| Stars / Forks | 公開 HTML embedded data：77,129 / 25,345 |
| 主要語言／內容 | Markdown、Python、Jupyter notebooks |
| 授權 | MIT |
| 固定 SHA | 92d833e9df9a38a5071169b17c07ad134e549ec5 |
| 課程與環境 | 18 課；主要路線 Microsoft Agent Framework 1.10、Foundry／Azure OpenAI、Python3.12+ |
| Watchers / commits | HTML 579 / 2,082；不當現役人力 |
| Release／日期／Issues | 公開 API 限流，本輪未確認精確數值 |

[固定來源](https://github.com/microsoft/ai-agents-for-beginners/tree/92d833e9df9a38a5071169b17c07ad134e549ec5)、[setup](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/00-course-setup/README.md)、[requirements](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/requirements.txt)。

## Repomix 深度分析

原始來源 10,226 檔、2,240 notebooks，包含大量翻譯。打包明確排除 translations/**，保留主要課程與程式；不是完整翻譯庫 token 數。Repomix1.18.1、XML、未 compress、--no-gitignore：215 檔、947,859 tokens、3,214,779 字元；未偵測可疑檔案。

| Top 5 | Tokens | 佔比 |
|---|---:|---:|
| 15-browser-use/llms.txt | 36,126 | 3.8% |
| 15-browser-use/15-browser-user.ipynb | 29,837 | 3.1% |
| 14-microsoft-agent-framework/code-samples/14-human-loop.ipynb | 17,889 | 1.9% |
| 09-metacognition/README.md | 13,272 | 1.4% |
| 18-securing-ai-agents/code_samples/18-signed-receipts.ipynb | 10,769 | 1.1% |

## 核心功能

有順序式概念、Notebook 實驗、工具與人核准示範、觀測與小型 evaluation。閱讀不需要雲端；主要範例執行需 Azure subscription、az login、endpoint／模型或 keys，不保證免費。FoundryLocal 路線也要另下載 runtime／model，且未涵蓋全部 Responses 能力。

requirements 因 breaking change 固定 agent-framework-core 1.10.0，不能只用最新套件重跑就推定相容。[學習指南](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/STUDY_GUIDE.md)、[第16課](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/16-deploying-scalable-agents/README.md)。

## 技術架構

```text
課程 README -> notebook + provider/framework
            -> Azure / Foundry 或有限本地替代
            -> 工具 / approval / trace / evaluation示範
manual smoke workflow -> 已部署資源 -> substring expectations
```

### 已驗證的範例限制

第16課 ORDERS／TICKETS 是 mock；refund 回字串，release 只列印 promoting，沒有部署 API。四個 keyword evaluation 直接測 small model，沒有覆蓋 routing、cache 或 approval。Smoke 的 contains_any 也可能只因回答出現訂單 ID 就過，不足以驗證正確訂單狀態。[Notebook](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb)、[測試說明](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/tests/README.md)。

同課 handle_support_request 先以 normalize(query) 查 cache，再加 customer memory。**原始函式的離線 fixture 已重現：兩位客戶問同一句，第二位取得第一位的 context 回覆。** 若搬成多客戶服務，至少要按身分與上下文隔離 cache。這是模擬驗證，沒有真實資料外洩，也沒有修改上游。

第6課 scripted approval 示範拒絕一次後 retry 自動批准；真人 input 要另啟用。第18課 receipt 驗簽只證來源／完整性／順序，不證 policy 真的執行或動作正確。[第6課 notebook](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)、[receipt 界線](https://github.com/microsoft/ai-agents-for-beginners/blob/92d833e9df9a38a5071169b17c07ad134e549ec5/18-securing-ai-agents/README.md#L316)。

## 社群健康度與證據

完整課程、多語翻譯與測試設定可確認；本輪 CI 狀態與社群成效沒有足夠證據。Notebook 已存 outputs 是歷史資料，不能當本次 PASS。上游 AGENTS 建議把 nbconvert 的 Python 輸出交 python，實際會執行整份 notebook；本次沒有照做，也未登入 Azure。

## 本機驗證

15 Python AST 解析通過；直接讀三個重點 notebook 的 JSON/code。抽取第16課原始 handler，以假的 agent／tracer／memory 執行兩個合成客戶，確認跨客戶 cache 重用與僅一次 agent stub call，網路呼叫 0。未跑完整 notebooks、smoke、部署或外部模型。

工作區證據：work/repo-intel/ai-agents-for-beginners-20261014/ 的 fixed-source.json、inventory.json、repomix.log、repomix.xml、offline_probe.py、offline-results.json。

## 與現有系統的相關性評估

| 面向 | 評估 |
|---|---|
| Wiki | 收藏課程與驗收界線，保留官方來源 |
| Codex | 教材，不是整包 Skill／已部署Agent |
| QA | 可用 mock、弱evaluation、cache隔離當練習案例 |
| Automation | 不建立 Azure、登入、排程或教材自動測試 |

## 安裝建議

**⏳ 執行範例另核對環境與費用；推薦先讀基礎、工具與可信任 Agent。** 按01–06學習順序逐步練，別整包搬進正式流程；第16課適合作為「測試沒覆蓋什麼」的案例。

## 相關連結

- [[Github/_index|GitHub Repo 分析總索引]]
