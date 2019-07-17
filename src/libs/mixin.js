// import Vue from 'vue'
import { DEVICE_TYPE } from "@/libs/device";
import { mapState } from "vuex";

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      sidebarOpened: state => state.app.sidebar,
      navTheme: state => state.app.theme
    })
  }
};

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE;
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP;
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET;
    }
  }
};

export { mixin, mixinDevice };
