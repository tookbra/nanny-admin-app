import { fetch } from "@/libs/fetch";

export function pagePermission(parameter) {
  return fetch({
    url: "/permissions",
    method: "get",
    data: parameter
  });
}

export function getPermission(id) {
  return fetch({
    url: "/permissions/" + id,
    method: "get"
  });
}

export function addPermission(parameter) {
  return fetch({
    url: "/permissions",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function batchRemovePermission(parameter) {
  return fetch({
    url: "/permissions/batch",
    method: "post",
    data: parameter
  });
}
export function removePermission(id) {
  return fetch({
    url: "/permissions/" + id,
    method: "delete"
  });
}

export function modifyPermission(parameter) {
  console.log(parameter);
  return fetch({
    url: "/permissions/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}
