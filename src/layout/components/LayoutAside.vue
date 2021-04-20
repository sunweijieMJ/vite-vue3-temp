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
            <el-menu :default-active="defaultActive" :collapse-transition="false" :collapse="true" text-color="#6F7178" active-text-color="#B95881">
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
import { useRouter } from 'vue-router';
import { CurMenuType } from '@/store/types';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
    name: 'LayoutAside',
    components: {
        SidebarItem
    },
    props: {
        activeMenu: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const $store = useStore();
        const $router = useRouter();

        let rootRef = ref<HTMLElement|null>(null);

        const state: {
            lineOffsetTop: number;
        } = reactive({
            lineOffsetTop: -100
        });

        let defaultActive = computed(() => {
            return props.activeMenu.routePath;
        });

        let menuCollapse = computed(() => {
            return $store.state.basic.menuCollapse;
        });

        let asideList = computed(() => {
            const asideList = $store.state.basic.firstMenu?.children?.filter((item: CurMenuType) => item.tab !== false) ?? [];
            return asideList;
        });

        // 初始化aside导航
        const activeLine = () => {
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

        watch(() => props.activeMenu, () => {
            activeLine();
        });

        // 切换导航
        const switchAside = (item: CurMenuType) => {
            $router.push({ path: item.routePath as string });
        };

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

        // 切换菜单 收起/展开
        const toggleMenu = () => {
            $store.dispatch('basic/toggleMenuCollapse', !menuCollapse.value);
        };

        return {
            rootRef, state, defaultActive, menuCollapse, asideList,
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
            margin: 4px 0;
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
