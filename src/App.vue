<template>
    <div class="root">
        <ElConfigProvider :locale="locale">
            <router-view />
            <!-- 弹窗组件 -->
            <ModifyPass />
            <ServeError />
        </ElConfigProvider>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { ModifyPass, ServeError } from '@/components/basic/index';

export default defineComponent({
    name: 'App',
    components: {
        ModifyPass,
        ServeError,
    },
    setup() {
        const $i18n = useI18n();
        const messages = $i18n.messages.value as Record<string, unknown>;
        const locale = messages[$i18n.locale.value];

        return {
            locale,
        };
    },
});
</script>
<style lang="scss">
    // 重置样式
    @use './assets/scss/_reset.scss';
    // 通用样式
    @use './assets/scss/_common.scss';
    // 自定义样式
    @use './assets/scss/component/_custom.scss';
    // 覆盖element样式
    @use './assets/scss/component/_element.scss';
    // 修改element变量&图标
    @use './assets/theme/_element-theme.scss';

    html,
    body,
    #container {
        background-color: #fff;
        min-height: 100vh;
        min-width: 1260px;
    }
</style>
