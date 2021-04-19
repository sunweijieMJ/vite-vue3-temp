<template>
    <a v-if="isExternal(to)" class="sidebar-link" :href="to" target="_blank" rel="noopener">
        <slot />
    </a>
    <router-link v-else class="sidebar-link" :to="to">
        <slot />
    </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SidebarLink',
    props: {
        to: {
            type: String,
            required: true
        }
    },
    setup() {
        const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

        return {
            isExternal
        };
    }
});
</script>
