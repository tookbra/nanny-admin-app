import { fetch } from "@/libs/fetch";

// 分页查询
export function pageWashPerson(parameter) {
  return fetch({
    url: "/system/wash/persons",
    method: "get",
    params: parameter
  });
}

// 获取洗涤公司人员详情
export function getWashPerson(id) {
  return fetch({
    showLoading: true,
    url: "/system/wash/persons/" + id,
    method: "get"
  });
}

// 增加洗涤公司人员
export function addWashPerson(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/persons",
    method: "post",
    data: parameter
  });
}

// 修改洗涤公司人员
export function modifyWashPerson(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/persons/" + parameter.id,
    method: "put",
    data: parameter
  });
}

// 批量删除洗涤公司人员
export function batchRemoveWashPerson(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/persons/batch",
    method: "delete",
    data: parameter
  });
}

// 删除洗涤公司人员
export function removeWashPerson(id) {
  return fetch({
    showLoading: true,
    url: "/system/wash/persons/" + id,
    method: "delete"
  });
}
