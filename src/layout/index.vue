<template>
    <div class="layout">
        <layout-aside :active-menu="state.activeMenu" />
        <div class="container">
            <layout-header />
            <div class="main">
                <layout-nav :active-menu="state.activeMenu" />
                <div id="micro-app" />
            </div>
        </div>
        <modify-pass />
        <serve-error />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { LayoutAside, LayoutHeader, LayoutNav } from './components/index';
import { ModifyPass, ServeError } from '@/components/basic';
import { CurMenuType } from '@/store/types';
import microApps from '@/config/microApps';
// import mockMenu from '@/config/menu';

import store, { State } from '@/store';
import basicStore from '@/store/modules/basic';
import * as CustomComponent from '@/components/custom';
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

// 环境变量
const env = import.meta.env;

export default defineComponent({
    name: 'Layout',
    components: {
        LayoutAside, LayoutHeader, LayoutNav, ModifyPass, ServeError
    },
    setup() {
        const $i18n = useI18n();
        const $store = useStore<State>();
        const $route = useRoute();
        const $router = useRouter();

        const state: {
            activeMenu: {
                routePath?: string;
            },
            defaultMenu: {
                routePath?: string;
            }
        } = reactive({
            activeMenu: {},
            defaultMenu: {}
        });

        let pathname = window.location.pathname;

        let menuList = computed(() => {
            return $store.state.basic.menuList;
        });

        let firstMenu = computed(() => {
            return $store.state.basic.firstMenu;
        });

        let secondMenu = computed(() => {
            return $store.state.basic.secondMenu;
        });

        // 遍历路由树
        let findChild = (menu: CurMenuType, pathname: string) => {
            if (menu.children?.length) {
                for (let i = menu.children.length - 1; i >= 0; i--) {
                    findChild(menu.children[i], pathname);
                }
            } else {
                if (menu.tab && menu.routePath.includes(pathname)) {
                    state.defaultMenu = menu;
                }
                if (menu.routePath === pathname) {
                    state.activeMenu = menu;
                }
            }
        };

        const initMenu = () => {
            // 重置state
            state.activeMenu = {};
            state.defaultMenu = {};

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

            // 一级菜单默认跳转
            let activeFirstMenu = menuList.value.find((item: CurMenuType) => item.routeName === pathname.split('/')[1]);

            if (activeFirstMenu) {
                $store.dispatch('basic/switchFirstMenu', activeFirstMenu);
            } else {
                pathname = $store.state.basic.menuList[0].routePath;
                $store.dispatch('basic/switchFirstMenu', $store.state.basic.menuList[0]);
            }

            // 二级菜单默认跳转
            if(!firstMenu.value?.children?.length) {
                ElMessage.warning('暂无二级菜单，请前往权限管理去添加');
                return;
            }

            let activeSecondMenu = firstMenu.value.children.find((item: CurMenuType) => item.routeName === pathname.split('/')[2]);

            if (activeSecondMenu) {
                $store.dispatch('basic/switchSecondMenu', activeSecondMenu);
            } else {
                pathname = firstMenu.value.children[0].routePath;
                $store.dispatch('basic/switchSecondMenu', firstMenu.value.children[0]);
            }

            // 查询默认路由和激活路由
            findChild(secondMenu.value, pathname);
            if(state.activeMenu.routePath) state.defaultMenu = state.activeMenu;

            // 三级菜单默认跳转
            let activeThirdMenu = secondMenu.value?.children?.find((item: CurMenuType) => item.routeName === pathname.split('/')[3]);

            if(activeThirdMenu) {
                $store.dispatch('basic/switchThirdMenu', state.activeMenu);
            } else {
                if(secondMenu.value?.children?.length) {
                    pathname = secondMenu.value.children[0].routePath;
                    $store.dispatch('basic/switchThirdMenu', secondMenu.value.children[0]);
                }
            }

            // 默认跳转
            if (!activeThirdMenu && state.defaultMenu.routePath) {
                $router.push({ path: state.defaultMenu.routePath });
            }
        };

        watch(() => $route.fullPath, () => {
            pathname = window.location.pathname;
            initMenu();
        });

        const register = () => {
        // 获取app注册表
            store.dispatch('basic/getUserInfo');
            store.dispatch('basic/getMenuList').then(res => {
                const menuListInfo = res.data;
                // const menuListInfo = mockMenu;
                let defaultApp = null;
                // 定义子应用数据
                const msg = {
                    pager,
                    storage,
                    filters,
                    directives,
                    CustomComponent,
                    basicI18n: i18n,
                    basicState: store.state,
                    basicStore
                };
                // 微应用数组
                const MICRO_APP = storage('localstorage').get('microApp');

                let webUrl = env.VITE_BUILD_ENV ? window.env.VITE_WebURL : env.VITE_WebURL;
                if (webUrl?.endsWith('/')) {
                    webUrl = webUrl.substr(0, webUrl.length - 1);
                }

                // 部署
                const microApp = microApps.filter((item, index: number) => {
                    if (window.env.VITE_MicroApps.includes(item.name)) {
                        item.props = { ...msg };
                        item.entry = webUrl + item.entry;

                        if (MICRO_APP && MICRO_APP.split(',').includes(item.name)) {
                            item.entry = `//localhost:${7001 + index}/`;
                        }
                        return item;
                    }
                });

                store.commit('basic/MENU_LIST', menuListInfo);
                // 初始化
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

        return {
            state
        };
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
