---
source: "https://github.com/dataexpert-io/data-engineer-handbook"
author: "DataExpert-io (Zach Wilson / EcZachly)"
stars: "41K+"
clipped: 2026-06-25
tags:
  - "github/repo"
  - "data-engineering"
  - "learning-resource"
  - "awesome-list"
  - "bootcamp"
---

## data-engineer-handbook — 資料工程完全學習手冊

> **DataExpert-io/data-engineer-handbook** | ⭐ 41K+ | 🍴 7.9K+ | 📝 無授權
> "This is a repo with links to everything you'd ever want to learn about data engineering"

---

### 一句話說明

由 DataExpert.io 創辦人 Zach Wilson（EcZachly）維護的資料工程學習大全。包含 30+ 本推薦書、10+ 社群、40+ 公司工具列表、各大平台 DE 創作者名單，以及兩套完整的實戰 Bootcamp 教材（初級 4 週 + 中級 6 週），涵蓋 SQL 資料建模、PySpark、Apache Flink、分析模式、KPI 實驗等。

---

### 專案概覽

| 項目 | 數值 |
|------|------|
| Stars | 41,898 |
| Forks | 7,896 |
| 主要語言 | Jupyter Notebook + Python |
| 授權 | ⚠️ 無授權（No License） |
| 建立時間 | 2023-11-19 |
| 最後推送 | 2026-04-02 |
| Topics | apachespark, awesome, bigdata, data, dataengineering, sql |

---

### 核心內容

- **Beginner Bootcamp（4 週免費）**：SQL、Python、Data Modeling、Data Pipelines
- **Intermediate Bootcamp（6 週免費）**：
  1. Dimensional Data Modeling（SCD、Graph DDL、PostgreSQL + Docker）
  2. Fact Data Modeling（cumulated tables、array metrics）
  3. Spark Fundamentals（PySpark、Iceberg bucket joins）
  4. Apache Flink Training（streaming aggregation）
  5. Applying Analytical Patterns（funnel、retention、growth accounting）
  6. KPIs & Experimentation + Data Impact + Pipeline Maintenance
- **策展資源**：30+ 本書、10+ 社群、10+ 企業技術部落格、10+ 白皮書、50+ 創作者名單、9 個 Podcasts、45+ 公司工具分類

---

### 推薦書單（30+ 本）

#### 必讀 Top 3
1. **Fundamentals of Data Engineering** — Joe Reis & Matt Housley
2. **Designing Data-Intensive Applications (DDIA)** — Martin Kleppmann
3. **Designing Machine Learning Systems** — Chip Huyen

#### 資料建模 & 倉儲
- **Kimball - The Data Warehouse Toolkit** — Ralph Kimball（經典）
- **Data Mesh** — Zhamak Dehghani（O'Reilly）
- **Deciphering Data Architectures** — James Serra（O'Reilly）
- **Data Management at Scale, 2nd Ed** — Piethein Strengholt（O'Reilly）
- **Building Evolutionary Architectures, 2nd Ed** — Neal Ford et al.（O'Reilly）
- **Data Engineering Design Patterns** — dedp.online
- **Data Governance: The Definitive Guide** — Evren Eryurek et al.（O'Reilly）

#### Apache Spark
- **High Performance Spark** — Holden Karau & Rachel Warren
- **Spark: The Definitive Guide** — Bill Chambers & Matei Zaharia（O'Reilly）
- **Learning Spark, 2nd Ed** — Jules Damji et al.（Databricks 免費 PDF）
- **Modern Data Engineering with Apache Spark** — Scott Haines

#### 串流處理
- **Streaming Systems** — Tyler Akidau et al.
- **Stream Processing with Apache Flink** — Fabian Hueske & Vasiliki Kalavri（O'Reilly）

#### 資料表格式 & Lake
- **Delta Lake: The Definitive Guide** — O'Reilly
- **Apache Iceberg: The Definitive Guide** — O'Reilly
- **Architecting an Apache Iceberg Lakehouse** — Manning
- **Trino: The Definitive Guide** — Matt Fuller et al.
- **Hadoop: The Definitive Guide** — Tom White（O'Reilly，經典）

#### 工具專書
- **Data Engineering with dbt** — Roberto Zagni
- **Unlocking dbt** — Zach Stein-Perlman
- **Snowflake Data Engineering** — Manning
- **Data Engineering with AWS** — Gareth Eagar（O'Reilly）

#### 資料科學 & ML
- **The Hundred Page Machine Learning Book** — Andriy Burkov
- **Machine Learning System Design Interview** — Ali Aminian
- **Python for Data Analysis, 3E** — Wes McKinney（免費線上）
- **Pandas Cookbook, 3rd Ed** — Matt Harrison

#### 其他
- **97 Things Every Data Engineer Should Know** — Tobias Macey
- **Practical DataOps** — Harvinder Atwal
- **Data Pipelines Pocket Reference** — James Densmore（O'Reilly）
- **Learn AI Data Engineering in a Month of Lunches** — Manning

---

### 推薦白皮書（11 篇）

1. A Five-Layered Business Intelligence Architecture
2. Lakehouse: A New Generation of Open Platforms（CIDR 2021）
3. Big Data Quality: A Data Quality Profiling Model
4. The Data Lakehouse: Data Warehousing and More（arXiv）
5. Spark: Cluster Computing with Working Sets（ACM）
6. The Google File System（Google Research）
7. Building a Universal Data Lakehouse（Onehouse）
8. XTable in Action: Seamless Interoperability in Data Lakes（arXiv）
9. MapReduce: Simplified Data Processing on Large Clusters（Google Research）
10. Tidy Data — Hadley Wickham
11. Data Engineering Whitepapers 彙整（ssp.sh）

---

### 工具生態分類

| 分類 | 代表工具 |
|------|---------|
| Orchestration | Airflow, Dagster, Prefect, Mage, Kestra |
| Data Lake / Cloud | Databricks, Delta Lake, Apache Iceberg, Onehouse, DuckLake |
| Data Warehouse | Snowflake, Firebolt, Databend |
| Data Quality | dbt, Great Expectations, Soda, Metaplane, DQOps |
| Analytics / Viz | Metabase, Superset, Tableau, Power BI, Hex, Looker Studio |
| Data Integration | Fivetran, Airbyte, dlt, Sling, Meltano |
| Modern OLAP | ClickHouse, DuckDB, Apache Druid, StarRocks, QuestDB |
| Real-Time | RisingWave, Striim, Aggregations.io |
| LLM Libraries | AdalFlow, LangChain, LlamaIndex |
| Semantic Layer | Cube, dbt Semantic Layer |

---

### 社群 & Podcast

**社群：** DataExpert Discord, Data Talks Club Slack, r/dataengineering, dbt Community, Microsoft Fabric Community

**Podcast：** The Data Engineering Show, Data Engineering Podcast, DataTopics, The Datastack Show

---

### 相關連結

- 官方 Bootcamp 入口：https://learn.dataexpert.io
- Zach Wilson 入門路線圖：https://blog.dataengineer.io/p/the-2024-breaking-into-data-engineering
