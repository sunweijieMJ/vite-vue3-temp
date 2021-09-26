<template>
    <custom-dialog
        v-model:visible="errorPage.status"
        custom-class="serve-error"
        :title="errorPage.type"
        :show-confirm="false"
        :cancel-text="$t('baseServeError.t121')"
        @cancel="cancel"
    >
        <div class="container">
            <img v-if="errorPage.type === '403'" class="img" src="../../../static/img/403.png" alt="">
            <img v-else-if="errorPage.type === '404'" class="img" src="../../../static/img/404.png" alt="">
            <img v-else class="img" src="../../../static/img/503.png" alt="">
            <el-link class="back" type="primary" @click.prevent="skipHomepage">{{ $t('base404.t107') }}</el-link>
        </div>
    </custom-dialog>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'ServeError',
    setup() {
        const $store = useStore();

        const errorPage = computed({
            get: () => $store.state.basic.errorPage,
            set: (val) => {
                $store.dispatch('basic/activeErrorPage', val);
            },
        });

        const cancel = () => {
            $store.dispatch('basic/activeErrorPage', { status: false });
        };

        // 返回首页
        const skipHomepage = () => {
            window.location.href = '/';
        };

        return {
            errorPage, cancel, skipHomepage,
        };
    },
});
</script>
<style lang="scss" scoped>
    .serve-error {
        .container {
            align-items: center;
            display: flex;
            flex-direction: column;

            .img {
                width: 363px;
            }

            .back {
                margin: 20px 0;
            }
        }
    }
</style>
