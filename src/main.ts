import { createApp, Directive } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import filters from './utils/filters';
import * as directives from '@/utils/directives/index';
import { element, i18n, moment, lodash } from './plugin';
import * as CustomComponents from './components/custom';
// 引入nprogress样式
import 'nprogress/nprogress.css';
// 路由拦截注册
import './router/intercept';

declare global {
    interface Window {
        env: {
            VITE_BaseURL: string;
        };
    }
}

const app = createApp(App);

// 注册全局组件
app.use(CustomComponents);

// 全局挂载moment
app.config.globalProperties.$moment = moment;

// 全局挂载lodash
app.config.globalProperties.$lodash = lodash;

// 全局挂载过滤器
app.config.globalProperties.$filters = {};
for(const key in filters) {
    app.config.globalProperties.$filters[key] = filters[key];
}

// 挂载全局指令
Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册element
element.components.forEach(component => {
    if (component.name) app.component(component.name, component);
});
Object.values(element.plugins).forEach(plugin => {
    app.use(plugin);
});
app.provide('$message', element.plugins.ElMessage);

app.use(router).use(store).use(i18n).mount('#app');
