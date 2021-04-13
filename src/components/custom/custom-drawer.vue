<template>
    <el-drawer
        v-if="currentValue"
        v-model:visible="currentValue"
        :direction="direction"
        :modal="modal"
        custom-class="custom-drawer"
        :append-to-body="appendToBody"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :destroy-on-close="destroyOnClose"
        :before-close="beforeClose"
        @open="$emit('openDialog')"
        @close="$emit('closeDialog')"
    >
        <template #title>
            <slot name="header" class="header">
                <i class="iconfont iconjuxing" />
                <h3 class="title">{{ title }}</h3>
            </slot>
        </template>
        <div class="custom-drawer-container">
            <slot />
        </div>
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
        ifConfirm: {
            type: Boolean,
            default: true
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
        showCancel: {
            type: Boolean,
            default: true
        },
        showConfirm: {
            type: Boolean,
            default: true
        },
        // Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true
        appendToBody: {
            type: Boolean,
            default: false
        },
        closeOnClickModal: {
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
            default: false
        },
        // 关闭前的回调，会暂停 Drawer 的关闭
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
        height: 100vh;
        box-sizing: border-box;
        margin: 0 auto !important;
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
            overflow: auto;  // 这里设置才能body中的元素才能滚动
            padding: 0;
            .custom-drawer-container {
                height: 100% !important;
            }
            // overflow: auto;
            // position: relative;
            // padding-bottom: 72px;
            // .footer {
            //     position: absolute;
            //     width: 100%;
            //     height: 72px;
            //     bottom: 0;
            //     box-sizing: border-box;
            //     display: flex;
            //     align-items: center;
            //     justify-content: center;
            //     padding:18px 30px;
            //     border-radius: 0px 0px 6px 6px;
            //     background: rgba(135,134,191, 0.05);
            //     .confirm {
            //         margin-left: 24px;
            //     }
            // }
        }
    }
</style>
