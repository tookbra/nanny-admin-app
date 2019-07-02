import { fetch } from "@/libs/fetch";

export function dictTree() {
  return fetch({
    url: "/system/dicts/tree",
    method: "get"
  });
}

export function pageDict(parameter) {
  return fetch({
    url: "/system/dicts",
    method: "get",
    data: parameter
  });
}

export function getDict(id) {
  return fetch({
    url: "/system/dicts/" + id,
    method: "get"
  });
}

export function getDictByType(parameter) {
  return fetch({
    url: "/system/dicts/type/" + parameter,
    method: "get"
  });
}

export function addDict(parameter) {
  return fetch({
    url: "/system/dicts",
    method: "post",
    data: parameter
  });
}

export function modifyDict(parameter) {
  return fetch({
    url: "/system/dicts/" + parameter.id,
    method: "put",
    data: parameter
  });
}

export function batchRemoveDict(parameter) {
  return fetch({
    url: "/system/dicts/batch",
    method: "post",
    data: parameter
  });
}

export function removeDict(id) {
  return fetch({
    url: "/system/dicts/" + id,
    method: "delete"
  });
}
