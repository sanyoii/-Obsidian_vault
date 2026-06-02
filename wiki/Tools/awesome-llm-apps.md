# Awesome LLM Apps — 工具程式總覽

> 來源：[Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)
> 100+ 可直接執行的 AI Agent & RAG 模板，Apache-2.0 授權
> 支援 Claude · Gemini · OpenAI · xAI · Qwen · Llama

---

## 值得關注

### 馬上可以用到的

- **Resume Job Matcher** (`advanced_llm_apps/resume_job_matcher/`) — 求職輔助，可搭配 CareerBot 參考邏輯
- **AI Social Media News & Podcast Agent** (`advanced_ai_agents/multi_agent_apps/ai_news_and_podcast_agents/`) — 跟 social-monitor 性質重疊，可參考 multi-agent 海巡架構

### 技術上很有料

- **RAG Failure Diagnostics Clinic** (`rag_tutorials/rag_failure_diagnostics_clinic/`) — 整理常見 RAG 失敗模式與診斷方法，gbrain 遇到 RAG 問題可對照
- **LLM Optimization Tools**（Toonify / Headroom）— 聲稱降 30–90% API 成本，原理是壓縮 context 格式，大量呼叫 Claude API 時值得測試
- **Multi-Agent Trust Layer / Trust-Gated Agent Team** — 給多個 Agent 加信任分層，研究 multi-agent 協調時可參考架構
- **Agentic RAG with Reasoning** (`rag_tutorials/agentic_rag_with_reasoning/`) — RAG + thinking model 混合，比一般 RAG 更準

### 概念新穎

- **AI Self-Evolving Agent** / **Self-Improving Agent Skills** — Agent 自己優化自己的 prompt/skill，同一個思路的兩種實作
- **Multi-Agent Trust Layer** — 多 Agent 互信機制，生產環境部署時的安全層

> [!warning] 安裝注意
> 各工具各自有獨立 `requirements.txt`，依賴衝突嚴重。要試用請用獨立 venv，不要裝在同一個環境。

---

## 目錄

- [入門 AI Agents](#入門-ai-agents)
- [進階 AI Agents](#進階-ai-agents)
- [自主遊戲 Agents](#自主遊戲-agents)
- [Multi-Agent Teams](#multi-agent-teams)
- [語音 AI Agents](#語音-ai-agents)
- [MCP AI Agents](#mcp-ai-agents)
- [RAG 教學](#rag-教學)
- [Agent Skills](#agent-skills)
- [含記憶的 LLM Apps](#含記憶的-llm-apps)
- [Chat with X 教學](#chat-with-x-教學)
- [LLM 優化工具](#llm-優化工具)
- [LLM Fine-tuning 教學](#llm-fine-tuning-教學)
- [框架速成班](#框架速成班)

---

## 入門 AI Agents

*單一檔案，只需 API Key 即可運行*

| 工具 | 路徑 |
|------|------|
| AI Blog to Podcast Agent | `starter_ai_agents/ai_blog_to_podcast_agent/` |
| AI Breakup Recovery Agent | `starter_ai_agents/ai_breakup_recovery_agent/` |
| AI Data Analysis Agent | `starter_ai_agents/ai_data_analysis_agent/` |
| AI Data Visualisation Agent | `starter_ai_agents/ai_data_visualisation_agent/` |
| AI Life Insurance Advisor Agent | `starter_ai_agents/ai_life_insurance_advisor_agent/` |
| AI Medical Imaging Agent | `starter_ai_agents/ai_medical_imaging_agent/` |
| AI Meme Generator Agent (Browser) | `starter_ai_agents/ai_meme_generator_agent_browseruse/` |
| AI Music Generator Agent | `starter_ai_agents/ai_music_generator_agent/` |
| AI Reasoning Agent (Local & Cloud) | `starter_ai_agents/ai_reasoning_agent/` |
| AI Startup Trend Analysis Agent | `starter_ai_agents/ai_startup_trend_analysis_agent/` |
| AI Travel Agent (Local & Cloud) | `starter_ai_agents/ai_travel_agent/` |
| Gemini Multimodal Agent | `starter_ai_agents/gemini_multimodal_agent_demo/` |
| Mixture of Agents | `starter_ai_agents/mixture_of_agents/` |
| Multimodal AI Agent | `starter_ai_agents/multimodal_ai_agent/` |
| OpenAI Research Agent | `starter_ai_agents/openai_research_agent/` |
| Web Scraping AI Agent (Local & Cloud) | `starter_ai_agents/web_scraping_ai_agent/` |
| xAI Finance Agent | `starter_ai_agents/xai_finance_agent/` |

---

## 進階 AI Agents

*具備工具、記憶、多步推理的生產級 Agent*

### Single Agent Apps

| 工具 | 路徑 |
|------|------|
| AI Agent Governance | `advanced_ai_agents/single_agent_apps/ai_agent_governance/` |
| AI Consultant Agent | `advanced_ai_agents/single_agent_apps/ai_consultant_agent/` |
| AI Customer Support Agent | `advanced_ai_agents/single_agent_apps/ai_customer_support_agent/` |
| AI Deep Research Agent | `advanced_ai_agents/single_agent_apps/ai_deep_research_agent/` |
| AI Email GTM Reachout Agent | `advanced_ai_agents/single_agent_apps/ai_email_gtm_reachout_agent/` |
| AI Fraud Investigation Agent | `advanced_ai_agents/single_agent_apps/ai_fraud_investigation_agent/` |
| AI Health & Fitness Agent | `advanced_ai_agents/single_agent_apps/ai_health_fitness_agent/` |
| AI Investment Agent | `advanced_ai_agents/single_agent_apps/ai_investment_agent/` |
| AI Journalist Agent | `advanced_ai_agents/single_agent_apps/ai_journalist_agent/` |
| AI Meeting Agent | `advanced_ai_agents/single_agent_apps/ai_meeting_agent/` |
| AI Movie Production Agent | `advanced_ai_agents/single_agent_apps/ai_movie_production_agent/` |
| AI Personal Finance Agent | `advanced_ai_agents/single_agent_apps/ai_personal_finance_agent/` |
| AI Recipe & Meal Planning Agent | `advanced_ai_agents/single_agent_apps/ai_recipe_meal_planning_agent/` |
| AI Startup Insight Fire1 Agent | `advanced_ai_agents/single_agent_apps/ai_startup_insight_fire1_agent/` |
| AI System Architect Agent (R1) | `advanced_ai_agents/single_agent_apps/ai_system_architect_r1/` |
| Earnings Call Analyst Agent | `advanced_ai_agents/single_agent_apps/earnings_call_analyst_agent/` |
| Research Planner & Executor (Gemini) | `advanced_ai_agents/single_agent_apps/research_agent_gemini_interaction_api/` |
| Windows Use Autonomous Agent | `advanced_ai_agents/single_agent_apps/windows_use_autonomous_agent/` |

### Multi Agent Apps

| 工具 | 路徑 |
|------|------|
| AI AQI Analysis Agent | `advanced_ai_agents/multi_agent_apps/ai_aqi_analysis_agent/` |
| AI Domain Deep Research Agent | `advanced_ai_agents/multi_agent_apps/ai_domain_deep_research_agent/` |
| AI Email GTM Outreach Agent | `advanced_ai_agents/multi_agent_apps/ai_email_gtm_outreach_agent/` |
| AI Financial Coach Agent | `advanced_ai_agents/multi_agent_apps/ai_financial_coach_agent/` |
| AI Home Renovation Agent (Nano Banana Pro) | `advanced_ai_agents/multi_agent_apps/ai_home_renovation_agent/` |
| AI Mental Wellbeing Agent | `advanced_ai_agents/multi_agent_apps/ai_mental_wellbeing_agent/` |
| AI Self-Evolving Agent | `advanced_ai_agents/multi_agent_apps/ai_self_evolving_agent/` |
| AI Social Media News & Podcast Agent | `advanced_ai_agents/multi_agent_apps/ai_news_and_podcast_agents/` |
| DevPulse AI - Multi-Agent Signal Intelligence | `advanced_ai_agents/multi_agent_apps/devpulse_ai/` |
| Multi-Agent Researcher | `advanced_ai_agents/multi_agent_apps/multi_agent_researcher/` |
| Multi-Agent Trust Layer | `advanced_ai_agents/multi_agent_apps/multi_agent_trust_layer/` |
| Product Launch Intelligence Agent | `advanced_ai_agents/multi_agent_apps/product_launch_intelligence_agent/` |
| Trust-Gated Multi-Agent Research Team | `advanced_ai_agents/multi_agent_apps/trust_gated_agent_team/` |

---

## 自主遊戲 Agents

*端對端自主進行遊戲的 Agent*

| 工具 | 路徑 |
|------|------|
| AI 3D Pygame Agent (R1) | `advanced_ai_agents/autonomous_game_playing_agent_apps/ai_3dpygame_r1/` |
| AI Chess Agent | `advanced_ai_agents/autonomous_game_playing_agent_apps/ai_chess_agent/` |
| AI Tic-Tac-Toe Agent | `advanced_ai_agents/autonomous_game_playing_agent_apps/ai_tic_tac_toe_agent/` |

---

## Multi-Agent Teams

*多個 Agent 協作完成跨領域複雜任務*

| 工具 | 路徑 |
|------|------|
| AG2 Adaptive Research Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ag2_adaptive_research_team/` |
| AI Competitor Intelligence Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_competitor_intelligence_agent_team/` |
| AI Finance Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_finance_agent_team/` |
| AI Game Design Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_game_design_agent_team/` |
| AI Legal Agent Team (Cloud & Local) | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_legal_agent_team/` |
| AI Real Estate Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_real_estate_agent_team/` |
| AI Recruitment Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_recruitment_agent_team/` |
| AI Sales Intelligence Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_sales_intelligence_agent_team/` |
| AI Services Agency (CrewAI) | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_services_agency/` |
| AI Teaching Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_teaching_agent_team/` |
| AI Travel Planner Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_travel_planner_agent_team/` |
| AI VC Due Diligence Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/ai_vc_due_diligence_agent_team/` |
| Multimodal Coding Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_coding_agent_team/` |
| Multimodal Design Agent Team | `advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_design_agent_team/` |
| Multimodal UI/UX Feedback Agent Team (Nano Banana) | `advanced_ai_agents/multi_agent_apps/agent_teams/multimodal_uiux_feedback_agent_team/` |

---

## 語音 AI Agents

*語音輸入輸出，使用即時語音 API*

| 工具 | 路徑 |
|------|------|
| AI Audio Tour Agent | `voice_ai_agents/ai_audio_tour_agent/` |
| Customer Support Voice Agent | `voice_ai_agents/customer_support_voice_agent/` |
| Insurance Claim Live Agent Team | `voice_ai_agents/insurance_claim_live_agent_team/` |
| Voice RAG Agent (OpenAI SDK) | `voice_ai_agents/voice_rag_openaisdk/` |

---

## MCP AI Agents

*透過 Model Context Protocol 連接外部工具與資料*

| 工具 | 路徑 |
|------|------|
| AI Travel Planner MCP Agent Team | `mcp_ai_agents/ai_travel_planner_mcp_agent_team/` |
| Browser MCP Agent | `mcp_ai_agents/browser_mcp_agent/` |
| GitHub MCP Agent | `mcp_ai_agents/github_mcp_agent/` |
| Multi MCP Agent | `mcp_ai_agents/multi_mcp_agent/` |
| Multi MCP Agent Router | `mcp_ai_agents/multi_mcp_agent_router/` |
| Notion MCP Agent | `mcp_ai_agents/notion_mcp_agent/` |

---

## RAG 教學

*從簡單 Chain 到 Agentic、多資料源的檢索管線*

| 工具 | 路徑 |
|------|------|
| Agentic RAG with Embedding Gemma | `rag_tutorials/agentic_rag_embedding_gemma/` |
| Agentic RAG GPT5 | `rag_tutorials/agentic_rag_gpt5/` |
| Agentic RAG with Reasoning | `rag_tutorials/agentic_rag_with_reasoning/` |
| AI Blog Search (RAG) | `rag_tutorials/ai_blog_search/` |
| Autonomous RAG | `rag_tutorials/autonomous_rag/` |
| Contextual AI RAG Agent | `rag_tutorials/contextualai_rag_agent/` |
| Corrective RAG (CRAG) | `rag_tutorials/corrective_rag/` |
| DeepSeek Local RAG Agent | `rag_tutorials/deepseek_local_rag_agent/` |
| Gemini Agentic RAG | `rag_tutorials/gemini_agentic_rag/` |
| Hybrid Search RAG (Cloud) | `rag_tutorials/hybrid_search_rag/` |
| Knowledge Graph RAG with Citations | `rag_tutorials/knowledge_graph_rag_citations/` |
| Llama 3.1 Local RAG | `rag_tutorials/llama3.1_local_rag/` |
| Local Hybrid Search RAG | `rag_tutorials/local_hybrid_search_rag/` |
| Local RAG Agent | `rag_tutorials/local_rag_agent/` |
| Multimodal Agentic RAG | `rag_tutorials/multimodal_agentic_rag/` |
| Qwen Local RAG | `rag_tutorials/qwen_local_rag/` |
| RAG as a Service | `rag_tutorials/rag-as-a-service/` |
| RAG Agent with Cohere | `rag_tutorials/rag_agent_cohere/` |
| Basic RAG Chain | `rag_tutorials/rag_chain/` |
| RAG with Database Routing | `rag_tutorials/rag_database_routing/` |
| RAG Failure Diagnostics Clinic | `rag_tutorials/rag_failure_diagnostics_clinic/` |
| Vision RAG | `rag_tutorials/vision_rag/` |

---

## Agent Skills

*可插入任何 AI Agent 或 LLM workflow 的現成技能檔*

| Skill | 說明 |
|-------|------|
| Self-Improving Agent Skills | 用 Gemini + ADK 自動優化 Agent Skills |
| Academic Researcher | 文獻回顧、論文分析、引用管理 |
| Code Reviewer | 自動 Code Review 與最佳實踐檢查 |
| Content Creator | 部落格、社群媒體、行銷文案 |
| Data Analyst | 資料探索、統計分析、洞察 |
| Debugger | 系統性 Bug 追蹤與根因分析 |
| Decision Helper | 結構化決策框架與取捨分析 |
| Deep Research | 多來源研究與綜合整理 |
| Editor | 校稿、風格、清晰度改善 |
| Email Drafter | 專業郵件撰寫 |
| Fact Checker | 主張驗證與來源確認 |
| Fullstack Developer | 端對端 Web App 開發 |
| Meeting Notes | 會議摘要、行動項目、跟進事項 |
| Project Planner | 路線圖、里程碑、資源規劃 |
| Python Expert | Pythonic 程式碼、打包、效能 |
| Sprint Planner | 敏捷衝刺規劃與待辦清單整理 |
| Strategy Advisor | 商業策略與競爭分析 |
| Technical Writer | 文件、API 文檔、指南 |
| UX Designer | UI/UX 設計回饋與線框圖 |
| Visualization Expert | 圖表、儀表板、資料視覺化 |

---

## 含記憶的 LLM Apps

*跨 Session 記憶對話與使用者狀態*

| 工具 | 路徑 |
|------|------|
| AI ArXiv Agent with Memory | `advanced_llm_apps/llm_apps_with_memory_tutorials/ai_arxiv_agent_memory/` |
| AI Travel Agent with Memory | `advanced_llm_apps/llm_apps_with_memory_tutorials/ai_travel_agent_memory/` |
| Llama3 Stateful Chat | `advanced_llm_apps/llm_apps_with_memory_tutorials/llama3_stateful_chat/` |
| LLM App with Personalized Memory | `advanced_llm_apps/llm_apps_with_memory_tutorials/llm_app_personalized_memory/` |
| Local ChatGPT Clone with Memory | `advanced_llm_apps/llm_apps_with_memory_tutorials/local_chatgpt_with_memory/` |
| Multi-LLM App with Shared Memory | `advanced_llm_apps/llm_apps_with_memory_tutorials/multi_llm_memory/` |

---

## Chat with X 教學

*把任意資料來源變成對話介面*

| 工具 | 路徑 |
|------|------|
| Chat with GitHub (GPT & Llama3) | `advanced_llm_apps/chat_with_X_tutorials/chat_with_github/` |
| Chat with Gmail | `advanced_llm_apps/chat_with_X_tutorials/chat_with_gmail/` |
| Chat with PDF (GPT & Llama3) | `advanced_llm_apps/chat_with_X_tutorials/chat_with_pdf/` |
| Chat with Research Papers (ArXiv) | `advanced_llm_apps/chat_with_X_tutorials/chat_with_research_papers/` |
| Chat with Substack | `advanced_llm_apps/chat_with_X_tutorials/chat_with_substack/` |
| Chat with YouTube Videos | `advanced_llm_apps/chat_with_X_tutorials/chat_with_youtube_videos/` |
| Chat with Tarots | `advanced_llm_apps/chat-with-tarots/` |

---

## LLM 優化工具

*降低 Token 用量、Context 大小與 API 成本*

| 工具 | 說明 | 路徑 |
|------|------|------|
| Toonify Token Optimization | TOON 格式降低 API 成本 30–60% | `advanced_llm_apps/llm_optimization_tools/toonify_token_optimization/` |
| Headroom Context Optimization | 降低 API 成本 50–90% | `advanced_llm_apps/llm_optimization_tools/headroom_context_optimization/` |

---

## LLM Fine-tuning 教學

*開源模型端對端微調食譜*

| 工具 | 路徑 |
|------|------|
| Gemma 3 Fine-tuning | `advanced_llm_apps/llm_finetuning_tutorials/gemma3_finetuning/` |
| Llama 3.2 Fine-tuning | `advanced_llm_apps/llm_finetuning_tutorials/llama3.2_finetuning/` |

---

## 框架速成班

### Google ADK Crash Course (`ai_agent_framework_crash_course/google_adk_crash_course/`)

| 課程 | 主題 |
|------|------|
| 1_starter_agent | 入門 Agent |
| 2_model_agnostic_agent | 多模型支援（OpenAI、Claude） |
| 3_structured_output_agent | 結構化輸出（Pydantic） |
| 4_tool_using_agent | 工具使用（built-in / function / third-party / MCP） |
| 5_memory_agent | 記憶 |
| 6_callbacks | Callbacks |
| 7_plugins | Plugins |
| 8_simple_multi_agent | 簡單 Multi-Agent |
| 9_multi_agent_patterns | Multi-Agent Patterns |
| adk_yaml_examples | YAML 設定範例 |

### OpenAI Agents SDK Crash Course (`ai_agent_framework_crash_course/openai_sdk_crash_course/`)

| 課程 | 主題 |
|------|------|
| 1_starter_agent | 入門 Agent |
| 2_structured_output_agent | 結構化輸出 |
| 3_tool_using_agent | 工具使用 |
| 4_running_agents | 執行 Agent |
| 5_context_management | Context 管理 |
| 6_guardrails_validation | Guardrails 與驗證 |
| 7_sessions | Sessions |
| 8_handoffs_delegation | Handoffs 與 Delegation |
| 9_multi_agent_orchestration | Multi-Agent Orchestration |
| 10_tracing_observability | Tracing 與 Observability |
| 11_voice | Voice |

---

## 其他應用

| 工具 | 路徑 |
|------|------|
| GPT OSS Critique Improvement Loop | `advanced_llm_apps/gpt_oss_critique_improvement_loop/` |
| Resume Job Matcher | `advanced_llm_apps/resume_job_matcher/` |
| ThinkPath Chatbot App | `advanced_llm_apps/thinkpath_chatbot_app/` |
| Multimodal Video Moment Finder | `advanced_llm_apps/multimodal_video_moment_finder/` |
| Cursor AI Experiments | `advanced_llm_apps/cursor_ai_experiments/` |

---

*最後更新：2026-05-30 | 來源 repo 持續更新，建議定期回查*
