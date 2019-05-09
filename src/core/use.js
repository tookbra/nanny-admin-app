import Vue from "vue";
import VueStorage from "vue-ls";
import config from "@/config/defaultSettings";
// base library
import Antd from "ant-design-vue";
import VueCropper from "vue-cropper";

import "ant-design-vue/dist/antd.css";
import "../styles/index.less";

Vue.use(Antd);

Vue.use(VueStorage, config.localStorageOptions);
Vue.use(VueStorage, config.sessionStorageOptions);
Vue.use(VueCropper);
