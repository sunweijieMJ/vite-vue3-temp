<template>
  <div id="layout">
    <!-- <router-view /> -->
    <el-button @click="test">按钮</el-button>
    <custom-pagination :page-num="1" :page-size="10" :total="100" />
    <el-input v-model.trim="inputValue" v-designform placeholder="中文名称查询" maxlength="30" clearable />
    <span>{{ $filters.decimalFormat(12312312313) }}</span>
    <modify-pass />
    <serve-error />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { useStore } from 'vuex';
import { ModifyPass, ServeError } from '@/components/basic';
import Toast from '@/components/custom/custom-toast/toast';

export default defineComponent({
    name: 'Layout',
    components: {
        ModifyPass, ServeError
    },
    setup() {
        const $store = useStore();
        const $toast = inject('$toast');
        let inputValue = ref('sadasd');

        const test = () => {
            Toast({message: 'asdad', duration: 2000});
            // $store.dispatch('basic/toggleModifyPass', {status: true});
        };

        return {
            test, inputValue
        };
    }
});
</script>
