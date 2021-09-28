import { i18n } from '@/plugin';

class FunctionType extends Function {}

const global = {
  form: {
    // 正则表达式
    rule: {
      requied: /\S/,
      illegal:
        /[`~!@#$%^&*()+<>?:"{},/;'[\]]|[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
      email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/i,
      password: /^[a-zA-Z0-9]{6,8}$/i,
      tel: /^1\d{10}$/,
      fax: /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/,
      num: /^\d+$/i,
      code: /^[0-9a-zA-Z_]+$/,
      name: /[`~!@#$%^&*()+<>?:"{},/;'[\]]|[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
      onlyspace: /^\s+$/,
      filter: /^[\w\u4e00-\u9fa5]+$/i,
      phone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
      zone: /^0[0-9]{2,3}$/i,
      picCode: /^[a-zA-Z0-9]{6,6}$/i,
      smsCode: /^[0-9]{6,6}$/i,
      zipCode: /^[0-9]{6}$/,
      areaTel: /^((\+?86)|(\+?96)|(\+?06))?1\d{10}$/,
      passLength: /^[a-zA-Z0-9]{6,15}$/,
      cnen: /^[\u4e00-\u9fa5a-zA-Z]+$/i,
    },
    validateCode: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { code } = global.form.rule;
      if (value && !code.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t4')}`));
      } else {
        callback();
      }
    },
    validateRequiredCode: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { code } = global.form.rule;
      if (!value) {
        callback(new Error(`${i18n.global.t('baseGlobal.t5')}`));
      } else if (!code.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t4')}`));
      } else {
        callback();
      }
    },
    validateRequiredName: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { name } = global.form.rule;
      const { onlyspace } = global.form.rule;
      if (!value) {
        callback(new Error(`${i18n.global.t('baseGlobal.t6')}`));
      } else if (onlyspace.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t7')}`));
      } else if (name.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t8')}`));
      } else {
        callback();
      }
    },
    validateName: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { illegal } = global.form.rule;
      if (illegal.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t8')}`));
      } else {
        callback();
      }
    },
    validateFax: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { fax } = global.form.rule;
      if (value && !fax.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t9')}`));
      } else {
        callback();
      }
    },
    validateTel: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { tel } = global.form.rule;
      if (value && !tel.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t10')}`));
      } else {
        callback();
      }
    },
    validatePhone: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { phone } = global.form.rule;
      if (value && !phone.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t11')}`));
      } else {
        callback();
      }
    },
    validateEmail: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { email } = global.form.rule;
      if (value && !email.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t12')}`));
      } else {
        callback();
      }
    },
    validateZipCode: (
      rule: unknown,
      value: string,
      callback: FunctionType
    ): void => {
      const { zipCode } = global.form.rule;
      if (value && !zipCode.test(value)) {
        callback(new Error(`${i18n.global.t('baseGlobal.t13')}`));
      } else {
        callback();
      }
    },
  },
  // 防抖白名单
  whitelist: [],
};

export default global;
