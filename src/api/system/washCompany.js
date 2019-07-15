import { fetch } from "@/libs/fetch";

// 分页查询
export function pageCompany(parameter) {
  return fetch({
    url: "/system/wash/companies",
    method: "get",
    params: parameter
  });
}

// 获取洗涤公司详情
export function getCompany(id) {
  return fetch({
    showLoading: true,
    url: "/system/wash/companies/" + id,
    method: "get"
  });
}

// 获取所有洗涤公司
export function getAllWashComapany() {
  return fetch({
    url: "/system/wash/companies/all",
    method: "get"
  });
}

// 增加洗涤公司
export function addCompany(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/companies",
    method: "post",
    data: parameter
  });
}

// 修改洗涤公司
export function modifyCompany(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/companies/" + parameter.id,
    method: "put",
    data: parameter
  });
}

// 批量删除洗涤公司
export function batchRemoveCompany(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/companies/batch",
    method: "delete",
    data: parameter
  });
}

// 删除洗涤公司
export function removeCompany(id) {
  return fetch({
    showLoading: true,
    url: "/system/wash/companies/" + id,
    method: "delete"
  });
}
