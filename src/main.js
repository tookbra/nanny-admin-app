import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import bootstrap from "./core/bootstrap";
import "./core/use";
import "./permission";

import basicContainer from "./components/layout/page-layout";

import * as filters from "./libs/filters";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

// if (process.env.NODE_ENV !== "production") require("@/mock");

Vue.config.productionTip = false;
//注册全局容器
Vue.component("basicContainer", basicContainer);

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount("#app");
