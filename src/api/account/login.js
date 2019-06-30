import { fetch } from "@/libs/fetch";
const scope = "server";
export function login(parameter) {
  const grant_type = "password";
  return fetch({
    url: "/auth/oauth/token",
    method: "post",
    headers: {
      Authorization: "Basic cGlnOnBpZw=="
    },
    params: Object.assign(parameter, { grant_type: grant_type, scope: scope })
  });
}

export function logout() {
  return fetch({
    url: "/auth/logout",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}
