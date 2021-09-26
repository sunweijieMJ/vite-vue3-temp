import axios, { AxiosRequestConfig, Method, Canceler } from 'axios';
import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type.d';
import storage from '@/utils/storage';
import store from '@/store';
import { i18n } from '@/plugin';

// 定义接口
interface PendingType {
    url?: string;
    method?: Method;
    params?: Record<string, unknown>;
    data?: Record<string, unknown>;
    cancel: Canceler;
}

// 取消重复请求
let requestCount = 0;
const pending: Array<PendingType> = [];
const { CancelToken } = axios;
// axios 实例
const instance = axios.create({
    timeout: 100000,
    responseType: 'json',
});
let loadingInstance: ILoadingInstance;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
    Object.keys(pending).reverse().forEach((key) => {
        const item: number = +key;
        const list: PendingType = pending[+key];
        // 当前请求在数组中存在时执行函数体

        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
            // 执行取消操作
            list.cancel(`${i18n.global.t('baseIntercept.t2')}`);
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    });
};

// 添加请求拦截器
instance.interceptors.request.use(
    (request) => {
        requestCount++;
        loadingInstance = ElLoading.service({
            customClass: 'global-loading',
            text: `${i18n.global.t('baseIntercept.t3')}`,
            fullscreen: true,
            background: 'rgba(0, 0, 0, 0.3)',
        });

        removePending(request);
        request.cancelToken = new CancelToken((c) => {
            pending.push({
                url: request.url, method: request.method, params: request.params, data: request.data, cancel: c,
            });
        });
        return request;
    },
    (error) => Promise.reject(error),
);

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        requestCount--;
        if (!requestCount) {
            loadingInstance.close();
        }

        removePending(response.config);

        const errorCode = response?.data?.errorCode;
        switch (errorCode) {
            case '1020007':
                store.dispatch('basic/toggleModifyPass', { status: true, type: 'required' });
                break;
            default:
                break;
        }

        return response;
    },
    (error) => {
        requestCount--;
        if (!requestCount) {
            loadingInstance.close();
        }

        const { response } = error;
        // 根据返回的code值来做不同的处理(和后端约定)
        switch (response?.status) {
            case 401:
                // token失效
                storage().remove('token');
                storage('localstorage').remove('token');
                storage('localstorage').remove('vuex');
                window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
                break;
            case 403:
                // 没有权限
                store.dispatch('basic/activeErrorPage', { status: true, type: '403' });
                break;
            case 404:
                // 接口地址错误
                store.dispatch('basic/activeErrorPage', { status: true, type: '404' });
                break;
            case 500:
                // 服务端错误
                store.dispatch('basic/activeErrorPage', { status: true, type: '500' });
                break;
            case 503:
                // 服务端错误
                store.dispatch('basic/activeErrorPage', { status: true, type: '503' });
                break;
            default:
                break;
        }

        // 超时重新请求
        const { config } = error;
        // 全局的请求次数,请求的间隙
        const [RETRY_COUNT, RETRY_DELAY] = [0, 1000];

        if (config && RETRY_COUNT) {
            // 设置用于跟踪重试计数的变量
            config.retryCount = config.retryCount || 0;
            // 检查是否已经把重试的总数用完
            if (config.retryCount >= RETRY_COUNT) {
                return Promise.reject(response || { message: error.message });
            }
            // 增加重试计数
            config.retryCount++;
            // 创造新的Promise来处理指数后退
            const backoff = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(null);
                }, RETRY_DELAY || 1);
            });
            // instance重试请求的Promise
            return backoff.then(() => instance(config));
        }

        // eslint-disable-next-line
        return Promise.reject(response || { message: error.message });
    },
);

export default instance;
