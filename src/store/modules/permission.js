import { constantRouterMap } from "@/router/router";
import { generatorDynamicRouter } from "@/router/dynamic-router";

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  getters: {
    addRouters: state => state.addRouters
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    /**
     * 构建获取和构建路由和菜单信息
     * @param commit
     * @param data
     * @returns {Promise<any>}
     * @constructor
     */
    GetPermissions({ commit }, data) {
      return new Promise(resolve => {
        generatorDynamicRouter(data).then(routers => {
          commit("SET_ROUTERS", routers);
          resolve();
        });
      });
    }
  }
};

export default permission;
