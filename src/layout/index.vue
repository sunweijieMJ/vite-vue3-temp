<template>
    <div class="layout">
        <layout-aside :active-menu="state.activeMenu" />
        <div class="container">
            <layout-header />
            <div class="main">
                <layout-nav :active-menu="state.activeMenu" />
                <div id="micro-app">
                    <demo />
                </div>
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
import mockMenu from '@/config/menu';
import store, { State } from '@/store';
import storage from '@/utils/storage';
import Demo from './Demo.vue';

export default defineComponent({
    name: 'Layout',
    components: {
        LayoutAside, LayoutHeader, LayoutNav, ModifyPass, ServeError, Demo
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
                // const menuListInfo = res.data;
                const menuListInfo = mockMenu;

                store.commit('basic/MENU_LIST', menuListInfo);
                // 初始化
                initMenu();
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
