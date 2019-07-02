import Vue from "vue";
import VueStorage from "vue-ls";
import VueSessionStorage from "@/libs/vue-ls-session";
import config from "@/config/defaultSettings";
// base library
import Antd from "ant-design-vue";
import VueCropper from "vue-cropper";

import "ant-design-vue/dist/antd.css";
import "../styles/index.less";
import Loading from "../components/loading";

import action from "./directives/action";

Vue.use(Antd);

Vue.use(action);

Vue.use(VueStorage, config.localStorageOptions);
Vue.use(VueSessionStorage, config.sessionStorageOptions);
Vue.use(VueCropper);
Vue.use(Loading);
