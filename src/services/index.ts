import { request } from '@umijs/max';
const baseURL = localStorage.baseURL ? localStorage.baseURL : 'http://127.0.0.1:7005';

const config = {
    baseURL,
    timeout: 7005,
    withCredentials: true,
};

function buildUrl(url, data) {
    if (!data || typeof data !== 'object') {
        return url;
    }

    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
            return;
        }
        params.append(key, String(value));
    });

    const queryString = params.toString();
    if (!queryString) {
        return url;
    }

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${queryString}`;
}

export function get(url, data) {
    return request(config.baseURL + buildUrl(url, data), {
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
