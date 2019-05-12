import { fetch } from "@/libs/fetch";

export function pageTenant(parameter) {
  return fetch({
    url: "/tenants",
    method: "get",
    data: parameter
  });
}
