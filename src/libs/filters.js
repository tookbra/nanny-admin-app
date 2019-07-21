import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const statusMap = {
  1: "正常",
  2: "禁用"
};

export function statusFilter(status) {
  return statusMap[status];
}

export function typeFilter(type, typeMap) {
  return typeMap.get(type + "");
}

export function dateFormat(date, pattern = "YYYY-MM-DD") {
  return moment(date).format(pattern);
}
