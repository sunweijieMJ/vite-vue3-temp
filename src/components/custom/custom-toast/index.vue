<template>
    <teleport to="#global-toast">
        <transition name="fade" @after-leave="handleAfterLeave">
            <div v-show="show" class="toast-wrap" :class="[position ? `toast-wrap-${position}` : '', toastTypeClass]">
                <img v-if="type || icon" class="toast-image" :src="toastImageSrc" alt="">
                <span class="toast-text">{{ message }}</span>
            </div>
        </transition>
    </teleport>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, watch, onMounted, toRefs, computed } from 'vue';
import type {
    ToastType
} from './types';

interface ToastDatas {
    show: boolean;
    timer: number | null;
    closed: boolean;
}

const iconUrl: Record<ToastType, string> = {
    success: 'http://xxx.com/icons/success_icon.svg',
    loading: 'http://xxx.com/icons/loading.gif',
    fail: 'http://xxx.com/icons/fail_icon.svg'
};

export default defineComponent({
    name: 'Toast',
    props: {
        message: {
            type: String,
            default: '这个是一个Toast'
        },
        type: {
            type: String as PropType<ToastType>,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 2000
        },
        zIndex: {
            type: Number,
            default: 2000
        },
        position: {
            type: String as PropType<'top' | 'middle' | 'bottom'>,
            default: 'middle'
        },
        onClose: {
            type: Function,
            default: null
        }
    },
    setup(props) {
        const state: ToastDatas = reactive({
            show: true,
            timer: null,
            closed: false
        });

        const toastTypeClass = computed(() => {
            if (!props.type) return ' ';
            return `toast-${props.type}`;
        });

        const toastImageSrc = computed(() => {
            if (props.type) {
                return iconUrl[props.type];
            }
            if (props.icon) {
                return props.icon;
            }
            return '';
        });

        watch(() => state.closed, (newVal) => {
            if (newVal) {
                state.show = false;
            }
        });

        const close = () => {
            state.closed = true;
            // 执行关闭回调
            if (typeof props.onClose === 'function') {
                props.onClose(this);
            }
        };

        const startTimer = () => {
            if (props.duration > 0) {
                state.timer = window.setTimeout(() => {
                    if (!state.closed) {
                        close();
                    }
                }, props.duration);
            }
        };

        const handleAfterLeave = (currentElement: HTMLElement) => {
            if (currentElement && currentElement.parentNode) {
                currentElement.parentNode.removeChild(currentElement);
            }
        };

        onMounted(() => {
            startTimer();
        });

        return {
            ...toRefs(state),
            close,
            toastTypeClass,
            toastImageSrc,
            handleAfterLeave
        };
    }
});
</script>
<style lang="scss" scoped>
    .toast-wrap {
        position: fixed;
        left: 50%; top: 50%;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        transform: translate(-50%, -50%);
        font-size: 20px;
        color: #fff;
        border-radius: 5px;
        background-color: rgba($color: #000, $alpha: 0.75);
        &.toast-wrap-top {
            bottom: auto;
            top: 10%;
        }
        &.toast-wrap-bottom {
            top: auto;
            bottom: 10%;
        }
        .toast-image {
            width: 30px;
            height: auto;
            margin-bottom: 4px;
            color: #fff;
        }
        .toast-text {
            white-space: pre-wrap;
            word-break: break-all;
        }
    }
    // 过渡动画
    .fade-enter-active, .fade-leave-active {
        transition: all 0.5s;
    }
    .fade-leave-active {
        opacity: 0;
    }
</style>
