import { App } from 'vue';
import CustomImage from './custom-image.vue';
import CustomChart from './custom-chart.vue';
import CustomDialog from './custom-dialog.vue';
import CustomQuery from './custom-query.vue';
import CustomPagination from './custom-pagination.vue';
import CustomScroll from './custom-scroll.vue';
import CustomToast from './custom-toast/toast';
import CustomDrawer from './custom-drawer.vue';

const install = (app: App): void => {
  app.component('CustomImage', CustomImage);
  app.component('CustomChart', CustomChart);
  app.component('CustomDialog', CustomDialog);
  app.component('CustomQuery', CustomQuery);
  app.component('CustomPagination', CustomPagination);
  app.component('CustomScroll', CustomScroll);
  app.component('CustomDrawer', CustomDrawer);

  // CustomToast
  app.provide('$toast', CustomToast);
};

export {
  install,
  CustomImage,
  CustomChart,
  CustomDialog,
  CustomQuery,
  CustomPagination,
  CustomScroll,
  CustomToast,
};
