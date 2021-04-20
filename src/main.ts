import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as CustomPlugin from './plugin';
import * as CustomComponents from './components/custom';
// 解决滚动背景warning
import 'default-passive-events';
// 引入nprogress样式
import 'nprogress/nprogress.css';
// 路由拦截注册
import './router/intercept';

declare global {
    interface Window {
        env: {
            VITE_BaseURL: string;
            VITE_WebURL: string;
            VITE_MicroApps: string[];
        };
    }
}

const app = createApp(App);

// 注册全局组件
app.use(CustomComponents);
// 注册全局 插件/过滤器/指令
app.use(CustomPlugin);

app.use(router).use(store).mount('#container');
