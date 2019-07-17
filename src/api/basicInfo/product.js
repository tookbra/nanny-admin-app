import { fetch } from "@/libs/fetch";

// 分页查询
export function pageProduct(parameter) {
  return fetch({
    url: "/system/products",
    method: "get",
    params: parameter
  });
}

// 产品详情
export function getProduct(id) {
  return fetch({
    showLoading: true,
    url: "/system/products/" + id,
    method: "get"
  });
}

// 根据产品类型查询产品
export function getProductByType(id) {
  return fetch({
    showLoading: true,
    url: "/system/products/type/" + id,
    method: "get"
  });
}

// 查询所有生效的产品
export function getProductAll() {
  return fetch({
    showLoading: true,
    url: "/system/products/all",
    method: "get"
  });
}

// 批量删除
export function batchRemoveProduct(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/products/batch",
    method: "post",
    data: parameter
  });
}

// 删除
export function removeProduct(id) {
  return fetch({
    showLoading: true,
    url: "/system/products/" + id,
    method: "delete"
  });
}

// 新增产品
export function addProduct(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/products",
    method: "post",
    data: parameter
  });
}

// 修改产品
export function modifyProduct(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/products/" + parameter.id,
    method: "put",
    data: parameter
  });
}
