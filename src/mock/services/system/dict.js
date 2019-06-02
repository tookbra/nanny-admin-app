import Mock from "mockjs2";
import { builder } from "../../util";

const pageDict = () => {
  return builder({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: [
      {
        id: 1,
        name: "权限",
        code: "permission",
        dictKey: "query",
        dictValue: "查询"
      },
      {
        id: 2,
        name: "权限",
        code: "permission",
        dictKey: "get",
        dictValue: "详情"
      },
      {
        id: 3,
        name: "权限",
        code: "permission",
        dictKey: "add",
        dictValue: "新增"
      },
      {
        id: 4,
        name: "权限",
        code: "permission",
        dictKey: "update",
        dictValue: "修改"
      },
      {
        id: 5,
        name: "权限",
        code: "permission",
        dictKey: "delete",
        dictValue: "删除"
      }
    ]
  });
};

// eslint-disable-next-line no-unused-vars
export const removeDict = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const addDict = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const modifyDict = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const getDict = req => {
  return builder({
    id: 1,
    name: "权限",
    code: "permission",
    dictKey: "query",
    dictValue: "查询"
  });
};
// eslint-disable-next-line no-unused-vars
export const getDictByCode = req => {
  return builder([
    {
      id: 1,
      name: "权限",
      code: "permission",
      dictKey: "query",
      dictValue: "查询"
    },
    {
      id: 2,
      name: "权限",
      code: "permission",
      dictKey: "get",
      dictValue: "详情"
    },
    {
      id: 3,
      name: "权限",
      code: "permission",
      dictKey: "add",
      dictValue: "新增"
    },
    {
      id: 4,
      name: "权限",
      code: "permission",
      dictKey: "update",
      dictValue: "修改"
    },
    {
      id: 5,
      name: "权限",
      code: "permission",
      dictKey: "delete",
      dictValue: "删除"
    }
  ]);
};

Mock.mock(/\/dicts\?code=permission/, "get", getDictByCode);
Mock.mock(/\/dicts\/1/, "get", getDict);
Mock.mock(/\/dicts\/1/, "put", modifyDict);
Mock.mock(/\/dicts/, "get", pageDict);
Mock.mock(/\/dicts/, "post", addDict);
Mock.mock(/\/dicts\/batch/, "post", removeDict);
Mock.mock(/\/dicts/, "delete", removeDict);
