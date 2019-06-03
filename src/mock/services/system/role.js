import Mock from "mockjs2";
import { builder } from "../../util";

const pageRole = () => {
  return builder({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: [
      {
        id: 1,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 2,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 3,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 4,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 5,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 6,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 7,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 8,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 9,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      },
      {
        id: 10,
        code: 10001,
        name: "管理员",
        tenantName: "租户1",
        status: 1
      }
    ]
  });
};

// eslint-disable-next-line no-unused-vars
export const removeRole = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const addRole = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const modifyRole = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const getRole = req => {
  return builder({
    id: 1,
    code: 10001,
    name: "管理员",
    tenantId: 1,
    tenantName: "租户1",
    status: 1
  });
};

Mock.mock(/\/roles\/1/, "get", getRole);
Mock.mock(/\/roles\/1/, "put", modifyRole);
Mock.mock(/\/roles/, "get", pageRole);
Mock.mock(/\/roles/, "post", addRole);
Mock.mock(/\/roles\/batch/, "post", removeRole);
Mock.mock(/\/roles/, "delete", removeRole);
