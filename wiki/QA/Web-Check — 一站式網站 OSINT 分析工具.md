---
source: "https://github.com/lissy93/web-check"
author: "Lissy93 (Alicia Sykes)"
stars: "33837"
clipped: 2026-06-22
tags:
  - "github/repo"
  - "osint"
  - "security"
  - "qa-tool"
  - "website-analysis"
  - "typescript"
---
# Web-Check — 一站式網站 OSINT 分析工具

> **出處：** [https://github.com/lissy93/web-check](https://github.com/lissy93/web-check) | ⭐ 33,837
> "Comprehensive, on-demand open source intelligence for any website"

---

## 一句話說明

輸入任意 URL，跑 30+ 項檢查，一次呈現目標網站的 DNS、SSL、安全標頭、開放 Port、Tech Stack、WHOIS 等完整情報。可自架，資料不外送。

**線上 Demo：** https://web-check.xyz

---

## QA 實用價值

| 場景 | 用法 |
|------|------|
| **測試環境安全檢查** | 輸入 staging URL，快速看 SSL/HSTS/Headers 是否正確配置 |
| **上線前 checklist** | 確認 DNS、redirects、robots.txt、security.txt 都設好 |
| **競品技術分析** | 查看競品用什麼 Tech Stack / CDN / 防火牆 |
| **Bug 回報佐證** | 截圖 + 安全標頭 + TLS 配置一次抓齊，附在 Bug report |
| **合規性初篩** | DNSSEC、HSTS、CSP 等安全標頭是否到位 |

---

## 檢查項目（30+）

| 類別 | 檢查項目 |
|------|---------|
| **網路基礎** | IP 資訊、DNS 記錄、DNS 伺服器、DNSSEC、TXT 記錄、Traceroute、Redirects |
| **安全** | SSL 憑證、TLS 連線、TLS 安全稽核、TLS 客戶端相容、HTTP 安全標頭、HSTS、Firewall 偵測 |
| **網站分析** | Headers、Cookies、Robots.txt、Sitemap、Social Tags、Quality（Lighthouse） |
| **情報** | WHOIS、子網域、開放 Port、Shodan 威脅、封鎖清單、碳足跡、排名、Tech Stack |
| **其他** | 截圖、Web Archive 歷史紀錄、連結頁面、Mail 設定（SPF/DKIM/DMARC）、Security.txt |

---

## 安全規則引擎

內建 22 條安全分析規則（`src/client/analysis/rules/`），每條規則輸出 pass / warn / fail：

- SSL 憑證有效性與 TLS 配置強度
- HSTS 是否啟用、preload 狀態
- HTTP 安全標頭完整性（CSP、X-Frame-Options 等）
- DNSSEC 配置
- Mail 安全（SPF/DKIM/DMARC）
- 開放 Port 風險評估
- 防火牆偵測（Cloudflare/AWS WAF 等）
- 威脅情報（Shodan）、封鎖清單比對

---

## 技術架構

```
Frontend (React + TypeScript + Vite)
  ├─ views/          Home, Results, About
  ├─ components/Results/  30+ 結果卡片元件
  ├─ analysis/rules/  22 條安全規則引擎
  └─ jobs/registry.ts  任務註冊表

Backend (Node.js Serverless Functions)
  └─ api/  30+ endpoint（dns.js, ssl.js, headers.js...）

Deploy: Vercel / Netlify / Docker / From Source
```

| 指標 | 數值 |
|------|------|
| 檔案數 | 163 |
| 語言 | TypeScript（全棧） |
| 授權 | MIT |
| API endpoints | 30 個 |
| Result 元件 | 33 個 |

---

## 部署方式

| 方式 | 說明 |
|------|------|
| **線上用** | https://web-check.xyz — 免安裝直接用 |
| **Vercel** | 一鍵部署（`vercel.json` 已配好） |
| **Netlify** | 一鍵部署 |
| **Docker** | `docker pull lissy93/web-check` |
| **From Source** | `git clone` → `npm install` → `npm run dev` |

---

## 相關工具

- [[projectdiscoverynuclei Nuclei is a fast, customizable vulnerability scanner powered by the global security community and built on a simple YAML-based DSL, enabling collaboration to tackle trending vulnerabilities on the internet. It helps you fi|Nuclei — 弱點掃描器]] — 更深入的弱點掃描（YAML DSL）
- [[Bug記錄流程]] — QA Bug 回報工作流，可搭配 Web-Check 截圖佐證
