import { fetch } from "@/libs/fetch";
const scope = "server";

// 登录
export function login(parameter) {
  const grant_type = "password";
  return fetch({
    showLoading: true,
    url: "/auth/oauth/token",
    method: "post",
    headers: {
      isToken: false,
      Authorization: "Basic bmFubnk6bmFubnk="
    },
    params: Object.assign(parameter, { grant_type: grant_type, scope: scope })
  });
}

// 登出
export function logout() {
  return fetch({
    showLoading: true,
    url: "/auth/token/logout",
    method: "delete"
  });
}

// 刷新token
export function refreshToken(refresh_token) {
  const grant_type = "refresh_token";
  return fetch({
    headers: {
      isToken: false,
      Authorization: "Basic bmFubnk6bmFubnk="
    },
    url: "/auth/oauth/token",
    method: "post",
    params: { refresh_token, grant_type, scope }
  });
}
