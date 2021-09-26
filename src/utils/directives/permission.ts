import { Directive } from 'vue';
import store from '@/store';

export const permission: Directive = {
    updated(el, binding, vnode: any) {
        const { value } = binding;
        const { permissionsMap } = store.state.basic;
        const routePath = vnode.context?.$route.path as string;
        if (value) {
            const hasPermission = permissionsMap.get(routePath)?.includes(value);
            if (!hasPermission) {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
            } else {
                // el.style.display = originDisplay;
                // el.style.visibility = originVisibility;
            }
        }
    },
};
