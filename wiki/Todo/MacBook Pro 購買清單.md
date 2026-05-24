---
tags:
  - todo
  - 購物
  - 設備
date: 2026-05-24
status: 研究中
---

# MacBook Pro 購買清單

> 根據 QA 工作需求（Senior QA / SDET，目標 Web3/FinTech 遠端）與目前開發習慣評估。

## 為什麼選 Mac

| 原因 | 說明 |
|------|------|
| iOS Simulator | 只有 macOS 才能跑，移動端 QA 必備 |
| Safari 測試 | Web3 dApp / MetaMask Extension 需跨瀏覽器含 Safari |
| 原生 Unix | Python / Pytest / Playwright / Docker 環境比 WSL 乾淨穩定 |
| 業界標準 | 目標公司（Coinbase/Alchemy/Chainlink 等）工程師幾乎全 Mac |

---

## 推薦機型

### ✅ 14" MacBook Pro M5 Pro，24GB RAM，1TB SSD — NT$74,900

| | 細節 |
|--|------|
| **為何 14" 不選 16"** | 遠端工作常帶出門，14" 輕 400g |
| **為何 M5 Pro 不選 M5** | 只差 NT$8,000，多出 8 個 CPU 核心（模擬器+Docker 差很有感）|
| **為何 24GB** | iOS Simulator 6-8GB + 瀏覽器群 4-6GB + IDE 3-4GB，16GB 跑壓測會 swap |
| **為何 1TB** | Xcode（12GB）+ iOS Simulator images（每版本 8-15GB）|
| **為何不選 Max** | QA 工作用不到 Max 的 GPU 核心，溢價不值得 |

### 備選方案

| | 說明 |
|--|------|
| **升 36GB** | 若預算允許，跑多個 Docker container + 完整瀏覽器矩陣更安心，需自訂 |
| **M5 24GB/1TB** | NT$66,900，省 NT$8,000，CPU 效能較弱（10核 vs 最高18核）|

---

## M5 系列完整台灣售價（2026/03 上市）

### 14 吋

| 晶片 | RAM | SSD | 售價 |
|------|-----|-----|------|
| M5 | 16GB | 512GB | NT$52,900 |
| M5 | 16GB | 1TB | NT$59,900 |
| M5 | 24GB | 1TB | NT$66,900 |
| **M5 Pro** | **24GB** | **1TB** | **NT$74,900** ← 推薦 |
| M5 Max | 36GB | 2TB | NT$119,900 |

### 16 吋

| 晶片 | RAM | SSD | 售價 |
|------|-----|-----|------|
| M5 Pro | 24GB | 1TB | NT$89,900 |
| M5 Max | 36GB | 2TB | NT$129,900 |

> 教育優惠：14" M5 Pro 約 NT$69,790（Apple 教育商店）

---

## 配件清單

### 必買

- [ ] **USB-C / Thunderbolt 5 Hub**（含 USB-A + HDMI + USB-C）
  - ⚠️ M5 系列升級為 **Thunderbolt 5**（120Gbps），購買時確認支援 TB5，不要買到舊款 TB4
  - 現有 Windows 鍵盤/滑鼠等 USB-A 周邊需要轉接
  - 估價：NT$1,500–3,000
- [ ] **第二顆 MagSafe 充電器**（桌面一顆、包包一顆）
  - 估價：NT$1,500

### 強烈建議

- [ ] **二手 iPhone**（iPhone 14 或以上）
  - iOS Simulator 無法測 Push Notification、硬體感測器、真實網路行為
  - Senior SDET 面試常問「real device 還是 simulator？」
  - 估價：二手 NT$8,000–12,000
- [ ] **外接螢幕**（如桌面目前沒有）
  - QA 跑測試時左邊 log、右邊瀏覽器，效率差很多
  - 估價：NT$4,000–8,000

### 視需求

- [ ] **Android 實機** — 若目標公司有 Android App（MetaMask Mobile / Coinbase Wallet）

---

## 購買前 Checklist

- [ ] 確認是否有教育折扣資格
- [ ] 比較 Apple 官網 vs 授權零售商（燦坤/順發）價格
- [ ] 確認信用卡分期方案（有些銀行 0 利率 24 期）
- [ ] 購買 AppleCare+ 考慮（NT$7,490/3年，遠端工作依賴度高建議加）

---

## 相關連結

- [Apple 台灣官方購買頁](https://www.apple.com/tw/shop/buy-mac/macbook-pro)
- [M5 Pro/Max 規格整理 - 瘋先生](https://mrmad.com.tw/m5pro-m5max-macbook-pro-2026)
