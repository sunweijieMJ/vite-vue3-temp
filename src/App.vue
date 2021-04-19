<template>
    <div class="root">
        <router-view />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App'
});
</script>
<style lang="scss">
    // 重置样式
    @import './assets/scss/_reset.scss';
    /* 通用样式 */
    @import './assets/scss/_common.scss';
    // 自定义样式
    @import './assets/scss/component/_custom.scss';
    // 覆盖element样式
    @import './assets/scss/component/_element.scss';
    // 修改element变量&图标
    @import './assets/theme/_element-theme.scss';

    html, body, #container {
        min-width: 1260px;
        min-height: 100vh;
        background-color: #fff;
    }
</style>
