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

function create(tag) {
  return post(ENTITY, tag);
}

function update(tag) {
  return put(`${ENTITY}/${tag.id}`, tag);
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