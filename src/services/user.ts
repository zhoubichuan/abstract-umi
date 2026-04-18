import { get, post } from './index';
const ENTITY = '/api/user';
type Payload = Record<string, unknown>;

/** 新增用户 */
function add(data: Payload) {
    return post(`${ENTITY}/add`, data);
}
/** 删除用户 */
function del(data: Payload) {
    return post(`${ENTITY}/del`, data);
}
/** 编辑用户 */
function edit(data: Payload) {
    return post(`${ENTITY}/edit`, data);
}

/** 查询用户列表（query 参数直接平铺传递） */
function query(params: Payload) {
    return get(`${ENTITY}/query`, params);
}

/** 查询当前登录用户 */
function current(data?: Payload) {
    return get(`${ENTITY}/current`, data);
}

/** 登录 */
function login(data: Payload) {
    return post(`${ENTITY}/login`, data);
}

/** 退出登录 */
function signout(data?: Payload) {
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
