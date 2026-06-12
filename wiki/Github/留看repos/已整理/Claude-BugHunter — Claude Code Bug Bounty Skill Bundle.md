# Claude-BugHunter

> 一個給 Claude Code 使用的 Bug Bounty / 外部滲透測試 Skill Bundle，裝進去後 Claude 就像資深 Bug Hunter 一樣行動。

**Repo：** https://github.com/elementalsouls/Claude-BugHunter  
**作者：** Sachin Sharma（Bug Hunting & GenAI Security Research）

---

## 規模

| 項目 | 數量 |
|------|------|
| Skills | 51 個 |
| Slash commands | 15 個 |
| 參考 H1 已揭露報告 | 681 份 |
| 涵蓋漏洞類型 | 24 種 |

---

## 7 大能力域

### 1. Recon & OSINT
`offensive-osint` · `web2-recon` · `osint-methodology`  
subdomain 列舉、憑證外洩搜尋、JS 分析、5 階段 OSINT pipeline

### 2. Web App Hunt（28 個 `hunt-*` skills）
- **Injection**：SQLi、XSS、SSTI、RCE
- **Authorization**：IDOR、Auth Bypass、CSRF
- **Server-Side**：SSRF、XXE、HTTP Smuggling、Cache Poison
- **Identity**：JWT、SAML、OAuth、MFA Bypass、ATO
- **API & Modern**：GraphQL、API Misconfig、File Upload
- **Business & Race**：Business Logic、Race Condition、LLM/AI 漏洞

### 3. Enterprise Platform Attack
`m365-entra-attack` · `okta-attack` · `cloud-iam-deep` · `vmware-vcenter-attack`  
`enterprise-vpn-attack`（Cisco/Fortinet/Citrix/Palo Alto）  
`hunt-sharepoint` · `hunt-aspnet` · `hunt-ntlm-info`  
`apk-redteam-pipeline` · `supply-chain-attack-recon`

### 4. Cloud 錯誤設定
S3 public bucket、IMDS chains、STS AssumeRole、cross-account confused-deputy

### 5. Red Team 思維
`redteam-mindset` · `bb-methodology` — 5 段非線性狩獵工作流、developer-psychology 啟發式

### 6. Triage & Reporting
`triage-validation`（7-Question Gate）  
`bugcrowd-reporting`（VRT 對應）  
`evidence-hygiene`（截圖/Cookie 遮罩）  
`redteam-report-template` · `mid-engagement-ir-detection`

### 7. CLI 工具
- `scripts/cbh.py` — 主 CLI
- `scripts/hunt.sh` — engagement 資料夾鷹架生成
- `scripts/install.sh` — 一鍵安裝到 `~/.claude/skills/`

---

## 安裝方式

```bash
# 把 skills/ 複製到 Claude Code 讀取路徑
./scripts/install.sh
# → 複製 skills/ 到 ~/.claude/skills/
# → 複製 commands/ 到 ~/.claude/commands/
# → 將 hunt.sh 加入 shell rc
```

---

## 明確不在範圍（設計決策）

- 內網 AD 攻擊（BloodHound、Kerberoasting、DCSync）
- C2 框架（Cobalt Strike、Sliver、Mythic）
- AMSI/AV bypass、persistence、lateral movement
- iOS / 硬體 / RF / ICS / Binary exploitation

---

## 主要文件

| 檔案 | 說明 |
|------|------|
| `README.md` | 能力地圖、快速開始 |
| `INSTALL.md` | 完整安裝 + Burp MCP 整合 |
| `USAGE.md` | 工作流程 + 決策樹 + 實戰範例 |
| `docs/architecture.md` | 6-phase 架構 + skill 對應圖 |
| `docs/disclosed-reports/` | 15 種漏洞類型的 H1 已揭露報告摘要 |
| `docs/verification/` | 本地 Docker lab 驗證紀錄（Juice Shop、CVE 驗證等） |

---

## Tags

#security #bug-bounty #claude-code #skills #red-team #pentest
