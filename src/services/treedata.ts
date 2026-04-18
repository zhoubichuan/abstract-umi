import { get, post, remove, put } from './index';
const ENTITY = '/api/treedata';
type Payload = Record<string, unknown>;

/**
 * 查询树数据列表。
 * @param params 查询参数（分页、筛选条件等）
 */
function query(params: Payload) {
    return get(`${ENTITY}/query`, params);
}

/**
 * 新增树数据。
 * @param data 提交的业务数据
 */
function add(data: Payload) {
    return post(`${ENTITY}/add`, data);
}

/**
 * 编辑树数据。
 * @param data 编辑后的业务数据
 */
function edit(data: Payload) {
    return post(`${ENTITY}/edit`, data);
}

/**
 * 删除树数据。
 * @param data 删除条件（通常包含 id 或 id 列表）
 */
function del(data: Payload) {
    return post(`${ENTITY}/del`, data);
}

export default {
    query,
    add,
    edit,
    del,
};
