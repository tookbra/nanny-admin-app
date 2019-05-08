import { fetch } from "@/libs/fetch";

export function login(parameter) {
  return fetch({
    url: "/auth/login",
    method: "post",
    data: parameter
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
