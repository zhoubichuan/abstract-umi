import { get, post, remove, put } from './index';
const ENTITY = '/api/articles';

function list({ current = 1, pageSize = 10, keyword = '' }) {
    return get(`${ENTITY}?pageNum=${current}&pageSize=${pageSize}&keyword=${keyword}`);
}

function search(filter) {
    return post(`${ENTITY}/search`, filter);
}

function create(item) {
    return post(ENTITY, item);
}

function update(item) {
    return put(`${ENTITY}/${item.id}`, item);
}

function del(ids) {
    if (typeof ids == 'string') {
        ids = [ids];
    }
    return remove(`${ENTITY}/${ids[0]}`, {
        ids,
    });
}

function addPv(id) {
    return get(`${ENTITY}/pv/${id}`);
}

function addComment(article_id, comment) {
    return post(`${ENTITY}/comment/${article_id}`, comment);
}
export default {
    list,
    search,
    create,
    update,
    remove,
    addPv,
    addComment,
};
