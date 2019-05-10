import { getPermission } from "@/api/permission/permission";
// eslint-disable-next-line
import {  BasicLayout } from "@/components";

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout
};

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: "*",
  redirect: "/404",
  hidden: true
};

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
        const result = res.data;
        const routers = generator(result);
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
    if (item.component) {
      console.log(222);
    }
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${(parent && parent.path) || ""}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || "",
      // 该路由对应页面的 组件
      component: item.component
        ? constantRouterComponents[item.component || item.key]
        : function(resolve) {
            require([
              `../views` +
                `${(parent && parent.path) || ""}/${item.key}` +
                `.vue`
            ], resolve);
          },
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.title,
        icon: item.icon || undefined,
        permission: (item.key && [item.key]) || null,
        closeable: true
      }
    };
    console.log(parent);
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
