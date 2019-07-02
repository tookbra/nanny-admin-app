import Vue from "vue";
import { login, logout } from "@/api/account/login";
import { getAccountInfo } from "@/api/account/account";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { clearStore } from "@/libs/store";
export default {
  state: {
    userName: "",
    token: "",
    name: "",
    avatar: "",
    info: "",
    roles: []
  },
  getters: {
    name: state => state.name,
    avatar: state => state.avatar,
    roles: state => state.roles
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            Vue.ls.set(
              ACCESS_TOKEN,
              response.access_token,
              7 * 24 * 60 * 60 * 1000
            );
            commit("SET_TOKEN", response.access_token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetAccountInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getAccountInfo()
          .then(response => {
            const result = response.data;
            if (result.roles && result.permissions.length > 0) {
              const role = result.roles;
              role.permissions = result.permissions;
              role.permissions.map(per => {
                if (per.actions != null && per.actions.length > 0) {
                  const action = per.actions.map(action => {
                    return action.action;
                  });
                  per.actionList = action;
                }
              });
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId;
              });
              commit("SET_ROLES", result.roles);
              commit("SET_INFO", result);
            } else {
              reject(new Error("getInfo: roles must be a non-null array !"));
            }
            // commit("SET_NAME", { name: result.name });
            // commit("SET_AVATAR", result.avatar);

            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        Vue.ls.remove(ACCESS_TOKEN);
        clearStore({ type: "session" });
        logout()
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_NAME: (state, { name }) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  }
};
