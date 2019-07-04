export default {
  state: {
    tenantTypes: [],
    status: [],
    sex: []
  },
  getters: {
    tenantTypes: state => state.tenantTypes,
    status: state => state.status,
    sex: state => state.sex
  },
  mutations: {
    SET_TENANT_TYPE(state, tenantTypes) {
      state.tenantTypes = tenantTypes;
    },
    SET_STATUS(state, status) {
      state.status = status;
    },
    SET_SEX(state, sex) {
      state.sex = sex;
    }
  }
};
