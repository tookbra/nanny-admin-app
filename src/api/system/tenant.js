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

export function addTenant(parameter) {
  console.log(parameter);
  return fetch({
    url: "/tenants",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyTenant(parameter) {
  return fetch({
    url: "/tenants/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
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
