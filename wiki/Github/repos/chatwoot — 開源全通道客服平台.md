# Chatwoot

> 開源全通道客服平台，整合 Live Chat、Email、WhatsApp、Facebook、Instagram、Telegram、Twitter 等 10+ 頻道於單一統一收件匣；Intercom / Zendesk 開源替代方案，31.6k stars。

**Repo：** https://github.com/chatwoot/chatwoot  
**授權：** Other（Chatwoot EE License，Community 版免費自架）  
**語言：** Ruby 47%、Vue.js 27%、JavaScript 23%  
**規模：** 31,587 stars、7,600+ forks、6,291 commits

---

## 一段話說明

Chatwoot 是一個**永遠在線的全通道客服收件匣**：以 Ruby on Rails 為後端、Vue.js 為前端，統一接收來自網站 Live Chat、Email、WhatsApp（官方 API + Embedded Signup）、Facebook Messenger、Instagram、Twitter/X、Telegram、Line、TikTok、SMS 的訊息，讓客服團隊在同一個介面處理所有渠道的客戶對話，並支援自動化規則、AI Agent（Captain）、Webhook 與 REST API，可深度整合外部系統。

---

## 主要功能

- **全通道統一收件匣**：Live Chat Widget、Email、WhatsApp、Facebook、Instagram、Twitter/X、Telegram、Line、TikTok、SMS、語音（Twilio）
- **AI Agent（Captain）**：自動處理例行查詢、減少人工介入，含自訂工具支援
- **Help Center Portal**：內建知識庫，可發布文章與 FAQ，供客戶自助查詢
- **自動化規則（Automation）**：條件觸發自動指派、標籤、回覆、關閉對話
- **Webhook 事件驅動**：對話建立/更新、訊息建立/更新等事件推送，含 HMAC-SHA256 驗證
- **REST API + Agent Bot 框架**：透過 Webhook 接入自訂 AI Bot（含 Dialogflow、Rasa 範例）、人工接管（handoff）流程
- **協作工具**：私密備註（Private Notes）、@提及、標籤、罐頭回覆（Canned Responses）、鍵盤快捷鍵
- **聯絡人管理**：客戶資料、自訂屬性、分群、預填表單
- **SLA 執行**：服務水準協議自動追蹤與提醒
- **報表分析**：對話量、回應時間、Agent 績效、CSAT、Bot 統計，支援下載
- **多語言支援**：Google Translate 整合、界面多語系
- **整合**：Slack、Dialogflow、OpenAI、Shopify、Linear、Dyte 視訊通話
- **行動 App**：iOS / Android 原生客服 App

---

## 技術棧

| 層次 | 技術 |
|------|------|
| 後端 | Ruby on Rails |
| 前端 | Vue.js 3 + JavaScript |
| 樣式 | SCSS + Tailwind CSS |
| 即時通訊 | Action Cable（WebSocket） |
| 部署 | Docker / Docker Compose / Heroku / DigitalOcean / Kubernetes |
| CI | CircleCI |
| 程式碼品質 | RuboCop、ESLint、Prettier |
| 認證 | Personal Access Token、HMAC、SAML（Enterprise） |

---

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | ❌ 無直接關聯，是客服平台而非知識庫工具 |
| **Claude Code** | ⚠️ 有潛力：REST API + Webhook 可讓 Claude Code 自動化分派對話、讀取客戶訊息、觸發 Bot 回覆 |
| **Automation / Scripts** | ✅ 有用：REST API 可從 Python 腳本建立對話、新增聯絡人、查詢對話狀態（autohedge / social-monitor 類型整合可行） |
| **Skills / Agents** | ⚠️ 可行：可建立一個 chatwoot-api skill，讓 Claude Code 透過 REST API 查詢或操作客服對話 |

**值得關注**：Agent Bot Webhook 框架支援將自訂 AI Bot 接入 Chatwoot 對話流程（含 human handoff），若需要建立 AI 客服 → 人工接管的完整工作流，Chatwoot 是少數開源支援此模式的平台。

---

## 安裝建議

**❌ 不適合** — 這是一個完整的 SaaS 等級客服基礎設施（需要 Rails + PostgreSQL + Redis + Sidekiq + Docker），主要服務對象是有客服需求的企業；目前個人 Obsidian + Claude Code 工作流沒有接待外部客戶對話的需求，部署成本遠超使用價值。

---

## Tags

#customer-support #omnichannel #live-chat #whatsapp #email #rails #vuejs #self-hosted #docker #webhook #rest-api #open-source #intercom-alternative
