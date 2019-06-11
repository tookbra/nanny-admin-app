import { fetch } from "@/libs/fetch";

export function pageAccount(parameter) {
  return fetch({
    url: "/accounts",
    method: "get",
    data: parameter
  });
}

export function getAccount(id) {
  return fetch({
    url: "/accounts/" + id,
    method: "get"
  });
}

export function batchRemoveAccount(parameter) {
  return fetch({
    url: "/accounts/batch",
    method: "post",
    data: parameter
  });
}
export function removeAccount(id) {
  return fetch({
    url: "/accounts/" + id,
    method: "delete"
  });
}

export function addAccount(parameter) {
  return fetch({
    url: "/accounts",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyAccount(parameter) {
  return fetch({
    url: "/accounts/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}
