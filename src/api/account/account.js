import { fetch } from "@/libs/fetch";

export function getAccountInfo() {
  return fetch({
    url: "/account/info",
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}
