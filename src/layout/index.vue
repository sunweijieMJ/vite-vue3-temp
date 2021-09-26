<template>
    <div class="layout">
        <LayoutHeader :first-menu="firstMenu" />
        <LayoutAside :first-menu="firstMenu" :active-menu="state.activeMenu" />
        <LayoutNav :second-menu="secondMenu" :active-menu="state.activeMenu" />
        <div id="micro-app">
            <demo />
        </div>
    </div>
</template>
<script lang="ts">
import {
    defineComponent, computed, watch, onMounted, reactive,
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { LayoutAside, LayoutHeader, LayoutNav } from './components/index';

import { CurMenuType } from '@/store/types';
// import mockMenu from '@/config/menu';
import store, { State } from '@/store';
import storage from '@/utils/storage';
import Demo from './Demo.vue';

export default defineComponent({
    name: 'Layout',
    components: {
        LayoutAside, LayoutHeader, LayoutNav, Demo,
    },
    setup() {
        const $i18n = useI18n();
        const $store = useStore<State>();
        const $route = useRoute();
        const $router = useRouter();

        const state: {
            activeMenu: Partial<CurMenuType>,
            defaultMenu: Partial<CurMenuType>
        } = reactive({
            activeMenu: {},
            defaultMenu: {},
        });

        let curPathname = window.location.pathname;

        const menuList = computed(() => $store.state.basic.menuList);

        const firstMenu = computed<Partial<CurMenuType>>(() => {
            if (!$store.state.basic.menuList?.length) return {};

            const firstMenu = menuList.value.find((item) => item.routeName === curPathname.split('/')[1]);
            const defaultMenu = $store.state.basic.menuList[0];

            if (!firstMenu) curPathname = defaultMenu.routePath;

            return firstMenu ?? defaultMenu;
        });

        const secondMenu = computed<Partial<CurMenuType>>(() => {
            if (!firstMenu.value?.children?.length) return {};

            const secondMenu = firstMenu.value.children.find((item) => item.routeName === curPathname.split('/')[2]);
            const defaultMenu = firstMenu.value.children[0];

            if (!secondMenu) curPathname = defaultMenu.routePath;

            return secondMenu ?? defaultMenu;
        });

        // 收集权限集合
        const collectPermissions = (menuMap: Map<string, string[]>, menuList: CurMenuType[]) => {
            menuList.forEach((item) => {
                if (item.permissions?.length) {
                    menuMap.set(item.routePath, item.permissions);
                }
                if (item.children?.length) {
                    collectPermissions(menuMap, item.children);
                }
            });
        };

        // 遍历路由树
        const findChild = (menu: CurMenuType, curPathname: string) => {
            if (menu.children?.length) {
                for (let i = menu.children.length - 1; i >= 0; i--) {
                    findChild(menu.children[i], curPathname);
                }
            } else {
                if (menu.tab && menu.routePath.includes(curPathname)) {
                    state.defaultMenu = menu;
                }
                if (menu.routePath === curPathname.split('?')[0]) {
                    state.activeMenu = menu;
                }
            }
        };

        // 初始化
        const initMenu = () => {
            if (!menuList.value.length) {
                ElMessageBox.alert(`${$i18n.t('baseLayoutIndex.t100')}`, `${$i18n.t('baseLayoutIndex.t101')}`, {
                    confirmButtonText: `${$i18n.t('baseLayoutIndex.t102')}`,
                    callback: () => {
                        storage().remove('token');
                        storage('localstorage').remove('token');
                        storage('localstorage').remove('vuex');
                        window.location.href = '/login';
                    },
                });
                return;
            }

            const menuMap = new Map();
            collectPermissions(menuMap, menuList.value);
            $store.dispatch('basic/collectPermissions', menuMap);
        };

        const watchMenu = () => {
            // 重置state
            state.activeMenu = {};
            state.defaultMenu = {};

            // 二级菜单默认跳转
            if (!firstMenu.value?.children?.length) {
                ElMessage.warning('暂无二级菜单，请前往权限管理去添加');
                return;
            }

            // 查询默认路由和激活路由
            findChild(secondMenu.value as CurMenuType, curPathname);
            if (state.activeMenu.routePath) state.defaultMenu = state.activeMenu;

            // 默认跳转
            if (state.defaultMenu.routePath) {
                $router.push({
                    path: state.defaultMenu.routePath,
                    query: {
                        ...$route.query,
                    },
                    params: {
                        ...$route.params,
                    },
                });
            }
        };

        watch(() => $route.fullPath, () => {
            curPathname = window.location.pathname;
            watchMenu();
        });

        const register = () => {
        // 获取app注册表
            store.dispatch('basic/getUserInfo');
            store.dispatch('basic/getMenuList').then((res) => {
                const menuListInfo = res.data;
                // const menuListInfo = mockMenu;

                store.commit('basic/MENU_LIST', menuListInfo);
                // 初始化
                initMenu();
                watchMenu();
            });
        };

        onMounted(() => {
            register();
        });

        return {
            state, firstMenu, secondMenu,
        };
    },
});
</script>
<style lang="scss" scoped>
    .layout {
        display: grid;
        grid-template:
            'aside header header' 50px
            'aside nav main'
            'aside nav main' 1fr / 60px min-content 1fr;
        height: 100vh;
        min-width: 1260px;

        .layout-header {
            grid-area: header;
        }

        .layout-aside {
            grid-area: aside;
        }

        .layout-nav {
            grid-area: nav;
        }

        #micro-app {
            background-color: #f6f7fb;
            grid-area: main;
            overflow-y: auto;
            scroll-behavior: smooth;
            transition: width 0.3s;
            will-change: width;
        }
    }
</style>
