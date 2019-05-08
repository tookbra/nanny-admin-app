import Vue from "vue";
import VueStorage from "vue-ls";
import config from "@/config/defaultSettings";
// base library
import Antd from "ant-design-vue";
import VueCropper from "vue-cropper";

import "ant-design-vue/dist/antd.css";
import "../styles/index.less";

Vue.use(Antd);

console.log(22222);
Vue.use(VueStorage, config.storageOptions);
Vue.use(VueCropper);
