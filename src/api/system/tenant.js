import { fetch } from "@/libs/fetch";

export function pageTenant(parameter) {
  return fetch({
    url: "/tenants",
    method: "get",
    data: parameter
  });
}

export function getTenant(id) {
  return fetch({
    url: "/tenants/" + id,
    method: "get"
  });
}

export function batchRemoveTenant(parameter) {
  return fetch({
    url: "/tenants/batch",
    method: "post",
    data: parameter
  });
}

export function removeTenant(id) {
  return fetch({
    url: "/tenants/" + id,
    method: "delete"
  });
}
