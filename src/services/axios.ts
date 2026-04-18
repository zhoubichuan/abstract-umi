import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { message } from 'antd';
import { host } from '@/services/config';
import {
    serverResponseFailedManager,
    serverResponseSuccessManager,
} from '@/services/server-response-manager';

const axiosInstance: AxiosInstance = axios.create({
    // 默认请求配置：统一使用后端网关前缀
    baseURL: host,
});

/**
 * 请求拦截器：预留鉴权头、trace id 等注入能力。
 */
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        // config.url = host + config.url;
        return config;
    },
    (error: AxiosError) => {
        message.error('请求错误');
        return Promise.reject(error);
    },
);

/**
 * 响应拦截器：统一处理业务码与网络错误。
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.code === 200) {
            return response;
        }
        // 针对请求成功：返回的 code 码做不同的响应
        serverResponseSuccessManager.codeParser(response);
    },
    (error: AxiosError) => {
        // 针对请求失败：应该提示的错误信息
        serverResponseFailedManager.getErrorMessage(error);
        return Promise.reject(error.response);
    },
);

export default axiosInstance;
