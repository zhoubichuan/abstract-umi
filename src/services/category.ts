import { get, post, remove, put } from './index';
const ENTITY = '/api/categories';

function list({ current = 1, pageSize = 10, keyword = '' }) {
    return get(`${ENTITY}?pageNum=${current}&pageSize=${pageSize}&keyword=${keyword}`);
}

function create(category) {
    return post(ENTITY, category);
}

function update(category) {
    return put(`${ENTITY}/${category.id}`, category);
}

function del(ids) {
    if (typeof ids == 'string') {
        ids = [ids];
    }
    return remove(`${ENTITY}/${ids[0]}`, {
        ids,
    });
}
export default {
    list,
    create,
    update,
    del,
};
