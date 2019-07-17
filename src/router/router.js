// eslint-disable-next-line
import { BasicLayout } from '@/components'
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
  // {
  //   path: "/",
  //   component: BasicLayout,
  //   redirect: "/home",
  //   children: [
  //     {
  //       path: "home",
  //       name: "首页",
  //       meta: { title: "首页", closeable: false },
  //       component: () => import("@/views/home/home.vue")
  //     },
  //     {
  //       path: "change_pwd",
  //       name: "修改密码",
  //       meta: { title: "修改密码", closeable: true },
  //       component: () => import("@/views/account/change_pwd.vue")
  //     },
  //     {
  //       path: "setting",
  //       name: "个人中心",
  //       meta: { title: "个人中心", closeable: true },
  //       component: () => import("@/views/account/settings/index.vue")
  //     }
  //   ]
  // },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404.vue")
  }
];
