import { get, post, del, put } from "./index";
const ENTITY = "/api/articles";

function list({ current = 1, pageSize = 5, keyword = "" }) {
  return get(
    `${ENTITY}?pageNum=${current}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
function create(item) {
  return post(ENTITY, item);
}
function update(item) {
  return put(`${ENTITY}/${item.id}`, item);
}
function remove(ids) {
  if (typeof ids == "string") {
    ids = [ids];
  }
  return del(`${ENTITY}/${ids[0]}`, { ids });
}
export default {
  list,
  create,
  update,
  remove
};
