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
