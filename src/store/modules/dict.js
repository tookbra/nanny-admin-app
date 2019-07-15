export default {
  state: {
    tenantTypes: [],
    status: [],
    sex: [],
    productType: [],
    season: []
  },
  getters: {
    tenantTypes: state => state.tenantTypes,
    status: state => state.status,
    sex: state => state.sex,
    productType: state => state.productType,
    season: state => state.season
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
    },
    SET_PRODUCT_TYPE(state, productType) {
      state.productType = productType;
    },
    SET_SEASON(state, season) {
      state.season = season;
    }
  }
};
