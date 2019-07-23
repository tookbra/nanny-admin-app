import Vue from "vue";
import { login, logout, refreshToken } from "@/api/account/login";
import { getAccountInfo } from "@/api/account/account";
import { getStore } from "@/libs/store";
import {
  ACCESS_TOKEN,
  REFRESH_ACCESS_TOKEN,
  EXPIRES_IN
} from "@/store/mutation-types";
import { clearStore } from "@/libs/store";
export default {
  state: {
    token: getStore({ name: ACCESS_TOKEN }) || "",
    tenantId: "",
    tenantCode: "",
    isAdmin: false,
    name: "",
    avatar: "",
    info: "",
    roles: [],
    refreshToken: getStore({ name: REFRESH_ACCESS_TOKEN }) || "",
    expiresIn: getStore({ name: EXPIRES_IN }) || ""
  },
  getters: {
    name: state => state.name,
    avatar: state => state.avatar,
    roles: state => state.roles,
    info: state => state.info,
    tenantId: state => state.tenantId,
    tenantCode: state => state.tenantCode,
    refreshToken: state => state.refreshToken,
    expiresIn: state => state.expiresIn,
    isAdmin: state => state.isAdmin
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            commit("SET_TOKEN", response.access_token);
            commit("SET_REFRESH_TOKEN", response.refresh_token);
            commit("SET_EXPIRES_IN", response.expires_in);
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
              commit("SET_ROLES", role);
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
        commit("SET_ROLES", []);
        commit("SET_REFRESH_TOKEN", "");
        clearStore({ type: "session" });
        logout()
          .then(() => {
            commit("SET_TOKEN", "");
            resolve();
          })
          .catch(() => {
            Vue.ls.remove(ACCESS_TOKEN);
            resolve();
          });
      });
    },
    // 刷新token
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken)
          .then(response => {
            commit("SET_TOKEN", response.access_token);
            commit("SET_REFRESH_TOKEN", response.refresh_token);
            commit("SET_EXPIRES_IN", response.expires_in);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      Vue.ls.set(ACCESS_TOKEN, token);
    },
    SET_REFRESH_TOKEN(state, token) {
      state.refreshToken = token;
      Vue.ls.set(REFRESH_ACCESS_TOKEN, token);
    },
    SET_EXPIRES_IN: (state, expires_in) => {
      state.expiresIn = expires_in;
      Vue.ls.set(EXPIRES_IN, expires_in);
    },
    SET_NAME: (state, { name }) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_INFO: (state, info) => {
      state.info = info;
      state.name = info.user.name;
      state.tenantId = info.user.tenantId;
      state.tenantCode = info.user.tenantCode;
      if (info.user.tenantCode === "admin") {
        state.isAdmin = true;
      }
      state.avatar = info.user.avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  }
};
