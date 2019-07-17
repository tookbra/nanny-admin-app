import { fetch } from "@/libs/fetch";

// 分页查询
export function pageRfid(parameter) {
  return fetch({
    url: "/system/rfids",
    method: "get",
    params: parameter
  });
}

// 获取RFID信息
export function getRfid(id) {
  return fetch({
    showLoading: true,
    url: "/system/rfids/" + id,
    method: "get"
  });
}

// 增加RFID信息
export function addRfid(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/rfids",
    method: "post",
    data: parameter
  });
}

// 修改RFID信息
export function modifyRfid(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/rfids/" + parameter.id,
    method: "put",
    data: parameter
  });
}

// 批量删除RFID信息
export function batchRemoveRfid(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/rfids/batch",
    method: "delete",
    data: parameter
  });
}

// 删除RFID信息
export function removeRfid(id) {
  return fetch({
    showLoading: true,
    url: "/system/rfids/" + id,
    method: "delete"
  });
}

// 导入确认
export function importConfirm(paramter) {
  return fetch({
    showLoading: true,
    url: "/system/rfids/importConfirm",
    method: "post",
    data: paramter
  });
}
