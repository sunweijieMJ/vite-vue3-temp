<template>
    <div ref="rootRef" class="custom-aside">
        <div class="menu-container">
            <!-- logo -->
            <h1 class="logo" @click="skipDashboard">
                <svg class="icon" aria-hidden="true" width="46px" height="46px">
                    <use xlink:href="#iconLogo" />
                </svg>
            </h1>
            <!-- menu -->
            <el-menu ref="menuRef" :default-active="defaultActive" :collapse-transition="false" :collapse="true" text-color="#6F7178" active-text-color="#B95881">
                <sidebar-item v-for="item in asideList" :key="item.path" :item="item" :base-path="item.path" :is-collapse="menuCollapse" :disabled="!menuCollapse" :is-jump="true" @switchAside="switchAside" />
                <span class="line" :style="[{transform: 'translateY(' + state.lineOffsetTop + 'px)'}, {visibility: state.lineOffsetTop >= 0 ? 'initial' : 'hidden'}]" />
            </el-menu>
        </div>
        <!-- setting -->
        <div class="setting" @click.prevent="toggleMenu">
            <svg class="icon" aria-hidden="true" width="22px" height="20px">
                <use :xlink:href="`#${menuCollapse ? 'iconcaidanzhankai' : 'iconcaidanshouqi'}`" />
            </svg>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { CurMenuType } from '@/store/types';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
    name: 'LayoutAside',
    components: {
        SidebarItem
    },
    setup() {
        const $store = useStore();
        const $route = useRoute();
        const $router = useRouter();

        let rootRef = ref<HTMLElement|null>(null);
        let menuRef = ref<any|null>(null);

        const state: {
            lineOffsetTop: number;
            activeMenu: {
                routePath?: string;
            };
            defaultMenu: {
                routePath?: string;
            };
        } = reactive({
            lineOffsetTop: -100,
            activeMenu: {},
            defaultMenu: {}
        });

        let defaultActive = computed(() => {
            return state.activeMenu.routePath;
        });

        let menuCollapse = computed(() => {
            return $store.state.basic.menuCollapse;
        });

        let firstMenu = computed(() => {
            return $store.state.basic.firstMenu;
        });

        let asideList = computed(() => {
            return firstMenu.value.children.filter((item: CurMenuType) => item.tab !== false);
        });

        // 过滤字符串
        const trimStr = (str: string): string => {
            if (!str) return '';
            // 去除空白
            str = str.replace(/^\s+|\s+$/g, '');
            // 去除首尾/
            str = str.replace(/\/$/g, '');
            return str;
        };

        // 跳转dashboard
        const skipDashboard = () => {
            const path = trimStr(window.location.pathname).split('/')[1];
            if (['pim'].includes(path)) {
                $router.push({ path: '/' + path + '/dashboard' });
            } else {
                $router.push({ path: '/' + path });
            }
        };

        // 菜单收起/展开切换
        const toggleMenu = () => {
            $store.dispatch('basic/toggleMenuCollapse', !menuCollapse.value);
        };

        // 遍历路由树
        const findChild = (menu: CurMenuType, pathname: string) => {
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

        // 初始化aside导航
        const initMenu = () => {
            if (!firstMenu.value?.children?.length) return;
            // 查询二级菜单
            const pathname = window.location.pathname;
            const secondMenu = firstMenu.value.children.find((item: CurMenuType) => item.routeName === pathname.split('/')[2]);
            if (secondMenu) {
                $store.dispatch('basic/switchSecondMenu', secondMenu);
                // 查询默认路由和激活路由
                findChild(secondMenu, pathname);
            }

            // 激活三级菜单
            if (state.activeMenu.routePath) {
                nextTick(() => {
                    menuRef.value.activeIndex = state.activeMenu.routePath;
                });
                $store.dispatch('basic/switchThirdMenu', state.activeMenu);
            }

            nextTick(() => {
                // 切换active样式
                const item = rootRef.value?.querySelector('.el-menu .is-active');
                const line = rootRef.value?.querySelector('.el-menu .line');

                if (item) {
                    const offsetTop = (item as HTMLElement).offsetTop;
                    const offsetHeight = (item as HTMLElement).offsetHeight;
                    state.lineOffsetTop = offsetTop + ((offsetHeight - (line as HTMLElement).offsetHeight) / 2);
                } else {
                    state.lineOffsetTop = -100;
                }
            });
        };

        // 切换导航
        const switchAside = (item: CurMenuType) => {
            findChild(item, item.routePath);
            state.activeMenu = state.defaultMenu;

            $router.push({ path: state.activeMenu.routePath as string });

            // 查询二级路由
            nextTick(() => {
                initMenu();
                // 手动更新索引
                nextTick(() => {
                    menuRef.value.activeIndex = state.activeMenu.routePath;
                });
            });
        };

        watch(() => $route.fullPath, () => {
            initMenu();
        });

        watch(firstMenu, () => {
            initMenu();
        }, {immediate: true});

        return {
            rootRef, menuRef, state, defaultActive, menuCollapse, asideList,
            skipDashboard, toggleMenu, switchAside
        };
    }
});
</script>
<style lang="scss" scoped>
    .custom-aside {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 60px;
        height: 100%;
        padding-bottom: 48px;
        border-right: 1px solid #e8e8e8;
        .menu-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: inherit;
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                width: inherit;
                height: 100px;
                cursor: pointer;
            }
        }
        .setting {
            cursor: pointer;
        }

        ::v-deep(.el-menu) {
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            // border-right: none 0;
            // aside样式覆盖
            >.sidebar-item {
                display: flex;
                align-items: center;
                width: 100%;
                height: 36px;
                margin: 17px 0;
                &:first-of-type {
                    margin-top: 0;
                }
                .el-submenu {
                    width: 100%;
                }
                .el-submenu__title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .icon-box ~ .el-submenu__icon-arrow {
                        display: none;
                    }
                }
            }
            .line {
                transition: 0.3s all;
                position: absolute;
                left: 0; top: 0;
                content: '';
                width: 4px;
                height: 36px;
                background-color: #F1B7D0;
            }
        }
    }
</style>
