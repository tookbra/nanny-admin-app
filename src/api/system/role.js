import { fetch } from "@/libs/fetch";

export function pageRole(parameter) {
  return fetch({
    url: "/roles",
    method: "get",
    data: parameter
  });
}

export function getRole(id) {
  return fetch({
    url: "/roles/" + id,
    method: "get"
  });
}

export function getRoleByTenantId(id) {
  return fetch({
    url: "/roles/tenant/" + id,
    method: "get"
  });
}

export function addRole(parameter) {
  return fetch({
    url: "/roles",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyRole(parameter) {
  return fetch({
    url: "/roles/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function batchRemoveRole(parameter) {
  return fetch({
    url: "/roles/batch",
    method: "post",
    data: parameter
  });
}

export function removeRole(id) {
  return fetch({
    url: "/roles/" + id,
    method: "delete"
  });
}
