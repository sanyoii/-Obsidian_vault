<!-- processed: 2026-07-30 -->
<!-- 來源：倫敦黑貓 London Black Cat（Substack，作者匿名）https://londonblackcat.substack.com/p/e7b -->
<!-- 取得方式：defuddle 失敗（Substack SPA，documentElement is null）→ curl 抓 HTML + 自寫 regex 抽 body markup；解讀為 wiki/Quant-Trading/lehman-brothers-trading-manuals.md -->

# 來源記錄：雷曼外匯與選擇權交易實戰手冊流出

## 出處

| 欄位 | 值 |
|------|-----|
| 標題 | 雷曼外匯與選擇權交易實戰手冊流出 |
| 站點 | 倫敦黑貓 London Black Cat（Substack） |
| URL | https://londonblackcat.substack.com/p/e7b |
| 分類 | 金融秘辛 Inside Finance |
| 發布 | 2026-07-29 |
| 付費牆 | 無（archive API `audience: everyone`） |
| 作者 | 匿名，自稱倫敦投行內部人，無可驗證署名 |
| 正文長度 | 約 6,771 字元 |
| 外部連結 | 4 個（3 PDF + 1 索引頁，全部指向 Stanford 的 Lehman Examiner 文件庫） |

> **未逐字存檔的理由：** 本 vault（`sanyoii/-Obsidian_vault`）是 **public repo**，逐字轉存他人 Substack 全文等同公開轉載。改存來源記錄 + 一手文件本體（美國破產法院公開紀錄，無此顧慮）。原文永久位址見上方 URL。

## 文章段落骨架

1. 引言 — 雷曼背景（2008 倒閉前全美第四大投行）
2. 這批文件為何能公開 — 紐約破產法院 Examiner 調查 → 2010 年 Jenner & Block 上網
3. 資料規模說明 — 約 3 PB 電子資料、500 萬份／4,000 萬頁；公開的僅報告 + 註腳引用之 supporting documents
4. 雷曼兄弟外匯與選擇權交易實戰手冊（含 PDF 連結）→ 新手會學到什麼（三點）
5. 雷曼兄弟 Repo 交易實戰手冊（含 PDF 連結）→ 新手會學到什麼（四點）
6. 雷曼兄弟 Credit Risk Management 實戰手冊（含 PDF 連結）→ 新手會學到什麼（四點）
7. 雷曼破產調查報告與內部郵件全紀錄（含索引頁連結）→ 手冊 × 證物對讀法

每段結尾固定一句「一句話總結」——全站共用的樣板結構。

## 附件（已下載，本地一手副本）

`raw/sources/lehman-manuals/`

| 檔案 | Bates 編號 | 大小 | 頁數 | 驗證 |
|------|-----------|------|------|------|
| `LBEX-LL-3356480-3356609_FX-and-Options-Training-Manual.pdf` | LBEX-LL 3356480-3356609 | 5.1 MB | 130 | ✅ p.1 標題 `LEHMAN BROTHERS FOREIGN EXCHANGE TRAINING MANUAL` |
| `LBEX-LL-1175483-1175553_Repo-Sales-Reference-Guide.pdf` | LBEX-LL 1175483-1175553 | 6.0 MB | 71 | ✅ p.1 標題 `REPO MANUAL`，Product Marketer/PIM: Kathy Ashe |
| `LBEX-DOCID-688141_Credit-Risk-Reporting-Manual.pdf` | LBEX-DOCID 688141 | 0.37 MB | 32 | ✅ p.1 標題 `Credit Risk Reporting Procedures Manual, Version 1.0`（CRMC review 2007-11-13，標記 FOIA） |
| `Lehman-Examiner-Docs-Index.html` | — | 1.8 KB | — | ✅ 九冊索引，Examiner = Anton R. Valukas |

驗證方式：`curl -sIL` 確認 HTTP 200 + Content-Length → 下載後 `head -c 8` 核 `%PDF` magic bytes → pypdf 抽頁數與前三頁 TOC 逐項比對文章聲稱。

**尚未下載：** Examiner Report 九冊 PDF（menu.html 內的第二層連結，共約 37 MB）。

## 事實查核結果

抽查的硬事實全部與一手文件相符（詳見 wiki 文章「可信度與查核」節）。發現文章兩處不精確：未提供頁數；標題把「選擇權」與「外匯」並列，但文件本體僅名為 Foreign Exchange Training Manual，選擇權是 p.94 起的第四段。

## 同站其他文章（archive API 抓取，2026-07-30）

23 篇，2026-07-01 ~ 07-29，全部免費。分類為「暗流 Dark Money」與「金融秘辛 Inside Finance」。洗錢案系列（Danske／Wachovia／Troika／德銀鏡像交易／太子集團與匯旺）事實抽查亦正確，但除本篇外幾乎無外部引用。slug 由 `post-029` 起跳、`post-0XX` 批次命名、29 天 19 篇長文 → 內容為量產管線產出。
