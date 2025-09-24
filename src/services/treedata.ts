import { get, post, remove, put } from './index';
const ENTITY = '/api/treedata';

function query(params) {
       return get(`${ENTITY}/query`, params);
}
function add(data) {
    return post(`${ENTITY}/add`, data);
}

function edit(data) {
    return post(`${ENTITY}/edit`, data);
}

function del(data) {
    return post(`${ENTITY}/del`, data);
}

export default {
    query,
    add,
    edit,
    del,
};
