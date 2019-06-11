import Mock from "mockjs2";
import { builder } from "../../util";

const pageAccount = () => {
  return builder({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: [
      {
        id: 1,
        account: "test",
        realName: "test",
        sex: 1,
        status: 1
      },
      {
        id: 2,
        account: "test",
        realName: "test",
        sex: 1,
        status: 1
      },
      {
        id: 3,
        account: "test",
        realName: "test",
        sex: 1,
        status: 1
      },
      {
        id: 4,
        account: "test",
        realName: "test",
        sex: 1,
        status: 1
      },
      {
        id: 5,
        account: "test",
        realName: "test",
        sex: 1,
        status: 1
      }
    ]
  });
};

// eslint-disable-next-line no-unused-vars
const getAccountInfo = req => {
  return builder({
    avatar: "https://blog.tookbra.com/images/logo.png",
    name: "admin",
    status: 1,
    role: {
      permissions: [
        {
          permissionName: "租户管理",
          permissionId: "",
          actions: [
            {
              action: "add",
              describe: "新增",
              defaultCheck: false
            },
            {
              action: "query",
              describe: "查询",
              defaultCheck: false
            },
            {
              action: "detail",
              describe: "详情",
              defaultCheck: false
            },
            {
              action: "update",
              describe: "修改",
              defaultCheck: false
            },
            {
              action: "delete",
              describe: "删除",
              defaultCheck: false
            }
          ]
        }
      ]
    }
  });
};

// eslint-disable-next-line no-unused-vars
export const removeAccount = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const addAccount = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const modifyAccount = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const getAccount = req => {
  return builder({
    id: "1",
    account: "test",
    realName: "/test",
    sex: 1
  });
};

Mock.mock(/\/account\/info/, getAccountInfo);
Mock.mock(/\/accounts/, "get", pageAccount);
Mock.mock(/\/accounts\/1/, "get", getAccount);
Mock.mock(/\/accounts\/1/, "put", modifyAccount);
Mock.mock(/\/accounts/, "post", addAccount);
Mock.mock(/\/accounts/, "delete", removeAccount);
Mock.mock(/\/accounts\/batch/, "post", removeAccount);
