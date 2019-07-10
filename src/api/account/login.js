import { fetch } from "@/libs/fetch";

const scope = "server";
export function login(parameter) {
  const grant_type = "password";
  return fetch({
    showLoading: true,
    url: "/auth/oauth/token",
    method: "post",
    headers: {
      Authorization: "Basic bmFubnk6bmFubnk="
    },
    params: Object.assign(parameter, { grant_type: grant_type, scope: scope })
  });
}

export function logout() {
  return fetch({
    showLoading: true,
    url: "/auth/token/logout",
    method: "delete"
  });
}
