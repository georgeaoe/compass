# 微信小程序行业分析工作台

基于微信小程序原生框架的 TypeScript + Sass 项目。启动后默认进入行业分析页，底部为自定义 TabBar（「行业分析」「我的」）。已接入 Vant Weapp 与 mp-html，用于交互组件与富文本报告展示。

## 功能概览

### 行业分析（`pages/industry`）

- 首屏展示品牌区与「开始行业分析」主按钮
- 点击后使用本地 mock 数据，以打字机效果逐字渲染 HTML 报告（`mp-html`）
- 报告生成完成后可下载并打开本地 mock PDF（后续可替换为服务端生成）
- 顶部状态栏占位为白色（`.page-top-bar`），页面主体为浅灰背景

### 我的（`pages/profile`）

- 展示头像与昵称；未设置资料时显示默认头像与「访客用户」
- 工作台概览：分析次数、收藏报告数（读取本地 `storage`）
- 最近分析列表（有数据时展示，否则为空状态）
- 配置管理：DeepSeek API Key 本地保存（供后续对接）、关于项目说明

### 其他

- 自定义 TabBar（`custom-tab-bar`，基于 Vant `van-tabbar`）
- `pages/logs`：模板自带的启动日志页，使用 `navigation-bar` 组件，未纳入 TabBar

## 待做

工程：

- [ ] 后端接入
- [ ] 安全防护

功能点：

- [ ] 单个公司分析
- [ ] 川神行为跟踪

优化方向：

- [ ] 页面重新设计
- [ ] 重新取名字、设计logo

## 技术栈

- 微信小程序原生框架（Skyline / glass-easel 配置见 `app.json`）
- TypeScript、Sass
- [Vant Weapp](https://vant-contrib.gitee.io/vant-weapp/) — 按钮、TabBar、单元格等
- [mp-html](https://github.com/jin-yufeng/mp-html) — 富文本报告渲染

## 目录结构

```text
.
├── miniprogram/
│   ├── app.json / app.ts
│   ├── assets/
│   │   ├── logo/              # 品牌 Logo
│   │   └── tabbar/            # TabBar 图标
│   ├── components/
│   │   └── navigation-bar/    # 自定义导航栏（logs 页使用）
│   ├── custom-tab-bar/        # 全局自定义 TabBar
│   ├── utils/
│   │   ├── tabbar.ts          # TabBar 选中态同步
│   │   └── util.ts
│   └── pages/
│       ├── industry/
│       │   ├── industry.*     # 行业分析页
│       │   └── output/        # 本地 mock 数据
│       │       ├── report-tokens.ts   # 打字机 HTML token
│       │       └── pdf-mock.ts        # PDF 文案与生成逻辑
│       ├── profile/           # 我的
│       └── logs/              # 启动日志（模板页）
├── typings/
├── package.json
├── project.config.json
└── tsconfig.json
```

## 本地开发

安装依赖：

```powershell
npm install
```

使用微信开发者工具打开**项目根目录**。

`miniprogramRoot` 为 `miniprogram/`，npm 安装在根目录。首次安装后需在开发者工具中执行：

```text
工具 -> 构建 npm
```

构建完成后生成 `miniprogram/miniprogram_npm/`，`@vant/weapp` 与 `mp-html` 方可正常引用。

## 页面与路由

`app.json` 中页面顺序（首项为启动页）：

```json
"pages": [
  "pages/industry/industry",
  "pages/profile/profile",
  "pages/logs/logs"
]
```

- `navigationStyle` 为 `custom`，行业分析与我的页面通过 `.page-top-bar` 适配状态栏高度，无系统导航栏标题
- Tab 页仅 `industry`、`profile`；无独立登录页

## Mock 数据说明

行业分析当前为**纯前端 mock**，便于联调 UI：

| 文件                                     | 作用                                                    |
| ---------------------------------------- | ------------------------------------------------------- |
| `pages/industry/output/report-tokens.ts` | 打字机正文，按 token 数组逐段/逐字输出                  |
| `pages/industry/output/pdf-mock.ts`      | PDF 文本行、`mockPdfFileName`、`createMockPdfContent()` |

修改报告内容请编辑 `report-tokens.ts`；修改 PDF 文案请编辑 `pdf-mock.ts` 中的 `mockPdfLines`。对接真实接口时，可在 `industry.ts` 的 `runIndustryAnalysis` / `downloadReportPdf` 中替换为网络请求。

## 本地存储键

| 键名              | 说明                                           |
| ----------------- | ---------------------------------------------- |
| `userInfo`        | 用户头像、昵称（`app.globalData` 同步）        |
| `deepseekApiKey`  | 「我的」页配置的 API Key                       |
| `analysisCount`   | 分析次数统计                                   |
| `favoriteReports` | 收藏报告列表                                   |
| `recentAnalyses`  | 最近分析记录                                   |
| `logs`            | 启动时间戳（`app.onLaunch` 写入，logs 页展示） |

## 组件注册示例

行业分析页 `industry.json`：

```json
{
  "usingComponents": {
    "van-button": "@vant/weapp/button/index",
    "mp-html": "mp-html"
  }
}
```

我的页使用 `van-cell`、`van-cell-group`、`van-icon`；自定义 TabBar 使用 `van-tabbar`、`van-tabbar-item`。新增 Vant 组件后需重新「构建 npm」。

## 常见问题

### 提示 npm package not found

1. 在项目根目录执行 `npm install`
2. 微信开发者工具：**工具 -> 构建 npm**
3. 确认 `project.config.json` 中保留手动构建配置：

```json
{
  "packNpmManually": true,
  "packNpmRelationList": [
    {
      "packageJsonPath": "./package.json",
      "miniprogramNpmDistDir": "./miniprogram/"
    }
  ]
}
```

### 用户头像和昵称

项目无登录页。「我的」页在未设置资料时展示访客信息。若需用户自行填写资料，请使用微信推荐能力：

- `<button open-type="chooseAvatar">` 选择头像
- `<input type="nickname">` 填写或选择昵称

将结果写入 `wx.setStorageSync('userInfo', ...)` 并与 `app.globalData.userInfo` 同步即可。
