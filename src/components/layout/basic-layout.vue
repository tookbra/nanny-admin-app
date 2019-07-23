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
            :theme="navTheme"
            :collapsed="false"
            :collapsible="true"
          ></sidebar>
        </a-drawer>
        <sidebar
          v-else-if="!isMobile()"
          mode="inline"
          :theme="navTheme"
          :menus="menus"
          :collapsed="collapsed"
          :collapsible="true"
        />
      </div>
      <a-layout class="layout-right">
        <a-layout-header class="layout-header">
          <navigation @toggle="toggle" />
        </a-layout-header>
        <a-layout-content class="layout-content">
          <navtab class="nav-tab" />
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
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { mapGetters, mapState, mapActions } from "vuex";
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
      menus: [],
      refreshLock: false,
      collapsed: false
    };
  },
  computed: {
    ...mapGetters(["expiresIn"]),
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    })
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    }
  },
  created() {
    this.menus = this.mainMenu.find(item => item.path === "/").children;
    // 实时检测刷新token
    this.refreshToken();
  },
  methods: {
    ...mapActions(["setSidebar"]),
    toggle() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
    },
    drawerClose() {
      this.collapsed = false;
      this.$store.commit("SET_COLLAPSE");
    },
    refreshToken() {
      this.refreshTime = setInterval(() => {
        let token = this.$ls.get(ACCESS_TOKEN);
        if (token == undefined || token == "") {
          return;
        }

        if (this.expiresIn <= 1000 && !this.refreshLock) {
          this.refreshLock = true;
          this.$store.dispatch("RefreshToken").catch(() => {
            clearInterval(this.refreshTime);
          });
          this.refreshLock = false;
        }
        this.$store.commit("SET_EXPIRES_IN", this.expiresIn - 10);
      }, 10000);
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
