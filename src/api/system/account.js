import { fetch } from "@/libs/fetch";

export function pageAccount(parameter) {
  return fetch({
    url: "/system/accounts",
    method: "get",
    params: parameter
  });
}

export function getAccount(id) {
  return fetch({
    url: "/system/accounts/" + id,
    method: "get"
  });
}

export function batchRemoveAccount(parameter) {
  return fetch({
    url: "/system/accounts/batch",
    method: "delete",
    data: parameter
  });
}
export function removeAccount(id) {
  return fetch({
    url: "/system/accounts/" + id,
    method: "delete"
  });
}

export function addAccount(parameter) {
  return fetch({
    url: "/system/accounts",
    method: "post",
    data: parameter
  });
}

export function modifyAccount(parameter) {
  return fetch({
    url: "/system/accounts/" + parameter.id,
    method: "put",
    data: parameter
  });
}

export function disable(parameter) {
  return fetch({
    url: "/system/accounts/disable/" + parameter,
    method: "put"
  });
}

export function getAllAccount(parameter) {
  return fetch({
    url: "/system/accounts/tenant/" + parameter + "/all",
    method: "get"
  });
}

export function importConfirm(paramter) {
  return fetch({
    url: "/system/accounts/importConfirm",
    method: "post",
    data: paramter
  });
}
