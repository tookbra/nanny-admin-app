<template>
  <a-layout-sider
    :class="['sidebar', theme]"
    width="240px"
    v-model="collapsed"
    :collapsible="collapsible"
    :trigger="null"
  >
    <logo />

    <s-menu
      :menu="menus"
      :mode="mode"
      :collapsed="collapsed"
      style="padding: 16px 0px;"
    ></s-menu>
  </a-layout-sider>
</template>

<script>
import SMenu from "./index";
import logo from "../logo";
export default {
  name: "sidebar",
  components: {
    logo,
    SMenu
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: "inline"
    },
    theme: {
      type: String,
      required: false,
      default: "light"
    },
    menus: {
      type: Array,
      required: true
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    }
  }
};
</script>
<style lang="less">
.sidebar {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding-top: 60px;
  height: 100%;
  position: relative;
  background-color: #fff;
  -webkit-transition: width 0.2s;
  transition: width 0.2s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.15);

  .menu {
    padding-top: 20px;
  }

  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0px solid #e8e8e8;
  }

  .ant-menu-submenu-title {
    i {
      font-size: 16px;
    }
  }
  .ant-menu-inline-collapsed {
    width: 80px;
  }
}
</style>
