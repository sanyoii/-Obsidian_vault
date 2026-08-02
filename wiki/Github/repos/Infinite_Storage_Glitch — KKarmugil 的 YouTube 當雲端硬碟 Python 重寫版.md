---
source: "https://github.com/KKarmugil/Infinite_Storage_Glitch"
author: "KKarmugil (karmugil)"
stars: "163"
clipped: 2026-08-01
tags:
  - "github/repo"
  - "steganography"
  - "python"
  - "attribution-analysis"
  - "supply-chain-audit"
---

# Infinite_Storage_Glitch — KKarmugil 的 YouTube 當雲端硬碟 Python 重寫版

> 來源：https://github.com/KKarmugil/Infinite_Storage_Glitch
> 授權：MIT（Copyright (c) 2023 karmugil）｜⭐ 163｜🍴 28｜建於 2023-02-25，最後推送 2024-01-07
> 規模：**5 檔 / 3,152 tokens / 13,690 chars**（2026-08-01 repomix 實測），程式碼只有 `main.py` 一支 7,027 bytes
> ⚠️ **與 DvorakDwarf 原版的關係已查證清楚：有明確標註 credit 的獨立 Python 重寫，不是抄襲**（判定與證據等級見專節）

## 一句話說明

把任意檔案的每一個位元畫成影片畫面上的黑白方塊（1 = 黑、0 = 白，每格 4×4 像素），輸出成 1080p MP4，讓你上傳到 YouTube 當作無限容量的免費雲端硬碟；要取回時再把影片下載下來，逐格讀回像素、還原成原始檔案。概念來自 DvorakDwarf 的 Rust 專案 Infinite-Storage-Glitch，本專案作者自述「我不會 Rust，所以用 Python 重做了一個」。實作是單檔 200 行的腳本，功能與健壯性都遠低於原版，**且已因相依套件失效而實質無法運作**。

## 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 163 |
| Forks | 28 |
| 主要語言 | Python（7,028 bytes，全部語言僅此一項） |
| 授權 | MIT License（Copyright (c) 2023 karmugil） |
| 建立時間 | 2023-02-25 |
| 最後推送 | 2024-01-07（距今約 2.5 年） |
| Open Issues | 3（另 1 個 open PR） |
| Open PRs | 1（#3 Update main.py，2024-01-07 提出，未合併） |
| 最新 Release | 無（從未發布 release） |
| Topics | 無 |
| 首頁 | 無 |
| 是否 Archived | 否 |
| GitHub fork 標記 | **isFork = false，parent = null**（確認非 GitHub 層級的 fork） |
| 貢獻者 | 僅 KKarmugil 一人，21 個 commit |

## Repomix 深度分析

| 指標 | 數值 |
|------|------|
| 總檔案數 | 5 |
| 總 Tokens | 3,152 |
| 總字元數 | 13,690 |
| 壓縮模式 | 無（diskUsage 僅 40 KB） |
| Repomix 安全掃描 | ✔ 未偵測到可疑檔案 |

### 檔案 token 分佈

| 檔案 | Tokens | 佔比 |
|------|--------|------|
| main.py | 1,654 | 52.5% |
| README.md | 792 | 25.1% |
| LICENSE | 222 | 7.0% |
| requirements.txt | 54 | 1.7% |
| .gitattributes | 14 | 0.4% |

**整個專案只有 `main.py` 一個程式檔，無模組、無測試、無 CI、無 .gitignore。**

## 與 DvorakDwarf 原版的關係判定

這是本次分析的重點。原版 **DvorakDwarf/Infinite-Storage-Glitch** 是 Rust 寫的、曾有數千星的知名專案。本 repo 是 Python、163 星、GitHub 標記非 fork。逐項查證結果如下。

### 查證發現

**① 原版 repo 現已從 GitHub 消失（Confirmed）**
`gh api repos/DvorakDwarf/Infinite-Storage-Glitch` 回 404，大小寫變體與 `ISG` 均 404。但作者帳號 `DvorakDwarf`（HistidineDwarf）**仍然存在且活躍**——725 followers、29 個公開 repo、2026-07-18 仍有更新，其他專案如 disrust（122⭐）、Colored-ASCII-Video（113⭐）都還在。**所以是該 repo 被作者自行刪除或轉私有，不是帳號被砍。** 本分析改用 `4A49/Infinite-Storage-Glitch`（2023-02-19 建立、2023-02-18 最後推送的完整鏡像，含 Rust 原始碼 `src/etcher.rs` 等）作為原版比對基準。

**② README 中有明確、具連結的 credit（Confirmed，這是最關鍵的一條）**
本 repo README 原文逐字：

> This program inspired from DvorakDwarf Infinite-Storage-Glitch
> https://github.com/DvorakDwarf/Infinite-Storage-Glitch check out his project
> I dont know rust so I recreated the same project in python

作者**主動標明來源、附上原專案連結、明講自己是重寫**。這直接排除「未標註抄襲」與「蓄意冒名」兩種假設。原版 README 結尾寫的是「Do what you want with the code, but credit would be much appreciated」——**本專案滿足了原作者提出的唯一要求。**

**③ 程式碼是獨立實作，不是翻譯（Confirmed）**
比對兩邊架構，差異是結構性的而非表面的：

| 面向 | 原版（Rust） | 本專案（Python） |
|------|-------------|-----------------|
| 編碼模式 | RGB 模式（3 bytes/像素）+ 二元模式，可選 | **只有二元模式**（1 bit/格） |
| 像素塊大小 | 2×2，可設定 | **硬編碼 4×4** |
| 設定嵌入 | 把參數寫進影片第一幀，還原時自動讀取 | **無**，還原端全靠硬編碼常數 |
| 影像庫 | opencv | PIL + moviepy + imageio |
| 效率 | 多執行緒 | 單執行緒，逐像素 `img.paste()` |
| 檔案數 | 8 個 .rs 模組 + 測試資產 | 單檔 `main.py` |

**本專案不含任何一行從 Rust 翻譯過來的邏輯，是照著概念自己寫的（而且寫得簡陋很多）。** 因此雖然原版是 GPL-3.0、本專案是 MIT，就程式碼而言不構成衍生作品的授權衝突（概念本身不受著作權保護）。

**④ 但 README 散文有逐字複製，且未加引號標示（Confirmed）**
「How to use」段落逐條比對：

| 步驟 | 原版 | 本專案 | 判定 |
|------|------|--------|------|
| 1 | Zip all the files you will be uploading | Archive to zip all the files you will be uploading | 近乎逐字 |
| 2 | Run the executable | Run the executable | **完全相同** |
| 3 | Use the embed option on the archive… | （改成自己的三選項說明） | 已改寫 |
| 4 | Upload the video to your YouTube channel. You probably want to keep it up as unlisted | 同左，一字不差 | **完全相同** |
| 5 | Use the download option to get the video back | 同左，一字不差 | **完全相同** |
| 6 | Use the dislodge option to get your files back from the downloaded video | 同左，一字不差 | **完全相同** |
| 7 | PROFIT | PROFIT | **完全相同** |

**而且複製得很機械**：本專案是 Python 腳本，**沒有 executable**（步驟 2 叫你「執行那個執行檔」）；程式選單只有「1/2/3」，**沒有任何叫 dislodge 的選項**（步驟 6 叫你「用 dislodge 選項」）。這兩個指令在本專案裡根本不存在，只存在於原版 Rust 的 CLI。這是文字被整段貼過來、未隨實作調整的直接證據。另外「To reduce the risk of corruption, the program uses larger pixel blocks in binary mode, typically 2x2 blocks」是原版技術說明的改寫——**而本專案程式碼實際硬編碼的是 4×4，連這句改寫都與自己的程式碼不符。**

**⑤ 作者帳號背景正常，非蹭熱度小號（Confirmed）**
`KKarmugil` 建於 2021-06-19（**早於本 repo 20 個月**），26 個公開 repo，4 followers，bio 留 Telegram ID。其他 repo 包括 scrape-reddit-video-maker（11⭐）、SimpleYoutubeDownloader（5⭐）等，主要是 Python 小工具，時間分布 2021–2023 連續。**無「帳號與 repo 同日建立」「零歷史突發高星」等小號特徵。**

**⑥ 一個有意思的時序細節（Confirmed，但不改變結論）**
同一天 2023-02-25：18:54:22 建立本 repo → 18:55:39（77 秒後）推 `main.py` → 19:19:37（25 分鐘後）**另外 fork 了 `4A49/Infinite-Storage-Glitch`**（原版鏡像）到自己帳號。順序是「先發自己的重寫版，再去 fork 原版」。這與「先讀原版再重寫」的自然順序相反，但也可能只是事後想留一份存檔。**不足以支撐任何指控，列出來供讀者自行判斷。**

**⑦ 星數來源（Inferred，中等信心）**
163 星中有多少來自「搜尋 Infinite Storage Glitch 時撞到這個結果」難以量化。可佐證的間接訊號：GitHub 搜尋 "Infinite Storage Glitch" 時，**因原版已刪除，本 repo 現在是星數最高的搜尋結果**（第二名 Memorix101 的 C# 版僅 25⭐）。21 個 commit 中有 18 個是改 README，只有 3 個碰程式碼——**投入的工程量與星數不成比例**。合理推斷名稱重合帶來了顯著的搜尋流量紅利。標記為 Inferred，因為無法取得 star 來源分佈資料。

### 判定總結

| 假設 | 判定 | 證據等級 |
|------|------|---------|
| 未標註的抄襲 | **排除** — README 有具連結的明確 credit，原作者要求的「credit」已滿足 | Confirmed |
| 程式碼是 Rust 翻譯 | **排除** — 架構結構性不同（無 RGB 模式／無設定幀／像素塊大小不同／單檔 vs 8 模組） | Confirmed |
| 蓄意冒名蹭熱度 | **排除** — 帳號早於 repo 20 個月，有正常歷史；README 首段就指向原版 | Confirmed |
| README 散文未標引用地逐字複製 | **成立** — 步驟 2/4/5/6/7 一字不差，且複製了本專案不存在的功能名稱 | Confirmed |
| 星數顯著受益於名稱重合與原版消失 | **可能** | Inferred |

**一句話：這是一個誠實標註來源、但 README 寫作偷懶（整段貼原文未改）的獨立 Python 重寫，不是抄襲。** 學術寫作標準下步驟 2/4/5/6/7 應加引號或改寫，但在 GitHub 專案 README 的實務規範下，附連結的「inspired from / I recreated in python」已屬合格歸屬。**不構成抄襲指控的基礎。**

## 核心功能

`main.py` 底部三選項的互動式選單：

- **選項 1 — 檔案轉影片**：`file_to_binary()` 掃描當前目錄找 `.mkv` 檔（見下方 bug）、讀成 bytes、串成 `'0'/'1'` 字串 → `binary_to_video()` 每 bit 畫成 4×4 像素方塊填滿 1920×1080 畫面（每幀 480×270 = 129,600 bits ≈ 16.2 KB）→ moviepy `ImageSequenceClip` 輸出 `video.mp4`（24 fps）。
- **選項 2 — 影片轉檔案**：`ExtractFrames()` 用 imageio 讀當前目錄的 `.mp4` 全部幀進記憶體 → `process_images()` 轉灰階、每 4×4 區塊取平均值與門檻 128 比較還原 bit → `binaryToFile()` 寫出 `reverse.mkv`。
- **選項 3 — 從 YouTube 下載影片**：pytube 抓指定 URL 的 1080p 串流。

**上傳到 YouTube 這一步不在程式裡**——README 步驟 4 明確要求使用者自己手動上傳。這對供應鏈稽核很重要（見下）。

## 技術架構

```
  [選項 1 編碼]                          [選項 2 解碼]
  當前目錄 *.mkv                         當前目錄 *.mp4
       ↓                                      ↓
  file_to_binary()                       ExtractFrames()
  逐 1024B 讀 → f"{byte:08b}"            imageio 讀全部幀進 list（記憶體）
  串成一整條 '0101…' 字串                     ↓
       ↓                                 process_images()
  binary_to_video()                      np.mean 轉灰階
  每 bit → 4×4 px 黑/白方塊              每 4×4 區塊 mean < 128 → '1'
  1920×1080 = 129,600 bits/幀                 ↓
  PIL img.paste() 逐格繪製               binaryToFile()
       ↓                                 每 8 bit → 1 byte
  moviepy ImageSequenceClip @24fps            ↓
       ↓                                 寫出 reverse.mkv
  video.mp4
       ↓
  ⚠️ 使用者手動上傳 YouTube（程式不參與）
       ↓
  [選項 3] pytube 下載回來
```

| 層次 | 技術 |
|------|------|
| 影像處理 | Pillow（PIL）逐像素 `paste`、numpy 灰階運算 |
| 影片編碼 | moviepy 1.0.3（`moviepy.editor.ImageSequenceClip`） |
| 影片解碼 | imageio + ffmpeg backend |
| YouTube 下載 | pytube 12.1.0 |
| 進度顯示 | tqdm |
| 介面 | 裸 `input()`，無 argparse、無 CLI 框架 |

## 實測發現的程式碼問題

從原始碼直接可驗證，未執行（Confirmed by code reading）：

1. **文件與程式碼不一致的副檔名**：README 說「input file should be zipped file」「keep only one zip file in same directory」，但 `file_to_binary()` 第 16 行找的是 `.mkv`；`binaryToFile()` 寫出 `reverse.mkv` 卻 print「converted to example_reverse.zip」。三處說法互相矛盾。
2. **死碼**：`ExtractFrames()` 中 `files = [...endswith('.webm')]` 下一行立刻被 `.mp4` 版覆寫，第一行永遠無效。
3. **無錯誤更正、無校驗、無設定幀**：YouTube 重新編碼後若有任何 bit 翻轉，還原出的檔案會靜默損壞，程式無從偵測（原版至少把參數嵌在第一幀）。4×4 像素塊比原版的 2×2 抗壓縮性好，但這是唯一的防護。
4. **記憶體與效能**：整個檔案的位元字串一次全存記憶體（1 MB 檔 = 800 萬字元字串），`ExtractFrames()` 把整部影片所有幀存進 list，`binary_to_video()` 每幀呼叫 129,600 次 `img.paste()`。**只要檔案稍大就會耗盡記憶體或慢到不可用。**
5. **`youtube_video_downloader()` 幾乎必然失敗**：`yt.streams.filter(res="1080p").first()` 在 YouTube 現行架構下 1080p 只有 adaptive（無音訊）串流，且更根本的問題見下。
6. **零測試、零例外處理**：選單以外沒有任何 try/except，找不到檔案就直接 traceback。

社群也反映了實用性問題：issue #2 標題直接叫「fake」，issue #3 的 lsnnt 提 PR 表示「modified your code in such a way that it interacts with users to get which file to encode or decode so that user dont assume it fake」（因為原本寫死掃目錄，使用者根本不知道它在處理哪個檔）。該 PR 自 2024-01-07 起至今未合併。

## 供應鏈稽核

### ① 作者真實性 — 通過

`KKarmugil` 帳號建於 2021-06-19，**早於本 repo 20 個月**，26 個公開 repo，內容為連續兩年的 Python 小工具，非批量產生。無小號特徵。唯一可留意處是 bio 只放 Telegram ID（`@zdarknn`）無其他身分連結，但這對個人開發者屬常態。**證據等級：Confirmed。**

### ② 安裝腳本 — 無，零風險

無 `install.sh`、無 `setup.py`、無 `pyproject.toml`、無 postinstall hook、無 Makefile。安裝方式是 `pip install -r requirements.txt` 後 `python main.py`。**repomix 全檔清單只有 5 檔，不存在藏起來的安裝邏輯。證據等級：Confirmed。**

### ③ 相依套件實查存在性 — 6 個全部存在、全部未 yanked，但版本已嚴重腐化

逐一打 PyPI JSON API 實查（`https://pypi.org/pypi/<pkg>/<version>/json`）：

| 套件 | 釘選版本 | HTTP | 該版本存在 | yanked | 上傳日 | PyPI 最新版 |
|------|---------|------|-----------|--------|--------|------------|
| imageio | 2.22.1 | 200 | ✔ | False | 2022-10-03 | 2.37.4 |
| moviepy | 1.0.3 | 200 | ✔ | False | 2020-05-07 | 2.2.1 |
| numpy | 1.22.4 | 200 | ✔ | False | 2022-05-20 | 2.5.1 |
| Pillow | 9.4.0 | 200 | ✔ | False | 2023-01-06 | 12.3.0 |
| pytube | 12.1.0 | 200 | ✔ | False | 2022-05-09 | 15.0.0 |
| tqdm | 4.62.3 | 200 | ✔ | False | 2021-09-20 | 4.70.0 |

**無不存在的套件、無 quarantined、無 yanked、無 typosquatting、無可疑新註冊套件。** 這點與先前稽核到的 LongCat（requirements 兩顆地雷：一個 PyPI 根本不存在、一個被 quarantined）截然不同——**本專案的 requirements.txt 是乾淨的。** 這個正面結果值得明寫。

**但版本健康度有三個實質問題：**

- **`numpy==1.22.4` 是安裝阻斷器**：實查該版本的 wheel tag 只有 `cp38 / cp39 / cp310 / pp38`。**在 Python 3.11 以上沒有預編譯 wheel**，pip 會退回原始碼編譯，而 numpy 1.22 的建置在新版工具鏈下幾乎必然失敗。今日在主流 Python（3.12／3.13）環境直接 `pip install -r requirements.txt` **大機率裝不起來**。
- **`pytube==12.1.0` 依賴的是已停止維護的套件**：PyPI 上 pytube 最後一次發版是 **15.0.0（2023-05-07），至今 3 年零更新**。pytube 因 YouTube 前端與簽章機制反覆改版而長期失效，是社群公認已廢棄的專案。**選項 3（下載影片）實質已不可用。**
- **`Pillow==9.4.0` 帶已知漏洞**：該版早於 Pillow 10.0.1，涵蓋在 CVE-2023-4863（libwebp 堆積溢位，該漏洞曾被實際利用）與 CVE-2023-44271（ImageFont DoS）的受影響範圍內。此處為依版本區間推斷，**證據等級：Inferred（未逐一比對 advisory 的精確受影響版本字串）**，但升級 Pillow 本來就沒有理由不做。
- `moviepy==1.0.3` 本身可安裝，但要注意 `moviepy.editor` 這個 import 路徑在 moviepy 2.x 已移除——**所以這裡的釘選反而是對的**，若有人「順手升級 moviepy」程式會立刻壞掉。

### ④ 安裝改動面 — 低，但會污染工作目錄

不改系統設定、不寫註冊表、不裝服務、不要求提權。但程式的檔案處理方式很粗糙：**掃描並使用「當前工作目錄」下的檔案**（`os.getcwd()` + 副檔名比對取第一個），輸出時**直接在當前目錄寫死 `video.mp4` / `reverse.mkv` / `binary.txt`**，無覆寫確認。在含有同副檔名檔案的目錄執行，行為不可預期且會無聲蓋掉既有檔案。使用時應在專用空目錄操作。

### ⑤ 對外網路呼叫面 — 單一出口，無憑證、無遙測

對 `main.py` 全文檢視，**唯一的網路行為是 `youtube_video_downloader()` 中的 `YouTube(url)` + `stream.download()`（pytube）**，且 URL 由使用者在執行期手動輸入。除此之外無 `requests`、無 `urllib`、無 socket、無遙測、無錯誤回報、無任何硬編碼的外部端點。

**「上傳什麼、用什麼憑證」的答案是：程式不上傳，也不碰任何憑證。** 這點必須說清楚，因為 repo 描述寫「YouTube as Cloud Storage」容易讓人以為它會代你上傳：

- **不處理 YouTube 帳號**：無 OAuth、無 API key、無 cookie 讀取、無 `youtube-upload` 類函式庫。requirements.txt 裡沒有 `google-api-python-client` / `oauth2client` 之類的東西。
- **上傳完全由使用者手動完成**：README 步驟 4「Upload the video to your YouTube channel. You probably want to keep it up as unlisted」——你自己開瀏覽器上傳。
- **下載方向不需登入**：pytube 抓公開／unlisted 影片不需憑證。

**因此供應鏈風險面很窄：沒有憑證可以被竊，沒有自動上傳可以被劫持。** 真正的風險不在程式，而在使用行為本身——

⚠️ **使用面的實質風險（與程式碼無關但必須提醒）**：
1. **資料未加密**：檔案是直接以位元繪成畫面。任何拿到該影片的人都能用同樣方法還原內容。unlisted 不等於私密（連結可轉傳、可被爬）。**要放任何敏感內容必須自己先加密再編碼。**
2. **違反 YouTube 服務條款的風險**：以 YouTube 為通用檔案儲存明顯偏離平台用途。原版作者自己在 README 寫「Maybe? …I still don't condone using this tool for anything serious/large. YouTube might understandably get mad.」**帳號可能被處置，且沒有申訴空間。**
3. **無耐久性保證**：影片可能被下架、被重新轉檔（毀損資料）、或因政策變動消失。**不能當備份。**

## 社群口碑

依 repo-intel 規則，stars（163）未達 1,000 門檻，**Phase 4 社群口碑（Exa／Reddit／X）與 Phase 4.5（YouTube 教學訊號）本次跳過**。小型專案在社群平台的討論量不足以形成有意義的樣本，強行搜尋只會撈到原版 DvorakDwarf 專案的討論並造成混淆——**這在本案尤其危險，因為兩者同名，社群搜尋結果幾乎必然指向原版而非本 repo。** 這是跳過的額外正當理由。

替代訊號採用 repo 自身的 issue 內容：5 個 issue 中，#2 標題為「fake」、#3 提 PR 改善「使用者不知道程式在處理哪個檔案所以以為是假的」、#5 有人乾脆重寫了一個 GUI 版本丟上來。**社群訊號整體偏負面，集中在「不清楚它到底有沒有在運作」。**

## 社群健康度

| 指標 | 數值 | 評估 |
|------|------|------|
| 貢獻者 | 1 人（KKarmugil，21 commits） | 單人專案 |
| commit 組成 | 21 commits 中 **18 個是改 README**，碰程式碼的僅 3 個 | 工程投入極低 |
| 近 4 週 commit | 0 | 停滯 |
| 最後推送 | 2024-01-07 | 已 2.5 年未動 |
| Release | 從未發布 | — |
| Issue / PR 回應 | PR #3 掛 2.5 年未處理，issue #4/#5 無回應 | 已棄置 |
| Fork/Star 比 | 28/163 ≈ 17% | 偏高 |

**專案處於實質廢棄狀態（Confirmed）**，且如上所述，即使有心使用，`numpy==1.22.4` 與 `pytube==12.1.0` 兩道關卡也讓它在現代 Python 環境難以跑起來。

## 與現有系統的相關性評估

| 面向 | 評估 |
|------|------|
| **Obsidian Vault** | 無關聯。vault 走 git 同步（`sanyoii/-Obsidian_vault`），且 vault 內容含個人資料，把它編碼上傳 YouTube 是明顯的隱私倒退。 |
| **Claude Code** | 無關聯。非 skill／MCP／plugin，無整合面。 |
| **Automation** | 無關聯。需人工上傳、人工下載、人工管理影片與檔案的對應關係，無法排程。 |
| **跨機傳檔 / 備份需求** | **依 R13 誠實評估：沒有真需求。** 現有環境已有 git（主 repo + obsidian repo）、robocopy、portable-bundle 三套成熟機制。把「無限免費儲存」當賣點在此環境不成立——瓶頸從來不是容量。 |

**唯一的價值是概念性的**：「把資料編碼進非資料載體（影片／圖片／音訊）以繞過平台限制」這個思路，與 QA／資安領域的隱寫術（steganography）、資料外洩通道（exfiltration channel）分析相通。若未來做 Web3／CEX 託管方向的資安工作，理解「員工可以把資料編碼成影片上傳公開平台帶走」這種 DLP 盲區有實務意義。但要理解這個概念，**讀原版 DvorakDwarf 的 README「Explanation 4 nerds」段落（RGB 模式 vs 二元模式、壓縮抗性、設定幀）比讀本專案的程式碼收穫大得多**——本專案是原版的簡化版，把最有趣的部分（RGB 模式、自適應設定）都拿掉了。

## 安裝建議

❌ **不適合安裝** — 四個獨立理由：

1. **實質無法執行**：`numpy==1.22.4` 在 Python 3.11+ 無 wheel、`pytube==12.1.0` 所屬套件已停更 3 年且對現行 YouTube 失效。要跑起來得先自己修相依，而修完得到的是一支 200 行的簡陋腳本。
2. **無真實需求**：跨機傳檔與備份在現有環境已有 git／robocopy／portable-bundle 三套機制，瓶頸不是儲存容量。R13「加複雜度換小改善 → 不做」直接適用。
3. **使用本身帶帳號風險**：以 YouTube 當檔案儲存偏離平台用途，連原版作者都不建議認真使用。
4. **就算要學概念，原版才是正確讀物**：本專案移除了原版最有價值的設計（RGB 模式、抗壓縮取捨、設定幀自描述）。

**沒有升級／放棄觸發條件需要追蹤**——❌ 判定不進復查佇列。

**值得留下的知識（不需安裝即可取得，且本報告已記錄完畢）**：①「資料編碼進影片繞過平台限制」是真實存在的 DLP 盲區類型；②光學／視覺載體的核心工程取捨是「像素塊大小 vs 抗壓縮性 vs 資料密度」；③本案示範了一個重要的判讀教訓——**同名 repo 未必是抄襲，查 README 有無 credit、比對程式碼架構、查作者帳號年齡，三步就能分清「致敬重寫」與「冒名蹭星」**，不要看到同名就下指控。

## 相關連結

- [[Github/repos/airgapped-qr-code-transfer — 用 QR Code 螢幕對鏡頭離線傳檔的純前端工具|airgapped-qr-code-transfer]] — 同批分析，同樣屬「把資料編碼成視覺媒介」的思路（QR 螢幕對鏡頭 vs 影片畫面上傳）
- [[Github/repos/decimen-optical-transfer — 噴泉碼動畫 QR 螢幕對相機傳檔 PoC|decimen-optical-transfer]] — 光學傳檔賽道中工程品質最高的一個（LT 噴泉碼），可對照本專案「無 ECC 無校驗」的落差
- 供應鏈稽核方法論：memory `feedback_supply_chain_audit_repo_intel`（五項固定檢查；本次為「正面結果也要寫」的又一案例——6 個 PyPI 套件全數乾淨）
- 判讀方法補充：本案的「同名非 fork repo 歸屬判定三步法」（查 credit／比架構／查帳號年齡）可併入未來的 repo-intel 稽核流程
