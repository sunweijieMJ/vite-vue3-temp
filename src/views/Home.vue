<template>
  <el-calendar v-model="value" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Home',
    setup() {
        const value = ref(new Date());
        return {value};
    }
});
</script>
