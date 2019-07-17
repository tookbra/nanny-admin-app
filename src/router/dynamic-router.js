import { getPermission } from "@/api/permission/permission";
// eslint-disable-next-line
import {  BasicLayout, RouteView } from "@/components";

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  RouteView: RouteView,
  home: () => import("@/views/home/home.vue"),
  changePwd: () => import("@/views/account/change_pwd.vue"),
  setting: () => import("@/views/account/settings/index.vue")
};

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: "*",
  redirect: "/404",
  hidden: true
};

const defaultRouter = [
  {
    path: "",
    component: "BasicLayout",
    name: "index",
    redirect: "/home",
    children: [
      {
        path: "home",
        code: "home",
        name: "首页",
        closeable: false,
        component: "home",
        hidden: true
      },
      {
        path: "change_pwd",
        code: "change_pwd",
        name: "修改密码",
        closeable: true,
        component: "changePwd",
        hidden: true
      },
      {
        path: "setting",
        code: "setting",
        name: "个人中心",
        closeable: true,
        component: "setting",
        hidden: true
      }
    ]
  }
];

/**
 * 获取路由菜单信息
 *
 * 1. 调用 getRouterByUser() 访问后端接口获得路由结构数组
 *    @see https://github.com/sendya/ant-design-pro-vue/blob/feature/dynamic-menu/public/dynamic-menu.json
 * 2. 调用
 * @returns {Promise<any>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    // ajax
    getPermission()
      .then(res => {
        let defaultChildren = defaultRouter[0].children;
        let children = [...defaultChildren, ...res.data];
        defaultRouter[0].children = children;
        const routers = generator(defaultRouter);
        routers.push(notFoundRouter);
        resolve(routers);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    let path = "";
    if (parent && parent.path !== "/") {
      path = parent.path;
    }
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${(parent && parent.path) || ""}/${item.path}`,
      // 路由名称，建议唯一
      name: item.code || item.key || "",
      // 该路由对应页面的 组件
      component: item.component
        ? constantRouterComponents[item.component || item.path]
        : function(resolve) {
            require([`../views` + `${path}/${item.path}` + `.vue`], resolve);
          },
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.name,
        icon: item.icon || undefined,
        permission: (item.path && [item.path]) || null,
        closeable: true
      },
      hidden: item.hidden,
      hiddenChildren: item.hiddenChildren
    };
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace("//", "/");
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter);
    }
    return currentRouter;
  });
};
