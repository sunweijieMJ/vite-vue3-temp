<template>
    <div ref="rootRef" class="layout-aside">
        <div class="menu-container">
            <!-- logo -->
            <h1 class="logo" @click="skipDashboard">
                <svg class="icon" aria-hidden="true" width="46px" height="46px">
                    <use xlink:href="#iconLogo" />
                </svg>
            </h1>
            <!-- menu -->
            <el-menu :default-active="defaultActive" :collapse-transition="false" :collapse="true" text-color="#6F7178" active-text-color="#B95881">
                <sidebar-item v-for="item in asideList" :key="item.routePath" :item="item" :base-path="item.routePath" :is-collapse="menuCollapse" :disabled="!menuCollapse" :is-jump="true" @switchAside="switchAside" />
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
import {
    defineComponent, ref, reactive, computed, watch, nextTick, PropType,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { CurMenuType } from '@/store/types';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
    name: 'LayoutAside',
    components: {
        SidebarItem,
    },
    props: {
        firstMenu: {
            type: Object as PropType<Partial<CurMenuType>>,
            required: true,
        },
        activeMenu: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const $store = useStore();
        const $router = useRouter();

        const rootRef = ref<HTMLElement|null>(null);

        const state: {
            lineOffsetTop: number;
        } = reactive({
            lineOffsetTop: -100,
        });

        const defaultActive = computed(() => props.activeMenu.routePath);

        const menuCollapse = computed(() => $store.state.basic.menuCollapse);

        const asideList = computed(() => {
            const asideList = props.firstMenu?.children?.filter((item: CurMenuType) => item.tab !== false) ?? [];
            return asideList;
        });

        // 初始化aside导航
        const activeLine = () => {
            nextTick(() => {
                // 切换active样式
                const item = rootRef.value?.querySelector('.el-menu .is-active');
                const line = rootRef.value?.querySelector('.el-menu .line');

                if (item) {
                    const { offsetTop } = item as HTMLElement;
                    const { offsetHeight } = item as HTMLElement;
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

        // 跳转dashboard
        const skipDashboard = () => {
            const curModule = $store.state.basic.menuList.find((item: CurMenuType) => window.location.pathname.startsWith(item.routePath));
            $router.push({ path: curModule.routePath ?? '/' });
        };

        // 切换菜单 收起/展开
        const toggleMenu = () => {
            $store.dispatch('basic/toggleMenuCollapse', !menuCollapse.value);
        };

        return {
            rootRef,
            state,
            defaultActive,
            menuCollapse,
            asideList,
            skipDashboard,
            toggleMenu,
            switchAside,
        };
    },
});
</script>
<style lang="scss" scoped>
    .layout-aside {
        align-items: center;
        border-right: 1px solid #e8e8e8;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        padding-bottom: 48px;
        width: 60px;

        .menu-container {
            align-items: center;
            display: flex;
            flex-direction: column;
            width: inherit;

            .logo {
                align-items: center;
                cursor: pointer;
                display: flex;
                height: 100px;
                justify-content: center;
                width: inherit;
            }
        }

        .setting {
            cursor: pointer;
        }

        ::v-deep(.el-menu) {
            align-items: center;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin: 4px 0;
            position: relative;
            width: 100%;
            // border-right: none 0;
            // aside样式覆盖
            >.sidebar-item {
                align-items: center;
                display: flex;
                height: 36px;
                margin: 17px 0;
                width: 100%;

                &:first-of-type {
                    margin-top: 0;
                }

                .el-submenu {
                    width: 100%;
                }

                .el-submenu__title {
                    align-items: center;
                    display: flex;
                    justify-content: center;

                    .icon-box ~ .el-submenu__icon-arrow {
                        display: none;
                    }
                }
            }

            .line {
                background-color: #f1b7d0;
                content: '';
                height: 36px;
                left: 0;
                position: absolute;
                top: 0;
                transition: 0.3s all;
                width: 4px;
            }
        }
    }
</style>
