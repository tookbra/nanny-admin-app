import Vue from "vue";
import { SIDEBAR_TYPE } from "@/store/mutation-types";
export default {
  state: {
    collapsed: false,
    device: "desktop"
  },
  mutations: {
    SET_COLLAPSE(state, type) {
      state.collapsed = !state.collapsed;
      Vue.ls.set(SIDEBAR_TYPE, type);
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  getters: {
    collapsed: state => state.collapsed,
    device: state => state.device
  },
  actions: {
    setSidebar({ commit }, type) {
      commit("SET_COLLAPSE", type);
    }
  }
};
