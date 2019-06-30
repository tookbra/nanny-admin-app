import { fetch } from "@/libs/fetch";
import { serialize } from "@/libs/util";

export function dictTree() {
  return fetch({
    url: "/system/dictDatas/tree",
    method: "get"
  });
}

export function pageDictData(parameter) {
  return fetch({
    url: "/system/dicts/data",
    method: "get",
    params: parameter
  });
}

export function getDictData(id) {
  return fetch({
    url: "/system/dicts/data/" + id,
    method: "get"
  });
}

export function getDictByCode(code) {
  let data = { code: code };
  return getDictByParam(data);
}

export function getDictByParam(parameter) {
  return fetch({
    url: "/system/dictDatas?" + serialize(parameter),
    method: "get"
  });
}

export function addDictData(parameter) {
  return fetch({
    url: "/system/dicts/data",
    method: "post",
    data: parameter
  });
}

export function modifyDictData(parameter) {
  return fetch({
    url: "/system/dicts/data/" + parameter.id,
    method: "put",
    data: parameter
  });
}

export function batchRemoveDictData(parameter) {
  return fetch({
    url: "/system/dicts/data/batch",
    method: "delete",
    data: parameter
  });
}

export function removeData(id) {
  return fetch({
    url: "/system/dicts/data/" + id,
    method: "delete"
  });
}
