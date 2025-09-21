import { request } from '@umijs/max';
const baseURL = localStorage.baseURL ? localStorage.baseURL : 'http://127.0.0.1:7005';

const config = {
    baseURL,
    timeout: 7005,
    withCredentials: true,
};

export function get(url, data) {
    if (data) {
        let params = '';
        for (const key in data) {
            data[key] && (params += key + '=' + data[key] + '&');
        }
        url = `${url}?${params.slice(-1)}`;
    }
    return request(config.baseURL + url, {
        ...config,
        method: 'get',
    });
}
export function post(url, data) {
    return request(config.baseURL + url, {
        ...config,
        method: 'post',
        data,
    });
}
export function put(url, data) {
    return request(config.baseURL + url, {
        ...config,
        method: 'put',
        data,
    });
}
export function remove(url, data) {
    return request(config.baseURL + url, {
        ...config,
        method: 'delete',
        data,
    });
}
