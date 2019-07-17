import { fetch } from "@/libs/fetch";

// 分页查询员工呢
export function traceability(parameter) {
  return fetch({
    url: "/system/reports/traceability",
    method: "get",
    params: parameter
  });
}
