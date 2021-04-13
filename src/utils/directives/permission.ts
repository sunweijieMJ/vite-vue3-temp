import { Directive } from 'vue';
import store from '@/store';

export const permission: Directive = {
    updated(el, binding) {
        const { value } = binding;
        const permissions = store.state.basic.thirdMenu.permissions;
        if (value && permissions) {
            const hasPermission = permissions.includes(value);
            if (!hasPermission) {
                el.style.visibility = 'hidden';
            } else {
                el.style.visibility = 'initial';
            }
        }
    }
};
