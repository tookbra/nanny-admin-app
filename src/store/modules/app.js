// import Vue from "vue";
// import { SIDEBAR_TYPE } from "@/store/mutation-types";
export default {
  state: {
    collapsed: false,
    device: "desktop"
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.collapsed = !state.collapsed;
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
