import { get, post, remove, put } from './index';
const ENTITY = '/api/tag';
type Id = string | number;
type TagPayload = Record<string, unknown>;

/** 标签列表查询（分页 + 关键字） */
function searchTagList({ current = 1, pageSize = 10, keyword = '' }: { current?: number; pageSize?: number; keyword?: string }) {
    return get(ENTITY, {
        pageNum: current,
        pageSize,
        keyword,
    });
}

/** 查询标签扩展资源（例如 new/edit 等子路径） */
function other(otherPath: string) {
    return get(`${ENTITY}/${otherPath}`);
}

/** 查询标签详情 */
function queryTagDetail(id: Id) {
    return get(`${ENTITY}/${id}`);
}

/** 获取编辑态数据 */
function edit({ id, edit }: { id: Id; edit: string }) {
    return get(`${ENTITY}/${id}/${edit}`);
}

/** 创建标签 */
function createTag(tag: TagPayload) {
    return post(ENTITY, tag);
}

/** 更新标签 */
function updateTag({ id, tag }: { id: Id; tag: TagPayload }) {
    return put(`${ENTITY}/${id}`, tag);
}

/** 删除标签：兼容单 id 与批量 id */
function deleteTag(ids: Id | Id[]) {
    const normalizedIds = Array.isArray(ids) ? ids : [ids];
    return remove(`${ENTITY}/${normalizedIds[0]}`, {
        ids: normalizedIds,
    });
}
export default {
    searchTagList,
    other,
    queryTagDetail,
    edit,
    createTag,
    updateTag,
    deleteTag,
};
