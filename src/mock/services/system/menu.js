import Mock from "mockjs2";
import { builder } from "../../util";

const pageMenu = () => {
  return builder({
    pageNo: 1,
    pages: 1,
    pageSize: 1,
    total: 10,
    records: [
      {
        id: "1",
        name: "系统管理",
        path: "/system",
        icon: "setting",
        code: "system",
        category: 1,
        sort: 0,
        parentId: "0",
        status: 1,
        children: [
          {
            id: "2",
            name: "租户管理",
            path: "/system/tenant",
            icon: "",
            code: "tenant",
            parentId: "1",
            category: 1,
            sort: 0,
            status: 1,
            children: [
              {
                id: "12",
                name: "新增",
                path: "/system/tenant",
                icon: "",
                code: "tenant",
                category: 2,
                status: 1,
                parentId: "2",
                sort: 0
              },
              {
                id: "13",
                name: "修改",
                path: "/system/tenant",
                icon: "",
                code: "tenant",
                category: 2,
                parentId: "2",
                status: 1,
                sort: 0
              },
              {
                id: "14",
                name: "删除",
                path: "/system/tenant",
                icon: "",
                code: "tenant",
                category: 2,
                parentId: "2",
                status: 1,
                sort: 0
              }
            ]
          },
          {
            id: "3",
            name: "角色管理",
            path: "/system/role",
            icon: "",
            code: "tenant",
            category: 1,
            parentId: "1",
            status: 1,
            sort: 0
          },
          {
            id: "4",
            name: "菜单管理",
            path: "/system/menu",
            icon: "",
            code: "tenant",
            parentId: "1",
            category: 1,
            status: 1,
            sort: 0
          }
        ]
      }
    ]
  });
};

// eslint-disable-next-line no-unused-vars
export const removeMenu = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const getMenu = req => {
  return builder({
    id: "1",
    name: "系统管理",
    path: "/system",
    icon: "setting",
    code: "system",
    sort: 0,
    parentId: "1",
    category: 1,
    status: 1,
    remark: "22222",
    opened: 1
  });
};

// eslint-disable-next-line no-unused-vars
export const addMenu = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const modifyMenu = req => {
  return builder({});
};

Mock.mock(/\/menus\/1/, "get", getMenu);
Mock.mock(/\/menus/, "get", pageMenu);
Mock.mock(/\/menus\/1/, "put", modifyMenu);
Mock.mock(/\/menus/, "post", addMenu);
Mock.mock(/\/menus/, "delete", removeMenu);
Mock.mock(/\/menus\/batch/, "post", removeMenu);
