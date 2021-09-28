import { Directive } from 'vue';

export const designform: Directive = {
  beforeMount(el) {
    const input = el.querySelector('.el-input__inner');
    const label = document.createElement('label');
    el.classList.add('design-form');
    label.innerHTML = input?.getAttribute('placeholder') as string;
    label.classList.add('input-label');
    const box = el.querySelector('.el-input') || el;
    box.insertBefore(label, (input as HTMLElement).nextSibling);
  },
  mounted(el) {
    const input = el.querySelector('.el-input__inner');
    const label = el.querySelector('.input-label');
    const { paddingLeft } = getComputedStyle(input as HTMLElement, null);
    (label as HTMLElement).style.left = `${parseInt(paddingLeft, 10)}px`;
  },
  updated(el, bind) {
    const label = el.querySelector('.input-label');
    if (bind.arg) (label as HTMLElement).innerHTML = bind.arg;
    if (!el.classList.contains('design-form')) {
      setTimeout(() => {
        el.classList.add('design-form');
      }, 0);
    }
  },
};
