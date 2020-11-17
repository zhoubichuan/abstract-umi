import { get, post, del, put } from "./index"
const ENTITY = "/api/tag"
// 1.查询/posts
function searchTagList({ current = 1, pageSize = 10, keyword = "" }) {
  return get(
    `${ENTITY}?pageNum=${current}&pageSize=${pageSize}&keyword=${keyword}`
  )
}
// 2.查询/posts/new
function other(other) {
  return get(`${ENTITY}/${other}`)
}
// 3.查询详情/posts/:id
function queryTagDetail(id) {
  return get(`${ENTITY}/${id}`)
}
// 4.查询/posts/:id/edit
function edit({ id, edit }) {
  return get(`${ENTITY}/${id}/${edit}`)
}
// 5.创建/posts
function createTag(tag) {
  return post(ENTITY, tag)
}
// 6.更新 /posts/:id
function updateTag({ id, tag }) {
  return put(`${ENTITY}/${id}`, tag)
}
// 7.删除 /posts/:id
function deleteTag(ids) {
  if (typeof ids == "string") {
    ids = [ids]
  }
  return del(`${ENTITY}/${ids[0]}`, {
    ids,
  })
}
export default {
  searchTagList,
  other,
  queryTagDetail,
  edit,
  createTag,
  updateTag,
  deleteTag,
}
