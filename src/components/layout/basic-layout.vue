<template>
  <div
    class="layout-wrapper"
    :class="[collapsed ? 'layout-collapse' : null, device]"
  >
    <a-layout class="layout-container">
      <div class="layout-left">
        <a-drawer
          v-if="isMobile()"
          placement="left"
          :closable="false"
          :visible="collapsed"
          width="240px"
          @close="drawerClose"
        >
          <sidebar
            mode="inline"
            :menus="menus"
            :collapsed="false"
            :collapsible="true"
          ></sidebar>
        </a-drawer>
        <sidebar
          v-else-if="!isMobile()"
          mode="inline"
          :menus="menus"
          :collapsed="collapsed"
          :collapsible="true"
        />
      </div>
      <a-layout class="layout-right">
        <a-layout-header class="layout-header">
          <navigation />
        </a-layout-header>
        <a-layout-content class="layout-content">
          <navtab class="nav-tab" v-if="!isMobile()" />
          <keep-alive>
            <router-view class="layout-main" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view class="layout-main" v-if="!$route.meta.keepAlive" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { mixin, mixinDevice } from "@/libs/mixin";
import sidebar from "@/components/menu/side-menu";
import navigation from "@/components/header";
import navtab from "@/components/navtab";
export default {
  name: "BasicLayout",
  mixins: [mixin, mixinDevice],
  components: {
    sidebar,
    navigation,
    navtab
  },
  data() {
    return {
      menus: []
    };
  },
  computed: {
    ...mapGetters(["collapsed"]),
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    })
  },
  watch: {
    sidebarOpened(val) {
      console.log(val);
      this.collapsed = !val;
    }
  },
  created() {
    this.menus = this.mainMenu;
  },
  methods: {
    drawerClose() {
      this.$store.commit("SET_COLLAPSE");
    }
  }
};
</script>

<style lang="less">
.layout-wrapper {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background: #f0f2f5 no-repeat;
}
.layout-right {
  .ant-layout-header {
    padding: 0;
  }
}
</style>
