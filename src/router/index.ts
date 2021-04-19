import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { i18n } from '@/plugin';

// 获取i18n对象
const vueI18n = i18n.global;

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: vueI18n.t('routerIndex.t103')
        }
    },
    {
        path: '/:catchAll(.*)',
        name: 'Layout',
        component: Layout,
        meta: {
            title: 'Layout'
        }
    }
    // {
    //     path: '/:catchAll(.*)',
    //     name: 'NotFount',
    //     component: () => import('@/views/404.vue'),
    //     meta: {
    //         title: '页面不存在'
    //     }
    // }
];
const env = import.meta.env;
const router = createRouter({
    history: createWebHistory(env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

export default router;
