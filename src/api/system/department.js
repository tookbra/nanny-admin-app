import { fetch } from "@/libs/fetch";

export function addDepartment(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/departments",
    method: "post",
    data: parameter
  });
}

export function modifyDeparment(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/departments/" + parameter.id,
    method: "put",
    data: parameter
  });
}

export function getDepartmentByTenant(tenantId) {
  return fetch({
    showLoading: true,
    url: "/system/departments/tenant/" + tenantId + "/tree",
    method: "get"
  });
}

export function getDepartment(id) {
  return fetch({
    showLoading: true,
    url: "/system/departments/" + id,
    method: "get"
  });
}

export function batchRemove(id) {
  return fetch({
    showLoading: true,
    url: "/system/departments/batch",
    data: id,
    method: "delete"
  });
}
export function remove(id) {
  return fetch({
    showLoading: true,
    url: "/system/departments/" + id,
    method: "delete"
  });
}

export function importConfirm(paramter) {
  return fetch({
    url: "/system/departments/importConfirm",
    method: "post",
    data: paramter
  });
}
