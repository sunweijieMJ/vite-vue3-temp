# vite-vue3.0

## The directory structure
```
|-- public                          # 静态资源
|   |-- config.js                   # 配置文件
|   |-- favicon.ico                 # favicon图标
|-- src                             # 源代码
|   |-- api                         # api请求
|   |   |-- modules                 # 模块
|   |   |-- types                   # 接口定义
|   |   |-- abstract.ts             # 基类
|   |   |-- config.ts               # 字典表
|   |   |-- index.ts                # 入口文件
|   |   |-- intercept.ts            # 拦截器
|   |-- assets                      # 主题 变量等资源
|   |   |-- scss                    # scss变量
|   |   |-- theme                   # elemet主题
|   |-- components                  # 全局公共组件
|   |-- config                      # 全局公共配置
|   |-- layout                      # 全局layout
|   |-- locale                      # 国际化
|   |-- plugin                      # 三方插件
|   |-- router                      # 全局路由
|   |-- store                       # 全局vuex
|   |-- utils                       # 全局公用方法
|   |   |-- directives              # 指令
|   |   |-- storage                 # 持久化
|   |   |-- filters.ts              # 过滤器
|   |   |-- pager.ts                # 发布订阅
|   |   |-- tools.ts                # 工具函数
|   |-- views                       # 所有页面
|   |-- App.vue                     # 入口页面
|   |-- main.ts                     # 入口文件
|   |-- shims-vue.d.ts              # ts声明文件
|-- static                          # 静态资源
|   |-- img                         # img
|   |-- svg                         # svg
|-- .editorconfig                   # editorconfig
|-- .env.dev                        # 环境变量 开发
|-- .env.pro                        # 环境变量 生产
|-- .env.proxy                      # 环境变量 代理
|-- .eslintignore                   # eslintignore
|-- .eslintrc.js                    # eslint 配置项
|-- .gitignore                      # gitignore
|-- babel.config.js                 # babel 配置项
|-- index.html                      # html模板
|-- package.json                    # package.json
|-- README.md                       # README
|-- tsconfig.json                   # tsconfig
|-- vite.config.ts                  # vite 配置文件
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
