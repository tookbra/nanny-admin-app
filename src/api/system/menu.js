import { fetch } from "@/libs/fetch";

export function pageMenu(parameter) {
  return fetch({
    url: "/system/menus",
    method: "get",
    params: parameter
  });
}

export function menuTree() {
  return fetch({
    url: "/system/menus/tree",
    method: "get"
  });
}

export function getMenu(id) {
  return fetch({
    showLoading: true,
    url: "/system/menus/" + id,
    method: "get"
  });
}

export function batchRemoveMenu(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/menus/batch",
    method: "delete",
    data: parameter
  });
}
export function removeMenu(id) {
  return fetch({
    showLoading: true,
    url: "/system/menus/" + id,
    method: "delete"
  });
}

export function addMenu(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/menus",
    method: "post",
    data: parameter
  });
}

export function modifyMenu(parameter) {
  return fetch({
    showLoading: true,
    url: "/system/menus/" + parameter.id,
    method: "put",
    data: parameter
  });
}
