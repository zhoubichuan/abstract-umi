import { get, post, del, put } from "./index";
import qs from "qs";
const ENTITY = "/api/categories";

function list({ current = 1, pageSize = 5, keyword = "" }) {
  return get(
    `${ENTITY}?pageNum=${current}&pageSize=${pageSize}&keyword=${keyword}`
  );
}
function create(category) {
  return post(ENTITY, category);
}
function update(category) {
  return put(`${ENTITY}/${category.id}`, category);
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
