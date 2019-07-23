import { fetch } from "@/libs/fetch";

// 分页查询员工呢
export function pageEmployee(parameter) {
  return fetch({
    url: "/system/employees",
    method: "get",
    params: parameter
  });
}

// 获取员工详情
export function getEmployee(id) {
  return fetch({
    showLoading: true,
    url: "/system/employees/" + id,
    method: "get"
  });
}

// 获取部门员工
export function getEmployeeByDepartmentId(id) {
  return fetch({
    showLoading: true,
    url: "/system/employees/department/" + id,
    method: "get"
  });
}

// 批量删除员工
export function batchRemoveEmployee(parameter) {
  return fetch({
    url: "/system/employees/batch",
    method: "delete",
    data: parameter
  });
}

// 删除员工
export function removeEmployee(id) {
  return fetch({
    url: "/system/employees/" + id,
    method: "delete"
  });
}

// 新增员工
export function addEmployee(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/employees",
    method: "post",
    data: parameter
  });
}

// 修改员工
export function modifyEmployee(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/employees/" + parameter.id,
    method: "put",
    data: parameter
  });
}

// 禁用员工
export function disable(parameter) {
  return fetch({
    url: "/system/employees/disable/" + parameter,
    method: "put"
  });
}

// 获取所有员工
export function getAllEmployee(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/employees/tenant/" + parameter + "/all",
    method: "get"
  });
}

// 导入确认
export function importConfirm(paramter) {
  return fetch({
    showLoading: true,
    url: "/system/employees/importConfirm",
    method: "post",
    data: paramter
  });
}

export function changePassword(paramter) {
  return fetch({
    showLoading: true,
    url: "/system/employees/password",
    method: "put",
    data: paramter
  });
}
