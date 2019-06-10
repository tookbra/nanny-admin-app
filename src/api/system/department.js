import { fetch } from "@/libs/fetch";

export function addDepartment(parameter) {
  return fetch({
    url: "/departments",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function getDepartmentByTenant(tenantId) {
  return fetch({
    url: "/departments/tenant/" + tenantId,
    method: "get"
  });
}

export function getDepartment(id) {
  return fetch({
    url: "/departments/" + id,
    method: "get"
  });
}

export function batchRemove(id) {
  return fetch({
    url: "/departments/batch",
    data: id,
    method: "delete"
  });
}
export function remove(id) {
  return fetch({
    url: "/departments/" + id,
    method: "delete"
  });
}
