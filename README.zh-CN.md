# Maggie's Place BBQ 官方网站 · 项目说明（中文）

> 本文档仅用于项目说明，网站本身是英文站点，面向皇后镇本地与游客访客，不含中文界面。
> 英文版说明见 [README.md](README.md)。

- 线上地址：https://wrm-fw.github.io/maggies-place-bbq/
- 仓库：https://github.com/WRM-FW/maggies-place-bbq
- 餐厅：Maggie's Place BBQ，11 Margaret Place, Frankton, Queenstown 9300, New Zealand
- 本文事实核对日期：2026-10-12

## 一、这是什么

新西兰皇后镇 Frankton 工业区一家果木烟熏烧烤店（beef brisket、猪五花、炸鸡三明治、热派）的官方网站。**移动端优先**静态站点：没有构建步骤、没有前端框架、没有后端，只有 `index.html` + 一个样式表 + 一个 12 KB 脚本，以 GitHub Pages 分支直发方式部署在 `main` 分支根目录。

```
index.html                 单页站点（英文），含 Schema.org Restaurant 结构化数据
css/style.css              烟熏主题设计令牌 + 移动优先响应式布局，1597 行
js/main.js                 营业状态计算（Pacific/Auckland）、菜单筛选、外烩估算器、弹窗、抽屉导航
assets/images/             5 张 JPEG（合计约 1.1 MB）+ logo.svg + favicon.svg
.nojekyll                  关闭 Pages 的 Jekyll 处理
```

页面分 6 个区块：`#hero` → `#menu` → `#story` → `#catering` → `#reviews` → `#location`。

本地预览：直接双击 `index.html` 即可（资源全是相对路径），或者

```
python -m http.server 8000
```

## 二、内容口径：已实测与待店家确认

站内每一条生意信息都做了独立核对。**核对结果一致的**：

| 网站内容 | 核对来源（2026-10-12 实测） |
| --- | --- |
| 店名、地址 11 Margaret Place Frankton、电话 +64 22 410 5525、Plus Code XQV2+GM | 该店 Google 地图地点页（feature id `/g/11t62tv014`），分类为"外卖餐馆"，130+ 张照片 |
| 评分 5.0 / 108 条评价 | 同上，Google 地点页显示 5.0 (108) |
| 周一至周五 10:00–15:00、BBQ 11:00 起 | Google 地点页当时显示"已结束营业 · 开始营业时间：周二 10:00"，与站点脚本输出完全一致；Uber Eats 店页显示 "Tue 10:00 am – 3:00 pm" |
| Facebook 链接 @maggiesplacebbq | 页面存在，289 位粉丝，简介 "Slow Cooked, Wood Fire Barbeque / 📍 11 Margaret Place, Frankton"，价格范围 $ |

**与店家实际外卖菜单不符，需要店家确认后再改**（数据取自 Uber Eats 该店店页，2026-10-12）：

| 项目 | 站内写法 | Uber Eats 实价 |
| --- | --- | --- |
| Beef Brisket Sandwich | $14.50 | 大份（150g）$23 / 中份（100g）$16 |
| Pork Belly Sandwich | From $9.00 | 大份 $23 / 中份 $16 |
| Maggie's Fried Chicken Sandwich | From $9.00 | 大份 $23 / 中份 $16 |
| 烟熏时长 | "14-Hour Smoke"、"14-hour beef brisket" | 店家自己写 "Twelve hour barbecue beef brisket" |
| 配菜 | 站内未列单品价 | Chips $7、Spicy Wedges $10、饮料（Charlies 汽水 / Coke / L&P）$4 |

站内另有三项**本次无法独立核实**：Smoked Pork Spareribs $12.49/250g、House-Smoked Bacon & Egg Pie $8.50、Smoked Pork Boil-Up $15.00——Uber Eats 店页没有这些品类（外卖菜单只上三明治/配菜/饮料），价格来自建站时抓取的店家 Facebook 帖子，需店家复核。

站内**未收录**的在售品：Jackfruit Sandwich（素，$16/$23）。站内**未提及**的订餐渠道：**DoorDash**（该店店页 store id 30258013）——Google 地点页的"在线订餐"入口给出的是 DoorDash 与 Uber Eats 两家。

Instagram @maggiesplacebbq 未实测：本机到 instagram.com 的连接被重置（`ERR_CONNECTION_CLOSED`），链接有效性待人工确认。

## 三、订餐入口目前是错的（最高优先级问题）

页面 4 处"Order Online"按钮打开一个弹窗，弹窗里那条 Uber Eats 链接指向
`https://www.ubereats.com/nz/dish/queenstown-ota/pork-belly`——这是 Uber Eats 的**"Queenstown 地区 pork belly 菜品聚合页"**，实测打开后列出的第一家是 The Meat Preachers，往下是 Bronze Elephant Thai、NPD Frankton 等**竞品**，没有 Maggie's Place。访客点它会流失到别家。

正确的该店店页（实测可打开，标题 "Order Maggie's Place | Menu & Prices | Queenstown"）：

```
https://www.ubereats.com/nz/store/maggies-place/uKSDuOrQUIOmYUKoY25A4g?diningMode=PICKUP
```

去掉 `utm_*` / `rwg_token` 等一次性跟踪参数后该链接稳定可用。弹窗里的另外三项（Call、Facebook、`#catering` 外烩询价）实测正常。

## 四、设计与技术做法

- **配色**：`--smoke-900 #12100F` 系深烟底 + 琥珀橙主按钮 + Playfair Display 衬线标题，走"烟熏房"视觉而非通用餐厅模板。
- **字体依赖外部**：标题 Playfair Display、正文 Inter 由 Google Fonts 加载（`fonts.googleapis.com` / `fonts.gstatic.com`），因此英文 README 里 "zero external dependencies" 的说法只对**构建**成立，运行时仍有外部字体请求。CSS 里写了完整系统字体回退链，字体拉不到时版面不塌。
- **营业状态是纯前端算的**：`js/main.js` 用 `toLocaleString('en-US', {timeZone:'Pacific/Auckland'})` 取新西兰时间，再按分钟区间判定四种状态（10 点前 / 10–11 点开门但 BBQ 未到 / 11–14 点全开 / 14–15 点"售完即止"），闭店时按星期推算下一次开门文案，60 秒刷新一次，并给营业时间表的当天行加高亮。夏令时靠时区库自动处理，无需改代码。
- **外烩估算器**：按 0.4 kg/人 推算肉量（牛腩 0.22 kg + 肋排/五花 0.18 kg），报价区间 28–36 NZD/人（代码注释写的是 28–38，与实际计算不符），按人数分三档推荐套餐，最后拼成一封 `mailto:` 询价邮件发给 maggiesplacebbq@gmail.com。**没有后端，所有表单都是 mailto: 或外链**。
- **可访问性**：12 个 `<img>` 全部写了 `alt`；弹窗有 `role="dialog"`、`aria-modal`、`aria-labelledby` 与关闭按钮 `aria-label`；支持 ESC 关闭弹窗与抽屉；背景遮罩点击可关。

## 五、移动端优先的具体做法

- 底部固定 **Call · Directions · Order · Instagram** 四键操作栏，用 `env(safe-area-inset-bottom)` 避让 iPhone 手势区；桌面端隐藏。
- 视口声明带 `viewport-fit=cover`；导航在移动端收进抽屉（hamburger），点击链接后自动关闭。
- 图片按需加载：12 个 `<img>` 里 10 个带 `loading="lazy"`，只有 logo 与首屏 hero 立即加载。首屏负载约 **291 KB**（HTML 52,190 B + CSS 33,340 B + JS 12,243 B + hero JPEG 191,610 B + logo 1,914 B）。
- 390 px 视口实测无横向溢出、四键栏完整显示（用 390 px 宽 iframe 包裹线上页面渲染，避开 headless Edge 窗口宽≠CSS 视口宽的坑）。320 / 375 / 430 px 未用同法复测。
- 尚未做：图片只有 JPEG，没有 WebP/AVIF 与 `srcset`；hero 191 KB 未压缩；没有 `manifest.webmanifest` 与应用图标，加不到主屏。

## 六、其他已知问题（按影响排序）

1. **菜单筛选有两个空标签**：6 个分类按钮中 `combos`（Combos & Sides）与 `catering`（Chalet Catering）在 6 张 `data-category` 卡片里没有任何匹配项（实际只有 `sandwiches` / `meats` / `pies`），点击后菜单区整块空白。要么补卡片，要么删标签。
2. **`og:url` 写了未持有的域名** `https://maggiesplacebbq.co.nz`，且页面**没有 `<link rel="canonical">`**；`og:image` 与 JSON-LD 的 `image` 用相对路径，社交抓取大概率取不到图。分享预览需要改成线上绝对地址。
3. **JSON-LD 坐标偏差约 2 km**：结构化数据写 `-45.0252, 168.7368`（落在皇后镇镇中心一侧），Google 地点实际坐标 `-45.0062434, 168.7517092`。
4. `/favicon.ico` 返回 404：站内引用的是 `assets/images/favicon.svg`，浏览器按惯例探测 `/favicon.ico` 时拿不到。
5. 价格格式不统一：同一份菜单里混用 `$9` / `$9.00` / `$15` / `$15.00`。
6. 嵌入的 Google 地图 iframe 用地址查询（`maps?q=11 Margaret Place...&output=embed`），不带地点标识，可能显示成"该地址"而非这家店的主页卡片。

## 七、交付与验证状态

- 站点代码与本文档以 `main` 分支直发部署，**没有使用 GitHub Actions**（当前 GitHub token 无 `workflow` 权限）。Pages 构建状态 `built`。
- 线上已实测：`index.html` 与本地逐字节一致（52,190 B），`css` / `js` / 5 张 JPEG / 2 个 SVG 全部 200 且字节数与本地相同，控制台无 error / warn，Google Fonts 与样式表均加载成功，营业状态与 Google 地点页一致。
- 首次部署时本机到 `github.com:443` 的 git 传输不可用，改用 api.github.com 的 Data API 重建提交推上去，因此本地 HEAD 与远端 sha 不同（内容一致，blob sha 逐个比对过），需要 `git fetch origin && git reset --hard origin/main` 对齐。
- 本文档列出的问题（订餐链接、菜单价格与烟熏时长、空筛选标签、OG/canonical、坐标）**均未修改**，等店家确认口径后再动站点。
