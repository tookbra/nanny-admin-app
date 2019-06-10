import Mock from "mockjs2";
import { builder } from "../../util";

const tenantsDepartments = () => {
  return builder([
    {
      key: 1,
      value: 1,
      title: "领导科室",
      children: [
        {
          key: 6,
          value: 5,
          title: "领导科室-1"
        }
      ]
    },
    {
      key: 2,
      value: 2,
      title: "领导科室1"
    },
    {
      key: 3,
      value: 3,
      title: "领导科室2"
    }
  ]);
};

const getDepartment = () => {
  return builder({
    id: 1,
    name: "领导科室",
    parentId: 0,
    parentName: "",
    sort: 0,
    address: "",
    remark: ""
  });
};

// eslint-disable-next-line no-unused-vars
export const removeDepart = req => {
  return builder({});
};

// eslint-disable-next-line no-unused-vars
export const addDepartment = req => {
  return builder({});
};

Mock.mock(/\/departments\/tenant\/0/, "get", tenantsDepartments);
Mock.mock(/\/departments\/1/, "get", getDepartment);
Mock.mock(/\/departments\/batch/, "delete", removeDepart);
Mock.mock(/\/departments\/1/, "delete", removeDepart);
Mock.mock(/\/departments/, "post", addDepartment);
