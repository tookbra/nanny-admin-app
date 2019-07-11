import { fetch } from "@/libs/fetch";

export function pageProduct(parameter) {
  return fetch({
    url: "/system/products",
    method: "get",
    params: parameter
  });
}

export function getProduct(id) {
  return fetch({
    showLoading: true,
    url: "/system/products/" + id,
    method: "get"
  });
}

export function batchRemoveProduct(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/products/batch",
    method: "post",
    data: parameter
  });
}
export function removeProduct(id) {
  return fetch({
    showLoading: true,
    url: "/system/products/" + id,
    method: "delete"
  });
}

export function addProduct(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/products",
    method: "post",
    data: parameter
  });
}

export function modifyProduct(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/products/" + parameter.id,
    method: "put",
    data: parameter
  });
}
