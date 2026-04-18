import { get, post, remove, put } from './index';
const ENTITY = '/api/categories';
type Id = string | number;
type CategoryPayload = Record<string, unknown> & { id?: Id };

/** 分类列表查询（分页 + 关键字） */
function list({ current = 1, pageSize = 10, keyword = '' }: { current?: number; pageSize?: number; keyword?: string }) {
    return get(ENTITY, {
        pageNum: current,
        pageSize,
        keyword,
    });
}

/** 新建分类 */
function create(category: CategoryPayload) {
    return post(ENTITY, category);
}

/** 更新分类 */
function update(category: CategoryPayload & { id: Id }) {
    return put(`${ENTITY}/${category.id}`, category);
}

/** 删除分类：兼容单 id 与 id 数组 */
function del(ids: Id | Id[]) {
    const normalizedIds = Array.isArray(ids) ? ids : [ids];
    return remove(`${ENTITY}/${normalizedIds[0]}`, {
        ids: normalizedIds,
    });
}
export default {
    list,
    create,
    update,
    del,
};
