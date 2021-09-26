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
import { CustomToast } from '@/components/custom';

class Abstract {
    protected baseURL: string = import.meta.env.VITE_BUILD_ENV ? window.env.VITE_BASEURL : import.meta.env.VITE_BASEURL;

    protected headers = {
        ContentType: 'application/json;charset=UTF-8',
    }

    private apiAxios({
        baseURL = this.baseURL, headers = this.headers, method, url, data, params, responseType,
    }: AxiosRequestConfig): Promise<CustomResponse> {
        Object.assign(headers, {
            token: storage().get('token') || storage('localstorage').get('token'),
            'x-language': storage('localstorage').get('i18n'),
        });

        // url解析
        const urlArr = (url as string).split('.');
        url = getUrl(urlArr[0], urlArr[1]);

        return new Promise((resolve, reject) => {
            instance({
                baseURL,
                headers,
                method,
                url,
                params,
                data,
                responseType,
            }).then((res) => {
                // 200:服务端业务处理正常结束
                const message = res.data?.errorMessage || (`${url}${i18n.global.t('baseAbstract.t0')}`);
                if (res.status === 200) {
                    if (res.data.success) {
                        resolve({
                            status: true, message: 'success', data: res.data?.data, origin: res.data,
                        });
                    } else {
                        element.plugins.ElMessage.error(message);
                        resolve({
                            status: false, message, data: res.data?.data, origin: res.data,
                        });
                    }
                } else {
                    resolve({ status: false, message, data: null });
                }
            }).catch((err) => {
                let message;
                switch (err.status) {
                    case 401:
                        message = `${i18n.global.t('baseAbstract.t1')}`;
                        break;
                    default:
                        message = err?.data?.errorMessage || err?.message || (`${url}${i18n.global.t('baseAbstract.t0')}`);
                        break;
                }
                CustomToast({ message });
                reject({ status: false, message, data: null });
            });
        });
    }

    /**
     * GET类型的网络请求
     */
    protected getReq({
        baseURL, headers, url, data, params, responseType,
    }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({
            baseURL, headers, method: 'GET', url, data, params, responseType,
        });
    }

    /**
     * POST类型的网络请求
     */
    protected postReq({
        baseURL, headers, url, data, params, responseType,
    }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({
            baseURL, headers, method: 'POST', url, data, params, responseType,
        });
    }

    /**
     * PUT类型的网络请求
     */
    protected putReq({
        baseURL, headers, url, data, params, responseType,
    }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({
            baseURL, headers, method: 'PUT', url, data, params, responseType,
        });
    }

    /**
     * DELETE类型的网络请求
     */
    protected deleteReq({
        baseURL, headers, url, data, params, responseType,
    }: AxiosRequestConfig): Promise<CustomResponse> {
        return this.apiAxios({
            baseURL, headers, method: 'DELETE', url, data, params, responseType,
        });
    }
}

export default Abstract;
