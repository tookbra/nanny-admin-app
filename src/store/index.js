import Vue from "vue";
import Vuex from "vuex";

import account from "./modules/account";
import app from "./modules/app";
import permission from "./modules/permission";
import tags from "./modules/tags";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    account,
    app,
    permission,
    tags
  }
});
