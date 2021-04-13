/**
 * axios基础构建
 * @date 2021-4-9
 */

import { AxiosRequestConfig } from 'axios';
import getUrl from './config';
import storage from '@/utils/storage';
import instance from './intercept';
import { CustomResponse } from './types';
import { element, i18n } from '@/plugin';

// i18n对象
const vueI18n = i18n.global;
// 环境变量
const env = import.meta.env;

class Abstract {
    protected baseURL: string = env.VITE_BUILD_ENV ? window.env.VITE_BaseURL : env.VITE_BaseURL;

    protected headers = {
        ContentType: 'application/json;charset=UTF-8'
    }

    private apiAxios({ baseURL = this.baseURL, headers = this.headers, method, url, data, params, responseType }: AxiosRequestConfig): Promise<CustomResponse> {
        Object.assign(headers, {
            token: storage().get('token') || storage('localstorage').get('token'),
            'x-language': storage('localstorage').get('i18n')
        });

        // url解析
        const _url = (url as string).split('.');
        url = getUrl(_url[0], _url[1]);

        return new Promise((resolve, reject) => {
            instance({
                baseURL,
                headers,
                method,
                url,
                params,
                data,
                responseType
            }).then((res) => {
                // 200:服务端业务处理正常结束
                const message = res.data?.errorMessage || (url + `${vueI18n.t('baseAbstract.t0')}`);
                if (res.status === 200) {
                    if (res.data.success) {
                        resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data });
                    } else {
                        element.plugins.ElMessage.error(message);
                        resolve({ status: false, message, data: res.data?.data, origin: res.data });
                    }
                } else {
                    resolve({ status: false, message, data: null });
                }
            }).catch((err) => {
                let message;
                switch (err.status) {
                    case 401:
                        message = `${vueI18n.t('baseAbstract.t1')}`;
                        break;
                    default:
                        message = err?.data?.errorMessage || err?.message || (url + `${vueI18n.t('baseAbstract.t0')}`);
                        break;
                }
                element.plugins.ElMessage.error(message);
                // eslint-disable-next-line
                reject({ status: false, message, data: null});
            });
        });
    }

    /**
     * GET类型的网络请求
     */
    protected getReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({ baseURL, headers, method: 'GET', url, data, params, responseType });
    }

    /**
     * POST类型的网络请求
     */
    protected postReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({ baseURL, headers, method: 'POST', url, data, params, responseType });
    }

    /**
     * PUT类型的网络请求
     */
    protected putReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({ baseURL, headers, method: 'PUT', url, data, params, responseType });
    }

    /**
     * DELETE类型的网络请求
     */
    protected deleteReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data, params, responseType });
    }
}

export default Abstract;
