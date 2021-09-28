interface ImportMetaEnv {
  VITE_VERSION: string;
  VITE_BASEURL: string;
  VITE_VILEURL: string;
  VITE_WEBURL: string;
}

declare module '*.vue' {
  import { ComponentOptions } from 'vue';

  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module 'echarts/lib/echarts';

declare module 'js-md5';

declare module 'lodash';

declare module 'nprogress';

declare module 'path-browserify';
