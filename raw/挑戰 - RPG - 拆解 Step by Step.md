## Step 1：從需求文字「掃名詞」→ 候選類別

讀需求，把名詞圈出來：

|需求裡的名詞|候選類別|
|---|---|
|世界|`World`|
|地圖格子|`Block`|
|英雄|`Hero`|
|怪物|`Monster`|
|角色|`Role`（英雄與怪物的共同抽象）|
|速度值|`speed`（屬性）|
|進攻點數|`attackPoint`（屬性）|
|靈魂之力|`spiritPoint`（屬性）|
|現金|`cash`（Hero 的屬性）|
|進攻選項|`AttackOption`（撞擊 / 水球 / 火球）|

---

## Step 2：從需求文字「掃動詞」→ 候選操作

|需求裡的動詞|放在哪個類別|
|---|---|
|移動|`Hero.move()`|
|觸發戰鬥|`World` 偵測格子碰撞|
|恢復進攻點數|`Role.recoverAttackPoint()`|
|選擇進攻選項|`Role.selectAttack()`|
|扣靈魂之力|`Role.takeDamage()`|
|判斷死亡|`Role.isDefeated()`|
|獲得現金|`Hero.gainCash()`|

---

## Step 3：畫出初版 OOA 類別圖

```
World
  ├── 0..* Block
  ├── 1    Hero
  └── 0..* Monster

Role (abstract)
  - speed, attackPoint, spiritPoint
  + recoverAttackPoint()
  + takeDamage()
  + isDefeated()

Hero extends Role
  - cash
  + hit()           ← 3 種攻擊方法
  + waterball()
  + fireball()

Monster extends Role
  + hit()           ← 1 種攻擊方法
```

此刻先**如實描述需求**，不急著設計。

---

## Step 4：抓第一道 Force —「行為變動性」

現在問自己：**「這張圖裡，哪個地方的行為最容易變？」**

```
Hero 有 3 種攻擊：hit / waterball / fireball
Monster 只有 1 種攻擊：hit

→ 未來若新增角色（弓箭手、法師）？  攻擊行為又不同了
→ 未來若新增攻擊選項（冰球、毒霧）？  現有角色的方法又要增加
```

**Force 1（紅色）放在 Hero/Monster 的攻擊方法旁：**

> 進攻行為因角色種類不同而異，且未來會持續新增新的攻擊選項

---

## Step 5：看非功能性需求，抓第二道 Force —「擴充性」

需求 C 直接告訴你：

> 當擴充 / 或移除「進攻選項」在任意一個「角色」身上時，最小化須修改的既有程式碼

翻譯成 Force：

**Force 2（紅色）：**

> 新增「進攻選項」時，希望不必修改 `Hero` 或 `Monster` 這些角色類別

---

## Step 6：找兩道 Force 的衝突 → 歸納成 Problem

```
Force 1 說：進攻行為會變、會增加
Force 2 說：變動時不要改 Hero / Monster

但如果把攻擊方法直接寫在 Hero 裡：
  Hero.hit()
  Hero.waterball()
  Hero.fireball()

→ 新增「冰球攻擊」時，就必須改 Hero，Force 2 就炸了
```

**Problem：**

> 進攻行為不斷擴充，但若寫死在角色類別中，每次擴充都要修改既有角色，無法在不改 Hero/Monster 的情況下新增攻擊行為

---

## Step 7：OOD — 套策略模式解決 Problem

**解法思路：** 把「進攻選項」從角色類別裡**抽出來**，變成獨立的物件，角色只持有它的清單，實際行為委派給它執行。

```
AttackOption (interface)
  + requiredCost(): int
  + perform(target: Role): void

Hit        implements AttackOption  → cost=1, SP-2
Waterball  implements AttackOption  → cost=2, SP-3
Fireball   implements AttackOption  → cost=3, 骰1~6 SP

Role
  - attackOptions: List<AttackOption>  ← 持有策略清單
  + executeAttack(option, target)      ← 委派給 option 執行

Hero   → 建構時塞入 [Hit, Waterball, Fireball]
Monster → 建構時塞入 [Hit]
```

**Force 轉綠色：**

```
✅ Force 1（已解決）
  新增冰球攻擊 → 只要新增 IceballAttack implements AttackOption
  完全不碰 Hero / Monster

✅ Force 2（已解決）
  Hero / Monster 只認識 AttackOption 介面
  攻擊選項再怎麼擴充，角色類別不動
```

---

## 整體思路總結

```
OOA
  1. 掃名詞 → 找類別
  2. 掃動詞 → 找操作
  3. 先如實建模，不急著設計
  4. 找行為「最容易變」的地方 → Force 1
  5. 看非功能性需求 → Force 2
  6. 找兩道 Force 的衝突 → Problem

OOD
  7. 選能解決 Problem 的 Pattern（這裡是 Strategy）
  8. 把 Pattern 套進來，Forces 轉綠色
```

這就是水球流「Forces → Problem → Pattern」的完整拆解流程。

