import { fetch } from "@/libs/fetch";

export function getPermission() {
  return fetch({
    url: "/permissions/router",
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}
