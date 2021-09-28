import { createI18n } from 'vue-i18n';
import enElement from 'element-plus/lib/locale/lang/en';
import zhElement from 'element-plus/lib/locale/lang/zh-cn';
import storage from '@/utils/storage';
// 语言包
import enLocale from '@/locale/en.json';
import zhLocale from '@/locale/zh-CN.json';

if (!storage('localstorage').get('i18n')) {
  storage('localstorage').set('i18n', 'zh-CN');
}
const messages = {
  en: {
    name: 'en',
    el: enElement.el,
    ...enLocale,
  },
  'zh-CN': {
    name: 'zh-CN',
    el: zhElement.el,
    ...zhLocale,
  },
};
const i18n = createI18n({
  locale: storage('localstorage').get('i18n'),
  fallbackLocale: enElement.name,
  messages,
});

export default i18n;
