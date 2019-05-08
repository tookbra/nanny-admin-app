export const superAdminPermission = {
  path: "/",
  name: "index",
  component: "BasicLayout",
  meta: { title: "首页" },
  redirect: "/dashboard/workplace",
  children: [
    // dashboard
    {
      path: "/system",
      name: "system",
      hideChildrenInMenu: true,
      meta: {
        title: "系统管理",
        keepAlive: true,
        icon: "bxAnaalyse",
        permission: ["dashboard"]
      },
      children: [
        {
          path: "/system/tenant",
          name: "tenant",
          component: () => import("@/views/system/tenant"),
          meta: {
            title: "租户管理",
            keepAlive: false,
            permission: ["dashboard"]
          }
        }
      ]
    }
  ]
};
