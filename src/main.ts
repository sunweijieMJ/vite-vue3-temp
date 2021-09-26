import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FilterType } from './utils/filters';
import * as CustomPlugin from './plugin';
import * as CustomComponents from './components/custom';
// 解决滚动背景warning
import 'default-passive-events';
// 引入nprogress样式
import 'nprogress/nprogress.css';
// 路由拦截注册
import './router/intercept';

// 扩展window类型
declare global {
    interface Window {
        env: {
            VITE_BASEURL: string;
            VITE_WEBURL: string;
            VITE_MICROAPPS: string[];
        };
    }
}

// 对vue进行类型补充说明
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $filters: FilterType
    }
}

const app = createApp(App);

// 注册全局组件
app.use(CustomComponents);
// 注册全局 插件/过滤器/指令
app.use(CustomPlugin);

app.use(router).use(store).mount('#container');
