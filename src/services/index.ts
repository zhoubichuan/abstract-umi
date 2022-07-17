// import fetch from 'fetch';
const baseURL = localStorage.baseURL ? localStorage.baseURL : 'http://127.0.0.1:7001';

const config = {
    baseURL,
    timeout: 8000,
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
    return fetch(url, {
        ...config,
        method: 'get',
    }).then(res => res.data);
}
export function post(url, data) {
    return fetch(url, {
        ...config,
        method: 'post',
        body:JSON.stringify(data),
    }).then(res => res.data);
}
export function put(url, data) {
    return fetch(url, {
        ...config,
        method: 'put',
        body:JSON.stringify(data),
    }).then(res => res.data);
}
export function del(url, data) {
    return fetch(url, {
        ...config,
        method: 'delete',
        body:JSON.stringify(data),
    }).then(res => res.data);
}
