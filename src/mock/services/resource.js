import Mock from "mockjs2";
import { builder } from "../util";

const getResource = () => {
  return builder([
    {
      title: "基础资料",
      key: "basicInfo",
      icon: "setting",
      component: "BasicLayout",
      children: [
        {
          title: "产品信息",
          key: "product"
        }
      ]
    },
    {
      title: "芯片管理",
      key: "rfid",
      icon: "setting",
      component: "BasicLayout",
      children: [
        {
          title: "芯片信息",
          key: "rfidInfo"
        }
      ]
    },
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
          title: "用户管理",
          key: "account"
        },
        {
          title: "科室管理",
          key: "department"
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
          title: "数据字典",
          key: "dict"
        },
        {
          title: "系统配置",
          key: "setting"
        }
      ]
    }
  ]);
};

Mock.mock(/\/permissions\/router/, getResource);
