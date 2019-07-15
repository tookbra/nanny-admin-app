import { fetch } from "@/libs/fetch";

// 分页查询
export function pageWashCar(parameter) {
  return fetch({
    url: "/system/wash/cars",
    method: "get",
    params: parameter
  });
}

// 获取洗涤公司车辆
export function getWashCar(id) {
  return fetch({
    showLoading: true,
    url: "/system/wash/cars/" + id,
    method: "get"
  });
}

// 增加洗涤公司车辆
export function addWashCar(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/cars",
    method: "post",
    data: parameter
  });
}

// 修改洗涤公司车辆
export function modifyWashCar(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/cars/" + parameter.id,
    method: "put",
    data: parameter
  });
}

// 批量洗涤公司车辆
export function batchRemoveWashCar(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/wash/cars/batch",
    method: "delete",
    data: parameter
  });
}

// 删除洗涤公司车辆
export function removeWashCar(id) {
  return fetch({
    showLoading: true,
    url: "/system/wash/cars/" + id,
    method: "delete"
  });
}
