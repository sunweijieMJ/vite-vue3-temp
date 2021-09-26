import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { i18n } from '@/plugin';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: i18n.global.t('routerIndex.t103'),
        },
    },
    {
        path: '/:catchAll(.*)',
        name: 'Layout',
        component: Layout,
        meta: {
            title: 'Layout',
        },
    },
    // {
    //     path: '/:catchAll(.*)',
    //     name: 'NotFount',
    //     component: () => import('@/views/404.vue'),
    //     meta: {
    //         title: '页面不存在'
    //     }
    // }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    },
});

export default router;
