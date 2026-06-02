---
tags: [AI, tools, evaluation, automation, social-media]
date: 2026-05-30
status: evaluated
verdict: 不建議安裝
---

# MoneyPrinterV2 評估報告

> 評估日期：2026-05-30  
> 來源：https://github.com/FujiwaraChoki/MoneyPrinterV2  
> 作者：FujiwaraChoki

## 這是什麼？

Python CLI 工具，自動化「網路賺錢」任務的全家桶。
MoneyPrinterTurbo 的原版（英文版，功能較少）。

## 功能

- Twitter Bot（CRON 自動發文）
- YouTube Shorts 自動生成 + 上傳
- Amazon 聯盟行銷 + Twitter 推廣
- 爬取本地商家 + 冷郵件外送

## Tech Stack

- Python 3.12 / Selenium（Firefox）
- moviepy / assemblyai / gpt4free
- 授權：AGPL-3.0

## 問題點

1. **Selenium 驅動**：平台改版就容易壞，維護成本高
2. **冷郵件外送**：在台灣/歐洲可能觸法（垃圾郵件相關法規）
3. **商業動機**：由 Post Bridge 贊助，功能設計偏向推廣其服務
4. **功能較弱**：MoneyPrinterTurbo 是其中文加強版，各方面更完整

## 裁決

**不建議安裝**。灰色地帶工具，設計較粗糙，法律風險存在。
若需要影片自動化功能，優先考慮 [[MoneyPrinterTurbo]]。

## 相關

- [[MoneyPrinterTurbo]] — 中文加強版，功能更完整
