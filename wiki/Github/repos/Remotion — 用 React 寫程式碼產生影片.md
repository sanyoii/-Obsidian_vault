# Remotion

> 用 React 寫程式碼來產生影片的框架。把 CSS、Canvas、SVG、WebGL 等網頁技術帶進影片製作，讓每一幀都由程式控制。

**Repo：** https://github.com/remotion-dev/remotion  
**文件：** https://www.remotion.dev/docs  
**授權：** 特殊授權（個人/學生免費，公司需商業授權）

---

## 一句話說明

寫 React component → Remotion 用 headless Chrome 逐幀截圖 → ffmpeg 合成 MP4。

---

## 核心概念

```jsx
const MyVideo = () => {
  const frame = useCurrentFrame();        // 取得目前幀數
  const opacity = interpolate(frame, [0, 30], [0, 1]);  // 做動畫
  return <div style={{ opacity }}>Hello World</div>;
};
```

- **`useCurrentFrame()`** — 取得目前幀數（0, 1, 2…）
- **`interpolate()`** — 幀數映射到數值（動畫曲線）
- **`<Sequence>`** — 時間軸排列
- **`<Audio>` / `<Video>`** — 嵌入媒體

---

## 主要套件（monorepo，40+ packages）

| 套件 | 功能 |
|------|------|
| `remotion` | 核心 API |
| `@remotion/cli` | 開發伺服器、render 指令 |
| `@remotion/lambda` | AWS Lambda 雲端渲染 |
| `@remotion/cloudrun` | Google Cloud Run 渲染 |
| `@remotion/player` | 網頁內嵌播放器 |
| `@remotion/captions` | 字幕 / 轉錄文字 |
| `@remotion/elevenlabs` | ElevenLabs TTS 整合 |
| `@remotion/three` | Three.js 3D 整合 |
| `@remotion/compositor` | Rust 高效能合成器 |
| `@remotion/gif` | GIF 輸出 |
| `@remotion/convert` | 影片格式轉換 |

---

## 適合的使用場景

- **自動化影片生成** — 根據資料動態產出影片（GitHub Unwrapped 年度回顧）
- **數據視覺化影片** — chart、統計數字動畫
- **社群媒體影片** — 批次自動產生貼文影片
- **字幕影片** — 搭配 `@remotion/captions` 自動生成

---

## 快速開始

```bash
# 新建專案
npx create-video@latest

# 現有 React 專案加入
npm install remotion @remotion/cli

# 開發預覽
npx remotion studio

# 渲染輸出
npx remotion render MyVideo out/video.mp4
```

---

## 與 ai-video-pipeline 的整合潛力

可以用來取代 ai-video-pipeline 中手動的 ffmpeg 合成層，改用 React component 控制每一幀的動畫、字幕、轉場效果，更靈活也更可維護。

---

## Tags

#tool #video #react #animation #ffmpeg #automation #ai-video-pipeline
