<template>
    <el-image class="custom-image"
        :src="currentSrc" :alt="alt" :fit="fit" :referrer-policy="referrerPolicy"
        :lazy="lazy" :scroll-container="scrollContainer"
        :preview-src-list="previewSrcList" :hide-on-click-modal="hideOnClickModal" :z-index="zIndex"
        @load="load" @error="error"
    >
        <template #placeholder class="image-slot">
            <img class="default" :style="{'object-fit': fit}" src="https://devops01.oss-cn-shanghai.aliyuncs.com/staticImg/image_loading.jpg" alt="">
        </template>
        <template v-if="currentSrc" #error class="image-slot">
            <img class="default" :style="{'object-fit': fit}" src="https://devops01.oss-cn-shanghai.aliyuncs.com/staticImg/image_error.jpg" alt="">
        </template>
        <template v-else #error class="image-slot">
            <img class="default" :style="{'object-fit': fit}" src="https://devops01.oss-cn-shanghai.aliyuncs.com/staticImg/image_null.jpg" alt="">
        </template>
    </el-image>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { handleImage } from '@/utils/tools';

export default defineComponent({
    name: 'CustomImage',
    props: {
        // 图片源
        src: {
            type: String,
            require: true,
            default: ''
        },
        // 原生 alt
        alt: {
            type: String,
            default: ''
        },
        // 原生 object-fit
        fit: {
            type: String,
            default: 'contain'
        },
        // 原生 referrerPolicy
        referrerPolicy: {
            type: String,
            default: ''
        },
        // oss图片裁切方式
        mode: {
            type: Array as PropType<string[]>,
            default: () => []
        },
        // 是否开启懒加载
        lazy: {
            type: Boolean,
            default: true
        },
        // 开启懒加载后,监听 scroll 事件的容器
        scrollContainer: {
            type: [HTMLElement, String],
            default: ''
        },
        // 开启图片预览功能
        previewSrcList: {
            type: Array as PropType<string[]>,
            default: () => []
        },
        // 当开启 preview 功能时,是否可以通过点击遮罩层关闭 preview
        hideOnClickModal: {
            type: Boolean,
            default: false
        },
        // 设置图片预览的 z-index
        zIndex: {
            type: Number,
            default: 2000
        }
    },
    emits: ['load', 'error'],
    setup(props, { emit }) {
        // 裁切后的src
        const currentSrc = computed(() => {
            return handleImage(props.src, props.mode);
        });

        // 图片加载成功
        const load = (evt: EventTarget) => {
            emit('load', evt);
        };

        // 图片加载失败
        const error = (evt: EventTarget) => {
            emit('error', evt);
        };

        return {
            currentSrc, load, error
        };
    }
});
</script>
<style lang="scss" scoped>
    .custom-image {
        width: inherit;
        height: inherit;
        pointer-events: none;
        .image-slot, .image-slot .default {
            width: inherit;
            height: inherit;
        }
    }
</style>
