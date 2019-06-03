import { fetch } from "@/libs/fetch";

export function pageMenu(parameter) {
  return fetch({
    url: "/menus",
    method: "get",
    data: parameter
  });
}

export function getMenu(id) {
  return fetch({
    url: "/menus/" + id,
    method: "get"
  });
}

export function batchRemoveMenu(parameter) {
  return fetch({
    url: "/menus/batch",
    method: "post",
    data: parameter
  });
}
export function removeMenu(id) {
  return fetch({
    url: "/menus/" + id,
    method: "delete"
  });
}

export function addMenu(parameter) {
  return fetch({
    url: "/menus",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyMenu(parameter) {
  return fetch({
    url: "/menus/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

