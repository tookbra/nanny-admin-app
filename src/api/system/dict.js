import { fetch } from "@/libs/fetch";

export function pageDict(parameter) {
  return fetch({
    url: "/dicts",
    method: "get",
    data: parameter
  });
}

export function getDict(id) {
  return fetch({
    url: "/dicts/" + id,
    method: "get"
  });
}

export function getDictByCode(code) {
  return fetch({
    url: "/dicts/" + code,
    method: "get"
  });
}

export function addDict(parameter) {
  return fetch({
    url: "/dicts",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function modifyDict(parameter) {
  return fetch({
    url: "/dicts/" + parameter.id,
    method: "put",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

export function batchRemoveDict(parameter) {
  return fetch({
    url: "/dicts/batch",
    method: "post",
    data: parameter
  });
}

export function removeDict(id) {
  return fetch({
    url: "/dicts/" + id,
    method: "delete"
  });
}
