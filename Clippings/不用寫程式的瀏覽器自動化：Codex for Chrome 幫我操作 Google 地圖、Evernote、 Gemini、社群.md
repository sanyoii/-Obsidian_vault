---
title: "不用寫程式的瀏覽器自動化：Codex for Chrome 幫我操作 Google 地圖、Evernote、 Gemini、社群"
source: "https://www.playpcesor.com/2026/05/codex-for-chrome-google-evernote-gemini.html?fbclid=IwY2xjawRr-ZNleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEewdtYYB-n9U-kus7vvTgT3pDKOlX5lOWZyLT3Gf718PQoXGIj3FgA1dStj4E_aem_62_5pukfQKLdboiE3cKwrA"
author:
  - "[[Esor Huang]]"
published: 2026-05-09
created: 2026-05-09
description: "分享各種行動工作技巧、雲端生活應用，善用數位工具改變你我的工作效率與生活品質。"
tags:
  - "clippings"
---
[![](https://blogger.googleusercontent.com/img/a/AVvXsEhEAOTjs5QI4VKqd1nIdyR1lvoiOw6nIOxZnvLb0WMFvblVlUd8PmPVOQsKLSMSDw4clOReZesylki-smeinTyeQdrynqwux88PyJdAOphN6DYYaJzjg3NSIYBF_nyC5WBqbM-RoZl5FT2z76E6NFOOQxsFNklfDAaBRjgdgZ2LE_9r0IEJzWrX0g=w640-h360-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhEAOTjs5QI4VKqd1nIdyR1lvoiOw6nIOxZnvLb0WMFvblVlUd8PmPVOQsKLSMSDw4clOReZesylki-smeinTyeQdrynqwux88PyJdAOphN6DYYaJzjg3NSIYBF_nyC5WBqbM-RoZl5FT2z76E6NFOOQxsFNklfDAaBRjgdgZ2LE_9r0IEJzWrX0g)

上個禮拜撰寫了「 [一般人如何快速上手 Codex 超完整圖文教學：讓 AI 助理整理文件表格，建立自動化流程](https://www.playpcesor.com/2026/05/codex-ai.html) 」一文，分享新手如何快速掌握 OpenAI 的 AI Agent 軟體：「 Codex 」。因為這幾個月的使用經驗，讓我認為 Codex 已經不只是一個程式開發 AI 工具， **Codex 更可以當作一般人管理電腦文件檔案，甚至規劃自動化處理日常工作流程的 AI 助理** 。

在前面那篇文章中，有提到 Codex 內有一個外掛（技能）功能，簡單的說，我安裝了一個 Google Drive 外掛，裡面包含了各種 AI 如何處理 Google 文件、試算表、簡報的技能，所以我可以直接命令 Codex 去管理我的某一個 Google 雲端硬碟內的資料，直接編輯試算表與簡報。

而前兩天， OpenAI 推出了一個非常強大的外掛：「 Codex for Chrome 」，顧名思義，可以讓 AI 直接打開我電腦內的 Google Chrome 瀏覽器，幫我完成「那些原本在瀏覽器內我會自己操作的功能」，例如，下面文章中我實際測試成功的應用案例：

- 讓 Codex for Chrome 打開我已經登入的社群網站，直接爬梳並抓取今天我可能需要的訊息。
- 讓 Codex for Chrome 抓取景點網頁資料、整理成 Google 試算表、操作 Google 地圖建立行程清單。
- 讓 Codex for Chrome 打開 Evernote 網頁端，直接在裡面搜尋、連結、整理與建立筆記。
- 讓 Codex for Chrome 打開 ChatGPT 深入研究，把研究結果輸入 Gemini ，開啟 Gemini Canvas 做成網頁預覽。

原本的 ChatGPT、 Codex 就內建搜尋網路資料的功能，原本的 Codex 也內建打開網頁並操作的功能（例如我之前 [用 Codex 做一個線上象棋遊戲](https://www.playpcesor.com/2026/03/ai.html) ， Codex 可以打開遊戲網頁操作測試功能）。

**那麼 Codex for Chrome 最大的不同在哪裡呢？** 根據我實際使用後體驗到的關鍵差別是：

- 因為直接使用我在電腦中登入的真實 Chrome 瀏覽器， **所以可以處理「需要登入」（而我已經登入）的網站功能** ，像是各種社群、雲端服務等等。
- Codex for Chrome 會在我們電腦中的瀏覽器真的打開分頁操作，但會利用 Chrome 的群組分頁功能， **AI 的操作在「背景分頁」自動處理** ，我們可以看，但不影響我們同時操作其他分頁。（延伸閱讀： [我用 Chrome 內建分頁群組，解決多線 AI 助理與工作流程混亂的問題](https://www.playpcesor.com/2026/01/chrome-ai.html) ）

透過 Codex for Chrome，我們可以利用 AI 去處理一系列雲端服務網站的操作，可以在網站中使用功能、輸入資料、獲取內容，並且可以串聯多個步驟（ **例如要求 AI 連續打開多種網站，自動完成一系列前後接續的操作** ），成為一個對一般人來說最簡單的自動化工具（ **因為執行過程完全只需自然語言下指令，不會涉及任何程式碼** ）。

## 如何開始使用 Codex for Chrome：

首先，你當然需要先下載安裝 OpenAI 的 Codex 軟體（參考：「 [一般人如何快速上手 Codex 超完整圖文教學：讓 AI 助理整理文件表格，建立自動化流程](https://www.playpcesor.com/2026/05/codex-ai.html) 」）。

接著，在左上方的「外掛程式」頁面，找到最新推出的「 Chrome 」外掛，直接選擇安裝即可。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEgItWSAqJ3YApjt_QH97NaTI0pZiOIPF0uIt9sZwXBJUsl71ikPUO6qL4DtQnhQUH2-oGu-cm3WecXmyT8O7UsYYpPvsoYmapd1Ha2sgTDtI4thwe58n6yaiOVrgUIiC7rcZsDGiGOFg6YfLLpIrBF0JhRc7oUJnZjZLssyl1O4YGgPgAIGXMcLnQ=w640-h426-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEgItWSAqJ3YApjt_QH97NaTI0pZiOIPF0uIt9sZwXBJUsl71ikPUO6qL4DtQnhQUH2-oGu-cm3WecXmyT8O7UsYYpPvsoYmapd1Ha2sgTDtI4thwe58n6yaiOVrgUIiC7rcZsDGiGOFg6YfLLpIrBF0JhRc7oUJnZjZLssyl1O4YGgPgAIGXMcLnQ)

同時，還需要在 Google Chrome 瀏覽器中，安裝「 Codex 」的應用程式（外掛頁面會引導你去安裝）。

兩者都做好，就能讓 Codex 去操作 Chrome 瀏覽器中的網站與功能。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEjqotq8LwZDClv4TYiNRP_fUt5OF8V9Tx5jVF6tfH0amQ8gm7WG8n2ZeP64i_aSM7FLrV30V48o-Zv_H0QL_ZMXLqu8VmnMPUDU7GW89lRPHok1m5MlP93mDFFr_3AMX55Mmn9FHBfFljwayLOrBUm5v3QRevztQ0RJ7pODH83umDTiXfMN_aUovQ=w640-h394-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEjqotq8LwZDClv4TYiNRP_fUt5OF8V9Tx5jVF6tfH0amQ8gm7WG8n2ZeP64i_aSM7FLrV30V48o-Zv_H0QL_ZMXLqu8VmnMPUDU7GW89lRPHok1m5MlP93mDFFr_3AMX55Mmn9FHBfFljwayLOrBUm5v3QRevztQ0RJ7pODH83umDTiXfMN_aUovQ)

最後，最簡單的使用方式， **就是我們可以在 Codex 中利用左下方的「（單純）聊天」功能，開一個新的對話，在對話一開頭先輸入「 @chrome 」** ，主動呼叫出 Chrome 外掛，就能開始下指令，要求 Codex 去做各種瀏覽器端的網站操作了！

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhqAMNEYgKB-8wgS8eKHy5w6vVz2-P5z1BRCf3nbmjTNZ_tBFTRErgVEAVKbriaz7c1g6PGCXGyBhEjxAhdzj5IZwrqJmpFI3ixYTOHbvAx6V8jGtrbeHKTeZKUqH4yUhBdgEBW7IPVn7J2SJODhTQwiwwLKL9GATH1n8FoG87omwucGMd6hz5tcA=w640-h332-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhqAMNEYgKB-8wgS8eKHy5w6vVz2-P5z1BRCf3nbmjTNZ_tBFTRErgVEAVKbriaz7c1g6PGCXGyBhEjxAhdzj5IZwrqJmpFI3ixYTOHbvAx6V8jGtrbeHKTeZKUqH4yUhBdgEBW7IPVn7J2SJODhTQwiwwLKL9GATH1n8FoG87omwucGMd6hz5tcA)

## 讓 Codex for Chrome 打開我已經登入的社群網站，直接爬梳並抓取今天我可能需要的訊息：

每天要獲取大量資訊，還要整理資料庫，是非常繁瑣的動作，所以我會交給 AI ：「 [AI 結合卡片盒筆記法，人不再操作軟體，用對話流程讓 Codex 搭建資料整理系統：我的兩個月實測心得](https://www.playpcesor.com/2026/04/ai-codex.html) 」。

要讓 Codex AI 去抓取網頁資料，甚至 YouTube 影片字幕，都很簡單。但是， **如果要讓 AI 直接「像我一樣」捲動瀏覽我的社群首頁，幫我看過一遍，然後抓取我可能需要的貼文資訊呢？**

這時候就可以利用 Codex for Chrome，我是這樣下指令的（指令中所說的資料庫，就是我前面文章所說的，利用 AI 建立的外部資料庫）：

@chrome 檢索我的 X 社群貼文，根據我資料庫中的筆記、寫作喜好，過濾出我感興趣的貼文，請一步一步分析，檢索貼文，遇到我感興趣的主題就摘要，持續進行直到瀏覽完今日社群主要貼文為止，然後把摘要的貼文與網址列成清單讓我瀏覽。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhVScvvf71u2jumjG0FUtv4OFAz3vWACbsPRMaaoWMrL6qQ1AYAWKDF3gdH9lTjNt26vcIN2uBODxjEJi0PF_E-C_ulur-hT3PlSSrpPPpC6lp48d5FWY_bvhPqfILVFcLMIvCnsPq3Lpy6ZqHyI9G80P_Ia2QcqjXf7r0maGAEDj51vKDFBBrhHA=w640-h458-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhVScvvf71u2jumjG0FUtv4OFAz3vWACbsPRMaaoWMrL6qQ1AYAWKDF3gdH9lTjNt26vcIN2uBODxjEJi0PF_E-C_ulur-hT3PlSSrpPPpC6lp48d5FWY_bvhPqfILVFcLMIvCnsPq3Lpy6ZqHyI9G80P_Ia2QcqjXf7r0maGAEDj51vKDFBBrhHA)

我要求 Codex 做幾個連續動作：

- 打開我已經登入的社群網站。
- 捲動我的首頁。
- 一頁一頁捲動，從中找出我感興趣的主題貼文。
- 抓出貼文的摘要與網址。
- 列成清單。

而當 Codex for Chrome 實際操作時，就會像下圖這樣， **AI 會在我真正使用的瀏覽器中，打開一個背景分頁群組，然後在背景自己操作我的社群去瀏覽。**

那個當下，我則打開其他分頁在做其他工作。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhpSEQr7kWh7-FhauEit93tuXWYdX7My2CTtl9ChfqfVFdvYwaqZYAgZ2zDLSnkXvCG_csqEnjU9n1QMLa36_0Bd6-akw9YELDvfhfRStoOVzTSbFvsLfEm9s0o8ibEbQyPgaWcAVynawvcHTxbRLE13QzDt2cYi4zjYglbrny3nKefiT54goPfoQ=w640-h372-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhpSEQr7kWh7-FhauEit93tuXWYdX7My2CTtl9ChfqfVFdvYwaqZYAgZ2zDLSnkXvCG_csqEnjU9n1QMLa36_0Bd6-akw9YELDvfhfRStoOVzTSbFvsLfEm9s0o8ibEbQyPgaWcAVynawvcHTxbRLE13QzDt2cYi4zjYglbrny3nKefiT54goPfoQ)

下面則是 Codex 在訊息中呈現他做了哪些動作，可以看到 AI 根據我資料庫中的主題，一頁一頁過濾我的社群貼文時間線的訊息。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEghtj9OI654QAncq3niqGTIfj1O-Uktx6qZEYa8cPwAvwLR3wwmbkr5NAD2fHvAkaIP1lmy9KaX2iP7lM7XvpSaAqoRtd43QMj3PRQI1bKNL2cgKX3aFSzxg2zNQlsK1-CocpSwU2IZdbawLLzkJJGVus0TjRpa3H7KjZaSZqtZznkpRLNvyw0_4g=w640-h438-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEghtj9OI654QAncq3niqGTIfj1O-Uktx6qZEYa8cPwAvwLR3wwmbkr5NAD2fHvAkaIP1lmy9KaX2iP7lM7XvpSaAqoRtd43QMj3PRQI1bKNL2cgKX3aFSzxg2zNQlsK1-CocpSwU2IZdbawLLzkJJGVus0TjRpa3H7KjZaSZqtZznkpRLNvyw0_4g)

最後的結果如下，正確的根據我的喜好與要求，列出他找到的貼文摘要、連結清單。

平常我自己爬社群訊息，是最花時間又低效益的一件事情， **而現在可以交給 Codex for Chrome 來說，他自己爬梳完十幾頁內容後，自然我給我關鍵資訊摘要** 。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEjWA8bUMVhUH4qFEiXg4PTOOCsVVb-0ZMMM7j-nKA_pzNNk39QXHAvZ28eO24LdcVF6GgatmwxrmU79QxLh5-rCyWbzwRbrqIVUXvha1zJNxUpDYq5Emv4fnS6rOuNpfMSKeu86LJzmHyIxrE_qKTiNDmkOoypwBxV6JrtGYPM9fWHMuoo5bHhqaA=w640-h376-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEjWA8bUMVhUH4qFEiXg4PTOOCsVVb-0ZMMM7j-nKA_pzNNk39QXHAvZ28eO24LdcVF6GgatmwxrmU79QxLh5-rCyWbzwRbrqIVUXvha1zJNxUpDYq5Emv4fnS6rOuNpfMSKeu86LJzmHyIxrE_qKTiNDmkOoypwBxV6JrtGYPM9fWHMuoo5bHhqaA)

## 讓 Codex for Chrome 抓取景點網頁資料、整理成試算表、操作 Google 地圖建立行程清單：

接下來，我又做了一個挑戰。

為了準備今年暑假的一次家庭旅行，我讓 Codex for Chrome 打開我的瀏覽器，幫我完成下面一系列操作：

@Chrome 請幫我搜尋峇里島最近適合親子遊的景點，結合台灣部落格的真實心得資訊，先在我的 Google 雲端硬碟建立一份 Google試算表，最後在 Google 地圖建立「2026峇里島之旅」旅遊清單，請一步一步分析，

要求：

1\. 至少瀏覽 10 篇真實心得或討論

2\. 排除官方宣傳頁

3\. 優先找親子、家庭的案例

4\. 整理成 Google 試算表表格：

\- 地點名稱

\- 地址

\- 適合優點

\- 注意事項

\- 來源連結

5\. 接著根據試算表資料，上 Google 地圖搜尋地點，儲存到你建立的清單，地點附註加上前面整理的優點與注意事項。

一樣在單純的 Codex 聊天中就可以完成，連專案都不用建立。（這對一般人最好上手！）

[![](https://blogger.googleusercontent.com/img/a/AVvXsEiNIcyUzub785SfrmnpHaaxlpOzf1VMKrrWwYB2nHX1fFxwk92CHYjpq65qaqNDVQp2bD8WnH_hVDlnbur-r1B17RlCVnYk-c4juGAPeUnMCBIWFenXZfUWr2Dz6smo6lT4GIOVlfdNR9FzLuUub87yksHiT9sRXo1eCtCac3nnKb3nroUaFb3VoA=w640-h354-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEiNIcyUzub785SfrmnpHaaxlpOzf1VMKrrWwYB2nHX1fFxwk92CHYjpq65qaqNDVQp2bD8WnH_hVDlnbur-r1B17RlCVnYk-c4juGAPeUnMCBIWFenXZfUWr2Dz6smo6lT4GIOVlfdNR9FzLuUub87yksHiT9sRXo1eCtCac3nnKb3nroUaFb3VoA)

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhEwDbqVJl0jfn29DQepx8MRxTsPhU8b73GvSrZ990uxw8IPorhvZ7pCtGQwb7JSg4QF_Y-hbD-G4Exzj4ZOvIu6s6QzkeqqPCe3YLOGlyqWOeaIVZguciHU8uRZR3s7RctVG9YZlOUOuNvGRVjgq5jeuKZiYMmwbCLDm0QvnlFv8VYx10THNq5SA=w640-h458-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhEwDbqVJl0jfn29DQepx8MRxTsPhU8b73GvSrZ990uxw8IPorhvZ7pCtGQwb7JSg4QF_Y-hbD-G4Exzj4ZOvIu6s6QzkeqqPCe3YLOGlyqWOeaIVZguciHU8uRZR3s7RctVG9YZlOUOuNvGRVjgq5jeuKZiYMmwbCLDm0QvnlFv8VYx10THNq5SA)

這個案例中， **其實 Codex 不只使用了 Codex for Chrome 的外掛， AI 會根據最適合的方式，自動調用不同外掛：**

- 搜尋部落格網路資料摘要，這個用內建搜尋瀏覽器功能即可。
- 要把資料整理成 Google 試算表， Codex 調用的是 Google 試算表的技能。
- 最後要把資料新增到 Google 地圖、建立旅遊清單，才使用 Codex for Chrome 來操作。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhndMZ1GD20_HcAdXdAkF72EfQJhbLc6wK9kemIssfjFGa3CBwu3CMWOV-YcLQkzzlBBruvqhNDD1SBV_BbrcOIEVqAiTN5nLehkGcbjZF7CDukMWl7-oQry7JuT85fZwe27bBb0kj5x5jenHmExv08EPin9xncW9ixIcZ-JMxyZpeKoXhRn5PxaQ=w640-h422-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhndMZ1GD20_HcAdXdAkF72EfQJhbLc6wK9kemIssfjFGa3CBwu3CMWOV-YcLQkzzlBBruvqhNDD1SBV_BbrcOIEVqAiTN5nLehkGcbjZF7CDukMWl7-oQry7JuT85fZwe27bBb0kj5x5jenHmExv08EPin9xncW9ixIcZ-JMxyZpeKoXhRn5PxaQ)

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhx4A3QlR75H_KZ_6DvhsBFM7vDRzgDA4WntD-5-glwytdzNuS_d4azmk3Ow6GC87dHZ6kd9Fcpn9yZ2hHWFkIrrfsS2abwWKXw43soPm9zUyGHcCgN-4AL6wnEwU8kqB2B34QNB34B8MrIuJa7zip-xT94rQ3w1xR5DchorOdFrkDzPxc4aRIxfw=w640-h378-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhx4A3QlR75H_KZ_6DvhsBFM7vDRzgDA4WntD-5-glwytdzNuS_d4azmk3Ow6GC87dHZ6kd9Fcpn9yZ2hHWFkIrrfsS2abwWKXw43soPm9zUyGHcCgN-4AL6wnEwU8kqB2B34QNB34B8MrIuJa7zip-xT94rQ3w1xR5DchorOdFrkDzPxc4aRIxfw)

完成後， **Codex 會把產出的 Google 試算表、 Google 地圖清單連結** ，附在聊天訊息中。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhdAMoFmFTGhxz5maq1D0_X1trVX8Spg8Qq-xEnzNfjQaMvC85ycLP-1x9wYMmdnfwOiMFtPhXQsh8YgKF7s8K0ogUqX94CKzBHvxLBxztOtX5enpbsx8Fe8GfeGs78H1NuhUnWe2mYwNGsMFw_qBZ29XBqFqkPIsoQoiUCVp_QQZ-zAH6a3UOkmg=w640-h420-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEhdAMoFmFTGhxz5maq1D0_X1trVX8Spg8Qq-xEnzNfjQaMvC85ycLP-1x9wYMmdnfwOiMFtPhXQsh8YgKF7s8K0ogUqX94CKzBHvxLBxztOtX5enpbsx8Fe8GfeGs78H1NuhUnWe2mYwNGsMFw_qBZ29XBqFqkPIsoQoiUCVp_QQZ-zAH6a3UOkmg)

我們來看看 Codex 整理出來的結果，把 15 篇網頁文章，整理成 10 個推薦景點，也都根據我的指示，摘要出地址、優點、注意事項等等， **一份很完整正確的 Google 試算表** 。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEgBsZcuofqBUN4g8RZoRtUnU9YiUSCDNTc0ynDwhA1kSTKjsYMw5MV6PpQfH4rxIKSwRL-JuhneDqvX3aHqfLMSKk8vIYNle73HYiGIbf8krCOpD9BGZHld_ACRRF7FQmNCb9TwXGMCadu-3nX_rbKh4oWdN8RGESpOH-cqQOkDUjHg9CPh8P0p4A=w640-h378-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEgBsZcuofqBUN4g8RZoRtUnU9YiUSCDNTc0ynDwhA1kSTKjsYMw5MV6PpQfH4rxIKSwRL-JuhneDqvX3aHqfLMSKk8vIYNle73HYiGIbf8krCOpD9BGZHld_ACRRF7FQmNCb9TwXGMCadu-3nX_rbKh4oWdN8RGESpOH-cqQOkDUjHg9CPh8P0p4A)

打開 AI 建立的 Google 地圖旅遊清單，每個地點正確標示，在清單中把試算表內容填入， **完全不用我自己手動操作就完美完成！**

**

[![](https://blogger.googleusercontent.com/img/a/AVvXsEjkTYRJlS_dptVI3_3afOY_OmVQj2fdLzG1pwpP_Guok_rzg8zwlrEol7PosFZkwFMRxI24jewgirztW6nzAUqcZqf2qVbyG5hRX1IGwsgLE9zXNMwMg9YsljJ8oMouJDANeLdlWcSInClbpuPfUl3AbWEJvcUsanNeQuh36O6fUOnawQtf8XrT2A=w640-h406-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEjkTYRJlS_dptVI3_3afOY_OmVQj2fdLzG1pwpP_Guok_rzg8zwlrEol7PosFZkwFMRxI24jewgirztW6nzAUqcZqf2qVbyG5hRX1IGwsgLE9zXNMwMg9YsljJ8oMouJDANeLdlWcSInClbpuPfUl3AbWEJvcUsanNeQuh36O6fUOnawQtf8XrT2A)

  
  
**

## 讓 Codex for Chrome 打開 Evernote 網頁端，直接在裡面搜尋、連結、整理與建立筆記：

我自己目前主要的「 [防彈筆記](https://www.playpcesor.com/2024/01/2024-work-optimization-bulletproof-journal-system.html) 」（專案流程、任務經驗）還是使用 Evernote 。那麼， Codex for Chrome 可不可以直接操作 Evernote 呢？

我是這樣下指令的：

@chrome 打開我的 Evernote 網頁（https://www.evernote.com/client/web）， 建立一則 Codex 主題筆記，內容是相關資料連結，請一步一步處理：

1.先建立一則全新的 Codex 主題筆記。

2 在 Evernote 內搜尋 codex 關鍵字找出標題有相關關鍵字的筆記，每一則筆記都建立一個連結，連到前面的主題筆記。

3\. 在我的這個 RRS-brain 資料庫中，找到 Codex 相關的永久筆記，也補充到前面的 Codex 主題筆記 Evernote 中。

這個流程中，一開始我沒有成功， **第二次我直接告訴 AI 打開 Evernote 筆記頁面的網址** ，就成功了。

其實， **我原本不確定 Codex for Chrome 會不會「操作」 Evernote 上的搜尋、連結、編輯筆記等等功能，但最後結果可以說是「完美」完成** 。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEgyykIB-bCH9blRgfVyp_hdTKGcUBL8oHoafIfRTcvjAjrV9N8-xvLOat85d_CCCFUz-3TMH_EOSZPf_Z45YK-vEOVhHTlWAkenegJRa7s4kwjGUtc9CZFWt4MfN4qTcIMO1vcggHV1aq2nBq2NZxhF8jiSsLH9y5s-uGJ4TJOVKgTDUt7kb9uOnA=w640-h378-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEgyykIB-bCH9blRgfVyp_hdTKGcUBL8oHoafIfRTcvjAjrV9N8-xvLOat85d_CCCFUz-3TMH_EOSZPf_Z45YK-vEOVhHTlWAkenegJRa7s4kwjGUtc9CZFWt4MfN4qTcIMO1vcggHV1aq2nBq2NZxhF8jiSsLH9y5s-uGJ4TJOVKgTDUt7kb9uOnA)

下圖就是 Codex for Chrome 正在操作 Evernote 網站時， **我打開背景分頁「偷看」 AI 在看嘛？** 正好看到他自己輸入關鍵字，在我的 Evernote 中搜尋筆記。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEj3hPveGKeoqxATzjYLUTkz2mwT99qhHkjyhff_IZHck8YGH3axZSFNNcBhpNWRyzGaKeQsooJ7DaZE8l915WpJN3z6iQxC2kVFSR6OvAtym7HF6mOB79d6YYBlMA6pwYU4wrFISnrufhkVnU-MLYIz6wcQuyqKZuSf7V61ohYwYEb2DvJX0Y4CsA=w640-h362-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEj3hPveGKeoqxATzjYLUTkz2mwT99qhHkjyhff_IZHck8YGH3axZSFNNcBhpNWRyzGaKeQsooJ7DaZE8l915WpJN3z6iQxC2kVFSR6OvAtym7HF6mOB79d6YYBlMA6pwYU4wrFISnrufhkVnU-MLYIz6wcQuyqKZuSf7V61ohYwYEb2DvJX0Y4CsA)

> **我只要說明操作步驟，看起來 Codex for Chrome 可行掌握各種網站的功能** 。

這樣我的 Codex 本地端資料庫，就跟雲端的 Evernote 完整結合在一起了！

[![](https://blogger.googleusercontent.com/img/a/AVvXsEiyyWyj1qF9uA_YNUEDtmq2YX1xoZmD-UjYF1P_aDni7SRa9suAmKJk-_7MJJVMswVzAncLkq5DDsyKsConx2jOzO3eWJ8m-Nvi4sBXG_HUUwaQ5kOh_F2hCfbsxtlQkZHnee9oIVN61_QsYj3bevg74zrtChUqY-LT8hYeq5IWvbXSRtBOJdcLxg=w640-h452-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEiyyWyj1qF9uA_YNUEDtmq2YX1xoZmD-UjYF1P_aDni7SRa9suAmKJk-_7MJJVMswVzAncLkq5DDsyKsConx2jOzO3eWJ8m-Nvi4sBXG_HUUwaQ5kOh_F2hCfbsxtlQkZHnee9oIVN61_QsYj3bevg74zrtChUqY-LT8hYeq5IWvbXSRtBOJdcLxg)

**下面是 Codex 自己在我的 Evernote 網頁端完成的筆記** ，格式正確、資料正確，且善用 Evernote 內建的功能（例如連結，也都是正確的）。

（ **附註：不過現在的 Evernote 內建 AI ，其實也可以完成類似自動編輯處理** ）

[![](https://blogger.googleusercontent.com/img/a/AVvXsEibsjwPgZyMm1Fpp5CW_a5uRk0tYqQGv04qyts6tDMhQK7rvSnwy1wn3X0vYwJSJcETHva2ufDyqHpBhkThRcdFvE0ZRkdUossFTL00EZzes9J9QVoG5TGtRmPuyK0YFmAexn4VUvgu0VrigCXP87u_z2mAUlWBGl8QCDWxdmM8LgzU3f_-XfGHVg=w640-h440-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEibsjwPgZyMm1Fpp5CW_a5uRk0tYqQGv04qyts6tDMhQK7rvSnwy1wn3X0vYwJSJcETHva2ufDyqHpBhkThRcdFvE0ZRkdUossFTL00EZzes9J9QVoG5TGtRmPuyK0YFmAexn4VUvgu0VrigCXP87u_z2mAUlWBGl8QCDWxdmM8LgzU3f_-XfGHVg)

## 讓 Codex for Chrome 打開 ChatGPT 研究，把研究結果輸入 Gemini 做成網頁預覽：

接下來， **我想利用 Codex for Chrome 來幫我「操作多個 AI 服務」，並且串聯不同 AI 服務產出的內容，最後輸出我要的結果** 。

下面是我的指令：

@chrome 你是小孩遊戲化學習的設計助理，幫我設計出一個可以讓小孩練習的國小三年級自然科練習網頁。請一步一步設計：

1.打開我的 ChatGPT 網頁（ https://chatgpt.com/ ），開一個新的聊天串，使用 Thinking 以上模型，利用搜尋功能，梳理出國小三年級自然課關於「物質三態變化」的相關課文、教案、練習題目，你可以多次來回問答，根據回答修正提問，直到找出最完整適合小孩學習的教材內容，並整理成一份練習清單。

2.接著打開我的 Gemini 網頁（ https://gemini.google.com/app ），先研究如果要設計一個課堂中可以用，讓小孩打開網頁就能練習的互動遊戲化測驗，有哪些案例，可以怎麼設計，整理成一份設計規則清單。

3.當前面兩個步驟完成，最後利用 Gemini 再開一個新的聊天室，啟動 Canvas 功能，寫出指令，把前面的遊戲網頁設計規則＋自然課練習清單輸入，利用 Gemini 做出可預覽使用的網頁，做出模擬線上測驗遊戲，

下圖是 Codex 自己打開網頁進行的操作，他打開我登入的 ChatGPT ，切換到 Thinking 模型，自己寫出一段符合我要求的指令，然後開始研究。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEibYQiGCC4BV3mMAaqtUP3GyNlr4ptZSlb4A8DVjC4FOucLYwXYcdT__93Xr_IhM4x8gm8_KqdvzzWd4fSsinOQz-cBYMHRxU5FquhLzXlmWWJxHqocfhoHnBASiL1QkpXy_pZty8frP61e0cu8pq3iZ-DUjj7mu84FOL_nKPVZRjj3lvm7Ye7Zaw=w640-h396-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEibYQiGCC4BV3mMAaqtUP3GyNlr4ptZSlb4A8DVjC4FOucLYwXYcdT__93Xr_IhM4x8gm8_KqdvzzWd4fSsinOQz-cBYMHRxU5FquhLzXlmWWJxHqocfhoHnBASiL1QkpXy_pZty8frP61e0cu8pq3iZ-DUjj7mu84FOL_nKPVZRjj3lvm7Ye7Zaw)

ChatGPT 思考模型有時候要想比較久， **這時候 Codex for Chrome 幫我「自動監控」 ChatGPT 到底回答好了沒？**

我不用在旁邊等 AI 做好，而是接給 Codex 全面接管。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEgQo5mxSkyT1OX84Ltlw3wtFKwo4OhxW7N3iCaalrl1jkYc48jLtL3ukqco53mB7S2H5rqKzpJ5RWnJXSoZ5tj46DBBWpY6SZTWeJ_cl1x8Nb8oTJCGpVxIMeEQ458_iGCHNrpSw8NI0FtN-Jj7TwwvENWhOJQu5_8Afi6Wa4I75cBvbUn83Sj1gw=w640-h352-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEgQo5mxSkyT1OX84Ltlw3wtFKwo4OhxW7N3iCaalrl1jkYc48jLtL3ukqco53mB7S2H5rqKzpJ5RWnJXSoZ5tj46DBBWpY6SZTWeJ_cl1x8Nb8oTJCGpVxIMeEQ458_iGCHNrpSw8NI0FtN-Jj7TwwvENWhOJQu5_8Afi6Wa4I75cBvbUn83Sj1gw)

ChatGPT 研究完， Codex 接著自動打開 Gemini 網站，開始根據我的要求，研究怎麼設計遊戲化學習網頁。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEh_8X3fvy2Lp12qQ6sBQ6Nxj15Ej3eFXjw6Yjb7x3oTQL5XiSUa2HbRs7WCf6v_f5iHOGNqajfwR5pQ0oSid-Z9iBnD07lsK1iIAaWONk7Jkxx0ayjB0DMpHHykWuMiI7Rq0aV_Q-RSofrqqUzNSkysGcGlBbRLiBpDIUM5G6LwWTbLDQgIEmzQqQ=w640-h368-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEh_8X3fvy2Lp12qQ6sBQ6Nxj15Ej3eFXjw6Yjb7x3oTQL5XiSUa2HbRs7WCf6v_f5iHOGNqajfwR5pQ0oSid-Z9iBnD07lsK1iIAaWONk7Jkxx0ayjB0DMpHHykWuMiI7Rq0aV_Q-RSofrqqUzNSkysGcGlBbRLiBpDIUM5G6LwWTbLDQgIEmzQqQ)

ChatGPT、Gemini 研究完後，Codex 又準確的根據我的指令要求， AI 再開一個 Gemini Canvas 對話串， 把前面 ChatGPT 研究的練習清單、 Gemini 研究的設計方案，交給 Gemini Canvas 執行設計網頁流程。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEjNPScC4S614H35hC8BgR-vMTWZdNUSVbDpbJBPh8j14HwvpEjax2y77i6CKDlxsidM_uNMo6uJmAFKT5gihWLFM6JBHJXTeNBD7R13AtqgOh0PkU198NhoqMWRkwC2xLUUA1rdayzIRgSjeKYDPzxYpLS3cy0zLDHLnShRvC1n2The7hzFO3GO8w=w640-h396-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEjNPScC4S614H35hC8BgR-vMTWZdNUSVbDpbJBPh8j14HwvpEjax2y77i6CKDlxsidM_uNMo6uJmAFKT5gihWLFM6JBHJXTeNBD7R13AtqgOh0PkU198NhoqMWRkwC2xLUUA1rdayzIRgSjeKYDPzxYpLS3cy0zLDHLnShRvC1n2The7hzFO3GO8w)

> 透過這個流程， **Codex for Chrome 幫我同時操控三種 AI 工作流程，自動接續** ，最後完成我要的練習網頁。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEisWIvJVrSCry_W7KMUh9B2SOtLO4zaIarg2d5exSRcm2agFh1zEAhpX1jSeRNp8nEke3YdSxVmkTDMZM24GiqX9h715W-uefT77-MM7IkjAnYA5HGKt-B2gDnKpGwF02QLuvygiuAebs_k5BbQsqbWcQvSmk_CW9TXaZE9bXRzsyF8KHe1H-RbJQ=w640-h410-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEisWIvJVrSCry_W7KMUh9B2SOtLO4zaIarg2d5exSRcm2agFh1zEAhpX1jSeRNp8nEke3YdSxVmkTDMZM24GiqX9h715W-uefT77-MM7IkjAnYA5HGKt-B2gDnKpGwF02QLuvygiuAebs_k5BbQsqbWcQvSmk_CW9TXaZE9bXRzsyF8KHe1H-RbJQ)

下圖是最後 Gemini Canvas 輸出的結果。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEiPNv6vStAXcA7BjG2QAdiQ4sYOAsMCn_ZwiySBiQN34vEkM1qIzpCLSEOXpVjxGRCRU18vpBX7dj3JIpWV-z6hLfdzOgRSLA3iDTBn65YCBeg6VK8_y5sfZaK4kfWI0sRkaVURc8w4uquoJrNb2u-Xq7VwsLAWP-e-3IpSkYJVn2XbgOLrSm1E2g=w640-h428-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEiPNv6vStAXcA7BjG2QAdiQ4sYOAsMCn_ZwiySBiQN34vEkM1qIzpCLSEOXpVjxGRCRU18vpBX7dj3JIpWV-z6hLfdzOgRSLA3iDTBn65YCBeg6VK8_y5sfZaK4kfWI0sRkaVURc8w4uquoJrNb2u-Xq7VwsLAWP-e-3IpSkYJVn2XbgOLrSm1E2g)

## 讓 Codex for Chrome 把 Evernote 中寫好的文章貼上 Blogger ，並完成編輯體例調整

我自己寫部落格文章時，喜歡先寫在 Evernote 筆記中，完成後才貼上 Blogger 後台去做調整。

所以我下了這樣的指令，挑戰看看 Codex for Chrome 可以自動完成到什麼程度：

@chrome 請幫我把下面文章內容，上架到我的 Blogger 。請一步一步處理：

1.先打開我的 Blooger（ https://www.blogger.com/home ），建立一篇新文章，題目是「Codex for Chrome 自動化工作流程教學，讓 AI 操作 Gemini、 Evernote、 Google 地圖、爬社群貼文」，不要發布。

2.打開我的 Evernote（https://www.evernote.com/client/web），抓取「當 Codex 擁有控制 Chrome 的能力\]這則筆記的內容當作文章內容，但只要抓取「文章草稿：（中標題）」層級下的內容，不要抓最下面的封存資料。

2.使用 Blogger 編輯介面的相應功能，處理下面文章，調整格式、清理不必要程式碼，內容則原封不動，包還其中的連結、圖片、粗體、樣式層級都要保留，但改成網頁閱讀更舒適的版面編排，只要完成編輯，可順利預覽即可。

3.不要發布，讓我確認。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEg29S4uNtKVgpHphyrTC-fj56oVXVe_4J-otMZ3a1XBpScANr1yOfDuM8edjV3st28j6YH0RgTIcW0zGrin4UX824FDDG0Qum_lb1T3LvvfJLkPGypqDoaPwS7ydikDG2weDCpeHM_2vX5uVrIiBsU732IFPt_q9SqV9njxG6NaLjMgsLMUDdaQ4Q=w640-h398-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEg29S4uNtKVgpHphyrTC-fj56oVXVe_4J-otMZ3a1XBpScANr1yOfDuM8edjV3st28j6YH0RgTIcW0zGrin4UX824FDDG0Qum_lb1T3LvvfJLkPGypqDoaPwS7ydikDG2weDCpeHM_2vX5uVrIiBsU732IFPt_q9SqV9njxG6NaLjMgsLMUDdaQ4Q)

結果 Codex 可以順利打開我的 Blogger ，建立新文章，開始編輯。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEid0_ql0APKFE7vKcP50wLjtANpFZy68VtQMSEnsN_cKO5nDLr6MRI17UNWg57cY2CSvD1GTnR95GriGgS9gE9BO27exxn_rt44Cl-Z6JJ5j_eozLv0MQAJyW9NfFrH9pdet3Hrff1-3TahWBiDMsVP2giGlE0nrBVpzKae9doc-bA4mtySnh_YCg=w640-h388-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEid0_ql0APKFE7vKcP50wLjtANpFZy68VtQMSEnsN_cKO5nDLr6MRI17UNWg57cY2CSvD1GTnR95GriGgS9gE9BO27exxn_rt44Cl-Z6JJ5j_eozLv0MQAJyW9NfFrH9pdet3Hrff1-3TahWBiDMsVP2giGlE0nrBVpzKae9doc-bA4mtySnh_YCg)

也能正確打開 Evernote 的對應筆記，準確的複製內容。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEiiSd-NKMyWQAQnRHJPGfg7DZi9cKIvaTLJHdkMLsXjQPjsKLKS_wMYDCFPMtjyGzcYOiX0AJtXRTDp68vrsqwne4RQAaPNlDsrV8WVE8-4OezWS29ESiJ73qisxiyBrov1116ggEh84ye9OJLefyfKn655jiTmvt8u6r4bGPhhrIhsGrPE1UOdcw=w640-h416-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEiiSd-NKMyWQAQnRHJPGfg7DZi9cKIvaTLJHdkMLsXjQPjsKLKS_wMYDCFPMtjyGzcYOiX0AJtXRTDp68vrsqwne4RQAaPNlDsrV8WVE8-4OezWS29ESiJ73qisxiyBrov1116ggEh84ye9OJLefyfKn655jiTmvt8u6r4bGPhhrIhsGrPE1UOdcw)

圖片也能正確貼上。

[![](https://blogger.googleusercontent.com/img/a/AVvXsEiDdSXpz4-al9YTGBmU7BCmTL39-gOppiUBJLZGhvS-_iV96Oz6ai6rV_Pawcpc1nhyTy5sC2Roxqz0W_-PEVODvGdMNZd97rW5UnLzZBKH14GKPF8Hxwudr73qPcI0v4iXLwOfBYmpcpcr2W1HiGWTwMlYcGy8Ctx2QO6Vwjo8NVxbQl11Cp2kUg=w640-h446-rw)](https://blogger.googleusercontent.com/img/a/AVvXsEiDdSXpz4-al9YTGBmU7BCmTL39-gOppiUBJLZGhvS-_iV96Oz6ai6rV_Pawcpc1nhyTy5sC2Roxqz0W_-PEVODvGdMNZd97rW5UnLzZBKH14GKPF8Hxwudr73qPcI0v4iXLwOfBYmpcpcr2W1HiGWTwMlYcGy8Ctx2QO6Vwjo8NVxbQl11Cp2kUg)

透過上面的測試， Codex for Chrome 讓 AI 從「網路資料整理」進一步變成「網站操作代理」。

幫我把原本要開很多分頁、登入很多服務、複製貼上很多資料的流程，變成一句自然語言指令，我只要把平常會在瀏覽器裡做的動作說清楚，Codex for Chrome 就能照著做，驅動 AI 自動化完成。

也推薦你可以試試看。

大家好，我是電腦玩物站長 Esor ，歡迎參考我的系列課程與書籍：

## 2026/1 最新著作上市，歡迎支持：《高效職場生存法圖解》

- **大人學最新 AI 課程： [用 AI 提升工作效率的實戰工作坊](https://shop.darencademy.com/product/view/id/150)**
- 「 [個人數位生產力](https://bit.ly/3FTVMoI) 」線上課程（可使用電腦玩物老讀者折扣碼 ESOR500 ，獲得 500 元折價喔！）。
- **時間管理、筆記系統、AI 工具相關課程：「 [課程介紹連結](https://www.playpcesor.com/p/blog-page_15.html) 」**
- **著作：《 [防彈筆記法](https://www.playpcesor.com/p/blog-page_88.html) 》**
- 訂閱追蹤 podcast 節目：「 [高效人生商學院](https://bit.ly/3MWrd2C) 」（ [Apple podcast 訂閱](https://apple.co/3sBoO5s) 、 [Google Podcast 訂閱](https://bit.ly/38tQ2Ef) ）
- 訂閱「 [電腦玩物電子報](https://www.playpcesor.com/2021/06/blog-post.html) 」，不定期出刊。

我的電子郵件是 [esorhjy@gmail.com](mailto:esorhjy@gmail.com) ，如果你有任何關於筆記術、時間管理、提升工作效率的問題，歡迎寫信跟我討論。

（歡迎社群分享。但全文轉載請來信詢問，禁止修改上述內文，禁止商業使用，並且必須註明來自電腦玩物原創作者 esor huang 異塵行者，及附上原文連結： [不用寫程式的瀏覽器自動化：Codex for Chrome 幫我操作 Google 地圖、Evernote、 Gemini、社群](https://www.playpcesor.com/2026/05/codex-for-chrome-google-evernote-gemini.html) ）