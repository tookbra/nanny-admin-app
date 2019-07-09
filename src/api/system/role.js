import { fetch } from "@/libs/fetch";

export function pageRole(parameter) {
  return fetch({
    url: "/system/roles",
    method: "get",
    params: parameter
  });
}

export function getRole(id) {
  return fetch({
    showLoading: true,
    url: "/system/roles/" + id,
    method: "get"
  });
}

export function getRoleMenu(id) {
  return fetch({
    showLoading: true,
    url: "/system/roles/" + id + "/menus",
    method: "get"
  });
}

export function addRoleMenu(id, parameter) {
  return fetch({
    showLoading: true,
    url: "/system/roles/" + id + "/menus",
    method: "post",
    data: parameter
  });
}

export function getRoleByTenantId(id) {
  return fetch({
    url: "/system/roles/tenant/" + id,
    method: "get"
  });
}

export function addRole(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/roles",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyRole(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/roles/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function batchRemoveRole(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/roles/batch",
    method: "delete",
    data: parameter
  });
}

export function removeRole(id) {
  return fetch({
    showLoading: true,
    url: "/system/roles/" + id,
    method: "delete"
  });
}
