![[Pasted image 20260510021311.png]]
### 第一部分：拆解原圖的關鍵元素

在編寫 Prompt 之前，我們必須將這張圖視為一個多層次的藝術品來拆解：

|**元素類別**|**關鍵細節**|
|---|---|
|**視覺風格 (Visual Style)**|深色主題 (Dark Mode)、賽博龐克 (Cyberpunk)、未來科技感 (Futuristic Tech)、高科技藍色和紫色調 (Neon Blue & Purple tones)、發光霓虹線條 (Neon glowing lines)、電路板紋理 (Circuit board patterns)、平面資訊圖表設計 (Flat Infographic design)。|
|**結構佈局 (Layout Structure)**|層次化 (Hierarchical)、模組化 (Modular)。<br><br>  <br><br>1. **頂部**：大標題與關鍵資訊。<br><br>  <br><br>2. **上半部**：水平線性流程圖 (Horizontal flow with arrows)。<br><br>  <br><br>3. **中部**：兩個大的、並排的詳細模組 (Two large side-by-side modules with bullet points)。<br><br>  <br><br>4. **下半部**：功能與設計核心模組 (Smaller, distinct functional boxes)。<br><br>  <br><br>5. **底部**：終端命令與頁尾 (Terminal command line and footer)。|
|**圖標設計 (Iconography)**|**極簡化、平面化 (Minimalist, Flat icons)**，具有霓虹發光邊框：文件、分支箭頭、三個用戶頭像、大門/閘門、火箭、飛機、星星、齒輪、文件夾、用戶群組、錢包、護盾、終端窗口。|
|**文字元素 (Text - 最難的部分)**|**繁體中文 (Traditional Chinese)** 與特定術語的混合。包含大標題、副標題、版本號、授權、詳細條列式文字 (Bullet points)、程式碼、以及 URL。AI 幾乎不可能完美還原這些。|

---

### 第二部分：挑戰單一 Prompt 一次生成（適用於 Midjourney / DALL-E 3）

這個 Prompt 旨在讓 AI 理解復雜的**佈局**和**視覺風格**，但您必須預期文字會是不可讀的雜亂圖案（亂碼）。您之後必須手動擦除並重新輸入文字。

**Prompt（建議使用英文以獲得更好的風格理解）：**

> **A highly detailed, professional technology infographic design for a software tool called "Claude Pilot Suite". The overall style is futuristic dark mode with a cyber-punk aesthetic, using neon blue and deep purple glow effects against a dark circuit board pattern background. The layout is hierarchical and multi-tiered.**
> 
> **Top section:** Large title "Claude Pilot Suite" with a subtitle and a pill-shaped version tag "Version 0.1.1 - MIT License". A prominent blue text box below it with an up-trend icon, mentioning a "55-85%" cost saving concept.
> 
> **Upper-middle section:** A precise five-stage horizontal process flow using interconnected neon-outlined boxes and arrows. From left to right, flat icons and text representing: "Task", "Pilot Mode", "Sub-agent Delegation", "Quantitative Escalation Gate", and finally a rocket icon labeled "Opus (only when needed)".
> 
> **Lower-middle section:** Two large, side-by-side modular panels with internal bullet points. The left panel is named "Haiku Pilot" (with a paper plane icon), and the right panel is "Sonnet Pilot" (with a star icon). Both panels contain lists with tiny bullet point indicators.
> 
> **Lower section:** A "Suite Contents" section with three distinct icon boxes (one with a document and text, one with cogs and text, and one with a folder and text). Below that, a "Design Core" section with four smaller, distinct icon boxes: (group icon, wallet icon, gate icon, shield icon).
> 
> **Bottom section:** A dark green terminal command line window with a prompt showing a URL path: `[https://github.com/zeuikli/claude-pilot-suite](https://github.com/zeuikli/claude-pilot-suite)`. A footer line with small icons and text like "Portable execution playbook for Claude Code".
> 
> **The overall impression must be of a clean, structured, data-driven technical blueprint. Keep text areas as clean placeholders or illustrative text, not legible data, due to text rendering limitations.**
> 
> **--ar 3:4 --v 6.0** (or similar parameters for aspect ratio and version)

#### Prompt 拆解分析（為什麼這樣寫）：

1. **設定總體基調 (Setting the Scene):** 開頭明確指出是「專業技術資訊圖表 (professional technology infographic)」，並定義了「賽博龐克深色主題 (futuristic dark mode, cyber-punk)」和特定顏色（霓虹藍、紫），這是風格的靈魂。
    
2. **定義結構 (Defining Structure):** 使用「Hierarchical and multi-tiered」來指引 AI 不要隨意擺放元素。
    
3. **由上而下（分層）描述 (Top-to-Bottom Description):**
    
    - **頂部**：明確大標題、副標題和版本號的位置。
        
    - **水平流程 (Upper-middle)**：關鍵的流程圖部分，必須說明它有五個階段，由箭頭連接，並分別描述每個階段的圖標（文件、箭頭、用戶、大門、火箭）。
        
    - **雙欄並排 (Lower-middle)**：明確指出有「兩個大、並排的模組」，分別是「Haiku」和「Sonnet」，並描述它們各自的圖標（飛機、星星）和條列式結構。這是全圖的核心資訊區。
        
    - **下部功能區 (Lower section)**：描述更小的、多個功能框，並列出它們的圖標（文件、齒輪、文件夾、群組、錢包、大門、護盾），以保證佈局的準確性。
        
    - **底部命令與頁尾 (Bottom section)**：特別描述終端窗口和 URL，這能增加「開發者工具」的真實感。
        
4. **管理預期 (Managing Expectations):** 最後一句話「Keep text areas as clean placeholders...」非常重要，這告訴 AI 將重點放在佈局上，而不是完美的文字渲染，這樣生成的圖片更乾淨，便於後期處理。
    

---

### 第三部分：最推薦的「AI + 手工」分層生成法 Prompt

這個方法能保證最高效且完美的結果。您使用 AI 生成一個乾淨的、無文字的佈局背景，然後在向量軟體（如 Adobe Illustrator）中添加文字。

**步驟：**

1. **AI 生成無文字背景**：使用以下 Prompt 生成一個乾淨的、無文字的藍/紫霓虹框架。
    
2. **後期手工處理**：使用 Photoshop 擦除 AI 生成的任何殘留雜亂文字，然後使用 Illustrator 的文字工具和形狀工具（向量）重新建立完美的佈局、圖標和文字。
    

**「AI + 手工」工作流的 AI 背景生成 Prompt：**

> **A professional, multi-tiered infographic layout template for a technology software tool. Futuristic dark mode style with a cyber-punk aesthetic, using neon blue and deep purple glow effects against a subtle dark circuit board pattern background. The layout is hierarchical with precise, clean, empty placeholder boxes and connecting arrows, but NO legible text.**
> 
> **Top:** A clear area for a large title and a pill-shaped version tag. Below it, a single prominent empty text box.
> 
> **Upper-middle:** A precise sequence of five empty, interconnected neon-outlined boxes with arrows in a horizontal flow.
> 
> **Lower-middle:** Two large, side-by-side empty modular panels with internal vertical lines, designed for long text lists.
> 
> **Lower:** Below the large panels, a row of three smaller, distinct empty icon-box containers. Below that, another row of four even smaller empty icon-box containers.
> 
> **Bottom:** A clean area for a long text input (like a terminal prompt) and a clean footer line.
> 
> **The overall impression must be of a clean, structured, modular blueprint. All boxes, frames, and arrows are in place, but empty and clean.**
> 
> **--ar 3:4 --v 6.0 --no text letters typography**

#### Prompt 拆解分析（與前者的區別）：

- **關鍵詞：「Template」 (模板)、「Empty Placeholder Boxes」 (空的佔位框)**：這告訴 AI 的重點不是展示具體內容，而是展示結構。
    
- **關鍵詞：「BUT NO LEGIBLE TEXT」 (但沒有可讀的文字)**：這是最重要的，AI 會盡量不生成看起來像文字的形狀。
    
- **參數：`--no text letters typography` (Midjourney 負面提示)**：顯式地拒絕生成文字元素，從而獲得更乾淨的背景。
    

### 總結

AI 圖像生成目前是「佈局和風格」大師，但不是「文字和細節」大師。

如果您想要生成原圖那樣完美的資訊圖表，**請務必選擇第三部分的 Prompt 生成無文字背景，然後使用專業軟體（如 AI）手工添加文字。** 這是目前專業設計師的工作流，也是唯一能保證結果的方法。如果您使用第一部分的 Prompt，您會得到一個非常像的佈局，但文字部分會像一堆混亂的線條。