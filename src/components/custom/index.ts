import CustomImage from './custom-image.vue';
import CustomChart from './custom-chart.vue';
import CustomDialog from './custom-dialog.vue';
import CustomQuery from './custom-query.vue';
import CustomPagination from './custom-pagination.vue';
import CustomScroll from './custom-scroll.vue';
import CustomXlsx from './custom-xlsx.vue';
// import CustomTagcache from './custom-tagcache.vue';
import CustomToast from './custom-toast/toast';
import CustomDrawer from './custom-drawer.vue';
import { i18n } from '@/plugin';

const install = (app: any) => {
    app.component('CustomImage', CustomImage);
    app.component('CustomChart', CustomChart);
    app.component('CustomDialog', CustomDialog);
    app.component('CustomQuery', CustomQuery);
    app.component('CustomPagination', CustomPagination);
    app.component('CustomScroll', CustomScroll);
    app.component('CustomXlsx', CustomXlsx);
    // app.component('CustomTagcache', CustomTagcache);
    app.component('CustomDrawer', CustomDrawer);

    // CustomToast
    app.provide('$toast', CustomToast);

    // 挂载i18n
    const init =  app.config.globalProperties._init;
    app.config.globalProperties._init = function(options: Array<unknown>) {
        init.call(this, { i18n, ...options });
    };
};

export {
    install,
    CustomImage,
    CustomChart,
    CustomDialog,
    CustomQuery,
    CustomPagination,
    CustomScroll,
    CustomXlsx,
    // CustomTagcache,
    CustomToast
};
