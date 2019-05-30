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
          key: "roleList"
        },
        {
          title: "权限管理",
          key: "tableList"
        }
      ]
    }
  ]);
};

Mock.mock(/\/permissions/, getResource);