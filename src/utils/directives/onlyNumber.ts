import { Directive } from 'vue';

export const onlyNumber: Directive = {
  beforeMount(el, vDir) {
    // vDir.value 有指令的参数
    let content;
    // 按键按下=>只允许输入 数字/小数点
    el.addEventListener('keypress', (evt: KeyboardEvent) => {
      const inputKey = String.fromCharCode(
        typeof evt.charCode === 'number' ? evt.charCode : evt.keyCode
      );
      const re = /\d|\.|-/;
      content = (evt.target as HTMLInputElement).value;
      // 定义方法,阻止输入
      function preventInput() {
        if (evt.preventDefault) {
          evt.preventDefault();
        } else {
          evt.returnValue = false;
        }
      }
      if (!re.test(inputKey) && !evt.ctrlKey) {
        preventInput();
      } else if (content.indexOf('.') > 0 && inputKey === '.') {
        // 已有小数点,再次输入小数点
        preventInput();
      }
    });
    // 按键弹起=>并限制最大最小
    el.addEventListener('keyup', (evt: KeyboardEvent) => {
      if ((evt.target as HTMLInputElement)?.value) {
        content = parseFloat((evt.target as HTMLInputElement).value);
        if (!content) {
          content = 0.0;
        }
        // 限制最大最小值
        let argMax = 0;
        let argMin = 0;
        if (vDir.value) {
          argMax = parseFloat(vDir.value.max);
          argMin = parseFloat(vDir.value.min);
        }
        if (!Number.isNaN(argMax) && content > argMax) {
          (evt.target as HTMLInputElement).value = `${argMax}`;
          content = argMax;
        }
        if (!Number.isNaN(argMin) && content < argMin) {
          (evt.target as HTMLInputElement).value = `${argMin}`;
          content = argMin;
        }
      }
    });
    // 失去焦点=>保留指定位小数
    el.addEventListener('focusout', (evt: KeyboardEvent) => {
      // 此处会在 el-input 的 @change 后执行
      // 限制最大最小值
      if ((evt.target as HTMLInputElement).value) {
        content = parseFloat((evt.target as HTMLInputElement).value);
        if (!content) {
          content = 0.0;
        }
        let argPrecision = 0; // 默认保留至整数
        if (vDir.value.precision) {
          argPrecision = parseFloat(vDir.value.precision);
        }
        let argMax = 0;
        let argMin = 0;
        if (vDir.value) {
          argMax = parseFloat(vDir.value.max);
          argMin = parseFloat(vDir.value.min);
        }
        if (!Number.isNaN(argMax) && content > argMax) {
          (evt.target as HTMLInputElement).value = `${argMax}`;
          content = argMax;
        }
        if (!Number.isNaN(argMin) && content < argMin) {
          (evt.target as HTMLInputElement).value = `${argMin}`;
          content = argMin;
        }

        // 保留几位小数
        (evt.target as HTMLInputElement).value = content.toFixed(argPrecision);
      }
    });
  },
};
