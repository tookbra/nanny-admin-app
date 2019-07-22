import Vue from "vue";
import VueStorage from "vue-ls";
import VueSessionStorage from "@/libs/vue-ls-session";
import config from "@/config/defaultSettings";
// base library
import Antd from "ant-design-vue";
import Viser from "viser-vue";
import VueCropper from "vue-cropper";

import "ant-design-vue/dist/antd.css";
import "../styles/index.less";
import Loading from "../components/loading";

import { action, actionAdmin } from "./directives/action";
// import PermissionHelper from "@/libs/helper/permission";

import VTrack from "v-track";
import trackEvents from "../libs/track-events";

Vue.use(Antd);
Vue.use(Viser);

Vue.use(action);
Vue.use(actionAdmin);
// Vue.use(PermissionHelper);

Vue.use(VueStorage, config.localStorageOptions);
Vue.use(VueSessionStorage, config.sessionStorageOptions);
Vue.use(VueCropper);
Vue.use(Loading);

Vue.use(VTrack, {
  trackEvents, // 埋点事件对象
  trackEnable: {
    UVPV: true, // 是否开启UVPV统计，默认为false
    TONP: true // 是否开启页面停留时长统计，默认为false
  }
});
