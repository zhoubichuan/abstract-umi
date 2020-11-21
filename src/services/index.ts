import axios from 'axios';
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
    return axios({
        ...config,
        method: 'get',
        url,
    }).then(res => res.data);
}
export function post(url, data) {
    return axios({
        ...config,
        method: 'post',
        data,
        url,
    }).then(res => res.data);
}
export function put(url, data) {
    return axios({
        ...config,
        method: 'put',
        data,
        url,
    }).then(res => res.data);
}
export function del(url, data) {
    return axios({
        ...config,
        method: 'delete',
        data,
        url,
    }).then(res => res.data);
}
