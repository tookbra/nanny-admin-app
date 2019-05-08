import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./core/use";
import "./permission";

import basicContainer from "./components/basic-container/index";

if (process.env.NODE_ENV !== "production") require("@/mock");

Vue.config.productionTip = false;
//注册全局容器
Vue.component("basicContainer", basicContainer);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
