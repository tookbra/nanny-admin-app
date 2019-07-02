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
    method: "post",
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
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyAccount(parameter) {
  return fetch({
    url: "/system/accounts/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}
