import { fetch } from "@/libs/fetch";

export function getPermission() {
  return fetch({
    url: "/system/menus/user",
    method: "get"
  });
}
