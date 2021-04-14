import { createVNode, isVNode, render } from 'vue';
import ToastConstructor from './index.vue';
import type {
    ToastVM,
    ToastVMQueue,
    ToastOptions,
    ToastImplements
} from './types';

let instance: ToastVM;
let instanceQueue: ToastVMQueue = [];
let isMultiple = false; // 是否同时存在多个
const zIndex = 2001;

const mergeOptions = (options: ToastOptions) => {
    zIndex;
    return {
        ...options,
        zIndex
    };
};

const Toast:ToastImplements = (options: ToastOptions) => {
    if (window === undefined) return;

    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    mergeOptions(options);

    // 筛选出未关闭的toast, 已关闭的从dom移除
    instanceQueue = instanceQueue.filter((item) => {
        const { show } = item.component?.ctx;
        return show;
    });

    // 清空显示
    if (instanceQueue.length && !isMultiple) {
        instanceQueue.forEach((item) => {
            console.log(item.component);
            item.component?.ctx.close();
        });
    }

    // 创建新的toast
    instance = createVNode(ToastConstructor, options, isVNode(options.message) ? { default: () => options.message } : null);


    const container = document.createElement('div');
    render(instance, container);
    instance.close = () => {
        instance.component?.ctx.close();
    };

    instanceQueue.push(instance);
    return instance;
};

Toast.multiple = (value: boolean) => {
    isMultiple = value;
};

const defineMethod = (type: string) => (options: ToastOptions) => {
    if(typeof options === 'string' || isVNode(options)){
        options = {
            message: options
        };
    }
    return Toast({
        type,
        ...options
    });
};

['loading', 'success', 'fail'].forEach(type => {
    Toast[type] = defineMethod(type);
});

export default Toast;
