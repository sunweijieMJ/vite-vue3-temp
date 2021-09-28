import type { VNode } from 'vue';

export type ToastType = 'success' | 'fail' | 'loading';

export type ToastVM = any;

export type ToastVMQueue = Array<ToastVM>;

export type ToastImplements = {
  multiple(value: boolean): void;
  [propName: string]: any;
  (options: any): any;
};

export type ToastOptions = {
  message?: string | VNode;
  type?: 'loading' | 'success' | 'fail' | '';
  position?: 'middle' | 'top' | 'bottom' | '';
  icon?: string;
  zIndex?: number;
};
