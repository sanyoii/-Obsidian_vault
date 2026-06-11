---
tags:
  - 求職
  - ashby
  - career
date: 2026-06-11
---

# Ashby Support Engineer (APAC) — 求職進度

> 完整工作檔案：`D:\Claude\Working Directory\Projects\ashby\`（ashby-context.md、技術學習地圖、STAR案例庫）

## 目前狀態（2026-06-11）

- **已投遞**：Ashby — Support Engineer, APAC（首位），履歷已於 2026-06-10 優化送出
- 等待 Recruiter 回覆。流程：Recruiter Call(30m) → Take-home(一週) → HM 面試(45-60m) → Virtual Onsite(120m)
- 評估會考「technical reasoning + communication precision」，take-home 大概率是書面 ticket 排障演練（log/API 分析 + 客戶回覆 + 內部報告）

## 已做成的決策

1. **不投** Ashby Product Support Specialist（同組織、較低階）——避免雙投稀釋訊號；若 Support Engineer 被拒再投，作為備援
2. **暫緩** Ashby CSM APAC（要求 10% APAC 出差，與照護衝突，未決）
3. 薪資結論：Support Engineer 日韓帶約 TWD 187-274 萬 / 160-254 萬 + equity，高於歷史高點（Zealogics 170 萬/14 個月）。台灣不在薪資清單，recruiter call 必問聘僱方式（直聘/EOR/contractor）與台灣薪資帶
4. Leveling 策略：15 年資歷 + API/log/整合排障直接對口，目標帶內中上位置

## 定位策略

- 把 SEG 技術支援深度放最前面，**弱化管理敘事**（JD 反向排除「偏好領導勝於 ticket」）
- 核心對照：DLP SDK 客戶整合排障 ↔ Ashby 整合排障；KB/playbook ↔ Support Enablement；Green-Line issue pattern 分析 ↔ 回饋 Product
- Overqualified 疑慮的應對：兩次年度最佳 SEG 工程師 = 真心喜歡第一線技術工作的實證

## 技術準備重點

| 主題 | 重點 |
|---|---|
| Authentication | HTTP Basic（API key 當 username）；401=缺 key，403=key 錯/權限不足 |
| Endpoint 風格 | 全 POST、`resource.action` 命名（RPC 風格，非典型 REST），客戶常踩坑 |
| Pagination/Sync | cursor 分頁；增量同步用於 HRIS/BI |
| 經典陷阱 | `applicationForm.submit` 回 200 但 `success:false`，客戶不檢查會導致應徵靜默遺失（測試信箱 `testing-fail-validation@example.com`） |
| Webhooks | 排障三問：收到沒有？簽章驗過沒有？端點回 2xx 沒有？ |
| 整合生態 | 200+ 整合：HRIS（Workday/BambooHR）、Calendar（Google/M365）、Assessments（partner 實作 start/list/cancel，回呼 update）、Job Boards、Slack |

## SEG → Ashby 對照表

| Trend Micro 的工作 | Ashby 對應場景 |
|---|---|
| 客戶回報 DLP SDK 整合異常 → 重現 → 隔離是 SDK 還是客戶端 | 客戶回報 Workday 同步異常 → 重現 → 隔離是 Ashby、Workday 還是設定 |
| 蒐集 log/dump、寫 reproduce steps 給 RD | 蒐集 API request/response、webhook delivery log，寫內部升級報告給 Engineering |
| 建 KB、troubleshooting playbook | 維護 docs.ashbyhq.com 對應文件、做 Support Enablement |
| Green-Line 緊急小組分析 issue pattern → 推動 Patch | 識別 ticket pattern → 回饋 Product 改進 |

## STAR 案例庫

### 案例 1：DLP Policy XML 缺少 closing tag（Log Analysis）

**對應問題**：Describe a time when you used log analysis to solve a problem.

While I was SEG Leader for Trend Micro's DLP SDK team, we got an escalated case where a customer's DLP had basically stopped doing its job — files that should've been blocked were just going through.

Before I even opened the logs, I checked whether we had the right materials for this type of issue. I'd written internal guides on exactly what to collect for different problem categories, so I made sure the case had the product logs, policy deployment records, and client diagnostics before starting.

From the product logs I could see the DLP engine itself was running fine, but the policy was never firing. Tracing it back, the policy push from server to client had failed silently — the policy never actually loaded into the engine.

That wasn't enough of an answer for me, so I kept digging into the policy payload itself and found the actual problem: the XML was malformed, missing a closing tag. That made it unparseable, so the client just dropped it without any error. I brought this to QA so we could figure out where the bad XML was coming from.

We traced it to a recent R&D fix that had introduced an edge case — when a client got moved from Group A to Group B and the policy was redeployed, the policy-reconstruction logic would drop the closing tag in that specific scenario. It hadn't shown up in normal testing because nobody was testing the group-reassignment path specifically.

I wrote up the full reproduction steps — the exact sequence of reassignment, redeploy, and the resulting bad payload — and handed it to R&D with the root cause already identified. They shipped a hotfix, and I also updated our support guide so group-reassignment cases would always include this kind of data going forward.

### 案例 2：（待補）

### 案例 3：（待補）

## 七天準備計畫

1. **Day 1-2**：精讀 Authentication、Responses & Errors、Pagination/Sync、Webhooks 四篇 guide；實測 Public Job Posting API
2. **Day 3-4**：API Reference 模組結構；docs 整合指南 3 篇（Google Workspace、Workday、一個 Assessment partner）；status 頁事故格式
3. **Day 5-7**：2-3 個 SEG 案例寫成英文 STAR；模擬 ticket 書面回覆對練
4. 收到 recruiter 回覆/take-home 時：回 claude.ai 對話或在 `Working Directory/Projects/ashby/` 繼續準備

> 鐵則：履歷與面試材料只能用真實可驗證的經歷，禁止虛構數據與案例。
