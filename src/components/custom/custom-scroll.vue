<template>
    <el-scrollbar ref="scrollRef" class="custom-scroll" :vertical="vertical">
        <slot />
    </el-scrollbar>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
const tagSpacing = 4;

export default defineComponent({
    name: 'CustomScroll',
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const scrollRef = ref(null);

        const moveToTarget = (currentTag: HTMLElement) => {
            const scrollContainer = scrollRef;
            const container = scrollContainer.$el as HTMLElement;
            const containerWidth = container.offsetWidth;
            const scrollWrapper = scrollContainer.$refs.wrap as HTMLElement;
            const tagList = this.$parent.$refs.tag as any[];

            let firstTag = null;
            let lastTag = null;

            // find first tag and last tag
            if (tagList.length > 0) {
                firstTag = tagList[0];
                lastTag = tagList[tagList.length - 1];
            }

            if (firstTag === currentTag) {
                scrollWrapper.scrollLeft = 0;
            } else if (lastTag === currentTag) {
                scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth;
            } else {
            // find preTag and nextTag
                const currentIndex = tagList.findIndex(item => item === currentTag);
                const prevTag = tagList[currentIndex - 1];
                const nextTag = tagList[currentIndex + 1];
                // the tag's offsetLeft after of nextTag
                const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing;
                // the tag's offsetLeft before of prevTag
                const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing;

                if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
                    scrollWrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth;
                } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
                    scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
                }
            }
        };

        return {
            scrollRef, moveToTarget
        };
    }
});
</script>
<style lang="scss" scoped>
    .custom-scroll {

    }
</style>
