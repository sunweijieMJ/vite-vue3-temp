<template>
  <div
    v-if="secondMenu.children && secondMenu.children.length"
    class="layout-nav"
    :class="menuCollapse ? 'hide' : 'show'"
  >
    <h3 class="menu-title">{{ secondMenu.title }}</h3>
    <el-menu
      :key="defaultActive"
      :default-active="defaultActive"
      :collapse-transition="false"
      :collapse="false"
      text-color="#6F7178"
      active-text-color="#B95881"
    >
      <sidebar-item
        v-for="item in secondMenu.children"
        :key="item.routePath"
        :item="item"
        :base-path="item.routePath"
        :is-collapse="false"
      />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useStore } from 'vuex';
import { CurMenuType } from '@/store/types';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
  name: 'LayoutNav',
  components: {
    SidebarItem,
  },
  props: {
    secondMenu: {
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

    const defaultActive = computed(() => props.activeMenu.routePath);

    const menuCollapse = computed(() => $store.state.basic.menuCollapse);

    return {
      defaultActive,
      menuCollapse,
    };
  },
});
</script>
<style lang="scss" scoped>
.layout-nav {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.3s;
  width: 170px;
  will-change: width;

  &.show {
    width: 170px;
  }

  &.hide {
    width: 0;
  }

  .menu-title {
    @include tofl(100%);

    color: #6f7178;
    font-size: 16px;
    font-weight: 600;
    height: 50px;
    line-height: 50px;
    padding: 0 30px;
  }

  ::v-deep(.el-menu) {
    border-right: none 0;
    flex: 1;
    overflow-y: auto;
  }
}
</style>
