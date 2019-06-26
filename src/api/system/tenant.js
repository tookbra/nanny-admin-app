import { fetch } from "@/libs/fetch";

export function pageTenant(parameter) {
  return fetch({
    url: "/system/tenants",
    method: "get",
    data: parameter
  });
}

export function getTenant(id) {
  return fetch({
    url: "/system/tenants/" + id,
    method: "get"
  });
}

export function getAllTenant() {
  return fetch({
    url: "/system/tenants/all",
    method: "get"
  });
}

export function addTenant(parameter) {
  return fetch({
    url: "/system/tenants",
    method: "post",
    data: parameter
  });
}

export function modifyTenant(parameter) {
  return fetch({
    url: "/system/tenants/" + parameter.id,
    method: "put",
    data: parameter
  });
}

export function batchRemoveTenant(parameter) {
  return fetch({
    url: "/system/tenants/batch",
    method: "post",
    data: parameter
  });
}

export function removeTenant(id) {
  return fetch({
    url: "/system/tenants/" + id,
    method: "delete"
  });
}
