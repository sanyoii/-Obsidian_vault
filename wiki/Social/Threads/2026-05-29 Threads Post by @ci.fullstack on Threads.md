---
source: "https://www.threads.com/@ci.fullstack/post/DY40rF9ncGb?xmt=AQG0T7qX0JkWpz8zV-9XeVQWN_2NArxGNsSDChC_O_spbQ"
author:
  - "@ci.fullstack"
clipped: 2026-05-29
tags:
  - "social/threads"
---
# Threads 貼文

> **出處：** [https://www.threads.com/@ci.fullstack/post/DY40rF9ncGb?xmt=AQG0T7qX0JkWpz8zV-9XeVQWN_2NArxGNsSDChC_O_spbQ](https://www.threads.com/@ci.fullstack/post/DY40rF9ncGb?xmt=AQG0T7qX0JkWpz8zV-9XeVQWN_2NArxGNsSDChC_O_spbQ) | 2026-05-29

---

---

## Comments

> **@ci.fullstack** · [2026-05-28](https://www.threads.com/@ci.fullstack/post/DY40luvnSbP)
> 
> 昨天搬完電腦，今天接副機 Mac mini 但我沒自己裝任何東西
> 
> 我寫了一份 setup guide 給副機的 Claude Code 看 從 whoami 確認帳號短名、brew、Tailscale 登入 到 Syncthing 配對主機、第一次 receive-only 防呆切回雙向 步驟都給好
> 
> 打開副機 Claude Code、把那份文件貼進去 它自己照著跑、自己驗證、自己回報「兩台同步通了」 我只點了一下 Tailscale 的 OAuth（GUI 必要）
> 
> 為什麼要這樣搞而不是丟 iCloud 因為 ~/.claude 裡混了 3 種東西 設定（skills agents）變動慢、適合同步 session 是 live state、要即時但會衝突 daemon cache 那種 runtime 垃圾不該同步 iCloud 沒辦法細排除、Syncthing 的 .stignore 可以
> 
> 唯一規則：同一場 session 不要兩台同時 claude -r jsonl 是 append-only、兩台同時寫會交錯壞
> 
> 完整 setup guide 留言我貼給你 
> 
> ![Photo by Ci | AI 驅動開發 on May 28, 2026. May be a cartoon of text that says '接副機Macmini mini 接副機 Mac 我沒自己裝任何東西 主機寫 主機寫guide guide brew brew→Tailscale Tailscale Syncthing 主機 (Main) m setup guide 副機 （副） setup guide le 2026. 2026.05.28 副機AI自己跑 AI 自己跑 Ci'.](https://instagram.fkhh5-1.fna.fbcdn.net/v/t51.82787-15/709166418_17878104537662852_7229378381159914476_n.webp?_nc_cat=103&ig_cache_key=MzkwNzEwMzEwMzAzOTYxNjMyMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=vtfCk9uxD4oQ7kNvwG55xIP&_nc_oc=Adrn8rUASdtAz5-T_c7R7MKGLpeEhWatfGv2xDZLQ32EQMj76wqK4RSEQkYnYGU1iTQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhh5-1.fna&_nc_gid=VBk4p4b5NoobO6Vcx5h6cw&_nc_ss=7a22e&oh=00_Af61fqX9DIlexDsEKLR_9C0QxNVK8Ivajxqxy20nci9NWw&oe=6A1E3AAE) ![Photo by Ci | AI 驅動開發 on May 28, 2026. May be an image of text that says '~/.claude claude其實混了3種東西 其實混了3 1 設定層 settings.json json skills agents commands rules 變動慢→適合同步 →適合同步 變動慢· 2 Session projects/路經編碼>ksessionid.jsor projects/ <路徑編碼> /<sessionId>. .jsonl 毎秒 每秒append一→要即時同步但會衝突 每秒append→ append 要即時同步但會衝突 3 Runtime 垃圾層 daemon emon*.lock_cache_shell-snapshot shell- shell-snapshots .lock cache 每秒變動→ 秒變動→完全不該同步 2026.05.28 整包同步會踩雷 要用. .stignore Stignore把第3層 把第 整包同步會诉雷，要用.stignore把第3層描供 3 層擋掉 Ci'.](https://instagram.fkhh5-1.fna.fbcdn.net/v/t51.82787-15/708557679_17878104513662852_7442387598817418064_n.webp?_nc_cat=110&ig_cache_key=MzkwNzEwMzEwMzkwMzY0NDQyNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=GdhXehZ97vwQ7kNvwHjRKW_&_nc_oc=Adq9PkOqzDUensZRkZ7rX67bXBs2o95B4p6GLax4M8xv-bYcmYEkFpdF0b--Wuk-dxc&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhh5-1.fna&_nc_gid=VBk4p4b5NoobO6Vcx5h6cw&_nc_ss=7a22e&oh=00_Af6Z0fxUYc9J03g1DdLA-LS0Hr43J0vISfo6I5NJChlNYw&oe=6A1E3F20) ![Photo by Ci | AI 驅動開發 on May 28, 2026. May be an image of text that says '為什麽選 為什麽選Syncthing不選icloud Syncthing 不選 iCloud iCloudDri iCloud Drive x 不能細排除 不能細排除cachelock、token上 cache lock token Dropbox x 同上、 、第三方雲 Git全包 Git 全包 x session 每秒 append commit session每秒appendcommit不作 不停 NFS/ NFS/sshfsmount sshfs mount 要同網段， 移動性差 Syncthing 點對點不經雲、.stignore細排除 點對點不經雲， .stignore 細排除 衝突留.sync-cofic*不會默默損壞 衝突留 sync-conflict- 不會默默損壞 2026.05.28 Card Card3of6 of6 Ci'.](https://instagram.fkhh5-1.fna.fbcdn.net/v/t51.82787-15/708987161_17878104516662852_5527842004994789408_n.webp?_nc_cat=100&ig_cache_key=MzkwNzEwMzEwMzU3NjQ2NDc0MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=I4EYbLx_XR0Q7kNvwEvy0Oy&_nc_oc=AdqgM1uoHpqjtkYpwIShNWhyC-lKfifAexO42XWDiJGoK4yMVm__xlwczm39Colz23M&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhh5-1.fna&_nc_gid=VBk4p4b5NoobO6Vcx5h6cw&_nc_ss=7a22e&oh=00_Af5tH3pd2STceRd7Y6YGEpsBf1KH4MW8m03TxA02E98LoQ&oe=6A1E1DFF) ![Photo by Ci | AI 驅動開發 on May 28, 2026. May be a cartoon of text that says '4/6 跨機同步架構 主機 MacBook ~/.claude .claude Syncthing 副機 Mac Macmini mini Tailscale虚擬内網 Tailscale 處擬内網 settings skills agents projects 跟主機完全一致 .stignore排除清單 .stignore 排除清單 daemon* *.lock lock cache n*.lockctestelsnss he-shell-snapshots,telemet shell shell-snapshots telemetry runtime垃圾不過河 runtime 垃圾不過河 2026.05.28 Ci'.](https://instagram.fkhh5-1.fna.fbcdn.net/v/t51.82787-15/709735801_17878104495662852_2473666536832995851_n.webp?_nc_cat=101&ig_cache_key=MzkwNzEwMzEwMzE0MDI0OTI2OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=lxgOutuR9m8Q7kNvwGpVO7F&_nc_oc=AdppXb5DsjSN8QoFf7mIGO65M3VPnJ6c1zxAnIIGMoH2Hb5SGPE1PUjMDy-f5FC-8II&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhh5-1.fna&_nc_gid=VBk4p4b5NoobO6Vcx5h6cw&_nc_ss=7a22e&oh=00_Af6SJEZPRMFc3e6nyX8ath2UyDXMHKGMg5blVZcAZZdhKg&oe=6A1E3BF0) ![Photo by Ci | AI 驅動開發 on May 28, 2026. May be a graphic of ‎crossword puzzle and ‎text that says '‎唯一規則 ：同一場 唯一規則：同一場session session 不要兩台同時 claude -r {"text": "ልጣን {"text": ".ወች. 000 {"text": "1ወ} ["": "2"ጉድ "2"} 000 data.jsonl 。９ {"text"'”A1'} "A1"} {"text": ["."청 هاْ؟ {"A" (יימ" data.jsonl jsonl data. jsonl 是 append-only 兩台同時寫 兩台同時寫内容會交錯壞掉 内容會交錯壞掉 2026. 2026.05.28 做法： 離開一台前 離開一台前Ctrl+D退出 Ctrl+D 前Ctrl+D退 退出 等 等Syncthing顯示uptoDate to Date Syncthing 顯示 再到另一台 再到另一台claude-r claude‎'‎‎.](https://instagram.fkhh5-1.fna.fbcdn.net/v/t51.82787-15/709005336_17878104525662852_8730288526207956862_n.webp?_nc_cat=109&ig_cache_key=MzkwNzEwMzEwMjk3MjQ4NDMzNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=GPzkWIkC1lsQ7kNvwEJdCYd&_nc_oc=AdoEpXM7WNxax6KLfznw084GRVNJajb4WFeEdrIab3ESnUr_LJ7vF2baRpJJiWlIUx4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhh5-1.fna&_nc_gid=VBk4p4b5NoobO6Vcx5h6cw&_nc_ss=7a22e&oh=00_Af4HtZBGMopQ8yNh9LJSNydAn9nW4pNeeiG6el_dT83DjA&oe=6A1E4457) ![Photo by Ci | AI 驅動開發 on May 28, 2026. May be an image of text that says '下次換機， 換機，只剩2件事要做 件事要做 中 用同樣的使用者短名 不然要改54萬處路徑 1 >> brew brewinstallsyncthing syncthing instalı 其他都會自己長回來 2026.05.28 備份要能還原才算數 還原要能維持才算完整 Ci'.](https://instagram.fkhh5-1.fna.fbcdn.net/v/t51.82787-15/708168593_17878104510662852_4485754955055639050_n.webp?_nc_cat=109&ig_cache_key=MzkwNzEwMzEwMzI4Mjg5MjgxNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=wDloq0YdjesQ7kNvwFCz8yI&_nc_oc=Adq7a-YxGcGHGq7Pf5nb6YEzqVvWMH7aqTshyC5YofaENAhosU8H2uKcD-i-FWSwG8Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhh5-1.fna&_nc_gid=VBk4p4b5NoobO6Vcx5h6cw&_nc_ss=7a22e&oh=00_Af46uEePFE5qJ8WB7wZqejS9dosknXPppvFRdUBsx3-jeA&oe=6A1E2D2B)
> 
> > **@ci.fullstack**
> > 
> > 18分鐘
> > 
> > [https://www.threads.com/@ci.fullstack/post/DY40luvnSbP](https://www.threads.com/@ci.fullstack/post/DY40luvnSbP)
> 
> > **@ci.fullstack** · [2026-05-28](https://www.threads.com/@ci.fullstack/post/DY40rF9ncGb)
> > 
> > ~/.claude 三層拆解，每層適合的同步方式不一樣
> > 
> > 1\. 設定層 settings.json、[CLAUDE.md](http://claude.md/)、skills、agents、commands、rules 變動頻率：偶爾 適合：Syncthing 同步、Git 也行（要審變動）
> > 
> > 2\. Session 層 projects/<路徑編碼>/<sessionId>.jsonl 變動頻率：對話時每秒 append 適合：檔案級即時同步（Syncthing 剛好） 注意：jsonl append-only、同 session 不能雙台同時寫
> > 
> > 3\. Runtime 垃圾層 daemon\*、\*.lock、cache、shell-snapshots、telemetry 變動頻率：每秒 適合：完全不同步、會把同步工具跑爆
> > 
> > 混在一起整包同步就會踩雷 要在 .stignore 把第 3 層全擋掉 
> > 
> > 尚無回覆
> > 
> > 回覆ci.fullstack……
> > 
> > > **@ci.fullstack**
> > > 
> > > 17分鐘
> > > 
> > > [https://www.threads.com/@ci.fullstack/post/DY40rF9ncGb](https://www.threads.com/@ci.fullstack/post/DY40rF9ncGb)
