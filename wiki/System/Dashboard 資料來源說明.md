# Dashboard 資料來源說明

## GitHub Trending

- **資料來源**：`https://github.com/trending?since=daily`
- **排名依據**：當日新增 star 數（GitHub 官方計算，非本地排序）
- **顯示數量**：前 10 名
- **欄位**：rank、repo 名稱、描述、stars（今日增量）、語言

### 可調整的參數

| 參數 | 說明 |
|------|------|
| `since=daily` | 今日新增 star 最多（目前使用） |
| `since=weekly` | 本週新增 star 最多 |
| `since=monthly` | 本月新增 star 最多 |
| `?l=python` | 加語言 filter，排名邏輯不變 |

GitHub 官方沒有提供「按 fork 數」、「按 commit 頻率」等其他排法，唯一指標是 **star 增量**。

若要更換時間窗口，修改 `obsidian/scripts/fetch-dashboard-data.ps1` 第 61 行的 URL。

---

## 其他資料來源

| 來源 | 排名依據 | 數量 |
|------|---------|------|
| Hacker News | HN 官方 top stories（score） | 前 10 |
| Product Hunt | votes 數（需 API Token） | 前 10 |
| Lobsters | hottest 演算法（score） | 前 10 |
| iThome RSS | 發布時間（最新優先） | 前 15 |
| TechOrange RSS | 發布時間（最新優先） | 前 10 |
| TechCrunch RSS | 發布時間（最新優先） | 前 10 |

---

*相關腳本：`[[fetch-dashboard-data.ps1]]`*
