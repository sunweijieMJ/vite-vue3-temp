<template>
  <div
    class="sidebar-item"
    :class="[isCollapse ? 'simple-mode' : 'full-mode']"
    @click.stop="skip"
  >
    <el-submenu
      v-if="item.children && item.children.length"
      :disabled="disabled"
      :index="resolvePath(item.routePath)"
      popper-append-to-body
    >
      <template #title>
        <el-tooltip
          v-if="item.iconCode"
          effect="dark"
          :open-delay="200"
          :content="item.title"
          placement="top"
        >
          <div class="icon-box">
            <svg class="icon" aria-hidden="true" width="20px" height="20px">
              <use :xlink:href="'#' + item.iconCode" />
            </svg>
          </div>
        </el-tooltip>
        <span v-else>{{ item.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="vitem in item.children"
          :key="vitem.routePath"
          :item="vitem"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(vitem.routePath)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
    <template v-else-if="item.tab">
      <sidebar-link :to="resolvePath(item.routePath)">
        <el-menu-item
          v-if="item.iconCode"
          class="icon"
          :index="resolvePath(item.routePath)"
        >
          <el-tooltip
            effect="dark"
            :open-delay="200"
            :content="item.title"
            placement="top"
          >
            <div class="icon-box">
              <svg class="icon" aria-hidden="true" width="20px" height="20px">
                <use :xlink:href="'#' + item.iconCode" />
              </svg>
            </div>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item
          v-else
          class="text"
          :index="resolvePath(item.routePath)"
          >{{ item.title }}</el-menu-item
        >
      </sidebar-link>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import path from 'path-browserify';
import { CurMenuType } from '@/store/types';
import SidebarLink from './SidebarLink.vue';

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarLink,
  },
  props: {
    item: {
      type: Object as PropType<CurMenuType>,
      required: true,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isJump: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['switchAside'],
  setup(props, { emit }) {
    const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }
      return path.resolve(props.basePath, routePath);
    };

    const skip = () => {
      if (props.isJump) {
        emit('switchAside', props.item);
      }
    };

    return {
      resolvePath,
      skip,
    };
  },
});
</script>
<style lang="scss" scoped>
.sidebar-item {
  margin: 4px 0;

  ::v-deep(.el-menu) {
    box-sizing: border-box;
  }

  ::v-deep(.el-submenu__title) {
    display: flex;
    height: 36px;
    line-height: 36px;
    width: 100%;
  }

  .el-menu-item {
    &.icon {
      align-items: center;
      display: flex;
      height: 36px;
      justify-content: center;
      width: 100%;
    }

    &.text {
      box-sizing: border-box;
      display: flex;
      height: 36px;
      line-height: 36px;
      min-width: initial;
      padding-right: 30px !important;

      &.is-active {
        background-color: rgba(246, 215, 228, 0.4);
        font-weight: 600;

        &::after {
          background-color: #f1b7d0;
          content: '';
          height: 36px;
          left: 0;
          position: absolute;
          width: 4px;
        }
      }
    }
  }

  ::v-deep(.is-disabled) {
    .el-submenu__title,
    .el-menu-item {
      background: initial;
      cursor: pointer;
      opacity: 1;
    }
  }
}
</style>
