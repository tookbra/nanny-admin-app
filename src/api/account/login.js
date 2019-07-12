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

export function refreshToken(refresh_token) {
  const grant_type = "refresh_token";
  return fetch({
    url: "/auth/oauth/token",
    method: "post",
    params: { refresh_token, grant_type, scope }
  });
};
