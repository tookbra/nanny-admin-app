import { fetch } from "@/libs/fetch";

// 分页查询员工呢
export function pageAccount(parameter) {
  return fetch({
    url: "/system/accounts",
    method: "get",
    params: parameter
  });
}

// 获取员工详情
export function getAccount(id) {
  return fetch({
    showLoading: true,
    url: "/system/accounts/" + id,
    method: "get"
  });
}

// 批量删除员工
export function batchRemoveAccount(parameter) {
  return fetch({
    url: "/system/accounts/batch",
    method: "delete",
    data: parameter
  });
}

// 删除员工
export function removeAccount(id) {
  return fetch({
    url: "/system/accounts/" + id,
    method: "delete"
  });
}

// 新增员工
export function addAccount(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/accounts",
    method: "post",
    data: parameter
  });
}

// 修改员工
export function modifyAccount(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/accounts/" + parameter.id,
    method: "put",
    data: parameter
  });
}

// 禁用员工
export function disable(parameter) {
  return fetch({
    url: "/system/accounts/disable/" + parameter,
    method: "put"
  });
}

// 导入确认
export function importConfirm(paramter) {
  return fetch({
    showLoading: true,
    url: "/system/accounts/importConfirm",
    method: "post",
    data: paramter
  });
}

export function changePassword(paramter) {
  return fetch({
    showLoading: true,
    url: "/system/accounts/password",
    method: "put",
    data: paramter
  });
}
