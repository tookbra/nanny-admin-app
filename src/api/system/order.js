import { fetch } from "@/libs/fetch";

// 分页查询订单
export function pageOrder(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/orders",
    method: "get",
    params: parameter
  });
}

// 分页查询订单
export function pageOrderProduct(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/orders/product",
    method: "get",
    params: parameter
  });
}

// 分页查询订单
export function pageOrderDetail(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/orders/details",
    method: "get",
    params: parameter
  });
}
