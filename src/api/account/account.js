import { fetch } from "@/libs/fetch";

export function getAccountInfo() {
  return fetch({
    url: "/system/accounts/info",
    method: "get"
  });
}
