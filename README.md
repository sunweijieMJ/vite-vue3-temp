<p align="center">
    <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        <img width="180" src="https://vitejs.dev/logo.svg" alt="Vite logo">
    </a>
</p>
<br/>
<p align="center">
    <a href="https://npmjs.com/package/node"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatility"></a>
    <a href="https://npmjs.com/package/npm"><img src="https://img.shields.io/badge/npm-v6.13.4-blue" alt="npm package"></a>
    <a href="https://npmjs.com/package/vue"><img src="https://img.shields.io/badge/vue-v3.0.5-success" alt="vue package"></a>
    <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/badge/vite-v2.2.1-blue" alt="vite package"></a>
</p>

# vite vue3 temp

## 简介

> 使用最新的`vue3`,`vite2`,`typescript`等主流技术搭建的一个供学习参考的模版工程。

## 包含

- **技术栈**：使用 `vue3`,`vite`,`typescript`等前沿技术开发
- **ajax**：二次封装`axios`，统一管理接口
- **主题**：可自行修改`element-plus`主题样式
- **国际化**：完善的国际化方案
- **路由**：动态路由生成方案
- **组件**：二次封装了常用的组件
- **工具**：常用的指令，过滤器，`storage`存储，工具函数

## 目录结构

```md
|-- public # 静态资源
| |-- config.js # 配置文件
| |-- favicon.ico # favicon 图标
|-- src # 源代码
| |-- api # api 请求
| | |-- modules # 模块
| | |-- types # 接口定义
| | |-- abstract.ts # 基类
| | |-- config.ts # 字典表
| | |-- index.ts # 入口文件
| | |-- intercept.ts # 拦截器
| |-- assets # 主题 变量等资源
| | |-- scss # scss 变量
| | |-- theme # elemet 主题
| |-- components # 全局公共组件
| |-- config # 全局公共配置
| |-- layout # 全局 layout
| |-- locale # 国际化
| |-- plugin # 三方插件
| |-- router # 全局路由
| |-- store # 全局 vuex
| |-- utils # 全局公用方法
| | |-- directives # 指令
| | |-- storage # 持久化
| | |-- filters.ts # 过滤器
| | |-- pager.ts # 发布订阅
| | |-- tools.ts # 工具函数
| |-- views # 所有页面
| |-- App.vue # 入口页面
| |-- main.ts # 入口文件
| |-- shims-vue.d.ts # ts 声明文件
|-- static # 静态资源
| |-- img # img
| |-- svg # svg
|-- .editorconfig # editorconfig
|-- .env.dev # 环境变量 开发
|-- .env.pro # 环境变量 生产
|-- .env.proxy # 环境变量 代理
|-- .eslintignore # eslintignore
|-- .eslintrc.js # eslint 配置项
|-- .gitignore # gitignore
|-- babel.config.js # babel 配置项
|-- index.html # html 模板
|-- package.json # package.json
|-- README.md # README
|-- tsconfig.json # tsconfig
|-- vite.config.ts # vite 配置文件
```

## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn serve dev
```

### Compiles and minifies for production

```
yarn build pro
```

### Lints and fixes files

```
yarn lint
```

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                             not support                                                                                              |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |
