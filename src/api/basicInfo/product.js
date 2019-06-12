import { fetch } from "@/libs/fetch";

export function pageProduct(parameter) {
  return fetch({
    url: "/products",
    method: "get",
    data: parameter
  });
}

export function getProduct(id) {
  return fetch({
    url: "/products/" + id,
    method: "get"
  });
}

export function batchRemoveProduct(parameter) {
  return fetch({
    url: "/products/batch",
    method: "post",
    data: parameter
  });
}
export function removeProduct(id) {
  return fetch({
    url: "/products/" + id,
    method: "delete"
  });
}

export function addProduct(parameter) {
  return fetch({
    url: "/products",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyProduct(parameter) {
  return fetch({
    url: "/products/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}
