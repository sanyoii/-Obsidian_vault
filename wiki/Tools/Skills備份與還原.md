---
title: Skills 備份與還原
date: 2026-07-07
tags: [tools, skills, claude-code, backup, maintenance]
---

# Skills 備份與還原

> 2026-07-07 對抗審查第二輪後確立的架構。相關 commit：`2fe15b5f`（sanyoii/claude-setup）。

## 雙位置架構

| 位置 | 角色 | 說明 |
|------|------|------|
| `C:\Users\sanyo\.claude\skills\` | **Active**（Claude 讀取） | 瘦身後維持 ~59 個；session 觸發清單來源 |
| `d:\Claude\infra\skills-backup\` | **備份**（git-tracked，180 個） | 主 repo 追蹤，刪錯可還原 |

⚠️ **備份區不可放回 `d:\Claude\.claude\skills\`**——那是 project-level skills 位置，cwd=d:\Claude 時會被 Claude Code 實際載入，備份形同活性來源，抵銷瘦身（2026-07-07 P0 發現，已搬遷）。

## 還原單一 Skill（skill 突然「不見」時）

```powershell
Copy-Item d:\Claude\infra\skills-backup\<name> C:\Users\sanyo\.claude\skills\ -Recurse
```

還原後新 session 生效；同 session 內清單不會即時刷新。

## 自動同步（PostToolUse hook）

- Claude 編輯 `infra\skills-backup\<name>\` 下任何檔案 → hook 自動跑 `Sync-Skills.ps1 -SkillName <name>` 同步到 active（~100ms）
- Log：`d:\Claude\infra\logs\sync-skills-hook.log`

## 全量比對與復活閘門

```powershell
# 看雙位置落差（只報告，不複製）
d:\Claude\infra\Sync-Skills.ps1 -DryRun

# full-scan 預設「不」複製 NEW（備份獨有）skills —— 防止把瘦身刪掉的整批復活
# 真要整批復活才加：
d:\Claude\infra\Sync-Skills.ps1 -IncludeNew
```

**教訓**：2026-07-07 發現 user-level 從瘦身後的 55 悄悄回滾到 134，根因就是 full-scan 無條件複製 NEW。`-IncludeNew` 閘門因此而生；平常跑 full-scan 只會同步 MODIFIED。

## 相關

- 瘦身核定清單：`d:\Claude\workspace\plans\skills-diet-proposal.md`（55 核定 + diagnose/claude-real-video/web-design-guidelines/yongli-council = 59）
- 制度依據：`d:\Claude\docs\institution\00-diagnosis.md`（Skills 過量段）
- [[Tools/Skills 觸發詞對照表|Skills 觸發詞對照表]]
