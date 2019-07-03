export default {
  state: {
    tenantTypes: [],
    status: []
  },
  getters: {
    tenantTypes: state => state.tenantTypes,
    status: state => state.status
  },
  mutations: {
    SET_TENANT_TYPE(state, tenantTypes) {
      state.tenantTypes = tenantTypes;
    },
    SET_STATUS(state, status) {
      state.status = status;
    }
  }
};
