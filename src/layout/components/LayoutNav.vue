<template>
    <div v-if="secondMenu.children && secondMenu.children.length" class="custom-menu" :class="menuCollapse ? 'hide' : 'show'">
        <h3 class="menu-title">{{ secondMenu.title }}</h3>
        <el-menu
            :key="defaultActive"
            :default-active="defaultActive"
            :collapse-transition="false"
            :collapse="false"
            text-color="#6F7178"
            active-text-color="#B95881"
        >
            <sidebar-item v-for="item in secondMenu.children" :key="item.path" :item="item" :base-path="item.path" :is-collapse="false" />
        </el-menu>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
    name: 'LayoutNav',
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

        let defaultActive = computed(() => {
            return props.activeMenu.routePath;
        });

        let secondMenu = computed(() => {
            return $store.state.basic.secondMenu;
        });

        let menuCollapse = computed(() => {
            return $store.state.basic.menuCollapse;
        });

        return {
            defaultActive, secondMenu, menuCollapse
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
