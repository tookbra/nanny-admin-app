<template>
  <div class="sidebar">
    <logo />
    <a-menu class="menu" mode="inline" :inlineCollapsed="collapsed">
      <a-sub-menu>
        <span slot="title">
          <a-icon type="setting" />
          <span>系统管理</span>
        </span>
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="2">租户管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "../logo";
export default {
  name: "sidebar",
  components: {
    logo
  },
  computed: mapGetters(["collapsed"])
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
    span {
      font-size: 16px;
    }
  }
  .ant-menu-inline-collapsed {
    width: 60px;
  }

  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 20px !important;
  }
}
</style>
