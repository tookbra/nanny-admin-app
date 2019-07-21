import { fetch } from "@/libs/fetch";

// 产品实时追溯
export function traceability(parameter) {
  return fetch({
    url: "/system/reports/traceability",
    method: "get",
    params: parameter
  });
}

// 产品配备信息
export function allocate(parameter) {
  return fetch({
    url: "/system/reports/allocate",
    method: "get",
    params: parameter
  });
}

// 产品配备信息
export function washReport(parameter) {
  return fetch({
    url: "/system/reports/order/wash",
    method: "get",
    params: parameter
  });
}

// 产品新增汇总
export function rfidAddReport(parameter) {
  return fetch({
    url: "/system/reports/order/rfid/add",
    method: "get",
    params: parameter
  });
}
