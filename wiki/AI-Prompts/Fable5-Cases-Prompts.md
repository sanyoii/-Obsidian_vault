# Fable 5 案例庫 Prompts

> 來源：https://eugeneintw.github.io/fable5-cases/ —— 從 X 書籤整理的 Claude Fable 5 實測案例，可複製 prompt 自己重現。
> 共 42 個案例 · 17 個**原文 prompt**（推文/文章原始指令）· 25 個**重建 prompt**（依案例描述補寫的可執行版本，效果可能與原案例有落差）

---

## 遊戲（14）

### 1. AI Lab 版大富翁（多人連線） — 🟢 原文 prompt

- **作者**：@venturetwins (Justine Moore) · ❤️ 1,591 · [原文連結](https://x.com/venturetwins/status/2064504760951304346)
- **說明**：地產全換成 AI 實驗室/新創；完整規則、金錢系統、回合制，還有多人共享代碼。壟斷後可以蓋機架升級資料中心。

**Prompt：**
```
Recreate Monopoly, but make each of the properties an AI lab or startup. Implement everything — game rules, money system, turns, and share codes for multiplayer games. Once you have a monopoly, you can build racks and eventually a data center.
```

### 2. 完整 Pokémon 一代複刻（一發 8,000 行） — 🟢 原文 prompt

- **作者**：@ChrissGPT · ❤️ 2,211 · [原文連結](https://x.com/ChrissGPT/status/2064460197423153379)
- **說明**：Claude 5 Fable (extra high) 推理 1 小時、8,000 行 one shot：151 隻寶可夢的真實 sprites、叫聲、能力值、招式表、進化鏈、捕捉率全齊。作者自註約 95% 完成度（文字偶有破綻）；留言區指出素材應是模型自己上網抓的現成資源。

**Prompt：**
```
Make a Pokémon clone
```

### 3. 瀏覽器版 Minecraft（20 分鐘 one shot） — 🟢 原文 prompt

- **作者**：@ChrissGPT · ❤️ 3,993 · [原文連結](https://x.com/ChrissGPT/status/2064441716908703780)
- **說明**：Claude 5 Fable (high)、網頁版聊天介面、20 分鐘：多生態系、日夜循環、礦脈、洞穴全齊。留言有人質疑「訓練資料裡本來就有一堆 Minecraft clone」，作者反問：那為什麼 GPT-5.5 和 Gemini 做不到這個速度和規模。

**Prompt：**
```
Make a Minecraft clone
```

### 4. 擲硬幣版 Balatro — 🟢 原文 prompt

- **作者**：@emollick（Substack 原文） · ❤️ 3,089 · [原文連結](https://www.oneusefulthing.org/p/what-it-feels-like-to-work-with-mythos)
- **說明**：Mollick 實測的小遊戲之一，「相當好玩」。所有美術都是純數學生成（Claude 不能生圖）。

**Prompt：**
```
Balatro, but for the game of coin flips
```

### 5. 有自我意識的貪吃蛇 — 🟡 重建 prompt

- **作者**：@emollick（Substack 原文） · ❤️ 3,089 · [原文連結](https://www.oneusefulthing.org/p/what-it-feels-like-to-work-with-mythos)
- **說明**：蛇知道自己在遊戲裡，會吐槽玩家、打破第四面牆，越玩越瘋。

**Prompt：**
```
Build a snake game where the snake is self-aware. It comments on the gameplay, complains about my skills, breaks the fourth wall, and increasingly crazy things happen as the game progresses (UI glitches, rule changes, the snake negotiating with you). Single HTML file, escalate the weirdness with score.
```

### 6. 一句話複刻 Skyrim — 🟢 原文 prompt

- **作者**：@spoobsV1 · ❤️ 4,916 · [原文連結](https://x.com/spoobsV1/status/2064497402363465850)
- **說明**：2011 年度遊戲《上古卷軸 V》one prompt 複刻——而且 prompt 真的只有兩個字。發布日最病毒式的案例之一。

**Prompt：**
```
make skyrim
```

### 7. Subway Surfers 複刻（Three.js one shot） — 🟡 重建 prompt

- **作者**：@_MaxBlade · ❤️ 301 · [原文連結](https://x.com/_MaxBlade/status/2064399407231967545)
- **說明**：「目前看過 one shot 最強的 3JS 遊戲」——跑酷、收集、障礙閃避一次到位。

**Prompt：**
```
Make Subway Surfers in Three.js, single HTML file: endless runner on 3 lanes, swipe/arrow controls (jump, roll, lane change), trains and barriers to dodge, coin trails, increasing speed, a chasing guard camera intro, score + coins HUD, game over and restart. Stylized low-poly look generated entirely in code.
```

### 8. GTA 6 風格開放世界（180 萬 tokens） — 🟢 原文 prompt

- **作者**：@karankendre · ❤️ 241 · [原文連結](https://x.com/karankendre/status/2064501092642419023)
- **說明**：Fable 5 High 燒 1.8M tokens 生成的開放世界遊戲——駕車、街區、NPC。對比其他模型「算是做得相當好」。

**Prompt：**
```
build me a "GTA 6 clone game"
```

### 9. Webcam 手勢切水果遊戲（Fruit Ninja 式） — 🟡 重建 prompt

- **作者**：@higgsfield_ai · ❤️ 341 · [原文連結](https://x.com/higgsfield_ai/status/2064872661365494180)
- **說明**：單一 prompt + Higgsfield MCP：鏡頭手部追蹤、揮砍軌跡、水果物理、連擊計分一次到位。

**Prompt：**
```
Build a webcam-controlled fruit slicing game (Fruit Ninja style) in a single HTML file: MediaPipe hand tracking turns my index finger into the blade, slash trail effect, fruits tossed with physics arcs, slice-in-half animations, combo scoring, bombs to avoid. Generate fruit art via [你的圖像 MCP]（或改用 SVG 程序化生成）. Playable immediately in the browser.
```

### 10. 類 Hades 動作 Roguelike ARPG（從空資料夾） — 🟡 重建 prompt

- **作者**：@akiraxtwo · ❤️ 258 · [原文連結](https://x.com/akiraxtwo/status/2064780732082651402)
- **說明**：Three.js + Rapier 物理：俯視角、波次刷怪、三段連擊、翻滾無敵幀。最猛的是 AI 自己決定用 KayKit CC0 素材、寫下載腳本、建 asset pipeline、量測 tile 尺寸動態拼地城。

**Prompt：**
```
從空資料夾開始，用 Three.js + Rapier 開發一款瀏覽器動作 Roguelike ARPG：類 Hades 俯視角、房間制地城、波次刷怪、三段連擊、翻滾帶無敵幀、擊殺掉落強化選擇。美術素材我不提供——自己找合適的 CC0 資源（如 KayKit），寫下載腳本建立 asset pipeline，量測 tile 尺寸後動態拼接地城。要可以直接 npm run dev 跑起來玩。
```

### 11. One shot 恐怖遊戲 — 🟡 重建 prompt

- **作者**：@bridgemindai · ❤️ 217 · [原文連結](https://x.com/bridgemindai/status/2064702524146290741)
- **說明**：作者同時回報：一發修好 GPT-5.5 / Opus 4.7 / 4.8 卡了兩個月的 bug，並因此退訂 $200 的 ChatGPT Pro。

**Prompt：**
```
Build a full first-person horror game in the browser, single HTML file with Three.js: dark facility with flickering lights and fog, flashlight with limited battery, an entity that stalks the player using simple sound-based AI, hiding spots, key-and-door progression, ambient dread audio synthesized with the Web Audio API, jump-scare triggers, win/lose endings. Atmosphere over gore.
```

### 12. 一句話複刻《GTA: Vice City》（可線上試玩） — 🟢 原文 prompt

- **作者**：@ezshine（大帥老猿） · ❤️ 170 · [原文連結](https://x.com/ezshine/status/2064838956550918319)
- **說明**：中文 prompt 一句話，瀏覽器版罪惡都市直接能玩。與 Skyrim 案例同款的「遊戲名即 prompt」流派。

**Prompt：**
```
制作浏览器可运行的《GTA：Vice City》
```

### 13. 競選洛杉磯市長的開放世界 RPG — 🟢 原文 prompt

- **作者**：@TBC_on_X · ❤️ 1,327 · [原文連結](https://x.com/TBC_on_X/status/2064787472731816411)
- **說明**：「擬真開放世界 RPG，主題是競選 LA 市長」——作者評語：支線任務瘋得令人上癮。展示 Fable 5 對非典型遊戲題材的詮釋力。

**Prompt：**
```
make a realistic open-world RPG about running for mayor of LA
```

### 14. 3D Cuphead 復刻（開場過場＋教學＋兩關卡） — 🟡 重建 prompt

- **作者**：@Gc_qube (pozitiv4ik，轉述) · ❤️ 165 · [原文連結](https://x.com/Gc_qube/status/2065176695657628154)
- **說明**：用一個兩行 prompt 生成 3D 版《Cuphead》：含開場過場動畫、教學關、島嶼場景與兩個關卡，3D 視覺亮眼且作者稱「實際好玩」。誠實保留：由 @pozitiv4ik 轉述展示，可能非原作者，未附原始 prompt 全文。

**Prompt：**
```
Build a playable 3D clone of Cuphead in a single project. Include an opening cutscene, a tutorial level, an overworld island to navigate, and two playable platformer/boss levels. Use a hand-drawn 1930s rubber-hose cartoon art style. Run-and-gun controls: move, jump, dash and shoot. Procedurally lay out the levels and make it actually fun to play.
```

---

## 模擬視覺化（8）

### 15. 太陽系模擬（NASA 螢幕保護程式等級） — 🟢 原文 prompt

- **作者**：@ydamitcodes · ❤️ 265 · [原文連結](https://x.com/ydamitcodes/status/2064422516727435737)
- **說明**：一個 prompt 出單一 HTML：八大行星真實軌道力學、土星環、衛星、小行星帶、程序化貼圖。

**Prompt：**
```
build me a solar system simulation
```

### 16. 等時圈旅行時間地圖（1881 復刻版） — 🟢 原文 prompt

- **作者**：@emollick（Substack 原文） · ❤️ 3,089 · [原文連結](https://www.oneusefulthing.org/p/what-it-feels-like-to-work-with-mythos)
- **說明**：Mollick 的招牌測試：自主派子代理查 2,200+ 航班與鐵路時刻，邊研究邊寫碼邊驗證，數小時交付互動地圖。

**Prompt：**
```
i want you to build a fully researched and beautiful isochronic map that lets me pick various cities and see real isochronic lines based on real data. I want the design to be unique. You should take into account airports (and travel time to and from airports) trains, walking, driving. The data does not need to be live but should be real based on your research and data. You can start with a few cities but more general is better, this should be an entirely new project.
```

### 17. 擬真 AI 村莊模擬（跨模型對比實測） — 🟡 重建 prompt

- **作者**：@simworld_ai (SimWorld) · ❤️ 179 · [原文連結](https://x.com/simworld_ai/status/2064463042369507608)
- **說明**：SimWorld 用同一 prompt 測多個模型，Fable 5「視覺上最強」：村莊更密、地形與建築擺放更好、生活痕跡細節到位。作者誠實註記：特寫下仍有建築懸空等破綻。

**Prompt：**
```
Build a realistic living village simulation in a single HTML file. Requirements: dense natural terrain, organic building placement (no grid), villagers with daily routines (work, market, rest), lived-in details (smoke, laundry, carts, animals). Procedural generation only — no external assets. Day/night cycle. Make it feel inhabited, not generated.
```

### 18. 寶塚記念賽馬模擬（自動操作資料庫軟體） — 🟢 原文 prompt

- **作者**：@nobita1964 · ❤️ 975 · [原文連結](https://x.com/nobita1964/status/2064595297230278665)
- **說明**：讓 Fable 5 自己操作日本賽馬資料庫軟體 TARGET 做數據分析，再產出比賽模擬。亮點：模型自己學會用陌生的專業軟體。

**Prompt：**
```
これはTARGETと言って競馬データベースソフトです。このソフトを操作して今週末に阪神競馬場で行われる宝塚記念の分析をしてください

（中譯：這是名為 TARGET 的賽馬資料庫軟體。請操作這個軟體，分析本週末在阪神競馬場舉行的寶塚記念。）
```

### 19. 瑞士槓桿擒縱機械錶模擬（視覺自我驗證迴圈） — 🟢 原文 prompt

- **作者**：@quanghuynt14 · ❤️ 4,046 · [原文連結](https://x.com/quanghuynt14/status/2064509430650065278)
- **說明**：「製錶師基準測試」：真實齒輪比（18,000 bph）、運作中的擒縱機構、會呼吸的游絲，指針走真實時間。關鍵在 prompt：要求模型蓋一套相機系統、用視覺能力逐零件檢查、迴圈到 100% 滿意——Boris Cherny 本人在留言區回了「Wow, that's cool」。

**Prompt：**
```
/goal Build the most realistic mechanical watch movement in Three.js — visible gears, escapement, balance wheel, all animated and mechanically coherent (gear ratios must actually make the hands tell real time). Build a camera system to inspect it from every angle and zoom level, use your vision capabilities to verify each part, and loop until you are 100% satisfied. Save a screenshot of every iteration to ./iterations/ so I can make a time-lapse.
```

### 20. 一張照片 → 完整 3D 物理模擬（MIT 教授實測） — 🟡 重建 prompt

- **作者**：@ProfBuehlerMIT（MIT 教授） · ❤️ 250 · [原文連結](https://x.com/ProfBuehlerMIT/status/2064754615468638351)
- **說明**：給一張階層網格環面的 2D 照片，one shot 推斷出完整 3D 拓撲：1,400 節點、4,400 纖維的質點-彈簧物理，可抓取/壓縮/扭轉，還加了應變音效化讓你「聽」結構震動。

**Prompt：**
```
(附上一張複雜 3D 結構的照片，例如階層網格環面)

Infer the complete 3D topology of this structure from the photo, then build a full interactive simulation: mass-spring physics for every node and fiber, mouse interactions to grab / compress / twist it, plus strain-based sonification so I can hear the structure vibrate under deformation. Single HTML file, Three.js.
```

### 21. 黑洞誕生過程動畫頁（含字幕解說） — 🟡 重建 prompt

- **作者**：@xiaohu（小互） · ❤️ 150 · [原文連結](https://x.com/xiaohu/status/2064908115469013360)
- **說明**：小互的兩段式做法：先一句話出初版 → 效果不夠好，改用「目標式」描述（炫酷動畫過程 + 文字字幕解說 + 配音）重做。誠實註記：本地 TTS 配音效果不佳。

**Prompt：**
```
做一個黑洞誕生過程的動畫頁面。我的目標：炫酷的全程動畫（恆星塌縮 → 超新星 → 事件視界形成 → 吸積盤），每個階段配上文字字幕解說，單一 HTML 檔、WebGL 渲染。先給我分鏡規劃再實作，動畫要有電影感的運鏡。
```

### 22. 瑞士機械錶機芯模擬（Three.js 槓桿擒縱機構） — 🟡 重建 prompt

- **作者**：@Polymarket（新聞帳號轉述） · ❤️ 5,766 · [原文連結](https://x.com/Polymarket/status/2064724427313398265)
- **說明**：一個 prompt 在 Three.js 裡生出機械結構正確的瑞士槓桿擒縱機芯模擬：擒縱輪、擺輪游絲、叉瓦依真實節律運作，全程序化生成、無手工建模。誠實保留：由 Polymarket、0xMarioNawfal 等新聞帳號轉述，原作者與原始 prompt 不明、無法直接驗證。

**Prompt：**
```
Build a single self-contained HTML file using Three.js that simulates a mechanically accurate Swiss lever escapement watch movement. Procedurally generate (no manual modeling) the mainspring barrel, gear train, balance wheel with hairspring, pallet fork and escape wheel. The escapement should tick at a realistic beat rate and visibly transfer impulse to the balance wheel each oscillation. Render in 3D with metallic materials and proper lighting, add OrbitControls so I can inspect the movement from any angle, and a slider to scrub the simulation speed.
```

---

## 文件簡報（3）

### 23. McKinsey 等級報告複製 — 🟢 原文 prompt

- **作者**：@rileybrown / @VaibhavSisinty · ❤️ 1,729 · [原文連結](https://x.com/rileybrown/status/2064407515752722521)
- **說明**：上傳一份 McKinsey 報告 → 要求同等品質的新文件。Riley Brown 與 Vaibhav 都實測成功，是發布日最瘋傳的案例。

**Prompt：**
```
(附上一份 McKinsey 報告 PDF)

Create a brand-new document of the same quality on [你的主題]: same analytical depth, same chart quality, same layout polish and visual language. Research the topic properly before writing. Deliver as a polished HTML report I can print to PDF.
```

### 24. 一發出設計級投影片 — 🟡 重建 prompt

- **作者**：@taiyo_ai_gakuse · ❤️ 1,409 · [原文連結](https://x.com/taiyo_ai_gakuse/status/2064514216628011192)
- **說明**：搭配 UI skill 一次生成「不像 AI 做的」投影片，含 HTML、Design.md、PPTX 三種產出。

**Prompt：**
```
用 [你安裝的 slides/UI skill] 幫我做一份投影片：主題「[主題]」、10-12 頁、目標聽眾 [對象]。要求：先寫 Design.md 定義視覺系統（配色、字體、版式網格），再產出 HTML 投影片與 PPTX。資訊密度高但每頁只講一件事，圖表用 SVG 畫，不要用通用模板感的排版。
```

### 25. 論文解說投影片（vs ChatGPT-5.5 Pro 對比） — 🟡 重建 prompt

- **作者**：@_daichikonno（紺野大地） · ❤️ 338 · [原文連結](https://x.com/_daichikonno/status/2064568579518050447)
- **說明**：神經科學研究者用同一篇論文讓 Fable 5 和 GPT-5.5 Pro 各做解說投影片，結論：兩者都已達「幾乎無可挑剔」水準。

**Prompt：**
```
(附上論文 PDF)

請把這篇論文做成解說投影片（10-12 頁，HTML）：目標聽眾是相鄰領域的研究者。要求：研究背景與 gap → 方法（圖解實驗設計）→ 主要結果（重繪關鍵圖表為 SVG，不要截圖）→ 限制與未來方向。每頁一個重點，學術但不枯燥，配色克制。
```

---

## 創意藝術（8）

### 26. 作曲 + 鋼琴視覺化播放器 — 🟡 重建 prompt

- **作者**：@scaling01 (Lisan al Gaib) · ❤️ 4,135 · [原文連結](https://x.com/scaling01/status/2064425972217106736)
- **說明**：Fable 5 自己作了一段原創旋律（作者：「我超愛這段」），再順手蓋了一個鋼琴視覺化工具來演奏它。

**Prompt：**
```
Compose an original melody (write it as actual note data, not a description), then build an HTML piano visualizer that performs it: animated falling notes, highlighted keys, play/pause/tempo controls. All sound synthesized with the Web Audio API. Single file. Make the composition genuinely musical — verse, build-up, resolution.
```

### 27. SVG 鵜鶘騎腳踏車（版本對比基準） — 🟡 重建 prompt

- **作者**：@AlchainHust（花叔） · ❤️ 78 · [原文連結](https://x.com/AlchainHust/status/2064524297469653459)
- **說明**：花叔用同一題對比 Opus 4.8 vs Fable 5：「Fable 5 的鵜鶘看起來是個合格的美團騎手了」。適合當你自己的模型測試題。

**Prompt：**
```
Generate an SVG animation of a pelican riding a bicycle. Anatomically plausible pelican, correct bicycle geometry, smooth looping pedaling motion with leg articulation, slight body bounce, background parallax. Pure SVG + CSS animation, no JS, single file.
```

### 28. 每個字都 S 開頭的 10 頁押韻史詩 — 🟢 原文 prompt

- **作者**：@emollick（Substack 原文） · ❤️ 3,089 · [原文連結](https://www.oneusefulthing.org/p/what-it-feels-like-to-work-with-mythos)
- **說明**：關於剪頭髮的史詩長詩，每一個單字都以字母 s 開頭——測試硬約束下的長篇創作。

**Prompt：**
```
Write a 10-page epic rhyming poem about a haircut where every word starts with the letter s.
```

### 29. 雙手手勢操控 3D 故障方塊（TouchDesigner） — 🟢 原文 prompt

- **作者**：@CoinSh0t · ❤️ 682 · [原文連結](https://x.com/CoinSh0t/status/2064384972857737505)
- **說明**：webcam + MediaPipe 手部追蹤 + TouchDesigner，Claude 寫橋接腳本。原推宣稱有人靠這套接活動表演。完整六步驟教學在原推。

**Prompt：**
```
Write me a TouchDesigner Python script that creates a 3D glitchy cube controlled by both hands using the MediaPipe plugin.

Controls:
- Midpoint between both hands moves the cube around the screen
- Angle between the hands rotates the cube on X and Y axes
- Distance between both hands scales the cube up or down
- Left-hand pinch increases the noise distortion
- Right-hand pinch cycles through colors
- Fast movement triggers a glitch flash
- Both fists freeze the frame for a screenshot

Output one Python DAT script with comments so I can tune each value.
```

### 30. 32 頁推理漫畫（Fable 5 編劇 + Luma 作畫） — 🟡 重建 prompt

- **作者**：@yachimat_manga · ❤️ 257 · [原文連結](https://x.com/yachimat_manga/status/2064543142884581588)
- **說明**：Fable 5 一發完成故事、分鏡與對白，Luma Uni-1 一發作畫，組成完整 32 頁推理漫畫。作者評語：「有點阿西莫夫味」。

**Prompt：**
```
寫一部 32 頁的本格推理短篇漫畫的完整製作稿：
1. 故事大綱（密室或敘述性詭計，伏筆公平、結尾翻轉）
2. 逐頁分鏡腳本：每頁的格數、構圖描述、鏡頭角度
3. 每格的對白與旁白（完稿文字）
4. 每格一段給圖像模型的英文作畫 prompt（統一畫風描述、角色外觀一致性鎖定）
輸出成可直接逐格餵給圖像生成模型的格式。
```

### 31. 照設計指南量產低多邊形 3D 模型 — 🟡 重建 prompt

- **作者**：@fe_yukichi · ❤️ 328 · [原文連結](https://x.com/fe_yukichi/status/2064909426394611922)
- **說明**：前一天先讓 AI 寫好遊戲美術設計指南，隔天依指南量產 low-poly 3D 模型——初稿可愛到「幾乎零修改」。風格一致性是亮點。

**Prompt：**
```
(附上你的美術設計指南，或先讓 AI 產一份：配色票、輪廓規則、比例、面數預算)

依照這份設計指南，量產 8 個低多邊形 3D 模型（樹、岩石、小屋、箱子、燈柱、柵欄、水井、推車）：每個都是程序化生成的 Three.js BufferGeometry（不用外部模型檔），嚴格遵守指南的配色與面數預算，輸出單一 HTML 展示頁可旋轉預覽每個模型。風格必須整組一致。
```

### 32. 單一 prompt 產出完整航海家號紀錄片（MP4） — 🟡 重建 prompt

- **作者**：@higgsfield · ❤️ 180 · [原文連結](https://x.com/higgsfield/status/2064858973216580002)
- **說明**：自己上網找 NASA/JPL 公有領域素材、剪成 16:9、規劃 8 個視覺節拍、缺口用 AI 生成補（有標注）、寫旁白 + TTS 配音、輸出成品 MP4——全自動。

**Prompt：**
```
Make a complete short documentary (3-5 min, 16:9 MP4) about the Voyager missions:
1. Source public-domain NASA/JPL footage and stills from the web, clip into 16:9 segments
2. Plan 8 visual beats with a narrative arc (launch → grand tour → golden record → interstellar)
3. Fill footage gaps with AI-generated shots, clearly labeled as such
4. Write the narration script, synthesize with TTS
5. Assemble and export the final MP4 with ffmpeg
Do every step yourself, end to end.
```

### 33. 墨水流體交融的視覺演出（可線上玩） — 🟡 重建 prompt

- **作者**：@hayashimon1（ハヤシモン） · ❤️ 12,491 · [原文連結](https://x.com/hayashimon1/status/2064658158698782873)
- **說明**：作者故意出難題測 Fable 5 的表現力極限：「墨水像流體一樣溶合」的互動演出——結果「就這樣成形了」。12.4k 讚，附可遊玩連結，設計表現力的代表案例。

**Prompt：**
```
Build an interactive web page where colored inks dissolve and blend into each other like real fluids: mouse drag injects ink, colors swirl and diffuse with fluid-dynamics-like motion (Navier-Stokes style or convincing approximation), elegant minimal UI, runs smoothly at 60fps in a single HTML file with WebGL. Aim for an art-installation level of polish.
```

---

## 工程研究（9）

### 34. 從零設計人形機器人 — 🟡 重建 prompt

- **作者**：@earthtojake · ❤️ 2,252 · [原文連結](https://x.com/earthtojake/status/2064535702138990855)
- **說明**：2 小時、140 萬 tokens：機構設計、致動器選型、運動學、SVG 圖面、BOM 表全套。

**Prompt：**
```
Design a humanoid robot from scratch. Deliverables: full mechanical specification (DOF budget, joint torque estimates), actuator and sensor selection with real part numbers, kinematic model, SVG technical diagrams (front/side/joint detail), bill of materials with cost estimate, and the control software architecture. Work autonomously — iterate until the design is internally consistent, and document every engineering tradeoff you make.
```

### 35. Concord：人類/AI 評分校準軟體（9.5 小時） — 🟡 重建 prompt

- **作者**：@emollick（Substack 原文） · ❤️ 3,089 · [原文連結](https://www.oneusefulthing.org/p/what-it-feels-like-to-work-with-mythos)
- **說明**：Mollick 最大型的案例：先讓 Fable 自己寫 19 頁設計文件再執行，產出研究者「需要多年但沒人做」的工具。

**Prompt：**
```
I do research where humans produce messy answers that need proper categorization, and calibrating AI raters against human raters is difficult and expensive. Solve this problem: first write a thorough (~19 page) design document for a software tool that can ingest multiple datasets, calibrate human and AI responses against each other, and run the downstream statistical analysis. Then implement the full design. Work autonomously and verify your work with tests as you go.
```

### 36. 一個 prompt 做三個 App — 🟡 重建 prompt

- **作者**：@MarcinAI81 · ❤️ 672 · [原文連結](https://x.com/MarcinAI81/status/2064551188243316926)
- **說明**：單一 prompt 同時要求：Jarvis 風格儀表板、Apple Fitness 複刻、像素級複製自己的飯店網站——三個一次交付。

**Prompt：**
```
Build me 3 separate apps in one go, each as its own single HTML file:
1. A Jarvis-style AI dashboard (dark sci-fi HUD, animated widgets, voice-wave visualizer, system stats)
2. A pixel-faithful clone of the Apple Fitness app (rings, workout cards, awards)
3. A pixel-perfect clone of this hotel website: [貼上網址或截圖]
Match the original designs as closely as possible. Finish all three before stopping.
```

### 37. LP 設計圖 → Next.js 95% 像素還原（/goal 迴圈） — 🟢 原文 prompt

- **作者**：@yoshio_nocode · ❤️ 501 · [原文連結](https://x.com/yoshio_nocode/status/2064617130046452023)
- **說明**：把 Image2 生成的 LP 設計圖餵給 Claude Code，用 /goal + Playwright 截圖比對迴圈自動逼近 95% 還原度。原文 prompt 是完整的 loop 設計範本。

**Prompt：**
```
/goal 添付画像のLPをNext.jsで実装。再現度95%以上になるまで。
画像以外の手段だと再現が難しそうな箇所は適切に素材をimage_genで画像生成しながら作成して。

- アイコンや画像はなるべく元の画像と一致させること。
  元画像から該当部分をクロップして参考画像としてimage_genに渡しつつ生成する
  （codex exec は -i で参照画像を渡し、プロンプトは標準入力で渡す）
- レスポンシブ対応すること。375〜1440pxの各幅で検証し、
  横スクロールがないだけでなく、要素の重なり・見切れもないこと
  （固定幅カードは w-full max-w-[Npx]、絶対配置レイアウトは広い幅のみで発動）
- Playwrightでスクショ→元画像と比較→修正のループを回し、
  npm run build が通ったら完了
```

### 38. One shot 生成完整 Web 版作業系統 — 🟡 重建 prompt

- **作者**：@intheworldofai · ❤️ 405 · [原文連結](https://x.com/intheworldofai/status/2064421915347812672)
- **說明**：單一 HTML：macOS 選單列+Dock、可拖拉視窗、檔案總管、終端機、合成音效播放器，桌面裡還內嵌可玩的 Minecraft。同作者另有 Windows 版（含 Edge、接龍、Copilot）。

**Prompt：**
```
Build a complete macOS-style web operating system in ONE single HTML file (embedded CSS + JS, no external assets):
- macOS menu bar and dock with magnification
- Draggable, resizable, minimizable app windows
- Functional file explorer with a fake filesystem
- Working terminal (basic commands) and browser mockup
- SVG desktop icons, notification center, settings app with themes, boot screen
- A music player with REAL sound synthesis via Web Audio API (no audio files)
- A playable Minecraft-style voxel game that opens inside a desktop window
Make everything actually functional, not mockups.
```

### 39. 4 個月的 fine-tuning 工作 → 3 小時變成可販售的 pipeline — 🟡 重建 prompt

- **作者**：@cjzafir · ❤️ 477 · [原文連結](https://x.com/cjzafir/status/2064732056350073246)
- **說明**：用 /goal 跑 3 小時：TUI + HTML 儀表板 + 資料集檢視器 + 39 個 skills、8,700 行代碼、235 個測試，一發 98% 完成度。把「個人研究成果產品化」的代表案例。

**Prompt：**
```
/goal 把這個 repo 裡我現有的 fine-tuning 工作，改造成可以賣給別人用的端到端 pipeline。直到：7 個階段全部可獨立執行與串接、有 TUI 操作介面、有 HTML 儀表板與資料集檢視器、常用操作封裝成 skills、測試覆蓋核心流程且全部通過。過程中自己跑測試驗證，不要問我，做完再回報。
```

### 40. 在 Autodesk Fusion 裡設計一架波音 747 — 🟡 重建 prompt

- **作者**：@VedaAI00（轉述） · ❤️ 137 · [原文連結](https://x.com/VedaAI00/status/2064861614713835629)
- **說明**：一個 prompt 讓 Fable 5 直接操作工業 CAD 軟體完成整架 747 建模——「大模型生吞工業軟體」的代表案例（原案例來自 Adam Goodyer）。

**Prompt：**
```
透過 Autodesk Fusion 的 MCP/API，從零設計一架波音 747：機身分段放樣、機翼（正確後掠角與上反角）、四具吊掛引擎、起落架、尾翼，尺寸依公開規格參數化。每個主要部件獨立 component，最後組裝成總成並輸出三視圖截圖讓我驗收。
```

### 41. 「Fable 5 解決了 CAD」：10 分鐘建出可動 V8 引擎 — 🟢 原文 prompt

- **作者**：@aaronli (Aaron Li) · ❤️ 2,719 · [原文連結](https://x.com/aaronli/status/2064876123109089742)
- **說明**：要求做一個 V8 引擎模型，10 分鐘內回來一個完整可運作的模型——曲軸、活塞連動全套。與波音 747 案例同屬 CAD 流派，這則更病毒（2.7k 讚）。

**Prompt：**
```
make a model of a V8 engine
```

### 42. 被裁量化交易員 48 小時重建整套算法（⚠️ 故事型） — 🟡 重建 prompt

- **作者**：@FinanceYF5 (AI Will) · ❤️ 497 · [原文連結](https://x.com/FinanceYF5/status/2064879823424725466)
- **說明**：「Citadel 裁掉的頂級量化用 Fable 5 在 48 小時重建算法、反手做空獲利 43 萬美元」——典型變現故事文：無法驗證、無 demo、無原始 prompt，當敘事看就好。技術上「用 AI 重建腦中的交易邏輯」這件事本身是可行方向。

**Prompt：**
```
/goal 把我描述的交易策略邏輯實作成完整的回測系統：資料載入（OHLCV）、訊號生成模組、部位管理、手續費與滑價模型、績效報表（Sharpe、最大回撤、勝率）。我口述邏輯、你寫碼，每個模組寫完先跑單元測試，最後用近三年資料跑完整回測並輸出 HTML 報告。（注意：這是工程重建範本，不構成任何投資建議）
```

---
