import {
  get,
  post,
  del,
  put
} from "./index";
const ENTITY = "/api/tag";

function list({
  current = 1,
  pageSize = 10,
  keyword = ""
}) {
  return get(
    ENTITY
    // `${ENTITY}?pageNum=${current}&pageSize=${pageSize}&keyword=${keyword}`
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
  return del(`${ENTITY}/${ids[0]}`, {
    ids
  });
}
export default {
  list,
  create,
  update,
  remove
};