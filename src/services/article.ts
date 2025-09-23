import { get, post, remove, put } from './index';
const ENTITY = '/api/articles';

function list(data) {
       return get(`${ENTITY}/query`, data);
}

function search(filter) {
    return post(`${ENTITY}/search`, filter);
}

function create(data) {
    return post(`${ENTITY}/add`, data);
}

function update(data) {
    return post(`${ENTITY}/edit`, data);
}

function del(data) {
    return post(`${ENTITY}/del`, data);
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
