<template>
    <el-drawer
        v-model="currentValue"
        :custom-class="`custom-drawer ${customClass}`"
        :size="size"
        :direction="direction"
        :modal="modal"
        :append-to-body="appendToBody"
        :close-on-press-escape="closeOnPressEscape"
        :destroy-on-close="destroyOnClose"
        :before-close="beforeClose"
        :with-header="withHeader"
        @open="$emit('openDialog')"
        @close="$emit('closeDialog')"
    >
        <template #title>
            <slot name="header">
                <div class="header">
                    <i class="iconfont iconjuxing" />
                    <h3 class="title">{{ title }}</h3>
                </div>
            </slot>
        </template>
        <slot />
    </el-drawer>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'CustomDrawer',
    props: {
        visible: {
            type: Boolean
        },
        // Drawer 的自定义类名
        customClass: {
            type: String,
            default: ''
        },
        // Drawer 的标题
        title: {
            type: String,
            default: ''
        },
        // Drawer 窗体的大小
        size: {
            type: String,
            default: '30%'
        },
        // 是否需要遮罩层
        modal: {
            type: Boolean,
            default: true
        },
        // Drawer 打开的方向
        direction: {
            type: String,
            default: 'rtl'
        },
        // Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true
        appendToBody: {
            type: Boolean,
            default: false
        },
        // 是否可以通过按下 ESC 关闭 Drawer
        closeOnPressEscape: {
            type: Boolean,
            default: false
        },
        // 控制是否在关闭 Drawer 之后将子元素全部销毁
        destroyOnClose: {
            type: Boolean,
            default: true
        },
        // 控制是否显示 header 栏
        withHeader: {
            type: Boolean,
            default: true
        },
        // 关闭前的回调,会暂停 Drawer 的关闭
        beforeClose: {
            type: Function,
            default: null
        }
    },
    emits: ['update:visible', 'openDialog', 'closeDialog'],
    setup(props, {emit}) {
        const currentValue = computed({
            get: () => props.visible,
            set: (value) => emit('update:visible', value)
        });

        return {
            currentValue
        };
    }
});
</script>
<style lang="scss">
    .custom-drawer {
        .el-drawer__header {
            padding: 0;
            margin-bottom: 16px !important;
            .header {
                display: flex;
                align-items: center;
                padding: 24px 0;
                .iconfont {
                    font-size: 16px;
                    color: #5755B3;
                }
                .title {
                    margin-left: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 1;
                    color: #222530;
                }
            }
            .el-drawer__headerbtn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 16px;
                height: 16px;
                top: 24px;
                right: 24px;
            }
        }
        .el-drawer__body {
            overflow-y: auto;
        }
    }
</style>
