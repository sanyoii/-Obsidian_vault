---
source: "https://www.threads.com/@krumjahn/post/DYpFANzmm8O?xmt=AQG03er_fq28BoWU0tf8O2-xYo5iH43nw7ZlMHGQZ1mGog"
author:
  - "@krumjahn"
clipped: 2026-05-22
tags:
  - "social/threads"
---
# Threads 貼文

> **出處：** [https://www.threads.com/@krumjahn/post/DYpFANzmm8O?xmt=AQG03er_fq28BoWU0tf8O2-xYo5iH43nw7ZlMHGQZ1mGog](https://www.threads.com/@krumjahn/post/DYpFANzmm8O?xmt=AQG03er_fq28BoWU0tf8O2-xYo5iH43nw7ZlMHGQZ1mGog) | 2026-05-22

---

Presenton 剛在 GitHub 上拿到 5,000+ 顆星。

概念很直接：輸入 prompt 或貼文件，直接輸出完整簡報。

 **Presenton** — 開源 AI 簡報生成器（Gamma / Beautiful.AI 替代品）。

---

**是什麼**

- 用 AI 從文字/主題生成簡報，匯出 PPTX
- Apache 2.0 開源，無訂閱費
- 支援幾乎所有 AI 供應商：**Anthropic（你的 Claude key）**、OpenAI、Gemini、Ollama 等

**安裝方式（Windows 兩種）**

|方式|難度|說明|
|---|---|---|
|桌面 App|最簡單|下載 .exe 安裝，BYOK（帶自己的 API Key）|
|Docker|中等|`docker-compose up`，跑在 localhost:5000|

**架構大小**

- 9,868 個檔案（大部分是 SVG icon 素材）
- Next.js 前端 + FastAPI 後端 + Electron 桌面

---

**結論：值得裝**，尤其你手上有 Claude API key，可以直接用。

要裝哪種？桌面 App 最快，Docker 比較彈性（可以跑在背景）。