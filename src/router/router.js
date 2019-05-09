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
  {
    path: "/",
    component: BasicLayout,
    redirect: "/home/index",
    children: [
      {
        path: "home",
        name: "首页",
        meta: { title: "首页", closeable: false },
        component: () => import("@/views/home/home.vue")
      }
    ]
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404.vue")
  }
];
