import { App, Directive } from 'vue';
import filters, { FilterKey } from '@/utils/filters';
import * as directives from '@/utils/directives/index';
import storage from '@/utils/storage';
import customMessage from '@/components/custom/custom-message';
// 三方插件
import element from './element';
import i18n from './i18n';
import dayjs from './dayjs';
import lodash from './lodash';
import echarts from './echarts';

// 探测是否支持webp
const canvas = document.createElement('canvas');
if (canvas.getContext && canvas.getContext('2d')) {
  try {
    const isWebp = canvas
      .toDataURL('image/webp')
      .includes('data:image/webp')
      .toString();
    storage('localstorage').set('isWebp', isWebp);
  } catch (e) {
    console.error(e);
  }
}

const install = (app: App): void => {
  // 挂载过滤器
  app.config.globalProperties.$filters = {};
  Object.keys(filters).forEach((key) => {
    app.config.globalProperties.$filters[key] =
      filters[key as keyof typeof FilterKey];
  });

  // 挂载指令
  Object.keys(directives).forEach((key) => {
    app.directive(key, (directives as { [key: string]: Directive })[key]);
  });

  // 注册element
  element.components.forEach((component) => {
    if (component.name) app.component(component.name as string, component);
  });
  Object.values(element.plugins).forEach((plugin) => {
    app.use(plugin);
  });
  app.provide('$message', customMessage);

  // 注册i18n
  app.use(i18n);
};

export { install, element, i18n, dayjs, lodash, echarts };
