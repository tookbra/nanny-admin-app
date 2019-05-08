export default {
  state: {
    collapsed: false
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.collapsed = !state.collapsed;
    }
  },
  getters: {
    collapsed: state => state.collapsed
  },
  actions: {}
};
