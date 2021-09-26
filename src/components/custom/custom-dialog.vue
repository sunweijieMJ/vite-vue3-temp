<template>
    <el-dialog
        v-model="currentValue"
        :custom-class="`custom-dialog ${customClass}`"
        :width="width"
        :append-to-body="appendToBody"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :destroy-on-close="destroyOnClose"
        :before-close="beforeClose"
        @open="$emit('openDialog')"
        @close="$emit('cancel')"
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
        <template #footer>
            <slot name="footer">
                <div class="footer-box">
                    <el-button v-if="showCancel" class="btn cancel" @click="$emit('cancel')">{{ cancelText }}</el-button>
                    <el-button v-if="showConfirm" class="btn confirm" @click="$emit('confirm')">{{ confirmText }}</el-button>
                </div>
            </slot>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'CustomDialog',
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        customClass: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '标题',
        },
        width: {
            type: String,
            default: '840px',
        },
        cancelText: {
            type: String,
            default: '取消',
        },
        confirmText: {
            type: String,
            default: '确定',
        },
        showCancel: {
            type: Boolean,
            default: true,
        },
        showConfirm: {
            type: Boolean,
            default: true,
        },
        appendToBody: {
            type: Boolean,
            default: false,
        },
        closeOnClickModal: {
            type: Boolean,
            default: false,
        },
        closeOnPressEscape: {
            type: Boolean,
            default: false,
        },
        destroyOnClose: {
            type: Boolean,
            default: true,
        },
        beforeClose: {
            type: Function,
            default: null,
        },
    },
    emits: ['update:visible', 'openDialog', 'cancel', 'confirm'],
    setup(props, { emit }) {
        const currentValue = computed({
            get: () => props.visible,
            set: (value) => emit('update:visible', value),
        });

        return {
            currentValue,
        };
    },
});
</script>
<style lang="scss">
    .custom-dialog {
        box-sizing: border-box;
        // margin: 0 auto !important;
        // top: 50%;
        // transform: translateY(-50%);
        display: flex;
        flex-direction: column;

        .el-dialog__header {
            padding: 0;

            .header {
                align-items: center;
                display: flex;
                padding: 24px 0;

                .iconfont {
                    color: #5755b3;
                    font-size: 16px;
                }

                .title {
                    color: #222530;
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 1;
                    margin-left: 8px;
                }
            }

            .el-dialog__headerbtn {
                align-items: center;
                display: flex;
                height: 16px;
                justify-content: center;
                right: 24px;
                top: 24px;
                width: 16px;
            }
        }

        .el-dialog__body {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        .el-dialog__footer {
            padding: 0;

            .footer-box {
                align-items: center;
                background: rgba(135, 134, 191, 0.05);
                border-radius: 0 0 6px 6px;
                box-sizing: border-box;
                display: flex;
                justify-content: flex-end;
                padding: 26px 30px;
            }
        }
    }
</style>
