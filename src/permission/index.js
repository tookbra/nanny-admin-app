import Vue from "vue";
import router from "../router";
import store from "../store";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import notification from "ant-design-vue/es/notification";
import { ACCESS_TOKEN } from "@/store/mutation-types";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["login", "register", "registerResult"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar

  // eslint-disable-next-line no-constant-condition
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === "/login") {
      next({ path: "/home" });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch("GetAccountInfo")
          .then(res => {
            const roles = res.result && res.result.role;
            // 调用 vuex 的 从后端获取用户的路由菜单，动态添加可访问路由表
            store.dispatch("GetPermissions", { roles }).then(() => {
              // 把已获取到的路由菜单加入到路由表中
              router.addRoutes(store.getters.addRouters);
              const redirect = decodeURIComponent(
                from.query.redirect || to.path
              );
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true });
              } else {
                // 跳转到目的路由
                next({ path: redirect });
              }
            });
          })
          .catch(() => {
            notification.error({
              message: "错误",
              description: "请求用户信息失败，请重试"
            });
            store.dispatch("Logout").then(() => {
              next({ path: "/user/login", query: { redirect: to.fullPath } });
            });
          });
      } else {
        store.commit("SET_TAGS", to);
        next();
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
const action = Vue.directive("action", {
  bind: function(el, binding, vnode) {
    const actionName = binding.arg;
    const roles = store.getters.roles;
    const elVal = vnode.context.$route.meta.permission;
    const permissionId = (elVal instanceof String && [elVal]) || elVal;
    roles.permissions.forEach(p => {
      if (!permissionId.includes(p.permissionId)) {
        return;
      }
      if (p.actionList && !p.actionList.includes(actionName)) {
        (el.parentNode && el.parentNode.removeChild(el)) ||
          (el.style.display = "none");
      }
    });
  }
});

export { action };
