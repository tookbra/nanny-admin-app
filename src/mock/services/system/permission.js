import Mock from "mockjs2";
import { builder } from "../../util";

const pagePermission = () => {
  return builder({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: [
      {
        id: 1,
        name: "系统管理",
        actions: [
          { action: "query", defaultCheck: false, describe: "查询" },
          { action: "get", defaultCheck: false, describe: "详情" },
          { action: "add", defaultCheck: false, describe: "新增" },
          { action: "update", defaultCheck: false, describe: "修改" },
          { action: "delete", defaultCheck: false, describe: "删除" }
        ],
        status: 1
      },
      {
        id: 2,
        name: "租户管理",
        actions: [
          { action: "query", defaultCheck: false, describe: "查询" },
          { action: "get", defaultCheck: false, describe: "详情" },
          { action: "add", defaultCheck: false, describe: "新增" },
          { action: "update", defaultCheck: false, describe: "修改" },
          { action: "delete", defaultCheck: false, describe: "删除" }
        ],
        status: 1
      },
      {
        id: 3,
        name: "菜单管理",
        actions: [
          { action: "query", defaultCheck: false, describe: "查询" },
          { action: "get", defaultCheck: false, describe: "详情" },
          { action: "add", defaultCheck: false, describe: "新增" },
          { action: "update", defaultCheck: false, describe: "修改" },
          { action: "delete", defaultCheck: false, describe: "删除" }
        ],
        status: 2
      },
      {
        id: 4,
        name: "权限管理",
        actions: [
          { action: "query", defaultCheck: false, describe: "查询" },
          { action: "get", defaultCheck: false, describe: "详情" },
          { action: "add", defaultCheck: false, describe: "新增" },
          { action: "update", defaultCheck: false, describe: "修改" },
          { action: "delete", defaultCheck: false, describe: "删除" }
        ],
        status: 2
      }
    ]
  });
};

// eslint-disable-next-line no-unused-vars
export const removePermission = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const getPermission = req => {
  return builder({
    id: 1,
    name: "系统管理",
    actions: [1, 2, 3, 4, 5],
    status: 1
  });
};

// eslint-disable-next-line no-unused-vars
export const addPermission = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const modifyPermission = req => {
  return builder({});
};

Mock.mock(/\/permissions\/1/, "get", getPermission);
Mock.mock(/\/permissions\/1/, "put", modifyPermission);
Mock.mock(/\/permissions/, "get", pagePermission);
Mock.mock(/\/permissions/, "delete", removePermission);
Mock.mock(/\/permissions/, "post", addPermission);
Mock.mock(/\/permissions\/batch/, "post", removePermission);
