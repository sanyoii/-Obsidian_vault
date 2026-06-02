---
tags: [AI, tools, evaluation, video, automation]
date: 2026-05-30
status: evaluated
verdict: 條件性推薦，與 ai-video-pipeline 功能重疊
---

# MoneyPrinterTurbo 評估報告

> 評估日期：2026-05-30  
> 來源：https://github.com/harry0703/MoneyPrinterTurbo  
> 作者：harry0703

## 這是什麼？

給個主題或關鍵詞，全自動生成高清短影片（文案 + 素材 + 字幕 + 配樂 + 合成）。
主要面向中文用戶，有繁體中文友善介面，在 Trendshift 上榜，star 數極高。

## 功能特性

- 支援 9:16 直式 / 16:9 橫式影片（1080x1920 / 1920x1080）
- LLM 支援：OpenAI、DeepSeek、Moonshot、Azure、Gemini、Ollama、通義千問、MiniMax 等 10+ 家
- 影片素材：Pexels（免費無版權）+ 本地素材
- TTS 多語音合成 + 即時試聽
- 字幕自訂（字體/位置/顏色/描邊）
- 背景音樂（隨機或指定）
- Web UI + REST API
- MVC 架構，Docker 支援
- 批次生成多個版本，人工選最佳

## Tech Stack

- Python / FastAPI（ASGI）/ Redis
- Docker + docker-compose
- Pexels API / Azure TTS / OpenAI-compatible

## 安裝

```bash
# Docker 方式（推薦）
docker-compose up

# 本地安裝
pip install -r requirements.txt
cp config.example.toml config.toml
# 編輯 config.toml 填入 API keys
python main.py
```

## 裁決

**條件性推薦**：功能完整，是目前最完善的中文短影片自動化工具之一。
但與 `d:\Claude\ai-video-pipeline` 高度重疊，除非需要它的 Web UI 和 Pexels 素材來源，否則不需要另裝。

## 相關

- [[ai-video-pipeline]] — 本地已有類似管線
- [[MoneyPrinterV2]] — 原版（英文，功能較少）
