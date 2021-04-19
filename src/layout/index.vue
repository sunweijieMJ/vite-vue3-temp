<template>
    <div class="layout">
        <layout-aside />
        <div class="container">
            <layout-header />
            <div class="main">
                <layout-nav />
                <div id="micro-app" />
            </div>
        </div>
        <modify-pass />
        <serve-error />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch, onMounted, reactive } from 'vue';
import { LayoutAside, LayoutHeader, LayoutNav } from './components/index';
import { ModifyPass, ServeError } from '@/components/basic';
import { CurMenuType } from '@/store/types';
import microApps from '@/config/microApps';
// import mockMenu from '@/config/menu';

import store from '@/store';
import basicStore from '@/store/modules/basic';
// import CustomComponent from '@/components/custom';
import pager from '@/utils/pager';
import storage from '@/utils/storage';
import filters from '@/utils/filters';
import { i18n } from '@/plugin';
import * as directives from '@/utils/directives';
// 导入乾坤函数
import {
    registerMicroApps, // 注册子应用方法
    setDefaultMountApp, // 设默认启用的子应用
    prefetchApps, // 预加载子应用
    start, // 启动qiankun
    addGlobalUncaughtErrorHandler // 添加全局未捕获异常处理器
} from 'qiankun';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'Layout',
    components: {
        LayoutAside, LayoutHeader, LayoutNav, ModifyPass, ServeError
    },
    setup() {
        const $i18n = useI18n();
        const $store = useStore();
        const $route = useRoute();
        const $router = useRouter();
        let defaultMenu: any = reactive({});

        let menuList = computed(() => {
            return $store.state.basic.menuList;
        });

        // 遍历路由树
        let findChild = (menu: CurMenuType, pathname: string) => {
            if (menu.children?.length) {
                for (let i = menu.children.length - 1; i >= 0; i--) {
                    findChild(menu.children[i], pathname);
                }
            } else {
                if (menu.routePath && menu.routePath.includes(pathname)) {
                    defaultMenu = menu;
                }
            }
        };

        const initMenu = () => {
            if (!menuList.value.length) {
                ElMessageBox.alert(`${$i18n.t('baseLayoutIndex.t100')}`, `${$i18n.t('baseLayoutIndex.t101')}`, {
                    confirmButtonText: `${$i18n.t('baseLayoutIndex.t102')}`,
                    callback: () => {
                        storage().remove('token');
                        storage('localstorage').remove('token');
                        storage('localstorage').remove('vuex');
                        window.location.href = '/login';
                    }
                });
                return;
            }

            const pathname = window.location.pathname;
            const firstMenu = menuList.value.find((item: CurMenuType) => item.routeName === pathname.split('/')[1]);
            if (firstMenu) {
                $store.dispatch('basic/switchFirstMenu', firstMenu);
            } else {
                $router.push({ path: $store.state.basic.menuList[0].routePath });
                $store.dispatch('basic/switchFirstMenu', $store.state.basic.menuList[0]);
            }

            if (!firstMenu?.children?.length) return;

            // 默认跳转
            if (!pathname.split('/')[2]) {
                findChild(firstMenu, pathname);
                $router.push({ path: defaultMenu.routePath });
            }
        };

        watch(() => $route.fullPath, () => {
            initMenu();
        });

        const register = () => {
        // 获取app注册表
            store.dispatch('basic/getUserInfo');
            store.dispatch('basic/getMenuList').then((res: any) => {
                const menuListInfo = res.data;
                // // const menuListInfo = mockMenu;
                // let defaultApp = null;
                // // 定义子应用数据
                // const msg = {
                //     pager,
                //     storage,
                //     filters,
                //     directives,
                //     // CustomComponent,
                //     basicI18n: i18n,
                //     basicState: store.state,
                //     basicStore
                // };
                // // 微应用数组
                // const MICRO_APP = process.env.MICRO_APP ?? storage('localstorage').get('microApp').split(',');

                // let webUrl = window.env.VUE_APP_WebURL;
                // if (webUrl?.endsWith('/')) {
                //     webUrl = webUrl.substr(0, webUrl.length - 1);
                // }

                // // 公司部署
                // const microApp = microApps.filter((item: any, index: number) => {
                //     if (window.env.VUE_APP_MicroApps.includes(item.name)) {
                //         item.props = { ...msg };
                //         item.entry = webUrl + item.entry;

                //         if (MICRO_APP.length && MICRO_APP.includes(item.name)) {
                //             item.entry = `//localhost:${7001 + index}/`;
                //         }
                //         return item;
                //     }
                // });

                // window.microApp = microApp;

                store.commit('basic/MENU_LIST', menuListInfo);
                // // 初始化
                initMenu();

                // // 预加载子应用
                // prefetchApps(microApp);
                // // 注册子应用
                // registerMicroApps(microApp);
                // // 设置默认子应用
                // if (window.location.pathname.split('/')[1]) {
                //     defaultApp = '/' + window.location.pathname.split('/')[1];
                // }
                // if (!defaultApp) defaultApp = menuListInfo[0].routePath;
                // setDefaultMountApp(defaultApp);
                // // 启动微服务
                // start({
                //     prefetch: true
                // });
                // // 设置全局未捕获一场处理器
                // addGlobalUncaughtErrorHandler(event => console.log(event));
            });
        };

        onMounted(() => {
            register();
        });
    }
});
</script>
<style lang="scss" scoped>
    .layout {
        display: flex;
        width: 100%;
        height: 100vh;
        .container {
            display: flex;
            flex-direction: column;
            width: calc(100vw - 60px);
            min-width: 1200px;
            background-color: #f6f7fb;
            .main {
                display: flex;
                height: calc(100vh - 50px);
                #micro-app {
                    width: 100%;
                    overflow-y: auto;
                    scroll-behavior: smooth;
                }
            }
        }
    }
</style>
