import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./core/use";
import "./permission";

import basicContainer from "./components/layout/page-layout";

import curd from "./components/curd/main";
import "./libs/filters";

import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

// if (process.env.NODE_ENV !== "production") require("@/mock");

Vue.config.productionTip = false;
//注册全局容器
Vue.component("basicContainer", basicContainer);
Vue.component("curd", curd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
