import { fetch } from "@/libs/fetch";

// 分页查询
export function pageTenant(parameter) {
  return fetch({
    url: "/system/tenants",
    method: "get",
    params: parameter
  });
}

// 获取租户详情
export function getTenant(id) {
  return fetch({
    showLoading: true,
    url: "/system/tenants/" + id,
    method: "get"
  });
}

// 获取所有租户
export function getAllTenant() {
  return fetch({
    showLoading: true,
    url: "/system/tenants/all",
    method: "get"
  });
}

// 增加租户
export function addTenant(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/tenants",
    method: "post",
    data: parameter
  });
}

// 修改租户
export function modifyTenant(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/tenants/" + parameter.id,
    method: "put",
    data: parameter
  });
}

// 批量删除租户
export function batchRemoveTenant(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/tenants/batch",
    method: "delete",
    data: parameter
  });
}

// 删除租户
export function removeTenant(id) {
  return fetch({
    showLoading: true,
    url: "/system/tenants/" + id,
    method: "delete"
  });
}
