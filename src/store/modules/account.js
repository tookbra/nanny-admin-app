import Vue from "vue";
import { login, logout } from "@/api/account/login";
import { getAccountInfo } from "@/api/account/account";
import { ACCESS_TOKEN } from "@/store/mutation-types";
export default {
  state: {
    userName: "",
    token: "",
    name: "",
    avatar: "",
    info: ""
  },
  getters: {
    name: state => state.name,
    avatar: state => state.avatar
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.data;
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", result.token);
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
            commit("SET_NAME", { name: result.name });
            commit("SET_AVATAR", result.avatar);

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
    }
  }
};
