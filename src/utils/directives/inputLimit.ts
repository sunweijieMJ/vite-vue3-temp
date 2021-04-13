import { Directive } from 'vue';

const trigger = (el: HTMLInputElement, type: string) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
};

/**
 * <el-input v-inputLimit="{len:200}" v-model.trim="queryForm.nameOrCode"></el-input>
 */

// 禁止输入表情
const reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
export const inputLimit: Directive = {
    beforeMount(el, binding) {
        const len = binding.value.len;
        const type = binding.value.type || 'input';
        const input = el.getElementsByTagName(type)[0];
        const trim = binding.value.trim || false; // select 可搜索模式去空格
        input.onkeyup = function() {
            let temp = 0;
            const filterValue = trim ? input.value.replace(/^\s+|\s+$/g, '').replace(reg, '') : input.value.replace(reg, ''); // 去首尾空格去表情
            input.value = filterValue;
            // 大写字母，汉字算两个字符，其他都算一个字符
            for (let i = 0; i < input.value.length; i++) {
                if (/[A-Z\u4e00-\u9fa5]/.test(input.value[i])) {
                    temp += 2;
                } else {
                    temp++;
                }
                if (temp > len) {
                    input.value = input.value.substr(0, i);
                }
            }
            trigger(input, 'input');
        };
    }
};
