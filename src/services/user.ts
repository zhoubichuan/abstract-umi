import { get, post } from './index';
const ENTITY = '/api/users';

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
    login,
    signout,
};
