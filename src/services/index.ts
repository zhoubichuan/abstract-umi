import { request } from '@umijs/max';
const baseURL = localStorage.baseURL ? localStorage.baseURL : 'http://127.0.0.1:7005';

const config = {
    baseURL,
    timeout: 7005,
    withCredentials: true,
};

/**
 * 将对象参数安全拼接到 URL 上。
 * 约定：忽略 undefined/null/空字符串，避免把无效筛选项传给后端。
 */
function buildUrl(url: string, data?: Record<string, unknown>) {
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

export function get(url: string, data?: Record<string, unknown>) {
    return request(config.baseURL + buildUrl(url, data), {
        ...config,
        method: 'get',
    });
}

/** POST：用于新增或带 body 的查询请求 */
export function post(url: string, data?: unknown) {
    return request(config.baseURL + url, {
        ...config,
        method: 'post',
        data,
    });
}

/** PUT：用于更新资源 */
export function put(url: string, data?: unknown) {
    return request(config.baseURL + url, {
        ...config,
        method: 'put',
        data,
    });
}

/** DELETE：支持携带请求体做批量删除 */
export function remove(url: string, data?: unknown) {
    return request(config.baseURL + url, {
        ...config,
        method: 'delete',
        data,
    });
}
