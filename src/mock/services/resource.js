import Mock from "mockjs2";
import { builder } from "../util";

const getResource = () => {
  return builder([
    {
      title: "系统管理",
      key: "system",
      icon: "setting",
      component: "BasicLayout",
      children: [
        {
          title: "租户管理",
          key: "tenant"
        },
        {
          title: "角色管理",
          key: "role"
        },
        {
          title: "菜单管理",
          key: "menu"
        },
        {
          title: "权限管理",
          key: "permission"
        },
        {
          title: "字典管理",
          key: "dict"
        }
      ]
    }
  ]);
};

Mock.mock(/\/permissions\/router/, getResource);
