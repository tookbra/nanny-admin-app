import { fetch } from "@/libs/fetch";
import { serialize } from "@/libs/util";

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

export function getDictByCode(code) {
  let data = { code: code };
  return getDictByParam(data);
}

export function getDictByParam(parameter) {
  return fetch({
    url: "/system/dicts?" + serialize(parameter),
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
