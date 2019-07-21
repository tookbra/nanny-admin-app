import { fetch } from "@/libs/fetch";

export function pageScrap(parameter) {
  return fetch({
    url: "/system/rfid/scraps",
    method: "get",
    params: parameter
  });
}
