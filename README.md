# 微信小程序行业分析工作台

这是一个基于微信小程序原生框架的 TypeScript + Sass 项目。小程序默认直接进入行业分析工作台，底部 Tab 包含“行业分析”和“我的”。项目已接入 Vant Weapp，用于构建更统一的业务页面组件。

## 功能概览

- 行业分析工作台作为首屏入口
- 使用 Vant Weapp 展示核心能力网格、分析流程列表和主操作按钮
- “我的”页面展示默认头像和访客昵称
- 使用自定义导航栏和原生 TabBar

## 技术栈

- 微信小程序原生框架
- TypeScript
- Sass
- Vant Weapp
- 自定义导航栏组件

## 目录结构

```text
.
├── miniprogram/
│   ├── app.json
│   ├── app.ts
│   ├── assets/
│   ├── components/
│   │   └── navigation-bar/
│   └── pages/
│       ├── industry/    # 行业分析工作台
│       ├── profile/     # 我的
│       └── logs/        # 日志页
├── typings/
├── package.json
├── project.config.json
└── tsconfig.json
```

## 本地开发

先安装依赖：

```powershell
npm install
```

然后使用微信开发者工具打开项目根目录。

项目的 `miniprogramRoot` 是 `miniprogram/`，npm 包安装在项目根目录，因此已在 `project.config.json` 中启用手动 npm 构建映射。首次安装依赖后，需要在微信开发者工具中执行：

```text
工具 -> 构建 npm
```

构建完成后会生成 `miniprogram/miniprogram_npm/`，Vant Weapp 组件才能在页面中正常使用。

## 页面说明

- `pages/industry`：小程序首屏，行业分析工作台，使用 Vant Weapp 的按钮、网格、单元格等组件展示核心能力和分析流程。
- `pages/profile`：展示当前用户信息，未设置资料时展示默认头像和访客昵称。
- `pages/logs`：基础日志页面。

## 当前启动页

`miniprogram/app.json` 中的第一个页面是：

```json
"pages": [
  "pages/industry/industry",
  "pages/profile/profile",
  "pages/logs/logs"
]
```

因此小程序启动后会直接进入 `pages/industry/industry`，当前没有登录页路由。

## Vant Weapp 使用方式

页面按需注册组件，例如 `miniprogram/pages/industry/industry.json`：

```json
{
  "usingComponents": {
    "van-button": "@vant/weapp/button/index",
    "van-cell": "@vant/weapp/cell/index",
    "van-cell-group": "@vant/weapp/cell-group/index",
    "van-grid": "@vant/weapp/grid/index",
    "van-grid-item": "@vant/weapp/grid-item/index",
    "van-icon": "@vant/weapp/icon/index"
  }
}
```

如果新增 Vant 组件，安装依赖后记得重新执行“构建 npm”。

## 常见问题

### 提示 npm package not found

请确认已经执行：

```powershell
npm install
```

并在微信开发者工具中执行：

```text
工具 -> 构建 npm
```

如果仍然报错，检查 `project.config.json` 中是否保留了：

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

当前项目已去掉登录页，“我的”页面默认展示访客信息。  
如果后续需要恢复用户资料填写，微信小程序现在不能通过 `wx.getUserProfile()` 自动拿到真实头像和昵称，需要使用：

- `<button open-type="chooseAvatar">` 选择头像
- `<input type="nickname">` 填写或选择昵称

当前项目已去掉登录页，默认直接进入行业分析页面；如果后续恢复资料填写流程，可以继续使用上述方式保存用户选择的信息。
