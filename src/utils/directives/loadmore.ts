import { Directive } from 'vue';

export const loadmore: Directive = {
    mounted(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        (SELECTWRAP_DOM as Element).addEventListener('scroll', function (this: HTMLElement) {
            const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
            if (CONDITION) {
                binding.value();
            }
        });
    },
};
