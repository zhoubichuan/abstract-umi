import { get, post, put, del } from "./index";
const ENTITY = "/api/users";

function signup(data) {
  return post(`${ENTITY}/signup`, data);
}
function signin(data) {
  return post(`${ENTITY}/signin`, data);
}
function signout() {
  return get(`${ENTITY}/signout`);
}
export default {
  signup,
  signin,
  signout
};
