import { get, post } from './index';
const ENTITY = '/api/user';

function add(data) {
    return post(`${ENTITY}/add`, data);
}
function del(data) {
    return post(`${ENTITY}/del`, data);
}
function edit(data) {
    return post(`${ENTITY}/edit`, data);
}
function query(data) {
    return get(`${ENTITY}/query`, data);
}
function current(data) {
    return get(`${ENTITY}/current`, data);
}
function login(data) {
    return post(`${ENTITY}/login`, data);
}
function signout(data) {
    return post(`${ENTITY}/signout`, data);
}
export default {
    add,
    del,
    edit,
    query,
    current,
    login,
    signout,
};
