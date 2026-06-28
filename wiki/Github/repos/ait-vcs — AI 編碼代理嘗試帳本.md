---
tags: [CLI工具, AI-agent, 留觀]
---

# ait-vcs — AI 編碼代理的本地嘗試帳本

> repo：[m24927605/ait](https://github.com/m24927605/ait)
> 安裝：`pipx install ait-vcs`（需 Python 3.14+）
> 狀態：**留觀** — 評估後暫不裝，適合 terminal CLI 工作流，對話視窗用法有限

---

## 它是什麼

**ait** 在你執行 `claude -p "..."` / `codex` / `aider` / `gemini` 時，把這次 run 記錄為一個「attempt」：
- 儲存 prompt、diff、review 結果、決策記錄
- 改動先隔離在 `.ait/` 工作區，`ait apply` 才進主目錄
- 支援跨 agent 交接（下一個 agent 讀得到上一個的 context）
- 對抗式審查：一個 agent 寫，另一個 agent review
- 記憶查詢：`ait memory recall "retry budget"` 找過去決策
- 完全本地、SQLite 儲存、無 SaaS、無 telemetry

台灣開發者（m24927605），有完整繁體中文文件（README.zh-TW.md）。

---

## 核心指令

```bash
ait init                        # repo 初始化（一次）
claude -p "重構 xxx 邏輯"        # ait 自動攔截記錄
ait status
ait attempt list
ait attempt show <attempt-id>
ait apply latest                # 確認後才 apply 進主目錄
ait recover latest              # 恢復中斷的 run
ait review attempt latest-reviewable --mode adversarial --review-adapter codex
ait memory recall "關鍵字"
ait demo                        # 無需 API key 的示範
```

---

## 為什麼暫不裝

- ait 攔截的是 **terminal 呼叫 `claude -p ...`** 的 CLI 模式
- 在對話視窗裡跟 Claude 說話的這個工作流，ait 的核心錄製功能發揮不了
- Ruflo swarm 已覆蓋部分跨 agent 協調需求
- 若未來有大量 `-p` 批次呼叫的需求，再考慮安裝

---

## 安裝備忘

```powershell
# 需要 Python 3.14+（本機在 C:\Python314）
pipx install --python C:\Python314\python.exe ait-vcs
ait demo   # 先跑示範確認可用
```
