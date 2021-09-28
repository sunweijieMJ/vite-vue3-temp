<template>
  <div v-if="total" class="custom-pagination">
    <div class="total">
      {{ $t('baseCustomPagination.t1') }} {{ total }}
      {{ $t('baseCustomPagination.t2') }} {{ currentPage }} /
      {{ Math.ceil(total / currentSize) }} {{ $t('baseCustomPagination.t3') }}
    </div>
    <el-pagination
      v-model:currentPage="currentPage"
      :page-size="pageSize"
      :total="total"
      :pager-count="pagerCount"
      layout="prev, pager, next, sizes, jumper"
      :page-sizes="pageSizes"
      :popper-class="popperClass"
      :prev-text="prevText"
      :next-text="nextText"
      :disabled="disabled"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue';

export default defineComponent({
  name: 'CustomPagination',
  props: {
    // 当前页
    pageNum: {
      type: Number,
      default: 1,
    },
    // 每页显示条目个数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总条目数
    total: {
      type: Number,
      default: 0,
    },
    // 页码按钮的数量，当总页数超过该值时会折叠
    pagerCount: {
      type: Number,
      default: 9,
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    // 每页显示个数选择器的下拉框类名
    popperClass: {
      type: String,
      default: '',
    },
    // 替代图标显示的上一页文字
    prevText: {
      type: String,
      default: '',
    },
    // 替代图标显示的下一页文字
    nextText: {
      type: String,
      default: '',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 只有一页时是否隐藏
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    // 目录是否隐藏
    isMenuCollapse: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['handleSizeChange', 'handleCurrentChange'],
  setup(props, { emit }) {
    let currentPage = 1; // 当前页数
    let currentSize = 10; // 当前条目个数

    watchEffect(() => {
      currentPage = props.pageNum;
    });

    watchEffect(() => {
      currentSize = props.pageSize;
    });

    // pageSize 改变时会触发
    const handleSizeChange = (val: number) => {
      currentPage = 1;
      currentSize = val;
      emit('handleSizeChange', val);
    };

    // currentPage 改变时会触发
    const handleCurrentChange = (val: number) => {
      emit('handleCurrentChange', val);
    };

    return {
      currentPage,
      currentSize,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.custom-pagination {
  align-items: center;
  background-color: #fff;
  bottom: 0;
  box-shadow: 0 -8px 10px 0 rgba(232, 235, 244, 0.45);
  box-sizing: border-box;
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 25px;
  position: sticky;
  z-index: 2000;

  .total {
    color: #303133;
    font-size: 13px;
    line-height: 16px;
  }

  ::v-deep(.el-pagination) {
    .el-pager {
      margin: 2px 0;

      .number {
        font-weight: 400;
        height: 24px;
        line-height: 24px;
        margin: 0 5px;
        min-width: 24px;

        &.active {
          background-color: #5755b3;
          border-radius: 2px;
          color: #fff;
        }
      }
    }
  }
}
</style>
