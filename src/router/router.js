/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/account/login.vue")
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404.vue")
  }
];
