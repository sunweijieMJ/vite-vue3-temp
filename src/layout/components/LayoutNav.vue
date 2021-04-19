<template>
    <div v-if="secondMenu.children && secondMenu.children.length" class="custom-menu" :class="menuCollapse ? 'hide' : 'show'">
        <h3 class="menu-title">{{ secondMenu.title }}</h3>
        <el-menu ref="menuRef" :default-active="defaultActive" :collapse-transition="false" :collapse="false" text-color="#6F7178" active-text-color="#B95881">
            <sidebar-item v-for="item in secondMenu.children" :key="item.path" :item="item" :base-path="item.path" :is-collapse="false" />
        </el-menu>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { CurMenuType } from '@/store/types';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
    name: 'LayoutNav',
    components: {
        SidebarItem
    },
    setup() {
        const $store = useStore();
        const $route = useRoute();
        let menuRef = ref<any|null>(null);

        const state: {
            activeMenu: {
                routePath?: string;
            }
        } = reactive({
            activeMenu: {}
        });

        let defaultActive = computed(() => {
            return state.activeMenu.routePath;
        });

        let secondMenu = computed(() => {
            return $store.state.basic.secondMenu;
        });

        let menuCollapse = computed(() => {
            return $store.state.basic.menuCollapse;
        });

        // 遍历路由树
        const findChild = (menu: CurMenuType, pathname: string) => {
            if (menu.children?.length) {
                for (let i = menu.children.length - 1; i >= 0; i--) {
                    findChild(menu.children[i], pathname);
                }
            } else {
                if (menu.routePath === pathname) {
                    state.activeMenu = menu;
                }
            }
        };

        // 初始化aside导航
        const initMenu = () => {
            if (!secondMenu.value?.children?.length) return;
            // 查询二级菜单
            const pathname = window.location.pathname;
            findChild(secondMenu.value, pathname);

            // 激活三级菜单
            if (state.activeMenu.routePath) {
                // 手动更新索引
                nextTick(() => {
                    menuRef.value.activeIndex = state.activeMenu.routePath;
                });
            }
        };

        watch(() => $route.fullPath, () => {
            initMenu();
        });

        watch(secondMenu, () => {
            initMenu();
        }, {immediate: true});

        return {
            menuRef, state, defaultActive, secondMenu, menuCollapse
        };
    }
});
</script>
<style lang="scss" scoped>
    .custom-menu {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        width: 170px;
        background-color: #fff;
        will-change: width;
        transition: width 0.3s;
        overflow: hidden;
        &.show {
            width: 170px;
        }
        &.hide {
            width: 0;
        }
        .menu-title {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            width: 170px;
            height: 50px;
            padding: 0 30px;
            font-size: 16px;
            font-weight: 600;
            color: #6F7178;
        }
        ::v-deep(.el-menu) {
            width: 170px;
            flex: 1;
            overflow-y: auto;
            border-right: none 0;
        }
    }
</style>
