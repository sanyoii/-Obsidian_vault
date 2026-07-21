---
source: "https://github.com/ayghri/i-have-adhd"
author: "ayghri"
stars: "5.3K"
clipped: 2026-07-21
tags:
  - "github/repo"
  - "claude-code/skills"
  - "productivity"
---

# i-have-adhd — 讓 Claude 停止把答案埋在廢話裡的 ADHD 友善輸出 skill

> **ayghri/i-have-adhd** | ⭐ 5.3K | 🍴 192 | 📝 MIT
> "A skill for your coding agent to stop it from burying the answer. ADHD-friendly output."

## 一句話說明

單一 skill 專案：用 10 條輸出規則重塑 coding agent 回覆——行動先行、步驟編號、每輪重述進度、具體時間估計、禁止開場白/收尾客套。目標讀者不限 ADHD 患者。支援 Claude Code / Codex / Cursor 三平台安裝（plugin marketplace 三件套包同一個 SKILL.md）。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars / Forks | 5.3K / 192 |
| 主要語言 | 無（純 Markdown，零程式碼零依賴） |
| 授權 | MIT |
| 建立 | 2026-05-13（2 個月 0→5.3K，病毒式成長） |
| Release | 無（rolling main） |
| Topics | adhd, claude-code-plugin, claude-skills, productivity |

## 核心內容

Repo 僅 118KB、7 個內容檔。核心就一檔 `skills/i-have-adhd/SKILL.md`（~150 行）：

**5 個 ADHD 認知事實**當設計依據：
1. 工作記憶小——不在螢幕上的就忘了
2. 知道答案 ≠ 做到答案
3. 啟動是最難的一步——第一個行動必須小而明確
4. 時間感均質——「a bit of work」與「幾小時」讀起來一樣，估計必須具體
5. 多巴胺稀缺——進度要可見

**10 條規則**：
1. 首行就是可執行的行動
2. 多步驟必編號，每步一個 bounded action
3. 收尾給一個 2 分鐘內可做的下一步
4. 壓制離題（第二個問題另起提問）
5. 每輪重述狀態（step 3 of 5）
6. 具體時間估計（分鐘，不是 "a bit"）
7. 完成的工作可見（具體說現在什麼能動了）
8. 錯誤平鋪直敘（禁 "Uh oh"）
9. 清單上限 5 項，超過拆 do now / later
10. 禁前言、禁回顧、禁客套收尾

**4 條破例**：要求解釋可長文、破壞性操作先確認、debug 螺旋停手問診斷、真歧義先問。

**Pre-send check**：刪首句宣告、刪尾句客套、刪 by-the-way、刪無資訊 hedging。

## 社群口碑

- HN Show HN + 多篇討論；The New Stack 報導（「thinks 2x better」主張未經驗證——skill 只改輸出格式不改推理）
- 正面：結構勝過客套、像專注的同事
- 負面：token 疊加疑慮、「又一層 prompt」

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Caveman mode** | 高度重疊。caveman hook 已覆蓋規則 10 與大半精神；增量僅：編號步驟強制、step N of M 重述、時間估計、清單上限 5 |
| **CLAUDE.md R10/R16** | 「每輪重述狀態」與 checkpoint / 長迴圈透明化制度同構 |
| **系統性風險** | description 寫 "Use whenever responding to ANY user message" = 全域常駐觸發，會與 caveman 每則回覆打架（[[Nutlope-hallmark 反 AI-slop 設計技能|hallmark]] 觸發邊界問題同型） |

## 安裝建議

**❌ 不適合安裝** — 增量太小、衝突太大：

1. caveman hook（hook 層強制 > skill 建議）已覆蓋核心價值
2. 全域觸發 description 與 caveman 正面衝突，改觸發邊界成本 > 增量
3. 真正增量（step N of M、時間估計）是 R10/R16 制度已有行為
4. 想吸收個別規則：把「編號步驟」「單一下一步收尾」兩條加進 caveman skill 本文即可，零安裝

## 相關連結

- [[Nutlope-hallmark 反 AI-slop 設計技能]] — 同樣的觸發邊界課題（全域 vs 指名調用）
- 本機 caveman plugin — 功能重疊的既有方案
