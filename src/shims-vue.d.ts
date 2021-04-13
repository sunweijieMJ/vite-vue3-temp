interface ImportMetaEnv {
  VITE_Version: string
  VITE_BaseURL: string
  VITE_FileURL: string
  VITE_WebURL: string
}

declare module '*.vue' {
    import {ComponentOptions} from 'vue';
    const componentOptions: ComponentOptions;
    export default componentOptions;
}

declare module 'echarts/lib/echarts';

declare module 'js-md5';

declare module 'nprogress'

