<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { deviceEnquire, DEVICE_TYPE } from "@/libs/device";
import dictUtil from "@/libs/dictUtil";
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  mounted() {
    const { $store } = this;
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit("TOGGLE_DEVICE", "desktop");
          $store.dispatch("setSidebar", true);
          break;
        case DEVICE_TYPE.TABLET:
          $store.commit("TOGGLE_DEVICE", "tablet");
          $store.dispatch("setSidebar", false);
          break;
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit("TOGGLE_DEVICE", "mobile");
          $store.dispatch("setSidebar", true);
          break;
      }
    });
    dictUtil.initDictData(this);
  }
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
