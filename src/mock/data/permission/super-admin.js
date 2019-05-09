export const superAdminPermission = [
  {
    title: "首页",
    key: "",
    name: "index",
    component: "BasicLayout",
    children: [
      {
        title: "系统管理",
        key: "system",
        icon: "setting",
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
    ]
  }
];
