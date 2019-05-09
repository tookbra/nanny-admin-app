import { commonResult } from "./common";

// eslint-disable-next-line no-unused-vars
export const getAccountInfo = req => {
  return commonResult({
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
